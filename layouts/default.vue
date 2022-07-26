<template>
  <div class="bg-black text-white h-screen inline-flex flex-col">
    <div class="flex-grow">
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