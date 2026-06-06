import { mount } from "@vue/test-utils";
import { defineComponent, h } from "vue";
import { describe, expect, it } from "vitest";
import MultiSelect from "../../../../src/components/ui/multi-select/MultiSelect.vue";

describe("MultiSelect", () => {
    it("renders string icons as text instead of raw HTML", () => {
        const wrapper = mount(MultiSelect, {
            props: {
                modelValue: ["alert"],
                options: [
                    {
                        value: "alert",
                        label: "Alert",
                        icon: "<svg onload=alert(1)>",
                    },
                ],
            },
        });

        expect(wrapper.find("[onload]").exists()).toBe(false);
        expect(wrapper.html()).not.toContain("<svg onload=alert(1)>");
        expect(wrapper.text()).toContain("<svg onload=alert(1)>");
    });

    // AU.W8b.5 — v-model round-trip coverage for the defineModel conversion.
    it("reflects an external modelValue write in the selected-badge display", async () => {
        const wrapper = mount(MultiSelect, {
            props: {
                modelValue: ["alpha"],
                options: [
                    { value: "alpha", label: "Alpha" },
                    { value: "beta", label: "Beta" },
                ],
            },
        });
        expect(wrapper.text()).toContain("Alpha");
        expect(wrapper.text()).not.toContain("Beta");

        await wrapper.setProps({ modelValue: ["beta"] });
        expect(wrapper.text()).toContain("Beta");
    });

    it("emits update:modelValue when a selected badge is removed", async () => {
        const wrapper = mount(MultiSelect, {
            props: {
                modelValue: ["alpha", "beta"],
                options: [
                    { value: "alpha", label: "Alpha" },
                    { value: "beta", label: "Beta" },
                ],
            },
        });
        // The trailing X button inside each selected badge calls removeOption.
        const removeButtons = wrapper.findAll(".flex.flex-wrap button");
        await removeButtons[0]!.trigger("click");
        expect(wrapper.emitted("update:modelValue")?.at(-1)?.[0]).toEqual(["beta"]);
    });

    it("mounts uncontrolled (no modelValue) without crashing — default []", () => {
        const wrapper = mount(MultiSelect, {
            props: {
                options: [{ value: "alpha", label: "Alpha" }],
            },
        });
        // Uncontrolled default is [] — no selected badges render.
        expect(wrapper.text()).not.toContain("Alpha");
        expect(wrapper.find(".flex.flex-wrap").exists()).toBe(false);
    });

    it("renders component icons without requiring an HTML string", () => {
        const Icon = defineComponent({
            setup: () => () => h("span", { "data-testid": "component-icon" }),
        });

        const wrapper = mount(MultiSelect, {
            props: {
                modelValue: ["component"],
                options: [
                    {
                        value: "component",
                        label: "Component",
                        icon: Icon,
                    },
                ],
            },
        });

        expect(wrapper.find('[data-testid="component-icon"]').exists()).toBe(true);
    });
});
