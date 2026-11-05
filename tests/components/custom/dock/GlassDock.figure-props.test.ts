// U/B7 G1 (5) — the three GlassDock props a per-figure dock needs (R-FIGDOCK §3 G-1..G-3,
// PLAN §5.2): `expandOn`, `anchor`, `collapsedLabel`. Each defaults to today's behaviour.
//
// On the v10.1.1 tag none of the three props exists: a "press" dock still springs open on
// a hover dwell and closes on the idle timer, no anchor reaches the root, and every
// summary reads "Expand dock". Those cases fail there and pass here; the default cases
// pass on both (they guard that existing docks are unchanged).
import { mount } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { h, nextTick } from "vue";

import GlassDock from "@glass/components/dock/GlassDock.vue";
import DockControl from "@glass/components/dock/DockControl.vue";
import { DOCK_COLLAPSE_DELAY_MS, HOVER_INTENT_MS } from "@glass/components/dock/constants";

const wrappers: Array<{ unmount: () => void }> = [];

function mountDock(props: Record<string, unknown> = {}) {
    const wrapper = mount(GlassDock, {
        props,
        slots: {
            default: () => [
                h(DockControl, { "aria-label": "Options" }, () => "o"),
                h(DockControl, { "aria-label": "Download" }, () => "d"),
            ],
            collapsed: () => h("span", "…"),
        },
        attachTo: document.body,
    });
    wrappers.push(wrapper);
    return wrapper;
}

const isExpanded = (w: ReturnType<typeof mountDock>) => w.classes().includes("expanded");

beforeEach(() => vi.useFakeTimers());
afterEach(() => {
    for (const w of wrappers.splice(0)) w.unmount();
    vi.clearAllTimers();
    vi.useRealTimers();
});

describe("GlassDock expandOn", () => {
    it("default (hover): a hover dwell expands the dock, as before", async () => {
        const w = mountDock();
        expect(isExpanded(w)).toBe(false);
        await w.trigger("mouseenter");
        vi.advanceTimersByTime(HOVER_INTENT_MS + 20);
        await nextTick();
        expect(isExpanded(w)).toBe(true);
    });

    it("press: a hover dwell and focus inside do not open it", async () => {
        const w = mountDock({ expandOn: "press" });
        await w.trigger("mouseenter");
        vi.advanceTimersByTime(HOVER_INTENT_MS + 500);
        await nextTick();
        expect(isExpanded(w)).toBe(false);
        await w.trigger("focusin");
        await nextTick();
        expect(isExpanded(w)).toBe(false);
    });

    it("press: a press on the summary opens it pinned, and the idle timer never closes it", async () => {
        const w = mountDock({ expandOn: "press" });
        await w.get(".dock-layer--summary").trigger("click");
        await nextTick();
        expect(isExpanded(w)).toBe(true);
        expect(w.classes()).toContain("pinned");
        await w.trigger("mouseleave");
        vi.advanceTimersByTime(DOCK_COLLAPSE_DELAY_MS * 3);
        await nextTick();
        expect(isExpanded(w)).toBe(true);
    });

    it("press: Enter on the summary opens it", async () => {
        const w = mountDock({ expandOn: "press" });
        await w.get(".dock-layer--summary").trigger("keydown", { key: "Enter" });
        await nextTick();
        expect(isExpanded(w)).toBe(true);
    });

    it("press: focus leaving the dock for the page closes it", async () => {
        const outside = document.createElement("button");
        document.body.append(outside);
        const w = mountDock({ expandOn: "press" });
        await w.get(".dock-layer--summary").trigger("click");
        await nextTick();
        expect(isExpanded(w)).toBe(true);
        await w.trigger("focusout", { relatedTarget: outside });
        await nextTick();
        expect(isExpanded(w)).toBe(false);
        outside.remove();
    });

    it("press: Escape inside the open face closes it", async () => {
        const w = mountDock({ expandOn: "press" });
        await w.get(".dock-layer--summary").trigger("click");
        await nextTick();
        await w.get(".dock-layer--full").trigger("keydown", { key: "Escape" });
        await nextTick();
        expect(isExpanded(w)).toBe(false);
    });
});

describe("GlassDock anchor", () => {
    it("default (center): no anchor attribute, the morph grows from the centre", () => {
        const w = mountDock();
        expect(w.attributes("data-anchor")).toBeUndefined();
    });

    // The pin itself is layout, which jsdom cannot do: the engine witness is
    // `tests-visual/u-b7.spec.ts` ("anchor · …"), which lays the dock in a flex and a
    // grid row with free space in Chromium and WebKit and measures the edge gap.
    it("end: the root carries the anchor, and the origin stays measured", () => {
        const w = mountDock({ anchor: "end" });
        expect(w.attributes("data-anchor")).toBe("end");
        const css = readFileSync(
            join(process.cwd(), "src/components/dock/styles/layers.css"),
            "utf8",
        ).replace(/\/\*[\s\S]*?\*\//g, "");
        // The morph's origin is the measured fixed point (`--dock-morph-origin`), never a
        // declared edge: no anchor rule sets `transform-origin`.
        expect(css).not.toMatch(/\[data-anchor="[a-z]+"\][^{]*\{[^}]*transform-origin/);
        expect(css).toMatch(/\.glass-dock\[data-morphing\]:not\(\.vertical\)\s*\{\s*transform-origin:\s*var\(--dock-morph-origin\) center;/);
    });
});

describe("GlassDock collapsedLabel", () => {
    it("default: the summary disclosure reads 'Expand dock'", () => {
        const w = mountDock();
        expect(w.get(".dock-layer--summary").attributes("aria-label")).toBe("Expand dock");
    });

    it("names the summary disclosure", () => {
        const w = mountDock({ collapsedLabel: "Tools for Fund balance by year" });
        expect(w.get(".dock-layer--summary").attributes("aria-label")).toBe(
            "Tools for Fund balance by year",
        );
    });
});
