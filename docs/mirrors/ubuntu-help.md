---
sidebar_position: 1
---

# Ubuntu镜像使用帮助

### 收录架构

* 全部

### 收录版本

* 全部

### 更新时间

每6小时更新一次


---

## 使用说明

### **传统格式（`/etc/apt/sources.list`）：**

这里以 `focal`(20.04 LTS) 版本为例，编辑`/etc/apt/sources.list`文件, 修改为如下内容。（操作前请做好相应备份）

```ini title="/etc/apt/sources.list"
deb http://mirrors.gdut.edu.cn/ubuntu/ focal main restricted universe multiverse
deb-src http://mirrors.gdut.edu.cn/ubuntu/ focal main restricted universe multiverse
deb http://mirrors.gdut.edu.cn/ubuntu/ focal-updates main restricted universe multiverse
deb-src http://mirrors.gdut.edu.cn/ubuntu/ focal-updates main restricted universe multiverse
deb http://mirrors.gdut.edu.cn/ubuntu/ focal-backports main restricted universe multiverse
deb-src http://mirrors.gdut.edu.cn/ubuntu/ focal-backports main restricted universe multiverse
deb http://mirrors.gdut.edu.cn/ubuntu/ focal-security main restricted universe multiverse
deb-src http://mirrors.gdut.edu.cn/ubuntu/ focal-security main restricted universe multiverse
# 预发布软件源，不建议启用
# deb http://mirrors.gdut.edu.cn/ubuntu/ focal-proposed main restricted universe multiverse
# deb-src http://mirrors.gdut.edu.cn/ubuntu/ focal-proposed main restricted universe multiverse
```

如果使用其它版本，将对应的版本代号替换掉`bionic`即可。

如 22.04 LTS 版本代号为`jammy`，则其`/etc/apt/sources.list`文件内容如下：

```ini title="/etc/apt/sources.list"
deb http://mirrors.gdut.edu.cn/ubuntu/ jammy main restricted universe multiverse
deb-src http://mirrors.gdut.edu.cn/ubuntu/ jammy main restricted universe multiverse
deb http://mirrors.gdut.edu.cn/ubuntu/ jammy-updates main restricted universe multiverse
deb-src http://mirrors.gdut.edu.cn/ubuntu/ jammy-updates main restricted universe multiverse
deb http://mirrors.gdut.edu.cn/ubuntu/ jammy-backports main restricted universe multiverse
deb-src http://mirrors.gdut.edu.cn/ubuntu/ jammy-backports main restricted universe multiverse
deb http://mirrors.gdut.edu.cn/ubuntu/ jammy-security main restricted universe multiverse
deb-src http://mirrors.gdut.edu.cn/ubuntu/ jammy-security main restricted universe multiverse
# 预发布软件源，不建议启用
# deb http://mirrors.gdut.edu.cn/ubuntu/ jammy-proposed main restricted universe multiverse
# deb-src http://mirrors.gdut.edu.cn/ubuntu/ jammy-proposed main restricted universe multiverse
```

如 18.04 LTS 版本代号为`bionic`，则其`/etc/apt/sources.list`文件内容如下：

```ini title="/etc/apt/sources.list"
deb http://mirrors.gdut.edu.cn/ubuntu/ bionic main restricted universe multiverse
deb-src http://mirrors.gdut.edu.cn/ubuntu/ bionic main restricted universe multiverse
deb http://mirrors.gdut.edu.cn/ubuntu/ bionic-updates main restricted universe multiverse
deb-src http://mirrors.gdut.edu.cn/ubuntu/ bionic-updates main restricted universe multiverse
deb http://mirrors.gdut.edu.cn/ubuntu/ bionic-backports main restricted universe multiverse
deb-src http://mirrors.gdut.edu.cn/ubuntu/ bionic-backports main restricted universe multiverse
deb http://mirrors.gdut.edu.cn/ubuntu/ bionic-security main restricted universe multiverse
deb-src http://mirrors.gdut.edu.cn/ubuntu/ bionic-security main restricted universe multiverse
# 预发布软件源，不建议启用
# deb http://mirrors.gdut.edu.cn/ubuntu/ bionic-proposed main restricted universe multiverse
# deb-src http://mirrors.gdut.edu.cn/ubuntu/ bionic-proposed main restricted universe multiverse
```

### **DEB822 格式（`/etc/apt/sources.list.d/ubuntu.sources`）：**

自 Ubuntu 22 起，Ubuntu 开始支持通过 DEB822 格式的配置文件来配置 deb 镜像源，这里以 `noble`（24.04LTS）为例，配置文件应修改为如下内容

```ini title="/etc/apt/sources.list.d/ubuntu.sources"
Types: deb
URIs: https://mirrors.gdut.edu.cn/ubuntu
Suites: noble noble-updates noble-backports
Components: main restricted universe multiverse
Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg

# 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释
# Types: deb-src
# URIs: https://mirrors.gdut.edu.cn/ubuntu
# Suites: noble noble-updates noble-backports
# Components: main restricted universe multiverse
# Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg

# 以下安全更新软件源包含了官方源与镜像站配置，如有需要可自行修改注释切换
# Types: deb
# URIs: https://mirrors.gdut.edu.cn/ubuntu
# Suites: noble-security
# Components: main restricted universe multiverse
# Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg

# # Types: deb-src
# # URIs: https://mirrors.gdut.edu.cn/ubuntu
# # Suites: noble-security
# # Components: main restricted universe multiverse
# # Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg

Types: deb
URIs: http://security.ubuntu.com/ubuntu/
Suites: noble-security
Components: main restricted universe multiverse
Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg

# Types: deb-src
# URIs: http://security.ubuntu.com/ubuntu/
# Suites: noble-security
# Components: main restricted universe multiverse
# Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg

# 预发布软件源，不建议启用
# Types: deb
# URIs: https://mirrors.gdut.edu.cn/ubuntu
# Suites: noble-proposed
# Components: main restricted universe multiverse
# Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg

# # Types: deb-src
# # URIs: https://mirrors.gdut.edu.cn/ubuntu
# # Suites: noble-proposed
# # Components: main restricted universe multiverse
# # Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg
```

