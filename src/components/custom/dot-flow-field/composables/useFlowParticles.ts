// BD.W-DOTFLOW-AURORA-CURRENT — the dot-flow-field substrate-builder HUB.
//
// This module is the shared seam between the two substrate backends carved into colocated
// leaves (no-god-module): the WebGPU compute+render primary (`flowSetupWGPU.ts`) and the
// WebGL2 LIVE path (`flowSetupGL.ts`). It owns the shared `FlowSetupDeps` contract, the warm
// floor/bloom ground constants, and the px-min/count/state-cols helpers both backends read,
// and RE-EXPORTS the two `create*Setup` builders so `useDotFlowField` imports them from here
// (the one substrate entry point — backends stay private leaves).

import type { OklchStop } from "../../../../composables/color";
import type { FlowFieldConfig } from "../constants";
import { FLOW_MAX_LATTICE } from "./uniformBridgeWGPU";
import { type FlowPointerState } from "./uniformBridgeWGPU";

// Re-export flowGridGeometry through the hub so the backend leaves read it from one seam.
export { flowGridGeometry } from "./uniformBridgeWGPU";

/** The deep warm-near-black floor + the warm rose corner-bloom (linear-sRGB), the §3 ground.
 *  Resolved off a warm-fire-adjacent OKLCh ground (NOT teal). The demo preset overrides via
 *  `config.background`; this is the fallback ground for the flow present-composite. */
export const FLOW_FLOOR_OKLCH: OklchStop = { L: 0.11, C: 0.012, h: 50 };
export const FLOW_BLOOM_OKLCH: OklchStop = { L: 0.5, C: 0.16, h: 330 }; // warm rose/magenta

export interface FlowSetupDeps {
    canvas: HTMLCanvasElement;
    config: FlowFieldConfig;
    /** The resolved (ColorResolver) palette stops as OKLCh — re-read each frame so a live palette edit reaches the buffer. */
    getPalette: () => OklchStop[];
    /** Demand-gate (the renderer's quiescence layer — substrate-agnostic). */
    shouldContinue: () => boolean;
    /**
     * The per-frame pointer hook — useDotFlowField advances the shared
     * `usePointerVelocityField` here (the no-own-rAF discipline). ZERO own rAF.
     */
    onFrame?: (timeSec: number) => void;
    /** The live pointer/vortex state the renderer feeds the flow kernel (rest = inert). */
    getPointer?: () => FlowPointerState;
}

/** A px-min reader (the lattice density rides the min CSS dimension). */
export function cssMin(canvas: HTMLCanvasElement): number {
    return Math.min(canvas.clientWidth || 320, canvas.clientHeight || 320);
}

/** The flow mote count, clamped to the storage/state cap. */
export function flowCount(config: FlowFieldConfig): number {
    return Math.min(Math.max(Math.floor(config.particleCount), 1), FLOW_MAX_LATTICE);
}

/** The square state-texture side that holds `count` motes (one texel each). */
export function stateCols(count: number): number {
    return Math.max(1, Math.ceil(Math.sqrt(count)));
}

// The two substrate-`setup` builders (the WGPU compute+render primary + the WebGL2 channel),
// carved into colocated leaves but re-exported here so useDotFlowField has ONE import seam.
export { createFlowWGPUSetup } from "./flowSetupWGPU";
export { createFlowGLSetup } from "./flowSetupGL";
