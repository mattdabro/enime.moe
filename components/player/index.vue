<template>
  <div class="w-full h-full p-0 m-0" ref="artRef"></div>
</template>

<script>
import Artplayer from 'artplayer';
import Hls from 'hls.js';
import { useFetch } from '#app';

export default {
  data() {
    return {
      instance: null,
      option: {
        ssr: true,
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
          crossOrigin: 'anonymous',
          preload: "none",
          playsInline: true,
          "webkit-playsinline": true
        },
      }
    };
  },
  props: {
    source: {
      id: String
    },
    anime: Object
  },
  async setup(props) {
    const source = await useFetch(`https://api.enime.moe/source/${props.source.id}`, {
      key: `source-${props.source.id}`
    });

    return {
      source
    }
  },
  async mounted() {
    const source = this.source.data.value;
    Artplayer.TOUCH_MOVE_RATIO = 1.0;

    this.instance = new Artplayer({
      ...this.option,
      url: source.url,
      container: this.$refs.artRef,
      poster: this.anime.bannerImage || this.anime.coverImage,
      autoMini: true,
      ...(source.subtitle && {
        subtitle: {
          url: source.subtitle,
          type: "vtt",
          encoding: "UTF-8"
        }
      }),
      customType: {
        m3u8: function (video, url, art) {
          if (art.hls) {
            art.hls.destroy();
            art.hls = null;
          }

          if (Hls.isSupported()) {
            art.hls = new Hls({
              debug: false
            });
            art.hls.loadSource(url);
            art.hls.attachMedia(video);
          } else {
            const canPlay = video.canPlayType("application/vnd.apple.mpegurl");
            if (canPlay === "probably" || canPlay === "maybe") {
              video.src = url;
            } else {
              this.instance.notice.show = "Unsupported media type: m3u8";
            }
          }
        },
      },
    });

    this.$nextTick(() => {
      this.$emit("get-instance", this.instance);
    });

    this.instance.on("destroy", () => {
      if (instance.hls) {
        instance.hls.destroy();
        instance.hls = null;
      }
    });

    const instance = this.instance;

    this.instance.on("ready", () => {
      this.instance.controls.add(
          {
            position: "right",
            html: "Auto",
            width: 200,
            selector: [...this.instance.hls.levels.filter(item => item.height !== 0).map((item, _) => {
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
                  if (instance.hls.currentLevel === -1) $value.innerHTML = "Auto";
                  else if (currentLevel.height !== 0) $value.innerHTML = currentLevel.height + "P";
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