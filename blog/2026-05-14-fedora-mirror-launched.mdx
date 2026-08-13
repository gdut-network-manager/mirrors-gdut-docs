---
slug: fedora-mirror-launched
title: Fedora 镜像上线
authors: [gdutnic, gregPerlinLi]
tags: [新镜像上线]
date: 2026-05-14
---

本站现已上线 Fedora 软件仓库镜像，提供 Fedora 官方支持的版本的软件包缓存加速服务。

{/* truncate */}

## 镜像信息

- **地址**：`https://mirrors.gdut.edu.cn/fedora`
- **架构**：AMD 64、ARM 64
- **版本**：官方支持的版本
- **更新策略**：缓存加速

:::note[注意]

Fedora 38 及更旧版本已不再受官方支持，官方已将其软件仓库从主镜像中移除并转移至 archive 镜像。因此 Fedora 38 及更旧版本无法使用本镜像，请使用默认配置文件让 `dnf` 自动获取可用的镜像源。

:::

## 使用方法

Fedora 默认使用 Metalink 推荐镜像列表，通常无需修改配置。对于校园内网等无法访问国外服务器的情况，可以通过 `sed` 命令一键替换软件源配置：

```bash
sudo sed -e 's|^metalink=|#metalink=|g' \
    -e 's|^#baseurl=http://download.example/pub/fedora/linux|baseurl=https://mirrors.gdut.edu.cn/fedora|g' \
    -i.bak \
    /etc/yum.repos.d/fedora.repo \
    /etc/yum.repos.d/fedora-updates.repo
```

替换后执行 `sudo dnf makecache` 更新本地缓存即可。

详细的配置方法（含手动替换方式）请参阅 [Fedora 镜像使用帮助](/help/docs/mirrors/fedora-help)。
