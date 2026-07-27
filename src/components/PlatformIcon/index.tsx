import React from 'react';
import type {ReactNode} from 'react';

type IconName =
  | 'docker'
  | 'containerd'
  | 'crio'
  | 'podman'
  | 'rke2'
  | 'openshift'
  | 'windows'
  | 'linux'
  | 'ubuntu'
  | 'centos'
  | 'debian'
  | 'macos';

const ICON_PATHS: Record<IconName, string> = {
  docker: '/help/img/icons/docker.svg',
  containerd: '/help/img/icons/containerd.svg',
  crio: '/help/img/icons/crio.svg',
  podman: '/help/img/icons/podman.svg',
  rke2: '/help/img/icons/rancher.svg',
  openshift: '/help/img/icons/redhatopenshift.svg',
  windows: '/help/img/icons/windows.svg',
  linux: '/help/img/icons/linux.svg',
  ubuntu: '/help/img/icons/ubuntu.svg',
  centos: '/help/img/icons/centos.svg',
  debian: '/help/img/icons/debian.svg',
  macos: '/help/img/icons/apple.svg',
};

export interface PlatformIconProps {
  name: IconName;
  label: string;
  size?: number;
}

export default function PlatformIcon({
  name,
  label,
  size = 14,
}: PlatformIconProps): ReactNode {
  return (
    <span className="tab-platform-icon-label">
      <img
        src={ICON_PATHS[name]}
        alt=""
        width={size}
        height={size}
        className="tab-platform-icon"
      />
      {label}
    </span>
  );
}
