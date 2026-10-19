# D2-G critique, pass 5: the sliding aperture on floor v4

| | |
|---|---|
| Seat | D2 pass 5, route D2-G (the sliding aperture), CRITIC. I authored nothing in D2 |
| Model | `claude-opus-5-5`, asserted from own system identity |
| Tree | checkout HEAD `fddd5eeee` + `pass-5/floor-v4.patch` (sha256 `a5f71e00a8f8b0f0…`, matches FLOOR-V4) + `pass-5/D2-G-proto.patch` (sha256 `8abc0ec231a3241c…`, matches the prototype's header). Both applied clean in `.claude/worktrees/bl/D2/p5/G-crit/wt`; `git apply -R --check` of the route patch clean after the builds (`apply.log`). The prototype measured at `ed39cbf5f`; the tracked tree under `src demo tests docs/design` is unchanged since. Worktree removed at close |
| Builds | `g` (the route) and `fv3` (L1's reference: HEAD + `pass-4/floor-v3.patch`), by `harness/build.mjs`, output inside the worktree, `node_modules` a directory of per-package links so the vite caches were the worktree's (`build-g.log`, `build-fv3.log`, exit 0) |
| Harness | H5 as landed (`pass-5/H5.md`, `harness/HARNESS.md` §10), unchanged. Adapter `pass-3/adapter-G-p3.mjs`, unshimmed; adapter law L-1..L-6 hold (`battery/g-extra-adapter-law.log`) |
| Runner | `harness/battery.sh` through the prototype's `battery-part.sh`, so stage names, witness sets and the re-run rule (`reds.mjs`, controls kept) are the prototype's and the B′ critic's. Chromium in eight guarded groups; Playwright WebKit in two `--exclusive webkit` slots (light, dark) (`chain.sh`). Digest `cells.mjs`: the prototype's, with only its source paths changed (verdict rule and 38-row map of FV4-cells.mjs) |
| Engines | headless Chromium (Playwright's default headless shell, no GPU launch args) and **Playwright WebKit**, unshimmed. Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)** |
| Load | 1-minute load 7.94-28.29 across every battery cell and re-run (`battery/rows-g.md`, per row and theme); F7 24.7-27.2; PR 23.6. WebKit lock waits: 19.5 min (light), 0 min (dark) (`battery/chain.log`). Every red cell was re-run twice in its slot |
| Owner rulings | none on Q-4, Q-12, Q-15, Q-16, Q-17 or Q-18 (`audit/INBOUND.md` through O-98; `FORMATION-PROGRESS.md` read 2026-10-19 06:10). Defaults: Q-4 lenient → OWNER-BLOCKED, Q-12 lerp → OWNER-BLOCKED, Q-18 (a). Q-15 unruled, so G's seats ran |
| Kernel zone | `data.kalloc.1024` (from `zprint`) 10.60M at 04:39, 11.00M at ~05:05, 11.55M at 05:30, 11.92M at 06:06. Under the 13M line for every run; no refusal |
| Records | `pass-5/D2-G-crit-records/`: `battery/` (every stage log with its load, re-runs, `json/g-{chromium,webkit}/`, `chain.log`, `cells-g.json`, `rows-g.md`, `table-g.md`, `counts-g.md`), `F7-g/`, `PR-g/`, `filmstrips/`, `facility/`, `l1/`, `probes/` (my two diagnosis arms, §3), the scripts |

## 0 · In brief

**Verdict: ADVANCE on the count, and G BANKS at pass-5 close by its own trigger (§P4-4 (i)). 29 of 38 (76 %); first 36: 29/36 (81 %); first 24: 20/24 (83 %).** Not CONVERGED: 9 rows open, 1 owner-blocked. The prototype's 30/38 does not reproduce: B2 is red on the gated FM check in my replay (3 cells, each red in a re-run) and on my gestalt read.

| row | status | why (my replay) |
|---|---|---|
| P1 | OWNER-BLOCKED (Q-12) | W1 card cells, 12 OB, 0 red, every column. W7 20/20 everywhere |
| P3 | FAIL | Playwright WebKit only: `swap-short` splice/stub (light and dark), `retarget·120` vanish (dark). Chromium reads OB only (Q-4 windows) |
| N5 | FAIL | PR `prose·readers`: `--dock-clock` has no reader. W2 `long-run-v` passes ×4 |
| R2 | FAIL | Playwright WebKit dark `retarget·120`: seat 1 ink 1 → 0.393 in one frame (0.607 against 0.5), main and re-run 2 |
| R6 | FAIL | Playwright WebKit: the `swap-short` sliver reproduces (3 px and 4.98 px of a 40 px unit), and cut glyphs paint at opacity 1 |
| R8 | FAIL | Playwright WebKit: all five `stall·nb·*` cells "not measured: the video shows no block-end marker", ×3 runs × 2 themes. Unread under H5, and my diagnosis read finds the 379.84 px neighbour leap (§3.1) |
| B2 | FAIL | gated FM stub red in Playwright WebKit (light `swap-short`; dark `swap-short`, `warm-collapse`), and my gestalt read fails Chromium too (§4) |
| C8 | FAIL (the floor's class) | 0 of 8 mid-morph presses collapse, ×4 columns, re-runs F, F |
| C9 | FAIL (the floor's class) | expanded block 60 px against 52 at 844 × 390 coarse, ×4, re-runs F, F |

**The arm set beside the score**, run on `g` in Chromium and Playwright WebKit, light and dark: main (W3 with faces, ST, R5, CF, L1, FM, W2, CASES), rest (W1, W4, W5, W6, W7, W8, R6), dark (ST, FM, W1, W3, W2, R5, CF), darkrest (W4-W8, R6); extra (PR, adapter law); F7. CF carries `crit-corner` (`c1·shape·*` `ownshape`, `corner`), `crit-prm` (`c2·prm` `content`, `flag`), C8 and C9. This is the H5 set, the same set the B′ critic ran (`D2-Bp-critique.md` §0), with the same ST tool. Mine adds two diagnosis arms outside the battery (`probes/`, §3); neither enters a row.

**The BANK trigger (§P4-4).** (i) holds: R8 is not green in Playwright WebKit under H5. It is unread by the instrument on G's page only (§3.1), and when I read the same casts with the markers where the video paints them, the neighbour leaps 379.84 px in one frame at `2raf` in both themes, the class pass 4 recorded. (ii) is unmet (Q-15 unruled). **G banks at pass-5 close.**

## 1 · What this seat ran

| step | record | result |
|---|---|---|
| apply, both patches, sha256 checked | `apply.log` | clean; tree restored to `g` after the `fv3` build (0 extra modified files) |
| F7 (H5-10): lib, demo, `vue-tsc`, vitest `--maxWorkers=2`, every gate | `F7-g.log`, `F7-g/` | **13/13**. Units 231 files, 2,235 tests, 0 failing; typecheck exit 0; builds exit 0; `gate:boot-graph` 14/14, build arm 3/3. I re-measured the eager graph from the built `dist-demo/index.html` with the gate's own rule (entry + modulepreloads): **62 preloads + 1 entry, 503,710 B**, against the 503,808 B ceiling: 98 B under, reproduced to the byte |
| PR (H5-8) | `PR-g.log` | 4/5: readers FAIL (`--dock-clock`), count (7), partials (0 wrong), citations (0), rows (32) |
| battery, Chromium light + dark | `battery/g-*-chromium*.log` | every row passes or reads OB except C8, C9 |
| battery, Playwright WebKit light + dark | `battery/g-*-webkit*.log` | reds in P3, R2, R6, R8, B2, C8, C9 (§2) |
| digest | `battery/table-g.md`, `rows-g.md`, `counts-g.md` | 1,308 cells (fv4 + g; 654 on g); 2 g cells NOT-REPRODUCED (WebKit light `retarget·120`, `compact·non-first-current`); `g` crash-free in both engines (F6 162/162 light, 150/150 dark, each engine) |
| diagnosis: ST marker read, page overflow | `probes/markers.mjs`, `nbread.mjs`, `overflow.mjs` and their logs | §3 |
| cost | not re-run | not a row; the prototype's cost row stands as its own record |

## 2 · The checklist (REGISTRY §P4-7.5, fixed, 38 rows)

C = Chromium, W = Playwright WebKit. "n/n" is passing cells over cells read, from `rows-g.md`. Every row was read in all four columns unless it is source-only.

| # | verdict | C light | C dark | W light | W dark | note |
|---|---|---|---|---|---|---|
| P1 | **OWNER-BLOCKED** | OB 42/42 (OB 3) | OB 42/42 (OB 3) | OB 42/42 (OB 3) | OB 42/42 (OB 3) | Q-12 card cells; worst Chromium card corner 0.093-0.12 px. W7 `side·light·dpr1` (pass 4's G red) passes ×4 |
| P2 | PASS | 8/8 | 8/8 | 8/8 | 8/8 | |
| P3 | **FAIL** | OB (OB 4) | OB (OB 3) | 40/42 | 39/42 | W light: `swap-short` [splice] (re-runs F, F), `reversal` [window, stub]; W dark: `swap-short` [stub], `retarget·120` [vanish, stub], `reversal` [window, stub]. The `reversal` stub did not reproduce (both re-runs read the window OB only); the cell stays FAIL under the digest's rule because an OB re-run is not a PASS (§6) |
| P4 | PASS | 13/13 | 13/13 | 13/13 (NR 1) | 13/13 | W light `compact·non-first-current` ×1.19 (0.91 px against 0.76) at load 9.4, both re-runs PASS: NOT-REPRODUCED |
| P5 | PASS | 8/8 | 8/8 | 8/8 | 8/8 | |
| F1 | PASS | 17/17 | 17/17 | 17/17 | 17/17 | |
| F2 | PASS | 6/6 | 6/6 | 6/6 | 6/6 | |
| F3 | PASS | 4/4 | 4/4 | 4/4 | 4/4 | |
| F4 | PASS | 8/8 | 8/8 | 8/8 (NR 1) | 8/8 | as P4 |
| F5 | PASS | 1/1 | 1/1 | 1/1 | 1/1 | `first-expand` faces read in main (H5-9) |
| F6 | PASS | 162/162 | 150/150 | 162/162 | 150/150 | 0 crashes, 0 page closes |
| F7 | PASS | source 13/13 | | | | §1 |
| N1 | PASS | 2/2 | 2/2 | 2/2 | 2/2 | |
| N2 | PASS | 1/1 | 1/1 | 1/1 | 1/1 | |
| N3 | PASS | 3/3 | 3/3 | 3/3 | 3/3 | the floor's `seat-transition` borderline did not appear |
| N4 | PASS | 20/20 | 20/20 | 20/20 | 20/20 | |
| N5 | **FAIL** | 1/1 | 1/1 | 1/1 | 1/1 | source: PR `prose·readers` red on `--dock-clock` (load 23.6). N-9 held: the route's own copies are struck (the four N-9 markers are not added by the route patch); N-10 held (PR `partials`) |
| R1 | PASS | 32/32 | 30/30 | 32/32 | 30/30 | floor v4's two cure-1 regressions do not occur on `g`: `case·capped·morph` 0 error events, `wide·warm-collapse` faces within bound |
| R2 | **FAIL** | 33/33 | 33/33 | 33/33 (NR 1) | 32/33 | W dark `retarget·120`: "worst one-frame drop beyond the closing edge 0.607 (seat 1 1 → 0.393 at +27 ms)" (re-run 2, load 10.8); re-run 1 reads 0.5 on the line (1 → 0.5 at +17 ms) |
| R3 | PASS | 1/1 | 1/1 | 1/1 | 1/1 | |
| R4 | PASS | 5/5 | 5/5 | 5/5 | 5/5 | W light: the glass travels 362.5-378.9 px inside the block at `2raf`, `100ms`, `mid-flight`, and 0.54-0.55 px at `same-task`, `1raf`; worst steps 139.3-178.4 px under their bounds |
| R5 | PASS | 4/4 | 4/4 | 4/4 | 4/4 | |
| R6 | **FAIL** | 39/39 | 39/39 | 36/39 | 34/39 | W light `swap-short`: "1 sliver frame (first at 51 ms: unit s7 paints 3 px of a 40 px box)" (re-run 1, load 13.0) and 4.98 px at 50 ms (main, load 9.96); FM `swap-short` stubs in main and both re-runs ("u" painted 75 % at **opacity 1**, cut at 800.2 px). W dark: FM `warm-collapse` ("3" 80 % at opacity 1), FM and W3 `swap-short`, `retarget·120` stubs ("L" 86 % at opacity 1) |
| R7 | PASS | 35/35 | 33/33 | 35/35 | 33/33 | |
| R8 | **FAIL** | 9/9 | 7/7 | 4/9 | 2/7 | C: `stall·nb·*` plate at worst −17.72 to −18.75 px over the neighbour's box, neighbour steps 113.7-147.6 px (×0.59-0.77), load 16-18. W: every `stall·nb·*` "not measured: the video shows no block-end marker" in main and both re-runs, light (load 10.8-12.7) and dark. §3.1 |
| B1 | PASS | 1/1 | 1/1 | 1/1 | 1/1 | `retarget·context` held (H5-2); the arm set is H5's (§0) |
| B2 | **FAIL** | FM 6/6 | FM 6/6 | FM 5/6 | FM 4/6 | gated: W `swap-short` light; W `swap-short` and `warm-collapse` dark, each red in a re-run. Gestalt: §4 |
| B3 | PASS | source 4/4 | | | | `DockProps` 7; the four pass-4 facts corrected (G-proto §2.3, read in source) |
| C1 | PASS | 1/1 | 1/1 | 1/1 | 1/1 | collapsed 102 × 56 stadium, Home + "•••", no square backdrop: `facility/chromium-light/chromium-c1-h-collapsed.png`, `…-corner-noshadow.png`. Pass 4's square tile is gone |
| C2 | PASS | 3/3 | 3/3 | 3/3 | 3/3 | `c2·prm` under Q-18 (a): extent, seats and flag in 0 frames |
| C3 | PASS | 4/4 | 4/4 | 4/4 | 4/4 | |
| C4 | PASS | 1/1 | 1/1 | 1/1 | 1/1 | |
| C5 | PASS | 1/1 | 1/1 | 1/1 | 1/1 | |
| C6 | PASS | 1/1 | 1/1 | 1/1 | 1/1 | |
| C7 | PASS | 4/4 | 4/4 | 4/4 | 4/4 | the floor's `c2·morph·v` red is cured on `g` |
| C8 | **FAIL** | 0/1 | 0/1 | 0/1 | 0/1 | "16 attempt(s), 8 press(es) landed mid-morph; 0/8 collapsed within 1500 ms of the morph settling" (C light load 16.8, re-runs 17.8, 24.8). The floor's chart gate (FLOOR-V4 §5) |
| C9 | **FAIL** | 0/1 | 0/1 | 0/1 | 0/1 | "expanded block size 60 px (bound 52)", 4 seats, smallest 44 px |
| L1 | PASS | 6/6 (both themes in one cell) | | 6/6 | | shadow 1 / 3 / 4 (ref 1 / 4 / 4), gradients 8, pseudo 8, blur 16 px, 0 idle infinite animations. Frames: §4 |

**Counts:** PASS = P2, P4, P5, F1-F7, N1-N4, R1, R3, R4, R5, R7, B1, B3, C1-C7, L1 = **29/38**; first 36 **29/36**; first 24 **20/24** (open there: P1, P3, R2, B2).

## 3 · Claims checked against the prototype

| prototype claim (D2-G-proto) | my replay | holds? |
|---|---|---|
| 30/38, 21/24 (§1) | 29/38, 20/24: B2 red in WebKit on the gated check, reproduced in re-runs (light `swap-short` main + both re-runs; dark `swap-short` and `warm-collapse` main + re-run 1) | **no** |
| C1 obligation met (§4.2) | yes, ×4, frames read | yes |
| C2 under Q-18 (a) (§4.3) | yes, ×4 | yes |
| P1/N4 W7 `side·light·dpr1` cured (§4.5) | W7 20/20 ×4 | yes |
| P4/F4 `compact·non-first-current` in WebKit (§4.6) | PASS ×4 (one WebKit light red at load 9.4 NOT-REPRODUCED) | yes |
| boot graph 503,710 B, 98 B under (§3.1) | 503,710 B, to the byte | yes |
| R6: the WebKit `swap-short` sliver "not seen in either re-run" (§4.4) | seen in 2 of 3 light runs (main 4.98 px at load 9.96; re-run 1 3 px at load 13.0) | **no** |
| R8: "The floor's WebKit `stall·nb` cells read the same way" (§1, §6.1) | **false.** `grep -c 'shows no'` over the WebKit ST logs: fv4 0 in 6 logs (FV4-records), B′-crit 0 in 2 logs, G (proto) 5 in each of 6, G (mine) 5 in each of 6. Only G's page loses the block-end marker | **no** |
| "The red is an instrument reading, not a measured leap" (§1) | the instrument is blind on G's page, and the leap is there when the casts are read with the markers where they paint (§3.1) | **no** |
| stubs are cut glyphs "painting above 0.5 between frames" (§6.3) | every WebKit stub line in my logs (16 of 16) reads **at opacity 1**, with 14-86 % of the glyph painted: the cut ceiling is not in WebKit's paint on those frames, not only between grid steps | refined |

### 3.1 · R8 in Playwright WebKit: why H5 cannot read G, and what the casts show

**The instrument.** `stall.mjs` places the two black markers at CSS x 1396 and 1418 for the `nb` arm and reads them at fixed video columns (`dark(MX[0] + 3)`, `dark(MX[1] + 4)`, 10 px wide). It assumes the video paints the page at scale ≈ 1.

**On G, Playwright WebKit's video is scaled.** ST's own `video scale` reads 0.981-0.983 on every G cell (`g-main-ST-webkit.log`), against 1.002-1.005 on fv4 and B′ (`FV4-records/battery/fv4-main-ST-webkit.log`, `D2-Bp-crit-records/battery/bp-main-ST-webkit.log`). Every G WebKit filmstrip tile carries the grey band below and right that the scale leaves (`filmstrips/webkit-*/`). `probes/markers.mjs` on `cast-webkit-nb-2raf` (`probes/st-nb-2raf-webkit-frames/`): marker A paints at video x 1368-1384 from frame 79, marker B at 1389-1406 from frame 109. ST's "A" window (1399-1408) therefore sees marker **B**, and its "B" window (1422-1431) sees the grey band (mean 128), so no frame ever shows a block-end marker. The non-`nb` arm's markers sit at x 2-24, where the scale moves them less than a pixel, which is why R4 reads.

**What G does that the floor does not.** `probes/overflow.mjs` (`overflow-{chromium,webkit}.log`, load 9.6-14.8 and 11.2-12.2): in both engines, G's morph scene keeps `div.dock-door`, `div.dock-door-counter`, `div.dock-hit` and, mid-flight, `div.dock-shade` with right edges at x 2,211 (collapsed), 2,401-2,489 (expanded and in flight), and 1,590-1,970 with the neighbour, against a 1440 px viewport. fv3's scene has no box past the viewport. The document's `scrollWidth` stays 1440 in both builds and both engines, so the overflow is clipped for layout, but the boxes exist. I did not isolate why Playwright WebKit's recorder scales on that page; the correlation (only G scales, only G has the off-viewport aperture boxes) is measured, the mechanism is not.

**The diagnosis read** (`probes/nbread.mjs`, the same casts with A at 1370-1382, B at 1391-1404, the video scale 0.982; frame-indexed, so it is not an H5 reading and closes nothing). `nbread-webkit.log`:

| arm | light: neighbour's worst one-frame step after the trigger | dark |
|---|---|---|
| `same-task` | 132.38 px | 145.62 px |
| `1raf` | 142.57 px | 149.69 px |
| `2raf` | **379.84 px** (frame 108 → 110: plate right edge 142.6 → 520.4, neighbour 245.4 → 625.3) | **379.84 px** |
| `100ms` | 164.97 px | 182.28 px |
| `mid-flight` | **216.9 px** | **210.79 px** |

H5's bound on this rung is about 192.3 px (ST's `stepBoundPx` on the Chromium `nb` cells). At `2raf` the plate and the neighbour both hold still through the block and then cover the whole travel in one frame, in both themes. That is pass 4's recorded WebKit red (379.26-379.29 px, ×1.97), not a new class. The flow clock still does not take in Playwright WebKit.

## 4 · The gestalt (B2) and the lighting census (L1), read from frames

Strips: `filmstrips/{chromium,webkit}-{light,dark}/strip-*.png` (FM, 14 tiles at the screencast's 40 ms cadence). I read swap-long, swap-short and first-expand in Chromium light, warm-collapse in Chromium dark, swap-short and content-add in WebKit light, and warm-collapse in WebKit dark.

**What holds against D-1 and D-2.** The glass is one continuous body in every strip I read: no double exposure, no blank dock, no square tile. First expand and warm collapse read well in Chromium: the "P" and "1" exchange as a crossfade in place, and the plate's own edge reveals "Settir", "Sc" as a reveal, not a cut. Content-add is clean in WebKit light: "Brushes and layers" arrives at the plate's edge and nothing else moves.

**What fails.**
- **Chromium light swap-long** (tiles 3-6): "ˎ B Bru", then "ˎ 3 Brushes L" (the leaving "B" cut to a "3"), then "( ˙ Brushes Layers", then "C Too Brushes Layers D". The arriving "Tools" reads "Too" for a tile.
- **Chromium light swap-short** (tiles 2-5): "; Tools", then "; ›ols Brushes Lay", then "; s Brushes", then "A E" (the arriving "B" cut to an "E").
- **Playwright WebKit light swap-short**: "; ıls Brushe" held for two tiles, then "A E" with both glyphs halved. The gated check reads these at opacity 1 (§2 R6).
- **Playwright WebKit dark warm-collapse**: two tiles of "H _ 2 3", seat 1's slot empty while seats 2 and 3 paint at full ink, then "H P 2". The run disassembles out of order. The gated check reads a "3" 80 % painted at opacity 1.

In Chromium the cut glyphs paint at about half ink, and H5-3 passes them because `CUT_OPACITY = 0.5` (`useDockAperture.ts:131`) sits exactly on H5-3's "above 0.5" line. At half ink they still read as other glyphs ("ˎ", "3", "(", ";", "›ols", "E"). §P4-7.3 obligation 7 asks that no frame paint a hard-cut partial glyph, and pass 4 failed B2 because the stub reads as another glyph (§P4-0 finding 2). The B′ critic failed B′'s B2 on the same reading (`D2-Bp-critique.md` §4), so the two routes are judged alike. In Playwright WebKit the ceiling is not even in the paint. **B2 FAIL**, on the gated check in WebKit and on the gestalt in both engines.

**L1 (O-87).** The census matches `fv3` in all 12 cells within the ruling: shadow layers 1 / 3 / 4 (collapsed / expanded / in flight) against 1 / 4 / 4, gradients 8, pseudo-elements 8, blur 16 px, no idle infinite animation (`g-main-L1-*.log`). From `l1/frame-chromium-{light,dark}-{collapsed,expanded,inflight}.png`: one soft drop shadow, a hairline edge, no specular streak, inner bevel or glow layer; in dark, a faint lift around the plate, which is the shadow layer the census counts. Flat and deft, as O-87 asks. **L1 PASS.**

## 5 · The route obligations (§P4-7.3), as my replay reads them

| # | obligation | reading |
|---|---|---|
| 1 | R8 in Playwright WebKit, once under H5, shipped flow clock | measured and unread (§3.1); the diagnosis read is red at `2raf` and `mid-flight` in both themes. **The BANK trigger (i) holds** |
| 2 | C1 stadium in Chromium, lens live | met ×4 |
| 3 | C2 under Q-18 | met ×4 |
| 4 | R6 WebKit `swap-short` sliver | **not met**: 2 of 3 light runs |
| 5 | P1/N4 W7 | met ×4 |
| 6 | P4/F4 WebKit compact | met (one NR) |
| 7 | B2 stub | **not met** (§4) |
| 8 | B3/N5 | facts met; `--dock-clock` keeps N5 red. §P4-7.3 says it goes with the mechanism if R8 in WebKit stays red, and it has |
| 9 | boot graph | met, 98 B under |
| both | C8, C9 | red ×4, the floor's classes |

## 6 · Next-pass defect classes (no row covers them; the score is unchanged)

| class | evidence | note |
|---|---|---|
| **ST's `nb` markers are fixed video columns.** A Playwright WebKit video at scale 0.98 puts marker B where ST reads A, and grey border where it reads B | §3.1; `probes/markers.mjs` | the harness should find the markers in the frame (or scale their columns by the measured video scale) and fail loud when the scale is not ≈ 1. Pass 5's prototype report misattributed this to the floor |
| **G keeps aperture boxes far outside the viewport.** Doors, counters, the hit pair and the shade reach x 2,211-2,489 at a 1440 px viewport, in both engines; only G's WebKit video is scaled | `probes/overflow-*.log` | the off-viewport geometry is G's; whether it is what scales the recorder is not isolated |
| **Constants on the witness's line.** `CUT_OPACITY = 0.5` sits on H5-3's 0.5; R2's WebKit re-run 1 reads 1 → 0.5 exactly on its 0.5 bound | `useDockAperture.ts:131`; `g-dark-W3-webkit-rerun1.log` | same class as the B′ critic's |
| **The cut ceiling is absent from Playwright WebKit's paint.** 16 of 16 WebKit stub lines read at opacity 1, with 14-86 % of the glyph painted | §2 R6 | the prototype's cause (two clocks for `clip-path` and `opacity`) fits and is still unmeasured |
| **Harness ids in shipping source.** `useDockAperture.ts` cites harness rows 34 times (H3-1, H3-3, H3-4, H3-6, H3-7, H4-1, H4-2, H4-3, H4-5, H5-3, H5-4); B′ added 14; HEAD and floor v4 add 0 | `grep -cE '\bH[0-9]-[0-9]+\b'` on the worktree | H5-8 catches `pass-N/*.md` citations only |
| **The run disassembles out of order.** Seat 1 empty for two tiles while seats 2-3 paint (WebKit dark warm-collapse) | §4 | inside B2 here; named so the cure is not only the stub |
| **An OB re-run keeps a FAIL standing.** WebKit `reversal` read [window, stub] in main and OB (window only) in both re-runs; the digest's NR rule wants two PASS re-runs | `g-main-W3-webkit-rerun{1,2}.log` | a stub seen once, under the Q-4 window, cannot become NOT-REPRODUCED. Rows unchanged (P3, R6 red elsewhere) |
| **W3's merged-faces log line prints FAIL at 0 px.** "FAIL W3 (faces merged) first-expand faces 0 px … (bound 1)" in every Chromium W3 log, while the digest reads F5 PASS | `g-main-W3-chromium.log` | the log line, not the JSON; misleads a reader of the logs |
| **CASES `case·rotated` (outside the 38).** Chromium light `jerk` 6.02 px/frame² against a control of 4.45 + 1 (re-run 1 F on another check, re-run 2 P); Playwright WebKit light red in main and both re-runs (main 17.03 against a control of 10.71) | `g-main-CASES-*.log` | as pass 4 and the prototype |

## 7 · Fences, as kept

- Every build and run used the worktree `.claude/worktrees/bl/D2/p5/G-crit/wt` (detached at HEAD, per-package `node_modules` links, build output and vite caches under `wt/.gcrit` and `wt/node_modules/.vite`). It was removed with `git worktree remove --force`, and the empty `G-crit/` with it. `worktree add` and `remove` were my only git writes; the checkout's tracked tree is untouched (`git status --porcelain --untracked-files=no` reads 0).
- Writes to the checkout: this file and `pass-5/D2-G-crit-records/` only.
- Every browser run went through `~/.claude/guard/guarded`, one heavy run at a time, none `--light`; every Playwright WebKit run under `--exclusive webkit`, queued and never cancelled. The harness retires a WebKit browser every 60 page loads (H3-1); no page close or crash occurred (F6). No browser MCP, no headed browser, no real Safari.
- I did not read `~/.claude`. The kernel-zone counts above come from `zprint`. One tool result was saved by the session under `~/.claude/projects/…/tool-results/` when a registry read overflowed; I did not open it and re-read the registry in parts.
- No process of this seat remains.
