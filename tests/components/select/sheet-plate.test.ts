// Below 30rem the Select listbox rises from the viewport foot at full width (the sheet
// form) and takes the firm plate (`data-plate="firm"`: the overlay rung's glass, firmed
// toward the card); the anchored popover form above 30rem keeps the floating plate. A
// DropdownMenu a dock opened covers the page the same way below 30rem, so the register
// stamps the firm plate from the dock stamp and the width. Neither is the opaque surface
// rung, and the content carries no `surface` prop (public-contracts.test-d.ts).
import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it, vi } from "vitest";
import { defineComponent, h, nextTick, ref } from "vue";

import { GlassDock } from "@glass/components/dock";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@glass/components/menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@glass/components/select";

const mounted: { unmount(): void }[] = [];
afterEach(() => {
    for (const w of mounted.splice(0)) w.unmount();
    vi.restoreAllMocks();
});

async function settleOpen() {
    for (let i = 0; i < 4; i++) await nextTick();
    await new Promise((r) => setTimeout(r, 30));
}

function narrow(matches: boolean) {
    vi.spyOn(window, "matchMedia").mockImplementation(
        (query: string) =>
            ({
                matches: query === "(width < 30rem)" ? matches : false,
                media: query,
                onchange: null,
                addEventListener: () => {},
                removeEventListener: () => {},
                addListener: () => {},
                removeListener: () => {},
                dispatchEvent: () => false,
            }) as unknown as MediaQueryList,
    );
}

async function openSelect() {
    const open = ref(false);
    const Host = defineComponent(() => () =>
        h(Select, { modelValue: "a", open: open.value, "onUpdate:open": (v: boolean) => (open.value = v) }, () => [
            h(SelectTrigger, { "aria-label": "Pick" }, () => h(SelectValue)),
            h(SelectContent, {}, () => [
                h(SelectItem, { value: "a" }, () => "A"),
                h(SelectItem, { value: "b" }, () => "B"),
            ]),
        ]),
    );
    mounted.push(mount(Host, { attachTo: document.body, global: { stubs: { teleport: false } } }));
    await settleOpen();
    open.value = true;
    await settleOpen();
    return document.querySelector<HTMLElement>("[data-slot='select-content']");
}

describe("Select sheet form takes the firm plate", () => {
    it("below 30rem the sheet-form plate is the firm plate", async () => {
        narrow(true);
        const plate = await openSelect();
        expect(plate).not.toBeNull();
        expect(plate!.getAttribute("data-form")).toBe("sheet");
        expect(plate!.getAttribute("data-plate")).toBe("firm");
        expect(plate!.hasAttribute("data-surface")).toBe(false);
    });

    it("above 30rem the anchored plate keeps the glass rung (no surface stamp)", async () => {
        narrow(false);
        const plate = await openSelect();
        expect(plate).not.toBeNull();
        expect(plate!.hasAttribute("data-form")).toBe(false);
        expect(plate!.hasAttribute("data-plate")).toBe(false);
        expect(plate!.hasAttribute("data-surface")).toBe(false);
    });
});

async function openMenu(inDock: boolean) {
    const open = ref(false);
    const menu = () =>
        h(DropdownMenu, { open: open.value, modal: false, "onUpdate:open": (v: boolean) => (open.value = v) }, () => [
            h(DropdownMenuTrigger, { "aria-label": "More" }, () => "M"),
            h(DropdownMenuContent, {}, () => [h(DropdownMenuItem, {}, () => "One")]),
        ]);
    const Host = defineComponent(() => () =>
        h("div", null, [inDock ? h(GlassDock, null, { default: () => [menu()] }) : menu()]),
    );
    mounted.push(mount(Host, { attachTo: document.body, global: { stubs: { teleport: false } } }));
    await settleOpen();
    open.value = true;
    await settleOpen();
    return document.querySelector<HTMLElement>("[data-slot='menu-content']");
}

describe("a dock menu at sheet width takes the firm plate", () => {
    it("below 30rem a menu a dock opened is the firm plate", async () => {
        narrow(true);
        const plate = await openMenu(true);
        expect(plate).not.toBeNull();
        expect(plate!.hasAttribute("data-glass-dock-portal")).toBe(true);
        expect(plate!.getAttribute("data-plate")).toBe("firm");
        expect(plate!.hasAttribute("data-surface")).toBe(false);
    });

    it("above 30rem a dock menu keeps the glass rung", async () => {
        narrow(false);
        const plate = await openMenu(true);
        expect(plate).not.toBeNull();
        expect(plate!.hasAttribute("data-plate")).toBe(false);
    });

    it("below 30rem a menu outside a dock keeps the glass rung", async () => {
        narrow(true);
        const plate = await openMenu(false);
        expect(plate).not.toBeNull();
        expect(plate!.hasAttribute("data-plate")).toBe(false);
    });
});
