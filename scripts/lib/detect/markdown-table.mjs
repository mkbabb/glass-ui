// scripts/lib/detect/markdown-table.mjs — the ONE markdown pipe-table parser.
//
// BG.W-GATE-FAMILY-CONSOLIDATE (F8.1). The by-HEADER-NAME table parser
// (BB.W-LEDGER-REPAIR — column order is FREE) was re-implemented in every
// table-reading gate: proof-meta, proof-live-verified-ledger, proof-ba-gestalt,
// proof-be-bf-ledger, proof-selection-card, proof-visual-reconcile. The
// positional-coupling class it exists to kill (a re-ordered column silently
// parsing 0 rows + greening vacuously) recurs precisely because each gate
// re-derives it. This is the single home. Pure (no fs, no argv) → self-testable.

/**
 * Split a pipe-row into trimmed inner cells (drop the outer-pipe empties). An
 * escaped `\|` is a LITERAL pipe inside a cell, not a delimiter.
 * @param {string} ln a `| … | … |` markdown row
 * @returns {string[]}
 */
export function rowCells(ln) {
    const cells = ln.split(/(?<!\\)\|/).map((c) => c.replace(/\\\|/g, "|").trim());
    return cells.filter((_, idx) => idx > 0 && idx < cells.length - 1);
}

/**
 * A markdown separator row (`|---|:--:|`) carries only dashes/colons.
 * @param {string[]} cells
 * @returns {boolean}
 */
export function isSeparatorRow(cells) {
    return cells.length > 0 && cells.every((c) => /^:?-+:?$/.test(c));
}

/**
 * Locate columns BY HEADER NAME. Given a header row's cells and a spec mapping
 * output keys → a predicate (a string prefix-match, a RegExp, or a function),
 * returns `{ key: index }` for every matched header, or `null` when any
 * REQUIRED key is unmatched (the fail-loud-on-no-header discipline).
 *
 * @param {string[]} headerCells the header row's cells (lower-cased internally)
 * @param {Record<string,(string|RegExp|((c:string)=>boolean))>} spec
 * @param {{required?: string[]}} [opts] keys that MUST match (default: all)
 * @returns {Record<string,number>|null}
 */
export function findHeaderColumns(headerCells, spec, opts = {}) {
    const lower = headerCells.map((c) => c.toLowerCase());
    const required = opts.required ?? Object.keys(spec);
    const cols = {};
    for (const [key, pred] of Object.entries(spec)) {
        const test =
            typeof pred === "function"
                ? pred
                : pred instanceof RegExp
                  ? (c) => pred.test(c)
                  : (c) => c === pred || c.startsWith(pred);
        const idx = lower.findIndex((c) => test(c));
        if (idx !== -1) cols[key] = idx;
    }
    for (const key of required) {
        if (!(key in cols)) return null;
    }
    return cols;
}

/** A header-shaped row carries a `wave` header cell (the re-anchor signal). */
export function isHeaderRow(cells) {
    return cells.map((c) => c.toLowerCase()).includes("wave");
}
