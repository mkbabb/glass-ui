import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { shallowMount } from "@vue/test-utils";
import { describe, expect, expectTypeOf, it } from "vitest";

import Select, { type SelectProps } from "@glass/components/select/Select.vue";
import SelectContent, {
    type SelectContentProps,
} from "@glass/components/select/SelectContent.vue";
import type { SelectItemProps } from "@glass/components/select/SelectItem.vue";
import SelectScrollButton from "@glass/components/select/SelectScrollButton.vue";
import type { SelectTriggerProps } from "@glass/components/select/SelectTrigger.vue";
import type { SelectionValue } from "@glass/components/_shared/selection";

describe("Select product contract", () => {
    it("exposes a scalar selection model", () => {
        expectTypeOf<SelectProps["modelValue"]>().toEqualTypeOf<
            SelectionValue | undefined
        >();
        expectTypeOf<SelectItemProps["value"]>().toEqualTypeOf<SelectionValue>();
        // The barrel used to promise this capability had "moved to `<Combobox
        // multiple>`", a component that has never existed. The prose is struck; this
        // pin — that a Select is single-value — is real and stays.
        expectTypeOf<
            "multiple" extends keyof SelectProps ? true : false
        >().toEqualTypeOf<false>();
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
        // [BK #81 W-PICKER, 2026-08-08 — the bare `overflow-y-auto` utility this line
        // used to assert is gone: the viewport composes `.fading-scroll--y`, which IS
        // the scroll port (it declares `overflow-y: auto` in its own recipe) and is
        // also the edge-fade port, so one element owns the scroll and the feather that
        // reads it. Asserting the class alone would weaken the invariant, so the
        // recipe's declaration is read from source in the same breath.]
        expect(viewport.classes()).toContain("fading-scroll--y");
        expect(
            readFileSync(
                resolve(process.cwd(), "src/styles/utilities/base-misc.css"),
                "utf8",
            ),
            "the .fading-scroll--y recipe stopped owning the scroll",
        ).toMatch(/\.fading-scroll--y\s*\{[^}]*overflow-y:\s*auto/);
    });

    it("owns exactly ONE scroll port — the viewport, never the plate", () => {
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
        const scrollPorts = wrapper
            .findAll("*")
            .filter((el) => el.classes().some((c) => c.startsWith("fading-scroll")));
        // The root of a `.fading-scroll` composition IS the scroll port. Two of them
        // nested is a nested scrollport, which is what breaks reka's active-option
        // scrolling — the exact reason `<FadingScroll>` is composed as a class here
        // rather than mounted as a wrapper component.
        expect(new Set(scrollPorts.map((el) => el.element)).size).toBe(1);
    });

    it("deletes the two decoration axes with no alias", () => {
        expectTypeOf<
            "variant" extends keyof SelectTriggerProps ? true : false
        >().toEqualTypeOf<false>();
        expectTypeOf<
            "size" extends keyof SelectTriggerProps ? true : false
        >().toEqualTypeOf<false>();
        expectTypeOf<
            "fieldHue" extends keyof SelectContentProps ? true : false
        >().toEqualTypeOf<false>();
    });

    it("merges the two scroll buttons into one direction-keyed export", () => {
        for (const direction of ["up", "down"] as const) {
            const wrapper = shallowMount(SelectScrollButton, {
                props: { direction },
                global: {
                    stubs: {
                        SelectScrollUpButton: { template: "<div><slot /></div>" },
                        SelectScrollDownButton: { template: "<div><slot /></div>" },
                    },
                },
            });
            // 44px, the same tap-target floor `.glass-menu-row` holds for the options
            // this button sits between — it used to be a 24px sliver (`py-1`).
            expect(wrapper.classes()).toContain("min-h-11");
        }
    });
});
