---
sidebar_position: 1
---

# Go 镜像使用帮助

## 简介

Go 模块代理（GOPROXY）用于加速 Go 语言模块的下载。本镜像提供 Go 模块仓库的缓存代理服务，加速 Go 依赖包的获取。

## 镜像信息

- **更新策略**：缓存代理，实时回源上游仓库。

## 使用说明

### 临时使用

```bash
export GO111MODULE=on
export GOPROXY=http://mirrors.gdut.edu.cn/repository/go/
export GOSUMDB=off
```

### 长期使用

编辑 `~/.bash_profile` 文件,在末尾添加如下配置:

```bash title="~/.bash_profile"
export GO111MODULE=on
export GOPROXY=http://mirrors.gdut.edu.cn/repository/go/
export GOSUMDB=off
```

配置完成后执行 `source ~/.bash_profile` 即可刷新配置
