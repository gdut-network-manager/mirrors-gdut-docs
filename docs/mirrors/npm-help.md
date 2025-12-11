---
sidebar_position: 1
---

# npm镜像使用帮助

### 收录架构

* 全部

### 收录版本

* 全部

### 更新时间

proxy代理仓库


---

## 使用说明

proxy代理仓库。本站也支持https，如果npm使用http的源报错，可以尝试将url改成https。

### 临时使用

```bash
npm --registry https://mirrors.gdut.edu.cn/nexus/repository/npm install express
```

### 持久使用

```bash
npm config set registry https://mirrors.gdut.edu.cn/nexus/repository/npm
# 配置后可通过下面方式来验证是否成功
npm config get registry
# 或
npm info express
```

