export { default as PaperGrid } from "./PaperGrid.vue";
export {
    usePaperGrid,
    type PaperGridHandle,
    type UsePaperGridOptions,
} from "./composables/usePaperGrid";
export {
    type PaperGridConfig,
    DEFAULT_PAPER_GRID_CONFIG,
    WARM_IDENTITY_INK,
    PAPER_GRID_MAX_MAJOR_EVERY,
} from "./constants";
export {
    type Vec2,
    type PaperGridSampleParams,
    potentialFBM,
    curlFBM,
    curlWarp,
    cursorBulge,
    gridCoverage,
    samplePaperGrid,
    gridScaleFor,
    CURL_EPS,
} from "./composables/paperGrid";
export type { OklchStop } from "../../../composables/color";
