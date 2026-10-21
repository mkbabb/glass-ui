import { describe, expect, it, vi } from "vitest";
import { computed, createApp, defineComponent, h, nextTick, ref } from "vue";
import { useDockExpandedSize } from "@glass/components/dock/composables/dockMorphMeasure";
import { useDockMorphOrchestrator } from "@glass/components/dock/composables/useDockMorph";
import { mountComposable } from "../../../utils/mountComposable";

function rect(width: number, height = 48): DOMRect {
    return {
        x: 0,
        y: 0,
        top: 0,
        left: 0,
        right: width,
        bottom: height,
        width,
        height,
        toJSON: () => ({}),
    } as DOMRect;
}

function element(
    width: number | (() => number),
    height: number | (() => number) = 48,
): HTMLElement {
    const el = document.createElement("div");
    const readWidth = () => (typeof width === "function" ? width() : width);
    const readHeight = () => (typeof height === "function" ? height() : height);
    Object.defineProperties(el, {
        offsetWidth: { get: readWidth },
        offsetHeight: { get: readHeight },
    });
    el.getBoundingClientRect = () => rect(readWidth(), readHeight());
    return el;
}

/**
 * A dock pane: `box` is its laid-out border box (an inactive pane stretches over the
 * root, the expanded full pane fills it), `natural` the span its content holds, which
 * is what it reports while the measure lays it out at `max-content`.
 */
function pane(box: () => number, natural: () => number): HTMLElement {
    const el = document.createElement("div");
    const read = () =>
        el.style.getPropertyValue("inline-size") === "max-content" ? natural() : box();
    Object.defineProperties(el, {
        offsetWidth: { get: read },
        offsetHeight: { get: () => 48 },
    });
    el.getBoundingClientRect = () => rect(read());
    return el;
}

/** Let a MutationObserver's microtask run. */
const mutationsSettle = () => new Promise<void>((resolve) => setTimeout(resolve, 0));

describe("useDockExpandedSize", () => {
    it.each([
        [true, 240],
        [false, 64],
    ])("derives both endpoints from rendered panes (expanded=%s)", (isExpanded, rootWidth) => {
        const root = element(rootWidth);
        const content = element(isExpanded ? 220 : 44);
        // The inactive pane is stretched over the root; only its natural span counts.
        const full = pane(() => (isExpanded ? 220 : rootWidth), () => 220);
        const summary = pane(() => (isExpanded ? rootWidth : 44), () => 44);
        root.append(content);

        const { unmount } = mountComposable(() =>
            useDockExpandedSize({
                rootEl: ref(root),
                contentEl: ref(content),
                expandedEl: ref(full),
                collapsedEl: ref(summary),
                axis: ref("horizontal"),
                expanded: ref(isExpanded),
            }),
        );

        expect(root.style.getPropertyValue("--dock-collapsed-px")).toBe("64px");
        expect(root.style.getPropertyValue("--dock-expanded-px")).toBe("240px");
        unmount();
    });

    it("does not impose the coarse target floor on non-interactive geometry", () => {
        const root = element(224);
        const content = element(220);
        const full = element(220);
        const summary = element(28);
        root.append(content);

        const { unmount } = mountComposable(() =>
            useDockExpandedSize({
                rootEl: ref(root),
                contentEl: ref(content),
                expandedEl: ref(full),
                collapsedEl: ref(summary),
                axis: ref("horizontal"),
                expanded: ref(true),
            }),
        );

        expect(root.style.getPropertyValue("--dock-collapsed-px")).toBe("32px");
        unmount();
    });

    it("does not take an endpoint from the reserved, transformed mid-morph root", async () => {
        let rootWidth = 240;
        const root = element(() => rootWidth);
        const content = element(220);
        const full = element(220);
        const summary = element(44);
        root.append(content);
        const expanded = ref(true);

        const { unmount } = mountComposable(() =>
            useDockExpandedSize({
                rootEl: ref(root),
                contentEl: ref(content),
                expandedEl: ref(full),
                collapsedEl: ref(summary),
                axis: ref("horizontal"),
                expanded,
            }),
        );

        expect(root.style.getPropertyValue("--dock-expanded-px")).toBe("240px");
        expect(root.style.getPropertyValue("--dock-collapsed-px")).toBe("64px");

        root.setAttribute("data-morphing", "");
        rootWidth = 172;
        root.getBoundingClientRect = () => rect(172 * 0.4);
        expanded.value = false;
        await nextTick();

        expect(root.style.getPropertyValue("--dock-expanded-px")).toBe("240px");
        expect(root.style.getPropertyValue("--dock-collapsed-px")).toBe("64px");
        unmount();
    });

    it("recaptures the settled layout box instead of a stale transformed paint rect", async () => {
        let resize!: () => void;
        class ActiveResizeObserver {
            constructor(callback: ResizeObserverCallback) {
                resize = () => callback([], this as unknown as ResizeObserver);
            }
            observe() {}
            disconnect() {}
        }
        vi.stubGlobal("ResizeObserver", ActiveResizeObserver);

        let rootHeight = 277;
        let fullHeight = 257;
        let summaryHeight = 60;
        const root = element(48, () => rootHeight);
        const content = element(48, () => fullHeight);
        const full = element(48, () => fullHeight);
        const summary = element(48, () => summaryHeight);
        root.append(content);
        const expanded = ref(true);

        const { unmount } = mountComposable(() =>
            useDockExpandedSize({
                rootEl: ref(root),
                contentEl: ref(content),
                expandedEl: ref(full),
                collapsedEl: ref(summary),
                axis: ref("vertical"),
                expanded,
            }),
        );

        expect(root.style.getPropertyValue("--dock-expanded-px")).toBe("277px");
        expect(root.style.getPropertyValue("--dock-collapsed-px")).toBe("80px");

        root.setAttribute("data-morphing", "");
        expanded.value = false;
        await nextTick();
        root.removeAttribute("data-morphing");
        rootHeight = 80;
        fullHeight = 80;
        summaryHeight = 60;
        root.getBoundingClientRect = () => rect(48, 80 * (80 / 277));
        resize();

        expect(root.getBoundingClientRect().height).toBeCloseTo(23.105, 3);
        expect(root.style.getPropertyValue("--dock-collapsed-px")).toBe("80px");
        unmount();
        vi.unstubAllGlobals();
    });

    // O-101 · DOCK-STALE-EXPANDED-ENDPOINT. The pane changes while the dock is
    // collapsed, and the expand comes in the same render (value.js's breakpoint). The
    // render function stands in for the DOM patch: the mock layout it writes is what a
    // read after the patch sees. The arm must reserve the new pane's expanded box. RED
    // on 10.1.1, which reserved the endpoint latched while the old pane was expanded.
    it("the morph reserves the expanded box of the pane patched in with the expand", async () => {
        const CHROME = 24;
        const layout = { expanded: true, span: 568 };
        const root = element(() => (layout.expanded ? CHROME + layout.span : 56));
        const content = element(() => (layout.expanded ? layout.span : 40));
        const full = pane(() => (layout.expanded ? layout.span : 56), () => layout.span);
        const summary = pane(() => (layout.expanded ? CHROME + layout.span : 40), () => 40);
        root.append(content);
        const expanded = ref(true);
        const wide = ref(true);
        // Read when the morph arms: `onMorphActiveChange(true)` fires as `play` sets
        // `[data-morphing]`, after the arm's measure.
        let reserved = "";

        const host = document.createElement("div");
        document.body.append(host);
        const app = createApp(
            defineComponent({
                setup() {
                    const sized = useDockExpandedSize({
                        rootEl: ref(root),
                        contentEl: ref(content),
                        expandedEl: ref(full),
                        collapsedEl: ref(summary),
                        axis: ref("horizontal"),
                        expanded,
                    }) as { measure?: () => void } | undefined;
                    useDockMorphOrchestrator({
                        rootEl: ref(root),
                        outerActiveLayer: computed(() => (expanded.value ? "full" : "summary")),
                        measure: () => sized?.measure?.(),
                        onMorphActiveChange: (active) => {
                            if (active) reserved = root.style.getPropertyValue("--dock-expanded-px");
                        },
                    });
                    return () => {
                        layout.expanded = expanded.value;
                        layout.span = wide.value ? 568 : 136;
                        return h("div");
                    };
                },
            }),
        );
        app.mount(host);
        expect(root.style.getPropertyValue("--dock-expanded-px")).toBe("592px");

        expanded.value = false;
        await nextTick();
        root.removeAttribute("data-morphing");
        await nextTick();

        reserved = "";
        wide.value = false;
        expanded.value = true;
        await nextTick();

        expect(reserved, "the endpoint the armed morph reserves").toBe(`${CHROME + 136}px`);
        app.unmount();
        host.remove();
    });
    /**
     * A dock whose full pane is a breakpoint's: 568px of seats wide, 136 narrow, around
     * 24px of chrome; collapsed it is 56px around a 40px summary. Every box follows
     * `layout`, the stand-in for the engine's layout of the current DOM. Changing
     * `layout.span` and mutating the pane is a consumer breakpoint re-rendering it.
     */
    function breakpointDock() {
        const CHROME = 24;
        // `reserved`: the box a morph reserves, which the root reports while it runs.
        const layout = { expanded: true, span: 568, reserved: 0 };
        const root = element(
            () => layout.reserved || (layout.expanded ? CHROME + layout.span : 56),
        );
        const content = element(() => (layout.expanded ? layout.span : 40));
        const full = pane(() => (layout.expanded ? layout.span : 56), () => layout.span);
        const summary = pane(() => (layout.expanded ? CHROME + layout.span : 40), () => 40);
        root.append(content);
        full.append(document.createElement("button"));
        const repane = (span: number) => {
            layout.span = span;
            full.append(document.createElement("button"));
        };
        return { CHROME, layout, root, content, full, summary, repane };
    }

    // O-101 (round 1). The pane changes while the dock is collapsed and at rest: the
    // published expanded endpoint follows it at once. RED on 10.1.1 and on the arm-time
    // cure, which kept 592 until the next arm.
    it("re-bases the expanded endpoint when the pane changes while collapsed", async () => {
        const dock = breakpointDock();
        const expanded = ref(true);
        const { unmount } = mountComposable(() =>
            useDockExpandedSize({
                rootEl: ref(dock.root),
                contentEl: ref(dock.content),
                expandedEl: ref(dock.full),
                collapsedEl: ref(dock.summary),
                axis: ref("horizontal"),
                expanded,
            }),
        );
        expect(dock.root.style.getPropertyValue("--dock-expanded-px")).toBe("592px");

        dock.layout.expanded = false;
        expanded.value = false;
        await nextTick();
        dock.repane(136);
        await mutationsSettle();

        expect(dock.root.style.getPropertyValue("--dock-expanded-px")).toBe(`${dock.CHROME + 136}px`);
        expect(dock.root.style.getPropertyValue("--dock-collapsed-px")).toBe("56px");
        unmount();
    });

    // O-101 (round 1). The pane changes while an expand morph runs: the reserved box
    // retargets to the new pane, read from its natural span, never from the reserved
    // root. RED on 10.1.1 and on the arm-time cure, whose capture returned early under
    // `[data-morphing]`.
    it("retargets the reserved endpoint when the pane changes mid-morph", async () => {
        const dock = breakpointDock();
        const expanded = ref(true);
        const { unmount } = mountComposable(() =>
            useDockExpandedSize({
                rootEl: ref(dock.root),
                contentEl: ref(dock.content),
                expandedEl: ref(dock.full),
                collapsedEl: ref(dock.summary),
                axis: ref("horizontal"),
                expanded,
            }),
        );
        expect(dock.root.style.getPropertyValue("--dock-expanded-px")).toBe("592px");

        // Mid-morph the root is the reserved box, whatever the pane now holds.
        dock.root.setAttribute("data-morphing", "");
        dock.layout.reserved = 592;
        dock.repane(136);
        await mutationsSettle();

        expect(dock.root.style.getPropertyValue("--dock-expanded-px")).toBe(`${dock.CHROME + 136}px`);
        unmount();
    });

    // O-101 (round 1). A collapse is reversed after the pane changed: the expand arms
    // under `[data-morphing]` and must reserve the new pane's box. RED on the arm-time
    // cure (592 reserved for 160).
    it("a reversed morph reserves the expanded box of the pane it opens onto", async () => {
        const dock = breakpointDock();
        const expanded = ref(true);
        const wide = ref(true);
        let reserved = "";
        let armedMidMorph = false;
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
                        expanded,
                    });
                    useDockMorphOrchestrator({
                        rootEl: ref(dock.root),
                        outerActiveLayer: computed(() => (expanded.value ? "full" : "summary")),
                        measure: () => {
                            armedMidMorph = dock.root.hasAttribute("data-morphing");
                            sized.measure();
                        },
                        onMorphActiveChange: (active) => {
                            if (active) reserved = dock.root.style.getPropertyValue("--dock-expanded-px");
                        },
                    });
                    return () => {
                        dock.layout.expanded = expanded.value;
                        dock.layout.span = wide.value ? 568 : 136;
                        return h("div");
                    };
                },
            }),
        );
        app.mount(host);
        expect(dock.root.style.getPropertyValue("--dock-expanded-px")).toBe("592px");

        // Collapse, and leave the morph in flight.
        expanded.value = false;
        await nextTick();
        expect(dock.root.hasAttribute("data-morphing")).toBe(true);

        reserved = "";
        wide.value = false;
        expanded.value = true;
        await nextTick();

        expect(armedMidMorph, "the expand armed while the collapse was in flight").toBe(true);
        expect(reserved, "the endpoint the reversed morph reserves").toBe(`${dock.CHROME + 136}px`);
        app.unmount();
        host.remove();
    });
});
