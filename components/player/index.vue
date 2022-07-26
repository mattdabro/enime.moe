<template>
  <div class=" w-full h-full" ref="artRef" :style="this.style"></div>
</template>

<script>
import Artplayer from 'artplayer';
import Hls from 'hls.js';

export default {
  data() {
    return {
      instance: null,
      option: {
        autoSize: true,
        fullscreen: true,
        miniProgressBar: true,
        screenshot: true,
        mutex: true,
        backdrop: true,
        volume: 0.5
      },
      style: {
        width: "50vw",
        height: "50vh",
        margin: "60px auto 0",
      },
    };
  },
  props: {
    url: String
  },
  async mounted() {
    this.instance = new Artplayer({
      ...this.option,
      url: this.url,
      container: this.$refs.artRef,
      type: "m3u8",
      contextmenu: [],
      moreVideoAttr: {
        playsInline: true,
        "webkit-playsinline": true
      },
      customType: {
        m3u8: function (video, url) {
          if (Hls.isSupported()) {
            const hls = new Hls({
              debug: true
            });
            hls.loadSource(url);
            hls.attachMedia(video);
          } else {
            const canPlay = video.canPlayType('application/vnd.apple.mpegurl');
            if (canPlay === 'probably' || canPlay === "maybe") {
              video.src = url;
            } else {
              this.instance.notice.show = 'Unsupported media type: m3u8';
            }
          }
        },
      },
    });

    this.instance.on("video:error", (...args) => {
      console.log("Error", args);
    })
    this.$nextTick(() => {
      this.$emit("get-instance", this.instance);
    });
  },
  beforeUnmount() {
    if (this.instance && this.instance.destroy) {
      this.instance.destroy();
    }
  },
};
</script>