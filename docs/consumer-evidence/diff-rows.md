# diff-rows — consumer evidence (FOURIER-INBOUND #4, AtomDiff)

**DISPOSITION: BOOK** (the ≥2-consumer bar is UNMET for a generic keyed-diff grammar).
**Wave:** `BC.W-FOURIER-DECIDES` · **Ask:** FOURIER-INBOUND.md Tier-2 #4 (AtomDiff viewer).

No `<DiffRows>` primitive ships this cut. The library does not mint a primitive for a
single concrete shape, and the three named consumers diff THREE different shapes — the
only shared element is the 3-tone keyed-row STYLING, which is already
`BC.W-ACCENT-TONE`'s register. A built `<DiffRows>` over an arbitrary keyed shape would
be either a trivial styled-`<table>` recipe (no primitive owed) or over-fit to one
shape (the contrivance). The bar is APPLIED, not waived.

## The ask (as fourier delivered it)

A 3-tone (added / removed / changed) keyed-row renderer over the canonical `atomdiff`
shape — a `<DiffRows>` / `<AtomDiff>` viewer.

## The named consumers + their CURRENT divergent shapes

| consumer | what it diffs | the row shape (divergent) |
|---|---|---|
| fourier `/diff` | two `atomdiff` values | a value.js `atomdiff` type — added/removed/changed ATOM rows (app-specific structure) |
| value.js palette diffs | two palettes | palette STOPS — `{ stop, before, after }` keyed by the ramp position |
| speedtest run-compares | two benchmark runs | run METRICS — `{ metric, baseline, candidate, delta }` keyed by the metric name |

Three named consumers — but each keys a DIFFERENT structure (`atomdiff` atom rows /
palette stops / run metrics). The "3-tone keyed-row" GRAMMAR is the only common element.
A primitive that renders 3-tone keyed rows over an ARBITRARY keyed shape has no shared
contract to type against; it degenerates to a styled `<table>` with three tone classes.

## What IS shared — and where it already lives

The 3-tone styling (added = success-tone, removed = destructive-tone, changed =
warning-tone) is the only common element, and it is `BC.W-ACCENT-TONE`'s register: the
three tones are three `--accent-tone` instances. fourier's `/diff` interim consumes the
TONE register sibling-side (the `--accent-tone` styling) even while the DiffRows
primitive stays booked — so the shared part already ships, as a token, not a component.

This doc CITES the `--accent-tone` register; it does not author it (that is
`BC.W-ACCENT-TONE`'s register — the foreign-wave fence).

## The promotion trigger (the flip condition — a BOOK is not a dead-letter)

**IF ≥2 consumers converge on a SHARED keyed-diff shape** — a single
`{ added, removed, changed }` row-list contract (rather than three divergent
app-specific structures) — **THEN a thin `<DiffRows :tone-map>` primitive over
`--accent-tone` ships.** The primitive types against the shared contract; the three
tones map to the three `--accent-tone` instances. Until that convergence the bar is
unmet and the disposition is BOOK.

## The fourier interim (the foreign-tree fence)

fourier ships its own `/diff` interim — its `atomdiff` renderer — in ITS repo. glass-ui
edits zero fourier files (inv-26). On the flip, the `<DiffRows>` primitive lands
glass-ui-side and fourier deletes its interim on the bump. The styling consume (the
`--accent-tone` tones) lands sibling-side now (the convergence-trigger is the component
trigger, not the token trigger).
