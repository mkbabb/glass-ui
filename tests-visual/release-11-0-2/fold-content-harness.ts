// A dock that holds a wide control and a row of seats, folded and unfolded on demand: a
// GlassDock (`?orientation=vertical` for a vertical one, `?theme=dark` for the dark
// scheme, `?collapse=open` for a dock that opens on hover and folds itself after the idle
// window, `?fit=1` for a `fit-content` dock) whose full layer holds three DockControls, a Slider 240 px along the run's axis
// and a slotted button with a transition of its own. The same button also stands outside
// the dock. `window.__expand()` / `__collapse()` drive the dock. Imports are relative to
// `src/`, so the file mounts unchanged on an older tree.
import "../../demo/demo.css";
import { createApp, h, ref } from "vue";

import GlassDock from "../../src/components/dock/GlassDock.vue";
import DockControl from "../../src/components/dock/DockControl.vue";
import Slider from "../../src/components/slider/Slider.vue";

const q = new URLSearchParams(location.search);
const vertical = q.get("orientation") === "vertical";
if (q.get("theme") === "dark") document.documentElement.classList.add("dark");
document.body.style.cssText = "margin:0;background:var(--background)";

const style = document.createElement("style");
style.textContent = `
    @layer components {
        .fc-own { inline-size: 40px; block-size: 40px; border: 0; border-radius: 12px; background-color: rgb(40 120 220); transition: background-color 400ms linear; }
        .fc-own:hover { background-color: rgb(220 60 40); }
    }
`;
document.head.append(style);

const w = window as unknown as { __expand: () => void; __collapse: () => void };
const dock = ref<{ expand: () => void; collapse: () => void } | null>(null);
w.__expand = () => dock.value?.expand();
w.__collapse = () => dock.value?.collapse();

createApp({
    setup: () => () =>
        h("div", { style: "min-block-size:100vh" }, [
            h("button", { class: "fc-own fc-outside", "aria-label": "Outside", style: "position:fixed;inset-block-start:16px;inset-inline-start:16px" }),
            h(
                "div",
                {
                    style: vertical
                        ? "position:fixed;inset-block:40px;inset-inline-start:40px;display:flex;align-items:center"
                        : "position:fixed;inset-inline:0;inset-block-end:40px;display:flex;justify-content:center",
                },
                [
                    h(
                        GlassDock,
                        {
                            ref: dock,
                            orientation: vertical ? "vertical" : "horizontal",
                            collapse: q.get("collapse") === "open" ? "open" : "closed",
                            expandOn: q.get("collapse") === "open" ? undefined : "press",
                            collapsedLabel: "open the dock",
                            fitContent: q.get("fit") === "1",
                            class: "fc-dock",
                        },
                        {
                            default: () => [
                                h(DockControl, { "aria-label": "Home", active: true }, () => "⌂"),
                                h(DockControl, { "aria-label": "Search" }, () => "⌕"),
                                h(Slider, {
                                    class: "fc-slider",
                                    defaultValue: [60],
                                    orientation: vertical ? "vertical" : "horizontal",
                                    style: vertical ? "block-size:240px" : "inline-size:240px",
                                    "aria-label": "Volume",
                                }),
                                h("button", { class: "fc-own fc-inside", "aria-label": "Inside" }),
                                h(DockControl, { "aria-label": "Settings" }, () => "⚙"),
                            ],
                            collapsed: () => [h("span", { style: "font:600 15px system-ui" }, "≡")],
                        },
                    ),
                ],
            ),
        ]),
}).mount("#app");
document.body.dataset.ready = "1";
