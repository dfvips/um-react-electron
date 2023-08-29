# 利用 ADB 访问安卓私有数据

```sh
APP_ID="com.tencent.qqmusic" # QQ 音乐
APP_ID="cn.kuwo.player" # 酷我

adb shell su -c "tar c '/data/data/${APP_ID}/' | base64" \
    | base64 -d | pv | tar -x --strip-components 2
```
