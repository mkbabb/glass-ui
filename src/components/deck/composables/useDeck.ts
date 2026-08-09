import {
    computed,
    ref,
    toValue,
    watch,
    type ComputedRef,
    type MaybeRefOrGetter,
    type Ref,
} from "vue";
import type { DeckAxis, DeckState } from "../types";

/* useDeck — the CORE of the windowed-sequence substrate: one integer authority
   with an OPTIONAL continuous channel beside it, and zero DOM.

   ONE WRITER. `index` is the authority and `go()` is its only writer, so the
   two-authority reconciliation class — a delta guard, an echo watcher, a mirror
   ref per chrome element — cannot be written against this core. Everything else
   here is derived.
     · `progress`  — 1-based completion, for a rail.
     · `canNext` / `canPrev` — the clamp, published instead of re-derived by every
       consumer that owns a chevron.
     · `stateFor(i)` — the ONE `[data-state]` vocabulary (`active | prev | next`),
       direction DERIVED from the index comparison, never stored.
     · `liveMessage` — the portable "Slide N of M[: name]" announcement; the
       rendering pair hosts it in a polite region so a consumer never re-authors
       the recipe.

   THE CONTINUOUS CHANNEL IS OPTIONAL AND PRODUCER-FED. `position` (in members,
   fractional) and `velocity` (members per second) exist for the member-projection
   arm — the per-member scale/fade/lag that needs a continuous timeline. A DISCRETE
   producer (a detent driver whose seam deliberately admits no continuous scalar) is
   legal and simply never calls `feed()`: `position` then mirrors `index` and the
   projection arm does not run. The library OFFERS the channel; a consumer chooses
   whether to open it. */

export interface DeckCore {
    /** The 0-based active member index (clamped). The ONE authority. */
    index: Ref<number>;
    /** The live member count. */
    total: ComputedRef<number>;
    /** The travel axis. */
    axis: ComputedRef<DeckAxis>;
    /** 1-based completion as a percentage (member 1 of N → 100/N), for a bar. */
    progress: ComputedRef<number>;
    /** Whether a forward step exists (the clamp, published once). */
    canNext: ComputedRef<boolean>;
    /** Whether a backward step exists. */
    canPrev: ComputedRef<boolean>;
    /**
     * The OPTIONAL continuous position, in members (2.4 = 40% past member 2).
     * Mirrors `index` until a producer feeds it.
     */
    position: Readonly<Ref<number>>;
    /** The OPTIONAL continuous velocity, in members per second. 0 unless fed. */
    velocity: Readonly<Ref<number>>;
    /** Whether a continuous producer has opened the channel. */
    continuous: Readonly<Ref<boolean>>;
    /** The accessible "Slide N of M[: name]" announcement off the live index. */
    liveMessage: ComputedRef<string>;
    /** The ONE `[data-state]` vocabulary for member `i`. */
    stateFor: (i: number) => DeckState;
    go: (i: number) => void;
    next: () => void;
    prev: () => void;
    first: () => void;
    last: () => void;
    /**
     * The producer's channel writer — a scroll-snap strip, a drag scrub, a
     * transform stage. Feeding it opens the continuous channel for this core's
     * lifetime; the integer authority is untouched (a producer commits an index
     * through `go`, never through here).
     */
    feed: (position: number, velocity?: number) => void;
}

export interface UseDeckOptions {
    /** The initial 0-based index (clamped). Default 0. */
    initial?: number;
    /** The travel axis. Default horizontal. */
    axis?: MaybeRefOrGetter<DeckAxis>;
    /** Fired AFTER a navigation commits, with the new + previous index. */
    onChange?: (to: number, from: number) => void;
    /** Resolve a per-member accessible name for the live announcement. */
    label?: (index: number) => string;
}

export function useDeck(
    total: MaybeRefOrGetter<number>,
    opts: UseDeckOptions = {},
): DeckCore {
    const count = computed(() => {
        const n = toValue(total);
        return Number.isFinite(n) ? Math.max(0, Math.trunc(n)) : 0;
    });
    const clamp = (n: number) => Math.max(0, Math.min(count.value - 1, n));

    const index = ref(clamp(opts.initial ?? 0));
    const position = ref(index.value);
    const velocity = ref(0);
    const continuous = ref(false);

    const axis = computed<DeckAxis>(() => toValue(opts.axis) ?? "horizontal");
    const progress = computed(() =>
        count.value === 0 ? 0 : ((index.value + 1) / count.value) * 100,
    );
    const canPrev = computed(() => index.value > 0);
    const canNext = computed(() => index.value < count.value - 1);

    const liveMessage = computed(() => {
        const base = `Slide ${index.value + 1} of ${count.value}`;
        const name = opts.label?.(index.value);
        return name ? `${base}: ${name}` : base;
    });

    function stateFor(i: number): DeckState {
        if (i === index.value) return "active";
        return i < index.value ? "prev" : "next";
    }

    function go(i: number): void {
        const to = clamp(i);
        if (to === index.value) return;
        const from = index.value;
        index.value = to;
        if (!continuous.value) position.value = to;
        opts.onChange?.(to, from);
    }

    function feed(next: number, v = 0): void {
        if (!Number.isFinite(next)) return;
        continuous.value = true;
        position.value = next;
        velocity.value = Number.isFinite(v) ? v : 0;
    }

    // A shrinking sequence re-clamps rather than stranding the authority past its
    // own end (a carousel losing members is the ordinary case, not an edge one).
    watch(count, () => {
        const to = clamp(index.value);
        if (to !== index.value) go(to);
    });

    return {
        index,
        total: count,
        axis,
        progress,
        canNext,
        canPrev,
        position,
        velocity,
        continuous,
        liveMessage,
        stateFor,
        go,
        next: () => go(index.value + 1),
        prev: () => go(index.value - 1),
        first: () => go(0),
        last: () => go(count.value - 1),
        feed,
    };
}
