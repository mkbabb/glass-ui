// 10.1.1 · atlas G-3/G-4 — the critic's counterexample, kept beside the seat rule
// (atlas `critique/D5-A/crit-seat-cx.test.ts`). A seat focusable only by `tabindex`
// stays a roved seat after the run demotes it to −1: "rove only a seat that is itself
// focusable" read off the sequential FOCUSABLE_SELECTOR alone dropped it from the run
// (variant b-i, `expected '0' to be '1'`). The marker arm is G-4's declared-target
// shape; the seat rule must hold with it and without it.
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { h, nextTick } from "vue";

import GlassDock from "@glass/components/dock/GlassDock.vue";

function dock(marker: boolean) {
    const a = (s: string) => ({
        "data-seat": s,
        role: "button",
        tabindex: "0",
        ...(marker ? { "data-dock-seat-target": "" } : {}),
    });
    return mount(GlassDock, {
        props: { collapse: "open" as const },
        slots: {
            default: () => [h("div", a("0"), "a"), h("div", a("1"), "b"), h("div", a("2"), "c")],
        },
        attachTo: document.body,
    });
}

describe("critic · tabindex-only seats", () => {
    for (const marker of [false, true]) {
        it(`marker=${marker}: one stop, and ArrowRight from the stop reaches seat 1`, async () => {
            const w = dock(marker);
            await nextTick();
            await nextTick();
            const stops = w
                .findAll("[data-seat]")
                .filter((s) => (s.element as HTMLElement).tabIndex === 0);
            expect(stops.map((s) => s.attributes("data-seat"))).toEqual(["0"]);
            const s0 = w.get('[data-seat="0"]').element as HTMLElement;
            s0.focus();
            await w.get('[data-seat="0"]').trigger("keydown", { key: "ArrowRight" });
            await nextTick();
            expect(document.activeElement?.getAttribute("data-seat")).toBe("1");
            w.unmount();
        });
    }
});
