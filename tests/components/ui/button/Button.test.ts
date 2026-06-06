import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import { Button } from "../../../../src/components/ui/button/index";

describe("Button", () => {
    it("renders the requested button variant and size", () => {
        const wrapper = mount(Button, {
            props: {
                variant: "secondary",
                size: "sm",
            },
            slots: {
                default: "Save",
            },
        });

        const button = wrapper.get("button");

        expect(button.text()).toBe("Save");
        expect(button.classes()).toContain("bg-secondary");
        expect(button.classes()).toContain("h-9");
    });
});
