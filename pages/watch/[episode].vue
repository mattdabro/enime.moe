<template>
  <div class="p-5 text-center" v-if="episode.data.value">
    <p class="text-4xl">{{ preferredTitle }} Episode {{ number }}</p>
    <p v-if="title" class="text-2xl">
      {{ title }}
    </p>
    <client-only>
      <div v-if="!!sources" class="w-full h-full mt-5">
        <Player @get-instance="getInstance" :sources="sources"/>
      </div>
      <div v-else>
        Loading player
      </div>
    </client-only>
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

const { id, number, anime, title, sources, image } = episode.data.value;

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
  data() {
    return {
    };
  },
  methods: {
    getInstance(art) {
    },
  },
};
</script>