/**
 * Aurora WGSL setup seam — the WebGPU twin of `glSetup` + `frameLoop`.
 *
 * `createAuroraWGPUSetup` returns a `setupWGPU(device, context, format)` callback the
 * `useGpuSubstrate` picker invokes on the async arm (AND on every device-restore). It
 * builds the render pipeline (the `aurora.wgsl` full-screen-triangle pass), the uniform
 * buffer (the `uniformBridgeWGPU` typed-struct source-of-truth), and the bind group, then
 * returns the substrate's per-frame hooks (`frame`/`shouldContinue`/`resize`/`time`/
 * `teardown`).
 *
 * The render-demand gate + the cursor-advance + the DPR resize mirror the WebGL2
 * `frameLoop`/`runtime.resize` exactly — the loop is substrate-AGNOSTIC, so the same
 * `getConfig`/`getReducedMotion`/`cursor` closures drive both backends.
 */

import type {
    WebGPUCanvasFrame,
    BackingSize,
} from "../../../composables/glass/webgpu/useWebGPUCanvas";
import { AURORA_WGSL } from "../constants/shaders/aurora.wgsl";
import { AURORA_IMAGE_WGSL } from "../constants/shaders/aurora-image.wgsl";
import {
    mapAuroraCursor,
    auroraFieldLive,
    type AuroraCursorScalars,
} from "./frameLoop";
import {
    AURORA_WGPU_UNIFORM_BYTES,
    createAuroraWGPUUniformScratch,
    packAuroraWGPUUniforms,
} from "./uniformBridgeWGPU";
import {
    AURORA_IMAGE_WGPU_UNIFORM_BYTES,
    createAuroraImageWGPUScratch,
    packAuroraImageWGPUUniforms,
} from "./uniformBridgeWGPUImage";
import {
    placeholderImageSource,
    uploadImageTextureWebGPU,
    type UploadableImageSource,
} from "./textureUpload";
import type { AuroraConfig } from "../constants/presets";
import type { UsePointerVelocityField } from "../../../composables/motion/pointer/usePointerVelocityField";

export interface AuroraWGPUSetupDeps {
    canvas: HTMLCanvasElement;
    /** Live canvases present opaque; capture canvases retain premultiplied alpha. */
    opaquePresentation: boolean;
    /** The cursor strength ceiling + radius (the runtime's imperative setters write these). */
    getCursorScalars: () => AuroraCursorScalars;
    getConfig: () => AuroraConfig;
    getReducedMotion: () => boolean;
    /** Resolve shader time while pointer physics retain the real frame delta. */
    getRenderTime: (elapsedSec: number) => number;
    /**
     * Shared viz-pointer-physics field. The WGPU frame callback feeds
     * `tick(deltaMs)` on the same field instance as WebGL2; it owns no rAF.
     */
    pointerField: UsePointerVelocityField;
    /**
     * the decoded photo the `source:"image"` program samples (or
     * `null` before decode, on a palette config). Read at setup + on re-upload.
     */
    getDecodedImage: () => UploadableImageSource | null;
    /**
     * register the backend's texture uploader with the runtime so
     * a late-arriving decode re-uploads into the live GPU texture. Passing `null` clears
     * it (teardown). The runtime calls the registered fn when a decode resolves.
     */
    registerImageUploader: (
        fn: ((src: UploadableImageSource) => void) | null,
    ) => void;
}

// The WebGPU usage/visibility bitflags as their SPEC-defined constants. `lib.dom.d.ts`
// declares the GPU* interface TYPES but NOT the runtime `GPUBufferUsage`/`GPUShaderStage`
// VALUE namespaces (those ride `@webgpu/types`, which the library does not depend on —
// the substrate uses GPU types only). The spec values are stable + immutable
// (webgpu.idl): GPUBufferUsage.UNIFORM = 0x40, COPY_DST = 0x8; GPUShaderStage.FRAGMENT
// = 0x2. Naming them here keeps the call sites readable without the extra type dep.
const BUFFER_USAGE_UNIFORM = 0x40;
const BUFFER_USAGE_COPY_DST = 0x8;
const SHADER_STAGE_FRAGMENT = 0x2;

const PREMULTIPLIED_BLEND: GPUBlendState = {
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
};

/**
 * Build the aurora `setupWGPU(device, context, format)` callback. Closes over the
 * aurora-specific state (cursor/config/reduced-motion) the runtime owns — identical to
 * the closures the WebGL2 `setup` threads.
 */
export function createAuroraWGPUSetup(
    deps: AuroraWGPUSetupDeps,
): (device: GPUDevice, context: GPUCanvasContext, format: GPUTextureFormat) => WebGPUCanvasFrame {
    const {
        canvas,
        opaquePresentation,
        getCursorScalars,
        getConfig,
        getReducedMotion,
        getRenderTime,
        pointerField,
        getDecodedImage,
        registerImageUploader,
    } = deps;
    // Per-frame delta for the shared field's tick(). The
    // first frame seeds prevTime so the opening delta is 0 — no teleport spike).
    let prevTimeSec: number | null = null;

    return function setupWGPU(device, context, format) {
        // the CONSTRUCTION-TIME program permutation. A
        // `source:"image"` config builds the SEPARATE image pipeline (its own bind group
        // carrying the texture + sampler + the image-uniform tail) rather than the palette
        // program. The palette path below is byte-UNTOUCHED (this returns early).
        if (getConfig().source === "image") {
            return setupImageWGPU(device, context, format, {
                canvas,
                opaquePresentation,
                getCursorScalars,
                getConfig,
                getReducedMotion,
                getRenderTime,
                pointerField,
                getDecodedImage,
                registerImageUploader,
            });
        }

        const module = device.createShaderModule({
            label: "[Aurora] aurora.wgsl",
            code: AURORA_WGSL,
        });

        const uniformBuffer = device.createBuffer({
            label: "[Aurora] uniforms",
            size: AURORA_WGPU_UNIFORM_BYTES,
            usage: BUFFER_USAGE_UNIFORM | BUFFER_USAGE_COPY_DST,
        });

        const bindGroupLayout = device.createBindGroupLayout({
            label: "[Aurora] bind-group-0",
            entries: [
                {
                    binding: 0,
                    visibility: SHADER_STAGE_FRAGMENT,
                    buffer: { type: "uniform" },
                },
            ],
        });

        const pipeline = device.createRenderPipeline({
            label: "[Aurora] pipeline",
            layout: device.createPipelineLayout({
                bindGroupLayouts: [bindGroupLayout],
            }),
            vertex: { module, entryPoint: "vs_main" },
            fragment: {
                module,
                entryPoint: "fs_main",
                targets: [
                    {
                        format,
                        blend: opaquePresentation
                            ? undefined
                            : PREMULTIPLIED_BLEND,
                    },
                ],
            },
            primitive: { topology: "triangle-list" },
        });

        const bindGroup = device.createBindGroup({
            label: "[Aurora] bind-group",
            layout: bindGroupLayout,
            entries: [{ binding: 0, resource: { buffer: uniformBuffer } }],
        });

        const scratch = createAuroraWGPUUniformScratch();

        // upload-only. The LEAF sizer already set the backing
        // store (round(gBCR × resolveAuroraWashDpr), the call-site dprPolicy); the WGPU
        // swap chain auto-resizes to it on the next frame, so the WGSL leg is a no-op.
        function resize(_s: BackingSize): void {}

        function frame(timeSec: number): void {
            // FEED the shared pointer field one tick (the one-loop
            // push-step; no own rAF). Under PRM tick(0) freezes the field. Map its readout
            // onto the cursor uniforms (the SAME `mapAuroraCursor` the WebGL2 loop uses —
            // one source, incl. the iOS-27 gel snap-back).
            const tempo = getReducedMotion() ? 0 : 1;
            const deltaMs =
                prevTimeSec === null
                    ? 0
                    : Math.max(0, (timeSec - prevTimeSec) * 1000);
            prevTimeSec = timeSec;
            pointerField.tick(tempo === 0 ? 0 : deltaMs);
            const cursor = mapAuroraCursor(pointerField, getCursorScalars(), tempo);

            // Pack + upload the uniforms (slider drag refills the scratch in place).
            const config = getConfig();
            packAuroraWGPUUniforms(
                scratch,
                config,
                cursor,
                getRenderTime(timeSec),
                opaquePresentation ? 1 : config.alpha,
            );
            device.queue.writeBuffer(uniformBuffer, 0, scratch.buffer);

            const view = context.getCurrentTexture().createView();
            const encoder = device.createCommandEncoder({ label: "[Aurora] frame" });
            const pass = encoder.beginRenderPass({
                colorAttachments: [
                    {
                        view,
                        clearValue: {
                            r: 0,
                            g: 0,
                            b: 0,
                            a: opaquePresentation ? 1 : 0,
                        },
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

        function shouldContinue(): boolean {
            if (getReducedMotion()) return false;
            const config = getConfig();
            const driftLive =
                config.nucleiDrift !== 0 ||
                config.paletteDrift !== 0 ||
                config.breathDepth !== 0 ||
                config.warpDrift !== 0;
            if (driftLive) return true;
            return auroraFieldLive(pointerField);
        }

        return {
            frame,
            shouldContinue,
            resize,
            teardown: () => {
                uniformBuffer.destroy();
            },
        };
    };
}

// the SEPARATE image pipeline (the construction-time permutation).
// Its own bind group carries the uniform buffer (binding 0), the image texture (binding 1),
// and the sampler (binding 2). The texture is uploaded through the ONE shared
// `uploadImageTextureWebGPU` primitive (never a raw `createTexture` + `copyExternalImage`
// here — the cross-engine parity floor). A late-arriving decode re-uploads + rebuilds the
// bind group via the registered uploader.
function setupImageWGPU(
    device: GPUDevice,
    context: GPUCanvasContext,
    format: GPUTextureFormat,
    deps: AuroraWGPUSetupDeps,
): WebGPUCanvasFrame {
    const {
        canvas,
        opaquePresentation,
        getCursorScalars,
        getConfig,
        getReducedMotion,
        getRenderTime,
        pointerField,
        getDecodedImage,
        registerImageUploader,
    } = deps;
    let prevTimeSec: number | null = null;

    const module = device.createShaderModule({
        label: "[Aurora] aurora-image.wgsl",
        code: AURORA_IMAGE_WGSL,
    });

    const uniformBuffer = device.createBuffer({
        label: "[Aurora] image uniforms",
        size: AURORA_IMAGE_WGPU_UNIFORM_BYTES,
        usage: BUFFER_USAGE_UNIFORM | BUFFER_USAGE_COPY_DST,
    });

    const sampler = device.createSampler({
        label: "[Aurora] image sampler",
        magFilter: "linear",
        minFilter: "linear",
        addressModeU: "clamp-to-edge",
        addressModeV: "clamp-to-edge",
    });

    const bindGroupLayout = device.createBindGroupLayout({
        label: "[Aurora] image bind-group-0",
        entries: [
            { binding: 0, visibility: SHADER_STAGE_FRAGMENT, buffer: { type: "uniform" } },
            {
                binding: 1,
                visibility: SHADER_STAGE_FRAGMENT,
                texture: { sampleType: "float", viewDimension: "2d" },
            },
            {
                binding: 2,
                visibility: SHADER_STAGE_FRAGMENT,
                sampler: { type: "filtering" },
            },
        ],
    });

    const pipeline = device.createRenderPipeline({
        label: "[Aurora] image pipeline",
        layout: device.createPipelineLayout({ bindGroupLayouts: [bindGroupLayout] }),
        vertex: { module, entryPoint: "vs_main" },
        fragment: {
            module,
            entryPoint: "fs_main",
            targets: [
                {
                    format,
                    blend: opaquePresentation
                        ? undefined
                        : PREMULTIPLIED_BLEND,
                },
            ],
        },
        primitive: { topology: "triangle-list" },
    });

    // Seed the texture through the shared primitive — the decoded photo if present, else the
    // neutral 1×1 placeholder so the sampler is always complete (never a black-garbage frame).
    let imageTexture = uploadImageTextureWebGPU(
        device,
        getDecodedImage() ?? placeholderImageSource(),
    ).texture;

    function buildBindGroup(): GPUBindGroup {
        return device.createBindGroup({
            label: "[Aurora] image bind-group",
            layout: bindGroupLayout,
            entries: [
                { binding: 0, resource: { buffer: uniformBuffer } },
                { binding: 1, resource: imageTexture.createView() },
                { binding: 2, resource: sampler },
            ],
        });
    }
    let bindGroup = buildBindGroup();

    // Register the late-decode uploader with the runtime: a resolved decode re-uploads
    // through the SAME shared primitive + rebuilds the bind group over the new texture.
    registerImageUploader((source) => {
        imageTexture.destroy();
        imageTexture = uploadImageTextureWebGPU(device, source).texture;
        bindGroup = buildBindGroup();
    });

    const scratch = createAuroraImageWGPUScratch();

    function resize(_s: BackingSize): void {}

    function frame(timeSec: number): void {
        const tempo = getReducedMotion() ? 0 : 1;
        const deltaMs =
            prevTimeSec === null ? 0 : Math.max(0, (timeSec - prevTimeSec) * 1000);
        prevTimeSec = timeSec;
        pointerField.tick(tempo === 0 ? 0 : deltaMs);
        const cursor = mapAuroraCursor(pointerField, getCursorScalars(), tempo);

        const aspect =
            canvas.height > 0 ? canvas.width / canvas.height : 1.0;
        const config = getConfig();
        packAuroraImageWGPUUniforms(
            scratch,
            config,
            cursor,
            getRenderTime(timeSec),
            aspect,
            opaquePresentation ? 1 : config.alpha,
        );
        device.queue.writeBuffer(uniformBuffer, 0, scratch.buffer);

        const view = context.getCurrentTexture().createView();
        const encoder = device.createCommandEncoder({ label: "[Aurora] image frame" });
        const pass = encoder.beginRenderPass({
            colorAttachments: [
                {
                    view,
                    clearValue: {
                        r: 0,
                        g: 0,
                        b: 0,
                        a: opaquePresentation ? 1 : 0,
                    },
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

    function shouldContinue(): boolean {
        if (getReducedMotion()) return false;
        const config = getConfig();
        const driftLive =
            config.nucleiDrift !== 0 ||
            config.warpDrift !== 0 ||
            config.paletteDrift !== 0;
        if (driftLive) return true;
        return auroraFieldLive(pointerField);
    }

    return {
        frame,
        shouldContinue,
        resize,
        teardown: () => {
            registerImageUploader(null);
            imageTexture.destroy();
            uniformBuffer.destroy();
        },
    };
}
