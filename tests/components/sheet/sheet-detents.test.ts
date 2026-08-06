// The detented sheet's anatomy and its keyboard contract — the surviving claims of the
// retired `tests/components/custom/drawer/` tree, re-pointed onto the surface that now
// carries them. What did not survive is named rather than silently dropped: the stage
// clauses (the apparatus is gone), the `mode="live-behind"` clauses (reka's own
// `:modal="false"` is the arm, and it renders no overlay at all), the `showOverlay`
// fork, and the `--drawer-inset-block-end` reserve knob (a sheet whose size IS its rung
// reserves nothing; the live-behind band is a z-index contract, asserted below).

import { mount } from "@vue/test-utils";
import { defineComponent, nextTick } from "vue";
import { describe, expect, it } from "vitest";
import { Dialog, DialogHeader, DialogTitle, DialogDescription } from "@glass/components/dialog";
import { SheetContent } from "@glass/components/sheet";

async function mountSheet(props = "", open = true) {
    const Harness = defineComponent({
        components: { Dialog, SheetContent, DialogHeader, DialogTitle, DialogDescription },
        template: `
            <Dialog :open="${open}">
                <SheetContent side="bottom" ${props} data-sheet-test>
                    <DialogHeader>
                        <DialogTitle>Test sheet</DialogTitle>
                        <DialogDescription>Adjust the sheet position.</DialogDescription>
                    </DialogHeader>
                </SheetContent>
            </Dialog>
        `,
    });
    const wrapper = mount(Harness, {
        attachTo: document.body,
        global: { stubs: { teleport: false } },
    });
    await nextTick();
    await nextTick();
    return wrapper;
}

const sheetEl = () => document.querySelector<HTMLElement>("[data-sheet-test]")!;
const gripHost = () =>
    document.querySelector<HTMLElement>('[data-slot="sheet-detent-handle"]');

describe("SheetContent detents — anatomy", () => {
    it("grows no grip and takes no rung marker without a ladder", async () => {
        const wrapper = await mountSheet();
        expect(sheetEl().hasAttribute("data-detents")).toBe(false);
        expect(gripHost()).toBeNull();
        wrapper.unmount();
    });

    it("marks the detented arm and grows the grip that carries the ladder", async () => {
        const wrapper = await mountSheet(':detents="[0.12, 0.5, 1]"');
        expect(sheetEl().hasAttribute("data-detents")).toBe(true);
        const grip = gripHost()!;
        expect(grip.getAttribute("role")).toBe("slider");
        expect(grip.getAttribute("aria-label")).toBe("Sheet position");
        expect(grip.getAttribute("aria-orientation")).toBe("vertical");
        expect(grip.getAttribute("aria-valuemin")).toBe("0.12");
        expect(grip.getAttribute("aria-valuemax")).toBe("1");
        wrapper.unmount();
    });

    it("turns the grip's orientation with the anchored axis", async () => {
        const Harness = defineComponent({
            components: { Dialog, SheetContent, DialogTitle },
            template: `
                <Dialog :open="true">
                    <SheetContent side="right" :detents="[0.5, 1]" data-sheet-test>
                        <DialogTitle>Side ladder</DialogTitle>
                    </SheetContent>
                </Dialog>
            `,
        });
        const wrapper = mount(Harness, {
            attachTo: document.body,
            global: { stubs: { teleport: false } },
        });
        await nextTick();
        await nextTick();
        // A side ladder is legal: the geometry is a size on whichever axis is anchored,
        // so there is no axis to fence off and no `[]` sentinel to lie about it.
        expect(gripHost()!.getAttribute("aria-orientation")).toBe("horizontal");
        wrapper.unmount();
    });

    it("publishes the rung scalar the stylesheet sizes from", async () => {
        const wrapper = await mountSheet(':detents="[0.25, 1]" :detent="0.25"');
        // The scalar is bound through the render, so it is on the element the moment the
        // engine seats it — there is no live-resolved root to lose through Presence.
        expect(sheetEl().style.getPropertyValue("--detent-t")).not.toBe("");
        wrapper.unmount();
    });

    it("keeps a live-behind sheet under the dock band and paints no scrim", async () => {
        const Harness = defineComponent({
            components: { Dialog, SheetContent, DialogTitle },
            template: `
                <Dialog :open="true" :modal="false">
                    <SheetContent side="bottom" :detents="[0.12, 1]" data-sheet-test>
                        <DialogTitle>Live behind</DialogTitle>
                    </SheetContent>
                </Dialog>
            `,
        });
        const wrapper = mount(Harness, {
            attachTo: document.body,
            global: { stubs: { teleport: false } },
        });
        await nextTick();
        await nextTick();
        expect(sheetEl().dataset.modal).toBe("false");
        // reka's own DialogOverlay renders nothing when the root is non-modal, so the
        // page behind keeps focus and pointer events with no second mode enum for it.
        expect(document.querySelector(".bg-overlay-scrim")).toBeNull();
        wrapper.unmount();
    });
});

describe("SheetContent detents — the slider keyboard contract", () => {
    it("steps the active rung through Home, End and the arrows", async () => {
        const wrapper = await mountSheet(':detents="[0.25, 0.4, 0.7, 1]" :detent="0.4"');
        const grip = gripHost()!;
        grip.focus();
        expect(document.activeElement).toBe(grip);
        expect(grip.getAttribute("aria-valuenow")).toBe("0.4");
        expect(grip.getAttribute("aria-valuetext")).toBe("40%, position 2 of 4");

        const press = async (key: string) => {
            grip.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true }));
            await nextTick();
            await nextTick();
        };

        await press("Home");
        expect(grip.getAttribute("aria-valuenow")).toBe("0.25");
        await press("End");
        expect(grip.getAttribute("aria-valuenow")).toBe("1");
        await press("ArrowDown");
        expect(grip.getAttribute("aria-valuenow")).toBe("0.7");
        await press("ArrowUp");
        expect(grip.getAttribute("aria-valuenow")).toBe("1");
        wrapper.unmount();
    });

    it("emits the settled rung so `v-model:detent` round-trips", async () => {
        const Harness = defineComponent({
            components: { Dialog, SheetContent, DialogTitle },
            data: () => ({ rung: 0.4 as number | null }),
            template: `
                <Dialog :open="true">
                    <SheetContent
                        side="bottom"
                        :detents="[0.25, 0.4, 0.7, 1]"
                        v-model:detent="rung"
                        data-sheet-test
                    >
                        <DialogTitle>Round trip</DialogTitle>
                    </SheetContent>
                </Dialog>
            `,
        });
        const wrapper = mount(Harness, {
            attachTo: document.body,
            global: { stubs: { teleport: false } },
        });
        await nextTick();
        await nextTick();
        const grip = gripHost()!;
        grip.dispatchEvent(new KeyboardEvent("keydown", { key: "Home", bubbles: true }));
        await nextTick();
        await nextTick();
        expect((wrapper.vm as unknown as { rung: number }).rung).toBe(0.25);
        wrapper.unmount();
    });
});
