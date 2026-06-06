import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import GlassDock from "../../../../src/components/custom/dock/GlassDock.vue";

/**
 * AJ-W1-δ — `<GlassDock variant="instrument-strip">` test suite.
 *
 * The new variant adopts chassis-strip aesthetics (matching the
 * `<InstrumentChassis>` family's surface vocabulary) while inheriting
 * the existing rail variant's vertical layout. The CSS that supplies
 * the `--radius-card` border-radius + `--glass-bg-chassis` plate +
 * engraved-bezel `::before` stroke ships in `src/styles/dock.css`
 * (loaded as a sibling sheet, not via scoped style); the structural
 * assertions here verify the SFC emits the correct class hook + the
 * orientation + fitContent computeds branch on the new variant value.
 */
describe("GlassDock variant=\"instrument-strip\" (AJ-W1-δ)", () => {
    it("emits the `variant-instrument-strip` class hook", () => {
        const wrapper = mount(GlassDock, {
            props: { variant: "instrument-strip" },
        });
        const root = wrapper.get(".glass-dock");
        expect(root.classes()).toContain("variant-instrument-strip");
    });

    it("inherits vertical orientation from the variant (matches rail behaviour)", () => {
        const wrapper = mount(GlassDock, {
            props: { variant: "instrument-strip" },
        });
        const root = wrapper.get(".glass-dock");
        // The orientation computed branches on `variant === "rail" ||
        // variant === "instrument-strip"` → "vertical" regardless of the
        // (default horizontal) orientation prop. The vertical class
        // emits via the template's `[orientation, ...]` class binding.
        expect(root.classes()).toContain("vertical");
    });

    it("inherits fit-content from the variant (matches rail behaviour)", () => {
        const wrapper = mount(GlassDock, {
            props: { variant: "instrument-strip" },
        });
        const root = wrapper.get(".glass-dock");
        expect(root.classes()).toContain("fit-content");
    });

    it("retains backward compat — default variant (`dock`) does NOT acquire the strip class", () => {
        const wrapper = mount(GlassDock);
        const root = wrapper.get(".glass-dock");
        expect(root.classes()).toContain("variant-dock");
        expect(root.classes()).not.toContain("variant-instrument-strip");
    });

    it("retains backward compat — `rail` variant continues to emit `variant-rail`", () => {
        const wrapper = mount(GlassDock, {
            props: { variant: "rail" },
        });
        const root = wrapper.get(".glass-dock");
        expect(root.classes()).toContain("variant-rail");
        expect(root.classes()).not.toContain("variant-instrument-strip");
        // Rail keeps its vertical orientation + fit-content semantics.
        expect(root.classes()).toContain("vertical");
        expect(root.classes()).toContain("fit-content");
    });
});
