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
        // AX.W51 — the size rungs read the `--control-h-*` comfort cohort, not raw h-N.
        // AY.W-CSS1 — the var-in-arbitrary shorthand: `h-(--control-h-sm)`, not `h-[var(--control-h-sm)]`.
        expect(button.classes()).toContain("h-(--control-h-sm)");
    });
});
