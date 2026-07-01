# DEV-C — the new/amended headline wave specs (RESPEC-GESTALT pass-2)

**Date:** 2026-07-01 · **Branch:** `tranche/BG` · **HEAD:** `306c3059` (tree clean) · **Base:** v4.2.0.
**Lane:** DEV-C — the ~22 headline waves the whole 32-lens audit converges on, each authored as an
**executable spec** (exact ids, file paths, family-gate arms, fableArm/designSyncSurface, per-wave paint
close, preconds, MIGRATION rows). Every anchor below was re-verified on disk 2026-07-01 (checks inline).

This file is BINDING under SYNTHESIS-PASS1 §2 rulings and §3 target shape. It is CONSUMED by DEV-A (the
family restructure map) and DEV-B (the BH restructure + cut story); where a wave here amends an existing
BG/BH row, DEV-A owns the row's KEEP/AMEND/MERGE/PRUNE disposition — this file owns the wave's SHAPE.

---

## 0. Disk verifications (2026-07-01, HEAD 306c3059)

| Claim | Result |
|---|---|
| `proof-no-god-module.mjs` status | **FAIL** — `ladder.css` 527L, `shell.css` 510L; `RATCHET_BASELINES` = 16 entries incl. `GlassDock.vue:711` |
| `Surface` union on disk | **4-rung** `"glass"\|"veil"\|"opaque"\|"clear"` (`useSurfaceAxis.ts:42`); the header comment still says "three-rung" (`:15`) — doc drift confirmed |
| glass tier registers | `glass-atom.css` + `glass-chip.css` + `glass-capsule.css` all present (the 3 "the ONE register" files); `liquid-morph.css` present (850L) |
| `--glass-bg-*` compose site | `:root` in `tokens/glass.css` — tiers un-tinted, named-surfaces (dock/dialog/sheet) bake the oklab tint IN (confirmed the F1 asymmetry) |
| motion orphans | `useLiquidMorph.ts` (462L) NOT barrel-exported; `useCelebrationBurst.ts` (261L) **IS** exported (`motion/index.ts:70`); `flipShared` imported-never-called (`suite.ts:42`); `liquid-morph.css` = 850L |
| disclosure chevron | Accordion **flat** `transition-transform duration-200` (`AccordionTrigger.vue:35`); Select `[transition:rotate…ease-cartoon-punch]` (`:138`); Configurator bare `group-data-[state=open]:rotate-180` no transition (`ConfiguratorLayer.vue:143`) — **three registers** |
| paper texture | 6 files read `--paper-clean-texture`/`-aged-texture` (`cards.css`, `dock-controls/tab-button.css`, `glass/ladder.css`, `utilities/btn.css`, `tokens/scale-paper.css`, `dock/shell.css`) |
| DockStage default | `PRESETS.OPENAI_SKY` (hue 240 cerulean) — `DockStage.vue:38` |
| deep glass | `glass-deep.css`: calm ceiling 16px/sat 1.5; Apple ceiling 20px/sat 1.8 "the CEILING", booked |
| gate count | **360** `proof-*.mjs`; 172 hand-paste a comment-strip detector; `scripts/lib/` already ships `paint-arm.mjs`, `surface-closure.mjs`, `critical-path-walk.mjs` |
| `ba-gestalt` roster | already re-pointed to `docs/tranches/BG/audit/reflect/bg-gestalt-roster.md` (reads LIVE BG paint) — GD-C1's "still points at BC" is STALE; the residual is *vacuous probe* (mean-L box) + *sole-oracle*, not the roster path |
| css/perf | `CRITICAL_GZIP_CEILING = 182000` (`critical-partition.mjs:195`); `dist/aurora.js` ceiling `{raw 162_000, gz 54_000}` (`profile-bundle.mjs:213`) |
| demo | **156** `.vue` pages; DemoFrame consumed by **0** real pages (only `StoryPage.vue` + `_chassis/`); VizStudio 3 refs; `StorySectionHeader.vue` present |
| chart tokens | `--chart-*` read by phase-bus (`useProgressGeometry`, `MetricRow`, `MetricCell`, `icon-chip`) — NO `<GlassChart>` component exists |
| dock >400L | `GlassDock.vue` 711 · `useDockFission.ts` 604 · `useDockContextSilhouette.ts` 551 · `useDockState.ts` 454 · `DockLayerGroup.vue` 417 |

**Cross-file ownership fences (stated ONCE, referenced by many waves):**
- The **orphan clean-break cut** (`useLiquidMorph` + CSS, `useCelebrationBurst`, `useHaptic` + its lying
  evidence doc, `useVizChoreography`, `useDockContextSilhouette`, `useScrollPin`/`useScrollScene`-fold) is
  **DEV-A2's dead-cut wave** (SYNTHESIS-PASS1 §2 ruling 2, one clean-break cut, one MIGRATION row each).
  Every wave here that RELIES on an orphan being gone **references** that wave — it does NOT re-delete.
- The **export reshape** (`src/subpaths/` delete, `/api` fold-drop, `src/entries/` relocate,
  `regen-exports.mjs`) is **BH B2** (DEV-B owns the shape). The F6 grammar waves land BEFORE B2's `/api`
  fold or B2 re-publishes the fragments (SYNTHESIS ruling 5 sequencing).

**The family-gate roster** (GD-FOLD-1 / GC-FC1(b) — gates born WITH the feature, per family; every wave
below accretes a `{detector, target, predicate, rationale}` ROW into ONE of these, never a new singleton
script unless flagged):

`proof:glass` · `proof:paper` · `proof:motion` · `proof:dock` · `proof:viz` · `proof:encapsulation` ·
`proof:demo` · `proof:build` · `proof:warm-identity` (the composited-gestalt paint battery) · `proof:meta`
· `proof:no-god-module` (the ratchet, kept as its own true-positive gate).

---

# FAMILY F2 — GLASS (family gate: `proof:glass`; paint battery: `proof:warm-identity`)

## F2.1 · `BG.W-GLASS-DEFAULT-DEFINITION` (GA-1 · the defined control tier — the co-equal-top root)

**kind:** new-wave (CRITICAL). **family:** Glass. **VISUAL.**

**The question it answers (verbatim GF2):** AX.W54 made glass the maximal default, but "the glass blur is
imperceptible over a flat substrate" — so a bare `<Button>`/`.input-pill` over a flat page reads as a
near-gray shape with no edge (`BD/greenfield/buttons/GOLDEN.md`: shipped BC default rest fill oklab chroma
**0.0138**, "NEAR-GRAY"; root cause `--glass-tint-strength: 0%` at `:root`). This is the DOMINANT user
frustration and no BG wave carries it.

**Gestalt approach (a transposition, NOT a patch, and NOT a fork of the `--glass-*` cascade).** Split glass
into TWO registers on the ONE existing `--glass-level`/edge machinery:
- **transmissive** (today's maximal glass) — the DEFAULT for surfaces that HAVE a colorful backdrop
  (cards over the field, overlays over content, the dock over aurora). Unchanged.
- **defined** — a `.glass-defined` decoration (the `.glass-opaque`/`.glass-deep` token-substitution
  precedent — NOT a competing `backdrop-filter`, NOT a parallel recipe) that reads as a SHAPE over ANY
  backdrop by composing three things the material already owns: (a) a stronger rim — re-point
  `--glass-border-*` to a defined-tier alpha (lifts the warm hairline to a read-carrying edge); (b) a
  **floor-fill** — a new `--glass-floor-fill` warm-cream minimum backplate (`color-mix(in srgb, var(--card)
  ~15%, transparent)`) composited UNDER the transmissive fill so the plate has a floor even at
  `--glass-tint-strength: 0%` over white; (c) the W-BUTTON-GLASS lit register (specular + `--glass-btn-*`
  depth stack) already shipped. `--glass-definition` is a typed inheriting `@property <number>` (default `0`
  = fully transmissive, `1` = fully defined) registered in `tokens/property-regs.css`; `.glass-defined`
  sets it to the calibrated control value, so a host dials definition on any ancestor.

**The DEFAULT flip:** the control cohort — Button glass variants, `.input-pill` (Input/Textarea/
NumberField), `.control-surface` (Select), the chip family, `.glass-menu-row`, dropdown triggers — compose
`.glass-defined` **by default**. A content surface stays transmissive. This is the AX.W54 transposition BD
§3.3 invited: glass-everywhere STAYS the identity, but a control reads as a control over a flat page.
Pairs with the now-landed `BG.W-FIELD-AURORA` so transmissive glass finally has a live field to bend.

**deliverables:**
- `src/styles/glass/defined.css` (new) — the `.glass-defined` decoration + the `--glass-floor-fill` compose.
- `src/styles/tokens/property-regs.css` — register `@property --glass-definition` (inheriting `<number>`,
  initial `0`).
- `src/styles/tokens/glass.css` — mint `--glass-floor-fill` + the defined-tier `--glass-border-*` alpha
  rung (a `--glass-border-defined`); the transmissive `--glass-bg-*` compose is BYTE-UNTOUCHED.
- Re-point the control cohort to `.glass-defined` (CVA base for Button glass variants
  `ui/button/index.ts`; `.input-pill` + `.control-surface` in the form CSS; the chip registers;
  `menu.css` `.glass-menu-row`) — a decoration ADD on the existing base rung, no per-control recipe.
- Dark arm in `tokens/dark-arm.css` (floor-fill + defined rim, W-DARK-MATERIAL saturate companions).

**gate clause (arm of `proof:glass`):** `defined-control-floor` — a default `<Button>`/`.input-pill`/
`SelectTrigger` computed style over a **synthetic FLAT white page** with `--glass-tint-strength:0` (field
OFF) resolves a floor-fill α ≥ threshold AND a rim ΔL that clears the legibility floor; born-RED on HEAD
(the 0.0138-chroma near-gray witness), GREEN post-fix. A negative arm: a content-tier `.glass-card`
composing NO `.glass-defined` still resolves the transmissive fill unchanged (the default flip does not
bleed onto content). + a 3-bite self-test.

**paint close (own, non-authoring, dual-engine, both modes):** `tests-visual/glass-defined.spec.ts` —
capture a default Button + Input row over (a) a flat page and (b) a live aurora, in BOTH modes, on
Chromium + WebKit; assert the control reads as an edged shape on the flat page (edge-cast + floor-fill
present) AND still transmits the field where a field exists; the composited region's dominant hue is warm.

**fableArm:** the session-core Fable instance authors the defined-vs-transmissive calibration (rim α,
floor-fill α, definition scalar) — this is a gestalt call (how "defined" reads without looking opaque).
**designSyncSurface:** a DesignSync card set — the control cohort (Button/Input/Select/chip/menu-row) over
BOTH a flat page and a live field, both modes; the PASS verdict is a Fable gestalt judgement, not the
building agent's.

**preconds:** `BG.W-FIELD-AURORA` LANDED (gives transmissive glass a field). Coordinate the
`--glass-border-*` touch with F2.2 (same neighborhood — sequence F2.2's tint-recipe consolidation FIRST so
`.glass-defined` composes the already-factored recipe, not a soon-to-move one).

**MIGRATION:** the control default visibly gains an edge/floor over flat backgrounds — a design UPGRADE,
no public-prop break (a consumer wanting the old fully-transmissive control sets `--glass-definition: 0`
on the scope). ONE MIGRATION.md row.

---

## F2.2 · `BG.W-GLASS-BASIS-CONSOLIDATE` (FC-B6 + GD-FOLD-3 · the elegance transposition)

**kind:** merge + new + prune (CRITICAL). **family:** Glass. **VISUAL (zero-pixel transposition — any drift
is a finding).**

**Gestalt approach.** The glass CSS is accreted epicycles (B4/D5): ONE tint recipe hand-spelled 9×, three
overlapping "the ONE register" primitives, 60 dark COLOR tokens authored twice, 39 dead/ceremony tokens, a
half-done goo-DRY, a half-done refract→lens rename. Collapse to an orthogonal basis. Six sub-moves, ONE
wave (they all touch `src/styles/glass/` + `tokens/`; splitting them re-fragments the concern):

1. **Tint recipe applied ONCE at the element (kills F1/GD-M3 the substitution trap structurally).** Factor
   the `color-mix(in oklab, <rung>, var(--glass-tint-source) var(--glass-tint-strength))` wrapper into ONE
   applied recipe — a `@utility glass-fill` (or `.glass-tinted-<tier>` set) in a new
   `src/styles/tokens/glass-tinted.css` that the ELEMENT composes, so overriding a tint input on any scope
   re-composes automatically. DELETE the `--glass-bg-*-tinted` duplicate tokens and the 9 inline re-spells
   (`glass/ladder.css`, `glass/surfaces.css`, `menu.css`, `feedback-tone.css`, the `.btn-glass` mint,
   `dock/search.css`, `dock/stack-rail.css`, cards.css). The named-surface bgs (`--glass-bg-dock/dialog/
   sheet`, which bake the tint at `:root`) fold onto the SAME one recipe. There is then NO second layer to
   read the wrong token from — the trap is impossible, not re-documented.
2. **Merge the three small-glass registers → ONE `.glass-surface` basis** with intent modifiers
   (`--atom` loud/opaque · `--chip` toggle-punch · `--capsule` lifted-lozenge). Retire `glass-atom.css` +
   `glass-chip.css` (clean break); re-point the ~15 consumers (TagsInputItem, Slider, Badge, toggle-chip,
   selectable-chip, metric-badge). A component composes EXACTLY one register + a modifier, never two.
3. **Kill the dark COLOR dual-arm (GD-C4/D5-F1).** Delete the ~60 duplicate COLOR declarations from
   `dark-arm.css`; colors resolve through `light-dark.css` ONLY. `dark-arm.css` carries the shadow/inset/
   inheritance-sensitive dark arm ONLY (the light-dark inset-shadow-trap exception — MEMORY-documented).
   The rule is **one mechanism per token TYPE**: colors → `light-dark()`; shadows/insets → `.dark {}`.
4. **Dead-token sweep (F3/GD-m2 partial).** Delete the 9 goo/worm orphans (`--pager-worm-{flow,duration,
   max-stretch}`, `--deck-goo-*`, `--carousel-goo-*` in `scheme-spring.css` — the live worm drives via JS
   `--worm-t`/`--stretch`), `--search-result-text-secondary`, `--glass-spine-blur/-opacity`,
   `--progress-sectioned-track`, `--tooltip-text`, `--phase-color-label`, and the ~29 gate-only tokens
   AFTER F8's token manifest (W-TOKEN-MANIFEST) confirms each has zero live channel. Delete the gates whose
   SOLE job is to assert a now-deleted token exists.
5. **Finish the two half-renames (F6/F7).** Collapse the 5 byte-identical `#*-goo` filter IDs → `#glass-goo`
   (retire `#pager-goo`/`#dock-fission-goo`/`#morph-goo`/`#dock-morph-goo`; re-point `url(#…)` sites).
   Complete `.glass-refract`→`.glass-lens` to the FILE/ID/TOKEN: `glass-refract.css`→`glass-lens.css`,
   `#glass-refract`→`#glass-lens`, `--glass-refract`→`--glass-lens`.
6. **`--goo-*` root register (GD-m3 half).** Mint ONE `--goo-{flow, stretch-cap, duration}` root register;
   carousel/deck/pager/dock/tab consume it with per-surface `--goo-stretch-cap` overrides (the calibrated
   1.24/1.1/1.14/1.11 become scope overrides of ONE token). (Coordinate step 4's goo-token delete with
   this — the live values move onto the register, the dead flow/duration channels delete.)

**NOTE — deliberately NOT in this wave** (SYNTHESIS §4 protected / D5 protect): the `--glass-level`/
`--glass-depth` geometry composition, the six-layer composite, the warm HSL identity values, the alpha
ladder, the `in srgb` surface-tint fence, the φ constants — all BYTE-IDENTICAL. The
single-`@layer components` source-order → explicit `@layer` stack (B4-F5) is **KEEP-BOOKED** (a larger
cascade-basis move; book it with the trigger "after this wave's file moves settle") — it is not a
zero-pixel move and would over-scope this wave.

**deliverables:** `tokens/glass-tinted.css` (new, the ONE recipe home) · `glass/glass-surface.css` (new,
the merged basis) · DELETE `glass/glass-atom.css` + `glass/glass-chip.css` · rename `glass/glass-refract.css`
→ `glass/glass-lens.css` · edits to `tokens/glass.css`, `tokens/dark-arm.css`, `scheme-spring.css`,
`menu.css`, `feedback-tone.css`, `glass/ladder.css`, `glass/surfaces.css`, `dock/search.css`,
`dock/stack-rail.css` + the ~15 register consumers + the 5 `url(#…)` sites.

**gate clauses (arms of `proof:glass`):**
- `glass-fill-single-recipe` — exactly ONE `color-mix(in oklab, …glass-tint…)` authoring site in `src/`
  (born-RED on the current 9); a self-test plants a 2nd inline re-spell → RED.
- `glass-surface-single-basis` — no component composes ≥2 of `{glass-atom, glass-chip, glass-capsule}`
  (the deleted two are DEFINITION-ABSENT).
- `dark-arm-disjoint` — `.dark {}` color arm ∩ `light-dark()` arm = ∅ (born-RED on the verified 60-overlap).
- `goo-id-single` — exactly one `#*-goo` filter id definition; `glass-refract`/`--glass-refract` are
  DEFINITION-ABSENT (the rename is complete).
- clean-break-residual: every RETIRED token asserts `0` residual `var(--<retired>)` in `src/`.

**paint close:** `tests-visual/glass-basis.spec.ts` — the 5 glass tiers + the merged `.glass-surface`
consumers over a busy backdrop, BOTH modes, Chromium + WebKit; assert computed colors byte-identical to the
pre-wave `no-gray`/`dark-material` π ground (the moves are structural — any pixel drift is a finding).

**fableArm:** Fable reviews the glass-band cards to CONFIRM byte-identical darken/lift over a busy backdrop
post-consolidation (verification, not authoring). **designSyncSurface:** the glass-band card set (5 tiers
+ the merged surface + the tint-over-light bright bucket), both modes.

**preconds:** F8 `BG.W-TOKEN-MANIFEST` LANDED (step 4's dead-token confirm); DEV-A2 dead-cut LANDED (so the
goo/worm JS is the sole live worm path). Sequence BEFORE F2.1 in the same neighborhood is EXPLICITLY
INVERTED per F2.1's precond note — F2.2 lands FIRST so `.glass-defined` composes the factored recipe.

**MIGRATION:** zero consumer-facing behavior change (identity byte-identical); the retired
`.glass-atom`/`.glass-chip` classes + `--glass-bg-*-tinted` tokens + `.glass-refract` id/token are
clean-break removed — ONE MIGRATION.md row (internal registers; no public API touched — the consumers are
library-internal).

---

## F2.3 · `BG.W-DEEP-GLASS-DECIDE` (GA-7 · end the 5-tranche chronic with a number)

**kind:** micro-wave (MEDIUM). **family:** Glass. **VISUAL (conditional).**

**Gestalt approach.** The `.glass-deep`/`--glass-blur-deep` tier sits at 16px/saturate 1.5 with the Apple
20px/1.8 ceiling "BOOKED" since BB — ridden BB→BC→BD→BE→BF→BG on a `profile:budget` clearance nobody has
run at 20px (`glass-deep.css:5,21-23` confirm the ceiling). End it with a MEASUREMENT, not a 6th re-book.

**deliverables (a decision + one of two outcomes):**
- RUN `profile:budget` with `--glass-blur-deep` at 20px / `saturate(1.8)` on the deep tier's real per-frame
  cost (the deep tier's live GL/compositor draw, not a synthetic).
- **Clears** → land the two-token bump (`glass-deep.css` deep radius 16→20, saturate 1.5→1.8; the deep dark
  arm saturate companion re-checked); the deep tier reaches its design-language ceiling.
- **Does NOT clear** → convert to RETIRE-with-recorded-number: 16px/1.5 IS the ceiling for this substrate,
  stated as IDENTITY in `glass-deep.css` (delete the "BOOKED to a successor" comment; record the measured
  cost number that fenced it). Either way the chronic TERMINATES.

**gate clause (arm of `proof:glass`):** `deep-glass-decided` — the `glass-deep.css` header carries a
TERMINAL verdict (`landed-20px` OR `retired-at-16px-cost-N`), never `booked`; a synthetic `booked` state
REDs (the `proof:nda-decided` terminal-lock shape).

**paint close:** IF landed → `tests-visual/glass-deep.spec.ts` (LOCAL real-GPU, both modes) confirms the
deeper refraction paints richer without over-diffusing the warm-cream ceiling. IF retired → no paint
(zero-pixel; the number is the artifact).

**fableArm:** IF landed, Fable confirms the deeper tier still reads warm-cream (not over-saturated).
**designSyncSurface:** the hero/dock/CTA deep-glass cards (only if landed).

**preconds:** none. **MIGRATION:** none (opt-in tier; a bump is additive, a retire is a recorded identity).

---

# FAMILY F4 — PAPER (family gate: `proof:paper`)

## F4.1 · `BG.W-PAPER-TEXTURE-UNIFY` (FC-B7 · GC-FC7 · ONE tooth, warm at source)

**kind:** new-wave (MAJOR — missed-obvious, live defect). **family:** Paper. **VISUAL.**

**Gestalt approach.** The paper-texture system is bifurcated (B5-F1): the redesign's own diagnosed-broken
self-cancelling `feTurbulence` cloud still ships beside its replacement and powers the dock grain +
glass-hover grain (6 live `--paper-clean-texture`/`-aged-texture` consumers verified). And the user rejected
the SVG-noise paper register TWICE ("disgusting metallic"). The transposition (GC-FC7): ONE warm raster
tooth, PRIMARY; `feTurbulence`/`feDiffuseLighting` demoted to at-most a progressive-enhancement layer over
it — engine-stable by construction (kills the Safari `lighting-color` colorspace risk + cross-engine
determinism + the metallic-recurrence risk in one move).

**deliverables:**
- ONE paper-grain register: `--paper-grain-tooth` (the single texture source — a warm raster tile asset
  committed under `src/styles/assets/`, tinted warm-amber at SOURCE so `C ≥ 0.02` holds on ANY substrate,
  NOT "warmth from the substrate behind it") + the `multiply`/`screen` blend law.
- **RETIRE clean-break** `--paper-clean-texture` + `--paper-aged-texture` (the self-cancelling
  `feTurbulence` cloud); migrate the 6 live consumers (`cards.css`, `dock-controls/tab-button.css`,
  `glass/ladder.css`, `utilities/btn.css`, `tokens/scale-paper.css`, `dock/shell.css`) onto
  `--paper-grain-tooth`.
- DELETE the dead `.paper-texture` utility (`cards.css`).
- Pull the 3 demo-local warm radials into the library (the warmth was demo-patched — make it a library
  property).
- Reconcile `<PaperBackdrop>`: the `frequency` prop bound the retired cloud — re-point/retire it (a raster
  tooth has no `frequency`; the tuning axis becomes `--paper-grain-tooth-scale`/`-opacity`). ONE MIGRATION
  row if `frequency` is public.
- The `feDiffuseLighting` enhancement (if kept at all) is `@supports`-gated OVER the raster floor, never the
  sole path.

**gate clause (arm of `proof:paper`):** `paper-texture-single` — exactly ONE grain-texture source token in
`src/`; `--paper-clean-texture`/`-aged-texture` DEFINITION-ABSENT + 0 residual `var()` readers; the tooth
resolves `C ≥ 0.02` warm on a synthetic flat WHITE substrate (the source-warmth assert, born-RED on HEAD).
+ a self-test bite.

**paint close:** `tests-visual/paper-texture.spec.ts` — a bare `<PaperBackdrop>` + the dock grain +
glass-hover grain over a flat white AND a dark page, BOTH modes, Chromium + WebKit; assert the grain is
VISIBLE and warm on both, and reads identical cross-engine (the raster-determinism win).

**fableArm:** Fable authors the tooth calibration (scale/opacity/warmth) + the accept/reject of the
`feDiffuseLighting` enhancement — the paper surface is a gestalt call the user has rejected twice.
**designSyncSurface:** the paper-band cards (PaperBackdrop + dock grain + math-paper), both modes,
Chromium + WebKit side-by-side (the cross-engine determinism is the point).

**preconds:** none (independent of the glass waves). **MIGRATION:** `<PaperBackdrop frequency>` reconcile
(if public) + the retired texture tokens — ONE MIGRATION.md row.

---

# FAMILY F5 — MOTION (family gate: `proof:motion`)

## F5.1 · `BG.W-MOTION-SPINE` (GD-FOLD-2 · one engine, N thin forms — the headline motion fold)

**kind:** merge-waves (CRITICAL). **family:** Motion. **VISUAL.**

**Gestalt approach.** Five morph/reveal leaves are ONE concept (D6-F1): `useLiquidReveal` (285) +
`useDockCtaReceive` (349) + `useBloomUp` (449) + `useCelebrationBurst` (261) + `useLiquidMorph` (462) all
instantiate `new ElementMorph(…)` over the identical hand-rolled rAF `step()` loop, differing only in
direction / endpoints / channel-set — parameters, not engines. `useLiquidReveal.ts:72` even comments the
copy-paste. Transpose the scroll cluster's proven one-reader/N-machine pattern onto morph.

**deliverables:**
- Mint ONE primitive `useElementMorph(surface, { from, to, direction, channels, preset, origin,
  respectReducedMotion })` in `src/composables/motion/useElementMorph.ts` over kf `flipShared`
  (verified imported-never-called at `suite.ts:42`) + `ElementMorph` + `springTimingFunction`:
  - **from/to:** rect providers (`Ref<El|Component>` via the shipped `asElement`, a literal `DOMRect`, or
    `'self-inset'`).
  - **direction:** `'in' (1→0)` | `'out' (0→1)` | `'flip' (a↔b in place)`.
  - **channels:** declarative `{ opacity?, blur?, color?, squish?, spawn? }`, each a coupled compositor lane
    sampled off the ONE spring clock (`SPRING_PRESETS`).
- Rewrite `useLiquidReveal` / `useDockCtaReceive` / `useBloomUp` as ~15-line named wrappers over
  `useElementMorph` (BYTE-IDENTICAL public API, clean-break internals — no alias). Delete the copy-pasted
  `step()` bodies.
- **The orphan deletes (`useLiquidMorph` + `liquid-morph.css` 850L, `useCelebrationBurst`) are OWNED BY
  DEV-A2's dead-cut wave — this wave does NOT delete them; it (a) folds `useCelebrationBurst`'s petal-spawn
  into the `spawn` channel so the FLIP primitive covers the emphatic case, and (b) re-points the 2
  `useLiquidMorph` demo stories (`Spotlight.vue`, `DockExampleTile.vue`) onto `useElementMorph`.** Ownership
  stated ONCE (§0); this wave references it.
- Press-tower collapse (GD-m1/D6-F5): fold `useSpringPress` INTO `useLiquidPress` with a `squish:false` bare
  mode; Button consumes `useLiquidPress({ squish:false, pressVar:'--glass-btn-press-t' })`. Re-point
  `proof:button-glass` B2 off the separate-export assertion onto direct composition of the unified leaf.
- `useScrollPin` → `mode:'pin'` on `useScrollScene`; `useGooMorph` → `useMorphField` `edges:2` case
  (the DEFINITION-ABSENT of `useScrollPin`/`useGooMorph`/`useSpringPress` is owned here as pure leaf-fold,
  NOT the DEV-A2 dead-cut — these are live-consumer folds, distinct from orphan deletes; DEV-A2 owns the
  ZERO-consumer deletes).

**gate clauses (arm of `proof:motion`):** `element-morph-single` — exactly ONE FLIP rAF `step()` loop in
`src/composables/motion/`; `useLiquidReveal`/`cta`/`bloom` are ≤20-line wrappers (no `new ElementMorph`
outside `useElementMorph`); `useSpringPress`/`useScrollPin`/`useGooMorph` DEFINITION-ABSENT. Collapses
`proof:liquid-reveal`/`-bloom-up`/`-dockmorph-cta`/`-press-unify` into ONE `element-morph` arm + a
`press` arm on `useLiquidPress`. + self-test bites per collapsed leaf.

**paint close:** `tests-visual/element-morph.spec.ts` — each collapse (reveal / cta-receive / bloom / press
/ spawn-celebration) proves the wrapper paints identically-or-better than the pre-fold ground; the bloom
frame-series + the mid-flight interrupt + PRM single-paint, BOTH modes, Chromium + WebKit.

**fableArm:** Fable reviews reveal/cta/bloom via DesignSync (the bloom frame-series is a gestalt judgement).
**designSyncSurface:** the reveal/cta/bloom card set (frame-series stills), both modes.

**preconds:** DEV-A2 dead-cut (orphan deletes) LANDED or CO-SEQUENCED. **MIGRATION:** none — the public
wrapper APIs are byte-identical; `useSpringPress`/`useScrollPin`/`useGooMorph` retire clean-break with ONE
MIGRATION row each (consumers re-point to the surviving leaf/mode). ~2,000 LOC TS + ~1,000 CSS reclaimed
(the CSS reclaim is DEV-A2's `liquid-morph.css` delete).

---

## F5.2 · `BG.W-LIQUID-WEIGHT-DEFAULT` (GD-FOLD-4 · the architectural inversion + the Fable sweep gate)

**kind:** new-wave (MAJOR — the liquid-weight mandate). **family:** Motion. **VISUAL.**

**Gestalt approach.** Liquid-weight-UNIVERSAL is an opt-in allowlist, not architecture (D6-F4/GD-M2):
`--motion-weight: 0.618` at `:root` reaches a surface only if that surface's recipe explicitly reads it
(~26 hand-enumerated sites); the DEFAULT interactive-transition register is a plain `--ease-standard`
bezier with zero weight. Invert it: weight becomes a property of the transition VOCABULARY, not a per-site
checklist. (SYNTHESIS ruling 6 / X3: this is the TRANSITION-default only; the universal liquid-ENTRANCE
`v-liquid-enter` is a successor seed.)

**deliverables:**
- Mint `--transition-liquid-spatial` — a spring-derived `linear()` curve on the per-spring settle clock,
  GENERATED by `scripts/regen-spring-tokens.mjs` (drift-proof, the exemplar pattern), scoped to the SPATIAL
  property group (`transform`/`scale`/`translate`/`rotate`). The EFFECTS legs (color/opacity/shadow) KEEP
  `--ease-standard` bezier (P1 spatial/effects split preserved).
- Apply it at the BASE interactive-atom layer (`src/styles/utilities/base.css` / the interactive-atom
  `@utility`) so EVERY interactive surface inherits weight on its spatial legs by default.
- The calm opt-out is `.motion-calm { --transition-liquid-spatial: var(--ease-standard) }`; the `<Card>`
  calm register becomes an EXPLICIT opt-out, not the accidental default.
- PRM + compositor-only fall out for free (the existing `--motion-weight: 0` PRM carve + `proof:no-layout-
  animation` cover the whole spatial group — safe by construction).

**gate clauses (arm of `proof:motion`):** `liquid-weight-default` — the base interactive-transition register
resolves to the spring-derived `linear()` (not a bare bezier); `proof:motion-canon`/`no-layout-animation`
extended in place to assert the DEFAULT register is spring-derived. **The load-bearing bar is the Fable
sweep** (below), recorded as a gate INPUT: the wave does NOT close until the Fable storybook sweep verdict
is filed.

**paint close:** `tests-visual/liquid-weight-default.spec.ts` — a bare `hover:scale`/`transition:transform`
surface (one that reads NO `--motion-weight` today) now carries weight/bounce on its spatial leg; a
`.motion-calm` surface does not; PRM snaps both; BOTH modes, Chromium + WebKit.

**fableArm (LOAD-BEARING — this is the wave's real gate):** Fable sweeps the FULL storybook for surfaces
that suddenly (correctly) gain weight and FLAGS any that should opt out (`.motion-calm`). The wave closes
only when Fable files the sweep verdict (PASS + the opt-out list). **designSyncSurface:** the full
interactive-surface inventory as a before/after weight sweep.

**preconds:** F5.1 (shares the spring register / press collapse). **MIGRATION:** interactive surfaces
gain weight by default — a design UPGRADE; a consumer wanting calm adds `.motion-calm`. ONE MIGRATION row.

---

## F5.3 · `BG.W-DISCLOSURE-ROTATE` (FC-B8 + B6-FC2 · the chevron register + the Tailwind-utility detector widen)

**kind:** new micro-wave + gate-widen (MAJOR — gestalt cohesion, live). **family:** Motion. **VISUAL.**

**Gestalt approach.** The same disclosure chevron paints in THREE registers, one FLAT (verified: Accordion
`transition-transform duration-200` flat, Select `[transition:rotate…ease-cartoon-punch]`, Configurator
bare `rotate-180` no transition). Mint ONE register; the three collapse in one edit (substitution over
re-declaration). AND the gate authored to catch it (`proof:spring-ease` S6) is blind to Tailwind-utility
transitions (its regex matches only CSS colon-declarations) — widen it, as a FAMILY-gate arm.

**deliverables:**
- Mint ONE `@utility transition-disclosure` (or a `--disclosure-rotate` clock/curve token pair) in
  `src/styles/utilities/base.css` — the single canonical chevron gesture (spring curve + own settle clock +
  arrival ease).
- Re-point Accordion (`AccordionTrigger.vue:35`), Select (`SelectTrigger.vue:138`), Configurator
  (`ConfiguratorLayer.vue:143`), and any DropdownMenu/NumberField-stepper caret onto it. Supersedes the
  WS10 per-site accordion line.
- Widen `proof:spring-ease`'s `detectAbruptSpatial` (`proof-spring-ease.mjs:539`) to ALSO scan `.vue`
  template class attrs for the Tailwind spatial forms (`transition-transform`, `transition-[…transform…]`,
  `[transition:(rotate|scale|translate|transform)…]`, a `duration-N`/`ease-*` on a `data-state`/
  `group-data-*` transform toggle) — flagging any resolving to a non-spring clock with no `--spring-*`
  token. **This widen folds as a CASE ROW in `proof:motion`, not a forked gate** (C-1 resolution).

**gate clauses (arm of `proof:motion`):** `disclosure-single-register` — Accordion/Select/Configurator
carets resolve the SAME clock+curve (born-RED on the 3-way divergence); `abrupt-spatial-tailwind` — the
widened detector flags a synthetic flat `transition-transform duration-200` on a template `.vue` (born-RED
witness = the accordion chevron pre-fix). + the missing-transition CENSUS (B6-FC3): a
`docs/tranches/BG/audit/missing-transition-census.md` enumerating every `v-if`/`v-show`/class-toggle state
change with no motion, each routed to a register or an explicit "instant by design" exemption (the census
is what makes "UNIVERSAL" decidable — a positive allowlist closes the set).

**paint close:** `tests-visual/disclosure-rotate.spec.ts` — Accordion + Select + Configurator open, side by
side, BOTH modes, Chromium + WebKit; assert all three chevrons SETTLE on the same clock (none SNAP).

**fableArm:** Fable decides the ONE arrival ease (cartoon-punch overshoot vs calm snappy settle — a small
quick control, a gestalt call). **designSyncSurface:** the Accordion/Select/Configurator disclosure
surfaces as one card set.

**preconds:** F5.2 (the spring register); sequence the gate-widen to land WITH the register so the red
window is bounded. **MIGRATION:** none (a11y/gestalt improvement, no API change).

---

# FAMILY F6 — COMPONENTS / API (family gate: `proof:encapsulation`; ratchet: `proof:no-god-module`)

*The three grammar waves are D4 FC-1/2/3 verbatim shapes, id'd in the BH band (they land BEFORE BH B2's
`/api` fold — SYNTHESIS ruling 5 / D4 sequencing — or B2 re-publishes the fragments). `proof:size-grammar`
+ `proof:motion-axis` land as ARMS of `proof:encapsulation` (gate-per-family, GC-FC1).*

## F6.1 · `BH.W-AXIS-GRAMMAR` (D4-FC1 · mint the ONE axis vocabulary + kill the homonyms)

**kind:** new-wave (mechanical; pure new file + renames, near-zero visual). **family:** Components/API.

**Gestalt approach.** `useSurfaceAxis` is the ONE axis done right (a union + a resolver + a `[data-surface]`
seam, 21 components) — the MODEL the rest must copy. Mint the missing grammar types in the same
neighborhood; adopt by clean break.

**deliverables:**
- `src/components/ui/_shared/axes.ts` (new) exporting `Size` (`"xs"|"sm"|"md"|"lg"`, default `md`),
  `Orientation` (`"horizontal"|"vertical"`, default `horizontal`), `Motion` (`"full"|"reduced"|"off"`,
  default `full`), re-exporting `Surface` from `useSurfaceAxis` — so ALL FOUR grammar types have ONE import.
  Rung names EQUAL the `--control-h-*` token cohort the props already resolve (the transposition: the prop
  word EQUALS the token word).
- Move the inline `orientation` literal (≥5 copies: `useDockShellProps.ts:72`, SegmentedTabs, DockLayerGroup,
  Separator, timeline/slider) into `axes.ts` (pure factoring, zero value change).
- **Homonym kills (FC-B4/GB-4):** `SurfaceTier` becomes THE visual-rung type; rename GlassPanel's
  visual-rung prop `variant`→`tier` and its render-backend prop OFF `tier` (kill the Card/GlassPanel
  homonym — verified `Card.vue:100` `CardTier` vs `GlassPanel.vue:42` `GlassTier` + `:50`
  `GlassPanelVariant`); fold `CardSurface`/`SkeletonSurface`/`BadgeVariants['surface']` onto `Surface`;
  move `cartoon` off the surface axis onto its own decoration axis (Card-local); rename `TabsIndicator`'s
  boolean `surface`→`plate`.
- Fix the `Surface` doc drift (D4-5/FC-4): `useSurfaceAxis.ts:15` "three-rung"→"four-rung"; carry the
  4-member `Surface` + correct subpath count through the CLAUDE.md-delete redistribution.
- Publish the 4 grammar types on the root barrel AND a types-only `/axes` subpath (the honest `/api`
  discovery successor — 4 axis types, not 203 grab-bag). Register `axes.ts` in BH's `regen-exports.mjs` so
  `/axes` is GENERATED, not hand-listed (amends BH B2.2 — folds D4-FC5).

**gate clauses (arm of `proof:encapsulation`):** `axis-grammar` — no private surface/tier/density union
outside `_shared/axes.ts`; no prop-name homonym (a `tier` prop means visual-rung everywhere; a `variant`
prop is never a surface-rung); `Surface` is 4-member; born-RED on HEAD (the Card/GlassPanel homonym + the
inline orientation copies).

**paint close:** none (pure type/rename move — assert byte-identical computed styles via the existing
component π; a rename that changes a pixel is a finding). **fableArm:** none (mechanical).

**preconds:** BH B2.1-mech (the generator exists); lands BEFORE B2.1-swap (so `/axes` is in the regen'd
entry set). **MIGRATION:** the GlassPanel `variant`→`tier` rename + `TabsIndicator surface`→`plate` +
`cartoon` reclassify are clean-break — ONE MIGRATION row each (the 5.0.0 cut).

---

## F6.2 · `BH.W-SIZE-UNIFY` (D4-FC2 · clean-break the size/density collision onto `Size`)

**kind:** new-wave (clean break, no alias). **family:** Components/API.

**Gestalt approach.** The single most-used axis — "how big/how tight" — is spelled THREE incompatible ways
(`default`/`md`/`comfortable` are the SAME rung; the two "density" unions are different SETS — verified 6
divergent unions in D4-1). ONE word for the compactness axis, library-wide.

**deliverables:**
- Rename every `size` middle rung `default`→`md` (Button `index.ts:201`; `ControlSize`→`Size` in
  `useControlSize.ts`).
- Fold dock `density`→`size` (`compact`→`sm`, `comfortable`→`md`, `spacious`→`lg`, `audacious`→`xl`
  extension) and configurator `density`→`size` (drop `mobile` — it is a responsive `@media(pointer:coarse)`
  token state, NEVER a chosen rung). DELETE `ConfiguratorDensity`/`DockDensity` types.
- Split the two axis conflations OFF `size`: Button `icon`/`icon-sm` → an orthogonal `iconOnly` boolean
  (icon-only is a SHAPE); chip `cell` → a `shape` flag (a silhouette).
- Component sub-ranges are LEGAL restrictions of the ONE `Size` union, never new unions (inputs `sm|md|lg`,
  chips `sm|md|lg`).

**gate clauses (arm of `proof:encapsulation`):** `size-grammar` — NO component exports a `density` prop; NO
`size` union contains `default`/`comfortable`/synonyms; every `size` rung ∈ `Size`; born-RED on HEAD (6
divergent unions). The migration-map arm records the key-renames for the by-name consumer asks (BH B2.2's
203-row precedent).

**paint close:** none (rename; byte-identical rendering via existing π). **fableArm:** none.

**preconds:** F6.1 (`axes.ts` minted); coordinate the dock `density`→`size` rename with any BG dock-token
wave (same `--dock-scale` neighborhood — avoid a double-touch; sequence after F6.5's dock decomposition).
**MIGRATION:** `density`→`size` on Dock + Configurator; `default`→`md` on Button/inputs/Slider — clean-break
renames, one MIGRATION row (the 5.0.0 cut).

---

## F6.3 · `BH.W-MOTION-AXIS` (D4-FC3 · collapse the seven-boolean motion scatter onto `Motion`)

**kind:** new-wave (clean break). **family:** Components/API. **VISUAL.**

**Gestalt approach.** The "opt into physics" intent is an unnamed scatter (`draggable`/`pressable`/`spring`/
`liquidDrag`/… — D4-4). The liquid-weight-universal law means physics is the DEFAULT — the axis is an
opt-DOWN, not an opt-in matrix.

**deliverables:**
- Replace `draggable`/`pressable`/`spring`/`liquidDrag` with the single `motion` axis (`full` default). An
  interactive Card/Tab/Slider animates by default; a static plate is a non-interactive Card, not
  `pressable=false`.
- KEEP the genuinely-distinct gesture CONTRACTS as their own props (`keepDockOpen`, `dragDismiss`,
  `responsive`) — these are contracts, not motion-intensity (folding them into `Motion` would be the inverse
  over-unification smell).
- `prefers-reduced-motion` still forces `full`→`reduced` at the CSS layer (the OS setting is involuntary;
  the prop is the consumer's manual override).

**gate clauses (arm of `proof:encapsulation`):** `motion-axis` — no component exposes
`draggable`/`pressable`/`spring`/`liquidDrag`; the `motion` axis resolves the same physics the booleans did;
born-RED on HEAD.

**paint close:** `tests-visual/motion-axis.spec.ts` — the press/drag gestalt across Card/Tab/Slider/Dialog
under `motion="full"` vs `motion="reduced"`, BOTH modes, Chromium + WebKit.

**fableArm:** Fable reviews the press/drag gestalt across Card/Tab/Slider/Dialog (this IS a visual wave per
the directive). **designSyncSurface:** the interactive-gesture card set.

**preconds:** F6.1; independent of F6.2 (different props — can run concurrent). Pairs with F5.2
(liquid-weight default — the CSS default and the prop axis are the same inversion at two layers). **MIGRATION:**
`draggable`/`pressable`/`spring`/`liquidDrag` → `motion` — clean break, one MIGRATION row.

---

## F6.4 · `BG.W-CHART-FAMILY` (GD-FOLD-7 half · the endorsed data ADD, family-barrel posture)

**kind:** new-wave (MAJOR — one of the two user-asked ADDs). **family:** Components/API (Data). **VISUAL.**

**Gestalt approach.** The `--chart-*` tokens have a phase-bus consumer but NO chart component (verified:
`useProgressGeometry`/`MetricRow`/`MetricCell`/`icon-chip` read `--chart-*`; no `<GlassChart>`). Give them
their first real consumer — and demonstrate the REDUCED surface grain (GD-M5), landing on a `/data` FAMILY
barrel, NOT a 78th singleton subpath.

**deliverables:**
- `src/components/custom/chart/` (colocation dir: `GlassChart.vue` + `composables/useChartGeometry.ts` +
  `constants.ts` + `README.md`) — a thin SVG-path chart (line/area/bar), NATIVE-first (NO charting dep),
  reading the `--chart-*` tokens + the warm identity, compositor-only motion (the reveal wrapper from F5.1),
  PRM-gated.
- Publish on a `/data` FAMILY barrel (`@mkbabb/glass-ui/data` — GlassChart + the metric family + data-table
  re-home as the family surface), NOT `/chart` singleton. Coordinate with BH B2's export reshape so the
  subpath count does NOT grow by a singleton.
- The DEFAULT palette is the warm identity / brand `--chart-*` ramp; a consumer passes its OWN series
  palette (presets-in-consumers — no consumer hue enters a library token).

**gate clause (arm of `proof:encapsulation`):** `chart-family` — `<GlassChart>` exists ONCE with the
colocation dir + the publication binary; NO charting dependency in `package.json`; the `--chart-*` tokens
resolve a live consumer (born-RED on HEAD = 0 chart consumers); the `/data` family barrel carries it (not a
singleton subpath — the subpath count does not grow).

**paint close:** `tests-visual/chart-family.spec.ts` — a line + area + bar chart over the warm ramp, BOTH
modes, Chromium + WebKit; the series read the `--chart-*` hues; a consumer-palette override re-paints.

**fableArm:** Fable authors the chart gestalt (the glass-material chart as a designed artifact — axes,
gridlines, series, the reveal). **designSyncSurface:** the chart card set (line/area/bar), both modes.

**preconds:** F5.1 (the reveal wrapper for the compositor entrance). **MIGRATION:** additive (new family) —
one MIGRATION.md note (the `/data` family barrel). **Cross-ref F8 GD-FOLD-5:** the chart GL/JS weight rides
the NET-budget assertion (it must not launder a WebGPU-demigrate win).

---

## F6.5 · `BG.W-GOD-MODULE-STRUCTURAL` (GA-4 + FC-B10 · decompose ONCE, harden the ratchet contract)

**kind:** new-wave (HIGH — the ratchet is RED at HEAD). **family:** Components/API (dock owner).

**Gestalt approach.** The ratchet is RED (`ladder.css` 527, `shell.css` 510, 16 grandfathered baselines
incl. `GlassDock.vue:711`) and structurally self-defeating (a new baseline is grandfatherable rather than
blocking — it normalizes the disease it kills). Stop re-carving; re-architect ONCE + change the CONTRACT.

**deliverables:**
- **The dock decomposition, ONCE.** Audit WHY `GlassDock.vue` (711L) + the dock cluster keep regrowing — the
  dock does too many jobs (morph + fission + rail + hold-state + a11y). Do the genuine colocation split:
  extract the rail/hold/a11y concerns into named leaves under `custom/dock/composables/` (following the
  BB.W-CARVE precedent — position-preserving, byte-isomorphic where possible, the reader gates FOLLOW the
  carve into the leaf). Give the dock god-directory (18 files, 3 god-modules) an OWNER (not BH-verify-only /
  BG-grow-only).
- **The two live-RED CSS carves in the SAME wave that grows them** (FC-B10): `ladder.css`'s +38 (the W55
  adaptive-legibility `@container` block) → sibling `glass/adaptive.css` (the rim.css precedent); `shell.css`
  the plate-clearance +12 → existing `dock/density.css`.
- **The ratchet CONTRACT change (GA-4 half):** a new grandfathered baseline REQUIRES a companion
  carve-successor wave-id comment, OR cap the grandfathered-entry count and FAIL once exceeded — forcing
  DRAIN over infinite re-baseline. Correct the 2 stale grandfather baselines (silent refill room).
- **The shader-literal exemption (FC-B10):** land the `*.{wgsl,glsl,frag,vert}.ts` exemption — stop
  splitting cohesive shaders into line-count fragments; the ratchet is LOGIC-only (correct scope).
- **The ratchet-drain chain made VISIBLE (GC-FC8c):** enumerate each of the 16 remaining baselines → its
  owning carve wave → its band in `bg-build-map.md`, so `BG.W-CUT`'s `RATCHET_BASELINES == {}` precond is a
  VISIBLE cut gate. Correct BH PLAN §71's FALSE "drained to ∅".

**gate clause (`proof:no-god-module`, amended in place — its OWN true-positive gate, NOT folded):**
`GlassDock.vue` + `ladder.css` + `shell.css` under 500; the 16 baselines drain (the drain chain is the cut
gate); a new baseline without a companion carve-successor wave-id REDs (the contract change); the shader
exemption is logic-only. Status FAIL→PASS at close.

**paint close:** none (structural carve — byte-identical rendering; the reader gates follow the carve).
**fableArm:** none (mechanical).

**preconds:** none (independent). Sequence BEFORE F6.2's dock `density`→`size` rename (avoid double-touching
the dock cluster). **MIGRATION:** none (internal decomposition; public prop/scalar surface unchanged).

---

# FAMILY F7 — DEMO (family gate: `proof:demo`)

## F7.1 · `BG.W-DEMO-IA-REDESIGN` (GD-FOLD-6 · D3-C1/C2 · the demo as a designed product)

**kind:** new-wave (Fable-designed, MAJOR). **family:** Demo. **VISUAL.**

**Gestalt approach.** The demo is a spec-sheet inventory: 156 pages = component count, no narrative arc,
8 subpaths split across ≥2 pages, trivial atoms get standalone routes, compositions (the "screenshot-for-
Apple" category) is dead last + polluted. Re-DESIGN the page SET before B3 re-STRUCTURES it (SYNTHESIS
ruling 5 / X5 sequencing — B3 pours concrete around the disease otherwise).

**deliverables (Fable authors the taxonomy; opus/sonnet do the mechanical carve):**
- **Narrative arc re-order:** Foundations → Material (glass tiers + substrate gallery) → Elements (atoms) →
  Surfaces (containers + overlays + dock) → Motion → Compositions.
- **Family-page collapse** — ONE page per component FAMILY: ONE data-table (fold table+data-table), ONE
  timeline (fold ×3), ONE metric (fold the ×6), ONE toast (fold toaster), ONE scroll (fold scroll-vt/
  system/choreography, dependency order), ONE input-family (inputs/textarea/combobox/select/multi-select as
  sections).
- **Atom absorption** — separator/pulse/status-dot/dark-mode-toggle/label/stacked-icons/scrolling-text
  become SECTIONS of Display-atoms / Forms-controls, not routes.
- Target **~90-100 pages** from 156.
- **The warm-field default fix (GB-5) folds in here as a clause** (it is co-located with the substrate
  gallery + DockStage): change `DockStage.vue:38` default `PRESETS.OPENAI_SKY` (hue 240 cerulean) → a
  warm-amber/identity-aligned preset. The demo-staging field must not be at war with the warm identity.

**gate clause (arm of `proof:demo`):** `demo-earns-page` (C2) — NO two story rows share a component subpath
unless it's a DECLARED family (`data`/`timeline`/`metric`/`forms`/`scroll` allowlist); born-RED on today's
8 collisions (`manifest.ts` dedup), GREEN when each collision is a family page or collapsed. + a
`field-warm-default` bite: the DockStage default preset resolves a warm dominant hue (not cerulean 240).

**paint close:** `tests-visual/demo-ia.spec.ts` — the new category-landing arc + a family page (metric or
timeline) rendering N members on ONE surface, BOTH modes; the DockStage field is warm.

**fableArm:** Fable authors the target taxonomy + page list + the arc (the whole point — the directive
routes ALL IA/design to Fable). **designSyncSurface:** the section-landing bento + the new category order,
as a card-based review.

**preconds:** F7.2 (`W-CHASSIS-ADOPT-OR-RETIRE` — the anatomy decision is the PARENT; the family-tab
affordance is the MECHANISM that makes the collapse possible without long-scroll). **Sequence hard-wire
(ruling 5):** F7.2 (anatomy decide) → F7.1 (IA redesign) → live-render fill → `-MANIFEST-COLOCATE` → BH B3
δ5/δ6 (consume the REDUCED ~90-page set, dropping ~50 dir moves). **MIGRATION:** none (demo-private).

---

## F7.2 · `BG.W-CHASSIS-ADOPT-OR-RETIRE` (FC-B1 · the gestalt centerpiece — decide, never keep both)

**kind:** decide + Fable-authored migration (CRITICAL — the headline of GB-1). **family:** Demo. **VISUAL.**

**Gestalt approach.** Every "conformity by construction" chassis of the last tranche shipped un-adopted
(DemoFrame 0 real pages, the unified header a 36× inline copy-paste, VizStudio 1/6, StorySectionHeader 0
consumers). The no-legacy law made literal: DECIDE adopt-or-retire for each; never keep both.

**deliverables:**
- **Page anatomy — PICK (Fable decides via DesignSync):** (a) adopt `DemoFrame` across content pages + unify
  the hero path onto the same cel register, OR (b) retire `DemoFrame.vue` + `demo-frame.css` (~350 dead
  lines) and standardize on `StorySection` + `ShowcaseFrame` with ONE enforced `tier` contract. Route the
  choice to Fable BEFORE the migration.
- **Story identity header — actually DELIVER the unified header:** add `:section`/`:icon`/`:accent` to the
  ONE chassis header so the IconChip + tinted eyebrow + accent rail render ONCE, keyed off the manifest row;
  DELETE the 36 inline `<header>` blocks + the verbatim `borderLeft` copy-paste + the duplicate eyebrow. The
  motion masthead becomes `:accent`, not a fork. (Absorbs the StoryHeader cluster + gravity entrance already
  in `StoryHeader.vue`.)
- **VizStudio — adopt** onto `{blob, fourier-field, concentric, paper-grid}` (+ `constellation`
  case-by-case); this subsumes the blob (870L) / constellation (759L) monolith split.
- **StorySectionHeader — DELETE** (0 consumers; the target pattern is already eliminated).
- **False-comment fixes (B1-FC5):** correct the "by construction" comments (`DemoFrame.vue:19-25/35-37`,
  `StoryPage.vue:118`) that claim adoption that does not exist.
- **The family-tab affordance (C6):** the surviving chassis gains ONE family register (a `<SegmentedTabs>`/
  section-switcher) that shows N family members on one page — the MECHANISM F7.1's collapse needs (dogfoods
  the library's own nav).

**gate clause (arm of `proof:demo`):** `chassis-adopted` — the picked page anatomy renders on ≥N real pages
(not 0); DemoFrame is either adopted OR DEFINITION-ABSENT (never both-alive); StorySectionHeader
DEFINITION-ABSENT; the unified header renders the IconChip/eyebrow/accent ONCE (0 inline `<header>` copies
in the story set); VizStudio adopted on the 4 named viz pages; born-RED on HEAD (0 DemoFrame pages, 36
inline headers, StorySectionHeader present).

**paint close:** `tests-visual/chassis.spec.ts` — the adopted anatomy on a representative content page + a
viz studio + a family-tab page, BOTH modes.

**fableArm:** Fable makes the adopt-or-retire anatomy DECISION + authors the unified header cel register (a
gestalt call — one cel anatomy across 4-5 representative pages, reviewed BEFORE the migration).
**designSyncSurface:** the candidate anatomies (DemoFrame cel vs StorySection/ShowcaseFrame) across 4-5
representative pages, as the decision card set.

**preconds:** none (this is the PARENT of F7.1 — the anatomy decision precedes VizStudio adoption per C-2,
and the family-tab affordance precedes the IA collapse). **MIGRATION:** none (demo-private).

---

## F7.3 · `BG.W-DEMO-DUP-MERGE` (FC-B9 · the mechanical dup collapse)

**kind:** new-wave (mechanical, low-risk). **family:** Demo.

**Gestalt approach.** Concentrated content duplication (not sprawl — the taxonomy is otherwise sound):
Timeline×3 and Scroll×3 fragment one topic into three nav entries; `compositions/` holds 2 atom-scale
misplacements. Copy-the-render-body-delete-the-wrapper (the `curve-gallery.vue` exemplar), zero behavior
change, one nav entry each.

**deliverables:**
- Timeline×3 → ONE `data/timeline.vue` with 3 `<StorySection>` registers (discrete/segmented/continuous).
- Scroll×3 → ONE `motion/scroll.vue` (native→reader→choreography, dependency order).
- Re-home `compositions/labeled-field.vue` → `forms/`; fold `compositions/icon-tooltip.vue` into
  `containers/tooltip.vue`; move `compositions/configurator` + `compositions/instrument-chassis` OUT to
  their component family pages (D3-C4 de-pollute).
- Nest `demo/stories/aurora/` → `substrates/aurora/` (out of the `./*/*.vue` glob — the B8-F8 depth-nest,
  a single `git mv`, NOT B3 δ6's glob-to-`index.vue` migration; GC-FC11a adopts this verbatim).
- Net ~120→~115 pages (this is the mechanical layer; F7.1 is the design layer that takes it to ~90-100).

**gate clause (arm of `proof:demo`):** folds under `demo-earns-page` (F7.1) — the collisions this closes are
the same 8; no separate gate.

**paint close:** none (render-body-identical merge — the pages render the same specimens).
**fableArm:** none (mechanical — Fable owns F7.1/F7.2's design). **designSyncSurface:** none.

**preconds:** F7.1's family-page taxonomy (consume the reduced set). **MIGRATION:** none (demo-private;
nav entries change — one demo-doc note).

---

## F7.4 · `BG.W-PAGE-COMPONENT-AUDIT` amend (GA-10 · complete the 7 un-converged Pass-E categories)

**kind:** amend-wave (MEDIUM — the user's "missing obvious issues" by ACTUAL coverage). **family:** Demo.

**Gestalt approach.** The user commissioned the 118-page deep audit; only dock/forms/foundations/substrates
GESTALT'd — display/containers/data/feedback/navigation/compositions + the motion gestalt never converged
(~104 of 156 pages never got the deep audit). `W-PAGE-COMPONENT-AUDIT` (17.6) as-written is a
capture-VERIFY of the roster, not a re-audit of the 7 missing categories.

**deliverables:** amend the wave to ADD a per-category convergence pass (the same 3-context + synthesis +
gestalt engine, batched-3) over display/containers/data/feedback/navigation/compositions + the motion
gestalt. Run it against the REDUCED page set (F7.1) so it audits the ~90-100 designed pages, not the 156
inventory. Findings that surface become fix-clauses on their owning family wave (not new waves — the
overhead floor).

**gate clause:** rides the `proof:demo` + `proof:warm-identity` composited paint battery (F8) — each
newly-audited category's representative route enters the paint roster.

**paint close:** the 7 categories' representative routes enter `proof:warm-identity`'s route battery (F8.2),
BOTH modes, Chromium + WebKit — the ACTUAL coverage, not a roster capture.

**fableArm:** Fable owns the per-category gestalt verdicts (the design-quality judgement). **designSyncSurface:**
each of the 7 categories' landing + representative pages, as review card sets.

**preconds:** F7.1 (audits the reduced set). **MIGRATION:** none.

---

# FAMILY F8 — CLOSE / CUT (family gates: `proof:build`, `proof:meta`, `proof:warm-identity`)

## F8.1 · `BG.W-GATE-FAMILY-CONSOLIDATE` (GD-FOLD-1 steps 1-5 + GC-FC4 · the gate-machine transposition)

**kind:** new-wave cluster (CRITICAL — the single most important structural fold). **family:** Close.

**Gestalt approach.** 360 gates / 127K LOC, ~0.66% reads paint; 172 hand-paste a comment-strip detector; the
one paint gate (`ba-gestalt`) is vacuous (mean-L box over an author-declared surface) so 4.2.0 shipped
visibly broken GREEN. COLLAPSE toward ~40-60 family gates over a shared detector kit + data tables, and
make paint the PRIMARY release gate. Sequenced as ONE coherent program (resolves X1/X2 — the detector-kit
defer, BH-B5d, is UNDONE; the "blast radius" argument is backwards: a family gate over a data table has no
blast radius).

**deliverables (5 sequenced steps):**
1. **Detector kit** `scripts/lib/detect/` (comment-strip, class-token, css-var-resolve, `@keyframes`-walk,
   token-ceiling), each primitive born-RED self-tested ONCE. The 172 pasted detectors re-point to it. (The
   kit builds on the existing `scripts/lib/` — `paint-arm.mjs`, `surface-closure.mjs` already ship.)
2. **Paint-first inversion → `proof:warm-identity`** (F8.2 is the standalone spec; this step WIRES it as the
   PRIMARY release gate) — a DERIVED paint battery over real routes via `surface-closure.mjs`, both engines
   (Chromium + WebKit — closes the Safari-parity chronic), widened predicates (hue band + chroma ceiling +
   edge-cast + top-bar + corner-clip + route-navigates), over the ONE `paint-arm`/`reflect-capture-verify`
   kernel. `ba-gestalt` becomes ONE enrolled surface, NOT the sole oracle (it is re-derived: its vacuous
   mean-L box → the composited-region dominant-hue kernel of F8.2). Folds Group A's five paint waves.
3. **Family consolidation 360→~40-60** over `{detector, target, predicate, rationale}` tables:
   `proof:glass`, `proof:paper`, `proof:motion`, `proof:dock`, `proof:viz`, `proof:encapsulation`,
   `proof:demo`, `proof:build`, `proof:warm-identity`, `proof:meta` (+ the ~15 true-positive singletons D2-§6
   keeps). **Gate lifecycle** (ACTIVE/FROZEN/RETIRED): the ~155 pre-BA singletons → ONE batched
   `proof:frozen-invariants` sweep.
4. **Prune the decision-lock + dead-mechanism gates** — `proof:spring-crisp` (locks a no-op non-mint),
   `proof:nda-decided` (locks an unchangeable retire), `proof:dock-fission`/`bloom-up`/`celebration-burst`/
   `liquid-morph` (lock zero-consumer mechanisms) — facts move to the fold-ledger. **PRUNE the 14
   doc-presence `claudeMd` clauses** (GC-FC4-2) from the soft-reader gates (surface-axis, spa-view, easing,
   dropdown, phase-palette, dock-unify, split-chars, handmark, on-glass-fg, readme-meta-clean,
   dock-rail-realize, close-battery-parity, doc-override-idiom, accent-tone) — they assert a prose sentence
   EXISTS, nothing functional. **Dissolve the 2 real readers** (GC-FC4-3): generate `structure.md` +
   `dependencies.md` from disk; replace `proof:claude-structure-sync`'s dir-diff with a `committed == regen`
   freshness assert; point `doc-consistency`'s dep-rot arm at the generated table. Target **360 → ~250 with
   ZERO behavioral assertion lost.**
5. **Plan-doc:** record the 3-kind taxonomy + the ~40-script/~15K-line economy + the derived-not-declared
   principle as a standing precept (without it the next tranche re-accretes to 500 gates).

**gate clause (`proof:meta` — the gate-count self-gate):** `--list` count DROPS (inverse of the byte-identical
re-home); a manifest diff enumerates each pruned gate + its subsuming category gate; the retired gates' bites
are demonstrably subsumed (a census table); `--run full` GREEN over real code with ~40-60 gates; born-RED
against a synthetic regression each family invariant must catch.

**PROTECT (SYNTHESIS §4 / GD-FOLD-1 bar):** the true-positive engine — `live-verified-ledger` (caught 11
real BD regressions), `fold-ledger`, `profile:budget` JS ceilings, the paint-decoupled dual-engine per-wave
verify, batch-3, literal PASS, the disposition ledger, `--run full` union at the cut, the foreign-tree fence.

**paint close:** the whole `proof:warm-identity` battery (F8.2) IS the close artifact. **fableArm:** none
(mechanical gate work; the paint battery's verdicts route to Fable per F8.3). **designSyncSurface:** none.

**preconds:** F8.2 (the paint kernel it wires as primary). **MIGRATION:** none (CI-internal).

---

## F8.2 · `BG.W-COMPOSITED-GESTALT-GATE` (GA-2 · measure the whole, not the part)

**kind:** new-wave (CRITICAL — the machine half of the gestalt-review seam). **family:** Close. **VISUAL.**

**Gestalt approach.** Completes BC's "measure paint not source" thesis at the composited WHOLE. BC's paint
gate catches isolated-surface grayness but a warm token composited over an achromatic page still reads gray
(GF1: BD's greenfield had to re-diagnose by hand — shipped Button rest fill oklab chroma 0.0138 "NEAR-GRAY").
Change WHAT the probe samples, not the kernel.

**deliverables:**
- `proof:warm-identity` — capture a REAL route (not a synthetic specimen) at rest with NO injected ancestor
  override, over `surface-closure.mjs`'s enrolled route set, in BOTH modes on Chromium + WebKit. Assert the
  DOMINANT hue family of the composited screenshot region is warm (reuse the existing `paint-arm.mjs` color
  probe — change it from mean-L over a 20%×12% box to a dominant-hue histogram over a route REGION). Widened
  predicates: hue band + chroma ceiling + edge-cast + top-bar-present + corner-clip-absent + route-navigates.
- Re-derive `ba-gestalt`: its author-declared roster becomes ONE enrolled surface in this battery, NOT the
  sole oracle; its vacuous mean-L box → this dominant-hue kernel. (The roster is already re-pointed to
  `docs/tranches/BG/audit/reflect/bg-gestalt-roster.md` — the residual is the probe + sole-oracle, fixed
  here.)
- Directly closes the F2/F3 failure mode the greenfield found by hand (the near-gray Button over a flat
  page — this gate would have caught it, born-RED on a synthetic 4.2.0-state route).

**gate clause (this IS a family gate — `proof:warm-identity`):** a route's composited dominant hue is warm
in both modes on both engines; born-RED against a synthetic gray-composited route; a self-test plants a
cerulean-field route → RED (the GB-5 field-warmth catch); enrolled in the `--run full` release union (the
PRIMARY paint gate, wired by F8.1 step 2).

**paint close:** `proof:warm-identity` IS the battery — it runs over the real route set as the release gate.

**fableArm:** the MACHINE half; the HUMAN half is F8.3 (Fable's DesignSync PASS verdict) — the two together
are the gestalt-review seam. **designSyncSurface:** the enrolled route captures ARE the DesignSync cards
(F8.3 routes them to Fable).

**preconds:** the detector kit (F8.1 step 1). Pairs with F8.3 (machine + human halves). **MIGRATION:** none.

---

## F8.3 · `BG.W-FABLE-DESIGN-ARM` (GA-3 · the schema edit — encode Fable/DesignSync per visual wave)

**kind:** new-wave + plan-schema-edit (CRITICAL — the freshest binding directive, 0/61 compliant on disk).
**family:** Close.

**Gestalt approach.** The 2026-07-01 Fable/DesignSync mandate is UNENCODED in the entire developed plan
(GF3: `grep -ic fable|designsync` across the plans = 0). The plan as-folded will re-run the exact
opus-fanout-built-visuals pattern the user judged disastrous. Not a checkbox — a SCHEMA edit.

**deliverables:**
- Amend the build-map wave schema: every VISUAL wave declares `fableArm` (the Fable instance owning the
  design authoring / gestalt decision) + `designSyncSurface` (the claude.ai/design card it syncs to). This
  file (DEV-C) already carries `fableArm`/`designSyncSurface` on every visual wave — F8.3 propagates the
  requirement to the whole build-map (the 61 P-waves, GC-FC9).
- Stand up the `/design-sync` skill + surface if unprovisioned (the DesignSync provisioning step).
- Make "the DesignSync review returned a PASS gestalt verdict from FABLE, not the building agent" a CLOSE
  PRECONDITION for every visual wave. The direct cure for "opus-fanout-built visuals judged disastrous."
- Re-stamp `DIRECTIVE-LEDGER` to 07-01 with a `§Process-Edicts` block carrying the Fable/DesignSync routing
  + the edict-gestalt-enforcement (F8.6) as explicit rows (GF16).

**gate clause (arm of `proof:meta`):** `fable-arm-present` — every wave tagged VISUAL in the build-map names
a `fableArm` + a `designSyncSurface`; born-RED on HEAD (0/61); a visual wave closing without a filed Fable
PASS verdict REDs the close.

**paint close:** the Fable PASS verdict IS the close artifact for every visual wave (the human half of the
seam; F8.2 is the machine half). **fableArm:** this wave PROVISIONS the arm. **designSyncSurface:** the
DesignSync project itself (the review surface all visual waves sync to).

**preconds:** none (process wave — lands early so every downstream visual wave inherits the requirement).
**MIGRATION:** none.

---

## F8.4 · `BG.W-CSS-MINIFY` (GD-FOLD-5 · the perf transposition — minify + prune + honest budget)

**kind:** new-wave + prune + amend (MAJOR — the single highest-leverage, cheapest perf fix). **family:** Close.

**Gestalt approach.** The published `/styles` cascade ships UNMINIFIED — critical CSS is 177KB gz with
comments but 22KB minified (comments are ~87% of the weight; `dist/styles/dock.css` = 173 comment lines).
BC.W-CSS-CRITICAL built a whole wave + gate + manifest + a 182KB ceiling to shave a ~13KB split for the
SAME consumer eating ~155KB of comments the mechanism never touches. Do the obvious thing; the ceremony
falls out.

**deliverables:**
- **`W-CSS-MINIFY`:** extend the SFC-bundle minification to every published `dist/styles/*.css` partial
  (strip comments + collapse whitespace — the same Lightning/esbuild-css pass; edit
  `vite.style-assets.ts publishStyleAssets`). `/styles` drops ~200KB→~35KB gz; critical subset 177→22KB gz.
  A build-plugin edit, not a source rewrite (source `src/styles/*.css` KEEPS its comments — publish-time
  only).
- **Prune BC.W-CSS-CRITICAL machinery (X4, conditional-on-minify):** after minify, the split saves ~13KB on
  ~35KB — not worth a wave + gate + manifest + 2 exports. DELETE `src/styles/critical-partition.mjs`,
  `scripts/proof-css-critical.mjs`, the `./styles/critical` + `./styles/deferred` exports (clean break —
  no raw-`<link>`+split consumer found on disk).
- **`profile:budget` measures MINIFIED bytes (FC3):** re-express `scripts/profile-bundle.mjs` to measure the
  minified resolved draw; RETIRE the ten-lift "conscious lift" comment-ledger (lines 68-213); make
  down-rebase the EXPECTED direction. Keep the honest per-chunk JS ceilings.
- **Assert the NET budget drop (FC4 / GD-M8):** amend `W-VIZ-DEMIGRATE` so it proves a SIGNED delta across
  the WebGPU delete (~37.7KB gz + doubled `.wgsl.ts` bodies) AND the WS6 Siri GL add AND the F6.4 chart add
  — not an L15 name-agnostic re-pin that launders the win.
- **Aurora forcing-trigger (FC5):** KEEP-BOOKED the per-medium lazy shader with the REAL trigger
  `dist/aurora.js gz > 54KB` (the next medium/feature that would force an 11th lift MUST build the split, not
  force a lift). Converts the ratchet into a forcing function.

**gate clause (arm of `proof:build`):** `css-minified` — every `dist/styles/*.css` partial has 0 comment
blocks + is single-line (born-RED on the 173-line `dock.css`); `critical-partition.mjs`/`proof-css-critical`
+ the `./styles/critical`/`/deferred` exports DEFINITION-ABSENT; `profile:budget` measures minified bytes +
the CSS ceiling can go DOWN; the demigrate NET delta is signed-negative; the aurora trigger is armed at 54KB.

**paint close:** none (build-payload — assert the minified `/styles` renders byte-identical via the existing
π; a minify that changes a pixel is a finding). **fableArm:** none.

**preconds:** none (build-plugin edit). Sequence the demigrate-NET assert AFTER F6.4 (chart add) + WS6 (Siri
add) so the signed delta includes all three. **MIGRATION:** the `./styles/critical`/`/deferred` subpath
exports retire — ONE MIGRATION row (the union `./styles` STAYS byte-complete; a splitter consumer folds onto
the minified union).

---

## F8.5 · `BG.W-TOKEN-MANIFEST` (D5-FC4 / GD-m2 · make the basis countable — the anti-accretion floor)

**kind:** new-wave (device-free gate + generator, MEDIUM). **family:** Close.

**Gestalt approach.** The token basis is uncountable across FOUR consumption channels (`var()` / Tailwind
`@theme` / Tailwind `prop-(--)` shorthand / JS `readNum`/`readToken`) — 1069 names / 2555 lines / 74 files;
no manifest answers "is this token alive," so accretion is invisible and every tranche nets tokens.

**deliverables:**
- A build-time generator emitting a manifest of every declared token → its consumption channel(s) →
  alive|dead. `proof:token-manifest` FAILS on any token with zero live channel (the genuine dead set:
  `--progress-sectioned-track`, `--tooltip-text`, `--glass-spine-blur/-opacity`, `--phase-color-label`, …)
  unless allowlisted with a rationale.
- This is the STANDING gate that makes F2.2 step 4's dead-token sweep confirmable AND keeps it fixed — a
  dead token can never again survive a close.

**gate clause (arm of `proof:build`):** `token-manifest` — 0 zero-live-channel tokens (unless allowlisted
with rationale); born-RED on the current ~30-50 genuinely-dead set; a self-test plants a dead token → RED
AND plants a Tailwind-`@theme`-only token → GREEN (the channel-aware bite — no false positive on build-time
channels).

**paint close:** none (device-free). **fableArm:** none.

**preconds:** none. Sequence BEFORE F2.2 (its step-4 dead-token sweep reads this manifest). **MIGRATION:**
none.

---

## F8.6 · `BG.W-ARISTOTELIAN-PROPORTION` (GA-9 + GA-5 aristotelian edict · acceptance LANGUAGE, not N gates)

**kind:** amend-wave (plan-schema-edit — NOT N mechanical gates). **family:** Close. **VISUAL (review-arm).**

**Gestalt approach.** The Band-0 aesthetic edicts (√φ proportion, the 12 animation laws, technicolor-cartoon-
punch, aristotelian-proportion) have prose + per-mechanism gates but NO gestalt acceptance path — how
"gestalt cohesion" + "lacking elegance" went unmeasured across three ships. Do NOT mint N mechanical gates
(that IS the ceremony disease — GA-9 is explicit). Transpose the edicts INTO the gestalt review.

**deliverables:**
- Amend the `proof:ba-gestalt` roster (now one enrolled surface in F8.2) + the F8.3 DesignSync review so each
  enrolled surface owes an explicit per-surface VERDICT on three axes: **√φ-proportion-consistent** (every
  radius/spacing/padding is a √φ step off a named anchor; concentric radii; no raw off-ladder `rem`) · **the
  driver carries the animation laws** (anticipation/follow-through/secondary-action) · **reads as technicolor
  cartoon-punch, not flat.** The edicts become the acceptance LANGUAGE of the ONE gestalt gate, not unread
  `DESIGN.md` prose.
- The aristotelian-proportion edict (GA-5's fifth no-carrier register) rides HERE as review LANGUAGE, NOT a
  `proof:aristotelian` singleton (per GA-9's explicit "not N gates" ruling — the machine half is a light
  proportion-census CLAUSE the review reads, not a standing script).
- Resolves the `proof:ba-gestalt`-excluded-from-release seam at the same point (it enrolls in
  `proof:warm-identity`'s release battery — F8.2).

**gate clause (arm of `proof:meta` — a review-completeness assert, not a proportion measure):**
`edict-verdict-present` — every enrolled gestalt-roster surface carries the three-axis verdict; a surface
missing a verdict REDs the close (the acceptance path exists, born-RED on HEAD where 0 surfaces carry it).

**paint close:** rides F8.2's `proof:warm-identity` battery (the enrolled surfaces). **fableArm:** Fable
files the three-axis verdicts (the whole point — the edicts are gestalt judgements only Fable renders).
**designSyncSurface:** the full enrolled roster, each carrying its three-axis verdict.

**preconds:** F8.2 (the roster is one enrolled surface) + F8.3 (the Fable review provisioned). **MIGRATION:**
none.

---

## F8.7 · `BG.W-DEFERRAL-DISPOSITIONS` (GA-6 RETIRE set + GA-5 five no-carrier BD registers)

**kind:** disposition-flip + new/amend sub-waves (MEDIUM — the user's explicit fold mandate). **family:** Close.

**Gestalt approach.** Two halves of the deferral surface. (a) RETIRE the ~6 speculative "wants-it-someday"
registers (over-contrivance re-badged as prudence). (b) Give the five no-carrier BD registers REAL carriers
(the user asked to fold chronic deferrals; these fell through with a ledger row but no buildable wave).

**deliverables:**
- **(GA-6) RETIRE-in-place** (the `BB.W-NDA-DECIDE` terminal-RETIRE discipline, no-delete fence): flip each of
  aurora satin/prism/reactive + tab-ios-capsule + alive-idle + anticipate-follow + concentric-radius
  `DEFER-with-trigger → RETIRE` in `FOLD-LEDGER.json` with a `rationale` + `successor: "a fresh ≥2-consumer
  trigger re-enters the idea"`. Zero pixels, zero mechanism — a disposition flip + a `proof:bg-deferred-ledger`
  re-count. (concentric-radius overlaps F8.6's aristotelian edict — retire the speculative shared-register,
  KEEP the per-surface `containerConcentric` idiom.)
- **(GA-5) the five no-carrier BD registers get real carriers:**
  - `BG.W-AUR-METAL-FINISH` (metallic ×2) — metal as a MEDIUM (uMedium 8/9, mutually-exclusive ladder, NOT
    an orthogonal finish — the greenfield killed the medium×finish "configurator-lie"; `MEDIUM_ID` ceiling
    at kuwahara==7, so metal is uMedium 8/9, discarded `Gx/Gy` tensor). VISUAL → Fable arm.
  - `BG.W-AUR-IMAGE-SOURCE` (blurred-image-bg) — SHARES the ONE texture-upload primitive with `BD.W-DOT-IMAGE`
    (whichever lands first BUILDS it; the other CONSUMES). VISUAL → Fable arm.
  - AMEND `BG.W-DOTFLOW-REBUILD` to carry the advection `flow` register (GPGPU state-texture + two-FBO trail
    + warm-fire ramp, teal-navy-purge fence held) — without it dotflow is un-broken, not surpassing.
  - AMEND `BG.W-STORY-PAGE-API` to restore the `Demo{Stage,Specimen,Interaction,Matrix,Composition}` sub-type
    taxonomy as thin compositions over the chassis (turns "N bespoke spec-sheets" into "one product with
    natural variation" — the gestalt-cohesion cure; coordinate with F7.1/F7.2's chassis).
  - the aristotelian-proportion edict → its carrier is F8.6 (review LANGUAGE), NOT a fifth wave.

**gate clause (arm of `proof:meta`):** `deferred-ledger-terminal` — no `FOLD-LEDGER.json` row carries a
`DEFER-with-trigger` for the 6 RETIRE'd registers (each is terminal `RETIRE` with rationale + successor); the
5 no-carrier registers each name a real wave-spec carrier (born-RED on HEAD where they have a ledger row but
no wave). The metal/image/dotflow builds each carry their own `proof:viz` arm.

**paint close:** the metal/image/dotflow VISUAL sub-waves carry their own `tests-visual/*.spec.ts` (LOCAL
real-GPU, both modes, Chromium + WebKit) — non-authoring dual-engine; the RETIRE flips + the sub-type
taxonomy are zero-pixel. **fableArm:** Fable for the metal/image/dotflow visual sub-waves + the sub-type
taxonomy design. **designSyncSurface:** the aurora metal/image cards + the dotflow field + the story
sub-type set.

**preconds:** F7.1/F7.2 (the story sub-type taxonomy coordinates with the chassis). **MIGRATION:** none for
the RETIREs (ledger-internal); the aurora `medium: metal` + the image-source + the story sub-types are
additive (one MIGRATION note each for the new public config/props).

---

# SUCCESSOR-TRANCHE SEEDS (GD-FOLD-8 verbatim + the three re-grain seeds)

Recorded in `AMENDED-GESTALT-PLAN.md`'s "Successor-Tranche Seeds" section — each with trigger + first-move +
why-not-BG. These are the honest long-horizon; NONE is built now.

1. **Module-surface re-grain** (79 subpaths → ~18 family barrels; BREAKING; the BH `/api`-drop is the first
   move, the full re-grain the tranche after). The largest encapsulation win (GD-M5). *Trigger:* after the BH
   5.0.0 cut settles. *Why not BG:* touches every consumer import — a major break of its own.
2. **DS-completeness tail** (Calendar/DatePicker medium; Kbd/Breadcrumb/Stepper/Tree/Menubar
   decide-don't-overfit census — the census in BG, the builds next). *Trigger:* a real consumer ask per
   component. *Why not BG:* GC-FC6 extracted the Band-4 feature builds OUT of the close (they must carry a
   Fable arm + ≥2-consumer bar, not smuggle into the cut).
3. **Full dynamic-glass terms** (live-refraction mount CSSWG #542, chromatic-aberration rim — the frontier
   half of GD-FOLD-7). BG builds the hue-BLEED chroma term (feeds `--glass-accent`) + the moving/adaptive
   shadow (both live-π'd); the mount + aberration rim DEFER-with-trigger. *Trigger:* CSSWG #542 lands / a
   real refraction consumer. *Why not BG:* the encoding-successor is fenced by the GL byte-identical
   discipline.
4. **Universal liquid-ENTRANCE** (`v-liquid-enter` every surface opts into, Safari-verified — the BROADER
   half of GD-FOLD-4; F5.2 ships only the TRANSITION-default). *Trigger:* F5.2's transition-default settles
   without regression. *Why not BG:* the entrance-general is broader than the bounded transition-register
   inversion (X3).
5. **Safari-parity cadence maturation** (BG mints the both-engines gate in F8.1/F8.2; the cadence matures
   across tranches). *Trigger:* the WebKit paint battery runs green N consecutive cuts. *Why not BG:* the
   gate is BG-reachable; the maturation is multi-tranche.
6. **Spacing/type ladder consolidation** (defer-honest — trigger: after F8.5/F2.2's token manifest quantifies
   single-consumer composites vs shared anchors). Do NOT speculatively collapse the φ-ladder — it is IDENTITY
   (protect). *Why not BG:* lower-leverage than F2.2's glass/dark waves; needs the manifest first.
7. **Font-inline tradeoff** recorded as an examined KEEP (linked-woff2 is the fold if multi-page caching
   dominates; assets already ship in `dist/fonts/`). *Trigger:* a multi-page-caching consumer profile
   dominates. *Why not BG:* a real tradeoff, not a defect (D7-F6).

**The three re-grain seeds (SYNTHESIS ruling 4 + GD-FOLD-7):**
8. **`/focal` family-barrel re-grain** — the Siri glass-island ships in BG as a DOCK CAPABILITY (through the
   existing `.glass-dock-frame`/`#rail` escape — the directive said "augment the dock, NOT a new component";
   `SiriWaveform` demo-private until a real 2nd consumer, the `useGlassBackdropLuminance` precedent). The
   `/focal` family-barrel (island + waveform + completion-seal + border-progress as a focal family) is the
   successor re-grain seed, NOT built now (the dock-capability shape supersedes it for BG). *Trigger:* the
   module re-grain (seed 1) lands. *First-move:* co-locate the focal surfaces under one barrel.
9. **Module re-grain (the encapsulation apotheosis)** — same as seed 1, stated as the north-star: a consumer
   memorizes ~18 family names, not 79. The BH `/api`-drop + the F6.1 `/axes` types-only barrel are the
   down-payment; the full re-grain is the tranche after.
10. **The liquid-ENTRANCE apotheosis** — seed 4 stated as the design north-star: every surface materializes
    with liquid weight by default (the entrance vocabulary as universal as F5.2 makes the transition
    vocabulary). *First-move:* `v-liquid-enter` over the F5.1 `useElementMorph` primitive.

---

# CROSS-CUTTING SEQUENCING (the hard edges only)

- **F8.5 W-TOKEN-MANIFEST → F2.2** (the dead-token sweep reads the manifest).
- **F2.2 W-GLASS-BASIS-CONSOLIDATE → F2.1** (the defined tier composes the FACTORED tint recipe — the
  inversion of the naive same-neighborhood order).
- **F5.1 W-MOTION-SPINE → F5.2 → F5.3** (the spring register, then the default inversion, then the chevron
  register + gate-widen with a bounded red window).
- **DEV-A2 dead-cut → F5.1** (orphan deletes precede/co-sequence the wrapper rewrites; ownership §0).
- **F6.5 W-GOD-MODULE-STRUCTURAL → F6.2 W-SIZE-UNIFY** (decompose the dock before the density→size rename).
- **F6.1 → {F6.2, F6.3}** (mint `axes.ts` before the size/motion adopts); all three BEFORE **BH B2's /api
  fold** (or B2 re-publishes the fragments — ruling 5 / D4 sequencing).
- **F7.2 W-CHASSIS-ADOPT-OR-RETIRE → F7.1 W-DEMO-IA-REDESIGN → live-render → -MANIFEST-COLOCATE → BH B3
  δ5/δ6** (ruling 5 / X5 — the anatomy decision is the parent; B3 consumes the REDUCED set). **F7.3
  W-DEMO-DUP-MERGE** rides after F7.1's taxonomy. **F7.4 Pass-E** audits the reduced set.
- **F8.1 detector kit (step 1) → F8.2 paint kernel → F8.1 wires it as PRIMARY (step 2)**; **F8.3 Fable arm**
  lands EARLY (every downstream visual wave inherits the close precondition); **F8.6 edict language** rides
  F8.2 + F8.3.
- **F8.5 demigrate-NET assert → after F6.4 (chart) + WS6 (Siri)** so the signed delta includes all adds.

Every VISUAL wave's close = its own non-authoring dual-engine π (Chromium + WebKit, both modes) + a Fable
DesignSync PASS verdict (F8.3), NOT a terminal W-REFLECT3 funnel (SYNTHESIS ruling 9 — W-REFLECT3 ABOLISHED;
every live-π closes at its owning wave).
