/* Deck keyboard constants. */

/** The focused-control selector the keyboard handler tests: when a control (button
    / link / field) is focused, Space + digit jumps reach that control's native
    activation instead of being stolen for navigation (the C6 correctness fix). */
export const CONTROL_SELECTOR =
    "button, a, input, textarea, select, [role=button]";
