// The idle window: a hovered dock the pointer leaves stays open for six seconds, then
// folds.
import { mount } from "@vue/test-utils";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { h, nextTick } from "vue";

import GlassDock from "@glass/components/dock/GlassDock.vue";
import DockControl from "@glass/components/dock/DockControl.vue";
import { DOCK_COLLAPSE_DELAY_MS, HOVER_INTENT_MS } from "@glass/components/dock/constants";

const wrappers: Array<{ unmount: () => void }> = [];

beforeEach(() => vi.useFakeTimers());
afterEach(() => {
    for (const w of wrappers.splice(0)) w.unmount();
    vi.clearAllTimers();
    vi.useRealTimers();
});

it("the idle window is six seconds", () => {
    expect(DOCK_COLLAPSE_DELAY_MS).toBe(6000);
});

it("a dock the pointer leaves stays open for six seconds, then folds", async () => {
    const w = mount(GlassDock, {
        slots: {
            default: () => [h(DockControl, { "aria-label": "Options" }, () => "o")],
            collapsed: () => h("span", "…"),
        },
        attachTo: document.body,
    });
    wrappers.push(w);
    const expanded = () => w.classes().includes("expanded");
    await w.trigger("mouseenter");
    vi.advanceTimersByTime(HOVER_INTENT_MS + 20);
    await nextTick();
    expect(expanded()).toBe(true);
    await w.trigger("mouseleave");
    vi.advanceTimersByTime(5900);
    await nextTick();
    expect(expanded(), "open at 5.9 s").toBe(true);
    vi.advanceTimersByTime(200);
    await nextTick();
    expect(expanded(), "folded at 6.1 s").toBe(false);
});
