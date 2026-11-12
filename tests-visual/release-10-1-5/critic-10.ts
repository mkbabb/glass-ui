// glass-ui 10.1.5 — critic round 10's probe harness. Scenes: `daraksha` (INBOUND O-193: a fit-content,
// collapse=false GlassDock of four DockControl seats, text tabs or `shape="icon"`, the first current,
// beside a second plate holding page controls and a DarkModeToggle), and `seats` (the O-186/O-187 shape:
// tabs and icons, `?nest=1` wraps the tabs in a consumer's `<div class="dock-run">`, `?current=` marks a
// seat current, `?orientation=vertical`, `?maxw=`, `?backdrop=static`). `?dark=1` and `?dir=rtl` set the
// theme and direction. Reads only. The v1014 arm is this file with its imports pointed at `v1014/`.
import "../../demo/demo.css";
import { createApp, defineComponent, h, type Component } from "vue";

import GlassDock from "../../src/components/dock/GlassDock.vue";
import DockControl from "../../src/components/dock/DockControl.vue";
import DarkModeToggle from "../../src/components/dark-mode-toggle/DarkModeToggle.vue";

const params = new URLSearchParams(location.search);
const scene = params.get("scene") ?? "";
const w = window as unknown as Record<string, unknown>;
if (params.get("dir")) document.documentElement.dir = params.get("dir")!;
try {
    localStorage.setItem("vueuse-color-scheme", params.get("dark") === "1" ? "dark" : "light");
} catch {}
if (params.get("dark") === "1") document.documentElement.classList.add("dark");

const glyph = () =>
    h("svg", { viewBox: "0 0 24 24", width: 24, height: 24, "aria-hidden": "true" }, [
        h("circle", { cx: 12, cy: 12, r: 8, fill: "none", stroke: "currentColor", "stroke-width": 2 }),
    ]);

const scenes: Record<string, Component> = {
    daraksha: defineComponent(() => {
        const icon = params.get("shape") === "icon";
        const labels = ["Home", "Work", "Notes", "About"];
        return () =>
            h(
                "div",
                {
                    "data-witness": "stage",
                    style: "display:flex;flex-wrap:wrap;justify-content:center;align-items:flex-start;gap:12px;padding:16px 8px;min-block-size:240px",
                },
                [
                    h(
                        GlassDock,
                        {
                            fitContent: true,
                            collapse: false,
                            backdropMode: params.get("backdrop") === "static" ? "static" : undefined,
                            "data-witness": "tabs-dock",
                            ref: (d: unknown) => (w.__dock = d),
                        },
                        {
                            default: () =>
                                labels.map((l, i) =>
                                    icon
                                        ? h(DockControl, { shape: "icon", "aria-label": l, "data-witness": `S${i + 1}`, "aria-current": i === 0 ? "page" : undefined }, glyph)
                                        : h(DockControl, { shape: "tab", "data-witness": `S${i + 1}`, "aria-current": i === 0 ? "page" : undefined }, () => [glyph(), h("span", l)]),
                                ),
                            collapsed: () => h("span", glyph()),
                        },
                    ),
                    h(
                        GlassDock,
                        { fitContent: true, collapse: false, "data-witness": "ctl-dock" },
                        {
                            default: () => [
                                h(DockControl, { "aria-label": "Prev", "data-witness": "C1" }, glyph),
                                h(DockControl, { "aria-label": "Next", "data-witness": "C2" }, glyph),
                                h(DarkModeToggle, { size: "dock", "data-witness": "C3" }),
                            ],
                            collapsed: () => h("span", glyph()),
                        },
                    ),
                ],
            );
    }),

    seats: defineComponent(() => {
        const orientation = (params.get("orientation") ?? "horizontal") as "horizontal" | "vertical";
        const kinds = (params.get("kinds") ?? "tab:Overview,tab:Methods,tab:Results,icon,icon").split(",");
        const current = Number(params.get("current") ?? 0);
        const nest = params.get("nest") === "1";
        const seat = (k: string, i: number) =>
            k.startsWith("tab:")
                ? h(DockControl, { shape: "tab", "data-witness": `S${i + 1}`, "aria-current": current === i + 1 ? "page" : undefined }, () => [glyph(), h("span", k.slice(4))])
                : h(DockControl, { "aria-label": `S${i + 1}`, "data-witness": `S${i + 1}`, "aria-current": current === i + 1 ? "page" : undefined }, glyph);
        const list = () => {
            const seats = kinds.map(seat);
            if (!nest) return seats;
            const tabs = kinds.flatMap((k, i) => (k.startsWith("tab:") ? [seats[i]] : []));
            const out = seats.filter((_, i) => !kinds[i]!.startsWith("tab:"));
            const at = kinds.findIndex((k) => k.startsWith("tab:"));
            out.splice(at, 0, h("div", { class: "dock-run", "data-witness": "nest", style: orientation === "vertical" ? "display:flex;flex-direction:column;gap:8px" : "display:flex;gap:8px" }, tabs));
            return out;
        };
        return () =>
            h(
                "div",
                {
                    "data-witness": "stage",
                    style:
                        orientation === "vertical"
                            ? `display:flex;padding:16px;block-size:${params.get("stageH") ?? "600"}px`
                            : "display:flex;justify-content:center;align-items:flex-start;padding:16px 0;min-block-size:240px",
                },
                [
                    h(
                        GlassDock,
                        {
                            fitContent: params.get("fit") !== "0",
                            collapse: params.get("collapse") === "closed" ? "closed" : false,
                            orientation,
                            backdropMode: params.get("backdrop") === "static" ? "static" : undefined,
                            style: params.get("maxw") ? `max-inline-size:${params.get("maxw")}px` : undefined,
                            ref: (d: unknown) => (w.__dock = d),
                        },
                        { default: list, collapsed: () => h("span", glyph()) },
                    ),
                ],
            );
    }),
};

const Scene = scenes[scene];
if (!Scene) throw new Error(`unknown scene "${scene}"`);
createApp(Scene).mount("#app");
w.__ready = true;
