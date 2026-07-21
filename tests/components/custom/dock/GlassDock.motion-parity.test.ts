import { mount } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import GlassDock from "@glass/components/dock/GlassDock.vue";

/**
 * GlassDock `isTransitioning` — the spring-settle-driven busy flag (
 *). The CSS-transition-era `useDockMorphWindow` (a wrong-clock
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

// These specs drive the morph spring to settle with the unbounded `vi.runAllTimers()`.
// The dock's `backdropMode: "live"` (default) backdrop sampler is
// a PERPETUAL `useRAFLoop` monitor — never settling — so it spins `runAllTimers` past the
// 10000-timer abort before the spring can settle. Luminance is ORTHOGONAL to the
// isTransitioning spring-settle contract under test, so it is mounted with
// `backdropMode: "static"` here (which wires no observer; the product default stays
// "live" — this scopes the unit test to the mechanism it verifies, the same test-env
// accommodation as the happy-dom `elementsFromPoint` stub, NOT a product change).
describe("GlassDock isTransitioning — spring-settle source", () => {
    beforeEach(() => vi.useFakeTimers());
    afterEach(() => vi.useRealTimers());

    it("a stray transitionend is INERT — only the spring's own settle clears the flag", async () => {
        const wrapper = mount(GlassDock, {
            props: { startCollapsed: true, backdropMode: "static" },
        });
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
        const wrapper = mount(GlassDock, {
            props: { startCollapsed: true, backdropMode: "static" },
        });
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

    it("an exact-origin reversal does not fabricate a busy window", async () => {
        const wrapper = mount(GlassDock, {
            props: { startCollapsed: true, backdropMode: "static" },
        });
        const vm = wrapper.vm as unknown as Record<string, unknown>;

        (vm.expand as () => void)();
        await wrapper.vm.$nextTick();
        (vm.collapse as () => void)();
        await wrapper.vm.$nextTick();
        expect(vm.isTransitioning).toBe(false);

        // No spring frame painted between the two commands, so the reversal is already
        // back at its origin. A synthetic busy interval would describe motion that never
        // existed; later frames must not resurrect one.
        vi.runAllTimers();
        expect(vm.isTransitioning).toBe(false);
    });

    it("reverses from the live plate position without reseating its expandedness", async () => {
        const wrapper = mount(GlassDock, {
            props: { startCollapsed: true, backdropMode: "static" },
        });
        const vm = wrapper.vm as unknown as Record<string, unknown>;
        const root = wrapper.get<HTMLElement>(".glass-dock");

        (vm.expand as () => void)();
        await wrapper.vm.$nextTick();
        await vi.advanceTimersByTimeAsync(64);
        const beforeReverse = Number.parseFloat(
            root.element.style.getPropertyValue("--dock-morph-t"),
        );
        expect(beforeReverse).toBeGreaterThan(0);
        expect(beforeReverse).toBeLessThan(1);

        (vm.collapse as () => void)();
        await wrapper.vm.$nextTick();
        const afterReverse = Number.parseFloat(
            root.element.style.getPropertyValue("--dock-morph-t"),
        );
        expect(afterReverse).toBeCloseTo(1 - beforeReverse, 8);
        expect(1 - afterReverse).toBeCloseTo(beforeReverse, 8);

        vi.runAllTimers();
        expect(root.classes()).toContain("collapsed");
        expect(vm.isTransitioning).toBe(false);
        wrapper.unmount();
    });

    it("settles an active morph immediately when reduced motion becomes preferred", async () => {
        const originalMatchMedia = window.matchMedia;
        let reduced = false;
        const listeners = new Set<(event: MediaQueryListEvent) => void>();
        const media = {
            get matches() {
                return reduced;
            },
            media: "(prefers-reduced-motion: reduce)",
            onchange: null,
            addEventListener: (
                _type: string,
                listener: (event: MediaQueryListEvent) => void,
            ) => listeners.add(listener),
            removeEventListener: (
                _type: string,
                listener: (event: MediaQueryListEvent) => void,
            ) => listeners.delete(listener),
            addListener: (listener: (event: MediaQueryListEvent) => void) =>
                listeners.add(listener),
            removeListener: (listener: (event: MediaQueryListEvent) => void) =>
                listeners.delete(listener),
            dispatchEvent: () => true,
        } as MediaQueryList;
        Object.defineProperty(window, "matchMedia", {
            configurable: true,
            value: () => media,
        });

        try {
            const wrapper = mount(GlassDock, {
                props: { startCollapsed: true, backdropMode: "static" },
            });
            const vm = wrapper.vm as unknown as Record<string, unknown>;
            const root = wrapper.get(".glass-dock").element;

            (vm.expand as () => void)();
            await wrapper.vm.$nextTick();
            expect(vm.isTransitioning).toBe(true);
            expect(root.hasAttribute("data-morphing")).toBe(true);

            reduced = true;
            const event = { matches: true, media: media.media } as MediaQueryListEvent;
            for (const listener of listeners) listener(event);
            await wrapper.vm.$nextTick();

            expect(vm.isTransitioning).toBe(false);
            expect(root.hasAttribute("data-morphing")).toBe(false);
            expect((root as HTMLElement).style.getPropertyValue("--dock-morph-t")).toBe(
                "",
            );
            wrapper.unmount();
        } finally {
            Object.defineProperty(window, "matchMedia", {
                configurable: true,
                value: originalMatchMedia,
            });
        }
    });
});
