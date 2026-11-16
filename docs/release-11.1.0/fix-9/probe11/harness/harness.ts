// Critic 8 probe harness. A navigation dock (tab or glyph controls, one marked current)
// in the places a consumer puts one that are not the page at rest:
//   wrap     inside a wrapper: ?z=<n> (CSS zoom), ?sc=<n> (a static transform: scale),
//            ?grow=1 (the wrapper grows in from scale(0.8) as it mounts, 500 ms)
//   dialog   inside the library's Dialog, opened by window.__open() (the plate blooms in)
//   tdialog  a Table inside the library's Dialog (the nested-table rule)
//   dynslot  a collapse="closed" dock with a #persistent control whose #collapsed slot
//            comes (window.__slot(true)) or goes (?slot0=1, then window.__slot(false))
// The library is imported by relative source path, so the page runs on every tree.
import "./harness.css";
import { createApp, defineComponent, h, ref } from "vue";
import { GlassDock, DockControl } from "../../../../../src/components/dock";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "../../../../../src/components/dialog";
import * as TableKit from "../../../../../src/components/table";

const params = new URLSearchParams(location.search);
const scene = params.get("scene") ?? "wrap";
if (params.get("theme") === "dark") document.documentElement.classList.add("dark");
const w = window as unknown as Record<string, unknown>;
const glyph = () => h("svg", { viewBox: "0 0 16 16", width: 16, height: 16, "aria-hidden": "true" }, [h("path", { d: "M2 8h12M8 2v12", stroke: "currentColor", "stroke-width": 2, fill: "none" })]);
const icon = params.get("shape") === "icon";
const current = ref(Number(params.get("cur") ?? 1));
w.__select = (i: number) => (current.value = i);
const labels = ["Overview", "Methods", "Results", "Discussion", "Appendix", "References"].slice(0, Number(params.get("n") ?? 5));
const seat = (label: string, i: number) =>
    icon
        ? h(DockControl, { key: i, "aria-label": label, "aria-current": current.value === i ? "page" : undefined, "data-tab": i, onClick: () => (current.value = i) }, glyph)
        : h(DockControl, { key: i, shape: "tab", "aria-current": current.value === i ? "page" : undefined, "data-tab": i, onClick: () => (current.value = i) }, () => label);
const dock = () => h("div", { "data-probe": "nav", style: "display: inline-block; max-inline-size: 100%" }, [h(GlassDock, { collapse: false, backdropMode: "static" }, { default: () => labels.map(seat) })]);

const wrapStyle = [
    params.get("z") ? `zoom: ${params.get("z")}` : "",
    params.get("sc") ? `transform: scale(${params.get("sc")}); transform-origin: 0 0` : "",
].filter(Boolean).join("; ");
const Wrap = defineComponent(() => () =>
    h("div", { class: "scene mark-probe" }, [h("div", { "data-wrap": "", class: params.get("grow") ? "grow-in" : undefined, style: wrapStyle }, [dock()])]),
);

const open = ref(false);
w.__open = () => (open.value = true);
const Dlg = defineComponent(() => () =>
    h("div", { class: "scene mark-probe" }, [
        h(Dialog, { open: open.value, "onUpdate:open": (v: boolean) => (open.value = v) }, () =>
            h(DialogContent, { class: "mark-probe" }, () => [h(DialogTitle, () => "Sections"), h(DialogDescription, () => "A navigation dock inside a dialog."), dock()])),
    ]),
);
const T = TableKit as Record<string, never>;
const table = () =>
    h(T.Table, null, () => [
        h(T.TableHeader, null, () => h(T.TableRow, null, () => [h(T.TableHead, null, () => "Name"), h(T.TableHead, null, () => "Value")])),
        h(T.TableBody, null, () => [1, 2, 3].map((i) => h(T.TableRow, { key: i }, () => [h(T.TableCell, null, () => `Row ${i}`), h(T.TableCell, null, () => String(i * 7))]))),
    ]);
const TDlg = defineComponent(() => () =>
    h("div", { class: "scene" }, [
        h("div", { "data-probe": "page-table", style: "max-inline-size: 420px" }, [table()]),
        h(Dialog, { open: open.value, "onUpdate:open": (v: boolean) => (open.value = v) }, () =>
            h(DialogContent, null, () => [h(DialogTitle, () => "Readings"), h(DialogDescription, () => "A table inside a dialog."), h("div", { "data-probe": "dialog-table" }, [table()])])),
    ]),
);
const withSlot = ref(params.get("slot0") === "1");
w.__slot = (v: boolean) => (withSlot.value = v);
const Dyn = defineComponent(() => () =>
    h("div", { class: "scene" }, [
        h("div", { "data-probe": "nav", style: "display: inline-block" }, [
            h(GlassDock, { collapse: "closed", backdropMode: "static" }, {
                default: () => labels.map(seat),
                persistent: () => h(DockControl, { "aria-label": "Theme", "data-persist": "" }, glyph),
                ...(withSlot.value ? { collapsed: () => [glyph(), h("span", "Now")] } : {}),
            }),
        ]),
    ]),
);
const scenes: Record<string, ReturnType<typeof defineComponent>> = { wrap: Wrap, dialog: Dlg, tdialog: TDlg, dynslot: Dyn };
createApp(scenes[scene] ?? Wrap).mount("#app");
requestAnimationFrame(() => requestAnimationFrame(() => (w.__ready = true)));
