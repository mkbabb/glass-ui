import type { HTMLAttributes } from "vue";
import type { DeckAxis, DeckCore } from "../deck";

/* The carousel's own vocabulary. It is small now, because the carousel is a
   component register over the windowed-sequence substrate rather than a second
   engine: no tween options object, no plugin array, no engine handle leaking onto
   the public surface. `interface.ts` was the one file in nineteen that did not
   call itself `types.ts`; it does now. */

/** How members project as the strip travels. */
export type CarouselProjection =
    | "none"
    /** Every member scales/fades off its distance from the viewport centre. */
    | "travel"
    /** ONLY the active member projects — the neighbours do not move. */
    | "window";

export interface CarouselProps {
    /** Accessible name that opts the carousel into a named region landmark. */
    ariaLabel?: string;
    /** The travel axis. Default horizontal. */
    orientation?: DeckAxis;
    /** The member projection. Default `"none"`. */
    projection?: CarouselProjection;
    /**
     * The ARIA register. `"group"` (default) is the honest one for a strip of
     * content: `role="group"` + `aria-current`. `"tabs"` is only correct when the
     * consumer owns real panels and passes `panelIds`.
     */
    pattern?: "group" | "tabs";
    /** Index-aligned panel element ids — the tablist↔tabpanel linkage. */
    panelIds?: string[];
}

export interface CarouselEmits {
    /** The active member changed (the index, and the one it came from). */
    (e: "change", to: number, from: number): void;
}

/** What `useCarousel()` hands a descendant. The core IS the API. */
export interface CarouselContext {
    /** The sequence core — index authority, clamp, states, announcement. */
    deck: DeckCore;
    /** The scroll container the travel arm drives. */
    viewport: { value: HTMLElement | null };
    /** Report the live member count (the content half owns the DOM). */
    setCount: (n: number) => void;
    /** The resolved props the register reads. */
    orientation: DeckAxis;
    projection: CarouselProjection;
    pattern: "group" | "tabs";
    panelIds?: string[];
}

export interface WithClassAsProps {
    class?: HTMLAttributes["class"];
}
