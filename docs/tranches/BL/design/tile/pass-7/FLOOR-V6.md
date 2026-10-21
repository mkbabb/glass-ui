# D4 · pass 7 · FLOOR v6: one writer sheet-wide, the strip sentence made true, the flush plate on the option only, Q-5 (b) as ruled

| field | value |
|---|---|
| seat | D4 pass 7, FLOOR-V6 seat. It builds FV6-1..FV6-5 once on `../pass-6/floor-v5.patch` (`de018966`), rebases the one ruled route (D′) onto it, and measures HEAD + floor v6 and D′ on H7's cells and on H6/H5's FACT, CANON, ATTACK, CORNER, T-2, T-3 and REPORT, plus the battery, in both engines. It adds no paint value, no primitive and no row |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `8799da564`. `git diff --stat 7d55398ce HEAD -- src package.json MIGRATION.md tests demo vite.config.ts` is empty, so the library is the one H7 read. The worktree `.claude/worktrees/bl/D4/p7/floor6/wt` was detached at `8799da564` |
| owner | **INBOUND O-103 (RULED, via the delegate accepted in O-102b) overrides the computed task's defaults.** Q-13 **D′**, so one route is rebased and F's pass-7 directory stays struck (there is no `pass-7/D4-F.patch`). Q-10 (b), Q-2 (b) flush, Q-3 (a), O-1 (a), Q-15 (a): each matches the default already built, so each is recorded as **RULED (O-103)**, not as DEFAULT. **Q-5 is ruled "(b) only … not (d)"**, which differs from the built default (b)+(d), so floor v6 removes (d) (§1, FV6-5). The safaridriver checkbox is not granted. No question is open on this floor, so nothing below is labelled DEFAULT |
| harness | **H7 `6d6184295110`, 43 files**, unedited. Every witness, UNIT and SHEET line prints it |
| engines | Chromium 149.0.7827.55 (Playwright's default headless shell; no `channel`, no GPU args) and **Playwright WebKit 26.5**, headless, from `glass-ui/node_modules/playwright`. Every WebKit number here is Playwright WebKit. Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)**: not granted (O-103), so E-4 reads the Playwright WebKit run of record |
| machine | Every build, typecheck, unit run, probe and browser run went through `~/.claude/guard/guarded --rss-gb 8`. Browser runs never took `--light`; SHEET, the typechecks and the plant SHEET reads did. Both Playwright WebKit holds took `--exclusive webkit`: hold A waited **18 min** (21:35:54 → 21:54:07) and ran to 22:07:40; hold B waited **2 min** (22:07:40 → 22:09:21) and ran to 22:24:11. Neither wait was cancelled. One heavy run at a time. The 1-min load sits on every log's first and last line and beside every stage in `floor-v6/logs/chain.log`. It ran 12.3-38.98 in run 2 |
| records | `floor-v6.patch` and `D4-Dp.patch` (this directory). In `floor-v6/`: `run-fv6.sh` (every stage), `chain.sh` (run 2, the order run), `fv5-to-fv6.diff` (the five files floor v6 changes over floor v5) and `logs/` (every log cited). `logs/run1/` holds run 1 (§2.1). `chain2.sh` is run 1's queued second half; it was stopped before its first stage and ran nothing. Patches were written with pass 6's `floor-v5/mkpatch.py` (no git write). The route dir is H7's `H7/routes/D4-Dp` (its `route.json` names the `tileWriter`) |
| fences | No tracked source edited in the checkout. The only git writes were `git worktree add` and `git worktree remove --force` of `floor6/wt` (removed after the chain's close, 22:31:51). `git apply` touched only that worktree. The only checkout writes are `pass-7/floor-v6.patch`, `pass-7/D4-Dp.patch`, `pass-7/FLOOR-V6.md` and `pass-7/floor-v6/`. **Refused, reported:** the `rm -rf` of `.claude/worktrees/bl/D4/p7/floor6/` (15 MB of scratch: `out/`, snapshots) was refused by the permission system, as H7's was; it is untracked scratch for the orchestrator or owner to delete, and nothing here depends on it. A `rm`/`mv` tidy of `floor-v6/chain2.sh` and `logs/patch.log` was also refused, so both stay as written. **Slips, reported:** (1) two SHEET reads (`sheet.mjs --fill` and one `--wt` read, engine-free, a few hundred ms each) ran outside `guarded` before the driver existed; (2) one `ls ~/.claude/guard/runs | wc -l` read the guard's run directory against the `~/.claude` fence; (3) one grep output spilled to a tool-result file under `~/.claude/projects/…`, which this seat did not open. No measurement rests on any of them |

Short citations as in REGISTRY §P6: `FV5` (`../pass-6/FLOOR-V5.md`), `H7` (`H7.md`).

---

## 0 · In brief

1. **The patch.** Floor v6 is floor v5 plus a delta in five files: 39 files, **+1452 / −272**, sha1 **`09e742439213`** (floor v5: 39 files, +1401 / −272, `de018966`). `floor-v6/fv5-to-fv6.diff` holds the delta: 90 lines added, 39 removed. `git apply --check` is clean on HEAD (`logs/check.log`).
2. **D′ rebased.** `D4-Dp.patch` is 8 files, +306 / −25, sha1 **`714cd3c0dbd4`**. Its `src` and test blocks carry pass 6's added and removed lines exactly (7 of 8 files, line for line). Only MIGRATION changed: O-2's clause, the refill and the detector trued under Q-5 (§1.6). `git apply --check` is clean on HEAD + floor v6.
3. **Every non-owner cell H7 left open on D′ now passes in both engines and both flavours.** FACT reads **80/80** `src` and `src-dev` in Chromium and in Playwright WebKit. H7 read 76/78 on floor v5 + D′. SHEET reads 2/2 on D′ and on the floor alone.
   - H7-2 `strip-write` now gates and passes. The floor says "a strip's tabs are pills unless a rule of yours writes the fact on the strip", and the consumer's write lands: tab on 2 rows, strip 54.69 against 40.94.
   - H7-3 `mobile-in-tile` passes: root 40.00 against 40.00, the reference trigger's plate, light and dark.
   - H7-4 `wrap` passes.
4. **FV6-3 is H7's measured cure, not the backlog's literal spelling.** H7-3 measured the fact reaching the mobile root. But the task's spelling (name the mobile root in the reset and the limit) is H7's cure v1, and H7 §4 measured it reflowing the trigger's label and chevron. Floor v6 instead names the option in the flush plate rule (H7's v2), so nothing is reset. The probe reads the trigger's layout as the reference's in both engines.
   - **The first spelling, run 1, lost the hover.** `.toggle-group__item.control-surface[data-state]` raised the rule to (0,3,0), above the hover. T-6's migrated hover-light cells failed 9 of 33, ΔE 0.0000-0.0002 against the 0.02 bar (`logs/run1/battery-dp-chromium.log`).
   - **Floor v6 writes `.control-surface[data-state]:where(.toggle-group__item)`**, which keeps floor v5's specificity: T-6 migrated **33/33** in both engines.
5. **FV6-5: Q-5 (b) only, as ruled.** The development names now gate on `import.meta.env.DEV`, the library's own convention (Button, Slider, MusicStaff, timeline). The library build drops them, so what a consumer installs refuses by structure and names nothing, in a consumer's development build too.
   - Measured: W-E on `dist-dev` now reads like `dist`, **1/6**, 3 "no refusal" cells in both engines. Under (d), §P3 read the names on `dist-dev`, 4/4.
   - T-2 on `dist` and `dist-dev` is **52/52**: the structural refusal holds.
   - MIGRATION's two consumer development-build detectors are removed, and the pill bullet says the installed library logs nothing.
6. **Nothing else moved.** Measured against `FV5` §3 and H7, cell for cell, in both engines:
   - CANON per plant 4 · 3 · 3 · 3 · 2 · 3 · 3 · 3 · 4 · 4;
   - ATTACK 5/5; CORNER 5/5; T-2 52/52;
   - T-3 migrated 40/43 (C1, Q-10's);
   - REPORT `name-ink` PASS (2.66:1 / 1.56:1) and `kick-spring` PASS (ζ ≈ 0.50);
   - T-1 15/15 · 18/18; T-4 24/24; T-5 38/38; T-6 33/33; T-7 24/24.
7. **Build, typecheck, unit.** Each state ran with its own built dist. vue-tsc reads **0 · 0** on HEAD, floor v6 and D′. The suite: **HEAD 2,329 ran**, floor v6 **2,351**, D′ **2,354**. On each, only HEAD's 3 `gate:boot-graph — build arm` cases fail (no `dist-demo` in a worktree). The two FV6 cases fail under each of 4 plants (§3).

**Real Safari:** UNMEASURED (owner's safaridriver checkbox), every cell. Floor v6 adds nothing to Safari's list (`:where()` is long baseline).

---

## 1 · The patch, row by row

Line numbers are in HEAD + floor v6. The delta is `floor-v6/fv5-to-fv6.diff`.

### FV6-1 (B-1 → R-10) · the sheet-wide fact-writer unit, a floor test

`tests/components/ui/toggle-group/ToggleGroup.test.ts`, a new `describe("floor v6 — one writer of the tile fact, sheet-wide")`, case 1. It reads every `.css` file and `.vue` `<style>` block under `src` with postcss, and every other spelling of a write in `.vue` and `.ts` source (a style binding, a `setProperty`, a utility `[--selection-tile:flush]`). The spellings are SHEET's (`harness/sheet.mjs` `tileWriters`).

The law it asserts:
- no `flush` or `plated` write outside `src/components/toggle-group/styles.css` (the lane sheet);
- at most one in it.

It is route-neutral, so it passes on the floor alone (0 writers) and on D′ (1). D′'s own lane unit already names that one rule exactly (`.toggle-group[data-shape="cell"] { --selection-tile: flush }`, unchanged in `D4-Dp.patch`). The two together say the route's rule is the only writer in `src`. That is B-1's cure. The paint half is H7-1's FACT `foreign-ancestor`.

### FV6-2 (O-1 (a), RULED O-103 → R-2/FV-2) · the strip sentence says what is true

`src/styles/utilities/base.css:56-57`, in the tile fact's registration comment:

> … and a strip's tabs are pills unless a rule of yours writes the fact on the strip.

It replaces "a strip's tabs are always pills". The comment is reflowed under 88 columns, with no other word changed. H7-2's `stripPromise` reads the `unless … on the strip` form and gates `strip-write`. The cell passes in both engines and both flavours (§3).

### FV6-3 (B-3 → R-2/FV-2) · the flush plate rule names the option

**The condition the task set.** Name the mobile root in the reset and the `@scope` limit if and only if H7-3 measures the fact reaching it. **H7-3 measured it reaching the root** (`H7` §3: the trigger's fact `flush`).

**Why that spelling is not built.** It is H7's cure v1, and H7 §4 measured it breaking the trigger:
- the pill one-row law runs inside the trigger (`base.css` `.pill-row *` `display: inline !important`);
- the label moves from x 13.00 to 23.07, and the chevron from 51.00 to 40.92, both `inline`.

A spelling that passes the cell while the trigger reflows fails E-2 (the primary works in paint). The defect behind H7-3 is the plate rule's reach (H7-b), not the fact's.

**What floor v6 writes.** `src/styles/glass/control-surfaces.css:99-104`:

```css
@container style(--selection-tile: flush) {
    .control-surface[data-state]:where(.toggle-group__item) {
```

The comment above it gains two sentences:
- a control inside an option (a Select, a switch, a responsive strip's trigger) inherits the fact and carries `[data-state]` too, and keeps its own plate;
- the option is named in a `:where()`, so the rule stays below the hover's specificity.

The comment also drops "the default until the owner rules": Q-2 (b) is ruled (O-103). Nothing is reset, and neither the limit nor `segmented.css` changes.

**Read (§3).**
- FACT `mobile-in-tile` passes: root 40.00 against 40.00 and the reference trigger's plate, light and dark, both engines, `src` and `src-dev`.
- The trigger's fact is still `flush`, printed and not judged.
- The probe (`H7/probes/b3-mobile.mjs`) reads the trigger's children as the reference's in both engines: label `@13.00,9.30 17.86×21.41` (`flow-root` in Chromium, `-webkit-box` in Playwright WebKit) and chevron `svg block @51.00,12.00`.

**The witness pair.** FV6-1's case 2 asserts the flush rule's one selector. Plant `flush-rule-wide` (the selector back to `.control-surface[data-state]`) fails it (§3). FACT's `atk-stm-nolimit` plant is H7's paint-side fail.

### FV6-4 (B-4 → E-3) · the `--selection-tile` bullet refilled

`MIGRATION.md:78-98` on the floor alone and `:94-116` on D′, each refilled at 88 columns. Each fill is `sheet.mjs --fill`'s, prose only, with no word changed. SHEET `wrap` passes on both.

### FV6-5 · the owner sheet, as ruled (O-103)

| question | ruling | on this floor |
|---|---|---|
| Q-13 | D′ (RULED) | one route rebased; F's pass-7 directory stays struck (no `pass-7/D4-F.patch`) |
| Q-10 | (b) tiles only (RULED) | unchanged from floor v5 (C1 stays T-3's three red cells) |
| Q-2 | (b) flush, with `plated` one value away (RULED) | unchanged; the comment no longer calls it a default |
| Q-3 | (a) the floor register (RULED) | unchanged; no mark (REPORT `mark` UNMEASURED, as Q-3 (a) builds none) |
| Q-15 | (a) R-1's legibility half struck (RULED) | scoring only; nothing in the floor |
| **Q-5** | **(b) only, not (d) (RULED)** | **changed**: see below |
| O-1 | (a) (RULED) | FV6-2 |

**Q-5's change.** It touches `src/components/toggle-group/ToggleGroupItem.vue:107-115` and MIGRATION.
- **The gate.** It was `process.env.NODE_ENV !== "production"`, which floor v5's comment called "Q-5 (d), without a `development` export condition". It is now `import.meta.env.DEV`, as every development check in the library spells it. The comment says the library build drops the branch, so what a consumer installs refuses by structure alone and names nothing.
- **MIGRATION, the `ToggleGroupItem` role section.** The "in a development build" detector is deleted. The `rg` detector stays.
- **MIGRATION, the pill bullet.** "In a development build of your app … logs …; These checks read `process.env.NODE_ENV` …" becomes "The row refuses a second row by layout alone, and the library you install logs nothing about it, in a development build of your app or a production one."

### 1.6 · D′ on floor v6

`D4-Dp.patch` (`714cd3c0`):
- **unchanged:** `ToggleGroup.vue`, `index.ts`, `shape.ts`, `styles.css`, `src/index.ts`, `ToggleGroup.test.ts` and `radius-role-canon.test.ts` carry pass 6's lines exactly.
- **MIGRATION:**
  - D′'s sentences on the tile bullet, refilled with it.
  - **O-2's clause** on the floor's nesting sentence: "A `ToggleGroup` nested inside a tile is pills again unless it declares `shape="cell"` (every group resets the value)".
  - D′'s `shape="cell"` section loses its development-build detector, which Q-5 (b) makes untrue for a consumer, and keeps `rg 'ToggleGroupItem[^>]*(flex-col|rounded-)'`.
- **Not changed:** D′'s own sheet comment in `toggle-group/styles.css` ("a group nested inside stays pills (every group resets the fact)") is a second statement of the nesting rule in `src`, and it leaves out the `shape="cell"` case. The task fixes `src` to O-2's one clause, so this seat reports it for the critic and does not edit it.

The rebase: pass 6's `D4-Dp.patch` was applied with `--exclude=MIGRATION.md` (clean), MIGRATION was rebased by hand, and the patch was written by `mkpatch.py since` against a snapshot of the floor-v6 tree.

---

## 2 · How it ran

### 2.1 · Run 1, stopped

Run 1 (20:07-20:56, `logs/run1/`) used FV6-3's first spelling. Its Chromium battery read T-6 migrated **24/33**: the 9 `hover light channel` cells (preset, specimen and f1-migrated; plain, PRM and PRT) read mean ΔE(OKLab) 0.0000-0.0002 against the 0.02 bar.

The cause is specificity: `.toggle-group__item.control-surface[data-state]` is (0,3,0) and comes after the hover rule (0,3,0) in the same layer, so the flush plate's `transparent` won over the hover's plate. Floor v5's selector was (0,2,0).

The seat stopped run 1 at 20:56. Hold A was still queued for the WebKit lock and never admitted, and hold B was queued for 9 s. It was stopped because the subject was defective, not for the wait. The seat respelled the rule in a `:where()`, rewrote the floor patch (`09e74243`) and re-ran everything as run 2.

Two run-1 artefacts to read past:
- Run 1's `chain.log` prints `exit 0` for every stage, because the date substitution reset `$?`. Each stage log's own last line holds the real code. Run 2's `chain.sh` prints the real `rc`.
- Run 1's `tsc fv6` exit 2 (two TS2307 on `@mkbabb/glass-ui/fourier-math`) ran before any library build, as `FV5` §2 recorded. Run 2 builds the library first.

### 2.2 · Run 2

`floor-v6/chain.sh`, 20:57:09 → 22:31:51, in this order:
1. `check`;
2. the floor alone: SHEET, libbuild, tsc, unit, builds, the B-1 plant;
3. D′: the same, plus the unit plants and the `dist` / `dist-dev` builds;
4. Chromium reads on both, the probe and the battery;
5. hold A (Playwright WebKit reads on both, and the probe);
6. hold B (the Playwright WebKit battery);
7. HEAD's own libbuild, tsc and unit as the baseline.

The final `state dp` stage exits 3 by design: it expects the floor in place, and the tree was at HEAD after the baseline. The worktree was then removed.

---

## 3 · The readings

Builds:
- `fv6-*`: HEAD + floor v6, no writer;
- `dp-*`: + D′, with the route dir `H7/routes/D4-Dp`;
- the attack route at `src` and `src-dev`;
- `<x>-plant-atk-src`: B-1's foreign writer appended to `base.css`, restored after, diff checked equal.

Logs: Chromium `reads-*-chromium.log`, `battery-dp-chromium.log`, `probe-b3-dp-chromium.log`; Playwright WebKit `reads-*-webkit.log`, `battery-dp-webkit.log`, `probe-b3-dp-webkit.log` (holds A and B). Cells read Chromium · Playwright WebKit.

| witness | HEAD + floor v6 (no writer) | D′ on floor v6 | D′ on floor v5 (`H7` §3) |
|---|---|---|---|
| SHEET `writers` (H7-1) | PASS, 0 writes | **PASS**, the route's rule 1× | PASS |
| SHEET `wrap` (H7-4) | **PASS** `MIGRATION.md:78-98` | **PASS** `:94-116` | FAIL (line 113 at 105 cols) |
| SHEET on the B-1 plant | FAIL: 1 OTHER `base.css «.card > .toggle-group» flush` | FAIL: the route's rule + the same OTHER | the same |
| **FACT** `src` · `src-dev` | 55/80 · 55/80 (both engines) | **80/80 · 80/80** (both engines) | 76/78 |
| FACT on the B-1 plant | 51/80 · 51/80 | **76/80 · 76/80**: only `foreign-ancestor` ×4 fails (71.25×54.69, 69.31×54.69, 16 px, column, 2 rows) | 72/78 |
| H7-1 `foreign-ancestor` ×4 | PASS: `ca` 89.63×40.00, `cb` 106.17×40.00, 20 px (h/2) | PASS, the same | PASS |
| H7-2 `strip-write` ×4 (gating now) | **PASS**: the sentence is true; the write lands, tab 113.00×46.69 on 2 rows, strip 54.69 against 40.94 | **PASS**, the same | info-fail (floor v5's sentence) |
| H7-3 `mobile-in-tile` ×4 | FAIL: `te` sits in a pill option (no writer); root 44.56 against 40.00; `src-dev` also names `te` a second row | **PASS**: root 40.00 against 40.00, one row, nothing cut, the reference's plate; trigger fact `flush` (printed) | FAIL (plate stripped) |
| probe: the trigger's children (info) | — | **the same layout** as the reference, light and dark, both engines | the same (unreached: plate only) |
| **CANON** clean · a · s · h · layer · foreign · unlayered · cq · lowlayer · cqoff | — | **4 · 3 · 3 · 3 · 2 · 3 · 3 · 3 · 4 · 4 /4**, both engines | the same (`FV5` §3.2) |
| **ATTACK** `src-dev` | 5/5 · 5/5 | **5/5 · 5/5** | 5/5 |
| **CORNER** | 1/5 · 1/5 (no tile) | **5/5 · 5/5** | 5/5 |
| **T-2** `src` | 52/52 · 52/52 | **52/52 · 52/52** | 52/52 |
| **T-3** migrated | — | **40/43 · 40/43** (C1 ×3, 0.00 px² against 224, Q-10's) | 40/43 |
| T-3 library · unmigrated (info) | 2/39; 12/48 · 9/48 | 2/39; 12/48 · 9/48 | the same |
| **REPORT** `name-ink` | — | **PASS** light and dark: 2.66:1, 1.56:1, both engines | PASS |
| REPORT `kick-spring` (H7-5) | — | **PASS**: `toggle-group-commit` 450 ms `linear(…)`; peak +0.0277 at 74.20 ms, dip −0.0045 at 301.90 ms, ζ ≈ 0.50 (Chromium); +0.0275 at 83.00 ms, −0.0045 at 307.00 ms, ζ ≈ 0.50 (Playwright WebKit) | PASS |
| REPORT kick (B-5, reported) | — | FAIL **0.16 px** (Chromium, 106 frames) · **0.13 px** (Playwright WebKit, 79 frames), want ≤ 0.05 | 0.16 · 0.13 |
| REPORT `mark` | — | UNMEASURED (no mark; Q-3 (a)) | the same |

**Battery, migrated arm, on `dp-src`** (`battery-dp-*.log`; Chromium at load 14.83 → 12.58, Playwright WebKit in hold B at 22.31 → 20.64):

| witness | Chromium · Playwright WebKit | `FV5` §3.4 | run 1 (first spelling, Chromium) |
|---|---|---|---|
| T-1 | 15/15 · 18/18 | 15/15 · 18/18 | 15/15 |
| T-4 | 24/24 · 24/24 | 24/24 | 24/24 |
| T-5 | 38/38 · 38/38 | 38/38 | 38/38 |
| T-6 | **33/33 · 33/33** | 33/33 | **24/33** (hover-light ×9) |
| T-7 | 24/24 · 24/24 | 24/24 | 24/24 |
| library arm (info): W-B, W-E, T-1, T-4, T-5, T-6 | 9/25, 1/3, 5/27, 12/30, 49/78, 31/55, both engines | the same | the same |

**Q-5 on what a consumer installs** (`dp-dist`, `dp-dist-dev`, built from the worktree's own library build; both engines):

| | W-E | the refusal cells | T-2 |
|---|---|---|---|
| `dist` | 1/6 | preset, specimen, strip: no refusal (no console error, no throw) | **52/52** |
| `dist-dev` | 1/6 | the same: the names no longer reach a consumer's development build | **52/52** |

That is Q-5 (b) only, as ruled. The refusal is structural (T-2 52/52 on both), and the names run only in the library's own development build (`src-dev`: ATTACK 5/5 and FACT `src-dev` 80/80 read them).

**Units** (`unit-*.log`, H6's `unit.mjs`, `vitest.wt.config.ts` `f70c44e4`, maxWorkers 2):

| state | library build | vue-tsc app · test | suite |
|---|---|---|---|
| HEAD `8799da564` | exit 0 (`libbuild-head.log`) | 0 · 0 | **2,329 ran, 3 failed**: `gate:boot-graph — build arm` ×3 (no `dist-demo` in a worktree) |
| + floor v6 | exit 0 | **0 · 0** | **2,351 ran, the same 3** |
| + D′ | exit 0 | **0 · 0** | **2,354 ran, the same 3** |

**Unit plants** on FV6-1's two cases, on D′ (`unit-plant-*.log`; restore checked by the driver):

| plant | case 1 (one writer) | case 2 (flush rule) |
|---|---|---|
| clean | PASS | PASS |
| `foreign-writer`: B-1's `.card > .toggle-group { flush }` in `base.css` | **FAIL** | PASS |
| `markup-writer`: `:style="{ '--selection-tile': 'plated' }"` on the group | **FAIL** | PASS |
| `second-lane-writer`: a second `plated` rule in the lane sheet | **FAIL** | PASS |
| `flush-rule-wide`: the flush rule back to `.control-surface[data-state]` | PASS | **FAIL** |

---

## 4 · The rows each cell decides on D′ (the 40-row list, unchanged)

No row is added, struck or renamed. H7's cells fold as REGISTRY §P6-4 placed them.
- **R-10:** met and pinned. One writer in `src`: SHEET, FV6-1 case 1, and FACT `foreign-ancestor` each fail the critics' writer.
- **R-2 / FV-2:** H7-2 `strip-write` and H7-3 `mobile-in-tile` both pass, gating, light and dark, both engines, both flavours. H7 had one cell open here.
- **E-3:** H7-4 `wrap` passes. MIGRATION's development-build detectors are removed where Q-5 (b) made them untrue.
- **B-5:** reported, floor-owned. Kick 0.16 · 0.13 px, the spring named at ζ ≈ 0.50.
- **Owner-gated rows.** Each now sits on a RULED input (O-103) for the critic to score:
  - T-3 and E-2 (Q-10 (b): C1 0.00 px²);
  - R-1 (Q-5 (b) with Q-15 (a): legibility struck; the fault is refused structurally on `dist`);
  - R-8 (Q-5 (b): structural refusal on `dist`, T-2 52/52; names in the library's development build only);
  - G (Q-2 (b), Q-3 (a));
  - E-4 (checkbox not granted; the Playwright WebKit run of record).

  This seat scores none of them.

**For the critic:**
- read SHEET on the route's worktree with `--route ../pass-7/H7/routes/D4-Dp`;
- read FACT on the attack build in both flavours;
- read the battery's T-6 migrated hover-light cells: they are the cells that caught run 1;
- weigh D′'s own comment in `toggle-group/styles.css` (§1.6);
- weigh R-8 against the `dist-dev` row above, which is now silent by ruling.

**Real Safari:** UNMEASURED (owner's safaridriver checkbox), every cell; not granted (O-103).
