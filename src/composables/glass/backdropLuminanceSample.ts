// Stateless backdrop sampling and OKLab reduction.
//
// The observer HOST keeps only the reactive wiring (the useRAFLoop/useIntersectionPause/
// useResizeObserver composition, the reusable downsample-canvas lifecycle, and the
// `--glass-backdrop-*`, `--glass-ambient-*` writes on the target). The two SAMPLERS
// live HERE as pure functions the observer COMPOSES:
//   - `sampleStatic`   — the `elementsFromPoint` stack-walk of the painted background
//                        LAYER (the static page case), un-wrapping `var(--token)`
//                        backgrounds through the resolveTokenColor leaf.
//   - `sampleAnimated` — the downsampled `drawImage + getImageData` read of a known
//                        background `<canvas>` under the surface's bounding box (the
//                        aurora/blob live-field case).
// Both reduce their pixels to a WCAG relative luminance AND the ambient-hue histogram
// (the FREE rider over the SAME getImageData pass). The reusable 2D context is passed
// IN by the observer — the leaf owns NO canvas lifecycle, NO closure state, NO rAF, NO
// reactivity: a pure sampling family (the single-home of the sampling/OKLab math).

import { resolveTokenColor } from "../dom/useResolveTokenColor";
import { isCanvas, relLuminance, parseRgb } from "./backdropSampleMath";
// the ambient-hue histogram (accumulate/resolve + the value.js
// color source) lives in the colocated leaf; the sampler COMPOSES it (the ONE color
// source).
import {
    makeHueHistogram,
    accumulateHuePixel,
    resolveAmbientHue,
} from "./ambientHueHistogram";

/** The per-sample result — the luminance AND the ambient hue (the FREE rider). */
export interface SampleResult {
    /** WCAG relative luminance of the sampled backdrop (0..1). */
    luma: number;
    /** A complete `oklch()` ambient-hue string, or `transparent` for a gray null. */
    ambientHue: string;
}

/**
 * The KNOWN background-layer source for the ANIMATED case — an HTMLCanvasElement, a
 * getter, a CSS selector resolved against the document, or null. The observer's
 * `backgroundCanvas` option is this type.
 */
export type BackgroundCanvasSource =
    | HTMLCanvasElement
    | (() => HTMLCanvasElement | null)
    | string
    | null;

/** The downsample resolution for the animated-field read (a 32×32 mean). */
export const SAMPLE_DOWNSAMPLE = 32;

// The animated field-canvas
// readback carries REAL painted content only when the source WebGL `<canvas>` actually
// rendered a frame AND kept its drawing buffer (`preserveDrawingBuffer`). An
// unrendered, composited-and-cleared, software-raster-fallback field reads
// fully-transparent (mean alpha ≈ 0); compositing THAT over white yields a DEGENERATE
// luma ≈ 1.0 + a `transparent` ambient hue — the "witness fires but the value is a lie"
// state. Below this mean-alpha floor the readback is not a
// valid sample: `sampleAnimated` returns null and the live caller writes `unavailable`
// (see useGlassBackdropLuminance.sampleNow). A null live sample NEVER falls to the
// static stack-walk — that coalescing is deliberately forbidden (P016). Fail-loud,
// never a masking fake value.
export const FIELD_ALPHA_FLOOR = 0.02;

/** Library convention marking the single shell
 *  field canvas (the recessive shell `<Aurora>` the demo chassis mounts behind every
 *  non-focal route; also the BACKDROP-SAMPLE marker). A glass surface that does
 *  NOT name an explicit `backgroundCanvas` auto-discovers this canvas so it samples
 *  the LIVE field rather than a static stack-walk; absent it (a focal route where the
 *  shell stands down, an SSR scope) the static `elementsFromPoint` path is the floor. */
export const SHELL_FIELD_CANVAS_SELECTOR =
    "[data-glass-field-canvas] canvas, canvas[data-glass-field-canvas]";

/**
 * Resolve the animated-case source canvas from the observer's `backgroundCanvas`
 * option (an element, a getter, a selector, or nullish). A nullish source
 * auto-discovers the shell field canvas — the rewire to the live shell field
 * (backward-safe: no field canvas → null → the static elementsFromPoint path).
 */
export function resolveSourceCanvas(
    src: BackgroundCanvasSource | undefined,
): HTMLCanvasElement | null {
    if (!src) {
        if (typeof document !== "undefined") {
            const field = document.querySelector(SHELL_FIELD_CANVAS_SELECTOR);
            if (isCanvas(field)) return field;
        }
        return null;
    }
    if (isCanvas(src)) return src;
    if (typeof src === "function") {
        const c = src();
        return isCanvas(c) ? c : null;
    }
    if (typeof src === "string" && typeof document !== "undefined") {
        const el = document.querySelector(src);
        return isCanvas(el) ? el : null;
    }
    return null;
}

/**
 * Robust CSS-color → sRGB `[r,g,b,a]`. `parseRgb` is the fast path for the legacy
 * `rgb()/rgba()` serialization; ANY other valid CSS color form — the MODERN
 * `oklch()`, `color(srgb …)`, `hsl()` tokens the warm-cream demo basis resolves to —
 * is normalized by painting it onto the 1×1 corner of the reused 2D canvas (passed in)
 * and reading the composited pixel back (`getImageData` ALWAYS returns integer sRGB
 * whatever the source space).: without this `sampleStatic`
 * returned null on a `color(srgb …)`/`oklch(…)` backdrop and wrote NOTHING — the static
 * floor was a DEAD channel. The static floor is now writer-true over ANY backdrop.
 */
export function normalizeToRgb(
    css: string,
    ctx: CanvasRenderingContext2D | null,
): [number, number, number, number] | null {
    const fast = parseRgb(css);
    if (fast) return fast;
    if (!ctx) return null;
    try {
        ctx.clearRect(0, 0, 1, 1);
        ctx.fillStyle = "rgba(0,0,0,0)";
        ctx.fillStyle = css; // an unparseable value is a no-op (keeps transparent)
        ctx.fillRect(0, 0, 1, 1);
        const d = ctx.getImageData(0, 0, 1, 1).data;
        return [d[0]!, d[1]!, d[2]!, d[3]! / 255];
    } catch {
        return null;
    }
}

/**
 * Sample the ANIMATED backdrop: downsample the resolved source canvas under the
 * surface's bounding box → mean relative luminance + the ambient-hue histogram (a FREE
 * rider over the SAME pixel pass). Returns null if no source, an all-transparent
 * (unrendered) field, or a tainted canvas — the live caller writes `unavailable` on a
 * null; it NEVER falls to the static stack-walk (that coalescing is forbidden, P016).
 */
export function sampleAnimated(
    el: HTMLElement,
    source: HTMLCanvasElement | null,
    ctx: CanvasRenderingContext2D | null,
): SampleResult | null {
    if (!source || source.width === 0 || source.height === 0) return null;
    if (!ctx) return null;
    const rect = el.getBoundingClientRect();
    const srcRect = source.getBoundingClientRect();
    if (srcRect.width === 0 || srcRect.height === 0) return null;
    // Map the surface's viewport box → the source canvas's backing-store region.
    const scaleX = source.width / srcRect.width;
    const scaleY = source.height / srcRect.height;
    const sx = Math.max(0, (rect.left - srcRect.left) * scaleX);
    const sy = Math.max(0, (rect.top - srcRect.top) * scaleY);
    const sw = Math.min(source.width - sx, Math.max(1, rect.width * scaleX));
    const sh = Math.min(source.height - sy, Math.max(1, rect.height * scaleY));
    if (sw <= 0 || sh <= 0) return null;
    try {
        ctx.clearRect(0, 0, SAMPLE_DOWNSAMPLE, SAMPLE_DOWNSAMPLE);
        ctx.drawImage(
            source,
            sx,
            sy,
            sw,
            sh,
            0,
            0,
            SAMPLE_DOWNSAMPLE,
            SAMPLE_DOWNSAMPLE,
        );
        const data = ctx.getImageData(
            0,
            0,
            SAMPLE_DOWNSAMPLE,
            SAMPLE_DOWNSAMPLE,
        ).data;
        let sum = 0;
        let alphaSum = 0;
        let n = 0;
        const hist = makeHueHistogram();
        for (let i = 0; i < data.length; i += 4) {
            // Composite over white (the alpha-translucent aurora over the page).
            const a = data[i + 3]! / 255;
            const r = data[i]! * a + 255 * (1 - a);
            const g = data[i + 1]! * a + 255 * (1 - a);
            const b = data[i + 2]! * a + 255 * (1 - a);
            sum += relLuminance(r, g, b);
            alphaSum += a;
            // the hue histogram, a FREE rider in the SAME loop
            // (no second getImageData, no second canvas, no second pass).
            accumulateHuePixel(hist, r, g, b, a);
            n++;
        }
        // An all-transparent readback carries no painted field content and is not a
        // valid sample. Returning null makes the live caller write `unavailable` (never
        // the static stack-walk — forbidden by P016) rather than a degenerate luma ≈ 1.0
        // with a transparent hue.
        if (n === 0 || alphaSum / n < FIELD_ALPHA_FLOOR) return null;
        return { luma: sum / n, ambientHue: resolveAmbientHue(hist) };
    } catch {
        // fail-loud: a tainted/cross-origin canvas throws on getImageData; the null
        // return SURFACES the miss to the caller, which writes `unavailable` (never the
        // static stack-walk — forbidden by P016; never a silent wrong answer).
        return null;
    }
}

/**
 * Sample the STATIC backdrop: stack-walk `elementsFromPoint` at the surface centre,
 * read the first element under it with a resolved non-transparent background, un-wrap
 * the `var(--token)` through the resolveTokenColor leaf → relative luminance + the
 * ambient hue (the single resolved background color binned the SAME way). The reusable
 * 2D context (for the modern-color normalization paint-read) is passed in.
 */
export function sampleStatic(
    el: HTMLElement,
    ctx: CanvasRenderingContext2D | null,
): SampleResult | null {
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const stack = document.elementsFromPoint(cx, cy);
    // Skip the surface itself + its glass descendants; find the first BACKGROUND layer
    // below it with an opaque-enough painted background.
    for (const node of stack) {
        if (!(node instanceof HTMLElement)) continue;
        if (node === el || el.contains(node)) continue;
        const bgRaw = getComputedStyle(node).backgroundColor;
        const concrete = resolveTokenColor(bgRaw, el);
        const rgba = normalizeToRgb(concrete, ctx);
        if (!rgba) continue;
        if (rgba[3] < 0.5) continue; // a near-transparent layer is not the backdrop
        return staticResult(rgba);
    }
    // Nothing opaque under it → the page paints through to the body/root; read that.
    const bodyBg = resolveTokenColor(
        getComputedStyle(document.body).backgroundColor,
        el,
    );
    const bodyRgba = normalizeToRgb(bodyBg, ctx);
    return bodyRgba ? staticResult(bodyRgba) : null;
}

/** A single resolved backdrop color → the luma + the ambient hue (binned alone). */
function staticResult(rgba: [number, number, number, number]): SampleResult {
    const hist = makeHueHistogram();
    accumulateHuePixel(hist, rgba[0], rgba[1], rgba[2], rgba[3]);
    return {
        luma: relLuminance(rgba[0], rgba[1], rgba[2]),
        ambientHue: resolveAmbientHue(hist),
    };
}
