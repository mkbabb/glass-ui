import { cpSync, existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig, type Plugin } from "vite";
import {
    libraryEntries,
    libraryExternal,
    libraryFileName,
    libraryGlobals,
} from "./vite.library";

/**
 * publishStyleAssets — fourier A.W2.f (cross-repo dev-resolution
 * contract-v2 publisher-half hygiene).
 *
 * The `./styles` export in package.json formerly published the raw
 * source `./src/styles/index.css`, whose `@font-face` rules reference
 * `url("../fonts/<family>/<face>.woff2")` (relative to `src/styles/`).
 * Under contract-v2 (docs/precepts/cross-repo-dev-resolution.md §2.1)
 * every exports key MUST point into `dist/`; consumers no longer widen
 * `server.fs.allow` into a sibling's `src/` (§2.2 STRUCK), so font URLs
 * that resolve out of `src/fonts/` return 403 from the consumer's Vite.
 *
 * Two architectural responses were possible:
 *
 *   - Option A — copy `src/fonts/` to `dist/fonts/`, preserve relative
 *     `url()` form. Structural blocker: Vite resolves CSS `url()`
 *     against the file's `realpath`, which under the consumer's
 *     `file:` symlink lands at `/Users/.../glass-ui/dist/fonts/...` —
 *     OUTSIDE the consumer's project root, so the `/@fs/` channel
 *     gates on `server.fs.allow` and still 403s. Package-specifier
 *     URLs (`url("@mkbabb/glass-ui/fonts/...")`) likewise fail —
 *     Vite's CSS pipeline does not resolve bare specifiers in `url()`
 *     the way it does in `@import`. The relative URL is structurally
 *     locked to the sibling's realpath; no source rewrite escapes it.
 *
 *   - Option B — inline the woff2 files as `data:font/woff2;base64,…`
 *     URIs in the published CSS at build time. The font request layer
 *     vanishes entirely; the `fs.allow` triangle dissolves. CSS-payload
 *     cost is bounded — total font corpus is 124 KB raw across two
 *     families (Plus Jakarta Sans latin + latin-ext, variable wght
 *     200..800; Fira Code latin + latin-ext, variable wght 300..700) →
 *     ~165 KB base64-encoded, gzips to ~120 KB. Within the inline-asset
 *     register for a once-loaded design-system CSS.
 *
 * Option B chosen — A's blocker is the symlink-realpath axis of Vite's
 * resolver, not a glass-ui internal. The dist CSS is also self-contained
 * for cdn / npm-published consumption: no out-of-tree font requests, no
 * preload-coordination guesswork on the consumer side.
 *
 * The plugin: cpSync `src/styles/` → `dist/styles/`, then walk each
 * `*.css` file and substitute every `url("../fonts/<rel>")` with a
 * `data:` URI built from `readFileSync("src/fonts/<rel>")`. `src/fonts/`
 * is also cpSync'd to `dist/fonts/` so the `./fonts/*` exports subpath
 * (added below) covers any future per-asset consumer that wants the raw
 * woff2 — `@font-face` consumers transparently bypass it.
 */
function publishStyleAssets(): Plugin {
    return {
        name: "glass-ui:publish-style-assets",
        apply: "build",
        closeBundle() {
            const root = __dirname;
            const srcFonts = resolve(root, "src/fonts");
            const distFonts = resolve(root, "dist/fonts");
            const srcStyles = resolve(root, "src/styles");
            const distStyles = resolve(root, "dist/styles");

            if (existsSync(srcFonts)) {
                cpSync(srcFonts, distFonts, { recursive: true });
            }
            if (existsSync(srcStyles)) {
                cpSync(srcStyles, distStyles, { recursive: true });
            }

            // AN.W1 — fold the SFC scoped component CSS into the `/styles`
            // bundle so a single `@import "@mkbabb/glass-ui/styles"` carries
            // the COMPLETE stylesheet: the token cascade (this file's @import
            // chain) PLUS the per-component `<style scoped>` payload Vite
            // extracts to `dist/glass-ui.css` (Aurora's `.aurora-root` grid
            // layering, Progress/Slider/etc. scoped rules).
            //
            // At HEAD the two artefacts sat behind two exports — `./styles`
            // (cascade) and `./styles.css` (SFC scoped) — so a consumer needed
            // both `@import` lines. The fix appends an `@import` of the SFC
            // bundle into the dist copy of `index.css` (Shape A per W1 spec):
            // least-invasive, the cascade authoring is untouched, and
            // `./styles.css` stays reachable as a transparent SFC-only export
            // (NOT a back-compat alias). The `@import` is injected into the
            // DIST copy only — `src/styles/index.css` references no built
            // sibling, so the `proof:theme` source-read stays valid.
            //
            // CSS ordering: the SFC `@import` is inserted before the trailing
            // `@source` at-rule so it sits inside the file's leading @import
            // block (CSS forbids `@import` after a non-import statement). The
            // SFC bundle lives one dir up from `dist/styles/`, hence
            // `../glass-ui.css`.
            const distIndex = resolve(distStyles, "index.css");
            const sfcBundle = resolve(root, "dist/glass-ui.css");
            if (existsSync(distIndex) && existsSync(sfcBundle)) {
                const indexSrc = readFileSync(distIndex, "utf-8");
                const sfcImport = '@import "../glass-ui.css";';
                if (!indexSrc.includes(sfcImport)) {
                    const sourceAt = indexSrc.indexOf("@source");
                    const folded =
                        sourceAt === -1
                            ? `${indexSrc}\n${sfcImport}\n`
                            : `${indexSrc.slice(0, sourceAt)}/* AN.W1 — SFC scoped component CSS (folded so a single\n   @import "@mkbabb/glass-ui/styles" carries cascade + components) */\n${sfcImport}\n\n${indexSrc.slice(sourceAt)}`;
                    writeFileSync(distIndex, folded, "utf-8");
                }
            }

            // Inline every `url(... .woff2)` reference in the published
            // CSS as a base64 data URI sourced from `src/fonts/`. The
            // URL form expected here is the canonical authored shape:
            // `url("@mkbabb/glass-ui/fonts/<family>/<face>.woff2")`.
            // Resolves the relative path against `srcFonts`, encodes,
            // rewrites in place.
            if (!existsSync(distStyles)) return;
            const cssFiles = readdirSync(distStyles).filter((f) =>
                f.endsWith(".css"),
            );
            const urlRe = /url\(\s*["']?@mkbabb\/glass-ui\/fonts\/([^"')\s]+)["']?\s*\)/g;
            for (const file of cssFiles) {
                const path = resolve(distStyles, file);
                const src = readFileSync(path, "utf-8");
                let touched = false;
                const rewritten = src.replace(urlRe, (_match, rel: string) => {
                    const fontPath = resolve(srcFonts, rel);
                    if (!existsSync(fontPath)) return _match;
                    const buf = readFileSync(fontPath);
                    const b64 = buf.toString("base64");
                    touched = true;
                    return `url("data:font/woff2;base64,${b64}")`;
                });
                if (touched) writeFileSync(path, rewritten, "utf-8");
            }
        },
    };
}

export default defineConfig({
    plugins: [
        tailwindcss(),
        vue(),
        // TypeScript declarations are emitted out-of-band by the repo-native
        // `vue-tsc` (the `emit-types` script, run as the second half of
        // `build`), NOT by an in-Vite dts plugin. `vite-plugin-dts` bundled its
        // own api-extractor whose internal TypeScript pin can drift from the
        // repo's `typescript` (TS 6.x), and it dominated build time
        // (~62% of the ~2½min build). `vue-tsc --project tsconfig.build.json`
        // emits the same flat per-entry `.d.ts` set into `dist/` in ~16s with
        // no version-coupling. See `tsconfig.build.json` + `package.json` build.
        publishStyleAssets(),
    ],
    // Cross-repo dev-resolution contract-v2
    // (docs/precepts/cross-repo-dev-resolution.md §2).
    // glass-ui consumes `@mkbabb/keyframes.js`. Under contract-v2 the
    // `development` condition is abrogated fleet-wide: there is no longer a
    // `development`-branch in any `@mkbabb/*` `exports` map, so the consumer
    // half is struck too. A bare `@mkbabb/keyframes.js` specifier resolves
    // through the sibling's `exports` map to its built `dist/` via the `file:`
    // symlink in `node_modules` — `import`/`default`, the same path dev and
    // prod alike. keyframes.js's `build:watch` keeps that `dist/` fresh while
    // the demo runs (`npm run dev`). For the library `build` below keyframes.js
    // is `external` (vite.library libraryExternal) and never bundled at all.
    // The `fs.allow` widening that the `development` condition once required
    // (to reach a sibling's `src/` over the `/@fs/` channel) is gone with it —
    // `dist/` resolves inside `node_modules`, no widening needed.
    build: {
        lib: {
            entry: libraryEntries(__dirname),
            name: "GlassUI",
            fileName: libraryFileName,
            formats: ["es"],
        },
        rolldownOptions: {
            external: libraryExternal,
            output: {
                globals: libraryGlobals,
            },
        },
    },
});
