// Critic 6 probe harness. Scenes (all an open dock unless said):
//   act      four glyph controls; ?mode=active gives seat 1 `active`, ?mode=none none;
//            library colours unless ?magenta=1
//   cohort   seat 1 has class `is-active`, seat 2 `aria-expanded="true"`; ?paint=flat|real
//            sets the --dock-active-* cohort on the wrapper
//   seatdir  a language run: seats 1 and 2 carry dir="rtl" (and on a ?dir=rtl page seats 0
//            and 3 carry dir="ltr"); ?shape=icon|tab; window.__select moves the current seat
//   long     eight tab seats (a run that scrolls at 390); ?dir=rtl loads right to left;
//            window.__dir flips at runtime; ?orientation=vertical
// The library is imported by relative source path, so the page runs on every tree.
import "./harness.css";
import { createApp, defineComponent, h, ref } from "vue";
import { GlassDock, DockControl } from "../../../../../src/components/dock";

const params = new URLSearchParams(location.search);
const scene = params.get("scene") ?? "act";
if (params.get("theme") === "dark") document.documentElement.classList.add("dark");
if (params.get("dir")) document.documentElement.dir = params.get("dir")!;
const w = window as unknown as Record<string, unknown>;
const glyph = () => h("svg", { viewBox: "0 0 16 16", width: 16, height: 16, "aria-hidden": "true" }, [h("path", { d: "M2 8h12M8 2v12", stroke: "currentColor", "stroke-width": 2, fill: "none" })]);
const icon = params.get("shape") !== "tab";
const current = ref(Number(params.get("cur") ?? 1));
w.__select = (i: number) => (current.value = i);
w.__dir = (d: string) => (document.documentElement.dir = d);
const orientation = (params.get("orientation") ?? "horizontal") as "horizontal";
const wrap = (cls: string, kids: unknown[]) =>
    h("div", { class: `scene ${cls}` }, [h("div", { "data-probe": "nav", style: "display: inline-block; max-inline-size: 100%" }, [h(GlassDock, { collapse: false, backdropMode: "static", orientation }, { default: () => kids })])]);

const Act = defineComponent(() => () =>
    wrap(params.get("magenta") === "1" ? "mark-probe" : "", [0, 1, 2, 3].map((i) => h(DockControl, { "aria-label": `c${i}`, "data-tab": i, ...(params.get("mode") === "active" && i === 1 ? { active: true } : {}) }, glyph))),
);
const Cohort = defineComponent(() => () =>
    wrap(`cohort-${params.get("paint") ?? "flat"}`, [0, 1, 2, 3].map((i) => h(DockControl, { "aria-label": `c${i}`, "data-tab": i, ...(i === 1 ? { class: "is-active" } : {}), ...(i === 2 && params.get("expanded") === "1" ? { "aria-expanded": "true" } : {}) }, glyph))),
);
const langs = ["English", "العربية", "עברית", "Français"];
const pageRtl = params.get("dir") === "rtl";
const seatDir = (i: number) => (pageRtl ? (i === 0 || i === 3 ? "ltr" : undefined) : i === 1 || i === 2 ? "rtl" : undefined);
const SeatDir = defineComponent(() => () =>
    wrap("mark-probe", langs.map((label, i) =>
        icon
            ? h(DockControl, { "aria-label": label, lang: "x", dir: seatDir(i), "aria-current": current.value === i ? "page" : undefined, "data-tab": i, onClick: () => (current.value = i) }, glyph)
            : h(DockControl, { shape: "tab", dir: seatDir(i), "aria-current": current.value === i ? "page" : undefined, "data-tab": i, onClick: () => (current.value = i) }, () => label))),
);
const many = ["Overview", "Methods", "Results", "Discussion", "Appendix", "References", "Changelog", "Notes"];
const Long = defineComponent(() => () =>
    wrap("mark-probe", many.map((label, i) => h(DockControl, { shape: "tab", "aria-current": current.value === i ? "page" : undefined, "data-tab": i, onClick: () => (current.value = i) }, () => label))),
);
const scenes: Record<string, ReturnType<typeof defineComponent>> = { act: Act, cohort: Cohort, seatdir: SeatDir, long: Long };
createApp(scenes[scene] ?? Act).mount("#app");
requestAnimationFrame(() => requestAnimationFrame(() => (w.__ready = true)));
