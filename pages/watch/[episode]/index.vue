<template>
  <div>
    <client-only placeholder="loading...">
      <Player @get-instance="getInstance" :url="url"/>
    </client-only>
  </div>
</template>

<script setup lang="ts">
import { useFetch, useRoute } from '#app';
import { createError } from 'h3';
const route = useRoute();

const { data: episode } = await useFetch(`https://api.enime.moe/episode/${route.params.episode}`);
if (!episode.value?.sources) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
}

const { url } = await $fetch.raw(episode.value.sources[0].url);
</script>

<script lang="ts">
import Player from '~/components/player/index.vue';

export default {
  components: {
    Player,
  },
  data() {
    return {

    };
  },
  methods: {
    getInstance(art) {
    },
  },
};
</script>