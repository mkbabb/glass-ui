import { mount } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import GlassDock from "@glass/components/custom/dock/GlassDock.vue";

/**
 * GlassDock `isTransitioning` — the spring-settle-driven busy flag (BG.NF.1
 * W-FALLBACK-EXCISE). The CSS-transition-era `useDockMorphWindow` (a wrong-clock
 * `max(2×--duration-normal, 600ms)` settle TIMER + a DEAD `@transitionend` resolver
 * that could NEVER fire — the morph runs on the `--dock-morph-t` spring, NOT a CSS
 * width/padding transition) is EXCISED. `isTransitioning` now resolves from the morph
 * orchestrator's OWN spring settle: the orchestrator notifies `onMorphActiveChange(true)`
 * when the outer collapse/expand spring ARMS (alongside setting the single
 * `[data-morphing]` busy signal) and `(false)` when it SETTLES.
 *
 * Two contracts covered:
 *  1. NO transitionend LADDER — a stray `transitionend` on the root is INERT (the
 *     excised resolver cannot clear the flag); ONLY the spring's own settle does. This
 *     is the born-RED regression test the excision must keep GREEN.
 *  2. NO stale-clear on rapid re-trigger — a rapid A→B→A (collapse→expand→collapse
 *     faster than one morph completes) keeps the flag true across the whole chain; it
 *     resolves once the morph spring settles (the interruptible re-base + the single
 *     `[data-morphing]`/settle lifecycle).
 *
 * `isTransitioning` / `expand` / `collapse` are read off the proxied component
 * instance — @vue/test-utils auto-unwraps the `defineExpose`d ref, so
 * `wrapper.vm.isTransitioning` is the unwrapped boolean. Fake timers drive the real
 * `SpringProgress` rAF loop to settle deterministically.
 */

function dispatchTransitionEnd(root: Element, propertyName: string): void {
    // Synthesize a `transitionend` whose `target` is the root — the shape the retired
    // resolver would have consumed. Post-excision it MUST be inert (no handler exists).
    const event = new Event("transitionend", { bubbles: true });
    Object.defineProperty(event, "propertyName", { value: propertyName });
    root.dispatchEvent(event);
}

describe("GlassDock isTransitioning — spring-settle source (BG.NF.1 W-FALLBACK-EXCISE)", () => {
    beforeEach(() => vi.useFakeTimers());
    afterEach(() => vi.useRealTimers());

    it("a stray transitionend is INERT — only the spring's own settle clears the flag", async () => {
        const wrapper = mount(GlassDock, { props: { startCollapsed: true } });
        const vm = wrapper.vm as unknown as Record<string, unknown>;
        const root = wrapper.get(".glass-dock").element;

        (vm.expand as () => void)();
        await wrapper.vm.$nextTick();
        // The morph spring armed → the orchestrator notified onMorphActiveChange(true).
        expect(vm.isTransitioning).toBe(true);

        // The excised ladder is GONE: NO transitionend (decorative OR resize-morph
        // property) can resolve the flag — the dock morph runs on a spring, not a CSS
        // transition, so a stray transitionend must not skip-fast-forward the flag.
        dispatchTransitionEnd(root, "box-shadow");
        dispatchTransitionEnd(root, "background-color");
        dispatchTransitionEnd(root, "width");
        expect(vm.isTransitioning).toBe(true);

        // The spring's OWN settle (its rAF loop, flushed here) resolves it — the single
        // honest source, no legacy timer, no plausibly-settled transitionend fallback.
        vi.runAllTimers();
        expect(vm.isTransitioning).toBe(false);
    });

    it("rapid A→B→A never stale-clears: the flag stays true across the chain, false at settle", async () => {
        const wrapper = mount(GlassDock, { props: { startCollapsed: true } });
        const vm = wrapper.vm as unknown as Record<string, unknown>;
        const root = wrapper.get(".glass-dock").element;

        // A → B → A faster than one morph completes (collapse→expand→collapse). Each
        // flip RE-BASES the ONE spring (interruptible), re-arming the busy signal.
        (vm.expand as () => void)();
        await wrapper.vm.$nextTick();
        (vm.collapse as () => void)();
        await wrapper.vm.$nextTick();
        (vm.expand as () => void)();
        await wrapper.vm.$nextTick();
        expect(vm.isTransitioning).toBe(true);

        // A stale transitionend mid-chain cannot reopen/clear it (the resolver is gone).
        dispatchTransitionEnd(root, "width");
        expect(vm.isTransitioning).toBe(true);

        // The final morph spring settles → the flag resolves exactly once.
        vi.runAllTimers();
        expect(vm.isTransitioning).toBe(false);
    });

    it("a superseded morph does not leak a busy flag — expand→collapse settles to false once", async () => {
        const wrapper = mount(GlassDock, { props: { startCollapsed: true } });
        const vm = wrapper.vm as unknown as Record<string, unknown>;

        (vm.expand as () => void)();
        await wrapper.vm.$nextTick();
        (vm.collapse as () => void)(); // supersedes the expand morph (interruptible re-base)
        await wrapper.vm.$nextTick();
        expect(vm.isTransitioning).toBe(true);

        // Flushing the rAF loop: the spring lifecycle clears the flag — no superseded
        // morph leaves it stuck true, no wrong-clock timer re-opens it.
        vi.runAllTimers();
        expect(vm.isTransitioning).toBe(false);
    });
});
