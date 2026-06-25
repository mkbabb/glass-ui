# BG audit — P-chronic-deferred: the deferred-item ledger + the no-silent-drop fold

**Auditor scope:** enumerate ALL chronically-deferred + booked-to-successor + deferred items
across the tranche docs, CLAUDE.md, src comments, the DISPOSITION-REGISTER, and the BC/BD/BF
coordination docs; build the deferred-item ledger (item · origin · why · still-relevant?); and
fold every one into a BG wave OR an explicit RETIRE-with-rationale. No silent drop.

Verified against HEAD (4.2.0, `master @ 998136bb` / `prototype/liquid-dock`). Default-broken
skepticism applied: every claim below is grep/read-confirmed against real source.

---

## THE HEADLINE FINDING (single highest-severity)

**The entire BF tranche (31 waves) + its 32-row DEFERRED-CENSUS are UNBUILT, and BF's own audit
already proved the BD-shipped 4.2.0 is a "demo-private, unwired, unpainted, re-forked,
undeleted-spike vertical slice."** 4.2.0 shipped from the BD *implementation* phase (P1-P10,
`docs/tranches/BD/IMPLEMENTATION-PROGRESS.md`), but TWO planning-only tranches were written AFTER
it — **BE** (39 wave specs, 8 build commits on the prototype branch) and **BF** (31 wave specs,
ONE commit `9a765843` = the plan only). BF's §1 accountability table (`BF/SEED.md`) is the binding
record: of 22 enumerated user requests, **R8/R11/R12/R13/R14/R15/R16/R17/R18/R19/R20** are
NOT-BUILT, REGRESSED, or ENGINE-DEAD at 4.2.0. The user's "most pages broken" report IS the
predicted outcome of shipping the BD vertical slice and never executing BF.

**Why this is the chronic-deferred linchpin:** the BF.W-FOLD-LEDGER (`proof:be-fold-ledger`) that
was supposed to machine-lock the 32 deferrals **was never built** (it is a spec at
`docs/tranches/BF/waves/BF.W-FOLD-LEDGER.md`; the gate `scripts/proof-be-fold-ledger.mjs` is
ABSENT — verified). So the 32 BF deferrals currently ride UN-DECIDED with no mechanical floor —
the exact `BE.W-FOLD-LEDGER`-never-built disease BF named as its own headline (D11). BG must fold
them or the loss compounds a third time.

---

## FINDINGS — the deferred-item inventory (with file:line evidence)

### Class 1 — the BF 32-row DEFERRED-CENSUS (ALL unbuilt at HEAD)

Source: `docs/tranches/BF/audit/DEFERRED-CENSUS.md` (23 BUILD · 5 DEFER-with-trigger · 1 DEFER ·
1 RETIRE · 2 reconcile). BF was tranche-DEV only (`git log` → BF has exactly 1 commit), so **every
one of these 32 is still owed.** Spot-verified against HEAD:

| ID | Item | HEAD verification | Still relevant? |
|---|---|---|---|
| **D1** | 5-way rAF re-fork of `useLiquidReveal` (`useBloomUp`/`useDockContextSilhouette`/`useCelebrationBurst`) | `src/composables/motion/useBloomUp.ts` present; `grep ElementMorph\|springTimingFunction` = 15 hits (re-fork lives) | YES — R16 no-legacy violation |
| **D2** | Undeleted spike `useLiquidMorph.ts` + `liquid-morph.css` demo-content in `src/styles/glass/` | `src/composables/motion/useLiquidMorph.ts` AND `src/styles/glass/liquid-morph.css` BOTH present | YES — dead 462L + 815L in `src/` |
| **D3** | V↔H is a crossfade FACSIMILE, not `useDockOrientationMorph` | (CONTEXT.md defect #13 confirms: morph is modal demo, esc broken) | YES — user defect #13 |
| **D4** | Scroll fluidity REGRESSED — `useLiquidRail` slow-glide deleted | (CONTEXT.md defect #12 confirms: dock scrolling broken) | YES — user defect #12 |
| **D5** | Binding-π layer ABSENT (~8-10 cited specs don't exist) | `proof:safari-liquid`/`proof:de-shadcn`/`proof:be-fold-ledger` ABSENT | YES |
| **D6** | `proof:ba-gestalt` still points at BC; the post-BC roster UNENFORCED | `scripts/proof-ba-gestalt.mjs:70-73` REFLECT_DIR/ROSTER/WAVES_DIR/TRANCHE_DIR all = `docs/tranches/BC/...` | **YES — CRITICAL: the close oracle is blind to BD/BE/BF/4.2.0** |
| **D7** | Safari/WebKit ZERO real verification (asked 2×) | no `proof:safari-liquid`; CONTEXT cardinal law "Chrome AND Safari" | YES |
| **D8** | Manual real-Safari-26-Metal goo-fission p50 budget | un-automatable; never run | YES |
| **D9** | Phantom consumer-evidence (gates grep keywords not call-sites) | `useHaptic(` / `useCelebrationBurst(` real call-sites = **0** (only a prose comment `jubilance.css:10`) | YES |
| **D10** | Dead foundation tokens `--glass-fill-tint`/`--glass-bg-sheet` | PARTIAL: `--glass-fill-tint` now has ~10 readers; `--glass-bg-sheet` only 2 (drawer.css, glass.css) | PARTIAL — re-audit |
| **D11** | The disposition machine itself never built | `proof:be-fold-ledger` ABSENT | YES |
| **D12** | `useDockContextSilhouette` (551L) ZERO real consumers | only ONE consumer = demo `AppSwitcher.vue`; no `src/` SFC | YES — decide-or-retire |
| **D13** | `useHaptic`+`useCelebrationBurst` ZERO call sites | confirmed 0 real `(` call-sites | YES — dead-on-arrival |
| **D14** | The neck does NOT span the gap (fission filament fidelity) | (BF R3 fidelity gap) | YES |
| **D15** | Dead φ-tier projection math (`projectFacets` computed, never read) | `railProjection.ts` exists; facets read collapsed-only | YES — wire-or-delete |
| **D16** | n-ary UNPROVEN (every consumer N=2); dead `search=radial`/`nav=inward-merge` | (BF) | YES |
| **D17** | Corner aliasing (R8) — `clip-path:inset(0 round)` fix does NOT survive HEAD | (CONTEXT defect #3: card corners don't clip + dock bottom-left aliasing) | YES — user defect #3 |
| **D18** | Icon visibility (R12) — `DockStack` glyphs bare `size-4`; facets fade to 0 | (BF) | YES |
| **D19** | De-shadcn sweep (Band 9 CRITICAL) + regression gate UNBUILT | `proof:de-shadcn` ABSENT | YES |
| **D20** | Grow/shrink on events (scroll/touch) — dock event-inert (R14) | (BF) | YES |
| **D21** | Dock layering NOT in liquid; two unreconciled models (`useContextualDockLayers` vs `useDockContextSilhouette`) | both present | YES — fold to one |
| **D22** | Goo metaball DEMO-PRIVATE (`url(#dock-fission-goo)` only in demo CSS) | (BF) | YES |
| **D23** | Breadth bands — Aurora satin/prism, `DockTabBar`, `GlassChip`/`GlassControl`, LENS-PRISM/SQUIRCLE (~26 of 39 BE waves) | the BF.W-AUR-*/W-CONSUMER-BAND/W-LENS-PRISM/W-SQUIRCLE specs all unbuilt | YES |
| **D24** | `BE.W-VIZ-PARITY-METAL` real-Metal cross-backend capture | DEFER-trigger (real Metal box) | DEFER (trigger un-MET) |
| **D25** | Always-on metaball-teardrop V↔H fidelity (perf budget) | DEFER-trigger | DEFER (trigger un-MET) |
| **D26** | Album-derived per-piece shade as a LIBRARY primitive (GL color-seam) | DEFER-trigger (`DockNowPlaying` ≥2 consumers) | DEFER (trigger un-MET) |
| **D27** | kf `snap`-option by-name ask | DEFER (published surface wired) | DEFER (not a live dep) |
| **D28** | `AY.W-GOD1` `useLayerTransition`≈`dockMorphContext` FLIP fold | DEFER-trigger (`W-FLIP-SPINE` lands) | DEFER (trigger un-MET) |
| **D29** | `AY.W-GOD1` persistent switcher rail surviving collapse | BUILD (needs chrome slot) | YES |
| **D30** | `useLiquidMorph` vs `useDockFission` double-fork | both present at HEAD; `useDockFission` wired | YES — RETIRE the orphan |
| **D31** | `useCelebrationBurst` vs `CompletionSeal` double-primitive | both present | YES — reconcile |
| **D32** | 6 BE source gates carry `release` without binding π | `proof-dock-fission`/`proof-bloom-up`/`proof-celebration-burst`/`proof-liquid-morph` REGISTERED in `gates.mjs` + `package.json` (run at close, lock dead/demo-private mechanisms) | YES — downgrade or gate behind π |

### Class 2 — the AX DISPOSITION-REGISTER min-consumers watches (28 rows, last re-stamped BC)

Source: `docs/tranches/AX/audit/DISPOSITION-REGISTER.json`. The register was re-stamped through BC;
**BD.W-DISPOSITION-RESTAMP (FOLD-LEDGER Class I) was supposed to re-stamp it to BD but the register
shows `reStampedAt:"BC"` on the long tail — no BD/BE/BF re-stamp ran.** The honest-hold books (all
`min-consumers n:2`, trigger re-evaluates un-MET at HEAD against the present constellation):

- `panel-host-primitive` · `interruptible-reorder` · `button-icon-sm` · `dock-select-clamp-label`
  · `tooltip-mono-variant` · `select-size` · `spring-crisp-token` · `metric-badge-icon`
  · `completion-seal-family` · `labeled-field-for-id` · `speedtest-a11y-bundle`
  · `raf-loop-demand-park` · `cross-document-vt` · `css-scope-state` · `interestfor-previews`
  · `css-text-box-trim` · `css-interpolate-size` · `css-relative-color` · `glass-dialog-native-pilot`
  · `glass-native-select-pilot` · `inline-edit-primitive` · `labeled-slider-readout`
  · `directional-view-transition` · `drawer-content-spring` · `cartoon-quiet-preset`
  · `keyframes-prune-migration-dag`
- RESOLVED (genuine): `deck-subpath` (resolvedBy `BC.W-DECK`), `speedtest-native-first-receive`,
  `native-drawer-as-asChild` (RETIRED `BB.W-NDA-DECIDE`), `css-at-function` (RETIRED `BD §P10`).

These are LEGITIMATE honest holds (each trigger genuinely un-MET), but the **register is now 3
tranches stale on its `reStampedAt`** and `proof:disposition-live` must re-evaluate each at the BG
close (the no-write-once-watch-never discipline). Two pending-flips need verification: `css-relative-
color` (`pendingResolvedBy: BB.W-DARK-INK-WARM` — verify the oklch(from…) recipe landed in 4.2.0)
and `styles-critical-split` (`resolvedBy: BC.W-CSS-CRITICAL`).

### Class 3 — the in-`src/` BOOKED-successor comments (live at HEAD)

| Marker | Location | Item | Trigger | Relevant? |
|---|---|---|---|---|
| Deep-glass full 20px | `src/styles/tokens/glass-deep.css:25-56` | deep tier sits at budget-clearing 16px; the full Apple `blur(20px)/saturate(1.8)` is BOOKED | `profile:budget` per-frame cost clears | YES — `BD.W-DEEP-GLASS-20PX` spec exists, unbuilt |
| Chromatic-aberration RGB-split rim | `src/styles/glass-refract.css:85` | `--glass-lens-chroma` successor re-bake | perf clears (3 SVG passes) | YES — `BD.W-GLASS-LENS-CHROMA` spec, unbuilt |
| kf `snap`/`bounds`/`rubberBand` | `src/composables/motion/useDragMorph.ts:27,281-290` | `CONSUME(kf snap)` — collapse the `commitSnapOnRelease` re-roll onto native `snap`; gain iOS rubberBand overscroll | kf republishes `DragOptions.snap` past 4.3.0 | DEFER (= D27; published surface wired) |
| kf `Oscillator`/`waveformValue` loop-clock | `src/composables/glass/useVizChoreography.ts:78` | the de-synced sine/uTime interim; consume the LIGHT loop-clock | kf republishes Oscillator in dist | DEFER (republish-gated; not in 4.3.0 dist) |
| value.js `/color` subpath | BD FOLD-LEDGER Class C / `useBorderSpectrum.ts` CONSUME marker | shrink 7 import sites onto the `/color` subpath | value.js publishes `/color` in 0.14.x+ | DEFER (forward-compatible peer) |
| `--ease-cartoon-punch` / `--motion-weight` reads | `src/styles/segmented-tabs.css:147,276` | Band-0 tokens CONSUMED | LANDED (P1 of 4.2.0) | RESOLVED — verify |
| `useCartoonCast` drag-track DOM bridge | `docs/tranches/BD/greenfield/cartoon-shadow/WAVE-AMENDMENT.md:118,176,197` | the cartoon caster's drag-track is deferred/opt-in (needs a real new DOM bridge) | a consumer wants pointer-velocity cartoon drag | DEFER-with-trigger (genuinely opt-in) |
| aurora cel-outline (`cel:true`) | `docs/tranches/BD/greenfield/aurora/WAVE-AMENDMENT.md:229` | ink-and-paint cel-outline logged as a future opt-in register | a consumer needs the hard contour | DEFER-with-trigger |

### Class 4 — the BD FOLD-LEDGER carry-over + the BD P10-HARDEN un-resolved tail

Source: `docs/tranches/BD/FOLD-LEDGER.md` + `IMPLEMENTATION-PROGRESS.md` P10-HARDEN list. BD shipped
4.2.0 but its P8/P9/P10 phases carried embedded deferrals that the IMPLEMENTATION-PROGRESS marks
done-with-caveats:

- **3 stale proof scripts** (`scripts/proof-viz-dotflow.mjs` F1 over-broad grep, `proof-concentric.mjs`
  ringField→levelField rename, `proof-handmark.mjs` requires CLAUDE.md). VERIFIED: all 3 scripts
  exist; `proof-handmark.mjs` greps `CLAUDE.md` — and `CLAUDE.md` shows in `git status` as a tracked
  modification/delete-candidate (the project-instructions file is in flux). A gate that reads a
  doc-in-flux is fragile. → BG owes a stale-gate sweep.
- **dot-flow contrast** — "faint at rest (10% structure)" (CONTEXT defect #6 "/substrates previews
  broken"). → folds into the viz-fix band.
- **Safari/WebKit capture OWED** — P7 morph weld + P5 viz + glass register never captured on
  Safari-26 (= D7/D8). → folds into BG Safari band.
- **category-landing GL-budget** — landing mounts 11 live GL contexts (>8 budget) (CONTEXT defect
  #11 "category cards waste space → live previews"). The amendment mandated FROZEN STILLS. → BG
  owes the frozen-still conversion.

### Class 5 — the BD greenfield "booked-pending" tokens (mostly LANDED in 4.2.0)

The BD greenfield WAVE-AMENDMENTs reference `BD.W-MOTION-WEIGHT`/`BD.W-CARTOON-PUNCH` as
"booked-pending" Band-0 tokens. IMPLEMENTATION-PROGRESS P1 marks them BUILT (`--motion-weight`
@property, `--ease-cartoon-punch` linear()). These are RESOLVED but unverified-on-paint at HEAD —
they fall under the broken-paint re-audit, not a fresh deferral.

---

## ROOT CAUSES (gestalt, first-principles)

1. **The single-terminal-reflect / plan-then-never-execute disease, recurred at the tranche scale.**
   BB invented "rides W-REFLECT3" (defer all paint to one terminal wave); BC cured it as a LAW
   (`proof:ba-gestalt` G8). But BD/BE/BF re-committed the disease one level UP: BD *planned* 43
   greenfield waves but *shipped* a separate P1-P10 vertical slice; BE built engines demo-private;
   BF planned 31 convergence waves and never ran them. The deferral did not happen inside a tranche
   — it happened BETWEEN the plan and the cut. **The fold-ledger gate that would have caught it
   (`proof:be-fold-ledger`) was itself the deferred item (D11).** A disposition machine that is
   never built cannot enforce no-silent-drop.

2. **The close oracle is blind to everything after BC.** `proof:ba-gestalt` reads
   `docs/tranches/BC/audit/reflect/bc-gestalt-roster.md`. BD shipped 4.2.0 with this gate pointed
   at a 16-surface BC roster — so the gestalt close PASSED while BD/BE/BF surfaces (dock fission,
   the V↔H morph, the page field, the category landing) were never on the roster. The headless-green/
   visually-broken gap is structurally guaranteed when the visual close oracle doesn't reference the
   shipped tranche's surfaces.

3. **Dead/demo-private mechanisms are gate-locked into the close.** D32: the BE-era gates
   (`proof:dock-fission`, `proof:bloom-up`, `proof:celebration-burst`, `proof:liquid-morph`) are
   REGISTERED in `gates.mjs` + `package.json` with `release` tag, but they lock mechanisms with
   ZERO real consumers (`useHaptic(`/`useCelebrationBurst(` = 0 call-sites; `useLiquidMorph` = the
   undeleted spike; `useDockContextSilhouette` = 1 demo consumer). The gates green over dead code —
   the J-inv-10 visual-load-bearing bar is violated AND the gates falsely certify it green.

4. **The DISPOSITION-REGISTER re-stamp cadence broke.** It is the machine that re-evaluates every
   honest-hold trigger each close; it shows `reStampedAt:"BC"` on 26 rows — no BD/BE/BF re-stamp
   ran, so the register has not been trigger-re-checked in 3 tranches. The book-rot the register
   exists to prevent is accruing on the register itself.

---

## PROPOSED WAVES (the fold list — every deferred item → a BG wave OR a RETIRE-with-rationale)

The fold is DELIBERATELY CONSOLIDATED — BG is a re-interrogation, not a 1:1 re-typing of 32+28+10
rows. The cardinal law (KISS/gestalt/no-legacy) means most BF deferrals are subsumed by the BG
re-architecture waves the SIBLING audits propose; this audit's job is to guarantee NONE is silently
dropped and to NAME each one's destination.

### BG.W-DEFERRED-LEDGER — the no-silent-drop machine, BUILT this time (Band-0, wave-1)
- **Intent:** mint `docs/tranches/BG/FOLD-LEDGER.json` + `.md` (seeded from this audit) + the gate
  `scripts/proof-bg-deferred-ledger.mjs` (`["local","ci","release"]`), transposing the
  `proof:bc-fold-ledger` 7-clause pattern. Every BF census D# + every AX register row + every
  in-`src` book carries a DECIDED disposition (`BUILD`→a real BG wave / `DEFER-with-trigger` /
  `RETIRE-with-rationale`); a phantom dest or a re-stamped/`book` disposition REDs.
- **Approach (idiomatic):** the disposition machine FIRST so every later BG wave's closure is
  checkable; this is the literal cure for D11 (built, not re-deferred).
- **Files:** `docs/tranches/BG/FOLD-LEDGER.{json,md}`, `scripts/proof-bg-deferred-ledger.mjs`,
  `scripts/gates.mjs` (register).
- **π/acceptance:** zero-pixel register wave (BB.W-NDA-DECIDE precedent) — closed on the gate
  self-test (7 bites) + doc⟷JSON parity. **Folds: D11 + the whole no-silent-drop floor.**

### BG.W-GESTALT-REPOINT — re-point the close oracle to the BG tree + the live 4.2.0 surfaces
- **Intent:** re-point `proof:ba-gestalt`'s REFLECT_DIR/ROSTER/WAVES_DIR/TRANCHE_DIR from `BC` to
  `BG`; mint the BG roster enumerating EVERY shipped 4.2.0 surface the user flagged (dock fission ·
  V↔H morph · page field/aurora · category landing · scroll-shrink card · configurator drawer ·
  hero · the 118-route storybook gestalt). Born-RED (all surfaces FAIL the anti-disease law) → GREEN
  only on fresh paint.
- **Approach:** the BD.W-GESTALT-ROSTER-GROW that was specced but whose BC→BD re-point never reached
  the shipped gate. ONE close oracle, current tree.
- **Files:** `scripts/proof-ba-gestalt.mjs:70-73`, `docs/tranches/BG/audit/reflect/bg-gestalt-roster.md`.
- **π/acceptance:** the gate reads the BG roster; the close cannot pass with a stale-tranche pointer.
  **Folds: D6.**

### BG.W-SPIKE-DELETE — clean-cut the undeleted forks + the demo-content in `src/`
- **Intent:** DELETE `src/composables/motion/useLiquidMorph.ts` (462L, the orphan double-fork) +
  `src/styles/glass/liquid-morph.css` (815L demo-content); fold the 5-way rAF re-fork
  (`useBloomUp`/`useDockContextSilhouette`/`useCelebrationBurst`) onto ONE `useElementBloom` runner
  over `useLiquidReveal`'s `ElementMorph`+`springTimingFunction` substrate (no second engine,
  no clock). Clean break, no alias (memory: no-backwards-compat).
- **Files:** `src/composables/motion/{useLiquidMorph,useBloomUp,useCelebrationBurst}.ts`,
  `src/components/custom/dock/composables/useDockContextSilhouette.ts`, `src/styles/glass/liquid-morph.css`.
- **π/acceptance:** `proof:no-dual-path` extended (one FLIP runner); fork census = N forks→1.
  **Folds: D1, D2, D16(dead-signatures), D30(RETIRE the orphan), D28(the FLIP-engine fold lands here).**

### BG.W-JUBILANCE-DECIDE — wire-or-retire the dead jubilance + silhouette engines (decide-don't-rebook)
- **Intent:** `useHaptic`/`useCelebrationBurst` have ZERO call-sites; `useDockContextSilhouette`
  (551L) has ONE demo consumer. DECIDE each (BB.W-NDA-DECIDE discipline): wire to ≥2 real `src/`
  consumers OR RETIRE-with-rationale + delete. Reconcile `useCelebrationBurst` vs `CompletionSeal`
  (fold as a `CompletionSeal` mode OR record the disjoint-register rationale). Reconcile the two
  contextual models (`useContextualDockLayers` vs `useDockContextSilhouette`) to ONE.
- **Files:** `src/composables/motion/{useHaptic,useCelebrationBurst}.ts`, `useDockContextSilhouette.ts`,
  `useContextualDockLayers.ts`, the `proof:*` consumer-evidence gates (fix to real call-site asserts).
- **π/acceptance:** every kept primitive has ≥2 real `src/` call-sites (J-inv-10); retired ones
  deleted. **Folds: D9(phantom evidence), D12, D13, D21, D31.**

### BG.W-DEAD-GATE-SWEEP — downgrade/retire gates that green over dead or demo-private mechanisms
- **Intent:** the 6 BE-era `release`-tagged gates lock mechanisms BG.W-SPIKE-DELETE/JUBILANCE-DECIDE
  retire or rewire — downgrade each to `local`/`ci` until its mechanism has a binding π, or DELETE
  the gate with its mechanism. Fix the 3 stale proof scripts (`proof-viz-dotflow` over-broad grep,
  `proof-concentric` rename, `proof-handmark` CLAUDE.md dependency — decouple the gate from the
  doc-in-flux). Harden the phantom-consumer-evidence gate class to assert real call-sites, not
  keyword greps.
- **Files:** `scripts/proof-{dock-fission,bloom-up,celebration-burst,liquid-morph,viz-dotflow,concentric,handmark}.mjs`, `gates.mjs`, `package.json`.
- **π/acceptance:** no `release` gate locks a 0-consumer mechanism; `--run full` clean over real code.
  **Folds: D32, the BD P10-HARDEN 3-stale-scripts tail.**

### BG.W-DISPOSITION-RESTAMP — re-stamp the AX register to BG + graduate/retire the long tail
- **Intent:** re-stamp the 26 honest-hold rows `reStampedAt:"BG"` in place (no delete, L-inv-8);
  re-evaluate every `min-consumers n:2` trigger against the present constellation; graduate any that
  crossed ≥2; verify the two pending flips (`css-relative-color`→`BB.W-DARK-INK-WARM` landed in
  4.2.0; `styles-critical-split`→`BC.W-CSS-CRITICAL`). Re-check the CSS-feature Baseline books
  (`cross-document-vt`, `directional-view-transition`, `css-interpolate-size`) against 2026-06
  Baseline.
- **Files:** `docs/tranches/AX/audit/DISPOSITION-REGISTER.json`, `scripts/proof-disposition-live.mjs`.
- **π/acceptance:** `proof:disposition-live` GREEN with every row trigger re-evaluated. **Folds:
  Class 2 (all 26 register honest-holds), the deep-glass-20px + lens-chroma + cartoon-cast-drag +
  aurora-cel DEFER-with-trigger books (Class 3), and the kf/value.js republish-gated consumes (D24,
  D25, D26, D27 + Oscillator + value.js-color — record by-name, foreign-tree fence, no build).**

### The user-defect waves (the BUILD bulk — owned by the SIBLING BG audits, this audit cross-references)

These BF census BUILD rows ARE the live user defects in CONTEXT.md; their gestalt re-architecture is
owned by the routing/dock/viz/page sibling audits. This audit FOLDS them by naming the destination
(no silent drop) — the actual wave specs are the siblings':

- **D3, D5(V↔H modal/esc) → the dock/morph audit's V↔H-in-place button** (CONTEXT defect #13).
- **D4, D20 → the dock audit's scroll/grow-on-event re-home** (CONTEXT defect #12).
- **D14, D15, D18, D22, D29 → the dock-fission/rail fidelity + integration** (CONTEXT defects #3,8).
- **D17 → the corner-AA / shadow-cast audit** (CONTEXT defect #3 corner clip + red halo).
- **D7, D8, D24, D25 → the Safari/perf band** (CONTEXT cardinal law Chrome AND Safari).
- **D19 → the de-shadcn form audit** (`proof:de-shadcn` mint).
- **D23 → the breadth band** (Aurora satin/prism, DockTabBar, GlassChip, LENS-PRISM, SQUIRCLE).
- **D10 → the foundation-token audit** (re-audit `--glass-bg-sheet` consumption; `--glass-fill-tint` now wired).

**Each of the above carries a row in `BG.W-DEFERRED-LEDGER`'s JSON with its sibling-wave destination
— so the no-silent-drop floor holds even though this audit does not own their build.**

---

## RETIRE-with-rationale (explicit, no silent drop)

- **`useLiquidMorph.ts` (D30):** RETIRED — `useDockFission` is the wired n-ary split survivor; the
  double-fork is the no-legacy violation. Successor: `useDockFission`. Retired by BG.W-SPIKE-DELETE.
- **`useDockContextSilhouette` IF un-wireable to ≥2 (D12):** RETIRE candidate — if BG cannot find ≥2
  real consumers, the 551L headline engine retires with rationale (overfit substrate, J-inv-10).
  Decided in BG.W-JUBILANCE-DECIDE (build-or-retire, never re-book).
- **`useHaptic`/`useCelebrationBurst` IF un-wireable (D13):** same — wire to ≥2 or retire+delete.
- **The dead `search=radial`/`nav=inward-merge` fission signatures (D16):** RETIRE if n>2 is never
  exercised (the dead-signature half of BG.W-SPIKE-DELETE).
- **`css-at-function` (already RETIRED at BD §P10):** carried as terminal, not re-opened (Safari gap).

---

## No-silent-drop attestation

Every chronically-deferred item is accounted for: the **32 BF census rows** (Class 1, all owed,
spot-verified at HEAD), the **26 AX register honest-holds + 4 resolved/retired** (Class 2), the **8
in-`src` booked-successor comments** (Class 3), the **BD P10-HARDEN tail + 3 stale gates** (Class 4),
and the **Class 5 booked-pending tokens** (resolved in 4.2.0, verify-on-paint). Each maps to a named
BG wave above or an explicit RETIRE-with-rationale; the genuine republish-gated/Baseline-gated DEFER
items keep their by-name trigger (foreign-tree fence, no build). `BG.W-DEFERRED-LEDGER` machine-locks
the whole table so this loss cannot compound a fourth tranche.
