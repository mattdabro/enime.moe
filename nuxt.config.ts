import { defineNuxtConfig } from 'nuxt';

export default defineNuxtConfig({
    modules: [
        "nuxt-windicss",
        "@vueuse/nuxt",
        "@pinia/nuxt",
        "nuxt-storm",
        "@nuxtjs/supabase",
        // "@nuxtjs/partytown"
    ],

    components: true,

    ssr: true,

    css: [
        "virtual:windi-base.css",
        "virtual:windi-components.css",
        "virtual:windi-utilities.css",
        "@/assets/style/font.scss",
        "@/assets/style/app.scss",
    ],

    runtimeConfig: {
        public: {
            enimeApi: "https://api.enime.moe"
        }
    },

    windicss: {
        scan: {
            dirs: ["./"],
            exclude: [
                "node_modules",
                "dist"
            ]
        }
    },

    supabase: {
        url: process.env.NUXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL,
        key: process.env.NUXT_PUBLIC_SUPABASE_KEY || process.env.SUPABASE_KEY
    },

    vueuse: {
        ssrHandlers: true,
    },

    link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }
    ],

    /*
    partytown: {
        forward: ["dataLayer.push"],
    },
     */

    app: {
        head: {
            script: [
                {
                    hid: "gtm",
                    children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-TF7R748');`,
                    type: "text/javascript"
                }
            ],
        },
    },
})
