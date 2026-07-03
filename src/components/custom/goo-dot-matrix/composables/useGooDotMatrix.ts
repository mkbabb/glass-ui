// BC.W-VIZ-HYBRID — the goo-dot-matrix public composable: the studio handle + the lifecycle
// wiring over the WebGPU-first substrate (with the WebGL2 Register-A fallback) + the shared
// field-sim + the shared pointer field.
//
// THE HYBRID. `useGooDotMatrix(canvasRef, options)` composes the metaball SDF FIELD (the
// byte-untouched goo-blob field-sim — `useBlobMood`/`useBlobPointer`/`useBlobSatellites` +
// the `resolveFrame` advance, the SHARED simulation) AND renders it as a DOT MATRIX via the
// dot-stamp shaders (Register A — the field-driven dot, the §T4 default). It composes the
// `createGpuSubstrate` picker — the `setupWGPU` dot-stamp primary WHERE WebGPU is supported,
// else the `setupGL` WebGL2 dot-stamp fallback (born-GPU; no Canvas2D path) — over the ONE
// `createCanvasLifecycle` leaf, so the offscreen-pause / live-PRM freeze / demand loop /
// device.lost self-heal are inherited. The renderer owns the frame loop; this composable
// re-implements ZERO scheduling (no own rAF).
//
// THE FIELD (no re-fork). The field MATH is the byte-untouched goo-blob `sceneDistG` SDF
// (SPLICED into the dot-stamp shaders). The field UNIFORMS are packed by the goo-blob
// `packBlobWGPUUniforms` (WGPU binding0) / `uploadBlobUniforms` (GL) — the SHARED field SoT,
// REUSED. The dot-grid lanes ride the SEPARATE binding1 / dot uniforms (`packGooDotUniforms`).
//
// THE POINTER (BC.W-VIZ-INTERACTION). When `config.interactive`, the dot field reacts to the
// cursor: the FIELD-lean is the goo-blob field's own `uPointer` deformation (KEEP — the body
// + satellites + trail lean toward the cursor as ONE), and the DOT-cursor influence (the §T7
// Metal dotted-bg idiom — near-cursor dots swell + brighten) rides the dot lanes. The accel/
// flick BURST consumes the SHARED `usePointerVelocityField` (BB.B4 — the second derivative,
// NEVER a second rAF: the field is FED `tick(delta)` from inside the renderer frame). PRM
// freezes the field (`tick(0)`) + the substrate live-PRM one-static-frame park.

import { onScopeDispose, ref, type Ref } from "vue";
import {
    createGpuSubstrate,
    type GpuBackend,
} from "../../../../composables/glass/webgpu/useGpuSubstrate";
import { usePointerVelocityField } from "../../../../composables/motion/usePointerVelocityField";
import { useIntersectionPause } from "../../../../composables/motion/useIntersectionPause";
import { resolveBudgetDpr } from "../../aurora/constants/budget";
import { cssToOklch, oklchToGammaRgb } from "../../../../composables/color";
import {
    useBlobMood,
    useBlobPointer,
    useBlobSatellites,
    type BlobConfig,
} from "../../goo-blob";
import type { BlobFrameState } from "../../goo-blob/composables/uploadBlobUniforms";
import type { GooDotConfig } from "../constants";
import {
    pointerModeSign,
    restingDotPointer,
    type GooDotPointerState,
} from "./uniformBridgeWGPU";
// The GPU/GL setup is carved off the composable (BG.W-GOODOT-SETUP-SPLIT, the F9 no-god-module
// re-drain): the per-frame `setupWGPU`/`setupGL` draw closures live in the gooDotFrame.ts leaf
// (which calls the one-time RESOURCE construction in gooDotSetup.ts). The composable hands the
// builders a `GooDotFrameContext` (the sim + the SHARED field-advance + the dot-push + the demand
// gate); the field SoT reads there.
import {
    buildGooDotWGPUSetup,
    buildGooDotGLSetup,
    type GooDotFrameContext,
} from "./gooDotFrame";

/** A calm 0..1 breathing pulse on the sim clock — the Move 4b lattice-squash drive (the same
 * slow-throb register the field's `breath` carries, kept JS-side so the squash rides one source). */
function breathPulse(simTimeMs: number): number {
    return 0.5 + 0.5 * Math.sin((simTimeMs / 1000) * 0.5);
}

/** The deterministic mid-merge clock (ms) the PRM/static frame pins to — the satellite phase
 * where the neck band is present (a merge crossing for the default seed), NOT the t=0 separated
 * state. Picked so the frozen composite shows a FILLED, necking field. */
const MID_MERGE_CLOCK_MS = 4200;

export interface UseGooDotMatrixOptions {
    config: GooDotConfig;
    /** `"capture"` → renderAt-only (the deterministic π capture path). Default `"live"`. */
    mode?: "live" | "capture";
}

/** The uniform handle a consumer wires its lifecycle against (backend-agnostic). */
export interface GooDotMatrixHandle {
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

/**
 * Mount the goo-dot-matrix renderer on `canvasRef`. The WebGPU primary runs the dot-stamp
 * fragment over the byte-untouched goo-blob field; the WebGL2 fallback runs the SAME dot-stamp
 * (the ONE field, the ONE dot-grid output). Returns the uniform lifecycle handle.
 */
export function useGooDotMatrix(
    canvasRef: Ref<HTMLCanvasElement | null>,
    options: UseGooDotMatrixOptions,
): GooDotMatrixHandle {
    const { config } = options;
    const mode = options.mode ?? "live";
    // BD.W-VIZ-BROKEN-FIX D2 — read `.field` LIVE each frame (the config IS a forward-through
    // Proxy over the live source; a captured `const field = config.field` snapshot froze it,
    // so a variant/preset swap never reached the per-frame uniform packs). The satellite
    // SETUP-time bind below keeps the snapshot (the satellite system re-reads the field's
    // atoms via its own reactive seam — the goo-blob precedent).
    const getField = (): BlobConfig => config.field;
    const field = config.field;

    // The shared field-sim (the byte-untouched goo-blob systems — the SHARED simulation).
    const wrapperRef = ref<HTMLElement | null>(null);
    const mood = useBlobMood();
    const pointer = useBlobPointer(wrapperRef);
    const satellites = useBlobSatellites(field, "goo-dot");

    // The shared viz-pointer-physics field (NO own rAF — fed by the renderer frame).
    const pointerField = usePointerVelocityField({
        respectReducedMotion: config.respectReducedMotion,
    });

    // The transient dot-cursor push the interactive arm writes (closed over; the setups read
    // it each frame, never the consumer config). Position is field-uv [-0.5, 0.5].
    const dotPush: GooDotPointerState = restingDotPointer();

    // The memoised /color resolver (the ONE color core — cssToOklch → oklchToGammaRgb).
    const colorCache = new Map<string, [number, number, number]>();
    function resolveColor(css: string): [number, number, number] {
        const cached = colorCache.get(css);
        if (cached) return cached;
        const rgb = oklchToGammaRgb(cssToOklch(css));
        if (colorCache.size > 256) colorCache.clear();
        colorCache.set(css, rgb);
        return rgb;
    }
    // The palette → CSS string the field reads (the warm-cream identity by default).
    const paletteCss = config.palette.map((s) => `oklch(${s.L} ${s.C} ${s.h})`);
    const baseColorCss = paletteCss[paletteCss.length - 1] ?? "oklch(0.92 0.03 78)";

    let handle: ReturnType<typeof createGpuSubstrate> | null = null;
    let paused = false;
    let lastTimeSec = 0;
    let simTimeMs = 0;
    // Whether the PRM/static frame has already been pinned to the mid-merge clock (one-shot).
    let midMergePinned = false;

    // ── The SHARED field-advance (substrate-agnostic; the goo-blob resolveFrame shape) ──
    // Advances the mood / pointer / satellite systems on the tempo-scaled step + feeds the
    // shared pointer-velocity field (the accel/flick-burst leg). The field uniforms are
    // packed off the returned BlobFrameState; the dot-cursor push is derived here.
    function resolveFrame(timeSec: number): BlobFrameState {
        const rawDtMs = lastTimeSec ? (timeSec - lastTimeSec) * 1000 : 16;
        lastTimeSec = timeSec;
        const dtMs = Math.max(0, Math.min(rawDtMs, 50));

        const reduced = handle?.reducedMotion ?? false;
        const tempo = reduced || paused ? 0 : getField().tempo;
        const stepMs = tempo * dtMs;
        simTimeMs += stepMs;

        // BD.W-GOODOT-LIQUID-FIELD — the PRM/static frame is pinned to a deterministic MID-MERGE
        // clock (NOT t=0, where the satellite is maximally separated). On the first reduced/frozen
        // frame we seed the sim clock to a merge-phase constant so the held composite shows the
        // neck band present + the field FILLED (the presence floor) + legible — strictly better
        // than a frozen speck. The twinkle/flow/squash stay zeroed below (no advection in a still).
        if (reduced && !midMergePinned) {
            simTimeMs = MID_MERGE_CLOCK_MS;
            midMergePinned = true;
        }
        if (!reduced) midMergePinned = false;

        // Feed the shared pointer field from THIS frame callback (NO own rAF — the one-loop
        // discipline). Reads BOTH velocity AND acceleration (the accel/flick-burst leg).
        if (tempo > 0 && pointer.active.value) {
            const p = pointer.pointer.value;
            pointerField.setPointer(p.x * 0.5 + 0.5, p.y * 0.5 + 0.5);
        }
        pointerField.tick(tempo === 0 ? 0 : dtMs);

        // Advance the simulation on the tempo-scaled step.
        if (!reduced) {
            mood.update({
                pointerActive: pointer.active.value,
                clicked: pointer.consumeClick(),
                idleMs: pointer.idleMs(),
            });
        }
        mood.tick(stepMs);
        if (reduced) {
            pointer.rest();
        } else {
            pointer.tick(stepMs);
        }
        satellites.tick(simTimeMs, mood.params.value);

        // The §T7 dot-cursor push (the LOCAL dot influence on TOP of the field-lean). The
        // velocity/burst drive the bloom; the smoothed pointer is the influence anchor.
        if (config.interactive && pointer.active.value && tempo > 0) {
            const p = pointer.pointer.value;
            dotPush.x = p.x * 0.5; // [-1,1] → field-uv [-0.5,0.5]
            dotPush.y = p.y * 0.5;
            dotPush.active += (1 - dotPush.active) * 0.2;
            // The accel-burst bloom (the flick term — a sharp accel spike fires a one-shot
            // brightness/swell that decays). pointerModeSign keeps the type-graph honest.
            void pointerModeSign(config.pointerMode);
            dotPush.bloom = Math.max(dotPush.bloom * 0.9, pointerField.burst.value);
        } else {
            dotPush.active += (0 - dotPush.active) * 0.12;
            dotPush.bloom *= 0.9;
        }

        // BD.W-GOODOT-LIQUID-FIELD Move 4b — the liquid-lattice clock + volume-preserving squash.
        // The φ-twinkle reads simTime; the squash leans the cell on the pulse + the pointer
        // burst (X·Y ≈ 1 via the shader's `x/sq, y*sq`). PRM/park hold a static composite.
        dotPush.timeSec = reduced ? 0 : simTimeMs / 1000;
        const pulse = reduced ? 0 : breathPulse(simTimeMs);
        dotPush.latticeSquash = 1 + pulse * 0.08 + dotPush.bloom * 0.18;

        return {
            params: mood.params.value,
            rgb: resolveColor(baseColorCss),
            simTimeMs,
            timeSec,
            resolveColor,
            rimColor: getField().surface.rimColor,
            paletteStops: paletteCss,
        };
    }

    function shouldContinue(): boolean {
        if (paused) return false;
        // The dot field is alive while the sim is (mood transitioning, pointer/spring moving,
        // a satellite mid-merge) OR the dot-cursor push is decaying.
        return (
            !mood.isSettled() ||
            !pointer.isAtRest() ||
            !satellites.isQuiescent() ||
            dotPush.active > 1e-3 ||
            dotPush.bloom > 1e-3
        );
    }

    // ── The setup context (BG.W-GOODOT-SETUP-SPLIT) ──
    // The closed-over runtime state the carved gooDotFrame.ts draw closures read each frame:
    // the sim systems + the SHARED field-advance + the dot-push + the demand gate. The two
    // `setupWGPU`/`setupGL` builders own the resource construction (gooDotSetup.ts) + the draw.
    const frameCtx: GooDotFrameContext = {
        config,
        getField,
        pointer,
        satellites,
        dotPush,
        resolveFrame,
        shouldContinue,
    };

    // Park a scrolled-offscreen surface (the IntersectionObserver fallback seam).
    useIntersectionPause(
        canvasRef,
        {
            pause: () => handle?.suspend("off-screen-io"),
            resume: () => handle?.resume("off-screen-io"),
        },
        { rootMargin: "200px", pauseWhenHidden: false },
    );

    const ensure = (): ReturnType<typeof createGpuSubstrate> | null => {
        const canvas = canvasRef.value;
        if (!canvas) return null;
        if (!handle) {
            wrapperRef.value = canvas.parentElement ?? canvas;
            handle = createGpuSubstrate(canvas, {
                mode,
                // BG.W-VIZ-RESIZE-ADOPT — the leaf owns backing measurement + sizing
                // (round(gBCR × dprPolicy)); both setups' `resize` are upload-only.
                dprPolicy: resolveBudgetDpr,
                // BG.W-VIZ-REVEAL-BLOOM — the one-shot cold-first-VISIBLE entrance bloom.
                revealBloom: true,
                contextAttrs: {
                    alpha: true,
                    premultipliedAlpha: true,
                    antialias: false,
                    preserveDrawingBuffer: false,
                },
                respectReducedMotion: config.respectReducedMotion,
                setupWGPU: buildGooDotWGPUSetup(canvas, frameCtx),
                setupGL: buildGooDotGLSetup(canvas, frameCtx),
            });
            void handle.armAsync();
        }
        return handle;
    };
    queueMicrotask(() => ensure());

    const h: GooDotMatrixHandle = {
        get backend(): GpuBackend {
            return ensure()?.backend ?? "webgpu";
        },
        pause: () => {
            paused = true;
            ensure()?.suspend("manual");
        },
        resume: () => {
            paused = false;
            ensure()?.resume("manual");
        },
        wake: () => ensure()?.wake(),
        renderAt: (t) => ensure()?.renderAt(t),
        get reducedMotion() {
            return handle?.reducedMotion ?? false;
        },
        dispose: () => {
            pointerField.dispose();
            handle?.dispose();
            handle = null;
        },
    };
    onScopeDispose(() => h.dispose());
    return h;
}
