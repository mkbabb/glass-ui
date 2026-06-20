/* deck constants — the deck-register magic numbers, colocated OFF the composables
   (proof:colocation clause b: no module-scope magic-number const survives in a
   composable). Lifted byte-faithful from the slides donor (`deckKeys.ts:21`,
   `deckSpring.ts:28`). */

/** SwiftUI `.smooth` — the deck's slide-transition + count-up curve: a calm settle
    with a barely-there micro-overshoot, the right cadence for a content deck (the
    page change reads as a settle, not a bounce). It is the SAME family the
    `--spring-smooth` token derives from (`springLinearStops()` output), so the deck
    inherits the constellation's iOS curve instead of forking a third easing
    vocabulary — `--spring-deck: var(--spring-smooth)`. */
export const DECK_SPRING = { response: 0.5, dampingFraction: 0.85 } as const;

/** The focused-control selector the keyboard handler tests: when a control (button
    / link / field) is focused, Space + digit jumps reach that control's native
    activation instead of being stolen for navigation (the C6 correctness fix). */
export const CONTROL_SELECTOR =
    "button, a, input, textarea, select, [role=button]";
