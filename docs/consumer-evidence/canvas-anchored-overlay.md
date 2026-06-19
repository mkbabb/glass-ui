# canvas-anchored-overlay — consumer evidence (FOURIER-INBOUND #7)

**DISPOSITION: BOOK** (exactly ONE named binary consumer — the ≥2-consumer bar is UNMET).
**Wave:** `BC.W-FOURIER-DECIDES` · **Ask:** FOURIER-INBOUND.md Tier-2 #7 (canvas-anchored-overlay).

No canvas-anchored-overlay seam ships this cut. There is exactly one named binary
consumer (fourier's `<canvas>` coefficient/curve hovers); no second canvas-anchored
top-layer exists in glass-ui's own tree or the constellation. The bar is APPLIED, not
waived — the library does not expose a new prop for a single consumer.

## The ask (as fourier delivered it)

Anchor a top-layer popover to a CANVAS-relative point via a synthetic
`getBoundingClientRect` — a coefficient/curve hover over a `<canvas>` has no DOM element
at the hover point to anchor to. reka's popper needs a reference element; a canvas point
has none.

## The upstream seam (exists — to be exposed on the flip, not now)

reka / floating-ui already accepts a VIRTUAL element (an object with
`getBoundingClientRect()`) as the popover reference. glass-ui's Popover
(`src/components/ui/popover/`) does NOT expose a virtual-anchor prop today
(`grep -rn "virtual\|getBoundingClientRect" src/components/ui/popover/` → no hits). The
seam to expose on the flip: a `:reference` / `:virtual-anchor` prop on
`<Popover>` / `<HoverCard>` accepting `{ getBoundingClientRect }` — the reka /
floating-ui virtual-element seam, no new engine.

## Consumer #1

| # | consumer | the canvas-anchored overlay |
|---|---|---|
| 1 | fourier-analysis/web | the coefficient/curve hover popover over the Fourier `<canvas>` — the hover point is a canvas-relative coordinate with no DOM anchor |

No second canvas-anchored-overlay consumer in glass-ui's tree or the constellation. The
≥2-bar is unmet.

## The promotion trigger (the flip condition — a BOOK is not a dead-letter)

**A SECOND canvas-/SVG-point-anchored top-layer consumer flips it to BUILD** — any second
overlay anchored to a `<canvas>` / SVG point with no DOM element at the anchor (a glass-ui
viz hover-tooltip, a chart-cell popover, a map-pin overlay). On the flip, glass-ui exposes
the `:reference` virtual-anchor prop on `<Popover>` / `<HoverCard>` accepting
`{ getBoundingClientRect }` (the reka / floating-ui virtual-element seam). Until that
second consumer the bar is unmet and the disposition is BOOK.

## The fourier interim (the foreign-tree fence)

fourier ships its own interim — a synthetic-rect reference (`{ getBoundingClientRect }`
computed from the canvas coordinate) threaded into reka's popper directly — in ITS repo.
glass-ui edits zero fourier files (inv-26). On the flip, the `:reference` prop lands
glass-ui-side and fourier re-points onto it on the bump.
