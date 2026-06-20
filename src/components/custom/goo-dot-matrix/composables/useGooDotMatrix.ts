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
import { compileShader, linkProgram } from "../../../../composables/glass/webgl/compile";
import {
    useBlobMood,
    useBlobPointer,
    useBlobSatellites,
} from "../../goo-blob";
import {
    BLOB_WGPU_UNIFORM_BYTES,
    createBlobWGPUUniformScratch,
    packBlobWGPUUniforms,
} from "../../goo-blob/composables/uniformBridgeWGPU";
import {
    uploadBlobUniforms,
    type BlobFrameState,
    type MetaballUniformLocations,
    type UniformName,
} from "../../goo-blob/composables/uploadBlobUniforms";
import {
    MAX_SATS,
    TRAIL_N,
    MAX_BLOB_STOPS,
    UNIFORM_NAMES,
} from "../../goo-blob/constants";
import { GOO_DOT_WGSL } from "../shaders/goo-dot.wgsl";
import { GOO_DOT_VERT_GLSL, GOO_DOT_FRAG_GLSL } from "../shaders/goo-dot.frag";
import type { GooDotConfig } from "../constants";
import {
    GOO_DOT_UNIFORM_BYTES,
    createGooDotScratch,
    packGooDotUniforms,
    pointerModeSign,
    restingDotPointer,
    type GooDotPointerState,
} from "./uniformBridgeWGPU";

// WebGPU usage/visibility bitflags (lib.dom declares the TYPES not the VALUE namespaces).
const BUFFER_USAGE_UNIFORM = 0x40;
const BUFFER_USAGE_COPY_DST = 0x8;
const SHADER_STAGE_VERTEX = 0x1;
const SHADER_STAGE_FRAGMENT = 0x2;

const GOO_DOT_LABEL = "[GooDotMatrix]";

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

    // ── The SHARED field-advance (substrate-agnostic; the goo-blob resolveFrame shape) ──
    // Advances the mood / pointer / satellite systems on the tempo-scaled step + feeds the
    // shared pointer-velocity field (the accel/flick-burst leg). The field uniforms are
    // packed off the returned BlobFrameState; the dot-cursor push is derived here.
    function resolveFrame(timeSec: number): BlobFrameState {
        const rawDtMs = lastTimeSec ? (timeSec - lastTimeSec) * 1000 : 16;
        lastTimeSec = timeSec;
        const dtMs = Math.max(0, Math.min(rawDtMs, 50));

        const reduced = handle?.reducedMotion ?? false;
        const tempo = reduced || paused ? 0 : field.tempo;
        const stepMs = tempo * dtMs;
        simTimeMs += stepMs;

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

        return {
            params: mood.params.value,
            rgb: resolveColor(baseColorCss),
            simTimeMs,
            timeSec,
            resolveColor,
            rimColor: field.surface.rimColor,
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
    function buildWGPUSetup(
        canvas: HTMLCanvasElement,
    ): (
        device: GPUDevice,
        context: GPUCanvasContext,
        format: GPUTextureFormat,
    ) => WebGPUCanvasFrame {
        return function setupWGPU(device, context, format) {
            const module = device.createShaderModule({
                label: `${GOO_DOT_LABEL} goo-dot.wgsl`,
                code: GOO_DOT_WGSL,
            });
            const fieldBuffer = device.createBuffer({
                label: `${GOO_DOT_LABEL} field-uniforms`,
                size: BLOB_WGPU_UNIFORM_BYTES,
                usage: BUFFER_USAGE_UNIFORM | BUFFER_USAGE_COPY_DST,
            });
            const dotBuffer = device.createBuffer({
                label: `${GOO_DOT_LABEL} dot-uniforms`,
                size: GOO_DOT_UNIFORM_BYTES,
                usage: BUFFER_USAGE_UNIFORM | BUFFER_USAGE_COPY_DST,
            });
            const bgl = device.createBindGroupLayout({
                label: `${GOO_DOT_LABEL} bgl`,
                entries: [
                    {
                        binding: 0,
                        visibility: SHADER_STAGE_VERTEX | SHADER_STAGE_FRAGMENT,
                        buffer: { type: "uniform" },
                    },
                    {
                        binding: 1,
                        visibility: SHADER_STAGE_FRAGMENT,
                        buffer: { type: "uniform" },
                    },
                ],
            });
            const pipeline = device.createRenderPipeline({
                label: `${GOO_DOT_LABEL} pipeline`,
                layout: device.createPipelineLayout({ bindGroupLayouts: [bgl] }),
                vertex: { module, entryPoint: "vs_main" },
                fragment: {
                    module,
                    entryPoint: "fs_main",
                    targets: [
                        {
                            format,
                            blend: {
                                color: {
                                    srcFactor: "one",
                                    dstFactor: "one-minus-src-alpha",
                                    operation: "add",
                                },
                                alpha: {
                                    srcFactor: "one",
                                    dstFactor: "one-minus-src-alpha",
                                    operation: "add",
                                },
                            },
                        },
                    ],
                },
                primitive: { topology: "triangle-list" },
            });
            const bindGroup = device.createBindGroup({
                label: `${GOO_DOT_LABEL} bg`,
                layout: bgl,
                entries: [
                    { binding: 0, resource: { buffer: fieldBuffer } },
                    { binding: 1, resource: { buffer: dotBuffer } },
                ],
            });
            const fieldScratch = createBlobWGPUUniformScratch();
            const dotScratch = createGooDotScratch();

            function resize(): void {
                const dpr = resolveBudgetDpr();
                const cssW = canvas.clientWidth || field.geometry.canvasSize;
                const cssH = canvas.clientHeight || field.geometry.canvasSize;
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
                    fieldScratch,
                    canvas,
                    field,
                    pointer,
                    satellites,
                    frameState,
                );
                device.queue.writeBuffer(fieldBuffer, 0, fieldScratch.buffer);
                // Dot-grid lanes (binding1) — the extend.
                packGooDotUniforms(
                    dotScratch,
                    config,
                    { w: canvas.width || 1, h: canvas.height || 1 },
                    resolveBudgetDpr(),
                    dotPush,
                );
                device.queue.writeBuffer(dotBuffer, 0, dotScratch.buffer);

                const view = context.getCurrentTexture().createView();
                const encoder = device.createCommandEncoder({ label: `${GOO_DOT_LABEL} frame` });
                const pass = encoder.beginRenderPass({
                    colorAttachments: [
                        {
                            view,
                            clearValue: { r: 0, g: 0, b: 0, a: 0 },
                            loadOp: "clear",
                            storeOp: "store",
                        },
                    ],
                });
                pass.setPipeline(pipeline);
                pass.setBindGroup(0, bindGroup);
                pass.draw(3, 1, 0, 0);
                pass.end();
                device.queue.submit([encoder.finish()]);
            }

            return {
                frame,
                shouldContinue,
                resize,
                teardown: () => {
                    fieldBuffer.destroy();
                    dotBuffer.destroy();
                },
            };
        };
    }

    // ── The GL setup (Register A: the dot-stamp fragment; the WebGL2 fallback) ──
    function buildGLSetup(
        canvas: HTMLCanvasElement,
    ): (gl: WebGL2RenderingContext) => WebGLCanvasFrame {
        return function setupGL(gl) {
            const vs = compileShader(gl, gl.VERTEX_SHADER, GOO_DOT_VERT_GLSL, GOO_DOT_LABEL);
            const fs = compileShader(gl, gl.FRAGMENT_SHADER, GOO_DOT_FRAG_GLSL, GOO_DOT_LABEL);
            const prog = linkProgram(gl, vs, fs, GOO_DOT_LABEL);
            gl.useProgram(prog);

            // The full-quad VAO (the metaball aPosition convention — uploadBlobUniforms draws it).
            const vao = gl.createVertexArray()!;
            gl.bindVertexArray(vao);
            const buf = gl.createBuffer()!;
            gl.bindBuffer(gl.ARRAY_BUFFER, buf);
            gl.bufferData(
                gl.ARRAY_BUFFER,
                new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
                gl.STATIC_DRAW,
            );
            const aPos = gl.getAttribLocation(prog, "aPosition");
            gl.enableVertexAttribArray(aPos);
            gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

            // The field uniform-location cache (the SAME UNIFORM_NAMES the field GLSL declares).
            const U = {} as Record<UniformName, WebGLUniformLocation | null>;
            for (const n of UNIFORM_NAMES) U[n] = gl.getUniformLocation(prog, n);
            const satPosLocs: (WebGLUniformLocation | null)[] = [];
            const satRadLocs: (WebGLUniformLocation | null)[] = [];
            const satOpLocs: (WebGLUniformLocation | null)[] = [];
            for (let i = 0; i < MAX_SATS; i++) {
                satPosLocs.push(gl.getUniformLocation(prog, `uSatPos[${i}]`));
                satRadLocs.push(gl.getUniformLocation(prog, `uSatRadius[${i}]`));
                satOpLocs.push(gl.getUniformLocation(prog, `uSatOpacity[${i}]`));
            }
            const trailPosLocs: (WebGLUniformLocation | null)[] = [];
            const trailRadLocs: (WebGLUniformLocation | null)[] = [];
            for (let i = 0; i < TRAIL_N; i++) {
                trailPosLocs.push(gl.getUniformLocation(prog, `uTrailPos[${i}]`));
                trailRadLocs.push(gl.getUniformLocation(prog, `uTrailRadius[${i}]`));
            }
            const paletteLocs: (WebGLUniformLocation | null)[] = [];
            for (let i = 0; i < MAX_BLOB_STOPS; i++) {
                paletteLocs.push(gl.getUniformLocation(prog, `uPalette[${i}]`));
            }
            const locs: MetaballUniformLocations = {
                U,
                satPosLocs,
                satRadLocs,
                satOpLocs,
                trailPosLocs,
                trailRadLocs,
                paletteLocs,
            };

            // The dot-grid uniform locations (the extend).
            const dU = {
                mode: gl.getUniformLocation(prog, "uDotMode"),
                pix: gl.getUniformLocation(prog, "uDotPixelSize"),
                floor: gl.getUniformLocation(prog, "uFieldFloor"),
                bright: gl.getUniformLocation(prog, "uDotBrightFloor"),
                min: gl.getUniformLocation(prog, "uDotMin"),
                max: gl.getUniformLocation(prog, "uDotMax"),
                pr: gl.getUniformLocation(prog, "uDotPointerRadius"),
                pm: gl.getUniformLocation(prog, "uDotPointerMode"),
                pa: gl.getUniformLocation(prog, "uDotPointerActive"),
                cursor: gl.getUniformLocation(prog, "uDotCursor"),
                bloom: gl.getUniformLocation(prog, "uDotBloom"),
            };

            gl.enable(gl.BLEND);
            gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

            function resize(): void {
                const dpr = resolveBudgetDpr();
                const cssW = canvas.clientWidth || field.geometry.canvasSize;
                const cssH = canvas.clientHeight || field.geometry.canvasSize;
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
                // The field uniforms + the draw (the REUSED goo-blob upload path).
                uploadBlobUniforms(gl, prog, vao, locs, canvas, field, pointer, satellites, frameState);
            }

            return {
                frame,
                shouldContinue,
                resize,
                teardown: () => {
                    gl.deleteProgram(prog);
                    gl.deleteShader(vs);
                    gl.deleteShader(fs);
                    gl.deleteBuffer(buf);
                    gl.deleteVertexArray(vao);
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
