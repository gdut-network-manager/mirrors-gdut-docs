---
sidebar_position: 1
---

# OpenEuler镜像使用帮助

### 收录架构

* 全部

### 收录版本

* 全部

### 更新时间

每6小时更新一次


---

## 介绍

OpenEuler是一个开源免费的Linux发行版系统，通过开放的社区形式与全球的开发者共同构建一个开放、多元和架构包容的软件生态体系，OpenEuler同时是一个创新的系统，倡导客户在系统上提出创新想法、开拓新思路、实践新方案。

## 使用说明

首先备份 `/etc/yum.repos.d/openEuler.repo`

```bash
mv /etc/yum.repos.d/openEuler.repo /etc/yum.repos.d/openEuler.repo.backup
```

根据对应的OpenEuler版本，编辑`/etc/yum.repos.d/openEuler.repo`文件, 修改为对应内容。（详见后面配置参考）

最后运行以下命令生成缓存

```bash
yum clean all
yum makecache
```

### 配置参考

这里以OpenEuler22.09为例，将 `/etc/yum.repos.d/CentOS-Base.repo` 修改为下面的内容：

```toml title="/etc/yum.repos.d/CentOS-Base.repo"
[OS]
name=OS
baseurl=https://mirrors.gdut.edu.cn/openeuler/openEuler-22.09/OS/$basearch/
enabled=1
gpgcheck=1
gpgkey=https://mirrors.gdut.edu.cn/openeuler/openEuler-22.09/OS/$basearch/RPM-GPG-KEY-openEuler

[everything]
name=everything
baseurl=https://mirrors.gdut.edu.cn/openeuler/openEuler-22.09/everything/$basearch/
enabled=1
gpgcheck=1
gpgkey=https://mirrors.gdut.edu.cn/openeuler/openEuler-22.09/everything/$basearch/RPM-GPG-KEY-openEuler

[EPOL]
name=EPOL
baseurl=https://mirrors.gdut.edu.cn/openeuler/openEuler-22.09/EPOL/main/$basearch/
enabled=1
gpgcheck=1
gpgkey=https://mirrors.gdut.edu.cn/openeuler/openEuler-22.09/OS/$basearch/RPM-GPG-KEY-openEuler

[debuginfo]
name=debuginfo
baseurl=https://mirrors.gdut.edu.cn/openeuler/openEuler-22.09/debuginfo/$basearch/
enabled=1
gpgcheck=1
gpgkey=https://mirrors.gdut.edu.cn/openeuler/openEuler-22.09/debuginfo/$basearch/RPM-GPG-KEY-openEuler

[source]
name=source
baseurl=https://mirrors.gdut.edu.cn/openeuler/openEuler-22.09/source/
enabled=1
gpgcheck=1
gpgkey=https://mirrors.gdut.edu.cn/openeuler/openEuler-22.09/source/RPM-GPG-KEY-openEuler

[update]
name=update
baseurl=https://mirrors.gdut.edu.cn/openeuler/openEuler-22.09/update/$basearch/
enabled=1
gpgcheck=1
gpgkey=https://mirrors.gdut.edu.cn/openeuler/openEuler-22.09/OS/$basearch/RPM-GPG-KEY-openEuler
```

或者，可通过以下命令将镜像地址做批量替换：

```bash
sed -i 's|http://repo.openeuler.org|https://mirrors.gdut.edu.cn/openeuler/|g' /etc/yum.repos.d/openEuler.repo
```

