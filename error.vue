<template>
  <p class="text-white">{{ error.statusCode }}</p>
  <p class="text-white">{{ error.message }}</p>
</template>

<script setup lang="ts">
import { clearError, useError } from '#app';

const props = defineProps({
  error: Object
})

const error = useError();

const handleError = () => clearError({ redirect: "/" })
</script>

<style scoped>

</style>