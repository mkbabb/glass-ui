import { watch, onUnmounted, readonly, shallowRef, type Ref } from "vue";
import {
    createGpuSubstrate,
    type BackingSize,
    type RendererStatus,
} from "../../../composables/glass/webgpu/useGpuSubstrate";
import { pendingRenderer } from "../../../composables/glass/webgpu/rendererStatus";
import { resolveBudgetDpr } from "../../aurora/constants/budget";
import type { BlobConfig } from "../types";
import type { BlobMoodSystem } from "./useBlobMood";
import type { BlobPointer } from "./useBlobPointer";
import type { BlobSatelliteSystem } from "./useBlobSatellites";
import { buildMetaballProgram } from "./buildMetaballProgram";
import { uploadBlobUniforms } from "./uploadBlobUniforms";
import { createBlobWGPUSetup } from "./wgpuSetup";
import {
    createBlobSimulation,
    type BlobSettledFrame,
} from "./blobSimulation";

interface UseMetaballRendererOptions {
    canvasRef: Ref<HTMLCanvasElement | null>;
    /** The base color, ALREADY un-wrapped to a CONCRETE string by the SFC (DOM-free). */
    color: Ref<string>;
    /**
     * The Fresnel rim color, ALREADY un-wrapped to a CONCRETE string by the SFC
     * The renderer does not reach the DOM for the `var()` cascade;
     * the SFC's `resolveTokenColor` leaf does ALL un-wrapping before the renderer sees
     * it). A `var(--token)` rim arrives here already resolved to `rgb(...)`.
     */
    rimColor: Ref<string>;
    /**
     * The multi-stop palette, already unwrapped to concrete strings by the SFC.
     * An empty list falls back to the base color (`uStopCount <= 1`).
     */
    paletteStops: Ref<string[]>;
    /**
     * the OPTIONAL per-satellite explicit shades,
     * ALREADY un-wrapped to CONCRETE strings by the SFC (mirroring `paletteStops`).
     * Absent/EMPTY → the derived palette shade (the GL seam stays OFF, byte-identical).
     */
    satelliteColors?: Ref<string[]>;
    mood: BlobMoodSystem;
    pointer: BlobPointer;
    satellites: BlobSatelliteSystem;
    config: BlobConfig;
    /**
     * Reveal-bloom consumer door, paired with `AuroraRuntimeOptions.revealBloom`.
     * chromatic runtimes). The one-shot cold-first-VISIBLE `filter`-bloom
     * (`data-substrate-reveal` → `@keyframes substrate-reveal-bloom`). Defaults
     * `true` — the blob keeps a materialize entrance, but the keyframe is now
     * PALETTE-HONEST (brightness/saturate never dip below 1, viz-reveal.css), so it
     * never transits a `brightness<1`/`saturate<1` gray veil over
     * the chromatic field. A consumer or arrival-sync host
     * opts out with `false`.
     */
    revealBloom?: boolean;
}

/** The component-facing renderer controls — pause/resume + wake the demand loop. */
interface UseMetaballRendererReturn {
    pause: () => void;
    resume: () => void;
    /**
     * re-arm the demand-parked loop on demand (the public twin
     * of the internal `color`/`paletteStops` wake watchers). The SFC's pointer-wake
     * wire calls this so a first hover over a fully-parked blob (all satellites
     * orbiting → the quiescence gate has parked the rAF) repaints on the
     * SAME frame instead of waiting up to an orbit horizon for the next scheduled
     * satellite wake (root cause 2, BA-goo-3). It is the EXISTING substrate wake
     * handle — NO new rAF, NO second wake path (the single-substrate-loop invariant).
     */
    wake: () => void;
    /**
     * Public quiescence seam. `true`
     * IFF the engine is at rest: the mood is settled, the pointer is at rest, AND no
     * satellite is mid-transition (merging, absorbed, emerging, FISSIONING) —
     * i.e. zero in-flight fission beat. Derived from the SAME predicate the demand
     * gate (`shouldContinue`) reads to decide whether to park — NO parallel busy-flag
     * (the U3 single-signal discipline; the seam READS what the engine already knows,
     * no second physics). A consumer parks ITS OWN idle/arming logic only while
     * `settled` is true, so an armed-but-idle hero never freezes mid-split (the
     * value.js 2.7s-idle-vs-5.2s-fission-beat mismatch this closes). READ-ONLY — a
     * consumer observes it, never writes it.
     */
    settled: Readonly<Ref<boolean>>;
    /** Last quiescent frame actually drawn by either backend; `null` before settle. */
    settledFrame: Readonly<Ref<BlobSettledFrame | null>>;
    readonly rendererStatus: Readonly<Ref<RendererStatus>>;
}

/**
 * The Blob renderer composes `createGpuSubstrate`: the WebGPU-first
 * `metaball.wgsl` primary or the WebGL2
 * `metaball.frag.ts` fallback, selected ONCE by `navigator.gpu` feature-detect. Both
 * backends compose the same `createCanvasLifecycle` leaf, so demand-driven
 * scheduling + offscreen-park + live-PRM-freeze are byte-identical across backends.
 *
 * This module owns ONLY the metaball-specific concerns: compiling the shader, building
 * the quad + uniform cache (the WebGL2 `buildMetaballProgram` leaf) OR the WGSL pipeline
 * + the typed-struct uniform buffer (the WGSL `createBlobWGPUSetup` leaf), and the
 * per-frame engine upload derived from shared simulation state. `blobSimulation`
 * owns the clocks, quiescence, scheduled wake, and `resolveFrame(timeSec)` that returns the
 * settled
 * `BlobFrameState`; the WebGL2 `drawFrame` and the WGSL `frame` both call it, so the
 * physics is substrate-agnostic and only the upload+draw leg differs. The generic
 * lifecycle (context creation, the suspend/resume model, the demand-driven rAF loop, the
 * tab-visibility owner, the ResizeObserver, and the context-loss self-heal) lives in the
 * substrate; this renderer threads its behaviour through the substrate's
 * `setupGL`/`setupWGPU`/`frame`/`shouldContinue`/`resize`/`teardown` callbacks. It does
 * NOT call `getContext("webgl2")`/`navigator.gpu` itself (the single-bootstrap contract).
 *
 * Color is resolved INTERNALLY through the `/color` leaf (`cssToOklch →
 * oklchToGammaRgb`) — the GAMMA-sRGB triple fed straight into the base-color uniform
 * directly. The renderer is DOM-free: it never unwraps
 * a `var(--token)` — the SFC's `resolveTokenColor` leaf does that BEFORE handing
 * concrete strings here.
 */
export function useMetaballRenderer(
    options: UseMetaballRendererOptions,
): UseMetaballRendererReturn {
    const {
        canvasRef,
        color,
        rimColor,
        paletteStops,
        satelliteColors,
        mood,
        pointer,
        satellites,
        config,
    } = options;

    let canvasHandle: ReturnType<typeof createGpuSubstrate> | null = null;
    const rendererStatus = shallowRef<RendererStatus>(pendingRenderer("webgpu"));
    const simulation = createBlobSimulation({
        color,
        rimColor,
        paletteStops,
        satelliteColors,
        mood,
        pointer,
        satellites,
        config,
        getReducedMotion: () => canvasHandle?.reducedMotion ?? false,
        wake: () => canvasHandle?.wake(),
    });

    // the DPR policy the LEAF sizer consumes. The focal
    // goo-blob KEEPS resolveBudgetDpr() (2×, sharp silhouette — distinct from aurora's
    // sub-2× wash ceiling); the `half` quality axis halves the backing buffer (~4×
    // fragment savings, the soft FBM/AA edge hides the interpolation). The leaf measures
    // the LAID-OUT box (gBCR, never clientWidth/300×150) and sizes the backing to
    // round(gBCR × dprPolicy) — the consumer no longer self-measures.
    const blobDprPolicy = (): number =>
        resolveBudgetDpr() * (config.quality === "half" ? 0.5 : 1.0);

    function start(canvas: HTMLCanvasElement) {
        canvasHandle = createGpuSubstrate(canvas, {
            dprPolicy: blobDprPolicy,
            // P043/P054 — one lifecycle owns the IO warm-band park.
            composeIntersectionPark: true,
            intersectionRootMargin: "200px",
            // Blob keeps reveal bloom enabled for its materialize entrance,
            // but the `substrate-reveal-bloom` keyframe is now PALETTE-HONEST (no
            // brightness<1/saturate<1 veil over the chromatic field — viz-reveal.css).
            // A consumer opts out via `revealBloom: false`.
            revealBloom: options.revealBloom ?? true,
            contextAttrs: {
                alpha: true,
                premultipliedAlpha: true,
                antialias: false,
                preserveDrawingBuffer: false,
            },
            // the WGSL primary path (`metaball.wgsl`).
            // The picker arms this when `navigator.gpu` is present; the renderer's SHARED
            // `resolveFrame`/`shouldContinue` closures drive the simulation identically
            // across backends. `metaball.frag.ts` stays the byte-untouched WebGL2
            // fallback.
            setupWGPU: createBlobWGPUSetup({
                canvas,
                config,
                pointer,
                satellites,
                resolveFrame: simulation.resolveFrame,
                shouldContinue: simulation.shouldContinue,
                onResize: simulation.recordBackingSize,
                onDraw: simulation.recordDraw,
            }),
            // Build the program + quad + uniform cache on a fresh context. The substrate
            // calls this on arm() AND on every webglcontextrestored, so a GPU context loss
            // self-heals — the closures below close over the fresh `gl` + program handles.
            setupGL: (gl) => {
                const { prog, vs, fs, vao, buf, locs } = buildMetaballProgram(gl);

                // upload-only: the leaf already sized the backing
                // (round(gBCR × blobDprPolicy)); the closure only uploads the viewport.
                function resize(s?: BackingSize) {
                    if (s) simulation.recordBackingSize(s);
                    gl.viewport(0, 0, s?.w ?? canvas.width, s?.h ?? canvas.height);
                }

                function drawFrame(timeSec: number) {
                    const frame = simulation.resolveFrame(timeSec);
                    uploadBlobUniforms(
                        gl,
                        prog,
                        vao,
                        locs,
                        canvas,
                        config,
                        pointer,
                        satellites,
                        frame,
                    );
                    simulation.recordDraw(frame);
                }

                return {
                    frame: drawFrame,
                    shouldContinue: simulation.shouldContinue,
                    resize,
                    teardown: () => {
                        gl.deleteProgram(prog);
                        gl.deleteShader(vs);
                        gl.deleteShader(fs);
                        gl.deleteBuffer(buf);
                        gl.deleteVertexArray(vao);
                        // The WEBGL_lose_context release is the substrate's job.
                    },
                };
            },
            onStatus: (status) => (rendererStatus.value = status),
        });

        // The WebGPU path needs the async device-acquire (`armAsync`); the WebGL2
        // fallback's `armAsync` resolves immediately off the synchronous `arm()`, so this
        // one call arms BOTH backends. Fire-and-forget — a device-init failure is
        // surfaced by the substrate's own `onInitError`; the loop simply never arms.
        void canvasHandle.armAsync().catch(() => undefined);
    }

    watch(
        canvasRef,
        (canvas) => {
            if (canvas && !canvasHandle) start(canvas);
        },
        { immediate: true },
    );

    // Repaint on a color change while parked (reduced-motion, paused) so the new
    // color lands without a perpetual loop. Palette stops
    // wake the loop too, so a seed/harmony-driven `paletteStops` change repaints the
    // hero body even when the demand loop has parked at rest.
    watch(color, () => canvasHandle?.wake());
    watch(rimColor, () => canvasHandle?.wake());
    watch(paletteStops, () => canvasHandle?.wake(), { deep: true });
    if (satelliteColors) {
        watch(satelliteColors, () => canvasHandle?.wake(), { deep: true });
    }

    onUnmounted(() => {
        simulation.dispose();
        canvasHandle?.dispose();
        canvasHandle = null;
    });

    return {
        pause: () => {
            simulation.pause();
            canvasHandle?.suspend("manual");
        },
        resume: () => {
            simulation.resume();
            canvasHandle?.resume("manual");
        },
        // the public wake handle (the SFC's pointer-wake wire).
        // Re-arms the demand-parked loop via the SAME substrate `wake()` the
        // color/paletteStops watchers above call (no parallel rAF). A wake on an
        // already-running loop is a no-op; a wake on a parked-at-rest loop re-arms
        // it so the first hover repaints same-frame.
        wake: () => canvasHandle?.wake(),
        // the read-only quiescence seam (see the interface doc). A
        // plain ref widened to `Readonly<Ref<boolean>>` so the consumer observes
        // `.value` but the type forbids writing it (the single writer is
        // `shouldContinue`, the U3 single-signal discipline).
        settled: simulation.settled,
        settledFrame: simulation.settledFrame,
        rendererStatus: readonly(rendererStatus),
    };
}
