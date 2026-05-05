/* @mkbabb/glass-ui — see docs/tranches/G/blob/SPEC.md */
export { default as Blob } from "./Blob.vue";
export type { BlobProps } from "./Blob.vue";

// Re-export the types + constants from composables/blob for ergonomic
// component-package imports.
export {
    BLOB_CONFIG_DEFAULTS,
    BLOB_MOOD_PARAMS,
    type BlobColorHsl,
    type BlobConfig,
    type BlobMood,
    type MetaballSource,
    type MoodParams,
    type RendererHandle,
} from "../../../composables/blob";
