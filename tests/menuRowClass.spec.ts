import { describe, expect, it } from "vitest";
import { menuRowClass } from "@glass/components/_shared/menu/menuRowClass";

describe("menuRowClass", () => {
    it("owns the canonical glass row and disabled treatment", () => {
        const classes = menuRowClass();

        expect(classes).toContain("interactive-item");
        expect(classes).toContain("glass-menu-row");
        expect(classes).toContain("py-1.5");
        expect(classes).toContain("data-[disabled]:pointer-events-none");
        expect(classes).toContain("data-[disabled]:opacity-disabled");
        expect(classes).toContain("data-[disabled]:cursor-not-allowed");
    });

    it("uses the compact inline inset when no indicator is rendered", () => {
        const classes = menuRowClass();

        expect(classes).toContain("px-2");
        expect(classes).not.toContain("pl-7");
    });

    it("reserves the selected-indicator gutter", () => {
        const classes = menuRowClass("start");

        expect(classes).toContain("pl-7");
        expect(classes).toContain("pr-2");
        expect(classes).not.toContain("px-2");
    });
});
