---
sidebar_position: 1
---

# Anolis 镜像使用帮助

## 简介

Anolis OS 8是OpenAnolis社区推出的完全开源、中立、开放的发行版，它支持多计算架构，也面向云端场景优化，100%兼容CentOS 8软件生态。Anolis OS 8旨在为广大开发者和运维人员提供稳定、高性能、安全、可靠、开源的操作系统服务。

## 镜像信息

- **更新策略**：缓存代理，回源站点为阿里云镜像站，所有数据被请求过一次后即会缓存到服务器硬盘，缓存30天（对于会变动的文件，缓存时间为2小时）

## 使用说明

首先备份 `/etc/yum.repos.d/AnolisOS-*.repo`

```bash
for f in /etc/yum.repos.d/AnolisOS-*.repo; do cp -a "$f" "$f.backup"; done
```

根据对应的 Anolis OS 版本，编辑 `/etc/yum.repos.d/AnolisOS-*.repo` 文件, 修改为对应内容。（详见后面配置参考）

最后运行以下命令生成缓存

```bash
yum clean all
yum makecache
```

## 配置参考

这里以Anolis OS 8为例，通过以下命令将镜像地址做批量替换：

```bash
sed -i 's|http://mirrors.openanolis.cn|https://mirrors.gdut.edu.cn/|g' /etc/yum.repos.d/AnolisOS-BaseOS.repo
sed -i 's|http://mirrors.openanolis.cn|https://mirrors.gdut.edu.cn/|g' /etc/yum.repos.d/AnolisOS-AppStream.repo
sed -i 's|http://mirrors.openanolis.cn|https://mirrors.gdut.edu.cn/|g' /etc/yum.repos.d/AnolisOS-Extras.repo
```
