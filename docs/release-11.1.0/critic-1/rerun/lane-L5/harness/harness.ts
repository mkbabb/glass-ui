// Lane L5 witness harness. One page, one scene per item, chosen by ?scene=. The same file
// runs on the branch and on a v11.0.0 tree (it imports the library by relative source
// path), so the probe reads the same DOM on both. On v11.0.0 HandMark has no `trigger`
// prop, so Vue passes it through as a plain attribute and the mark behaves as it did.
import "./harness.css";
import { createApp, defineComponent, h } from "vue";
import { HandMark } from "../../../../src/components/handmark";

const params = new URLSearchParams(location.search);
const scene = params.get("scene") ?? "heading";
if (params.get("theme") === "dark") document.documentElement.classList.add("dark");
else document.documentElement.classList.remove("dark");
const w = window as unknown as Record<string, unknown>;

// The heading register: a wrapped hero phrase (underline), a section highlight, a body
// underline, each with no colour given, plus the probes the reader compares against.
const Heading = defineComponent(() => () =>
    h("div", { class: "scene" }, [
        h("h1", { class: "hero", "data-probe": "hero" }, [
            "Plan the ",
            h(HandMark, { shape: "underline", "data-probe": "hero-mark" }, () => "whole quiet season"),
        ]),
        h("h2", { class: "section", "data-probe": "section" }, [
            "Then ",
            h(HandMark, { shape: "highlight", "data-probe": "section-mark" }, () => "mark the headers"),
        ]),
        h("p", { class: "body", "data-probe": "body" }, [
            "and the ",
            h(HandMark, { shape: "underline", "data-probe": "body-mark" }, () => "body text"),
            " too.",
        ]),
        h("span", { class: "focal-probe", "data-probe": "focal" }, "focal"),
        h("span", { class: "spring-probe", "data-probe": "spring" }, "spring"),
    ]),
);

// O-190: a mark mounted two viewports below the fold, with trigger="in-view".
const Fold = defineComponent(() => () =>
    h("div", { class: "scene" }, [
        h("p", { class: "body" }, "Top of the page."),
        h("div", { class: "fold" }),
        h("h2", { class: "section", "data-probe": "below" }, [
            "Below the ",
            h(
                HandMark,
                { shape: "underline", trigger: "in-view", retrigger: params.get("retrigger") === "1", "data-probe": "below-mark" },
                () => "fold line",
            ),
        ]),
        h("div", { class: "fold" }),
    ]),
);

const scenes: Record<string, ReturnType<typeof defineComponent>> = { heading: Heading, fold: Fold };
const raf = window.requestAnimationFrame.bind(window);
createApp(scenes[scene] ?? Heading).mount("#app");
raf(() => raf(() => (w.__ready = true)));
