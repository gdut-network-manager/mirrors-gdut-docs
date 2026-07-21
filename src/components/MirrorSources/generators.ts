/**
 * Code generation functions for the MirrorSources component.
 * Each generator takes the component props and current state,
 * returning the configuration file content as a string.
 */

import type {MirrorSourcesProps, GenState, MirrorType} from './types';

// ── Helpers ───────────────────────────────────────────────────────────

/** Strip trailing slashes from a path. */
function normalizePath(p: string): string {
  return p.replace(/\/+$/, '');
}

/** Join a base path and a suffix, ensuring exactly one slash between them. */
function joinPath(base: string, suffix: string): string {
  const b = normalizePath(base);
  const s = suffix.replace(/^\/+/, '');
  return `${b}/${s}`;
}

/** Detect the official security host and path from the mirror path. */
function detectOfficialSecurity(
  mainPath: string,
): {host: string; path: string} {
  if (mainPath.includes('debian')) {
    return {host: 'deb.debian.org', path: '/debian-security'};
  }
  if (mainPath.includes('port')) {
    return {host: 'ports.ubuntu.com', path: '/ubuntu-ports'};
  }
  // Default: Ubuntu
  return {host: 'security.ubuntu.com', path: '/ubuntu'};
}

/** Determine the security host and path based on the security toggle. */
function getSecurityInfo(
  props: MirrorSourcesProps,
  state: GenState,
): {host: string; path: string} {
  const detected = detectOfficialSecurity(props.path);

  if (state.security) {
    // Use the mirror host for security updates
    return {
      host: props.host,
      path: props.securityPath || detected.path,
    };
  }

  // Use the official security host (or override if provided)
  return {
    host: props.securityHost || detected.host,
    path: props.securityPath || detected.path,
  };
}

/** Default file path based on mirror type. */
function getDefaultFilePath(type: MirrorType): string {
  switch (type) {
    case 'apt-traditional':
      return '/etc/apt/sources.list';
    case 'apt-deb822':
      return '/etc/apt/sources.list.d/mirror.sources';
    case 'yum':
      return '/etc/yum.repos.d/mirror.repo';
    case 'pacman':
      return '/etc/pacman.d/mirrorlist';
  }
}

// ── APT Traditional (sources.list) ────────────────────────────────────

/**
 * Generate APT traditional sources.list content.
 *
 * Produces lines like:
 *   deb https://mirrors.gdut.edu.cn/ubuntu noble main restricted universe multiverse
 *   deb-src https://mirrors.gdut.edu.cn/ubuntu noble main restricted universe multiverse
 *   deb https://mirrors.gdut.edu.cn/ubuntu noble-updates main restricted universe multiverse
 *   ...
 *   # deb https://mirrors.gdut.edu.cn/ubuntu noble-proposed main restricted universe multiverse
 */
export function generateAptTraditional(
  props: MirrorSourcesProps,
  state: GenState,
): string {
  const {host, path, components = []} = props;
  const {version, https, source, proposed} = state;
  const protocol = https ? 'https' : 'http';
  const comps = components.join(' ');
  const {codename} = version;

  const baseUri = `${protocol}://${host}${normalizePath(path)}`;
  const lines: string[] = [];

  /** Add a deb line (and deb-src if source is enabled). */
  const addDebLines = (suite: string, comment = false): void => {
    const prefix = comment ? '# ' : '';
    lines.push(`${prefix}deb ${baseUri} ${suite} ${comps}`.trimEnd());
    if (source) {
      lines.push(`${prefix}deb-src ${baseUri} ${suite} ${comps}`.trimEnd());
    }
  };

  // Main, updates, backports
  addDebLines(codename);
  addDebLines(`${codename}-updates`);
  addDebLines(`${codename}-backports`);

  // Security
  const secInfo = getSecurityInfo(props, state);
  const secUri = `${protocol}://${secInfo.host}${normalizePath(secInfo.path)}`;
  lines.push(`deb ${secUri} ${codename}-security ${comps}`.trimEnd());
  if (source) {
    lines.push(`deb-src ${secUri} ${codename}-security ${comps}`.trimEnd());
  }

  // Proposed (commented when disabled, uncommented when enabled)
  addDebLines(`${codename}-proposed`, !proposed);

  return lines.join('\n');
}

// ── APT DEB822 (.sources) ─────────────────────────────────────────────

/**
 * Generate APT DEB822 format (.sources file).
 *
 * Produces stanzas like:
 *   Types: deb
 *   URIs: https://mirrors.gdut.edu.cn/ubuntu
 *   Suites: noble noble-updates noble-backports
 *   Components: main restricted universe multiverse
 *   Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg
 */
export function generateAptDeb822(
  props: MirrorSourcesProps,
  state: GenState,
): string {
  const {host, path, components = [], signedByKey} = props;
  const {version, https, source, proposed} = state;
  const protocol = https ? 'https' : 'http';
  const comps = components.join(' ');
  const {codename} = version;

  const baseUri = `${protocol}://${host}${normalizePath(path)}`;
  const stanzas: string[] = [];

  /** Build a single DEB822 stanza, optionally commenting every line. */
  const buildStanza = (
    types: string,
    uri: string,
    suites: string,
    comment = false,
  ): string => {
    const prefix = comment ? '# ' : '';
    const fields: string[] = [];
    fields.push(`${prefix}Types: ${types}`);
    fields.push(`${prefix}URIs: ${uri}`);
    fields.push(`${prefix}Suites: ${suites}`);
    if (comps) {
      fields.push(`${prefix}Components: ${comps}`);
    }
    if (signedByKey) {
      fields.push(`${prefix}Signed-By: ${signedByKey}`);
    }
    return fields.join('\n');
  };

  // Main stanza
  stanzas.push(
    buildStanza(
      'deb',
      baseUri,
      `${codename} ${codename}-updates ${codename}-backports`,
    ),
  );

  // Source stanza (commented if source not enabled)
  stanzas.push(buildStanza('deb-src', baseUri, `${codename} ${codename}-updates ${codename}-backports`, !source));

  // Security stanza
  const secInfo = getSecurityInfo(props, state);
  const secUri = `${protocol}://${secInfo.host}${normalizePath(secInfo.path)}`;
  stanzas.push(buildStanza('deb', secUri, `${codename}-security`));

  // Proposed stanza (commented when disabled, uncommented when enabled)
  stanzas.push(buildStanza('deb', baseUri, `${codename}-proposed`, !proposed));

  return stanzas.join('\n\n');
}

// ── YUM (.repo) ───────────────────────────────────────────────────────

/**
 * Generate YUM repository configuration.
 *
 * Produces stanzas like:
 *   [BaseOS]
 *   name=CentOS-$releasever - Base
 *   baseurl=https://mirrors.gdut.edu.cn/centos/$releasever/BaseOS/$basearch/os/
 *   enabled=1
 *   gpgcheck=1
 *   gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-centosofficial
 */
export function generateYum(
  props: MirrorSourcesProps,
  state: GenState,
): string {
  const {host, path, repos = []} = props;
  const protocol = state.https ? 'https' : 'http';
  const basePath = normalizePath(path);

  const stanzas: string[] = repos.map((repo) => {
    const baseurl = `${protocol}://${host}${joinPath(basePath, repo.pathTemplate)}`;
    const enabled = repo.enabled !== false ? 1 : 0;
    const fields: string[] = [];
    fields.push(`[${repo.id}]`);
    fields.push(`name=${repo.name}`);
    fields.push(`baseurl=${baseurl}`);
    fields.push(`enabled=${enabled}`);
    fields.push('gpgcheck=1');
    if (repo.gpgKey) {
      fields.push(`gpgkey=${repo.gpgKey}`);
    }
    return fields.join('\n');
  });

  return stanzas.join('\n\n');
}

// ── Pacman (mirrorlist) ───────────────────────────────────────────────

/**
 * Generate Pacman Server line(s).
 *
 * For standard Arch:
 *   Server = https://mirrors.gdut.edu.cn/archlinux/$repo/os/$arch
 *
 * For Manjaro (with branch):
 *   Server = https://mirrors.gdut.edu.cn/manjaro/stable/$repo/$arch
 */
export function generatePacman(
  props: MirrorSourcesProps,
  state: GenState,
): string {
  const {host, path, branch} = props;
  const protocol = state.https ? 'https' : 'http';
  const basePath = normalizePath(path);

  if (branch) {
    // Manjaro format
    return `Server = ${protocol}://${host}${basePath}/${branch}/$repo/$arch`;
  }

  // Standard Arch format
  return `Server = ${protocol}://${host}${basePath}/$repo/os/$arch`;
}

// ── Quick Configuration Command ───────────────────────────────────────

/**
 * Generate a quick one-liner command that writes the configuration
 * and updates the package index.
 *
 * For APT:
 *   sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak
 *   sudo tee /etc/apt/sources.list << 'EOF'
 *   <config>
 *   EOF
 *   sudo apt update
 *
 * For Pacman:
 *   sudo cp /etc/pacman.d/mirrorlist /etc/pacman.d/mirrorlist.bak
 *   sudo sed -i '1i Server = ...' /etc/pacman.d/mirrorlist
 *   sudo pacman -Syy
 */
export function generateQuickConfig(
  props: MirrorSourcesProps,
  state: GenState,
  configText: string,
): string {
  const quickType = props.quickConfigType ?? (
    props.type === 'apt-traditional' || props.type === 'apt-deb822'
      ? 'apt'
      : props.type === 'yum'
        ? 'yum'
        : 'pacman'
  );

  if (quickType === 'none') {
    return '';
  }

  const sudo = state.sudo ? 'sudo ' : '';
  const filePath = props.filePath ?? getDefaultFilePath(props.type);

  if (quickType === 'pacman') {
    // For pacman, use sed to prepend the Server line(s)
    const lines = configText.split('\n');
    const commands = [
      `${sudo}cp ${filePath} ${filePath}.bak`,
      ...lines.map(
        (line) => `${sudo}sed -i '1i ${line}' ${filePath}`,
      ),
      `${sudo}pacman -Syy`,
    ];
    return commands.join('\n');
  }

  // For apt and yum, use tee to write the config
  const updateCmd = quickType === 'apt' ? 'apt update' : 'yum makecache';
  const commands = [
    `${sudo}cp ${filePath} ${filePath}.bak`,
    `${sudo}tee ${filePath} << 'EOF'`,
    configText,
    'EOF',
    `${sudo}${updateCmd}`,
  ];
  return commands.join('\n');
}
