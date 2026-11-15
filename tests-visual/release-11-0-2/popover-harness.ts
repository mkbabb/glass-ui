// A collapsible GlassDock at the page's foot with a click Popover in its own slot
// content, `keep-dock-open`, its content teleported to the body. `window.__dock` is the
// dock's exposed handle. Imports are relative to `src/`, so the file mounts unchanged on
// an older tree.
import "../../demo/demo.css";
import { createApp, h, ref } from "vue";

import GlassDock from "../../src/components/dock/GlassDock.vue";
import DockControl from "../../src/components/dock/DockControl.vue";
import Popover from "../../src/components/popover/Popover.vue";
import PopoverContent from "../../src/components/popover/PopoverContent.vue";
import PopoverTrigger from "../../src/components/popover/PopoverTrigger.vue";

document.body.style.cssText = "margin:0;min-height:100vh";

const dock = ref<{ expanded: boolean; collapse: () => void } | null>(null);
(window as unknown as { __dock: () => unknown }).__dock = () => dock.value;

createApp({
    setup: () => () =>
        h("div", { style: "position:fixed;inset-inline:0;bottom:24px;display:flex;justify-content:center" }, [
            h(
                GlassDock,
                { ref: dock, collapse: "closed", class: "pop-dock" },
                {
                    default: () => [
                        h(DockControl, { "aria-label": "Home", active: true }, () => "⌂"),
                        h(Popover, { keepDockOpen: true }, () => [
                            h(PopoverTrigger, { asChild: true }, () =>
                                h(DockControl, { "aria-label": "Share" }, () => "⇪"),
                            ),
                            h(PopoverContent, { side: "top", class: "pop-content" }, () =>
                                h("p", { style: "margin:0;padding:8px" }, "Share panel"),
                            ),
                        ]),
                        h(DockControl, { "aria-label": "Settings" }, () => "⚙"),
                    ],
                    collapsed: () => h("span", "Dock"),
                },
            ),
        ]),
}).mount("#app");
document.body.dataset.ready = "1";
