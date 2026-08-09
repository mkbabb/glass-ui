import { onBeforeUnmount, onMounted, toValue, type Ref } from "vue";
import type { DeckMoves } from "./useDeckKeyboard";
import type { DeckAxis } from "../types";

/* useDeckSwipe — the pointer-drag paging gesture for a stage that does NOT scroll.
   A transform-driven stage has no scroller to swipe, so the platform gives it
   nothing; the scroll-snap register gets its gesture free and never mounts this.

   TWO RULES, both of them the difference between a gesture and an annoyance:
     · A THRESHOLD of 44 px, so a tap that drifts is a tap.
     · AXIS DOMINANCE — the travel on the paging axis must exceed the travel across
       it, so a page scrolled with a finger does not turn a slide sideways on the
       way past.
   The gesture commits ONCE per press and only on release: a drag is a decision,
   not a stream of them. */

export interface UseDeckSwipeOptions {
    /** The travel axis. Default horizontal. */
    axis?: () => DeckAxis;
    /** The commit distance in px. Default 44 (the coarse-target rung). */
    threshold?: number;
    /** Enabled. Default true. */
    enabled?: () => boolean;
}

export const DECK_SWIPE_THRESHOLD_PX = 44;

export function useDeckSwipe(
    host: Ref<HTMLElement | null>,
    deck: DeckMoves,
    options: UseDeckSwipeOptions = {},
): void {
    const threshold = options.threshold ?? DECK_SWIPE_THRESHOLD_PX;
    let startX = 0;
    let startY = 0;
    let pointer = -1;

    function down(e: PointerEvent): void {
        if (e.pointerType === "mouse" && e.button !== 0) return;
        if (options.enabled && !options.enabled()) return;
        pointer = e.pointerId;
        startX = e.clientX;
        startY = e.clientY;
    }

    function up(e: PointerEvent): void {
        if (e.pointerId !== pointer) return;
        pointer = -1;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        const vertical = (toValue(options.axis?.()) ?? "horizontal") === "vertical";
        const along = vertical ? dy : dx;
        const across = vertical ? dx : dy;
        if (Math.abs(along) < threshold) return;
        if (Math.abs(along) <= Math.abs(across)) return; // axis dominance
        if (along < 0) deck.next();
        else deck.prev();
    }

    function cancel(e: PointerEvent): void {
        if (e.pointerId === pointer) pointer = -1;
    }

    onMounted(() => {
        const el = host.value;
        if (!el) return;
        el.addEventListener("pointerdown", down);
        el.addEventListener("pointerup", up);
        el.addEventListener("pointercancel", cancel);
    });
    onBeforeUnmount(() => {
        const el = host.value;
        if (!el) return;
        el.removeEventListener("pointerdown", down);
        el.removeEventListener("pointerup", up);
        el.removeEventListener("pointercancel", cancel);
    });
}
