# BJ — ASK-REDUCTION — the questions in reduction

This is the user-gated half of the BJ REDUCTION band (family C), written to the user's F04 order:
*"a grand audit of ALL components with **questions in reduction relayed to the user**."* The
DECIDED reductions execute in `waves/BAND-REDUCTION.md`; **these are the calls the drafter cannot
settle** — genuine kill / keep / merge ambiguity where the census has a recommendation but the
consumer truth, the user's own stated intent, and the ≥2-consumer ruling point in different
directions.

One checklist, one sitting. Each row: the decision, where the evidence is (verified on disk at
HEAD `48eb522f` unless noted), the recommendation already on record (with where it was adjudicated),
the QUESTION reserved for you, and what your answer unblocks. Modeled on the Q051 single-ask style.

Consumer counts are the **round-2 adversarially-verified** truth (round-1 was wrong in five
places), and every consumer sits BEHIND 7.0.0 — so each break is *prospective on the bump*, and a
migration ask is filable before it bites.

Ordered by consequence: §A (the flagship disease + cross-repo-gated) first, then §B (single-consumer
surface), §C (merge/collapse), §D (the demo taxonomy).

---

## §A — the third-ask disease + the cross-repo-gated removals

### A1. metric-family + instrument-chassis: ratify SHARED-KEEP, or overrule and accept the costed break? (the flagship — third-asked)

You have named metric-family + instrument-chassis as speedtest-overfit to REMOVE **three times**
(F18 "to be REMOVED — what of our grand pruning of overfit and superfluous components?"; Q051 R12
+ R16; now BJ F18) — but every consumer census rules them **SHARED library surface across 3-4 apps**.
This is the `recap:recap-carry-unexecuted` DISEASE row; the registry says "deciding it is a wave of
its own." It is now decided ONLY by you.

- **Evidence (verified on disk):** `instrument-chassis` (`./instrument-chassis` PRESENT) is imported
  by speedtest×4 (`App.vue:257`, `useRouteTransition.ts:34`, `ChartsView.vue:132`, `MapView.vue:53`)
  + muster×5 (`App.vue:31`, `InstrumentAside.vue:17`, `VerdictStage.vue:11`, `WinnerHero.vue:46-47`,
  `useMusterApp.ts:33`). `metric-badge` (already folded to `/metric` at commit `490cc46e`; symbol
  deleted, `grep MetricBadge src = 0`) is imported across the WHOLE fourier-analysis repo (7 files) +
  speedtest×2 + muster×2 + sci-report×2 — the MOST-shared component in the census. Full break table:
  `formation/round-2/adversarial-verification-of-round-1-consumer-truth-component.md`. Adjudicated
  SHARED-KEEP at `BI/STRUCTURE-ADDENDA.md` §3 (DP-A, RULED); the third-ask is `formation/round-2c/
  chronic-decided-draft.md` (UF-K1 row).
- **Recommendation on record:** **RATIFY SHARED-KEEP** — DP-A stands; the removal instinct is the
  disease, not the cure. metric-**pill** (0 consumers) was the clean delete and already landed;
  metric-**badge/cell/stack** + instrument-chassis are shared keeps. Overruling means speedtest
  becomes a UI library and ~4 apps break on the bump (a costed, filable break, but a real one).
- **The question:** Do you **ratify SHARED-KEEP** (the census stands, this closes the third-ask
  terminally), or **overrule DP-A** and accept the costed multi-repo break — and if overrule, do you
  want the removal to include instrument-chassis (speedtest×4/muster×5) or only the metric family?
- **Unblocks:** Wave 4 of the REDUCTION band (SHARED-KEEP → a family-B relay-only wave; overrule → a
  full multi-repo migration relay). Terminal either way — record the rationale so a fourth ask
  cannot re-open it.

### A2. completion-seal: keep on the public surface (2 external repos), retire-with-relay, or inline?

F26: *"greatly overfit; likely belongs only in speedtest."* **The provenance is wrong** — speedtest
imports it ZERO times. Its real consumers are TWO other repos.

- **Evidence (verified on disk):** `./completion-seal` PRESENT. speedtest `grep CompletionSeal = 0`.
  Real consumers: sci-report×2 (`CategoryHomeView.vue:4`, `GalleryView.vue:19`) + atlas×2
  (`completion.ts:5`, `category.ts:2`). Adjudicated at `formation/round-2/adversarial-verification…`
  finding "incomplete-provenance-retarget"; Q051 R14 (`chronic-decided-draft.md`) recommends "inline
  it if it stays at one."
- **Recommendation on record:** it is NOT speedtest-only — it clears the ≥2-consumer bar by two
  external repos (sci-report + atlas), so it is a **borderline KEEP**, not the F26 delete. Inline
  only applies if it drops to ≤1.
- **The question:** Given the corrected provenance (2 external repos, not speedtest), do you **keep
  `./completion-seal` public**, **retire it** (with a migration relay to sci-report + atlas), or hold
  the F26 "speedtest-only" intent knowing speedtest does not actually consume it?
- **Unblocks:** completion-seal's terminal shape in Wave 4; the corrected provenance rides the
  family-B outbound regardless.

---

## §B — single-consumer public-surface calls (the ≥2 bar)

### B1. DataTable: keep public, thin it, or demo-privatize? (458 LOC, ONE consumer, dead even in it)

- **Evidence (verified):** `DataTable.vue` = 457 LOC; `data-table/types.ts` = 24 bespoke props. The
  ONLY repo-wide consumer is `demo/stories/data/data-table.vue`. Four props are DEAD even in that one
  demo (`getRowAttrs, getRowId, rowRef, cardBreakpoint` = 0 setters), and `getRowIndex,
  tabbableRowId, selectedRowId, ariaColCount, ariaRowCount` are set only by that single demo. It is a
  bespoke virtualization/ARIA harness shipped as a general component; fails the doc's own
  ≥2-consumer bar. `formation/round-1/component-surface---overfit-census.md` finding
  "single-consumer-shipped-surface".
- **Recommendation on record:** relay the reduction — either **delete the caller-windowing/ARIA-index
  surface** (`getRowAttrs/getRowIndex/rowRef/tabbableRowId`) and slim it, or **document a named
  external consumer**; a single-repo consumer + dead surface does not warrant 458 public LOC.
- **The question:** Is DataTable a component you want **kept public** (then it needs a named external
  consumer or it fails the bar), **thinned** to the exercised surface, or **demo-privatized** as a
  story-only harness?
- **Unblocks:** whether DataTable rides a prop-diet, a demo-privatize (Wave 3), or a keep-with-
  evidence; and whether the ARIA-index surface is BAND-A11Y's or dead.

### B2. FourierField: keep public with opinionated defaults, or a demo-only viz? (5 dead knobs, 3 instances)

- **Evidence (verified):** `./fourier-field`, 273 LOC; `color, colorResolver, freeze, intensity,
  seed` = 0 setters; the component appears in only 3 instances (its own story + tiles). A procedural
  viz whose config surface "exists only to look configurable." `dead-code` also had a separate
  `presets.ts` (deleted in Wave 3). Under the A14 procedural-codification umbrella.
- **Recommendation on record:** retire the dead knobs to opinionated defaults; **relay keep-or-cut**
  — a procedural viz with 3 self-instances and 0 external consumers is A05-reduction-eligible.
- **The question:** Does FourierField stay a **public procedural component** (dead knobs retired to
  defaults), or is it **demo-only viz** to relocate under `demo/`? If kept, does it ride the A14
  procedural greenfield?
- **Unblocks:** FourierField's public-surface fate + whether its prop-diet lands in this band or the
  A14 umbrella.

### B3. Constellation: keep public, or relocate? (3 dead physics knobs, mostly single-consumer)

- **Evidence (verified):** `./constellation`, 16 props; `freeze, parallax, speed` = 0 setters;
  8 further props single-consumer (its own story + `StoryHero`). 11 instances. `component-surface`
  finding "single-consumer-shipped-surface".
- **Recommendation on record:** retire `freeze/parallax/speed`; **relay the physics-knob reduction**
  — Constellation is exercised almost entirely by its own story + the demo hero.
- **The question:** Keep Constellation **public** (dead knobs retired), or is its only real use the
  demo `StoryHero` background — i.e. relocate it demo-side with the other hero substrates?
- **Unblocks:** Constellation's public fate; if relocated, it joins the StoryHero-substrate cluster
  (with liquid-grid's suffuse re-home, Wave 3).

### B4. easing (EasingPicker + EasingConfigurator): does easing tooling belong on the public surface at all?

- **Evidence (verified):** `./easing` exports `EasingPicker` (7 props, single-consumer, `label/
  playback/readout` = 0 setters) + `EasingConfigurator` (6 props, `preset/steps/term` = 0 setters).
  Both are single-consumer demo devices. Coupled to **F31** ("properly modularize the easing-curve
  component") and F29 ("/motion/springs — redesign with better configurator support").
  `component-surface` finding "single-consumer-shipped-surface".
- **Recommendation on record:** demo-privatize — the easing tooling is a demo-configuration device,
  not a library primitive. The curve-component MODULARIZATION (F31) is a separate family-D/G redesign.
- **The question:** Does the `./easing` tooling belong on the **public surface** at all, or does it
  demo-privatize (with F31's curve component redrawn separately)?
- **Unblocks:** the `./easing` public-surface drop (Wave 3) + the F31 curve-gallery redesign scope.

### B5. WatercolorDot: keep public, or relocate to its single external repo? (value.js only)

- **Evidence (verified):** `./watercolor-dot`, 316 LOC, `solid | ghost` variant + 5 bespoke props
  mostly single-consumer over 7 instances; the sole EXTERNAL consumer is value.js (round-2 affirmed
  "watercolor-dot → value.js-demo only ×11"). Fails the ≥2 bar (one external repo).
- **Recommendation on record:** single-external-repo is not a keep per the user's ruling; **relay the
  relocate-vs-keep** call — retire the dead knobs regardless (Wave 1).
- **The question:** Keep WatercolorDot **public** (one external consumer), or relocate it to value.js
  as its owning repo?
- **Unblocks:** whether Wave 1's WatercolorDot cut is a prop-diet-and-keep or a relocate.

---

## §C — merge / collapse calls

### C1. deck vs carousel: collapse, keep both, or keep deck-as-headless-engine? (the atlas useDeck fact)

F33: *"what is deck vs carousel — likely collapse."*

- **Evidence (verified):** `./deck` exports a **headless engine** — `useDeck` + type `DeckCore` +
  `useDeckKeyboard` (`deck/index.ts:6-9`), NOT a Carousel-shaped component. Its real external consumer
  is **atlas** (`useStageDeck.ts:2`, `useDeckDetent.ts:1` import `useDeck`/`DeckCore`) — **not slides**
  (every `@mkbabb/glass-ui/deck` string in slides is inside a COMMENT; slides uses its own `@/deck`).
  `./carousel` is a separate component family (`Carousel.vue`, `CarouselContent/Item/Pager`).
  Adjudicated: `formation/round-1/consumer-truth…` finding "consumer-provenance-misattribution" +
  round-2 affirmation. F33 also asks: "the dot animations need dramatic refinement" (pager-dots,
  liquid-weight — a separate motion ask).
- **Recommendation on record:** deck is **NOT a carousel duplicate at the API atlas consumes** — it
  is a headless deck-navigation engine (`useDeck`/`DeckCore`), while Carousel is a visual component.
  Collapsing deck INTO carousel breaks atlas's headless integration (2 sites). **Recommend keep deck
  as the headless engine + carousel as the visual component**; if any surface genuinely overlaps,
  collapse only the overlapping shell, never the `useDeck` engine.
- **The question:** Do you **keep both** (deck = headless `useDeck` engine consumed by atlas;
  carousel = visual component), **collapse** (breaking atlas's `useDeck` — a filable 2-site relay), or
  **keep deck-as-engine and retire only the Carousel visual overlap**?
- **Unblocks:** the deck/carousel terminal shape; the atlas `useDeck` relay if collapse; the
  pager-dot refinement (F33) routes to the motion band regardless.

### C2. confirm-dialog vs dialog: keep the confirm STORY/preset as a distinct page, or fold the demo too? (the subpath already folded)

F25: *"how is this any different from a normal dialog."*

- **Evidence (verified):** there is **no `src/components/confirm-dialog`** — the `./confirm-dialog`
  subpath was ALREADY folded into `./dialog` at 7.0.0 (MIGRATION.md). What remains is the DEMO story
  `demo/stories/feedback/confirm-dialog.vue` (the confirm PRESET of Dialog) + external consumers still
  on the removed subpath: muster×1 (`App.vue:69`), words×5 (`SearchBar.vue:105`,
  `SidebarWordListItem.vue:113`, `SidebarWordListView.vue:165`, `WordListView.vue:236`,
  `WordlistDashboard.vue:166`), value.js×2 (`PalettesPane.vue:133`, `AdminUsersPanel.vue:186`).
  `dialog.confirm-preset.test.ts` asserts the preset behavior.
- **Recommendation on record:** the component fold already LANDED (F25 is answered at the code level —
  it IS the same dialog with a confirm preset). The open call is (a) the family-B relay for the 8
  consumers on the removed subpath, and (b) whether the demo STORY page survives.
- **The question:** Do you keep the **confirm-dialog demo STORY** as a distinct page (illustrating the
  confirm preset), or **fold the demo too** into the dialog page (one page, preset shown inline)?
- **Unblocks:** the demo story-page count; the family-B `/confirm-dialog → /dialog` relay (8
  consumers) files regardless.

### C3. reveal vs scroll vs the scrolling family: which primitives survive? (F32 + F42)

F32 (`/motion/reveal`): *"what is this vs our other scrolling components."* F42 (`/motion/scroll`):
*"what is this vs our other scrolling items."* The user is asking the same question twice about
overlapping scroll primitives.

- **Evidence (verified):** demo pages `demo/stories/motion/reveal.vue`, `scroll.vue`, plus a `scroll/`
  and `deck/` subdir. Multi-consumer scroll keeps (round-2): `fading-scroll` (atlas+speedtest+value.js
  +keyframes.js), and the `useStaggerReveal` family. `useStagger` itself has an unbacked external
  claim (Wave 3). Family D flags scroll-choreography overlap.
- **Recommendation on record:** consolidate the scroll-reveal primitives to the ones that clear ≥2
  (`fading-scroll` is a confirmed multi-consumer keep); the `reveal`/`scroll` demo pages likely
  collapse into one scroll-family page. The exact merge shape is a design call.
- **The question:** Which scrolling primitives survive as distinct public surfaces —
  `fading-scroll` + one reveal, or a single unified scroll-reveal? And do the `/motion/reveal` +
  `/motion/scroll` demo pages **collapse into one** scroll-family page?
- **Unblocks:** the scroll-family reduction (which exports survive) + the demo-page collapse; feeds
  the family-D story taxonomy.

### C4. tempo: keep the page, fold into springs, or delete? (F30)

F30 (`/motion/tempo`): *"what even is this page."*

- **Evidence (verified):** `/motion/tempo` demonstrates the `--motion-tempo` axis (Q051 R4, landed
  default 1.0 — the shape-preserving settle→duration axis). It is a token-demo page, not a component.
  F29 (`/motion/springs`) is a sibling motion page slated for configurator redesign.
- **Recommendation on record:** `--motion-tempo` is a real landed token, but a standalone page for a
  single axis is thin — likely **fold into the springs/motion configurator page** (F29's redesign)
  rather than a page of its own.
- **The question:** Keep `/motion/tempo` as its **own page**, **fold it into** the springs/motion
  page (F29), or **delete** it (the token stays; the demo page goes)?
- **Unblocks:** the motion story-page taxonomy (feeds family D + F29's configurator redesign).

---

## §D — the demo-section taxonomy

### D1. compositions: confirm the whole section prunes, or keep any page as a legit story type? (F43/F44/F45)

F43 (`auth-shell`): *"colors somewhat putrid; why does this have its own category."* F44
(`settings`): *"wtf even is this — likely overfit nonsense."* F45 (`gate-pattern`): *"improper
rounding — the entire compositions section is likely to be pruned."*

- **Evidence (verified):** `demo/stories/compositions/` = 6 pages (`auth-shell, chassis, empty-states,
  form-validation, gate-pattern, settings`), all demo-only, no src/external consumer.
  **Blast radius:** `tests/components/dialog.confirm-preset.test.ts:7` imports `GatePatternStory`
  from `gate-pattern.vue` — deleting the section breaks this test; the fixtures re-home onto a
  surviving dialog story (Wave 3). `formation/round-1/consumer-truth…` note: "the compositions demo
  section is a clean demo-only delete after re-homing the confirm-preset test fixtures."
- **Recommendation on record:** the whole section is a clean demo-only prune per F45; the ONLY
  obligation is re-homing the confirm-preset test fixtures. The taxonomy question (does any of these 6
  deserve to survive as a first-class story type) is the family-D story-meta-framework call.
- **The question:** Confirm the **entire `compositions` section prunes** (all 6 pages), or keep any
  one (e.g. `form-validation` or `empty-states`) as a legitimate story type in the family-D taxonomy?
  And is "compositions" as a *category* retired (F43's "why its own category")?
- **Unblocks:** Wave 3's compositions delete (+ the confirm-preset test re-home) and the family-D
  page-type taxonomy (which categories survive). **Taxonomy stake (cross-ref `BAND-STORY` OPEN-D9):**
  this answer determines whether the `scene` page type has ANY members — `scene`'s only candidates are
  the `compositions/` pages, so pruning the whole section makes the taxonomy **6 types (no `scene`)**,
  while keeping any composition page as a legit `scene` makes it **7**. Do not mint an empty `scene` type.

---

## Roll-up — what each answer unblocks

| # | Ask | Recommendation | Blocks |
|---|-----|----------------|--------|
| A1 | metric-family + instrument-chassis | RATIFY SHARED-KEEP (3-repo census) | REDUCTION Wave 4 |
| A2 | completion-seal | keep (2 external repos) or relay | REDUCTION Wave 4 |
| B1 | DataTable | thin or demo-privatize (fails ≥2) | REDUCTION Wave 3 + BAND-A11Y |
| B2 | FourierField | retire dead knobs; keep-or-cut | Wave 1 + A14 umbrella |
| B3 | Constellation | retire dead knobs; keep-or-relocate | Wave 1 |
| B4 | easing tooling | demo-privatize | Wave 3 + F31 |
| B5 | WatercolorDot | relocate (value.js only) | Wave 1 |
| C1 | deck vs carousel | keep deck-as-headless-engine (atlas useDeck) | deck fate + atlas relay |
| C2 | confirm-dialog | fold already landed; keep-or-fold the story | demo page count + relay |
| C3 | reveal/scroll | consolidate to ≥2-keeps | scroll-family reduction |
| C4 | tempo | fold into springs (F29) | motion taxonomy |
| D1 | compositions | prune whole section | Wave 3 + family-D taxonomy (+ `BAND-STORY` `scene` type: 6-vs-7) |

**Nothing here is a silent drop.** Every F04-relayed reduction question the census could not settle
is a row above; the DECIDED reductions are in `waves/BAND-REDUCTION.md`. Your answers close the
family-C surface purge terminally.
