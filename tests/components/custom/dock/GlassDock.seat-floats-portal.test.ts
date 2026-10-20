// 10.1.1 · O-102 (6) — a GUARD, not a red/green witness (green on 10.1.0 as well).
// The row closes on the consumer's own cure (fourier 976a704: the caret is glass's
// portalled Tooltip), under the owner-delegate's condition (INBOUND O-102c): every
// glass float primitive a dock seat may host portals by default, outside the run.
// This holds that condition for each of them: Tooltip, Popover, the hover arm of
// Popover (reka's HoverCard), DropdownMenu with its submenu, and the Select content.
// Each is opened from a seat with no portal prop, and its content must land outside
// the dock. A primitive that renders inline inside the run fails here.
import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it } from "vitest";
import { defineComponent, h, nextTick } from "vue";

import GlassDock from "@glass/components/dock/GlassDock.vue";
import DockTrigger from "@glass/components/dock/DockTrigger.vue";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
} from "@glass/components/menu";
import { Popover, PopoverContent, PopoverTrigger } from "@glass/components/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@glass/components/select";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@glass/components/tooltip";

const mounted: { unmount(): void }[] = [];
afterEach(() => {
    for (const wrapper of mounted.splice(0)) wrapper.unmount();
});

async function settleOpen() {
    for (let i = 0; i < 4; i++) await nextTick();
    await new Promise((resolve) => setTimeout(resolve, 30));
    for (let i = 0; i < 4; i++) await nextTick();
}

const FLOATS: [name: string, seat: () => unknown][] = [
    [
        "tooltip",
        () =>
            h(TooltipProvider, () =>
                h(Tooltip, { open: true }, () => [
                    h(TooltipTrigger, { "aria-label": "Hint" }, () => "H"),
                    h(TooltipContent, { "data-witness": "tooltip" }, () => "hint"),
                ]),
            ),
    ],
    [
        "popover",
        () =>
            h(Popover, { open: true }, () => [
                h(DockTrigger, { for: "popover", "aria-label": "Pop" }, () => "P"),
                h(PopoverContent, { "aria-label": "Pop", "data-witness": "popover" }, () => "panel"),
            ]),
    ],
    [
        "hovercard",
        () =>
            h(Popover, { open: true, trigger: "hover" }, () => [
                h(PopoverTrigger, { "aria-label": "Preview" }, () => "V"),
                h(PopoverContent, { "data-witness": "hovercard" }, () => "preview"),
            ]),
    ],
    [
        "menu",
        () =>
            h(DropdownMenu, { open: true, modal: false }, () => [
                h(DockTrigger, { for: "dropdown", "aria-label": "Menu" }, () => "M"),
                h(DropdownMenuContent, { "data-witness": "menu" }, () => [
                    h(DropdownMenuItem, () => "One"),
                    h(DropdownMenuSub, { open: true }, () => [
                        h(DropdownMenuSubTrigger, () => "More"),
                        h(DropdownMenuSubContent, { "data-witness": "submenu" }, () => [
                            h(DropdownMenuItem, () => "Nested"),
                        ]),
                    ]),
                ]),
            ]),
    ],
    [
        "select",
        () =>
            h(Select, { modelValue: "a", open: true }, () => [
                h(SelectTrigger, { "aria-label": "Pick" }, () => h(SelectValue)),
                h(SelectContent, { "data-witness": "select" }, () => [
                    h(SelectItem, { value: "a" }, () => "A"),
                    h(SelectItem, { value: "b" }, () => "B"),
                ]),
            ]),
    ],
];

describe("10.1.1 · O-102 (6) guard — every float a dock seat hosts portals out of the run by default", () => {
    for (const [name, seat] of FLOATS) {
        it(`${name} opened from a seat renders outside the dock`, async () => {
            const Host = defineComponent(() => () =>
                h(GlassDock, { collapse: false }, () => [seat()]),
            );
            const wrapper = mount(Host, {
                attachTo: document.body,
                global: { stubs: { teleport: false } },
            });
            mounted.push(wrapper);
            await settleOpen();

            const dock = wrapper.element as HTMLElement;
            const witnesses = name === "menu" ? ["menu", "submenu"] : [name];
            for (const w of witnesses) {
                const el = document.querySelector<HTMLElement>(`[data-witness="${w}"]`);
                expect(el, `${w} content mounted`).not.toBeNull();
                expect(dock.contains(el), `${w} content sits inside the dock`).toBe(false);
                expect(el!.closest(".dock-run"), `${w} content sits inside the run`).toBeNull();
            }
        });
    }
});
