import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import { glassCssTarget, glassLightningcss } from "../vite.targets";

// The harness builds against the tree's own src/ with the library's CSS
// targets, so the colour values reach WebKit as a consumer's would.
export default defineConfig({
    root: __dirname,
    base: "./",
    resolve: { alias: { "@glass": resolve(__dirname, "../src") } },
    plugins: [tailwindcss(), vue()],
    css: { lightningcss: glassLightningcss },
    build: {
        cssTarget: glassCssTarget,
        outDir: resolve(__dirname, "dist"),
        emptyOutDir: true,
        minify: false,
        reportCompressedSize: false,
    },
});
