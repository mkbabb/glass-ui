# D3 · pass 5 · MINOR-SPLIT v3: the build 10.2.0's veil recut and lighting tokens would ship from, measured once under H5

| field | value |
|---|---|
| seat | D3 pass 5, the minor split v3 (`REGISTRY.md` P4-6.2 step 3). A build, not a route |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | worktree `.claude/worktrees/bl/D3/p5/minor3/wt` cut at `19ac57b11`, removed at the end. `git diff --stat d8e32cab 19ac57b11 -- src demo tests package.json scripts tests-visual vite.targets.ts` prints nothing, so the base is the published 10.1.0 source, as in every pass-4 and pass-5 seat. At teardown the checkout's HEAD was `0ce3bb028`, and `git apply --check minor-split-v3.patch` is clean there |
| patch | `minor-split-v3.patch` (this folder): 43 files, +590 / −428, sha1 `1e4b1ff2`. `git diff HEAD --binary` of the measured tree equals the file (`cmp`). The delta over `pass-4/minor-split-v2.patch` is 17 files (`MS3-records/delta-v3-over-v2.diff`) |
| owner rulings | **None has arrived on Q-1, Q-3, Q-9, Q-11 (chrome or content clause), Q-12 or Q-13.** `audit/INBOUND.md` still ends at O-98, and no row answers a D3 question. `FORMATION-PROGRESS.md`'s last D3 line is the floor v4 bank. The defaults apply: Q-1 (a), Q-3 (a), Q-11 (a) for chrome with content REPORTED, Q-12 (a), Q-13 (a). O-98 R-3 (a placement-owed relay) names the field-control border's thin headroom against `--ink-perimeter`. R-7 raises that rung, so the border moves away from its floor |
| engines | Chromium 149 gated. **Playwright WebKit 26.5** informational: it paints no `backdrop-filter`, and the dock rows run `+shim`. **Every real-Safari cell: UNMEASURED (owner's safaridriver checkbox)** |
| records | `MS3-records/`: `admission-*.log` (each guarded admission, with load), `phase-*.log`, `minor3-run-{chromium,webkit}.log`, `minor3-results/`, `baseline-minor3.{md,json}`, `verbose/` (HEAD, minor v3, the search variants, R-9, FL-14, re-runs), `g7-*.txt`, `g6-*.txt`, `w011g6-*.txt`, `island-*`, `glance-*.log`, `units.log`, `tsc-*.log`, `verifier*.log`, `census-*.log`, `LIT-*.log`, `HOV-*.log`. `MS3-run.sh` and `MS3-wk-inner.sh` hold every command. `MS3-variants/` holds the injections. `glance-minor3/` holds the glance pairs and `SHA256.txt` |
| fences | No tracked source edited in the checkout, and no git write in it beyond `git worktree add` and `remove`. The worktree's `node_modules` was a directory of per-entry symlinks into the checkout's, so every vite and vitest cache, build and capture lived in the worktree (`$W/.d3out`, `$W/.cache-m3`). The plant tree (minor v2, R-4 as built) was a `git archive` copy under the seat's scratch. The only checkout writes are under `docs/tranches/BL/design/material/pass-5/`. Nothing ran in a sibling repo |
| machine law | Every build, capture, witness pass, typecheck and test ran through `~/.claude/guard/guarded`. Every Playwright WebKit run also went through `--exclusive webkit`: one admission held the WebKit battery, the HEAD cells, the W-0.1-tree reference, the island and the glance (`MS3-wk-inner.sh`), and a second held the re-runs. One heavy run at a time; vitest `--maxWorkers=2`. No admission waited 30 min; the longest wait was the WebKit lock, about 10 min. The kernel zone refusal never fired. Nothing of this seat is left running. The worktree and the empty `minor3/` folder are removed |

Short citations: `MS2` (`pass-4/MINOR-SPLIT-v2.md`), `FV4` (`FLOOR-V4.md`), `H5` (`H5.md`), `Reg` (`REGISTRY.md`, the Pass 4 part).

---

## 0 · In brief

- **The build:** minor v2 + R-6 in minor names (with floor v4's hold) + R-7 (`--ink-perimeter: 0.54`) + R-8 (`--glass-blur-floating-radius: 18px`, overlay `20px`) + the demo copy. FL-14 is measured as an injected variant.
- **R-8:** 16 and 17 px read the dark Dialog over white at p05 **4.46**. **18 px reads 4.51**, which equals the W-0.1 tree. So 18 is the least radius that holds both that row and W-0.11's G6. It is still 2 px under 10.1.0's floating radius. The row does not go to the owner under Q-9.
- **W-0.1 G1-G7, Chromium:** G1 **PASS** 11/11, G2 **PASS** (ΔE 0.000 both themes), G3 **PASS** (C 0.0261), G4 **PASS** 108/108, G5 **PASS** (roster 289 = 289; the ratchet owes **+2,307 B**). **G6 per R-9: PASS**, 0 of 13 dark composites over 0.002, worst 0.0000. G6 raw: 1 of 26 over, the dark paper dock ΔE 0.0038, W-0.11's own row. **G7: PASS**: M-2 1,122 HEAD-PASS rows with **0 regressions** (v2: 1), and M-3 72 with 0.
- **W-0.11 G1-G6, on the same tree:** the census reads `stacked=0 halo=0 blur=0 open=0`, and the 10.1.0 styles still read exactly `stacked=2 halo=2 blur=5 open=9`. So G1-G4 **PASS**. G5 **PASS**. **G6 PASS:** M-1 11/11, and against the W-0.1 tree M-2 716 rows (Chromium) / 1,438 (both engines) and M-3 211 / 426 PASS rows, with **0 regressions**.
- **M-3 light:** every resting row is ≥ 3.0 in Chromium (the wash well over black reads **3.13**). Two rows are red, and both are the held floating plate's well (2.64 over black, 2.95 over the aurora). **The FL-14 variant cures them** (3.28 and 3.33) and greens STACK 24/24, with G1, G6 (raw unchanged) and G7 held.
- **M-2 light:** green on every read row. **M-2h:** the held dock is ≥ 4.5 in every frame (minimum 7.58 over black), so FL-7 holds.
- **Tests:** 2320 passed, 0 failed. Typechecks, the library build and dist-demo all exit 0.
- **Off paper (Q-11, unruled):** 48/66 grey, the same hex as v2, floor v3 and floor v4.
- **Shippability:** every value and reading P4-3.1 ruled for the minor now reads green (§8). What still holds 10.2.0 is the owner's: Q-11's content clause (G1 off paper), and the entry gate of two clean passes, which waits on Q-1 and Q-11.

---

## 1 · The build (`minor-split-v3.patch`)

### 1.1 · What v3 adds over v2

| row | value | where |
|---|---|---|
| **R-6** in minor names | The menu row's fill is state. `.glass-menu-row:hover` keeps its pointer lift, and its fill legs go: `background-color: transparent` and no `color`. The hover block moves **before** the engaged group (`:focus`, `[data-highlighted]`, `[data-state=open]`), so at equal 0-3-0 specificity a highlighted row under the pointer takes the state fill. This is floor v4's held form (FV4 §2.2), not the literal wording, for the same reason: every row also composes `.interactive-item`, whose `:hover` would otherwise paint `--accent` at 50% (a beige-grey) on a row the pointer rests on while the keyboard highlights another. The minor's `--menu-row-bg` stays `light-dark(<amber tint at --fill-selected>, var(--glass-plate-quiet))`, R-4 as built. The register text is narrowed: `color-radius.css` `--fill-selected` "state: persistent selection, and the menu's one highlighted row … a bare :hover cannot mint it", and `card/styles.css:164`. The prose sweep cures `menu.css` ("a highlight FILL"), `dock/styles/search.css` (×2), the `engage-ladder` test comment, and the demo dock-search's own hover leg on `--fill-hover` (FV4 §2.1, verbatim) | `_shared/menu/menu.css`, `tokens/color-radius.css`, `card/styles.css`, `dock/styles/search.css`, `tests/styles/engage-ladder.test.ts`, `demo/stories/dock/dock-search.vue` |
| **R-7** | `--ink-perimeter: 0.54`, one value read by both modes (`color-radius.css` §1.2: the dark arm inherits the stroke scalars). The ratio prose reads seam : edge : perimeter = 1 : 2 : **6.75**, and the indicator derivation reads 2px @ **0.27** (2 × 0.27 = 0.54). The rung comment states what was measured ("≥ 3.0:1 on every resting light plate at the bound, the wash well over black the lowest (0.52 read 2.96 there, 0.48 read 2.79)"). `control-bit.css`'s history line says 0.54. The `proportion-register` arms take 0.54, 6.75 and 0.27 | `tokens/color-radius.css`, `glass/control-bit.css`, `tests/styles/proportion-register.test.ts` |
| **R-8** | `--glass-blur-floating-radius: 18px`, `--glass-blur-overlay-radius: 20px` (floating + 2). Wash, quiet and resting stay 6/10/12. The ladder 6/10/12/18/20 is strictly ascending, and each rung is below 10.1.0's (10/14/16/20/22). The deep ladder follows by construction: 7.75/11.75/13.75/**21.5/25**. The comment states the search (§2). Its tables in `glass.css`, `ladder.css`, `deep.css` and `glass-deep.css` and the pinned arms in `glass-subtlety` (floating 18, overlay 20 at two sites, band [6, 20]) and `Surface` (the deep ladder) follow | `tokens/glass.css`, `glass/ladder.css`, `glass/deep.css`, `tokens/glass-deep.css`, `tests/styles/glass-subtlety.test.ts`, `tests/components/ui/surface/Surface.test.ts` |
| **demo copy** (FL-12 prose) | The glass-material story said the plate "darkens". In light the earned ink now thickens the cream pole (the minor's `veil.css` prose already says so). The manifest says "the observer-driven earned ink". The alert section says "Watch the plate thicken as the painterly field brightens behind it: in light it frosts toward cream, in dark it deepens". The "earned-darken clamp" becomes "earned-ink clamp" (×2), and the live-sample comment changes the same way. The two `dock/` files the minor touches had the same false sentence about light: "the earned darken" (`dock.css` ×2) and "field and plate darken in lockstep" (`search.css`) now read "earned ink" | `demo/stories/manifest.ts`, `demo/stories/substrates/glass-material.vue`, `dock/styles/dock.css`, `dock/styles/search.css` |

No name is added or removed by v3. Added over 10.1.0 in the whole minor: `--glass-veil-floor` (v2's), `--glass-bound`, `--glass-ink-target` (pass 3's). G5 below.

### 1.2 · Static readings (`MS3-run.sh static`)

| reading | minor v3 | plant |
|---|---|---|
| O-87 census (W-0.11 appendix A) | `LIGHTING-CENSUS stacked=0 halo=0 blur=0 open=0`, exit 0 (re-read after R-8) | `git archive v10.1.0 src/styles`: exactly `LIGHTING-CENSUS stacked=2 halo=2 blur=5 open=9`, exit 1 |
| **HOV** (H5-3) | **PASS 58** (`HOV-minor3.log`). Built on `--fill-selected`: the same eight properties H5 lists, and no `:hover` paints one | **minor v2, R-4 as built: FAIL 1/58** (`HOV-plant-minor2.log`) |
| prose sweep (`hover cannot mint`, `hover FILL`, `glass-quiet hover-lift`) | one hit, the narrowed `color-radius.css:166` text, which HOV now makes true | minor v2: 5 false sentences (`color-radius.css:164`, `card/styles.css:164`, `menu.css:3`, `search.css:17,64`) |
| LIT (H5-2), static | `LIGHTING-LITERALS halo=5 near=1 stacked=10 chain=3 open=19`: the 19 inherited literals H5 lists, none added. REPORTED | — |

**The earned-darken sentences left in untouched files**, for the critic and W-0.1's landing prose. These are `glass.css:47`, `glass/surface-axis.css:42`, `glass/ladder-undershadow.css:17`, `glass/surfaces.css:58`, `button/styles.css:126`, `_shared/feedback/feedback-tone.css:38`, `dock/styles/shell.css:235` and `dock/styles/adaptive-legibility.css:38,43`. Each names the clamp by its 10.1.0 name. They are true in dark and describe the light arm by the old law. None is in a file the minor touches, so FL-12's sweep (every touched file) does not reach them. The registry ruled only the demo copy.

---

## 2 · R-8: the floating radius search

Injections over the minor v3 build at floating 16 (`MS3-variants/r17.css`, `r18.css`, `r19.css`; overlay = floating + 2, wash/quiet/resting as built). The reference is the **W-0.1 tree**: the same build with W-0.11's values backed out (10.1.0's blur ladder and shadow tokens in both modes, `w01ref.css`), which is what W-0.11 §5 G6 compares against. The run was Chromium, both themes, scenes `ladder, dialog, held, hostile` on every ground the harness assigns them (44 cells per variant). Captures ran 17:10-17:41, load 7.6-16.3 (`admission-1.log`).

| floating / overlay | dark Dialog over white, fg p05 (Chromium) | W-0.11 G6, M-2 (716 HEAD-PASS rows of the W-0.1 tree) | W-0.11 G6, M-3 (211) | M-1 light | light M-3 wash well over black | held dock halo leg (light, Chromium) |
|---|---|---|---|---|---|---|
| W-0.1 tree (20 / 22, 10.1.0 shadows) | **4.51** | (reference) | (reference) | PASS 11 | 3.13 | 0.780 |
| 16 / 18 (v2's ladder) | **4.46 ✗** | **1 regresses** (that row) | 0 | PASS 11 | 3.13 | 0.827 |
| 17 / 19 | **4.46 ✗** | **1 regresses** (that row) | 0 | PASS 11 | 3.13 | 0.827 |
| **18 / 20** | **4.51** | **0** (1 more passes) | 0 | PASS 11 | 3.13 | 0.801 |
| 19 / 21 | 4.51 | 0 (1 more passes) | 0 | PASS 11 | 3.13 | 0.789 |

Sources: `verbose/m2-s-*.txt`, `w011g6-m{2,3}-r*.txt`, `verbose/m1-s-*.txt`, `verbose/m3-s-*.txt`, `verbose/m2h-s-*.txt`.

**The least radius that holds both rows is 18 px.** It is built (§1.1), and the full battery below measures the built value, not the injection. At 18 the dark Dialog's p05 equals the W-0.1 tree's to the digit. The blur moves only that one row among 716, and only below 18. The dark muted run in the same cell reads 2.90 at 18 and 2.87 at 16; it fails 4.5 at HEAD as well, so it is not a G7 row. **The row does not go to the owner under Q-9.**

**What 18 px costs.** "Slightly less blur" becomes 2 px off floating and overlay instead of 4. The focus-veil blur reads the floating radius (`--glass-focus-veil-blur`), so the light held-dock halo leg (N-3's attributed veil frost; floor 0.870 is missed at every radius) reads 0.801 at 18 against 0.827 at 16. **Floor v4 takes this ladder (one ladder, Reg R-8) and re-reads M-2, M-8 and T.** That re-read is the floor seat's, not this one's.

---

## 3 · Measured under H5

### 3.1 · Runs and loads

| run | when | load (1-min) | records |
|---|---|---|---|
| builds (minor v3 + HEAD, specimens and demo), the search | 17:10:30 → 17:41:39 | 24.2 → 14.9 | `admission-1.log` |
| rebuild at 18 px + Chromium battery (`run.mjs --engines chromium`: 70 cells, 4 live, 4 motion, 2 drift windows, 3 retunes, `noclaim`) | 17:43:01 → 18:01:21 | 14.6 → 12.4 | `admission-2.log`, `minor3-run-chromium.log` |
| HEAD cells, R-9, FL-14, island, glance (Chromium) | 18:04:38 → 18:23:06 | 12.3 → 19.7 → 15.2 | `admission-3.log` |
| Playwright WebKit: battery, HEAD cells, W-0.1-tree reference, island, glance (one exclusive admission) | lock about 18:23, 18:23:47 → 18:58:06 | 12.9 → 9.2 | `admission-4-webkit.log`, `minor3-run-webkit.log` |
| witnesses, baseline, verbose, G6/G7 | to 19:07:31 | 19.4 → 23.6 | `admission-5.log` |
| Chromium re-runs (twice), toolchain, ratchet, roster | 19:08:18 → 19:17:47 | 23.0 → 21.7 | `admission-6.log` |
| Playwright WebKit re-runs (twice) | 19:35:26 → 19:38:16 | 21.6 → 18.6 | `admission-7-webkit-rerun.log` |

The Playwright WebKit battery's `run.mjs` retired WebKit at 60 page loads, as every battery does (`minor3-run-webkit.log`).

**Every red or margin cell was re-captured twice in its engine and reproduced to the digit** (`verbose/rerun-*`). Chromium, at load 24.2 and 26.4: the dark Dialog over white 4.51, the light held floating well 2.64 / 2.95, the black wash well 3.13, and the halo leg 0.801. Playwright WebKit, at load 21.8 and 18.6: the light checker ring 2.99 and the dark Dialog over white 4.46. **None is NOT-REPRODUCED.**

### 3.2 · W-0.1 G1-G7, per engine

| gate | Chromium | Playwright WebKit | HEAD (same session, same harness) |
|---|---|---|---|
| **G1** · M-1 no grey | **PASS 11/11**: wash `#fef7f2`, quiet `#fff8f1`, resting and card `#fef7f1`, floating `#fef7f2`, overlay `#fff8f1`, dialog rung `#fef7f1`, dock `#fdf7f2`, popover `#fef7f2`, real Dialog `#fef7f1`; L 0.980-0.983, ΔE 0.009-0.010 from paper `#fbfaf8` | PASS 11/11 | FAIL 22/22 (both engines, pass 4) |
| **G2** · O-66 field | **PASS**: light trigger `#f3ece2` = Input `#f3ece2`, ΔE **0.000** on paper and in the pane; dark `#3f3731` = `#3f3731`, 0.000 / 0.000 | PASS (the same hex) | light 0.028 / 0.192; dark 0.175 / 0.167 |
| **G3** · O-66 row, light | **PASS**: row `#f2e6d5` C **0.0261**, ΔL −0.0503 against the plate `#fef7f2`. Dark recorded: `#0f0b05`, ΔE 0.003 (W-H.1's) | PASS: `#f2e5d5` C 0.0256 | C 0.0094 |
| **G4** · W-A, light | **PASS 108/108**: thinnest painted α 0.890 against the computed bound 0.891, content and chrome | PASS 108/108 | — |
| **G5** · scope | **PASS**: verifier with the datum rebound in the worktree only: `terminal CLEAN`, roster PRESENT 289 = 289, claims 193, declarations 454, css 124 (`verifier-rebound.log`). No name removed. `.published-roster` diff empty. **Unrebound: `G-BUNDLE-RATCHET … 2921364 > 2919057`, +2,307 B** (§6) | — | CLEAN at the datum (`verifier-head.log`) |
| **G6** · dark untouched, **per R-9** (W-0.11's dark shadow and blur put back to 10.1.0's, dark only: `r9-dark-head-w011.css`) | **PASS**: 13 dark composites compared, worst ΔE_OK **0.0000**, 0 over 0.002 (`g6-dark-m6-r9-chromium.txt`). M-2 on the same capture: 0 regressions | not injected (it paints no `backdrop-filter`, and its raw G6 has 0 over) | — |
| G6 **raw**, printed beside it | 1 of 26 dark composites over 0.002: `chromium dark paper · dock #0f0d0a → #0f0c09`, ΔE **0.0038** (W-0.11's dark dock cast and blur, MS2 §2.3; unchanged by R-7 and R-8). The other 25 read 0.0000 | counted in the 26 (0 over) | — |
| **G7** · no row regresses | **PASS**: **M-2 1,122 HEAD-PASS rows, 0 regress**, 0 missing, 377 more pass. **M-3 72 HEAD-PASS, 0 regress**, 354 more pass (`g7-m2.txt`, `g7-m3.txt`) | counted in the same rows | — |

**R-9's raw-bite check holds.** The injected reading compares only the dark-veil composites. Any dark change outside W-0.11's tokens would show in it; it reads 0.0000.

### 3.3 · W-0.11 G1-G6 on the same tree

| gate | reading |
|---|---|
| G1 · blur | census `blur=0`: the radii 6/10/12/18/20 are each below 10.1.0's 10/14/16/20/22, and ascending. **PASS** |
| G2 · stacked | `stacked=0` (one-layer `--shadow-modal`, one declaration for both modes). **PASS** |
| G3 · halo | `halo=0` (`--shadow-dock 0 6px 20px`, `--shadow-dock-collapsed 0 4px 12px`). **PASS** |
| G4 · bites | the tree's census exits 0, and `git archive v10.1.0 src/styles` prints exactly `LIGHTING-CENSUS stacked=2 halo=2 blur=5 open=9` (`census-v1010.log`). **PASS** |
| G5 · scope | W-0.1 G5: roster 289 = 289, every `--shadow-*` and `--glass-blur-*` name still declared. **PASS** |
| G6 · the material survives | M-1 PASS 11/11. Against the W-0.1 tree (`caps/s-w01ref`, both engines): **M-2 0 of 1,438 HEAD-PASS rows regress** (Chromium alone: 0 of 716); **M-3 0 of 426** (Chromium alone: 0 of 211) (`w011g6-*-minor3*.txt`). **PASS**. D3's O-87 frame rows: LIT frames read no halo ring, and the glance shows the dark dock with no ring (§7) |

W-0.11 §6's frame-read halo leg (H5-2's frame arm) is part of LIT in the battery: **PASS** in every column.

### 3.4 · M-2, M-3, M-2h, H3-1 (`baseline-minor3.md`)

| witness | Chromium light | Chromium dark | Playwright WebKit light | Playwright WebKit dark |
|---|---|---|---|---|
| M-1 | PASS 11 | — | PASS 11 | — |
| M-1x (H3-1) | REPORTED (a) | REPORTED | REPORTED | REPORTED |
| M-2 | FAIL 9/457 | FAIL 158/457 (HEAD's rows) | FAIL 3/457 | FAIL 159/457 |
| M-2m | PASS 215 | FAIL 98/215 | PASS 215 | FAIL 89/215 |
| M-2h | FAIL 7/22 | FAIL 13/22 | PASS 22 | FAIL 10/22 |
| M-3 | **FAIL 2/171** | FAIL 129/171 | **FAIL 1/171** | FAIL 126/171 |
| O-66 | PASS 3 | PASS 2 | PASS 3 | PASS 2 |
| W-A | PASS 108 | FAIL 26/108 | PASS 108 | FAIL 27/108 |
| HOV | PASS 58 | PASS 58 | PASS 58 | PASS 58 |
| LIT | REPORTED (frames: no halo) | REPORTED | REPORTED | REPORTED |
| T | PASS (reported) | PASS | PASS | PASS |

(`baseline.mjs` prints M-1x, LIT and T as "PASS 1" because each has one reported row. M-1x reads REPORTED in its own log.)

`diff` against `pass-4/MS2-records/baseline-minor2.md`: Chromium light M-3 4 → 2 and WebKit light M-3 7 → 1 (R-7); Chromium dark M-2 159 → 158, dark M-3 132 → 129 and dark W-A 27 → 26 (the shared perimeter and R-8 move dark rows toward green); W-E 13 → 11 light (banked witness); plus the two H5 rows (LIT, HOV). Every other row is equal.

**M-2 light: green on every read row.** Chromium's 9 red rows are the unread runs that HEAD also leaves unread: `floating-held` fg and muted in the three held cells (the held floating specimen hides its text, H3 §3.3) and `quiet-in-card` ×3 in the claim cell. Playwright WebKit's 3 are the claim cell's runs. **The held dock fg reads 7.58 over black** (R3 p05) and the well-muted reads 5.60.

**M-2h, the held dock ≥ 4.5: met.** In every light release window (33-79 frames, three grounds, both re-runs) every dock-held ink stays ≥ 4.5 in every frame. The light red rows are the unread `floating-held` run (×3) and the halo leg: held dock α 0.801 (x 411) … 0.899 against floor 0.870, resting 0.890. That leg is N-3's attributed veil frost, and the focus-veil blur sets it (§2). FL-7's floor holds. The dark rows are HEAD's: halo 0.122 against floor 0.125. R-2, which cured that on the floor, is not in the minor.

**M-3 light: every resting row green in Chromium.**

| row | minor v3 (0.54, 18 px) | minor v2 (0.52, 16 px) | HEAD |
|---|---|---|---|
| ladder and Dialog rows on every ground, resting | perimeter ≥ **3.13** (the wash well over black the lowest), rings 3.34-3.58 | 2.96 over black | 2.30-2.82, rings down to 1.06 |
| held floating plate's well, black / aurora (Chromium) | **2.64 ✗ / 2.95 ✗** | 2.50 / 2.80 | 2.79 / 1.08 (ring 1.06) |
| Playwright WebKit: checker, floating well ring | **2.99 ✗** (twice re-run: 2.99) | 2.83-2.96 | 2.82 |

The two Chromium reds are FL-14's (§4), not a perimeter value. The Playwright WebKit checker ring is the informational engine's (no `backdrop-filter`) and is 0.01 under. HEAD reads 2.82 there.

**H3-1, off paper (Q-11 unruled, default (a), REPORTED):** 48 of 66 off-paper light composites read grey or the ground's hue, 24 of them chrome, "accepted for chrome (Q-11 a)". Content rungs read grey off paper: **wash, quiet, resting, card**. Over black the wash is `#e2dcd7` (L 0.898, C 0.0095). Over the deep canvas `#193b59` the wash is `#e3e3e3` (C 0.0000), quiet `#eee9e6`, resting and card `#f6f0eb`. These are v2's, floor v3's and floor v4's readings to the hex. Neither R-7 nor R-8 moves a plate's off-paper composite.

### 3.5 · The rest of the battery, for the record

Chromium light: RAW PASS 24, M-5 PASS 10, M-8 PASS 4, M-9 PASS 10, W-S PASS 12, O-66 PASS. Red, each as v2 and each another wave's:
- M-4 7/84: the dock's muted ink at the `contrast-color()` pole, W-H.1's.
- M-6 16/16: stepped text, Q-1.
- M-7 4/4: `contain: paint`, W-E.2's.
- STACK 3/12: HEAD's `glass-floating` host, cured by FL-14 (§4).

Dark: the 10.1.0 rows. Banked witnesses W-B..W-G: recorded in `baseline-minor3.md`.

---

## 4 · FL-14 as an injected variant (`MS3-variants/fl14.css`; Chromium, both themes)

The one declaration, `isolation: isolate`, injected on every element that composes `@utility glass-plate` in the minor: the five rungs, `.glass-card`, the capsule and indicator, `[data-surface="veil"]` and the dock-search field. The pager plate is not in the battery's scenes and was not targeted. It is a stacking context, not a backdrop root. Scenes `ladder, dialog, held, hostile, halo, state` (`admission-3.log`, 18:14:46-18:21:40, load 9.8-19.7).

| reading | minor v3 | + FL-14 |
|---|---|---|
| STACK | FAIL 3/12 per theme | **PASS 24/24** |
| M-3 held floating well, light, black / white / aurora | 2.64 ✗ / — / 2.95 ✗ | **3.28 / 3.34 / 3.33** (rings 3.43-3.48) |
| M-1 (G1) | PASS 11 | PASS 11 |
| G6 raw | 1 over (the dock, 0.0038) | 1 over, the same row and value (`fl14-g6.txt`) |
| G7 against HEAD | — | M-2 0 regressions among the rows the variant carries; M-3 0 regressions, 181 more pass (`fl14-g7-*.txt`) |
| roster | — | unchanged (a declaration, no name) |

**The variant meets P4-3.1's condition.** It greens STACK and the held well and holds G1, G6 and G7, with the roster unchanged. So the split table **may** assign FL-14's one declaration to 10.2.0 as a composite-recipe change ("one element's composite recipe" is minor-lawful, W-0.1 §3). This seat does not build it. The assignment is the agglomerate's, and the variant is an injection over the specimen build, not a source build. Not read on the variant: R-9's injected G6 and the WebKit engine.

---

## 5 · The `.dark` island (`MS2-island.mjs`, both engines)

R-7's shared perimeter and R-8's blur reach dark paint, so the island was re-read. The minor v3 island equals the dark page on every element in Chromium: wash `#0c0a07`, quiet `#0c0b07`, resting `#0d0a07`, floating `#0e0b06`, overlay `#0e0a07`, trigger and Input `#3f3731`, **ΔE 0** each (`island-minor3-chromium.log`). Playwright WebKit agrees (`island-minor3-webkit.log`). HEAD's island trigger is `#120e0a` (Chromium, `island-head-chromium.log`), as pass 4 read it. v2's improvement holds.

---

## 6 · Tests and the bundle ratchet (`admission-6.log`, 19:14:42-19:17:47, load 21.7-26.9)

| step | minor v3 |
|---|---|
| `vue-tsc --noEmit` | exit 0 |
| library build | exit 0 |
| `vue-tsc -p tsconfig.test.json` (after the build) | exit 0 |
| `dist-demo` (from this tree, before units) | exit 0 |
| `vitest run --maxWorkers=2` | **239 files: 2320 passed, 0 failed**, 10 expected-fail, 1 skipped |

**The pinned-test landing debt** (every arm is rewritten to the law the minor ships; none is skipped or loosened):
- From v2, carried: `glass-subtlety` (the bound, the light ladder, the held floor, the rung pairing), `contrast-computed` (29), `focus-veil` (1), `proportion-register`, `Surface`, and `use-accent-tone`.
- Moved or added in v3:
  - `proportion-register`: perimeter 0.54, ratio 6.75, indicator 0.27.
  - `glass-subtlety`: floating 18, overlay 20 at two sites, band [6, 20].
  - `Surface`: deep ladder 21.5 / 25.
  - `engage-ladder`: a comment only.
- No `contrast-computed` arm reads the perimeter value, so R-7 moves none of its figures.

**Ratchet:** `node scripts/verify-export-types.mjs` on minor v3's library build: `G-BUNDLE-RATCHET: bundle ratchet increase forbidden: 2921364 > 2919057`, exit 1. On HEAD's build it exits 0, CLEAN. **Delta +2,307 B** (v2: +2,340 B), mostly rewritten comments. Rebinding the datum is the landing's job (Q-14's owner path). With the datum rebound in the worktree only, the verifier reads CLEAN and roster 289 = 289.

---

## 7 · Glance pairs (`glance-minor3/`, HEAD → minor v3; `SHA256.txt`)

| surface | Chromium paint | Playwright WebKit paint |
|---|---|---|
| light dock / Dialog / floating | 95.72 / 89.68 / 82.49% (layout none) | 95.72 / 89.72 / 82.43% |
| light story | 93.28% (layout 12.1% of plates moved, median 22.4 px) | 94.14% (layout 9.1%) |
| dark dock / Dialog / floating | 1.79 / 0.65 / 0.81% | 1.83 / 0.64 / 0.78% |
| dark story | 5.52% | 13.32% |

`--require-delta`: GLANCE PASS, 8 of 8 pairs in each engine. The dark Dialog and floating composites read the same hex as HEAD (`#151009`, `#0e0b06`). Their paint delta is the cast region, W-0.11's. The story's layout move is the demo copy: the manifest description now wraps to two lines, not three.

**By eye (O-87, row 22):**
- `glance-chromium-light-story-base-vs-minor3.png` (`df4c1475…`): HEAD's cards are tan and the live-canvas card is navy. On the minor, the cards are cream and the live-canvas card is a cream frost. The copy now says "earned ink" and "frosts toward cream", which matches the paint. Wash, quiet and resting still cannot be told apart (Q-1).
- `glance-chromium-dark-dock-base-vs-minor3.png` (`4591349e…`): HEAD's pill sits in a soft zero-offset glow ring. The minor's pill sits flat on the page with one quiet edge.

No lighting layer, shadow or gleam is added. The edge-gleam copy ("Hover any plate and the edge gleam follows the cursor") is unchanged. Under O-87 it is the critic's to judge (Reg P4-5).

**Owner look-at list:** `glance-chromium-light-{dock,dialog,floating,story}-base-vs-minor3.png` (10.2.0's veil recut) and `glance-chromium-dark-dock-base-vs-minor3.png` (W-0.11's dock cast).

---

## 8 · Shippability for 10.2.0

| item | reading |
|---|---|
| G1 over paper | closed, 11/11 in both engines |
| G2, G3 (O-66 §1) | closed in both themes (ΔE 0.000; C 0.0261) |
| G3's register (R-6) | closed: HOV PASS 58, R-4 as built red (minor v2 FAIL 1/58), prose sweep 0 false sentences |
| G4, G5 | green. The ratchet rebind (+2,307 B) is owed at landing |
| **G6** | green per R-9 (0.0000). Raw 0.0038 on W-0.11's dark dock row, printed beside it as R-9 orders |
| **G7** | **green as written**: 0 regressions in M-2 (1,122 rows) and M-3 (72). R-8 cured v2's one row |
| M-3 light (R-7) | every resting row ≥ 3.0 (wash well over black 3.13). The two held-well reds are FL-14's, and the injected variant greens them (§4) |
| M-2 light, M-2h | green on every read row; the held dock ≥ 7.58 (FL-7) |
| **W-0.11 G1-G6** | **green** on the same tree, R-8's ladder included |
| island | ΔE 0 against the dark page |
| tests | 2320 passed, 0 failed with the arms rewritten |

**Reading.** On the light arm and on W-0.11's tokens, **minor v3 is the shippable shape of 10.2.0's veil recut and lighting tokens.** Every value and reading P4-3.1 ruled for it now reads green: R-6, R-7, R-8 (18 px, no Q-9 escalation) and R-9. That leaves three things, and no seat may supply any of them:
1. **R-9's reading of W-0.1 G6 must be taken into W-0.1's text** when W-0.1 and W-0.11 land together. The owner may override it, and then G6 is red on the dark dock's cast alone (0.0038).
2. **FL-14's assignment:** the agglomerate either assigns the one declaration to 10.2.0 (the variant meets the condition), or leaves it W-H's. In that case the held floating well stays a known red that HEAD also fails (2.79 over black).
3. **The entry gate:** two consecutive clean D3 passes. Pass 5 can be clean only if the owner rules Q-1 and Q-11 before pass 5's critic. Every pass that closes unruled moves the earliest landing out by one pass. 10.2.0 is also gated on D2 converging (O-88).

**Q-11, off paper, stated separately.** 48 of 66 off-paper light composites read grey. Content rungs wash, quiet, resting and card are grey off paper: the wash over black is `#e2dcd7` (L 0.898, C 0.0095), and over the story's deep canvas it is `#e3e3e3` (C 0.0000). R-7 and R-8 leave these to the hex. G1 is green over paper and says nothing about what the owner sees over dark grounds. Under Q-11 (a) the chrome rows are accepted and the content rows are reported. Under (b) the chrome goes opaque and the content stays grey (floor v3 §4.2). Whether 10.2.0 may ship grey content off paper is the content clause of Q-11, unruled, and it is the one owner ruling between this build and W-0.1's G1 read off paper.

---

## 9 · Known limits

- The R-8 search, the R-9 reading and FL-14 are CSS injections over the specimen build, not separate source builds. The chosen radius (18 px) is built, and the full battery measures the built value.
- The W-0.1-tree reference for W-0.11 G6 is the minor v3 build with W-0.11's values injected back (`w01ref.css`). It is the minor's own W-0.1 tree, not a separate W-0.1 build. Its scenes are `ladder, dialog, held, hostile`, so W-0.11 G6 compares the rows those scenes carry: 1,438 M-2 and 426 M-3 HEAD-PASS rows across both engines.
- R-9's injected G6 was read in Chromium only. Playwright WebKit's raw G6 is already 0 over.
- The material harness launches Chromium with its GPU args (`CHROMIUM_ARGS`). The driver deferred that change to the pass-5/6 boundary (FORMATION-PROGRESS 2026-10-16), because a mid-pass change would break paint baselines. This seat ran it unchanged.
- The demo dock-search's hover leg (R-6's uncovered composer) is static only, as in floor v4. Its paint is owed to the critic.

## 10 · Reproduce

```sh
P5=docs/tranches/BL/design/material/pass-5
bash $P5/MS3-run.sh setup
~/.claude/guard/guarded --light -- bash $P5/MS3-run.sh static
bash $P5/MS3-run.sh inner-c builds search search-read          # R-8 (MS3_SEARCH="w01ref r16 r17 r18 r19")
bash $P5/MS3-run.sh inner-c builds battery-cr
ENG=chromium bash $P5/MS3-run.sh inner-c head-cells r9 fl14 island glance
~/.claude/guard/guarded --timeout 90 --exclusive webkit -- bash $P5/MS3-wk-inner.sh
bash $P5/MS3-run.sh inner-c witnesses baseline verbose g67
ENG=chromium bash $P5/MS3-run.sh inner-c rerun toolchain ratchet roster
~/.claude/guard/guarded --timeout 40 --exclusive webkit -- env MS3_INNER=1 ENG=webkit RERUN_SCENES=ladder,dialog \
  RERUN_GROUNDS=checker,white,black RERUN_WITNESSES="m3-non-text m2-text-contrast" bash $P5/MS3-run.sh rerun
bash $P5/MS3-run.sh teardown
```

The R-9 and FL-14 G6/G7 comparisons were re-run against HEAD's verbose files once `verbose` had written them (the commands are in `MS3-run.sh`'s `r9` and `fl14` phases). The halo-per-radius and the WebKit W-0.11 G6 reads were run from `m2-held-window.mjs` on `caps/s-*` and from `MS-g7.mjs` on `verbose/m{2,3}-s-w01ref-webkit.txt` (`w011g6-*-minor3-webkit.txt`).
