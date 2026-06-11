// AZ.W-PRUNE2 (E4-3 + the RESTORE ruling) — the `useGlassRenderer` /
// `createGlassFilter` / `destroyGlassFilter` detection-cascade cluster keeps its
// BARREL seat retired (it is NOT re-exported through this `export *`), but its
// SOURCE (`./useGlassRenderer.ts`) is RESTORED as a COMPONENT-LOCAL dependency of
// GlassPanel. The AY/AZ prune census wrongly counted GlassPanel as retired — it
// is a live published surface (keyframes.js binds `@mkbabb/glass-ui/glass-panel`),
// so the cluster has a real binary consumer again. The E4-3 verdict ("the barrel
// seat could not earn its weight") still holds for the BARREL — GlassPanel imports
// the cluster directly via relative path, the tier-detection stays component-local.
// A named carve (not the whole `export *` subtree) — `useSpecularTracking` + the
// `useCanvas2D` lifecycle below stay live (aurora/blob/constellation/fourier).

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
