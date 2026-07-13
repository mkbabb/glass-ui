// BC.W-VIZ-FOURIER — the public composable: the studio handle + the lifecycle wiring over
// the WebGPU-first substrate (with the WebGL2 GLSL fallback) + the shared pointer field +
// the ONE head_t clock.
//
// `useFourierField(canvasRef, options)` composes the `createGpuSubstrate` picker — the
// `setupWGPU` compute+fullscreen-fragment primary WHERE WebGPU is supported, else the
// `setupGL` WebGL2 SDF fallback (the §E "WebGPU everywhere" mandate — the Canvas2D renderer
// is RETIRED; this composable carries NO `useCanvas2D` import and NO `getContext("2d")`).
// It wires the offscreen pause + the `DockBackgroundToggle` WCAG-2.2.2 pause/resume seam +
// `wake()` on demand, and exposes the uniform `FourierFieldHandle`. The renderer owns the
// frame loop (the canvas lifecycle leaf); this composable re-implements ZERO scheduling.
//
// THE ONE CLOCK (head_t). The single loop parameter `head_t ∈ [0,1)` is advanced by frame
// time inside the substrate's `onFrame` hook (NO second rAF — the §6.1 one-clock discipline,
// coordinated with W-VIZ-CHOREOGRAPHY). `freeze`/PRM short-circuit to the deterministic
// `frozenT`; the pointer SCRUB re-seats head_t directly (pointer X → head_t); a flick injects
// a velocity-continuous momentum impulse that decays back to ambient speed.
//
// THE POINTER (BC.W-VIZ-INTERACTION). When `config.interactive`, useFourierField composes the
// SHARED `usePointerVelocityField` (NEVER a second rAF — the field is FED `tick(delta)` from
// inside the renderer's `onFrame` hook): pointer X scrubs head_t, the flick burst injects clock
// momentum, the accel term blooms the head/swells the chain (a sub-perceptual cap). PRM keeps
// the scrub (a position read) but drops the momentum (the `tick(0)` discipline).

import { onScopeDispose, type Ref } from "vue";
import {
    createGpuSubstrate,
    type GpuBackend,
} from "../../../../composables/glass/webgpu/useGpuSubstrate";
import { usePointerVelocityField } from "../../../../composables/motion/usePointerVelocityField";
import {
    fourierLeanMapping,
    snapshotField,
} from "../../../../composables/motion/pointerFieldMappings";
import { resolveBudgetDpr } from "../../aurora/constants/budget";
import type { OklchStop } from "../../../../composables/color";
import type { FourierFieldConfig } from "../constants";
import { SCRUB_GAIN } from "../constants";
import type { BasisComponent } from "../math";
import { createFourierWGPUSetup } from "./fourierFieldWGPUSetup";
import { createFourierGLSetup } from "./fourierFieldGLSetup";
import { computeFourierFit, type FourierFit } from "./uniformBridgeWGPU";

export interface UseFourierFieldOptions {
    config: FourierFieldConfig;
    /** The active phasor spectrum (CPU-minted; re-read each frame so a source-swap reaches the buffer). */
    getSpectrum: () => readonly BasisComponent[];
    /** Resolve the curve-color palette as OKLCh (the demo themes it; default warm-identity). */
    getPalette: () => OklchStop[];
    /** When true, hold the deterministic best-frame and never advance (the capture / freeze lever). */
    freeze?: () => boolean;
    /** The static deterministic best-frame parameter under `freeze`/PRM. Default 0.34. */
    frozenT?: number;
    /** Base forward period for one full traversal at 1× speed, in seconds. Default 16. */
    periodS?: number;
    /** `"capture"` → renderAt-only (the deterministic π capture path). Default `"live"`. */
    mode?: "live" | "capture";
    /**
     * BI.W-FIELD-CORE — the route pointer BROADCASTER read (the SUBTLE-interactive background
     * register). A full-bleed `pointer-events:none` field cannot listen for its own pointer, so
     * an ambient consumer reads the route-level `useRoutePointer` and feeds the shared field
     * from here each frame (viewport-normalized ≈ host-normalized for a full-bleed field). The
     * lean/bias then read on a background field WITHOUT the field owning a pointer listener.
     * Omit for the studio (which binds its own host listeners).
     */
    routePointer?: () => { x: number; y: number; active: boolean } | null;
}

/** The uniform handle a consumer wires its lifecycle against (backend-agnostic). */
export interface FourierFieldHandle {
    /** The resolved backend (`"webgpu"` where supported, else the WebGL2 GLSL fallback). */
    readonly backend: GpuBackend;
    /** Park the loop (the WCAG-2.2.2 pause seam — `DockBackgroundToggle` wires this). */
    pause: () => void;
    /** Re-arm the loop. */
    resume: () => void;
    /** Re-arm a parked loop on demand. */
    wake: () => void;
    /** Draw one frame out-of-loop (capture / thumbnail). */
    renderAt: (timeSec: number) => void;
    /** The live `prefers-reduced-motion: reduce` state. */
    readonly reducedMotion: boolean;
    /** The current loop parameter `head_t ∈ [0,1)` (the scrubber reads/writes it). */
    readonly headT: number;
    /** Scrub the clock directly (the transport scrubber / a pointer drag). */
    setHeadT: (t: number) => void;
    /** Tear down the renderer + release GPU/GL resources. */
    dispose: () => void;
}

export function useFourierField(
    canvasRef: Ref<HTMLCanvasElement | null>,
    options: UseFourierFieldOptions,
): FourierFieldHandle {
    const { config, getSpectrum, getPalette } = options;
    const mode = options.mode ?? "live";
    const frozenT = options.frozenT ?? 0.34;
    const periodS = options.periodS ?? 16;

    // ── The ONE head_t clock (no second rAF — advanced by the substrate frame). ──
    let headT = 0;
    let lastFrameSec = -1;
    // BD.W-FOURIER-LOOM §clock-settle — the flick impulse is a SPRING displacement, not a
    // monotonic exponential decay. `momentum` is the clock-rate offset (turns/s) from rest;
    // `momentumVel` is its spring velocity. A flick injects `momentum`; the spring pulls it
    // back to 0 with ζ < 1 so it OVERSHOOTS rest (the iOS fling settle, the liquid-weight
    // register) instead of the stiff `Math.pow(0.92, …)` it replaces. Do NOT propagate this
    // to the keyboard scrub (the DELTA-ASSAY clause).
    let momentum = 0;
    let momentumVel = 0;
    // ζ ≈ 0.62 (under-damped → a visible overshoot); ω natural ~ 8 rad/s → a ~0.8s settle.
    const SETTLE_OMEGA = 8.0;
    const SETTLE_ZETA = 0.62;

    // Integrate the momentum spring one step (semi-implicit Euler — bounded + stable). The
    // rest target is 0 (ambient); a flick seeds `momentum` away from rest and the spring
    // overshoots back through it. Returns nothing — mutates `momentum`/`momentumVel`.
    function settleMomentum(dt: number): void {
        if (momentum === 0 && momentumVel === 0) return;
        const accel = -SETTLE_OMEGA * SETTLE_OMEGA * momentum
            - 2 * SETTLE_ZETA * SETTLE_OMEGA * momentumVel;
        momentumVel += accel * dt;
        momentum += momentumVel * dt;
        if (Math.abs(momentum) < 1e-4 && Math.abs(momentumVel) < 1e-4) {
            momentum = 0;
            momentumVel = 0;
        }
    }

    // ── The shared pointer-physics field (FED by the renderer frame via onFrame). ──
    const pointer = usePointerVelocityField({
        respectReducedMotion: config.respectReducedMotion,
    });

    const isFrozen = (): boolean =>
        (options.freeze?.() ?? false) || (handle?.reducedMotion ?? false);

    // The per-frame hook the setups invoke from inside their frame callback. It advances the
    // shared pointer field (the push-API tick) + the head_t clock (the ONE clock) — once per
    // frame, NO second rAF. BI.W-FOURIER-RIBBON retired the per-frame `--ff-head-*` setProperty
    // restyle bridge (a dead CSS-sprite seam with no live consumer — the (b) perf attribution);
    // the comet head is painted by the GPU head quad, never a per-frame CSS restyle.
    function onFrame(timeSec: number): void {
        advanceClock(timeSec);
    }

    // Advance the pointer field + the head_t clock (the ONE clock). The early-returns keep
    // the register branches readable; `onFrame` fires the §2a seam after it returns.
    function advanceClock(timeSec: number): void {
        const deltaMs = lastFrameSec >= 0 ? (timeSec - lastFrameSec) * 1000 : 16.7;
        lastFrameSec = timeSec;
        // BI.W-FIELD-CORE — feed the shared field from the route broadcaster (the
        // subtle-interactive background register — the canvas is pointer-events:none, so it
        // reads the route pointer rather than its own listener). A single position write; the
        // field derives velocity/burst/engagement in tick.
        const rp = options.routePointer?.();
        if (rp) {
            pointer.setActive(rp.active);
            if (rp.active) pointer.setPointer(rp.x, rp.y);
        }
        pointer.tick(deltaMs);

        if (isFrozen()) {
            headT = frozenT;
            momentum = 0;
            momentumVel = 0;
            return;
        }

        const dt = Math.min(Math.max(deltaMs / 1000, 0), 0.05);

        if (config.interactive && pointer.active.value) {
            // BD.W-VIZ-BROKEN-FIX D6a — a VELOCITY scrub, NOT an absolute-X teleport. The
            // cursor MOTION nudges the clock (a flick fast-forwards, a still cursor lets it
            // drift at config speed), velocity-continuous so the head NEVER teleports (the
            // prior `headT = pointerX` snapped the comet to an arbitrary phase, ignored Y,
            // and read as "not following"). The 2-D follow rides the `uPointer` uniform
            // (D6b — the field/chain LEANS toward the cursor). PRM keeps the position read
            // but zeros velocity (the `usePointerVelocityField` tick(0) discipline), so the
            // scrub term → 0 + the field static-leans (no live momentum).
            const baseRate = config.speed / periodS; // turns per second
            const rate =
                baseRate +
                pointer.velocity.value.x * SCRUB_GAIN + // the cursor-motion scrub (weighted)
                momentum; // the decaying flick impulse
            headT = (headT + rate * dt) % 1;
            if (headT < 0) headT += 1;
            // A flick SEEDS the spring displacement (a velocity-continuous impulse); the
            // spring then overshoots rest + settles (the bounded-overshoot register).
            const burst = pointer.burst.value * 4.0;
            if (burst !== 0) {
                momentum = burst;
                momentumVel = 0;
            }
            settleMomentum(dt);
            return;
        }

        // Free advance at the config speed + the settling flick momentum (the spring).
        const baseRate = config.speed / periodS; // turns per second
        const rate = baseRate + momentum;
        headT = (headT + rate * dt) % 1;
        if (headT < 0) headT += 1;
        settleMomentum(dt);
    }

    const getHeadT = (): number => headT;

    // ── BI.W-FOURIER-RIBBON — the cached view-fit (recompute on spectrum change ONLY). ──
    // The `spectrum !== fitSpectrum` guard HOISTS `computeFourierFit` out of the frame loop
    // (proof:viz-fourier-ribbon FB4): the O(FIT_SAMPLES) bbox pass runs once per spectrum swap,
    // never per frame. `getPointerLean` reads the cached scale for the model→clip 2-D lean.
    let fitSpectrum: readonly BasisComponent[] | null = null;
    let fit: FourierFit = { centerX: 0, centerY: 0, scale: 1 };
    const ensureFit = (): FourierFit => {
        const spectrum = getSpectrum();
        if (spectrum !== fitSpectrum) {
            fitSpectrum = spectrum;
            fit = computeFourierFit(spectrum);
        }
        return fit;
    };

    // ── BG.W-FOURIER-BEAUTY B3 — the REAL 2-D cursor FOLLOW (critically-damped, correct
    // coordinate space). ──  When interactive + active, the figure CENTROID genuinely REACHES
    // toward the cursor (the prior BD.W-VIZ-BROKEN-FIX D6b 0.12 model-space whisper never
    // arrived — the "abysmal tracking" defect). The follow reads the SHARED
    // `usePointerVelocityField.smoothedPosition` (the critically-damped lerp — ZERO snap/
    // teleport by construction; the prior `headT = pointerX` absolute-X snap class stays
    // dead) and maps it through the SAME model→clip fit the render inverts:
    //   • pointer [0,1] (getBoundingClientRect-normalized — dpr/scroll-safe, the 6.1 sizer
    //     box↔backing mapping) → clip [-1,1]; DOM y grows DOWN so the y clip is INVERTED
    //     (the whisper shipped the WRONG y sign — the figure panned AWAY from the cursor);
    //   • clip → MODEL offset via `× aspect / scale` (the exact inverse of the fs's
    //     `model = center + clip·aspect / scale`), bounded by `FOLLOW_REACH` (< 1 so the
    //     figure stays largely in frame), then SUBTRACTED from `fit.center` by the setups so
    //     the centroid sits under the cursor → the tracked feature reaches within a small
    //     radius within the damped settle.
    // PRM-safe: under reduce the pointer field HOLDS its position (no live motion), so the
    // follow is a STATIC bend toward the last position (not animation); when not active it
    // relaxes to {0,0} (the ambient/byte-identical register). NO second rAF — the follow reads
    // the field the ONE onFrame `tick` advances.
    const getPointerLean = (): { x: number; y: number } => {
        if (!config.interactive) return { x: 0, y: 0 };
        const canvas = canvasRef.value;
        if (!canvas || !canvas.width || !canvas.height) return { x: 0, y: 0 };
        // BI.W-FIELD-CORE — the SUBTLE lean via the shared PURE `fourierLeanMapping`
        // (FOLLOW_LEAN ≈ 0.15, engagement-scaled — the RETIRED FOLLOW_REACH=0.7 centroid-
        // teleport is gone). The curve draws TOWARD the cursor without translating the figure;
        // engagement fades it in/out (a lifted pointer relaxes to the ambient register).
        const { leanX, leanY } = fourierLeanMapping(
            snapshotField(pointer),
            {
                aspect: canvas.width / canvas.height,
                scale: Math.max(ensureFit().scale, 1e-6),
            },
        );
        return { x: leanX, y: leanY };
    };

    // ── Pointer listeners on the wrapper (the canvas is pointer-events:none). ──
    const onMove = (e: Event): void => {
        pointer.onPointerMove(e as PointerEvent);
        if (config.interactive) handle?.wake();
    };
    const onEnter = (): void => {
        pointer.onPointerEnter();
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

    let handle: ReturnType<typeof createGpuSubstrate> | null = null;
    const ensure = (): ReturnType<typeof createGpuSubstrate> | null => {
        const canvas = canvasRef.value;
        if (!canvas) return null;
        if (!handle) {
            bindPointer(canvas);
            handle = createGpuSubstrate(canvas, {
                mode,
                respectReducedMotion: config.respectReducedMotion,
                // BG.W-VIZ-RESIZE-ADOPT — the leaf owns backing measurement + sizing
                // (round(gBCR × dprPolicy)); both setups' `resize` are upload-only.
                dprPolicy: resolveBudgetDpr,
                // BG.W-VIZ-REVEAL-BLOOM — the one-shot cold-first-VISIBLE entrance bloom.
                revealBloom: true,
                setupWGPU: createFourierWGPUSetup({
                    canvas,
                    config,
                    getSpectrum,
                    getPalette,
                    getHeadT,
                    shouldContinue: () => true,
                    onFrame,
                    getPointerLean,
                }),
                setupGL: createFourierGLSetup({
                    canvas,
                    config,
                    getSpectrum,
                    getPalette,
                    getHeadT,
                    shouldContinue: () => true,
                    onFrame,
                    getPointerLean,
                }),
            });
            void handle.armAsync();
        }
        return handle;
    };
    queueMicrotask(() => ensure());

    const h: FourierFieldHandle = {
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
        get headT() {
            return headT;
        },
        setHeadT: (t: number) => {
            headT = ((t % 1) + 1) % 1;
            ensure()?.wake();
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
