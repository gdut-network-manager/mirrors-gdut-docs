---
sidebar_position: 1
---

# RaspberryPi 镜像使用帮助

## 简介

树莓派的 archive.raspberrypi.org 软件源。是由树莓派基金会提供的软件源，包括 ui 相关程序 ( 如 Raspbian 的桌面环境 PIXEL DE) 及部分由树莓派基金会为树莓派编写的软件。

## 镜像信息

- **架构**：全部
- **版本**：全部
- **更新策略**：每6小时更新一次

## 使用说明

如果使用Raspbian，推荐同时修改[Raspbian源](raspbian-help)。

根据对应的debian版本，编辑`/etc/apt/sources.list.d/raspi.list`文件, 修改为如下内容。（操作前请做好相应备份）

### bookworm

```ini title="/etc/apt/sources.list.d/raspi.list"
deb http://mirrors.gdut.edu.cn/raspberrypi/debian/ bookworm main ui
deb-src http://mirrors.gdut.edu.cn/raspberrypi/debian/ bookworm main ui
```

### bullseye

```ini title="/etc/apt/sources.list.d/raspi.list"
deb http://mirrors.gdut.edu.cn/raspberrypi/debian/ bullseye main ui
deb-src http://mirrors.gdut.edu.cn/raspberrypi/debian/ bullseye main ui
```

### buster

```ini title="/etc/apt/sources.list.d/raspi.list"
deb http://mirrors.gdut.edu.cn/raspberrypi/debian/ buster main ui
deb-src http://mirrors.gdut.edu.cn/raspberrypi/debian/ buster main ui
```

### stretch

```ini title="/etc/apt/sources.list.d/raspi.list"
deb http://mirrors.gdut.edu.cn/raspberrypi/debian/ stretch main ui
deb-src http://mirrors.gdut.edu.cn/raspberrypi/debian/ stretch main ui
```

### jessie

```ini title="/etc/apt/sources.list.d/raspi.list"
deb http://mirrors.gdut.edu.cn/raspberrypi/debian/ jessie main ui
deb-src http://mirrors.gdut.edu.cn/raspberrypi/debian/ jessie main ui
```
