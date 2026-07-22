/**
 * MirrorSources — interactive mirror configuration generator.
 *
 * Provides a control panel with version selection and toggles for HTTPS,
 * source code, proposed repos, security mirror, and sudo prefix.
 * Dynamically generates configuration file content and a quick-setup
 * one-liner command for APT (traditional / DEB822), YUM, and Pacman.
 */

import {useState, useMemo, useCallback} from 'react';
import type {ReactNode} from 'react';
import {Highlight, themes} from 'prism-react-renderer';
import {useColorMode} from '@docusaurus/theme-common';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import IconCopy from '@theme/Icon/Copy';
import IconSuccess from '@theme/Icon/Success';
import IconWordWrap from '@theme/Icon/WordWrap';
import type {MirrorSourcesProps, GenState, MirrorType} from './types';
import {
  generateAptTraditional,
  generateAptDeb822,
  generateYum,
  generatePacman,
  generateQuickConfig,
} from './generators';
import styles from './styles.module.css';

const LANG_MAP: Record<MirrorType, string> = {
  'apt-traditional': 'properties',
  'apt-deb822': 'yaml',
  'yum': 'ini',
  'pacman': 'bash',
};

interface ToggleConfig {
  key: string;
  label: string;
  show: boolean;
  checked: boolean;
  onChange: (value: boolean) => void;
  ariaLabel: string;
}

export default function MirrorSources(props: MirrorSourcesProps): ReactNode {
  const {
    type,
    host,
    path,
    versions,
    components = [],
    filePath,
    options,
  } = props;

  // Guard: require at least one version
  if (versions.length === 0) {
    return null;
  }

  // ── Toggle visibility ──────────────────────────────────────────────

  const isApt = type === 'apt-traditional' || type === 'apt-deb822';
  const showHttps = options?.https ?? true;
  const showSource = options?.source ?? isApt;
  const showProposed = options?.proposed ?? isApt;
  const showSecurity = options?.security ?? isApt;
  const showSudo = options?.sudo ?? false;

  const quickConfigType = props.quickConfigType ?? (
    isApt ? 'apt' : type === 'yum' ? 'yum' : 'pacman'
  );

  // ── State ──────────────────────────────────────────────────────────

  const [selectedVersion, setSelectedVersion] = useState(versions[0]);
  const [https, setHttps] = useState(true);
  const [source, setSource] = useState(false);
  const [proposed, setProposed] = useState(false);
  const [security, setSecurity] = useState(false);
  const [sudo, setSudo] = useState(true);
  const [copied, setCopied] = useState<'config' | 'quick' | null>(null);
  const [wrap, setWrap] = useState<Record<string, boolean>>({});

  // ── Derived state ──────────────────────────────────────────────────

  const state: GenState = useMemo(
    () => ({version: selectedVersion, https, source, proposed, security, sudo}),
    [selectedVersion, https, source, proposed, security, sudo],
  );

  const configText = useMemo(() => {
    switch (type) {
      case 'apt-traditional':
        return generateAptTraditional(props, state);
      case 'apt-deb822':
        return generateAptDeb822(props, state);
      case 'yum':
        return generateYum(props, state);
      case 'pacman':
        return generatePacman(props, state);
      default:
        return '';
    }
  }, [props, state, type]);

  const quickConfigText = useMemo(() => {
    if (quickConfigType === 'none') return '';
    return generateQuickConfig(props, state, configText);
  }, [props, state, configText, quickConfigType]);

  // ── Default file path ──────────────────────────────────────────────

  const displayFilePath = filePath ?? (
    type === 'apt-traditional'
      ? '/etc/apt/sources.list'
      : type === 'apt-deb822'
        ? '/etc/apt/sources.list.d/mirror.sources'
        : type === 'yum'
          ? '/etc/yum.repos.d/mirror.repo'
          : '/etc/pacman.d/mirrorlist'
  );

  // ── Copy handler ───────────────────────────────────────────────────

  const handleCopy = useCallback(
    async (text: string, target: 'config' | 'quick') => {
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
      setCopied(target);
      setTimeout(() => setCopied(null), 2000);
    },
    [],
  );

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  }, []);

  const toggleWrap = useCallback((target: string) => {
    setWrap((prev) => ({...prev, [target]: !prev[target]}));
  }, []);

  // ── Toggle configs ─────────────────────────────────────────────────

  const toggles: ToggleConfig[] = [
    {
      key: 'https',
      label: 'HTTPS',
      show: showHttps,
      checked: https,
      onChange: setHttps,
      ariaLabel: '使用 HTTPS 协议',
    },
    {
      key: 'source',
      label: '源代码',
      show: showSource,
      checked: source,
      onChange: setSource,
      ariaLabel: '包含源代码 (deb-src)',
    },
    {
      key: 'proposed',
      label: 'Proposed',
      show: showProposed,
      checked: proposed,
      onChange: setProposed,
      ariaLabel: '包含预发布源',
    },
    {
      key: 'security',
      label: '本站安全源',
      show: showSecurity,
      checked: security,
      onChange: setSecurity,
      ariaLabel: '使用本站安全更新源',
    },
    {
      key: 'sudo',
      label: 'sudo',
      show: showSudo,
      checked: sudo,
      onChange: setSudo,
      ariaLabel: '使用 sudo 前缀',
    },
  ];

  const visibleToggles = toggles.filter((t) => t.show);

  const {isDarkTheme} = useColorMode();
  const prismTheme = isDarkTheme ? themes.dracula : themes.github;
  const configLanguage = LANG_MAP[type] ?? 'bash';

  // ── Render ─────────────────────────────────────────────────────────

  const renderCopyButton = (target: 'config' | 'quick', text: string) => (
    <button
      type="button"
      className={
        copied === target
          ? `${styles.copyButton} ${styles.copyButtonCopied}`
          : styles.copyButton
      }
      onClick={() => handleCopy(text, target)}
      aria-label={copied === target ? '已复制' : '复制代码'}
      title="复制"
    >
      <span className={styles.copyButtonIcons} aria-hidden="true">
        <IconCopy className={styles.copyButtonIcon} />
        <IconSuccess className={styles.copyButtonSuccessIcon} />
      </span>
    </button>
  );

  const renderWrapButton = (target: 'config' | 'quick') => {
    const isWrapped = !!wrap[target];
    return (
      <button
        type="button"
        className={
          isWrapped
            ? `${styles.copyButton} ${styles.wrapButtonActive}`
            : styles.copyButton
        }
        onClick={() => toggleWrap(target)}
        aria-label={isWrapped ? '取消自动换行' : '自动换行'}
        title={isWrapped ? '取消自动换行' : '自动换行'}
        aria-pressed={isWrapped}
      >
        <IconWordWrap className={styles.wrapButtonIcon} aria-hidden="true" />
      </button>
    );
  };

  const renderCodeBlock = (
    filePath: string,
    content: string,
    target: 'config' | 'quick',
    language: string,
  ) => {
    const isWrapped = !!wrap[target];
    return (
      <div
        className={styles.codeBlock}
        onMouseMove={handleMouseMove}
      >
        <div className={styles.codeHeader}>
          <span className={styles.codeFilePath}>{filePath}</span>
          <div className={styles.headerButtons}>
            {renderWrapButton(target)}
            {renderCopyButton(target, content)}
          </div>
        </div>
        <Highlight theme={prismTheme} code={content} language={language}>
          {({className, style, tokens, getLineProps, getTokenProps}) => (
            <pre
              className={`${styles.codeContent} ${className} ${isWrapped ? styles.codeContentWrap : ''}`}
              style={style}
            >
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
    );
  };

  return (
    <div className={styles.container}>
      {/* Control Panel */}
      <div className={styles.controlPanel}>
        <h4 className={styles.controlPanelTitle}>配置选项</h4>
        <div className={styles.controls}>
          {versions.length > 1 && (
            <div className={styles.controlItem}>
              <label
                className={styles.controlLabel}
                htmlFor="mirror-version-select"
              >
                版本
              </label>
              <select
                id="mirror-version-select"
                className={styles.select}
                value={selectedVersion.codename}
                onChange={(e) => {
                  const found = versions.find(
                    (v) => v.codename === e.target.value,
                  );
                  if (found) setSelectedVersion(found);
                }}
              >
                {versions.map((v) => (
                  <option key={v.codename} value={v.codename}>
                    {v.label}
                  </option>
                ))}
              </select>
            </div>
          )}
          {visibleToggles.map((toggle) => (
            <div key={toggle.key} className={styles.controlItem}>
              <span className={styles.controlLabel}>{toggle.label}</span>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  className={styles.switchInput}
                  checked={toggle.checked}
                  onChange={(e) => toggle.onChange(e.target.checked)}
                  aria-label={toggle.ariaLabel}
                />
                <span className={styles.switchTrack} />
              </label>
            </div>
          ))}
        </div>
      </div>

      {quickConfigType === 'none' ? (
        renderCodeBlock(displayFilePath, configText, 'config', configLanguage)
      ) : (
        <Tabs className={styles.tabs}>
          <TabItem value="manual" label="手动配置">
            {renderCodeBlock(displayFilePath, configText, 'config', configLanguage)}
          </TabItem>
          <TabItem value="quick" label="快速配置">
            {renderCodeBlock('快速配置命令', quickConfigText, 'quick', 'bash')}
          </TabItem>
        </Tabs>
      )}
    </div>
  );
}
