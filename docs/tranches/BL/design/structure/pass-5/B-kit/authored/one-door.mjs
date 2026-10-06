// authored/one-door.mjs — AUTHORED input to derive/edits.mjs (step B-S8, LAW §5, clause B9).
//
// R-6 as amended by P3-R4: one symbol, one door. The gate measures 40 names on two entries
// and 5 entry lines that re-export outside their module; this row cures 38 + 3 of them.
// Each name keeps the entry that owns its origin, and where two entries of one module both
// publish it, the lighter door keeps it (P3-R4's config-door reasoning):
//   ./blob-config  keeps the 20 blob configuration names   ./blob drops them
//   ./motion-core  keeps DAMPING, SNAP_THRESHOLD, FRAME_MS   ./motion drops them
//   ./fourier-math keeps the 8 math names                   ./fourier-field drops them
//   ./color        keeps the 4 colour names                 ./aurora drops them
//   ./motion       keeps useDockCtaReceive and its 3 types   ./dock drops them
//   ./axes         keeps SurfaceTier                        ./surface drops it
// Every consumer in the tree is re-pointed (11 sites), the surface spec's rows follow, and
// MIGRATION.md gets one removal row per name (first cell the name, E-6). Two entry lines
// stay open for a ruling (B-proto.md §B9): ./command publishes 7 types from
// _shared/selection.ts and ./input publishes ControlSize from _shared/control.ts; no kernel
// entry holds either file, so a drop would take the names off the surface altogether.

export const why = "B9 (R-6, P3-R4): one symbol, one door. 40 names leave their second entry; consumers re-pointed; a MIGRATION row per name";

const BLOB = ["BlobMood", "BlobMerge", "BlobQuality", "MoodParams", "MetaballSource", "BlobConfig", "BlobGeometry", "BlobSatelliteTiming", "BlobMembrane", "BlobColor", "BlobSurface", "BlobInteraction", "SatellitePhase", "SatelliteInternal", "BLOB_CONFIG_DEFAULTS", "BLOB_CONFIG_KEY", "BLOB_HERO", "LIGHTNESS_FLOOR_BRACKET", "LIGHTNESS_FLOOR_DEFAULT", "clampLightnessFloor"];
const FOURIER = ["dftFromPoints", "partialSumAt", "positionsAt", "makeEllipticSpectrum", "makeHarmonicFigure", "FOURIER_FIGURES", "FOURIER_FIGURE_KEYS", "BasisComponent"];
const rows = [
    ...BLOB.map((n) => [n, "blob", "blob-config"]),
    ...["DAMPING", "SNAP_THRESHOLD", "FRAME_MS"].map((n) => [n, "motion", "motion-core"]),
    ...FOURIER.map((n) => [n, "fourier-field", "fourier-math"]),
    ...["cssToOklch", "oklchStopToHex", "oklchToLinear", "OklchStop"].map((n) => [n, "aurora", "color"]),
    ...["useDockCtaReceive", "UseDockCtaReceiveOptions", "UseDockCtaReceiveReturn", "DockCtaReceivePreset"].map((n) => [n, "dock", "motion"]),
    ["SurfaceTier", "surface", "axes"],
];
const MIGRATION_SECTION = `## UNRELEASED — the structure cut (BL)

_One symbol, one entry_

A name that two entries published now ships from one. Where one module has two entries,
the lighter one keeps the name, so a consumer that wants only the configuration or the
maths does not pull the component. Re-point the import; nothing else changes.

| Name | Leaves | Import it from |
| --- | --- | --- |
${rows.map(([n, from, to]) => `| \`${n}\` | \`@mkbabb/glass-ui/${from}\` | \`@mkbabb/glass-ui/${to}\` |`).join("\n")}

`;

export const edits = [
    // ── the doors ──────────────────────────────────────────────────────────────────────
    {
        file: "src/components/blob/index.ts",
        why: "./blob-config owns the configuration names (P3-R4)",
        from: "export type {\n    BlobMood,\n",
        until: `} from "./presets";\n`,
        to: "",
    },
    {
        file: "src/components/blob/config.ts",
        why: "the config door's header named the dual path",
        from: "// The `/blob` barrel STILL re-exports every symbol here (the union stays whole); this\n// is the narrower value.js-free door, not a fork.\n",
        to: "// These names ship here alone; `/blob` publishes the component and its composables.\n",
    },
    {
        file: "src/composables/motion/index.ts",
        why: "./motion-core owns the constants",
        from: "// `constants` stays on this public surface too",
        until: `export { DAMPING, SNAP_THRESHOLD, FRAME_MS } from "./core";\n`,
        to: "// `constants` (DAMPING, SNAP_THRESHOLD, FRAME_MS) ships on `/motion-core` alone; the\n// bearing leaves read it from its `core/` owner.\n//\n// No back-compat aliases: each free leaf and `installDarkModeSync` ships from\n// exactly ONE entry.\n",
    },
    {
        file: "src/components/dock/index.ts",
        why: "./motion owns the CTA-receive seam",
        from: "// The CTA-receive seat lives beside",
        until: `} from "../../composables/motion";\n`,
        to: "// The CTA-receive seam (`useDockCtaReceive`) ships on `/motion`, its home.\n",
    },
    {
        file: "src/components/surface/index.ts",
        why: "./axes owns SurfaceTier",
        from: `export type { SurfaceTier } from "../_shared/axes";\n`,
        to: "",
    },
    {
        file: "src/components/aurora/index.ts",
        why: "./color owns OklchStop",
        from: "    type OklchStop,\n",
        to: "",
    },
    {
        file: "src/components/aurora/index.ts",
        why: "./color owns the colour primitives",
        from: "// The shared color primitives ship from their OWN home;",
        until: `} from "../../composables/color";\n`,
        to: "",
    },
    {
        file: "src/components/fourier-field/index.ts",
        why: "./fourier-math owns the maths",
        from: "export {\n    dftFromPoints,\n",
        until: `} from "./math";\n`,
        to: "",
    },

    // ── the consumers ──────────────────────────────────────────────────────────────────
    {
        file: "src/components/handmark/HandMark.vue",
        why: "FRAME_MS from its one entry",
        from: `import { FRAME_MS } from "../../composables/motion";`,
        to: `import { FRAME_MS } from "../../composables/motion/motion-core";`,
    },
    {
        file: "demo/chassis/landing/vizPreviewStill.ts",
        why: "the maths from ./fourier-math",
        from: `import { makeHarmonicFigure, positionsAt } from "@glass/components/fourier-field";`,
        to: `import { makeHarmonicFigure, positionsAt } from "@glass/components/fourier-field/math";`,
    },
    {
        file: "demo/stories/display/surface.vue",
        why: "SurfaceTier from ./axes",
        from: `    type SurfaceTier,\n} from "@glass/components/surface";\n`,
        to: `} from "@glass/components/surface";\nimport type { SurfaceTier } from "@glass/components/_shared/axes";\n`,
    },
    {
        file: "demo/stories/substrates/aurora/OklchStopRow.vue",
        why: "the colour names from ./color",
        from: `import { hexToOklchStop, oklchStopToHex, type OklchStop } from "@glass/components/aurora";`,
        to: `import { hexToOklchStop } from "@glass/components/aurora";\nimport { oklchStopToHex, type OklchStop } from "@glass/composables/color";`,
    },
    {
        file: "demo/stories/substrates/aurora/config/usePaletteStops.ts",
        why: "OklchStop from ./color",
        from: `import type { AuroraConfig, OklchStop } from "@glass/components/aurora";`,
        to: `import type { AuroraConfig } from "@glass/components/aurora";\nimport type { OklchStop } from "@glass/composables/color";`,
    },
    {
        file: "demo/stories/substrates/aurora/sections/AuroraColorSection.vue",
        why: "oklchStopToHex from ./color",
        from: `    deriveAurora,\n    oklchStopToHex,\n} from "@glass/components/aurora";\n`,
        to: `    deriveAurora,\n} from "@glass/components/aurora";\nimport { oklchStopToHex } from "@glass/composables/color";\n`,
    },
    {
        file: "demo/stories/substrates/blob.vue",
        why: "the config types from ./blob-config",
        from: `import type { BlobConfig, BlobMood, BlobMerge } from "@glass/components/blob";`,
        to: `import type { BlobConfig, BlobMood, BlobMerge } from "@glass/components/blob/config";`,
    },
    {
        file: "demo/stories/substrates/fourier-field.vue",
        why: "the maths from ./fourier-math",
        from: `import {
    FourierField,
    makeEllipticSpectrum,
    makeHarmonicFigure,
    mintSpectrum,
    FOURIER_FIGURES,
    FOURIER_FIGURE_KEYS,
    DEFAULT_FOURIER_CONFIG,
`,
        to: `import {
    makeEllipticSpectrum,
    makeHarmonicFigure,
    FOURIER_FIGURES,
    FOURIER_FIGURE_KEYS,
} from "@glass/components/fourier-field/math";
import {
    FourierField,
    mintSpectrum,
    DEFAULT_FOURIER_CONFIG,
`,
    },
    {
        file: "demo/stories/substrates/fourier-field/fourier-paths.ts",
        why: "the maths from ./fourier-math",
        from: `} from "@glass/components/fourier-field";\nimport { fGlyphPoints }`,
        to: `} from "@glass/components/fourier-field/math";\nimport { fGlyphPoints }`,
    },
    {
        file: "tests/components/fourier-field/FourierField.smoke.test.ts",
        why: "the maths from ./fourier-math, which the suite already reads",
        from: `import { dftFromPoints, makeEllipticSpectrum, positionsAt } from "@mkbabb/glass-ui/fourier-math";
import {
    DEFAULT_FOURIER_CONFIG,
    FourierField,
    FOURIER_FIGURES,
    makeHarmonicFigure,
    mintSpectrum,
`,
        to: `import {
    dftFromPoints,
    FOURIER_FIGURES,
    makeEllipticSpectrum,
    makeHarmonicFigure,
    positionsAt,
} from "@mkbabb/glass-ui/fourier-math";
import {
    DEFAULT_FOURIER_CONFIG,
    FourierField,
    mintSpectrum,
`,
    },
    {
        file: "tests/composables/useAnimatedNumber.test.ts",
        why: "the constants from ./motion-core",
        from: `import { DAMPING, SNAP_THRESHOLD, useAnimatedNumber } from "@glass/composables/motion";`,
        to: `import { useAnimatedNumber } from "@glass/composables/motion";\nimport { DAMPING, SNAP_THRESHOLD } from "@glass/composables/motion/motion-core";`,
    },

    // ── the surface spec's rows ─────────────────────────────────────────────────────────
    {
        file: "tests/public-surface.spec.ts",
        why: "the constants ship on /motion-core alone",
        from: "    // `constants` (DAMPING/SNAP_THRESHOLD) is duplicate-exported on both.\n",
        to: "    // `constants` (DAMPING/SNAP_THRESHOLD/FRAME_MS) ships here alone (R-6).\n",
    },
    {
        file: "tests/public-surface.spec.ts",
        why: "/motion no longer publishes the constants",
        from: `    { subpath: "motion", surface: Motion, name: "DAMPING" },\n    { subpath: "motion", surface: Motion, name: "SNAP_THRESHOLD" },\n`,
        to: "",
    },
    {
        file: "tests/public-surface.spec.ts",
        why: "/dock no longer publishes the CTA-receive seam",
        from: `            // The external-CTA-morphs-into-dock receive seam\n            // (the /motion export STAYS — a re-export, not a move).\n            "useDockCtaReceive",\n`,
        to: "",
    },

    // ── the migration guide ─────────────────────────────────────────────────────────────
    {
        file: "MIGRATION.md",
        why: "E-6: a removal row per name, first cell the name",
        from: "## 10.0.0 — ~~UNRELEASED~~",
        to: `${MIGRATION_SECTION}## 10.0.0 — ~~UNRELEASED~~`,
    },
];
