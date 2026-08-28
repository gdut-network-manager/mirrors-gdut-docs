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
[registries]
cargo-gdut = { index = "sparse+http://repo.gdut.edu.cn/repository/crates.io-index/" }

[registries.cargo-hosted]
index = "sparse+http://repo.gdut.edu.cn/repository/crates.io-index/"

[source.crates-io]
replace-with = "cargo-gdut"
```

:::note[注意事项]

- `sparse+` 表示在使用稀疏索引，链接末尾的 `/` 不能缺少。
- `$CARGO_HOME`：在 Windows 系统默认为：`%USERPROFILE%\.cargo`，在类 Unix 系统默认为：`$HOME/.cargo`。
- cargo 仍会尝试读取不带 `.toml` 扩展名的配置文件（即 `$CARGO_HOME/config`），但从 1.39 版本起，cargo 引入了对 `.toml` 扩展名的支持，并将其设为首选格式。请根据使用的 cargo 版本选择适当的配置文件名。
- 使用 `cargo search`、`cargo info` 等命令时需要添加 `--registry mirror`，例如 `cargo search --registry cargo-gdut reqwest`。

:::

截至目前，可以通过 `cargo +nightly -Z sparse-registry update` 使用稀疏索引。

cargo 1.68 版本开始支持稀疏索引：不再需要完整克隆 crates.io-index 仓库，可以加快获取包的速度。如果您的 cargo 版本大于等于 1.68，可以直接使用而不需要开启 nightly。
