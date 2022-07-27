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
        setting: false,
        backdrop: true,
        volume: 0.5,
        hotkey: true,
        type: "m3u8",
        playsInline: true,
        whitelist: ["*"],
        contextmenu: [],
        moreVideoAttr: {
          playsInline: true,
          "webkit-playsinline": true
        },
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
      customType: {
        m3u8: function (video, url, art) {
          if (art.hls) {
            art.hls.destroy();
            art.hls = null;
          }

          if (Hls.isSupported()) {
            art.hls = new Hls({
              debug: false,
            });
            art.hls.loadSource(url);
            art.hls.attachMedia(video);
          } else {
            const canPlay = video.canPlayType('application/vnd.apple.mpegurl');
            if (canPlay === "probably" || canPlay === "maybe") {
              video.src = url;
            } else {
              this.instance.notice.show = "Unsupported media type: m3u8";
            }
          }
        },
      },
    });

    const instance = this.instance;

    this.$nextTick(() => {
      this.$emit("get-instance", this.instance);
    });

    instance.on("destroy", () => {
      if (instance.hls) {
        instance.hls.destroy();
        instance.hls = null;
      }
    });

    instance.on("ready", () => {
      instance.controls.add(
          {
            position: "right",
            html: "Auto",
            width: 200,
            selector: [...instance.hls.levels.map((item, _) => {
              return {
                html: item.height + 'P',
                level: _
              }
            }), {
              default: true,
              html: "Auto",
              level: -1
            }],
            onSelect(item) {
              instance.hls.nextLevel = item.level;
              return item.html;
            },
            mounted() {
              const $value = instance.query(".art-control-hls_levels .art-selector-value");

              function updateHtml() {
                const currentLevel = instance.hls.levels[instance.hls.currentLevel];
                if (currentLevel && $value) {
                  if (this.instance.hls.currentLevel === -1) $value.innerHTML = "Auto";
                  else $value.innerHTML = currentLevel.height + "P";
                }
              }

              instance.hls.once(Hls.Events.LEVEL_SWITCHING, (level) => {
                updateHtml();
              });

              instance.hls.once(Hls.Events.LEVEL_SWITCHED, (level) => {
                 updateHtml();
              });

              instance.hls.once(Hls.Events.LEVEL_LOADING, (level) => {
                 updateHtml();
              });

              instance.hls.once(Hls.Events.LEVEL_LOADED, (level) => {
                 updateHtml();
              });

              instance.hls.once(Hls.Events.LEVEL_UPDATED, (level) => {
                 updateHtml();
              });

              instance.hls.once(Hls.Events.LEVELS_UPDATED, (level) => {
                 updateHtml();
              });
            }
          }
      )
    });
  },
  beforeUnmount() {
    if (this.instance && this.instance.destroy) {
      this.instance.destroy();
    }
  },
};
</script>