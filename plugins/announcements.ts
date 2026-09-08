import fs from 'node:fs';
import path from 'node:path';
import type {Plugin} from '@docusaurus/types';

export interface Announcement {
  slug: string;
  title: string;
  dateLabel: string;
}

export default function announcementsPlugin(): Plugin<Announcement[]> {
  return {
    name: 'announcements-plugin',
    async loadContent() {
      const blogDir = path.join(__dirname, '..', 'blog');
      const files = fs
        .readdirSync(blogDir)
        .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'));

      const posts: (Announcement & {date: number; pinned: boolean})[] = [];
      for (const file of files) {
        const raw = fs.readFileSync(path.join(blogDir, file), 'utf8');
        const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
        if (!fmMatch) continue;

        const fm: Record<string, string> = {};
        for (const line of fmMatch[1].split('\n')) {
          const kv = line.match(/^([a-zA-Z_]+):\s*(.*)$/);
          if (kv) fm[kv[1]] = kv[2].trim().replace(/^['"]|['"]$/g, '');
        }
        if (!fm.title || !fm.slug) continue;

        const d = fm.date ? new Date(fm.date) : new Date();
        posts.push({
          slug: fm.slug,
          title: fm.title,
          dateLabel: formatDate(d),
          pinned: fm.pin === 'true',
          date: Number.isNaN(d.getTime()) ? 0 : d.getTime(),
        });
      }

      return posts
        .sort((a, b) => {
          if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
          return b.date - a.date;
        })
        .slice(0, 3)
        .map(({slug, title, dateLabel}) => ({slug, title, dateLabel}));
    },
    async contentLoaded({content, actions}) {
      actions.setGlobalData(content);
    },
  };
}

function formatDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
