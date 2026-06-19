// IntersectionObserver-gated sequenced reveal — returns per-target revealed state for stagger entrance.
import { onBeforeUnmount, reactive, ref } from "vue";
import { supportsViewTimeline } from "./supportsCssTimeline";

interface StaggerRevealConfig {
    /** Delay between each target becoming `revealed`. Default 60ms. */
    staggerMs?: number;
    /** When true (default), a target stays revealed after first entering the viewport. */
    once?: boolean;
    /** IntersectionObserver rootMargin. Default `0px`. */
    rootMargin?: string;
    /** IntersectionObserver threshold. Default 0.15. */
    threshold?: number;
}

/**
 * True when the engine supports the native `view()` entry timeline. AQ.W5
 * §Design 1b — when this holds, the `[data-scroll-reveal] > *` CSS recipe
 * (scroll-driven.css) owns the entrance on the compositor (the stagger is
 * implicit in each child's own view-timeline — no `setTimeout` cascade). The
 * composable then becomes the inert path: NO `IntersectionObserver`, NO timers;
 * `register()` immediately sets `revealed[idx] = true` so the consumer's bound
 * class lands its terminal state and the CSS owns the visual entry. This is the
 * dual-path-with-a-single-writer rule (no double-run).
 */
const NATIVE_VIEW_TIMELINE = supportsViewTimeline();

/**
 * Sequence entrance animations for a list/grid. Each registered target
 * gets a staggered `revealed` flag once it crosses the viewport threshold.
 * Consumers bind the flag to a Tailwind class (e.g. `opacity-100 translate-y-0`)
 * and let CSS transitions handle the visual entry.
 *
 * AQ.W5: on an engine with native `view()` timelines, no `IntersectionObserver`
 * is constructed — prefer the `[data-scroll-reveal]` CSS recipe
 * (scroll-driven.css). This composable is the feature-detected fallback (the
 * sole writer when the native feature is absent); under native, `register()`
 * reveals immediately so the terminal state is correct and the CSS animates.
 */
export function useStaggerReveal(
    options: StaggerRevealConfig = {},
) {
    const {
        staggerMs = 60,
        once = true,
        rootMargin = "0px",
        threshold = 0.15,
    } = options;

    const targets = ref<HTMLElement[]>([]);
    const revealed = reactive<Record<number, boolean>>({});
    const indexMap = new WeakMap<HTMLElement, number>();
    const timers = new Set<ReturnType<typeof setTimeout>>();

    const observer =
        NATIVE_VIEW_TIMELINE || typeof IntersectionObserver === "undefined"
            ? null
            : new IntersectionObserver(
                  (entries) => {
                      for (const entry of entries) {
                          const el = entry.target as HTMLElement;
                          const idx = indexMap.get(el);
                          if (idx === undefined) continue;
                          if (entry.isIntersecting) {
                              const timer = setTimeout(() => {
                                  revealed[idx] = true;
                                  timers.delete(timer);
                              }, staggerMs * idx);
                              timers.add(timer);
                              if (once) observer?.unobserve(el);
                          } else if (!once) {
                              revealed[idx] = false;
                          }
                      }
                  },
                  { rootMargin, threshold },
              );

    function register(el: HTMLElement | null, index?: number): void {
        if (!el) return;
        const resolvedIndex = index ?? targets.value.length;
        if (!indexMap.has(el)) {
            indexMap.set(el, resolvedIndex);
            targets.value.push(el);
            // Native path — the CSS view-timeline owns the entrance; land the
            // terminal state immediately so the consumer's bound class is
            // correct and the CSS animates it (no observer, no timers).
            // Fallback path — start hidden; the observer reveals on entry.
            revealed[resolvedIndex] = NATIVE_VIEW_TIMELINE;
            observer?.observe(el);
        }
    }

    onBeforeUnmount(() => {
        observer?.disconnect();
        for (const t of timers) clearTimeout(t);
        timers.clear();
    });

    return { targets, register, revealed };
}

/**
 * The `[data-scroll-reveal-once]` latch — BC.W-MOTION-PRESETS.
 *
 * The `scroll-driven.css` `[data-scroll-reveal]` recipe rides a native `view()`
 * timeline that RE-FIRES its entrance every time a child re-enters the entry range
 * — wrong for a virtualized/teleporting list (a row scrolls out + back and re-plays
 * the fade-lift). A `view()` timeline cannot latch "play once" (the CSS limit), so
 * the `[data-scroll-reveal-once]` opt-in plays the entrance ONCE: this directive
 * adds `data-revealed=""` to each child on its FIRST cross and `unobserve`s it (the
 * SAME `once: true` discipline `useStaggerReveal` runs above — `if (once)
 * observer?.unobserve(el)`); the CSS plays the one-shot `gl-reveal-once` keyframe
 * keyed off `[data-revealed]`, NOT the live `view()` range. NO second observer
 * engine — the same `IntersectionObserver` the composable speaks for the `once`
 * case, packaged as a Vue directive a consumer binds on the scroller.
 *
 * On an engine without `IntersectionObserver` (SSR/old) it reveals immediately so
 * the terminal state is correct (the CSS animation simply never plays). Under PRM
 * the scroll-driven.css `@media` outer gate drops the entrance and the row paints
 * in-place (a flourish — the reveal carve, not a legibility cue).
 */
export const vScrollRevealOnce = {
    mounted(scroller: HTMLElement) {
        const children = Array.from(scroller.children) as HTMLElement[];
        if (typeof IntersectionObserver === "undefined") {
            for (const el of children) el.setAttribute("data-revealed", "");
            return;
        }
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (!entry.isIntersecting) continue;
                    const el = entry.target as HTMLElement;
                    if (el.hasAttribute("data-revealed")) continue; // already played — idempotent.
                    el.setAttribute("data-revealed", "");
                    observer.unobserve(el); // the `once` leg — never re-fire.
                }
            },
            { threshold: 0.15 },
        );
        for (const el of children) observer.observe(el);
        scrollRevealOnceObservers.set(scroller, observer);
    },
    unmounted(scroller: HTMLElement) {
        scrollRevealOnceObservers.get(scroller)?.disconnect();
        scrollRevealOnceObservers.delete(scroller);
    },
};

/** Per-scroller observer handles so `unmounted` can disconnect the right one. */
const scrollRevealOnceObservers = new WeakMap<HTMLElement, IntersectionObserver>();
