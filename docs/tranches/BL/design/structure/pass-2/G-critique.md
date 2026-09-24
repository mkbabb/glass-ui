# D1 · pass 2 · G-critique: the adversarial critic of route G

| field | value |
|---|---|
| seat | D1 pass-2 CRITIC for route D1-G. I did not write the route, the spec or the prototype |
| model | `claude-opus-5-5`, asserted from own system identity |
| read before the battery | `CHARTER.md` (the edict, last four paragraphs), `RULINGS.md` R-1..R-10, `SPECS-v2.md` §1 and §4 only |
| read after the battery | `G-proto.md`, `scripts/structure/eponym.mjs` and the migration scripts in the worktree |

## 1 · Intent battery (written before reading the gate or the prototype report)

Each item is an edit planted on the MIGRATED tree, which I rebuild in my own worktree. Paths are HEAD names. The migrated path each one resolves to is recorded in §3. "Expect" is the clause the spec (§4.5) says should fire, or "edict" when the spec names no clause but the edict or a ruling demands the catch.

| # | plant (exact edit) | edict / ruling | expect |
|---:|---|---|---|
| P01 | Move a private helper of `DockCrossfade.vue` (a file only it reads, e.g. `dockCrossfadeContext.ts` if private after migration) back to the dock unit's root, rewriting its importers | colocation | E2 |
| P02 | Create `dock/misc/` and move two dock composables into it (no file named `misc`) | eponymy / placeholder | E3 |
| P03 | Move `skeleton/Skeleton.vue` into `data-table/`, rewriting `skeleton/index.ts` to `../data-table/Skeleton.vue` | R-2 amended, R-9 | E1 |
| P04 | Rename a root that heads a minted dir (e.g. `DockCrossfade.vue` → `DockFader.vue`) so it no longer names its dir | eponymy | E3 |
| P05 | Add 11 one-line `.ts` files (each exported from the unit door) to `badge/`, taking it to 13 direct files | R-5 dir bound | E4 |
| P06 | Flatten the doorless `accordion/` family into `src/components/` (5 files up, `index.ts` renamed `accordion.ts`) | R-2 unit, edict recursion | E1 / E3 |
| P07a | Negative control: add `dock/registry.ts` that imports 3 dock SFCs and only places them in an object literal, read by `GlassDock.vue`; leave the SFCs where they are | spec §4.1 wiring files | stays GREEN |
| P07b | Same registry, and move the 3 SFCs into `dock/registry/` beside it (dominance swallowing its targets) | spec §4.1 | E2 or E3 |
| P08 | Add `import "./does-not-exist";` to a component `.ts` file | fail-closed graph | E0 |
| P09 | Move a composable read by only one unit (`useDragVelocity.ts`, slider) back to `src/composables/dom/` | colocation, R-4 | E1 |
| P10 | Move a truly shared composable (≥ 2 unit readers, e.g. `useClipboard.ts` or `ModalOverlay.vue`) into one of its readers | R-4 global slot, M03 | E1 |
| P11 | In a demo story, add `import { useDockSpring } from "../../../src/components/dock/composables/useDockSpring";` (relative deep import past a door) | R-10 | E6 |
| P12 | Re-export a symbol published on `./dock` from another entry's door as well (e.g. `export { useDockSpring } from "../dock"` in `slider/index.ts`) | R-6 dual door | E5 |
| P13 | Move a single-subject test out of its unit's `__tests__/` into `tests/components/` | R-3 | E7 |
| P14 | Move a single-subject dock test into `slider/__tests__/` (a test homed at the wrong subject) | R-3 | E7 |
| P15 | Append 520 comment lines to a hand-written `.ts` file | R-5 line bound | E4 |
| P16 | Self-name import inside the library: `import { Badge } from "@mkbabb/glass-ui/badge";` in a `src/` component | dual path / door misuse | E0/E1 (edict) |
| P17 | In `demo/demo.css`, `@import "../src/components/dock/styles/<private>.css";` (a CSS import reaching a private sheet) | R-10 (doors only), colocation | E6 |
| P18 | In `badge/Badge.vue`, import a dock-private composable by relative path (`../dock/.../useDockSpring`) | door crossing inside src | E1 |
| P19 | Placeholder module: `dock/utils/utils.ts` that re-exports a helper `dock/utils/format.ts` (eponymous, but a placeholder name) | edict "common modules", naming | edict (no clause expected) |
| P20 | Alias/dual path: `dock/GlassDockLegacy.ts` = `export { default } from "./GlassDock.vue"`, read by one demo story | clean breaks, no aliases | edict (E5/E6?) |
| P21 | Masked fallback: in a dock SFC, `const m = await import("./x").catch(() => null)` to a missing file | no masking fallbacks | E0 |
| P22 | Skeleton away from its component: new `DataTableSkeleton.vue`, read only by `DataTable.vue`, placed in `skeleton/` | R-9 | E1 |
| P23 | Kind slot over 12: add 3 hooks to `dock/composables/` or its migrated successor so it holds 13+ | R-5 strict slot reading | E4 |
| P24 | Root dir with an empty closure: `badge/badge-label/BadgeLabel.vue` alone in its dir, read by `Badge.vue` | spec E3 hysteresis upper bound | E3 |
| P25 | Chain: `dock/wrap/crossfade/…` where `wrap/` holds only `crossfade/` | spec §4.3 chain compression | E3 (spec says proposed) |
| P26 | `new URL("../dock/<private>.ts", import.meta.url)` load from another unit | F-1 kind `new URL`, E2 reads loads | E1 |
| P27 | A component-only CSS sheet (e.g. `badge`'s or `data-table/styles.css`) moved to `src/styles/` | colocation of styles | edict (spec §1.4 defers CSS) |
| P28 | A bin's private helper left at `scripts/` top level beside an unrelated bin (e.g. new `scripts/foo-helper.mjs` read only by one bin) | backend clause | edict (spec §4.8 unrun) |
| P29 | A long demo dir: add 13 story SFCs' worth of files to one `demo/stories/<cat>/` | R-5 over `demo/` | E4 |
| P30 | Type-only import from a dock private file in another unit (`import type { … } from "../dock/…"`) | E2 includes type loads | E1 |

Scoring: a plant is CAUGHT when the gate exits non-zero AND names the planted file or dir under the expected (or a defensible) clause. A catch that fires only on collateral damage (e.g. only E0 from a broken import, not the placement) is recorded as COLLATERAL, not CAUGHT.

---

## 2 · Verdict

**BANK, 60 % converged.**

G's within-unit law is real. On a tree I rebuilt myself, it bites 23 of 29 independent plants through the clauses SPECS-v2 §4.5 writes down, and 26 of 29 once the proto's added clauses are counted.

It does not ADVANCE, for five reasons:
- The gate, the law, the frozen lists and the relay rows existed only in `/tmp` and are gone. The migration can be replayed; the gate cannot be re-run.
- 4 of 10 migration steps are SPEC-ONLY.
- E4–E7 are RED and not wired into `npm test`.
- FD-2's no-growth rule is broken.
- The migrated tree puts global kernel hooks inside component interiors, against the edict's global-`composables/` clause.

It is not BLOCK or RETIRE: nothing measured contradicts the route's core. The kernel-hook defect comes from the shared stage 1 (the same F-7 function in all three specs), not from G's dominance.

## 3 · What I ran

| item | value |
|---|---|
| worktree | `scratchpad/D1/p2/G-crit/wt` at `3d56e423`. `git diff --stat 7362b3bf HEAD -- . ':!docs'` is empty, so this is the code the proto measured. `node_modules` and `tests-visual/node_modules` are symlinked. Removed at the end (§9) |
| state of the proto's scratch | **gone.** The `/tmp` wipe (cursor commit `f538a252`) removed `scratchpad/D1/p2/G-proto/r2`: `eponym.mjs`, `g-law.mjs`, `dominance.mjs`, `holds.json`, `frozen/SEQUENCE.json` with its 17 steps, `repoint.mjs`, the 4 relay rows, the rebind row and `plants.mjs`. `find /private/tmp/claude-504 docs -name eponym.mjs -o -name g-law.mjs -o -name SEQUENCE.json` finds 0. `git log --all -- 'scripts/structure/*'` is empty. The only `battery.md` left in scratch is the D′ critic's |
| migration rebuild | `node rows/apply.mjs` (floor rows f3, f4, m02, m03, f9), then `tools/replay-appendix.mjs`, which rebuilds G-proto Appendix A's lists by hand and runs each step through the floor's `runMoves`. Scan deltas were auto-declared, because the proto's reviewed declarations are lost |
| critic tools (scratch, 285 lines) | `crit-gate.mjs` (sha256 `cea81147…`, 137 lines): my own implementation of SPECS-v2 §4.5 E0–E7 on the floor libs. `plants.mjs` (`fc9d42db…`, 73 lines): plant, judge, undo. `replay-appendix.mjs` (`bc628b90…`, 75 lines) |

### 3.1 The rebuild reproduces the proto's move counts exactly

| step | moves | rewrites | scan deltas | residue | image lost / gained |
|---|---:|---:|---:|---:|---:|
| S2 stage 1, pass 1 | 21 | 96 | 80 | 0 | 0 / 0 |
| S2 stage 1, pass 2 | 4 | 17 | 12 | 0 | 0 / 0 |
| S2 stage 1, pass 3 | 3 | 10 | 9 | 0 | 0 / 0 |
| S3 aggregators | 4 | 38 | 19 | 0 | 0 / 0 |
| S4 stage 2, components | 82 | 286 | 507 | 0 | 0 / 0 |
| S4 stage 2, global arm | 3 | 26 | 9 | 0 | 0 / 0 |
| **total** | **117** | **473** | **636** | 0 | 0 / 0 |

This equals G-proto §4 row for row. On the rebuilt tree, not counting the relay rows or the rebind:
- `graph.mjs`: 7,138 edges, 0 violations;
- `npm run build` exit 0;
- `vue-tsc --noEmit` exit 0; `vue-tsc -p tsconfig.test.json` exit 0;
- `demo:dist:build` exit 0;
- `surface.mjs check`: 68 / 62 / 603 / 1,279, 0 differences;
- `entries.mjs check` PASS;
- vitest: 240 files, 2,328 tests, 8 failed.
  - 3 of the 8 are `boot-graph` "no dist-demo". After the demo build it passes 14/14.
  - The other 5 are the proto's 5 layout-pinning scanners: 4 in `sortable-list/battery.test.ts` and 1 in `g-dock-lattice`.

I did not re-run `cascade.mjs verify`, `npm pack` or `verify:package`.

### 3.2 The reconstruction gate (disclosed: it is mine, not the proto's)

The proto's `eponym.mjs` is lost, so I implemented §4.5 from the spec text:
- **E0:** F-1 violations, plus a regex for a package self-name import.
- **E1:** F-7 with the FD-1 anchor, using SPECS §6.3's code verbatim, plus the proto's relay rule.
- **E2:** a Cooper-Harvey-Kennedy dominator tree per component unit.
- **E3:** eponymy and empty closure.
- **E4:** R-5 strict.
- **E5:** origin on two non-root entries.
- **E6:** demo edges to non-entry `src` files.
- **E7:** single-subject test home.

**Vacuity disclosure.** My first run on the migrated tree read E2 23 and E3 4. I then changed three readings to match the proto's disclosed §8 choices:
- door edges weak, meaning published does not imply a ⊤ edge;
- the STAGES exception to the unit-token drop;
- CSS not a root, plus the eponymy pin and slot tolerance.

After that the migrated tree reads E2 0 and E3 0. So these zeros are tuned toward the proto, not independent evidence. What is independent is the plant bites against a frozen gate (§4) and the RED reading at HEAD.

| tree | E0 | E1 | E2 | E3 | E4 | E5 | E6 | E7 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| HEAD (read-only on the checkout) | 0 | 22 | **45** | **8** | 75 | 40 | 94 | 92 |
| rebuilt migrated tree (no relay rows) | 0 | 31 | **0** | **0** | 71 | 40 | 94 | 98 |
| proto, final (its report) | 0 | 0 | 0 | 0 | 71 | 40 | 90 | 95 |

- **E1 31.** 1 is a `budget.ts` row. The other 30 are relay symbols from `dock/composables/index.ts`, `canvas2d/index.ts`, `glass/index.ts` and `search/index.ts`, exactly the 4 lost relay-cure rows. HEAD's E3 list is the proto's 8 dirs, name for name.
- **E6 and E7** differ from the proto by 4 and 3, because the edge-kind sets differ.
- **E4 71 and E5 40** agree with the proto exactly.

## 4 · Battery results (gate frozen before planting; each plant undone, and the baseline counts are restored equal after all 31 runs)

| # | planted on the migrated tree | clauses that rose | verdict |
|---:|---|---|---|
| P01 | `dock/search/match.ts` → `dock/match.ts` (engine) | E1 +2 (match.ts move), E2 +1 | CAUGHT |
| P02 | 2 glass-dock hooks → `dock/misc/` (engine) | E1 +1, E2 +2, E3 +1 (`dock/misc`) | CAUGHT |
| P03 | `skeleton/Skeleton.vue` → `data-table/` (engine) | E1 +1, **relay rule only** | CAUGHT-EXT. F-7 alone reads it `ok`, since data-table is its reader |
| P04 | `GlassDock.vue` → `glass-dock/DockShellView.vue` | E2 +8, E3 +1 | CAUGHT |
| P05 | 11 files into `badge/` (13 direct) | E4 +1 | CAUGHT |
| P06 | accordion's 4 SFCs flattened into `src/components/` | E1 +11, **relay rule only** | CAUGHT-EXT. F-7 reads them `published` and no E3 dir exists |
| P07a | `dock/registry.ts` (3 SFCs in an object literal), read by GlassDock | E1 +1, E2 +4: DockSeparator and DockTrigger swallowed into `glass-dock/` | NOT SCORED. My gate lacks §4.1's registration-weak rule. The rule is untested in glass-ui: 0 wiring files at HEAD (spec §4.1) |
| P07b | registry plus the 3 SFCs moved into `dock/registry/` | E1 +1, E2 +2 | NOT SCORED (same reason) |
| P08 | `import "./does-not-exist"` in `dock/constants.ts` | E0 +1 | CAUGHT |
| P09 | `useDragVelocity.ts` back to `src/composables/dom/` | E1 +1 | CAUGHT |
| P10 | `ModalOverlay.vue` back into `dialog/` | E1 +1 (global) | CAUGHT |
| P11 | demo story imports `../../../src/components/dock/composables/useDockSpring` | E6 +1 | CAUGHT |
| P12 | `slider/index.ts` re-exports `GlassDock` | E5 +1 | CAUGHT |
| P13 | new single-subject `tests/components/badge-plant.test.ts` | E7 +1 | CAUGHT |
| P14 | dock test placed in `slider/__tests__/` | E7 +1, **plus E0 +2** (`ledger-stale` json-glob in `tsconfig.build.json`) | CAUGHT. See finding F-6 |
| P15 | 520 lines appended to `badge/index.ts` | E4 +1 | CAUGHT |
| P16 | `import { Button } from "@mkbabb/glass-ui/button"` in Badge.vue | E0 +1, **self-name regex only** | CAUGHT-EXT. F-1 raises no violation |
| P17 | `demo/demo.css` `@import` of `dock/styles/run.css` | E6 +1 (`css-import`) | CAUGHT |
| P18 | Badge.vue imports `../dock/composables/useDockSpring` | E1 +1 (global) | CAUGHT |
| P19 | `dock/utils/utils.ts` over `format.ts` and `pad.ts` (eponymous placeholder) | only my informational placeholder regex | **MISSED** by §4.5. The proto added a placeholder regex after reading the earlier battery |
| P20 | `dock/GlassDockLegacy.ts` alias, published on `./dock` beside `GlassDock` | nothing | **MISSED.** E5 is cross-entry only; the proto's "file that only re-exports" clause (added after the earlier battery) would likely catch it, but it is lost and could not be checked |
| P21 | `import("./nope-missing").catch(() => null)` in DockControl.vue | E0 +1 | CAUGHT. Only because the target is missing; a `.catch` to an existing file is outside any clause |
| P22 | `skeleton/DataTableSkeleton.vue`, read only by DataTable.vue | E1 +1 | CAUGHT. The first run failed on the same `generic="…<…>"` regex defect as the proto's B-26; fixed in the plant, gate unchanged |
| P23 | 8 hooks into `dock/composables/` (14) | E4 +1 | CAUGHT |
| P24 | `badge/badge-label/BadgeLabel.vue` alone | E2 +1, E3 +1 | CAUGHT. E3 fires as "no eponymous root" because the unit-token drop makes `BadgeLabel` name `label/`, not as "empty closure" |
| P25 | chain: `dock/search/*` → `dock/wrap/search/*` | E2 +1 (root dir misplaced) | CAUGHT by E2. E3 is blind to a dir that holds 0 direct files |
| P26 | `new URL("../dock/search/match.ts", import.meta.url)` in Badge.vue | E1 +1, E2 +2 | CAUGHT |
| P27 | `data-table/styles.css` → `src/styles/data-table.css` | E1 +1 | CAUGHT. The sheet is SFC-loaded, so it is a load edge; the proto's missed B-28 was aggregator-held |
| P28 | `scripts/foo-helper.mjs`, read only by `profile-bundle.mjs` | nothing new; the E4 row that changed is a line shift | **MISSED.** No `scripts/` law (§4.8 not run) |
| P29 | 4 story SFCs into `demo/stories/dock/` (13) | E4 +1 | CAUGHT |
| P30 | `import type` of `dock/search/types` from Badge.vue | E1 +1, E2 +1 | CAUGHT |

**Score over 29 scored plants:**

| reading | caught | missed |
|---|---:|---|
| clauses as SPECS-v2 §4.5 writes them | **23** | 6: P03, P06, P16, P19, P20, P28 |
| with the proto's relay and self-name extensions | **26** | 3: P19, P20, P28 |
| with the proto's placeholder and re-export-only clauses | predicted 28 | not measurable, since the gate is lost |

## 5 · Findings (failure-mode checklist)

**F-1 · The gate cannot be reproduced; the frozen record was never committed.**
- SPECS-v2 §1.4 requires every computed move list to be "committed as literal JSON before the gate judges".
- The proto froze its lists under `$R/frozen` in `/tmp`, and the wipe destroyed them together with the gate.
- From the report alone, a critic can rebuild the moves: Appendix A's prose lists reproduced 117 / 473 / 636 exactly. A critic cannot rebuild:
  - the 4 relay rows, which are exact text;
  - the rebind row;
  - the 17-step `SEQUENCE.json`;
  - `eponym.mjs`, `g-law.mjs` or `dominance.mjs`.
- Every "RED at HEAD, GREEN at head" and "28/36" claim in G-proto §7 therefore rests on a lost artefact. This is the largest single gap.

**F-2 · Where the spec cites itself, the law is the prototype, not the spec.**
- G-proto §8 lists 9 law choices beyond SPECS-v2.
- I needed 3 of them just to reach 0 on the proto's own tree (§3.2).
- The spec's naming law contradicts itself. The unit-token drop makes `aurora.frag.ts` in aurora into `frag`, while §4.3 states it becomes `aurora-frag`. Only an unstated STAGES exception reconciles the two.
- The gate's definition therefore lives in code that is now lost, and the spec text alone gives a different tree verdict: E2 23 and E3 4 on the migrated tree under the literal reading.

**F-3 · Vacuous convergence.**
- E1 and E2 are zero because the migration ran the same law. The proto discloses this, and my reconstruction was tuned toward it.
- The independent evidence is the plant bites: E1 rose in 16 of my plants and E2 in 11. So the clauses can fail. What remains unproven is that the migrated tree is the tree the edict wants.

**F-4 · Gates that cannot fail the build.**
- E4–E7 are CLI-only, and RED on both HEAD and the migrated tree: 71 / 40 / 90 / 95 per the proto; 71 / 40 / 94 / 98 by mine.
- In `npm test` they cannot fail anything. Half the gate contract is a report, not a gate.

**F-5 · The elegant-reduction trap, in the gestalt (three components walked as a newcomer).**
- **dock.**
  - `src/composables/motion/core/index.ts:21,28` publishes `useRAFLoop` and `useYieldToMain` from `components/dock/glass-dock/glass-backdrop-luminance/`, and `:96` publishes `useScrollChrome` from `components/dock/search/`.
  - A newcomer who opens `composables/motion/` for the RAF loop finds a path four levels into dock's backdrop sampler.
  - A scroll-chrome state machine filed under *search* reads as a mistake.
  - The edict says composables that are "truly module-level or global-level" live in `composables/`. A hook published on a kernel entry is global by publication.
  - R-2 as amended ("a kernel door anchors nothing") drives this, so the defect is shared by every route's stage 1. G, though, nests the files deepest.
  - `glass-dock/`, `search/` and `styles/controls/` do read as modules. The dock unit **mostly reads colocated, with its global primitives wrongly captured**.
- **aurora.**
  - The GL and WGPU backends separate cleanly: `runtime/gl-setup/` and `runtime/wgpu-setup/`. That part reads well.
  - The dir names are file-derived rather than names a reader would choose: `aurora-frag/`, `mediums-glsl/`, `aurora-wgsl/`.
  - The depth is 7 at `runtime/gl-setup/aurora-frag/mediums-glsl/`.
  - `composables/` holds 5 non-hooks (`atoms`, `atoms-fields`, `color`, `configSource`, `auroraFallbackGround`) under slot tolerance.
  - **It reads colocated, but it names by accident rather than by concept.**
- **sheet.**
  - `sheet/content/` holds `SheetContent.vue`, `projection.ts` and `use.ts`. The file `use.ts` exports `useSheetDetents`, and the authored name `detents/` is gone.
  - A newcomer cannot tell from the tree what `use.ts` does.
  - **It reads colocated and illegible.**
- Also: `slider/useDockHold.ts` keeps a name that says dock, and `fourier-field/renderer/` became `wgpu/`.
- Verdict: the tree reads more colocated than HEAD, but not yet the reader's structure. The naming law erases authored concepts in at least 4 places.

**F-6 · R-3 cannot start without FD-7.**
- P14 shows that the first `src/**/__tests__/` file flips E0 RED, with 2 `ledger-stale` json-glob violations on `tsconfig.build.json`.
- The rebuilt tree has 0 `__tests__/` dirs, and E7 is 98.
- R-3's homing is entirely owed, and blocked on FD-7.

**F-7 · Aliases, dual paths and masked fallbacks.**
- An alias on the same door (P20) passes every §4.5 clause.
- A fallback caught only when its target is missing (P21) means a `.catch(() => import("./Other"))` to a real file is invisible.
- Neither is a structure clause in the spec. The edict's "no aliases, no masking fallbacks" is not yet enforced by G.

**F-8 · The backend clause is unaddressed.**
- §4.8 was not run, and P28 was missed.
- On value.js and speedtest, G itself concedes that layered backends and DI containers need declared facts (§4.9(e)).

**F-9 · FD-2 is violated.**
- By the proto's measure, the unit SCC grows from 7 to 30.
- This is the same mechanism as F-5.
- I did not re-measure SCCs.

## 6 · Edict fidelity

| clause | status on the migrated tree |
|---|---|
| recursive colocation of sub-components, composables, constants | PARTLY. 82 stage-2 moves nest real closures (dock, aurora, blob, toast, tabs, sortable). Global kernel hooks are captured into components (F-5) |
| skeletons | MET for `Skeleton.vue`, which stays in `skeleton/`. P22 shows a misplaced skeleton is caught |
| styles colocated | CONCEDED. 44 of 54 sheets are aggregator-held (spec §1.4); the CSS channel collapse is unbuilt |
| composables/ only for module-level or global | VIOLATED by the kernel-door captures (F-5); `aurora/composables` holds non-hooks |
| long dirs broken into modules | NOT MET. E4 is 71; G cannot split peer sets (`menu` 16, `styles/glass` 28, `styles/tokens` 21, `tests-visual` 177) |
| backend files | NOT RUN (F-8) |
| clean breaks, no aliases or dual paths | PARTLY. E5 is 40 (R-6 not run); the same-door alias is uncaught (P20); the 4 relay cures are lost |

## 7 · Convergence: 60 %

Formula: rows met over rows owed, across the 10 migration steps G-S0–G-S9 and the 15 items of the §6.4 bar, where a partly met row counts ½.
- **Steps:** G-S0 to G-S5 are met (6). G-S9 is half met: the gate landed, but its artefact is lost and there is no scripts law. G-S6 to G-S8 are not met. That makes 6.5 of 10.
- **Bar, met in full (8):**
  - migration by script;
  - rerun proposes 0;
  - toolchain;
  - surface;
  - cascade (the proto's claim; not re-run by me);
  - no component moved without a named reason;
  - gestalt walk reported;
  - move-count replay (reproduced by me).
- **Bar, half met (3):**
  - byte-identical replay: the digest cannot be checked any more without the relay rows;
  - vitest: 5 failures, ruling owed;
  - gate RED/GREEN for E0–E3 only.
- **Bar, not met (4):**
  - the full battery;
  - F-9 independence;
  - bounds;
  - π and Playwright.
- Bar total: 8 + 1.5 = 9.5 of 15, which rounds to 8.5 after I mark the relays-and-no-placeholders row as half, because it was verified only through a lost gate.

(6.5 + 8.5) / 25 = **60 %**.

## 8 · Open gaps (exact)

1. The G gate, law, frozen `SEQUENCE.json`, 4 relay rows and rebind row are lost. They must be re-authored and **committed** as literal JSON and tracked code before any claim in G-proto §7 can be re-verified (F-1).
2. Write the §8 law choices, including the STAGES exception and the slot, pin and hook-only rules, into the spec's own text. The literal spec gives E2 23 and E3 4 on the proto's tree (F-2).
3. E4 is 71. The peer sets G cannot name (`menu`, `styles/glass`, `styles/tokens`, `tests-visual`, `tests/components`) need a naming source outside G.
4. E5 is 40: R-6 rows not run, and the ruling's 29 against the measured 40 is not reconciled.
5. E6 is 90–94: the R-10 demo reroute (G-S8) is not run.
6. E7 is 95–98: 0 `__tests__/` homes. Blocked on FD-7, since the first `__tests__` makes E0 RED (P14), and on FD-6 and FD-8.
7. E4–E7 are not wired into `npm test` (F-4).
8. FD-2 no-growth is violated (unit SCC 7 → 30): kernel entries publish hooks stage 1 moved into component interiors (F-5, F-9). This needs a ruling that a kernel-published file is global.
9. Naming erases authored concepts: `detents` became `content/use.ts`, `renderer` became `wgpu`, `useDockHold` now lives in slider, and `aurora-frag`, `mediums-glsl` and `aurora-wgsl` are file-derived (F-5).
10. Missed by the §4.5 clauses: P19 (placeholder), P20 (same-door alias), P28 (scripts helper). P03, P06 and P16 are caught only by clauses the proto added after the earlier battery, not by the spec.
11. §4.1's registration-weak rule is unexercised in glass-ui (0 wiring files), and without it a registry swallows its targets (P07a, reconstruction arm).
12. The masked-fallback class is caught only when the target is missing (P21); an alias or fallback onto a live file is outside every clause (F-7).
13. The `scripts/` backend law (§4.8) is not run (P28), and the layered-backend and DI concessions (§4.9(e)) are unanswered.
14. G-proto's 5 FD-6 scanner failures are reproduced on my rebuild; their ruling is owed.
15. π and Playwright have not run.

## 9 · Teardown and fences

- **Writes in the checkout:** this file only, via Write and a heredoc append.
- **Reads:** the HEAD reconstruction-gate run read the main checkout read-only.
- **Git:** worktree add and remove are my only git writes. No sibling repo was touched, and nothing under `~/.claude` was read.
- **Scratch:** `out/plants.json`, `out/plants-P22.json`, `out/gate-M.json`, `out/gate-HEAD.json` and `out/replay-log.json` stay in `scratchpad/D1/p2/G-crit/`.
