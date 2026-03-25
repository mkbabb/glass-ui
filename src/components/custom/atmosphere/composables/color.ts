/**
 * Self-contained OKLCH color math for the atmosphere canvas.
 *
 * Pipeline: sRGB [0–255] → linear sRGB → OKLab → OKLCh (polar) → back to sRGB.
 * OKLCH is used for perceptually uniform lightness/hue manipulation when
 * generating blob colors from a base input color.
 *
 * References:
 *   Björn Ottosson, "A perceptual color space for image processing"
 *   https://bottosson.github.io/posts/oklab/
 */

export function clamp(v: number, min: number, max: number): number {
    return v < min ? min : v > max ? max : v;
}

// ── sRGB ↔ linear ──────────────────────────────────────────────

function linearize(c: number): number {
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function delinearize(c: number): number {
    return c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
}

// ── sRGB → OKLab (Ottosson's M1 and M2 matrices, row-major) ──

export function srgbToOKLab(
    r: number,
    g: number,
    b: number,
): [number, number, number] {
    const lr = linearize(r);
    const lg = linearize(g);
    const lb = linearize(b);

    const l_ = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
    const m_ = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
    const s_ = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);

    return [
        0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_,
        1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_,
        0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_,
    ];
}

// ── OKLab ↔ OKLCh (polar form) ────────────────────────────────

export function oklabToOklch(
    L: number,
    a: number,
    b: number,
): [number, number, number] {
    const C = Math.sqrt(a * a + b * b);
    const H = ((Math.atan2(b, a) * 180) / Math.PI + 360) % 360;
    return [L, C, H];
}

export function oklchToOklab(
    L: number,
    C: number,
    H: number,
): [number, number, number] {
    const rad = (H * Math.PI) / 180;
    return [L, C * Math.cos(rad), C * Math.sin(rad)];
}

// ── OKLab → sRGB [0–255] ──────────────────────────────────────

export function oklabToRgb255(
    L: number,
    a: number,
    b: number,
): [number, number, number] {
    const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
    const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
    const s_ = L - 0.0894841775 * a - 1.291485548 * b;

    const l = l_ * l_ * l_;
    const m = m_ * m_ * m_;
    const s = s_ * s_ * s_;

    const rLin = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
    const gLin = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
    const bLin = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;

    return [
        Math.round(clamp(delinearize(rLin), 0, 1) * 255),
        Math.round(clamp(delinearize(gLin), 0, 1) * 255),
        Math.round(clamp(delinearize(bLin), 0, 1) * 255),
    ];
}

// ── Canvas-safe color formatting ──────────────────────────────

/**
 * Format an RGB tuple as a hex string (#RRGGBB).
 * Canvas 2D API only accepts named colors, hex, rgb(), rgba(), hsl(), hsla().
 * It does NOT accept oklch(), oklab(), lab(), lch(), or color-mix().
 */
export function rgb255ToHex(r: number, g: number, b: number): string {
    const toHex = (n: number) => clamp(Math.round(n), 0, 255).toString(16).padStart(2, "0");
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// ── Convenience composites ─────────────────────────────────────

/** sRGB [0–255] → OKLCh [L:0–1, C:0–0.4, H:0–360] */
export function rgbToOklch(
    r: number,
    g: number,
    b: number,
): [number, number, number] {
    const [L, a, b_] = srgbToOKLab(r / 255, g / 255, b / 255);
    return oklabToOklch(L, a, b_);
}

/** OKLCh → sRGB [0–255] (clamped, rounded) */
export function oklchToRgb(
    L: number,
    C: number,
    H: number,
): [number, number, number] {
    const [la, a, b] = oklchToOklab(L, C, H);
    return oklabToRgb255(la, a, b);
}
