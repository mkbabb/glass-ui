# D4 · pass 4 · D4-F · prototype: the anatomy declares the tile, on floor v3

| field | value |
|---|---|
| seat | D4-F prototype, pass 4. Implements `D4-F-spec.md` on HEAD + floor v3, re-measures every number it scores on in its own worktree, reads what the spec left owed (its §8: the whole suite, the Playwright WebKit stage, the carried rows, the `:has()` cost, the glance pair, the story), and scores the route on the fixed 40-row checklist (REGISTRY §P2-6.3, unchanged by §P3-6.3). Adds no row, picks no winner |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | detached worktree at **`9219651ed`**, the task's HEAD (`.claude/worktrees/bl/D4/p4/D4-F-proto/wt`; `node_modules` and `tests-visual/node_modules` symlinked from the checkout). The checkout's HEAD is `ec90b3103`; `git diff --stat 9219651ed ec90b3103 -- src` is empty. `floor-v3.patch` (sha1 `f8f57677…`) applied clean first, then the spec's `route.patch`. The worktree was removed with `git worktree remove --force` before return |
| patch | **`D4-F-proto.patch`**, relative to HEAD + floor v3, sha1 **`991415c3c57c96481f2b55cccea2995077f296fb`**: 5 files, **+300 / −4** by `git apply --numstat` (`ToggleGroupItem.vue` +37/−2, `styles.css` +106, `ToggleGroup.test.ts` +79, `MIGRATION.md` +21/−2, `demo/stories/forms/toggle.vue` +57). **It is byte-identical to the spec's `route.patch`** (`cmp`): nothing this seat measured asked for a change. `run-proto.sh patch` makes it by diffing each file against its HEAD + floor v3 copy kept beside the worktree; `run-proto.sh check` applied `floor-v3.patch` to a fresh worktree at `9219651ed`, ran `git apply --check` on the patch (clean), applied it, and `cmp` found all five files equal to the prototype's |
| harness | H4 **`a26206b6a740`** (39 files) on all 90 run JSONs (`run-json.tgz`, every `harness` field) and every unit line. No harness file was edited |
| engines | Chromium 149.0.7827.55 (Playwright's default headless shell) and **Playwright WebKit 26.5** (Playwright 1.61.1), headless, from `glass-ui/node_modules/playwright`. Playwright WebKit is not Safari. Every real-Safari cell: **UNMEASURED (owner's safaridriver checkbox)** |
| machine | Every build, unit run, probe and browser run went through `~/.claude/guard/guarded --light --rss-gb 8`; every Playwright WebKit read ran inside an `--exclusive webkit` hold: the whole WebKit stage in ONE hold (`logs/webkit-all.log`: queued 23:11:49, admitted 23:38:34 after 26.7 min behind other seats, done 00:19:52), and the prototype's later flip probe in a second, 2.6 min hold (`logs/webkit-extra.log`). One heavy run at a time, serial. 1-min load: builds and units 17.4-23.3; Chromium battery 8.4-17.9 at witness starts; Chromium reads 8.3-21.7; Playwright WebKit 13.8-26.5. Every log's first and last line carry the 1 / 5 / 15-min load |
| records | Everything under `pass-4/D4-F-proto/`: `run-proto.sh` (the driver: the spec's `run-f4.sh` re-pointed, plus `patch`, `check`, `build-extra`, and one `reads` list run once per engine), `run-extra.sh` (the WebKit flip and two more cost reads, added after `run-proto.sh` was running, so that file was never edited mid-run), `probes/anatomy-flip.mjs` (this seat's), `probes/story.mjs` (pass 3's, with `--engines` and the browser closed in a `finally`), `logs/` (every log cited), `glance-pair/` (16 stills + `pair.json`), `run-json.tgz` (the 90 run JSONs, 127 KB). The spec's route (`../D4-F-spec/route/`), its probes and `route-f4/` compositions are read in place, unchanged. Builds stay in `.claude/worktrees/bl/D4/p4/D4-F-proto/out/` |
| fences | No tracked source edited in the checkout. Git writes: `git worktree add` / `remove` of `D4-F-proto/wt` and of the check worktree `D4-F-proto/chkwt`. Checkout writes: only `D4-F-proto.patch`, `D4-F-proto.md` and `D4-F-proto/` under `docs/tranches/BL/design/tile/pass-4/`. Nothing under `~/.claude` was read; the guard was only executed |

Citations: `Fs` is `D4-F-spec.md` (pass 4); `Fp3` / `Fc3` the pass-3 prototype and critique; `D′c` the pass-4 D′ critique; `FV3` is `FLOOR-V3.md`; `H4` is `H4.md`. "A · B" is Chromium · Playwright WebKit.

---

## 0 · In brief

1. **The route is the spec's, unchanged.** After floor v3 it is:
   - two slots on `ToggleGroupItem`, `#media` and `#meta`, each rendered in a library-marked row only when the slot yields something to paint (`yields()`);
   - one writer of the fact: `.toggle-group:has(.toggle-group__item > :is(.toggle-group__media, .toggle-group__meta):not(.toggle-group .toggle-group *))`, and its one-level-nested twin, `{ --selection-tile: flush }`;
   - one pin, `:where(.toggle-group__item, .toggle-group__item *) { --selection-tile: inherit !important }`, so that the fact is the group's at every element that reads it;
   - the mark (a check cut through a disc of the edge ink), keyed on the fact.

   The floor supplies the rest of what a tile is.
2. **Every number `Fs` scores on reproduced, cell for cell, and this seat read the cells `Fs` could not.** Migrated arm, A · B: T-1 15/15 · 18/18, T-2 52/52 · 52/52 (`dist` the same), T-3 40/43 · 40/43, **T-4 24/24 · 24/24**, T-5 38/38 · 38/38 (`dist` the same), **T-6 33/33 · 33/33**, T-7 24/24 · 24/24, T-8 27/27 (one run). The shared attack set (H4-1): FACT 12/12 · 12/12, ATTACK 3/3 · 3/3 (`src-dev` 4/4 · 4/4), CORNER 5/5 · 5/5, each on `src` and `dist`. The route's own probe: 52/52, 54/54, 52/52 on `src`, `src-dev`, `dist`, in both engines. Units: whole suite 2,351 ran, 2,348 passed, and the 3 failures are HEAD's `gate:boot-graph`; 17/17 route-file cases; 4/4 plants fail. Bundle 2,938,357 B, equal to the spec's to the byte.
3. **The D′ critic's R-10 attack does not land on F.** `crit-level.mjs` writes `--selection-tile: none` inline on a tile's option, and `flush` on a pill's option. On D′ that split the fact (`D′c` §2, 6/6 per engine). On F both cells read "agree" on `src`, `src-dev` and `dist`, in both engines: the inline `none` on a tile option computes `flush` (a tile, 16 px, 0 console errors), and `flush` on a pill option computes `none` (a pill at h/2). The pin is what holds it: without the pin the route's own probe fails exactly these cells (48/54 · 48/54). The probe's two flip cells are D′'s declaration (`data-shape`), which F ignores by design. F's own flip, the anatomy arriving or leaving after mount, reads **10/10 · 10/10** on all three flavours (§3.3).
4. **Score: 34 / 40, the owner-gated fixed point** (REGISTRY §P3-6.3). The six open rows are the six in §P3-6.4, each built at its default and none claimed by ruling: T-3 and E-2 (Q-10, with Q-5 for shipped K1), R-1 (Q-5, Q-15), R-8 (Q-5), G (Q-2, Q-3), E-4 (the checkbox). No route-owned or floor-owned row is open.
5. **No stall, no hang, no janky cell, no NOT-REPRODUCED.** Playwright WebKit retired its browser at H3-1's 60-navigation cap 9 times across the stage, as designed (load 15-26). The `:has()` cost reads a ratio of minima of 1.05, 0.97 and 1.01 across three Chromium sittings (load 10.4-20.9), which is noise around 1. Playwright WebKit's clock reads 0.0 ms on both arms, so that cell is UNMEASURED by this instrument, as in pass 3.

---

## 1 · What was built

Line numbers are in the patched tree (HEAD + floor v3 + `D4-F-proto.patch`). This is `Fs` §1, implemented as specified.

| # | where | what |
|---|---|---|
| F-1 | `ToggleGroupItem.vue` `defineSlots` | `media?` (a row above the label) and `meta?` (a row below it). No prop and no value, so `refuseUnknown` (FV-10) has nothing of the route's to guard |
| F-2 | `ToggleGroupItem.vue` `yields()` | A slot is filled when it yields a vnode other than a comment, blank text or an empty fragment, recursing into fragments. A false `v-if`, a `v-for` over nothing, blank text and an empty template are unfilled. A child component counts as content whatever it renders (MIGRATION says so) |
| F-3 | `ToggleGroupItem.vue` template | `<span v-if="yields($slots.media?.())" class="toggle-group__media">` before the default slot, and the `__meta` twin after it. The slot is called in render, so it is tracked |
| F-4 | `ToggleGroupItem.vue` floor name | The development name for a pill asking for a second row now says where the row goes (`#media` / `#meta`) |
| F-5 | `styles.css`, the writer | The two-selector `:has()` above. It counts a row whose nearest group is this group. Wrappers between a group and its options are unbounded; nesting is bounded at two groups |
| F-6 | `styles.css`, the pin | `:where(.toggle-group__item, .toggle-group__item *) { --selection-tile: inherit !important }` in `@layer components`. Only an inline `!important` beats it, the same exception the floor's corner has |
| F-7 | `styles.css`, the mark | `::after`: `--toggle-group-mark` (1.125 rem; `sm` 0.875 rem) × `--toggle-group-marked`, which only the floor's tile rule sets to 1; a 3.5-mark room gate; opacity on the engage clock, `scale` 0.4 → 1 on `--spring-press`; forced colours `HighlightText`. Rows: `.toggle-group__media` a stretched flex row, `.toggle-group__meta` weight 400 |
| F-8 | `ToggleGroup.test.ts` | `a row renders only when its slot yields content`; `the sheet: one rule writes the tile fact, from the anatomy, and the option cannot rewrite it`; the floor's tile-geometry expectation gains `--toggle-group-marked: 1` |
| F-9 | `MIGRATION.md` | the `#media` / `#meta` row (filled and unfilled slots, wrappers and nesting, the silent change, the detectors), and the `--selection-tile` bullet amended (`flush` on a group whose own options fill a slot; written on an option or inside it has no effect) |
| F-10 | `demo/stories/forms/toggle.vue` | the "Tiles" section: a 2×2 single set with `#media` and `#meta`, and a 3-column `sm` multiple set with `#meta` on two of its three options |

Not in the route (`Fs` §1.5): the engine, walk, ARIA, kick, tone, hover, perimeter, flush plate, `accessibility.css`, FadingScroll, `inheritAttrs`, and the tile geometry. All of those are floor v3's.

---

## 2 · The checklist, row by row (REGISTRY §P2-6.3)

Rows are scored on the migrated arm, the gating unmigrated arm and the non-transcription library scenes. Under F a library transcription arm (`preset`, `specimen`, `strip`, `f1`, `v2`, `c1`) fills no slot, so it is pills; its cells are R-1's. Library residue outside the route is floor v3's and unchanged (`FV3` §4.1). Every cell cites a log under `D4-F-proto/logs/` and its JSON in `run-json.tgz`.

### 2.1 · T-1..T-8

| row | witness and reading (this seat's runs) | status |
|---|---|---|
| T-1 | `src-T-1-{chromium,webkit}.log` (and the battery run, identical): migrated **15/15 · 18/18**, 16.00 px at fine, coarse and `--ui-scale 1.25`. Library 5/27 · 5/27 with 12 UNMEASURED (held pills, R-1). Unmigrated 3/6 · 3/6 | met |
| T-2 | **52/52 · 52/52** on `src` and on `dist` (`dist-t2-one-line-stadium-*.log`), H4-2's 12 late cells included | met |
| T-3 | migrated **40/43 · 40/43**. Open: `c1-migrated` carrier 0.00 px² against 224 in light, dark and PRT, both engines (fill 1.18 / 1.22 / 1.00:1 · 1.20 / 1.20 / 1.00:1). Shipped K1 `preset-verbatim`: 0.00 / 238.00 / 0.00 · 0.00 / 217.00 / 0.00 px² against 248. Unmigrated 12/48 · 9/48, as at HEAD and on floor v3 | **open: owner Q-10 (C1), Q-5 (shipped K1)** |
| T-4 | migrated **24/24 · 24/24**; unmigrated 3/24 · 3/24 | met (Playwright WebKit read here for the first time on F in pass 4) |
| T-5 | migrated **38/38 · 38/38** on `src` and `dist`; unmigrated 20/37 · 20/37 | met |
| T-6 | migrated **33/33 · 33/33**. `preset-migrated` pop: keyboard 1.03 at 81 · 78 ms, programmatic 1.03 at 86 · 75 ms, calm observer 1.03 at 76 · 82 ms, pointer 1.04 at 126 · 106 ms, each with a trough and a settle; body travel 0.00 px; Tab entry 0.00. Hover ΔE 0.0946 · 0.0953 (PRM 0.0946), PRT 0.0332 · 0.0309 against 0.02. Coarse taps latch nothing. Median frame 8.00 ms (Chromium). No janky cell | met (Playwright WebKit read here for the first time on F in pass 4) |
| T-7 | migrated **24/24 · 24/24**; unmigrated 4/32 · 4/32 | met |
| T-8 | `src-T-8-both.log`: migrated **27/27** in one run over both engines. Library 0/12. The 13th unmeasured cell is real Safari: `safaridriver: Could not create a session: You must enable 'Allow remote automation' in the Developer section of Safari Settings` (E-4's) | met |

### 2.2 · X-1..X-7

Each row is re-read on this build with the pass-3 shared instruments (`../pass-3/D4-Dp-spec/probes/states.mjs`, `crit.mjs`). D′'s pass-4 prototype read the same instruments, so the two routes read the same cells.

| row | witness and reading | status |
|---|---|---|
| X-1 sibling state | `carried-states-states-*.log` **54/54 · 54/54**: the selected tile's T-3 separation under valid, invalid, a sibling's full-ink border, the shipped consumer reset and both tones, on migrated preset, specimen and strip, light, dark, PRT | met |
| X-2 selected ink reaches the media | `carried-states-ink-*.log`: K2's stage stroke takes `--selection-ink` when selected, through the `#media` row's inherited colour, with no consumer rule: 2.66:1 against the unselected stroke in light, 1.56:1 dark, 2.66:1 PRT, both engines; V1's glyph 3.23 / 2.06:1. T-3 and T-7 migrated green with no `[data-state="on"]` rule. See §5 N-4 for the K2 name | met |
| X-3 state paint never re-renders the slot | `carried-crit-x3-*.log` **2/2 · 2/2**: K2 under `content-visibility: auto`, programmatic and pointer commits, readout `DIRECT-WRITE-42` kept, slot mutations 0 | met |
| X-4 multi-select, same anatomy | V2 `type="multiple"` with `#media` and `#meta`: T-1, T-3 and T-7 migrated green; the story's "Mix sources" (multiple, `sm`) is tiles, 16 px (§3.4) | met |
| X-5 interactive descendant named | `carried-crit-desc-*.log` on `src-dev` **1/1 · 1/1**; ATTACK on `src-dev` **4/4 · 4/4** | met |
| X-6 deselectable single | `carried-crit-x6-*.log` **1/1 · 1/1**: nothing checked, no perimeter, Tab lands on item 0, then exactly one checked | met |
| X-7 tone on edge, tint, ink | `carried-crit-tone-*.log` **12/12 · 12/12**: edge, tint and label ink each move | met |

### 2.3 · FV-1..FV-10, read under the route

| row | reading | status |
|---|---|---|
| FV-1 | T-5 and T-6 migrated green, both engines | met |
| FV-2 | T-2 **52/52 · 52/52** on `src` and `dist`, including the inline-style and utility `display: block` cells on all six gating pill scenes. Floor v3's `pill-row.mjs` on this build **27/27 · 27/27** | met |
| FV-3 | T-6 calm-observer commit 1.03 at 76 · 82 ms | met |
| FV-4 | X-7 above | met |
| FV-5 | `carried-states-a11y-*.log` **6/6 · 3/3** (Playwright WebKit takes `prefers-contrast` only, no forced-colours emulation): the selected tile's box does not move under contrast-more and forced colours. The mark under forced colours: `p3-forced-cost-*.log` `HighlightText` on the selected plate **19.04:1 · 10.54:1**, 18 px (md) and 14 px (sm) | met |
| FV-6 | T-5 arrows on every migrated grid, `src` and `dist`, both engines | met |
| FV-7 | ATTACK `src-dev` **4/4 · 4/4** (`sup`: 0 console errors over 6 one-row pills); the route's own probe on `src-dev` **54/54 · 54/54** (no "asks for a second row" on a tile); anatomy flip on `src-dev` 0 console errors in all 10 cells, both engines | met |
| FV-8 | PRT hover ΔE 0.0332 · 0.0309 on `preset-migrated` | met |
| FV-9 | `flush` from the anatomy; `plated` written by a consumer on the group: FACT `fact-plated` (a tile on the field corner, 204.00×61.58, 16.00 px); the plated arm built for the glance pair (`f4pp-src`) | met (the look is G's) |
| FV-10 | the route adds no value to guard; the floor's guards unchanged (`FV3` §3 units in the whole suite) | met |

### 2.4 · R-1..R-10

| row | witness and reading | status |
|---|---|---|
| R-1 the unmigrated consumer | `probe-unmigrated-dist-*.log` (production `dist`): shipped K1 `preset-verbatim` 208.00×40.00, 1 row, nothing cut, with no selected carrier in light or PRT (T-3 row); shipped K2 `specimen-verbatim` 207.00×36.00, 3 rows, **CUT 4 boxes, up to 24.64 · 24.86 px**, silent. W-E `dist` 1/6 · 1/6 | **open: owner Q-5, Q-15** |
| R-2 the H-2 pair | FACT `pill-in-tile` (92.78×40.00, used 20.00 = h/2), `pill-beside-tile`, `tile-in-pill` (63.03×40.00, h/2) green, light and dark, `src` and `dist`, both engines. The route's own probe `c1` (empty anatomy, four spellings) and `v2` / `specimen` / `f1` (wrappers, both nesting directions) 52/52 · 52/52. **The pair after mount** (`anatomy-flip-*.log`, §3.3): rows removed → every option a pill at h/2; rows added → a tile; the class inside content → a pill; rows put back → a tile; **10/10 · 10/10** on `src`, `src-dev` and `dist`, with no attribute differing. W-D 4/8 · 4/8 (its declared half is D′'s witness, as in pass 3) | met |
| R-3 the commit, plant-checked | T-6 commit cells above. **Plant on this build** (`build-variant-pop0.log`: `animation: toggle-group-commit 450ms` → `animation: none 450ms`, built, restored): `t6-pop0-*.log` T-6 **44/88 · 44/88**, migrated **21/33 · 21/33**: the 12 lost cells are the commit cells | met |
| R-4 hover against selected | `carried-states-hover-*.log` **9/9 · 9/9**, `…-hover-f1-*` **3/3 · 3/3**; T-6 hover ΔE above | met |
| R-5 X-2 media ink, dark stroke reported | K2 stroke 2.66:1 light, **1.56:1 dark**, 2.66:1 PRT, identical in both engines; the perimeter and the mark carry T-3 | met, reported |
| R-6 the comfort axis | T-1 migrated coarse and `--ui-scale 1.25` 16.00 px; floor `tile-geometry.mjs` on this build **30/30 · 30/30** (sm / md / lg × light, dark × five consumer-corner forms); pills at h/2 (T-2) | met |
| R-7 the canon unit fails plants A, S, H | The route's unit: 17/17 clean, and its plants fail (§3.1). The container-aware read `canon-fact.mjs` (`Fs` §2.5): clean **3/3 · 3/3**; plant A **2/3 · 2/3**, S **2/3 · 2/3**, H **1/3 · 1/3**, each failing its own cell. Harness CANON **1/3 · 1/3**: `canon.mjs` does not evaluate `@container` (F3-1), so it reads floor v3's field corner as reaching every pill. That is an instrument blind spot that every floor-v3 route reads, and H5 owns it | **met on the container-aware read**; CANON's 1/3 is H5's |
| R-8 refusal per Q-5 on `dist` | T-2 52/52 · 52/52 on `dist`; CORNER 5/5 · 5/5 on `dist`; the pin refuses a fact written on an option (`crit-level` `item-*` cells on `dist`); W-E `dist` 1/6 · 1/6 (W-E counts only an error or a throw in production, which Q-5 (b) does not give) | **open: owner Q-5** |
| R-9 the bundle datum | §4 | met (stated); the rebind is Q-14's |
| R-10 "is a tile" spelled once | One rule writes the fact (unit, plant `second-writer` fails it). Every reader reads the group's fact, and nothing below the group can rewrite it: FACT **12/12 · 12/12** on `src` and `dist`; `crit-level` `item-none-in-tile` and `item-flush-in-pill` **"agree"** on `src`, `src-dev`, `dist`, both engines (the cells that failed on D′, `D′c` §2); the route's own `preset` cells 54/54, and **48/54 · 48/54 with the pin removed** (`own-nopin-src-dev-*.log`); plant `pin-not-important` fails the unit | met |

### 2.5 · E-1..E-4

| row | reading | status |
|---|---|---|
| E-1 every cell readable in both engines | every witness, probe and carried instrument gave a verdict in both engines in one sitting. `grep -iE 'hung\|engine failure\|stall\|BROKEN\|NOT-REPRODUCED\|HARNESS ERROR'` over `logs/*-webkit.log` matches only W-E's title line ("installs"); the 9 browser retirements are H3-1's designed cap | met |
| E-2 the H-10 scenes | F1, V2, the sibling state, the interactive descendant on `src-dev`, the keyed reorder and the deselectable single green on the migrated arms (T-3, T-5, T-6, X-1, X-5, X-6). **C1:** T-3 0/3 · 0/3. A one-row option fills no slot, so under the anatomy C1 cannot become a tile (`Fs` R-2) | **open: owner Q-10** |
| E-3 MIGRATION rows, falsifiable claims only | (1) "a slot that yields only a false `v-if`, a `v-for` over nothing or blank text is unfilled": ATTACK `empty` 3/3 · 3/3 on `src` and `dist` (`anatomy rows rendered 0`, 184.00×40.00 at h/2), the route's `c1` cells, unit + plant `rows-on-slot-function`. (2) "wrappers do not matter … two levels; a third is pills": `selector-forms-*.log` route form 12/13 · 12/13 (the miss is `nest3`), `f4-attack` `v2`, `specimen`, `f1`. (3) "written on an option or inside it, `--selection-tile` has no effect, an inline `!important` excepted": `crit-level` `item-*`, `f4-attack` `preset`. (4) The corner claim: CORNER **5/5 · 5/5** on `src` and `dist` (utility, scoped, unlayered `!important`, inline all 16.00 px on 204.00×66.58). (5) The pill clause: floor v3's row, T-2 52/52 · 52/52 on `dist` | met |
| E-4 real Safari | **UNMEASURED (owner's safaridriver checkbox)** in every cell | **open: owner** |

### 2.6 · G, the gestalt

Read from this build's glance pair (`glance-pair/`, 16 stills: preset and specimen × light, dark × fine, coarse × Chromium, Playwright WebKit; rows flush over plated, columns selected and focused-selected).
- **Card-like.** 16 px corners on two-row tiles, start-aligned body leading. The preset tiles read as cards, not lozenges, in every still.
- **Selection without colour.** The perimeter plus the check, in light and dark, at md and sm.
- **Apart from the ring?** No. On focus the 2 px ring sits about 3 px outside the 2 px perimeter, so focused-selected shows two concentric outlines (Q-3, as in pass 3).
- **Uncluttered: plated against flush.** Plated reads as slabs in light; in dark the two barely separate (Q-2).
- **The mark over media.** On K2 (`specimen-*-pair.jpg`) the check sits in the tile's block-start / inline-end corner, on top of the sparkline's end point (the selected `ease-in-quad` curve ends there). REPORT reads the mark 10.70 · 10.72:1 in dark and 13.12 · 13.16:1 in light on V2 (want ≥ 3:1 in dark).
- **O-87.** The route's one paint is the mark, a carrier of state. It adds no colour, shadow, blur or lighting layer.

**Status: open, owner Q-2 and Q-3.**

### 2.7 · Score

| block | met | open (owner) |
|---|---:|---|
| T (8) | 7 | T-3 (Q-10, Q-5) |
| X (7) | 7 | |
| FV (10) | 10 | |
| R (10) | 8 | R-1 (Q-5, Q-15), R-8 (Q-5) |
| E (4) | 2 | E-2 (Q-10), E-4 (checkbox) |
| G (1) | 0 | G (Q-2, Q-3) |
| **total** | **34** | **6**, each built at its default |

**34 / 40, at the owner-gated fixed point**: 0 open rows outside the owner's. Not CONVERGED (§P3-6.3, §P3-6.4). The pass-3 work list is closed: E-3 empty anatomy (F-2), the nesting reach (F-5), R-10 fact / geometry (floor v3) and fact at two elements (F-6), FV-2 and E-3's pill clause (floor v3).

---

## 3 · Readings in full

### 3.1 · Typecheck, unit, build

| check | result | log (load) |
|---|---|---|
| `vue-tsc --noEmit` (src + demo) | exit 0 | `tsc-app.log` (19.8-21.0) |
| `vue-tsc --noEmit -p tsconfig.test.json` (after the library build) | exit 0 | `tsc-test.log` (21.0-22.1) |
| the whole suite (H4's `unit.mjs`, two workers) | **2,351 ran: 2,348 passed, 3 failed, 1 skipped**; the 3 are `gate:boot-graph` (no `dist-demo`, HEAD's own) | `unit-all.log` (20.7 → 18.4) |
| `unit.mjs --selftest` | 6/6 | `unit-selftest.log` |
| route unit file, clean | **17/17**, before and after the plants | `unit-plant-clean-targets.log`, `unit-plant-clean-after.log` |
| plants, each must fail | **4/4 fail**, one case each: `rows-on-slot-function` (pass 3's `$slots.meta` gate) fails "a row renders only when its slot yields content"; `second-writer`, `pin-not-important` and `mark-off-fact` each fail "one rule writes the tile fact, from the anatomy, and the option cannot rewrite it". Every plant restored by `unit.mjs`'s `finally` | `unit-plant-*.log` (17.4-19.3) |
| library and scene builds | exit 0: lib; `f4p-{src,src-dev,dist,dist-dev}` (`--route ../D4-F-spec/route`); `f4p-atk-{src,src-dev,dist}` (`--route harness/attack-route`); `f4p-own-{src,src-dev,dist}` (`--route ../D4-F-spec/probes/route-f4`); measurement-only `f4v-nopin-own-src-dev`, `f4v-child-own-src`, `f4v-child-src`, `f4pp-src` (plated), `f4p-pop0-src` (kick plant), each variant applied and restored by `run-proto.sh build-extra` | `libbuild.log`, `build-*.log`, `build-variant-*.log` (18.1-23.3) |

### 3.2 · H4, unmigrated and migrated side by side

Chromium: `battery-src-chromium.log` (22:20 → 22:35) and its re-read inside `chromium-all.log` (`src-*-chromium.log`, 22:35 → 23:11, identical tallies). Playwright WebKit: `webkit-all.log`, one lock hold (23:38 → 00:19). Gating cells passed / measured.

| witness | build | unmigrated consumer (shipped K1/K2 markup) · A · B | migrated consumer (`#media` / `#meta`) · A · B | whole witness · A · B | 1-min load at start · A · B |
|---|---|---|---|---|---|
| T-1 | src | 3/6 · 3/6 | **15/15 · 18/18** | 20/42 · 23/45 (+12 unmeasured; library 5/27) | 9.58 · 24.62 |
| T-2 | src · dist | — | — | **52/52 · 52/52** · **52/52 · 52/52** | 8.96 · 20.38 |
| T-3 | src | 12/48 · 9/48 | **40/43 · 40/43** | 42/85 · 42/85 (+12 unmeasured; library 2/39) | 9.61 · 24.53 |
| T-4 | src | 3/24 · 3/24 | **24/24 · 24/24** | 36/54 · 36/54 (library 12/30) | 7.67 · 20.58 |
| T-5 | src | 20/37 · 20/37 | **38/38 · 38/38** | 87/116 · 87/116 (library 49/78) | 11.90 · 22.48 |
| T-5 | dist | 20/37 · 20/37 | **38/38 · 38/38** | 88/117 · 88/117 (library 50/79) | 16.34 · 19.14 |
| T-6 | src | 34/48 · 34/48 | **33/33 · 33/33** | 64/88 · 64/88 (library 31/55) | 10.07 · 25.07 |
| T-7 | src | 4/32 · 4/32 | **24/24 · 24/24** | 24/24 · 24/24 | 20.75 · 19.83 |
| T-8 | src, one run | — | **27/27** | 27/39 (+13 unmeasured; library 0/12, real Safari 1) | 25.59 |
| W-A · W-B · W-C | src | — | — | 5/9 · 9/25 · 0/8, both engines (library, as `FV3` §4) | 16.19-18.40 · 15.98-18.32 |
| W-D | src | — | — | 4/8 · 4/8 (the declared half is D′'s) | 15.69 · 19.08 |
| W-E | src · dist | — | — | 1/3 · 1/3 · 1/6 · 1/6 | 15.39 · 19.16 |
| CANON | src | — | — | **1/3 · 1/3** (F3-1) | 14.72 · 18.10 |
| REPORT | src | — | `kick` push **0.14 · 0.14 px** (`preset-migrated` 300.00×66.58, peak 1.0276 · 1.0276) against a 4 px gap, want ≤ 0.05; 0.00 px at the scene's own 204 px. `mark` dark **10.70 · 10.72:1** (`#dedbd7` over `#292825`), light 13.12 · 13.16:1 on V2 | reported, not gating | 14.72 · 18.10 |

REPORT `mark` in Playwright WebKit, UNMEASURED in `Fs` (its stage pointed REPORT at the attack build), is read here on the route build.

**The shared attack set (H4-1)**, on the attack builds. Each cell is one consumer: the migrated consumer (F's filled `#meta`), or the unmigrated one writing or not writing the fact.

| witness · cell | consumer | src · A · B | dist · A · B | src-dev · A · B |
|---|---|---|---|---|
| FACT `declared` (light, dark) | migrated: filled `#meta` | a tile on the field corner, fact `flush`, 95.94×66.58, 16.00 px, 2 rows, column | the same | — |
| FACT `pill-in-tile`, `tile-in-pill` | a pill group nested in a tile group, and a one-item tile group inside a pill group | pills at h/2, one row (92.78×40.00; 63.03×40.00) | the same | — |
| FACT `pill-beside-tile` | unmigrated, beside the tile | pill at h/2 | the same | — |
| FACT `fact-plated`, `fact-flush` | unmigrated preset, the consumer writes the fact on the group | a tile on the field corner, 204.00×61.58, 16.00 px (0.52×h/2), 2 rows | the same | — |
| **FACT total** | | **12/12 · 12/12** | **12/12 · 12/12** | — |
| ATTACK `empty` | migrated C1, every slot a false `v-if` | fact none, 184.00×40.00, used 20.00 = h/2, anatomy rows rendered 0 | the same | |
| ATTACK `attrs` | migrated preset with consumer class, style, `data-*`, `aria-label`, `role="option"`, `tabindex="0"`, `@click` | handler 1×, checked, role `radio`, one tab stop, consumer attributes land | the same | |
| ATTACK `sup` | migrated strip, `m<sup>2</sup>` labels | reported | reported | **0 console errors over 6 one-row pills** |
| **ATTACK total** | | **3/3 · 3/3** | **3/3 · 3/3** | **4/4 · 4/4** |
| CORNER `utility`, `scoped`, `important`, `inline` | migrated preset, the consumer re-rounds the tile | 16px, used 16.00 on 204.00×66.58, each | the same | — |
| CORNER `scoped-control` | unmigrated `family-d-undeclared` | computes 7px (the selector reaches an item) | the same | — |
| **CORNER total** | | **5/5 · 5/5** | **5/5 · 5/5** | — |

### 3.3 · The route's probes, the critic's attack and the floor's probes, on this build

| probe | A · B | log |
|---|---|---|
| `f4-attack.mjs` (`Fs` §2.3) on `f4p-own-src` · `-src-dev` · `-dist` | **52/52 · 52/52**, **54/54 · 54/54**, **52/52 · 52/52** | `own-*-{chromium,webkit}.log` |
| variant **nopin** (`src-dev`, pin removed) | **48/54 · 48/54**: `preset` «item-writes-none» `item fact none · 204.00×75.70 16px … a tile's block content held inline 1`, «content-writes-none» the same, and the tile named once per mode | `own-nopin-src-dev-*.log` |
| variant **childwriter** (`FV3` stub's writer) | **38/52 · 38/52**: `v2` «k2wrap» `fact none (want flush)`; on the route arms T-3 migrated **28/40 · 28/40**, T-1 migrated 9/9 with 18 UNMEASURED | `own-child-src-*.log`, `child-t{1,3}-*.log` |
| `selector-forms.mjs` (static, no library) | route form (`depth2`, groups above the row) **12/13 · 12/13** (miss: `nest3`); descendant 10/13, child 7/13, `@scope` 10/13, not-nested 12/13, chain3 12/13 (miss: `deepWrap`); identical in both engines | `selector-forms-*.log` |
| **`anatomy-flip.mjs`** (this seat's; §0 item 3) on `src` · `src-dev` · `dist` | **10/10 · 10/10** each. `rows-removed` 4 rows → `9999px → used 20.00`, every corner 9999px, 0 names on `src-dev`; `rows-added` → `16px → used 16.00`, 204.00×86.52, column; `class-in-content` → pill; `rows-readded` → tile | `anatomy-flip-*-{chromium,webkit}.log` |
| `crit-level.mjs` (`D′c`'s probe, unchanged) on `src` · `src-dev` · `dist` | **8/12 · 8/12** each. The `item-*` cells and controls pass (above). The 4 failing cells are `flip-cell-to-pill` and `flip-pill-to-cell`: they write `data-shape`, which F does not read (`data-shape pill` on a group with rows stays a tile; `data-shape cell` on a group without rows stays pills). They test D′'s declaration and say nothing about F; F's flip is the row above | `crit-level-*.log` |
| `canon-fact.mjs` clean / plants A, S, H | **3/3 · 3/3** / **2/3 · 2/3**, **2/3 · 2/3**, **1/3 · 1/3** | `canon-fact*-*.log` |
| `tile-geometry.mjs` (floor's, `--corner`) | **30/30 · 30/30** | `probe-tile-geometry-*.log` |
| `pill-row.mjs` (floor's) | **27/27 · 27/27** | `probe-pill-row-*.log` |
| `corner-gap.mjs` (`D′p3`'s) | **10/10 · 10/10** | `probe-corner-gap-*.log` |
| `unmigrated.mjs` on `dist` | R-1 above | `probe-unmigrated-dist-*.log` |
| `p3.mjs --only forced,cost` (pass 3's) | forced **2/2 · 2/2** (19.04 · 10.54:1). Cost (200 tiles, 40 forced style + layout passes, 9 rounds), ratio of minima `:has()` / class: **1.05** (load 10.4), **0.97** (20.6), **1.01** (20.9) in Chromium; Playwright WebKit 0.0 ms on both arms, **UNMEASURED by this clock** | `p3-forced-cost-*.log`, `p3-cost-{2,3}-chromium.log` |
| story, `/forms/toggle` (`probes/story.mjs`, Chromium; the WebKit dev-demo crash is PF-2's, `Fc3` §0) | **14/14**: "Spring preset" fact `flush`, 4 items 216×98.08, 16 px, selected perimeter 1, mark 18 px at opacity 1; "Mix sources" (`multiple`, `sm`) `flush`, 141.33×55, 16 px, mark 14 px; five pill groups `none` at h/2; 0 ToggleGroup console errors, light and dark | `story-chromium.log` |
| glance pair (`film.mjs --pair`, flush vs plated) | 16 stills, every frame checked by the tool before it was shot | `film-pair*-*.log`, `glance-pair/` |

---

## 4 · The bundle datum (R-9)

`../pass-3/floor-v2/probes/bundle.sh` (npm `unpackedSize`, G-BUNDLE-RATCHET's measure), `logs/bundle.log` (23:14, load 9.3-9.4):

| build | unpacked (packed files) | vs datum 2,919,057 | `dist/` | JS gzip-9 |
|---|---|---|---|---|
| HEAD + floor v3 (`FV3` §6) | 2,934,126 B (843) | +15,069 | 2,543,198 B | 330,571 B |
| **HEAD + floor v3 + D4-F (this patch)** | **2,938,357 B (843)** | **+19,300** | 2,545,932 B, 839 files | 330,782 B |

The route over floor v3: **+4,231 B** unpacked (`dist/` +2,734 B, JS gzip-9 +211 B; the rest is MIGRATION and the story), equal to `Fs` §2.1 to the byte. For comparison, D′ over floor v3 is +2,214 B (`D4-Dp-proto.md` §5). Landing either route rebinds the datum together with the floor's +15,069, and that rebind is the owner's (Q-14).

---

## 5 · Notes for the critic

| id | note | measured |
|---|---|---|
| N-1 | **CANON reads 1/3 · 1/3 on this route, as on any floor-v3 route** (F3-1). R-7 is scored on the container-aware `canon-fact.mjs` and the route's unit, not on CANON alone | §2.4 R-7 |
| N-2 | **`crit-level`'s flip cells test D′'s writer.** F's flip after mount is `anatomy-flip.mjs`. It edits the DOM in place of a slot emptying or filling; whether Vue removes the row is the unit's (`yields()`), and whether the paint follows is the probe's | §3.3 |
| N-3 | **The pin reaches a group nested inside an option.** `.toggle-group__item *` matches a nested `.toggle-group`, so the pin's `inherit !important` outranks that group's reset and its writer: a ToggleGroup inside a ToggleGroupItem takes the outer item's fact. That composition is an interactive descendant inside a `<button>`, which the floor already names in development (X-5). **Not measured by any probe here**; FACT's nesting cells put the nested group beside the options, not inside one | code reading |
| N-4 | **The two routes' K2 transcriptions differ in one consumer rule.** D′'s `migrated.mjs` carries `.tile-name { color: var(--selection-ink) }`, a consumer colour on the tile's own name. F's does not, so on F the K2 name keeps its `data-register="code"` ink in both states (label 1.00:1 on `specimen-migrated` and `strip-migrated`, both engines), while the media stroke follows (2.66:1). X-2 asks for the media, which passes. Whether D′'s extra rule is consumer paint (T-7's class) is for the critic | `carried-states-ink-*.log` here and in `D4-Dp-proto/logs/` |
| N-5 | **The mark sits on media content.** On K2 the check overlaps the sparkline's end point in the selected tile's corner, in every specimen still. That is G's, under Q-3 (FV3-6) | `glance-pair/specimen-*` |
| N-6 | **The pin is floor code in a route patch** (`Fs` R-6). D′'s open R-10 (`D′c` §2) is the same class, and this pin cures it on F. An agglomerator moving it to the floor cures both routes | §2.4 R-10 |
| N-7 | **`yields()` cannot see inside a child component.** A component that renders nothing still makes a row and a tile; MIGRATION states it | unit (the component arm) |
| N-8 | **Nesting is bounded at two groups.** A third level reads pills (`nest3`, both engines) | `selector-forms-*.log` |
| N-9 | **The kick pushes 0.14 · 0.14 px into a 4 px gap on 300 px tiles** (floor's; REPORT, not gating) | §3.2 |
| N-10 | **A floor comment is false** (`D′p` N-4): `utilities/base.css` says a tile route sets the fact "on the group (or any ancestor of its options)". The per-group reset makes the parenthesis false on F too. It is in the floor's file | — |

**Real Safari:** UNMEASURED (owner's safaridriver checkbox), every cell. The engine facts only Safari can settle on this route: `:has()` with a complex `:not()`, `@container style()` on a registered property, `mask-composite: exclude`, and the percentage `min()` room gate.

**Run hygiene.** Nothing this seat started is left running: every guard, server and browser exited with its run (every stage log ends with `exit`; `story.mjs` closes its browser and server in `finally`). The worktrees `D4-F-proto/wt` and `D4-F-proto/chkwt` were removed with `git worktree remove --force`. Builds and run JSON stay in `.claude/worktrees/bl/D4/p4/D4-F-proto/out/`; the JSON every number here rests on is banked in `D4-F-proto/run-json.tgz`.
