---
sidebar_position: 1
---

# RubyGems 镜像使用帮助

## 简介

RubyGems 是 Ruby 的包管理器，提供了 Ruby 程序和库的分发与安装。本镜像提供 RubyGems 源的缓存代理服务，加速 gem 包的下载。

## 镜像信息

本镜像提供两种访问方式，任选其一即可：

| 方式 | 地址 |
| --- | --- |
| **Nginx 缓存加速**（推荐） | `https://mirrors.gdut.edu.cn/rubygems/` |
| **Nexus 缓存代理** | `https://mirrors.gdut.edu.cn/nexus/repository/rubygems/` |

- **更新策略**：缓存代理。所有 gem 包在被请求后即会缓存到服务器，缓存 30 天。

## 使用说明

以下示例均以 **Nginx 缓存加速** 地址为例。如需使用 Nexus 缓存代理，将地址替换为 `https://mirrors.gdut.edu.cn/nexus/repository/rubygems/` 即可。

### gem

使用以下命令替换 gem 默认源：

```bash
# 添加镜像源并移除默认源
gem sources --add https://mirrors.gdut.edu.cn/rubygems/ --remove https://rubygems.org/
# 列出已有源
gem sources -l
# 应该只有镜像源一个
```

或者，编辑 `~/.gemrc`，将镜像地址加到 `sources` 字段：

```yaml title="~/.gemrc"
---
:sources:
- https://mirrors.gdut.edu.cn/rubygems/
:update_sources: true
:verbose: true
:backtrace: false
:bulk_threshold: 1000
```

### Bundler

使用以下命令将 Bundler 的默认源替换为镜像源：

```bash
bundle config set --global mirror.https://rubygems.org https://mirrors.gdut.edu.cn/rubygems
```

:::tip[提示]

配置完成后，`bundle install` 会自动通过镜像源下载 gem 包。

:::

### Gemfile

在项目根目录的 `Gemfile` 中，将 `source` 直接替换为镜像地址即可：

```ruby title="Gemfile"
# 将默认源
# source 'https://rubygems.org'
# 替换为镜像源
source 'https://mirrors.gdut.edu.cn/rubygems/'

gem 'rails'
gem 'puma'
```

:::tip[提示]

此方式仅对当前项目生效。如需全局生效，请配合 [gem](#gem) 或 [Bundler](#bundler) 方式使用。

:::

## 恢复默认源

如果需要恢复使用官方源，执行以下命令：

```bash
# gem
gem sources --remove https://mirrors.gdut.edu.cn/rubygems/ --add https://rubygems.org/

# Bundler
bundle config unset mirror.https://rubygems.org
```

如果使用了 Gemfile 方式，将 `Gemfile` 中的 `source` 改回 `https://rubygems.org/` 即可。
