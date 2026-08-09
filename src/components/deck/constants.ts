/* The focused-control selector the keyboard contract tests. When a control — a
   button, a link, a field — holds focus, EVERY navigation key falls through to it
   instead of being taken for paging. The predecessor consulted this for Space and
   the digit jumps only, so a caret in a focused text field could not move while
   the deck paged behind it, in both shipping engines. A navigation key taken from
   a focused control is theft whichever key it is. */

export const CONTROL_SELECTOR =
    "button, a, input, textarea, select, [role=button]";
