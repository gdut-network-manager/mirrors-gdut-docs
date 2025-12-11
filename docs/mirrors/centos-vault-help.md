---
sidebar_position: 1
---

# CentOS Vault镜像使用帮助

### 收录架构

* 全部

### 收录版本

* 全部

### 更新时间

由于CentOS Vault镜像占用空间大，并且访问数量少，所以我们只进行缓存，所有文件缓存30天。


---

## 使用说明

这是储存CentOS过时版本的仓库。

首先备份 `/etc/yum.repos.d/CentOS-Base.repo`

```bash
mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup
```

根据对应的CentOS版本，编辑 `/etc/yum.repos.d/CentOS-Base.repo` 文件, 修改为对应内容。（详见后面配置参考）

最后运行以下命令生成缓存

```bash
yum clean all
yum makecache
```

## 配置参考

如果是 CentOS 6 ，则把 `/etc/yum.repos.d/CentOS-Base.repo` 修改为下面的内容：

```toml title="/etc/yum.repos.d/CentOS-Base.repo"
[base]
name=CentOS-$releasever - Base
baseurl=http://mirrors.gdut.edu.cn/centos-vault/$releasever/os/$basearch/
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-6

[updates]
name=CentOS-$releasever - Updates
baseurl=http://mirrors.gdut.edu.cn/centos-vault/$releasever/updates/$basearch/
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-6

[extras]
name=CentOS-$releasever - Extras
baseurl=http://mirrors.gdut.edu.cn/centos-vault/$releasever/extras/$basearch/
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-6

[centosplus]
name=CentOS-$releasever - Plus
baseurl=http://mirrors.gdut.edu.cn/centos-vault/$releasever/centosplus/$basearch/
gpgcheck=1
enabled=0
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-6
```



