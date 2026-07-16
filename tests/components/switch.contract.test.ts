import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { Switch } from "@glass/components/switch";

describe("Switch", () => {
    it("exposes switch state and updates its binary model", async () => {
        const wrapper = mount(Switch, {
            props: { modelValue: false },
        });
        const control = wrapper.get('[role="switch"]');

        expect(control.attributes("aria-checked")).toBe("false");
        await control.trigger("click");
        expect(wrapper.emitted("update:modelValue")).toEqual([[true]]);
    });

    it("projects semantic size and invalid state", () => {
        const wrapper = mount(Switch, {
            props: { modelValue: true, size: "lg", invalid: true },
        });
        const control = wrapper.get('[role="switch"]');

        expect(control.attributes()).toMatchObject({
            "aria-checked": "true",
            "aria-invalid": "true",
            "data-invalid": "true",
            "data-size": "lg",
        });
    });

    it("does not update while disabled", async () => {
        const wrapper = mount(Switch, {
            props: { modelValue: false, disabled: true },
        });
        const control = wrapper.get('[role="switch"]');

        expect(control.attributes("disabled")).toBeDefined();
        await control.trigger("click");
        expect(wrapper.emitted("update:modelValue")).toBeUndefined();
    });

    it("participates in native form submission", () => {
        const wrapper = mount({
            components: { Switch },
            template:
                '<form><Switch name="alerts" value="yes" :model-value="true" /></form>',
        });
        const form = wrapper.get("form").element as HTMLFormElement;

        expect(new FormData(form).get("alerts")).toBe("yes");
    });
});
