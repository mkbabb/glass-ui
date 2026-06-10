// AY.W-FF2 — the FourierField mount-smoke + the `/fourier-math` consumer-#1.
//
// Two jobs in one spec:
//   1. MOUNT-SMOKE — the component mounts with the required resolver seam,
//      accepts the new `intensity` prop, and does not throw. The COMPONENT is
//      imported RELATIVE (../…/src) per the mirrored-test-tree rule (AV.W14).
//   2. THE `/fourier-math` CONSUMER-#1 — the pure math leaf is imported via the
//      PUBLISHED subpath `@mkbabb/glass-ui/fourier-math` (NOT the relative
//      `./math`), so this spec doubles as the glass-ui-side importer that clears
//      the new subpath's overfitting bar AT MINT TIME (§2.9). It exercises the
//      real publish surface: `positionsAt` + `makeEllipticSpectrum` resolve, the
//      epicycle chain reconstructs, and the DELETED `evalFourier` is ABSENT from
//      the leaf (the clean-break proof on the shipped surface).

import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
// (2) the SHIPPED math leaf — imported via the published /fourier-math subpath
// (the consumer-#1 that clears the subpath's overfitting bar at mint time).
import * as fourierMath from "@mkbabb/glass-ui/fourier-math";
import {
    dftFromPoints,
    makeEllipticSpectrum,
    positionsAt,
} from "@mkbabb/glass-ui/fourier-math";
// (1) the COMPONENT — relative import (the mirrored-test-tree rule).
import { FourierField } from "../../../../src/components/custom/fourier-field";
import { defaultBlobColorResolver } from "../../../../src/composables/color";

describe("FourierField mount-smoke", () => {
    it("mounts with the required resolver seam and does not throw", () => {
        const wrapper = mount(FourierField, {
            props: {
                color: "oklch(0.6 0.18 25)",
                colorResolver: defaultBlobColorResolver,
                seed: "smoke",
            },
        });
        expect(wrapper.find("canvas.fourier-field-canvas").exists()).toBe(true);
        wrapper.unmount();
    });

    it("accepts the intensity prop (the loudness envelope) across the clamp range", () => {
        // The intensity-recession truth is load-bearing in the paint math:
        // `peak = peakAlpha * intensityClamped`, `intensityClamped = max(0,
        // min(2, intensity))`. happy-dom has no Canvas2D, so the PIXEL recession
        // is the device gate's binding (tests-visual/fourier-field-visibility);
        // the unit assert here is that every clamp-range value mounts without
        // throwing (the prop is wired, not a no-op decl). intensity=0 is the
        // floor (no paint), 2 the ceiling, 5 clamps to 2.
        for (const intensity of [0, 0.4, 1, 2, 5]) {
            const wrapper = mount(FourierField, {
                props: {
                    variant: "final",
                    color: "oklch(0.6 0.18 25)",
                    colorResolver: defaultBlobColorResolver,
                    seed: "smoke-intensity",
                    intensity,
                    freeze: true,
                },
            });
            expect(wrapper.find("canvas.fourier-field-canvas").exists()).toBe(true);
            wrapper.unmount();
        }
    });
});

describe("/fourier-math leaf (the published subpath consumer-#1)", () => {
    it("builds a spectrum and reconstructs the epicycle chain via the published subpath", () => {
        // a deterministic PRNG so the spectrum is reproducible.
        let s = 0x9e3779b9;
        const rng = () => {
            s = (s + 0x6d2b79f5) | 0;
            let t = Math.imul(s ^ (s >>> 15), 1 | s);
            t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };
        const spectrum = makeEllipticSpectrum(rng, { harmonics: 4 });
        expect(spectrum.length).toBeGreaterThanOrEqual(2);
        // the dominant counter-rotating pair (index +1 and -1) is always present.
        expect(spectrum.some((c) => c.index === 1)).toBe(true);
        expect(spectrum.some((c) => c.index === -1)).toBe(true);

        const chain = positionsAt(spectrum, 0.25);
        // positions[0] is the origin; the chain has one tip per phasor + origin.
        expect(chain[0]).toEqual([0, 0]);
        expect(chain.length).toBe(spectrum.length + 1);
        // the curve point (the last tip) is finite.
        const [x, y] = chain[chain.length - 1]!;
        expect(Number.isFinite(x) && Number.isFinite(y)).toBe(true);
    });

    it("does NOT ship the deleted evalFourier export (the clean-break proof)", () => {
        expect("evalFourier" in fourierMath).toBe(false);
        // the leaf carries the promoted shape (the W-FF1 §4.3 PROMOTE set).
        expect(typeof fourierMath.positionsAt).toBe("function");
        expect(typeof fourierMath.makeEllipticSpectrum).toBe("function");
        expect(typeof fourierMath.comp).toBe("function");
    });

    it("dftFromPoints is the inverse of positionsAt — a round-trip reconstructs the sampled curve (the ℱ-redraw egg's math)", () => {
        // Sample a known closed curve (a tilted ellipse): x = 2cos, y = 0.7sin
        // + a small second-harmonic crinkle. dftFromPoints recovers its spectrum;
        // positionsAt at the SAME t must land back on the sample.
        const N = 64;
        const pts: [number, number][] = [];
        for (let n = 0; n < N; n++) {
            const t = (2 * Math.PI * n) / N;
            pts.push([
                2 * Math.cos(t) + 0.3 * Math.cos(2 * t),
                0.7 * Math.sin(t) + 0.2 * Math.sin(2 * t),
            ]);
        }
        const spectrum = dftFromPoints(pts);
        // The DC term (index 0) + the signed-frequency pairs are present.
        expect(spectrum.some((c) => c.index === 0)).toBe(true);
        expect(spectrum.some((c) => c.index === 1)).toBe(true);
        expect(spectrum.some((c) => c.index === -1)).toBe(true);

        // Round-trip: the full epicycle sum (all phasors, no truncation) at
        // t = n/N reconstructs sample n to floating-point tolerance.
        for (const n of [0, 7, 16, 31, 48]) {
            const chain = positionsAt(spectrum, n / N);
            const [rx, ry] = chain[chain.length - 1]!;
            expect(rx).toBeCloseTo(pts[n][0], 6);
            expect(ry).toBeCloseTo(pts[n][1], 6);
        }
    });
});
