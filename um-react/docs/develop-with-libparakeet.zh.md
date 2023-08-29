# 面向 `libparakeet-js` 开发

⚠️ 如果只是进行前端方面的更改，你可以跳过该文档。

`libparakeet-js` 编译目前需要 Linux 环境，请参考[仓库说明][libparakeet-js-doc]。

该文档将假设这两个项目被放置在同级的目录下：

```text
~/Projects/um-projects
    /um-react
    /libparakeet-js
```

若为不同目录，你需要调整 `LIB_PARAKEET_JS_DIR` 环境变量到仓库目录，然后再启动 vite 项目。

[libparakeet-js-doc]: https://github.com/parakeet-rs/libparakeet-js/blob/main/README.MD

## 初次构建

- 进入上层目录：`cd ..`
- 克隆 `libparakeet-js` 仓库 (目前需要 Linux 环境, Windows 下推荐使用 WSL2)
  - `git clone --recurse-submodules https://github.com/parakeet-rs/libparakeet-js.git`
- 进入 SDK 目录：`cd libparakeet-js`
- 如果需要更新 `submodule`：`git submodule update --init --recursive`
- 构建所有代码：`make all`

如果需要手动控制构建过程，你也可以：

- 运行 `./build.sh -j 4` 进行 C++ 到 WebAssembly 编译过程
  - 此处的 `4` 是并行编译数量，该值通常略小于 CPU 核心数。
  - 若是不指定并行数量，则使用当前核心数。
- 编译 `js-sdk`：
  - 进入 `npm` 目录：`cd npm`
  - 安装依赖：`pnpm i --frozen-lockfile`
  - 构建：`pnpm build`

## 做出更改

做出更改后，参考上面的内容进行重新编译。

## 应用 SDK 更改

将构建好的 SDK 直接嵌入到当前前端项目：

```sh
pnpm link ../libparakeet-js/npm
```

※ 建立 PR 时，请先提交 SDK PR 并确保你的 SDK 更改已合并。
