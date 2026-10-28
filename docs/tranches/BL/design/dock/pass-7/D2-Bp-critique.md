# D2-B′ critique, pass 7: the hole is shorter, and Playwright WebKit still shows it

| field | value |
|---|---|
| seat | D2 pass 7, fresh adversarial CRITIC of D2-B′. Authored nothing in D2 · model `claude-opus-5-5`, asserted from own system identity · two entries: entry 1 (2026-10-27 19:26 → about 20:30, interrupted by a session restart and a reboot before it returned) and entry 2 (21:37 → 23:30, this file) |
| base | HEAD `fdea480e7` + `pass-6/floor-v5.patch` (sha256 `cba6bdc2…`) + `pass-7/D2-Bp-proto.patch` (**`184a9715…`**, the prototype's stated hash). All re-hashed in entry 2 (`records/resume-verify.log`). No floor v6 |
| entry 1 kept | entry 1 ran at HEAD `80e5bdeb9`. `git diff --name-only 80e5bdeb9 fdea480e7 -- src demo tests package.json docs/design scripts …/dock/harness …/pass-2 …/pass-3` is empty. Before removing the stale worktree, this seat hashed its patched tree (1,127 files); the re-created worktree at `fdea480e7` + floor v5 + B′ hashes the same (`11439549…`, per-file lists equal). A fresh build `bpv` of the new tree hashes to **`3131ccdd…`, equal to entry 1's `bp` build** (every file but `build.json`). So entry 1's three battery slots (Chromium light, Chromium dark, Playwright WebKit light) ran on the build under judgment, and their numbers stand. Entry 1's Playwright WebKit dark slot never ran (it was queued on the lock at the restart); entry 2 ran it, and every post-battery step |
| harness | H7 as landed, `lib.mjs` sha256 `2dd81a2a…` (unchanged). Adapter `pass-3/adapter-floor-v2.mjs` |
| owner rulings | O-103 (`audit/INBOUND.md`): Q-4 (c), Q-12 (b), Q-18 (a), Q-15 (a), Q-16 confirm, Q-17 (a); safaridriver **not granted**. No newer D2 ruling is cited by the prototype (through O-109), and none bears on the 38 rows. **The ruled digest is the score of record**, with the default beside it |
| engines | Chromium (Playwright's default headless shell, no GPU launch args) and **Playwright WebKit**, unshimmed. Playwright WebKit is not Safari. Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)** |
| records | `pass-7/D2-Bp-crit-records/`: `apply.log`, `build-*.log`, `resume-verify.log`; `battery/` (every stage log with load, re-runs, `json/`, `slots.log`, `chain.log`); `digest/` (`-p7crit`, `-p7crit-ruled`); `filmstrips/<engine>-<theme>/{main,rerun1,rerun2}/` (every FM strip + `FM.json`); `fmlow/` (B2 re-read + display-frame probe); `st-wd/` (the two Playwright WebKit dark ST cells re-read); `F7-bp/`, `PR-bp/`, `cost/`, `post.log`; `l1/` (the 12 frames + `sheet-l1.png`); `scripts/` |

## 0 · Verdict

| digest | 38 rows | first 36 | first 24 | open |
|---|---:|---:|---:|---|
| `cells.mjs --ruled` (mechanical) | 38/38 | 36/36 | 24/24 | — |
| `cells.mjs` default (mechanical) | 36/38 | 34/36 | 22/24 | P1, P3 (OWNER-BLOCKED, 0 red cells; both closed by O-103) |
| **critic, ruled, B2 read on the strips: the score of record** | **37/38** | **35/36** | **23/24** | **B2** |
| critic, default, B2 on the strips | 35/38 | 33/36 | 21/24 | P1 (OB), P3 (OB), B2 |

**ADVANCE, not CONVERGED.** The B′ order cure is real and large. In Chromium it holds: 0 casts of 18 show a hole over one frame, and the strips assemble in order. **In Playwright WebKit the hole remains.** Seat 2's slot (the "1", where the leaving "P" was) is empty for 2 consecutive 40 ms cast frames, with "H", "2" and "3" at full ink, in **6 of 36** Playwright WebKit reads of the three hole cells. That includes **load 9.59** (W·l `warm-expand`) and **13.83 / 13.85** (W·d, the low-load re-read). Each cell passes the digest only because H7-3's per-cell rule forgives one red of three. The class is not load-borne: it appears in both themes, on three different cells, in two independent seats (the prototype read 3 of 72). One of the six casts (W·d `first-expand`, main) shows the slot empty on **two different painted frames**, so this is not only a held frame (§2.2). §P6-7.5 makes B2 "read on the strips included", and the strips show a hole in the run. **B2 FAIL.** This is the one class the prototype itself declined to claim (B′-proto §0, §5); this seat confirms it.

The arm set is identical by construction (H5-6, H5-9, H6-10, H7-3). Light = main (W3 with faces, ST, R5, CF, L1, FM, W2, CASES) + rest (W1, W4-W8, R6). Dark = dark (ST, FM, W1, W3, W2, R5, CF) + darkrest (W4-W8, R6). Each runs in both engines, with FM's six B2 cells ×3 per run. Source rows: F7 and PR. L1's reference is `fv3` (HEAD + `pass-4/floor-v3.patch`, `637d1625…`). 655 cells.

| reported | value |
|---|---|
| R2 margin | worst first leaving drop **0.384** (C·l `swap-long`, load 14.67), **0.387** (C·d `retarget·40`, 25.75), **0.385** (W·l `swap-short`, 17.74), **0.385** (W·d, 21.91) against 0.5: **margin 0.113-0.116** (pass 6: 0.133-0.142; the prototype: 0.100-0.126) |
| boot graph | **503,389 B against 503,808 B, margin 419 B** (`F7-bp/boot-graph.txt`; pass 6: 589 B). Scene chunk `useDockScene-CWH9c6i2.js` 21,085 B. No ceiling raise, no split |

---

## 1 · How this seat ran

| slot | start → end | load start / end | cells' load (with re-runs) |
|---|---|---|---|
| bp · Chromium · light (entry 1) | 19:28:27 → 19:39:17 | 14.25 / 19.60 | 8.37-28.89 |
| bp · Chromium · dark (entry 1) | 19:39:17 → 19:50:18 | 19.60 / 18.05 | 15.94-29.98 |
| bp · Playwright WebKit · light (entry 1; lock wait inside) | 19:50:18 → 20:21:57 | 18.05 / 12.20 | 8.04-28.85 |
| bp · Playwright WebKit · dark (entry 2; re-queued after the reboot) | 21:40:27 → 21:52:20 | 16.62 / 23.30 | 16.83-25.54 |
| `fmlow` light, `--exclusive webkit` (queued at 14.71, lock wait 15 min) | 22:14:39 → 22:29:28 → 22:32:18 | admitted at **35.94** | 32.26-51.74 (the load gate holds at queue time, not at admission; recorded) |
| `fmlow` dark (lock wait 22 min) | 22:35:48 → 22:57:43 → 23:00:12 | 14.52 / 16.22 | 12.75-15.98 |
| F7, PR (`post.sh`) | 23:00:12 → 23:02:25 | 16.22 / 17.00 | 18.04-26.45 |
| cost, `bp` / `bp6` / `fv5` alternating, `--cpu-cores 0`, each started at ≤ 15 | 23:02:25 → 23:22:43 | — | 8.64-22.03 per cell (§4) |
| `st-wd` (two W·d ST cells ×2) | 23:23:03 → 23:23:40 | 10.38 / 15.17 | — |

Every run went through `~/.claude/guard/guarded`, one heavy run at a time. Browser runs were never `--light`; PR and the digest are source-only and ran `--light`. Playwright WebKit always ran under `--exclusive webkit`, queued and never cancelled. No slot split. No WebKit page close. No zone refusal. The reboot between entries was the machine's (entry 2 started at uptime 59 min); no run of this seat was cut by it.

**Red cells across the four battery slots** (each re-run twice in its slot; FM's B2 cells are re-run on every run by H7-3):

| cell | column | main | re-run 1 | re-run 2 | digest |
|---|---|---|---|---|---|
| W3 `lead-remove` [terminal 0.95 px after 0.36, bound 0.81] | C·d | FAIL (load 27.15 in the stage) | PASS | PASS | NOT-REPRODUCED |
| FM `film·warm-collapse` [hole 2] | W·l | FAIL, load 15.01 | PASS 1 (12.46) | PASS 0 (9.9) | NOT-REPRODUCED |
| FM `film·warm-expand` [hole 2] | W·l | PASS 0 (14.29) | PASS 1 (11.86) | **FAIL, load 9.59** | PASS (H7-3: one re-run red) |
| FM `film·first-expand` [hole 2] | W·d | FAIL, load 21.56 | PASS 0 | PASS 0 | NOT-REPRODUCED |
| FM `film·warm-collapse` [hole 2] | W·d | PASS 1 (20.55) | PASS 0 | **FAIL, load 17.3** | PASS (H7-3) |
| CASES `case·rotated` [jerk] | C·l, W·l | FAIL | — | FAIL | FAIL, **outside the 38** (as passes 5 and 6) |

The digest also leaves two Playwright WebKit dark ST cells UNMEASURED: `stall·2raf` (undefined collapsed rest) and `stall·nb·1raf` (missing marker, H6-4). This seat re-read them twice (`st-wd/`). Both are measured and PASS in both runs. `2raf` lands at 1,720 and 1,920 ms, video scale 1.002. On `nb·1raf` the plate is at worst −18.68 px from the neighbour (bound 0.5), and the worst step is ×0.74-0.78 of its bound. So R4 and R8 close in that column by this seat's own measurement.

---

## 2 · B2: the filmstrip gestalt

### 2.1 · H7-1 hole frames per cast (main · re-run 1 · re-run 2)

From `battery/*-FM-*.log` (`scripts/holes.sh`) and `fmlow/`. Each value is hole frames per cast; a **bold** value has a longest run of 2.

| column | first-expand | warm-expand | warm-collapse | swap-long, swap-short, content-add | load |
|---|---|---|---|---|---|
| C·l | 1 · 1 · 1 | 1 · 0 · 0 | 1 · 0 · 0 | 0 ×9 | 19.79-28.89 |
| C·d | 0 · 1 · 0 | 0 · 1 · 1 | 1 · 0 · 0 | 0 ×9 | 20.46-29.98 |
| W·l | 0 · 1 · 0 | 0 · 1 · **2** (9.59) | **2** (15.01) · 1 · 0 | 0 ×9 | 9.04-15.19 |
| W·d | **2** (21.56) · 0 · 0 | 0 · 0 · 1 | 1 · 0 · **2** (17.3) | 0 ×9 | 16.83-21.56 |
| W·l `fmlow` r1 · r2 · r3 | 0 · 1 · 0 | 0 · 1 · 0 | 0 · 1 · 0 | 0 ×9 | 32.26-51.74 |
| W·d `fmlow` r1 · r2 · r3 | 0 · 1 · 1 | 0 · **2** (13.83) · 0 | 0 · 1 · **2** (13.85) | 0 ×9 | 12.75-15.98 |

Every hole, of either length, is seat 2's slot at +80 to +160 ms. **Chromium: 0 of 18 hole-cell reads over 1 frame.** The H7 baseline (pass 6's B′) read 2-4 frames in all 36 battery reads; this is a large cure. **Playwright WebKit: 6 of 36 reads at 2 frames**, at loads 9.59-21.56. The prototype read 3 of 72, one at 13.55. `swap-*` and `content-add` read 0 everywhere.

The display-frame probe (`slotink.mjs`, a DOM model, enters no row, `fmlow/si-bp-webkit-*.json`, load 15.1-35.9): the longest empty run is 1-2 frames of about 10 ms on `first-expand` and `warm-expand` in both themes (2 frames in light r3 and dark r2), and 0 elsewhere. That is the prototype's structural empty frame, as it reported.

### 2.2 · The strips, read

- **Chromium light `first-expand`** (`filmstrips/chromium-main/main/`): "H P", "H P 2 3", "H ↄ 2 3 | Play Settin", "H ' 2 3 | Play Settings S" (a sliver tick, the H7-1 1-frame read at ink 0.035), then "H 1 2 3 …". In order. One near-empty tile, within the bound.
- **Chromium dark `swap-long`**: "A B" → "A Bols" → "A Bols Brushes" → "A Bols Brushes Layer" → "C Tools Brushes Layers D". In order, no empty slot. "Bols" is the soft partial ruled out of B2 in pass 7 (§P6-2).
- **Playwright WebKit light `warm-collapse`, main (load 15.01)**: tiles 4 and 5 read "H | _ 2 3", the "1" gone and the "P" not in, then "H P 2". Tiles 4-5 differ by mean 0.05 grey levels, the level of two rest tiles (0.00), so one painted frame was held for two cast frames.
- **Playwright WebKit light `warm-expand`, re-run 2 (load 9.59)**: tiles 4-5 read "H _ 2 3 | Play Settings Sc", with "Sc" cut at the same place (difference 0.09). Then "H 1 2 3".
- **Playwright WebKit dark `first-expand`, main (load 21.56)**: tile 4 reads "H ' 2 3 | Play Settings S" (the tick, ink 0) and tile 5 reads "H _ 2 3 | Play Settings Square" (fully empty). **The tiles differ (8.01)**: the plate moved and "Square" advanced between them. **The slot was empty on two distinct painted frames.**
- The other three 2-frame casts (W·d `warm-collapse` re-run 2, `fmlow` dark r2 `warm-expand`, r3 `warm-collapse`) are held frames (0.03-0.07), each "H _ 2 3".

(Tile differences: mean absolute grey difference of consecutive tiles, inset 4 px. Script `records/scripts/tilediff.py`, output `records/tilediff.txt`, over the strips in `records/filmstrips/` and `records/fmlow/`.)

**Reading.** The prototype's account is that one empty display frame is structural and that a 40 ms WebKit paint hold makes it two cast frames. That covers five of the six casts. It does not cover W·d `first-expand`, where the empty slot spans two different frames. Either way, the screen shows an empty slot inside the run for about 80 ms while both neighbours paint at full ink, at load 9.59-13.85 as well as above. That is the hole H7-1 defines and §P6-7.3 obligation 1 forbids ("no slot inside the painted run is empty for more than one display frame while the slots on both sides paint").

H7-3's rule (a PASS main reads FAIL only when both re-runs fail) and H6-7 (one red of three is NOT-REPRODUCED) exist to forgive load noise. This red is not load noise: the same seat, the same frame offset and the same picture recur across cells, themes and seats at the lowest loads measured. **B2 is open in Playwright WebKit. It is closed in Chromium.** No hard-cut partial glyph: stub 0 in every FM and W3 cell ×4, and the narrowest ramp is 8.8-9.1 px against the 2 px bound. Assembly is in order everywhere except the held or doubled empty frame.

---

## 3 · The 38 rows (ruled; default beside it)

From `digest/table-p7crit[-ruled].md` and `rows-p7crit[-ruled].md`, plus this seat's strip read (B2) and the `st-wd` re-read (R4, R8 in W·d). P = PASS.

| row | C·l | C·d | W·l | W·d | ruled | default | note |
|---|---|---|---|---|---|---|---|
| P1 | P | P | P | P | **PASS** | OWNER-BLOCKED (Q-12) | 42/42 per theme; Q-12 (b) |
| P2 | P | P | P | P | PASS | PASS | |
| P3 | P | P (NR 1) | P | P | **PASS** | OWNER-BLOCKED (Q-4) | every OB cell `window` alone, (c) holds; NR = C·d `lead-remove` [terminal] |
| P4, P5 | P | P | P | P | PASS ×2 | PASS ×2 | |
| F1-F6 | P | P | P | P | PASS ×6 | PASS ×6 | F6 0 crashes; W8 `consumer·*` UNMEASURED 12 (value.js fence), as every pass |
| F7 | source | | | | PASS | PASS | **13/13** this seat (`F7-bp/`): lib, demo, `vue-tsc` exit 0; 232 files, 2,241 tests, 0 failing; every gate (boot-graph 14/14, build arm 3/3) |
| N1-N5 | P | P | P | P | PASS ×5 | PASS ×5 | N3's `seat-transition` borderline did not appear; N5 with PR |
| R1 | P | P (NR 1) | P | P | PASS | PASS | H7's C·d `swap-long` [faces] reads 0 px |
| R2 | P | P | P | P | PASS | PASS | worst 0.384 / 0.387 / 0.385 / 0.385, bound 0.5 (§0) |
| R3, R5, R6, R7 | P | P | P | P | PASS ×4 | PASS ×4 | R6 splice 0, sliver 0, stub 0 |
| R4 | P | P | P | P | PASS | PASS | ST 5/5 per column; the W·d `stall·2raf` UM is closed by `st-wd/` ×2 |
| R8 | P | P | P | P | PASS | PASS | the W·d `stall·nb·1raf` UM is closed by `st-wd/` ×2 |
| B1 | P | P | P | P | PASS | PASS | |
| **B2** | P | P | **F** | **F** | **FAIL** | FAIL | digest PASS (two NR, two H7-3 forgiven). Strips: seat 2's slot empty for 2 cast frames in 6/36 Playwright WebKit reads, load 9.59-21.56 (§2) |
| B3 | source | | | | PASS | PASS | PR **6/6** this seat, `prose·harness` 0 |
| C1-C7 | P | P | P | P | PASS ×7 | PASS ×7 | |
| C8 | P | P | P | P | PASS | PASS | 10/10 presses mid-morph, 10/10 collapsed, 0 of 10 hovers failed, every column |
| C9 | P | P | P | P | PASS | PASS | expanded block 52 px (bound 52), 4 seats, smallest 44 px, every column |
| L1 | P | | P | | PASS | PASS | 6/6 per engine; frames read (§3.1) |

### 3.1 · L1: the O-87 lighting census, read from frames

The `l1/sheet-l1.png` contact sheet holds the twelve frames: two engines × light and dark × collapsed, expanded and in-flight. Every frame shows one soft shadow, a hairline edge and a flat fill. No rim, no glow, no gloss band, and no added lighting layer, on dark grounds as on light ones. Counts per frame: shadow 1 (collapsed) / 4, gradients 8, pseudos 8, blur 16 px, every one equal to `fv3`; 0 idle infinite animations. Flat, refined and deft, as O-87 rules. (Incidentally, the Chromium light in-flight frame catches seat 2 empty, "H _ 2 3", the structural frame, not a row of L1.)

---

## 4 · Obligations 2-4 (not rows; read for the record)

**Obligation 2.** Every pass-6 row holds (§3). The mask ramp holds (narrowest 8.8-9.1 px), there is no opacity write (stub 0), C8, C9, PR 6/6 and L1 hold, and R2 and R8 are inside their bounds.

**Obligation 3, cost** (`cost/`, `pass-2/D2-Bp-probes.mjs --arm pcost,plead`, Chromium traced; `bp`, `bp6` (pass 6's B′) and `fv5` alternating in one session). Each cell gives frames over 25 ms / max ms (load).

| cell | `bp` r1 · r2 · r3 | `bp6` r1 · r2 · r3 | `fv5` r1 · r2 · r3 |
|---|---|---|---|
| 4×, 20 seats, expand | 1/37.8 (10.0) · 0/21.6 (10.4) · 1/52.6 (12.8) | 0 (11.3) · 1/47.7 (14.8) · 1/48.7 (19.2) | 0 · 0 · 0 (9.9-12.2) |
| 4×, 40 seats, expand | 1/36.7 (10.0) · 1/43.9 (11.3) · 1/54.3 (12.8) | 1/44.2 (10.9) · 1/50.3 (14.8) · 1/52.2 (18.4) | 1/41.2 (10.6) · 0 · 0 |
| 4×, 20 seats, lead | 0/23.0 (9.2) · **2**/38.5 (14.2) · 2/45.3 (17.8) | 0 (9.0) · 1 (15.1) · 1 (21.2) | no lead morph |
| 4×, 40 seats, lead | 1/29.7 (9.0) · **2**/52.5 (14.1) · 5/62.6 (17.8) | 1/36.8 (8.6) · 2/44.8 (15.1) · 3/61.3 (22.0) | no lead morph |
| 1×, 40 seats | 0 (max ≤ 10.5) | 0 (≤ 11.2) | 0 (≤ 10.9) |

Expand at 20 and 40 seats reads at most one trigger frame in every `bp` run, as pass 6 did. **On lead, B′ is not held at one frame.** At load ≤ 15, `bp` reads 0-1 at loads 9.0-9.2 and 2 at 14.1-14.2. But pass 6's B′, in the same session at matched load, reads 1 at 8.6-9.0 and 2 at 15.1. The excess grows with load in both builds (r3 is above 15 for both and is not of record). So this seat cannot lay the extra lead frames on the pass-7 sweep: at matched load the two builds read alike. The prototype's "1, 3, 3" came from runs at 13.0-14.5. That differs by one frame from this seat's same-load reads and is consistent with a load-borne excess. Recorded; cost is not a row (§P6-3, Q-15 (a)).

**Obligation 4.** PR 6/6, `prose·harness` 0, readers 65, count 7 (0 wrong), partials 0, citations 0, rows 32.

---

## 5 · Next-pass defect classes (do not change the score)

| class | evidence | note |
|---|---|---|
| **B2 in Playwright WebKit: seat 2's slot empty for 2 cast frames** on `first-expand`, `warm-expand` and `warm-collapse`, both themes | §2: 6 of 36 reads, load 9.59-21.56; prototype 3 of 72 | the open row. Five casts are a held empty frame; one (W·d `first-expand`) is two distinct empty frames. The cure must leave no display frame in which the leaving unit has stopped painting and the arriving unit has not begun (the gap between the sliver cut and `REVEAL_GAIN`'s first step), so a WebKit paint hold has no empty frame to hold |
| H7-3 and H6-7 forgive a non-load-borne class one cell at a time | §1, §2 | the per-cell rule read B2 PASS while the class recurs at load 9.59 and 13.85 across cells and seats. A harness question for the pass after (a class read across cells), not a row this seat may add |
| `fmlow`'s load gate holds at queue time, not at admission (light admitted at 35.94 after a 15-min lock wait) | §1 | instrument fact; the dark run was admitted at 14.52 and is the low-load read of record |
| ST in Playwright WebKit dark: one undefined rest, one missing marker in the battery run | §1, `st-wd/` | both measured and PASS on re-read ×2; recorded instrument flake |
| W3 C·d `lead-remove` [terminal] 0.95 px after 0.36 (bound 0.81) | §1 | NOT-REPRODUCED (both re-runs PASS); the prototype recorded the same borderline on `c8` |
| 4× lead at 40 and 20 seats: 2 frames over 25 ms at load 14.1-14.2 | §4 | `bp6` reads the same at matched load; load-borne in both; not laid on the sweep |
| R2 margin 0.113-0.116 (pass 6: 0.133-0.142) | §0 | inside the bound in every cell; the sweep's late speed, as the prototype said |
| boot-graph margin 419 B (pass 6: 589 B) | §0 | the sweep, the lead rule and `dt` cost 170 B |
| soft partial glyphs ("ↄ", "Bols", "ɔls") | §2.2 | ruled not B2 in pass 7 (§P6-2); the owner's glance (§P6-6) stands |
| CASES `case·rotated` [jerk] C·l and W·l | §1 | outside the 38, as passes 5 and 6 |
| real Safari | everywhere | **UNMEASURED (owner's safaridriver checkbox)**; O-103: not granted |

---

## 6 · Fences, as kept

- Entry 2 read entry 1's records, verified its tree and build by hash (§ header), removed the stale worktree with `git worktree remove --force`, and re-added it at HEAD (`git worktree add --detach`). `node_modules` was a directory of per-entry symlinks into the checkout's (the checkout has no `tests-visual/node_modules`), so vite caches and F7's `dist*/` stayed in the worktree. Builds and outputs went under the seat dir's `out/`. Git writes: `worktree add` and `worktree remove` only.
- Writes to the checkout: this file and `pass-7/D2-Bp-crit-records/` only. No tracked file was edited.
- Every build, test and browser run went through `~/.claude/guard/guarded`, one heavy run at a time. Browser runs were never `--light`; Playwright WebKit ran under `--exclusive webkit`, queued and never cancelled (lock waits 0-22 min in entry 2). Each run used one browser with a fresh context per cell and closed everything in `finally` (the harness's runners). No browser MCP, no GPU args, no headed or real-Safari run. No WebKit page close; no zone refusal. Nothing under `~/.claude` was read.
- At the close, the worktree was removed (`git worktree remove --force`; `git worktree list` shows no `Bp-crit` entry). The permission check refused `rm -rf` on the seat directory, as it refused the pass-6 seats. **Owner's chore:** delete `.claude/worktrees/bl/D2/p7/Bp-crit/` (411 MB: `out/` builds and witness output, three hash lists). No record reads it, because every artifact cited above is under `pass-7/`. No process of this seat remains, and `git status` shows no tracked file modified by this seat (the modified `design/tile/harness/` files belong to another seat).
