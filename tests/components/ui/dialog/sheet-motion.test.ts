// BI.W-SHEET-INTERRUPTIBLE-MOTION — the side sheet's spring-mount convergence.
//
// The former CSS `slide-*` keyframe restarted an interrupted exit from the
// resting-open origin, so a reverse-mid-enter snapped the sheet to fully-open
// then slid out (the V6 FAIL-1). The side sheet now rides the shared spring
// (`useSpringMount` → velocity-preserving re-target), driving a `translate`
// LONGHAND on the surface and an opacity synced from the SAME scalar on the scrim.
//
// These units pin the derivation surface: the two pure helpers (R1's longhand
// bug + the clamp) and the DialogContent arming gate (side slides via the spring;
// the `slide-*`/`sheet-animate` keyframes are gone; center is untouched). The
// interruption trace + momentum are native debt on the V8 sweep.

import { mount } from "@vue/test-utils";
import { defineComponent, h, nextTick } from "vue";
import { describe, expect, it, vi } from "vitest";

import { sheetSlideTransform, scrimOpacity } from "@glass/components/dialog/sheet-motion";
// The exact module DialogContent imports `useSpringMount` from — spied to witness the
// consumer's `springPreset` reaching the spring mount (no hand number, no ignored prop).
import * as springMountModule from "@glass/composables/motion/spring/useSpringMount";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@glass/components/dialog/index";

describe("sheetSlideTransform (R1 — translate LONGHAND, never a transform fn)", () => {
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

    it("is a longhand pair, NOT a translateX()/translateY() transform function (R1 paint-nothing bug)", () => {
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

function mountDialog(opts: {
    placement?: "center" | "top" | "right" | "bottom" | "left";
    springPreset?: "smooth" | "snappy" | "bouncy" | "gentle";
}) {
    const Host = defineComponent({
        setup() {
            return () =>
                h(Dialog, { open: true }, () => [
                    h(DialogTrigger, () => "open"),
                    h(
                        DialogContent,
                        {
                            class: "test-sheet",
                            ...(opts.placement ? { placement: opts.placement } : {}),
                            ...(opts.springPreset ? { springPreset: opts.springPreset } : {}),
                        },
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

describe("DialogContent arming gate — side vs center (SHEET-INTERRUPTIBLE-MOTION)", () => {
    it("a side sheet slides via the spring translate longhand; the slide-*/sheet-animate keyframes are gone", async () => {
        const wrapper = mountDialog({ placement: "right" });
        await nextTick();
        await nextTick();
        const el = content();
        expect(el).not.toBeNull();

        // The spring drives an inline `translate` LONGHAND (happy-dom keeps it on
        // `.style.translate`, not the serialized attribute).
        expect(el!.style.translate).not.toBe("");
        expect(el!.style.translate).toMatch(/%/);
        expect(el!.style.animation).toBe("none");

        // The keyframe path is deleted from the side surface.
        expect(el!.className).not.toMatch(/slide-in-from|slide-out-to|sheet-animate/);
        // ...and the side sheet never composes the center bloom recipe.
        expect(el!.className).not.toContain("glass-reveal");

        // The scrim reads the same scalar → opacity inline, no fade keyframe.
        const sc = scrim();
        expect(sc).not.toBeNull();
        expect(sc!.className).not.toContain("sheet-animate");
        expect(sc!.style.opacity).not.toBe("");
        wrapper.unmount();
    });

    it("a preset-less center dialog is untouched: glass-reveal path, no side spring, no data-spring", async () => {
        const wrapper = mountDialog({ placement: "center" });
        await nextTick();
        await nextTick();
        const el = content();
        expect(el).not.toBeNull();
        expect(el!.className).toContain("glass-reveal");
        expect(el!.style.translate).toBeFalsy(); // no spring style on the preset-less center path
        expect(el!.getAttribute("data-spring")).toBeNull();
        // The center scrim keeps its fade keyframe (slideT null).
        expect(scrim()!.className).toContain("sheet-animate");
        wrapper.unmount();
    });

    it("preset routing: the consumer's springPreset reaches the spring mount — a distinct register, not a hand number", async () => {
        const spy = vi.spyOn(springMountModule, "useSpringMount");
        try {
            // The named preset propagates verbatim to the spring mount.
            const snappy = mountDialog({ placement: "left", springPreset: "snappy" });
            expect(spy).toHaveBeenCalledWith(
                expect.objectContaining({ preset: "snappy" }),
            );
            await nextTick();
            await nextTick();
            const el = content();
            expect(el).not.toBeNull();
            // ...and the side sheet still slides via the spring longhand, keyframes gone.
            expect(el!.style.translate).toMatch(/%/);
            expect(el!.className).not.toMatch(/slide-in-from|slide-out-to|sheet-animate/);
            snappy.unmount();

            // A DIFFERENT preset reaches it distinctly: an unset springPreset routes the
            // Dialog-family default `smooth`, never a frozen literal. Witnesses that the
            // arg tracks the prop rather than a hardcoded register.
            spy.mockClear();
            const smooth = mountDialog({ placement: "left" });
            expect(spy).toHaveBeenCalledWith(
                expect.objectContaining({ preset: "smooth" }),
            );
            expect(spy).not.toHaveBeenCalledWith(
                expect.objectContaining({ preset: "snappy" }),
            );
            smooth.unmount();
        } finally {
            spy.mockRestore();
        }
    });
});
