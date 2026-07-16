import { readFileSync } from "node:fs";
import { mount } from "@vue/test-utils";
import { defineComponent, nextTick, ref } from "vue";
import { describe, expect, it } from "vitest";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
} from "@glass/components/dialog";
import type { Placement, Surface } from "@glass/components/_shared/axes";

const placementStyles = readFileSync("src/components/dialog/placement.css", "utf8");
const presetEditor = readFileSync("demo/shell/configurator/PresetEditor.vue", "utf8");

describe("DialogContent graded sheet edge", () => {
    it("belongs only to glass across all four side placements", async () => {
        const placement = ref<Placement>("center");
        const surface = ref<Surface>("glass");
        const Harness = defineComponent({
            components: { Dialog, DialogContent, DialogDescription, DialogTitle },
            setup: () => ({ placement, surface }),
            template: `
                <Dialog :open="true">
                    <DialogContent :placement="placement" :surface="surface">
                        <DialogTitle>Material sheet</DialogTitle>
                        <DialogDescription>Graded edge fixture</DialogDescription>
                    </DialogContent>
                </Dialog>
            `,
        });
        const wrapper = mount(Harness, {
            attachTo: document.body,
            global: { stubs: { teleport: false } },
        });
        await nextTick();
        await nextTick();

        expect(document.querySelector('[data-slot="dialog-graded-edge"]')).toBeNull();

        for (const side of ["top", "right", "bottom", "left"] as const) {
            placement.value = side;
            for (const rung of ["glass", "veil", "opaque"] as const) {
                surface.value = rung;
                await nextTick();
                const edge = document.querySelector<HTMLElement>(
                    '[data-slot="dialog-graded-edge"]',
                );
                if (rung === "glass") {
                    expect(edge?.getAttribute("aria-hidden")).toBe("true");
                    expect(edge?.parentElement?.dataset.placement).toBe(side);
                } else {
                    expect(edge).toBeNull();
                }
                expect(
                    document.querySelector(
                        '[data-slot="dialog-content"] > [data-slot="dialog-content-region"]',
                    ),
                ).not.toBeNull();
            }
        }

        wrapper.unmount();
    });

    it("keeps the sampler on the plate and delegates side-sheet scrolling", async () => {
        const placement = ref<Placement>("right");
        const scroll = ref(false);
        const Harness = defineComponent({
            components: {
                Dialog,
                DialogContent,
                DialogDescription,
                DialogFooter,
                DialogTitle,
            },
            setup: () => ({ placement, scroll }),
            template: `
                <Dialog :open="true">
                    <DialogContent :placement="placement" :scroll="scroll">
                        <DialogTitle>Scrollable sheet</DialogTitle>
                        <DialogDescription>Scrollable body</DialogDescription>
                        <DialogFooter>Actions</DialogFooter>
                    </DialogContent>
                </Dialog>
            `,
        });
        const wrapper = mount(Harness, {
            attachTo: document.body,
            global: { stubs: { teleport: false } },
        });
        await nextTick();
        await nextTick();

        const plate = document.querySelector<HTMLElement>(
            '[data-slot="dialog-content"]',
        )!;
        const edge = plate.querySelector<HTMLElement>(
            ':scope > [data-slot="dialog-graded-edge"]',
        );
        const region = plate.querySelector<HTMLElement>(
            ':scope > [data-slot="dialog-content-region"]',
        );
        expect(plate.className).not.toContain("content-start");
        expect(plate.className).not.toContain("overflow-y-auto");
        expect(edge).not.toBeNull();
        expect(region?.textContent).toContain("Scrollable sheet");
        expect(region?.querySelector('[data-slot="dialog-graded-edge"]')).toBeNull();
        const footer = region?.lastElementChild as HTMLElement;
        expect(footer.className).toContain("sm:flex-row");

        scroll.value = true;
        await nextTick();
        expect(plate.getAttribute("data-scroll")).toBe("");
        expect(
            plate.querySelector(':scope > [data-slot="dialog-content-region"]'),
        ).toBe(region);

        placement.value = "left";
        await nextTick();
        expect(plate.dataset.placement).toBe("left");
        expect(
            plate.querySelector(':scope > [data-slot="dialog-content-region"]'),
        ).toBe(region);

        expect(placementStyles).toMatch(
            /\[data-slot="dialog-content-region"\][\s\S]*?align-content:\s*start/,
        );
        expect(placementStyles).toMatch(
            /\[data-scroll\][\s\S]*?\[data-slot="dialog-content-region"\][\s\S]*?overflow-y:\s*auto/,
        );
        expect(placementStyles).toMatch(
            /\[data-placement="left"\][\s\S]*?\[data-slot="dialog-content-region"\][\s\S]*?block-size:\s*100%/,
        );
        expect(placementStyles).toMatch(
            /\[data-placement="left"\][\s\S]*?\[data-placement="right"\][\s\S]*?display:\s*flex;[\s\S]*?flex-direction:\s*column;[\s\S]*?min-block-size:\s*0/,
        );

        wrapper.unmount();
    });

    it("bounds a full-height side child while top and bottom stay intrinsic", () => {
        const content = presetEditor.match(/<DialogContent[\s\S]*?>/)?.[0];
        const frame = presetEditor.match(/<div class="flex h-full flex-col">/)?.[0];
        const body = presetEditor.match(
            /<div\s+class="configurator-sheet-body[^"]*"\s*>/,
        )?.[0];
        const boundedSideRegionRule = placementStyles.match(
            /:where\(\s*\[data-slot="dialog-content"\]\[data-placement="left"\][\s\S]*?display:\s*flex;[\s\S]*?min-block-size:\s*0;\s*}/,
        )?.[0];

        expect(content).not.toContain("overflow-y-auto");
        expect(frame).toContain("h-full");
        expect(body).toContain("min-h-0");
        expect(body).toContain("overflow-y-auto");
        expect(boundedSideRegionRule).toContain('data-placement="left"');
        expect(boundedSideRegionRule).toContain('data-placement="right"');
        expect(boundedSideRegionRule).not.toContain('data-placement="top"');
        expect(boundedSideRegionRule).not.toContain('data-placement="bottom"');
    });
});
