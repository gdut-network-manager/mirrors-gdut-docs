---
sidebar_position: 1
---

# Ubuntu Ports镜像使用帮助

### 收录架构

* 全部

### 收录版本

* 全部

### 更新时间

由于服务器磁盘空间不足，我们暂时不进行全量镜像，而是进行缓存。所有数据被请求过一次后即会缓存到服务器硬盘，缓存30天（对于会变动的文件，缓存时间为2小时）。


---

## 使用说明

这些架构的Ubuntu使用的是Ports源：`arm64` `armhf` `ppc64el` `riscv64` `s390x`

### **传统格式（`/etc/apt/sources.list`）：**

这里以 `focal`(20.04 LTS) 版本为例，编辑 `/etc/apt/sources.list` 文件, 修改为如下内容。（操作前请做好相应备份）

```ini title="/etc/apt/sources.list"
deb http://mirrors.gdut.edu.cn/ubuntu-ports/ focal main restricted universe multiverse
deb-src http://mirrors.gdut.edu.cn/ubuntu-ports/ focal main restricted universe multiverse
deb http://mirrors.gdut.edu.cn/ubuntu-ports/ focal-updates main restricted universe multiverse
deb-src http://mirrors.gdut.edu.cn/ubuntu-ports/ focal-updates main restricted universe multiverse
deb http://mirrors.gdut.edu.cn/ubuntu-ports/ focal-backports main restricted universe multiverse
deb-src http://mirrors.gdut.edu.cn/ubuntu-ports/ focal-backports main restricted universe multiverse
deb http://mirrors.gdut.edu.cn/ubuntu-ports/ focal-security main restricted universe multiverse
deb-src http://mirrors.gdut.edu.cn/ubuntu-ports/ focal-security main restricted universe multiverse
# 预发布软件源，不建议启用
# deb http://mirrors.gdut.edu.cn/ubuntu-ports/ focal-proposed main restricted universe multiverse
# deb-src http://mirrors.gdut.edu.cn/ubuntu-ports/ focal-proposed main restricted universe multiverse
```

如果使用其它版本，将对应的版本代号替换掉`bionic`即可。

如 22.04 LTS 版本代号为`jammy`，则其`/etc/apt/sources.list`文件内容如下：

```ini title="/etc/apt/sources.list"
deb http://mirrors.gdut.edu.cn/ubuntu-ports/ jammy main restricted universe multiverse
deb-src http://mirrors.gdut.edu.cn/ubuntu-ports/ jammy main restricted universe multiverse
deb http://mirrors.gdut.edu.cn/ubuntu-ports/ jammy-updates main restricted universe multiverse
deb-src http://mirrors.gdut.edu.cn/ubuntu-ports/ jammy-updates main restricted universe multiverse
deb http://mirrors.gdut.edu.cn/ubuntu-ports/ jammy-backports main restricted universe multiverse
deb-src http://mirrors.gdut.edu.cn/ubuntu-ports/ jammy-backports main restricted universe multiverse
deb http://mirrors.gdut.edu.cn/ubuntu-ports/ jammy-security main restricted universe multiverse
deb-src http://mirrors.gdut.edu.cn/ubuntu-ports/ jammy-security main restricted universe multiverse
# 预发布软件源，不建议启用
# deb http://mirrors.gdut.edu.cn/ubuntu-ports/ jammy-proposed main restricted universe multiverse
# deb-src http://mirrors.gdut.edu.cn/ubuntu-ports/ jammy-proposed main restricted universe multiverse
```

如 18.04 LTS 版本代号为`bionic`，则其`/etc/apt/sources.list`文件内容如下：

```ini title="/etc/apt/sources.list"
deb http://mirrors.gdut.edu.cn/ubuntu-ports/ bionic main restricted universe multiverse
deb-src http://mirrors.gdut.edu.cn/ubuntu-ports/ bionic main restricted universe multiverse
deb http://mirrors.gdut.edu.cn/ubuntu-ports/ bionic-updates main restricted universe multiverse
deb-src http://mirrors.gdut.edu.cn/ubuntu-ports/ bionic-updates main restricted universe multiverse
deb http://mirrors.gdut.edu.cn/ubuntu-ports/ bionic-backports main restricted universe multiverse
deb-src http://mirrors.gdut.edu.cn/ubuntu-ports/ bionic-backports main restricted universe multiverse
deb http://mirrors.gdut.edu.cn/ubuntu-ports/ bionic-security main restricted universe multiverse
deb-src http://mirrors.gdut.edu.cn/ubuntu-ports/ bionic-security main restricted universe multiverse
# 预发布软件源，不建议启用
# deb http://mirrors.gdut.edu.cn/ubuntu-ports/ focal-proposed main restricted universe multiverse
# deb-src http://mirrors.gdut.edu.cn/ubuntu-ports/ focal-proposed main restricted universe multiverse
```

### **DEB822 格式（`/etc/apt/sources.list.d/ubuntu.sources`）：**

自 Ubuntu 22 起，Ubuntu 开始支持通过 DEB822 格式的配置文件来配置 deb 镜像源，这里以 `noble`（24.04LTS）为例，配置文件应修改为如下内容

```ini title="/etc/apt/sources.list.d/ubuntu.sources"
Types: deb
URIs: https://mirrors.gdut.edu.cn/ubuntu-ports
Suites: noble noble-updates noble-backports
Components: main restricted universe multiverse
Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg

# 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释
# Types: deb-src
# URIs: https://mirrors.gdut.edu.cn/ubuntu-ports
# Suites: noble noble-updates noble-backports
# Components: main restricted universe multiverse
# Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg

# 以下安全更新软件源包含了官方源与镜像站配置，如有需要可自行修改注释切换
# Types: deb
# URIs: https://mirrors.gdut.edu.cn/ubuntu-ports
# Suites: noble-security
# Components: main restricted universe multiverse
# Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg

# # Types: deb-src
# # URIs: https://mirrors.gdut.edu.cn/ubuntu-ports
# # Suites: noble-security
# # Components: main restricted universe multiverse
# # Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg

Types: deb
URIs: http://ports.ubuntu.com/ubuntu-ports/
Suites: noble-security
Components: main restricted universe multiverse
Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg

# Types: deb-src
# URIs: http://ports.ubuntu.com/ubuntu-ports/
# Suites: noble-security
# Components: main restricted universe multiverse
# Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg

# 预发布软件源，不建议启用
# Types: deb
# URIs: https://mirrors.gdut.edu.cn/ubuntu-ports
# Suites: noble-proposed
# Components: main restricted universe multiverse
# Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg

# # Types: deb-src
# # URIs: https://mirrors.gdut.edu.cn/ubuntu-ports
# # Suites: noble-proposed
# # Components: main restricted universe multiverse
# # Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg
```

