// glass-ui 10.1.4 — the engine witnesses' harness for sci-report O-119 (g) and the
// `@page` half of (f). One page, one scene per `?scene=`, the real library components
// from `src/` under the demo's own cascade (which imports the library's main
// stylesheet, `src/styles/index.css`). Imports are relative to `src/`, so the same file
// mounts unchanged on a 10.1.3 tree: that is how each witness is shown RED on 10.1.3
// and GREEN on 10.1.4.
import "../../demo/demo.css";
import { createApp, defineComponent, h, type Component } from "vue";

import DataTable from "../../src/components/data-table/DataTable.vue";
import { DeckSlide, DeckStage, useDeck } from "../../src/components/deck";

const params = new URLSearchParams(location.search);
const scene = params.get("scene") ?? "";
const w = window as unknown as Record<string, unknown>;

const columns = [
    { key: "name", label: "Name" },
    { key: "kind", label: "Kind" },
    { key: "year", label: "Year" },
];
const rows = [
    { _id: "1", name: "Ada", kind: "engine", year: 1843 },
    { _id: "2", name: "Grace", kind: "compiler", year: 1952 },
    { _id: "3", name: "Edsger", kind: "semaphore", year: 1965 },
];

const scenes: Record<string, Component> = {
    // Gregg's FindingsTable shape: a responsive DataTable (card breakpoint 640) in a box
    // of a fixed width, `?width=` px (default 390, a phone). Nothing resizes after
    // mount, so the projection runs on the platform's first observation or never.
    table: defineComponent(() => {
        const width = Number(params.get("width") ?? 390);
        return () =>
            h("div", { "data-witness": "host", style: `inline-size:${width}px` }, [
                h(DataTable, { columns, rows, responsive: true }),
            ]);
    }),
    // A page that prints and carries no deck: an article, as Gregg's records view.
    "print-plain": defineComponent(
        () => () =>
            h("article", { style: "padding:24px;max-inline-size:60ch" }, [
                h("h1", "Records"),
                h("p", "A page without a deck prints on the reader's own paper."),
            ]),
    ),
    // A two-slide deck, the stage the page's only content (a presentation route).
    "print-deck": defineComponent(() => {
        const deck = useDeck(2);
        return () =>
            h(DeckStage, { deck, ariaLabel: "witness deck" }, () =>
                [0, 1].map((index) =>
                    h(DeckSlide, { index }, () => h("h2", `Slide ${index + 1}`)),
                ),
            );
    }),
};

const Scene = scenes[scene];
if (!Scene) throw new Error(`unknown scene "${scene}"`);
// A consumer's SPA wrapper with a floor of its own: the deck's print reset zeroes it
// (`!important`), and a page without a deck keeps it.
document.getElementById("app")!.style.minBlockSize = "50px";
createApp(Scene).mount("#app");
w.__ready = true;
