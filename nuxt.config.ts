import { defineNuxtConfig } from 'nuxt';

export default defineNuxtConfig({
    transpile: ["@vime/vue-next", "@vime/core"],

    modules: [
        "nuxt-windicss",
        "@vueuse/nuxt",
        "@pinia/nuxt",
        "nuxt-storm"
    ],

    components: true,

    ssr: false,

    css: [
        "virtual:windi-base.css",
        "virtual:windi-components.css",
        "virtual:windi-utilities.css",
        "@/assets/style/font.scss",
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
    },

    vue: {
        compilerOptions: {
            isCustomElement: tag => tag.startsWith("vds-")
        }
    },

    link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }
    ]
})
