<template>
  <div class="bg-black text-white h-screen w-screen flex flex-col">
    <div class="nav-cont">
      <div class="inline-flex items-center gap-8 h-full mx-auto relative">
        <nuxt-link to="/" class="text-4xl text-tertiary">Explore</nuxt-link>
        <div class="grid">
          <div class="urmom text-4xl text-tertiary flex flex-row flex-nowrap items-center px-2">
            <svg width="1.5rem" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span class="pl-1">Search</span>
          </div>
          <input :submit="search" placeholder=" " class="urmom in p-2 text-4xl w-40" />
        </div>
      </div>
    </div>
    <div class="flex-grow w-screen p-0 m-0 mt-20">
      <slot />
    </div>
    <footer class="bg-[#222] p-10">
      <div class="flex flex-row container mx-auto">
        <div class="disclaimer">
          <div class="flex flex-row items-center mb-3">
            <img src="/icons/64x64.png" class="w-6 mr-2" />
            <h1 class="text-2xl">Enime-Project</h1>
          </div>
          <p class="gray-text">ENIME.MOE is not affiliated with or endorsed by any of the anime studios behind
            the creation
            of the anime presented on this site. This website is only a user interface presenting/linking various
            self-hosted
            files
            across the internet by other third-party providers for easy access.
            <br />
            © ENIME.MOE 2022 | Built with <a href="https://github.com/Enime-Project/api.enime.moe" class="text-tertiary">Enime API</a>
          </p>
        </div>
        <div class="flex-1 flex items-center justify-center">
          <a target="_blank" href="https://github.com/Enime-Project/enime.moe"><img class="h-7 mr-5"
              src="/icons/github.png" /></a>
          <a target="_blank" href="https://discord.gg/nxr8be8WGa"><img class="w-7" src="/icons/discord.png" /></a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">

export default {
  name: "default",
  methods: {
    search() {
    }
  }
}
</script>

<style scoped lang="scss">
  .nav-cont {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    z-index: 100;
    height: 5rem;
    width: 100%;
    overflow: hidden;
    background-color: black;
    display: flex;
    
    flex-direction: column;
  }
  .urmom {
    grid-column: 1;
    grid-row: 1;
  }
  .in {
    background-color: transparent; /* #fff3; */
    border-radius: .6rem;

    &:not(:placeholder-shown) {
      background-color: black;
      border: 3px solid #333;
    }
  }
  .disclaimer {
    flex: 3;
  }
  .gray-text {
    color: #ccc;
  }
</style>