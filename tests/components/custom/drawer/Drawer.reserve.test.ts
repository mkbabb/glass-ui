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
    it("keeps live-behind sheets below the dock without changing modal layering", async () => {
        const liveRule = styles.match(
            /\.glass-drawer\[data-mode="live-behind"\]\s*\{([^}]+)\}/,
        )?.[1];
        expect(liveRule).toContain("z-index: calc(var(--z-dock) - 1)");

        const baseRule = styles.match(/\.glass-drawer\s*\{([^}]+)\}/)?.[1];
        expect(baseRule).toContain("z-index: var(--z-modal)");

        const Harness = defineComponent({
            components: { Drawer, DrawerContent, DrawerTitle },
            template: `
                <Drawer :open="true" mode="live-behind">
                    <DrawerContent :show-overlay="false" data-layer-test>
                        <DrawerTitle>Live sheet</DrawerTitle>
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
