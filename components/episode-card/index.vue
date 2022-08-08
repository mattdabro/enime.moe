<template>
  <div class="cursor-pointer ms-5 mb-6 ml-3" style="width: 11rem;">
    <div class="anime-image bg-cover bg-center rounded-md mb-2"
      :style="{ backgroundImage: `url(${anime.coverImage})` }" />
    <p class="text-sm text-tertiary text-overflow">EP{{ number }}<span v-if="title">: {{ title }}</span></p>
    <p class="text-overflow p-0 text-white anime-title">{{ anime.title.userPreferred || anime.title.english ||
      anime.title.romaji }}</p>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    anime: {
      id: String,
      title: {
        english: String,
        native: String,
        romaji: String
      },
      coverImage: String
    },
    id: String,
    number: Number,
    title: !String,
    createdAt: String
  },
}
</script>

<style scoped>
  .anime-image {
    aspect-ratio: 2/3;
  }
  .anime-title {
    font-size: 1.2rem;
    line-height: 1;
    font-weight: 400;
  }
</style>