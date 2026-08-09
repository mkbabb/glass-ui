// `@mkbabb/glass-ui/deck` — THE WINDOWED-SEQUENCE SUBSTRATE.
//
// ONE motion engine under both the presentation deck and the carousel. The two
// registers were separate implementations of one contract — a headless clamped
// index with no rendering half, and a 490-line item-scroller with no announcer —
// and between them they carried three `[data-state]` vocabularies, three keyboard
// tables, two window oracles and two motion vocabularies. There is one of each now
// and it lives here; `/carousel` is a component register composed over this.
//
// WHAT THE SUBSTRATE IS:
//   · ONE core — `useDeck`: an integer authority with one writer, plus an OPTIONAL
//     producer-fed continuous position/velocity channel beside it.
//   · TWO CLOCKS, never mixed (LAW 11) — inertial TRAVEL (the platform's own
//     scroll-snap, `useDeckSnap`, or the authored spring-clock turn for a
//     transform stage) and fired EXPANSION (governed spring presets only).
//   · ONE window oracle — `sequenceWindow`, graduated from an indicator window to a
//     MEMBER window and exported from here rather than re-implemented per consumer.
//   · ONE keyboard contract — `handleDeckKey`, axis-bearing and guarded on EVERY
//     key, in two bindings (global for a presentation, roving-tabindex for a rail).
//   · ONE `[data-state]` vocabulary — `active | prev | next`, direction derived.
//   · The rendering pair — `<DeckStage>` / `<DeckSlide>`, which is also where the
//     live announcement finally has a DOM host.
//
// THE LIFT BOUNDARY, redrawn. Hash sync, the swipe driver, the edge zones and the
// capture/settle contract are SUBSTRATE surface: they are content-free, every deck
// needs them, and each was being rebuilt per app. A settings panel, an app shell,
// an access gate and a slide registry are NOT: they are app policy and they stay
// with the app. The fence survives; it moved.

export { useDeck } from "./composables/useDeck";
export type { DeckCore, UseDeckOptions } from "./composables/useDeck";

export { useDeckKeyboard, handleDeckKey } from "./composables/useDeckKeyboard";
export type {
    DeckMoves,
    DeckKeyOptions,
    UseDeckKeyboardOptions,
} from "./composables/useDeckKeyboard";

export { useDeckSnap } from "./composables/useDeckSnap";
export type { UseDeckSnap, UseDeckSnapOptions } from "./composables/useDeckSnap";

export { useDeckHashSync } from "./composables/useDeckHashSync";
export type { UseDeckHashSyncOptions } from "./composables/useDeckHashSync";

export { useDeckSwipe, DECK_SWIPE_THRESHOLD_PX } from "./composables/useDeckSwipe";
export type { UseDeckSwipeOptions } from "./composables/useDeckSwipe";

export { useEdgeZones } from "./composables/useEdgeZones";
export type { UseEdgeZones, UseEdgeZonesOptions } from "./composables/useEdgeZones";

export {
    useDeckCapture,
    deckCaptureMode,
    DECK_SETTLED_ATTR,
} from "./composables/useDeckCapture";
export type {
    DeckCaptureMode,
    UseDeckCapture,
    UseDeckCaptureOptions,
} from "./composables/useDeckCapture";

// The ONE window oracle. It exports from the substrate because it is a MEMBER
// window now, not an indicator window: the dot rail and the carousel read this
// one copy, and the old "the deck consumes it THROUGH PagerDots" fence is gone
// with the reason for it.
export { sequenceWindow } from "./window";
export type {
    SequenceWindow,
    SequenceWindowOptions,
    SequenceWindowPolicy,
} from "./window";

export { default as DeckStage } from "./DeckStage.vue";
export { default as DeckSlide } from "./DeckSlide.vue";

export {
    provideDeck,
    useDeckStage,
    provideSlideContext,
    useSlideContext,
} from "./slideContext";
export type { SlideContext } from "./slideContext";

export type { DeckAxis, DeckState, DeckContent, SlideEntry } from "./types";

export { CONTROL_SELECTOR } from "./constants";
