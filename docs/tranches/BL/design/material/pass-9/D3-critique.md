# D3 · pass 9 · the critic: floor v8 37/44, the minor v7 green on its gates, the fixed point not reached

| field | value |
|---|---|
| seat | D3 pass 9, the fresh adversarial critic (`REGISTRY.md` P8-6.2 step 5). I authored nothing in D3. I applied floor v8 and the minor v7 in my own worktree, re-proved both compositions and both byte proofs, re-ran H9's self-test on my own trees, re-ran DEL and R-21's frozen list over both builds, read every line the floor list prints, checked R-20's four rewrites and the floor seat's three extra rewrites against the tree, checked R-23 against Crit8 §5.2's table, and ran the toolchain on both builds. I scored floor v8 on the fixed 44 rows and the minor v7 on W-0.1 G1-G7 and W-0.11 G1-G6 |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | worktree `.claude/worktrees/bl/D3/p9/crit/wt` cut at `ee48aa072` (the minor v7 bank, docs only). `git diff --stat 1da7eb17b HEAD -- src demo tests package.json scripts tests-visual vite.targets.ts .bundle-ratchet .published-roster DESIGN.md docs/canon` prints nothing (`crit-records/compose.log`), so every tree is the published 10.1.0 source plus the named patch |
| owner rulings | **None.** `audit/INBOUND.md` still ends at O-98. `FORMATION-PROGRESS.md`'s D3 lines after the pass-8 close are the pass-9 launch (500), the H9 bank (502), the floor v8 bank (503) and the minor v7 bank (504); none records a ruling on Q-1, Q-3, Q-11 (either clause), Q-12, Q-13 or Q-14. The P8-4 defaults apply. **Pass 9 cannot be clean** whatever the builds read (Reg P8-6.3) |
| engines | No browser ran, and I took no WebKit lock, as the task says. Both builds held raw byte identity in this session (§1), so every paint verdict carries (P8-2.2's thin-build rule): Chromium 149 gated on the headless shell, **Playwright WebKit** 26.5 paint-only, as read by FV6 §5, WK and earlier critics. The informational WebKit dialog cell stays owed (FV8 §6) and holds nothing. **Every real-Safari cell: UNMEASURED (owner's safaridriver checkbox)** |
| records | `D3-crit-run.sh` (every command, by phase: `setup`, `compose`, `declare`, `del`, `sweep`, `same`, `same-m6`, `toolchain-fv8`, `toolchain-m7`, `teardown`), `crit-records/` (`phases.log` has each phase's time and 1-minute load; the logs named below; `bound-check.py` and `.log`) |
| machine law | Every phase ran through `~/.claude/guard/guarded` as the literal command word: the static phases and the H9 self-test under `--light`, and `same` (`--timeout 45`, which waited for headroom at load 46), `same-m6` and the two toolchain phases (`--timeout 30`) as heavy runs, one at a time, with no browser. vitest ran with `--maxWorkers=2`. The kernel-zone refusal never fired. The 1-minute load ran 17.1-43.3 (`phases.log`). No red cell is a timing cell, so none needed a load re-run; every red below is a text reading that reproduces at any load |
| fences | No edit to tracked source in the checkout and no git write in it beyond `git worktree add` / `remove` for my worktree. Patches were applied only in the worktree, each `cmp`-checked. Builds and caches lived in `$W/.d3out` and `$W/.cache-crit`. The only checkout writes are this file, `D3-crit-run.sh` and `crit-records/`. I read no sibling repo |

Short citations: `Reg` (`REGISTRY.md`, the pass-8 part), `H9` (`pass-9/H9.md`), `FV8` (`pass-9/FLOOR-V8.md`), `MS7` (`pass-9/MINOR-SPLIT-v7.md`), `Crit8` (`pass-8/D3-critique.md`). `§n` after them is their section.

---

## 0 · Verdict

| route or build | verdict | rows | clean? |
|---|---|---:|---|
| **floor v8** | **ADVANCE**, 0.841 | **37/44** (the seat scored 39) | **no** |
| **the minor v7** | W-0.1 G1-G7 **PASS** (G1 off paper REPORTED; G6 per R-9); W-0.11 G1-G6 **PASS**, all carried on bytes I re-proved raw-identical to the minor v6's in one session | — | — |

**Rows 20 and FL-12 stay open under R-21 itself, on a line R-21 (b) prints.** Floor v8's own R-20 (i) rewrite adds a clause that R-20 did not rule and that the tree contradicts: `surfaces-pager.css:33-34` "The composition is the same in both themes, with no ink, clamp or oklab mix; **only `--card` differs between them**." The floating rung's α is `--glass-bound`, which the dark scope re-derives from its own ground, ink and pole (`dark-arm.css:268-273`, `glass.css:241-244`): **0.8910 light, 0.8731 dark** (`crit-records/bound-check.log`, and the registry's own Q-3 line, T 0.110 / 0.125). So `--card` is not the only thing that differs. The line prints on "clamp", and the seat ruled it true on its absence clause alone (`FV8-rulings.json`). R-21 (a) reads 0 and its plant reds, but R-21 (b) holds one false printed line, so the row does not pass. **That is P8-6.4's third case**: the next pass is one more comment-only build, not a new instrument, and the driver puts R-21's list to the owner beside the sheet.

**The loop is not at its owner-gated fixed point.** It is one clause away. If the next comment-only build rewrites `:33-34` and the next critic finds no false printed line, floor v9 reads 39/44 with only rows 3, 9, 23, N-1 and N-2 open.

Everything else reproduced: both compositions, raw byte identity in this session, DEL with H9 (floor v8 PASS 101, floor v7 FAIL 6/101), the list's counts, H9's 46 self-test rows on my trees, and the toolchain on both builds.

---

## 1 · Byte identity (R-22), re-proved, and the toolchain

### 1.1 · Composition (`compose.log`, 18:48:13, load 17.1)

| check | result |
|---|---|
| `floor-v7.patch` (88 files, sha1 `4a1e09c8`) + `floor-v8-delta.diff` (7 files, `1e0bba88`) applied in the worktree | `git diff HEAD --binary` equals `floor-v8.patch` (`0d104e63`) byte for byte |
| `minor-split-v6.patch` (59 files, `4ea01c0e`) + `minor-split-v7-R23.diff` (9 files, `0cf8056f`) | equals `minor-split-v7.patch` (61 files, `3a7a8eec`) byte for byte |
| `git apply --check` at the checkout's `ee48aa072`, read only | floor v8 exit 0; minor v7 exit 0 |

### 1.2 · Raw identity in one session (`same.log` 18:53:31-18:53:50, load 27.4 → 26.8; `same-m6.log` 18:54:51-18:55:03, load 24.9 → 31.4)

Floor v8, floor v7, the minor v7, HEAD, the minor v6 and the minor v7 again were each built by `harness/build.mjs --demo` under one label (`same`) in my worktree, each after `use <patch>` reset the worktree to HEAD and applied the patch, `cmp`-checked.

| pair | specimen dist (3 files) | dist-demo (346 files) |
|---|---|---|
| floor v7 vs floor v8 | **`diff -rq` exit 0** | **exit 0** |
| minor v6 vs minor v7 | **exit 0** | **exit 0** |
| minor v7 vs minor v7 rebuilt | exit 0 | exit 0 |
| HEAD vs floor v8, HEAD vs minor v7 (the bite) | exit 1 | exit 1 |

Specimen CSS: floor v7 and floor v8 **391,121 B `347288745da7cf97`**; the minor v7 **398,432 B `e11613c3eeb45cab`**; HEAD 394,891 B `b09b9e73a61b75b1`. All are the banked figures (FV7, MS6). The dist-demo sha256 lists equal pass 8's banked floor v7 and minor v6 lists exactly (`same-demo-fv7banked-fv8.txt`, `same-demo-m6banked-m7.txt`: 0 lines).

**R-22's reading: its first branch holds for both builds.** Every floor v7 and minor v6 paint verdict carries. No dock bite and no battery is owed.

**One seat claim does not reproduce, and it carries nothing (recorded, M-1).** FV8 §4 and MS7 §3 tie their specimen JS to pass 8's banked hash by rewriting the worktree path in the `//#region` comments. From my worktree that tie fails twice. Rewritten to `p8/floor7` my floor v8 JS hashes `a24f4ba3…`, against the banked `06edc55a…`. Rewritten to the floor seat's own `p9/floor8`, it hashes `4903545d…`, against FV8's banked `ff03077b…`. The minor reads the same way (`399323…` and `cb0a5e…`, against `929393…` and `baa2bf…`). The rewrite leaves no worktree path behind (129 occurrences, all rewritten), so the specimen JS carries some other path-dependent byte. The tie is not a portable proof. R-22's text asks for the same-session pair, which is what I measured, so no verdict moves. The class goes to §7.

### 1.3 · Toolchain (`toolchain-fv8.log` 18:55:25-18:57:40, load 25.2 → 24.9; `toolchain-m7.log` 18:57:47-18:59:59, load 27.2 → 43.3)

| step | floor v8 | the minor v7 |
|---|---|---|
| `vue-tsc --noEmit` | exit 0 | exit 0 |
| `vite build` (library) | exit 0 | exit 0 |
| `vue-tsc --noEmit -p tsconfig.test.json` | exit 0 | exit 0 |
| `vite build`, the dist-demo config (before the units) | exit 0 | exit 0 |
| `vitest run --maxWorkers=2` | **237 files, 2318 passed**, 0 failed, 10 expected-fail, 1 skipped | **239 files, 2321 passed**, 0 failed, 10 expected-fail, 1 skipped |

---

## 2 · H9 checked

### 2.1 · Reproduced (`del.log` 18:47:23-18:47:40, load 21.6 → 19.9; `selftest-h9.log`, load 39.8)

| reading | result |
|---|---|
| my declaration from `floor-v8.patch` on my floor v8 tree | **IDENTICAL** to the seat's `declare-floor-v8.json` (73 names) |
| DEL, floor v8 (fixture) | **PASS 101** |
| DEL, floor v7 (plant) / HEAD | **FAIL 6 of 101** / FAIL 89 of 101 |
| DEL, H9's own declaration (`declare-floor-v7-on-fv8.json`, `floor-v7.patch`) on floor v8 | **PASS 100** |
| DEL, `deletes-minor.json` + `minor-split-v7.patch`: minor v7 / minor v6 / minor v7 + `MS7-r21b-proposed.diff` | **PASS 54** / FAIL 8 of 54 / PASS 54 |
| H7-3 (no patch): minor v7 / minor v6 | PASS 42 / FAIL 2 of 42 |
| LAW, census, HOV | LAW PASS 74 (FV8's 72, MS7's script and mine); census `stacked=0 halo=0 blur=0 open=0` on both builds, HEAD `2/2/5/9` exit 1; HOV PASS 58 on both |
| **H9's self-test on my trees** (`--only H9-1..H9-6`, `--h9-trees` holding my fv7, my real floor v8 in the stand-in's place, and the minor v6 and v7) | **`SELFTEST PASS: 46 expectations met`**, 0 BAD (H9-1 9, H9-2 11, H9-3 9, H9-4 6, H9-5 3, H9-6 8). The stand-in's rows pass on the real floor v8 |

### 2.2 · H9's departures (H9 §8), ruled

| departure | ruling | why |
|---|---|---|
| a fourth phrase, `tint legibility seam` (§1.3) | **upheld** | the same deleted mechanism; its word form reads exactly one line on floor v7 (`index.css:80`) and none on floor v8 |
| the nine homonym sites (§1.2) | **upheld**, with one note | each is a live gate name, the live feedback-tone seam, or the live accent axis. `music-staff/README.md:60` is the folio's own `--card` re-point (`music-staff/styles.css:59-66`), so it is a homonym, not the clamp. Its `why` names the landing docs pass, and the entry keeps it on the record, not hidden |
| the rung reading printed, not gated (§2.3) | **upheld** | it cannot tell "paints 22" from "painted 22", and R-21 (b)'s reader does that. On floor v8 it prints 4 lines, all history |
| `Surface.test.ts:164` as history (§2.4) | **upheld** | "RED at the first cut's bytes … against plain 10 / 14 / 16 / 20 / 22" is dated and past tense, as Crit8 §2.3 read it |
| R-23's site list amended: `sheet/styles.css:197` dropped (arm-true), `Surface.test.ts:164` added (§3.2) | **upheld** | P8-5 H9-3's own text ("which then needs no site entry"); an entry there would exempt nothing and FAIL as stale |
| the three H8 rows re-read under H9 (§7.2) | **upheld** | nothing loosened: floor v6 now reds at A-1's sentences too, which it carries |

---

## 3 · R-20 and R-21 against the tree: rows 20 and FL-12

### 3.1 · R-20's four sentences, read in floor v8

| R-20 | floor v8 | reading |
|---|---|---|
| (i) `surfaces-pager.css:29-36` | "The pill applies `glass-plate` at the floating rung: one `--card` pole composed at the ELEMENT … The composition is the same in both themes, with no ink, clamp or oklab mix; only `--card` differs between them. `--glass-level` defaults to 1 …" | **R-20's ruled terms are true:** `glass-plate` is `color-mix(in srgb, var(--card) calc((1 − (1 − rung)·level)·100%), transparent)` (`veil.css:64-74`); the rule sets `--glass-veil-tier: var(--glass-veil-floating)` (`:40`); `--glass-level` registers `initial-value: 1` (`property-regs.css:154-158`); the `.dark` arm is box-shadow only (`:59-63`). **The added clause is false (A-1 below)** |
| (ii) `GlassDock.vue:467-469` | "reads the bound dock/search.css composes at the element (≥4.5:1, the bound)" | **true**: `dock/search.css:3-9` in the file's own words, and `:45` `@apply glass-plate` |
| (iii) `dock/styles/index.css:79-83` | "the active field, which holds the bound, ≥4.5:1 … CONSUMES `glass-plate` + the menu-row recipe" | **true**: `search.css:45` and `:58-60` |
| (iv) `glass-deep.css:12-14`, `:54` | the ladder named by its tokens; "then painted 22", "then retuned" | **true**: past tense, no tuple; DEL's tuple row reads 0 |

### 3.2 · A-1 · `surfaces-pager.css:33-34`, a false clause on a printed line

The line reads `with no ink, clamp or oklab mix; only \`--card\` differs between` and prints in R-21 (b)'s list on "clamp" (`sweep-fv8.log`). The seat's ruling for it says only "'no ink, clamp or oklab mix' states the absence on floor v8" (`FV8-rulings.json`). It does not read the second clause.

- **What the tree says.** The pill's α is `--glass-veil-floating` = `--glass-bound` (`tokens/glass.css:283`). The bound is declared on `:root, .dark` "because … a dark island re-derives from its own `--card-l`, `--on-glass-muted-l` and `--glass-bound-ground`" (`glass.css:241-244`). The dark arm sets `--glass-bound-ground: 1` and says "the bound … re-derives in this scope" (`dark-arm.css:268-273`). Three inputs differ by theme, not one.
- **What it computes to.** From those tokens (`bound-check.py`): **light 0.8910, dark 0.8731**. That agrees with Reg P8-4's Q-3 line, "chrome at the bound, T 0.110 light / 0.125 dark". So the pill paints a different α in each theme.
- **Why it binds the row.** R-21 passes the row when "every line (b) prints has been read and ruled true or rewritten". This line prints, and I read it false. It is not a find outside both lists, so R-21's carve-out ("does not reopen the row in the pass that finds it") does not apply. R-20 (i) asked for "the same composition in both themes", which is true of the expression. The seat added "only `--card` differs", which is false of its inputs.
- **The cure, comment only, for the next build:** strike the clause, or write what the tree does: "only `--card` and the bound it solves (re-derived per theme, tokens/glass.css) differ between them". It is in a non-SFC CSS comment, so raw identity follows (FV8 §4's reason).

### 3.3 · The other 213 printed lines

I read every line `sweep-fv8.log` prints (214 lines in 54 files, the same count the seat banked) against its context in the floor v8 tree. Re-run with the seat's rulings: **`PASS (214 lines, each ruled true)`**. On floor v7 under the same rulings it reads `FAIL (13 unread, 3 stale of 224 lines)` (`sweep.log`), as FV8 §3 says. I read in context the lines whose mechanism could be the patch's: `feedback-tone.css:34-39, 61-62`, `deep.css:18` (the per-instance fill-tint axis, `glass.css:164`), `grasp.css:131`, `liquid-fill.css:44-58`, `control-surfaces.css:34, 130`, `surface-axis.css:124` (the well's oklab tone-step, `glass.css:161`), `dark-arm.css:304`, `scale-paper.css:152`, `veil.css:36`, `glass.css:166`, `property-regs.css:122-123` (Crit8 §5.2's label). Each is true of floor v8. **Only `surfaces-pager.css:33` is false.**

**`dock/styles/dock.css:15`, ruled by the seat "true as to the patch" and reported.** The clause "The shell + adaptive-legibility partials re-point the inheriting `--dock-surface-blur`/`--glass-veil-*` tokens" is false at HEAD and on floor v8. Neither version of `adaptive-legibility.css` declares either token, and `shell.css:20` declares `--dock-surface-blur`. Under P8-1.1's precedent (stale at HEAD, not the patch's mechanism, recorded for the landing docs pass) I uphold it as recorded, not as a row. Two notes. Floor v8's patch rewrote this physical line (HEAD's `:14-16` became `:14-15`), so the next comment-only build can fix the clause at no cost. And a ruling file that calls a false line "true" is a record defect: the class goes to §7 (H10-2).

### 3.4 · The floor seat's three extra rewrites (FV8 §1.2), ruled

| rewrite | was false on floor v7? | the new wording | ruling |
|---|---|---|---|
| (v) `feedback-tone.css:20-22` | yes: the plate is srgb (`veil.css:64-74`), and `--veil-bg` is declared nowhere (`grep`: HEAD 1 hit, the line itself; floor v8 0) | true: `.feedback-tone` mixes in oklab over `var(--glass-veil, …)` (`:80-84`) | **upheld**. Its consequence, the declaration's 73rd name `--veil-bg`, is upheld too |
| (vi) `a11y-fallback.css:33-36` | yes: floor v8's plate has no ink (`glass-subtlety.test.ts:184` passes) | **`:34` "the level IS that α" is false in a new way**: at `--glass-level: 0.3` the floating α is 1 − (1 − 0.8910)·0.3 = **0.9673** light, 0.9619 dark (`bound-check.log`). The level scales α; it is not α | **upheld as a rewrite.** `:34` prints in neither list (no frozen word, no name), so under R-21 it is **reported for the next build** and does not reopen the rows. Cure: "and the level scales that α toward 1" |
| (vii) `glass-fx.css:1` | yes: the file declares no tint source | true: the capsule warm floor (`:106-114`) | **upheld** |

R-20's "No other sentence is rewritten by the seat" and R-21 (b)'s "ruled true or rewritten" collide exactly as the seat says. Rewriting is the reading that leaves no printed line false (E-2), as FV7's precedent was upheld.

### 3.5 · The two rows

| row | R-21 (a) DEL with H9 | predecessor reds | R-21 (b) every printed line true | status |
|---|---|---|---|---|
| **20** | PASS 101 (and 100 under H9's declaration) | floor v7 FAIL 6/101 | **no: `surfaces-pager.css:33`** | **OPEN** |
| **FL-12** | as row 20 | as row 20 | as row 20 | **OPEN** |

---

## 4 · The 44 rows (floor v8; defaults built, no variant selected)

| # | row | status | evidence or counterexample | closes on |
|---|---|---|---|---|
| 1, 2, 4, 5, 7, 8, 10-19, 21, 22, 24 | RAW, M-1, M-2, M-2m, M-4, M-5, M-7, M-8, M-9, T, release, O-66 G2, O-66 G3, W-A, engines, plants, FL-13, O-87, STACK | **PASS (19)** | carried from Crit8 §4 on outputs raw-identical in one session (§1.2). Row 11: my toolchain (§1.3). Row 19: DEL's plant reds floor v7 6/101, and H9's 46 self-test rows hold on my trees. Row 22: census 0, HEAD `2/2/5/9` | — |
| 3 | M-1x | OPEN | REPORTED under (a): content grey off paper. `var-q11b` 21/21 on record, both engines | **owner, Q-11 chrome clause**: (a) by its text, or (b) by selecting `pass-4/fv3/q11b.*` (then the full battery in both engines) |
| 6 | M-3 | **PASS** | carried: H7-1, Chromium light Close ring 3.52 (Crit8 §4) | — |
| 9 | M-6 | OPEN | stepped 29/120; `--q1 a` PASS 88/88 in both engines | **owner, Q-1** (a) by selection |
| **20** | prose sweep of every touched file | **OPEN** (the seat scored PASS) | §3.2: `surfaces-pager.css:33`, printed by R-21 (b), read false | route: **one comment-only build** under R-21 |
| 23 | gestalt, O-62 frame | OPEN | unchanged: floor v8 moves no specimen pixel | **owner: Q-11 content clause + Q-3 + Q-14**, with the frames |
| FL-1..FL-11, FL-13..FL-16 | the floor | **PASS 15** | carried on raw-identical specimens | — |
| **FL-12** | prose sweep of every touched file | **OPEN** (the seat scored PASS) | as row 20 | as row 20 |
| N-1 | Q-1's ruling built | OPEN | (a) built; (c) is `pass-4/fv3/q1c.*` (FAIL 2/96, both engines) | **owner, Q-1** |
| N-2 | Q-11's ruling built | OPEN | (a) built; (b) is `pass-4/fv3/q11b.*` | **owner, Q-11 chrome clause** |
| N-3 | the dock's held halo | **PASS (attributed), both themes** | carried: M-2h 2/68 | — |
| N-4 | the minor split's W-0.1 reading | **PASS** | §5 | — |

**Count: 37 PASS, 7 OPEN = 0.841.** **Closed this pass: none. Opened: none.** **Route-owned: 2** (20, FL-12). **Waiting only on the owner: 5** (3, 9, 23, N-1, N-2), each closed by the ruling named. **Pass 9 is not clean**, on both counts: two route rows are open, and no ruling has arrived.

---

## 5 · The minor split v7 (minor_gates)

### 5.1 · R-23 against Crit8 §5.2's table

| Crit8 §5.2 | the minor v7 | reading in the minor v7 tree |
|---|---|---|
| 3 site entries | `overlay-plate.css:173`, `deep.css:73`, **`Surface.test.ts:164`** (`sheet/styles.css:197` dropped) | upheld (§2.2): DEL PASS 54 with each site exempting a hit, `:197` printing `arm-true` |
| `DESIGN.md:1805` | "(`--ink-seam`, `--ink-edge`, `--ink-perimeter`, in ascending order)" | true: 0.08 / 0.16 / 0.54 (`color-radius.css:152-154`), dark 0.0923 / 0.1846 / 0.60 |
| `liquid-fill.css:76`, `forms-seam.test.ts:95` | the 14px and 0.48 literals gone | true |
| `Button.test.ts:146`, `feedback-tint-seam.test.ts:11` | "the earned-ink clamp" | true: R-13's register |
| `adaptive-legibility.css:61-62`, `:65` | "the warm-white surface base of the light plate"; "The self-engage is the floor" | true: `:50-60` |
| `surfaces-pager.css:34-36` | the tint arm and the oklab clause gone (MS7 §1.1's fold, upheld) | true, but **the fold dropped a closing parenthesis**: the comment opens 4 and closes 3 (minor v6: 4 and 4). "(darker in dark, …" never closes. It is cosmetic, not false: reported for the minor v8 |
| `property-regs.css:154-155` | "rides this knob alone: `prefers-contrast: more` sets `--glass-level: 0.3` … and writes no veil token" | true: `a11y-fallback.css:37-47` writes `--glass-level` and `--glass-definition`, no veil token. The file itself calls definition a joiner of "the level escape", so "this knob alone" stands for the escape |
| `glass-deep.css:12-13`, `:54` | floor v8's wording, byte for byte | true |
| kept: `property-regs.css:124`, the minor's "tint seam" lines | unchanged | true in the minor, which keeps the clamp |

**R-23 is built as ruled**, with H9-3's amendment. P8-3.3 item 3 is closed.

### 5.2 · The minor seat's departures, ruled

- **§2.1, three names (39 → 42):** upheld. Each phrase hits only R-23 sites on the minor v6, and H7-3 then tells the minor v6 (FAIL 2/42) from the minor v7 (PASS 42).
- **§2.2, a value-arm site reads `not read` without `--patch`:** upheld. The gated read of the minor is with `--patch` (R-23's fixture). A name-keyed site still goes stale either way, and the self-test holds both.
- **§4.3, `MS7-r21b-proposed.diff`: taken.** Both lines print in R-21 (b), and both are false because of the minor. `DESIGN.md:34` says dark tints are denser, but the minor's light rungs are ≥ the solved bound (`glass.css:54-57`) and the dark rungs subtract steps from the base (`dark-arm.css:279-282`). `surface-axis.css:21-22` zeroes "the tint axis", which the minor deletes. With the delta, the list reads **`PASS (371 lines, each ruled true)`**, and DEL reads PASS 54 (`sweep-m7p-ruled.log`, `del-minor-m7p.log`), both read here. The bytes stay identical by MS7 §3's build; I did not rebuild the m7p tree, so that figure is the seat's. **The minor v8 = the minor v7 + `MS7-r21b-proposed.diff` + the closing parenthesis at `surfaces-pager.css:36`.**
- **§4.2, the 10 REPORTED lines:** upheld as HEAD-stale and not the minor's mechanism, under the same record defect as `dock.css:15` (§7, H10-2).

R-21 (b) on the minor v7 as banked: `FAIL (2 unread, 0 stale of 371 lines)` (`sweep-m7-ruled.log`); the minor v6 plant `FAIL (15 unread, 5 stale of 379 lines)` (`sweep-m6-plant.log`). Both reproduce MS7 §4.

### 5.3 · The gates (minor_gates), carried where the bytes hold

The minor v7's specimen dist and dist-demo are raw-identical to the minor v6's in my session (§1.2), so every verdict Reg P8-3.1 records carries.

| gate | verdict | basis |
|---|---|---|
| **W-0.1 G1** M-1 | **PASS** over paper (11/11, both engines); off paper REPORTED 48/66 | carried; Q-11 content clause unruled |
| **W-0.1 G2, G3** O-66 field and row | **PASS** | carried; HOV 58 read here |
| **W-0.1 G4** W-A light | **PASS** (108/108, thinnest α 0.890) | carried |
| **W-0.1 G5** scope | **PASS**; ratchet rebind owed at landing (+2,333 B, MS7 §6) | library build exit 0 here; R-23 is comments |
| **W-0.1 G6** per R-9 | **PASS** (13 dark composites, worst ΔE 0.0000; raw 1/13 at 0.0022 printed) | carried |
| **W-0.1 G7** M-2 and M-3 halves | **PASS**, 0 regressions | carried |
| **W-0.11 G1-G4** | **PASS**: census `stacked=0 halo=0 blur=0 open=0`; HEAD `2/2/5/9` | read here |
| **W-0.11 G5** | **PASS** | as W-0.1 G5 |
| **W-0.11 G6** | **PASS** (M-2 720, M-3 214 HEAD-PASS, 0 regressions) | carried |
| units | 239 files, **2321 passed**, 0 failed | read here |

**Can W-0.1 and W-0.11 ship from the minor v7 in 10.2.0? No.** The reasons: the entry gate is 0 of 2 clean passes; Q-11's content clause is unruled; the minor v8's comment-only delta (§5.2) is not yet built; the landing's own items (R-9 into G6's text, one probe per gate, the ratchet); and D2 (O-88). MS7 §7.3 has the arithmetic right. The earliest landing is the second consecutive clean pass after the owner answers the P8-4 sheet, not pass 10.

---

## 6 · The fixed point

P8-6.4 promised the fixed point "if pass 9 closes rows 20 and FL-12 and the sheet is still unanswered". Pass 9 did not close them. The open set is rows 20 and FL-12 (route) plus 3, 9, 23, N-1 and N-2 (owner). The route rows now hang on **one clause** that the same build introduced. The prose-row instrument did its job: R-21 (b) printed the line, and the defect is in the reading. The loop does not need a new instrument. It needs a build that writes only what its ruling asks, and a ruling file that reads every clause of a printed line.

What each owner row waits on, unchanged (Reg P8-4): **Q-1** closes 9 and N-1 by selecting (a). **Q-11, the chrome clause,** closes 3 and N-2 by (a)'s text or by selecting `fv3/q11b.*`. **Q-11's content clause with Q-3 and Q-14** closes 23 on the owner's word over the frames.

---

## 7 · Next-pass classes (no row added)

| id | class | found by | placed |
|---|---|---|---|
| **A-1** | a build's own rewrite adds a claim its ruling did not ask for (`surfaces-pager.css:33` "only `--card` differs"), and the seat's ruling reads only the ruled clause | §3.2 | **build (R-24, comment only):** rewrite `surfaces-pager.css:33-34` as §3.2 says; in the same build, `a11y-fallback.css:34` ("the level scales that α toward 1", §3.4) and `dock/styles/dock.css:15`'s attribution (a line floor v8's patch wrote, §3.3). The next critic reads R-21 (b) on floor v9; R-21 binds unchanged |
| **H10-1** | DEL reads an absent tree as PASS (E-2): `deleted-mechanisms.mjs --root <missing>` prints `PASS (42 gated rows)`, exit 0 | MS7 §8, reproduced (`del-absent.log`) | **instrument:** DEL refuses loud (exit 2) on 0 text files in scope, as H9-4 made the `rows.mjs` readers do. Plant: the absent root. The printer already fails on an absent root under `--rulings` (`sweep-absent.log`: 214 stale) |
| **H10-2** | R-21's ruling file has one verdict, so a HEAD-stale false clause is filed as "true as to the patch" (`dock.css:15`; the minor's 10 REPORTED lines carry a `why` prefix as a workaround) | §3.3, §5.2 | **instrument:** `--rulings` takes `verdict: true \| reported`. A `reported` line prints in its own tally, gates nothing and goes stale like any ruling, so the record never calls a false line true. The landing docs pass reads the `reported` tally |
| **M-1** | the path-normalised JS tie to a banked hash (FV8 §4, MS7 §3) does not reproduce from another worktree path: the specimen JS carries a path-dependent byte beyond the `//#region` strings | §1.2 | **ruling on measurement:** R-22's proof is the same-session pair. A banked tie cites only the specimen CSS hash and the dist-demo sha256 list, which are path-free and reproduced here |
| — | the minor v7's two FALSE lines and the dropped parenthesis | MS7 §4.3, §5.1 | **build: the minor v8** = minor v7 + `MS7-r21b-proposed.diff` + the parenthesis; raw identity expected |
| — | the informational WebKit dialog cell | FV8 §6 | owed again, holds nothing; the driver queues it in the first seat of pass 10 |
| — | `dock.css:15` if not taken into R-24, the minor's 10 REPORTED lines, and Crit8's list (`property-regs.css:162-165`, `DESIGN.md:516, :521`, `docs/canon/glass-system.md:50, 51, 60`, `music-staff/README.md:60`) | FV8 §1.2, MS7 §4.2, Crit8 §3 | landing docs pass. Not rows |

---

## 8 · Known limits

- I read all 214 floor lines against their context, and the ones that name a mechanism against its source. For the minor's 371 lines, I re-ran the seat's rulings and read R-23's sites, the two FALSE lines and a sample of the REPORTED ten. I did not rule each of the 359 true lines independently.
- A false sentence with no frozen word and no declared name escapes both of R-21's lists, as `a11y-fallback.css:34` did. Under R-21 such a find is reported and built, and it does not reopen a row.
- I ran no browser. Every paint verdict is carried on raw-identical bytes, measured in one session.

---

## 9 · What would make pass 10 clean, and teardown

Pass 10 is clean at **0 open rows of 44** when:
- **R-24** is built comment only on floor v8 (§7 A-1), raw identity holds in one session, and the critic finds R-21 (a) at 0 and every line R-21 (b) prints true. That closes rows 20 and FL-12 and reaches the fixed point, 39/44;
- **the owner answers the P8-4 sheet**: Q-1 closes 9 and N-1; Q-11's chrome clause closes 3 and N-2; Q-11's content clause, Q-3 and Q-14 close 23.

Without the answers, pass 10 can reach the fixed point but cannot be clean. A pass after that re-measures the same tree, so P8-6.4 holds: launch the pass after the fixed point only when the answers arrive.

**Teardown** (`phases.log`, 19:02:03-19:02:20, load 30.2 → 30.0): `git worktree remove --force` of `.claude/worktrees/bl/D3/p9/crit/wt` and `git worktree prune`; `.claude/worktrees/bl/D3/p9/crit/` and the empty `p9/` are removed (`ls .claude/worktrees/bl/D3/` prints `p3 p5 p6`). `git worktree list` has no `D3/p9` entry, `git status --porcelain -- src demo tests DESIGN.md` prints nothing, and no process of this seat is running.
