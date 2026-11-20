// Lane L6 witness harness: the dock follow-through. One page, four scenes, chosen by
// ?scene=. It imports the library by relative source path, so the same file runs on the
// branch and on a v11.0.0 tree, and the probe reads the same DOM on both.
//
//   face     a collapsed dock whose collapsed face is its persistent seat(s)
//            (?case=lead | trail | both)                                      O-194
//   gap      open docks with leading, trailing and both persistent regions
//            (?orient=h | v)                                                  O-197
//   prm      a collapsible dock with a summary and a two-face layer group      O-198
//   capsule  every resting posture, and a morphing dock (?host=bar sets
//            --radius-dock: 1rem on the host)                                 O-199
import "./harness.css";
import { createApp, defineComponent, h, ref, type Component } from "vue";
import { GlassDock, DockControl, DockLayerGroup, DockLayer } from "../../../../src/components/dock";

const params = new URLSearchParams(location.search);
const scene = params.get("scene") ?? "face";
const html = document.documentElement;
if (params.get("theme") === "dark") html.classList.add("dark");

type Win = Record<string, unknown>;
const win = window as unknown as Win;

const glyph = (d = "M2 8h12M8 2v12") =>
    h("svg", { viewBox: "0 0 16 16", width: 16, height: 16, "aria-hidden": "true", class: "glyph" }, [
        h("path", { d, stroke: "currentColor", "stroke-width": 2, fill: "none" }),
    ]);

const runControls = (n: number, prefix = "Item") =>
    Array.from({ length: n }, (_, i) =>
        h(DockControl, { "aria-label": `${prefix} ${i + 1}`, "data-seat": `run-${i}` }, () => glyph()),
    );

// The theme toggle: its own glyph, its own name, its own aria-pressed, and a press that
// flips the page's scheme.
const dark = ref(html.classList.contains("dark"));
const presses = ref(0);
win.__presses = () => presses.value;
const themeToggle = (key: string) =>
    h(
        DockControl,
        {
            "aria-label": "Dark theme",
            active: dark.value,
            "data-seat": key,
            onClick: () => {
                presses.value++;
                dark.value = !dark.value;
                html.classList.toggle("dark", dark.value);
            },
        },
        () => (dark.value ? glyph("M8 2a6 6 0 1 0 6 6 4 4 0 0 1-6-6z") : glyph("M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8z")),
    );
const pinned = ref(false);
const pinToggle = () =>
    h(
        DockControl,
        { "aria-label": "Pin", active: pinned.value, "data-seat": "pin", onClick: () => (pinned.value = !pinned.value) },
        () => glyph("M8 2v8M4 10h8M8 10v4"),
    );

const docks: Record<string, unknown> = {};
win.__docks = docks;
const bind = (key: string) => (el: unknown) => {
    if (el) docks[key] = el;
};

// ── O-194 · the persistent seat is the collapsed face ─────────────────────────────
const Face = defineComponent(() => () => {
    const kase = params.get("case") ?? "lead";
    const slots: Record<string, () => unknown> = { default: () => runControls(4) };
    if (kase === "lead") slots.persistent = () => themeToggle("theme");
    if (kase === "trail") slots["persistent-end"] = () => themeToggle("theme");
    if (kase === "both") {
        slots.persistent = () => themeToggle("theme");
        slots["persistent-end"] = () => pinToggle();
    }
    return h("div", { class: "scene" }, [
        h("div", { "data-probe": "face" }, [
            h(GlassDock, { collapse: "closed", backdropMode: "static", ref: bind("face") }, slots),
        ]),
        h("button", { "data-probe": "after", style: "margin-top:8px" }, "After the dock"),
    ]);
});

// ── O-197 · the trailing persistent gap ───────────────────────────────────────────
const Gap = defineComponent(() => () => {
    const orientation = params.get("orient") === "v" ? "vertical" : "horizontal";
    const dock = (key: string, lead: boolean, trail: boolean) => {
        const slots: Record<string, () => unknown> = { default: () => runControls(4, key) };
        if (lead) slots.persistent = () => h(DockControl, { "aria-label": `${key} lead`, "data-seat": "lead" }, () => glyph());
        if (trail)
            slots["persistent-end"] = () =>
                h(DockControl, { "aria-label": `${key} trail`, "data-seat": "trail" }, () => glyph());
        return h("div", { "data-probe": key }, [
            h(GlassDock, { collapse: false, backdropMode: "static", orientation }, slots),
        ]);
    };
    return h("div", { class: "scene" }, [
        h("div", { class: "row" }, [dock("lead", true, false), dock("trail", false, true), dock("both", true, true)]),
    ]);
});

// ── O-198 · reduced motion on the dock ────────────────────────────────────────────
const face = ref("one");
win.__face = (id: string) => (face.value = id);
const Prm = defineComponent(() => () =>
    h("div", { class: "scene" }, [
        h("div", { "data-probe": "prm" }, [
            h(GlassDock, { collapse: "closed", backdropMode: "static", ref: bind("prm") }, {
                default: () =>
                    h(
                        DockLayerGroup,
                        { active: face.value, "onUpdate:active": (v: string) => (face.value = v), showSwitcher: false },
                        () => [
                            h(DockLayer, { id: "one", label: "One" }, () => runControls(3, "One")),
                            h(DockLayer, { id: "two", label: "Two" }, () => runControls(5, "Two")),
                        ],
                    ),
                collapsed: () => glyph(),
                persistent: () => h(DockControl, { "aria-label": "Play", "data-seat": "play" }, () => glyph("M5 3l8 5-8 5z")),
            }),
        ]),
    ]),
);

// ── O-199 · the dock rests as a capsule ───────────────────────────────────────────
const Capsule = defineComponent(() => () => {
    const hostStyle = params.get("host") === "bar" ? "--radius-dock: 1rem" : "";
    const dock = (key: string, props: Record<string, unknown>, slots: Record<string, () => unknown>) =>
        h("div", { "data-probe": key, style: hostStyle }, [
            h(GlassDock, { backdropMode: "static", ref: bind(key), ...props }, slots),
        ]);
    const wideFace = () =>
        h("span", { style: "display:inline-flex;align-items:center;gap:4px;font-variant-numeric:tabular-nums" }, [
            glyph(),
            h("span", "Now 12"),
        ]);
    const seat = (label: string) => () => h(DockControl, { "aria-label": label }, () => glyph());
    const vertical = { orientation: "vertical" };
    return h("div", { class: "scene" }, [
        h("div", { class: "row" }, [
            dock("open-h", { collapse: false }, { default: () => runControls(5) }),
            dock("open-h-persist", { collapse: false }, { default: () => runControls(4), persistent: seat("Lead") }),
            dock("col-square", { collapse: "closed" }, { default: () => runControls(4), collapsed: () => glyph() }),
            dock("col-two", { collapse: "closed" }, {
                default: () => runControls(4),
                collapsed: () => glyph(),
                persistent: seat("Lead"),
            }),
            dock("col-wide", { collapse: "closed" }, { default: () => runControls(4), collapsed: wideFace }),
            dock("col-persist", { collapse: "closed" }, { default: () => runControls(4), persistent: seat("Lead") }),
            dock("col-persist-both", { collapse: "closed" }, {
                default: () => runControls(4),
                persistent: seat("Lead"),
                "persistent-end": seat("Trail"),
            }),
            dock("morph", { collapse: "closed" }, { default: () => runControls(5), collapsed: () => glyph() }),
        ]),
        h("div", { class: "row" }, [
            dock("open-v", { collapse: false, ...vertical }, { default: () => runControls(4) }),
            dock("col-v", { collapse: "closed", ...vertical }, { default: () => runControls(4), collapsed: () => glyph() }),
            dock("col-v-persist", { collapse: "closed", ...vertical }, { default: () => runControls(4), persistent: seat("Lead") }),
        ]),
    ]);
});

const scenes: Record<string, Component> = { face: Face, gap: Gap, prm: Prm, capsule: Capsule };
createApp(scenes[scene] ?? Face).mount("#app");
win.__ready = true;
