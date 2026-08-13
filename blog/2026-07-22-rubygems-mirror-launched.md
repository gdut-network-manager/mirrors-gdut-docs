---
slug: rubygems-mirror-launched
title: RubyGems 镜像上线
authors: [gdutnic, gregPerlinLi]
tags: [新镜像上线]
date: 2026-07-22
---

本站现已上线 RubyGems 镜像，为 Ruby 社区提供 gem 包的缓存代理服务，加速 `gem install` 与 `bundle install` 等操作的下载速度。

{/* truncate */}

## 镜像信息

本镜像提供两种访问方式：

| 方式 | 地址 |
| --- | --- |
| **Nginx 缓存加速**（推荐） | `https://mirrors.gdut.edu.cn/rubygems/` |
| **Nexus 缓存代理** | `https://mirrors.gdut.edu.cn/nexus/repository/rubygems/` |

- **更新策略**：缓存代理。所有 gem 包在被请求后即会缓存到服务器，缓存 30 天。

## 使用方法

使用以下命令替换 gem 默认源（以推荐的 Nginx 缓存加速方式为例）：

```bash
# 添加镜像源并移除默认源
gem sources --add https://mirrors.gdut.edu.cn/rubygems/ --remove https://rubygems.org/
# 列出已有源
gem sources -l
```

Bundler 用户可以通过以下命令设置全局镜像：

```bash
bundle config set --global mirror.https://rubygems.org https://mirrors.gdut.edu.cn/rubygems
```

详细的配置方法（含 Nexus 方式、Gemfile 配置等）请参阅 [RubyGems 镜像使用帮助](/help/docs/mirrors/rubygems-help)。
