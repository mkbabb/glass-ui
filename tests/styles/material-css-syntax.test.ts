import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { transform } from "lightningcss";
import { describe, expect, it } from "vitest";

const ROOT = resolve(import.meta.dirname, "../..");
const MATERIAL = resolve(ROOT, "src/styles/glass/material.css");

describe("glass material CSS syntax", () => {
    it("is accepted by the strict package CSS compiler", () => {
        expect(() =>
            transform({
                filename: MATERIAL,
                code: readFileSync(MATERIAL),
            }),
        ).not.toThrow();
    });

    it("bites when prose terminates a block comment early", () => {
        const source = readFileSync(MATERIAL, "utf8").replace(
            "every Vue source file",
            "`src/**/*.vue`",
        );

        expect(() =>
            transform({
                filename: MATERIAL,
                code: Buffer.from(source),
            }),
        ).toThrow(/Unexpected token/);
    });
});
