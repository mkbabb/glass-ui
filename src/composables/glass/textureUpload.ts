/**
 * The ONE shared texture-upload primitive.
 *
 * A photo entering a dual-engine (WebGL2 + WebGPU) shader family has ONE genuine
 * cross-engine hazard: the WebGL2 and WebGPU uploads differ on premultiply,
 * colour-space and flip-Y defaults (gpuweb #4356; Safari's
 * `copyExternalImageToTexture(ImageBitmap)` history). Left ad-hoc per site it bites
 * invisibly and per-backend. This module NORMALISES the decode + declares the SAME
 * flag set EXPLICITLY on both upload legs, so a texture reads identically on Chromium
 * and WebKit — the single seam every image-consuming viz routes through.
 *
 * `<Aurora source="image">` consumes this upload seam. Further image-backed
 * substrates can share it without adding another texture path.
 * `docs/consumer-evidence/texture-upload.md`.
 *
 * Internal and absent from the public `src/composables/glass/index.ts` barrel, like the
 * WebGL2 and WebGPU substrates: Aurora and dot-image compose it via a direct
 * relative import.
 *
 * The decode contract (BOTH legs share it):
 *   `createImageBitmap(blob, { premultiplyAlpha: "none", colorSpaceConversion: "none" })`
 * so the decoded bytes are raw sRGB-encoded, un-premultiplied — the shader owns the
 * sRGB→linear transfer + the premultiply-on-display, exactly like the procedural path.
 */

/** The shared decode options — the ONE normalised `createImageBitmap` flag set. */
export const IMAGE_DECODE_OPTIONS: ImageBitmapOptions = {
    premultiplyAlpha: "none",
    colorSpaceConversion: "none",
};

/**
 * An already-uploadable image source — a decoded bitmap or a live DOM raster that
 * both `gl.texImage2D` and `queue.copyExternalImageToTexture` accept directly.
 */
export type UploadableImageSource =
    | ImageBitmap
    | HTMLImageElement
    | HTMLCanvasElement
    | OffscreenCanvas
    | ImageData;

/**
 * Anything a consumer may hand the axis: a URL string, `Blob` (needs a decode) OR an
 * already-uploadable source (passed straight through). `resolveImageSource` normalises
 * every form to an {@link UploadableImageSource} via the shared decode contract.
 */
export type ImageInputSource = UploadableImageSource | Blob | string;

/**
 * Decode a `Blob` to an `ImageBitmap` through the shared normalised flag set. The
 * single decode home — a consumer NEVER re-spells `createImageBitmap` with its own
 * (divergent) options.
 */
export function decodeImageBitmap(blob: Blob): Promise<ImageBitmap> {
    return createImageBitmap(blob, IMAGE_DECODE_OPTIONS);
}

/**
 * Normalise any {@link ImageInputSource} to an uploadable source. A URL string is
 * fetched → blob → decoded; a `Blob` is decoded; an already-uploadable source is
 * returned as-is. Deterministic + DOM-light (only the URL path touches `fetch`).
 */
export async function resolveImageSource(
    src: ImageInputSource,
): Promise<UploadableImageSource> {
    if (typeof src === "string") {
        const res = await fetch(src);
        return decodeImageBitmap(await res.blob());
    }
    if (src instanceof Blob) return decodeImageBitmap(src);
    return src;
}

/**
 * A 1×1 mid-grey placeholder source — the texture a `source:"image"` program samples
 * BEFORE its real photo has decoded (so the sampler is always complete + the first frame
 * is a neutral wash, never black garbage). Routed through the SAME upload primitive so
 * texture creation has exactly ONE home (the anti-evasion floor). DOM-only (`ImageData`).
 */
export function placeholderImageSource(): ImageData {
    const data = new ImageData(1, 1);
    data.data.set([128, 128, 128, 255]);
    return data;
}

/** The intrinsic pixel dimensions of an uploadable source (both legs size the texture from it). */
export function imageSourceDimensions(src: UploadableImageSource): {
    width: number;
    height: number;
} {
    if (src instanceof HTMLImageElement) {
        return { width: src.naturalWidth, height: src.naturalHeight };
    }
    return { width: src.width, height: src.height };
}

// ── WebGL2 leg ──────────────────────────────────────────────────────────────
// The explicit `pixelStorei` flag set. FLIP_Y=false + PREMULTIPLY=false ARE the GL
// defaults, but we set them explicitly so the parity contract is READABLE at the call
// site (never a silent inherited default); COLORSPACE_CONVERSION=NONE is the one that
// DIFFERS from the `BROWSER_DEFAULT_WEBGL` default — the gpuweb-#4356 hazard. The flags
// are GL-global state, so we RESTORE them to their defaults after the upload (a shared
// primitive must not disturb a sibling texture upload — the dot-image consumer's floor).

/** WebGL2 upload options — the sampling register the texture is created with. */
export interface WebGL2TextureOptions {
    /** Min/mag filter. Default `LINEAR` (the smooth-bokeh dissolve register). */
    linearFilter?: boolean;
    /** Wrap mode. Default `CLAMP_TO_EDGE` (a cover-fit backdrop never tiles). */
    clampToEdge?: boolean;
}

/**
 * Upload an image into a fresh WebGL2 texture through the shared explicit flag set.
 * Returns the bound texture (the caller sets the sampler uniform to its unit + binds
 * it per draw). The premultiply/colour-space/flip-Y flags are declared explicitly,
 * then restored so the primitive leaves no global GL residue.
 */
export function uploadImageTextureWebGL2(
    gl: WebGL2RenderingContext,
    source: UploadableImageSource,
    opts: WebGL2TextureOptions = {},
): WebGLTexture {
    const { linearFilter = true, clampToEdge = true } = opts;

    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);

    // The SHARED explicit flag set — the cross-engine parity contract, spelled out.
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
    gl.pixelStorei(gl.UNPACK_COLORSPACE_CONVERSION_WEBGL, gl.NONE);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);

    gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        source as TexImageSource,
    );

    const filter = linearFilter ? gl.LINEAR : gl.NEAREST;
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
    const wrap = clampToEdge ? gl.CLAMP_TO_EDGE : gl.REPEAT;
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrap);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrap);

    // Restore the flag globals to their GL defaults (the no-residue floor).
    gl.pixelStorei(gl.UNPACK_COLORSPACE_CONVERSION_WEBGL, gl.BROWSER_DEFAULT_WEBGL);

    return tex;
}

// ── WebGPU leg ──────────────────────────────────────────────────────────────
// `GPUTextureUsage` is a SPEC-defined VALUE namespace `lib.dom.d.ts` declares the
// interface TYPES for but NOT the runtime VALUES (the same gap wgpuSetup.ts names for
// `GPUBufferUsage`/`GPUShaderStage`). The spec values are stable + immutable
// (webgpu.idl): TEXTURE_BINDING = 0x04, COPY_DST = 0x02, RENDER_ATTACHMENT = 0x10.
const TEXTURE_USAGE_TEXTURE_BINDING = 0x04;
const TEXTURE_USAGE_COPY_DST = 0x02;
const TEXTURE_USAGE_RENDER_ATTACHMENT = 0x10;

export interface WebGPUImageTexture {
    texture: GPUTexture;
    width: number;
    height: number;
}

/**
 * Upload an image into a fresh WebGPU texture through the shared explicit flag set.
 * The `copyExternalImageToTexture` destination declares `premultipliedAlpha: false`
 * EXPLICITLY (the WebGPU twin of the WebGL2 `UNPACK_PREMULTIPLY_ALPHA_WEBGL:false`) and
 * the source declares `flipY: false` — so the decoded bytes land in the texture
 * byte-identically to the WebGL2 leg (the cross-engine parity contract). Returns the
 * texture + its dims (the caller builds the sampler + the bind group entry).
 */
export function uploadImageTextureWebGPU(
    device: GPUDevice,
    source: UploadableImageSource,
): WebGPUImageTexture {
    const { width, height } = imageSourceDimensions(source);
    const texture = device.createTexture({
        label: "[texture-upload] image",
        size: [width, height, 1],
        format: "rgba8unorm",
        usage:
            TEXTURE_USAGE_TEXTURE_BINDING |
            TEXTURE_USAGE_COPY_DST |
            TEXTURE_USAGE_RENDER_ATTACHMENT,
    });
    device.queue.copyExternalImageToTexture(
        { source: source as GPUCopyExternalImageSource, flipY: false },
        { texture, premultipliedAlpha: false },
        [width, height, 1],
    );
    return { texture, width, height };
}
