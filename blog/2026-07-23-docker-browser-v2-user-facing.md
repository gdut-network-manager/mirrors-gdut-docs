---
slug: docker-browser-v2-user-facing
title: Docker 镜像浏览器重构 v2.0 上线
authors: [gregPerlinLi]
tags: [功能更新]
date: 2026-07-23
---

本站 Docker 镜像浏览器已完成 v2.0 重构并正式上线，为用户提供全新的镜像浏览与拉取体验。

{/* truncate */}

## 访问地址

**[https://mirrors.gdut.edu.cn/docker](https://mirrors.gdut.edu.cn/docker)**

## 新功能亮点

### 四级页面浏览

重构后的镜像浏览器提供 **项目列表 → 仓库列表 → 标签列表 → 制品详情** 的四级浏览层级，结构清晰，方便快速定位目标镜像。

- **项目列表页**：展示所有项目的配额进度条、仓库数量、空间使用量与创建时间
- **仓库列表页**：浏览项目下的所有镜像仓库
- **标签列表页**：查看仓库下的所有标签（Tag）
- **制品详情页**：查看制品类型、Manifest 等详细信息

### 双模式拉取命令

每个仓库页面都提供 **前缀模式** 和 **域名置换模式** 两种拉取命令，带滑块切换，一键复制即可使用。

### 明暗主题切换

支持手动切换明暗主题，并可自动跟随系统偏好。

### 制品类型徽章

制品页面展示类型徽章（IMAGE / CHART / WASM / SBOM / CNAI 等），一眼区分制品类型。

### 全新图标系统

采用 Lucide 风格 SVG 图标系统替换全部旧版 PNG 图标，视觉统一、清晰锐利。

---

项目源码：[gdut-network-manager/mirrors-gdut-registry-browser](https://github.com/gdut-network-manager/mirrors-gdut-registry-browser)
