# D3 · pass 4 · the fresh critic: floor v3 on the fixed 44 rows, the minor split v2 on its gates

| field | value |
|---|---|
| seat | D3 pass 4, the critic (REGISTRY P3-5.2 step 4). One seat, adversarial. It authored nothing in D3 |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `d7d4fcdc`. `git diff --stat ba7c38ce HEAD` and `27f6371d HEAD` over `src demo tests package.json scripts` are empty, so both patches measure the 10.1.0 source. `floor-v3.patch` applied byte-identical (`git diff HEAD --binary \| cmp`), as did `minor-split-v2.patch`. The three builds reproduce the seats' specimen CSS bytes: floor v3 391,167, HEAD 394,891, minor v2 398,190 |
| owner rulings | **none on Q-1, Q-3, Q-11, Q-12 or Q-13.** `audit/INBOUND.md` ends at O-97 (O-95 carousel study, O-96 PopoverAnchor, O-97 easing glyph) and `FORMATION-PROGRESS.md` records no D3 ruling. The P3-4.1 defaults apply, and the rows waiting on these questions stay open (P2-6.3: "No seat may close it as 'to the owner'") |
| engines | Chromium 149 gated. **Playwright WebKit 26.5** informational (no `backdrop-filter`, dock rows `+shim`). Each battery retired Playwright WebKit once at 60 page loads, with 0 stalls and 0 crash cells (`crit-records/capture-meta.log`). **Every real-Safari cell: UNMEASURED (owner's safaridriver checkbox)** |
| worktree | `.claude/worktrees/bl/D3/p4/crit/wt` held both patches in turn. Builds, captures and caches stayed inside it. It was removed with `git worktree remove --force`. **The permission system refused `rmdir` of the now-empty `.claude/worktrees/bl/D3/p4/crit/`, so that empty directory is left behind** |
| records | `crit-records/` (every phase log with its load, every witness log, both baselines, plants, floor plants, re-runs, toolchain, G5, the probes). Commands: `D3-crit-run.sh`, by phase. Attack tools: `D3-crit-strong-probe.mjs`, `D3-crit-r4-gamut.mjs`, `D3-crit-r4-tokens.mjs` |
| fences | No tracked source edited, and no git write in the checkout beyond `worktree add` and `remove`. Writes are confined to `pass-4/` (this file, the run script, three tools, `crit-records/`). Nothing ran in a sibling repo; the only sibling reads were greps |

---

## 0 · Verdict

**Floor v3: 37 of 44 rows, ADVANCE, not clean.** The seat scored 39. I re-measured every number it reported, and each one reproduces. Two rows it scored PASS fail on a counterexample: **row 20 and FL-12, the prose sweep**. R-4 sets the menu row's fill to `--fill-selected`, and `menu.css:71-72` paints that fill on pointer `:hover`. The register text in two files the patch touches says the opposite: `color-radius.css:161` "`--fill-selected: 0.12; /* persistent state — hover cannot mint it */`" and `card/styles.css:164`. So since R-4, those two sentences are false. One cure closes both rows (§3.2). The five rows that wait on the owner (3, 9, 23, N-1, N-2) stay open.

**The minor split v2: G1-G5 PASS, G6 FAIL, G7 FAIL, M-3 light FAIL, M-2 light PASS on read rows, M-2h PASS, H3-1 REPORTED.** Every number the seat reported reproduces to the digit, and so does its attribution. G6 and G7 fail as W-0.1 writes them, and only a scope reading of W-0.1 with W-0.11 folded in can clear them. That reading is not the critic's to make.

**Pass 4 is not clean** (7 open, and 0 are required), so it is not the first of the two consecutive clean passes W-0.1 needs.

---

## 1 · Re-run of floor v3 (both engines)

`D3-crit-run.sh battery-fv3` = `run.mjs <wt> --label fv3 --skip-build`, 03:07:39-03:44:50, load 22.1 → 18.4 (`phase-battery-fv3.log`). **Whole-run verdicts equal the seat's line for line:** RAW 48, M-1 11, M-1x REPORTED, M-2 938, M-2m 430, M-2h FAIL 1/68, M-3 354, M-4 168, M-5 20, M-6 FAIL 27/120, M-7 8, M-8 8, M-9 20, O-66 5, STACK 24, W-A 216, W-S 24, T PASS. **`baseline-fv3.md` (per engine and theme) is identical to the seat's `FV3-records/baseline-fv3.md`** (`diff` of the table rows is empty).

| R | my reading (Chromium · Playwright WebKit) | plant, re-captured 03:47-04:13 at load 11.7-32.2 (`crit-records/plants/`) |
|---|---|---|
| R-1 · row 7 | dark capsule fg `#e9e6e2`, muted-strong `#cdc8c1`, signed **+0.091**. M-4 PASS 168 | `plant-R1` **FAIL 7/84 · 7/84**, capsule `#d5d0c8` +0.067 |
| R-2 · row 12 | dark veil `#0b0a09` → `#070605`, **ΔL −0.022** in both engines. M-9 PASS 20 | `plant-R2` **FAIL 1/10 · 1/10** (+0.006 · +0.009). `probe-R2-35` −0.018 · −0.018, FAIL 1/10: 40% is the least 5% step |
| R-3 · row 15 | G2 light trigger `#ece6e0` against Input `#ece5e0`, **ΔE 0.003** on paper and in the pane. Dark 0.005 / 0.001. Playwright WebKit 0.002 / 0.002 / 0.003 | `plant-R3` **red** in both engines: light 0.057 · 0.055, dark 0.023 · 0.019 (2 MISSING `o66menu` rows in each count) |
| R-4 · row 16 | G3 light row **`#f2e6d5` C 0.0261**, ΔL −0.0503. Playwright WebKit `#f2e5d5` C 0.0256 | `plant-R4` **red**: C 0.0101 · 0.0093, ΔL −0.0330 · −0.0338 |
| R-5 · row 22 | `lighting-census.mjs` on the floor v3 tree: `stacked=0 halo=0 blur=0 open=0`, exit 0 (03:07:32, load 23.5) | HEAD's src: **`stacked=2 halo=2 blur=5 open=9`, exit 1** |

**Owner options, read on the same capture and on the variants** (`phase-readings.log` 03:45, load 19-20; `plants/readings.log`):

| reading | Chromium · Playwright WebKit |
|---|---|
| M-6 `--q1 a` (floor v3, every variant) | PASS 88 · 88 |
| M-6 `--q1 c` on `var-q1c` | FAIL 2/96 · 2/96 (the `retune-bg` dark room). `plant-q1c-noroom` FAIL 2/24 · 2/24 |
| M-1x `--q11 b` on floor v3 / on `var-q11b` | FAIL 12/21 · 12/21 / **PASS 21 · 21** |
| W-A on `var-q11b` | 14/117 red, 10 of them MISSING cells. The real reds are the light chrome α leg: floating α 1.000 against the bound 0.891, +0.109 outside [0, +0.03], in both engines |
| M-1 on `var-q11b` | PASS 11 · 11 |

**The floor plants, re-captured on floor v3.** FLOOR-V3 §9 had carried them from floor v2 (`D3-crit-run.sh floor-plants`, 06:11-06:23, load 14.6-33.6; `crit-records/floor-plants/`). `plant-bound` FAIL 108/298 · 110/298. `plant-heldfloor` 20/72 · 20/72 (wash-held muted **1.77**). `plant-carrierveil` 50/72 · Playwright WebKit PASS (no `backdrop-filter`). `plant-darkperim` 47/87 · 47/87. `plant-noisolation` M-2 14/28 and STACK 8/12 in both. `risk-opaque-ancestor` reads only MISSING rows red. **`diag-held-noveil`: halo flat at 0.894 / 0.878**, so N-3's attribution holds on floor v3. Every count equals H4 §4's on floor v2, bar `plant-bound` (+1 row in each engine).

**Re-runs.** The one red on floor v3 that is not static paint is M-2h's light halo (0.814 at x 411). It reproduces in my battery at load 18-22, in the seat's battery and in both of the seat's re-runs. It is N-3's attributed veil frost. The dark halo's margin is 0.859 against 0.855, which matches the seat.

**Toolchain** (`phase-toolchain.log`, 06:31-06:33, load 30-34): vue-tsc app exit 0, library build exit 0, vue-tsc tests exit 0, dist-demo exit 0, **vitest 237 files, 2318 passed, 10 expected-fail, 1 skipped, 0 failed**. Removals (`fl-static.log`, `/usr/bin/grep -r` over `src`): `useGlassBackdropLuminance`, `backdropLuminanceSample`, `backdropSampleMath`, `backgroundCanvas`, `--glass-backdrop-luma`, `--glass-backdrop:`, `backdropMode`, `input-on-glass` and `--glass-veil-ink` all read 0 on floor v3. On HEAD they read 8 / 1 / 2 / 12 / 17 / 16 / 9 / 7 / 20.

---

## 2 · Attacks

| # | attack | result |
|---|---|---|
| A-1 | **R-1's rationale** says "an ink lighter than the muted clears every plate the muted clears". On the three hosts that *replace* the muted ink with `-strong` (`ladder.css:198-201`: `.feedback-tone, .glass-capsule, .glass-capsule-track`), the muted ink does not clear the plate, so the sentence proves nothing there. The value it retires was held at L81 for exactly those plates. My arithmetic (`r1-plate-set-arith.log`): against the plate set the old comment names, the configurator capsule falls from 4.68 to **4.32** if that plate still composited `[100,85,68]` | **Refuted in paint.** `D3-crit-strong-probe.mjs` read every visible `-strong` run inside those hosts in 9 dark demo stories, Chromium (03:09-03:10, load 15-17; `strong-probe.log`). Floor v3 has 11 runs, 0 under 4.5, min **6.20** (the chip's ×; HEAD 6.64). Configurator preset labels read 7.86-8.67 (median background). Floor v2's bound has retired the `[100,85,68]` capsule. Row 7 closes |
| A-2 | **R-4's alpha.** `--menu-row-bg` takes `--fill-selected` (0.12), and the same variable is painted by `.glass-menu-row:hover` (`menu.css:71-72`, under `@media (hover: hover)`) as well as `[data-highlighted]`. A pure pointer hover now paints the persistent-state rung. The register reserves that rung, in two files the patch touches: `color-radius.css:161` "persistent state — hover cannot mint it" and `card/styles.css:164` "a rung hover cannot mint" | **Upheld, against rows 20 and FL-12** (§3.2). G3 itself (row 16) is green by measurement and its plant reds, so row 16 closes |
| A-3 | **R-4's claim** "at the hover alpha no in-gamut accent at this lightness reaches C 0.02" | **True for every existing token, false in general.** At α 0.05 over `#fef7f2`, the most chromatic existing accent reaches C 0.0182 (tomato), with `--warning` at 0.0179 and amber at 0.0162 (`r4-tokens.log`). An in-gamut light yellow `#f5f000` composites to **`#fef7e6`, C 0.0236, ΔL −0.003** (`r4-gamut.log`): it clears G3 on both of its clauses at the hover alpha. It is not at "this lightness" (L ≈ 0.92 against 0.53-0.81), and it would mint a value. So the hover-rung cure exists, at the price of one token |
| A-4 | **R-2's dim, read off its own ground.** The ruling sized the black mix on the dark *page*. Over the field, the same 40% black darkens the focus spot to `#e87237 → #993f09`, **ΔL −0.199** (Playwright WebKit −0.210). On floor v2 it was −0.029 · −0.043, and the light arm over the same aurora reads −0.029. By eye (`chromium-dark-aurora-state-base-full.png` in the battery capture) it is a brown bruise on the aurora | **Not a row.** M-9 bounds the dim only from below, and row 12's ruling is met as written. This is a new class: the dark dim is solved on one ground and applied on all. It goes to next_pass_classes, and the owner should see it at the gestalt |
| A-5 | **The census's reach.** `lighting-census.mjs` reads `--shadow-*` tokens only. Literal glows elsewhere: `.card.glass-resting[role="option"][data-shadow]:focus-visible` stacks `var(--card-cast), 0 0 8px oklch(from var(--foreground) l c h / 0.15)` (`card/styles.css:160-161`, a zero-offset focus glow beside a 2px outline ring). `Blob.vue:355,360` chains two `drop-shadow()`s. A token with a small offset (`0 2px 30px`) also escapes HALO, which is how W-0.11's own fixture passed | **Not row 22's** (R-5 ruled the census, and no layer is *added*). Inherited, so it goes to next_pass_classes: the census needs a literal-shadow arm and a frame-read halo leg (W-0.11 §6's "luma ring at 4, 8, 16 px") |
| A-6 | **R-3: a control with no `backdrop-filter` off a plate.** It is legible, because the well sits at the bound and the bound is solved for any input. `--control-surface-blur` is on neither `.published-roster` nor `manifest.ts`, and no sibling `src` reads it (grep) | No finding |
| A-7 | **H4-1's glance on the R pair.** The seat's floor v2 → floor v3 pair is FAIL 5/8 under `--require-delta` by design | Read correctly. A frame pair for the eye, not a gate |

---

## 3 · The 44 rows (floor v3; my measurement; defaults built, unruled rows open)

### 3.1 · Table

| # | row | status | evidence (this seat) | waits on |
|---|---|---|---|---|
| 1 | RAW | PASS | 48 | — |
| 2 | M-1 | PASS | 11 | — |
| 3 | M-1x | **OPEN** | REPORTED; (b) on `var-q11b` PASS 21 · 21; content wash/quiet/resting/card grey off paper in either reading | **owner Q-11.** (a) closes it by its text; (b) closes it by `var-q11b` |
| 4 | M-2 | PASS | 938 | — |
| 5 | M-2m | PASS | 430, the 100 s drift included | — |
| 6 | M-3 | PASS | 354 | — |
| 7 | M-4 signed | PASS | +0.091; plant 7/84 at +0.067; A-1 refuted | — |
| 8 | M-5 | PASS | 20 | — |
| 9 | M-6 | **OPEN** | stepped text 27/120; `--q1 a` PASS 88 · 88; `--q1 c` 2/96 | **owner Q-1.** (a) closes it on floor v3 as built. (c) does not close it as built (`retune-bg` room 0.009 · 0.007) |
| 10 | M-7 | PASS | 8 | — |
| 11 | M-8 | PASS | 8 | — |
| 12 | M-9 dark veil | PASS | −0.022 both engines; plant +0.006; 35% −0.018 (A-4 noted) | — |
| 13 | T | PASS | reported | — |
| 14 | held release window | PASS | 6/6 windows, 11/11 inks ≥ 4.5 in every frame; worst 4.76 (dark white, dock muted-tab) | — |
| 15 | O-66 G2 | PASS | ΔE ≤ 0.005; plant 0.057 | — |
| 16 | O-66 G3 | PASS | C 0.0261; plant C 0.0101 | — |
| 17 | W-A | PASS | 216 | — |
| 18 | engines | PASS | 176 cells, 8 live, 8 motion, 4 drift in both; WebKit retired 1, 0 stalls, 0 crash | — |
| 19 | plants | PASS | R-1..R-5 and the (c) plant red (§1); every floor plant re-captured on floor v3 and red (§1) | — |
| 20 | prose sweep | **OPEN** | `color-radius.css:161`, `card/styles.css:164` false under R-4 (A-2) | route |
| 21 | FL-13 | PASS | the R diff touches no addendum text; consumer landing is E-6's | — |
| 22 | O-87 | PASS | census 0/0/0/0, plant exit 1; frames: dark dock with no glow ring, dark Dialog with one quiet cast (`glance-fv3/`) | — |
| 23 | gestalt, O-62 frame | **OPEN** | §5 | **owner Q-11 (and Q-3)** |
| 24 | STACK | PASS | 24 | — |
| FL-1..FL-11, FL-13..FL-16 | the floor | PASS 15 | witnesses as §1; floor plants red; removals 0 (`fl-static.log`); toolchain green | — |
| FL-12 | prose sweep of every touched file | **OPEN** | same counterexample as row 20 | route |
| N-1 | Q-1's ruling built | **OPEN** | (a) built, (c) variant measured | **owner Q-1** |
| N-2 | Q-11's ruling built | **OPEN** | (a) built, (b) variant measured | **owner Q-11** |
| N-3 | held halo | PASS (attributed) | `diag-held-noveil` flat on floor v3 | — |
| N-4 | minor split's W-0.1 reading | PASS | recorded, re-measured (§4) | — |

**Count: 37 PASS, 7 OPEN (0.841).** Five open rows wait only on the owner (3, 9, 23, N-1, N-2), and two are the route's own (20, FL-12, one cause).

### 3.2 · What closes rows 20 and FL-12

The register and R-4 cannot both stand. Any one of these closes both rows. Each is a value, a declaration or a sentence:
1. **Keep R-4 and narrow the register's text.** `--fill-selected` is the persistent-state alpha, *and* the menu's single highlighted row (an accent tint, not the one ink). Then the menu's hover path must paint only through `[data-highlighted]` (reka sets it on pointer hover), so a bare `:hover` never mints it. This is the smallest change: two comments and one selector.
2. **R-4 on the hover alpha with a lighter accent.** A-3 shows α 0.05 reaches C 0.0236 with a light yellow. That mints one token, which is minor-unlawful in W-0.1, so it would go to W-H.
3. **A dedicated accent rung**, as the R-4 seat named it. That also mints a token.

I rule nothing among them. The agglomerator or the owner picks one. Option 1 alone keeps both 10.2.0 and the floor name-stable.

---

## 4 · The minor split v2 (minor_gates)

Battery `D3-crit-run.sh battery-minor2`, both engines, 04:31:55-05:09:31, load 11.1 → 25.1 (queued 17 min). HEAD cells 05:09:32-05:24:06, load 25.1 → 8.5. **`baseline-minor2.md` is identical to the seat's** (`diff` of the table rows is empty). G6 and G7 were read with `pass-3/MS-g7.mjs` (05:24-05:25), and the red cells re-captured twice in Chromium (05:47-05:54, load 26.7-40.3; the first launch was killed by the guard as "caller died", recorded in `phase-rerun-minor2.log`). **Every red reproduced to the digit in both re-runs.**

| gate | Chromium | Playwright WebKit | verdict |
|---|---|---|---|
| **G1** M-1 | PASS 11/11 | PASS 11/11 | **PASS** |
| **G2** O-66 field | trigger = Input `#f3ece2`, ΔE **0.000** paper and pane; dark `#3f3731` 0.000 / 0.000 | PASS | **PASS** |
| **G3** O-66 row | `#f2e6d5` C 0.0261, ΔL −0.0503 | PASS | **PASS** (A-2 applies to the minor too: its `color-radius.css` keeps "hover cannot mint it". It is not a minor gate) |
| **G4** W-A light | PASS 108 | PASS 108 | **PASS** |
| **G5** scope | verifier on the minor's library build: `G-BUNDLE-RATCHET … 2921397 > 2919057` (**+2,340 B**, exit 1). With the datum rebound in the worktree only: `terminal CLEAN`, roster PRESENT 289 = 289. The patch does not touch `.published-roster` (06:35-06:36, load 31-34) | — | **PASS** (rebind owed at landing) |
| **G6** dark untouched | 1 of 26 over 0.002: dark paper dock `#0f0d0a → #0f0c09`, **ΔE 0.0038**. Re-runs 1 and 2: same | counted | **FAIL** as written |
| **G7** no row regresses | M-2: 1,122 HEAD-PASS rows, **1 regresses** (dark white dialog·fg p05 4.51 → **4.46**), 379 more pass. M-3: 72 HEAD-PASS, 0 regress, 344 more pass. Re-runs: same row, 4.46 | counted | **FAIL** as written |
| **M-2** light | FAIL 9/457. The 9 are unread runs (`floating-held` ×6 and the claim cell's `quiet-in-card` ×3), as HEAD leaves them. Every read row ≥ 4.5 | 3/457 (claim-cell runs) | **PASS on read rows** |
| **M-3** light | **FAIL 4/171**: wash·well over black **2.96** (2/16 under 3.0, both re-runs), held floating well **2.50** (black). Dialog Close ring 3.25-3.32 | 7/171 (adds checker 2.83-2.96) | **FAIL** |
| **M-2h** (held dock ≥ 4.5) | dock-held fg R3 p05 **7.58** over black, 11.43 over white. Every release window holds the dock inks. The halo leg 0.827 is N-3's | PASS 22 (light) | **PASS** on the dock leg (light M-2h prints FAIL 7/22: the halo and unread `floating-held`) |
| **H3-1** off paper | REPORTED (a): 48/66 grey; content wash/quiet/resting/card | same | **REPORTED** (Q-11 unruled) |

**Readings.**
- **G6 and G7 fail as written, both on W-0.11's dark values.** I did not re-run the seat's injections; its attribution (MS2 §2.3) stands unrefuted. Clearing them takes a W-0.1 scope reading ("the dark *veil* untouched"; G7 admits the one row W-0.11's blur costs). That reading belongs to the converged spec and is not a value.
- **M-3 light needs 0.54 or the minor ships red over black.** The held floating well at 2.50 is not a perimeter value. Its host forms no stacking context (STACK 3/12 in the minor, as at HEAD), and FL-14 cures it in W-H.
- **The minor's held dock muted ink is still `#000000`** (`contrast-color()`, M-4 light red), which W-H.1 owns. It is legible (14.24) but not on the register.

---

## 5 · The O-87 gestalt, from the glance pairs (by eye)

- **Floor v3, dark dock** (`glance-fv3/glance-chromium-dark-dock-base-vs-head-vs-fv3.png`). HEAD's pill sits in a soft zero-offset ring. Floor v3's pill is warm brown, with its active tab as a fill and no ring. **Flatter, material kept: meets O-87.**
- **Floor v3, dark Dialog** (`…-dark-dialog-base-vs-fv2-vs-fv3.png`). The pale `--foreground` halo of floor v2 is gone, replaced by one dark cast. Meets O-87.
- **Floor v3, light Dialog** (`…-light-dialog-base-vs-head-vs-fv3.png`). HEAD's grey-brown room becomes a cream room on a quiet cast. O-62 over paper is cured.
- **Floor v3, light story** (`…-light-story-base-vs-head-vs-fv3.png`). Cream cards on the aurora; wash, quiet and resting cannot be told apart (Q-1). The deep-canvas card's two chrome plates read light grey (Q-11). The story still reads "Hover any plate and the edge gleam follows the cursor", the moving specular, which is inherited O-87 slop in the demo copy. It is not added by the route.
- **Minor v2, docks** (`glance-minor2/…-{light,dark}-dock-base-vs-minor2.png`). Light: a cream pill, with the active tab a grey ink fill (the one-ink fill, not the veil). Dark: the ring is gone and nothing else changes.
- **Off the glance, A-4.** On floor v3, the dark focus veil over the aurora is a brown bruise (ΔL −0.199). In a pass that asks for "flatter, more refined", that is the one new visual weight R-2 adds, and the owner should see it.

Row 22 holds (no layer added). Row 23 stays open on Q-11 and Q-3.

---

## 6 · What would make pass 5 clean

- **Route-owned:** close rows 20 and FL-12 by one of §3.2's options, and re-read the prose sweep.
- **Owner:** Q-1 and Q-11 (Q-3 with Q-11 for row 23). Under the defaults (a) / (a), floor v3 already reads green for 9, N-1 (M-6 `--q1 a` 88/88) and for 3, N-2 by (a)'s text. Under Q-11 (b), `var-q11b` greens 3 and N-2 but reds W-A's chrome leg (row 17) by construction, unless W-A's text follows the ruling. Under Q-1 (c), 9 and N-1 stay red (`retune-bg` room) until a room value is ruled.
- **Minor v2 before W-0.1 ships:** the perimeter at 0.54; a W-0.1 scope reading for G6 and G7 with W-0.11 folded in; the ratchet rebind (+2,340 B); the same register cure as §3.2 (the minor carries R-4).

## 7 · Known limits

- The `.dark` island, the glance pairs and the perimeter variants of the minor were not re-captured. I read the seat's PNGs by eye (§5). The perimeter 0.54 / 0.56 numbers are the seat's alone.
- The strong-ink probe (A-1) reads Chromium only, over 9 stories, with the median background under each run. A run over a bright preset well reads lower at its p95-bright background (4.26 at the gouache tile, against HEAD's 4.58). The median is the honest read of a label on a plate.
- The minor's attribution injections (MS2 §2.3) were not re-run. The red cells they attribute were.
