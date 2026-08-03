/**
 * The one focusable-descendant selector. Sequential-focus candidates only:
 * `:not([disabled])` on the form controls, `tabindex="-1"` excluded (programmatic
 * targets are not part of the tab order a disclosure hands focus to).
 */
export const FOCUSABLE_SELECTOR = [
    "a[href]",
    "button:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "summary",
    '[contenteditable="true"]',
    '[tabindex]:not([tabindex="-1"])',
].join(", ");
