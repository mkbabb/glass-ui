// Every surface the exits witnesses close, on a busy ground. A GlassDock at the top
// seats a Select (its open state driven by `v-model:open`, as value.js's pages dropdown
// drives it) and a DropdownMenu; below it a row of triggers opens a Popover, a Tooltip,
// a Dialog, a Sheet on each side and a detented bottom Sheet; a third row holds a Toast
// trigger, a brief Toast that times out, a plain Select outside the dock, a press counter
// (the page behind a leaving sheet), a Collapsible and an Accordion; then an ExpandableContainer with an outside toggle for its open state. Imports are relative to `src/`, so the file mounts unchanged on an older tree.
import "../../demo/demo.css";
import { createApp, h, ref } from "vue";

import GlassDock from "../../src/components/dock/GlassDock.vue";
import DockControl from "../../src/components/dock/DockControl.vue";
import DockTrigger from "../../src/components/dock/DockTrigger.vue";
import Select from "../../src/components/select/Select.vue";
import SelectContent from "../../src/components/select/SelectContent.vue";
import SelectItem from "../../src/components/select/SelectItem.vue";
import SelectValue from "../../src/components/select/SelectValue.vue";
import SelectTrigger from "../../src/components/select/SelectTrigger.vue";
import DropdownMenu from "../../src/components/menu/DropdownMenu.vue";
import DropdownMenuContent from "../../src/components/menu/DropdownMenuContent.vue";
import DropdownMenuItem from "../../src/components/menu/DropdownMenuItem.vue";
import Popover from "../../src/components/popover/Popover.vue";
import PopoverContent from "../../src/components/popover/PopoverContent.vue";
import PopoverTrigger from "../../src/components/popover/PopoverTrigger.vue";
import Tooltip from "../../src/components/tooltip/Tooltip.vue";
import TooltipContent from "../../src/components/tooltip/TooltipContent.vue";
import TooltipTrigger from "../../src/components/tooltip/TooltipTrigger.vue";
import TooltipProvider from "../../src/components/tooltip/TooltipProvider.vue";
import Dialog from "../../src/components/dialog/Dialog.vue";
import DialogContent from "../../src/components/dialog/DialogContent.vue";
import DialogTitle from "../../src/components/dialog/DialogTitle.vue";
import SheetContent from "../../src/components/sheet/SheetContent.vue";
import Accordion from "../../src/components/accordion/Accordion.vue";
import AccordionItem from "../../src/components/accordion/AccordionItem.vue";
import AccordionTrigger from "../../src/components/accordion/AccordionTrigger.vue";
import AccordionContent from "../../src/components/accordion/AccordionContent.vue";
import Collapsible from "../../src/components/collapsible/Collapsible.vue";
import CollapsibleTrigger from "../../src/components/collapsible/CollapsibleTrigger.vue";
import CollapsibleContent from "../../src/components/collapsible/CollapsibleContent.vue";
import ExpandableContainer from "../../src/components/expandable-container/ExpandableContainer.vue";
import Toaster from "../../src/components/toast/Toaster.vue";
import { toast } from "../../src/components/toast/use-toast";
import { DialogTrigger } from "reka-ui";

const params = new URLSearchParams(location.search);
/* Every surface's leave-finished emit is counted here, by the surface's test id. */
const emitted: Record<string, number> = {};
(window as unknown as { __emitted: typeof emitted }).__emitted = emitted;
const onLeave = (id: string) => ({ onLeaveFinished: () => (emitted[id] = (emitted[id] ?? 0) + 1) });
if (params.get("scheme") === "dark") document.documentElement.classList.add("dark");

/* The busy ground: hard black and white bars under saturated colour, so a translucent
   plate is read against its worst neighbours rather than a flat field. */
document.body.style.cssText = [
    "margin:0",
    "min-height:100vh",
    "background:repeating-linear-gradient(90deg,#000 0 14px,#fff 14px 28px,#e11 28px 42px,#13e 42px 56px,#fd0 56px 70px)",
].join(";");

const pages = ["Picker", "Palettes", "Gradient", "Mix", "Extract"];
const view = ref("Picker");
const plain = ref("Picker");
const open = ref(false);
const rung = ref(0.5);
const presses = ref(0);
const expanded = ref(false);
const btn = "padding:10px 14px;background:#fff;color:#000;border-radius:8px;font:14px sans-serif";
const lines = Array.from({ length: 6 }, (_, i) => h("p", { style: "margin:0;padding:4px 0" }, `Line ${i + 1} of the region.`));

createApp({
    setup: () => () =>
        h("div", { style: "padding:16px 8px 900px;display:flex;flex-direction:column;align-items:center;gap:24px" }, [
            h(
                GlassDock,
                { collapse: false, "aria-label": "Exits" },
                {
                    default: () => [
                        h(DockControl, { "aria-label": "Home" }, () => "⌂"),
                        h(
                            Select,
                            {
                                modelValue: view.value,
                                open: open.value,
                                "onUpdate:open": (v: boolean) => (open.value = v),
                                "onUpdate:modelValue": (v: unknown) => (view.value = String(v)),
                            },
                            () => [
                                h(DockTrigger, { for: "select", "aria-label": "Select view", "data-testid": "x-select" }, () => [
                                    h("span", view.value),
                                    h(SelectValue, { class: "sr-only" }),
                                ]),
                                h(SelectContent, { class: "min-w-[12rem]", "data-testid": "x-select-content", ...onLeave("x-select-content") }, () =>
                                    pages.map((p) => h(SelectItem, { value: p, "data-testid": `x-opt-${p}` }, () => p)),
                                ),
                            ],
                        ),
                        h(DropdownMenu, null, () => [
                            h(DockTrigger, { for: "dropdown", "aria-label": "Actions", "data-testid": "x-menu" }, () => "⋯"),
                            h(DropdownMenuContent, { align: "center", class: "w-52", "data-testid": "x-menu-content", ...onLeave("x-menu-content") }, () =>
                                ["Copy", "Share", "Archive"].map((t) =>
                                    h(DropdownMenuItem, { "data-testid": `x-item-${t}` }, () => t),
                                ),
                            ),
                        ]),
                    ],
                },
            ),
            h("div", { style: "display:flex;flex-wrap:wrap;gap:8px;justify-content:center" }, [
                h(Popover, null, () => [
                    h(PopoverTrigger, { "data-testid": "x-popover", style: "padding:10px 14px;background:#fff;color:#000;border-radius:8px;font:14px sans-serif" }, () => "Popover"),
                    h(PopoverContent, { class: "w-56", "data-testid": "x-popover-content", ...onLeave("x-popover-content") }, () => h("p", "A popover.")),
                ]),
                h(TooltipProvider, { delayDuration: 0 }, () =>
                    ["", "2"].map((n) =>
                        h(Tooltip, { delayDuration: 0 }, {
                            default: () => [
                                h(TooltipTrigger, { "data-testid": `x-tooltip${n}`, style: btn }, () => `Tooltip${n ? " " + n : ""}`),
                                h(TooltipContent, { "data-testid": `x-tooltip${n}-content`, ...onLeave(`x-tooltip${n}-content`) }, () => `A hint${n ? " " + n : ""}`),
                            ],
                        }),
                    ),
                ),
                h(Dialog, null, () => [
                    h(DialogTrigger, { "data-testid": "x-dialog", style: "padding:10px 14px;background:#fff;color:#000;border-radius:8px;font:14px sans-serif" }, () => "Dialog"),
                    h(DialogContent, { "data-testid": "x-dialog-content", ...onLeave("x-dialog-content") }, () => [h(DialogTitle, () => "A dialog"), h("p", "Its body.")]),
                ]),
                ...(["right", "bottom", "top", "left"] as const).map((side) =>
                    h(Dialog, null, () => [
                        h(DialogTrigger, { "data-testid": `x-sheet-${side}`, style: "padding:10px 14px;background:#fff;color:#000;border-radius:8px;font:14px sans-serif" }, () => `Sheet ${side}`),
                        h(SheetContent, { side, "data-testid": `x-sheet-${side}-content`, ...onLeave(`x-sheet-${side}-content`) }, () => [h(DialogTitle, () => "A sheet"), h("p", "Its body.")]),
                    ]),
                ),
                h(Dialog, null, () => [
                    h(DialogTrigger, { "data-testid": "x-detent", style: "padding:10px 14px;background:#fff;color:#000;border-radius:8px;font:14px sans-serif" }, () => "Detented"),
                    h(
                        SheetContent,
                        {
                            side: "bottom",
                            detents: [0.5, 0.9],
                            detent: rung.value,
                            "onUpdate:detent": (v: number) => (rung.value = v),
                            "data-testid": "x-detent-content",
                        },
                        () => [h(DialogTitle, () => "A detented sheet"), h("p", "Its body.")],
                    ),
                ]),
            ]),
            h("div", { style: "display:flex;flex-wrap:wrap;gap:8px;justify-content:center" }, [
                h("button", { "data-testid": "x-toast", style: btn, onClick: () => toast({ title: "A toast", description: "Its body." }) }, "Toast"),
                h("button", { "data-testid": "x-toast-brief", style: btn, onClick: () => toast({ title: "A brief toast", duration: 1800 }) }, "Brief toast"),
                h(
                    Select,
                    { modelValue: plain.value, "onUpdate:modelValue": (v: unknown) => (plain.value = String(v)) },
                    () => [
                        h(SelectTrigger, { "data-testid": "x-plain-select", class: "w-40" }, () => h(SelectValue)),
                        h(SelectContent, { "data-testid": "x-plain-select-content" }, () =>
                            pages.map((p) => h(SelectItem, { value: p, "data-testid": `x-plain-${p}` }, () => p)),
                        ),
                    ],
                ),
                h("button", { "data-testid": "x-count", "data-presses": presses.value, style: btn, onClick: () => presses.value++ }, `Pressed ${presses.value}`),
            ]),
            h("div", { class: "glass-quiet", style: "width:min(22rem,90vw);padding:8px 16px;border-radius:16px;background:#fff;color:#000" }, [
                h(Collapsible, null, () => [
                    h(CollapsibleTrigger, { "data-testid": "x-collapsible", style: btn }, () => "Collapsible"),
                    h(CollapsibleContent, { "data-testid": "x-collapsible-content" }, () => lines),
                ]),
                h(Accordion, { type: "single", collapsible: true }, () => [
                    h(AccordionItem, { value: "a" }, () => [
                        h(AccordionTrigger, { "data-testid": "x-accordion" }, () => "Accordion"),
                        h(AccordionContent, { "data-testid": "x-accordion-content" }, () => lines),
                    ]),
                ]),
            ]),
            h("button", { "data-testid": "x-expand-toggle", style: btn, onClick: () => (expanded.value = !expanded.value) }, "Toggle fullscreen"),
            h(
                ExpandableContainer,
                {
                    open: expanded.value,
                    "onUpdate:open": (v: boolean) => (expanded.value = v),
                    "data-testid": "x-expand",
                    style: "width:min(22rem,90vw)",
                },
                () => h("div", { style: "height:180px;border-radius:16px;background:#fff;color:#000;padding:16px" }, "A figure."),
            ),
            h(Toaster),
        ]),
}).mount("#app");
document.body.dataset.ready = "1";
