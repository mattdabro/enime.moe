<template>
  <div class="cursor-pointer ms-5 mb-6 ml-3" style="width: 20rem;">
    <div class="anime-image bg-cover bg-center rounded-md mb-4" :style="{ backgroundImage: `url(${coverImage})`}">
    </div>
    <p class="text-overflow p-0 text-white anime-title">{{ title.userPreferred || title.english || title.romanji || title.native }}</p>
    <p class="text-tertiary text-sm">{{status}} • {{currentEpisode}} Episodes</p>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    id: String,
    slug: String,
    coverImage: String,
    status: String,
    title: {
      english: String,
      native: String,
      romaji: String
    },
    currentEpisode: Number,
  }
}
</script>

<style scoped>
.anime-image {
  aspect-ratio: 16/9;
}

.anime-title {
  font-size: 1.2rem;
  line-height: 1;
  font-weight: 400;
}
</style>