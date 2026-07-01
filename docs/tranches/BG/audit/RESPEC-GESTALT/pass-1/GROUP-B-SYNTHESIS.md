# GROUP B SYNTHESIS — Shipped-work quality (RESPEC-GESTALT pass-1)

**Collector:** Group B (lenses B1–B8). **Date:** 2026-07-01 · branch `tranche/BG` · HEAD `976dc890`.
**Inputs:** B1 gestalt-cohesion · B2 over-contrivance · B3 encapsulation · B4 css-elegance ·
B5 missed-obvious · B6 liquid-weight · B7 src-architecture · B8 demo-architecture.
Every headline claim below was re-verified on disk by the collector (checks appended); `file:line` cited.

---

## 1. GROUP VERDICT — against the user's five critique axes

**The last tranche(s) built the cohesion cure and shipped it un-adopted; then grew a verification machine
to guard the un-adopted cure instead of delivering the product it promised.** This one sentence unifies all
eight lenses and maps cleanly onto the user's five axes:

- **Gestalt cohesion (axis 2) — FAIL, structurally.** The BD/BG cohesion cures were *designed and built but
  never wired*: `DemoFrame` (the "conformity by construction" page-anatomy chassis) renders on **0** story
  pages (verified: only `StoryPage.vue` + the chassis files reference it), the "unified header that kills the
  double-header by construction" is contradicted by a **36×** verbatim inline-`<header>` copy-paste (B1 F3),
  `VizStudio` ("the ONE shape every viz studio composes") is adopted by **1 of 6** candidate pages (B8 F2),
  and `StorySectionHeader` ("the 42nd-paste preventer") has **0** consumers for a pattern a prior wave already
  eliminated (B8 F3). The cures are ceremony, not cohesion. Compounding it, the ONE new field the cure DID
  wire — the demo-staging aurora — defaults to **cold blue** (`OPENAI_SKY`, hue 240) inside a warm-amber /
  luminous-dark product (B1 F1, verified `DockStage.vue:38`).
- **Over-contrivance (axis 3) — FAIL, hard.** 360 `proof-*.mjs` gates / 127K LOC growing ~1-per-wave (B2 F1);
  39-per-family dock gate explosion (B2 F2); ~25 closed-tranche/register-lock ceremony gates that lock
  nothing a user sees (B2 F3); the `≥2-consumer` bar structurally gamed through a `consumer-evidence/` doc
  mechanism where at least one doc **lies** (`use-haptic.md` claims two couplings that return **empty** grep;
  verified) (B2 F4/F5); orphan primitives (`useCelebrationBurst` 0/0, `useVizChoreography` unimported,
  `useHaptic` 0 call-sites) (B2 F6, B7 F2); zero-opt-in axes carrying full token+@property+gate+spec ceremony
  (B2 F7).
- **Poor encapsulation (axis 4) — FAIL at the identity layer.** The prop-shape grammar is fragmented where it
  matters most: `Card.tier` and `GlassPanel.tier` are a **homonym** (visual-rung vs render-backend, verified),
  the "one surface axis, factored once" claim is contradicted by **4 private unions + a boolean homonym**
  (B3 F2), density is **3** incompatible unions, size is **5** shapes (B3 F3/F4). The 95-entry export surface
  is **un-dogfooded** — the 156-page demo imports **0** times from the published subpaths, reaching raw
  `@glass/src` internals (B3 F5). The press abstraction is a **gate-induced dual path** (B7 F3), pointer
  physics is done **5 ways** (B7 F4).
- **Lacking elegance (axis 5) — FAIL.** The glass CSS is accreted epicycles: the oklab tint recipe hand-spelled
  **9×** with the "substitution-vs-inheritance trap" documented re-biting **4 times** (B4 F1), **three**
  overlapping "the ONE glass register" primitives whose consumer sets overlap so a single component wears two
  or three at once (B4 F2), **39** dead/ceremony tokens (B4 F3), and a cascade resolved by **fragile source
  order** with 40 "must-import-after" hazard comments (B4 F5). The no-god-module ratchet is a **treadmill** —
  RED at HEAD, regrown to 18 files >500 twice (B7 F1, verified `status: FAIL`).
- **Missing obvious (axis 1) — FAIL, two live defects a designer sees instantly.** The paper-texture system is
  **bifurcated** — the redesign's own diagnosed-broken self-cancelling `feTurbulence` cloud still ships beside
  its replacement and powers the dock grain + glass-hover grain (B5 F1, verified 3 live `var(--paper-clean-
  texture)` consumers). The disclosure chevron paints in **three** motion registers, one of them **FLAT**
  (`duration-200` bezier snap, no spring), and the gate authored to catch it is blind to Tailwind-utility
  transitions (B6 F1/F2).

**The single defensible strength to protect** (recorded so a consolidation pass does not "fix" it): the
token-first retint discipline is genuine — `:deep()` down to **one** real reach, **176** `var(--token,
fallback)` seams (B3 positive controls). The flagship motion registers (reveal, pager-worm, route-enter) are
genuinely liquid and shipped (B6 verdict). The disease is not the primitives — it is that they were shipped
**un-adopted and un-consolidated**, guarded by a machine that grew instead of the product.

---

## 2. DEDUPLICATED, SEVERITY-RANKED FINDINGS

Weak/duplicate lens findings killed; the survivors are the group's load-bearing set.

### CRITICAL

**GB-1 · The cohesion cures shipped un-adopted (the headline).** ONE finding folding B1 F2/F3/F4, B8 F2/F3/F4,
and B3 F5's demo-bypass. Every "conformity by construction" chassis of the last tranche renders on ~zero real
consumers while the spec-sheet patchwork it was built to replace remains live: DemoFrame 0/141 pages
(verified), unified StoryHeader not delivered → 36× inline-header copy-paste, VizStudio 1/6 viz pages,
StorySectionHeader 0 consumers, the export surface 0 demo consumers. *This is the crispest single statement of
the user's whole verdict.*

**GB-2 · The machine grew instead of the product.** ONE finding folding B2 F1/F2/F3 + B7 F1. 360 gates / 127K
LOC / ~1-per-wave; 39 dock + 19 blob + 18 aurora gates; ~25 closed-tranche/register-lock ceremony gates; 202
born-RED self-test theaters; the no-god-module ratchet RED at HEAD (`ladder.css` 527, `shell.css` 510,
verified FAIL) and a self-documented treadmill. The verification-to-product LOC ratio is inverted.

**GB-3 · The ≥2-consumer bar is gamed; substrate-without-consumer is laundered.** ONE finding folding B2
F4/F5/F6/F7 + B7 F2/F3/F4. The `consumer-evidence/` doc mechanism counts default-off couplings + booked
sibling-repo consumers as real, and `use-haptic.md` **lies** (2 phantom couplings, verified empty grep).
Orphan primitives ship as public API on the "OR is exported" escape hatch. The press abstraction is a
gate-induced dual path (useLiquidPress's own #1 consumer Button is gate-barred from it). Pointer physics is 5
parallel forks with the "ONE field" fold openly booked-and-never-done. Zero-opt-in axes
(`:duotone`/`:pressable`/`:liquid`/`warpMode:curl`/most of the 11-surface enrollment/`.glass-deep`) carry full
ceremony for no adoption.

### MAJOR

**GB-4 · Prop-grammar fragmentation at the identity layer.** ONE finding folding B3 F1/F2/F3/F4. Card vs
GlassPanel invert vocabulary and share a `tier` homonym (verified); the surface axis is 4 private unions + a
boolean homonym, not "factored once"; density is 3 unions, size is 5 shapes. `ControlSize` (9-file form family)
proves the shared-axis pattern works and is the model nothing else adopts.

**GB-5 · The demo-staging field is cold blue, at war with the warm identity.** Standalone, sharp (B1 F1).
`DockStage`/glass-CTA demos stage glass over `OPENAI_SKY` hue-240 cerulean in a warm-amber/no-gray/luminous-dark
product. Revives the deferred BD §3 question (should the DEFAULT control carry a rim/fill so it reads over ANY
backdrop, reserving full-transmissive glass for surfaces that HAVE a colorful backdrop) — a real architectural
transposition the plan flagged and never took.

**GB-6 · The glass CSS is epicycles, not an orthogonal basis.** ONE finding folding B4 F1/F2/F5. Tint recipe
respelled 9× (substitution trap documented re-biting 4×); 3 overlapping "ONE register" primitives with
overlapping consumers; cascade resolved by fragile source order (40 hazard comments). Plus the dead-token tail
(B4 F3: 39 dead/ceremony tokens incl. 9 abandoned goo/worm CSS orphans superseded by the JS worm — a no-legacy
violation kept alive only by gates).

**GB-7 · The paper-texture system is bifurcated (missed-obvious, live).** ONE finding folding B5 F1/F2/F3. The
redesign's own diagnosed-broken self-cancelling cloud ships beside its fix and powers dock + glass-hover grain
(verified 3 live consumers); the gray-tooth root is a library encapsulation defect patched only demo-locally;
`<PaperBackdrop frequency>` is a stale API axis binding the retired cloud.

**GB-8 · Liquid-weight-UNIVERSAL is prose, not a ratchet.** ONE finding folding B6 F1/F2/F3. The disclosure
chevron paints in 3 registers (one FLAT); `proof:spring-ease`'s abrupt-spatial detector is blind to
Tailwind-utility transitions (regex matches only CSS colon-declarations); there is no library-wide flat-vs-spring
floor and no missing-transition census. "UNIVERSAL" is unbacked.

**GB-9 · The export surface is un-dogfooded + three-tier-redundant.** ONE finding folding B3 F5/F6/F7 + B7 F6.
Demo bypasses all 95 published subpaths via the `@glass` raw-src alias; `/api` is a 505-line god-module (a pure
ratchet artifact); 79 mirror barrels + colocated barrels = three export tiers. Coherence rests on gates, never
on use. (BH B2 owns the mechanical fold; this adds the dogfood + grammar-unify quality clauses.)

### MEDIUM / MINOR

**GB-10 · Demo content duplication (concentrated, not sprawl).** B8 F5/F6/F7. Timeline×3 and Scroll×3 fragment
one component/topic into three nav entries each; `compositions/` holds two atom-scale misplacements. Taxonomy is
otherwise sound (4–14 pages/category, zero orphans — B8 F1 corrects the "sprawl" premise).

**GB-11 · God-file naming sprawl + dark-arm over-maintenance.** B4 F4/F6/F7 + B7 F5/F7. 5 confusingly-named
morph files, 5 byte-identical `#*-goo` filter IDs where 1 suffices, the `.glass-refract`→`.glass-lens` rename
left half-done at the file/id/token, 60 dark tokens dual-maintained where only the inset-shadow-trap subset
needs it, and the dock god-directory (18 files, 3 god-modules) owned by nobody (BH verify-only, BG grow-only).

---

## 3. CONTRADICTIONS BETWEEN LENSES (adjudicated with disk evidence)

**C-1 · "Fewer gates" (B2) vs "add/widen gates" (B5, B6, B8).** B2 FC1 says *"the fix is not more gates"* and
collapses 360→~50 family gates; B5 FC1 adds `proof:paper-texture-single`, B6 FC-2 widens `proof:spring-ease`,
B8 wants a demo-side chassis assert. **Adjudication (collector): NOT a contradiction — a layering.** B2 targets
gate *files* (per-wave granularity fossilized as permanent CI cost); B5/B6/B8 target *coverage* (real defects
the current gates miss). The resolution the synthesis carries: the missing coverage folds as **CASE ROWS inside
the consolidated family gates**, never as new files — spring-ease's Tailwind-utility widen becomes a row in the
`proof:motion` family gate, paper-texture-single a row in `proof:glass`/`proof:paper`, the demo-chassis assert a
row in a single `proof:demo` gate. Net gate-file count still drops from 360 toward ~50 **while coverage rises**.
Both sides are right; FC-B2 below is the container.

**C-2 · DemoFrame disposition — "adopt across 141" (B1) vs the VizStudio adopt (B8).** B1 FC1 offers adopt-or-
retire for the page-anatomy chassis; B8 FC1 adopts VizStudio onto 4-5 viz pages. **Adjudication:** these are
different chassis at different layers (DemoFrame = per-cel page-body box model; VizStudio = viz-studio composition
= `<StoryPage><Configurator>`), but they are the SAME disease (designed-but-unwired) and they **interact**: if
DemoFrame is adopted as the page anatomy, a viz page wraps in VizStudio *inside* a DemoFrame `stage` cel. The
page-anatomy decision (B1) is the **parent**; VizStudio adoption (B8) must conform to whichever anatomy wins.
Sequence the anatomy decision first. Not a contradiction — a dependency, recorded in FC-B1.

**C-3 · useLiquidPress — keep the wrapper (plan/CLAUDE.md intent) vs delete it (B7).** CLAUDE.md frames
`useLiquidPress` as "the ONE press factor"; B7 FC-4 shows its own #1 consumer (Button) is gate-barred from it,
leaving one real consumer (Card) and a coexisting hand-rolled twin. **Adjudication (collector, disk-backed):**
B7 is right — the clean-break/fewer-primitives direction is to **retire the wrapper** and keep Card on the
identical direct `useSpringPress + useLiquidFlex` composition Button already uses (byte-behaviour-identical, one
press idiom). This is a lens-vs-plan contradiction resolved in the lens's favor; carried in FC-B3.

**C-4 · "Surface axis is 3-member" (CLAUDE.md prose, echoed loosely) vs "4-member incl. `clear`" (B3 disk).**
B3 F2 verified `Surface = "glass"|"veil"|"opaque"|"clear"` on disk (`useSurfaceAxis.ts:42`) against prose that
says three. **Adjudication:** disk wins; the doc is stale (a "distrust doc claims" data point). Folded into the
plan-doc-edit that must carry correct numbers through the CLAUDE.md delete (FC-B4/plan-doc).

No irreconcilable cross-lens contradiction survives. The Group-B lenses are mutually reinforcing; the only real
tension (C-1) dissolves into a layering.

---

## 4. CONSOLIDATED FOLD CANDIDATES

Ten waves. Each names its kind, the lens findings it closes, its gestalt transposition (not a patch), and
cross-group interactions. Visual waves route to a **Fable** design arm + a **DesignSync** review surface per the
standing directive.

### FC-B1 · `W-CHASSIS-ADOPT-OR-RETIRE` — new/decide macro-wave (the headline) · closes GB-1
**Kind:** decide + Fable-authored migration. **Folds:** B1 FC1/FC2/FC4/FC5, B8 FC1/FC3 (F3 delete).
**Gestalt transposition:** the tranche must DECIDE adopt-or-retire for every designed-but-unwired chassis —
never keep both (the no-legacy law made literal). Concretely:
- **Page anatomy:** PICK — (a) adopt `DemoFrame` across content pages + unify the hero path onto the same cel
  register, OR (b) retire `DemoFrame.vue` + `demo-frame.css` (~350 dead lines) and standardize on
  `StorySection` + `ShowcaseFrame` with ONE enforced `tier` contract. Route the choice to Fable via DesignSync
  (one cel anatomy across 4–5 representative pages) *before* the migration.
- **Story identity header:** actually deliver the unified header — add `:section`/`:icon`/`:accent` to the ONE
  chassis header so the IconChip + tinted eyebrow + accent rail render ONCE, keyed off the manifest row; DELETE
  the 36 inline `<header>` blocks + the verbatim `borderLeft` copy-paste + the duplicate eyebrow. The motion
  masthead becomes `:accent`, not a fork.
- **VizStudio:** adopt onto `{blob, fourier-field, concentric, paper-grid}` (+ `constellation` case-by-case);
  correct the false "by construction" comments (`DemoFrame.vue:19-25/35-37`, `StoryPage.vue:118`).
- **StorySectionHeader:** DELETE (0 consumers; target pattern already eliminated).
**Cross-ref:** builds on Group A `A-demo-arch.md` (VizStudio adopt, dead chassis). Sequence the anatomy decision
BEFORE VizStudio adoption (contradiction C-2). This is the tranche's gestalt centerpiece.

### FC-B2 · `W-GATE-FAMILY-CONSOLIDATE` — merge-waves (highest anti-contrivance leverage) · closes GB-2 + C-1
**Kind:** merge-waves + prune-wave. **Folds:** B2 FC1/FC2/FC5, and the coverage adds from B5 FC1 / B6 FC-2 /
B8 (as CASE ROWS, not files). **Gestalt transposition:** ONE gate per invariant family, parameterized by a
per-family CASE TABLE (the pattern `proof:glass-cohesion` already gestures at). `proof:dock` absorbs all 39
dock-* gates; `proof:aurora`/`proof:blob` absorb 18+19; `proof:glass` the 15; `proof:motion` folds
motion+spring+no-layout-animation+animation-coherence+one-clock AND the B6 Tailwind-utility spatial widen.
Retire the 13 closed-tranche history gates + demote the 5 register-lock gates to ONE `proof:registers`
schema-validator. Move the 172 self-test bites to ONE shared `gate-selftest.mjs` harness run ONCE, not
per-gate. Fold the B5 paper-texture-single + B8 demo-chassis asserts as rows. Target ~50 family gates, coverage
UP. **Cross-ref:** interacts with Group A gate-lens; the coverage folds resolve C-1.

### FC-B3 · `W-CONSUMER-BAR-HONEST` — prune-wave + precept-amend · closes GB-3 + C-3
**Kind:** prune + plan-doc-edit (precept). **Folds:** B2 FC3/FC4, B7 FC-2/FC-3/FC-4/FC-5.
**Gestalt transposition:** restore the ≥2-consumer bar's purpose. (1) Amend the precept: consumer count is LIVE
disk call-sites, machine-verified — NOT default-off couplings, NOT booked sibling-repo consumers, NOT "OR is
exported"; the `consumer-evidence/*.md` doc becomes a gate INPUT checked against `grep` (the `use-haptic.md` lie
is proof it is currently unchecked). (2) DELETE orphans clean-break: `useVizChoreography`, `useCelebrationBurst`,
`useHaptic` + its lying doc, `useScrollPin`/`useScrollScene`. (3) Collapse the press dual-path — retire
`useLiquidPress`, one direct press idiom (C-3). (4) Make the pointer-field fold REAL (fold cursorModel +
useBlobPointer + useDragVelocity onto `usePointerVelocityField`) or defer-honest with a dated trigger — do not
leave a "ONE field" claim over 5 forks. (5) DECIDE each zero-opt-in axis — real demo/content consumer or retire.
**Cross-ref:** precepts/ is a submodule → author via cross-repo ask (BH B4c discipline). Overlaps BH B4d
(`proof:consumer-evidence-live`) — extend its scope to the motion/ barrel.

### FC-B4 · `W-PROP-GRAMMAR` — new-wave (sequence INTO/BEFORE BH B2) · closes GB-4 + C-4
**Kind:** new-wave (mechanical; renames + type-narrowing, near-zero visual). **Folds:** B3 FC1/FC3/FC4.
**Gestalt transposition:** mint 5 canonical axis types ONCE in `_shared/` and constrain every component to a
subset, not a private union. `SurfaceTier` becomes THE visual-rung type; **rename GlassPanel's visual-rung prop
`variant`→`tier` and its render-backend prop off `tier`** (kill the homonym); fold
`CardSurface`/`SkeletonSurface`/`BadgeVariants['surface']` onto `Surface`; move `cartoon` off the surface axis
onto its own decoration axis; rename `TabsIndicator`'s boolean `surface`→`plate`; mint
`DensityScale`/`SizeScale` with `Extract<>` subsets; publish `data-part` as an exported union. One gate
(`proof:prop-grammar`: no private surface/tier/density union, no prop-name homonym). Carry correct numbers (95
subpaths, 4-member `Surface`) into the CLAUDE.md redistribution (C-4). **Cross-ref:** MUST land before BH B2's
`/api` fold or B2 re-publishes the fragments.

### FC-B5 · `W-DEMO-DOGFOODS-SURFACE` — amend BH B2 · closes GB-9 (dogfood half)
**Kind:** amend-wave (one convention + a lint). **Folds:** B3 FC2. **Gestalt transposition:** after the mirror
dir dies and the entry-glob lands, re-point a representative demo slice from `@glass` raw-src to the published
`@mkbabb/glass-ui/*` subpaths — turning the demo into the first real subpath consumer, so a broken barrel
curation surfaces in the demo BUILD not only in a gate. Keep `@glass` for internal-only viz-stress pages.
**Cross-ref:** BH B2 export band; the `/api` god-module fold (GB-9 mechanical half) is BH-owned.

### FC-B6 · `W-GLASS-BASIS-CONSOLIDATE` — merge + new-wave (CSS elegance) · closes GB-6 + GB-11 (CSS half)
**Kind:** new-wave + merge-waves + prune. **Folds:** B4 FC1/FC2/FC3/FC5/FC6 (+ FC4 dark-arm decision, FC7
defer). **Gestalt transposition:** (1) factor the oklab-tint wrapper into ONE composable recipe home
(`tokens/glass-tinted.css`), retire the `-tinted` duplicate tokens + all 9 inline re-spells — the substitution
trap becomes structurally impossible (no second layer to read the wrong token from). (2) Merge
`.glass-atom`/`.glass-chip`/`.glass-capsule` → ONE `.glass-surface` basis with intent modifiers; re-point the
~15 consumers. (3) Explicit `@layer` basis (`glass.base, glass.tier, glass.surface, component, override`) so the
40 "must-import-after" hazards resolve by declared precedence. (4) Dead-token sweep (39 tokens + the gates that
only assert them, incl. the 9 goo/worm CSS orphans). (5) Finish goo-DRY (5 `#*-goo` IDs → 1), morph-file rename,
`.glass-refract`→`.glass-lens` file/id/token completion. Dark-arm `light-dark()` baseline as a decided
decision-point (FC4). **Fable arm:** DesignSync glass-band cards to verify byte-identical darken over a busy
backdrop post-consolidation. **Cross-ref:** interacts with FC-B4 (Card/GlassPanel share these tokens).

### FC-B7 · `W-PAPER-TEXTURE-UNIFY` — new-wave · closes GB-7
**Kind:** new-wave. **Folds:** B5 FC1/FC2/FC3/FC4. **Gestalt transposition:** ONE paper-grain texture —
`--paper-grain-tooth` + the `multiply`/`screen` blend law. RETIRE `--paper-clean-texture`/`--paper-aged-texture`
clean-break; migrate the 3 live consumers (dock `::after`, glass hover grain, `<PaperBackdrop frequency>`);
DELETE the dead `.paper-texture` utility. **Warm the tooth at the source** (tint the `saturate=0` speckle toward
the warm-amber identity) so `C≥0.02` holds on ANY substrate — dissolve the "warmth from the substrate behind it"
dependency and pull the 3 demo-local warm radials into the library. Reconcile `<PaperBackdrop>` API. Generalize
the clean-break-residual gate discipline (every token RETIRE asserts `0` residual `var(--<retired>)` in `src/`)
— folds as a row in FC-B2's `proof:glass` family gate. **Fable arm:** grain-visibility π over a bare
`<PaperBackdrop>`, both modes.

### FC-B8 · `W-DISCLOSURE-ROTATE` — new micro-wave + census · closes GB-8
**Kind:** new-wave (register unify) + census arm. **Folds:** B6 FC-1/FC-3 (FC-2 gate widen → FC-B2).
**Gestalt transposition:** mint ONE `transition-disclosure` register (spring curve + own settle clock + arrival
ease); Accordion/Select/Configurator (+ any caret) read it — the 3 divergent authorings collapse in one edit
(substitution over re-declaration). Deliver the **missing-transition census** (every `v-if`/`v-show`/class-toggle
state change with no motion, each routed to a register or an explicit "instant by design" exemption) — the census
is what makes "UNIVERSAL" decidable. **Fable arm:** decide the ONE arrival ease (cartoon-punch vs calm snappy) —
DesignSync the Accordion/Select/Configurator disclosure surfaces as one card set. Supersedes the WS10 per-site
accordion line.

### FC-B9 · `W-DEMO-DUP-MERGE` — new-wave (mechanical, low-risk) · closes GB-10
**Kind:** new-wave + plan-doc-edit. **Folds:** B8 FC2/FC3/FC4. **Gestalt transposition:** Timeline×3 → ONE
`data/timeline.vue` with 3 `<StorySection>` registers (discrete/segmented/continuous); Scroll×3 → ONE
`motion/scroll.vue` (native→reader→choreography, dependency order) — copy-the-render-body-delete-the-wrapper, the
`curve-gallery.vue` exemplar, zero behavior change, one nav entry each. Re-home `compositions/labeled-field.vue`
→ `forms/`, fold `compositions/icon-tooltip.vue` into `containers/tooltip.vue`. Nest `demo/stories/aurora/` →
`substrates/aurora/` (out of the `./*/*.vue` glob). Net ~120→~115 pages. **Cross-ref:** Group A `A-demo-arch.md`.

### FC-B10 · `W-GOD-MODULE-RESHAPE` — amend BH B2 / no-god-module gate · closes GB-2 (ratchet) + GB-11 (dock)
**Kind:** amend-wave. **Folds:** B7 FC-1/FC-6/FC-7. **Gestalt transposition (not a line-shuffle):** book+carve
the 2 live-RED CSS in the SAME wave that grows them — `ladder.css`'s +38 (the W55 adaptive-legibility
`@container` block) → sibling `glass/adaptive.css` (the rim.css precedent); `shell.css`'s +12 (plate-clearance)
→ existing `dock/density.css`. Land the `*.{wgsl,glsl,frag,vert}.ts` shader-literal exemption (18→15 honestly —
stop splitting cohesive shaders into fragments). Correct the 2 stale grandfather baselines (silent refill room).
Give the dock god-directory (18 files, 3 god-modules) an OWNER — do NOT leave it BH-verify-only/BG-grow-only.
**Cross-ref:** BH B2.5 (dock leaf-verify), BG WS2 (DOCK_SPRING); the shader exemption reframes the ratchet as
logic-only (correct scope).

### Plan-doc-edits (booked, not waves)
- Correct the false "by construction" claims (`DemoFrame.vue:19-25/35-37`, `StoryPage.vue:118`) when FC-B1 lands
  (B1 FC5).
- Carry correct subpath count (95) + 4-member `Surface` through the CLAUDE.md delete (B3 FC4, C-4).
- KEEP-BOOKED honest: the specular family (4 names, one write-source — a legitimate delivery seam, B3 FC5); the
  deck slide-content goo-morph as a `/deck` primitive (trigger = slides consume-back, B6 FC-4);
  `W-DARK-ARM-BASELINE` behind a browser-support decision (B4 FC4); `W-GLASS-BLUR-FUNCTION` behind CSS
  `@function` baseline (B4 FC7).

---

## 5. Cross-group interaction map (for the collector-of-collectors)

- **FC-B4 (prop-grammar) ↔ BH B2 export band (Group ? export/BH lens):** grammar MUST unify before `/api` folds.
- **FC-B2 (gate consolidate) ↔ Group A gate-lens:** the family-gate transposition is the shared anti-contrivance
  headline; coordinate so both groups fold ONE `W-GATE-FAMILY-CONSOLIDATE`, not two.
- **FC-B1 / FC-B9 (demo chassis + dup-merge) ↔ Group A `A-demo-arch.md`:** confirmed + widened; single demo band.
- **FC-B3 (consumer-bar) ↔ BH B4d + precepts submodule:** cross-repo-ask discipline.
- **FC-B10 (god-module) ↔ BH B2/B2.5 + BG WS2:** ownership seam for the dock.
- **FC-B5 (dogfood) ↔ BH B2:** the export restructure's validation-by-use clause.

---

## Appendix — collector disk verifications (2026-07-01, HEAD 976dc890)
- DemoFrame page consumers: **0** (only `StoryPage.vue` + 2 chassis files reference it) — GB-1 confirmed.
- `node scripts/proof-no-god-module.mjs` → **`status: FAIL`**; `ladder.css` 527, `shell.css` 510 — GB-2/GB-10.
- `scripts/proof-*.mjs` count: **360** — GB-2 confirmed.
- `use-haptic.md` couplings: `grep 'pulse(' useDragMorph.ts useDockFission.ts` → **empty**; `useHaptic` refs =
  barrels+def only, **0 call-sites** — GB-3 confirmed (phantom evidence).
- Card `tier?: CardTier` (`Card.vue:100`) vs GlassPanel `tier?: GlassTier` (`GlassPanel.vue:42`) +
  `variant?: GlassPanelVariant` (`:50`) — homonym confirmed — GB-4.
- `DockStage.vue:38` defaults `PRESETS.OPENAI_SKY` (hue 240) — GB-5 confirmed.
- Live `var(--paper-clean-texture)` consumers: **3** (`cards.css` dead utility + `glass/ladder.css` +
  `dock/shell.css`) — GB-7 confirmed.
