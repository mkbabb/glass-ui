// 10.1.1 · atlas G-2 — a menu and its submenu paint at `--z-popover`, above `--z-dock`.
//
// RED on 10.1.0: `DropdownMenuContent` and `DropdownMenuSubContent` passed no z class
// to `overlayContentAttrs`, so the menu computed `z-index: auto` and opened under the
// dock (40). The rung is now a fact of the overlay ROLE, written once by the one
// register, so no content component spells it and none can forget it.

import { mount } from "@vue/test-utils";
import { defineComponent, h, nextTick } from "vue";
import { afterEach, describe, expect, it } from "vitest";

import { overlayContentAttrs } from "@glass/components/_shared/overlay";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@glass/components/menu";

const mounted: { unmount(): void }[] = [];
afterEach(() => {
    for (const wrapper of mounted.splice(0)) wrapper.unmount();
});

describe("overlayContentAttrs — the role carries the z rung", () => {
    it.each([
        ["menu", "z-popover"],
        ["panel", "z-popover"],
        ["hint", "z-tooltip"],
    ] as const)("role=%s → %s", (role, rung) => {
        const classes = overlayContentAttrs({ role, slot: "x" }).class.split(/\s+/);
        expect(classes).toContain(rung);
    });

    it("a consumer class still merges last", () => {
        const attrs = overlayContentAttrs({ role: "menu", slot: "x", class: "z-modal" });
        expect(attrs.class.split(/\s+/)).toContain("z-modal");
        expect(attrs.class.split(/\s+/)).not.toContain("z-popover");
    });
});

describe("DropdownMenu — G-2, the menu and the submenu both take the rung", () => {
    it("an open menu and its open submenu carry z-popover", async () => {
        const Host = defineComponent(() => () =>
            h(DropdownMenu, { open: true, modal: false }, () => [
                h(DropdownMenuTrigger, {}, () => "Open"),
                h(DropdownMenuContent, {}, () => [
                    h(DropdownMenuItem, {}, () => "One"),
                    h(DropdownMenuSub, { open: true }, () => [
                        h(DropdownMenuSubTrigger, {}, () => "More"),
                        h(DropdownMenuSubContent, {}, () => [
                            h(DropdownMenuItem, {}, () => "Nested"),
                        ]),
                    ]),
                ]),
            ]),
        );
        mounted.push(
            mount(Host, { attachTo: document.body, global: { stubs: { teleport: false } } }),
        );
        for (let i = 0; i < 4; i++) await nextTick();

        const menu = document.querySelector<HTMLElement>('[data-slot="menu-content"]');
        const sub = document.querySelector<HTMLElement>('[data-slot="menu-sub-content"]');
        expect(menu).not.toBeNull();
        expect(sub).not.toBeNull();
        expect(menu!.classList.contains("z-popover")).toBe(true);
        expect(sub!.classList.contains("z-popover")).toBe(true);
    });
});
