import { readFileSync } from "node:fs";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { Separator } from "@glass/components/separator";

describe("Separator semantics", () => {
    it("removes separator semantics from a decorative labelled rule", () => {
        const wrapper = mount(Separator, {
            props: {
                label: "or",
                decorative: true,
                orientation: "vertical",
            },
            attrs: { "aria-label": "Choice divider" },
        });
        const separator = wrapper.get('[data-slot="separator"]');

        expect(separator.attributes("role")).toBe("none");
        expect(separator.attributes("aria-orientation")).toBeUndefined();
        expect(separator.attributes("aria-label")).toBeUndefined();
        expect(separator.attributes("aria-labelledby")).toBeUndefined();
        expect(separator.attributes("data-orientation")).toBe("vertical");
        expect(separator.text()).toBe("or");
    });

    it("names a semantic labelled rule from its visible label", () => {
        const wrapper = mount(Separator, { props: { label: "or" } });
        const separator = wrapper.get('[data-slot="separator"]');
        const label = wrapper.get("span[id]");

        expect(separator.attributes("role")).toBe("separator");
        expect(separator.attributes("aria-orientation")).toBeUndefined();
        expect(separator.attributes("aria-label")).toBeUndefined();
        expect(separator.attributes("aria-labelledby")).toBe(label.attributes("id"));
        expect(separator.findAll(".separator-segment")).toHaveLength(2);
    });

    it("exposes vertical orientation and an explicit accessible name", () => {
        const wrapper = mount(Separator, {
            props: {
                label: "or",
                orientation: "vertical",
            },
            attrs: { "aria-label": "Alternative" },
        });
        const separator = wrapper.get('[data-slot="separator"]');

        expect(separator.attributes("role")).toBe("separator");
        expect(separator.attributes("aria-orientation")).toBe("vertical");
        expect(separator.attributes("aria-label")).toBe("Alternative");
        expect(separator.attributes("aria-labelledby")).toBeUndefined();
    });

    it("keeps unlabelled separators delegated to Reka", () => {
        const decorative = mount(Separator, { props: { decorative: true } });
        const vertical = mount(Separator, { props: { orientation: "vertical" } });

        expect(decorative.get('[data-slot="separator"]').attributes("role")).toBe(
            "none",
        );
        expect(vertical.get('[data-slot="separator"]').attributes("role")).toBe(
            "separator",
        );
        expect(
            vertical.get('[data-slot="separator"]').attributes("aria-orientation"),
        ).toBe("vertical");
    });

    it("treats a blank label as an unlabelled separator", () => {
        const wrapper = mount(Separator, { props: { label: "   " } });

        expect(wrapper.get('[data-slot="separator"]').attributes("role")).toBe(
            "separator",
        );
        expect(wrapper.find(".separator-label").exists()).toBe(false);
    });

    // BORN-RED at HEAD (D2/D3), the two C-severity paint defects, asserted at the
    // one place a unit test can honestly reach them: the declarations that produced
    // them. The measured cures are P1 (1.00 × 0.00 → 1 × 22.97) and P2 (a 1246 ×
    // 1.00 host whose 18.70px label overflowed it by 8.84/8.85px → contained).
    //
    // HEAD readings, verbatim:
    //   `block-size: 100%`                                    → 1 occurrence
    //   `.separator-labelled[data-orientation="horizontal"]`  → carried `gap` only
    // A percentage of an INDEFINITE parent resolves `auto`, and `auto` on an empty
    // div is zero — the declaration meant "match my siblings" and could not say it.
    // The labelled un-clamp must be spelled at (0,2,0), the same specificity as the
    // hairline clamp; that specificity gap IS D2.
    it("declares a box that exists on both arms", () => {
        const css = readFileSync(
            "src/components/separator/Separator.vue",
            "utf8",
        ).replace(/\/\*[\s\S]*?\*\//g, "");

        expect(css).not.toContain("block-size: 100%");
        expect(css).toMatch(
            /\.separator\[data-orientation="vertical"\]\s*\{[^}]*align-self:\s*stretch/,
        );
        expect(css).toMatch(
            /\.separator-labelled\[data-orientation="horizontal"\]\s*\{[^}]*block-size:\s*auto/,
        );
        // One ink, off the ladder; and the label leaves the mono (value) face for
        // the sans section-label rung it always was.
        expect(css).not.toContain("--separator-ink");
        expect(css).toContain("var(--ink-seam)");
        expect(css).not.toContain("var(--font-mono)");
    });
});
