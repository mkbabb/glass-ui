// A hover-opened GlassDock that idles shut, on a page tall enough to scroll, in three
// scenes (`?scene=`):
//   base      collapse "closed", expandOn hover, a #persistent seat, a two-layer
//             DockLayerGroup and several seats
//   controls  the same dock with a Slider and a Select in its active layer
//   consumer  value.js's shape as far as glass's public API goes: collapse "open",
//             `fit-content`, in flow in a top band (a centring flex row whose host div is
//             sized by the dock), a canvas under the page passed as `background-canvas`,
//             a layer group whose main layer holds a Select, seats and a separator
// Imports are relative to `src/`, so the file mounts unchanged on an older tree.
import "../../demo/demo.css";
import { createApp, h, onMounted, ref } from "vue";

import { announceFieldPaint } from "../../src/composables/glass/fieldPaint";

import GlassDock from "../../src/components/dock/GlassDock.vue";
import DockControl from "../../src/components/dock/DockControl.vue";
import DockLayer from "../../src/components/dock/DockLayer.vue";
import DockLayerGroup from "../../src/components/dock/DockLayerGroup.vue";
import DockSeparator from "../../src/components/dock/DockSeparator.vue";
import Slider from "../../src/components/slider/Slider.vue";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../src/components/select";

const q = new URLSearchParams(location.search);
const scene = q.get("scene") ?? "base";
document.body.style.cssText = "margin:0;background:var(--background)";

const view = ref("palette");
const select = () =>
    h(
        Select,
        { modelValue: view.value, "onUpdate:modelValue": (v: string) => (view.value = v) },
        () => [
            h(SelectTrigger, { class: "ro-select", "aria-label": "View" }, () => h(SelectValue)),
            h(SelectContent, () =>
                ["palette", "gradient", "mix"].map((v) => h(SelectItem, { value: v }, () => v)),
            ),
        ],
    );

const seats = () => [
    h(DockControl, { "aria-label": "Home", active: true }, () => "⌂"),
    h(DockControl, { "aria-label": "Search" }, () => "⌕"),
    h(DockControl, { "aria-label": "Settings" }, () => "⚙"),
    h(DockControl, { shape: "tab", "aria-label": "Day" }, () => "Day"),
    h(DockControl, { shape: "tab", "aria-label": "Week" }, () => "Week"),
];

const main = () => {
    if (scene === "controls") {
        return [
            ...seats().slice(0, 2),
            h(Slider, { class: "ro-slider", defaultValue: [60], style: "inline-size:200px", "aria-label": "Volume" }),
            select(),
            ...seats().slice(2),
        ];
    }
    if (scene === "consumer") {
        return [select(), h(DockSeparator), ...seats()];
    }
    return seats();
};

const canvas = ref<HTMLCanvasElement | null>(null);

const page = () =>
    h(
        "main",
        { style: "position:relative;display:grid;gap:16px;padding:24px" },
        Array.from({ length: 80 }, (_, i) => h("p", { style: "margin:0;height:48px" }, `Row ${i + 1}`)),
    );

// The consumer's field: a canvas that draws a drifting two-stop ramp every frame and
// announces each frame, as glass's canvas lifecycle does.
function paintField(): void {
    const c = canvas.value;
    const g = c?.getContext("2d");
    if (!c || !g) return;
    let t = 0;
    const frame = () => {
        t += 1;
        const x = (Math.sin(t / 40) * 0.5 + 0.5) * c.width;
        const grad = g.createLinearGradient(0, 0, c.width, 0);
        grad.addColorStop(0, "#1b2a4a");
        grad.addColorStop(Math.min(1, Math.max(0, x / c.width)), "#85c57d");
        grad.addColorStop(1, "#f4f1ea");
        g.fillStyle = grad;
        g.fillRect(0, 0, c.width, c.height);
        announceFieldPaint(c);
        requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
}

createApp({
    setup: () => {
        onMounted(() => scene === "consumer" && paintField());
        return () =>
        h("div", [
            scene === "consumer"
                ? h("canvas", {
                      ref: canvas,
                      "data-glass-field-canvas": "",
                      width: 640,
                      height: 400,
                      style: "position:fixed;inset:0;inline-size:100vw;block-size:100vh;z-index:0",
                  })
                : null,
            scene === "consumer" ? null : page(),
            h(scene === "consumer" ? "nav" : "div", {
                style: scene === "consumer"
                    ? "position:relative;display:flex;align-items:center;justify-content:center;min-height:72px;z-index:1"
                    : "position:fixed;inset-inline:0;bottom:24px;display:flex;justify-content:center;z-index:1",
            }, [h("div", { class: "ro-host" }, [
                h(
                    GlassDock,
                    {
                        collapse: scene === "consumer" ? "open" : "closed",
                        expandOn: "hover",
                        collapsedLabel: "open the dock",
                        class: "ro-dock",
                        ...(scene === "consumer" ? { backgroundCanvas: () => canvas.value, fitContent: true } : {}),
                    },
                    {
                        persistent: () => h(DockControl, { "aria-label": "Theme" }, () => "◐"),
                        // value.js's wax seal: a disc as tall as the summary pane and as wide
                        // as it is tall.
                        collapsed: () =>
                            scene === "consumer"
                                ? h("div", { class: "ro-seal", style: "block-size:100%;aspect-ratio:1;display:grid;place-items:center;border-radius:9999px;background:#85c57d" }, [
                                      h("span", { style: "font:600 15px system-ui" }, "≡"),
                                  ])
                                : h("span", { style: "font:600 15px system-ui" }, "≡"),
                        default: () =>
                            h(DockLayerGroup, { active: "main", showSwitcher: false }, () => [
                                h(DockLayer, { id: "main", label: "Main" }, main),
                                h(DockLayer, { id: "edit", label: "Edit" }, () => [
                                    h(DockControl, { "aria-label": "Back" }, () => "←"),
                                ]),
                            ]),
                    },
                ),
            ])]),
            scene === "consumer" ? page() : null,
        ]);
    },
}).mount("#app");
document.body.dataset.ready = "1";
