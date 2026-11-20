// Critic 3 probe harness: what the fix-3 witness does not hold. The Collapsible's content
// with a consumer's own padding (unlayered, in @layer base, in @layer components), a
// sized content, the Accordion at rest and on its first frame, the Slider under four
// more consumers (slow to accept, uncontrolled, a pointer drag past a declined value, a
// two-thumb range), the tempo inside one run, and the tab strip's other arms under a
// coarse pointer. One scene per ?scene=. The library is imported by relative source
// path, so the same page runs on the branch and on a v11.0.0 tree.
import "./harness.css";
import { createApp, defineComponent, h, ref } from "vue";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../../../../src/components/accordion";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../../../../src/components/collapsible";
import { SegmentedTabs } from "../../../../../src/components/tabs";
import { Slider } from "../../../../../src/components/slider";
import { motionTempo } from "../../../../../src/composables/motion/core/motionTempo";

const params = new URLSearchParams(location.search);
const scene = params.get("scene") ?? "collapsible";
if (params.get("theme") === "dark") document.documentElement.classList.add("dark");
const w = window as unknown as Record<string, unknown>;

// ?cls=<class list on the content>; ?gap=<px>; ?closed=1.
const CollapsibleScene = defineComponent(() => {
    const gap = params.get("gap");
    const open = ref(params.get("closed") !== "1");
    return () =>
        h("div", { class: "scene" }, [
            h(Collapsible, { open: open.value, "onUpdate:open": (x: boolean) => (open.value = x), "data-probe": "croot", style: gap ? `--collapsible-gap: ${gap}px` : undefined }, () => [
                h(CollapsibleTrigger, { "data-probe": "ctrig" }, () => "More"),
                h(CollapsibleContent, { "data-probe": "content", class: params.get("cls") ?? "" }, () => [
                    h("p", { "data-probe": "c1", style: "margin: 0" }, "First"),
                    h("p", { "data-probe": "c2", style: "margin: 0" }, "Second"),
                ]),
            ]),
            h("p", { "data-probe": "after", style: "margin: 0" }, "After"),
        ]);
});

const AccordionScene = defineComponent(() => {
    const v = ref<string | undefined>(params.get("closed") === "1" ? undefined : "a");
    return () =>
        h("div", { class: "scene" }, [
            h(Accordion, { type: "single", collapsible: true, modelValue: v.value, "onUpdate:modelValue": (x: unknown) => (v.value = x as string | undefined), "data-probe": "aroot" }, () => [
                h(AccordionItem, { value: "a" }, () => [
                    h(AccordionTrigger, { "data-probe": "atrig" }, () => "Section A"),
                    h(AccordionContent, { "data-probe": "abody" }, () => [h("p", { "data-probe": "a1", style: "margin: 0" }, "Body of A"), h("p", { style: "margin: 0" }, "More of A")]),
                ]),
                h(AccordionItem, { value: "b" }, () => [
                    h(AccordionTrigger, null, () => "Section B"),
                    h(AccordionContent, null, () => [h("p", { style: "margin: 0" }, "Body of B")]),
                ]),
            ]),
        ]);
});

// ?mode= slow (accepts 80 ms later) | uncontrolled | reject (declines past 60) | range.
const SliderScene = defineComponent(() => {
    const mode = params.get("mode") ?? "reject";
    const model = ref(mode === "range" ? [20, 80] : [50]);
    const seen: number[][] = [];
    w.__model = () => [...model.value];
    w.__seen = () => seen;
    const on = (v: number[]) => {
        seen.push([...v]);
        if (mode === "slow") setTimeout(() => (model.value = v), 80);
        else if (mode === "reject") { if (v[0] <= 60) model.value = v; }
        else model.value = v;
    };
    return () =>
        h("div", { class: "scene", style: "inline-size: 300px" }, [
            mode === "uncontrolled"
                ? h(Slider, { defaultValue: [50], min: 0, max: 100, step: 10, "data-probe": "slider", "onUpdate:modelValue": (v: number[]) => seen.push([...v]) })
                : h(Slider, { modelValue: model.value, "onUpdate:modelValue": on, min: 0, max: 100, step: 10, "data-probe": "slider" }),
        ]);
});

const TempoScene = defineComponent(() => {
    w.__tempo = () => motionTempo();
    return () => h("div", { class: "scene" }, "tempo");
});

// ?orientation=vertical; the strip alone on the page.
const TabsScene = defineComponent(() => {
    const v = ref("day");
    return () =>
        h("div", { class: "scene", style: "display: grid; justify-items: start" }, [
            h("div", { "data-probe": "strip" }, [
                h(SegmentedTabs, {
                    modelValue: v.value,
                    "onUpdate:modelValue": (x: string) => (v.value = x),
                    options: [{ label: "Day", value: "day" }, { label: "Week", value: "week" }, { label: "Month", value: "month" }],
                    ariaLabel: "Range",
                    orientation: (params.get("orientation") ?? "horizontal") as "horizontal" | "vertical",
                }),
            ]),
        ]);
});

const scenes: Record<string, ReturnType<typeof defineComponent>> = { collapsible: CollapsibleScene, accordion: AccordionScene, slider: SliderScene, tempo: TempoScene, tabs: TabsScene };
createApp(scenes[scene] ?? CollapsibleScene).mount("#app");
requestAnimationFrame(() => requestAnimationFrame(() => (w.__ready = true)));
