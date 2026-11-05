// critique-3 probe: refutation scenes for O-119 (g) and the @page half of (f).
// Imports relative to src/ so the same file runs against a v10.1.3 source swap.
const w = window as unknown as Record<string, any>;
w.__roCalls = 0;
const NativeRO = window.ResizeObserver;
window.ResizeObserver = class extends NativeRO {
    constructor(cb: ResizeObserverCallback) {
        super((entries, obs) => {
            w.__roCalls++;
            cb(entries, obs);
        });
    }
} as typeof ResizeObserver;
w.__roErrors = 0;
window.addEventListener("error", (e) => {
    if (String(e.message).includes("ResizeObserver")) w.__roErrors++;
});

const { createApp, defineComponent, h, ref, nextTick } = await import("vue");
await import("../../../demo/demo.css");
const { default: DataTable } = await import("../../../src/components/data-table/DataTable.vue");
const { DeckSlide, DeckStage, useDeck } = await import("../../../src/components/deck");
const { Dialog, DialogContent } = await import("../../../src/components/dialog");

const params = new URLSearchParams(location.search);
const scene = params.get("scene") ?? "";
const columns = [
    { key: "name", label: "Name" },
    { key: "kind", label: "Kind" },
    { key: "year", label: "Year" },
];
const rows = [
    { _id: "1", name: "Ada", kind: "engine", year: 1843 },
    { _id: "2", name: "Grace", kind: "compiler", year: 1952 },
];
const table = (cols = columns, rs: any[] = rows) => h(DataTable, { columns: cols, rows: rs, responsive: true });
const deck = (label: string) =>
    defineComponent(() => {
        const d = useDeck(2);
        return () =>
            h(DeckStage, { deck: d, ariaLabel: label }, () =>
                [0, 1].map((i) => h(DeckSlide, { index: i }, () => h("h2", `${label} ${i + 1}`))),
            );
    });
const DeckA = deck("A");
const DeckB = deck("B");
const article = () =>
    h("article", { style: "padding:24px;max-inline-size:60ch" }, [h("h1", "Records"), h("p", "Leading prose.")]);

// projection-change counter: every table<->cards swap of the host
w.__swaps = 0;
function watchSwaps(): void {
    let last = "";
    const read = () => {
        const host = document.querySelector('[data-witness="host"]');
        if (!host) return;
        const now = host.querySelector(".data-table-cards") ? "cards" : host.querySelector("table") ? "table" : "none";
        if (last && now !== last) w.__swaps++;
        last = now;
    };
    new MutationObserver(read).observe(document.body, { subtree: true, childList: true });
    read();
}

// a label/value pair whose card (label beside value) is wider than its table column
// (label above value): the table's intrinsic width sits under the card breakpoint and
// the cards' intrinsic width over it.
const L = Number(params.get("L") ?? 40);
const V = Number(params.get("V") ?? 40);
const oscCols = [
    { key: "n", label: "N" },
    { key: "v", label: "L".repeat(L) },
];
const oscRows = [{ _id: "1", n: "a", v: "v".repeat(V) }];
const hostStyle: Record<string, string> = {
    inline: "display:inline-block",
    grid: "display:grid;grid-template-columns:auto 1fr",
    flex: "display:flex;align-items:start",
    fit: "inline-size:fit-content",
};

const scenes: Record<string, any> = {
    table: defineComponent(() => {
        const width = Number(params.get("width") ?? 390);
        return () => h("div", { "data-witness": "host", style: `inline-size:${width}px` }, [table()]);
    }),
    "table-hidden": defineComponent(() => {
        const shown = ref(false);
        w.__show = () => (shown.value = true);
        return () =>
            h("div", { "data-witness": "host", style: `inline-size:390px;display:${shown.value ? "block" : "none"}` }, [table()]);
    }),
    "table-osc": defineComponent(() => {
        const kind = params.get("host") ?? "inline";
        return () =>
            h("div", {}, [
                h("div", { "data-witness": "host", style: hostStyle[kind] }, [table(oscCols, oscRows)]),
            ]);
    }),
    // the same pair, rows arriving 300 ms after mount (a fetch): the size change any
    // version dispatches
    "table-osc-rows": defineComponent(() => {
        const rs = ref<any[]>([]);
        setTimeout(() => (rs.value = oscRows), 300);
        return () =>
            h("div", {}, [h("div", { "data-witness": "host", style: hostStyle.flex }, [table(oscCols, rs.value)])]);
    }),
    "print-plain": defineComponent(() => () => article()),
    "print-deck": defineComponent(() => () => h(DeckA)),
    "print-deck-later": defineComponent(() => {
        const on = ref(false);
        setTimeout(() => (on.value = true), 300);
        return () => h("div", [article(), on.value ? h(DeckA) : null]);
    }),
    "print-two-decks": defineComponent(() => () => h("div", [h(DeckA), h(DeckB)])),
    "print-deck-glass-dialog": defineComponent(() => () =>
        h("div", [
            article(),
            h(Dialog, { open: true }, () =>
                h(DialogContent, { "aria-describedby": undefined }, () => [h("h2", "Deck"), h(DeckA)]),
            ),
        ])),
    // a consumer that asks for the deck on A4 explicitly, by name, important
    "print-deck-consumer-named": defineComponent(() => () =>
        h("div", [h("style", "@media print { @page deck { size: A4 !important; margin: 10mm !important } }"), h(DeckA)])),
    // consumer :first margin beside a deck
    "print-deck-consumer-first": defineComponent(() => () =>
        h("div", [h("style", "@media print { @page :first { margin-top: 30mm } }"), h(DeckA)])),
    // a page whose deck is mounted but hidden (a closed tab panel / v-show)
    "print-deck-hidden": defineComponent(() => () =>
        h("div", [article(), h("div", { style: "display:none" }, [h(DeckA)])])),
    // a deck that sits in a print-hidden preview panel (the consumer prints the article)
    "print-deck-print-hidden": defineComponent(() => () =>
        h("div", [h("style", "@media print { .preview { display:none } }"), article(), h("div", { class: "preview" }, [h(DeckA)])])),
};

const Scene = scenes[scene];
if (!Scene) throw new Error(`unknown scene "${scene}"`);
document.getElementById("app")!.style.minBlockSize = "50px";
// record table/cards for the first frames after mount (a painted-frame flash witness)
w.__frames = [] as string[];
createApp(Scene).mount("#app");
watchSwaps();
let n = 0;
const frame = () => {
    const host = document.querySelector('[data-witness="host"]');
    if (host) w.__frames.push(host.querySelector(".data-table-cards") ? "cards" : host.querySelector("table") ? "table" : "none");
    if (++n < 6) requestAnimationFrame(frame);
};
requestAnimationFrame(frame);
await nextTick();
w.__ready = true;
