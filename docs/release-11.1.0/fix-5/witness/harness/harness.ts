// Fix 5 witness harness: the dock's navigation run, glyph or tab seats (?scene=nav), and a
// dock that mounts on demand (?scene=mountdock). The library is imported by relative
// source path, so the same page runs on the branch, the pre-fix tree and v11.0.0.
import "./harness.css";
import { createApp, defineComponent, h, nextTick, ref } from "vue";
import { GlassDock, DockControl } from "../../../../../src/components/dock";

const params = new URLSearchParams(location.search);
const scene = params.get("scene") ?? "nav";
if (params.get("theme") === "dark") document.documentElement.classList.add("dark");
const w = window as unknown as Record<string, unknown>;

const tabs = ["Overview", "Methods", "Results", "Notes"];
const glyph = () => h("svg", { viewBox: "0 0 16 16", width: 16, height: 16, "aria-hidden": "true" }, [h("path", { d: "M2 8h12M8 2v12", stroke: "currentColor", "stroke-width": 2, fill: "none" })]);

// ?shape=icon (glyph seats) | tab; ?plain=1 (the library's own selected colour).
const current = ref(1);
w.__select = (i: number) => (current.value = i);
const NavScene = defineComponent(() => () =>
    h("div", { class: params.get("plain") === "1" ? "scene" : "scene mark-probe" }, [
        h("div", { "data-probe": "nav", style: "display: inline-block" }, [
            h(GlassDock, { collapse: false, backdropMode: "static" }, {
                default: () =>
                    tabs.map((label, i) =>
                        params.get("shape") === "icon"
                            ? h(DockControl, { "aria-label": label, "aria-current": current.value === i ? "page" : undefined, "data-tab": i, onClick: () => (current.value = i) }, glyph)
                            : h(DockControl, { shape: "tab", "aria-current": current.value === i ? "page" : undefined, "data-tab": i, onClick: () => (current.value = i) }, () => label),
                    ),
            }),
        ]),
    ]),
);

// ?marked=0 leaves `aria-current` off every seat; ?shape=icon for glyph seats.
const MountDockScene = defineComponent(() => {
    const show = ref(false);
    const marked = params.get("marked") !== "0";
    w.__mountDock = async () => { performance.mark("f5-mount-start"); show.value = true; await nextTick(); performance.mark("f5-mount-end"); };
    return () =>
        h("div", { class: "scene mark-probe" }, [
            h("p", { style: "margin: 0 0 16px" }, "A page that mounts a dock."),
            show.value
                ? h("div", { "data-probe": "nav", style: "display: inline-block" }, [
                      h(GlassDock, { collapse: false, backdropMode: "static" }, {
                          default: () => tabs.map((label, i) => params.get("shape") === "icon"
                              ? h(DockControl, { "aria-label": label, "aria-current": marked && i === 1 ? "page" : undefined, "data-tab": i }, glyph)
                              : h(DockControl, { shape: "tab", "aria-current": marked && i === 1 ? "page" : undefined, "data-tab": i }, () => label)),
                      }),
                  ])
                : null,
        ]);
});

const scenes: Record<string, ReturnType<typeof defineComponent>> = { nav: NavScene, mountdock: MountDockScene };
createApp(scenes[scene] ?? NavScene).mount("#app");
requestAnimationFrame(() => requestAnimationFrame(() => (w.__ready = true)));
