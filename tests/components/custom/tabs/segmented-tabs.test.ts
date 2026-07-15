import { mount } from "@vue/test-utils";
import { defineComponent, ref } from "vue";
import { describe, expect, it } from "vitest";
import SegmentedTabs from "@glass/components/tabs/SegmentedTabs.vue";

// AX.W53 — the unified SegmentedTabs replaced BouncyToggle/BouncyTabs/UnderlineTabs +
// ResponsiveTabs. v-model round-trip across the variant axis (segmented default = group/
// aria-pressed; underline = tablist/aria-selected), keyed off the Vue 3.5 defineModel.
const OPTIONS = [
    { label: "One", value: "one" },
    { label: "Two", value: "two" },
    { label: "Three", value: "three" },
];
describe("SegmentedTabs v-model (segmented default)", () => {
    it("emits update:modelValue when a segment is clicked", async () => {
        const wrapper = mount(SegmentedTabs, { props: { options: OPTIONS, modelValue: "one" } });
        const btns = wrapper.findAll('[role="group"] button');
        expect(btns.length).toBe(3);
        await btns[1]!.trigger("click");
        expect(wrapper.emitted("update:modelValue")?.at(-1)?.[0]).toBe("two");
    });
    it("reflects an external modelValue write in aria-pressed", async () => {
        const wrapper = mount(SegmentedTabs, {
            props: { options: OPTIONS, modelValue: "one", ariaLabel: "Priority" },
        });
        await wrapper.setProps({ modelValue: "three" });
        const group = wrapper.get('[role="group"]');
        expect(group.attributes("aria-label")).toBe("Priority");
        expect(group.attributes("aria-orientation")).toBeUndefined();
        const btns = group.findAll("button");
        expect(btns[2]!.attributes("aria-pressed")).toBe("true");
    });
});

describe("SegmentedTabs variant=underline (panel nav)", () => {
    it("renders a tablist and round-trips aria-selected", async () => {
        const wrapper = mount(SegmentedTabs, {
            props: { options: OPTIONS, modelValue: "one", variant: "underline", ariaLabel: "View" },
        });
        expect(wrapper.find('[role="tablist"]').exists()).toBe(true);
        const tabs = wrapper.findAll('[role="tab"]');
        expect(tabs.length).toBe(3);
        expect(wrapper.get('[role="tablist"]').attributes("aria-orientation")).toBe("horizontal");
        expect(wrapper.get('[role="tablist"]').attributes("aria-label")).toBe("View");
        await tabs[1]!.trigger("click");
        expect(wrapper.emitted("update:modelValue")?.at(-1)?.[0]).toBe("two");
        await wrapper.setProps({ modelValue: "three" });
        expect(tabs[2]!.attributes("aria-selected")).toBe("true");
    });
});

describe("SegmentedTabs semantics=tabs with pill material", () => {
    it("keeps the pill look while exposing tab semantics and roving keyboard behavior", async () => {
        const Harness = defineComponent({
            components: { SegmentedTabs },
            setup() {
                return { options: OPTIONS, value: ref("two") };
            },
            template: `<SegmentedTabs v-model="value" :options="options" variant="pill" semantics="tabs" />`,
        });
        const wrapper = mount(Harness, { attachTo: document.body });
        const tablist = wrapper.get('[role="tablist"]');
        expect(tablist.classes()).toContain("segmented-tabs--pill");
        expect(tablist.attributes("aria-orientation")).toBe("horizontal");

        const tabs = () => wrapper.findAll('[role="tab"]');
        const expectRoving = (active: number) => {
            expect(tabs().map((tab) => tab.attributes("tabindex"))).toEqual(
                OPTIONS.map((_, index) => index === active ? "0" : "-1"),
            );
            expect(tabs().map((tab) => tab.attributes("aria-selected"))).toEqual(
                OPTIONS.map((_, index) => index === active ? "true" : "false"),
            );
        };

        expectRoving(1);
        await tablist.trigger("keydown", { key: "ArrowRight" });
        expectRoving(2);
        expect(document.activeElement).toBe(tabs()[2]!.element);

        await tablist.trigger("keydown", { key: "ArrowLeft" });
        expectRoving(1);
        await tablist.trigger("keydown", { key: "Home" });
        expectRoving(0);
        await tablist.trigger("keydown", { key: "End" });
        expectRoving(2);

        wrapper.unmount();
    });
});
