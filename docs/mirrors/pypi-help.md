---
sidebar_position: 1
---

# Pypi镜像使用帮助

### 收录架构

* 全部

### 收录版本

* 全部

### 更新时间

由于pypi镜像大小高达7TB+，故我们不进行全量镜像，而是进行缓存。所有数据被请求过一次后即会缓存到服务器硬盘，缓存30天（对于会变动的文件，缓存时间为2小时）。


---

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

