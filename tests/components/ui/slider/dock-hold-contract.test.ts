// AX.W03 — the born-RED dock-hold mount gate (proof:dock-hold-contract).
//
// The keepDockOpen contract has NEVER worked through a real reka-ui drag: the
// `@pointerdown` template binding on <SliderRoot> lands in $attrs (SliderRoot is
// `inheritAttrs:false`) and is DROPPED across the reka Slot/forwardRef boundary —
// reka's own `onPointerdown` shadows it on the resolved `data-slider-impl` host.
// vue-tsc + units PASS, only a real event-on-the-host catches it
// (feedback_glass_ui_binding_verification.md, made load-bearing here).
//
// This is the DETERMINISTIC, browser-FREE mount gate that bites in CI: it mounts
// <GlassDock><Slider/></GlassDock>, resolves the slider's ACTUAL host element,
// dispatches a REAL `pointerdown` Event on it, and asserts the provided
// DockContext.keepOpen() fired + the dock root + slider root carry `data-held`.
//
// Born-RED at HEAD (the listener never binds to the host that receives the
// event); GREEN after useDockHold attaches the native listener to the resolved
// host. Replaces the fail-open `detectSliderHold` SKIP arm of
// proof:dock-layering-polish (a behavioral gate that silently passes when its
// harness is absent provides false assurance).
//
// Bite-check: revert Slider.vue to the `@pointerdown` template binding (drop
// useDockHold) → the "keepOpen fires on host pointerdown" assertion reddens.

import { mount } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { defineComponent, h, nextTick, ref } from "vue";

import GlassDock from "../../../../src/components/custom/dock/GlassDock.vue";
import Slider from "../../../../src/components/ui/slider/Slider.vue";

// happy-dom lacks pointer-capture; reka's own onPointerdown calls
// setPointerCapture (it may throw NotFoundError on a synthetic event). A throw
// in ONE listener does not abort the others, but stub it so reka's handler is
// quiet and the test reads the production single-acquire path cleanly.
beforeEach(() => {
    if (!HTMLElement.prototype.setPointerCapture) {
        HTMLElement.prototype.setPointerCapture = vi.fn();
    }
    if (!HTMLElement.prototype.releasePointerCapture) {
        HTMLElement.prototype.releasePointerCapture = vi.fn();
    }
    if (!HTMLElement.prototype.hasPointerCapture) {
        HTMLElement.prototype.hasPointerCapture = vi.fn(() => false);
    }
});

/**
 * Mount `<GlassDock><Slider/></GlassDock>`. The GlassDock provides the canonical
 * typed DockContext (keepOpen/release/held). We spy keepOpen/release by wrapping
 * the dock — but the dock owns the provide, so the robust spy is RENDERED state:
 * the dock root's `data-held` (driven by `useDockState.isHeld`, the sole writer)
 * and the slider root's `data-held` (which subscribes to the same DockContext.held).
 */
async function mountDockSlider() {
    const value = ref<number[]>([42]);
    const Host = defineComponent({
        setup() {
            return () =>
                h(GlassDock, { startCollapsed: false, collapseDelay: 600 }, () => [
                    h(Slider, {
                        modelValue: value.value,
                        "onUpdate:modelValue": (v: number[]) => (value.value = v),
                        max: 100,
                        step: 1,
                        "aria-label": "Volume",
                    }),
                ]);
        },
    });
    const wrapper = mount(Host, { attachTo: document.body });
    await nextTick();
    await nextTick();
    return wrapper;
}

/** The slider's ACTUAL host — the element that receives a real pointerdown. */
function resolveSliderHost(): HTMLElement {
    // The forwarded SliderRoot renders the `data-slot="slider"` host (which IS the
    // reka data-slider-impl Primitive — reka forwards the ref through the slot).
    const host =
        document.querySelector<HTMLElement>('[data-slot="slider"]') ??
        document.querySelector<HTMLElement>("[data-slider-impl]");
    if (!host) throw new Error("slider host not found in mounted dock");
    return host;
}

function dockRoot(): HTMLElement {
    const el = document.querySelector<HTMLElement>(".glass-dock");
    if (!el) throw new Error("dock root not found");
    return el;
}

function firePointer(el: EventTarget, type: string): void {
    el.dispatchEvent(
        new PointerEvent(type, {
            bubbles: true,
            cancelable: true,
            pointerId: 1,
            pointerType: "mouse",
        }),
    );
}

describe("AX.W03 — dock-hold contract (pointerdown on the slider host acquires keepOpen)", () => {
    afterEach(() => {
        document.body.innerHTML = "";
    });

    it("a real pointerdown on the resolved slider host flips data-held on the dock AND the slider", async () => {
        const wrapper = await mountDockSlider();

        const host = resolveSliderHost();
        const dock = dockRoot();

        // Pre-condition: nothing held.
        expect(dock.getAttribute("data-held")).toBeNull();
        expect(host.getAttribute("data-held")).toBeNull();

        // The proof gesture: a REAL pointerdown on the slider's actual host.
        firePointer(host, "pointerdown");
        await nextTick();

        // The hold is a synchronous reactive edge into the ONE state machine:
        // keepOpen() bumps keepOpenCount → isHeld (the sole data-held writer)
        // → data-held on BOTH the dock root and the slider root.
        expect(dock.getAttribute("data-held")).toBe("true");
        expect(host.getAttribute("data-held")).toBe("true");

        wrapper.unmount();
    });

    it("window pointerup releases the hold and clears data-held", async () => {
        const wrapper = await mountDockSlider();
        const host = resolveSliderHost();
        const dock = dockRoot();

        firePointer(host, "pointerdown");
        await nextTick();
        expect(dock.getAttribute("data-held")).toBe("true");

        // reka sets pointer-capture on the thumb, so release bubbles to window.
        firePointer(window, "pointerup");
        await nextTick();

        expect(dock.getAttribute("data-held")).toBeNull();
        expect(host.getAttribute("data-held")).toBeNull();

        wrapper.unmount();
    });

    it("the dock stays HELD past the collapse delay during the drag (idle-collapse suppressed)", async () => {
        vi.useFakeTimers();
        try {
            const wrapper = await mountDockSlider();
            const host = resolveSliderHost();
            const dock = dockRoot();

            firePointer(host, "pointerdown");
            await nextTick();
            expect(dock.getAttribute("data-held")).toBe("true");

            // Leave the dock and wait LONGER than the 600ms collapse delay.
            dock.dispatchEvent(new MouseEvent("mouseleave", { bubbles: true }));
            vi.advanceTimersByTime(900);
            await nextTick();

            // The hold suppresses the idle-collapse timer — still held.
            expect(dock.getAttribute("data-held")).toBe("true");

            wrapper.unmount();
        } finally {
            vi.useRealTimers();
        }
    });

    it("a touch drag on the SAME host acquires through the SAME single path (no second parallel acquire)", async () => {
        // The touch path is owned by the SAME useDockHold — the useTouchGate
        // scroll-vs-drag arbitration FEEDS the one acquire. Simulate a touch
        // device so the gate engages (it is a no-op when isTouchDevice is false).
        (window as unknown as { ontouchstart: null }).ontouchstart = null;
        try {
            const wrapper = await mountDockSlider();
            const host = resolveSliderHost();
            const dock = dockRoot();

            const fireTouch = (type: string, clientY = 100): void => {
                const touch = { clientY, clientX: 50, identifier: 1, target: host };
                host.dispatchEvent(
                    new TouchEvent(type, {
                        bubbles: true,
                        cancelable: true,
                        touches:
                            type === "touchend"
                                ? []
                                : ([touch] as unknown as Touch[]),
                    }),
                );
            };

            // touchstart enters the gate's pending window; touchend (no scroll)
            // activates → the gate's isActive watch drives the ONE acquire.
            fireTouch("touchstart");
            fireTouch("touchend");
            await nextTick();
            expect(dock.getAttribute("data-held")).toBe("true");

            // A pointerdown DURING the active touch hold must NOT double-acquire
            // (the idempotent `acquired` latch is shared) — a single release
            // (off-control tap → gate deactivate) must clear the hold.
            firePointer(host, "pointerdown");
            await nextTick();
            expect(dock.getAttribute("data-held")).toBe("true");

            // The shared global off-control touch deactivates the gate → release;
            // the pointerup releases the pointer arm. ONE release clears (no leak).
            firePointer(window, "pointerup");
            document.body.dispatchEvent(
                new TouchEvent("touchstart", { bubbles: true }),
            );
            await nextTick();
            expect(dock.getAttribute("data-held")).toBeNull();

            wrapper.unmount();
        } finally {
            delete (window as unknown as { ontouchstart?: null }).ontouchstart;
        }
    });

    it("a Slider mounted OUTSIDE a dock is a befitting-silent no-op (no throw)", async () => {
        const value = ref<number[]>([10]);
        const Host = defineComponent({
            setup() {
                return () =>
                    h(Slider, {
                        modelValue: value.value,
                        "onUpdate:modelValue": (v: number[]) => (value.value = v),
                        max: 100,
                        "aria-label": "Loose",
                    });
            },
        });
        const wrapper = mount(Host, { attachTo: document.body });
        await nextTick();

        const host = document.querySelector<HTMLElement>('[data-slot="slider"]')!;
        // No dock context → useOptionalDockContext returns null → silent no-op.
        expect(() => firePointer(host, "pointerdown")).not.toThrow();
        expect(host.getAttribute("data-held")).toBeNull();

        wrapper.unmount();
    });
});
