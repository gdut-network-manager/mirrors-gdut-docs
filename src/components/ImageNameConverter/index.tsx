import {useState, useMemo, useCallback, useEffect, useRef} from 'react';
import type {ReactNode} from 'react';
import {Highlight, themes} from 'prism-react-renderer';
import {useColorMode} from '@docusaurus/theme-common';
import IconCopy from '@theme/Icon/Copy';
import IconSuccess from '@theme/Icon/Success';
import IconWordWrap from '@theme/Icon/WordWrap';
import {parseImageName, isCompleteImage} from './registries';
import type {RegistryConfig} from './registries';
import styles from './styles.module.css';

type Runtime = 'docker' | 'podman' | 'ctr';
type PullMode = 'prefix' | 'domain';

const RUNTIMES: {key: Runtime; label: string}[] = [
  {key: 'docker', label: 'docker'},
  {key: 'podman', label: 'podman'},
  {key: 'ctr', label: 'ctr'},
];

const PULL_MODES: {key: PullMode; label: string}[] = [
  {key: 'prefix', label: '前缀添加模式'},
  {key: 'domain', label: '域名置换模式'},
];

const REGISTRY_HOST = 'registry.gdut.edu.cn';

interface GeneratedCommand {
  label: string;
  code: string;
  note?: string;
}

function buildProxyAddress(
  registry: RegistryConfig,
  imagePart: string,
  mode: PullMode,
): string {
  if (mode === 'prefix') {
    return `${REGISTRY_HOST}/${registry.proxyPrefix}/${imagePart}`;
  }
  return `${registry.subdomain}/${imagePart}`;
}

function generateCommands(
  runtime: Runtime,
  mode: PullMode,
  proxyAddress: string,
  originalInput: string,
): GeneratedCommand[] {
  const isCtr = runtime === 'ctr';
  const namespaceHint = 'ctr 用户可能需要指定 namespace，如 `ctr -n k8s.io image pull ...`';

  if (mode === 'domain') {
    const pullCmd = isCtr
      ? `ctr image pull ${proxyAddress}`
      : `${runtime} pull ${proxyAddress}`;
    const tagCmd = isCtr
      ? `ctr image tag ${proxyAddress} ${originalInput}`
      : `${runtime} tag ${proxyAddress} ${originalInput}`;
    return [
      {label: '1. 拉取镜像', code: pullCmd, note: isCtr ? namespaceHint : undefined},
      {label: '2. 恢复原始标签', code: tagCmd},
    ];
  }

  const pullCmd = isCtr
    ? `ctr image pull ${proxyAddress}`
    : `${runtime} pull ${proxyAddress}`;
  const tagCmd = isCtr
    ? `ctr image tag ${proxyAddress} ${originalInput}`
    : `${runtime} tag ${proxyAddress} ${originalInput}`;
  return [
    {label: '1. 拉取镜像', code: pullCmd, note: isCtr ? namespaceHint : undefined},
    {label: '2. 恢复原始标签', code: tagCmd},
  ];
}

export default function ImageNameConverter(): ReactNode {
  const [input, setInput] = useState('');
  const [debouncedInput, setDebouncedInput] = useState('');
  const [runtime, setRuntime] = useState<Runtime>('docker');
  const [pullMode, setPullMode] = useState<PullMode>('prefix');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [wrap, setWrap] = useState<Record<number, boolean>>({});
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setDebouncedInput(input);
    }, 300);
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [input]);

  const parsed = useMemo(() => {
    if (!debouncedInput.trim()) return null;
    if (!isCompleteImage(debouncedInput)) return 'incomplete';
    return parseImageName(debouncedInput);
  }, [debouncedInput]);

  const commands = useMemo(() => {
    if (!parsed || parsed === 'incomplete') return null;
    const proxyAddress = buildProxyAddress(
      parsed.registry,
      parsed.imagePart,
      pullMode,
    );
    return generateCommands(runtime, pullMode, proxyAddress, parsed.originalInput);
  }, [parsed, runtime, pullMode]);

  const allCommandsText = useMemo(() => {
    if (!commands) return '';
    return commands.map((c) => c.code).join('\n');
  }, [commands]);

  const {isDarkTheme} = useColorMode();
  const prismTheme = isDarkTheme ? themes.dracula : themes.github;

  const handleCopy = useCallback(
    async (text: string, index: number | 'all') => {
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand('copy');
        } catch {
          // give up silently
        }
        document.body.removeChild(textarea);
      }
      if (index === 'all') {
        setCopiedAll(true);
        setTimeout(() => setCopiedAll(false), 2000);
      } else {
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
      }
    },
    [],
  );

  const toggleWrap = useCallback((index: number) => {
    setWrap((prev) => ({...prev, [index]: !prev[index]}));
  }, []);

  const renderWrapButton = (index: number) => {
    const isWrapped = !!wrap[index];
    return (
      <button
        type="button"
        className={
          isWrapped
            ? `${styles.copyButton} ${styles.wrapButtonActive}`
            : styles.copyButton
        }
        onClick={() => toggleWrap(index)}
        aria-label={isWrapped ? '取消自动换行' : '自动换行'}
        title={isWrapped ? '取消自动换行' : '自动换行'}
        aria-pressed={isWrapped}
      >
        <IconWordWrap className={styles.wrapButtonIcon} aria-hidden="true" />
      </button>
    );
  };

  const renderCopyButton = (text: string, index: number) => (
    <button
      type="button"
      className={
        copiedIndex === index
          ? `${styles.copyButton} ${styles.copyButtonCopied}`
          : styles.copyButton
      }
      onClick={() => handleCopy(text, index)}
      aria-label={copiedIndex === index ? '已复制' : '复制代码'}
      title="复制"
    >
      <span className={styles.copyButtonIcons} aria-hidden="true">
        <IconCopy className={styles.copyButtonIcon} />
        <IconSuccess className={styles.copyButtonSuccessIcon} />
      </span>
    </button>
  );

  const renderCodeBlock = (cmd: GeneratedCommand, index: number) => {
    const isWrapped = !!wrap[index];
    return (
    <div key={index} className={styles.codeBlock}>
      <div className={styles.codeHeader}>
        <span className={styles.codeLabel}>{cmd.label}</span>
        <div className={styles.headerButtons}>
          {renderWrapButton(index)}
          {renderCopyButton(cmd.code, index)}
        </div>
      </div>
      <Highlight theme={prismTheme} code={cmd.code} language="bash">
        {({className, style, tokens, getLineProps, getTokenProps}) => (
          <pre className={`${styles.codeContent} ${className} ${isWrapped ? styles.codeContentWrap : ''}`} style={style}>
            {tokens.map((line, i) => {
              const lineProps = getLineProps({line});
              return (
                <div key={i} {...lineProps}>
                  {line.map((token, key) => {
                    const tokenProps = getTokenProps({token});
                    return <span key={key} {...tokenProps} />;
                  })}
                </div>
              );
            })}
          </pre>
        )}
      </Highlight>
    </div>
  );};

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h4 className={styles.title}>镜像名称转换工具</h4>

        <div className={styles.inputWrapper}>
          <input
            className={styles.input}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="nginx:latest 或 ghcr.io/foo/bar:latest"
            aria-label="镜像名称输入"
          />
        </div>

        <div className={styles.controlRow}>
          <div className={styles.controlGroup}>
            <span className={styles.controlLabel}>容器运行时</span>
            <div className={styles.segmentedControl}>
              {RUNTIMES.map((rt) => (
                <button
                  key={rt.key}
                  type="button"
                  className={
                    runtime === rt.key
                      ? `${styles.segmentButton} ${styles.segmentButtonActive}`
                      : styles.segmentButton
                  }
                  onClick={() => setRuntime(rt.key)}
                  aria-pressed={runtime === rt.key}
                >
                  {rt.label}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.controlGroup}>
            <span className={styles.controlLabel}>拉取模式</span>
            <div className={styles.segmentedControl}>
              {PULL_MODES.map((mode) => (
                <button
                  key={mode.key}
                  type="button"
                  className={
                    pullMode === mode.key
                      ? `${styles.segmentButton} ${styles.segmentButtonActive}`
                      : styles.segmentButton
                  }
                  onClick={() => setPullMode(mode.key)}
                  aria-pressed={pullMode === mode.key}
                >
                  {mode.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {pullMode === 'domain' && (
          <div className={styles.warning}>
            <svg className={styles.warningIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>
              使用域名置换模式前，需要先完成以下配置：<br />
              1. 编辑主机 Hosts 文件，添加域名解析记录<br />
              2. 信任镜像站的 CA 证书
            </span>
          </div>
        )}

        {!debouncedInput.trim() && (
          <div className={styles.hint}>
            输入镜像名以生成加速拉取命令，支持的镜像源请查看{' '}
            <a className={styles.hintLink} href="#镜像信息">
              支持的容器镜像库
            </a>
          </div>
        )}

        {parsed === 'incomplete' && (
          <div className={styles.hint}>请输入完整的镜像名</div>
        )}

        {parsed && parsed !== 'incomplete' && (
          <div className={styles.commandsSection}>
            {commands?.map((cmd, i) => renderCodeBlock(cmd, i))}
            {runtime === 'ctr' && (
              <div className={styles.note}>ctr 用户可能需要指定 namespace，如 <code>ctr -n k8s.io image pull ...</code></div>
            )}
            <div className={styles.copyAllBar}>
              <button
                type="button"
                className={
                  copiedAll
                    ? `${styles.copyAllButton} ${styles.copyAllButtonCopied}`
                    : styles.copyAllButton
                }
                onClick={() => handleCopy(allCommandsText, 'all')}
              >
                {copiedAll ? '已复制' : '复制全部命令'}
              </button>
            </div>
          </div>
        )}

        {parsed === null && debouncedInput.trim() && (
          <div className={styles.hint}>
            该仓库暂不支持加速，请查看{' '}
            <a className={styles.hintLink} href="#镜像信息">
              支持的容器镜像库列表
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
