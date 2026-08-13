---
slug: docs-frontend-redesign
title: 文档中心前端重构上线
authors: [gregPerlinLi]
tags: [功能更新]
date: 2026-07-22
---

本站帮助文档中心已完成前端重构，带来全新的视觉风格与浏览体验。

{/* truncate */}

## 全新视觉风格

本次重构将文档中心的主题配色与 [镜像站主页](https://mirrors.gdut.edu.cn) 全面对齐：采用统一的主色调与 Inter 字体，导航栏改为全宽毛玻璃效果，页脚调整为实体表面风格，整体视觉语言与镜像站保持一致。

## 首页 Bento Grid 布局

首页重构为 Bento Grid 布局：

- **Hero 区域**：实体渐变背景搭配渐变标题，简洁醒目
- **镜像帮助链接卡片**：20 个镜像帮助文档以品牌图标卡片形式展示，一目了然
- **侧边栏三大入口**：快速访问镜像站主页、GitHub 源码与广东工业大学官网

## 品牌图标

新增 20 个镜像品牌图标（SVG / PNG），覆盖 Ubuntu、Debian、CentOS、Arch Linux、Fedora、Docker、PyPI 等主流镜像源，首页浏览体验更加直观。

## 暗色模式与语法高亮

保留 Dracula 暗色语法高亮主题，配合鼠标跟随光效与 SVG 折射滤镜，暗色模式下代码阅读体验更加舒适。

---

项目源码：[gdut-network-manager/mirrors-gdut-docs](https://github.com/gdut-network-manager/mirrors-gdut-docs)
