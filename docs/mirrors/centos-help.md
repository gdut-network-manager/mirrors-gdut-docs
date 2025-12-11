---
sidebar_position: 1
---

# CentOS镜像使用帮助

### 收录架构

* 全部

### 收录版本

* 全部

### 更新时间

每6小时更新一次


---

## 使用说明

首先备份 `/etc/yum.repos.d/CentOS-Base.repo`

根据对应的CentOS版本，编辑`/etc/yum.repos.d/CentOS-Base.repo`文件, 修改为对应内容。（详见后面配置参考）

最后运行以下命令生成缓存

```bash
yum clean all
yum makecache
```

## 配置参考

注：CentOS 6/7 已停止维护，如需使用 CentOS 6/7 的源，请移步[CentOS Vault](/docs/mirrors/centos-vault-help)。

如果是 CentOS 8 ，则把 `/etc/yum.repos.d/CentOS-Base.repo` 修改为下面的内容：

```toml title="/etc/yum.repos.d/CentOS-Base.repo"
[BaseOS]
name=CentOS-$releasever - Base
baseurl=http://mirrors.gdut.edu.cn/centos/$releasever/BaseOS/$basearch/os/
enabled=1
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-centosofficial

[AppStream]
name=CentOS-$releasever - AppStream
baseurl=http://mirrors.gdut.edu.cn/centos/$releasever/AppStream/$basearch/os/
enabled=1
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-centosofficial

[PowerTools]
name=CentOS-$releasever - PowerTools
baseurl=http://mirrors.gdut.edu.cn/centos/$releasever/PowerTools/$basearch/os/
enabled=0
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-centosofficial

[extras]
name=CentOS-$releasever - Extras
baseurl=http://mirrors.gdut.edu.cn/centos/$releasever/extras/$basearch/os/
enabled=1
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-centosofficial

[centosplus]
name=CentOS-$releasever - Plus
baseurl=http://mirrors.gdut.edu.cn/centos/$releasever/centosplus/$basearch/os/
gpgcheck=1
enabled=0
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-centosofficial
```



