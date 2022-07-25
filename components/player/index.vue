<template>
  <div ref="artRef" :style="this.style"></div>
</template>

<script>
import Artplayer from 'artplayer';
import Hls from 'hls.js';

export default {
  data() {
    return {
      instance: null,
      option: {
        url: this.url,
        autoSize: true,
        fullscreen: true,
        miniProgressBar: true,
        screenshot: true,
        mutex: true,
        backdrop: true,
        volume: 0.5
      },
      style: {
        width: "600px",
        height: "400px",
        margin: "60px auto 0",
      },
    };
  },
  props: {
    url: String
  },
  mounted() {
    this.instance = new Artplayer({
      ...this.option,
      container: this.$refs.artRef,
      customType: {
        m3u8: function (video, url) {
          if (Hls.isSupported()) {
            const hls = new Hls();
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

<style scoped>

</style>