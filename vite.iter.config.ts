import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import {
    libraryEntries,
    libraryExternal,
    libraryFileName,
} from "./vite.library";
import { publishStyleAssets } from "./vite.style-assets";

export default defineConfig({
    plugins: [
        tailwindcss(),
        vue(),
        publishStyleAssets(),
    ],
    build: {
        sourcemap: false,
        // The iter build OVERWRITES the measured JS/CSS chunks in place; emptying
        // dist/ would also nuke the flat per-subpath d.ts set the full build's
        // emit-types arm wrote — which mid-sweep REDs every gate that reads a
        // dist/*.d.ts (proof:motion-suite's SUITE-COMPLETE arm bit this).
        emptyOutDir: false,
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
