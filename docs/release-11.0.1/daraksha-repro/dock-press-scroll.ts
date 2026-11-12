// glass repro (integrate seat, 2026-11-11): a quick press on a seat of the
// active layer misses under reduced motion. The layer's scroller
// (`.dock-layer--full`, overflow auto) rests scrolled (scrollLeft 24 on the
// site), and the press zeroes it at once, so the seat moves out from under the
// pointer between pointerdown and pointerup; the click lands on the face.
// Glass's own styles and components only, shaped like the site's Motion dock.
import "./dock-cutcap.css";
import { createApp, h, ref } from "vue";
import { DockControl, DockLayer, DockLayerGroup, DockSeparator, GlassDock } from "@glass/components/dock";

const presses = ref(0);
const Repro = {
    setup() {
        const active = ref("page");
        return () =>
            h("div", { style: "position:fixed;inset-inline:0;bottom:24px;display:flex;justify-content:center" }, [
                h(
                    GlassDock,
                    { fitContent: true, collapsedLabel: "open the dock", class: "repro-dock" },
                    {
                        persistent: () => h(DockControl, { shape: "icon", "aria-label": "Theme" }, () => "◐"),
                        "persistent-end": () => h(DockControl, { shape: "icon", "aria-label": "Play" }, () => "▶"),
                        collapsed: () => h("span", "▢"),
                        default: () =>
                            h(DockLayerGroup, { active: active.value, "onUpdate:active": (v: string) => (active.value = v), showSwitcher: false }, () => [
                                h(DockLayer, { id: "pages", label: "Pages" }, () => [
                                    h(DockControl, { "aria-label": "Name" }, () => "✎"),
                                    h(DockControl, { "aria-label": "Portraits" }, () => "∿"),
                                    h(DockControl, { "aria-label": "Colour" }, () => "◍"),
                                    h(DockControl, { compact: true, active: true, "aria-label": "Motion" }, () => "▢ Motion ›"),
                                    h(DockControl, { "aria-label": "Book" }, () => "▤"),
                                ]),
                                h(DockLayer, { id: "page", label: "Motion controls" }, () => [
                                    h(DockControl, { shape: "icon", "aria-label": "Pages", onClick: () => (active.value = "pages") }, () => "▢"),
                                    h(DockSeparator),
                                    h(DockControl, { shape: "icon", "aria-label": "Again", onClick: () => presses.value++ }, () => "↺"),
                                ]),
                            ]),
                    },
                ),
            ]);
    },
};
createApp(Repro).mount("#repro");

function read() {
    const run = document.querySelector<HTMLElement>(".repro-dock .dock-layer--full");
    document.getElementById("readout")!.textContent = JSON.stringify({ presses: presses.value, scrollLeft: run?.scrollLeft ?? null, scrollWidth: run?.scrollWidth ?? null, clientWidth: run?.clientWidth ?? null });
}
setInterval(read, 100);
