import { readFileSync } from "node:fs";
import { mount } from "@vue/test-utils";
import { defineComponent, nextTick } from "vue";
import { describe, expect, it } from "vitest";
import {
    Drawer,
    DrawerContent,
    DrawerTitle,
} from "@glass/components/drawer";

const styles = readFileSync("src/components/drawer/styles.css", "utf8");

describe("Drawer bottom reserve", () => {
    it("caps detented bottom-sheet geometry through the zero-default public token", () => {
        expect(styles).toMatch(/--drawer-inset-block-end:\s*0px\s*;/);
        const rule = styles.match(
            /\.glass-drawer\[data-glass-drawer-snap-points="true"\]\[data-glass-drawer-direction="bottom"\]\s*\{([^}]+)\}/,
        )?.[1];
        expect(rule).toContain("bottom: var(--drawer-inset-block-end)");
        expect(rule).toContain(
            "height: calc(100% - var(--drawer-inset-block-end))",
        );
        expect(rule).toContain(
            "max-height: calc(100% - var(--drawer-inset-block-end))",
        );
    });

    it("emits the detented bottom-sheet markers and accepts a local reserve override", async () => {
        const Harness = defineComponent({
            components: { Drawer, DrawerContent, DrawerTitle },
            template: `
                <Drawer :open="true" :modal="false" :snap-points="[0.25, 1]">
                    <DrawerContent
                        :show-overlay="false"
                        data-reserve-test
                        style="--drawer-inset-block-end: 4.5rem"
                    >
                        <DrawerTitle>Reserved sheet</DrawerTitle>
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
