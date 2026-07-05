// BG.W-DOTFLOW-REBUILD — the public composable: the studio handle + the lifecycle wiring over
// the WebGPU-first substrate (with the WebGL2 fragment fallback) + the shared pointer field.
//
// `useDotFlowField(canvasRef, options)` composes the `createGpuSubstrate` picker — the
// `setupWGPU` STREAMLINE fullscreen-fragment primary WHERE WebGPU is supported, else the
// `setupGL` WebGL2 fullscreen-fragment fallback (the SAME streamline gestalt on both). It wires
// the offscreen pause + the `DockBackgroundToggle` WCAG-2.2.2 pause/resume seam + `wake()` on
// pointer, and exposes the uniform `DotFlowFieldHandle`. The renderer owns the frame loop (the
// canvas lifecycle leaf); this composable re-implements ZERO scheduling.
//
// THE POINTER. When `config.interactive`, the cursor BENDS the streamlines (a smooth gaussian
// domain-push — no snap, no vortex chaos). useDotFlowField composes the SHARED
// `usePointerVelocityField` (NEVER a second rAF — the field is FED `tick(delta)` from inside the
// renderer's existing `frame` callback via the `onFrame` setup hook) and reads BOTH the
// steady-drag VELOCITY and the flick BURST (the accel axis — the user's "velocity AND
// acceleration" ask) into the streamline-bend strength. PRM freezes the field (the
// usePointerVelocityField `tick(0)` discipline).

import { onScopeDispose, type Ref } from "vue";
import {
    createGpuSubstrate,
    type GpuBackend,
} from "../../../../composables/glass/webgpu/useGpuSubstrate";
import { usePointerVelocityField } from "../../../../composables/motion/usePointerVelocityField";
import { resolveBudgetDpr } from "../../aurora/constants/budget";
import type { OklchStop } from "../../../../composables/color";
import type { FlowFieldConfig } from "../constants";
import { createFlowWGPUSetup, createFlowGLSetup, backingAspect } from "./flowSetup";
import { FLOW_POINTER_REST, type FlowPointerState } from "./uniformBridgeWGPU";

export interface UseDotFlowFieldOptions {
    config: FlowFieldConfig;
    /** Resolve the dot-color palette as OKLCh (the demo themes it; default warm-identity). */
    getPalette: () => OklchStop[];
    /** `"capture"` → renderAt-only (the deterministic π capture path). Default `"live"`. */
    mode?: "live" | "capture";
}

/** The uniform handle a consumer wires its lifecycle against (backend-agnostic). */
export interface DotFlowFieldHandle {
    /** The resolved backend (`"webgpu"` where supported, else the WebGL2 fragment fallback). */
    readonly backend: GpuBackend;
    /** Park the loop (the WCAG-2.2.2 pause seam — `DockBackgroundToggle` wires this). */
    pause: () => void;
    /** Re-arm the loop. */
    resume: () => void;
    /** Re-arm a parked loop on demand (a pointer/setter that re-introduced motion). */
    wake: () => void;
    /** Draw one frame out-of-loop (capture / thumbnail). */
    renderAt: (timeSec: number) => void;
    /** The live `prefers-reduced-motion: reduce` state. */
    readonly reducedMotion: boolean;
    /** Tear down the renderer + release GPU/GL resources. */
    dispose: () => void;
}

/**
 * Mount the dot-flow-field renderer on `canvasRef`. Both backends evaluate the SAME
 * `flowField.ts` stream field as a fullscreen fragment pass (the ONE math source) — evenly-
 * spaced beaded streamlines the cursor bends. Returns the uniform lifecycle handle.
 */
export function useDotFlowField(
    canvasRef: Ref<HTMLCanvasElement | null>,
    options: UseDotFlowFieldOptions,
): DotFlowFieldHandle {
    const { config, getPalette } = options;
    const mode = options.mode ?? "live";

    // The shared pointer-physics field (NO own rAF — fed by the renderer frame via onFrame).
    const pointer = usePointerVelocityField({
        respectReducedMotion: config.respectReducedMotion,
    });

    // ── The live cursor state the stream field reads each frame (domain space). The pointer
    //    field is in canvas-relative [0,1]; map it to the aspect-scaled domain ([-aspect,aspect]
    //    × [-1,1], NDC y flips). The bend STRENGTH rides the base gain × the velocity + burst.
    const pointerState: FlowPointerState = { ...FLOW_POINTER_REST };
    const getPointer = (): FlowPointerState => {
        if (!config.interactive || !pointer.active.value) {
            pointerState.active = 0;
            pointerState.strength = 0;
            return pointerState;
        }
        const canvas = canvasRef.value;
        const aspect = canvas ? backingAspect(canvas) : 1;
        const p = pointer.position.value;
        pointerState.cursorX = (p.x * 2 - 1) * aspect;
        pointerState.cursorY = 1 - p.y * 2;
        // The steady-drag VELOCITY + the flick BURST (accel axis) scale the streamline bend.
        const speed = pointer.speed.value;
        const burst = pointer.burst.value;
        pointerState.strength =
            config.pointerStrength * (1 + Math.min(2.5, speed * 4) + burst * 2);
        pointerState.active = 1;
        return pointerState;
    };

    let handle: ReturnType<typeof createGpuSubstrate> | null = null;
    let lastFrameSec = 0;

    // The per-frame pointer hook the setups invoke from inside their frame callback (the
    // no-own-rAF discipline — the renderer's loop feeds the push-API tick).
    function onFrame(timeSec: number): void {
        const deltaMs = lastFrameSec > 0 ? (timeSec - lastFrameSec) * 1000 : 16.7;
        lastFrameSec = timeSec;
        pointer.tick(deltaMs);
    }

    // Bind the pointer listeners on the wrapper (the canvas is pointer-events:none). A first
    // hover wakes a parked loop on the SAME frame (the no-delayed-response discipline).
    const onEnter = (): void => {
        pointer.onPointerEnter();
        if (config.interactive) handle?.wake();
    };
    const onMove = (e: Event): void => {
        pointer.onPointerMove(e as PointerEvent);
        if (config.interactive) handle?.wake();
    };
    const pointerHost = (canvas: HTMLCanvasElement): HTMLElement =>
        canvas.parentElement ?? canvas;
    function bindPointer(canvas: HTMLCanvasElement): void {
        const host = pointerHost(canvas);
        host.addEventListener("pointermove", onMove);
        host.addEventListener("pointerenter", onEnter);
        host.addEventListener("pointerleave", pointer.onPointerLeave);
    }
    function unbindPointer(canvas: HTMLCanvasElement): void {
        const host = pointerHost(canvas);
        host.removeEventListener("pointermove", onMove);
        host.removeEventListener("pointerenter", onEnter);
        host.removeEventListener("pointerleave", pointer.onPointerLeave);
    }

    const ensure = (): ReturnType<typeof createGpuSubstrate> | null => {
        const canvas = canvasRef.value;
        if (!canvas) return null;
        if (!handle) {
            bindPointer(canvas);
            const setupDeps = {
                canvas,
                config,
                getPalette,
                getPointer,
                shouldContinue: () => true,
                onFrame,
            };
            handle = createGpuSubstrate(canvas, {
                mode,
                respectReducedMotion: config.respectReducedMotion,
                // BG.W-VIZ-RESIZE-ADOPT — the leaf owns backing measurement + sizing
                // (round(gBCR × dprPolicy)); every setup's `resize` is upload-only.
                dprPolicy: resolveBudgetDpr,
                // BG.W-VIZ-REVEAL-BLOOM — the one-shot cold-first-VISIBLE entrance bloom.
                revealBloom: true,
                setupWGPU: createFlowWGPUSetup(setupDeps),
                setupGL: createFlowGLSetup(setupDeps),
            });
            void handle.armAsync();
        }
        return handle;
    };
    // Arm once the canvas resolves (microtask — the ref is set after mount).
    queueMicrotask(() => ensure());

    const h: DotFlowFieldHandle = {
        get backend(): GpuBackend {
            return ensure()?.backend ?? "webgpu";
        },
        pause: () => ensure()?.suspend("manual"),
        resume: () => ensure()?.resume("manual"),
        wake: () => ensure()?.wake(),
        renderAt: (t) => ensure()?.renderAt(t),
        get reducedMotion() {
            return handle?.reducedMotion ?? false;
        },
        dispose: () => {
            const canvas = canvasRef.value;
            if (canvas) unbindPointer(canvas);
            pointer.dispose();
            handle?.dispose();
        },
    };
    onScopeDispose(() => h.dispose());
    return h;
}
