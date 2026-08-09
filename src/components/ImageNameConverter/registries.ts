export interface RegistryConfig {
  name: string;
  originalHost: string;
  proxyPrefix: string;
  subdomain: string;
  isOfficialNamespace: (parts: string[]) => boolean;
  officialNamespacePrefix: string;
}

const isDockerHubOfficial = (parts: string[]) =>
  parts.length === 1 || (parts.length >= 2 && parts[0] === 'library');

const neverOfficial = () => false;

export const registries: RegistryConfig[] = [
  {
    name: 'Docker Hub',
    originalHost: 'docker.io',
    proxyPrefix: 'docker',
    subdomain: 'docker.registry.gdut.edu.cn',
    isOfficialNamespace: isDockerHubOfficial,
    officialNamespacePrefix: 'library',
  },
  {
    name: 'GitHub Container Registry',
    originalHost: 'ghcr.io',
    proxyPrefix: 'ghcr.io',
    subdomain: 'ghcr.registry.gdut.edu.cn',
    isOfficialNamespace: neverOfficial,
    officialNamespacePrefix: '',
  },
  {
    name: 'RedHat Quay.io',
    originalHost: 'quay.io',
    proxyPrefix: 'quay.io',
    subdomain: 'quay.registry.gdut.edu.cn',
    isOfficialNamespace: neverOfficial,
    officialNamespacePrefix: '',
  },
  {
    name: 'Kubernetes Container Registry',
    originalHost: 'registry.k8s.io',
    proxyPrefix: 'registry.k8s.io',
    subdomain: 'k8s.registry.gdut.edu.cn',
    isOfficialNamespace: neverOfficial,
    officialNamespacePrefix: '',
  },
  {
    name: 'Microsoft Artifact Registry',
    originalHost: 'mcr.microsoft.com',
    proxyPrefix: 'mcr.microsoft.com',
    subdomain: 'mcr.registry.gdut.edu.cn',
    isOfficialNamespace: neverOfficial,
    officialNamespacePrefix: '',
  },
  {
    name: 'Google Container Registry',
    originalHost: 'gcr.io',
    proxyPrefix: 'gcr.io',
    subdomain: 'gcr.registry.gdut.edu.cn',
    isOfficialNamespace: neverOfficial,
    officialNamespacePrefix: '',
  },
  {
    name: 'Kubernetes Container Registry (legacy)',
    originalHost: 'k8s.gcr.io',
    proxyPrefix: 'k8s.gcr.io',
    subdomain: 'k8s.registry.gdut.edu.cn',
    isOfficialNamespace: neverOfficial,
    officialNamespacePrefix: '',
  },
  {
    name: 'Elastic Docker Registry',
    originalHost: 'docker.elastic.co',
    proxyPrefix: 'docker.elastic.co',
    subdomain: 'elastic.registry.gdut.edu.cn',
    isOfficialNamespace: neverOfficial,
    officialNamespacePrefix: '',
  },
  {
    name: 'NVIDIA Container Registry',
    originalHost: 'nvcr.io',
    proxyPrefix: 'nvcr.io',
    subdomain: 'nvcr.registry.gdut.edu.cn',
    isOfficialNamespace: neverOfficial,
    officialNamespacePrefix: '',
  },
  {
    name: 'GitLab Container Registry',
    originalHost: 'registry.gitlab.com',
    proxyPrefix: 'registry.gitlab.com',
    subdomain: 'gitlab.registry.gdut.edu.cn',
    isOfficialNamespace: neverOfficial,
    officialNamespacePrefix: '',
  },
];

const REGISTRY_HOSTS = new Set(registries.map((r) => r.originalHost));

export interface ParsedImage {
  registry: RegistryConfig;
  imagePart: string;
  originalInput: string;
}

function ensureTag(imageRef: string): string {
  const lastSlash = imageRef.lastIndexOf('/');
  const lastColon = imageRef.lastIndexOf(':');
  if (lastColon > lastSlash) {
    const tag = imageRef.slice(lastColon + 1);
    if (!tag) return `${imageRef.slice(0, lastColon)}:latest`;
    return imageRef;
  }
  return `${imageRef}:latest`;
}

function toOciLowercase(ref: string): string {
  return ref.toLowerCase();
}

function withOfficialPrefix(imagePart: string, prefix: string): string {
  if (imagePart.startsWith(`${prefix}/`)) return imagePart;
  return `${prefix}/${imagePart}`;
}

export function parseImageName(input: string): ParsedImage | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  const lowered = toOciLowercase(trimmed);
  const hasSlash = lowered.includes('/');

  if (!hasSlash) {
    const registry = registries.find((r) => r.originalHost === 'docker.io');
    if (!registry) return null;
    const tagged = ensureTag(lowered);
    if (registry.isOfficialNamespace([lowered])) {
      return {
        registry,
        imagePart: withOfficialPrefix(tagged, registry.officialNamespacePrefix),
        originalInput: tagged,
      };
    }
    return {registry, imagePart: tagged, originalInput: tagged};
  }

  const parts = lowered.split('/');
  const firstPart = parts[0];

  if (REGISTRY_HOSTS.has(firstPart)) {
    const registry = registries.find((r) => r.originalHost === firstPart)!;
    const imagePart = parts.slice(1).join('/');
    if (!imagePart) return null;
    const tagged = ensureTag(imagePart);
    if (registry.isOfficialNamespace(parts.slice(1))) {
      return {
        registry,
        imagePart: withOfficialPrefix(tagged, registry.officialNamespacePrefix),
        originalInput: `${firstPart}/${tagged}`,
      };
    }
    return {registry, imagePart: tagged, originalInput: `${firstPart}/${tagged}`};
  }

  const dockerHub = registries.find((r) => r.originalHost === 'docker.io');
  if (!dockerHub) return null;

  const looksLikeHost = firstPart.includes('.') || firstPart.includes(':');
  if (looksLikeHost) return null;

  const tagged = ensureTag(lowered);
  if (dockerHub.isOfficialNamespace(parts)) {
    const imagePart = withOfficialPrefix(tagged, dockerHub.officialNamespacePrefix);
    return {registry: dockerHub, imagePart, originalInput: tagged};
  }

  return {registry: dockerHub, imagePart: tagged, originalInput: tagged};
}

export function isCompleteImage(input: string): boolean {
  const trimmed = input.trim();
  if (!trimmed) return false;
  const parts = trimmed.split('/');
  if (parts.length < 1) return false;

  const REGISTRY_HOSTS = new Set(registries.map((r) => r.originalHost));
  if (REGISTRY_HOSTS.has(parts[0])) {
    return parts.length >= 2 && parts[1].length > 0;
  }

  return true;
}
