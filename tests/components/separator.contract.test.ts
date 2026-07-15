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

        expect(decorative.get('[data-slot="separator"]').attributes("role")).toBe("none");
        expect(vertical.get('[data-slot="separator"]').attributes("role")).toBe("separator");
        expect(vertical.get('[data-slot="separator"]').attributes("aria-orientation")).toBe("vertical");
    });
});
