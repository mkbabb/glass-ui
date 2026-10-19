// 10.1.1 · O-102 (3) — when the dock collapses, the dropdowns and popovers its seats
// opened close with it, through the dock's own API: the collapse edge on the dock
// context is the one path, and each overlay states only how it closes.
//
// RED on 10.1.0: the context published no posture, nothing listened for the collapse,
// and a menu opened from a seat stayed open over the collapsed dock.
import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it } from "vitest";
import { defineComponent, h, nextTick, ref } from "vue";

import GlassDock from "@glass/components/dock/GlassDock.vue";
import DockTrigger from "@glass/components/dock/DockTrigger.vue";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@glass/components/menu";
import { Popover, PopoverContent } from "@glass/components/popover";

const mounted: { unmount(): void }[] = [];
afterEach(() => {
    for (const wrapper of mounted.splice(0)) wrapper.unmount();
});

async function settle() {
    for (let i = 0; i < 4; i++) await nextTick();
}

function mountDock() {
    const dock = ref<InstanceType<typeof GlassDock> | null>(null);
    const menuOpen = ref(false);
    const popOpen = ref(false);
    const Host = defineComponent(() => () =>
        h(GlassDock, { ref: dock, collapse: "open" }, () => [
            h(
                DropdownMenu,
                {
                    modal: false,
                    open: menuOpen.value,
                    "onUpdate:open": (v: boolean) => (menuOpen.value = v),
                },
                () => [
                    h(DockTrigger, { for: "dropdown", "aria-label": "Menu" }, () => "M"),
                    h(DropdownMenuContent, {}, () => [h(DropdownMenuItem, {}, () => "One")]),
                ],
            ),
            h(
                Popover,
                { open: popOpen.value, "onUpdate:open": (v: boolean) => (popOpen.value = v) },
                () => [
                    h(DockTrigger, { for: "popover", "aria-label": "Pop" }, () => "P"),
                    h(PopoverContent, { "aria-label": "Pop" }, () => "panel"),
                ],
            ),
        ]),
    );
    const wrapper = mount(Host, { attachTo: document.body });
    mounted.push(wrapper);
    return { dock, menuOpen, popOpen };
}

describe("GlassDock — the collapse closes what its seats opened", () => {
    it("a dropdown opened from a seat closes on collapse()", async () => {
        const { dock, menuOpen } = mountDock();
        await settle();
        menuOpen.value = true;
        await settle();
        expect(dock.value!.expanded).toBe(true);
        expect(menuOpen.value).toBe(true);

        dock.value!.collapse();
        await settle();
        expect(menuOpen.value).toBe(false);
    });

    it("a popover opened from a seat closes on collapse()", async () => {
        const { dock, popOpen } = mountDock();
        await settle();
        popOpen.value = true;
        await settle();
        expect(popOpen.value).toBe(true);

        dock.value!.collapse();
        await settle();
        expect(popOpen.value).toBe(false);
    });

    it("an expand opens nothing back, and an open overlay on an expanded dock stays open", async () => {
        const { dock, popOpen } = mountDock();
        await settle();
        popOpen.value = true;
        await settle();
        dock.value!.expand();
        await settle();
        expect(popOpen.value).toBe(true);
        dock.value!.collapse();
        await settle();
        dock.value!.expand();
        await settle();
        expect(popOpen.value).toBe(false);
    });
});
