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

export { default as DeckPager } from "./DeckPager.vue";

export { CONTROL_SELECTOR } from "./constants";
