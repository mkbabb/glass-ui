# D3 · pass 13 · CRITIC: floor v11 and the minor v10, read adversarially on fresh bytes and fresh paint

| field | value |
|---|---|
| seat | D3 pass 13, the fresh adversarial critic (REGISTRY P12-6.3 step 4). It authored nothing in D3 pass 13. It checks the base claim, the identity proofs, H13's plants (above all R-37's guard plant), the 44 rows in both engines, R-32 (i)-(iii) under R-38 in Chromium, O-87, and the minor's W-0.1 G1-G7 and W-0.11 G1-G6. It adds no row |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | **(a).** The worktree was cut at `c8ffc41a7` (the minor v10 re-measure bank, docs only). `git diff --stat 1da7eb17b HEAD -- src demo tests package.json` prints nothing, and so does the wider list (`crit-records/setup.log`). `release/10.1.1` and `release/10.1.2` are not ancestors of HEAD (`merge-base --is-ancestor` exit 1 for both). At close, master is `64cfe94cc` (a D5 docs commit), and the base diff still prints nothing |
| rulings read | `audit/INBOUND.md` at start and at close: 61 `O-` rows; O-102b, O-103, O-103a and O-103b stand. No F-1′ decline, no D-1′ or C-2 answer, no override of R-37. `FORMATION-PROGRESS.md` at close: the newest D3 line is the 21:25 minor v10 bank, and the newest line overall is D5 P-A5 (21:40). None of them rules D3 |
| driver | `pass-13/crit-run.sh` (phases `setup compose static selftest same cr wk offspot teardown`). It adds three files of the critic's own: `crit-plant-r37-1pct.css` (R-37's live guard plant), `crit-engine-witness.mjs` (is R-37's premise an engine fact?) and `crit-hues-interior.mjs` (FIELD's multi-hue tails away from the band edges). Records are in `pass-13/crit-records/` (46 files) |
| engines | Chromium 149.0.7827.55, the headless shell with no launch arguments. **Playwright WebKit 26.5**, headless, H-14 shim. Playwright WebKit is not Safari. **Every real-Safari cell: UNMEASURED (owner's safaridriver checkbox)** |
| fences | No tracked source edit and no git write in the checkout. Worktree `.claude/worktrees/bl/D3/p13/crit/wt`, `node_modules` symlinked; `D3_OUT`, the builds and the captures were inside it. It was removed with `--force` and pruned, and `…/D3/p13/` is gone (`teardown.log`: 0 worktrees naming `D3/p13/crit`; `.claude/worktrees/bl/D3/` holds `p3 p5 p6`). No process left running. The checkout's only writes are this file, the four critic files above and `crit-records/` |

Short citations: `H13` (`pass-13/H13.md`), `FR13` (`pass-13/FLOOR-V11-REMEASURE.md`), `MS10R` (`pass-13/MINOR-SPLIT-v10-REMEASURE.md`), `rec/x` (`pass-13/crit-records/x`).

---

## 0 · Verdict

- **Floor v11: 44/44 PASS, 0 open, every cell admitted. Pass 13 is clean. With pass 12, that makes two consecutive clean passes,** so D3 converges on floor v11 if the agglomeration agrees (P12-6.5).
- **Raw identity, re-proved in one session:** floor v11 CSS `4f56c2631ab5cdd4` (391,252 B), floor v11a `347288745da7cf97` (391,121 B), minor v10 `e11613c3eeb45cab` (398,432 B). Compositions `cmp` exit 0 (floor v11a + `FV11-r32.diff` = floor v11; minor v9 + both pass-11 deltas = minor v10). LIGHTPROOF PASS. Light arm 0 px differ in both engines.
- **R-37's guard bites on the smallest live plant I could make.** A 1 % black dark-veil background moves the WebKit spot by one 8-bit step (`#e87237 → #e57136`) and the page by nothing. M-9 reads `spot 0/2400 … → GATE`, and the reds count: `FAIL (5 of 16)` (2 are the light cells the dark-only plant leaves out).
- **R-37's premise is an engine fact, not a rejected declaration** (new witness, §2.2). Playwright WebKit 26.5 resolves the veil's dark chain in full (`blur(18px) saturate(1.5) contrast(1.03) brightness(0.8)`, prefixed and unprefixed). On a minimal page it paints neither `blur(8px)` (stripe luma sd 127.38 inside vs 127.34 outside) nor `brightness(0.5)` (mean 134.83 vs 134.83). Chromium paints both (sd 15.66 vs 127.5; mean 67.45 vs 134.83).
- **FIELD's multi-hue tails come mostly from blur across the band edges** (§3), which FR13 had read without testing. At 36 px or more from an edge, every band keeps chroma (C× p05 1.074-1.140, 0 % past (ii)). Violet and blue hold hue (|Δh| p95 2.8°, 0.6°). Teal still reads p95 3.7° with 18.2 % past 3°, and that share is still falling with distance. Reported (R-39), never gated.
- **The minor v10:** W-0.1 G1-G7 and W-0.11 G1-G6 PASS (§5).
- **0 false lines found** in H13, FR13 or MS10R. Two readings are corrected or sharpened in §6; neither is a printed source line, so R-21 (b) has nothing to send to a comment-only build.

---

## 1 · Bytes, static, toolchain witnesses (`rec/setup.log`, `compose.log`, `static.log`, `same.log`, `selftest.log`)

| check | reading | equals |
|---|---|---|
| `git apply --check` at HEAD | floor v11a exit 0 (`08c13d4e`, 88 files); floor v11 exit 0 (`8f838dcf`, 89); minor v10 exit 0 (`2aa0e5c9`, 61) | the banks |
| compositions | both `cmp` exit 0; `FV11-r32.diff` touches `focus-veil.css`, `dark-arm.css`, `glass.css`, `focus-veil.test.ts` only | P12-1.1 |
| specimen CSS (21:31:46-21:31:49, load 23.7-24.7) | fv11 `4f56c2631ab5cdd4` · fv11a `347288745da7cf97` · minor10 `e11613c3eeb45cab` | FR13, MS10R, pass 12 |
| LIGHTPROOF | `PASS: 5 differing declarations, 0 outside the dark arm, the chain and the light tone` | FR13 |
| the list (R-21 (b), R-34) | floor v11 **PASS 207** (197 true, 10 reported) under `FV11-rulings.json`; minor v10 **PASS 368** (347 true, 21 reported) under `crit-ms9-rulings.json` | FR13, MS10R |
| DEL · HOV · census | DEL PASS 101 · HOV PASS 58 · census `0 0 0 0` on floor v11 and on the minor v10 | FR13, MS10R |
| LAW | PASS 103. FR13 read 100 and MS10R 101. The extra rows are this seat's `crit-run.sh` and `crit-engine-witness.mjs` in LAW's `pass-13/` root, and both pass | — |
| selftest H12-1, H13-1..H13-4 | **`SELFTEST PASS: 78 expectations met`** (32 + 46), load 29.8-30.3 | H12 32/32, H13 46/46 |
| the tone token's writers | `dark-arm.css:300-301` (`-dim: transparent`, `-tone: saturate(...) contrast(1.03) brightness(0.8)`), `glass.css:120-121` (light): one writer per mode | — |
| composers of `.glass-focus-veil` | `Slider.vue:288`, `ModalOverlay.vue:74`: R-36's two | P12-1.1 |

**R-34's scope on rebase lines: nothing to read.** Base (a) holds, so no patch was rebased and no rebase line exists. `floor-v11.patch:1266`'s trailing whitespace is still the one `git apply` warning, and it stays a W-H.2 landing-docs item.

---

## 2 · Row 12, row 19, row 23: R-32 under R-38, R-37's guard, and its premise

### 2.1 · The thin captures (`rec/capture-{chromium,webkit}.log`, `rec/M-9-r32-*.log`)

| capture | Chromium (gate), `--r32` | Playwright WebKit, `--r32` |
|---|---|---|
| **floor v11** | **`PASS (24 gated rows)`**: spot `#ec9642 → #cc740c` (L 0.748→0.643, C ×1.037, \|Δh\| 1.4°, ΔL −0.105); page `#0b0a09 → #060504` ΔL −0.029 (21:41:35, load 24.9) | **`PASS (20 gated rows)`**, R-37 `raw = veiled to the bit, spot 2400/2400, page 2400/2400 → REPORT … 4/4` (22:08:41, load 25.7) |
| floor v11a (R-2, the control) | `FAIL (1 of 24)`: (ii) 0.829 | `FAIL (1 of 24)`: (ii) 0.662; R-37 `0/2400 … GATE` (the 40 % background paints) |
| **tone plant** (`BV11-plant-r32-notone.css`) | `FAIL (6 of 16)`: spot ΔL **+0.010** (iii) ✗ and dims ✗; page ΔL **−0.000** (iii) ✗ (R-38) and dims ✗; 2 MISSING light cells | `FAIL (2 of 12)`: the 2 MISSING light cells only; R-37 REPORT 4/4 (the plant is a no-op in an engine that paints no chain) |
| **critic's R-37 plant** (`crit-plant-r37-1pct.css`) | `FAIL (2 of 16)`: the 2 MISSING light cells only; spot −0.112, page −0.038, R-32 passes | **`FAIL (5 of 16)`**: R-37 `spot 0/2400 px raw = veiled (2400 px veiled ≠ raw), page 2400/2400 → GATE`; spot dims ΔL −0.006 ✗, page dims +0.000 ✗, page (iii) 0.000 ✗; 2 MISSING light |

Every number on floor v11 and floor v11a equals FR13 and BV11 to the hex. The tone plant reds the page at −0.000, which is R-38's whole point. The red count differs from FR13's `4 of 14` only because my capture took the dark state cells straight from `capture.mjs`, not through FV3's table, so 2 MISSING light rows enter the count. The ✗ rows are the same four.

**The guard plant.** H13's self-test plants one laid-out pixel. FR13's live plant is `plant-R2`, a 10 % scrim that also reds (ii) and the page. Mine is about the smallest change that still moves a bit: it leaves the page bit-identical and moves the spot by 3/2/1 in the encoded channels. The guard read it on the spot alone and turned every dark-veil leg back into a gate, with the reds counting. That is O-103b's last clause in live paint, on the cell of record. **R-37 cannot hide a regression that paints anything under the dark veil in this engine.**

### 2.2 · R-37's premise: engine fact or dead declaration? (`rec/engine-witness-{chromium,webkit}.{json,log}`)

O-103b's words are "WebKit headless paints no backdrop-filter". If Playwright WebKit painted `backdrop-filter` elsewhere but dropped the veil's chain (say, a token the engine rejects at computed-value time), raw = veiled would be a dead primary dressed as an engine fact (E-2), and real Safari might paint no veil either. The witness separates the two cases. It used one browser per engine and a fresh context per cell, with everything closed in a `finally`.

| cell | Chromium 149 | Playwright WebKit 26.5 |
|---|---|---|
| `blur(8px)` over 4 px stripes: computed · luma sd inside / outside | `blur(8px)` · **15.66 / 127.5** (painted) | `blur(8px)` (both properties) · **127.38 / 127.34** (not painted) |
| `brightness(0.5)` over `#e87237`: mean inside / outside | **67.45 / 134.83** (painted) | **134.83 / 134.83** (not painted) |
| the veil in dark, specimen CSS of floor v11: computed | `blur(18px) saturate(1.5) contrast(1.03) brightness(0.8)` over `rgba(0, 0, 0, 0)` | the same chain on `backdrop-filter` **and** `-webkit-backdrop-filter`, over `rgba(0, 0, 0, 0)` |
| the veil in light | `blur(18px) saturate(1.5)` over `oklab(0.216 0.003 0.005 / 0.1)` | the same |

**The premise holds.** The engine resolves the veil's chain and paints no backdrop filter at all, the veil's or a bare one. R-37's REPORT is a statement about the engine, not about the veil. What it still cannot see is in §7 (C-5).

### 2.3 · Row 23 under R-32, O-103b and R-37

(i) 1.4° ≤ 3°, (ii) ×1.037 ≥ 0.95 and (iii) −0.105 / −0.029 (non-zero at 3 decimals) all pass in Chromium. The WebKit legs are reported with the fact confirmed in the same capture, as R-37 requires. F-1 is accepted (O-103b), frames 2-4 are accepted (O-103a), and no F-1′ decline is in INBOUND. **PASS.**

---

## 3 · FIELD and the multi-hue tails (`rec/field-chromium.log`, `rec/hues-interior-chromium.log`)

My FIELD reading equals FR13's to the digit: aurora field 35,616 px, C× p05 1.031 / p50 1.044, |Δh| p95 1.674°, 0 % past (i)-(iii); multi-hue cell C× p05 0.897, |Δh| p95 27.6°, 44.7 % past 3°. FR13 §4 put the tails down to blur mixing across the 96 px band edges but did not test it. `crit-hues-interior.mjs` rebuilds field-reader's mask and reads the same pixels by distance from the band edges (no browser, load 22.3):

| edge distance | violet 295° · C× p05 · \|Δh\| p95 · past 3° | blue 260° | teal 185° |
|---|---|---|---|
| ≥ 0 px (FIELD's reading) | 0.806 · 17.0° · 61.1 % | 0.925 · 9.9° · 21.7 % | 0.910 · 36.5° · 58.3 % |
| ≥ 12 px | 0.990 · 8.7° · 48.9 % | 1.078 · 3.6° · 9.1 % | 0.945 · 18.3° · 47.7 % |
| ≥ 24 px | 1.105 · 4.4° · 23.9 % | 1.110 · 1.7° · 0.0 % | 1.035 · 5.1° · 26.6 % |
| ≥ 36 px | **1.125 · 2.8° · 1.2 %** | **1.140 · 0.6° · 0.0 %** | **1.074 · 3.7° · 18.2 %** |

Reported, never gated (R-39):
- **Chroma is kept on every off-orange hue away from the edges.** (ii)'s share is 0 % in every band from 24 px inward, and median chroma rises (×1.10-1.19). FV11's model figure for these hues (C× 0.900-0.934) is **wrong in direction**: it describes the edge-mixed tail, not the arm.
- **Violet and blue hold hue within 3°** at 36 px (blur(18px)'s 2σ).
- **Teal does not settle in this reading.** At 36 px it still has p95 3.7° and 18.2 % of pixels past 3°, and the share is still falling (58 → 48 → 27 → 18 %). Some of that is residual blur and some may be the encoded-sRGB chain turning a low-chroma hue (raw C 0.08). An edge-free cell (one hue per capture) would separate the two. That is C-6, and it matters only if the owner extends O-103a beyond the spot (C-2).

---

## 4 · The 44 rows

I re-measured the cells I had reason to doubt: everything that R-32, R-37 and the light arm touch, in both engines (§1, §2). I took the rest from FR13's full battery after checking its records. I re-read the M-9, R-32 and R-37 lines in `FR13-records` (battery, both re-runs, the thin capture, the tone plant ×3, plant-R2's GATE) and the baseline `diff` (one line, `FAIL 2/10 → PASS 8`, H13-4's form). The admissions log shows each WebKit group admitted within 31 min. My own WebKit group was queued at 21:42:39 and admitted at 22:07:40 (25 min), so **no cell is owed.** No battery red needed a re-run here: every red FR13 lists was re-run twice there at loads 11-31 and is BV11's to the value (M-2h 2/68 = N-3, M-6 under `--q1 a`, WebKit M-3 light checker 2/177, WebKit M-8 dark stripes 1/4).

| # | row | status | basis |
|---|---|---|---|
| 1, 2, 4, 5, 7, 8, 10, 13-18, 21, 24 | RAW … STACK | **PASS** | FR13 §5, §8; bytes re-proved here |
| 3 | M-1x | **PASS (ruling)** | O-103 Q-11 (a); FR13 `--q11 a` both engines |
| 6 | M-3 | **PASS** | Chromium 177/177; WebKit's 2 light checker rings are FV6's |
| 9 | M-6 | **PASS (ruling)** | O-103 Q-1 (a); `--q1 a` 88 both engines |
| 11 | M-8 (+ toolchain) | **PASS** | FR13 toolchain (vitest 237 files, 2318 passed) and MS10R (239, 2321); unit plant reds the two arm assertions |
| **12** | M-9, the dark veil signed | **PASS** | §2.1: Chromium page −0.029, spot −0.105; WebKit dark legs REPORT with the fact confirmed; the guard gates on a 1 % plant |
| **19** | plants | **PASS** | tone plant reds (iii) on spot and page (§2.1); R-37 live plant reds through the guard; FR13's carried plants equal BV11's line for line |
| **20** | prose sweep | **PASS** | R-21 (b), R-34: list 207 re-run here; 0 false lines in H13/FR13/MS10R |
| **22** | O-87 | **PASS** | census `0 0 0 0` (fv11, minor10); one blur in the veil's one chain; `-dim: transparent`, so no layer; no glow, no box-shadow in `focus-veil.css` (`static.log`) |
| **23** | gestalt, O-62 frame | **PASS** | §2.3 (O-103b) |
| FL-1..FL-11, FL-13..FL-16 | the floor | **PASS 15** | FR13 §8; FL-6 the dark veil reads no ink |
| FL-12 | prose sweep | **PASS** | as row 20 |
| N-1, N-2 | Q-1, Q-11 | **PASS (ruling)** | O-103 |
| N-3 | the dock's held halo | **PASS (attributed)** | FR13 §7 |
| N-4 | the minor's W-0.1 reading | **PASS** | §5 |

**Count: 44 PASS, 0 OPEN, every cell admitted. None added, struck or renamed.**

---

## 5 · The minor v10 (minor_gates)

| gate | verdict | basis |
|---|---|---|
| W-0.1 G1 (M-1) | **PASS** over paper; off paper accepted (O-103) | carried on raw identity, re-proved here (`e11613c3eeb45cab`) |
| G2, G3 (O-66 field, row) | **PASS** | carried; HOV 58 read here |
| G4 (W-A light) | **PASS** | carried |
| G5 (scope) | **PASS**: roster 289 = 289, `terminal CLEAN` with the datum rebound; the ratchet owes +2,333 B (a landing item) | MS10R §4 (not re-run here: no source byte of the minor differs from MS10R's, `cmp` and the CSS hash) |
| G6 (dark untouched, per R-9) | **PASS** | carried |
| G7 (M-2, M-3 no regression) | **PASS** | carried |
| W-0.11 G1-G3 | **PASS**: `LIGHTING-CENSUS stacked=0 halo=0 blur=0 open=0` on the minor v10 | `static.log` |
| W-0.11 G4 (exits clean and still bites) | **PASS**: published v10.1.0 `src/styles` reads `stacked=2 halo=2 blur=5 open=9` | `census-v1010-bite.log` (22:10:04, load 23.0) |
| W-0.11 G5, G6 | **PASS** | as G5; carried |

The list reads PASS 368 here as well. Shipping still waits on the P12-3.3 items: D2's convergence, the `release/10.1.x` merge and the minor's rebase with its own battery, and the landing items.

---

## 6 · Readings corrected or sharpened (no source line false)

- **FR13 §4 / §9** ("the tails look like blur mixing across the band edges"): now measured (§3). True for chroma in every band and for hue in violet and blue. For teal it is only partly true.
- **P12-2.2 R-39 and H13 §3 item 3** cite FV11's model, "C× 0.900-0.934 and 4-5° off-orange". The model's chroma figure is the edge-mixed tail. Measured at band interiors, chroma rises (×1.07-1.19). The next registry part should print the measured interior figure beside the model's, under P-3 (one source of record per fact).
- **LAW's count** grows with every driver in `pass-13/` (100, 101, 103). That is not a defect, but no record should quote a LAW count without naming its root.

---

## 7 · Next-pass classes (no row added)

| id | class | evidence | suggested placement |
|---|---|---|---|
| **C-5** | R-37's fact reads only raw = veiled. It cannot tell "the engine paints no backdrop-filter" from "the veil is not engaged or its chain is dead in this engine". Today the engine witness shows the former, but that witness is not part of M-9. If a future Playwright WebKit painted backdrop-filter while a WebKit-only regression dropped the veil's chain, M-9 would still REPORT | §2.2 | instrument: join `crit-engine-witness.mjs`'s bare-blur cell and the veil's computed chain to R-37's fact (REPORT only if the bare blur is unpainted **and** the veil's computed `backdrop-filter` is the chain), with a plant for each half |
| **C-6** | FIELD's multi-hue cell mixes hues at 96 px band edges, so its tails measure geometry. Teal (raw C 0.08) still reads p95 3.7° at 36 px | §3 | instrument: one hue per capture (no edges in the veil's reach), reported under R-39; only matters if C-2 is answered yes |
| — | FV11's off-orange model figure is the edge tail | §6 | registry text (P-3) |

---

## 8 · Machine law, kept (`rec/phases.log`, `rec/wk-admission.log`)

- Every phase ran through `~/.claude/guard/guarded`. `setup compose static selftest offspot teardown`, the hues reader and the census bite ran `--light` with no browser. `same` (builds) and `cr` (Chromium, headless shell, no launch arguments) ran heavy, one at a time.
- The WebKit group was its own `--exclusive webkit --timeout 60` admission: queued 21:42:39 (load 21.1), admitted 22:07:40 (17.5), exited 22:09:21 (22.3). 9 page loads, so no restart was needed (H3-1's 60). No `--light` run was started while it waited. The reads of its captures (`offspot`, `hues-interior`) ran after it ended.
- One browser per run with a fresh context per cell (`capture.mjs`, `crit-engine-witness.mjs`), and every page, context and browser was closed in a `finally`. No `getContext()`, no screencapture, no browser MCP, and no PNG kept outside the worktree.
- No `guarded` refusal fired, including none on the kernel-zone count. Loads ranged 17.5-34.
- The worktree is removed and pruned, `…/D3/p13/` is gone, and 0 processes of this seat remain.
