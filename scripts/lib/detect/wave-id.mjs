// scripts/lib/detect/wave-id.mjs — the ONE wave-id + paint-class detectors.
//
// BG.W-GATE-FAMILY-CONSOLIDATE (F8.1). The BG/BH wave-id shape and the "is this
// row VISUAL (carries a standalone paint `P` token)" class predicate were
// inlined in proof-meta (the fable-arm scan) and belong to any gate reading the
// §1 MASTER TABLE. Pure → self-testable.

/** A cell is a real BG/BH wave id (skips legend/prose/§1b/§2 rows). */
export function isWaveId(cell) {
    return /^B[GH]\.[WB]/.test(cell);
}

/**
 * A `class` cell is VISUAL iff it carries a standalone paint `P` token — `P` /
 * `H/P` / `P (cond)`; a bare `H` / `H→ci` is NOT visual. Matched on a
 * non-alpha boundary so `PENDING` never false-triggers.
 */
export function isVisualClass(cls) {
    return /(^|[^A-Za-z])P([^A-Za-z]|$)/.test(cls);
}
