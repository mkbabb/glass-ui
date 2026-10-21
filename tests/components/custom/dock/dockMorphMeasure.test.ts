import { describe, expect, it, vi } from "vitest";
import { computed, createApp, defineComponent, h, nextTick, ref } from "vue";
import { useDockExpandedSize } from "@glass/components/dock/composables/dockMorphMeasure";
import { useDockMorphOrchestrator } from "@glass/components/dock/composables/useDockMorph";
import { mountComposable } from "../../../utils/mountComposable";

type Axis = "horizontal" | "vertical";

/**
 * A stand-in for the engine's layout of a dock, on the morph axis. It follows the
 * DOM's posture (the full pane's `.is-active`), `[data-morphing]` with its reservation,
 * and the inline overrides the measure sets: a pane's `position`, a pane's end margin,
 * and `--dock-expanded-px: initial` on the root.
 *
 * - `chrome`: the root less its pane, per posture class; `chromeNow` overrides it while
 *   a morph interpolates the padding.
 * - `span` / `summary`: the panes' content. The full pane is the run, a scroller that
 *   shrinks to what the host leaves it (`available`); the summary does not shrink.
 * - `reserved`: the box `[data-morphing]` holds the root at.
 * - `scroll`: the run's scroll offset. A layout that resizes the run clamps it, as
 *   WebKit does, and keeps the clamped value after.
 */
function dockModel(axis: Axis = "horizontal") {
    const model = {
        chrome: { expanded: 24, collapsed: 16 },
        chromeNow: null as number | null,
        span: 568,
        summary: 40,
        available: Number.POSITIVE_INFINITY,
        reserved: 0,
        scroll: 0,
    };
    const root = document.createElement("div");
    const content = document.createElement("div");
    const full = document.createElement("div");
    const summary = document.createElement("div");
    root.append(content);
    content.append(full, summary);
    full.append(document.createElement("button"));
    full.classList.add("is-active");
    root.classList.add("expanded");
    const margin = axis === "vertical" ? "margin-block-end" : "margin-inline-end";

    const expanded = () => full.classList.contains("is-active");
    const inFlow = () => {
        if (full.style.getPropertyValue("position") === "relative") return full;
        if (summary.style.getPropertyValue("position") === "relative") return summary;
        return expanded() ? full : summary;
    };
    const chrome = () => model.chromeNow ?? model.chrome[expanded() ? "expanded" : "collapsed"];
    const marginOf = (el: HTMLElement) => Number.parseFloat(el.style.getPropertyValue(margin)) || 0;
    const reserving = () =>
        root.hasAttribute("data-morphing") &&
        root.style.getPropertyValue("--dock-expanded-px") !== "initial";
    const rootSize = (): number => {
        if (reserving()) return model.reserved;
        const pane = inFlow();
        if (pane === summary) return chrome() + model.summary + marginOf(summary);
        return Math.min(chrome() + model.span + marginOf(full), model.available);
    };
    const paneSize = (el: HTMLElement): number => {
        if (el !== inFlow()) return rootSize();
        return rootSize() - chrome() - marginOf(el);
    };
    // The run's box at rest, which the scroll offset belongs to.
    let restBox = 0;
    const settleRun = () => (restBox = paneSize(full));
    const read = (el: HTMLElement) => () => {
        const box = paneSize(full);
        if (box !== restBox) model.scroll = Math.min(model.scroll, Math.max(0, model.span - box));
        return el === root ? rootSize() : paneSize(el);
    };
    for (const el of [root, content, full, summary]) {
        const main = el === content ? () => paneSize(full) : read(el);
        Object.defineProperties(el, {
            offsetWidth: { get: axis === "vertical" ? () => 48 : main },
            offsetHeight: { get: axis === "vertical" ? main : () => 48 },
        });
    }
    Object.defineProperties(full, {
        scrollLeft: { get: () => (axis === "vertical" ? 0 : model.scroll) },
        scrollTop: { get: () => (axis === "vertical" ? model.scroll : 0) },
    });
    full.scrollTo = vi.fn((options?: ScrollToOptions | number) => {
        const to = options as ScrollToOptions;
        model.scroll = (axis === "vertical" ? to.top : to.left) ?? 0;
    }) as typeof full.scrollTo;

    /** Patch the DOM to a posture, as the dock's render does. */
    const posture = (next: "expanded" | "collapsed") => {
        full.classList.toggle("is-active", next === "expanded");
        summary.classList.toggle("is-active", next === "collapsed");
        root.classList.toggle("expanded", next === "expanded");
        root.classList.toggle("collapsed", next === "collapsed");
        settleRun();
    };
    /** A consumer breakpoint re-renders the full pane. */
    const repane = (span: number) => {
        model.span = span;
        full.append(document.createElement("button"));
    };
    const morph = (reserved: number) => {
        root.setAttribute("data-morphing", "");
        model.reserved = reserved;
    };
    const settle = () => {
        root.removeAttribute("data-morphing");
        model.chromeNow = null;
    };
    const px = (name: "expanded" | "collapsed") => root.style.getPropertyValue(`--dock-${name}-px`);
    settleRun();
    return { model, root, content, full, summary, posture, repane, morph, settle, px, settleRun };
}

function mountMeasure(dock: ReturnType<typeof dockModel>, axis: Axis = "horizontal") {
    return mountComposable(() =>
        useDockExpandedSize({
            rootEl: ref(dock.root),
            contentEl: ref(dock.content),
            expandedEl: ref(dock.full),
            collapsedEl: ref(dock.summary),
            axis: ref(axis),
        }),
    );
}

/** Let a MutationObserver's microtask run. */
const mutationsSettle = () => new Promise<void>((resolve) => setTimeout(resolve, 0));

/**
 * A dock whose posture follows `expanded` through the morph orchestrator: the render
 * patches the DOM (the model's posture, and the pane `wide` selects), and the arm
 * measures after the patch. `reserved` is what the armed morph reserves.
 */
function orchestrated(dock: ReturnType<typeof dockModel>) {
    const expanded = ref(dock.full.classList.contains("is-active"));
    const wide = ref(true);
    const state = { reserved: "", armedMidMorph: false };
    const host = document.createElement("div");
    document.body.append(host);
    const app = createApp(
        defineComponent({
            setup() {
                const sized = useDockExpandedSize({
                    rootEl: ref(dock.root),
                    contentEl: ref(dock.content),
                    expandedEl: ref(dock.full),
                    collapsedEl: ref(dock.summary),
                    axis: ref("horizontal"),
                });
                useDockMorphOrchestrator({
                    rootEl: ref(dock.root),
                    outerActiveLayer: computed(() => (expanded.value ? "full" : "summary")),
                    measure: () => {
                        state.armedMidMorph = dock.root.hasAttribute("data-morphing");
                        sized.measure();
                    },
                    onMorphActiveChange: (active) => {
                        if (active) {
                            state.reserved = dock.px("expanded");
                            dock.model.reserved = Number.parseFloat(state.reserved);
                        }
                    },
                });
                return () => {
                    dock.posture(expanded.value ? "expanded" : "collapsed");
                    dock.model.span = wide.value ? 568 : 136;
                    return h("div");
                };
            },
        }),
    );
    app.mount(host);
    return {
        expanded,
        wide,
        state,
        unmount: () => {
            app.unmount();
            host.remove();
        },
    };
}

describe("useDockExpandedSize", () => {
    // Until the dock has rested expanded once, the expanded endpoint is read with the
    // chrome the root has now; the first expand reads it at rest when it arms. Here the
    // two postures share their chrome.
    it("reads both endpoints from the root laid out in each posture", () => {
        const dock = dockModel();
        dock.model.chrome.collapsed = 24;
        dock.model.summary = 32;
        dock.posture("collapsed");
        const { unmount } = mountMeasure(dock);

        expect(dock.px("collapsed")).toBe("56px");
        expect(dock.px("expanded")).toBe("592px");
        unmount();
    });

    it("an expanded dock publishes the expanded endpoint and reads the collapsed one when it collapses", async () => {
        const dock = dockModel();
        const { unmount } = mountMeasure(dock);
        expect(dock.px("expanded")).toBe("592px");
        expect(dock.px("collapsed")).toBe("");

        dock.posture("collapsed");
        dock.summary.append(document.createElement("span"));
        await mutationsSettle();
        expect(dock.px("collapsed")).toBe("56px");
        expect(dock.px("expanded")).toBe("592px");
        unmount();
    });

    it("does not impose the coarse target floor on non-interactive geometry", () => {
        const dock = dockModel();
        dock.model.summary = 28;
        dock.model.chrome.collapsed = 4;
        dock.posture("collapsed");
        const { unmount } = mountMeasure(dock);

        expect(dock.px("collapsed")).toBe("32px");
        unmount();
    });

    it("does not take an endpoint from the reserved, transformed mid-morph root", async () => {
        const dock = dockModel();
        dock.model.chrome.collapsed = 24;
        dock.model.summary = 32;
        dock.posture("collapsed");
        const { unmount } = mountMeasure(dock);
        expect(dock.px("expanded")).toBe("592px");

        // Mid-collapse the root is held at a reserved box that is neither endpoint.
        dock.morph(400);
        dock.root.getBoundingClientRect = () => ({ width: 400 * 0.4 }) as DOMRect;
        window.dispatchEvent(new Event("resize"));

        expect(dock.px("expanded")).toBe("592px");
        expect(dock.px("collapsed")).toBe("56px");
        unmount();
    });

    it("recaptures the settled layout box on a vertical dock", () => {
        let resize!: () => void;
        class ActiveResizeObserver {
            constructor(callback: ResizeObserverCallback) {
                resize = () => callback([], this as unknown as ResizeObserver);
            }
            observe() {}
            disconnect() {}
        }
        vi.stubGlobal("ResizeObserver", ActiveResizeObserver);

        const dock = dockModel("vertical");
        dock.model.span = 257;
        dock.model.chrome = { expanded: 20, collapsed: 20 };
        dock.model.summary = 60;
        const { unmount } = mountMeasure(dock, "vertical");
        expect(dock.px("expanded")).toBe("277px");

        dock.posture("collapsed");
        resize();
        expect(dock.px("collapsed")).toBe("80px");
        expect(dock.px("expanded")).toBe("277px");
        unmount();
        vi.unstubAllGlobals();
    });

    // O-101 · DOCK-STALE-EXPANDED-ENDPOINT. The pane changes while the dock is
    // collapsed, and the expand comes in the same render (value.js's breakpoint). RED on
    // 10.1.1, which reserved the endpoint latched while the old pane was expanded.
    it("the morph reserves the expanded box of the pane patched in with the expand", async () => {
        const dock = dockModel();
        const run = orchestrated(dock);
        expect(dock.px("expanded")).toBe("592px");

        run.expanded.value = false;
        await nextTick();
        dock.settle();
        await nextTick();

        run.state.reserved = "";
        run.wide.value = false;
        run.expanded.value = true;
        await nextTick();

        expect(run.state.reserved, "the endpoint the armed morph reserves").toBe("160px");
        run.unmount();
    });

    // O-101. The pane changes while the dock is collapsed and at rest: the published
    // expanded endpoint follows it at once. RED on 10.1.1.
    it("re-reads the expanded endpoint when the pane changes while collapsed", async () => {
        const dock = dockModel();
        const { unmount } = mountMeasure(dock);
        expect(dock.px("expanded")).toBe("592px");

        dock.posture("collapsed");
        dock.repane(136);
        await mutationsSettle();

        expect(dock.px("expanded")).toBe("160px");
        expect(dock.px("collapsed")).toBe("56px");
        unmount();
    });

    // O-101. The pane changes while an expand morph runs: the reserved box retargets.
    // RED on 10.1.1, whose capture returned early under `[data-morphing]`.
    it("retargets the reserved endpoint when the pane changes mid-morph", async () => {
        const dock = dockModel();
        const { unmount } = mountMeasure(dock);
        dock.morph(592);
        dock.model.chromeNow = 20;
        dock.repane(136);
        await mutationsSettle();

        expect(dock.px("expanded")).toBe("160px");
        unmount();
    });

    // O-101. A collapse is reversed after the pane changed: the expand arms under
    // `[data-morphing]` and must reserve the new pane's box.
    it("a reversed morph reserves the expanded box of the pane it opens onto", async () => {
        const dock = dockModel();
        const run = orchestrated(dock);
        expect(dock.px("expanded")).toBe("592px");

        run.expanded.value = false;
        await nextTick();
        expect(dock.root.hasAttribute("data-morphing")).toBe(true);

        run.state.reserved = "";
        run.wide.value = false;
        run.expanded.value = true;
        await nextTick();

        expect(run.state.armedMidMorph, "the expand armed while the collapse was in flight").toBe(true);
        expect(run.state.reserved, "the endpoint the reversed morph reserves").toBe("160px");
        run.unmount();
    });

    // O-101a, 10.1.2 critique b2 D-2. The pane is constant and wider than a narrow host,
    // so the run scrolls there. The host narrows while a morph runs: no observed box but
    // the host moves (the root is held at its reservation), and the endpoint must follow
    // the host. RED on the round-1 cure, whose per-posture frame encoded the old host.
    it.each([
        ["expanding", "expanded"],
        ["collapsing", "collapsed"],
    ] as const)("follows a host that narrows while the dock is %s", (_, posture) => {
        const dock = dockModel();
        dock.model.span = 952;
        const { unmount } = mountMeasure(dock);
        expect(dock.px("expanded")).toBe("976px");

        dock.posture(posture);
        dock.morph(976);
        dock.model.chromeNow = 20;
        dock.model.available = 390;
        window.dispatchEvent(new Event("resize"));
        expect(dock.px("expanded")).toBe("390px");

        // And back: the host widens past the pane's span.
        dock.model.available = 1440;
        window.dispatchEvent(new Event("resize"));
        expect(dock.px("expanded")).toBe("976px");
        unmount();
    });

    // The collapsed posture's own rules (`.collapsed:has(.dock-layer--summary:empty)`
    // and the interpolated padding) are chrome the expanded endpoint must not carry,
    // read while the dock is collapsed. A host-bound root does not take the correction.
    it("reads the expanded endpoint with the expanded posture's chrome while collapsed", () => {
        const dock = dockModel();
        const { unmount } = mountMeasure(dock);
        dock.posture("collapsed");
        dock.model.chrome.collapsed = 10;
        window.dispatchEvent(new Event("resize"));
        expect(dock.px("expanded")).toBe("592px");

        dock.model.available = 390;
        window.dispatchEvent(new Event("resize"));
        expect(dock.px("expanded")).toBe("390px");
        unmount();
    });

    // 10.1.2 critique b2 D-1. A capture lays the run out in another box while it reads
    // an endpoint; WebKit clamps a scroller's offset in that layout and keeps the clamped
    // value. The run must keep its scroll position. RED on the round-1 cure, whose
    // `max-content` read reset a scrolled run to its leading edge.
    it("a capture keeps the run's scroll position", async () => {
        const dock = dockModel();
        dock.model.span = 952;
        dock.model.available = 390;
        const { unmount } = mountMeasure(dock);
        dock.model.scroll = 312;

        // At rest expanded the read lays out nothing new.
        dock.repane(952);
        await mutationsSettle();
        expect(dock.model.scroll).toBe(312);
        expect(dock.full.scrollTo).not.toHaveBeenCalled();

        // Collapsed, reading the expanded endpoint lays the run out in flow, where its
        // scroll range (500 - 366) is shorter than the offset, and back.
        dock.posture("collapsed");
        dock.model.scroll = 312;
        dock.repane(500);
        await mutationsSettle();
        expect(dock.px("expanded")).toBe("390px");
        expect(dock.full.scrollTo).toHaveBeenCalled();
        expect(dock.model.scroll).toBe(312);
        unmount();
    });
});
