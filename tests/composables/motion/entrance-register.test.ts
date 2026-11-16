import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import {
    cascadeStaggerMs,
    STAGGER_DEFAULT_MS,
    VIZ_ENTRANCE,
} from "@glass/composables/motion/reveal/entranceRegister";
import { springSettleDurationSeconds } from "@glass/composables/motion/spring/springProjection";
import { springPreset } from "@glass/composables/motion/spring/springPresets";

const css = readFileSync(
    resolve(__dirname, "../../../src/styles/glass/viz-enter.css"),
    "utf8",
);

describe("the data-viz entrance register", () => {
    it("names a row of SPRING_PRESETS for every entrance, and the CSS twin rides it", () => {
        expect(VIZ_ENTRANCE).toEqual({ mark: "present", bar: "panel", ripple: "bloom" });
        for (const [kind, row] of Object.entries(VIZ_ENTRANCE)) {
            const rule = css.slice(css.lastIndexOf(`.viz-${kind} {`));
            expect(rule.slice(0, rule.indexOf("}"))).toContain(`var(--spring-${row})`);
            expect(rule.slice(0, rule.indexOf("}"))).toContain(`var(--spring-${row}-duration)`);
        }
    });

    it("lets a clipped entrance go when it lands: the bar and the ripple fill backwards only", () => {
        for (const kind of ["bar", "ripple"]) {
            const rule = css.slice(css.lastIndexOf(`.viz-${kind} {`));
            expect(rule.slice(0, rule.indexOf("}"))).toMatch(/animation:[^;]*\sbackwards;/);
        }
    });

    it("spaces a cascade at the canonical stagger, capped inside one panel duration", () => {
        const panelMs = springSettleDurationSeconds(springPreset("panel")) * 1000;
        expect(cascadeStaggerMs(1)).toBe(STAGGER_DEFAULT_MS);
        expect(cascadeStaggerMs(3)).toBe(STAGGER_DEFAULT_MS);
        for (const n of [6, 12, 40]) {
            expect(cascadeStaggerMs(n) * n).toBeLessThanOrEqual(panelMs + 1e-9);
        }
        // The engine-free solve agrees with the engine's settle for the panel row.
        expect(cascadeStaggerMs(1000) * 1000).toBeCloseTo(panelMs, 6);
    });

    it("keeps the CSS stagger on the same cap", () => {
        expect(css).toMatch(
            /--viz-stagger:\s*min\(\s*var\(--motion-stagger-default\),\s*var\(--spring-panel-duration\)\s*\/\s*var\(--viz-n, 1\)\s*\)/,
        );
    });
});
