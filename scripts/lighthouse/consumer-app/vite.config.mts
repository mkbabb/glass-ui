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
            // The render-blocking-EARLY critical subset + the non-blocking
            // deferred tail (BC.W-CSS-CRITICAL load-order proof). A real
            // consumer who wants the split imports `./styles/critical`
            // render-blocking + `./styles/deferred` non-blocking; the harness
            // dogfoods that consumer-owned strategy so the published split's
            // first-paint reach is the binding wire (presets-in-consumers — the
            // library ships the two partitioned files, the consumer picks the
            // load order). The `./styles` union stays the one-import path.
            // Exact-match RegExp anchors (a string `find` does prefix
            // replacement, so `/styles/critical` would otherwise resolve through
            // the broader `/styles` alias). The optional `(\\?.*)?$` keeps the
            // `?url` query so the deferred tail emits as a real, separately-
            // cacheable, non-render-blocking asset.
            {
                find: /^@mkbabb\/glass-ui\/styles\/critical$/,
                replacement: resolve(ROOT, "dist/styles/critical.css"),
            },
            {
                find: /^@mkbabb\/glass-ui\/styles\/deferred(\?.*)?$/,
                replacement: resolve(ROOT, "dist/styles/deferred.css") + "$1",
            },
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
