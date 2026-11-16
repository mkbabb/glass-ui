// Critic 5 probe harness: the dock's run mark where no earlier witness stands.
//   cnav      a COLLAPSIBLE dock (collapse="closed", a #collapsed glyph) whose run marks its
//             current seat: the mark after the dock opens, closes and opens again
//   nav       an open dock; ?both=1 gives each current seat `active` as well as
//             `aria-current` (the way a glyph nav link showed a plate on 11.0.0);
//             ?act=1 marks seat 1 with `active` alone (no seat is current); ?flat=1
//             paints the glyph hover fill flat green;
//             ?grad=1 sets --dock-icon-hover-bg to a gradient; window.__dir / __orient
//             change direction and orientation at runtime
//   mount     a dock mounted on demand from a task, from an animation frame and from a
//             ResizeObserver callback: is the mark there in the frame that first paints it
// ?shape=icon|tab; ?plain=1 leaves the library's own colours. The library is imported by
// relative source path, so the same page runs on the branch and on v11.0.0.
import "./harness.css";
import { createApp, defineComponent, h, nextTick, ref } from "vue";
import { GlassDock, DockControl } from "../../../../../src/components/dock";

const params = new URLSearchParams(location.search);
const scene = params.get("scene") ?? "cnav";
if (params.get("theme") === "dark") document.documentElement.classList.add("dark");
const w = window as unknown as Record<string, unknown>;
const glyph = () => h("svg", { viewBox: "0 0 16 16", width: 16, height: 16, "aria-hidden": "true" }, [h("path", { d: "M2 8h12M8 2v12", stroke: "currentColor", "stroke-width": 2, fill: "none" })]);
const tabs = ["Overview", "Methods", "Results", "Notes"];
const current = ref(1);
const both = params.get("both") === "1";
const act = params.get("act") === "1";
w.__select = (i: number) => (current.value = i);
const icon = params.get("shape") !== "tab";
const seats = (cur: number | null) =>
    tabs.map((label, i) =>
        icon
            ? h(DockControl, { "aria-label": label, "aria-current": !act && cur === i ? "page" : undefined, ...(both || act ? { active: cur === i } : {}), "data-tab": i, onClick: () => (current.value = i) }, glyph)
            : h(DockControl, { shape: "tab", "aria-current": cur === i ? "page" : undefined, "data-tab": i, onClick: () => (current.value = i) }, () => label),
    );
const cls = ["scene", params.get("plain") === "1" ? "" : "mark-probe", params.get("grad") === "1" ? "hover-grad" : "", params.get("flat") === "1" ? "hover-flat" : ""].join(" ");
const docks: Record<string, unknown> = {};
w.__docks = docks;

const CNav = defineComponent(() => () =>
    h("div", { class: cls }, [
        h("div", { "data-probe": "nav", style: "display: inline-block" }, [
            h(GlassDock, { collapse: "closed", backdropMode: "static", ref: (el: unknown) => { if (el) docks.nav = el; } }, { default: () => seats(current.value), collapsed: glyph }),
        ]),
    ]),
);

const orient = ref<"horizontal" | "vertical">((params.get("orientation") ?? "horizontal") as "horizontal");
w.__orient = (o: "horizontal" | "vertical") => (orient.value = o);
w.__dir = (d: string) => (document.documentElement.dir = d);
const Nav = defineComponent(() => () =>
    h("div", { class: cls }, [
        h("div", { "data-probe": "nav", style: "display: inline-block" }, [
            h(GlassDock, { collapse: false, backdropMode: "static", orientation: orient.value }, { default: () => seats(current.value) }),
        ]),
    ]),
);

// Mount a dock with a marked run from <how>, and read the run just before each of the
// next frames paints: a ResizeObserver callback runs after that frame's animation
// callbacks, style and layout, and before its paint.
const show = ref(false);
const Mount = defineComponent(() => () =>
    h("div", { class: cls }, [
        h("p", { style: "margin: 0 0 16px" }, "A page that mounts a dock."),
        h("div", { "data-probe": "sizer", style: "inline-size: 10px; block-size: 10px" }),
        show.value ? h("div", { "data-probe": "nav", style: "display: inline-block" }, [h(GlassDock, { collapse: false, backdropMode: "static" }, { default: () => seats(1) })]) : null,
    ]),
);
const readRun = (at: string) => {
    const run = document.querySelector(".dock-run");
    const cur = document.querySelector('[data-tab="1"]');
    return { at, t: +performance.now().toFixed(1), run: !!run, mark: run?.hasAttribute("data-run-mark") ?? null, before: run ? getComputedStyle(run, "::before").content : null, seatBg: cur ? getComputedStyle(cur).backgroundColor : null };
};
const prePaint = () =>
    new Promise<Record<string, unknown>>((resolve) => {
        const el = document.createElement("div");
        document.body.append(el);
        const ro = new ResizeObserver(() => {
            ro.disconnect();
            el.remove();
            resolve(readRun("before paint"));
        });
        ro.observe(el);
    });
const nextFrame = () => new Promise<void>((r) => requestAnimationFrame(() => r()));
w.__mount = async (how: "task" | "raf" | "ro") => {
    const frames: Record<string, unknown>[] = [];
    const go = async () => { show.value = true; await nextTick(); };
    if (how === "task") { await new Promise<void>((r) => setTimeout(r, 0)); await go(); }
    else if (how === "raf") { await nextFrame(); await go(); }
    else {
        await new Promise<void>((r) => {
            const sizer = document.querySelector<HTMLElement>('[data-probe="sizer"]')!;
            let first = true;
            // The mount lands inside this frame's ResizeObserver step, after its animation
            // callbacks: what the run holds when the flush ends is what this frame paints.
            const ro = new ResizeObserver(() => { if (first) { first = false; sizer.style.inlineSize = "20px"; return; } ro.disconnect(); void go().then(() => { frames.push(readRun("at the end of the mount, inside the observer step")); r(); }); });
            ro.observe(sizer);
        });
    }
    // The frame the dock is first painted in, then the two after it.
    frames.push(await prePaint());
    await nextFrame(); frames.push(await prePaint());
    await nextFrame(); frames.push(await prePaint());
    return frames;
};

const scenes: Record<string, ReturnType<typeof defineComponent>> = { cnav: CNav, nav: Nav, mount: Mount };
createApp(scenes[scene] ?? CNav).mount("#app");
requestAnimationFrame(() => requestAnimationFrame(() => (w.__ready = true)));
