# BA.W-CARVE2 — the three grandfathered god-modules drained: typography carved, the constellation pair carved-or-kept-with-rationale

**Name**: W-CARVE2 - the god-module ratchet drained to ∅
**Opens after**: BA tranche open (Batch 0; runs ‖ W-SHELL-HOLD ‖ W-GESTALT-GATE ‖ W-HYGIENE — disjoint file bounds per EXECUTION-DAG §8)
**Agents**: 2 parallel (CSS arm · constellation arm)
**Hard gate**: `proof:no-god-module` closes at its declared terminus — `RATCHET_BASELINES == {}` AND `violations == []` — with the typography carve dist byte-isomorphic (a built-CSS diff witness), the `read-css-monoliths.mjs` `typography` manifest's import-order asserted, and every grandfathered constellation row either DELETED-by-carve or DELETED-by-recorded-§5-keep-under-bound.
**Status**: SPEC

## Goal criterion

The `proof:no-god-module` ratchet reaches its DECLARED CLOSE STATE — `RATCHET_BASELINES == {}` — for the first time since AY: typography.css ships as a thin `@import` root over cohesive `typography/{scale,semantic,utilities}.css` partials each < 500 lines (the dist CSS byte-isomorphic, the W-CARVE precedent), and the two constellation god-modules are each resolved — carved into the field-build/draw/interaction substrate they already neighbour OR recorded as a justified design-idioms §5 KEEP whose carve drops the file under 500 anyway. No file survives over the 500-line bound, and no carve verdict survives only as a stale code-comment book (the P-2 close-class defect).

## §0 — RE-GROUND (mandatory step-0; re-grep every cite at HEAD before any edit)

This wave starts from the fleet's TWO god-module verdicts (the deferred census + the precepts lane root-caused them at file:line), not a blind re-diagnose (BA invariant 3 — re-opened ≠ rebuilt-blind). Before touching a byte, each impl agent re-greps the anchors below at HEAD and confirms the line counts + structure still hold; if a cite has DRIFTED (one already has — see the Constellation.vue note below), the agent records the drift in PROGRESS and re-locates the bound before proceeding — it does NOT re-invent the carve plan.

Grounding findings:
- **REC-1** [RECENT · S2] (deferred-census.md:42-52) — the two constellation god-modules: `constellationField.ts` @586 + `Constellation.vue` @576 breach the 500 bound, ratchet-grandfathered as `BOOK(AZ.W-REFLECT)`; the BOOK names "a cohesion-aware split or a justified keep, per surface" — never executed at the AZ close.
- **REC-2** [RECENT · S3] (deferred-census.md:54-60) — typography.css @530 is the THIRD grandfathered row (grown by W-SUFFUSE/W-HIERARCHY's display-ladder + section-rung additions); the same carve-or-keep verdict owed; wave home named as "split into `typography/{scale,semantic,utilities}.css` thin `@import` partials, the W-CARVE pattern".
- **P-2** [S2] (precepts-conformance.md:90-122) — the carve carry booked to a wave (W-REFLECT) that did NOT discharge it; ABSENT from AZ FINAL §6 named successors. The precept bite: `proof-no-god-module.mjs:48-69` carries a non-empty `RATCHET_BASELINES` whose declared close state is `{}`; the remedy direction is "either carve the three OR record a justified KEEP with the §5 grandfather rationale stated in FINAL prose, then drain the baseline map to `{}`".

HEAD-verified anchors (re-grepped this authoring — the gate ratchet rows, `proof-no-god-module.mjs:66-68`):
- `styles/typography.css` @ **530** (baseline 530; at-bound) — `wc -l` confirms 530.
- `components/custom/constellation/constellationField.ts` @ **586** (baseline 586; at-bound) — confirmed 586. Structure: ~308 lines of `export interface` type declarations (lines 28-416: `ConstellationNode`/`Ripple`/`Pointer`/`Palette`/`Warp`/`Wander`/`PinnedDrift`/`WarpConfig`/`WellConfig`/`Well`/`Field`/`Props`), then 3 step/seed functions (`seedField`/`refitField`/`stepField`, lines 417-586 ≈ 170 lines).
- `components/custom/constellation/Constellation.vue` @ **576** (baseline **577** in the gate row — a 1-line DRIFT; the gate ratchet at `:68` reads `577`, disk is 576). The SFC is `<script setup>` lines 1-529 (≈528 lines), a 4-line `<template>` (531-535), a 39-line `<style scoped>` (537-576). **The drift note:** the gate baseline 577 is ABOVE the live 576, so the file is still grandfathered (576 ≤ 577) — but the close-state rule (`proof-no-god-module.mjs:170-179`) requires DELETING a stale row; the carve drops this row entirely, which resolves the drift mechanically.

Captures / authority cross-references:
- `docs/tranches/BA/audit/fleet/deferred-census.md` (REC-1/REC-2 home + R8-15 constellation-as-background pairing) and `docs/tranches/BA/audit/fleet/precepts-conformance.md` (P-2 root cause at `proof-no-god-module.mjs:62-69`).
- The carve MACHINERY authority is `scripts/read-css-monoliths.mjs` (`CSS_MONOLITHS` + `assertMonolithImportOrder`): the AY.W-CSS1 + AZ.W-CARVE precedent already carved tokens/glass/utilities/dock-controls/theme into `<name>/*.css` partials with a registered import-order manifest. A typography carve MUST register a `typography` manifest there — `assertMonolithImportOrder` iterates EVERY `CSS_MONOLITHS` entry, and `proof:no-god-module` reds on any registered manifest whose partials are missing or out of recorded order.

RE-GROUND command set (run all; confirm each bound + the read-swap surface):
```
wc -l src/styles/typography.css \
      src/components/custom/constellation/constellationField.ts \
      src/components/custom/constellation/Constellation.vue \
      src/components/custom/constellation/constellationInteraction.ts \
      src/components/custom/constellation/constellationDraw.ts          # the carve neighbours
sed -n '48,69p' scripts/proof-no-god-module.mjs                        # the three ratchet rows
grep -n 'typography\|"typography"' scripts/*.mjs                       # the typography.css read consumers (re-point set)
sed -n '24,120p' scripts/read-css-monoliths.mjs                        # the CSS_MONOLITHS manifest authority
ls src/components/custom/constellation/composables/                    # the carve destination (createConstellationField/useConstellationPointer already live)
```

## The defect table (file:line — RE-GREP at HEAD)

| # | finding | file:line | the mechanism |
|---|---|---|---|
| 1 | REC-2 typography god-module | `src/styles/typography.css` (530); `scripts/proof-no-god-module.mjs:66`; `styles/index.css:129` (`@import "./typography.css"`) | the §1-§10 face-files + display/heading/body/micro/math/mono/family/ornamental/aux registers grew the single sheet past 500 (W-SUFFUSE/W-HIERARCHY display-ladder + section-rung) |
| 2 | REC-1 constellationField god-module | `src/components/custom/constellation/constellationField.ts` (586); `proof-no-god-module.mjs:67`; `constellation/index.ts:4-8,40-53` (the barrel re-exports `seedField`/`stepField`/`refitField`/`BASE_WIDTH` + all `Constellation*` types) | ~308 lines of type interfaces + 3 step/seed functions; W-CON-GEN's additive default-OFF generalization grew it |
| 3 | REC-1 Constellation.vue god-module | `src/components/custom/constellation/Constellation.vue` (576; gate baseline 577 — the 1-line drift); `proof-no-god-module.mjs:68`; `constellation/index.ts:2` (default export) | a 528-line `<script setup>` orchestrator (the SFC carries the render-loop wiring; the field/draw/interaction substrate already lives in sibling files + `composables/`) |
| 4 | P-2 the stale BOOK / missing FINAL successor | `proof-no-god-module.mjs:62-65` (the `BOOK(AZ.W-REFLECT)` comment); AZ `FINAL.md:143-166` (§6 named successors — the carve is ABSENT) | the carve verdict survives only as a code-comment book pointing at a CLOSED wave; the ratchet's declared close state `{}` is unmet |

## Scope

1. **Carve typography.css into the three cohesive `@import` partials (CSS arm; the W-CARVE precedent).** `src/styles/typography.css` becomes a thin `@import` root over `src/styles/typography/{scale,semantic,utilities}.css`, each < 500 lines, the rules moved in the SAME cascade position so the emitted dist CSS is BYTE-ISOMORPHIC. The cohesion split, keyed to the existing `═══` section dividers:
   - **`scale.css`** — the `@font-face` OFL face declarations (Plus Jakarta Sans display + Fira Code mono, lines 25-168) + the `:root` `--type-*` scale tokens (lines 89-168, the √φ ladder + `--type-display-mega/-hero/-audacious`). The FACE + the SCALE numbers.
   - **`semantic.css`** — the `@layer components` BODY cascade + the `@utility` DISPLAY/HEADING/BODY/MICRO/ADMIN-LABEL semantic type classes (lines 170-380: `text-display-*`/`text-hero`/`text-title`/`text-heading`/`text-subheading`/`dock-label`/`text-prose`/`text-body`/`text-small`/`text-caption`/`text-micro`/`text-admin-label`).
   - **`utilities.css`** — the MATH/MONO/FONT-FAMILY/ORNAMENTAL/AUX registers (lines 382-530: `text-math*`/`text-mono-*`/`cm-serif`/`fira-code`/`fourier-f` + the `@layer components` AUX section-label/pane-title/kinetic hooks).
2. **Register the `typography` monolith manifest + re-point the readers.** Add a `typography` entry to `CSS_MONOLITHS` in `src/read-css-monoliths.mjs` with `root: "src/styles/typography.css"`, `dir: "src/styles/typography"`, `order: ["scale.css", "semantic.css", "utilities.css"]` (the cascade order: faces+tokens FIRST, semantic classes that read them SECOND, the aux/mono utilities LAST). Re-point the gates that read `typography.css` directly to `readMonolith(ROOT, "typography")` so a rule-scan keeps finding its target post-carve (the consumer set re-grepped at HEAD: `proof-font-canon.mjs`, `proof-font-cascade-live.mjs`, `proof-suffuse.mjs`, `proof-ui-scale.mjs`, `proof-storybook-ia.mjs`, `proof-components-css.mjs`, `proof-reka-binding-idiom.mjs` — each touched per its own read; the re-point is the AZ.W-CARVE one-line read-swap, no logic change).
3. **Carve the constellation pair OR record a justified §5 KEEP (constellation arm; the carve is the recommendation).** The recommended treatment mirrors the AY.W-COLOCATE feature-dir split the dock/tabs/goo-blob got and the deferred-census REC-1 home names:
   - **`constellationField.ts` → carve.** Split the ~308 lines of `ConstellationNode/Ripple/Pointer/Palette/Warp/Wander/PinnedDrift/WarpConfig/WellConfig/Well/Field/Props` TYPE interfaces (lines 28-416) into a co-located `constellationTypes.ts`, leaving the `seedField`/`refitField`/`stepField` step engine (lines 417-586) in `constellationField.ts` under 500. The `index.ts` barrel re-exports stay identical (the type re-export block at `index.ts:40-53` re-points its `from "./constellationField"` to `from "./constellationTypes"`; the value exports stay). NO public-surface change — the barrel is the single consumer-facing seam.
   - **`Constellation.vue` → carve OR §5 KEEP.** The 528-line `<script setup>` is the orchestrator; the field/draw/interaction substrate ALREADY lives in `constellationField.ts`/`constellationDraw.ts`/`constellationInteraction.ts` + `composables/{createConstellationField,useConstellationPointer}.ts`. The carve lifts the remaining inline render-loop/lifecycle wiring into a `composables/useConstellation.ts` (the colocation idiom: the SFC keeps template + a thin `<script setup>` that consumes the composable), dropping the SFC under 500. **If** the carve cannot be done without breaking the render-loop cohesion (a genuine single-responsibility orchestrator where every extraction is an artificial seam), the arm records a justified design-idioms §5 KEEP — but the KEEP is only valid if the file is ALSO brought under 500 by a non-cohesion-breaking trim (the §5 grandfather rationale stated in FINAL prose, NOT a code-comment book); a KEEP that leaves the file at 576 does NOT drain the ratchet and is a triumvirate trigger (see Triumvirate Dispatch).
4. **Drain `RATCHET_BASELINES` to `{}` and reconcile the gate's own copy.** Delete all three rows in `proof-no-god-module.mjs:66-68` (the carve drops each file under 500, so the rows go stale by the gate's own monotonic-drain rule at `:170-179`). The `BOOK(AZ.W-REFLECT)` comment block (`:62-65`) is removed with the rows. The gate's `ratchetDrained` fact reads `true` and the close-state assertion (`RATCHET_BASELINES == {}` AND `violations == []`) holds for the first time since AY.
5. **Record the discharge in FINAL-track + CLAUDE.md.** The CLAUDE.md §Structure custom/ note for `constellation/` (a colocation feature-dir) re-syncs to the carved shape; the BA PROGRESS row + the BA FINAL named-successor reconciliation records the verdict (carve vs §5-keep) per file — closing the P-2 "verdict-as-stale-comment" defect. (Coordination: the CLAUDE.md §Structure custom/ ENUMERATION + count re-sync is W-HYGIENE's bound — see File Bounds; this wave records ONLY the constellation carve shape if W-HYGIENE has not yet landed, else defers the one-line note to W-HYGIENE's diff.)

## Triumvirate Dispatch

- **File-bounds expansion that invalidates the wave** — if the typography carve cannot keep the dist CSS byte-isomorphic (a partial split that re-orders a cascade-sensitive rule, e.g. the `@layer components` body cascade landing AFTER a `@utility` that depends on it), that is a scope-reveal: triumvirate (research the cascade-position constraint + plan-augment the partition + redress), do NOT ship a non-isomorphic carve. The AZ.W-CARVE byte-isomorphism is the binding bar — the carve moves rules, never changes paint.
- **Hard-gate failures not local-edit-recoverable** — if the `Constellation.vue` carve (scope 3) cannot land under 500 without an artificial render-loop seam AND a non-cohesion-breaking trim does not bring it under 500 either (so neither the carve nor a valid §5 KEEP discharges the row), that is a register-design miss: triumvirate (research the orchestrator's true single-responsibility bound + decide carve-vs-keep with the §5 rationale), do NOT loop landing partial extractions that leave the row alive. A §5 KEEP that does not drain the ratchet is NOT a close state.
- **Diagnostic loop halt** — if `proof:no-god-module` still reds after the carve and three iterations have not isolated whether the failure is a stale ratchet row, a missing/mis-ordered `typography` manifest partial, or an unre-pointed reader, halt and triumvirate (the `assertMonolithImportOrder` iteration over a half-registered manifest is the suspect — a registered manifest with a partial missing on disk reds at `proof-no-god-module.mjs:197-199`).

## File Bounds

| File | Access |
|---|---|
| `src/styles/typography.css` | modify-carve (→ thin `@import` root) |
| `src/styles/typography/scale.css` | create |
| `src/styles/typography/semantic.css` | create |
| `src/styles/typography/utilities.css` | create |
| `scripts/read-css-monoliths.mjs` | modify (register the `typography` `CSS_MONOLITHS` manifest) |
| `scripts/proof-font-canon.mjs` | modify (re-point the `typography.css` read → `readMonolith(ROOT, "typography")`) |
| `scripts/proof-font-cascade-live.mjs` | modify (same read-swap) |
| `scripts/proof-suffuse.mjs` | modify (same read-swap) |
| `scripts/proof-ui-scale.mjs` | modify (same read-swap) |
| `scripts/proof-storybook-ia.mjs` | modify (same read-swap) |
| `scripts/proof-components-css.mjs` | modify (same read-swap) |
| `scripts/proof-reka-binding-idiom.mjs` | modify (same read-swap) |
| `scripts/proof-no-god-module.mjs` | modify (drain `RATCHET_BASELINES` to `{}` + remove the `BOOK(AZ.W-REFLECT)` block) |
| `src/components/custom/constellation/constellationField.ts` | modify-carve (type interfaces → `constellationTypes.ts`; step engine stays) |
| `src/components/custom/constellation/constellationTypes.ts` | create |
| `src/components/custom/constellation/Constellation.vue` | modify-carve (orchestrator → `composables/useConstellation.ts`, or §5-keep-under-bound) |
| `src/components/custom/constellation/composables/useConstellation.ts` | create (the orchestrator extraction; only if carved — not if §5-keep) |
| `src/components/custom/constellation/index.ts` | modify (re-point the type re-export block to `constellationTypes`) |
| `docs/tranches/BA/audit/visual/W-CARVE2-DELTA.md` | create (the dist byte-isomorphism witness + the ratchet-drained log) |
| `docs/tranches/BA/PROGRESS.md` | modify (the discharge row) |

Do NOT touch:
- **W-HYGIENE's bound** — the CLAUDE.md §Structure custom/ enumeration + count re-sync, the `proof:colocation` TARGET_DIRS derivation, the precepts submodule commit, the MIGRATION.md 3.13.0 re-anchor, the AX evidence-png sweep. This wave's only CLAUDE.md touch is the constellation carve-shape note (scope 5), and only if W-HYGIENE has not yet landed (else it defers the line to W-HYGIENE). Constellation is already in `proof:colocation` TARGET_DIRS (the lane confirms), so the carve does not change the gate's target list.
- **W-GESTALT-GATE's bound** — `proof:ba-gestalt`, the `:5175`/`:5173` port re-points, `proof:gate-manifest-sound`. This wave registers NO live gate and touches no port default.
- **W-SHELL-HOLD's bound** — the shell-dock `railContext` guard (`demo/layout/{BottomDock,SidebarDock}.vue`).
- **The standing fences** — the GL shader internals (aurora.frag/metaball.frag — NOT named by this wave; the constellation render-loop carve touches only the SFC `<script setup>`/composable wiring, never a shader); ppmycota purple (no token edit); the slides M docs (foreign).
- **`constellationDraw.ts` / `constellationInteraction.ts` / `constants.ts` / `composables/{createConstellationField,useConstellationPointer}.ts`** — the EXISTING constellation substrate is the carve DESTINATION's neighbours; they are read for cohesion but not edited (the carve lifts INTO new co-located files, it does not re-home what already lives in these).
- **Any token VALUE** — the `--type-*` scale numbers move file (scope 1) but never change; the carve is structural, not a re-tune (BA invariant 7 clean-break does not apply — there is no value delta to migrate).

### Disjointness

Two agent units, file-bound-disjoint by construction:
- **W-CARVE2.1 (CSS arm)** writes `src/styles/typography.css` + the three `typography/*.css` partials + `scripts/read-css-monoliths.mjs` + the seven `typography.css`-reader gate scripts + `scripts/proof-no-god-module.mjs` (the typography ratchet row half). It does NOT touch any `src/components/custom/constellation/*`.
- **W-CARVE2.2 (constellation arm)** writes the `constellation/*` files (field/types/SFC/composable/index) and the SHARED `scripts/proof-no-god-module.mjs` (the two constellation ratchet rows).

The ONE shared modify path is `scripts/proof-no-god-module.mjs` (both arms delete their own ratchet rows). To preserve true parallelism: the gate's `RATCHET_BASELINES` drain is a SINGLE orchestrator-owned final edit applied AFTER both arms land (the AZ idiom — the agents land their carves leaving the gate grandfathered-but-shrinking, then the orchestrator drains all three rows in one commit when both carves are confirmed under bound). No agent writes the gate row another agent also writes. Across Batch 0: W-SHELL-HOLD (shell-dock guard), W-GESTALT-GATE (gates/ports), W-HYGIENE (docs/submodule) — none touch `src/styles/typography*`, `src/components/custom/constellation/*`, or `read-css-monoliths.mjs`. The seven `typography.css`-reader gate scripts are written by NO other Batch-0 wave (W-GESTALT-GATE's port re-points are a disjoint set of gate files).

## Hard Gate

`proof:no-god-module` reaches its DECLARED CLOSE STATE (the gate already encodes it — `proof-no-god-module.mjs:19-21`: "The close state is BOTH `violations == []` AND `RATCHET_BASELINES == {}`"). Born-RED falsifiable witnesses, each red at HEAD pre-wave:

1. **W1 — the ratchet is drained.** `RATCHET_BASELINES == {}` in `proof-no-god-module.mjs` AND the gate's `ratchetDrained` fact reads `true`. RED at HEAD: the map carries three rows (`:66-68`). Assert shape: the gate's JSON artefact `facts.ratchetBaselineCount === 0` AND `facts.ratchetDrained === true`.
2. **W2 — no file over bound.** `violations == []` with every carved file measured < 500. RED at HEAD: the three grandfathered files measure 530/586/576. Assert shape: `facts.largest[0].lines <= 500` (the single largest measured src file is at-or-under bound) AND the artefact's `violations` array is empty. Bite-tightening (anti-evasion): the assert is on the MEASURED largest, not on a baseline-absence — a re-grandfather (a new ratchet row added to dodge the carve) fails W1's `=== 0` count, so the two witnesses jointly forbid the "drain by re-booking" evasion.
3. **W3 — the typography carve is import-order-sound + byte-isomorphic.** The `typography` `CSS_MONOLITHS` manifest exists, its three partials (`scale.css`/`semantic.css`/`utilities.css`) are present on disk, and `typography.css` `@import`s them in the recorded order — `assertMonolithImportOrder` returns `importOrderPreserved: true` + `missing: []` for the `typography` fact. RED at HEAD: no `typography` manifest exists, `typography.css` is the single 530-line sheet (no `@import "./typography/*.css"`). Assert shape: the gate's `facts.cssMonoliths` includes `{ name: "typography", importOrderPreserved: true, missing: [] }`. PLUS the dist byte-isomorphism witness (the binding carve-correctness floor, NOT a line-count proxy): `npm run build` emits the `/styles` bundle; a `git stash`-bracketed diff of `dist/glass-ui.css` (or the emitted typography rule extent) before vs after the carve is EMPTY — the carve moved rules without changing one byte of paint. Captured to `W-CARVE2-DELTA.md`.
4. **W4 — the constellation carve preserves the public surface.** The `constellation/index.ts` barrel exports the SAME symbol set (the `seedField`/`stepField`/`refitField`/`BASE_WIDTH` values + `Constellation` default + every `Constellation*` type) — `npm run typecheck` (vue-tsc) green AND `npm run verify-export-types` green (the subpath dts publication probe — `/constellation`'s exported types resolve unchanged post-carve). RED-equivalent at HEAD: vacuously green (no carve), so W4 is the REGRESSION guard — it reds if the carve drops or renames a barrel export. Assert shape: typecheck exit 0 + verify-export-types exit 0 + a barrel-export-set equality assert (the pre-carve vs post-carve `index.ts` export-name set is identical).

**The DELTA capture (the carve-correctness truth):** `docs/tranches/BA/audit/visual/W-CARVE2-DELTA.md` records (a) the three before→after line counts (530→[≤500], 586→[≤500], 576→[≤500]), (b) the empty `dist/glass-ui.css` diff (the byte-isomorphism proof), (c) the `proof:no-god-module` born-RED log (the ratchet at three rows) vs the GREEN-at-close log (`ratchetDrained: true`), (d) the `assertMonolithImportOrder` `typography` fact, and (e) the carve-vs-§5-keep verdict per constellation file with the rationale. **This is a STRUCTURAL wave, not a visual one** — `proof:no-god-module` GREEN + the byte-isomorphism diff + typecheck/verify-export-types are the binding truth; there is NO `proof:ba-gestalt` requirement (BA invariant 4 binds VISUAL waves, and this wave changes ZERO paint by construction — the byte-isomorphism witness IS the no-visual-change proof). If the dist diff is non-empty, the carve is wrong regardless of the line counts.

## Format And Lint Cadence

`npm run typecheck` (vue-tsc) after the constellation type/orchestrator carve; `npm run build` to confirm the typography partials compile AND to capture the dist byte-isomorphism diff; `node scripts/proof-no-god-module.mjs` born-RED before the source edits (proof it fails at HEAD with three rows), GREEN at close (`ratchetDrained: true`); `npm run verify-export-types` after the constellation barrel re-point; `npm run proof:gate-script-parity` after the `read-css-monoliths.mjs` manifest registration + the seven reader re-points (the gate registry must stay sound); `git diff --check` before close.

## Verification Artefacts

- `docs/tranches/BA/audit/visual/W-CARVE2-DELTA.md` — the three line-count deltas, the empty `dist/glass-ui.css` diff (byte-isomorphism), the born-RED→GREEN `proof:no-god-module` logs, the `assertMonolithImportOrder` typography fact, the constellation carve-vs-keep verdicts.
- The `proof:no-god-module` JSON artefact (born-RED three-row log + GREEN-at-close `ratchetDrained: true` log).
- The `gate-script-parity` output post-manifest-registration + reader re-points.
- `npm run verify-export-types` output (the constellation barrel surface unchanged).

## Commit Plan

- CSS-arm impl commit: `refactor(styles): typography.css → typography/{scale,semantic,utilities}.css thin @import partials, dist byte-isomorphic (BA.W-CARVE2)` — body names the three-partition split + the seven reader re-points + the `typography` CSS_MONOLITHS manifest.
- constellation-arm impl commit: `refactor(constellation): constellationField types → constellationTypes.ts + Constellation.vue orchestrator → composables/useConstellation.ts (BA.W-CARVE2)` — body names the carve-vs-§5-keep verdict per file and the unchanged barrel surface.
- gate/drain commit (orchestrator-owned, after both arms): `test(gate): drain proof:no-god-module RATCHET_BASELINES to ∅ — the three grandfathered rows discharged (BA.W-CARVE2)` — body cites the close state `RATCHET_BASELINES == {}`.
- doc/status commit: the `W-CARVE2-DELTA.md` + the BA PROGRESS row + (deferred-to-or-coordinated-with-W-HYGIENE) the CLAUDE.md constellation carve-shape note.

## Dependencies

- **Depends on**: nothing structurally (Batch 0, disjoint bounds). It reads the `read-css-monoliths.mjs` carve precedent (AY.W-CSS1 + AZ.W-CARVE) but lands its own `typography` manifest.
- **Blocks**: nothing hard, but the carve PAYS DOWN debt the BA close (Batch 7 W-CLOSE) would otherwise flush — the AZ close surfaced ~25 latent defects precisely because debt accumulated to the cut (EXECUTION-DAG §1). With the ratchet drained at Batch 0, the BA close does not inherit a god-module carry. The constellation carve also makes `constellationField.ts`/`Constellation.vue` LEGIBLE for W-STAGE (Batch 6, R8-15 constellation-as-page-background) — REC-1's "more consumers → more reason to make the file legible" pairing; W-STAGE consumes the carved-and-readable surface but does not depend on the carve landing (it reads the barrel, which is unchanged).

## Archaeology

Prior attempt: AZ.W-REFLECT carried the `BOOK(AZ.W-REFLECT)` marker on these three rows (`proof-no-god-module.mjs:62-65`) but consumed the band on the surface-reflection triumvirate (dock/motion/blob) and NEVER executed the carve verdict — the AZ FINAL §6 named-successor list (`FINAL.md:143-166`) omits it entirely (P-2). The new guardrail: this wave's close state is the gate's OWN declared terminus (`RATCHET_BASELINES == {}`, `proof-no-god-module.mjs:19-21`), so the discharge cannot survive as a code-comment book again — the ratchet map is empty or the gate reds. The AZ.W-CARVE byte-isomorphism precedent (the dock-controls.css/theme.css drain) is the binding carve-correctness bar this wave inherits: the carve moves rules, never paint.

## Named successors

None foreseen — the carve is a complete discharge (the ratchet drains to `{}`). The ONE conditional: if the `Constellation.vue` orchestrator carve hits the Triumvirate Dispatch register-design miss (the render-loop is a genuine single-responsibility orchestrator that no non-cohesion-breaking trim brings under 500), the recorded outcome is a design-idioms §5 KEEP WITH the rationale in BA FINAL prose AND a ratchet row that stays — which would make the wave close `complete_with_misses` with a named BA-close re-evaluation, NOT a silent code-comment book (the explicit guard against the P-2 recurrence). The recommendation and the expected outcome is the full carve to `{}`.
