---
sidebar_position: 1
---

# EPEL镜像使用帮助

### 收录架构

* 全部

### 收录版本

* 全部

### 更新时间

每6小时更新一次


---

## 使用说明

EPEL(Extra Packages for Enterprise Linux)是由Fedora Special Interest Group维护的Enterprise Linux（RHEL、CentOS）中经常用到的包。

下面以CentOS 7为例讲解如何使用epel镜像。

首先从CentOS Extras这个源里安装 `epel-release`：

```bash
yum install epel-release
```

修改 `/etc/yum.repos.d/epel.repo`，将baseurl开头的行取消注释（删掉`#`），并注释`mirrorlist` 开头的行（在头部加一个`#`）。

接下来，把这个文件里的 `http://download.fedoraproject.org/pub` 替换成 `http://mirrors.gdut.edu.cn` 即可。

修改结果如下

```toml title="/etc/yum.repos.d/epel.repo"
[epel]
name=Extra Packages for Enterprise Linux 7 - $basearch
baseurl=http://mirrors.gdut.edu.cn/epel/7/$basearch
#mirrorlist=https://mirrors.fedoraproject.org/metalink?repo=epel-7&arch=$basearch
failovermethod=priority
enabled=1
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-EPEL-7

[epel-debuginfo]
name=Extra Packages for Enterprise Linux 7 - $basearch - Debug
baseurl=http://mirrors.gdut.edu.cn/epel/7/$basearch/debug
#mirrorlist=https://mirrors.fedoraproject.org/metalink?repo=epel-debug-7&arch=$basearch
failovermethod=priority
enabled=0
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-EPEL-7
gpgcheck=1

[epel-source]
name=Extra Packages for Enterprise Linux 7 - $basearch - Source
baseurl=http://mirrors.gdut.edu.cn/epel/7/SRPMS
#mirrorlist=https://mirrors.fedoraproject.org/metalink?repo=epel-source-7&arch=$basearch
failovermethod=priority
enabled=0
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-EPEL-7
gpgcheck=1
```

最后运行 `yum update` 。
