<template>
  <div>
    <p v-if="!anime">Anime not found.</p>
    <div v-else class="banner w-full block h-100 bg-center bg-cover"
      :style="{ backgroundImage: `url(${anime.bannerImage || `/images/default-banner.jpg`})` }"></div>
    <div class="cover absolute w-50 h-75 bg-center bg-cover rounded-md"
      :style="{ backgroundImage: `url(${anime.coverImage})`}"></div>
    <div class="desc">
      <p class="text-white text-4xl">{{ anime.title.userPreferred || anime.title.english || anime.title.romaji }}</p>
      <p class="text-tertiary text-tertiary text-2xl">{{ anime.status }} • {{ anime.currentEpisode }} Episodes</p>
      <p class="desc-text" v-html="anime.description.replace(/(?:<br>\s*)+/g, `<br>`)"></p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useFetch, useRoute, useRuntimeConfig } from '#app';
  import { createError } from 'h3';

  const runtimeConfig = useRuntimeConfig();
  const route = useRoute();
  const url = `${route.params.anime}`;
  const anime = ref({});

  const { error, data } = await useFetch(`${runtimeConfig.public.enimeApi}/anime/${url}`);

  if (error.value)
    throw createError({ statusCode: 429, message: "Too many requests" });

  if (data.value)
    anime.value = data.value;

  // console.log(`${runtimeConfig.public.enimeApi}/anime/${url}`, anime, data);
</script>

<script lang="ts">
  export default {
    name: "index"
  }
</script>

<style scoped>

  .banner {
    box-shadow: inset 0 -5rem 5rem #000;
  }
  .cover {
    position: absolute;
    top: 20rem;
    left: 10vw;
    border: 2px solid #fff;
    box-shadow: 0 0 5rem rgba(0,0,0,1);
  }
  .desc {
    position: relative;
    left: calc(10vw + 15rem);
    width: 50vw;
  }
  .desc-text {
    margin-top: 1rem;
    color: #bbb;
    font-size: 1.25rem;
  }
</style>