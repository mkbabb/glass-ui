# D3 · pass 10 · CRITIQUE: floor v9 and the minor v8, read under R-21, R-26 and H10

| field | value |
|---|---|
| seat | D3 pass 10, the fresh adversarial critic (`REGISTRY.md` P9-6.2 step 4). I authored nothing in D3. I re-proved both builds' compositions and byte identity in my own worktree, re-ran DEL, the frozen list, H10's plants, the static checks and the toolchain on both trees, and read R-24's three rewrites and the printed lines most at risk under R-26 |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `503e81679` (the minor v8 bank, docs only). `git diff --stat 1da7eb17b HEAD -- src demo tests package.json scripts tests-visual vite.targets.ts .bundle-ratchet .published-roster DESIGN.md docs/canon` prints nothing (`crit-records/compose.log`), so every tree below is the published 10.1.0 source plus the named patch |
| owner rulings | **None.** `audit/INBOUND.md` still ends at O-98. `FORMATION-PROGRESS.md`'s D3 lines after the pass-9 registry (506) are the pass-10 launch (507) and the H10 and floor v9 banks (509, 510); none records a ruling on Q-1, Q-3, Q-11 (either clause), Q-14 or R-21. The P9-4 defaults apply. **Pass 10 cannot be clean** |
| engines | No browser ran, and I took no WebKit lock (the task says so). Both builds' outputs are raw-identical to their predecessors (§1.2), so every paint verdict carries: Chromium 149 gated, **Playwright WebKit** 26.5 paint-only. **Every real-Safari cell: UNMEASURED (owner's safaridriver checkbox)** |
| records | `D3-crit-run.sh` (every command, by phase), `crit-records/` (logs; `phases.log` carries each phase's time and 1-minute load), `crit-press-dark.py` (§3.2's arithmetic), `crit-pipe-truncation.mjs` (§2.2), and one PROPOSED delta for the agglomeration: `crit-fv10-proposed.py`, `crit-fv10-proposed.diff`, `crit-fv10-rulings.py`, `crit-fv10-rulings-proposed.json` (§5) |
| fences | No tracked source edited in the checkout and no git write in it beyond `git worktree add` / `remove` for `.claude/worktrees/bl/D3/p10/crit/wt`. Patches moved in the worktree only by `git apply` / `git apply -R`, each state checked by `cmp` against its patch. Builds and caches in `$W/.d3out` and `$W/.cache-crit`. The only checkout writes are the new files under `pass-10/` named above. Nothing ran in a sibling repo |
| machine law | Every phase ran through `~/.claude/guard/guarded` as the literal command word: `setup`, `compose`, `declare`, `del`, `sweep`, `selftest` under `--light` (no browser, no build); `same` (`--timeout 60`), `toolchain-fv9` and `toolchain-m8` (`--timeout 60` each, run one after the other), `proposed-same` (`--timeout 30`) as heavy runs, one at a time. vitest `--maxWorkers=2`. No kernel-zone refusal fired. The 1-minute load ran 24.2 to 84.8 from other sessions; nothing here is a timing |

Short citations: `Reg` (`REGISTRY.md`, P9-0..P9-6), `H10`, `FV9` (`FLOOR-V9.md`), `MS8` (`MINOR-SPLIT-v8.md`), `Crit9` (`pass-9/D3-critique.md`). `§n` after them is their section.

---

## 0 · Verdict

| route or build | rows | clean? | why |
|---|---:|---|---|
| **floor v9** = floor v8 + R-24 | **37/44 = 0.841**, ADVANCE (the seat: 37) | **no** | R-24's three rewrites are built word for word and read true. Rows 20 and FL-12 stay open under R-21 (b): beside the seat's `icon-button.css:118-120`, **five more printed lines the seat ruled `true` are false, and the patch made each false** (A-1..A-3, §3). Five rows wait on the owner |
| **the minor v8** = minor v7 + R-25 | W-0.1 G1-G7 and W-0.11 G1-G6 **carried PASS** on raw-identical bytes | — | R-25 is built; the parenthesis departure is upheld. MS8's four false lines are confirmed and `MS8-r26-proposed.diff` is **taken** (§4) |

- **Pass 10 is not clean** on both counts: two route rows are open, and no owner ruling has arrived. **Two-clean count: 0 of 2.**
- **The owner-gated fixed point is not reached.** It needs 39/44 with only rows 3, 9, 23, N-1 and N-2 open; floor v9 has rows 20 and FL-12 open as well. This is P9-6.4's third case for the second time: the next build is again comment only, and **R-21's line beside the sheet is now the owner's to settle before any pass after pass 11.**
- One new defect class sits in the build's reading, not its words: **a value change the patch makes falsifies a sentence that never names the changed token** (it names an alias, sits on the lines above the declaration, or describes a ladder relation). The seat's `value-changes-vs-printed` aid only searched printed lines that name a changed token, so all five of my finds fell outside it (§3.4). One instrument class goes to the harness: **the harness tools lose stdout through a pipe** (§2.2).

---

## 1 · The builds, re-proved

### 1.1 · Composition (`compose.log`, 20:12:36, load 44.7)

| claim | read here |
|---|---|
| `floor-v8.patch` (`0d104e63`) + `floor-v9-delta.diff` (`1f9190a2`) = `floor-v9.patch` (`697c5f78`, 88 files) | worktree diff `cmp` exit 0; path list = floor v8's (exit 0) |
| `minor-split-v7.patch` (`3a7a8eec`) + `minor-split-v8-R25.diff` (`7540ff70`) = `minor-split-v8.patch` (`a843b388`, 61 files) | `cmp` exit 0; path list = minor v7's (exit 0) |
| R-25's "nothing else": the minor v8 = the minor v7 + `MS7-r21b-proposed.diff` (`ccee3e30`) + one `)` | the two worktree diffs differ in **one line only**: `…in both themes; one` → `…in both themes); one` |
| `git apply --check` at `503e81679`, read only in the checkout | floor v9 exit 0, minor v8 exit 0 |

### 1.2 · Identity under R-22 and R-27 (`same.log`, 20:19:09-20:19:30, load 30.0 → 81.7)

Floor v9, floor v8, the minor v8, the minor v7 and HEAD, each built by `harness/build.mjs --demo` under one label in one session, from one directory:

| pair | specimen dist | dist-demo | R-27's tie to the bank |
|---|---|---|---|
| floor v8 / floor v9 | `diff -rq` exit 0; CSS 391,121 B `347288745da7cf97…` both | `diff -rq` exit 0, 346 files | CSS hash = `pass-9/FV8-records/same-fv8-dist.sha256`'s; demo sha256 list = `same-fv8-demo.sha256` (`diff` exit 0) |
| minor v7 / minor v8 | exit 0; CSS 398,432 B `e11613c3eeb45cab…` both | exit 0, 346 files | CSS hash = `MS7-records/same-m7-dist.sha256`'s; demo list = `same-m7-demo.sha256` (exit 0) |
| bite: HEAD / floor v9, HEAD / minor v8 | exit 1 (HEAD CSS 394,891 B `b09b9e73a61b75b1`) | exit 1 | — |

**Both seats' identity proofs hold, and every paint verdict carries.** No specimen JS hash is cited (R-27). The first `same` run in this seat failed in my own script (a shell variable clobbered inside a helper; it built and moved nothing usable) and was re-run after the fix; the log above is the re-run.

### 1.3 · Toolchain (`toolchain-fv9.log`, `toolchain-m8.log`)

| step | floor v9 (20:21:09-20:23:21, load 30.7 → 29.1) | minor v8 (20:23:28-20:25:43, load 29.6 → 25.7) |
|---|---|---|
| `vue-tsc --noEmit`, library build, test typecheck, dist-demo | exit 0 each | exit 0 each |
| `vitest run --maxWorkers=2` | **237 files, 2318 passed**, 10 expected-fail, 1 skipped | **239 files, 2321 passed**, 10 expected-fail, 1 skipped |

Both equal the seats' figures.

---

## 2 · DEL, the static checks, and H10

### 2.1 · Read here (`del.log` 20:13:00-20:13:21, load 43.0 → 47.7; `declare.log`)

| check | result |
|---|---|
| floor v9's declaration, rebuilt from `floor-v9.patch` on my tree | **IDENTICAL** to the seat's (`declare-floor-v9.json`, patch label aside) |
| DEL (H8-H10), floor v9 / floor v8 / HEAD | **PASS 101** / PASS 101 / **FAIL 89 of 101** |
| H10-1: absent root, floor declaration · an empty directory, minor declaration | **exit 2**, `FAIL (nothing read: the tree does not exist)` · **exit 2**, `FAIL (nothing read: no text file in scope)` |
| DEL, minor declaration over `minor-split-v8.patch`: minor v8 / minor v7 / minor v8 + `MS8-r26-proposed.diff` | **PASS 54** each |
| H7-3, minor v8 (`src/ demo/`, no patch) | **PASS 42** |
| LAW | PASS 79 (two files more than the seats' runs: my run script and the proposed scripts sit under the scanned roots) |
| census floor v9 / minor v8 / HEAD | `stacked=0 halo=0 blur=0 open=0` both / HEAD `2/2/5/9`, exit 1 |
| HOV floor v9 / minor v8 | PASS 58 each |

### 2.2 · H10's plants, and one instrument class

`selftest.mjs --only H10-1,H10-2` on my own trees (fv7, fv8, minor7, minor7p cut here): **run 1 `SELFTEST FAIL: 1 of 34`**; runs 2 and 3 **`SELFTEST PASS: 34 expectations met`** (`selftest-h10-run{1,2,3}.log`, 20:13-20:16, load 47.5-48.4). Run 1's miss is the H10-2 row "the minor v7 reads 2 unread of 371", whose captured output ended mid-list at `48 |` with no tally or verdict line, though the process exited 1 as expected.

**The cause, reproduced (`crit-pipe-truncation.mjs`, `pipe-truncation.log`):** `prose-sweep.mjs` run six times through `spawnSync`'s pipe, as the self-test runs it, returned 211,727 bytes four or five times in six and **156,280 or 141,102 bytes** otherwise (two of twelve runs, load ≈ 40), the tally and the verdict line lost. The tool prints with `console.log` and leaves with `process.exit()`. On macOS, Node writes to a pipe asynchronously, so `process.exit()` drops whatever is still queued. A file redirect is synchronous, which is why every seat log (`> file`) is whole. `deleted-mechanisms.mjs` exits the same way (`:271`, `:316`).

So H10's plants hold (34/34 twice), and the one red is not a defect in H10-1 or H10-2. It is an instrument class of its own, E-2: **a self-test row or a `| tee` reader can read a truncated verdict**, and a row that checks only the exit code would pass on half a list. It goes to the next pass's instrument list (§6), not to a row.

### 2.3 · H10's six departures (H10 §5): all upheld

(1) SWEEP refuses an empty scope (exit 2, read here on an absent root): the same E-2 class at no cost. (2) verdicts as strings. (3) the four refusals; the lexical `REPORTED` refusal is limited, as H10 says, and §3.3 shows the limit biting. (4) `dock.css:15` migrated by name. (5) generators migrated with their JSON. (6) the real floor v8 in the self-test. The migration changed no reading: the seats' sweeps under the migrated pass-9 files reproduce here (`sweep-fv9-under-fv8r.log`: `FAIL (3 unread, 3 stale of 214 lines)`, R-24's three lines, as FV9 §4).

---

## 3 · Floor v9 under R-21 (b) and R-26

### 3.1 · R-24, word for word

| R-24 | ruling's words | floor v9 | verdict |
|---|---|---|---|
| (i) `surfaces-pager.css:33-34` | strike "; only \`--card\` differs between them"; the sentence ends "…with no ink, clamp or oklab mix."; no clause replaces it | `:33` "with no ink, clamp or oklab mix." `:34` "\`--glass-level\` defaults to 1, …" | **built as ruled.** The sentence is true: `glass-plate` mixes `--card` alone in srgb (`veil.css:64-72`), one formula in both themes |
| (ii) `a11y-fallback.css:34` | "and the level IS that α" → "and the level scales its transmission: 1 − α = (1 − rung) · level" | `:34-35` carry exactly those words, three lines reflowed to three | **built as ruled, true**: α = 1 − (1 − rung)·level (`veil.css:66-70`), and the surrounding "70% of the way to solid" and "blur to 30% of its rung" (`tokens/glass.css:84-88`, radius × level) hold |
| (iii) `dock.css:15` | "The shell + adaptive-legibility partials re-point" → "The shell partial re-points" | `:15` as ruled | **built as ruled.** Its sentence is true on R-24's cited reading (`shell.css:20`, `:96-98`). Recorded, not a row: read literally, "re-points the inheriting `--dock-surface-blur`/`--glass-veil-*` tokens on `.glass-dock`" names a `--glass-veil-*` declaration on `.glass-dock`, and no dock partial declares one at HEAD or on floor v9 (`grep`: only `--glass-veil-tier` on `.dock-plate` and the search sheet). The shell points `--dock-plate-*-tier` at `--glass-veil-dock`. That half is HEAD text the patch did not write, so at worst it is `reported`. A next build that touches the line can say "points the plate's tier tokens at `--glass-veil-dock`" |

The delta is three files, +6/−6, comments only, and nothing else was written (`floor-v9-delta.diff` read in full). **Crit9 A-1 is closed.**

### 3.2 · The seat's counterexample, confirmed, and five more printed lines it ruled `true`

The sweep reproduces: floor v9 under `FV9-rulings.json` **`FAIL (3 unread, 0 stale of 214 lines)`**; floor v8 under the same `FAIL (6 unread, 3 stale)` (`sweep.log`, 20:13:28, load 49.3).

**FV9 §4.2 upheld.** `icon-button.css:118-120` calls `--dock-control-press-bg` "a tier below resting". On floor v9 the token is `oklch(from var(--foreground) l c h / var(--fill-selected))` (`sizing.css:259`), an ink, not a plate tier. At HEAD it was the resting plate stepped 7 % toward ink (`head sizing.css:261-265`). The patch changed the value and left the sentence.

R-26 asks for every clause of every printed line. The seat read 214 lines; I read the 20 lines the patch writes, the eight value-change lines, and every printed line in the dock-control, state-fill and plate families the patch re-valued. Each of the following prints, was ruled `true` in `FV9-rulings.json`, and is false on floor v9 because of the patch:

| id | printed line(s) | the false clause | floor v9 | HEAD |
|---|---|---|---|---|
| **A-1** | `src/components/dock/styles/controls/icon-button.css:95`, `:104` (word "tint") | "a translucent **card-tinted** fill is the hover affordance"; "the **card-tinted** hover fill carries the affordance" | the hover reads `var(--dock-icon-hover-bg, var(--dock-control-hover-bg))` (`:113`); `--dock-icon-hover-bg` is declared nowhere in `src/`, and `--dock-control-hover-bg` is `color-mix(in oklab, var(--foreground) 5%, transparent)` (`sizing.css:204`). The patch's own comment above it says "state is carried by ink" (`:201-203`). No `--card` is in the fill | `--dock-control-hover-bg: var(--glass-plate-resting)` (`head sizing.css:206`), `--card` at the resting α: true at HEAD. **The patch changed the value** (`--dock-control-hover-bg` is in FV9's 48 tokens), and the ruling's `why` restates the old reading |
| **A-2** | `src/styles/tokens/sizing.css:256`, `:257` (word "darken") | "The press DARKEN … so a press lands a **brief darken**" | the token is the cream dark `--foreground` (`hsl(30 14% 90%)`, `dark-arm.css:86`) at α 0.12 in the dark arm, with no dark override (`grep`). Every sRGB channel of the ink exceeds a dark ground's, so the press **lifts** in dark: over the dark veil ink `oklch(0.17 0.03 70)` OKLab L **0.170 → 0.280**, over black 0.000 → 0.225 (`crit-press-dark.py`, `press-dark-fv9.log`; arithmetic, not paint). Light holds (dark ink darkens) | HEAD's sentence carried "Auto-flips with `--foreground` / `--glass-plate-resting`"; **the patch rewrote `:256-258`** (both lines are `+` lines, FV9's `printed-lines-written-by-patch.txt`) and dropped the qualifier. MS8 §4.3 reads the minor's twin false on the same grounds |
| **A-3** | `src/styles/glass/overlay-plate.css:271` (word "tint"; its sentence `:271-274`) | "the veil already paints the overlay rung **at the bound**" (`:272-273`) | the listbox takes `--glass-veil-tier: var(--glass-veil-overlay)` (`:278`), and `--glass-veil-overlay` is `--glass-bound` + 1 step (`tokens/glass.css:284`): one step **above** the bound | HEAD said "carries the earned darken"; **the patch wrote `:271-273`**. The text has stood since floor v7, so passes 8, 9 and 10 all ruled it true on its first two clauses. It is MS8 §4.3's `ladder.css` class ("at the bound" for a rung above it), which the minor seat reads false, and R-25's own `DESIGN.md:34` writes "at or above the solved bound α" for this reason |

Under R-26 each is false, none is `reported` (the patch wrote it or made it false), and each prints in R-21 (b). **Rows 20 and FL-12 stay open on R-21 as written**, now on seven lines in three files. R-21's carve-out does not apply: these are printed lines.

### 3.3 · Rulings that call a false clause true (R-26, no row moves)

- **`dark-arm.css:216`** is ruled `true` ("history"), but it is the second line of `:214-217`'s sentence, whose clause "clamps L UP to its 0.34 ceiling" (`:215`) the seat itself reports false. R-26 reads the sentence, so `:216` is `reported`. MS8 rules the minor's twin pair that way.
- **`dock.css:15`**, as §3.1: `true` on R-24's reading, `reported` at worst on a literal one.

Neither gates (a `reported` line covers its line). They are the class H10 §5 (3) named: a seat that calls a false clause true in other words passes the instrument. The proposed rulings (§5) carry `:216` as `reported`.

### 3.4 · Why the seat missed A-1..A-3

FV9 §4 searched hardest where the patch writes printed lines (20) and where a printed line **names** one of the 48 re-valued tokens (8). A-1 names an alias that falls back to the re-valued token (`--dock-icon-hover-bg` → `--dock-control-hover-bg`). A-2 sits on the two lines above the declaration it describes and names no token. A-3 describes a ladder relation (`overlay` against the bound) and names no token. The same reading gap let `overlay-plate.css:271` through three critics. Placed in §6 as a reading class for the pass-11 instrument list.

### 3.5 · Finds outside both lists (R-21's carve-out: reported for the next build, rows unaffected)

| line | false clause | note |
|---|---|---|
| `dock/styles/controls/tab-button.css:75`, `triggers.css:85` | "The iOS press darken-plus-shrink" over `--dock-control-press-bg` | not in the patch, so not printed; the dark press lifts (A-2). HEAD's dark press lifted too (`--foreground` 7 % into the dark plate), so the dark half is HEAD-stale |
| `src/styles/tokens/glass.css:149-150` | the well "stepped a whisper DARKER toward the warm `--foreground`" | FV9 §4.5, confirmed |

### 3.6 · FV9's other §4.4 readings

`scale-paper.css:101` ("the SELECTED glass-tinted fill"): upheld as true (12 % of the glass under it transmits). `control-surfaces.css:142` (history, byte-identical at HEAD): upheld. `color-radius.css:213`, `:231` (provenance counts): upheld. The six `reported` lines (FV9 §4.3) are each false at HEAD in a clause the patch did not write: upheld.

---

## 4 · The minor v8

### 4.1 · R-25, word for word

- `MS7-r21b-proposed.diff` went in unchanged (`compose.log`), so `DESIGN.md:34` and `surface-axis.css:21-22` read as Crit9 §5.2 took them.
- **The parenthesis (MS8 §1.1): the departure is upheld.** Crit9 named the site "`surfaces-pager.css:34-36`" and R-25 shortened it to `:36`, so `:36` names R-23's fold, not a physical line. The `)` closes "(darker in dark, …" where the minor v6 closed it, after "in both themes" on `:34`. The comment now opens 4 and closes 4. A `)` on the physical `:36` would add a second parenthetical and no meaning.
- Raw identity to the minor v7 holds (§1.2). DEL PASS 54 and H7-3 PASS 42 (§2.1); vitest 2321 (§1.3).

### 4.2 · R-21 (b) under R-26 (`sweep.log`)

| run | read here |
|---|---|
| minor v8 under `MS8-rulings.json` | **`FAIL (4 unread, 0 stale of 371 lines)`**: `ladder.css:297, :299`, `sizing.css:258, :259` |
| minor v7 under `MS8-rulings.json` (R-25's plant) | `FAIL (7 unread, 3 stale of 371 lines)` |
| minor v8 under pass 9's `MS7-rulings-proposed.json` | `FAIL (1 unread, 1 stale of 371 lines)`: `surfaces-pager.css:34`, as MS8 §4.1 |
| minor v8 + `MS8-r26-proposed.diff` under `MS8-rulings-proposed.json` | **`PASS (369 lines: 351 ruled true, 18 reported)`** |

**MS8 §4.3's two sentences: confirmed false and the patch's.** In `ladder.css:297-299`, quiet and resting sit one and two steps above the bound. In `sizing.css:256-261` the sentence covers both arms, and the dark arm (`color-mix(in oklab, var(--glass-plate-resting), var(--foreground) 7%)`) mixes toward cream and lifts. **`MS8-r26-proposed.diff` (`6e095ae9`): TAKEN.** Its words are true ("at or above the bound"; "The press FILL … a brief fill"), it keeps line counts, and MS8 measured it raw-identical, DEL PASS 54 and the list PASS 369. So **the minor v9 = the minor v8 + `MS8-r26-proposed.diff`**.

**MS8's 18 reported lines: upheld.** Each is HEAD text the patch did not write. MS8 §4.4 says the minor's `dark-arm.css:82` differs from the floor's ruling, and both are right: the two trees' lines differ. The minor's `:82` still lists `--glass-veil-ink` among the `var(--foreground)` consumers (HEAD text, false: the dark ink is a literal), and floor v9 deleted that item. So MS8's "one reading should hold for both" does not apply to `:82`. It does apply to `:212-213` / `:215-216` (§3.3).

**Outside the minor's lists (carve-out):** `icon-button.css:95, :104` read false on the minor too. Its light hover is foreground ink at 0.05, not card-tinted (`sizing.css:206`). The minor's patch does not touch `icon-button.css`, so they do not print; one build can rewrite them for both trees, beside MS8 §4.5's `:118-120`.

### 4.3 · The gates (minor_gates)

Every verdict is carried from Reg P9-3.1 on outputs raw-identical to the minor v7's in one session (§1.2). I read the static legs fresh here.

| gate | verdict |
|---|---|
| W-0.1 G1 M-1 | **PASS** over paper (11/11, both engines); off paper **REPORTED** 48/66 (Q-11 content unruled) |
| W-0.1 G2, G3 (O-66 field, row) | **PASS** (carried; HOV 58 read here) |
| W-0.1 G4 W-A light | **PASS** (108/108, carried) |
| W-0.1 G5 scope | **PASS** (MS8 §5: roster 289 = 289, `terminal CLEAN` with the datum rebound in a worktree; ratchet owes +2,333 B at landing; library build exit 0 here) |
| W-0.1 G6 per R-9 | **PASS** (carried) |
| W-0.1 G7 M-2/M-3 halves | **PASS**, 0 regressions (carried) |
| W-0.11 G1-G4 | **PASS**: census `stacked=0 halo=0 blur=0 open=0` here; HEAD `2/2/5/9`, exit 1 |
| W-0.11 G5 | **PASS** (as W-0.1 G5) |
| W-0.11 G6 | **PASS** (carried) |

**10.2.0 still cannot ship from the minor:** the entry gate stands at 0 of 2 clean passes, Q-11's content clause is unruled, `MS8-r26-proposed.diff` is not yet built (the minor v9), the landing items remain (probes under `scripts/probes/band-0/`, ratchet +2,333 B, R-9 in W-0.1 §5 G6), and D2 has not converged (O-88).

---

## 5 · A proposed floor v10 delta, measured (for the agglomeration to rule; not a build)

`crit-fv10-proposed.py` rewrites only A-1..A-3 and FV9 §4.2's lines, each file keeping its line count (`crit-fv10-proposed.diff`, 3 files, 8 lines):

| line | now | proposed |
|---|---|---|
| `icon-button.css:95` | "…a translucent card-tinted fill is" | "…a translucent one-ink fill is" |
| `icon-button.css:104` | "…blowout; the card-tinted" | "…blowout; the one-ink" |
| `icon-button.css:118-120` | "The iOS press DARKEN-plus-shrink. Press lands the / glass-darken (`--dock-control-press-bg`, a tier below resting) alongside / … "darken + shrink"" | "The iOS press FILL-plus-shrink. Press lands the / one-ink selected fill (`--dock-control-press-bg`) alongside / … "fill + shrink"" |
| `sizing.css:256-257` | "The press DARKEN, … a / brief darken rather than scaling alone." | "The press FILL, … a / brief fill rather than scaling alone." (MS8's words for the minor's twin) |
| `overlay-plate.css:273` | "at the bound, and" | "a step above the bound, and" |

| measured | result |
|---|---|
| bytes (`proposed-same.log`, 20:25:54, load 25.2) | floor v9 + the delta against floor v9: dist and dist-demo `diff -rq` exit 0; CSS `347288745da7cf97` |
| DEL (`del-fv9p.log`) | PASS 101 |
| the list under `crit-fv10-rulings-proposed.json` (the seat's rulings, the seven lines that leave the list dropped, `dark-arm.css:216` `reported`, `overlay-plate.css:271` re-ruled on its whole sentence) | **`PASS (207 lines: 200 ruled true, 7 reported)`** (`sweep-fv9p-ruled.log`) |
| plant: floor v9 under the same rulings | `FAIL (7 unread, 0 stale of 214 lines)` at exactly the seven lines (`sweep-fv9-plant-proposed.log`) |

One limit shows here. `overlay-plate.css:273` does not print, so the plant cannot red on A-3's line through `says`. Its ruling's `why` carries the reading, and R-26 is the only guard, as H10 §5 (3) says. These are words for the agglomeration to fix, not a build (R-24's last sentence). `tab-button.css:75` and `triggers.css:85` (§3.5) could join the same build at no row cost.

---

## 6 · The 44 rows (floor v9; defaults applied, no variant selected)

Carried paint statuses take Crit9 §4 / Reg P9-1.1 as the source of record, on outputs raw-identical in one session (§1.2).

| # | row | status | evidence or counterexample | closes on |
|---|---|---|---|---|
| 1, 2, 4, 5, 7, 8, 10-19, 21, 22, 24 | RAW … STACK | **PASS (19)** | carried. Row 11: toolchain read here (§1.3). Row 19: DEL HEAD 89/101, absent and empty roots exit 2, H10 plants 34/34 (twice). Row 22: census 0, HEAD `2/2/5/9` | — |
| 3 | M-1x | OPEN | REPORTED under (a) | **owner, Q-11 chrome clause** ((a) by text; (b) by selecting `pass-4/fv3/q11b.*`) |
| 6 | M-3 | **PASS** | carried (H7-1, Chromium light Close ring 3.52) | — |
| 9 | M-6 | OPEN | `--q1 a` PASS 88/88 both engines on record | **owner, Q-1** |
| **20** | prose sweep of every touched file | **OPEN** | R-21 (a) holds (DEL 0). R-21 (b) fails: `icon-button.css:95, :104, :118-120`, `sizing.css:256-257`, `overlay-plate.css:271` print and are false, made false by the patch (§3.2) | **route: the next comment-only build** (§5's words or the agglomeration's), under R-21 and R-26 |
| 23 | gestalt, O-62 frame | OPEN | no specimen pixel moved | **owner: Q-11 content clause, Q-3, Q-14**, over the frames |
| FL-1..FL-11, FL-13..FL-16 | the floor | **PASS 15** | carried | — |
| **FL-12** | prose sweep | **OPEN** | as row 20 | as row 20 |
| N-1 | Q-1's ruling built | OPEN | (a) built | **owner, Q-1** |
| N-2 | Q-11's ruling built | OPEN | (a) built | **owner, Q-11 chrome clause** |
| N-3 | the dock's held halo | **PASS** | carried | — |
| N-4 | the minor split's W-0.1 reading | **PASS** | §4.3 | — |

**Count: 37 PASS, 7 OPEN = 0.841. Closed this pass: none. Opened: none.** Route-owned: 2 (20, FL-12). Owner-only: 5 (3, 9, 23, N-1, N-2). **Not clean** (0 open is clean). **Fixed point: not reached.**

---

## 7 · Next-pass classes (placed for the agglomeration; no row added)

| class | found | proposed placing |
|---|---|---|
| a patch's value change falsifies a printed sentence that never names the token: an alias's fallback (A-1), the lines above a declaration (A-2), a ladder relation (A-3) | §3.2, §3.4 | **build**: the next comment-only floor build (§5); **reading**: the next seat's R-26 pass reads every printed sentence within a re-valued token's comment block and every printed line naming a `var()` that falls back to one. This is a reading aid, not a gate |
| harness tools end with `process.exit()` after `console.log` into a pipe; on macOS the tail of the output (tally, verdict) is lost, 2 of 12 runs at load ≈ 40 | §2.2 | **instrument (H11)**: set the exit code with `process.exitCode`, or write the report synchronously, in `prose-sweep.mjs` and `deleted-mechanisms.mjs`; a self-test row reads the verdict line, not only the exit code. Plant: the 6-run pipe probe reads 6/6 whole |
| a ruling calls a sentence-mate of a reported clause `true` (`dark-arm.css:216`) | §3.3 | **ruling**: R-26 as written; the rulings file carries `reported` |
| the minor's `sizing.css:258-259` and `ladder.css:297-299` | MS8 §4.3, §4.2 here | **build**: the minor v9 = the minor v8 + `MS8-r26-proposed.diff` |
| `icon-button.css:95, :104, :118-120` on the minor; `tab-button.css:75`, `triggers.css:85`; `glass.css:149-150`; the dock.css `--glass-veil-*` wording | §3.1, §3.5, §4.2 | landing docs pass, or the same comment build at no row cost; not rows |
| R-21 beside the sheet | P9-6.4's third case, twice | **owner**: after the next build, R-21's line is the owner's to settle before any further pass. Four passes running have reopened rows 20 and FL-12 on lines the patch made false |

---

## 8 · Teardown

`D3-crit-run.sh teardown`: `git worktree remove --force` of `.claude/worktrees/bl/D3/p10/crit/wt`, `git worktree prune`, `rm -rf` of `.claude/worktrees/bl/D3/p10/crit/` (trees, builds, caches), then `rmdir` of the empty `p10/`. No process of this seat is left running, and no browser launched.
