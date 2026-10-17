# D3 · pass 5 · the fresh critic: floor v4 on the fixed 44 rows, the minor split v3 on its gates

| field | value |
|---|---|
| seat | D3 pass 5, the critic (REGISTRY P4-6.2 step 4). One seat, adversarial. It authored nothing in D3 |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `ec90b3103`. `git diff --stat d8e32cab HEAD -- src demo tests package.json scripts tests-visual vite.targets.ts` prints nothing, so both patches measure the published 10.1.0 source, as every pass-4 and pass-5 seat did. `floor-v4.patch` applies byte-identical (`git diff HEAD --binary \| cmp`) and equals `floor-v3.patch` + `floor-v4-R6.diff` by composition. `minor-split-v3.patch` applies byte-identical. Both `git apply --check` clean at `ec90b3103`. My builds reproduce the seats' specimen CSS bytes: floor v4 391,121, minor v3 398,144, HEAD 394,891 |
| owner rulings | **None on Q-1, Q-3, Q-9, Q-11 (chrome or content clause), Q-12 or Q-13.** `audit/INBOUND.md` still ends at O-98 (value.js contrast-floor producer rows; no D3 question). `FORMATION-PROGRESS.md`'s last D3 line is the minor v3 bank. The P4-4.1 defaults apply, and the rows that wait on these questions stay open (P2-6.3) |
| engines | Chromium 149 gated. **Playwright WebKit 26.5** informational: no `backdrop-filter`, dock rows `+shim`; each battery retired it once at 60 page loads, 0 stalls, 0 crash cells; the unshimmed probe crashed on `GlassDock` in both themes (`page.goto: Page crashed`), as H-14 records. **Every real-Safari cell: UNMEASURED (owner's safaridriver checkbox)** |
| worktree | `.claude/worktrees/bl/D3/p5/crit/wt` held floor v4, with the minor v3 and HEAD swapped in and out for their builds and battery runs (each swap checked with `cmp`). Builds, captures and caches stayed inside it (`$W/.d3out`, `$W/.cache-crit`); plant trees under `crit/scratch/`. The worktree was removed with `git worktree remove --force` and pruned. **The permission system refused `rm -rf` of `crit/scratch/`** (the static plant-tree copies, `src`/`demo`/`tests` for fv4, minor3, r4, r6lit, minor2 and v10.1.0's styles; no process, no build), so `crit/scratch/` and its parent `crit/` are left behind for the driver's housekeeping |
| records | `crit-records/`: `admissions.log` (every guarded admission with its load), `phase-*.log`, `chain-*.log`, both baselines, `fv4-results/`, `minor3-results/`, `plants/`, `verbose/`, the probes' JSON and logs, the toolchains, the verifier, `prose-sweep-fv4.txt`. Commands: `D3-crit-run.sh`, by phase. Tools: `crit-demo-probe.mjs`. Injections: `crit-variants/`. Frames: `crit-frames/` |
| machine law | Every build, capture, probe, test and witness pass ran through `~/.claude/guard/guarded`; every run that started Playwright WebKit through `--exclusive webkit`; one heavy run at a time; vitest `--maxWorkers=2`. Every admission but the last came within 2 min. The last, the Playwright WebKit re-runs, waited 46 min for the WebKit lock and was cancelled (§6). The kernel zone refusal never fired. Nothing is left running |

Short citations: `FV4` (`FLOOR-V4.md`), `MS3` (`MINOR-SPLIT-v3.md`), `H5` (`H5.md`), `Reg` (`REGISTRY.md`, the Pass 4 part).

---

## 0 · Verdict

**Floor v4: 37 of 44 rows, ADVANCE, not clean.** The seat scored 39. My battery reproduces the seat's in both engines (`baseline-fv4.md` is `diff`-identical to `FV4-records/baseline-fv4.md`), every R plant and floor plant reds again on my build, and R-6's own reading holds in paint. **Rows 20 and FL-12 do not close.** The floor deletes the earned darken (its own `veil.css:36`: "No luma term and no clamp — nothing samples"), and five files the patch touches still describe that mechanism as live. One of them is `dock/styles/search.css`, a file R-6 itself edited (§2, A-1). The other five open rows wait only on the owner.

**The minor split v3: W-0.1 G1-G7 PASS** (G6 per R-9 at ΔE 0.0000, raw 0.0038 beside it; G7 0 regressions), **W-0.11 G1-G6 PASS**, M-2 light green on every read row, M-2h's held dock ≥ 7.58. **M-3 light: FAIL 2/171**, both the held floating well (2.64 over black, 2.95 over the aurora). The FL-14 variant cures them (3.28 / 3.34 / 3.33). H3-1 off paper is REPORTED: 48 of 66 grey, content included. Every number the seat reported reproduces to the digit, including the R-7 and R-8 values I re-captured myself (§4.2).

**Pass 5 is not clean** (7 open; 0 are required). The two-clean count stays at **0 of 2**.

---

## 1 · Re-run of floor v4 (both engines)

| run | when (load, 1-min) | result |
|---|---|---|
| builds (floor v4, minor v3, HEAD; specimens and demo) | 19:46:38-19:46:49 (25.4-26.9) | specimen CSS 391,121 / 398,144 / 394,891 B, each equal to its seat's |
| Chromium battery | 19:46:49-20:05:30 (26.9 → 27.0) | 70 cells, 4 live, 4 motion, 2 drift windows, 3 retunes, `noclaim` |
| Playwright WebKit battery | 20:07:36-20:26:56 (24.1 → 7.2) | the same cells; retired once at 60 loads; 0 stalls, 0 crash cells |
| witnesses, baseline | 20:45-20:48 (6.4-8.4) | `baseline-fv4.md` **identical** to the seat's (`diff` prints nothing) |

Whole run (`fv4-witnesses.log`, gate Chromium): RAW 48 · M-1 11 · M-1x REPORTED · M-2 938 · M-2m 430 · M-2h FAIL 1/68 (N-3's light halo leg) · M-3 354 · M-4 168 · M-5 20 · M-6 FAIL 27/120 (stepped, Q-1) · M-7 8 · M-8 8 · M-9 20 · O-66 5 · STACK 24 · W-A 216 · W-S 24 · T PASS · LIT REPORTED · HOV PASS 58. Census `stacked=0 halo=0 blur=0 open=0`; on `git archive v10.1.0 src/styles` exactly `stacked=2 halo=2 blur=5 open=9`. LIT `halo=5 near=1 stacked=10 chain=3 open=19 frames-halo=0/20` (inherited, none added).

**Owner options on my capture** (`phase-readings-fv4.log`): M-6 `--q1 a` PASS 88 · 88; `--q1 c` FAIL 2/96 · 2/96; M-1x `--q11 b` FAIL 12/21 · 12/21 (floor v4 builds (a)); W-A `--q11 b` FAIL 1/216 · 1/216; M-9 PASS 20 · 20. Each equals the seat's.

**The plants, injected over my floor v4 build** (`plants/readings.log`, 20:45-21:28, load 4.1-17.0). Chromium · Playwright WebKit:

| plant | row | reading |
|---|---|---|
| R-1 (`hsl(36 13% 81%)`) | 7 · M-4 | FAIL 7/84 · 7/84 |
| R-2 (scrim ink at a tenth) | 12 · M-9 | FAIL 1/10 · 1/10; the 35% probe also reds 1/10, so 40% stays the least 5% step |
| R-3 (trigger back on `--glass-plate-quiet` with its blur) | 15 · O-66 G2 | FAIL 6/6 · 5/6 |
| R-4 (FL-6's ink fill) | 16 · O-66 G3 | FAIL 3/3 · 3/3 |
| R-5 (the 10.1.0 tokens) | 22 · O-87 | census on `v10.1.0 src/styles`: `stacked=2 halo=2 blur=5 open=9`, exit 1 |
| R-6: R-4 as built (`floor-v4-R6.diff` reversed) | 20, FL-12 (register) | HOV FAIL 1/58; the parked probe paints the state rung on the hovered, unhighlighted row in all 6 Chromium cells (`hover-r4-chromium,webkit.log`; its WebKit half lost the page mid-run, `Target page, context or browser has been closed`; Chromium is the gate) |
| R-6 literal (`plant-r6-literal.diff`) | the hold | HOV PASS 58, but **6/6** parked rows paint `.interactive-item:hover`'s beige-grey `color(srgb 0.875 0.824 0.765 / 0.5)` light, `color(srgb 0.259 0.220 0.180 / 0.5)` dark (`hover-r6lit-chromium.log`, 23:23, load 12.9) |
| floor plants (`pass-3/FV2-plants.mjs`) | FL rows | plant-bound M-2 FAIL 108/298 · 110/298; heldfloor 20/72 · 20/72; carrierveil 50/72 · PASS (WebKit paints no `backdrop-filter`); darkperim M-3 47/87 · 47/87; noisolation M-2 14/28, STACK 8/12 in each; opaque-ancestor 4/28 · 4/28 |
| `diag-held-noveil` | N-3 | the held dock reads flat: light 0.894 … 0.894, dark 0.878 … 0.878, pass 4's digits |
| `var-q11b` under H5-4 (H5 §5's owed reading) | 3, N-2, 17 | **the light chrome leg passes under (b)**: "thinnest floating painted α 1.000 · Q-11 (b): light chrome opaque, α = 1 (≥ 0.995)" in both engines; M-1x `--q11 b` PASS 21 · 21; M-1 PASS 11. The verdict line reads FAIL 13/117 because the variant captures light ladder and dialog only, so the dark and live cells print MISSING. Read as (a), the same chrome leg reds by construction (α − bound +0.109) |

**R-6's paint** (`FV4-hover-probe.mjs` on my build, 21:35-21:37, load 6.2-9.6): pointer → `[data-highlighted]` **44/44** across Chromium and Playwright WebKit; **parked** rows painting a fill **0 of 12**; the bare row `rgba(0, 0, 0, 0)` in all four cells. The seat's §2.2 departure (the hover rule held at `transparent` and moved above the engaged group) is what makes R-6's stated outcome true; the literal wording leaks the grey that O-62 rules out. **I uphold the hold.** It adds no name and no token.

**The dock-search composer, in paint** (FV4 §8, owed to the critic; `crit-demo-probe.mjs`, demo builds, Chromium, 23:04-23:07, load 8.9-13.4): with the search open and 30 results, the pointer on row 1 (hovered, not highlighted) paints `oklch(0.53 0.124 69.6 / 0.05)` light and `oklch(0.813 0.109 78.2 / 0.05)` dark, the accent at `--fill-hover`; the highlighted row 0 paints the state rung at `/ 0.12`. HEAD paints one grey ink fill (`color(srgb 0.204 0.148 0.083 / 0.1)`) on both. Frame: `crit-frames/crit-chromium-light-dock-search-pointer-row1-fv4.png`. Two tinted rows, at two alphas, one current: the leg works as R-6 prescribes.

**Re-runs (every red cell, twice).** Chromium (`phase-rerun-fv4-chromium.log`, 23:11 and 23:14, load 8.4 and 11.5): M-2h light halo FAIL 1/68 twice, held 0.814 (x 411) … 0.894 against 0.870 (N-3's attributed frost); dark 0.859 against 0.855, PASS; M-6 stepped FAIL 7/30 twice. Playwright WebKit: §6. No red was seen only under load: each reproduced at load 8-12 against the battery's 24-27.

**Toolchain** (`phase-toolchain-fv4.log`, 23:23-23:24, load 15.3-18.6): `vue-tsc` app exit 0, library build exit 0, `vue-tsc -p tsconfig.test.json` exit 0, dist-demo exit 0, `vitest --maxWorkers=2` **237 files, 2318 passed**, 10 expected-fail, 1 skipped.

---

## 2 · Attacks

**A-1 · Rows 20 and FL-12: five sentences in touched files describe a mechanism floor v4 deletes.** Floor v4's veil has no clamp: `src/styles/glass/veil.css:36` "No luma term and no clamp — nothing samples, so nothing can fail to arrive". HEAD's `veil.css:37` is "THE EARNED DARKEN. `--glass-veil-rung` is the tier's own ink, clamped upward by the measured backdrop luminance". In files `floor-v4.patch` touches (78 in all), these still read as live (`crit-records/prose-sweep-fv4.txt`):

| file:line (floor v4) | sentence | touched by |
|---|---|---|
| `src/styles/glass/surface-axis.css:41-43` | "`--glass-level` and the earned darken retune it in lockstep … it darkens toward the ink in BOTH modes" | floor v3 (it edited this file's header to drop "the bright-bucket darken", and left these lines) |
| `src/styles/glass/surfaces.css:53-54` | "the earned darken (the veil clamp's luma read) reaches the pill" | floor v3 |
| `src/styles/glass/overlay-plate.css:272-273` | "the veil already carries the earned darken" | floor v3 |
| `src/components/dock/styles/shell.css:185` | "(the earned darken composes at the plate)" | floor v3 |
| `src/components/dock/styles/search.css:38-39` | "The field reads the floating rung, darkened by whatever the measured backdrop earns, so it holds ≥4.5:1 over a busy field" | floor v3 **and R-6**, which edited lines 11 and 58 of the same file |

Each is false on the tree it ships in: nothing samples, the plate paints the bound, and in light the plate is cream, not darkened. Row 20 ("the prose sweep of every touched file") and FL-12 ("prose sweep of every touched file") fail on the same counterexample. Pass 4's critic and both pass-5 seats swept for the R-4 register sentences only; the minor v3 seat listed the minor's earned-darken sentences in untouched files (MS3 §1.2) and none of these. **The cure is prose only** (five comments; no value, no name): R-10 below. Its plant is the same `grep` on the files as they stand.

**A-2 · R-8's "one ladder" is not built.** Reg R-8: "Floor v4 then takes the same ladder (one ladder) and re-reads its M-2 and M-8". Floor v4 ships floating/overlay **16/18** (`floor-v4.patch:3654-3655`); the minor ships **18/20**. Floor v4 ran before the search, so the seat said it would take the ladder "if the search moves it" (FV4 header), and the minor seat handed the re-read back to the floor seat (MS3 §2). Nobody ran it. I did, as an injection (`MS3-variants/r18.css` over my floor v4 build; `ladder-fv4`, 22:01-22:07, load 11.0-14.2): M-2 PASS on every captured row (the two FAIL rows are the claim scene, not captured), and 0 of the shared M-2 and M-3 rows regress against floor v4 as built; M-3 PASS 354; M-8 PASS 8; T PASS; M-1 PASS 11. **But M-2h's dark halo leg reds: held 0.848 (x 411) against floor 0.855**, where floor v4 reads 0.859. Re-captured twice (`rerun-r18`, 23:28 and 23:31, load 19.2-19.3): 0.848 both times, light 0.796. The focus-veil blur reads the floating radius (MS3 §2), so the 2 px back costs the dark held host its 0.004 margin. This is not one of the 44 rows as floor v4 is built, so it does not change the count. It is a pass-6 class (H6-2): floor v4 owes R-8's ladder, and taking it re-opens the dark half of N-3's attribution.

**A-3 · The dark focus veil over the aurora (H5-1), judged by eye.** `frames-H5-1/chromium-dark-aurora-state-veil-raw-vs-full.png` and `-full.png`: the focus spot `#e87237 → #993f09`, ΔL −0.199, 8.9× the page's −0.022 (my M-9 log reproduces both to the hex; Playwright WebKit `#8b4421`, −0.210). On the full frame it reads as a soft, feathered dark-brown smudge with no edge, darkest at its core. It carries state (focus), so it is not ornament, but it is not flat or deft: a feathered dark blot is the shape O-87 strikes as a glow halo, inverted. The light veil over the same ground (−0.029, 0.4× the page's) reads as a faint warming and passes by eye. Row 22's letter (no added layer, shadow or gleam) still holds: R-2 changed a value, it added no layer. The frame goes to the owner under row 23. My reading, for that ruling: reject the dark frame as built, and bound the dim relative to its ground (H6-3).

**A-4 · The edge gleam (P4-5), judged under O-87.** `material.css` paints one pointer-anchored disc on the plate's `::before` (`radial-gradient` at `--specular-x/y`, `mix-blend-mode: plus-lighter`); rest opacity 0, so an idle plate paints nothing and no transition track attaches. Measured on the glass-material story (`crit-demo-probe.mjs`, Chromium, rest frame against pointer frame over the plate box): floor v4 light ΔL max +0.012 to +0.018, |ΔL| > 0.01 over 0.00-1.06% of the plate; dark max +0.024 to +0.027 over 7.8-10.1%, opacity 0 → 0.08. Frames: `crit-frames/crit-chromium-{light,dark}-gleam-rest-vs-hover-fv4.png`. By eye: a faint warm patch where the pointer sits, invisible in light, a whisper in dark. **Kept.** It is one layer, it carries the pointer (D-2), and it paints nothing at rest. The copy's "edge gleam follows the cursor" is the library's own name for it (`material.css:152` on floor v4, `:183` at HEAD: "A thin, BOUNDED, pointer-anchored EDGE gleam"), so it is not a prose defect.

**A-5 · The minor's dark menu register in the demo leg.** In the minor, `--menu-row-bg` stays `light-dark(<amber>, var(--glass-plate-quiet))`, so the dark highlighted dock-search row paints `color(srgb 0.093 0.050 0.009 / 0.14)`, while the demo's hover leg (carried verbatim from floor v4) paints the amber `oklch(0.813 0.109 78.2 / 0.05)` beside it. Two registers in one dark list. It is demo CSS and no gate reads it; it goes to W-0.1's landing prose as a note, not a row.

**A-6 · Margins.** The minor's dark Dialog over white reads p05 **4.51** at 18 px, a 0.01 margin; Playwright WebKit reads 4.46 there, equal to HEAD's 4.46 in the same engine (no regression). The floor v4 dark held halo margin is 0.004 (0.859 against 0.855). Both reproduce to the digit over three captures each, at loads from 8 to 27, so neither is a load artefact. They are recorded, not rows.

---

## 3 · The 44 rows (floor v4; my measurement; defaults built, unruled rows open)

| # | row | status | evidence or counterexample | closes on |
|---|---|---|---|---|
| 1, 2, 4-8, 10-19, 21, 22, 24 | RAW, M-1, M-2, M-2m, M-3, M-4, M-5, M-7, M-8, M-9, T, release, O-66 G2, O-66 G3, W-A, engines, plants, FL-13, O-87, STACK | **PASS (20)** | §1: Chromium both themes, my battery; row 18 both engines, 0 stalls; row 19 every plant re-planted on my build and red in Chromium (R-1..R-6, FL plants); row 22 census 0 and its 10.1.0 bite exact, LIT frames 0/20 halos | — |
| 3 | M-1x | OPEN | REPORTED 48/66; content grey off paper (wash over black `#e2dcd7` C 0.0095) | **owner, Q-11 chrome clause.** (a): by its text. (b): select `fv3/q11b.*`; H5-4's chrome leg passes on it in both engines (§1) |
| 9 | M-6 | OPEN | stepped 27/120; `--q1 a` 88/88 | **owner, Q-1.** (a): by selection. (c): a room reading plus a room value that survives `retune-bg` (2/96 red), neither built |
| **20** | prose sweep | **OPEN** (the seat scored PASS) | A-1: five false sentences in five touched files | **route: R-10** (five comments) |
| 23 | gestalt, O-62 frame | OPEN | light: cream over paper, wash/quiet/resting one paint (Q-1), grey off paper (Q-11); dark: the dock and Dialog meet O-87 by eye (§5); the H5-1 dark veil frame reads as a smudge (A-3) | **owner, Q-11 content clause and Q-3**, and the owner's eye on the frames (the H5-1 dark frame included) |
| FL-1..FL-11, FL-13..FL-16 | the floor | **PASS (15)** | witnesses as §1; floor plants red; removals read 0 | — |
| **FL-12** | prose sweep of every touched file | **OPEN** (the seat scored PASS) | A-1, the same counterexample | **route: R-10** |
| N-1 | Q-1's ruling built | OPEN | (a) built; (c) a variant | **owner, Q-1** |
| N-2 | Q-11's ruling built | OPEN | (a) built; (b) the variant, H5-4 green on its chrome leg | **owner, Q-11 chrome clause** |
| N-3 | the dock's held halo | **PASS (attributed)** | `diag-held-noveil` flat (0.894 / 0.878); M-2h light 0.814 twice. A-2 notes that R-8's ladder would red the dark half | — |
| N-4 | the minor split's W-0.1 reading | **PASS** | §4, measured by me | — |

**Count: 37 PASS, 7 OPEN** (floor v4 as the seat scored it: 39). **Closed by R-6 in paint:** the register half of rows 20 and FL-12 (HOV PASS 58, R-4 as built red, the hold upheld). **Still open on those rows:** A-1. **Waiting only on the owner: 5** (3, 9, 23, N-1, N-2). **Route-owned: 2** (20, FL-12), on R-10.

**R-10 (proposed for the agglomerate; seat-closable).** In the five sentences of A-1, say what floor v4 does: the plate paints the theme's own ground at the bound, nothing samples, and in light the plate is cream. For `search.css:38-39`: the field reads the floating rung at the bound, which clears the muted ink over any input. Plant: the A-1 `grep` (`earned darken`, `darkened by whatever`, `luma read`) over `floor-v4.patch`'s touched files must print 0 lines on the cured tree and the five lines on floor v4. No value, name or selector moves, so no witness re-runs.

---

## 4 · The minor split v3 (minor_gates)

### 4.1 · W-0.1 G1-G7, W-0.11 G1-G6, and the rest

My battery on my minor v3 build: Chromium 21:38-21:56 (load 5.0 → 8.2), Playwright WebKit 20:26-20:45 (7.2 → 6.4); HEAD cells (`ladder, dialog, held, hostile, claim, o66field, o66menu, halo, state`, both engines) 21:21-21:35 (4.4 → 9.6). `baseline-minor3.md` is **identical** to `MS3-records/baseline-minor3.md`.

| gate | Chromium (gate) | Playwright WebKit | verdict |
|---|---|---|---|
| **G1** M-1 | 11/11 (L ≥ 0.975, ΔE ≤ 0.02 from paper `#fbfaf8`) | 11/11 | **PASS** over paper |
| **G2** O-66 field | trigger = Input `#f3ece2`, ΔE 0.000 paper and pane; dark `#3f3731` 0.000 / 0.000 | the same | **PASS** |
| **G3** O-66 row | `#f2e6d5` C 0.0261, ΔL −0.0503; HOV PASS 58, minor v2 (R-4 as built) FAIL 1/58 | PASS | **PASS** |
| **G4** W-A light | 108/108 | 108/108 | **PASS** |
| **G5** scope | `G-BUNDLE-RATCHET … 2921364 > 2919057` (+2,307 B) unrebound; with the datum rebound **in the worktree only**: `terminal CLEAN`, roster PRESENT 289 = 289; `.published-roster` diff empty | — | **PASS** (rebind owed at landing) |
| **G6** per R-9 | 13 dark composites, worst ΔE_OK **0.0000** (`g6-dark-r9.txt`). R-9's bite, planted (`crit-variants/r9-plant.css`: the same injection plus the dark floating rung one veil step thinner): **2 over**, floating and popover `#0e0b06 → #0d0a07` ΔE 0.0060 (`g6-dark-r9plant.txt`) | — | **PASS** |
| G6 raw, beside it | 1 of 26 over: dark paper dock `#0f0d0a → #0f0c09` ΔE **0.0038** (W-0.11's dark dock cast) | counted, 0 over | printed as R-9 orders |
| **G7** | M-2: 1,122 HEAD-PASS rows, **0 regress**, 377 more pass; M-3: 72, **0 regress**, 354 more pass | counted in the same rows | **PASS** |
| **W-0.11 G1-G4** | census `stacked=0 halo=0 blur=0 open=0`, exit 0; `v10.1.0 src/styles` exactly `stacked=2 halo=2 blur=5 open=9`, exit 1 | static | **PASS** |
| **W-0.11 G5** | as W-0.1 G5 | — | **PASS** |
| **W-0.11 G6** | M-1 11/11; against the W-0.1 tree (`s-w01ref`, my capture), M-2 0 of 716 regress, M-3 0 of 211 | — | **PASS** |
| **M-2** light | green on every read row; FAIL 9/457 are the unread runs HEAD also leaves unread (`floating-held` fg and muted, `quiet-in-card` in the claim cell) | FAIL 3/457, the claim cell's | **PASS** on read rows |
| **M-3** light | every resting row ≥ 3.0 (wash well over black **3.13**, rings 3.34-3.58); **held floating well 2.64 over black, 2.95 over the aurora** | 1/171: the checker ring 2.99 (§6) | **FAIL 2/171** |
| **M-2h** | held dock ≥ 4.5 in every frame of every light release window; dock-held fg **7.58** over black (R3 p05); the light halo leg 0.801 against 0.870 (N-3's frost); dark is HEAD's (0.122 against 0.125; R-2 is not in the minor) | light PASS 22 | **met** (FL-7) |
| **H3-1** off paper | REPORTED (a): 48 of 66 grey or the ground's hue, 24 chrome accepted; content grey: wash over black `#e2dcd7` L 0.898 C 0.0095 | REPORTED | **REPORTED**, the content clause unruled |
| **FL-14 variant** | STACK **PASS 24/24**; held well **3.28 / 3.34 / 3.33** (black / white / aurora), rings 3.43-3.48; M-1 11/11; G6 raw unchanged (1 over, 0.0038); G7 0 regress in M-2 (539 shared rows) and M-3 (32) | not read | meets P4-3.1's condition |
| tests | `vitest --maxWorkers=2` **239 files, 2320 passed**; both typechecks, the library build and dist-demo exit 0 (`phase-toolchain-minor3.log`, 23:24-23:26, load 17-19) | — | green |

### 4.2 · R-7 and R-8, re-captured by me (the critic owes this; pass 4's took them from the seat)

Injections over my own minor v3 build, Chromium, both themes, scenes `ladder, dialog, held, hostile` (`search`, 22:07-22:51, load 7.4-22.6). The W-0.1 tree is `MS3-variants/w01ref.css` captured by me.

| variant | dark Dialog over white, fg p05 | W-0.11 G6 vs my W-0.1 tree: M-2 (716) · M-3 (211) | light M-3 wash well over black | held floating well, black |
|---|---|---|---|---|
| W-0.1 tree (20/22, 10.1.0 shadows) | **4.51** | reference | — | — |
| 16 / 18 (`crit-variants/r16.css`) | **4.46 ✗** | **1 regresses** · 0 | — | — |
| 17 / 19 | **4.46 ✗** | **1 regresses** · 0 | — | — |
| **18 / 20 (as built)** | **4.51** | **0** · 0 | **3.13** | 2.64 |
| 19 / 21 | 4.51 | 0 · 0 | — | — |
| perimeter **0.52** (`p52.css`, R-7's plant) | 4.51 | 0 · **4 regress** | **2.96 ✗** (2/16 under 3.0) | 2.50 |
| perimeter 0.56 (`p56.css`) | 4.51 | 0 · 0 | — | — |

Every seat value reproduces to the digit: 18 px is the least radius that holds the row, and 0.54 is the least 0.02 step that holds every resting light row. The 0.52 plant reds M-3 and W-0.11 G6 both. Re-captured twice more on the built tree (`phase-rerun-minor3-chromium.log`, 23:19 and 23:22, load 9.8 and 10.7): the dark Dialog 4.51, the black wash well 3.13, the held well 2.64 / 2.95, the halo leg 0.801, identical each time.

### 4.3 · Can W-0.1 ship from the minor v3? Not yet

Every value and reading P4-3.1 ruled reads green as measured by me. What holds it: (1) the entry gate, 0 of 2 clean passes; (2) Q-11's content clause, which G1 off paper needs; (3) FL-14's assignment (the agglomerate's call; the variant meets the condition), without which M-3 light stays red on the held well; (4) R-9's reading must enter W-0.1's text, or G6 is red on the dark dock cast alone (0.0038). The minor carries the same five earned-darken sentences only where its files are touched; its own rows are W-0.1's gates, which do not include a prose sweep, so A-1 is not a minor gate (it is W-0.1's landing prose, as MS3 §1.2 already lists for untouched files).

---

## 5 · The O-87 gestalt, from the glance pairs (by eye)

| pair | what I see | under O-87 |
|---|---|---|
| `glance-minor3/glance-chromium-dark-dock-base-vs-minor3.png` | HEAD's pill sits in a soft zero-offset glow; the minor's sits flat with one quiet edge | meets it |
| `glance-minor3/glance-chromium-light-story-base-vs-minor3.png` | tan cards and a navy live-canvas card become cream; the copy says "earned ink" and "frosts toward cream"; wash/quiet/resting still one paint (Q-1) | meets it; Q-1 is the owner's |
| `glance-fv4/glance-chromium-light-menu-parked-fv3-vs-fv4.png` | two amber rows become one; the pointed-at row lifts with no fill | flatter, carries state |
| `frames-H5-1/chromium-dark-aurora-state-*.png` | a feathered dark-brown smudge on the focus spot (A-3) | **not deft**; to the owner under row 23 |
| `crit-frames/crit-chromium-{light,dark}-gleam-rest-vs-hover-fv4.png` | a faint warm patch under the pointer, nothing at rest (A-4) | kept: one layer, carries the pointer |
| `crit-frames/crit-chromium-{light,dark}-dock-search-pointer-row1-fv4.png` | the highlighted result at the state alpha, the pointed-at one at the hover alpha | carries state |

No added lighting layer, shadow or gleam in either build: census 0, LIT 19 inherited and 0 added, 0 of 20 dock rings read a halo.

---

## 6 · Playwright WebKit re-runs

**Not re-run by me.** The two re-captures of the Playwright WebKit red cells queued for the machine-wide WebKit lock at 23:31:06 (load 19.8). They had not been admitted 46 min later (load 20.8 at 00:17), so I cancelled them (`admissions.log`, last line) rather than hold a slot. `--light` is not open to a browser run. What my own WebKit battery read, once each, informational engine:

| cell | my battery (load) | the seats' re-runs | reading |
|---|---|---|---|
| floor v4 light checker, M-3 ring | 2.83-3.31 (min floating·well), 2/16 under 3.0 (20:07-20:26, 24 → 7) | FV4 §4.4: identical, twice, load 20.0 / 20.6 | equal to the digit across four captures in three seats; the informational engine's (no `backdrop-filter`) |
| floor v4 dark stripes, M-8 | floating bleed 1.26 C 0.0260 | FV4 §4.4: identical, twice | the same |
| minor v3 light checker ring | 2.99 (min floating·well), 1/16 under 3.0 (20:26-20:45, 7.2 → 6.4) | MS3 §3.1: 2.99, twice, load 21.8 / 18.6 | the same; HEAD 2.82 |
| minor v3 dark Dialog over white | 4.46 | MS3 §3.1: 4.46, twice | equal to HEAD's 4.46 in the same engine, so no G7 regression |

These are informational-engine cells, they do not gate a row, and none is NOT-REPRODUCED by any capture on record. The two critic re-captures are owed: `LABEL=fv4 ENG=webkit RERUN_SCENES=ladder,dialog RERUN_GROUNDS=checker,stripes,paper RERUN_WITNESSES="m3-non-text m8-chrome-calm m6-separable-ladder" bash D3-crit-run.sh inner-w rerun`, and the minor's with `RERUN_GROUNDS=checker,white,black RERUN_WITNESSES="m3-non-text m2-text-contrast"`.

---

## 7 · Next-pass classes (no rows added)

| id | class | evidence | placed |
|---|---|---|---|
| **H6-1** | the prose sweep reads only the sentences a ruling names; a deleted mechanism's description survives in touched files | A-1 (five sentences; two seats and one critic swept past them) | instrument: a static check over each patch's touched files for the names of mechanisms the patch deletes (`earned darken`, `luma`, `clamp` near `veil`), gated, with the five lines as its planted FAIL; and R-10 for the floor |
| **H6-2** | R-8's one ladder is unbuilt in floor v4, and taking it reds M-2h's dark halo leg (0.848 against 0.855) | A-2 | route: floor v5 takes 18/20 and re-reads M-2, M-8, T and M-2h; the dark half of N-3 then needs the same attribution as the light (`diag-held-noveil` at 18 px) or a held-floor value |
| **H6-3** | the dark focus veil is solved on the page and reads as a smudge on bright grounds (8.9× the page's depth) | A-3, H5-1's frame | owner, under row 23; if rejected, a ground-relative bound on the dim (`--dim-max`, already built in H5-1) and a value |
| **H6-4** | the demo's dock-search hover leg uses the amber in dark while the minor's dark highlighted row stays on the quiet plate | A-5 | W-0.1's landing prose / demo, not a D3 row |

---

## 8 · What would make pass 6 clean

Floor v5 = floor v4 + R-10 (+ R-8's ladder with its M-2h reading, H6-2). Rows 20 and FL-12 close on R-10 with its `grep` plant. Rows 3, 9, 23, N-1 and N-2 close only when the owner rules Q-1, Q-11 (both clauses) and Q-3 and looks at the frames, the H5-1 dark frame included. Under the defaults (a) they close by selection, with no build: M-6 `--q1 a` 88/88 and M-1x (a) are measured. Without the rulings, pass 6 cannot be clean, whatever the build reads.

## 9 · Known limits

- The R-7, R-8, R-9 and FL-14 readings are CSS injections over specimen builds, as the seats' were; the built values (0.54, 18 px) are measured in the full battery.
- The demo probe ran in Chromium only (the demo's `GlassDock` crashes Playwright WebKit unshimmed). The R-4 plant's parked probe lost its WebKit page mid-run; its Chromium half is complete.
- W-0.1 §5 names `scripts/probes/band-0/measure.mjs` for G2 and G3; it does not exist in the tree. G2 and G3 were read with `harness/o66-field-row.mjs`, as every pass-4 and pass-5 seat read them.
- `--glass-blur-*` and shadow tokens are read through the pass-4 census (`pass-4/lighting-census.mjs`, W-0.11 appendix A verbatim), not `scripts/probes/band-0/lighting-census.mjs`, which is also absent.
