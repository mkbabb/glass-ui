# FLOOR-V4 · the floor with N-9 and N-10

D2 pass 5, seat FLOOR-V4 · model `claude-opus-5-5` (asserted from own system identity) · 2026-10-17, two entries. Entry 1 built the patch, ran F7, PR, every Chromium stage and three Playwright WebKit stages, then ended while the WebKit darkrest stage queued for the machine-wide lock (its draft of this file was 18 lines). Entry 2 checked that entry 1's worktree held the patch byte for byte, re-checked the patch at today's HEAD, ran the missing Playwright WebKit darkrest stage, re-ran the digest, and wrote this file.

| field | value |
|---|---|
| patch | `pass-5/floor-v4.patch`, sha256 `a5f71e00a8f8b0f0…`, 53 files (39 `src/`, 3 `demo/`, 11 `tests/`), +2410 / −1618 (`git apply --numstat`). The whole floor relative to HEAD: `pass-4/floor-v3.patch` (sha256 `637d1625…`, 51 files, +2254 / −1535) plus N-9, N-10 and cure 1 (§1.3) |
| base | `git apply --check` clean at HEAD `a11a6ed6a` (entry 2) and at `89aab527f` (entry 1, where every cell was measured). `git diff --stat 89aab527f a11a6ed6a -- src demo tests` is empty, so every reading below describes today's HEAD plus this patch. Entry 2: `git apply -R --check floor-v4.patch` is clean in the seat worktree, so the measured tree is the patch, new files included |
| builds | `builds/fv4` was built twice, at 16:16 (`build-fv4b-probe.log`) and 19:12 (`build-fv4-final.log`). `diff -rq` of the two outputs differs only in `build.json`'s timestamp, so every stage, whichever build it read, measured the same artifact. `fv3` is L1's reference (`build-fv3.log`) |
| v3 → v4 | `FV4-records/delta-v3-v4.diff`: 8 files. src +65 / −95 (`GlassDock.vue`, `useDockState.ts`, `morph.css`, `index.css`, `density.css`); demo +22 / −1 (`overview.vue`); tests +84 / −2 (`useDockState.chart.test.ts`, `GlassDock.posture.test.ts`) |
| N-5 | **not built.** Q-12 is unruled (`audit/INBOUND.md` through O-98; `FORMATION-PROGRESS.md` read 2026-10-17 22:05). §1.4 |
| owner rulings | none since pass 4 on Q-4, Q-12, Q-15, Q-16, Q-17 or Q-18. Defaults as H5: Q-4 lenient → OWNER-BLOCKED, Q-12 lerp cells → OWNER-BLOCKED, Q-18 read as (a). Q-15 unruled, so G's seats run |
| harness | H5 (`pass-5/H5.md`, `harness/HARNESS.md` §10), unchanged by this seat. Drivers `FV4-build.sh`, `FV4-chain.sh` (after `H5-build.sh`, `H5-chain.sh`); digest `FV4-cells.mjs` (H5-cells.mjs's verdict rule and 38-row map, unchanged; only the sources differ); diagnosis probe `FV4-c2-probe.mjs` |
| adapter | `pass-3/adapter-floor-v2.mjs`, unchanged. Floor v4 keeps the floor's DOM contract |
| engines | Chromium (Playwright's headless shell, no GPU launch args) and **Playwright WebKit**, unshimmed. Playwright WebKit is not Safari. Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)** |
| load | 1-minute load 4.4-35.1 across the cells of record and their re-runs (`counts-fv4.md`, per witness); each stage's load opens and closes its line in `battery/chain.log`. Every red cell was re-run twice; a red that passed both re-runs reads NOT-REPRODUCED (3 cells of 1,157) |
| records | `pass-5/FV4-records/`: `F7-fv4/`, `F7-fv4.log`, `PR-fv4/`, `PR-fv4.log`, `battery/` (stage logs, re-runs, `json/`, `chain.log`), `probe/`, `cells-fv4.json`, `rows-fv4.md` (every row per build, theme and engine), `table-fv4.md`, `counts-fv4.md`, `delta-v3-v4.diff`, `apply.log`, `build-*.log`. `v4a/` holds the pre-cure records (§1.3) |

Short names: **v3** is HEAD + `floor-v3.patch`, **v4** is HEAD + `floor-v4.patch`, **v4a** is v4 before cure 1. "Before" is H5's baseline of v3 (`H5-records/`), which is **Chromium light only**: the zone stop ended it before the v3 dark set and every Playwright WebKit stage (H5.md §4). So a row's before/after is exact in Chromium light. In Chromium dark and in Playwright WebKit, only v4 has a reading.

---

## 0 · In brief

| row | status | what moves |
|---|---|---|
| N-9 the facility floor | **landed**, five parts (§1.1) | C1, C3, C5, C6 FAIL → PASS on v4 in both engines and both themes; C3's coarse-tap half and C7's coarse-tap cell with them. C8 stays red: the floor's deletion of GlassDock's `isTransitioning` guard does not cure O-91, because the chart still drops the press (§1.1 e) |
| N-10 prose the facility made false | **landed** (§1.2) | B3 3/4 → 4/4, N5's source half 2/3 → 3/3 (PR `partials`) |
| cure 1 (no summary `aspect-ratio`) | **landed**, measured as a trade (§1.3) | without it N-9's glyph makes the collapsing dock 213 px tall (C2 red). With it C2 holds, and two cells of R1, a row v3 already fails, go red in both engines: `case·capped·morph[errors]` and `wide·warm-collapse[faces]` |
| N-5 the card corner | **OWNER-BLOCKED (Q-12)**, not built | — |

F7 (H5-10) on v4: **13/13**. Lib and demo build exit 0; `vue-tsc` exit 0; vitest `--maxWorkers=2` 235 files outside `tests/gates/`, 2,254 tests, 0 failing; every repo gate passes, `gate:boot-graph` 14/14 with its build arm 3/3 (`F7-fv4.log`, load 16.5-20). PR (H5-8) 5/5.

**Count on the 38 rows (H5):** v4 **22/38**, first 36 22/36, first 24 12/24, over both engines and both themes. v3 under H5 read 15/38 on Chromium light alone (H5.md §3.2). Against v3's 15, v4 adds F7, which v3 also passed but which the digest counts UNMEASURED there (H5's old-order run), plus N5 and B3 (N-10), and C1, C3, C5 and C6 (N-9). These are the rows its hunks address. No row v3 passed is lost, but the comparison is uneven: v3 was read in one column (Chromium light) and v4 in four. Two cells of R1, a row already red, regress (§1.3). N3 passes in three of v4's four columns and fails in Playwright WebKit dark on the floor's recorded `seat-transition` borderline (§3.2).

## 1 · The rows

Line numbers are in the patched tree. Rows N-1..N-8 are unchanged from v3 (`pass-4/FLOOR-V3.md`, `pass-3/FLOOR-V2.md`).

### 1.1 · N-9 · the facility floor

The five carrier-independent hunks §P4-0 found identical in both route patches. Each is in both pass-4 route patches and in `floor-v4.patch` (`grep -c` per patch: `scroll.page` 7/7/7, `onDockKeydown` 2/2/2, `dock-summary-glyph` 2/2/2, `SlidersHorizontal` 1/1/1, for B′/G/v4). Each route's copy is struck in its rebase (P-3).

| part | hunk | where | rows it moves | cost |
|---|---|---|---|---|
| a · `scroll.page` | a `scroll.page` event in `DOCK_CHART`: `hover` → `collapsed` and `pinned` → `collapsed` (collapsible only) when the dock is neither held nor engaged; one capture/passive `scroll` listener on `document`, attached on the frame after the dock opens, beside the press-away listener, and ignoring scrolls inside the dock or a surface it teleports | `useDockState.ts` (the chart and the outside listeners, which are renamed from the click-away pair because they are two now) | C3 `c3·scroll[collapses]` FAIL → PASS. v3: "wheel 240 px scrolled the page 240 px; did NOT collapse within 1.5 s"; v4: collapsed at the 100 ms read in both themes (`probe/c3-scroll-chromium-*.log`) | +31 / −15 lines; one listener per open dock, passive |
| b · Escape from anywhere | the Escape handler moves from the full face to the dock root (`onFullKeydown` → `onDockKeydown`), runs only while expanded, and its dismissable-layer scope widens from the full face to the dock. A persistent seat's Escape now folds the dock, and focus lands on the summary | `GlassDock.vue` | C5 `c5·keyboard[escape]` FAIL → PASS | +10 / −6 |
| c · the summary's glyph disclosure | the `#collapsed` slot's fallback: `Ellipsis` (`EllipsisVertical` when vertical) in a `dock-icon-button` seat, `aria-hidden`. The collapsed dock is the persistent seats plus a painted disclosure, never a bare tile (O-88). Its consequence in CSS: the `:empty` summary rules (four blocks, 43 lines) have nothing to match and are struck | `GlassDock.vue`; `morph.css` | C1 `c1·shape·h[square,summary]` FAIL → PASS (v3 "collapsed 56×56 … disclosure … does not paint"; v4 "collapsed 102×56, corner R 9999, painting seats' span 86 px (hug bound 110)"); C5's `disclosure` half | +8 / −1 template; −43 CSS |
| d · the coarse tap | **no hunk of its own.** The coarse path (`press.coarse`, `click.summary` → `pinned`) is HEAD's chart. On v3 the tap at the collapsed dock's centre landed on a zero-width `:empty` summary and activated nothing. Part c gives it a seat to land on | — | C3 and C7 `c7·coarse-tap[opens]` FAIL → PASS | 0 |
| e · the demo dock's menu | a `DropdownMenu` with a `DockTrigger for="dropdown"` (a view radio group) in the overview's collapsible dock, and the prose under it, which now says what the facility does | `demo/stories/dock/overview.vue` | C6 `c6·menu[menu]` FAIL → PASS (v3: "the collapsible dock carries no menu trigger") | demo +22 / −1 |

Unit tests, moved with the hunks (in both routes' patches before):
- `useDockState.chart.test.ts`: "a page scroll folds an open dock that nothing engages, never one a hold engages (O-88 C3)" (hover, a held pin, `alwaysExpanded`); "a scroll inside the dock is the dock's own, not the page's".
- `GlassDock.posture.test.ts`: "Escape from a persistent seat folds the dock and lands on the summary (O-88 C5)"; "with no #collapsed content the summary paints the dock's glyph in a seat (O-88 C1)". The hosted-in-a-dialog test's name follows the scope change ("bounded by the dock").

**What N-9 does not move:**
- **C8** (O-91) stays red in both engines and themes: 8 presses mid-morph in 16 attempts, 0 of 8 collapsed within 1500 ms of the settle (Chromium light, load 15.03, re-runs F, F; Playwright WebKit light and dark likewise). Pass 4 noted that the floor deletes GlassDock's `if (isTransitioning?.value) return;` (`floor-v3.patch:1721`). On v4 that deletion is not the cure. **The chart itself still drops the press:** `useDockState.ts:146` (`hover`) and `:152` (`pinned`) gate `click.away` on `c.transitioning`, which `GlassDock.vue` feeds from the morph's own flag (`:225`). A press during the morph is sent, the chart refuses it, and nothing re-sends it at the settle. This seat reads that from source and the C8 verdict; it is placed (§5), not built, because it is not one of N-9's identical hunks.
- **C9** (O-74e) stays red: expanded block 60 px against 52 (a 44 px seat + 2 × the compact rung's 4 px block padding) at 844 × 390 coarse, every seat ≥ 44 px, in both engines and themes. v3 read `opened` (the coarse tap did not expand the dock); v4 expands and the block is the defect. A short-viewport rung is not N-9.
- **C7**'s vertical morph, `c2·morph·v[continuous]`: one 178 px step against a bound of 95.85 on first and warm expand, as on v3 (v3 71 frames, v4 65). The vertical morph is the carrier's (§P4-5).

### 1.2 · N-10 · prose the facility made false

| hunk | where | gate |
|---|---|---|
| "the collapsed dock is `cross × cross` and paints a circle of radius cross/2" → the summary is a seat at least the seat-row square, and the collapsed dock is that seat plus any persistent seats: a stadium, or a circle when there is no persistent seat. The paragraph also records why no `aspect-ratio` (cure 1) | `morph.css`, the summary block (~:100-110) | H5-8; the fact is C1's measured 102 × 56 |
| "The six partials" → "The partials". The hand-kept list of seven partials beside it is struck, because the `@import` list is the one record of the partials and their order (P-3). "src/styles/dock/" → "this directory", and "dock-controls.css" → "controls.css @import-ed by src/styles/index.css" | `index.css` header | H5-8 `prose·partials`: v3 FAIL ("six partials" over 14 `@import`s) → v4 PASS ("0 partial count(s) in an @import file; 0 wrong") |
| "@import-ed by dock.css" → "by index.css" | `morph.css:12` | the file that imports it |
| "the collapsed pane's own `aspect-ratio: 1` square floor" → "its two minimum sizes" | `density.css:59` | cure 1 removed the ratio |
| "the box is the 54px circle then" → "its collapsed rest" | `morph.css` (the hover-lift comment) | the rest is 102 × 56 with a persistent seat |

PR on v4 (`PR-fv4.log`, load 20): `prose·readers` 76 properties, 0 without a reader; `prose·count` 7 members, 0 wrong; `prose·partials` 0 wrong; `prose·citations` 0; `prose·rows` 33 tokens, 0 doubled. 5/5. v3: 4/5, `partials`.

Cost: +6 / −23 lines in `index.css`, comment-only elsewhere.

### 1.3 · Cure 1 · no `aspect-ratio` on the summary (the N-9 cure)

**What N-9 broke, measured.** Entry 1's first build (v4a: N-9 + N-10 with HEAD's `aspect-ratio: 1` on `.dock-layer--summary` kept) read `c2·morph·h` red in Chromium (`v4a/`). `FV4-c2-probe.mjs` found why (`probe/c2-collapse-chromium-light.log`, load 10.85-13.44). On collapse, the summary is the incoming pane, and mid-morph it stretches along the main axis to the dock's extent. With a ratio of 1, that width became its block size: **the collapsing dock painted 259 × 213 px**, then shrank its width to 102 while staying 213 tall, and snapped to 56 at the settle (`root height 56..213`). On v3 the summary was empty, and the `:empty` rules zeroed it, so the ratio never had a width to copy.

**Cure 1.** Strike `aspect-ratio: 1`. The two minimum sizes (`min-inline-size`, `min-block-size` at the layer height) keep the seat at least square at rest. Probe after the cure (`probe/c2-collapse-chromium-light-cured.log`, load 14.99-17.34): `root height 56..56; width 102..259` over 901 frames. C2 holds on v4 in both engines and themes.

**What cure 1 costs, measured in both engines.** Two cells that pass on v3 and on v4a fail on v4, each red in the main run and both re-runs:

| cell | row | v3 (C light) | v4a (C light) | v4 Chromium light / dark | v4 Playwright WebKit light / dark |
|---|---|---|---|---|---|
| CASES `case·capped·morph` | R1 | PASS, 0 error events (load 17.13) | PASS (load 28.4) | FAIL `errors`: 1 window error event, "ResizeObserver loop completed with undelivered notifications." (load 17.26; re-runs 20.18, 18.25) / not in the dark stage | FAIL `errors`: 1 page error and 1 window error event, the same message (load 10.88; re-runs 10.74, 10.33) / not in the dark stage |
| W3 `wide·warm-collapse` | R1 (`faces`) | PASS, 0 px of face ink beyond the plate (load 15.68) | PASS, 0 px (load 18.32) | FAIL: 92 px (load 15.13) / 94.5 px (load 28.41), re-runs F, F | FAIL / FAIL, re-runs F, F (loads 8.6-16.38) |

Plate travel and the largest step in `case·capped·morph` are the same on v3 and v4 (236.47 px, 38.47 px), so the motion is unchanged and only the observer loop is new. R1 fails on v3 for other cells (`first-expand[seatStep,seatOverlap,faces]`, …), so neither regression changes a row verdict. Both are still cell regressions in the floor, and they are placed (§5).

**Cure 2, tried and reverted.** Entry 1 built a second variant aimed at the observer loop (`build-fv4c.log`, output in a separate `.fv4c/`). It held C2 (`probe/cure2-chromium-light.log`: height 56..56) and still read `case·capped·morph` FAIL `errors` with the same message (load 19.42). It was reverted, and the floor stays at cure 1. Its source was not banked, so only its probe log records it.

The reading: a summary that both stretches with the morph and keeps a square must not get that square from `aspect-ratio`. Which mechanism the routes use for the summary's size mid-morph is the carrier's question. B′ keeps HEAD's `aspect-ratio: 1` (its patch does not touch the line), and G adds it twice. Each route's rebase meets this as the C2 reading and these two cells.

### 1.4 · N-5 · the card corner

**OWNER-BLOCKED (Q-12).** Not built. No ruling in `audit/INBOUND.md` (through O-98) or `FORMATION-PROGRESS.md` (read 2026-10-17 22:05). Under (b) no floor hunk is owed, because the route's band reading decides P1 (B′ holds the band, §P4-0 finding 6). Under (a) N-5 is a carrier hunk in each route (§P4-7.2). On v4, P1 is red for reasons outside the card: the `morph·*` and `vmorph·*` corner cells, as on v3 (33/42 in both).

## 2 · Build, typecheck, units, gates

| check | result | record |
|---|---|---|
| harness builds `fv4`, `fv3` (`harness/build.mjs`, out inside the worktree) | exit 0 | `build-fv4.log`, `build-fv4b-probe.log`, `build-fv4-final.log`, `build-fv3.log` |
| F7 lib build, demo dist build | exit 0, exit 0 | `F7-fv4.log` (load 16.51-17.03) |
| F7 `vue-tsc` (after the lib build, H5 cure 2's order) | exit 0 | `F7-fv4/` |
| F7 vitest `--maxWorkers=2`, whole suite | 235 files outside `tests/gates/`, 2,254 tests, 0 files failing | `F7-fv4.log` (load 18.15-20) |
| F7 gates, one cell each | boot-graph 14/14 (build arm 3/3), comment-ratio 15/15, feedback-tint-seam 3/3, gate-register 21/21, orphan-css-partial 9/9, overfit-structure 15/15, tabs-seam 26/26, token-hygiene 4/4, trap-gates 6/6, type-hygiene 7/7 | `F7-fv4.log` |
| PR | 5/5 | `PR-fv4.log` |

F7 ran at 16:59-17:01 on the cure-1 source. The worktree's `git diff HEAD` read equal to the patch before the 19:12 build, and entry 2's reverse check reads it equal now. The boot graph stays under its ceiling with the glyph's two Lucide icons in the eager graph.

Cost of v4 over v3 in `src/`: +65 / −95 lines (net −30). One `document` scroll listener while a dock is open (passive, capture). Two icon components imported by `GlassDock.vue`. No new module, no new export, no new token. L1 6/6 in both engines (light and dark in one cell): no lighting layer added (O-87).

## 3 · H5 on v4: the 38 rows

### 3.1 · Per row, before and after, per engine

From `FV4-records/rows-fv4.md` (passing cells / cells read). "v3" is H5's Chromium-light baseline. "—" means not read in that column (a witness outside that stage, or the H5 baseline's gap). F7, B3 and N5's source half are read from the tree.

| # | v3 C light | v4 C light | v4 C dark | v4 W light | v4 W dark | tree v3 → v4 | moved by v4 |
|---|---|---|---|---|---|---|---|
| P1 | F 33/42 | F 33/42 | F 33/42 | F 33/42 | F 33/42 | — → — | no |
| P2 | P 8/8 | P 8/8 | P 8/8 | P 8/8 | P 8/8 | — → — | no |
| P3 | F 14/42 | F 14/42 | F 14/42 | F 14/42 | F 14/42 | — → — | no |
| P4 | F 12/13 | F 12/13 | F 12/13 | F 12/13 | F 12/13 | — → — | no |
| P5 | P 8/8 | P 8/8 | P 8/8 | P 8/8 | P 8/8 | — → — | no |
| F1 | P 17/17 | P 17/17 | P 17/17 | P 17/17 | P 17/17 | — → — | no |
| F2 | P 6/6 | P 6/6 | P 6/6 | P 6/6 | P 6/6 | — → — | no |
| F3 | P 4/4 | P 4/4 | P 4/4 | P 4/4 | P 4/4 | — → — | no |
| F4 | F 7/8 | F 7/8 | F 7/8 | F 7/8 | F 7/8 | — → — | no |
| F5 | F 0/1 | F 0/1 | F 0/1 | F 0/1 | F 0/1 | — → — | no |
| F6 | P 162/162 | P 162/162 | P 150/150 | P 162/162 | P 150/150 | — → — | no |
| F7 | — | — | — | — | — | — → P 13/13 | no. v3 read 13/13 in the old order (H5 §3.1), outside this digest, so the table counts it UNMEASURED |
| N1 | P 2/2 | P 2/2 | P 2/2 | P 2/2 | P 2/2 | — → — | no |
| N2 | F 0/1 | F 0/1 | F 0/1 | F 0/1 | F 0/1 | — → — | no |
| N3 | F 2/3 | P 3/3 | P 3/3 | P 3/3 | F 2/3 | — → — | no: the `seat-transition` borderline (§3.2) |
| N4 | P 20/20 | P 20/20 | P 20/20 | P 20/20 | P 20/20 | — → — | no |
| N5 | P 1/1 | P 1/1 | P 1/1 | P 1/1 | P 1/1 | F 2/3 → P 3/3 | **yes** (N-10, PR `partials`) |
| R1 | F 15/32 | F 15/32 | F 14/30 | F 15/32 | F 13/30 | — → — | two cells red (cure 1, §1.3), one green (`vagree·morph·warm-collapse`) |
| R2 | F 24/33 | F 25/33 | F 24/33 | F 24/33 | F 24/33 | — → — | no |
| R3 | F 0/1 | F 0/1 | F 0/1 | F 0/1 | F 0/1 | — → — | no |
| R4 | F 1/5 | F 1/5 | F 1/5 | F 2/5 | F 2/5 | — → — | no |
| R5 | F 2/4 | F 2/4 | F 2/4 | F 2/4 | F 2/4 | — → — | no |
| R6 | P 39/39 | P 39/39 | P 39/39 | P 39/39 | P 39/39 | — → — | no |
| R7 | P 35/35 | P 35/35 | P 33/33 | P 35/35 | P 33/33 | — → — | no |
| R8 | F 3/9 | F 0/9 | F 0/7 | F 2/9 NR 1 | F 3/7 NR 1 | — → — | no: the `stall·nb` borderline (§3.2) |
| B1 | P 1/1 | P 1/1 | P 1/1 | P 1/1 | P 1/1 | — → — | no |
| B2 | P 6/6 | P 6/6 | P 6/6 | P 6/6 | P 6/6 | — → — | no |
| B3 | — | — | — | — | — | F 3/4 → P 4/4 | **yes** (N-10) |
| C1 | F 0/1 | P 1/1 | P 1/1 | P 1/1 | P 1/1 | — → — | **yes** (N-9 c) |
| C2 | P 3/3 | P 3/3 | P 3/3 | P 3/3 NR 1 | P 3/3 | — → — | no |
| C3 | F 2/4 | P 4/4 | P 4/4 | P 4/4 | P 4/4 | — → — | **yes** (N-9 a, c/d) |
| C4 | P 1/1 | P 1/1 | P 1/1 | P 1/1 | P 1/1 | — → — | no |
| C5 | F 0/1 | P 1/1 | P 1/1 | P 1/1 | P 1/1 | — → — | **yes** (N-9 b, c) |
| C6 | F 0/1 | P 1/1 | P 1/1 | P 1/1 | P 1/1 | — → — | **yes** (N-9 e) |
| C7 | F 2/4 | F 3/4 | F 3/4 | F 3/4 | F 3/4 | — → — | one cell (`c7·coarse-tap`, N-9 d); `c2·morph·v` stays |
| C8 | F 0/1 | F 0/1 | F 0/1 | F 0/1 | F 0/1 | — → — | no |
| C9 | F 0/1 | F 0/1 | F 0/1 | F 0/1 | F 0/1 | — → — | no |
| L1 | P 6/6 | P 6/6 | — | P 6/6 | — | — → — | no |

W is Playwright WebKit. A row passes when every engine and theme it was read in passes.

**Count:** v4 passes P2, P5, F1, F2, F3, F6, F7, N1, N4, N5, R6, R7, B1, B2, B3, C1, C2, C3, C4, C5, C6, L1 = **22/38** (first 36 22/36, first 24 12/24). Open: P1, P3, P4, F4, F5, N2, N3, R1, R2, R3, R4, R5, R8, C7, C8, C9 (16). None reads OWNER-BLOCKED as its verdict, because each of P1 and P3 also carries a red cell (the `morph·*` corners; W3 seat steps and `leaving`). Their Q-12 and Q-4 cells stay owner-blocked under them.

### 3.2 · Cells that differ v3 → v4 in Chromium light, and why

Read from `cells-fv4.json`, Chromium light, the only column both builds have.

| cell | v3 | v4 | reading |
|---|---|---|---|
| CF `c1·shape·h`, `c3·scroll`, `c5·keyboard`, `c6·menu`, `c7·coarse-tap` | FAIL | PASS | N-9 (§1.1) |
| CASES `case·capped·morph`; W3 `wide·warm-collapse` | PASS | FAIL | cure 1 (§1.3) |
| W3 `vagree·morph·warm-collapse` | FAIL | PASS | the summary's stretch with no ratio agrees with the plate. Recorded, not claimed as a cure |
| ST `stall·nb·2raf`, `·100ms`, `·mid-flight` | PASS | FAIL (re-runs P/F, P/F, F/F) | the floor's recorded `stall·nb` borderline (FV3 §3.2). v3 reads the same three cells red in Chromium dark (H5 stage, load 8.26-8.57; one re-run, F). v4 Playwright WebKit reads them PASS, PASS/NOT-REPRODUCED and NOT-REPRODUCED. The neighbour's one-frame step is 378.6-379.2 px (×1.97) at 40 ms on both builds, and no v4 hunk touches the flow. R8 is red on both |
| W3 `seat-transition` (N3) | FAIL `window, trajectory` (4.48 px against 4.2, load 9.3; re-runs F, F) | v4 Chromium light reads `window` only (trajectory 3.89 px, load 14.2), and `window` is outside N3's checks; Playwright WebKit dark `window, trajectory` 4.63 px (load 4.87) | the recorded 4.2 px trajectory borderline (FLOOR-V2 §1.3, FV3 §3.2). It moves N3 by engine between runs, so N3's v4 verdict is that borderline's, not a hunk's |

## 4 · The fences, as kept

- Every build and run used the seat worktree `.claude/worktrees/bl/D2/p5/floor4/wt` (detached, `node_modules` symlinked from the checkout). Build output and the vite cache stayed inside it (`.fv4out/`, `.fv4c/`, `dist/`). It is removed at the seat's close (§6).
- Writes to the checkout: only under `docs/tranches/BL/design/dock/pass-5/` (`floor-v4.patch`, `FLOOR-V4.md`, `FV4-*.mjs`, `FV4-*.sh`, `FV4-records/`). No git write other than `worktree add` and `worktree remove`.
- Every browser run went through `~/.claude/guard/guarded`, one heavy run at a time; Playwright WebKit under `--exclusive webkit`, queued and never cancelled for the wait. The WebKit browser retires every 60 page loads (H3-1). Entry 2's darkrest stage waited about 5 minutes (22:02 queued, 22:07 admitted, 22:11 done, load 9.63-15.10) for the lock.

## 5 · Open, placed

| item | owner | placed in |
|---|---|---|
| C8 (O-91): `DOCK_CHART` gates `click.away` on `c.transitioning` (`useDockState.ts:146`, `:152`). A press during the morph is dropped, and nothing replays it at the settle. 0/8 collapsed in both engines and themes. Deleting GlassDock's guard (floor v3) is not enough | the routes, or a floor v5 row (a press during the morph is queued to the settle, or the gate is struck and the morph retargets) | C8 |
| C9 (O-74e): the expanded dock is 60 px block at 844 × 390 coarse, against 52 | a short-viewport rung (O-74e); not N-9 | C9 |
| cure 1's two cells: `case·capped·morph` ResizeObserver loop (both engines), `wide·warm-collapse` face ink 92-94.5 px beyond the plate (both engines) | each route's summary sizing on rebase (B′ and G both keep or add `aspect-ratio: 1`, so each meets the 213 px stretch or these cells) | R1 (cells), C2 |
| the C8 `opens` count includes hovers onto a dock that never collapsed (H5.md §5) | H5 | C8 |
| `stall·nb` and `seat-transition` borderlines (§3.2) | recorded floor flakes; the critics read them as such | R8, N3 |
| N-5 | owner (Q-12) | P1 |
| every real-Safari cell | **UNMEASURED (owner's safaridriver checkbox)** | all rows |

## 6 · Seat close

- The worktree `.claude/worktrees/bl/D2/p5/floor4/wt` was removed with `git worktree remove --force`, and the empty `floor4/` directory with it (22:12). No process of this seat remains: no guarded run, no browser, no server.
- Adapter law on the unchanged adapter (`battery/fv4-extra-adapter-law.log`, load 13.38): L-1..L-5 hold.
- The checkout's tracked tree is untouched (`git status` shows no modified tracked file).
- For the routes' rebase (§P4-7.3): apply `floor-v4.patch`, strike the route's copy of N-9's five parts, and read C2, `case·capped·morph` and `wide·warm-collapse` against the route's own summary sizing (§1.3).
