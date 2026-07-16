// @mkbabb/glass-ui/blob-config — the value.js-FREE blob CONFIG surface
// (BI.W-BLOB-SEAMS, RP-2 / L20 — the eager-budget win).
//
// A consumer that needs ONLY the blob config SHAPE (the `BlobConfig` types, the
// config defaults + inject key, the calibrated hero preset + the derived-palette
// ink-floor bracket) imports HERE instead of the `/blob` component subpath. The
// component subpath (`Blob.vue` + the renderer/mood/pointer/satellite composables +
// the metaball shaders) statically reaches the value.js `/color` OKLCh graph on its
// FIRST-PAINT critical path; this config leaf re-exports only `types.ts` + `presets.ts`
// (both value.js-FREE), so a config-only consumer never drags the ~33 KiB value.js
// eager weight through the same dynamic-leaf discipline used elsewhere.
//
// The `/blob` barrel STILL re-exports every symbol here (the union stays whole); this
// is the narrower value.js-free door, not a fork.
export type {
    BlobMood,
    BlobMerge,
    BlobQuality,
    MoodParams,
    MetaballSource,
    BlobConfig,
    BlobGeometry,
    BlobSatelliteTiming,
    BlobMembrane,
    BlobColor,
    BlobSurface,
    BlobInteraction,
    SatellitePhase,
    SatelliteInternal,
} from "./types";
export { BLOB_CONFIG_DEFAULTS, BLOB_CONFIG_KEY } from "./types";
export {
    BLOB_HERO,
    LIGHTNESS_FLOOR_BRACKET,
    LIGHTNESS_FLOOR_DEFAULT,
    clampLightnessFloor,
} from "./presets";
