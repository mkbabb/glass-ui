// scripts/lighthouse/consumer-app/vite.config.mts — the minimal bare-consumer
// build config (BB.W-LIGHTHOUSE W4). Builds the consumer harness from the BUILT
// `dist/` so the Lighthouse score reflects the PUBLISHED artefact's first paint,
// not the demo's library-SOURCE import path.
//
// `@mkbabb/glass-ui` + `/styles` are aliased EXPLICITLY to the repo's `dist/`
// (deterministic regardless of whether a self-symlink exists in node_modules) —
// the contract-v2 dev-resolution model: a consumer resolves the built `dist/` in
// dev and prod alike (CLAUDE.md §"The self-emission class").

import vue from "@vitejs/plugin-vue";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const ROOT = resolve(fileURLToPath(new URL("../../../", import.meta.url)));
const HERE = resolve(fileURLToPath(new URL("./", import.meta.url)));
const OUT_DIR = resolve(ROOT, ".cache/lighthouse/consumer-dist");

export default defineConfig({
    root: HERE,
    base: "./",
    // NO `tailwindcss()` plugin: this harness imports the PUBLISHED, PRE-COMPILED
    // `dist/styles/index.css` monolith as a plain CSS asset — exactly the wire a
    // consumer pays at first paint (the W-EMISSION self-emission ships the
    // component utilities INTO the monolith, so a bare consumer paints correctly
    // with no `@source` glob). Re-running the tailwind plugin over the already-
    // compiled monolith both double-processes it AND trips lightningcss on the
    // apostrophes inside the monolith's `@source` doc comments — neither models a
    // real consumer's first-paint cost. The plain import is the binding wire.
    plugins: [vue()],
    resolve: {
        alias: [
            // BG.W-CSS-MINIFY (F8.4) — the harness imports the ONE byte-complete
            // `./styles` union (the minified cascade). The BC.W-CSS-CRITICAL
            // critical/deferred split retired: after the publish-time minify the
            // ~13KB saving was not worth the split, so the bare consumer pays the
            // minified monolith's first paint — the binding published wire.
            {
                find: /^@mkbabb\/glass-ui\/styles$/,
                replacement: resolve(ROOT, "dist/styles/index.css"),
            },
            {
                find: "@mkbabb/glass-ui",
                replacement: resolve(ROOT, "dist/glass-ui.js"),
            },
        ],
    },
    build: {
        outDir: OUT_DIR,
        emptyOutDir: true,
        target: "es2022",
        // `minify: true` → oxc under Vite 8 / Rolldown (esbuild is not a repo dep).
        minify: true,
        // The imported `dist/styles/index.css` is ALREADY production-minified by
        // the library build. Re-minifying it through lightningcss trips on the
        // apostrophes inside its `@source` doc comments (BadString) — and would be
        // wasted work re-compressing an already-compressed monolith. Pass it
        // through untouched; the gzip-on-the-wire transfer cost is unchanged.
        cssMinify: false,
        sourcemap: false,
    },
});
