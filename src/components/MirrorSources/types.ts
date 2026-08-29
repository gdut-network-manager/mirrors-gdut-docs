/**
 * Type definitions for the MirrorSources component.
 * Provides interactive configuration generation for mirror help docs.
 */

export type MirrorType = 'apt-traditional' | 'apt-deb822' | 'yum' | 'pacman' | 'maven';

export interface Version {
  /** Human-readable label, e.g. "24.04 LTS (noble)" */
  label: string;
  /** Distro codename, e.g. "noble" */
  codename: string;
}

export interface YumRepo {
  /** Repo ID, e.g. "BaseOS" */
  id: string;
  /** Repo name, e.g. "CentOS-$releasever - Base" */
  name: string;
  /** Path template appended to the base URL, e.g. "$releasever/BaseOS/$basearch/os/" */
  pathTemplate: string;
  /** Whether the repo is enabled (default: true) */
  enabled?: boolean;
  /** GPG key path, e.g. "file:///etc/pki/rpm-gpg/RPM-GPG-KEY-centosofficial" */
  gpgKey?: string;
}

export interface MirrorSourcesOptions {
  /** Show HTTPS toggle (default: true) */
  https?: boolean;
  /** Show source code toggle (default: true for APT, false otherwise) */
  source?: boolean;
  /** Show proposed toggle (default: true for APT, false otherwise) */
  proposed?: boolean;
  /** Show security toggle (default: true for APT, false otherwise) */
  security?: boolean;
  /** Show sudo toggle (default: false) */
  sudo?: boolean;
}

export interface MirrorSourcesProps {
  type: MirrorType;
  /** Mirror host, e.g. "mirrors.gdut.edu.cn" */
  host: string;
  /** Mirror path, e.g. "/ubuntu" or "/debian" or "/centos" */
  path: string;
  /** Available versions */
  versions: Version[];
  /** APT components, e.g. ["main", "restricted", "universe", "multiverse"] */
  components?: string[];
  /** File path for display, e.g. "/etc/apt/sources.list" */
  filePath?: string;
  /** Toggle visibility options */
  options?: MirrorSourcesOptions;
  /** Override security mirror host (default: uses host) */
  securityHost?: string;
  /** Override security mirror path (default: uses path) */
  securityPath?: string;
  /** GPG key path for DEB822 format */
  signedByKey?: string;
  /** YUM repo definitions (for YUM type) */
  repos?: YumRepo[];
  /** Pacman branch (Manjaro: "stable", "testing", "unstable") */
  branch?: string;
  /** Quick config command type (default: based on type) */
  quickConfigType?: 'apt' | 'yum' | 'pacman' | 'maven' | 'none';
  /** Render POM config instead of settings.xml mirror snippet (maven only) */
  mavenPomOnly?: boolean;
}

/**
 * Internal state passed to generator functions.
 */
export interface GenState {
  version: Version;
  https: boolean;
  source: boolean;
  proposed: boolean;
  security: boolean;
  sudo: boolean;
}
