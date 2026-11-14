// Fourier's dock compositions, each a persistent region beside the layers.
//   ?scene=transport  the animation dock: an overlay that is an inline-size container,
//                     a persistent Play control, a one-glyph summary, and a face whose
//                     inline size is the overlay's less the dock's chrome, computed from
//                     glass's own tokens (padding, one layer square and the layer gap),
//                     holding a flexible timeline and two dropdown triggers
//   ?scene=editor     the editor dock: `fit-content`, a persistent count and Save, and a
//                     `w-full` row of four controls
//   ?scene=stretched  a dock stretched across a 100% wide host, a persistent control and
//                     four controls
// `window.__dock` is the dock's handle (`expand()`). Imports are relative to `src/`, so
// the file mounts unchanged on an older tree.
import "../../demo/demo.css";
import { createApp, h, ref } from "vue";

import GlassDock from "../../src/components/dock/GlassDock.vue";
import DockControl from "../../src/components/dock/DockControl.vue";
import DockTrigger from "../../src/components/dock/DockTrigger.vue";
import DropdownMenu from "../../src/components/menu/DropdownMenu.vue";

const scene = new URLSearchParams(location.search).get("scene") ?? "transport";
const dock = ref<{ expand: () => void } | null>(null);
(window as unknown as { __dock: typeof dock }).__dock = dock;

const style = document.createElement("style");
style.textContent = `
    body { margin: 0; min-height: 100vh; background: var(--background); }
    .rows-overlay { position: absolute; bottom: 12px; left: 0.375rem; right: 0.375rem; display: flex; justify-content: center; container-type: inline-size; }
    .rows-face {
        --transport-chrome: calc(2 * var(--dock-padding-inline, 0.5rem) + var(--dock-layer-height, 2.5rem) + var(--dock-layer-gap, 0.375rem));
        inline-size: calc(min(960px, 100cqi) - var(--transport-chrome));
        display: flex; align-items: center; gap: 0.5rem;
    }
    .rows-timeline { flex: 1 1 auto; min-inline-size: 0; block-size: 4px; border-radius: 2px; background: color-mix(in srgb, var(--foreground) 20%, transparent); }
    .rows-count { font: 600 12px system-ui; padding-inline: 4px; align-self: center; }
    .rows-host { position: absolute; bottom: 12px; left: 16px; right: 16px; display: flex; }
    .rows-host > .glass-dock { inline-size: 100%; }
`;
document.head.append(style);

const control = (label: string) => h(DockControl, { "aria-label": label }, () => label.slice(0, 1));

const scenes: Record<string, () => ReturnType<typeof h>> = {
    transport: () =>
        h("div", { class: "rows-overlay" }, [
            h(GlassDock, { ref: dock, class: "rows-dock", "data-witness": "dock" }, {
                persistent: () => [control("Play")],
                collapsed: () => [h("span", { "aria-hidden": "true" }, "·")],
                default: () => [
                    h("div", { class: "rows-face" }, [
                        h("div", { class: "rows-timeline" }),
                        h(DropdownMenu, { modal: false }, () => [h(DockTrigger, { for: "dropdown", "aria-label": "Playback speed" }, () => "1×")]),
                        h(DropdownMenu, { modal: false }, () => [h(DockTrigger, { for: "dropdown", "aria-label": "Easing" }, () => "∿")]),
                    ]),
                ],
            }),
        ]),
    editor: () =>
        h("div", { class: "rows-overlay" }, [
            h(GlassDock, { ref: dock, fitContent: true, class: "rows-dock", "data-witness": "dock" }, {
                persistent: () => [h("span", { class: "rows-count" }, "128 pts"), control("Save")],
                collapsed: () => [h("span", { "aria-hidden": "true" }, "…")],
                default: () => [
                    h("div", { class: "flex items-center w-full", style: "display:flex;align-items:center;inline-size:100%" }, [
                        control("Undo"),
                        control("Redo"),
                        control("Delete"),
                        control("More"),
                    ]),
                ],
            }),
        ]),
    stretched: () =>
        h("div", { class: "rows-host" }, [
            h(GlassDock, { ref: dock, class: "rows-dock", "data-witness": "dock" }, {
                persistent: () => [control("Home")],
                collapsed: () => [h("span", { "aria-hidden": "true" }, "·")],
                default: () => ["Gallery", "Workspace", "Paper", "About"].map(control),
            }),
        ]),
};

createApp({ setup: () => scenes[scene]! }).mount("#app");
document.body.dataset.ready = "1";
