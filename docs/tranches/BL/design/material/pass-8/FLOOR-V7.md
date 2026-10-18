# D3 · pass 8 · FLOOR V7: floor v6 + R-17, measured under H8

| field | value |
|---|---|
| seat | D3 pass 8, floor v7 (`REGISTRY.md` P7-6.2 step 2). It builds R-17 on `pass-7/floor-v6.patch`, proves the specimen dist and the dist-demo byte-identical to floor v6's, then runs the static checks (DEL under H8-1 and H8-2, LAW, census, HOV, LIT, the ladder `diff`) and the toolchain with vitest. It runs no browser, because the bytes held. It scores the same 44 rows |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `72cde4317` (H8's commit; the one commit after H8's `82a097a27`, docs only). `git diff --stat 1da7eb17b 72cde4317 -- src demo tests package.json scripts tests-visual vite.targets.ts .bundle-ratchet .published-roster DESIGN.md docs/canon` prints nothing, so every number below is the published 10.1.0 source plus the named patch |
| patch | **`floor-v7.patch`**: 88 files, +976/−2310, sha1 `4a1e09c8`. **`git apply --check` exits 0 at `72cde4317`**, both in the worktree returned to HEAD and in the checkout (read only) (`FV7-records/check.log`). Composition, checked byte for byte: `floor-v6.patch` (87 files, sha1 `235a5117`) + **`floor-v7-R17.diff`** (2 files, +9/−10) = `floor-v7.patch` (`cmp`, `patch.log`). The 88th path is `src/styles/glass/liquid-fill.css`, which floor v6 does not touch (§1.2) |
| owner rulings | **None.** `audit/INBOUND.md` still ends at O-98. `FORMATION-PROGRESS.md`'s last D3 line is the pass-8 launch (line 489), and it records no ruling on Q-1, Q-3, Q-11 (either clause), Q-12, Q-13 or Q-14. The P7-4 defaults apply: Q-1 (a), Q-3 (a), Q-11 (a) for chrome with content REPORTED, Q-14 (a). Floor v6 already builds every default. **No variant is selected** (`pass-4/fv3/q1c.*`, `fv3/q11b.*` stay unapplied), nothing is built for an owner option, and R-2's deletion is not built, so row 12 is not re-read |
| engines | none run. The bytes held (§3), so every paint verdict of floor v6 carries (P7-2.2, the thin-build rule): Chromium 149 gated, Playwright WebKit 26.5 paint-only, as read by FV6 §5 and the pass-7 critic. **Every real-Safari cell: UNMEASURED (owner's safaridriver checkbox)** |
| records | `FV7-run.sh` (every command, by phase: `patch`, `check`, `declare`, `static`, `same`, `bite`, `toolchain`, `teardown`), `FV7-records/` (`phases.log` carries each phase's time and load), `floor-v7.patch`, `floor-v7-R17.diff` |
| fences | No tracked source edited in the checkout, and no git write in it beyond `git worktree add` / `remove` for `.claude/worktrees/bl/D3/p8/floor7/wt`. The edits and every patch swap happened in that worktree, each swap checked with `cmp` or a clean `git status`. Builds and caches lived in `$W/.d3out` and `$W/.cache-fv7`. The only writes in the checkout are under `docs/tranches/BL/design/material/pass-8/`. Nothing ran in a sibling repo. **Worktree removed, `.claude/worktrees/bl/D3/p8/floor7/` removed and the empty `p8/` removed** (`phases.log` teardown 13:34:09-13:34:17). `git worktree list` prints no `floor7` entry, and `git status --porcelain -- src demo tests` prints nothing |
| machine law | Every phase ran through `~/.claude/guard/guarded` as the literal command word: the worktree add, `patch`, `check`, `declare`, `static` and `teardown` under `--light` (no browser, no build); `same`, `bite` (`--timeout 60`/`30`) and `toolchain` (`--timeout 60`) as heavy runs, one at a time. No browser launched. vitest ran with `--maxWorkers=2`. The kernel-zone refusal never fired. The 1-minute load reached 121 at 13:29, during the worktree checkout, from runs outside this seat. Every measuring phase ran between 13:30:42 and 13:33:51 at load 32.1 → 11.5 (`phases.log`). No red cell exists to re-run |

Short citations: `Reg` (`REGISTRY.md`, the Pass 7 part), `H8` (`pass-8/H8.md`), `FV6` (`pass-7/FLOOR-V6.md`), `Crit` (`pass-7/D3-critique.md`). `§n` after them is their section.

---

## 0 · In brief

- **Floor v7 = floor v6 + four comment or title edits in `forms-seam.test.ts` + one CSS comment clause in `liquid-fill.css`.** No value, name, selector, markup or assertion moves.
- **DEL under H8-1 and H8-2: PASS 85 of 85** on floor v7, with no stale site entry and 20 REPORTED lines. **Floor v6 under the same declaration and patch: FAIL 3 of 85**, at exactly H8's three sites (`forms-seam.test.ts:24`, `:91`, `liquid-fill.css:74`).
- **Byte identity holds in both outputs, with no normalisation.** Floor v6 and floor v7 were built under one label: the specimen dist (3 files) and the dist-demo (346 files) are identical by `diff -rq` and by sha256 list. The specimen CSS is 391,121 B, sha256 `347288745da7cf97`, the figure FV6 banked. Against pass 7's banked lists, the dist-demo is identical. The specimen JS matches to the digit once the worktree path its `//#region` comments print is rewritten to pass 7's. The bite: HEAD built the same way differs in both outputs.
- **Toolchain:** `vue-tsc` exits 0 on both projects. The library build and the dist-demo exit 0. vitest reads **237 files, 2318 passed, 0 failed**, 10 expected-fail, 1 skipped (floor v6: 2318). `forms-seam.test.ts` alone passes 6 of 6 under its new G-F2 title.
- **Rows:** the seat scores **39/44**. Rows 20 and FL-12 close on R-17. Open: **3, 9, 23, N-1, N-2, all owner-only.** That is P7-6.4's owner-gated fixed point. The critic's count stands over this one.

---

## 1 · R-17 (i): the hunks (`floor-v7-R17.diff`)

### 1.1 · `tests/components/field/forms-seam.test.ts` (R-17 (i), the file it names)

| floor v7 line | was (floor v6) | now | why |
|---|---|---|---|
| :19-20, the header's fence count | "TWO SPEC CLAUSES ARE FENCED ON ANOTHER ROW, and they are marked in place rather than dropped:" | "ONE SPEC CLAUSE IS FENCED ON ANOTHER ROW, and it is marked in place rather than dropped:" | Once G-F2's halves stop being fenced on W-FROST, the count is false. G-F1's fence (`input-pill`, §9 row 1) is untouched |
| :23-25 (floor v6 :23-26), **R-17 (i)'s passage** | "· G-F2's `bg α < 1.0` + `field L* ≤ page L* − 3` halves — both resolve `--input-on-glass`, which is #22 W-FROST's token (§9 row 2, "both or nothing paints"). The other half of that two-part kill, `material.css`'s nested-cell blanket, has already landed." | "G-F2's `bg α < 1.0` + `field L* ≤ page L* − 3` halves both resolve the field well, `--control-surface-bg: var(--glass-well)`, which the G-F2 check reads by name; their paint is a §6 browser-seat probe." | R-17 (i): it states what the halves resolve under floor v7. That is the token at `tokens/glass.css:236` on floor v7, and the body's assertion at :105-107 reads it. The paint halves are §6's, as the header's own :6-11 already says of every resolved-colour half. The sentence is no longer a bullet of the fence list, because it is no longer fenced |
| :26-27, the closing sentence | "it is the SPEC gates G-F1/G-F2 that stay open until those owners cut" | "it is the SPEC gate G-F1 that stays open until its owner cuts" | as :19-20 |
| :90, **the G-F2 test title** | "the perimeter rides the 0.48 ink rung and the well is a real inset (fill α fenced on W-FROST)" | "the perimeter rides the `--ink-perimeter` rung and the well is a real inset" | R-17 (i) verbatim: the rung by its token, and the W-FROST clause dropped (the body two lines below says the fill is `--glass-well`) |
| :93-94, a comment in the same test | "HEAD: 1.5px × 0.05 = a composited mass of 0.075 against the ladder's 0.48." | "… a composited mass of 0.075, a fraction of the ladder's perimeter rung." | **the seat's, beyond H8-1's finds.** It quotes HEAD's 0.48 as the comparison standard, where floor v7's rung is 0.52 (`color-radius.css`, `floor-v6.patch:3464`). H8-1 does not catch it, because the line carries "ladder's", not every word of `--ink-perimeter` (H8 §1.3's every-word reading). P-3: the rung is named, and the token holds the value. The 1.5px × 0.05 figure is HEAD's own history and stays |

The title change is the one string vitest prints. vitest reads 6 of 6 on the file (`units-forms-seam.log`). No assertion, regex or import moved.

### 1.2 · `src/styles/glass/liquid-fill.css:74` (the one further sentence H8-1 finds)

| was | now | why |
|---|---|---|
| "The blur routes the `--glass-blur-quiet` rung (the 14px radius that SCALES by `--glass-level`), not a literal blur off the level knob." | "The blur routes the `--glass-blur-quiet` rung (its radius SCALES by `--glass-level`), not a literal blur off the level knob." | H8-1's value arm: `--glass-blur-quiet-radius` 14px → 10px. H8 §6 hands it to floor v7 ("the clause goes or names the token"). The sentence already names the rung, so only the literal goes |

**A departure from R-17 (i)'s text, recorded for the critic.** R-17 (i) reads "Only this file is rewritten" (`forms-seam.test.ts`). The task's statement of R-17 adds "and every touched-file sentence H8-1 finds", and H8 §6 hands this one sentence on. `liquid-fill.css` is not one of floor v6's touched paths, but H8-1 gates all of `src/`, and on floor v6 the sentence states a radius the tree no longer has. The alternative, an `exact` site entry, would exempt a false sentence. So floor v7 rewrites it, and the patch grows from 87 paths to 88 (`patch.log`: the path lists differ by that one line). It is a CSS comment and is stripped from both outputs (§3).

### 1.3 · What floor v7 does not rewrite

- **`deep.css:69`** ("The predecessor LERPed `--glass-blur-floating-radius` (20px) …") and **`scale-paper.css:90`** (the struck BK #83 note, "(then 0.48)"). Both are H8 §1.4's proposed site entries in `H8-exact-floor-v6.json`, and both report a predecessor's value as history. Floor v7 keeps H8's reading, and the critic rules them. If the critic rules `deep.css:69` stale, it is one more comment and the bytes still hold.
- **`DESIGN.md:521`, `:1805` and `docs/canon/glass-system.md:50, 51, 60`.** These are REPORTED, not touched files, and they go to the landing's docs pass (Reg P7-5).
- **Every other sentence in `forms-seam.test.ts`** was read in full. G-F1's "a fill ruled transmissive is composing-to-cancel" (:75-76) names no deleted mechanism: floor v7's `--glass-well` is a translucent mix (`glass.css:162`). The KNOWN-RED `input-pill` fence (:82) is G-F1's.

---

## 2 · The declaration, built from floor v7's patch (H8-2), and DEL under H8-1

`declare-removed.mjs --patch floor-v7.patch --root <floor v7> --concepts harness/deletes-floor.json --exact pass-8/H8-exact-floor-v6.json` (`FV7-records/declare-floor-v7.{json,log}`):

`DECLARE floor-v7.patch: 190 identifiers on removed lines · 62 absent from the patched tree (declared: token 9, export 28, module const 7, type or component 3, module stem 3, prop 4, data- attribute 8) · 128 still named · 8 concepts · 68 names, 5 exact only, 9 sites`

This equals H8's declaration for floor v6. The same tool run with `floor-v6.patch` on the floor v7 tree gives a JSON that differs from floor v7's in the `patch` label alone: the same names, exact list, derived list, concepts and present list (`declare-floor-v6-on-fv7.log`). R-17 removes no identifier, so it declares none. **H8's exact list is used unchanged.** Each of its 9 site entries still exempts a hit on floor v7, so none is stale.

| check (`static.log`, 13:31:06-13:31:11, load 26.4 → 25.1) | floor v7 (the fixture) | plant or bite |
|---|---|---|
| **DEL under H8-1 + H8-2**, with `--patch floor-v7.patch` | **PASS 85 gated rows**, 0 hits, 1,089 text files in scope, 82 of the patch's 88 paths exist and are read. REPORTED 20 (`del-H8-fv7.log`) | **floor v6 under the same declaration and patch: FAIL 3 of 85** (`del-H8-fv6-plant.log`): `forms-seam.test.ts:24` `--input-on-glass` (deleted-name arm), `forms-seam.test.ts:91` `0.48` with ink perimeter (`--ink-perimeter` 0.48 → 0.52), `liquid-fill.css:74` `14px` with glass blur quiet radius (14px → 10px). These are H8's three sites (`H8-records/del-H8-fv6.log`), one for one |
| floor v7 against H8's stand-in `fv6fix` | every gated row line and all 20 REPORTED lines are identical (`diff` exit 0 on both) | — |
| DEL, `deletes-floor.json` alone, `--patch` (no exact list) | FAIL 5 of 16: `glass-subtlety.test.ts:192`, `GlassDock.posture.test.ts:153, 155`, `scale-paper.css:90`, `deep.css:69` (`del-floor-fv7.log`) | the bite of the site entries: exactly the lines they exempt, and nothing else |
| **LAW** | **PASS 63 gated rows** (`law.log`; H8's 62 plus this seat's `FV7-run.sh`) | the self-test plants (H8 §3) |
| **census** | `LIGHTING-CENSUS stacked=0 halo=0 blur=0 open=0`, exit 0 | **HEAD, the 10.1.0 source: `stacked=2 halo=2 blur=5 open=9`, exit 1**, R-5's bite exact |
| **HOV** | **PASS 58 gated rows** | — |
| LIT | REPORTED `halo=5 near=1 stacked=10 chain=3 open=19 frames-halo=0/0`, the 19 inherited, none added (FV6's reading) | — |
| **ladder `diff`** | `diff radii-fv7 radii-minor5` prints nothing, exit 0. `diff radii-fv6 radii-fv7` prints nothing | `diff radii-head radii-minor5` exit 1: HEAD 10/14/16/20/22 against 6/10/12/18/20 |

The REPORTED arm prints `DESIGN.md:521`, `DESIGN.md:1805`, `docs/canon/glass-system.md:50, 51, 60`, `CHANGELOG.md:874` and the `MIGRATION.md` history lines, as on H8's stand-in (H8 §1.5).

---

## 3 · The byte-identity proof (P7-2.2): both outputs identical, no normalisation

Floor v7, floor v6 and floor v7 again were each built by `harness/build.mjs --demo` under one label (`same`) in the worktree, one after the other, with every swap checked by `cmp`. Each output was moved aside before the next build. Each build's `build.json` records the tree it read: `srcDirtyFiles` reads 58 for floor v7 and 57 for floor v6, the one-file difference being `liquid-fill.css` (`same.log`, 13:31:33-13:31:39, load 21.5 → 20.4).

| output | floor v6 against floor v7 | floor v7 against floor v7, rebuilt | against pass 7's banked floor v6 (`pass-7/FV6-records/same-fv6-*.sha256`) |
|---|---|---|---|
| **specimen dist** (`index.html`, `index-*.js`, `index-DyuSrJvX.css`) | **`diff -rq` exit 0; sha256 lists identical.** CSS **391,121 B, sha256 `347288745da7cf97`** in both, FV6 §4's figure | exit 0 | CSS identical. The JS and `index.html` differ, and only through the worktree path in the JS's `//#region` comments (`.claude/worktrees/bl/D3/p7/floor6/wt/` then, `…/p8/floor7/wt/` now), which renames the hashed chunk that `index.html` cites. **With that path rewritten to pass 7's, floor v7's specimen JS hashes `24a1a250…0683007e`, byte for byte the banked floor v6 `index-RaLAMJS8.js`** (`bite.log`) |
| **dist-demo** (346 files) | **`diff -rq` exit 0; sha256 lists identical** | exit 0 | **identical** (`diff` exit 0): the demo prints no worktree path |

**The bite** (`bite.log`, 13:32:14-13:32:17, load 15.0): HEAD built the same way under the same label differs from floor v7 in both outputs (`diff -rq` exit 1: dist 5 lines, demo 261 lines; HEAD's specimen CSS 394,891 B, `b09b9e73a61b75b1`). A build that ignored the tree would read identical.

**Why it holds.** `forms-seam.test.ts` is in neither build. The `liquid-fill.css` edit is inside a CSS comment, which the CSS minifier strips, and that file is not a Vue SFC, so no scoped id is hashed from it. FV6's dist-demo move came from two SFC edits, and floor v7 edits no SFC.

**So every paint verdict of floor v6 carries to floor v7** (P-3, the thin-build rule). No browser ran, and no capture was taken.

---

## 4 · Toolchain (`toolchain.log`, 13:32:26-13:33:51)

| step | result | when, load |
|---|---|---|
| `vue-tsc --noEmit` | exit 0 | 13:32:34, 13.2 |
| `vite build` (library) | exit 0 | 13:32:40, 12.7 |
| `vue-tsc --noEmit -p tsconfig.test.json`, after the library build (P7-5's ordering) | exit 0 | 13:32:48, 12.7 |
| `vite build`, the dist-demo config | exit 0 | 13:32:50, 12.4 |
| `vitest run --maxWorkers=2` | **237 files, 2318 passed, 0 failed**, 10 expected-fail, 1 skipped (floor v6: 2318) | 13:33:50, 11.5 |
| `vitest run --maxWorkers=2 tests/components/field/forms-seam.test.ts` | 6 passed | 13:33:51, 11.5 |

---

## 5 · The 44 rows (floor v7; defaults applied, no variant selected)

The source of record for each carried status is Crit §6 (Reg P7-1.1). Floor v7's specimen and dist-demo are floor v6's bytes (§3), so every paint row carries. The rows R-17 moves are read here.

| # | row | status | evidence or counterexample | closes on |
|---|---|---|---|---|
| 1, 2, 4, 5, 7, 8, 10-19, 21, 22, 24 | RAW, M-1, M-2, M-2m, M-4, M-5, M-7, M-8, M-9, T, release, O-66 G2, O-66 G3, W-A, engines, plants, FL-13, O-87, STACK | **PASS (19)** | carried from Crit §3, §6 on byte-identical outputs (§3). Row 11 (release): this seat's toolchain (§4). Row 19: DEL's plant reds 3/85 under H8 (§2), and the paint plants carry on byte-identical specimens. Row 22: census 0, its 10.1.0 bite exact, LIT 19 inherited (§2). Row 18: M-2m's one Playwright WebKit cell is pass 7's guard-killed drift window, informational and owed to step 4 (Reg P7-5) | — |
| 3 | M-1x | OPEN | REPORTED under (a): content grey off paper (over black `#e2dcd7`, L 0.898, C 0.0095). `var-q11b` 21/21 on record; floor v6 as built reads `--q11 b` 12/21 (Crit §3.3) | **owner, Q-11 chrome clause**: (a) by its text, or (b) by selecting `pass-4/fv3/q11b.*` |
| 6 | M-3 | **PASS** | carried: H7-1, light Close ring 3.52 (Crit §2) | — |
| 9 | M-6 | OPEN | stepped 29/120; `--q1 a` PASS 88/88 in both engines (Crit §3.3) | **owner, Q-1**: (a) by selection |
| **20** | prose sweep of every touched file | **PASS** (closed this pass, the seat's score) | H8-1 at 0 over every file in scope, every touched path included, with its value arm: **PASS 85**. Floor v6 reds under it: **FAIL 3/85**, at Crit A-1's two sites plus `liquid-fill.css:74`. Every sentence in `forms-seam.test.ts` was read in full, and one more line was rewritten beyond H8-1's finds (§1.1, :93-94). Two site entries are proposed, not ruled (§1.3) | route: **R-17**, built; the critic rules the proposed entries |
| 23 | gestalt, O-62 frame | OPEN | unchanged: R-17 moves no specimen pixel (§3) | **owner: Q-11 content clause, Q-3, Q-14**, with the frames (Reg P7-4) |
| FL-1..FL-11, FL-13..FL-16 | the floor | **PASS 15** | carried (Crit §3, §2), byte-identical specimen | — |
| **FL-12** | prose sweep of every touched file | **PASS** (closed this pass, the seat's score) | as row 20 | route: **R-17**, built |
| N-1 | Q-1's ruling built | OPEN | (a) built; (c) is `pass-4/fv3/q1c.*` | **owner, Q-1** |
| N-2 | Q-11's ruling built | OPEN | (a) built; (b) is `pass-4/fv3/q11b.*` | **owner, Q-11 chrome clause** |
| N-3 | the dock's held halo | **PASS (attributed), both themes** | carried: M-2h 2/68, re-run twice in pass 7 | — |
| N-4 | the minor split's W-0.1 reading | **PASS** | carried (Reg P7-3). The minor v6 is step 3's | — |

**Count: 39 PASS, 5 OPEN = 0.886.** **Closed this pass: rows 20 and FL-12**, the seat's score, which the critic may overturn. **Opened: none.** **Route-owned open rows: 0.** **Waiting only on the owner: 5** (3, 9, 23, N-1, N-2).

### 5.1 · Which owner ruling closes each still-open row

| row | the ruling that closes it | how, on floor v7 |
|---|---|---|
| **3** M-1x | **Q-11, chrome clause** | (a) closes it by its text, with no build. (b) closes it by selecting `pass-4/fv3/q11b.*` (M-1x 21/21 on record), after which floor v8 is no longer byte-identical and runs the full battery in both engines |
| **9** M-6 | **Q-1** | (a) closes it by selection: `--q1 a` reads PASS 88/88 in both engines on the critic's capture, and floor v7's bytes are that capture's. (c) has no passing build (`--q1 c` FAIL 2/96, the `retune-bg` dark room) and needs a room-only reading and a room value |
| **23** gestalt, O-62 frame | **Q-11 content clause + Q-3 + Q-14**, with the frames | the owner's word over the frames in Reg P7-4. With "content grey accepted off paper", Q-3 (a) and Q-14 (a), it closes with no build. Q-11 content "not accepted" has no measured candidate and fires C″'s re-trigger (c). Q-14 (b) is built as R-2's deletion in the dark arm and re-reads row 12. Q-3 (c) re-reads every banked family's re-trigger |
| **N-1** Q-1's ruling built | **Q-1** | as row 9: (a) is built, so the ruling closes it |
| **N-2** Q-11's ruling built | **Q-11, chrome clause** | as row 3: (a) is built; (b) is the variant |

**The fixed point (Reg P7-6.4).** If the critic confirms rows 20 and FL-12, floor v7 reads 39/44 with only owner rows open. No route work can move them. The one-message sheet in Reg P7-4 (Q-1, Q-3, Q-11 both clauses, Q-14) is what remains. Its shortest path is Q-1 (a), Q-3 (a), Q-11 (a) for chrome, grey content accepted off paper, and Q-14 (a). That closes all five with no build and no browser, because floor v7 already builds every default.

---

## 6 · Handed on

| to | what |
|---|---|
| the minor v6 (step 3) | H8 §4.3's conflict is untouched here. One input for that seat: this seat's G-F2 title is the form R-18 (iii) asks of the minor's `forms-seam.test.ts:91`, which is "names `--ink-perimeter` instead of 0.48". The minor's rung is 0.54 |
| the WebKit seat (step 4) | nothing new. Floor v7's specimen is floor v6's bytes, so pass 7's owed Playwright WebKit cells (plants, Close rings with the checker red's two re-runs, the dark drift window ×2) read floor v7 as well |
| the critic (step 5) | (1) §1.2's departure: a second file, `liquid-fill.css`, against R-17 (i)'s "only this file". (2) §1.1's extra line (:93-94), which H8-1's every-word reading does not reach. Check whether any other touched-file sentence carries an old literal beside part of a token's name. (3) H8's two proposed site entries, `scale-paper.css:90` and `deep.css:69` (§1.3). (4) The byte-identity proof, including the path-normalised tie to pass 7's banked JS (§3). (5) The 39/44 count |
| the owner | Reg P7-4's sheet, unchanged. No new frame is owed: floor v7 moves no pixel |
