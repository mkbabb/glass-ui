import { mount } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import GlassDock from "../../../../src/components/custom/dock/GlassDock.vue";

/**
 * GlassDock `isTransitioning` concurrency contract (the morph-generation settle
 * guard). The VT/FLIP timing-parity gates (`proof:dock-motion-parity` +
 * `proof:dock-motion-single-source`) were RETIRED at AX.W01 with the
 * View-Transitions COLLAPSE fork they policed; the single-scalar `--dock-morph-t`
 * morph is ONE clock on every engine, so there is no VT≡FLIP curve to keep in
 * parity. The `morphGeneration` settle guard SURVIVES that rebuild — it owns the
 * `isTransitioning` flag's lifetime against the settle-timer fallback — so this
 * runtime test stays as its standalone coverage.
 *
 * `isTransitioning` must track the ACTUAL morph. Two failure modes ruled out here:
 *
 *  1. SKIP-FAST-FORWARD — a SHORTER decorative property finishing first must NOT
 *     drop the flag while the resize morph is still in flight.
 *
 *  2. QUEUE / STALE-CLEAR on rapid re-trigger — a rapid A→B→A
 *     (collapse→expand→collapse faster than one morph completes) must keep the
 *     flag true across the whole chain; a leftover `transitionend` from the
 *     SUPERSEDED morph must not reopen/clear the live one (the morph-generation
 *     guard).
 *
 * `isTransitioning` / `expand` / `collapse` are read off the proxied component
 * instance — @vue/test-utils auto-unwraps the `defineExpose`d ref, so
 * `wrapper.vm.isTransitioning` is the unwrapped boolean.
 */

function dispatchTransitionEnd(root: Element, propertyName: string): void {
    // jsdom/happy-dom don't fire real transitionend; synthesize one whose
    // `target` is the root so the dock's `event.target !== dockEl` guard passes.
    const event = new Event("transitionend", { bubbles: true });
    Object.defineProperty(event, "propertyName", { value: propertyName });
    root.dispatchEvent(event);
}

describe("GlassDock isTransitioning concurrency (AT.W6-dock-c)", () => {
    beforeEach(() => vi.useFakeTimers());
    afterEach(() => vi.useRealTimers());

    it("does NOT skip-fast-forward: a standard-motion property ending mid-morph keeps the flag set", async () => {
        const wrapper = mount(GlassDock, { props: { startCollapsed: true } });
        const vm = wrapper.vm as unknown as Record<string, unknown>;
        const root = wrapper.get(".glass-dock").element;

        (vm.expand as () => void)();
        await wrapper.vm.$nextTick();
        expect(vm.isTransitioning).toBe(true);

        // A shorter standard-motion property completes first — must be ignored.
        dispatchTransitionEnd(root, "box-shadow");
        dispatchTransitionEnd(root, "background-color");
        expect(vm.isTransitioning).toBe(true);

        // The resize morph's own property completing DOES resolve the flag.
        dispatchTransitionEnd(root, "width");
        expect(vm.isTransitioning).toBe(false);
    });

    it("rapid A→B→A never queues or stale-clears: the flag stays true until the LAST morph resolves", async () => {
        const wrapper = mount(GlassDock, { props: { startCollapsed: true } });
        const vm = wrapper.vm as unknown as Record<string, unknown>;
        const root = wrapper.get(".glass-dock").element;

        // A → B → A faster than one morph completes (collapse→expand→collapse).
        (vm.expand as () => void)();
        await wrapper.vm.$nextTick();
        (vm.collapse as () => void)();
        await wrapper.vm.$nextTick();
        (vm.expand as () => void)();
        await wrapper.vm.$nextTick();
        expect(vm.isTransitioning).toBe(true);

        // The live morph's own resize property resolves it cleanly.
        dispatchTransitionEnd(root, "width");
        expect(vm.isTransitioning).toBe(false);

        // A LATE, stale resize transitionend after the flag already settled must
        // not reopen it (the generation already advanced past it).
        dispatchTransitionEnd(root, "width");
        expect(vm.isTransitioning).toBe(false);
    });

    it("the timer fallback only fires for the LIVE generation (a superseded morph's timer is inert)", async () => {
        const wrapper = mount(GlassDock, { props: { startCollapsed: true } });
        const vm = wrapper.vm as unknown as Record<string, unknown>;

        (vm.expand as () => void)();
        await wrapper.vm.$nextTick();
        (vm.collapse as () => void)(); // supersedes the expand morph — its timer is now stale
        await wrapper.vm.$nextTick();
        expect(vm.isTransitioning).toBe(true);

        // Flushing all timers: the superseded morph's timer no-ops (generation
        // moved on); the live morph's timer clears the flag exactly once.
        vi.runAllTimers();
        expect(vm.isTransitioning).toBe(false);
    });
});
