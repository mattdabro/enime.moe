<template>
  <div class="cont relative mt-20" v-if="episode.data.value">
    <div class="episode">
      <client-only>
        <Player v-if="!!sources" @get-instance="getInstance" :sources="sources"
          class="relative w-full aspect-video mb-8" />
        <div v-else>
          Loading player
        </div>
      </client-only>
      <div class="m-2">
        <p class="text-3xl">{{ preferredTitle }}</p>
        <div class="mt-1 m-0 p-0 flex items-center">
          <p class="text-xl text-tertiary">Episode {{ number }}</p>
          <p v-if="title" class="text-xl text-tertiary">
            : {{ title }}
          </p>
        </div>
      </div>
    </div>
    <div class="list flex-1 pl-10">
      <span class="text-3xl mb-8">Episodes</span>
      <div class="flex flex-col pt-4">
        <nuxt-link v-for="(ep, index) in animeeps" :key="ep.id" :to="`/watch/${ep.id}`" class="p-0 m-0 flex justify-content-start items-center mb-1">
          <p class="text-xl text-tertiary flex-shrink-0">Episode {{ ep.number }}</p>
          <p class="text-xl text-tertiary text-overflow" v-if="ep.title">: {{ ep.title }}</p>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { definePageMeta } from '#imports';

definePageMeta({
  key: route => {
    return `/watch/${route.params.episode}`;
  }
});

import { navigateTo, useFetch, useHead, useRoute, useRouter } from '#app';
const route = useRoute();
const router = useRouter();

const episode = await useFetch(`https://api.enime.moe/episode/${route.params.episode}`, {
  key: `/episode/${route.params.episode}`
});

if (episode.error.value || !episode?.data.value?.sources?.length) {
  await navigateTo("/404?cause=episode-not-found");
}

const { id, number, anime, title, sources, image, createdAt } = episode.data.value;


const { data: animedetails } = await useFetch(`https://api.enime.moe/anime/${anime.id}`);
const animeeps = animedetails.value.episodes.sort((a, b) => a.number - b.number);

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
  align-items: start;
  justify-content: start;
}
.episode {
  flex: 3;
}
</style>