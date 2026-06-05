import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import BouncyTabs from "../BouncyTabs.vue";
import UnderlineTabs from "../UnderlineTabs.vue";
import BouncyToggle from "../BouncyToggle.vue";

// AU.W8b.5 — v-model round-trip coverage for the three tabs SFCs converted to
// Vue 3.5 `defineModel`. The binding-verification discipline (MEMORY note:
// stale reka/inner bindings silently no-op under vue-tsc) requires asserting
// RENDERED behavior: a click on an inner button must emit `update:modelValue`
// AND a parent `modelValue` write must update what renders as active.

const OPTIONS = [
    { label: "One", value: "one" },
    { label: "Two", value: "two" },
    { label: "Three", value: "three" },
];

describe("BouncyToggle defineModel round-trip (single-select)", () => {
    it("emits update:modelValue when a button is clicked", async () => {
        const wrapper = mount(BouncyToggle, {
            props: { options: OPTIONS, modelValue: "one" },
        });
        const buttons = wrapper.findAll("button.bouncy-btn");
        await buttons[1]!.trigger("click");
        expect(wrapper.emitted("update:modelValue")?.at(-1)?.[0]).toBe("two");
    });

    it("reflects an external modelValue write in aria-pressed", async () => {
        const wrapper = mount(BouncyToggle, {
            props: { options: OPTIONS, modelValue: "one" },
        });
        await wrapper.setProps({ modelValue: "three" });
        const buttons = wrapper.findAll("button.bouncy-btn");
        expect(buttons[2]!.attributes("aria-pressed")).toBe("true");
        expect(buttons[0]!.attributes("aria-pressed")).toBe("false");
    });
});

describe("BouncyTabs defineModel round-trip", () => {
    it("emits update:modelValue forwarded from the inner toggle", async () => {
        const wrapper = mount(BouncyTabs, {
            props: { options: OPTIONS, modelValue: "one" },
        });
        const buttons = wrapper.findAll("button.bouncy-btn");
        await buttons[1]!.trigger("click");
        expect(wrapper.emitted("update:modelValue")?.at(-1)?.[0]).toBe("two");
    });

    it("forwards an external modelValue write to the inner toggle", async () => {
        const wrapper = mount(BouncyTabs, {
            props: { options: OPTIONS, modelValue: "one" },
        });
        await wrapper.setProps({ modelValue: "two" });
        const buttons = wrapper.findAll("button.bouncy-btn");
        expect(buttons[1]!.attributes("aria-pressed")).toBe("true");
    });
});

describe("UnderlineTabs defineModel round-trip", () => {
    it("emits update:modelValue when a tab is clicked", async () => {
        const wrapper = mount(UnderlineTabs, {
            props: { options: OPTIONS, modelValue: "one" },
        });
        const tabs = wrapper.findAll("button.underline-tab");
        await tabs[2]!.trigger("click");
        expect(wrapper.emitted("update:modelValue")?.at(-1)?.[0]).toBe("three");
    });

    it("reflects an external modelValue write in aria-selected", async () => {
        const wrapper = mount(UnderlineTabs, {
            props: { options: OPTIONS, modelValue: "one" },
        });
        await wrapper.setProps({ modelValue: "two" });
        const tabs = wrapper.findAll("button.underline-tab");
        expect(tabs[1]!.attributes("aria-selected")).toBe("true");
        expect(tabs[0]!.attributes("aria-selected")).toBe("false");
    });
});
