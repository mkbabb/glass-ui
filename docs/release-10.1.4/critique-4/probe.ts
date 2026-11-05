// critique-4 probe: refutation scenes for O-119 (g) after fix-3's echo hold, and the
// @page half of (f). Imports relative to src/ so the same file runs against a v10.1.3
// source swap.
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

const { createApp, defineComponent, h, ref, onMounted, nextTick } = await import("vue");
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
const table = (cols: any[] = columns, rs: any[] = rows) => h(DataTable, { columns: cols, rows: rs, responsive: true });
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

// critique-3's pair: the table's intrinsic width under the breakpoint, the cards' over it.
const L = Number(params.get("L") ?? 36);
const V = Number(params.get("V") ?? 36);
const value = "v".repeat(V);
const oscCols = [
    { key: "n", label: "N" },
    { key: "v", label: "L".repeat(L) },
];
const oscRows = [{ _id: "1", n: "a", v: value }];

// A cell component whose content settles after the projection's own flush: text filled
// in the next animation frame (an async formatter, a lazily resolved label), or after a
// short timeout (a cached fetch). Every projection swap remounts it.
const mode = params.get("mode") ?? "raf";
const LateCell = defineComponent({
    props: { value: null, row: null },
    setup(props) {
        const text = ref("");
        onMounted(() => {
            const fill = () => (text.value = String(props.value));
            if (mode === "raf") requestAnimationFrame(fill);
            else if (mode === "micro") Promise.resolve().then(fill);
            else setTimeout(fill, Number(params.get("ms") ?? 30));
        });
        return () => h("span", text.value);
    },
});
// An image cell: a data-URL SVG with intrinsic width, no width attribute.
const svg = `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${V * 8}" height="12"><rect width="100%" height="100%" fill="teal"/></svg>`,
)}`;
const ImgCell = defineComponent({
    props: { value: null, row: null },
    setup: () => () => h("img", { src: svg, alt: "" }),
});

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
    // a fixed-width host whose width animates across the breakpoint
    "table-transition": defineComponent(() => {
        const width = ref(900);
        w.__setW = (n: number) => (width.value = n);
        return () =>
            h("div", { "data-witness": "host", style: `inline-size:${width.value}px;transition:inline-size 400ms linear` }, [table()]);
    }),
    // critique-3's content-sized flex host (the history cell resizes the viewport)
    osc: defineComponent(() => () =>
        h("div", {}, [h("div", { "data-witness": "host", style: "display:flex;align-items:start" }, [table(oscCols, oscRows)])])),
    // the same host and columns; the body cell's content settles after the flush
    "osc-late": defineComponent(() => () =>
        h("div", {}, [
            h("div", { "data-witness": "host", style: "display:flex;align-items:start" }, [
                table([oscCols[0], { ...oscCols[1], component: LateCell }], oscRows),
            ]),
        ])),
    "osc-img": defineComponent(() => () =>
        h("div", {}, [
            h("div", { "data-witness": "host", style: "display:flex;align-items:start" }, [
                table([oscCols[0], { ...oscCols[1], component: ImgCell }], oscRows),
            ]),
        ])),
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
    // a native modal <dialog> (top layer) holding a deck
    "print-deck-native-modal": defineComponent(() => {
        const dlg = ref<HTMLDialogElement | null>(null);
        onMounted(() => dlg.value?.showModal());
        return () => h("div", [article(), h("dialog", { ref: dlg }, [h(DeckA)])]);
    }),
    // a deck removed after mount: the page must return to the reader's paper
    "print-deck-removed": defineComponent(() => {
        const on = ref(true);
        setTimeout(() => (on.value = false), 300);
        return () => h("div", [article(), on.value ? h(DeckA) : null]);
    }),
};

const Scene = scenes[scene];
if (!Scene) throw new Error(`unknown scene "${scene}"`);
document.getElementById("app")!.style.minBlockSize = "50px";
w.__frames = [] as string[];
createApp(Scene).mount("#app");
watchSwaps();
let n = 0;
const frame = () => {
    const host = document.querySelector('[data-witness="host"]');
    if (host) w.__frames.push(host.querySelector(".data-table-cards") ? "cards" : host.querySelector("table") ? "table" : "none");
    if (++n < 8) requestAnimationFrame(frame);
};
requestAnimationFrame(frame);
await nextTick();
w.__ready = true;
