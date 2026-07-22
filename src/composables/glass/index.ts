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
// The Canvas2D lifecycle substrate (park/freeze/dispose parallel to
// the WebGL substrate). published it on `/canvas` under the contract
// name `useCanvas2D` (+ the `useCanvasLifecycle` alias) and added
// `resolveCanvasColor` (the shared `light-dark()`→`rgb()` Canvas2D resolver).
// Constellation + FourierField compose it.
// The `.glass-lens` refraction runtime latch — replaces the WebKit-lying
// `@supports (backdrop-filter: url(#…))` gate. `armGlassRefract()` sets
// `:root[data-glass-refract="on"]` once per session only when a functional probe proves
// the url()-filter raster path paints (Chromium yes, WebKit accept-and-drop no). Consuming
// apps arm it once at bootstrap; `sideEffects: ['*.css']` prunes module-load side effects,
// so the arm is explicit (kin to `installDarkModeSync`).
export { armGlassRefract, supportsBackdropRefract } from "./supportsBackdropRefract";
export { useCanvas2D, useCanvasLifecycle, resolveCanvasColor } from "./canvas2d";
export type {
    Canvas2DFrame,
    Canvas2DHandle,
    Canvas2DOptions,
    Canvas2DSuspendReason,
} from "./canvas2d";
