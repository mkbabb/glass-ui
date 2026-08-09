import {
    onBeforeUnmount,
    onMounted,
    toValue,
    type MaybeRefOrGetter,
} from "vue";
import { CONTROL_SELECTOR } from "../constants";
import type { DeckAxis } from "../types";

/* useDeckKeyboard — the substrate's ONE paging contract, in two bindings.
   Before the fold there were three implementations of this one contract: a global
   deck listener, a carousel root handler that was unreachable on every mount it
   shipped in, and the dot rail's roving-tabindex handler. There is one now.

   THE AXIS BEARS. Arrow keys derive from the travel axis (Right/Left horizontal,
   Down/Up vertical); PageDown/PageUp, Home/End, Space and the digit jumps are
   axis-free.

   THE GUARD COVERS EVERY KEY, which is the whole correction. The predecessor
   consulted its focused-control test for Space and the digits ONLY and let the
   arrows, Page keys, Home and End fall straight through — so a caret in a focused
   text field could not move, in both shipping engines, while the deck paged behind
   it. A navigation key taken from a focused control is theft whichever key it is.

   TWO BINDINGS, ONE HANDLER.
     · `useDeckKeyboard` binds GLOBALLY (default `window`) — the presentation
       register, where the deck IS the page.
     · A rail binds `handleDeckKey` on its own root with `isControl: () => false`
       — an element-scoped listener over a rail of buttons has nothing to steal,
       and its wrap/skip policy rides `resolve`.
   No consumer authors a second key table. */

/** The minimal move surface the handler drives (a structural subset of DeckCore). */
export interface DeckMoves {
    next(): void;
    prev(): void;
    first(): void;
    last(): void;
    go(i: number): void;
}

function defaultIsControl(target: EventTarget | null): boolean {
    const el = target as (Element & { closest?: Element["closest"] }) | null;
    return !!el?.closest?.(CONTROL_SELECTOR);
}

export interface DeckKeyOptions {
    /** The travel axis the arrows derive from. Default horizontal. */
    axis?: MaybeRefOrGetter<DeckAxis>;
    /** Override the focused-control test (defaults to `target.closest(controls)`). */
    isControl?: (target: EventTarget | null) => boolean;
    /** Digit jumps `1`–`9`. Default true. */
    digits?: boolean;
}

/**
 * Handle ONE keydown against a sequence. Returns true if it navigated (and called
 * `preventDefault`), false if the key was left for the page or the focused control.
 */
export function handleDeckKey(
    e: KeyboardEvent,
    deck: DeckMoves,
    opts: DeckKeyOptions = {},
): boolean {
    const isControl = opts.isControl ?? defaultIsControl;
    // EVERY key is guarded, not just the ambiguous ones.
    if (isControl(e.target)) return false;

    const vertical = (toValue(opts.axis) ?? "horizontal") === "vertical";
    const nextKey = vertical ? "ArrowDown" : "ArrowRight";
    const prevKey = vertical ? "ArrowUp" : "ArrowLeft";

    switch (e.key) {
        case nextKey:
        case "PageDown":
        case " ":
            deck.next();
            break;
        case prevKey:
        case "PageUp":
            deck.prev();
            break;
        case "Home":
            deck.first();
            break;
        case "End":
            deck.last();
            break;
        default: {
            const digit = opts.digits !== false && e.key >= "1" && e.key <= "9";
            if (!digit) return false;
            deck.go(parseInt(e.key, 10) - 1);
            break;
        }
    }
    e.preventDefault();
    return true;
}

export interface UseDeckKeyboardOptions extends DeckKeyOptions {
    /** The element the listener binds to. Default `window` (the presentation register). */
    target?: MaybeRefOrGetter<EventTarget | null | undefined>;
}

/**
 * Bind the guarded paging contract to a target (default `window`) for the
 * component lifetime. The `target` may be a ref/getter so a not-yet-mounted
 * element resolves at `onMounted`.
 */
export function useDeckKeyboard(
    deck: DeckMoves,
    opts: UseDeckKeyboardOptions = {},
): void {
    let bound: EventTarget | null = null;
    const onKeydown = (e: Event) =>
        handleDeckKey(e as KeyboardEvent, deck, opts);

    onMounted(() => {
        bound =
            (toValue(opts.target) as EventTarget | null | undefined) ??
            (typeof window !== "undefined" ? window : null);
        bound?.addEventListener("keydown", onKeydown);
    });
    onBeforeUnmount(() => {
        bound?.removeEventListener("keydown", onKeydown);
        bound = null;
    });
}
