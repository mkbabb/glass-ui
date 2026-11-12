// glass repro for O-193 / O-205 (see dock-cutcap.html). Glass's own styles and
// components only.
import "./dock-cutcap.css";
import { createApp, h } from "vue";
import { DockControl, DockLayer, DockLayerGroup, GlassDock } from "@glass/components/dock";

// `?active=page` opens on the narrow layer (the site's Motion: its face is narrower than the
// inactive pages face, so the run overflows); `?end=1` adds a #persistent-end seat (Motion's Play).
const q = new URLSearchParams(location.search);
const active = q.get("active") === "page" ? "page" : "pages";
const end = q.get("end") === "1";

const Repro = {
    setup() {
        return () =>
            h("div", { style: "position:fixed;inset-inline:0;bottom:24px;display:flex;justify-content:center" }, [
                h(
                    GlassDock,
                    { fitContent: true, collapsedLabel: "open the dock", class: "repro-dock" },
                    {
                        persistent: () => h(DockControl, { "aria-label": "Theme" }, () => "◐"),
                        ...(end ? { "persistent-end": () => h(DockControl, { "aria-label": "Play" }, () => "▷") } : {}),
                        collapsed: () => h("span", "✎"),
                        default: () =>
                            h(DockLayerGroup, { active, showSwitcher: false }, () => [
                                h(DockLayer, { id: "pages", label: "Pages" }, () => [
                                    h(DockControl, { compact: true, active: true, "aria-label": "Name", class: "seat" }, () => "✎ Name ›"),
                                    h(DockControl, { "aria-label": "Colour", class: "seat" }, () => "◍"),
                                    h(DockControl, { "aria-label": "Motion", class: "seat" }, () => "▢"),
                                ]),
                                h(DockLayer, { id: "page", label: "Controls" }, () => [h(DockControl, { "aria-label": "Pages" }, () => "←")]),
                            ]),
                    },
                ),
            ]);
    },
};

// `?radius-dock=1.875rem` retunes glass's own dock corner token, as the site does,
// to tell glass's defect from that one setting.
const radius = q.get("radius-dock");
if (radius) document.documentElement.style.setProperty("--radius-dock", radius);

createApp(Repro).mount("#repro");

/** What the defects are, read off the painted boxes. */
function read() {
    const dock = document.querySelector<HTMLElement>(".repro-dock");
    const seat = document.querySelector<HTMLElement>(".seat");
    if (!dock || !seat) return;
    const cs = getComputedStyle(dock);
    const corners = [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomRightRadius, cs.borderBottomLeftRadius];
    const sr = seat.getBoundingClientRect();
    const plate = dock.querySelector<HTMLElement>(".dock-plate");
    const run = dock.querySelector<HTMLElement>(".dock-run");
    const pcs = plate ? getComputedStyle(plate) : null;
    document.getElementById("readout")!.textContent = JSON.stringify(
        { glass: "see package.json", active, end, collapsed: dock.classList.contains("collapsed"), corners, plateCorners: pcs ? [pcs.borderTopLeftRadius, pcs.borderTopRightRadius, pcs.borderBottomRightRadius, pcs.borderBottomLeftRadius] : null, runOverflow: run ? run.scrollWidth - run.clientWidth : null, plateClip: plate ? getComputedStyle(plate).clipPath : null, seat: { w: sr.width, h: sr.height, radius: getComputedStyle(seat).borderTopLeftRadius } },
        null,
        1,
    );
}
setInterval(read, 500);
