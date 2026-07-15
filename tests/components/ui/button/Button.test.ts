import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";

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

    it("publishes loading state and suppresses native submit activation", () => {
        const onSubmit = vi.fn();
        const wrapper = mount({
            components: { Button },
            setup: () => ({ onSubmit }),
            template:
                '<form @submit.prevent="onSubmit"><Button type="submit" loading>Saving changes</Button></form>',
        });
        const button = wrapper.get("button");

        expect((button.element as HTMLButtonElement).disabled).toBe(true);
        expect(button.attributes("data-loading")).toBe("true");
        expect(button.attributes("aria-busy")).toBe("true");
        expect(button.attributes("type")).toBe("submit");

        (button.element as HTMLButtonElement).click();
        expect(onSubmit).not.toHaveBeenCalled();
    });

    it("restores native activation when loading clears", async () => {
        const wrapper = mount(Button, {
            props: { loading: true },
            slots: { default: "Save" },
        });

        await wrapper.setProps({ loading: false });
        const button = wrapper.get("button");
        expect((button.element as HTMLButtonElement).disabled).toBe(false);
        expect(button.attributes("data-loading")).toBeUndefined();
        expect(button.attributes("aria-busy")).toBeUndefined();
    });

    it("normalizes native disabled Booleanish values", async () => {
        const wrapper = mount(Button, {
            props: { disabled: "true" },
            slots: { default: "Save" },
        });
        expect((wrapper.get("button").element as HTMLButtonElement).disabled).toBe(true);

        await wrapper.setProps({ disabled: "false" });
        expect((wrapper.get("button").element as HTMLButtonElement).disabled).toBe(false);

        const emptyAttribute = mount({
            components: { Button },
            template: "<Button disabled>Save</Button>",
        });
        expect((emptyAttribute.get("button").element as HTMLButtonElement).disabled).toBe(
            true,
        );
    });
});
