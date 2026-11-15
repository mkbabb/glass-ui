// A collapsed GlassDock shaped like daraksha's Motion dock (its glass-only repro
// `test/glass-repro/dock-press-scroll`): #persistent and #persistent-end seats and a
// two-layer DockLayerGroup whose narrow "page" layer is active. `window.__press`
// counts the presses each seat received and reads the active layer's scroller.
// Imports are relative to `src/`, so the file mounts unchanged on an older tree.
import "../../demo/demo.css";
import { createApp, h, reactive, ref } from "vue";

import GlassDock from "../../src/components/dock/GlassDock.vue";
import DockControl from "../../src/components/dock/DockControl.vue";
import DockLayer from "../../src/components/dock/DockLayer.vue";
import DockLayerGroup from "../../src/components/dock/DockLayerGroup.vue";
import DockSeparator from "../../src/components/dock/DockSeparator.vue";

const presses = reactive<Record<string, number>>({});
const hit = (name: string) => () => {
    presses[name] = (presses[name] ?? 0) + 1;
};

const App = {
    setup() {
        const active = ref("page");
        return () =>
            h("div", { style: "position:fixed;inset-inline:0;bottom:24px;display:flex;justify-content:center" }, [
                h(
                    GlassDock,
                    { fitContent: true, collapsedLabel: "open the dock", class: "press-dock" },
                    {
                        persistent: () => h(DockControl, { shape: "icon", "aria-label": "Theme", onClick: hit("Theme") }, () => "◐"),
                        "persistent-end": () => h(DockControl, { shape: "icon", "aria-label": "Play", onClick: hit("Play") }, () => "▶"),
                        collapsed: () => h("span", "▢"),
                        default: () =>
                            h(
                                DockLayerGroup,
                                { active: active.value, "onUpdate:active": (v: string) => (active.value = v), showSwitcher: false },
                                () => [
                                    h(DockLayer, { id: "pages", label: "Pages" }, () => [
                                        h(DockControl, { "aria-label": "Name", onClick: hit("Name") }, () => "✎"),
                                        h(DockControl, { "aria-label": "Portraits", onClick: hit("Portraits") }, () => "∿"),
                                        h(DockControl, { "aria-label": "Colour", onClick: hit("Colour") }, () => "◍"),
                                        h(DockControl, { compact: true, active: true, "aria-label": "Motion", onClick: hit("Motion") }, () => "▢ Motion ›"),
                                        h(DockControl, { "aria-label": "Book", onClick: hit("Book") }, () => "▤"),
                                    ]),
                                    h(DockLayer, { id: "page", label: "Motion controls" }, () => [
                                        h(DockControl, { shape: "icon", "aria-label": "Pages", onClick: () => (active.value = "pages") }, () => "▢"),
                                        h(DockSeparator),
                                        h(DockControl, { shape: "icon", "aria-label": "Again", onClick: hit("Again") }, () => "↺"),
                                    ]),
                                ],
                            ),
                    },
                ),
            ]);
    },
};
createApp(App).mount("#app");

(window as unknown as { __press: unknown }).__press = {
    presses: () => ({ ...presses }),
    scroller: () => {
        const run = document.querySelector<HTMLElement>(".press-dock .dock-layer--full");
        return run
            ? { scrollLeft: run.scrollLeft, scrollWidth: run.scrollWidth, clientWidth: run.clientWidth }
            : null;
    },
};
