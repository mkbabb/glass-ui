import { computed, ref, type ComputedRef, type Ref } from "vue";

/* useDeck — the headless deck-state core: a pure reactive index + progress with
   ZERO DOM. A presentation consumer composes this and layers its own DOM glue —
   slide-toggling, scale, hash-sync, count-ups — on top. The full-viewport
   keyboard-paged aria-live PRESENTATION register, DISTINCT from `/carousel`'s embla
   item-scroller.

   `liveMessage` is the portable WCAG step announcer seam: a "Slide N of M"
   (optionally "… : <accessible-name>") computed every deck consumer surfaces in a
   `sr-only` `aria-live="polite"` region so the page change is announced without
   re-authoring the recipe per app. */

export interface DeckCore {
    /** The 0-based active slide index (clamped to [0, total-1]). */
    index: Ref<number>;
    /** The total slide count. */
    total: number;
    /** 1-based completion as a percentage (slide 1 of N → 100/N), for a bar. */
    progress: ComputedRef<number>;
    /** The accessible "Slide N of M" announcement off the live index (§3 — the
        portable aria-live seam; surface it in an `sr-only` polite region). */
    liveMessage: ComputedRef<string>;
    go: (i: number) => void;
    next: () => void;
    prev: () => void;
    first: () => void;
    last: () => void;
}

export interface UseDeckOptions {
    /** The initial 0-based index (clamped). Default 0. */
    initial?: number;
    /** Fired AFTER a navigation commits, with the new + previous index. */
    onChange?: (to: number, from: number) => void;
    /** Resolve a per-slide accessible name for the live announcement (e.g. the
        manifest title). When set, `liveMessage` reads "Slide N of M: <name>". */
    label?: (index: number) => string;
}

export function useDeck(total: number, opts: UseDeckOptions = {}): DeckCore {
    const clamp = (n: number) => Math.max(0, Math.min(total - 1, n));
    const index = ref(clamp(opts.initial ?? 0));
    const progress = computed(() => ((index.value + 1) / total) * 100);

    const liveMessage = computed(() => {
        const base = `Slide ${index.value + 1} of ${total}`;
        const name = opts.label?.(index.value);
        return name ? `${base}: ${name}` : base;
    });

    function go(i: number): void {
        const to = clamp(i);
        if (to === index.value) return;
        const from = index.value;
        index.value = to;
        opts.onChange?.(to, from);
    }

    return {
        index,
        total,
        progress,
        liveMessage,
        go,
        next: () => go(index.value + 1),
        prev: () => go(index.value - 1),
        first: () => go(0),
        last: () => go(total - 1),
    };
}
