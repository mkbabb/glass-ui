# D3 · pass 8 · MINOR-SPLIT v6: minor v5 + R-18, byte-identical in paint

| field | value |
|---|---|
| seat | D3 pass 8, the minor split v6 (`REGISTRY.md` P7-6.2 step 3). A build, not a route: the tree 10.2.0's veil recut (W-0.1) and W-0.11's tokens would ship from. It builds R-18 on `pass-7/minor-split-v5.patch`, proves the specimen dist and the dist-demo byte-identical to the minor v5's, then runs H7-3 with R-18's declaration, H8-1 over the minor's own patch, the static checks and the toolchain. It runs no browser, because the bytes held |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | worktree `.claude/worktrees/bl/D3/p8/minor6/wt` cut at `f12349dfa` (the floor v7 bank, docs only). `git diff --stat 72cde4317 f12349dfa -- src demo tests package.json scripts tests-visual vite.targets.ts .bundle-ratchet .published-roster DESIGN.md docs/canon` prints nothing (`MS6-records/check.log`), and H8 and FV7 tie `72cde4317` to the critic's `1da7eb17b` the same way. So the base is the published 10.1.0 source every pass-6 to pass-8 seat measured. **`git apply --check minor-split-v6.patch` exits 0 at `f12349dfa`**, in the worktree returned to HEAD and in the checkout (read only) |
| patch | **`minor-split-v6.patch`**: **59 files, +712 / −525** (`git diff --shortstat`), sha1 `4ea01c0e`. Composition, checked byte for byte: `pass-7/minor-split-v5.patch` (57 files, sha1 `a790fd05`) + **`minor-split-v6-R18.diff`** (8 files, +33 / −32, sha1 `1905e64a`) = `minor-split-v6.patch` (`cmp`, `patch.log`). The two paths new to the minor are `src/components/dock/styles/index.css` and `tests/components/field/forms-seam.test.ts`. No `.vue` file is in the delta. The edits are applied by `MS6-r18-edits.py` (each old string must occur exactly once) |
| owner rulings | **None.** `audit/INBOUND.md` still ends at O-98. `FORMATION-PROGRESS.md`'s D3 lines after the pass-7 close are the pass-8 launch (489), the H8 bank (492) and the floor v7 bank (493). None records a ruling on Q-1, Q-3, Q-11 (either clause), Q-12, Q-13 or Q-14. The P7-4 defaults apply: Q-1 (a), Q-3 (a), Q-11 (a) for chrome with content REPORTED, and Q-14 (a). The minor builds no owner option |
| engines | none run. The bytes held (§3), so every paint verdict of the minor v5 carries (P7-2.2, the thin-build rule): Chromium 149 gated, Playwright WebKit 26.5 paint-only, as read by MS5, MS4 and the pass-7 critic. **Every real-Safari cell: UNMEASURED (owner's safaridriver checkbox)** |
| records | `MS6-run.sh` (every command, by phase: `edit`, `paths`, `check`, `trees`, `static`, `selftest`, `selftest-h8`, `same`, `bite`, `toolchain`, `ratchet`, `law`, `teardown`), `MS6-records/` (`phases.log` carries each phase's time and load), `MS6-r18-edits.py`, `minor-split-v6-R18.diff`, `minor-split-v6.patch`, `MS6-proposed-sites.json` (§4.2, proposed, not landed). Harness changed in place: `harness/deletes-minor.json` (24 → 39 names), `harness/selftest.mjs` (H7-3's rows) and `harness/HARNESS.md` (the `--h7-trees` line) |
| fences | No tracked source was edited in the checkout, and there was no git write in it beyond `git worktree add` / `remove` for this seat's worktree. The edits and every patch swap happened in the worktree, each swap checked with `cmp` or a clean `git status`. Builds and caches lived in `$W/.d3out` and `$W/.cache-m6`, and `.bundle-ratchet` was rebound in the worktree for one verifier run and then restored. The only writes in the checkout are under `docs/tranches/BL/design/material/` (`pass-8/` and the three harness files). Nothing ran in a sibling repo |
| machine law | Every phase ran through `~/.claude/guard/guarded` as the literal command word: `edit`, `paths`, `check`, `trees`, `static`, `selftest`, `selftest-h8`, `ratchet`, `law` and `teardown` under `--light` (no browser, no build); `same`, `bite` and `toolchain` as heavy runs, one at a time. The guard held `same` until the load fell (queued at load 55, admitted 13:46:35 at 34.6). No browser launched, and vitest ran with `--maxWorkers=2`. The kernel-zone refusal never fired. Loads 26.9 to 70.0, from runs outside this seat (`phases.log`). No red cell exists to re-run. Teardown: see §8 |

Short citations: `Reg` (`REGISTRY.md`, the Pass 7 part), `H8` (`pass-8/H8.md`), `FV7` (`pass-8/FLOOR-V7.md`), `MS5` (`pass-7/MINOR-SPLIT-v5.md`), `Crit` (`pass-7/D3-critique.md`). `§n` after them is their section.

---

## 0 · In brief

- **The build:** the minor v5 plus R-18, comments and one test title. All 15 sites of Crit A-3's table are rewritten. The nine false in light take R-13's register, and the four false in both modes now state what the tree does. `forms-seam.test.ts:91` names `--ink-perimeter` instead of "0.48". No value, name, selector, assertion or markup moves (§1, §2).
- **Byte identity holds in both outputs, with no normalisation.** The minor v6 and the minor v5 were built under one label in one worktree. The specimen dist (3 files) and the dist-demo (346 files) are identical by `diff -rq` and by sha256 list. The specimen CSS is **398,432 B, sha256 `e11613c3eeb45cab`**, MS5's figure. The dist-demo matches pass 7's banked minor v5 list exactly. The specimen JS matches the banked `index-DF_nQ09U.js` byte for byte once the worktree path its `//#region` comments print is rewritten to pass 7's. The bite: HEAD built the same way differs in both outputs (§3).
- **H7-3 with R-18's declaration (39 names; `declarative darken` and `darkened plate` now guarded):** **minor v6 PASS 39**; minor v5 FAIL 15/39, one row per new name, 18 hits in A-3's 7 files; minor v4 FAIL 36/39. Self-test **29 of 29**, and with LAW, DEL, H7-1, H8-1 and H8-2 **41 of 41, 0 BAD** (§2.3).
- **H8-1 over the minor's own patch (R-18 (v)): FAIL 6 of 47** on the minor v6, at 8 sites, **none of them on A-3's list**. That is H8 §4.3's conflict with R-18 (iv), and it is unresolved by construction. Three of the 8 sites are true sentences, which I put in a proposed site list for the critic (with them: FAIL 4 of 50). The other five are stale and outside the list. They go to the critic, not to this seat's sweep (§4).
- **Toolchain:** `vue-tsc` exits 0 on both projects. The library build and the dist-demo exit 0. vitest reads **239 files, 2321 passed, 0 failed** (as MS5), and `forms-seam.test.ts` passes 6 of 6 under its new title. The ratchet owes **+2,333 B**, MS5's figure to the byte (§5). **Shippability (§6):** every W-0.1 and W-0.11 gate verdict carries green. R-18, P7-3.3's item 3, is built. 10.2.0 is still held by the entry gate (0 of 2), by Q-11's content clause, by the landing's own items, and by H8-1's remaining minor-side reds, which wait on the critic.

---

## 1 · The build (`minor-split-v6-R18.diff`)

The list is Crit A-3's table, and it is fixed (R-18 (iv)). The table names **15 sites in 11 rows**. The critic's prose counts "13 sentences … 4 false in both modes". The darken sweep (MS5's filter) loses exactly **13 lines** between the minor v5 and the minor v6 (`sweep-diff-minor5-minor6.txt`: 13 gone, 0 added). The other two sites, `surface-axis.css:79` and `surfaces-pager.css:29`, are tint sentences that the darken sweep never printed. So the 13 is the sweep's line count, and this seat built all 15 table sites. The critic should confirm that reading.

### 1.1 · R-18 (i): the nine false in light only, in R-13's register

| # | site (minor v5) | was (the deciding clause) | minor v6 |
|---|---|---|---|
| 1 | `dock/styles/adaptive-legibility.css:24` | "so a self-declaration cannot self-darken" | "… cannot self-engage" (the next sentence names the rule that is the self-engage) |
| 2 | `:28-30` | "the plate's own darken is composed AT THE ELEMENT through the veil clamp" | "the plate's own earned ink (darker in dark, a thicker cream pole in light) is composed AT THE ELEMENT …" (the file's own :40-45 wording) |
| 3 | `:32-36` | "(the muted L40 tier cannot clear 4.5:1 on a translucent darkened plate — darkening moves the plate TOWARD muted's own luminance; … resolves to the legible dark ink, which clears ~10:1)" | "The muted body register lifts to the full warm ink under the engaged plate: the low-contrast muted register is inappropriate over a busy glass plate." This is R-16 #3's twin, rewritten as #3 was: the false reason goes, the claim stays. "Dark ink" (false in dark, where `--foreground` is the light ink) and the unmeasured "~10:1" go with it |
| 4 | `:70` | "the declarative darken is the AA floor" | "the declarative lift is the AA floor" (R-16 #5's twin, the same words) |
| 5 | `dock/styles/search.css:4` | "(≥4.5:1, the darken seam)" | "(≥4.5:1, the plate's earned ink)" |
| 6 | `search.css:10` | "bakes `:root`'s luma and does NOT darken — the pale-fade" | "… does NOT earn ink — the pale-fade" |
| 7 | `search.css:58` | "collapses on a translucent darkened plate" | "collapses on a translucent glass plate" |
| 8 | `dock/styles/shell.css:130` | "The dock self-darkens over light backdrops with NO consumer opt-in" | "The dock earns its plate ink over light backdrops (darker in dark, a thicker cream pole in light) with NO consumer opt-in" |
| 9 | `shell.css:135` | "No token re-pointed here darkens the plate" | "No token re-pointed here moves the plate" |
| 10 | `tokens/property-regs.css:152` | "level = opacity+blur, tint = darken-over-light" | "level = opacity+blur, veil = the earned ink (darker in dark, a thicker cream pole in light)". The axis the sentence names is `--glass-veil-*`, and the veil is its one writer (`ladder.css:165-168`) |
| 11 | `property-regs.css:164` | "earns the same continuous darken from the same arithmetic" | "earns the same continuous ink (darker in dark, a thicker cream pole in light) from the same arithmetic" |

That is 11 sentences in the nine rows the critic ruled false in light only. Rows `search.css` and `shell.css` carry three and two sites each.

### 1.2 · R-18 (i): the four false in both modes, stating what the tree does

| site | was | minor v6 | what the tree does |
|---|---|---|---|
| `adaptive-legibility.css:59-61` | "The declarative bucket above already carries AA on all engines (it darkens the dock plate so the warm-dark `--dock-fg-on-aurora` clears ~17:1 over white at the 18% floor)." | "The unconditional self-engage above already carries AA on all engines: it re-points `--dock-fg-on-aurora` and the muted register to the full `--foreground` ink, and it moves no plate." | no dock bucket (the same file's :52-56), no plate re-point (:28), `:where(.glass-dock)` sets both tokens to `--foreground` (:48-49). The 18 % floor and ~17:1 were HEAD's ladder |
| `dock/styles/index.css:21-24` | "the darken-over-light self-engage (the continuous backdrop-luma tint clamp, the warm-chromatic dock ink, the @container light bucket, contrast-color() refinement, the frozen-backdrop static arm)" | "the dock's foreground self-engage (the warm-chromatic dock ink, the contrast-color() refinement, the frozen-backdrop static arm; it holds no clamp and no bucket)" | the clamp lives in `@utility glass-plate` (`veil.css`), and `adaptive-legibility.css` declares no bucket |
| `glass/surface-axis.css:79-80` | "The adaptive TINT axis is zeroed (a solid plate has no translucent backdrop to earn ink over …)" | "There is no tint axis to zero: the veil is the plate's one writer (glass/veil.css), and a solid plate has no translucent backdrop to earn ink over — the bucket-INVARIANT contract." | "THE TINT AXIS IS GONE … The veil is the one writer now" (`ladder.css:165-168`) |
| `glass/surfaces-pager.css:29-33` | "The element-level oklab TINT seam (NOT the raw … token …). At the `--glass-level: 0` default this is the no-op floor (`X, src 0%) ≡ X` — byte-identical pager pixels over a flat page)" | "The plate composed at the element (NOT the raw … token …). Over a calm or unsampled backdrop the clamp resolves exactly the floating rung's own ink; over a sampled BRIGHT carousel image the pill earns ink …" | the rule sets `--glass-veil-tier: var(--glass-veil-floating)` and applies `glass-plate` (:39-42). An unwired surface resolves exactly the floor (`property-regs.css:168-169`, `search.css:11-13`) |

**Kept, as the critic ruled:** `tokens/dark-arm.css:310` ("the light arm's darkening", true), and the owner's quoted words at `dock.css:107` and `adaptive-legibility.css:18` (a citation).

### 1.3 · R-18 (iii): the minor's forms-seam title

| line | was | minor v6 |
|---|---|---|
| `tests/components/field/forms-seam.test.ts:91` | "the perimeter rides the 0.48 ink rung and the well is a real inset (fill α fenced on W-FROST)" | "the perimeter rides the `--ink-perimeter` rung and the well is a real inset (fill α fenced on W-FROST)" |

The minor's rung is 0.54 (`color-radius.css:154`), and the token holds the value (P-3). The fence clause stays, because it is true in the minor, unlike in floor v7. The minor does not touch the G-F2 body, so the body still asserts `--control-surface-bg: var(--input-on-glass)` (:109), and `--input-on-glass` is live in the minor (`on-glass-fg.css:41`, `dark-arm.css:318`). The header at :19-30 is true for the same reason. FV7's title is this one less that clause. The string vitest prints is the only behaviour that changes.

### 1.4 · Seen in the rewritten paragraphs and not swept (to the critic, R-18 (iv))

Each of these sits next to a rewritten sentence, and none is on A-3's list:
- `adaptive-legibility.css:63-67`: "the warm-white surface base the bright bucket implies" and "The bucket is the floor; this is the native pick". These follow the rewritten :59-61, which now says that no bucket is above.
- `surfaces-pager.css:35-36`: "under `.dark` the tint arm LIFTS it toward luminous warm-dark". This is the `.dark` clause R-16 #15 kept as dark-scoped, but it still names a tint arm.
- `property-regs.css:124` ("TINT (whole-plate legibility)") and `:153` ("tint-toward-ink under `prefers-contrast: more`"). `tint-minor6.txt` lists the 19 tint lines left in `src/`.
- `forms-seam.test.ts:94-95`: "a composited mass of 0.075 against the ladder's 0.48". The minor's rung is 0.54. H8-1 does not reach this line under its every-word reading (H8 §1.3), and FV7 rewrote the floor's twin of it.

---

## 2 · The declaration (R-18 (ii)) and H7-3

### 2.1 · Fifteen names join `deletes-minor.json` (24 → 39)

Following MS5 §1.2's method, a phrase went in only when **every hit on the minor v5 is an A-3 site** (`DEL` over a candidate list before the edits; the run is recorded in §2.2's plant). Three candidates failed that test and stay out, because they occur in live sentences outside the list: `declarative bucket` (6 hits, among them `GlassDock.vue:24, 115`, `useGlassBackdropLuminance.ts:131` and `glass-fx.css:127`), `no-op floor` (8, among them `useMotionAxis.ts` and `axes.ts`), and `tint seam` (10, the live feedback-tone seam, `G-FEEDBACK-TINT-SEAM`).

| name | A-3 sites it guards |
|---|---|
| **`declarative darken`** (MS5 §2.3) | `adaptive-legibility.css:70` (and R-16 #5, already rewritten) |
| **`darkened plate`** (MS5 §2.3) | `adaptive-legibility.css:33`, `search.css:58` (and R-16 #13, which DEL cannot see through its `/`) |
| `cannot self-darken` | `adaptive-legibility.css:23-24` |
| `own darken` | `:28-29` |
| `darkening moves the plate` | `:33` |
| `darkens the dock plate` | `:60` |
| `darken seam` | `search.css:4` |
| `does not darken` | `search.css:10` |
| `dock self-darkens` | `shell.css:130` |
| `here darkens the plate` | `shell.css:135` |
| `darken-over-light` | `index.css:21`, `property-regs.css:152`, `shell.css:130` |
| `backdrop-luma tint clamp` | `index.css:22` |
| `continuous darken` | `property-regs.css:164` |
| `tint axis is zeroed` | `surface-axis.css:79` |
| `oklab tint seam` | `surfaces-pager.css:29` |

All 15 sites are guarded, so MS5 §2.3's two unguarded rewrites are guarded from now on.

### 2.2 · DEL with the declaration (`static.log`, 13:43:05-13:43:14, load 50.3 → 49.4)

| tree | H7's scope (`src/`, `demo/`; the banked H7-3) | H8-1's roots (`src/`, `demo/`, `tests/`), no patch |
|---|---|---|
| **minor v6 (the fixture)** | **PASS 39**, 0 hits (`del-minor-minor6.log`) | FAIL 2/39: `earned darken`, `earned-darken clamp` at `tests/components/button/Button.test.ts:146` and `tests/gates/feedback-tint-seam.test.ts:11` (§4) |
| minor v5 (the plant) | **FAIL 15/39**, 18 hits in 7 files: exactly the 15 new names, at A-3's sites (`del-minor-minor5.log`) | FAIL 17/39 |
| minor v4 | FAIL 36/39, 48 hits in 15 files | — |

The three names that pass on the minor v4 are R-13's own renames, as in MS5.

### 2.3 · Self-test (`selftest.log`, 13:44:34; `selftest-h8.log`, 13:44:53)

`selftest.mjs --only H7-1,H7-3,DEL,LAW --h7-trees <minor4, minor5, minor6>`: **`SELFTEST PASS: 29 expectations met`** (MS5: 26). H7-3's rows changed in place:

| row | expect | read |
|---|---|---|
| fixture: R-13's register ("earned ink") | PASS | PASS 39 |
| plant: "earned / darken" split over two comment lines | FAIL | FAIL 1/39 |
| plant: an R-16 (iii) sentence ("the plate still darkens-over-light") | FAIL | FAIL 2/39 (it now trips `darken-over-light` as well) |
| **plant (new):** an R-18 sentence, "the declarative darken is the AA floor" | FAIL | FAIL 1/39 |
| plant: the minor v4; ROWS at `adaptive-legibility.css:7`, `overlay-plate.css:272`, `ladder.css:164`, `useGlassBackdropLuminance.ts:45`, `hits=48 files=15` | FAIL, ROWS | FAIL 36/39, rows hold (5) |
| **the minor v5, now a plant**; ROWS at `adaptive-legibility.css:70`, `search.css:58`, `index.css:21`, `surface-axis.css:79`, `surfaces-pager.css:29`, `hits=18 files=7`, `FAIL (15 of 39` | FAIL, ROWS | FAIL 15/39, rows hold (7) |
| **fixture (new): the minor v6** | PASS | PASS 39 |

With the H8 rows that need no floor tree (`--only LAW,DEL,H7-1,H7-3,H8-1,H8-2`): **41 expectations, 0 BAD** (LAW 5, DEL 3, H7-1 12, H7-3 9, H8-1 10, H8-2 2). The floor-tree rows of H8 (`--h8-trees`) are the floor seats' and did not run here. The grown declaration is the minor's and does not enter them.

### 2.4 · The other static reads (`static.log`)

| reading | minor v6 | plant or bite |
|---|---|---|
| R-16 sweep (`grep -i darken` minus MS5's filter) | 46 lines | minor v5: 59. The `diff` prints 13 `<` lines and 0 `>` lines, exactly the A-3 darken sites |
| LAW | **PASS 64** (`law.log`, 13:51:52, load 30.6; re-read after the runner's last edit: FV7's 63 plus `MS6-run.sh`) | the self-test's LAW plants |
| census | `stacked=0 halo=0 blur=0 open=0`, exit 0 | `git archive v10.1.0 src/styles`: exactly `stacked=2 halo=2 blur=5 open=9`, exit 1 |
| HOV | PASS 58 | — |
| LIT | REPORTED `halo=5 near=1 stacked=10 chain=3 open=19 frames-halo=0/0`, the 19 inherited, none added | — |
| ladder | `diff radii-minor6 FV7-records/radii-minor5.txt` prints nothing | (FV7: HEAD exit 1) |
| FL-14 static | `isolation: isolate;` at line 26 of `@utility glass-plate` | — |
| identifiers on R-18's lines | `--glass-level` 3, `--glass-plate-` 2, `--dock-fg-on-aurora` 2, `--ink-perimeter` 1, `--foreground` 1, all inside comments or the title | no declaration moves |

---

## 3 · Byte identity (P7-2.2, thin builds; `same.log`, 13:46:35-13:46:46, load 34.6 → 41.9; `bite.log`, 13:49:07-13:49:11, load 26.9 → 27.9)

The minor v6, then the minor v5, then the minor v6 again were built by `harness/build.mjs --demo` under one label (`same`) in the worktree. Every swap was checked by `cmp`, and each output was moved aside before the next build. `srcDirtyFiles` reads 47 for the v6 and 46 for the v5. The one-file difference is `dock/styles/index.css`, because `forms-seam.test.ts` is not under `src/`. So the swap was real.

| output | minor v5 against minor v6 | minor v6 against minor v6, rebuilt | against pass 7's banked minor v5 (`pass-7/MS5-records/same-m5-*.sha256`) |
|---|---|---|---|
| **specimen dist** (`index.html`, `index-*.js`, `index-Bd1ws62N.css`) | **`diff -rq` exit 0, 0 lines; sha256 lists identical.** CSS **398,432 B, sha256 `e11613c3eeb45cab`** in both, MS5 §3's figure | exit 0 | CSS identical. The JS and `index.html` differ only through the worktree path in the JS's `//#region` comments (`…/p7/minor5/wt/` then, `…/p8/minor6/wt/` now), which renames the hashed chunk that `index.html` cites. **With that path rewritten to pass 7's, the minor v6 specimen JS hashes `b37ddee6…b695bcded`, byte for byte the banked minor v5 `index-DF_nQ09U.js`** |
| **dist-demo** (346 files; CSS 431,116 B) | **`diff -rq` exit 0, 0 lines; sha256 lists identical**, with no normalisation | exit 0 | **identical** (`diff` exit 0) |

**The bite:** HEAD built the same way under the same label differs from the minor v6 in both outputs (`diff -rq` exit 1: dist 5 lines, demo 229 lines; HEAD's specimen CSS 394,891 B, `b09b9e73a61b75b1`). A build that ignored the tree would read identical.

**Why it holds.** Every R-18 hunk is inside a CSS block comment, apart from one test title. The CSS minifier strips comments, the test file is in neither build, and no `.vue` file moves, so no Vue scoped id moves either (`patch.log`: 0 `.vue` files in the delta). **So every paint verdict of the minor v5 carries to the minor v6** (P-3, the thin-build rule): MS5 §4's, MS4's and the pass-7 critic's §5. No browser ran, and no capture was taken.

---

## 4 · H8-1 over the minor's own patch (R-18 (v))

### 4.1 · The reading (`del-H8-minor6.log`; `--declare harness/deletes-minor.json --patch minor-split-v6.patch`, 59 paths, all read)

| tree | result |
|---|---|
| **minor v6** | **FAIL 6 of 47** (39 names + 8 changed tokens), 8 hits, REPORTED 0 |
| minor v5 under the same declaration and patch (the plant) | FAIL 21 of 47, 28 hits in 15 files (`del-H8-minor5-plant.log`) |
| minor v5 under its own v5 declaration and patch (H8 §4.3, reproduced) | FAIL 6 of 32 (`del-H8-minor5-asH8.log`), as H8 recorded |

R-18 (iii) cures `forms-seam.test.ts:91`, one of H8 §4.3's 10 sites. The minor v6's 6 red rows sit at the 8 other sites. **None is on A-3's list.** R-18 (iv) sends them to the pass-8 critic, and R-18 (v) makes H8-1 at 0 the fixture. Both cannot hold, which is H8 §4.3's conflict. This seat follows (iv), which is the stricter text, and rewrites none of them. **The minor v6 is therefore not at H8-1's fixture.** It is red only at sentences the critic owns.

### 4.2 · Each site, read in context (my reading, for the critic; not a ruling and not a rewrite)

| arm | site | sentence | reading | proposed |
|---|---|---|---|---|
| value, `--glass-veil-step` 0.04 | `src/components/sheet/styles.css:197` | "DARK: two veil steps of the dark ink (`--glass-veil-step` 0.04, tokens/dark-arm.css)" | **true.** It names the dark arm, and `dark-arm.css:277` still declares `--glass-veil-step: 0.04` in the minor. The value arm keys on the light `:root` change in `tokens/glass.css` and does not check which arm the sentence cites. **That is an instrument defect class** (§7) | site entry |
| value, `--ink-perimeter` 0.48 | `src/styles/glass/overlay-plate.css:173` | "the `--ink-perimeter` rung, which BK #80 measured at 3.0:1 at 0.48 against the retired shadow's 1.91:1" | **true as history:** it reports what the old value measured, which is R-17 (iii)'s named exemption | site entry |
| value, `--glass-blur-floating-radius` 20px | `src/styles/glass/deep.css:73` | "The predecessor LERPed `--glass-blur-floating-radius` (20px) toward …" | **history.** This is the minor's line for H8 §1.4's proposed floor exemption `deep.css:69`, ruled with it | site entry |
| value, `--ink-perimeter` 0.48 | `DESIGN.md:1805` (a touched file in the minor) | "(`--ink-seam` 0.08, `--ink-edge` 0.16, `--ink-perimeter` 0.48), composed by the reader" | **false in both modes:** the minor's rung is 0.54 | to the critic |
| value, `--glass-blur-quiet-radius` 14px | `src/styles/glass/liquid-fill.css:76` | "(the 14px radius that SCALES by `--glass-level`)" | **false:** the minor's quiet radius is 10px. FV7 §1.2 rewrote the floor's twin of this sentence | to the critic |
| deleted-name (`earned darken`, `earned-darken clamp`) | `tests/components/button/Button.test.ts:146` | "so the tier, the earned-darken clamp and `--glass-level` all survive inside the mix" | **false in light:** R-13's renamed phrase, describing the clamp live. Not an assertion of a deletion | to the critic |
| the same two rows | `tests/gates/feedback-tint-seam.test.ts:11` | "its tier ink, its earned-darken clamp, its `--glass-level`" | **false in light**, as above | to the critic |

**`MS6-proposed-sites.json`** is the landed declaration plus three site entries, for the three true sentences. It is **proposed, not landed**: `harness/deletes-minor.json` carries no site entry. Under it, the minor v6 reads **FAIL 4 of 50** (`del-H8-minor6-proposed-sites.log`), and every one of its 3 site entries exempts a hit, so none is stale. The 4 rows left are the five sentences above that I read as stale (two test comments, `DESIGN.md:1805`, `liquid-fill.css:76`). If the critic rules them false and adds them to the minor's list, a minor v7 is four comment edits and one `DESIGN.md` line, all outside both builds. The same byte proof would then carry the paint again.

---

## 5 · Toolchain and the ratchet (`toolchain.log`; `ratchet.log`)

| step | minor v6 | when, load |
|---|---|---|
| `vue-tsc --noEmit` | exit 0 | 13:49:28, 35.1 |
| `vite build` (library, `cacheDir` in the worktree) | exit 0 | 13:49:38, 50.2 |
| `vue-tsc --noEmit -p tsconfig.test.json`, after the library build (P7-5's order) | exit 0 | 13:49:49, 51.3 |
| `vite build`, the dist-demo config | exit 0 | 13:49:51, 51.3 |
| `vitest run --maxWorkers=2` | **239 files, 2321 passed, 0 failed**, 10 expected-fail, 1 skipped (MS5: 2321) | 13:50:57, 34.8 |
| `vitest run --maxWorkers=2 tests/components/field/forms-seam.test.ts` | 6 passed, under the new G-F2 title | 13:50:59, 36.9 |
| verifier, datum unrebound | `G-BUNDLE-RATCHET … 2921390 > 2919057`, exit 1: **+2,333 B, MS5's figure to the byte**. R-18 adds 0 B to the library | `ratchet.log` |
| verifier, datum rebound in the worktree only | exit 0, `terminal CLEAN`, roster PRESENT **289 = 289**, claims 193, declarations 454; `.bundle-ratchet` restored to HEAD; `.published-roster` diff empty (`v10.1.0..HEAD` and the worktree) | `ratchet.log` |
| library `dist/` files carrying an R-18 sentence | none (`grep` over `dist/`) | `ratchet.log` |

The ratchet's landing debt is unchanged at **+2,333 B** (MS4's +2,326 B plus MS5's 7 B `.d.ts` JSDoc line). No test pins an R-18 sentence. The one test string that changed is the G-F2 title, which passes.

---

## 6 · Shippability for 10.2.0

Every gate row is carried from byte-identical outputs (§3). "Read here" marks this seat's static reads.

| item | reading |
|---|---|
| W-0.1 G1 over paper | **green**, 11/11 in both engines (carried: MS4 §3, Crit §5 fresh) |
| G2, G3, G4 | **green** (carried; HOV 58 read here) |
| G5 | **green**: no name leaves `src` (R-18 is comments only); roster PRESENT 289 = 289 and `terminal CLEAN` with the datum rebound in the worktree, read here; ratchet +2,333 B unrebound, R-18 adding 0 B |
| G6 | **green per R-9** (0.0000); raw 1 of 13 at ΔE 0.0022, W-0.11's dark dock cast, printed beside it (carried) |
| G7 | **green**, with its M-3 half under H7-1 (carried: MS5 §4, Crit §5) |
| W-0.11 G1-G6 | **green** (G1-G4 census and ladder read here; G6 carried from Crit §5) |
| STACK, M-2 light, M-2h, M-3 light | **green** (carried; M-3 light Close ring 3.73 in Chromium) |
| **R-18** (P7-3.3 item 3) | **built**: all 15 A-3 sites and the forms-seam title, with H7-3 PASS 39 on the v6 and FAIL 15/39 on the v5. The tree that lands is the tree measured, for every sentence on R-18's list |
| H8-1 over the minor's own patch | **red, 6 of 47**, at 8 sites outside A-3's list (§4). It is not a W-0.1 gate, but the light-law prose row (P7-3.2) is a landing item, so these sentences have to be ruled before the tree lands |
| tests | 2321 passed, 0 failed; typechecks, library build and dist-demo exit 0 (read here) |

**Reading.** The minor v6 is the measured shape of 10.2.0's veil recut and W-0.11's tokens. Its paint is the minor v5's to the byte, so every gate the registry set for it is green. The light-law prose is clean on A-3's list. It is not clean on the five stale sentences H8-1 finds outside that list.

**W-0.1 and W-0.11 still cannot ship in 10.2.0.** What remains:
1. **The entry gate:** 0 of 2 clean passes (W-0.1 §3, W-0.11 §3.3). Floor v7's open rows are owner-only (FV7 §5: 3, 9, 23, N-1, N-2), which is Reg P7-6.4's fixed point if the critic confirms rows 20 and FL-12. Pass 8 can be clean only if the P7-4 sheet is answered before its critic. The earliest landing stays **the close of pass 9**.
2. **Q-11's content clause:** G1 off paper reads 48 of 66 grey, content included (carried). Only the owner can say whether 10.2.0 may ship grey content off paper. "Not accepted" has no measured minor candidate and fires C″'s re-trigger (c).
3. **The minor's remaining prose:** the critic rules §4.2's sites (three proposed site entries and five stale sentences) and §1.4's sentences seen beside the rewrites. Whatever it rules false becomes a minor v7 of comment edits, guarded by the same declaration method, with the byte proof again.
4. **The landing's own items, unchanged:** R-9's reading enters W-0.1 §5 G6's text (the owner may override); each gate binds to one probe (W-0.1 §5 and W-0.11 §5 name `scripts/probes/band-0/*`, which the tree still lacks); `.bundle-ratchet` rebinds to the measured bytes (**+2,333 B** on v6, as on v5).
5. **10.2.0 is also gated on D2 converging** (O-88).

---

## 7 · Handed on

| to | what |
|---|---|
| the critic (step 5) | (1) §1's count: A-3's table has 15 sites, and the prose says 13. This seat built all 15. (2) Each R-18 rewrite against A-3's ruling, above all the four false in both modes (§1.2). (3) The 15 declared phrases, each checked to hit only A-3 sites on the minor v5 (§2.1), and the three candidates kept out. (4) **H8 §4.3's conflict:** the 8 sites in §4.2, the 3 proposed site entries in `MS6-proposed-sites.json`, and the 5 sentences read as stale. (5) §1.4's sentences seen beside the rewrites. (6) The byte proof, including the path-normalised tie to pass 7's banked JS (§3) |
| the pass-9 instrument list | **H8-1's value arm does not read which arm a sentence cites.** `sheet/styles.css:197` names the dark arm's `--glass-veil-step` 0.04, which the minor does not change, and it reds because the light `:root` value changed. A changed-value hit could require the sentence's cited file or arm to be the one whose declaration changed, or the seat enters a site entry. The fixture for that change would be this line |
| the WebKit seat (step 4) | nothing new: the minor v6 specimen is the minor v5's bytes, so any WebKit cell read on the minor v5 reads the minor v6 |
| the owner | Reg P7-4's sheet, unchanged. No new frame is owed, because the minor v6 moves no pixel |

---

## 8 · Teardown and reproduce

**Torn down** (`phases.log` teardown 13:52:15-13:52:35): the worktree was removed with `git worktree remove --force` and pruned, and `.claude/worktrees/bl/D3/p8/minor6/` and the empty `p8/` were removed. `ls .claude/worktrees/bl/D3/` prints `p3 p5 p6`, `git worktree list` has no `minor6` entry, and `git status --porcelain -- src demo tests` prints nothing. The checkout's tracked writes are the three harness files in place (`deletes-minor.json`, `selftest.mjs`, and the `--h7-trees` line of `HARNESS.md`); its untracked writes are under `pass-8/`. Nothing is left running.

```sh
P8=docs/tranches/BL/design/material/pass-8
git worktree add --detach .claude/worktrees/bl/D3/p8/minor6/wt HEAD; ln -s "$PWD/node_modules" .claude/worktrees/bl/D3/p8/minor6/wt/node_modules
git -C .claude/worktrees/bl/D3/p8/minor6/wt apply docs/tranches/BL/design/material/pass-7/minor-split-v5.patch
# trees/minor5 and trees/minor4 are cut from the worktree before `edit` (src demo tests DESIGN.md), as this seat did
~/.claude/guard/guarded --light --timeout 15 -- bash $P8/MS6-run.sh edit      # or apply $P8/minor-split-v6.patch to HEAD
~/.claude/guard/guarded --light --timeout 10 -- bash $P8/MS6-run.sh paths
~/.claude/guard/guarded --light --timeout 10 -- bash $P8/MS6-run.sh check
~/.claude/guard/guarded --light --timeout 10 -- bash $P8/MS6-run.sh trees
~/.claude/guard/guarded --light --timeout 20 -- bash $P8/MS6-run.sh static
~/.claude/guard/guarded --light --timeout 20 -- bash $P8/MS6-run.sh selftest
~/.claude/guard/guarded --light --timeout 20 -- bash $P8/MS6-run.sh selftest-h8
~/.claude/guard/guarded --timeout 60 -- bash $P8/MS6-run.sh same
~/.claude/guard/guarded --timeout 30 -- bash $P8/MS6-run.sh bite
~/.claude/guard/guarded --timeout 60 -- bash $P8/MS6-run.sh toolchain
~/.claude/guard/guarded --light --timeout 10 -- bash $P8/MS6-run.sh ratchet
~/.claude/guard/guarded --light --timeout 10 -- bash $P8/MS6-run.sh law
~/.claude/guard/guarded --light --timeout 10 -- bash $P8/MS6-run.sh teardown
```
