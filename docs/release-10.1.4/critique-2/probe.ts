// critique-2 probe: refutation scenes for O-119 (g) and the @page half of (f).
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

const { createApp, defineComponent, h, ref, nextTick } = await import("vue");
await import("../../../demo/demo.css");
const { default: DataTable } = await import("../../../src/components/data-table/DataTable.vue");
const { DeckSlide, DeckStage, useDeck } = await import("../../../src/components/deck");
const { Dialog, DialogContent } = await import("../../../src/components/dialog");
const { useResizeObserver } = await import("../../../src/composables/dom/useResizeObserver");

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
    { _id: "3", name: "Edsger", kind: "semaphore", year: 1965 },
];
const table = () => h(DataTable, { columns, rows, responsive: true });
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
    h("article", { style: "padding:24px;max-inline-size:60ch" }, [
        h("h1", "Records"),
        h("p", "Leading prose before any deck."),
    ]);

const scenes: Record<string, any> = {
    table: defineComponent(() => {
        const width = Number(params.get("width") ?? 390);
        return () => h("div", { "data-witness": "host", style: `inline-size:${width}px` }, [table()]);
    }),
    // hidden (display:none) on mount, shown 300 ms later
    "table-hidden": defineComponent(() => {
        const shown = ref(false);
        w.__show = () => (shown.value = true);
        return () =>
            h("div", { "data-witness": "host", style: `inline-size:390px;display:${shown.value ? "block" : "none"}` }, [table()]);
    }),
    // a shrink-to-fit host on a wide viewport: the table's own intrinsic width decides
    "table-shrink": defineComponent(() => () =>
        h("div", { "data-witness": "host", style: "display:inline-block" }, [table()])),
    // a 390 host whose DataTable mounts after a v-if flip
    "table-late": defineComponent(() => {
        const on = ref(false);
        setTimeout(() => (on.value = true), 200);
        return () => h("div", { "data-witness": "host", style: "inline-size:390px" }, [on.value ? table() : null]);
    }),
    // bare composable: count dispatches on mount, after an unrelated re-render, after a target swap
    "ro-count": defineComponent(() => {
        const a = ref<HTMLElement | null>(null);
        const tick = ref(0);
        const swap = ref(false);
        w.__a = [] as number[][];
        w.__rerender = () => tick.value++;
        w.__swap = () => (swap.value = !swap.value);
        useResizeObserver(a, (r) => w.__a.push([r.width, r.height]));
        return () =>
            h("div", { "data-tick": tick.value }, [
                swap.value
                    ? h("section", { key: "s", ref: a, style: "inline-size:200px;block-size:100px" })
                    : h("div", { key: "d", ref: a, style: "inline-size:200px;block-size:100px" }),
            ]);
    }),
    "print-plain": defineComponent(() => () => article()),
    "print-deck": defineComponent(() => () => h(DeckA)),
    "print-deck-later": defineComponent(() => {
        const on = ref(false);
        setTimeout(() => (on.value = true), 300);
        return () => h("div", [article(), on.value ? h(DeckA) : null]);
    }),
    "print-two-decks": defineComponent(() => () => h("div", [h(DeckA), h(DeckB)])),
    "print-deck-native-modal": defineComponent(() => () =>
        h("div", [article(), h("dialog", { "data-witness": "dlg" }, [h(DeckA)])])),
    // the library's OWN Dialog (reka portal, position:fixed plate, not a native <dialog>)
    "print-deck-glass-dialog": defineComponent(() => () =>
        h("div", [
            article(),
            h(Dialog, { open: true }, () =>
                h(DialogContent, { "aria-describedby": undefined }, () => [h("h2", "Deck"), h(DeckA)]),
            ),
        ])),
    // a non-modal native dialog (UA position:absolute)
    "print-deck-nonmodal": defineComponent(() => () =>
        h("div", [article(), h("dialog", { open: true }, [h(DeckA)])])),
    // a consumer overlay: a fixed full-viewport presenter layer
    "print-deck-fixed": defineComponent(() => () =>
        h("div", [article(), h("div", { style: "position:fixed;inset:0;z-index:10" }, [h(DeckA)])])),
    // an open popover
    "print-deck-popover": defineComponent(() => () =>
        h("div", [article(), h("div", { popover: "manual", "data-witness": "pop" }, [h(DeckA)])])),
    // a consumer's own unlayered paper choice (Gregg keeps `margin: 14mm 12mm`) beside a deck
    "print-deck-consumer-page": defineComponent(() => () =>
        h("div", [h("style", "@media print { @page { size: A4; margin: 14mm 12mm } }"), h(DeckA)])),
    // the same paper choice on a page with no deck
    "print-plain-consumer-page": defineComponent(() => () =>
        h("div", [h("style", "@media print { @page { size: A4; margin: 14mm 12mm } }"), article()])),
    // an SPA shell whose main scrolls (height:100vh; overflow:auto)
    "print-deck-scroll-shell": defineComponent(() => () =>
        h("main", { style: "block-size:100vh;overflow:auto" }, [h(DeckA)])),
};

const Scene = scenes[scene];
if (!Scene) throw new Error(`unknown scene "${scene}"`);
document.getElementById("app")!.style.minBlockSize = "50px";
createApp(Scene).mount("#app");
await nextTick();
(document.querySelector('[data-witness="dlg"]') as HTMLDialogElement | null)?.showModal();
(document.querySelector('[data-witness="pop"]') as HTMLElement | null)?.showPopover?.();
w.__ready = true;
