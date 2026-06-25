export { default as GooDotMatrix } from "./GooDotMatrix.vue";
export {
    useGooDotMatrix,
    type GooDotMatrixHandle,
    type UseGooDotMatrixOptions,
} from "./composables/useGooDotMatrix";
export {
    type GooDotConfig,
    type GooDotVariant,
    type GooDotPointerMode,
    type GooDotFieldGround,
    DEFAULT_GOO_DOT_CONFIG,
    WARM_IDENTITY_PALETTE,
    MIN_DOT_PIXEL_SIZE,
} from "./constants";
export {
    gridOrigin,
    latticeInstanceCount,
    fibonacciDot,
    type Vec2,
    type Vec3,
} from "./composables/gooDotLattice";
export type { OklchStop } from "../../../composables/color";
