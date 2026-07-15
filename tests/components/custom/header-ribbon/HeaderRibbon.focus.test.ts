import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it, vi } from "vitest";
import HeaderRibbon from "@glass/components/header-ribbon/HeaderRibbon.vue";

describe("HeaderRibbon keyboard presence", () => {
    afterEach(() => {
        vi.useRealTimers();
    });

    it("opens on focus and collapses only after focus leaves the ribbon", async () => {
        vi.useFakeTimers();
        const outside = document.createElement("button");
        document.body.appendChild(outside);
        const wrapper = mount(HeaderRibbon, {
            props: { hideTimeoutMs: 100 },
            slots: {
                anchor: '<button data-anchor type="button">Menu</button>',
                items: '<button data-item type="button">Search</button>',
            },
            attachTo: document.body,
        });
        const anchor = wrapper.find("[data-anchor]");
        const item = wrapper.find("[data-item]");
        const items = wrapper.find(".header-items-wrapper");

        expect(items.attributes("inert")).toBeDefined();
        await anchor.trigger("focusin");
        expect(items.attributes("inert")).toBeUndefined();

        await anchor.trigger("focusout", { relatedTarget: item.element });
        vi.advanceTimersByTime(100);
        expect(items.attributes("inert")).toBeUndefined();

        await item.trigger("focusout", { relatedTarget: outside });
        vi.advanceTimersByTime(100);
        await wrapper.vm.$nextTick();
        expect(items.attributes("inert")).toBeDefined();

        wrapper.unmount();
        outside.remove();
    });
});
