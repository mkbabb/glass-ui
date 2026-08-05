/* Filled-outline notation glyphs, in staff spaces (sp), y-down, origin on the
   glyph anchor line. Clef outlines are baked from a centreline + engraving width
   profile; accidentals and flags are authored as filled subpaths (nonzero winding,
   same direction — the union is the glyph). Nothing here is a stroke: engraving
   clefs are outlines, and a stroked centreline is the failure mode this replaces.

   WINDING IS LOAD-BEARING. Every subpath of one glyph runs the same direction, so
   under `fill-rule: nonzero` the union is solid ink everywhere: a counter-directed
   subpath punches a hole exactly where the two overlap (the G-clef eye, the F-clef
   ball, every sharp/natural bar×stem crossing). `evenodd` is NOT the alternative —
   it punches the sharp's four crossings by rule. The geometry test probes interior
   winding, not extents alone.

   Anchors: G_CLEF on the G4 line · F_CLEF on the F3 line · flags on the stem tip ·
   accidentals on the pitch line. Extents are gated in
   tests/components/music-staff.geometry.test.ts — the gates, not the bytes, are
   the contract. */

/** Treble clef, anchored on the G line; the spiral eye closes on that line. */
export const G_CLEF =
    "M0.68 2.58L0.84 2.44L1 2.29L1.15 2.13L1.28 1.95L1.37 1.74L1.43 1.52L1.48 1.29L1.52 1.07L1.54 0.85L1.56 0.63L1.58 0.41L1.59 0.19L1.61 -0.03L1.62 -0.25L1.63 -0.47L1.63 -0.69L1.64 -0.91L1.64 -1.13L1.65 -1.35L1.65 -1.57L1.66 -1.79L1.66 -2.01L1.66 -2.23L1.66 -2.45L1.66 -2.67L1.65 -2.89L1.65 -3.11L1.64 -3.34L1.63 -3.56L1.6 -3.79L1.55 -4.03L1.43 -4.27L1.17 -4.39L0.91 -4.28L0.76 -4.07L0.68 -3.84L0.62 -3.62L0.59 -3.4L0.56 -3.18L0.53 -2.96L0.49 -2.74L0.45 -2.53L0.41 -2.31L0.37 -2.1L0.34 -1.88L0.3 -1.66L0.26 -1.45L0.23 -1.23L0.19 -1.02L0.15 -0.8L0.12 -0.58L0.08 -0.36L0.04 -0.14L0.02 0.08L0 0.31L0 0.55L0.02 0.78L0.07 1.03L0.17 1.27L0.32 1.48L0.53 1.64L0.76 1.74L1 1.78L1.24 1.77L1.47 1.73L1.68 1.66L1.89 1.56L2.09 1.43L2.27 1.27L2.43 1.07L2.54 0.84L2.61 0.61L2.66 0.37L2.68 0.12L2.66 -0.13L2.59 -0.37L2.48 -0.6L2.34 -0.79L2.15 -0.96L1.93 -1.06L1.71 -1.12L1.47 -1.12L1.24 -1.07L1.03 -0.96L0.86 -0.78L0.73 -0.58L0.66 -0.34L0.64 -0.09L0.69 0.16L0.81 0.38L1.01 0.53L1.27 0.58L1.51 0.47L1.67 0.2L1.54 -0.05L1.34 0.09L1.43 0.2L1.36 0.28L1.24 0.35L1.09 0.33L0.96 0.24L0.88 0.08L0.85 -0.1L0.86 -0.29L0.93 -0.47L1.03 -0.62L1.16 -0.74L1.32 -0.81L1.5 -0.85L1.67 -0.85L1.84 -0.79L1.99 -0.7L2.11 -0.58L2.2 -0.42L2.27 -0.24L2.31 -0.07L2.32 0.12L2.3 0.31L2.26 0.5L2.19 0.68L2.11 0.84L2 0.97L1.87 1.08L1.71 1.18L1.54 1.26L1.37 1.32L1.2 1.36L1.02 1.37L0.85 1.35L0.7 1.29L0.58 1.2L0.48 1.07L0.41 0.9L0.37 0.72L0.35 0.52L0.33 0.31L0.33 0.11L0.35 -0.1L0.37 -0.32L0.39 -0.54L0.42 -0.75L0.45 -0.97L0.48 -1.19L0.51 -1.4L0.54 -1.62L0.56 -1.84L0.59 -2.06L0.61 -2.28L0.63 -2.5L0.66 -2.71L0.69 -2.93L0.73 -3.15L0.76 -3.36L0.81 -3.57L0.87 -3.77L0.95 -3.95L1.05 -4.08L1.16 -4.14L1.27 -4.08L1.33 -3.94L1.37 -3.75L1.39 -3.54L1.4 -3.33L1.4 -3.11L1.4 -2.89L1.4 -2.67L1.4 -2.45L1.39 -2.24L1.39 -2.02L1.38 -1.8L1.37 -1.58L1.37 -1.36L1.36 -1.14L1.35 -0.92L1.34 -0.7L1.34 -0.48L1.33 -0.26L1.32 -0.04L1.32 0.18L1.32 0.4L1.32 0.62L1.32 0.83L1.31 1.05L1.28 1.26L1.25 1.47L1.2 1.67L1.13 1.86L1.03 2.04L0.91 2.21L0.78 2.38L0.63 2.52ZM1.33 -0.23C1.21 -0.23 1.11 -0.13 1.11 0C1.11 0.13 1.21 0.23 1.33 0.23C1.45 0.23 1.55 0.13 1.55 0C1.55 -0.13 1.45 -0.23 1.33 -0.23Z";

/** The eye of the G-clef spiral, in glyph-local sp. */
export const G_CLEF_EYE = { x: 1.33, y: 0 } as const;

/** Bass clef body, anchored on the F line; the two dots straddle it. */
export const F_CLEF =
    "M0.12 2.54L0.21 2.51L0.31 2.49L0.4 2.48L0.5 2.47L0.6 2.45L0.69 2.42L0.79 2.39L0.88 2.35L0.97 2.32L1.07 2.28L1.16 2.25L1.26 2.21L1.35 2.17L1.44 2.13L1.53 2.08L1.61 2.03L1.7 1.97L1.78 1.92L1.86 1.86L1.95 1.8L2.03 1.75L2.11 1.69L2.19 1.62L2.27 1.55L2.35 1.47L2.42 1.39L2.48 1.29L2.54 1.19L2.59 1.09L2.63 0.98L2.67 0.88L2.7 0.77L2.72 0.66L2.73 0.55L2.74 0.44L2.74 0.33L2.73 0.23L2.71 0.11L2.69 0L2.66 -0.12L2.61 -0.25L2.54 -0.38L2.45 -0.49L2.37 -0.58L2.27 -0.65L2.18 -0.73L2.07 -0.8L1.95 -0.87L1.82 -0.93L1.65 -0.98L1.46 -1L1.25 -0.97L1.08 -0.91L0.95 -0.84L0.84 -0.77L0.75 -0.7L0.66 -0.64L0.57 -0.58L0.48 -0.52L0.4 -0.46L0.32 -0.41L0.25 -0.36L0.19 -0.31L0.98 0.51L1.06 0.44L1.13 0.36L1.19 0.28L1.24 0.21L1.3 0.14L1.35 0.08L1.4 0.02L1.45 -0.04L1.5 -0.07L1.54 -0.1L1.54 -0.11L1.52 -0.12L1.52 -0.13L1.54 -0.13L1.59 -0.13L1.64 -0.11L1.7 -0.08L1.75 -0.04L1.81 0L1.86 0.03L1.9 0.06L1.93 0.09L1.96 0.13L1.99 0.18L2.01 0.25L2.03 0.31L2.04 0.39L2.05 0.46L2.05 0.54L2.06 0.61L2.06 0.68L2.05 0.76L2.04 0.83L2.03 0.9L2.01 0.97L1.98 1.03L1.94 1.09L1.9 1.15L1.85 1.21L1.8 1.28L1.75 1.35L1.7 1.41L1.64 1.48L1.57 1.54L1.51 1.61L1.44 1.67L1.37 1.72L1.3 1.77L1.23 1.82L1.15 1.88L1.08 1.93L1.01 1.99L0.93 2.04L0.85 2.09L0.77 2.14L0.69 2.18L0.61 2.22L0.52 2.26L0.44 2.3L0.35 2.35L0.27 2.4L0.18 2.45L0.1 2.48ZM0.58 -0.45C0.26 -0.45 0 -0.2 0 0.1C0 0.41 0.26 0.65 0.58 0.65C0.91 0.65 1.17 0.41 1.17 0.1C1.17 -0.2 0.91 -0.45 0.58 -0.45Z";

/** The pair of F-clef dots, in glyph-local sp. */
export const F_CLEF_DOTS = [
    { x: 3.15, y: -0.5, r: 0.24 },
    { x: 3.15, y: 0.5, r: 0.24 },
] as const;

/** Eighth flag for an up stem, anchored on the stem tip. */
export const FLAG_UP =
    "M0 0C0.86 0.52 1.18 1.32 1.03 2.14C0.94 2.7 0.74 3.02 0.56 3.2"
    + "C0.74 2.56 0.82 2.04 0.69 1.58C0.55 1.06 0.3 0.66 0 0.4Z";

/** Eighth flag for a down stem — the up flag mirrored through the stem tip. */
export const FLAG_DOWN =
    "M0 0C0.86 -0.52 1.18 -1.32 1.03 -2.14C0.94 -2.7 0.74 -3.02 0.56 -3.2"
    + "C0.74 -2.56 0.82 -2.04 0.69 -1.58C0.55 -1.06 0.3 -0.66 0 -0.4Z";

/** Flat: stem above the pitch line, bowl belly on and below it. */
const ACCIDENTAL_FLAT =
    "M0 -1.75L0.17 -1.78L0.17 0.66L0 0.7Z"
    + "M0.15 -0.45C0.55 -0.62 0.8 -0.2 0.66 0.16C0.55 0.46 0.3 0.6 0.1 0.68"
    + "C0.36 0.4 0.52 0.14 0.44 -0.08C0.38 -0.26 0.24 -0.28 0.15 -0.1Z";

/** Sharp: two stems, two oblique bars rising to the right. Bars wind with the
    stems, so a crossing is doubled ink, never a punched square. */
const ACCIDENTAL_SHARP =
    "M0.23 -1.18L0.34 -1.18L0.34 1.4L0.23 1.4Z"
    + "M0.7 -1.4L0.81 -1.4L0.81 1.18L0.7 1.18Z"
    + "M0 -0.16L0 -0.46L1.04 -0.74L1.04 -0.44Z"
    + "M0 0.62L0 0.32L1.04 0.04L1.04 0.34Z";

/** Natural: offset stems joined by two oblique bars, same winding throughout. */
const ACCIDENTAL_NATURAL =
    "M0 -1.35L0.11 -1.35L0.11 0.44L0 0.44Z"
    + "M0.52 -0.34L0.63 -0.34L0.63 1.35L0.52 1.35Z"
    + "M0 -0.34L0 -0.62L0.63 -0.8L0.63 -0.52Z"
    + "M0 0.44L0 0.16L0.63 -0.02L0.63 0.26Z";

/** Declared glyph extents in sp — the extent of the PATH DATA and nothing else,
    one meaning per row, gated against the sampled paths in tests. Detached marks
    (the F-clef dots) are advance, not path, and live in CLEF_ADVANCE below. */
export const GLYPH_EXTENT = {
    gClef: { x0: 0, x1: 2.68, y0: -4.39, y1: 2.63 },
    fClef: { x0: 0, x1: 2.74, y0: -1.05, y1: 2.54 },
    flag: { x0: 0, x1: 1.07, y0: 0, y1: 3.2 },
    flat: { x0: 0, x1: 0.7, y0: -1.78, y1: 0.7 },
    sharp: { x0: 0, x1: 1.04, y0: -1.4, y1: 1.4 },
    natural: { x0: 0, x1: 0.63, y0: -1.35, y1: 1.35 },
} as const;

/** How far right of the clef origin the whole clef reads, dots included. */
export const CLEF_ADVANCE = {
    treble: GLYPH_EXTENT.gClef.x1,
    bass: Math.max(GLYPH_EXTENT.fClef.x1, ...F_CLEF_DOTS.map((dot) => dot.x + dot.r)),
} as const;

export const ACCIDENTAL_GLYPHS = {
    flat: ACCIDENTAL_FLAT,
    sharp: ACCIDENTAL_SHARP,
    natural: ACCIDENTAL_NATURAL,
} as const;
