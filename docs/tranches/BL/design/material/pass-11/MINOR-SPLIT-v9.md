# D3 · pass 11 · MINOR-SPLIT v9: minor v8 + R-29, byte-identical in paint, read under R-26 and R-30

| field | value |
|---|---|
| seat | D3 pass 11, the minor split v9 (`REGISTRY.md` P10-6.3 step 3). A build, not a route: the tree 10.2.0's veil recut (W-0.1) and W-0.11's tokens would ship from. It builds R-29 on `pass-10/minor-split-v8.patch`, proves the specimen dist and the dist-demo raw byte-identical to the minor v8's in one session, then runs H7-3 with `deletes-minor.json`, DEL with H9-H11 over its own patch, R-21's frozen list under `MS9-rulings.json` (= `pass-10/MS8-rulings-proposed.json`, copied forward byte for byte) with every line re-read under R-26 and R-30 (H11-2's print beside it), the static checks and the toolchain. No browser ran |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | worktree `.claude/worktrees/bl/D3/p11/minor9/wt` cut at **`795f7234b`** (the floor v10 bank, docs only). The checkout moved during the seat to **`c50369e7e`** (INBOUND O-103a, docs only); `795f7234b..c50369e7e` touches no source path. `git diff --stat 1da7eb17b HEAD -- src demo tests package.json scripts tests-visual vite.targets.ts .bundle-ratchet .published-roster DESIGN.md docs/canon` prints nothing at both (`MS9-records/check.log`), so every number below is the published 10.1.0 source plus the named patch. **`git apply --check minor-split-v9.patch` exits 0** at `795f7234b` (worktree returned to HEAD, and the checkout read only) and at `c50369e7e` (checkout, read only) |
| patch | **`minor-split-v9.patch`**: **61 files, +730 / −543**, sha1 **`8cf39ccb`**. Composition, checked byte for byte (`cmp`, `MS9-records/patch.log`): `pass-10/minor-split-v8.patch` (`a843b388`) + `pass-10/MS8-r26-proposed.diff` (R-29, `6e095ae9`, applied as banked) = `minor-split-v9.patch`. The delta cut back out of the worktree, `minor-split-v9-R29.diff`, is byte-identical to R-29 (sha1 `6e095ae9` both; hunk ranges and ± lines `diff` exit 0). Path list = the minor v8's (`diff` exit 0). Two files, three lines for three, no `.vue`, line counts kept (`ladder.css` 306 → 306, `sizing.css` 342 → 342), each changed line inside a CSS block comment (`:298`, `:258`, `:259`) |
| owner rulings | The driver launched pass 11 under the owner's 2026-10-19 order ("re-deploy all workflows, no exceptions, no deferring") on the registry's recommended **DEFAULTS, applied by the driver under that order, not owner rulings**: R-21 (b) sealed, Q-1 (a), Q-3 (a), Q-11 (a) for chrome, Q-11's content clause REPORTED (unruled), Q-14 (a). The driver record says a ruling found in INBOUND replaces the default. Re-checked at this seat: **INBOUND O-102b** (the glass owner, in session: value-js-01 accepted as the owner's delegate) and **O-103** (the delegate's answers, applied as rulings at `0a3323db3`) rule D3 **R-21 (b) sealed; Q-1 (a); Q-3 (a); Q-11 (a) chrome, grey content accepted and reported off paper; Q-14 (a)**, and give 10.2.0's go once D2 and D3 converge. **O-103a** (`c50369e7e`, the delegate `value-js-a9`, during this seat) accepts row 23's frames 2-4, **declines frame 1** and **reopens Q-14's dark arm** ("dim by OKLCH lightness, keep chroma"). These replace the defaults. They differ from the defaults on two lines only: Q-11 content (accepted, not REPORTED) and Q-14's dark arm (reopened). The minor builds no owner option either way: the dark arm is W-H.2's (P5-3.3), and no specimen byte moves (§2) |
| engines | none run. The bytes held raw (§2), so every paint verdict of the minor v8, and through it of the minor v7 to v4, carries (P8-2.2's thin-build rule): Chromium 149 gated, Playwright WebKit 26.5 paint-only. No WebKit lock was taken (no browser, and R-31's reading: a capture of identical bytes measures nothing). **Every real-Safari cell: UNMEASURED** (owner's safaridriver checkbox; O-103 records the checkbox as not granted) |
| records | `MS9-run.sh` (every command, by phase: `setup`, `patch`, `patchlog`, `check`, `trees`, `static`, `sweep`, `nbhd`, `seat`, `same`, `seat-same`, `bite`, `toolchain`, `ratchet`, `teardown`), `minor-split-v9.patch`, `minor-split-v9-R29.diff`, `MS9-rulings.json` (carried), `MS9-readsheet.py` (the reading sheet, 264 whys over 369 lines, `MS9-records/readsheet.txt`), `MS9-aids.py` (the patch-written lines, the neighbourhood lines, `focus.txt`), `MS9-hover-dark.py` (§4.3's arithmetic), `MS9-rulings-seat.py` and `MS9-rulings-seat.json` (the seat's reading, §4.3), `MS9-seat-proposed.py` and `MS9-seat-proposed.diff` (§4.3, proposed, not in the build), `MS9-records/` (`phases.log` carries each phase's time and 1-minute load) |
| fences | No tracked source edited in the checkout, and no git write in it beyond `git worktree add` / `remove` for this seat's worktree. Every patch swap happened in the worktree, each checked with `cmp` or a clean `git status`. Builds and caches lived in `$W/.d3out` and `$W/.cache-m9`; `.bundle-ratchet` was rebound in the worktree for one verifier run and restored. The only checkout writes are the new files under `docs/tranches/BL/design/material/pass-11/` named above. No harness file changed. Nothing ran in a sibling repo |
| machine law | Every phase ran through `~/.claude/guard/guarded` as the literal command word: `setup`, `patch`, `patchlog`, `check`, `trees`, `static`, `sweep`, `nbhd`, `seat`, `ratchet`, `teardown` under `--light` (no browser, no build); `same` (`--timeout 60`, queued 8 min for admission), `seat-same` and `bite` (`--timeout 30`, queued about 8 min), `toolchain` (`--timeout 60`) as heavy runs, one at a time. vitest ran with `--maxWorkers=2`. No browser launched. No kernel-zone refusal fired. The 1-minute load ran 20.98 to 40.06 (`phases.log`), from other sessions. No red cell occurred, so none needed re-running |

Short citations: `Reg` (`REGISTRY.md`, the pass-10 part P10-0..P10-6), `H11` (`pass-11/H11.md`), `FV10` (`pass-11/FLOOR-V10.md`), `MS8` (`pass-10/MINOR-SPLIT-v8.md`), `Crit` (`pass-10/D3-critique.md`). `§n` after them is their section.

---

## 0 · In brief

- **The build is R-29 and nothing else.** `MS8-r26-proposed.diff` as banked: `ladder.css:298` "at the bound" → "at or above the bound"; `sizing.css:258-259` "The press DARKEN … a brief darken" → "The press FILL … a brief fill". CSS comments only.
- **Byte identity holds raw in one session (R-22, R-27).** The minor v9, the minor v8 and the minor v9 again, built under one label, are identical in the specimen dist (3 files) and the dist-demo (346 files) by `diff -rq` and sha256 list. Specimen CSS **398,432 B, sha256 `e11613c3eeb45cab`**, pass 10's banked minor v8 hash digit for digit; the dist-demo list equals the banked minor v8 list (`diff` exit 0, 0 lines). HEAD built the same way differs (bite). Every paint verdict carries.
- **H7-3 PASS 42; DEL with H9-H11 over its own patch PASS 54** (1,095 text files, 42 names, 0 hits); the minor v8 under the v9 patch PASS 54; an absent root exits 2.
- **R-21 (b), the list as carried:** 369 lines in 52 files. Under `MS9-rulings.json`: **`PASS (369 lines: 351 ruled true, 18 reported)`, 0 unread, 0 stale**, as MS8 measured R-29's cut. Plants: the minor v8 under the same rulings `FAIL (2 unread, 0 stale of 371 lines)` at `sizing.css:258, :259`; the minor v9 under `MS8-rulings.json` `FAIL (2 unread, 0 stale of 369 lines)` at `ladder.css:297, :299`.
- **R-21 (b), the seat's R-26 / R-30 re-reading:** one printed line the patch wrote reads false. **`tests/styles/glass-subtlety.test.ts:193`**, "Dark: the sign law holds, the rung darkens what is behind it": the dark rung composites the veil ink oklch(0.17 0.03 70), which is lighter than the dark page `--neutral-0` (OKLab L 0.1459), so over the page the resting rung lifts it to L 0.1499. It is the Crit A-2 / MS8 §4.3 class (a dark leg that lifts) in a test comment. Three more lines the carried rulings call true read **reported** (false in dark at HEAD, not the patch's): `DESIGN.md:1045-1047`'s "Bg darken" hover rows. Under the seat's rulings the list reads **`FAIL (1 unread, 0 stale of 369 lines)`**. **`MS9-seat-proposed.diff`** (1 file, +2/−2, sha1 `4ebf3884`, not built) rewrites `:193-194`. It is measured raw-identical to the minor v9 in both outputs, DEL PASS 54, and the list `PASS (368 lines: 347 ruled true, 21 reported)` (§4.3).
- **Static and toolchain:** LAW PASS 86, census `stacked=0 halo=0 blur=0 open=0` (10.1.0 `2/2/5/9`), HOV PASS 58, LIT the 19 inherited, ladder `diff` to the minor v8 empty, FL-14's `isolation: isolate` present. `vue-tsc` exit 0 on both projects, library build and dist-demo exit 0, vitest **239 files, 2321 passed, 0 failed** (the minor v8: 2321). Roster PRESENT 289 = 289, `terminal CLEAN` with the datum rebound in the worktree; the ratchet owes **+2,333 B**, the minor v8's figure to the byte.
- **Shippability (§7):** every W-0.1 and W-0.11 gate verdict carries green on raw-identical bytes; R-29 is built; Q-11's content clause is now ruled (O-103), so G1's off-paper reading is accepted. 10.2.0 is still held by the entry gate (0 of 2 clean passes; O-103a reopens Q-14's dark arm and keeps row 23 open), D2's convergence (O-88), and the landing items. The minor's own prose is clean on the carried list and owes one test-comment rewrite on the seat's reading.

---

## 1 · The build (`minor-split-v9-R29.diff` = R-29)

| R-29 | site (minor v9) | was (minor v8) | now | read true on the minor v9 |
|---|---|---|---|---|
| (i) | `src/styles/glass/ladder.css:298` | "LIGHT page the content tiers paint the cream pole at the bound, so flipping the" | "LIGHT page the content tiers paint the cream pole at or above the bound, so flipping the" | wash sits at the bound, quiet and resting one and two steps above it (`tokens/glass.css:54-56`) |
| (ii) | `src/styles/tokens/sizing.css:258-259` | "/* The press DARKEN, read on `:active` alongside the scale-press so a press lands a / brief darken rather than scaling alone. …" | "/* The press FILL, read on `:active` alongside the scale-press so a press lands a / brief fill rather than scaling alone. …" | `--dock-control-press-bg` is `light-dark(oklch(from var(--foreground) l c h / var(--fill-selected)), color-mix(in oklab, var(--glass-plate-resting), var(--foreground) 7%))` (`:262-265`): a fill in both arms, which the dark arm's lift (MS8 §4.3) does not falsify |

Nothing else was written. After R-29, `sizing.css:258-259` carry no frozen word and leave the list (371 → 369). `ladder.css:298` carries no frozen word and was never printed; its sentence-mates `:297` and `:299` print (word "bucket") and read true on the whole sentence.

---

## 2 · Byte identity (R-22's raw branch, R-27's same-session pair)

`same.log`, 14:35:33-14:35:40, load 22.11 → 20.98. The minor v9, the minor v8 and the minor v9 again were built by `harness/build.mjs --demo` under one label (`same`) in the worktree, each output moved aside before the next build, each swap checked by `cmp`.

| output | minor v8 against minor v9 | minor v9 rebuilt | R-27's tie to pass 10's bank (`pass-10/MS8-records/same-m8-*.sha256`) |
|---|---|---|---|
| **specimen dist** (3 files) | **`diff -rq` exit 0, 0 lines; sha256 lists identical.** CSS `index-Bd1ws62N.css` **398,432 B, sha256 `e11613c3eeb45cab2ebe3e88245ba9a55a8c41b640f48d9a45df116bb3638b0a`** in both | exit 0 | the CSS hash equals the banked minor v8's, digit for digit |
| **dist-demo** (346 files; CSS 431,116 B) | **`diff -rq` exit 0, 0 lines; sha256 lists identical** | exit 0 | the sha256 list equals the banked minor v8 list (`diff` exit 0, 0 lines) |

The specimen JS is not cited against a bank (R-27). **The bite** (`bite.log`, 14:47:40-14:47:44, load 31.11 → 33.82): HEAD built the same way differs from the minor v9 in both outputs (`diff -rq` exit 1: dist 5 lines, demo 229 lines); HEAD's specimen CSS is 394,891 B, `b09b9e73a61b75b1`, MS8's figure. **The seat delta** (`seat-same.log`, 14:43:34-14:43:38, load 24.27 → 24.80): the minor v9 + `MS9-seat-proposed.diff`, built in the same worktree under the same label, is raw-identical to the `same` phase's minor v9 in both outputs (`diff -rq` exit 0 twice; CSS `e11613c3eeb45cab`).

**Why it holds.** R-29's three lines are inside CSS block comments, which the minifier strips, and no `.vue` file moves. No library `dist/` file carries an R-29 sentence (`ratchet.log`). **Every paint verdict of the minor v8 carries to the minor v9.** No browser ran and no WebKit cell is owed.

---

## 3 · H7-3, DEL with H9-H11, and the static reads

`static.log`, 14:26:53-14:27:07, load 33.09 → 32.91. H11's synchronous report is in force: every verdict below is the tool's last line, read whole.

| check | minor v9 | plant, bite or refusal |
|---|---|---|
| **H7-3**, `deletes-minor.json` (42 names, 3 sites), H7's scope (`src/`, `demo/`), no patch | **PASS 42 gated rows** (`del-H7-minor9.log`) | the minor v8: PASS 42. R-29 removes no declared phrase |
| **DEL with H9-H11**, `--patch minor-split-v9.patch` | **PASS 54 gated rows**, exit 0: 1,095 text files, `names=42 hits=0 changed=8 families=1 sites=3 arm-true=1 rung=4 reported=4` (`del-minor9.log`) | absent root **exit 2**, `FAIL (nothing read: the tree does not exist)` (H10-1). The minor v8 under the v9 patch PASS 54, under its own PASS 54 |
| LAW | **PASS 86 gated rows** (the scanned roots now hold pass 11's scripts) | — |
| census | `LIGHTING-CENSUS stacked=0 halo=0 blur=0 open=0`, exit 0 | `git archive v10.1.0 src/styles`: `stacked=2 halo=2 blur=5 open=9`, exit 1 |
| HOV | **PASS 58** | — |
| LIT | REPORTED `halo=5 near=1 stacked=10 chain=3 open=19 frames-halo=0/0`, the 19 inherited | — |
| ladder | `diff radii-minor9 pass-10/MS8-records/radii-minor8.txt` prints nothing | — |
| FL-14 static | `isolation: isolate;` at line 26 of `@utility glass-plate` | — |
| **H11-2's print** (`nbhd.log`) | `PRINT (1363 lines in 59 files; not gated)`, `declared=60 fallback=5 alias-prose=6 relation=361`; it reaches **75 of the 369 printed lines** (`printed-in-neighbourhood-minor9.txt`) | the minor v8 through the same printer: the same tally (`diff` exit 0); the only line-key difference is the header's tree path |

---

## 4 · R-21 (b) under R-26 and R-30: every printed line, every clause

### 4.1 · The runs (`sweep.log` 14:27:18-14:27:19, load 34.47; `seat.log` 14:32:36-14:32:40, load 21.40 → 21.85)

| run | result |
|---|---|
| minor v9, `LIST` | **369 lines in 52 files** (`sweep-minor9.log`) |
| **minor v9 under `MS9-rulings.json`** (`cmp` = `pass-10/MS8-rulings-proposed.json`, sha1 `7893e7d5`; the minor v9's bytes are MS8's `minor8p` cut, so no entry needed updating) | **`PASS (369 lines: 351 ruled true, 18 reported)`**, `unread=0 stale=0` (`sweep-minor9-ruled.log`) |
| minor v8 under `MS9-rulings.json` (R-29's plant) | `FAIL (2 unread, 0 stale of 371 lines)` at `sizing.css:258, :259` (`sweep-minor8-plant.log`) |
| minor v9 under `MS8-rulings.json` (H10-2's plant) | `FAIL (2 unread, 0 stale of 369 lines)` at `ladder.css:297, :299`, which pass 10 left unread (`sweep-minor9-under-ms8.log`) |
| SWEEP on an absent root | exit 2, `FAIL (nothing read: the tree does not exist)` |
| **minor v9 under `MS9-rulings-seat.json`** (the seat's reading, §4.3) | **`FAIL (1 unread, 0 stale of 369 lines)`** at `tests/styles/glass-subtlety.test.ts:193`; `true=347 reported=21` (`sweep-minor9-seat.log`) |
| minor v9 + `MS9-seat-proposed.diff` under `MS9-rulings-seat.json` | **`PASS (368 lines: 347 ruled true, 21 reported)`** (`sweep-minor9s-seatp.log`); DEL PASS 54 (`del-minor9s.log`); the print unchanged, 1,363 lines |

**A limit of the plant, recorded.** R-29's `ladder.css` rewrite is on `:298`, which prints no frozen word. Its printed sentence-mates `:297` and `:299` keep their bytes, so a ruling keyed to them does not go stale when `:298` changes. The minor v8 under `MS9-rulings.json` therefore reads `:297` and `:299` as ruled true although their sentence was false there. The instrument reads lines and R-26 reads sentences; this is the gap H10 §5 (3) names, and it is the reader's to close (as here), not the tool's.

### 4.2 · How every line was read

I read all 369 lines with their rulings, grouped by `why` (`MS9-readsheet.py`, 264 whys, `MS9-records/readsheet.txt`), and read every line's sentence in the tree where its `why` named a mechanism, a value, a count or a line number. I read hardest where R-30 points (`MS9-aids.py`, `focus.txt`):
- the **46 printed lines the patch writes** (a `+` line of `minor-split-v9.patch`; MS8 counted 48, and R-29 took `sizing.css:258-259` off the list);
- the **75 printed lines H11-2's print reaches**: declarations of a re-valued token and the comment block above each, the lines above a `var()` that falls back to one, and every sentence carrying "bound" or a rung name. Union: 100 lines.

The floor v10 seat's two "at the bound" lines have no twin on the minor: the minor's `property-regs.css:150-152` reads "veil = the earned ink (darker in dark, a thicker cream pole in light)" (not printed, true), and its `feedback-tone.css:38` reads "tints ITS OWN rung: the earned-ink clamp, the tier ink and `--glass-level` all survive" (printed, written by the patch, true: the clamp is kept, `veil.css:69-85`).

Every sentence that says the veil "darkens" in dark was checked against the dark arithmetic, because the dark veil ink, oklch(0.17 0.03 70), is **lighter** than the dark page `--neutral-0` hsl(24 9% 4%) (OKLab L 0.1459). A dark rung therefore lifts the bare dark page and darkens every ground lighter than L 0.17 (`MS9-hover-dark.py`, `hover-dark.log`). The sentences that say the **clamp** darkens in dark (the earned ink past the knee) are true, because the clamp earns only over a measured-bright backdrop: `veil.css:42-44`, `surfaces.css:59`, `deep.css:26-29`, `glass-fx.css:141-143`, `overlay-plate.css:270-273`, `property-regs.css:151`, `adaptive-legibility.css:7`. The sentences that say a dark **rung** darkens what is behind it, with no condition, are false over the bare dark page. §4.3 takes them up.

### 4.3 · Findings

**False, and the patch's: `tests/styles/glass-subtlety.test.ts:193` (word "darken").**

- The sentence, `:192-194`: "Light: the plate is the theme's own ground at α, so it never darkens toward a near-black ink over paper (O-62). Dark: the sign law holds, the rung darkens what is behind it."
- The false clause: **"the rung darkens what is behind it"**, in dark. The dark rung paints oklch(0.17 0.03 70) at its α (`dark-arm.css:275-290`). Over the dark page (L 0.1459) the resting rung lifts to **L 0.1499**, and over the dock plate on the page 0.1490 → 0.1526. It darkens only grounds lighter than the ink, such as `--card`, 0.2949 → 0.2735 (`hover-dark.log`; token arithmetic, source-over in sRGB, MS8-press-dark.py's method; computed, not painted). The test asserts only that the dark ink's L is below 0.5 (`:197`), so "asserted below" covers the ink, not the sign.
- **The patch wrote it.** `:192-194` are `+` lines. HEAD's sentence was "The sign law: a rung darkens what is behind it, in light AND in dark" (HEAD `:165`), false in dark at HEAD the same way, since the dark tokens are HEAD's. The minor rewrote the sentence and kept the dark clause. By MS7 §4.3's precedent, which MS8 §4.3 and Crit §4.2 applied to `sizing.css:258`, a sentence the minor rewrote and left false is the minor's. It is not `reported`.
- **Why every earlier reader passed it.** MS8 ruled `:192-193` under one `why` that asserted "dark keeps the near-black ink, so the rung darkens what is behind it (asserted below)". That is the near-black premise without the page it sits on. The pass-10 critic read the four lines MS8 flagged and the 18 reported ones (Crit §4.2). It is the class of Crit A-2, the dark leg that lifts, and here it is in a sentence that never names a re-valued token, so R-30's print does not reach it (`:192-194` are not among the 75).
- **Not built here** (R-29 is the whole delta). **`MS9-seat-proposed.diff`** (1 file, +2/−2, sha1 `4ebf3884`; `MS9-seat-proposed.py`; `git apply --check` exit 0 on the minor v9; the file keeps 1,108 lines):

| line | now | proposed |
|---|---|---|
| `glass-subtlety.test.ts:193` | "// near-black ink over paper (O-62). Dark: the sign law holds, the rung darkens" | "// near-black ink over paper (O-62). Dark: the ink stays near-black (L 0.17 < 0.5," |
| `:194` | "// what is behind it." | "// asserted below), never the cream foreground." |

  The words claim only what the test asserts (the dark ink's L under 0.5; the dark ink is a literal, not `--foreground`). Measured: raw-identical to the minor v9 in both outputs (`seat-same.log`; the file is under `tests/`, read by neither build), DEL PASS 54, the list `PASS (368 lines: 347 ruled true, 21 reported)` under `MS9-rulings-seat.json`. `:193` and `:194` then carry no frozen word and leave the list. The test title at `:191` ("DIMS in dark") carries no frozen word and is not printed; it goes to the landing docs pass (§4.5).

**Ruled true by the carried file, reported on this reading (R-26; no gate moves): `DESIGN.md:1045, :1046, :1047`** ("Bg darken + `--scale-hover-dock`", "Bg darken only", "Bg darken + scale"). The light arm holds: the minor's hover is foreground ink at `--fill-hover` 0.05 (`sizing.css:206`), which darkens the cream dock plate, and the patch wrote that value. The dark arm is `--glass-plate-resting`, the near-black ink at α 0.18. Over the dock's own plate on the dark page it **lifts** L 0.1490 → 0.1526 (`hover-dark.log`). The carried `why` ("both legs darken the dock's own plate (… dark: the 0.18 near-black ink rung over the dock's 0.14 one)") is an arithmetic error. HEAD's dark hover is the same plate (HEAD `sizing.css:206` `var(--glass-plate-resting)`), and the rows are HEAD text, so the false dark clause is not the patch's: **reported**, for the landing docs pass. `glass-subtlety.test.ts:192` keeps `true` on its own (light) clause, with its own `why`. `MS9-rulings-seat.py` writes exactly these four changes and drops `:193`; it refuses to run if any of the five entries is missing.

**The tally on the seat's reading:** 347 true, 21 reported (MS8's 18 + `DESIGN.md:1045-1047`), 1 false and the patch's. One file, `MS9-rulings-seat.json`, rules both the minor v9 and the minor v9 + the seat delta (P-3).

### 4.4 · Readings the critic should check (R-26: the instrument cannot)

- **`src/styles/glass/surface-axis.css:43`** (written by the patch), the veil text plate: "No veil-local recipe fork, and no brightness leg: in dark it darkens toward the ink and in light it thickens the cream `--card` pole, like the ladder it belongs to." I rule it **true** on the clamp reading. The sentence before it names "the earned ink", and the clause is `veil.css:42-43`'s wording for what the clamp does as α rises. On a literal reading (the plate, at rest, darkens its ground) its dark half is false over the bare dark page by §4.3's arithmetic (quiet rung, α 0.14: a lift of about 0.003). That would make it §4.3's class, written by the patch, with HEAD's "it darkens toward the ink in BOTH modes" as its predecessor. The critic decides the reading. If it reads literally, the line takes "in dark it adds the near-black ink and in light it thickens the cream `--card` pole", one line for one.
- **`src/styles/glass/control-bit.css:175`** (HEAD text), "glass/veil.css darkens a plate by compositing `--glass-veil-ink`" (the recess's dark arm). I rule it true, since the recess sits on a control plate lighter than the ink. Over the bare dark page it would be `reported` at worst.
- **`sizing.css:216`, `:235`** ("a translucent GLASS tint", "a ladder step above hover"): carried true on MS8 §4.4's reading. The dark legs are α tiers (resting 0.18, floating 0.22). §4.5 records how small the dark hover's step is in paint.
- **MS8 §4.4's other readings** (`DESIGN.md:93`, `scale-paper.css:101`, `dark-arm.css:82`, `:212-213`, `deep.css:18`): re-read and carried. Crit §4.2 settled `dark-arm.css:82` (the minor's line keeps `--glass-veil-ink` in the list and is `reported`).

### 4.5 · Finds outside both lists (R-21's carve-out: reported, do not reopen a row)

| line | the false or loose clause | why it does not print | at HEAD |
|---|---|---|---|
| `tests/styles/glass-subtlety.test.ts:191` | the test title's "DIMS in dark" (the dark rung lifts the bare dark page, §4.3) | no frozen word | HEAD's title read "DIMS in both modes" |
| `src/styles/tokens/sizing.css:200-204` | dark hover and active are "named glass tiers a measurable step above the dock's own composed substrate" | no frozen word | as an α-ladder statement it is true (0.18 and 0.22 over the dock's 0.14). In paint, the dark hover moves the dock plate on the dark page by ΔL +0.0036, a lift (`hover-dark.log`). That is M-6's class, the dark ladder, and W-H.2's |
| `icon-button.css:5`, `:16` | "the iOS press DARKEN-plus-shrink", "darken/specular legs" | `icon-button.css` is outside the minor's patch | HEAD text. True on the file's own split: the `filter: brightness(calc(1 − press_t · 0.04))` leg (`:92`) darkens in both themes (FV10 §4.4 reads the floor's twin the same way) |
| MS8 §4.5's three | `icon-button.css:118-120`, `tokens/glass.css:193-194`, `dark-arm.css:315` | as MS8 §4.5 | unchanged; `icon-button.css` takes §5's words |

---

## 5 · The minor's own landing-docs words for `icon-button.css` (P10-5; recorded, not built)

The minor's patch does not touch `src/components/dock/styles/controls/icon-button.css`, so these lines are outside its lists, and R-29 builds nothing beyond its words. On the minor the dock control's hover is foreground ink at 0.05 in light and the resting plate in dark (`sizing.css:206`). Its press is the one-ink selected rung in light and the resting plate stepped 7 % toward `--foreground` in dark (`sizing.css:262-265`). The floor's R-28 words ("one-ink") are not used on the minor, because they would be false in its dark arm. P10-5's words, each re-read against the minor v9's tokens:

| line (minor v9 = HEAD's file) | now | the landing words (P10-5) | true on the minor v9 |
|---|---|---|---|
| `:95` | "surface, not a flat `--muted` plate: a translucent card-tinted fill is" | "a translucent fill (one ink in light, the resting plate in dark) is" in place of "a translucent card-tinted fill is" | light: `oklch(from var(--foreground) l c h / var(--fill-hover))`, one ink at 0.05; dark: `var(--glass-plate-resting)` (`sizing.css:206`) |
| `:104` | "surface was the worst-offending double-light blowout; the card-tinted" | "the card-tinted" → "the translucent" | α 0.05 in light, α 0.18 in dark: translucent in both |
| `:118-120` | "The iOS press DARKEN-plus-shrink. Press lands the / glass-darken (`--dock-control-press-bg`, a tier below resting) alongside / the existing scale-press, so a tap reads "darken + shrink" (C4-INV-4 was" | "The iOS press FILL-plus-shrink. Press lands the / press fill (`--dock-control-press-bg`) alongside / the existing scale-press, so a tap reads "fill + shrink" (C4-INV-4 was" | a fill in both arms (`sizing.css:262-265`); "fill" asserts no direction, so the dark arm's lift (MS8 §4.3) does not falsify it; the scale-press is `:126` |

With them, in both trees, P10-5's `tab-button.css:75` and `triggers.css:85` take "The iOS press fill-plus-shrink (see the icon-button)." (both read "The iOS press darken-plus-shrink (see the icon-button)." on the minor v9). Each edit keeps its file's line count except `:95`, whose line lengthens inside the same comment. All of it is comment text in non-SFC CSS, so it moves no byte (§2's reason). It lands in the landing docs pass, not in a minor build.

---

## 6 · Toolchain and the ratchet

| step (`toolchain.log`, `ratchet.log`) | result | when, load (1 min) |
|---|---|---|
| `vue-tsc --noEmit` | exit 0 | 14:51:58, 39.13 |
| `vite build` (library, `cacheDir` in the worktree) | exit 0 | 14:52:08, 40.06 |
| `vue-tsc --noEmit -p tsconfig.test.json`, after the library build | exit 0 | 14:52:18, 39.84 |
| `vite build`, the dist-demo config, before the units | exit 0 | 14:52:20, 39.84 |
| `vitest run --maxWorkers=2` | **239 files passed, 2321 tests passed, 0 failed**, 10 expected-fail, 1 skipped (2332) (the minor v8: 2321) | 14:53:43, 38.80 |
| verifier, datum unrebound | `G-BUNDLE-RATCHET … 2921390 > 2919057`, exit 1: **+2,333 B**, the minor v8's figure to the byte; R-29 adds 0 B | 14:53:49-14:54:19, 37.69 → 34.19 |
| verifier, datum rebound in the worktree only | exit 0, `terminal CLEAN`, roster PRESENT **289 = 289**, claims 193, declarations 454; `.bundle-ratchet` restored to HEAD; `.published-roster` diff empty (`v10.1.0..HEAD` and the worktree) | same |
| library `dist/` files carrying an R-29 sentence | none | same |

No red cell, so the two-re-run rule had nothing to act on.

---

## 7 · Gates carried, and shippability for 10.2.0

### 7.1 · The gates

Every paint row is carried on outputs proved raw-identical to the minor v8's (§2), whose verdicts Reg P10-3.1 records (and through it pass 8's battery on the minor v6, the minor v4's paint to the byte). "Read here" marks this seat's own reads.

| gate | verdict | basis |
|---|---|---|
| **W-0.1 G1** M-1 | **PASS** over paper (11/11, both engines). Off paper 48/66 grey, content included: **accepted** under O-103's Q-11 content clause (was REPORTED under the driver's default) | carried; O-103 |
| **G2** O-66 field, **G3** O-66 row | **PASS** | carried; HOV 58 read here |
| **G4** W-A light | **PASS** (108/108, thinnest α 0.890) | carried |
| **G5** scope | **PASS**: no name leaves `src` (R-29 is comments); roster PRESENT 289 = 289, `terminal CLEAN` with the datum rebound; ratchet **+2,333 B** unrebound | read here |
| **G6** per R-9 | **PASS** (13 dark composites, worst ΔE 0.0000) | carried |
| **G7** M-2 and M-3 halves | **PASS**, 0 regressions | carried |
| **W-0.11 G1-G4** | **PASS**: census `stacked=0 halo=0 blur=0 open=0`; 10.1.0 exactly `2/2/5/9` | read here |
| **W-0.11 G5** | **PASS** | as W-0.1 G5 |
| **W-0.11 G6** | **PASS** (M-2 720, M-3 214 HEAD-PASS, 0 regress) | carried |
| STACK (FL-14) | **24/24** | carried; `isolation: isolate` read here |
| units | 239 files, **2321 passed**, 0 failed | read here |
| **R-29** (P10-3.3 item 3) | **built**: `ladder.css:298`, `sizing.css:258-259` | read here |
| light-law prose under R-21 (b), R-26, R-30 | DEL **at 0** (PASS 54); the list under the carried rulings **PASS 369**, 0 unread; on the seat's reading **1 unread** (`glass-subtlety.test.ts:193`), with a measured comment-only delta that reads PASS 368 | read here |

### 7.2 · The minor-split table (P5-3.3 as amended through P10-3.2)

One row moves, the light-law prose: **plus R-29's two rewrites (minor v9)**, guarded by `deletes-minor.json` (42 names, 3 sites), DEL with H9-H11 over the minor's own patch, and R-21 (b) under R-26 and R-30. If the critic takes `MS9-seat-proposed.diff`, the row adds `glass-subtlety.test.ts:193-194`. It lands in W-0.1. Every other row stands as written. The dark arm stays W-H.2's, and that includes R-2's 40 % dim, whose dark half O-103a reopens (Q-14). The minor does not carry it.

### 7.3 · Can W-0.1 and W-0.11 ship from the minor v9 in 10.2.0? Not yet

The minor v9 is the measured shape of 10.2.0's veil recut and W-0.11's lighting tokens. Its paint is the minor v8's (and so v7's to v4's) to the byte, every gate the registry set for it is green, R-29 is built, and Q-11's content clause is ruled. What remains:

1. **The entry gate:** 0 of 2 clean passes (W-0.1 §3, W-0.11 §3.3). Pass 11 is the first that can be clean on floor v10's rows 20 and FL-12 (FV10 §7). O-103a keeps **row 23 open**: Q-14's dark arm is reopened as "dim by OKLCH lightness, keep chroma", to be built and its frame re-accepted (FORMATION-PROGRESS places it in pass 12). That arm is a dark-arm build (W-H.2's row in P5-3.3), so it does not change the minor's bytes. It does keep D3 unconverged, and O-103's 10.2.0 go waits on D3 converging. **Earliest landing: the close of the second consecutive clean pass, no earlier than pass 12's close if passes 11 and 12 are both clean; with row 23 reopened, realistically pass 13.**
2. **R-21 (b) on the minor's prose:** clean on the carried rulings. On this seat's reading one test-comment line (`glass-subtlety.test.ts:193`) is false and the patch's. The critic upholds or strikes it. If upheld, `MS9-seat-proposed.diff` is measured and goes into the next comment-only minor build or the landing docs pass. Under R-21 (b) sealed it reopens no row: the minor's prose is a landing item, not a gate row (R-29).
3. **The landing's own items, unchanged:**
   - R-9's reading enters W-0.1 §5 G6's text (the owner may override).
   - Each gate binds to one probe. W-0.1 §5 and W-0.11 §5 name `scripts/probes/band-0/*`, which the tree still lacks (`ls`: no such directory at `c50369e7e`).
   - `.bundle-ratchet` rebinds to the measured bytes (**+2,333 B**).
   - The landing docs pass takes §5's `icon-button.css` words and the `tab-button.css` / `triggers.css` line; the 21 reported lines (MS8 §4.2's 18 and §4.3's `DESIGN.md:1045-1047`); §4.5's finds and MS8 §4.5's; `DESIGN.md:516-517`'s blur column; Crit8's list.
   - W-0.1 §5's G1 text reads Q-11's content ruling (accepted, reported off paper).
4. **10.2.0 is also gated on D2 converging** (O-88; O-103 restates the go "once D2 and D3 converge").

---

## 8 · Rows and rulings

The minor is a build, not a route: it scores row N-4 (the minor split's W-0.1 reading), which reads **PASS** (§7.1), and no other row. Floor v10 scores the 44 (FV10 §7). For the record that the driver's frame asked for:

- **Rows 20 and FL-12** are read under **R-21 (b)**. It was the driver's default when pass 11 launched; O-103 rules it, and the ruling replaces the default. The rows close on a comment-only build whose bytes are raw-identical to its predecessor, DEL at 0, and the list passing under the seat's rulings as re-ruled by this pass's critic. A false printed line found after that is proposed as a measured comment delta for the next comment-only build or the landing docs pass, and does not reopen the rows. Under (a) a later reader's false line would reopen them; under (c) they would return to P7-6.3's open-ended reading. The minor's finding in §4.3 bears on the minor's landing prose, not on these rows.
- **The owner-gated rows.** Under the driver's defaults, rows 3, 9, 23, N-1 and N-2 would stay open, each waiting on its ruling: rows 3 and N-2 on Q-11's chrome clause, rows 9 and N-1 on Q-1, and row 23 on Q-11's content clause, Q-3 and Q-14 with the frames. The rulings found in INBOUND replace that reading. **O-103** closes rows 3, 9, N-1 and N-2 by its text (FV10 §7.1). **O-103a** keeps **row 23 open** on Q-14's reopened dark arm and frame 1's re-acceptance.

---

## 9 · Handed on

| to | what |
|---|---|
| **the critic** (P10-6.3 step 4) | (1) R-29 word for word (§1; the worktree delta is R-29's file, sha1 `6e095ae9`). (2) The raw byte proof and R-27's tie (§2), and the seat delta's raw proof. (3) **`glass-subtlety.test.ts:193`, read false and the patch's (§4.3)**, with `MS9-hover-dark.py`'s arithmetic and `MS9-seat-proposed.diff`. (4) `DESIGN.md:1045-1047` re-ruled `reported` (§4.3). (5) §4.4's readings, above all `surface-axis.css:43` (clamp or literal). (6) §4.1's plant limit (sentence-mates of a rewritten unprinted line do not go stale). (7) §5's landing words |
| the pass-11 agglomeration | the minor v9 is built and raw-identical. The carried list PASSes; the seat's reading leaves one test-comment line, the class "a dark rung lifts the bare dark page", which no earlier reader caught because the veil ink (L 0.17) sits above the deepened page (L 0.146). The same arithmetic touches every unconditional "the dark veil darkens" sentence in both trees, and that may matter for R-30's next reading and for Q-14's reopened dark arm. O-103 and O-103a replace the driver's defaults (header) |
| W-H.2 / Q-14's dark arm | §4.5: on the dark page the dark hover step in the dock is ΔL +0.0036 (a lift), M-6's class |
| the landing docs pass | §5's words; the 21 reported lines; §4.5's finds |
| the WebKit seat | nothing: the minor v9's specimen is the minor v8's bytes |

---

## 10 · Teardown and reproduce

**Torn down** (`teardown.log`, 14:54:49, load 29.92): `git worktree remove --force` of `.claude/worktrees/bl/D3/p11/minor9/wt`, `git worktree prune`, `rm -rf` of `.claude/worktrees/bl/D3/p11/minor9/` (trees, builds and caches with it), then `rmdir` of the empty `p11/`. Afterwards `git worktree list` holds 0 `D3/p11/minor9` entries, `.claude/worktrees/bl/D3/` holds `p3 p5 p6`, and `git status --porcelain -- src demo tests DESIGN.md` prints nothing. No process of this seat is left running. The checkout's writes are the new untracked files under `pass-11/` named in the header. The absolute paths in the records name the removed scratch trees; `MS9-run.sh setup` and the phases after it rebuild them byte for byte from the banked patches.

```sh
P11=docs/tranches/BL/design/material/pass-11
G="$HOME/.claude/guard/guarded"
$G --light --timeout 15 -- bash $P11/MS9-run.sh setup      # worktree at HEAD, node_modules linked, minor v8 applied, trees/minor8 cut
$G --light --timeout 15 -- bash $P11/MS9-run.sh patch      # R-29 applied as banked; minor-split-v9.patch + the cut-back delta
$G --light --timeout 10 -- bash $P11/MS9-run.sh patchlog
$G --light --timeout 10 -- bash $P11/MS9-run.sh check
$G --light --timeout 10 -- bash $P11/MS9-run.sh trees
$G --light --timeout 20 -- bash $P11/MS9-run.sh static
$G --light --timeout 15 -- bash $P11/MS9-run.sh sweep
$G --light --timeout 15 -- bash $P11/MS9-run.sh nbhd
$G --light --timeout 15 -- bash $P11/MS9-run.sh seat       # MS9-rulings-seat.json, MS9-seat-proposed.diff, trees/minor9s
$G --timeout 60 -- bash $P11/MS9-run.sh same
$G --timeout 30 -- bash $P11/MS9-run.sh seat-same
$G --timeout 30 -- bash $P11/MS9-run.sh bite
$G --timeout 60 -- bash $P11/MS9-run.sh toolchain
$G --light --timeout 10 -- bash $P11/MS9-run.sh ratchet
$G --light --timeout 10 -- bash $P11/MS9-run.sh teardown
```

The reading sheet regenerates with `python3 -I $P11/MS9-readsheet.py $P11/MS9-rulings.json MS9-records/neighbourhood-minor9.log`, and the aids with `python3 -I $P11/MS9-aids.py $P11/minor-split-v9.patch MS9-records/sweep-minor9.log MS9-records/neighbourhood-minor9.log $P11/MS9-rulings.json MS9-records`.
