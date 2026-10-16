# D3 · pass 4 · MINOR-SPLIT v2: the build 10.2.0's veil recut would ship from, measured once under H4

| field | value |
|---|---|
| seat | D3 pass 4, the minor split v2 (`REGISTRY.md` P3-5.2 step 3). A build, not a route |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | worktree `.claude/worktrees/bl/D3/p4/minor2/wt` at `ba7c38ce` (removed at the end). `git diff --stat d8e32cab ba7c38ce -- src demo tests package.json scripts tests-visual vite.targets.ts` is empty, so the base is the published 10.1.0 source, as in every pass-4 seat |
| patch | `minor-split-v2.patch` (this folder): 38 files, +523 / −386, sha1 `57929627`. `git diff HEAD --binary` of the measured tree equals the file (`cmp`), and `git apply --check` is clean on the checkout at `ba7c38ce` |
| owner rulings | **none on Q-1, Q-3, Q-11, Q-12 or Q-13.** `audit/INBOUND.md` ends at O-97 (O-95 the carousel study, O-96 a PopoverAnchor export, O-97 an easing glyph); `FORMATION-PROGRESS.md` records no D3 ruling. The P3-4.1 defaults apply: Q-1 (a), Q-3 (a), Q-11 (a), Q-12 (a), Q-13 (a) |
| engines | Chromium 149 gated. **Playwright WebKit 26.5** informational: no `backdrop-filter`, dock rows `+shim`; it retired once at 60 page loads, 0 stalls; the unshimmed probe crashed on `GlassDock` in both themes (`page.goto: Page crashed`, H-14's known probe, not a gated cell). **Every real-Safari cell: UNMEASURED (owner's safaridriver checkbox)** |
| seat history | Second entry. The first (2026-10-15 19:09-21:36) wrote the patch, built, and ran the Chromium battery; its worktree was then removed mid-way through the WebKit battery, so every capture was lost (logs kept in `MS2-records/seat1-2026-10-15/`; its Chromium verdict counts equal this entry's to the row). This entry reviewed the whole patch against P3-5, corrected the perimeter prose (§1.3), re-ran every phase from the builds on, and added the attribution and re-run phases |
| records | `MS2-records/`: `phase-*.log` and `rest-c.log`/`rest-w.log` (every phase, with load), `minor2-run-{chromium,webkit}.log`, `minor2-results/` (every witness), `baseline-minor2.{md,json}`, `verbose/` (HEAD and minor v2, both engines, for G6/G7; perimeter and attribution variants; the re-runs), `g7-m2.txt`, `g7-m3.txt`, `g6-dark-m6.txt`, `island-*.{json,log}`, `glance-*.log`, `units.log`, `units-head.log`, `tsc-*.log`, `verifier*.log`, `phase-attrib*.log`. `MS2-run.sh` and `MS2-attrib.sh` hold every command; `MS2-island.mjs` is the island probe; `MS2-variants/` the injections |
| fences | No tracked source edited in the checkout; no git write in the checkout beyond `git worktree add`/`remove`. Builds, caches (`.d3out`, `.cache-m2`) and captures lived in the worktree. Writes in the checkout: `pass-4/` only. Nothing ran in a sibling repo |

---

## 0 · In brief

- **What it is.** 10.1.0 with nothing removed, plus the pass-3 light arm (card pole `#fef7f1`, light rungs at the computed bound 0.891 + whole steps, light Dialog at α 1, light state fills on the ink register) and, new in v2: R-3 and R-4 in minor names, the perimeter at 0.52, FL-10's Close-ring routing, FL-7's held floor, and W-0.11's blur ladder (6/10/12/16/18) and one-layer shadows.
- **W-0.1 G1-G7, Chromium:** G1 **PASS**, G2 **PASS** (ΔE 0.000), G3 **PASS** (C 0.0261), G4 **PASS**, G5 **PASS** (roster 289 = 289; the ratchet owes **+2,340 B**). G6 and G7 each read **one** dark row off HEAD. Both are W-0.11's dark shadow and blur values, which this build carries by order: with HEAD's dark shadow and blur injected back, both return to HEAD exactly (§2.3).
- **M-2 light:** every read row ≥ 4.5 in both engines. The 9 red rows are unread glyph runs that HEAD leaves unread too. **M-2h:** the held dock clears 4.5 in every frame (min 7.58 over black), so **FL-7 holds.**
- **M-3 light:** 4/171 red in Chromium. The wash well over black is still **2.96** at 0.52; it reads **3.13 at 0.54** (variant, §2.2). The other two red rows are the held floating plate's well on HEAD's non-isolating `glass-floating` host.
- **Island:** the `.dark` island now matches the dark page exactly (ΔE 0 on every plate, the trigger and the Input). HEAD's island read ΔE 0.003-0.006 off it, and its trigger read 0.012 off it.
- **Tests:** the 36 pinned arms (plus the proportion register and the deep-blur arm) are rewritten to the light law. Units: **2320 passed, 0 failed**.
- **Off paper (Q-11, unruled):** 48/66 grey, identical to pass 3 and floor v3 to the hex.
- **Shippability:** §6. As built, 10.2.0's veil recut is shippable from this patch except for one value: the light M-3 row over black, which wants 0.54. Two G6/G7 rows also need a reading that W-0.11's dark values may move dark paint. Q-11 is stated separately.

---

## 1 · The build

### 1.1 · What the patch carries (over `pass-3/minor-split.patch`)

| row | value in v2 | where |
|---|---|---|
| **R-3**, one field surface | `--control-surface-bg: var(--input-on-glass)`, the Input's existing form-well fill, read by name (G5 holds: no name added or removed for it). Re-resolved at the element in `.control-surface` and `.field-control` so a `.dark` island takes its own fill. Hover = the fill + the one-ink `--fill-hover`, both modes. `--control-surface-blur` stays declared (minor-lawful; its removal is floor v3's, W-H's) | `tokens/glass.css`, `glass/control-surfaces.css`, `_shared/field/control.css` |
| **R-4**, accent-tint row | light `--menu-row-bg: oklch(from var(--section-color-5) l c h / var(--fill-selected))`, floor v3's token and alpha; dark leg unchanged (`--glass-plate-quiet`) | `_shared/menu/menu.css` |
| light perimeter | `--ink-perimeter: 0.52` (was 0.48); ratio prose 1 : 2 : 6.5, indicator 2px @ 0.26 | `tokens/color-radius.css` |
| **FL-10** | the Dialog Close ring and its reduced-motion flash read `calc(var(--ink-perimeter) * 100%)` instead of a 48% literal | `dialog/styles.css` |
| **FL-7**'s held value | held rung `max(0.6 × rest, --glass-veil-floor)`; `--glass-veil-floor: var(--glass-bound)` in light (floor v2's name), `0` in the dark arm and on `liquid-fill` (a host with no plate). The dark held band is 10.1.0's | `glass/grasp.css`, `tokens/glass.css`, `tokens/dark-arm.css`, `glass/liquid-fill.css` |
| **W-0.11** blur (R-5's ladder) | `--glass-blur-{wash,quiet,resting,floating,overlay}-radius` 6/10/12/16/18 px (each 4 px under 10.1.0, strictly ascending; floor v2's ladder); the deep ladder follows by construction (7.75/11.75/13.75/19.5/23) | `tokens/glass.css`; comments in `glass-deep.css`, `deep.css`, `ladder.css`, `motion-registers.css`, `dock.css` |
| **W-0.11** census (R-5) | `--shadow-modal: 0 24px 64px color-mix(in srgb, var(--overlay-scrim-ink) 12%, transparent)`, one layer, one declaration for both modes (the dark arm's `--foreground` 18% light cast and both offset stamps go); `--shadow-dock: 0 6px 20px …12%`, `--shadow-dock-collapsed: 0 4px 12px …12%` | `tokens/shadow.css`, `tokens/dark-arm.css` |
| tests | §4 | `tests/styles/*`, two component and composable tests |

**Census** (`node lighting-census.mjs`, 23:32:59, load 16): minor v2 `LIGHTING-CENSUS stacked=0 halo=0 blur=0 open=0`, exit 0; the 10.1.0 tokens `stacked=2 halo=2 blur=5 open=9`, exit 1 (W-0.11 G1-G4's bite). `MS2-records/phase-check-census.log`.

### 1.2 · What the dark arm receives

The minor's dark arm is 10.1.0's in its veil (the ladder restated in `dark-arm.css`, values unchanged). It still moves dark paint in four places, each by order:
- **W-0.11:** one dark modal cast (the light `--foreground` halo goes) and the dock's cast without a glow ring. The blur is the one ladder for both modes. Shadow and blur together move one dark composite past G6's 0.002 and one dark M-2 p05 under 4.5 (§2.3).
- **R-3:** the dark Select trigger paints the dark Input's `#3f3731` (W-0.1 §3.2 asks for one field surface "in both themes"; G2's dark rows go green).
- **The perimeter 0.52 reaches dark too.** `color-radius.css` §1.2 states that the dark arm inherits the stroke scalars rather than carrying an unmeasured twin, so the seat kept one value and did not mint a dark 0.48. It moves no dark plate composite (§2.3: with the perimeter back at 0.48 in dark, G6 and G7 read as with 0.52). A critic who reads the task's "light perimeter" as light-only would add `--ink-perimeter: 0.48` to `dark-arm.css`, one line.

### 1.3 · This entry's own edits (on top of the first entry's patch)

A prose sweep of present-tense "0.48" claims about the perimeter rung, which were false at 0.52. The edits are in `scale-paper.css`, `_shared/field/control.css` (two), `card/styles.css`, `glass/control-bit.css` (whose measured table is marked as measured at 0.48) and `glass/overlay-plate.css`. Comments only, so no paint changes. The dock ring's 48% (`dock/styles/index.css:229`) is the dock's own focus-ring mix, not the perimeter rung, so it is D2's and left alone.

---

## 2 · Measured under H4

### 2.1 · Runs and load

| run | when | load (1-min, from the records) | records |
|---|---|---|---|
| builds (specimens + demo, minor v2 and HEAD) | 23:33:04-23:57:26 (queued 19 min for a guard slot) | 18.7 → 27.3 | `phase-builds.log` |
| Chromium battery (`run.mjs --engines chromium`: 70 cells, 4 live, 4 motion, 2 drift windows; 3 retunes; `noclaim`) | 00:44:45-01:03:12 | 27.2 → 26.5 | `minor2-run-chromium.log` |
| HEAD cells, Chromium (56 cells) | 01:03:12-01:10:24 | 26.5 → 21.2 | `rest-c.log` |
| perimeter 0.54 / 0.56 variants (light ladder, dialog, held) | 01:10-01:15:41 | 12.6-14.0 | `verbose/m3-minor2-perim*.txt` |
| island, glance (Chromium) | 01:15:42-01:17:10 | 14.0 → 28.3 | `island-*-chromium.log`, `glance-chromium.log` |
| toolchain, HEAD units, ratchet | 01:17:10-01:21:39 | 28-46 | §4, §5 |
| WebKit battery (70 cells, 4 live, 4 motion, 2 drift windows in 917.5 s; retunes; `noclaim`) | 01:34:32-01:54:17 (waited for the machine-wide WebKit lock) | 13.4 → 24.8 | `minor2-run-webkit.log` |
| HEAD cells, island, glance (WebKit); witnesses; verbose; G6/G7; roster | 01:54:17-02:07:53 | 24.8 → 48 → 25.8 | `rest-w.log` |
| attribution (4 injections) and two re-runs of the red cells | 02:25:49-03:00:35 | 18-55 | `phase-attrib*.log` |

**Every red cell named below was re-captured twice** (02:29:15, load 19.2; 02:32:25, load 31.8) and reproduced to the digit: the light M-3 wells (2.96, 2.50), the held release rows, the halo legs (0.827 light, 0.122 dark), G6's dark dock (ΔE 0.0038) and G7's dark Dialog (4.46). None is NOT-REPRODUCED.

### 2.2 · W-0.1 G1-G7, per engine

| gate | Chromium | Playwright WebKit | HEAD (same session, same harness) |
|---|---|---|---|
| **G1** · M-1 no grey | **PASS 11/11**: plates `#fef7f1`-`#fff8f1`, L 0.980-0.983, ΔE 0.009-0.010 from paper `#fbfaf8`; dock `#fdf7f2`; real Dialog `#fef7f1` | PASS 11/11 | FAIL 22/22 (both engines) |
| **G2** · O-66 field | **PASS**: light trigger `#f3ece2` = Input `#f3ece2`, **ΔE 0.000** on paper and in the pane; dark `#3f3731` = `#3f3731`, 0.000 / 0.000 | PASS (light and dark) | light 0.028 / 0.192, dark 0.175 / 0.167 |
| **G3** · O-66 row, light | **PASS**: row `#f2e6d5`, **C 0.0261**, ΔL −0.0503 against the plate `#fef7f2`. Dark recorded | PASS | row `#c6c2bc` C 0.0094, ΔL −0.0551 |
| **G4** · W-A, light cells | **PASS 108/108**: thinnest painted α on the bound in both bands | PASS 108/108 | (pass 3: 39/108 red) |
| **G5** · scope | **PASS**: verifier with the datum rebound in the worktree only: `terminal CLEAN`, roster PRESENT 289 = 289, claims 193, declarations 454, css 124 (`verifier-rebound.log`, 02:07:53). No published name removed. Added: `--glass-veil-floor` (floor v2's name; pass 3 added `--glass-bound`, `--glass-ink-target`). **Unrebound: `G-BUNDLE-RATCHET … 2921397 > 2919057`, +2,340 B** (§5) | — | HEAD verifier CLEAN at the datum (exit 0) |
| **G6** · dark untouched | **1 of 26** dark composites over 0.002: `chromium dark paper · dock #0f0d0a → #0f0c09`, **ΔE 0.0038**. The other 25 read ΔE 0.0000 | counted in the 26 (0 over) | — |
| **G7** · no row regresses | **M-2: 1,122 HEAD-PASS rows, 1 regresses** (`chromium dark white dialog · dialog·fg`, p05 4.51 → **4.46**, median 4.64 → 4.64), 0 missing, 379 more pass. **M-3: 72 HEAD-PASS, 0 regress**, 344 more pass (`g7-m2.txt`, `g7-m3.txt`) | counted in the same rows | — |

### 2.3 · The two dark rows: attribution (`MS2-attrib.sh`; injections over the minor v2 build, Chromium, dark, paper and white)

| injection (10.1.0's values back, dark only) | G6 dark dock | G7 dark Dialog over white |
|---|---|---|
| none (minor v2 as built) | ΔE 0.0038 ✗ | 4.46 ✗ |
| HEAD's dark shadow tokens | 0.0038 ✗ | 4.46 ✗ |
| HEAD's blur ladder | 0.0038 ✗ | **4.51** (0 regress) |
| HEAD's dark perimeter 0.48 | 0.0038 ✗ | 4.46 ✗ |
| **HEAD's shadow + blur** | **0.0000** | **4.51** |
| HEAD's shadow + blur + perimeter | 0.0000 | 4.51 |

**Both rows are W-0.11's dark values.** The dark Dialog's p05 edge band is the lower blur (20 → 16 px over white). The dark dock moves only when both its new cast and its lower blur apply. The perimeter takes no part. W-0.1 states G6 for the light-veil wave alone. W-0.11 (blur and casts, both modes, the same 10.2.0 band) moves dark paint by design: "slightly less blur", and the dark modal halo is O-87's named slop. So these two rows are a scope reading, not a defect. With W-0.11 folded in, G6 must read "the dark *veil* untouched", and G7 must admit the one row W-0.11's blur costs. That row is 0.04 under 4.5 at p05 on a dark Dialog over a white ground, a cell where HEAD's dark muted already reads 2.90. These readings are the converged spec's to make; this seat does not re-word a gate.

### 2.4 · M-2, M-3, M-2h, H3-1 (per engine and theme; `baseline-minor2.md`)

| witness | Chromium light | Chromium dark | Playwright WebKit light | Playwright WebKit dark |
|---|---|---|---|---|
| M-1 | PASS 11 | — | PASS 11 | — |
| M-1x (H3-1) | REPORTED (a) | — | REPORTED | — |
| M-2 | FAIL 9/457 | FAIL 159/457 (HEAD's rows) | FAIL 3/457 | FAIL 159/457 |
| M-2m | PASS 215 (100 s drift included) | FAIL 98/215 | PASS 215 | FAIL 89/215 |
| M-2h | FAIL 7/22 | FAIL 13/22 | PASS 22 | FAIL 10/22 |
| M-3 | FAIL 4/171 | FAIL 132/171 | FAIL 7/171 | FAIL 126/171 |
| O-66 | PASS 3 | PASS 2 | PASS 3 | PASS 2 |
| W-A | PASS 108 | FAIL 27/108 | PASS 108 | FAIL 27/108 |
| T | light 0.110 / 0.075 / 0.035; T_c1 ≤ 0.139 | dark 0.898 … 0.741 (the 10.1.0 ink ladder) | 0.110 / 0.075 / 0.035 | — |

**M-2 light: green on every read row.** Chromium's 9 red rows are unread glyph runs: `floating-held` fg and muted in the three held cells (the held floating specimen hides its text, H3.md §3.3) and `quiet-in-card` ×3 in the claim cell. HEAD leaves the same runs unread. Light lowest reads: muted 4.83 (wash over black), well-muted 5.60, capsule fg 12.73, **held dock fg 7.58 over black** (pass 3's minor: 3.16). WebKit's 3 are the claim cell's runs.

**M-2h (held dock ≥ 4.5): met.** In every release window (33-94 frames, three grounds, both re-runs) the dock-held inks stay ≥ 4.5 in every frame. The light red rows are the unread `floating-held` run (×3) and the halo leg: held dock α 0.827 (x 411) … 0.899 against floor 0.870, with resting 0.890. That halo is N-3's attributed focus-veil frost over its own host (floor v2 0.814, floor v3 0.814). FL-7's floor holds: no column sheds below the bound except where the veil frosts the ground behind it. The dark rows are HEAD's own: halo 0.122 against floor 0.125 here, 0.122 against 0.127 at HEAD; R-2, which cured them on floor v3, is not in the minor.

**M-3 light: 4/171 Chromium, 7/171 WebKit, against HEAD's 171/171.**

| row | minor v2 at 0.52 | variant 0.54 | variant 0.56 | HEAD |
|---|---|---|---|---|
| every ladder and Dialog row on paper, aurora, aurora50, white, checker, stripes, hostile | perimeter **3.16**, rings 3.13-3.39 (the Dialog Close ring 3.25-3.32 after FL-10; pass 3 read it at 2.90) | 3.34 | 3.53 | 2.30-2.82, rings down to 1.06 |
| wash well and floating well over **black** | **2.96** ✗ (both engines) | **3.13** | 3.31 | 2.79 |
| WebKit only: checker wash/floating well and ring | 2.83-2.96 ✗ | — | — | 2.82 |
| held floating plate's well, black / aurora | **2.50 / 2.80** ✗ | 2.64 / 2.96 ✗ | 2.79 / 3.13 | 2.79 / 1.08 |

The ordered 0.52 leaves the black wash well at 2.96, pass 3's own figure. **The least whole step that reads ≥ 3.0 on every resting row is 0.54.** The held floating well is not a perimeter value: the held floating plate sits on HEAD's `glass-floating` host, which forms no stacking context (STACK red 3/12 in both builds), so its carriers escape the host. Floor v2's FL-14 `isolation: isolate` cures it, and that is W-H's. At 0.56 it reaches 3.13 on aurora but still 2.79 over black.

**H3-1, off paper (Q-11 unruled, default (a), REPORTED):** 48 of 66 off-paper light composites grey or the ground's hue (24 chrome, "accepted for chrome (Q-11 a)"). Content rungs grey off paper: **wash, quiet, resting, card**. Over black wash `#e2dcd7` L 0.898 C 0.0095; over the deep canvas `#193b59` wash `#e3e3e3` C 0.0000. These are pass 3's and floor v3's readings to the hex: the minor v2 does not change O-62's off-paper reading.

### 2.5 · The rest of the battery, for the record (Chromium light)

RAW PASS 24, M-5 PASS 10, M-8 PASS 4, M-9 PASS 10, W-S PASS 12, O-66 PASS. Red: M-4 7/84 (the dock's muted ink is 10.1.0's `contrast-color()` pole `#000000`, signed −0.229, inverted; its removal is W-H.1's), M-6 16/16 (light adjacency 0.001-0.004, struck under Q-1 (a)), M-7 4/4 (`contain: paint`, W-E.2's), STACK 3/12 (HEAD's `glass-floating` host). Dark: the 10.1.0 rows, bar the two in §2.3.

---

## 3 · The `.dark` island against HEAD (`MS2-island.mjs`; a `.dark` block on the light page's paper scene, against the same block on a fully dark page)

| element | HEAD island | HEAD dark page | ΔE | minor v2 island | minor v2 dark page | ΔE |
|---|---|---|---|---|---|---|
| wash | `#0b0a08` (rung from base **.14**) | `#0c0a07` (.18) | 0.0031 | `#0c0a07` (.18) | `#0c0a07` | **0** |
| quiet / resting / floating / overlay | `#0c0a07` / `#0c0b07` / `#0d0a07` / `#0e0b06` | `#0c0b07` / `#0d0a07` / `#0e0b06` / `#0e0a07` | 0.0041-0.0060 | equal to the page | — | **0** |
| `.control-surface` (trigger) | `#14110c` | `#120e0a` | 0.0123 | `#3f3731` | `#3f3731` | **0** |
| `.field-control` (Input) | `#3f3731` | `#3f3731` | 0 | `#3f3731` | `#3f3731` | 0 |

Chromium, 01:15:42-01:15:53, load 14-18 (`island-*-chromium.log`); Playwright WebKit (`island-*-webkit.log`) agrees: the minor island's trigger `#3f3731` reads ΔE 0 against the dark page, where HEAD's reads 0.0136. MS §1.1's unmeasured side effect is the reverse of a regression. HEAD's island inherited the light root's base (0.14) and was one step off the dark page; the minor's dark arm restates its ladder, so the island now paints the dark page's rungs, and the element-level re-resolution of `--control-surface-bg` gives the trigger the dark fill.

---

## 4 · Tests: the landing debt, measured in the build (`units.log`, 01:17:10-01:19:33, load 28-46)

| step | minor v2 | HEAD (same worktree, patch reversed) |
|---|---|---|
| `vue-tsc --noEmit` | exit 0 | — |
| library build | exit 0 | exit 0 |
| `vue-tsc -p tsconfig.test.json` | exit 0 | — |
| `dist-demo` | exit 0 | — |
| `vitest run --maxWorkers=2` | **239 files: 2320 passed, 0 failed**, 10 expected-fail, 1 skipped | 2318 passed, **1 failed** (`boot-graph` "the dist-demo is NEWER than every source": the dist-demo was built from minor v2's tree before the reverse, an artifact of this run), 10 expected-fail, 1 skipped |

The rewritten arms are all in the patch (`tests/styles/*` and two component and composable tests):
- `glass-subtlety` (pass 3's 6): the bound computed and checked to clear its target; the ladder moving with the muted ink; each light band's thinnest rung on the bound; no hand α; the dark ink ladder restated and strictly increasing; the light veil as the `--card` pole; the blur ladder at 6-18 px; the rung-name pairing arm; the held floor.
- `contrast-computed` (29): the parser reads `oklch(var(--card-l) …)`, five figures are re-derived over the new card (3.35, 3.33, 4.61, 5.11, 1.90), and the quiet-track arm reads the light ink fill.
- `focus-veil` (1): the light dim pinned to the scrim ink.
- Also `proportion-register` (1 : 2 : 6.5, 2px @ 0.26), `Surface` (the deep ladder) and `use-accent-tone` (`--card-l`).

Each arm states the law the minor ships, so no arm is skipped or loosened to green.

## 5 · The bundle ratchet

`node scripts/verify-export-types.mjs` on minor v2's library build: **`G-BUNDLE-RATCHET: bundle ratchet increase forbidden: 2921397 > 2919057`** (exit 1, 01:21:08). On HEAD's library build it exits 0 (CLEAN at the datum, 01:21:39). **Delta +2,340 B** (pass 3's minor: +2,355 B), mostly rewritten comments. The rebind is the landing's (Q-14's owner path). With the datum rebound in the worktree only, the verifier reads CLEAN (§2.2 G5).

## 6 · Glance pairs (H-13, `glance-minor2/`, HEAD → minor v2; both engines)

| surface | Chromium paint (layout) | Playwright WebKit paint |
|---|---|---|
| light dock / Dialog / floating | 95.72 / 89.66 / 82.30% (no move) | 95.72 / 89.71 / 82.26% |
| light story | 92.07% (layout 0.0%) | 92.28% |
| dark dock / Dialog / floating | 1.79 / 0.10 / **0.00%** | 1.83 / 0.12 / 0.00% |
| dark story | 1.86% | 1.17% |

`--require-delta` reads "FAIL 1 of 8 pairs" in each engine. That one pair is the dark floating plate at 0.00%, which is G6 holding, not a capture defect. **By eye (O-87, row 22):**
- `glance-chromium-dark-dock-base-vs-minor2.png`: HEAD's pill sits in a soft zero-offset glow ring, and minor v2's sits flat on the page.
- `glance-chromium-light-story-base-vs-minor2.png`: cream cards on the aurora; wash, quiet and resting cannot be told apart.
- The glass-material story's live-canvas card is navy at HEAD and cream on the minor, while its copy still promises an "earned darken" (FL-12's prose row, outside the patch).

No lighting layer, shadow or gleam is added.

**Owner look-at list:** `glance-chromium-light-{dock,dialog,floating,story}-base-vs-minor2.png` (what 10.2.0's veil recut shows), `glance-chromium-dark-dock-base-vs-minor2.png` (W-0.11's dock cast).

---

## 7 · Shippability for 10.2.0

| item | reading |
|---|---|
| O-62 over paper, G1 | closed (11/11 both engines) |
| O-66 §1 field and row, G2 and G3 | closed in both themes (ΔE 0.000; C 0.0261). Pass 3's two blocking reds are gone |
| G4, G5 | green; the ratchet rebind (+2,340 B) is owed at landing |
| M-2 light, M-2h held dock | green on every read row; FL-7 holds (held dock ≥ 7.58) |
| M-3 light | **one value short**: at the ordered 0.52 the wash and floating wells over black read 2.96. **0.54 reads 3.13** and greens every resting row in Chromium. The held floating well (2.50) is FL-14's (W-H), not a value |
| G6, G7 | each reads one dark row off HEAD, both attributed to W-0.11's dark shadow and blur values (§2.3). They need a scope reading, not a value |
| island | improved (ΔE 0 against the dark page; HEAD 0.003-0.012) |
| tests | 2320 passed, 0 failed with the arms rewritten |

**Reading.** The minor split v2 is the shippable shape of 10.2.0's veil recut. On the light arm it closes every row pass 3 left red except M-3's black-ground wells, and those close with one value (0.54 in place of 0.52; the build carries 0.52 as P3-4.2 ordered it). It still needs three things, none of which a seat may supply:
1. **The perimeter value:** 0.52 as ordered (M-3 light 2 rows red over black) or 0.54 as measured (green).
2. **A reading of G6 and G7 with W-0.11 folded in.** As written, G6 and G7 are the veil wave's own hold lines. The same band's O-87 values move one dark composite by 0.0038 and one dark p05 by 0.05.
3. **The entry gate:** W-0.1 lands only after two consecutive clean D3 passes. Pass 4 is clean only if the owner rules Q-1 and Q-11.

**Q-11, off paper, stated separately.** 48 of 66 off-paper light composites read grey, and the content rungs wash, quiet, resting and card are grey off paper. Over black the wash is `#e2dcd7` (L 0.898, C 0.0095); over the story's deep canvas it is `#e3e3e3` (C 0.0000). This is floor v2's and floor v3's reading to the hex, and the minor v2 does not move it. G1 green does not show what the owner sees over dark grounds. Under Q-11 (a) the chrome rows are accepted and the content rows are reported. Under (b), floor v3 §4.2 measured that the chrome goes opaque and the content rungs stay grey. Whether 10.2.0 may ship that is the owner's.

## 8 · Known limits

- The perimeter variants and the attribution injections are CSS injections over the minor v2 specimen build, read by M-3, M-2 and M-6 in Chromium. They are not separate source builds.
- During the first Chromium admission, an edit to `MS2-run.sh` landed while a phase's bash was still reading it. That bash ran the new `perim` block's captures at shifted offsets, inside the same admission. HEAD's cells were captured cleanly before it (exit 0, 56 cells), the variant captures are the ones read in §2.4, and every later phase started a fresh bash.
- A first single admission for every remaining phase under the WebKit lock was cancelled unadmitted after 30 min, since it would have held the machine-wide WebKit lock for hours. The run was split into a Chromium admission and a WebKit admission.
- HEAD's `boot-graph` freshness failure (§4) is this run's ordering. HEAD's suite was not re-run after a fresh `dist-demo`.

## 9 · Reproduce

```sh
P4=docs/tranches/BL/design/material/pass-4
bash $P4/MS2-run.sh setup && bash $P4/MS2-run.sh check && bash $P4/MS2-run.sh census && bash $P4/MS2-run.sh builds
ENG=chromium bash $P4/MS2-run.sh rest-c battery-chromium head-cells perim island glance toolchain units-head ratchet
ENG=webkit   bash $P4/MS2-run.sh rest-w battery-webkit head-cells island glance witnesses verbose g67 roster
bash $P4/MS2-attrib.sh                                    # shadow, blur; then the two re-runs
MS2_SKIP_RERUN=1 MS2_VARIANTS="dark-head-perim dark-head-all dark-head-shadow-blur" bash $P4/MS2-attrib.sh
bash $P4/MS2-run.sh teardown
```
