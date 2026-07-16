/**
 * Aurora image-source coordination seam.
 *
 * The `source:"image"` decode + upload state machine, carved out of `runtime.ts` (the
 * no-god-module bound; the same colocation seam `glSetup`/`wgpuSetup` carry). It owns:
 *   - the ONE decode (through the shared `resolveImageSource` normalisation), de-duped on
 *     the same `src` so an `update()` burst never re-decodes;
 *   - the backend-registered `imageUploader` (the WebGL2 runtime OR the WebGPU setup
 *     registers it) — a late-arriving decode flushes into the live GPU texture + wakes the
 *     parked loop;
 *   - the WebGL2 image-texture ARM (`armWebGL2ImageTexture`) — it builds the uploader via
 *     the ONE shared `uploadImageTextureWebGL2` primitive (NEVER a raw `texImage2D` — the
 *     cross-engine parity floor), seeds the placeholder + any already-decoded photo, and
 *     returns a teardown.
 *
 * The runtime composes this leaf as the WebGL2 image-source path.
 */

import {
    placeholderImageSource,
    resolveImageSource,
    uploadImageTextureWebGL2,
    type UploadableImageSource,
} from "../../../composables/glass/textureUpload";
import type { AuroraConfig } from "../constants/presets";

export interface AuroraImageCoordinator {
    /** The decoded photo (or null before decode, on a palette config). */
    getDecodedImage(): UploadableImageSource | null;
    /**
     * Register the active backend's texture uploader; passing `null` clears it (teardown).
     * Setting a fn immediately flushes any already-decoded photo into the fresh texture.
     */
    setImageUploader(fn: ((src: UploadableImageSource) => void) | null): void;
    /** Kick a decode when the config selects `source:"image"` + supplies a `src`. */
    ensureDecoded(cfg: AuroraConfig): void;
}

export function createAuroraImageCoordinator(deps: {
    /** Re-arm the (possibly parked) render loop after a late decode uploads. */
    wake: () => void;
    /** A decode-failure sink (the runtime routes it to `onInitError`). */
    onError?: (err: Error) => void;
}): AuroraImageCoordinator {
    let decoded: UploadableImageSource | null = null;
    let uploader: ((src: UploadableImageSource) => void) | null = null;
    let lastSrc: AuroraConfig["src"] | undefined;

    return {
        getDecodedImage: () => decoded,
        setImageUploader(fn) {
            uploader = fn;
            if (fn && decoded) fn(decoded);
        },
        ensureDecoded(cfg) {
            if (cfg.source !== "image" || cfg.src == null) return;
            if (cfg.src === lastSrc) return;
            lastSrc = cfg.src;
            void resolveImageSource(cfg.src)
                .then((source) => {
                    decoded = source;
                    uploader?.(source);
                    deps.wake();
                })
                .catch((err: unknown) => {
                    deps.onError?.(
                        err instanceof Error ? err : new Error(String(err)),
                    );
                });
        },
    };
}

/**
 * Arm the WebGL2 image texture (unit 0) for a live program. Routes EVERY texture creation
 * through the ONE shared primitive; seeds the neutral placeholder so the sampler is always
 * complete, then any already-decoded photo; registers the uploader so a later decode
 * re-uploads live. Returns a teardown that deletes the texture + un-registers the uploader.
 */
export function armWebGL2ImageTexture(
    gl: WebGL2RenderingContext,
    prog: WebGLProgram,
    coord: AuroraImageCoordinator,
): () => void {
    let imgTex: WebGLTexture | null = null;
    gl.activeTexture(gl.TEXTURE0);
    const uploadImage = (source: UploadableImageSource): void => {
        gl.useProgram(prog);
        gl.activeTexture(gl.TEXTURE0);
        if (imgTex) gl.deleteTexture(imgTex);
        imgTex = uploadImageTextureWebGL2(gl, source); // leaves it bound to unit 0
    };
    uploadImage(coord.getDecodedImage() ?? placeholderImageSource());
    coord.setImageUploader(uploadImage);

    return () => {
        if (imgTex) gl.deleteTexture(imgTex);
        // Un-register: a stale closure over a dead `gl` must never fire on the next arm.
        coord.setImageUploader(null);
    };
}
