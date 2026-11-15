// Critic 7 probe harness. Scenes:
//   cnav     a COLLAPSIBLE dock (collapse="closed") whose run marks its current seat;
//            ?face=slot (a #collapsed glyph) | persistent (no #collapsed, a #persistent seat)
//   tick     eight tab seats; window.__label(i, text) rewrites one seat's label
//            (a count that ticks); window.__insert() adds a seat at the front
//   sep      tab seats with separators between them, a #persistent and a #persistent-end seat
//   radius   a consumer's own boxes: class rounded-dock, and var(--radius-dock)
// The library is imported by relative source path, so the page runs on every tree.
import "./harness.css";
import { createApp, defineComponent, h, ref } from "vue";
import { GlassDock, DockControl, DockSeparator } from "../../../../../src/components/dock";

const params = new URLSearchParams(location.search);
const scene = params.get("scene") ?? "cnav";
if (params.get("theme") === "dark") document.documentElement.classList.add("dark");
if (params.get("dir")) document.documentElement.dir = params.get("dir")!;
const w = window as unknown as Record<string, unknown>;
const glyph = () => h("svg", { viewBox: "0 0 16 16", width: 16, height: 16, "aria-hidden": "true" }, [h("path", { d: "M2 8h12M8 2v12", stroke: "currentColor", "stroke-width": 2, fill: "none" })]);
const icon = params.get("shape") === "icon";
const current = ref(Number(params.get("cur") ?? 1));
w.__select = (i: number) => (current.value = i);
const docks: Record<string, unknown> = {};
w.__docks = docks;
const labels = ref(["Overview", "Methods", "Results", "Discussion", "Appendix", "References", "Changelog", "Notes"].slice(0, Number(params.get("n") ?? 8)));
w.__label = (i: number, text: string) => (labels.value = labels.value.map((l, j) => (j === i ? text : l)));
const extra = ref(0);
w.__insert = () => extra.value++;
const seat = (label: string, i: number, key: string | number = i) =>
    icon
        ? h(DockControl, { key, "aria-label": label, "aria-current": current.value === i ? "page" : undefined, "data-tab": i, onClick: () => (current.value = i) }, glyph)
        : h(DockControl, { key, shape: "tab", "aria-current": current.value === i ? "page" : undefined, "data-tab": i, onClick: () => (current.value = i) }, () => label);
const seats = () => [
    ...Array.from({ length: extra.value }, (_, k) => h(DockControl, { key: `x${k}`, shape: icon ? undefined : "tab", "aria-label": `extra ${k}`, "data-extra": k }, icon ? glyph : () => `Extra ${k}`)),
    ...labels.value.map((l, i) => seat(l, i)),
];
const box = (kids: unknown[], cls = "mark-probe") => h("div", { class: `scene ${cls}` }, [h("div", { "data-probe": "nav", style: "display: inline-block; max-inline-size: 100%" }, kids)]);
const toggle = () => h(DockControl, { "aria-label": "Theme", "data-persist": "" }, glyph);
const orientation = (params.get("orientation") ?? "horizontal") as "horizontal";

const CNav = defineComponent(() => () =>
    box([
        h(GlassDock, { collapse: "closed", backdropMode: "static", orientation, ref: (el: unknown) => { if (el) docks.nav = el; } },
            params.get("face") === "persistent"
                ? { default: seats, persistent: toggle }
                : { default: seats, collapsed: glyph }),
    ]),
);
const Tick = defineComponent(() => () => box([h(GlassDock, { collapse: false, backdropMode: "static", orientation }, { default: seats })]));
const Sep = defineComponent(() => () =>
    box([
        h(GlassDock, { collapse: false, backdropMode: "static", orientation }, {
            default: () => labels.value.slice(0, 4).flatMap((l, i) => (i === 2 ? [h(DockSeparator, { key: "s" }), seat(l, i)] : [seat(l, i)])),
            persistent: toggle,
            "persistent-end": () => h(DockControl, { "aria-label": "More", "data-persist-end": "" }, glyph),
        }),
    ], `mark-probe${params.get("bar") === "1" ? " host-bar" : ""}`),
);
const Radius = defineComponent(() => () =>
    h("div", { class: "scene" }, [
        h("div", { id: "util", class: "rounded-dock", style: "inline-size: 240px; block-size: 96px; background: rgb(255, 0, 255)" }),
        h("div", { id: "var", style: "margin-block-start: 16px; inline-size: 240px; block-size: 96px; border-radius: var(--radius-dock); background: rgb(255, 0, 255)" }),
    ]),
);
const scenes: Record<string, ReturnType<typeof defineComponent>> = { cnav: CNav, tick: Tick, sep: Sep, radius: Radius };
createApp(scenes[scene] ?? CNav).mount("#app");
requestAnimationFrame(() => requestAnimationFrame(() => (w.__ready = true)));
