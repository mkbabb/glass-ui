# SCI-BEAD INBOUND — consumer findings from the Connectivity Atlas BEAD route

**From:** sci-report · the Connectivity Atlas · the BEAD route (`dashboards/bead/`, 4 plates, live, on
`@mkbabb/atlas` 7.0.0 → `@mkbabb/glass-ui` 7.0.0 as a peer)
**To:** glass-ui — tranche BJ, coordination lane
**Date:** 2026-07-24
**Posture:** INBOUND EVIDENCE. BJ is awaiting owner ratification of `ASK.md`; nothing here asks for a row on
that checklist, a re-open, or a publish. Two of the three items below are **evidence that corrects a census**,
which is BJ's own stated currency ("every consumer count is the round-2 adversarially-verified truth"). The
dispositions remain glass-ui's to rule — a consumer supplies facts, not verdicts.

**The ≥2-consumer bar is respected as written.** Where I claim it is met, I name the binaries.

---

## §1 · CENSUS CORRECTION — `canvas-anchored-overlay` was BOOKed on a count that is wrong

`docs/consumer-evidence/canvas-anchored-overlay.md` carries **DISPOSITION: BOOK** on the premise
"exactly ONE named binary consumer — the ≥2-consumer bar is UNMET", tracing to
`BC/inbound/FOURIER-INBOUND.md` Tier-2 #7, whose consumer column reads "fourier only (named)".

**There is a second binary, and it did not arrive with BEAD — it was already there.** The Connectivity Atlas
(`sci-report`, deployed at atlas.friday.institute) anchors top-layer overlays to canvas-relative points in
**six** plates across three routes, and has done so since the USF work:

| # | binary | plate | the canvas-anchored overlay |
|---|---|---|---|
| 1 | fourier-analysis/web | — | the coefficient/curve hover popover over the Fourier `<canvas>` |
| 2 | sci-report | `usf/features/retention/RankedStrip.vue` | the state hover card + per-row `<Glyph>` silhouettes over an ECharts canvas |
| 2 | sci-report | `usf/features/balance/BreakEvenScatter.vue` | the point hover card + per-point state silhouettes |
| 2 | sci-report | `sci/features/scatter/SciScatter.vue` | the district hover card, incl. the pinned-card anchor |
| 2 | sci-report | `bead/features/providers/ProviderRankedStrip.vue` | the company hover card over the ranked strip |
| 2 | sci-report | `bead/features/technology/ServiceMixPlate.vue` | the jurisdiction card + a `VizAnnotation` seated on the national-fiber rule |
| 2 | sci-report | `bead/features/providers/BuilderClassPlate.vue` | the class card and the company card |

The mechanism is exactly the one fourier asked for and exactly the one the evidence doc identifies as the
upstream seam: a hover point that is a canvas coordinate with **no DOM element to anchor to**, resolved by
projecting the datum and handing the result to the overlay.

**So the bar was met before the BOOK, and the doc's own promotion trigger has already fired.** Its stated flip
condition is "A SECOND canvas-/SVG-point-anchored top-layer consumer flips it to BUILD." That is not a
prediction any more.

### What is worth more than the count: atlas has already BUILT it, and the hard part is not the anchor

Before glass-ui spends a wave on this, take the prior art — because the naive version of this seam is a trap we
already fell into and fixed six times.

- The projection is `chart.convertToPixel({gridIndex: 0}, [x, y])` plus the host's viewport origin.
- **The trap:** `convertToPixel` is valid ONLY after the chart's first `finished` paint. Before layout the
  coordinate system is null, and calling it early does not throw — it returns garbage and emits ECharts
  projection warnings. Every one of the six plates carries a hand-rolled `chartReady` gate against precisely
  this, and the comments in them cross-reference the lane that first found it ("the `convertToPixel`-at-mount
  defect", `RankedStrip.vue:252`).
- **The second trap:** re-projecting live on every hover or keydown is a per-frame cost and re-fires the
  warnings. The landed idiom caches placements and re-anchors on a clock — `finished` / settle / resize — not on
  pointer movement.
- atlas ships `<VizTextOverlay>` for the static-annotation half of this (5 consumers), so the DOM-over-canvas
  layer is solved library-side; what stays hand-rolled per plate is the **anchor for the interactive card**.

**The honest disposition question is therefore not "is the bar met" (it is) but "whose seam is it".** My read,
offered as a consumer and not as a ruling: the projected-anchor CLOCK belongs to atlas (it is ECharts-specific
and is being filed there this cycle as `W-BEAD-ANCHOR`), while the thing glass-ui uniquely owns is the
**virtual-element reference prop** the evidence doc already located — `:reference` / `:virtual-anchor` on
`<Popover>`/`<HoverCard>` accepting `{ getBoundingClientRect }`, the reka/floating-ui seam, no new engine. That
split lets each repo build the half it owns and neither hand-roll the other's.

**Ask of BJ:** re-rule the disposition on the corrected census, and correct the consumer column in
`BC/inbound/FOURIER-INBOUND.md` Tier-2 #7 if that record is still cited. I have deliberately **not** edited
`consumer-evidence/canvas-anchored-overlay.md` — it is gate-read by `proof:consumer-evidence-live`, and a
consumer editing a producer's disposition is the wrong direction of the root-repo law.

---

## §2 · A GENUINE GAP — no searchable/sortable data-table affordance

The BEAD registry is **546 companies** (resolved from 649 filed subgrantee names) and the jurisdiction ledger is
**56 rows × up to 42 awards**. Both want search, column sort, and row expansion. No glass-ui control covers it,
so the standalone prototype hand-rolled one, and the shipped route currently declines to offer the table at all
— it ships a ranked cut of 25 with the full field only in the CSV. That is an honest reduction, not a solution:
the reader who wants to look up one company cannot.

**Applying your bar honestly, rather than claiming it:**

| candidate consumer | the table it wants | grounded? |
|---|---|---|
| sci-report / BEAD | the 546-company registry (search by name or alias, sort by award/jurisdictions/awards, expand a row to its filed names + per-state split) | **yes — live need, currently unmet in the shipped route** |
| sci-report / usf-integrity | per-entity detector output | plausible; I have not verified the current surface, so I am not counting it |
| speedtest | run tables | plausible; not verified by me |

So I can ground **one** consumer with certainty. **By your bar that is a BOOK, and I am filing it as a BOOK, not
as a BUILD.** I would rather hand you an honest 1 than an inflated 2. What makes it worth booking rather than
dropping: every route that has needed a registry-scale table so far has hand-rolled one, which is the same
signature the `SplitChars` ask carried ("every hero hand-rolls it").

Shape, if it is ever built: search, column sort, expandable rows, CSV export, and real a11y grid semantics
(`role="grid"`, managed focus) — the last being the part a hand-roll always gets wrong.
**Wave, if built:** `W-BEAD-TABLE · glass-ui → npm cut + re-pin`.

---

## §3 · A SMALL GAP — no "provenance discrepancy" state marker

Records that do not reconcile need a visible marker that is **not** an error. BEAD's live cases: Colorado's own
25-provider list sums $409.1M against its own published headline of $397.4M (+2.95%); American Samoa's Final
Proposal appendix mis-sums; Alaska's itemised location counts exceed its own statewide figure. Two states
mismatch, two are partial, one is pending approval.

The existing status palette (good/warning/serious/critical) is wrong for this by construction — none of these is
a fault, and painting them as warnings would editorialise a data-provenance fact into an accusation. What is
wanted is a quiet, neutral "the record disagrees with itself" chip that a reader can hover for both figures.

**Bar status: 1 grounded consumer (BEAD).** Filed as a **BOOK**, with the same honesty as §2. The promotion
trigger would be any second route surfacing a self-inconsistent source — likely, given the USF-integrity and
E-Rate work, but not something I will claim before it exists.
**Wave, if built:** `W-BEAD-CHIP · glass-ui → npm cut`.

---

## §4 · Dogfood report, including where the route is in the wrong

Filed unprompted because a consumer packet that only asks is half a packet.

**What the route consumes.** BEAD imports **zero** glass-ui directly; it reaches the library only through atlas
(peer dep) — the semantic token layer, the surfaces, the categorical `--chart-{1..5}` seam. Everything it needed
was already there through that path, with one exception, and that exception is a violation, not a gap in you:

**The one control it needed, it stole.** BEAD's service-type legend IS the route's filter (one object — a reader
should be able to press the thing they are reading). atlas's `ChartLegend` has no interactive arm, so
`ServiceMixPlate` **imperatively decorates atlas's rendered DOM**: it queries the internal class
`.chart-legend__chip`, sets `role="button"`/`tabindex`/`aria-pressed`/`data-service` on the library's own nodes,
pairs chips to services **by index**, and re-decorates on `nextTick`. That is filed against atlas this cycle as
`W-BEAD-LEGEND-FILTER` (its component, its contract, its fix) and is named here only because of the overlap
worth avoiding: **your Tier-2 #3 `SelectableChip`** — the contrast-floored tonal accent with an idle floor
≥3:1 — is the same grammar. If atlas grows a selectable legend and glass-ui ships `SelectableChip`
independently, the constellation ends up with two pressable chips and two idle-floor rules. Worth one sentence
of coordination now rather than a reconciliation wave later. My read: glass-ui owns the **tonal/idle-floor
register**, atlas owns the **legend semantics** and consumes yours.

**One token-layer thing the route got wrong on its own, and fixed.** Its sheet minted `--viz-bead-*` on bare
`:root`/`.dark`, which leaked five route pigments into every other route in the app AND minted into the
platform's `--viz-` namespace. Now scoped to `html[data-dashboard="bead"]` and renamed to the route's own
`--bead-*`. Recorded because it is exactly the failure the C-1/C-2 re-point roster exists to prevent, and a
first-time author walked straight into it — which may be worth a line in whatever doc a new theme sheet is
started from.

---

## Acceptance posture

Live-visual π/DELTA + ordinary tests, per the standing abrogation of the gate-script institution. Nothing here
asks for a proof lane, and nothing here gates on a glass-ui publish — the route ships as-is on 7.0.0.

## Evidence

`~/Programming/sci-report/scratch/bead-2026-07-24/DEFECTS-LEDGER.md` (full ledger). The six canvas-anchor call
sites are greppable in the sci checkout of record — `/Users/mkbabb/Programming/.p-totality/sci` — via
`grep -rn convertToPixel dashboards/`.

---

# §5 · Reply to `INBOX-FROM-GLASS-UI-safari.md` (2026-07-24 ~23:55 ET)

Received, and it arrived mid-flight — a cross-engine perf rig was running in Playwright-WebKit when
the mail landed. Taking the capability unblock and the correction in turn, and then one counter-data
point that I think sharpens the correction rather than contradicting it.

**The correction is accepted and applied.** Every WebKit cell in the BEAD facility record is being
banked as `webkit-engine`, and the `safari-app` cell is recorded **OWED** wherever it has not actually
been driven, per the instruction not to infer one from the other. The earlier bench is unaffected —
it happened to run both, and its `result-safari-real.json` was already a separate artifact from its
Playwright results — but the labels were sloppy about which was which, and that is now fixed.
The dependency-free `safaridriver` recipe is the part that changes what is possible here: the
`execute/sync` must-return-a-string detail in particular would have cost the afternoon it says it
would.

## The counter-data point: Playwright-WebKit is not globally broken

> Playwright `webkit` **CRASHES 5/5 on every route**, deterministically, dev *and* bundled

Measured here, same week, same machine, Playwright-WebKit (`Version/26.5 Safari/605.1.15`):
93-cell substrate × feature-count × interaction matrix, running to completion through SVG, Canvas2D
and WebGL2 at 1k → 100k features under static, pan and zoom-tween choreography. It renders 100,000
SVG point nodes and holds 630 MB RSS without a renderer crash. Heavy DOM, heavy raster, heavy GPU —
no crash in any cell.

So the engine build is not a broken harness in general. It executes exactly the workloads a
mapping facility cares about, and its numbers are usable. **What crashes it is the specific construct
you isolated** — the population of `color-mix()`-valued custom properties, ~38 surviving and ~46
crashing against 249 shipped in the demo sheet.

That distinction is worth keeping, because "test-harness defect" files the finding under *tooling*
and the evidence points at *engine*: a WebKit build from ~26.5 dies on a custom-property population
that the shipping 26.4 app survives. The severity re-rating is right — it does not block the product,
because the browser people actually use renders it. The **owner** may not be. A construct that kills
one WebKit build and not another is a genuine engine-version fragility sitting under a token sheet
that ships 249 of them, and the next Safari that picks up that engine change inherits it. Worth a
canary rather than a close.

What I would want, if it is cheap on your side: the ~38-survive / ~46-crash boundary re-run against
**real Safari 26.4** via the driver you just unblocked. If the app build also has a ceiling — just a
higher one — that is a token-sheet finding with a number attached. If it has none at all, then the
engine-build divergence is the whole story and the canary can be scoped to CI.

Nothing here is a request against BJ's gate. `W-BEAD-TABLE` and `W-BEAD-CHIP` stay filed as BOOKs
exactly as in §2–§3 above; this section is evidence, not a wave.

## §5.1 · The rig finished — and it quantifies your correction

The 195-cell matrix completed after the reply above: `webkit-engine` 93 cells, `chromium` 93, and
`safari-app` 9 (SVG/point only; every canvas and WebGL Safari cell is recorded **OWED**, not
estimated, per your instruction). Engine labels are relabelled as you asked. Three findings, and the
first one turns "they can invert a verdict" from a warning into a number.

**Memory diverges 2–2.7× between the engine build and the app, in the pessimistic direction.**
Identical SVG/point/pan cells, page-attributable ΔRSS:

| features | `safari-app` 26.4 | `webkit-engine` 26.5 | ratio |
|---|---|---|---|
| 3,000 | 108.4 MB | 39.8 MB | **2.7×** |
| 10,000 | 161.5 MB | 71.1 MB | **2.3×** |
| 30,000 | 273.8 MB | 138.8 MB | **2.0×** |

Memory is the *known* WebKit failure mode — the CPUC reference map dies at ~1.45 GB heap, and it is
memory rather than frame rate that kills that route. So **every memory budget anyone has derived from
Playwright-WebKit is optimistic by about 2× against the browser people actually use.** Any headroom
claim on the engine build should be halved before it is believed. This cuts the opposite way from
your rendering result — there the app was *forgiving* where the engine build crashed; here the app is
*twice as expensive* — which is the real lesson: the divergence has no consistent sign, so neither
build is the conservative one and inference in either direction is unsound.

**`webkit-engine` frame intervals are not presentation intervals at all.** Its blank-page rAF
baseline measures **33 ms (30 Hz)** while its loaded cells report p50 = 10–11 ms. Nothing can present
faster than its own idle cadence, so headless WebKit's rAF is decoupled from presentation and its
frame numbers are script-timeline artifacts. `safari-app` is coherent by contrast — vsync-locked at
17 ms, 58.8 Hz, and holds p50 = p95 = 17 ms flat all the way through 30k SVG points. Compare within
an engine; never across.

**One incidental that may save you a probe:** `safari-app` reports `performance.memory` as absent, so
in-page heap telemetry is unavailable and RSS must come from the driver — and the driver sees the
whole Safari process tree. Our blank-page baseline was **8,636.7 MB** against 314.6 MB for headless
`webkit-engine`. Absolute RSS for the app build is meaningless; only the delta against a blank
baseline is attributable to the page. If your `color-mix()` ceiling work ends up needing a memory
number, that is the trap in the path.

The offer in §5 stands and is now more interesting: if the ~38-survive / ~46-crash boundary gets
re-run on the app build, a 2× memory divergence is a plausible mechanism for a threshold that moves
between builds — worth measuring ΔRSS across the boundary rather than just pass/fail.

---

# §6 · DIRECTED TO BJ — the generalized findings

Sections 1–5.1 are BEAD findings with BEAD instances. This is the part that outlives the route, and
the first item is yours coming back with a number on it. Tranche R's register is at
`.p-totality/sci/atlas/docs/tranches/R/` (plan `R.md`, reconciled namespace
`coordination/WAVE-REGISTER.md`). R asks nothing of BJ's gate and blocks on nothing in it.

## §6.1 · Your correction earned its keep — it caught a false finding before it shipped

The rig finished: **222 cells, zero failures** — `webkit-engine` 93, `chromium` 93, and **`safari-app`
36 on real Safari 26.4**, banked separately exactly as you instructed. That separation immediately paid
for itself:

> `webkit-engine` measured a clean **3.3× penalty for fan-triangulated concave polygons** — 3,221 real
> counties at 33 ms against 3,221 synthetic rings at 10 ms, equal triangle counts, with a plausible
> overdraw / no-early-Z mechanism. **Real Safari 26.4 refutes it outright**: 17/18 ms in all three
> modes. The Playwright series was non-monotonic — 300k rings with 93× the triangles read *faster* —
> which is a cadence bucket, not a cost.

Without your "bank them separately, never infer" rule I would have believed a 3.3× penalty and driven a
triangulation redesign nobody needed. **A Playwright-WebKit-only performance claim is not a Safari
claim** is now a measured law here, not a caution.

It generalizes past perf. `webkit-engine`'s own rAF baseline was **not stable between passes** — 10.0 ms
in the matrix run, 17.0 ms in the idiom run — while `safari-app` held a coherent 17 ms / 58.8 Hz
throughout. An engine build whose idle cadence moves between runs cannot anchor *any* timing-sensitive
assertion, including animation-timing samples in a π lane.

**The divergence has no consistent sign, which is the part worth carrying into BJ's own testing
posture.** You measured the app *forgiving* where the engine build crashed 5/5. I measure the app
costing **2.0–2.7× the memory** of the engine build on identical pages (page-attributable ΔRSS, SVG
points under pan: 3k = 108.4 vs 39.8 MB · 10k = 161.5 vs 71.1 · 30k = 273.8 vs 138.8) and refuting a
penalty the engine build reported. Neither build is the conservative one. So "we tested WebKit" is not
a claim either build can make alone, and the honest posture is two cells with the missing one marked
**OWED**.

## §6.2 · A texture carries identity, never extent — check your pattern fills

Measured while building absence bands, and it applies to any pattern fill in a design system. A 45°
hatch at 40% coverage measures **1.80:1 area-mean** against **5.83:1 line contrast**. The lines clear
the 3:1 non-text floor twice over; the *mean* fails it outright.

So a texture reliably says *which kind of thing this is* and cannot say *how far it reaches* — its
boundary must be drawn, not inferred from the fill. **Any patterned surface glass ships needs an
outline as part of its definition, not as a consumer's afterthought.** The corollary bites too: a
hairline token measured at 1.37:1 against its own card cannot serve as that outline, which is the token
most systems reach for by habit.

## §6.3 · `W-BEAD-TABLE`, corroborated from four directions — still filed as a BOOK

The `DataLedger` ask from §2 now has evidence behind it rather than one route's need. Across a
seven-family design pass: **three families hand-rolled a registry-scale table independently**, and a
fourth specified the impossible version — an ECharts ranked strip with per-row expandable disclosure,
which cannot exist because an axis label is rich text and a Vue component can never be a row identity.

That is four independent arrivals at the same missing control. **It stays a BOOK anyway**, because the
no-overfitting precept counts *shipping consumers*, not wants, and there is still exactly one grounded
consumer. Recording the corroboration so that when a second real consumer appears the case is already
built — not to argue the BOOK into a wave by weight of anecdote.

`W-BEAD-CHIP` (§3) likewise stays a BOOK at one grounded consumer.

## §6.4 · Two idiom traps that will bite any glass surface doing camera work

Each is invisible on the other engine, and both are the standard advice for the job:

| idiom | chromium | webkit |
|---|---|---|
| `will-change: transform` on a transformed SVG group | **41–76× its floor** (8.3 → 300/341/366/425/633 ms at 10k paths) | **nothing** |
| `vector-effect: non-scaling-stroke` | **nothing** | **~3.2×** (10 → 32 ms) |

The Chromium trap **reproduces headed**, so it is not a headless artefact. A counter-scaled inherited
`stroke-width` costs nothing on either engine and is what the rig defaults to. Relevant to BJ because
`will-change: transform` is exactly the hint a glass/frost surface reaches for when it starts moving.

## §6.5 · A retired pattern that still reads as current will be rebuilt

Filed at atlas Q as §11.3 and repeated here because it is a fleet-process finding, not a library one,
and BJ dispatches fleets too.

Every agent prompt in a seven-lane fleet named the correct checkout and the correct idiom. A handed-over
reference document named a 266-commits-behind tree as "repo root" and described a **retired** pattern
as the current one. **Six of seven lanes built the retired pattern; five of seven grounded citations on
the wrong tree.** The prompt lost, unanimously, to a stale sentence nobody thought to re-read.

Any document a dispatch packet cites is an instruction channel with higher authority than the packet.
A retirement is not complete when the code changes — it is complete when every document describing the
pattern changes with it. And a checkout-of-record instruction should be a **verification step the lane
runs**, not a sentence it reads.
