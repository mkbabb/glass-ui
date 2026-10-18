# D3 · pass 9 · MINOR-SPLIT v7: minor v6 + R-23, byte-identical in paint

| field | value |
|---|---|
| seat | D3 pass 9, the minor split v7 (`REGISTRY.md` P8-6.2 step 3). A build, not a route: the tree 10.2.0's veil recut (W-0.1) and W-0.11's tokens would ship from. It builds R-23 on `pass-8/minor-split-v6.patch`, proves the specimen dist and the dist-demo raw byte-identical to the minor v6's, then runs H7-3 with the minor v7's declaration, H8-1 with H9 over the minor's own patch, R-21's frozen list (read line by line), the static checks and the toolchain. It runs no browser, because the bytes held |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | worktree `.claude/worktrees/bl/D3/p9/minor7/wt` cut at `d076d7dd6` (the floor v8 bank, docs only). `git diff --stat 1da7eb17b HEAD -- src demo tests package.json scripts tests-visual vite.targets.ts .bundle-ratchet .published-roster DESIGN.md docs/canon` prints nothing (`MS7-records/check.log`), so the base is the published 10.1.0 source every pass-6 to pass-9 seat measured. **`git apply --check minor-split-v7.patch` exits 0 at `d076d7dd6`**, in the worktree returned to HEAD and in the checkout (read only) |
| patch | **`minor-split-v7.patch`**: **61 files, +728 / −541** (`git diff --shortstat`), sha1 `3a7a8eec`. Composition, checked byte for byte: `pass-8/minor-split-v6.patch` (59 files, sha1 `4ea01c0e`) + **`minor-split-v7-R23.diff`** (9 files, +17 / −17, sha1 `0cf8056f`) = `minor-split-v7.patch` (`cmp`, `MS7-records/patch.log`). The two paths new to the minor are `tests/components/button/Button.test.ts` and `tests/gates/feedback-tint-seam.test.ts`. No `.vue` file is in the delta. Every edit keeps its comment's line count (`patch.log`), so no line below an edit moves. The edits are applied by `MS7-r23-edits.py` (each old string must occur exactly once) |
| owner rulings | **None.** `audit/INBOUND.md` still ends at O-98. `FORMATION-PROGRESS.md`'s D3 lines after the pass-8 close are the pass-9 launch (500), the H9 bank (502) and the floor v8 bank (503). None records a ruling on Q-1, Q-3, Q-11 (either clause), Q-12, Q-13 or Q-14. The P8-4 defaults apply: Q-1 (a), Q-3 (a), Q-11 (a) for chrome with content REPORTED, Q-14 (a). The minor builds no owner option |
| engines | none run. The bytes held raw (§3), so every paint verdict of the minor v6, and through it of the minor v5 and v4, carries (P8-2.2's thin-build rule): Chromium 149 gated, Playwright WebKit 26.5 paint-only, as read by MS4, MS5, MS6, the pass-7 and pass-8 critics and WK. **Every real-Safari cell: UNMEASURED (owner's safaridriver checkbox)** |
| records | `MS7-run.sh` (every command, by phase: `setup`, `edit`, `paths`, `check`, `trees`, `oldtrees`, `static`, `selftest`, `proposed`, `sweep`, `same`, `bite`, `toolchain`, `ratchet`, `law`, `teardown`), `MS7-records/` (`phases.log` carries each phase's time and 1-minute load), `MS7-r23-edits.py`, `minor-split-v7-R23.diff`, `minor-split-v7.patch`, `MS7-rulings.py` and `MS7-rulings.json` (R-21 (b)), `MS7-r21b-proposed.py`, `MS7-r21b-proposed.diff` and `MS7-rulings-proposed.json` (§4.3, proposed, not in the patch). Harness changed in place: `harness/deletes-minor.json` (39 → 42 names, and R-23's three site entries), `harness/deleted-mechanisms.mjs` (a value-arm site without `--patch` prints `not read`, §2.2), `harness/selftest.mjs` (H7-3's and H9-3's minor rows), `harness/HARNESS.md` (both, one line each) |
| fences | No tracked source was edited in the checkout, and there was no git write in it beyond `git worktree add` / `remove` for this seat's worktree. The edits and every patch swap happened in the worktree, each swap checked with `cmp` or a clean `git status`. Builds and caches lived in `$W/.d3out` and `$W/.cache-m7`; `.bundle-ratchet` was rebound in the worktree for one verifier run and restored. The only writes in the checkout are under `docs/tranches/BL/design/material/` (`pass-9/` and the four harness files). Nothing ran in a sibling repo |
| machine law | Every phase ran through `~/.claude/guard/guarded` as the literal command word: `setup`, `edit`, `paths`, `check`, `trees`, `oldtrees`, `static`, `selftest`, `proposed`, `sweep`, `ratchet`, `law` and `teardown` under `--light` (no browser, no build); `same` (`--timeout 60`), `bite` (`--timeout 30`) and `toolchain` (`--timeout 60`) as heavy runs, one at a time, no browser. vitest ran with `--maxWorkers=2`. No browser launched and no WebKit lock was taken. The kernel-zone refusal never fired. The 1-minute load ran 12.7 to 27.0 (`phases.log`). No red cell exists to re-run |

Short citations: `Reg` (`REGISTRY.md`, the pass-8 part), `H9` (`pass-9/H9.md`), `FV8` (`pass-9/FLOOR-V8.md`), `MS6` (`pass-8/MINOR-SPLIT-v6.md`), `Crit8` (`pass-8/D3-critique.md`). `§n` after them is their section.

---

## 0 · In brief

- **The build:** the minor v6 plus R-23, Crit8 §5.2's 11 sites in 9 files, comments and test comments only. Where floor v7 or floor v8 already rewrote a sentence's twin, the minor takes that wording, so the minor v7's `glass-deep.css` is now floor v8's byte for byte (`cmp` exit 0). No value, name, selector, assertion or markup moves (§1).
- **Byte identity holds raw in both outputs.** The minor v7, the minor v6, the minor v7 again and the minor v7 plus the proposed delta (§4.3) were built under one label in one worktree. The specimen dist (3 files) and the dist-demo (346 files) are identical by `diff -rq` and by sha256 list. Specimen CSS **398,432 B, sha256 `e11613c3eeb45cab`**, MS6's figure. The dist-demo matches pass 8's banked minor v6 list exactly. With the worktree path its `//#region` comments print rewritten to pass 8's, the minor v7 specimen JS hashes `929393c2…09664`, byte for byte the banked minor v6 `index-DP1ZxLyx.js`. The bite: HEAD built the same way differs in both outputs (§3).
- **H7-3 with the minor v7's declaration** (42 names, R-23's 3 sites): **minor v7 PASS 42**; minor v6 FAIL 2/42 at R-23's two declarable `src/` sentences; minor v5 FAIL 17/42; minor v4 FAIL 38/42 (§2.3).
- **H8-1 with H9 over the minor's own patch: minor v7 PASS 54**, 0 hits, every one of R-23's 3 site entries exempting a hit and none stale; `sheet/styles.css:197` prints `arm-true`. **The plant, the minor v6 under the same declaration and patch: FAIL 8 of 54**, at 11 lines in 8 files, all of them R-23 sites (§5).
- **R-21 (b): the frozen list prints 371 lines in 52 files on the minor v7. I read each one.** 359 are true; 10 are false and were already false at HEAD on lines the minor did not write, ruled "true as to the patch" and REPORTED for the landing docs pass (the floor seat's `dock.css:15` reading); **2 are false because of the minor**: `DESIGN.md:34` (its light law) and `surface-axis.css:21` (a sentence the minor's patch rewrote). Those two get no ruling, so `prose-sweep.mjs --rulings MS7-rulings.json` reads **`FAIL (2 unread, 0 stale of 371 lines)`**. They are not in the patch, which is R-23 as ruled; `MS7-r21b-proposed.diff` (2 files, +3/−3) rewrites them, and with it the list reads **`PASS (371 lines, each ruled true)`**, DEL PASS 54, and the bytes are still identical (§4).
- **Self-test:** **`SELFTEST PASS: 93 expectations met`**, 0 BAD (LAW 5, DEL 3, H7-1 12, H7-2 7, H7-3 17, H8-1 10, H8-2 2, H9-1 5, H9-2 9, H9-3 9, H9-4 6, H9-5 3, H9-6 5). The floor-tree rows did not run here; none of them reads DEL without `--patch`, so §2.2's change cannot move them (§2.4).
- **Static and toolchain:** LAW PASS 73, census `stacked=0 halo=0 blur=0 open=0` (10.1.0's styles exactly `2/2/5/9`), HOV PASS 58, LIT the 19 inherited, ladder `diff` to the minor v6 empty, the darken sweep unchanged at 46 lines. `vue-tsc` exit 0 on both projects, library build and dist-demo exit 0, vitest **239 files, 2321 passed, 0 failed** (MS6: 2321), R-23's three test files 34 of 34. Roster PRESENT 289 = 289, `terminal CLEAN` with the datum rebound in the worktree; the ratchet owes **+2,333 B**, MS6's figure to the byte (§6).
- **Shippability (§7):** every W-0.1 and W-0.11 gate verdict carries green, and R-23, P8-3.3's item 3, is built. 10.2.0 is still held by the entry gate (0 of 2 clean passes, and pass 9 cannot be clean while the sheet is unanswered), Q-11's content clause, the two R-21 (b) lines this seat proposes, the landing's own items, and D2 (O-88).

---

## 1 · The build (`minor-split-v7-R23.diff`)

The list is Crit8 §5.2's table, fixed (R-23): 11 sites in 9 files.

| # | site (minor v6) | was (the deciding clause) | minor v7 | basis |
|---|---|---|---|---|
| 1 | `DESIGN.md:1805-1806` | "(`--ink-seam` 0.08, `--ink-edge` 0.16, `--ink-perimeter` 0.48)" | "(`--ink-seam`, `--ink-edge`, `--ink-perimeter`, in ascending order)" | the minor's perimeter rung is 0.54 (`color-radius.css:154`); P-3, the tokens hold the values |
| 2 | `src/styles/glass/liquid-fill.css:76` | "(the 14px radius that SCALES by" | "(its radius SCALES by" | FV7 §1.2's wording for the floor's twin; the minor's quiet radius is 10px |
| 3 | `tests/components/button/Button.test.ts:146` | "the tier, the earned-darken clamp and `--glass-level`" | "the tier, the earned-ink clamp and `--glass-level`" | R-13's register: the clamp is live in the minor, and in light it earns a thicker cream pole, not a darken |
| 4 | `tests/gates/feedback-tint-seam.test.ts:11` | "its tier ink, its earned-darken clamp, its `--glass-level`" | "its tier ink, its earned-ink clamp, its `--glass-level`" | as #3 |
| 5 | `src/components/dock/styles/adaptive-legibility.css:61-62` | "(`--card`, the warm-white surface base the bright bucket implies)" | "(`--card`, the warm-white surface base of the light plate)" | the file declares no bucket for the dock's ink (:50-54) |
| 6 | `adaptive-legibility.css:65` | "The bucket is the floor; this is the native pick." | "The self-engage is the floor; this is the native pick." | the unconditional self-engage (:57-60) is the AA floor, as the same paragraph says |
| 7 | `src/styles/glass/surfaces-pager.css:34-36` | "…keeps it translucent); under `.dark` the tint arm LIFTS it toward luminous warm-dark, never a charcoal slab. `in oklab` is the glass-tint perceptual family (the in-srgb" | "…keeps it translucent, in both themes; one writer, the clamp, moves the pill's ink, never a second axis, and the pill runs no oklab mix of its own (the in-srgb" | there is no tint arm (`ladder.css:165`). Translucent in both themes by the arithmetic: floating + 2 steps is base + 2(1 − base)/3 < 1 in light (`tokens/glass.css:51-57`) and 0.22 + 0.08 = 0.30 in dark (`dark-arm.css:276-282`). One writer: `veil.css:46-47`. No oklab mix: the plate is `glass-plate`'s srgb veil (`veil.css:87-92`) and the rule's two box-shadow mixes are srgb (§1.1) |
| 8 | `src/styles/tokens/property-regs.css:154-155` | "the a11y Clear↔Tinted escape rides level-up here AND tint-toward-ink under `prefers-contrast: more`." | "the a11y Clear↔Tinted escape rides this knob alone: `prefers-contrast: more` sets `--glass-level: 0.3` (glass/a11y-fallback.css) and writes no veil token." | `a11y-fallback.css:37-47` (untouched by the minor, HEAD's file): the bracket sets `--glass-level: 0.3` and `--glass-definition: 1`, nothing else |
| 9 | `tests/components/field/forms-seam.test.ts:95` | "mass of 0.075 against the ladder's 0.48." | "mass of 0.075, a fraction of the ladder's perimeter rung." | FV7's wording for the floor's same line; the minor's rung is 0.54 |
| 10 | `src/styles/tokens/glass-deep.css:12-14` | "the calm ladder then moved to 10/14/16/20/22px and the LERP ran 20px -> 16px. A deep overlay painted 16px where the plain overlay paints 22" | "the calm ladder (the `--glass-blur-*-radius` rungs) then retuned and the LERP ran 20px -> 16px. A deep overlay painted 16px where the plain overlay then painted 22" | floor v8's R-20 (iv) wording, byte for byte |
| 11 | `glass-deep.css:54` | "the calm ladder has since moved to 10/14/16/20/22px, so the LERP ran" | "the calm ladder then retuned (the `--glass-blur-*-radius` rungs), so the LERP ran" | as #10 |

**Kept, as Crit8 §5.2 ruled:** `property-regs.css:124` ("TINT (whole-plate legibility)", a label) and the minor's own "tint seam" lines (`GlassDock.vue:505`, `dock/styles/index.css:82, 85`), true because the minor keeps the clamp.

### 1.1 · One fold inside R-23's range (recorded for the critic)

R-23 names `surfaces-pager.css:34-36`, and Crit8's ruling quotes only the dark clause ("under `.dark` the tint arm LIFTS it"). Line 36 also carries "`in oklab` is the glass-tint perceptual family". That clause is the dangling half of the "element-level oklab TINT seam" R-18 struck at :29, and it is false: `grep` of the rule (`surfaces-pager.css:20-66`) finds no `in oklab`, only the two srgb box-shadow mixes at :46 and :63. My first build kept the clause; the frozen list printed the line; I rewrote the whole named range instead, so the build stays inside R-23's sites. Floor v8 says the same of its pill ("no ink, clamp or oklab mix").

### 1.2 · Tied to floor v8

`glass-deep.css` in the minor v7 equals floor v8's (`git apply --include` of `floor-v8.patch`'s hunks on HEAD's file, `cmp` exit 0). The two builds no longer differ in that file, so one sentence of record serves both (P-3).

---

## 2 · The declaration and H7-3

### 2.1 · `harness/deletes-minor.json`: three site entries and three names

**R-23's site entries, as H9 §3.2 amends them.** R-23 lists `sheet/styles.css:197`, `overlay-plate.css:173` and `deep.css:73`, as `MS6-proposed-sites.json`. Under H9, `sheet/styles.css:197` prints `arm-true` (it cites `tokens/dark-arm.css`, whose `.dark` arm still declares `--glass-veil-step: 0.04`), so a site entry there would exempt nothing and FAIL as stale. And H9-2's tuple arm reads a third history line, `tests/components/ui/surface/Surface.test.ts:164`. The landed entries follow H9 §8's hand-off:

| name | site | reading |
|---|---|---|
| `--ink-perimeter` | `src/styles/glass/overlay-plate.css:173` | "BK #80 measured at 3.0:1 at 0.48": a dated measurement (R-17 (iii)) |
| `--glass-blur-floating-radius` | `src/styles/glass/deep.css:73` | "The predecessor LERPed … (20px)": history, the floor's `deep.css:69` twin |
| `--glass-blur-*-radius` | `tests/components/ui/surface/Surface.test.ts:164` | "RED at the first cut's bytes … against plain 10 / 14 / 16 / 20 / 22": history, the floor's same site in `H9-exact-floor.json` |

**Three names (39 → 42), a departure recorded for the critic.** R-23 names site entries only. Without new names, H7-3 cannot tell the minor v6 from the minor v7 at any R-23 site, because DEL's H7 scope has no patch and so no value arm. I used MS6 §2.1's method: a phrase goes in only when every hit on the minor v6 is an R-23 site (`MS7-records`, the candidate run in the session log, repeated by `del-H7-minor6.log`).

| phrase | hits on the minor v6 | in |
|---|---|---|
| `tint arm` | 1, `surfaces-pager.css:35` | yes |
| `tint toward ink` | 1, `property-regs.css:154` ("tint-toward-ink") | yes |
| `ladder's 0.48` | 1, `forms-seam.test.ts:95` | yes |
| `bright bucket` | 15, 14 of them live (`ladder.css` ×7, `rim.css` ×2, `shell.css:138`, `deep.css:26`, …) | no |
| `bucket is the floor` | 2, one of them live (`ladder.css:251`, where the bucket is real) | no |
| `level-up` | 4, three of them other senses (`CommandDialog.vue:10`, `useDragVelocity.ts:235`, `picker-lane.test.ts:361`) | no |

So R-23's two `adaptive-legibility.css` rewrites (#5, #6) are guarded by R-21's frozen list alone (§4), where the minor v6 prints them unread.

### 2.2 · DEL: a value-arm site is `not read` without `--patch` (a harness change, recorded)

R-23 puts its sites in `deletes-minor.json`, and H7-3 reads that file with no `--patch`. All three sites are keyed by a changed token or a family, which only the value arm reads, and the value arm runs only with `--patch`. Under H8-1's rule (a site that exempts nothing FAILs as stale) every H7-3 read of the minor's declaration would FAIL 3 stale rows, the minor v7 included. `deleted-mechanisms.mjs` now prints such a site as `· site <at> for "<name>" not read: no --patch, so the value arm did not run`, and counts it as no row. A site keyed by a declared name is read with or without a patch, and still goes stale. With `--patch` nothing changes. The self-test holds both (§2.4). The alternative, a second declaration file for the patch read, would put the minor's names in two places (P-3).

### 2.3 · H7-3 (`static.log`, 18:32:30-18:32:40, load 14.0 → 13.6)

| tree (H7's scope, `src/` and `demo/`, no patch) | result |
|---|---|
| **minor v7 (the fixture)** | **PASS 42**, 0 hits; the 3 sites print `not read` (`del-H7-minor7.log`) |
| minor v6 (the plant) | **FAIL 2/42**: `tint arm` at `surfaces-pager.css:35`, `tint toward ink` at `property-regs.css:154`. The third phrase is in `tests/`, outside H7's scope (`del-H7-minor6.log`) |
| minor v5 | FAIL 17/42, 20 hits in 7 files (MS6: 15/39, 18 in 7; the two new `src/` phrases add one row each) |
| minor v4 | FAIL 38/42, 50 hits in 15 files (MS6: 36/39, 48 in 15) |

### 2.4 · Self-test (`selftest.log`, 18:32:47-18:33:02, load 14.1 → 16.3)

`selftest.mjs --only LAW,DEL,H7-1,H7-2,H7-3,H8-1,H8-2,H9-1,…,H9-6 --h7-trees <minor4..minor7> --h9-trees <minor6, minor7> --h9-minor-patch minor-split-v6.patch --h9-minor7-patch minor-split-v7.patch`: **`SELFTEST PASS: 93 expectations met`**, 0 BAD. The rows changed or added in place:

| row | expect | read |
|---|---|---|
| H7-3 plant (new): "under `.dark` the tint arm LIFTS it" | FAIL | FAIL 1/42 |
| H7-3 fixture (new): a value-arm site, no `--patch` | PASS, `not read`, `PASS (1 gated rows)` | as expected |
| H7-3 plant (new): a site under a declared name, no `--patch`, exempting nothing | FAIL, stale | FAIL 1/2, stale |
| H7-3 plant: the minor v4 (`hits=48` → **`hits=50 files=15`**) | FAIL, ROWS | FAIL 38/42, rows hold (5) |
| H7-3 plant: the minor v5 (`FAIL (15 of 39` → **`FAIL (17 of 42`**, `hits=20 files=7`) | FAIL, ROWS | rows hold (7) |
| H7-3: **the minor v6, now a plant** (was the fixture) | FAIL, ROWS at `surfaces-pager.css:35`, `property-regs.css:154`, `FAIL (2 of 42` | rows hold (3) |
| H7-3 fixture (new): **the minor v7** | PASS, the three `not read` lines | PASS 42, rows hold (3) |
| H9-3: the minor v6 under the minor v7's declaration (`FAIL (6 of 48` → **`FAIL (8 of 54`**) | FAIL, `arm-true sheet/styles.css:197`, no `--glass-veil-step` red, `glass-deep.css:12`, `DESIGN.md:1805` | rows hold (5) |
| H9-3 fixture (new): **the minor v7 over `minor-split-v7.patch`** | PASS 54; each of the 3 sites exempts a hit; `arm-true` at :197 | rows hold (5) |

The floor-tree rows (`--h8-trees`, `--h9-patch`: H8-1's 4, H9-1's 4, H9-2's 2, H9-6's 3) are the floor seats' and did not run here. All five floor-tree DEL rows pass `--patch` (`grep` of `selftest.mjs`: 5 rows, 0 without it), so §2.2 cannot move them.

---

## 3 · Byte identity (R-22's raw branch; `same.log`, 18:36:16-18:36:29, load 13.2 → 13.9; `bite.log`, 18:36:42-18:36:46, load 17.0 → 18.2)

The minor v7, the minor v6, the minor v7 again and the minor v7 + `MS7-r21b-proposed.diff` were built by `harness/build.mjs --demo` under one label (`same`) in the worktree, each output moved aside before the next build, each swap checked by `cmp` against its patch. `srcDirtyFiles` reads 47 for all four: R-23's five `src/` files are all already touched by the minor v6, so the count cannot show the swap, and the `cmp` checks do.

| output | minor v6 against minor v7 | minor v7 rebuilt | minor v7 + proposed | against pass 8's banked minor v6 (`pass-8/MS6-records/same-m6-*.sha256`) |
|---|---|---|---|---|
| **specimen dist** (3 files) | **`diff -rq` exit 0; sha256 lists identical.** CSS **398,432 B, sha256 `e11613c3eeb45cab`** in both, MS6's figure | exit 0 | exit 0 | CSS identical. The JS and `index.html` differ only through the worktree path in the JS's `//#region` comments (`p8/minor6` then, `p9/minor7` now). **With the path rewritten to pass 8's, the minor v7 specimen JS hashes `929393c20eb9d078…7609664`, byte for byte the banked minor v6 `index-DP1ZxLyx.js`** |
| **dist-demo** (346 files; CSS 431,116 B) | **`diff -rq` exit 0; sha256 lists identical**, no normalisation | exit 0 | exit 0 | **identical** (`diff` exit 0) |

**The bite:** HEAD built the same way under the same label differs from the minor v7 in both outputs (`diff -rq` exit 1: dist 5 lines, demo 229 lines; HEAD's specimen CSS 394,891 B, `b09b9e73a61b75b1`, MS6's figure).

**Why it holds.** Every R-23 hunk is inside a CSS block comment, a markdown paragraph or a test comment. The CSS minifier strips comments, `DESIGN.md` and the test files are in neither build, and no `.vue` file moves, so no scoped id moves. **Every paint verdict of the minor v6 carries to the minor v7** (P-3, the thin-build rule), and so does every verdict carried into the minor v6 (MS6 §3). No browser ran, no capture was taken, and no WebKit cell is owed by this seat.

---

## 4 · R-21 (b): the frozen list, read line by line

### 4.1 · The list and the reading

`prose-sweep.mjs --root <minor v7> --patch minor-split-v7.patch --declare harness/deletes-minor.json` prints **371 lines in 52 files** (`sweep-minor7.log`, `LIST`): the 61 touched files that exist, `sweep-frozen.json`'s 9 words, the declaration's 42 names and the changed ladder. H9 printed 370 on the minor v6. I read every line with its context, and where a line names a mechanism I read it against the minor v7's own source. The minor **keeps** the clamp, the observer, the luma term, the bucket and the dark ink, and recuts the light veil to the `--card` pole at the solved bound (`tokens/glass.css:40, 51-57`). So a line is read against that tree, not the floor's: "the earned-ink clamp", "the tint seam", "the observer writes `--glass-backdrop-luma`" are true here and would be false on floor v8.

`MS7-rulings.py` is the reading (a reading per file, with per-line overrides); `MS7-rulings.json` is its output, one `{ at, says, why }` per ruled line.

| reading | lines | what it means |
|---|---:|---|
| **true** | 359 | true of the minor v7 tree |
| **REPORTED** | 10 | false on the minor v7, and already false at HEAD, on a line the minor's patch did not write, naming no mechanism the minor changes. Ruled "true as to the patch" (FV8 §1.2's `dock.css:15` reading) and reported for the landing docs pass. Each `why` starts `REPORTED` (§4.2) |
| **FALSE** | 2 | false on the minor v7 because of the minor. No ruling, so the list FAILs them as unread (§4.3) |

| run (`sweep.log`, 18:36:04-18:36:06, load 13.2 → 13.7) | result |
|---|---|
| minor v7, `--rulings MS7-rulings.json` | **`FAIL (2 unread, 0 stale of 371 lines)`**: `DESIGN.md:34`, `surface-axis.css:21` |
| minor v7 + `MS7-r21b-proposed.diff`, `--rulings MS7-rulings-proposed.json` | **`PASS (371 lines, each ruled true)`** |
| minor v6 under the minor v7's patch, declaration and rulings (the plant) | **`FAIL (15 unread, 5 stale of 379 lines)`**. The 15 unread are every R-23 site that prints (`adaptive-legibility.css:62, 65`, `liquid-fill.css:76`, `surfaces-pager.css:34, 35, 36`, `glass-deep.css:12, 13, 54`, `property-regs.css:154`, `Button.test.ts:146`, `forms-seam.test.ts:95`, `feedback-tint-seam.test.ts:11`) plus the two FALSE lines; the 5 stale are the rulings on R-23's rewritten lines. `DESIGN.md:1805` carries no frozen word, and DEL's value arm reds it (§5) |

So every one of R-23's 11 sites is caught on the minor v6 by DEL or by the frozen list, most by both.

### 4.2 · The 10 REPORTED lines (stale at HEAD; for the landing docs pass)

| line | why it is false | why it is not the minor's |
|---|---|---|
| `_shared/feedback/feedback-tone.css:20-21` | "the SAME `color-mix(in oklab, …)` seam the `--glass-veil-*` legibility lift and the `--veil-bg` plate already run": the veil mixes in srgb (`veil.css:87-92`), and `--veil-bg` is declared nowhere in `src/` | HEAD's veil is srgb too (`git show HEAD:src/styles/glass/veil.css`, `in srgb` at :76) and HEAD declares no `--veil-bg`; the minor edits this header at :38 only. Floor v8 rewrote its twin (FV8 §1.2 (v)) |
| `dock/styles/dock.css:16` | credits the adaptive-legibility partial with re-pointing `--glass-veil-*`; its first clause ("one chromatic writer, no second tint layer") is true | pre-existing at HEAD; FV8 §1.2 reports the floor's same line |
| `dock/styles/shell.css:30, 33` | "the UNIFIED PLATE TINT is the PRIMARY anti-gray … The plate-tint self-engage (dock/adaptive-legibility.css)": that partial carries no plate tint; the plate's ink is `glass-plate`'s clamp (`dock/dock.css:101-116`) | HEAD's `adaptive-legibility.css:28` already "re-points no plate colour"; the minor edits this file at :130-146 only |
| `demo/stories/substrates/glass-material.vue:5` | of the "three SOTA folds", the chromatic fringe is struck (the story's own blurb at :383, "no painted fringe at the edge") | HEAD text; the minor edits this file at :31, :230, :237, :383 only |
| `glass-material.vue:12, 72, 73` | "sets BOTH `--glass-veil-ink` + a non-zero `--glass-veil-rung` so the `color-mix(in oklab, …)` actually bites": the story writes only `--glass-veil-ink` on its tint plate (:404-407), the sample strengths are never written, and the plate mixes in srgb | HEAD text, false at HEAD for the same reasons |
| `tokens/glass-fx.css:2` | "the adaptive tint-source": no token of that name exists; the file's backdrop knobs are `--glass-backdrop` and `--glass-backdrop-luma-knee` (:139-145) | HEAD has no such token either (`git grep`); the minor does not edit this line. Floor v8 rewrote its own version (FV8 §1.2 (vii)) |

These ten go to the landing docs pass beside Crit8's list (`property-regs.css:162-165`, `DESIGN.md:516, :521`, `docs/canon/glass-system.md:50, 51, 60`, `music-staff/README.md:60`) and FV8's `dock.css:15`. Two notes on that list from the minor's side: `DESIGN.md:521` is **true** of the minor (it describes the clamp the minor keeps; `veil.css:69-94`), so only the floor makes it stale; `DESIGN.md:516-517`'s blur column ("`blur(16px)`", "`blur(24px)`") is stale in the minor as at HEAD, and the frozen list does not print it.

`DESIGN.md`'s other 33 printed lines (the type-scale `clamp()` table, the dock-button and hover rows, the driver/observer motion rule, the cartoon cast, the tier and section tints) name no mechanism the minor changes. I read them for the minor's mechanisms and did not re-measure the rows.

### 4.3 · The 2 FALSE lines, and the proposed delta (not in the patch)

| line (minor v7) | why false | proposed (`MS7-r21b-proposed.diff`) |
|---|---|---|
| `DESIGN.md:34` | "Light-mode and dark-mode tints differ; the dark-mode tint is denser to compensate for the lower contrast floor." In the minor the light rung is the `--card` pole at α ≥ the solved bound (`tokens/glass.css:40, 51-57`; the thinnest light α measured is 0.890, Reg P8-3.1 G4), and the dark rungs are the ink at 0.10-0.26 (`dark-arm.css:276-283`). True at HEAD (light 0.14 ink against dark 0.18); **the minor's light law makes it false**. `DESIGN.md` is a touched file of the minor | "Light-mode and dark-mode tints differ: light paints the `--card` pole at or above the solved bound α (a cream frost, never an ink: O-62), and dark paints the warm near-black ink at its own rung α." |
| `src/styles/glass/surface-axis.css:21-22` | "solid `--card` + `blur(0)` through the ONE level knob, the tint axis zeroed (a solid plate has no translucent backdrop to earn ink over)": there is no tint axis (`ladder.css:165`; this file's own :79, as R-18 rewrote it). **The minor's patch rewrote :22 of this sentence** (R-13's register) and kept the claim. The floor's patch rewrites its twin (`floor-v8.patch`: "(a solid plate has no translucent backdrop to read through)") | "solid `--card` + `blur(0)` through the ONE level knob, with no tint axis to zero (a solid plate has no translucent backdrop to earn ink over)." |

**Why they are not in `minor-split-v7.patch`.** The task defines the minor v7 as the minor v6 + R-23, and R-23 calls its list fixed; R-21 binds the minor's prose as it binds the floor. The floor seat met the same collision by building its three extra rewrites (FV8 §1.2). I kept the patch to R-23 and measured the two rewrites beside it instead, so the critic can take them or strike them without a rebuild. What each choice costs:

- **taken:** `minor-split-v7.patch` + `MS7-r21b-proposed.diff` (2 files, +3/−3, sha1 `ccee3e30`, `git apply --check` exit 0 on the minor v7). Its specimen dist and dist-demo are raw-identical to the minor v7's (§3), DEL reads PASS 54 (`del-H9-minor7p.log`), and the frozen list reads PASS 371. The minor's prose is then clean under both of R-21's instruments.
- **struck:** the minor v7 lands with two false sentences that R-21 (b) prints, one of them in the published design doc and against the very law W-0.1 lands (O-62).

---

## 5 · H8-1 with H9 over the minor's own patch (`static.log`; R-23's fixture)

| tree (`--declare harness/deletes-minor.json --patch <patch>`; 1,095 text files in scope, 61 of 61 touched paths read) | result |
|---|---|
| **minor v7 + `minor-split-v7.patch`** | **PASS 54** (42 names + 8 changed tokens + 1 family + 3 sites), 0 hits. Exempt: `overlay-plate.css:173`, `deep.css:73`, `Surface.test.ts:164`, none stale. `arm-true`: `sheet/styles.css:197` (cites `dark-arm.css:277` (`.dark`), which declares 0.04). Rung reading, printed and not gated: 4 lines, all history (`deep.css:73, :75`, `glass-deep.css:55`, `Surface.test.ts:162`). REPORTED 4 (`docs/canon/glass-system.md:49, :78`, `MIGRATION.md:4041, :1000`) (`del-H9-minor7.log`) |
| minor v6 + `minor-split-v7.patch` (the plant) | **FAIL 8 of 54**, 11 hits in 8 files: `earned darken` and `earned-darken clamp` at `Button.test.ts:146` and `feedback-tint-seam.test.ts:11`; `tint arm` at `surfaces-pager.css:35`; `tint toward ink` at `property-regs.css:154`; `ladder's 0.48` at `forms-seam.test.ts:95`; `--ink-perimeter` 0.48 at `DESIGN.md:1805`; `--glass-blur-quiet-radius` 14px at `liquid-fill.css:76`; the tuple at `glass-deep.css:12`, `:54` (`del-H9-minor6-plant.log`) |
| minor v6 + `minor-split-v6.patch` | FAIL 8 of 54, the same 11 hits (`del-H9-minor6-ownpatch.log`) |

**H8-1 with H9 over the minor's own patch is at 0, so R-23's fixture holds.** MS6's 6-of-47 conflict (MS6 §4) is closed: R-23 built the critic's list, and H9-3 removed the one site that would have gone stale.

---

## 6 · Static reads, toolchain and the ratchet

| reading | minor v7 | when, load |
|---|---|---|
| LAW | **PASS 73** (FV8's 72 plus `MS7-run.sh`), re-read after the last script edit | 18:40:05, 16.4 |
| census | `LIGHTING-CENSUS stacked=0 halo=0 blur=0 open=0`, exit 0; `git archive v10.1.0 src/styles` exactly `stacked=2 halo=2 blur=5 open=9`, exit 1 | `static.log` |
| HOV | PASS 58 | `static.log` |
| LIT | REPORTED `halo=5 near=1 stacked=10 chain=3 open=19 frames-halo=0/0`, the 19 inherited, none added | `static.log` |
| ladder | `diff radii-minor7 pass-8/MS6-records/radii-minor6.txt` prints nothing | `static.log` |
| FL-14 static | `isolation: isolate;` at line 26 of `@utility glass-plate` | `static.log` |
| the R-16 darken sweep | 46 lines on the minor v6 and v7, `diff` empty (R-23 rewrote no darken line in `src/` or `demo/stories`; its two darken rewrites are in `tests/`) | `static.log` |
| identifiers on R-23's lines | `--glass-level` 5, `--card` 4, `--ink-*` 6, `--glass-blur-*` 4: all inside comments, the doc paragraph or test comments | `static.log` |
| `vue-tsc --noEmit` | exit 0 | 18:37:06, 17.9 |
| `vite build` (library, `cacheDir` in the worktree) | exit 0 | 18:37:18, 23.3 |
| `vue-tsc --noEmit -p tsconfig.test.json`, after the library build | exit 0 | 18:37:30, 22.1 |
| `vite build`, the dist-demo config, **before the units** (P8-5) | exit 0 | 18:37:33, 21.4 |
| `vitest run --maxWorkers=2` | **239 files, 2321 passed, 0 failed**, 10 expected-fail, 1 skipped (MS6: 2321) | 18:38:50, 19.3 |
| `vitest run --maxWorkers=2` on R-23's three test files | 3 files, 34 passed | 18:38:53, 19.2 |
| verifier, datum unrebound | `G-BUNDLE-RATCHET … 2921390 > 2919057`, exit 1: **+2,333 B, MS6's figure to the byte**; R-23 adds 0 B | `ratchet.log` |
| verifier, datum rebound in the worktree only | exit 0, `terminal CLEAN`, roster PRESENT **289 = 289**, claims 193, declarations 454; `.bundle-ratchet` restored; `.published-roster` diff empty (`v10.1.0..HEAD` and the worktree) | `ratchet.log` |
| library `dist/` files carrying an R-23 sentence | none (`grep` over `dist/`) | `ratchet.log` |

---

## 7 · Gates carried, and shippability for 10.2.0

### 7.1 · The gates

Every row below is carried on outputs proved raw-identical to the minor v6's (§3), whose verdicts Reg P8-3.1 records. "Read here" marks this seat's own static reads.

| gate | verdict | basis |
|---|---|---|
| **W-0.1 G1** M-1 | **PASS** over paper (11/11, both engines); off paper REPORTED 48/66 | carried; Q-11 content unruled |
| **G2** O-66 field, **G3** O-66 row | **PASS** | carried; HOV 58 read here |
| **G4** W-A light | **PASS** (108/108, thinnest α 0.890) | carried |
| **G5** scope | **PASS**: no name leaves `src` (R-23 is comments); roster PRESENT 289 = 289 and `terminal CLEAN` with the datum rebound in the worktree, read here; ratchet **+2,333 B** unrebound, R-23 adding 0 B | read here |
| **G6** per R-9 | **PASS** (13 dark composites, worst ΔE 0.0000); raw 1/13 at ΔE 0.0022, W-0.11's dark dock cast, printed beside it | carried |
| **G7** M-2 and M-3 halves (M-3 under H7-1) | **PASS**, 0 regressions; WK §3's Playwright WebKit Close rings (light 3.25) on the minor v6's bytes, which are these | carried |
| **W-0.11 G1-G4** | **PASS**: census `stacked=0 halo=0 blur=0 open=0`; 10.1.0 exactly `2/2/5/9` | read here |
| **W-0.11 G5** | **PASS** | as W-0.1 G5 |
| **W-0.11 G6** | **PASS** (M-2 720, M-3 214 HEAD-PASS, 0 regress) | carried |
| STACK (FL-14) | **24/24** | carried; `isolation: isolate` read here |
| units | 239 files, **2321 passed**, 0 failed | read here |
| **R-23** (P8-3.3 item 3) | **built**: 11 sites in 9 files; DEL with H9 over the minor's own patch PASS 54, the minor v6 FAIL 8/54 at R-23's sites only | read here |
| the light-law prose under R-21 | DEL **at 0**; the frozen list **2 lines unread**, both FALSE (§4.3), with a measured proposed delta that reads PASS 371 | read here |

### 7.2 · The minor-split table (P5-3.3, as amended)

One row moves, the light-law prose: R-13's nine sentences, `search.css:44`, R-16's two and its 19, R-18's 15 A-3 sites and the forms-seam title (minor v6), **plus R-23's 11 sites (minor v7)**, guarded by `deletes-minor.json` (42 names, 3 sites) and DEL with H9 over the minor's own patch, and **R-21 (b)'s two FALSE lines if the critic takes `MS7-r21b-proposed.diff`**. It lands in W-0.1.

### 7.3 · Can W-0.1 and W-0.11 ship from the minor v7 in 10.2.0? No, not yet

The minor v7 is the measured shape of 10.2.0's veil recut and W-0.11's lighting tokens. Its paint is the minor v6's (and v5's, and v4's) to the byte, so every gate the registry set for it is green, and R-23 is built. What remains:

1. **The entry gate:** 0 of 2 clean passes (W-0.1 §3, W-0.11 §3.3). No owner ruling has arrived, so pass 9 cannot be clean whatever the builds read (Reg P8-6.3). If the critic confirms floor v8's 39/44 (FV8 §7), the loop sits at its owner-gated fixed point, and pass 10 launches only when the answers arrive (Reg P8-6.4). **The earliest landing is therefore the close of the second consecutive clean pass after the owner answers the P8-4 sheet**: pass 10 and pass 11 at the soonest, not pass 10.
2. **Q-11's content clause:** G1 off paper reads 48 of 66 grey, content included. Only the owner can say whether 10.2.0 may ship grey content off paper. "Not accepted" has no measured minor candidate and fires C″'s re-trigger (c).
3. **R-21 (b) on the minor's prose:** the critic takes or strikes `MS7-r21b-proposed.diff` (§4.3), and rules this seat's three departures (§2.1's names, §2.2's DEL change, §1.1's fold). If it takes the delta, the minor v8 is that delta with the same byte proof (already read: identical, §3).
4. **The landing's own items, unchanged:** R-9's reading enters W-0.1 §5 G6's text (the owner may override); each gate binds to one probe (W-0.1 §5 and W-0.11 §5 name `scripts/probes/band-0/*`, which the tree still lacks); `.bundle-ratchet` rebinds to the measured bytes (**+2,333 B**). The landing docs pass takes §4.2's ten lines with Crit8's and FV8's lists.
5. **10.2.0 is also gated on D2 converging** (O-88).

---

## 8 · Handed on

| to | what |
|---|---|
| **the critic** (step 5) | (1) R-23's 11 rewrites against Crit8 §5.2 (§1), and §1.1's fold of `surfaces-pager.css:36` into R-23's named range. (2) §2.1: the three site entries as H9 §3.2 amends R-23 (`sheet/styles.css:197` dropped as arm-true, `Surface.test.ts:164` added), and the three names added by MS6's method, with the three candidates kept out. (3) §2.2: DEL's value-arm sites read `not read` without `--patch`, and the self-test rows that hold it. (4) R-21 (b): the 371 rulings in `MS7-rulings.json`, re-run with `prose-sweep.mjs --rulings` (`MS7-run.sh sweep`); the 10 REPORTED lines (§4.2), above all the reading "true as to the patch"; the 2 FALSE lines and `MS7-r21b-proposed.diff` (§4.3). (5) The raw byte proof and the path-normalised tie to pass 8's banked JS (§3) |
| **the pass-10 instrument list** | **DEL reads an absent tree as PASS.** `deleted-mechanisms.mjs --root <a path that does not exist>` prints `0 text files in scope` and `PASS (42 gated rows)`, exit 0 (seen here when this seat's `trees` phase removed two plant trees before H7-3 read them: the `static` run of 18:31:26-18:31:35 (`phases.log`) printed `PASS (42 gated rows)` for the absent minor v5 and minor v4, and the self-test after it skipped their rows. The rerun at 18:32:30 overwrote those logs, on the re-cut trees). That is E-2's class: a check that reads nothing must fail loud, as H9-4 made the `rows.mjs` readers do. This seat's runner now refuses a missing tree before DEL runs (`MS7-run.sh static`, exit 5), and the banked logs are from trees that exist. The instrument itself is unchanged |
| the landing docs pass | §4.2's ten lines, beside Crit8's and FV8's lists; `DESIGN.md:516-517`'s blur column, stale in every build |
| the WebKit seat | nothing new: the minor v7 specimen is the minor v6's bytes, so any WebKit cell read on the minor v6 reads the minor v7 |
| the owner | Reg P8-4's sheet, unchanged. No new frame is owed, because the minor v7 moves no pixel |

---

## 9 · Teardown and reproduce

**Torn down** (`phases.log`, teardown 18:40:45, load 17.5): `git worktree remove --force` of `.claude/worktrees/bl/D3/p9/minor7/wt` and `git worktree prune`; `.claude/worktrees/bl/D3/p9/minor7/` and the empty `p9/` were removed. `ls .claude/worktrees/bl/D3/` prints `p3 p5 p6`, `git worktree list` has no `p9` entry, and `git status --porcelain -- src demo tests DESIGN.md` prints nothing. Nothing of this seat is left running. The checkout's tracked writes are the four harness files in place; its untracked writes are under `pass-9/` (the `MS7-*` files, `minor-split-v7*.{patch,diff}` and this document).

```sh
P9=docs/tranches/BL/design/material/pass-9
G="$HOME/.claude/guard/guarded"
$G --light --timeout 15 -- bash $P9/MS7-run.sh setup      # worktree at HEAD, node_modules linked, minor v6 applied, trees/minor6 cut
$G --light --timeout 15 -- bash $P9/MS7-run.sh edit       # or apply $P9/minor-split-v7.patch to HEAD
$G --light --timeout 10 -- bash $P9/MS7-run.sh paths
$G --light --timeout 10 -- bash $P9/MS7-run.sh check
$G --light --timeout 10 -- bash $P9/MS7-run.sh trees
$G --light --timeout 15 -- bash $P9/MS7-run.sh oldtrees   # h7trees/minor4, minor5 from the banked patches
$G --light --timeout 20 -- bash $P9/MS7-run.sh static
$G --light --timeout 20 -- bash $P9/MS7-run.sh selftest
$G --light --timeout 15 -- bash $P9/MS7-run.sh proposed   # MS7-r21b-proposed.diff and trees/minor7p
$G --light --timeout 15 -- bash $P9/MS7-run.sh sweep
$G --timeout 60 -- bash $P9/MS7-run.sh same
$G --timeout 30 -- bash $P9/MS7-run.sh bite
$G --timeout 60 -- bash $P9/MS7-run.sh toolchain
$G --light --timeout 10 -- bash $P9/MS7-run.sh ratchet
$G --light --timeout 10 -- bash $P9/MS7-run.sh law
$G --light --timeout 10 -- bash $P9/MS7-run.sh teardown
```
