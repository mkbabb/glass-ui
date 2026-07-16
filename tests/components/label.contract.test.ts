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

    it.each([
        ["required", "*"],
        ["optional", "optional"],
    ] as const)(
        "renders the %s requirement annotation decoratively",
        (requirement, text) => {
            const wrapper = mount(Label, {
                props: { for: "field", requirement },
                slots: { default: "Field" },
            });
            const annotation = wrapper.get(".label-requirement");

            expect(wrapper.attributes("data-requirement")).toBe(requirement);
            expect(annotation.text()).toBe(text);
            expect(annotation.attributes("aria-hidden")).toBe("true");
        },
    );

    it("owns disabled paint explicitly without changing association", () => {
        const wrapper = mount(Label, {
            props: { for: "locked", disabled: true },
            slots: { default: "Locked field" },
        });

        expect(wrapper.attributes("for")).toBe("locked");
        expect(wrapper.attributes("data-disabled")).toBe("true");
        expect(wrapper.classes()).toContain("glass-label");
    });
});
