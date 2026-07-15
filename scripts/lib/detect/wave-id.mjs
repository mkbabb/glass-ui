// Pure wave-id and paint-class detectors for descriptive formation tables.

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
