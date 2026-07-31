---
sidebar_position: 1
---

# Composer 镜像使用帮助

## 简介

Composer 是 PHP 的依赖管理工具，用于管理 PHP 项目的依赖库。本镜像提供 Packagist（Composer 默认源）的缓存代理服务，加速 PHP 依赖包的下载。

## 镜像信息

- **更新策略**：缓存代理，实时回源上游仓库。

## 使用说明

本镜像站支持 HTTPS，如果 Composer 使用 HTTP 的源报错，可以尝试将 URL 改成 HTTPS。

### 命令行配置

使用以下命令将 Composer 的默认源替换为镜像源：

```bash
composer config -g repo.packagist composer https://mirrors.gdut.edu.cn/nexus/repository/composer/
```

### 配置文件配置

编辑 `~/.composer/config.json`，在 `repositories` 字段中添加镜像源：

```json title="~/.composer/config.json"
{
    "repositories": {
        "packagist": {
            "type": "composer",
            "url": "https://mirrors.gdut.edu.cn/nexus/repository/composer/"
        }
    }
}
```

## 恢复默认源

如果需要恢复使用官方源，执行以下命令：

```bash
composer config -g --unset repos.packagist
```

如果使用了配置文件方式，将 `~/.composer/config.json` 中的 `repositories.packagist` 条目删除即可。
