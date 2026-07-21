---
sidebar_position: 1
---

# ArchlinuxCN 镜像使用帮助

## 简介

archlinuxcn 仓库是由 Arch Linux 中文社区维护的第三方软件仓库，提供官方仓库中未收录的软件包，如中文输入法、常用桌面应用等。本镜像提供 archlinuxcn 仓库的镜像服务。

## 镜像信息

- **架构**：全部
- **版本**：全部
- **更新策略**：每6小时更新一次

## 使用说明

在 `/etc/pacman.conf` 文件末尾添加以下两行：

```ini title="/etc/pacman.conf"
[archlinuxcn]
Server = http://mirrors.gdut.edu.cn/archlinuxcn/$arch
```

之后执行以下命令导入 GPG key：

```bash
sudo pacman -S archlinuxcn-keyring
```

再执行以下命令更新一下源：

```bash
sudo pacman -Sy
```
