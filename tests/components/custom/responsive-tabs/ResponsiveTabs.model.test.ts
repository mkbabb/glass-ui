import { mount } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ResponsiveTabs from "../../../../src/components/custom/responsive-tabs/ResponsiveTabs.vue";

// AU.W8b.5 — v-model round-trip coverage for the defineModel conversion. The
// one model drives BOTH the desktop UnderlineTabs and the mobile Select; this
// asserts the desktop path (matchMedia stubbed to desktop) round-trips.

const OPTIONS = [
    { label: "One", value: "one" },
    { label: "Two", value: "two" },
    { label: "Three", value: "three" },
];

function stubMatchMedia(matches: boolean) {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
        matches,
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })) as unknown as typeof window.matchMedia;
}

describe("ResponsiveTabs defineModel round-trip (desktop)", () => {
    beforeEach(() => stubMatchMedia(true));
    afterEach(() => vi.restoreAllMocks());

    it("emits update:modelValue when a desktop tab is clicked", async () => {
        const wrapper = mount(ResponsiveTabs, {
            props: { options: OPTIONS, modelValue: "one" },
        });
        await wrapper.vm.$nextTick();
        const tabs = wrapper.findAll("button.underline-tab");
        expect(tabs.length).toBe(3);
        await tabs[1]!.trigger("click");
        expect(wrapper.emitted("update:modelValue")?.at(-1)?.[0]).toBe("two");
    });

    it("reflects an external modelValue write in the desktop active tab", async () => {
        const wrapper = mount(ResponsiveTabs, {
            props: { options: OPTIONS, modelValue: "one" },
        });
        await wrapper.vm.$nextTick();
        await wrapper.setProps({ modelValue: "three" });
        const tabs = wrapper.findAll("button.underline-tab");
        expect(tabs[2]!.attributes("aria-selected")).toBe("true");
    });
});
