<template>
  <div>
    <p class="font-bold text-4xl ml-2 mt-6">Recent</p>
    <div class="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-2 mt-6">
      <nuxt-link :nuxt-child-key="episode.id" :to="`/watch/${episode.id}`" :key="episode.id" v-for="(episode, index) in recent.data">
        <episode-card :key="episode.id" :anime="episode.anime" :title="episode.title" :id="episode.id" :number="episode.number" :createdAt="episode.createdAt"/>
      </nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useFetch } from '#app';
  import { ref } from '#imports';

  const page = ref(1);

  const { data: recent } = await useFetch(() => `https://api.enime.moe/recent?page=${page.value}&perPage=12`);
</script>

<style scoped>

</style>