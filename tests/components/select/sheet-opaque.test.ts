// U/B7b M1 · D-6 — a sheet hides the page. Below 30rem the Select listbox rises from the
// viewport foot at full width (the sheet form); it must take the opaque rung of the surface
// axis (`data-surface="opaque"`: the solid `--card` plate, no backdrop), or the page behind
// it reads through the rows. The anchored popover form above 30rem keeps the glass rung.
// A DropdownMenu a dock opened is the same sheet below 30rem (the atlas dock's More on a
// phone), so the register stamps the opaque rung from the dock stamp and the width. The
// content carries no `surface` prop (BK #66, public-contracts.test-d.ts).
//
// RED on u/b7-glass 1dc80a3d6: the sheet form stamped no surface. RED on d44311a30: a dock
// menu below 30rem stamped no surface unless the consumer passed a re-minted `surface` prop.
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

describe("Select sheet form takes the opaque rung (D-6)", () => {
    it("below 30rem the sheet-form plate is data-surface=opaque", async () => {
        narrow(true);
        const plate = await openSelect();
        expect(plate).not.toBeNull();
        expect(plate!.getAttribute("data-form")).toBe("sheet");
        expect(plate!.getAttribute("data-surface")).toBe("opaque");
    });

    it("above 30rem the anchored plate keeps the glass rung (no surface stamp)", async () => {
        narrow(false);
        const plate = await openSelect();
        expect(plate).not.toBeNull();
        expect(plate!.hasAttribute("data-form")).toBe(false);
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

describe("a dock menu at sheet width takes the opaque rung", () => {
    it("below 30rem a menu a dock opened is data-surface=opaque", async () => {
        narrow(true);
        const plate = await openMenu(true);
        expect(plate).not.toBeNull();
        expect(plate!.hasAttribute("data-glass-dock-portal")).toBe(true);
        expect(plate!.getAttribute("data-surface")).toBe("opaque");
    });

    it("above 30rem a dock menu keeps the glass rung", async () => {
        narrow(false);
        const plate = await openMenu(true);
        expect(plate).not.toBeNull();
        expect(plate!.hasAttribute("data-surface")).toBe(false);
    });

    it("below 30rem a menu outside a dock keeps the glass rung", async () => {
        narrow(true);
        const plate = await openMenu(false);
        expect(plate).not.toBeNull();
        expect(plate!.hasAttribute("data-surface")).toBe(false);
    });
});
