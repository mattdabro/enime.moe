import { defineNuxtConfig } from 'nuxt';

export default defineNuxtConfig({
    modules: [
        "nuxt-windicss",
        "@vueuse/nuxt",
        "@pinia/nuxt",
        "nuxt-storm"
    ],

    components: true,

    css: [
        "virtual:windi-base.css",
        "virtual:windi-components.css",
        "virtual:windi-utilities.css",
        "@/assets/style/app.scss",
    ],
    
    windicss: {
        scan: {
            dirs: ["./"],
            exclude: [
                "node_modules",
                "dist"
            ]
        }
    },

    vueuse: {
        ssrHandlers: true,
    }
})
