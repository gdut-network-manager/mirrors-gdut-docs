---
sidebar_position: 1
---

# RubyGems 镜像使用帮助

## 简介

RubyGems 是 Ruby 的包管理器，提供了 Ruby 程序和库的分发与安装。本镜像提供 RubyGems 源的缓存代理服务，加速 gem 包的下载。

## 镜像信息

- **镜像地址**：`https://mirrors.gdut.edu.cn/nexus/repository/rubygems/`
- **更新策略**：缓存代理。所有 gem 包在被请求后即会缓存到服务器，缓存 30 天。

## 使用说明

### gem

使用以下命令替换 gem 默认源：

```bash
# 添加镜像源并移除默认源
gem sources --add https://mirrors.gdut.edu.cn/nexus/repository/rubygems/ --remove https://rubygems.org/
# 列出已有源
gem sources -l
# 应该只有镜像源一个
```

或者，编辑 `~/.gemrc`，将镜像地址加到 `sources` 字段：

```yaml title="~/.gemrc"
---
:sources:
- https://mirrors.gdut.edu.cn/nexus/repository/rubygems/
:update_sources: true
:verbose: true
:backtrace: false
:bulk_threshold: 1000
```

### Bundler

使用以下命令将 Bundler 的默认源替换为镜像源：

```bash
bundle config set --global mirror.https://rubygems.org https://mirrors.gdut.edu.cn/nexus/repository/rubygems
```

:::tip[提示]

配置完成后，`bundle install` 会自动通过镜像源下载 gem 包。

:::

## 恢复默认源

如果需要恢复使用官方源，执行以下命令：

```bash
# gem
gem sources --remove https://mirrors.gdut.edu.cn/nexus/repository/rubygems/ --add https://rubygems.org/

# Bundler
bundle config unset mirror.https://rubygems.org
```
