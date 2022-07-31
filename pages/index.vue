<template>
  <div>
    <p class="font-bold text-4xl mt-10">Recently Released</p>
    <client-only>
      <recent-release/>
    </client-only>
  </div>
</template>

<script>
export default {
  name: "index"
}
</script>

<style scoped>
  .text-4xl {
    margin-left: 10vw;
  }
</style>