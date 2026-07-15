import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import { Button } from "@glass/components/button/index";

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
        // BC.W-BUTTON-GLASS-IOS (BG-IOS-6) — the un-reskinned shadcn-neutral
        // `secondary` (`bg-secondary`) RE-POINTED onto the quiet GLASS register
        // (`glass-wash btn-glass text-foreground`), a clean break with no alias.
        expect(button.classes()).toContain("glass-wash");
        expect(button.classes()).toContain("btn-glass");
        expect(button.classes()).toContain("text-foreground");
        // AX.W51 — the size rungs read the `--control-h-*` comfort cohort, not raw h-N.
        // AY.W-CSS1 — the var-in-arbitrary shorthand: `h-(--control-h-sm)`, not `h-[var(--control-h-sm)]`.
        expect(button.classes()).toContain("h-(--control-h-sm)");
    });
});
