---
sidebar_position: 1
---

# Debian镜像使用帮助

### 收录架构

* 全部

### 收录版本

* 全部

### 更新时间

每6小时更新一次


---

## 使用说明

根据对应的debian版本，编辑 `/etc/apt/sources.list` 文件, 修改为如下内容。（操作前请做好相应备份）

### buster

```ini title="/etc/apt/sources.list"
deb http://mirrors.gdut.edu.cn/debian/ buster main contrib non-free
deb-src http://mirrors.gdut.edu.cn/debian/ buster main contrib non-free
deb http://mirrors.gdut.edu.cn/debian/ buster-updates main contrib non-free
deb-src http://mirrors.gdut.edu.cn/debian/ buster-updates main contrib non-free
deb http://mirrors.gdut.edu.cn/debian/ buster-backports main contrib non-free
deb-src http://mirrors.gdut.edu.cn/debian/ buster-backports main contrib non-free
```

### stretch

```ini title="/etc/apt/sources.list"
deb http://mirrors.gdut.edu.cn/debian/ stretch main contrib non-free
deb-src http://mirrors.gdut.edu.cn/debian/ stretch main contrib non-free
deb http://mirrors.gdut.edu.cn/debian/ stretch-updates main contrib non-free
deb-src http://mirrors.gdut.edu.cn/debian/ stretch-updates main contrib non-free
deb http://mirrors.gdut.edu.cn/debian/ stretch-backports main contrib non-free
deb-src http://mirrors.gdut.edu.cn/debian/ stretch-backports main contrib non-free
```

### jessie

```ini title="/etc/apt/sources.list"
deb http://mirrors.gdut.edu.cn/debian/ jessie main contrib non-free
deb-src http://mirrors.gdut.edu.cn/debian/ jessie main contrib non-free
deb http://mirrors.gdut.edu.cn/debian/ jessie-updates main contrib non-free
deb-src http://mirrors.gdut.edu.cn/debian/ jessie-updates main contrib non-free
deb http://mirrors.gdut.edu.cn/debian/ jessie-backports main contrib non-free
deb-src http://mirrors.gdut.edu.cn/debian/ jessie-backports main contrib non-free
```

或者直接使用以下命令进行替换:

```bash
sed -i 's/https:\/\/archive.ubuntu.com/http:\/\/mirrors.gdut.edu.cn/g' /etc/apt/sources.list
```



