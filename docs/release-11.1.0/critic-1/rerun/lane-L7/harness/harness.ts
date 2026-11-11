// Lane L7 witness harness: HandMark's draw on a compositor property and its `drawn`
// event. One page, chosen by ?scene=. It imports the library by relative source path, so
// the same file runs on the branch and on a v11.0.0 tree. On v11.0.0 there is no `drawn`
// event, so `__drawn` stays empty there.
//
//   ?scene=draw&shape=<shape>  one mark, mounted on demand by `__mount()`, so the probe can
//                              start its screencast first and land a long task mid-draw.
//   ?scene=rest                one mark per shape, mounted at load, for the at-rest look.
import "./harness.css";
import { createApp, defineComponent, h, ref } from "vue";
import { HandMark } from "../../../../src/components/handmark";

const params = new URLSearchParams(location.search);
const scene = params.get("scene") ?? "draw";
const shape = (params.get("shape") ?? "underline") as "underline" | "strike" | "circle" | "highlight";
document.documentElement.classList.toggle("dark", params.get("theme") === "dark");
const w = window as unknown as Record<string, unknown>;
const drawn: number[] = [];
w.__drawn = drawn;

const WORDS: Record<string, string> = {
    underline: "the season",
    strike: "the season",
    highlight: "the season",
    circle: "season",
};

const mounted = ref(false);
w.__mount = () => {
    mounted.value = true;
};

// At `drawn`: is any draw animation still running, and does every line stand at its final
// frame (the window home, the frame home, the ring's dash closed)?
/** A paint marker in the corner: the probe reads its colour off each screencast frame. */
const pm = document.createElement("div");
pm.id = "pm";
document.body.appendChild(pm);
const ctl = document.createElement("div");
ctl.id = "ctl";
document.body.appendChild(ctl);
w.__marker = (c: string) => (pm.style.background = c);

function onDrawn() {
    drawn.push(performance.now());
    pm.style.background = "rgb(0, 200, 0)";
    const host = document.querySelector(".hm");
    const anims = host?.getAnimations({ subtree: true }).filter((a) => {
        const kf = (a.effect as KeyframeEffect | null)?.getKeyframes() ?? [];
        return a.playState === "running" && kf.some((k) => "transform" in k || "strokeDashoffset" in k);
    }) ?? [];
    const home = (el: Element) => {
        const t = getComputedStyle(el).transform;
        return t === "none" || t === "matrix(1, 0, 0, 1, 0, 0)";
    };
    const els = [...(host?.querySelectorAll(".hm-reveal, .hm-mark") ?? [])];
    const guides = [...(host?.querySelectorAll(".hm-guide") ?? [])];
    w.__drawnInfo = {
        epoch: performance.timeOrigin + performance.now(),
        running: anims.length,
        final: els.every(home) && guides.every((g) => parseFloat(getComputedStyle(g).strokeDashoffset) === 0),
    };
}

// The rest scene fixes the colour (a stroke colour, and hue 78 for the band) so the two
// trees differ in nothing but how the mark is drawn.
const REST_COLOR: Record<string, string> = { underline: "#c2410c", strike: "#c2410c", circle: "#c2410c", highlight: "78" };
// `?trigger=in-view&fold=1`: the mark waits two viewports below the fold.
const trigger = params.get("trigger") ?? undefined;
const fold = params.get("fold") === "1";
const mark = (s: string, probe: string, color?: string) =>
    h(
        HandMark,
        { shape: s, seed: 11, "data-probe": probe, onDrawn, ...(color ? { color } : {}), ...(trigger ? { trigger } : {}) },
        () => WORDS[s],
    );

const Draw = defineComponent(() => () =>
    h("div", { class: "scene" }, [
        fold ? h("div", { style: "block-size: 200vh" }) : null,
        h("p", { class: "mark-line", "data-probe": "line" }, ["Plan ", mounted.value ? mark(shape, "mark") : WORDS[shape]]),
        h("span", { class: "spring-probe", "data-probe": "spring" }, "spring"),
    ]),
);

const Rest = defineComponent(() => () =>
    h(
        "div",
        { class: "scene" },
        ["underline", "strike", "highlight", "circle"].map((s) =>
            h("p", { class: "mark-line", "data-probe": `line-${s}` }, ["Plan ", mark(s, `mark-${s}`, REST_COLOR[s])]),
        ),
    ),
);

const raf = window.requestAnimationFrame.bind(window);
createApp(scene === "rest" ? Rest : Draw).mount("#app");
raf(() => raf(() => (w.__ready = true)));
