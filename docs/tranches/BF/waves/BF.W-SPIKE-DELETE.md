# BF.W-SPIKE-DELETE — the W-PRUNE-CONSOLIDATE clean cut: delete the spike, relocate the demo CSS

**Band 1 · Tier T2 · depends: W-FLIP-SPINE**

## The defect / the ask

The audit's CHRONIC #2 (DEFERRED-CENSUS **D2** + **D30**, both relevant; SEED §1 **R16** "no legacy" + SEED §6 precept 1 "the spike is DELETED, not parked"). Three undeleted-spike artifacts:

- **`src/composables/motion/useLiquidMorph.ts` (462L, ZERO consumers).** Confirmed: the only repo reference is the PROSE manifest description at `demo/stories/manifest.ts:884` ("One generalized `useLiquidMorph` engine…") — there is NO `import { useLiquidMorph }` anywhere in `src/` or `demo/`. The file's own header (`:1-9`) calls itself "the GENERALIZED liquid framework" / "WAVE-1" spike. It is the orphaned half of the **D30 double-fork**: `useLiquidMorph` and `useDockFission` are two n-ary split engines; `useDockFission` is the WIRED survivor (the fission-bridge consumer), `useLiquidMorph` is dead substrate (J-inv-10).
- **`src/styles/glass/liquid-morph.css` (815L of DEMO CONTENT).** Read its header (`:1-23`) and selectors: `.liquid-sheet` (`:279`, a Maps Places sheet), `.liquid-player` (`:229-230`, an Apple Music card), `.liquid-sheet-places`/`.liquid-sheet-place` (`:292-297`, demo Maps rows) — these are SPECIMEN surfaces, not library primitives. It physically lives in `src/styles/glass/` but is `@import`-ed ONLY from `demo/demo.css:119` (never `src/styles/index.css`), and `dock.css:53` itself annotates the boundary: "The demo's island FACE/layout (`.liquid-island-*`) stays demo-only (liquid-morph.css)". So 815L of demo content sit in the shipped `src/styles/` tree — exactly the "demo CSS in `src/styles`" the R16 violation names.
- **The false `manifest.ts:884` claim.** It asserts "One generalized `useLiquidMorph` engine over the real dock spring" — but `useLiquidMorph` has zero consumers and the playground actually composes `useDockFission`/`useBloomUp`/`DockStack`. The claim is phantom prose.

The W-PRUNE-CONSOLIDATE discipline (CLAUDE.md §"The superseded mechanism is ABSENT", `proof:no-dual-path`) is binding: a successor minted without retiring its predecessor is dual-path shelf-ware. This wave makes the clean cut.

## The mechanism

The W-PRUNE-CONSOLIDATE clean cut, in three moves (HARVEST-then-DELETE — the load-bearing layout is harvested into the shipped tree BEFORE the demo file moves, so no shipped surface loses its CSS):

1. **DELETE `src/composables/motion/useLiquidMorph.ts` (the orphan, D30 RETIRE).** Removed wholesale — no alias, no re-export stub (`proof:no-dual-path` D-symmetric: a dormant stub OR a broken reference both RED). The `/motion` barrel carries no `export * from "./useLiquidMorph"` (confirm it never did — the file ships unbarrelled today, a second tell of its orphan state). `useDockFission` is the wired survivor that owns the n-ary split; `useLiquidMorph`'s `LiquidMorphMode`/`LiquidMorphVector` types die with it (no consumer imports them).

2. **HARVEST the load-bearing `.liquid-island` layout, THEN RELOCATE `liquid-morph.css` to `demo/`.** Read which selectors are LOAD-BEARING for a SHIPPED surface vs purely demo:
   - The `.liquid-island-host`/`.liquid-island-bridge` host geometry (`:13-17`, `:116`) is the `.dock-fission-bridge` HOST the shipped `dock/fission-bridge.css` `[data-fissioning]` recipe attaches to. If any LOAD-BEARING host rule (the non-clipping frame escape, the `position`/`isolation` the fission pieces need) is currently only in `liquid-morph.css`, it is HARVESTED into the shipped `dock/fission-bridge.css` (or a thin `dock/fission-host.css`) FIRST — so the shipped fission recipe is self-sufficient with NO demo CSS imported.
   - The pure DEMO content — `.liquid-sheet`/`.liquid-player`/`.liquid-sheet-places`/`.liquid-stage` (the Maps/Music specimen plates, `:229-310+`) — MOVES with the file to `demo/stories/dock/` (e.g. `demo/stories/dock/liquid-surfaces.css`). The `demo/demo.css:119` `@import` re-points to the new demo path. After the move, `src/styles/glass/` carries ZERO demo-content CSS.
   - The DAG fact: this wave depends on W-FLIP-SPINE because `liquid-morph.css:25-33` (`.liquid-stage` re-points `--glass-tint-source`/`--glass-tint-strength` toward `--glass-ambient-hue`/`--glass-ambient-strength`) is the FIELD half of the bloom's 4th color channel — after W-FLIP-SPINE folds `useBloomUp`→`useLiquidReveal`, that `[data-glass-field]` stage rule travels WITH the demo surfaces it serves (the consumer owns its field; the library owns the `@property` registration in `tokens/glass.css`, which STAYS).

3. **FIX the false `manifest.ts:884` claim.** Re-write the prose to name the REAL engines the playground composes (`useDockFission` + `useLiquidReveal` + `DockStack mode="facets"` + the SVG-goo `fission-bridge.css`) — never the deleted `useLiquidMorph`. The claim becomes true-by-construction (it names only shipped, wired primitives).

This is MECHANICAL + position-preserving for the shipped tree: the shipped `fission-bridge.css` gains only the harvested host rules (byte-additive if any were demo-only); `src/styles/index.css` is untouched (`liquid-morph.css` was never in it). The `dock.css:53` annotation is updated to drop the now-relocated "(liquid-morph.css)" reference.

## The gate — `proof:no-dual-path` extension (born-RED → GREEN)

Extend `scripts/proof-no-dual-path.mjs` IN PLACE (NOT a 2nd gate — the W-PRUNE-CONSOLIDATE D-clause discipline; `tags: ["local","ci","release"]`). Add the BF spike-cut clauses to its existing `SUPERSEDED_SET` + the half-primitive DECIDE census:

- **D5 (new SUPERSEDED_SET row) — `useLiquidMorph` is DEFINITION-ABSENT.** `src/composables/motion/useLiquidMorph.ts` does NOT exist AND no `src/` file imports `useLiquidMorph`/`LiquidMorphMode`/`LiquidMorphVector` AND the `/motion` barrel carries no `useLiquidMorph` export (the SYMMETRIC closure — a surviving file OR a dangling import both RED). `retireKind: "deleted-orphan"`, rationale + successor (`useDockFission` is the wired n-ary split survivor) recorded in the SUPERSEDED_SET map.
- **D6 (new) — no demo content in `src/styles/`.** `src/styles/glass/liquid-morph.css` is DEFINITION-ABSENT; the demo-content selectors (`.liquid-sheet`, `.liquid-player`, `.liquid-sheet-places`, `.liquid-stage`) appear NOWHERE under `src/styles/**` (they live in `demo/`). A surviving `liquid-morph.css` under `src/styles/` OR a re-introduced `.liquid-sheet` rule in any `src/styles/*.css` REDs.
- **D6.b — the shipped fission host is self-sufficient.** The shipped `dock/fission-bridge.css` `[data-fissioning]` recipe references NO selector that lives only in a `demo/` file — every host rule the shipped recipe needs is in the shipped tree (the harvest landed). A `src/`-shipped recipe whose host geometry is satisfied only by a `demo/`-imported rule REDs (the shipped surface cannot depend on demo CSS being imported).
- **D30 census row.** `useLiquidMorph` carries the TERMINAL census verdict `retired-with-rationale` (NOT `book`), citing `useDockFission` as the wired survivor + `W-SPIKE-DELETE` as the `retiredBy` resolving on disk — the BB.W-NDA-DECIDE terminal-lock shape mirrored into `proof:no-dual-path`'s census.
- **The manifest-claim clause.** `demo/stories/manifest.ts` carries NO live `useLiquidMorph` mention in a way that asserts it as a shipped engine (the prose names only wired primitives). A re-introduced "One generalized `useLiquidMorph` engine" claim REDs.

**Self-test (`--self-test`, born-RED→GREEN, ≥4 bites):** (1) a re-created `src/composables/motion/useLiquidMorph.ts` stub → D5 RED; (2) a dangling `import { useLiquidMorph }` with the file gone → D5 RED (the broken-reference half); (3) a re-introduced `.liquid-sheet` rule under `src/styles/glass/` → D6 RED; (4) the `manifest.ts` claim restored → manifest clause RED. Each MUST flag; the post-cut tree MUST be clean.

**What REDs on the pre-fix tree:** D5 (`useLiquidMorph.ts` exists, 462L), D6 (`liquid-morph.css` 815L under `src/styles/glass/`), the manifest clause (the false claim live) — born-RED by construction; GREEN only after the delete + relocate + claim-fix.

## The binding π — none (zero-pixel prune wave)

There is NO `tests-visual/spike-delete.spec.ts` and NO `proof:ba-gestalt` row of its own. Per CLAUDE.md §W-PRUNE-CONSOLIDATE ("NO `proof:ba-gestalt` of its own — a dead-MECHANISM cut changes ZERO paint where the successor already paints") + SEED §6 precept 5's retire-with-rationale arm: deleting an orphan with zero consumers paints zero new pixels (nothing rendered `useLiquidMorph`), and relocating demo CSS that is still imported by `demo/demo.css` paints byte-identically (the same rules, a new path). The binding truth is the gate's self-test + the **cross-gate no-regression check**: `proof:no-layout-animation`, the fission π (`tests-visual/dock-fission.spec.ts`, authored in `W-PI-AUTHOR`), and the bloom π stay GREEN — the harvest did not break the shipped fission host. If the harvest is non-trivial (a host rule moved into the shipped tree changes paint), THAT delta is captured under the consuming wave's π (`W-DOCK-INTEGRATE`), not here.

## The gestalt row

None (zero-pixel prune — the W-PRUNE-CONSOLIDATE precedent). This wave's truth is the gate + the cross-gate no-regression: the shipped fission/bloom surfaces paint identically after the orphan dies and the demo CSS relocates.

## Fences

- **No-legacy / clean break.** `useLiquidMorph.ts` is DELETED — no `export { useDockFission as useLiquidMorph }` alias, no dormant stub. The demo CSS MOVES (it is not duplicated — the `demo/demo.css` `@import` re-points; there is no parallel copy left in `src/styles/`).
- **Harvest-then-delete, not delete-then-break.** The load-bearing `.liquid-island` host layout is harvested into the shipped tree BEFORE the file moves — the shipped fission recipe must be self-sufficient (D6.b). The anti-pattern: deleting/moving the CSS and leaving the shipped `[data-fissioning]` recipe referencing a now-demo-only host rule (a broken-reference half-delete, the `proof:no-dual-path` D-symmetric RED).
- **Presets-in-consumers.** The Maps/Music specimen plates (`.liquid-sheet`/`.liquid-player`) are DEMO surfaces — they belong in `demo/`, not the library identity. The library keeps only the `@property --glass-ambient-hue`/`-strength` REGISTRATION (`tokens/glass.css`) the bloom's 4th channel needs; the field-bias `.liquid-stage` rule is the consumer's.
- **Foreign-tree fence (inv-26).** Zero sibling-tree edits — this is a glass-ui-internal delete + relocate.

## Disposition links

Closes **D2** (the undeleted spike → BUILD: delete `useLiquidMorph.ts`, relocate `liquid-morph.css` to `demo/`, fix the false `manifest.ts:884` claim) and **D30** (the `useLiquidMorph` vs `useDockFission` double-fork → RETIRE-with-rationale: `useDockFission` wired, `useLiquidMorph` orphan deleted; the `retiredBy: W-SPIKE-DELETE` resolves the FOLD-LEDGER F5 RETIRE row). Unblocks `W-VH-COMPOSE` (T3) — the clean spine + the relocated demo CSS are the substrate the V↔H compose builds on.
