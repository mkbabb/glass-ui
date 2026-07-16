import { mount, shallowMount } from "@vue/test-utils";
import { afterEach, describe, expect, it } from "vitest";
import { defineComponent, nextTick, ref } from "vue";

import Combobox from "@glass/components/combobox/Combobox.vue";
import ComboboxAnchor from "@glass/components/combobox/ComboboxAnchor.vue";
import ComboboxGroup from "@glass/components/combobox/ComboboxGroup.vue";
import ComboboxInput from "@glass/components/combobox/ComboboxInput.vue";
import ComboboxItem from "@glass/components/combobox/ComboboxItem.vue";
import ComboboxList from "@glass/components/combobox/ComboboxList.vue";
import ComboboxTrigger from "@glass/components/combobox/ComboboxTrigger.vue";

const mounted: Array<ReturnType<typeof mount>> = [];

afterEach(() => {
    while (mounted.length) mounted.pop()?.unmount();
});

describe("Combobox product contract", () => {
    it("bounds ComboboxList and gives it vertical scroll ownership", () => {
        const wrapper = shallowMount(ComboboxList, {
            props: {
                side: "right",
                sideOffset: 8,
                align: "end",
                alignOffset: 2,
            },
            slots: { default: "options" },
            global: {
                stubs: {
                    ComboboxPortal: { template: "<div><slot /></div>" },
                    ComboboxContent: { template: "<div><slot /></div>" },
                },
            },
        });
        const list = wrapper.get('[data-slot="combobox-list"]');

        expect(list.classes()).toContain(
            "max-h-[min(24rem,var(--reka-combobox-content-available-height,60dvh))]",
        );
        expect(list.classes()).toContain("overflow-y-auto");
        expect(list.attributes("side")).toBe("right");
        expect(list.attributes("sideoffset")).toBe("8");
        expect(list.attributes("align")).toBe("end");
        expect(list.attributes("alignoffset")).toBe("2");
    });

    it("renders heading locally without forwarding it to the Reka group", () => {
        const wrapper = shallowMount(ComboboxGroup, {
            props: { heading: "Palette" },
            slots: { default: "items" },
            global: {
                stubs: {
                    ComboboxGroup: { template: "<div><slot /></div>" },
                    ComboboxLabel: { template: "<div><slot /></div>" },
                },
            },
        });
        const group = wrapper.get('[data-slot="combobox-group"]');

        expect(group.attributes("heading")).toBeUndefined();
        expect(wrapper.text()).toContain("Palette");
    });

    it("owns scalar and explicit multiple selection without duplicate state", async () => {
        const Host = defineComponent({
            components: {
                Combobox,
                ComboboxAnchor,
                ComboboxInput,
                ComboboxItem,
                ComboboxList,
            },
            setup() {
                return {
                    single: ref<string | null>(null),
                    multiple: ref<string[]>([]),
                };
            },
            template: `
                <Combobox v-model="single" :open="true">
                    <ComboboxAnchor>
                        <ComboboxInput aria-label="Single query" />
                    </ComboboxAnchor>
                    <ComboboxList>
                        <ComboboxItem value="amber" data-test-option="single">Amber</ComboboxItem>
                    </ComboboxList>
                </Combobox>
                <Combobox v-model="multiple" multiple :open="true">
                    <ComboboxAnchor>
                        <ComboboxInput aria-label="Multiple query" />
                    </ComboboxAnchor>
                    <ComboboxList>
                        <ComboboxItem value="cobalt" data-test-option="multiple">Cobalt</ComboboxItem>
                    </ComboboxList>
                </Combobox>
            `,
        });
        const wrapper = mount(Host, {
            attachTo: document.body,
            global: { stubs: { teleport: false } },
        });
        mounted.push(wrapper);
        await nextTick();

        expect(
            wrapper.find('[data-slot="combobox-input-wrapper"]').exists(),
        ).toBe(true);
        expect(wrapper.find('[data-slot="command-input"]').exists()).toBe(false);

        document
            .querySelector<HTMLElement>('[data-test-option="single"]')!
            .click();
        document
            .querySelector<HTMLElement>('[data-test-option="multiple"]')!
            .click();
        await nextTick();

        expect((wrapper.vm as unknown as { single: string }).single).toBe("amber");
        expect((wrapper.vm as unknown as { multiple: string[] }).multiple).toEqual([
            "cobalt",
        ]);
    });

    it("keeps the justified trigger host a non-submitting button", () => {
        const wrapper = mount(
            defineComponent({
                components: { Combobox, ComboboxAnchor, ComboboxTrigger },
                template: `
                    <Combobox>
                        <ComboboxAnchor>
                            <ComboboxTrigger aria-label="Open choices">Open</ComboboxTrigger>
                        </ComboboxAnchor>
                    </Combobox>
                `,
            }),
        );
        mounted.push(wrapper);

        expect(wrapper.get("button").attributes("type")).toBe("button");
    });
});
