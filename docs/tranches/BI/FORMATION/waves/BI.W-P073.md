# BI.W-P073 — Alert announcement policy

**Status:** DONE — PRODUCT COMPLETE

## Product contract

`Alert` is a persistent inline status surface. Tone controls paint; it does not imply
urgency or screen-reader interruption. Title, description, icon, action, and caller
content continue to compose through the existing slot anatomy.

The `announce` prop owns the live-region policy:

- `off` (and omission) adds no live-region role or politeness.
- `polite` maps to `role="status"` and `aria-live="polite"`.
- `assertive` maps to `role="alert"` and `aria-live="assertive"`.

Caller attributes remain intact. With announcement off, caller-provided semantics are
preserved; with an active announcement mode, the explicit policy owns `role` and
`aria-live` while leaving unrelated attributes untouched.

## Shipped

- Removed the hard-coded assertive role from every Alert instance.
- Added one opt-in announcement axis without changing tone names, layout, surface
  paint, title/body components, slots, or exports.
- Added focused tests for silent, polite, assertive, caller-owned, and policy-owned
  semantics.
- Added concise story specimens for all three announcement modes.

This slice adds no dismissal behavior, timers, toast overlap, proof scripts, receipt
machinery, package changes, or root export changes.
