# D3 · pass 4 · FLOOR-V3: floor v2 + R-1..R-5, with Q-1 (c) and Q-11 (b) measured over the same build

| field | value |
|---|---|
| seat | D3 pass 4, floor v3 (REGISTRY P3-5.2 step 2). Builds `pass-4/floor-v3.patch` = `pass-3/floor-v2.patch` + R-1..R-5 as P3-4.2 rules them, runs the full H4 battery once in both engines with every R plant, and measures each open owner option as an injection over the same build |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | worktree at `a36fe2be`; the checkout moved to `27f6371d` during the seat, and `git diff a36fe2be 27f6371d -- src demo tests package.json scripts` is empty. **`git apply --check pass-4/floor-v3.patch` is clean at `27f6371d`** (83 files, +872 / −2229). `floor-v2.patch` + `floor-v3-R.diff` composes to `floor-v3.patch` byte for byte (checked on a fresh index) |
| owner rulings | **none on Q-1, Q-3, Q-11, Q-12 or Q-13.** `audit/INBOUND.md` ends at O-94 (O-95, the apple-homeview carousel study, is a dock reference, not a D3 ruling); `FORMATION-PROGRESS.md` records none. The P3-4.1 defaults apply: Q-1 (a), Q-3 (a), Q-11 (a), Q-12 (a), Q-13 (a) |
| engines | Chromium 149.0.7827.55 gated. **Playwright WebKit 26.5** informational (paints no `backdrop-filter`; dock rows `+shim`). **Every real-Safari cell: UNMEASURED (owner's safaridriver checkbox)** |
| seat history | This is the seat's second entry. The first (2026-10-14) wrote the R diff, the plants and the variant patches, built, and then died: every browser launch aborted at `bootstrap_check_in … MachPortRendezvousServer … (141)` (the Bash sandbox refuses Mach-port registration), so no capture or witness ran; its WebKit attempt overlapped the 13:24 WindowServer abort (`FORMATION-PROGRESS.md`, the 2026-10-15 assay). Its records were stale and are superseded by this entry's `FV3-records/`. This entry reviewed the R diff against P3-4.2, re-ran everything outside the sandbox under the guard, corrected two comments to the measured values, and adopted the 2026-10-15 WebKit lock (`guarded --exclusive webkit`) for every browser phase after the battery |
| records | `pass-4/FV3-records/`: `phase-*.log` (every phase, with load), `fv3-run.log` and `fv3-results/` (every witness log), `baseline-fv3.md`/`.json`, `M-6-q1{a,c}-*.log`, `M-1x-q11b-*.log`, `M-4-verbose-dark-*.log`, `plants/`, `variants/`, `M-2h-rerun*.log`, `glance-*.log`. `pass-4/FV3-run.sh` lists every command by phase; `pass-4/FV3-plants.mjs` holds the plants and variants; `pass-4/fv3/q1c.{patch,css}`, `q11b.{patch,css}` are the variants in source and injection form |
| fences | No tracked source edited in the checkout; no git write in the checkout beyond `git worktree add`/`remove` for `.claude/worktrees/bl/D3/p4/floor3/wt`. Builds, caches (`.d3out`, `.cache-fv3`) and captures lived in the worktree. Writes in the checkout: `pass-4/` only (`floor-v3.patch`, `floor-v3-R.diff`, `FV3-run.sh`, `FV3-plants.mjs`, `FV3-records/`, `glance-fv3/`, this file). The harness diff carried from the first entry (`harness/m6-separable-ladder.mjs`, `--q1 a\|c`) is kept in place. Nothing ran in a sibling repo |

---

## 1 · The R rows (hunk, plant, before and after per engine)

Battery: `FV3-run.sh battery` = `run.mjs <wt> --label fv3 --skip-build`, 12:14:20-12:50:59, load 13.8 → 13.1 (capture of 140 cells, 8 live, 8 motion, 4 drift windows in 1802.3 s at load 17.9; three retunes 50-52 s; `noclaim` 157.5 s). Playwright WebKit retired once at 60 page loads, stalled 0 times. Plants: `FV3-run.sh plants` captured 14:13:24-14:23:44 at load 9.7-18.3 (queued 79 min for a guard slot), read 14:23:53-14:24:01. Before = floor v2 under H4 (`H4.md` §3, run B, identical to run A). Every red below is the plant's own cell, read in both engines; cells a plant does not take print MISSING and are excluded.

| R | row | hunk (file: what) | after, floor v3 (Chromium · Playwright WebKit) | before, floor v2 | plant (puts floor v2's value back) and its reading |
|---|---|---|---|---|---|
| **R-1** | 7 · M-4 | `tokens/dark-arm.css`: dark `--on-glass-muted-strong: oklch(0.835 0.0117 78.27)` = **`#cdc8c1`, OKLab L 0.8348**; the L81 "thin capsule plates" rationale rewritten as history (the bound is solved at the darker muted ink, so an ink lighter than it clears every plate the muted clears) | **PASS 168 · 168**. Dark capsule fg `#e9e6e2` (L 0.926), muted-strong `#cdc8c1`, signed **+0.091** on all 14 dark rows (`M-4-verbose-dark-*.log`); strong − muted (`#c3b9ac`, 0.790) = 0.045 | FAIL 7/168 (capsule `#d5d0c8`, +0.067) | `plant-R1` `.dark { --on-glass-muted-strong: hsl(36 13% 81%) }`: **FAIL 7/84 · 7/84**, capsule +0.067 |
| **R-2** | 12 · M-9 | `tokens/dark-arm.css`: `--glass-focus-veil-dim: color-mix(in oklab, #000 40%, transparent)` beside FL-6's light declaration; `tokens/glass.css` `-dim` comment says the dark arm dims with black; `tests/styles/focus-veil.test.ts` pins the dark declaration | **PASS 20 · 20**. Dark veil `#0b0a09` → `#070605`, **ΔL −0.022** (both engines); light −0.070 paper, −0.029 aurora (unchanged) | FAIL 1/20, ΔL +0.006 (WebKit +0.009) | `plant-R2` (scrim ink at a tenth in dark): **FAIL 1/10 · 1/10**, +0.006 · +0.009. **"Least mix":** `probe-R2-35` (black 35%) reads **−0.018 · −0.018**, FAIL 1/10 in both, so 40% is the least 5% step that reads ≤ −0.02 (hand arithmetic, 8-bit sRGB: 40% −0.0224, 35% −0.0176) |
| **R-3** | 15 · O-66 G2 | `tokens/glass.css`: `--control-surface-bg: var(--glass-well)` (the Input's surface, by name), `-bg-hover` off the well, `--control-surface-blur` deleted (no reader remains: `grep` over `src demo tests` is empty); `glass/control-surfaces.css`: `.input-pill` and `.control-surface` drop `backdrop-filter`, invalid state mixes off the register; `_shared/field/control.css`: the Input's local redeclaration deleted, it reads the register; `forms-seam.test.ts` pins one declaration | **PASS 2 · 2** (G2 rows). Light trigger `#ece6e0` / Input `#ece5e0`, **ΔE 0.003** paper and pane; dark paper 0.005, pane 0.001 (Chromium). Playwright WebKit 0.003 / 0.002 / 0.003 | ΔE 0.057 light; dark 0.023 / 0.015 | `plant-R3` (trigger back on `--glass-plate-quiet` with its blur): **G2 red 4/4 · 3/4**: light 0.057 · 0.055 (paper and pane), dark 0.023 / 0.015 · 0.019 / 0.009 |
| **R-4** | 16 · O-66 G3 | `_shared/menu/menu.css`: `--menu-row-bg: oklch(from var(--section-color-5) l c h / var(--fill-selected))`, the amber accent `--section-color-5` at the fill register's selected alpha (no plate read). **Hex recorded: `#f2e6d5`, C 0.026** on the light menu plate (the comment now carries the measured value) | **PASS 1 · 1**. Light row **`#f2e6d5`, C 0.0261**, ΔL −0.0503 against the plate `#fef7f2` (Playwright WebKit `#f2e5d5`, C 0.0256). Dark recorded: `#453828` C 0.0319, ΔL +0.0735 (both) | row `#f3ece7`, C 0.0101, ΔL −0.0330 | `plant-R4` (FL-6's ink fill at `--fill-hover`): **G3 red 1/1 · 1/1**, C 0.0101 · 0.0093, ΔL −0.0330 · −0.0338 |
| **R-5** | 22 · O-87 | `tokens/shadow.css`: `--shadow-modal: 0 24px 64px color-mix(in srgb, var(--overlay-scrim-ink) 12%, transparent)`, one layer, one declaration for both modes (the dark arm's `--foreground` 18% light cast and both offset stamps go); `--shadow-dock: 0 6px 20px …12%`, `--shadow-dock-collapsed: 0 4px 12px …12%` (the cast at dock elevation, no zero-offset glow). Prose in `dock.css`, `shape.css`, `shell.css` no longer names a glow | census **`LIGHTING-CENSUS stacked=0 halo=0 blur=0 open=0`**, exit 0 (12:13:45, load 13.4) | `stacked=2 halo=2 blur=0 open=4` | the 10.1.0 tokens (HEAD's src): **`stacked=2 halo=2 blur=5 open=9`, exit 1**. Frames: §5 |

**R-4's alpha.** The row takes `--fill-selected` (0.12), where the register's text reserves that rung for persistent state ("hover cannot mint it"). At `--fill-hover` (0.05) no in-gamut accent at this lightness reaches C 0.02 on the cream plate (the composite gains about 0.05 × C_accent of chroma, so it would need C ≈ 0.2 at L ≈ 0.53-0.81). A highlighted menu row is the menu's one current item, so the seat reads it as state. The critic may rule otherwise; the alternative is a dedicated accent rung, which mints a token.

**R-3's residual.** The ruling expects ΔE 0 by construction. Paint reads 0.001-0.005: both controls resolve the same `--control-surface-bg`, and what remains is the trigger's own 1 px border and edge inside the sample strip. G2's bound is 0.01.

**Side effects the battery saw** (floor v3 against floor v2, `baseline-fv3.md` against `H4-records/runB/baseline-fv2.md`; only these lines differ):

| witness | floor v2 | floor v3 | cause |
|---|---|---|---|
| M-2h dark | FAIL 1/34 (held dock α 0.802 … 0.878, floor 0.855) | **PASS 34**: 0.859 … 0.878 | R-2: the dark veil dims with black, so its frost over the black ground no longer lightens the held dock (the N-3 mechanism). Margin 0.004; re-run in §3 |
| M-2h light | FAIL 1/34 (0.815 … 0.894, floor 0.870) | FAIL 1/34 (0.814 … 0.894) | unchanged; N-3, attributed |
| W-C (C″'s, read only) | 2/181 light, 4/181 dark | 2/181, 2/181 | R-1 lifts the dark capsule out of the `retune-bg`/`retune-card` desyncs; the four left are `retune-fg`'s fg : muted compression (+0.062 light, +0.070 dark) |
| W-D (retired) | 5/9 | 4/9 | — |

Every other witness and every engine-theme cell reads as floor v2 did, to the row count.

---

## 2 · The battery on floor v3 (Chromium gate; `fv3-run.log`, `baseline-fv3.md`)

| witness | Chromium light | Chromium dark | Playwright WebKit light | Playwright WebKit dark | whole run (Chromium) |
|---|---|---|---|---|---|
| RAW | PASS 24 | PASS 24 | PASS 24 | PASS 24 | PASS 48 |
| M-1 | PASS 11 | — | PASS 11 | — | PASS 11 |
| M-1x | REPORTED (a) | REPORTED (a) | REPORTED | REPORTED | REPORTED: 48/66 grey, 24 chrome "accepted for chrome (Q-11 a)", content wash/quiet/resting/card |
| M-2 | PASS 469 | PASS 469 | PASS 469 | PASS 469 | PASS 938 |
| M-2m | PASS 215 | PASS 215 | PASS 215 | PASS 215 | PASS 430 (drift included) |
| M-2h | FAIL 1/34 (halo) | PASS 34 | PASS 34 | PASS 34 | FAIL 1/68 (N-3) |
| M-3 | PASS 177 | PASS 177 | FAIL 2/177 (checker ring, as passes 2-4) | PASS 177 | PASS 354 |
| **M-4** | PASS 84 | **PASS 84** | PASS 84 | **PASS 84** | **PASS 168** |
| M-5 | PASS 10 | PASS 10 | PASS 10 | PASS 10 | PASS 20 |
| M-6 | FAIL 16/16 | FAIL 11/104 | FAIL 16/16 | FAIL 11/104 | FAIL 27/120 (the stepped ladder's own text; owner, Q-1) |
| M-7 | PASS 4 | PASS 4 | PASS 4 | PASS 4 | PASS 8 |
| M-8 | PASS 4 | PASS 4 | PASS 4 | FAIL 1/4 (stripes bleed, as pass 3) | PASS 8 |
| **M-9** | PASS 10 | **PASS 10** | PASS 10 | **PASS 10** | **PASS 20** |
| **O-66** | **PASS 3** | **PASS 2** | PASS 3 | PASS 2 | **PASS 5** |
| STACK | PASS 12 | PASS 12 | PASS 12 | PASS 12 | PASS 24 |
| W-A | PASS 108 | PASS 108 | PASS 108 | PASS 108 | PASS 216 |
| W-S | PASS 12 | PASS 12 | PASS 12 | PASS 12 | PASS 24 (inert) |
| T | reported | reported | reported | reported | light 0.110 / 0.075 / 0.035, dark 0.125 / 0.086 / 0.043; T_c1 ≤ 0.144 (= floor v2) |
| W-B, W-D, W-E, W-F, W-G (banked, retired, BLOCK) | 6/10, 4/9, 20/220, 21/44, 12/20 | 6/10, 4/9, 20/220, 17/44, 16/20 | 6/10, 4/9, 22/220, 21/44, 16/20 | 6/10, 4/9, 20/220, 17/44, 20/20 | not checklist rows |

The unshimmed Playwright WebKit probe crashed on `GlassDock` in both themes (`page.goto: Page crashed`), as H-14 records; it is a probe, not a gated cell.

**Q-1 and Q-11 read on this capture** (`FV3-run.sh readings`, 12:53:55-12:54:00, load 17.5):

| reading | Chromium · Playwright WebKit |
|---|---|
| M-6 `--q1 a` | **PASS 88 · 88**, every variant (base, `retune-bg`, `retune-fg`, `retune-card`). Signed leg: every dark plate 0.132-0.150 from the page, ΔL +0.131 … +0.149; `retune-bg` 0.057-0.065 |
| M-6 `--q1 c` on the stepped ladder | FAIL 2/96 · 2/96: `retune-bg` dark, content↔room 0.006 · 0.005, chrome↔room 0.008 · 0.007 |
| M-1x `--q11 b` on floor v3 | FAIL 12/21 · 12/21: the chrome rows, which (b) must make opaque |

---

## 3 · Re-runs of red cells

`FV3-run.sh rerun` (inside `rest2`), the held and ladder black/white/aurora cells re-captured twice in Chromium and read by M-2h (`M-2h-rerun{1,2}.log`). A first pair captured the held scene alone, and its halo legs read MISSING; it is kept as `M-2h-rerun*-heldonly.log`, and its release leg matched.

| cell | battery (12:14-12:50, load 13-18) | re-run 1 (19:03-19:05, load 16-35) | re-run 2 (19:05-19:07, load 14-17) | verdict |
|---|---|---|---|---|
| M-2h halo, light (red) | held dock α 0.814 (x 411) … 0.894, floor 0.870 ✗ | 0.814 … 0.894 ✗ | 0.814 … 0.894 ✗ | **REPRODUCED** at every load; N-3, attributed (the focus veil's frost over its own host; D5's) |
| M-2h halo, dark (green, margin 0.004) | 0.859 (x 410) … 0.878, floor 0.855 | 0.859 … 0.878 | 0.859 … 0.878 | stable to the third decimal |
| M-2h release leg | every held ink ≥ 4.5 in every frame | same | same | — |

Every other red on floor v3 is either static paint, reproduced byte-for-byte by the variant captures (M-6's base cells in `var-q1c`'s `M-6` read are the same 27/120 shape), or a red H4 already reproduced twice on the identical floor-v2 paths (M-3 Playwright WebKit light 2/177, M-8 Playwright WebKit dark 1/4).

---

## 4 · The owner options, measured over the same build (`FV3-plants.mjs`; captured 14:23:51-14:40:28, load 11.1-19.0; read 14:40:48-14:41:53)

Each variant is an injection of the variant's CSS over the floor v3 specimen build; `fv3/q1c.patch` and `fv3/q11b.patch` are the same change in source form, and both `git apply --check` clean over floor v3. The veil tokens are declared on `:root, .dark` in `glass.css`, so `q1c.css` (same selector, later) and `q11b.css` (`:root:not(.dark)`, higher specificity) override them where the source form would. Each variant takes only the `ladder` and `dialog` scenes (Q-11 (b) light only), so counts below exclude MISSING cells (scenes a variant does not take: held, state, live windows).

### 4.1 · Q-1 (c): three materials

Source form (`fv3/q1c.patch`): the step arithmetic at `glass.css:273-286` (`--glass-veil-step` and its four readers) is deleted; wash, quiet, resting, floating, overlay, chassis, dock, crown and sheet sit on `--glass-bound`; the dialog stays the room at 1; `--glass-veil-step` leaves `tokens/manifest.ts`. M-6 is read under (c)'s text (`m6-separable-ladder.mjs --q1 c`, harness header): inside a material the rungs are one paint (adjacency struck, spread printed); the room separates from each glass material by ΔE ≥ 0.01 on the dark page (gated); content against chrome prints, since both sit on the bound; the signed leg is gated. The capture carries the three retunes under (c) too (H4-3).

| witness on `var-q1c` | Chromium · Playwright WebKit |
|---|---|
| **M-6 `--q1 c`** | **FAIL 2/96 · 2/96.** Spreads 0.000-0.001 in every material. Dark room separation: base content↔room 0.019, chrome↔room 0.018; `retune-fg` 0.019 / 0.018; `retune-card` 0.024; **`retune-bg` 0.009 · 0.007 ✗** (page `#1c1f26`). Light prints 0.001. content↔chrome **0.000** in every cell |
| M-6 `--q1 a` / unflagged | PASS 88 · 88 / FAIL 32/120 · 32/120 (the stepped text) |
| M-6 (c) plant `plant-q1c-noroom` (room thinned to the bound) | FAIL 2/24 · 2/24: room separation 0.000 |
| RAW, M-1, M-4, T | PASS 48, 11, 168, 1 in both |
| M-2, M-3, W-A | no red outside MISSING cells (M-3 Playwright WebKit: the checker ring 2, as base). W-A's one red is "no chromium live windows", a cell the variant does not take |
| T under (c) | every glass rung T 0.110 light, 0.125 dark (content was 0.110 / 0.075 / 0.035); T_c1 0.121-0.139 light |

**Rows (c) closes by selection: none as built.** Row 9 and N-1 would still read 2 red rows (`retune-bg` dark, short by 0.001-0.003). And (c)'s "three materials, separated" separates only the room by paint: content and chrome are one colour (0.000), told apart by optics M-6 does not read. What would close it is a ruling that M-6 under (c) reads the room only, plus a room lift that survives `retune-bg` (the room is already opaque, so the lift would have to be a darker or lighter room pole, a new value). The seat does not build that: it would be a value outside P3-4.2.

### 4.2 · Q-11 (b): the light chrome opaque

Source form (`fv3/q11b.patch`): a `:root:not(.dark)` block after the ladder sets the six chrome rungs (floating, overlay, chassis, dock, crown, sheet) to 1. Content keeps the bound; the dark arm is unchanged.

| witness on `var-q11b` | Chromium · Playwright WebKit |
|---|---|
| **M-1x `--q11 b`** | **PASS 21 · 21.** 24 of 66 off-paper light composites still read grey or the ground's hue, **0 chrome**. **Content rungs grey off paper: wash, quiet, resting, card** (over the deep canvas: wash `#e5e2e1` C 0.0035, quiet `#eee9e6` C 0.0068, resting and card `#f6f0eb` C 0.0093) |
| M-1x (a) | REPORTED (PASS 1) |
| M-1 | PASS 11 · 11 |
| RAW, M-2, M-3, M-4 | no red outside MISSING cells |
| **W-A** | **5 red rows · 5** outside MISSING: the light chrome α leg reads floating α **1.000 against the bound 0.891** (W-A's "thinnest rung on the bound, [0, +0.03]"), by construction; plus the dark and live cells the variant does not take |
| T | chrome T 0.000 light |

**Rows (b) closes by selection:** row 3 (M-1x gated under (b): PASS 21/21 in both engines) and N-2 (built as a variant). **It does not close row 23:** the content rungs stay grey off paper, which is O-62's frame over the story's deep canvas. It also reds W-A row 17's chrome leg by construction, so a (b) ruling must re-word that leg ("light chrome opaque"), which the critic may not do. (b) closes 2 rows and costs 1 unless W-A follows the ruling's text, as M-1x does.

### 4.3 · Selection table

| ruling | rows closed by selection (this build) | rows left |
|---|---|---|
| **Q-1 (a)** (the default; floor v3 as built) | **9, N-1**: M-6 `--q1 a` PASS 88/88 in both engines and all four variants | — |
| Q-1 (c) | none (2/96 red, `retune-bg`) | 9, N-1 |
| **Q-11 (a)** (the default) | **3, 23, N-2**, by the ruling's text: off paper, grey chrome is accepted. M-1x stays REPORTED; content wash/quiet/resting/card are grey off paper in either reading | — |
| Q-11 (b) | 3, N-2 | 23 (content grey off paper); W-A's chrome leg (row 17) reds unless re-worded |
| Q-3 | row 23 with Q-11 | — |

---

## 5 · Glance pairs (`pass-4/glance-fv3/`)

`FV3-run.sh glance` (inside `rest`, 18:51:25-18:56:49, load 35-49; `glance.mjs --require-delta`, H4-1's paint-apart-from-layout reading). Two pairs per engine: **HEAD → floor v3** (what a consumer sees) and **floor v2 → floor v3** (what R-1..R-5 change). PNGs `glance-{engine}-{theme}-{surface}-base-vs-{head,fv2}-vs-fv3.png`, shares in `glance-{engine}-{head,fv2}-vs-fv3.json` and `FV3-records/glance-*.log`.

| pair | Chromium | Playwright WebKit |
|---|---|---|
| HEAD → floor v3 | **PASS 8/8.** Paint: light dock / Dialog / floating / story 96.57 / 89.69 / 82.56 / 96.41%; dark 98.01 / 98.40 / 96.07 / 96.26%. Story layout: 18.8% of 32 plates moved (median 44.8 px), the story copy as in H4 | **PASS 8/8**, within 0.7 of Chromium in every pair; story layout 12.1% of 33 (median 22.4 px) |
| floor v2 → floor v3 | **FAIL 5/8 under `--require-delta`, as the R diff predicts:** the light dock, light and dark Dialog, and light and dark floating plates paint the same (0.00%), because no R row moves those plates' paint. R-5 moves the cast *outside* the box, which the fixed-rect `frame` share sees (ungated): **dark dock 9.53%, dark Dialog 5.82%**, light dock 0.47%. Plate paint moves on the dark dock (1.76%, R-1's capsule ink) and the stories (light 6.82% with 17.1% of plates moved by a median 3.4 px, where R-3 drops the controls' `backdrop-filter`; dark 1.30%) | FAIL 5/8, the same five; frame: dark dock 8.70%, dark Dialog 6.22%, light dock 1.34%; light story 0.13% (no `backdrop-filter` to drop) |

The R pair is a frame for the eye, not a gate: `--require-delta` asks every surface to move, and floor v3 moves only what P3-4.2 rules. **What the owner sees (by eye, Chromium):** `glance-chromium-dark-dock-base-vs-fv2-vs-fv3.png`: floor v2's dark pill sits in a soft zero-offset glow ring; floor v3's sits flat on the page with no ring. `glance-chromium-dark-dialog-base-vs-fv2-vs-fv3.png`: floor v2's dark Dialog carries a pale halo (the `--foreground` 18% light cast); floor v3's carries one quiet dark cast below it. Both read O-87's "flatter, more refined" with the material, edge and inks unchanged. The light story under HEAD → floor v3 is floor v2's (cream cards; the deep-canvas section grey, Q-11).

---

## 6 · Toolchain (worktree; caches in `.cache-fv3`)

`FV3-run.sh toolchain` (inside `rest`, 18:58:56-19:00:33, load 33-43) and `toolchain2` (inside `rest2`, 19:07:01-19:07:12, load 14). Wrapper configs `vite.fv3.config.ts`, `vitest.fv3.config.ts` and `vite.fv3-demo.config.ts` (worktree only, not in the patch) move every cache to `.cache-fv3/`.

| step | command | result | load |
|---|---|---|---|
| typecheck app | `vue-tsc --noEmit` | **exit 0** (12:14:39 and 18:59:05) | 13; 39 |
| typecheck tests | `vue-tsc --noEmit -p tsconfig.test.json` | exit 2 before `dist/` exists (TS2307, `@mkbabb/glass-ui/fourier-math` resolves through `package.json` exports to `dist/`); **exit 0** after the library build | 43; 14 |
| library build | `vite build --config vite.fv3.config.ts` | **exit 0**, 854 ms, `glass-ui:ready` | 42 |
| full units | `vitest run --maxWorkers=2 --testTimeout 240000` | 237 files: **2315 passed**, 3 failed, 10 expected-fail, 1 skipped. The 3 are `boot-graph`'s build arm ("dist-demo/index.html is absent"), FV2 §7's known precondition | 38-43 |
| `dist-demo` | `vite build --config vite.fv3-demo.config.ts` | exit 0 | 14 |
| `boot-graph` after `dist-demo` | `vitest run tests/gates/boot-graph.test.ts` | **14 passed**, exit 0 | 14 |

**Units, final: 2318 passed, 10 expected-fail, 1 skipped, 0 failed**, the same as floor v2 (FV2 §7). The two test arms the R diff rewrites (`forms-seam.test.ts`, `focus-veil.test.ts`) pass. The package verifier was not re-run: the R diff changes no export, name or roster entry beyond `--control-surface-blur` (a CSS custom property, not on the roster), and the bundle-ratchet rebind FV2 §7 owes still stands, now −545 B smaller on the specimen CSS.

---

## 7 · Cost

| item | value |
|---|---|
| R diff | 11 files, +80 / −56 lines (9 `src` CSS files, 2 test files). Each R is one value or one declaration plus its comment, except R-3, which deletes four declarations (`--control-surface-blur` and its two readers, the Input's redeclaration) |
| specimen CSS bundle | HEAD 394,891 B (gzip 64,238); floor v2 391,712 (63,913); **floor v3 391,167 (63,902)**: −545 B raw, −11 B gzip against floor v2 |
| names | `--control-surface-blur` is deleted (a floor-route removal, W-H's, with a MIGRATION row: "`--control-surface-blur` removed; controls sit inside a plate and carry no `backdrop-filter`"). R-5 changes values only. Q-1 (c) would delete `--glass-veil-step` (published in `manifest.ts`: a MIGRATION row) |
| paint | every R row moves paint only where its row reads (§1 side effects: M-2h dark and W-C, both toward green); no M-2 or M-3 row regresses (938 / 354 PASS, as floor v2) |
| minor split | R-3 and R-4 carry over in minor names (P3-5 step 3). R-1 and R-2 touch the dark arm, which the minor does not (G6); R-5 is W-0.11's |

---

## 8 · The 44 rows (floor v3, defaults applied, no row added, struck or renamed)

| # | row | floor v3 | evidence | was (H4 baseline) |
|---|---|---|---|---|
| 1 | RAW | PASS | 48 | PASS |
| 2 | M-1 | PASS | 11 | PASS |
| 3 | M-1x | OPEN · **owner, Q-11** | REPORTED 48/66; under (b) PASS 21/21 (§4.2) | OPEN |
| 4 | M-2 | PASS | 938 | PASS |
| 5 | M-2m | PASS | 430, drift included | PASS |
| 6 | M-3 | PASS | 354 | PASS |
| 7 | M-4 signed | **PASS** | 168; capsule +0.091; plant 7/84 at +0.067 | OPEN |
| 8 | M-5 | PASS | 20 | PASS |
| 9 | M-6 | OPEN · **owner, Q-1** | 27/120 stepped; (a) PASS 88; (c) 2/96 | OPEN |
| 10 | M-7 | PASS | 8 | PASS |
| 11 | M-8 | PASS | 8 | PASS |
| 12 | M-9 dark veil | **PASS** | 20; −0.022; plant +0.006; 35% −0.018 | OPEN |
| 13 | T | PASS | reported | PASS |
| 14 | held release window | PASS | M-2h release leg: every held ink ≥ 4.5 in every frame (worst 4.76, dark white dock) | PASS |
| 15 | O-66 G2 | **PASS** | ΔE ≤ 0.005; plant 0.057 | OPEN |
| 16 | O-66 G3 | **PASS** | `#f2e6d5` C 0.0261; plant C 0.0101 | OPEN |
| 17 | W-A | PASS | 216 | PASS |
| 18 | engines | PASS | 140 cells in both, 3 × 8 retune cells, 12 `noclaim`; WebKit retired once, 0 stalls | PASS |
| 19 | plants | PASS | the five R plants and the (c) plant red (§1, §4.1); the floor plants are H4 §4's on floor v2, whose mechanisms the R diff does not touch (limit, §9) | PASS |
| 20 | prose | PASS | R-1's rationale rewritten as P3-4.2 asks; the two R comments carry measured values; a sweep of `src demo` finds no prose naming a dock glow, the modal stamp or `--control-surface-blur` | PASS |
| 21 | FL-13 | PASS, carried | consumer addenda; the R diff touches none | PASS |
| 22 | O-87 | **PASS** | census `stacked=0 halo=0 blur=0 open=0`; plant exit 1; frames §5 | OPEN |
| 23 | gestalt, O-62 frame | OPEN · **owner, Q-11 (and Q-3)** | §5 | OPEN |
| 24 | STACK | PASS | 24 | PASS |
| FL-1..FL-16 | the floor | PASS 16/16 | every witness that carries them reads as on floor v2. FL-6 holds by its core (no state fill or dim reads a plate token); its text names the menu row on the one-ink register and the veil on the scrim ink, and R-4 and R-2 replace both by ruling | PASS |
| N-1 | Q-1's ruling built | OPEN · **owner, Q-1** | (a) built; (c) measured (§4.1) | OPEN |
| N-2 | Q-11's ruling built | OPEN · **owner, Q-11** | (a) built; (b) measured (§4.2) | OPEN |
| N-3 | the held halo | PASS (attributed) | light 0.814 under the veil's frost (N-3); dark now 0.859 ≥ 0.855 after R-2 | PASS |
| N-4 | minor split's W-0.1 reading | PASS, carried | MS §2.1 | PASS |

**Count: 39 PASS, 5 OPEN** (0.886; H4 baseline 34/44). Rows 7, 12, 15, 16 and 22 close on R-1..R-5, each with its plant red in both engines. **All five open rows wait only on the owner** (3, 9, 23, N-1, N-2). Under the two defaults, Q-1 (a) and Q-11 (a), this build already reads green for every one of them: rows 9 and N-1 by M-6 `--q1 a` (88/88), and rows 3, 23 and N-2 by (a)'s text. The ruling closes them by selection, with no build. Under Q-1 (c) or Q-11 (b), §4 lists what stays open.

---

## 9 · Known limits

- The floor plants (`FV2-plants.mjs`: bound, held floor, carrier veil, isolation, dark perimeter, veil diagnostics) were not re-captured on floor v3. The R diff touches none of their mechanisms. The dark focus-veil dim does reach `diag-held-noveil`'s subject, and §1 shows its effect (the dark halo greens).
- Q-1 (c) and Q-11 (b) are injections over the floor v3 specimen build. Their source forms apply cleanly but were not built or unit-tested; (c)'s source form deletes a published token, `--glass-veil-step`.
- `run.mjs` imported `capture.mjs` at 12:14, three minutes before commit `13975d8b` added the WebKit lock and the `finally` close. Measurement is unchanged by that commit, and every later browser phase ran under both.
- The guard's slot queue held the plants for 79 minutes and the glance for 2 h 41 min (14:40-17:22). It was then killed and re-queued as one admission for every remaining heavy step, and admitted at 18:51 once load fell under the guard's 36. Every timing in this file carries its load.
