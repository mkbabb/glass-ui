# Inventory — lane C-slides-glassui — the slides ↔ glass-ui consume edge

**Date** 2026-06-08 · **glass-ui HEAD** `77c08c5` (NOT the prompt's `c72d2ac` — HEAD advanced; version
3.8.0, registry-published 3.8.0) · branch `at-dock-convergence` · **slides HEAD** `1461683` (branch
`deck/feedback-coder`, tree dirty per `docs/precepts` submodule note) — read-only inventory, no edits.

---

## 0. The consume-edge at a glance

| Axis | Truth at HEAD |
|---|---|
| Does slides consume `@mkbabb/glass-ui`? | YES. `slides/package.json:24` pins `"@mkbabb/glass-ui": "^3.7.0"`; `node_modules` resolves **3.7.0** installed. |
| glass-ui published line | **3.8.0** (registry). slides has NOT bumped to it — still resolves 3.7.0 in `node_modules`. |
| slides branch | `deck/feedback-coder` (NOT `main`; NOT `tranche/AX-slides`). `origin/main` is at `d79091e`; the AX-slides work is unmerged. `tranche/AX-slides` does NOT exist. |
| slides J tranche | ACTIVE + in-flight on `deck/feedback-coder` (HEAD `1461683`, two new J commits past the W30 premise `d79091e`). J coordinates with glass-ui's **fourier-field** primitive. |
| `/deck` subpath | RESERVED, un-squatted (W24/§4 note 6). slides keeps `useDeck`/`useDeckNav`/`DeckPager`/`deckSpring` LOCAL by design (single-consumer; lifting = overfitting). |
| `/deck-progress` subpath | SHIPPED library-side (W24, at HEAD AND in 3.8.0). slides has NOT adopted it (hand-rolled `.deck-progress` div in `DeckView.vue:112`). |
| `/fourier-field` subpath | SHIPPED at HEAD AND in the installed 3.7.0 (`dist/fourier-field.{js,d.ts}` present in slides node_modules). slides consumes it on `deck/feedback-coder` (`Slide01.vue`, `Slide05.vue`). |

The constellation of slides imports glass-ui via subpaths only (clean idiom): `status-dot`, `toggle-group`,
`hover-card`, `dock`, `button`, `dialog`, `forms`, `dropdown-menu`, `controls`, `color`, `fourier-field`, plus
`@import "@mkbabb/glass-ui/styles"` + the `@source ".../dist"` content-scan. No root-barrel import.

---

## 1. Status — DONE vs PARTIAL vs NOT-STARTED vs AT-RISK

### DONE (library-side, at HEAD + in 3.8.0)
- **W17 constellation port (GREEN).** Library ships the `--constellation-*` light/dark legibility token block
  (`tokens.css §5c`, both `:root` + `.dark` arms, plain-hsl Canvas2D-safe), `readPalette` full-set, the
  first-class focal-node `warpTo`/`warpOnClick` seam, `proof:constellation-tokens` + `proof:constellation-warp-live`.
  This UNBLOCKS the slides 510-line `constellation.ts` deletion — but that deletion is the **publish-gated tail**
  (W30 adoption leg).
- **W24 deck-progress LIBRARY surface (complete).** `/deck-progress` subpath emits; the `.glass-progress-rail`
  recipe re-authored as a Tailwind `@utility` (cascade-layer fix + `&&` geometry win + inset glow), token-read
  at `ProgressDefault.vue` source, `proof:deck-progress-rail` upgraded string-scan→dual-arm render gate. The
  binary invariant is explicitly UNcleared (DeckProgress has exactly ONE consumer — the demo story — until W32
  lands the slides port). A GREEN-with-routed-binary close, NOT a silent deferral.
- **fourier-field (W43) first-class.** Subpath + component dir present at HEAD AND in published 3.7.0. slides
  already consumes it (the feedback-coder deck). This is the one AX-new graphics surface slides DOES depend on.

### PARTIAL (split library / consumer; the consumer leg is publish-gated, NOT done)
- **W17 → slides constellation adoption.** Library seam shipped; slides still runs the 22887-byte
  `constellation.ts` duplicate. The deletion onto `<Constellation :draw-overlay>` is gated on the AX
  cut PUBLISHING (slides resolves the published `dist/`; 3.7.0 ships NO `/constellation`). NOT STARTED on
  the slides side.
- **W24 → slides DeckProgress adoption.** `.deck-progress` hand-rolled `<div>` + `::after` + the local
  `--deck-progress-*` token family remain in `DeckView.vue` / `deck.css`. The `<DeckProgress>` import + the
  `--progress-rail-*` override + the hand-rolled rail deletion is W32, gated on the AX bump.

### NOT-STARTED (the slides-side L band, all four waves)
- **W30 slides baseline.** `tranche/AX-slides` branch does NOT exist; the merge-to-main → `deploy-pages.yml`
  terminal is unreachable; the constellation neutral-lattice live verification is unrun on the AX line.
- **W31 content reframe** (Slide04 hypothetical, $5M figure-clip, lock affordance, access-modal glass restyle,
  mobile reflow guards, dead `SlideNutrition.vue`) — un-started.
- **W32 motion/form adoption** (`reveal.ts`/`useCountup.ts` → glass-ui `vReveal`/`useCountup`, LabeledField
  error pattern, DeckProgress port, deploy verify, slides Lighthouse) — un-started. `reveal.ts` + `useCountup.ts`
  both still present locally (`src/deck/`).

### AT-RISK
- **W30 base premise is STALE.** The W30 wave doc is grounded on slides HEAD `d79091e` ("the §24 reality")
  but the live slides HEAD has ADVANCED to `1461683` — two J-tranche commits (`b927326` scaffold, `1461683`
  ratify §7 decisions) plus the J tranche is actively executing on the SAME `deck/feedback-coder` base.
  The forward-cut protocol still holds (cut FORWARD carries J along untouched), but the W30 "CLEAN save
  `?? docs/tranches/J/`" assertion is now false — J is COMMITTED, not untracked. Re-ground required at wave-open.
- **W32 pin premise is STALE.** The W32 wave doc was authored against `"@mkbabb/glass-ui": "^3.4.0"`; slides
  actually pins `^3.7.0` now. The `vReveal` adoption is still live-unblocked (3.7.0 ships it); the
  `useCountup`/`DeckProgress` gate on the AX (3.8.0) bump is unchanged. The RED-witness 3 grep targets need
  re-grounding to `^3.7.0`.

---

## 2. The 3.8.0 bump readiness — do the AX changes affect slides?

slides does **NOT** consume the headline AX-new surfaces directly — verified by grep over `slides/src`:
- **SegmentedTabs / BouncyTabs / BouncyToggle / UnderlineTabs / ResponsiveTabs (W53 tabs-unify):** ZERO usage.
  slides uses `ToggleGroup`/`ToggleGroupItem` (feedback-coder `CodedTurnBank.vue`) and Tabs not at all. The
  W53 clean-break "Bouncy" rename + variant-axis merge touches ZERO slides call sites. No migration owed.
- **squircle (`corner-shape`/`superellipse`/`--corner-k-*`, W56):** ZERO usage. W56 re-homed the squircle OFF
  cards/buttons/pills onto the big-dock shell; slides' dock consumption (`GlassDock`/`DockIconButton` in
  `DeckView.vue`/`DeckSettings.vue`) inherits the visual change for free with NO code change. No slides edit owed.
- **glass-material / `--glass-level` (W54) / `--ui-scale` (W51) / liquid-glass W52:** ZERO direct usage of the
  new scalars. slides' glass surfaces (`Dialog`, `Button`, `GlassDock`) inherit any token-default evolution
  through the `@import "@mkbabb/glass-ui/styles"` cascade — token-first means the bump is transparent.

**Net:** the 3.8.0 bump is **token-cascade-transparent** for slides. The only slides-relevant new payload is
(a) the `--constellation-*` tokens (W17 — slides' `constellation.ts` reads them, see §3), (b) `useCountup` +
`DeckProgress` (W24/W32 adoption targets), and (c) any glass-tier visual shift its existing primitives inherit.
The major-bump **binding-verification sweep** (MEMORY: stale reka-ui prop/emit bindings silently no-op) is
still owed at the slides pin-bump — W32 names it; the bump crosses 3.7.0→3.8.0 (minor, not major, despite the
W32 doc's "crosses a major" phrasing authored against the old `^3.4.0`).

---

## 3. The constellation token edge — a NAME DIVERGENCE to reconcile (GAP)

- Installed 3.7.0 in slides ships **ZERO** `--constellation-*` tokens (the W17 block is a 3.8.0 payload). So
  slides' `constellation.ts` `readVar(c, "--constellation-node", readVar(c, "--neutral-4", …))` falls back to
  its OWN `deck.css` `--constellation-*` values TODAY — it is NOT yet reading the library defaults.
- **Token-name divergence:** glass-ui 3.8.0 ships `--constellation-edge-focus-alpha` (W17 RENAMED the spec's
  `--constellation-edge-anomaly-alpha` to dodge the out-of-bounds `proof:constellation-substrate-single`
  ANOMALY-IS-SKIN clause). slides' `constellation.ts:65,129` STILL reads `--constellation-edge-anomaly-alpha`.
  After the bump, slides reads a token name the library no longer defines → falls back to its hardcoded `0.3`.
  This is a coordination item W30/W31 must reconcile (slides carries its own deck-scoped value, so it is not a
  break — but the names should converge for the W17-adoption deletion).
- The slides-side `--foreground`-into-Canvas2D leak is ALREADY FIXED (`constellation.ts:116` reads
  `--constellation-line` first; `deck.css` carries plain-hex in both arms). W30 VERIFIES this live; it does NOT
  re-fix it. The FourierField `getComputedStyle` probe is the recorded W37 `resolveCanvasColor` consumer #2.

---

## 4. The publish-gated edge — the sequential DAG

The slides adoption legs are **at-HEAD-only until the AX cut PUBLISHES** (§4 note 12; contract-v2: slides
dev-resolves the BUILT `dist/` of the published line). The DAG: glass-ui publish (3.8.0 — **already done**,
registry confirms 3.8.0) → slides pin-bump 3.7.0→3.8.0 → W17/W24 adoption legs resolve → W30 forward-cut +
verify → merge-to-main → `deploy-pages.yml` → prod validation.

**Critical observation:** glass-ui 3.8.0 IS published. So the publish-gate is technically CLEARED at the
registry level — the slides legs are now bump-gated, not publish-gated. The remaining sequence is purely
slides-side: bump the pin, adopt, baseline-branch, deploy. This is the L band (W30-W32), which is NOT-STARTED.

---

## 5. GAPS / divergences (unaddressed)

1. **W30 base re-ground.** The "CLEAN save `?? docs/tranches/J/`" premise is stale — J is committed; HEAD is
   `1461683`. The forward-cut still works (carries J), but the sibling-baseline capture must record the real HEAD.
2. **W32 pin re-ground.** Authored against `^3.4.0`; slides is `^3.7.0`. The `vReveal`-already-available logic
   holds; the grep witnesses need the `^3.7.0` base. The bump is 3.7.0→3.8.0 (minor), not major.
3. **constellation token-name divergence** (`edge-anomaly-alpha` slides vs `edge-focus-alpha` library) — §3.
   Not a break (slides carries its own value) but blocks a clean W17-adoption deletion unless reconciled.
4. **The whole L band is NOT-STARTED** (W30/W31/W32). The §21 end-state leg 2 (slides.friday.institute
   re-deployed with the AX-rebuilt deck) is unreached: no `tranche/AX-slides` branch, no merge to `main`, no
   `deploy-pages.yml` fire of the AX cut. This is the load-bearing gap for the constellation's slides arm.
5. **The J tranche (slides-local, feedback-coder deck) is racing the AX L band on the same branch.** J.W9
   reconciles "the 3.7.0 provenance" + fourier-field citizenship — it ASSUMES the 3.7.0 pin. If AX bumps slides
   to 3.8.0, J's provenance reconcile must re-ground. The two tranches share `deck/feedback-coder` — a
   coordination surface the W30 forward-cut and the J execution must not clobber. Record in CONSTELLATION.md.
6. **`coordination/CONSTELLATION.md` opener (W28) is a hard predecessor of W30's band-L append** — W28 is
   un-started (band K, speedtest). W30 cannot append band-L until W28 opens the doc. Sequencing edge intact.

---

## 6. The gestalt PATH FORWARD (planning, not code)

The slides ↔ glass-ui edge is **library-COMPLETE, consumer-NOT-STARTED**. Every glass-ui-side obligation
(W17 tokens/warp, W24 deck-progress, W43 fourier-field) has SHIPPED at HEAD and in the published line. The
entire remaining surface is the slides-side L band, which is purely sequential and bump-gated (the publish is
already cleared at 3.8.0).

The idiomatic path:
1. **Re-ground W30/W32 to the live slides reality** (HEAD `1461683`, J committed, pin `^3.7.0`) before
   dispatch — the stale-worktree-trap discipline from MEMORY. The forward-cut FROM `deck/feedback-coder`
   carries both the H til-briefing deck AND the J fourier deck untouched (the no-clobber keystone).
2. **Bump slides 3.7.0 → 3.8.0** as the first slides-side act (publish is done). Run the binding-verification
   sweep (stale reka-ui prop/emit bindings on the dock/dialog/toggle-group/dropdown surfaces).
3. **W30**: forward-cut `tranche/AX-slides`, verify the constellation neutral lattice live, append band-L to
   CONSTELLATION.md, establish the merge-to-main → deploy terminal. The constellation leak is already fixed —
   VERIFY, never re-fix (satisfied-witness discharge).
4. **W31** content reframe on the verified base; **W32** motion/form adoption (`vReveal` now-available at 3.7.0,
   `useCountup`/`DeckProgress` at the 3.8.0 bump) + deploy verify.
5. **Reconcile the constellation token-name divergence** (`edge-anomaly-alpha`→`edge-focus-alpha`) as part of
   the W17-adoption deletion — slides carries its own deck-scoped value, so converge the read name to the
   library's shipped name, then delete the 510-line duplicate onto `<Constellation :draw-overlay>`.
6. **Coordinate the J ↔ AX-L race** on `deck/feedback-coder` via the CONSTELLATION.md writer/reader boundary —
   feedback-coder is HARD out-of-bounds for the til-briefing AX work; both decks ride forward.

No glass-ui library source is owed in this lane — the edge is consumer-driven from here. The squircle /
SegmentedTabs / glass-material / `--ui-scale` AX surfaces are token-cascade-transparent to slides (zero
direct consumers), so the bump is low-risk; the load-bearing work is the L-band branch/deploy DAG, not a
component-binding migration.
