// 10.1.2 · atlas G-4 (b-ii) — the critic's counterexample, kept beside the seat rule
// (atlas `critique/D5-A/crit-seat-cx.test.ts`). Seats focusable only by `tabindex`
// (`div[role=button][tabindex=0]`): variant b-i, "rove a seat that is itself focusable"
// read off FOCUSABLE_SELECTOR, demoted them to −1 and then dropped them from the run.
// Under the declared marker the answer turns on the declaration alone. Declared, the
// three are one stop with arrows across them. Undeclared, the run writes nothing: each
// keeps its own stop at 0 and its own keys.
//
// RED on 10.1.1 at the undeclared arm: its focusability inference roved the three
// (stops `["0"]`, ArrowRight moved to seat 1).
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { h, nextTick } from "vue";

import GlassDock from "@glass/components/dock/GlassDock.vue";

function dock(marker: boolean) {
    const a = (s: string) => ({
        "data-seat": s,
        role: "button",
        tabindex: "0",
        ...(marker ? { "data-glass-dock-seat": "" } : {}),
    });
    return mount(GlassDock, {
        props: { collapse: "open" as const },
        slots: {
            default: () => [h("div", a("0"), "a"), h("div", a("1"), "b"), h("div", a("2"), "c")],
        },
        attachTo: document.body,
    });
}

async function stopsAndArrow(marker: boolean) {
    const w = dock(marker);
    await nextTick();
    await nextTick();
    const stops = w
        .findAll("[data-seat]")
        .filter((s) => (s.element as HTMLElement).tabIndex === 0)
        .map((s) => s.attributes("data-seat"));
    const s0 = w.get('[data-seat="0"]').element as HTMLElement;
    s0.focus();
    await w.get('[data-seat="0"]').trigger("keydown", { key: "ArrowRight" });
    await nextTick();
    const after = document.activeElement?.getAttribute("data-seat");
    w.unmount();
    return { stops, after };
}

describe("critic · tabindex-only seats", () => {
    it("declared: one stop, and ArrowRight from the stop reaches seat 1", async () => {
        expect(await stopsAndArrow(true)).toEqual({ stops: ["0"], after: "1" });
    });

    it("undeclared: every seat keeps its own stop, and ArrowRight stays put", async () => {
        expect(await stopsAndArrow(false)).toEqual({ stops: ["0", "1", "2"], after: "0" });
    });
});
