<template>
  <div class="cursor-pointer">
    <div class="aspect-video bg-cover bg-center rounded-md" v-bind:style="{ backgroundImage: `url(${anime.coverImage})` }"/>
    <div class="mt-1">
      <p class="text-tertiary">E #{{ number }}</p>
      <bullet v-if="title"/>
      <p class="text-tertiary" v-if="title">{{ title }}</p>
    </div>
    <div>
      <p class="text-white text-xl text-bold">{{ anime.title.english || anime.title.romaji }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import Bullet from '@/components/icon/bullet';

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
    title: !String
  },
  components: {
    Bullet
  }
}
</script>

<style scoped>

</style>