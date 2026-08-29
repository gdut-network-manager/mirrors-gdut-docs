---
sidebar_position: 1
---

# Rust crates.io 稀疏索引镜像使用帮助

## 简介

crates.io 是 Rust 编程语言的官方包仓库。本镜像提供 crates.io 稀疏索引（Sparse Index）的缓存代理服务，加速 Rust 包的下载。

## 镜像信息

- **更新策略**：缓存代理，实时回源上游仓库。

## 使用说明

本镜像站支持 HTTPS。

编辑 `$CARGO_HOME/config.toml` 文件，添加以下内容：

```toml title="config.toml"
[source.crates-io]
replace-with = "cargo-gdut"

[source.cargo-gdut]
registry = "sparse+https://repo.gdut.edu.cn/repository/crates.io-index/"

[registries.cargo-gdut]
index = "sparse+https://repo.gdut.edu.cn/repository/crates.io-index/"
```

:::note[注意事项]

- `sparse+` 表示在使用稀疏索引，链接末尾的 `/` 不能缺少。
- `$CARGO_HOME`：在 Windows 系统默认为：`%USERPROFILE%\.cargo`，在类 Unix 系统默认为：`$HOME/.cargo`。
- cargo 仍会尝试读取不带 `.toml` 扩展名的配置文件（即 `$CARGO_HOME/config`），但从 1.39 版本起，cargo 引入了对 `.toml` 扩展名的支持，并将其设为首选格式。请根据使用的 cargo 版本选择适当的配置文件名。
- `cargo add`、`cargo update`、`cargo build` 等命令会通过稀疏索引拉取包元数据和下载包，使用本镜像可正常加速。但 `cargo search` 依赖 crates.io 的 HTTP API（`/api/v1/crates`），本镜像仅代理稀疏索引，不代理该 API，因此 `cargo search` 无法通过本镜像使用，请前往 [crates.io](https://crates.io) 网站搜索。

:::

截至目前，可以通过 `cargo +nightly -Z sparse-registry update` 使用稀疏索引。

cargo 1.68 版本开始支持稀疏索引：不再需要完整克隆 crates.io-index 仓库，可以加快获取包的速度。如果您的 cargo 版本大于等于 1.68，可以直接使用而不需要开启 nightly。
