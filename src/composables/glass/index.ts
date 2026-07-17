// The `useGlassRenderer` / `createGlassFilter` /
// `destroyGlassFilter` detection-cascade cluster is DELETED (source-absent). It was
// a SECOND refraction path — a JS-canvas `feDisplacementMap`-in-`backdrop-filter`
// competing with the house `.glass-lens`/`#glass-refract` axis — with GlassPanel as
// its ONLY consumer (a `proof:no-dual-path` violation). GlassPanel retired onto
// `<Surface>`/`.glass-resting`, so the cluster has no consumer; `.glass-lens` is the
// ONE refraction door. Clean break, no alias. `useSpecularTracking` + the
// `useCanvas2D` lifecycle below stay live (aurora/blob/constellation/fourier).

// The DRY pointer-anchored moving-specular write seam (the single source
// Card.vue + DockControl.vue share; PRM-aware; the `.glass-material`
// recipe maps the host `--mouse-x/y` write onto its typed specular channel).
// `createSpecularWriter` is the single-source position-
// write core (rAF-coalesce + cached-PRM + cleanup); both `useSpecularTracking` (the
// Vue `:style`-ref delivery) and `vSpecular` (the tier-root auto-arm directive) wrap
// it. `vSpecular` is the zero-wiring delivery published on the `/glass` barrel so a
// NET-NEW interactive glass surface auto-arms the gleam with `v-specular`.
export {
    useSpecularTracking,
    createSpecularWriter,
} from "./useSpecularTracking";
export type {
    UseSpecularTracking,
    SpecularWriter,
} from "./useSpecularTracking";
export { vSpecular } from "./vSpecular";
// The angle-adding specular delivery. Wraps the SAME
// `createSpecularWriter` core (single position-write source); adds the
// `--specular-angle` channel the EDGE-glint conic sweep reads (material.css). The
// hover/button waves consume this leaf for the motion-reactive rim glint.
export { useSpecularPointer } from "./useSpecularPointer";
export type { UseSpecularPointer } from "./useSpecularPointer";

// The Canvas2D lifecycle substrate (park/freeze/dispose parallel to
// the WebGL substrate). published it on `/canvas` under the contract
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
