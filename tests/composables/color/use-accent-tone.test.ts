// BC.W-ACCENT-TONE — the contrast-safe ink resolver π (the JS half of the tonal
// register). The ink is a pure tone→ink map: value.js `safeAccentColor` shifts the
// ink's OKLCh lightness AWAY from the resolved active-band fill until it clears the
// contrast target. This test proves the contrast-safe CONTRACT holds for N synthetic
// tones in BOTH modes — the load-bearing invariant fourier asked for.

import { describe, expect, it } from "vitest";
import { useAccentTone } from "@glass/composables/color";
import {
    parseCSSColor,
    colorUnit2,
    srgbToOKLab,
    rawOklchToOklab,
    oklabToRgb255,
} from "@mkbabb/value.js";

// ── the ONE color core (value.js — composed for the test's own contrast read) ──
function rgb255OfCss(css: string): [number, number, number] {
    const v = colorUnit2(parseCSSColor(css), "rgb").value;
    let r = Number(v.r), g = Number(v.g), b = Number(v.b);
    if (r <= 1.0001 && g <= 1.0001 && b <= 1.0001) { r *= 255; g *= 255; b *= 255; }
    return [r, g, b];
}
function labOfCss(css: string): [number, number, number] {
    const [r, g, b] = rgb255OfCss(css);
    return srgbToOKLab(r / 255, g / 255, b / 255) as [number, number, number];
}
/** The band fill = color-mix(in oklab, surface, tone 18%) → rgb255 (numeric mix). */
function bandRgb(surfaceCss: string, toneCss: string, p = 0.18): [number, number, number] {
    const [sL, sa, sb] = labOfCss(surfaceCss);
    const [tL, ta, tb] = labOfCss(toneCss);
    return oklabToRgb255(sL * (1 - p) + tL * p, sa * (1 - p) + ta * p, sb * (1 - p) + tb * p) as [
        number,
        number,
        number,
    ];
}
function srgbLin(c: number) {
    c /= 255;
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}
function relLum([r, g, b]: [number, number, number]) {
    return 0.2126 * srgbLin(r) + 0.7152 * srgbLin(g) + 0.0722 * srgbLin(b);
}
function wcag(a: [number, number, number], b: [number, number, number]) {
    const l1 = relLum(a), l2 = relLum(b), hi = Math.max(l1, l2), lo = Math.min(l1, l2);
    return (hi + 0.05) / (lo + 0.05);
}
function rgbOfInk(ink: string): [number, number, number] {
    const m = ink.match(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.eE+-]+)/);
    if (!m) throw new Error(`not an oklch ink: ${ink}`);
    const [l, a, b] = rawOklchToOklab(Number(m[1]), Number(m[2]), Number(m[3]));
    return oklabToRgb255(l, a, b) as [number, number, number];
}

const LIGHT_CARD = "hsl(36 48% 97%)";
const DARK_CARD = "hsl(24 8% 16%)";

// N synthetic tones spanning the wheel + the L axis (chromatic + near-ink).
const TONES = [
    "oklch(0.532 0.180 317.5)", // violet
    "oklch(0.542 0.089 222.8)", // teal
    "oklch(0.623 0.124 69.6)", // amber (light)
    "oklch(0.813 0.109 78.2)", // amber (dark arm)
    "oklch(0.35 0.15 264)", // deep blue
    "oklch(0.9 0.05 100)", // pale yellow
    "#1a1a2e", // near-black navy
    "#ffd166", // warm gold
    "oklch(0.55 0.2 30)", // orange-red
    "oklch(0.7 0.15 145)", // green
];

describe("useAccentTone — the contrast-safe ink contract", () => {
    it("a var(--…) tone passes through (no resolved override — the CSS fallback ink)", () => {
        const { ink, toneStyle } = useAccentTone(() => "var(--section-color-7)");
        expect(ink.value).toBe("");
        expect(toneStyle.value["--tone"]).toBe("var(--section-color-7)");
        // no resolved override is emitted — the CSS `var(--accent-ink-resolved, …)`
        // fallback carries the ink for the pure-cascade path.
        expect(toneStyle.value["--accent-ink-resolved"]).toBeUndefined();
    });

    it("a concrete tone resolves an oklch() ink + emits the override", () => {
        const { ink, toneStyle } = useAccentTone(() => "oklch(0.532 0.180 317.5)");
        expect(ink.value).toMatch(/^oklch\(/);
        expect(toneStyle.value["--accent-ink-resolved"]).toBe(ink.value);
    });

    it("over the LIGHT card: the band is light, so the ink resolves DARK", () => {
        const { ink } = useAccentTone(() => "oklch(0.35 0.15 264)", { surface: LIGHT_CARD });
        const inkLab = labOfCss(`oklch(${ink.value.match(/oklch\(([\d.]+)/)![1]} 0 0)`);
        // dark ink over the light band — ink L well below the band L.
        expect(inkLab[0]).toBeLessThan(0.6);
    });

    it("over the DARK card: the band is dark, so the ink resolves LIGHT", () => {
        const { ink } = useAccentTone(() => "oklch(0.739 0.134 318.1)", { surface: DARK_CARD });
        const inkL = Number(ink.value.match(/oklch\(([\d.]+)/)![1]);
        expect(inkL).toBeGreaterThan(0.6);
    });

    it("the resolved ink ALWAYS clears 4.5:1 over the band — every tone, both modes", () => {
        for (const surface of [LIGHT_CARD, DARK_CARD]) {
            for (const tone of TONES) {
                const { ink } = useAccentTone(() => tone, { surface });
                const ratio = wcag(rgbOfInk(ink.value), bandRgb(surface, tone));
                expect(
                    ratio,
                    `ink-over-band for tone=${tone} on ${surface} was ${ratio.toFixed(2)}:1`,
                ).toBeGreaterThanOrEqual(4.5);
            }
        }
    });

    it("a tighter inkContrast target is honored (the ink lifts further)", () => {
        const tone = "oklch(0.55 0.2 30)";
        const loose = useAccentTone(() => tone, { surface: LIGHT_CARD, inkContrast: 4.5 });
        const tight = useAccentTone(() => tone, { surface: LIGHT_CARD, inkContrast: 7 });
        const looseRatio = wcag(rgbOfInk(loose.ink.value), bandRgb(LIGHT_CARD, tone));
        const tightRatio = wcag(rgbOfInk(tight.ink.value), bandRgb(LIGHT_CARD, tone));
        expect(tightRatio).toBeGreaterThan(looseRatio);
    });

    it("an unparseable tone falls back (no throw, empty resolved ink)", () => {
        const { ink } = useAccentTone(() => "not-a-color");
        expect(ink.value).toBe("");
    });
});
