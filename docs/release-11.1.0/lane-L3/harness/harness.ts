// Lane L3 witness harness. One page, one scene per item, chosen by ?scene=. The same
// file runs on the branch and on a v11.0.0 tree (it imports the library by relative
// source path), so the probe reads the same DOM on both. What 11.0.0 lacks
// (`variant="bare"`, `.table-container`, the declared `reference` prop,
// `--sheet-enter-skew`) falls through and changes nothing.
import "./harness.css";
import { computed, createApp, defineComponent, h, ref } from "vue";
import { Badge } from "../../../../src/components/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../../../src/components/table";
import { Popover, PopoverContent } from "../../../../src/components/popover";
import { Dialog, DialogDescription, DialogTitle } from "../../../../src/components/dialog";
import { SheetContent } from "../../../../src/components/sheet";

const params = new URLSearchParams(location.search);
const scene = params.get("scene") ?? "badge";
if (params.get("theme") === "dark") document.documentElement.classList.add("dark");
const skew = params.get("skew");
if (skew) document.documentElement.style.setProperty("--sheet-enter-skew", `${skew}deg`);
const w = window as unknown as Record<string, unknown>;

// ── O-158 · the bare Badge in a phone-width card ────────────────────────────────────
const award = () =>
    h("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": 2, "stroke-linecap": "round", "stroke-linejoin": "round", "aria-hidden": "true", "data-probe": "glyph" }, [
        h("path", { d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" }),
        h("circle", { cx: 12, cy: 8, r: 6 }),
    ]);
const BadgeScene = defineComponent(() => () =>
    h("div", { class: "scene" }, [
        h("div", { class: "card", "data-probe": "card" }, [
            h("span", { class: "card-name" }, "Neon Cyberpunk Gradient"),
            h(Badge, { variant: "bare", class: "glyph", "data-probe": "bare" }, () => [
                award(),
                h("span", { "data-probe": "bare-label" }, "Featured"),
            ]),
            h("span", { class: "card-count" }, "12"),
        ]),
    ]),
);

// ── O-184 · rounded table containers ────────────────────────────────────────────────
const COLS = ["Station", "Line", "Riders", "Updated"];
const row = (i: number) => [`Station ${i + 1}`, `Line ${(i % 4) + 1}`, String(1200 + i * 37), `2026-11-0${(i % 9) + 1}`];
const componentTable = (probe: string, rows: number, extra = "") =>
    h("div", { class: `tbl-host ${extra}`, "data-probe": probe }, [
        h(Table, null, () => [
            h(TableHeader, null, () => [h(TableRow, null, () => COLS.map((c) => h(TableHead, null, () => c)))]),
            h(TableBody, null, () =>
                Array.from({ length: rows }, (_, i) => h(TableRow, null, () => row(i).map((v) => h(TableCell, null, () => v)))),
            ),
        ]),
    ]);
// A consumer's own plain <table>, wrapped in the container class, with a sticky header.
const plainSticky = () =>
    h("div", { class: "table-container tbl-host tbl-sticky", "data-probe": "tbl-sticky" }, [
        h("table", { style: "border-collapse: separate; border-spacing: 0; inline-size: 100%" }, [
            h("thead", null, [h("tr", null, COLS.map((c) => h("th", { style: "text-align: left; padding: 10px 12px" }, c)))]),
            h("tbody", null, Array.from({ length: 20 }, (_, i) => h("tr", null, row(i).map((v) => h("td", { style: "padding: 10px 12px" }, v))))),
        ]),
    ]);
const TableScene = defineComponent(() => () =>
    h("div", { class: "scene" }, [componentTable("tbl-component", 6), plainSticky(), componentTable("tbl-wide", 5, "tbl-wide")]),
);

// ── O-178 · a popover on a virtual point ─────────────────────────────────────────────
const PopoverScene = defineComponent(() => {
    const point = ref({ x: 160, y: 260 });
    const open = ref(true);
    let calls = 0;
    const reference = computed(() => {
        const { x, y } = point.value;
        return {
            getBoundingClientRect() {
                calls++;
                return { x, y, width: 0, height: 0, top: y, left: x, right: x, bottom: y };
            },
        };
    });
    w.__pop = {
        move(x: number, y: number) {
            point.value = { x, y };
        },
        calls: () => calls,
        isOpen: () => open.value,
    };
    return () =>
        h("div", { class: "scene" }, [
            h("div", { class: "map", "data-probe": "map" }),
            h(Popover, { open: open.value, "onUpdate:open": (v: boolean) => (open.value = v) }, () => [
                h(PopoverContent, { reference: reference.value, side: "bottom", "data-probe": "pop" }, () => "Station 12 · 4.2 km"),
            ]),
        ]);
});

// ── O-179 · the side sheet's entry shear ─────────────────────────────────────────────
const SheetScene = defineComponent(() => {
    const open = ref(false);
    w.__sheet = {
        open: () => (open.value = true),
        close: () => (open.value = false),
    };
    return () =>
        h(Dialog, { open: open.value, "onUpdate:open": (v: boolean) => (open.value = v) }, () => [
            h(SheetContent, { side: "right", class: "probe-sheet" }, () => [
                h(DialogTitle, null, () => "Filters"),
                h(DialogDescription, null, () => "Narrow the stations shown on the map."),
                h("p", { "data-probe": "sheet-body" }, "Body text that stays legible while the sheet shears in."),
            ]),
        ]);
});

const scenes: Record<string, ReturnType<typeof defineComponent>> = {
    badge: BadgeScene,
    table: TableScene,
    popover: PopoverScene,
    sheet: SheetScene,
};

createApp(scenes[scene] ?? BadgeScene).mount("#app");
requestAnimationFrame(() => requestAnimationFrame(() => (w.__ready = true)));
