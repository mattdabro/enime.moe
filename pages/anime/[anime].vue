<template>
  <div>
    <p v-if="!anime">Anime not found.</p>
    <div v-else>
      <div class="banner w-full block h-100 bg-center bg-cover"
           :style="{ backgroundImage: `url(${bannerImage || `/images/default-banner.jpg`})` }"></div>
      <div class="cover absolute w-50 h-75 bg-center bg-cover rounded-md"
           :style="{ backgroundImage: `url(${coverImage})`}"></div>
      <div class="desc mb-20">
        <p class="text-white text-4xl">{{ title.userPreferred || title.english || title.romaji }}</p>
        <p class="text-tertiary text-2xl">{{ status }} • {{ currentEpisode }} Episodes</p>
        <button @click="firstep" class="firstep text-sm mt-2 flex flex-row flex-nowrap items-center px-2">
          <p>First Episode</p>
          <svg xmlns="http://www.w3.org/2000/svg" class="inline-block ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24"
               stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </button>
        <p class="desc-text pt-2" v-html="description.replace(/(?:<br>\s*)+/g, `<br>`)"></p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFetch, navigateTo, useRoute, useRuntimeConfig, useHead } from '#app';
  import { createError } from 'h3';

  const runtimeConfig = useRuntimeConfig();
  const route = useRoute();
  const url = `${route.params.anime}`;

  const { error, data: animeData } = await useFetch(`${runtimeConfig.public.enimeApi}/anime/${url}`, { key: "/anime/" + url });

  if (error.value || !animeData.value)
    throw createError({ statusCode: 404, message: "Anime not found" });

  const anime = animeData.value;
  const { title, slug, bannerImage, coverImage, description, status, currentEpisode, color } = anime;
  const preferredTitle = title.userPreferred || title.english || title.romaji;

  function firstep() {
    navigateTo(`/watch/${slug}/1`);
  }

  useHead({
    title: `${preferredTitle} | Enime`,
    meta: [
      {
        name: "og:title",
        content: `${preferredTitle} | Enime`
      },
      {
        name: "og:type",
        content: "website"
      },
      {
        name: "og:url",
        content: `https://enime.moe/anime/${slug}`
      },
      {
        name: "og:image",
        content: bannerImage || coverImage
      },
      {
        name: "og:description",
        content: description
      },
      {
        name: "twitter:card",
        content: "summary_large_image"
      },
      {
        name: "theme-color",
        content: color
      }
    ]
  })
</script>

<script lang="ts">
  export default {
    name: "index"
  }
</script>

<style scoped lang="scss">

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
  .firstep {
    background-color: white;
    color: black;
    padding: 0.1rem .5rem;
    line-height: 1.2;
    border-radius: 2rem;
    //margin-left: .5rem;
    height: 1.5rem;
    margin-bottom: -.5rem;
    /*flex: 1;*/
  }
</style>