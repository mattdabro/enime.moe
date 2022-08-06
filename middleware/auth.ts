import { defineNuxtMiddleware } from '@nuxtjs/composition-api';
import { navigateTo } from '#app';
import { useSupabaseUser } from '#imports';

export default defineNuxtMiddleware(() => {
    const user = useSupabaseUser();

    if (!user.value) return navigateTo("/");
});