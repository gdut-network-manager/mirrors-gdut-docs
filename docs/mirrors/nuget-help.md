---
sidebar_position: 1
---

# NuGet 镜像使用帮助

## 简介

NuGet 是 .NET 的包管理器，用于安装、共享和管理 .NET 依赖包。本镜像提供 NuGet Gallery（nuget.org）的缓存代理服务，加速 .NET 依赖包的下载。

## 镜像信息

- **更新策略**：缓存代理，实时回源上游仓库。

## 使用说明

本镜像站支持 HTTPS，如果 NuGet 使用 HTTP 的源报错，可以尝试将 URL 改成 HTTPS。

### 命令行配置

使用以下命令将镜像源添加为 NuGet 包源：

```bash
dotnet nuget add source https://repo.gdut.edu.cn/repository/nuget/index.json -n gdut-mirror
```

配置后可通过以下命令验证是否成功：

```bash
dotnet nuget list source
```

### 配置文件配置

编辑 `nuget.config`（项目级或用户级），在 `<packageSources>` 中添加镜像源：

```xml title="nuget.config"
<?xml version="1.0" encoding="utf-8"?>
<configuration>
    <packageSources>
        <add key="gdut-mirror" value="https://repo.gdut.edu.cn/repository/nuget/index.json" />
    </packageSources>
</configuration>
```

## 恢复默认源

如果需要移除镜像源，执行以下命令：

```bash
dotnet nuget remove source gdut-mirror
```

如果使用了配置文件方式，将 `nuget.config` 中 `<packageSources>` 下的 `gdut-mirror` 条目删除即可。
