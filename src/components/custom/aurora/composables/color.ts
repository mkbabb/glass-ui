/**
 * OKLCH color math for derived palette generation.
 *
 * Pipeline: sRGB [0–255] → linear sRGB → OKLab → OKLCh (polar)
 * Manipulate L (lightness) and H (hue) in perceptually uniform space,
 * then convert back: OKLCh → OKLab → linear sRGB → sRGB [0–255].
 */

export function clamp(v: number, min: number, max: number): number {
    return v < min ? min : v > max ? max : v;
}

function linearize(c: number): number {
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function delinearize(c: number): number {
    return c <= 0.0031308
        ? 12.92 * c
        : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
}

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

    const r = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
    const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
    const bv = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;

    return [
        clamp(Math.round(delinearize(r) * 255), 0, 255),
        clamp(Math.round(delinearize(g) * 255), 0, 255),
        clamp(Math.round(delinearize(bv) * 255), 0, 255),
    ];
}

/** sRGB [0–255] → OKLCh [L:0–1, C:0–~0.4, H:0–360°]. */
export function rgbToOklch(
    r: number,
    g: number,
    b: number,
): [number, number, number] {
    const [L, a, b_] = srgbToOKLab(r / 255, g / 255, b / 255);
    return oklabToOklch(L, a, b_);
}

/** OKLCh → sRGB [0–255] (clamped & rounded). */
export function oklchToRgb(
    L: number,
    C: number,
    H: number,
): [number, number, number] {
    const [la, a, b] = oklchToOklab(L, C, H);
    return oklabToRgb255(la, a, b);
}

/**
 * Parse a CSS color string to [r, g, b] (0-255) using browser's canvas parser.
 */
let _parseCtx: CanvasRenderingContext2D | null = null;
export function cssToRgb(css: string): [number, number, number] {
    if (!_parseCtx) {
        const c = document.createElement("canvas");
        c.width = c.height = 1;
        _parseCtx = c.getContext("2d", { willReadFrequently: true })!;
    }
    _parseCtx.clearRect(0, 0, 1, 1);
    _parseCtx.fillStyle = "#808080";
    _parseCtx.fillStyle = css;
    _parseCtx.fillRect(0, 0, 1, 1);
    const d = _parseCtx.getImageData(0, 0, 1, 1).data;
    return [d[0]!, d[1]!, d[2]!];
}
