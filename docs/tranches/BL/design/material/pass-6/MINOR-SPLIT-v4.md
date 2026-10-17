# D3 · pass 6 · MINOR-SPLIT v4: minor v3 + FL-14 in source + R-12 + R-13, measured once under H6

| field | value |
|---|---|
| seat | D3 pass 6, the minor split v4 (`REGISTRY.md` P5-6.2 step 3). A build, not a route |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | worktree `.claude/worktrees/bl/D3/p6/minor4/wt` cut at `d98deda42` by an earlier start of this seat, which wrote a first patch and stopped before any build (03:58). This seat read that tree, verified it (`git diff HEAD --binary \| cmp` against the file), corrected it (§1.2) and measured it. HEAD moved to `90d1fa0e8` and then `91728a094` during the run (docs commits). `git diff --stat f9267e35a 91728a094 -- src demo tests package.json scripts tests-visual vite.targets.ts .bundle-ratchet .published-roster` prints nothing, so the base is the source every pass-5 and pass-6 seat measured (the published 10.1.0 source). `git apply --check minor-split-v4.patch` is clean at `91728a094` |
| patch | **`minor-split-v4.patch`** (this folder): **52 files, +632 / −449** (`git diff --shortstat`), sha1 `ec14741a`. The measured tree equals the file (`cmp`, before and after every swap). The delta over `pass-5/minor-split-v3.patch` is **13 files, +49 / −30** (`MS4-records/delta-v4-over-v3.diff`) |
| owner rulings | **None.** `audit/INBOUND.md` still ends at O-98, and no row answers a D3 question. The last D3 lines of `FORMATION-PROGRESS.md` are the pass-6 H6 and floor v5 banks. The P5-4 defaults apply: Q-1 (a), Q-3 (a), **Q-11 (a) for chrome with content REPORTED**, Q-14 (a), Q-12 (a), Q-13 (a). No witness changed its gate |
| engines | Chromium 149, gated, on Playwright's headless shell with no launch arguments for every cell. The moving-field windows alone relaunch with `CHROMIUM_FIELD_ARGS`, under H6 §1.1's citation (`minor4-run-chromium.log`: "chromium relaunched for the moving-field windows"). **Playwright WebKit 26.5** is informational: it paints no `backdrop-filter`, and dock rows run `+shim`. **Every real-Safari cell: UNMEASURED (owner's safaridriver checkbox)**, including FL-14's `isolation` on the plates and R-12's pointer path |
| records | `MS4-records/` holds every phase log with its load (`phases.log`, `cr-chain.log`, `wk-admission.log`), the battery logs, `baseline-minor4.{md,json}`, `minor4-results/`, `verbose/`, the G6/G7 files, the plant and readings logs, the re-runs, the toolchain, ratchet and roster logs, and the delta. `MS4-run.sh` holds every command by phase. `MS4-variants/nofl14.css` is FL-14 taken back out (its before/after). `glance-minor4/` holds the pairs and `SHA256.txt` |
| fences | No tracked source edited in the checkout, and no git write in it beyond the worktree (added by the earlier start, removed here). Minor v3 and HEAD were swapped in the worktree with `git apply` / `apply -R`, each swap checked with `cmp`. Builds, captures and caches lived in `$W/.d3out` and `$W/.cache-m4`. The only checkout writes are under `docs/tranches/BL/design/material/pass-6/`. Nothing ran in a sibling repo |
| machine law | Every build, capture, probe, witness pass and toolchain step ran through `~/.claude/guard/guarded`. Static checks and witness reads ran `--light` (no browser). Every Playwright WebKit run went through `--exclusive webkit`: one admission for the battery half, the paired cells, the plant and the glance, then one for the re-runs. vitest ran with `--maxWorkers=2`. The kernel-zone refusal never fired. **One cost, recorded:** the first WebKit admission was queued at 04:13:56 and admitted at 04:17:29. It then held the lock idle until 04:57:01 (40 min), waiting on this seat's Chromium chain under the one-heavy-run rule. The re-runs were queued only after every other heavy phase. Nothing is left running |

Short citations: `Reg` (`REGISTRY.md`, the Pass 5 part), `H6` (`pass-6/H6.md`), `FV5` (`pass-6/FLOOR-V5.md`), `MS3` (`pass-5/MINOR-SPLIT-v3.md`), `Crit` (`pass-5/D3-critique.md`).

---

## 0 · In brief

- **The build:** minor v3, plus FL-14's one declaration in `@utility glass-plate`, R-12's pointer path in the demo dock search, and R-13's light law in the nine named sentences. One more sentence of the same class, in a file the minor already touches, is rewritten too (§1.2).
- **FL-14 in source holds in paint.** STACK **PASS 24/24 in each engine** (FL-14 off: FAIL 6/24 in Chromium). The held floating well reads **3.27 / 3.33 / 3.32** over black, white and the aurora in Chromium (FL-14 off: 2.63 / 3.33 / 2.94). FL-14 moves **no dark composite** (26 compared, worst ΔE 0.0000), so the `.dark` island was not re-read. `plant-noisolation` reds again in both engines.
- **W-0.1 G1-G7, Chromium:** G1 **PASS** 11/11. G2 **PASS** (ΔE 0.000 in both themes). G3 **PASS** (C 0.0256). G4 **PASS** 108/108. G5 **PASS** (roster 289 = 289; the ratchet owes **+2,326 B**). **G6 per R-9 PASS** (0 of 13 over, worst 0.0000), with the raw value beside it: 1 of 26 over, W-0.11's dark paper dock cast, ΔE **0.0022**. **G7 PASS** (M-2: 1,125 HEAD-PASS rows, 0 regress; M-3: 70, 0 regress, both engines).
- **W-0.11 G1-G6:** census `stacked=0 halo=0 blur=0 open=0`, and its exact 10.1.0 bite. **G6:** against the W-0.1 tree, 0 of 1,442 M-2 and 0 of 420 M-3 HEAD-PASS rows regress (both engines). **PASS.**
- **M-3 light is not green on every row.** The held well is now green, but **the real Dialog's Close ring reads 2.77** in Chromium on all 7 light grounds (twice re-run). That is FV5 §5's row-6 class: the headless shell's raster at R-7's 0.54 (FV5 measured 2.77 at 0.54 and 3.20 at 0.60). HEAD reads 1.61-1.80 there, so it is no G7 regression, and Playwright WebKit reads 3.25. It closes on FV5 §5's ruling on measurement, not on a value this seat may take.
- **M-2 light:** green on every read row. **M-2h:** the held dock is ≥ 4.5 in every frame (minimum fg 7.57 over black, R3 7.43). The light halo leg reads 0.807, N-3's attributed veil frost.
- **H3-1 off paper (Q-11 unruled, default (a)): REPORTED.** 48 of 66 grey or the ground's hue, content included (wash over black `#e2dcd7`, over the deep canvas `#e3e3e3`).
- **Tests 2321 passed, 0 failed** (v3: 2320; one new FL-14 arm). Typechecks, the library build and dist-demo all exit 0.
- **Shippability (§8):** every reading the registry asked of this build is green except M-3's Close ring, which waits on a measurement ruling that sits beside floor v5's row 6. 10.2.0 is still held by the entry gate (0 of 2 clean passes) and by Q-11's content clause.

---

## 1 · The build

### 1.1 · What v4 adds over v3 (`delta-v4-over-v3.diff`, 13 files)

| row | change | files |
|---|---|---|
| **FL-14** (P5-3.2) | `isolation: isolate` is the second declaration of `@utility glass-plate`, after `background`. The veil law's comment says why ("EVERY PLATE IS A STACKING CONTEXT": a held plate stands its own `backdrop-filter` down, and with it the stacking context that filter formed; isolation is not a backdrop root, so the grasp carriers still sample the ground), with the pass-5 measurement it rests on. "WHAT IT DOES NOT SUPPLY" now reads "Two declarations land". `DESIGN.md`'s Plate register paragraph says the same. One test arm pins it: `glass-subtlety` "seats every plate as its own stacking context, held or at rest" | `src/styles/glass/veil.css`, `DESIGN.md`, `tests/styles/glass-subtlety.test.ts` |
| **R-12** | `@pointermove="fuzzy.selectedIndex.value = i"` on each result row. The scoped hover leg on `--fill-hover` is deleted, and its comment says the row highlights the way reka's rows do. **Byte-identical to `floor-v5-R12.diff`'s hunk** (the `+`/`−` lines `diff` to nothing) | `demo/stories/dock/dock-search.vue` |
| **R-13** | The nine named sentences keep the dark law and state the light one: "earned-darken clamp" → "earned-ink clamp" (`glass.css:47`, `ladder-undershadow.css:17`, `feedback-tone.css:38`). "earned darken" → "earned ink" (`button/styles.css:126`, `dock/styles/shell.css:235`, `adaptive-legibility.css:38`). "the earned darken (the veil clamp's luma read)" → "the earned ink (the veil clamp: darker in dark, a thicker cream pole in light)" (`surfaces.css:58`). "the whole dynamic darken" → "the whole dynamic ink (darker in dark, a thicker cream pole in light)" (`adaptive-legibility.css:43`). In `surface-axis.css:41-44`, "it darkens toward the ink in BOTH modes" → "in dark it darkens toward the ink and in light it thickens the cream `--card` pole" | the nine sites (seven files); `glass.css` |
| R-13's class, one more | `dock/styles/search.css:44` "The field reads the floating rung, darkened by whatever the measured backdrop earns" → "the floating rung plus whatever ink the measured backdrop earns (darker in dark, a thicker cream pole in light)" (§1.2) | `dock/styles/search.css` |

No name, token, selector or value moves except FL-14's one declaration. **No name is added or removed over v3**: G5 below. Added over 10.1.0 across the whole minor: `--glass-veil-floor`, `--glass-bound`, `--glass-ink-target` (as v3).

### 1.2 · What this seat changed in the earlier start's tree, and why

The earlier start (03:56-03:58) had written FL-14, R-12 and the nine R-13 sentences. This seat read each hunk against the registry, then:

1. **Added `search.css:44`.** The prose sweep for R-13's plant found one more light-false sentence: "darkened by whatever the measured backdrop earns". It is the phrase DEL names for the floor, in a file the minor already touches. The minor's clamp thickens the cream pole in light, so the sentence was false there. FL-12's own reading (every touched file) would red it, so it is cured in the same register as the nine.
2. **Kept one deletion and stated it.** In `surface-axis.css`, "Dark carries one step more ink, exactly as the rungs do" is gone. In dark the veil surface reads the quiet rung at `base − 1·step` (`dark-arm.css:280`), so the sentence compares nothing it names. FV5 §1.1 struck the same sentence on the floor for the same reason.
3. **Rewrapped three comments** that the earlier start had left past the file's width (`surfaces.css:58-61`, `adaptive-legibility.css:43-45`, `veil.css:28-31`). This is prose only.

**Light-law sentences R-13 does not name, left for the record and not swept here.** A wider `grep -i darken` over the minor's `src` (`MS4-records/static.log` holds R-13's plant, and the sweep command is in §10) prints further sentences that describe the clamp or the bright-bucket arm only in its dark sense. They include `glass/ladder.css:164-304` (the bucket comments), `glass/deep.css:26-29`, `tokens/glass-fx.css:143`, `tokens/glass.css:14,208`, `tokens/on-glass-fg.css:15`, `tokens/property-regs.css:121`, `glass/surfaces-pager.css:34`, `glass/rim.css:35`, `glass/control-bit.css:175`, `glass/surface-axis.css:18,22,80` and `composables/glass/useGlassBackdropLuminance.ts:45`. Some sit in files the minor touches (`ladder.css`, `tokens/glass.css`, `deep.css`, `surface-axis.css`), so FL-12's reading would reach them. R-13 ruled nine. Rewriting a dozen more on a seat's own reading would be the unruled sweep that P5-0 finding 3 warns against, so **this goes to the critic and the agglomerate**: either a declared name list for the minor (DEL with a minor declaration, H6 §6), or a ruling that the bucket comments are the dark arm's and stay.

### 1.3 · Static readings (`MS4-records/static.log`, 04:13, load 12.7)

| reading | minor v4 (fixture) | plant |
|---|---|---|
| **R-13** grep (`earned-darken clamp\|earned darken\|whole dynamic darken\|darkens toward the ink in BOTH modes\|darkened by whatever` over `src` and `demo`) | **0 lines** | **minor v3: 11 lines**, the nine sentences plus `search.css:44` (`adaptive-legibility.css` and `surface-axis.css` each print two lines) |
| **FL-14** static: `@utility glass-plate` declares `isolation` | `isolation: isolate;` (line 26 of the utility) | minor v3: 0 |
| R-11 ladder: `diff radii-minor4.txt FV5-records/radii-fv5.txt` | prints nothing, exit 0 (one ladder, 6/10/12/18/20; FV5 §9's handed-on check) | against floor v4's radii: exit 1 (16/18) |
| O-87 census (W-0.11 appendix A) | `LIGHTING-CENSUS stacked=0 halo=0 blur=0 open=0`, exit 0 | `git archive v10.1.0 src/styles`: exactly `stacked=2 halo=2 blur=5 open=9`, exit 1 |
| HOV (H5-3) | PASS 58 | (minor v3 also PASS 58; R-4 as built is its plant, MS3 §1.2) |
| LIT (H5-2) | `halo=5 near=1 stacked=10 chain=3 open=19 frames-halo=0/0`, the 19 inherited literals, none added. REPORTED | — |
| LAW (H6-0) over `harness/` and `pass-6/` | **PASS 42** (one cited: `lib.mjs`, `GPU-WITNESS M-2m`), this seat's runner included | — |

DEL is not run as a gate here: the minor deletes no mechanism, so it declares no names (H6 §6).

Built specimen CSS (`build` phase, 04:13): HEAD **394,891 B**, minor v3 **398,144 B** (the pass-5 critic's and H6's count, so the swap is exact), minor v4 **398,432 B** (+288 B). The built minor v4 CSS carries 21 `isolation: isolate` declarations against minor v3's 9: the utility's expansion at each composer.

---

## 2 · Runs and loads

| run | when | load (1-, 5-, 15-min) |
|---|---|---|
| static (`--light`) | 04:13:09 | 12.7 / 9.9 / 13.2 |
| builds: minor v4, minor v3, HEAD (specimens + demo) | 04:13:16 → 04:13:22 | 12.1 → 12.2 |
| Chromium battery (`run.mjs --engines chromium`) | 04:13:49 → 04:31:36 | capture 868.6 s, 70 cells, 4 live, 4 motion, 2 drift windows (load 8.7 / 10.2 / 11.3 at its end); 15.1 at the end |
| Chromium paired cells: HEAD (56 cells), the W-0.1 tree (44), FL-14 off (50), R-9 dark | 04:31:41 → 04:54:18 | 15.1 → 21.9 → 21.1 |
| R-12 demo probe, Chromium | 04:54-04:55:19 | 21.8 → 21.1 |
| glance, Chromium (+ the dock-search pair) | 04:55:25 → 04:56:41 | 21.2 → 19.2 |
| WebKit admission (battery half, paired cells, `plant-noisolation`, glance) | queued 04:13:56, admitted 04:17:29, clear of Chromium 04:57:01, battery 05:16:34, paired cells 05:36:51, plant 05:37:21, ended 05:38:38 | 8.0 at admission; WebKit capture 907.9 s, **retired once at 60 page loads**, no stall line; the unshimmed probe crashed on `GlassDock` in both themes (`page.goto: Page crashed`), as H-14 records; 5.7 at the end |
| witnesses, baseline, verbose, G6/G7, readings (`--light`) | 05:39 → 05:45 | — |
| Chromium re-runs ×2 (held, ladder, dialog × black, white, aurora, paper) | 05:44 → 05:50:44 | 13.4 (run 1), 21.5 (run 2) |
| toolchain, ratchet, roster | 05:51:15 → 05:53:52 | 19.9 → 22.0 |
| WebKit re-runs ×2 (light ladder, dialog × checker, white, black) | queued 05:54:08 (another seat held the lock), admitted 06:05:55, ended 06:07:18 | 24.2 at admission; 20.7 (run 1), 18.7 (run 2) |

---

## 3 · W-0.1 G1-G7, per engine

| gate | Chromium (gate) | Playwright WebKit | HEAD, same session and harness |
|---|---|---|---|
| **G1** · M-1 no grey | **PASS 11/11**: wash `#fef7f2`, quiet `#fef8f1`, resting and card `#fef7f1`, floating `#fef7f2`, overlay `#fef8f1`, dialog rung `#fef7f1`, opaque `#fef7f1`, dock `#fef7f2`, popover `#fef7f2`, real Dialog `#fef7f1`; L 0.980-0.982, ΔE 0.009-0.010 from paper `#fbfaf8` | PASS 11/11 | FAIL 22/22 (both engines) |
| **G2** · O-66 field | **PASS**: light trigger `#f3ece2` = Input `#f3ece2`, ΔE **0.000** on paper and in the pane; dark `#3f3731` = `#3f3731`, 0.000 / 0.000 | PASS | — |
| **G3** · O-66 row, light | **PASS**: row `#f2e5d5` C **0.0256**, ΔL −0.0522 against the plate `#fef7f2`. Dark recorded: `#0e0b05`, ΔE 0.003 (W-H.1's) | PASS | — |
| **G4** · W-A, light | **PASS 108/108**: thinnest painted α 0.890 against the computed bound 0.891, content and chrome | PASS 108/108 | — |
| **G5** · scope | **PASS**: verifier with the datum rebound in the worktree only, `terminal CLEAN`, roster PRESENT **289 = 289**, claims 193, declarations 454 (`verifier-rebound.log`). No name removed. `.published-roster` diff empty (both `v10.1.0..HEAD` and the worktree). **Unrebound: `G-BUNDLE-RATCHET … 2921383 > 2919057`, +2,326 B** (§6) | — | CLEAN at the datum (`verifier-head.log`) |
| **G6 per R-9** (W-0.11's dark shadow and blur put back to 10.1.0's, dark only) | **PASS**: 13 dark composites, worst ΔE_OK **0.0000**, 0 over 0.002 (`g6-dark-m6-r9.txt`) | not injected (R-9's injection is Chromium's; WebKit's raw has 0 over) | — |
| G6 **raw**, printed beside it | **1 of 26 over: `chromium dark paper · dock #0f0c09 → #0e0c09`, ΔE 0.0022** (W-0.11's dark dock cast; pass 5 read the same row 0.0038 under the GPU arguments). The other 25 read 0.0000 | counted in the 26: 0 over | — |
| **G7** · no row regresses | **PASS**: M-2 **1,125** HEAD-PASS rows, **0 regress**, 377 more pass; M-3 **70**, **0 regress**, 350 more pass (`g7-m2.txt`, `g7-m3.txt`; both engines). Chromium alone, from the preview read: M-2 569 / 0, M-3 30 / 0 | counted in the same rows | — |

**FL-14 changes no G6 reading.** The dark composites with FL-14 taken out (`nofl14`) and with it in read worst ΔE **0.0000** over 26 (`fl14-dark-move.txt`). So FL-14 moves no dark composite, and the `.dark` island is **not re-read** (P5-6.2: re-read only if FL-14 moves one). MS3 §5's island reading stands.

---

## 4 · W-0.11 G1-G6 on the same tree

| gate | reading |
|---|---|
| G1 · blur | census `blur=0`; the radii are 6/10/12/18/20, each below 10.1.0's, ascending, and equal to floor v5's (R-11's one ladder). **PASS** |
| G2 · stacked | `stacked=0`. **PASS** |
| G3 · halo | `halo=0`. **PASS** |
| G4 · bites | the census exits 0 on the tree; on `git archive v10.1.0 src/styles` it prints exactly `LIGHTING-CENSUS stacked=2 halo=2 blur=5 open=9`. **PASS** |
| G5 · scope | as W-0.1 G5: roster 289 = 289, every `--shadow-*` and `--glass-blur-*` name still declared. **PASS** |
| G6 · the material survives | M-1 PASS 11/11 in each engine. Against the W-0.1 tree (`s-w01ref`: W-0.11's values backed out of minor v4, both modes), **M-2: 0 of 1,442 HEAD-PASS rows regress; M-3: 0 of 420** (both engines; Chromium alone 0 of 720 and 0 of 205). LIT frames read no halo. **PASS** |

---

## 5 · FL-14 in source: before and after, and its plant

FL-14 off is minor v4 with `MS4-variants/nofl14.css` injected: `isolation: auto !important` on every composer of `glass-plate` (fl14.css's list, plus `.dock-plate`). None of these elements isolates at HEAD (`git grep isolation: HEAD -- src`), so the injection paints minor v3's plates.

| reading | FL-14 off (≈ minor v3) | **minor v4 (FL-14 in source)** | `plant-noisolation` (FV2: plate isolation off under an opaque ancestor) |
|---|---|---|---|
| STACK, Chromium · Playwright WebKit | FAIL 6/24 · (both engines: FAIL 12/48) | **PASS 24 · PASS 24** (`STACK` in the baseline: 12 per theme per engine) | **FAIL 6/12 · FAIL 6/12** |
| M-3 held floating well, light, Chromium (black / white / aurora) | **2.63 ✗ / 3.33 / 2.94 ✗** | **3.27 / 3.33 / 3.32** (rings 3.42 / 3.47 / 3.46) | M-3 FAIL 7/8 · 6/8 (held cells) |
| M-3 held floating well, light, Playwright WebKit | 3.14 / 3.38 / 3.38 | 3.14 / 3.38 / 3.38 | — |
| M-2, held cells | — | — | FAIL 12/20 · 10/20 |
| G7 against FL-14 off | — | M-2 0 of 1,440 regress, 2 more pass; M-3 0 of 418 regress, 2 more pass (`fl14-m{2,3}-regress.txt`) | — |
| dark composites | — | 26 compared, worst ΔE 0.0000 (§3) | — |

Playwright WebKit paints no `backdrop-filter`, so a held plate there never stands one down, and its well reads the same with or without FL-14. The cure is a Chromium reading, and every real-Safari cell is UNMEASURED (owner's safaridriver checkbox). The pass-5 injection (MS3 §4: 3.28 / 3.34 / 3.33, GPU arguments) and this source build under the shell agree to within 0.02.

---

## 6 · R-12: the demo dock search (`demo-cr.log`, `FV5-demo-probe.mjs`)

| build | Chromium light | Chromium dark | Playwright WebKit |
|---|---|---|---|
| **minor v4** (fixture) | **PASS**: pointer on row 1 → row 1 `[data-highlighted]` and the only row painting a fill; pointer on row 0 → row 0 | **PASS**, the same | **not readable**: the demo dock page crashes Playwright WebKit unshimmed (H-14; FV5 §3.2 read the crash on both builds). Not re-run |
| **minor v3** (planted FAIL) | **FAIL**: pointer on row 1 → highlighted [0], painting [0, 1]; row 1 at `oklch(0.53 0.124 69.6 / 0.05)` (`--fill-hover`) beside row 0 at `/ 0.12` | **FAIL**: highlighted [0], painting [0, 1]; row 1 at `oklch(0.813 0.109 78.2 / 0.05)` beside row 0 at the quiet plate, `color(srgb 0.093 0.050 0.009 / 0.14)`: the two registers Crit A-5 named | as above |

The dark minor v3 row is the defect R-12 named: the light amber hover leg beside a dark highlighted row that stays on the quiet plate. Minor v4 shows one register in both themes.

---

## 7 · The rest of the battery (`baseline-minor4.md`), M-2, M-3, M-2h, H3-1

| witness | Chromium light | Chromium dark | Playwright WebKit light | Playwright WebKit dark |
|---|---|---|---|---|
| M-1 | PASS 11 | — | PASS 11 | — |
| M-1x (H3-1) | REPORTED (a) | REPORTED | REPORTED | REPORTED |
| M-2 | FAIL 9/457 | FAIL 156/457 | FAIL 3/457 | FAIL 159/457 |
| M-2m | PASS 215 | FAIL 98/215 | PASS 215 | FAIL 89/215 |
| M-2h | FAIL 7/22 | FAIL 13/22 | PASS 22 | FAIL 10/22 |
| M-3 | **FAIL 7/171** | FAIL 130/171 | **FAIL 1/171** | FAIL 126/171 |
| O-66 | PASS 3 | PASS 2 | PASS 3 | PASS 2 |
| **STACK** | **PASS 12** | **PASS 12** | **PASS 12** | **PASS 12** |
| W-A | PASS 108 | FAIL 28/108 | PASS 108 | FAIL 27/108 |
| HOV | PASS 58 | PASS 58 | PASS 58 | PASS 58 |
| LIT, T | REPORTED / PASS | | | |

(`baseline.mjs` prints M-1x, LIT and T as "PASS 1": one reported row each.) The dark columns are 10.1.0's dark arm, which the minor does not change (W-H.2's). G6 and G7 read them against HEAD.

**`diff pass-5/MS3-records/baseline-minor3.md baseline-minor4.md`** prints five rows. **STACK 3/12 → PASS 12 in all four columns (FL-14).** Chromium light M-3 2 → 7: the two held-well reds are cured, and the seven Close-ring reds are new under the shell's raster (below). Chromium dark M-2 158 → 156, dark M-3 129 → 130 and dark W-A 26 → 28 (launch-attributed: the shell's software composite moves the dark third-decimal rows, H6 §3.2; G6 and G7 read them as 0.0000 drift and 0 regressions against HEAD under the same raster). W-E, W-F and W-G are banked families, and their aurora rows moved with the shell's `css` ground (H6 §3.2). **Every Playwright WebKit column equals pass 5's** except STACK, which is FL-14's.

**M-2 light: green on every read row.** Chromium's 9 are the runs HEAD also leaves unread: `floating-held` fg and muted in the three held cells (the held floating specimen hides its text; 1.46-1.50) and `quiet-in-card` ×3 in the claim cell. Playwright WebKit's 3 are the claim cell's.

**M-2h, the held dock ≥ 4.5: met.** In every light release window (18-19 frames, three grounds) every dock-held ink is ≥ 4.5 in every frame. The minimum is dock fg **7.57** over black (R3 7.43), and the well-muted reads 5.60. The light red rows are the unread `floating-held` run (×3 per window) and the halo leg: held dock α **0.807** (x 411) … 0.899 against floor 0.870, resting 0.890. That is N-3's attributed veil frost (FV5 §2.4: flat 0.894 with the veil hidden at this radius). Dark: HEAD's rows, halo 0.121 against floor 0.123. Playwright WebKit light reads PASS 22.

**M-3 light.**

| row | Chromium | Playwright WebKit | HEAD (Chromium) |
|---|---|---|---|
| every resting ladder row, 7 grounds | perimeter ≥ **3.13** (the wash well over black the lowest), rings 3.30-3.57: all 16 ≥ 3.0 on each ground | ≥ 3.0 except the checker floating well ring **2.99** (pass 5's digit; HEAD 2.82) | 2.30-2.82, rings down to 1.02 |
| held floating well (black / white / aurora) | **3.27 / 3.33 / 3.32** (FL-14) | 3.14 / 3.38 / 3.38 | — |
| **real Dialog Close ring, every light ground** | **2.77 ✗** (7 of 7 grounds; perimeter 3.33) | **3.25** | **1.61-1.80** (1.02 over black) |

**The Close ring.** It is `:where([data-slot="dialog-close"]):focus-visible`'s 2 px outline at `--ink-perimeter` (FL-10's routing, in the minor since v2). Under the headless shell's software raster at R-7's 0.54 it reads 2.77. FV5 §5 measured this ring under the shell and found 2.66 at 0.52 (the floor), **2.77 at 0.54** (this build's value, to the digit) and 3.20 at 0.60. Pass 5 read the minor's ring ≥ 3.0 under the GPU arguments, so the cause is the launch (H6 §3.2), not a route change. **It is the same open item as floor v5's row 6, and it closes on the same ruling on measurement** (FV5 §5's three options: the shell's raster is the gate and the light perimeter rises, measured 0.60; or the ring reads at a stated raster; or a ring-local rung). R-7 ruled 0.54 for the minor, and a perimeter change moves every control edge library-wide, so this seat does not take one. It is no G7 regression: HEAD fails the same ring far lower. Re-run twice (05:47, load 13.4; 05:50, load 21.5): 2.77 both times. **Not NOT-REPRODUCED.**

**H3-1, off paper (Q-11 unruled; default (a), REPORTED)** (`M-1x-a-*.log`): 48 of 66 off-paper light composites read grey or the ground's hue, in each engine. 24 of them are chrome, "accepted under (a)'s text". The content rungs read grey off paper: **wash, quiet, resting, card**. Over black the wash is `#e2dcd7` (L 0.898, C 0.0095), quiet `#ebe5df`, resting and card `#f5eee8`. Over the deep canvas `#193b59` the wash is `#e3e3e3` (C 0.0000), quiet `#eceae7`, resting and card `#f5f0ec`. Over black these are pass 5's hex. Over the deep canvas they move by one 8-bit step under the shell (pass 5: quiet `#eee9e6`, resting `#f6f0eb`). For the record: `--q11 b` reads M-1x FAIL 12/21 and W-A FAIL 29/216 (Chromium) and 28/216 (WebKit), because the minor builds (a). (b) is a floor variant (`fv3/q11b.*`), not a minor build.

---

## 8 · Toolchain, the bundle ratchet and the pinned-test landing debt (`toolchain.log`, `ratchet.log`, `roster.log`; 05:51-05:54, load 19.9-22.0)

| step | minor v4 |
|---|---|
| `vue-tsc --noEmit` | exit 0 |
| library build (`cacheDir` in the worktree) | exit 0 |
| `vue-tsc -p tsconfig.test.json` | exit 0 |
| dist-demo (before units) | exit 0 |
| `vitest run --maxWorkers=2` | **239 files: 2321 passed, 0 failed**, 10 expected-fail, 1 skipped |

**Bundle ratchet:** `node scripts/verify-export-types.mjs` on minor v4's library build: `G-BUNDLE-RATCHET: bundle ratchet increase forbidden: 2921383 > 2919057`, exit 1. On HEAD's build it exits 0, CLEAN. **Delta +2,326 B** (v3: +2,307 B; v4 adds 19 B net, the FL-14 declaration and comments). With the datum rebound in the worktree only, the verifier reads `terminal CLEAN`, roster PRESENT 289 = 289. **Rebinding `.bundle-ratchet` to the measured bytes is the landing's job.**

**The pinned-test landing debt.** Every arm is rewritten to the law the minor ships, and none is skipped or loosened. Seven test files:
- Carried from v2 and v3: `glass-subtlety` (the bound, the light ladder, the held floor, the rung pairing, floating 18 and overlay 20 at two sites, band [6, 20]), `contrast-computed` (29 arms), `focus-veil` (1), `proportion-register` (perimeter 0.54, ratio 6.75, indicator 0.27), `Surface` (the deep ladder 21.5 / 25), `use-accent-tone`, and `engage-ladder` (a comment).
- **New in v4:** one `glass-subtlety` arm, "seats every plate as its own stacking context, held or at rest", which reads `@utility glass-plate` (comments stripped) for `isolation: isolate`. It is the static half of FL-14. Its paint half is STACK and the held well (§5).
- **None of R-12 or R-13 is pinned by a test.** R-12 is gated by `FV5-demo-probe.mjs` (paint) and R-13 by the grep (§1.3).

---

## 9 · Glance pairs (`glance-minor4/`, `SHA256.txt`)

| pair | Chromium paint | Playwright WebKit paint |
|---|---|---|
| HEAD → minor v4: light dock / Dialog / floating | 95.65 / 89.67 / 82.44 % (layout none) | 95.72 / 89.72 / 82.43 % |
| light story | 92.99 % (layout 12.1 % of plates moved, median 22.4 px: the demo copy) | 94.14 % (9.1 %) |
| dark dock / Dialog / floating | 1.75 / 0.67 / 0.86 % | 1.83 / 0.64 / 0.78 % |
| dark story | 5.17 % | 13.34 % |
| **minor v3 → minor v4, dock search, pointer on row 1** (R-12) | light 36.90 %, dark 36.02 % | not readable (H-14) |

`--require-delta`: **GLANCE PASS, 8 of 8 pairs in each engine.** FL-14 and R-13 add no visible paint at rest: the HEAD → minor v4 deltas equal MS3 §7's HEAD → minor v3 deltas to within 0.3 % in Chromium (light story 93.28 → 92.99 %, under the shell's raster) and to within 0.02 % in Playwright WebKit.

**By eye (O-87, the frames this reading cites):**
- `glance-chromium-light-story-base-vs-minor4.png`: HEAD's cards are tan, and the live-canvas card is navy. On the minor the cards are cream, and the live-canvas card is a cream frost. The copy reads "earned ink" and "frosts toward cream", which matches the paint. Wash, quiet and resting still read as one paint (Q-1).
- `glance-chromium-dark-dock-search-pointer-minor3-vs-minor4.png`: on the left, the keyboard's row 0 keeps its tint while the pointer sits on row 1, which carries a second, lighter tint. On the right, only the pointed row is tinted, and the highlight follows the pointer. One register, flatter, and it carries state (D-2, O-87).
- `glance-chromium-dark-dock-base-vs-minor4.png`: the pill sits flat with one quiet edge, and the zero-offset glow is gone (W-0.11's cast).

No lighting layer, shadow or gleam is added. **Owner look-at list:** `glance-chromium-light-{dock,dialog,floating,story}-base-vs-minor4.png` (10.2.0's veil recut), `glance-chromium-dark-dock-base-vs-minor4.png` (W-0.11's dock cast) and `glance-chromium-{light,dark}-dock-search-pointer-minor3-vs-minor4.png` (R-12).

---

## 10 · Re-runs

| engine | cells | run 1 | run 2 | reading |
|---|---|---|---|---|
| Chromium | held, ladder, dialog × black, white, aurora, paper, both themes (`rerun-chromium.log`) | 05:47:42, load 13.4: Close ring 2.77 on every light ground; held well 3.27 / 3.33 / 3.32; halo light 0.807, dark 0.121; dock fg 7.57; STACK PASS 24 | 05:50:42, load 21.5: identical to the digit | **every red reproduced**, at loads above and below the battery's (8.7-17.3) |
| Playwright WebKit | light ladder, dialog × checker, white, black (`rerun-webkit.log`) | 06:06:36, load 20.7: checker floating well ring **2.99** (1/16 under 3.0); Close ring 3.25 on every ground; every other light ladder row ≥ 3.0 | 06:07:18, load 18.7: identical to the digit | **reproduced**: the informational engine's 0.01-under checker ring is pass 5's and H6's digit (HEAD 2.82). It moves no gate |

---

## 11 · Shippability for 10.2.0

| item | reading |
|---|---|
| G1 over paper | **green**, 11/11 in both engines |
| G2, G3 | **green** (ΔE 0.000; C 0.0256) |
| G4, G5 | **green**; ratchet rebind owed at landing (**+2,326 B**) |
| **G6** | **green per R-9** (0.0000); raw 1 of 26 at **0.0022**, W-0.11's own dark dock row, printed beside it as R-9 orders. R-9's reading must enter W-0.1 §5 G6's text at landing (P5-3.4 item 4; the owner may override) |
| **G7** | **green as written**: 0 regressions in M-2 (1,125 rows) and M-3 (70), both engines |
| **W-0.11 G1-G6** | **green** (census 0/0/0/0 with its exact bite; 0 of 1,442 and 0 of 420 regress against the W-0.1 tree) |
| **FL-14 in source** (P5-3.2's owed reading) | **done and green**: STACK 24/24 in each engine, held well ≥ 3.27 in Chromium, G1-G7 held, G6 raw unchanged in kind (the one dock row), roster unchanged, `plant-noisolation` red in both engines. P5-3.4 item 3 is closed |
| R-12, R-13 | **built**: probe PASS on minor v4 and FAIL on minor v3 (Chromium, both themes); R-13 grep 0 on minor v4 and 11 lines on minor v3 |
| M-2 light, M-2h | **green** on every read row; held dock ≥ 7.57 |
| **M-3 light** | **one open item**: the real Dialog Close ring at **2.77** under the shell's raster (7 grounds, twice). Every plate row, the held well included, is green. Floor v5's row 6 waits on the same ruling on measurement (FV5 §5) |
| island | not re-read: FL-14 moves no dark composite (0.0000 over 26). MS3 §5's ΔE 0 stands |
| tests | 2321 passed, 0 failed |

**Reading.** Minor v4 is the measured shape of 10.2.0's veil recut and W-0.11's tokens. **Every item the registry set for this build is built and green, with one exception.** FL-14 holds in source. R-11's one ladder is shared with floor v5. R-12 and R-13 are in, with their plants red. The **one exception is M-3's light Close ring under H6**, which the aim (light green on every row) does not yet meet. Its cause and its candidate value are floor v5's row 6. One ruling on measurement in the registry settles both builds together: either the light perimeter rises to a value the shell clears (0.60 measured, with R-7 and O-98 R-3's headroom moving with it), or the ring reads at a stated raster where 0.54 already reads ≥ 3.0.

So W-0.1 and W-0.11 **cannot ship from the minor v4 in 10.2.0 yet**, for three reasons, none of which a seat may supply:
1. **The entry gate:** 0 of 2 clean passes (W-0.1 §3, W-0.11 §3.3). It waits on the owner (Q-1, Q-3, Q-11 both clauses, Q-14) and on row 6's measurement ruling.
2. **M-3's Close ring under H6:** the ruling on measurement above (registry), shared with floor v5's row 6.
3. **The landing's own items, unchanged:** R-9's reading into W-0.1 §5 G6's text; each gate bound to one probe (W-0.1 §5 and W-0.11 §5 name `scripts/probes/band-0/*`, which the tree lacks; P5-3.4 item 5); the ratchet rebind (+2,326 B).

**Q-11, off paper, stated separately.** Under the default (a), M-1x is REPORTED: 48 of 66 off-paper light composites read grey or the ground's hue in each engine. The 24 chrome rows are accepted by (a)'s text, and the **content rungs wash, quiet, resting and card read grey off paper** (wash over black `#e2dcd7`, L 0.898, C 0.0095; over the deep canvas `#e3e3e3`, C 0.0000). Nothing in v4 moves an off-paper composite. G1 is green over paper and says nothing about what the owner sees over dark grounds. Whether 10.2.0 may ship grey content off paper is Q-11's content clause, still unruled. It is the one owner ruling between this build and W-0.1's G1 read off paper. "Not accepted" has no measured minor candidate and fires C″'s re-trigger (c).

---

## 12 · Known limits and handed on

| item | to | why |
|---|---|---|
| M-3's Close ring under H6 (2.77 at 0.54) | the agglomerate: one ruling on measurement for floor v5's row 6 and this ring together | §7; FV5 §5 |
| the further light-false "darken" sentences R-13 does not name (§1.2's list) | the critic, then the agglomerate (a minor DEL declaration, or a ruling that the bucket comments are the dark arm's) | a seat-chosen sweep is the class P5-0 finding 3 records |
| R-12 in Playwright WebKit | none possible in this harness | the demo dock page crashes it (H-14); Safari UNMEASURED (owner's safaridriver checkbox) |
| the WebKit lock held idle 40 min (04:17-04:57) | the driver (a cost to other seats) | the admission waited on this seat's Chromium chain; a later seat should queue WebKit only once its Chromium phases are done |
| `nofl14.css` is an injection | — | FL-14's "before" is minor v4 with the declaration overridden, not a v3 build; the specimen CSS byte count (minor v3 398,144 B) shows the v3 swap itself was exact, and R-12 and R-13 change no specimen pixel |
| R-9's injection read in Chromium only | — | as pass 5; Playwright WebKit's raw G6 has 0 over |

## 13 · Reproduce

```sh
P6=docs/tranches/BL/design/material/pass-6
git worktree add --detach .claude/worktrees/bl/D3/p6/minor4/wt HEAD    # link node_modules per entry; git apply $P6/minor-split-v4.patch
~/.claude/guard/guarded --light --timeout 20 -- bash $P6/MS4-run.sh static
~/.claude/guard/guarded --timeout 90 -- bash $P6/MS4-run.sh build
bash $P6/MS4-run.sh cr-chain battery-cr refs-cr demo-cr glance-cr      # each phase under its own guarded admission
~/.claude/guard/guarded --timeout 90 --exclusive webkit -- bash $P6/MS4-run.sh wk-inner
~/.claude/guard/guarded --light --timeout 30 -- bash -c 'for p in witnesses baseline verbose g67 readings; do bash $P6/MS4-run.sh $p; done'
~/.claude/guard/guarded --timeout 60 -- bash $P6/MS4-run.sh rerun-cr
~/.claude/guard/guarded --timeout 60 -- bash -c 'bash $P6/MS4-run.sh toolchain && bash $P6/MS4-run.sh ratchet && bash $P6/MS4-run.sh roster'
~/.claude/guard/guarded --timeout 40 --exclusive webkit -- env RERUN_THEMES=light RERUN_SCENES=ladder,dialog \
  RERUN_GROUNDS=checker,white,black RERUN_WITNESSES="m3-non-text m2-text-contrast" bash $P6/MS4-run.sh rerun-wk
bash $P6/MS4-run.sh teardown
# §1.2's wider sweep: grep -rnEi 'darken' <wt>/src <wt>/demo/stories | grep -viE 'press|tone-step|well|darker in dark|in dark'
```
