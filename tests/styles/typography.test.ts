import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const scale = readFileSync("src/styles/typography/scale.css", "utf8");
const semantic = readFileSync("src/styles/typography/semantic.css", "utf8");

describe("display typography weight", () => {
    it("routes the public display-weight override through the canonical utility token", () => {
        expect(scale).toMatch(/--font-display-weight:\s*600\s*;/);
        expect(scale).toMatch(
            /--type-weight-display:\s*var\(--font-display-weight\)\s*;/,
        );
        expect(semantic).toMatch(
            /@utility text-display[^}]+font-weight:\s*var\(--type-weight-display\)/s,
        );
    });
});
