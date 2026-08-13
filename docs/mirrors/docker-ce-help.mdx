---
sidebar_position: 1
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import PlatformIcon from '@site/src/components/PlatformIcon';

# Docker CE 镜像使用帮助

## 简介

Docker CE 是 Docker 的社区版（Community Edition），提供容器化应用程序的构建、分享和运行能力。本镜像提供 Docker CE 软件包仓库的镜像服务。

## 镜像信息

- **架构**：全部
- **版本**：Linux (Debian, Ubuntu, CentOS)、macOS、Windows
- **更新策略**：每6小时更新一次

## 使用说明

:::warning[注意]

以下内容需要你使用 `root` 或者是带有管理员权限的用户进行操作，并预先安装好 curl 或者是 wget

:::

### 自动安装

Docker 提供了一个自动配置与安装的脚本，支持 Debian、RHEL、SUSE 系列及衍生系统的安装。

```bash
export DOWNLOAD_URL="https://mirrors.gdut.edu.cn/docker-ce"
# 如您使用 curl
curl -fsSL https://mirrors.gdut.edu.cn/scripts/get-docker.sh | sudo -E sh
# 如您使用 wget
wget -O- https://get.docker.com/ | sudo -E sh
```

### 手动安装

<Tabs groupId="operating-systems">
  <TabItem value="debian" label={<PlatformIcon name="debian" label="Debian" />}>
    删除旧有的Docker：

    ```bash
    for pkg in docker.io docker-doc docker-compose podman-docker containerd runc
    do sudo apt-get remove $pkg
    done
    ```

    首先安装依赖：

    ```bash
    sudo apt-get update
    sudo apt-get install ca-certificates curl gnupg
    ```

    信任 Docker 的 GPG 公钥并添加仓库：

    ```bash
    sudo install -m 0755 -d /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    sudo chmod a+r /etc/apt/keyrings/docker.gpg
    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://mirrors.gdut.edu.cn/docker-ce/linux/debian \
      "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
      sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    ```

    安装：

    ```bash
    sudo apt-get update
    sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    ```
  </TabItem>
  <TabItem value="ubuntu" label={<PlatformIcon name="ubuntu" label="Ubuntu" />}>
    删除旧有的Docker：

    ```bash
    for pkg in docker.io docker-doc docker-compose podman-docker containerd runc
    do sudo apt-get remove $pkg
    done
    ```

    首先安装依赖：

    ```bash
    sudo apt-get update
    sudo apt-get install ca-certificates curl gnupg
    ```

    信任 Docker 的 GPG 公钥并添加仓库：

    ```bash
    sudo install -m 0755 -d /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    sudo chmod a+r /etc/apt/keyrings/docker.gpg
    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://mirrors.gdut.edu.cn/docker-ce/linux/ubuntu \
      "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
      sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    ```

    安装：

    ```bash
    sudo apt-get update
    sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    ```
  </TabItem>
  <TabItem value="centos" label={<PlatformIcon name="centos" label="CentOS" />}>
    删除旧有的Docker:

    ```bash
    sudo yum remove docker \
                      docker-client \
                      docker-client-latest \
                      docker-common \
                      docker-latest \
                      docker-latest-logrotate \
                      docker-logrotate \
                      docker-engine
    ```

    安装依赖，下载repo文件，并把软件仓库地址替换为镜像站：

    ```bash
    sudo yum install -y yum-utils
    yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
    sudo sed -i 's+https://download.docker.com+https://mirrors.gdut.edu.cn/docker-ce+' /etc/yum.repos.d/docker-ce.repo
    ```

    安装：

    ```bash
    sudo yum install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    ```
  </TabItem>
</Tabs>
