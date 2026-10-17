# D2-G prototype, pass 4: the sliding aperture on floor v3

| | |
|---|---|
| Seat | D2 pass 4, route D2-G (the sliding aperture), PROTOTYPE |
| Model | claude-opus-5-5 |
| Base | HEAD `7d309f73a` (the worktree's cut) + `pass-4/floor-v3.patch` |
| Patch | `pass-4/D2-G-proto.patch`, 59 files, 6 660 lines, sha256 `394260f88b0fcc3f8739e60c6f7c6e32ce21785b96c36618fa66dce43e71d5d3`. `git apply --check` exit 0 on the seat's HEAD + floor v3 checkout, and again on `git archive ec90b3103` (HEAD at close) + floor v3 (`D2-G-proto-records/patch-apply.txt`) |
| Size | src 43 files +2782/−1554 (`useDockAperture.ts` 1 799 lines), tests 13 files +228/−632, demo 2 files +30/−10, docs/design 1 file +1/−2 |
| Build | `g` (harness `build.mjs --label g`) is the reading. `fv3` (HEAD + floor v3) is the L1 reference and the cost base. g0-g16 are the history (§8) |
| Adapter | `pass-3/adapter-G-p3.mjs`, unchanged (adapter law L-1..L-6 PASS). No WebKit shim |
| Engines | headless Chromium and Playwright WebKit. Real Safari: UNMEASURED (owner's safaridriver checkbox) |
| Runner | `D2-G-proto-records/run.sh` (B′'s runner with the G adapter and label), `chain.sh` (one guarded slot per engine; WebKit under `--exclusive webkit`). Every red cell re-run twice by exact name |
| Digest | `D2-G-proto-records/g-cells.mjs` (FV3-cells.mjs's verdict rule and row map) → `rows-g.md`, `counts-g.md`, `cells-g.json` |
| Records | `pass-4/D2-G-proto-records/`: stage logs, `json/`, `filmstrips/`, `facility/`, `cost-*.json`, `r8/` (the N1/R8 variants), `ctx/` (the H4-5 diagnosis), `checks/`, `dev/` (intermediate builds), `superseded-g14/` (the g14 Chromium battery, before the W7 cure) |
| Load | 10-core host shared with other seats. Per log and per cell: Chromium battery 4-18, Playwright WebKit 7-23 |

## In brief

G on floor v3 meets most of the §P3-7.3 obligations in Chromium. It does not meet R8 in Playwright WebKit.

**Met:**
- **B2, no splice, and the seam cut eases out.** H4-1 `splice` and H4-2 `lanes` are 33/33 in Chromium, light and dark, in every run. In Playwright WebKit there are three single-frame slivers in first runs: `swap-short`, light, twice, and `warm-collapse`, dark, once. Load was 9-18. Every re-run reads 0 sliver frames, so the cells are NOT-REPRODUCED. §9 lists them as intermittent.
- **R2, the retarget's leaving fade.** It lasts 105-235 ms in both engines, against a morph window of about 250 ms, so it is ≥ 0.42 × the morph. The 0.25 floor needs ≥ 63 ms.
- **B3.** `--dock-expand-t` has one row in `docs/design/tunable-anim.md` (PR `rows`: 32 tokens, 0 duplicates).
- **R8 in Chromium.** The flow clock puts every lane of an in-flow dock on the main thread: ST 10/10 and the neighbour cells 2/2, light and dark. The plate never covers the neighbour (worst −17.7 px), and the neighbour's largest step is 0.58-0.80 × its bound.
- **O-88 C1-C7 and O-87 L1** pass 14/14 and 6/6 in both engines and both themes.
- **CASES** is 6/6 in both engines. Each engine has one NOT-REPRODUCED red (§6).
- **H4-5 is diagnosed.** The Chromium `retarget·context` red is V8 collecting the evaluate's promise. Floor v3 reproduces it with no G code at all (§3.4). The page itself is intact.

**Not met:**
- **R8 in Playwright WebKit: 5/7, light and dark, reproduced.** `stall·nb·2raf` and `stall·nb·mid-flight` fail. The glass resumes, but the in-flow neighbour catches up in one frame when the block ends: a step of 259-379 px against a bound of 192 px. The plate still never covers the neighbour (worst −19.7 px). No in-family mechanism held WebKit in this pass (the §3.1 table).
- **H4-5 `retarget·context` in Chromium.** It is red in both themes and reproduced, and it is green in Playwright WebKit. The diagnosis points to a harness fix: hold the awaited promise in the page (§7).
- **W7 `side·light·dpr1`** is red in Chromium only (§6). At four 45° bins the 1 px arc reads 1-2/255 at DPR 1. Playwright WebKit is 20/20.
- **The boot graph is over its ceiling.** It is 508 427 B against 503 808 B: G adds 24 501 B over floor v3. Recorded, not cured.
- **The 4× 40-seat expand** costs 8 frames over 25 ms in Chromium. Floor v3 has 0 and pass 3 had more. Recorded with its profile (§3.5).
- **PR `readers`** flags `--dock-clock`, which is written and never read. That is the mechanism (§3.1), and a reader would be contrived.

Real Safari is UNMEASURED (owner's safaridriver checkbox).

## 1. What the patch is

The pass-3 G patch rebased onto HEAD + floor v3, then the §P3-7.3 work on top of it. The DOM and paint are pass 3's:
- two nested doors, each with a counter;
- one plate stretched over the union of the doors;
- the caps;
- the casters, carrying the shadow only under `[data-aperture]`;
- the clipped hit pair;
- `.dock-layers` as the face door, with an inline inset clip from `doorShape`.

The lanes are WAAPI on a 120 Hz grid.

### 1.1 The horizon and the landing (B2, R2)

`useDockAperture.ts` §play.

- **The horizon** is `max(lengthMs, seatsLandMs)`.
  - In an exchange, `lengthMs = max(landMs, EXCHANGE_FRAC × rungMs)`, with `EXCHANGE_FRAC = 0.75`. An exchange is a posture change, a pending swap, ghosts, a leaving layer, or a leaving face in the crossfade.
  - Otherwise, `lengthMs` is `landMs` when the length lane lands two or more steps in, and the rung otherwise.
  - Before this floor, a retarget pinned at its first crossing landed about 20 ms after the retarget, and the leaving seats vanished. At the full rung, too many windows ran past the allowance, so the floor is 0.75.
- **The taper (`LAND_STEPS = 2`).** The A, B and σ lanes ease to 0 over the last two grid steps, so the last seam cut is at identity when the flag closes (H4-2). Four steps pushed `seat-transition` over its window.
- **Jump keyframes.** A unit's hidden/shown flip is a pair of keyframes at one offset, and its fade sits at the corners. The keyframes are simplified numerically (`KEY_EPS_PX = 0.05`, `KEY_EPS = 0.0005`). This removed the slivers that interpolation drew between a hidden and a shown state.
- **The leaving fade** is emitted as corner keyframes, with a visibility step where the unit crosses `PAINTS`. Each new unit's room is tracked at steps i and i−1 while it shows (`roomAt`, `hid`), and a sliver is hidden according to its window (`winOf(i)`). A ghost keeps its inner side.

### 1.2 The flow clock (N1, R8)

The flow clock runs only when all three hold: the dock is in flow, reduced motion is off, and it has a flow neighbour (`hasFlowNeighbour`: a sibling that is not `display: none`, absolute or fixed). In that case every lane of an element is merged into ONE animation per element (`id: "dock-aperture"`). That animation carries `--dock-clock` from 0 to 1, and its first segment has `steps(1, end)` timing.
- **Chromium.** A custom property in the keyframes keeps the animation off the compositor. The glass and the flow margins then share one main-thread clock.
- **The stall.** `followStall` is a rAF reader. After a frame gap over 100 ms it shifts every animation's `startTime` by the gap less one frame, shifts `ep.t0`, and re-arms the land timer. It writes no style. The lattice test pins that.
- **`handOffSizes`** skips the carrier's animations (`CARRIER_ANIMATION_ID` in `dockSizeHandoff.ts`).

### 1.3 The flow margins (CASES consumer-margin)

During an episode the root's main-axis margins are `!important`: `calc(var(--dock-flow-base-lo|hi) + var(--dock-flow-lo|hi))`.
- The base is read from the rest's computed margins before any write, and removed at landing.
- At rest the margins are `var(--dock-gutter)` only (`shell.css`).

So a consumer's unlayered margin survives the episode. `case·consumer-margin` passes in both engines.

### 1.4 The edge (W7)

The caps were the W7 regression found in the first final battery (`superseded-g14/`): 2/20 in Chromium, every cell "whole".
- The fix: each cap is now its door's full end shape, twice the corner long, with the edge as its own border. It is clipped to the half at its door's end and to the band the straights leave unpainted.
- `.dock-cap-ring` is gone.
- The rims are the plate's at rest, when the plate is the window. Through an episode they ride the inner counter, so there is one owner at a time.

### 1.5 Hit testing and focus (R5, C5)

- **Hit testing.** `.glass-dock[data-aperture] .dock-layers { pointer-events: none }`, and the search field keeps `auto`. A warm-expand press no longer lands on the face door.
- **Focus.** `onSummaryKeydown` focuses the first focusable element in the full face. If that does not take focus, it falls back to the face.

### 1.6 Clean-up

The cleanup was done after the Chromium battery:
- **Three reader-less tokens deleted.** The aperture removed the transitions that read `--dock-motion-standard` and `--dock-motion-resize`. `--dock-resize-spring` was read only by `--dock-motion-resize`. Their prose is deleted too, in `scroll-tokens.css`, `scheme-spring.css`, `layer-group.css`, `useDockShellProps.ts` and `spring-authority.test.ts`.
- **One `void`-kept width read dropped** (the G-OVERFIT no-shim arm).

None of these changes behaviour. The deleted tokens have no reader, and `widthOf` is a pure read. The Chromium battery ran on the build before the cleanup. The Playwright WebKit battery, the Chromium faces pass and the checks ran on the final source.

## 2. Checks (final tree)

| check | result | load |
|---|---|---|
| library build | exit 0 | 6.7 |
| demo dist build | exit 0 | 6.6 |
| `vue-tsc` src, test | exit 0, exit 0 | 7.7 |
| vitest (`--maxWorkers=2`) | 2 343 pass, 10 expected fail, 1 skipped, **1 fail**: `gate:boot-graph` | 9-11 |
| boot graph (dist config) | **508 427 B / 63 files**. Ceiling 503 808 B. Floor v3: 483 926 B, so +24 501 B | 11 |
| dock + styles suites | 614 pass, 6 expected fail | 6 |
| adapter law | L-1..L-6 PASS. 49 lines differ from `adapter-head.mjs` | 4.7 |
| PR (final source) | `count` PASS (7 members, 0 wrong), `rows` PASS (32 tokens, 0 duplicates), `readers` **FAIL** on `--dock-clock` only (§3.1) | 4.6 |

Logs are in `D2-G-proto-records/checks/`. The PR read on the final source is in `extra-PR-final-source.log`. The chain's own `extra-PR.log` was read before the cleanup and also lists the two motion tokens.

## 3. The §P3-7.3 obligations

### 3.1 N1/R8: the glass and the flow on one clock

The stall witness (ST `stall·nb·*`) and the W3 neighbour cells. Per engine, `nb` is the five `stall·nb` timings and `leap` is the five glass-only timings (R4). The variants are complete builds; their diffs are under `r8/variant-*.diff` and every reading is in `r8/table.md`.

| build | what it does | Chromium nb | Chromium leap | Playwright WebKit nb | Playwright WebKit leap | load |
|---|---|---|---|---|---|---|
| g10 | WAAPI lanes, compositor clock | 1/5 | 5/5 | 0/5 | 5/5 | 12 / 24 |
| r8-main | `--dock-clock` written into every keyframe (main thread) | 3/5 | 3/5 | 0/5 | 5/5 | 23 / 27 |
| r8-watch | rAF watch: a gap over 3 steps shifts the episode | 5/5 | 5/5 | 0/5 | 5/5 | 23 / 27 |
| r8-hold | hold the layout length; the neighbour steps at landing | 0/5 | 5/5 | 3/5 (the neighbour step fails in the rest) | 5/5 | 23 / 27 |
| g12 | flow clock (merged animation + `--dock-clock`) + `followStall` | 5/5 | 5/5 | — | — | 16 |
| **g (final)** | g12 + a `steps(1, end)` first segment | **5/5 ×2 themes** | **5/5 ×2** | **3/5 ×2 themes, reproduced** | **5/5 ×2** | C 5-14, W 9-21 |

- **Final readings in Chromium:**
  - The neighbour cells (`neighbour·warm-expand/collapse`) pass 2/2 in both themes. Overlap is 0 px. The neighbour's worst step is ×0.65-0.66 of its bound.
  - In `stall·nb·*`, the plate sits inside its box: −17.7 to −18.8 px. The neighbour's worst step is ×0.58-0.80.
- **Final readings in Playwright WebKit:**
  - `same-task`, `1raf` and `100ms` pass.
  - `2raf` and `mid-flight` fail in both themes and both re-runs. The plate never covers the neighbour (−19.7 to −19.8 px). The neighbour takes a single step of 259-379 px (×1.35-1.97 of the 192 px bound) in the frame after the block ends.
  - In `mid-flight`, the glass travels 110-120 px during the block. In `2raf` it travels 0.2-3 px.
  - So WebKit keeps the glass, or part of its lanes, on its own clock while layout is blocked. Neither the custom property nor the `steps()` segment brought it onto the main thread.

**Measured report:** no in-family mechanism tried here holds R8 in Playwright WebKit. Four routes were tried: a main-thread property, a rAF stall watch, holding the layout length, and the flow clock with a steps segment. The best is 3/5 `nb` (r8-hold and the final). The other way out stays outside the family: drive the plate from the main thread every frame (a rAF driver), which G's no-rAF lattice forbids. The anchored edge holds in both engines (N1 `anchor-end` 2/2 ×4). One WebKit dark faces run read a drift of 3.08 px, and both re-runs read in bound (NOT-REPRODUCED, §6).

### 3.2 R2: the retarget's leaving fade

| cell | Chromium light | Chromium dark | Chromium faces run | Playwright WebKit light | Playwright WebKit dark |
|---|---|---|---|---|---|
| `retarget·40` | 125.3 ms (17 fr) | 109.8 ms (15 fr) | 117.4 ms | 119 ms (12 fr) | 123 ms (12 fr) |
| `retarget·80` | 185.1 ms | 184.4 ms | 189 ms | 195 ms | 194 ms |
| `retarget·120` | 235.5 ms | 224.1 ms | 108.2 ms | 105 ms | 110 ms |
| load | 13-14 | 6 | 11 | 22-23 | 11 |

The morph window is 230-260 ms, and 0.25 × 260 = 65 ms. The shortest fade is 105 ms (×0.40). The worst one-frame vanish is 0.17-0.32 against a bound of 0.5. `blank` and `seatOverlap` are 0 in every retarget cell.

### 3.3 B2 and B3

- **B2, H4-1.** `splice` is 0 frames in every W3 cell in both engines. `sliver` is 0 in Chromium in every run.
  - Playwright WebKit has three first-run sliver frames, each 1-8 px of a 40 px unit:
    - `swap-short` light, at load 17.7: 1 frame.
    - The same cell in the faces run, at load 18.7: 2 frames.
    - `warm-collapse` dark, at load 11.8: 1 frame.
  - All six re-runs read 0. The rule makes them NOT-REPRODUCED. They recur across first runs, so §9 lists them.
- **B2, H4-2.** `lanes` holds in every cell: every lane is at its final value from the frame the flag closes. There is one exception. WebKit `lead-remove` in the light faces run (load 18.7) cancelled 5 lanes to identity, the largest 0.93 px in one frame. Both re-runs pass (NOT-REPRODUCED).
- **B2, filmstrips.** FM is 6/6 ×4 as an instrument. On the gestalt, `swap-long` (Chromium light, tiles 2-5) still shows cut glyph stubs. The leaving "A" reads as a "ˌ" or "(" mark, and "Tools" is cut at the right of tile 5. Those are the B′ critique's "cut glyphs read as false glyphs". G narrows them to the first 4 tiles but does not remove them. No seam or join between the faces shows (a row scan across the plate's centre is flat at 212).
- **B3.** One `--dock-expand-t` row (`tunable-anim.md:134`). PR `rows` 32/0.

### 3.4 H4-5: the Chromium evaluate-context loss

`retarget·context` is red in Chromium in both themes and in all re-runs. Playwright reports "Execution context was destroyed", but the page is intact:
- 60/60 liveness pings and 0 main-frame navigations.
- The probe is still present after the cell.
- The in-page `setFace` ran.

Diagnosis, with `ctx/ctx-diag.mjs` and its logs:

1. Over raw CDP, the same call fails with `Runtime.callFunctionOn: Promise was collected` (-32000). Playwright rewrites that error into the "destroyed" message (`ctx-g6-protocol.log`).
2. It is a GC of the evaluate's pending promise. With `--js-flags=--expose-gc`, on **floor v3 with no G code** (`ctx-fv3-gc.log`):
   - a `gc()` two microtasks after the evaluate's function returns (`gc-slot`) reproduces it;
   - `gc-slot3` (three microtasks) and `gc-micro` (one) pass.
3. G's flip run is scheduled after the Vue flush (`nextTick`). It allocates enough to land a GC in that slot.
4. Holding the promise strongly in the page (`window.__held = p`) avoids it in 2/2 runs (`ctx-g6-held-first.log`).
5. Deferring G's run by one microtask (g15, reverted) only moves the slot: `cell` passes and `cell-micro` fails (`ctx-g15.log`).
6. Playwright WebKit never fails (`retarget·context` 1/1 ×4 here).

So the red belongs to the harness and V8, not the page. The cure is in the witness (§7). In-page timing changes only move the slot.

### 3.5 Cost

`pass-2/D2-Bp-probes.mjs --arm pcost,plead`, at N = 0, 10, 20 and 40 seats. Values are frame dtMax in ms, with frames over 25 ms in brackets.

| arm | g Chromium | fv3 Chromium | g Playwright WebKit | fv3 Playwright WebKit |
|---|---|---|---|---|
| expand ×1, N=40 | 21.1 (0) | 10.2 (0) | 28 (2) | 12 (0) |
| expand ×4, N=40 | **87.8 (8)**, p95 37.4, task 3.9 ms/frame | 15.8 (0), task 2.1 ms/frame | — (the 4× throttle is Chromium only) | — |
| expand ×4, N=20 | 38.2 (1) | 16.6 (0) | — | — |
| lead ×4, N=40 | 29.7 (1) | 9.8 (0) | — | — |
| lead ×1, N=40 | 9.0 (0) | 9.3 (0) | 13 (0) | 13 (0) |
| load | 4.3 | 4.8 | 8.3 | 8.1 |

- **History.** Pass 3 was 158-166 ms at ×4/N=40, and g13 was 118.7 ms (6 frames). A CDP profile (`prof.mjs`) put the time in `getBoundingClientRect`, inside `natural`, `noteSizes` and `doorShape`. It also showed `getKeyframes` in `handOffSizes`. The last two were cut: `doorShape` is computed once per `play`, and `handOffSizes` skips the carrier.
- **What is left:** at 40 seats, one natural read per seat on the flip, and keyframe arrays per lane.
- **Boot graph:** 508 427 B against a ceiling of 503 808 B (+4 619). That is +24 501 B over floor v3, and the 1 799-line composable is most of it. Recorded, not cured.

## 4. O-88 C1-C7 and O-87 L1

| row | Chromium light / dark | Playwright WebKit light / dark | reading (Chromium light, load 6-8) |
|---|---|---|---|
| C1 | 1/1 / 1/1 | 1/1 / 1/1 | collapsed 102 × 56, R 9999 (stadium), seats span 86 px (hug bound 110); vertical 116 × 64 |
| C2 | 3/3 / 3/3 | 3/3 / 3/3 | first expand: largest step 10.7 px (bound 70.7), flash 0, cross drift 0. Reduced motion lands in 0 frames. Five toggles 70 ms apart rest at 259 px |
| C3 | 4/4 / 4/4 | 4/4 / 4/4 | hover expands in 85 ms; Tab expands; wheel scrolls the page 240 px and collapses |
| C4 | 1/1 / 1/1 | 1/1 / 1/1 | `#persistent` present collapsed and expanded |
| C5 | 1/1 / 1/1 | 1/1 / 1/1 | Tab → first seat with the dock expanded; Escape then Enter |
| C6 | 1/1 / 1/1 | 1/1 / 1/1 | menu open after 4 ms; still open 4.5 s later |
| C7 | 4/4 / 4/4 | 4/4 / 4/4 | 390 px: extent 81..309, scrollWidth 390; a coarse tap expands |
| L1 | 6/6 (both themes inside the witness) | 6/6 | shadow 1 / 3 / 4 (collapsed / expanded / in flight) against fv3's 1 / 4 / 4; gradient 8, pseudo 8, blur 16 px, each equal to fv3. No layer is added |

Frames are under `facility/{chromium,webkit}-{main,dark}/`.

## 5. The arm set

The same set as B′'s run and its critic's. Every arm runs in Chromium and Playwright WebKit, light and dark unless noted:
- W1-W8 and R6.
- W3 with every H4 check:
  - splice and sliver (H4-1), lanes (H4-2), neighbour (H4-3);
  - `retarget·40/80/120` and `retarget·context` (H4-5);
  - paint floor, leaving, vanish.
- ST: the five timings and `stall·nb·*`.
- FM: strips under `filmstrips/`.
- R5 (H4-4).
- CF: C1-C7, frames under `facility/`.
- L1 against fv3.
- CASES (light), via `pass-4/D2-Bp-proto-records/probes/cases.mjs`.
- PR and adapter law (source, once).
- Cost on `g` and `fv3`.

**W3's pixel pass.** Like B′'s run, the main W3 stage runs with `--no-faces`, so the strip cells read UNMEASURED there. W3 also ran with its pixel pass (`faces`, `darkfaces`) in both engines, so faces are measured:
- Chromium: 30/33, + 2 OB, + 1 FAIL (`retarget·context`), in each theme.
- Playwright WebKit:
  - Light: 29/33 + 2 OB. The 2 reds are NOT-REPRODUCED.
  - Dark: 29/33 + 3 OB. The 1 red is NOT-REPRODUCED.

Every faces check passes: face ink outside the plate is ≤ 2 px against a bound of 2. `rows-g.md` digests the `--no-faces` stage, which is why F5 and part of R1/R6/R7 read UM there.

G's four pass-3 arms map like this:
- swaplag → H4-2 `lanes`;
- flowblock → ST `stall·nb`;
- in-page retarget2 → `retarget·{40,80,120}` and `retarget·context`;
- lunec → R5.

## 6. Per row, per engine

The verdicts come from `rows-g.md` (the `--no-faces` W3 stage) and the faces stage (§5). Loads are the range over the cells. C is Chromium; W is Playwright WebKit. "×4" means Chromium and Playwright WebKit, light and dark.

| row | Chromium (light / dark) | Playwright WebKit (light / dark) | reading | load C / W |
|---|---|---|---|---|
| **P1** W1 + W7 | W1 19/22 + 3 OB ×2; **W7 19/20 ×2** | W1 19/22 + 3 OB ×2; W7 20/20 ×2 | W1 OB: `card·*` window over the allowance (Q-12). W7 red: `side·light·dpr1[whole]`, weakest bin 1/255 at 45° (bound 2/255), median 6/255 | 4.5-6.8 / 7.3-9.9 |
| **P2** W2 | 7/8 ×2 | 7/8 ×2 | `route1·long-run-v[keyboard]`, reproduced: the shared floor-v3 witness defect (FLOOR-V3 §1.3) | 6.9-7.6 / 10.7 |
| **P3** W3, W6, W8 | W3 30/33 + 2 OB, faces on (1 red: `retarget·context`, B1); W6 4/4; W8 6/6 + 3 consumer UM | W3 faces on: 29/33 + 2 OB / 29/33 + 3 OB, reds NOT-REPRODUCED; W6 4/4; W8 6/6 | the W3 OB are window-only: `reversal`, `stretch·lead-add`, `anchor-end·*` (O-64 R-4) | 8-17 / 9-23 |
| **P4** W4 | 13/13 ×2 | 13/13 ×2 | — | 3.7-6.3 / 8.7-9.0 |
| **P5** W5, R6 | 6/6, 2/2 ×2 | 6/6, 2/2 ×2 | — | 4.3-5.8 / 7.3-9.6 |
| **F1** W1 rests + W2 | 17/17 ×2 | 17/17 ×2 | — | 4.6-7.6 / 7.9-10.7 |
| **F2** W5 | 6/6 ×2 | 6/6 ×2 | — | 4.3-5.8 / 7.3-9.6 |
| **F3** W4 coarse, hover gate | 4/4 ×2 | 4/4 ×2 | — | 3.7-6.3 / 8.7-9.0 |
| **F4** W4 compact | 8/8 ×2 | 8/8 ×2 | — | 3.7-6.3 / 8.7-9.0 |
| **F5** W3 `first-expand` | faces run 1/1 ×2 (step ×0.65) | faces run 1/1 ×2 | UM in the `--no-faces` stage | 8-13 / 9-18 |
| **F6** crash-free | 160/160, 148/148 | 160/160, 148/148 | 0 crashed cells | — |
| **F7** units, typecheck | — | — | `vue-tsc` exit 0 ×2. Dock + styles 614 pass. Full suite: 1 fail (boot graph, §3.5) | 6-11 |
| **N1** W3 `anchor-end` | 2/2 ×2 (drift 0) | 2/2 ×2 | WebKit dark faces run: drift 3.08 px once (load 8.1); re-runs OB-window and PASS (NOT-REPRODUCED) | 13-17 / 8-23 |
| **N2** `stretch·lead-add` | 1/1 ×2 (window OB) | 1/1 ×2 | — | 13-17 / 9-23 |
| **N3** lattice, infanim, seat-transition | 3/3 ×2 | 3/3 ×2 | `infanim` window 0/266 frames | 13-17 / 9-23 |
| **N4** W7 | 19/20 ×2 | 20/20 ×2 | see P1 | 4.5-5.4 / 7.8-9.6 |
| **R1** continuity, seats, paint floor | 30/30 ×2 | 30/30 ×2 | blank 0 in every cell | 6-17 / 9-23 |
| **R2** leaving | 8/8 ×2 | 8/8 ×2 | §3.2 | 6-17 / 10-23 |
| **R3** reversal | 1/1 ×2 (window OB) | 1/1 ×2 | — | 13-17 / 9-23 |
| **R4** ST, five timings | 5/5 ×2 | 5/5 ×2 | no leap | 5-14 / 9-21 |
| **R5** hit sampler | 4/4 ×2 | 4/4 ×2 | warm-expand: 0/229 painted centres miss their seat; leaving seats taking no press 14 / 103 (Q-17, recorded) | 6.2-9.4 / 9.4-18 |
| **R6** splice | 33/33 ×2 | 32/33 / 32/33, NOT-REPRODUCED | §3.3 | 6-17 / 9-23 |
| **R7** lanes | 33/33 ×2 | 33/33 ×2 (faces run `lead-remove` NOT-REPRODUCED) | §3.3 | 6-17 / 9-23 |
| **R8** neighbour + ST nb | **7/7 ×2** | **5/7 ×2, reproduced** | §3.1 | 5-14 / 9-21 |
| **B1** `retarget·context` | **0/1 ×2, reproduced** | 1/1 ×2 | §3.4 | 6-14 / 11-22 |
| **B2** filmstrips, splice | FM 6/6 ×2 | FM 6/6 ×2 | glyph stubs remain in early `swap-long` tiles (§3.3) | 4.6-7.3 / 9.1-18 |
| **B3** count, prose by fact | PR `count` 7/0, `rows` 32/0 | — | `readers` red on `--dock-clock` (N5) | 4.6 |
| **N5** floor v3 N-6..N-8 | `count` PASS, `readers` 1 red, W2 `long-run-v` 0/1 ×2 | W2 0/1 ×2 | the readers red is the flow clock's own property. W2 is the shared defect | 4.6-7.6 / 10.7 |
| **C1-C7** | 14/14 ×2 | 14/14 ×2 | §4 | 4.4-8.6 / 9.3-18 |
| **L1** | 6/6 | 6/6 | §4 | 6.1-7.2 / 8-18 |
| **CASES** | 6/6 (`case·rotated·control` 0.53 px against 0.5 at load 6.5; re-runs 0.38 and 0.01: NOT-REPRODUCED) | 6/6 (`case·rotated` jerk 11.4 against control + 1 at load 18.3; re-runs PASS: NOT-REPRODUCED) | `case·consumer-margin`: the unlayered 20 px margin survives (plate past the neighbour at most −32 px) | 6.3-7.1 / 18 |

## 7. Harness notes

- **H4-5.** `retarget·context` should hold the awaited promise in the page, for example `window.__hpHeld = p` before `await p`, or return a handle. As it stands, the cell measures V8's GC slot after the evaluate returns, not the page. Floor v3 fails it too with one forced `gc()` (§3.4). It cannot be changed from here: the harness is not this seat's.
- **W7 at DPR 1.** The inward-normal walk steps 0.5 px along a 45° diagonal and can pass between the two pixels of a 1 px anti-aliased stroke. On the G frame, the four diagonal bins read 2/255 while the pixels beside them read 7-9/255. In Chromium the door's rounded clip and the cap's own border share their outer edge, which halves that stroke's coverage. In WebKit the same cell reads 2/255 and passes. Both readings sit at the floor.
- **PR `readers`** counts a keyframe key (`"--dock-clock"`) as a declaration. A property written only to keep an animation on the main thread has no reader by design.
- **W3 `--no-faces`.** The runner (B′'s) skips the pixel pass in the main stage. The faces stages here are what makes F5 and the strip cells measured.

## 8. History

| build | change | W3 Chromium (no faces) |
|---|---|---|
| g0 | pass-3 G rebased on floor v3 | 16/33 |
| g1-g8 | jump keyframes, numeric simplification, window-aware sliver hides, interval room, ghost inner side | rising |
| g9 | the exchange floor (full rung), then 0.75; LAND_STEPS 4 → 2 | 18/33 (11 UM, 3 OB, 1 FAIL: `retarget·context`) |
| g10-g11 | R5 (face door takes no presses), C5 focus fallback, the lattice tests (box-sizing back to one owner) | 18/33 |
| r8-main / r8-watch / r8-hold | the R8 variants on g10 (§3.1) | — |
| g12 | the flow clock: one merged animation per element, `followStall` | R8 Chromium 7/7 |
| g13 | cost: `doorShape` once per play, `handOffSizes` skips the carrier | ×4/N=40 dtMax 118.7 → 87.8 ms by g |
| g14 | `steps(1, end)` first segment; consumer-margin base | ST 10/10, CASES 6/6 |
| g15 | the flip run deferred one microtask (H4-5 test, reverted) | `cell` pass, `cell-micro` fail |
| g16 | caps as full end shapes; rims on the plate at rest | W7 2/20 → 19/20 |
| **g** | g16 + the §1.6 clean-up (behaviour unchanged) | §6 |

## 9. Open gaps

1. **R8 in Playwright WebKit**, 5/7 in both themes, reproduced. `stall·nb·2raf` and `stall·nb·mid-flight`: the neighbour steps 259-379 px in one frame after a block. No in-family mechanism held it (§3.1). A per-frame main-thread driver is outside G's lattice.
2. **`retarget·context` in Chromium** (H4-5): a harness/V8 GC slot (§3.4). It closes when the witness holds its promise. G cannot close it from the page.
3. **W7 `side·light·dpr1`** in Chromium: 1/255 at the 45° bins of a 1 px arc, where the door's clip and the cap's border share their outer edge (§7).
4. **Glyph stubs** in early `swap-long` tiles, both engines (B2 gestalt, §3.3).
5. **Intermittent WebKit slivers**: `swap-short` and `warm-collapse`, 1-2 frames in 3 first runs, 0 in 6 re-runs.
6. **Boot graph**: 508 427 B against 503 808 B (+24 501 B over floor v3).
7. **Cost**: ×4/N=40 expand 87.8 ms with 8 frames over 25 ms, against fv3's 15.8 ms with 0. WebKit ×1/N=40: 2 frames over 25 ms.
8. **PR `readers`** on `--dock-clock` (the mechanism's own write).
9. **W2 `route1·long-run-v`**: the shared floor-v3 witness defect.
10. **Real Safari**: UNMEASURED (owner's safaridriver checkbox).
11. **Owner-blocked**, no ruling on Q-4, Q-12, Q-15, Q-16 or Q-17: the W1 `card·*` and W3 window cells (O-64 R-4) are OB on the window only. The R5 leaving-seat presses are recorded (Q-17).
