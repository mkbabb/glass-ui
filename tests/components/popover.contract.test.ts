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
        // `portal: false` renders NO portal component. The two arms used to disagree:
        // the hover arm mounted a `:disabled` HoverCardPortal, the click arm dropped
        // the wrapper. Reka's Teleport gates its whole subtree on `useMounted()`, so a
        // "disabled" portal still withholds content until mount — the drop is the arm
        // that was right, and #89 unified onto it.
        expect(wrapper.findComponent(HoverCardPortal).exists()).toBe(false);
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
        // BK #89 W-OVERLAY: `modal` is the ONE a11y axis and it defaults FALSE, so a
        // plain popover announces NO modality. It used to be impossible to say either
        // way — `aria-modal` was stripped off `$attrs` on the way past while `modal`
        // never reached the root at all, so the attribute and the behaviour could not
        // have agreed even by accident.
        expect(content.attributes("aria-modal")).toBeUndefined();
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

    // BK #19 W-SHIM-PURGE, extended at BK #89 W-OVERLAY. The prior contract ran a
    // 38-entry deny-list over `$attrs` on six floating surfaces, so a consumer writing
    // `as-child`, `sticky`, or `collision-padding` got NO error, NO warning, and NO
    // effect — a silent migration shim. The deny-list is GONE: `$attrs` forwards
    // untouched, so a retired prop either lands visibly on reka or errors there.
    //
    // The LAST piece of that swallowing was a `role`/`aria-modal` destructure inside
    // PopoverContent, and #89 deleted it too: those two attributes are now DERIVED
    // from the `modal` prop rather than thrown away, so `modal` reaches reka (which
    // is what actually enforces the trap) and the content states the semantics that
    // match. Nothing filters `$attrs` on this component any more.
    it("forwards positioning props to reka instead of swallowing them, and derives its own a11y", () => {
        setCoarsePointer(false);
        const Host = defineComponent({
            components: { Popover, PopoverContent, PopoverTrigger },
            data: () => ({
                contentAttrs: {
                    "aria-modal": "true",
                    collisionPadding: 99,
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

        // `modal` is a DECLARED prop on `<Popover>` now, so it reaches reka's root —
        // the bite is that it used to resolve `false` here no matter what the caller
        // wrote, which is precisely why a modal popover was unreachable.
        expect(root.props("modal")).toBe(true);
        expect(trigger.element.tagName).toBe("BUTTON");
        expect(trigger.attributes("type")).toBe("button");
        // …and the content states the modality the root now enforces. A caller's raw
        // `aria-modal` attr no longer decides it either way: the axis does, so the
        // announcement and the behaviour cannot disagree.
        const plate = wrapper.get('[role="dialog"]');
        expect(plate.attributes("aria-modal")).toBe("true");
        // …and the formerly-denied positioning props now REACH reka. The bite: under
        // the deny-list both of these read `undefined` here while the caller believed
        // they had taken effect.
        expect(content.props()).toMatchObject({
            avoidCollisions: true,
            collisionPadding: 99,
            sticky: "always",
        });
    });
});
