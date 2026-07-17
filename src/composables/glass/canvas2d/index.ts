// The Canvas2D substrate barrel. Mirrors the webgl/ barrel shape.
//
// Publishes on the `/canvas` subpath
// under the contract name — `useCanvas2D` (the factory) + `useCanvasLifecycle`
// (the lifecycle-only alias-of-record) — and ships `resolveCanvasColor`, the
// shared `light-dark()`→`rgb()` resolver for a Canvas2D `strokeStyle`/`fillStyle`
// write. CLEAN BREAK: no `create*` factory alias — `useCanvas2D` is the
// sole factory name.
export { useCanvas2D, useCanvasLifecycle } from "./useCanvas2D";
export type {
    Canvas2DFrame,
    Canvas2DHandle,
    Canvas2DOptions,
    Canvas2DSuspendReason,
} from "./useCanvas2D";
export { resolveCanvasColor } from "./resolveCanvasColor";
