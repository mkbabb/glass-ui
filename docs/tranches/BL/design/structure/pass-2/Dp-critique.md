# D1 · pass 2 · D′ critique

| field | value |
|---|---|
| seat | adversarial CRITIC for route D1-D-prime (D′), pass 2. I did not author the route, the spec or the prototype |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | HEAD `3d56e423`. `git diff --name-only 5b536c72 HEAD -- . ':!docs'` is 0 files, so the code is the code the prototype migrated |
| order kept | 1. edict (CHARTER, last four paragraphs), `RULINGS.md`, SPECS-v2 §0, §1 and §3 read. 2. Battery written and hashed (09:47:41 EDT, sha256 `812bff6d…a854`, `scratchpad/D1/p2/battery.md`). 3. Only then `Dp-proto.md` read. The gate code could not be read after that, because it no longer exists (§1) |
| prior file | An untracked `Dp-critique.md` from an earlier critic seat (at `abf47ad7`) was here. Its tools were lost in the same `/tmp` wipe. I copied it byte for byte to `scratchpad/D1/p2/Dp-critique.prior.md` before overwriting it, read it only after my battery was frozen, and took no number from it |
| instruments | `scratchpad/D1/p2/Dp-crit/crit-plants.mjs` (sha `f7695dbddff8`): physical plants in my worktree, judged by every executable that still exists (floor F-1 `buildGraph`, F-3 `validateRecord` + `compareToPackage`, F-7 `placeAll(dirUnits())`, `bounds.mjs`, `valueSccs`), each file restored after each plant; restore verified (`restoredClean: true`). `published.mjs` (sha `9fbf8475c77b`): which public entries export each of the law's moved files, through `makeOrigins`. Results in `Dp-crit/out/battery.json` (sha `4f7c41dadecc`) |
| worktree | `scratchpad/D1/p2/Dp-crit/wt`, `git worktree add --detach … HEAD`, both `node_modules` symlinked, floor rows applied (`rows/apply.mjs`: f3, f4, m02, m03, f9), removed with `git worktree remove --force` (worktree list count afterwards: 0) |
| fences | no tracked-source edit in the checkout; git writes were only worktree add and remove; `~/.claude` not read; no sibling repo touched; this file is the checkout's only write |

## 0 · Verdict: BANK · convergence 7% (2 of 28 invariants met by my own measurement)

- **The prototype cannot be replayed from anything that exists.** The report's whole evidence base lived in `scratchpad/D1/p2/Dp-proto/v2/tools/`: the law (`dp-law.mjs`, 365 lines), the gate (`gate-dp.mjs`), the rank table, the move lists and `migrate.sh`. None of it was banked. `f538a252` records the `/tmp` wipe, and `find /private/tmp/claude-504 -name dp-law.mjs` returns nothing. `git ls-files | grep -iE 'dp-law|gate-dp|rank-table'` returns only the report. SPECS-v2 §1.4 requires every computed move list to be "committed as literal JSON before the gate judges the result". No move list, row list or plan JSON was committed. The 133, the 331, the 46/50 plants and the byte-identical replay are now claims that no one can re-derive.
- **My battery against the executables that exist:**
  - 12 of 28 non-exempt plants caught with the right diagnosis;
  - 4 more caught with a wrong or harmful diagnosis;
  - 12 missed;
  - the 2 plants the route admits it cannot catch (I11 placeholder name, I25 recursive sub-component) were missed, as expected.
  
  Every D′-specific clause is absent, because the gate is absent: `self-name`, `upward`, `door-impure`, `door-impure-css`, `door-reads-door`, `dual-door`, `test-home`, `bin`, `unzoned`, `below`. So against the D′ gate the battery scores **0 of 28 measurable**.
- **The law breaks R-2 as amended for 4 public files.** `published.mjs` shows 7 files published on a substrate entry that the law moves into one consumer component. For 4 of them the publishing door is the file's own unit root door, which R-2 anchors ("a file that its own unit's door publishes is ANCHORED in that unit"; X-10: "the index at the unit root that an entry … reaches"):

  | file | own root door | public names | law's target |
  |---|---|---|---|
  | `dom/useClipboard.ts` | `./dom` | `useClipboard`, `writeClipboard` + 5 types | `components/easing/` |
  | `dom/useDragVelocity.ts` | `./dom` | `useDragVelocity` + 2 types | `components/slider/` |
  | `motion/core/useRAFLoop.ts` | `./motion-core` | `useRAFLoop` + 4 types | `components/dock/composables/` |
  | `motion/core/useYieldToMain.ts` | `./motion-core` | `useYieldToMain`, `yieldToMain` + 1 type | `components/dock/composables/` |

  The cause is in the spec: FD-1 (§1.2) excludes every door that "sits under a global zone", so a `src/composables/*` entry door anchors nothing. That is a narrowing of R-2 that the ruling never made. The prototype then legalised the result by computing `dom/index.ts` and `motion/core/index.ts` as "aggregator" anchors. The public `./motion-core` door now re-exports its RAF loop out of the dock component.
- **Why BANK and not ADVANCE.** Three things cannot advance:
  - the evidence is gone;
  - the edict's hard core is outside what D′ does: long dirs broken into named modules (R-5: 75 violations, unchanged by D′), sub-components recursively colocated (7 in 6 units) and CSS door splits (3). D′ mints no name, so all of that passes to a naming route that does not exist;
  - the law contradicts R-2 on the global substrate.

  **Why not BLOCK or RETIRE.** The rank-table idea (one `[prefix, stratum, grain]` table, computed anchors, an `upward` clause over every F-1 edge kind) is a sound, small gate substrate for another route to compose with, and SPECS §3.3 declares exactly that interface. Standalone, the route meets the charter's BLOCK test, because the missing naming primitive is as hard as the original problem.

---

## Intent battery (written before reading `Dp-proto.md`; the gate code was never readable)

Each plant was applied alone to the floor-row tree (HEAD + f3, f4, m02, m03, f9), which is the tree every route starts from. The D′ migrated tree could not be rebuilt, because the law that builds it is lost (§1). A plant counts as caught when a NEW violation appears that names the planted file or edge. The base on that tree: F-1 0, F-7 move/global/unread 53, src value SCCs 2, F-3 0, bounds 75.

| id | edict / ruling | exact plant | clause D′'s spec assigns | extant executables' verdict | result |
|---|---|---|---|---|---|
| I01 | R-4 misplaced composable | new `src/composables/dom/useBadgePulse.ts` read only by `Badge.vue` | placement owned | F-7 move → badge | CAUGHT |
| I02 | colocation | new `slider/useBadgeTone.ts` read only by `Badge.vue` | placement | F-7 move → badge | CAUGHT |
| I03 | door | `Badge.vue` imports `../dock/composables/useDockHold` (past dock's door) | placement reach | nothing | MISSED |
| I04 | self-name | `Badge.vue` imports `@mkbabb/glass-ui/button` | self-name | nothing (F-1 resolves it) | MISSED |
| I05 | CSS private reach | new `badge/styles.css` = `@import "../card/scroll.css"`, script-imported by `Badge.vue` | placement reach | F-7 "move `card/scroll.css` → badge" and "unread `badge/styles.css`" | CAUGHT, WRONG: it tells you to steal card's sheet and delete the live new one |
| I06 | long dir | 13 new `badge/partNN.ts`, all read by `Badge.vue` | bound | bounds `badge` 15 | CAUGHT |
| I07 | >500 lines | new `badge/badgeTable.ts`, 510 lines | bound | bounds 510 | CAUGHT |
| I08 | R-3 test outside subject | new `tests/badge-only.test.ts` importing only badge | test-home | nothing | MISSED |
| I09 | R-3 test in wrong unit | new `button/__tests__/badge.test.ts` importing only badge | test-home | F-7 "move `Badge.vue` → button"; F-1 ledger-stale ×2 | CAUGHT, WRONG: it moves the subject to the test |
| I10 | R-6 dual door | `chip/index.ts` + `export { Badge } from "../badge"` | dual-door | nothing | MISSED |
| I11 | placeholder name | new `badge/helpers/utils.ts` | none (D′ has no naming law) | nothing | MISSED (admitted) |
| I12 | masked fallback | `import("./BadgeFancy.vue").catch(() => import("./Badge.vue"))`, target absent | unresolved | F-1 unresolved | CAUGHT |
| I13 | alias | `badge/index.ts` + `export { default as BadgeCompat } from "./Badge.vue"` | dual-door | nothing | MISSED |
| I14 | R-9 skeleton away | new `skeleton/CardSkeleton.vue` read only by `Card.vue` | placement | F-7 move → card | CAUGHT |
| I15 | direction | `dom/useBreakpoint.ts` imports `../../components/button` | upward | nothing | MISSED |
| I16 | direction, CSS | `src/styles/tokens.css` + `@import "../components/button/styles.css"` | upward | nothing | MISSED |
| I17 | CSS door purity | `src/styles/glass.css` + `.bl-plant{color:red}` | door-impure-css | nothing | MISSED |
| I18 | JS door purity | `skeleton/index.ts` + `export const SKELETON_PLANT = 3` | door-impure | nothing | MISSED |
| I19 | aggregator read inside the library | `Badge.vue` imports `../../index` | door-reads-door | value SCC `Badge.vue ↔ badge/index.ts ↔ src/index.ts` | CAUGHT, incidentally (by the cycle it closes, not by the clause) |
| I20 | cycle | `dom/cycA.ts ↔ cycB.ts` | cycle | value SCC | CAUGHT |
| I21 | dead file | new `badge/orphan.ts`, no reader | placement dead | F-7 unread | CAUGHT |
| I22 | backend bin | `scripts/profile-bundle.mjs` + `import "./comment-census.mjs"` | bin | nothing (the only diff was the already-over line count, 938 → 939) | MISSED |
| I23 | backend long dir | 2 new `scripts/plant-{a,b}.mjs`, wired in `package.json` | bound | bounds `scripts` 13 | CAUGHT |
| I24 | unzoned | new `src/misc.ts` read by `Button.vue` | unzoned | F-7 move → button | CAUGHT (as placement) |
| I25 | recursive sub-component | new `card/CardHeaderIcon.vue` read only by `CardHeader.vue` | none (§3.9(a) admitted) | nothing | MISSED (admitted) |
| I26 | slot in the wrong unit | new `dock/composables/useBadgeX.ts` read only by badge | placement | F-7 move → badge | CAUGHT |
| I27 | R-10 demo past a door | `demo/stories/data/search.vue` imports `@glass/components/dock/composables/useDockHold` | none in D′'s clause table | nothing (the only diff was the already-over line count) | MISSED |
| I28 | constant misplaced | new `composables/color/badgeConstants.ts` read only by badge | placement | F-7 move → badge | CAUGHT |
| I29 | wrong slot name | new `badge/tests/badge.test.ts` | test-home | F-7 "move `Badge.vue` → `badge/tests`"; F-1 ledger-stale | CAUGHT, WRONG (as I09) |
| I30 | library reads demo | `Badge.vue` imports `../../../demo/composables/plantHelper` | upward / zone | nothing | MISSED |
| L1 | legal: component reads the `./dom` door | `Badge.vue` imports `../../composables/dom` | must pass | F-7 "move `useBreakpoint.ts` → badge" | FALSE POSITIVE (the §0 defect: a public hook pulled into its first consumer) |
| L2 | legal: colocated test | new `badge/__tests__/Badge.test.ts` | must pass | F-1 ledger-stale ×2, F-7 unread on the test | FALSE POSITIVE on the floor tree (FD-7 not applied; D′'s law would count tests as non-readers) |
| L3 | legal: shared composable | new `dom/useShared2.ts` read by badge and button | must pass | bounds `dom` 13 | probe invalid: `dom` holds 12 at HEAD, so any 13th file is a true bound violation |

**Tally.** 28 non-exempt plants:

| result | count | plants |
|---|---:|---|
| caught correctly | 12 | I01, I02, I06, I07, I12, I14, I20, I21, I23, I24, I26, I28 |
| caught with a wrong or harmful diagnosis | 4 | I05, I09, I19, I29 |
| missed | 12 | I03, I04, I08, I10, I13, I15, I16, I17, I18, I22, I27, I30 |

The 2 admitted plants (I11, I25) were missed as expected. Legal probes: 2 false positives, 1 invalid probe.

**What bites and what does not.** Every catch comes from the floor (F-1, F-7, bounds, SCC). Every clause D′ adds on top of the floor is unmeasurable, so its catch rate on my battery is 0/28. The 12 misses are exactly the clauses the lost gate claimed: self-name, upward ×3, door-impure, door-impure-css, dual-door ×2 (I10, I13), test-home, bin, reach, plus one (I27) that the spec's clause table never assigned (R-10 has no gate clause in §3.5).

## 1 · What exists, measured

| check | command | result |
|---|---|---|
| prototype tools | `ls scratchpad/D1/p2/`; `find /private/tmp/claude-504 -name dp-law.mjs` | `Dp-proto/` absent; 0 hits |
| banked artifacts | `git ls-files \| grep -iE 'dp-law\|gate-dp\|rank-table\|Dp-proto'` | only `pass-2/Dp-proto.md` |
| floor anchor | `grep -n anchor floor/lib/placement.mjs` | 0 lines: FD-1 and FD-3 were built only inside the lost `dp-law.mjs` |
| floor F-7 at HEAD + rows | `placement.mjs --root wt` | 545 files: ok 311, published 181, move 39, global 12, unread 2; 46 proposed, 5 NEEDS-NAME. Unanchored, it is not D′'s law |
| bounds at HEAD + rows | `bounds.mjs --root wt` | 18 dirs, 57 files (75). The report's migrated figure is also 75, so D′ moves the R-5 count by 0 |
| F-1 at HEAD + rows | `graph.mjs --root wt --quiet` | 0 violations, 1.35 s |

The consequence: the report's toolchain-green, surface-pin, cascade, replay and plant tallies cannot be checked by anyone after the wipe. I credit none of them as measured (§4).

## 2 · Failure-mode checklist

- **Vacuous convergence: PRESENT.**
  - `placement` falls 37 → 3 because the migration runs the gate's own function (F-7 + FD-1) to a fixpoint. By construction it can then only read 0 on what it moved.
  - The spec's own guard (freeze the move lists as literal JSON and commit them before judging) was not honoured, and the lists are now gone.
  - `test-home` 163 → 11 is the same shape: the home rule is shared by the gate and the mover (§3.7: "shared by the `test-home` rule and the placement tool").
- **Spec cites itself: PRESENT.**
  - "What the gate must catch" (§3.5) is C01-C19 plus P01-P12, all written by D′'s own seats.
  - The prototype's N01-N06 test the clauses the prototype added.
  - "50 plants, 0 missed" is an author battery.
  - On an independent battery, the only thing that can be run catches 12/28 correctly, and D′'s layer catches 0/28.
- **Gates that cannot fail: PARTLY.**
  - Six clauses read 0 at HEAD (unresolved, self-name, unzoned, table, door-reads-door, below-direction). Their only evidence of biting was the lost plants.
  - `bound` cannot turn GREEN under D′ at all (75 → 75), so wiring it into `npm test` makes a permanently RED test. That is the opposite failure: a gate that cannot pass, so nobody reads it.
- **The elegant-reduction trap: PRESENT.**
  - "Mints no dir" is what makes the route small. It is also why the route cannot do what the edict mainly asks: split 18 long dirs and 57 long files, give 7 sub-components their own dirs, and split 3 CSS doors.
  - All of that is deferred to a naming route that does not exist. The reduction is elegant because it leaves the hard part out.
- **Aliases and dual paths: NOT CURED.**
  - `dual-door` stays at 40 (R-6 not executed).
  - A same-door alias (I13) is caught by no executable. The surface pin would catch it after a build, but that is not the structure gate.
  - The law also creates a new kind of dual path. `./motion-core` and `./dom` stay public doors, but their implementations now live in components. The "global" door and the component's own slot now claim the same file.
- **Masked fallbacks: HELD.** I12 (an `import().catch()` to a stub) is caught by F-1 `unresolved`, and F-4's masked terminal fallback is deleted by row f4 (applied, measured).
- **Unverified gestalt: see §3.** The report's own walk (§10) is a file count table, not a reading.

## 3 · Gestalt walk (three components as a newcomer)

The migrated tree cannot be rebuilt, so this walk reads HEAD plus the law's 30 recorded moves (`Dp-proto.md` §3), each checked against HEAD by `published.mjs`.

- **dock (43 → 75 files).**
  - The root gains `match.ts`, `types.ts`, `backdropLuminanceSample.ts` and `backdropSampleMath.ts`.
  - `composables/` gains `useFuzzySearch`, `useGlassBackdropLuminance`, `useRAFLoop`, `useScrollChrome` and `useYieldToMain`.
  - `__tests__/` holds 24.
  - A newcomer opening `dock/types.ts` finds fuzzy-search types, and in `dock/composables/useRAFLoop.ts` a generic frame loop that the public `./motion-core` door publishes.
  - The root is pushed over the bound to 15, and two slots sit at 17 and 24.
  - Reads as: dock became the library's attic. It is colocated by reader count, not by meaning.
- **slider.**
  - It gains `useDockHold.ts`, a file named for another component, per X-10.
  - It also gains `useDragVelocity.ts`, a public `./dom` hook.
  - Reads as: not colocated. The names point elsewhere, and one file is public substrate parked in a consumer.
- **`src/composables/motion/core`, the substrate itself.**
  - At HEAD it holds 9 files (`ls`).
  - The law takes out `useRAFLoop`, `useViewTransition` and `useYieldToMain`, and brings in `useDocumentVisibility`.
  - Its door still publishes all of them.
  - Reads as: consumer-less substrate is **hollowed, not clean**. The global zone's doors re-export from component dirs, which the edict's "truly module-level or global-level … within a composables/ dir" rules out.

**Verdict of the walk:** the tree does not read colocated. It reads relocated-by-reader-count, with public substrate scattered into its first consumers and one cross-named file.

## 4 · Convergence: 2 of 28 invariants met = 7%

Met means measured by me in this seat.

| # | invariant | status |
|---:|---|---|
| 1 | replay reproducible from banked artifacts | open: tools and move lists lost |
| 2 | computed move lists frozen as literal JSON before judging (§1.4) | open |
| 3 | the gate exists as a tracked or recoverable executable | open |
| 4 | toolchain green on the migrated tree | open: claimed, unverifiable |
| 5 | surface pin held (68 / 62 / 603 / 1,279) | open: claimed, unverifiable |
| 6 | published cascade held | open: claimed, unverifiable |
| 7 | gate RED at HEAD | open: claimed 331, unverifiable |
| 8 | gate GREEN on the migrated tree | open: 133 per report |
| 9 | an independent battery bites the D′ clauses | open: 0/28 measurable |
| 10 | placement zero earned non-vacuously | open (§2) |
| 11 | R-1 register collapsed | open (4 failing tests per report) |
| 12 | R-2 anchor applied as ruled (own root door anchors) | **open: 4 public files moved out (§0)** |
| 13 | R-2 recursive unit: sub-components have dirs | open: 7 in 6 units |
| 14 | R-3 test-home | open: 11 residue; legal colocated test is a false positive until FD-7 |
| 15 | R-4 global composables stay in `composables/` | open: 7 public substrate files moved into components |
| 16 | R-5 bounds | open: 75 → 75 |
| 17 | R-6 one symbol, one door | open: 40 |
| 18 | R-7 `./styles.css` byte-held | open: claimed, unverifiable |
| 19 | R-8 dispositions | open (`springProjection.ts`) |
| 20 | R-9 skeletons colocate | **met**: I14 caught by F-7 |
| 21 | R-10 demo doors only | open: not executed, and there is no gate clause (I27 missed) |
| 22 | no masked fallbacks | **met**: I12 caught by F-1; f4 deletes the terminal fallback |
| 23 | no aliases or dual doors | open: I10 and I13 missed; substrate doors re-export component files |
| 24 | CSS door purity | open: 3 residue, I17 missed |
| 25 | backend arm (`bin`, scripts ranks) | open: I22 missed |
| 26 | no name residue (`slider/useDockHold.ts`) | open |
| 27 | the law creates no new dir cycle (`motion ↔ morph ↔ reveal`) | open |
| 28 | FD-5, FD-6 and FD-11 built | open |

If the prototype's unverifiable claims (#4-7, #18) were credited, the figure would be 7/28 = 25%. I do not credit them.

## 5 · Edict fidelity

- **"Components COLOCATED with their sub-components … recursively":** not met (7 sub-components, and no mechanism to meet it).
- **"Composables truly module-level or global-level … within a composables/ dir, otherwise COLOCATED":** inverted for 7 public hooks. The law treats "published" as "read by nobody" (a kernel door) and relocates global hooks to their first reader.
- **"Long running dirs must and always be broken into common modules":** not attempted (75 unchanged).
- **"Similar treatment … backend files":** the scripts rows exist in the spec (§3.8). A bin-imports-bin plant goes uncaught by anything that exists.
- **Clean breaks:** held for files. No old-path shims were claimed, and I cannot verify that. Not held for doors: dual-door 40, and substrate doors that re-export component files.

## 6 · Open gaps

1. The prototype's law, gate, rank table, plan and row JSON are lost. Nothing D′ produced can be re-run. Re-running requires rebuilding them and committing the frozen move lists under `docs/tranches/BL/design/structure/` before any judgment.
2. FD-1's global-zone exclusion contradicts R-2 as amended and X-10. `useClipboard`, `useDragVelocity`, `useRAFLoop` and `useYieldToMain` are published by their own unit's root door and are moved out anyway. Either the driver rules that a `src/composables/*` entry door is a kernel door (and says why a global hook then belongs to its first consumer), or FD-1 anchors them.
3. 3 more public substrate files move into components through a non-own door (`useScrollChrome`, `useScrollProgress`, `useRoutePointer` via `./motion-core`), and `./motion-core` becomes an "aggregator" reading components. That is an R-4 conflict with no ruling.
4. There is no independent evidence that any D′-only clause bites: my battery scores 0/28 on the D′ layer, since the layer does not exist.
5. There is no R-10 clause in the gate contract (§3.5), and the I27 plant is caught by nothing.
6. F-7 and the test-home rule both treat a test as a reader of its subject (I09, I29 on the floor). A misplaced test proposes moving the component, not the test. D′'s law claims to cure this, but that is unverifiable.
7. A CSS sheet loaded by a script side-effect import reads as `unread` (I05): the floor tells you to delete a live sheet.
8. The naming primitive is missing: R-5 has 75 violations, R-2 has 7 sub-component dirs, and door-impure-css has 3 splits. Standalone, this meets the charter's BLOCK test.
9. The report's own open gaps 1-22 (FD-8, R-8, R-6 40 vs 29, R-10 90, FD-6, R-1, F-2 cwd literal, Playwright blind spot, NEEDS-NAME, motion dir cycle, stutter slots `composables/…/composables/`, sheet tests homed in dialog, `useDockHold` residue, unreproduced authored targets, ratchet wording, FD-11, 171 vs 168, no π, FD-5) all stand, and none can be re-measured without item 1.
10. My own tools sit in the scratchpad and can be wiped the same way. The battery table above gives every plant as an exact edit, so it can be rerun by hand.
