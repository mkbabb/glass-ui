// W13 — Sheet spring entrance + drag-dismiss opt-in (BH.W-MOTION-AXIS re-pointed).
//
// The `spring` boolean RETIRED onto the ONE `motion` axis + a distinct `springPreset`
// prop (the curve choice). Validates that SheetContent emits the data-spring +
// data-drag-dismiss surface hooks and that the spring path suppresses the canonical
// sheet slide animation. `dragDismiss` is now SELF-SUFFICIENT — it engages the spring
// engine on its own (the gesture needs it) when `motion !== "off"`, so a bare
// `dragDismiss` (no `springPreset`) now spring-mounts + emits the hook. Drag-gesture
// mechanics are exercised at `useSpringMount.test.ts` against the composable directly.

import { mount } from "@vue/test-utils";
import { defineComponent, h, nextTick } from "vue";
import { afterEach, describe, expect, it } from "vitest";

import { Sheet, SheetContent, SheetTrigger } from "@glass/components/ui/sheet/index";

type PresetValue = "smooth" | "snappy" | "bouncy" | "gentle";
type MotionValue = "full" | "reduced" | "off";
type Side = "top" | "right" | "bottom" | "left";

function mountSheet(opts: {
    springPreset?: PresetValue;
    motion?: MotionValue;
    dragDismiss?: boolean;
    side?: Side;
} = {}) {
    const Host = defineComponent({
        components: { Sheet, SheetContent, SheetTrigger },
        setup() {
            const contentProps: Record<string, unknown> = { class: "test-sheet" };
            if (opts.side) contentProps.side = opts.side;
            if (opts.springPreset !== undefined) contentProps.springPreset = opts.springPreset;
            if (opts.motion !== undefined) contentProps.motion = opts.motion;
            if (opts.dragDismiss) contentProps.dragDismiss = true;
            return () =>
                h(Sheet, { open: true }, () => [
                    h(SheetTrigger, () => "open"),
                    h(SheetContent, contentProps, () => h("p", "body")),
                ]);
        },
    });
    return mount(Host, {
        attachTo: document.body,
        global: { stubs: { teleport: false } },
    });
}

function findSheet(): HTMLElement | null {
    return document.querySelector(".test-sheet") as HTMLElement | null;
}

afterEach(() => {
    // reka-ui leaves the portal subtree under document.body even after unmount;
    // a fresh `data-state="open"` element would shadow the next test's query.
    // Clear any orphans so each test starts clean.
    document.body.querySelectorAll(".test-sheet").forEach((n) => n.remove());
});

describe("SheetContent — W13 spring entrance + drag-dismiss (BH.W-MOTION-AXIS)", () => {
    it("does not emit data-spring when springPreset + dragDismiss are unset", async () => {
        const wrapper = mountSheet();
        await nextTick();
        const portal = findSheet();
        expect(portal).not.toBeNull();
        expect(portal!.getAttribute("data-spring")).toBeNull();
        expect(portal!.getAttribute("data-drag-dismiss")).toBeNull();
        wrapper.unmount();
    });

    it("emits data-spring=\"smooth\" when springPreset=\"smooth\"", async () => {
        const wrapper = mountSheet({ springPreset: "smooth", side: "bottom" });
        await nextTick();
        const portal = findSheet();
        expect(portal!.getAttribute("data-spring")).toBe("smooth");
        // Inline animation override suppresses the slide-in keyframe race.
        const style = portal!.getAttribute("style") ?? portal!.style.cssText;
        expect(style).toMatch(/animation/);
        wrapper.unmount();
    });

    it("emits data-drag-dismiss when dragDismiss engages the engine (self-sufficient)", async () => {
        const wrapper = mountSheet({ dragDismiss: true, side: "bottom" });
        await nextTick();
        const portal = findSheet();
        // BH.W-MOTION-AXIS — `dragDismiss` now engages the spring engine on its own; the
        // preset defaults to `smooth`.
        expect(portal!.getAttribute("data-spring")).toBe("smooth");
        expect(portal!.getAttribute("data-drag-dismiss")).toBe("");
        wrapper.unmount();
    });

    it("does NOT emit data-drag-dismiss when motion=\"off\" (the engine unbinds)", async () => {
        // motion="off" opts DOWN past the drag engine — no continuity-preserving target
        // to drive, so the gesture is a no-op (the functional close still works via reka).
        const wrapper = mountSheet({ dragDismiss: true, motion: "off", side: "bottom" });
        await nextTick();
        const portal = findSheet();
        expect(portal!.getAttribute("data-drag-dismiss")).toBeNull();
        expect(portal!.getAttribute("data-spring")).toBeNull();
        expect(portal!.getAttribute("data-motion")).toBe("off");
        wrapper.unmount();
    });

    it("writes an inline transform under springPreset for each side", async () => {
        for (const side of ["top", "right", "bottom", "left"] as const) {
            const wrapper = mountSheet({ springPreset: "smooth", side });
            await nextTick();
            const portal = findSheet();
            expect(portal).not.toBeNull();
            const style = portal!.getAttribute("style") ?? portal!.style.cssText;
            expect(style).toContain("transform");
            // The translate axis matches the side.
            if (side === "top" || side === "bottom") {
                expect(style).toMatch(/translateY/);
            } else {
                expect(style).toMatch(/translateX/);
            }
            wrapper.unmount();
            // Manual cleanup between iterations so the next iteration's query
            // doesn't pick up the previous portal's stale node.
            document.body.querySelectorAll(".test-sheet").forEach((n) => n.remove());
        }
    });
});
