---
sidebar_position: 1
---

# PyPI 镜像使用帮助

## 简介

PyPI（Python Package Index）是 Python 编程语言的官方软件包仓库，收录了众多第三方 Python 包。本镜像提供 PyPI 仓库的缓存代理服务，加速 Python 包的下载。

## 镜像信息

- **更新策略**：缓存代理。由于 PyPI 镜像大小高达 7TB+，故不进行全量镜像，而是进行缓存。所有数据被请求过一次后即会缓存到服务器硬盘，缓存 30 天（对于会变动的文件，缓存时间为 2 小时）。

## 使用说明

### 临时使用

```bash
pip install --trusted-host mirrors.gdut.edu.cn -i http://mirrors.gdut.edu.cn/pypi/simple some-package
```

### 持久使用

**Linux/Unix中设为默认：**

添加或修改 `pip.conf`（如果不存在，创建一个）

```bash
touch ~/.pip/pip.conf
```

修改内容如下：

```toml
[global]
index-url = http://mirrors.gdut.edu.cn/pypi/simple
trusted-host = mirrors.gdut.edu.cn
```

**Windows中设为默认：**

```bash
%APPDATA%/pip/pip.ini
```

1. 打开此电脑，在最上面的的文件夹窗口输入：`%APPDATA%`
2. 按回车跳转进入目录，并新建一个文件夹：`pip`
3. 创建文件：`pip.ini`

修改内容如下：

```toml
[global]
index-url = http://mirrors.gdut.edu.cn/pypi/simple
trusted-host = mirrors.gdut.edu.cn
```

**设为默认通用方法：**

`pip` 版本 `>=10.0.0` 可以直接执行命令进行设置：

```bash
pip config set global.index-url http://mirrors.gdut.edu.cn/pypi/simple
pip config set install.trusted-host mirrors.gdut.edu.cn
```
