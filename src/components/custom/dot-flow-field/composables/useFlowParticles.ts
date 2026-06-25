// BD.W-DOTFLOW-AURORA-CURRENT — the lattice/mote-buffer alloc + the two substrate-`setup`
// builders (the WGPU compute+render two-pass primary + the WebGL2 channel).
//
// `createFlowWGPUSetup` returns a `setupWGPU(device, ctx, format)` the picker invokes on the
// WebGPU primary path. It builds the particle STORAGE buffer (lattice-seeded for `field`,
// scattered+life-staggered for `flow`), the COMPUTE pipeline (mode-branched: anchored-spring
// vs advect+vortex+respawn), the instanced-billboard RENDER pipeline, and — for `flow` — a
// half-res RGBA16F TRAIL ping-pong (decay-blit prev → additive motes → present-composite over
// the warm floor + corner-bloom). Each `frame(t)` records ONE command encoder.
//
// `createFlowGLSetup` returns the `setupGL(gl)` WebGL2 callback — the LIVE path on most hosts.
// `field` is the kept fullscreen-fragment dot-lattice; `flow` is the state-texture GPGPU
// ping-pong (particle state advected in a fragment pass) + a two-FBO RGBA16F trail + a
// point-sprite mote draw + a present-composite. Both setups invoke `onFrame(t)` from inside
// their frame callback (the shared pointer field push-step — the no-own-rAF discipline).

import type { WebGPUCanvasFrame } from "../../../../composables/glass/webgpu/useWebGPUCanvas";
import type { WebGLCanvasFrame } from "../../../../composables/glass/webgl/useWebGLCanvas";
import type { OklchStop } from "../../../../composables/color";
import { oklchToLinear } from "../../../../composables/color";
import { resolveBudgetDpr } from "../../aurora/constants/budget";
import { FLOW_FIELD_COMPUTE_WGSL } from "../shaders/flow-field.compute.wgsl";
import {
    FLOW_FIELD_RENDER_WGSL,
    FLOW_FIELD_TRAIL_WGSL,
} from "../shaders/flow-field.render.wgsl";
import {
    FLOW_FIELD_VERT_GLSL,
    FLOW_FIELD_FRAG_GLSL,
    FLOW_FIELD_QUAD_VERT_GLSL,
    FLOW_FIELD_STATE_GLSL,
    FLOW_FIELD_POINT_VERT_GLSL,
    FLOW_FIELD_POINT_FRAG_GLSL,
    FLOW_FIELD_TRAIL_FRAG_GLSL,
    FLOW_FIELD_PRESENT_FRAG_GLSL,
} from "../shaders/flow-field.glsl";
import type { FlowFieldConfig } from "../constants";
import { MAX_WAVE_COMPONENTS, MAX_FLOW_STOPS, flowTrailDecay } from "../constants";
import {
    FLOW_PARTICLE_BYTES,
    FLOW_BASE_BRIGHT,
    FLOW_DOMAIN_HALF,
    FLOW_MAX_LATTICE,
    FLOW_SPEED_NORM,
    createFlowComputeScratch,
    createFlowRenderScratch,
    flowGridGeometry,
    packFlowComputeUniforms,
    packFlowRenderUniforms,
    seedLatticeBuffer,
    seedFlowBuffer,
    type FlowPointerState,
} from "./uniformBridgeWGPU";

// WebGPU usage/visibility bitflags (webgpu.idl constants; `lib.dom` declares the TYPES
// not the VALUE namespaces — naming them keeps the call sites readable).
const BUFFER_USAGE_UNIFORM = 0x40;
const BUFFER_USAGE_STORAGE = 0x80;
const BUFFER_USAGE_COPY_DST = 0x8;
const TEXTURE_USAGE_RENDER_ATTACHMENT = 0x10;
const TEXTURE_USAGE_TEXTURE_BINDING = 0x4;
const SHADER_STAGE_VERTEX = 0x1;
const SHADER_STAGE_FRAGMENT = 0x2;
const SHADER_STAGE_COMPUTE = 0x4;

const WORKGROUP_SIZE = 64;

/** The deep warm-near-black floor + the warm rose corner-bloom (linear-sRGB), the §3 ground.
 *  Resolved off a warm-fire-adjacent OKLCh ground (NOT teal). The demo preset overrides via
 *  `config.background`; this is the fallback ground for the flow present-composite. */
const FLOW_FLOOR_OKLCH: OklchStop = { L: 0.11, C: 0.012, h: 50 };
const FLOW_BLOOM_OKLCH: OklchStop = { L: 0.5, C: 0.16, h: 330 }; // warm rose/magenta

export interface FlowSetupDeps {
    canvas: HTMLCanvasElement;
    config: FlowFieldConfig;
    /** The resolved (ColorResolver) palette stops as OKLCh — re-read each frame so a live palette edit reaches the buffer. */
    getPalette: () => OklchStop[];
    /** Demand-gate (the renderer's quiescence layer — substrate-agnostic). */
    shouldContinue: () => boolean;
    /**
     * The per-frame pointer hook — useDotFlowField advances the shared
     * `usePointerVelocityField` here (the no-own-rAF discipline). ZERO own rAF.
     */
    onFrame?: (timeSec: number) => void;
    /** The live pointer/vortex state the renderer feeds the flow kernel (rest = inert). */
    getPointer?: () => FlowPointerState;
}

/** A px-min reader (the lattice density rides the min CSS dimension). */
function cssMin(canvas: HTMLCanvasElement): number {
    return Math.min(canvas.clientWidth || 320, canvas.clientHeight || 320);
}

/** The flow mote count, clamped to the storage/state cap. */
function flowCount(config: FlowFieldConfig): number {
    return Math.min(Math.max(Math.floor(config.particleCount), 1), FLOW_MAX_LATTICE);
}

/** The square state-texture side that holds `count` motes (one texel each). */
function stateCols(count: number): number {
    return Math.max(1, Math.ceil(Math.sqrt(count)));
}

// ════════════════════════════════════════════════════════════════════════════════════
//  WebGPU setup
// ════════════════════════════════════════════════════════════════════════════════════

/**
 * Build the dot-flow-field `setupWGPU(device, context, format)` callback. Closes over the
 * config/palette getters + the renderer's demand gate + the pointer `onFrame`/`getPointer`.
 */
export function createFlowWGPUSetup(
    deps: FlowSetupDeps,
): (
    device: GPUDevice,
    context: GPUCanvasContext,
    format: GPUTextureFormat,
) => WebGPUCanvasFrame {
    const { canvas, config, getPalette, shouldContinue, onFrame, getPointer } = deps;

    return function setupWGPU(device, context, format) {
        const isFlow = config.mode === "flow";
        let geometry = flowGridGeometry(config.gridPitch, cssMin(canvas));

        // The particle count + seed: scattered motes (flow) or the anchored lattice (field).
        const count = isFlow ? flowCount(config) : geometry.count;
        const seed = isFlow
            ? seedFlowBuffer(count, config.lifetimeSec)
            : seedLatticeBuffer(geometry);

        const computeModule = device.createShaderModule({
            label: "[DotFlowField] flow-field.compute.wgsl",
            code: FLOW_FIELD_COMPUTE_WGSL,
        });
        const renderModule = device.createShaderModule({
            label: "[DotFlowField] flow-field.render.wgsl",
            code: FLOW_FIELD_RENDER_WGSL,
        });

        const particleBuffer = device.createBuffer({
            label: "[DotFlowField] particles",
            size: (seed.length / 4) * FLOW_PARTICLE_BYTES,
            usage: BUFFER_USAGE_STORAGE | BUFFER_USAGE_COPY_DST,
            mappedAtCreation: true,
        });
        new Float32Array(particleBuffer.getMappedRange()).set(seed);
        particleBuffer.unmap();

        const computeUniform = device.createBuffer({
            label: "[DotFlowField] compute-uniforms",
            size: createFlowComputeScratch().buffer.byteLength,
            usage: BUFFER_USAGE_UNIFORM | BUFFER_USAGE_COPY_DST,
        });
        const renderUniform = device.createBuffer({
            label: "[DotFlowField] render-uniforms",
            size: createFlowRenderScratch().buffer.byteLength,
            usage: BUFFER_USAGE_UNIFORM | BUFFER_USAGE_COPY_DST,
        });

        const computeBGL = device.createBindGroupLayout({
            label: "[DotFlowField] compute-bgl",
            entries: [
                { binding: 0, visibility: SHADER_STAGE_COMPUTE, buffer: { type: "uniform" } },
                { binding: 1, visibility: SHADER_STAGE_COMPUTE, buffer: { type: "storage" } },
            ],
        });
        const computePipeline = device.createComputePipeline({
            label: "[DotFlowField] compute-pipeline",
            layout: device.createPipelineLayout({ bindGroupLayouts: [computeBGL] }),
            compute: { module: computeModule, entryPoint: "cs_main" },
        });
        const computeBindGroup = device.createBindGroup({
            label: "[DotFlowField] compute-bg",
            layout: computeBGL,
            entries: [
                { binding: 0, resource: { buffer: computeUniform } },
                { binding: 1, resource: { buffer: particleBuffer } },
            ],
        });

        const renderBGL = device.createBindGroupLayout({
            label: "[DotFlowField] render-bgl",
            entries: [
                {
                    binding: 0,
                    visibility: SHADER_STAGE_VERTEX | SHADER_STAGE_FRAGMENT,
                    buffer: { type: "uniform" },
                },
                {
                    binding: 1,
                    visibility: SHADER_STAGE_VERTEX,
                    buffer: { type: "read-only-storage" },
                },
            ],
        });

        // ── The flow TRAIL ping-pong (half-res RGBA16F) + the decay/present pipelines ──
        // `field` renders straight to the swapchain (no trail); `flow` accumulates ribbons.
        const trailFormat: GPUTextureFormat = "rgba16float";
        const additive = {
            color: {
                srcFactor: "one" as const,
                dstFactor: "one" as const,
                operation: "add" as const,
            },
            alpha: {
                srcFactor: "one" as const,
                dstFactor: "one" as const,
                operation: "add" as const,
            },
        };
        const overBlend = {
            color: {
                srcFactor: "one" as const,
                dstFactor: "one-minus-src-alpha" as const,
                operation: "add" as const,
            },
            alpha: {
                srcFactor: "one" as const,
                dstFactor: "one-minus-src-alpha" as const,
                operation: "add" as const,
            },
        };

        // The mote render pipeline writes additively into the trail (flow) or over the
        // swapchain (field — premultiplied over the clear).
        const renderPipeline = device.createRenderPipeline({
            label: "[DotFlowField] render-pipeline",
            layout: device.createPipelineLayout({ bindGroupLayouts: [renderBGL] }),
            vertex: { module: renderModule, entryPoint: "vs_main" },
            fragment: {
                module: renderModule,
                entryPoint: "fs_main",
                targets: [{ format: isFlow ? trailFormat : format, blend: isFlow ? additive : overBlend }],
            },
            primitive: { topology: "triangle-list" },
        });
        const renderBindGroup = device.createBindGroup({
            label: "[DotFlowField] render-bg",
            layout: renderBGL,
            entries: [
                { binding: 0, resource: { buffer: renderUniform } },
                { binding: 1, resource: { buffer: particleBuffer } },
            ],
        });

        // The trail decay + present pipelines (flow only).
        const trailModule = isFlow
            ? device.createShaderModule({
                  label: "[DotFlowField] flow-field.trail.wgsl",
                  code: FLOW_FIELD_TRAIL_WGSL,
              })
            : null;
        const trailUniform = isFlow
            ? device.createBuffer({
                  label: "[DotFlowField] trail-uniforms",
                  size: 48, // 3 × vec4
                  usage: BUFFER_USAGE_UNIFORM | BUFFER_USAGE_COPY_DST,
              })
            : null;
        const trailSampler = isFlow
            ? device.createSampler({ magFilter: "linear", minFilter: "linear" })
            : null;
        const trailBGL =
            isFlow && trailModule
                ? device.createBindGroupLayout({
                      label: "[DotFlowField] trail-bgl",
                      entries: [
                          { binding: 0, visibility: SHADER_STAGE_FRAGMENT, buffer: { type: "uniform" } },
                          { binding: 1, visibility: SHADER_STAGE_FRAGMENT, sampler: { type: "filtering" } },
                          { binding: 2, visibility: SHADER_STAGE_FRAGMENT, texture: { sampleType: "float" } },
                      ],
                  })
                : null;
        const decayPipeline =
            isFlow && trailModule && trailBGL
                ? device.createRenderPipeline({
                      label: "[DotFlowField] trail-decay-pipeline",
                      layout: device.createPipelineLayout({ bindGroupLayouts: [trailBGL] }),
                      vertex: { module: trailModule, entryPoint: "vs_fsq" },
                      fragment: { module: trailModule, entryPoint: "fs_decay", targets: [{ format: trailFormat }] },
                      primitive: { topology: "triangle-list" },
                  })
                : null;
        const presentPipeline =
            isFlow && trailModule && trailBGL
                ? device.createRenderPipeline({
                      label: "[DotFlowField] trail-present-pipeline",
                      layout: device.createPipelineLayout({ bindGroupLayouts: [trailBGL] }),
                      vertex: { module: trailModule, entryPoint: "vs_fsq" },
                      fragment: { module: trailModule, entryPoint: "fs_present", targets: [{ format }] },
                      primitive: { topology: "triangle-list" },
                  })
                : null;

        // The trail ping-pong textures (rebuilt on resize).
        let trailTex: [GPUTexture, GPUTexture] | null = null;
        let trailView: [GPUTextureView, GPUTextureView] | null = null;
        let decayBG: [GPUBindGroup, GPUBindGroup] | null = null;
        let presentBG: [GPUBindGroup, GPUBindGroup] | null = null;
        let pingIndex = 0;

        function rebuildTrail(): void {
            if (!isFlow || !trailBGL || !trailUniform || !trailSampler) return;
            const scale = Math.min(Math.max(config.trailScale, 0.25), 1);
            const tw = Math.max(2, Math.round(canvas.width * scale));
            const th = Math.max(2, Math.round(canvas.height * scale));
            trailTex?.forEach((t) => t.destroy());
            const mk = (): GPUTexture =>
                device.createTexture({
                    label: "[DotFlowField] trail",
                    size: { width: tw, height: th },
                    format: trailFormat,
                    usage: TEXTURE_USAGE_RENDER_ATTACHMENT | TEXTURE_USAGE_TEXTURE_BINDING,
                });
            const a = mk();
            const b = mk();
            trailTex = [a, b];
            trailView = [a.createView(), b.createView()];
            const mkBG = (texView: GPUTextureView): GPUBindGroup =>
                device.createBindGroup({
                    layout: trailBGL,
                    entries: [
                        { binding: 0, resource: { buffer: trailUniform } },
                        { binding: 1, resource: trailSampler },
                        { binding: 2, resource: texView },
                    ],
                });
            // decayBG[cur] reads trailView[prev] (the prev accumulated trail to fade).
            decayBG = [mkBG(trailView[1]), mkBG(trailView[0])];
            // presentBG[cur] reads trailView[cur] (the JUST-written composite).
            presentBG = [mkBG(trailView[0]), mkBG(trailView[1])];
        }

        const computeScratch = createFlowComputeScratch();
        const renderScratch = createFlowRenderScratch();
        const trailScratch = new Float32Array(12);
        let lastTime = -1;

        function resize(): void {
            const dpr = resolveBudgetDpr();
            const cssW = canvas.clientWidth || 320;
            const cssH = canvas.clientHeight || 320;
            const w = Math.max(1, Math.round(cssW * dpr));
            const h = Math.max(1, Math.round(cssH * dpr));
            if (canvas.width !== w || canvas.height !== h) {
                canvas.width = w;
                canvas.height = h;
            }
            if (!isFlow) {
                const g = flowGridGeometry(config.gridPitch, cssMin(canvas));
                geometry = { ...g, count: Math.min(g.count, seed.length / 4) };
            }
            rebuildTrail();
        }

        function frame(timeSec: number): void {
            onFrame?.(timeSec);
            const dt = lastTime < 0 ? 0 : Math.min(Math.max(timeSec - lastTime, 0), 0.05);
            lastTime = timeSec;

            const aspect = (canvas.clientWidth || 320) / Math.max(canvas.clientHeight || 320, 1);
            const drawCount = isFlow ? count : geometry.count;
            const pointer = getPointer?.();

            packFlowComputeUniforms(computeScratch, config, timeSec, dt, geometry, drawCount, pointer);
            device.queue.writeBuffer(computeUniform, 0, computeScratch.buffer);
            packFlowRenderUniforms(
                renderScratch,
                config,
                timeSec,
                aspect,
                cssMin(canvas),
                geometry,
                getPalette(),
            );
            device.queue.writeBuffer(renderUniform, 0, renderScratch.buffer);

            const encoder = device.createCommandEncoder({ label: "[DotFlowField] frame" });

            // 1. compute (advect/respawn for flow, anchored-spring for field).
            const cpass = encoder.beginComputePass();
            cpass.setPipeline(computePipeline);
            cpass.setBindGroup(0, computeBindGroup);
            cpass.dispatchWorkgroups(Math.ceil(drawCount / WORKGROUP_SIZE));
            cpass.end();

            if (
                isFlow &&
                trailView &&
                decayBG &&
                presentBG &&
                decayPipeline &&
                presentPipeline &&
                trailUniform
            ) {
                const cur = pingIndex;
                const prev = 1 - pingIndex;

                // trail uniforms: derived decay α + the floor/bloom ground.
                const decay = flowTrailDecay(config.trailHalfLife);
                const hasGround = config.background === "transparent" ? 0 : 1;
                const floorLin = oklchToLinear(
                    config.background === "transparent" ? FLOW_FLOOR_OKLCH : config.background,
                );
                const bloomLin = oklchToLinear(FLOW_BLOOM_OKLCH);
                trailScratch[0] = decay;
                trailScratch[1] = hasGround;
                trailScratch[2] = timeSec;
                trailScratch[4] = floorLin[0];
                trailScratch[5] = floorLin[1];
                trailScratch[6] = floorLin[2];
                trailScratch[8] = bloomLin[0];
                trailScratch[9] = bloomLin[1];
                trailScratch[10] = bloomLin[2];
                device.queue.writeBuffer(trailUniform, 0, trailScratch.buffer);

                // 2. decay-blit prev → cur (fade the ribbons toward black).
                const dpass = encoder.beginRenderPass({
                    colorAttachments: [
                        { view: trailView[cur], clearValue: { r: 0, g: 0, b: 0, a: 0 }, loadOp: "clear", storeOp: "store" },
                    ],
                });
                dpass.setPipeline(decayPipeline);
                dpass.setBindGroup(0, decayBG[cur]); // decayBG[cur] reads trailView[prev]
                dpass.draw(3, 1, 0, 0);
                dpass.end();

                // 3. motes additive over the decayed trail.
                const mpass = encoder.beginRenderPass({
                    colorAttachments: [{ view: trailView[cur], loadOp: "load", storeOp: "store" }],
                });
                mpass.setPipeline(renderPipeline);
                mpass.setBindGroup(0, renderBindGroup);
                mpass.draw(6, drawCount, 0, 0);
                mpass.end();

                // 4. present composite (trail over the warm floor + corner-bloom) → swapchain.
                const view = context.getCurrentTexture().createView();
                const ppass = encoder.beginRenderPass({
                    colorAttachments: [
                        { view, clearValue: { r: 0, g: 0, b: 0, a: 0 }, loadOp: "clear", storeOp: "store" },
                    ],
                });
                ppass.setPipeline(presentPipeline);
                ppass.setBindGroup(0, presentBG[cur]); // reads trailView[cur] just written
                ppass.draw(3, 1, 0, 0);
                ppass.end();

                pingIndex = prev; // swap
            } else {
                // field: render motes straight to the swapchain over the clear.
                const view = context.getCurrentTexture().createView();
                const rpass = encoder.beginRenderPass({
                    colorAttachments: [
                        { view, clearValue: { r: 0, g: 0, b: 0, a: 0 }, loadOp: "clear", storeOp: "store" },
                    ],
                });
                rpass.setPipeline(renderPipeline);
                rpass.setBindGroup(0, renderBindGroup);
                rpass.draw(6, drawCount, 0, 0);
                rpass.end();
            }

            device.queue.submit([encoder.finish()]);
        }

        return {
            frame,
            shouldContinue,
            resize,
            teardown: () => {
                particleBuffer.destroy();
                computeUniform.destroy();
                renderUniform.destroy();
                trailUniform?.destroy();
                trailTex?.forEach((t) => t.destroy());
            },
        };
    };
}

// ════════════════════════════════════════════════════════════════════════════════════
//  WebGL2 setup (the LIVE path)
// ════════════════════════════════════════════════════════════════════════════════════

function compileGL(gl: WebGL2RenderingContext, type: number, src: string): WebGLShader {
    const sh = gl.createShader(type)!;
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        const log = gl.getShaderInfoLog(sh);
        gl.deleteShader(sh);
        throw new Error(`[DotFlowField] shader compile failed: ${log}`);
    }
    return sh;
}

function linkGL(
    gl: WebGL2RenderingContext,
    vsSrc: string,
    fsSrc: string,
): WebGLProgram {
    const vs = compileGL(gl, gl.VERTEX_SHADER, vsSrc);
    const fs = compileGL(gl, gl.FRAGMENT_SHADER, fsSrc);
    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(`[DotFlowField] link failed: ${gl.getProgramInfoLog(program)}`);
    }
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    return program;
}

/**
 * Build the `setupGL(gl)` callback the picker invokes on the WebGL2 path (the LIVE path).
 * `field` is the kept fullscreen-fragment dot-lattice; `flow` is the state-texture GPGPU +
 * two-FBO trail + point-sprite motes + present composite — the SAME advected-population
 * gestalt as the WGPU compute path (the ONE math source via the shared GLSL chunk).
 */
export function createFlowGLSetup(
    deps: FlowSetupDeps,
): (gl: WebGL2RenderingContext) => WebGLCanvasFrame {
    if (deps.config.mode === "flow") return createFlowGLFlow(deps);
    const { canvas, config, getPalette, shouldContinue, onFrame } = deps;

    // ── field — the kept fullscreen-fragment dot-lattice (BC.W-VIZ-DOTFLOW, untouched) ──
    return function setupGL(gl) {
        const program = linkGL(gl, FLOW_FIELD_VERT_GLSL, FLOW_FIELD_FRAG_GLSL);

        const vao = gl.createVertexArray();
        gl.bindVertexArray(vao);
        const buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
        const loc = gl.getAttribLocation(program, "aPosition");
        gl.enableVertexAttribArray(loc);
        gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
        gl.bindVertexArray(null);

        const u = (name: string) => gl.getUniformLocation(program, name);
        const uTime = u("uTime");
        const uWindSpeed = u("uWindSpeed");
        const uCurlStrength = u("uCurlStrength");
        const uDomainHalf = u("uDomainHalf");
        const uAspect = u("uAspect");
        const uGridPitchDomain = u("uGridPitchDomain");
        const uDotRadiusDomain = u("uDotRadiusDomain");
        const uDisplaceAmp = u("uDisplaceAmp");
        const uContrast = u("uContrast");
        const uBaseBright = u("uBaseBright");
        const uWaveBandCenter = u("uWaveBandCenter");
        const uWaveBandWidth = u("uWaveBandWidth");
        const uGlobeMask = u("uGlobeMask");
        const uWaveCount = u("uWaveCount");
        const uStopCount = u("uStopCount");
        const uHasBackground = u("uHasBackground");
        const uBg = u("uBg");
        const uWaves = u("uWaves[0]");
        const uPalette = u("uPalette[0]");

        function resize(): void {
            const dpr = resolveBudgetDpr();
            const cssW = canvas.clientWidth || 320;
            const cssH = canvas.clientHeight || 320;
            const w = Math.max(1, Math.round(cssW * dpr));
            const h = Math.max(1, Math.round(cssH * dpr));
            if (canvas.width !== w || canvas.height !== h) {
                canvas.width = w;
                canvas.height = h;
            }
            gl.viewport(0, 0, canvas.width, canvas.height);
        }

        function frame(timeSec: number): void {
            onFrame?.(timeSec);
            const min = cssMin(canvas);
            const aspect = (canvas.clientWidth || 320) / Math.max(canvas.clientHeight || 320, 1);
            const geometry = flowGridGeometry(config.gridPitch, min);
            const pxPerDomain = min / (2 * FLOW_DOMAIN_HALF);
            const dotRadiusDomain = config.dotSize / Math.max(pxPerDomain, 1e-4);

            gl.useProgram(program);
            gl.bindVertexArray(vao);
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);

            gl.uniform1f(uTime, timeSec);
            gl.uniform1f(uWindSpeed, config.windSpeed);
            gl.uniform1f(uCurlStrength, config.curlStrength);
            gl.uniform1f(uDomainHalf, FLOW_DOMAIN_HALF);
            gl.uniform1f(uAspect, aspect);
            gl.uniform1f(uGridPitchDomain, geometry.pitchDomain);
            gl.uniform1f(uDotRadiusDomain, dotRadiusDomain);
            gl.uniform1f(uDisplaceAmp, config.displaceAmp);
            gl.uniform1f(uContrast, config.contrast);
            gl.uniform1f(uBaseBright, FLOW_BASE_BRIGHT);
            gl.uniform1f(uWaveBandCenter, config.waveBandCenter);
            gl.uniform1f(uWaveBandWidth, config.waveBandWidth);
            gl.uniform1f(uGlobeMask, config.globeMask ? 1 : 0);

            const waveCount = Math.min(config.waveComponents.length, MAX_WAVE_COMPONENTS);
            const palette = getPalette();
            const stopCount = Math.min(palette.length, MAX_FLOW_STOPS);
            gl.uniform1i(uWaveCount, waveCount);
            gl.uniform1i(uStopCount, stopCount);

            if (config.background === "transparent") {
                gl.uniform1f(uHasBackground, 0);
                gl.uniform3f(uBg, 0, 0, 0);
            } else {
                gl.uniform1f(uHasBackground, 1);
                const lin = oklchToLinear(config.background);
                gl.uniform3f(uBg, lin[0], lin[1], lin[2]);
            }

            const waveData = new Float32Array(MAX_WAVE_COMPONENTS * 4);
            for (let i = 0; i < MAX_WAVE_COMPONENTS; i++) {
                const w = config.waveComponents[i];
                waveData[i * 4 + 0] = w?.amplitude ?? 0;
                waveData[i * 4 + 1] = w?.wavelength ?? 1;
                waveData[i * 4 + 2] = w?.direction ?? 0;
                waveData[i * 4 + 3] = w?.phase ?? 0;
            }
            gl.uniform4fv(uWaves, waveData);

            const palData = new Float32Array(MAX_FLOW_STOPS * 3);
            for (let i = 0; i < MAX_FLOW_STOPS; i++) {
                const stop = palette[Math.min(i, stopCount - 1)] ?? palette[0];
                const lin = oklchToLinear(stop);
                palData[i * 3 + 0] = lin[0];
                palData[i * 3 + 1] = lin[1];
                palData[i * 3 + 2] = lin[2];
            }
            gl.uniform3fv(uPalette, palData);

            gl.drawArrays(gl.TRIANGLES, 0, 3);
            gl.bindVertexArray(null);
        }

        return {
            frame,
            shouldContinue,
            resize,
            teardown: () => {
                gl.deleteProgram(program);
                gl.deleteVertexArray(vao);
                gl.deleteBuffer(buf);
            },
        };
    };
}

/**
 * The `flow` WebGL2 channel — the AURORA CURRENT, made real + measurable + equal-gestalt:
 *   1. STATE-TEXTURE GPGPU advect pass (one texel per mote; pos/speed/life ping-pong),
 *   2. TRAIL decay-blit (prev → cur at the derived α) on a two-FBO RGBA16F ping-pong,
 *   3. MOTE point-sprite draw (additive into the trail; speed→hue/brightness),
 *   4. PRESENT composite (trail over the warm floor + corner-bloom → the swapchain).
 * The float state/trail RTs fall RGBA32F→RGBA16F where the render extension is absent (R-A);
 * the trail is pinned NEAREST (no half-float-linear extension dependency).
 */
function createFlowGLFlow(
    deps: FlowSetupDeps,
): (gl: WebGL2RenderingContext) => WebGLCanvasFrame {
    const { canvas, config, getPalette, shouldContinue, onFrame, getPointer } = deps;

    return function setupGL(gl) {
        const count = flowCount(config);
        const cols = stateCols(count);

        // ── float-render capability probe (R-A): prefer RGBA32F, fall to RGBA16F ──
        gl.getExtension("EXT_color_buffer_float");
        gl.getExtension("EXT_color_buffer_half_float");
        gl.getExtension("OES_texture_float_linear");
        const stateInternal = probeRenderable(gl, gl.RGBA32F, gl.FLOAT)
            ? { internal: gl.RGBA32F, type: gl.FLOAT }
            : { internal: gl.RGBA16F, type: gl.HALF_FLOAT };
        const trailInternal = probeRenderable(gl, gl.RGBA16F, gl.HALF_FLOAT)
            ? { internal: gl.RGBA16F, type: gl.HALF_FLOAT }
            : { internal: gl.RGBA8, type: gl.UNSIGNED_BYTE };

        // ── programs ──
        const stateProg = linkGL(gl, FLOW_FIELD_QUAD_VERT_GLSL, FLOW_FIELD_STATE_GLSL);
        const pointProg = linkGL(gl, FLOW_FIELD_POINT_VERT_GLSL, FLOW_FIELD_POINT_FRAG_GLSL);
        const trailProg = linkGL(gl, FLOW_FIELD_QUAD_VERT_GLSL, FLOW_FIELD_TRAIL_FRAG_GLSL);
        const presentProg = linkGL(gl, FLOW_FIELD_QUAD_VERT_GLSL, FLOW_FIELD_PRESENT_FRAG_GLSL);

        // ── the fullscreen quad VAO (shared by the state/trail/present passes) ──
        const quadVao = gl.createVertexArray();
        gl.bindVertexArray(quadVao);
        const quadBuf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
        for (const p of [stateProg, trailProg, presentProg]) {
            const l = gl.getAttribLocation(p, "aPosition");
            if (l >= 0) {
                gl.enableVertexAttribArray(l);
                gl.vertexAttribPointer(l, 2, gl.FLOAT, false, 0, 0);
            }
        }
        gl.bindVertexArray(null);
        // a bare VAO for the point draw (positions come from the state texture by VertexID).
        const pointVao = gl.createVertexArray();

        // ── the state ping-pong (one texel per mote, seeded scattered + life-staggered) ──
        const seed = seedFlowBuffer(count, config.lifetimeSec);
        const stateData = new Float32Array(cols * cols * 4);
        stateData.set(seed.subarray(0, Math.min(seed.length, stateData.length)));

        function mkStateTex(data: Float32Array | null): WebGLTexture {
            const tex = gl.createTexture()!;
            gl.bindTexture(gl.TEXTURE_2D, tex);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            const src =
                data && stateInternal.type === gl.FLOAT ? data : data ? float32ToHalf(data) : null;
            gl.texImage2D(gl.TEXTURE_2D, 0, stateInternal.internal, cols, cols, 0, gl.RGBA, stateInternal.type, src);
            return tex;
        }
        const stateTex: [WebGLTexture, WebGLTexture] = [mkStateTex(stateData), mkStateTex(null)];
        const stateFbo: [WebGLFramebuffer, WebGLFramebuffer] = [gl.createFramebuffer()!, gl.createFramebuffer()!];
        for (let i = 0; i < 2; i++) {
            gl.bindFramebuffer(gl.FRAMEBUFFER, stateFbo[i]);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, stateTex[i], 0);
        }
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);

        // ── the trail ping-pong (half-res RGBA16F) ──
        let trailTex: [WebGLTexture, WebGLTexture] | null = null;
        let trailFbo: [WebGLFramebuffer, WebGLFramebuffer] | null = null;
        let trailW = 2;
        let trailH = 2;

        function rebuildTrail(): void {
            const scale = Math.min(Math.max(config.trailScale, 0.25), 1);
            trailW = Math.max(2, Math.round(canvas.width * scale));
            trailH = Math.max(2, Math.round(canvas.height * scale));
            trailTex?.forEach((t) => gl.deleteTexture(t));
            trailFbo?.forEach((f) => gl.deleteFramebuffer(f));
            const mk = (): WebGLTexture => {
                const tex = gl.createTexture()!;
                gl.bindTexture(gl.TEXTURE_2D, tex);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texImage2D(gl.TEXTURE_2D, 0, trailInternal.internal, trailW, trailH, 0, gl.RGBA, trailInternal.type, null);
                return tex;
            };
            const a = mk();
            const b = mk();
            trailTex = [a, b];
            const fa = gl.createFramebuffer()!;
            const fb = gl.createFramebuffer()!;
            gl.bindFramebuffer(gl.FRAMEBUFFER, fa);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, a, 0);
            gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, b, 0);
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            // clear both to black so frame-0 starts on a clean floor.
            for (const f of [fa, fb]) {
                gl.bindFramebuffer(gl.FRAMEBUFFER, f);
                gl.viewport(0, 0, trailW, trailH);
                gl.clearColor(0, 0, 0, 0);
                gl.clear(gl.COLOR_BUFFER_BIT);
            }
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            trailFbo = [fa, fb];
        }

        // ── uniform locations ──
        const su = (n: string) => gl.getUniformLocation(stateProg, n);
        const sLoc = {
            uState: su("uState"), uDt: su("uDt"), uDomainHalf: su("uDomainHalf"),
            uTurnRate: su("uTurnRate"), uSpeedScale: su("uSpeedScale"), uLifetimeSec: su("uLifetimeSec"),
            uEdgeBias: su("uEdgeBias"), uCursor: su("uCursor"), uPointerVel: su("uPointerVel"),
            uBurst: su("uBurst"), uPointerActive: su("uPointerActive"), uVortexRadius: su("uVortexRadius"),
            uVortexSpin: su("uVortexSpin"), uDragGain: su("uDragGain"), uBurstShove: su("uBurstShove"),
            uTime: su("uTime"), uWindSpeed: su("uWindSpeed"), uCurlStrength: su("uCurlStrength"),
            uWaveCount: su("uWaveCount"), uWaves: su("uWaves[0]"),
        };
        const pu = (n: string) => gl.getUniformLocation(pointProg, n);
        const pLoc = {
            uState: pu("uState"), uStateCols: pu("uStateCols"), uDomainHalf: pu("uDomainHalf"),
            uPointSize: pu("uPointSize"), uSpeedNorm: pu("uSpeedNorm"), uStretchAmp: pu("uStretchAmp"),
            uStopCount: pu("uStopCount"), uPalette: pu("uPalette[0]"), uSpeedGlow: pu("uSpeedGlow"),
        };
        const tu = (n: string) => gl.getUniformLocation(trailProg, n);
        const tLoc = { uPrev: tu("uPrev"), uDecay: tu("uDecay") };
        const ru = (n: string) => gl.getUniformLocation(presentProg, n);
        const rLoc = { uTrail: ru("uTrail"), uFloor: ru("uFloor"), uBloom: ru("uBloomColor"), uHasGround: ru("uHasGround") };

        let ping = 0;
        let lastTime = -1;

        function resize(): void {
            const dpr = resolveBudgetDpr();
            const cssW = canvas.clientWidth || 320;
            const cssH = canvas.clientHeight || 320;
            const w = Math.max(1, Math.round(cssW * dpr));
            const h = Math.max(1, Math.round(cssH * dpr));
            if (canvas.width !== w || canvas.height !== h) {
                canvas.width = w;
                canvas.height = h;
            }
            rebuildTrail();
        }

        function frame(timeSec: number): void {
            onFrame?.(timeSec);
            if (!trailFbo || !trailTex) rebuildTrail();
            const dt = lastTime < 0 ? 0 : Math.min(Math.max(timeSec - lastTime, 0), 0.05);
            lastTime = timeSec;
            const pointer = getPointer?.();
            const cur = ping;
            const prev = 1 - ping;

            // ── 1. STATE advect: read stateTex[prev] → write stateTex[cur] ──
            gl.disable(gl.BLEND);
            gl.bindFramebuffer(gl.FRAMEBUFFER, stateFbo[cur]);
            gl.viewport(0, 0, cols, cols);
            gl.useProgram(stateProg);
            gl.bindVertexArray(quadVao);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, stateTex[prev]);
            gl.uniform1i(sLoc.uState, 0);
            gl.uniform1f(sLoc.uDt, dt);
            gl.uniform1f(sLoc.uDomainHalf, FLOW_DOMAIN_HALF);
            gl.uniform1f(sLoc.uTurnRate, config.turnRate);
            gl.uniform1f(sLoc.uSpeedScale, config.speedScale);
            gl.uniform1f(sLoc.uLifetimeSec, config.lifetimeSec);
            gl.uniform1f(sLoc.uEdgeBias, config.edgeBias);
            gl.uniform1f(sLoc.uTime, timeSec);
            gl.uniform1f(sLoc.uWindSpeed, config.windSpeed);
            gl.uniform1f(sLoc.uCurlStrength, config.curlStrength);
            gl.uniform1f(sLoc.uVortexRadius, config.vortexRadius);
            gl.uniform1f(sLoc.uVortexSpin, config.vortexSpin);
            gl.uniform1f(sLoc.uDragGain, config.dragGain);
            gl.uniform1f(sLoc.uBurstShove, config.burstShove);
            if (pointer) {
                gl.uniform2f(sLoc.uCursor, pointer.cursorX, pointer.cursorY);
                gl.uniform2f(sLoc.uPointerVel, pointer.velX, pointer.velY);
                gl.uniform1f(sLoc.uBurst, pointer.burst);
                gl.uniform1f(sLoc.uPointerActive, pointer.active);
            } else {
                gl.uniform1f(sLoc.uPointerActive, 0);
            }
            const waveCount = Math.min(config.waveComponents.length, MAX_WAVE_COMPONENTS);
            gl.uniform1i(sLoc.uWaveCount, waveCount);
            const waveData = new Float32Array(MAX_WAVE_COMPONENTS * 4);
            for (let i = 0; i < MAX_WAVE_COMPONENTS; i++) {
                const w = config.waveComponents[i];
                waveData[i * 4 + 0] = w?.amplitude ?? 0;
                waveData[i * 4 + 1] = w?.wavelength ?? 1;
                waveData[i * 4 + 2] = w?.direction ?? 0;
                waveData[i * 4 + 3] = w?.phase ?? 0;
            }
            gl.uniform4fv(sLoc.uWaves, waveData);
            gl.drawArrays(gl.TRIANGLES, 0, 3);

            // ── 2. TRAIL decay-blit: trailTex[prev] → trailFbo[cur] at α ──
            gl.bindFramebuffer(gl.FRAMEBUFFER, trailFbo![cur]);
            gl.viewport(0, 0, trailW, trailH);
            gl.disable(gl.BLEND);
            gl.useProgram(trailProg);
            gl.bindVertexArray(quadVao);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, trailTex![prev]);
            gl.uniform1i(tLoc.uPrev, 0);
            gl.uniform1f(tLoc.uDecay, flowTrailDecay(config.trailHalfLife));
            gl.drawArrays(gl.TRIANGLES, 0, 3);

            // ── 3. MOTES additive into trailFbo[cur] (point sprites from the state tex) ──
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.ONE, gl.ONE);
            gl.useProgram(pointProg);
            gl.bindVertexArray(pointVao);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, stateTex[cur]);
            gl.uniform1i(pLoc.uState, 0);
            gl.uniform1i(pLoc.uStateCols, cols);
            gl.uniform1f(pLoc.uDomainHalf, FLOW_DOMAIN_HALF);
            const dpr = resolveBudgetDpr();
            gl.uniform1f(pLoc.uPointSize, Math.max(config.dotSize * dpr * 1.5, 1));
            gl.uniform1f(pLoc.uSpeedNorm, FLOW_SPEED_NORM);
            gl.uniform1f(pLoc.uStretchAmp, config.stretchAmp);
            gl.uniform1f(pLoc.uSpeedGlow, config.speedGlow);
            const palette = getPalette();
            const stopCount = Math.min(palette.length, MAX_FLOW_STOPS);
            gl.uniform1i(pLoc.uStopCount, stopCount);
            const palData = new Float32Array(MAX_FLOW_STOPS * 3);
            for (let i = 0; i < MAX_FLOW_STOPS; i++) {
                const stop = palette[Math.min(i, stopCount - 1)] ?? palette[0];
                const lin = oklchToLinear(stop);
                palData[i * 3 + 0] = lin[0];
                palData[i * 3 + 1] = lin[1];
                palData[i * 3 + 2] = lin[2];
            }
            gl.uniform3fv(pLoc.uPalette, palData);
            gl.drawArrays(gl.POINTS, 0, count);

            // ── 4. PRESENT: composite trailTex[cur] over the warm floor → the swapchain ──
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.disable(gl.BLEND);
            gl.useProgram(presentProg);
            gl.bindVertexArray(quadVao);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, trailTex![cur]);
            gl.uniform1i(rLoc.uTrail, 0);
            const hasGround = config.background === "transparent" ? 0 : 1;
            const floorLin = oklchToLinear(
                config.background === "transparent" ? FLOW_FLOOR_OKLCH : config.background,
            );
            const bloomLin = oklchToLinear(FLOW_BLOOM_OKLCH);
            gl.uniform3f(rLoc.uFloor, floorLin[0], floorLin[1], floorLin[2]);
            gl.uniform3f(rLoc.uBloom, bloomLin[0], bloomLin[1], bloomLin[2]);
            gl.uniform1f(rLoc.uHasGround, hasGround);
            gl.drawArrays(gl.TRIANGLES, 0, 3);

            gl.bindVertexArray(null);
            ping = prev; // swap state + trail in lockstep
        }

        return {
            frame,
            shouldContinue,
            resize,
            teardown: () => {
                gl.deleteProgram(stateProg);
                gl.deleteProgram(pointProg);
                gl.deleteProgram(trailProg);
                gl.deleteProgram(presentProg);
                gl.deleteVertexArray(quadVao);
                gl.deleteVertexArray(pointVao);
                gl.deleteBuffer(quadBuf);
                stateTex.forEach((t) => gl.deleteTexture(t));
                stateFbo.forEach((f) => gl.deleteFramebuffer(f));
                trailTex?.forEach((t) => gl.deleteTexture(t));
                trailFbo?.forEach((f) => gl.deleteFramebuffer(f));
            },
        };
    };
}

/** Probe whether an internal format is color-renderable as a float FBO target (R-A). */
function probeRenderable(
    gl: WebGL2RenderingContext,
    internal: number,
    type: number,
): boolean {
    const tex = gl.createTexture();
    const fbo = gl.createFramebuffer();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, internal, 2, 2, 0, gl.RGBA, type, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
    const ok = gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE;
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.deleteFramebuffer(fbo);
    gl.deleteTexture(tex);
    return ok;
}

/** Pack a Float32Array to half-float (RGBA16F upload) — the RGBA32F-absent fallback (R-A). */
function float32ToHalf(src: Float32Array): Uint16Array {
    const out = new Uint16Array(src.length);
    for (let i = 0; i < src.length; i++) out[i] = f32ToF16(src[i]);
    return out;
}

/** IEEE-754 float32 → float16 bits (the standard round-to-nearest packing). */
function f32ToF16(val: number): number {
    const f32 = new Float32Array(1);
    const i32 = new Int32Array(f32.buffer);
    f32[0] = val;
    const x = i32[0];
    const sign = (x >> 16) & 0x8000;
    let exp = ((x >> 23) & 0xff) - 127 + 15;
    let mant = x & 0x7fffff;
    if (exp <= 0) return sign;
    if (exp >= 0x1f) return sign | 0x7c00;
    mant = mant >> 13;
    return sign | (exp << 10) | mant;
}
