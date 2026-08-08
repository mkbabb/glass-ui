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

    /* The `size` axis is DELETED (#83 W-CONTROL-BIT, R11): a role's corner is fixed by
     * its role, so a size rung breaks `r = 0.30 × face` at two of three stops, and
     * `--control-h-*` resolve 36/40/44 rather than the uniform 44 the axis was
     * defended with. Zero external sites passed it. What survives is the state axis,
     * and it is now the ONE grammar every member of the triad stamps. */
    it("projects invalid state through the one shared control grammar", () => {
        const wrapper = mount(Switch, {
            props: { modelValue: true, invalid: true },
        });
        const control = wrapper.get('[role="switch"]');

        expect(control.attributes()).toMatchObject({
            "aria-checked": "true",
            "aria-invalid": "true",
            "data-invalid": "true",
        });
        expect(control.attributes("data-size")).toBeUndefined();
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
