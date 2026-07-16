import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { SPRING_PRESETS } from "@glass/composables/motion/springPresets";
import { springProjection } from "@glass/composables/motion/springProjection";

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
});
