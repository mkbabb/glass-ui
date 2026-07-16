import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const scale = readFileSync("src/styles/typography/scale.css", "utf8");

describe("proportional headline and kicker", () => {
    it("publishes the exact 1/√φ proportional pair", () => {
        const ratio = Number(
            scale.match(/--type-proportional-ratio:\s*([\d.]+)/)?.[1],
        );
        const phi = (1 + Math.sqrt(5)) / 2;

        expect(ratio).toBeCloseTo(1 / Math.sqrt(phi), 15);
        expect(scale).toMatch(
            /--type-proportional-ratio:\s*0\.7861513777574233\s*;/,
        );
        expect(scale).toMatch(
            /--type-proportional-headline-size:\s*var\(--type-display-2\)\s*;/,
        );
        expect(scale).toMatch(
            /--type-proportional-kicker-size:\s*calc\(\s*var\(--type-proportional-headline-size\)\s*\*\s*var\(--type-proportional-ratio\)\s*\)\s*;/s,
        );
        expect(scale).toMatch(/--type-proportional-leading:\s*1\s*;/);
    });
});
