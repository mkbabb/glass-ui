# D3 · pass 6 · the fresh critic: floor v5 on the fixed 44 rows, the minor split v4 on its gates

| field | value |
|---|---|
| seat | D3 pass 6, the critic (REGISTRY P5-6.2 step 4). One seat, adversarial. It authored nothing in D3. This is the second start of the seat: the first was killed at the 08:15 kernel-zone stop (`FORMATION-PROGRESS.md`) partway through its plants. Its records and frames are kept, untouched, in `pass-6/crit-killed-seat/`. **No number below comes from them.** I reviewed its runner (`D3-crit-run.sh`) and probes, kept them with three edits (§9), and re-ran every phase myself |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `89aab527f`. `git diff --stat f9267e35a HEAD -- src demo tests package.json scripts tests-visual vite.targets.ts .bundle-ratchet .published-roster` prints nothing (`crit-records/setup.log`), so both patches measure the published 10.1.0 source, as every pass-5 and pass-6 seat did. `floor-v5.patch` (sha1 `dc295dbc`) equals `floor-v4.patch` + `floor-v5-R10.diff` + `-R11.diff` + `-R12.diff` byte for byte in my worktree (`git diff HEAD --binary \| cmp`). `minor-split-v4.patch` (sha1 `ec14741a`) applies byte-identical. Both `git apply --check` clean at HEAD. My builds reproduce every seat's specimen CSS bytes: floor v4 and v5 **391,121**, minor v3 398,144, minor v4 **398,432**, HEAD 394,891 (`phase-builds.log`) |
| owner rulings | **None on Q-1, Q-3, Q-11 (chrome or content clause), Q-12, Q-13 or Q-14.** `audit/INBOUND.md` still ends at O-98. `FORMATION-PROGRESS.md`'s last D3 lines are the minor v4 bank and the 08:15 kernel-zone stop. The P5-4 defaults apply, and every row that waits on these questions stays open (P2-6.3) |
| engines | Chromium 149 gated, on Playwright's headless shell with no launch arguments for every cell; the moving-field windows alone relaunch under H6 §1.1's cited exception (`fv5-run-chromium.log`: "chromium relaunched for the moving-field windows"). LAW PASS 46 over `harness/` and `pass-6/`, my three tools included. **Playwright WebKit 26.5** informational: no `backdrop-filter`, dock rows `+shim`; each battery retired it once at 60 page loads, 0 stalls, 0 crash cells; the unshimmed probe crashed on `GlassDock` in both themes (`page.goto: Page crashed`), as H-14 records. **Every real-Safari cell: UNMEASURED (owner's safaridriver checkbox)** |
| worktree | `.claude/worktrees/bl/D3/p6/crit/wt` held floor v5, with floor v4, the minor v4, the minor v3 and HEAD swapped in and out (each swap `cmp`-checked). Builds, captures and caches stayed inside it (`$W/.d3out`, `$W/.cache-crit`); static plant trees under `crit/scratch/`. Removed with `git worktree remove --force`, pruned, and `crit/` deleted (§9) |
| records | `crit-records/`: `admissions.log` (every guarded admission, its queue and admission time and load), `phases.log`, `phase-*.log`, `chain-*.log`, both baselines and their diffs against the seats', `fv5-results/`, `minor4-results/`, `plants/`, `verbose/`, the ring reads, the demo probes, the toolchains. Commands: `D3-crit-run.sh`, by phase. Tools: `crit-demo-probe.mjs`, `crit-ringprobe.mjs`, `crit-ringread.mjs`, `crit-ringapex.mjs`, `crit-g67c.sh` (the Chromium-alone G6/G7 reads, run while the second WebKit admission queued). Declarations: `crit-variants/r13-renamed.json`. Frames: `crit-frames/` |
| machine law | Every build, capture, probe, test and witness pass ran through `~/.claude/guard/guarded`; every run that started Playwright WebKit through `--exclusive webkit`; one heavy run at a time (the WebKit admissions and the toolchain were queued in one serial chain, so none overlapped a Chromium phase); vitest `--maxWorkers=2`. Static reads ran `--light` and launched no browser. The first WebKit admission waited **46 min** for the lock (queued 16:16:37, admitted 17:02:31), the second **69 min** (queued 17:57:37, admitted 19:06:58). Neither passed 90 min. The kernel-zone refusal never fired. Nothing is left running |

Short citations: `FV5` (`FLOOR-V5.md`), `MS4` (`MINOR-SPLIT-v4.md`), `H6` (`H6.md`), `Reg` (`REGISTRY.md`, the Pass 5 part).

---

## 0 · Verdict

**Floor v5: 36 of 44 rows, ADVANCE, not clean.** The seat scored 38. My battery reproduces the seat's in both engines (`baseline-fv5.md` is `diff`-identical to `FV5-records/baseline-fv5.md` in all four columns). Every R plant and floor plant reds again on my build. R-11 holds, and N-3's attribution now covers both themes (`diag-held-noveil` flat 0.894 / 0.878 at 18 px). R-12 holds in paint on the seat's probe and on my harder legs. **Rows 20 and FL-12 do not close.** R-10 cured the six named comments and seven more, and DEL reads 0. But floor v5 also deletes `backdropMode` and the adaptive tint, and three touched files still describe them as live. One of them is `demo/stories/dock/dock-search.vue`, the file R-12 itself edits. DEL cannot see them, because it declares one spelling per mechanism (A-1).

**Row 6 is a reader artefact, not the ring's paint.** M-3 reads a round control's ring on three columns around the rounded centre and takes the worst. On floor v5 the apex column reads **3.52**, the next 3.24, and the third, where the outline curves through its antialiased band, **2.66**. Under the GPU raster that third column antialiased differently, which is why pass 5 read 3.25. The ring's solid composite (`#89837f` over the plate `#fef7f1`, both band rows at full coverage) is 3.52 on every light ground. FV5 §5's candidate fix, raising the light perimeter to 0.60, would move every control edge in the library to cure a sampling choice. I recommend a ruling on measurement instead (A-2). Under the current gate the row stays open.

**The minor split v4:** W-0.1 G1-G7 **PASS in Chromium** (G6 per R-9 0.0000, raw 1 of 26 at 0.0022 beside it), W-0.11 G1-G6 **PASS**, every gate value I re-read matching the seat's to the digit (FL-14's dark-composite movement I did not re-read, §3), and `baseline-minor4.md` `diff`-identical to the seat's in all four columns. FL-14 in source holds: STACK 24/24 in each engine, the held floating well 3.27 / 3.33 / 3.32. R-12 and R-13 are in. **R-13 is not complete:** two "earned darken" sentences survive in files the minor touches, because R-13's plant is a line grep and both phrases break across a line (A-3). The light Close ring's 2.77 is row 6's artefact: 3.73 at the apex.

**Pass 6 is not clean** (8 open; 0 are required). The two-clean count stays at **0 of 2**.

---

## 1 · Re-run of floor v5 (both engines)

| run | when (load, 1-min) | result |
|---|---|---|
| static checks (`--light`) | 14:48 (29.1) | LAW PASS 46. **DEL** floor v5 PASS 6 (`hits=0`, 835 files), floor v4 FAIL 3/6, 7 hits in 6 files: H6's and FV5's reading to the hit. Ladder: `diff radii-fv5 radii-minor4` prints nothing; against floor v4 exit 1 (16/18 against 18/20). Census `stacked=0 halo=0 blur=0 open=0`, exit 0; on `v10.1.0 src/styles` exactly `stacked=2 halo=2 blur=5 open=9`, exit 1. LIT `halo=5 near=1 stacked=10 chain=3 open=19 frames-halo=0/0` (inherited only). HOV PASS 58 (`phase-static.log`) |
| Chromium battery | 14:49-15:07 (30.7 → 18.0) | capture 874.9 s, 70 cells, 4 live, 4 motion, 2 drift windows. RAW 48 · M-1 11 · M-1x REPORTED · M-2 938 · M-2m 430 · **M-2h FAIL 2/68** · **M-3 FAIL 7/354** · M-4 168 · M-5 20 · **M-6 FAIL 29/120** · M-7 8 · M-8 8 · M-9 20 · O-66 5 · STACK 24 · W-A 216 · W-S 24 · T PASS · LIT REPORTED · HOV 58 (`fv5-run-chromium.log`) |
| Playwright WebKit battery | admitted 17:02:31 (15.2), 17:02-17:21 | the same verdicts (`fv5-run-webkit.log`); retired once at 60 loads |
| baseline | — | **`diff FV5-records/baseline-fv5.md crit-records/baseline-fv5.md` prints nothing** (`baseline-fv5-diff.txt`) |
| plants, both engines | 17:21-17:57 (20.0 → 10.9) | every R plant and floor plant red (§1.2) |
| Chromium red cells ×4 | 15:49-16:01 (14.8, 12.5, 11.0, 9.8) | held, ladder, dialog × black, white, aurora, paper. The Close ring **2.66** on all four grounds each time; halo light **0.793**, dark **0.836** each time; M-6 base 7/30 each time (`phase-rerun.log`, `verbose/rerun-fv5-*`). The runner's `rerun` phase loops twice internally, and I called it twice, so each cell ran four times. **No red appears only under load**: the re-runs ran at 9.8-14.8, under the battery's 18-31 |
| toolchain | 19:39-19:43 (7.8 → 18.4) | `vue-tsc` app and tests exit 0, library build exit 0, dist-demo exit 0 (built before the units), **vitest 237 files, 2318 passed, 0 failed**, 10 expected-fail, 1 skipped (`chain-5.log`) |

### 1.1 · The rows the seat changed, read myself

- **R-10 (rows 20, FL-12).** DEL PASS 6 with floor v4's 7 hits red. The 13 rewritten sentences read true where I checked them against the tree. The row still fails on three sentences DEL cannot see (A-1).
- **R-11 (row 4, N-3).** Floor v5's ladder equals the minor v4's. M-2 938 and M-3's 7 reds are unchanged from H6's floor v4 baseline (the 7 are the Close ring). Halo light 0.793, dark 0.836, against floors 0.870 / 0.855. **`diag-held-noveil` over floor v5 at 18 px: held dock flat, light 0.894 … 0.894, dark 0.878 … 0.878 over 134 columns** (`plants/diag-held-noveil-M-2h-chromium.log`; its 2 reds are the aurora held cells the variant does not capture, MISSING). So the dark halo at 18 px is the focus veil's frost over its own host, the cause N-3 already attributes in light. **N-3: PASS (attributed) in both themes.**
- **R-12.** The seat's `FV5-demo-probe.mjs`: floor v5 PASS in both themes (pointer on row 1 → highlighted [1], painting [1], `oklch(0.53 0.124 69.6 / 0.12)` light, `oklch(0.813 0.109 78.2 / 0.12)` dark); floor v4 FAIL in both (highlighted [0], painting [0, 1], row 1 at `/ 0.05`). My `crit-demo-probe.mjs` adds the legs a single register must also survive. **K**: with the pointer resting on row 1, ArrowDown moves the highlight to row 2, and row 2 is the only row painting (row 1 still `:hover`, unfilled). **L**: the pointer leaves the list and one row stays highlighted and painting. Floor v5 and the minor v4 PASS in both themes. Floor v4 FAILS P and K (keyboard to row 1, painting nothing: `rgba(0, 0, 0, 0)`). Playwright WebKit cannot read the page (H-14). Real Safari UNMEASURED (owner's safaridriver checkbox).

### 1.2 · Plants (row 19), every one re-planted on my floor v5 build under H6 (`plants/readings.log`)

| plant | witness | Chromium · Playwright WebKit |
|---|---|---|
| R-1 `plant-R1` | M-4 dark | FAIL 7/84 · 7/84 |
| R-2 `plant-R2` | M-9 dark | FAIL 1/10 · 1/10 |
| R-3 `plant-R3` | O-66 | FAIL 6/6 · 5/6 |
| R-4 `plant-R4` | O-66 | FAIL 3/3 · 3/3 |
| R-5 | census on 10.1.0 | `stacked=2 halo=2 blur=5 open=9`, exit 1 |
| R-6 (HOV's plant: floor v5 with `pass-5/floor-v4-R6.diff` reversed, which is R-4 as built) | HOV | **FAIL 1/58**; floor v5 PASS 58 (`hov-r6-plant.log`). One hunk (the `search.css` comment R-10 rewrote) did not reverse; the HOV row it reds is the menu `:hover` leg, so the plant bites |
| R-10 | DEL | floor v4 FAIL 3/6 |
| R-11 | ladder `diff` | floor v4 exit 1 |
| R-12 | both demo probes | floor v4 FAIL in both themes |
| `plant-bound` | M-2 ladder, dialog | FAIL 110/298 · 110/298 |
| FL-7 `plant-heldfloor` | M-2 held | FAIL 20/72 · 20/72 |
| FL-14 `plant-carrierveil` | M-2 held | FAIL 50/72 · PASS 72 (WebKit paints no carrier filter, as on record) |
| FL-15 `plant-darkperim` | M-3 dark | FAIL 47/87 · 47/87 |
| FL-14 `plant-noisolation` | M-2 held · STACK | FAIL 14/28 · 14/28 · STACK FAIL 8/12 · 8/12 |
| `plant-q1c-noroom` | M-6 `--q1 c` dark | FAIL 2/24 · 2/24 |

Every verdict equals FV5 §4.4's.

### 1.3 · Owner options on my capture (`readings.log`, `plants/readings.log`)

| reading | Chromium · Playwright WebKit |
|---|---|
| M-6 `--q1 a` | **PASS 88 · 88** |
| M-6 `--q1 c` (`var-q1c`) | FAIL 2/96 · 2/96 (the `retune-bg` dark room, unchanged since pass 4) |
| `var-q11b` M-1x `--q11 b` | **PASS 21 · 21**; M-1 PASS 11 · 11 |
| `var-q11b` W-A `--q11 b`, the chrome leg | light chrome α **1.000** (≥ 0.995) in both engines; every chrome run ≥ 4.5 (worst floating well-muted 5.26, WebKit 5.11). The witness's FAIL 13/117 is the variant's capture coverage: its dark cells and live windows are not captured (MISSING), not a paint red |
| M-9 / Q-14 (H5-1, REPORTED) | dark page −0.025, aurora focus spot `#ec9642 → #99560a` **−0.226 (9.1×)**; light −0.070 and −0.040 (0.6×). H6's figures to the digit |
| M-1x under (a), REPORTED | content grey off paper: wash over black `#e2dcd7` (L 0.898, C 0.0095), quiet `#ebe5df`, resting and card `#f5eee8` |

---

## 2 · Attacks

### A-1 · Rows 20 and FL-12: three touched files still describe two mechanisms floor v5 deletes

Floor v5 deletes `backdropMode` (P5-3.3; the patch removes its prop row and its paragraph from `dock/README.md`, and `DockBackdropMode` from `useDockShellProps.ts`) and the sampler-driven adaptive tint (FL-1; at HEAD `useGlassBackdropLuminance.ts:1` reads "Sample the painted field beneath glass and adapt its tint for legibility", and `glass-material.vue:72` "A consumer-provided dominant backdrop color drives the adaptive tint"). On floor v5:

| file (touched by floor v5) | line | sentence | why false on floor v5 |
|---|---|---|---|
| `src/components/dock/README.md` | 20 | "`GlassDock` owns the plate, orientation, collapse state, overflow, **and backdrop mode**." | the patch deletes the `backdropMode` row (HEAD :42) and the paragraph (HEAD :52-53) from this same file. Nothing else on floor v5 names a backdrop mode (`sweep-fv5-spellings.txt`) |
| `demo/stories/dock/dock-search.vue` | 197-198 | "The search field aperture rides the morph; **adaptive tinting keeps its text contrast at or above 4.5:1**." | **R-12 edits this file.** On floor v5 the field reads the floating rung at the bound, R-10's own wording in `search.css:38-39` ("clears the muted ink over any input; nothing samples the backdrop") |
| `demo/stories/substrates/glass-material.vue` | 4-5 | "the three SOTA folds (squircle, chromatic fringe, **adaptive tint**) ride that grammar" | the patch rewrites line 72-73 of the same file to "Nothing samples it", and line 340 says "There is no second tint axis". The file contradicts itself |

**Why DEL passes.** `deletes-floor.json` declares `backdropMode` as an identifier, matched exactly, and the README spells it as two words. It declares no name for the adaptive tint at all. FV5 §1.1 swept the words `tint axis` and `darken`, not `adaptive tint`. This is the same class as pass 5's A-1, one level down: H6-1 moved the check from the touched files to the whole tree, but it still reads one spelling per deleted mechanism.

**The cure** (route, seat-closable): three sentences, and `deletes-floor.json` gains the phrases `backdrop mode` and `adaptive tint`. Measured with that declaration (`crit-variants/deletes-floor-h7.json`, `del-h7.log`): **floor v5 FAIL 3/9, 4 hits in exactly these three files** (the phrase `adaptive tint` already matches `adaptive tinting`; `overlay-plate.css:271`'s "no adaptive-tint layer", which states the absence, is hyphenated and not matched). Floor v4 FAIL 6/9, 12 hits. Floor v6 at 0 is the fixture, floor v5 the plant. **Rows 20 and FL-12: OPEN.**

### A-2 · Row 6 (M-3): the worst of three columns on a round outline, not the ring's paint

`crit-ringread.mjs` reads the very ring PNGs the battery wrote (no browser) and prints each column M-3 scored (`ringread-fv5-light-chromium.log`):

| column | band rows 287, 288 | inside 289 | min(in, out) |
|---|---|---|---|
| 852 | `#89837f` `#89837f` | `#fef7f1` | **3.52** |
| 853 | `#8d8884` `#89837f` | `#f8f1eb` | 3.24 |
| 854 | `#98948f` `#89837f` | `#ebe4de` | **2.66** = M-3's p05 |

The Close button is round, so `capture.mjs`'s RING_PROBE finds no straight run (`x1 − x0 < 3`) and falls back to `[c − 1, c, c + 1]` around the rounded centre. At 852 both band rows are the ring at full coverage. At 854 the outline has started to curve, so the top band row is part plate and the row inside is part ring. A straight two-row band on a curved edge reads the antialiasing, not the ring. M-3's p05 over three columns is their minimum, so the reading is the worst-aligned column. That column's antialiasing is exactly what the launch change moved: pass 5's GPU raster read 3.25 there.

`crit-ringapex.mjs` reports, beside M-3, the column whose band rows are equal (full coverage) for every three-column ring in the gated cells:

| build | light Close ring, every one of 7 grounds: M-3 · apex | rings read | M-3 < 3 | apex < 3 |
|---|---|---|---|---|
| floor v5 | 2.66 · **3.52** | 22 | 11 | 1 (`retune-fg`, a consumer-retune cell M-3 does not gate: 2.50) |
| minor v4 | 2.77 · **3.73** | 22 | 15 | 3 (dark Dialog over aurora 2.96 and over white 2.49: 10.1.0's dark arm, which the minor does not change) |
| HEAD | 1.61 · **1.91** (paper) | 16 | 14 | 10 |
| floor v5, Playwright WebKit | 3.07 · 3.36 (no full-coverage column in WebKit's raster) | 22 | 1 | 1 |

`crit-ringprobe.mjs`, which opens the Dialog cell itself and reads only the centre column, gets 3.24 light and 4.56 dark on floor v5 (`phase-ringprobe.log`), the middle column above: the probe and the battery see the same pixels, and only the column choice differs. The apex reading still bites: HEAD's ring at 48 % reads 1.91 at its apex, and the light Close ring's solid colour is what a user sees. The dark Close ring on floor v5 reads 5.03 at the apex and 3.55 at M-3.

**What this means for FV5 §5's three options.** (i), raising the light `--ink-perimeter` to 0.60, changes every control edge, focus ring and selection indicator in the library, moves R-7's 0.54 and O-98 R-3's headroom, and cures a reader's column choice. (ii), reading at a stated raster, keeps the artefact and hides it under the GPU arguments H6-0 removed. (iii), a ring-local rung, adds a name for a sampling problem. **None is needed.** I recommend a fourth: **a ruling on measurement that M-3 reads a ring with no straight run at its full-coverage column (or along the outline's normal), not the worst of three columns.** Its plant is HEAD (1.91 at the apex) and a ring at α 0.40. That is an instrument change, so it goes to the pass-7 list (H7-1), and I may not apply it to this pass's gate. **Row 6: OPEN under the current gate. It closes on that ruling with no value change, at 3.52.**

### A-3 · R-13 is not complete: two renamed phrases survive in the minor v4, missed by a line grep

R-13's plant (`grep -rnE 'earned-darken clamp|earned darken|…'`) prints 0 lines on the minor v4. DEL with a declaration of R-13's own renamed phrases (`crit-variants/r13-renamed.json`) reads the minor v4 **FAIL 1/4**, 2 hits, and the minor v3 FAIL 4/4, 12 hits (`r13-del.log`):

| file (touched by the minor v4) | sentence |
|---|---|
| `dock/styles/adaptive-legibility.css:7-8` | "The PLATE half — the **earned / darken** off the measured backdrop luminance — is composed at the element" |
| `glass/overlay-plate.css:272-273` | "the veil already carries the **earned / darken**, and a second layer pushing the same plate the same way is the double-writer" |

In the minor the clamp lives and thickens the cream pole in light, so both are light-false in the sense R-13 ruled, and R-13 renamed the same phrase at seven other sites. Both break across a line, exactly as H6 §2 found `overlay-plate.css:272-273` escaping R-10's grep. MS4 §1.2 asked the critic whether the minor should carry a DEL declaration; this answers it: **yes, with R-13's renamed phrases**, so the plant is the minor v3 at 12 hits and the fixture the minor v4 at 0. That is not a row (no W-0.1 gate reads prose), but W-0.1 §3 wants the landed tree to be the measured one, with no prose added at landing. MS4 §1.2's wider dozen "darken" sentences (the bucket comments) remain for the agglomerate to rule.

### A-4 · Checked and holding

- **H6-0, the cited exception.** `lib.mjs` keeps `CHROMIUM_FIELD_ARGS` only for the moving-field windows; every cell, probe and plant here ran on the shell's default. M-2m PASS 430 rests on those windows. LAW reads 46 files, one cited.
- **R-11 adds no visible change** (FV5 §2.3). I did not re-capture the glance; the composites and inks are equal to the digit in my baseline, and the thin-capture law applies.
- **N-4.** The minor v4's W-0.1 reading is recorded (§3); the row is about recording it, and it is recorded.
- **The minor v4's dark columns** read 10.1.0's dark arm (W-H.2's): M-3 dark FAIL 130/171, W-A dark 28/108. G6 and G7 read them against HEAD, not as rows.

---

## 3 · The minor split v4 (minor_gates)

One build, measured on its gates. Chromium is the gate; Playwright WebKit is informational. Every value below is from my capture (`minor4-run-{chromium,webkit}.log`, `minor4-results/`, `g7-*.txt`, `g6-*.txt`, `w011g6-*.txt`, `verifier-minor4-rebound.log`).

| gate | Chromium (gate) | Playwright WebKit | verdict |
|---|---|---|---|
| **W-0.1 G1** M-1 | PASS 11/11 over paper | PASS 11/11 | **PASS** |
| **G2** O-66 field | light trigger `#f3ece2` = Input `#f3ece2`, ΔE 0.000 on paper and in the pane; dark `#3f3731` = `#3f3731`, 0.000 | PASS | **PASS** |
| **G3** O-66 row, light | row `#f2e5d5`, C **0.0256**, ΔL −0.0522 against the plate `#fef7f2` | PASS | **PASS** |
| **G4** W-A light | PASS 108/108: thinnest painted α 0.890 against the computed bound 0.891, content and chrome | PASS 108 | **PASS** |
| **G5** scope | the ratchet reads `2921383 > 2919057`, **+2,326 B**, unrebound. With the datum rebound in my worktree only: `terminal CLEAN`, roster PRESENT **289 = 289**. `.published-roster` untouched by HEAD and by the patch | — | **PASS** (rebind owed at landing) |
| **G6 per R-9** | 13 dark composites, worst ΔE **0.0000** | — | **PASS** |
| G6 raw, beside it | **1 of 26 over: dark paper dock `#0f0c09 → #0e0c09`, ΔE 0.0022** (W-0.11's dark dock cast) | counted: 0 over | printed, as R-9 orders |
| **G7** | M-2 **1,125** HEAD-PASS rows, **0 regress**; M-3 **70**, **0 regress** (both engines; Chromium alone 569 / 0 and 30 / 0) | counted | **PASS** |
| **W-0.11 G1-G4** | census `stacked=0 halo=0 blur=0 open=0`, exit 0; on `v10.1.0 src/styles` exactly `stacked=2 halo=2 blur=5 open=9`, exit 1. The ladder 6/10/12/18/20 equals floor v5's (`diff` prints nothing) | static | **PASS** |
| **W-0.11 G5** | as G5 | — | **PASS** |
| **W-0.11 G6** | M-1 11/11; against the W-0.1 tree (`s-w01ref`), M-2 **0 of 1,442** and M-3 **0 of 420** regress (Chromium alone 0 of 720, 0 of 205) | counted | **PASS** |
| **M-2** light | green on every read row (the 9 Chromium reds are the unread `floating-held` run and the claim cell, HEAD's too) | — | as MS4 §7 |
| **M-3** light | every plate row ≥ 3.0, the held floating well **3.27 / 3.33 / 3.32** (black, white, aurora). **The real Dialog's Close ring 2.77 on all 7 grounds**, four re-runs at 7.5-17.9: A-2's reader artefact, **3.73 at the apex**. HEAD 1.61 (1.91 at the apex) | Close ring 3.25 (3.56 best column); checker floating well ring 2.99 (1/16), pass 5's and H6's digit | one open item, row 6's ruling |
| **M-2h** | held dock ≥ 4.5 in every frame; light halo **0.807** (N-3's attributed frost) | PASS 22 light | as MS4 |
| **H3-1** off paper (Q-11 unruled, default (a)) | REPORTED: 24 of 33 Chromium off-paper light composites grey (12 chrome, accepted under (a)'s text); content grey: wash over black `#e2dcd7` (L 0.898, C 0.0095), over the deep canvas `#e3e3e3` (C 0.0000) | the same (48 of 66 across both engines) | **REPORTED** |
| WebKit restart (the tile harness's H3-1, `tile/pass-3/H3.md`) | — | each of my two WebKit batteries retired the browser once at 60 page loads, 0 stalls | held (not a gate) |
| **STACK** | **PASS 24** | **PASS 24** | **PASS** (FL-14) |

**FL-14 in source.** `@utility glass-plate` declares `isolation: isolate` (static: minor v4 1, minor v3 0). STACK 24/24 in each engine; with FL-14 overridden off (`MS4-variants/nofl14.css`) STACK FAIL 6/24 in Chromium. `plant-noisolation` on the minor v4 reds STACK 6/12 in both engines and M-3's held cells 7/8 (Chromium), 6/8 (WebKit). I did not re-read FL-14's dark-composite movement: my FL-14-off capture holds only the held, halo and state cells, so the comparison found no common dark ladder composite (`fl14-dark-move-c.txt`: 0 compared). MS4 §3's 0.0000 over 26 stands as the seat's reading, not mine.

**R-12, R-13.** R-12 as on floor v5 (§1.1): both probes PASS on the minor v4 in both themes, the minor v3 FAILS. R-13's grep reads 0 on the minor v4 and 11 on the minor v3, but A-3's DEL declaration finds two survivors.

**Toolchain.** `vue-tsc` both projects exit 0, library build exit 0, dist-demo exit 0, **vitest 239 files, 2321 passed, 0 failed** (`chain-5.log`).

**Can W-0.1 and W-0.11 ship from the minor v4 in 10.2.0? Not yet.** Every gate reads green in Chromium. What holds them: the entry gate (0 of 2 clean passes, owner-gated); Q-11's content clause for G1 off paper; row 6's ruling on measurement, which settles the light Close ring on both builds at once (3.73 at the apex with no value change); A-3's two sentences, so the landed tree is the measured one; and the landing's own items (R-9's reading into W-0.1 §5 G6, one probe per gate, the ratchet rebind of +2,326 B).

---

## 4 · The 44 rows (floor v5; my measurement; defaults built, unruled rows open)

| # | row | status | evidence | waits on |
|---|---|---|---|---|
| 1, 2, 4, 5, 7, 8, 10-19, 21, 22, 24 | RAW, M-1, M-2, M-2m, M-4, M-5, M-7, M-8, M-9, T, release, O-66 G2, O-66 G3, W-A, engines, plants, FL-13, O-87, STACK | **PASS (19)** | §1. Row 14: every M-2h release leg passes in both themes. Row 18: 70 cells, 4 live, 4 motion, 2 drift windows per engine, WebKit retired once, 0 stalls. Row 19: §1.2, every plant red. Row 22: census 0 with its exact bite, LIT inherited only, frames (§5) | — |
| 3 | M-1x | OPEN | REPORTED under (a): content grey off paper. `var-q11b` M-1x 21/21 and chrome α 1.000 in both engines | **owner, Q-11 chrome clause**: (a) by its text, or select `pass-4/fv3/q11b.*` |
| 6 | M-3 | OPEN | the light Close ring 2.66, four re-runs; apex 3.52 (A-2) | **a ruling on measurement** (A-2's fourth option, H7-1). Not a value |
| 9 | M-6 | OPEN | stepped 29/120; `--q1 a` 88/88 in both engines | **owner, Q-1** |
| 20 | prose sweep | OPEN (the seat scored PASS) | DEL 0 and 13 sentences cured, but three touched files still describe `backdropMode` and the adaptive tint (A-1), one of them R-12's own file | **route**: three sentences and two declared phrases |
| 23 | gestalt, O-62 frame | OPEN | §5 | **owner, Q-11 content clause, Q-3, Q-14**, with the frames |
| FL-1..FL-11, FL-13..FL-16 | the floor | **PASS 15** | battery, floor plants red | — |
| FL-12 | prose sweep of every touched file | OPEN (the seat scored PASS) | as row 20 | route, as row 20 |
| N-1 | Q-1's ruling built | OPEN | (a) built, (c) a variant | **owner, Q-1** |
| N-2 | Q-11's ruling built | OPEN | (a) built, (b) a variant | **owner, Q-11 chrome clause** |
| N-3 | the dock's held halo | **PASS (attributed), both themes** | halo 0.793 / 0.836; `diag-held-noveil` flat 0.894 / 0.878 at 18 px | — |
| N-4 | the minor split's W-0.1 reading | **PASS** | §3 | — |

**Count: 36 PASS, 8 OPEN = 0.818.** The seat scored 38. **Closed this pass: none.** Rows 20 and FL-12 moved counterexample again (the six named comments are cured, and three unnamed ones remain). **Waiting only on the owner: 5** (3, 9, 23, N-1, N-2). **Route-owned: 2** (20, FL-12). **Waiting on a ruling on measurement: 1** (row 6).

**Which ruling and which variant closes each owner row:** rows 9 and N-1 on Q-1 (a), by selection, 88/88 measured in both engines, no build; rows 3 and N-2 on Q-11's chrome clause, by (a)'s text with no build, or by selecting `pass-4/fv3/q11b.*` (M-1x 21/21 and chrome α 1.000 on floor v5, both engines); row 23 on Q-11's content clause, Q-3 and Q-14, with the owner's eye on the frames (`pass-5/frames-H5-1/` for Q-14). Q-14 (b) would also re-read row 12's dark-signed leg.

---

## 5 · The O-87 gestalt, from the frames (by eye)

- **R-12, the dock search** (`crit-frames/crit-chromium-{light,dark}-dock-search-pointer1-key2-{fv5,minor4,fv4}.png`; the pointer rests on row 1, the keyboard has moved to row 2). Floor v5, light: one tinted row, the keyboard's, a soft amber lift; the row under the pointer is plain. Dark: the same, one warm-brown row. The minor v4, dark: one row on the quiet plate (10.1.0's dark arm), a slight darkening, no second register. Floor v4: the keyboard's row and the pointed row tinted at two alphas. **R-12 meets O-87:** one register, flat, and it carries state (D-2). Nothing was added.
- **The dark focus veil (Q-14).** No new frame; the owner's frames stay `pass-5/frames-H5-1/`. On my capture the ratio holds: −0.226 on the aurora's focus spot against −0.025 on the page, 9.1×. I agree with pass 5's critic that the frame reads as a smudge and is not deft. It is the owner's (Q-14), and the default (a) holds until then.
- **The light ladder (Q-1, Q-11).** Unchanged by floor v5: cream over paper; wash, quiet and resting one paint; content grey off paper (`#e2dcd7` over black).
- **Row 22.** No lighting layer, shadow or gleam added by R-10, R-11 or R-12 (census, LIT, the frames). R-11's 2 px moves no pixel past the glance threshold (FV5 §7); I did not re-capture it.

---

## 6 · Next-pass classes (no rows added)

| id | class | found | placed |
|---|---|---|---|
| **H7-1** | M-3 reads a ring with no straight run as the worst of three columns around a rounded centre; on a round outline that column reads the antialiased curve (row 6: 2.66 against 3.52 at the apex; the minor 2.77 against 3.73) | A-2 | **instrument**, with a ruling on measurement: read the full-coverage column or the outline's normal. Fixture: floor v5 ≥ 3.0 at 0.52. Plant: HEAD's 0.48 ring (1.91) and a ring at α 0.40. No perimeter value moves |
| **H7-2** | DEL declares one spelling per deleted mechanism, so prose naming it another way survives (`backdrop mode`, `adaptive tint`/`tinting`) | A-1 | **instrument** (`deletes-floor.json` takes `backdrop mode` and `adaptive tint`; measured: floor v5 FAIL 3/9, 4 hits in the three files) and **route** (three sentences, floor v6) |
| **H7-3** | R-13's plant is a line grep, and line-split phrases escape it (two in the minor v4), the class H6 §2 found in R-10's grep | A-3 | **instrument**: the minor declares R-13's renamed phrases to DEL (`crit-variants/r13-renamed.json`: minor v4 FAIL 1/4, minor v3 FAIL 4/4). **Build**: two sentences in the minor v5 |
| — | MS4 §1.2's dozen further "darken" sentences in the minor (the bucket comments) | MS4 §1.2 | the agglomerate: a declared list or a ruling that they are the dark arm's |
| — | R-12 in Playwright WebKit cannot be read (the demo dock page crashes it, H-14) | FV5 §3.2 | record; real Safari UNMEASURED (owner's safaridriver checkbox) |

---

## 7 · What would make pass 7 clean

Floor v6 = floor v5 + A-1's three sentences (DEL red on floor v5 with the two phrases declared). Row 6 closes on H7-1's ruling with no value change. The five owner rows close only on Q-1, Q-3, Q-11 (both clauses) and Q-14; the shortest path is P5-4's one-message sheet. If those rulings have not arrived by pass 7's critic, pass 7 cannot be clean either, whatever the builds read.

---

## 8 · Known limits

- Playwright WebKit is not Safari: every WebKit number above is informational, and every real-Safari cell is UNMEASURED (owner's safaridriver checkbox).
- `crit-ringapex.mjs` is a REPORTED reading beside M-3, not a gate. It reads only rings that fall back to three columns.
- I did not re-capture the glance pairs or the Q-14 frames (thin-capture law); the frames I judged are the six R-12 frames my probe wrote.
- The R-6 plant reversed with one hunk unapplied (§1.2).

---

## 9 · Housekeeping

- **The killed seat's work.** Its runner and probes were reviewed and kept. My edits: `crit-demo-probe.mjs`'s header named an S leg (ink against fill) that the probe never computed, and now says the label ink and fill are printed and their contrast is M-2's; `D3-crit-run.sh` gains a `ringread` phase; `crit-ringread.mjs` and `crit-ringapex.mjs` are new. Its records and frames stay in `pass-6/crit-killed-seat/` as the record of what it saw, unused here.
- **Scratch.** The worktree was removed with `git worktree remove --force` and pruned; `crit/` (the worktree base and `crit/scratch/`) is deleted, and `.claude/worktrees/bl/D3/p6/` holds nothing of this seat (`phase-teardown.log`). `git status` over `src demo tests package.json scripts` prints nothing. Nothing of this seat is running. One stray empty file my own command created in `/tmp` was removed at once.
