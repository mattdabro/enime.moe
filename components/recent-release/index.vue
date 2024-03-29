<template>
  <div class="flex flex-row items-center mt-6 left-0 right-0 m-0 p-0 w-full mb-20">
    <div ref="sleft" @click="scrollLeft" class="button left disabled p-0 w-10 h-10">
      <left-arrow class="leftarrow" color="#ffF" />
    </div>
    <div @scroll="scroll" id="eps" ref="eps"
      class="grid grid-rows-2 col-auto row-auto grid-flow-col-dense m-0 overflow-x-scroll w-full pr-5 pl-5">
      <nuxt-link :nuxt-child-key="episode.id" :to="`/watch/${episode.anime.slug}/${episode.number}`" :key="episode.id"
        v-for="(episode, index) in recent" class="p-0 m-0">
        <episode-card :key="episode.id" :anime="episode.anime" :title="episode.title" :id="episode.id"
          :number="episode.number" :createdAt="episode.createdAt" />
      </nuxt-link>
    </div>
    <div ref="sright" @click="scrollRight" class="button right p-0 w-10 h-10">
      <left-arrow class="leftarrow" color="#ffF" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch } from '#imports';
  import { useFetch, useRuntimeConfig } from '#app';

  const runtimeConfig = useRuntimeConfig();
  // https://stackoverflow.com/a/42769683/10013227
  function convertRemToPixels(rem: number) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
  }

  let fullyloaded = false;

  const rem11 = convertRemToPixels(11);
  const rows = Math.ceil(window.innerWidth / rem11) * 2;

  const page = ref(1);
  const recent = ref([]);

  const { data } = await useFetch(() => `${runtimeConfig.public.enimeApi}/recent?page=${page.value}&perPage=${rows}`, {
    key: `/recent?page=${page.value}`
  });
  load();

  function load() {
    if (data.value) {
      if(data.value.meta.currentPage === data.value.meta.lastPage) {
        document.querySelector('.right')?.classList?.add('disabled'); fullyloaded = true; return; }
      else document.querySelector('.right')?.classList?.remove('disabled');
      for (let i = 0; i < rows; i++) {
        recent.value.push(data.value.data[i]);
      }
    }
  }

  watch(data, () => {
    load();
  });

  async function scroll(e: Event) {
    const eps = e.target as HTMLElement;

    if (eps.scrollLeft > 0)
      document.querySelector('.left')?.classList?.remove('disabled');
    else document.querySelector('.left')?.classList?.add('disabled');
    if(fullyloaded) {
      if(eps.scrollLeft >= eps.scrollWidth)
        document.querySelector('.right')?.classList?.add('disabled');
      else document.querySelector('.right')?.classList?.remove('disabled');
      return;
    }

    if (eps.scrollLeft + eps.clientWidth >= eps.scrollWidth) {
      page.value++;
      eps.scrollLeft = eps.scrollWidth;
    }
  }
</script>

<script lang="ts">
  import LeftArrow from '@/components/icon/leftarrow.vue';

  function sc(e: Element, s: number) {
    e.scrollTo({
      left: e.scrollLeft + s * window.innerWidth,
      behavior: 'smooth'
    });
    return e.scrollLeft + s * window.innerWidth;
  }

  export default {
    components: {
      LeftArrow
    },
    methods: {
      scrollLeft() {
        this.$refs.sright.classList.remove('disabled');
        if (sc(this.$refs.eps as HTMLElement, -1) <= 0)
          this.$refs.sleft.classList.add('disabled');
        else this.$refs.sleft.classList.remove('disabled');
      },
      scrollRight() {
        sc(this.$refs.eps as HTMLElement, 1);
        this.$refs.sleft.classList.remove('disabled');
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
    box-shadow: 0px 0px 2px rgb(0, 0, 0);
    background-color: #000;
    border: solid 1px #333;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .button.disabled {
    opacity: 0.5;
    pointer-events: none;
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