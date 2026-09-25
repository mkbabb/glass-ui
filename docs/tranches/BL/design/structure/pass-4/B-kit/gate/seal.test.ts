// tests/gates/seal.test.ts — the D1-B seal (scripts/structure/seal/; the route's law is
// scripts/structure/seal/law.mjs). One verdict per clause, B0..B16, over the F-1 graph and the
// reviewed pin (scripts/structure/records/seal-pin.json). No off switch: the pin is always
// read, and a clause passes only with zero violations. The gate is read through the floor
// runtime's door, like every other reader of scripts/structure.
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { seal } from "../../scripts/structure/index.mjs";

const ROOT = resolve(__dirname, "../..");

describe("seal (route D1-B)", () => {
    const verdict: { counts: Record<string, number>; V: Record<string, string[]> } = seal(ROOT);
    it("judges all seventeen clauses", () => {
        expect(Object.keys(verdict.counts)).toEqual(Array.from({ length: 17 }, (_, i) => `B${i}`));
    });
    for (const clause of Object.keys(verdict.counts)) {
        it(clause, () => {
            expect(verdict.counts[clause], verdict.V[clause].slice(0, 12).join("\n")).toBe(0);
        });
    }
});
