// BD.W-CONCENTRIC-RELIEF — the public composable: the studio handle + the lifecycle wiring
// over the WebGPU-first substrate (with the WebGL2 GLSL fallback) + the shared pointer field.
//
// `useConcentric(canvasRef, options)` composes the `createGpuSubstrate` picker — the
// `setupWGPU` fullscreen-fragment primary WHERE WebGPU is supported, else the `setupGL`
// WebGL2 fragment fallback. It wires the offscreen pause + the `DockBackgroundToggle`
// WCAG-2.2.2 pause/resume seam + `wake()` on demand, and exposes the uniform
// `ConcentricHandle`. The renderer owns the frame loop (the canvas lifecycle leaf); this
// composable re-implements ZERO scheduling.
//
// THE POINTER (BD.W-CONCENTRIC-RELIEF). When `config.interactive`, the cursor HEAVES the
// level-set topography: useConcentric composes the SHARED `usePointerVelocityField` (NEVER a
// second rAF — the field is FED `tick(delta)` from inside the renderer's existing `frame`
// callback via the `onFrame` setup hook) and derives a domain-space cursor that bulges the
// height field (position → the Gaussian peak, velocity → the well LEAD + the velocity-HEAVE
// scale on the well depth/radius). The pointermove/enter/leave listeners are bound on the
// wrapper; PRM freezes the field (the usePointerVelocityField `tick(0)` discipline).

import { onScopeDispose, type Ref } from "vue";
import {
    createGpuSubstrate,
    type GpuBackend,
} from "../../../../composables/glass/webgpu/useGpuSubstrate";
import { usePointerVelocityField } from "../../../../composables/motion/usePointerVelocityField";
import { resolveBudgetDpr } from "../../aurora/constants/budget";
import type { OklchStop } from "../../../../composables/color";
import type { ConcentricConfig } from "../constants";
import type { Vec2 } from "./levelField";
import { createConcentricWGPUSetup } from "./concentricWGPUSetup";
import { createConcentricGLSetup } from "./concentricGLSetup";

// BG.W-CONCENTRIC-LEVELCURVES — the CONTINUOUS pointer-HEAVE envelope constants.
// The critically-damped engage/release time constant (ms): the cursor well grows IN on
// pointer-enter and settles OUT on leave with real weight — NEVER a first-frame snap on
// enter, NEVER a pop-on-leave. Frame-rate-independent (the `1 - exp(-dt/TAU)` step).
const WELL_ENGAGE_TAU_MS = 150;
// The BOUNDED velocity-HEAVE ceiling — a fast flick (or a large consumer `velocityHeave`
// knob) can never blow the well out past this (the velocity-scaled weight stays bounded).
const WELL_SCALE_MAX = 2.2;
// The far-off-screen resting cursor — the Gaussian peak contributes nothing (exp(-d2/…)≈0).
// BOUNDED (not 1e6): the parked cursor flows into the SHARED cursorSwirl's `exp(-d2/(2r²))`
// (waveField leaf — off-limits to edit), and a 1e6 sentinel makes d2≈2e12 → an exp() argument
// so extreme it overflows the int32 range-reduction of WebKit/Metal's fast-math exp() → NaN →
// the entire field NaNs → the SILENT blank concentric painted in Safari. At 1e3 the domain is
// still ≫ the well radius (the Gaussian resolves to 0) but every exp argument stays int32-safe.
const CURSOR_PARKED: Vec2 = { x: 1e3, y: 1e3 };

export interface UseConcentricOptions {
    config: ConcentricConfig;
    /** Resolve the field-value palette as OKLCh (the demo themes it; default warm-identity). */
    getPalette: () => OklchStop[];
    /** `"capture"` → renderAt-only (the deterministic π capture path). Default `"live"`. */
    mode?: "live" | "capture";
}

/** The uniform handle a consumer wires its lifecycle against (backend-agnostic). */
export interface ConcentricHandle {
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
    /** Tear down the renderer + release GPU/GL resources. */
    dispose: () => void;
}

/**
 * Mount the concentric renderer on `canvasRef`. The WebGPU primary + the WebGL2 fallback are
 * BOTH pure fullscreen fragment passes evaluating the SAME level-set topography (the ONE math
 * source `levelField.ts` `sampleHeight`), so the picker is the only seam. Returns the uniform
 * lifecycle handle.
 */
export function useConcentric(
    canvasRef: Ref<HTMLCanvasElement | null>,
    options: UseConcentricOptions,
): ConcentricHandle {
    const { config, getPalette } = options;
    const mode = options.mode ?? "live";

    // The shared pointer-physics field (NO own rAF — fed by the renderer frame via onFrame).
    const pointer = usePointerVelocityField({
        respectReducedMotion: config.respectReducedMotion,
    });

    // The transient cursor in DOMAIN space the setups read each frame (the cursor gravity
    // well). At rest it sits far off-screen so the Gaussian peak contributes nothing.
    let cursor: Vec2 = { ...CURSOR_PARKED };
    const getCursor = (): Vec2 => cursor;
    // The spring-eased traveling-wave envelope amplitude — ramps 0→1 on mount (the liquid-weight
    // ease-in with a slight overshoot), snaps to 0 under PRM (one static survey frame).
    let amp = 0;
    const getAmp = (): number => amp;
    // The velocity-HEAVE multiplier on the cursor well — pointer SPEED bulges the topography HARD
    // (a fast sweep heaves the terrain, at rest it settles to 1×). JS-side so it costs no uniform
    // lane; the well-engage rides a smoothstep so the heave grows with real weight (PRM → 1×).
    let wellScale = 1;
    // BG.W-CONCENTRIC-LEVELCURVES — the CONTINUOUS engage/release envelope (0..1). It ramps
    // toward 1 on pointer-enter and toward 0 on leave, critically-damped and frame-rate-
    // independent, so the topography HEAVE grows in and settles out with real weight — the
    // fix for the snap-on-enter POP + the pop-on-leave. It GATES the effective well depth.
    let wellEngage = 0;
    // The effective well multiplier the setups read = the velocity-heave × the engage envelope.
    // At rest OR fully released it resolves 0 (no bulge); fully engaged at rest it resolves 1.
    const getWellScale = (): number => wellScale * wellEngage;
    let lastFrameSec = 0;

    // Bind the pointer listeners on the canvas. A first hover wakes a parked loop on the
    // SAME frame (the no-delayed-response discipline — the GooBlob pointer-wake precedent).
    const onEnter = (): void => {
        pointer.onPointerEnter();
        if (config.interactive) handle?.wake();
    };
    const onMove = (e: Event): void => {
        pointer.onPointerMove(e as PointerEvent);
        if (config.interactive) handle?.wake();
    };
    // The pointer events bind on the WRAPPER (the canvas is `pointer-events: none` so the
    // gleam never eats the page's hit-testing; the wrapper carries the listeners).
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

    // The per-frame pointer hook the setups invoke from inside their frame callback. It
    // advances the field one renderer frame (the push-API tick), drives the spring-eased wave
    // amplitude, and derives the cursor in domain space (the gravity well that bulges the
    // topography toward the pointer — liquid-grid parity).
    function onFrame(timeSec: number): void {
        const deltaMs = lastFrameSec > 0 ? (timeSec - lastFrameSec) * 1000 : 16.7;
        lastFrameSec = timeSec;
        pointer.tick(deltaMs);

        // PRM → deterministic freeze: one static survey frame, the heave OFF (no live velocity,
        // no engage ramp) — the tick(0) discipline mirrored onto the cursor + envelope.
        if (handle?.reducedMotion) {
            amp = 0;
            wellScale = 1;
            wellEngage = 0;
            cursor = { ...CURSOR_PARKED };
            return;
        }

        // Drive the spring-eased traveling-wave envelope amplitude (the liquid-weight inertia).
        const ampTarget = 1.06;
        amp += (ampTarget - amp) * 0.04;
        if (amp > 1) amp = 1 + (amp - 1) * 0.85;

        // The CONTINUOUS engage/release envelope — critically-damped toward 1 (engaged) or 0
        // (released), frame-rate-independent so a 60/120Hz renderer settles identically. This
        // is the SOLE gate on the well depth (getWellScale = wellScale × wellEngage), so the
        // bulge grows in on enter and DEFLATES IN PLACE on leave — never a snap or a pop.
        const engaged = config.interactive && pointer.active.value;
        const engageTarget = engaged ? 1 : 0;
        const engageK = 1 - Math.exp(-deltaMs / WELL_ENGAGE_TAU_MS);
        wellEngage += (engageTarget - wellEngage) * engageK;

        if (!config.interactive) {
            cursor = { ...CURSOR_PARKED };
            wellScale = 1;
            return;
        }

        if (engaged) {
            // Map the normalized pointer (0..1, y-down) → domain space (-1..1, y-up). The
            // velocity LEADS the well a hair (the gravity trails the cursor — liquid weight).
            const sp = pointer.smoothedPosition.value;
            const vel = pointer.velocity.value;
            // The ACCELERATION axis (the second derivative) — the flick-anticipation that leads
            // the well a HAIR further on a fast direction-change (the impulse steady velocity misses).
            const acc = pointer.acceleration.value;
            const lead = 0.1;
            const accLead = 0.04;
            const canvas = canvasRef.value;
            const aspect = (canvas?.width || 1) / Math.max(canvas?.height || 1, 1);
            cursor = {
                x: ((sp.x * 2 - 1) + vel.x * lead + acc.x * accLead) * aspect,
                y: -(sp.y * 2 - 1) - vel.y * lead - acc.y * accLead,
            };

            // The velocity-HEAVE — pointer SPEED scales the well depth/radius (morph-more-on-move).
            // A smoothstep on the velocity magnitude gives the heave real weight (a pre-dip→overshoot
            // feel the monotone spring can't), saturating so a flick can't blow the well out.
            const speed = Math.hypot(vel.x, vel.y);
            const s = Math.min(speed / 1.2, 1); // normalize a fast sweep toward the ceiling
            const ramp = s * s * (3 - 2 * s); // smoothstep — C1-smooth engage
            // The flick-BURST — a DISTINCT one-shot impulse a fast FLICK injects (the transient the
            // velocity ramp can't carry: the burst decays on its own register). It rides ON TOP of
            // the velocity heave, BOUNDED at WELL_SCALE_MAX so no impulse can blow the well out.
            const burst = pointer.burst.value;
            wellScale = Math.min(
                1 + config.velocityHeave * ramp + config.velocityHeave * 0.6 * burst,
                WELL_SCALE_MAX,
            );
        } else {
            // Released — KEEP the last cursor position so the bulge deflates IN PLACE via the
            // engage envelope decaying to 0 (a cursor snap-to-parked would zero the Gaussian in
            // ONE frame = the pop-on-leave). Relax the velocity multiplier back to rest too.
            wellScale += (1 - wellScale) * engageK;
        }
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
                setupWGPU: createConcentricWGPUSetup({
                    canvas,
                    config,
                    getPalette,
                    getCursor,
                    getAmp,
                    getWellScale,
                    shouldContinue: () => true,
                    onFrame,
                }),
                setupGL: createConcentricGLSetup({
                    canvas,
                    config,
                    getPalette,
                    getCursor,
                    getAmp,
                    getWellScale,
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

    const h: ConcentricHandle = {
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
