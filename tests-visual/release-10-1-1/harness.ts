// glass-ui 10.1.1 — the engine witnesses' harness. One page, one scene per `?scene=`,
// the real library components from `src/` under the demo's own cascade
// (`demo/demo.css` compiles `src/styles` with Tailwind, as a consumer's build does).
// Imports are relative to `src/`, so the same file mounts unchanged on a 10.1.0 tree:
// that is how each witness is shown RED on 10.1.0 and GREEN on 10.1.1.
import "../../demo/demo.css";
import { createApp, defineComponent, h, ref, type Component } from "vue";

import GlassDock from "../../src/components/dock/GlassDock.vue";
import DockControl from "../../src/components/dock/DockControl.vue";
import DockTrigger from "../../src/components/dock/DockTrigger.vue";
import { Dialog, DialogDescription, DialogTitle } from "../../src/components/dialog";
import { SheetContent } from "../../src/components/sheet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "../../src/components/menu";
import { Popover, PopoverContent } from "../../src/components/popover";
import ToggleGroup from "../../src/components/toggle-group/ToggleGroup.vue";
import ToggleGroupItem from "../../src/components/toggle-group/ToggleGroupItem.vue";
import { Skeleton } from "../../src/components/skeleton";

const params = new URLSearchParams(location.search);
const scene = params.get("scene") ?? "";
const w = window as unknown as Record<string, unknown>;

/** A dock pinned to the bottom of the viewport, the way consumers seat one. */
function bottomDock(props: Record<string, unknown>, seats: () => unknown[]) {
    const dock = ref<InstanceType<typeof GlassDock> | null>(null);
    w.__dock = () => dock.value;
    return h(
        "div",
        {
            style: "position:fixed;inset-inline:0;bottom:16px;display:flex;justify-content:center;z-index:var(--z-dock)",
        },
        h(GlassDock, { ref: dock, ...props }, seats),
    );
}

const scenes: Record<string, Component> = {
    // G-1 — an open sheet on a page taller than the viewport.
    sheet: defineComponent(() => () =>
        h("div", { style: "min-height:3000px" }, [
            h("p", "page"),
            h(Dialog, { open: true }, () =>
                h(SheetContent, { side: "right", "data-witness": "sheet" }, () => [
                    h(DialogTitle, () => "Sheet"),
                    h(DialogDescription, () => "The witness sheet."),
                ]),
            ),
        ]),
    ),

    // G-2 — a menu and its submenu opened under a bar at the dock's rung.
    menu: defineComponent(() => () =>
        h("div", [
            h("div", {
                "data-witness": "dock-bar",
                style: "position:fixed;inset:0;z-index:var(--z-dock);background:rgb(0 0 0 / 0.04)",
            }),
            h(DropdownMenu, { open: true, modal: false }, () => [
                h(DropdownMenuTrigger, { style: "margin:40px" }, () => "Open"),
                h(DropdownMenuContent, { "data-witness": "menu", align: "start" }, () => [
                    h(DropdownMenuItem, () => "One"),
                    h(DropdownMenuItem, () => "Two"),
                    h(DropdownMenuSub, { open: true }, () => [
                        h(DropdownMenuSubTrigger, () => "More"),
                        h(DropdownMenuSubContent, { "data-witness": "submenu" }, () => [
                            h(DropdownMenuItem, () => "Nested one"),
                            h(DropdownMenuItem, () => "Nested two"),
                        ]),
                    ]),
                ]),
            ]),
        ]),
    ),

    // G-3 — a run of [control seat, container seat holding a ToggleGroup, control seat].
    seat: defineComponent(() => {
        const model = ref("x");
        return () =>
            bottomDock({ collapse: false }, () => [
                h(DockControl, { "aria-label": "First", "data-witness": "seat-0" }, () => "A"),
                h("div", { "data-witness": "seat-c", style: "display:flex;gap:4px" }, [
                    h(
                        ToggleGroup,
                        {
                            type: "single",
                            modelValue: model.value,
                            "onUpdate:modelValue": (v: string) => (model.value = v),
                            "aria-label": "Mode",
                        },
                        () => [
                            h(ToggleGroupItem, { value: "x", "data-item": "x" }, () => "X"),
                            h(ToggleGroupItem, { value: "y", "data-item": "y" }, () => "Y"),
                        ],
                    ),
                ]),
                h(DockControl, { "aria-label": "Last", "data-witness": "seat-2" }, () => "B"),
            ]);
    }),

    // O-102 (3) — a menu and a popover opened from seats of a collapsible dock.
    collapse: defineComponent(() => () =>
        bottomDock({ collapse: "open" }, () => [
            h(DropdownMenu, { modal: false }, () => [
                h(DockTrigger, { for: "dropdown", "aria-label": "Menu", "data-witness": "menu-trigger" }, () => "M"),
                h(DropdownMenuContent, { side: "top" }, () => [
                    h(DropdownMenuItem, () => "One"),
                    h(DropdownMenuItem, () => "Two"),
                ]),
            ]),
            h(Popover, () => [
                h(DockTrigger, { for: "popover", "aria-label": "Time", "data-witness": "pop-trigger" }, () => "P"),
                h(PopoverContent, { side: "top", "aria-label": "Time" }, () => "0.42 s"),
            ]),
        ]),
    ),

    // O-102 (6) — a popover opened from a seat of an expanded dock, at phone and desk width.
    clip: defineComponent(() => () =>
        bottomDock({ collapse: false }, () => [
            h(DockControl, { "aria-label": "Play" }, () => "▶"),
            h(Popover, () => [
                h(DockTrigger, { for: "popover", "aria-label": "Time", "data-witness": "pop-trigger" }, () => "T"),
                h(
                    PopoverContent,
                    { side: "top", "aria-label": "Time", "data-witness": "pop", portal: params.get("portal") !== "0" },
                    () => h("div", { style: "inline-size:12rem;block-size:6rem" }, "0.42 s"),
                ),
            ]),
            h(DockControl, { "aria-label": "More" }, () => "⋯"),
        ]),
    ),

    // Skeleton shimmer — one shimmer tile, and one far below the fold.
    skeleton: defineComponent(() => () =>
        h("div", { style: "padding:24px;min-height:4000px" }, [
            h(Skeleton, { shimmer: true, "data-witness": "shimmer", style: "block-size:48px;inline-size:480px" }),
            h(Skeleton, { "data-witness": "plain", style: "block-size:48px;inline-size:480px;margin-top:12px" }),
            h(Skeleton, { shimmer: true, "data-witness": "far", style: "block-size:48px;inline-size:480px;margin-top:3600px" }),
        ]),
    ),
};

const Scene = scenes[scene];
if (!Scene) throw new Error(`unknown scene "${scene}"`);
createApp(Scene).mount("#app");
w.__ready = true;
