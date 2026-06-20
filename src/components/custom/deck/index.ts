// `@mkbabb/glass-ui/deck` — the full-viewport keyboard-paged aria-live PRESENTATION
// register (BC.W-DECK). DISTINCT from `/carousel`'s embla item-scroller. The headless
// core is vueuse-FREE + keyframes-FREE on the static graph (keyframes is the lazy
// dynamic import inside `installDeckSpring` only) — so `/deck` rides the
// root-barrel-clean register (the SCC-trap discipline). OFF the root barrel: reached
// only via `@mkbabb/glass-ui/deck`.

export { useDeck } from "./composables/useDeck";
export type { DeckCore, UseDeckOptions } from "./composables/useDeck";

export { useDeckKeyboard, handleDeckKey } from "./composables/useDeckKeyboard";
export type {
    DeckMoves,
    DeckKeyOptions,
    UseDeckKeyboardOptions,
} from "./composables/useDeckKeyboard";

export {
    installDeckSpring,
    deckEase,
    DECK_SPRING,
} from "./composables/useDeckSpring";

export { default as DeckPager } from "./DeckPager.vue";

export { CONTROL_SELECTOR } from "./constants";

export type { PagerWindow } from "../pager-dots/pagerWindow";
