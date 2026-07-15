import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import { ToggleGroup, ToggleGroupItem } from "@glass/components/toggle-group";

describe("ToggleGroup horizontal alignment", () => {
    it("uses safe centering so overflow falls back to the reachable start edge", () => {
        const wrapper = mount(ToggleGroup, {
            props: { type: "single", modelValue: "one" },
            slots: {
                default: ["one", "two", "three"].map(
                    (value) => `<ToggleGroupItem value="${value}">${value}</ToggleGroupItem>`,
                ),
            },
            global: { components: { ToggleGroupItem } },
        });
        const group = wrapper.get('[data-slot="toggle-group"]');

        expect(group.attributes("style")).toContain("justify-content: safe center");
        expect(group.classes()).not.toContain("justify-center");
    });
});
