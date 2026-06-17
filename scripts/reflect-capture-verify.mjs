// reflect-capture-verify — the SHARED capture-rigor leaf (BB.W-GESTALT-GATE2).
//
// The single import surface for the content/dimension/viewport/freshness verify
// mechanisms the two reflection gates run:
//   - proof:live-verified-ledger  (the cardinal-lesson PROGRESS ledger gate)
//   - proof:ba-gestalt            (the holistic per-surface acceptance gate)
//
// W-GESTALT-GATE2 transposes the ledger's proven rigor (IHDR dimension read,
// fabricated-viewport reconcile, content-hash freshness) onto the gestalt gate.
// The transposition is a SHARE, NOT a second copy: the four pure verify functions
// are minted ONCE in proof-live-verified-ledger.mjs (AX.W62 → AY.W-LIVE1 →
// AZ.W-GATES D6) and RE-EXPORTED here so both gates import from one place (the
// W-CANVAS-UNIFY discipline — a second `pngDimensions`/`surfaceHash` copy is the
// exact AV.W1 two-copy class the carve waves drain, machine-barred by
// proof:ba-gestalt G3's no-re-roll clause). There is exactly ONE
// `createHash("sha256")` over surface paths in the tree (the ledger's surfaceHash).
//
// The ledger module guards its top-level run behind an `import.meta.url ===
// process.argv[1]` check, so importing it for these pure functions never runs the
// sibling gate (no console spam, no artifact write, no process.exit on import).
//
// This leaf adds ONE gestalt-only helper the ledger does NOT carry: the SYMMETRIC
// `-desktop-`-below-floor verdict (G2's desktop-fidelity arm). It is here, not in
// the ledger, so the ledger's own `viewportFidelityVerdict` call sites stay
// behaviour-identical (the ledger never gained the desktop arm).

export {
    isRealPng,
    pngDimensions,
    viewportFidelityVerdict,
    baseName,
    surfaceHash,
    freshnessVerdict,
    FABRICATED_MOBILE_WIDTH,
} from "./proof-live-verified-ledger.mjs";

// The desktop full-viewport floor: a `-desktop-` basename whose IHDR width is
// BELOW this is a non-desktop crop mislabeled desktop (the symmetric fabrication
// the gestalt gate's WEAK-2/G2 clause applies). 1280 is the CAPTURE-PROTOCOL
// desktop floor; a real desktop full-page capture is ≥ it (the BA reflect captures
// are 2880px @2× = comfortably above). It sits ABOVE FABRICATED_MOBILE_WIDTH (1000)
// so the two verdicts never overlap on a single capture.
export const DESKTOP_FULL_WIDTH = 1280;

/**
 * The GESTALT-gate fabricated-viewport verdict — the ledger's `-mobile-`-only
 * verdict PLUS the symmetric `-desktop-`-below-floor arm (G2). A `-mobile-` basename
 * with a desktop-class IHDR width REDs; a `-desktop-` basename below the desktop
 * floor REDs symmetrically. PURE over a {basename, dims} pair so the gate's self-test
 * can exercise both arms deterministically with no on-disk fixture.
 *
 * @param {string} basename
 * @param {{w:number, h:number} | null} dims
 * @param {(b:string, d:object|null)=>{ok:boolean,reason?:string}} mobileVerdict the
 *   shared `-mobile-` verdict (injected so the ledger's exported source is the ONE
 *   mobile-fidelity authority — no re-implementation of the mobile arm here).
 * @returns {{ok:true} | {ok:false, reason:string}}
 */
export function viewportFidelityVerdictBoth(basename, dims, mobileVerdict) {
    if (/-mobile-/.test(basename)) return mobileVerdict(basename, dims);
    if (/-desktop-/.test(basename)) {
        if (!dims) return { ok: true }; // unreadable IHDR ≠ fabrication; the real-PNG bar already held
        if (dims.w < DESKTOP_FULL_WIDTH)
            return {
                ok: false,
                reason: `${basename} carries the -desktop- viewport token but its IHDR is ${dims.w}×${dims.h} — below the desktop full-viewport floor (${DESKTOP_FULL_WIDTH}px) — a crop/mobile mislabeled desktop`,
            };
        return { ok: true };
    }
    return { ok: true };
}
