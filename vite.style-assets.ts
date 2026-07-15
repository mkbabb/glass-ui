import type { Plugin } from "vite";

import {
    copyStyleAssets,
    foldSfcBundle,
    inlineFonts,
    injectWebkitBackdrop,
    minifyStyleAssets,
} from "./vite.style-fold";
import { emitComponentUtilities } from "./vite.utility-emit";

/**
 * publishStyleAssets — the post-build CSS/font publish step, shared by both
 * Vite configs (canonical + iter) so every build mode emits the same `dist/`
 * shape (AO inv β — no dist-wipe footgun: the budget gate reads what ships).
 *
 * BH.B5a-deps-currency split the former 566-line god-module into cohesive
 * sub-plugin modules the orchestrator composes IN ORDER (byte-identical build):
 *
 *   1. `vite.style-fold.ts`     — copy src/{styles,fonts}→dist, fold the SFC
 *                                 bundle, base64-inline the fonts, inject the
 *                                 `-webkit-backdrop-filter` prefix pair, then
 *                                 minify the shipped cascade LAST.
 *   2. `vite.utility-emit.ts`   — P9: emit glass-ui's own component-utility
 *                                 RULES into dist/styles/components.css.
 *
 * The order is load-bearing (each step's guards + the comments on the fold
 * functions record why):
 *   - cpSync FIRST (creates dist/styles + dist/fonts).
 *   - SFC-fold + utility-emit BEFORE the post-process passes.
 *   - font-inline + webkit before minify (they walk every dist/styles/*.css and
 *     the webkit regex reads newline/`;` boundaries; a component-utility webkit
 *     decl must get its prefix pair, so utility-emit precedes them).
 *   - minify LAST (BG.W-CSS-MINIFY / F8.4 — strips comments + collapses
 *     whitespace across the COMPLETE shipped cascade). The BB.W-CSS-CRITICAL
 *     critical/deferred split retired here: after minify the ~13KB saving on
 *     ~35KB gz was not worth a wave + gate + manifest + two exports; the
 *     `./styles` union stays the one byte-complete entry.
 */
export function publishStyleAssets(): Plugin {
    return {
        name: "glass-ui:publish-style-assets",
        apply: "build",
        async closeBundle() {
            const root = __dirname;

            // 1. Materialize the /styles cascade in dist + fold the SFC bundle.
            const { srcFonts, distStyles, distComponents } = copyStyleAssets(root);
            foldSfcBundle(root, distStyles);

            // 2. P9 — emit glass-ui's own component-utility RULES into
            //    dist/styles/components.css and pull it into the dist cascade.
            //    Runs AFTER the SFC fold so the `@import "./components.css"` line
            //    lands after `@import "../glass-ui.css"` but still inside the
            //    leading import block. The JS build is already on disk
            //    (closeBundle), so the dist/*.js scan sees the full vocabulary.
            await emitComponentUtilities(root, distStyles);

            // 3. Post-process the shipped copy: base64-inline the fonts, then
            //    inject the `-webkit-backdrop-filter` prefix pair (covers the
            //    complete shipped cascade incl. components.css).
            inlineFonts(srcFonts, distStyles, distComponents);
            injectWebkitBackdrop(distStyles, distComponents);

            // 4. BG.W-CSS-MINIFY (F8.4) — minify the shipped cascade LAST (strip
            //    comments + collapse whitespace, string-safe). Runs after every
            //    other pass so it minifies the COMPLETE dist/styles/**/*.css set
            //    (incl. components.css + the webkit pairs); src/styles KEEP their
            //    comments (publish-time only).
            minifyStyleAssets(distStyles, distComponents);
        },
    };
}
