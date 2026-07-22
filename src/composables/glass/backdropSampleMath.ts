// backdropSampleMath — the pure sRGB sampling primitives (the no-god-module colocation leaf: position-
// preserving, behaviour-identical). The WCAG relative-luminance linearization, the
// `rgb()/rgba()` string parse, and the HTMLCanvasElement type-guard are DOM-free
// (modulo the `instanceof` global) leaves the observer composes; lifting them keeps
// the observer module under the line bound while the math stays single-source.

/** sRGB channel [0..255] → linear-light (WCAG 2.1 linearization). */
function linearize(c: number): number {
    const x = c / 255;
    return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
}

/** WCAG relative luminance of an sRGB triple [0..255]. */
export function relLuminance(r: number, g: number, b: number): number {
    return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}

/**
 * Composite a straight-alpha sRGB pixel [r,g,b] at coverage `a` (0..1) OVER an
 * opaque sRGB `underlay` triple → the resolved opaque sRGB [r,g,b] (source-over).
 * The animated field is a TRANSLUCENT canvas; the perceived backdrop is the field
 * painted over the REAL opaque page beneath it, so the underlay MUST be the actual
 * page color — a dark page and a light page under the SAME translucent field yield
 * DISTINCT composited luma. A hardcoded white underlay collapses that distinction
 * (the born-RED). This is the luma→tint axis input, NOT a second opacity axis.
 */
export function compositeOver(
    r: number,
    g: number,
    b: number,
    a: number,
    underlay: readonly [number, number, number],
): [number, number, number] {
    return [
        r * a + underlay[0] * (1 - a),
        g * a + underlay[1] * (1 - a),
        b * a + underlay[2] * (1 - a),
    ];
}

/** Parse a `rgb()/rgba()` string → [r,g,b,a] (the un-wrapped concrete form). */
export function parseRgb(str: string): [number, number, number, number] | null {
    const m = str.match(
        /rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s/]+([\d.]+))?/i,
    );
    if (!m) return null;
    return [Number(m[1]), Number(m[2]), Number(m[3]), m[4] === undefined ? 1 : Number(m[4])];
}

export function isCanvas(v: unknown): v is HTMLCanvasElement {
    return (
        typeof HTMLCanvasElement !== "undefined" && v instanceof HTMLCanvasElement
    );
}
