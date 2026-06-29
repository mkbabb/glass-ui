// W13 — Sheet spring entrance + drag-dismiss opt-in.
//
// Validates that SheetContent emits the data-spring + data-drag-dismiss
// surface hooks and that the spring path suppresses the canonical sheet
// slide animation. Drag-gesture mechanics (threshold, bounce-back,
// mid-flight re-target continuity, on-settle dismiss firing) are exercised
// at `useSpringMount.test.ts` against the composable directly.

import { mount } from "@vue/test-utils";
import { defineComponent, h, nextTick } from "vue";
import { afterEach, describe, expect, it } from "vitest";

import { Sheet, SheetContent, SheetTrigger } from "@glass/components/ui/sheet/index";

type SpringValue = boolean | "smooth" | "snappy" | "bouncy" | "gentle";
type Side = "top" | "right" | "bottom" | "left";

function mountSheet(opts: {
    spring?: SpringValue;
    dragDismiss?: boolean;
    side?: Side;
} = {}) {
    const Host = defineComponent({
        components: { Sheet, SheetContent, SheetTrigger },
        setup() {
            const contentProps: Record<string, unknown> = { class: "test-sheet" };
            if (opts.side) contentProps.side = opts.side;
            if (opts.spring !== undefined) contentProps.spring = opts.spring;
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

describe("SheetContent — W13 spring entrance + drag-dismiss", () => {
    it("does not emit data-spring when spring is unset", async () => {
        const wrapper = mountSheet();
        await nextTick();
        const portal = findSheet();
        expect(portal).not.toBeNull();
        expect(portal!.getAttribute("data-spring")).toBeNull();
        expect(portal!.getAttribute("data-drag-dismiss")).toBeNull();
        wrapper.unmount();
    });

    it("emits data-spring=\"smooth\" when spring=true", async () => {
        const wrapper = mountSheet({ spring: true, side: "bottom" });
        await nextTick();
        const portal = findSheet();
        expect(portal!.getAttribute("data-spring")).toBe("smooth");
        // Inline animation override suppresses the slide-in keyframe race.
        const style = portal!.getAttribute("style") ?? portal!.style.cssText;
        expect(style).toMatch(/animation/);
        wrapper.unmount();
    });

    it("emits data-drag-dismiss when both spring + dragDismiss are set", async () => {
        const wrapper = mountSheet({ spring: true, dragDismiss: true, side: "bottom" });
        await nextTick();
        const portal = findSheet();
        expect(portal!.getAttribute("data-spring")).toBe("smooth");
        expect(portal!.getAttribute("data-drag-dismiss")).toBe("");
        wrapper.unmount();
    });

    it("does NOT emit data-drag-dismiss when dragDismiss=true but spring is unset", async () => {
        // dragDismiss is gated on spring — without the spring engine there is
        // no continuity-preserving target to drive, so the gesture is a no-op.
        const wrapper = mountSheet({ dragDismiss: true });
        await nextTick();
        const portal = findSheet();
        expect(portal!.getAttribute("data-drag-dismiss")).toBeNull();
        wrapper.unmount();
    });

    it("writes an inline transform under spring for each side", async () => {
        for (const side of ["top", "right", "bottom", "left"] as const) {
            const wrapper = mountSheet({ spring: true, side });
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
