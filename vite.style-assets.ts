import type { Plugin } from "vite";

import {
    copyStyleAssets,
    foldSfcBundle,
    inlineFonts,
    injectWebkitBackdrop,
} from "./vite.style-fold";
import { emitComponentUtilities } from "./vite.utility-emit";
import { emitCriticalDeferredSplit } from "./vite.critical-split";

/**
 * publishStyleAssets — the post-build CSS/font publish step, shared by both
 * Vite configs (canonical + iter) so every build mode emits the same `dist/`
 * shape (AO inv β — no dist-wipe footgun: the budget gate reads what ships).
 *
 * BH.B5a-deps-currency split the former 566-line god-module into three cohesive
 * sub-plugin modules the orchestrator composes IN ORDER (byte-identical build):
 *
 *   1. `vite.style-fold.ts`     — copy src/{styles,fonts}→dist, fold the SFC
 *                                 bundle, base64-inline the fonts, inject the
 *                                 `-webkit-backdrop-filter` prefix pair.
 *   2. `vite.utility-emit.ts`   — P9: emit glass-ui's own component-utility
 *                                 RULES into dist/styles/components.css.
 *   3. `vite.critical-split.ts` — BB.W-CSS-CRITICAL: partition the /styles draw
 *                                 into critical.css + deferred.css.
 *
 * The order is load-bearing (each step's guards + the comments on the split
 * functions record why):
 *   - cpSync FIRST (creates dist/styles + dist/fonts).
 *   - SFC-fold + utility-emit BEFORE critical-split (the deferred file @imports
 *     ../glass-ui.css + components.css).
 *   - font-inline + webkit LAST (they walk every dist/styles/*.css, so they must
 *     see components.css after utility-emit writes it — a webkit decl in a
 *     component utility must get the prefix pair).
 */
export function publishStyleAssets(): Plugin {
    return {
        name: "glass-ui:publish-style-assets",
        apply: "build",
        async closeBundle() {
            const root = __dirname;

            // 1. Materialize the /styles cascade in dist + fold the SFC bundle.
            const { srcFonts, distStyles } = copyStyleAssets(root);
            foldSfcBundle(root, distStyles);

            // 2. P9 — emit glass-ui's own component-utility RULES into
            //    dist/styles/components.css and pull it into the dist cascade.
            //    Runs AFTER the SFC fold so the `@import "./components.css"` line
            //    lands after `@import "../glass-ui.css"` but still inside the
            //    leading import block. The JS build is already on disk
            //    (closeBundle), so the dist/*.js scan sees the full vocabulary.
            await emitComponentUtilities(root, distStyles);

            // 3. BB.W-CSS-CRITICAL — partition the resolved /styles draw into the
            //    CRITICAL above-the-fold subset + the DEFERRED tail. Runs AFTER
            //    the SFC-fold + utility-emit so ../glass-ui.css + components.css
            //    exist for the deferred file to @import; BEFORE the font-inline +
            //    webkit passes (no-ops on these two pure-@import files).
            emitCriticalDeferredSplit(distStyles);

            // 4. Post-process the shipped copy: base64-inline the fonts, then
            //    inject the `-webkit-backdrop-filter` prefix pair (LAST, so it
            //    covers the complete shipped cascade incl. components.css).
            inlineFonts(srcFonts, distStyles);
            injectWebkitBackdrop(distStyles);
        },
    };
}
