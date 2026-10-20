# D3 · pass 12 · the critic: floor v11 and the minor v10 (P11-6.3 step 5)

| field | value |
|---|---|
| seat | D3 pass 12, CRITIC. One fresh adversarial seat that authored nothing in D3. It reads R-32's build against O-103a's words and O-87, the light-byte identity, H12-1's plant and fixture, the battery's 44 rows in both engines, R-34's scope and every new printed line under R-26 and R-36, and the minor v10 on W-0.1 G1-G7 and W-0.11 G1-G6. It may not add rows |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | **HEAD of master at launch, `d72744360`** (the minor v10 bank, docs only). `git diff --stat 1da7eb17b HEAD -- src demo tests package.json scripts tests-visual vite.targets.ts .bundle-ratchet .published-roster DESIGN.md docs/canon` prints nothing (`crit-records/setup.log`), so every tree is the published 10.1.0 source plus the named patch. **`release/10.1.1` is NOT merged during pass 12** (P11-5: the merge waits until this pass's floor seat banks) |
| rulings read | `audit/INBOUND.md` at start and at close (17:21): O-102b, O-103, O-103a and **O-103b** (`value-js-ed`, the delegate's successor after the 2026-10-20 reboot): **F-1 ACCEPTED** on `frames-Q14/chromium-dark-aurora-state-veil-r2-vs-r32.png`, row 23 closes on R-32 with frames 2-4, and the Playwright WebKit dark-veil legs (R-32 (iii), M-9's dark rows, row 12's dark-signed leg) are **engine-fact reports**, with Chromium the paint gate for this arm. No newer D3 row. `FORMATION-PROGRESS.md` at close: its newest lines are D5's and D2's harness banks (16:20, 17:00); neither is a D3 ruling. `value-js-ed`'s standing rests on the same record reading as `value-js-a9`'s (O-102b, P11-4 D-1); this critic reads it as the delegate's, as the cursor (14:50) and the minor seat did |
| driver | `crit-run.sh` (this directory), phases `setup compose static same cr wk offspot selftest units teardown`, each `~/.claude/guard/guarded …`. `--light`: setup, compose, static, selftest, units, offspot, teardown (no browser). Heavy: `same` (vite builds, `--timeout 30`), `cr` (Chromium, `--timeout 60`). **`wk`: `--exclusive webkit --timeout 60`, one admission.** Tool: `crit-offspot.mjs` (this directory; no browser). Records: `crit-records/` |
| engines | Chromium 149, Playwright's headless shell, **no launch arguments**. **Playwright WebKit**, headless, with H-14's shim, one browser per run, fresh context per cell (`capture.mjs`); 8 page loads, far under the 60-load restart. **Every real-Safari cell: UNMEASURED (owner's safaridriver checkbox)**; O-103/O-103b retire it under the machine law |
| fences | No tracked source edited, no git write in the checkout. The worktree `.claude/worktrees/bl/D3/p12/crit/wt` was cut at HEAD with `node_modules` symlinked; `D3_OUT`, every vite cacheDir and every build lived inside it. It was removed with `--force`, pruned, and `…/D3/p12/` deleted (`teardown.log`: 0 worktrees naming `D3/p12/crit`; `.claude/worktrees/bl/D3/` holds `p3 p5 p6`). Checkout writes: this file, `crit-run.sh`, `crit-offspot.mjs`, `crit-records/` |

Short citations: `OWED`, `H12`, `FV11` (`FLOOR-V11.md`), `BV11` (`BATTERY-V11.md`), `MS10` (`MINOR-SPLIT-v10.md`), `REG` (`REGISTRY.md`, P11-n). `rec/x` = `crit-records/x`.

---

## 0 · Verdict

- **Floor v11: 44/44 PASS, 0 open. Pass 12 is clean, the first of two.** Row 23 closes: R-32 (i)-(iii) PASS in Chromium, the paint gate O-103b names; the Playwright WebKit legs read "WebKit headless paints no backdrop-filter; raw = veiled" (re-measured here, 4 of 4 rows, the fifth independent reading); F-1 is in INBOUND (O-103b). Every other row holds on the bytes I rebuilt.
- **R-32 is built to O-103a's words and to O-87.** It dims by lightness and keeps chroma, measured by me over the **whole veiled field**, not only the probe: 40,824 chromatic pixels, C× p05 1.030 / p50 1.043, |Δh| p95 1.6°, ΔL p95 −0.052 (all dim). R-2 on the same pixels: C× p50 0.906, 93.7 % of pixels under 0.95. One filter chain, no layer, no second blur, no glow, census `0 0 0 0`.
- **Light bytes stand in paint, not only in tokens:** every light `raw` and `full` PNG of floor v11a and floor v11 is pixel-identical in both engines (0 px differ, max channel Δ 0), and the light proof re-runs PASS.
- **No false printed line.** R-32's 43 written lines and its 95-line neighbourhood read true under R-26, R-34 and R-36 (§4). No delta is proposed. Two landing-docs items only.
- **The minor v10: W-0.1 G1-G7 and W-0.11 G1-G6 all PASS, carried** on its specimen CSS `e11613c3eeb45cab`, rebuilt here and equal to the bank.
- **No new row, no reopened row.** Four classes go to the next pass (§7).

---

## 1 · The builds, re-proved (`rec/setup.log`, `compose.log`, `same.log`)

| check | read | at, load (1 min) |
|---|---|---|
| `git apply --check` at `d72744360` | floor-v11a `08c13d4e` (88 files), floor-v11 `8f838dcf` (89), minor-split-v10 `2aa0e5c9` (61): **exit 0 each** | 15:27:57, 35.5 |
| floor v11a + `FV11-r32.diff` = floor v11 | **`cmp` exit 0**; the patch-of-patches moves exactly the 4 files R-32 names (`focus-veil.css`, `dark-arm.css`, `glass.css`, `focus-veil.test.ts`) | 15:28:05, 34.1 |
| minor v9 + `MS9-seat-proposed` + `crit-minor-proposed` = minor v10 | **`cmp` exit 0**; the patch-of-patches is the 4 comment lines MS10 §1 prints, nothing else | 15:28:05 |
| specimen CSS, one session (heavy; queued ~30 min) | **fv11 391,252 B `4f56c2631ab5cdd4`; fv11a 391,121 B `347288745da7cf97`; minor10 398,432 B `e11613c3eeb45cab`**: each equals its bank (FV11 §3, OWED §1.2, MS10 §2) | 15:58:05-09, 21.8 |
| `FV11-lightproof.py` on this session's CSS | **`LIGHTPROOF PASS`: 5 differing declarations, 0 outside the dark arm, the chain and the light tone**; light `backdrop-filter`, `-webkit-backdrop-filter` and `background` resolve identical (`blur(18px) saturate(1.5)`, `color-mix(in oklab, #1c1917 10%, transparent)`); dark `blur(18px) saturate(1.5) contrast(1.03) brightness(.8)` over `transparent` | 15:58 |
| `focus-veil.test.ts` on floor v11 (jsdom, `--light`) | **19/19** | 15:58:34, 27.1 |

The inherited trailing whitespace at `floor-v11.patch:1266` warns again; it is floor v10's (OWED §1.1) and a landing-docs item.

---

## 2 · R-32 against O-103a's words and O-87

### 2.1 · The paint, both engines, re-run (`rec/capture.log`, `M-9-r32-*.log`)

The state scene over aurora and paper, both themes, floor v11a (R-2) and floor v11 (R-32), one capture per build per engine.

| engine | when, load | build | spot raw → veiled | (i) | (ii) | (iii) spot / page | verdict |
|---|---|---|---|---:|---:|---|---|
| Chromium | 16:08:42, 23.3 | R-2 | `#ec9642 → #99560a` | 1.2° | **0.829 ✗** | −0.226 / −0.025 | `FAIL (1 of 24)` (the plant reads as H12 says) |
| Chromium | 16:09:11, 19.5 | **R-32** | `#ec9642 → #cc740c`, L 0.748 → 0.643, C 0.142 → 0.147, h 61.8 → 60.3° | **1.4°** | **1.037** | **−0.105 / −0.029** | **`PASS (24 gated rows)`** |
| Playwright WebKit | 16:55:16, 23.5 | R-2 | `#e87237 → #8b4421` | 0.4° | 0.662 ✗ | −0.210 / −0.022 | `FAIL (1 of 24)` |
| Playwright WebKit | 16:55:45, 25.0 | R-32 | `#e87237 → #e87237`, page `#0b0a09 → #0b0a09` | 0.0° | 1.000 | **0.000 ✗ / 0.000 ✗** | `FAIL (4 of 24)`: (iii) ×2 and M-9's two dark dims rows |
| real Safari | — | — | — | — | — | — | **UNMEASURED (owner's safaridriver checkbox)** |

Every number equals BV11's to the hex. The Playwright WebKit reds are the engine fact BV11 read 4 of 4 at loads 4-11 and 40, now a fifth time at load 25 (queued 45 min for the lock, admitted 16:54:47). Under O-103b they are reports, worded **"WebKit headless paints no backdrop-filter; raw = veiled"**, not gates.

### 2.2 · Beyond the probe: the whole veiled field (`crit-offspot.mjs`, `rec/offspot-*.log`)

R-32 gates the 60 × 40 probe's mean. O-103a's words are general, so I read every pixel. The mask is where floor v11a's dark paper veil dims (ΔL ≤ −0.015), minus the spec and probe boxes dilated 48 px. The raw aurora is the same ground for both builds (0 of 1,152,000 px differ).

| Chromium, dark aurora field (40,824 px, raw C ≥ 0.04) | C_v/C_r p05 · p50 · p95 | \|Δh\| p95 | ΔL p05 · p50 · p95 | per-pixel share that would fail (i) / (ii) / (iii) |
|---|---|---:|---|---|
| R-2 | 0.835 · 0.906 · 0.952 | 1.6° | −0.226 · −0.161 · −0.112 | 0 % / **93.7 %** / 0 % |
| **R-32** | **1.030 · 1.043 · 1.058** | **1.6°** | **−0.105 · −0.076 · −0.052** | **0 % / 0 % / 0 %** |

By raw hue: 30-60° (19,178 px) C× p50 1.037, ΔL −0.071; 60-90° (21,646 px) C× p50 1.050, ΔL −0.080. So **"dims by OKLCH lightness, keeps chroma" holds on every pixel the veil covers**, not only on the mean. It reads per-pixel and is never a gate (R-32 gates the spot). Playwright WebKit: R-2 C× p50 0.733 (100 % < 0.95), R-32 1.000 (raw = veiled).

**The one limit.** The veiled field carries only raw hues 30-90°. FV11 §2.2's model predicts more drift off orange (violet `#8a5cf6` 5.0°, C× 0.934; blue `#3b82f6` 4.3°, 0.900). That comes from the medium's `saturate(1.5)` clipping, which the light veil and every rung already carry. No capture here paints those hues under the veil. **Reported, not a row:** O-103a's words name the orange spot, and O-103b accepted on it. It is placed in §7 (C-2).

### 2.3 · Against the words, clause by clause

| clause | reading | verdict |
|---|---|---|
| "dim by OKLCH lightness" (O-103a) | ΔL −0.105 spot, −0.029 page; every field pixel dims | **met** |
| "keep chroma" | C× 1.037 spot, ≥ 1.030 on 95 % of the field | **met** |
| "the spot stays orange and quieter, not brown" | h 60.3° (R-2 60.5°); C up, not down; the depth is half of R-2's. The owner's eye ruled it: O-103b accepts | **met (ruled)** |
| R-32: "changes R-2 alone (`dark-arm.css:294` and the one chain at `focus-veil.css:72-74`)" | the build adds one token, `--glass-focus-veil-tone`, declared light (the chain's old bytes) and dark. That is how the dark chain differs without an engine or theme branch inside `focus-veil.css`. It touches only R-2's declaration and the chain. The light token resolves to the old chain (§1), so it is a carrier, not a second writer. | **met** (P-1: one writer of the dim per theme: the background in light, the chain in dark) |
| "no new layer, no second blur, no glow" (R-32, O-87) | census `stacked=0 halo=0 blur=0 open=0` (`rec/static.log`); one `blur()` in the chain; no pseudo-element, no shadow; `contrast()` and `brightness()` are tone terms in the existing chain | **met** |
| O-87 "flatter, slightly less blur" | the blur radius is unchanged (`--glass-focus-veil-blur` = the floating rung, 18 px; the ladder `diff` is empty). R-32 is a dim arm and has no blur mandate; O-87's blur clause rides W-0.11's token wave | **no conflict** |
| E-2, no masking fallback | `-dim: transparent` leaves no background term to mask a dead chain. In an engine that paints no `backdrop-filter`, the dark veil paints nothing and reads raw = veiled: the fail is loud, as Playwright WebKit shows. FV11 §2.3's refusal of a 5 % black hybrid is upheld: it would have been a second writer that only the non-painting engine reads | **met** |
| reduced transparency / forced colours | `focus-veil.css:170-177` removes the veil outright; unchanged by R-32 | **unchanged** |

---

## 3 · H12-1, its plant and fixture (`rec/selftest-h12.log`, 15:39:37, load 17.7)

- **`SELFTEST PASS: 32 expectations met`**: the R-2 plant `FAIL (1 of 14)` at (ii) 0.832 / 0.662, the fixture arm `PASS (14)`, the hue, brightening-page and no-spot plants, GAMUT 12/12, FRAME1 ×3.
- **On live bytes:** R-2 still reads (ii) FAIL wherever floor v11a is captured (0.829 Chromium, 0.662 Playwright WebKit, §2.1), and R-32 PASSes. H12 §2.4 asked for exactly this.
- **H12 §2.1's fixture departure is upheld.** P11-5 named frame 1 as `#ec9642 → #99560a`. Frame 1's own pixels are pass 5's WebGPU ground, `#e87237 → #993f09`. The registry conflated two grounds, and H12 checks frame 1 against its own bank and prints the gap. The F-1 frame BV11 banked pairs R-2 and R-32 on one ground per engine, as H12 asked.
- **The F-1 frames' hashes** equal BV11 §3's: `b76658f5…773f` (Chromium) and `f83d97b2…cf06` (Playwright WebKit). I viewed the Chromium frame. Panel 2 reads brown, and panel 3 reads a deeper, saturated orange. That is the frame O-103b accepts.
- **The instrument gap BV11 §4.2 names, confirmed on the record.** Under the tone plant the page reads ΔL −0.000, and R-32 (iii) on the page passes it. Only M-9's ≤ −0.02 floor catches the removed dim. Row 12 and row 19 hold because M-9 and R-32 run together, so this is not a row. It goes to §7 (C-1).

---

## 4 · The printed lines: R-26, R-34, R-36

**R-34's scope.** The build's delta (43 lines) and H11-2's print of the token it re-values (`rec/neighbourhood-r32.log`: `PRINT (95 lines in 3 files)`, the seat's figure). The 207 lines are not re-read. The list itself re-runs green: `PASS (207 lines: 197 ruled true, 10 reported)` under `FV11-rulings.json`, DEL `PASS (101)`, HOV `PASS (58)` (`rec/static.log`, 15:28, load 33.6).

| line (floor v11) | my reading |
|---|---|
| `dark-arm.css:289-290` "it dims by lightness and keeps chroma" | **true in paint** (§2.1-§2.2), over the field the veil covers. Off-orange hues are unmeasured (§2.2, C-2) |
| `:290-292` scrim ink L 0.216 above the page L 0.146, "+0.006 measured" | true, and carried |
| `:292-294` "40% read the aurora's orange focus spot as brown (C 0.142 -> 0.118, L -0.226)" | **true**: my R-2 reading is C 0.142 → 0.118, ΔL −0.226 |
| `:294-297` "paints no background and dims inside its one chain … `contrast(1.03)` lowers the near-black page most and `brightness(0.8)` scales the rest" | true. Contrast's shift is 0.03 × (0.5 − v), largest at v = 0. The page dims −0.029 against −0.025 for R-2 |
| `:297-299` "Predicted … the dark page L -0.030; the spot keeps its hue within 1.8 deg and its chroma at 1.04x, and drops L 0.090-0.105" | **true as a labelled prediction**, and the measurement bears it out: −0.029, 1.4°, ×1.037, −0.105. The −0.090 end belongs to the GL ground, which no engine here paints. The line now understates what is known, so it is not false. **Landing-docs item L-1:** restate it as measured (Chromium headless shell: page −0.029, spot 1.4°, ×1.037, −0.105; GL ground predicted). It reopens nothing (R-21 (b), R-34) |
| `glass.css:83-84`, `:107-115`, `:121` | true. FV11 §4.2's three first-draft fixes stand, and the "so" is now causal in the right direction |
| `focus-veil.css:16-18` "five values … with the chain's tone (`-tone`) as a sixth" | true: blur, core-x, core-y, bloom, dim, tone |
| `focus-veil.css:44-49` "the tone (… in the dark arm `contrast()` + `brightness()`) … no engine branch" | true: per theme, not per engine |
| `focus-veil.test.ts` titles and comments | true, 19/19 asserted |

**R-36, every consumer named.** I grepped `src demo tests docs/canon DESIGN.md README.md CHANGELOG.md` (`rec/static.log`). `.glass-focus-veil` has two composers, `Slider.vue:288` and `ModalOverlay.vue:74` (passed by `DialogContent` only; `SheetContent.vue:293` passes none). The other mentions are geometry or a sentence that stays true:
- `engageLadder.ts:192` "the world recedes behind the focus veil": it still dims in both themes.
- `property-regs.css:39`: the centre.
- `DialogContent.vue:192` and `SheetContent.vue:293`: the core geometry.
- `ModalOverlay.vue:6-13` "the scrim — DIM ONLY … the `backdrop-filter` leg is gone": this is the scrim's own leg, not the veil's, so it stays true.

`docs/canon`, `DESIGN.md`, `README.md`, `CHANGELOG.md` and `demo/` name no focus-veil dim. **No consumer sentence is falsified.**

**R-26 on BV11's and FV11's records:** the readings I re-ran agree to the hex. FV11 §2.3's "no arm the rulings allow could pass R-32 there" is upheld as argued (a flat source-over colour pulls every ground toward one colour), and O-103b took it.

**Count: 43 written + 95 printed lines read, 0 false. No comment delta is proposed.** Landing-docs items: L-1 above; L-2, `dark-arm.css:298` cites a tranche file (`FV11-model.py`) from shipped source. That has precedent in the floor (`veil.css:56`, `glass.css:49`, `dark-arm.css:282` cite "D3 pass n"), so it goes with that class to the landing docs pass, not to this build.

---

## 5 · The fixed checklist, floor v11 (O-102b, O-103, O-103a, O-103b; no variant selected)

Source of record: BV11 §6 for the battery, re-checked against `BV11-records/baseline-diff-fv6-fv11.txt` (one changed row: M-9 Playwright WebKit dark `PASS 10 → FAIL 2/10`, the engine fact), `plants-diff-fv6-fv11.txt` (exit 0) and `fv11-witnesses.log`. My own re-runs (§1-§4) cover rows 12, 19 (H12-1 and the tone plant's record), 20, 22, 23, FL-6, FL-12 and the light identity.

| # | row | status | evidence (P2-6.3: Chromium gates; Playwright WebKit is informational; real Safari UNMEASURED) |
|---|---|---|---|
| 1, 2, 4, 5, 7, 8, 10, 11, 13-18, 21, 24 | RAW … STACK | **PASS (16)** | BV11 §6. The witness tallies equal FV6's per column. Row 11: FV11 §6's toolchain, 2318 pass, plus 19/19 here |
| 3 | M-1x | **PASS (ruling)** | O-103 Q-11 (a); `--q11 a` PASS both engines |
| 6 | M-3 | **PASS** | Chromium 177/177. Playwright WebKit's 2 light checker rings are FV6's, re-run twice (BV11 §5) |
| 9 | M-6 | **PASS (ruling)** | O-103 Q-1 (a): `--q1 a` 88/88 both engines |
| **12** | M-9, the dark veil signed | **PASS** | Chromium `PASS (20)`, dark page −0.029, spot −0.105, re-run here. The Playwright WebKit dark leg is an **engine-fact report** (O-103b): raw = veiled |
| **19** | plants | **PASS** | Every FV6 plant reds as before. The R-32 tone plant reds 3/3 (`FAIL (5 of 16)`: spot ΔL +0.010, page by M-9). `plant-R2`'s margin of 0.003 is C-3 |
| **20** | prose sweep | **PASS** | R-21 (b), R-34: list PASS 207 re-run; R-32's 43 lines and 95 printed lines read, 0 false (§4) |
| **22** | O-87 | **PASS** | census `0 0 0 0` re-run; one blur, no layer, no glow (§2.3) |
| **23** | gestalt, O-62 frame | **PASS** | R-32 (i)-(iii) PASS in Chromium (the paint gate, O-103b). The Playwright WebKit legs are engine-fact reports (O-103b). **F-1 accepted (O-103b)**, with frames 2-4 accepted (O-103a). Field reading §2.2 |
| FL-1..FL-11, FL-13..FL-16 | the floor | **PASS 15** | BV11 §4.1, §6. FL-6: the dark veil reads no ink (`-dim: transparent`) and no plate token |
| FL-12 | prose sweep | **PASS** | as row 20 |
| N-1, N-2 | Q-1, Q-11 built | **PASS (ruling)** | O-103 |
| N-3 | the dock's held halo | **PASS (attributed)** | M-2h 2/68, the two halo legs, re-run twice (BV11 §5) |
| N-4 | the minor's W-0.1 reading | **PASS** | §6 |

**Count: 44 PASS, 0 OPEN = 1.000. Closed this pass: row 23 (O-103b). Opened: none.** The light arm is pixel-identical in both engines, so every light row carries.

---

## 6 · The minor v10, against W-0.1 G1-G7 and W-0.11 G1-G6

The bytes hold. The specimen CSS `e11613c3eeb45cab` was rebuilt here and equals the minor v9's (§1). The patch-of-patches is the four comment lines (§1). So every paint verdict carries (REG P11-3.1, MS10 §5.1).

| gate | verdict | basis |
|---|---|---|
| W-0.1 G1 M-1 | PASS over paper; off paper accepted and reported (O-103) | carried |
| G2, G3 O-66 | PASS | carried; HOV 58 |
| G4 W-A light | PASS 108/108 | carried |
| G5 scope | PASS (roster 289 = 289; the ratchet owes +2,333 B at landing) | MS10 §4 |
| G6 per R-9 | PASS | carried |
| G7 M-2, M-3 halves | PASS | carried |
| W-0.11 G1-G4 | PASS (census 0; 10.1.0 `2/2/5/9`) | MS10 §4 |
| W-0.11 G5, G6 | PASS | carried |

The two rewritten sentences read true (MS10 §3.3, upheld): `grasp.css:132-137` under R-33 (light floor = the bound, dark floor 0), and `glass-subtlety.test.ts:192-194` (the ink is L 0.17, asserted). **Not shippable yet** for one reason only: the entry gate is **1 of 2** after this pass. D2 must converge, `release/10.1.1` must merge, the minor must rebase and re-run its battery, and the P11-3.3 landing items are still owed.

---

## 7 · Next-pass classes (no row added)

| id | class | placed |
|---|---|---|
| **C-1** | H12-1's page leg (iii) is strict ΔL < 0. It passes a removed dim at −0.000 (BV11 §4.2, confirmed). Only M-9's ≤ −0.02 floor catches it | instrument, H13: (iii) on the page reads M-9's own floor, or rounds before the sign. A plant: the tone plant (page −0.000) must red (iii) |
| **C-2** | R-32's chroma claim is measured on raw hues 30-90° only; the state scene's veiled field carries no violet, blue or teal. FV11's model predicts C× 0.900-0.934 and 4-5° there, from the medium's `saturate(1.5)` clip | instrument or reading: a veiled cell over a multi-hue ground, per-pixel C×/Δh REPORTED (`crit-offspot.mjs` is the reader). Not a gate unless the owner extends O-103a beyond the spot |
| **C-3** | `plant-R2` reds by 0.003 on floor v11; the arm's own plant (`BV11-plant-r32-notone.css`) lives in a pass dir | harness: join the tone plant to `pass-4/FV3-plants.mjs`'s table (BV11 §7) |
| **C-4** | the GL-ground half of `dark-arm.css:297-299` (−0.090, 1.3°, ×1.044) has no engine here that paints it | landing docs (L-1); a WebGPU-ground Chromium cell, if one is ever run under the GPU witness |

Landing docs pass, added: L-1 (`dark-arm.css:297-299`, prediction → measurement), L-2 (`FV11-model.py` cited from src, with the existing "D3 pass n" citations), and the trailing whitespace at `floor-v11.patch:1266` (inherited).

---

## 8 · Machine law, kept

- Every phase ran through `~/.claude/guard/guarded` as the literal command word. The browser runs were never `--light`: `cr` ran heavy, and `wk` under `--exclusive webkit --timeout 60` (queued 16:09, admitted 16:54:47, 45 min, under the 90-min limit, so no cell is owed).
- One browser per run, a fresh context per cell, everything closed by `capture.mjs`'s `finally`. No GPU argument, no `getContext()`, no browser MCP, no `screencapture`.
- One heavy run at a time. vitest ran one jsdom file with `--maxWorkers=2`.
- No kernel-zone refusal fired. Loads ranged 14-35 (each timing is cited beside its cell above).
- Nothing is left running. The worktree is removed and pruned, and `…/D3/p12/` is gone.

## 9 · Records

`crit-records/`: `phases.log`, `setup.log`, `compose.log`, `static.log`, `sweep-fv11.log`, `del-fv11.log`, `census-fv11.log`, `HOV-fv11.log`, `neighbourhood-r32.log`, `same.log`, `lightproof.log`, `fv11-css-focus-veil-lines.txt`, `selftest.log`, `selftest-h12.log`, `units.log`, `units-focus-veil.log`, `capture.log`, `cap-{fv11a,fv11}-{chromium,webkit}-1.log`, `M-9-r32-{fv11a,fv11}-{chromium,webkit}-1.log`, `wk-admission.log`, `offspot.log`, `offspot-{chromium,webkit}.log`, `teardown.log`.
