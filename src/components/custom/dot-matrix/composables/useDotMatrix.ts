// BC.W-VIZ-DOTMATRIX — the public composable: the studio handle + the lifecycle wiring
// over the WebGPU-first substrate (with the WebGL2 instanced-billboard fallback) + the
// shared pointer field.
//
// `useDotMatrix(canvasRef, options)` composes the `createGpuSubstrate` picker — the
// `setupWGPU` instanced-billboard primary WHERE WebGPU is supported, else the `setupGL`
// WebGL2 instanced-billboard fallback (born-GPU; no Canvas2D path ever existed). It wires
// the offscreen pause + the `DockBackgroundToggle` WCAG-2.2.2 pause/resume seam + `wake()`
// on pointer, and exposes the uniform `DotMatrixHandle`. The renderer owns the frame loop
// (the canvas lifecycle leaf); this composable re-implements ZERO scheduling (no own rAF).
//
// THE POINTER (BC.W-VIZ-INTERACTION). When `config.interactive`, the globe tracks the
// cursor: useDotMatrix composes the SHARED `usePointerVelocityField` (NEVER a second rAF —
// the field is FED `tick(delta)` from inside the renderer's existing `onFrame` hook) and
// reads BOTH the steady-drag VELOCITY (`speed`) into a velocity-scaled repel-dimple push +
// a screen-center parallax, AND the flick BURST (the accel axis — `burst`) into a transient
// brightness/scale bloom. The pointer push rides a closed-over `DotPointerState` the setups
// read each frame; the consumer config is never mutated. PRM freezes the field (the
// usePointerVelocityField `tick(0)` discipline) + the substrate live-PRM one-static-frame
// park (the globe freezes mid-rotation, crisp + held).

import { onScopeDispose, type Ref } from "vue";
import {
    createGpuSubstrate,
    type GpuBackend,
} from "../../../../composables/glass/webgpu/useGpuSubstrate";
import { usePointerVelocityField } from "../../../../composables/motion/usePointerVelocityField";
import { resolveBudgetDpr } from "../../aurora/constants/budget";
import type { OklchStop } from "../../../../composables/color";
import type { DotMatrixConfig, DotPointerMode } from "../constants";
import { createDotWGPUSetup, createDotGLSetup } from "./useDotSphere";
import { restingPointer, type DotPointerState } from "./uniformBridgeWGPU";

export interface UseDotMatrixOptions {
    config: DotMatrixConfig;
    /** Resolve the dot-color palette as OKLCh (the demo themes it; default warm-identity). */
    getPalette: () => OklchStop[];
    /** `"capture"` → renderAt-only (the deterministic π capture path). Default `"live"`. */
    mode?: "live" | "capture";
}

/** The uniform handle a consumer wires its lifecycle against (backend-agnostic). */
export interface DotMatrixHandle {
    /** The resolved backend (`"webgpu"` where supported, else the WebGL2 fallback). */
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

/** The repel/attract sign for a pointer mode (repel pushes out, attract pulls in). */
function modeSign(mode: DotPointerMode): number {
    return mode === "attract" ? -1 : 1;
}

/**
 * Mount the dot-matrix renderer on `canvasRef`. The WebGPU primary runs the instanced-
 * billboard render pass over the static phyllotaxis dots buffer; the WebGL2 fallback draws
 * the SAME instanced billboards (the ONE math source). Returns the uniform lifecycle handle.
 */
export function useDotMatrix(
    canvasRef: Ref<HTMLCanvasElement | null>,
    options: UseDotMatrixOptions,
): DotMatrixHandle {
    const { config, getPalette } = options;
    const mode = options.mode ?? "live";

    // The shared pointer-physics field (NO own rAF — fed by the renderer frame via onFrame).
    const pointer = usePointerVelocityField({
        respectReducedMotion: config.respectReducedMotion,
    });

    // The transient pointer-push the interactive arm writes (closed over; the setups read it
    // each frame, never the consumer config). Position is normalized-host (0..1).
    const push: DotPointerState = restingPointer();

    let handle: ReturnType<typeof createGpuSubstrate> | null = null;
    let lastFrameSec = 0;

    // The per-frame pointer hook the setups invoke from inside their frame callback (the
    // no-own-rAF discipline). It advances the shared field one renderer frame AND derives
    // the transient push from BOTH velocity (the repel-dimple + parallax) + burst (the
    // accel brightness bloom).
    // The spring-soft well velocity (ζ<1 → the gravity LAGS the cursor + the dots ease back
    // with a slight overshoot — the liquid-weight bounce; feedback-liquid-weight-universal).
    let pushVel = 0;
    let activeVel = 0;
    function springStep(value: number, vel: number, target: number, response: number, zeta: number, dtSec: number): [number, number] {
        // A critically-under-damped spring integrator (the kf SpringProgress shape, inline).
        const omega = (2 * Math.PI) / Math.max(response, 1e-3);
        const accel = omega * omega * (target - value) - 2 * zeta * omega * vel;
        const v = vel + accel * dtSec;
        const x = value + v * dtSec;
        return [x, v];
    }

    function onFrame(timeSec: number): void {
        const deltaMs = lastFrameSec > 0 ? (timeSec - lastFrameSec) * 1000 : 16.7;
        const dtSec = Math.min(deltaMs / 1000, 0.05);
        lastFrameSec = timeSec;
        pointer.tick(deltaMs);

        if (!config.interactive || !pointer.active.value) {
            // Ease the well back to rest on the spring (the dots drift back with weight).
            [push.active, activeVel] = springStep(push.active, activeVel, 0, 0.5, 0.7, dtSec);
            [push.push, pushVel] = springStep(push.push, pushVel, 0, 0.5, 0.7, dtSec);
            push.bloom *= 0.9;
            // Decay the reclaimed velocity lane to rest so the lens collapses to a calm
            // symmetric well (the directional warp + comet-tail fade as the pointer leaves).
            push.velX *= 0.9;
            push.velY *= 0.9;
            push.accelMag *= 0.9;
            return;
        }
        // Track the smoothed pointer (normalized-host 0..1) — the gravity-well anchor.
        const sp = pointer.smoothedPosition.value;
        push.x = sp.x;
        push.y = sp.y;
        // The well engages on a SPRING (ζ<1) so it LAGS the cursor + settles with overshoot.
        [push.active, activeVel] = springStep(push.active, activeVel, 1, 0.42, 0.7, dtSec);
        // The steady-drag VELOCITY scales the well a touch (a fast sweep drags a stronger
        // pull); the shader owns the deep gravityStrength, so this is the [0,1] engage scalar.
        const speed = pointer.speed.value;
        const targetPush = modeSign(config.pointerMode) * Math.min(1.0, 0.7 + speed * 0.6);
        [push.push, pushVel] = springStep(push.push, pushVel, targetPush, 0.42, 0.7, dtSec);
        // The flick BURST (the accel axis) fires a transient brightness + size bloom + over-pull.
        push.bloom = Math.max(push.bloom * 0.9, pointer.burst.value);
        // THE DEAD-LEVER RECLAIM — the shared field already computes velocity + acceleration
        // every frame and the shader threw them away (it read only the scalar `speed`). Write
        // them into the velocity lane so the directional liquid lens can squash/stretch along
        // travel + stream the comet-tail wake (no new rAF, no new measurement — pure reclaim).
        const vel = pointer.velocity.value;
        push.velX = vel.x;
        push.velY = vel.y;
        const accel = pointer.acceleration.value;
        push.accelMag = Math.hypot(accel.x, accel.y);
    }

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
                pointer: push,
                shouldContinue: () => true,
                onFrame,
                // Read PRM lazily — the handle resolves AFTER this closure is built. Under PRM
                // the frame pins uTime so the deterministic static frame's spin + twinkle match.
                getReducedMotion: () => handle?.reducedMotion ?? false,
            };
            handle = createGpuSubstrate(canvas, {
                mode,
                respectReducedMotion: config.respectReducedMotion,
                // BG.W-VIZ-RESIZE-ADOPT — the leaf owns backing-store measurement +
                // sizing (round(gBCR × dprPolicy)); both setups' `resize` are upload-only.
                dprPolicy: resolveBudgetDpr,
                setupWGPU: createDotWGPUSetup(setupDeps),
                setupGL: createDotGLSetup(setupDeps),
            });
            void handle.armAsync();
        }
        return handle;
    };
    // Arm once the canvas resolves (microtask — the ref is set after mount).
    queueMicrotask(() => ensure());

    const h: DotMatrixHandle = {
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
