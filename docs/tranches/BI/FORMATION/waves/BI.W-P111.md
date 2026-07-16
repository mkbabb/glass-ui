# BI.W-P111 — FadingScroll

**Status:** DONE

## Product truth

FadingScroll is one focusable scroll-port wrapper with state-driven start and end
edge masks. Its native CSS scroll-timeline path remains the primary writer; the
JavaScript fallback attaches only when that path is unavailable and writes the
same two mask properties from the owning element's scroll and resize state.

Horizontal fallback progress is logical rather than physical: LTR and the three
browser RTL `scrollLeft` models resolve to one distance-from-inline-start domain.
The component creates no generic landmark. Callers may supply `ariaLabel` or
`ariaLabelledby`; only a named port emits `role="region"`.

## Ownership boundary

- Glass owns edge-mask state, fallback observation, keyboard focusability, and
  optional region naming.
- The caller owns content structure, scroll position, and a meaningful name when
  the port deserves landmark status.
- No document scroll listener, duplicate JavaScript writer, proof script, or
  visual-test harness is part of the product.

## Verification

Focused unit coverage locks optional landmark semantics and logical LTR/RTL
fallback normalization. Visible mask behavior is verified in the retained demo
with native browser facilities when that demo changes.
