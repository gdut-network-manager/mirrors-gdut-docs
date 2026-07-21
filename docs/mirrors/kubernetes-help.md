---
sidebar_position: 1
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Kubernetes 镜像使用帮助

## 简介

Kubernetes 是用于自动部署，扩展和管理容器化应用程序的开源系统。本镜像提供 Kubernetes 软件包仓库的镜像服务。

## 镜像信息

- **架构**：全部
- **版本**：全部
- **更新策略**：每6小时更新一次

## 使用说明

硬件架构：`x86_64`, `armhfp`, `aarch64`

<Tabs groupId="operating-systems">
  <TabItem value="debian/ubuntu" label="Debian / Ubuntu">
    首先导入 gpg key：

    ```bash
    sudo curl -fsSLo /usr/share/keyrings/kubernetes-archive-keyring.gpg https://packages.cloud.google.com/apt/doc/apt-key.gpg
    # 如果不行就使用下面的命令
    sudo curl -fsSLo /usr/share/keyrings/kubernetes-archive-keyring.gpg https://mirrors.aliyun.com/kubernetes/apt/doc/apt-key.gpg
    ```

    新建 `/etc/apt/sources.list.d/kubernetes.list`，内容为：

    ```ini title="/etc/apt/sources.list.d/kubernetes.list"
    deb [signed-by=/usr/share/keyrings/kubernetes-archive-keyring.gpg] https://mirrors.gdut.edu.cn/kubernetes/apt kubernetes-xenial main
    ```

    如果在执行 `sudo apt update` 时出现“无法安全地用该源进行更新，所以默认禁用该源。”的问题，可以执行以下的指令

    ```bash
    sudo apt update --allow-insecure-repositories
    ```
  </TabItem>
  <TabItem value="rhel/centos" label="RHEL / CentOS">
    新建 `/etc/yum.repos.d/kubernetes.repo`，内容为：

    ```ini title="/etc/yum.repos.d/kubernetes.repo"
    [kubernetes]
    name=kubernetes
    baseurl=https://mirrors.gdut.edu.cn/kubernetes/yum/repos/kubernetes-el7-$basearch
    enabled=1
    gpgcheck=1
    repo_gpgcheck=1
    gpgkey=https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
    ```
  </TabItem>
</Tabs>
