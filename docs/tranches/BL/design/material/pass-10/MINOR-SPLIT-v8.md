# D3 · pass 10 · MINOR-SPLIT v8: minor v7 + R-25, byte-identical in paint, read under R-26

| field | value |
|---|---|
| seat | D3 pass 10, the minor split v8 (`REGISTRY.md` P9-6.2 step 3). A build, not a route: the tree 10.2.0's veil recut (W-0.1) and W-0.11's tokens would ship from. It builds R-25 on `pass-9/minor-split-v7.patch`, proves the specimen dist and the dist-demo raw byte-identical to the minor v7's in one session, then runs H7-3 with `deletes-minor.json`, DEL with H9 and H10 over its own patch, R-21's frozen list with every line ruled under R-26 and H10-2's `verdict`, the static checks and the toolchain. No browser ran: the bytes held |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | worktree `.claude/worktrees/bl/D3/p10/minor8/wt` cut at `e3b12ca6c` (the floor v9 bank, docs only). `git diff --stat 1da7eb17b HEAD -- src demo tests package.json scripts tests-visual vite.targets.ts .bundle-ratchet .published-roster DESIGN.md docs/canon` prints nothing (`MS8-records/check.log`), so the base is the published 10.1.0 source. **`git apply --check minor-split-v8.patch` exits 0 at `e3b12ca6c`**, in the worktree returned to HEAD and in the checkout (read only) |
| patch | **`minor-split-v8.patch`**: **61 files, +730 / −543** (`git diff --shortstat`), sha1 `a843b388`. Composition, checked byte for byte: `pass-9/minor-split-v7.patch` (61 files, sha1 `3a7a8eec`) + **`minor-split-v8-R25.diff`** (3 files, +4 / −4, sha1 `7540ff70`) = `minor-split-v8.patch` (`cmp`, `MS8-records/patch.log`). The delta is `MS7-r21b-proposed.diff` as banked (sha1 `ccee3e30`, applied with `git apply`) plus one `)`; `diff` of the two deltas' changed lines prints only the parenthesis line. The path list equals the minor v7's. No `.vue` file is in the delta, and every edit keeps its file's line count |
| owner rulings | **None.** `audit/INBOUND.md` still ends at O-98. `FORMATION-PROGRESS.md`'s D3 lines after the pass-9 registry (506) are the pass-10 launch (507), the H10 bank (509) and the floor v9 bank (510); none records a ruling on Q-1, Q-3, Q-11 (either clause), Q-14 or R-21. The P9-4 defaults apply. The minor builds no owner option |
| engines | none run. The bytes held raw (§2), so every paint verdict of the minor v7, and through it of the minor v6, v5 and v4, carries (P8-2.2's thin-build rule): Chromium 149 gated, Playwright WebKit 26.5 paint-only. **Every real-Safari cell: UNMEASURED (owner's safaridriver checkbox)** |
| records | `MS8-run.sh` (every command, by phase: `setup`, `edit`, `check`, `trees`, `static`, `same`, `bite`, `toolchain`, `ratchet`, `proposed`, `proposed-same`, `sweep`, `teardown`), `MS8-r25-paren.py` (the parenthesis), `minor-split-v8.patch`, `minor-split-v8-R25.diff`, `MS8-rulings.py` and `MS8-rulings.json` (R-21 (b) under R-26), `MS8-context.py` and `MS8-aids.py` (the reading aids), `MS8-press-dark.py` (§4.3's arithmetic), `MS8-r26-proposed.py`, `MS8-r26-proposed.diff` and `MS8-rulings-proposed.json` (§4.3, proposed, not in the patch), `MS8-records/` (`phases.log` carries each phase's time and 1-minute load) |
| fences | No tracked source edited in the checkout, and no git write in it beyond `git worktree add` / `remove` for this seat's worktree. Every patch swap happened in the worktree, each checked with `cmp` or a clean `git status`. Builds and caches lived in `$W/.d3out` and `$W/.cache-m8`; `.bundle-ratchet` was rebound in the worktree for one verifier run and restored. The only checkout writes are the new files under `docs/tranches/BL/design/material/pass-10/` named above. No harness file changed. Nothing ran in a sibling repo |
| machine law | Every phase ran through `~/.claude/guard/guarded` as the literal command word: `setup`, `edit`, `check`, `trees`, `static`, `proposed`, `sweep`, `ratchet`, `teardown` and the rulings generator under `--light` (no browser, no build); `same` (`--timeout 60`), `bite` (`--timeout 30`), `toolchain` (`--timeout 60`) and `proposed-same` (`--timeout 30`) as heavy runs, one at a time. The first `sweep` (light, static) ran while `toolchain` was the one heavy run. vitest ran with `--maxWorkers=2`. No browser launched and no WebKit lock was taken. No kernel-zone refusal fired. The 1-minute load ran 24.8 to 43.7 (`phases.log`), from other sessions. No timing is read here, and no red paint cell exists to re-run |

Short citations: `Reg` (`REGISTRY.md`, the pass-9 part P9-0..P9-6), `H10` (`pass-10/H10.md`), `FV9` (`pass-10/FLOOR-V9.md`), `MS7` (`pass-9/MINOR-SPLIT-v7.md`), `Crit` (`pass-9/D3-critique.md`). `§n` after them is their section.

---

## 0 · In brief

- **The build is R-25 and nothing else:** `MS7-r21b-proposed.diff` as banked (`DESIGN.md:34`, `surface-axis.css:21-22`) and the one closing parenthesis in the `surfaces-pager.css` pill comment, which now opens 4 and closes 4 (the minor v7: 4 and 3). The parenthesis goes back where the minor v6 had it, after "in both themes", on `:34`. R-25 names `:36`. That is the fold's line in R-23's range, and no `)` placed on `:36` closes "(darker in dark" without two parentheticals side by side. This is a departure for the critic (§1).
- **Byte identity holds raw in one session (R-22, R-27).** The minor v8, the minor v7 and the minor v8 again were built under one label. They are identical in the specimen dist (3 files) and the dist-demo (346 files) by `diff -rq` and by sha256 list. Specimen CSS **398,432 B, sha256 `e11613c3eeb45cab`**, the hash pass 9 banked for the minor v7. The dist-demo sha256 list equals pass 9's banked minor v7 list (`diff` exit 0). Every paint verdict carries, and no battery or browser is owed (§2).
- **H7-3** (`deletes-minor.json`, 42 names, 3 sites): the minor v8 **PASS 42**. **DEL with H9 and H10 over its own patch: PASS 54**, 1,095 text files, 0 hits. On an absent root it exits 2 (H10-1). R-25 removes no name, so DEL reads the minor v7 PASS 54 under the same declaration and patch too. R-21 (b) is the instrument that moves (§3).
- **R-21 (b) under R-26 prints 371 lines in 52 files. I re-ruled every one.** Pass 9's rulings ruled whole files with one shared `why` (68 distinct whys for 371 lines). R-26 asks what makes each clause true, so `MS8-rulings.json` carries 262 distinct whys, per line or per sentence. **349 true, 18 reported, 4 false.** The ruled sweep reads **`FAIL (4 unread, 0 stale of 371 lines)`** (§4).
  - **The 4 false lines are two sentences.** `ladder.css:297, :299`: "the content tiers paint the cream pole at the bound", but quiet and resting sit one and two steps above it. `sizing.css:258, :259`: "a press lands a brief darken", but the dark arm steps the plate toward the cream `--foreground`, which lifts it, OKLab L 0.149 → 0.213 over the dark dock plate by the token arithmetic. The minor's patch wrote both sentences. R-25 says "Nothing else", so they are not in the build. `MS8-r26-proposed.diff` (2 files, +3/−3) rewrites them. With it the list reads **`PASS (369 lines: 351 ruled true, 18 reported)`**, DEL reads PASS 54, and the bytes stay raw-identical (§4.3).
  - **The 18 reported lines** are pass 9's ten plus eight that R-26 now catches: `DESIGN.md:1234`, `feedback-tone.css:36` and `dark-arm.css:82, :212, :213, :329, :332, :345`. Each is false at HEAD in a clause the patch did not write (§4.2).
- **R-25's fixture as Reg P9-2.2 wrote it** (`MS7-rulings-proposed.json`, migrated by H10) reads `FAIL (1 unread, 1 stale of 371 lines)` on the minor v8. The parenthesis changed `surfaces-pager.css:34`, the line that ruling's `says` quotes, as H10 §6 predicted for a ruling whose text spans it. `MS8-rulings.json` re-rules that line.
- **Static and toolchain:** LAW PASS 78, census `stacked=0 halo=0 blur=0 open=0` (10.1.0's styles exactly `2/2/5/9`), HOV PASS 58, LIT the 19 inherited, ladder `diff` to the minor v7 empty. `vue-tsc` exit 0 on both projects, library build and dist-demo exit 0, vitest **239 files, 2321 passed, 0 failed** (the minor v7: 2321). Roster PRESENT 289 = 289, `terminal CLEAN` with the datum rebound in the worktree. The ratchet owes **+2,333 B**, the minor v7's figure to the byte (§5).
- **Shippability (§6):** every W-0.1 and W-0.11 gate verdict carries green on raw-identical bytes. 10.2.0 is still held by the entry gate (0 of 2 clean passes, and no ruling has arrived), Q-11's content clause, §4.3's two sentences (one comment-only rewrite, measured), the landing's own items, and D2 (O-88).

---

## 1 · The build (`minor-split-v8-R25.diff`)

| R-25 part | site (minor v8) | was (minor v7) | now | basis |
|---|---|---|---|---|
| `MS7-r21b-proposed.diff` (i) | `DESIGN.md:34` | "Light-mode and dark-mode tints differ; the dark-mode tint is denser to compensate for the lower contrast floor." | "Light-mode and dark-mode tints differ: light paints the `--card` pole at or above the solved bound α (a cream frost, never an ink: O-62), and dark paints the warm near-black ink at its own rung α." | MS7 §4.3; Crit §5.2 took it. Light: `--glass-veil-ink: var(--card)`, rungs bound, bound + 1 step, bound + 2 steps (`tokens/glass.css:40, 51-55`). Dark: `oklch(0.17 0.03 70)` at 0.18 ± n·0.04 (`dark-arm.css:275-282`) |
| `MS7-r21b-proposed.diff` (ii) | `src/styles/glass/surface-axis.css:21-22` | "…the ONE level knob, the tint axis / zeroed (a solid plate has no translucent backdrop to earn ink over)." | "…the ONE level knob, with no tint axis / to zero (a solid plate has no translucent backdrop to earn ink over)." | there is no tint axis (`ladder.css:165`) |
| the parenthesis | `src/styles/glass/surfaces-pager.css:34` | "clamp's two-step ceiling keeps it translucent, in both themes; one" | "clamp's two-step ceiling keeps it translucent, in both themes); one" | Crit §5.1: the fold dropped a `)`; the comment opened 4 and closed 3 |

`MS8-r25-paren.py` writes the parenthesis by exact substitution (the old string occurs once). `MS7-r21b-proposed.diff` went in with `git apply`, unchanged.

### 1.1 · Where the parenthesis goes (a departure, for the critic)

The minor v6 closed "(darker in dark, a thicker cream pole in light; the clamp's two-step ceiling keeps it translucent)" right after "translucent". R-23's fold replaced "translucent); under `.dark` the tint arm LIFTS it…" with "translucent, in both themes; one writer, …", and the `)` went with the struck text (MS7 §1.1). I put it back after the clause it closed, "in both themes)", on `:34`. The sentence now reads: "…the pill earns ink for a real silhouette (darker in dark, a thicker cream pole in light; the clamp's two-step ceiling keeps it translucent, in both themes); one writer, the clamp, moves the pill's ink, never a second axis, and the pill runs no oklab mix of its own (the in-srgb `--surface-tint-*` brand fence is untouched)."

R-25 says "the closing parenthesis at `surfaces-pager.css:36`". MS7 and Crit use `:36` as the name of the fold inside R-23's range `:34-36`. Line 36 itself reads "the pill runs no oklab mix of its own (the in-srgb". A `)` there either sits before "(the in-srgb", leaving two parentheticals side by side, or doubles at `:37`'s "untouched))". Both close the same parenthetical and add no word. The cost of `:34` is that a ruling quoting that line goes stale (§4.1), and `MS8-rulings.json` re-rules it. If the critic reads R-25 as the physical line `:36`, the edit is one character in `MS8-r25-paren.py` and the bytes do not move (§2).

---

## 2 · Byte identity (R-22's raw branch, R-27's same-session pair)

`same.log`, 19:48:49-19:49:00, load 30.07 → 32.06. The minor v8, the minor v7 and the minor v8 again were built by `harness/build.mjs --demo` under one label (`same`) in the worktree. Each output was moved aside before the next build, and each swap was checked by `cmp` against its patch.

| output | minor v7 against minor v8 | minor v8 rebuilt | R-27's path-free tie to pass 9's bank (`pass-9/MS7-records/same-m7-*.sha256`) |
|---|---|---|---|
| **specimen dist** (3 files) | **`diff -rq` exit 0; sha256 lists identical.** CSS `index-Bd1ws62N.css` **398,432 B, sha256 `e11613c3eeb45cab2ebe3e88245ba9a55a8c41b640f48d9a45df116bb3638b0a`** in both | exit 0 | the CSS hash equals the banked minor v7's, digit for digit |
| **dist-demo** (346 files; CSS 431,116 B) | **`diff -rq` exit 0; sha256 lists identical**, no normalisation | exit 0 | the sha256 list equals the banked minor v7 list (`diff` exit 0, 0 lines) |

Under R-27 the specimen JS is not cited against a bank. One observation bears that out. `proposed-same` (§4.3) rebuilt the minor v8 nine minutes later from a different working directory. Its specimen JS differs from the `same` phase's only in the `//#region` source paths, which are written relative to the build's working directory (`MS8-records/proposed-same-js-regions.log`: identical with every region path blanked). The CSS and the dist-demo are identical. The same-session pair above ran from one directory, so the raw proof stands.

**The bite** (`bite.log`, 19:49:09-19:49:13, load 29.43 → 28.04): HEAD built the same way under the same label differs from the minor v8 in both outputs (`diff -rq` exit 1: dist 5 lines, demo 229 lines). HEAD's specimen CSS is 394,891 B, `b09b9e73a61b75b1`, MS7's figure.

**Why it holds.** All three edits are inside a CSS block comment or a markdown paragraph. The minifier strips comments, `DESIGN.md` is in neither build, and no `.vue` file moves, so no scoped id moves. No dist file carries an R-25 sentence (`ratchet.log`). **Every paint verdict of the minor v7 carries to the minor v8.** No browser ran, and no WebKit cell is owed by this seat.

---

## 3 · H7-3, DEL with H9 and H10, and the static reads

`static.log`, 19:48:32-19:48:41, load 33.31 → 32.96.

| check | minor v8 (the fixture) | plant, bite or refusal |
|---|---|---|
| **H7-3**, `deletes-minor.json` (42 names, 3 sites), H7's scope (`src/`, `demo/`), no patch | **PASS 42 gated rows**, 0 hits; the 3 value-arm sites print `not read` (MS7 §2.2) | the minor v7: PASS 42. R-25 removes no declared phrase, so H7-3 cannot tell the two apart. The banked H7-3 plants (the minor v6 FAIL 2/42, v5 17/42, v4 38/42) are pass 9's (MS7 §2.3) and are untouched |
| **DEL with H9 and H10**, `--patch minor-split-v8.patch` | **PASS 54 gated rows**, exit 0: 1,095 text files in scope, `names=42 hits=0 changed=8 families=1 sites=3 arm-true=1 rung=4 reported=4` (`del-minor8.log`) | **H10-1:** an absent root **exits 2**, `FAIL (nothing read: the tree does not exist)` (`del-absent.log`). The minor v7 under the v8 patch reads PASS 54 too (`del-minor7-under-v8.log`), as under its own (`del-minor7.log`). The fixture H10 §6 named for this seat holds |
| LAW | **PASS 78 gated rows** (`law.log`). One more scanned file than floor v9's 77: this seat's scripts | — |
| census | `LIGHTING-CENSUS stacked=0 halo=0 blur=0 open=0`, exit 0 | `git archive v10.1.0 src/styles`: `stacked=2 halo=2 blur=5 open=9`, exit 1 |
| HOV | **PASS 58** | — |
| LIT | REPORTED `halo=5 near=1 stacked=10 chain=3 open=19 frames-halo=0/0`, the 19 inherited | — |
| ladder | `diff radii-minor8 pass-9/MS7-records/radii-minor7.txt` prints nothing | — |
| FL-14 static | `isolation: isolate;` at line 26 of `@utility glass-plate` | — |
| identifiers on R-25's lines | `--card` ×3, all inside the doc paragraph and the comments | — |

---

## 4 · R-21 (b) under R-26: every printed line, every clause

### 4.1 · The list and the reading

`prose-sweep.mjs --root <minor v8> --patch minor-split-v8.patch --declare harness/deletes-minor.json` prints **371 lines in 52 files** (`sweep-minor8.log`, `LIST`). The same count as the minor v7, since R-25 moves no line in or out. I read each line with the sentence it belongs to (`MS8-context.py`, `MS8-records/ctx-*.txt`). Where a clause names a mechanism, a value, a count or a line number, I checked it against the minor v8 tree, and against HEAD where it was false. Two reads guided where to look hardest, FV9 §4's method:

- the 48 printed lines the patch itself writes (`printed-lines-written-by-patch.txt`);
- the 16 printed lines that name one of the 36 custom properties whose declared value the patch changes (`value-changes-vs-printed.txt`, from `MS8-aids.py`).

I read HEAD text that names no mechanism the minor changes (the type-scale table, the timeline partition, the motion laws) for its own claims and its internal consistency, and I did not re-measure it. `MS8-rulings.py` holds one entry per sentence group, and it refuses to write unless every printed line is covered exactly once. Every `why` names what makes each clause true, or which clause is false and why it is not the patch's.

| run (`sweep.log`, 20:05:32-20:05:35, load 35.53) | result |
|---|---|
| minor v8 under pass 9's `MS7-rulings-proposed.json` (as H10 migrated it) | **`FAIL (1 unread, 1 stale of 371 lines)`**: `surfaces-pager.css:34`, whose `says` quoted the line without the parenthesis |
| **minor v8 under `MS8-rulings.json`** | **`FAIL (4 unread, 0 stale of 371 lines)`**, `true=349 reported=18 unread=4`: `ladder.css:297, :299`, `sizing.css:258, :259` (§4.3) |
| minor v7 under `MS8-rulings.json` (R-25's plant) | **`FAIL (7 unread, 3 stale of 371 lines)`**: R-25's three lines (`DESIGN.md:34`, `surface-axis.css:21`, `surfaces-pager.css:34`) stale and unread, plus the same four |
| minor v8 + `MS8-r26-proposed.diff` under `MS8-rulings-proposed.json` | **`PASS (369 lines: 351 ruled true, 18 reported)`**. The two `sizing.css` lines print no frozen word once rewritten and leave the list |
| SWEEP on an absent root | exit 2, `FAIL (nothing read: the tree does not exist)` (H10's departure, holding) |

### 4.2 · The 18 reported lines (false at HEAD, not written by the patch; for the landing docs pass)

Each is byte-identical at HEAD (`grep -F`) and is not one of the 48 lines the patch writes.

| line | the false clause | what the tree says | since |
|---|---|---|---|
| `glass-material.vue:5` | the "chromatic fringe" among three SOTA folds | the story paints no fringe (its blurb, `:383`) | MS7 §4.2 |
| `glass-material.vue:12, :72, :73` | the tint "sets BOTH `--glass-veil-ink` + a non-zero `--glass-veil-rung` so the `color-mix(in oklab, …)` actually bites" | the story writes only `--glass-veil-ink`; the plate mixes in srgb | MS7 §4.2 |
| `feedback-tone.css:20, :21` | "the SAME `color-mix(in oklab, …)` seam the `--glass-veil-*` legibility lift and the `--veil-bg` plate already run" | the veil mixes in srgb; no `--veil-bg` in `src/` | MS7 §4.2 |
| `dock/styles/dock.css:16` | "The shell + adaptive-legibility partials re-point" | `shell.css` alone does (`:20`, `:96-98`). Floor v9 built R-24 (iii) for its own tree; R-25 does not carry it | MS7 §4.2 |
| `dock/styles/shell.css:30, :33` | the "UNIFIED PLATE TINT" and the "plate-tint self-engage (dock/adaptive-legibility.css)" | that partial carries no plate tint | MS7 §4.2 |
| `tokens/glass-fx.css:2` | "the adaptive tint-source" | no such token | MS7 §4.2 |
| **`DESIGN.md:1234`** | `--card-header-bg`'s stated default `color-mix(in srgb, var(--card) 60%, transparent)` | no file in `src/` or `demo/` declares or reads the token; `:1227` says it stays consumer-side | **new** |
| **`feedback-tone.css:36`** | "glass/veil.css:35-37 names 'a tone-tinted feedback panel'" | the phrase is at `veil.css:50` (HEAD `:46`). The claim without the line numbers is true | **new** (FV9 §4.3 reports the floor's twin) |
| **`tokens/dark-arm.css:82`** | `--glass-veil-ink` listed among "EVERY dark var(--foreground) consumer" | the dark ink is the literal `oklch(0.17 0.03 70)` (`:275`; HEAD `:278`) | **new**; FV9 ruled the floor's same line true (§4.4) |
| **`tokens/dark-arm.css:212, :213`** | "clamps L UP to its 0.34 ceiling" (one sentence over both lines) | dark `--foreground` is `hsl(30 14% 90%)`, so the clamp brings L down | **new** (FV9 §4.3 reports the first line only) |
| **`tokens/dark-arm.css:329`** | "the 9-rung chip/hairline/divider scale" | `--surface-tint-*` declares 11 rungs in each arm (`grep`: 11 and 11) | **new** (as FV9 §4.3) |
| **`tokens/dark-arm.css:332`** | "literal ×12", and in the same sentence "all 12" | 11 rungs | **new** (as FV9 §4.3) |
| **`tokens/dark-arm.css:345`** | the sentence's "SAME 12-rung α ladder" (`:343-345`) | 11 rungs | **new** (as FV9 §4.3) |

Pass 9's ten were already `reported` (H10 §3.1). The eight new ones were ruled "true" by pass 9 under one shared file `why` that named none of the false clauses (for example `dark-arm.css`: ":212-213 clamp() in the shadow pin"). That is R-26's class, and it is cured here by reading each sentence.

### 4.3 · False, and the patch's: two sentences, four lines (not in the build)

**`src/styles/glass/ladder.css:297-301`**, printed at `:297` and `:299`: "Over a calm LIGHT page the content tiers paint the cream pole at the bound, so flipping the ink to the contrast-color DARK ink there is correct only where the bucket engages…"

- The false clause is **"at the bound"**. The content band is wash at the bound, quiet at bound + 1 step and resting at bound + 2 steps (`tokens/glass.css:51-55`; the file's own table at `:22-30`), so two of the three content tiers sit above it. The sentence's point, that the calm light page carries a cream plate and the dark flip belongs in the bucket, holds. Only the qualifier is wrong. R-25's own `DESIGN.md:34` says "at or above the solved bound α" for this reason.
- **The patch wrote it.** `:298` and `:299` are `+` lines of `minor-split-v8.patch`, and the sentence dates from the minor v5 (`pass-7/minor-split-v5.patch`). It is not `reported` (R-26). Pass 9 ruled `:297` and `:299` true under the file `why` for `ladder.css`, which does not read this sentence.

**`src/styles/tokens/sizing.css:258-261`**, printed at `:258` and `:259`: "The press DARKEN, read on `:active` alongside the scale-press so a press lands a brief darken rather than scaling alone. LIGHT: the one-ink SELECTED rung, ink over the control and never a plate colour. DARK: the resting plate stepped 7% toward `--foreground`."

- The false clause is **"so a press lands a brief darken"**, in dark. The dark value is `color-mix(in oklab, var(--glass-plate-resting), var(--foreground) 7%)` (`:262-265`), the 0.18 near-black ink stepped toward the cream `--foreground`. `MS8-press-dark.py` computes the press layer as OKLab L 0.393 at α 0.237. Composited over the dark dock plate, it lifts L 0.149 → 0.213; over the dark page 0.146 → 0.210; over the dark `--card` 0.295 → 0.319 (`press-dark.log`). These are computed from the tokens, not painted, and no browser ran. Over a ground lighter than L ≈ 0.39 it would darken, but the dock's dark plate is not such a ground. Light holds: foreground ink at α 0.12 over the control darkens it.
- **The patch wrote it.** HEAD carried the same dark value under "a brief glass-darken … Auto-flips with `--foreground` / `--glass-plate-resting`". The minor rewrote `:258-261` and dropped the "Auto-flips" qualifier. That is MS7 §4.3's `surface-axis.css:21` precedent: a sentence the minor rewrote and left false is the minor's.

**Why not built.** R-25: "Nothing else." R-24's last sentence sets the rule for a further false printed line: it "goes to the critic under R-26, not into the build". Floor v9 met the same case at `icon-button.css:118-120` (FV9 §4.2).

**`MS8-r26-proposed.diff`** (2 files, +3/−3, sha1 `6e095ae9`; `MS8-r26-proposed.py`; `git apply --check` exit 0 on the minor v8; each file keeps its line count):

| line | now | proposed |
|---|---|---|
| `ladder.css:298` | "…the content tiers paint the cream pole at the bound, so flipping the" | "…the content tiers paint the cream pole at or above the bound, so flipping the" |
| `sizing.css:258-259` | "/* The press DARKEN, … so a press lands a / brief darken rather than scaling alone. …" | "/* The press FILL, … so a press lands a / brief fill rather than scaling alone. …" |

Measured (`proposed.log` 20:02:55-20:03:01, load 34.46 → 36.99; `proposed-same.log` 20:05:13-20:05:25, load 35.64 → 35.97):

- The minor v8 and the minor v8 + the delta, built under one label in one session, are **raw-identical** in the specimen dist and the dist-demo (`diff -rq` exit 0 both; CSS `e11613c3eeb45cab`).
- DEL reads **PASS 54**.
- The list prints 369 lines and reads **`PASS (369 lines: 351 ruled true, 18 reported)`** under `MS8-rulings-proposed.json`.

So if the critic takes the delta, the minor v9 is the minor v8 + this delta, with the byte proof already read.

### 4.4 · Readings the critic should check (R-26: the instrument cannot)

- **`DESIGN.md:93`**, "bg-tints are interactive-rest indicators, not press feedback". I rule it true as a stated law. The dock control's press fill rides with its scale-press (`icon-button.css:118-124`), so "No primitive may ship a press-feedback that is NOT squish-press" holds. Read as a description of what paints, the dock's press fill is a bg change on press.
- **`scale-paper.css:101`**, "the SELECTED glass-tinted fill". It is ruled true on FV9 §4.4's reading of the floor's twin: in light the 12% that `--primary` 88% leaves transmits the glass under the control.
- **`dark-arm.css:82` and `:213`**, where this seat and FV9 differ. FV9 ruled the floor's `:82` twin true. I read `--glass-veil-ink` in its consumer list as false (a literal, not `var(--foreground)`-derived). FV9 reported the "clamps L UP" line alone. I report the sentence's second line with it, since R-26 reads the sentence. The two trees carry these lines byte-identically, so one reading should hold for both.
- **`sizing.css:216` and `:235`**, "a translucent GLASS tint" and "the glass-correct translucent tint a ladder step above hover", over the minor's light state fills, which are foreground ink at `--fill-hover` 0.05 and `--fill-selected` 0.12, not a plate. I rule both true: the fills are translucent tints over the glass, and 0.12 is the rung above 0.05. A reader who takes "GLASS tint" to mean a plate colour would read them false, made false by the minor's value change. That is §4.3's class.
- **`deep.css:18`**, "the tint axis … compose[s] unchanged". Ruled true on Crit8 §3's reading: the TINT axis of `property-regs.css:124` (the whole-plate veil ink) or the fill-tint axis (`tokens/glass.css:201`). Both compose unchanged under `.glass-deep`.

### 4.5 · Finds outside both lists (R-21's carve-out: reported, do not reopen a row)

| line | the false clause | why it does not print | at HEAD |
|---|---|---|---|
| `src/components/dock/styles/controls/icon-button.css:118-120` | "`--dock-control-press-bg`, a tier below resting" | the minor's patch does not touch `icon-button.css`. On the minor the token's light arm is the one-ink selected rung, not a plate tier (`sizing.css:262-265`), and its dark arm lifts (§4.3) | true at HEAD (FV9 §4.2), so the minor's value change makes it false. The same sentence floor v9 prints, and §4.3's proposed rewrite of `sizing.css:258` is the token-side half of the same wording |
| `src/styles/tokens/glass.css:193-194` | the well is "the `--card` plate stepped a whisper DARKER toward the warm `--foreground` ink" | no frozen word on those lines | false in dark at HEAD too: `.glass-well` mixes `--card` toward `--foreground` in both themes (`surface-axis.css:128-132`), and dark `--foreground` is cream. FV9 §4.5 reports the floor's twin |
| `src/styles/tokens/dark-arm.css:315` | "The light arm lives in tokens/glass.css" | no frozen word | the light `--on-glass-muted` is declared in `tokens/on-glass-fg.css` (`:39`), at HEAD too (`:35`) |

---

## 5 · Toolchain and the ratchet

| step (`toolchain.log`, `ratchet.log`) | result | when, load |
|---|---|---|
| `vue-tsc --noEmit` | exit 0 | 19:49:32, 26.99 |
| `vite build` (library, `cacheDir` in the worktree) | exit 0 | 19:49:44, 25.99 |
| `vue-tsc --noEmit -p tsconfig.test.json`, after the library build | exit 0 | 19:49:55, 26.06 |
| `vite build`, the dist-demo config, before the units | exit 0 | 19:49:58, 25.50 |
| `vitest run --maxWorkers=2` | **239 files, 2321 passed, 0 failed**, 10 expected-fail, 1 skipped (the minor v7: 2321) | 19:51:46, 39.26 |
| verifier, datum unrebound | `G-BUNDLE-RATCHET … 2921390 > 2919057`, exit 1: **+2,333 B**, the minor v7's figure to the byte; R-25 adds 0 B | 19:51:59-19:52:45, 40.84 → 28.64 |
| verifier, datum rebound in the worktree only | exit 0, `terminal CLEAN`, roster PRESENT **289 = 289**, claims 193, declarations 454; `.bundle-ratchet` restored to HEAD; `.published-roster` diff empty (`v10.1.0..HEAD` and the worktree) | same |
| library `dist/` files carrying an R-25 sentence | none | same |

---

## 6 · Gates carried, and shippability for 10.2.0

### 6.1 · The gates

Every row is carried on outputs proved raw-identical to the minor v7's (§2), whose verdicts Reg P9-3.1 records. "Read here" marks this seat's own reads.

| gate | verdict | basis |
|---|---|---|
| **W-0.1 G1** M-1 | **PASS** over paper (11/11, both engines); off paper REPORTED 48/66 | carried; Q-11 content unruled |
| **G2** O-66 field, **G3** O-66 row | **PASS** | carried; HOV 58 read here |
| **G4** W-A light | **PASS** (108/108, thinnest α 0.890) | carried |
| **G5** scope | **PASS**: no name leaves `src` (R-25 is a doc paragraph and comments); roster PRESENT 289 = 289 and `terminal CLEAN` with the datum rebound; ratchet **+2,333 B** unrebound | read here |
| **G6** per R-9 | **PASS** (13 dark composites, worst ΔE 0.0000; raw 1/13 at 0.0022 printed) | carried |
| **G7** M-2 and M-3 halves (M-3 under H7-1) | **PASS**, 0 regressions | carried |
| **W-0.11 G1-G4** | **PASS**: census `stacked=0 halo=0 blur=0 open=0`; 10.1.0 exactly `2/2/5/9` | read here |
| **W-0.11 G5** | **PASS** | as W-0.1 G5 |
| **W-0.11 G6** | **PASS** (M-2 720, M-3 214 HEAD-PASS, 0 regress) | carried |
| STACK (FL-14) | **24/24** | carried; `isolation: isolate` read here |
| units | 239 files, **2321 passed**, 0 failed | read here |
| **R-25** (P9-3.3 item 3) | **built**: `DESIGN.md:34`, `surface-axis.css:21-22`, the parenthesis | read here |
| the light-law prose under R-21 and R-26 | DEL **at 0** (PASS 54); the frozen list **4 lines unread**, two sentences the patch wrote, with a measured comment-only delta that reads PASS 369 (§4.3); 18 reported | read here |

### 6.2 · The minor-split table (P5-3.3 as amended)

One row moves, the light-law prose. It now holds R-13's nine sentences, `search.css:44`, R-16's two and its 19, R-18's 15 A-3 sites and the forms-seam title (minor v6), R-23's 11 sites (minor v7), **plus R-25's two rewrites and one parenthesis (minor v8)**, and §4.3's two sentences if the critic takes `MS8-r26-proposed.diff`. It is guarded by `deletes-minor.json` (42 names, 3 sites), DEL with H9 and H10 over the minor's own patch, and R-21 (b) under R-26. It lands in W-0.1.

### 6.3 · Can W-0.1 and W-0.11 ship from the minor v8 in 10.2.0? No, not yet

The minor v8 is the measured shape of 10.2.0's veil recut and W-0.11's lighting tokens. Its paint is the minor v7's (and so v6's, v5's and v4's) to the byte, every gate the registry set for it is green, and R-25 is built. What remains:

1. **The entry gate:** 0 of 2 clean passes (W-0.1 §3, W-0.11 §3.3). No owner ruling has arrived, so pass 10 cannot be clean whatever the builds read (Reg P9-6.3). The earliest landing is the close of the second consecutive clean pass after the owner answers the P9-4 sheet.
2. **Q-11's content clause:** G1 off paper reads 48 of 66 grey, content included. Only the owner can say whether 10.2.0 may ship grey content off paper. "Not accepted" has no measured minor candidate and fires C″'s re-trigger (c).
3. **R-21 (b) on the minor's prose under R-26:** §4.3's two sentences (4 printed lines) are false and the patch's. The critic takes or strikes `MS8-r26-proposed.diff`, which is measured raw-identical and PASS 369. It also rules this seat's departure on the parenthesis's line (§1.1) and §4.4's readings. A tree that lands under R-21 needs the four lines rewritten.
4. **The landing's own items, unchanged:**
   - R-9's reading enters W-0.1 §5 G6's text (the owner may override).
   - Each gate binds to one probe. W-0.1 §5 and W-0.11 §5 name `scripts/probes/band-0/*`, which HEAD still lacks (`ls`: no such directory).
   - `.bundle-ratchet` rebinds to the measured bytes (**+2,333 B**).
   - The landing docs pass takes §4.2's 18 reported lines and §4.5's three finds, beside FV9's and Crit8's lists. `DESIGN.md:516-517`'s blur column stays stale in every build, as MS7 §4.2 recorded.
5. **10.2.0 is also gated on D2 converging** (O-88).

---

## 7 · Handed on

| to | what |
|---|---|
| **the critic** (step 4) | (1) R-25 against Reg P9-2.2 word for word (§1): the r21b delta as banked, and the parenthesis on `:34`, not on the physical `:36` (§1.1, a departure). (2) The raw byte proof and R-27's tie (§2), and the cross-directory JS observation. (3) **`ladder.css:297, :299` and `sizing.css:258, :259`**: read false, written by the patch (§4.3), and `MS8-r26-proposed.diff`. (4) The 18 reported lines, eight of them new (§4.2). (5) §4.4's readings, above all where this seat and FV9 differ (`dark-arm.css:82`, `:213`). (6) §4.5's three finds outside both lists. (7) That `MS8-rulings.json`'s 262 whys name each clause (R-26), not one file `why` per file |
| **the pass-10 agglomeration** | the minor's R-21 (b) reading moved from "two FALSE lines, a proposed delta" (MS7) to "two FALSE sentences, a proposed delta" here. The class is the one FV9 §4.2 met: a line the build wrote or made false, found once R-26 reads each clause. `icon-button.css:118-120` is one sentence false on both trees (FV9 §4.2 on the floor, printed there; §4.5 here, outside the minor's lists), so the next comment-only build can rewrite it once for both |
| the landing docs pass | §4.2's 18 lines and §4.5's three, beside FV9's and Crit8's lists |
| the WebKit seat | nothing new: the minor v8's specimen is the minor v7's bytes |
| the owner | Reg P9-4's sheet, unchanged, with R-21 beside it. No new frame is owed: the minor v8 moves no pixel |

---

## 8 · Teardown and reproduce

**Torn down** (`phases.log`, teardown 20:06:25-20:06:50, load 35.42 → 37.06): `git worktree remove --force` of `.claude/worktrees/bl/D3/p10/minor8/wt` and `git worktree prune`. `.claude/worktrees/bl/D3/p10/minor8/` was removed, then the empty `p10/`. `ls .claude/worktrees/bl/D3/` prints `p3 p5 p6`, `git worktree list` has no `D3/p10` entry, and `git status --porcelain -- src demo tests DESIGN.md` prints nothing. No process of this seat is left running. The checkout's writes are new untracked files under `pass-10/`: the `MS8-*` files, `minor-split-v8.patch`, `minor-split-v8-R25.diff` and this document. The absolute paths in the records name the removed scratch trees; `MS8-run.sh setup` and the phases after it rebuild them byte for byte from the banked patches.

```sh
P10=docs/tranches/BL/design/material/pass-10
G="$HOME/.claude/guard/guarded"
$G --light --timeout 15 -- bash $P10/MS8-run.sh setup      # worktree at HEAD, node_modules linked, minor v7 applied, trees/minor7 cut
$G --light --timeout 15 -- bash $P10/MS8-run.sh edit       # r21b delta + MS8-r25-paren.py; or apply $P10/minor-split-v8.patch to HEAD
$G --light --timeout 10 -- bash $P10/MS8-run.sh check
$G --light --timeout 10 -- bash $P10/MS8-run.sh trees
$G --light --timeout 20 -- bash $P10/MS8-run.sh static
$G --timeout 60 -- bash $P10/MS8-run.sh same
$G --timeout 30 -- bash $P10/MS8-run.sh bite
$G --timeout 60 -- bash $P10/MS8-run.sh toolchain
$G --light --timeout 10 -- bash $P10/MS8-run.sh ratchet
$G --light --timeout 10 -- bash $P10/MS8-run.sh proposed   # MS8-r26-proposed.diff and trees/minor8p
$G --timeout 30 -- bash $P10/MS8-run.sh proposed-same
$G --light --timeout 15 -- bash $P10/MS8-run.sh sweep      # writes MS8-rulings-proposed.json; reads MS8-rulings.json
$G --light --timeout 10 -- bash $P10/MS8-run.sh teardown
```

`MS8-rulings.json` is regenerated by `python3 -I $P10/MS8-rulings.py MS8-records/sweep-minor8.log $P10/MS8-rulings.json` after `sweep`'s LIST run.
