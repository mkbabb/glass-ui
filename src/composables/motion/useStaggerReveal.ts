// IntersectionObserver-gated sequenced reveal — returns per-target revealed state for stagger entrance.
import { onScopeDispose, reactive, ref } from "vue";
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
export function useStaggerReveal(options: StaggerRevealConfig = {}) {
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

    onScopeDispose(() => {
        observer?.disconnect();
        for (const t of timers) clearTimeout(t);
        timers.clear();
    });

    return { targets, register, revealed };
}
