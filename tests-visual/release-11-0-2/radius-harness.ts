// An open `backdrop-mode="static"` GlassDock on one flat ground, its seats' ink hidden so
// a screenshot shows each seat's plate alone: a dropdown DockTrigger ("Home") at rest and
// one active ("Paper"), a tab DockControl ("Week") at rest and one active ("Day"), a
// labelled DockControl at rest and one active, and an icon DockControl active. Each seat
// carries `data-seat`. `?theme=dark` for the dark scheme. Imports are relative to `src/`,
// so the file mounts unchanged on an older tree.
import "../../demo/demo.css";
import { createApp, h } from "vue";

import GlassDock from "../../src/components/dock/GlassDock.vue";
import DockControl from "../../src/components/dock/DockControl.vue";
import DockTrigger from "../../src/components/dock/DockTrigger.vue";
import DropdownMenu from "../../src/components/menu/DropdownMenu.vue";

if (new URLSearchParams(location.search).get("theme") === "dark") document.documentElement.classList.add("dark");
document.body.style.cssText = "margin:0;min-height:100vh;background:#3a2f28";

const style = document.createElement("style");
style.textContent = `
    .radius-dock [data-seat], .radius-dock [data-seat] * { color: transparent !important; }
    .radius-dock [data-seat] svg { visibility: hidden; }
    .radius-dock [data-seat]::before, .radius-dock [data-seat]::after { visibility: hidden; }
`;
document.head.append(style);

const trigger = (label: string, kind: string, active = false) =>
    h(DropdownMenu, { modal: false }, () => [
        h(DockTrigger, { for: "dropdown", "aria-label": label, "data-seat": kind, class: active ? "is-active" : undefined }, () => label),
    ]);

createApp({
    setup: () => () =>
        h("div", { style: "position:fixed;inset-inline:0;bottom:24px;display:flex;justify-content:center" }, [
            h(GlassDock, { backdropMode: "static", collapse: false, class: "radius-dock" }, {
                default: () => [
                    trigger("Home", "trigger"),
                    trigger("Paper", "trigger-active", true),
                    h(DockControl, { shape: "tab", "aria-label": "Week", "data-seat": "tab" }, () => "Week"),
                    h(DockControl, { shape: "tab", active: true, "aria-label": "Day", "data-seat": "tab-active" }, () => "Day"),
                    h(DockControl, { "aria-label": "Motion", "data-seat": "label" }, () => [h("span", null, "▢"), h("span", null, "Motion")]),
                    h(DockControl, { active: true, "aria-label": "Studio", "data-seat": "label-active" }, () => [h("span", null, "▢"), h("span", null, "Studio")]),
                    h(DockControl, { active: true, "aria-label": "Home icon", "data-seat": "icon-active" }, () => h("span", null, "⌂")),
                ],
            }),
        ]),
}).mount("#app");
document.body.dataset.ready = "1";
