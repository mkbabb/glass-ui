// AZ.W-PRUNE2 (E4-3) — the `useGlassRenderer` / `createGlassFilter` /
// `destroyGlassFilter` detection-cascade cluster RETIRED. Its binary consumer
// (GlassPanel) retired at the AY prune; the only remaining exerciser was a
// demo-private story (NOT a binary consumer per the proof:component-orphan
// own-story exclusion), so the barrel seat could not earn its weight. A named
// carve (not the whole `export *` subtree) — `useSpecularTracking` + the
// `useCanvas2D` lifecycle below stay live (aurora/blob/constellation/fourier).
// The runtime tier-detection is now component-local where needed. Clean break,
// no alias (MIGRATION.md notes the barrel-export removal).

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
