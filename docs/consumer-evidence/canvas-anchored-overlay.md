# canvas-anchored-overlay — consumer evidence (FOURIER-INBOUND #7)

> **[2026-08-25 · BK #76 α5 — THE BEAD CENSUS. THE BOOK'S PREMISE IS FALSIFIED AND
> THE PROMOTION TRIGGER HAS ALREADY FIRED.]**
>
> ~~**DISPOSITION: BOOK** (exactly ONE named binary consumer — the ≥2-consumer bar
> is UNMET).~~ **The bar was MET before the BOOK was written, and the second
> consumer did not arrive with BEAD — it was already there.** The count below is
> wrong by a whole binary, and the doc's own flip condition (*"A SECOND canvas-/
> SVG-point-anchored top-layer consumer flips it to BUILD"*) is no longer a
> prediction.
>
> **Source of record:** `docs/tranches/BJ/coordination/SCI-BEAD-INBOUND.md` §1
> (sci-report, the Connectivity Atlas BEAD route, 2026-07-24) — a consumer
> supplying facts, not verdicts, and its facts hold. **Binary #2 is `sci-report`,
> anchoring canvas-relative top-layer overlays in SIX plates across three routes,
> since the USF work:**
>
> | # | binary | plate | the canvas-anchored overlay |
> |---|---|---|---|
> | 1 | fourier-analysis/web | — | the coefficient/curve hover popover over the Fourier `<canvas>` |
> | 2 | sci-report | `usf/features/retention/RankedStrip.vue` | the state hover card + per-row `<Glyph>` silhouettes over an ECharts canvas |
> | 2 | sci-report | `usf/features/balance/BreakEvenScatter.vue` | the point hover card + per-point state silhouettes |
> | 2 | sci-report | `sci/features/scatter/SciScatter.vue` | the district hover card, incl. the pinned-card anchor |
> | 2 | sci-report | `bead/features/providers/ProviderRankedStrip.vue` | the company hover card over the ranked strip |
> | 2 | sci-report | `bead/features/technology/ServiceMixPlate.vue` | the jurisdiction card + a `VizAnnotation` on the national-fiber rule |
> | 2 | sci-report | `bead/features/providers/BuilderClassPlate.vue` | the class card and the company card |
>
> The mechanism is exactly the one the §"upstream seam" section below names: a
> hover point that is a canvas coordinate with **no DOM element to anchor to**.
>
> **THE BUILD IS OWED AND IS ROUTED, NOT TAKEN HERE.** Exposing `:reference` on
> `<Popover>`/`<HoverCard>` is a popover-surface act; Lane α's fence is
> `src/components/dock/**` · IOS27-MICRO · `src/composables/search/**` · docs
> relay. Building it from this seat would be the out-of-fence act, so this bracket
> does what a census is for: it moves the row from *"BOOK, bar unmet"* to
> **BUILD-OWED, bar measured MET**, and hands the builder the prior art below.
>
> **TAKE THE PRIOR ART — sci-report has already built this six times and names two
> traps** (SCI-BEAD-INBOUND §1, cited not restated): the projection is
> `chart.convertToPixel({gridIndex: 0}, [x, y])` plus the host's viewport origin;
> it is valid **only after the chart's first `finished` paint** (called early it
> does not throw, it returns garbage), so every plate carries a `chartReady` gate
> — and re-projecting per-hover re-fires the warnings and costs a frame, so the
> landed idiom **caches placements and re-anchors on a clock** (`finished` /
> settle / resize), never on pointer movement. A `:reference` prop that ignores
> both ships the defect sci-report already paid for.
>
> **One stale cite corrected in place:** `src/components/ui/popover/` → the
> BI restructure flattened it; the live path is **`src/components/popover/`**.
> Re-measured this seat: `grep -rn "virtual\|getBoundingClientRect"
> src/components/popover/` → **still zero hits**, so the *substance* of the
> "does NOT expose a virtual-anchor prop today" claim survives its own bad path.
> `src/components/hover-card/` does not exist at this HEAD — the `<HoverCard>`
> half of the flip needs its home re-derived before it is promised again.

~~**DISPOSITION: BOOK** (exactly ONE named binary consumer — the ≥2-consumer bar is UNMET).~~
**DISPOSITION at 2026-08-25: BUILD-OWED** (two named binary consumers, measured — see the bracket).
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
