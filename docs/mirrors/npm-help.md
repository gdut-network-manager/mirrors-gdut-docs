---
sidebar_position: 1
---

# npm 镜像使用帮助

## 简介

npm 是 Node.js 的默认包管理器，用于安装、共享和管理 JavaScript 包。本镜像提供 npm 仓库的缓存代理服务，加速 Node.js 包的下载。

## 镜像信息

- **更新策略**：缓存代理，实时回源上游仓库。

## 使用说明

本镜像站支持 HTTPS，如果 npm 使用 HTTP 的源报错，可以尝试将 URL 改成 HTTPS。

### 临时使用

```bash
npm --registry https://repo.gdut.edu.cn/repository/npm install express
```

### 持久使用

```bash
npm config set registry https://repo.gdut.edu.cn/repository/npm
# 配置后可通过下面方式来验证是否成功
npm config get registry
# 或
npm info express
```
