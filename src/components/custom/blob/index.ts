/* @mkbabb/glass-ui — see docs/tranches/G/blob/SPEC.md */
export { default as Blob } from "./Blob.vue";
export type { BlobProps } from "./Blob.vue";

// Re-export the types + constants from composables/blob for ergonomic
// component-package imports. Mood-internal exports (`BLOB_MOOD_PARAMS`,
// `MoodParams`) are private under `composables/blob/_internal/`.
export {
    BLOB_CONFIG_DEFAULTS,
    type BlobColorHsl,
    type BlobConfig,
    type BlobMood,
    type MetaballSource,
    type RendererHandle,
} from "../../../composables/blob";
