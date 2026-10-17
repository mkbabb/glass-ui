# D4 · pass 4 · D4-F · critique: the anatomy declares the tile, on floor v3

| field | value |
|---|---|
| seat | D4-F adversarial critic, pass 4. Did not author the route. Re-runs every number the prototype scores on, both routes' shared attacks included (H4-1) and the D′ critic's `crit-level`, attacks the route's claims with new cells, and scores it on the fixed 40-row checklist only (REGISTRY §P2-6.3, unchanged by §P3-6.3). Adds no row, picks no winner |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | HEAD `791f19e74` (the prototype's commit), in a detached worktree at `.claude/worktrees/bl/D4/p4/D4-F-crit/wt` (`node_modules` and `tests-visual/node_modules` symlinked). `src` is unchanged since `9219651ed` (the prototype's base). `floor-v3.patch` (sha1 `f8f57677…`) applied clean, then `D4-F-proto.patch` (sha1 `991415c3…`, byte-identical to the spec's `route.patch`). After every plant, `git apply -R --check D4-F-proto.patch` was clean, so no plant was left in the sheet. The worktree was removed with `git worktree remove --force` before return |
| harness | H4 **`a26206b6a740`** (39 files) on every run JSON and unit line. No harness file was edited |
| engines | Chromium 149.0.7827.55 (Playwright's default headless shell) and **Playwright WebKit 26.5** (Playwright 1.61.1), headless, from `glass-ui/node_modules/playwright`. Playwright WebKit is not Safari. Every real-Safari cell: **UNMEASURED (owner's safaridriver checkbox)** (`D4-F-crit/logs/src-T-8-both.log`: "You must enable 'Allow remote automation' in the Developer section of Safari Settings") |
| machine | Every build, unit run, probe and browser run went through `~/.claude/guard/guarded --light --rss-gb 8`; every Playwright WebKit read ran inside ONE `--exclusive webkit` hold (`logs/webkit-all.log`: queued 01:30:51, admitted 01:42:49, done 02:21:15). One heavy run at a time, serial. 1-min load: builds and units 6.3-13.1; Chromium 9.1-27.7 (00:37 → 01:30); Playwright WebKit 11.8-31.3. Every log's first and last line carry the 1/5/15-min load. No commit cell failed on janky frames, so none was re-run and none is NOT-REPRODUCED |
| records | Everything under `pass-4/D4-F-crit/`: `run-crit.sh` (the prototype's driver re-pointed, plus the critic's stages), `probes/crit-f.mjs` and its compositions `probes/route-crit/` (new cells, §2), `probes/crit-units.test.ts` (copied into the worktree for one run and removed), `logs/` (every log cited), `run-json.tgz` (every run JSON this document quotes, 122 KB). Builds stay in `.claude/worktrees/bl/D4/p4/D4-F-crit/out/` |
| fences | No tracked source edited in the checkout. Git writes: `git worktree add` / `remove` of `D4-F-crit/wt`. Checkout writes: only this file and `pass-4/D4-F-crit/`. Nothing under `~/.claude` was read; the guard was only executed |

Citations: `Fs` / `Fp` are `D4-F-spec.md` / `D4-F-proto.md` (pass 4); `D′c` the pass-4 D′ critique; `FV3` is `FLOOR-V3.md`; `H4` is `H4.md`; `L/` is `D4-F-crit/logs/`. "A · B" is Chromium · Playwright WebKit.

---

## 0 · In brief

1. **Every number the prototype scores on reproduced, cell for cell, in both engines.** Migrated arm, A · B: T-1 15/15 · 18/18, T-2 52/52 · 52/52 (`dist` the same), T-3 40/43 · 40/43, T-4 24/24 · 24/24, T-5 38/38 · 38/38 (`dist` the same), T-6 33/33 · 33/33, T-7 24/24 · 24/24, T-8 27/27 (one run). The shared attack set: FACT 12/12 · 12/12, ATTACK 3/3 · 3/3 (`src-dev` 4/4 · 4/4), CORNER 5/5 · 5/5, each on `src` and `dist`. The route's own probe 52/52, 54/54, 52/52 (`src`, `src-dev`, `dist`) and 48/54 without the pin; the anatomy flip 10/10 on three flavours; the whole suite 2,351 ran with HEAD's 3 `boot-graph` failures; the route's 4 plants fail; the bundle 2,938,357 B to the byte.
2. **The pin re-opens the nesting reach the route closed, in the other direction.** `:where(.toggle-group__item, .toggle-group__item *) { --selection-tile: inherit !important }` reaches a `.toggle-group` inside an option and outranks that group's own reset. A pill ToggleGroup in a tile option's `#meta` becomes a set of tiles: its option reads fact `flush`, `16px → used 16.00 (0.78×h/2)`, a column, on `src`, `src-dev` and `dist`, light and dark, **2/2 per flavour in both engines** (`L/critf-*-{chromium,webkit}.log`, cell N3). With the pin removed it is a pill at h/2 (`L/critf-nopin-src-dev-*.log`, 24/24 · 24/24). It falsifies MIGRATION's "a tile group nested inside a pill group leaves the outer group pills **and the other way round**". This was the prototype's N-3, recorded as a code reading. It is now measured. R-2 and E-3 are open, and the route owns both (§2.1).
3. **R-7 does not pass on F's units.** Plant H (`.toggle-group__item:has(> * + *) { border-radius: 12px }`, `canon.mjs`'s own plant) passes F's whole unit set, `ToggleGroup.test.ts` plus `radius-role-canon.test.ts`, 62/62 (`L/unit-plant-canon-h.log`). Plants A and S fail it. The shared CANON reads 1/3 on the clean build in both engines (F3-1, blind). Only the route's own fork `canon-fact.mjs` fails H. The prototype's R-7 line cites "the route's unit … and its plants fail", but those four plants are the route's, not A, S or H. D′ carries a canon case that fails all three (`D′c` §3.4). F carries none (§2.2).
4. **What held under new attack** (§2.3): the anatomy arriving and leaving through Vue's reactivity, not DOM edits (tile → pills → tile and pills → tile → pills, 12/12 per flavour per engine, 0 false names on `src-dev`); `plated` written by the consumer on an anatomy group (a tile, fact `plated`, 16 px); a write on a wrapper between the group and its options (the readers agree: a one-row pill); a mixed set (every option a card); a consumer wrapper that forwards `#meta` with `<slot name="meta" />` renders no row when its caller supplies none (unit, 3/3).
5. **Score: 31 / 40 (77.5 %).** The six owner rows are open at their defaults (T-3, E-2, R-1, R-8, G, E-4). Three rows are open and not the owner's: R-2 and E-3 (one cause, the unbounded pin) and R-7 (no canon case on the route). **The route is not at its owner-gated fixed point.** Verdict **ADVANCE**: each cure is a few lines, and §3 states them.

---

## 1 · Re-run: what reproduced

Chromium: `L/battery-src-chromium.log` (00:37 → 00:52, load 9.1-18.6 at witness starts), then `L/chromium-all.log` (to 01:30). Playwright WebKit: one lock hold, `L/webkit-all.log` (01:42 → 02:21). The load is the 1-min load at the witness's start.

| witness | build | unmigrated · A · B | migrated · A · B | whole · A · B | load · A · B | `Fp` |
|---|---|---|---|---|---|---|
| T-1 | src | 3/6 · 3/6 | **15/15 · 18/18** | 20/42 · 23/45 (+12 unmeasured; library 5/27) | 10.69 · 23.83 | same |
| T-2 | src · dist | — | — | **52/52 · 52/52** · **52/52 · 52/52** | 11.09 · 18.48 | same |
| T-3 | src | 12/48 · 9/48 | **40/43 · 40/43** | 42/85 · 42/85 (+12 unmeasured) | 10.18 · 16.08 | same |
| T-4 | src | 3/24 · 3/24 | **24/24 · 24/24** | 36/54 · 36/54 | 9.31 · 30.14 | same |
| T-5 | src · dist | 20/37 · 20/37 | **38/38 · 38/38** (both builds) | 87/116 · 87/116; dist 88/117 · 88/117 | 9.36 · 23.55 | same |
| T-6 | src | 34/48 · 34/48 | **33/33 · 33/33** | 64/88 · 64/88 | 9.13 · 31.26 | same |
| T-7 | src | 4/32 · 4/32 | **24/24 · 24/24** | 24/24 · 24/24 | 16.35 · 23.33 | same |
| T-8 | src, one run | — | **27/27** | 27/39 (+13 unmeasured: library 12, real Safari 1) | 11.75 | same |
| W-A · W-B · W-C · W-D · W-E | src | — | — | 5/9 · 9/25 · 0/8 · 4/8 · 1/3, both engines | 16.1-17.6 · 26.6-28.5 | same |
| W-E | dist | — | — | 1/6 · 1/6 | — · 19.45 | same |
| CANON | src | — | — | **1/3 · 1/3** (F3-1) | 16.79 · 26.32 | same |
| FACT | attack src · dist | — | — | **12/12 · 12/12** · **12/12 · 12/12** | 16.79 · 25.39 | same |
| ATTACK | attack src · dist · src-dev | — | — | **3/3 · 3/3** · 3/3 · 3/3 · **4/4 · 4/4** | 17.90 · 24.35 | same |
| CORNER | attack src · dist | — | — | **5/5 · 5/5** · **5/5 · 5/5** | 18.61 · 24.16 | same |
| REPORT (not gating) | src | — | `kick` push **0.15 · 0.13 px** at 300 px against a 4 px gap (peak 1.0277 · 1.0275), 0.00 px at 204 px; `mark` dark **10.70 · 10.72:1** (`#dedbd7` over `#292825`), light 13.12 · 13.16:1 | reported | 17.92 · 26.32 | 0.14 · 0.14; mark the same |

**T-3's three misses** are C1's one-row pills, as in `Fp`. The shipped K1 arm and the K2 cut are R-1's (below).

**Probes and carried instruments**, A · B:

| instrument | reading | `Fp` |
|---|---|---|
| `f4-attack.mjs` on `fc-own-{src,src-dev,dist}` | 52/52 · 52/52, 54/54 · 54/54, 52/52 · 52/52 | same |
| the same, pin removed (`fcv-nopin-own-src-dev`) | 48/54 · 48/54 | same |
| the same, the `FV3` stub's child writer (Chromium) | 38/52; T-3 migrated 28/40; T-1 migrated 9/9 with 18 UNMEASURED | same |
| `selector-forms.mjs` | route form 12/13 · 12/13 (miss `nest3`); descendant 10/13, child 7/13, `@scope` 10/13 | same |
| `anatomy-flip.mjs` on `src`, `src-dev`, `dist` | 10/10 · 10/10 each | same |
| `crit-level.mjs` (`D′c`'s probe) on `src`, `src-dev`, `dist` | 8/12 · 8/12 each. The item cells and the controls pass. The 4 misses are `flip-cell-to-pill` and `flip-pill-to-cell`, which write `data-shape`, D′'s declaration, which F does not read | same |
| `canon-fact.mjs` clean; plants A, S, H | 3/3 · 3/3; 2/3, 2/3, 1/3 in both engines | same |
| `tile-geometry` · `pill-row` · `corner-gap` | 30/30 · 30/30 · 27/27 · 27/27 · 10/10 · 10/10 | same |
| `unmigrated.mjs` on `dist` | shipped K1 208.00×40.00, 1 row, nothing cut; shipped K2 207.00×36.00, 3 rows, **CUT 4 boxes up to 24.64 · 24.86 px**, silent | same |
| `states.mjs` states / hover / hover-f1 / a11y | 54/54 · 54/54; 9/9 · 9/9; 3/3 · 3/3; 6/6 · 3/3 (Playwright WebKit: contrast only) | same |
| `states.mjs` ink (reported) | K2 stroke 2.66:1 light, 1.56:1 dark, both engines; K2 name 1.00:1 (`Fp` N-4) | same |
| `crit.mjs` x3 / x6 / tone / desc (`src-dev`) | 2/2 · 2/2; 1/1 · 1/1; 12/12 · 12/12; 1/1 · 1/1 | same |
| R-3 plant (`pop0`, the kick deleted) | T-6 64/88 → **44/88 · 44/88**, migrated 33/33 → **21/33 · 21/33** | same |
| `p3.mjs` forced / cost | mark under forced colours 19.04 · 10.54:1. Cost ratio of minima **1.10** in Chromium (12.5 against 11.4 ms, load 18.7). `Fp` read 1.05 / 0.97 / 1.01. Playwright WebKit's clock reads 0.0 ms on both arms: UNMEASURED by this clock | ratio higher this sitting (§4) |

**Units** (H4-3 `unit.mjs`, config `f70c44e4`): `vue-tsc --noEmit` exit 0 (`L/tsc-app.log`). The test project exits 0 once `dist/` exists (`L/tsc-test.log`). Before the library build it failed only on the two `@mkbabb/glass-ui/fourier-math` self-imports (`L/tsc-test-before-dist.log`), as `FV3` §3 recorded. The whole suite ran **2,351 cases: 2,348 passed, 3 failed** (`gate:boot-graph`, HEAD's own), 1 skipped (`L/unit-all.log`). `unit.mjs --selftest` passed. The route's plants: `rows-on-slot-function`, `second-writer`, `pin-not-important` and `mark-off-fact` each fail their case (`L/unit-plant-*.log`). Clean before and after: 62/62.

**Bundle** (`L/bundle.log`): 2,938,357 B unpacked, 843 files; `dist/` 2,545,932 B; JS gzip-9 330,782 B; +19,300 over the ratchet datum. This equals `Fp` §4 to the byte.

**Engines and stalls.** No hang, no engine failure, no NOT-REPRODUCED and no HARNESS ERROR in either engine. The one grep match is W-E's title line ("installs"). Playwright WebKit retired its browser at H3-1's 60-navigation cap once each in T-1, T-3, T-4, T-5 and T-6, as designed.

---

## 2 · The attacks

### 2.1 · The pin reaches a group inside an option (R-2, E-3)

The route's pin (`styles.css`, "THE FACT IS THE GROUP'S") is `:where(.toggle-group__item, .toggle-group__item *) { --selection-tile: inherit !important; }`. `.toggle-group__item *` matches every element inside an option, and a nested `ToggleGroup` root is one of them. The floor resets the fact with a normal declaration on every `.toggle-group`. The pin's `!important` in `@layer components` outranks that reset, so the nested group inherits the outer option's `flush`, and its own options inherit it in turn.

`probes/crit-f.mjs`, cell **N3** (composition `route-crit/` `v2`): an outer group of two options that fill `#meta`. In option 0, the `#meta` content is a two-item pill `ToggleGroup`.

| cell | reading, identical on `src`, `src-dev`, `dist`, light and dark, Chromium and Playwright WebKit | verdict |
|---|---|---|
| N3, the inner option | **item fact `flush`, group fact `flush` · 40.00×40.94 · `16px → used 16.00 (0.78×h/2)` · column** | **FAIL, 2/2 per flavour per engine** |
| N3, the outer option | a tile on the field corner, 122.00×93.88, 16 px | PASS |
| N3 with the pin removed (`fcv-nopin-crit-src-dev`) | the inner option a pill at h/2, 40.00×40.00, `9999px → used 20.00`, row, fact `none` | PASS, 24/24 · 24/24 for the whole probe |

**Why it is scored.** §P3-6.3 folds "nesting reach" into R-10 and R-2, and the pin is route code (`Fs` §1.3, `Fp` F-6). The composition is an interactive descendant inside an option. The floor supports that composition: it names it in development (X-5), and E-2's H-10 interactive-descendant scene gates on production. MIGRATION's route row makes the claim this falsifies: "an option belongs to its nearest group, so a tile group nested inside a pill group leaves the outer group pills and the other way round". FACT's `pill-in-tile` cell places the nested group beside the options, never inside one, so FACT 12/12 does not read it. The prototype recorded it as N-3, "not measured by any probe here". The route's spec chose the pin to close the D′ critic's two-element class (§1.3). The pin closes that class and opens this one.

**Not measured here:** whether `src-dev` names N3 as an interactive descendant. `crit-f.mjs` counts console errors from the first frame after load, and the X-5 name fires at mount.

**Two rows, one cause.** R-2 fails on the nesting-reach cell. E-3 fails on the MIGRATION sentence. One cure closes both (§3). If the agglomerator counts one cause once, the route reads 32/40.

**For harmonisation.** `D′c` §4 proposes the same pin for the floor, in the form `.toggle-group__item { --selection-tile: inherit !important; }`. That form pins only the option, not its content. It would not reach a nested group's root, but it leaves the D′ critic's "content writes none" cell open, which F's `.toggle-group__item *` arm exists to close (`f4-attack` `preset` «content-writes-none»). N3 has not been run on D′. D′ carries no pin, so it should read a pill there.

### 2.2 · R-7: the canon plants on F's units

`run-crit.sh unit-plants`. Each plant is spliced into `toggle-group/styles.css` before the pin, inside `@layer components`, on the route's canon spelling (`route.json` → `canon.sel`). It is run against `ToggleGroup.test.ts` and `tests/styles/radius-role-canon.test.ts` together, then restored:

| plant | units (62 cases) | engine (`canon-fact.mjs`, A · B) | shared CANON |
|---|---|---|---|
| A `:is(<sel>) { border-radius: 12px }` | **FAIL** 1: "one rule writes the tile fact" (a second rule reads the anatomy) | 2/3 · 2/3 | 1/3 on clean already |
| S `.toggle-group[data-size="sm"] :is(<sel>) { border-radius: var(--radius-panel) }` | **FAIL** 1, the same case | 2/3 · 2/3 | — |
| **H** `.toggle-group__item:has(> * + *) { border-radius: 12px }` | **PASS 62/62** (`L/unit-plant-canon-h.log`) | 1/3 · 1/3 (fails the tile and the pill cells) | — |

Plant H names no anatomy class, so the route's "no other rule reads the anatomy" check does not see it. `radius-role-canon.test.ts` pins the item's base stadium rule and nothing that reaches a two-child item. It is a real corner change: H is `(0,1,0)`, the same as the base item rule and later in the sheet, so every pill with two children (an icon and a label) would take a 12 px corner. `canon-fact.mjs` reads exactly that.

The row reads "the canon unit fails plants A, S and H". On F, no unit fails H, and the shared instrument cannot read the row (F3-1). The one instrument that fails H is the route's own fork of CANON. A critic may not rule the row PASS against the shared instrument's reading (§P2-6.3), and the unit does not supply the reading either. **R-7: open, not owner-blocked.** `D′c` §3.4 scored D′'s R-7 met on D′'s route canon case, which fails A, S and H. F has no such case, and that is the difference.

### 2.3 · What held

`probes/crit-f.mjs` (the other cells) and `probes/crit-units.test.ts`. Every cell below reads the same on `src`, `src-dev` and `dist` in both engines.

| cell | what it does | reading | verdict |
|---|---|---|---|
| VF | every `#meta` is `v-if` on the scene's `order` ref; `__tile.reorder()` twice | tile 204.00×66.58, 16 px, 1 library row → pill 204.00×40.00 at h/2, 0 rows, mark 0 px → tile again; 0 console errors on `src-dev` | PASS 6/6 per flavour |
| VR | every `#media` fills, then empties, the same way | pill 59.63×40.00 → tile 74.00×68.94, 16 px, mark 18 px → pill | PASS 6/6 |
| PL | the consumer writes `--selection-tile: plated` on an anatomy group | tile, item and group fact `plated`, 122.16×67.88, 16 px | PASS 2/2 |
| WN | the consumer writes `none` on a `div` between the group and its options | group `flush`, option `none`, a one-row pill at h/2, nothing past the box. The readers agree; the write is refused at the option, as the floor's wrapper rule expects | PASS 2/2 |
| MX | option 0 fills `#meta`, options 1-3 are bare labels | every option a tile, the bare one 129.03×67.88, 16 px, 1 text row (MIGRATION: "every option in it is a card") | PASS 4/4 |
| units | a `#meta` row leaves and returns with its `v-if`; a `#media` row arrives with a `v-for` that fills; a wrapper that forwards `#meta` with `<slot name="meta" />` renders no row when its caller gives none, and one when it does | 3/3 (`L/unit-plant-crit-cases.log`) | PASS |

`crit-level`'s item cells (`D′c` §2) agree on F in both engines and every flavour: an inline `none` on a tile's option still computes `flush`, and an inline `flush` on a pill's option computes `none`. So the D′ critic's R-10 class does not land on F.

---

## 3 · The checklist (REGISTRY §P2-6.3), row by row

Rows are scored on the migrated arm, the gating unmigrated arm and the non-transcription library scenes, on this seat's runs. Under F a transcription arm fills no slot, so its pills are R-1's.

### 3.1 · T-1..T-8

| row | reading (this seat) | status |
|---|---|---|
| T-1 | migrated 15/15 · 18/18, 16.00 px at fine, coarse and `--ui-scale 1.25` | met |
| T-2 | 52/52 · 52/52 on `src` and `dist`, H4-2's late cells included | met |
| T-3 | migrated 40/43 · 40/43; C1 has no carrier in any mode; shipped K1 has none in light or PRT | **open: owner** (Q-10; Q-5 for K1) |
| T-4 | migrated 24/24 · 24/24 | met |
| T-5 | migrated 38/38 · 38/38 on `src` and `dist` | met |
| T-6 | migrated 33/33 · 33/33 | met |
| T-7 | migrated 24/24 · 24/24 | met |
| T-8 | migrated 27/27 in one run over both engines; real Safari UNMEASURED (owner's safaridriver checkbox), which is E-4's | met |

### 3.2 · X-1..X-7

| row | reading | status |
|---|---|---|
| X-1 | states 54/54 · 54/54 | met |
| X-2 | the K2 stroke follows `--selection-ink` through `#media`: 2.66:1 light, both engines; T-3 and T-7 migrated green with no `[data-state="on"]` rule. The K2 name stays at 1.00:1 (`Fp` N-4). The row asks for the media | met |
| X-3 | x3 2/2 · 2/2 | met |
| X-4 | V2 `type="multiple"` green on T-1, T-3 and T-7 | met |
| X-5 | desc 1/1 · 1/1 on `src-dev`; ATTACK `src-dev` 4/4 · 4/4 | met |
| X-6 | x6 1/1 · 1/1 | met |
| X-7 | tone 12/12 · 12/12 | met |

### 3.3 · FV-1..FV-10

| row | reading | status |
|---|---|---|
| FV-1 | T-5 and T-6 migrated green, both engines | met |
| FV-2 | T-2 52/52 · 52/52 on `dist`; `pill-row` 27/27 · 27/27 | met |
| FV-3 | the calm-observer commit inside T-6 33/33 | met |
| FV-4 | X-7 | met |
| FV-5 | a11y 6/6 · 3/3; the forced-colours mark 19.04 · 10.54:1 | met |
| FV-6 | T-5 arrows on every migrated grid, `src` and `dist` | met |
| FV-7 | ATTACK `src-dev` 4/4 · 4/4; the route's own probe 54/54 · 54/54 on `src-dev`; the reactive flip 0 errors | met |
| FV-8 | PRT hover inside T-6 33/33 | met |
| FV-9 | `flush` from the anatomy; `plated` by a consumer write, on an undeclared group (FACT `fact-plated`) and on an anatomy group (§2.3 PL) | met (the look is G's) |
| FV-10 | the route adds no value to guard; the floor's guards are in the whole suite | met |

### 3.4 · R-1..R-10

| row | reading | status |
|---|---|---|
| R-1 | shipped K2 on `dist`: 3 rows in a 36 px pill, 4 boxes cut up to 24.64 · 24.86 px, silent; shipped K1 has no carrier in light or PRT | **open: owner** (Q-5, Q-15) |
| **R-2** | FACT's three nesting cells, the route's own probe (wrappers, both directions), the anatomy flip and the reactive flip all pass. **The nesting cell §2.1 fails:** a pill group inside a tile option's `#meta` wears the tile, 2/2 per flavour per engine, and reads a pill without the pin | **open, not owner-blocked** (route: the pin's reach) |
| R-3 | the commit cells are green; the kick plant takes migrated 33/33 → 21/33 in both engines | met |
| R-4 | hover 9/9 · 9/9, F1 3/3 · 3/3 | met |
| R-5 | K2 stroke 2.66:1 light, **1.56:1 dark** (reported); the perimeter and the mark carry T-3 | met, reported |
| R-6 | 16.00 px at coarse and `--ui-scale 1.25`; `tile-geometry` 30/30 · 30/30; pills at h/2 | met |
| **R-7** | the units fail A and S and **pass H, 62/62**; shared CANON 1/3 on clean (F3-1); only the route's `canon-fact.mjs` fails H (§2.2) | **open, not owner-blocked** (route: no canon case; harness: H5) |
| R-8 | T-2 52/52 and CORNER 5/5 on `dist`; W-E `dist` 1/6 · 1/6 (no production signal under Q-5 (b)) | **open: owner** (Q-5) |
| R-9 | 2,938,357 B, +19,300 over the datum | met (stated); the rebind is Q-14's |
| R-10 | one rule writes the fact (unit, plant `second-writer` fails); FACT 12/12 · 12/12 on `src` and `dist`; `crit-level`'s item cells agree in both engines; the pin's plant fails the unit. N3 is not a split: every reader in it reads `flush`. It is a reach, so it is scored on R-2 | met |

### 3.5 · E-1..E-4

| row | reading | status |
|---|---|---|
| E-1 | every witness, probe and carried instrument gave a verdict in both engines in one sitting each; no stall | met |
| E-2 | F1, V2, the sibling state, the interactive descendant, the keyed reorder and the deselectable single are green; C1 T-3 0/3 · 0/3 | **open: owner** (Q-10) |
| **E-3** | Most claims hold: CORNER 5/5 · 5/5 on `src` and `dist`; the unfilled-slot sentence (ATTACK `empty`, the route's `c1`, the unit, and the forwarded slot in §2.3); "written on an option or inside it, it has no effect" (`crit-level`, `f4-attack` `preset`); "every option in it is a card" (MX); the pill clause (T-2 on `dist`). **One claim is falsified:** "a tile group nested inside a pill group leaves the outer group pills **and the other way round**" (§2.1, N3) | **open, not owner-blocked** (route) |
| E-4 | **UNMEASURED (owner's safaridriver checkbox)** | **open: owner** |

### 3.6 · G, the gestalt

Not re-filmed. The row is owner-blocked (Q-2, Q-3), the route adds no lighting layer (O-87), and the machine law asks for only the screenshots a reading needs. Reading the prototype's stills (`D4-F-proto/glance-pair/specimen-dark-fine-chromium-pair.jpg`): the tiles read as cards. Focused-selected shows two concentric outlines (Q-3). The check sits on the selected sparkline's end point in the block-start / inline-end corner (`Fp` N-5), so the mark covers the one datum the K2 tile is about. The selected name keeps its unselected ink (`Fp` N-4). **Status: open, owner Q-2 and Q-3.**

### 3.7 · Tally

| block | met | not met |
|---|---:|---|
| T (8) | 7 | T-3 (owner) |
| X (7) | 7 | |
| FV (10) | 10 | |
| R (10) | 6 | R-1 (owner), R-8 (owner), **R-2 (route)**, **R-7 (route / H5)** |
| E (4) | 1 | E-2 (owner), E-4 (owner), **E-3 (route)** |
| G (1) | 0 | G (owner) |
| **total** | **31 / 40 (77.5 %)** | 9: six owner-blocked, three not |

The prototype claimed 34. The difference is R-2, E-3 (one cause) and R-7. **Not converged, and not at the owner-gated fixed point.** If the agglomerator counts N3 once, the reading is 32/40. If it accepts `canon-fact.mjs` as R-7's instrument until H5, the reading is 33/40 (32/40 with N3 counted once).

---

## 4 · What would close the three rows outside the owner's

**R-2 and E-3: bound the pin at a nested group.** Neither form below was built or measured here.
- **@scope form.** Wrap the pin in `@scope (.toggle-group__item) to (.toggle-group) { :scope, :scope * { --selection-tile: inherit !important; } }`. A lower boundary leaves the nested group and its subtree to their own reset and writer. The nested group's own options are scope roots of their own, so they are pinned again to their nearest group. `Fs` §1.2 found that `@scope` does not bound a `:has()` argument, but this is a subject, which `@scope` does bound.
- **Selector form.** Use `:where(.toggle-group__item, .toggle-group__item *):not(.toggle-group__item .toggle-group, .toggle-group__item .toggle-group *)` plus a second rule for the nested items.

Either form has to keep `f4-attack` `preset` (48/54 → 54/54) and `crit-level`'s item cells, and turn N3 green. **Witness:** promote N3 into FACT (H5) as `pill-in-option` and `tile-in-option`, with the unbounded pin as the plant.

**R-7: a canon case on the route's unit.** Add a case that walks every rule declaring a corner and reaching `.toggle-group__item`, and allows exactly the floor's base stadium, the floor's `@container not style(--selection-tile: none)` field corner and `inherit`. That is the shape of D′'s case. Then plants A, S and H, run through `unit.mjs`, must each exit 1. Or H5 cures CANON's container blindness (F3-1) with H, plus `D′c` §5.2's two plants, as plants. Then CANON is again the one R-7 instrument for both routes (P-3).

After these cures the route reads 34/40, the six owner rows.

---

## 5 · For pass 5's record (not scored)

- **`D′c` §5.2's two extra plants pass F's units too.** `layer` (an unlayered `.toggle-group { --selection-tile: none }` after the layer, which kills every tile) passes 62/62 (`L/unit-plant-layer.log`). `foreign` (`.pill-row.control-surface { border-radius: 12px }`) passes 62/62 (`L/unit-plant-foreign.log`). The class is the same on both routes and belongs with the H5 CANON cure.
- **If the pin moves to the floor** (`Fs` R-6, `D′c` §4), N3 moves with it and reaches D′. H5's FACT cell should read both routes.
- **The `:has()` cost read 1.10** this sitting (Chromium, load 18.7; minima 12.5 ms against 11.4 ms). `Fp` read 1.05, 0.97 and 1.01. One reading above the prototype's spread is not a separator, but `Fs` R-5's "noise around 1" now spans 0.97-1.10. Playwright WebKit's clock still reads 0.0 ms.
- **REPORT `kick`** is 0.15 · 0.13 px at 300 px against a 4 px gap: the floor's, reported (H4-6).
- **The mark on K2 covers the curve's end point** in every specimen still (§3.6). That is G's, under Q-3. FV3-6's room gate measures width, not what lies under the mark.
- **X-5 on N3 in development** is unmeasured (§2.1). The next probe should count errors from navigation, not from load.

**Real Safari:** UNMEASURED (owner's safaridriver checkbox), every cell. The engine facts on this route that only Safari can settle: `:has()` with a complex `:not()`, `@container style()` on a registered property, `mask-composite: exclude`, the percentage `min()` room gate, and (for §4's cure) `@scope` with a lower boundary.

**Run hygiene.** Nothing this seat started is left running. Every guard, browser and server exited with its stage (`L/chain-chromium.log` ends `CHROMIUM-DONE`, `L/webkit-all.log` ends `exit 0`, `L/chain-webkit.log` ends `BUNDLE-DONE`). The worktree was removed with `git worktree remove --force`, and `git worktree list` shows none of this seat's. Builds and run JSON stay in `.claude/worktrees/bl/D4/p4/D4-F-crit/out/`. The JSON every number here rests on is banked in `D4-F-crit/run-json.tgz`.
