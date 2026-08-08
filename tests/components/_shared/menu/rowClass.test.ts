import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
    rowClass,
    type MenuRowIndicator,
} from "@glass/components/_shared/menu/rowClass";

const SOURCE = resolve(
    process.cwd(),
    "src/components/_shared/menu/rowClass.ts",
);

describe("rowClass — the ONE menu-row register", () => {
    it("owns the canonical glass row and disabled treatment", () => {
        const classes = rowClass();

        expect(classes).toContain("interactive-item");
        expect(classes).toContain("glass-menu-row");
        expect(classes).toContain("data-[disabled]:pointer-events-none");
        expect(classes).toContain("data-[disabled]:opacity-disabled");
        expect(classes).toContain("data-[disabled]:cursor-not-allowed");
    });

    it("pads a row on the canonical space series — 4 block, 8 inline", () => {
        // `py-1` = 4px, `px-2` = 8px. The former `py-1.5` resolved 6, which is on no
        // rung of the 4·8·12·20·32·52 series the family's spaces ride.
        expect(rowClass()).toContain("py-1");
        expect(rowClass()).not.toContain("py-1.5");
        expect(rowClass()).toContain("px-2");
        expect(rowClass("start")).toContain("py-1");
    });

    it("uses the compact inline inset when no indicator is rendered", () => {
        const classes = rowClass();

        expect(classes).toContain("px-2");
        expect(classes).not.toContain("ps-7");
    });

    it("reserves the selected-indicator gutter on the LOGICAL start edge", () => {
        const classes = rowClass("start");

        // `ps-7` = 28px, the figure G2 measures: wide enough that a 14px mark at a
        // 8px inset cannot reach the label. Logical, so an RTL listbox reserves the
        // gutter on the correct side rather than mirroring the text over the mark.
        expect(classes).toContain("ps-7");
        expect(classes).toContain("pe-2");
        expect(classes).not.toContain("px-2");
        expect(classes).not.toContain("pl-7");
        expect(classes).not.toContain("pr-2");
    });

    /* THE DEFECT THIS FILE EXISTS TO CATCH. The gutter had never painted in any
     * consumer, and not because the value was wrong — because the token sat inside a
     * template-literal interpolation, which neither the demo's Tailwind content scan
     * nor the library's own utility emitter can be relied on to tokenize. (The
     * emitter walks quoted runs with ONE character class for `"`, `'` and backtick,
     * so a backtick pairs with the next double quote and everything after it
     * desynchronizes; tokens landing in the gaps are never emitted.) A unit test on
     * the RETURN VALUE cannot see this — every assertion above passes either way. So
     * this one reads the source. */
    it("BITE — never assembles a class list, so every token is a plain literal", () => {
        const source = readFileSync(SOURCE, "utf8");
        const code = source
            .replace(/\/\*[\s\S]*?\*\//g, "")
            .replace(/^\s*\/\/.*$/gm, "");

        // No template literal anywhere in the module's code.
        expect(code, "a template literal re-introduces the emitter desync").not.toMatch(
            /`/,
        );
        // No string concatenation and no join: the two rows are whole, or they are
        // assembled, and assembled is the defect.
        expect(code, "class strings must not be concatenated").not.toMatch(/"\s*\+/);
        expect(code, "class strings must not be joined from parts").not.toMatch(
            /\.join\(/,
        );
    });

    it("BITE — each indicator arm is a COMPLETE literal present verbatim in source", () => {
        const source = readFileSync(SOURCE, "utf8");
        const arms: MenuRowIndicator[] = ["none", "start"];
        for (const arm of arms) {
            expect(
                source.includes(`"${rowClass(arm)}"`),
                `the ${arm} row is not a verbatim literal in rowClass.ts`,
            ).toBe(true);
        }
    });

    it("BITE — the two arms are distinct and neither is a prefix of the other", () => {
        expect(rowClass("none")).not.toBe(rowClass("start"));
        expect(rowClass("start").startsWith(rowClass("none"))).toBe(false);
    });

    it("defaults to the no-indicator arm", () => {
        expect(rowClass()).toBe(rowClass("none"));
    });
});
