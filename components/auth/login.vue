<template>
  <div @click="login('discord')">Login</div>
</template>

<script setup lang="ts">
import { useSupabaseClient, useSupabaseUser } from '#imports';
import { useRouter } from '#app';

const user = useSupabaseUser();
const client = useSupabaseClient();
const router = useRouter();

const login = async (provider: "discord") => {
  const { error } = await client.auth.signIn({ provider });

  if (error) alert("Login failed.");
  else await router.push("/");
}
</script>

<style scoped>

</style>