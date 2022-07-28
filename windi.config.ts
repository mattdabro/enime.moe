import { defineConfig } from 'windicss/helpers';

export default defineConfig({
    preflight: true,
    theme: {
        colors: {
            black: "#000000",
            white: "#FFFFFF"
        }
    },
    plugins: [
        require("windicss/plugin/aspect-ratio")
    ]
})