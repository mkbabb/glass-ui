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
import type { WebGPUCanvasFrame } from "../../../../composables/glass/webgpu/useWebGPUCanvas";
import type { WebGLCanvasFrame } from "../../../../composables/glass/webgl/useWebGLCanvas";
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
import { packBlobWGPUUniforms } from "../../goo-blob/composables/uniformBridgeWGPU";
import {
    uploadBlobUniforms,
    type BlobFrameState,
} from "../../goo-blob/composables/uploadBlobUniforms";
import type { GooDotConfig } from "../constants";
import {
    packGooDotUniforms,
    pointerModeSign,
    restingDotPointer,
    WELD_LO,
    WELD_HI,
    type GooDotPointerState,
} from "./uniformBridgeWGPU";
// The one-time GPU/GL RESOURCE construction is carved into the sibling gooDotSetup.ts leaf
// (the no-god-module re-drain); the per-frame pack+draw closures (the field/dot-grid uniform
// writes + the draw) stay HERE so the SHARED field SoT + the dot-grid extend read at the call site.
import {
    GOO_DOT_LABEL,
    createGooDotWGPUResources,
    createGooDotGLResources,
} from "./gooDotSetup";

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

    // ── The WGPU setup (Register A: the dot-stamp fragment over the spliced field) ──
    // The one-time pipeline/buffer/bind-group build lives in the carved gooDotSetup.ts leaf;
    // the per-frame pack+draw closure stays HERE (the field SoT + dot-grid extend at the call site).
    function buildWGPUSetup(
        canvas: HTMLCanvasElement,
    ): (
        device: GPUDevice,
        context: GPUCanvasContext,
        format: GPUTextureFormat,
    ) => WebGPUCanvasFrame {
        return function setupWGPU(device, context, format) {
            const res = createGooDotWGPUResources(device, format);

            function resize(): void {
                const dpr = resolveBudgetDpr();
                const cssW = canvas.clientWidth || getField().geometry.canvasSize;
                const cssH = canvas.clientHeight || getField().geometry.canvasSize;
                const w = Math.max(1, Math.round(cssW * dpr));
                const h = Math.max(1, Math.round(cssH * dpr));
                if (canvas.width !== w || canvas.height !== h) {
                    canvas.width = w;
                    canvas.height = h;
                }
            }

            function frame(timeSec: number): void {
                const frameState = resolveFrame(timeSec);
                // Field lanes (binding0) — the goo-blob SoT, REUSED.
                packBlobWGPUUniforms(
                    res.fieldScratch,
                    canvas,
                    getField(),
                    pointer,
                    satellites,
                    frameState,
                );
                device.queue.writeBuffer(res.fieldBuffer, 0, res.fieldScratch.buffer);
                // Dot-grid lanes (binding1) — the extend.
                packGooDotUniforms(
                    res.dotScratch,
                    config,
                    { w: canvas.width || 1, h: canvas.height || 1 },
                    resolveBudgetDpr(),
                    dotPush,
                );
                device.queue.writeBuffer(res.dotBuffer, 0, res.dotScratch.buffer);

                const groundOn = config.fieldGround === "warm";
                const view = context.getCurrentTexture().createView();
                const encoder = device.createCommandEncoder({ label: `${GOO_DOT_LABEL} frame` });

                // Move 4a — pass 1: the warm ground (loadOp:"clear"), ONLY when fieldGround:"warm".
                // The dot pass then loads OVER it; transparent skips straight to the clear dot pass.
                if (groundOn) {
                    res.groundScratch[0] = frameState.simTimeMs / 1000;
                    res.groundScratch[1] = (canvas.width || 1) / (canvas.height || 1);
                    device.queue.writeBuffer(res.groundBuffer, 0, res.groundScratch.buffer);
                    const gPass = encoder.beginRenderPass({
                        colorAttachments: [
                            {
                                view,
                                clearValue: { r: 0, g: 0, b: 0, a: 0 },
                                loadOp: "clear",
                                storeOp: "store",
                            },
                        ],
                    });
                    gPass.setPipeline(res.groundPipeline);
                    gPass.setBindGroup(0, res.groundBindGroup);
                    gPass.draw(3, 1, 0, 0);
                    gPass.end();
                }

                // Pass 2: the dot stamp. Loads over the ground if present, else clears.
                const pass = encoder.beginRenderPass({
                    colorAttachments: [
                        {
                            view,
                            clearValue: { r: 0, g: 0, b: 0, a: 0 },
                            loadOp: groundOn ? "load" : "clear",
                            storeOp: "store",
                        },
                    ],
                });
                pass.setPipeline(res.pipeline);
                pass.setBindGroup(0, res.bindGroup);
                pass.draw(3, 1, 0, 0);
                pass.end();
                device.queue.submit([encoder.finish()]);
            }

            return {
                frame,
                shouldContinue,
                resize,
                teardown: () => {
                    res.fieldBuffer.destroy();
                    res.dotBuffer.destroy();
                    res.groundBuffer.destroy();
                },
            };
        };
    }

    // ── The GL setup (Register A: the dot-stamp fragment; the WebGL2 fallback) ──
    function buildGLSetup(
        canvas: HTMLCanvasElement,
    ): (gl: WebGL2RenderingContext) => WebGLCanvasFrame {
        return function setupGL(gl) {
            const res = createGooDotGLResources(gl);
            const { prog, vao, locs, dU } = res;

            function resize(): void {
                const dpr = resolveBudgetDpr();
                const cssW = canvas.clientWidth || getField().geometry.canvasSize;
                const cssH = canvas.clientHeight || getField().geometry.canvasSize;
                const w = Math.max(1, Math.round(cssW * dpr));
                const h = Math.max(1, Math.round(cssH * dpr));
                if (canvas.width !== w || canvas.height !== h) {
                    canvas.width = w;
                    canvas.height = h;
                }
                gl.viewport(0, 0, canvas.width, canvas.height);
            }

            function frame(timeSec: number): void {
                const frameState = resolveFrame(timeSec);
                const groundOn = config.fieldGround === "warm";

                // Move 4a — pass 1: the warm ground (the WebGL2 tail). Clear, blend OFF, draw the
                // opaque gradient quad; the dot pass then blends over it.
                if (groundOn) {
                    gl.disable(gl.BLEND);
                    gl.clearColor(0, 0, 0, 0);
                    gl.clear(gl.COLOR_BUFFER_BIT);
                    gl.useProgram(res.ground.prog);
                    gl.bindVertexArray(res.ground.vao);
                    gl.uniform1f(res.ground.uTime, frameState.simTimeMs / 1000);
                    gl.drawArrays(gl.TRIANGLES, 0, 6);
                    gl.bindVertexArray(null);
                    gl.enable(gl.BLEND);
                    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
                }

                // Pass 2: the dot stamp.
                gl.useProgram(prog);
                // The dot-grid uniforms (set BEFORE the field upload — which issues the draw).
                const dpr = resolveBudgetDpr();
                gl.uniform1f(dU.mode, config.variant === "dot-dither" ? 1 : 0);
                gl.uniform1f(
                    dU.pix,
                    Math.max(config.dotPixelSize * dpr, 4),
                );
                gl.uniform1f(dU.floor, config.fieldFloor);
                gl.uniform1f(dU.bright, config.dotBrightFloor);
                gl.uniform1f(dU.min, config.dotMin);
                gl.uniform1f(dU.max, config.dotMax);
                gl.uniform1f(dU.pr, config.pointerRadius);
                gl.uniform1f(dU.pm, pointerModeSign(config.pointerMode));
                gl.uniform1f(dU.pa, config.interactive ? dotPush.active : 0);
                gl.uniform2f(dU.cursor, dotPush.x, dotPush.y);
                gl.uniform1f(dU.bloom, dotPush.bloom);
                // The liquid-field lanes (Move 1/2/4b — the N named scalars).
                gl.uniform1f(dU.shadowGate, groundOn ? 1 : 0);
                gl.uniform1f(dU.presenceFloor, config.presenceFloor);
                gl.uniform1f(dU.weldLo, WELD_LO);
                gl.uniform1f(dU.weldHi, WELD_HI);
                gl.uniform1f(dU.time, dotPush.timeSec);
                gl.uniform1f(dU.weldSwell, config.weldSwell);
                gl.uniform1f(dU.weldSpecular, config.weldSpecular);
                gl.uniform1f(dU.flowAmt, config.flowAmt);
                gl.uniform1f(dU.latticeSquash, dotPush.latticeSquash);
                // The field uniforms + the draw (the REUSED goo-blob upload path).
                uploadBlobUniforms(gl, prog, vao, locs, canvas, getField(), pointer, satellites, frameState);
            }

            return {
                frame,
                shouldContinue,
                resize,
                teardown: () => {
                    gl.deleteProgram(res.prog);
                    gl.deleteShader(res.vs);
                    gl.deleteShader(res.fs);
                    gl.deleteBuffer(res.buf);
                    gl.deleteVertexArray(res.vao);
                    gl.deleteProgram(res.ground.prog);
                    gl.deleteShader(res.ground.vs);
                    gl.deleteShader(res.ground.fs);
                    gl.deleteBuffer(res.ground.buf);
                    gl.deleteVertexArray(res.ground.vao);
                },
            };
        };
    }

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
                contextAttrs: {
                    alpha: true,
                    premultipliedAlpha: true,
                    antialias: false,
                    preserveDrawingBuffer: false,
                },
                respectReducedMotion: config.respectReducedMotion,
                setupWGPU: buildWGPUSetup(canvas),
                setupGL: buildGLSetup(canvas),
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
