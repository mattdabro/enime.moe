<template>
  <p class="font-bold text-4xl ml-8 mt-10">Recently Released</p>
  <div class="flex flex-row items-center mt-6 left-0 right-0 m-0 px-10 w-screen relative mb-20">
    <div @click="scrollLeft" class="button left ml-5 w-10 h-10">
      <left-arrow class="leftarrow" color="#ffF" />
    </div>
    <div @scroll="scroll" id="eps" ref="eps"
      class="m-10 grid grid-rows-6 md:grid-rows-4 lg:grid-rows-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6 m-0 overflow-x-scroll gap-x-5 gap-y-10">
      <nuxt-link :nuxt-child-key="episode.id" :to="`/watch/${episode.id}`" :key="episode.id"
        v-for="(episode, index) in recent.data" class="p-0 m-0">
        <episode-card :key="episode.id" :anime="episode.anime" :title="episode.title" :id="episode.id"
          :number="episode.number" :createdAt="episode.createdAt" />
      </nuxt-link>
    </div>
    <div @click="scrollRight" class="button right mr-5 w-10 h-10">
      <left-arrow class="leftarrow" color="#ffF" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useFetch } from '#app';
  import { ref } from '#imports';

  const page = ref(1);
  function load() {
    return useFetch(() => `https://api.enime.moe/recent?page=${page.value}&perPage=12`)
  }

  let { data: recent } = await load();
</script>

<script lang="ts">
  import LeftArrow from '@/components/icon/leftarrow.vue';

  export default {
    components: {
      LeftArrow
    },
    methods: {
      async scroll() {
        if(this.$refs.eps.scrollLeft + this.$refs.eps.clientWidth >= this.$refs.eps.scrollWidth) {
          page.value++;
          recent = recent.concat(await load());
          this.$nextTick(() => {
            this.$refs.eps.scrollLeft = this.$refs.eps.scrollWidth;
          });
        }
      },
      scrollLeft() {
        const eps = this.$refs.eps as HTMLElement;
        eps.scrollTo({
          left: eps.scrollLeft - 300,
          behavior: 'smooth'
        });
      },
      scrollRight() {
        const eps = this.$refs.eps as HTMLElement;
        eps.scrollTo({
          left: eps.scrollLeft + 300,
          behavior: 'smooth'
        });
      }
    }
  }
</script>

<style scoped>
  .leftarrow {
    color: #fff;
    width: 1.5rem;
    height: 1.5rem;
  }
  .button {
    position: absolute;
    cursor: pointer;
    margin: 5px;
    border-radius: 50%;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 1);
    background-color: #000;
    border: solid 1px #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .button:hover {
    transition: background-color 0.2s linear;
    background-color: #333;
  }
  .left {
    left: 0;
    transform: scaleX(-1);
  }
  .right {
    right: 0;
  }

  /* Removes scrollbars, across chrome and ff */
  .overflow-x-scroll::-webkit-scrollbar {
    display: none;
  }
  .overflow-x-scroll {
    scrollbar-width: none;
  }
</style>