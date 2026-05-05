import type { Ref } from "vue";
import type {
    BlobColorHsl,
    BlobConfig,
    MetaballSource,
    RendererHandle,
} from "./types";

/**
 * Canvas2D fallback for `useMetaballRenderer`. Hard-capped at 200×200 so a
 * per-pixel CPU scan keeps frame-time bounded on the main thread. The
 * SDF + smooth-min union and HSL hue-perturbation logic mirrors `blob.frag.glsl`
 * one-for-one (minus chromatic aberration — Canvas2D cannot cheaply sample
 * three SDF positions per channel).
 *
 * SPEC.md §6 ("Canvas2D fallback"); §8 ("WebGL2 unavailable").
 */
const FALLBACK_MAX_DIM = 200;

/** Fragment-shader-equivalent smooth-min: byte-for-byte the GLSL `smin`. */
function smin(a: number, b: number, k: number): number {
    const h = Math.max(k - Math.abs(a - b), 0) / k;
    return Math.min(a, b) - h * h * h * k * (1 / 6);
}

/** Canonical HSL→RGB transform mirroring the GLSL `hsl2rgb`. */
function hsl2rgb(h: number, s: number, l: number): [number, number, number] {
    const f = (n: number): number => {
        const k = (n + h * 6) % 6;
        return Math.max(0, Math.min(1, Math.abs(k - 3) - 1));
    };
    const r = f(0);
    const g = f(4);
    const b = f(2);
    const a = s * Math.min(l, 1 - l);
    return [
        l + a * (r * 2 - 1),
        l + a * (g * 2 - 1),
        l + a * (b * 2 - 1),
    ];
}

/** Tiny smooth-noise stand-in for `snoise` — 2D value-noise via `Math.sin`. */
function pseudoNoise(x: number, y: number): number {
    const v = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
    return (v - Math.floor(v)) * 2 - 1;
}

export function createCanvas2DRenderer(
    canvas: HTMLCanvasElement,
    sources: Ref<MetaballSource[]>,
    color: Ref<BlobColorHsl>,
    config: Ref<Required<BlobConfig>>,
    isWebGLRef: Ref<boolean>,
): RendererHandle {
    isWebGLRef.value = false;

    // Hard-cap size. Caller may have set a larger backing store; clamp it.
    const width = Math.min(canvas.width || FALLBACK_MAX_DIM, FALLBACK_MAX_DIM);
    const height = Math.min(canvas.height || FALLBACK_MAX_DIM, FALLBACK_MAX_DIM);
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
        // Last-resort: every method becomes a no-op. Caller decides what to do.
        return {
            render: () => {},
            dispose: () => {},
            isWebGL: isWebGLRef,
        };
    }

    const imageData = ctx.createImageData(width, height);
    const buf = imageData.data;

    function render(time: number): void {
        const cfg = config.value;
        const col = color.value;
        const list = sources.value;
        const count = Math.min(list.length, 8);
        const k = cfg.smoothK;
        const tSeconds = time * 0.001;

        for (let py = 0; py < height; py++) {
            for (let px = 0; px < width; px++) {
                // NDC: same mapping as the fragment shader.
                const u = px / width;
                const v = py / height;
                const x = u * 2 - 1;
                const y = v * 2 - 1;

                let d = 1e6;
                for (let i = 0; i < count; i++) {
                    const s = list[i];
                    const dx = x - s.x;
                    const dy = y - s.y;
                    const dist = Math.sqrt(dx * dx + dy * dy) - s.radius;
                    d = smin(d, dist, k);
                }

                const edge = 1 - smoothstep(-0.005, 0.005, d);
                if (edge <= 0) {
                    const idx = (py * width + px) * 4;
                    buf[idx] = 0;
                    buf[idx + 1] = 0;
                    buf[idx + 2] = 0;
                    buf[idx + 3] = 0;
                    continue;
                }

                const n = pseudoNoise(
                    u * cfg.colorNoiseFreq + tSeconds * cfg.colorNoiseSpeed,
                    v * cfg.colorNoiseFreq,
                );
                const h = clamp01(col.h + (cfg.hueRange / 360) * n);
                const s = clamp01(col.s + cfg.satShift);
                const l = clamp01(col.l + cfg.brightnessShift);
                const [r, g, b] = hsl2rgb(h, s, l);

                const idx = (py * width + px) * 4;
                buf[idx] = Math.round(r * 255 * edge);
                buf[idx + 1] = Math.round(g * 255 * edge);
                buf[idx + 2] = Math.round(b * 255 * edge);
                buf[idx + 3] = Math.round(edge * 255);
            }
        }

        ctx!.putImageData(imageData, 0, 0);
    }

    function dispose(): void {
        // Canvas2D has no GL state to release; clear the bitmap so the canvas
        // is visually empty if the host reattaches it.
        ctx!.clearRect(0, 0, width, height);
    }

    return { render, dispose, isWebGL: isWebGLRef };
}

function smoothstep(edge0: number, edge1: number, x: number): number {
    const t = clamp01((x - edge0) / (edge1 - edge0));
    return t * t * (3 - 2 * t);
}

function clamp01(x: number): number {
    return x < 0 ? 0 : x > 1 ? 1 : x;
}
