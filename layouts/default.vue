<template>
  <div class="bg-black text-white h-screen w-screen flex flex-col">
    <div class="flex-grow w-screen p-0 m-0">
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
            of the anime presented on this site. This website is only a user interface presenting various self-hosted
            files
            across the internet for easy access.
            <br />
            © ENIME.MOE 2022
          </p>
        </div>
        <div class="flex-1 flex items-center justify-center">
          <a target="_blank" href="https://github.com/Enime-Project/enime.moe"><img class="h-10" src="/icons/github.png" /></a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "default"
}
</script>

<style scoped>
  .disclaimer {
    flex: 3;
  }
  .gray-text {
    color: #ccc;
  }
</style>