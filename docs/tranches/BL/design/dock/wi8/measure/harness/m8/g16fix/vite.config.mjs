// The fixture's build: @mkbabb/glass-ui/<entry> resolved to GLASS_DIST/<entry>.js (a ref's `git archive` library dist),
// everything else (vue, reka-ui, ...) from the main checkout's node_modules, as a site's install would give it.
import { defineConfig } from "vite";
import { resolve } from "node:path";
const D = process.env.GLASS_DIST;
if (!D) throw new Error("GLASS_DIST unset");
const entries = ["dock", "dock-trigger", "menu", "select", "popover", "tooltip"];
export default defineConfig({
    root: resolve(import.meta.dirname),
    logLevel: "warn",
    resolve: { alias: entries.map((e) => ({ find: new RegExp(`^@mkbabb/glass-ui/${e}$`), replacement: resolve(D, `${e}.js`) })), dedupe: ["vue"] },
    build: { outDir: process.env.FIX_OUT, emptyOutDir: true, sourcemap: false, reportCompressedSize: false },
});
