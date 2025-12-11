---
sidebar_position: 1
---

# Go镜像使用帮助

### 收录架构

* 全部

### 收录版本

* 全部

### 更新时间

proxy代理仓库


---

## 使用说明

### 临时使用

```bash
export GO111MODULE=on
export GOPROXY=http://mirrors.gdut.edu.cn/repository/go/
export GOSUMDB=off
```

### 长期使用

编辑 `~/.bash_profile` 文件,在末尾添加如下配置:

```bash title="~/.bash_profile"
export GO111MODULE=on
export GOPROXY=http://mirrors.gdut.edu.cn/repository/go/
export GOSUMDB=off
```

配置完成后执行 `source ~/.bash_profile` 即可刷新配置

