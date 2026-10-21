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

describe("useDockExpandedSize", () => {
    it.each([
        [true, 240],
        [false, 64],
    ])("derives both endpoints from rendered panes (expanded=%s)", (isExpanded, rootWidth) => {
        const root = element(rootWidth);
        const content = element(isExpanded ? 220 : 44);
        const full = element(220);
        const summary = element(44);
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

    it("does not replace settled endpoints with transformed mid-morph geometry", async () => {
        let rootWidth = 240;
        let fullWidth = 220;
        let summaryWidth = 44;
        const root = element(() => rootWidth);
        const content = element(() => fullWidth);
        const full = element(() => fullWidth);
        const summary = element(() => summaryWidth);
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
        fullWidth = 172;
        summaryWidth = 0;
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
        const full = element(() => (layout.expanded ? layout.span : 56));
        const summary = element(40);
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
});
