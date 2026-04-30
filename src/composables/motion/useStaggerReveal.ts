// IntersectionObserver-gated sequenced reveal — returns per-target revealed state for stagger entrance.
import { onBeforeUnmount, reactive, ref } from "vue";

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
 * Sequence entrance animations for a list/grid. Each registered target
 * gets a staggered `revealed` flag once it crosses the viewport threshold.
 * Consumers bind the flag to a Tailwind class (e.g. `opacity-100 translate-y-0`)
 * and let CSS transitions handle the visual entry.
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
        typeof IntersectionObserver === "undefined"
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
            revealed[resolvedIndex] = false;
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
