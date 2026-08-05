// The Canvas2D substrate barrel. Mirrors the webgl/ barrel shape.
//
// Publishes on the `/canvas` subpath under the contract name `useCanvas2D`
// (the factory), and ships `resolveCanvasColor`, the shared
// `light-dark()`→`rgb()` resolver for a Canvas2D `strokeStyle`/`fillStyle`
// write. CLEAN BREAK: ONE factory name, no alias of any framing.
export { useCanvas2D } from "./useCanvas2D";
export type {
    Canvas2DFrame,
    Canvas2DHandle,
    Canvas2DOptions,
    Canvas2DSuspendReason,
} from "./useCanvas2D";
export { resolveCanvasColor } from "./resolveCanvasColor";
