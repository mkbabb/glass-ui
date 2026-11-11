// Critic round 1 harness: the items the orchestrator notes handed to critics (G13, G14,
// O-212, O-213, O-214, K12). One page, one scene per ?scene=. It imports the library by
// relative source path, so the same page runs on the branch and on a v11.0.0 tree.
import "./harness.css";
import { createApp, defineComponent, h, onMounted, onUnmounted, ref } from "vue";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../src/components/select";
import { Configurator } from "../../../../src/components/configurator";
import { SegmentedTabs } from "../../../../src/components/tabs";
import { Slider } from "../../../../src/components/slider";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../../../src/components/collapsible";

const params = new URLSearchParams(location.search);
const scene = params.get("scene") ?? "select";
if (params.get("theme") === "dark") document.documentElement.classList.add("dark");
const w = window as unknown as Record<string, unknown>;

const ROWS = ["Neon cyberpunk gradient", "Quiet season", "Harbour at dusk", "Ochre field", "Violet hour", "Slate"];

// O-212 / O-214: a Select whose trigger is ?tw= px wide.
const SelectScene = defineComponent(() => {
    const value = ref(ROWS[1]);
    const tw = Number(params.get("tw") ?? 386);
    return () =>
        h("div", { class: "scene", style: "padding: 80px 16px" }, [
            h(Select, { modelValue: value.value, "onUpdate:modelValue": (v: string) => (value.value = v) }, () => [
                h(SelectTrigger, { "data-probe": "trigger", style: `inline-size: ${tw}px`, "aria-label": "Preset" }, () => h(SelectValue)),
                h(SelectContent, null, () => ROWS.map((f) => h(SelectItem, { value: f, key: f, "data-probe": "row" }, () => f))),
            ]),
        ]);
});

// G13: a Configurator with the aside on ?side=.
const ConfigScene = defineComponent(() => {
    const side = params.get("side") ?? "right";
    return () =>
        h("div", { style: "padding: 0" }, [
            h(Configurator, { asideSide: side, "data-probe": "cfg" }, {
                stage: () => h("div", { "data-probe": "stage-content", style: "block-size: 300px; background: color-mix(in oklab, var(--primary) 20%, transparent)" }, "stage"),
                default: () => h("div", { "data-probe": "aside-content" }, "controls"),
            }),
        ]);
});

// O-213: the configurator shell with a host margin ?m= px.
const ShellScene = defineComponent(() => {
    const m = Number(params.get("m") ?? 16);
    return () =>
        h("div", { class: "shell-host", "data-probe": "column" }, [
            h(Configurator, { style: `margin-inline: ${m}px`, "data-probe": "cfg" }, {
                stage: () => h("div", "stage"),
                default: () => h("div", "controls"),
            }),
        ]);
});

// G14: SegmentedTabs pill strip (fourier's Controls / Canvas).
const TabsScene = defineComponent(() => {
    const v = ref("controls");
    return () =>
        h("div", { class: "scene", style: "padding: 24px 16px" }, [
            h(SegmentedTabs, {
                modelValue: v.value,
                "onUpdate:modelValue": (x: string) => (v.value = x),
                options: [
                    { label: "Controls", value: "controls" },
                    { label: "Canvas", value: "canvas" },
                ],
                "data-probe": "tabs",
            }),
        ]);
});

// K12: a scrubber Slider driven by a rAF clock (playback).
const SliderScene = defineComponent(() => {
    const v = ref([0]);
    let raf = 0;
    let t0 = 0;
    const tick = (t: number) => {
        if (!t0) t0 = t;
        v.value = [((t - t0) / 40) % 100];
        raf = requestAnimationFrame(tick);
    };
    onMounted(() => (raf = requestAnimationFrame(tick)));
    onUnmounted(() => cancelAnimationFrame(raf));
    return () =>
        h("div", { class: "scene", style: "padding: 80px 24px" }, [
            h(Slider, { modelValue: v.value, "onUpdate:modelValue": (x: number[]) => (v.value = x), min: 0, max: 100, step: 0.01, variant: "scrubber", "aria-label": "Time", "data-probe": "slider" }),
        ]);
});

// Consumer CSS on 11.0.0's Collapsible: the content's reka height variable and a direct-child rule.
const CollapsibleScene = defineComponent(() => {
    const open = ref(false);
    return () =>
        h("div", { class: "scene", style: "padding: 24px 16px" }, [
            h(Collapsible, { open: open.value, "onUpdate:open": (x: boolean) => (open.value = x) }, () => [
                h(CollapsibleTrigger, { "data-probe": "ctrig" }, () => "More"),
                h(CollapsibleContent, { class: "consumer-content", "data-probe": "content" }, () => [h("p", { "data-probe": "para" }, "Body text"), h("p", "Second")]),
            ]),
        ]);
});

const scenes: Record<string, ReturnType<typeof defineComponent>> = {
    select: SelectScene,
    config: ConfigScene,
    shell: ShellScene,
    tabs: TabsScene,
    slider: SliderScene,
    collapsible: CollapsibleScene,
};
createApp(scenes[scene] ?? SelectScene).mount("#app");
requestAnimationFrame(() => requestAnimationFrame(() => (w.__ready = true)));
