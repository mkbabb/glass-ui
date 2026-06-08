export {
    useGlassRenderer,
    createGlassFilter,
    destroyGlassFilter,
    type GlassTier,
    type GlassFilterState,
    type UseGlassRendererReturn,
} from "./useGlassRenderer";

// AX.W09 — the DRY pointer-anchored moving-specular write seam (lifted from the
// verbatim Card.vue + DockIconButton.vue copies; PRM-aware; the `.glass-material`
// recipe maps the host `--mouse-x/y` write onto its typed specular channel).
export { useSpecularTracking } from "./useSpecularTracking";
export type { UseSpecularTracking } from "./useSpecularTracking";

// AW.W17 — the Canvas2D lifecycle substrate (park/freeze/dispose parallel to
// the WebGL substrate). The Constellation lattice composes it.
export { createCanvas2D } from "./canvas2d";
export type {
    Canvas2DFrame,
    Canvas2DHandle,
    Canvas2DOptions,
    Canvas2DSuspendReason,
} from "./canvas2d";
