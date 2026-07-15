import { mount } from "@vue/test-utils";
import { defineComponent, h, ref } from "vue";
import { describe, expect, it, vi } from "vitest";

import { useDockPopover } from "@glass/components/dock/composables/useDockPopover";

function mountPopover() {
    const Host = defineComponent({
        setup() {
            const anchor = ref<HTMLButtonElement | null>(null);
            const surface = ref<HTMLElement | null>(null);
            const popover = useDockPopover({
                anchor: () => anchor.value,
                popover: surface,
            });

            return () =>
                h(
                    "div",
                    {
                        onFocusin: popover.onFocusIn,
                        onFocusout: popover.onFocusOut,
                        onKeydown: (event: KeyboardEvent) => {
                            if (event.key === "Escape") popover.onEscape(event);
                        },
                    },
                    [
                        h("button", {
                            ref: anchor,
                            class: "anchor",
                            "aria-expanded": popover.open.value,
                        }),
                        h(
                            "div",
                            { ref: surface, class: "surface", popover: "manual" },
                            [h("button", { class: "member" })],
                        ),
                    ],
                );
        },
    });

    const wrapper = mount(Host, { attachTo: document.body });
    const surface = wrapper.get<HTMLElement>(".surface").element;
    const showPopover = vi.fn();
    const hidePopover = vi.fn();
    surface.showPopover = showPopover;
    surface.hidePopover = hidePopover;
    return { wrapper, showPopover, hidePopover };
}

describe("useDockPopover Escape ownership", () => {
    it("restores focus without reopening the dismissed popover", async () => {
        const { wrapper, showPopover, hidePopover } = mountPopover();
        const anchor = wrapper.get<HTMLElement>(".anchor").element;
        const member = wrapper.get<HTMLElement>(".member").element;

        anchor.focus();
        await wrapper.vm.$nextTick();
        member.focus();
        const escape = new KeyboardEvent("keydown", {
            key: "Escape",
            bubbles: true,
            cancelable: true,
        });
        member.dispatchEvent(escape);
        await wrapper.vm.$nextTick();

        expect(hidePopover).toHaveBeenCalledOnce();
        expect(showPopover).toHaveBeenCalledOnce();
        expect(wrapper.get(".anchor").attributes("aria-expanded")).toBe("false");
        expect(document.activeElement).toBe(anchor);
        expect(escape.defaultPrevented).toBe(true);
    });

    it("lets the focused trigger close its own open popover", async () => {
        const { wrapper, hidePopover } = mountPopover();
        const anchor = wrapper.get<HTMLElement>(".anchor").element;

        anchor.focus();
        await wrapper.vm.$nextTick();
        anchor.dispatchEvent(
            new KeyboardEvent("keydown", {
                key: "Escape",
                bubbles: true,
                cancelable: true,
            }),
        );
        await wrapper.vm.$nextTick();

        expect(hidePopover).toHaveBeenCalledOnce();
        expect(wrapper.get(".anchor").attributes("aria-expanded")).toBe("false");
        expect(document.activeElement).toBe(anchor);
    });
});
