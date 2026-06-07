export {
    useGlassRenderer,
    createGlassFilter,
    destroyGlassFilter,
    type GlassTier,
    type GlassFilterState,
    type UseGlassRendererReturn,
} from "./useGlassRenderer";

// AW.W17 — the Canvas2D lifecycle substrate (park/freeze/dispose parallel to
// the WebGL substrate). The Constellation lattice composes it.
export { createCanvas2D } from "./canvas2d";
export type {
    Canvas2DFrame,
    Canvas2DHandle,
    Canvas2DOptions,
    Canvas2DSuspendReason,
} from "./canvas2d";
