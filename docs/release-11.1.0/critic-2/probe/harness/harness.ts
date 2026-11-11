// Critic 2 probe harness: cells the lane and fix witnesses do not hold. One scene per
// ?scene=. The library is imported by relative source path, so the same page runs on the
// branch and on a v11.0.0 tree.
import "./harness.css";
import { createApp, defineComponent, h, ref } from "vue";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../../src/components/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../../../../src/components/collapsible";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../../src/components/table";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "../../../../../src/components/dialog";
import { SheetContent } from "../../../../../src/components/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "../../../../../src/components/popover";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSub, DropdownMenuSubContent,
    DropdownMenuSubTrigger, DropdownMenuTrigger,
} from "../../../../../src/components/menu";

import { GlassDock, DockControl } from "../../../../../src/components/dock";
import { SegmentedTabs } from "../../../../../src/components/tabs";
import { Slider } from "../../../../../src/components/slider";
import { motionTempo } from "../../../../../src/composables/motion/core/motionTempo";

const params = new URLSearchParams(location.search);
const scene = params.get("scene") ?? "collapsible";
if (params.get("theme") === "dark") document.documentElement.classList.add("dark");
const w = window as unknown as Record<string, unknown>;

// A Collapsible whose content the consumer lays out as a grid or a flex column with a
// gap, as an 11.0.0 consumer wrote it (the demo's own story does: `class="grid gap-2"`).
// No --collapsible-gap is set.
const CollapsibleScene = defineComponent(() => {
    const layout = params.get("layout") ?? "grid";
    const style =
        layout === "grid2" ? "display: grid; grid-template-columns: 1fr 1fr; gap: 8px"
        : layout === "flex" ? "display: flex; flex-direction: column; gap: 8px"
        : layout === "row" ? "display: flex; gap: 8px"
        : layout === "block" ? ""
        : "display: grid; gap: 8px";
    return () =>
        h("div", { class: "scene" }, [
            h(Collapsible, { defaultOpen: true, "data-probe": "croot" }, () => [
                h(CollapsibleTrigger, { "data-probe": "ctrig" }, () => "More"),
                h(CollapsibleContent, { "data-probe": "content", style }, () => [
                    h("p", { "data-probe": "c1", style: "margin: 0" }, "First"),
                    h("p", { "data-probe": "c2", style: "margin: 0" }, "Second"),
                    h("p", { "data-probe": "c3", style: "margin: 0" }, "Third"),
                    h("p", { "data-probe": "c4", style: "margin: 0" }, "Fourth"),
                ]),
            ]),
        ]);
});

const ROWS = ["Neon cyberpunk gradient", "Quiet season", "Harbour at dusk", "Ochre field"];
const SelectScene = defineComponent(() => {
    const value = ref(ROWS[1]);
    return () =>
        h("div", { class: "scene", style: "padding: 80px 16px" }, [
            h(Select, { modelValue: value.value, "onUpdate:modelValue": (v: string) => (value.value = v) }, () => [
                h(SelectTrigger, { "data-probe": "trigger", style: "inline-size: 240px", "aria-label": "Preset" }, () => h(SelectValue)),
                h(SelectContent, null, () => ROWS.map((f) => h(SelectItem, { value: f, key: f, "data-probe": "row" }, () => f))),
            ]),
        ]);
});

const tableOf = (probe: string) =>
    h("div", { "data-probe": probe }, [
        h(Table, null, () => [
            h(TableHeader, null, () => h(TableRow, null, () => ["Run", "Engine", "Result"].map((c) => h(TableHead, { key: c }, () => c)))),
            h(TableBody, null, () =>
                [["1", "Chromium", "green"], ["2", "WebKit", "green"]].map((r) =>
                    h(TableRow, { key: r[0] }, () => r.map((c, i) => h(TableCell, { key: i }, () => c))),
                ),
            ),
        ]),
    ]);

// A Table inside a Dialog, a side Sheet and a Popover: the comment on the nested rule
// names a Card, a Dialog and a Sheet.
const TableHostScene = defineComponent(() => {
    const host = params.get("host") ?? "dialog";
    if (host === "popover")
        return () =>
            h("div", { class: "scene" }, [
                h(Popover, { defaultOpen: true }, () => [
                    h(PopoverTrigger, null, () => "Open"),
                    h(PopoverContent, null, () => tableOf("host-table")),
                ]),
            ]);
    return () =>
        h(Dialog, { open: true }, () => [
            h(host === "sheet" ? SheetContent : DialogContent, host === "sheet" ? { side: "right" } : null, () => [
                h(DialogTitle, null, () => "Runs"),
                h(DialogDescription, null, () => "The last two."),
                tableOf("host-table"),
            ]),
        ]);
});

// A dropdown with a submenu, opened near the inline-start edge.
const MenuScene = defineComponent(() => () =>
    h("div", { class: "scene", style: "padding: 80px 16px" }, [
        h(DropdownMenu, null, () => [
            h(DropdownMenuTrigger, { "data-probe": "mtrig" }, () => "Actions"),
            h(DropdownMenuContent, { "data-probe": "menu", align: "start" }, () => [
                h(DropdownMenuItem, null, () => "Rename the collection"),
                h(DropdownMenuSub, null, () => [
                    h(DropdownMenuSubTrigger, { "data-probe": "subtrig" }, () => "Move to another collection"),
                    h(DropdownMenuSubContent, { "data-probe": "submenu" }, () => [
                        h(DropdownMenuItem, { "data-probe": "subrow" }, () => "Field recordings, autumn"),
                        h(DropdownMenuItem, { "data-probe": "subrow" }, () => "Harbour at dusk, long takes"),
                    ]),
                ]),
            ]),
        ]),
    ]),
);

// The shared root tempo a JS spring reads at construction. window.__tempo() is that read.
const TempoScene = defineComponent(() => {
    w.__tempo = () => motionTempo();
    return () => h("div", { class: "scene" }, "tempo");
});

// A dock that hosts a SegmentedTabs strip beside a control (a filter row as a dock), and
// the same strip on the page.
const DockTabsScene = defineComponent(() => {
    const v = ref("day");
    const strip = () =>
        h(SegmentedTabs, {
            modelValue: v.value,
            "onUpdate:modelValue": (x: string) => (v.value = x),
            options: [{ label: "Day", value: "day" }, { label: "Week", value: "week" }, { label: "Month", value: "month" }],
            ariaLabel: "Range",
        });
    return () =>
        h("div", { class: "scene", style: "display: grid; gap: 32px; justify-items: start" }, [
            h("div", { "data-probe": "page-strip" }, [strip()]),
            h("div", { "data-probe": "dock-host" }, [
                h(GlassDock, { collapse: false, backdropMode: "static" }, {
                    default: () => [strip(), h(DockControl, { "aria-label": "Filter", "data-probe": "seat" }, () => "F")],
                }),
            ]),
        ]);
});

// A controlled Slider whose consumer refuses values past 60 (a scrubber that cannot seek
// past what is buffered). ?mode=clamp writes the clamped value (a new array each time);
// ?mode=reject, the default, leaves the model alone when the value is past 60.
const SliderScene = defineComponent(() => {
    const model = ref([50]);
    w.__model = () => model.value[0];
    return () =>
        h("div", { class: "scene", style: "inline-size: 300px" }, [
            h(Slider, {
                modelValue: model.value,
                "onUpdate:modelValue": (v: number[]) => {
                    if (params.get("mode") === "clamp") model.value = [Math.min(v[0], 60)];
                    else if (v[0] <= 60) model.value = v;
                },
                min: 0,
                max: 100,
                step: 10,
                "data-probe": "slider",
            }),
        ]);
});

const scenes: Record<string, ReturnType<typeof defineComponent>> = {
    collapsible: CollapsibleScene,
    select: SelectScene,
    tablehost: TableHostScene,
    menu: MenuScene,
    tempo: TempoScene,
    slider: SliderScene,
    docktabs: DockTabsScene,
};
createApp(scenes[scene] ?? CollapsibleScene).mount("#app");
requestAnimationFrame(() => requestAnimationFrame(() => (w.__ready = true)));
