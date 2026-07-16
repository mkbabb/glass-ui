import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { describe, expect, expectTypeOf, it } from "vitest";

import {
    ToggleGroup,
    ToggleGroupItem,
    type ToggleGroupEmits,
    type ToggleGroupProps,
    type ToggleGroupSlotProps,
} from "@glass/components/toggle-group";
import type { SelectionValue } from "@glass/components/_shared/selection";

type GroupType = "single" | "multiple";

function mountGroup(
    type: GroupType,
    modelValue: string | string[],
    props: Record<string, unknown> = {},
) {
    return mount(ToggleGroup, {
        props: { type, modelValue, ...props },
        slots: {
            default: `
                <ToggleGroupItem value="one">One</ToggleGroupItem>
                <ToggleGroupItem value="two">Two</ToggleGroupItem>
                <ToggleGroupItem value="three">Three</ToggleGroupItem>
            `,
        },
        global: { components: { ToggleGroupItem } },
        attachTo: document.body,
    });
}

describe("ToggleGroup", () => {
    it("correlates mode with prop, emit, and slot value shapes", () => {
        expectTypeOf<ToggleGroupProps<"single">["modelValue"]>().toEqualTypeOf<
            SelectionValue | undefined
        >();
        expectTypeOf<ToggleGroupProps<"multiple">["modelValue"]>().toEqualTypeOf<
            SelectionValue[] | undefined
        >();
        expectTypeOf<
            ToggleGroupEmits<"single">["update:modelValue"][0]
        >().toEqualTypeOf<SelectionValue | undefined>();
        expectTypeOf<
            ToggleGroupEmits<"multiple">["update:modelValue"][0]
        >().toEqualTypeOf<SelectionValue[]>();
        expectTypeOf<ToggleGroupSlotProps<"multiple">["modelValue"]>().toEqualTypeOf<
            SelectionValue[]
        >();
    });

    it("rejects scalar/array mode mismatches before state reaches Reka", () => {
        expect(() =>
            mount(ToggleGroup, {
                props: { type: "single", modelValue: ["one"] } as never,
            }),
        ).toThrow('ToggleGroup type="single" received an invalid modelValue');
        expect(() =>
            mount(ToggleGroup, {
                props: { type: "multiple", modelValue: "one" } as never,
            }),
        ).toThrow('ToggleGroup type="multiple" received an invalid modelValue');
    });

    it("projects group-owned visual axes while preserving consumer sizing classes", () => {
        const wrapper = mount(ToggleGroup, {
            props: {
                type: "single",
                modelValue: "one",
                variant: "outline",
                size: "sm",
                class: "consumer-strip",
            },
            slots: {
                default:
                    '<ToggleGroupItem value="one" variant="default" size="lg">One</ToggleGroupItem>',
            },
            global: { components: { ToggleGroupItem } },
        });
        const group = wrapper.get('[data-slot="toggle-group"]');
        const item = wrapper.get('[data-slot="toggle-group-item"]');

        expect(group.classes()).toEqual(
            expect.arrayContaining(["toggle-group", "consumer-strip"]),
        );
        expect(group.attributes()).toMatchObject({
            "data-type": "single",
            "data-variant": "outline",
            "data-size": "sm",
        });
        expect(item.attributes()).toMatchObject({
            "data-variant": "outline",
            "data-size": "sm",
        });
    });

    it.each([
        ["single", "one", ["true", "false", "false"]],
        ["multiple", ["one", "three"], ["true", "false", "true"]],
    ] as const)(
        "keeps Reka aria-pressed semantics in %s mode",
        (type, value, states) => {
            const wrapper = mountGroup(
                type,
                typeof value === "string" ? value : [...value],
            );
            const items = wrapper.findAll("button");

            expect(wrapper.get('[data-slot="toggle-group"]').attributes("role")).toBe(
                "group",
            );
            expect(wrapper.find('[role="radio"], [aria-checked]').exists()).toBe(false);
            expect(items.map((item) => item.attributes("aria-pressed"))).toEqual(
                states,
            );
            wrapper.unmount();
        },
    );

    it("moves roving focus without changing pressed state", async () => {
        const wrapper = mountGroup("single", "one");
        const items = wrapper.findAll("button");

        await nextTick();
        items[0]!.element.focus();
        await items[0]!.trigger("keydown", { key: "ArrowRight" });
        await nextTick();
        await nextTick();

        expect(document.activeElement).toBe(items[1]!.element);
        expect(items.map((item) => item.attributes("aria-pressed"))).toEqual([
            "true",
            "false",
            "false",
        ]);
        wrapper.unmount();
    });

    it("keeps vertical orientation and disabled state on Reka's semantic path", () => {
        const wrapper = mountGroup("multiple", [], {
            orientation: "vertical",
            disabled: true,
        });

        expect(
            wrapper.get('[data-slot="toggle-group"]').attributes("data-orientation"),
        ).toBe("vertical");
        expect(
            wrapper
                .findAll("button")
                .every((item) => item.attributes("disabled") !== undefined),
        ).toBe(true);
        wrapper.unmount();
    });

    it("pins each item to a button while forwarding ordinary host attributes", () => {
        const wrapper = mount({
            components: { ToggleGroup, ToggleGroupItem },
            data: () => ({
                itemAttrs: {
                    as: "a",
                    "aria-label": "Choose one",
                },
            }),
            template: `
                <ToggleGroup type="single" default-value="one">
                    <ToggleGroupItem v-bind="itemAttrs" value="one">One</ToggleGroupItem>
                </ToggleGroup>
            `,
        });
        const item = wrapper.get('[data-slot="toggle-group-item"]');

        expect(item.element.tagName).toBe("BUTTON");
        expect(item.attributes("aria-label")).toBe("Choose one");
    });
});
