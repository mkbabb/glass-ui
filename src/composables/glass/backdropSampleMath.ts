// backdropSampleMath — the pure sRGB sampling primitives, carved from
// useGlassBackdropLuminance.ts (the no-god-module colocation carve: position-
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
