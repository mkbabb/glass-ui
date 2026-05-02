import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import {
    libraryAliases,
    libraryEntries,
    libraryExternal,
    libraryFileName,
    libraryGlobals,
} from "./vite.library";

export default defineConfig({
    plugins: [
        tailwindcss(),
        vue(),
    ],
    resolve: {
        alias: libraryAliases(__dirname),
    },
    build: {
        sourcemap: false,
        lib: {
            entry: libraryEntries(__dirname),
            name: "GlassUI",
            fileName: libraryFileName,
            formats: ["es"],
        },
        rollupOptions: {
            external: libraryExternal,
            output: {
                globals: libraryGlobals,
            },
        },
    },
});
