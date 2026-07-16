import { mount } from "@vue/test-utils";
import { defineComponent, nextTick } from "vue";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
    TooltipContent as RekaTooltipContent,
    TooltipProvider as RekaTooltipProvider,
    TooltipRoot as RekaTooltipRoot,
} from "reka-ui";
import * as TooltipSurface from "@glass/components/tooltip";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@glass/components/tooltip";

const TooltipFixture = defineComponent({
    components: { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger },
    template: `
        <TooltipProvider :delay-duration="40">
            <Tooltip>
                <TooltipTrigger as-child>
                    <button type="button" class="owned-trigger" aria-label="Surface details">
                        Details
                    </button>
                </TooltipTrigger>
                <TooltipContent>Translucency and edge treatment.</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    `,
});

afterEach(() => {
    document.body.innerHTML = "";
    vi.useRealTimers();
});

describe("Tooltip composition contract", () => {
    it("publishes only the four context and interaction owners", () => {
        expect(Object.keys(TooltipSurface).sort()).toEqual([
            "Tooltip",
            "TooltipContent",
            "TooltipProvider",
            "TooltipTrigger",
        ]);
    });

    it("forwards onto the exact named trigger without adding a resizing wrapper", () => {
        const wrapper = mount(TooltipFixture);
        const buttons = wrapper.findAll("button");

        expect(buttons).toHaveLength(1);
        expect(buttons[0]!.classes()).toContain("owned-trigger");
        expect(buttons[0]!.attributes()).toMatchObject({
            "aria-label": "Surface details",
            type: "button",
        });
    });

    it("makes its default primitive a non-submit button", () => {
        const Host = defineComponent({
            components: { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger },
            template: `
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger type="submit">Details</TooltipTrigger>
                        <TooltipContent>Description</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            `,
        });
        const wrapper = mount(Host);

        expect(wrapper.get("button").attributes("type")).toBe("button");
    });

    it("opens from keyboard focus and preserves the trigger's description contract", async () => {
        vi.useFakeTimers();
        const wrapper = mount(TooltipFixture, { attachTo: document.body });
        const trigger = wrapper.get("button");

        await trigger.trigger("focus");
        await vi.runAllTimersAsync();
        await nextTick();

        expect(trigger.attributes("data-state")).toBe("instant-open");
        expect(trigger.attributes("aria-describedby")).toBeTruthy();
    });

    it("does not synthesize hover for a touch pointer", async () => {
        vi.useFakeTimers();
        const wrapper = mount(TooltipFixture);
        const trigger = wrapper.get("button");

        await trigger.trigger("pointermove", { pointerType: "touch" });
        await vi.runAllTimersAsync();
        await nextTick();

        expect(trigger.attributes("data-state")).toBe("closed");
        expect(trigger.attributes("aria-label")).toBe("Surface details");
    });

    it("dismisses on Escape and removes the description relation", async () => {
        vi.useFakeTimers();
        const wrapper = mount(TooltipFixture, {
            attachTo: document.body,
            global: { stubs: { teleport: false } },
        });
        const trigger = wrapper.get("button");

        await trigger.trigger("focus");
        await vi.runAllTimersAsync();
        await nextTick();
        expect(trigger.attributes("aria-describedby")).toBeTruthy();

        document.body
            .querySelector<HTMLElement>('[data-reveal="tooltip"]')!
            .dispatchEvent(
                new KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
            );
        await vi.runAllTimersAsync();
        await nextTick();

        expect(trigger.attributes("data-state")).toBe("closed");
        expect(trigger.attributes("aria-describedby")).toBeUndefined();
        wrapper.unmount();
    });

    it("filters retired provider, root, trigger, and positioning props", async () => {
        vi.useFakeTimers();
        const Host = defineComponent({
            components: { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger },
            data: () => ({
                contentAttrs: {
                    as: "section",
                    collisionPadding: 99,
                    forceMount: true,
                    sticky: "always",
                },
                providerAttrs: { content: { side: "left" }, disabled: true },
                rootAttrs: {
                    disableClosingTrigger: true,
                    disableHoverableContent: true,
                    ignoreNonKeyboardFocus: true,
                },
                triggerAttrs: { as: "a", reference: document.body },
            }),
            template: `
                <TooltipProvider v-bind="providerAttrs" :delay-duration="0">
                    <Tooltip v-bind="rootAttrs">
                        <TooltipTrigger v-bind="triggerAttrs">Details</TooltipTrigger>
                        <TooltipContent v-bind="contentAttrs" side="right" :side-offset="9">
                            Description
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            `,
        });
        const wrapper = mount(Host, {
            attachTo: document.body,
            global: { stubs: { teleport: false } },
        });
        const trigger = wrapper.get("button");
        await trigger.trigger("focus");
        await vi.runAllTimersAsync();
        await nextTick();

        expect(
            wrapper.getComponent(RekaTooltipProvider).props("content"),
        ).toBeUndefined();
        expect(wrapper.getComponent(RekaTooltipRoot).props()).toMatchObject({
            disableClosingTrigger: undefined,
            disableHoverableContent: undefined,
            ignoreNonKeyboardFocus: undefined,
        });
        expect(trigger.element.tagName).toBe("BUTTON");
        expect(wrapper.getComponent(RekaTooltipContent).props()).toMatchObject({
            side: "right",
            sideOffset: 9,
        });
        wrapper.unmount();
    });
});
