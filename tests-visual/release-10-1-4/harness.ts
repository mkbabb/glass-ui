// glass-ui 10.1.4 — the engine witnesses' harness for sci-report O-119 (g) and the
// `@page` half of (f). One page, one scene per `?scene=`, the real library components
// from `src/` under the demo's own cascade (which imports the library's main
// stylesheet, `src/styles/index.css`). Imports are relative to `src/`, so the same file
// mounts unchanged on a 10.1.3 tree: that is how each witness is shown RED on 10.1.3
// and GREEN on 10.1.4.
import "../../demo/demo.css";
import { createApp, defineComponent, h, nextTick, type Component } from "vue";

import DataTable from "../../src/components/data-table/DataTable.vue";
import { DeckSlide, DeckStage, useDeck } from "../../src/components/deck";
import { Dialog, DialogContent } from "../../src/components/dialog";

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

const CONSUMER_PAGE = "@media print { @page { size: A4; margin: 14mm 12mm } }";

function witnessDeck(deck: ReturnType<typeof useDeck>) {
    return h(DeckStage, { deck, ariaLabel: "witness deck" }, () =>
        [0, 1].map((index) => h(DeckSlide, { index }, () => h("h2", `Slide ${index + 1}`))),
    );
}

/** Prose, then a two-slide deck inside the overlay `wrap` builds around it. */
function overlay(wrap: (deck: ReturnType<typeof witnessDeck>) => ReturnType<typeof h>): Component {
    return defineComponent(() => {
        const deck = useDeck(2);
        return () =>
            h("div", [
                h("article", { style: "padding:24px" }, [h("h1", "Records")]),
                wrap(witnessDeck(deck)),
            ]);
    });
}

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
        return () => witnessDeck(deck);
    }),
    // The same deck inside a modal <dialog> beside prose: the stage is in the top layer,
    // out of flow, so its own `page` cannot start a sheet (critique-1 F-1).
    "print-deck-dialog": overlay((deck) => h("dialog", { "data-witness": "dialog" }, [deck])),
    // The library's own Dialog: a reka portal whose plate is `position: fixed`, not a
    // native <dialog>, so it never matches `:modal` (critique-2 F-2).
    "print-deck-glass-dialog": overlay((deck) =>
        h(Dialog, { open: true }, () =>
            h(DialogContent, { "aria-describedby": undefined }, () => [h("h2", "Deck"), deck]),
        ),
    ),
    // A consumer's fixed full-viewport presenter layer (critique-2 F-2).
    "print-deck-fixed": overlay((deck) =>
        h("div", { style: "position:fixed;inset:0;z-index:10" }, [deck]),
    ),
    // A non-modal <dialog open>: the UA positions it absolute (critique-2 F-2).
    "print-deck-nonmodal": overlay((deck) => h("dialog", { open: true }, [deck])),
    // A consumer's own unlayered paper, as Gregg keeps its print margin, beside a deck:
    // the deck's sheets stay the deck's (critique-2 F-3).
    "print-deck-consumer-page": defineComponent(() => {
        const deck = useDeck(2);
        return () => h("div", [h("style", CONSUMER_PAGE), witnessDeck(deck)]);
    }),
    // The same consumer paper on a page with no deck: the reader's paper is theirs.
    "print-plain-consumer-page": defineComponent(
        () => () =>
            h("div", [
                h("style", CONSUMER_PAGE),
                h("article", { style: "padding:24px" }, [h("h1", "Records")]),
            ]),
    ),
};

const Scene = scenes[scene];
if (!Scene) throw new Error(`unknown scene "${scene}"`);
// A consumer's SPA wrapper with a floor of its own: the deck's print reset zeroes it
// (`!important`), and a page without a deck keeps it.
document.getElementById("app")!.style.minBlockSize = "50px";
createApp(Scene).mount("#app");
await nextTick();
document.querySelector<HTMLDialogElement>('[data-witness="dialog"]')?.showModal();
w.__ready = true;
