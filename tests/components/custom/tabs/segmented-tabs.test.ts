import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import SegmentedTabs from "@glass/components/custom/tabs/SegmentedTabs.vue";

// AX.W53 — the unified SegmentedTabs replaced BouncyToggle/BouncyTabs/UnderlineTabs +
// ResponsiveTabs. v-model round-trip across the variant axis (segmented default = group/
// aria-pressed; underline = tablist/aria-selected), keyed off the Vue 3.5 defineModel.
const OPTIONS = [
    { label: "One", value: "one" },
    { label: "Two", value: "two" },
    { label: "Three", value: "three" },
];
const desktop = () => ({ props: { options: OPTIONS } });

describe("SegmentedTabs v-model (segmented default)", () => {
    it("emits update:modelValue when a segment is clicked", async () => {
        const wrapper = mount(SegmentedTabs, { props: { options: OPTIONS, modelValue: "one" } });
        const btns = wrapper.findAll('[role="group"] button');
        expect(btns.length).toBe(3);
        await btns[1]!.trigger("click");
        expect(wrapper.emitted("update:modelValue")?.at(-1)?.[0]).toBe("two");
    });
    it("reflects an external modelValue write in aria-pressed", async () => {
        const wrapper = mount(SegmentedTabs, { props: { options: OPTIONS, modelValue: "one" } });
        await wrapper.setProps({ modelValue: "three" });
        const btns = wrapper.findAll('[role="group"] button');
        expect(btns[2]!.attributes("aria-pressed")).toBe("true");
    });
});

describe("SegmentedTabs variant=underline (panel nav)", () => {
    it("renders a tablist and round-trips aria-selected", async () => {
        const wrapper = mount(SegmentedTabs, { props: { options: OPTIONS, modelValue: "one", variant: "underline" } });
        expect(wrapper.find('[role="tablist"]').exists()).toBe(true);
        const tabs = wrapper.findAll('[role="tab"]');
        expect(tabs.length).toBe(3);
        await tabs[1]!.trigger("click");
        expect(wrapper.emitted("update:modelValue")?.at(-1)?.[0]).toBe("two");
        await wrapper.setProps({ modelValue: "three" });
        expect(tabs[2]!.attributes("aria-selected")).toBe("true");
    });
});
