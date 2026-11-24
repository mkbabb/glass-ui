// Stateless backdrop sampling and OKLab reduction.
//
// The observer HOST keeps only the reactive wiring (the useRAFLoop/useIntersectionPause/
// useResizeObserver composition, the reusable downsample-canvas lifecycle, and the
// `--glass-backdrop-*` writes on the target). The two SAMPLERS
// live HERE as pure functions the observer COMPOSES:
//   - `sampleStatic`   — the `elementsFromPoint` stack-walk of the painted background
//                        LAYER (the static page case), un-wrapping `var(--token)`
//                        backgrounds through the resolveTokenColor leaf.
//   - `sampleAnimated` — the downsampled `drawImage + getImageData` read of a known
//                        background `<canvas>` under the surface's bounding box (the
//                        aurora/blob live-field case).
// Both reduce their pixels to a WCAG relative luminance. The reusable 2D context is passed
// IN by the observer — the leaf owns NO canvas lifecycle, NO closure state, NO rAF, NO
// reactivity: a pure sampling family (the single-home of the sampling/OKLab math).

import { resolveTokenColor } from "ext-token";
import { isCanvas, relLuminance, parseRgb, compositeOver } from "ext-math";

/** The per-sample result — the luminance, the one signal the cascade reads. */
export interface SampleResult {
    /** WCAG relative luminance of the sampled backdrop (0..1). */
    luma: number;
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

/**
 * Resolve the opaque backdrop beneath the surface as concrete sRGB `[r,g,b,a]`:
 * stack-walk `elementsFromPoint` at the surface centre, take the first element under it
 * with a resolved opaque-enough background (un-wrapping `var(--token)` through the
 * resolveTokenColor leaf); nothing opaque under it → the page paints through to the
 * body/root, so read that. Null only when even the body background is unresolvable.
 * The reusable 2D context (for the modern-color normalization paint-read) is passed in.
 *
 * The SINGLE stack-walk of record — the static sampler reduces it to a luma+hue, the
 * animated sampler reads it as the compositing underlay (`resolveUnderlayRgb`).
 */
function resolveBackdropRgba(
    el: HTMLElement,
    ctx: CanvasRenderingContext2D | null,
): [number, number, number, number] | null {
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
        return rgba;
    }
    // Nothing opaque under it → the page paints through to the body/root; read that.
    const bodyBg = resolveTokenColor(
        getComputedStyle(document.body).backgroundColor,
        el,
    );
    return normalizeToRgb(bodyBg, ctx);
}

/** The CSS-initial page canvas is white — when NO opaque page background resolves
 *  (SSR/no-paint), that white viewport IS the formula-correct underlay. This lives at
 *  the named resolver, never hardcoded inside the compositing loop. */
const CSS_INITIAL_UNDERLAY: readonly [number, number, number] = [255, 255, 255];

/**
 * The REAL opaque page underlay beneath the surface — the color the TRANSLUCENT
 * animated field composites OVER. Reuses `resolveBackdropRgba` (the same stack the
 * static sampler reads), dropping alpha to an opaque triple; falls back to the
 * CSS-initial white viewport when nothing opaque paints under the surface. This is the
 * luma→tint axis input for `sampleAnimated`, NOT a second opacity/attenuation axis.
 */
export function resolveUnderlayRgb(
    el: HTMLElement,
    ctx: CanvasRenderingContext2D | null,
): [number, number, number] {
    const rgba = resolveBackdropRgba(el, ctx);
    if (rgba && rgba[3] >= 0.5) return [rgba[0], rgba[1], rgba[2]];
    return [...CSS_INITIAL_UNDERLAY];
}

/**
 * Sample the STATIC backdrop: reduce the resolved backdrop (`resolveBackdropRgba`) to
 * relative luminance. The reusable 2D context is passed in.
 */
export function sampleStatic(
    el: HTMLElement,
    ctx: CanvasRenderingContext2D | null,
): SampleResult | null {
    const rgba = resolveBackdropRgba(el, ctx);
    return rgba ? staticResult(rgba) : null;
}

/** A single resolved backdrop color → its relative luminance. */
function staticResult(rgba: [number, number, number, number]): SampleResult {
    return { luma: relLuminance(rgba[0], rgba[1], rgba[2]) };
}
