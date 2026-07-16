import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import * as buttonModule from "@glass/components/button";
import { Button } from "@glass/components/button";

describe("Button", () => {
    it("defaults to an ordinary native command", () => {
        const wrapper = mount(Button, { slots: { default: "Save" } });
        const button = wrapper.get("button");

        expect(button.attributes("type")).toBe("button");
        expect(button.attributes("data-emphasis")).toBe("secondary");
        expect(button.attributes("data-tone")).toBe("neutral");
        expect(button.attributes("data-size")).toBe("md");
        expect(button.attributes("data-control-target")).toBeUndefined();
        expect(button.classes()).toContain("button");
        expect(button.find(".cartoon-cast").exists()).toBe(false);
        expect("buttonVariants" in buttonModule).toBe(false);
    });

    it("publishes semantic emphasis, tone, size, and icon geometry", () => {
        const wrapper = mount(Button, {
            props: {
                emphasis: "primary",
                tone: "destructive",
                size: "sm",
                iconOnly: true,
            },
            attrs: { "aria-label": "Delete item" },
            slots: { default: "×" },
        });
        const button = wrapper.get("button");

        expect(button.attributes("data-emphasis")).toBe("primary");
        expect(button.attributes("data-tone")).toBe("destructive");
        expect(button.attributes("data-size")).toBe("sm");
        expect(button.attributes("data-icon-only")).toBe("true");
        expect(button.attributes("data-control-target")).toBe("");
        expect(button.attributes("aria-label")).toBe("Delete item");
    });

    it("hands pointer and keyboard feedback to one hydrated press owner", async () => {
        vi.useFakeTimers();
        const wrapper = mount(Button, { slots: { default: "Save" } });
        const button = wrapper.get("button");

        try {
            expect(button.attributes("data-press-armed")).toBe("");
            await button.trigger("keydown", { key: "Enter" });
            await vi.advanceTimersByTimeAsync(400);
            expect(
                Number(
                    (button.element as HTMLElement).style.getPropertyValue(
                        "--glass-btn-press-t",
                    ),
                ),
            ).toBeGreaterThan(0.9);

            await button.trigger("blur");
            await vi.advanceTimersByTimeAsync(600);
            expect(
                Number(
                    (button.element as HTMLElement).style.getPropertyValue(
                        "--glass-btn-press-t",
                    ),
                ),
            ).toBeLessThan(0.1);
        } finally {
            wrapper.unmount();
            vi.useRealTimers();
        }
    });

    it("preserves native submit and loading suppression", async () => {
        const onSubmit = vi.fn();
        const wrapper = mount({
            components: { Button },
            setup: () => ({ onSubmit }),
            template:
                '<form @submit.prevent="onSubmit"><Button type="submit" loading>Saving</Button></form>',
        });
        const button = wrapper.get("button");

        expect((button.element as HTMLButtonElement).disabled).toBe(true);
        expect(button.attributes("data-loading")).toBe("true");
        expect(button.attributes("aria-busy")).toBe("true");
        expect(button.attributes("type")).toBe("submit");
        (button.element as HTMLButtonElement).click();
        expect(onSubmit).not.toHaveBeenCalled();

        const direct = mount(Button, {
            props: { loading: true },
            slots: { default: "Save" },
        });
        await direct.setProps({ loading: false });
        expect((direct.get("button").element as HTMLButtonElement).disabled).toBe(
            false,
        );
        expect(direct.get("button").attributes("aria-busy")).toBeUndefined();
    });

    it("normalizes native disabled Booleanish values", async () => {
        const wrapper = mount(Button, {
            props: { disabled: "true" },
            slots: { default: "Save" },
        });
        expect((wrapper.get("button").element as HTMLButtonElement).disabled).toBe(
            true,
        );

        await wrapper.setProps({ disabled: "false" });
        expect((wrapper.get("button").element as HTMLButtonElement).disabled).toBe(
            false,
        );
    });

    it("preserves an asChild link and suppresses disabled activation", () => {
        const active = mount({
            components: { Button },
            template: '<Button as-child><a href="/docs">Docs</a></Button>',
        });
        const link = active.get("a");
        expect(link.attributes("href")).toBe("/docs");
        expect(link.attributes("data-slot")).toBe("button");
        expect(link.attributes("type")).toBeUndefined();
        expect(link.classes()).toContain("glass-capsule-hover");

        const disabled = mount({
            components: { Button },
            template: '<Button as-child disabled><a href="/docs">Docs</a></Button>',
        });
        const disabledLink = disabled.get("a");
        const event = new MouseEvent("click", { bubbles: true, cancelable: true });
        disabledLink.element.dispatchEvent(event);
        expect(disabledLink.attributes("aria-disabled")).toBe("true");
        expect(disabledLink.classes()).not.toContain("glass-capsule-hover");
        expect(event.defaultPrevented).toBe(true);
    });
});
