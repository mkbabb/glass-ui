# D3 · pass 12 · floor v11's battery: R-32's dark arm in paint, both engines (P11-6.3 step 3, the browser half)

| field | value |
|---|---|
| seat | D3 pass 12, FLOOR-V11 BATTERY. It applies `floor-v11.patch` (`8f838dcf`) in its own worktree, builds there, and runs the full battery (`harness/run.mjs`) in headless Chromium and Playwright WebKit, Chromium first. It also runs H12-1 (`m9-state-registers.mjs --r32`) on the aurora focus spot and the dark page in both engines, re-reads row 12's dark-signed leg, banks the F-1 frames, re-plants row 19 and re-runs every red twice. Static rows and the toolchain are FLOOR-V11.md's and are carried, not re-run |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | **HEAD of master at launch, `7139b722e`** (docs only since `81d6b2d31`): `git diff --stat 1da7eb17b HEAD -- src demo tests …` prints nothing (`setup.log`), so the tree is the published 10.1.0 source plus `floor-v11.patch`. `git apply --check` exits 0 at that HEAD. **`release/10.1.1` is NOT merged during pass 12** (P11-5: the merge waits until this pass's floor seat banks) |
| rulings read | `audit/INBOUND.md`, at start and at close. The last D3 ruling is still **O-103a** (Q-14's dark arm reopened as "dim by OKLCH lightness, keep chroma"; the light arm stands). O-102b and O-103 stand. One row is newer, **O-102c** (10.1.1's O-102(6) and `DockContext.expanded`); it does not touch D3. `FORMATION-PROGRESS.md` at close: its newest lines are the floor v11 build bank and O-102c, and neither is a D3 ruling. **Re-checked on resume (2026-10-20 14:32):** the newest INBOUND row is O-102d (G-4, 10.1.2), and the newest cursor lines are the 01:06 zone hold, 10.1.1's publish and the 14:33 resume. None is a D3 ruling, so O-103a still governs. No `guarded` refusal fired, kernel-zone or otherwise. The seat was stopped at the 01:06 zone hold with only `rerun-wk` left, and resumed after the reboot. Master moved to `21f94b6a2` by docs commits only (`git diff --stat 7139b722e HEAD -- src demo tests package.json vite.config.ts` prints nothing), so the build of record still stands. The worktree carried `floor-v11.patch` byte for byte at resume (`cmp` against `git diff HEAD --binary`) |
| driver | `BV11-run.sh` (this directory), every phase launched as `~/.claude/guard/guarded … -- bash BV11-run.sh <phase>`. `--light` for phases with no browser (setup, witnesses, readings, compose, plants-read). `--timeout 60` heavy for Chromium phases (build, battery-cr, frames-cr, plants-cr, demo-cr, rerun-cr, plant-notone). **`--exclusive webkit --timeout 60` for each Playwright WebKit capture group, each its own admission** (wk-battery, frames-wk, plants-wk, rerun-wk). Tools: `BV11-frames.mjs` (F-1's three-panel frame, no browser) and `BV11-plant-r32-notone.css` (a row-19 plant this seat added, §4.2). Records in `BV11-records/` |
| engines | Chromium 149 as Playwright's headless shell with **no launch arguments** for every cell. The moving-field windows alone relaunch it with `lib.mjs`'s cited `GPU-WITNESS: M-2m` arguments (H6-0, unchanged). **Playwright WebKit 26.5, headless**, every context with H-14's shim. Playwright WebKit is not Safari. **Every real-Safari cell: UNMEASURED (owner's safaridriver checkbox)**, not granted (O-103) |
| fences | No source edit and no git write in the checkout. The worktree `.claude/worktrees/bl/D3/p12/battery11/wt` was cut at HEAD with `node_modules` symlinked, and `D3_OUT` and every vite cacheDir lived inside it. It was removed with `--force` and pruned, and `…/D3/p12/battery11/` is gone (`teardown.log`). The checkout's only writes are this directory's `BV11-*` files, `BATTERY-V11.md` and `frames-Q14/` |

Short citations: `REG` = `REGISTRY.md` (`P11-n` its pass-11 part), `FV11` = `pass-12/FLOOR-V11.md`, `H12` = `pass-12/H12.md`, `FV6` = `pass-7/FLOOR-V6.md` (the last full two-engine battery; floor v6 = floor v10 = floor v11a by specimen CSS `347288745da7cf97`). `rec/x` = `BV11-records/x`.

---

## 0 · In brief

- **Built.** `floor-v11.patch` applies at `7139b722e`. The specimen CSS is **391,252 B `4f56c2631ab5cdd4`** (floor v11) and **391,121 B `347288745da7cf97`** (floor v11a, R-2's side), both equal to FV11's banked hashes (`rec/build.log`).
- **R-32 in Chromium: (i)-(iii) PASS** (`M-9 --r32 chromium: PASS (24 gated rows)`, `rec/M-9-r32-chromium.log`). The spot `#ec9642 → #cc740c`: L 0.748 → 0.643, C 0.142 → 0.147, h 61.8° → 60.3°, so |Δh| 1.4°, C ×1.037, ΔL −0.105. The page `#0b0a09 → #060504`: ΔL −0.029. FV11's model predicted `#cc730c`, 1.8°, ×1.041, −0.105, −0.0295, which is one 8-bit step on one channel.
- **R-32 in Playwright WebKit: (i), (ii) PASS, (iii) FAIL on the spot and the page** (`M-9 --r32 webkit: FAIL (4 of 24 gated rows)`). The engine reads raw = veiled to the bit: the spot `#e87237 → #e87237`, the page `#0b0a09 → #0b0a09`, ΔL 0.000 on both. FV11 §2.3 predicted exactly this: headless Playwright WebKit paints no `backdrop-filter`, and floor v11's dark arm dims only inside that chain. The red reproduces 4 of 4: the battery, the F-1 capture and both re-runs (§5). It was first read at load 4-11, and the re-runs read it again at load about 40. It is an engine fact, not a NOT-REPRODUCED cell.
- **Every other cell of the battery equals floor v6's.** `diff pass-7/FV6-records/baseline-fv6.md rec/baseline-fv11.md` prints one changed row: M-9 Playwright WebKit dark `PASS 10 → FAIL 2/10`. Those are the two dark veil rows above. The plants' verdicts equal FV6's line for line (`rec/plants-diff-fv6-fv11.txt`, exit 0). The Chromium reds (M-2h 2/68, M-6 29/120, M-3's re-run MISSING rows) and the Playwright WebKit reds (M-3 light checker 2/177, M-8 dark stripes 1/4) are FV6's, re-run twice with the same values.
- **Row 12's dark-signed leg holds in Chromium** (the gate engine, P2-6.3): the dark page dims −0.029 and the spot −0.105, both ≤ −0.02. In Playwright WebKit it FAILs (ΔL +0.000) on both dark grounds, by the same engine fact.
- **The F-1 frames are banked:** `frames-Q14/chromium-dark-aurora-state-veil-r2-vs-r32.png` and `frames-Q14/webkit-dark-aurora-state-veil-r2-vs-r32.png`. Each shows three panels on one ground: the bare spot | R-2 | R-32 (§3).
- **Row 19, a gap found and closed by measurement.** FV3's `plant-R2` re-values `-dim`, which floor v11's dark arm no longer dims with. In Chromium it still reds, but only by 0.003: the page reads ΔL −0.017 against the 0.02 floor, where FV6 read it brightening +0.004. This seat added the plant that removes R-32's own mechanism, the dark `-tone` (`BV11-plant-r32-notone.css`). It reds 3 of 3 in Chromium: the spot brightens +0.010, so M-9 and R-32 (iii) FAIL, and the page reads ΔL −0.000, so M-9 FAILs (§4.2).
- **The count (§6): 43 PASS, 1 OPEN, as at pass 11.** Row 23 stays OPEN. Its R-32 clause reads PASS in Chromium and FAIL (iii) in Playwright WebKit, the cell of record while the checkbox is not granted. F-1 is owed to the owner or delegate. This seat rules nothing on the engine fact. It is FV11 §7's one item, now measured, and it goes to the critic and the agglomeration.

---

## 1 · Runs, admissions and loads (`rec/phases.log`, `rec/wk-admission.log`)

| run | when | load (1-, 5-, 15-min) |
|---|---|---|
| setup (`--light`) | 20:53:18 → 20:53:37 | 25.7 → 27.0 |
| build fv11 (+ demo), fv11a (heavy) | 20:54:32 → 20:54:36 | 24.8 → 23.3 |
| **Chromium battery** (`battery-cr`, heavy `--timeout 60`) | 20:55:59 → 21:14:03 | 22.0 at start. The capture took 70 cells, 4 live, 4 motion and 2 drift windows in 872.3 s (load 14.4 / 13.7 / 15.6 at its end); 24.4 at the end |
| **Playwright WebKit battery** (`wk-battery`, `--exclusive webkit --timeout 60`) | queued 21:14:29 (21.0), **admitted 21:38:14** (10.9; 24 min behind other repos' WebKit runs), ended 21:57:08 | the capture took 70 cells, 4 live, 4 motion and 2 drift windows in 895.1 s (load 4.9 / 7.5 / 10.7), **retired and relaunched once at 60 page loads** (H3-1); 8.4 at the end |
| witnesses, baseline, diff (`--light`) | 21:57:16 → 22:01:13 | 7.8 → 12.0 |
| readings (`--light`) | 22:01:18 → 22:01:34 | 11.5 → 10.3 |
| F-1 capture, Chromium (`frames-cr`) | 22:01:56 → 22:02:25 | 9.0 → 8.1 |
| plants, Chromium (`plants-cr`) | 22:02:29 → 22:20:46 | 7.8 → 5.4 |
| R-12 demo probes, Chromium (`demo-cr`) | 22:20:50 → 22:21:47 | 5.2 → 5.8 |
| Chromium re-runs ×2 (`rerun-cr`) | 22:21:51 → 22:27:41 | 5.7 → 12.6 |
| F-1 capture, Playwright WebKit (`frames-wk`) | queued 22:27:56 (11.2), **admitted 23:18:33** (4.4; 51 min in the queue), ended 23:19:02 | 4.1 |
| compose (`--light`) | 23:29:07 → 23:29:08 | 4.9 |
| plants, Playwright WebKit (`plants-wk`) | queued 23:19:06 (4.4), **admitted 00:06:33** (5.8; 47 min), ended 00:24:20 | 7.0 |
| plant reads (`--light`) | 00:24:37 → 00:25:12 | 6.6 → 6.7 |
| R-32 tone plant ×3, Chromium (`plant-notone`) | 00:25:48 → 00:26:31 | 6.6 |
| Playwright WebKit re-runs ×2 (`rerun-wk`) | first queued 00:24:24 (6.7); that queue was lost to the 01:06 zone hold and the owner's reboot (FORMATION-PROGRESS 2026-10-20 01:06, 14:33). Re-queued after the resume at 14:32:41 (19.0) and **admitted at once**, ended 14:38:01. 20 cells per run, 2 runs, each its own process, under the 60-load restart | 19.0 at admission; **41.0** at run 1's read (14:35:21), **40.2** at run 2's (14:38:01); R-32 re-read (`--light`) 14:41:03 at 18.9 |
| teardown (`--light`) | 14:41:16 → 14:41:34 | 22.6 → 27.6 |

Every Playwright WebKit admission came within the 90-minute limit, so **no cell is owed**. The longest wait was 51 min. A first `--light` call of `BV11-frames.mjs`, made while this seat's own `frames-wk` waited on the lock, sat unadmitted for 37 min and was stopped by hand. It was run again as the `compose` phase after the lock was released, and admitted at once. It launches no browser, and no record came from the stopped call.

---

## 2 · R-32 and row 12, per engine (H12-1, `rec/M-9-r32-{chromium,webkit,both}.log`)

`m9-state-registers.mjs <cap> --gate <engine> --r32`, on the full battery's capture (`caps/fv11`):

| engine | cell | raw → veiled (hex) | raw (L, C, h) | veiled (L, C, h) | (i) \|Δh\| ≤ 3° | (ii) C_v/C_r ≥ 0.95 | (iii) ΔL < 0 | ΔL, reported (R-2's spot: −0.225) | verdict |
|---|---|---|---|---|---:|---:|---|---:|---|
| **Chromium** (headless shell) | the spot, `dark aurora state` | `#ec9642 → #cc740c` | 0.748, 0.142, 61.8° | 0.643, 0.147, 60.3° | **1.4° PASS** | **1.037 PASS** | **−0.105 PASS** | **−0.105** | **`PASS (24 gated rows)`** |
| Chromium | the page, `dark paper state` | `#0b0a09 → #060504` | 0.146, 0.003, 68.6° | 0.116, 0.004, 70.6° | — | — | **−0.029 PASS** | −0.029 | |
| **Playwright WebKit** | the spot | `#e87237 → #e87237` | 0.682, 0.163, 44.6° | 0.682, 0.163, 44.6° | 0.0° PASS | 1.000 PASS | **0.000 FAIL** | 0.000 | **`FAIL (4 of 24 gated rows)`** |
| Playwright WebKit | the page | `#0b0a09 → #0b0a09` | 0.146, 0.003, 68.6° | 0.146, 0.003, 68.6° | — | — | **0.000 FAIL** | 0.000 | |
| real Safari | — | — | — | — | — | — | — | — | **UNMEASURED (owner's safaridriver checkbox)** |

The 4 Playwright WebKit reds are (iii) on the spot, (iii) on the page, and M-9's two dark "dims ≥ 0.02" rows (`focus veil #0b0a09 → #0b0a09 ΔL +0.000 ✗`, `#e87237 → #e87237 ΔL +0.000 ✗`). Both engines gated together read `FAIL (4 of 48 gated rows)`, the same four.

**The R-2 side, measured in the same session** (floor v11a, the F-1 capture, `rec/frames-M-9-r32-fv11a-*-1.log`), H12-1's plant on live bytes:
- Chromium: `#ec9642 → #99560a`, L 0.521, C 0.118, h 60.5°: (i) 1.2° PASS, **(ii) 0.829 FAIL**, (iii) −0.226 PASS.
- Playwright WebKit: `#e87237 → #8b4421`, L 0.472, C 0.108, h 45.0°: (i) 0.4° PASS, **(ii) 0.662 FAIL**, (iii) −0.210 PASS.

These reproduce H12's plant values (0.832 / 0.662, −0.226 / −0.211) and REG P11-4's pair, so the instrument separates the two arms on fresh pixels. R-2 reds (ii) where floor v10's bytes are captured, and R-32 passes it.

**Light arm, unchanged in paint** (Q-14 (a)). Chromium light: page `#fbfaf8 → #e4e3df` (ΔL −0.070), spot `#ec9642 → #e88412` (−0.040). Playwright WebKit light: page −0.067, spot −0.043. Every light M-9 row equals FV6's to the hex (`rec/M-9-chromium.log`, `-webkit.log`; FV6 `M-9-*.log`). That matches FV11 §3's proof that the light computed values are identical.

**Row 12's dark-signed leg, re-read.** In Chromium, M-9 is `PASS (20 gated rows)` with both themes dimming: dark page −0.029 and spot −0.105, against floor v10's −0.025 and −0.226. The page dims a little more and the spot about half as much (3.6× the page's depth, from 9.1×). In Playwright WebKit, M-9 dark is `FAIL 2/10` (`rec/baseline-fv11.md`). Row 12 is gated on Chromium (P2-6.3: "WebKit is informational"), so it PASSes. The Playwright WebKit leg is recorded, not waived, and §6 places it.

**The model, read against the paint (R-34).** `dark-arm.css:297-299` predicts "the dark page L −0.030; the spot keeps its hue within 1.8 deg and its chroma at 1.04x, and drops L 0.090-0.105". In Chromium, on the shell's ground, the battery reads −0.029, 1.4°, ×1.037 and −0.105. The GL-ground half of the line (−0.090, 1.3°, ×1.044) cannot be read in any engine this seat has: Chromium paints the `css` arm, and Playwright WebKit paints no chain. Read as a prediction, the line holds where it can be measured. It goes to the critic under R-34, unchanged.

---

## 3 · The F-1 owner frames (`frames-Q14/`, `rec/compose.log`, `rec/frames.log`)

Captured thin: the dark `state` scene over `aurora` and `paper` only, one engine per run, floor v11a then floor v11. Each capture was read by M-9 `--r32` and banked with `--bank` (H5-1's pair writer). `BV11-frames.mjs` then laid out three panels from the banked pairs, each 240 × 160 around the probe at 2×: **the bare ground | R-2 | R-32**. In both engines the raw halves of the two banks are equal (max channel difference 0), so both arms sit on one ground.

| frame | sha256 | panel 1: bare ground | panel 2: R-2 (40 % black) | panel 3: R-32 (the tone) |
|---|---|---|---|---|
| `frames-Q14/chromium-dark-aurora-state-veil-r2-vs-r32.png` (1456 × 320) | `b76658f5a75ecada610886d10453e1f9cf42f3fcc06386a181da6541c69d773f` | `#ec9642` L 0.748 C 0.142 h 61.8° | `#99560a` L 0.521 C 0.118 h 60.5° · ΔL −0.226 · C ×0.829 | `#cc740c` L 0.643 C 0.147 h 60.3° · ΔL −0.105 · C ×1.037 |
| `frames-Q14/webkit-dark-aurora-state-veil-r2-vs-r32.png` (1456 × 320) | `f83d97b202f61d03def1325da784df2c713d86ae072d6ec8c5b98b3e3a24cf06` | `#e87237` L 0.682 C 0.163 h 44.6° | `#8b4421` L 0.472 C 0.108 h 45.0° · ΔL −0.210 · C ×0.662 | `#e87237` L 0.682 C 0.163 h 44.6° · ΔL 0.000 · C ×1.000 (**no dim painted**: Playwright WebKit paints no `backdrop-filter`) |

**For the sheet (F-1).**
- The Chromium frame is the one that shows the arm. R-2 reads brown, and R-32 reads a deeper, still saturated orange (this seat's eye on the PNG; the owner's eye decides).
- The Playwright WebKit frame's third panel is the bare ground, because that engine paints neither the blur nor the tone. It shows R-2's background-only dim beside no dim, and it is not a picture of R-32.
- The ground is the shell's `css` arm in Chromium (`#ec9642`) and the GL arm in Playwright WebKit (`#e87237`). The frame the delegate declined (frame 1) was pass 5's WebGPU ground, `#e87237 → #993f09` (H12 §2.1). The new frames pair R-2 and R-32 on one ground per engine, as P11-4 and H12 §2.1 ask.
- Real Safari, which paints the chain: UNMEASURED (owner's safaridriver checkbox).

The banked full captures and pairs stay in the worktree's `D3_OUT` and were removed with it. Only the two composites are kept (thin capture). Their per-arm pair hashes are in `rec/frames-M-9-r32-*.log` (`banked … sha256 …`).

---

## 4 · Row 19: every plant over floor v11, and the arm's own plant

### 4.1 · FV6's plants, re-planted (`rec/plants/readings.log`; `rec/plants-diff-fv6-fv11.txt`: **`diff` against FV6's verdicts prints nothing, exit 0**)

Every R plant and floor plant reds, in both engines unless named, with FV6's exact tallies:
- R-1 M-4 7/84 · 7/84.
- R-2 M-9 1/10 · 1/10.
- R-3 O-66 6/6 · 5/6.
- R-4 3/3 · 3/3.
- `plant-q1c-noroom` 2/24 · 2/24.
- `plant-bound` M-2 110/298 · 110/298.
- `plant-heldfloor` 20/72 · 20/72.
- `plant-carrierveil` 50/72 · PASS 72 (Playwright WebKit paints no carrier filter, as FV6).
- `plant-darkperim` M-3 47/87 · 47/87.
- `plant-noisolation` M-2 14/28 · 14/28 and STACK 8/12 · 8/12.
- `risk-opaque-ancestor` 4/28 · 4/28.
- `diag-held-noveil` M-2h 2/48 (Chromium).
- The readings: `probe-R2-35` PASS 10 · FAIL 1/10; `var-q1c` M-6 `--q1 a` 88 · 88; `var-q11b` M-1x `--q11 b` 21 · 21.

**But `plant-R2`'s margin moved, and its verdict now hides a gap.** FV3's `plant-R2` sets the dark `--glass-focus-veil-dim` to the scrim ink at 10 %. On floor v10 that was the dark arm's whole dim. On floor v11 the dark arm dims inside the chain (`-tone`), so the plant only adds a faint lift on top of a dim that is still painted:

| | floor v6 / v10 (FV6) | floor v11 (this seat) |
|---|---|---|
| Chromium dark page | `#0b0a09 → #0c0b09` ΔL **+0.004 brightens ✗** | `#0b0a09 → #080705` ΔL **−0.017 ✗** (fails by 0.003) |
| Chromium dark spot | `#ec9642 → #e88412` −0.040 | `#ec9642 → #ba6a0c` −0.145 |
| Playwright WebKit dark page | — | `#0b0a09 → #0d0c0a` +0.009 brightens ✗ |

The verdict stands (FAIL 1/10), but it no longer removes the mechanism that row 12 claims. P2-6.3 asks for "a mechanism-removal plant for every green claimed", so this seat planted the removal of R-32's own term.

### 4.2 · R-32's own plant (`BV11-plant-r32-notone.css`, `rec/plant-notone*.log`; Chromium, 3 runs, load 6.6)

`.dark { --glass-focus-veil-tone: saturate(var(--glass-saturate)); }`: the dark arm's tone removed, so the dark veil carries no dim term. The capture is the dark `state` scene over `aurora` and `paper`, variant `plant-notone`, read by M-9 `--r32 --variant plant-notone`:

| run | verdict | the spot | the page |
|---|---|---|---|
| 1, 2, 3 (00:26:02-00:26:30) | `FAIL (5 of 16 gated rows)` each: the 2 light cells this thin capture leaves out (MISSING), M-9's two dark dims rows, R-32 (iii) on the spot | `#ec9642 → #ff9012` ΔL **+0.010 brightens ✗**, C ×1.233, \|Δh\| 2.4°: (iii) ✗ | `#0b0a09 → #0b0a08` ΔL **−0.000 ✗** (M-9) |

So the arm's mechanism has a plant that reds: R-32 (iii) and M-9 both see the tone removed. It is Chromium only, because Playwright WebKit paints no chain, and the plant is a no-op there by the same engine fact.

**An instrument note for the critic.** R-32 (iii) on the page is strict ΔL < 0, and the plant's page reads −0.000 (a rounding of a tiny negative), so (iii) PASSes there. M-9's own ≤ −0.02 row is what reds the page. Row 12's leg and R-32 (iii) together hold. R-32 (iii) alone, on the page, would not see a removed dim. That is a reading for the next H-pass, and this seat changes no gate.

### 4.3 · R-12's demo probes on floor v11's own dist-demo (`rec/demo-cr.log`, `rec/demo-fv11-webkit.log`)

- Chromium: `FV5-demo-probe` **PASS 2/2** (rows 30; the pointer on row 1 highlights and paints [1], on row 0 [0]; light `oklch(0.53 0.124 69.6 / 0.12)`, dark `oklch(0.813 0.109 78.2 / 0.12)`). `crit-demo-probe` **PASS 2/2** (ink `rgb(28, 25, 23)` light, `rgb(233, 230, 226)` dark). These equal FV6's values.
- Playwright WebKit: FAIL 2/2, `page.waitForTimeout: Page crashed`. This is H-14's crash class on an unshimmed `GlassDock` page, as on every floor since floor v4 (FV6 §5.5). It is not a reading of floor v11, and it was not re-run.

---

## 5 · Every red, re-run twice

| red | run 1 | run 2 | reading |
|---|---|---|---|
| Chromium M-2h, M-3, M-6 on held, ladder and dialog over black, white, aurora and paper (`rec/rerun-cr.log`) | M-2h FAIL 2/68 · M-3 FAIL 16/192 · M-6 FAIL 7/30 (22:24:45, load 9.0) | the same (22:27:40, load 12.6) | FV6's re-runs exactly. M-3's 16 are all `MISSING … not captured` rows for the cells the re-run leaves out, and the Close ring reads **p05 3.52, min 2.66, cols 3 (full-coverage column 852)** in both. M-2h's 2 are N-3's halo legs (held dock α 0.793-0.894 against a floor of 0.870 light, 0.799-0.878 against 0.855 dark). M-6's 7 are Q-1's stepped text, read PASS 88 under `--q1 a` (O-103). **No red is load-borne** |
| Playwright WebKit: M-9 dark (the R-32 (iii) cells), M-3 light checker ladder, M-8 dark stripes (`rec/rerun-webkit.log`, `rec/rerun-wk-chain.out`; scenes `state,ladder,dialog` over `paper,aurora,checker,stripes`, both themes) | M-9 FAIL 2/20 · `--r32` FAIL 4/24 · M-3 FAIL 24/174 · M-8 FAIL 1/8 (14:35:21, load 41.0) | the same (14:38:01, load 40.2) | The battery's values to the hex. M-9's 2: `focus veil #0b0a09 → #0b0a09 ΔL +0.000 ✗` and `#e87237 → #e87237 ΔL +0.000 ✗`. `--r32`'s 4: those two plus (iii) on the spot (`L 0.682 C 0.163 h 44.6°` → the same, ΔL 0.000) and on the page (`L 0.146` → the same). M-3's 24 are 22 `MISSING` rows (the scenes the re-run leaves out) and the 2 light checker rings (`ring 2.83–3.31 (min floating·well) · 2/16 under 3.0`). M-8's 1: dark stripes `floating bleed 1.26 C 0.0260 ✗`. The load ran high (about 40) during these re-runs, but each red was first read at load 4-11 (§1), so **no red is load-borne**, and none is NOT-REPRODUCED |
| Playwright WebKit R-12 demo probe | crash class (§4.3) | — | not a reading of floor v11 |

The baseline's other reds are the banked families W-B..W-G. They are not rows (FV6 §5.2), and each equals FV6's tally per column.

---

## 6 · The 44 rows (floor v11; rulings O-102b, O-103, O-103a; no variant selected)

P2-6.3: a row passes when it is green in Chromium in both themes and its plant reds. **Playwright WebKit is informational, and real Safari counts when enabled** (not granted, O-103). The Playwright WebKit column is printed beside every row. Static rows and the toolchain carry from FV11, run on these bytes this pass.

| # | row | Chromium (gate) | Playwright WebKit (informational) | status | evidence |
|---|---|---|---|---|---|
| 1 | RAW | PASS 24 · 24 | PASS 24 · 24 | **PASS** | baseline (light · dark) |
| 2 | M-1 | PASS 11 | PASS 11 | **PASS** | |
| 3 | M-1x | PASS 1 · 1 (REPORTED), `--q11 a` PASS | PASS 1 · 1, `--q11 a` PASS | **PASS (ruling)** | O-103 Q-11 (a) |
| 4 | M-2 | PASS 469 · 469 | PASS 469 · 469 | **PASS** | |
| 5 | M-2m | PASS 215 · 215 | PASS 215 · 215 | **PASS** | 4 motion, 2 drift windows per engine |
| 6 | M-3 | PASS 177 · 177 | FAIL 2/177 (light checker straight-run rings, §5) · PASS 177 | **PASS** | Close ring 3.52 ×3 captures |
| 7 | M-4 | PASS 84 · 84 | PASS 84 · 84 | **PASS** | |
| 8 | M-5 | PASS 10 · 10 | PASS 10 · 10 | **PASS** | |
| 9 | M-6 | FAIL 16/16 · 13/104 as built; **`--q1 a` PASS 88** | FAIL 16/16 · 11/104; `--q1 a` PASS 88 | **PASS (ruling)** | O-103 Q-1 (a) |
| 10 | M-7 | PASS 4 · 4 | PASS 4 · 4 | **PASS** | |
| 11 | M-8 | PASS 4 · 4 | PASS 4 · FAIL 1/4 (dark stripes, §5) | **PASS** | |
| **12** | M-9, the dark veil signed | **PASS 10 · 10**; dark page −0.029, spot −0.105 | PASS 10 · **FAIL 2/10** (raw = veiled, ΔL 0.000) | **PASS** | §2. The Playwright WebKit dark leg is the engine fact (FV11 §2.3), placed under row 23 |
| 13 | T | PASS 1 · 1 | PASS 1 · 1 | **PASS** | reported |
| 14 | release window | M-2h release legs PASS (its 2 reds are N-3's halo legs) | M-2h PASS 34 · 34 | **PASS** | |
| 15 | O-66 G2 | PASS 3 · 2 | PASS 3 · 2 | **PASS** | |
| 16 | O-66 G3 | as 15 | as 15 | **PASS** | R-12 demo PASS 2/2 (§4.3) |
| 17 | W-A | PASS 108 · 108 (`--q11 a` 216) | PASS 108 · 108 | **PASS** | |
| 18 | every cell in both engines, WebKit `+shim` | 70 cells + windows | 70 cells + windows, 1 retire at 60 loads | **PASS** | §1 |
| 19 | plants | every plant reds; **R-32's tone plant reds 3/3** | as FV6 (carrierveil PASS by engine) | **PASS** | §4. `plant-R2`'s margin is 0.003 on floor v11 (§4.1), so the tone plant is the row's evidence for the dark arm |
| 20 | prose sweep | FV11 §4: the list PASS 207 under `FV11-rulings.json`; R-32's 43 lines read | — | **PASS** | R-21 (b), R-34 |
| 21 | FL-13 | carried | — | **PASS** | not a D3 row (E-6) |
| 22 | O-87 | census `0 0 0 0` (FV11 §5); LIT PASS 1 per column, frames included | LIT PASS | **PASS** | no layer, no second blur, no glow |
| **23** | gestalt, O-62 frame | R-32 (i)-(iii) **PASS** | R-32 (iii) **FAIL** on spot and page (engine fact) | **OPEN** | R-32 needs (i)-(iii) PASS "in both engines" and F-1's re-acceptance. Playwright WebKit is the cell of record (O-103). §7 |
| 24 | STACK | PASS 12 · 12 | PASS 12 · 12 | **PASS** | |
| FL-1..FL-11, FL-13..FL-16 | the floor | as rows 1-19, floor plants red (§4.1) | as rows 1-19 | **PASS 15** | FL-6: the dark veil now reads no ink at all (`-dim: transparent`), and still no plate token |
| FL-12 | prose sweep | as row 20 | — | **PASS** | |
| N-1, N-2 | Q-1, Q-11 built | (a) built | (a) built | **PASS (ruling)** | O-103 |
| N-3 | the dock's held halo | M-2h 2/68, the two halo legs, re-run twice (§5); `diag-held-noveil` 2/48 | PASS 34 · 34 | **PASS (attributed)** | as FV6 |
| N-4 | the minor's W-0.1 reading | carried (P11-3) | — | **PASS** | the minor is untouched |

**Count: 43 PASS, 1 OPEN (row 23) = 0.977**, as at pass 11. **No row opened.** Row 12 holds on Chromium, and its Playwright WebKit dark leg reds by the engine fact. Row 19 holds, with a plant added for the arm's own mechanism.

---

## 7 · For the critic and the agglomeration (not ruled here)

- **R-32's arm reads as built in the engine that paints it.** Chromium measures (i) 1.4°, (ii) ×1.037, (iii) −0.105 / −0.029, within one 8-bit step of FV11's model. R-2, in the same session on the same ground, reads (ii) 0.829. The Chromium F-1 frame shows R-2 brown and R-32 orange.
- **Row 23's "both engines" clause cannot be met on this arm in Playwright WebKit**, as FV11 §2.3 predicted. The engine paints raw = veiled to the bit. That reproduced 4 of 4, first at load 4-11 and again at about 40 (§5). Under FV11's argument, no background-only arm could keep chroma and dim there, and a WebKit-only background dim was refused under E-2. Closing row 23 needs one of two things: a ruling that reads Playwright WebKit's R-32 (iii) and M-9 dark-veil legs as engine-fact reports (as O-103 reads Safari-only facts), or the safaridriver checkbox, so that real Safari, which paints `backdrop-filter`, can be measured. Either way, F-1's re-acceptance is still owed.
- **H12-1's page leg (iii) is strict ΔL < 0** and passes a removed dim at −0.000 (§4.2). M-9's −0.02 floor catches it. This is a reading for the next H-pass, not a defect of this build.
- **Row 19's `plant-R2`** now reds by 0.003 on floor v11. The tone plant (`BV11-plant-r32-notone.css`) is the plant for R-32's mechanism. Whether it joins `pass-4/FV3-plants.mjs`'s table (a harness change) is the next H-pass's call. It is banked here as a CSS file and a driver phase.
- **`dark-arm.css:297-299`'s predicted numbers** read true on the shell's ground in Chromium. Their GL-ground half (−0.090, 1.3°, ×1.044) has no engine here that paints it.

---

## 8 · Machine law, kept

- Every phase ran through `~/.claude/guard/guarded` as the literal command word. Browser runs were never `--light`. Every Playwright WebKit capture group (battery, F-1, plants, re-runs) was its own `--exclusive webkit --timeout 60` admission, queued and never cancelled. One browser per run with a fresh context per cell (`capture.mjs`), and the WebKit browser retired at 60 page loads. No GPU launch argument outside `lib.mjs`'s cited M-2m witness, no `getContext()`, no browser MCP, no `screencapture`. One heavy run at a time. No `guarded` refusal fired, and none on the kernel zone count.
- Screenshot loops stayed thin. The F-1 frames are two dark cells per arm per engine, and the drift and motion windows are the battery's own.
- Nothing is left running. The worktree is removed and pruned, `…/D3/p12/battery11/` is gone, and no background process of this seat remains (`rec/teardown.log`).

## 9 · Records

`BV11-records/`:
- runs: `phases.log`, `setup.log`, `build.log`, `battery-cr.time`, `battery-cr.out`, `fv11-run-chromium.log`, `wk-admission.log`, `wk-battery.out`, `fv11-run-webkit.log`, `fv11-witnesses.log`, `fv11-results/` (every witness's full log), `verbose/`, `baseline-fv11.{md,json}`, `baseline-diff-fv6-fv11.txt`, `cr-chain.out`, `wk-chain.out`;
- readings: `readings.log`, `M-9-{chromium,webkit}.log`, `M-9-r32-{chromium,webkit,both}.log`, `M-6-q1a-*.log`, `M-1x-q11a-*.log`, `W-A-q11a-*.log`;
- F-1: `frames.log`, `frames-*-capture.log`, `frames-M-9-r32-{fv11a,fv11}-{chromium,webkit}-1.log`, `compose.log`, `compose-chromium.log`;
- plants: `plants-run.log`, `plants-{chromium,webkit}.log`, `floor-plants-{chromium,webkit}.log`, `plants/` (each reading and `readings.log`), `plants-diff-fv6-fv11.txt`, `plant-notone*.log`;
- demo: `demo-cr.log`, `demo-fv11-*.{log,json}`, `critdemo-fv11-chromium.{log,json}`, `demo-frames/`;
- re-runs: `rerun-chromium.log`, `rerun-chromium{1,2}-*.log`, `rerun-webkit.log`, `rerun-wk-chain.out`, `rerun-webkit{1,2}-*.log` (including `rerun-webkit{1,2}-m9-r32.log`);
- `teardown.log`.

The pass-12 files this seat wrote: `BV11-run.sh`, `BV11-frames.mjs`, `BV11-plant-r32-notone.css`, `BV11-records/`, `frames-Q14/` and this file.
