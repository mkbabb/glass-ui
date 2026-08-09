// The per-member context — `{ index, total, active }` provided by `<DeckSlide>` and
// injected by anything inside it. Content that wants to know where it sits (a
// per-slide count-up, a build that only runs when its slide is active) asks the
// slide rather than the deck, so a member can be composed out of a deck entirely:
// the out-of-deck fallback answers "member 0 of 1, active", which is the truth for
// a lone card.

import { computed, inject, provide, type ComputedRef, type InjectionKey } from "vue";
import type { DeckCore } from "./composables/useDeck";

export interface SlideContext {
    /** The member's 0-based index in the sequence. */
    index: ComputedRef<number>;
    /** The sequence's member count. */
    total: ComputedRef<number>;
    /** Whether this member is the active one. */
    active: ComputedRef<boolean>;
}

const SLIDE_CONTEXT: InjectionKey<SlideContext> = Symbol("glass-slide-context");

/** Provide the per-member context (called by `<DeckSlide>`). */
export function provideSlideContext(context: SlideContext): void {
    provide(SLIDE_CONTEXT, context);
}

/**
 * Read the per-member context. Outside a deck this answers member 0 of 1, active —
 * a lone card IS its own whole sequence, so consumers need no `if (inDeck)` branch.
 */
export function useSlideContext(): SlideContext {
    return (
        inject(SLIDE_CONTEXT, null) ?? {
            index: computed(() => 0),
            total: computed(() => 1),
            active: computed(() => true),
        }
    );
}

// ── The stage's own DI: the core, provided ONCE by `<DeckStage>` ─────────────
// A member must not be handed the whole core as a prop by every consumer that
// renders one; the stage provides it and the member asks. There is exactly one
// provider per stage, so nothing can disagree about which sequence a member is in.

const DECK_CORE: InjectionKey<DeckCore> = Symbol("glass-deck-core");

/** Provide the sequence core (called by `<DeckStage>`). */
export function provideDeck(core: DeckCore): void {
    provide(DECK_CORE, core);
}

/** Read the sequence core provided by an enclosing `<DeckStage>`, or `null`. */
export function useDeckStage(): DeckCore | null {
    return inject(DECK_CORE, null);
}
