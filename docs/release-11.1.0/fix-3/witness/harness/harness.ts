// Fix 3 witness harness: the Collapsible's content as the consumer's own grid or flex
// container (gap unset and set), a controlled Slider that declines a step, the shared root
// tempo after the page changes it, and a SegmentedTabs strip on the page and in a dock,
// fine and coarse. One scene per ?scene=. The library is imported by relative source
// path, so the same page runs on the branch, the pre-fix tree and a v11.0.0 tree.
import "./harness.css";
import { createApp, defineComponent, h, ref } from "vue";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../../../../src/components/collapsible";
import { GlassDock, DockControl } from "../../../../../src/components/dock";
import { SegmentedTabs } from "../../../../../src/components/tabs";
import { Slider } from "../../../../../src/components/slider";
import { motionTempo } from "../../../../../src/composables/motion/core/motionTempo";

const params = new URLSearchParams(location.search);
const scene = params.get("scene") ?? "collapsible";
if (params.get("theme") === "dark") document.documentElement.classList.add("dark");
const w = window as unknown as Record<string, unknown>;

// ?layout= block | grid | grid2 | flex | row; ?gap=<px> sets --collapsible-gap on the
// root; ?closed=1 starts closed (the first- and last-frame cells).
const CollapsibleScene = defineComponent(() => {
    const layout = params.get("layout") ?? "grid";
    const gap = params.get("gap");
    const open = ref(params.get("closed") !== "1");
    const style =
        layout === "grid2" ? "display: grid; grid-template-columns: 1fr 1fr; gap: 8px"
        : layout === "flex" ? "display: flex; flex-direction: column; gap: 8px"
        : layout === "row" ? "display: flex; gap: 8px"
        : layout === "block" ? ""
        : "display: grid; gap: 8px";
    return () =>
        h("div", { class: "scene" }, [
            h(
                Collapsible,
                {
                    open: open.value,
                    "onUpdate:open": (x: boolean) => (open.value = x),
                    "data-probe": "croot",
                    style: gap ? `--collapsible-gap: ${gap}px` : undefined,
                },
                () => [
                    h(CollapsibleTrigger, { "data-probe": "ctrig" }, () => "More"),
                    h(CollapsibleContent, { "data-probe": "content", style }, () => [
                        h("p", { "data-probe": "c1", style: "margin: 0" }, "First"),
                        h("p", { "data-probe": "c2", style: "margin: 0" }, "Second"),
                        h("p", { "data-probe": "c3", style: "margin: 0" }, "Third"),
                        h("p", { "data-probe": "c4", style: "margin: 0" }, "Fourth"),
                    ]),
                ],
            ),
        ]);
});

// The shared root tempo a JS spring reads at construction. window.__tempo() is that read.
const TempoScene = defineComponent(() => {
    w.__tempo = () => motionTempo();
    return () => h("div", { class: "scene" }, "tempo");
});

// A dock that hosts a SegmentedTabs strip beside a control, and the same strip on the page.
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

// A controlled Slider whose consumer refuses values past 60. ?mode=clamp writes the
// clamped value (a new array each time); ?mode=reject leaves the model as it was.
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
    tempo: TempoScene,
    slider: SliderScene,
    docktabs: DockTabsScene,
};
createApp(scenes[scene] ?? CollapsibleScene).mount("#app");
requestAnimationFrame(() => requestAnimationFrame(() => (w.__ready = true)));
