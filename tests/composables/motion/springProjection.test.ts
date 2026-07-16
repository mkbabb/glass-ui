import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { SPRING_PRESETS } from "@glass/composables/motion/spring/springPresets";
import { springProjection } from "@glass/composables/motion/spring/springProjection";

const tokens = readFileSync(
    resolve(process.cwd(), "src/styles/tokens/scheme-spring.css"),
    "utf8",
);

// The max output value across the linear() stops — the overshoot the shipped
// token actually encodes. Each stop is `value` or `value position%`.
function parseStopsMax(stops: string): number {
    return stops
        .replace(/^linear\(/, "")
        .replace(/\)$/, "")
        .split(",")
        .map((stop) => Number.parseFloat(stop.trim()))
        .reduce((max, value) => Math.max(max, value), Number.NEGATIVE_INFINITY);
}

describe("springProjection", () => {
    it("reproduces every shipped spring token and rounded settle byte-for-byte", () => {
        for (const row of SPRING_PRESETS) {
            const projection = springProjection(row);
            expect(tokens).toContain(`--spring-${row.name}: ${projection.stops};`);
            expect(tokens).toContain(
                `--spring-${row.name}-settle: ${projection.settleSeconds}s;`,
            );
        }
    });

    it("reports peak as the overshoot the shipped stops encode", () => {
        for (const row of SPRING_PRESETS) {
            const projection = springProjection(row);
            // peak samples the timing function on its own grid while the stops
            // sample on theirs, so the two independent derivations agree to
            // ~1e-4 (measured worst case 8.7e-5) — a real cross-check of the
            // overshoot, not a self-copy. A gross peak error exceeds this.
            expect(projection.peak).toBeCloseTo(parseStopsMax(projection.stops), 3);
            expect(projection.peak).toBeGreaterThanOrEqual(1);
        }
    });
});
