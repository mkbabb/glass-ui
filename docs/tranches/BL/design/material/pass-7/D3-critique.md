# D3 · pass 7 · the fresh critic: floor v6 on the fixed 44 rows, the minor split v5 on its gates

| field | value |
|---|---|
| seat | D3 pass 7, the fresh adversarial critic (`REGISTRY.md` P6-6.2 step 4). I authored nothing in D3 |
| model | `claude-opus-5-5`, asserted from own system identity (Opus) |
| HEAD | `1da7eb17b`. `git diff --stat a75b708e9 HEAD -- src demo tests package.json scripts tests-visual vite.targets.ts .bundle-ratchet .published-roster` prints nothing (`phase-setup.log`): the published 10.1.0 source every pass-6 and pass-7 seat measured |
| patches | `floor-v6.patch` sha1 `235a5117` (87 files), `minor-split-v5.patch` `a790fd05` (57 files): both `git apply --check` clean at HEAD. Composition re-proved byte for byte (`cmp`): floor-v5 (`dc295dbc`) + `floor-v6-R15.diff` (`6e06cbcf`) = floor v6; minor-v4 (`ec14741a`) + `minor-split-v5-R16.diff` (`19461f88`) = minor v5; `MS5-r16-edits.py` over the minor v4 = minor v5 |
| owner rulings | **None arrived.** `audit/INBOUND.md` still ends at O-98; `FORMATION-PROGRESS.md`'s last D3 lines are the floor v6 and minor v5 banks. No ruling on Q-1, Q-3, Q-11 (either clause) or Q-14. The P6-4 defaults apply. **This critic runs unruled by the driver's record** (R-14, R-15, R-16 are machine-checkable and were checked now), **so pass 7 cannot be clean: the owner's rows stay open** |
| engines | Chromium 149, Playwright's headless shell, no launch arguments (the moving-field windows take `CHROMIUM_FIELD_ARGS` under `lib.mjs`'s cited GPU-WITNESS, LAW PASS 55). **Playwright WebKit 26.5** under `guarded --exclusive webkit`, browser relaunched every 60 page loads (H3-1). **Every real-Safari cell: UNMEASURED (owner's safaridriver checkbox)** |
| records | `crit-records/` (`phases.log` and `admissions.log` carry every phase's time and load); `D3-crit-run.sh`, `D3-crit-run2.sh`, `D3-crit-run3.sh` (every command, by phase); my own tools `crit-ringpx.mjs` (ring reader, no harness code), `crit-declcheck.py`, `crit-undeclared.py`, `crit-outscope.py`, `crit-demo-norm.py`, `crit-pxdiff.mjs`; real-paint ring plants `crit-variants/ring040.css`, `ring1px.css` |
| fences | No tracked source edited; no git write in the checkout beyond `git worktree add/remove` of `.claude/worktrees/bl/D3/p7/crit/wt`. Every build, swap and capture in that worktree (`$W/.d3out`). Writes in the checkout only under `docs/tranches/BL/design/material/pass-7/`. Nothing ran in a sibling repo. Worktree and `.claude/worktrees/bl/D3/p7/` removed at the end (§9) |
| machine law | Every build, capture and probe through `~/.claude/guard/guarded` (static and PNG reads `--light`); every WebKit run under `--exclusive webkit`, queued only after the Chromium phases. One heavy run at a time. Loads 7.3 to 59.0 (`phases.log`). Kernel-zone refusal never fired. **Two guard kills, both recorded (§8):** WebKit admission wk-A hit its 90-min timeout in the witness step after the capture completed; a `--light` witness run hit its 30-min limit in the verbose loop. **WebKit lock wait:** wk-B (the plants) queued 04:17 and was still waiting at 05:53, over 90 min behind other repos' WebKit runs; it was not cancelled (§8) |

Short citations: `Reg` (REGISTRY Pass 6), `H7`, `FV6` (`FLOOR-V6.md`), `MS5` (`MINOR-SPLIT-v5.md`), `Crit6` (`pass-6/D3-critique.md`).

---

## 0 · Verdict

**Floor v6: ADVANCE, 37/44 = 0.841. Not clean (7 open). Two-clean count stays 0 of 2.**

- **Row 6 closes** on R-14: I checked H7-1 against the raw PNGs with my own reader, and against real-paint plants (§2).
- **Rows 20 and FL-12 do not close (A-1).** DEL reads 0 under the patch-built declaration, and I reproduced it. But FV6 §7's evidence for FL-12, "All 87 touched files are inside DEL's scope", is false: **17 touched files are outside `src/` and `demo/`** (16 under `tests/`, one deleted doc). One of them, `tests/components/field/forms-seam.test.ts`, was edited by floor v6, and its header and G-F2 title still describe `--input-on-glass`, a token floor v6 deletes, as live ("#22 W-FROST's token … fill α fenced on W-FROST"), and say "the perimeter rides the 0.48 ink rung" where floor v6's rung is 0.52.
- **Five rows wait only on the owner:** 3, 9, 23, N-1, N-2 (Q-1, Q-3, Q-11 both clauses, Q-14). No ruling has arrived.

**The minor split v5:** W-0.1 G1-G7 **PASS** (G6 per R-9 at 0.0000; the raw value, 1 of 13 at ΔE 0.0022 on the dark paper dock, printed beside it), W-0.11 G1-G6 **PASS**, M-3 light **green on every row in Chromium under H7-1**, STACK 24/24, M-2h green (N-3 attributed). The specimen dist and dist-demo are byte-identical to the minor v4's, which I reproduced. **R-16 is incomplete as prose (A-3):** of MS5 §2.4's outside-list sentences, which the seat handed to the critic, I rule 13 false in light, and four of those false in both modes.

---

## 1 · Byte identity, re-proved (P6-2.2, thin builds)

Each tree built by `harness/build.mjs --demo` under one label in one worktree, each output moved aside (`phase-same.log`; each `build.json` carries its own tree's `srcDirtyFiles`: fv5 57, fv6 57, minor4 41, minor5 46, so the swaps were real):

| pair | specimen dist | dist-demo |
|---|---|---|
| floor v5 / floor v6 | `diff -rq` exit 0; CSS 391,121 B, sha256 `347288745da7cf97` both | **exit 1, 223 lines.** Chunk hashes normalised: 4 files differ (`auth-shell` JS+CSS, `dock-search` JS+CSS); scoped ids also normalised: **0 differ** (`demo-norm.log`: `data-v-3882c389 → ac2ef11c`, `data-v-9e84ffec → 950040ff`) |
| floor v6 / floor v6 rebuilt | exit 0 | exit 0 |
| minor v4 / minor v5 | exit 0; CSS 398,432 B, sha256 `e11613c3eeb45cab` both | **exit 0, 0 lines** |

So FV6 §4 and MS5 §3 hold exactly. Floor v6's dist-demo is not byte-identical, so by P6-6.2 step 2 **I re-ran the full battery in both engines on floor v6** (§3). The minor v5 is byte-identical, so its paint verdicts carry from MS4 and Crit6 §3. I re-ran the static checks and the M-3 re-read, plus G7's and W-0.11 G6's M-3 halves on fresh full-scene pixels (§5).

---

## 2 · R-14 (H7-1) checked against the raw PNGs and real plants

**My reader** (`crit-ringpx.mjs`) shares no code with the harness. It uses pngjs, its own WCAG luminance and its own full-coverage test. For every three-column ring it prints three things: R-14's reading recomputed; the ring's **solid composite predicted from paint** (ink `--foreground` at the tree's `--ink-perimeter`, composited in sRGB over the out pixel); and the darkest ring pixel in a 9-column window. All values are Chromium, dialog scene, every ground (`ringpx-*-chromium.log`, `verbose/m3-*-chromium.txt`).

| capture (real paint) | live M-3 under H7-1 | my R-14 reading | predicted solid composite | darkest ring pixel | verdict |
|---|---|---|---|---|---|
| **floor v6**, light Close ring, 8 grounds (battery capture) | 3.52 (full-coverage column 852) | **3.52** | 3.51 (`#888480` over `#fef7f1`) | `#89837f`, 3.52 | PASS, matches paint |
| floor v6, dark, 8 grounds | 5.03 | 5.03 | 5.06 | 5.03 | PASS |
| **minor v5**, light, 7 grounds | 3.73 | 3.73 | 3.73 (α 0.54) | 3.73 | PASS |
| minor v5, dark | 5.05 · **2.96** aurora · 4.17 · 5.04 · **2.49** white · 3.89 · 3.64 | the same | 5.06 · 2.99 · 4.18 · 5.08 · 2.49 · 3.91 · 3.64 | the same within 0.02 | dark arm unchanged from 10.1.0 (W-H.2's) |
| **plant: HEAD's ring** (HEAD build, α 0.48 over HEAD's plate `#746f67`) | **1.91** paper, 1.67-1.93 light | 1.91 | 1.89 | 1.91 | **FAIL**, as R-14 requires |
| **plant: α 0.40 ring** in paint over floor v6 (`ring040.css`) | **2.50** at column 852, 7/7 grounds | 2.50 | 2.49 | 2.50 | **FAIL** at full coverage |
| **plant: 1 px outline** in paint over floor v6 (`ring1px.css`) | **2.43**, "worst of three: no full-coverage column" | 2.43 | 3.51 | 3.30 | **FAIL**: a 1-row band never passes the full-coverage test, so the reading is not loosened |

My reader matches M-3 to the digit on every Close-ring row in every capture. The full-coverage band matches the predicted solid composite within 1-4 8-bit steps everywhere the predicted ink is the painted ink. The only far-from-prediction rows are the `retune-fg` consumer variant (2.50 light, 4.27 dark), where the consumer retunes `--foreground` itself, so the prediction's ink is wrong by construction. M-3 does not gate retune cells (W-C's family). **R-14 holds: the reader reads the ring's solid composite, never above it, and the three plants red in real paint.** H7's self-test re-run reads `SELFTEST PASS: 18 expectations met` (`selftest-h7.log`; H7-1 fixture, three plants, two bites; H7-3 rows on my own minor4/minor5 trees).

Two notes for the record, neither a row. (i) The darkest ring pixel sits at column 849, outside the probe's 852-854, so the ring is at full coverage over several columns either side of the apex, and the fallback reads near-apex columns. (ii) HEAD's Playwright WebKit rings: see §3.3.

---

## 3 · Floor v6: the full battery, both engines

### 3.1 · Runs

| run | when | load |
|---|---|---|
| Chromium battery (`battery-c`) | 01:29:01 → 01:47:58 | 25.3 → 49.7 |
| ring and plant captures (`ring-c`) | 01:47:58 → 01:53:14 | 49.7 → 33.1 |
| Chromium red re-runs ×2 (`rerun`) | 02:24:26 → 02:30:35 | 22.0 → 59.0 |
| WebKit battery (wk-A) | admitted 02:45:24 (load 7.3), capture complete (88 WebKit cells, live 4, motion 4, drift 2), **killed at 90 min in the witness step** (04:15) | — |
| witnesses over both engines (`--light`) | 04:33:31 → whole-run summary complete; the verbose loop cut at 30 min | 26.5 |
| baseline and diffs | → 05:51 | — |

### 3.2 · Verdicts

Whole run (`fv6-witnesses.log`, both engines, gate Chromium): RAW 48 · M-1 11 · M-1x PASS 1 (REPORTED) · M-2 938 · M-2m 430 · **M-2h FAIL 2/68** (N-3's halo legs) · **M-3 PASS 354** · M-4 168 · M-5 20 · **M-6 FAIL 29/120** (Q-1's stepped text) · M-7 8 · M-8 8 · M-9 20 · O-66 5 · STACK 24 · W-A 216 · W-S 24 · T PASS · LIT REPORTED (19 inherited) · HOV 58. **Each equals FV6 §5.2.**

`diff FV6-records/baseline-fv6.md crit-records/baseline-fv6.md` prints **one row**:

```
< | M-2m | PASS 215 | PASS 215 | PASS 215 | PASS 215 |
> | M-2m | PASS 215 | PASS 215 | PASS 215 | FAIL 1/173 |
```

That one cell is **Playwright WebKit dark**, and it is the guard kill, not paint. `verbose/m2m-webkit.txt` reads "drift webkit+shim dark aurora: 17 frames over 32.0 s (need ≥ 45 over ≥ 95 s) ✗". The drift window was cut short, and every frame it holds passes (43/43 inks ≥ 4.5 in every motion, step and drift frame that was read). M-2m gates on Chromium (PASS 215 dark). The WebKit dark drift window is re-queued twice under its own admission (wk-D, §8). Against floor v5 (`baseline-diff-fv5-crit.txt`) my run differs in exactly FV6's two rows (M-3 Chromium light 7/177 → PASS, the reader; W-E 25 → 20, a banked family) plus that killed WebKit cell.

**Chromium red re-runs, twice** (`phase-rerun.log`, held/ladder/dialog over black, white, aurora, paper): M-2h FAIL 2/68 both runs (N-3); M-6 FAIL 7/30 both (Q-1); M-3 FAIL 16/192 both, **all 16 `MISSING … not captured`** rows for cells the re-run leaves out, and the Close ring reads 3.52 at column 852 in both. The verbose M-3 outputs of the two runs are identical. **No red is load-borne.** WebKit's light checker red (two straight-run well rings, as H6/FV5/FV6) is re-queued twice in wk-C.

### 3.3 · Owner options on my capture (`phase-readings.log`), identical to FV6 §5.3

M-6 `--q1 a` **PASS 88 · 88**; `--q1 c` FAIL 2/96 · 2/96; M-1x `--q11 b` FAIL 12/21 · 12/21 (floor v6 builds (a)); M-9 20 · 20 (Chromium · Playwright WebKit).

### 3.4 · Plants (row 19)

The plants' builds inject CSS over floor v6's specimen dist, which is byte-identical to floor v5's (§1). R-14's own plants red in real paint (§2), and DEL's plant reds (§4). The full plant set (`plants-w`) is queued in wk-B behind the WebKit lock (§8). **Row 19 is scored PASS on the byte-identical dist:** every plant capture reads the same pixels as FV5's and FV6's (`plants-diff-fv5-fv6.txt` empty in FV6), and every plant the pass-7 rulings add reds in my own paint. If wk-B lands before the agglomerate, its readings go to `crit-records/plants/`.

---

## 4 · R-15 (rows 20, FL-12) checked against the patch's removed lines

**The seat's declaration reproduces.** `declare-removed.mjs` over floor-v6.patch with the seat's exact rulings gives JSON identical to `FV6-records/declare-floor-v6.json` (61 names). DEL with it: floor v6 **PASS 61**, floor v5 **FAIL 6/61, 8 hits in 5 files** (`del-*-seatdecl.log`, `del-*-critdecl.log`). Without the exact rulings, floor v6 FAIL 3/61 at exactly the three sites the seat ruled (`del-fv6-noexact.log`). I read each exact entry in context and agree with all three: `animations.css:267` is the live `::backdrop`, `constellation.vue:365` the live canvas, and the nine "composited over" sites are ordinary prose.

**My own extractor** (`crit-declcheck.py`) found 298 identifier tokens on the 1,882 removed `src/`/`demo/` lines; 83 are absent from floor v6. **28 absent tokens are not in the declaration** (`declcheck.log`). By kind: deleted module stems (`backdropLuminanceSample`, `backdropSampleMath`), module-private consts and locals (`CSS_INITIAL_UNDERLAY`, `sampleIntervalMs`, `lastSampleAt`, `sampledAt`, `isShared`, `downCtx`, `stageEl`, `liveCardEl` …), browser APIs (`drawImage`, `getImageData`, `elementsFromPoint`, `willReadFrequently`), and two template-string prefixes (`--glass`, `--glass-plate`). R-15 (iii) names "identifier, token, prop, export and data- attribute", and `declare-removed.mjs` takes exported or declared functions, types and classes, not `const` locals or file stems. **None of the 28 has a stale word-form hit in floor v6** (`undeclared.log`). The hits that do exist ("backdrop sample" at `glass.css:20` and `sheet/styles.css`, "is shared", "prefers reduced", "aurora canvas") are all live prose about `backdrop-filter`, reduced motion and the Aurora canvas. **The declaration gap bites nothing on floor v6;** it goes to the pass-8 instrument list as a coverage note (H8-2). My word-form matcher also joins words across `/` and `.`, which DEL's does not; over floor v6 it reads 0 hits for every declared name (`DECLCHECK names=61 hits=0`) and 10 on floor v5.

A wider sweep of floor v6 (`sweep-fv6-wide.txt`, 154 lines over luma, bucket, knee, sampler, "darken", "measured backdrop") finds no sentence describing the clamp, observer, bucket or tint seam as live in `src/` or `demo/`. Floor v6's `adaptive-legibility.css` describes only the static registers. `dark-arm.css:304` "the light arm's darkening" is true of the ink: the light on-glass muted ink is L 0.48, darker than the page's muted ink.

### A-1 · Rows 20 and FL-12 stay open: a touched file outside DEL's scope

Row 20 and FL-12 read "the prose sweep of **every touched file**". FV6 §7 scored FL-12 PASS with "All 87 touched files are inside DEL's scope". **That is false.** `git apply --numstat floor-v6.patch` lists 17 files outside `src/` and `demo/`: `docs/consumer-evidence/use-glass-backdrop-luminance.md` (deleted) and 16 under `tests/` (one deleted). DEL never reads them. I searched them with the declared names' word forms (`crit-outscope.py`, `outscope-fv6.log`). The `GlassDock.posture.test.ts:153-155` and `glass-subtlety.test.ts:186-192` hits assert the deletion and are true. One file is not:

`tests/components/field/forms-seam.test.ts`. **Floor v6 edits this file**, rewriting its G-F2 body at 106-115 to "The fill is the ONE field surface … `--control-surface-bg: var(--glass-well)`". It leaves:
- **:23-26** (header): "both resolve `--input-on-glass`, which is #22 W-FROST's token (§9 row 2, "both or nothing paints")". `--input-on-glass` is a declared floor v6 deletion, absent from `src/` and `demo/`, and the sentence describes it as a live token another row owns;
- **:91** (the G-F2 title): "the perimeter rides the 0.48 ink rung and the well is a real inset (fill α fenced on W-FROST)". Floor v6's `--ink-perimeter` is **0.52** (`color-radius.css:151`), and the "fill α fenced on W-FROST" clause contradicts the body the patch wrote two lines below.

Counterexample in the tree: rows 20 and FL-12 **OPEN**. This is the fourth pass running in which the prose rows reopen on a sentence outside the instrument's reach. The cure is again structural: DEL reads every file the patch touches, `tests/` and docs included (H8-1). The rewrite is two comment lines and one test title; it changes no specimen byte.

Beside it, recorded and not a row (the files are untouched by floor v6): `DESIGN.md:521` ("clamps it upward by the measured backdrop luminance") and `docs/canon/glass-system.md:44-53, 60` (the tint seam, the `--glass-backdrop: light` bucket and `useGlassBackdropLuminance` as live; `--input-on-glass` as a minted rung) are false under floor v6. They belong to the landing's docs pass (H8-1's scope note).

---

## 5 · The minor split v5 (minor_gates)

**Static, on my own trees** (`phase-static.log`): **H7-3 DEL** with `harness/deletes-minor.json` (24 names): minor v5 **PASS 24**, minor v4 **FAIL 21/24**. LAW PASS 55. Census minor v5 `stacked=0 halo=0 blur=0 open=0`, exit 0; `v10.1.0 src/styles` exactly `stacked=2 halo=2 blur=5 open=9`, exit 1. HOV 58. LIT 19 inherited, none added. Ladder `diff radii-fv6 radii-minor5` empty, HEAD's exit 1. FL-14 static: `isolation: isolate` in `@utility glass-plate` (1).

| gate | Chromium (gate) | Playwright WebKit | source | verdict |
|---|---|---|---|---|
| W-0.1 **G1** M-1 | **11/11** on my fresh minor v5 capture (`minor5-fl m1 PASS 11`) | carried (11/11, MS4) | read here | **PASS** over paper; off paper REPORTED (Q-11 content unruled) |
| **G2** O-66 field | carried, byte-identical | carried | MS4 §3 | **PASS** |
| **G3** O-66 row | HOV 58 read here; row paint carried | carried | — | **PASS** |
| **G4** W-A light | carried 108/108 | carried | MS4 | **PASS** |
| **G5** scope | specimen and dist-demo byte-identical to the minor v4; no name removed (DEL v5 PASS; roster carried from MS5 `verifier-rebound.log`, ratchet +2,333 B owed at landing) | — | carried | **PASS** (rebind owed) |
| **G6** per R-9 | 0.0000 (carried) | — | MS4 | **PASS** |
| G6 raw, beside it | **1 of 13 over: `chromium dark paper · dock #0f0c09 → #0e0c09`, ΔE 0.0022**, read fresh (`g6-dark-raw.txt`), equal to MS4's | — | read here | printed, as R-9 orders |
| **G7** M-2 half | **542 HEAD-PASS, 0 regress**, 178 FAIL→PASS (`g7-m2.txt`, fresh HEAD vs minor v5, ladder/dialog/held/hostile, both themes) | carried | read here | **PASS** |
| **G7** M-3 half, **under H7-1** | **33 HEAD-PASS, 0 regress**, 181 FAIL→PASS (`g7-m3-H7.txt`) | MS5 §4.1 (6 HEAD-PASS, 0 regress); my WebKit ring capture is queued (wk-C) | read here | **PASS** |
| W-0.11 **G1-G4** | census as above | static | read here | **PASS** |
| W-0.11 **G5** | as W-0.1 G5 | — | — | **PASS** |
| W-0.11 **G6** | M-1 11/11; against the W-0.1 tree (`w01ref.css` over the minor v5, fresh): **M-2 720 HEAD-PASS, 0 regress; M-3 under H7-1 214, 0 regress** (`w011g6-m*.txt`). **This closes MS5 §7's handed-on item** | carried | read here | **PASS** |
| **M-2** light | green on every read row | carried | — | green |
| **M-3** light, H7-1 | **Close ring 3.73 on every light ground** (my reader agrees, §2); every light row ≥ 3.0 (`minor5-fl` M-3: its 128 reds are all dark rows) | MS5: Close ring 3.25 worst of three; checker floating well 2.99 (straight-run) | read here | **green on every row in the gate engine** |
| **M-2h** | the held dock ≥ 4.5 in every frame; the halo legs are N-3's attributed frost | carried | MS4 | green (N-3) |
| **H3-1** off paper | REPORTED 48/66 grey, content included (Q-11 content unruled) | — | carried | REPORTED |
| **STACK** | **24/24** fresh (`minor5-fl stack`); FL-14 off 6/24 FAIL | carried 24/24 | read here | **PASS** |

### 5.1 · FL-14's dark-composite movement (owed since P6-5; read here)

FL-14 off (`MS4-variants/nofl14.css` over the minor v5) against FL-14 on, same scenes, Chromium, light and dark:

- **G6's composites:** M-6's dark composites, **13 compared, worst ΔE 0.0000** (`fl14-dark-move.txt`). MS4's "26" counted both engines; this Chromium reading reproduces its value.
- **But FL-14 does move dark paint.** A whole-PNG diff (`fl14-pxdiff.log`) shows the dark held cells over aurora, black and white differ: about 44-52k px, max channel Δ 181-193. I re-captured the held scene twice with FL-14 on and twice off (`D3-crit-run3.sh`). The M-3 readings are identical within each variant and differ between them, so the move is FL-14's, not press timing. The dark held floating-well perimeter reads **white 2.01 → 1.67 (−0.34)**, **aurora 1.28 → 1.88 (+0.60)**, black 2.72 → 2.72. Dark paper held: unchanged. The dialog differs by 1 px at Δ 2.
- **What it touches:** rows that are under 3.0 with FL-14 on and off alike (10.1.0's dark held well, W-H.2's). G7 against FL-14 off reads 0 regressions (M-2 718 HEAD-PASS, M-3 212; `fl14-m*-regress.txt`). G6's text (composites over paper and the dark page) is untouched.

**Ruling:** P5-6.2's condition "re-read the `.dark` island only if FL-14 moves a dark composite" is met for **G6's set: no**. The registry's sentence "FL-14 moves no dark composite" is true only of that set; FL-14 does move the dark held well over bright grounds. No gate moves and no row is added. The class goes to pass 8 (H8-3).

### A-3 · R-16 (iii): MS5 §2.4's outside-list sentences, ruled one at a time

R-16 hands sentences outside the fixed list to the critic. I read each against the minor's light arm (`sweep-minor5-darken.txt`, `sweep-minor5-tint.txt`):

| site (minor v5) | sentence (deciding clause) | ruling |
|---|---|---|
| `dock/styles/adaptive-legibility.css:24` | "a self-declaration cannot self-darken" | false in light |
| `:28-30` | "the plate's own darken is composed AT THE ELEMENT through the veil clamp … the whole dynamic half" | false in light; contradicts the same file's :40-45 ("darker in dark, a thicker cream pole in light") |
| `:32-34` | "a translucent darkened plate — darkening moves the plate TOWARD muted's own luminance" | false in light (#3's twin, which R-16 rewrote in `ladder.css`) |
| `:59-60` | "(it darkens the dock plate so the warm-dark ink clears ~17:1 over white at the 18% floor)" | **false in both modes**: the same file's :28 says the self-engage "re-points no plate colour and could not", and :49-54 say there is no dock bucket; 18 % is HEAD's ladder |
| `:70` | "the declarative darken is the AA floor" | false in light (#5's twin) |
| `dock/styles/search.css:4`, `:10`, `:58` | "the darken seam"; "does NOT darken — the pale-fade"; "a translucent darkened plate" | false in light |
| `dock/styles/shell.css:130`, `:135` | "The dock self-darkens over light backdrops"; "No token re-pointed here darkens the plate" | false in light |
| `dock/styles/index.css:21-23` | "the darken-over-light self-engage (the continuous backdrop-luma tint clamp … the @container light bucket …)" | **false in both modes**: `adaptive-legibility.css` holds neither the clamp (veil.css) nor a bucket |
| `tokens/property-regs.css:152`, `:164` | "tint = darken-over-light"; "earns the same continuous darken" | false in light (R-16 #14 rewrote :121 in this file) |
| `glass/surface-axis.css:79` | "The adaptive TINT axis is zeroed" | **false in both modes**: the tint axis is gone (`ladder.css:165`) |
| `glass/surfaces-pager.css:29-32` | "The element-level oklab TINT seam … the no-op floor (`X, src 0%) ≡ X`" | **false in both modes**: the seam is gone; R-16 #15 rewrote the next clause of this same comment |
| `tokens/dark-arm.css:310` | "the light arm's darkening" | **true** (the light on-glass muted ink is the darker one); kept |
| `dock.css:107`, `adaptive-legibility.css:18` | the owner's quoted words | citation; kept |

**13 sentences false in light** (4 of them false in both modes), in 7 files, 6 of which the minor already touches. With these ruled, MS5 §2.3's two unguarded phrases can be declared: `declarative darken` (only `:70` and the rewritten #5) and `darkened plate` (only `:33`, `search.css:58` and #13). That is a minor v6, comments only; under §1's thin-build rule it is byte-identical unless a `.vue` file moves. It is a W-0.1 landing item (the tree that lands is the tree measured), not a gate (H8-4). Beside it, the minor's `tests/components/field/forms-seam.test.ts:91` title says "0.48" while the minor's `--ink-perimeter` is 0.54 (the minor does not touch the file; it lands with A-1's rewrite).

---

## 6 · The 44 rows (floor v6; my measurement; defaults built, unruled rows open)

| # | row | status | evidence or counterexample | closes on |
|---|---|---|---|---|
| 1, 2, 4, 5, 7, 8, 10-19, 21, 22, 24 | RAW, M-1, M-2, M-2m, M-4, M-5, M-7, M-8, M-9, T, release, O-66 G2, O-66 G3, W-A, engines, plants, FL-13, O-87, STACK | **PASS (19)** | §3.2 both engines, each equal to FV6 (M-2m's one WebKit cell is the killed drift window: informational engine, every read frame passes, re-queued). Row 19: §3.4. Row 22: census 0, its 10.1.0 bite exact, LIT 19 inherited. Release: the seat's toolchain (vitest 2318/0, typechecks and builds exit 0) carries, because R-15 touches only comments and the specimen dist is byte-identical; not re-run here | — |
| 3 | M-1x | OPEN | REPORTED under (a): content grey off paper. `--q11 b` reads 12/21 on floor v6 as built; `var-q11b` 21/21 on record | **owner, Q-11 chrome clause**: (a) by its text, or (b) by selecting `pass-4/fv3/q11b.*` |
| **6** | M-3 | **PASS** (closed) | H7-1 matches paint (§2): 3.52 at full coverage on every light ground in four captures (battery, two re-runs, ring read); HEAD's ring 1.91, α 0.40 2.50 and 1 px 2.43 red in real paint; M-3 Chromium PASS 354 | — |
| 9 | M-6 | OPEN | stepped 29/120; re-run 7/30 twice; `--q1 a` PASS 88/88 both engines | **owner, Q-1** (a) by selection |
| **20** | prose sweep | **OPEN** | A-1: `tests/components/field/forms-seam.test.ts:23-26, :91`, a file floor v6 edits, outside DEL's scope | route: rewrite those lines; DEL's scope to every touched file (H8-1) |
| 23 | gestalt, O-62 frame | OPEN | unchanged from Reg P6-1.1 (R-15 changes no specimen pixel) | **owner: Q-11 content, Q-3, Q-14**, with the frames |
| FL-1..FL-11, FL-13..FL-16 | the floor | **PASS 15** | §3, §2 (FL-15's `plant-darkperim` is not lowered by H7-1: the reader never reads below the worst of three except at full coverage, and the plant's reds are perimeters) | — |
| **FL-12** | prose sweep of every touched file | **OPEN** | as row 20 | as row 20 |
| N-1 | Q-1's ruling built | OPEN | (a) built; (c) a variant | **owner, Q-1** |
| N-2 | Q-11's ruling built | OPEN | (a) built; (b) the variant | **owner, Q-11 chrome clause** |
| N-3 | the dock's held halo | PASS (attributed) | M-2h 2/68, re-run twice | — |
| N-4 | the minor's W-0.1 reading | PASS | §5 | — |

**Count: 37 PASS, 7 OPEN = 0.841.** The seat scored 39; the critic's 37 stands, because A-1's counterexample is in the tree. **Closed this pass: row 6.** **Still open on the route: 20, FL-12** (two comment lines and a test title, plus DEL's scope). **Waiting only on the owner: 3, 9, 23, N-1, N-2.**

---

## 7 · Next-pass classes (no row added)

| id | class | placed |
|---|---|---|
| **H8-1** | DEL reads only `src/` and `demo/`, so a touched file under `tests/` or `docs/` escapes the "every touched file" sweep (A-1). Fourth consecutive pass of this family | instrument: DEL's roots are every file `git apply --numstat` lists for the patch (plus `src/`, `demo/`), and the repo-root and `docs/canon` markdown as a REPORTED arm. Fixture: floor v6 with `forms-seam.test.ts:23-26, :91` rewritten. Plant: floor v6 as banked |
| **H8-2** | `declare-removed.mjs` declares no deleted module stems and no `const`/`let` names (28 absent tokens undeclared; none bites on floor v6) | instrument note: add file stems of deleted modules (`backdropLuminanceSample`, `backdropSampleMath`) and module-level consts; locals and browser APIs stay out |
| **H8-3** | FL-14 moves the dark held well's paint over bright grounds (white −0.34, aurora +0.60), though no G6 composite | record; W-H.2's dark arm. The registry sentence narrows to "no G6 composite" |
| **H8-4** | the minor's light-law prose: 13 outside-list sentences ruled false in light (A-3) | build: minor v6, comments only; declare `declarative darken` and `darkened plate` |
| — | WebKit admissions: a full both-engine battery plus plants does not fit one 90-min `--exclusive webkit` admission at this machine's load (wk-A killed at 90 min in its witness step) | driver: split the WebKit capture from the witnesses; witnesses run `--light` outside the lock with a 60-min bound |
| — | the critic's own process: editing a bash script while a phase of it runs (reverted at once; bytes restored before the phase returned) | recorded; new phases went to `D3-crit-run2.sh` and `-run3.sh` |

---

## 8 · Known limits, and what is still queued

- **The WebKit queue: three cells stay open.** **WebKit plants (wk-B)** queued 04:17:29 behind other repos' WebKit runs, and **was never admitted: 2 h 19 min in the queue** (`admissions.log`, 06:36:30). **WebKit ring captures plus the light checker red's two re-runs (wk-C)** and **the WebKit dark drift window ×2 (wk-D)** were queued behind it and never started. No browser of mine launched after wk-A. The waiters were stopped at 06:36:30 only so the worktree could be removed and nothing left running before return. These cells are **OPEN in Playwright WebKit**, not read: the plants in WebKit, the WebKit Close ring under H7-1 on fresh pixels, the WebKit checker red's re-runs, and the WebKit dark drift window. None changes a row's verdict: the plants are row 19 on a byte-identical dist with FV6's both-engine plant readings, WebKit is informational for M-3 and M-2m, H7-1 moves no banked WebKit ring (H7 §3), and MS5 §4.1 read the WebKit dialog rings fresh. The next WebKit seat owes them.
- **The toolchain was not re-run.** R-15 is five comments, the specimen dist is byte-identical, and the only test-file edits are floor v5's; FV6 §6's run carries.
- **Real Safari: UNMEASURED (owner's safaridriver checkbox)**, every cell.
- **The O-87 gestalt (row 23)** is the owner's; the frames are pass 5's and pass 6's (Reg P6-4), unchanged by R-15.

## 9 · What would make pass 8 clean

Floor v7 = floor v6 + A-1's rewrite (`forms-seam.test.ts` :23-26 and :91), with DEL reading every touched file (H8-1) and floor v6 red under it; plus the owner's answers to Q-1, Q-3, Q-11 (both clauses) and Q-14 before the critic. With those, 44/44 is reachable in one pass. Under the two-clean rule, W-0.1 and W-0.11 land **no earlier than the close of pass 9**, from a minor v6 that carries A-3's rewrites.
