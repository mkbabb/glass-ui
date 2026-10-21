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
import { Popover, PopoverContent, PopoverTrigger } from "../../src/components/popover";
import { RadioGroup, RadioGroupItem } from "../../src/components/radio-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../src/components/select";
import ToggleGroup from "../../src/components/toggle-group/ToggleGroup.vue";
import ToggleGroupItem from "../../src/components/toggle-group/ToggleGroupItem.vue";
import { Skeleton } from "../../src/components/skeleton";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../../src/components/tooltip";

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

    // G-3 — a run of [control seat, RadioGroup seated DIRECTLY, control seat]. The group
    // root renders its own `tabindex` (reka's RovingFocusGroup), so "focusable" alone
    // does not make it a seat that is its own control.
    "seat-direct": defineComponent(() => {
        const model = ref("x");
        return () =>
            bottomDock({ collapse: false }, () => [
                h(DockControl, { "aria-label": "First", "data-witness": "seat-0" }, () => "A"),
                h(
                    RadioGroup,
                    {
                        modelValue: model.value,
                        "onUpdate:modelValue": (v: string) => (model.value = v),
                        orientation: "horizontal",
                        "aria-label": "Mode",
                        "data-witness": "seat-g",
                        style: "display:flex;gap:8px",
                    },
                    () => [
                        h(RadioGroupItem, { value: "x", "data-item": "x", "aria-label": "X" }),
                        h(RadioGroupItem, { value: "y", "data-item": "y", "aria-label": "Y" }),
                    ],
                ),
                h(DockControl, { "aria-label": "Last", "data-witness": "seat-2" }, () => "B"),
            ]);
    }),

    // O-102 (3) — a menu, a popover and a select opened from seats of a collapsible dock.
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
            h(Select, { modelValue: "a" }, () => [
                h(SelectTrigger, { "aria-label": "Speed", "data-witness": "select-trigger" }, () => h(SelectValue)),
                h(SelectContent, { side: "top" }, () => [
                    h(SelectItem, { value: "a" }, () => "1×"),
                    h(SelectItem, { value: "b" }, () => "2×"),
                ]),
            ]),
        ]),
    ),

    // O-102 (3), its boundary — a popover opened from the `#persistent` region, whose
    // trigger stays painted and live in the collapsed posture, beside one face seat.
    persistent: defineComponent(() => {
        const dock = ref<InstanceType<typeof GlassDock> | null>(null);
        w.__dock = () => dock.value;
        return () =>
            h(
                "div",
                {
                    style: "position:fixed;inset-inline:0;bottom:16px;display:flex;justify-content:center;z-index:var(--z-dock)",
                },
                h(GlassDock, { ref: dock, collapse: "open" }, {
                    persistent: () =>
                        h(Popover, () => [
                            h(DockTrigger, { for: "popover", "aria-label": "Pin", "data-witness": "p-trigger" }, () => "P"),
                            h(PopoverContent, { side: "top", "aria-label": "Pin" }, () =>
                                h("input", { "data-witness": "pinned-input", "aria-label": "Note" }),
                            ),
                        ]),
                    default: () => [h(DockControl, { "aria-label": "Play" }, () => "▶")],
                }),
            );
    }),

    // O-102 (6) — a float opened from a seat of an expanded dock, at phone and desk width.
    // `?float=` picks the primitive; each mounts with its own default portal (INBOUND
    // O-102c), except `popover-inline`, the Popover's `portal: false` opt-out.
    clip: defineComponent(() => {
        const float = params.get("float") ?? "popover";
        const panel = () => h("div", { style: "inline-size:12rem;block-size:6rem" }, "0.42 s");
        const seats: Record<string, () => unknown> = {
            tooltip: () =>
                h(TooltipProvider, () =>
                    h(Tooltip, { open: true }, () => [
                        h(TooltipTrigger, { "aria-label": "Hint" }, () => "H"),
                        h(TooltipContent, { side: "top", "data-witness": "float" }, () => "0.42 s"),
                    ]),
                ),
            popover: () =>
                h(Popover, { open: true }, () => [
                    h(DockTrigger, { for: "popover", "aria-label": "Time" }, () => "T"),
                    h(PopoverContent, { side: "top", "aria-label": "Time", "data-witness": "float" }, panel),
                ]),
            "popover-inline": () =>
                h(Popover, { open: true }, () => [
                    h(DockTrigger, { for: "popover", "aria-label": "Time" }, () => "T"),
                    h(
                        PopoverContent,
                        { side: "top", "aria-label": "Time", "data-witness": "float", portal: false },
                        panel,
                    ),
                ]),
            hovercard: () =>
                h(Popover, { open: true, trigger: "hover" }, () => [
                    h(PopoverTrigger, { "aria-label": "Preview" }, () => "V"),
                    h(PopoverContent, { side: "top", "data-witness": "float" }, panel),
                ]),
            menu: () =>
                h(DropdownMenu, { open: true, modal: false }, () => [
                    h(DockTrigger, { for: "dropdown", "aria-label": "Menu" }, () => "M"),
                    h(DropdownMenuContent, { side: "top", "data-witness": "float" }, () => [
                        h(DropdownMenuItem, () => "One"),
                        h(DropdownMenuItem, () => "Two"),
                        h(DropdownMenuSub, { open: true }, () => [
                            h(DropdownMenuSubTrigger, () => "More"),
                            h(DropdownMenuSubContent, { "data-witness": "float-sub" }, () => [
                                h(DropdownMenuItem, () => "Nested one"),
                                h(DropdownMenuItem, () => "Nested two"),
                            ]),
                        ]),
                    ]),
                ]),
            select: () =>
                h(Select, { modelValue: "a", open: true }, () => [
                    h(SelectTrigger, { "aria-label": "Speed" }, () => h(SelectValue)),
                    h(SelectContent, { side: "top", "data-witness": "float" }, () => [
                        h(SelectItem, { value: "a" }, () => "1×"),
                        h(SelectItem, { value: "b" }, () => "2×"),
                    ]),
                ]),
        };
        const seat = seats[float];
        if (!seat) throw new Error(`unknown float "${float}"`);
        return () =>
            bottomDock({ collapse: false }, () => [
                h(DockControl, { "aria-label": "Play" }, () => "▶"),
                seat(),
                h(DockControl, { "aria-label": "More" }, () => "⋯"),
            ]);
    }),

    // Skeleton shimmer — one shimmer tile, a narrow chip, and one far below the fold;
    // `?dir=rtl` mounts the same tiles right to left.
    skeleton: defineComponent(() => () =>
        h("div", { dir: params.get("dir") ?? "ltr", style: "padding:24px;min-height:4000px" }, [
            h(Skeleton, { shimmer: true, "data-witness": "shimmer", style: "block-size:48px;inline-size:480px" }),
            h(Skeleton, { "data-witness": "plain", style: "block-size:48px;inline-size:480px;margin-top:12px" }),
            h(Skeleton, { shimmer: true, "data-witness": "chip", style: "block-size:24px;inline-size:213px;margin-top:12px" }),
            h(Skeleton, { shimmer: true, "data-witness": "far", style: "block-size:48px;inline-size:480px;margin-top:3600px" }),
        ]),
    ),
};

const Scene = scenes[scene];
if (!Scene) throw new Error(`unknown scene "${scene}"`);
createApp(Scene).mount("#app");
w.__ready = true;
