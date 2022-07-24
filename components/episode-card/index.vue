<template>
  <div>
    <img :alt="anime.id" :src="anime.coverImage"/>
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
    number: Number
  }
}
</script>

<style scoped>

</style>