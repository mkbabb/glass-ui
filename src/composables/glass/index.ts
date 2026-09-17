// The DRY pointer-anchored moving-specular write seam (the single source
// Card.vue + DockControl.vue share; PRM-aware; the material-group recipe maps
// the host `--mouse-x/y` write onto its typed specular channel).
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
// the WebGL substrate). Published on `/canvas` under the ONE contract
// name `useCanvas2D`, plus `resolveCanvasColor` (the shared
// `light-dark()`→`rgb()` Canvas2D resolver).
// Constellation + FourierField compose it.
// The GPU substrate's two published-signature types. No runtime rides with them: the
// webgpu leaves themselves stay internal, and these two names are here because the
// SHIPPED component signatures spend them — `<FourierField>` emits
// `rendererStatus: [RendererStatus]`, exposes `Readonly<Ref<RendererStatus>>` and
// `backend: () => GpuBackend`, and Aurora, Blob and Constellation emit the same status.
// Four published components named a type no entry carried; one shared door answers all
// four, which is why this is not repeated onto each component barrel.
export type { RendererStatus } from "./webgpu/rendererStatus";
export type { GpuBackend } from "./webgpu/useGpuSubstrate";
export { useCanvas2D, resolveCanvasColor } from "./canvas2d";
export type {
    Canvas2DFrame,
    Canvas2DHandle,
    Canvas2DOptions,
    Canvas2DSuspendReason,
} from "./canvas2d";
