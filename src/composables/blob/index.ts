// Public barrel for the Blob composable family. Mood / pointer / satellites /
// facade composables (`useBlobMood`, `useBlobPointer`, `useBlobSatellites`,
// `useBlob`, `useWatercolorBlob`) join this barrel in Wβ1 Lane II / III.

export { useMetaballRenderer } from "./useMetaballRenderer";
export {
    BLOB_CONFIG_DEFAULTS,
    type BlobColorHsl,
    type BlobConfig,
    type BlobMood,
    type MetaballSource,
    type RendererHandle,
} from "./types";

export { BLOB_MOOD_PARAMS, useBlobMood, type MoodParams } from "./useBlobMood";
export { useBlobPointer, type PointerState } from "./useBlobPointer";
export { useBlobSatellites } from "./useBlobSatellites";

export {
    useWatercolorBlob,
    type UseWatercolorBlobOptions,
} from "./useWatercolorBlob";
export {
    useBlob,
    type UseBlobProps,
    type UseBlobReturn,
} from "./useBlob";
