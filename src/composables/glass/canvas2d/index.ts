// The Canvas2D substrate barrel. Mirrors the webgl/ barrel shape.
//
// AW.W17 authored the substrate; AX.W37 PUBLISHED it on the `/canvas` subpath
// under the contract name — `useCanvas2D` (the factory) + `useCanvasLifecycle`
// (the lifecycle-only alias-of-record) — and ships `resolveCanvasColor`, the
// shared `light-dark()`→`rgb()` resolver for a Canvas2D `strokeStyle`/`fillStyle`
// write. CLEAN BREAK: the prior `create*` factory name is fully retired (no
// legacy alias).
export { useCanvas2D, useCanvasLifecycle } from "./useCanvas2D";
export type {
    Canvas2DFrame,
    Canvas2DHandle,
    Canvas2DOptions,
    Canvas2DSuspendReason,
} from "./useCanvas2D";
export { resolveCanvasColor } from "./resolveCanvasColor";
