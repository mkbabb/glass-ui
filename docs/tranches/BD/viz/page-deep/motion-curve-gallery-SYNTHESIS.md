# Pass-E SYNTHESIS — motion/curve-gallery (the binding per-page verdict)

**Route:** `/motion/curve-gallery` · **SFC:** `demo/stories/motion/curve-gallery.vue` · **Subpath label:** `@mkbabb/glass-ui/easing` (standardized — PASS, all three reports agree)
**Inputs reconciled:** `motion-curve-gallery-{demo,design,component}.md` (this directory).
**Substrate (live-verified, demo report):** `canvasCount: 0` — NO live GL field; the manifest `background: "grid"` wash only (`manifest.ts:1054`).

---

## 0 · One-paragraph reconciliation

All three reports converge hard. The page has a **world-class asset** (the thick non-scaling 3px `--motion-accent` violet curve plotted from the REAL value.js twin over a real 0/1 frame, every report names it) and an **exemplary architecture** (the boundary-law no-fork discipline — curve MATH = value.js, playback = rAF, COMPONENT = glass-ui — the component report calls it "genuinely idiomatic, no-fork, architecturally sound"). It is trapped in a **generic-AI documentation layout**: flat near-opaque plates over a flat `grid` void, a uniform protagonist-less 2-col card grid, two raw HTML `<table>`s, a duplicated title, and a tiny ~217px buried interactive editor. The defects split cleanly into **two ownership classes**: (A) **DEMO-side** page-redesign — the bulk, and entirely un-owned by any current BD wave (Bands 4/5 are foundations/display/data/forms/containers-scoped; motion is unenrolled); and (B) **COMPONENT-side** `<EasingPicker>` — exactly ONE real defect (a P6 PRM breach in the shipped primitive) plus two named-successor-gated animation-affordance shortfalls, all already mapped to existing waves by the component report. No report contradicts another; the only reconciliation needed is **dedupe + rank + ownership-routing**.

---

## 1 · Reconciled defect ledger (deduped, ranked by impact)

Each row: the defect · which reports raised it · its single disposition. Ranked highest-impact first.

| # | Defect | Reports | Class | Disposition |
|---|--------|---------|-------|-------------|
| **R1** | **Flat glass over a flat `grid` wash** — the six-layer composite has nothing to refract; reads grey-on-grey; the user's "demos over COLORFUL aurora" ask unmet *by manifest decision* | demo §3, design §5/TL;DR, component I2/§6 | A (demo) | **NEW** — Band-16 page-redesign wave (§3) |
| **R2** | **No per-subsection glass cards + ONE oversized flat container** — "curve canon", "doctrine", "house cores" are flat regions; the two doctrine `<table>`s are naked bordered HTML; main interactive area is small | demo §4, design §1/§4, component §6 | A (demo) | **NEW** — same Band-16 wave (§3) |
| **R3** | **Duplicated title** — the chrome `<h1>` + an in-body `text-display-3` violet masthead both paint "Curve Gallery" (W-HIERARCHY2 "shown ONCE" breach) | demo §4/§7, design §1 | A (demo) | **FOLD → BD.W-PAGE-HEADER-FOLD** (§4) |
| **R4** | **Zero iOS-27 animation affordance on the cards** — static until clicked card-by-card; 1% hover (sub-perceptual, not a spring); NO press-squish (§L3 breach); dots don't auto-play on arrival; curves don't draw-on; no settle-glow on overshoot | design §3, demo §2, component A2 | A (demo) + B (component) | **NEW** demo arm (§3) + **AUGMENT → BD.W-KF-OSCILLATOR-CONSUME** component arm (§5) |
| **R5** | **`playTravel()` has NO `prefers-reduced-motion` guard** — the SHIPPED primitive animates the travel dot under reduce (motion-canon P6 breach; the ONE real component defect) | component A1 | B (component) | **MODIFY → BD.W-KF-OSCILLATOR-CONSUME** (land pre-trigger as pure a11y; §5) |
| **R6** | **Hand-rolled `.curve-chip` rack, not a real glass-ui component** — re-implements a tab strip the library ships; the "leverage the dock APIs / deftly use a series of components" ask unmet; the family switch is a CSS color fade, no morph/spring | demo §1/§2, design §2 | A (demo) | **NEW** — same Band-16 wave (§3) |
| **R7** | **No protagonist / audacious ladder absent** — uniform grid, no hero plot; the √φ display ladder (the page's signature) entirely unused on a page *about shape*; one-color-event spent timidly (thin stroke + 12px dot), the 13-stop ramp + `--glass-accent` faceting unused | design §1/§4/§7, demo §1 | A (demo) | **NEW** — same Band-16 wave (§3) |
| **R8** | **Component hardcodes `glass-card`, no `surface`/`tier` prop** — the structural blocker preventing the demo staging the picker over a field via `tier="field"`/`deep` | component I2/§6 | B (component) | **AUGMENT → BD.W-KF-OSCILLATOR-CONSUME** rider OR thin standalone (§5) |
| **R9** | **Superfluous prose** — triple family-enumeration (SFC blurb + manifest desc + chip rack); all-caps shouting ("REAL JS twin", "FULL"); implementation-detail leak in user copy; heavy R7/R8 history comments in the live SFC | demo §6, design supporting, component §5 | A (demo) | **FOLD → the Band-16 wave + BD.W-PAGE-OFFTOKEN-SWEEP** (§4) |
| **R10** | **`stepPathD` re-samples 240 pts / `viewBox` 17 solves per drag frame** — per-frame recompute at pointer-rate; opportunistic (no CLS risk) | component P1 | B (component) | **MODIFY (opportunistic)** — rider on R5; not urgent (§5) |
| **R11** | **Duplicate split `import { ref }` in EasingPicker.vue** | component I1 | B (component) | **MODIFY (trivial)** — fold into R5 touch (§5) |
| **R12** | **Internal card rhythm flat** — uniform `p-4`/`gap-4`, ad-hoc `mb-N`, W-CARD-PAD √φ ladder shipped-but-unused; `cqi` units on the SVG with no `container-type` ancestor (Safari note) | design §6, component §4 | A (demo) | **FOLD → the Band-16 wave** (sub-item of R2) (§3) |

**Conflicts resolved:** none substantive. The only apparent tension — the demo report frames R1 as "contain an Aurora OR commit a PAPER register," while the design report leans Aurora and the component report leans "stage over aurora" — is reconciled in §3 as **BOTH**: a contained `<DockStage>`-pattern aurora behind the interactive cards AND a designed paper register for the doctrine legend (the GLASS+PAPER duality the north star demands). Not either/or.

---

## 2 · Convergence assessment

**The page is NOT close — it needs a substantial Band-16 redesign loop, but the work is well-bounded and the bones are correct.**

- **Architecture: converged.** The component is clean (boundary-law no-fork, colocation correct, one composable source). No PRUNE anywhere. The reports unanimously praise the IA, the twin-source rigor, and the dock-register chip seed. There is nothing to *re-architect* — this is a **transposition**, not a rebuild.
- **Component-side (Class B): near-converged, 1 real defect.** R5 (the PRM breach) is the only genuine bug; it lands cleanly as a pure a11y fix on an existing wave. R8/R4-component are named-successor-gated AUGMENTs. R10/R11 are opportunistic riders. ~1 focused touch closes Class B.
- **Demo-side (Class A): needs ONE designed redesign wave + 2 folds.** R1/R2/R6/R7 are a coherent single redesign (aurora-staged glass cards + real component composition + hero protagonist) — one Band-16 wave with a real gate, NOT a scatter of patches. R3/R9 fold onto existing waves. After the Band-16 wave + the two folds land, a **single π re-capture loop** confirms the gestalt (the page is enrolled under `page-band` per BD.W-GESTALT-ROSTER-GROW; the redesign drifts its surface-hash → G7 auto-revoke forces the re-earn).

**Call: ONE more substantive loop (the Band-16 redesign + the folds), then a confirmatory π pass.** Not "several loops." The defects are concentrated, mutually reinforcing (they all stem from "documentation layout, not bespoke gallery"), and addressable in one coherent design pass. Convergence after that loop is **high-confidence** because the asset and architecture are already right.

---

## 3 · NEW wave — `BD.W-MOTION-GALLERY-REDESIGN` (Band 16, the page-redesign owner)

**Why NEW, not a fold:** Bands 4/5 (`BD.W-DATA-BAND-GLASS`, `BD.W-TOKEN-TOUR-GLASS`, `BD.W-PAGE-OFFTOKEN-SWEEP`, etc.) are scoped to foundations/display/data/forms/containers — the **motion band is unenrolled** in every one. The `motion/curve-gallery` page-redesign (the BULK of the user's asks: per-subsection glass cards, bigger main card, aurora backdrop, component-series composition, real switcher component, hero protagonist) has **no existing BD home**. It is a net-new Band-16 demo-page wave, the motion-band analogue of the Band-4/5 demo-page modernization waves, with a real born-RED gate.

**Goal (zero src paint, demo-private):** Transpose `motion/curve-gallery.vue` from a documentation grid into a bespoke iOS-27 motion gallery. SIX coordinated moves, each gate-clause-backed:

1. **Stage over a COLORFUL contained aurora (R1).** Flip the manifest `motion/curve-gallery` row `background: "grid"` → a shared single `<Aurora>` backdrop via the `<DockStage>` offscreen-paused pattern (PROCEDURAL-SUITE: aurora is offscreen-paused by construction; one-GL-per-route is afforded here — a motion gallery is exactly where the moving field *demonstrates* what the curves drive). The glass cards then actually refract chroma. **Fence:** ONE GL context (the shared DockStage aurora — no per-card field); offscreen-paused; PRM-frozen.
2. **Each sub-section in its OWN glass card + a BIGGER main card (R2).** Wrap the picker+grid in one large `surface="glass"` card that dominates the viewport (the "main card area BIGGER" ask). Put "curve canon", "easing doctrine", "house cores" each in its OWN card. **RETIRE the two raw `<table>`s** for `.glass-quiet` + `paper-grain-overlay` + Fira-Code mono reference cards (the math-paper gold standard — the GLASS+PAPER duality; the doctrine legend becomes an engraved reference card, recessive not the visual climax). Apply the W-CARD-PAD √φ internal padding ladder; drop the ad-hoc `mb-N` (folds R12).
3. **Compose a real switcher component (R6).** Replace the hand-rolled `.curve-chip` rack with `<SegmentedTabs draggable>` (the canonical contextual switcher — the family axis IS the tab use-case) OR `<DockStack mode="facets">` (the dock contextual-layer API the user named). The family switch ANIMATES (morph/spring on `--spring-snappy`), not a CSS color fade. This is the "deftly use a series of glass-ui components" ask.
4. **iOS-27 motion on every card (R4, demo arm).** Auto-play the active family's dots + draw-on the curves (`stroke-dashoffset` ghost-curve idiom) on family-switch (the page is alive on arrival; click becomes replay, not discover). `--scale-hover` (1.08, not 1%) on `--spring-smooth`; `--scale-press` squish on click (§L3 universal); a settle-glow when a spring overshoots-then-rests. A travelling highlight-dot ON the curve synced to the track-dot below (abstract shape + concrete translation at once — the single distinctive move).
5. **Promote a HERO plot per family + faceted color (R7).** ONE `display`-band featured curve per family at `text-display` stroke weight, the rest a supporting grid (the fast.com-peg activation applied to *motion*). Each family carries a faceted accent via the per-instance `--glass-accent` chromatic-rim axis (Springs violet, Bounce warm, Steps cool) — ONE color event per card, distinct per family, still proportioned. This replaces the duplicated title-event with a real protagonist.
6. **Tighten copy (R9, demo arm).** Collapse the triple family-enumeration to one source; drop the all-caps shouting + the implementation-detail leak from rendered blurbs; strip the heavy R7/R8 history comments from the live SFC (coordinate the off-token/copy half with `BD.W-PAGE-OFFTOKEN-SWEEP` — §4).

**The gate (born-RED → GREEN):** a new clause family (extend `proof:storybook-meta` in place — the M-family owns the storybook census; a `M14 — motion-gallery-redesign` clause, NOT a parallel gate):
- **M14-1** the manifest `motion/curve-gallery` resolves an aurora/DockStage backdrop, NOT `grid` (R1) — RED on HEAD (`grid`).
- **M14-2** the page composes `<SegmentedTabs`/`<DockStack` (a real switcher), NOT a hand-rolled `.curve-chip` rack (R6) — RED on HEAD (chip rack).
- **M14-3** the two raw `<table>`s are GONE; the doctrine renders as glass/paper reference cards; each named sub-section is its own card (R2) — RED on HEAD (2 tables, flat regions).
- **M14-4** ONE-GL-per-route held (the M8 detector: exactly one Aurora/DockStage context, offscreen-paused — not N per-card fields).
- **M14-5** a self-test bite: a synthetic page re-introducing the chip rack OR a raw `<table>` OR `background: "grid"` MUST red.
- **Paint π:** `proof:ba-gestalt` `page-band` aggregate verdict on a FRESH capture (the redesign drifts the `page-band` surface-hash → G7 auto-revoke; BD.W-GESTALT-ROSTER-GROW enrolls `demo/stories/motion/curve-gallery.vue` in the `page-band` freshness record's `surface-paths`). Both modes × desktop+mobile on `:5199`: the glass cards refract the aurora chroma, the hero plot reads at the display band, the doctrine reads as a paper reference card, the auto-play dots run on arrival.

**Fences:** zero src paint (demo-private); presets-in-consumers (the `--motion-accent` violet + the `--section-color` faceting are LIBRARY identity, never a demo-minted hue); warm-cream identity; one-GL-per-route (the single DockStage aurora). **Risk: medium-high** — it is a designed redesign, the largest single demo-page move in BD; the π Arm is the binding arbiter.

---

## 4 · FOLDS into existing waves

- **R3 (duplicate title) → `BD.W-PAGE-HEADER-FOLD`.** That wave already owns the page-identity-header fold + the PH3-safe "no body page-title `<h2>` duplicating the chrome `<h1>`" fence (its M9e-4 clause). The `motion/curve-gallery.vue:197-205` in-body `text-display-3` violet masthead is exactly a PH3 double-header violation — DELETE it, let `StoryPage`/`StoryHeader` own the one masthead. **Action: MODIFY** `BD.W-PAGE-HEADER-FOLD` to add `motion/curve-gallery.vue` to its enrolled set as a PH3-cleanup site (it is NOT a `borderLeft`+IconChip page-identity paste, so it does not match the M9e-2 census RE — but it IS a body-level title-duplication the M9e-4 PH3 fence should catch). Add an M9e-4 sub-arm: the motion masthead `<header>` (a body `text-display-*` span restating the chrome title) is DELETED. If a violet title-event is wanted, it belongs as a `heroTitle` color hook in the chassis, not a second `<h1>`-shaped span.
- **R9 (copy/comment hygiene — the off-token + history-comment half) → `BD.W-PAGE-OFFTOKEN-SWEEP`.** That wave (already names `curve-gallery` per the grep) owns the per-page off-token + prose sweep. **Action: AUGMENT** — add the `motion/curve-gallery.vue` triple-enumeration collapse, the all-caps de-shout, the implementation-detail-leak strip, and the heavy R7/R8 history-comment removal from the live SFC. (The *card-glass copy* — the doctrine-table → paper-card rewrite — stays in the Band-16 redesign wave, §3 move 2/6; this fold takes only the off-token/prose hygiene.)

---

## 5 · COMPONENT-side actions (Class B — `src/components/custom/easing/`)

The component report's wave-map stands; reconciled here with no change:

- **R5 (PRM breach in `playTravel()`) → MODIFY `BD.W-KF-OSCILLATOR-CONSUME`.** The ONE real component defect. `useEasingPicker.playTravel()` (`useEasingPicker.ts:239-249`) runs rAF with no PRM branch — read the cached `matchMedia("(prefers-reduced-motion: reduce)")` and snap `progress.value = 1` instead of scheduling. **Land it PRE-TRIGGER** as a pure a11y correction (it is not a kf consume — it ships even before the Oscillator republish fires; the wave is the only authorized `playTravel`/`progress` seam edit). Extend `proof:easing-primitive` with a PRM-snap assert. If the orchestrator prefers it standalone, it is a thin a11y wave (no new gate). **This is the only Class-B item that should not wait on the kf republish.**
- **R4-component / R8 (no looping idle-breath, no handle-press spring, hardcoded `glass-card`) → AUGMENT `BD.W-KF-OSCILLATOR-CONSUME`.** The looping playback register is the named-successor the Oscillator drives (republish-gated — STAYS BOOKED). When it lands it MUST acquire offscreen-pause (it becomes a continuous loop — the §fence constraint). Book handle-press to the W-PRESS-UNIFY family (the handles are the obvious 3rd consumer). The `surface`/`tier`-prop lift (R8 — the structural blocker letting the demo request `field`/`deep`) is adjacent to `BD.W-TOKEN-TOUR-GLASS` / the Band-16 redesign; lift the hardcoded `glass-card` to a prop so move-1 (§3) can stage the picker over the aurora.
- **R10 (240-sample stepPathD recompute) → MODIFY (opportunistic).** Draw the staircase as ≤12 explicit riser/tread segments instead of 240 sampled points; ride the R5 touch. Not urgent (no CLS).
- **R11 (split `import { ref }`) → MODIFY (trivial).** Fold into the R5 touch.

**No PRUNE.** The component report is explicit: no dead-path, no dual-path, no legacy alias, no workaround. The boundary-law architecture is clean.

---

## 6 · Tranche-action summary (the binding ledger)

| Defect | Action | Wave |
|--------|--------|------|
| R1 aurora backdrop | **NEW** | `BD.W-MOTION-GALLERY-REDESIGN` (Band 16) |
| R2 per-subsection glass cards + bigger main + paper doctrine | **NEW** | `BD.W-MOTION-GALLERY-REDESIGN` |
| R6 real switcher component | **NEW** | `BD.W-MOTION-GALLERY-REDESIGN` |
| R7 hero protagonist + faceted accent | **NEW** | `BD.W-MOTION-GALLERY-REDESIGN` |
| R4 (demo) iOS-27 card motion | **NEW** | `BD.W-MOTION-GALLERY-REDESIGN` |
| R12 internal √φ rhythm | **FOLD** (into R2) | `BD.W-MOTION-GALLERY-REDESIGN` |
| R3 duplicate title | **MODIFY/FOLD** | `BD.W-PAGE-HEADER-FOLD` (PH3 cleanup site) |
| R9 copy/comment hygiene | **AUGMENT** | `BD.W-PAGE-OFFTOKEN-SWEEP` |
| R5 PRM breach | **MODIFY** | `BD.W-KF-OSCILLATOR-CONSUME` (pre-trigger a11y) |
| R4 (component) loop/handle-press | **AUGMENT** | `BD.W-KF-OSCILLATOR-CONSUME` + W-PRESS-UNIFY |
| R8 surface/tier prop lift | **AUGMENT** | `BD.W-KF-OSCILLATOR-CONSUME` / Band-16 adjacency |
| R10 stepPathD recompute | **MODIFY** (opportunistic) | rider on R5 |
| R11 split import | **MODIFY** (trivial) | rider on R5 |
| — path-label standardization | **none** | already PASS |

**No PRUNE rows.** The page's superfluity is COPY (R9, folded), not dead code.

---

## 6-LINE VERDICT

1. **Top-3 changes:** (a) stage the glass cards over a COLORFUL contained DockStage aurora so the six-layer composite finally refracts — the manifest `grid` wash is the headline failure *by decision*; (b) per-subsection glass cards + a BIGGER main editor + RETIRE the two raw `<table>`s for glass/paper doctrine reference cards (the GLASS+PAPER duality); (c) iOS-27 motion on every card — auto-play dots + draw-on curves on family-switch, `--scale-hover` 1.08 + `--scale-press` squish, a hero protagonist plot per family with faceted `--glass-accent`.
2. **NEW:** `BD.W-MOTION-GALLERY-REDESIGN` (Band 16) — owns R1/R2/R6/R7/R4-demo/R12, six gate-clause-backed moves (aurora-stage · per-section cards · real `<SegmentedTabs>`/`<DockStack>` switcher · card motion · hero+facet · copy), `proof:storybook-meta` M14 + `proof:ba-gestalt` `page-band` π. The motion band has NO Band-4/5 home — this is the net-new owner.
3. **FOLD:** R3 (duplicate title) → `BD.W-PAGE-HEADER-FOLD` as a PH3-cleanup site (delete the in-body violet masthead).
4. **AUGMENT:** R9 (copy/comment hygiene) → `BD.W-PAGE-OFFTOKEN-SWEEP`; R4-component loop + R8 surface-prop lift → `BD.W-KF-OSCILLATOR-CONSUME`.
5. **MODIFY:** R5 (the ONE real component defect — `playTravel` PRM breach) → `BD.W-KF-OSCILLATOR-CONSUME`, landed PRE-TRIGGER as pure a11y; R10/R11 opportunistic riders. **No PRUNE** (the architecture is clean; the superfluity is copy).
6. **Convergence:** ONE substantive loop (the Band-16 redesign + the 3 folds) then a confirmatory π pass — NOT several loops. The asset (the value.js-twin violet curve) and architecture (boundary-law no-fork) are already right; this is a transposition from spec-sheet to bespoke gallery, not a rebuild. High-confidence convergence after the loop.
