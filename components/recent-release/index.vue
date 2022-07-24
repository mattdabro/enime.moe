<template>
  <div>
    Recent Release
    <div v-for="(episode, index) in recent">
      <episode-card :anime="episode.anime" :title="episode.title"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFetch, useState } from '#app';

  const page = useState("page", () => 1);

  const { data: recent } = useFetch(`https://api.enime.moe/recent/${page}`);

  console.log(recent)
</script>

<style scoped>

</style>