# D4 · pass 4 · D4-F spec: the anatomy declares the tile, on floor v3

| field | value |
|---|---|
| seat | D4 pass 4, SPEC seat for route D4-F (a filled `#media` / `#meta` writes `--selection-tile`). It answers the route's open rows outside the owner's (REGISTRY §P3-6.4: E-3 empty anatomy, the nesting reach, and R-10 / FV-2 / E-3's pill clause as floor v3 left them) with probes on HEAD + floor v3, and specs the route against the fixed 40-row checklist (§P2-6.3, unchanged by §P3-6.3). It read no other route's pass-4 file. It knows one D′ pass-4 finding only through `FORMATION-PROGRESS.md` (the critic's "fact read at two elements" attack, which that line says F carries) and built its own probe for that class (§2.4) |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | detached worktree at `0ce3bb028` (`.claude/worktrees/bl/D4/p4/D4-F-spec/wt`). The task named `9219651ed`; `git diff --stat 9219651ed 0ce3bb028 -- src package.json tests MIGRATION.md demo` is empty, so this is the library source every pass-3 and pass-4 seat measured. `floor-v3.patch` (sha1 `f8f57677`) applied first, `git apply --check` clean, 38 paths |
| patch | `D4-F-spec/route.patch`: the route over HEAD + floor v3. 5 files, +286 / −4, sha1 `991415c3`. `D4-F-spec/probes/mkpatch.sh` regenerates it from the worktree with no git write (each file's floor-v3 base is HEAD's blob plus that file's section of `floor-v3.patch`, applied by `patch` in a scratch dir) |
| defaults built | every unruled owner question at its P3-5 default: Q-1 (a) 16 px; Q-2 (b) flush (`plated` one value away); Q-3: the floor's perimeter plus the route's own mark (P3-6.1: "the mark, unless Q-3 moves it to the floor"; FV3-6 is not built); Q-4 (b); Q-5 (b)+(d); Q-6 (a); Q-7 (a); Q-8 (a); Q-9 (a); Q-10 (b); Q-12 (c); Q-15 unruled. O-87 binds the paint: the route adds no colour, shadow, blur or lighting layer; its one paint is the mark, a carrier of state |
| harness | **H4 `a26206b6a740`, 39 files**, on every battery, unit and attack line. It is `e40bfd8801ef` plus `10c89b18c`'s two-line `lib.mjs` change (Chromium is the headless shell by default; the BL WebKit lock retired in favour of `guarded --exclusive webkit`). No witness or judge changed. No file under `../harness/` was edited |
| engines | Chromium 149.0.7827.55 (headless shell) and **Playwright WebKit 26.5** (Playwright 1.61.1), headless, from `glass-ui/node_modules/playwright`. Every WebKit number here is Playwright WebKit. Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)** |
| machine | every build, unit run, probe and browser run went through `~/.claude/guard/guarded --light --rss-gb 8`; every Playwright WebKit read through `--exclusive webkit`, the WebKit stage in one lock hold. One heavy run at a time. 1-min load: 6.4-34.3 across the seat (each log's first and last line carry it). **The WebKit lock held this seat 84 min and then 9 min** (§6), so the WebKit stage was cut to the route-sensitive witnesses. No commit cell failed on janky frames, so no cell needed a re-run and none is NOT-REPRODUCED |
| records | all under `pass-4/D4-F-spec/`: `route.patch`; `route/route.json` (the route's harness contract; its migrated arms are pass 3's `../../pass-3/D4-F-spec/route/migrated.mjs`, referenced, not copied); `run-f4.sh` (the driver, one stage per call); `probes/` (`selector-forms.mjs`, `f4-attack.mjs` with its compositions `route-f4/`, `canon-fact.mjs`, `mkpatch.sh`, `variants/`); `logs/` (every log cited). Run JSON and builds stay in scratch (`.claude/worktrees/bl/D4/p4/D4-F-spec/out/`) |

Short citations: `FV3` is `FLOOR-V3.md`, `H4` is `H4.md`, `Fs3` / `Fp3` / `Fc3` the pass-3 F spec, prototype and critique, `L/` is `D4-F-spec/logs/`.

---

## 0 · In brief

1. **After floor v3 the route is one rule that writes the fact, two slots, and the mark.** The writer is `.toggle-group:has(.toggle-group__item > :is(.toggle-group__media, .toggle-group__meta):not(.toggle-group .toggle-group *))`, plus its one-level-nested twin (§1.2). The floor supplies everything else a tile is (corner, column, pad, leading, row height, perimeter, flush plate, the pill law's absence, the names). A row renders only when its slot yields content (§1.1).
2. **The floor's suggested writer would break the consumer.** `FV3` §5 tells the F seat to use the floor stub's direct-child `:has(> .toggle-group__item > …:not(:empty))`. K2 (the easing specimens, `<section>` per family > grid `<div>` > item) and V1 (family `<div>` > tiles `<div>` > item) put wrappers between the group and its options, and so does a `display: contents` host. The stub's FACT 12/12 never read them. Measured:
   - static CSS probe (`selector-forms.mjs`): the direct-child form misses K2's, V1's, a `display: contents` and a five-wrapper composition, 7/13 in both engines (`L/selector-forms-*.log`);
   - in the library, with the stub's writer swapped in (`variants/writer.child`): the route's own wrapped tiles read pills at `9999px → used 20.00`, 38/52 (`L/own-child-src-chromium.log`), and **T-3's migrated arm falls from 40/43 to 28/40** (`specimen-migrated` 0.00 px² against 241 in light, dark and PRT; `L/child-t3-selected-separates-chromium.log`); T-1 reads K2 and V1 as never past their rung (18 UNMEASURED, `L/child-t1-corner-stops-chromium.log`).
3. **The nesting cure is the row's own group, not a direct child.** `@scope (.toggle-group) to (.toggle-group)` does not bound a `:has()` argument in either engine (9/11 then 10/13, it reaches through like the plain descendant form). Counting groups above the row does: a top-level group counts rows under exactly one group, a nested group rows under exactly two. It passes every wrapper case and both nesting directions (12/13 in both engines; the one miss is a group three groups deep, which reads pills, by design, §1.2).
4. **Empty anatomy is pills, in four spellings.** A false `v-if`, a `v-for` over nothing, blank text and an empty slot render no row, so the group stays pills: ATTACK `empty` 2/2 and the route's own `c1` cells 10/10 per mode in both engines (§2.3).
5. **The fact is now the group's at every element that reads it.** With no pin, an option that writes `--selection-tile: none` inside a tile wears the tile's corner over a pill's content law and a false development name; content that writes it does the same to its subtree (6 FAIL, `L/own-nopin-src-dev-chromium.log`). A one-line pin (`:where(.toggle-group__item, .toggle-group__item *) { --selection-tile: inherit !important }`) closes it: 54/54 (§2.4). It is floor-shaped and cures the same class on D′.
6. **The battery reads as pass 3's on every migrated cell, both engines, on every witness read in both** (§2.2; T-4, T-6 and the W rows were read in Chromium only, §6), with FACT 12/12, ATTACK 3/3 (`src-dev` 4/4), CORNER 5/5 on `src` and `dist`, and T-2 52/52 on `src` and `dist`. **CANON reads 1/3**, the instrument's F3-1 blind spot; the route's own container-aware read (`canon-fact.mjs`) reads 3/3 clean and fails plants A, S and H.
7. **Projection: 34 / 40, the owner-gated fixed point.** The six open rows all wait on the owner and are built at their defaults: T-3 and E-2 (Q-10), R-1 (Q-5, Q-15), R-8 (Q-5), G (Q-2, Q-3), E-4 (the checkbox). No route-owned or floor-owned row is open on this reading (§4).

---

## 1 · The mechanism

Line numbers are in the patched tree (HEAD + `floor-v3.patch` + `route.patch`).

### 1.1 · Anatomy: `src/components/toggle-group/ToggleGroupItem.vue`

- `:57-62` `defineSlots` gains `media` (a row above the label) and `meta` (a row below it). No prop, no value: `refuseUnknown` (FV-10) has nothing of the route's to guard.
- `:65-80` **`yields()`, the E-3 cure.** A slot is filled when it yields a vnode other than a comment, blank text or an empty fragment, recursing into fragments. Pass 3 rendered on `v-if="$slots.meta"`, which tests that the slot function exists (`Fc3` §2.2: a `#meta` whose content was a false `v-if` made the set tiles, 4/4). A child component counts as content whatever it renders; MIGRATION says so (§5).
- `:250`, `:252` each row renders in a library-marked `<span class="toggle-group__media | __meta">` only when `yields($slots.<name>?.())`. The slot is called in render, so it is tracked.
- `:195` the development name for a pill asking for a second row now says where the row goes (`#media` / `#meta`). The floor's name logic is otherwise untouched.

### 1.2 · The writer: `src/components/toggle-group/styles.css:216-242`

```css
.toggle-group:has(.toggle-group__item
    > :is(.toggle-group__media, .toggle-group__meta):not(.toggle-group .toggle-group *)),
.toggle-group .toggle-group:has(.toggle-group__item
    > :is(.toggle-group__media, .toggle-group__meta):not(.toggle-group .toggle-group .toggle-group *)) {
    --selection-tile: flush;
}
```

- **What it reads.** A library row as a direct child of an option, so a `.toggle-group__meta` class a consumer puts inside slotted content is not anatomy (`selector-forms` `rowInContent`, none, both engines).
- **Whose option.** "Its own" means the row's nearest group. Inside `:has()` the `:not()` is a document-level complex selector, so a row with two group ancestors is excluded from a top-level group's count, and the nested twin counts rows with exactly two. Wrappers are unbounded; group nesting is bounded at two. A radiogroup nested in a radiogroup is already outside ARIA's model, and a third level reads pills (`nest3`, the one miss, both engines), which fails safe: no reach upward, and its options are clipped to one row, which the development name reports.
- **What it does not do.** It writes the fact and nothing else. The tile's geometry is floor v3's `@container not style(--selection-tile: none)` rule (`:199-214`). The route adds one declaration to that rule, `--toggle-group-marked: 1` (`:212`), so the mark reads the fact like the perimeter does (§1.4). The floor's sheet unit pins that rule with `toEqual`, so the route updates that one expectation.

**The forms measured** (`probes/selector-forms.mjs`, static page, no library; `L/selector-forms-{chromium,webkit}.log`, load 19.7-26.8; identical in both engines):

| form | direct | K2 wrap | V1 wrap | `contents` | 5 wrappers | none | tile in pill | tile in pill, direct | pill in tile | both tiles | 3 deep | content class | dynamic append/remove | total |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| descendant (pass 3) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ | ✓ | ✓ | ✗ | ✓ | ✓ | 10/13 |
| direct child (the `FV3` stub) | ✓ | ✗ | ✗ | ✗ | ✗ | ✓ | ✓ | ✓ | ✓ | ✗ | ✓ | ✓ | ✗ | 7/13 |
| `@scope (…) to (.toggle-group)` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ | ✓ | ✓ | ✗ | ✓ | ✓ | 10/13 |
| not-nested (`:not(:has(.toggle-group …))`) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ | ✓ | ✓ | ✓ | 12/13 |
| three-wrapper chain | ✓ | ✓ | ✓ | ✓ | ✗ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 12/13 |
| **groups above the row (the route)** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ (pills) | ✓ | ✓ | **12/13** |

The route's form is the one whose miss is a composition no consumer can legally write; the chain's miss (a fourth wrapper) is ordinary layout.

### 1.3 · The fact is the group's: `styles.css:244-253`

`:where(.toggle-group__item, .toggle-group__item *) { --selection-tile: inherit !important; }`. Floor v3 reads the fact at two elements: the tile geometry on the option's parent (a style query evaluates against the container, the parent), and the pill law, the pill's clip and the development name on the option or its content. A value written on an option, or inside one, split the two. `!important` in `@layer components` outranks every normal declaration and unlayered `!important`, so only an inline `!important` beats it, the same exception the floor's corner has. A nested `ToggleGroup` inside an option is pinned too; that is an interactive descendant, already named in development (X-5).

### 1.4 · The mark: `styles.css:255-306`, `:378-379`, `:465-470`

Pass 3's mark (a disc of `--selection-edge` with a check cut through it by `mask-composite: exclude`, block-start / inline-end, opacity 0 → 1 on the engage clock and `scale` 0.4 → 1 on `--spring-press`, the 3.5-mark room gate), now keyed on the fact instead of the anatomy selector:
- the size is `--toggle-group-mark` (1.125 rem; `sm` 0.875 rem, a value written by the size rule at `:378`, never a declaration), multiplied by `--toggle-group-marked`, which only the floor's tile rule sets to 1. A pill's `::after` is 0 × 0;
- forced colours: `HighlightText` on the `Highlight` plate (`:465-470`), pass 3's 19.04:1 / 10.54:1 form;
- the rows: `.toggle-group__media` a stretched flex row, `.toggle-group__meta` weight 400 (`:300-307`). Both inherit `--selection-ink` (X-2).

### 1.5 · What the route does not change

The engine, the walk, ARIA, the kick, the tone, the hover, the perimeter, the flush plate, `accessibility.css`, FadingScroll, `inheritAttrs`: all floor v3's, unchanged. The three M-10 fixes and the tile geometry that pass 3's F patch carried are gone from the route (`FV3` §5: "Remove D′'s and F's own copies").

---

## 2 · What was measured

### 2.1 · Typecheck, unit, build, bundle

| check | result | log, load |
|---|---|---|
| `vue-tsc --noEmit` (src + demo) | exit 0 | `L/tsc-app.log`, 29.9 → 30.6 |
| the toggle-group unit file through H4's `unit.mjs` | **17 ran, 17 passed** (the floor's cases and the route's two) | `L/unit-plant-clean-targets.log`, 6.4; again after the plants, `L/unit-plant-clean-after.log`, 11.0 |
| unit plants, each must FAIL | **4/4 fail, each its own case**: `rows-on-slot-function` (pass 3's `$slots.meta` gate) fails "a row renders only when its slot yields content"; `second-writer` (a second rule writes the fact), `pin-not-important` and `mark-off-fact` (the mark's switch out of the fact's rule) each fail "one rule writes the tile fact" | `L/unit-plant-*.log` |
| library build (`harness/libbuild.mjs`) | exit 0, 8.4 s | `L/libbuild.log` |
| scene builds `f4-{src,src-dev,dist,dist-dev}`, `f4-atk-{src,src-dev,dist}`, `f4-own-{src,src-dev,dist}` and the two variants | exit 0 each | `L/build-*.log` |
| the whole `vitest run` | not run by this seat (floor v3 read 2,346 / 2,349, the 3 HEAD's `boot-graph`; the route adds 2 cases to one file, which pass). Owed by the prototype | |

**Bundle (R-9)**, `../../pass-3/floor-v2/probes/bundle.sh` (`L/bundle.log`, load 12.7-14.2): **2,938,357 B** unpacked (843 files), `dist/` 2,545,932 B, JS gzip-9 330,782 B. Over floor v3 (2,934,126, `FV3` §6): **+4,231 B**, of which `dist/` +2,734 B and JS gzip-9 +211 B; the rest is MIGRATION and the story. Over the ratchet datum 2,919,057: +19,300. The rebind is Q-14's. Pass 3's route alone was +5,874 over floor v2.

### 2.2 · The H4 battery under `--route`, and the attack set

Builds `f4-src` (route arms) and `f4-atk-src` (the attack compositions). Chromium: `run.mjs`, `L/battery-src-chromium.log`, 19:58 → 20:12, load 18.9-34.3. Playwright WebKit: each witness in one lock hold, `L/src-*-webkit.log`, `L/webkit-all.log`.

| witness | Chromium [arms] | Playwright WebKit [arms] | HEAD + floor v3 (`FV3` §4) | pass-3 F, migrated (`Fc3` §1) |
|---|---|---|---|---|
| T-1 | 20/42, 12 UNMEASURED [**migrated 15/15** · library 5/27 · unmigrated 3/6] | 23/45, 12 UNMEASURED [**migrated 18/18** · library 5/27 · unmigrated 3/6] | 5/27 | 15/15 · 18/18 |
| T-2 | **52/52** | **52/52** | 52/52 | 40/40 (pre-H4) |
| T-3 | 42/85, 12 UNMEASURED [**migrated 40/43** · library 2/39 · unmigrated 12/48] | 42/85, 12 UNMEASURED [**migrated 40/43** · library 2/39 · unmigrated 9/48] | 2/42 | 40/43 · 40/43 |
| T-4 | 36/54 [**migrated 24/24** · library 12/30 · unmigrated 3/24] | not run (§6) | 12/30 | 24/24 |
| T-5 | 87/116 [**migrated 38/38** · library 49/78 · unmigrated 20/37] | 87/116 [**migrated 38/38** · the same arms] | 49/78 | 38/38 |
| T-6 | 64/88 [**migrated 33/33** · library 31/55 · unmigrated 34/48] | not run (§6) | 31/55 | 33/33 |
| T-7 | **24/24** [migrated 24/24 · unmigrated 4/32] | **24/24** [the same] | 0/0 (+6) | 24/24 |
| T-8 | 27/39, 13 UNMEASURED [**migrated 27/27** · library 0/12], one run covering both engines; real Safari UNMEASURED (owner's safaridriver checkbox): the driver answers "You must enable 'Allow remote automation'" | | 0/12 (+13) | 27/27 |
| W-A · W-B · W-C · W-D · W-E | 5/9 · 9/25 · 0/8 · 4/8 · 1/3 | not run (§6) | the same | the same |
| CANON | 1/3 (F3-1, §2.5) | not run; `canon-fact` instead (§2.5) | 1/3 | 3/3 (pre-floor-v3) |
| **FACT** | **12/12** | **12/12** | 10/12 | — (H4) |
| **ATTACK** | **3/3** | **3/3** | 3/3 | — (H4) |
| **CORNER** | **5/5** | **5/5** | 1/5 | — (H4) |
| REPORT (not gating) | `kick` 0.14 px at 300 px against a 4 px gap, peak 1.0276 (FAIL, reported); at the scene's geometry 0.00 px; `mark` light 13.12:1 (`#272421` over `#e7f1d2`), dark 10.70:1 (`#dedbd7` over `#292825`) on V2 | `kick` 0.14 px, peak 1.0276 (the same); `mark` UNMEASURED: the WebKit stage pointed REPORT at the attack build, whose V2 composition has no tile (§6) | kick 0.14; mark UNMEASURED | — |

**On `dist`** (`L/dist-*`, `L/atkdist-*`, `L/atkdev-*`): T-2 **52/52**; T-5 88/117 [migrated 38/38]; W-E 1/6 (unmigrated tiles held to one row: R-1's); FACT **12/12**, ATTACK **3/3**, CORNER **5/5**; ATTACK on `f4-atk-src-dev` **4/4** (`sup`: 0 names over 6 one-row pills).

**Reading the rows.**
- Every migrated tally equals pass 3's. The only failing migrated cells are `c1-migrated` on T-3 (one-row radio pills, 3 modes), Q-10's: C1 fills no slot, so under the anatomy it cannot become a tile (`Fs3` R-2).
- The library and unmigrated arms fail where floor v3 failed, for its reasons (`FV3` §4.1).
- FACT `declared` now reads the route's writer: `specimen-migrated` item 0 a tile on the field corner, `fact flush`. `tile-in-pill` (the pass-3 nesting reach) reads a pill at h/2 on one row. `fact-plated`, `fact-flush` read the field corner.
- ATTACK `empty` reads `group fact none, item fact none · 184.00×40.00 9999px → used 20.00 · anatomy rows rendered 0` in light and dark (`L/atkdist-attack-chromium.log`); pass 3 read 5 empty rows and a 16 px tile.

**On `dist`, Playwright WebKit:** T-2 **52/52** (`L/dist-t2-one-line-stadium-webkit.log`). The other `dist` cells were not run in WebKit (§6).

### 2.3 · The route's own attack probe (`probes/f4-attack.mjs` on `route-f4/`)

Six compositions, light and dark; each group carries the fact it must have, each probed item the shape it must wear. A tile must read fact ≠ none, 16 px, a column, nothing cut, and a `.block` inside it still a block; a pill fact none, h/2 ± 0.5, one row, no library row.

| build | Chromium | Playwright WebKit |
|---|---|---|
| `f4-own-src` | **52/52** (`L/own-src-chromium.log`) | **52/52** (`L/own-src-webkit.log`) |
| `f4-own-src-dev` | **54/54** (adds: no "asks for a second row" on the tile group) | **54/54** |
| `f4-own-dist` | **52/52** | **52/52** |
| variant **nopin** (`src-dev`, the pin removed) | **48/54**: `preset` item «item-writes-none» `item fact none · 16px → used 16.00 · column · text rows 2 · a tile's block content held inline 1`; «content-writes-none» the same `held inline 1`; and the tile named `asks for a second row` once per mode (`L/own-nopin-src-dev-chromium.log`) | **48/54**, the same six cells (`L/own-nopin-src-dev-webkit.log`) |
| variant **childwriter** (the `FV3` stub's writer) | **38/52**: `v2` «k2wrap» `fact none (want flush)`, its tiles `9999px → used 20.00 · row · overflow clip`; `f1` «tile-outer» the same (`L/own-child-src-chromium.log`) | **38/52**, the same cells (`L/own-child-src-webkit.log`) |

What the cells cover: `c1` empty anatomy by a false `v-if`, a `v-for` over `[]`, `{{ '  ' }}` and an empty `<template #meta>`; `v2` K2's `section > div` around tiles with a pill group nested in a wrapper (pill-in-tile); `specimen` a pill group's wrapped options holding a tile group three wrappers down (tile-in-pill); `f1` an outer tile group holding a nested tile group (both tiles); `preset` the fact written on an option and inside one; `strip` the fact written inside a pill's label with `display: block` (reads one row with or without the pin: the content law reads the label's parent, which is the pill's; recorded, not a pin cell).

### 2.4 · The fact read at two elements (the D′ critic's class, F's build)

Measured above as variant **nopin** against the route. Without the pin the floor reads `--selection-tile` on the option's parent for the corner (tile) and on the option for its content (pill): a tile corner over a pill's inline law (a block child laid inline, 2 rows where 3 were written) and a false development name. With the pin, 0 cells. The pin is floor code by kind (it binds a floor fact), so it should move to the floor for both routes; it is carried in this route patch because there is no floor seat in this pass.

### 2.5 · R-7 on floor v3 (`probes/canon-fact.mjs`)

`canon.mjs`'s law, twins and plants, imported unchanged; the one difference is that a rule's enclosing `@container style(…)` / `not style(…)` is evaluated against the twin's parent. On `f4-src` (`L/canon-fact*-chromium.log`, load ~21):

| run | Chromium | Playwright WebKit |
|---|---|---|
| clean | **3/3**: 48 twins, 138 corner rules, twin facts tile `flush` / pill `none`; exactly one rule reaches a tile and not its pill twin, `@container not style(--selection-tile: none) .toggle-group__item → var(--radius-field)`; 2 group-scoped corner rules reach a pill, both legal; 0 unmatched | **3/3**, the same reading |
| plant A (`:is(<sel>)` at 12 px) | 2/3, fails the tile cell | 2/3, the same |
| plant S (an `sm` arm on `--radius-panel`) | 2/3, fails the tile cell | 2/3, the same |
| plant H (`:has(> * + *)` at 12 px) | 1/3, fails the tile and pill cells | 1/3, the same |

The harness's CANON reads 1/3 on this build for the reason `FV3` §5 F3-1 gives; this probe is the reading until H5 cures `canon.mjs`.

---

## 3 · The work list (REGISTRY §P3-6.4, F's column)

| open row (pass 3) | cure | where | witness | state |
|---|---|---|---|---|
| E-3, empty anatomy | a row renders only when its slot yields content | `ToggleGroupItem.vue:65-80, :250, :252` | ATTACK `empty` 2/2 (`src`, `dist`); `f4-attack` `c1` 4 spellings; unit case + plant `rows-on-slot-function` | closed |
| the nesting reach (R-2 / R-10 cells) | the row's own group (§1.2) | `styles.css:216-242` | FACT `tile-in-pill` 2/2, `pill-in-tile` 2/2; `f4-attack` `v2`, `specimen`, `f1`; `selector-forms` | closed |
| R-10, fact and geometry | floor v3 (FV3-4); the route writes only the fact | floor `styles.css:199-214` | FACT 12/12 `src` and `dist`; unit "one rule writes the tile fact" + plant `second-writer` | closed |
| R-10, the fact read at two elements (D′ pass-4 critic's class) | the pin (§1.3) | `styles.css:244-253` | `f4-attack` `preset` (nopin 48/54 → 54/54); plant `pin-not-important` | closed in the route; belongs on the floor |
| FV-2, E-3's pill clause | floor v3 (FV3-5) | floor `utilities/base.css:69-108` | T-2 52/52 on `src` and `dist` (H4-2's late cells) | closed |
| a new one: K2 and V1 under the floor's suggested writer | not adopted | — | `childwriter` variant: T-3 migrated 28/40, own probe 38/52 | avoided |

---

## 4 · The fixed checklist (REGISTRY §P2-6.3), row by row

"Reading" is this seat's on `f4-*`. "State" is a projection for the prototype and critic to re-read, not a score. Owner-blocked rows are built at their default and marked OPEN.

### T (8)

| row | how it is met | H4 witness | reading (Chromium · Playwright WebKit) | state |
|---|---|---|---|---|
| T-1 | the floor's field corner under the route's fact | `t1-corner-stops.mjs` | migrated 15/15 · 18/18 | green |
| T-2 | FV3-5's row law; the writer leaves pill groups `none` | `t2-one-line-stadium.mjs` incl. H4-2 | 52/52 · 52/52, `src` and `dist` | green |
| T-3 | the floor perimeter at inset 0, on by the fact | `t3-selected-separates.mjs` | migrated 40/43 (C1 ×3) · 40/43; `preset-verbatim` 0 / 238 / 0 against 248 · 0 / 217 / 0 | **OPEN: Q-10 (C1), Q-5 (the shipped arm)** |
| T-4 | the floor ring and group pad | `t4-ring-whole.mjs` | migrated 24/24 · not run (§6) | green on Chromium; WebKit owed |
| T-5 | the floor walk, FV3-2, FV3-3 | `t5-one-of-n-keys.mjs` | migrated 38/38 `src` and `dist` · 38/38 `src` | green |
| T-6 | the floor kick and hover; the mark springs in | `t6-engagement.mjs` | migrated 33/33 · not run (§6) | green on Chromium; WebKit owed |
| T-7 | no migrated site paints the tile | `t7-no-consumer-paint.mjs` | 24/24 · 24/24 | green |
| T-8 | both engines on T-1 and T-3 | `t8-both-engines.mjs` | migrated 27/27 in one run over both engines; real Safari UNMEASURED (owner's safaridriver checkbox) | green on two engines; Safari is E-4 |

### X (7)

| row | how | reading | state |
|---|---|---|---|
| X-1 sibling state | the perimeter spends no border | T-3 `preset-sibling-migrated` inside migrated 40/43 | green |
| X-2 media ink | the rows inherit `--selection-ink` | unchanged from pass 3 (`Fc3` `ink` 12/12); the route's rows and their CSS are pass 3's | green; re-read by the prototype |
| X-3 no slot re-render | the stamp is the button's attribute; `yields()` is called in render, tracked, and re-renders only when slot content changes | pass 3's shared `x3` 4/4 | green; re-read owed |
| X-4 the multi-select arm | `type="multiple"` takes the same writer | `v2-migrated` T-1, T-3, T-7 green; `f4-attack` `v2` (multiple) | green |
| X-5 interactive descendant named | floor FV-7 | ATTACK `attrs`; floor names | green |
| X-6 deselectable single | the engine | T-5 `preset` no-selection cell inside 38/38 | green |
| X-7 tone on edge, tint, ink | floor FV-4 | unchanged by the route | green; re-read owed |

### FV (10), under the route

FV-1..FV-10 are floor v2's rows, now carried by floor v3. Under the route: FV-1 (perimeter, walk) T-3 / T-5 migrated green; **FV-2** T-2 52/52 on `dist` with H4-2's late cells; FV-3 T-6 migrated 33/33; FV-4 X-7; FV-5 the Q-9 exemption (floor, unchanged); FV-6 the row-clustering walk (T-5 migrated); FV-7 names: ATTACK `sup` 0 false names, `f4-attack` `preset` 0 names on a tile; FV-8 hover (T-6); FV-9 the flush plate under the route's fact (FACT `fact-flush`); FV-10 the route adds no value. **All green on this reading.**

### R (10)

| row | reading | state |
|---|---|---|
| R-1 the unmigrated consumer | K1 and K2 default slots are one-row pills on every route; K2's stage clipped silently in production (`FV3` FV2-1, W-E `dist` 1/6) | **OPEN: Q-5, Q-15** |
| R-2 the H-2 pair | one markup, rows added → tile, rows removed → pill, no attribute differs (pass 3 `flip`, `q3`); FACT 12/12; `f4-attack` `c1` | green |
| R-3 the commit | floor kick, T-6 33/33 | green |
| R-4 hover against selected | floor; T-6 hover inside 33/33 | green |
| R-5 X-2 with dark stroke contrast | pass 3's token computation (12.18:1) unchanged by the route | green |
| R-6 the comfort axis | T-1 migrated fine, coarse, `--ui-scale` | green |
| R-7 the canon unit fails A, S, H | harness CANON 1/3 (F3-1); `canon-fact.mjs` 3/3 clean, A 2/3, S 2/3, H 1/3 | green on the container-aware read; the harness cell is H5's |
| R-8 the refusal per Q-5 on `dist` | production refuses structurally (row law, pin, corner); development names | **OPEN: Q-5** |
| R-9 the bundle datum | +4,231 B over floor v3, +19,300 over the datum | stated; Q-14 |
| R-10 "is a tile" spelled once | one rule writes the fact; every reader reads it; the option cannot rewrite it | green (unit + 2 plants; FACT; `f4-attack` `preset`) |

### E (4) and G (1)

| row | reading | state |
|---|---|---|
| E-1 every cell readable in both engines | every cell this seat ran read in both engines, 0 stalls; T-4, T-6 and the W rows were not run in Playwright WebKit (§6) | green on what was read; the prototype reads the rest |
| E-2 the H-10 scenes | F1, V2, sibling, interactive descendant on `dist`, reorder, deselectable single green; **C1 T-3 0/3** | **OPEN: Q-10** |
| E-3 MIGRATION claims | §5; each claim names its witness; "a slot that yields … is unfilled" (ATTACK `empty`, `c1`); "wrappers do not matter … two levels" (`f4-attack`, `selector-forms`); "written on an option it has no effect" (`f4-attack` `preset`) | green |
| E-4 real Safari | UNMEASURED (owner's safaridriver checkbox) | **OPEN** |
| G the gestalt | unchanged from pass 3 in paint: card-like 16 px, the perimeter and the mark, flush; two concentric outlines when focused and selected; the mark over light media in dark | **OPEN: Q-2, Q-3** |

**Projection: 34 green, 6 open, every open row on an owner input** (T-3, E-2, R-1, R-8, G, E-4): the owner-gated fixed point of §P3-6.4.

---

## 5 · MIGRATION rows (`MIGRATION.md` in `route.patch`)

| row (line) | claim | what checks it |
|---|---|---|
| "`<ToggleGroupItem>` gains `#media` and `#meta`, and they are what makes a set of tiles" (`:53-69`) | a group one of whose own options fills a slot is tiles; a selected tile at least 3.5 checks wide carries a check; nothing is declared | T-1, T-3, FACT `declared`, pass 3 `mark` |
| the same, unfilled slots | a false `v-if`, a `v-for` over nothing or blank text render no row; a child component counts as content | ATTACK `empty`; `f4-attack` `c1`; unit case (the component arm) |
| the same, wrappers and nesting | wrappers do not matter; an option belongs to its nearest group, two levels; a third level is pills | `f4-attack` `v2`, `specimen`, `f1`; `selector-forms` |
| the same, the silent change | a default slot of two rows becomes a one-row pill and clips; development names it with the slot to use | floor names (`dist-dev`), W-E `dist` |
| the same, detectors | `rg -U '<ToggleGroupItem[^>]*class="[^"]*(flex-col\|rounded-)'`; the development name | pass 3 ran it read-only on keyframes.js (2/2) |
| `--selection-tile` (`:102-106`, the floor's row amended) | `flush` on a group whose own options fill a slot; written on an option or inside one it has no effect, an inline `!important` excepted | `f4-attack` `preset`; FACT |

No binding is retired, so no removed-name detector is owed.

**Consumer sites, each in its own tranche (E-6):** unchanged from `Fs3` §5 (K1 `SpringPhysicsFacet.vue` readout into `#meta`; K2 `EasingCatalogue.vue` stage into `#media`, keep its family `<section>`s, which the writer now reaches; V1 strip into a ToggleGroup with the glyph in `#media`, its family wrappers kept; F1 thumbnail into `#media`; V2 `type="multiple"`; C1 one-row pills).

---

## 6 · Playwright WebKit

- **The queue.** The full WebKit stage (`run-f4.sh webkit`) waited **84 min** in the machine-wide `--exclusive webkit` queue (20:23 → 21:47) behind other seats' WebKit runs, never started, and was stopped by this seat before the guard's 90-min clamp would end it (`L/webkit-all.log`). The heavy queue is not the cause (every run was already `--light --rss-gb 8`); the exclusive WebKit lock has no bypass.
- **The core stage** (`run-f4.sh webkit-core`) re-queued at 21:47 and ran in one lock hold, 21:56 → 22:10, at a 1-min load of **7.4-17.7** (`L/webkit-core.log` and each `L/*-webkit.log`, first and last lines). It read the route's own cells first, then the writer-sensitive witnesses: `f4-attack` on `src`, `src-dev`, `dist` and both variants; FACT, ATTACK, CORNER, REPORT; `canon-fact` clean and plants; T-2, T-1, T-3, T-7, T-5; T-8 (both engines); T-2 on `dist`. **Every Playwright WebKit tally equals Chromium's**, cell for cell, on every witness it read, with T-3's unmigrated arm at 9/48 where Chromium reads 12/48, as at HEAD and on floor v3 (`FV3` §4). No stall, hang, NOT-REPRODUCED or HARNESS ERROR line.
- **Not run in Playwright WebKit by this seat:** T-4, T-6, W-A..W-E, CANON, and the `dist` T-5 / W-E / attack cells. The route does not touch the ring, the commit, the hover or the walk (floor v3's, read in both engines by `FV3` §4 at identical tallies), and on Chromium these read exactly floor v3's or pass 3's numbers. They are owed by the prototype under one lock hold, not inferred here.
- **REPORT `mark` in WebKit is UNMEASURED by misdirection:** the core stage ran REPORT on the attack build (`f4-atk-src`), whose V2 composition has no tile, so no mark was painted. Chromium read it on the route build (10.70:1 dark, 13.12:1 light). Not gating (H4-6).

---

## 7 · Risks

| id | risk | measurement | owner |
|---|---|---|---|
| R-1 | **The unmigrated K2 breaks silently in production**, as on every route | W-E `dist` 1/6; `FV3` FV2-1 | owner, Q-5 / Q-15 |
| R-2 | **C1 has no passing answer under the anatomy at Q-10 (b).** A one-row option fills no slot | T-3 `c1-migrated` 3 cells per engine | owner, Q-10 |
| R-3 | **The writer's reach is bounded at two group levels.** A tile group three groups deep is pills, clipped, named in development | `selector-forms` `nest3` both engines | the critic; no legal composition reaches it |
| R-4 | **`yields()` cannot see inside a child component.** A component that renders nothing still makes a row and a tile | unit case (the component arm renders a row) | MIGRATION states it; a consumer passes `v-if` on the component |
| R-5 | **`:has()` with a complex `:not()` on every group.** Pass 3 read the descendant form's cost at 0.99 (Chromium); this form is unmeasured; Playwright WebKit's clock cannot see it | none | the prototype |
| R-6 | **The pin is floor code in a route patch.** Landing D′ without it leaves D′ with the two-element read | `f4-attack` nopin 48/54 | the agglomerator: move it to the floor |
| R-7 | **The mark over media** (G): on a full-width thumbnail it sits on the thumbnail's corner; REPORT reads 10.70:1 in dark on this V2 composition, but pass 3 saw it wash out on `#ecfccb` | REPORT `mark` | owner, Q-3 |
| R-8 | **The kick overlaps a 4 px gap at 300 px** (floor's; reported) | REPORT `kick` 0.14 px | floor / H4-6 |
| R-9 | real Safari: `:has()` with a complex `:not()`, `@container style()` on a registered property, `mask-composite: exclude`, the percentage `min()` room gate | UNMEASURED (owner's safaridriver checkbox) | owner |

---

## 8 · For the prototype seat

1. Apply `floor-v3.patch`, then `D4-F-spec/route.patch` (sha1 `991415c3`), on HEAD.
2. `run-f4.sh build`, then `chromium`, then `webkit` (one lock hold). Do not edit the driver while it runs.
3. Owed: the whole `vitest run`; the `:has()` cost of the new writer (R-5); X-2, X-3, X-7 re-read on this build (pass 3's shared probes); the glance pair on this build; the story page in Chromium.
4. `route/route.json`'s `canon.sel` names a selector that reaches the tile for CANON's plants; the writer itself is pinned by the unit.

---

## 9 · Fence notes

- No tracked source in the checkout was edited, and no git write ran beyond `git worktree add` and `git worktree remove --force` of `.claude/worktrees/bl/D4/p4/D4-F-spec/wt`.
- Checkout writes are this file and `pass-4/D4-F-spec/` only.
- One slip, self-reported: to read the guard's usage this seat listed `~/.claude/guard/` and ran `guarded --help`; nothing else under `~/.claude` was read.
- `mkpatch.sh` uses a `mktemp` scratch dir under `$TMPDIR` for the floor-v3 bases and removes it on exit; nothing durable lives there.
