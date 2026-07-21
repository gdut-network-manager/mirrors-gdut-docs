---
sidebar_position: 1
---

# Anaconda 镜像使用帮助

## 简介

Anaconda 是一个用于科学计算的 Python 发行版，支持 Linux、Mac、Windows，包含了众多流行的科学计算、数据分析的 Python 包。本镜像提供 Anaconda 仓库的缓存代理服务，加速 Conda 包的下载。

## 镜像信息

- **更新策略**：缓存代理，缓存 30 天。由于 Anaconda 镜像高达 3TB+，故不进行全量镜像，而是进行缓存。回源站点为清华开源软件镜像站。所有数据被请求过一次后即会缓存到服务器硬盘，缓存 30 天（对于会变动的文件，缓存时间为 2 小时）。

## 使用说明

Anaconda 安装包可以到 https://mirrors.gdut.edu.cn/anaconda/archive/ 下载。

修改用户目录下的 `.condarc` 文件：

```yaml title=".condarc"
channels:
  - defaults
show_channel_urls: true
default_channels:
  - http://mirrors.gdut.edu.cn/anaconda/pkgs/main
  - http://mirrors.gdut.edu.cn/anaconda/pkgs/free
  - http://mirrors.gdut.edu.cn/anaconda/pkgs/r
custom_channels:
  conda-forge: http://mirrors.gdut.edu.cn/anaconda/cloud
  msys2: http://mirrors.gdut.edu.cn/anaconda/cloud
  bioconda: http://mirrors.gdut.edu.cn/anaconda/cloud
  menpo: http://mirrors.gdut.edu.cn/anaconda/cloud
  pytorch: http://mirrors.gdut.edu.cn/anaconda/cloud
  simpleitk: http://mirrors.gdut.edu.cn/anaconda/cloud
```

即可添加 Anaconda Python 免费仓库。Windows 用户无法直接创建名为 `.condarc` 的文件，可先执行

```bash
conda config --set show_channel_urls yes
```

生成该文件之后再修改。

运行以下命令测试一下吧：

```bash
conda create -n myenv numpy
```

## Miniconda 镜像

Miniconda 是一个 Anaconda 的轻量级替代，默认只包含了 `python` 和 `conda`，但是可以通过 `pip` 和 `conda` 来安装所需要的包。

Miniconda 安装包可以到 https://mirrors.gdut.edu.cn/anaconda/miniconda/ 下载。

## 相关链接

- [清华大学开源软件镜像站](https://mirror.tuna.tsinghua.edu.cn/help/anaconda/)
