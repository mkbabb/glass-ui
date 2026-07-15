import { mount } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { defineComponent, h, ref } from "vue";

import GlassDock from "@glass/components/dock/GlassDock.vue";
import DockControl from "@glass/components/dock/DockControl.vue";

/**
 * AT.W6-dock-b — the BEHAVIOURAL touch-gate contract over the LIVE `<GlassDock>`
 * (the constellation `dock:touch-gate` residual, inv-16′ / inv ε).
 *
 * keyframes.js filed a field defect — "glass-ui dock buttons require a
 * double-click; fix in glass-ui root": on a COLLAPSED dock the first tap
 * expands the pill but does NOT activate the tapped control, so users must tap
 * twice. glass-ui's own AT W0b dock audit concluded "no SHIPPED dock bug". The
 * disagreement is resolved here by INSTRUMENT, not assertion: a mounted-dock
 * integration test that drives the real `touchstart`→`touchend` sequence and
 * asserts the iOS Now-Playing mini-bar contract — ONE tap on a collapsed dock
 * control BOTH expands the dock AND activates that control.
 *
 * WHY a gate-level `useTouchGate` unit test cannot catch this (the §C-2
 * correction): the gate is correct in isolation — it tests `activate()`, which
 * is right. The bug lives in the `GlassDock`↔gate INTEGRATION: `GlassDock`
 * `preventDefault()`s the activating `touchstart`/`touchend`, which suppresses
 * the browser's native compatibility `click`, so the tapped control fires
 * nothing. Only a mounted integration test sees that seam.
 *
 * HOW the browser tap→click contract is modelled (happy-dom does NOT synthesize
 * compatibility clicks): the browser fires a single compatibility `click` on the
 * touch target after a tap gesture IFF no `preventDefault()` was called on any
 * touch event in that gesture (`touchstart`/`touchend`). `dispatchTap` drives
 * the dock's real handlers, observes `defaultPrevented` across the whole
 * gesture, and emits the compat `click` exactly when the browser would. The
 * gate's own scroll-cancel + double-tap behaviour is the system under test; the
 * compat-click rule is the only browser behaviour we stand in for.
 */

/** A touch device exposes `ontouchstart` on `window` (the gate's probe). */
function enableTouchDevice(): void {
    Object.defineProperty(window, "ontouchstart", {
        configurable: true,
        value: null,
    });
}

function makeTouch(target: Element, clientY: number): Touch {
    return new Touch({
        identifier: 0,
        target,
        clientX: 0,
        clientY,
    });
}

function fire(
    target: Element,
    type: "touchstart" | "touchmove" | "touchend",
    clientY: number,
): TouchEvent {
    const touch = makeTouch(target, clientY);
    const event = new TouchEvent(type, {
        bubbles: true,
        cancelable: true,
        // touchend carries the lifted touch in `changedTouches`, none in `touches`.
        touches: type === "touchend" ? [] : [touch],
        changedTouches: [touch],
    });
    target.dispatchEvent(event);
    return event;
}

interface TapResult {
    /** True if any touch event in the gesture was `preventDefault()`-ed. */
    suppressed: boolean;
    /** True if the browser would emit a compatibility click → it was dispatched. */
    clicked: boolean;
}

/**
 * Drive a single tap (`touchstart`→`touchend`) through the LIVE dock handlers,
 * then emit the browser's compatibility `click` exactly when the browser would
 * — i.e. only if no touch event in the gesture called `preventDefault()`.
 */
function dispatchTap(target: Element, clientY = 0): TapResult {
    const start = fire(target, "touchstart", clientY);
    const end = fire(target, "touchend", clientY);
    const suppressed = start.defaultPrevented || end.defaultPrevented;
    if (!suppressed) {
        // The browser's native tap→click compatibility event.
        target.dispatchEvent(
            new MouseEvent("click", { bubbles: true, cancelable: true }),
        );
    }
    return { suppressed, clicked: !suppressed };
}

/**
 * Drive a tap that turns into a vertical scroll: `touchstart` →
 * `touchmove` past the >10px threshold → `touchend`.
 */
function dispatchScroll(target: Element): void {
    fire(target, "touchstart", 0);
    fire(target, "touchmove", 40);
    fire(target, "touchend", 40);
}

/**
 * A collapsed dock whose `#collapsed` slot renders a LIVE control — the iOS
 * Now-Playing mini-bar pattern (a single-tap play button in the collapsed pill)
 * that the live keyframes `AnimationMenuBar` consumer depends on. Shape (A)
 * ("collapsed pill = expand-only, no live controls") would DELETE this contract;
 * shape B′ preserves it. The control's `@click` is spied so a single tap's
 * activation is observable.
 */
function mountDockWithCollapsedControl() {
    const onPlay = vi.fn();
    const Host = defineComponent({
        setup() {
            return () =>
                h(
                    // `autoLuminance` OFF: the keep-open / no-regression specs settle the
                    // morph spring via the unbounded `vi.runAllTimers()`, which spins the
                    // dock's default-TRUE perpetual backdrop-luminance rAF monitor past the
                    // 10000-timer abort. Luminance is orthogonal to the touch-gate contract
                    // under test — the product default stays TRUE (test-env scoping, not a
                    // product change; the happy-dom `elementsFromPoint` stub precedent).
                    GlassDock,
                    { startCollapsed: true, autoLuminance: false },
                    {
                        // Expanded layer — full controls.
                        default: () => [
                            h(DockControl, { "aria-label": "Home" }, () => "H"),
                            h(DockControl, { "aria-label": "Search" }, () => "S"),
                        ],
                        // Collapsed pill — a LIVE play button (Now-Playing mini-bar).
                        collapsed: () =>
                            h(
                                DockControl,
                                {
                                    "aria-label": "Play",
                                    "data-testid": "collapsed-play",
                                    onClick: onPlay,
                                },
                                () => "▶",
                            ),
                    },
                );
        },
    });
    const wrapper = mount(Host, { attachTo: document.body });
    return { wrapper, onPlay };
}

describe("GlassDock touch-gate behavioural contract (AT.W6-dock-b)", () => {
    beforeEach(() => {
        vi.useFakeTimers();
        enableTouchDevice();
    });

    afterEach(() => {
        vi.clearAllTimers();
        vi.useRealTimers();
        vi.restoreAllMocks();
        delete (window as Window & { ontouchstart?: unknown }).ontouchstart;
    });

    it("iOS contract: ONE tap on a collapsed dock control BOTH expands AND activates it", async () => {
        const { wrapper, onPlay } = mountDockWithCollapsedControl();
        const root = wrapper.get(".glass-dock").element;
        const play = wrapper.get<HTMLElement>("[data-testid='collapsed-play']")
            .element;

        // Precondition: the dock is collapsed.
        expect(root.classList.contains("collapsed")).toBe(true);

        // ONE tap on the collapsed control — the gate resolves it as a real tap.
        // THE FROZEN-CLOCK INVOKER TRAP (R5-TAP discovery): Vue's event invokers
        // skip an event whose `_vts` stamp is <= their attach time. Under fake
        // timers the clock is FROZEN, so when an ANCESTOR Vue listener (the R5-TAP
        // @click.capture guard on the dock root) stamps the event at the same
        // frozen tick this button's invoker attached, the button's handler is
        // silently skipped — a test-harness artifact, impossible under real clocks
        // (timestamps strictly increase). One tick separates attach from dispatch.
        vi.advanceTimersByTime(1);
        const tap = dispatchTap(play, 0);
        vi.runAllTimers();
        await wrapper.vm.$nextTick();

        // (a) the dock expanded …
        expect(root.classList.contains("expanded")).toBe(true);
        // … (b) … AND the tapped control fired — in the SAME gesture, not a 2nd tap.
        expect(tap.clicked).toBe(true);
        expect(onPlay).toHaveBeenCalledTimes(1);

        wrapper.unmount();
    });

    it("scroll-cancel: a tap that becomes a vertical scroll does NOT expand", async () => {
        const { wrapper } = mountDockWithCollapsedControl();
        const root = wrapper.get(".glass-dock").element;
        const play = wrapper.get<HTMLElement>("[data-testid='collapsed-play']")
            .element;

        dispatchScroll(play);
        vi.runAllTimers();
        await wrapper.vm.$nextTick();

        // The vertical scroll on the floating pill is preserved — no expand.
        expect(root.classList.contains("collapsed")).toBe(true);

        wrapper.unmount();
    });

    it("collapsed PILL (not a control): a tap expands without spurious activation", async () => {
        // The collapsed pill summary itself (the `@click="onClickCollapsed"`
        // disclosure surface) — a tap on it must expand, with no control fired.
        const onPlay = vi.fn();
        const Host = defineComponent({
            setup() {
                return () =>
                    h(
                        GlassDock,
                        { startCollapsed: true },
                        {
                            default: () => h("div", "full"),
                            // A NON-interactive summary — a plain label, no live control.
                            collapsed: () =>
                                h("span", { "data-testid": "pill-label" }, "open"),
                        },
                    );
            },
        });
        const wrapper = mount(Host, { attachTo: document.body });
        const root = wrapper.get(".glass-dock").element;
        // The summary layer wraps the slot and carries `@click="onClickCollapsed"`.
        const summary = wrapper.get(".dock-layer--summary").element;

        const tap = dispatchTap(summary, 0);
        vi.runAllTimers();
        await wrapper.vm.$nextTick();

        // Expanded — the pill is a disclosure target.
        expect(root.classList.contains("expanded")).toBe(true);
        // No live control under the finger → nothing spurious fired.
        expect(onPlay).not.toHaveBeenCalled();
        // The compat click is allowed to flow (B′ does not swallow it); it lands
        // on the inert summary label, which has no handler — no side effect.
        expect(tap.suppressed).toBe(false);

        wrapper.unmount();
    });

    it("keep-open: a focused descendant keeps the dock open (generalized from the Slider case)", async () => {
        const { wrapper } = mountDockWithCollapsedControl();
        const root = wrapper.get(".glass-dock").element;
        const vm = wrapper.findComponent(GlassDock).vm as unknown as Record<
            string,
            unknown
        >;

        // Open the dock, then take a hold (a focused descendant — e.g. an open
        // Slider/dropdown — pins the dock via the keepOpen ref-count).
        (vm.expand as () => void)();
        (vm.keepOpen as () => void)();
        await wrapper.vm.$nextTick();
        expect(root.classList.contains("expanded")).toBe(true);

        // The auto-collapse window elapses; the hold keeps it open.
        vi.runAllTimers();
        await wrapper.vm.$nextTick();
        expect(root.classList.contains("expanded")).toBe(true);

        // Releasing the hold lets it collapse after the grace window.
        (vm.release as () => void)();
        vi.runAllTimers();
        await wrapper.vm.$nextTick();
        expect(root.classList.contains("collapsed")).toBe(true);

        wrapper.unmount();
    });

    it("no-regression: an already-expanded dock taps its control with no double-fire", async () => {
        const { wrapper, onPlay } = mountDockWithCollapsedControl();
        const vm = wrapper.findComponent(GlassDock).vm as unknown as Record<
            string,
            unknown
        >;
        const root = wrapper.get(".glass-dock").element;

        (vm.expand as () => void)();
        await wrapper.vm.$nextTick();
        expect(root.classList.contains("expanded")).toBe(true);

        // Once expanded, the gate short-circuits (`visualExpanded` true): the tap
        // is not swallowed and the control fires exactly once.
        const home = wrapper
            .findAllComponents(DockControl)
            .find((c) => c.attributes("aria-label") === "Home");
        expect(home).toBeDefined();
        const tap = dispatchTap(home!.element, 0);
        vi.runAllTimers();
        await wrapper.vm.$nextTick();

        expect(tap.clicked).toBe(true);
        // The expanded-layer Home control has no handler; the play spy (collapsed
        // layer) must NOT fire — no cross-layer leakage.
        expect(onPlay).not.toHaveBeenCalled();

        wrapper.unmount();
    });
});
