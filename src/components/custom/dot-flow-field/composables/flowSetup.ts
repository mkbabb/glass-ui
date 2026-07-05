// BG.W-DOTFLOW-REBUILD — the dot-flow-field substrate-builder HUB.
//
// The shared seam between the two STREAMLINE fragment backends carved into colocated leaves
// (no-god-module): the WebGPU fullscreen-fragment primary (`flowSetupWGPU.ts`) and the WebGL2
// fullscreen-fragment fallback (`flowSetupGL.ts`). It owns the shared `FlowSetupDeps` contract +
// the `backingAspect` helper both backends read, and RE-EXPORTS the two `create*Setup` builders
// so `useDotFlowField` imports them from ONE seam. (The compute/particle/trail hub is GONE — the
// streamline render carries no shared particle helpers.)

import type { OklchStop } from "../../../../composables/color";
import type { FlowFieldConfig } from "../constants";
import type { FlowPointerState } from "./uniformBridgeWGPU";

export interface FlowSetupDeps {
    canvas: HTMLCanvasElement;
    config: FlowFieldConfig;
    /** The resolved (ColorResolver) palette stops as OKLCh — re-read each frame so a live palette
     *  edit reaches the buffer. */
    getPalette: () => OklchStop[];
    /** Demand-gate (the renderer's quiescence layer — substrate-agnostic). */
    shouldContinue: () => boolean;
    /**
     * The per-frame pointer hook — useDotFlowField advances the shared
     * `usePointerVelocityField` here (the no-own-rAF discipline). ZERO own rAF.
     */
    onFrame?: (timeSec: number) => void;
    /** The live pointer state the renderer feeds the stream field (rest = un-bent). */
    getPointer?: () => FlowPointerState;
}

/** The backing aspect (width/height) — the streamline domain is isotropic-scaled by it. */
export function backingAspect(canvas: HTMLCanvasElement): number {
    return (canvas.width || 1) / Math.max(canvas.height || 1, 1);
}

// The two substrate-`setup` builders, carved into colocated leaves but re-exported here so
// useDotFlowField has ONE import seam.
export { createFlowWGPUSetup } from "./flowSetupWGPU";
export { createFlowGLSetup } from "./flowSetupGL";
