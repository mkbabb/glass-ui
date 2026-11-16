// Critic 9 probe12 harness: the run's selected plate under the transforms fix 9's record
// left unread. A navigation dock (tab or glyph controls, one marked current) inside
//   [data-outer]  ?tf=<css transform> (transform-origin 0 0), ?z=<n> (CSS zoom)
//   [data-inner]  ?z2=<n> (a second zoom, nested inside the first wrapper)
// with ?dir=rtl on the page and ?orientation=vertical on the dock.
//   ?scene=inslot  a collapse="closed" dock with a #persistent control whose #collapsed
//                  slot is always passed and renders its content conditionally (a v-if
//                  INSIDE the slot): window.__content(false) empties it
// The library is imported by relative source path, so the page runs on every tree.
import "./harness.css";
import { createApp, defineComponent, h, ref } from "vue";
import { GlassDock, DockControl } from "../../../../../src/components/dock";

const params = new URLSearchParams(location.search);
if (params.get("theme") === "dark") document.documentElement.classList.add("dark");
if (params.get("dir")) document.documentElement.dir = params.get("dir")!;
const w = window as unknown as Record<string, unknown>;
const glyph = () => h("svg", { viewBox: "0 0 16 16", width: 16, height: 16, "aria-hidden": "true" }, [h("path", { d: "M2 8h12M8 2v12", stroke: "currentColor", "stroke-width": 2, fill: "none" })]);
const icon = params.get("shape") === "icon";
const current = ref(Number(params.get("cur") ?? 1));
w.__select = (i: number) => (current.value = i);
const labels = ["Overview", "Methods", "Results", "Discussion", "Appendix", "References"].slice(0, Number(params.get("n") ?? 5));
const orientation = (params.get("orientation") ?? "horizontal") as "horizontal";
const seat = (label: string, i: number) =>
    icon
        ? h(DockControl, { key: i, "aria-label": label, "aria-current": current.value === i ? "page" : undefined, "data-tab": i, onClick: () => (current.value = i) }, glyph)
        : h(DockControl, { key: i, shape: "tab", "aria-current": current.value === i ? "page" : undefined, "data-tab": i, onClick: () => (current.value = i) }, () => label);
const dock = () => h("div", { "data-probe": "nav", style: "display: inline-block; max-inline-size: 100%" }, [h(GlassDock, { collapse: false, backdropMode: "static", orientation }, { default: () => labels.map(seat) })]);
const outer = [
    params.get("z") ? `zoom: ${params.get("z")}` : "",
    params.get("tf") ? `transform: ${params.get("tf")}; transform-origin: 0 0` : "",
].filter(Boolean).join("; ");
const inner = params.get("z2") ? `zoom: ${params.get("z2")}` : "";
const Wrap = defineComponent(() => () =>
    h("div", { class: "scene mark-probe" }, [h("div", { "data-outer": "", style: outer }, [h("div", { "data-inner": "", style: inner }, [dock()])])]),
);
const content = ref(true);
w.__content = (v: boolean) => (content.value = v);
const InSlot = defineComponent(() => () =>
    h("div", { class: "scene" }, [
        h("div", { "data-probe": "nav", style: "display: inline-block" }, [
            h(GlassDock, { collapse: "closed", backdropMode: "static" }, {
                default: () => labels.map(seat),
                persistent: () => h(DockControl, { "aria-label": "Theme", "data-persist": "" }, glyph),
                collapsed: () => (content.value ? [glyph(), h("span", "Now")] : []),
            }),
        ]),
    ]),
);
createApp(params.get("scene") === "inslot" ? InSlot : Wrap).mount("#app");
requestAnimationFrame(() => requestAnimationFrame(() => (w.__ready = true)));
