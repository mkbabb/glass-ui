// critique-1 probe: refutation scenes for O-119 (g) and the @page half of (f).
// Imports relative to src/ so the same file runs against a v10.1.3 source swap.
const w = window as unknown as Record<string, any>;
// Count every platform RO callback (installed before any component import).
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
const { FadingScroll } = await import("../../../src/components/fading-scroll");
const { PagerDots } = await import("../../../src/components/pager-dots");
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

w.__dispatch = [] as Array<[number, number]>;
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
    // useResizeObserver directly: the dispatches of a laid-out box and a display:none box.
    "ro-count": defineComponent(() => {
        const a = ref<HTMLElement | null>(null);
        const b = ref<HTMLElement | null>(null);
        const bShown = ref(false);
        w.__a = [] as number[][];
        w.__b = [] as number[][];
        w.__showB = () => (bShown.value = true);
        useResizeObserver(a, (r) => w.__a.push([r.width, r.height]));
        useResizeObserver(b, (r) => w.__b.push([r.width, r.height]));
        return () =>
            h("div", [
                h("div", { ref: a, style: "inline-size:200px;block-size:100px" }),
                h("div", { ref: b, style: `inline-size:300px;block-size:50px;display:${bShown.value ? "block" : "none"}` }),
            ]);
    }),
    // every caller family mounted at once; the RO callback count must settle.
    "ro-loop": defineComponent(() => {
        const active = ref(1);
        return () =>
            h("div", { style: "inline-size:390px" }, [
                table(),
                h(FadingScroll, { style: "inline-size:200px;overflow:auto" }, () =>
                    h("div", { style: "inline-size:900px;block-size:40px" }, "wide content"),
                ),
                h(PagerDots, { count: 5, active: active.value, "onUpdate:active": (v: number) => (active.value = v) }),
            ]);
    }),
    "print-plain": defineComponent(() => () => article()),
    "print-deck": defineComponent(() => () => h(DeckA)),
    "print-deck-after-header": defineComponent(() => () => h("div", [article(), h(DeckA)])),
    "print-deck-later": defineComponent(() => {
        const on = ref(false);
        setTimeout(() => (on.value = true), 300);
        return () => h("div", [article(), on.value ? h(DeckA) : null]);
    }),
    "print-two-decks": defineComponent(() => () => h("div", [h(DeckA), h(DeckB)])),
    "print-deck-flex": defineComponent(() => () =>
        h("div", { style: "display:flex;flex-direction:column;min-block-size:100vh" }, [h(DeckA)])),
    "print-deck-grid": defineComponent(() => () =>
        h("div", { style: "display:grid" }, [h(DeckA)])),
    "print-deck-dialog": defineComponent(() => {
        const dlg = ref<HTMLDialogElement | null>(null);
        return () => h("div", [article(), h("dialog", { ref: dlg, "data-witness": "dlg" }, [h(DeckA)])]);
    }),
    "print-deck-hidden": defineComponent(() => () =>
        h("div", [article(), h("div", { style: "display:none" }, [h(DeckA)])])),
};

const Scene = scenes[scene];
if (!Scene) throw new Error(`unknown scene "${scene}"`);
document.getElementById("app")!.style.minBlockSize = "50px";
createApp(Scene).mount("#app");
await nextTick();
if (scene === "print-deck-dialog") (document.querySelector('[data-witness="dlg"]') as HTMLDialogElement).showModal();
w.__ready = true;
