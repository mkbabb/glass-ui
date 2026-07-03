// BC.W-VIZ-DOTFLOW — the public composable: the studio handle + the lifecycle wiring over
// the WebGPU-first substrate (with the WebGL2 FRAGMENT fallback) + the shared pointer field.
//
// `useDotFlowField(canvasRef, options)` composes the `createGpuSubstrate` picker — the
// `setupWGPU` compute+render two-pass primary WHERE WebGPU is supported, else the `setupGL`
// WebGL2 fullscreen-fragment fallback (the Canvas2D point-cloud is GONE — the retopology
// made the field fragment-friendly; "no canvas anywhere", §E). It wires the offscreen
// pause + the `DockBackgroundToggle` WCAG-2.2.2 pause/resume seam + `wake()` on pointer, and
// exposes the uniform `DotFlowFieldHandle`. The renderer owns the frame loop (the canvas
// lifecycle leaf); this composable re-implements ZERO scheduling.
//
// THE POINTER (BC.W-VIZ-INTERACTION). When `config.interactive`, the lattice ripples toward
// the cursor: useDotFlowField composes the SHARED `usePointerVelocityField` (NEVER a second
// rAF — the field is FED `tick(delta)` from inside the renderer's existing `frame` callback
// via the `onFrame` setup hook) and reads BOTH the steady-drag VELOCITY and the flick BURST
// (the accel axis — the user's "velocity AND acceleration" ask) into a transient
// displacement-push about the pointer (the `config.interactive` arm raises the local
// `displaceAmp` along the velocity, the burst fires a brief brightness bloom). The
// pointermove/enter/leave listeners bind on the wrapper; PRM freezes the field (the
// usePointerVelocityField `tick(0)` discipline). The pointer push rides a closed-over scalar
// the setups read each frame; the consumer config is never mutated.

import { onScopeDispose, type Ref } from "vue";
import {
    createGpuSubstrate,
    type GpuBackend,
} from "../../../../composables/glass/webgpu/useGpuSubstrate";
import { usePointerVelocityField } from "../../../../composables/motion/usePointerVelocityField";
import { resolveBudgetDpr } from "../../aurora/constants/budget";
import type { OklchStop } from "../../../../composables/color";
import type { FlowFieldConfig } from "../constants";
import { createFlowWGPUSetup, createFlowGLSetup } from "./useFlowParticles";
import {
    FLOW_DOMAIN_HALF,
    FLOW_POINTER_REST,
    type FlowPointerState,
} from "./uniformBridgeWGPU";

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
 * The transient pointer-push the interactive arm injects into the lattice — a closed-over
 * scalar the setups blend into the config each frame (the consumer config is never
 * mutated). The push raises the local displacement along the velocity + a brightness bloom
 * on a flick burst, decaying back to the calm lattice.
 */
interface PointerPush {
    /** A multiplier on `displaceAmp` (1 at rest, >1 while dragging — the velocity ripple). */
    displaceBoost: number;
    /** A brightness bloom 0..1 a flick fires (the accel/burst axis). */
    bloom: number;
}

/**
 * Mount the dot-flow-field renderer on `canvasRef`. The WebGPU primary runs the
 * compute+render two-pass over the anchored lattice; the WebGL2 fallback evaluates the SAME
 * `flowField.ts` field as a fullscreen fragment pass (the ONE math source). Returns the
 * uniform lifecycle handle.
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

    // The transient pointer-push (closed over; the setups read it each frame, never the
    // consumer config). The renderer blends it into the effective config in onFrame.
    const push: PointerPush = { displaceBoost: 1, bloom: 0 };

    // ── BD.W-DOTFLOW-AURORA-CURRENT — the live cursor VORTEX state the flow kernel reads
    //    each frame (domain space). The pointer field is in canvas-relative [0,1]; map it to
    //    the domain [-half,half]² (NDC y flips). Velocity → domain/sec (× 2·half). Inert when
    //    the pointer is inactive (the vortex is off — PRM/no-hover REDs the swirl correctly).
    const pointerState: FlowPointerState = { ...FLOW_POINTER_REST };
    const getPointer = (): FlowPointerState => {
        if (!config.interactive || !pointer.active.value) {
            pointerState.active = 0;
            return pointerState;
        }
        const p = pointer.position.value;
        const v = pointer.velocity.value;
        const k = 2 * FLOW_DOMAIN_HALF;
        pointerState.cursorX = (p.x * 2 - 1) * FLOW_DOMAIN_HALF;
        pointerState.cursorY = (1 - p.y * 2) * FLOW_DOMAIN_HALF;
        pointerState.velX = v.x * k;
        pointerState.velY = -v.y * k;
        pointerState.burst = pointer.burst.value;
        pointerState.active = 1;
        return pointerState;
    };

    // The EFFECTIVE config the setups read each frame — a shallow clone of the consumer
    // config with the pointer push blended in (so the lattice ripples toward the cursor
    // WITHOUT mutating the reactive consumer config).
    const effective: FlowFieldConfig = { ...config };
    const getEffective = (): FlowFieldConfig => {
        // Re-read the live config each frame so a studio edit reaches the buffer.
        Object.assign(effective, config);
        effective.displaceAmp = config.displaceAmp * push.displaceBoost;
        // The flick bloom lifts the brightness contrast briefly (the accel axis paints).
        effective.contrast = config.contrast * (1 + push.bloom * 0.8);
        return effective;
    };

    let handle: ReturnType<typeof createGpuSubstrate> | null = null;
    let lastFrameSec = 0;

    // The per-frame pointer hook the setups invoke from inside their frame callback (the
    // no-own-rAF discipline — the renderer's loop feeds the push-API tick). It advances the
    // field one renderer frame AND derives the transient push from BOTH velocity + burst.
    function onFrame(timeSec: number): void {
        const deltaMs = lastFrameSec > 0 ? (timeSec - lastFrameSec) * 1000 : 16.7;
        lastFrameSec = timeSec;
        pointer.tick(deltaMs);

        if (!config.interactive || !pointer.active.value) {
            // Decay any residual push back to the calm lattice.
            push.displaceBoost = push.displaceBoost + (1 - push.displaceBoost) * 0.1;
            push.bloom *= 0.9;
            return;
        }
        // The steady-drag VELOCITY raises the local displacement (the ripple pushing
        // through the lattice); the flick BURST (the accel axis) fires a brightness bloom.
        const speed = pointer.speed.value;
        const targetBoost = 1 + Math.min(2.5, speed * 3.0);
        push.displaceBoost = push.displaceBoost + (targetBoost - push.displaceBoost) * 0.2;
        push.bloom = Math.max(push.bloom * 0.9, pointer.burst.value);
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
                config: getEffective(),
                getPalette,
                getPointer,
                shouldContinue: () => true,
                onFrame,
            };
            // The setups re-read the effective config each frame via getEffective(); the
            // closure captures the SAME `effective` object the deps reference, so the
            // per-frame push reaches the uniform buffer.
            handle = createGpuSubstrate(canvas, {
                mode,
                respectReducedMotion: config.respectReducedMotion,
                // BG.W-VIZ-RESIZE-ADOPT — the leaf owns backing measurement + sizing
                // (round(gBCR × dprPolicy)); every setup's `resize` is upload-only.
                dprPolicy: resolveBudgetDpr,
                // BG.W-VIZ-REVEAL-BLOOM — the one-shot cold-first-VISIBLE entrance bloom.
                revealBloom: true,
                setupWGPU: createFlowWGPUSetup({
                    ...setupDeps,
                    config: effective,
                    onFrame: (t) => {
                        onFrame(t);
                        getEffective();
                    },
                }),
                setupGL: createFlowGLSetup({
                    ...setupDeps,
                    config: effective,
                    onFrame: (t) => {
                        onFrame(t);
                        getEffective();
                    },
                }),
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
