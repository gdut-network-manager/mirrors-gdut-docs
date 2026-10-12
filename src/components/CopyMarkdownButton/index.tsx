import React, {useCallback, useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import {htmlToMarkdown} from '@site/src/utils/htmlToMarkdown';
import styles from './styles.module.css';

function getMarkdownSourceUrl(): string | null {
  if (typeof window === 'undefined') return null;
  return window.location.pathname.replace(/\/$/, '') + '.md';
}

async function openMarkdownInNewTab(url: string): Promise<void> {
  const response = await fetch(url);
  if (!response.ok) {
    window.open(url, '_blank', 'noopener,noreferrer');
    return;
  }
  const markdown = await response.text();
  const blob = new Blob([markdown], {type: 'text/plain; charset=utf-8'});
  const blobUrl = URL.createObjectURL(blob);
  window.open(blobUrl, '_blank', 'noopener,noreferrer');
  setTimeout(() => URL.revokeObjectURL(blobUrl), 60_000);
}

export default function CopyMarkdownButton(): React.ReactElement {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(async () => {
    const article = document.querySelector('article');
    if (!article) return;
    const clone = article.cloneNode(true) as HTMLElement;
    clone.querySelector('nav[aria-label="Breadcrumbs"]')?.remove();
    clone
      .querySelector('[class*="breadcrumbsContainer"]')
      ?.remove();
    clone
      .querySelectorAll(
        'button, [class*="tocCollapsible"], [class*="theme-edit-this-page"], a[href*="/edit/master"]',
      )
      .forEach((el) => el.remove());
    const markdown = htmlToMarkdown(clone.innerHTML);
    try {
      await navigator.clipboard.writeText(markdown);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = markdown;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [open]);

  const viewUrl = getMarkdownSourceUrl();

  return (
    <div
      ref={containerRef}
      className={clsx(styles.container, open && styles.open)}>
      <button
        type="button"
        className={clsx(styles.button, copied && styles.copied)}
        onClick={handleClick}
        title="以 Markdown 格式复制整篇文章">
        <svg
          className={styles.icon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true">
          {copied ? (
            <>
              <rect width="14" height="14" x="8" y="8" rx="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              <path d="m12 15 2 2 4-4" />
            </>
          ) : (
            <>
              <rect width="14" height="14" x="8" y="8" rx="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </>
          )}
        </svg>
        <span>{copied ? '已复制 Markdown' : '复制 Markdown'}</span>
      </button>
      <button
        type="button"
        className={clsx(styles.button, styles.caretButton, open && styles.caretButtonOpen)}
        onClick={() => setOpen((v) => !v)}
        aria-label="更多 Markdown 操作"
        aria-expanded={open}
        aria-haspopup="menu">
        <svg
          className={clsx(styles.icon, styles.caret)}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <ul className={styles.menu} role="menu">
        <li role="none">
          <button
            type="button"
            role="menuitem"
            className={clsx(styles.menuItem, styles.menuItemWithIcon)}
            onClick={() => {
              setOpen(false);
              void handleClick();
            }}>
            <svg
              className={styles.menuIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true">
              <rect width="14" height="14" x="8" y="8" rx="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
            复制 Markdown
          </button>
        </li>
        {viewUrl && (
          <li role="none">
            <button
              type="button"
              role="menuitem"
              className={clsx(styles.menuItem, styles.menuItemWithIcon)}
              onClick={() => {
                setOpen(false);
                void openMarkdownInNewTab(viewUrl);
              }}>
              <svg
                className={styles.menuIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true">
                <path d="M15 3h6v6" />
                <path d="M10 14 21 3" />
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              </svg>
              以 Markdown 格式查看
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}
