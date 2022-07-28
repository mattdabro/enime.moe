<template>
  <div class="cursor-pointer ms-5 mb-6 ml-3" style="width: 11rem;">
    <div class="anime-image bg-cover bg-center rounded-md mb-2"
      :style="{ backgroundImage: `url(${anime.coverImage})` }" />
    <div class="text-overflow mt-1 m-0 p-0 flex items-center">
      <p class="text-sm text-tertiary">EP{{ number }}</p>
      <!--<bullet />
      <p class="text-tertiary">{{ createdAt | date }}</p>-->
      <p class="text-sm text-tertiary" v-if="title">: {{ title }}</p>
    </div>
    <div class="">
      <p class="text-overflow p-0 text-white anime-title">{{ anime.title.english || anime.title.romaji }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import Bullet from '@/components/icon/bullet.vue';

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
  components: {
    Bullet
  }
}
</script>

<style scoped>
  .anime-image {
    aspect-ratio: 2/3;
  }
  .text-overflow {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .anime-title {
    font-size: 1.2rem;
    line-height: 1;
    font-weight: 400;
  }
</style>