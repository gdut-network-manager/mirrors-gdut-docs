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

这种模式主要用在 Docker Daemon 配置中

由于学校未提供 `registry.gdut.edu.cn` 的子域名的解析及公共 TLS 证书，因此需要进行一些额外的配置

#### 配置 Hosts 文件

在本机所在的 Hosts 文件中添加以下记录，Hosts 文件的路径会因系统而异，请自行百度：

```ini
# GDUT Mirrors Registry
222.200.97.228 docker.registry.gdut.edu.cn
222.200.97.228 ghcr.registry.gdut.edu.cn
222.200.97.228 quay.registry.gdut.edu.cn
222.200.97.228 k8s.registry.gdut.edu.cn
222.200.97.228 mcr.registry.gdut.edu.cn
222.200.97.228 gcr.registry.gdut.edu.cn
222.200.97.228 nvcr.registry.gdut.edu.cn
222.200.97.228 elastic.registry.gdut.edu.cn
# GDUT Mirrors Registry END
```

#### 信任镜像站的自签署 CA 证书

[点此](https://mirrors.gdut.edu.cn/certs/mirrors-ca.crt)下载镜像站的CA证书，然后安装到本机并信任该证书

#### 修改 Docker Daemon 配置

对 Docker Daemon 配置进行修改，在`registry-mirrors`中将本镜像站的Docker镜像加速地址添加上去：

```json
{
  "registry-mirrors": [
    "https://docker.registry.gdutnic.com"
  ]
}
```

#### 重启 Docker

重启 Docker，让新配置生效，自此大功告成。

#### 快速配置脚本

本镜像站提供了一个快速配置脚本，可以用于快速配置 Docker 镜像源。

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
