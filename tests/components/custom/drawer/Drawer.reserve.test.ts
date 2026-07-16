import { mount } from "@vue/test-utils";
import { defineComponent, nextTick } from "vue";
import { describe, expect, it } from "vitest";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerTitle,
} from "@glass/components/drawer";

describe("Drawer bottom reserve", () => {
    it("marks live-behind sheets without changing their public anatomy", async () => {
        const Harness = defineComponent({
            components: { Drawer, DrawerContent, DrawerDescription, DrawerTitle },
            template: `
                <Drawer :open="true" mode="live-behind">
                    <DrawerContent :show-overlay="false" data-layer-test>
                        <DrawerTitle>Live sheet</DrawerTitle>
                        <DrawerDescription>Live drawer fixture.</DrawerDescription>
                    </DrawerContent>
                </Drawer>
            `,
        });
        const wrapper = mount(Harness, {
            attachTo: document.body,
            global: { stubs: { teleport: false } },
        });
        await nextTick();
        await nextTick();

        expect(
            document.querySelector<HTMLElement>("[data-layer-test]")?.dataset.mode,
        ).toBe("live-behind");

        wrapper.unmount();
    });

    it("emits the detented bottom-sheet markers and accepts a local reserve override", async () => {
        const Harness = defineComponent({
            components: { Drawer, DrawerContent, DrawerDescription, DrawerTitle },
            template: `
                <Drawer :open="true" :modal="false" :snap-points="[0.25, 1]">
                    <DrawerContent
                        :show-overlay="false"
                        data-reserve-test
                        style="--drawer-inset-block-end: 4.5rem"
                    >
                        <DrawerTitle>Reserved sheet</DrawerTitle>
                        <DrawerDescription>Reserved drawer fixture.</DrawerDescription>
                    </DrawerContent>
                </Drawer>
            `,
        });
        const wrapper = mount(Harness, {
            attachTo: document.body,
            global: { stubs: { teleport: false } },
        });
        await nextTick();
        await nextTick();

        const sheet = document.querySelector<HTMLElement>("[data-reserve-test]");
        expect(sheet?.dataset.glassDrawerSnapPoints).toBe("true");
        expect(sheet?.dataset.glassDrawerDirection).toBe("bottom");
        expect(sheet?.style.getPropertyValue("--drawer-inset-block-end")).toBe(
            "4.5rem",
        );

        wrapper.unmount();
    });
});
