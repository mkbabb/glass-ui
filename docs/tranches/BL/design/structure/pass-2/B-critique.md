# D1 · pass 2 · B-critique: adversarial critic for route D1-B

| field | value |
|---|---|
| seat | D1 pass-2 CRITIC for route B (sealed modules, flat). Not the author |
| model | `claude-opus-5-5`, asserted from own system identity |
| inputs before the battery | CHARTER.md edict (last four paragraphs), RULINGS.md R-1..R-10, SPECS-v2.md §1 and §2 only |

## 1 · Intent battery (written before reading seal.mjs or B-proto.md)

Each item is an exact edit planted on the migrated tree (paths resolved on that tree when a file moved). "expect" is the
clause the spec's §2.5 table says should fire; "edict" is the edict/ruling it violates.

| # | intent | plant | expect | edict |
|---|---|---|---|---|
| I1 | composable in the global kernel read by one component | new `src/composables/dom/useSliderThumbGlow.ts` (`export function useSliderThumbGlow(){return 1}`), imported by `slider/Slider.vue` via `@/composables/dom/useSliderThumbGlow` | B10 | colocation, R-2 |
| I2 | I1 but published through the kernel door (kernel door anchors nothing) | I1 plus `export * from "./useSliderThumbGlow"` in `composables/dom/index.ts`, Slider imports the door | B10 | R-2 amended |
| I3 | composable in component A read only by component B | new `dock/composables/useDockGhost.ts`, not on dock's door, imported only by `slider/Slider.vue` | B10 + B1 | colocation |
| I4 | relative deep import past a door | `slider/Slider.vue`: `import { useDockHold } from "../dock/composables/useDockHold"` (or its moved path) | B1 | sealed doors |
| I5 | member imports its own door | `chip/Chip.vue`: `import { chipVariants } from "./index"` | B1 | B1 text |
| I6 | self-name import (package name from inside src) | `chip/Chip.vue`: `import { Badge } from "@mkbabb/glass-ui/badge"` | B1/B0 | doors, no dual path |
| I7 | CSS `@import` reaching a private stylesheet | `src/styles/index.css` (or its door): `@import "../components/dock/styles/shape.css";` | B3 | sealed CSS doors |
| I8 | long dir | add 13 one-line `.ts` files to `chip/` | B6 | "long running dirs" |
| I9 | >500-line file | append 520 `export const kN = N;` lines to `chip/chipVariants.ts` | B6 | R-5 |
| I10 | >500-line script | append 520 lines to a `scripts/` bin | B6 | backend analogue |
| I11 | test outside its subject | new `tests/unit/chip-only.test.ts` importing only `../../src/components/chip` | R-3 (no clause named) | R-3 |
| I12 | test colocated in the wrong unit | new `chip/__tests__/slider-only.test.ts` importing only `@/components/slider` | R-3 (no clause named) | R-3 |
| I13 | dual door | `badge/index.ts`: `export { Chip } from "../chip"` | B9 | R-6 / E-1 |
| I14 | alias name on a door | `chip/index.ts`: `export { Chip as Pill } from "./Chip.vue"` | B11 | no aliases |
| I15 | placeholder module name | new `dock/part-1/index.ts` + file, declared door | B15 | naming law |
| I16 | module named after its parent | new `menu/menu/index.ts` + file | B15 | naming law |
| I17 | masked fallback on a deep path | `slider/Slider.vue`: ``await import(`../dock/composables/${n}.ts`).catch(() => null)`` | B0/B1 (dynamic-template) | no masking fallback |
| I18 | skeleton away from its component | new `skeleton/DataTableSkeleton.vue` not on skeleton's door, imported only by `data-table/DataTable.vue` | B10 | R-9 |
| I19 | skeleton in the kernel | same file at `_shared/DataTableSkeleton.vue` | B10 | R-9 |
| I20 | stylesheet away from its only component | new `src/styles/slider-thumb.css` loaded only by `slider/Slider.vue` (`<style src>` or `@import`) | B10/B3 | "same for styles" |
| I21 | doorless dir deep-imported (C-6 shape) | new `dock/ghost/useGhost.ts`, no door, imported by `dock/GlassDock.vue` | B7 | modules have doors |
| I22 | kernel reads a unit (type only) | `composables/dom/useBreakpoint.ts`: `import type { DockProps } from "@/components/dock"` | B8 | kernel below units |
| I23 | src reads the demo | `chip/Chip.vue`: `import x from "../../../demo/main"` | B8 | zone direction |
| I24 | sibling cycle | `chip/Chip.vue` imports `../badge`, `badge/Badge.vue` imports `../chip` | B4 | — |
| I25 | door impurity (JS) | `chip/index.ts`: `export const CHIP_DEFAULT = "x";` | B14 | doors are doors |
| I26 | door impurity (CSS) | append `.x{color:red}` to a CSS `index.css` door | B14 | doors are doors |
| I27 | relay / legacy shim | new `dock/constants.legacy.ts`: `export * from "./constants"` (or moved equivalent), imported by a dock member | B12 | no shims |
| I28 | dir inside a kind slot | new `dock/composables/hold/useHold.ts` | B5 | slots flat |
| I29 | bin imports a bin | `scripts/regen-spring-tokens.mjs`: `import "./gen-component-styles.mjs";` | B13 | — |
| I30 | kernel entry re-exports a unit file | `composables/dom/index.ts`: `export { useDockHold } from "<dock path>"` | B8/B9 | R-2, R-6 |
| I31 | demo past a door | a demo SFC imports a private dock composable by deep path | B2 | R-10 |
| I32 | computed-path read outside the harness | `tests/unit/walk.test.ts`: `readFileSync(join(root, "src/components/" + n))` | B0 | R-3 harness |
| I33 | undeclared `index.ts` | new `chip/extra/index.ts` absent from `record.doors` | B7 (+ build guard) | one record |
| I34 | long demo dir | 13 files in one story category | B6 | all dirs |

Legal probes (must stay clean): L1 `slider/Slider.vue` imports `@/components/dock` door symbol; L2 new
`slider/useSliderLocal.ts` read only by `Slider.vue`.

## 2 · Verdict: BLOCK at 30% convergence

The prototype does what it says: the migration replays from frozen lists, the surface holds byte for byte, and the gate is
a strong one (30 of 34 battery items caught in the intended clause, both legal probes clean). But the route does not
converge on its own gate, and on two measures the migrated tree is further from the edict than HEAD:

- the `@src` value/type SCC grows from 7 to 14 top-level modules, because kernel entries still re-export files that placement
  moved into units;
- those kernel entries are now shims. `src/composables/search/index.ts` owns no file and re-exports three `dock/search`
  files so that `./search` keeps its names. That is the dual path the clean-break rule forbids. The prototype's "no shims: met"
  counts B12 only, and B12 exempts doors.

B stays blocked until the §2.9(a) ruling is made and the gate gaps in §6 are fixed. The gate is the part of this route worth
keeping whatever the ruling says.

## 3 · Rebuild (my own worktree, the prototype's frozen tools)

- Worktree `…/scratchpad/D1/p2/B-crit/wt` at `21b3824f` (HEAD; `git diff --stat 34756ec5 HEAD -- . ':!docs'` is empty).
  node_modules and tests-visual/node_modules symlinked from the checkout. Removed with `git worktree remove --force` at the end.
- `migrate.sh` copied from `B-proto/tools/` with only the `cd` path changed, run against the prototype's `frozen/` lists.
  Every list reported `ok`, residue 0; 1 min 42 s.
- Digest: code digest `7733d92a…c869` over 1,392 files, **equal to the prototype's R4/R5/R6**. The full digest differs
  (`7fc97752…`, 12,459 files) because docs moved on, which is expected.
- `seal.mjs` on the rebuilt tree: 1,497 lines, 12 clauses RED, B5/B11/B13/B15 GREEN. Same per-clause counts as B-proto §5.1.
- `seal.mjs --no-pin --root <checkout>` at HEAD, read-only: **1,888** (B0 461, B11 12). B-proto reports 1,902 (B0 474, B11 13)
  at `34756ec5`. The two bases have the same code. The 14-line gap is not reconciled.

## 4 · Battery results

Harness: `…/B-crit/battery.mjs` (in-memory overlays via `buildGraph({overlay})`, a plant counts as caught when its intended
clause gains a line that names the planted path). The output is in `…/B-crit/out/battery.json`.

| # | result | clause(s) that fired |
|---|---|---|
| I1 kernel composable, one reader | CAUGHT | B10, B1 |
| I2 same, through the kernel door | CAUGHT | B10, B11 |
| I3 dock composable only slider reads | CAUGHT | B10, B1 |
| I4 relative deep import past a door | CAUGHT | B1 |
| I5 member imports its own door | CAUGHT | B1 |
| **I6 self-name import `@mkbabb/glass-ui/badge` from `chip/`** | **MISSED** | none. F-1 resolves it to `badge/index.ts`, an entry source, and B1 skips every `PUB` target |
| I7 `./styles` aggregate `@import`s `dock/styles/core.css` | CAUGHT | B3 (my first plant landed in a comment; the re-plant at end of file fires) |
| I8 13 files in `chip/` | CAUGHT | B6 |
| I9 500+ line TS file | CAUGHT | B6 |
| I10 500+ line script | CAUGHT | B6 |
| **I11 single-subject test left in `tests/`, door-only reads** | **MISSED** | none. No clause implements R-3's "with its subject" |
| **I12 test in `chip/__tests__/` whose subject is slider** | **MISSED** | only B0's `tsconfig.build.json ledger-stale` lines, which also fire on a correct test (L3) |
| I13 badge door republishes `Chip` | CAUGHT | B9, B11 |
| I14 `Chip as Pill` alias on a door | CAUGHT | B11 (pin) |
| I15 `dock/part-1/` | CAUGHT | B15, B7, B11 |
| I16 `menu/menu/` | CAUGHT | B15 |
| I17 dynamic-template deep import with `.catch(() => null)` | CAUGHT | B1 ×6, B10 ×3 |
| I18 skeleton in `skeleton/` that only data-table reads | CAUGHT | B10, B1 |
| I19 skeleton in `_shared/` that only data-table reads | CAUGHT | B10, B1 |
| I20 kernel sheet only slider loads | CAUGHT | B10, B3 |
| I21 doorless dir deep-imported | CAUGHT | B7 |
| I22 kernel `import type` of a unit | CAUGHT | B8 |
| I23 src reads demo | CAUGHT | B8 |
| I24 chip ↔ badge cycle | CAUGHT | B4 |
| I25 code in a JS door | CAUGHT | B14 |
| I26 rule in a CSS door | CAUGHT | B14 |
| I27 `constants.legacy.ts` relay | CAUGHT | B12 |
| I28 dir inside a kind slot | CAUGHT | B5 |
| I29 bin imports a bin | CAUGHT | B13 |
| I30 kernel entry re-exports a unit file | CAUGHT | B8, B9, B1 |
| I31 demo deep past a door | CAUGHT | B2 |
| **I32 `readFileSync(join(process.cwd(), "src/components/" + n))` in `tests/`** | **MISSED** | none. F-1 records a `helper-base` edge and no census row, so B0's computed arm never sees it |
| I33 undeclared `index.ts` | CAUGHT | B7 |
| I34 13 files in a story category | CAUGHT | B6 |

**Primary battery: 30/34 caught in the intended clause.** Variants: I4b (`@/` alias deep import) is caught by B0 as an
unresolved bare specifier, fail-closed. I7b, I11b, I17b and I17c are caught. **I15b `dock/utils/` and I15c `dock/v2/` pass B15.**
They trip only B7 (not in `record.doors`) and the B11 pin, so once the door is declared and the pin rewritten the name
goes through.

Probes added after reading the gate:

| probe | result |
|---|---|
| I32b ``readFileSync(`src/components/${n}/index.ts`)`` | MISSED |
| I32c `readFileSync(resolve(import.meta.dirname, "../../src/components", n, "index.ts"))` | MISSED |
| I35 kernel entry `export *` from a unit file | CAUGHT (B1, B8, B9, B11) |
| I36 a copy of `useDockHold.ts` under a new name, read in place of the original | MISSED (out of a structure gate's reach; noted, not scored) |
| I37 kernel constants file one unit reads | CAUGHT (B10) |
| I38 scripts-zone placement | NOT JUDGED. B10 calls `placeAll(g, units, { zones: ["src"] })`, but SPECS §2.2 says `["src","scripts"]`. With `scripts` added, F-7 proposes `scripts/reflect-capture-verify.mjs → scripts/lib`, which the gate never shows |
| L1 slider reads dock through its door | CLEAN |
| L2 slider-local composable | CLEAN |
| **L3 correct colocated test `chip/__tests__/chip.test.ts` reading `..`** | **FALSE POSITIVE**: B0 gains 2 `tsconfig.build.json: ledger-stale [json-glob]` lines. The R-3 move the spec requires turns the gate RED for a reason unrelated to R-3 until FD-7 lands |

## 5 · Critique against the failure-mode checklist

**Vacuous convergence: not vacuous, and not converged.** B10's 1 comes from move lists F-7 computed, but I1–I3, I18–I20
and I37 all bite B10 on the frozen tree, so B10 can fail. The real problem is the other direction: 12 of 16 clauses are
RED on the tree the route produced. "Rerun proposes 0 moves" is met only because the replay reruns the same planner that
made the lists.

**Spec cites itself.** The spec's own invariants fail and are recorded without a stop:
- FD-2 "`moduleSccs` must not grow" is breached, 12 → 40 members. B-proto §3.2 says the planner "records `grew: true` and does
  not stop". An invariant that is logged and then ignored is not an invariant.
- §1.4 "CSS placement waits on the channel collapse" contradicts FD-3, which placed `chip/accent-tone.css` into the style kernel.
  Of two spec rules, the one that moved the file won by default.
- §2.5 names FD-10 YAML tokens inside B13, and §2.2 names the `scripts` zone for placement. The gate has neither.

**Gates that cannot fail.** None among B0–B15 on the battery. Two arms are narrower than the spec says:
- B0's computed-read arm fires only on F-1 census kinds `fs-read`/`path-helper`. The three common forms I32/I32b/I32c
  produce nothing.
- B15 is a closed regex list (`part-N`, `-N`, `wN`/`pN`, parent repeat, slot name), so `utils`, `v2`, `misc` pass. It also
  judges dirs only: `sheet/detents/use.ts` has a name that says nothing, and no clause reads file names.

**The elegant-reduction trap.** "Every code dir is a module with a door" does reduce the rules to one idea. But the
doors themselves are the cost:
- 119 modules, 103 doors, 1,303 pinned names;
- +7,419 B unpacked;
- doors like `sheet/index.css`, which is `@import "./styles.css";` and nothing else.

The door graph is also what grows the cycle. B4's `@src` SCC now runs `composables/search → dock → … → _shared → tabs → select`
across 14 modules, because a barrel in the kernel re-exports a unit's files. Sealing by barrels made the library more
coupled at module grain, not less.

**Aliases and dual paths.** Present on the migrated tree, and the prototype reports them as met:
- `composables/search/index.ts` owns zero files and re-exports `dock/search/{useFuzzySearch,match,types}`;
- `dom/index.ts`, `glass/canvas2d/index.ts` and `motion/core/index.ts` re-export 9 more moved files (B8 12);
- 40 symbols sit on two non-root entries (B9).

Together these are the surface-preserving dual path §2.9(a) describes. It stays on the tree because a ruling is owed. The
fact that the gate reports it is to its credit. The report's "no shims: met" is not accurate.

I6 is a separate dual path. A library file can import its own package by name, and nothing catches it.

**Masked fallbacks.** I found none in the gate. `seal()` fails loud on unparseable CSS, and `readPin` throws on a missing
pin. Two soft edges:
- `(T.read(f) ?? "")` counts an unreadable file as 0 lines for B6;
- `--no-pin` turns B11's pin arm off from the command line with no record of it. The HEAD baseline uses it, which is legitimate
  there, but `npm test` should refuse it.

**Unverified gestalt: walking the tree as a newcomer.**
- **slider**: `Slider.vue`, `types.ts`, `styles.css`, `index.css` (a one-line door), `index.ts`, `useDragVelocity.ts`,
  `useDockHold.ts`. The last one stops the reader: the file is named for the dock, lives in slider, and dock's
  `useDockState.ts:128` and `styles/morph.css:324` still describe it as dock behaviour. By its readers it is colocated; by
  its name it is not. The route has no rename step, and B15 does not read file names.
- **chip**: `Chip.vue`, `chipVariants.ts`, `types.ts`, `index.ts`, README. `chipVariants.ts:4` emits the `accent-tone` class,
  but the sheet that styles it is now `src/styles/accent-tone.css`, and its first line still reads `/* chip/accent-tone.css`.
  The chip's style left the chip. The edict says "same for styles", so this reads **not colocated**.
- **dock**: reads well. The legibility and search kernels now sit in `dock/legibility/` and `dock/search/` with their only
  reader. Two misfits: `useScrollChrome.ts` sits in `search/`, and `dock/search/*` still has a kernel twin door in `composables/search/`.
- **src/styles** (the substrate): `glass.css` next to `glass/`, `theme.css` next to `theme/`, `scroll-chrome.css` next to
  `scroll/`. In each case a module's door sits outside its dir, because both refused moves (B-proto §4) left these half-carved.
- **src/composables** (consumer-less substrate): `budget.ts` sits loose in a container. `search/` is a door with no files.

Verdict on gestalt: the component side mostly **reads colocated** (dock, sheet, data-table, skeleton). The substrate does
**not yet read as a substrate**: it holds a hollow module, two half-carved style modules, and one component's stylesheet.

**Edict fidelity.**

| edict clause | on the migrated tree |
|---|---|
| components colocated with sub-components, composables, skeletons, constants | largely met. 29 placement moves, M03 cured, `Skeleton.vue` kept home |
| same for styles | **breached** by `accent-tone.css`. B3 has 14 crossings, waiting on R-7 |
| only truly global composables in `composables/` | **breached** by the four kernel doors that re-publish unit files (B8 12) |
| long dirs broken into modules | `src` 9 → 0 dirs over 12. Demo 2, tests 6 and tests-visual 1 are untouched. 57 files are over 500 lines, before and after |
| backend analogue | `scripts/` unbuilt (B-S15), and B10 does not judge the `scripts` zone |
| clean breaks, no shims, no dual paths | **breached** (kernel shims, 40 dual-entry symbols, self-name import unguarded) |

## 6 · Convergence: 30%

Derivation, from measured ratios:

| ratio | value |
|---|---:|
| gate clauses GREEN | 4/16 = 25% |
| spec steps run | 8/18 = 44% (B-S0–S6, S17) |
| gate lines cured from HEAD | 1,888 → 1,497 = 21% |
| mean | **30%** |

The battery rate (30/34) measures the gate, not the route, so it is not in the mean.

Open gaps (100% means all of them are closed):

1. The gate is RED on the migrated tree: 12/16 clauses, 1,497 lines.
2. §2.9(a) is unruled. Kernel entries are shims (`composables/search/index.ts` owns 0 files), with B8 12 and B9 82. The `@src` SCC
   grows 7 → 14 modules, and FD-2 is breached 12 → 40 with no stop.
3. The gate misses a self-name import (`@mkbabb/glass-ui/<x>` from inside `src`), because B1 exempts every `PUB` target without
   checking the importer's zone.
4. B0's computed-read arm misses `join(process.cwd(), "src/…" + n)`, template-literal paths and
   `resolve(import.meta.dirname, …, n)`. This is an F-1 census gap.
5. R-3 has no clause: a single-subject test in `tests/` and a test colocated in the wrong unit both pass. A correctly colocated
   test trips B0 via `tsconfig.build.json` ledger-stale globs, which is a false positive until FD-7 lands.
6. B10 judges only `src`, while SPECS §2.2 says `["src","scripts"]`. F-7's `reflect-capture-verify.mjs` row is unjudged.
7. B13 omits the FD-10 YAML tokens that §2.5 names. FD-10 is unbuilt.
8. B15 passes `utils`, `v2` and `misc` dirs, and no clause judges file names (`detents/use.ts`, `slider/useDockHold.ts`).
9. `chip/accent-tone.css` moved to `src/styles/`: FD-3 against §1.4, an edict breach ("same for styles").
10. The `glass.css` and `theme.css` moves were refused (an F-2 base-relative rewrite; F-3 has no declared CSS output name). B7 is 3,
    and the style kernel is half-carved.
11. B-S7 to B-S16 are spec-only: B2 778, B0 463, B6 66 (57 files over 500 lines), B3 14, B12 3 and B14 1 wait on them or on
    rulings (R-6 count, R-7 collapse, `./aurora-config`, `@source` in the aggregate).
12. 14 vitest failures in the unruled FD-6 class.
13. The floor rows are not re-runnable, and F-2 leaves an emptied dir.
14. π and Playwright have not run.
15. The HEAD gate count differs between the prototype (1,902) and this critic (1,888) on code-identical bases. Not reconciled.
16. `npm test` accepts `seal.mjs --no-pin`, a silent off switch for B11's pin arm.

## 7 · Commands

```sh
C=…/scratchpad/D1/p2/B-crit
git -C <checkout> worktree add --detach $C/wt HEAD; ln -s <checkout>/node_modules …; ln -s <checkout>/tests-visual/node_modules …
$C/migrate.sh $C/out/M                                   # B-proto frozen lists, cd path only changed
node scripts/structure/seal.mjs --json $C/out/seal-migrated.json   # 1,497
node scripts/structure/seal.mjs --slot-arm exempt                  # B6 64
node scripts/structure/seal.mjs --root <checkout> --no-pin         # 1,888 at HEAD, read-only
node $C/battery.mjs . $C/out/battery.json                # 34 + 7 variants + 2 legal
node $C/probe.mjs; node $C/probe2.mjs; node $C/probe3.mjs          # I32b/c, I35-I38, L3, I7 re-plant, scripts placement
git -C <checkout> worktree remove --force $C/wt
```
