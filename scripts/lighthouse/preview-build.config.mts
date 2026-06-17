// scripts/lighthouse/preview-build.config.mts — the COMMITTED, re-runnable
// production demo-SPA build config (BB.W-LIGHTHOUSE).
//
// The repo's root `vite.config.ts` is LIB-MODE ONLY (`build.lib` → the
// per-subpath chunk set + `/styles` CSS). `npm run dev` serves the demo SPA in
// DEV mode (Vite ignores `build.lib` while serving `index.html`), so there has
// never been a production demo-SPA BUILD config — the AY perf harness used a
// throwaway `.cache/vite.demo-perf.config.mts` removed at lane close (the
// chronic). This file is the durable replacement: a dedicated SPA config that
// produces the minified, code-split, gzip-servable production demo build the
// `proof:lighthouse` gate scores. It is COMMITTED (NOT under `.cache/`) so the
// gate re-runs deterministically in CI.
//
// The demo imports library SOURCE (the `demo/` tree reaches `src/` via relative
// imports per the v0.8.2 repo convention — there is NO `@/` alias in the demo,
// confirmed at HEAD), so this config carries only the standard tailwind+vue
// plugin pair + the SPA `index.html` input + the production `dist/` output. The
// `publishStyleAssets()` lib-publish plugin is DELIBERATELY OMITTED — it is a
// library-build concern (it base64-inlines the `./styles/fonts` woff2 for the
// published bundle); the demo SPA build does not publish, it dogfoods the demo's
// own `demo.css` font wiring.

import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

// This config file lives at <root>/scripts/lighthouse/; the repo root is two up.
const ROOT = resolve(fileURLToPath(new URL("../../", import.meta.url)));

// The production demo-SPA build lands in a dedicated dir under the gate cache so
// it never collides with the library `dist/` (the consumer harness imports the
// real `dist/`; the demo SPA build is its own artefact). It is gitignored
// (`.cache/` is in .gitignore) — the BUILD is reproducible from this committed
// config; only the config + the floor baseline are committed.
const OUT_DIR = resolve(ROOT, ".cache/lighthouse/demo-dist");

export default defineConfig({
    // Run from the repo root so `index.html` (which references `/demo/main.ts`)
    // resolves the demo entry exactly as `npm run dev` does.
    root: ROOT,
    // A relative base so the built SPA serves correctly under `vite preview`
    // regardless of the mount path.
    base: "./",
    plugins: [tailwindcss(), vue()],
    build: {
        // The PRODUCTION SPA: NOT lib-mode. `index.html` is the input; Vite
        // emits a minified, code-split, hashed bundle the preview server can
        // gzip-serve — production-representative transfer sizes.
        outDir: OUT_DIR,
        emptyOutDir: true,
        // Production minification + sourcemaps off (the smaller, gzip-served
        // wire the consumer sees). Modern target — the demo dogfoods the
        // library's ES2022 baseline. `minify: true` (NOT "esbuild") — Vite 8 /
        // Rolldown minifies via oxc; esbuild is not a repo dep (the explicit
        // "esbuild" minifier errors "Cannot find package 'esbuild'").
        target: "es2022",
        minify: true,
        sourcemap: false,
        // The demo is heavy (aurora/blob shaders inline as .glsl.ts template
        // strings); silence the size warning so the build does not noise-fail
        // the gate. The byte budget is `profile:budget`'s job, not this build's.
        chunkSizeWarningLimit: 4096,
    },
    // No demo-side `@/` alias exists at HEAD (relative imports across the repo,
    // v0.8.2). The library SOURCE the demo reaches is plain relative `../src`.
});
