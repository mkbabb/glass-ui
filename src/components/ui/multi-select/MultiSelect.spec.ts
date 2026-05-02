import { mount } from "@vue/test-utils";
import { defineComponent, h } from "vue";
import { describe, expect, it } from "vitest";
import MultiSelect from "./MultiSelect.vue";

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
