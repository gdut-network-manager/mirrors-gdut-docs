---
sidebar_position: 1
---

# ArchlinuxCN镜像使用帮助

### 收录架构

* 全部

### 收录版本

* 全部

### 更新时间

每6小时更新一次


---

## 使用说明

在 `/etc/pacman.conf` 文件末尾添加以下两行：

```toml title="/etc/pacman.conf"
[archlinuxcn]
Server = http://mirrors.gdut.edu.cn/archlinuxcn/$arch
```

之后执行以下命令导入 GPG key：

```bash
sudo pacman -S archlinuxcn-keyring
```

再执行以下命令更新一下源：

```bash
sudo pacman -Sy
```

