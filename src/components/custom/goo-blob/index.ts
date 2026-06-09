export { default as GooBlob } from "./GooBlob.vue";
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
