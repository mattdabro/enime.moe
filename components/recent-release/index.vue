<template>
  <p class="font-bold text-4xl ml-8 mt-10">Recently Released</p>
  <div class="flex flex-row items-center mt-6 left-0 right-0 m-0 p-0 w-screen relative mb-20">
    <div @click="scrollLeft" class="button left p-0 w-10 h-10">
      <left-arrow class="leftarrow" color="#ffF" />
    </div>
    <div @scroll="scroll" id="eps" ref="eps"
      class="grid grid-rows-2 col-auto row-auto grid-flow-col-dense m-0 overflow-x-scroll w-screen pr-5">
      <nuxt-link :nuxt-child-key="episode.id" :to="`/watch/${episode.id}`" :key="episode.id"
        v-for="(episode, index) in recent.data" class="p-0 m-0">
        <episode-card :key="episode.id" :anime="episode.anime" :title="episode.title" :id="episode.id"
          :number="episode.number" :createdAt="episode.createdAt" />
      </nuxt-link>
    </div>
    <div @click="scrollRight" class="button right p-0 w-10 h-10">
      <left-arrow class="leftarrow" color="#ffF" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from '#imports';
  import { useFetch } from '#app';

  // https://stackoverflow.com/a/42769683/10013227
  function convertRemToPixels(rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
  }

  const rows = Math.ceil(window.innerWidth / convertRemToPixels(11)) * 2;

  const page = ref(1);

  let { data: recent, refresh } = await useFetch(() => `https://api.enime.moe/recent?page=${page.value++}&perPage=${rows}`);

  async function scroll(e: Event) {
    const eps = e.target as HTMLElement;
    if (eps.scrollLeft + eps.clientWidth >= eps.scrollWidth) {
      refresh();
      eps.scrollLeft = eps.scrollWidth;
    }
  }
</script>

<script lang="ts">
  import LeftArrow from '@/components/icon/leftarrow.vue';

  export default {
    components: {
      LeftArrow
    },
    methods: {
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
    box-shadow: 0px 0px 10px rgb(0, 0, 0);
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