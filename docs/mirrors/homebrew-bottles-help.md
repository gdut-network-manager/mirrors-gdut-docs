---
sidebar_position: 1
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Homebrew Bottless镜像使用帮助

### 收录架构

* 全部

### 收录版本

* 全部

### 更新时间

每6小时更新一次


---

## 使用说明

:::warning[注意]

**该镜像是 Homebrew 二进制预编译包的镜像。镜像站同时提供 Homebrew 的 formula 索引的镜像（即 `brew update` 时所更新内容），请参考 [Homebrew 镜像使用帮助](/docs/mirrors/homebrew-help)。**

:::

### 临时替换

```bash
export HOMEBREW_API_DOMAIN="https://mirrors.gdut.edu.cn/homebrew-bottles/api"
export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.gdut.edu.cn/homebrew-bottles"
```

### 长期替换

<Tabs groupId="operating-systems">
  <TabItem value="bash" label="BASH">
    ```bash
    echo 'export HOMEBREW_API_DOMAIN="https://mirrors.gdut.edu.cn/homebrew-bottles/api"' >> ~/.bash_profile
    echo 'export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.gdut.edu.cn/homebrew-bottles"' >> ~/.bash_profile
    export HOMEBREW_API_DOMAIN="https://mirrors.gdut.edu.cn/homebrew-bottles/api"
    export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.gdut.edu.cn/homebrew-bottles"
    ```
  </TabItem>
  <TabItem value="zsh" label="ZSH">
    ```zsh
    echo 'export HOMEBREW_API_DOMAIN="https://mirrors.gdut.edu.cn/homebrew-bottles/api"' >> ~/.zprofile
    echo 'export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.gdut.edu.cn/homebrew-bottles"' >> ~/.zprofile
    export HOMEBREW_API_DOMAIN="https://mirrors.gdut.edu.cn/homebrew-bottles/api"
    export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.gdut.edu.cn/homebrew-bottles"
    ```
  </TabItem>
</Tabs>

:::danger[警告]

**Linuxbrew 核心仓库（`linuxbrew-core`）自 2021 年 10 月 25 日（`brew`版本 3.3.0 起）被弃用，Linuxbrew 用户应迁移至 `homebrew-core`。Linuxbrew 用户请依本镜像说明重新设置镜像。**

:::

