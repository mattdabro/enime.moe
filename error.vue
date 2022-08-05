<template>
  <p>Error!!!!</p>
</template>

<script setup lang="ts">
import { clearError } from '#app';

const props = defineProps({
  error: Object
})

const handleError = () => clearError({ redirect: "/" })
</script>

<style scoped>

</style>