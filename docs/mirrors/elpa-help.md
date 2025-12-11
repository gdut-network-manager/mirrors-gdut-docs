---
sidebar_position: 1
---

# ELPA 镜像使用帮助

### 收录架构

* 全部

### 收录版本

* GNU ELPA
* MELPA
* MELPA Stable
* Marmalade
* Org
* Sunrise Commander ELPA
* user42 ELPA

### 更新时间

每6小时更新一次


---

## 使用说明

根据你的需求，设置 `package-archives`，比如用 GNU ELPA 和 MELPA：

```bash
(setq package-archives '(("gnu"   . "http://mirrors.gdut.edu.cn/elpa/gnu/")
("melpa" . "http://mirrors.gdut.edu.cn/elpa/melpa/")))
```

### Spacemacs 用户

#### master 分支

添加下面的代码到 `.spacemacs` 的 `dotspacemacs/user-init()`

```bash
(setq configuration-layer--elpa-archives
'(("melpa-cn" . "http://mirrors.gdut.edu.cn/elpa/melpa/")
("org-cn"   . "http://mirrors.gdut.edu.cn/elpa/org/")
("gnu-cn"   . "http://mirrors.gdut.edu.cn/elpa/gnu/")))
```

#### develop 分支

使用 `configuration-layer-elpa-archives` 代替原来的 `configuration-layer--elpa-archives` （ `--` 换成 `-` ）

```bash
(setq configuration-layer-elpa-archives
'(("melpa-cn" . "http://mirrors.gdut.edu.cn/elpa/melpa/")
("org-cn"   . "http://mirrors.gdut.edu.cn/elpa/org/")
("gnu-cn"   . "http://mirrors.gdut.edu.cn/elpa/gnu/")))
```

### Cask 用户

Cask 是一个 Emacs Lisp 的项目管理工具。这里还是以 GNU ELPA 和 MELPA 为例，在添加下面的代码到 Cask

```bash
(source "gnu"   "http://mirrors.gdut.edu.cn/elpa/gnu/")
(source "melpa" "http://mirrors.gdut.edu.cn/elpa/melpa/")
```

## 文档参考

[清华大学开源软件镜像站](https://mirror.tuna.tsinghua.edu.cn/help/anaconda/)

Emacs China
