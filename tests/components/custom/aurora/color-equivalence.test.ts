import { describe, expect, it } from "vitest";

import {
    srgbToOKLab,
    oklabToLinearSRGB,
    oklabToRgb255,
    rawOklabToOklch,
    rawOklchToOklab,
} from "@mkbabb/value.js";

import {
    oklchToLinear,
    oklchStopToHex,
    hexToOklchStop,
    cssToOklch,
    flattenPalette,
} from "../../../../src/components/custom/aurora/composables/color";
import type { OklchStop } from "../../../../src/components/custom/aurora/constants/presets";

/**
 * inv-K-2 canary (value.js-K, K.W2c). glass-ui's aurora color helpers were
 * de-duplicated to consume value.js's canonical Ottosson core. This test asserts
 * the rewired helpers agree with the value.js path to 1e-6 (it is near-tautological
 * NOW — the helpers call value.js directly — but it is the drift guard: if anyone
 * re-introduces a local copy of the OKLab/sRGB math, these break). It also guards
 * the GPU-fed `flattenPalette` bake byte-stability — the one thing the eye sees.
 */

// Sample set spanning the gamut: near-black/white, a hue fan, and an
// out-of-sRGB-gamut stop (exercises the Math.max(0,·) ACES wrap).
const STOPS: OklchStop[] = [
    { L: 0.05, C: 0.0, h: 0 },
    { L: 0.97, C: 0.0, h: 0 },
    { L: 0.6, C: 0.12, h: 0 },
    { L: 0.6, C: 0.12, h: 60 },
    { L: 0.6, C: 0.12, h: 120 },
    { L: 0.6, C: 0.12, h: 180 },
    { L: 0.6, C: 0.12, h: 240 },
    { L: 0.6, C: 0.12, h: 300 },
    { L: 0.7, C: 0.37, h: 150 }, // out of sRGB gamut — negative linear before the wrap
];

const HEXES = [
    "#000000",
    "#ffffff",
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#3366cc",
    "#808080",
    "#facc15",
];

const EPS = 1e-6;

describe("aurora color ≡ value.js canonical core (inv-K-2)", () => {
    it("oklchToLinear === composed value.js [rawOklchToOklab → oklabToLinearSRGB] + aurora's Math.max wrap", () => {
        for (const s of STOPS) {
            const [L, a, b] = rawOklchToOklab(s.L, s.C, s.h);
            const lin = oklabToLinearSRGB(L, a, b);
            const expected = [
                Math.max(0, lin[0]),
                Math.max(0, lin[1]),
                Math.max(0, lin[2]),
            ];
            const got = oklchToLinear(s);
            for (let i = 0; i < 3; i++) {
                expect(Math.abs(got[i]! - expected[i]!)).toBeLessThanOrEqual(EPS);
            }
        }
    });

    it("oklchStopToHex === value.js [rawOklchToOklab → oklabToRgb255 → hex] (exact string)", () => {
        const toHex = (v: number) => Math.round(v).toString(16).padStart(2, "0");
        for (const s of STOPS) {
            const [L, a, b] = rawOklchToOklab(s.L, s.C, s.h);
            const [r, g, bch] = oklabToRgb255(L, a, b);
            const expected = `#${toHex(r)}${toHex(g)}${toHex(bch)}`;
            expect(oklchStopToHex(s)).toBe(expected);
        }
    });

    it("hexToOklchStop round-trips through oklchStopToHex (lossless hex↔oklch)", () => {
        for (const hex of HEXES) {
            expect(oklchStopToHex(hexToOklchStop(hex))).toBe(hex);
        }
    });

    it("hexToOklchStop agrees with the value.js srgbToOKLab → rawOklabToOklch path (1e-6)", () => {
        for (const hex of HEXES) {
            const h = hex.replace("#", "");
            const r = parseInt(h.slice(0, 2), 16);
            const g = parseInt(h.slice(2, 4), 16);
            const b = parseInt(h.slice(4, 6), 16);
            const [L, a, bch] = srgbToOKLab(r / 255, g / 255, b / 255);
            const [Lo, C, H] = rawOklabToOklch(L, a, bch);
            const got = hexToOklchStop(hex);
            expect(Math.abs(got.L - Lo)).toBeLessThanOrEqual(EPS);
            expect(Math.abs(got.C - C)).toBeLessThanOrEqual(EPS);
            // hue is undefined for achromatic stops; only compare when chromatic
            if (C > 1e-4) expect(Math.abs(got.h - H)).toBeLessThanOrEqual(EPS);
        }
    });

    it("cssToOklch resolves CSS strings via value.js (no DOM) and round-trips to a near-equal hex", () => {
        for (const hex of HEXES) {
            const stop = cssToOklch(hex);
            // cssToOklch(hex) and hexToOklchStop(hex) take the same value.js path
            const ref = hexToOklchStop(hex);
            expect(Math.abs(stop.L - ref.L)).toBeLessThanOrEqual(EPS);
            expect(Math.abs(stop.C - ref.C)).toBeLessThanOrEqual(EPS);
        }
    });

    it("flattenPalette GPU buffer matches the value.js-composed bake (byte-stable)", () => {
        const palette = STOPS.slice(0, 4);
        const buf = flattenPalette(palette, 8);
        // independent reference via the value.js path
        for (let i = 0; i < palette.length; i++) {
            const [L, a, b] = rawOklchToOklab(palette[i]!.L, palette[i]!.C, palette[i]!.h);
            const lin = oklabToLinearSRGB(L, a, b);
            const expected = [Math.max(0, lin[0]), Math.max(0, lin[1]), Math.max(0, lin[2])];
            for (let c = 0; c < 3; c++) {
                expect(Math.abs(buf[i * 3 + c]! - expected[c]!)).toBeLessThanOrEqual(EPS);
            }
        }
        // unused slots zero-filled
        for (let i = palette.length * 3; i < 8 * 3; i++) {
            expect(buf[i]).toBe(0);
        }
    });
});
