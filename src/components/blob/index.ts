export { default as Blob } from "./Blob.vue";
export type {
    BlobMood,
    BlobMerge,
    BlobVariant,
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
// BI.W-BLOB-SEAMS — the calibrated hero preset + the derived-palette ink-floor bracket
// (the value.js-free config leaf that also backs the `/blob/config` subpath).
export {
    BLOB_HERO,
    LIGHTNESS_FLOOR_BRACKET,
    LIGHTNESS_FLOOR_DEFAULT,
    clampLightnessFloor,
} from "./presets";
export { useBlobMood, type BlobMoodSystem } from "./composables/useBlobMood";
export { useBlobPointer, type BlobPointer } from "./composables/useBlobPointer";
export {
    useBlobSatellites,
    type BlobSatelliteSystem,
} from "./composables/useBlobSatellites";
export {
    useMetaballRenderer,
    type UseMetaballRendererOptions,
} from "./composables/useMetaballRenderer";
