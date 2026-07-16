import { flushPromises, mount } from "@vue/test-utils";
import {
    HoverCardPortal,
    HoverCardRoot,
    PopoverContent as RekaPopoverContent,
    PopoverRoot,
} from "reka-ui";
import { afterEach, describe, expect, expectTypeOf, it, vi } from "vitest";
import { defineComponent, nextTick } from "vue";

import * as PopoverSurface from "@glass/components/popover";
import Popover from "@glass/components/popover/Popover.vue";
import PopoverContent from "@glass/components/popover/PopoverContent.vue";
import PopoverTrigger from "@glass/components/popover/PopoverTrigger.vue";

type TriggerMode = InstanceType<typeof Popover>["$props"]["trigger"];

function setCoarsePointer(matches: boolean): void {
    vi.spyOn(window, "matchMedia").mockReturnValue({
        matches,
        media: "(pointer: coarse)",
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    });
}

afterEach(() => {
    vi.restoreAllMocks();
});

describe("Popover trigger contract", () => {
    it("publishes only the three compound owners", () => {
        expect(Object.keys(PopoverSurface).sort()).toEqual([
            "Popover",
            "PopoverContent",
            "PopoverTrigger",
        ]);
    });

    it("exposes only the truthful click/hover trigger union", () => {
        expectTypeOf<TriggerMode>().toEqualTypeOf<"click" | "hover" | undefined>();
    });

    it("uses the Popover root for the default click command", () => {
        setCoarsePointer(false);
        const wrapper = mount(Popover, { slots: { default: "content" } });

        expect(wrapper.findComponent(PopoverRoot).exists()).toBe(true);
        expect(wrapper.findComponent(HoverCardRoot).exists()).toBe(false);
    });

    it("uses the HoverCard root for fine-pointer hover previews", () => {
        setCoarsePointer(false);
        const wrapper = mount(Popover, {
            props: { trigger: "hover" },
            slots: { default: "content" },
        });

        expect(wrapper.findComponent(HoverCardRoot).exists()).toBe(true);
        expect(wrapper.findComponent(PopoverRoot).exists()).toBe(false);
    });

    it("promotes hover to a tap-toggle Popover root on coarse pointers", () => {
        setCoarsePointer(true);
        const wrapper = mount(Popover, {
            props: { trigger: "hover" },
            slots: { default: "content" },
        });

        expect(wrapper.findComponent(PopoverRoot).exists()).toBe(true);
        expect(wrapper.findComponent(HoverCardRoot).exists()).toBe(false);
    });

    it("owns a non-submit trigger and named group on the fine-hover branch", async () => {
        setCoarsePointer(false);
        const Host = defineComponent({
            components: { Popover, PopoverContent, PopoverTrigger },
            template: `
                <Popover trigger="hover" :open="true">
                    <PopoverTrigger type="submit">Preview</PopoverTrigger>
                    <PopoverContent :portal="false" aria-label="Preview details">
                        Details
                    </PopoverContent>
                </Popover>
            `,
        });
        const wrapper = mount(Host, { global: { stubs: { teleport: false } } });
        await nextTick();

        expect(wrapper.get("button").attributes("type")).toBe("button");
        expect(wrapper.get('[role="group"]').attributes("aria-label")).toBe(
            "Preview details",
        );
        expect(wrapper.getComponent(HoverCardPortal).props("disabled")).toBe(true);
    });

    it("preserves click placement, dismissal, focus return, and preventable autofocus", async () => {
        setCoarsePointer(false);
        const openAutoFocus = vi.fn((event: Event) => event.preventDefault());
        const Host = defineComponent({
            components: { Popover, PopoverContent, PopoverTrigger },
            data: () => ({ open: false }),
            setup: () => ({ openAutoFocus }),
            template: `
                <Popover v-model:open="open">
                    <PopoverTrigger as-child>
                        <button type="button">Open details</button>
                    </PopoverTrigger>
                    <PopoverContent
                        :portal="false"
                        side="top"
                        align="start"
                        @open-auto-focus="openAutoFocus"
                    >
                        <button type="button">Inside</button>
                    </PopoverContent>
                </Popover>
            `,
        });
        const wrapper = mount(Host, { attachTo: document.body });
        const trigger = wrapper.get("button");
        (trigger.element as HTMLElement).focus();

        await trigger.trigger("click");
        await flushPromises();

        const content = wrapper.get('[role="dialog"]');
        const rekaContent = wrapper.getComponent(RekaPopoverContent);
        expect((wrapper.vm as unknown as { open: boolean }).open).toBe(true);
        expect(trigger.attributes("aria-expanded")).toBe("true");
        expect(content.attributes("aria-labelledby")).toBe(trigger.attributes("id"));
        expect(rekaContent.props()).toMatchObject({ align: "start", side: "top" });
        expect(openAutoFocus).toHaveBeenCalledOnce();
        expect(document.activeElement).toBe(trigger.element);

        document.dispatchEvent(
            new KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
        );
        await nextTick();
        await flushPromises();

        expect((wrapper.vm as unknown as { open: boolean }).open).toBe(false);
        expect(document.activeElement).toBe(trigger.element);
        wrapper.unmount();
    });

    it("filters retired root, trigger, and positioning props at runtime", () => {
        setCoarsePointer(false);
        const Host = defineComponent({
            components: { Popover, PopoverContent, PopoverTrigger },
            data: () => ({
                contentAttrs: {
                    as: "section",
                    asChild: true,
                    "aria-modal": "true",
                    collisionPadding: 99,
                    forceMount: true,
                    role: "card",
                    sticky: "always",
                },
                rootAttrs: { modal: true },
                triggerAttrs: {
                    as: "a",
                    reference: document.body,
                    type: "submit",
                },
            }),
            template: `
                <Popover v-bind="rootAttrs" :open="true">
                    <PopoverTrigger v-bind="triggerAttrs">Open</PopoverTrigger>
                    <PopoverContent v-bind="contentAttrs" :portal="false">Body</PopoverContent>
                </Popover>
            `,
        });
        const wrapper = mount(Host);
        const root = wrapper.getComponent(PopoverRoot);
        const trigger = wrapper.get('[aria-haspopup="dialog"]');
        const content = wrapper.getComponent(RekaPopoverContent);

        expect(root.props("modal")).toBe(false);
        expect(trigger.element.tagName).toBe("BUTTON");
        expect(trigger.attributes("type")).toBe("button");
        expect(wrapper.get('[role="dialog"]').attributes("aria-modal")).toBeUndefined();
        expect(content.props()).toMatchObject({
            avoidCollisions: true,
            collisionPadding: undefined,
            forceMount: false,
            sticky: undefined,
        });
    });
});
