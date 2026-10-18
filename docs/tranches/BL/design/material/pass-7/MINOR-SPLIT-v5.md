# D3 · pass 7 · MINOR-SPLIT v5: minor v4 + R-16, byte-identical in paint, measured under H7

| field | value |
|---|---|
| seat | D3 pass 7, the minor split v5 (`REGISTRY.md` P6-6.2 step 3). A build, not a route: the tree 10.2.0's veil recut (W-0.1) and W-0.11's tokens would ship from |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | worktree `.claude/worktrees/bl/D3/p7/minor5/wt` cut at `48b808353`; the checkout moved to `a69fb523e` during the run (docs commits). `git diff --stat a75b708e9 48b808353` and `git diff --stat 48b808353 a69fb523e` over `src demo tests package.json scripts tests-visual vite.targets.ts .bundle-ratchet .published-roster` both print nothing, so the base is the published 10.1.0 source every pass-6 and pass-7 seat measured. **`git apply --check minor-split-v5.patch` exits 0 at `a69fb523e`** (in the checkout, read only) |
| patch | **`minor-split-v5.patch`**: **57 files, +681 / −495** (`git diff --shortstat`), sha1 `a790fd05`. Composition, checked byte for byte: `pass-6/minor-split-v4.patch` (sha1 `ec14741a`) + **`minor-split-v5-R16.diff`** (12 files, +49 / −46, sha1 `19461f88`) = `minor-split-v5.patch` (`cmp`). The five files new to the minor are `rim.css`, `surfaces-pager.css`, `glass-fx.css`, `property-regs.css` and `useGlassBackdropLuminance.ts`. The edits are applied by `MS5-r16-edits.py` (each old string must occur exactly once) |
| owner rulings | **None.** `audit/INBOUND.md` still ends at O-98. `FORMATION-PROGRESS.md`, re-read at 01:15, records no ruling on Q-1, Q-3, Q-11 (either clause), Q-12, Q-13 or Q-14; its last D3 line is the floor v6 bank. The P6-4 defaults apply: Q-1 (a), Q-3 (a), Q-11 (a) for chrome with content REPORTED, Q-14 (a), Q-12 (a), Q-13 (a) |
| engines | Chromium 149, Playwright's headless shell, no launch arguments (the dialog captures; no moving-field window ran). **Playwright WebKit 26.5** for the dialog captures and their re-runs, under `guarded --exclusive webkit`. **Every real-Safari cell: UNMEASURED (owner's safaridriver checkbox)** |
| records | `MS5-records/` (`phases.log` carries every phase's start and end with the load; `wk-admission.log` the two WebKit admissions); `MS5-run.sh` (every command by phase; `rebound` and `rerun-wk` were appended after the first run and sit below its `esac`); `MS5-r16-edits.py`; `minor-split-v5-R16.diff`. Harness changed in place: `harness/deletes-minor.json` (the minor's declaration) and `harness/selftest.mjs` (H7-3's rows) |
| fences | No tracked source edited in the checkout, and no git write in it beyond `git worktree add` / `remove` for this seat's worktree. Patch swaps happened only in the worktree, each checked with `cmp` or a clean `git status`. Builds, captures and caches lived in `$W/.d3out` and `$W/.cache-m5`. `.bundle-ratchet` was rebound in the worktree for one verifier run and restored (`git status` clean). The only writes in the checkout are under `docs/tranches/BL/design/material/` (`pass-7/` and the two harness files). Nothing ran in a sibling repo |
| machine law | Every build, capture and the toolchain ran through `~/.claude/guard/guarded`; static reads, the self-test, witness reads and the verifier ran `--light` (no browser). One heavy run at a time. The WebKit admission was queued only after the Chromium phases ended (queued 00:55:59, admitted 01:01:50 behind another holder; the re-run admission was immediate, 01:13:11). One browser per capture run, which `capture.mjs` closes in its `finally`. vitest ran with `--maxWorkers=2`. The kernel-zone refusal never fired. Loads 9.2 to 25.9 (`phases.log`). **Torn down:** the worktree removed, `.claude/worktrees/bl/D3/p7/minor5/` removed, and the empty `p7/` parent with it (`ls .claude/worktrees/bl/D3/` prints `p3 p5 p6`). Nothing is left running |

Short citations: `Reg` (`REGISTRY.md`, the Pass 6 part), `H7` (`pass-7/H7.md`), `FV6` (`pass-7/FLOOR-V6.md`), `MS4` (`pass-6/MINOR-SPLIT-v4.md`), `Crit` (`pass-6/D3-critique.md`).

---

## 0 · In brief

- **The build:** minor v4 plus R-16, comments only. R-16 (i)'s two line-split sentences take R-13's register, and 19 of MS4 §1.2's 21 listed sentences, ruled false in light one at a time, are rewritten (§2). No value, name, selector or markup moves.
- **Byte identity holds.** The minor v5 and the minor v4, built under one label in one worktree, give a **byte-identical specimen dist** (3 files; CSS 398,432 B, sha256 `e11613c3eeb45cab…` in both, MS4's byte count) and a **byte-identical dist-demo** (346 files, `diff -rq` exit 0 with no normalisation). A v5 rebuild is identical too (§3). So every paint verdict of MS4 and Crit §3 carries to the minor v5 (P-3, the thin-capture law), and this seat ran the thin set: H7-3, H7-1's M-3 re-read with G7's M-3 half, the static checks, the build, the typechecks and vitest.
- **H7-3:** DEL with the minor's declaration (`harness/deletes-minor.json`, 24 names) reads **minor v5 PASS 24, 0 hits** and **minor v4 FAIL 21/24, 26 hits in 11 files** (A-3's two sentences and the 17 declared R-16 (iii) sites). Self-test `SELFTEST PASS: 26 expectations met`.
- **M-3 under H7-1: light green on every row in Chromium (the gate).** The light Close ring reads **3.73 at its full-coverage column on all 7 light grounds**, in three fresh captures at loads 19.8, 22.8 and 10.3, identical to the digit. Over the pass-6 critic's 684 banked rows the minor's Chromium light M-3 reads **PASS 171** (H7 §3).
- **G7's M-3 half under H7: 0 regressions.** On the critic's captures, **73 HEAD-PASS rows, 0 regress** (H6: 70). On this seat's fresh dialog captures, Chromium 9 HEAD-PASS, 0 regress; **Playwright WebKit 6 HEAD-PASS, 0 regress**. The WebKit capture scores HEAD's 14 Close rings that H7 left UNSCORED: three are HEAD-PASS (dark paper 3.76, aurora50 3.31, black 3.79), and the minor reads 4.40, 3.78 and 4.44 there.
- **Toolchain:** `vue-tsc` (app, tests) exit 0, library build and dist-demo exit 0, **vitest 239 files, 2321 passed, 0 failed** (10 expected-fail, 1 skipped), as MS4. **G5:** `terminal CLEAN`, roster PRESENT 289 = 289 with the datum rebound in the worktree; the ratchet owes **+2,333 B** (2,921,390 against 2,919,057), MS4's +2,326 B plus **7 B from one `.d.ts` JSDoc line** (§5).
- **Shippability (§6):** every reading the registry set for the minor is green. P6-3.3's items 3 (the Close ring) and 4 (A-3's sentences) are closed. 10.2.0 is still held by the entry gate (0 of 2 clean passes, owner-gated), Q-11's content clause, and three landing items.

---

## 1 · The build

### 1.1 · R-16 (i): A-3's two sentences (Crit A-3), in R-13's register

| file (minor v5 line) | was | now |
|---|---|---|
| `src/components/dock/styles/adaptive-legibility.css:7-9` | "The PLATE half — the earned darken off the measured backdrop luminance — is composed at the element…" | "The PLATE half — the earned ink off the measured backdrop luminance (darker in dark, a thicker cream pole in light) — is composed at the element…" |
| `src/styles/glass/overlay-plate.css:272-273` | "…the veil already carries the earned darken, and a second layer pushing the same plate the same way is the double-writer…" | "…the veil already carries the earned ink (darker in dark, a thicker cream pole in light), and a second layer…" |

The rest of the `overlay-plate.css` sentence ("There is no adaptive-tint layer and no `--select-plate-alpha` solidity knob") stays as HEAD has it. It is true in the minor, which deletes neither mechanism (both left before HEAD; MS4 G5: no name removed), and no minor-side declaration names them. FV6 §8 handed this sentence on with that condition, and it does not hold. Floor v6's rewording of the same lines stays with the floor, which does not ship (P5-3.3).

### 1.2 · R-16 (ii) and H7-3: the minor's own declaration

`harness/deletes-minor.json` now holds R-13's four renamed phrases plus **20 phrases** taken from the R-16 (iii) sentences ruled false in light (§2). Each was first run on the minor v4 (`DEL` over a candidate list, the run before the edits). A phrase went into the declaration only if every hit on the minor v4 was a listed sentence. Three candidates failed that check, because their words recur in sentences outside the fixed list: `darkening moves the plate` (also `adaptive-legibility.css:33`), `declarative darken` (also `adaptive-legibility.css:70`) and `darkened plate` (also `adaptive-legibility.css:33` and `dock/styles/search.css:58`). Declaring them would sweep sentences the seat may not sweep (R-16 (iii)). They stay out, and §2.3 records the two rewrites that are left without a guard.

### 1.3 · Static readings (`MS5-records/static.log`, 00:46:44, load 15.5)

| reading | minor v5 (fixture) | plant or bite |
|---|---|---|
| **H7-3** DEL, `deletes-minor.json` (24 names) | **PASS 24**, 0 hits over 838 text files (`del-minor-minor5.log`) | **minor v4: FAIL 21/24, 26 hits in 11 files** (`del-minor-minor4.log`). The three that pass on v4 are R-13's own renames, which v4 already cured |
| MS4's R-13 line grep | 0 lines | — |
| MS4 §1.2's sweep (`grep -i darken` minus its filter, `src` and `demo/stories`) | 59 lines | minor v4: 83. `diff` prints 26 `<` and 2 `>` lines. Two of each are `property-regs.css:151, 163`, renumbered by one. The other 24 are gone: the 22 sweep lines of the rewritten listed sentences and A-3's two (`sweep-diff-minor4-minor5.txt`) |
| LAW | **PASS 54** (`law.log`; the harness, `pass-6/`, `pass-7/` with this seat's runner) | the self-test's LAW plants (§1.4) |
| census | `stacked=0 halo=0 blur=0 open=0`, exit 0 | `git archive v10.1.0 src/styles`: exactly `stacked=2 halo=2 blur=5 open=9`, exit 1 (W-0.11 G4's bite) |
| HOV | PASS 58 | — |
| LIT | REPORTED, `halo=5 near=1 stacked=10 chain=3 open=19 frames-halo=0/0`: the 19 inherited, none added (MS4's reading) | — |
| R-11 ladder | `diff radii-minor5 FV6-records/radii-minor4.txt` prints nothing | (FV6 §3: HEAD exit 1) |
| FL-14 static | `isolation: isolate;` at line 26 of `@utility glass-plate` | (MS4: minor v3 0) |

### 1.4 · Self-test (`MS5-records/selftest-h7.log`, 00:47:00, load 14.0)

`selftest.mjs --only H7-1,H7-3,DEL,LAW --h7-trees <minor4, minor5>`: **`SELFTEST PASS: 26 expectations met`**. H7-3's rows changed in place, since the declaration grew:

| row | expect | read |
|---|---|---|
| fixture: R-13's register ("earned ink") | PASS | PASS 24 |
| plant: "earned / darken" split over two comment lines | FAIL | FAIL 1/24 |
| **plant (new):** an R-16 (iii) sentence, "the plate still darkens-over-light for AA" (`tokens/glass.css:208`'s shape, kebab) | FAIL | FAIL 1/24 |
| plant: the minor v4 | FAIL | FAIL 21/24 |
| ROWS on that plant: `adaptive-legibility.css:7`, `overlay-plate.css:272`, `ladder.css:164`, `useGlassBackdropLuminance.ts:45`, `hits=26 files=11` | ROWS | rows hold (5) |
| **fixture (was `minor4fix`): the minor v5** | PASS | PASS 24 |

The H7-1 rows (fixture, three plants, two bites) and the H6 DEL and LAW rows read as H7 §2 records. The H7-2 rows on floor v5's trees did not run here (no `--h7-decl`, no floor trees), and the self-test now says when each block runs.

---

## 2 · R-16 (iii): MS4 §1.2's sentences, ruled one at a time

**The list is MS4 §1.2's, and it is fixed:** `glass/ladder.css:164-304` (the bucket comments), `glass/deep.css:26-29`, `tokens/glass-fx.css:143`, `tokens/glass.css:14,208`, `tokens/on-glass-fg.css:15`, `tokens/property-regs.css:121`, `glass/surfaces-pager.css:34`, `glass/rim.css:35`, `glass/control-bit.css:175`, `glass/surface-axis.css:18,22,80`, `composables/glass/useGlassBackdropLuminance.ts:45`. In the bucket range, a sentence is on the list when MS4's sweep prints one of its lines (164, 168, 176, 246, 268, 292, 294, 301, 302, 304) or when it shares a sentence with such a line.

**What each sentence is read against: the minor's light arm.** In light the veil's ink *is* the `--card` pole (`tokens/glass.css:10-15`, `glass/veil.css:4-6`). The clamp in `@utility glass-plate` earns up to two more steps of that ink past the luma knee: "In dark that darkens toward the ink; in light it thickens the `--card` pole" (`veil.css:39-44`). The bright bucket (`@container style(--glass-backdrop: light)`, `ladder.css:182-191`) re-points the muted ink and touches no plate. So in light no plate darkens, and the only plate change over a bright ground is the clamp's thicker cream, driven by the measured luma.

### 2.1 · The verdicts (line numbers are the minor v4's)

| # | site | sentence (the clause that decides it) | verdict | minor v5 | declared as |
|---|---|---|---|---|---|
| 1 | `ladder.css:163-164` | heading: "(the iOS-26/27 'locally darken the glass over light content' move; G2)" | **false in light**: the bucket moves the ink, not the glass | "(G2: legible ink over light content)" | `locally darken the glass` |
| 2 | `ladder.css:165-168` | "toward `--glass-veil-ink` — the warm near-black `--foreground` — while the veil already writes warm near-black ink … the plate darkened twice" | **false in light**: the light veil ink is the cream pole | "toward `--glass-veil-ink` while the veil already writes that ink … the plate moved twice" | `veil already writes warm near-black ink`, `plate darkened twice` |
| 3 | `ladder.css:173-177` | "the muted L40 tier cannot clear 4.5:1 on a darkened translucent plate, because darkening moves the plate TOWARD muted's own luminance" | **false in light**: the light plate never darkens, and its cream moves away from the muted ink's luminance. The reason is dropped and the lift is stated | "the muted body register lifts to the full warm ink. That is a foreground decision…" | `darkened translucent plate` |
| 4 | `ladder.css:244-247` | "(it darkens the translucent plate so dark text clears ~11:1 over white at the 18% floor — the live π readback ratifies)" | **false in light**: the bucket drives the ink (#3), and the 18 % floor is HEAD's light ladder | "(it lifts the ink on the plate to the full warm ink)" | `darkens the translucent plate` |
| 5 | `ladder.css:268` | "Progressive enhancement only — the declarative darken is the AA floor." | **false in light** | "…the declarative lift is the AA floor." | **not declared** (§2.3) |
| 6 | `ladder.css:290-292` | "(where the plate ACTUALLY darkens to bright-bucket AA)" | **false in light** | "(where the bucket lifts the ink to its AA floor)" | `plate actually darkens` |
| 7 | `ladder.css:293-295` | "The overlay band STILL self-darkens UNCONDITIONALLY (the tint-strength clamp above, it floats over unknown)" | **false in light**, and the tint-strength clamp is gone ("THE TINT AXIS IS GONE", the same file at 165). The band declares `--glass-backdrop: light` on itself (`ladder.css:125-131`) | "The overlay band STILL self-engages the bucket UNCONDITIONALLY (it floats over unknown)" | `self-darkens unconditionally`, `tint-strength clamp` |
| 8 | `ladder.css:297-304` | "the content tiers only carry the 4% silhouette floor … where the plate ACTUALLY darkens … a white-on-cream / dark-on-darkened mismatch … the rest of the bright-condition darken" | **false in light**: the minor's light content tiers paint the cream pole at the bound | "the content tiers paint the cream pole at the bound … correct only where the bucket engages … would force the contrast ink onto the calm card … the rest of the bright-condition lift" | `silhouette floor`, `dark-on-darkened`, `bright-condition darken` |
| 9 | `deep.css:26-30` | "The bright-bucket darken reaches the deep surface … self-engages the overlay-band darken — the deep tier inherits the legibility tint" | **false in light** | "The bright bucket reaches the deep surface … self-engages the overlay band's bucket, and its plate earns the floating rung's ink (darker in dark, a thicker cream pole in light) — the deep tier inherits both" | `bright-bucket darken`, `overlay-band darken`, `legibility tint` |
| 10 | `glass-fx.css:141-144` | "the ink ramps CONTINUOUSLY toward two rungs deeper. Raising the knee darkens LATER" | **false in light** | "…toward two steps more (darker in dark, a thicker cream pole in light). Raising the knee earns ink LATER" | `darkens later` |
| 11 | `tokens/glass.css:14-15` | "The plate never darkens toward a near-black ink over paper, so it never reads grey there (O-62)." | **true in light** (it is the light law, and G1 reads 11/11 over paper); it says nothing of dark | kept | — |
| 12 | `tokens/glass.css:207-208` | "the plate still darkens-over-light for AA AND carries the data hue" | **false in light** | "the plate still earns its ink for AA (darker in dark, a thicker cream pole in light) AND carries the data hue" | `plate still darkens` |
| 13 | `on-glass-fg.css:14-16` | "(a) bright/darkened plate → full ink" | **false in light** | "(a) declared-bright backdrop → full ink" | **not declared** (§2.3) |
| 14 | `property-regs.css:121` | "`--glass-veil-ink` (the whole-plate legibility darken)" | **false in light** | "(the whole-plate legibility ink: darker in dark, a thicker cream pole in light)" | `legibility darken` |
| 15 | `surfaces-pager.css:33-35` | "over a declared/sampled BRIGHT carousel image (`@container …`) the pill darkens-toward-ink for a real silhouette (the ≤24% clamp keeps it translucent)" | **false in light**, and a declared bucket moves no plate in the minor | "over a sampled BRIGHT carousel image the pill earns ink for a real silhouette (darker in dark, a thicker cream pole in light; the clamp's two-step ceiling keeps it translucent)". The sentence's `.dark` clause is dark-scoped and kept | `darkens toward ink` |
| 16 | `rim.css:35` | "not the whole-plate legibility darken" | **false in light** | "not the whole-plate legibility ink" | `legibility darken` |
| 17 | `control-bit.css:175-176` | "glass/veil.css darkens a plate by compositing `--glass-veil-ink`" | **dark-only and scoped to dark**: the paragraph is "THE RECESS'S DARK ARM", the comment over `.dark .control-bit` | kept | — |
| 18 | `surface-axis.css:18` | "`--glass-level` / the bright-bucket darken retune it in lockstep" | **false in light** | "`--glass-level` / the earned ink retune it in lockstep" (the minor's own wording at :42) | `bright-bucket darken` |
| 19 | `surface-axis.css:22` | "(a solid plate has no translucent backdrop to darken-over)" | **false in light**: in light the earned ink thickens cream | "(… to earn ink over)" | `backdrop to darken over` |
| 20 | `surface-axis.css:79-80` | the same clause | **false in light** | "(… to earn ink over — the bucket-INVARIANT contract)" | `backdrop to darken over` |
| 21 | `useGlassBackdropLuminance.ts:45` | "The luminance threshold above which the backdrop is `light` (engages the darken)." | **false in light**: the threshold sets the `light` bucket (`:238`), which lifts the ink. The plate's earned ink reads the luma against the knee, not this threshold | "(engages the bright bucket)" | `engages the darken` |

**Count: 21 sentences.** 1 true (kept), 1 dark-only and scoped to dark (kept), **19 false in light (rewritten)**. 17 of the 19 are declared, under 20 names.

### 2.2 · What each rewrite holds to

Each rewrite says what the minor does in both modes, in R-13's register ("earned ink (darker in dark, a thicker cream pole in light)") where the sentence describes the plate, and as "lift" where it describes the bucket's ink. No rewrite adds a figure. Three drop one: the "~11:1 over white at the 18% floor" of #4 and the "≤24% clamp" of #15 are HEAD's light ladder, and the muted-luminance reason of #3 is false in the minor and has no measured replacement, so the sentence keeps only its claim.

### 2.3 · Two rewrites without a guard

- **#5** (`ladder.css:268`): "the declarative darken is the AA floor" is word for word the sentence at `adaptive-legibility.css:70`, which is outside the list.
- **#13** (`on-glass-fg.css:15`): "bright/darkened plate" has no phrase DEL can match. Its matcher joins words over whitespace, comment leaders, hyphens and underscores, not `/` (`deleted-mechanisms.mjs` `SEP`), and "darkened plate" recurs outside the list.

Both are rewritten in v5, so the measured tree is the tree that lands. DEL cannot see them come back. If the critic rules the outside sentences false, the phrases `declarative darken` and `darkened plate` join the declaration and both are guarded.

### 2.4 · Sentences outside the list, seen and not swept (to the critic)

The sweep (`sweep-minor5.txt`) prints further light-arm sentences in the dock and glass family. They are R-16's "outside the list", so they go to the critic, and this seat did not rewrite them: `dock/styles/adaptive-legibility.css:24` ("cannot self-darken"), `:28-30` ("the plate's own darken is composed AT THE ELEMENT"), `:32-34` ("a translucent darkened plate — darkening moves the plate TOWARD muted's own luminance", #3's twin), `:59-60` ("it darkens the dock"), `:70` (#5's twin); `dock/styles/search.css:4, 10, 58`; `dock/styles/shell.css:130, 135`; `dock/styles/index.css:21`; `tokens/property-regs.css:152` ("tint = darken-over-light"), `:164` ("earns the same continuous darken"); `tokens/dark-arm.css:310` ("the light arm's darkening"). Two touch the tint axis that `ladder.css:165` says is gone: `surface-axis.css:79` ("The adaptive TINT axis is zeroed") and `surfaces-pager.css:29` ("The element-level oklab TINT seam"). `dock.css:107` and `adaptive-legibility.css:18` quote the owner ("darken DYNAMICALLY like iOS 27") and are a citation.

---

## 3 · Byte identity (Reg P6-2.2, thin builds; `MS5-records/same.log`, 00:47:13-00:47:21, load 15.1 → 16.6)

The minor v5, then the minor v4, then the minor v5 again were built by `harness/build.mjs --demo` under one label in one worktree. Each output was moved aside with its own Vite cache before the next build, so no build read another's cache. `srcDirtyFiles` reads 46 for v5 and 41 for v4 (`same-buildjson.log`), so the swap was real.

| output | minor v4 against minor v5 | minor v5 against minor v5, rebuilt |
|---|---|---|
| **specimen dist** (`index.html`, `index-*.js`, `index-Bd1ws62N.css`) | **`diff -rq` exit 0, 0 lines; sha256 lists identical.** CSS **398,432 B**, sha256 `e11613c3eeb45cab…` in both | exit 0 |
| **dist-demo** (346 files; CSS 431,116 B in all) | **`diff -rq` exit 0, 0 lines; sha256 lists identical**, with no normalisation | exit 0 |

**Why it holds where floor v6's did not (FV6 §4):** every R-16 hunk is a CSS block comment or a TypeScript JSDoc line. The CSS minifier drops comments, and the production JS drops JSDoc. No hunk touches a `.vue` file, so no Vue scoped id moves. **The paint verdicts of MS4 and of Crit §3 carry to the minor v5**, cited below and not re-measured.

**One emitted byte count does move, outside the two compared outputs:** the library's `dist/composables/glass/useGlassBackdropLuminance.d.ts` keeps the JSDoc, and "engages the darken" → "engages the bright bucket" adds **7 B** (§5). No other library file carries an R-16 sentence (`rebound.log`).

---

## 4 · The gates on the minor v5

Carried rows cite MS4's section, and "carried" means from byte-identical specimen and demo outputs (§3). "Read here" rows are this seat's.

| gate | Chromium (gate) | Playwright WebKit | source | verdict |
|---|---|---|---|---|
| **W-0.1 G1** M-1 | 11/11, plates `#fef7f1`-`#fef8f1`, ΔE 0.009-0.010 from paper | 11/11 | carried, MS4 §3 | **PASS** over paper; off paper below |
| **G2** O-66 field | trigger = Input `#f3ece2`, ΔE 0.000 paper and pane; dark `#3f3731` 0.000 | PASS | carried, MS4 §3 | **PASS** |
| **G3** O-66 row | `#f2e5d5` C 0.0256, ΔL −0.0522; HOV 58 (read here) | PASS | carried + `static.log` | **PASS** |
| **G4** W-A light | 108/108, thinnest α 0.890 against the bound 0.891 | 108/108 | carried, MS4 §3 | **PASS** |
| **G5** scope | **read here:** `terminal CLEAN`, roster PRESENT **289 = 289**, claims 193, declarations 454, with the datum rebound in the worktree (`verifier-rebound.log`); `.published-roster` diff empty (`v10.1.0..HEAD` and the worktree). Unrebound: `G-BUNDLE-RATCHET … 2921390 > 2919057`, **+2,333 B** (`verifier.log`) | — | `ratchet.log`, `rebound.log` | **PASS** (rebind owed at landing) |
| **G6** per R-9 | 13 dark composites, worst ΔE **0.0000** | — | carried, MS4 §3 | **PASS** |
| G6 raw, beside it | 1 of 26 over: dark paper dock `#0f0c09 → #0e0c09`, ΔE **0.0022** (W-0.11's dark dock cast) | 0 over | carried, MS4 §3 | printed, as R-9 orders |
| **G7** M-2 half | 1,125 HEAD-PASS rows, 0 regress (both engines) | counted | carried, MS4 §3 (H7 does not read M-2) | **PASS** |
| **G7** M-3 half, **under H7-1** | **read here, three ways:** (a) the pass-6 critic's 684 banked rows re-scored by H7 (H7-records/rescore), HEAD against minor v4 = minor v5: **73 HEAD-PASS, 0 regress**, 356 HEAD-FAIL now PASS (under H6: 70, 0, 350), 14 HEAD WebKit rows UNSCORED there; (b) this seat's fresh dialog captures, Chromium: **9 HEAD-PASS, 0 regress**, 22 more pass (`g7-m3-fresh-chromium.txt`) | (c) fresh dialog captures: **6 HEAD-PASS, 0 regress**, 22 more pass (`g7-m3-fresh-webkit.txt`); HEAD's 14 Close rings scored (§4.1) | `g7-m3-rescore.txt`, `MS-g7.mjs` | **PASS** |
| **W-0.11 G1-G4** | census `stacked=0 halo=0 blur=0 open=0`, exit 0; on `v10.1.0 src/styles` exactly `stacked=2 halo=2 blur=5 open=9`; ladder `diff` empty | static | **read here** (`static.log`) | **PASS** |
| **W-0.11 G5** | as W-0.1 G5 | — | read here | **PASS** |
| **W-0.11 G6** | M-1 11/11; against the W-0.1 tree, M-2 0 of 1,442 and M-3 0 of 420 regress | counted | carried, MS4 §4 (under H6; §7) | **PASS** |
| STACK (FL-14) | 24/24 | 24/24 | carried, MS4 §5 | **PASS** |
| M-2 light | green on every read row | green on every read row | carried, MS4 §7 | green |
| **M-3 light, under H7-1** | **PASS 171** over the banked rows (H7 §3); fresh dialog: Close ring **3.73** on all 7 grounds, the dialog well 3.33 and ring 3.52, "all 3 ≥ 3.0" on every light dialog cell, three runs identical | FAIL 1/171 (the checker floating well ring 2.99, a straight-run ring H7-1 does not read; MS4 §10, twice); fresh dialog Close ring 3.25 on all 7 | `m3-cr-m5-{1,2,3}.txt`, `m3-wk-m5.txt` | **green on every row in the gate engine** |
| M-2h | the held dock ≥ 4.5 in every frame (fg 7.57 over black); the light halo 0.807 is N-3's attributed frost | PASS 22 | carried, MS4 §7 | green (N-3 attributed) |
| H3-1 off paper (Q-11 unruled, default (a)) | REPORTED: 48 of 66 grey or the ground's hue, content included (wash over black `#e2dcd7`, L 0.898, C 0.0095; over the deep canvas `#e3e3e3`, C 0.0000) | the same | carried, MS4 §7 | REPORTED |

### 4.1 · The M-3 re-read on fresh captures (H7-1 live on raw PNGs)

| capture | when, load | light Close ring (7 grounds) | dark Close ring: paper · aurora · aurora50 · black · white · checker · stripes |
|---|---|---|---|
| minor v5, Chromium, run 1 | 00:48:26 → 00:50:06, 17.1 → 19.8 | **3.73** every ground (min 2.77; full-coverage column 852) | 5.05 · **2.96** · 4.17 · 5.04 · **2.49** · 3.89 · 3.64 |
| minor v5, Chromium, re-run 2 | → 00:53:58, 13.8 → 22.8 | identical to the digit (`diff` of the verbose rows empty) | identical |
| minor v5, Chromium, re-run 3 | → 00:55:41, 21.3 → 10.3 | identical | identical |
| HEAD, Chromium (built in the worktree) | 00:50:22 → 00:52:03, 18.2 → 13.9 | 1.91 · 1.67 · 1.74 · 1.02 · 1.93 · 1.31 · 1.37 | 4.20 · 2.65 · 3.57 · 4.18 · 2.26 · 3.38 · 3.18 |
| minor v5, Playwright WebKit | 01:01:50 → 01:03:32, 19.8 → 17.7 | **3.25** every ground (worst of three: no full-coverage column) | 4.40 · 2.96 · 3.78 · 4.44 · 2.23 · 1.70 · 2.55 |
| minor v5, Playwright WebKit, re-runs 1 and 2 | 01:13:11 → 01:14:53, 13.6 → 14.2 | — (dark only) | identical to the digit, twice |
| HEAD, Playwright WebKit | → 01:05:16, 25.9 | 1.84 · 1.47 · 1.65 · 1.01 · 1.86 · 1.37 · 1.66 | 3.76 · 2.71 · 3.31 · 3.79 · 2.08 · 1.53 · 2.36 |

The Chromium values equal H7 §3's re-score from the critic's banked records to the digit (minor 3.73 light; dark 2.96 and 2.49; HEAD 1.91 light; dark 2.65, 3.57, 2.26, 3.38, 3.18). So R-14's reader reads the same on fresh PNGs as on the banked column records.

**The dark Close rings under 3.0** (Chromium aurora 2.96, white 2.49; Playwright WebKit aurora 2.96, white 2.23, checker 1.70, stripes 2.55) reproduced in every run, at loads from 10.3 to 22.8. They are not load-borne. They are 10.1.0's dark arm, which the minor does not change, and HEAD reads each lower (Chromium 2.65, 2.26; WebKit 2.71, 2.08, 1.53, 2.36). They are W-H.2's. They are neither a gate nor a row, and G7 does not count them, because each is HEAD-FAIL under H7 in both engines.

**HEAD's Playwright WebKit Close rings, unscored in H7 §5, are now scored:** 6 of 14 have a full-coverage column (light paper, aurora, aurora50, black, white, stripes), and none of those six clears 3.0 (1.01-1.86). The three HEAD-PASS dark rings (3.76, 3.31, 3.79) pass at the worst of three. The minor reads them at 4.40, 3.78 and 4.44, so G7 holds on every WebKit Close ring.

---

## 5 · Toolchain and the ratchet (`toolchain.log`, 01:09:57-01:11:45, load 19.0 → 19.5; `ratchet.log`, `rebound.log`, 01:11:59-01:12:51)

| step | minor v5 |
|---|---|
| `vue-tsc --noEmit` | exit 0 |
| library build (`cacheDir` in the worktree) | exit 0 |
| `vue-tsc --noEmit -p tsconfig.test.json` (after the library build, FV6 §6's order) | exit 0 |
| dist-demo | exit 0 |
| `vitest run --maxWorkers=2` | **239 files, 2321 passed, 0 failed**, 10 expected-fail, 1 skipped (MS4: 2321) |
| verifier, datum unrebound | `G-BUNDLE-RATCHET: bundle ratchet increase forbidden: 2921390 > 2919057`, exit 1 |
| verifier, datum rebound in the worktree only | exit 0, `terminal CLEAN`, roster PRESENT 289 = 289; `.bundle-ratchet` restored after the run |

**The ratchet owes +2,333 B at landing:** MS4's +2,326 B (2,921,383) plus 7 B from the one JSDoc line in `useGlassBackdropLuminance.d.ts`. No test pins any R-16 sentence. The pinned-test landing debt is MS4 §8's, unchanged.

---

## 6 · Shippability for 10.2.0

| item | reading |
|---|---|
| G1 over paper | **green**, 11/11 in both engines (carried) |
| G2, G3, G4 | **green** (carried; HOV re-read) |
| G5 | **green**; ratchet rebind owed at landing, **+2,333 B** |
| G6 | **green per R-9** (0.0000); raw 1 of 26 at 0.0022, W-0.11's own dark dock row, printed beside it |
| **G7** | **green, with its M-3 half re-read under H7-1**: 0 regressions on 73 HEAD-PASS rows (the critic's captures) and on the fresh dialog captures in both engines; HEAD's WebKit Close rings scored |
| W-0.11 G1-G6 | **green** (G1-G5 re-read; G6 carried under H6, §7) |
| STACK, M-2 light, M-2h | **green** (carried) |
| **M-3 light** | **green on every row in Chromium under H7-1**: the Close ring 3.73 (three runs), every plate row ≥ 3.0. **P6-3.3 item 3 is closed** |
| **R-16** | **built**: A-3's two sentences and the 19 listed sentences ruled false in light, H7-3 PASS 24 on v5 and FAIL on v4. **P6-3.3 item 4 is closed**, and the tree that lands is the tree measured |
| tests | 2321 passed, 0 failed |

**Reading.** The minor v5 is the measured shape of 10.2.0's veil recut and W-0.11's tokens, and every reading the registry set for it is green. Its paint is the minor v4's to the byte, so the measured tree and the shipped tree are the same for every pixel the battery reads.

**W-0.1 and W-0.11 still cannot ship in 10.2.0.** Nothing in the remaining list is the minor's to supply:

1. **The entry gate:** 0 of 2 clean passes (W-0.1 §3, W-0.11 §3.3). The floor's five open rows wait only on the owner (FV6 §7: Q-1, Q-3, Q-11 both clauses, Q-14). Pass 7 cannot be clean unless the answers arrive before its critic (Reg P6-6.3). The earliest landing stays **the close of pass 8**.
2. **Q-11's content clause:** G1 off paper reads 48 of 66 grey, content included. Only the owner can say whether 10.2.0 may ship grey content off paper. "Not accepted" has no measured minor candidate and fires C″'s re-trigger (c).
3. **The landing's own items, unchanged from P6-3.3 item 5:** R-9's reading enters W-0.1 §5 G6's text (the owner may override); each gate binds to one probe (W-0.1 §5 and W-0.11 §5 name `scripts/probes/band-0/*`, which the tree still lacks); `.bundle-ratchet` rebinds to the measured bytes (**+2,333 B** on v5).
4. **10.2.0 is also gated on D2 converging** (O-88).

**Remaining minor-side items** (the minor's, but none blocks on the minor's measured paint):
- The critic rules the §2.4 sentences outside the list. Any it rules false in light makes a minor v6, comments only. The same byte-identity proof then carries every verdict again, unless a rewrite enters a `.vue` file, which moves a scoped id, and then FV6 §4's full-battery rule applies.
- When that ruling comes, `declarative darken` and `darkened plate` join the declaration (§2.3).

---

## 7 · Known limits and handed on

| item | to | why |
|---|---|---|
| the §2.4 sentences outside R-16's fixed list | the critic | R-16 (iii): a sentence outside the list is the critic's, not swept on the seat's reading |
| the two undeclared rewrites (#5, #13) | the critic, then the declaration | §2.3: their phrases recur outside the list, and DEL's joiner does not span `/` |
| **W-0.11 G6's M-3 half under H7-1** (the W-0.1 tree against the minor) | the critic | not re-read here: the W-0.1 tree (`s-w01ref`, W-0.11's values backed out) was captured in the pass-6 worktree, and its PNGs went with it, so a re-read needs a fresh `s-w01ref` capture. H7-1 only raises readings, so G6 could move only if a W-0.1-tree three-column ring passed at full coverage while the minor's failed. W-0.11 moves shadow and blur, not the ring ink |
| FL-14's dark-composite movement, read by the pass-6 seat only | the critic (Reg P6-6.2 step 4) | unchanged by R-16 (byte-identical specimen) |
| W-0.11's dark dock cast (G6 raw 0.0022) | W-0.1 §5 G6's text at landing (R-9) | carried |
| R-12 in Playwright WebKit | none possible in this harness | the demo dock page crashes it (H-14). Real Safari: UNMEASURED (owner's safaridriver checkbox) |
| every real-Safari cell, including FL-14's `isolation` and R-12's pointer path | the owner (safaridriver checkbox) | UNMEASURED |

## 8 · Reproduce

```sh
P7=docs/tranches/BL/design/material/pass-7
git worktree add --detach .claude/worktrees/bl/D3/p7/minor5/wt HEAD; ln -s "$PWD/node_modules" .claude/worktrees/bl/D3/p7/minor5/wt/node_modules
git -C .claude/worktrees/bl/D3/p7/minor5/wt apply $P7/minor-split-v5.patch      # or: apply pass-6/minor-split-v4.patch, then python3 -I $P7/MS5-r16-edits.py <wt>
# trees for H7-3: copy the worktree's src/ and demo/ to .claude/worktrees/bl/D3/p7/minor5/trees/minor5, and the minor v4's to trees/minor4
~/.claude/guard/guarded --light --timeout 15 -- bash $P7/MS5-run.sh static
~/.claude/guard/guarded --light --timeout 15 -- bash $P7/MS5-run.sh selftest
~/.claude/guard/guarded --timeout 45 -- bash $P7/MS5-run.sh same
~/.claude/guard/guarded --timeout 30 -- bash $P7/MS5-run.sh m3-cr          # M3_RUN=2, 3 for the re-runs
~/.claude/guard/guarded --timeout 30 -- bash $P7/MS5-run.sh m3-head
~/.claude/guard/guarded --timeout 60 --exclusive webkit -- bash $P7/MS5-run.sh m3-wk
~/.claude/guard/guarded --timeout 60 -- bash $P7/MS5-run.sh toolchain
~/.claude/guard/guarded --light --timeout 10 -- bash $P7/MS5-run.sh ratchet
~/.claude/guard/guarded --light --timeout 10 -- bash $P7/MS5-run.sh rebound
~/.claude/guard/guarded --timeout 30 --exclusive webkit -- bash $P7/MS5-run.sh rerun-wk
bash $P7/MS5-run.sh teardown
```
