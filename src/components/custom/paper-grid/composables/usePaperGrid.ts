// BC.W-VIZ-PAPERGRID — the public composable: the studio handle + the lifecycle wiring over
// the WebGPU-first substrate (with the WebGL2 GLSL fallback) + the shared pointer field.
//
// `usePaperGrid(canvasRef, options)` composes the `createGpuSubstrate` picker — the
// `setupWGPU` fullscreen-fragment primary WHERE WebGPU is supported, else the `setupGL`
// WebGL2 fragment fallback (BOTH evaluate the SAME `paperGrid.ts` liquid grid — the ONE math
// source). It wires the offscreen pause + the `DockBackgroundToggle` WCAG-2.2.2 pause/resume
// seam + `wake()` on demand, and exposes the uniform `PaperGridHandle`. The renderer owns the
// frame loop (the canvas lifecycle leaf); this composable re-implements ZERO scheduling.
//
// THE POINTER (BC.W-VIZ-INTERACTION). When `config.interactive`, a soft Gaussian bulge
// presses the grid toward/away from the cursor: usePaperGrid composes the SHARED
// `usePointerVelocityField` (NEVER a second rAF — the field is FED `tick(delta)` from inside
// the renderer's existing `frame` callback via the `onFrame` setup hook) and derives the
// transient cursor in GRID space from BOTH the position AND the velocity (a directional lead
// offset — the smear wake) AND the acceleration/burst (a transient ripple lift on a flick).
// The pointermove/enter/leave listeners bind on the wrapper; PRM freezes the field (the
// usePointerVelocityField `tick(0)` discipline).

import { onScopeDispose, type Ref } from "vue";
import {
    createGpuSubstrate,
    type GpuBackend,
} from "../../../../composables/glass/webgpu/useGpuSubstrate";
import { usePointerVelocityField } from "../../../../composables/motion/usePointerVelocityField";
import { resolveBudgetDpr } from "../../aurora/constants/budget";
import type { PaperGridConfig } from "../constants";
import { gridScaleFor, type Vec2 } from "./paperGrid";
import { createPaperGridWGPUSetup } from "./paperGridWGPUSetup";
import { createPaperGridGLSetup } from "./paperGridGLSetup";

export interface UsePaperGridOptions {
    config: PaperGridConfig;
    /** `"capture"` → renderAt-only (the deterministic π capture path). Default `"live"`. */
    mode?: "live" | "capture";
}

/** The uniform handle a consumer wires its lifecycle against (backend-agnostic). */
export interface PaperGridHandle {
    /** The resolved backend (`"webgpu"` where supported, else the WebGL2 GLSL fallback). */
    readonly backend: GpuBackend;
    /** Park the loop (the WCAG-2.2.2 pause seam — `DockBackgroundToggle` wires this). */
    pause: () => void;
    /** Re-arm the loop. */
    resume: () => void;
    /** Re-arm a parked loop on demand (a pointer that re-introduced motion). */
    wake: () => void;
    /** Draw one frame out-of-loop (capture / thumbnail). */
    renderAt: (timeSec: number) => void;
    /** The live `prefers-reduced-motion: reduce` state. */
    readonly reducedMotion: boolean;
    /** Tear down the renderer + release GPU/GL resources. */
    dispose: () => void;
}

/**
 * Mount the paper-grid renderer on `canvasRef`. The WebGPU primary + the WebGL2 fallback are
 * BOTH pure fullscreen fragment passes evaluating the SAME liquid grid (the ONE math source
 * `paperGrid.ts`), so the picker is the only seam. Returns the uniform lifecycle handle.
 */
export function usePaperGrid(
    canvasRef: Ref<HTMLCanvasElement | null>,
    options: UsePaperGridOptions,
): PaperGridHandle {
    const { config } = options;
    const mode = options.mode ?? "live";

    // The shared pointer-physics field (NO own rAF — fed by the renderer frame via onFrame).
    const pointer = usePointerVelocityField({
        respectReducedMotion: config.respectReducedMotion,
    });

    // The transient cursor in GRID space the setups read each frame (the cursor swirl). At
    // rest it sits far off-screen so the swirl contributes nothing.
    let cursor: Vec2 = { x: 1e6, y: 1e6 };
    const getCursor = (): Vec2 => cursor;
    // The spring-eased traveling-wave envelope amplitude — ramps 0→1 on mount (the liquid-weight
    // ease-in with a slight overshoot), snaps to 0 under PRM (one static SQUARE-grid frame).
    let amp = 0;
    const getAmp = (): number => amp;
    let lastFrameSec = 0;

    let handle: ReturnType<typeof createGpuSubstrate> | null = null;

    // The per-frame pointer hook the setups invoke from inside their frame callback (the
    // no-own-rAF discipline — the renderer's loop feeds the push-API tick). It advances the
    // field one renderer frame AND derives the transient cursor in GRID space from BOTH the
    // position AND the velocity (a directional lead — the smear wake) AND the burst (a
    // transient ripple lift on a flick — the acceleration axis).
    function onFrame(timeSec: number): void {
        const deltaMs = lastFrameSec > 0 ? (timeSec - lastFrameSec) * 1000 : 16.7;
        lastFrameSec = timeSec;
        pointer.tick(deltaMs);

        // Drive the spring-eased traveling-wave envelope amplitude (the liquid-weight inertia).
        // PRM → snap to 0 (one static SQUARE-grid frame). Else ease 0→1 with a slight overshoot
        // settle (a critically-under-damped lerp; the wave-front itself carries the sweep).
        if (handle?.reducedMotion) {
            amp = 0;
        } else {
            const target = 1.06; // overshoot target → settles to ~1 (the liquid-weight bounce)
            amp += (target - amp) * 0.04;
            if (amp > 1) amp = 1 + (amp - 1) * 0.85; // soft cap so the overshoot relaxes to 1
        }

        if (!config.interactive || !pointer.active.value) {
            // Park the cursor far off-screen so the bulge contributes nothing at rest.
            cursor = { x: 1e6, y: 1e6 };
            return;
        }

        // Map the normalized pointer (0..1, y-down) → domain (-1..1, y-up) → grid space.
        const canvas = canvasRef.value;
        const cssH = canvas?.clientHeight || 320;
        const cssW = canvas?.clientWidth || 320;
        const aspect = cssW / Math.max(cssH, 1);
        const viewExtentPx = (canvas?.height || Math.round(cssH * resolveBudgetDpr())) || 320;
        const gridScale = gridScaleFor(viewExtentPx, config.cellSize);

        const sp = pointer.smoothedPosition.value;
        const vel = pointer.velocity.value;
        const burst = pointer.burst.value;
        // domain coordinate (aspect-corrected x — matches the shader's `uv.x * aspect`).
        const dx = (sp.x * 2 - 1) * aspect;
        const dy = -(sp.y * 2 - 1);
        // a velocity directional LEAD — the bulge leads the drag a hair (the smear wake); the
        // flick BURST adds a transient lift to the lead (the expanding ripple impulse).
        const lead = 0.12 + Math.min(0.4, burst);
        // map domain → grid space (the same `uv * gridScale` the kernel applies).
        cursor = {
            x: (dx + vel.x * lead) * gridScale,
            y: (dy - vel.y * lead) * gridScale,
        };
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
            handle = createGpuSubstrate(canvas, {
                mode,
                respectReducedMotion: config.respectReducedMotion,
                setupWGPU: createPaperGridWGPUSetup({
                    canvas,
                    config,
                    getCursor,
                    getAmp,
                    shouldContinue: () => true,
                    onFrame,
                }),
                setupGL: createPaperGridGLSetup({
                    canvas,
                    config,
                    getCursor,
                    getAmp,
                    shouldContinue: () => true,
                    onFrame,
                }),
            });
            void handle.armAsync();
        }
        return handle;
    };
    // Arm once the canvas resolves (microtask — the ref is set after mount).
    queueMicrotask(() => ensure());

    const h: PaperGridHandle = {
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
