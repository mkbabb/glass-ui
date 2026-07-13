# W-PAGER-A11Y — the pager dot hit-target exemption record (D-PAGER §4 G10)

The pager dot's painted pip is 13px (`--pager-dot-size: 0.8125rem`); it is centered in a
24px bed cell, and the transparent interaction `<button>` is padded to a **28px** hit box.
This records the deliberate below-44px target as an audited WCAG decision, not a silent
floor miss.

## The three geometries

| layer | size | role |
|-------|------|------|
| painted pip (`.goo-dot::before`) | 13px | the visible dot (decoration — the bed layer) |
| bed cell (`.goo-dot`) | 24px | the pip's flow cell; the button center aligns to it |
| hit target (`.pager-dot`) | **28px** | the focusable/clickable button (`--pager-hit-target`) |

The 28px hit box is pulled back into the 24px flow cell by a symmetric `-2px` margin
(`--pager-hit-inset`), so the button center stays aligned with the bed pip — **the painted
pip does not move** when the target grows. `--pager-dot-size` is untouched.

## WCAG 2.5.8 Target Size (Minimum) — AA — MET

WCAG 2.5.8 (AA) requires a target of at least 24×24 CSS px **or** sufficient undisplaced
spacing (a 24px circle centered on each target may not overlap an adjacent target's circle).
The pager targets are **28×28** — above the 24px minimum — so 2.5.8 is met outright, no
spacing exemption needed. Adjacent dot centers sit ≥30px apart (24px cell + 6px gap), well
clear of any overlap.

## The deliberate below-44px (2.5.5 AAA / house floor) exemption

WCAG 2.5.5 Target Size (Enhanced, AAA) and the glass-ui house control floor call for 44px.
The pager dot is **deliberately below** that: a position-dot rail is a **secondary,
supplementary** navigation affordance sitting beside a primary content region that is itself
navigable by other means (embla drag/scroll, the carousel arrows, and — as of this wave —
the roving arrow-key keyboard contract on the rail). WCAG 2.5.8 explicitly exempts the
"essential" and inline cases; a dot rail densely packing 5–12 targets into a compact pill can
not carry 44px targets without destroying the compact rail gestalt the register exists to
provide. 28px is the comfort target above the 2.5.8 AA floor; 44px is not pursued here by
design. This is the recorded exemption, not an oversight.

## The keyboard contract closes the access gap

The below-44px pointer target is backed by a full keyboard path (BI.W-PAGER-A11Y): exactly
one roving tab stop, axis-derived Arrow keys move focus + activate the adjacent dot, Home/End
jump, wrapping at the ends. A user who cannot acquire a 28px pointer target reaches every dot
by keyboard — the access is not gated on the pointer target size.
