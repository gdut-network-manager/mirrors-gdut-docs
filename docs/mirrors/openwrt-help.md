---
sidebar_position: 1
---

# OpenWRT镜像使用帮助

## 介绍

OpenWRT（曾用名 LEDE）是一款广泛应用于路由器的嵌入式操作系统。本站提供 OpenWRT 的包管理器 `opkg` 的 release 部分镜像。

## **手工替换**

登录到路由器，并编辑 `/etc/opkg/distfeeds.conf` 文件，将其中的 `http://downloads.openwrt.org` 替换为

```toml
https://mirrors.gdut.edu.cn/openwrt
```

即可。

## **自动替换**

执行如下命令自动替换

```bash
sed -i 's_https\?://downloads.openwrt.org_https://mirrors.gdut.edu.cn/openwrt_' /etc/opkg/distfeeds.conf
```

注：使用 HTTPS 可以有效避免国内运营商的缓存劫持，但需要另行安装 `libustream-openssl ca-bundle ca-ce`

