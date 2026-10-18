# D3 · pass 7 · FLOOR V6: floor v5 + R-15, measured under H7

| field | value |
|---|---|
| seat | D3 pass 7, floor v6 (`REGISTRY.md` P6-6.2 step 2). Build R-15 on `pass-6/floor-v5.patch`, with the declaration built from the patch's removed lines. Prove the build outputs byte-identical to floor v5's or run the full battery in both engines. Run the static checks, the toolchain and H7-1's M-3 re-read. Score the same 44 rows |
| seats | **Two seats, one record.** The first seat (20:23-21:12) built the patch, the declaration, the static checks, the byte-identity proof, the toolchain, the M-3 re-read and the Chromium demo probes. It died while queued for the WebKit lock (`phases.log`: `wk queued 21:10:41`, no admission line), and its worktree was left in place. The re-seat (22:01-00:36) found no live process of it, verified its worktree still held `floor-v6.patch` byte for byte (`git diff HEAD --binary \| cmp`), and ran **the full battery in both engines**, the plants, the readings, the red-cell re-runs and the teardown. The re-seat does not take the first seat's departure from P6-6.2 (§4) |
| model | `claude-opus-5-5`, asserted from own system identity (both seats) |
| HEAD | `a11a6ed6a` at the re-seat. The worktree was cut at `6bd161a2c`. `git diff --stat 6bd161a2c a11a6ed6a -- src demo tests package.json scripts tests-visual vite.targets.ts .bundle-ratchet .published-roster` prints nothing (the two commits between are `docs(BL)` only), and neither does the same command from `a75b708e9`. So both seats measure the published 10.1.0 source, as every pass-6 seat and H7 did |
| patch | **`floor-v6.patch`**: 87 files, +967/−2300, sha1 `235a5117`. **`git apply --check` exits 0 at `a11a6ed6a`** (re-seat, in the checkout, read only) and at `6bd161a2c` (`phases.log`, `check`). Composition, checked byte for byte: `floor-v5.patch` (sha1 `dc295dbc`) + **`floor-v6-R15.diff`** (5 files, +12/−10) = `floor-v6.patch` (`cmp`). The 87th file is `auth-shell.vue`, which floor v5 does not touch |
| owner rulings | **None.** `audit/INBOUND.md` still ends at O-98. `FORMATION-PROGRESS.md` records no ruling on Q-1, Q-3, Q-11 (either clause), Q-12, Q-13 or Q-14 (its last lines are the D5 pass-3 and D4 pass-5 banks, re-read at 22:01). The P6-4 defaults apply: Q-1 (a), Q-3 (a), Q-11 (a) for chrome with content REPORTED, Q-14 (a), Q-12 (a), Q-13 (a). Floor v5 already builds every default, so **no variant is selected**: `pass-4/fv3/q1c.*` and `fv3/q11b.*` stay unapplied (both re-read over floor v6 as injections, §5.3), and nothing is built for an owner option. Q-14 (b) was not ruled, so R-2's deletion is not built and row 12 is not re-read |
| engines | Chromium 149, Playwright's headless shell with no launch arguments, for every cell. The moving-field windows relaunch with `CHROMIUM_FIELD_ARGS` under `lib.mjs`'s `GPU-WITNESS: M-2m · ../pass-6/H6.md` line (`fv6-run-chromium.log`: "chromium relaunched for the moving-field windows"); LAW PASS 53 reads it. **Playwright WebKit 26.5**: the battery, the plants, R-12's probe and the red-cell re-runs, each under `guarded --exclusive webkit`. **Every real-Safari cell: UNMEASURED (owner's safaridriver checkbox)** |
| records | `FV6-records/` (`phases.log` carries each phase's time and load; `wk-admission.log` the WebKit admission); `FV6-run.sh` (every command, by phase, the re-seat's phases `battery-cr`, `wk-battery`, `witnesses`, `readings`, `plants-read`, `rerun-cr`, `rerun-wk` included); `floor-v6-exact.json`; `floor-v6-R15.diff` |
| fences | No tracked source edited in the checkout. No git write in the checkout beyond `git worktree add` / `remove` for `.claude/worktrees/bl/D3/p7/floor6/wt`. Patch swaps happened only in that worktree, each checked with `cmp` or a clean `git status`. Builds, captures and caches lived in `$W/.d3out` and `$W/.cache-fv6`. The only writes in the checkout are under `docs/tranches/BL/design/material/pass-7/`. Nothing ran in a sibling repo. **Worktree removed and `.claude/worktrees/bl/D3/p7/floor6/` removed** (`phases.log` teardown 00:35:33-00:35:43; `git worktree list` no longer prints it). The empty `p7/` parent is H7's (H7 §5) |
| machine law | Every build, capture, probe and the toolchain ran through `~/.claude/guard/guarded`, and static reads and witness reads through `--light`. One heavy run at a time. Each WebKit admission was queued only after the seat's Chromium phases ended. The `rerun-wk` admission waited 50 min behind other repos' WebKit runs (queued ~23:45, admitted 00:35:05) and was not cancelled. vitest ran with `--maxWorkers=2`. The kernel-zone refusal never fired. Loads 5.4 to 25.1 over both seats (`phases.log`). **The first seat's one slip:** in its first static attempt the guard prefix did not split under zsh, so HOV, LIT and the census ran bare for under a second each, with no browser. Every static record comes from the guarded re-run (20:25:35-20:26:14) |

Short citations: `Reg` (`REGISTRY.md`, the Pass 6 part), `H7` (`pass-7/H7.md`), `FV5` (`pass-6/FLOOR-V5.md`), `Crit` (`pass-6/D3-critique.md`).

---

## 1 · R-15: the hunks (`floor-v6-R15.diff`, comments only: no value, name, selector or markup moves)

R-15 (i) names three sentences. H7-2 found two more on floor v5's bytes (H7 §2.2), and P6-6.2 gives those to this seat ("any further sentence H7-2 finds"). Each sentence now says what floor v6 does, and none names a deleted mechanism.

| file (floor v6 line) | was | now | why |
|---|---|---|---|
| `src/components/dock/README.md:20` | "`GlassDock` owns the plate, orientation, collapse state, overflow, and backdrop mode." | "… owns the plate, orientation, collapse state, and overflow." | R-15 (i): `backdropMode` and `data-backdrop-mode` are floor v5's deletions |
| `demo/stories/dock/dock-search.vue:197-199` (an HTML comment in the template) | "The search field aperture rides the morph; adaptive tinting keeps its text contrast at or above 4.5:1." | "… rides the morph; the field reads the floating rung at the bound, which keeps its text contrast at or above 4.5:1." | R-15 (i): R-10's own wording in `search.css:38-39` ("The field reads the floating rung at the bound") |
| `demo/stories/substrates/glass-material.vue:4-7` | "the three SOTA folds (squircle, chromatic fringe, adaptive tint) ride that grammar behind capability checks and tokens … the specular + rim + folds read" | "the squircle fold rides that grammar behind a capability check, and the veil's one pole, `--card`, carries any tint … the specular + rim + squircle read" | R-15 (i): name the folds the story paints. It paints one, the squircle ("Squircle corners (Chrome 139+, progressively enhanced)", :316). The adaptive tint is floor v5's deletion. The chromatic fringe retired before HEAD (`surfaces.css:3`, `glass-fx.css:125`), and the story's own section says "no painted fringe at the edge" (:340). The tint clause is the story's own "one chromatic writer on its body: the veil's pole, --card" (:340) |
| `src/styles/glass/overlay-plate.css:271-272` | "There is no adaptive-tint layer and no `--select-plate-alpha` solidity knob: the veil already paints…" | "There is no second tint layer and no solidity knob of its own: the veil already paints…" | H7-2 (word form, kebab): the sentence was true but stated the deletion by its name. HARNESS §4's convention is to state a deletion without the name. `--select-plate-alpha` also comes off: it appears on floor v5's removed lines and nowhere else in the tree (§2) |
| `demo/stories/compositions/auth-shell.vue:209-210` (untouched by floor v5) | "the panel is not a glass surface and cannot inherit the glass backdrop bucket" | "the panel is not a glass surface, so no glass rung's bound covers its ground" | H7-2 (the derived declaration): `GlassBackdropBucket` is an export floor v5 removes. Glass ink holds through the bound, and the panel's fixed bright aurora is outside it, so the panel pins its ink |

`fv5fix`'s wording (H7 §2.2) was a fixture. These are the seat's words. Three follow R-15 (i)'s instruction, and two use the convention. No owner option has been ruled, so no other hunk exists: floor v6 is floor v5 plus these five comments.

---

## 2 · The declaration, built from the patch (R-15 (iii))

`declare-removed.mjs --patch floor-v6.patch --root <floor v6> --concepts harness/deletes-floor.json --exact pass-7/floor-v6-exact.json` (`FV6-records/declare-floor-v6.{json,log}`):

- **182 identifiers** on the removed `src/` and `demo/` lines. **55 are absent from floor v6 and declared**: H7's 54 on floor v5, plus `--select-plate-alpha`, which floor v5 left named in the one overlay-plate sentence. The 8 hand concepts of `deletes-floor.json` (`earned darken`, `darkened by whatever`, `luma read`, `backdropLuminance`, `--glass-backdrop-luma`, `backdropMode`, `backdrop mode`, `adaptive tint`) make **61 names**.
- **127 are still named**, each listed with `file:line`. Every one was checked for a use on a non-comment line of `.ts`, `.vue`, `.css` or `.js` (`present-ruling.log`). **123 are live code.** Four are named only in comments, and none is this patch's deletion. `--control-ring`, `--glass-blur-dock` and `--glass-plate-dock` retired before HEAD, and HEAD's own comments already say so (`control-bit.css:111`, `bridges.css:354`, `glass.css:170` at HEAD). `--token` is a documentation placeholder (`Blob.vue:24`). All four stay. The regex's false candidates (`the`, `write`, `live`, `shared`) are ordinary words, listed as present and not declared.
- **Three exact-only rulings** (`floor-v6-exact.json`). DEL ran first with none (`del-fv6-noexact.log`: FAIL 3/61, 11 hits), and each hit was read in context:

| name | its word-form hits | ruling |
|---|---|---|
| `--glass-backdrop` | `animations.css:267` "Glass backdrop — blur + dim", heading the live `::backdrop` rules of `showModal()` dialogs | exact only: a live thing, not the deleted bucket token |
| `backgroundCanvas` | `constellation.vue:365` "mounts a constellation background canvas" | exact only: the live constellation canvas, not the deleted prop |
| `compositeOver` | 9 sites of "composited over" / "composites over" (`presets.ts:296`, `PagerDots.vue:28`, `pager-dots/README.md:24`, `useRouteTransition.ts:126`, `view-transition.css:253`, `aurora-hero.ts:312`, `story-hero.css:39-40`, `toc-tracking.vue:110`) | exact only: ordinary compositing prose about live layers, not the deleted helper |

These are H7's three proposals, adopted as this seat's rulings after reading each hit. Each identifier's exact spelling stays declared, and DEL reads 0 for it on floor v6.

---

## 3 · Static checks (`FV6-records/static.log`, 20:25:35-20:26:14, load 23.6 → 18.8)

| check | floor v6 (fixture) | plant or bite |
|---|---|---|
| **DEL under H7-2**, the patch-built declaration | **PASS 61**, 0 hits over 835 text files (`del-fv6.log`) | **floor v5 under the same declaration: FAIL 6/61, 8 hits in 5 files** (`del-fv5-plant.log`): `README.md:20` (`backdropMode`, `backdrop mode`, `data-backdrop-mode`), `dock-search.vue:197`, `glass-material.vue:5` and `overlay-plate.css:271` (`adaptive tint`), `overlay-plate.css:272` (`--select-plate-alpha`), `auth-shell.vue:209` (`GlassBackdropBucket`). These are exactly the five sentences of §1. H7 read 5/60, 7 hits. The sixth row is the token this rewrite removed from the tree, now declared, in a sentence already counted |
| DEL under `deletes-floor.json` alone | PASS 8 (`del-floor-fv6.log`) | H7: floor v5 FAIL 3/8 |
| LAW | **PASS 53** (`law.log`; the harness and `pass-6/`, `pass-7/`) | the H6/H7 self-tests' plants |
| census | `stacked=0 halo=0 blur=0 open=0`, exit 0 (`census-fv6.log`) | **HEAD, the 10.1.0 source: `stacked=2 halo=2 blur=5 open=9`, exit 1** (`census-head.log`), R-5's bite exact |
| HOV | **PASS 58** (`HOV-fv6.log`) | — |
| LIT | REPORTED, `halo=5 near=1 stacked=10 chain=3 open=19 frames-halo=0/0`: the 19 inherited, none added (FV5's reading) | — |
| ladder `diff` | `diff radii-fv6 radii-minor4` prints nothing, exit 0. `diff radii-fv5 radii-fv6` prints nothing | `diff radii-head radii-minor4` exit 1 (HEAD 10/14/16/20/22 against 6/10/12/18/20) |

---

## 4 · The byte-identity proof (P6-2.2, thin builds): the specimen is identical, the dist-demo is not

Floor v6 and floor v5 were each built by `harness/build.mjs --demo` (the specimen app and the dist-demo) in one worktree, one after the other, first under their own labels (`bytes.log`) and then under one label (`same.log`, 20:28:00-20:28:19, load 10.9 → 9.6). The first pass differed in the specimen `index.js` only through two `//#region` comments that print the build label's path, which is why the second pass uses one label.

| output | floor v5 against floor v6 (one label) | floor v6 against floor v6, rebuilt |
|---|---|---|
| **specimen dist** (`index.html`, `index-*.js`, `index-DyuSrJvX.css`) | **`diff -rq` exit 0: byte-identical.** CSS 391,121 B, sha256 `347288745da7cf97…` in both (`same-fv{5,6}-dist.sha256`) | exit 0 |
| **dist-demo** (345 files) | **not byte-identical**: `diff -rq` exit 1, 223 lines | exit 0 (deterministic) |
| dist-demo, Vite's 8-character chunk hashes normalised | 338 files each, **4 differ**: `auth-shell` JS and CSS, `dock-search` JS and CSS | — |
| dist-demo, chunk hashes **and** Vue scoped ids (`data-v-<8 hex>`) normalised | **0 of 338 differ** | — |

**What moved.** In production, `@vitejs/plugin-vue` hashes each SFC's source into its scoped-style id. `auth-shell.vue`'s comment sits inside `<style scoped>`, and `dock-search.vue`'s inside its template. Both files carry scoped styles, so the attribute name changes (`data-v-3882c389 → data-v-ac2ef11c`, `data-v-9e84ffec → data-v-950040ff`) in their JS and CSS. No value, selector shape or DOM moved, and the template comment itself is stripped. Any edit to either file moves its id, and R-15 (i) mandates the `dock-search.vue` edit, so no wording of R-15 can keep the dist-demo byte-identical.

**The rule applied: the full battery in both engines.** P6-6.2 step 2 reads "If they are not, it runs the full battery in both engines." The first seat ran targeted re-reads instead and left that departure to the critic. **The re-seat ran the battery as pass 6 did** (§5), so no departure stands.

---

## 5 · The full battery on floor v6 under H7, both engines

### 5.1 · Runs and loads (`phases.log`, `wk-admission.log`)

| run | when | load (1-, 5-, 15-min) |
|---|---|---|
| Chromium battery (`battery-cr`) | 22:02:54 → 22:20:47 | 14.8 at start; capture 70 cells, 4 live, 4 motion, 2 drift windows in 872 s (load 11.6 / 13.0 / 11.2 at its end); 11.4 at the end |
| WebKit admission (`wk-battery`) | queued 22:20:54, admitted 22:22:35; battery 22:41:23; FV3 plants 23:06:45; FV2 plants 23:17:36; demo probe 23:17:37 | 10.3 at admission; WebKit capture 70 cells, 4 live, 4 motion, 2 drift windows in 892 s (load 21.2 / 15.5 / 12.9), **retired and relaunched once at 60 page loads** (H3-1); 5.7 at the end |
| witnesses, baseline, diff (`--light`) | → 23:30:04 | 7.7 |
| readings | 23:30:20 → 23:32:27 | 7.5 → 21.1 |
| plant reads | 23:32:32 → 23:36:54 | 23.2 → 19.8 |
| Chromium re-runs ×2 (`rerun-cr`) | 23:37:03 → 23:44:03 | 20.6 → 11.3 |
| WebKit re-runs ×2 (`rerun-wk`) | queued ~23:45, **admitted 00:35:05** (50 min behind other repos' WebKit runs), ended 00:35:22 | 8.9 → 7.6 |

### 5.2 · Per witness, engine and theme (`baseline-fv6.md`), and the diff against floor v5's

**`diff pass-6/FV5-records/baseline-fv5.md FV6-records/baseline-fv6.md` prints 8 lines (exit 1), two rows:**

```
9c9
< | M-3 | FAIL 7/177 | PASS 177 | FAIL 2/177 | PASS 177 |
---
> | M-3 | PASS 177 | PASS 177 | FAIL 2/177 | PASS 177 |
23c23
< | W-E | FAIL 25/220 | FAIL 20/220 | FAIL 22/220 | FAIL 20/220 |
---
> | W-E | FAIL 20/220 | FAIL 20/220 | FAIL 22/220 | FAIL 20/220 |
```

- **M-3, Chromium light: FAIL 7/177 → PASS 177.** This is H7-1's reader, the move H7 §3 predicted from the banked records (only the 7 light Close-ring rows, FAIL → PASS). The pixels did not move: the specimen dist is byte-identical (§4).
- **W-E, Chromium light: 25 → 20 of 220.** W-E is a banked family, not one of the 44 rows (FV5 §4.2: "Banked families as H6: W-B, W-C, W-D, W-E, W-F, W-G (not rows)"). It reads a moving-field window on byte-identical input, so the change is the window's run-to-run variation, not floor v6. No row reads it.

Every other cell of all four columns equals floor v5's. Whole run, gate Chromium (`fv6-run-chromium.log`; `fv6-witnesses.log`): RAW 48 · M-1 11 · M-1x PASS 1 (REPORTED) · M-2 938 · M-2m 430 · **M-2h FAIL 2/68** (the two halo legs, N-3's, attributed) · **M-3 PASS 354** · M-4 168 · M-5 20 · **M-6 FAIL 29/120** (Q-1's row) · M-7 8 · M-8 8 · M-9 20 · O-66 5 · STACK 24 · W-A 216 · W-S 24 · T PASS · LIT REPORTED · HOV 58. The WebKit run's whole-run summary (`fv6-run-webkit.log`) differs from FV5's in the same two lines and no other.

### 5.3 · Owner options on the floor v6 capture (`readings.log`)

`diff` of the verdicts against `pass-6/FV5-records/readings.log` prints nothing (exit 0).

| reading | Chromium · Playwright WebKit |
|---|---|
| M-6 `--q1 a` | **PASS 88 · 88** |
| M-6 `--q1 c` | FAIL 2/96 · 2/96 |
| M-1x `--q11 b` | FAIL 12/21 · 12/21 (floor v6 builds (a)) |
| W-A `--q11 b` | FAIL 1/216 · 1/216 |
| M-9 | PASS 20 · 20 |
| **`var-q11b`** (the (b) variant over floor v6) | M-1x `--q11 b` **PASS 21 · 21**; M-1 PASS 11 · 11 |
| **`var-q1c`** | M-6 `--q1 a` PASS 88 · 88; `--q1 c` FAIL 2/96 · 2/96 |

### 5.4 · Every plant re-planted over floor v6 (row 19; `plants/readings.log`, `plants.log`, `floor-plants.log`)

**`diff` of the verdicts against `pass-6/FV5-records/plants/readings.log` prints nothing** (`plants-diff-fv5-fv6.txt`, exit 0). Every R plant and floor plant reds, in both engines unless named:

| plant | witness | floor v6 (Chromium · Playwright WebKit) |
|---|---|---|
| R-1 `plant-R1` | M-4 dark | FAIL 7/84 · 7/84 |
| R-2 `plant-R2` | M-9 dark | FAIL 1/10 · 1/10 |
| R-3 `plant-R3` | O-66 | FAIL 6/6 · 5/6 |
| R-4 `plant-R4` | O-66 | FAIL 3/3 · 3/3 |
| R-5 | census on 10.1.0 | `stacked=2 halo=2 blur=5 open=9`, exit 1 (§3) |
| R-10 / R-15 | DEL | floor v5 FAIL 6/61 (§3) |
| R-11 | ladder `diff` | HEAD exit 1 (§3) |
| R-14 | M-3 (H7-1) | HEAD's ring 1.88, α 0.40 2.49, 1 px outline 1.87, all FAIL (H7 §2.1) |
| the bound, `plant-bound` | M-2 ladder, dialog | FAIL 110/298 · 110/298 |
| FL-7 `plant-heldfloor` | M-2 held | FAIL 20/72 · 20/72 |
| FL-14 `plant-carrierveil` | M-2 held | FAIL 50/72 · PASS 72 (WebKit paints no carrier filter, as pass 5 and FV5) |
| FL-15 `plant-darkperim` | M-3 dark | **FAIL 47/87 · 47/87**, now read live under H7-1 (H7 §3 predicted no change) |
| FL-14 `plant-noisolation` | M-2 held · STACK | FAIL 14/28 · 14/28 · STACK FAIL 8/12 · 8/12 |
| `risk-opaque-ancestor` | M-2 held | FAIL 4/28 · 4/28 (a risk reading) |
| `plant-q1c-noroom` | M-6 `--q1 c` dark | FAIL 2/24 · 2/24 |
| `diag-held-noveil` (Chromium only) | M-2h | FAIL 2/48, as FV5 (N-3's diagnostic, not a plant) |
| `probe-R2-35` (a read) | M-9 dark | PASS 10 · FAIL 1/10, as FV5 |

### 5.5 · Red cells re-run twice

| red | run 1 | run 2 | reading |
|---|---|---|---|
| Chromium M-2h, M-3, M-6 on held, ladder, dialog over black, white, aurora, paper (`rerun-cr.log`) | M-2h FAIL 2/68 · M-3 FAIL 16/192 · M-6 FAIL 7/30 (23:40, load 9.4-10.2) | the same (23:44, load 11.3-12.7) | **M-3's 16 are all `MISSING … not captured`** rows for cells the re-run leaves out (FV5's re-run read 20: these 16 plus its 4 Close rings). The Close ring reads **p05 3.52, min 2.66, cols 3 (full-coverage column 852)** in both runs. M-2h's 2 are N-3's halo legs, M-6's 7 are Q-1's stepped text, each equal to FV5's re-runs. **No red is load-borne** |
| Playwright WebKit M-3 light checker ladder (`rerun-wk.log`) | FAIL 2/16: `floating·ring:well` 2.83, `overlay·ring:well` 2.96, cols 74 (00:35:14, load 8.1) | the same values (00:35:22, load 7.6) | reproduced at low load. Straight-run rings, which H7-1 does not read; H6, FV5 and H7 §3 read the same two. WebKit is informational for M-3 (gate Chromium) |
| Playwright WebKit R-12 demo probe | FAIL 2/2, `page.waitForTimeout: Page crashed` in both themes (`demo-fv6-webkit.log`) | — | H-14's crash class: the unshimmed probe crashes on `GlassDock`, as FV5 §4.1 recorded on floor v5 and floor v4. It is not a reading of floor v6 and was not re-run |

### 5.6 · H7-1's M-3 re-read and R-12 on floor v6's own bytes (the first seat)

- **M-3, fresh dialog capture** (`m3-capture-1.log`, `m3-fv6-1.txt`; 20:35:27-20:37:13, load 13.3 → 9.8): the Close ring reads **p05 3.52, min 2.66, cols 3 (full-coverage column 852)** on all 7 light grounds and 5.03 on all 7 dark, PASS 42. The full battery's M-3 (§5.2) and the re-runs (§5.5) read the same, so three captures agree. This is R-14's reader on the raw PNGs of fresh captures, and it reproduces H7's re-score to the digit.
- **R-12 in Chromium on floor v6's own demo** (`demo-cr.log`, `demo-cr2.log`): `FV5-demo-probe.mjs` PASS 2/2 (pointer on row 1 → highlighted [1], painting [1]; on row 0 → [0], [0]; light `oklch(0.53 0.124 69.6 / 0.12)`, dark `oklch(0.813 0.109 78.2 / 0.12)`). `crit-demo-probe.mjs` (P, K, L legs) PASS 2/2 twice, ink `rgb(28, 25, 23)` light and `rgb(233, 230, 226)` dark, the same values as floor v5's demo beside it. The one frame pair that differed in run 1 (a crop taken 700 ms into the morph, 212 px against 256 px) is byte-equal in run 2, so it was the morph's timing (`frames-pixdiff.log`, `frames-run2/`).

---

## 6 · Toolchain (`FV6-records/toolchain.log`, the first seat)

| step | result | when, load |
|---|---|---|
| `vue-tsc --noEmit` | exit 0 | 20:46:06, 8.5 |
| `vue-tsc --noEmit -p tsconfig.test.json` | exit 2 when run before the library build: `FourierField.smoke.test.ts:18-19`, `Cannot find module '@mkbabb/glass-ui/fourier-math'`, a package self-import that resolves through `dist/` (`tsc-test.log`). **Re-run after the library build: exit 0** (`tsc-test-2.log`). FV5 ran it after the library build | 20:58:45 (5.4); 21:09:21 (11.5) |
| `vite build` (library) | exit 0 | 21:04:52, 8.5 |
| `vite build`, the dist-demo config | exit 0 | 21:06:20, 9.0 |
| `vitest run --maxWorkers=2` | **237 files, 2318 passed, 0 failed**, 10 expected-fail, 1 skipped (FV5 and Crit: 2318) | 21:08:31, 12.5 |

---

## 7 · The 44 rows (floor v6; defaults applied, no variant selected)

| # | row | status | evidence | closes on |
|---|---|---|---|---|
| 1, 2, 4, 5, 7, 8, 10-19, 21, 22, 24 | RAW, M-1, M-2, M-2m, M-4, M-5, M-7, M-8, M-9, T, release, O-66 G2, O-66 G3, W-A, engines, plants, FL-13, O-87, STACK | **PASS** (19) | **read on floor v6 in both engines** (§5.2): every verdict equals FV5's. Row 19: every plant reds, `diff` against FV5's plant verdicts empty (§5.4), and DEL's plant reds (§3). Row 22: census 0 with its 10.1.0 bite exact, LIT inherited only (§3). Release: toolchain green (§6) | — |
| 3 | M-1x | OPEN | REPORTED under (a): content grey off paper (wash over black `#e2dcd7`, L 0.898, C 0.0095). `var-q11b` M-1x 21/21 in both engines on floor v6 (§5.3) | **owner, Q-11 chrome clause.** (a) closes it by its text, with no build. (b) selects `pass-4/fv3/q11b.*` |
| **6** | M-3 | **PASS** (was OPEN) | R-14 built as H7-1 with its plants red and its bite held (H7 §2.1; FL-15's plant FAIL 47/87 read live, §5.4). Floor v6's light Close ring reads **3.52 at its full-coverage column on all 7 light grounds** in three captures (§5.5, §5.6). M-3 Chromium **PASS 354** in the full battery (§5.2) | — |
| 9 | M-6 | OPEN | stepped 29/120 (re-run twice, 7/30 each, as FV5); `--q1 a` **PASS 88/88** in both engines (§5.3) | **owner, Q-1.** (a) closes it by selection, with no build |
| **20** | prose sweep | **PASS** (was OPEN) | DEL **PASS 61** under the patch-built declaration with word forms (§2, §3). **Plant: floor v5 FAIL 6/61, 8 hits in 5 files** | — |
| 23 | gestalt, O-62 frame | OPEN | light: cream over paper; wash, quiet and resting one paint (Q-1); content grey off paper (Q-11). Dark: the focus veil's 40 % dim reads as a smudge on the aurora's focus spot (−0.226, 9.1×; Reg P6-4). R-15 changes no specimen pixel (§4) | **owner: Q-11 content clause, Q-3 and Q-14**, with the frames (Reg P6-4) |
| FL-1..FL-11, FL-13..FL-16 | the floor | **PASS 15** | read on floor v6 in both engines (§5.2), floor plants red (§5.4). FL-15's `plant-darkperim` M-3 dark FAIL 47/87 under H7 | — |
| **FL-12** | prose sweep of every touched file | **PASS** (was OPEN) | as row 20. All 87 touched files are inside DEL's scope, and so is every untouched `src/` and `demo/` file | — |
| N-1 | Q-1's ruling built | OPEN | (a) built; (c) is `pass-4/fv3/q1c.*` (`var-q1c` FAIL 2/96 on its room, §5.3) | **owner, Q-1** |
| N-2 | Q-11's ruling built | OPEN | (a) built; (b) is `pass-4/fv3/q11b.*` | **owner, Q-11 chrome clause** |
| N-3 | the dock's held halo | PASS (attributed), both themes | M-2h 2/68 the two halo legs, re-run twice (§5.5); `diag-held-noveil` as FV5 (§5.4) | — |
| N-4 | the minor split's W-0.1 reading | PASS | Reg P6-3; the minor v5 seat re-reads it | — |

**Count: 39 PASS, 5 OPEN = 0.886** (floor v5: 36/44). **Closed by this seat: rows 6, 20 and FL-12.** Row 6 closes on R-14's reader over floor v6's own pixels. Rows 20 and FL-12 close on R-15, with DEL gated on the patch's own declaration and floor v5 red. **The route owns no open row.** **The five open rows wait only on the owner**, and each closes from the ruling sheet (Reg P6-4) with no build under the defaults:

| ruling | closes |
|---|---|
| Q-1 (a) | 9, N-1 (by selection; (c) has a failing room and no reading) |
| Q-11 chrome (a), or (b) by selecting `fv3/q11b.*` | 3, N-2 |
| Q-11 content clause, Q-3 and Q-14, on the frames | 23 |

Pass 7 can be clean on floor v6 only if those answers arrive before the critic and the critic confirms rows 6, 20 and FL-12 (Reg P6-6.3).

---

## 8 · Owed and handed on

| item | to | why |
|---|---|---|
| R-14's reader against raw PNGs, and its plants re-captured | the critic | §5.5 and §5.6 read three fresh captures, and the plants were read from banked pixels (H7 §2.1) |
| this seat's three exact-only rulings and the four comment-only present names | the critic | §2 |
| W-E's Chromium light count, 25 → 20 on byte-identical specimen input | the critic, informational | §5.2; a banked family, not a row |
| `overlay-plate.css:271-273` | the minor v5 seat | floor v6 rewrites lines 271-272 here. The minor v4 also carries this file, and R-16 (i) rewrites its 272-273. The minor ships from its own tree (P5-3.3), so the floor's wording does not land through the minor. The minor v5 seat states its own sentence without the names (`adaptive-tint`, `--select-plate-alpha`) if H7-3's declaration or a minor-side H7-2 run reads them |
| R-12 in Playwright WebKit | none possible in this harness | H-14: the unshimmed probe crashes the page (§5.5) |
| `FV6-run.sh toolchain` runs the test typecheck before the library build | the next seat that re-runs it | §6; `tsc-test2` is the corrected step |
| the owner rulings Q-1, Q-3, Q-11 (both clauses), Q-14 | the owner | rows 3, 9, 23, N-1, N-2 |

To reproduce: `git worktree add --detach .claude/worktrees/bl/D3/p7/floor6/wt HEAD`, link `node_modules`, `git apply pass-7/floor-v6.patch`, then `FV6-run.sh` phases `declare static build bytes same demo-cr m3 toolchain tsc-test2 demo-cr2 check battery-cr`, then `guarded --timeout 90 --exclusive webkit -- bash FV6-run.sh wk-battery`, then `witnesses readings plants-read rerun-cr`, then `guarded --timeout 30 --exclusive webkit -- bash FV6-run.sh rerun-wk`, then `teardown`.
