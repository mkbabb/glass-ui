import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import {
    libraryEntries,
    libraryExternal,
    libraryFileName,
} from "./vite.library";
import { publishStyleAssets } from "./vite.style-assets";
import { componentSheets } from "./vite.component-sheets";
import { glassCssTarget, glassLightningcss } from "./vite.targets";

export default defineConfig({
    plugins: [
        tailwindcss(),
        vue(),
        componentSheets(),
        publishStyleAssets(),
    ],
    css: { lightningcss: glassLightningcss },
    build: {
        cssTarget: glassCssTarget,
        // U/B7b X3 — each chunk keeps its own SFC sheet, and `componentSheets`
        // makes the chunk import it, so `/styles` carries no component's scoped
        // rules (they were one 40 KB `glass-ui.css` folded into the entry).
        cssCodeSplit: true,
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
