export { default as DotMatrix } from "./DotMatrix.vue";
export {
    useDotMatrix,
    type DotMatrixHandle,
    type UseDotMatrixOptions,
} from "./composables/useDotMatrix";
export {
    type DotMatrixConfig,
    type DotPointerMode,
    DEFAULT_DOT_MATRIX_CONFIG,
    WARM_IDENTITY_PALETTE,
    MAX_DOTS,
    MAX_DOT_STOPS,
} from "./constants";
export {
    type Vec3,
    type Mat3,
    type FacingFade,
    fibonacciDot,
    facingFade,
    spinMatrix,
    applyMat3,
    breathRadius,
    GOLDEN_RATIO,
    GOLDEN_ANGLE,
    FACING_LO,
    FACING_HI,
    SIZE_TAPER_BASE,
    SIZE_TAPER_GAIN,
} from "./composables/dotMatrixField";
export type { OklchStop } from "../../../composables/color";
