---
sidebar_position: 1
---

# Termux镜像使用帮助

### 收录架构

* 全部

### 收录版本

* 全部

### 更新时间

每6小时更新一次


---

## 使用说明

[Termux](https://termux.com/) is an Android terminal emulator and Linux environment app that works directly with no rooting or setup required.

执行如下命令对源进行替换和更新：

```bash
sed -i 's@^\(deb.*stable main\)$@#\1\ndeb http://mirrors.gdut.edu.cn/termux stable main@' $PREFIX/etc/apt/sources.list
apt update && apt upgrade
```

或者修改 `$PREFIX/etc/apt/sources.list` 为如下内容：

```ini title="sources.list"
# The termux repository mirror from GDUT:
deb https://mirrors.gdut.edu.cn/termux stable main
```

