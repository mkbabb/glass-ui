// The side sheet's spring-mount convergence.
//
// The former CSS `slide-*` keyframe restarted an interrupted exit from the
// resting-open origin, so a reverse-mid-enter snapped the sheet to fully-open
// then slid out (the V6 FAIL-1). The side sheet now rides the shared spring
// (`useSpringMount` → velocity-preserving re-target), driving a `translate`
// LONGHAND on the surface and an opacity synced from the SAME scalar on the scrim.
//
// These units pin the derivation surface: the two pure helpers (R1's longhand
// bug + the clamp) and SheetContent's arming (it slides via the spring; the
// `slide-*`/`sheet-animate` keyframes are gone). The interruption trace + momentum are
// native debt on the V8 sweep.
//
// AMENDED by W-DIALOG: the side surface is `SheetContent` again, so the `placement`
// fork and the `springPreset` routing clauses die with the props they exercised — a
// sheet has no centre branch to gate, and MOTION-CANON gives the surface ONE curve.
// The scrim-sync + keyframe-deletion clauses are the substance and they stay.

import { mount } from "@vue/test-utils";
import { defineComponent, h, nextTick } from "vue";
import { describe, expect, it, vi } from "vitest";

import { sheetSlideTransform, scrimOpacity } from "@glass/components/sheet/motion";
import * as springMountModule from "@glass/composables/motion/spring/useSpringMount";
import { SheetContent } from "@glass/components/sheet";
import {
    Dialog,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@glass/components/dialog";

describe("sheetSlideTransform — a translate LONGHAND, never a transform fn", () => {
    it("emits an off-edge longhand pair per placement at p=1", () => {
        expect(sheetSlideTransform("right", 1)).toBe("100% 0");
        expect(sheetSlideTransform("left", 1)).toBe("-100% 0");
        expect(sheetSlideTransform("bottom", 1)).toBe("0 100%");
        expect(sheetSlideTransform("top", 1)).toBe("0 -100%");
    });

    it("is at rest (zero magnitude) at p=0 for every placement", () => {
        expect(sheetSlideTransform("right", 0)).toBe("0% 0");
        expect(sheetSlideTransform("left", 0)).toBe("0% 0");
        expect(sheetSlideTransform("bottom", 0)).toBe("0 0%");
        expect(sheetSlideTransform("top", 0)).toBe("0 0%");
    });

    it("is a longhand pair, NOT a translateX()/translateY() transform function", () => {
        for (const p of ["right", "left", "bottom", "top"] as const) {
            const v = sheetSlideTransform(p, 0.42);
            expect(v).not.toMatch(/translate[XY]?\(/);
            // A `translate` longhand is one or two <length-percentage> tokens.
            expect(v).toMatch(/^-?[\d.]+% (0|-?[\d.]+%)$|^0 -?[\d.]+%$/);
        }
    });

    it("leaves p unclamped so the overshoot IS the settle", () => {
        // p can transiently go < 0 (entrance overshoot) — the helper must not clamp.
        expect(sheetSlideTransform("right", -0.015)).toBe("-1.5% 0");
    });
});

describe("scrimOpacity (position → clamped opacity)", () => {
    it("maps open→1, dismissed→0", () => {
        expect(scrimOpacity(0)).toBe(1);
        expect(scrimOpacity(1)).toBe(0);
        expect(scrimOpacity(0.25)).toBe(0.75);
    });

    it("clamps the spring overshoot to [0,1]", () => {
        expect(scrimOpacity(-0.02)).toBe(1); // entrance overshoot (p<0)
        expect(scrimOpacity(1.02)).toBe(0); // dismiss overshoot (p>1)
    });
});

function mountSheet(opts: { side?: "top" | "right" | "bottom" | "left" } = {}) {
    const Host = defineComponent({
        setup() {
            return () =>
                h(Dialog, { open: true }, () => [
                    h(DialogTrigger, () => "open"),
                    h(
                        SheetContent,
                        { class: "test-sheet", ...(opts.side ? { side: opts.side } : {}) },
                        () => [
                            h(DialogTitle, { class: "sr-only" }, () => "Sheet"),
                            h(DialogDescription, { class: "sr-only" }, () => "Sheet motion fixture."),
                            h("p", "body"),
                        ],
                    ),
                ]);
        },
    });
    return mount(Host, {
        attachTo: document.body,
        global: { stubs: { teleport: false } },
    });
}

const content = () => document.querySelector(".test-sheet") as HTMLElement | null;
const scrim = () => document.querySelector(".bg-overlay-scrim") as HTMLElement | null;

describe("SheetContent arming (SHEET-INTERRUPTIBLE-MOTION)", () => {
    it("slides via the spring translate longhand; the slide-*/sheet-animate keyframes are gone", async () => {
        const wrapper = mountSheet({ side: "right" });
        await nextTick();
        await nextTick();
        const el = content();
        expect(el).not.toBeNull();

        // The spring drives an inline `translate` LONGHAND (happy-dom keeps it on
        // `.style.translate`, not the serialized attribute).
        expect(el!.style.translate).not.toBe("");
        expect(el!.style.translate).toMatch(/%/);
        expect(el!.style.animation).toBe("none");

        // The keyframe path is deleted from the surface.
        expect(el!.className).not.toMatch(/slide-in-from|slide-out-to|sheet-animate/);
        // ...and it never composes the centred plate's bloom recipe.
        expect(el!.className).not.toContain("glass-reveal");

        // The scrim reads the same scalar → opacity inline, no fade keyframe.
        const sc = scrim();
        expect(sc).not.toBeNull();
        expect(sc!.className).not.toContain("sheet-animate");
        expect(sc!.style.opacity).not.toBe("");
        wrapper.unmount();
    });

    it("rides ONE curve — the spring mount takes the panel row on every side", async () => {
        const spy = vi.spyOn(springMountModule, "useSpringMount");
        try {
            for (const side of ["top", "right", "bottom", "left"] as const) {
                spy.mockClear();
                const wrapper = mountSheet({ side });
                expect(spy).toHaveBeenCalledWith(
                    expect.objectContaining({ preset: "panel" }),
                );
                await nextTick();
                await nextTick();
                expect(content()!.style.translate).toMatch(/%/);
                wrapper.unmount();
            }
        } finally {
            spy.mockRestore();
        }
    });
});
