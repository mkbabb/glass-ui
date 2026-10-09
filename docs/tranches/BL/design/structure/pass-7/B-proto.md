# D1-B · pass 7 · PROTOTYPE seat

Seat: PROTOTYPE, route D1-B (sealed modules, flat). Model `claude-opus-5-5`, asserted from the seat's own identity. Kit: `pass-7/B-kit/`, copied from `pass-6/B-kit/` and extended from S70 on the P6 floor cut (S1 `5b14c6c7…`). Every number below comes from a command this seat ran, and every file it rests on is under `pass-7/B-kit/results/p7/` unless named otherwise. Loads are `sysctl -n vm.loadavg` on an 18-core machine that other sessions shared throughout.

## 0 · The chain and its replay

The chain is `B-kit/frozen/SEQUENCE.json`: 117 steps, from base digest `35f7b831…` through the floor (S1 `5b14c6c7…`) to S70. Pass 7 re-derives S64, S65, S67, S69, S69s and S70, and adds S71, S71b, S71c and S71d before the gate re-land. The tail runs S63 S64 S65 S66 S67 S68 S71 S71b S71c S71d S69 S69s S70.

**Final digest: `52cca0fefd8d6b8822bbb3373641a6136e313be813baad397810d80865574aea` over 1582 files.**

Replay, from committed artifacts only:

```
git worktree add <wt> HEAD
ln -s <checkout>/node_modules <wt>/node_modules
ln -s <checkout>/tests-visual/node_modules <wt>/tests-visual/node_modules
node <checkout>/docs/tranches/BL/design/structure/pass-7/B-kit/replay.mjs --root <wt> [--twice]
```

| replay | worktree | HEAD | flags | result | time | load |
|---|---|---|---|---|---|---|
| r1 | fresh | `f05d8555` | — | exit 0, `chain final MATCH`, digest `52cca0fe…` | 276.5 s | 29.8 → 18.5 |
| r1 rerun | r1 | `f05d8555` | — | no-op, same digest | 0.5 s | 18.3 |
| r2 | fresh | `f05d8555` | `--twice` | exit 0, `chain final MATCH`, digest `52cca0fe…`; every step's `again:` pass writes nothing (S1's floor rows re-derive to the same digest) | 785.2 s | 20 → 47 |

The authoring worktree `wt` (and the floor-base worktree `base`) sat at `49db558e`; `wt` reads the same digest. `git diff 73ef2c14 f05d8555` and `git diff 49db558e f05d8555` outside `docs/` are both empty, so the chain was authored and replayed on one code tree. Logs: `replay-r1.txt`, `replay-r2.txt`.

Toolchain: macOS 26.4.1, node v26.0.0, vite 8.1.5, vue-tsc 3.3.7, vitest 4.1.10, typescript 6.0.3, @playwright/test 1.61.1.

### 0.1 The pass-7 steps

| step | kind | closes | what |
|---|---|---|---|
| S64 | row | B-01, B-10, P6-R1 | The contract names on their owning entries, now 13. `useScrollScene` leaves `added` with its three MIGRATION rows and the scroll door edit; `./motion-core` adds only `motionTempo` |
| S65 | row | B-S14, P6-R1 | As in pass 6, plus: the scroll story's spine moves to `demo/stories/motion/scroll/useScrollScene.ts` (keyframes.js `SmoothProgress`, `useReducedMotion` from `./motion-core`, a rAF-coalesced passive scroll listener, `scrubToDamping` with floor 0.08); `src/composables/motion/scroll/useScrollScene.ts` leaves `src`. The orphan-CSS bite's unreachable referrer re-derives to `composables/color/__tests__/resolveColor.test.ts` in this row, since S66's preflight refuses the unresolved path the removal leaves |
| S66 | moves | B-S14 | unchanged |
| S67 | row | B-S14, B-S16, P6-R2 | The morph door keeps its HEAD names. The eyeglass law's arms compose verbatim into `eyeglass.test.ts` beside `eyeglass.ts`, with one `it` pinning 1.6, 1.22 and 100. The tabs-seam test imports no eyeglass name: it states `SPAN_CEILING = 1.6`, `SWELL_CEILING = 1.22`, `ANNOTATION_DELAY_MS = 100` and observes the geometry against them |
| S68 | row | LAW §9 | unchanged |
| S71 | moves | peer class | `spring/useLiquidFlex.ts` → `core/`; `morph/{useSelectionIndicator, useSelectionGroup, useTabRovingFocus, eyeglass}.ts` and their two tests → `motion/selection/` |
| S71b | row | peer class | The spring door drops `useLiquidFlex`, the core door carries it; the morph door drops the selection names; `selection/index.ts` is created and listed in the entry record; readers (useLiquidPress, useSelectionIndicator, useDragMorph, `motion-core.ts`, `tabs/types.ts`) re-point; five prose path citations follow the move |
| S71c | moves | peer class | `reveal/useLiquidReveal.ts` → `morph/` |
| S71d | row | peer class | The reveal door drops it, the morph door adds it, `motion/index.ts` reads it from `./morph` |
| S69 | row (gate) | S-14, P6-R3, P6-G3, P6-G6 | Gate re-land: the CLI exits 0/1/2; B3 reads every CSS form (§2.1); the record's `files` is scoped; B11's no-outside-reader line excludes a test reader in `src` (P6-R2). Pin: modules 140, doors 120, names 1283, reviewed 2, holds 0 |
| S69s | row | P4-R2 | The public-surface spec's runtime lists, with the orphan-CSS edit removed (now in S65) |
| S70 | row | P6-R2 | The one datum rebind: `.bundle-ratchet` 2,919,057 → 2,920,401 |

The only `.bundle-ratchet` edit in the chain is S70's.

## 1 · Items (§P6-9, 27 frozen)

| item | entering | this seat's reading | evidence |
|---|---|---|---|
| S-01 | CLOSED | met once committed | The kit, results, selection and both browser reports are under `pass-7/` (untracked). This seat may not commit; the precondition waits on the driver |
| S-02 | CLOSED | met | B8 0, B9 0 |
| S-03 | CLOSED | met | P6-R1..P6-R3 landed (S64/S65, S67, S69); the datum rebinds once, at S70 |
| S-04..S-08, S-11, S-13 | CLOSED | met | no regression (§3) |
| S-09 | CLOSED | met | r1 rerun a no-op; r2 `--twice` writes nothing on the second pass |
| S-10 | CLOSED | met | cascade GREEN against the floor base, every moved rule listed (§2.3); FD-4 `/2` covered=true, evidence 1; the pass-6 critic's probe passes A, G, G2 and U (`fd4-crit6.txt`) |
| S-12 | CLOSED | met, with one caveat | §2.4: the full graph-selected run, both `/2` reports and the selection under the kit, re-derivable by `tools/browser-select.mjs`. 410 of 411 base-green tests hold. The one exception, blob D2, fails on the floor base 2 of 3 times re-run alone, so it is a flake, not a regression. The seat's own verdict reads RED on it (open gap 3) |
| S-14 | CLOSED | met | B17 0; the seal's crash exit is 2, distinct from RED's 1 (plants EXIT, `seal.test.ts`) |
| B-01 | CLOSED | met | 18/18 clauses 0, B2 0; I7 CAUGHT by B3 in every form (§3.1) |
| B-02..B-06, B-08, B-09, B-11..B-13 | CLOSED | met | no regression (§3.3) |
| B-07 | CLOSED | met | B15 0 over every stem; pass 6's split-name plants caught (§3.2) |
| B-10 | CLOSED | met | B2 0; P6-R1 and P6-R2 on their ruled arms; the TD plant reads B11 (§3.1) |

Count by this seat's reading: 27 items, 27 met. The convergence count is the critic's.

## 2 · The bar on the replayed tree (r1)

### 2.1 Clauses, tests, types, build

`seal.mjs --root r1`: **18/18 clauses at 0, exit 0** (11 s, load 29.9). Record `seal-r1.json`: files 1580 (`filesScope` "the five zones and the root files"), edges 8330, modules 140 of 140 required, b0 f1/walks/computed 0, b10 anchored 39, held 0, counted 0, multi-door symbols 0; pin modules 140, doors 120, names 1283, reviewed 2. `wt`, r1 and r2 all read files 1580 (P6-G6).

| clause | judges | r1 |
|---|---|---|
| B0 | F-1 violations, listings and computed reads into a sealed zone | 0 |
| B1 | door crossings, own-door imports | 0 |
| B2 | a consumer reference off an entry source | 0 |
| B3 | a CSS crossing that misses the CSS door (`@import` string or `url()`, `<style src>`, SFC inline `@import`) | 0 |
| B4 | sibling cycles | 0 |
| B5 | a door or sub-directory in a kind slot | 0 |
| B6 | bounds (12 files, 500 lines) | 0 |
| B7 | doorless sealed directories, script behind a CSS door, unrecorded src doors | 0 |
| B8 | the kernel reads a unit; the library reads another zone | 0 |
| B9 | a door re-exports outside its module; a name on two entries | 0 |
| B10 | placement | 0 |
| B11 | internal-door names with no outside reader (in `src` a test is not one), empty doors, the pin | 0 |
| B12 | relays and declaration mirrors | 0 |
| B13 | bins | 0 |
| B14 | door purity | 0 |
| B15 | names | 0 |
| B16 | tests by home and program | 0 |
| B17 | masking fallbacks | 0 |

**P6-R3.** The CLI wraps `main()`: an uncaught throw prints `seal: no verdict: …` and exits 2; a refused option (`--pin`) exits 2; RED exits 1; GREEN 0. LAW "The gate" states it. `tests/gates/seal.test.ts` 21/21, including the new exit-2 (non-JSON overlay) and exit-1 (a demo import of `GlassDock.vue`, `FAIL B2 1`) cases.

**P6-G3.** B3 reads every edge the floor's CSS scanner yields: a sheet's `@import` (string and `url()`, with or without `layer(…)`), an SFC's `<style src>`, and an `@import` inside an SFC's inline `<style>`. LAW §6 states it, and why the pass-2 row read MISSED: its regex inserts the import inside `src/styles/index.css`'s header comment, which loads nothing. The pass-2 critic's own re-plant (the import at the end of the aggregate) reads CAUGHT, and `tools/battery.mjs` carries it.

Toolchain on r1 (`toolchain-r1.txt`):

| command | exit | time | load |
|---|---|---|---|
| `npx vite build` | 0 | 22 s | 33.3 |
| `npm run verify:package` | 0 | 54 s | 37.6 |
| `npx vue-tsc --noEmit` | 0 | 15 s | 41.3 |
| `npx vue-tsc --noEmit -p tsconfig.test.json` | 0 | 15 s | 38.6 |
| `npm run demo:dist:build` | 0 | 3 s | 40.3 |
| `npx vitest run tests/gates/seal.test.ts` | 0 (21/21) | 15 s | 41.5 |
| `npx vitest run` | 1 | 71 s | 60.3 |
| `npx vitest run` on the two failing files | 0 (38/38) | — | 57.3 |

The full run failed 2 of 2341 tests (273/275 files): the aurora atoms fuzz (7,479 ms) and the grasp register (5,045 ms), both on the 5,000 ms per-test timeout at load 60. Alone they pass 38/38. The pre-S71 `wt` full run read 275/275 files, 2,330 passed. No verdict here rests on a quiet machine.

### 2.2 The datum (P4-R3, P5-R2, P6-R2)

`verify:package` on r1: terminal CLEAN; unpackedBytes 2,920,401 = the datum; equal; increase false (`pack.txt`, `pack/`).

| | bytes | files |
|---|---|---|
| floor base (S1) | 2,913,546 | 838 |
| HEAD ratchet | 2,919,057 | — |
| route (S70) | 2,920,401 | 920 |
| pass 6's route | 2,925,765 | — |

The route is +6,855 over the floor, +1,344 over HEAD, −5,364 against pass 6. By class: MIGRATION.md +9,338, door declarations +2,804, other declarations −5,275, CSS doors +574, other CSS +69, JS −887, other +232 (sum +6,855). Declarations by kind: wiring +16,913, JSDoc prose −25,161, body +5,777. By step: S5-1 +14,073; S71b +4,694; S71d +2,279; S64 +1,861; S39-12 −30,779. The pass-6 to pass-7 drop is P6-R1's three names and MIGRATION rows, P6-R2's 1,607 B of eyeglass wiring and the scroll spine's module.

### 2.3 Cascade

`cascade verify` against the floor base (baseline label `floor-S1-5b14c6c7`), with the listing's `scopes` and `reorders`: **GREEN** on `wt` and on r1 (`cascade/verify.txt`, `cascade/verify-r1.txt`). `./styles`: 28 moved, risks 0. `./styles.css`: 10 moved, risks 0. Scope Timeline → TimelineMarks: 40 rule lines re-homed. Unlisted rules 0, stale 0.

### 2.4 Browser

The bar is base-green: no test that passes on the floor base fails on the migrated tree. Both runs use browser-seat/2, `chromium-headless-new`, 1 worker. Everything is under `results/p7/browser/` (`runs.txt` there gives every command).

**Selection, from committed bytes.** `tools/browser-select.mjs --root <final tree>` reads only `frozen/SEQUENCE.json` and the files it names, and writes `moved.json` (597 moves) and `changed.txt` (717 paths). A row path the final tree no longer holds is carried as a move onto the row-created file with the same stem, so a removed spec or the scroll spine still selects its readers. The seat selects **154 specs over 69 bands** (`selection.json`, `select.log`). The base runs the same 153 specs under the base's testDir (`base-specs.txt`); the 154th, `chip-accent-band.visual.ts`, is a test the chain creates.

| run | tree | tests | ran | passed | failed | skipped | time | load |
|---|---|---|---|---|---|---|---|---|
| base | floor base (S1) | 866 | 822 | 430 | 392 | 44 | 5440 s | 24.8 → 28.9, 35–50 between |
| route | r1 | 866 | 822 | 429 | 393 | 44 | 5634 s | 26.2 → 32.0, peak read 85.6 |

**Rekey.** `tools/rekey.mjs` maps 153 base specs onto the migrated program: **0 unmapped**.

**Seat verdict: RED, 1 new failure.** It is `tests-visual/blob/blob-config-delta.spec.ts`, D2: shy-away shift(−0.8) = 0.0082, not below lean-in shift(+0.8) = 0.0072. The key sits in 15 of the bands, because its spec reads all of them.

**Tally** (`tools/browser-tally.mjs`, `tally.txt`). Each report has 825 keys. 411 are base-green, and 410 of those pass on the route. No test that fails on the base passes on the route. The route has 7 keys with no base key:
- `chip-accent-band`, a new test, which passes.
- The six tests the chain split from `w1-radius-redress` into `w1-radius-redress-inputs`. Each has the same status as its base title: 4 fail on both trees and 2 are skipped on both.

**D2 adjudication** (`blob-rerun.log`, the one spec run alone, alternating trees):

| run | base | r1 |
|---|---|---|
| 1 | FAIL 0.0150 vs 0.0075 (load 30.1) | FAIL 0.0079 vs 0.0066 (load 24.4) |
| 2 | FAIL 0.0097 vs 0.0063 (load 42.1) | pass (load 39.2) |
| 3 | pass (load 55.3) | pass (load 52.7) |

The floor base fails D2 2 of 3 times and the route 1 of 3, so the test does not separate the trees: its base-green mark came from a single pass. By this seat's reading the browser bar holds, with **0 failures attributable to the chain**. That reading rests on the reruns and not on the seat's own verdict, which stays RED as written. The pass is the critic's to grant or refuse (open gap 3).

Per band, from `route.json`: 49 bands have browser signal and 20 have none (accordion, avatar, checkbox, collapsible, data-table, dom, keyboard, label, labeled-field, number-field, popover, radio-group, reactive, separator, skeleton, status-dot, switch, toggle-group, tooltip, typewriter).

| band | specs | base-green | new | band | specs | base-green | new |
|---|---|---|---|---|---|---|---|
| README | 1 | 3 | 0 | handmark | 54 | 195 | 0 |
| alert | 15 | 37 | 0 | index | 2 | 2 | 0 |
| aurora | 147 | 398 | 1 (D2) | infinite-scroll | 2 | 2 | 0 |
| badge | 2 | 2 | 0 | input | 6 | 4 | 0 |
| blob | 102 | 291 | 1 (D2) | menu | 4 | 18 | 0 |
| button | 73 | 197 | 1 (D2) | metric | 1 | 2 | 0 |
| card | 4 | 3 | 0 | motion | 83 | 232 | 1 (D2) |
| carousel | 2 | 2 | 0 | music-staff | 13 | 14 | 0 |
| chip | 8 | 22 | 0 | pager-dots | 78 | 213 | 1 (D2) |
| color | 79 | 197 | 1 (D2) | progress | 16 | 33 | 0 |
| command | 5 | 4 | 0 | scroll-progress-rim | 2 | 2 | 0 |
| configurator | 76 | 206 | 1 (D2) | search | 6 | 8 | 0 |
| constellation | 49 | 100 | 1 (D2) | select | 3 | 2 | 0 |
| context | 2 | 2 | 0 | shared | 5 | 18 | 0 |
| dark | 2 | 10 | 0 | sheet | 36 | 82 | 0 |
| dark-mode-toggle | 140 | 394 | 1 (D2) | sidebar | 2 | 2 | 0 |
| deck | 2 | 2 | 0 | slider | 35 | 69 | 0 |
| dialog | 42 | 143 | 0 | sortable-list | 66 | 193 | 1 (D2) |
| dock | 151 | 407 | 1 (D2) | styles | 153 | 408 | 1 (D2) |
| easing | 20 | 80 | 0 | surface | 85 | 234 | 1 (D2) |
| expandable-container | 2 | 4 | 0 | table | 1 | 3 | 0 |
| fading-scroll | 1 | 12 | 0 | tabs | 48 | 119 | 1 (D2) |
| fourier-field | 62 | 126 | 1 (D2) | textarea | 3 | 2 | 0 |
| glass | 15 | 42 | 0 | timeline | 32 | 69 | 0 |
| | | | | toast | 2 | 14 | 0 |

The 393 route failures (392 on the base) are the P5-G8 class: π-lane GPU readbacks in headless Chromium, common to both trees and outside D1.

### 2.5 Peer classes (§P6-8.4)

`tools/peer-closure.mjs` (new) reads the declared classes from the root barrel's own table (`src/index.ts`, "Heavy-peer exclusions"): the root and `./motion-core` are free of `@mkbabb/keyframes.js` and `@vueuse/core`; every other entry may bear a peer. It judges three closures per entry over static value edges (`import type` and dynamic `import()` load nothing): **names**, the closure of each runtime name's declaring file; **files**, the entry source through every name of every door it reads; **dist**, the built entry's import closure. It also checks each published name's own module against its entry's class. Exit 0/1/2.

On r1 (`peer-closure.txt`, `.json`), **GREEN**:

| entry | declared | names | dist | files |
|---|---|---|---|---|
| `./motion-core` | free of both | 55 → none | 5 files → none | 38 → none |
| `.` | free of both | 144 → both | 58 files → both | 311 → both |

The root's class is broken in all three arms on the floor base already (`peer-closure-base.json`, HEAD's state, outside D1); the chain introduces nothing there. Every S64 name keeps its entry's class (`./motion-core: motionTempo` ok, `.: pendingRenderer` ok).

The probe found that pass 6's tree had broken `./motion-core`'s files arm. Its source closure reached keyframes.js through the spring door (`useLiquidFlex` sat beside `useSpring`), the morph door (the selection engine sat beside `useElementMorph`) and the reveal door (`useLiquidReveal`). S71-S71d cure it at the doors: each engine moves into the module whose door carries no peer, and no door mixes classes. LAW §5 "Peer classes" states the rule and names the probe as its owner. No gate clause reads the class.

## 3 · Plants

### 3.1 Pass 7's battery (`tools/plants-p7.mjs`, overlay, nothing written): 17/17 (`plants-p7.json`)

| plant | expect | read |
|---|---|---|
| I7: `./styles` imports a private dock sheet after its first real import | B3 | B3 |
| I7e: the same at the aggregate's end | B3 | B3 |
| I7u: `url()` form with `layer(components)` | B3 | B3 |
| I7c: the glass kernel door imports it | B3, B8, B10 | B3, B8, B10 |
| I7s: a unit SFC's `<style src>` reads another unit's private sheet | B3, B10 | B3, B10 |
| I7i: a unit SFC's inline `@import` does | B3, B10 | B3, B10 |
| I7-pass2: the pass-2 row's plant (inside the header comment) | none | none |
| I7L: `./styles` imports the dock's door | none | none |
| TD: the selection door publishes `EYEGLASS_SPAN_MAX` for a colocated tabs test | B11 (no outside reader; not in the pin) | both lines |
| TDL: the same name with a library reader | B11 (pin only) | pin line only |
| KF: `./motion-core` publishes `useSpring` | probe RED | RED, exit 1 |
| KF6: `./motion-core` publishes `springProjection` (pass 6's S64 shape) | probe RED | RED, exit 1 |
| KFL: `./motion-core` publishes `springPreset` (keyframes-free) | probe GREEN | GREEN, exit 0 |
| EXIT: clean tree | 0 | 0 |
| EXIT: RED overlay | 1 | 1 |
| EXIT: overlay not JSON | 2 | 2 |
| EXIT: refused option `--pin` | 2 | 2 |

The keyframes-bearing class has one owner, the probe; no gate clause reads it.

**FP6-4, an SFC split into two children** (`tools/sfc-split2.mjs`, `sfc-split2.sh`, written and undone in `wt`; `sfc-split2/run.txt`). The last two rules of `Aurora.vue` re-home into `AuroraShadeA.vue` and `AuroraShadeB.vue`, both rendered. With no listing: RED. One child's scope only: RED. Both scopes without the rung: RED. The full listing: GREEN. The same split with ShadeB's `opacity: 1` changed to `inherit`: RED. Restored: GREEN.

### 3.2 Regressions

| battery | where | result |
|---|---|---|
| pass 6 seat (`plants-p6.mjs`) | overlay | 20/20 |
| pass-6 critic's plants (`crit6-plants.txt`) | r1, written and undone | 89 CAUGHT, 13 CLEAN, 4 FALSE+, 1 SKIP; base judgement restored |
| pass-6 critic's extras (`crit6-extra-plants.txt`) | r1 | 4 CAUGHT, 2 CLEAN |
| pass-6 critic's regressions, pass 4 and 5 batteries among them (`crit6-regress.txt`) | r1 | 233 CAUGHT, 17 CLEAN, 7 FALSE+, 5 OTHER, 6 UNNAMED; identical to pass 6's tally |
| pass 2 intent battery (`battery-p2.txt`) | r1 | 36 CAUGHT, 5 OTHER, 2 FALSE+ (L1, L2 by B15), 0 MISSED; I7 CAUGHT |

The FALSE+ rows are the classes pass 6 recorded; none is new.

## 4 · Open gaps

1. **The root's peer class is broken at the base** in all three arms (HEAD's state). D1 introduces nothing there. Curing it would mean moving names off the root, which is a surface change outside D1's rulings.
2. **No gate clause reads the peer class.** The probe is its owner (LAW §5). Whether it should become a clause is the critic's or the driver's call.
3. **The browser seat reads RED on one flaky key.** blob-config-delta D2 fails on the floor base 2 of 3 times when re-run alone, and on the route 1 of 3. The seat counts it as a new failure because the base report's one run passed it. Base-green as a single-run mark cannot separate a flaky test from a regression. Whether the reruns discharge it is the critic's call.
4. **The kit is uncommitted**, so S-01's precondition waits on the driver.
5. **Load.** No verdict here was read on a quiet machine. Load ran 18-60, and each run's load is beside it (`runs.txt`, `browser/runs.txt`). The two vitest timeouts at load 60 pass alone.
6. **FALSE+ classes** in the carried batteries (L1/L2 by B15; the pass-6 critic's 4 + 7) are unchanged from pass 6.

## 5 · Fence record

- Writes in the checkout went only under `docs/tranches/BL/design/structure/pass-7/`. The kit was seeded by `cp` from `pass-6/B-kit/`, then pruned of pass 6's off-chain frozen files (`S50-b11-disk-record.json`, `S58-browser-keys.json`, `S59-datum.json`) and its `results/p6`, `results/pass5`. Frozen step files were written by the kit's own tools (`derive/*`, `land-gate.mjs`). The S65 row was combined from two rows by a scratch script kept outside the checkout; the replays apply it from committed bytes. Authored inputs, tools, LAW, results and this file were written with the Write or Edit tool or by the kit's tools.
- No tracked source in the checkout was edited. No git writes other than `worktree add` and `remove`.
- Worktrees under `.claude/worktrees/bl/D1/p7/B-proto/`: `wt` (authoring), `r1` and `r2` (replays), `base` (the floor base, S1, for the browser base run and the base peer-closure and pack). In `wt` the dangling `tests-visual/node_modules` symlink was removed so the pass-6 critic's runner would not throw. The D2 reruns ran in `base` and r1. All four were removed with `git worktree remove --force`, and the then-empty `B-proto/` directory with `rmdir`; nothing is left there.
- Sibling repos were not touched.
