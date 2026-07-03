import { existsSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

import {
    CRITICAL_PARTIALS,
    DEFERRED_PARTIALS,
    DEFERRED_FOLDS,
    DEFERRED_SOURCE_DIRECTIVE,
} from "./src/styles/critical-partition.mjs";

/**
 * vite.critical-split — the CRITICAL-SPLIT sub-plugin of publishStyleAssets
 * (BH.B5a-deps-currency god-module carve). Partitions the resolved `/styles`
 * draw into a small CRITICAL above-the-fold subset (`dist/styles/critical.css`,
 * render-blocking-early) + a DEFERRED below-the-fold tail
 * (`dist/styles/deferred.css`, loaded non-blocking) off the CRITICAL_PARTITION
 * boundary manifest (BB.W-CSS-CRITICAL).
 *
 * The two emitted files each `@import` their bucket's partials in the SAME
 * cascade order the monolith `index.css` declares (load order is load-bearing),
 * so a consumer loading critical-early + deferred-non-blocking gets the exact
 * cascade the union `./styles` resolves. The build-time folds (the SFC scoped
 * payload `../glass-ui.css` + the `components.css` utility surface) + the
 * `@source` content-scan backstop ride DEFERRED — they decorate components that
 * mount after first paint, never the above-the-fold chrome.
 *
 * The union is BYTE-COMPLETE: critical.css's @imports ∪ deferred.css's @imports
 * ≡ the monolith index.css's resolved-draw partial set (every partial + fold in
 * EXACTLY ONE bucket — the W2 partition floor `proof:css-critical` asserts; a
 * fold leaking into critical fails W2 AND the W3 ceiling). The `./styles` union
 * entry (dist/styles/index.css) is UNTOUCHED — this emit only ADDS two sibling
 * files.
 *
 * Runs AFTER the SFC-fold + emitComponentUtilities so `../glass-ui.css` +
 * `components.css` exist for the deferred file to reference, and BEFORE the
 * font-inline + webkit passes (which read every dist/styles/*.css — they are
 * no-ops on these two pure-@import files, which carry no font url() or
 * backdrop-filter declaration directly; their referenced partials carry those
 * and are processed in place).
 */
export function emitCriticalDeferredSplit(distStyles: string): void {
    if (!existsSync(distStyles)) return;

    const buildSubset = (
        label: "CRITICAL" | "DEFERRED",
        partials: readonly string[],
        folds: readonly string[],
        sourceDirective: string | null,
    ): string => {
        const header =
            `/* BB.W-CSS-CRITICAL — the ${label} /styles subset (off\n` +
            "   src/styles/critical-partition.mjs CRITICAL_PARTITION; do not\n" +
            "   hand-edit — the manifest is the SOLE partition source). Each\n" +
            "   @import is a whole cascade partial in the monolith's declared\n" +
            "   load order; critical ∪ deferred is byte-complete. */\n";
        const partialImports = partials
            .map((p) => `@import "./${p}";`)
            .join("\n");
        const foldImports = folds.map((f) => `@import "${f}";`).join("\n");
        const blocks = [header, partialImports, foldImports]
            .filter((b) => b.length > 0)
            .join("\n");
        return sourceDirective
            ? `${blocks}\n\n${sourceDirective}\n`
            : `${blocks}\n`;
    };

    writeFileSync(
        resolve(distStyles, "critical.css"),
        // CRITICAL carries no fold + no @source (those backstop the deferred
        // component utilities) — it is the pure above-the-fold token/ladder/type
        // surface, render-blocking-early.
        buildSubset("CRITICAL", CRITICAL_PARTIALS, [], null),
        "utf-8",
    );
    writeFileSync(
        resolve(distStyles, "deferred.css"),
        // DEFERRED carries the component partials + the SFC-fold +
        // components.css + the @source backstop — the below-the-fold/late-mount
        // tail, loaded non-blocking after first paint.
        buildSubset(
            "DEFERRED",
            DEFERRED_PARTIALS,
            DEFERRED_FOLDS,
            DEFERRED_SOURCE_DIRECTIVE,
        ),
        "utf-8",
    );
}
