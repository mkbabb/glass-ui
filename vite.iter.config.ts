import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import {
    libraryEntries,
    libraryExternal,
    libraryFileName,
} from "./vite.library";
import { publishStyleAssets } from "./vite.style-assets";
import { glassCssTarget } from "./vite.targets";

export default defineConfig({
    plugins: [
        tailwindcss(),
        vue(),
        publishStyleAssets(),
    ],
    build: {
        cssTarget: glassCssTarget,
        sourcemap: false,
        lib: {
            entry: libraryEntries(__dirname),
            name: "GlassUI",
            fileName: libraryFileName,
            formats: ["es"],
        },
        rolldownOptions: {
            external: libraryExternal,
        },
    },
});
