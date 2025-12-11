---
sidebar_position: 1
---

# FreeBSD PKG镜像使用帮助

### 收录架构

* 全部

### 收录版本

* 全部

### 更新时间

由于仓库太大，官方不推荐镜像，故我们不进行全量镜像，而是进行缓存。所有数据被请求过一次后即会缓存到服务器硬盘，缓存30天（对于会变动的文件，缓存时间为2小时）。


---

## 使用说明

修改文件：`/usr/local/etc/pkg/repos/FreeBSD.conf`

```nginx title="/usr/local/etc/pkg/repos/FreeBSD.conf"
FreeBSD: {
  url: "pkg+http://mirrors.gdut.edu.cn/freebsd-pkg/${ABI}/quarterly",
}
```

修改配置后，运行以下命令更新索引

```bash
pkg update -f
```

