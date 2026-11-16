// Lane L2 witness harness. One page, one scene per item, chosen by ?scene=. The same
// file runs on the branch and on a v11.0.0 tree (it imports the library by relative
// source path), so the probe reads the same DOM on both. Props and classes 11.0.0 lacks
// (`grab`/`release`, `--collapsible-gap`, `.viz-*`) fall through and change nothing.
import "./harness.css";
import { createApp, defineComponent, h, nextTick, ref } from "vue";
import { Slider } from "../../../../src/components/slider";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "../../../../src/components/collapsible";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../../src/components/select";
import { Button } from "../../../../src/components/button";
import { useGlassBackdropLuminance } from "../../../../src/composables/glass/useGlassBackdropLuminance";

const params = new URLSearchParams(location.search);
const scene = params.get("scene") ?? "slider";
const tree = params.get("tree") ?? "green";
if (params.get("theme") === "dark") document.documentElement.classList.add("dark");
const w = window as unknown as Record<string, unknown>;

// ── O-181 · O-196 · the Slider ────────────────────────────────────────────────────
const SliderScene = defineComponent(() => {
    const model = ref([20]);
    const log = { emits: [] as number[][], frames: 0, commits: [] as number[][], grabs: 0, releases: [] as number[][] };
    let clockOn = false;
    let paused = false;
    let clockFrame = 0;
    let clockPos = 60;
    // A 60 Hz clock writing the model from its own time, the pattern of a playback
    // scrubber. The consumer pauses it on `grab` and resumes it from the released value
    // on `release` (events 11.0.0 does not have, so there it never pauses).
    const tick = () => {
        if (!clockOn) return;
        if (!paused) {
            clockPos = clockPos + 0.4 > 100 ? 0 : clockPos + 0.4;
            model.value = [clockPos];
        }
        clockFrame = requestAnimationFrame(tick);
    };
    // Frame counter: the emits are bucketed by the frame they land in.
    let frame = 0;
    const count = () => {
        frame++;
        requestAnimationFrame(count);
    };
    requestAnimationFrame(count);
    w.__slider = {
        log,
        frame: () => frame,
        clock(on: boolean) {
            clockOn = on;
            cancelAnimationFrame(clockFrame);
            if (on) clockFrame = requestAnimationFrame(tick);
        },
        set(v: number) {
            model.value = [v];
        },
        model: () => model.value[0],
    };
    return () =>
        h("div", { class: "scene" }, [
            h("div", { class: "slider-host", "data-probe": "slider" }, [
                h(Slider, {
                    modelValue: model.value,
                    "onUpdate:modelValue": (v: number[]) => {
                        log.emits.push([frame, v[0]!]);
                        model.value = v;
                    },
                    onValueCommit: (v: number[]) => log.commits.push([frame, v[0]!]),
                    onGrab: () => {
                        log.grabs++;
                        paused = true;
                    },
                    onRelease: (v: number[]) => {
                        log.releases.push([frame, v[0]!]);
                        clockPos = v[0]!;
                        paused = false;
                    },
                    min: 0,
                    max: 100,
                    step: 0.01,
                    variant: "scrubber",
                    "aria-label": "Position",
                }),
            ]),
        ]);
});

// ── O-189 · O-171 R-1 · the Collapsible ───────────────────────────────────────────
const CollapsibleScene = defineComponent(() => {
    const open = ref(false);
    w.__collapsible = { set: (v: boolean) => (open.value = v) };
    // The consumer's 12 px between trigger and content: the library's own hook on the
    // branch, a root `gap` on 11.0.0 (which has no hook).
    const rootStyle =
        tree === "red"
            ? { display: "grid", gap: "12px" }
            : { "--collapsible-gap": "12px" };
    return () =>
        h("div", { class: "scene" }, [
            h("div", { class: "collapse-host", "data-probe": "collapse-host" }, [
                h(
                    Collapsible,
                    { open: open.value, "onUpdate:open": (v: boolean) => (open.value = v), style: rootStyle, "data-probe": "collapse-root" },
                    () => [
                        h(CollapsibleTrigger, { "data-probe": "collapse-trigger" }, () => "Release notes"),
                        h(CollapsibleContent, { "data-probe": "collapse-content" }, () =>
                            h("div", { class: "collapse-body", "data-probe": "collapse-body" }),
                        ),
                    ],
                ),
            ]),
            h("div", { "data-probe": "below", style: "block-size: 8px; inline-size: 40px; background: var(--foreground)" }),
        ]);
});

// ── O-171 R-1 · the menu plate ──────────────────────────────────────────────────────
const MenuScene = defineComponent(() => {
    const value = ref("apple");
    return () =>
        h("div", { class: "scene", style: "padding-top: 80px" }, [
            h(Select, { modelValue: value.value, "onUpdate:modelValue": (v: string) => (value.value = v) }, () => [
                h(SelectTrigger, { "data-probe": "menu-trigger", class: "w-56", "aria-label": "Fruit" }, () => h(SelectValue)),
                h(SelectContent, null, () =>
                    ["apple", "banana", "cherry", "date", "elder", "fig"].map((f) =>
                        h(SelectItem, { value: f, key: f }, () => f),
                    ),
                ),
            ]),
        ]);
});

// ── O-180 · reads on the mount path ─────────────────────────────────────────────────
const Sampled = defineComponent(() => {
    const el = ref<HTMLElement | null>(null);
    useGlassBackdropLuminance(el);
    return () => h("div", { ref: el, class: "glass-floating", style: "inline-size: 120px; block-size: 40px; border-radius: 12px", "data-probe": "sampled" });
});
const MountScene = defineComponent(() => {
    const phase = ref(0);
    w.__mount = { next: () => (phase.value += 1), tick: nextTick };
    return () =>
        h("div", { class: "scene" }, [
            h("div", { style: "display:flex; flex-wrap:wrap; gap:6px" }, [
                ...Array.from({ length: 40 }, (_, i) =>
                    h(Button, { key: `${phase.value}-${i}`, size: "sm", "data-probe": i === 0 ? "press" : undefined }, () => `Control ${i}`),
                ),
            ]),
            h("div", { style: "display:flex; gap:8px" }, Array.from({ length: 4 }, (_, i) => h(Sampled, { key: `${phase.value}-s${i}` }))),
        ]);
});

// ── O-168 · the data-viz entrance register ─────────────────────────────────────────
const VizScene = defineComponent(() => {
    const key = ref(0);
    w.__viz = { replay: () => key.value++ };
    const bars = [42, 68, 55, 81, 37, 63, 74, 49, 88, 58, 71, 46];
    return () =>
        h("div", { class: "scene" }, [
            h("svg", { key: key.value, class: "chart", viewBox: "0 0 300 110", "data-probe": "chart" }, [
                h("circle", { class: "viz-ripple", cx: 230, cy: 40, r: 60, fill: "rgba(80,120,220,0.2)", "data-probe": "ripple" }),
                h("g", { style: { "--viz-n": bars.length } }, bars.map((v, i) =>
                    h("rect", { class: "viz-bar", style: { "--i": i }, x: 6 + i * 24, y: 100 - v, width: 16, height: v, rx: 3, fill: "rgb(80,120,220)", "data-probe": "bar" }),
                )),
                h("g", { style: { "--viz-n": bars.length } }, bars.map((v, i) =>
                    h("circle", { class: "viz-mark", style: { "--i": i }, cx: 14 + i * 24, cy: 94 - v, r: 3, fill: "currentColor", "data-probe": "mark" }),
                )),
            ]),
        ]);
});

// ── O-173 G1 · the lateral card swap ───────────────────────────────────────────────
const VtScene = defineComponent(() => {
    const which = ref<"a" | "b">("a");
    w.__vt = {
        swap(direction: number) {
            document.documentElement.style.setProperty("--route-direction", String(direction));
            const doc = document as Document & {
                startViewTransition?: (o: { update: () => Promise<void>; types: string[] }) => { ready: Promise<void>; finished: Promise<void> };
            };
            const t = doc.startViewTransition!({
                update: async () => {
                    which.value = which.value === "a" ? "b" : "a";
                    await nextTick();
                },
                types: ["lateral"],
            });
            return t.ready;
        },
    };
    return () =>
        h("div", { class: "scene" }, [
            h("div", { class: `vt-card vt-${which.value}`, "data-probe": "card" }, which.value === "a" ? "One" : "Two"),
        ]);
});

const scenes: Record<string, ReturnType<typeof defineComponent>> = {
    slider: SliderScene,
    collapsible: CollapsibleScene,
    menu: MenuScene,
    mount: MountScene,
    viz: VizScene,
    vt: VtScene,
};

createApp(scenes[scene] ?? SliderScene).mount("#app");
requestAnimationFrame(() => requestAnimationFrame(() => (w.__ready = true)));
