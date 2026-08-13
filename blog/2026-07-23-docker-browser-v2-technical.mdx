---
slug: docker-browser-v2-technical
title: Docker 镜像浏览器 v2.0 技术重构纪要
authors: [gregPerlinLi]
tags: [技术博客]
date: 2026-07-23
---

本文记录 Docker 镜像浏览器 v2.0 重构的技术决策与架构变化，面向对实现细节感兴趣的读者。

{/* truncate */}

## 重构动机

v1 基于 Docker Registry HTTP API V2 构建，随着镜像站后端迁移至 Harbor Proxy Cache 架构，旧的 API 适配层逐渐成为维护负担。v2.0 决定直接对接 Harbor 原生 API（`/api/v2.0/），移除中间适配层，从根本上解决 API 兼容性问题。

## 架构变化

### API 层

| 维度 | v1 | v2.0 |
| --- | --- | --- |
| API | Docker Registry HTTP API V2 | Harbor 原生 API (`/api/v2.0/`) |
| 认证 | 逐请求获取 token | 全局 Basic Auth（robot account） |
| 数据模型 | Resource / Current | Project / Registry / Artifact |

v2.0 使用 Harbor robot account 进行全局 Basic Auth 认证，避免了 v1 中每次请求都需要获取 token 的开销。`ObtainAuthenticationToken` 服务连同相关的 token 缓存逻辑被整体移除。

### 页面层级

v1 的两级结构（仓库列表 → 标签列表）扩展为 v2.0 的四级结构：

- **项目列表** → 仓库列表 → 标签列表 → 制品详情

新增的项目列表页展示 Harbor Project 的配额进度条、仓库数量和空间使用量，这些信息直接来自 Harbor API 的 quota 响应。

### 模型重构

删除了 `Resource`、`Current` 等旧模型，新增 `HarborClient`（API 客户端）、`Project`、`Registry`、`Artifact` 等模型，与 Harbor 的领域模型直接对应。同时移除了排序和删除逻辑——这些操作在 Proxy Cache 模式下不应暴露给前端。

## 关键技术决策

### 双模式拉取命令

v2.0 在仓库页面提供前缀模式与域名置换模式两种拉取命令，通过滑块切换。前缀模式（`registry.gdut.edu.cn/docker/library/nginx`）适合大多数场景；域名置换模式（`registry.gdut.edu.cn/library/nginx`）则用于需要保持镜像名完整的场景。

### Markdown 渲染

仓库描述信息 Tab 使用 Commonmarker 进行 Markdown 渲染，支持 Harbor 中配置的仓库 README。

### 图标系统

使用 Lucide 风格 SVG 图标替换全部 PNG 图标，统一了视觉风格并消除了多尺寸适配问题。

---

重构起始 commit：[`8c4c7bc`](https://github.com/gdut-network-manager/mirrors-gdut-registry-browser/commit/8c4c7bccd5d7d097bae20fa38944ba4f49c4ce74)

项目源码：[gdut-network-manager/mirrors-gdut-registry-browser](https://github.com/gdut-network-manager/mirrors-gdut-registry-browser)
