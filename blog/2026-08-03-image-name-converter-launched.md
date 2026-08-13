---
slug: image-name-converter-launched
title: 镜像名称转换工具上线
authors: [gregPerlinLi]
tags: [功能更新]
date: 2026-08-03
---

本站 Docker 镜像浏览器与帮助文档中心同步上线「镜像名称转换工具」，帮助用户快速将 Docker Hub 镜像名转换为本站 Registry 加速地址。

{/* truncate */}

## 功能说明

输入任意 Docker 镜像名（如 `nginx:1.27`、`library/redis`、`quay.io/prometheus/node-exporter`），工具会自动：

1. **解析所属 Registry**：识别 Docker Hub、GitHub Container Registry、GitLab Container Registry、Quay、Google Container Registry 等主流 Registry
2. **生成本站加速拉取命令**：自动添加 `registry.gdut.edu.cn` 前缀，生成就绪可复制的 `docker pull` / `podman pull` / `ctr content pull` 命令
3. **提供恢复标签命令**：生成将镜像重新标记为原始名称的 `docker tag` 命令，方便后续推送或使用

## 两种模式

- **前缀添加模式**：在原始镜像名前添加本站 Registry 前缀（如 `registry.gdut.edu.cn/docker/library/nginx`）
- **域名置换模式**：将原始 Registry 域名替换为本站 Registry 域名（如 `registry.gdut.edu.cn/library/nginx`）

## 使用位置

该工具已集成在以下两个页面：

- [Docker 镜像浏览器](https://mirrors.gdut.edu.cn/docker)
- [Docker 镜像使用帮助文档](/help/docs/mirrors/docker-help)

---

相关项目：

- [Docker 镜像浏览器](https://github.com/gdut-network-manager/mirrors-gdut-registry-browser)
- [文档中心](https://github.com/gdut-network-manager/mirrors-gdut-docs)
