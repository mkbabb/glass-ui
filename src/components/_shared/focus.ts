/**
 * The one focusable-descendant selector. Sequential-focus candidates only:
 * `:not([disabled])` on the form controls, `tabindex="-1"` excluded (programmatic
 * targets are not part of the tab order a disclosure hands focus to).
 *
 * DELIBERATE NON-MEMBER: `useDockClickIntegrity`'s interactive-ancestor probe
 * (dock/composables/useDockClickIntegrity.ts) is a WIDER, different question — "was
 * this pointer event aimed at something interactive", which includes disabled controls,
 * `[role=button]` and `tabindex="-1"` targets. It must NOT fold onto this constant.
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
