import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

import { validateInvariantTaxonomy } from "../../scripts/verification/invariants.mjs";

const root = resolve(import.meta.dirname, "../..");
const taxonomy = JSON.parse(
    readFileSync(resolve(root, "docs/tranches/BI/FORMATION/invariants.json"), "utf8"),
);

describe("descriptive invariant taxonomy", () => {
    it("accepts the current non-executable taxonomy", () => {
        expect(validateInvariantTaxonomy(taxonomy)).toMatchObject({ ok: true, errors: [] });
    });

    it("rejects a count oracle and nested executable identity", () => {
        const counted = structuredClone(taxonomy);
        counted.normativeCount = true;
        expect(validateInvariantTaxonomy(counted).ok).toBe(false);

        const executable = structuredClone(taxonomy);
        executable.invariants[0].evidence = { command: "synthetic" };
        expect(validateInvariantTaxonomy(executable).ok).toBe(false);
    });
});
