import { describe, expect, it } from "vitest";

import { detectXrProducerRepairs } from "../../scripts/proof-xr-producer-repairs.mjs";

/**
 * BI.W-XR-PRODUCER-REPAIRS — the pure-detector units for proof:xr-producer-repairs.
 *
 * Lock the device-free clause detectors (X1 PKT-1 · X3 P1-R3 · X4 A6+L16 · X6 P5 ·
 * X7 P10) so they cannot regress to false-GREEN. A GREEN fixture set passes clean;
 * a per-clause RED fixture flips exactly its clause (the born-RED shapes the wave's
 * work cured / the guards it locks).
 */

const GREEN = {
    distComponents:
        ":root{--spacing:.25rem;--default-transition-duration: var(--duration-fast, 150ms);}",
    sliderVue: `
        .glass-slider[data-variant="spectrum"] .slider-thumb:focus-visible {
            outline: none;
            box-shadow: var(--focus-ring-shadow), var(--shadow-sm);
        }`,
    distSurfaceAxis: ".veil{-webkit-backdrop-filter: none; backdrop-filter: none;}",
    distSfc: "",
    watercolorVue: `
        .watercolor-swatch[data-variant="ghost"] { container-type: inline-size; }
        @container (max-width: 48px) {
            .watercolor-ghost-stroke { border-style: solid; }
        }`,
    scaleCss:
        ":root{--type-weight-display: 600;--type-weight-heading: 700;--type-weight-title: 700;}",
    semanticCss:
        "@utility text-title { font-size: var(--type-title); font-weight: var(--type-weight-title); }",
};

describe("detectXrProducerRepairs()", () => {
    it("is GREEN on the cured fixture set (no violations)", () => {
        const { violations } = detectXrProducerRepairs(GREEN);
        expect(violations).toEqual([]);
    });

    it("X1 REDs on a bare 150ms :root re-declare (the PKT-1 clobber)", () => {
        const { violations } = detectXrProducerRepairs({
            ...GREEN,
            distComponents: ":root{--default-transition-duration: 150ms;}",
        });
        expect(violations.some((v) => v.startsWith("X1"))).toBe(true);
    });

    it("X3 REDs when the spectrum focus ring has no UA-outline suppression", () => {
        const { violations } = detectXrProducerRepairs({
            ...GREEN,
            sliderVue: `
                .glass-slider[data-variant="spectrum"] .slider-thumb:focus-visible {
                    box-shadow: var(--focus-ring-shadow), var(--shadow-sm);
                }`,
        });
        expect(violations.some((v) => v.startsWith("X3"))).toBe(true);
    });

    it("X4 REDs when the unprefixed backdrop-filter:none is collapsed away", () => {
        const { violations } = detectXrProducerRepairs({
            ...GREEN,
            distSurfaceAxis: ".veil{-webkit-backdrop-filter: none;}",
            distSfc: "",
        });
        expect(violations.some((v) => v.startsWith("X4"))).toBe(true);
    });

    it("X6 REDs when the ghost ring reverts to dashed in the 48px query", () => {
        const { violations } = detectXrProducerRepairs({
            ...GREEN,
            watercolorVue: `
                .watercolor-swatch[data-variant="ghost"] { container-type: inline-size; }
                @container (max-width: 48px) {
                    .watercolor-ghost-stroke { border-style: dashed; }
                }`,
        });
        expect(violations.some((v) => v.startsWith("X6"))).toBe(true);
    });

    it("X7 REDs when text-title hardcodes 700 instead of the token", () => {
        const { violations } = detectXrProducerRepairs({
            ...GREEN,
            semanticCss:
                "@utility text-title { font-size: var(--type-title); font-weight: 700; }",
        });
        expect(violations.some((v) => v.startsWith("X7"))).toBe(true);
    });

    it("X7 REDs when a weight token is missing", () => {
        const { violations } = detectXrProducerRepairs({
            ...GREEN,
            scaleCss: ":root{--type-weight-display: 600;--type-weight-heading: 700;}",
        });
        expect(violations.some((v) => v.startsWith("X7"))).toBe(true);
    });
});
