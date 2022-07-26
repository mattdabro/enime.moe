<template>
  <div class="bg-black text-white h-screen w-screen flex flex-col">
    <div class="flex-grow w-screen">
      <slot />
    </div>
    <footer class="bg-[#333] p-10 px-20"> No content is hosted on this site </footer>
  </div>
</template>

<script>
export default {
  name: "default"
}
</script>

<style scoped>

</style>