---
sidebar_position: 1
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Docker 镜像使用帮助

## 简介

基于 Harbor 实现的容器镜像代理仓库，支持搜索已经缓存下来的镜像，目前镜像站的容器镜像库有两种代理模式。

## 镜像信息

- **架构**：全部
- **支持的容器镜像库**：
  - Docker Hub (docker.io)
  - GitHub Container Registry (ghcr.io)
  - RedHat Quay.io (quay.io)
  - Kubernetes Container Registry (registry.k8s.io)
  - Microsoft Artifact Registry (mcr.microsoft.com)
  - Google Container Registry (gcr.io)
  - Kubernetes Container Registry (k8s.gcr.io)
  - Elastic Docker Registry (docker.elastic.co)
  - NVIDIA Container Registry (nvcr.io)
- **更新策略**：缓存加速

## 使用说明

### 前缀添加模式

#### Docker Hub (docker.io)

```bash
docker pull registry.gdut.edu.cn/docker/google/pause:latest
# 如果是官方镜像或者单级存储则加上默认的库名称library即可
docker pull registry.gdut.edu.cn/docker/library/nginx:latest
```

#### GitHub Container Registry (ghcr.io)

```bash
docker pull registry.gdut.edu.cn/ghcr.io/hay-kot/homebox:latest
```

#### RedHat Quay.io (quay.io)

```bash
docker pull registry.gdut.edu.cn/quay.io/coreos/flannel:v0.15.1
```

#### Kubernetes Container Registry (registry.k8s.io)

```bash
docker pull registry.gdut.edu.cn/registry.k8s.io/coredns/coredns:v1.6.6
# 如果是官方镜像或者单级存储则按如下所示拉取
docker pull registry.gdut.edu.cn/registry.k8s.io/kube-apiserver:v1.26.8
```

#### Microsoft Artifact Registry (mcr.microsoft.com)

```bash
docker pull registry.gdut.edu.cn/mcr.microsoft.com/coreos/flannel:v0.15.1
```

#### Google Container Registry (gcr.io)

```bash
docker pull registry.gdut.edu.cn/gcr.io/kaniko-project/executor:v1.13.0-debug
```

#### Kubernetes Container Registry (k8s.gcr.io)

```bash
docker pull registry.gdut.edu.cn/registry.k8s.io/kube-proxy:v1.24.16
```

#### Elastic Docker Registry (docker.elastic.co)

```bash
docker pull registry.gdut.edu.cn/docker.elastic.co/elasticsearch/elasticsearch:8.17.1
```

#### NVIDIA Container Registry (nvcr.io)

```bash
docker pull registry.gdut.edu.cn/nvcr.io/nvidia/k8s-device-plugin:v0.17.0
```

拉取镜像后，如需重新打 Tag，请自行执行 `docker tag` 命令。

#### 代理地址对照表

| **容器镜像库** | **原地址** | **代理地址** |
|----|----|----|
| **Docker Hub** | `nginx:latest` | `registry.gdut.edu.cn/docker/library/nginx:latest` |
| **Docker Hub** | `rancher/rancher:latest` | `registry.gdut.edu.cn/docker/rancher/rancher:latest` |
| **Docker Hub** | `docker.io/foo/bar:latest` | `registry.gdut.edu.cn/docker/foo/bar:latest` |
| **GitHub Package Registry** | `ghcr.io/foo/bar:latest` | `registry.gdut.edu.cn/ghcr.io/foo/bar:latest` |
| **Red Hat Quay** | `quay.io/foo/bar:latest` | `registry.gdut.edu.cn/quay.io/foo/bar:latest` |
| **Kubernetes Container Registry** | `registry.k8s.io/foo/bar:latest` | `registry.gdut.edu.cn/registry.k8s.io/foo/bar:latest` |
| **Microsoft Container Registry** | `mcr.microsoft.com/foo/bar:latest` | `registry.gdut.edu.cn/mcr.microsoft.com/foo/bar:latest` |
| **Google Container Registry** | `gcr.io/foo/bar:latest` | `registry.gdut.edu.cn/gcr.io/foo/bar:latest` |
| **Elastic Docker registry** | `docker.elastic.co/foo/bar:latest` | `registry.gdut.edu.cn/docker.elastic.co/foo/bar:latest` |
| **NVIDIA Container Registry** | `nvcr.io/foo/bar:latest` | `registry.gdut.edu.cn/nvcr.io/foo/bar:latest` |

### 域名置换模式

这种模式通过配置容器运行时，使其自动将镜像拉取请求转发到镜像站，无需手动修改镜像地址。由于学校未提供 `registry.gdut.edu.cn` 的子域名的解析及公共 TLS 证书，采用子域名置换方式时需要进行一些额外配置。

:::tip[两种模式说明]
- **前缀添加模式**（见上方）：手动在镜像地址前添加 `registry.gdut.edu.cn/`，使用主域名，无需额外配置，适用于所有平台。
- **域名置换模式**（本节）：配置运行时自动重定向，使用子域名（如 `docker.registry.gdut.edu.cn`），需配置 Hosts 与 CA 证书。除 Docker 外的其他平台还支持在 mirror 配置中使用前缀添加路径，无需子域名，详见[各平台配置](#各平台配置)。
:::

#### 配置 Hosts 文件

在本机所在的 Hosts 文件中添加以下记录，Hosts 文件的路径会因系统而异，请自行百度：

```ini
# GDUT Mirrors Registry
202.116.132.68 docker.registry.gdut.edu.cn
202.116.132.68 ghcr.registry.gdut.edu.cn
202.116.132.68 quay.registry.gdut.edu.cn
202.116.132.68 k8s.registry.gdut.edu.cn
202.116.132.68 mcr.registry.gdut.edu.cn
202.116.132.68 gcr.registry.gdut.edu.cn
202.116.132.68 nvcr.registry.gdut.edu.cn
202.116.132.68 elastic.registry.gdut.edu.cn
# GDUT Mirrors Registry END
```

#### 信任镜像站的自签署 CA 证书

[点此](https://mirrors.gdut.edu.cn/certs/mirrors-ca.crt)下载镜像站的CA证书，然后安装到本机并信任该证书

#### 代理地址对照表

| **容器镜像库** | **原地址** | **代理地址** |
|----|----|----|
| **Docker Hub** | `nginx:latest` | `docker.registry.gdut.edu.cn/library/nginx:latest` |
| **Docker Hub** | `rancher/rancher:latest` | `docker.registry.gdut.edu.cn/rancher/rancher:latest` |
| **Docker Hub** | `docker.io/foo/bar:latest` | `docker.registry.gdut.edu.cn/foo/bar:latest` |
| **GitHub Package Registry** | `ghcr.io/foo/bar:latest` | `ghcr.registry.gdut.edu.cn/foo/bar:latest` |
| **Red Hat Quay** | `quay.io/foo/bar:latest` | `quay.registry.gdut.edu.cn/foo/bar:latest` |
| **Kubernetes Container Registry** | `registry.k8s.io/foo/bar:latest` | `k8s.registry.gdut.edu.cn/foo/bar:latest` |
| **Microsoft Container Registry** | `mcr.microsoft.com/foo/bar:latest` | `mcr.registry.gdut.edu.cn/foo/bar:latest` |
| **Google Container Registry** | `gcr.io/foo/bar:latest` | `gcr.registry.gdut.edu.cn/foo/bar:latest` |
| **Elastic Docker registry** | `docker.elastic.co/foo/bar:latest` | `elastic.registry.gdut.edu.cn/foo/bar:latest` |
| **NVIDIA Container Registry** | `nvcr.io/foo/bar:latest` | `nvcr.registry.gdut.edu.cn/foo/bar:latest` |

### 各平台配置

以下按容器运行时平台分别介绍配置方法，可通过选项卡切换。除 Docker 仅支持域名置换模式外，其余平台均支持前缀添加模式与域名置换模式两种配置方式。

<Tabs groupId="container-platforms">
  <TabItem value="docker" label="Docker">

Docker 通过修改 Daemon 配置文件实现镜像加速。Docker 仅支持域名置换模式（子域名方式），不支持前缀添加模式的自动配置。

**修改 Docker Daemon 配置**

对 Docker Daemon 配置进行修改，在`registry-mirrors`中将本镜像站的Docker镜像加速地址添加上去：

```json
{
  "registry-mirrors": [
    "https://docker.registry.gdut.edu.cn"
  ]
}
```

**重启 Docker**

重启 Docker，让新配置生效，自此大功告成。

**快速配置脚本**

本镜像站提供了一个快速配置脚本，可以用于快速配置 Docker 镜像源。

:::note[仅适用于 Docker]
此快速配置脚本仅针对 Docker Daemon 设计，不适用于 Containerd、CRI-O、Podman、RKE2、OpenShift 等其他容器运行时。
:::

使用方法：直接执行以下命令即可（需要有管理员权限）

<Tabs groupId="operating-systems">
  <TabItem value="win" label="Windows">
    ```powershell
    curl.exe -sSL --insecure https://mirrors.gdut.edu.cn/scripts/configure-docker-registry.ps1 | powershell -NoProfile -ExecutionPolicy Bypass -
    ```
  </TabItem>
  <TabItem value="linux" label="Linux">
    ```bash
    curl -fsSL --insecure https://mirrors.gdut.edu.cn/scripts/configure-docker-registry.sh | sudo -E bash
    ```
  </TabItem>
</Tabs>

  </TabItem>
  <TabItem value="containerd" label="Containerd">

Containerd 2.x 推荐使用 `config_path` + `hosts.toml` 方式配置镜像加速（旧的 `[plugins."io.containerd.grpc.v1.cri".registry.mirrors]` 已废弃）。

**修改主配置文件**

编辑 `/etc/containerd/config.toml`，设置 `config_path`：

```toml
# /etc/containerd/config.toml
version = 3

[plugins."io.containerd.cri.v1.images".registry]
   config_path = "/etc/containerd/certs.d"
```

> 如果是 Containerd 1.x，插件路径为 `[plugins."io.containerd.grpc.v1.cri".registry]`。

**前缀添加模式（推荐）**

使用主域名 `registry.gdut.edu.cn`，无需配置 Hosts 与 CA 证书。为每个上游 registry 创建对应的 `hosts.toml`：

```toml
# /etc/containerd/certs.d/docker.io/hosts.toml
server = "https://registry-1.docker.io"

[host."https://registry.gdut.edu.cn/v2/docker.io"]
  capabilities = ["pull", "resolve"]
  override_path = true
```

```toml
# /etc/containerd/certs.d/gcr.io/hosts.toml
server = "https://gcr.io"

[host."https://registry.gdut.edu.cn/v2/gcr.io"]
  capabilities = ["pull", "resolve"]
  override_path = true
```

其他 registry（`ghcr.io`、`quay.io`、`registry.k8s.io` 等）按相同结构创建目录和 `hosts.toml` 即可。

**域名置换模式**

使用子域名（需先完成 [Hosts 与 CA 证书配置](#配置-hosts-文件)），将 host 指向对应的子域名：

```toml
# /etc/containerd/certs.d/docker.io/hosts.toml
server = "https://registry-1.docker.io"

[host."https://docker.registry.gdut.edu.cn"]
  capabilities = ["pull", "resolve"]
```

```toml
# /etc/containerd/certs.d/gcr.io/hosts.toml
server = "https://gcr.io"

[host."https://gcr.registry.gdut.edu.cn"]
  capabilities = ["pull", "resolve"]
```

**重启 Containerd**

修改 `config.toml` 后需重启，后续仅修改 `hosts.toml` 无需重启：

```bash
sudo systemctl restart containerd
```

  </TabItem>
  <TabItem value="crio" label="CRI-O">

CRI-O 从 `/etc/containers/registries.conf` 读取 registry 配置（与 Podman 共享）。`crio.conf` 中的 `registries` 字段已废弃。

**前缀添加模式（推荐）**

使用主域名 `registry.gdut.edu.cn`，无需配置 Hosts 与 CA 证书：

```toml
# /etc/containers/registries.conf

[[registry]]
prefix = "docker.io"
location = "docker.io"

  [[registry.mirror]]
  location = "registry.gdut.edu.cn/docker.io"

[[registry]]
prefix = "gcr.io"
location = "gcr.io"

  [[registry.mirror]]
  location = "registry.gdut.edu.cn/gcr.io"
```

其他 registry（`ghcr.io`、`quay.io`、`registry.k8s.io` 等）按相同结构添加即可。

**域名置换模式**

使用子域名（需先完成 [Hosts 与 CA 证书配置](#配置-hosts-文件)）：

```toml
# /etc/containers/registries.conf

[[registry]]
prefix = "docker.io"
location = "docker.io"

  [[registry.mirror]]
  location = "docker.registry.gdut.edu.cn"

[[registry]]
prefix = "gcr.io"
location = "gcr.io"

  [[registry.mirror]]
  location = "gcr.registry.gdut.edu.cn"
```

**重启 CRI-O**

```bash
sudo systemctl restart crio
```

> 也可通过 SIGHUP 热加载（需在 `crio.conf` 中设置 `auto_reload_registries = true`）：`sudo kill -SIGHUP $(pidof crio)`

  </TabItem>
  <TabItem value="podman" label="Podman">

Podman 与 CRI-O 共用 `/etc/containers/registries.conf`，配置语法完全相同。Podman 是无守护进程的（daemonless），修改配置后无需重启，下次执行 `podman pull` 时自动生效。

**前缀添加模式（推荐）**

使用主域名 `registry.gdut.edu.cn`，无需配置 Hosts 与 CA 证书：

```toml
# /etc/containers/registries.conf（系统级）
# 或 ~/.config/containers/registries.conf（用户级）

unqualified-search-registries = ["docker.io"]

[[registry]]
prefix = "docker.io"
location = "docker.io"

  [[registry.mirror]]
  location = "registry.gdut.edu.cn/docker.io"

[[registry]]
prefix = "gcr.io"
location = "gcr.io"

  [[registry.mirror]]
  location = "registry.gdut.edu.cn/gcr.io"

[[registry]]
prefix = "quay.io"
location = "quay.io"

  [[registry.mirror]]
  location = "registry.gdut.edu.cn/quay.io"
```

**域名置换模式**

使用子域名（需先完成 [Hosts 与 CA 证书配置](#配置-hosts-文件)）：

```toml
# /etc/containers/registries.conf

unqualified-search-registries = ["docker.io"]

[[registry]]
prefix = "docker.io"
location = "docker.io"

  [[registry.mirror]]
  location = "docker.registry.gdut.edu.cn"

[[registry]]
prefix = "gcr.io"
location = "gcr.io"

  [[registry.mirror]]
  location = "gcr.registry.gdut.edu.cn"
```

**无需重启**

Podman 是无守护进程的，配置文件在下次执行 `podman pull` 时自动生效。

  </TabItem>
  <TabItem value="rke2" label="RKE2">

RKE2 内嵌 containerd，启动时读取 `/etc/rancher/rke2/registries.yaml` 并生成 containerd 配置。支持通过 `rewrite` 字段实现路径前缀添加。

**前缀添加模式（推荐）**

使用主域名 `registry.gdut.edu.cn`，通过 `rewrite` 将镜像路径前缀添加上游 registry 名，无需配置 Hosts 与 CA 证书：

```yaml
# /etc/rancher/rke2/registries.yaml
mirrors:
  docker.io:
    endpoint:
      - "https://registry.gdut.edu.cn"
    rewrite:
      "^(.*)": "docker.io/$1"
  gcr.io:
    endpoint:
      - "https://registry.gdut.edu.cn"
    rewrite:
      "^(.*)": "gcr.io/$1"
  ghcr.io:
    endpoint:
      - "https://registry.gdut.edu.cn"
    rewrite:
      "^(.*)": "ghcr.io/$1"
  quay.io:
    endpoint:
      - "https://registry.gdut.edu.cn"
    rewrite:
      "^(.*)": "quay.io/$1"
```

**域名置换模式**

使用子域名（需先完成 [Hosts 与 CA 证书配置](#配置-hosts-文件)），直接指向对应子域名：

```yaml
# /etc/rancher/rke2/registries.yaml
mirrors:
  docker.io:
    endpoint:
      - "https://docker.registry.gdut.edu.cn"
  gcr.io:
    endpoint:
      - "https://gcr.registry.gdut.edu.cn"
  ghcr.io:
    endpoint:
      - "https://ghcr.registry.gdut.edu.cn"
  quay.io:
    endpoint:
      - "https://quay.registry.gdut.edu.cn"
```

**重启 RKE2**

```bash
# server 节点
sudo systemctl restart rke2-server
# agent 节点
sudo systemctl restart rke2-agent
```

> 如果在节点首次启动前配置好 `registries.yaml`，则无需重启。

  </TabItem>
  <TabItem value="openshift" label="OpenShift">

OpenShift 4.x 通过 Kubernetes CRD 对象配置 registry mirror，应用后由 Machine Config Operator 自动将配置写入节点的 `/etc/containers/registries.conf`。推荐使用 `ImageDigestMirrorSet`（digest 拉取）和 `ImageTagMirrorSet`（tag 拉取），旧的 `ImageContentSourcePolicy` 已废弃。

**前缀添加模式（推荐）**

使用主域名 `registry.gdut.edu.cn`，无需配置 Hosts 与 CA 证书：

```yaml
# gdut-mirror-idms.yaml
apiVersion: config.openshift.io/v1
kind: ImageDigestMirrorSet
metadata:
  name: gdut-mirror
spec:
  imageDigestMirrors:
  - source: docker.io
    mirrors:
    - registry.gdut.edu.cn/docker.io
    mirrorSourcePolicy: AllowContactingSource
  - source: gcr.io
    mirrors:
    - registry.gdut.edu.cn/gcr.io
    mirrorSourcePolicy: AllowContactingSource
  - source: quay.io
    mirrors:
    - registry.gdut.edu.cn/quay.io
    mirrorSourcePolicy: AllowContactingSource
```

```yaml
# gdut-mirror-itms.yaml
apiVersion: config.openshift.io/v1
kind: ImageTagMirrorSet
metadata:
  name: gdut-mirror
spec:
  imageTagMirrors:
  - source: docker.io
    mirrors:
    - registry.gdut.edu.cn/docker.io
    mirrorSourcePolicy: AllowContactingSource
```

**域名置换模式**

使用子域名（需先完成 [Hosts 与 CA 证书配置](#配置-hosts-文件)）：

```yaml
# gdut-mirror-idms.yaml
apiVersion: config.openshift.io/v1
kind: ImageDigestMirrorSet
metadata:
  name: gdut-mirror
spec:
  imageDigestMirrors:
  - source: docker.io
    mirrors:
    - docker.registry.gdut.edu.cn
    mirrorSourcePolicy: AllowContactingSource
  - source: gcr.io
    mirrors:
    - gcr.registry.gdut.edu.cn
    mirrorSourcePolicy: AllowContactingSource
  - source: quay.io
    mirrors:
    - quay.registry.gdut.edu.cn
    mirrorSourcePolicy: AllowContactingSource
```

**应用配置**

```bash
oc apply -f gdut-mirror-idms.yaml
oc apply -f gdut-mirror-itms.yaml

# 验证
oc get imagedigestmirrorset
oc get imagetagmirrorset
```

> `mirrorSourcePolicy: AllowContactingSource` 允许 mirror 失败时回退到源 registry，离线环境改为 `NeverContactSource`。

  </TabItem>
</Tabs>
