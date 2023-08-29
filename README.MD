# 关于仓库官方

本仓库原始地址（已 DMCA）：https://github.com/unlock-music/unlock-music

本仓库目前官方地址：https://git.unlock-music.dev/um/um-react

你所看到的这个仓库是依照 MIT 协议授权的，除electron部分（不限于electron构建）外，代码与[本人](https://github.com/dfvips)无关。

# Unlock Music 音乐解锁 Electron 应用程序

[![Build Status](https://ci.unlock-music.dev/api/badges/um/web/status.svg)](https://github.com/dfvips/unlock-music-react-electron)
- 在Electron应用程序中解锁加密的音乐文件。 Unlock encrypted music file in the Electron App.
- 无需依赖浏览器，开箱即可使用。

## 自行构建Electron应用程序

- 环境要求
  - Linux、MacOs
  - python3、nodejs、npm

- 开发环境
   ```sh
   git clone https://git.unlock-music.dev/um/um-react.git && npm install --frozen-lockfile
   cd ../ && npm install
   npm run start / npm run dev
   npm run start / npm run dev
   ```
- 打包
  ```sh
  npm run build  / npm run build:win / npm run build:mac
  ```
- 前端静态页面构建后的产物可以在 `src/renderer` 目录找到。
- Electron构建后的产物可以在 `release` 目录找到。

## 开箱即用版本

https://github.com/dfvips/unlock-music-electron/releases
# Unlock Music 音乐解锁 (React)

[![Build Status](https://ci.unlock-music.dev/api/badges/um/um-react/status.svg)](https://ci.unlock-music.dev/um/um-react)

- 在浏览器中解锁加密的音乐文件。 Unlock encrypted music file in the browser.
- Unlock Music 项目是以学习和技术研究的初衷创建的，修改、再分发时请遵循[授权协议]。
- Unlock Music 的 CLI 版本可以在 [unlock-music/cli] 找到，大批量转换建议使用 CLI 版本。
- 我们新建了 Telegram 群组 [`@unlock_music_chat`] ，欢迎加入！
- CI 自动构建已经部署，可以在 [Packages][um-react-packages] 下载。

[授权协议]: https://git.unlock-music.dev/um/um-react/src/branch/main/LICENSE
[unlock-music/cli]: https://git.unlock-music.dev/um/cli
[`@unlock_music_chat`]: https://t.me/unlock_music_chat
[um-react-packages]: https://git.unlock-music.dev/um/-/packages/generic/um-react/

## 支持的格式

- [x] QQ 音乐 QMCv1 (.qmc0/.qmc2/.qmc3/.qmcflac/.qmcogg/.tkm)
- [x] QQ 音乐 QMCv2 PC 端 (.mflac/.mgg/.mflac0/.mgg1/.mggl)
- [x] 网易云音乐 (.ncm)
- [x] 虾米音乐 (.xm)
- [x] 酷我音乐 (.kwm)
- [x] 酷狗音乐 (.kgm/.vpr)
- [x] 喜马拉雅 Android 端 (.x2m/.x3m)
- [x] 咪咕音乐格式 (.mg3d)
- [ ] ~~<ruby>QQ 音乐海外版<rt>JOOX Music</rt></ruby> (.ofl_en)~~

不支持的格式？请提交样本（加密文件）与客户端信息（或一并上传其安装包）到[仓库的问题追踪区][project-issues]。如果文件太大，请上传到不需要登入下载的网盘，如 [mega.nz](https://mega.nz)、[OneDrive](https://www.onedrive.com/) 等。

如果遇到解密出错的情况，请一并携带错误信息并简单描述错误的重现过程。

[project-issues]: https://git.unlock-music.dev/um/um-react/issues/new

## 开发相关

从源码运行或编译生产版本，请参考文档「[新手上路](./docs/getting-started.zh.md)」。

### 面向 libparakeet SDK 开发

⚠️ 如果只是进行前端方面的更改，你可以跳过该节。

请参考文档「[面向 `libparakeet-js` 开发](./docs/develop-with-libparakeet.zh.md)」。

### 架构

- 浏览器主线程: 渲染界面，处理 UI 更新
- Web Worker: 负责计算方面的内容，如内容解密。

数据传输: 生成 blob url (`URL.createObjectURL`) 然后透过 `postMessage` 传递给线程，线程利用 `fetch` API 来获取文件信息。

### 贡献代码

欢迎贡献代码。请确保：

- 单元测试的覆盖率不低于主分支的覆盖率；
- 提交前请使用 Prettier 对代码进行格式化；
- 提交前请确保 ESLint 不会报告 warning / error；

满足上述条件后发起 Pull Request，仓库管理员审阅后将合并到主分支。

## TODO

- 待定
  - [ ] 各类算法 [追踪 `crypto` 标签](https://git.unlock-music.dev/um/um-react/issues?labels=67)
  - [ ] #7 简易元数据编辑器
- 完成
  - [x] #8 ~~添加单元测试~~ 框架加上了，以后慢慢添加更多测试即可。
  - [x] #2 解密内容探测 (解密过程)
  - [x] #6 文件拖放 (利用 `react-dropzone`?)
