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
            "@utils": resolve(__dirname, "src/utils"),
        },
    },
    build: {
        lib: {
            entry: {
                index: resolve(__dirname, "src/index.ts"),
                tokens: resolve(__dirname, "src/tokens.ts"),
            },
            name: "GlassUI",
            fileName: (_format, entryName) =>
                entryName === "index" ? "glass-ui.js" : `${entryName}.js`,
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
