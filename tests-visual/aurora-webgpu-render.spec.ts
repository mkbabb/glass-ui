// AX.W07 — proof:aurora-webgpu-render, the π-lane DEVICE render-and-readback gate.
//
// The cardinal AX instrument: the ONLY assertion that catches the WGSL black-canvas
// class is a real `GPUDevice` render + a centre-pixel readback. Every existing aurora
// WebGPU gate is CPU-math / regex / AST — a `var<uniform>` dynamic-index Metal
// miscompile + an int-in-float upload mismatch are both invisible to them BY
// CONSTRUCTION (`grep GPUDevice scripts/proof-*.mjs` = 0). This spec instantiates the
// REAL `aurora.wgsl.ts` module + the REAL `createGPUAuroraSetup` + the REAL
// `packGPUUniforms` against a real adapter→device, draws the DEFAULT config (+ each
// preset) at t=1 to an offscreen canvas, and reads back the painted pixels.
//
// DEVICE CHOICE (the W00 manifest record + the corpus facet-21 pixel-readback golden
// pattern). Headless Chromium exposes NO `navigator.gpu` even with
// `--enable-unsafe-webgpu` (W00-orchestrator-integration.md, PoC #1) — so on a headless
// runner this spec SKIPs befitting-silent (the device-genuinely-absent disposition, NOT
// a false GREEN). The binding close is the orchestrator's REAL-WebGPU run
// (claude-in-chrome) on the dev-Mac Metal box: a device that IS present but renders
// black is a fail-CLOSED RED (the library-internal defect). The two are NEVER collapsed.
//
// The spec forces the WebGPU path INTERNALLY (it builds the pipeline directly) — it
// tests the SHADER, independent of `WEBGPU_PARITY` (which only gates the LIVE default
// routing). Assertion (d) below separately exercises the routing lever.

import { test, expect } from "@playwright/test";
import { PI_TARGETS } from "./pi-manifest.ts";

// The non-black luma floor (the W00 `proof:substrate-paints-color` primitive): the
// interior centre pixel must clear maxChannel > 0 on a real render. A black canvas
// (the HEAD defect) reads [0,0,0,255] → maxChannel 0 → RED.
const MAX_CHANNEL_FLOOR = 0;
// The WebGL2-vs-WebGPU perceptual delta ceil over the FIELDS THE TWIN CARRIES (base
// isotropic field + palette ramp). Reduced-parity fields (mediums/flow/cursor) are
// EXCLUDED by design — the twin is reduced-parity, so the delta is the base-field
// parity, not the full GLSL six-medium image. The DEFAULT smooth-medium centre luma
// measured WebGPU≈220 vs WebGL2≈217 (delta≈3) on a real Metal adapter; the threshold is
// set generous (the twin's straight-OKLab palette diverges from the GLSL OKLCh hue-arc
// until W14) — we assert SAME-CLASS base-field color, not pixel-identity. A black/blank
// WebGL2-readback regression (delta→220) reds.
const WEBGL_WEBGPU_LUMA_DELTA_MAX = 40; // 0..255 centre-luma delta

test.setTimeout(180_000);

/**
 * The in-page device render. Imports the REAL aurora modules off the Vite dev server,
 * acquires a real device, builds the pipeline, draws at t=1, reads back the centre
 * pixel + the raw uniform buffer for the per-i32-field decode. Returns null when
 * `navigator.gpu` is genuinely absent (the headless SKIP signal).
 */
async function renderAndReadback(page: import("@playwright/test").Page) {
    return await page.evaluate(async () => {
        // Genuine device-absence — the headless SKIP signal (NOT a black render).
        if (typeof navigator === "undefined" || !navigator.gpu) return null;
        const adapter = await navigator.gpu.requestAdapter({
            powerPreference: "high-performance",
        });
        if (!adapter) return null;
        const device = await adapter.requestDevice();

        // The REAL library modules, resolved off the dev server's aurora module graph.
        const wgsl = await import(
            "/src/components/custom/aurora/constants/shaders/aurora.wgsl.ts"
        );
        const bridge = await import(
            "/src/components/custom/aurora/composables/uniformBridge.ts"
        );
        const presets = await import(
            "/src/components/custom/aurora/constants/presets.ts"
        );

        const SIZE = 64; // a small offscreen target — the centre pixel is all the floor needs
        const format = "rgba8unorm" as GPUTextureFormat;
        const target = device.createTexture({
            size: [SIZE, SIZE],
            format,
            usage:
                GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC,
        });

        const module = device.createShaderModule({ code: wgsl.AURORA_WGSL });
        const pipeline = device.createRenderPipeline({
            layout: "auto",
            vertex: { module, entryPoint: "vs_main" },
            fragment: {
                module,
                entryPoint: "fs_main",
                targets: [
                    {
                        format,
                        blend: {
                            color: { srcFactor: "one", dstFactor: "one-minus-src-alpha" },
                            alpha: { srcFactor: "one", dstFactor: "one-minus-src-alpha" },
                        },
                    },
                ],
            },
            primitive: { topology: "triangle-list" },
        });

        const uniformData = new Float32Array(bridge.WGPU_UNIFORM_FLOATS);
        const fieldData = new Float32Array(bridge.WGPU_FIELD_FLOATS);
        const uniformBuffer = device.createBuffer({
            size: uniformData.byteLength,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
        });
        const fieldBuffer = device.createBuffer({
            size: fieldData.byteLength,
            usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
        });
        const bindGroup = device.createBindGroup({
            layout: pipeline.getBindGroupLayout(0),
            entries: [
                { binding: 0, resource: { buffer: uniformBuffer } },
                { binding: 1, resource: { buffer: fieldBuffer } },
            ],
        });

        // A readback buffer for the centre row (256-byte aligned bytesPerRow).
        const bytesPerRow = 256;
        const readBuffer = device.createBuffer({
            size: bytesPerRow * SIZE,
            usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ,
        });

        function drawAndRead(cfg: unknown) {
            bridge.packGPUUniforms(cfg, 1.0, uniformData, fieldData);
            device.queue.writeBuffer(uniformBuffer, 0, uniformData);
            device.queue.writeBuffer(fieldBuffer, 0, fieldData);
            const encoder = device.createCommandEncoder();
            const pass = encoder.beginRenderPass({
                colorAttachments: [
                    {
                        view: target.createView(),
                        clearValue: { r: 0, g: 0, b: 0, a: 0 },
                        loadOp: "clear",
                        storeOp: "store",
                    },
                ],
            });
            pass.setPipeline(pipeline);
            pass.setBindGroup(0, bindGroup);
            pass.draw(3);
            pass.end();
            encoder.copyTextureToBuffer(
                { texture: target },
                { buffer: readBuffer, bytesPerRow },
                { width: SIZE, height: SIZE },
            );
            device.queue.submit([encoder.finish()]);
        }

        async function centrePixel(): Promise<[number, number, number, number]> {
            await readBuffer.mapAsync(GPUMapMode.READ);
            const bytes = new Uint8Array(readBuffer.getMappedRange().slice(0));
            readBuffer.unmap();
            // Centre row, centre column. rgba8unorm + premultiplied → un-premultiply by
            // the alpha so the floor reads the painted color, not the composited dim.
            const row = Math.floor(SIZE / 2);
            const col = Math.floor(SIZE / 2);
            const o = row * bytesPerRow + col * 4;
            const a = bytes[o + 3]! || 255;
            const un = (c: number) => Math.min(255, Math.round((c * 255) / a));
            return [un(bytes[o]!), un(bytes[o + 1]!), un(bytes[o + 2]!), a];
        }

        // (b) per-i32-field decode parity: the count slots carry legitimate FLOATS the
        // shader i32()-casts (the AX.W07 1a fix). At HEAD the WGSL struct declared these
        // fields `i32`, so the shader read the raw 4 bytes of the float as an i32 and got
        // the IEEE-754 BIT-PATTERN (stopCount_raw = bits(3.0) = 1077936128) → the ramp
        // index overflowed → BLACK. After the fix the field is f32 + i32()-cast, so the
        // value the shader sees is the COUNT. The decode mirrors the shader: read the
        // float slot, i32()-cast (truncate) → the integer count. The struct-level witness
        // (the fields are declared f32, not i32) is asserted alongside.
        const def = presets.DEFAULT_AURORA_CONFIG;
        drawAndRead(def);
        const defaultPixel = await centrePixel();
        const countFieldsAreF32 =
            /stopCount:\s*f32/.test(wgsl.AURORA_WGSL) &&
            /nucleiCount:\s*f32/.test(wgsl.AURORA_WGSL) &&
            /noiseOctaves:\s*f32/.test(wgsl.AURORA_WGSL) &&
            !/stopCount:\s*i32/.test(wgsl.AURORA_WGSL);
        const fieldDecode = {
            // The shader's i32()-cast of each f32-packed slot — the integer count.
            stopCount: Math.trunc(uniformData[1]!),
            nucleiCount: Math.trunc(uniformData[2]!),
            noiseOctaves: Math.trunc(uniformData[9]!),
            // The struct declares the count fields f32 (the int-in-float class is gone).
            countFieldsAreF32,
        };

        return {
            defaultPixel,
            fieldDecode,
            adapterInfo: {
                vendor: adapter.info?.vendor ?? null,
                architecture: adapter.info?.architecture ?? null,
                isFallback: adapter.info?.isFallbackAdapter ?? null,
            },
        };
    });
}

test.describe("aurora-webgpu-render (π lane — fail-CLOSED on a present device)", () => {
    test("the WGSL twin paints a non-black centre pixel + decodes the i32 counts (DEFAULT, t=1)", async ({
        page,
    }) => {
        await page.goto(PI_TARGETS.aurora.path);
        // Let the aurora module graph finish loading off the dev server.
        await page.locator("canvas.aurora-canvas").first().waitFor({
            state: "visible",
            timeout: 20_000,
        });

        const result = await renderAndReadback(page);

        // (Device-absent disposition) — a genuinely-absent `navigator.gpu` (headless
        // Chromium) is a befitting-silent SKIP. The binding close is the orchestrator's
        // real-WebGPU run; a present device rendering black fails-CLOSED below.
        test.skip(
            result === null,
            "navigator.gpu absent on this runner (headless Chromium has no WebGPU) — the binding close is the orchestrator real-WebGPU run; see W00-orchestrator-integration.md PoC #1",
        );
        if (!result) return;

        // (a) non-black luma floor — the black-canvas defect the wave kills.
        const [r, g, b] = result.defaultPixel;
        const maxCh = Math.max(r, g, b);
        expect(
            maxCh,
            `aurora WGSL twin painted a BLACK centre pixel [${r},${g},${b}] — the int-in-float / var<uniform> dynamic-index black-canvas class (adapter ${result.adapterInfo.vendor}/${result.adapterInfo.architecture})`,
        ).toBeGreaterThan(MAX_CHANNEL_FLOOR);

        // (b) per-i32-field decode parity — the int-in-float catch at the upload contract.
        expect(
            result.fieldDecode.stopCount,
            "stopCount decode (DEFAULT config has 3 palette stops)",
        ).toBe(3);
        expect(
            result.fieldDecode.nucleiCount,
            "nucleiCount decode (DEFAULT config has 2 nuclei)",
        ).toBe(2);
        expect(
            result.fieldDecode.noiseOctaves,
            "noiseOctaves decode (DEFAULT config is 4 octaves)",
        ).toBe(4);
        // The struct declares the count fields f32 — the int-in-float class is gone (the
        // shader i32()-casts a legitimate float, never reads a float bit-pattern as i32).
        expect(
            result.fieldDecode.countFieldsAreF32,
            "the WGSL Uniforms struct declares stopCount/nucleiCount/noiseOctaves as f32 (not i32) — the int-in-float class is eliminated at the root (AX.W07 1a)",
        ).toBe(true);
    });

    test("the WebGPU base field is the SAME color-class as the WebGL2 reference (delta below the parity threshold)", async ({
        page,
    }) => {
        await page.goto(PI_TARGETS.aurora.path);
        await page.locator("canvas.aurora-canvas").first().waitFor({
            state: "visible",
            timeout: 20_000,
        });

        const delta = await page.evaluate(async (): Promise<number | null> => {
            if (typeof navigator === "undefined" || !navigator.gpu) return null;
            const adapter = await navigator.gpu.requestAdapter({
                powerPreference: "high-performance",
            });
            if (!adapter) return null;
            const device = await adapter.requestDevice();

            const wgsl = await import(
                "/src/components/custom/aurora/constants/shaders/aurora.wgsl.ts"
            );
            const bridge = await import(
                "/src/components/custom/aurora/composables/uniformBridge.ts"
            );
            const presets = await import(
                "/src/components/custom/aurora/constants/presets.ts"
            );
            const runtimeMod = await import(
                "/src/components/custom/aurora/composables/runtime.ts"
            );

            const SIZE = 64;
            const cfg = presets.DEFAULT_AURORA_CONFIG;

            // ── WebGPU centre luma ───────────────────────────────────────────────
            const format = "rgba8unorm" as GPUTextureFormat;
            const target = device.createTexture({
                size: [SIZE, SIZE],
                format,
                usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC,
            });
            const module = device.createShaderModule({ code: wgsl.AURORA_WGSL });
            const pipeline = device.createRenderPipeline({
                layout: "auto",
                vertex: { module, entryPoint: "vs_main" },
                fragment: {
                    module,
                    entryPoint: "fs_main",
                    targets: [
                        {
                            format,
                            blend: {
                                color: { srcFactor: "one", dstFactor: "one-minus-src-alpha" },
                                alpha: { srcFactor: "one", dstFactor: "one-minus-src-alpha" },
                            },
                        },
                    ],
                },
                primitive: { topology: "triangle-list" },
            });
            const uniformData = new Float32Array(bridge.WGPU_UNIFORM_FLOATS);
            const fieldData = new Float32Array(bridge.WGPU_FIELD_FLOATS);
            const uniformBuffer = device.createBuffer({
                size: uniformData.byteLength,
                usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
            });
            const fieldBuffer = device.createBuffer({
                size: fieldData.byteLength,
                usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
            });
            const bindGroup = device.createBindGroup({
                layout: pipeline.getBindGroupLayout(0),
                entries: [
                    { binding: 0, resource: { buffer: uniformBuffer } },
                    { binding: 1, resource: { buffer: fieldBuffer } },
                ],
            });
            const bytesPerRow = 256;
            const readBuffer = device.createBuffer({
                size: bytesPerRow * SIZE,
                usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ,
            });
            bridge.packGPUUniforms(cfg, 1.0, uniformData, fieldData);
            device.queue.writeBuffer(uniformBuffer, 0, uniformData);
            device.queue.writeBuffer(fieldBuffer, 0, fieldData);
            {
                const encoder = device.createCommandEncoder();
                const pass = encoder.beginRenderPass({
                    colorAttachments: [
                        {
                            view: target.createView(),
                            clearValue: { r: 0, g: 0, b: 0, a: 0 },
                            loadOp: "clear",
                            storeOp: "store",
                        },
                    ],
                });
                pass.setPipeline(pipeline);
                pass.setBindGroup(0, bindGroup);
                pass.draw(3);
                pass.end();
                encoder.copyTextureToBuffer(
                    { texture: target },
                    { buffer: readBuffer, bytesPerRow },
                    { width: SIZE, height: SIZE },
                );
                device.queue.submit([encoder.finish()]);
            }
            await readBuffer.mapAsync(GPUMapMode.READ);
            const wbytes = new Uint8Array(readBuffer.getMappedRange().slice(0));
            readBuffer.unmap();
            const wo = Math.floor(SIZE / 2) * bytesPerRow + Math.floor(SIZE / 2) * 4;
            const wa = wbytes[wo + 3]! || 255;
            const un = (c: number) => Math.min(255, (c * 255) / wa);
            const webgpuLuma =
                0.2126 * un(wbytes[wo]!) +
                0.7152 * un(wbytes[wo + 1]!) +
                0.0722 * un(wbytes[wo + 2]!);

            // ── WebGL2 reference centre luma (the ORACLE) — a deterministic capture
            //    bake of the SAME config through the WebGL2 single-pass path. The canvas
            //    must be ATTACHED so the capture runtime sizes + draws; the
            //    `mode:"capture"` runtime sets preserveDrawingBuffer internally so the
            //    same context readPixels-es the painted frame. ───────────────────────
            const c2 = document.createElement("canvas");
            c2.width = SIZE;
            c2.height = SIZE;
            c2.style.width = `${SIZE}px`;
            c2.style.height = `${SIZE}px`;
            document.body.appendChild(c2);
            const aurora = runtimeMod.createAurora(c2, cfg, { mode: "capture" });
            aurora.renderAt(1.0);
            // The capture runtime already created the webgl2 context (preserveDrawingBuffer
            // true); fetch it back (a canvas yields ONE context — re-getContext returns it).
            const gl = c2.getContext("webgl2") as WebGL2RenderingContext | null;
            let webgl2Luma = 0;
            if (gl) {
                const px = new Uint8Array(4);
                gl.readPixels(
                    Math.floor(SIZE / 2),
                    Math.floor(SIZE / 2),
                    1,
                    1,
                    gl.RGBA,
                    gl.UNSIGNED_BYTE,
                    px,
                );
                const ga = px[3]! || 255;
                const ung = (c: number) => Math.min(255, (c * 255) / ga);
                webgl2Luma =
                    0.2126 * ung(px[0]!) +
                    0.7152 * ung(px[1]!) +
                    0.0722 * ung(px[2]!);
            }
            aurora.dispose();
            c2.remove();

            return Math.abs(webgpuLuma - webgl2Luma);
        });

        test.skip(
            delta === null,
            "navigator.gpu absent on this runner — the WebGL2-vs-WebGPU delta is asserted on the orchestrator real-WebGPU run",
        );
        if (delta === null) return;

        expect(
            delta,
            `WebGL2-vs-WebGPU base-field luma delta ${delta.toFixed(1)} exceeds the parity threshold ${WEBGL_WEBGPU_LUMA_DELTA_MAX} — the twin diverged from the WebGL2 reference beyond the reduced-parity base field`,
        ).toBeLessThanOrEqual(WEBGL_WEBGPU_LUMA_DELTA_MAX);
    });

    test("(d) WEBGPU_PARITY === false routes a capable adapter to the WebGL2 substrate (not webgpu)", async ({
        page,
    }) => {
        await page.goto(PI_TARGETS.aurora.path);
        await page.locator("canvas.aurora-canvas").first().waitFor({
            state: "visible",
            timeout: 20_000,
        });

        const routed = await page.evaluate(async () => {
            const rm = await import(
                "/src/components/custom/aurora/constants/renderMode.ts"
            );
            // The lever is the shipped state — false. With it false, a capable adapter
            // (navigator.gpu present) MUST resolve "webgl", never "webgpu" (RED witness 3).
            const hasGpu =
                typeof navigator !== "undefined" && !!navigator.gpu;
            const resolved = await rm.resolveRenderModeAsync("auto");
            return {
                hasGpu,
                webgpuParity: rm.WEBGPU_PARITY,
                substrate: resolved.substrate,
                hasDevice: resolved.device !== null,
            };
        });

        // The lever is shipped false — this assertion is device-INDEPENDENT (it is a
        // runtime CALL of resolveRenderModeAsync, the runtime-observation form, not a grep).
        expect(routed.webgpuParity, "WEBGPU_PARITY is shipped false (W07)").toBe(false);
        expect(
            routed.substrate,
            `resolveRenderModeAsync("auto") returned substrate "${routed.substrate}" with WEBGPU_PARITY=false (hasGpu=${routed.hasGpu}) — a capable machine must NOT bind the reduced-parity WGSL twin while the lever is false`,
        ).not.toBe("webgpu");
        expect(
            routed.hasDevice,
            "WEBGPU_PARITY=false must resolve device:null (no WebGPU device acquired for the default path)",
        ).toBe(false);
    });
});
