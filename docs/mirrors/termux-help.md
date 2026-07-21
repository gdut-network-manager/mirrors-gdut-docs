---
sidebar_position: 1
---

# Termux 镜像使用帮助

## 简介

Termux 是一个 Android 终端模拟器和 Linux 环境应用，无需 root 权限或额外设置即可直接使用。本镜像提供 Termux 软件包仓库的镜像服务，加速 Termux 软件包的下载。

## 镜像信息

- **更新策略**：每 6 小时更新一次

## 使用说明

执行如下命令对源进行替换和更新：

```bash
sed -i 's@^\(deb.*stable main\)$@#\1\ndeb http://mirrors.gdut.edu.cn/termux stable main@' $PREFIX/etc/apt/sources.list
apt update && apt upgrade
```

或者修改 `$PREFIX/etc/apt/sources.list` 为如下内容：

```ini title="sources.list"
# The termux repository mirror from GDUT:
deb https://mirrors.gdut.edu.cn/termux stable main
```
