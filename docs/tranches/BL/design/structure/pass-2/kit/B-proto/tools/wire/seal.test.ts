// The D1-B seal gate (docs/tranches/BL/design/structure/pass-2/SPECS-v2.md §2.5) under npm test:
// one verdict per clause, B0-B15, against the reviewed door and module pin.
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { seal } from "../../scripts/structure/index.mjs";

const ROOT = resolve(__dirname, "../..");

describe("seal (D1-B): sealed modules, one door each", () => {
    const verdict = seal(ROOT);
    for (const [clause, lines] of Object.entries(verdict.V as Record<string, string[]>)) {
        it(clause, () => {
            expect(lines.length, lines.slice(0, 25).join("\n")).toBe(0);
        });
    }
});
