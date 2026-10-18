# D4 · pass 5 · D4-D′ · critique: the declared cell, on floor v4 and H5

| field | value |
|---|---|
| seat | D4-D′ adversarial critic, pass 5 (REGISTRY §P4-6.2 item 3). Authored no D4 seat. Re-runs every number on HEAD + floor v4 + `D4-Dp.patch`: the battery T-1..T-8, the shared attack set, H5's FACT matrix and CANON on **both** routes, REPORT, the route's units with every plant. Attacks the route and floor v4. Scores on the 40-row checklist only (§P2-6.3, unchanged by §P4-6.3). Adds no row, picks no route |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | HEAD `a11a6ed6a`, detached worktree `.claude/worktrees/bl/D4/p5/D4-Dp-crit/wt` (`node_modules` symlinked; the checkout has no `tests-visual/node_modules`). `floor-v4.patch` sha1 `2d56cc5a`, then `D4-Dp.patch` `b09d15e4` (`logs/state-dp.log`: `git diff HEAD` `bf26010b6ac5`, 26 dirty `src` paths). F's state (`D4-F.patch` `c7072d6e`, 23 paths, `65ab8c1c21f7`) was applied only to build F's route and attack builds, then reverted (`logs/state-f.log`) |
| owner | no ruling on Q-2, Q-3, Q-5, Q-10, Q-13 or Q-15 in `audit/INBOUND.md` or `FORMATION-PROGRESS.md` (read 2026-10-17 22:00). Both routes' H5 cells were read, and every owner row is scored at its P4-5 default |
| harness | H5 **`bfe1b6beddb0`** (41 files) on every witness and unit line. No harness file edited |
| engines | Chromium 149.0.7827.55 (Playwright's default headless shell) and **Playwright WebKit 26.5** (Playwright 1.61.1), headless, from `glass-ui/node_modules/playwright`, no GPU launch args. Every WebKit number here is Playwright WebKit. Real Safari: **UNMEASURED (owner's safaridriver checkbox)** (`logs/src-T-8-both.log`: "You must enable 'Allow remote automation'") |
| machine | every stage through `~/.claude/guard/guarded --rss-gb 8`; browser runs never `--light` (only the typecheck, the unit runs and XSCRIPT took it); every run that could start Playwright WebKit inside `--exclusive webkit`. One heavy run at a time. WebKit lock waits: hold A 41 min 49 s (22:58:37 → 23:40:26), hold B 33 min 55 s (00:01:32 → 00:35:27), the extra hold 6 min 27 s (00:52:20 → 00:58:47). No wait passed 90 min. 1-min load at witness starts: 4.1-22.7. The two Chromium name probes ran by hand through guarded while hold A queued and ran nothing; no two heavy runs overlapped. No janky cell, no stall, no NOT-REPRODUCED line, no re-run needed |
| sittings | This seat ran twice. The first sitting (21:18-21:35, the same driver) was cut off by the workflow redeploy mid-T-3 of the Chromium battery; its 34 logs are kept in `D4-Dp-crit/logs/sitting-1/` and **no number here rests on them**. The second sitting re-ran everything from the library build (`logs/chain.log` from "SITTING 2", 22:03:22). Where both sittings read a cell (chain 1 and T-1..T-3), they agree exactly |
| records | under `pass-5/D4-Dp-crit/`: `run-crit.sh` (every stage), `chain1.sh`, `chain2.sh` (the order), `crit-extra.sh` (the extra WebKit hold), `probes/crit-p5.mjs`, `probes/crit-ink.mjs`, `probes/crit-name-trace.mjs`, `probes/crit-name-lift.mjs` (this seat's probes), `logs/` (every log cited; wall clock and 1/5/15-min load on each log's first and last line), `run-json.tgz` (the run JSON every number here quotes). Builds stay in scratch under `.claude/worktrees/bl/D4/p5/D4-Dp-crit/out/` |
| fences | no tracked source edited in the checkout; `git apply` touched only the seat worktree; the only git writes are `git worktree add` / `remove` of `D4-Dp-crit/wt`; the only checkout writes are this file and `pass-5/D4-Dp-crit/` |

Citations as in REGISTRY §P4: `D′c4` is `../pass-4/D4-Dp-critique.md`; `FV4` is `FLOOR-V4.md`; `H5` is `H5.md`; `crit/` is `pass-5/D4-Dp-crit/`.

---

## 0 · In brief

1. **Every pass-5 number reproduced, in both engines.** Migrated arm, Chromium · Playwright WebKit: T-1 15/15 · 18/18, T-2 52/52 · 52/52 (`dist` the same), T-3 40/43 · 40/43, T-4 24/24 · 24/24, T-5 38/38 · 38/38 (`dist` the same), T-6 33/33 · 33/33, T-7 24/24 · 24/24, T-8 27/27 (one run), W-D 8/8 · 8/8. H5's cells on **D′**: FACT matrix **68/68** on `src`, `src-dev` and `dist` in both engines; CANON clean **4/4**, every one of the nine plants failing and both controls passing, plant for plant as `H5` §3.1 in both engines; ATTACK `src-dev` **5/5** with X-5 named before ready in both engines; CORNER 5/5 on `src` and `dist` in both engines. On **F**: FACT 68/68 on `src` and `src-dev`, CANON 4/4 (plant H 2/4, F's spelling), ATTACK 5/5, CORNER 5/5 (all in both engines). Units: clean 63/63; all 13 plants fail; whole suite 2,352 ran with HEAD's 3 `boot-graph` failures. Bundle 2,936,815 B.
2. **R-10, pass 4's one non-owner row, is closed on my own measurement.** `D′c4` §2's counterexample, `--selection-tile: none` inline on item 0 of a declared group, now reads a coherent tile, 204.00×63.58, 16 px, two rows, no pill clip (it was 72.17 with the clip). Its twin `item-flush-in-pill` reads "the write is refused: a one-row pill". That is 12/12 per flavour on `src`, `src-dev`, `dist` in Chromium and Playwright WebKit, and H5's matrix (which subsumes it) reads 68/68. Tailwind-shaped writes (a `[--selection-tile:…]` utility on the group, `!`-utilities and unlayered `!important` on the option and its content) behave exactly as D′'s and floor v4's MIGRATION rows say: `crit-p5` 12/12 on `src` and `src-dev` in both engines.
3. **X-2 is open, and the cause is not the library.** REPORT `name-ink` fails 1.00:1 light and dark on both routes, both engines, as `H5` and `FV4` read it. `FV4` §3.3 put the cause in the item ("the item's own computed `color` stays the unselected ink"). **That is false.** The selected item's colour does take the selection ink (rgb(28, 25, 23) light, rgb(233, 230, 226) dark), and the K2 sparkline follows it through `currentColor`: 2.66:1 light, 1.56:1 dark (`crit-ink`). A CDP trace of the name (`crit-name-trace`) finds the one rule holding it: **`.tile-name { … color: var(--muted-foreground) }`, unlayered, in `harness/scenes.mjs:539`**. That is the K2 "layout and type" block transcribed from keyframes.js `EasingCatalogue.vue`. It has no `[data-arm]` scope, so it paints the migrated arm too, and XSCRIPT, which reads only `migrated.mjs`, cannot see it. With that one colour lifted, the selected name takes its item's ink on both routes (2.66:1 light, 1.56:1 dark; `crit-name-lift`, Chromium and Playwright WebKit). The cure is route-neutral: one MIGRATION sentence telling the consumer to delete a rest colour on an option's content (the item's ink is already muted at rest), and the harness's migrated K2 following it (§2).
4. **Score: 33 / 40 (82.5 %).** Six owner rows stay open at their defaults: T-3 and E-2 (Q-10), R-1 (Q-5, Q-15), R-8 (Q-5), G (Q-2, Q-3), E-4 (the checkbox). The seventh is **X-2**, which is not the owner's, and its H5 cell is REPORT `name-ink`. The route closed R-10 and lost X-2. **X-2 moved because the witness changed, not the route:** pass 4 met X-2 on D′'s own `.tile-name { color: var(--selection-ink) }`, which H5-5 struck as consumer paint. **Not at the owner-gated fixed point; one row short, and its cure is floor- and harness-shaped.**
5. **Verdict: ADVANCE.** D′'s source is unchanged since pass 4 and needs no change for X-2. Three new classes no row covers go to the next pass (§4). The sharpest: FV4-2's MIGRATION row names an inline `!important` as "the one thing above" the pin, and that write reproduces pass 4's split exactly, a column tile carrying the pill clip (40.00 → 43.97 px).

---

## 1 · Re-run

The order is in `logs/chain.log`. Chain 1 (22:03 → 22:21): state, library build, typecheck, scene builds, suite, plants, bundle, the R-3 plant build, XSCRIPT. Chain 2: F's builds, the Chromium battery (22:25 → 22:43), the Chromium reads (22:43 → 22:58), WebKit hold A (23:40 → 00:01), hold B (00:35 → 00:52), then `crit-extra.sh`. "A · B" is Chromium · Playwright WebKit; the load is the 1-min load at the witness start.

### 1.1 · The battery, `dp-src` (and `dp-dist` where named)

| witness | unmigrated · A · B | migrated · A · B | whole · A · B | load · A · B |
|---|---|---|---|---|
| T-1 | 3/6 · 3/6 | **15/15 · 18/18** | 20/42 · 23/45 (+12 unmeasured; library 5/27) | 11.59 · 9.16 |
| T-2 `src` · `dist` | — | — | **52/52 · 52/52** · **52/52 · 52/52** | 13.68 · 11.10; `dist` 6.65 · 15.01 |
| T-3 | 12/48 · 9/48 | **40/43 · 40/43** | 42/85 · 42/85 (+12 unmeasured; library 2/39) | 10.70 · 14.02 |
| T-4 | 3/24 · 3/24 | **24/24 · 24/24** | 36/54 · 36/54 | 9.79 · 7.87 |
| T-5 `src` · `dist` | 20/37 · 20/37 | **38/38 · 38/38** (both builds) | 87/116 · 87/116; `dist` 88/117 · 88/117 | 8.33 · 5.28 |
| T-6 | 34/48 · 34/48 | **33/33 · 33/33** | 64/88 · 64/88 | 10.17 · 5.19 |
| T-7 | 4/32 · 4/32 | **24/24 · 24/24** | 24/24 · 24/24 | 12.34 · 8.43 |
| T-8, one run | — | **27/27** | 27/39 (+13 unmeasured: library 0/12, real Safari 1) | 7.59 |
| W-A · W-B · W-C · W-E | — | — | 5/9 · 9/25 · 0/8 · 1/3, both engines | 7.3-9.2 · 7.5-7.9 |
| **W-D** | — | — | **8/8 · 8/8** | 7.32 · 7.51 |
| W-E `dist` | — | — | 1/6 · 1/6 | 5.87 · 8.15 |

Every tally equals `D′c4` §1 and `FV4` §3.2 cell for cell.

- **T-3's three misses are C1** (`run-json.tgz`, `dp-src/T-3-chromium.json`). Carrier 22.50 / 23.00 / 22.50 px² (light / dark / PRT) against the 224 px² bar, perimeter band 0.00; fill 1.19 / 1.24 / 1.01:1. Shipped K1 (`c1`, unmigrated) has 0.00 px² in every mode.
- **T-6 `preset-migrated`** (Chromium):
  - keyboard pop 1.03 at 86 ms, programmatic 1.03 at 79 ms, calm observer 1.03 at 84 ms, pointer 1.04 at 122 ms, each with a trough and a settle;
  - body travel 0.00 px; Tab entry moves 0.00;
  - hover ΔE 0.0946 (the same under PRM) and 0.0332 under PRT, against 0.02; coarse taps latch nothing.

### 1.2 · H5's cells, both routes

Chromium: `logs/h5-dp-*-chromium.log` and `logs/h5-f-*-chromium.log` (22:43 → 22:51, load 9.98-22.1). Playwright WebKit: hold B, `logs/h5-{dp,f}-*-webkit.log` (00:35 → 00:52, load 4.1-10.3).

| cell | D′ (`dp-*`) | F (`f-*`) | `H5` / `FV4` |
|---|---|---|---|
| **FACT matrix** `src` · `src-dev` · `dist` | **68/68 · 68/68 · 68/68** in both engines | **68/68 · 68/68** (no `dist` build) in both engines | 68/68 (`FV4` §3.2) |
| **CANON** clean | **4/4** (Playwright WebKit the same) | **4/4** (Playwright WebKit the same) | 4/4 |
| CANON `a`, `s` | 3/4 each | 3/4 each | the same |
| CANON `h` | 3/4 | **2/4** (F's spelling: tile corner and pill winner) | the same |
| CANON `layer` | 2/4 | 2/4 | the same |
| CANON `foreign`, `unlayered`, `cq` | 3/4 each | 3/4 each | the same |
| CANON controls `lowlayer`, `cqoff` | 4/4, 4/4 | 4/4, 4/4 | the same |
| **ATTACK** `src-dev` (with `x5`) · `dist` | **5/5** · 3/3 (Playwright WebKit the same) | **5/5** (Playwright WebKit the same) | 5/5 |
| **CORNER** `src` · `dist` | **5/5 · 5/5** (Playwright WebKit the same) | **5/5** (Playwright WebKit the same) | 5/5 |
| **REPORT** on the route build | `kick` 0.17 px (want ≤ 0.05; peak 1.0278); `mark` UNMEASURED (Q-3); **`name-ink` FAIL 1.00:1** light and dark (Playwright WebKit: `kick` 0.11 px, peak 1.0274; the rest the same) | `kick` 0.17 px; `mark` **10.70:1** dark, 13.12:1 light; **`name-ink` FAIL 1.00:1** (Playwright WebKit: `kick` 0.10 px; `mark` 10.72:1 dark, 13.16:1 light; `name-ink` the same) | the same, except `kick` read 0.16 in `FV4` |
| REPORT on an attack build | exit 2, naming the route build (Playwright WebKit the same) | — | exit 2 |
| **XSCRIPT** (engine-free) | **3/3 PASS**: K2 equal with each declaration removed; no K2 paint on either route. Info: D′'s `strip` (`.tile-glyph path { stroke }`, `.tile-label { color }`) and `f1` (`.grid-label { color }`) read `var(--selection-ink)` | | the same as `H5` §3.4 |

X-5 (`x5`, Chromium): "console errors counted from navigation (3 in all) · option tc … named 1× as holding an interactive descendant, 1 before ready; option pc … named 1×, 1 before ready".

### 1.3 · The route's units and the plants

H5's `unit.mjs` (config `vitest.wt.config.ts` `f70c44e4`), one driver at a time; no plant left a restore mismatch (`logs/unit-plant-*.log`, 22:05 → 22:07, load 10.0-17.8).

| plant | what it plants | result |
|---|---|---|
| clean | — | **PASS, 63/63** |
| `canon-a`, `canon-s`, `canon-h`, `canon-i`, `no-writer` | A, S, H; the corner's `!important` struck; the writer writes `none` | each **FAIL** 1 (the canon case "the tile corner is one declaration on the field rung") |
| `split` | a second tile corner inside the writer | **FAIL** 2 (canon and "the declaration writes the tile fact and nothing else") |
| `guard-gone`, `stamp-gone` | the refusal struck; the stamp struck | each **FAIL** 1 (the shape case) |
| `pin-unbounded`, `pin-option-only`, `pin-gone` (FV4-1's, on the route state) | the scope's limit struck; `:scope *` struck; the declaration struck | each **FAIL** 1 (the sheet case) |
| **`crit-sm-none`** (this seat) | a second fact writer, `none` on `[data-shape="cell"][data-size="sm"]` | **FAIL** 2 (canon and R-10). The amended R-10 case collects only `flush` and `plated`, but its first walk still lists every rule naming `data-shape`, and the canon case sees an `sm` tile twin on `none` |
| **`crit-lg-plated`** (this seat) | a second tile-value writer, `plated` on `[data-shape="cell"][data-size="lg"]` | **FAIL** 1 (R-10) |

So `FV4` §3.1's amendment (the writer list now collects only tile values) did not open a hole: both kinds of second writer are still caught. Whole suite (`logs/unit-all.log`): **2,352 ran, 2,349 passed, 3 failed** (`gate:boot-graph — build arm` ×3, HEAD's own), 1 skipped. `vue-tsc --noEmit` 0 errors on both projects (`logs/tsc.log`). Library build exit 0 (`logs/libbuild.log`).

### 1.4 · Probes and carried instruments (Chromium · Playwright WebKit)

| instrument | reading | as before? |
|---|---|---|
| `crit-level.mjs` (`D′c4`'s R-10 probe) on `dp-src`, `dp-src-dev`, `dp-dist` | **12/12 each** in both engines. `item-none-in-tile` 204.00×63.58, 2 rows, item and group fact `flush`; `item-flush-in-pill` refused, 204.00×40.00 at h/2; the flips 2/2 | **was 6/6 FAIL per engine on `item-none-in-tile`**: now met |
| `crit-p5.mjs` (this seat, §3) on `dp-atk-src`, `dp-atk-src-dev` | **12/12 each** in both engines | new |
| `fact-write.mjs` | 12/12 (Playwright WebKit the same) | same |
| `corner-gap.mjs` | 10/10 (Playwright WebKit the same) | same |
| `tile-geometry.mjs` | 30/30 (Playwright WebKit the same) | same |
| `pill-row.mjs` | 27/27 (Playwright WebKit the same) | same |
| `scope-bound.mjs` (FV4-1's) | `scope` 17/17, `crit` 17/17; plants `unbounded` 12/17, `option` 15/17, `none` 11/17 in both engines | same as `FV4` §1 |
| `unmigrated.mjs` on `dist` | shipped K2 207.00×36.00, 3 rows, **CUT 4 boxes up to 24.64 px** (24.86 px in Playwright WebKit); shipped K1 195.28×40.00, 1 row, nothing cut | same |
| `states.mjs` states / hover / hover-f1 / a11y | 54/54; 9/9; 3/3; 6/6 · 54/54; 9/9; 3/3; 3/3 (Playwright WebKit a11y: contrast only) | same |
| `states.mjs` ink (reported) | `strip` stroke and label, selected against unselected on the ground as the probe prints it: 3.23:1 light, 2.06:1 dark, 3.23:1 PRT, in both engines | — |
| `crit.mjs` x3 / x6 / tone / desc (`src-dev`) | 2/2; 1/1; 12/12; 1/1 in both engines | same |
| `crit-ink.mjs` (this seat) | **FAIL 0/2**: the selected media takes the ink (stroke 2.66:1 light, 1.56:1 dark), the name does not (1.00:1). Trace below (Playwright WebKit: the same stroke and name contrasts, and the stroke equals the item colour in both modes. Its light verdict line reads "does NOT take" because a 1 px canvas parses the raw `oklch(from light-dark(…))` as rgb(0, 0, 0) in that engine: an instrument artefact, not paint) | new |
| `crit-name-trace.mjs`, `crit-name-lift.mjs` (this seat) | §2 | new |
| R-3 plant (`pop0`: the kick deleted, rebuilt, restored and `cmp`-checked) | T-6 64/88 → **44/88**, migrated 33/33 → **21/33** in both engines | same |
| `canon-fact.mjs` (pass-4 fork) | **HARNESS ERROR, exit 2**, all four runs: `TypeError: Cannot read properties of undefined (reading 'filter')` at `canon-fact.mjs:86`. The fork calls H4's `judgeCanon`, whose inputs H5-1 changed. It has been corroboration only since M-14, and CANON itself reads 4/4, so R-7 is unaffected (§4.3) | was 4/4 |

**Bundle** (`logs/bundle.log`): 2,936,815 B unpacked, 844 files; `dist/` 2,543,981 B in 840 files; JS gzip-9 330,651 B. That is **+17,758 over the ratchet datum** (2,919,057) and +475 over pass 4's D′ (2,936,340): floor v4's pin, its comment, the struck base.css comment and the MIGRATION row. `FV4` §2 left the bundle unmeasured.

---

## 2 · X-2: the selected name, traced

H5-5 struck D′'s pass-4 `.tile-name { color: var(--selection-ink) }` from K2, and REPORT `name-ink` has failed on both routes since. `FV4` §3.3 placed the cause in the item and left the rule untraced. Traced here, Chromium 149 (`logs/crit-ink-chromium.log`, load 6.21; `logs/crit-name-trace-chromium.log`, load 8.63):

| element (selected K2 tile, light) | matched rules declaring `color`, cascade order | computed |
|---|---|---|
| the item `button.toggle-group__item` | (1) `button, input, select, optgroup, textarea { color: inherit }` [base]; (2) `.toggle-group__item { color: var(--selection-ink) }` [components]; with `.toggle-group__item[data-state="on"] { --selection-ink: var(--selection-edge) }` | **oklch(0.216 0.006 55.99) = rgb(28, 25, 23): the selection ink** |
| the sparkline path | `stroke: currentColor` (K2's own, `k2.mjs`) | rgb(28, 25, 23); **2.66:1** against unselected (dark 1.56:1) |
| the name `span.tile-name.text-mono-caption` | **(1) `.tile-name { … color: var(--muted-foreground) }` [unlayered]** | rgb(112, 89, 66), **1.00:1** against unselected |

So REPORT's line "unselected name rgb(112, 89, 66), item rgb(112, 89, 66)" names the *unselected* item, and the floor's reading of it ("the item's own computed `color` stays the unselected ink") does not hold. The library hands the ink to the item, and everything inheriting `color` takes it.

**Where the rule lives.** `harness/scenes.mjs:539`, under the comment `K2 · EasingCatalogue.vue:304-438 layout and type`:

```css
.tile-name { text-transform: none; text-align: center; … padding-bottom: 0.125rem; color: var(--muted-foreground); }
```

It is the consumer's own CSS, applied to every arm (the hover and selected inks below it are `[data-arm="verbatim"]`-scoped, and this line is not). H5-5 made `k2.mjs` the one K2 and XSCRIPT reads each route's `migrated.mjs`, so the shared block is outside both.

**The lift** (`probes/crit-name-lift.mjs`; Chromium `logs/crit-name-lift-chromium.log`, load 5.91 / 6.56; Playwright WebKit `logs/crit-name-lift-webkit.log` load 22.72 / 21.70). Only `[data-arm="migrated"] .tile-name { color: inherit }` is added:

| build · mode | as built: selected name · selected:unselected | consumer colour lifted |
|---|---|---|
| D′ light | rgb(112, 89, 66) · 1.00:1 | **rgb(28, 25, 23), its item's ink · 2.66:1** (Playwright WebKit the same) |
| D′ dark | rgb(195, 185, 172) · 1.00:1 | **rgb(233, 230, 226) · 1.56:1** (Playwright WebKit the same) |
| F light · dark | the same · 1.00:1 | the same · 2.66 · 1.56:1 (Playwright WebKit the same) |

**How this scores.** X-2's census reads "the selected state reaches the tile's media … without a consumer `[data-state="on"] path` rule". The media cell holds on both routes: the stroke takes the ink with no state rule. But §P4-6.3 folds "the selected name's ink in a transcription" into X-2 as REPORT `name-ink`, and that cell reads 1.00:1. A critic may not rule a row PASS against its own instrument's reading, so **X-2 stays open, read by REPORT `name-ink`**. The cause is not route code and not library paint:

- The migrated K2 keeps a consumer rest colour that MIGRATION never tells the consumer to delete. D′'s MIGRATION row lists "any selected paint (an outline, border, ring or fill, and `[data-state="on"]` ink rules)", not a rest ink on content. The floor's `--selection-ink` bullet says media "can stroke with it or with `currentColor`", which is true, and says nothing of content that sets its own colour.
- **Cure (floor and harness, route-neutral):** one MIGRATION sentence, "delete a rest colour on an option's content: the item's ink is already muted at rest, and an element that sets its own colour does not take the selected ink", and the harness's migrated K2 drops `color` from the shared `.tile-name` (or that block's `color` moves under `[data-arm="verbatim"]`). REPORT `name-ink` is then expected to read 2.66:1 light and 1.56:1 dark, the numbers the lift measured. **Not a library rule:** making content take the ink over its own colour would need an `!important` on consumer content, which is consumer-paint override (T-7) and a masking fallback (E-2).
- The dark figure is R-5's, reported: 1.56:1 is the stroke's own dark contrast, below 3:1. The selected state still separates in dark on the perimeter (T-3 migrated).

---

## 3 · The attacks this seat added

**`crit-p5`: the route's and the floor's MIGRATION write claims, spelled as a Tailwind consumer writes them** (`probes/crit-p5.mjs`). On the attack build's `specimen-migrated` (`.atk-tile`, a `<ToggleGroup shape="cell">`), item 0, read with FACT's reader and judge plus its content's clip, light and dark. The sheet declares `@layer theme, base, components, utilities`, so a utility is a rule in `utilities` and a `!` utility is that rule `!important`:

| cell | what is injected | want | `src` · `src-dev`, Chromium (Playwright WebKit the same) |
|---|---|---|---|
| control | nothing | tile, fact `flush` | tile 95.94×40.00, 16 px (0.80×h/2), column |
| group-utility-plated | `@layer utilities { .atk-tile { plated } }` | tile, fact `plated` | PASS |
| group-utility-none | the same with `none` | pill | a pill at h/2, one row |
| option-utility-bang | `@layer utilities { .atk-tile [data-item] { none !important } }` | refused | PASS: tile, fact `flush` (a layered `!important` in an earlier layer wins, so the pin in `components` beats `utilities`) |
| option-unlayered-bang | unlayered `.atk-tile [data-item] { none !important }` | refused | PASS |
| content-unlayered-bang | unlayered `.atk-tile [data-item] > * { none !important }` | refused, no content clipped | PASS: children `flush`, `overflow visible` |
| option-inline-bang (reported) | inline `none !important` on item 0, FV4-2's stated exception | agree | **the fact and the geometry DISAGREE**: fact `none`, a column tile on 16 px (0.73×h/2), the child clipped (`overflow hidden`, `padding-block 2.295px`), 40.00 → **43.97 px** |
| group-components-plated (reported) | `@layer components { .atk-tile { plated } }` | agree | agrees: fact `flush`, a tile. The route's writer is later in the layer, so a consumer `plated` written in the library's own layer has no effect. Not a claim the rows make |

The six gating cells hold in both flavours. MIGRATION's claims stand as written (E-3). The inline-`!important` cell goes to §4.1.

**`crit-sm-none` and `crit-lg-plated`** (§1.3) test `FV4` §3.1's test amendment. Both fail, as they should.

**Reach of the pin into non-group controls (code reading, not measured).** The flush plate rule `@container style(--selection-tile: flush) { .control-surface[data-state] { … } }` (`control-surfaces.css:100-106`) matches any stateful control whose parent's fact is `flush`. Inside a tile option the pin makes that fact unwritable, but the only other `.control-surface` in `src` is `SelectTrigger`. A SelectTrigger inside an option is an interactive descendant, which X-5 already names, so it is not built here.

---

## 4 · For the next pass (new classes; no row, not scored)

### 4.1 · FV4-2 advertises an escape that splits the readers

FV4-2's MIGRATION row ends "only an inline `--selection-tile: … !important` outranks that". `crit-p5` `option-inline-bang` measured what that write does, in both flavours, light and dark: the geometry still reads the group (`flush`: a column on the field corner, 16 px), while the label clip, the one-row law and the development name read the item (`none`). The content takes the pill's `overflow: hidden` and `padding-block: 0.15em`, and the tile grows 40.00 → 43.97 px. That is `D′c4` §2's split, by the one spelling the pin cannot refuse.

Floor v3 concedes inline `!important` for the corner on the same law (an inline `!important` is above every layer), and the row's sentence is literally true: it does outrank the pin. But it reads as an opt-out, and the result is incoherent. No H5 cell writes an inline `!important` (H5-2's `?w=` writes are normal declarations), so nothing gates it.

- **KISS cure (floor, route-neutral):** strike the clause, or say what it does ("and splits the option: do not").
- **Witness:** a FACT matrix value `none!` at `option` with a reported, not gating, judge.

### 4.2 · The transcription boundary is narrower than the scene

H5-5's XSCRIPT gates each route's `migrated.mjs`. `scenes.mjs`'s shared transcription blocks (K2's "layout and type" here, and the K1 and V1 blocks beside it) style every arm, and one carried consumer paint into the migrated arm unseen (§2). T-7's class, at the harness.

**Cure:** XSCRIPT also reads the shared blocks for paint properties outside `[data-arm="verbatim"]`, or the blocks keep layout and type only.

### 4.3 · Corroboration forks rot silently

The pass-4 `canon-fact.mjs` fork crashes on H5's CANON (§1.4), and `FV4` did not run it. It is no longer evidence (M-14, P-3), so the right move is to delete it, not repair it. That decision belongs to the agglomerator.

### 4.4 · Smaller notes

- **REPORT `kick`** reads 0.17 px at 300 px against a 4 px gap, in Chromium on both routes (`FV4`: 0.16). That is within run-to-run noise; floor-owned and reported (H4-6).
- **`FV4`'s fence note** said `FV4` did not re-run XSCRIPT. This seat did: 3/3, the same info lines.
- **D′'s `strip` and `f1` arms** colour their labels and glyphs with `var(--selection-ink)` (XSCRIPT info). MIGRATION licenses exactly that read for media, so this seat does not count it under T-7. H5-5 ruled the same spelling consumer paint on K2's name. The registry should pick one reading: either reading the token is the licensed pattern (then K2's struck rule was not paint), or it is paint (then `strip` and `f1` fail T-7). With §2's cure, K2 needs neither.

---

## 5 · The checklist (REGISTRY §P2-6.3), row by row

Rows are scored on the migrated arm, the gating unmigrated arm and the non-transcription library scenes, on this seat's sitting-2 runs.

### 5.1 · T-1..T-8

| row | reading | status |
|---|---|---|
| T-1 | migrated 15/15 · 18/18, 16.00 px at fine, coarse and `--ui-scale 1.25` | met |
| T-2 | 52/52 · 52/52 on `src` and `dist` | met |
| T-3 | migrated 40/43 · 40/43; C1 22.50 px² against 224 in every mode; shipped K1 0.00 | **open: owner** (Q-10; Q-5 for K1) |
| T-4 | migrated 24/24 · 24/24 | met |
| T-5 | migrated 38/38 · 38/38 on `src` and `dist` | met |
| T-6 | migrated 33/33 · 33/33 | met |
| T-7 | migrated 24/24 · 24/24; XSCRIPT 3/3 (no K2 paint) | met. §4.2 and §4.4 are next-pass |
| T-8 | migrated 27/27, one run over both engines; real Safari UNMEASURED (E-4's) | met |

### 5.2 · X-1..X-7

| row | reading | status |
|---|---|---|
| X-1 | states 54/54 (Playwright WebKit the same) | met |
| **X-2** | the media holds: K2's stroke takes the selection ink by `currentColor`, 2.66:1 light, 1.56:1 dark, no state rule (`crit-ink`). **The folded cell fails: REPORT `name-ink` 1.00:1** light and dark, both engines, both routes. The cause is the shared scene's consumer `.tile-name { color }` (§2) | **open, not owner. H5 cell: REPORT `name-ink`.** Cure in §2: floor (one MIGRATION sentence) and harness (the migrated K2) |
| X-3 | x3 2/2 (Playwright WebKit the same) | met |
| X-4 | V2 `type="multiple" shape="cell"` green on T-1 and T-3 migrated | met |
| X-5 | ATTACK `x5` 5/5 on `src-dev`, named before ready, both engines; desc 1/1 (Playwright WebKit the same) | met |
| X-6 | x6 1/1 (Playwright WebKit the same) | met |
| X-7 | tone 12/12 (Playwright WebKit the same) | met |

### 5.3 · FV-1..FV-10

| row | reading | status |
|---|---|---|
| FV-1 | T-5 and T-6 migrated green | met |
| FV-2 | T-2 52/52 · 52/52 on `dist`; `pill-row` 27/27 (Playwright WebKit the same) | met |
| FV-3 | calm-observer commit 1.03 at 84 ms (Chromium); T-6 migrated 33/33 · 33/33 | met |
| FV-4 | X-7 tone 12/12 | met |
| FV-5 | a11y 6/6 (Playwright WebKit the same) | met |
| FV-6 | T-5 arrows on every migrated grid, `src` and `dist` | met |
| FV-7 | ATTACK `src-dev` 5/5 · 5/5 (`x5` included) | met |
| FV-8 | PRT hover ΔE 0.0332 (Chromium) against 0.02 | met |
| FV-9 | `flush` by declaration, `plated` by a group rule: FACT-WRITE 12/12, `crit-p5` group-utility-plated | met (the look is G's) |
| FV-10 | `guard-gone` and `stamp-gone` each fail the shape case | met |

### 5.4 · R-1..R-10

| row | reading | status |
|---|---|---|
| R-1 | shipped K2 on `dist`: 3 rows in a 36 px pill, 4 boxes cut up to 24.64 px, silent; shipped K1 no carrier in light or PRT | **open: owner** (Q-5, Q-15) |
| R-2 | W-D 8/8 · 8/8; FACT matrix references `pill-in-option`, `tile-in-option` and `nested-group` ×3 values green, `src` and `src-dev` (Playwright WebKit the same); `crit-level` flips 2/2 | met |
| R-3 | commit cells green; the kick plant takes migrated 33/33 → 21/33 (Playwright WebKit the same) | met |
| R-4 | hover 9/9, F1 3/3 (Playwright WebKit the same) | met |
| R-5 | K2 stroke 2.66:1 light, **1.56:1 dark** (reported); the perimeter carries T-3 | met, reported |
| R-6 | 16.00 px at coarse and `--ui-scale 1.25`; `tile-geometry` 30/30 (Playwright WebKit the same); pills at h/2 | met |
| R-7 | **CANON** (R-7's one instrument since M-14) clean 4/4 on both routes, A, S, H, `layer`, `foreign`, `unlayered`, `cq` each fail, controls 4/4, both engines (Playwright WebKit the same); the route's canon unit fails A, S, H, I | met |
| R-8 | T-2 52/52 and CORNER 5/5 on `dist`; W-E `dist` 1/6 · 1/6 (no production signal under Q-5 (b)) | **open: owner** (Q-5) |
| R-9 | 2,936,815 B, +17,758 over the datum (§1.4) | met (stated); the rebind is Q-14's |
| **R-10** | FACT matrix 68/68 on `src`, `src-dev`, `dist` (Playwright WebKit the same): `item-none-in-tile`, `item-flush-in-pill`, `content-writes-none` and nested-option all pass in paint, with no false name on `src-dev`. `crit-level` 12/12 per flavour (`D′c4`'s counterexample now a coherent tile). The R-10 unit fails both second-writer plants | **met** (was open in pass 4) |

### 5.5 · E-1..E-4

| row | reading | status |
|---|---|---|
| E-1 | every witness, probe and carried instrument gave a verdict in both engines in one sitting, except the pass-4 `canon-fact.mjs` fork, which no longer runs (§4.3; not a row instrument) | met |
| E-2 | F1, V2, the sibling state, the interactive descendant, the keyed reorder, the deselectable single green; C1 T-3 0/3 · 0/3 | **open: owner** (Q-10) |
| E-3 | Each MIGRATION claim was re-measured: the declaration's pills/tiles (T-2, T-1), "a rule of yours on the group … writes over either" (`crit-p5` group cells, FACT `group`), the floor's write row (FACT `ancestor`, `wrapper`, `option`, `content`: 68/68; `crit-p5` option and content cells), "a group nested inside stays pills" (`pill-in-option`), the refusal (the shape plant), CORNER 5/5. §4.1's inline cell does what the clause literally says (it outranks); its consequence is unstated, not misstated | met |
| E-4 | **UNMEASURED (owner's safaridriver checkbox)**; FV4-1's `@scope` lower boundary is added to Safari's list | **open: owner** |

### 5.6 · G, the gestalt

Not re-filmed. Floor v4 and D′ add no paint value, so pass 3's and pass 4's frames stand: two concentric outlines on focused-selected (Q-3), and plated against flush barely separating in dark (Q-2). O-87 holds: no lighting layer. **Status: open, owner Q-2 and Q-3.**

### 5.7 · Tally

| block | met | not met |
|---|---:|---|
| T (8) | 7 | T-3 (owner: Q-10, Q-5) |
| X (7) | 6 | **X-2 (not owner: REPORT `name-ink`; floor and harness cure)** |
| FV (10) | 10 | |
| R (10) | 8 | R-1 (owner: Q-5, Q-15), R-8 (owner: Q-5) |
| E (4) | 2 | E-2 (owner: Q-10), E-4 (owner: checkbox) |
| G (1) | 0 | G (owner: Q-2, Q-3) |
| **total** | **33 / 40 (82.5 %)** | 7: six owner-blocked, one not |

Against pass 4 (`D′c4` §3.7, 33/40): R-10 is met, and X-2 is open. The score is the same, but the open non-owner row has changed. §P4-6.4's expectation (34/40, the fixed point) is not met. The one row between D′ and the fixed point is not D′'s code. Its cure is a MIGRATION sentence and a harness transcription line, and it applies to F identically (§2 measured both routes).

**Real Safari:** UNMEASURED (owner's safaridriver checkbox), every cell.

**Run hygiene.** Every guard, browser and server this seat started exited with its stage (`logs/chain.log` ends `ALL-CHAINS exit 0` and `crit-extra done`). The seat worktree is removed with `git worktree remove --force` before return. Builds stay in scratch under `.claude/worktrees/bl/D4/p5/D4-Dp-crit/out/`, and the run JSON this document quotes is banked in `crit/run-json.tgz`.
