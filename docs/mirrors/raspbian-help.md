---
sidebar_position: 1
---

# Raspbian镜像使用帮助

### 收录架构

* 全部

### 收录版本

* 全部

### 更新时间

每6小时更新一次


---

## Raspbian简介

Raspbian 是专门用于 ARM 卡片式计算机 Raspberry Pi® “树莓派”的操作系统。

Raspbian 是树莓派的开发与维护机构 The Raspbeery Pi Foundation “树莓派基金会”，推荐用于树莓派的首选系统。

由于以下原因，Raspbian 需要单独组建软件仓库，而不能使用 Debian 的仓库：

*  Debian下所有的软件包都需要用 armhf 重新编译。
*  树莓派有部分特有的软件包，例如 BCM2835 CPU 的 GPIO 底层操作库。
*  树莓派用户倾向于探索、尝试最新的软件。这与 Debian 软件源的策略完全不同。

## 使用说明

推荐同时修改[RaspberryPi源](/docs/mirrors/raspberrypi-help)。

根据对应的debian版本，编辑 `/etc/apt/sources.list` 文件, 修改为如下内容。（操作前请做好相应备份）

### buster

```ini title="/etc/apt/sources.list"
deb http://mirrors.gdut.edu.cn/raspbian/raspbian/ buster main non-free contrib
deb-src http://mirrors.gdut.edu.cn/raspbian/raspbian/ buster main non-free contrib
```

### stretch

```ini title="/etc/apt/sources.list"
deb http://mirrors.gdut.edu.cn/raspbian/raspbian/ stretch main non-free contrib
deb-src http://mirrors.gdut.edu.cn/raspbian/raspbian/ stretch main non-free contrib
```

### jessie

```ini title="/etc/apt/sources.list"
deb http://mirrors.gdut.edu.cn/raspbian/raspbian/ jessie main non-free contrib
deb-src http://mirrors.gdut.edu.cn/raspbian/raspbian/ jessie main non-free contrib
```

### wheezy

```ini title="/etc/apt/sources.list"
deb http://mirrors.gdut.edu.cn/raspbian/raspbian/ wheezy main non-free contrib
deb-src http://mirrors.gdut.edu.cn/raspbian/raspbian/ wheezy main non-free contrib
```

