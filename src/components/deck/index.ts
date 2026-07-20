// `@mkbabb/glass-ui/deck` — the full-viewport keyboard-paged aria-live PRESENTATION
// register. DISTINCT from `/carousel`'s embla item-scroller. The headless
// core is vueuse- and keyframes-free. OFF the root barrel: reached only via
// `@mkbabb/glass-ui/deck`.

export { useDeck } from "./composables/useDeck";
export type { DeckCore, UseDeckOptions } from "./composables/useDeck";

export { useDeckKeyboard, handleDeckKey } from "./composables/useDeckKeyboard";
export type {
    DeckMoves,
    DeckKeyOptions,
    UseDeckKeyboardOptions,
} from "./composables/useDeckKeyboard";

// `/deck` is PURELY HEADLESS: the windowed dot register is `<PagerDots pattern="group"
// :ring="false">` (from `@mkbabb/glass-ui/pager-dots`) composed DIRECTLY — the deck owns
// no dot wrapper. The former `DeckPager` alias was a 47-line zero-logic pass-through and
// is retired (clean break); the deck is consumer #2 of the ONE pagerWindow oracle direct.
export { CONTROL_SELECTOR } from "./constants";
