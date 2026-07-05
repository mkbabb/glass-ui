// scripts/lib/detect/index.mjs — the detector-kit barrel (BG.W-GATE-FAMILY-CONSOLIDATE, F8.1).
//
// The shared, PURE detection primitives a family gate composes instead of
// re-deriving. The 360→~40-60 family-table consolidation rests on this kit: a
// per-band category gate (proof:{glass,motion,dock,paper,feedback}-band) reads
// its source through ONE comment-strip + ONE table parser + ONE wave-id
// classifier, so the positional-coupling / re-derived-strip drift classes cannot
// re-enter per gate. Every export is fs-free + argv-free → self-testable in a
// gate's `--self-test` over synthetic input.
//
// Registered members (the kit roster proof:meta `gate-family-consolidate`
// asserts on disk):
//   - comment-strip.mjs : stripComments (URL-safe regex) · stripJs (line-machine)
//   - markdown-table.mjs: rowCells · isSeparatorRow · findHeaderColumns · isHeaderRow
//   - wave-id.mjs       : isWaveId · isVisualClass

export { stripComments, stripJs } from "./comment-strip.mjs";
export {
    rowCells,
    isSeparatorRow,
    findHeaderColumns,
    isHeaderRow,
} from "./markdown-table.mjs";
export { isWaveId, isVisualClass } from "./wave-id.mjs";

/** The kit roster — the module → named-exports map the consolidation gate probes on disk. */
export const DETECT_KIT_ROSTER = Object.freeze({
    "comment-strip.mjs": ["stripComments", "stripJs"],
    "markdown-table.mjs": ["rowCells", "isSeparatorRow", "findHeaderColumns", "isHeaderRow"],
    "wave-id.mjs": ["isWaveId", "isVisualClass"],
});
