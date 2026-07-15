import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { SPRING_PRESETS } from "@glass/composables/motion/springPresets";
import {
    SPRING_TOKEN_SAMPLE_COUNT,
    springProjection,
} from "@glass/composables/motion/springProjection";

const tokens = readFileSync(
    resolve(process.cwd(), "src/styles/tokens/scheme-spring.css"),
    "utf8",
);

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

    it("keeps the generator density and tempo projection explicit", () => {
        const projection = springProjection(SPRING_PRESETS[0]!);
        expect(projection.sampleCount).toBe(SPRING_TOKEN_SAMPLE_COUNT);
        expect(projection.sampleCount).toBe(48);
        expect(projection.stops.match(/%/g)).toHaveLength(48);
        expect(
            (projection.settleSeconds * 1.3) / (projection.settleSeconds * 0.7),
        ).toBeCloseTo(13 / 7, 12);
    });
});
