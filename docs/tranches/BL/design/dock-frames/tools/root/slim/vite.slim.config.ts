// The O-420 witness build: the two dock pages and the grouped-run page only, over the
// tree's own src (the `@glass` alias), with the demo's CSS and the same CSS target and
// backdrop-filter fold the demo build uses.
import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig, type Plugin } from "vite";
import { glassCssTarget } from "../vite.targets";
import { normalizeBackdropFilterPairs } from "../vite.style-fold";

const tree = resolve(__dirname, "..");
function fold(): Plugin {
    return {
        name: "slim:fold",
        generateBundle(_o, bundle) {
            for (const out of Object.values(bundle)) {
                if (out.type === "asset" && out.fileName.endsWith(".css") && typeof out.source === "string") out.source = normalizeBackdropFilterPairs(out.source);
            }
        },
    };
}
export default defineConfig({
    root: __dirname,
    base: "/slim/",
    resolve: { alias: { "@glass": resolve(tree, "src") } },
    plugins: [tailwindcss(), vue(), fold()],
    build: { cssTarget: glassCssTarget, outDir: resolve(tree, "slim-dist"), emptyOutDir: true, assetsDir: "assets" },
});
