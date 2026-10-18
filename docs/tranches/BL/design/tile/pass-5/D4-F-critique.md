# D4 · pass 5 · D4-F · critique: the anatomy declares the tile, on floor v4 and H5

| field | value |
|---|---|
| seat | D4-F adversarial critic, pass 5 (REGISTRY §P4-6.2 item 3). Authored no D4 seat. Re-runs every number on HEAD + floor v4 + `D4-F.patch`: the battery T-1..T-8, the shared attack set, H5's FACT matrix and CANON on **both** routes, REPORT, the route's units with every plant, and the carried probes. Attacks the route and floor v4. Scores on the 40-row checklist only (§P2-6.3, unchanged by §P4-6.3). Adds no row, picks no route |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | HEAD `bda6dd83c`. `git diff --stat a11a6ed6a HEAD -- src tests MIGRATION.md package.json demo vite.config.ts docs/tranches/BL/design/tile/harness` is empty, so this is the source the floor seat and the D′ critic measured. Detached worktree `.claude/worktrees/bl/D4/p5/D4-F-crit/wt` (`node_modules` symlinked; the checkout has no `tests-visual/node_modules`). `floor-v4.patch` sha1 `2d56cc5a`, then `D4-F.patch` `c7072d6e` (`logs/state-f.log`: `git diff HEAD` **`65ab8c1c21f7`**, 23 dirty `src` paths, the hash the D′ critic recorded for F). D′'s state (`D4-Dp.patch` `b09d15e4`, `bf26010b6ac5`, 26 paths) was applied only to build D′'s route and attack builds, then reverted (`logs/state-dp.log`) |
| owner | no ruling on Q-2, Q-3, Q-5, Q-10, Q-13 or Q-15 in `audit/INBOUND.md` or `FORMATION-PROGRESS.md` (read 2026-10-18 01:00; the last D4 line is the D′ critic's bank). Both routes' H5 cells were read, and every owner row is scored at its P4-5 default |
| harness | H5 **`bfe1b6beddb0`** (41 files) on every witness and unit line. No harness file edited |
| engines | Chromium 149.0.7827.55 (Playwright's default headless shell) and **Playwright WebKit 26.5**, headless, from `glass-ui/node_modules/playwright`, no GPU launch args. Every WebKit number here is Playwright WebKit. Real Safari: **UNMEASURED (owner's safaridriver checkbox)** (`logs/src-T-8-both.log`: "You must enable 'Allow remote automation'") |
| machine | every stage through `~/.claude/guard/guarded --rss-gb 8`. Browser runs never took `--light`; only the typecheck, the unit runs, the bundle read and XSCRIPT did. Every run that could start Playwright WebKit sat inside one of two `--exclusive webkit` holds (`logs/webkit-a.log`, `logs/webkit-b.log`); both were admitted with **0 min** of lock wait. One heavy run at a time. 1-min load at witness starts: 10.1-42.5; one spike to 81.54 at the end of Chromium `selector-forms`, whose tally equals pass 4's. No janky cell, no stall, no NOT-REPRODUCED or REPRODUCED line, no re-run needed. Playwright WebKit retired its browser at H3-1's 60-navigation cap in T-1, T-3, T-5 and T-6, as designed |
| records | under `pass-5/D4-F-crit/`: `run-crit.sh` (every stage), `chain.sh` (the order), `probes/crit-f5.mjs` and `probes/route-crit5/` (this seat's probe and compositions), `logs/` (every log cited; wall clock and 1/5/15-min load on each log's first and last line; `chain.log` has every stage's start and exit), `run-json.tgz` (the 163 run JSONs every number here quotes). Builds stay in scratch under `.claude/worktrees/bl/D4/p5/D4-F-crit/out/` |
| fences | no tracked source edited in the checkout. `git apply` touched only the seat worktree. The only git writes are `git worktree add` / `remove` of `D4-F-crit/wt` (removed; `git worktree list` shows no `D4/p5`). The only checkout writes are this file and `pass-5/D4-F-crit/`. The D′ critic's probes (`../D4-Dp-crit/probes/`) were run in place, read-only |

Citations: `Fc4` is `../pass-4/D4-F-critique.md`; `FV4` is `FLOOR-V4.md`; `H5` is `H5.md`; `D′c5` is `D4-Dp-critique.md`; `crit/` is `pass-5/D4-F-crit/`.

---

## 0 · In brief

1. **Every pass-5 number reproduced, in both engines.** Migrated arm, Chromium · Playwright WebKit: T-1 15/15 · 18/18, T-2 52/52 · 52/52 (`dist` the same), T-3 40/43 · 40/43, T-4 24/24 · 24/24, T-5 38/38 · 38/38 (`dist` the same), T-6 33/33 · 33/33, T-7 24/24 · 24/24, T-8 27/27 (one run). H5's cells on **F**: FACT matrix **68/68** on `src`, `src-dev` and `dist`; CANON clean **4/4**, each of the nine plants reading exactly as in `H5` §3.1 (plant H 2/4 on F's spelling); ATTACK `src-dev` **5/5** with X-5 named before ready; CORNER 5/5 on `src` and `dist`. All in both engines. On **D′**: FACT 68/68 on `src` and `src-dev`, CANON 4/4 (H 3/4), ATTACK 5/5, CORNER 5/5, both engines. Units: clean 62/62. Every route plant fails its case. The suite runs 2,351 cases and fails only HEAD's 3 `boot-graph` cases. Bundle 2,938,684 B.
2. **R-2, E-3 and R-7, pass 4's three non-owner rows on F, are closed on my own measurement.**
   - **R-2 and E-3:** FACT `pill-in-option` and `tile-in-option` pass. So do `nested-group` ×3 and `nested-option` ×6, in both flavours and both engines. `Fc4`'s own N3 cell (`crit-f.mjs`) now reads a pill: 24/24 on `src`, `src-dev` and `dist` in both engines.
   - **F's nesting claims, measured:** "a tile group nested inside a pill group leaves the outer group pills and the other way round" now holds. "A group three levels deep is pills" holds by this seat's `L3` cell: level 1 and 2 tiles, level 3 a pill, 8/8 per flavour per engine.
   - **R-7:** CANON is the one instrument (M-14), and it fails A, S, H, `layer`, `foreign`, `unlayered` and `cq` on F in both engines, with both controls passing. Plant H still passes F's own units (62/62), but since M-14 those are corroboration only (P-3).
3. **X-2 is open, on the same cell and the same cause as on D′.** REPORT `name-ink` fails 1.00:1 in light and dark, both engines. Re-traced on F's build (`crit-name-trace`, Chromium): the one rule holding the selected K2 name is the harness's own unlayered `.tile-name { color: var(--muted-foreground) }`. The selected item's colour is the selection ink (rgb(28, 25, 23) light, rgb(233, 230, 226) dark). With that consumer colour alone lifted, the name takes it: 2.66:1 light, 1.56:1 dark, both engines (`crit-name-lift`). That is `D′c5` §2's cure, and it is route-neutral.
4. **Score: 33 / 40 (82.5 %).** Six owner rows stay open at their defaults: T-3 and E-2 (Q-10), R-1 (Q-5, Q-15), R-8 (Q-5), G (Q-2, Q-3), E-4 (the checkbox). The seventh is **X-2**, which is not the owner's. Its H5 cell is REPORT `name-ink`. F rises from 31 to 33: R-2, E-3 and R-7 closed, and X-2 opened. X-2 moved because H5-5 folded the name into X-2, not because F's paint changed. **Both routes now read 33/40 on the same seven open rows. Not at the owner-gated fixed point; one row short, with a harness and MIGRATION cure.**
5. **Verdict: ADVANCE.** Four classes no row covers go to the next pass (§4). The sharpest is new: **a SegmentedTabs inside a tile option loses the floor's one-row law.** Its tab stacks two rows, and the strip grows from 40.94 to 54.69 px. It is silent on `src`, in both engines, with or without the pin. SegmentedTabs resets no fact, so it inherits the outer option's `flush` (§3.1). The other three:
   - FV4-2's inline `!important` exception splits F's tile too (66.58 → 75.70 px);
   - F's mark room gate has no unit (a plant that deletes it passes 62/62);
   - the mark covers K2's curve end point on every specimen tile.

---

## 1 · Re-run

The order is in `logs/chain.log`:
- phase 1 (01:08 → 01:21): state, library build, typecheck, scene builds, the two measurement variants, the suite, the plants, the bundle, XSCRIPT, and D′'s builds on a state switch and back;
- the Chromium battery (01:22 → 01:40);
- the Chromium reads (01:40 → 02:01);
- WebKit hold A (02:01 → 02:22);
- hold B (02:22 → 02:45).

"A · B" is Chromium · Playwright WebKit. The load is the 1-min load at the witness start.

### 1.1 · The battery, `f-src` (and `f-dist` where named)

| witness | unmigrated · A · B | migrated · A · B | whole · A · B | load · A · B |
|---|---|---|---|---|
| T-1 | 3/6 · 3/6 | **15/15 · 18/18** | 20/42 · 23/45 (+12 unmeasured; library 5/27) | 35.32 · 17.88 |
| T-2 `src` · `dist` | — | — | **52/52 · 52/52** · **52/52 · 52/52** | 37.40 · 14.01; `dist` — · 12.35 |
| T-3 | 12/48 · 9/48 | **40/43 · 40/43** | 42/85 · 42/85 (+12 unmeasured; library 2/39) | 35.75 · 13.47 |
| T-4 | 3/24 · 3/24 | **24/24 · 24/24** | 36/54 · 36/54 | 27.96 · 10.13 |
| T-5 `src` · `dist` | 20/37 · 20/37 | **38/38 · 38/38** (both builds) | 87/116 · 87/116; `dist` 88/117 · 88/117 | 19.75 · 13.79 |
| T-6 | 34/48 · 34/48 | **33/33 · 33/33** | 64/88 · 64/88 | 27.97 · 14.47 |
| T-7 | 4/32 · 4/32 | **24/24 · 24/24** | 24/24 · 24/24 | 31.03 · 13.65 |
| T-8, one run | — | **27/27** | 27/39 (+13 unmeasured: library 12, real Safari 1) | 12.95 |
| W-A · W-B · W-C · W-D · W-E | — | — | 5/9 · 9/25 · 0/8 · 4/8 · 1/3, both engines | 23.7-31.7 · 12.3-14.8 |
| W-E `dist` | — | — | 1/6 · 1/6 | — · 17.20 |

Every tally equals `Fc4` §1, `FV4` §3.2 and `D′c5` §1.1 cell for cell. T-6 migrated held 33/33 at loads 28 and 14.

- **T-3's three misses are C1** (Q-10).
- **W-D 4/8** is D′'s declared half, which F does not read (as in `Fc4`).

### 1.2 · H5's cells, both routes

Chromium: `logs/h5-{f,dp}-*-chromium.log` (01:40 →, load 14.3-25). Playwright WebKit: hold B, `logs/h5-{f,dp}-*-webkit.log` (02:22 →).

| cell | F (`f-*`) | D′ (`dp-*`) | `H5` / `FV4` |
|---|---|---|---|
| **FACT matrix** `src` · `src-dev` · `dist` | **68/68 · 68/68 · 68/68** in both engines | **68/68 · 68/68** in both engines | 68/68 |
| **CANON** clean | **4/4** (Playwright WebKit the same) | **4/4** (the same) | 4/4 |
| CANON `a`, `s` | 3/4 each | 3/4 each | the same |
| CANON `h` | **2/4**: two cells fail on F's spelling, the tile corner ("2 rule(s)") and the pill winner ("24/48 twins") | 3/4 | the same |
| CANON `layer` | 2/4 | 2/4 | the same |
| CANON `foreign`, `unlayered`, `cq` | 3/4 each | 3/4 each | the same |
| CANON controls `lowlayer`, `cqoff` | 4/4, 4/4 | 4/4, 4/4 | the same |
| **ATTACK** `src-dev` (with `x5`) · `dist` | **5/5** · 3/3 (Playwright WebKit the same) | **5/5** (the same) | 5/5 |
| **CORNER** `src` · `dist` | **5/5 · 5/5** (Playwright WebKit the same) | **5/5** (the same) | 5/5 |
| **REPORT** on the route build | `kick` 0.17 px (want ≤ 0.05, peak 1.0278); `mark` **10.70:1** dark, 13.12:1 light; **`name-ink` FAIL 1.00:1** light and dark. Playwright WebKit: `kick` 0.13 px (peak 1.0275); `mark` **10.72:1** dark, 13.16:1 light; `name-ink` the same | `kick` 0.17 · 0.11 px; `mark` UNMEASURED (Q-3); `name-ink` FAIL 1.00:1 | the same |
| REPORT on an attack build | exit 2, naming the route build, in both engines (H5-6) | — | exit 2 |
| **XSCRIPT** (engine-free) | **3/3 PASS**: K2 equal on both routes with each declaration removed, no K2 paint. Info: D′'s `strip` and `f1` read `var(--selection-ink)`, F's sites none | | as `H5` §3.4 |

X-5 (`x5`, both engines): "console errors counted from navigation (3 in all) · option tc (holds a nested group) named 1× as holding an interactive descendant, 1 before ready; option pc … 1 before ready".

### 1.3 · The route's units and the plants

H5's `unit.mjs` (config `vitest.wt.config.ts` `f70c44e4`), one driver at a time, no restore mismatch (`logs/unit-plant-*.log`, 01:18 → 01:20, load 19.3-29.0).

| plant | what it plants | result |
|---|---|---|
| clean · clean-after | — | **PASS 62/62** · PASS 62/62 |
| `rows-on-slot-function` | a row on the slot function, not on `yields()` | **FAIL** 1 ("a row renders only when its slot yields content") |
| `second-writer` | a second `--selection-tile` writer reading `#meta` | **FAIL** 1 ("one rule writes the tile fact") |
| `mark-off-fact` | `--toggle-group-marked: 1` struck from the tile rule | **FAIL** 1 (the same case) |
| `canon-a`, `canon-s` | A, S on F's spelling | each **FAIL** 1 (the same case: a second rule reads the anatomy) |
| `canon-h` | H, `.toggle-group__item:has(> * + *) { 12px }` | **PASS 62/62**, as in `Fc4` §2.2. R-7's instrument is CANON, which fails it (2/4) in both engines |
| `layer`, `foreign` | `D′c4` §5.2's two | **PASS 62/62** each; CANON fails both |
| `pin-unbounded`, `pin-option-only`, `pin-gone` (FV4-1's, on the F state) | the scope's limit struck; `:scope *` struck; the declaration struck | each **FAIL** 1 (floor v2's sheet case) |
| **`crit-one-arm`** (this seat) | the writer's nesting arm struck | **FAIL** 1 ("one rule writes the tile fact") |
| **`crit-blank-yields`** (this seat) | blank text yields | **FAIL** 1 ("a row renders only when …") |
| **`crit-room-off`** (this seat) | the mark's room gate struck: the mark on every tile, whatever its width | **PASS 62/62**: no unit reads MIGRATION's "when it is at least 3.5 checks wide" (§4.3) |
| `crit-cases` (`Fc4`'s three cases, copied in and removed) | rows after mount, both ways; a forwarding wrapper | **PASS 3/3** |

The whole suite (`logs/unit-all.log`) ran **2,351 cases: 2,348 passed, 3 failed** (`gate:boot-graph — build arm` ×3, HEAD's own), 1 skipped. That equals `FV4` §2. `vue-tsc --noEmit` reports 0 errors on both projects (`logs/tsc.log`, after the library build). The library build exits 0 (`logs/libbuild.log`).

**Bundle** (`logs/bundle.log`): 2,938,684 B unpacked, 843 files; `dist/` 2,545,946 B in 839 files; JS gzip-9 330,782 B. That is **+19,627 over the ratchet datum** (2,919,057) and +327 over pass 4's F (2,938,357): floor v4's pin and prose less F's struck pin.

### 1.4 · Probes and carried instruments (Chromium · Playwright WebKit)

| instrument | reading | as before? |
|---|---|---|
| `f4-attack.mjs` on `f-own-{src,src-dev,dist}` | 52/52 · 52/52, 54/54 · 54/54, 52/52 · 52/52 | same |
| the same with floor v4's pin struck (`fv-nopin-own-src-dev`) | **48/54 · 48/54** | same as F's pin struck in pass 4: the floor pin now does that work |
| `crit-f.mjs` (`Fc4`'s) on `f-crit-{src,src-dev,dist}` | **24/24 each**, both engines. **N3 now a pill**: the inner option at h/2, fact `none` | **was N3 FAIL 2/2 per flavour per engine**: met |
| the same, floor pin struck (`fv-nopin-crit-src-dev`) | 24/24 · 24/24 | the pin does not decide N3; the floor's per-group reset does |
| `crit-level.mjs` (`D′c4`'s) on `src`, `src-dev`, `dist` | 8/12 each, both engines. The item cells agree; the 4 misses write `data-shape`, D′'s declaration, which F does not read | same |
| `anatomy-flip.mjs` on `src`, `src-dev`, `dist` | 10/10 each, both engines | same |
| `selector-forms.mjs` | route form 12/13 · 12/13 (miss `nest3`, by design); total 63/78 · 63/78 | same |
| `scope-bound.mjs` (FV4-1's) | `scope` 17/17, `crit` 17/17; plants `unbounded` 12/17, `option` 15/17, `none` 11/17, in both engines | same as `FV4` §1 |
| `states.mjs` states / hover / hover-f1 / a11y | 54/54; 9/9; 3/3; 6/6 · 54/54; 9/9; 3/3; 3/3 (Playwright WebKit a11y: contrast only) | same |
| `states.mjs` ink (reported) | `strip` stroke 3.23:1 light, 2.06:1 dark, 3.23:1 PRT on the ground; label 1.00:1 | same |
| `crit.mjs` x3 / x6 / tone / desc (`src-dev`) | 2/2; 1/1; 12/12; 1/1 in both engines | same |
| `tile-geometry` · `pill-row` · `corner-gap` | 30/30 · 27/27 · 10/10, both engines | same |
| `unmigrated.mjs` on `dist` | shipped K2 207.00×36.00, 3 rows, **CUT 4 boxes up to 24.64 · 24.86 px**; shipped K1 1 row, nothing cut | same |
| `p3.mjs` forced / cost | the mark under forced colours 19.04 · 10.54:1. Cost ratio of minima **1.11** in Chromium (14.1 against 12.7 ms) | `Fc4` 1.10; the spread is 0.97-1.11, noise around 1 |
| `crit-p5.mjs` (`D′c5`'s) on `f-atk-src`, `f-atk-src-dev` | **12/12 each**, both engines | new on F |
| `crit-ink.mjs`, `crit-name-trace.mjs`, `crit-name-lift.mjs` (`D′c5`'s) on `f-src` | §2 | new on F |
| **`crit-f5.mjs`** (this seat) `mark` on `f-src` | **6/6 · 6/6** (§3.2) | new |
| **`crit-f5.mjs`** `nest` on `f-crit5-{src,src-dev}` and its no-pin variant | **8/10 each**, both engines: `L3` 8/8, ST 0/2 (§3.1) | new |
| R-3 plant (`pop0`, the kick deleted, cmp-restored) | T-6 64/88 → **44/88 · 44/88**, migrated 33/33 → **21/33 · 21/33** | same |
| `canon-fact.mjs` (pass-4 spec fork) | **HARNESS ERROR, exit 2**, both engines: `TypeError: … (reading 'filter')`. It is a corroboration fork that H5-1 superseded, as `D′c5` §4.3 found | was 3/3 |

---

## 2 · X-2 on F: the selected name

Re-traced on F's route build (`logs/crit-name-trace-chromium.log`, load 14.93):

- **The name**, `span.tile-name.text-mono-caption`, has one matched colour rule: «.tile-name» [regular; unlayered] `color: var(--muted-foreground)`, computed rgb(112, 89, 66) light and rgb(195, 185, 172) dark.
- **The item** has two: `button, … { color: inherit }` [base], then `.toggle-group__item { color: var(--selection-ink) }` [components]. It computes oklch(0.216 …), which is rgb(28, 25, 23) light, and rgb(233, 230, 226) dark.

`crit-ink` reads the stroke at the item's ink and the name at 1.00:1, in both engines. `crit-name-lift` adds only `[data-arm="migrated"] .tile-name { color: inherit }`, in both engines:

| mode | as built | consumer colour lifted |
|---|---|---|
| light | name rgb(112, 89, 66), 1.00:1 | **rgb(28, 25, 23), its item's ink, 2.66:1** |
| dark | name rgb(195, 185, 172), 1.00:1 | **rgb(233, 230, 226), 1.56:1** |

F's MIGRATION says the rows "inherit the item's ink (`--selection-ink`), so a stroke of `currentColor` and a readout follow the state". That holds for anything that does not set its own colour. K2's name sits in the default slot, outside `#meta`, and carries the transcription's rest colour. **The cause is the harness's shared K2 block (`harness/scenes.mjs`, the unscoped `.tile-name` line), not F's code and not library paint.** The cure is `D′c5` §2's, route-neutral: one MIGRATION sentence telling the consumer to delete a rest colour on an option's content, and the migrated K2 following it. The cell cannot pass by a library rule without consumer-paint override (T-7) or a masking fallback (E-2).

**Scoring.** The media half of X-2 holds (stroke 2.66:1 light, no state rule). §P4-6.3 folds the name into X-2 as REPORT `name-ink`, and that cell reads 1.00:1. A critic may not rule a row PASS against its own instrument's reading. **X-2: open, not owner; H5 cell REPORT `name-ink`.** The dark 1.56:1 is R-5's, reported. `Fc4` §3.2 scored X-2 met on the media alone; H5-5's fold is what moves it.

---

## 3 · The attacks this seat added

### 3.1 · A row-law holder that is not a group, inside a tile option (`crit-f5` `nest`, ST)

The floor's one-row law (`utilities/base.css:66-104`) holds "a one-row option (ToggleGroupItem, SegmentedTabs' tab)" under `@container style(--selection-tile: none)`, read on the tab's parent. Every `.toggle-group` resets the fact to `none`, and SegmentedTabs resets nothing. So a SegmentedTabs inside a tile option reads the outer option's `flush`. F invites exactly this placement: `#meta` is the row below the label, and a consumer puts a control there.

Composition (`probes/route-crit5/` `stnest`): a tile group whose option 0 fills `#meta` with a SegmentedTabs, each tab holding two block rows through `#option`. The same strip sits beside the group as the control.

| cell | reading, `src` · `src-dev` · the no-pin variant, light and dark, Chromium and Playwright WebKit alike | verdict |
|---|---|---|
| ST-control (beside) | 1 text row · tab 113.00×32.94 · strip 40.94 · first span `inline` · tab parent's fact `none` | PASS |
| **ST (inside the tile option)** | **2 text rows · tab 43.00×46.69 · strip 54.69 · first span `block` · tab parent's fact `flush`** · outer option a tile, 222.00×99.63 | **FAIL, every flavour, both modes, both engines** |
| development names | `src-dev`: one name, "holds an interactive descendant" (X-5's). Nothing names the second row. `src`: silent | — |

- **The pin is not the cause.** With floor v4's pin struck the reading is identical (`critf5-nest-nopin-src-dev-*`). The fact arrives by plain inheritance, so D′ is affected the same way, and the class is route-neutral and floor-shaped.
- **The composition is a nested interactive control,** which X-5 already names in development. FACT's matrix nests ToggleGroups only, so no H5 cell reads it.
- **Classed for the next pass (§4.1), not scored.**

### 3.2 · F's MIGRATION claims about the mark and nesting (`crit-f5` `mark`, L3)

- **"a selected one carries a check … when it is at least 3.5 checks wide":** for every tile option in the six migrated scenes, the `::after`'s used size against the rule (padding box ≥ 3.5 marks → the mark, else 0). **6/6 · 6/6.**
  - K2 203.00 → 14 px;
  - preset 202.00 → 18;
  - strip 38.00 → **0** and 49.00 → 14;
  - V2 450.00 → 18;
  - F1 72.00 → 18;
  - C1 has no tiles (pills).
- **"a group three levels deep is pills":** `n3deep`, levels 1 and 2 are tiles (16 px, column), level 3 a pill at h/2 on one row. **8/8 per flavour, both modes, both engines.** On `src-dev` the two nested groups are named as interactive descendants (X-5).
- **The mark over the media (reported, G):**
  - On K2 the mark's box (14 px at 187, 4) **covers the sparkline's end point (189.00, 14.36) on all 8 specimen tiles**, overlapping the path's box by 7.28-13.92 px², in both engines. That is `Fc4` §3.6's finding, now measured.
  - On `strip` the two wide tiles' marks cover the glyph's end point (43.88 and 47.25 px²).
  - On F1 the end point is clear.

### 3.3 · `D′c5`'s inline `!important` cell on F (`crit-p5`)

The six gating cells hold on F in both flavours and engines (12/12). The reported cell `option-inline-bang` (FV4-2's stated exception) splits F's tile:

- fact `none` on a column tile at 16 px (0.42×h/2);
- both content spans `overflow: hidden`, `padding-block 2.295px`;
- **66.58 → 75.70 px** (Chromium), 75.72 (Playwright WebKit).

On D′ the same cell reads 40.00 → 43.97. F's tile is two rows, so the clip costs more.

---

## 4 · For the next pass (new classes; no row, not scored)

### 4.1 · The tile fact reaches a SegmentedTabs inside an option (§3.1)

Every ToggleGroup resets `--selection-tile`. The other `.pill-row` holder does not, so inside a tile option its one-row law switches off, silently in production.

- **Cure (floor, route-neutral, KISS):** SegmentedTabs' strip resets the fact to `none`, as `.toggle-group` does. The pin's `@scope` limit then gains that strip too, since the pin would otherwise outrank its reset. The alternative is for the row law to read a fact SegmentedTabs never inherits.
- **Witness:** a FACT matrix nested-site variant whose nested group is a SegmentedTabs, judged by its tab's rows.

### 4.2 · FV4-2's inline `!important` exception splits the option (`D′c5` §4.1, reproduced on F)

The numbers are in §3.3. The cure is the same as on D′: strike the clause, or say what the write does.

### 4.3 · F's room gate has no unit

`crit-room-off` deletes the gate and the route's units pass 62/62. Only a paint read (`crit-f5` `mark`, this seat's) checks MIGRATION's "at least 3.5 checks wide". If Q-3 rules (b) and the mark moves to the floor (FV3-6), the floor should carry a witness for the gate, and the content rule `Fc4` §5 asks for.

### 4.4 · Smaller notes

- `canon-fact.mjs` (both pass-4 spec forks) crashes on H5's CANON in both engines. It is no longer evidence (M-14), and `D′c5` §4.3 already asks the agglomerator to delete it.
- Plant H still passes F's units (62/62), and so do `layer` and `foreign`. That is by design since M-14. If the agglomerator keeps F's units as corroboration, they corroborate nothing on R-7.
- REPORT `kick` reads 0.17 px (Chromium) and 0.13 px (Playwright WebKit) at 300 px against a 4 px gap. It is floor-owned and reported (H4-6).

---

## 5 · The checklist (REGISTRY §P2-6.3), row by row

Rows are scored on the migrated arm, the gating unmigrated arm and the non-transcription library scenes, on this seat's runs.

### 5.1 · T-1..T-8

| row | reading | status |
|---|---|---|
| T-1 | migrated 15/15 · 18/18 | met |
| T-2 | 52/52 · 52/52 on `src` and `dist` | met |
| T-3 | migrated 40/43 · 40/43; C1 has no carrier in any mode; shipped K1 has none in light or PRT | **open: owner** (Q-10; Q-5 for K1) |
| T-4 | migrated 24/24 · 24/24 | met |
| T-5 | migrated 38/38 · 38/38 on `src` and `dist` | met |
| T-6 | migrated 33/33 · 33/33 | met |
| T-7 | migrated 24/24 · 24/24; XSCRIPT 3/3 (no K2 paint; F's other sites paint nothing) | met |
| T-8 | migrated 27/27, one run; real Safari UNMEASURED (E-4's) | met |

### 5.2 · X-1..X-7

| row | reading | status |
|---|---|---|
| X-1 | states 54/54 · 54/54 | met |
| **X-2** | the media holds (stroke at the item's ink, 2.66:1 light, no state rule). **REPORT `name-ink` FAILS 1.00:1** light and dark, both engines. The cause is the shared scene's `.tile-name { color }` (§2) | **open, not owner. H5 cell: REPORT `name-ink`.** Harness and MIGRATION cure |
| X-3 | x3 2/2 · 2/2 | met |
| X-4 | V2 `type="multiple"` green on T-1, T-3 and T-7 migrated | met |
| X-5 | ATTACK `x5` 5/5 on `src-dev`, named before ready, both engines; desc 1/1 · 1/1 | met |
| X-6 | x6 1/1 · 1/1 | met |
| X-7 | tone 12/12 · 12/12 | met |

### 5.3 · FV-1..FV-10

| row | reading | status |
|---|---|---|
| FV-1 | T-5 and T-6 migrated green | met |
| FV-2 | T-2 52/52 · 52/52 on `dist`; `pill-row` 27/27 · 27/27 | met |
| FV-3 | T-6 migrated 33/33 · 33/33 (the calm observer) | met |
| FV-4 | X-7 tone 12/12 | met |
| FV-5 | a11y 6/6 · 3/3; the forced-colours mark 19.04 · 10.54:1 | met |
| FV-6 | T-5 arrows on every migrated grid, `src` and `dist` | met |
| FV-7 | ATTACK 5/5 · 5/5; `f4-attack` 54/54 · 54/54 on `src-dev`; the reactive flip (`crit-f` VF/VR) with 0 console errors | met |
| FV-8 | PRT hover inside T-6 33/33 | met |
| FV-9 | `flush` from the anatomy; `plated` by a consumer write (`crit-f` PL, `crit-p5` group-utility-plated) | met (the look is G's) |
| FV-10 | the route adds no value to guard; the floor's guards are in the suite | met |

### 5.4 · R-1..R-10

| row | reading | status |
|---|---|---|
| R-1 | shipped K2 on `dist`: 3 rows in a 36 px pill, 4 boxes cut up to 24.64 · 24.86 px, silent; shipped K1 has no carrier in light or PRT | **open: owner** (Q-5, Q-15) |
| **R-2** | FACT `pill-in-option`, `tile-in-option`, `nested-group` ×3, `nested-option` ×6: green on `src`, `src-dev`, `dist`, both engines; `crit-f` N3 a pill 24/24; `L3` 8/8; the anatomy and reactive flips green | **met** (open in pass 4) |
| R-3 | commit cells green; the kick plant takes migrated 33/33 → 21/33 in both engines | met |
| R-4 | hover 9/9 · 9/9, F1 3/3 · 3/3 | met |
| R-5 | K2 stroke 2.66:1 light, **1.56:1 dark** (reported); the perimeter and the mark carry T-3 | met, reported |
| R-6 | `tile-geometry` 30/30 · 30/30; T-1 16.00 px at fine, coarse and `--ui-scale 1.25`; pills at h/2 | met |
| **R-7** | **CANON** clean 4/4; A, S, H, `layer`, `foreign`, `unlayered`, `cq` each fail; `lowlayer` and `cqoff` 4/4. Both routes, both engines | **met** (open in pass 4) |
| R-8 | T-2 52/52 and CORNER 5/5 on `dist`; W-E `dist` 1/6 · 1/6 | **open: owner** (Q-5) |
| R-9 | 2,938,684 B, +19,627 over the datum | met (stated); the rebind is Q-14's |
| R-10 | one rule writes the fact (`second-writer`, `canon-a`, `canon-s`, `crit-one-arm` each fail the unit); FACT 68/68 incl. `item-none-in-tile`, `item-flush-in-pill`, `content-writes-none`, no false name on `src-dev`; `crit-level` item cells agree; FV4-1's three plants fail the sheet case | met |

### 5.5 · E-1..E-4

| row | reading | status |
|---|---|---|
| E-1 | every witness, probe and carried instrument gave a verdict in both engines in one sitting each, no stall. The exception is `canon-fact.mjs`, not a row instrument since M-14 (§4.4) | met |
| E-2 | F1, V2, the sibling state, the interactive descendant, the keyed reorder and the deselectable single are green; C1 T-3 0/3 · 0/3 | **open: owner** (Q-10) |
| **E-3** | each claim of F's MIGRATION row re-measured: "the other way round" (FACT `*-in-option`, N3); "two levels … three deep is pills" (`L3`); "at least 3.5 checks wide" (`mark` 6/6); the unfilled-slot sentence (ATTACK `empty`, the unit, `crit-blank-yields` fails it, the forwarding wrapper); "every option in it is a card" (`crit-f` MX); the floor's write row (FACT `ancestor`/`wrapper`/`option`/`content`, `crit-p5`); CORNER 5/5. §3.3's inline cell does what the clause says (it outranks); its consequence is unstated, not misstated | **met** (open in pass 4) |
| E-4 | **UNMEASURED (owner's safaridriver checkbox)**; Safari's list: `:has()` with a complex `:not()`, `@container style()` on a registered property, `mask-composite: exclude`, the percentage `min()` room gate, `@scope` with a lower boundary | **open: owner** |

### 5.6 · G, the gestalt

Not re-filmed. Floor v4 and F add no paint value since pass 4, so `D4-F-proto/glance-pair/` stands:
- focused-selected shows two concentric outlines (Q-3);
- plated barely separates from flush in dark (Q-2);
- the check covers K2's curve end point on all 8 specimen tiles, now measured (§3.2).

O-87 holds: no lighting layer. **Status: open, owner Q-2 and Q-3.**

### 5.7 · Tally

| block | met | not met |
|---|---:|---|
| T (8) | 7 | T-3 (owner: Q-10, Q-5) |
| X (7) | 6 | **X-2 (not owner: REPORT `name-ink`; harness and MIGRATION cure)** |
| FV (10) | 10 | |
| R (10) | 8 | R-1 (owner: Q-5, Q-15), R-8 (owner: Q-5) |
| E (4) | 2 | E-2 (owner: Q-10), E-4 (owner: checkbox) |
| G (1) | 0 | G (owner: Q-2, Q-3) |
| **total** | **33 / 40 (82.5 %)** | 7: six owner-blocked, one not |

Against pass 4 (`Fc4` §3.7, 31/40): R-2, E-3 and R-7 are met, and X-2 is open. §P4-6.4 expected 34/40 at the fixed point. That is not met, for the same single row as D′ (`D′c5` §5.7), with the same cell and cure. **F and D′ read the same 33/40 on the same seven open rows,** and nothing measured separates them. That is still Q-13.

**Real Safari:** UNMEASURED (owner's safaridriver checkbox), every cell.

**Run hygiene.** Every guard, browser and server this seat started exited with its stage (`logs/chain.log` ends `CHAIN-DONE` at 02:45:01; no seat browser was found running afterwards). The seat worktree was removed with `git worktree remove --force`. Builds stay in scratch under `.claude/worktrees/bl/D4/p5/D4-F-crit/out/`, and the run JSON this document quotes is banked in `crit/run-json.tgz`.
