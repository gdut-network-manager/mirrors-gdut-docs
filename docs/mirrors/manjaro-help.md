---
sidebar_position: 1
---

# Manjaro镜像使用帮助

### 收录架构

* 全部

### 收录版本

* 全部

### 更新时间

每6小时更新一次


---

## 使用说明

修改 `/etc/pacman.d/mirrorlist` 在文件的最顶端添加：

```ini title="/etc/pacman.d/mirrorlist"
Server = http://mirrors.gdut.edu.cn/manjaro/stable/$repo/$arch
```

更新软件包缓存：

```bash
sudo pacman -Syy
```

