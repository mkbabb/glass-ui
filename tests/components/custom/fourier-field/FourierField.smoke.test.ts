// The FourierField mount-smoke + the `/fourier-math` consumer-#1.
//
// Two jobs in one spec:
//   1. MOUNT-SMOKE — the GPU-substrate component mounts across its three registers
//      (bare warm-identity default, the studio config/getPalette surface, AND the
//      ambient `color`/`colorResolver`/`seed`/`freeze` seam) and does not throw (the
//      substrate picker degrades gracefully under happy-dom's no-WebGPU/WebGL env). The
//      ambient knobs are LIVE (slides Slide01/Slide05 set them — rule (c) KEEP); only
//      the `intensity` loudness override is retired (0-setter, REDUCTION W1). The
//      COMPONENT is imported RELATIVE (../…/src) per the mirrored-test-tree rule.
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
import { DEFAULT_FOURIER_CONFIG, FourierField } from "@glass/components/fourier-field";
import { defaultBlobColorResolver } from "@glass/composables/color";

describe("FourierField mount-smoke", () => {
    it("mounts bare (the warm-identity default) and does not throw", () => {
        // No props → the warm-identity default config + palette. happy-dom has no
        // WebGPU/WebGL, so the substrate picker degrades gracefully; the assert is
        // that the canvas mounts without throwing.
        const wrapper = mount(FourierField);
        expect(wrapper.find("canvas.fourier-field-canvas").exists()).toBe(true);
        wrapper.unmount();
    });

    it("mounts the studio surface (config + getPalette) and does not throw", () => {
        // The surviving public surface after REDUCTION W1: the studio drives the
        // full config model + themes the curve via getPalette. happy-dom degrades the
        // GPU substrate; the assert is a clean mount.
        const wrapper = mount(FourierField, {
            props: {
                config: DEFAULT_FOURIER_CONFIG,
                getPalette: () => [...DEFAULT_FOURIER_CONFIG.palette],
            },
        });
        expect(wrapper.find("canvas.fourier-field-canvas").exists()).toBe(true);
        wrapper.unmount();
    });

    it("mounts the ambient color seam (color/colorResolver/seed/freeze) and does not throw", () => {
        // The LIVE ambient register — slides' feedback-coder bookends set
        // color="var(--viz-…)" + :color-resolver + seed + :freeze="capture" (rule (c)
        // KEEP). happy-dom degrades the GPU substrate; the assert is a clean mount with
        // the ambient props wired (not stale no-op declarations).
        const wrapper = mount(FourierField, {
            props: {
                color: "oklch(0.6 0.18 25)",
                colorResolver: defaultBlobColorResolver,
                seed: "smoke",
                freeze: true,
            },
        });
        expect(wrapper.find("canvas.fourier-field-canvas").exists()).toBe(true);
        wrapper.unmount();
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
        // the leaf carries the promoted shape (the PROMOTE set).
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
