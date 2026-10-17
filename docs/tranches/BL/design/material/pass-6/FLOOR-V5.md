# D3 · pass 6 · FLOOR V5: floor v4 + R-10, R-11, R-12, measured under H6

| field | value |
|---|---|
| seat | D3 pass 6, floor v5 (`REGISTRY.md` P5-6.2 step 2). Build R-10, R-11 and R-12 on `pass-5/floor-v4.patch`, run the full H6 battery once in both engines with each plant (DEL, the ladder `diff`, the demo probe), read `diag-held-noveil` at 18 px in both themes for N-3, run the toolchain, and score the same 44 rows |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `c9a6082a1` at the build (the H6 commit). HEAD moved to `a098c264d` during the run (a D4 docs commit); `git diff --stat c9a6082a1 a098c264d -- src demo tests package.json scripts tests-visual vite.targets.ts` prints nothing, and neither does the same diff from `f9267e35a`, so this seat measures the source every pass-5 and H6 seat measured |
| patch | **`floor-v5.patch`** (86 files, +956/−2290, sha1 `dc295dbc`). `git apply --check` is clean at `a098c264d`. Composition, checked byte for byte in the worktree (`git diff HEAD --binary \| cmp`): `floor-v4.patch` + `floor-v5-R10.diff` (8 files, +27/−25) + `floor-v5-R11.diff` (7 files, +30/−27) + `floor-v5-R12.diff` (1 file, +5/−9) = `floor-v5.patch`. The three R diffs share no file |
| owner rulings | **None.** `audit/INBOUND.md` still ends at O-98; `FORMATION-PROGRESS.md`'s last D3 line is the pass-5 close. The P5-4 defaults apply: Q-1 (a), Q-3 (a), Q-11 (a) for chrome with content REPORTED, Q-14 (a), Q-12 (a), Q-13 (a). Floor v4 already builds every default, so **no variant is selected** (`pass-4/fv3/q1c.*`, `fv3/q11b.*` stay unapplied) and nothing is built for an owner option |
| engines | Chromium 149 gated, Playwright's headless shell with no launch arguments for every cell; the moving-field windows alone relaunch with `CHROMIUM_FIELD_ARGS` under H6 §1.1's citation (`fv5-run-chromium.log`: "chromium relaunched for the moving-field windows"). **Playwright WebKit 26.5** informational (paints no `backdrop-filter`; dock rows `+shim`). **Every real-Safari cell: UNMEASURED (owner's safaridriver checkbox)** |
| records | `FV5-records/` (every log with its load); `FV5-run.sh` (every phase's command); `FV5-demo-probe.mjs` (R-12's plant, gated); `FV5-variants/` (the row-6 perimeter probe); `glance-fv5/` |
| fences | No tracked source edited in the checkout and no git write in it beyond `git worktree add` / `remove` for `.claude/worktrees/bl/D3/p6/floor5/wt`. Floor v4 and the minor v3 were swapped in that worktree with `git apply` / `apply -R`, each swap checked with `cmp`. Builds, captures and caches lived in `$W/.d3out` and `$W/.cache-fv5`. The only checkout writes are under `docs/tranches/BL/design/material/pass-6/`. The worktree is removed and `floor5/` is gone. Nothing ran in a sibling repo |
| machine law | Every build, capture, probe and toolchain run went through `~/.claude/guard/guarded`; static checks ran under `--light` (no browser). Every Playwright WebKit run was one `guarded --timeout 90 --exclusive webkit` admission: queued 02:25:30, admitted 02:45:57, ended 03:51:01 (65 min). **One heavy run at a time:** the Chromium phases ran while the admission queued, and the admission's first line waits on a busy marker those phases held, so the two never overlapped. That held the WebKit lock idle 02:45:57-02:54:12 (8 min), a cost to other seats, recorded here. vitest `--maxWorkers=2`. The kernel-zone refusal never fired. Nothing is left running |

Short citations: `Reg` (`REGISTRY.md`, Pass 5 part), `H6` (`pass-6/H6.md`), `FV4` (`pass-5/FLOOR-V4.md`), `Crit` (`pass-5/D3-critique.md`).

---

## 1 · R-10: every sentence describing the deleted earned darken (rows 20, FL-12)

### 1.1 · The hunk (`floor-v5-R10.diff`, prose only: no value, name or selector moves)

DEL reads names; R-10 asks for every sentence. So the seat swept `src`, `demo` and `tests` for the mechanism's other words too (`clamp`, `measured backdrop`, `luma`, `bucket`, `tint axis`, `darken`, `sampler`) and read each hit in context. Thirteen sentences in eight files say what floor v5 does. The six R-10 names (Reg P5-2.2) are the first six rows:

| file (floor v4 line) | was | now |
|---|---|---|
| `glass/surface-axis.css:41-44` | "`--glass-level` and the earned darken retune it … it darkens toward the ink in BOTH modes … Dark carries one step more ink" | it paints the theme's own `--card` at the quiet rung's α (the bound plus one step); nothing samples the backdrop; each theme derives its bound from its own `--card`. ("One step more" was false: one formula per theme, `tokens/glass.css:277-281`) |
| `glass/surfaces.css:52-55` | "the earned darken (the veil clamp's luma read) reaches the pill" | the pill paints `--card` at the floating rung's α (the bound), as every plate does (nothing samples the backdrop) |
| `glass/overlay-plate.css:272-273` | "the veil already carries the earned darken" | "the veil already paints the overlay rung at the bound" |
| `dock/styles/shell.css:185` | "(the earned darken composes at the plate)" | "(the plate composes the rung at the bound)" |
| `dock/styles/search.css:38-39` | "darkened by whatever the measured backdrop earns, so it holds ≥4.5:1 over a busy field" | "at the bound, which clears the muted ink over any input; nothing samples the backdrop" (R-10's own wording) |
| `button/styles.css:125-126` (untouched by floor v4) | "warm floor and earned darken intact" | "warm floor and bound intact" |
| `dock/styles/search.css:4` | "(≥4.5:1, the darken seam)" | "(≥4.5:1, the bound)" |
| `dock/styles/search.css:51` | "a translucent darkened plate" | "a translucent plate" (the light plate is cream) |
| `glass/surface-axis.css:21-22` | "the tint axis zeroed (a solid plate has no translucent backdrop to darken-over)" | the opaque rule zeroes no tint (it declares none at HEAD either); the clause now says a solid plate has nothing to read through |
| `glass/surface-axis.css:79-80` | "The adaptive TINT axis is zeroed (… darken-over — the bucket-INVARIANT contract)" | the same correction; the backdrop bucket is FL-1's deletion |
| `glass/overlay-plate.css:15` | "the backdrop bucket" (in what the rung composes) | struck |
| `tokens/property-regs.css:150-153` | "tint = darken-over-light … tint-toward-ink under `prefers-contrast: more`" | each rung's α held at the bound, nothing sampled; the a11y escape is level alone (0 / 0.3), which is what `a11y-fallback.css:22,39` declares |
| `glass/a11y-fallback.css:43` (untouched by floor v4) | "joining the level+tint escape" | "joining the level escape" (no tint arm exists under `prefers-contrast: more`; `grep` of that block reads only `--glass-level` and `--glass-definition`) |

Read and left as true: `veil.css:36` (states the deletion), `a11y-fallback.css:35` (states the old tint-darken was removed), `menu.css:10` (history of the fill), `dark-arm.css:303` (the muted ink's light arm, not the plate), the paper multiply comments, the press-darken on dock controls (a press state, not the veil), and every `sampler` in `sheet/` (the graded-edge backdrop sampler, a live mechanism). `tests/` carries no sentence of the class (`glass-subtlety.test.ts:192` asserts the absence).

### 1.2 · Plant (`FV5-records/static.log`)

| tree | DEL (`deleted-mechanisms.mjs --declare harness/deletes-floor.json`) | the registry's line grep |
|---|---|---|
| **floor v5** (fixture) | **PASS 6**, `hits=0 files=0`, 835 text files | 0 lines |
| **floor v4** (planted FAIL) | **FAIL 3/6**, 7 hits in 6 files: `earned darken` ×5 (`button/styles.css:126`, `dock/styles/shell.css:185`, `glass/overlay-plate.css:272`, `glass/surface-axis.css:42`, `glass/surfaces.css:53`), `darkened by whatever` ×1 (`search.css:38`), `luma read` ×1 (`surfaces.css:54`) | 6 lines (it misses `overlay-plate.css:272-273`, as H6 §2 found) |

Floor v4's count is H6's to the hit. LAW over `harness/` and `pass-6/` (now 41 files, this seat's two scripts included): **PASS 41**, one cited (`lib.mjs`, `GPU-WITNESS M-2m`).

**Before and after per engine.** R-10 changes comments, which the specimen build strips: the floor v5 specimen CSS is **391,121 B**, floor v4's byte count (H6 header). DEL is static, so it reads the same for every engine.

---

## 2 · R-11: R-8's one ladder, and N-3 at 18 px

### 2.1 · The hunk (`floor-v5-R11.diff`)

`src/styles/tokens/glass.css:68-69`: `--glass-blur-floating-radius: 16px → 18px`, `--glass-blur-overlay-radius: 18px → 20px`. Wash, quiet and resting stay 6/10/12. The prose that prints the ladder takes it in the same diff: the rung table (`glass.css:27-30`; floor v4's table read overlay and dialog at 16 px, which matched no token), the THICKNESS comment (band [6, 20], the R-8 reason in one sentence, as the minor states it), `glass/ladder.css:15-16`, the deep ladder `7.75 / 11.75 / 13.75 / 21.5 / 25` in `glass/deep.css` and `tokens/glass-deep.css` (five sites), and `dock/dock.css:71,117` (which called the resting radius 16 px, false since floor v3's 12 px; now unnumbered, the minor's wording). Two tests pin the ladder and take it: `Surface.test.ts:208` (the deep radii, the minor's line) and `glass-subtlety.test.ts:225-226,231,240,283` (floating 18, overlay 20, band ≤ 20). No name moves.

### 2.2 · Plant: the ladder `diff` (`static.log`, `radii-*.txt`)

| tree | `diff radii-<tree>.txt radii-minor3.txt` (the five `--glass-blur-*-radius` declarations) |
|---|---|
| **floor v5** (fixture) | prints nothing, exit 0 |
| **floor v4** (plant) | exit 1: `--glass-blur-floating-radius: 16px` / `--glass-blur-overlay-radius: 18px` against 18 / 20 |

The minor's file is read from the minor v3 swapped into the same worktree (`cmp`-checked both ways). The minor v4 is not built yet (P5-6.2 step 3); R-11's static check re-runs against it there.

### 2.3 · Before and after, per engine

**Chromium (gate).** Floor v4 re-captured under H6 on the scenes the ladder moves (`FV5-run.sh ladder-fv4`: ladder, dialog, held, hostile, both themes, 02:26:28-02:32:32, load 17.8 → 10.2) and read by the same witnesses as floor v5's battery capture:

| witness | floor v4 (H6 recapture) | floor v5 | reading |
|---|---|---|---|
| M-2 | 902 PASS rows (2 FAIL = the claim scene, not in this recapture) | PASS 938 | **0 regressions** against floor v4 (`ladder-m2-fv4-vs-fv5.txt`: head PASS 902, regressed 0, absent 0) |
| M-3 | FAIL 7/354 | FAIL 7/354 | **0 regressions** (`ladder-m3-fv4-vs-fv5.txt`: head PASS 347, regressed 0); the 7 are row 6's Close ring, unchanged (§5) |
| M-8 | PASS 8 | PASS 8 | dark stripes floating bleed 1.03 → 1.01, light 1.01 → 1.01 |
| T | PASS | PASS | dark ladder wash T 0.125 · floating 0.125 · dock 0.125, as floor v4 |
| **M-2h** | FAIL 2/68: halo light **0.818**, dark **0.853** (floor 0.870 / 0.855) | FAIL 2/68: halo light **0.793**, dark **0.836** | the 2 px back costs the held host's frost, as Crit A-2 measured with the GPU arguments (0.796 / 0.848). Every release leg passes in both builds |

Floor v4's recapture reproduces H6's halo digits exactly, so the two builds were read under one raster.

**Re-runs** (`rerun-cr.log`, held, ladder, dialog × black, white, aurora, paper, twice): halo light 0.793 and dark 0.836 both times, the Close ring 2.66 both times, M-6 base 7/30 both times, at load 10.8 (02:35:50) and 8.6 (02:38:49), below the battery's 11.3-24.1. **No red appears only under load.**

**Playwright WebKit (informational).** It paints no `backdrop-filter`, so the radius cannot move a WebKit pixel, and none moved: light checker ring 2.83-3.31 (2/16 under 3.0), dark stripes floating bleed 1.26 C 0.0260, light checker Close ring 3.07, each H6's reading to the digit (`fv5-results/M-3.log`, `M-8.log`).

**The glance** (§7): over paper and over stripes the 2 px moves no pixel past 8/255 in the dock, Dialog or floating pairs in either theme (paint 0.00 %). The plates transmit about 11 %, so a 2 px change in what they blur stays under the glance threshold. That is the honest picture: R-11 is one ladder (P-3), not a visible change.

### 2.4 · N-3: `diag-held-noveil` at 18 px, both themes (`plants/diag-held-noveil-M-2h-chromium.log`)

With `.glass-focus-veil { display: none }` over floor v5, the held dock reads **flat: light 0.894 … 0.894, dark 0.878 … 0.878** across 134 columns, against floors 0.870 / 0.855. The two FAIL rows in that log are the aurora held cells the variant does not capture (MISSING). So the dark halo at 18 px (0.836) is the focus veil's frost over its own host, the cause N-3 already attributes in light. **N-3's attribution extends to the dark half, and the row stays PASS (attributed)**, per R-11's first branch. No held-floor value is needed. The veil's frost over its own host stays D5's register question, as N-3 recorded in pass 3.

---

## 3 · R-12: the demo dock search highlights on pointer movement (H6-4)

### 3.1 · The hunk (`floor-v5-R12.diff`, demo code; no name, no token)

```vue
<li … :data-highlighted="i === fuzzy.selectedIndex.value || undefined"
     @pointermove="fuzzy.selectedIndex.value = i"
     @click="fuzzy.selectResult(r)">
```

The scoped `@media (hover: hover) { .dock-search-result:hover:not([data-highlighted]) { background: … var(--fill-hover) } }` leg is deleted, and its comment now says the row highlights the way reka's rows do. `fuzzy.selectedIndex` is the writable `Ref<number>` `useFuzzySearch` returns (`composables/search/useFuzzySearch.ts:30`, `types.ts:26`). The keyboard path (`fuzzy.onKeydown`) is untouched, so pointer and keyboard share one highlighted row.

### 3.2 · Plant and before/after (`FV5-demo-probe.mjs`, the critic's SEARCH reading made a verdict)

The probe opens `/dock/dock-search`, types `e`, moves the pointer onto row 1, then row 0, and passes a theme only when the pointed row is `:hover`, `[data-highlighted]`, and the only one of the first three rows painting a fill.

| build | Chromium light | Chromium dark | Playwright WebKit |
|---|---|---|---|
| **floor v5** (fixture) | **PASS**: pointer on row 1 → highlighted [1], painting [1], `oklch(0.53 0.124 69.6 / 0.12)`; on row 0 → [0], [0] | **PASS**: [1] / [1] at `oklch(0.813 0.109 78.2 / 0.12)`; [0] / [0] | **not readable**: `page.waitForTimeout: Page crashed` in both themes and both builds, the H-14 class (`GlassDock` crashes Playwright WebKit unshimmed; the demo page carries no shim) |
| **floor v4** (planted FAIL) | **FAIL**: pointer on row 1 → highlighted [0], painting [0, 1]; row 1 at `/ 0.05` (`--fill-hover`) beside row 0 at `/ 0.12` | **FAIL**: the same at the dark amber | as above |

Records: `demo-cr.log` (02:24-02:25, load 9.8-16.1), `demo-{fv5,fv4}-{chromium,webkit}.{log,json}`. Floor v4's reading is the critic's pass-5 one (Crit's `demo-probe-fv4-chromium.log`) to the colour. R-12 does not touch the minor (P5-6.2 step 3 builds it there).

---

## 4 · The battery: floor v5 under H6, both engines

### 4.1 · Runs and loads

| run | when | load (1-, 5-, 15-min) |
|---|---|---|
| static (`--light`) | 02:04 | 20.4 / 24.6 / 25.3 at its end |
| builds, floor v5 and floor v4, specimens and demo | 02:05:29, 02:05:36 | 22.4 → 22.7. Specimen CSS **391,121 B** each, floor v4's = H6's |
| Chromium battery | 02:05:44 → 02:23:45 | 24.1 at start; capture 874.6 s, 70 cells, 4 live, 4 motion, 2 drift windows (load 11.3 / 13.7 / 18.4 at its end); 12.2 at the end |
| Chromium demo probe | 02:24-02:25:27 | 9.8 → 16.1 |
| floor v4 ladder recapture | 02:26:28 → 02:32:39 | 17.8 → 10.9 |
| Chromium re-runs ×2 | 02:32:50 → 02:38:50 | 10.4 → 8.6 |
| row-6 perimeter probe | 02:39:10 → 02:39:40 | 8.7 → 9.6 |
| glance (paper, stripes) | 02:39:52 → 02:45 | 12.3 → 6.9 |
| toolchain (two runs, §6) | 02:49:22 → 02:53:37 | 7.7 → 12.6 |
| WebKit admission: battery, plants (both engines), demo probe | queued 02:25:30, admitted 02:45:57, clear of Chromium 02:54:12, battery 03:13:52, FV3 plants 03:39:50, FV2 plants 03:50:58, ended 03:51:01 | 10.3 at admission; WebKit capture 904.5 s, retired once at 60 page loads, no stall line; the unshimmed probe crashed on `GlassDock` in both themes (`page.goto: Page crashed`), as H-14 records; 24.6 at the end |
| witnesses, baseline, diff, readings, plant reads | 03:14-03:52 | — |

### 4.2 · Per witness, engine and theme (`FV5-records/baseline-fv5.md`), and the diff

**`diff H6-records/baseline-fv4-h6.md FV5-records/baseline-fv5.md` prints nothing (exit 0).** Every verdict in all four columns equals floor v4's under H6. R-11 moves values inside two rows (§2.3) and changes no verdict; R-10 and R-12 change no specimen pixel.

Whole run, gate Chromium (`fv5-witnesses.log`): RAW 48 · M-1 11 · M-1x PASS 1 (REPORTED) · M-2 938 · M-2m 430 · **M-2h FAIL 2/68** (the two halo legs, attributed: §2.4) · **M-3 FAIL 7/354** (row 6: §5) · M-4 168 · M-5 20 · **M-6 FAIL 29/120** (Q-1's row) · M-7 8 · M-8 8 · M-9 20 · O-66 5 · STACK 24 · W-A 216 · W-S 24 · T PASS · LIT REPORTED (`halo=5 near=1 stacked=10 chain=3 open=19`, unchanged) · HOV 58. Census `stacked=0 halo=0 blur=0 open=0`, exit 0; on `v10.1.0 src/styles` exactly `stacked=2 halo=2 blur=5 open=9`, exit 1 (R-5's bite). Banked families as H6: W-B, W-C, W-D, W-E, W-F, W-G (not rows).

### 4.3 · Owner options on the floor v5 capture (`readings.log`)

| reading | Chromium · Playwright WebKit | H6 on floor v4 |
|---|---|---|
| M-6 `--q1 a` | **PASS 88 · 88** | same |
| M-6 `--q1 c` | FAIL 2/96 · 2/96 | same |
| M-1x `--q11 b` | FAIL 12/21 · 12/21 (floor v5 builds (a)) | same |
| W-A `--q11 b` | FAIL 1/216 · 1/216 | same |
| M-9 | PASS 20 · 20 | same |
| **`var-q11b`** (the (b) variant over floor v5, `plants/readings.log`) | M-1x `--q11 b` **PASS 21 · 21**; M-1 PASS 11 · 11 | pass 5 critic: same |
| **`var-q1c`** | M-6 `--q1 a` PASS 88 · 88; `--q1 c` FAIL 2/96 · 2/96 | same |

### 4.4 · Every plant re-planted over floor v5 under H6 (row 19; `plants/readings.log`, `plants.log`, `floor-plants.log`)

Every R plant and floor plant reds again, in both engines unless named. `diff` against the pass-5 critic's `plants/readings.log` (floor v4, GPU arguments) prints three lines, none a plant verdict:

| plant | witness | floor v5 under H6 (Chromium · WebKit) |
|---|---|---|
| R-1 `plant-R1` | M-4 dark | FAIL 7/84 · 7/84 |
| R-2 `plant-R2` | M-9 dark | FAIL 1/10 · 1/10 |
| R-3 `plant-R3` | O-66 | FAIL 6/6 · 5/6 |
| R-4 `plant-R4` | O-66 | FAIL 3/3 · 3/3 |
| R-5 | census on 10.1.0 | `stacked=2 halo=2 blur=5 open=9`, exit 1 |
| R-6 | HOV (static) and the parked-row probe | carried: floor v5 touches no R-6 rule (`menu.css`, `color-radius.css`, `card/styles.css` are not in the R diffs; HOV PASS 58 on floor v5). R-6's paint plants stay pass 5's (FV4 §3, Crit §1) |
| **R-10** | DEL | floor v4 FAIL 3/6 (§1.2) |
| **R-11** | ladder `diff` | floor v4 exit 1 (§2.2) |
| **R-12** | demo probe | floor v4 FAIL 2/2, Chromium (§3.2) |
| the bound, `plant-bound` | M-2 ladder, dialog | FAIL 110/298 · 110/298 (pass 5: 108 in Chromium) |
| FL-7 `plant-heldfloor` | M-2 held | FAIL 20/72 · 20/72 |
| FL-14 `plant-carrierveil` | M-2 held | FAIL 50/72 · PASS 72 (WebKit, as pass 5: it paints no carrier filter) |
| FL-15 `plant-darkperim` | M-3 dark | FAIL 47/87 · 47/87 |
| FL-14 `plant-noisolation` | M-2 held · STACK | FAIL 14/28 · 14/28 · STACK FAIL 8/12 · 8/12 |
| `risk-opaque-ancestor` | M-2 held | FAIL 4/28 · 4/28 (as pass 5; a risk reading, not a plant) |
| `plant-q1c-noroom` | M-6 `--q1 c` dark | FAIL 2/24 · 2/24 |

The three `diff` lines: `probe-R2-35` (a read, not a plant) passes in Chromium now, on the shell's `css` aurora ground (H6 §3.2's ground change); `plant-bound` reds 2 more rows; `diag-held-noveil` is Chromium-only by its definition and the critic's WebKit read of it was 8 MISSING rows.

---

## 5 · Row 6 (M-3) under H6: still open, and what a value would cost

The light real-Dialog Close ring reads **p05 2.66** in every light ground, both re-runs (H6: 2.66; pass 5 with GPU arguments: 3.25; Playwright WebKit: 3.07). It is the ring of `:where([data-slot="dialog-close"]):focus-visible`, a 2 px outline at `color-mix(… var(--foreground) calc(var(--ink-perimeter) * 100%) …)` (`dialog/styles.css:143-145`), so its antialiased band is what the shell's software raster moved. The seat measured whether a perimeter value clears it under the shell (`FV5-variants/perim*.css`, injected, light, dialog × paper and white, `perim-probe.log`, 02:39, load 8.4-9.6):

| light `--ink-perimeter` | Close ring p05 (min) | Dialog perimeter |
|---|---|---|
| 0.52 (floor v5 as built) | 2.66 | 3.13 |
| 0.54 (R-7, the minor's) | **2.77** | 3.27 |
| **0.60** (the dark arm's value, FL-15) | **3.20**, all 3 ≥ 3.0 | 3.93 |
| 0.70 | 4.17 | 5.40 |

So a value exists (0.60 in light), but it moves every control edge, focus ring and selection indicator library-wide, and R-7 ruled 0.54 for the minor. The seat does not take it: it is a register change, not a floor route item, and the row's cause is the launch. **It needs one ruling on measurement in the registry:** either (i) the shell's raster is the gate for this ring and the light perimeter rises (0.60 measured; R-7 and O-98 R-3's headroom move with it), or (ii) the ring reads at a stated raster (the field windows' cited arguments, where it reads 3.25), or (iii) a ring-local rung. Row 6 stays **OPEN**, and nothing in floor v5 moved it.

---

## 6 · Toolchain (`FV5-records/toolchain.log`)

| step | result | when, load |
|---|---|---|
| `vue-tsc --noEmit` | exit 0 | 02:49:29, 7.8 |
| `vite build` (library) | exit 0 | 02:49:36, 9.1 |
| `vue-tsc --noEmit -p tsconfig.test.json` | exit 0 (twice) | 02:49:44, 02:52 |
| `vite build --config demo/vite.demo-dist.config.ts` (dist-demo) | exit 0 | 02:52:38 |
| `vitest run --maxWorkers=2` | **237 files, 2318 passed, 0 failed**, 10 expected-fail, 1 skipped (pass 5: 2318) | 02:53:37, 12.6 |

The first vitest run (02:50:37) read 6 failures, recorded in `toolchain.log`: three ladder pins in `glass-subtlety.test.ts` (16/18 and the band ≤ 18), which R-11 owed and now carries (§2.1), and three boot-graph rows that need a dist-demo, which this seat had not built first (FV4 §5 builds it before the units; `FV5-run.sh`'s toolchain phase omits that step, and the second run, in this table, ran it). The patch was rewritten with the pins (sha1 `dc295dbc`), and the composition re-checked byte for byte. Test files are not in the specimen build, so the battery's captures are of the same bytes.

---

## 7 · Glance pairs (`glance-fv5/`, floor v4 left, floor v5 right; `SHA256.txt`)

| look at | file | shows |
|---|---|---|
| **R-12, the dock search, pointer on row 1** | `glance-chromium-{light,dark}-dock-search-pointer-fv4-vs-fv5.png` | left: two tinted rows (the keyboard's at 0.12, the pointed row at 0.05). Right: one tinted row, the pointed one; the keyboard's highlight follows the pointer. The dark crops differ in height (the result list's box), so the printed delta (36.87 % light, 67.05 % dark) counts layout too |
| R-11, at rest over paper | `glance-chromium-{light,dark}-{dock,dialog,floating}-base-vs-fv5.png` | identical (paint 0.00 %): the composites and inks equal to the digit (`glance-chromium-fv5.json`) |
| R-11, at rest over stripes | `glance-chromium-{light,dark}-stripes-{dock,dialog,floating}-base-vs-fv5.png` | identical at the glance threshold (§2.3) |
| the frames the probe banked | `probe/fv5probe-chromium-{light,dark}-dock-search-pointer-row1-{fv4,fv5}.png` | the halves of the R-12 pair |

By eye, under O-87: the dock search shows one current row, and it answers the pointer. That is flatter and carries state (D-2). Nothing was added to any surface. The owner's Q-14 frames stay pass 5's (`pass-5/frames-H5-1/`).

---

## 8 · The 44 rows (floor v5; defaults applied, no variant selected)

| # | row | status | evidence | closes on |
|---|---|---|---|---|
| 1, 2, 4, 5, 7, 8, 10-19, 21, 22, 24 | RAW, M-1, M-2, M-2m, M-4, M-5, M-7, M-8, M-9, T, release, O-66 G2, O-66 G3, W-A, engines, plants, FL-13, O-87, STACK | **PASS** (19) | §4.2, Chromium both themes, verdicts `diff`-equal to floor v4 under H6. Row 4: M-2 0 regressions on the new ladder. Row 14: M-2h's release legs pass in both themes. Row 18: 70 cells, 4 live, 4 motion, 2 drift windows per engine, WebKit retired once. Row 19: every plant re-planted under H6 (§4.4), plus R-10's, R-11's and R-12's. Row 22: census 0, its 10.1.0 bite exact, LIT unchanged, the ladder still under 10.1.0 on every rung | — |
| 3 | M-1x | OPEN | REPORTED under (a); `var-q11b` M-1x 21/21 both engines on floor v5 | **owner, Q-11 chrome clause.** (a): closes by its text, no build. (b): select `pass-4/fv3/q11b.*` |
| **6** | M-3 | **OPEN** (launch-attributed, H6) | the light Dialog Close ring 2.66, twice; 0 regressions from R-11 (§5) | **a ruling on measurement** (§5's three options; 0.60 measured to clear). Not an owner design question unless the registry makes it one |
| 9 | M-6 | OPEN | stepped 29/120; `--q1 a` **88/88** both engines | **owner, Q-1.** (a) closes it by selection |
| **20** | prose sweep | **PASS** (was OPEN) | DEL PASS 6 over every `src` and `demo` file; 13 sentences corrected (§1). Plant: floor v4 DEL FAIL 3/6, 7 hits | — |
| 23 | gestalt, O-62 frame | OPEN | as pass 5; R-12's pair adds one register in the dock search | **owner, Q-11 content clause, Q-3 and Q-14**, with the frames |
| FL-1..FL-11, FL-13..FL-16 | the floor | **PASS 15** | witnesses as §4.2; floor plants red under H6 (§4.4) | — |
| **FL-12** | prose sweep of every touched file | **PASS** (was OPEN) | as row 20; the untouched-file sentences too | — |
| N-1 | Q-1's ruling built | OPEN | (a) built; (c) a variant | **owner, Q-1** |
| N-2 | Q-11's ruling built | OPEN | (a) built; (b) a variant | **owner, Q-11 chrome clause** |
| **N-3** | the dock's held halo | **PASS (attributed), both halves** | at 18 px light 0.793, dark 0.836 red; with the veil hidden flat 0.894 / 0.878 (§2.4) | — |
| N-4 | the minor split's W-0.1 reading | PASS, carried | P5-3 | — |

**Count: 38 PASS, 6 OPEN = 0.864** (H6's floor v4 baseline: 36/8; pass 5: 37/7). **Closed by this seat: rows 20 and FL-12** (R-10, gated by DEL with floor v4 red). **R-11 built** with N-3 still PASS, now attributed in both themes. **R-12 built**, with its plant red (not a row). **Waiting only on the owner: 5** (3, 9, 23, N-1, N-2), each closed by the rulings in P5-4's one-message sheet, with no build under the defaults. **Waiting on a measurement ruling: 1** (row 6). **The route owns no open row.**

Pass 6 can be clean on floor v5 only if the owner rules Q-1, Q-3, Q-11 (both clauses) and Q-14 and looks at the frames before the pass-6 critic runs, **and** the registry rules row 6's measurement.

---

## 9 · Owed and handed on

| item | to | why |
|---|---|---|
| row 6: the Close ring under the shell | the agglomerate (a ruling on measurement) | §5. The floor seat measured a value and does not take it |
| R-11's static check against the minor v4 | the minor v4 seat (P5-6.2 step 3) | the minor v4 does not exist yet; this seat compared with the minor v3's identical ladder |
| R-12 in the minor | the minor v4 seat | `floor-v5-R12.diff` is demo-only and should apply there as is |
| R-12 in Playwright WebKit | none possible in this harness | the demo dock page crashes Playwright WebKit (H-14); Safari UNMEASURED (owner's safaridriver checkbox) |
| `FV5-run.sh toolchain` lacks the dist-demo step | the next seat that reruns it | §6; the step that ran is in `toolchain.log` (`vite build --config` a demo-dist config with `cacheDir: .cache-fv5/vite-demo`) |
| the owner rulings Q-1, Q-3, Q-11 (both clauses), Q-14 | the owner | rows 3, 9, 23, N-1, N-2 |

To reproduce: `git worktree add --detach .claude/worktrees/bl/D3/p6/floor5/wt HEAD`, link `node_modules` per entry, `git apply pass-6/floor-v5.patch`, then the phases in `FV5-records/phases.log` order, the WebKit leg under `guarded --timeout 90 --exclusive webkit -- bash FV5-run.sh wk-inner`.
