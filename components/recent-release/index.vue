<template>
  <div>
    <p class="font-bold text-4xl">Recent</p>
    <div class="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-2 mt-10">
      <episode-card :anime="episode.anime" :title="episode.title" :id="episode.id" :number="episode.number" v-for="(episode, index) in recent.data"/>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useFetch, useState } from '#app';

  const page = useState("page", () => 1);

  const { data: recent } = useFetch(`https://api.enime.moe/recent?page=${page}&perPage=12`);
</script>

<style scoped>

</style>