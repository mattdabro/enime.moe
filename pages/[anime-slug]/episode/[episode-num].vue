<template>
  <div class="cont relative my-20 items-stretch" v-if="episode">
    <div class="episode">
      <Player v-if="!!sources" :source="sources[0]" class="relative w-full aspect-video mb-8" />
      <div v-else>
        Loading player
      </div>
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
        <nuxt-link no-prefetch :ref="el => { if (ep.number === this.number) (this.current = el) }" v-for="(ep, index) in animeeps" :key="ep.id" :to="`/${anime.slug}/episode/${ep.number}`"
                   class="next-ep p-1 m-1 px-3 m-0 text-tertiary max-h-16" :class="ep.number === number ? 'cur':''">
          <p class="text-xl text-overflow">Episode {{ ep.number }}<span v-if="ep.title">: {{
              ep.title }}</span></p>
        </nuxt-link>
      </div>
      <div class="line"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { definePageMeta, nextTick, onMounted, ref, watch, watchEffect } from '#imports';
import { navigateTo, useFetch, useHead, useRoute, useRuntimeConfig } from '#app';
import { createError } from 'h3';
const runtimeConfig = useRuntimeConfig();

const route = useRoute();
const url = `${route.params.animeslug}/${route.params.episodenum}`;

definePageMeta({
  key: route => {
    return `/${route.params.animeslug}/episode/${route.params.episodenum}`;
  }
});

const { error, data: episode } = await useFetch(`${runtimeConfig.public.enimeApi}/view/${url}`, {
  key: url
});

if (error.value || !episode.value) {
  throw createError({ statusCode: 404, message: "Episode not found" })
}

const { id, number, anime, title, sources, image, createdAt } = episode.value;
const current = ref(null);

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