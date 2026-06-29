import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

// The paint-judge demo-dist build. This config builds the demo as a static SPA
// so the paint-judge can serve BUILT bytes (`vite preview`) instead of the dev
// server. Real Safari/WebKit renders the dev server as a bare shell (the route
// content never paints in WebKit off the dev transform pipeline); serving the
// built dist makes WebKit captures render real route content.
//
// This is a STANDALONE config (passed via `--config`), so it fully REPLACES the
// root `vite.config.ts` — it does NOT inherit the library `build.lib`/
// `publishStyleAssets` arm. It is a plain app build over the SAME demo entry +
// the SAME plugins + the SAME `@glass` alias the dev demo (`vite` from repo
// root) uses, so what builds here is byte-faithful to `npm run demo:serve`.
//
// The demo entry is the REPO-ROOT `index.html` (which loads `/demo/main.ts`),
// so `root` is the repo root, NOT `demo/`. Styles come through `demo.css`
// (`@import "tailwindcss" source("../demo")` + `@import "../src/styles/
// index.css"`) processed by the Tailwind v4 vite plugin — no `publishStyleAssets`
// needed.
const repoRoot = resolve(__dirname, "..");

export default defineConfig({
    root: repoRoot,
    // `base: "/"` — the deep-SPA-route asset-resolution fix. A deep route
    // (e.g. `/dock/overview`) must resolve its built `/assets/*.js` from the
    // server root, not relative to the route path.
    base: "/",
    resolve: {
        // BH.B2.0 — the `@glass` source alias (`@glass/*` → `src/*`), mirrored
        // from the dev `vite.config.ts`. A stale alias = broken build (492 demo
        // call sites resolve through it).
        alias: {
            "@glass": resolve(repoRoot, "src"),
        },
    },
    plugins: [tailwindcss(), vue()],
    build: {
        // A dedicated output dir — NEVER the library `dist/` (which the
        // published package + the d.ts emit own).
        outDir: resolve(repoRoot, "dist-demo"),
        emptyOutDir: true,
    },
});
