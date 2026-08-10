import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serve } from '@hono/node-server';
import { createServer } from 'http';

/**
 * AI Proxy Server
 *
 * Bridges open-ask-ai frontend widget ↔ OpenAI-compatible LLM API.
 *
 * Frontend (open-ask-ai) sends:  POST { messages: UIMessage[], project?: string }
 * We convert to OpenAI format,   POST { messages: ChatCompletionMessage[], stream: true }
 * We convert the OpenAI SSE stream back to UIMessageChunk SSE stream.
 */

// ── Types ─────────────────────────────────────────────────────────────────────

/** open-ask-ai UIMessage format (AI SDK v6) */
interface UIMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  parts: UIMessagePart[];
}

type UIMessagePart =
  | { type: 'text'; text: string }
  | { type: 'reasoning'; text: string }
  | { type: 'dynamic-tool'; toolCallId: string; toolName: string; input: unknown; output?: unknown };

/** open-ask-ai request body */
interface AskAIRequest {
  messages: UIMessage[];
  project?: string;
}

/** OpenAI chat completion message */
interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

/** OpenAI SSE chunk */
interface OpenAIStreamChunk {
  choices?: Array<{
    delta?: {
      content?: string | null;
      reasoning?: string | null;
    };
    finish_reason?: string | null;
  }>;
}

// ── Config ────────────────────────────────────────────────────────────────────

const LLM_BASE_URL = process.env.LLM_BASE_URL ?? '';
const LLM_API_KEY = process.env.LLM_API_KEY ?? '';
const LLM_MODEL = process.env.LLM_MODEL ?? '';
const PORT = parseInt(process.env.PORT ?? '3100', 10);

// System prompt: instruct the LLM about the GDUT mirrors documentation context
const SYSTEM_PROMPT = process.env.SYSTEM_PROMPT ?? `你是广东工业大学开源镜像站的 AI 助手。
你的任务是帮助用户解答关于镜像源使用、配置方法、Linux 操作系统、开发工具等方面的问题。
请用简体中文回答，保持简洁实用。如果不确定，请如实告知。`;

if (!LLM_BASE_URL || !LLM_API_KEY || !LLM_MODEL) {
  console.error(
    'Missing required environment variables. Please set LLM_BASE_URL, LLM_API_KEY, and LLM_MODEL.'
  );
  process.exit(1);
}

// ── Conversion: UIMessage → OpenAI message ─────────────────────────────────────

function uiMessageToOpenAI(msg: UIMessage): OpenAIMessage | null {
  // Extract text from parts
  const textParts = msg.parts
    .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
    .map((p) => p.text);
  const content = textParts.join('\n');
  if (!content) return null;
  return { role: msg.role, content };
}

// ── Conversion: OpenAI SSE → UIMessageChunk SSE ───────────────────────────────

/**
 * Transforms an OpenAI-compatible SSE stream into a UIMessageChunk SSE stream.
 *
 * UIMessageChunk sequence for a text response:
 *   1. data: {"type":"text-start"}
 *   2. data: {"type":"text-delta","delta":"..."}  (repeated)
 *   3. data: {"type":"text-end"}
 *   4. data: [DONE]
 */
async function streamOpenAIToUIMessage(
  response: Response,
  writer: (data: string) => void
): Promise<void> {
  const reader = response.body?.getReader();
  if (!reader) throw new Error('No response body from LLM API');

  const decoder = new TextDecoder();
  let buffer = '';
  let textStarted = false;
  const textId = `text-${Date.now()}`;
  const messageId = `msg-${Date.now()}`;

  // 1. Send start chunk
  writer(`data: ${JSON.stringify({ type: 'start', messageId })}\n\n`);

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith('data: ')) continue;

        const data = trimmed.slice(6); // Remove "data: "
        if (data === '[DONE]') {
          continue; // We'll handle this after the loop
        }

        try {
          const chunk: OpenAIStreamChunk = JSON.parse(data);
          const delta = chunk.choices?.[0]?.delta;

          // Handle reasoning content (if supported by the LLM)
          if (delta?.reasoning) {
            // For now, we skip reasoning in the UI to keep it simple
            // Could be added later with reasoning-start/reasoning-delta/reasoning-end
          }

          // Handle text content
          if (delta?.content) {
            if (!textStarted) {
              writer(`data: ${JSON.stringify({ type: 'text-start', id: textId })}\n\n`);
              textStarted = true;
            }
            writer(
              `data: ${JSON.stringify({ type: 'text-delta', id: textId, delta: delta.content })}\n\n`
            );
          }
        } catch {
          // Skip unparseable lines
        }
      }
    }

    // 2. End text part if it was started
    if (textStarted) {
      writer(`data: ${JSON.stringify({ type: 'text-end', id: textId })}\n\n`);
    }
    // 3. Send finish chunk
    writer(`data: ${JSON.stringify({ type: 'finish', finishReason: 'stop' })}\n\n`);
    // 4. Send [DONE] marker
    writer('data: [DONE]\n\n');
  } finally {
    reader.releaseLock();
  }
}

// ── Hono App ──────────────────────────────────────────────────────────────────

const app = new Hono();

// CORS: allow the Docusaurus site
const allowedOrigins = (process.env.CORS_ORIGINS ?? '').split(',').map((s) => s.trim()).filter(Boolean);

app.use(
  '*',
  cors({
    origin: allowedOrigins.length > 0 ? allowedOrigins : '*',
    allowMethods: ['POST', 'OPTIONS'],
    allowHeaders: ['Content-Type'],
  })
);

// Health check
app.get('/health', (c) => c.json({ status: 'ok' }));

// Main endpoint: open-ask-ai → OpenAI-compatible LLM
app.post('/api/chat', async (c) => {
  let body: AskAIRequest;
  try {
    body = await c.req.json<AskAIRequest>();
  } catch {
    return c.json({ error: 'Invalid JSON body' }, 400);
  }

  if (!body.messages || !Array.isArray(body.messages) || body.messages.length === 0) {
    return c.json({ error: 'messages array is required' }, 400);
  }

  // Convert UIMessages to OpenAI messages
  const openaiMessages: OpenAIMessage[] = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...body.messages
      .map(uiMessageToOpenAI)
      .filter((m): m is OpenAIMessage => m !== null),
  ];

  // Call the OpenAI-compatible LLM API with streaming
  const llmUrl = LLM_BASE_URL.endsWith('/')
    ? `${LLM_BASE_URL}chat/completions`
    : `${LLM_BASE_URL}/chat/completions`;

  let llmResponse: Response;
  try {
    llmResponse = await fetch(llmUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${LLM_API_KEY}`,
      },
      body: JSON.stringify({
        model: LLM_MODEL,
        messages: openaiMessages,
        stream: true,
      }),
    });
  } catch (err) {
    console.error('Failed to call LLM API:', err);
    return c.json({ error: 'Failed to connect to LLM API' }, 502);
  }

  if (!llmResponse.ok) {
    const errorText = await llmResponse.text().catch(() => 'Unknown error');
    console.error(`LLM API error ${llmResponse.status}:`, errorText);
    return c.json(
      { error: `LLM API returned ${llmResponse.status}` },
      llmResponse.status as 400 | 401 | 403 | 404 | 429 | 500
    );
  }

  // Stream the response back as UIMessageChunk SSE
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      const writer = (data: string) => {
        controller.enqueue(encoder.encode(data));
      };

      try {
        await streamOpenAIToUIMessage(llmResponse, writer);
      } catch (err) {
        console.error('Stream error:', err);
        // Send error chunk
        writer(
          `data: ${JSON.stringify({
            type: 'error',
            errorText: err instanceof Error ? err.message : 'Stream error',
          })}\n\n`
        );
        writer('data: [DONE]\n\n');
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
});

// ── Start server ──────────────────────────────────────────────────────────────

console.log(`AI Proxy server starting on port ${PORT}`);
console.log(`  LLM_BASE_URL: ${LLM_BASE_URL}`);
console.log(`  LLM_MODEL:    ${LLM_MODEL}`);
console.log(`  CORS origins: ${allowedOrigins.length > 0 ? allowedOrigins.join(', ') : '*'}`);

serve(
  {
    fetch: app.fetch,
    port: PORT,
  },
  (info) => {
    console.log(`AI Proxy running at http://localhost:${info.port}`);
  }
);
