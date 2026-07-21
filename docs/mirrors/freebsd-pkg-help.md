---
sidebar_position: 1
---

# FreeBSD PKG 镜像使用帮助

## 简介

FreeBSD PKG 是 FreeBSD 系统的二进制软件包管理器，用于安装、更新和管理预编译的软件包。由于官方仓库体积较大，本站采用缓存方式提供 PKG 源服务，被请求过的数据会缓存到服务器，有效提升后续下载速度。

## 镜像信息

- **架构**：全部
- **版本**：全部
- **更新策略**：由于仓库太大，官方不推荐镜像，故我们不进行全量镜像，而是进行缓存。所有数据被请求过一次后即会缓存到服务器硬盘，缓存30天（对于会变动的文件，缓存时间为2小时）。

## 使用说明

修改文件：`/usr/local/etc/pkg/repos/FreeBSD.conf`

```ini title="/usr/local/etc/pkg/repos/FreeBSD.conf"
FreeBSD: {
  url: "pkg+http://mirrors.gdut.edu.cn/freebsd-pkg/${ABI}/quarterly",
}
```

修改配置后，运行以下命令更新索引

```bash
pkg update -f
```
