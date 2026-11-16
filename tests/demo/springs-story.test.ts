import { describe, expect, it } from "vitest";
import { SPRING_PRESETS } from "@glass/composables/motion";

import { buildCurve, curvePath, curvePresets } from "../../demo/stories/motion/springs/curve";

describe("Springs page curve", () => {
    it("offers every shared spring character, then the easing tokens", () => {
        const presets = curvePresets();
        const springs = presets.filter((p) => p.config.kind === "spring");
        expect(springs.map((p) => p.key)).toEqual(SPRING_PRESETS.map((r) => r.name));
        for (const p of springs) {
            const row = SPRING_PRESETS.find((r) => r.name === p.key)!;
            expect(p.config.response).toBe(row.response);
            expect(p.config.damping).toBe(row.dampingFraction);
        }
        expect(presets.filter((p) => p.config.kind === "ease").map((p) => p.key)).toEqual([
            "ease-standard",
            "ease-out",
            "ease-in",
            "ease-out-expo",
        ]);
    });

    it("starts at 0 and ends at 1 for every preset, with a positive play length", () => {
        for (const p of curvePresets()) {
            const c = buildCurve(p.config);
            expect(c.fn(0)).toBeCloseTo(0, 6);
            expect(c.fn(1)).toBeCloseTo(1, 2);
            expect(c.ms).toBeGreaterThan(0);
            expect(c.peak).toBeGreaterThanOrEqual(1);
        }
    });

    it("overshoots only when the spring is under-damped", () => {
        const base = curvePresets()[0]!.config;
        expect(buildCurve({ ...base, kind: "spring", damping: 0.4 }).peak).toBeGreaterThan(1.1);
        expect(buildCurve({ ...base, kind: "spring", damping: 1 }).peak).toBeLessThan(1.001);
    });

    it("solves a CSS cubic-bezier by its x", () => {
        const base = curvePresets()[0]!.config;
        const linear = buildCurve({ ...base, kind: "ease", x1: 0.25, y1: 0.25, x2: 0.75, y2: 0.75 });
        expect(linear.fn(0.3)).toBeCloseTo(0.3, 4);
        const outExpo = buildCurve({ ...base, kind: "ease", x1: 0.16, y1: 1, x2: 0.3, y2: 1 });
        expect(outExpo.fn(0.5)).toBeGreaterThan(0.9);
    });

    it("draws the curve from the bottom-left corner to the top-right", () => {
        const d = curvePath((t) => t, 4);
        expect(d.startsWith("M0.0000 1.0000")).toBe(true);
        expect(d.endsWith("L1.0000 0.0000")).toBe(true);
    });
});
