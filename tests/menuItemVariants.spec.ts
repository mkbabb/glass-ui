import { describe, expect, it } from "vitest";
import { menuItemVariants } from "@glass/components/ui/_shared/menuItemVariants";

/**
 * V.W3.T2 — menuItemVariants CVA contract.
 *
 * Verifies the canonical 9-primitive (DropdownMenu × 4 + ContextMenu × 4 +
 * Select/Combobox/Command Items) menu-item recipe:
 * 1. composes the `interactive-item` substrate utility (provides
 *    border-radius lg + active-scale + focus-visible ring + data-disabled paint);
 * 2. paints hover / focus / data-highlighted accents on the same surface;
 * 3. paints data-disabled (the FOURTH state — reka-ui emits the data-attr
 *    instead of the :disabled pseudo-class);
 * 4. promotes all radii to `lg` (no `rounded-sm` literals at any callsite);
 * 5. exposes the indicator-slot variant for radio-dot / check / inset gutter.
 */
describe("menuItemVariants", () => {
    it("base recipe composes interactive-item + the glass-menu-row register + four-state disabled paint", () => {
        // BA.W-MENU-GLASS clean break: the base flat-fill `hover/focus/data-highlighted/
        // data-[state=open]:bg-accent` recipe DROPPED for the `.glass-menu-row` register
        // (element-level oklab-tint hover/highlight; `accent` is the explicit opt-out escape,
        // not the base). proof:menu-glass owns the register assertion; this companion re-points
        // off the retired flat-fill literals. The four disabled-state legs are byte-untouched.
        const c = menuItemVariants();
        expect(c).toContain("interactive-item");
        expect(c).toContain("glass-menu-row");
        expect(c).not.toContain("hover:bg-accent");
        expect(c).not.toContain("data-[highlighted]:bg-accent");
        expect(c).toContain("data-[disabled]:pointer-events-none");
        expect(c).toContain("data-[disabled]:opacity-disabled");
        expect(c).toContain("data-[disabled]:cursor-not-allowed");
    });

    it("indicator='none' (default) paints px-2 only", () => {
        const c = menuItemVariants();
        expect(c).toContain("px-2");
        expect(c).not.toContain("pl-7");
        expect(c).not.toContain("pl-8");
    });

    it("indicator='start' reserves pl-7 (28px) gutter", () => {
        const c = menuItemVariants({ indicator: "start" });
        expect(c).toContain("pl-7");
        expect(c).toContain("pr-2");
    });

    it("indicator='start-wide' reserves pl-8 (32px) gutter", () => {
        const c = menuItemVariants({ indicator: "start-wide" });
        expect(c).toContain("pl-8");
        expect(c).toContain("pr-2");
    });

    it("density='comfortable' (default) paints py-1.5", () => {
        const c = menuItemVariants();
        expect(c).toContain("py-1.5");
    });

    it("size='lg' paints py-2.5 to match the audacious dock rail", () => {
        const c = menuItemVariants({ size: "lg" });
        expect(c).toContain("py-2.5");
    });

    it("does NOT write rounded-sm or rounded-md literals (lg is canonical via interactive-item)", () => {
        const c = menuItemVariants();
        expect(c).not.toContain("rounded-sm");
        expect(c).not.toContain("rounded-md");
    });
});
