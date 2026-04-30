import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [
        tailwindcss(),
        vue(),
    ],
    resolve: {
        alias: {
            "@": resolve(__dirname, "src"),
        },
    },
    build: {
        sourcemap: false,
        lib: {
            entry: resolve(__dirname, "src/index.ts"),
            name: "GlassUI",
            fileName: "glass-ui",
            formats: ["es"],
        },
        rollupOptions: {
            external: [
                "vue",
                "reka-ui",
                "@vueuse/core",
                "@mkbabb/keyframes.js",
                "class-variance-authority",
                "clsx",
                "tailwind-merge",
                "lucide-vue-next",
                "vaul-vue",
            ],
            output: {
                globals: {
                    vue: "Vue",
                    "@mkbabb/keyframes.js": "Keyframes",
                },
            },
        },
    },
});
