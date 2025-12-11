---
sidebar_position: 1
---

# Gentoo镜像使用帮助

### 收录架构

* AMD 64
* ARM 64
* x86
* ARM

### 收录版本

* 全部

### 更新时间

每6小时更新一次


---

## 使用说明

在 `/etc/portage/make.conf` 中加入：

```ini title="/etc/portage/make.conf"
GENTOO_MIRRORS="https://mirrors.gdut.edu.cn/gentoo"
```

然后执行：

```bash
emerge-webrsync
```

