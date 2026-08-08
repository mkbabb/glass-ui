import { mount } from "@vue/test-utils";
import { describe, expect, expectTypeOf, it } from "vitest";
import {
    Label,
    type LabelProps,
    type LabelRequirement,
} from "@glass/components/label";

describe("Label contract", () => {
    it("publishes its semantic prop vocabulary without a styling authority", () => {
        expectTypeOf<LabelRequirement>().toEqualTypeOf<"required" | "optional">();
        expectTypeOf<LabelProps>().toMatchTypeOf<{
            for?: string;
            requirement?: LabelRequirement;
            disabled?: boolean;
        }>();
    });

    it("keeps one native label host and forwards its association", () => {
        const wrapper = mount(Label, {
            props: { for: "account-name" },
            slots: { default: "Account name" },
        });

        expect(wrapper.element.tagName).toBe("LABEL");
        expect(wrapper.attributes("for")).toBe("account-name");
        expect(wrapper.findAll("label")).toHaveLength(1);
    });

    // BORN-RED at HEAD (D13, S13). Both annotations were `aria-hidden` together.
    // For `*` that is right — announcing the glyph reads "star"/"asterisk", which
    // is documented AT noise, and REQUIREDNESS IS THE CONTROL'S CHANNEL
    // (`required`/`aria-required` on the input, which a Label cannot supply for a
    // control it does not own). For "optional" it is wrong in the opposite
    // direction: there is no control-side attribute that means optional — the
    // ABSENCE of `required` announces nothing — so hiding the word removes the
    // information from AT entirely. HEAD reading: `aria-hidden="true"` on BOTH.
    it.each([
        ["required", "*", "true"],
        ["optional", "optional", undefined],
    ] as const)(
        "hides the %s glyph or announces its word, per which channel owns it",
        (requirement, text, hidden) => {
            const wrapper = mount(Label, {
                props: { for: "field", requirement },
                slots: { default: "Field" },
            });
            const annotation = wrapper.get(".label-requirement");

            expect(wrapper.attributes("data-requirement")).toBe(requirement);
            expect(annotation.text()).toBe(text);
            expect(annotation.attributes("aria-hidden")).toBe(hidden);
        },
    );

    it("owns disabled paint explicitly without changing association", () => {
        const wrapper = mount(Label, {
            props: { for: "locked", disabled: true },
            slots: { default: "Locked field" },
        });

        expect(wrapper.attributes("for")).toBe("locked");
        expect(wrapper.attributes("data-disabled")).toBe("true");
        expect(wrapper.classes()).toContain("label");
        // BORN-RED at HEAD (D29). The class was `.glass-label` — a `glass-` prefix
        // on a component that carries font and colour rules and zero glass. A
        // prefix promising a material the component does not have is a lie in the
        // stylesheet, and D29's own law reaches it.
        expect(wrapper.classes()).not.toContain("glass-label");
    });
});
