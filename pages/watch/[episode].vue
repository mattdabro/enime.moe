<template>
  <div class="p-5 text-center">
    <p class="text-4xl">{{ anime.title.english || anime.title.romaji }} Episode {{ number }}</p>
    <client-only>
      <div v-if="!!url" class="w-full h-full mt-5">
        <Player @get-instance="getInstance" :url="url"/>
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

import { useFetch, useHead, useLazyAsyncData, useRoute, useRouter } from '#app';
const route = useRoute();
const router = useRouter();

const episode = await useFetch(`https://api.enime.moe/episode/${route.params.episode}`, {
  key: `/episode/${route.params.episode}`
});

if (episode.error.value || !episode.data.value.sources?.length) {
  await router.push("/404?cause=episode-not-found");
}

const { number } = episode.data.value;
const { anime } = episode.data.value;
// const { pending, data: source } = await useLazyAsyncData(`/source/${episode.data.value.sources[0].url}`, () => $fetch.raw(episode.data.value.sources[0].url));

const url = episode.data.value.sources[0].url;

useHead({
  title: `Watch ${anime.title.english || anime.title.romaji} Episode ${number} on Enime`,
  meta: [
    {
      name: "og:title",
      content: anime.title.english || anime.title.romaji
    },
    {
      name: "og:type",
      content: "website"
    },
    {
      name: "og:url",
      content: `https://enime.moe/watch/${episode.data.value.id}`
    },
    {
      name: "og:image",
      content: episode.data.value.image || anime.bannerImage || anime.coverImage
    },
    {
      name: "og:description",
      content: `Watch ${anime.title.english || anime.title.romaji} online Episode ${number}${episode.data.value.title ? ` - ${episode.data.value.title}` : ""} on Enime - An ad-free and VPN-free anime site built with performance in mind.`
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