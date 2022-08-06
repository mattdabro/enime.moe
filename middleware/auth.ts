import { defineNuxtRouteMiddleware, navigateTo } from '#app';
import { useSupabaseUser } from '#imports';

export default defineNuxtRouteMiddleware(() => {
    const user = useSupabaseUser();

    if (!user.value) return navigateTo("/");
});