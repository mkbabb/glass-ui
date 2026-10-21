# D3 · pass 13 · floor v11, re-measured: the 44 rows on pass 13's own battery, both engines (P12-6.3 step 2)

| field | value |
|---|---|
| seat | D3 pass 13, FLOOR-V11 RE-MEASURE. A clean pass is measured, never carried. This seat re-applies `pass-12/floor-v11.patch` (`8f838dcf`) in its own worktree and re-proves raw identity for floor v11 and floor v11a in one session. It re-runs DEL, the list under `FV11-rulings.json`, LAW, the census, HOV, the ladder `diff` and the toolchain. It then runs the **full battery in headless Chromium and Playwright WebKit** (Chromium first), M-9 `--r32` (H12-1, H13-1) on the spot and the page, R-37's engine-fact check (H13-4), FIELD (H13-3), every plant including the tone plant (H13-2), the light proof in tokens and in pixels, and row 12's dark-signed leg. Every red is re-run twice |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | **(a), HEAD of master at launch.** The worktree was cut at **`8c26bb904`** (the H13 bank, docs only). `git diff --stat 1da7eb17b HEAD -- src demo tests package.json` prints nothing, and so does the wider list (adding `scripts tests-visual vite.targets.ts .bundle-ratchet .published-roster DESIGN.md docs/canon`) (`rec/setup.log`). The tree is the published 10.1.0 source plus `floor-v11.patch`. **`release/10.1.1` and `release/10.1.2` are NOT merged** (P12-6.2 (a)). At close, master is `75df1f166`, moved by four docs-only commits (`git diff --stat 8c26bb904 HEAD -- src demo tests package.json` prints nothing), so the build of record stands |
| rulings read | `audit/INBOUND.md` at start and at close: 61 `O-` rows, the last D3 ruling **O-103b**. O-102b, O-103, O-103a and O-103b stand. No F-1′ decline, no D-1′ answer, no C-2 answer. `FORMATION-PROGRESS.md` at start: the newest line is H13's bank (17:55). At close: the newest lines are D4 pass-7 H7 (20:05), 10.1.2 critic-1 (20:35) and D2 pass-6 floor v5 (21:05). None is a D3 ruling |
| driver | `pass-13/FR13-run.sh`, every phase launched as `~/.claude/guard/guarded … -- bash FR13-run.sh <phase>`. It is FV11-run.sh's static half, BV11-run.sh's battery half and crit-run.sh's thin light-proof capture, re-pointed at pass 13, plus H13's readings. Records are in `pass-13/FR13-records/` (`rec/` below) |
| engines | Chromium 149, Playwright's headless shell with **no launch arguments** for every cell. Only the moving-field windows take `lib.mjs`'s cited `GPU-WITNESS: M-2m` arguments (H6-0, unchanged). **Playwright WebKit 26.5, headless**, with H-14's shim in every context. Playwright is imported through the harness from the checkout's `node_modules/playwright` (symlinked into the worktree). Playwright WebKit is not Safari. **Every real-Safari cell: UNMEASURED (owner's safaridriver checkbox)** |
| fences | No source edit and no git write in the checkout. The worktree `.claude/worktrees/bl/D3/p13/floor11m/wt` was cut at HEAD with `node_modules` symlinked. `D3_OUT`, every vite `cacheDir` and every build output lived inside it. It was removed with `--force` and pruned, and `…/D3/p13/` is gone (`rec/teardown.log`; `git worktree list` names no `floor11m`). The checkout's only writes are `FR13-run.sh`, `FR13-records/` and this file |

Short citations: `REG` = `REGISTRY.md` (P12-n its pass-12 part), `BV11` = `pass-12/BATTERY-V11.md`, `FV11` = `pass-12/FLOOR-V11.md`, `Crit` = `pass-12/D3-critique.md`, `H13` = `pass-13/H13.md`, `rec/x` = `pass-13/FR13-records/x`.

---

## 0 · In brief

- **Floor v11 re-measures 43 of 44 rows PASS on this pass's own battery, and none is open.** The 44th, N-4 (the minor's W-0.1 reading), belongs to P12-6.3 step 3, the minor v10 seat. It launches no floor-v11 cell and is not measured here (§6). **No cell is owed.** Every Playwright WebKit group was its own `--exclusive webkit --timeout 60` admission, and the longest wait was 31 min.
- **Raw identity in one session.** Floor v11 specimen CSS is **391,252 B `4f56c2631ab5cdd4`**, and a second build of floor v11 reads the same. Floor v11a is **391,121 B `347288745da7cf97`**. `floor-v11a.patch` + `FV11-r32.diff` = `floor-v11.patch` (`cmp` exit 0). LIGHTPROOF PASS (tokens). **The light arm is pixel-identical** to floor v11a in both engines: 0 px differ, max channel Δ 0, on every light raw and full cell over paper and aurora (`rec/lightproof-px.log`).
- **Static and toolchain match pass 12.**
  - DEL PASS 101; floor v11a PASS 101 under floor v11's declaration; the HEAD bite FAIL 89/101; an absent root exits 2. The rebuilt declaration is IDENTICAL to FV11's.
  - **The list reads PASS 207 (197 true, 10 reported)**, and its plant on floor v11a FAILs 16 unread and 16 stale, as pass 12.
  - LAW PASS 100. HOV PASS 58. Census `stacked=0 halo=0 blur=0 open=0` (the HEAD bite `2/2/5/9`). LIT the 19 inherited.
  - The ladder `diff` is empty from floor v11a to floor v11 and bites against HEAD.
  - vue-tsc 0/0, library build 0, dist-demo 0 (built before vitest). **vitest 237 files, 2318 passed** with `--maxWorkers=2`. `focus-veil.test.ts` 19/19. Its plant on R-2's bytes fails exactly the arm's two assertions.
- **The battery equals pass 12's, cell for cell, with one changed line, and that line is H13-4's.** `diff BV11 baseline FR13 baseline` prints one row: M-9 Playwright WebKit dark `FAIL 2/10 → PASS 8`. The same capture reads raw = veiled to the bit, so the two dark dims rows print `REPORT (R-37)` and leave the tally. Every other witness tally per engine and theme is BV11's. That includes the reds, which reproduce to the value: M-2h 2/68, M-6 29/120, M-3 Playwright WebKit light checker 2/177 and M-8 Playwright WebKit dark stripes 1/4.
- **R-32 (M-9 `--r32`): Chromium `PASS (24 gated rows)`, Playwright WebKit `PASS (20)` with 4 legs REPORTED, both engines gated `PASS (44)`.** Chromium reads the spot `#ec9642 → #cc740c` (|Δh| 1.4°, C ×1.037, ΔL −0.105) and the page `#0b0a09 → #060504` (ΔL −0.029). These are BV11's values to the hex.
- **R-37's engine fact holds in every capture of floor v11:** spot 2400/2400 px and page 2400/2400 px raw = veiled. The line reads `REPORT (O-103b): "WebKit headless paints no backdrop-filter; raw = veiled 4/4"`. That held in the battery, the thin capture, both re-runs and the tone-plant capture. **The guard also bit on live paint.** On `plant-R2`'s capture, where the plant's background dim makes Playwright WebKit paint the veil (`#0b0a09 → #0d0c0a`), the line reads `0/2400 … → GATE`, and the reds count: `FAIL (3 of 14)`.
- **The tone plant reds (H13-2, R-38):** `plant-R32-notone` reads `FAIL (4 of 14)` in Chromium. It reds on the FV3 table run and on both re-runs. The spot reads `#ec9642 → #ff9012` (ΔL +0.010, (iii) ✗), and **the page reads `#0b0a09 → #0b0a08` ΔL −0.000, (iii) ✗**, so R-38's rounding sees it. Playwright WebKit reads `PASS (10)` with R-37 REPORT 4/4. **`plant-R2`'s margin is 0.003**: the dark page reads ΔL −0.017 against −0.02, still `FAIL (1 of 10)`. Every carried plant verdict equals BV11's line for line.
- **FIELD (R-39, reported, never gated).** The Chromium aurora field (35,616 px) reads C× p05 1.031, p50 1.044, |Δh| p95 1.7°, every pixel dims, and 0 % past (i)-(iii). That reproduces Crit §2.2 (1.030, 1.043). The multi-hue cell (violet, blue, teal) reads C× p50 1.055-1.180 per band with p05 0.806-0.925, |Δh| p50 0.9-4.3°, and ΔL p50 −0.046 to −0.071, with every pixel dimmed (§4). Playwright WebKit reads 0 px: no veiled field in that engine.
- **Every red was re-run twice with the same values**, at loads from 11.0 to 31.1. Pass 12 read the same reds at 4-41. **No red is load-borne. None is NOT-REPRODUCED, and none is new.**

---

## 1 · Runs, admissions and loads (`rec/phases.log`, `rec/wk-admission.log`)

| run | guard | when | load (1-, 5-, 15-min) |
|---|---|---|---|
| setup | `--light` | 17:47:34 → 17:47:56 | 17.4 → 15.5 |
| declare, static, sweep | `--light` | 17:47:5x → 17:48:21 | 15.9 → 13.8 |
| same (fv11 + demo, fv11a, fv11 again; LIGHTPROOF) | heavy `--timeout 30` | 17:51:26 → 17:51:32 | 10.9 |
| toolchain | heavy `--timeout 45` | 17:53:52 → 17:56:00 | 16.8 → 20.4 |
| unit plant | `--light` | 17:56:08 → 17:56:12 | 18.5 |
| **Chromium battery** (`battery-cr`) | heavy `--timeout 60` | queued about 17:56 behind the guard's headroom gate (`waiting for headroom (load 44 > 36)`), **admitted 18:16:58**, ended 18:35:29 | 31.8 at admission. The capture took 70 cells, 4 live, 4 motion and 2 drift windows in 881.8 s (load 36.5 at its end); 30.8 at the end |
| **Playwright WebKit battery** (`wk-battery`) | `--exclusive webkit --timeout 60` | queued 18:35:43 (28.2), **admitted 19:02:59** (24.0; 27 min), ended 19:23:13 | the capture took 70 cells, 4 live, 4 motion and 2 drift windows in 920.1 s (load 34.7), **retired and relaunched once at 60 page loads** (H3-1); 27.5 at the end |
| witnesses, baseline, diffs; readings | `--light` | 19:23:35 → 19:30:50 | 26.5 → 26.1 |
| thin capture + veil-hues, Chromium (`thin-cr`) | heavy `--timeout 60` | 19:31:28 → 19:32:29 | 23.7 → 21.9 |
| FIELD | `--light` | 19:32:44 → 19:32:45 | 20.6 |
| plants, Chromium (`plants-cr`) | heavy | 19:32:34 → 19:51:25 | 21.5 → 18.5 |
| R-12 demo probes, Chromium (`demo-cr`) | heavy | 19:51:31 → 19:52:29 | 17.6 → 15.1 |
| tone plant ×2, Chromium (`plant-notone`) | heavy | 19:52:34 → 19:53:04 | 14.8 → 23.1 |
| Chromium re-runs ×2 (`rerun-cr`) | heavy | 19:53:10 → 19:59:07 | 24.3 → 11.0 |
| thin capture, Playwright WebKit (`thin-wk`) | `--exclusive webkit --timeout 60` | queued 19:59:32 (11.9), **admitted 20:30:48** (17.4; **31 min**), ended 20:31:47 | 16.4 |
| plants, Playwright WebKit (`plants-wk`) | `--exclusive webkit --timeout 60` | queued 20:31:51 (16.4), **admitted 20:35:32** (18.6; 4 min), ended 20:53:57 | 12.9 |
| Playwright WebKit re-runs ×2 (`rerun-wk`) | `--exclusive webkit --timeout 60` | queued 20:54:02 (13.2), **admitted 21:04:23** (29.0; 10 min), ended 21:09:50 | 30.0 at run 1's read, 31.1 at run 2's |
| light proof in pixels, plant reads | `--light` | 21:10 → 21:11:26, after the last WebKit group ended | 37.7 → 35.5 |
| teardown | `--light` | 21:12:00 → 21:12:19 | 33.1 → 32.0 |

**Every cell was admitted within 90 min, so no cell is owed.** The no-browser phases that read WebKit captures (light proof, plant reads) ran only after the seat's last WebKit group ended (P12-5's driver line). No `guarded` refusal fired, on the kernel zone count or otherwise. The headroom gate held the Chromium battery for about 21 min and then admitted it.

---

## 2 · Builds, static half and toolchain (`rec/setup.log`, `same.log`, `static.log`, `sweep.log`, `toolchain.log`, `plant.log`)

| check | reading | pass 12 |
|---|---|---|
| `git apply --check` at `8c26bb904` | `floor-v11a.patch` exit 0 (`08c13d4e`, 88 files); `floor-v11.patch` exit 0 (`8f838dcf`, 89 files) | same |
| composition | floor v11a + `FV11-r32.diff` = `floor-v11.patch`, `cmp` exit 0 | same |
| floor v11 specimen CSS | `index-BjnyK9vg.css` **391,252 B `4f56c2631ab5cdd4`**, rebuilt `4f56c2631ab5cdd4` | `4f56c2631ab5cdd4` |
| floor v11a specimen CSS | `index-DyuSrJvX.css` **391,121 B `347288745da7cf97`** | `347288745da7cf97` |
| determinism | dist fv11 vs fv11 rebuilt: CSS equal. The one JS difference is the build label in `//#region …/builds/fv11/app/…` comments (`fv11` vs `fv11b`; pass 12 built both under one label, `same`) | — |
| LIGHTPROOF (tokens) | `PASS: 5 differing declarations, 0 outside the dark arm, the chain and the light tone; light chain and background identical after resolution` | same |
| light proof (pixels) | Chromium and Playwright WebKit: light paper and aurora, raw and full, floor v11a vs floor v11, **0 px differ, max channel Δ 0** on all 8 cells (`crit-offspot.mjs` over the thin captures) | Crit §1, same |
| declaration | rebuilt from `floor-v11.patch`: IDENTICAL to `FV11-records/declare-floor-v11.json` | — |
| DEL | fv11 PASS 101; fv11a under fv11's declaration PASS 101; HEAD bite FAIL 89/101; absent root exit 2 | same |
| the list (R-21 (b), R-34) | **PASS (207 lines: 197 ruled true, 10 reported)**; plant (floor v11a) FAIL 16 unread, 16 stale | same |
| LAW | PASS (100 gated rows). H13 read 99; the 100th is this seat's `FR13-run.sh` in LAW's `pass-13/` root, and it passes | 91 (pass 12's roots) |
| HOV · LIT · census | PASS 58 · `halo=5 near=1 stacked=10 chain=3 open=19` (the 19 inherited) · `0 0 0 0` (fv11, fv11a); HEAD `2 2 5 9` | same |
| ladder | `diff radii-fv11a radii-fv11` empty; against HEAD the five radii move (10/14/16/20/22 → 6/10/12/18/20 px) | same |
| toolchain | vue-tsc app 0, library build 0, vue-tsc tests 0, dist-demo 0, **vitest 237 files, 2318 passed, 10 expected fail, 1 skipped**, `focus-veil.test.ts` 19/19 | same |
| unit plant | floor v11's `focus-veil.test.ts` on floor v11a: 2 failed, 17 passed, exactly the two arm assertions | same |

---

## 3 · R-32, R-37 and row 12, per engine (`rec/M-9-r32-{chromium,webkit,both}.log`, `rec/readings.log`)

`m9-state-registers.mjs <battery capture> --gate <engine> --r32`:

| engine | cell | raw → veiled (hex) | raw (L, C, h) | veiled (L, C, h) | (i) \|Δh\| ≤ 3° | (ii) C_v/C_r ≥ 0.95 | (iii) ΔL < 0 at 3 decimals (R-38) | verdict |
|---|---|---|---|---|---:|---:|---|---|
| **Chromium** (gate) | the spot, `dark aurora state` | `#ec9642 → #cc740c` | 0.748, 0.142, 61.8° | 0.643, 0.147, 60.3° | **1.4° PASS** | **1.037 PASS** | **−0.105 PASS** | **`PASS (24 gated rows)`** |
| Chromium | the page, `dark paper state` | `#0b0a09 → #060504` | 0.146, 0.003, 68.6° | 0.116, 0.004, 70.6° | — | — | **−0.029 PASS** | |
| **Playwright WebKit** | the spot | `#e87237 → #e87237` | 0.682, 0.163, 44.6° | the same | 0.0° PASS | 1.000 PASS | 0.000 · **REPORT (R-37)** | **`PASS (20 gated rows)`**, 4 legs reported |
| Playwright WebKit | the page | `#0b0a09 → #0b0a09` | 0.146, 0.003, 68.6° | the same | — | — | 0.000 · **REPORT (R-37)** | |
| both gated | — | — | — | — | — | — | — | **`PASS (44 gated rows)`** |
| real Safari | — | — | — | — | — | — | — | **UNMEASURED (owner's safaridriver checkbox)** |

**R-37's guard reading, in every capture this seat took of floor v11:**

| capture | Playwright WebKit spot | page | line |
|---|---|---|---|
| the battery (`M-9-r32-webkit.log`) | 2400/2400 px raw = veiled | 2400/2400 | `REPORT (O-103b): "WebKit headless paints no backdrop-filter; raw = veiled 4/4" (Chromium gates the arm)` |
| thin, floor v11 (`thin-M-9-r32-fv11-webkit.log`) | — | — | `PASS (20)` |
| re-run 1 and 2 (`rerun-webkit{1,2}-m9-r32.log`, load 30.0 and 31.1) | 2400/2400 | 2400/2400 | REPORT 4/4, both |
| `plant-R32-notone` (`plants/plant-R32-notone-M-9-r32-webkit.log`) | 2400/2400 | 2400/2400 | REPORT 4/4 (the plant is a no-op in an engine that paints no chain) |
| **`plant-R2`** (`plants/plant-R2-M-9-r32-webkit.log`) | **0/2400** (2400 px veiled ≠ raw) | **0/2400** | **`GATE: the engine fact does not hold in this capture, so every dark-veil leg is gated and a red counts`** → `FAIL (3 of 14)`: the page dims row `#0b0a09 → #0d0c0a ΔL +0.009 brightens ✗`, (ii) 0.916 ✗, page (iii) 0.009 ✗ |

So the guard reports only where the engine paints nothing, and it gates the first time Playwright WebKit paints a veil. Here that veil is `plant-R2`'s background dim, a real capture and not a laid-out one. That is the critic's planned plant (P12-6.3 step 4), seen in live paint. It reads as H13's self-test predicted (`FAIL (3 of 14)`).

**Row 12's dark-signed leg.** Chromium M-9: `PASS (20 gated rows)`. The dark page dims −0.029 and the spot −0.105, both ≤ −0.02. The light page reads `#fbfaf8 → #e4e3df` and the light spot `#ec9642 → #e88412`, unchanged. Playwright WebKit M-9 reads `PASS (18 gated rows)` with the two dark dims rows `REPORT (R-37)`. BV11 printed that same reading as `FAIL 2/10`. It is the same pixels in H13-4's form, and the one line the baseline `diff` prints (§5).

**The R-2 side in the same session** (floor v11a, the thin capture; `thin-M-9-r32-fv11a-*.log`): Chromium `FAIL (1 of 24)`, Playwright WebKit `FAIL (1 of 24)`. Each is (ii), as in BV11 §2, so the instrument still separates the two arms on fresh pixels.

---

## 4 · FIELD, the veiled field per pixel (H13-3, R-39: REPORTED, never gated; `rec/field-{chromium,webkit}.log`)

`field-reader.mjs <battery capture> --engines <e> --hues <veil-hues capture>`. The multi-hue cell is variant `veil-hues` on the dark paper state cell. It was captured in Chromium in its own directory, in `thin-cr`'s admission (`rec/hues-chromium-capture.log`), so no battery witness read it.

| engine | field | px | C_v/C_r p05 · p50 · p95 | \|Δh\| p50 · p95 | ΔL p05 · p50 · p95 | share past (i) · (ii) · (iii) |
|---|---|---:|---|---|---|---|
| Chromium | the aurora field (mask: the page's own dim, specs and probe dilated 48 px; bbox 760,90 → 1039,309) | 35,616 | **1.031 · 1.044 · 1.058** | 0.5° · 1.7° | −0.106 · −0.079 · −0.057 | 0.0 % · 0.0 % · 0.0 % |
| | raw hue 30-60° | 16,694 | C× p50 1.038 (p05 1.029) | 0.7° · 1.9° | p50 −0.074 | — |
| | raw hue 60-90° | 18,922 | C× p50 1.050 (p05 1.039) | 0.4° · 1.2° | p50 −0.082 | — |
| Chromium | **the multi-hue cell** (violet, blue, teal) | 35,616 | 0.897 · 1.112 · 1.240 | 2.7° · 27.6° | −0.078 · −0.054 · −0.034 | 44.7 % · 9.2 % · 0.0 % |
| | teal, raw hue 180-210° | 13,916 | C× p50 1.055 (p05 0.910) | 3.7° · 36.5° | p50 −0.071 | — |
| | blue, 240-270° | 13,828 | C× p50 1.180 (p05 0.925) | 0.9° · 9.9° | p50 −0.047 | — |
| | violet, 270-300° | 7,872 | C× p50 1.125 (p05 0.806) | 4.3° · 17.0° | p50 −0.046 | — |
| Playwright WebKit | — | 0 | `mask webkit: 0 px … (no veiled field in this engine's capture)` | | | |
| real Safari | — | — | UNMEASURED (owner's safaridriver checkbox) | | | |

Reading, reported only:
- **The aurora field reproduces Crit §2.2** (p05 1.030, p50 1.043, |Δh| p95 1.6°, every pixel dims) with this capture's own mask. The mask holds 35,616 px, not the critic's 40,824, because it is floor v11's own page dim and not floor v11a's, as H13 §3 item 3 expected.
- **The multi-hue cell dims every pixel**, and its median chroma rises in every band. The band medians do not fall to FV11's model figure for off-orange hues (C× 0.900-0.934, 4-5°). The tails are wide: C× p05 0.81-0.93, |Δh| p95 10-37°, 44.7 % of pixels past 3°.
- **The tails are not separated from geometry by this reading.** The veil blurs, and the bands are 96 px wide with hard edges, so near each edge the veiled pixel mixes two raw hues while the raw pixel does not. Most of the |Δh| and low-C× tail likely sits on those edges. Proving that would need per-band interior masking, a reader change this seat did not make (R-39 keeps it a report).
- **No gate moves.** C-2 is the owner's optional question (P12-4). If the owner extends O-103a beyond the spot, these numbers are the evidence, and an edge-free reading should come first.

---

## 5 · The battery, both engines (`rec/fv11-run-{chromium,webkit}.log`, `rec/baseline-fv11.md`, `rec/fv11-witnesses.log`)

| witness | Chromium light | Chromium dark | Playwright WebKit light | Playwright WebKit dark |
|---|---|---|---|---|
| RAW | PASS 24 | PASS 24 | PASS 24 | PASS 24 |
| M-1 | PASS 11 | — | PASS 11 | — |
| M-1x | PASS 1 | PASS 1 | PASS 1 | PASS 1 |
| M-2 | PASS 469 | PASS 469 | PASS 469 | PASS 469 |
| M-2m | PASS 215 | PASS 215 | PASS 215 | PASS 215 |
| M-2h | FAIL 1/34 | FAIL 1/34 | PASS 34 | PASS 34 |
| M-3 | PASS 177 | PASS 177 | FAIL 2/177 | PASS 177 |
| M-4 | PASS 84 | PASS 84 | PASS 84 | PASS 84 |
| M-5 | PASS 10 | PASS 10 | PASS 10 | PASS 10 |
| M-6 | FAIL 16/16 | FAIL 13/104 | FAIL 16/16 | FAIL 11/104 |
| M-7 | PASS 4 | PASS 4 | PASS 4 | PASS 4 |
| M-8 | PASS 4 | PASS 4 | PASS 4 | FAIL 1/4 |
| M-9 | PASS 10 | PASS 10 | PASS 10 | **PASS 8** (2 REPORT (R-37)) |
| O-66 | PASS 3 | PASS 2 | PASS 3 | PASS 2 |
| STACK | PASS 12 | PASS 12 | PASS 12 | PASS 12 |
| W-A | PASS 108 | PASS 108 | PASS 108 | PASS 108 |
| W-S | PASS 12 | PASS 12 | PASS 12 | PASS 12 |
| W-B..W-G | the banked families, as BV11 | | | |
| T · LIT · HOV | PASS 1 · 1 · 58 | PASS 1 · 1 · 58 | PASS 1 · 1 · 58 | PASS 1 · 1 · 58 |

- **`diff pass-12/BV11-records/baseline-fv11.md rec/baseline-fv11.md`** prints one line: `| M-9 | PASS 10 | PASS 10 | PASS 10 | FAIL 2/10 |` → `… | PASS 8 |`. That is H13-4's reading of the same pixels (H13 §3 item 1).
- **`diff pass-7/FV6-records/baseline-fv6.md rec/baseline-fv11.md`** prints the same one row, from FV6's `PASS 10`. The two legs left the tally and are reported.
- The owner-ruled readings: M-6 `--q1 a` PASS 88 in both engines; M-1x `--q11 a` PASS 1 in both; W-A `--q11 a` PASS 216 in both.
- R-12 demo probes, Chromium: `FV5-demo-probe` PASS 2/2 (rows 30; light `oklch(0.53 0.124 69.6 / 0.12)`, dark `oklch(0.813 0.109 78.2 / 0.12)`) and `crit-demo-probe` PASS 2/2 (ink `rgb(28, 25, 23)` / `rgb(233, 230, 226)`). Both are BV11's values.
- Playwright WebKit `FV5-demo-probe`: FAIL 2/2, `page.waitForTimeout: Page crashed`. This is H-14's crash class on an unshimmed `GlassDock` page, as on every floor since v4 (BV11 §4.3). It is not a reading of floor v11.

---

## 6 · Row 19: every plant over floor v11 (`rec/plants/readings.log`, `rec/plants-diff-bv11-fr13.txt`)

`diff` of BV11's plant readings against this seat's prints **only the four lines this seat added** (`39a40,43`). Every carried line is equal:
- R-1 M-4 7/84 · 7/84. R-2 M-9 1/10 · 1/10. R-3 O-66 6/6 · 5/6. R-4 3/3 · 3/3.
- `plant-q1c-noroom` 2/24 · 2/24.
- `plant-bound` 110/298 · 110/298. `plant-heldfloor` 20/72 · 20/72. `plant-carrierveil` 50/72 · PASS 72 (Playwright WebKit paints no carrier filter). `plant-darkperim` 47/87 · 47/87. `plant-noisolation` M-2 14/28 · 14/28 and STACK 8/12 · 8/12. `risk-opaque-ancestor` 4/28 · 4/28. `diag-held-noveil` M-2h 2/48.
- The readings: `probe-R2-35` PASS 10 · FAIL 1/10; `var-q1c` `--q1 a` 88 · 88 and `--q1 c` 2/96 · 2/96; `var-q11b` M-1x `--q11 b` 21 · 21, W-A 13/117 and 14/117, M-1 11 · 11.

The added lines (H13-2):

| plant | engine | verdict | the spot | the page |
|---|---|---|---|---|
| **`plant-R32-notone`** (M-9 `--r32 --cells dark`), FV3 table run | Chromium | **`FAIL (4 of 14)`** | `#ec9642 → #ff9012` ΔL **+0.010 brightens ✗**, (iii) 0.010 ✗; C ×1.233, \|Δh\| 2.4° | `#0b0a09 → #0b0a08` ΔL **−0.000 ✗** (M-9) and **(iii) −0.000 ✗ (R-38)** |
| | Playwright WebKit | `PASS (10)` | raw = veiled · REPORT (R-37) 4/4 | raw = veiled · REPORT |
| same, re-run ×2 (`rec/plant-notone-{1,2}-M-9-r32.log`, load 18.98 and 23.1) | Chromium | `FAIL (4 of 14)` both | the same values | the same values |
| `plant-R2` (M-9 `--r32`), its margin | Chromium | `FAIL (1 of 14)` | `#ec9642 → #ba6a0c` −0.145; R-32 passes (C ×0.961, 0.6°) | `#0b0a09 → #080705` ΔL **−0.017 ✗** against −0.02: **margin 0.003** |
| | Playwright WebKit | `FAIL (3 of 14)`, R-37 **GATE** (§3) | `#e87237 → #d36934` −0.043, (ii) 0.916 ✗ | `#0b0a09 → #0d0c0a` +0.009 ✗, (iii) ✗ |

Under H13-1 the tone plant reds on the page too. BV11 needed M-9's −0.02 floor to see it, and R-32 (iii) now sees it at −0.000. The tone plant is the row's evidence for the dark arm. `plant-R2` still reds by 0.003, as reported.

---

## 7 · Every red, re-run twice (`rec/rerun-chromium.log`, `rec/rerun-webkit.log`)

| red | run 1 | run 2 | reading |
|---|---|---|---|
| Chromium M-2h, M-3, M-6 on held, ladder and dialog over black, white, aurora and paper | M-2h FAIL 2/68 · M-3 FAIL 16/192 · M-6 FAIL 7/30 (19:56:09, load 19.4) | the same (19:59:07, load 11.0) | BV11 §5 exactly. M-2h's 2 are N-3's halo legs (held dock α 0.793-0.894 against 0.870 light, 0.799-0.878 against 0.855 dark). M-3's 16 are all `MISSING` rows for cells the re-run leaves out; the Close ring reads **p05 3.52, min 2.66, cols 3 (full-coverage column 852)**. M-6's 7 are Q-1's stepped text, PASS 88 under `--q1 a` |
| Playwright WebKit M-3 light checker, M-8 dark stripes, M-9 dark (with `--r32`), over `state,ladder,dialog` × `paper,aurora,checker,stripes`, both themes | M-3 FAIL 24/174 · M-8 FAIL 1/8 · M-9 PASS 18 · `--r32` PASS 20 (21:07:03, load 30.0) | the same (21:09:4x, load 31.1) | BV11 §5's values. M-3's 24 are 22 `MISSING` rows and the 2 light checker rings (`ring 2.83–3.31 (min floating·well) · 2/16 under 3.0`). M-8's 1 is dark stripes `floating bleed 1.26 C 0.0260 ✗`. M-9's 2 dark legs are REPORT (R-37) with the fact holding 2400/2400 on both cells |
| Chromium tone plant | `FAIL (4 of 14)` (load 19.0) | the same (load 23.1) | §6; the plant's red, as required |
| Playwright WebKit R-12 demo probe | crash class (§5) | — | not a reading of floor v11 |

The first reads were at load 30.8 (Chromium battery) and 27.5 (Playwright WebKit battery). The re-runs were at 11.0-31.1, and pass 12 read the same reds at 4-41. **No red is load-borne, none is NOT-REPRODUCED, and none is new.**

---

## 8 · The 44 rows (floor v11, pass 13's own battery; O-102b, O-103, O-103a, O-103b; R-37..R-39; no variant selected)

P2-6.3: a row passes when it is green in Chromium in both themes and its plant reds. Playwright WebKit is printed beside every row. The WebKit dark-veil legs are reports only while R-37's fact holds in the same capture (it held, §3). **Real Safari: UNMEASURED (owner's safaridriver checkbox) on every row.**

| # | row | Chromium (gate) | Playwright WebKit | status | evidence |
|---|---|---|---|---|---|
| 1 | RAW | PASS 24 · 24 | PASS 24 · 24 | **PASS** | §5 |
| 2 | M-1 | PASS 11 | PASS 11 | **PASS** | |
| 3 | M-1x | PASS 1 · 1; `--q11 a` PASS | PASS 1 · 1; `--q11 a` PASS | **PASS (ruling)** | O-103 Q-11 (a) |
| 4 | M-2 | PASS 469 · 469 | PASS 469 · 469 | **PASS** | |
| 5 | M-2m | PASS 215 · 215 | PASS 215 · 215 | **PASS** | 4 motion and 2 drift windows per engine |
| 6 | M-3 | PASS 177 · 177 | FAIL 2/177 light checker rings (re-run ×2) · PASS 177 | **PASS** | Close ring 3.52 in both re-runs |
| 7 | M-4 | PASS 84 · 84 | PASS 84 · 84 | **PASS** | |
| 8 | M-5 | PASS 10 · 10 | PASS 10 · 10 | **PASS** | |
| 9 | M-6 | FAIL 16/16 · 13/104 as built; `--q1 a` **PASS 88** | FAIL 16/16 · 11/104; `--q1 a` PASS 88 | **PASS (ruling)** | O-103 Q-1 (a) |
| 10 | M-7 | PASS 4 · 4 | PASS 4 · 4 | **PASS** | |
| 11 | M-8 | PASS 4 · 4 | PASS 4 · FAIL 1/4 dark stripes (re-run ×2) | **PASS** | toolchain green (§2) |
| **12** | M-9, the dark veil signed | **PASS 10 · 10**; dark page −0.029, spot −0.105 | PASS 10 · PASS 8, two legs REPORT (R-37), fact 2400/2400 on both cells | **PASS** | §3 |
| 13 | T | PASS 1 · 1 | PASS 1 · 1 | **PASS** | |
| 14 | release window | M-2h release legs PASS (its 2 reds are N-3's) | M-2h PASS 34 · 34 | **PASS** | |
| 15 | O-66 G2 | PASS 3 · 2 | PASS 3 · 2 | **PASS** | |
| 16 | O-66 G3 | as 15; R-12 demo PASS 2/2 | as 15; demo crash class | **PASS** | §5 |
| 17 | W-A | PASS 108 · 108; `--q11 a` 216 | PASS 108 · 108; `--q11 a` 216 | **PASS** | |
| 18 | every cell in both engines, WebKit `+shim` | 70 cells + windows | 70 cells + windows, 1 retire at 60 loads | **PASS** | §1 |
| 19 | plants | every plant reds; **tone plant `FAIL (4 of 14)` ×3** (page (iii) at −0.000) | as BV11 (carrierveil PASS by engine); tone plant REPORT | **PASS** | §6; `plant-R2` margin 0.003 reported |
| 20 | prose sweep | the list **PASS 207** (197 true, 10 reported) under `FV11-rulings.json`; plant 16/16 | — | **PASS** | R-21 (b), R-34; §2 |
| 21 | FL-13 | carried as a non-D3 row (E-6) | — | **PASS** | as BV11 §6 |
| 22 | O-87 | census `0 0 0 0`; LIT PASS 1 per column; one blur, no layer, no glow | LIT PASS | **PASS** | §2, §5 |
| **23** | gestalt, O-62 frame | R-32 (i)-(iii) **PASS (24)**: 1.4°, ×1.037, −0.105 / −0.029; FIELD reported (§4) | (iii) legs **REPORT (R-37)**, fact confirmed in the same capture | **PASS** | O-103b (F-1 accepted; no F-1′ decline in INBOUND) |
| 24 | STACK | PASS 12 · 12 | PASS 12 · 12 | **PASS** | |
| FL-1..FL-11, FL-13..FL-16 | the floor | as rows 1-19; floor plants red (§6) | as rows 1-19 | **PASS 15** | FL-6: the dark veil reads no ink (`-dim: transparent`), no plate token |
| FL-12 | prose sweep | as row 20 | — | **PASS** | |
| N-1, N-2 | Q-1, Q-11 built | (a) built, read PASS under both rulings | (a) built | **PASS (ruling)** | O-103 |
| N-3 | the dock's held halo | M-2h 2/68, the two halo legs, re-run ×2; `diag-held-noveil` 2/48 | PASS 34 · 34 | **PASS (attributed)** | §7 |
| N-4 | the minor's W-0.1 reading | **not this seat's cell.** P12-6.3 step 3 (the minor v10 seat) re-proves it on base (a). Floor v11 does not touch the minor | — | **to step 3** | P12-6.3 |

**Count on this seat's measurement: 43 PASS, 0 OPEN, and N-4 read by the minor v10 seat. No cell owed. No row opened, and none was added, struck or renamed.** If step 3 reads N-4 PASS, floor v11 stands at 44/44 on pass 13's own battery. The critic (step 4) and the agglomeration (step 5) decide whether pass 13 is the second clean pass.

---

## 9 · For the critic and the agglomeration (not ruled here)

- **R-37's guard has bitten on live paint.** `plant-R2`'s capture makes Playwright WebKit paint a dark veil, and M-9 turns `GATE` with its reds counting (§3). The critic's planned plant (P12-6.3 step 4) can cite `rec/plants/plant-R2-M-9-r32-webkit.log` beside H13's laid-out plant.
- **FIELD's multi-hue tails** (§4) are reported, never gated. They look like blur mixing across the band edges. An interior-masked reading would separate edge mixing from the arm's chroma per hue before any C-2 decision. That is a reader change for a later H-pass, not for this pass.
- **The baseline's one changed line is H13-4's form** (`FAIL 2/10 → PASS 8`). It is not a new reading of row 12.
- **LAW's count moved 99 → 100** because this seat's driver joined LAW's `pass-13/` root, and it passes.
- **Landing items, unchanged:** L-1, L-2 and the trailing whitespace at `floor-v11.patch:1266` (W-H.2 landing docs).

## 10 · Machine law, kept

- Every phase ran through `~/.claude/guard/guarded` as the literal command word. Browser runs were never `--light`.
- Every Playwright WebKit capture group (battery, thin, plants, re-runs) was its own `--exclusive webkit --timeout 60` admission. Each was queued and none was cancelled. The waits were 27, 31, 4 and 10 min.
- One browser per run, with a fresh context per cell (`capture.mjs`). The WebKit browser was retired at 60 page loads. No GPU launch argument outside `lib.mjs`'s cited M-2m witness, no `getContext()`, no browser MCP, no `screencapture`.
- One heavy run at a time. vitest ran with `--maxWorkers=2`. No `guarded` refusal fired, and none on the kernel zone count.
- Screenshot loops stayed thin. The light proof is 2 builds × 4 state cells per engine, and the hues cell is one Chromium cell. Drift and motion windows are the battery's own. The only PNGs kept are R-12's four Chromium demo-probe frames (`demo-frames/`), as BV11 kept them.
- Nothing is left running. The worktree is removed and pruned, `…/D3/p13/` is gone, and no process of this seat remains (`rec/teardown.log`).

## 11 · Records

`pass-13/FR13-run.sh` (the driver) and `pass-13/FR13-records/`:
- runs: `phases.log`, `setup.log`, `same.log`, `css/`, `lightproof.log`, `toolchain.log` and its logs, `plant.log`, `battery-cr.{out,time}`, `fv11-run-chromium.log`, `wk-admission.log`, `wk-battery.out`, `fv11-run-webkit.log`, `cr-chain.out`, `wk-chain.out`;
- static: `declare-floor-v11.{json,log}`, `static.log`, `del-*.log`, `law.log`, `HOV-fv11.log`, `LIT-static-fv11.log`, `census-*.log`, `radii-*.txt`, `sweep*.log`;
- witnesses: `fv11-witnesses.log`, `fv11-results/`, `verbose/`, `baseline-fv11.{md,json}`, `baseline-diff-bv11-fr13.txt`, `baseline-diff-fv6-fr13.txt`;
- readings: `readings.log`, `M-9-{chromium,webkit}.log`, `M-9-r32-{chromium,webkit,both}.log`, `M-6-q1a-*.log`, `M-1x-q11a-*.log`, `W-A-q11a-*.log`;
- light proof and field: `thin*.log`, `thin-M-9-r32-*.log`, `hues-chromium-capture.log`, `offspot-{chromium,webkit}.log`, `lightproof-px.log`, `field*.log`;
- plants: `plants-run.log`, `plants-{chromium,webkit}.log`, `floor-plants-*.log`, `plants/`, `plants-diff-bv11-fr13.txt`, `plant-notone*.log`;
- demo: `demo-cr.log`, `demo-fv11-*.{log,json}`, `critdemo-fv11-chromium.*`, `demo-frames/`;
- re-runs: `rerun-{chromium,webkit}.log`, `rerun-*{1,2}-*.log`;
- `teardown.log`.
