<template>
  <div class="cont relative my-20 items-stretch" v-if="episode.data.value">
    <div class="episode">
      <client-only>
        <Player v-if="!!sources" :sources="sources" class="relative w-full aspect-video mb-8" />
        <div v-else>
          Loading player
        </div>
      </client-only>
      <div class="m-2">
        <p class="text-3xl">{{ preferredTitle }}</p>
        <p class="text-xl text-tertiary">Episode {{ number }}<span v-if="title" class="p-0">: {{ title }}
          </span>
        </p>
      </div>
    </div>
    <div class="list flex-1 pl-10 inline-flex flex-col items-start justify-start m-0 p-0 h-full">
      <span class="text-3xl mb-4 pl-3 m-0">Episodes</span>
      <div class="line"></div>
      <div ref="next-eps" class="flex flex-col py-3 p-0 m-0 justify-start overflow-y-auto flex-grow">
        <nuxt-link v-for="(ep, index) in animeeps" :key="ep.id" :to="`/watch/${ep.id}`"
          class="next-ep p-1 m-1 px-3 m-0 text-tertiary max-h-16" :class="ep.number === number ? 'cur':''"
          :load="ep.number === number ? eponload : () => {}">
          <p class="text-xl text-overflow">Episode {{ ep.number }}<span v-if="ep.title">: {{
              ep.title }}</span></p>
        </nuxt-link>
      </div>
      <div class="line"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { definePageMeta } from '#imports';
import { navigateTo, useFetch, useHead, useRoute } from '#app';

definePageMeta({
  key: route => {
    return `/watch/${route.params.episode}`;
  }
});

const route = useRoute();

const episode = await useFetch(`https://api.enime.moe/episode/${route.params.episode}`, {
  key: `/episode/${route.params.episode}`
});

if (episode.error.value || !episode?.data.value?.sources?.length)
  await navigateTo("/404?cause=episode-not-found");

const { id, number, anime, title, sources, image, createdAt } = episode.data.value;


const animeeps = anime.episodes.sort((a, b) => a.number - b.number);
const preferredTitle = anime.title.userPreferred || anime.title.english || anime.title.romaji;

useHead({
  title: `Episode ${number}${title ? ` - ${title}` : ""} | ${preferredTitle} | Enime`,
  meta: [
    {
      name: "og:title",
      content: `${preferredTitle} Episode ${number}`
    },
    {
      name: "og:type",
      content: "website"
    },
    {
      name: "og:url",
      content: `https://enime.moe/watch/${id}`
    },
    {
      name: "og:image",
      content: image || anime.bannerImage || anime.coverImage
    },
    {
      name: "og:description",
      content: `Watch ${preferredTitle} Episode ${number}${title ? ` - ${title}` : ""} online on Enime - An ad-free and VPN-free anime site built with performance in mind.`
    },
    {
      name: "twitter:card",
      content: "summary_large_image"
    },
    {
      name: "theme-color",
      content: anime.color
    }
  ]
})
</script>

<script lang="ts">
import Player from '~/components/player/index.vue';

export default {
  components: {
    Player,
  },
  methods: {
    eponload(e) {

      e.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  },
};
</script>

<style scoped>
.cont {
  padding: 0 10vw;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  aspect-ratio: 2/.8;
}
.episode {
  flex: 3;
}
.cur {
  background-color: #333;
  border-radius: 5px;
  color: #eee;
}
.line {
  width: 100%;
  height: 1px;
  background-color: #333;
}
.next-ep {
  white-space: normal;
  line-height: 1.75rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.next-ep > p {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  white-space: normal;
}
</style>