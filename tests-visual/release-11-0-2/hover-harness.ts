// A GlassDock carrying every seat type, for the hover-shift reading:
// an icon DockControl, a DockControl with a label, a compact one, a tab-shaped one, a
// DockControl inside a Tooltip, a DockTrigger (dropdown), a DockBackgroundToggle, a
// slotted <button> and a slotted <a>; one icon DockControl in `#persistent` and one in
// `#persistent-end`, plus a popover DockTrigger with a text label (the size of fourier's
// wordmark trigger, with its `--dock-trigger-min-height: var(--dock-control-size)`) and a
// DarkModeToggle. Each seat carries `data-seat="<kind>"`.
//   ?site=daraksha          daraksha's pair instead: two `fit-content` docks side by side
//                           in a grid, one of tab seats (one active), one of a
//                           DarkModeToggle
//   ?orientation=vertical   a vertical dock (default horizontal)
//   ?shape=pill|rounded|card
//   ?posture=collapsed      the dock rests collapsed (`expandOn="press"`, so a hover
//                           does not open it); default expanded (`collapse=false`)
// The dock sits fixed at the bottom (the right edge for a vertical dock) of a page with
// content above it, so its box is what a site's dock is. Imports are relative to `src/`,
// so the file mounts unchanged on an older tree.
import "../../demo/demo.css";
import { createApp, h } from "vue";

import GlassDock from "../../src/components/dock/GlassDock.vue";
import DockControl from "../../src/components/dock/DockControl.vue";
import DockTrigger from "../../src/components/dock/DockTrigger.vue";
import DockBackgroundToggle from "../../src/components/dock/DockBackgroundToggle.vue";
import DropdownMenu from "../../src/components/menu/DropdownMenu.vue";
import Popover from "../../src/components/popover/Popover.vue";
import DarkModeToggle from "../../src/components/dark-mode-toggle/DarkModeToggle.vue";
import Tooltip from "../../src/components/tooltip/Tooltip.vue";
import TooltipProvider from "../../src/components/tooltip/TooltipProvider.vue";

const q = new URLSearchParams(location.search);
const vertical = q.get("orientation") === "vertical";
const shape = (q.get("shape") ?? "pill") as "pill" | "rounded" | "card";
const collapsed = q.get("posture") === "collapsed";
const daraksha = q.get("site") === "daraksha";
if (q.get("theme") === "dark") document.documentElement.classList.add("dark");
document.body.style.cssText = "margin:0;min-height:100vh;background:var(--background)";

const seat = (kind: string) => ({ "data-seat": kind });
const glyph = (s: string) => h("span", { "aria-hidden": "true" }, s);

const seats = () => [
    h(DockControl, { "aria-label": "Home", ...seat("icon") }, () => glyph("⌂")),
    h(DockControl, { "aria-label": "Motion", ...seat("label") }, () => [glyph("▢"), h("span", null, "Motion")]),
    h(DockControl, { compact: true, "aria-label": "Compact", ...seat("compact") }, () => glyph("▣")),
    h(DockControl, { shape: "tab", "aria-label": "Week", ...seat("tab") }, () => "Week"),
    h(Tooltip, { text: "Search" }, () => [h(DockControl, { "aria-label": "Search", ...seat("tooltip") }, () => glyph("⌕"))]),
    h(DropdownMenu, { modal: false }, () => [h(DockTrigger, { for: "dropdown", "aria-label": "Speed", ...seat("trigger") }, () => "1×")]),
    h(DockBackgroundToggle, seat("background")),
    h("button", { type: "button", "aria-label": "Slotted button", ...seat("button") }, "B"),
    h("a", { href: "#a", "aria-label": "Slotted link", ...seat("link") }, "L"),
    h(Popover, null, () => [
        h(DockTrigger, { for: "popover", "aria-label": "About", style: "--dock-trigger-min-height: var(--dock-control-size)", ...seat("popover") }, () => "Fourier analysis"),
    ]),
    h(DarkModeToggle, seat("dark-mode")),
];

const darakshaPair = () =>
    h("div", { style: "position:fixed;inset-inline:16px;bottom:24px;display:grid;grid-template-columns:auto auto;justify-content:center;align-items:center;gap:8px" }, [
        h(GlassDock, { fitContent: true, collapse: false, "data-witness": "dock" }, () =>
            ["Home", "Work", "About", "Contact"].map((label, i) =>
                h(DockControl, { shape: "tab", active: i === 0, "aria-label": label, ...seat(`tab-${i}`) }, () => label),
            ),
        ),
        h(GlassDock, { fitContent: true, collapse: false, "data-witness": "dock-2" }, () => [h(DarkModeToggle, seat("dark-mode"))]),
    ]);

createApp({
    setup: () => () =>
        h(TooltipProvider, null, () => daraksha ? h("div", { style: "min-block-size:100vh" }, [darakshaPair()]) : h("div", { style: "min-block-size:100vh" }, [
            h("p", { style: "padding:24px;font:16px system-ui" }, "Page content above the dock."),
            h(
                "div",
                {
                    style: vertical
                        ? "position:fixed;inset-block:24px;inset-inline-end:24px;display:flex;align-items:center"
                        : "position:fixed;inset-inline:0;bottom:24px;display:flex;justify-content:center",
                },
                [
                    h(
                        GlassDock,
                        {
                            orientation: vertical ? "vertical" : "horizontal",
                            shape,
                            collapse: collapsed ? "closed" : false,
                            expandOn: "press",
                            "data-witness": "dock",
                        },
                        {
                            persistent: () => [h(DockControl, { "aria-label": "Lead", ...seat("persistent") }, () => glyph("◆"))],
                            collapsed: () => [glyph("·")],
                            default: seats,
                            "persistent-end": () => [h(DockControl, { "aria-label": "End", ...seat("persistent-end") }, () => glyph("◇"))],
                        },
                    ),
                ],
            ),
        ])),
}).mount("#app");
document.body.dataset.ready = "1";
