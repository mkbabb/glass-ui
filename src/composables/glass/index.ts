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
// the WebGL substrate). AX.W37 published it on `/canvas` under the contract
// name `useCanvas2D` (+ the `useCanvasLifecycle` alias) and added
// `resolveCanvasColor` (the shared `light-dark()`→`rgb()` Canvas2D resolver).
// Constellation + FourierField compose it.
export { useCanvas2D, useCanvasLifecycle, resolveCanvasColor } from "./canvas2d";
export type {
    Canvas2DFrame,
    Canvas2DHandle,
    Canvas2DOptions,
    Canvas2DSuspendReason,
} from "./canvas2d";
