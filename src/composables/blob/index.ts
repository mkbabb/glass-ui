// Public barrel for the Blob composable family. The mood / pointer / satellites
// / metaball-renderer sub-composables are package-private under `./_internal/`;
// only the facades (`useBlob`, `useWatercolorBlob`) and the shared types ship
// as public surface.

export {
    BLOB_CONFIG_DEFAULTS,
    type BlobColorHsl,
    type BlobConfig,
    type BlobMood,
    type MetaballSource,
    type RendererHandle,
} from "./types";

export {
    useWatercolorBlob,
    type UseWatercolorBlobOptions,
} from "./useWatercolorBlob";
export {
    useBlob,
    type UseBlobProps,
    type UseBlobReturn,
} from "./useBlob";
