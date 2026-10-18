# D3 · pass 8 · the fresh critic: floor v7 on the fixed 44 rows, the minor split v6 on its gates

| field | value |
|---|---|
| seat | D3 pass 8, the fresh adversarial critic (`REGISTRY.md` P7-6.2 step 5). I authored nothing in D3 |
| model | `claude-opus-5-5`, asserted from own system identity (Opus) |
| HEAD | `c3aa357b0` (the owed-WebKit bank, docs only). `git diff --stat 1da7eb17b HEAD -- src demo tests package.json scripts tests-visual vite.targets.ts .bundle-ratchet .published-roster DESIGN.md docs/canon` prints nothing, so every tree below is the published 10.1.0 source plus the named patch |
| patches | `floor-v6.patch` `235a5117` (87 files), `floor-v7.patch` `4a1e09c8` (88), `minor-split-v5.patch` `a790fd05` (57), `minor-split-v6.patch` `4ea01c0e` (59): each `git apply --check` exits 0 at HEAD. Composition re-proved with `cmp`: floor v6 + `floor-v7-R17.diff` = floor v7, minor v5 + `minor-split-v6-R18.diff` = minor v6, both exit 0 (`crit-records/compose.log`) |
| owner rulings | **None arrived.** `audit/INBOUND.md` still ends at O-98, and `FORMATION-PROGRESS.md`'s D3 lines after the pass-7 close are the pass-8 launch and the four seat banks (H8, floor v7, minor v6, owed WebKit). No ruling on Q-1, Q-3, Q-11 (either clause) or Q-14. The P7-4 defaults apply. **This critic runs unruled by the driver's record (P7-6.2 step 5), so pass 8 cannot be clean: the owner's five rows stay open whatever the builds read** |
| engines | the builds are browser-free and their bytes held (§1), so no battery ran. One Playwright WebKit capture (floor v7 dialog, both themes), to check the owed-WebKit records against fresh raw pixels, queued under `guarded --exclusive webkit` and was never admitted in 91 min. It is owed (§6.3), and no row depends on it. **Every real-Safari cell: UNMEASURED (owner's safaridriver checkbox)** |
| records | `D3-crit-run.sh` (phases `setup`, `compose`, `trees`, `static`, `sweep`, `same`, `toolchain`, `teardown`), `D3-crit-run2.sh` (the WebKit capture and its read), `crit-sweep.py` (my own prose sweep, no harness code), `crit-records/` (`phases.log` and `admissions.log` carry each phase's time and load) |
| fences | No tracked source edited in the checkout; no git write in it beyond `git worktree add`/`remove` of `.claude/worktrees/bl/D3/p8/crit/wt`. Every patch swap, tree cut, build and capture happened in that worktree (`$W/.d3out`, `$W/.cache-crit`), each swap checked by `cmp` or a clean `git status`. Writes in the checkout only under `docs/tranches/BL/design/material/pass-8/`. Nothing ran in a sibling repo. Worktree and `.claude/worktrees/bl/D3/p8/crit/` removed at the end (§9) |
| machine law | Every phase through `~/.claude/guard/guarded` as the literal command word: `setup`, `compose`, `trees`, `static`, `sweep`, `teardown` and the WebKit read under `--light` (no browser, no build); `same` and `toolchain` as heavy runs (`--timeout 60`), one at a time; the one WebKit capture under `--exclusive webkit --timeout 60`. vitest `--maxWorkers=2`. The kernel-zone refusal never fired. Loads 20.7-33.1 over my phases (`phases.log`), from runs outside this seat |

Short citations: `Reg` (`REGISTRY.md`, the Pass 7 part), `H8`, `FV7` (`FLOOR-V7.md`), `MS6` (`MINOR-SPLIT-v6.md`), `WK` (`WEBKIT-OWED.md`), `Crit7` (`pass-7/D3-critique.md`).

---

## 0 · Verdict

**Floor v7: ADVANCE, 37/44 = 0.841. Not clean (7 open). Two-clean count stays 0 of 2. The loop is not at its owner-gated fixed point.**

- **Rows 20 and FL-12 do not close (A-1, §3).** R-17 is built exactly as ruled, H8-1 reads 0 on floor v7 and reds floor v6 3/85, and I reproduced both. But four sentences in four files floor v7 touches still describe the patch's deleted or changed mechanisms as live, and none of them is within H8-1's reach:
  - `src/styles/glass/surfaces-pager.css:29-36`: "The element-level oklab TINT seam … the no-op floor (`X, src 0%) ≡ X` … under `.dark` the tint arm LIFTS it toward luminous warm-dark … `in oklab` is the glass-tint perceptual family". Floor v7's plate is `color-mix(in srgb, var(--card) …, transparent)` with no ink, no clamp and no oklab (`veil.css:64-74`), and the patch deleted the ink (`--glass-veil-ink`) and the clamp. The patch edits line 33 of this same comment.
  - `src/components/dock/GlassDock.vue:467`: "the `.dock-search-field` surface reads the tint seam (dock/search.css) so the active field reads ≥4.5:1". Floor v7's `dock/search.css` has no tint seam: its header now says "≥4.5:1, the bound" and "the legibility seam".
  - `src/components/dock/styles/index.css:79-83`: "the active-field tint legibility seam", "CONSUMES the tint seam". The same mechanism, the same file.
  - `src/styles/tokens/glass-deep.css:12-13` and `:54`: "the calm ladder then moved to 10/14/16/20/22px … A deep overlay painted 16px where the plain overlay **paints 22**" and "the calm ladder **has since moved to** 10/14/16/20/22px". Floor v7's ladder is 6/10/12/18/20 (`tokens/glass.css:65-69`), which the patch wrote into the same file's `:42`.
- **Five rows wait only on the owner:** 3, 9, 23, N-1, N-2 (Q-1, Q-3, Q-11 both clauses, Q-14). No ruling has arrived.
- **Everything else the seats claimed reproduces:** byte identity in both outputs for both builds, against each other and against pass 7's banked lists (§1); DEL under H8-1 and H8-2 (§2); the toolchain (§1.3); the owed WebKit cells (§6).

**The minor split v6:** W-0.1 G1-G7 **PASS** and W-0.11 G1-G6 **PASS**, carried on bytes I re-proved identical to the minor v5's (§5). R-18 is built against A-3's table: all 15 sites, each rewrite true in the minor, the 15 new names guarding exactly A-3's sites. H8-1 over its own patch stays red (6/47) until the critic's rulings land. I rule them in §5.2: 3 site entries, and 11 sentences (in 9 files) that a comment-only minor v7 rewrites.

---

## 1 · Byte identity, re-proved, and the toolchain

### 1.1 · Floor v7 against floor v6 (`same.log`, 15:52:48-15:53:06, load 26.0 → 29.0)

Floor v7, floor v6, the minor v6, the minor v5 and HEAD were each built by `harness/build.mjs --demo` under one label in my worktree, each output moved aside before the next.

| comparison | specimen dist | dist-demo |
|---|---|---|
| floor v6 vs floor v7 | **0 differing entries** (`diff -rq`); CSS 391,121 B `347288745da7cf97` both | **0** |
| minor v5 vs minor v6 | **0**; CSS 398,432 B `e11613c3eeb45cab` both | **0** |
| bite: HEAD vs floor v7 | 5 (HEAD CSS 394,891 B `b09b9e73a61b75b1`) | 261 |
| bite: HEAD vs minor v6 | 5 | 229 |
| my dist-demo sha256 list vs pass 7's banked floor v6 / minor v5, and vs FV7's / MS6's | — | **identical, all four** (`diff` exit 0) |
| my specimen JS, the worktree path rewritten to pass 7's | floor v7 `24a1a250…0683007e` = banked floor v6 `index-RaLAMJS8.js`; minor v6 `b37ddee6…b695bcded` = banked minor v5 `index-DF_nQ09U.js` | — |

FV7 §3 and MS6 §3 hold. Every paint verdict of floor v6 carries to floor v7, and every one of the minor v5 carries to the minor v6.

### 1.2 · Why it holds

R-17 changes one CSS comment and one test file; R-18 changes CSS comments in seven files and one test title. No `.vue` file moves, so no scoped id moves. The `same` builds read the trees they were given: `srcDirtyFiles` differs by the edited CSS file, and HEAD differs in both outputs.

### 1.3 · Toolchain (`toolchain.log`, 15:56:55-16:00:22, load 22.9-33.1)

| step | floor v7 | the minor v6 |
|---|---|---|
| `vue-tsc --noEmit` | exit 0 | exit 0 |
| library build | exit 0 | exit 0 |
| `vue-tsc -p tsconfig.test.json`, after the build | exit 0 | exit 0 |
| dist-demo build | exit 0 | exit 0 |
| `vitest run --maxWorkers=2` | **237 files, 2318 passed**, 10 expected-fail, 1 skipped | **239 files, 2321 passed**, 10 expected-fail, 1 skipped |

Equal to FV7 §4 and MS6 §5. My first run left out the dist-demo build, so `boot-graph.test.ts`'s three build-arm rows read "dist-demo absent" in both trees (`units-*-nodemo.log`, `toolchain-nodemo.log`). That was my ordering, not the trees: with the dist-demo built, both read 0 failed.

---

## 2 · H8 checked: the declaration, DEL's arms, and the rulings owed to the critic

### 2.1 · Reproduced (`static.log`, 15:47:44-15:47:54, load 26.9 → 27.7)

- **The declaration**, rebuilt by `declare-removed.mjs` from `floor-v7.patch` on my floor v7 tree with `deletes-floor.json` and `H8-exact-floor-v6.json`: identical to `FV7-records/declare-floor-v7.json` (`patch` label aside). 68 names, 5 exact only, 9 sites.
- **DEL under H8-1 + H8-2:** floor v7 **PASS 85**; floor v6 **FAIL 3/85** at `forms-seam.test.ts:24`, `:91` and `liquid-fill.css:74`, one for one with H8 and FV7; `deletes-floor.json` alone on floor v7 FAIL 5/16 at exactly the five site-exempted lines.
- **LAW** PASS 68 (my two scripts added). **Census** floor v7 and minor v6 `stacked=0 halo=0 blur=0 open=0`; HEAD `stacked=2 halo=2 blur=5 open=9`, exit 1. **HOV** 58 on both.

### 2.2 · Each `exact` entry, read in context

| entry | site | ruling |
|---|---|---|
| `backdropMode`, `backdrop mode`, `data-backdrop-mode` | `GlassDock.posture.test.ts:153-155` | **upheld**: the comment says the prop is struck, and the assertion checks `data-backdrop-mode` is undefined. It asserts the deletion |
| `--glass-veil-ink`, `--glass-veil-base`, `--glass-backdrop-luma`, `--glass-backdrop` | `glass-subtlety.test.ts:186, 187, 192` | **upheld**: `expect(map.has(...)).toBe(false)` and `not.toMatch(/--glass-backdrop-luma|clamp\(/)`. The `--glass-backdrop` entry is the prefix artifact H8 §1.2 states |
| `--ink-perimeter` | `scale-paper.css:90` | **upheld**: inside a dated, struck BK #83 note, "(then 0.48)". History |
| `--glass-blur-floating-radius` | `deep.css:69` | **upheld**: "The predecessor LERPed … (20px) toward … (16px)". History, and the next lines give floor v7's grade (7.75 … 25px) |
| the five name-only entries (`--glass-backdrop`, `backgroundCanvas`, `compositeOver`, `backdropSample`, `sampleAge`) | word-form hits | **upheld**: each cited hit read; all live prose about other things |

### 2.3 · H8's departures and handed-on rulings

| item | ruling | evidence |
|---|---|---|
| H8 §1.3: the value arm reads **every** word of the token's name, not one | **upheld.** My own sweep (`crit-sweep.py`, one-word arm V1) lists 31 one-word lines on floor v7 (`sweep-fv7.txt`). I read each: radius tables, Apple measures, shadow offsets, a touch radius, dated history ("then stood at 0.48", "the first cut's bytes", "the spec drafted 10px"). None describes a changed rung as live. One-word buys false positives and no true site | `sweep-fv7.txt` |
| FV7 §1.2: R-17 rewrites a second file, `liquid-fill.css:74`, against R-17 (i)'s "only this file" | **upheld.** H8-1 gates all of `src/`, and an `exact` entry would exempt a false sentence (E-2). The patch grows to 88 paths, all inside both byte proofs | §1 |
| FV7 §1.1: the extra `forms-seam.test.ts:93-94` rewrite | **upheld**, and it sets the standard §3 applies: an old literal quoted as the current comparison is stale even when H8-1 cannot see it | — |
| H8-2: 7 of the pass-7 critic's 28 absent tokens declared, 21 out | **upheld** per P7-5 ("function locals and browser APIs stay out"). I checked the split's line citations against `floor-v6.patch`; none of the 21 has a stale hit on floor v7 (my sweep's deleted-token arm reads 0 prose hits for the 7 deleted tokens) | `sweep-fv7.txt` |
| H8 §4.3 / MS6 §4: R-18 (iv) against (v) | **ruled:** (iv) binds the seat, (v) binds the build after the critic. The seat was right not to sweep beyond A-3's list. My rulings in §5.2 are the list the minor v7 builds, and H8-1 at 0 over the minor's own patch is the minor v7's fixture | §5.2 |
| WK §8 (3): `wk-plants.mjs` narrows engines by mutating `lib.mjs`'s exported `ENGINES` array | **acceptable for a record seat, not as the instrument's form.** It changes no verdict (every plant line equals FV6's). P-1 prefers one flag: the plant scripts take `--engines` as `capture.mjs` does. To the pass-9 instrument list | WK §2 |

---

## 3 · A-1 · Rows 20 and FL-12 stay open: four touched-file sentences, outside both of DEL's arms

P7-6.3's test for rows 20 and FL-12 has three parts: H8-1 at 0 with its value arm, floor v6 red under it, and "the critic finding no sentence in a touched file that describes a deleted or changed mechanism of the patch as live". The first two hold (§2.1). The third does not.

The pass-7 critic's wide sweep listed luma, bucket, knee, sampler, "darken" and "measured backdrop", but not "tint". I swept every floor v7 touched path in `src/` and `demo/` for tint, darken, clamp, luma, bucket, observer, knee, "sampled" and "backdrop mode" (`sweep-fv7-wide-touched.txt`, 193 lines) and read each line in context. Four sites remain (`counterexamples-fv7.txt` holds each in context beside HEAD):

| # | site (floor v7) | sentence (deciding clause) | what floor v7 does | the patch's mechanism |
|---|---|---|---|---|
| 1 | `src/styles/glass/surfaces-pager.css:29-36` | "The element-level oklab TINT seam (NOT the raw … token …). At the `--glass-level: 0` default this is the no-op floor (`X, src 0%) ≡ X` — byte-identical pager pixels over a flat page); the pill paints the floating rung's chrome-bound veil; under `.dark` the tint arm LIFTS it toward luminous warm-dark, never a charcoal slab. `in oklab` is the glass-tint perceptual family …" | The rule applies `glass-plate`, which is `color-mix(in srgb, var(--card) …, transparent)`: one pole, no ink, no clamp, no oklab, no `src %`, and the same composition in both themes (`veil.css:64-74`). `--glass-level`'s default is 1 | HEAD's plate was `oklch(from var(--glass-veil-ink) …)` mixed into `--card` with the luma clamp (`head veil.css:60-80`). The patch deletes `--glass-veil-ink` (a declared deletion) and the clamp. **It edits line 33 of this comment** and leaves the clauses around it. The registry has ruled this same sentence false in both modes once already, for the minor (Crit7 A-3, `surfaces-pager.css:29-32`) |
| 2 | `src/components/dock/GlassDock.vue:467` (HTML comment) | "the `.dock-search-field` surface reads the tint seam (dock/search.css) so the active field reads ≥4.5:1 over the backdrop" | `dock/search.css:3-9` on floor v7: "(≥4.5:1, the bound) … composes its plate at the ELEMENT … field and plate hold one bound by construction". No tint seam | HEAD's search.css: "(≥4.5:1, the darken seam)", the clamp reading `--glass-backdrop-luma`. The patch replaces it with the bound. It deletes 38 lines of `GlassDock.vue` and leaves this one |
| 3 | `src/components/dock/styles/index.css:79-83` | "the active-field tint legibility seam … CONSUMES the tint seam + the menu-row recipe" | as #2 | as #2. The patch edits `:21-24` of this file |
| 4 | `src/styles/tokens/glass-deep.css:12-13`, `:54` | ":12-13 the calm ladder then moved to 10/14/16/20/22px and the LERP ran 20px -> 16px. A deep overlay painted 16px where the plain overlay **paints 22**"; ":54 the calm ladder **has since moved to** 10/14/16/20/22px" | the plain overlay paints 20 (`--glass-blur-overlay-radius: 20px`), and the ladder is 6/10/12/18/20 (`tokens/glass.css:65-69`) | the patch changes all five radii and rewrites `:17`, `:42`, `:60`, `:87`, `:104-105` of this file to the new ladder. `:42` now reads "glass-ui calm ladder: 6/10/12/18/20px", and twelve lines later `:54` says it is 10/14/16/20/22 |

**Why each is in the row, and why none is borderline.** #1-#3 name a mechanism the patch deletes as the thing that paints: the tint seam is the clamp-and-ink mix, and floor v7 has neither. #4 states a changed value in the present tense, which is the class R-17 (iii) exists for. It is the same class as FV7's own `forms-seam.test.ts:93-94` rewrite, applied by the same standard. I read the rest of `glass-deep.css`'s narrative as history ("then", "painted", "the first cut") and do not count it.

**Why H8-1 cannot see them.**
- **#1-#3, a homonym the declaration cannot carry.** "tint seam" is also the live feedback-tone seam (`G-FEEDBACK-TINT-SEAM`, `feedback-tone.css`, `metric/styles.css:86`), so MS6 §2.1 kept it out of the minor's declaration and `deletes-floor.json` never had it. H8-1's `at` site form makes this declarable now: declare `tint seam`, `oklab tint` and `tint arm` for the floor, with site entries for the live homonyms (`metric/styles.css:86`, the `feedback-tint-seam` test and gate names, `music-staff/README.md:60` if it is ruled live). `PagerDots.vue:426` and `carousel.vue:349` say "retint seam", which a word-bounded `tint seam` does not match.
- **#4, a value written outside the arm's literal.** "paints 22" has no unit, and "10/14/16/20/22px" is a ladder tuple whose words are "calm ladder", not `--glass-blur-*-radius`. Neither the every-word nor the one-word reading reaches either one (my one-word sweep missed both).

**Counterexample in the tree: rows 20 and FL-12 OPEN.** This is the fifth pass running in which the prose rows reopen on a sentence outside the instrument's reach (register, earned darken, two other mechanisms, a test file, now a homonym and a list literal). **The cure is comment-only:** four sentences in four files (R-20 below, for the agglomerate). `GlassDock.vue:467` is inside an HTML template comment, so the floor v8 seat must prove the dist-demo byte proof again (Vue strips template comments in production builds; FV6 saw scoped ids move on SFC edits, so the proof is owed, not assumed).

**Recorded beside the rows, not rows** (pre-existing at HEAD, or not the patch's mechanism):
- `property-regs.css:162-165`, floor v7 (a touched file): "the deep endpoint (depth 1 ≡ saturate 1.5 / blur 16px)" describes the absolute deep endpoint that 10.1.0 already retired (`glass-subtlety.test.ts:268`). It is stale at HEAD, and the patch did not delete it. To the landing's docs pass with `DESIGN.md:521`.
- `deep.css:18` "the tint axis + the a11y brackets all compose unchanged": unchanged from HEAD, and `tokens/glass.css:164`'s live per-instance fill-tint axis gives it a true reading.
- `music-staff/README.md:60` "its own tint seam": not a touched file. It is printed for the docs pass only if R-20's declaration reads it.

---

## 4 · The 44 rows (floor v7; my measurement; defaults built, unruled rows open)

| # | row | status | evidence or counterexample | closes on |
|---|---|---|---|---|
| 1, 2, 4, 5, 7, 8, 10-19, 21, 22, 24 | RAW, M-1, M-2, M-2m, M-4, M-5, M-7, M-8, M-9, T, release, O-66 G2, O-66 G3, W-A, engines, plants, FL-13, O-87, STACK | **PASS (19)** | carried from Crit7 §3, §6 on outputs I proved byte-identical (§1). Row 11 (release): my toolchain (§1.3). Row 18: the owed WebKit dark drift window reads 43/43 twice (WK §6), so Crit7's one WebKit cell was the guard kill. Row 19: the paint plants carry on byte-identical specimens and read on floor v7 in WebKit (WK §2); DEL's plant reds 3/85 (§2.1). Row 22: census 0, its 10.1.0 bite exact | — |
| 3 | M-1x | OPEN | REPORTED under (a): content grey off paper. `var-q11b` 21/21 on record, both engines (WK §2 re-read WebKit) | **owner, Q-11 chrome clause**: (a) by its text, or (b) by selecting `pass-4/fv3/q11b.*` |
| 6 | M-3 | **PASS** | carried: H7-1, Chromium light Close ring 3.52 (Crit7 §2). HEAD's ring reds under M-3 (Chromium 1.91; WebKit 1.84, WK §3). The two ring plants red under the independent reader in Chromium and under M-3 (relabelled) in WebKit. F-1 corrects the record of which instrument read them (§6.2), not the row | — |
| 9 | M-6 | OPEN | stepped 29/120; `--q1 a` PASS 88/88 both engines | **owner, Q-1**: (a) by selection |
| **20** | prose sweep of every touched file | **OPEN** (the seat scored PASS) | A-1 (§3): `surfaces-pager.css:29-36`, `GlassDock.vue:467`, `dock/styles/index.css:79-83`, `glass-deep.css:12-13, :54` | route: **R-20** (four comment rewrites) and H9-1/H9-2 |
| 23 | gestalt, O-62 frame | OPEN | unchanged: floor v7 moves no specimen pixel (§1) | **owner: Q-11 content clause, Q-3, Q-14**, with the frames (Reg P7-4) |
| FL-1..FL-11, FL-13..FL-16 | the floor | **PASS 15** | carried on byte-identical specimens; FL-15's `plant-darkperim` FAIL 47/87 in WebKit on floor v7 (WK §2) | — |
| **FL-12** | prose sweep of every touched file | **OPEN** (the seat scored PASS) | as row 20 | as row 20 |
| N-1 | Q-1's ruling built | OPEN | (a) built; (c) is `pass-4/fv3/q1c.*` (FAIL 2/96, both engines) | **owner, Q-1** |
| N-2 | Q-11's ruling built | OPEN | (a) built; (b) is `pass-4/fv3/q11b.*` | **owner, Q-11 chrome clause** |
| N-3 | the dock's held halo | **PASS (attributed), both themes** | carried: M-2h 2/68 | — |
| N-4 | the minor split's W-0.1 reading | **PASS** | §5 | — |

**Count: 37 PASS, 7 OPEN = 0.841.** The seat scored 39; the critic's 37 stands, because A-1's four counterexamples are in the tree. **Closed this pass: none. Opened: none** (20 and FL-12 were open going in, and R-17 did not close them). **Route-owned open rows: 2** (20, FL-12). **Waiting only on the owner: 5** (3, 9, 23, N-1, N-2).

**Which ruling closes each owner row** (no change from Reg P7-4; floor v7 builds every default):

| row | ruling | how |
|---|---|---|
| 3, N-2 | **Q-11 chrome clause** | (a) closes both by its text, no build; (b) selects `fv3/q11b.*` and owes the full battery in both engines |
| 9, N-1 | **Q-1** | (a) closes both by selection (`--q1 a` PASS 88/88 on floor v7's bytes) |
| 23 | **Q-11 content clause + Q-3 + Q-14**, with the frames | "grey content accepted off paper", Q-3 (a), Q-14 (a) close it on the owner's word, with no build |

**The fixed point is one pass further off.** P7-6.4 put it at "pass 8 closes rows 20 and FL-12 and the sheet is still unanswered". Pass 8 does not close them. If R-20 closes them in pass 9 under H9-1 and H9-2, floor v8 reads 39/44 with only owner rows open, and that is the fixed point.

---

## 5 · The minor split v6 (minor_gates)

### 5.1 · The gates, carried where the bytes hold

The minor v6's specimen and dist-demo are the minor v5's bytes (§1.1, re-proved, and tied to pass 7's banked lists). So every paint verdict of Crit7 §5, MS5 and MS4 carries.

| gate | verdict | basis |
|---|---|---|
| **W-0.1 G1** M-1 | **PASS** over paper (11/11 both engines); off paper REPORTED 48/66 (Q-11 content unruled) | carried, bytes held |
| **G2** O-66 field, **G3** O-66 row | **PASS** | carried; HOV 58 read here |
| **G4** W-A light | **PASS** (108/108) | carried |
| **G5** scope | **PASS**, rebind owed at landing (+2,333 B, MS6 §5) | R-18 removes no name (comments and one title); my library build exits 0 |
| **G6** per R-9 | **PASS** (0.0000; raw 1/13 at ΔE 0.0022 printed beside it) | carried |
| **G7** M-2 and M-3 halves (M-3 under H7-1) | **PASS** (0 regressions) | carried; WK §3 re-read the minor's WebKit Close rings on fresh pixels (light 3.25, dark arm equal to MS5 to the digit) |
| **W-0.11 G1-G4** | **PASS**: census `stacked=0 halo=0 blur=0 open=0`, HEAD exactly `2/2/5/9` | read here |
| **W-0.11 G5** | **PASS** (as W-0.1 G5) | — |
| **W-0.11 G6** | **PASS** (M-2 720, M-3 214 HEAD-PASS, 0 regress) | carried |
| STACK (FL-14) | 24/24 | carried |
| units | 2321 passed, 0 failed | read here (§1.3) |

### 5.2 · R-18 against A-3, and the critic's rulings R-18 (iv) sends here

**A-3's count.** A-3's table names 15 sites (adaptive-legibility 5, search 3, shell 2, index 1, property-regs 2, surface-axis 1, surfaces-pager 1). Its prose says 13, which is the darken sweep's line count (MS6 §1). **The seat built all 15, which is the right reading.**

**Each rewrite, read in the minor v6 tree** (`readings-minor6.txt`): every one is true in the minor. Two needed checking. `adaptive-legibility.css:57-60` now says the unconditional self-engage "re-points `--dock-fg-on-aurora` and the muted register to the full `--foreground` ink, and it moves no plate", and `:46-47` declare exactly that. `index.css:21-24` now says the file "holds no clamp and no bucket", and `:50-54` say there is no dock bucket while the clamp lives in `veil.css`. The forms-seam title keeps "(fill α fenced on W-FROST)", which is true in the minor, where `--input-on-glass` is live.

**The declaration.** Under `deletes-minor.json` (39 names), the minor v5 reds each of the 15 new names only at A-3's sites (`del-minor-h7-minor5.log`), and the minor v6 reads 0 in `src/` and `demo/`. Over `tests/` it reads 2/39, at the two test comments ruled below.

**My rulings on MS6 §4.2's eight sites and §1.4's sentences:**

| site (minor v6) | ruling | why |
|---|---|---|
| `sheet/styles.css:197` "DARK: two veil steps … (`--glass-veil-step` 0.04, tokens/dark-arm.css)" | **true: site entry** | `dark-arm.css:277` declares 0.04 in the minor. The value arm keyed on the light `:root` change (class H9-3) |
| `overlay-plate.css:173` "BK #80 measured at 3.0:1 at 0.48" | **true: site entry** | a dated measurement, R-17 (iii)'s named exemption |
| `deep.css:73` "The predecessor LERPed … (20px)" | **true: site entry** | history; the floor's twin `deep.css:69` is upheld in §2.2 |
| `DESIGN.md:1805` "(`--ink-seam` 0.08, `--ink-edge` 0.16, `--ink-perimeter` 0.48)" | **false: rewrite** | present tense, and the minor's rung is 0.54 (`color-radius.css:154`). The minor touches `DESIGN.md`. P-3: name the tokens and drop the literals |
| `liquid-fill.css:76` "(the 14px radius that SCALES …)" | **false: rewrite** as FV7 §1.2 did | the minor's quiet radius is 10px |
| `Button.test.ts:146` "the tier, the earned-darken clamp and `--glass-level`" | **false in light: rewrite** | R-13's register: the clamp is live in the minor, and in light it earns a thicker cream pole, not a darken |
| `feedback-tint-seam.test.ts:11` "its tier ink, its earned-darken clamp, its `--glass-level`" | **false in light: rewrite** | as above |
| `adaptive-legibility.css:61-62` "(`--card`, the warm-white surface base the bright bucket implies)" and `:65` "The bucket is the floor; this is the native pick." | **false in both modes: rewrite** | the same file says there is no bucket for the dock's ink (`:50-54`), and that the self-engage (`:57-60`) and the declarative lift (`:68`) are the AA floor. R-18 made the contradiction visible in the paragraph it rewrote |
| `surfaces-pager.css:34-36` "under `.dark` the tint arm LIFTS it toward luminous warm-dark" | **false in both modes: rewrite** | there is no tint arm (`ladder.css:165`, and R-18's own `surface-axis.css:79`), and the same sentence's `:33` says the earned ink is "darker in dark" |
| `property-regs.css:154-155` "… AND tint-toward-ink under `prefers-contrast: more`" | **false in both modes: rewrite** | `a11y-fallback.css:32-46`: the bracket sets `--glass-level: 0.3` and `--glass-definition: 1`, and "the separate tint-darken this bracket used to add" is gone. R-18 rewrites `:152`, two lines above |
| `property-regs.css:124` "TINT (whole-plate legibility)" | **true as a label: kept** | it names the axis the next clause describes; floor v7 carries the same label ("TINT (whole-plate legibility, the veil)") |
| `forms-seam.test.ts:94-95` "a composited mass of 0.075 against the ladder's 0.48" | **false: rewrite** as FV7 did | the minor's rung is 0.54. FV7's rewrite of this same line sets the standard |
| `glass-deep.css:12-13`, `:54` (A-1 #4, the same lines in the minor) | **false: rewrite** | the minor's ladder is floor v7's (`diff` of the two files prints nothing) |
| `GlassDock.vue:505`, `dock/styles/index.css:80, 85` "the tint seam" | **true in the minor: kept** | the minor keeps the clamp and its observer, and "tint" is mode-neutral. The floor's twin is false only because the floor deletes the clamp |

So the minor v7 is **three site entries in `deletes-minor.json`** (`sheet/styles.css:197`, `overlay-plate.css:173`, `deep.css:73`, as in `MS6-proposed-sites.json`), plus **comment-only rewrites at 11 sites in 9 files**: `DESIGN.md:1805`, `liquid-fill.css:76`, `Button.test.ts:146`, `feedback-tint-seam.test.ts:11`, `adaptive-legibility.css:61-62` and `:65`, `surfaces-pager.css:34-36`, `property-regs.css:154-155`, `forms-seam.test.ts:94-95`, and `glass-deep.css:12-13` and `:54`. Its fixture is H8-1 at 0 over its own patch, with H9-1/H9-2's arms. **None is a gate, and no paint verdict moves.** It is the light-law prose landing item (P7-3.2), so the tree that lands is the tree measured.

**Recorded beside, not ruled here:** `DESIGN.md:516`'s ladder table ("Floating … `blur(16px) saturate(1.4)`") is stale at HEAD and in every build, so it goes to the landing's docs pass.

### 5.3 · Can W-0.1 and W-0.11 ship from the minor v6 in 10.2.0? No

1. **The entry gate:** 0 of 2 clean passes. Its open rows are floor v7's two route rows (A-1) and five owner rows.
2. **Q-11's content clause:** G1 off paper reads 48/66 grey, content included.
3. **The minor v7** (§5.2): 3 site entries and 11 comment rewrites, with the byte proof again.
4. **The landing's own items**, unchanged (R-9's G6 reading in W-0.1's text, one probe per gate, the ratchet rebind at +2,333 B).
5. **10.2.0 is also gated on D2 converging** (O-88).

Earliest landing: the close of pass 10, and only if passes 9 and 10 are both clean, which needs the owner's answers first.

---

## 6 · The owed WebKit cells, read against raw pixels

### 6.1 · The records

WK's records are consistent with themselves and with the banked readings. `plants/diff-fv6-fv7-webkit.txt` shows three deletions (reads the owed list does not name) and no changed line. The verbose M-3 file prints `dialog·ring:close p05 3.07 … (worst of three: no full-coverage column)` on every light ground, and `ringpx-fv7-dlg-webkit.log` reads MINE 3.07, SOLID 3.51 and DARKEST 3.52 at column 849. The drift files read 51 frames over 100.0 s, 43/43, worst 5.41, twice. WK's raw PNGs went with its worktree, so I re-captured the floor v7 dialog scene in Playwright WebKit (§6.3) and read it with M-3 and the pass-7 critic's reader.

### 6.2 · F-1 confirmed

`rows.mjs:17` picks `variant: want.variant || "base"`, so M-3 reads nothing in a capture labelled `ring040` or `ring1px`. Crit7's own `verbose/m3-fv6-ring040-chromium.txt` and `-ring1px-` each hold 18 lines: 14 `MISSING`, 0 Close-ring rows, and `FAIL (14 of 14 gated rows)`. Crit7 §2's table and Reg P7-1.1's R-14 row cite "M-3" values for the two plants (2.50, 2.43) that are the independent reader's. **Row 6 does not move.** HEAD's capture is variant `base`, so M-3 did read HEAD's ring red (1.91 Chromium, 1.84 WebKit). The record correction is the agglomerate's, and the class (a witness that counts an absent variant as a FAIL, contrary to E-2) goes to the pass-9 list as WK placed it.

### 6.3 · The fresh WebKit capture

**Owed, not read.** My one admission (`D3-crit-run2.sh wk-dlg`, floor v7 dialog, both themes) queued under `guarded --exclusive webkit --timeout 60` at 16:01:16 (load 30.4). At 17:32:22 it had waited 91 minutes behind other repos' WebKit runs without admission (`admissions.log`, `adm-wk-dlg.out`: "waiting for the 'webkit' lock"). Under the task's rule, I stopped the waiter and recorded the cell as owed. No WebKit browser of mine launched.

What this leaves: WK's records are not checked against raw pixels by a second capture. They are internally consistent (§6.1), each equals its banked value from an earlier independent capture (FV6's battery, MS5 §4.1), and the specimen bytes are proved identical (§1). **No row depends on them:** WebKit is informational for M-3 and M-2m, and row 19's plants carry on byte-identical specimens. The owed cell is the floor v7 WebKit dialog Close ring (3.07 light, 4.30 dark) on fresh pixels. The next WebKit seat reads it with `D3-crit-run2.sh` as written.

---

## 7 · Next-pass classes (no row added)

| id | class | found by | placed |
|---|---|---|---|
| **H9-1** | a deleted concept whose name is also a live homonym ("tint seam", "tint arm", "oklab tint") cannot be declared without site entries, so a sentence calling the deleted one live escapes DEL. The pass-7 wide sweep also omitted "tint" | A-1 #1-#3 | **instrument:** declare the three phrases in the floor's concepts, with `at` site entries for the live feedback-tone homonyms (`metric/styles.css:86`, the gate's own name lines). Plant: floor v7 as banked reds at `surfaces-pager.css:29, 34`, `GlassDock.vue:467` and `dock/styles/index.css:80, 83`. Fixture: floor v8 at 0 |
| **H9-2** | the value arm reads `<literal><unit>` beside the token's words, so a changed ladder written as a tuple ("10/14/16/20/22px") or a bare number in a sentence about the rung ("the plain overlay paints 22") escapes it | A-1 #4 | **instrument:** a tuple arm. For each family whose five rungs the patch changes (`--glass-blur-*-radius`), the old tuple in order, with or without a unit and with `/` or `·` separators, is a prose hit unless a site entry marks it history. Plant: floor v7 `glass-deep.css:12, :54`. Bare-number present-tense statements stay the critic's read |
| **H9-3** | the value arm does not check which arm (`:root` or `.dark`) the sentence cites, so a true dark-arm figure reds when only the light value changed | MS6 §7 | **instrument note:** key a changed value by file and selector; a sentence citing the unchanged arm's file is not a hit. Fixture: minor v6 `sheet/styles.css:197` |
| **H9-4** | F-1: a witness reading a capture with no cell of its variant prints MISSING rows as a gated FAIL (E-2) | WK §5, §6.2 here | **instrument:** exit loud ("0 cells of variant base: nothing read", exit 2) or take `--variant`. Plant: the unrelabelled `ring040` capture |
| — | plant scripts narrow engines by mutating `lib.mjs`'s `ENGINES` in-process | WK §8 | **instrument note (P-1):** a `--engines` flag on `FV2-plants.mjs`/`FV3-plants.mjs` |
| **R-20** (proposed, for the agglomerate) | floor v8 = floor v7 + the four A-1 rewrites, comments only | A-1 | **build:** byte proof in both outputs (one is an SFC template comment), DEL under H9-1/H9-2 at 0, floor v7 red under it, toolchain; no browser if the bytes hold |
| — | the minor v7: 3 site entries + 11 rewrites (§5.2) | §5.2 | **build**, comments and test comments only; H8-1 (with H9) at 0 over its own patch is its fixture |
| — | `property-regs.css:162-165` (the retired deep endpoint), `DESIGN.md:516` (the HEAD ladder table), `music-staff/README.md:60` | §3, §5.2 | landing docs pass; stale at HEAD, not the patch's mechanisms |
| — | the critic's own first toolchain run omitted the dist-demo build (3 boot-graph rows "absent") | §1.3 | process: the toolchain phase builds the dist-demo before vitest, as FV7 and MS6 did; recorded |

---

## 8 · Known limits

- **Real Safari: UNMEASURED (owner's safaridriver checkbox)**, every cell.
- **No Chromium battery ran.** Both builds are byte-identical to their predecessors, which I proved in both outputs, so every Chromium verdict carries (P7-2.2's thin-build rule).
- **The O-87 gestalt (row 23)** is the owner's. Floor v7 moves no pixel, so the frames in Reg P7-4 are current.
- **A-1's four sites came from a word sweep and a reading.** I read every touched `src/` and `demo/` line carrying the swept words (193), every `tests/` touched file's mechanism words, and every value-arm candidate under both readings. A sentence that names a deleted mechanism with none of those words would escape me as well. H9-1 and H9-2 make the next critic's job a reading of a short list, not a search.

## 9 · What would make pass 9 clean, and teardown

**Clean at 0 open rows of 44** needs both of these:
- **R-20** (floor v8) closes rows 20 and FL-12: H8-1 with H9-1 and H9-2 at 0 over every touched file, floor v7 red under it, and the pass-9 critic finding no touched-file sentence that describes the patch's deleted or changed mechanisms as live.
- **The owner's sheet** (Reg P7-4: Q-1, Q-3, Q-11 both clauses, Q-14) answered before the pass-9 critic. With the defaults, all five owner rows close by selection or on the owner's word, with no build and no browser.

Without the answers, pass 9 can at best reach the fixed point (39/44, owner rows only), and a pass after that should wait for the owner.

**Teardown** (`phases.log`, 17:33:16): the worktree was removed with `git worktree remove --force` and pruned, and `.claude/worktrees/bl/D3/p8/crit/` and the empty `p8/` were removed. `ls .claude/worktrees/bl/D3/` prints `p3 p5 p6`, `git worktree list` has no D3/p8 entry, and `git status --porcelain -- src demo tests` prints nothing. The unadmitted WebKit waiter was stopped at 17:32:22 before it launched anything, and no process of this seat is left. My writes in the checkout are under `pass-8/` only: this file, `D3-crit-run.sh`, `D3-crit-run2.sh`, `crit-sweep.py` and `crit-records/`.
