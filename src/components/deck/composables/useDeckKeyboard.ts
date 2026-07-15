import { onBeforeUnmount, onMounted, toValue, type MaybeRefOrGetter } from "vue";
import { CONTROL_SELECTOR } from "../constants";

/* useDeckKeyboard — the deck's keyboard contract as a plain `keydown` listener
   composable (NOT the vueuse-bearing /keyboard registry — keeping /deck vueuse-free
   per the SCC-trap discipline).

   Arrows / PageUp / PageDown / Home / End are GLOBAL. Space + digit jumps are
   FOCUS-GUARDED: when a control (button / link / field) is focused they reach that
   control's native activation instead of being stolen for navigation — the C6
   correctness fix. The handler is the pure `handleDeckKey` below (DOM-light, so it
   unit-tests in happy-dom and lifts cleanly). */

/** The minimal move surface the handler drives (a structural subset of DeckCore,
    so the consumer can pass its `DeckCore` directly). */
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
    /** Override the focused-control test (defaults to `target.closest(controls)`). */
    isControl?: (target: EventTarget | null) => boolean;
}

/** Handle ONE keydown against the deck. Returns true if it navigated (and called
    `preventDefault`), false if the key was left for the page/control. */
export function handleDeckKey(
    e: KeyboardEvent,
    deck: DeckMoves,
    opts: DeckKeyOptions = {},
): boolean {
    const isControl = opts.isControl ?? defaultIsControl;
    const onControl = isControl(e.target);

    switch (e.key) {
        case "ArrowRight":
        case "PageDown":
            deck.next();
            e.preventDefault();
            return true;
        case "ArrowLeft":
        case "PageUp":
            deck.prev();
            e.preventDefault();
            return true;
        case "Home":
            deck.first();
            e.preventDefault();
            return true;
        case "End":
            deck.last();
            e.preventDefault();
            return true;
        case " ":
            if (onControl) return false;
            deck.next();
            e.preventDefault();
            return true;
        default:
            if (e.key >= "1" && e.key <= "9" && !onControl) {
                deck.go(parseInt(e.key, 10) - 1);
                e.preventDefault();
                return true;
            }
            return false;
    }
}

export interface UseDeckKeyboardOptions extends DeckKeyOptions {
    /** The element the listener binds to. Default `window` (deck-global paging). */
    target?: MaybeRefOrGetter<EventTarget | null | undefined>;
}

/** Bind the focus-guarded deck keyboard contract to a target (default `window`)
    for the component lifetime. The `target` may be a ref/getter so a not-yet-mounted
    element resolves at `onMounted`. */
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
