import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import { glassCssTarget, glassLightningcss } from "../vite.targets";

// The witness page builds against the tree's own src/ with the library's CSS targets,
// so each rule reaches Chromium and WebKit as a consumer's build would ship it.
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
