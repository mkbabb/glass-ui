// BG.W-DOCK-FISSION-WIRE — the fission SIGNATURE data leaf, carved out of the
// `useDockFission` orchestrator (the F6.5 one-writer-per-concern seam + the
// no-god-module drain — useDockFission dropped under the 500-line bound). This leaf
// owns the DATA (F3, the FLOOR): the per-context goo-signature MAP, the placement
// vectors, and their supporting types. The orchestrator READS these — it never
// re-forks a per-context code path (the descriptor-driven fence). `useDockFission.ts`
// re-exports every symbol here so the public `/dock` surface is byte-identical.

// BD.W-MORPH-FIELD-WELD — the per-context gooey magnitude (`neckHold`) SOURCES from
// the SHARED `MORPH_SIGNATURES` rows — ONE waist DATA source library-wide
// (search→radialBurst, media→lateralPeel, nav→inwardMerge), not a per-fork literal.
import { MORPH_SIGNATURES } from "../../../../composables/motion/morphSignatures";

/** The three named fission CONTEXTS — each maps to a goo signature (F3). */
export type DockSplitContext = "search" | "media" | "nav";

/** The detach vector family a context selects. */
export type DockSplitVector = "radial" | "lateral" | "inward-merge";

/**
 * BD.W-DOCK-CORE (II.2 — F-1 the headline fix). The placement axis the detached
 * pieces TRAVEL ALONG to form the sibling island dock. The prior build let each
 * piece scatter on its own radial center → it read as inline jitter inside the one
 * pill, NOT a detach. A single COHERENT placement vector flies the whole piece
 * cluster off the source plate so a second dock visibly materializes beside/above/
 * below (the iOS-27 split read).
 */
export type DockSplitPlacement = "beside" | "above" | "below";

/** The unit placement vector each `splitPlacement` flies the cluster along. */
export const PLACEMENT_VECTOR: Readonly<
    Record<DockSplitPlacement, { dx: number; dy: number }>
> = {
    beside: { dx: 1, dy: 0 }, // the cluster flies to the right → island lands beside
    above: { dx: 0, dy: -1 }, // up → island above
    below: { dx: 0, dy: 1 }, // down → island below
};

/** The squish-peak register — WHEN the `useLiquidFlex` swell peaks in the travel. */
export type DockSplitSquishPeak = "late" | "long" | "coalesce";

/**
 * The per-context goo-SIGNATURE descriptor (F3 — the FLOOR, DATA not three code paths).
 * The orchestrator reads this to compute each piece's vector + stagger + neck phase; the
 * ONE `fission-bridge.css` recipe paints whatever the pieces carry.
 */
export interface DockSplitSignature {
    /** The context this signature serves. */
    context: DockSplitContext;
    /** The detach-vector family. */
    vector: DockSplitVector;
    /**
     * How long the goo neck HOLDS before it snaps (0..1 of `--split-t`). High = the
     * tense radial pop (neck holds to ~0.55 then snaps); the neck-break offset.
     */
    neckHold: number;
    /**
     * The per-piece stagger-rank resolver — returns piece `i`'s ordinal in the break
     * SEQUENCE (innermost-first for radial, outside-in for lateral). The orchestrator
     * phase-shifts each piece's `--neck-t` by `staggerStep * rank` so the N necks break
     * in sequence, never simultaneously (the `--split-stagger * rank(i)` idiom).
     */
    staggerRank: (i: number, count: number) => number;
    /** WHEN the `useLiquidFlex` squish swell peaks across the travel. */
    squishPeak: DockSplitSquishPeak;
}

/** The canonical per-context signature MAP (F3 — search/media/nav, descriptor-driven). */
export const DOCK_SPLIT_SIGNATURES: Readonly<
    Record<DockSplitContext, DockSplitSignature>
> = {
    // search = RADIAL BURST — controls fly outward like a bloom; neck NECKS LATE (the
    // tense radial pop); innermost-first (an outward ripple, not a simultaneous scatter).
    search: {
        context: "search",
        vector: "radial",
        // BD.W-MORPH-FIELD-WELD — the gooey neck-hold SOURCES from the shared weld row
        // (radialBurst — the tense radial pop). ONE waist-DATA source, not a fork literal.
        neckHold: MORPH_SIGNATURES.radialBurst.neckHold,
        staggerRank: (i, count) => {
            // innermost-first: rank by distance from the center index.
            const mid = (count - 1) / 2;
            return Math.round(Math.abs(i - mid));
        },
        squishPeak: "late",
    },
    // media = LATERAL PEEL — the now-playing center piece stays (the anchor); flanking
    // transport peels along the cross axis; LONG tapering neck tail; outside-in.
    media: {
        context: "media",
        vector: "lateral",
        // the lateral peel — the gooey neck-hold off the shared `lateralPeel` weld row.
        neckHold: MORPH_SIGNATURES.lateralPeel.neckHold,
        staggerRank: (i, count) => {
            // outside-in: the outermost piece breaks first.
            const mid = (count - 1) / 2;
            return Math.round(mid - Math.abs(i - mid));
        },
        squishPeak: "long",
    },
    // nav = INWARD MERGE — the NEGATIVE radial (inward); the bridge runs BACKWARD (the
    // merge-to-ONE generalized to N collapsing inward); `--stretch` PEAKS at coalescence.
    nav: {
        context: "nav",
        vector: "inward-merge",
        // the inward merge-to-ONE — the gooey neck-hold off the shared `inwardMerge` row.
        neckHold: MORPH_SIGNATURES.inwardMerge.neckHold,
        staggerRank: (i, count) => {
            // simultaneous-ish inward coalesce: a gentle outside-in so the rim folds in.
            const mid = (count - 1) / 2;
            return Math.round(mid - Math.abs(i - mid));
        },
        squishPeak: "coalesce",
    },
};
