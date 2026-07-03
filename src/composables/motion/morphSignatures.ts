// BG.W-DEAD-COMPOSABLE-CUT — the morph SIGNATURE DATA, gutted out of the deleted
// `useMorphField()` weld (which had ZERO callers — the weld body was dead; only its
// SIGNATURE map was live). The DATA is what distinguishes the morphs; the weld JS +
// its `morph-field.css` recipe are DEFINITION-ABSENT.
//
// THE SIGNATURE is DATA, not code paths. `MORPH_SIGNATURES` is a motion-named map
// (lateralNeck / lateralPeel / radialBurst / inwardMerge / axialNeck / collapse /
// directed) — never an app name (the dock-hub law). The consumers read a row off it:
//   • `useGooMorph` (the goo-morph worm engine) reads `lateralNeck`;
//   • `dockFissionSignatures` reads `radialBurst`/`lateralPeel`/`inwardMerge`.
// ONE waist-DATA source library-wide.

/** The five motion VECTORS a signature selects (geometry/motion, never an app name). */
export type MorphVector = "lateral" | "radial" | "inward" | "axial" | "directed";

/**
 * The motion SIGNATURE — DATA, the only thing that distinguishes the morphs. `vector`
 * picks the geometry; `kRest`/`kPeak` are gap-FRACTIONS (not px) the threshold band
 * scales by; `neckHold` is how long the neck holds before it pinches; `maxStretch` the
 * LOW squish cap (the anti-taffy fence).
 */
export interface MorphSignature {
    vector: MorphVector;
    /** The neck-gap fraction at REST (bodies apart) — the threshold band floor. */
    kRest: number;
    /** The neck-gap fraction at the PEAK (bodies near, the gooey waist) — the band ceiling. */
    kPeak: number;
    /** How long (0..1 of t) the neck HOLDS its girth before it pinches (the tense pop). */
    neckHold: number;
    /** The LOW on-axis squish cap (≤~1.14 — the loud register lives in NECK girth, not body taffy). */
    maxStretch: number;
}

/**
 * The canonical, motion-named SIGNATURE map (DATA — the FLOOR). Every consumer reads a
 * `MorphSignatureName` row. NO app names, NO three code paths.
 */
export const MORPH_SIGNATURES = {
    /** carousel / deck / pager goo: two equal beads bud apart, a concave neck wells, the
     *  filter merges them into one barbell with a thin pinched waist, then they coalesce. */
    lateralNeck: {
        vector: "lateral",
        kRest: 0.92,
        kPeak: 0.34,
        neckHold: 0.5,
        maxStretch: 1.12,
    },
    /** dock fission media: the now-playing anchor stays; flanking transport PEELS along
     *  the cross axis with a long tapering neck tail. */
    lateralPeel: {
        vector: "lateral",
        kRest: 0.88,
        kPeak: 0.4,
        neckHold: 0.4,
        maxStretch: 1.08,
    },
    /** dock fission search: controls fly outward like a bloom; the neck NECKS LATE (the
     *  tense radial pop), innermost-first — an outward ripple, not a simultaneous scatter. */
    radialBurst: {
        vector: "radial",
        kRest: 0.85,
        kPeak: 0.3,
        neckHold: 0.55,
        maxStretch: 1.08,
    },
    /** dock fission nav: the negative radial — N masses collapse INWARD to ONE; the bridge
     *  runs backward; --stretch peaks at coalescence. */
    inwardMerge: {
        vector: "inward",
        kRest: 0.8,
        kPeak: 0.28,
        neckHold: 0.35,
        maxStretch: 1.1,
    },
    /** dock V↔H: column-mass + row-mass are two distributions in ONE topology-free field;
     *  a gooey teardrop LOBS column→row through the midpoint (no crossfade dodge). */
    axialNeck: {
        vector: "axial",
        kRest: 0.9,
        kPeak: 0.36,
        neckHold: 0.5,
        maxStretch: 1.14,
    },
    /** dock collapse: the DEGENERATE 1-body field — a single mass squishes between two
     *  footprints (no waist, Tier-C). The ratio-free convex blend. */
    collapse: {
        vector: "axial",
        kRest: 1,
        kPeak: 1,
        neckHold: 0,
        maxStretch: 1.14,
    },
    /** drag morph: a grabbed rect → drop rect, an optional directed neck. */
    directed: {
        vector: "directed",
        kRest: 0.9,
        kPeak: 0.42,
        neckHold: 0.45,
        maxStretch: 1.1,
    },
} as const satisfies Record<string, MorphSignature>;

export type MorphSignatureName = keyof typeof MORPH_SIGNATURES;
