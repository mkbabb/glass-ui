# R10-4 DELTA — the SUFFUSION + POPS-INCREASE + ANIMATION-REGISTER lane

The R10-4 second half ("better suffuse our design language … with colorful audacious pops,
like those found in our icons — how might we increase this, too? within a sense of
proportion … and our animation targets") + the R10-2 generalization ("the animations for
springs suck … not smooth enough/too slow") read as a DELTA over the banked BA bank, NOT a
redo. AUDIT-ONLY, read-only; live-probed `:5210` headless dark via the chrome-devtools CLI.
File:line for every claim. Builds ON: `fleet/icon-pops.md` (POP-1/2/3), `hierarchy-suffusion.md`
(HS-2/3/4), `animation-targets.md` (ANIM-1..5), `r10-tabs-overhaul.md` §3 (the snappy timing
audit — NOT re-derived), and the BA waves W-ICON-CHIP / W-SUFFUSE2 / W-ANIMATE / W-GLASS-CAL.
Evidence: `fleet/r10-suffusion-icons-pops-dark.png` (the icons Pops reference at HEAD).

---

## 0. The baseline — what the tranche ALREADY plans (the bank, so the delta is only the NEW)

| ask | banked wave | what it already covers |
|---|---|---|
| abstract the pop recipe | **W-ICON-CHIP** (Batch 5, `BA.md:163`) | a library `<IconChip :icon :section/:tone>` owning the `color-mix 25%` backplate + chip≤glyph ratio + opt-in duotone / hover-bloom / entrance-reveal; the 3 copy-pasted demo recipes collapse onto it; MetricCell `iconColor` consumes; born ≥2 |
| spread the pop within proportion | **W-SUFFUSE2** (Batch 6, `BA.md:172`) | each category gets ONE section-color identity (eyebrow + accent rail + one focal pop, the math-paper gold standard) off the icon-pops page-map; the content `<h1>` lifts one rung; motion reads ONE violet event; `<IconChip>` is the vehicle |
| animation targets | **W-ANIMATE** (Batch 6, `BA.md:173`) | page-enter chassis seam (fade-rise + `[data-scroll-reveal]` stagger), `.scroll-progress` shell bar, metric count-up (SETTLE), ONE hero entrance — all WIRING of shipped engines |
| the disco/hover smooth | **W-GLASS-CAL** (Batch 4, `BA.md:156`) | btn-audacious/sparkle retirement (the "un-smooth hover" the user felt is the disco busy-ness, not an easing bug — `animation-targets.md:103-111`); toggle-chip off the hardcoded `duration-150` flat-snap onto §6 |

**The four asks R10-4 raises that the bank does NOT yet own** (the delta):
D1 — the pops-INCREASE escalation ("how might we increase this, TOO?") — the bank assigns ONE
event per surface; the user asks for MORE, which needs the proportioned-escalation rule the bank
never specced. D2 — the ANIMATION-TIMING register defect generalized beyond the tabs
(R10-2) — the whole spring vocabulary rides a fixed wall-clock that discards the spring's own
response. D3 — the icons-grade full-chroma register's SPREAD CEILING (nav glyphs? legends?). D4 —
the NEW abstraction candidates R9/R10 surface (the pager-ring register, the paper-underline
register).

---

## 1. THE POPS-INCREASE — the proportioned escalation (D1) `[S2]`

The banked map (`icon-pops.md:39-54`) is a strict ONE-event-per-surface assignment, and the
one-event rule is machine-locked (`proof:suffuse` d1/d2/d3, `scripts/proof-suffuse.mjs:103`). The
user wants MORE pops "within a sense of proportion." The reconcile is not "raise the count to two"
— it is to define **what counts as ONE event** more generously, via three named escalations, each
of which the existing d3 predicate (≤1 tinted event-family per surface) already permits because
they are ONE event FAMILY, not two competing tints.

### 1.A The EVENT-FAMILY concept (the load-bearing escalation)

The current d3 predicate counts tinted-event FAMILIES, not tinted ELEMENTS (CLAUDE.md "the
one-color-event rule": "≤1 tinted event family per enrolled surface"). So a chip + a matching
accent RAIL keyed to the SAME `--section-color-N` is ALREADY one family, not two events — the
`math-paper.vue` gold standard (`border-l-[3px]` section-accent rail + the mono section-label,
CLAUDE.md W-SUFFUSE) is precisely a TWO-ELEMENT, ONE-FAMILY composition. The escalation the user
asks for is to LICENSE the full family per surface rather than the single chip the icon-pops map
conservatively assigns: a surface's ONE section-color may paint its **eyebrow + its accent rail +
ONE focal chip/metric glyph** simultaneously, because they read as one coherent color EVENT (the
same hue, coordinated), not a rainbow. W-SUFFUSE2 already NAMES this triplet (`BA.md:172`:
"eyebrow + section-accent rail + one focal pop") — so the escalation is: **make the event-FAMILY
(not the single chip) the unit `proof:suffuse` d3 enrolls**, and the map's "ONE pop" lines (e.g.
`icon-pops.md:41` "a section-color glyph chip on each section EYEBROW") become "the section-color
FAMILY: eyebrow + rail + focal chip, one hue." This roughly DOUBLES the painted-pop surface area
at ZERO cost to the anti-rainbow rule, because the additional elements are the same hue.

### 1.B Where the icons-grade FULL-CHROMA register can spread (D3 — the user's "increase")

The icon-pops lane proposes spreading the CHIP (a `color-mix 25%` backplate + full-chroma glyph).
The escalation is to also license the full-chroma register on three element CLASSES that today
read flat ink, each gated by a NATURAL semantic axis (the same proportion fence):

| element class | today (HEAD) | the full-chroma spread (within one-family) |
|---|---|---|
| **nav glyphs** (dock control icons, sidebar route icons) | warm-ink `--foreground` / `--dock-fg-on-aurora` (the de-red'd register, CLAUDE.md W-REGISTER-IOS) | the SELECTED nav item's leading glyph may carry its route's `--section-color-N` at full chroma (the route IS the semantic axis) — NOT every glyph (that is the rainbow), only the ACTIVE one, one hue, reading as the route's identity. The selected-reads-as-glass plate stays; the glyph gains the route hue. CAUTION: this touches `--dock-selected-accent` (CLAUDE.md), which W-REGISTER-IOS deliberately keeps a foreground luminance-lift, NOT a brand hue — so this spread is a DEMO-shell choice (the route's section-color on the demo nav), never a library-token re-point onto a saturated hue (the `proof:register-ios` clause-e negative guard must not be tripped). |
| **section markers** (timeline dots, status dots) | already the thin-dot positive idiom (`icon-pops.md:45`) | KEEP as the dot register — these ARE the proportioned per-marker hue already; the escalation does NOT chip-ify them (the lane is right; recorded so the synthesis does not over-reach here) |
| **data-viz legends** (the `--chart-*`/`--viz-*` semantic palette) | the metric glyph `iconColor` is under-spent (`icon-pops.md:46`); the chart strokes already paint | the LEGEND/key swatches beside a plot are the natural full-chroma surface — each series' `--chart-download`/`--chart-upload`/`--viz-fourier`/`--viz-legendre` swatch at full chroma is ONE family per series (the legend IS the categorical axis); the metric VALUE+unit stay ink. This activates the `--chart-*-label` tokens (confirmed minted: `--chart-{download,upload,ping,jitter}-label` + `--viz-{fourier,legendre,chebyshev,amber,green}`) which today paint nowhere but the curve strokes. |

### 1.C The CEILING — the anti-rainbow guard (the proportion fence, named)

The user's "within a sense of proportion" is the binding constraint, and the spread must NOT
dissolve it. The ceiling is THREE machine-checkable predicates that the escalation MUST preserve
(extending `proof:suffuse`, NOT relaxing it):

1. **ONE hue per surface.** The event FAMILY (1.A) may have N elements but they all read ONE
   `--section-color-N` (or one `--chart-*` series per legend ROW). A surface painting TWO distinct
   section-colors is the rainbow — fail. (The decidable test: the set of distinct section/chart/viz
   hues painted on an enrolled surface, MINUS the legitimately-categorical legend/marker rows, has
   cardinality ≤ 1.)
2. **Body ink stays untinted** (the existing d1 floor — no `<p>`/value/unit run carries a
   section/chart/viz/gold tint). UNCHANGED — the escalation never touches body copy.
3. **Chip ≤ icon scale** (the existing d2 — the chip is a backplate, never a slab). UNCHANGED.

The escalation is therefore: the **event-family becomes the unit** (1.A) + the **full-chroma
register spreads to active-nav + viz-legend element classes** (1.B), bounded by the **ONE-hue +
ink-floor + chip-scale** ceiling (1.C). This roughly doubles the colorful surface area while the
anti-rainbow guard stays binding — exactly "increase, within proportion."

### 1.D Routing

Folds INTO **W-SUFFUSE2** (it already owns the per-category section-color identity + the
eyebrow/rail/focal-pop triplet, `BA.md:172`). The wave's `proof:suffuse` extension must (a) enroll
the FAMILY as the d3 unit (not the single chip), (b) add the ONE-hue-per-surface predicate (1.C.1)
as the new anti-rainbow teeth, (c) enroll the active-nav-glyph + viz-legend spreads. The library
fence holds: ppmycota purple + any saturated nav hue stay demo-local (CLAUDE.md scope fence
`BA.md:186`; `proof:register-ios` clause-e).

---

## 2. THE ANIMATION-REGISTER TIMING — the spring vocabulary defect, GENERALIZED (D2) `[S1]`

R10-2's "the animations for springs suck … not smooth enough/too slow" is NOT a tabs-local defect.
The R10-tabs lane (`r10-tabs-overhaul.md:152-203`) root-caused the SNAPPY register on the tab
indicator. This lane proves the SAME class is **systemic across the entire CSS-spring vocabulary** —
and names the ONE architectural root.

### 2.A The architectural crux — a spring's RESPONSE is discarded, then a fixed wall-clock is applied `[S1]`

The vocabulary has TWO consumption paths, and they are NOT equivalent:

- **The JS physics path (CORRECT).** `useSpring` (`src/composables/motion/useSpring.ts:15`) wraps
  `SpringProgress` and settles on a velocity+position threshold (`:45`) — a REAL oscillator whose
  perceptual settle time IS its `response`. The dock morph rides this: `DOCK_SPRING = {response:
  0.32, ζ: 0.7}` (`src/components/custom/dock/constants.ts:32`) drives a `SpringProgress` writing
  `--dock-morph-t` (`dockMorphContext.ts:216`). The dock feels right because the physics owns the
  clock — `morphWindowMs` (`useDockMorphWindow.ts:40-45`) only scales `--duration-normal` as a
  FALLBACK envelope, the spring itself settles by its response.
- **The CSS-token path (BROKEN — the "not smooth/too slow" surfaces).** `regen-spring-tokens.mjs:18,55`
  solves each `(response, ζ)` pair into a `linear()` string via `springLinearStops` — and
  `springLinearStops` emits the curve NORMALIZED to 0..1 progress, **discarding the absolute time
  (the response)**. The `response` (0.35s for snappy, 0.5s for bouncy, etc.) is baked OUT of the
  token. Then every consumer applies a GENERIC fixed wall-clock at the call site:
  `transition: <prop> var(--duration-normal) var(--spring-snappy)`. So the curve SHAPE is the right
  spring, but the curve TIME is divorced from the physics — a 300ms `--duration-normal` is applied
  to a curve whose underlying spring would settle in ~250ms (snappy) or ~500ms (bouncy), uniformly,
  regardless of which spring it is.

**Live-confirmed:** `--duration-fast: 0.2s`, `--duration-normal: 0.3s`, `--duration-slow: 0.45s`
(probed `:5210`, `scheme-motion.css:67-69`). The five spring responses are
`{smooth:0.5, snappy:0.35, bouncy:0.5, gentle:0.7, dock:0.32}` (`springPresets.ts:48-79`). The
mismatch grid:

| register | spring response | the wall-clock it's GIVEN | mismatch |
|---|---|---|---|
| snappy (tab indicator, dropdown, progress) | 0.35s | `--duration-normal` 0.3s | curve does real work by ~100ms (`r10-tabs-overhaul.md:170`) then crawls a ~190ms sub-pixel tail — reads "soft/laggy" |
| bouncy (dialog, pop) | 0.5s | `--duration-slow` 0.45s | the only near-match — bouncy on slow is ~correct (and dialog enter is the one register that reads OK) |
| smooth (fade-slide, cards, glass scale, metric/pane swap) | 0.5s | `--duration-normal` 0.3s | a 0.5s-response curve crammed into 300ms — the overshoot/settle compressed, reads abrupt-then-stalled |
| dock (carousel dots) | 0.32s | `--duration-normal` 0.3s | near-match by luck |

The defect is **NOT the spring constants** (the `(response, ζ)` pairs are iOS-canonical and sound
— `animation-targets.md:30-34` ratifies them) and **NOT the easing family** (spring-for-transform
is §6-correct). The defect is **the DURATION token vocabulary**: there are only THREE generic
clocks (`fast/normal/slow`) and they are applied without regard to which spring's response they're
clocking. The spring's own settle time — the thing that makes it feel right in the JS path — is
thrown away in the CSS path and replaced by a one-size-fits-all wall-clock.

### 2.B The mid-glide squish-release desync (the snappy-specific compounding) `[S2]`

On TOP of 2.A, the tab indicator carries `INDICATOR_RELEASE_MS = 60` (`constants.ts`,
`r10-tabs-overhaul.md:184`) — the squish opens to 1.06 at ~59ms then schedules release at +60ms,
WHILE the position is still gliding (90% at 100ms). The "grow-then-shrink" meant to punctuate
ARRIVAL fires before arrival. This is the snappy-register-specific half the R10-tabs lane owns;
recorded here only to scope it OUT of the global recalibration (it is a per-component timing-coupling
fix in the tabs overhaul, not a token edit).

### 2.C The recalibration SHAPE — ONE vocabulary edit, not per-surface re-points

The systemic fix is a **duration-token vocabulary edit**, mirroring how `--glass-level` /
`--glass-tint-*` were factored as ONE shared knob (the house's recurring "mint-once" pattern):

- **Mint per-register duration tokens that carry the spring's OWN response.** Today
  `regen-spring-tokens.mjs` already KNOWS each response (`springPresets.ts`). Have it ALSO emit a
  paired `--spring-<name>-duration` token = the response (or response × a small settle factor, the
  ~1.4× that captures the visible-work envelope), so `--spring-snappy-duration ≈ 0.25s`,
  `--spring-bouncy-duration ≈ 0.5s`, etc. ONE generator edit, both halves (token + the duration)
  derive from the SAME `(response, ζ)` table — the no-second-authority discipline the script header
  already enforces (`regen-spring-tokens.mjs:18-23`).
- **Re-point the CSS consumers from the generic clock to the register clock.** Every
  `transition: <prop> var(--duration-normal) var(--spring-snappy)` becomes
  `transition: <prop> var(--spring-snappy-duration) var(--spring-snappy)` — the duration now MATCHES
  the curve's physics. This is a mechanical sweep over the ~20 sites grepped
  (`segmented-tabs.css:69-228`, `transitions.css:26-138`, `cards.css:41`, `glass/surfaces.css:75`,
  `CarouselDots.vue:121`, `Switch.vue:43`, `theme/literals.css:18-20`) — each pairs a `--spring-*`
  with a generic `--duration-*` TODAY, so each gets its matched register clock. NO per-surface
  judgment, NO new easing.
- **The result:** every CSS-spring surface settles in the time its physics implies — the snappy
  indicator crisps up (~250ms, no 190ms sub-pixel tail), smooth entrances breathe their full 0.5s,
  bouncy stays where it is. The "too slow / not smooth" collapses because the curve and the clock
  finally agree.

### 2.D Routing

This is a NEW finding the bank does not own — **W-ANIMATE** is the natural home (it owns the
animation-target wiring + the `regen-spring-tokens` adjacency), OR a dedicated `W-SPRING-TIMING`
sub-wave coordinated with the **R10-tabs overhaul wave** (which owns 2.B + the tab-indicator
re-time per `r10-tabs-overhaul.md:197-202`). The two must NOT diverge: the tabs lane asks for "a
dedicated `--tab-indicator-duration` ≈ 220-260ms" (`r10-tabs-overhaul.md:198`) — that is EXACTLY
`--spring-snappy-duration` under this lane's generalization. So the tabs lane's per-surface ask is
the SPECIAL CASE of this lane's vocabulary edit — fold the tab clock into the minted register-token
set rather than authoring a one-off `--tab-indicator-duration`. ONE vocabulary, every spring
surface inherits its right clock. Gated by extending `proof:spring-tokens-synced` (dock README
`:298`) to assert the duration token equals the response-derived value too.

---

## 3. IDIOM ABSTRACTION GAPS — only the NEW candidates R9/R10 surfaced (D4)

`idiom-gaps.md` is the baseline (A1 page-turn, A2 menu-row, B1 surface-axis, C1-C5 …). This lane
names ONLY the abstraction candidates R9/R10 NEWLY exposed, each with consumer evidence — it does
NOT re-derive the bank.

### 3.A The PAGER-RING register `[S2]` (NEW — R10-1)

The carousel pager (`CarouselPager.vue:75-81`) encapsulates its `1/5` counter in an OPAQUE
`bg-card` ring while the dots float BARE (`CarouselDots.vue:39-65`) — and the opaque `bg-card` ring
is ITSELF a R9/R10-5 gray-slab offender in dark (`rgb(28,25,23)` near-black, `r10-carousel-pager.md:50`).
The NEW abstraction the sibling lane proves: a **`<PagerDots ring>` register** — ONE pager-CHASSIS
glass-floating pill (the DockRail-chip recipe `--glass-bg-floating` + `--glass-blur-floating` +
`--glass-edge-light`/`--glass-specular`, `dock/rail-extend.css:234-249`) encapsulating BOTH the
counter AND the dots, killing the slab in the same move (`r10-carousel-pager.md:68-78,97-110`).
**Consumer evidence: ≥2 BY CONSTRUCTION** — `CarouselDots` and slides `DeckPager` are ALREADY the
same recipe today (`CarouselDots.vue:68` names DeckPager as its oracle), so the ring is a HARVEST,
not a new substrate (the R10-3 deck-dots fold, `USER-AUDIT-…-R10.md:12`). This is the carousel
ring + deck dots collapsing to one register — the bank's r10-carousel-pager + r10-deck-boundary
lanes own it; recorded here as the NEW idiom-abstraction candidate the idiom-gaps baseline predates.
SUFFUSION TIE-IN: the glass-floating ring is the "no gray" (R10-5) fix for the pager AND the
correct "controls in a pill" idiom — it converges with W-DARK-MATERIAL (the opaque-card-slab class).

### 3.B The PAPER-UNDERLINE register `[S2]` (NEW — R10-2)

The tabs overhaul (`r10-tabs-overhaul.md:214,236-237`) RE-CUTS the underline variant "for PAPER
scenarios" — a 2px `--foreground` ink hairline on a paper/flat surface, NO glass plate, NO blur
(distinct from the glass-pill register). This is a NEW shared idiom: the **paper-ink hairline
register** — an underline/accent that reads as INK on PAPER (the `paper-grain` substrate, CLAUDE.md
paper.css), never the `--glass-bg-quiet` plate the reka family wrongly bakes (`r10-tabs-overhaul.md:96-112`).
Consumer evidence: the tabs underline (4 consumers, `r10-tabs-overhaul.md:46`) + the math-paper
section-accent rail (`border-l-[3px]` on `paper-grain-overlay`, CLAUDE.md W-SUFFUSE) — BOTH are an
ink-mark-on-paper register, today hand-rolled separately. The abstraction: a `.paper-ink-mark`
recipe (the `--foreground` rule/rail keyed to a paper surface, no glass tier) that BOTH the
paper-underline tab AND the math-paper rail compose. This is the "paper scenario" twin of the
glass-pill register — the two surface-substrate registers (glass vs paper) the user names as the
binding tab axis. Folds onto the W-SURFACE-AXIS shared-vocabulary wave (`BA.md:153`) as the PAPER
arm (glass · veil · opaque + the paper-ink register), and the tabs overhaul wave consumes it.

### 3.C What the TABS CENSUS exposes (NEW — R10-2) — recorded, owned by the tabs wave

The tab census (`r10-tabs-overhaul.md:36-83`) exposes the `ToggleGroup` ↔ `SegmentedTabs :multi-select`
overlap (two primitives for "N toggles on one surface", `r10-tabs-overhaul.md:70-75`) and the bare
`ToggleGroup` flex-row (no glass container, `idiom-gaps.md:177-198` IG-B2). These are NOT new to the
bank (IG-B2 owns the ToggleGroup-as-segmented-control gap) — recorded only to CONFIRM the tab census
re-surfaces IG-B2 and to flag that the tabs overhaul wave must coordinate the toggle-vs-tab home
decision (one engine for both surface-toggles and panel-tabs) rather than leaving two material
dialects. No separate abstraction candidate beyond IG-B2.

---

## 4. Severity roll-up + routing

- **`[S1]` §2 the spring-timing vocabulary defect** — the architectural root of R10-2's "springs
  suck": every CSS-spring surface discards the spring's response and rides a generic wall-clock. ONE
  vocabulary edit (mint `--spring-<name>-duration` from the existing `(response,ζ)` table; sweep the
  ~20 consumer sites). Routes to W-ANIMATE / a W-SPRING-TIMING sub-wave; the tab-indicator special
  case folds in (NOT a one-off `--tab-indicator-duration`).
- **`[S2]` §1 the pops-INCREASE escalation** — the event-FAMILY becomes the proof unit + full-chroma
  spreads to active-nav + viz-legend, bounded by the ONE-hue anti-rainbow ceiling. Routes to
  W-SUFFUSE2 (extend `proof:suffuse` d3 to the family + add the one-hue predicate).
- **`[S2]` §3.A pager-ring + §3.B paper-underline** — two NEW shared idiom registers (glass-floating
  pager pill; paper-ink hairline). Route to the r10-carousel-pager / r10-tabs / W-SURFACE-AXIS waves;
  both converge with the "no gray" R10-5 / W-DARK-MATERIAL seam.
- **`[S3]` §3.C tabs-census ToggleGroup overlap** — confirms IG-B2; no new candidate.

The unifying thread across §1–§3: the house keeps minting a CORRECT shared substrate (the
`(response,ζ)` spring table, the `--section-color` ramp, the glass-floating pill) and then
CONSUMING it through a divorced or under-spent path (a generic wall-clock, a single conservative
chip, a bare/opaque host). Every delta above is a "re-marry the substrate to its right consumption"
move — the same gestalt as the bank's own "wiring not authoring" (`animation-targets.md:196`).
