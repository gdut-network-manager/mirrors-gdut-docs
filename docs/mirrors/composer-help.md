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

使用以下命令将镜像源添加为 Composer 的仓库源：

```bash
composer config -g repositories.gdut-mirrors composer https://repo.gdut.edu.cn/repository/composer/
```

:::note[允许 HTTP 下载]
Nexus 返回的包索引中可能包含 HTTP 的下载地址，新版 Composer 默认拒绝 HTTP 下载。执行以下命令允许 HTTP：

```bash
composer config -g secure-http false
```

:::

### 配置文件配置

编辑 `~/.composer/config.json`，在 `repositories` 字段中添加镜像源，并在 `config` 中关闭 `secure-http`：

```json title="~/.composer/config.json"
{
    "config": {
        "secure-http": false
    },
    "repositories": [
        {
            "name": "gdut-mirrors",
            "type": "composer",
            "url": "https://repo.gdut.edu.cn/repository/composer/"
        }
    ]
}
```

## 恢复默认源

如果需要恢复使用官方源，执行以下命令：

```bash
composer config -g --unset repos.gdut-mirrors
composer config -g secure-http true
```

如果使用了配置文件方式，将 `~/.composer/config.json` 中 `repositories` 数组里 `name` 为 `gdut-mirrors` 的条目删除，并将 `config.secure-http` 改回 `true` 即可。
