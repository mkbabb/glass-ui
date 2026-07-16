import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, expectTypeOf, it } from "vitest";
import { nextTick } from "vue";

import * as AccordionSurface from "@glass/components/accordion";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
    type AccordionEmits,
    type AccordionProps,
    type AccordionSlotProps,
} from "@glass/components/accordion";

afterEach(() => {
    document.body.innerHTML = "";
});

const items = [
    { value: "alpha", label: "Alpha", content: "Alpha body" },
    { value: "beta", label: "Beta", content: "Beta body" },
    { value: "gamma", label: "Gamma", content: "Gamma body" },
];

function mountAccordion(
    type: "single" | "multiple",
    modelValue: string | string[] | undefined,
    collapsible = false,
) {
    return mount(
        {
            components: {
                Accordion,
                AccordionContent,
                AccordionItem,
                AccordionTrigger,
            },
            data: () => ({ collapsible, items, type, value: modelValue }),
            template: `
      <Accordion v-model="value" :type="type" :collapsible="collapsible">
        <AccordionItem
          v-for="item in items"
          :key="item.value"
          :value="item.value"
          :disabled="item.value === 'gamma'"
        >
          <AccordionTrigger>{{ item.label }}</AccordionTrigger>
          <AccordionContent force-mount>{{ item.content }}</AccordionContent>
        </AccordionItem>
      </Accordion>
    `,
        },
        { attachTo: document.body },
    );
}

describe("Accordion product contract", () => {
    it("correlates mode with prop, emit, and slot value shapes", () => {
        expectTypeOf<AccordionProps<"single">["modelValue"]>().toEqualTypeOf<
            string | undefined
        >();
        expectTypeOf<AccordionProps<"multiple">["modelValue"]>().toEqualTypeOf<
            string[] | undefined
        >();
        expectTypeOf<AccordionEmits<"single">["update:modelValue"][0]>().toEqualTypeOf<
            string | undefined
        >();
        expectTypeOf<
            AccordionEmits<"multiple">["update:modelValue"][0]
        >().toEqualTypeOf<string[]>();
        expectTypeOf<AccordionSlotProps<"multiple">["modelValue"]>().toEqualTypeOf<
            string[]
        >();
    });

    it("rejects scalar/array mode mismatches before state reaches Reka", () => {
        expect(() =>
            mount(Accordion, {
                props: { type: "single", modelValue: ["alpha"] } as never,
            }),
        ).toThrow('Accordion type="single" received an invalid modelValue');
        expect(() =>
            mount(Accordion, {
                props: { type: "multiple", modelValue: "alpha" } as never,
            }),
        ).toThrow('Accordion type="multiple" received an invalid modelValue');
    });

    it("publishes only the four disclosure owners", () => {
        expect(Object.keys(AccordionSurface).sort()).toEqual([
            "Accordion",
            "AccordionContent",
            "AccordionItem",
            "AccordionTrigger",
        ]);
    });

    it("links each heading trigger to one region and enforces controlled single policy", async () => {
        const wrapper = mountAccordion("single", "alpha", true);
        const triggers = wrapper.findAll('[data-slot="accordion-trigger"]');
        const contents = wrapper.findAll('[data-slot="accordion-content"]');

        expect(wrapper.findAll("h3")).toHaveLength(3);
        expect(triggers[0]!.attributes("aria-controls")).toBe(
            contents[0]!.attributes("id"),
        );
        expect(contents[0]!.attributes("aria-labelledby")).toBe(
            triggers[0]!.attributes("id"),
        );
        expect(contents[0]!.attributes("role")).toBe("region");
        expect(triggers.map((trigger) => trigger.attributes("aria-expanded"))).toEqual([
            "true",
            "false",
            "false",
        ]);

        await triggers[1]!.trigger("click");
        await nextTick();

        expect((wrapper.vm as unknown as { value?: string }).value).toBe("beta");
        expect(triggers.map((trigger) => trigger.attributes("aria-expanded"))).toEqual([
            "false",
            "true",
            "false",
        ]);

        await triggers[1]!.trigger("click");
        expect((wrapper.vm as unknown as { value?: string }).value).toBeUndefined();

        wrapper.unmount();
    });

    it("allows independent controlled values in multiple mode", async () => {
        const wrapper = mountAccordion("multiple", ["alpha"]);
        const triggers = wrapper.findAll('[data-slot="accordion-trigger"]');

        await triggers[1]!.trigger("click");
        await nextTick();

        expect((wrapper.vm as unknown as { value: string[] }).value).toEqual([
            "alpha",
            "beta",
        ]);
        expect(
            triggers.slice(0, 2).map((trigger) => trigger.attributes("aria-expanded")),
        ).toEqual(["true", "true"]);

        wrapper.unmount();
    });

    it("keeps disabled items inert", async () => {
        const wrapper = mountAccordion("single", "alpha", true);
        const trigger = wrapper.findAll('[data-slot="accordion-trigger"]')[2]!;

        expect(trigger.attributes("disabled")).toBeDefined();
        expect(trigger.attributes("aria-disabled")).toBe("true");
        await trigger.trigger("click");

        expect((wrapper.vm as unknown as { value?: string }).value).toBe("alpha");

        wrapper.unmount();
    });

    it("moves focus through enabled triggers with the accordion keyboard model", async () => {
        const wrapper = mountAccordion("single", "alpha", true);
        const triggers = wrapper.findAll('[data-slot="accordion-trigger"]');

        (triggers[0]!.element as HTMLElement).focus();
        await triggers[0]!.trigger("keydown", { key: "ArrowDown" });
        await nextTick();
        expect(document.activeElement).toBe(triggers[1]!.element);

        await triggers[1]!.trigger("keydown", { key: "Home" });
        await nextTick();
        expect(document.activeElement).toBe(triggers[0]!.element);

        wrapper.unmount();
    });

    it("pins the heading-button-region structure when retired vendor attrs are supplied", () => {
        const wrapper = mount({
            components: {
                Accordion,
                AccordionContent,
                AccordionItem,
                AccordionTrigger,
            },
            data: () => ({
                contentAttrs: { as: "section", asChild: true },
                itemAttrs: { as: "article", asChild: true, unmountOnHide: false },
                rootAttrs: {
                    as: "nav",
                    asChild: true,
                    dir: "rtl",
                    orientation: "horizontal",
                    unmountOnHide: false,
                },
                triggerAttrs: { as: "a", asChild: true },
            }),
            template: `
        <Accordion v-bind="rootAttrs" type="single" default-value="alpha">
          <AccordionItem v-bind="itemAttrs" value="alpha">
            <AccordionTrigger v-bind="triggerAttrs">Alpha</AccordionTrigger>
            <AccordionContent v-bind="contentAttrs" force-mount>
              <span class="body">Alpha body</span>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      `,
        });

        const root = wrapper.get('[data-slot="accordion"]');
        const item = wrapper.get('[data-slot="accordion-item"]');
        const trigger = wrapper.get('[data-slot="accordion-trigger"]');
        const content = wrapper.get('[data-slot="accordion-content"]');

        expect(root.element.tagName).toBe("DIV");
        expect(item.element.tagName).toBe("DIV");
        expect(item.attributes("data-orientation")).toBe("vertical");
        expect(trigger.element.tagName).toBe("BUTTON");
        expect(trigger.element.parentElement?.tagName).toBe("H3");
        expect(content.element.tagName).toBe("DIV");
        expect(content.get(".disclosure-content-body").element.parentElement).toBe(
            content.element,
        );
    });
});
