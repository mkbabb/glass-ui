import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
    plugins: [
        tailwindcss(),
        vue(),
        dts({
            tsconfigPath: "./tsconfig.json",
            rollupTypes: true,
        }),
    ],
    resolve: {
        alias: {
            "@": resolve(__dirname, "src"),
        },
    },
    build: {
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
                "class-variance-authority",
                "clsx",
                "tailwind-merge",
                "lucide-vue-next",
                "vaul-vue",
            ],
            output: {
                globals: {
                    vue: "Vue",
                },
            },
        },
    },
});
