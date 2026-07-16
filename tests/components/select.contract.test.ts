import { shallowMount } from "@vue/test-utils";
import { describe, expect, expectTypeOf, it } from "vitest";

import Select, { type SelectProps } from "@glass/components/select/Select.vue";
import SelectContent from "@glass/components/select/SelectContent.vue";
import type { SelectItemProps } from "@glass/components/select/SelectItem.vue";
import SelectTrigger from "@glass/components/select/SelectTrigger.vue";
import type { SelectionValue } from "@glass/components/_shared/selection";

type SelectTriggerSize = InstanceType<typeof SelectTrigger>["$props"]["size"];

describe("Select product contract", () => {
    it("exposes a scalar selection model and the consumed trigger sizes", () => {
        expectTypeOf<SelectProps["modelValue"]>().toEqualTypeOf<
            SelectionValue | undefined
        >();
        expectTypeOf<SelectItemProps["value"]>().toEqualTypeOf<SelectionValue>();
        expectTypeOf<
            "multiple" extends keyof SelectProps ? true : false
        >().toEqualTypeOf<false>();
        expectTypeOf<SelectTriggerSize>().toEqualTypeOf<"sm" | "default" | undefined>();
    });

    it("forwards controlled and uncontrolled state through the single root", () => {
        const controlled = shallowMount(Select, {
            props: { modelValue: "alpha", open: false },
        });
        const controlledRoot = controlled.findComponent({ name: "SelectRoot" });

        expect(controlledRoot.props()).toMatchObject({
            modelValue: "alpha",
            open: false,
        });
        controlledRoot.vm.$emit("update:modelValue", "beta");
        controlledRoot.vm.$emit("update:open", true);
        expect(controlled.emitted("update:modelValue")).toEqual([["beta"]]);
        expect(controlled.emitted("update:open")).toEqual([[true]]);

        const uncontrolled = shallowMount(Select, {
            props: { defaultValue: "alpha", defaultOpen: true },
        }).findComponent({ name: "SelectRoot" });
        expect(uncontrolled.props()).toMatchObject({
            defaultValue: "alpha",
            defaultOpen: true,
        });
    });

    it("keeps SelectViewport as the sole vertical scroll owner", () => {
        const wrapper = shallowMount(SelectContent, {
            slots: { default: "options" },
            global: {
                stubs: {
                    SelectPortal: { template: "<div><slot /></div>" },
                    SelectContent: { template: "<div><slot /></div>" },
                    SelectViewport: { template: "<div><slot /></div>" },
                },
            },
        });

        const content = wrapper.get('[data-slot="select-content"]');
        const viewport = wrapper.get('[data-slot="select-viewport"]');

        expect(content.classes()).toContain("overflow-hidden");
        expect(content.classes()).not.toContain("overflow-y-auto");
        expect(viewport.classes()).toContain("max-h-[inherit]");
        expect(viewport.classes()).toContain("overflow-y-auto");
    });
});
