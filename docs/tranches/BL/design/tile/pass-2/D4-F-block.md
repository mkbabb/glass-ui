# D4 · pass 2 · D4-F block test: discrimination (REGISTRY §6.1 question 1)

| field | value |
|---|---|
| seat | D4 pass 2, BLOCK-TEST seat for D4-F. It answers REGISTRY §6.1 question 1 (discrimination) and nothing past it. The verdict is PROCEED, MERGE or BLOCK |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | checkout HEAD `d41040e4` (the task named `04929544`; `git diff 04929544 d41040e4 -- src` touches only `src/components/configurator/` and `src/index.ts`, the 10.1.0 Configurator, so no file the tile touches). `pass-2/floor.patch` (sha1 `f1476eba`) applied clean in a scratch worktree. Each reading is one patch on HEAD+floor: `D4-F-block/reading1.patch` (shasum `77bd8c5f`) and `D4-F-block/reading2.patch` (`012c9a58`). Each applies clean on HEAD+floor, and they are alternatives, not a stack |
| engines | Chromium 149.0.7827.55 and **Playwright WebKit 26.5**, headless, from `glass-ui/node_modules/playwright`. Playwright WebKit is not Safari. Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)** |
| records | everything is under `pass-2/D4-F-block/`: the two patches, the two routes (`route-r1/`, `route-r2/`), the probes (`probe.mjs`, `idiom9.mjs`, `mixed-keys.mjs`, `t3-narrow.mjs`, `contents-load.mjs`), their JSON (`r1.json`, `r2.json`, `idiom9.json`), the harness runs' JSON and build records (`runs/`), and every log (`logs/`). Builds were made with the harness's own `build.mjs` (flavour `src`) into scratch |
| machine | shared. Every run holds the harness lock and prints its load. The load average ran from 30.18 to 69.81 across the seat's runs. Every question-1 cell is a static read (computed style, geometry, `el.matches()`, painted pixels). None is a frame-timed cell, so the jank re-read rule never applied. Each discrimination probe ran twice, and the second run reproduced every cell of the first (`logs/r1-run{1,2}.log`, `logs/r2-run{1,2}.log`) |

---

## 0 · In brief

**Verdict: PROCEED with reading 2** (the anatomical reading: `#media` and `#meta` rows the library marks, and a cell rule that reads whether they are present).

1. **Reading 1 cannot separate a row from an adornment without a marker.** It fails one gating case in both engines. V1's glyph over a label (a bare `svg` and a `span`) has the same structure as an icon beside a label, so the rule paints it as a pill: 6/6 items, 59.08×36 at 18 px. Reading 1 also turns two real content shapes into false cells, in both engines. One is a label beside a consumer count span (3/3 cells, 64.91×75.88). The other is fourier-analysis's glyph span beside its label, once that label sits in an element: 3/3 cells, 56.14×75.88. The floor's TF-7 ellipsis asks for that label element. The cases reading 1 does get right depend on markers already: the library's `.badge-atom` and the utility `.sr-only`. Reading 1 passes 12 of 14 gating cells (§2).
2. **Reading 2 passes 14 of 14 gating cells in both engines.** Icon+label, label+Badge, K1, K2, V1 and the two wrapped bare labels each come out as named, and so does every information case (§3). The cost is the unmigrated consumer. K1 and K2 still paint silent lozenges until their markup moves into the slots (204×70.17 at 35.09 px; 207×102.17 at 51.09 px). That is question 4's business, carried in §6.
3. **Design-idioms §9 (one item, two content models) passes.** The tile-model and pill-model items share the element, all six chassis classes, `data-slot`, `role="radio"` and the one engine. The only computed differences are geometry and the perimeter switch. One radiogroup holds both models with one tab stop, and arrows cross between the models in both engines (§4). By B's own §9 record (`pass-1/D4-B.md` Q3), B diverged on two rows, anatomy and chassis. Floor item 1 closed the chassis row (`FLOOR.md` §2.1). Reading 2 puts the anatomy on the item. So B's ChoiceCard would now be the twin, and F is the one item. F is not "B on ToggleGroup under another name". It is B's anatomy absorbed into the one item, with no prop.
4. **Measured on the way, carried:**
   - In a grid row where a pill sits beside a cell, the floor's grid walk misroutes Down and Up in both engines (question 2's ground).
   - The full T-3 run hangs Playwright WebKit whenever `--route` is passed, with or without the reading rule. That is a harness defect every pass-2 route will hit.
   - The details are in §6.

---

## 1 · What was built

### 1.1 · Reading 1 (`reading1.patch`: `src/components/toggle-group/styles.css`, +22 lines)

A structural rule over the item's direct children. A **row** is any element child that is not an inline adornment. The adornments are a bare glyph (`svg`, `img`), a library Badge (`.badge-atom`) and a visually hidden span (`.sr-only`). Two rows make a cell:

```css
.toggle-group__item:has(> :not(svg, img, .badge-atom, .sr-only) ~ :not(svg, img, .badge-atom, .sr-only)) {
    --selection-perimeter: 1;           /* the floor's register switch (FLOOR.md item 2) */
    border-radius: var(--radius-field); /* TF-1, Q-1 (a) */
    flex-direction: column; align-items: flex-start; justify-content: flex-start;
    white-space: normal; overflow: visible;   /* lifts TF-7's pill law */
    line-height: var(--type-leading-body); padding-block: 0.625rem;
    & > * { overflow: visible; padding-block: 0; }
}
```

This is the smallest honest form of reading 1. W §7's naive `:has(> * + *)` is also read as a selector-match column, labelled **W7**, in every case below. It turns every icon and every Badge into a row.

### 1.2 · Reading 2 (`reading2.patch`: `ToggleGroupItem.vue` +6 lines, `styles.css` +39 lines)

`ToggleGroupItem` renders `#media` above and `#meta` below its default slot. Each goes in a library-marked wrapper (`<span class="toggle-group__media">`, `<span class="toggle-group__meta">`), which renders only when the slot is used. The cell rule reads whether either is present: `.toggle-group__item:has(> .toggle-group__media, > .toggle-group__meta)`, with the same body as §1.1. The meta row is muted at rest and lifts to `--foreground` on `[data-state="on"]`: B's meta ink lift, carried by the library. The lift was not measured here.

### 1.3 · The cases

The scenes are the harness's own H-10 transcriptions (`harness/scenes.mjs`), with two routes:
- `route-r1/migrated.mjs` moves V1 onto ToggleGroup with its content unchanged. At HEAD, V1 is a row of Chips, which no ToggleGroupItem rule can read.
- `route-r2/migrated.mjs` puts K1's readout in `#meta` and K2's stage and V1's glyph in `#media`. It changes nothing else.

Five cases edit the live DOM, and each edit touches slot content only, never the library's item element:
- `longSpan`: a 30-character label with the group held to 140 px;
- `longText`: the same label as a bare text node;
- `count`: the Badge swapped for a consumer count span;
- `srOnly`: the Badge swapped for an sr-only span;
- `glyphSpanText` / `glyphSpanSpan`: fourier-analysis's glyph span with its label as a text node, or in a span;
- `wrapGlyph`: V1's glyph wrapped in a span.

`probe.mjs` reads every item of every case for two things:
- **match**: `el.matches()` for W7, R1 and R2, so all three readings are compared on the same DOM;
- **paint**: the computed and used corner (CSS Backgrounds 3 §5.5), the box, the rung (`min-block-size`), `flex-direction`, `white-space`, `--selection-perimeter`, the label's line count and its clip.

An item's paint class is:
- `cell`: used corner = the resolved `--radius-field` (16 px), in a column;
- `pill`: used corner = h/2, with the box at its rung;
- `lozenge`: used corner = h/2 off the rung.

A case passes when every item paints the expected class.

---

## 2 · Reading 1: the cells

Build `r1-src`: HEAD+floor+reading1, route-r1. Runs: `logs/r1-run1.log` (Chromium load 31.76 → 31.78; Playwright WebKit 31.78 → 34.79) and `logs/r1-run2.log` (30.18 → 32.59 → 39.09). JSON: `r1.json`. Chromium and Playwright WebKit read the same class in every case, with boxes equal to within 0.02 px. Item 0's box is shown; "match" counts items.

| case | scene (+ edit) | expected | Chromium | Playwright WebKit | match W7 · R1 · R2 | item 0 (Chromium) | gating |
|---|---|---|---|---|---|---|---|
| icon+label | `pill-icon` | pill | **PASS** pill 3/3 | **PASS** pill 3/3 | 3/3 · 0/3 · 0/3 | 80.14×40, 9999px→20 (h/2 20), row, nowrap, perimeter 0 | yes |
| label+Badge | `pill-badge` | pill | **PASS** pill 3/3 | **PASS** pill 3/3 | 3/3 · 0/3 · 0/3 | 95.34×40, 9999px→20, children `span div.badge-atom` | yes |
| K1 | `preset` (unmigrated markup) | cell | **PASS** cell 4/4 | **PASS** cell 4/4 | 4/4 · 4/4 · 0/4 | 204×61.58, 16px→16 (h/2 30.79), column, perimeter 1 | yes |
| K2 | `specimen` (unmigrated markup) | cell | **PASS** cell 8/8 | **PASS** cell 8/8 | 8/8 · 8/8 · 0/8 | 207×100.16, 16px→16 (h/2 50.08), column, perimeter 1 | yes |
| **V1** | `strip-migrated` | cell | **FAIL** pill 6/6 | **FAIL** pill 6/6 | 6/6 · **0/6** · 0/6 | 59.08×36, 9999px→18, row, perimeter 0; children `svg.tile-glyph span.tile-label` | yes |
| wrap, label span | `single` + longSpan | pill | **PASS** | **PASS** | 0/4 · 0/4 · 0/4 | 132×36 at rung 36, 9999px→18, 1 line, clipped (ellipsis) | yes |
| wrap, bare text | `single` + longText | pill | **PASS** | **PASS** | 0/4 · 0/4 · 0/4 | 132×36, 9999px→18, 1 line, clipped | yes |
| label + consumer count | `pill-badge` + count | pill | INFO: **cell** 3/3 | INFO: **cell** 3/3 | 3/3 · 3/3 · 0/3 | 64.91×75.88, 16px→16, column (a false cell) | no |
| glyph span + text | `pill-icon` + glyphSpanText | pill | INFO: pill 3/3 | INFO: pill 3/3 | 0/3 · 0/3 · 0/3 | 75.06×40, 9999px→20 (fourier `BasisSelector.vue:158-162` as shipped) | no |
| glyph span + label span | `pill-icon` + glyphSpanSpan | pill | INFO: **cell** 3/3 | INFO: **cell** 3/3 | 3/3 · 3/3 · 0/3 | 56.14×75.88, 16px→16, column (a false cell) | no |
| label + sr-only | `pill-badge` + srOnly | pill | INFO: pill 3/3 | INFO: pill 3/3 | 3/3 · 0/3 · 0/3 | 64.91×40, 9999px→20 | no |
| V1, glyph in a span | `strip-migrated` + wrapGlyph | cell | INFO: cell 6/6 | INFO: cell 6/6 | 6/6 · 6/6 · 0/6 | 40×62.8, 16px→16, column | no |
| K1 as shipped | `preset-verbatim` | cell | INFO: cell 4/4 | INFO: cell 4/4 | 4/4 · 4/4 · 0/4 | 208×61.58, 16px→16 | no |

**Gating: 12/14** (7 cases × 2 engines; V1 fails in both).

**Live flip** (`single` item 0, framed reads, both engines alike): 36.0×36.0 9999px row, perimeter 0 → a second `span` appended → 57.4×70.3 16px column, perimeter 1 → removed → 36.0×36.0 9999px row, perimeter 0. `:has()` invalidates on a child mutation in both engines.

### 2.1 · Why reading 1 needs a marker

- **V1 against icon+label.** Both are a bare `svg` beside a `span`. What makes V1 a glyph "over" its label is layout: HEAD V1's `.vj-tile` is a column (`scenes.mjs:484`). Layout is a declaration, not structure, and a `:has()` over children cannot read it. Wrapping V1's glyph in a span makes it a cell (6/6, the INFO row), but that wrapper exists only to be counted as a row. It is a marker spelled as structure.
- **Adornments the library does not own.** A consumer's count span is a row to reading 1: a false cell, 3/3 in both engines. So is a glyph span beside a label element. fourier-analysis ships that glyph shape in four ToggleGroup sites, all read-only here (`BasisSelector.vue:152,160`, `GallerySearchBar.vue:189`, `NotationPills.vue:34`). Today each classifies as a pill only because its label is a bare text node (the "glyph span + text" row). The floor's TF-7 asks for a label element so the label can ellipsize (`FLOOR.md` item 4), and that element would flip those sites to cells. The rule would reshape a consumer on a change the library itself recommends.
- **The passes already rest on markers.** Badge is excluded by `.badge-atom`, a library class, and a hidden description by `.sr-only`, a utility class. A consumer's `.visually-hidden` or a hand-rolled badge falls outside both. W7 (the naive form) makes every icon and Badge a row (3/3 on both pill cases).

What reading 1 did well, recorded for question 4:
- The unmigrated K1 and K2 become cells with no consumer edit.
- The perimeter comes on with the cell. K1 clears T-3 in every mode and every H-3 scene, and in the shipped composition, in both engines (§5).

---

## 3 · Reading 2: the cells

Build `r2-src`: HEAD+floor+reading2, route-r2. Runs: `logs/r2-run1.log` (Chromium load 56.74 → 51.76; Playwright WebKit 51.76 → 46.73) and `logs/r2-run2.log` (39.09 → 40.61 → 37.27). JSON: `r2.json`. The two engines agree in every case.

| case | scene (+ edit) | expected | Chromium | Playwright WebKit | match W7 · R1 · R2 | item 0 (Chromium) | gating |
|---|---|---|---|---|---|---|---|
| icon+label | `pill-icon` | pill | **PASS** 3/3 | **PASS** 3/3 | 3/3 · 0/3 · 0/3 | 80.14×40, 9999px→20 | yes |
| label+Badge | `pill-badge` | pill | **PASS** 3/3 | **PASS** 3/3 | 3/3 · 0/3 · 0/3 | 95.34×40, 9999px→20 | yes |
| K1 | `preset-migrated` (readout in `#meta`) | cell | **PASS** 4/4 | **PASS** 4/4 | 4/4 · 4/4 · 4/4 | 204×70.58, 16px→16 (h/2 35.29), column, perimeter 1 | yes |
| K2 | `specimen-migrated` (stage in `#media`) | cell | **PASS** 8/8 | **PASS** 8/8 | 8/8 · 8/8 · 8/8 | 207×98.16, 16px→16 (h/2 49.08), column, perimeter 1 | yes |
| V1 | `strip-migrated` (glyph in `#media`) | cell | **PASS** 6/6 | **PASS** 6/6 | 6/6 · 6/6 · 6/6 | 40×58.8, 16px→16 (h/2 29.40), column, perimeter 1 | yes |
| wrap, label span | `single` + longSpan | pill | **PASS** | **PASS** | 0/4 · 0/4 · 0/4 | 132×36, 9999px→18, 1 line, clipped | yes |
| wrap, bare text | `single` + longText | pill | **PASS** | **PASS** | 0/4 · 0/4 · 0/4 | 132×36, 9999px→18, 1 line, clipped | yes |
| label + consumer count | `pill-badge` + count | pill | INFO: pill 3/3 | INFO: pill 3/3 | 3/3 · 3/3 · 0/3 | 82.5×40, 9999px→20 | no |
| glyph span + text | `pill-icon` + glyphSpanText | pill | INFO: pill 3/3 | INFO: pill 3/3 | 0/3 · 0/3 · 0/3 | 75.06×40, 9999px→20 | no |
| glyph span + label span | `pill-icon` + glyphSpanSpan | pill | INFO: pill 3/3 | INFO: pill 3/3 | 3/3 · 3/3 · 0/3 | 75.06×40, 9999px→20 | no |
| label + sr-only | `pill-badge` + srOnly | pill | INFO: pill 3/3 | INFO: pill 3/3 | 3/3 · 0/3 · 0/3 | 64.91×40, 9999px→20 | no |
| K1 unmigrated | `preset` | cell | INFO: **lozenge** 4/4 | INFO: **lozenge** 4/4 | 4/4 · 4/4 · 0/4 | 204×70.17, 9999px→35.09 (h/2 35.09), the consumer's `flex-col`, perimeter 0 | no |
| K2 unmigrated | `specimen` | cell | INFO: **lozenge** 8/8 | INFO: **lozenge** 8/8 | 8/8 · 8/8 · 0/8 | 207×102.17, 9999px→51.09, perimeter 0 | no |

**Gating: 14/14.** Every information case that should stay a pill does. **Live flip** (a `.toggle-group__meta` span appended to `single` item 0, both engines alike): 36.0×36.0 9999px → 56.5×66.3 16px column, perimeter 1 → removed → 36.0×36.0 9999px.

The union R1 ∨ R2 can be read off the match columns (derived, not painted separately). It passes the 7 gating cases, because V1 is caught by R2, but it brings back both of reading 1's false cells: label + count 3/3 and glyph span + label span 3/3. So it is not a way around the marker.

---

## 4 · Design-idioms §9: one item, two content models

§9 keeps two near-twin primitives apart only when they "emphasize DIFFERENT features and are NOT interchangeable" (`docs/design/design-idioms.md:296-320`). The test here is whether ToggleGroupItem stays one primitive when it holds the tile content model, or becomes a second primitive inside one component.

### 4.1 · Chassis and computed style (`idiom9.mjs`, `logs/idiom9.log`, load 55.26 → 53.56 → 52.31)

| read | pill model (`pill-icon` #0) | tile model (`preset-migrated` #0, `strip-migrated` #0) | both engines |
|---|---|---|---|
| element | `button` | `button` | same |
| classes | `toggle-group__item control-surface glass-control-edge glass-capsule-hover tap-squish focus-ring` | the same six; class delta **[]** for K1 and for V1 | same |
| `data-slot`, role | `toggle-group-item`, `radio` | `toggle-group-item`, `radio` | same |
| computed properties that differ (size-derived boxes ignored) | | V1: **30**. They are the corner (8 longhands), `flex-direction`, `align-items`, `justify-content`, `row-gap` / `column-gap`, `line-height`, `text-wrap-mode`, `overflow-*` (4), `padding-block` (4) and `--selection-perimeter` 0 → 1. Also `font-size`, `padding-inline` and `--toggle-group-item-size`, which come from V1's `size="sm"` group, not from the model. K1: 37 in Chromium, 36 in Playwright WebKit. They are the same geometry rows plus ink and glass tokens (`color` 124,102,80 → 112,89,66, `--muted-foreground`, `--glass-depth` 1 → 0.35, `--glass-veil-rung` 0.14 → 0.1) that K1's host Card sets on its content. The `pill-icon` scene has no host Card, so those rows are context, not model | same list |

The tile model changes the item's geometry and turns on one switch. It adds no chassis, no state register, no ARIA and no engine.

### 4.2 · One group, both models (`idiom9.mjs` and `mixed-keys.mjs`, `logs/mixed-keys.log`, load 66.20 → 58.39)

`preset-migrated` with `#meta` removed from items 1 and 3, so each grid row holds a cell and a pill:

| read | Chromium | Playwright WebKit |
|---|---|---|
| group | `radiogroup` | `radiogroup` |
| items | #0 tile `radio` 204×70.6 16px · #1 pill `radio` checked 204×40.0 9999px→20 · #2 tile 204×70.6 16px · #3 pill 204×40.0 9999px→20 | identical |
| tab stops | one (`tabindex` 0 on the checked item, −1 elsewhere) | one |
| keys across models (from #1, the checked pill) | ArrowRight → #2 (tile), checked "bouncy"; ArrowLeft → #1 (pill), "snappy". The roving `tabindex` follows each move | identical |

One engine, one ARIA contract and one register serve both content models in one group. The content model is chosen by which slots are filled, and nothing else changes.

### 4.3 · Against B's own divergence record

`pass-1/D4-B.md` Q3 lists what ChoiceCard carried that a ToggleGroupItem cell could not: "named anatomy with library type and state-keyed slot ink" and "a plate that does not compose `.control-surface`" (the SF-8 hang). B's own §9 verdict was: "If a cell shape grew the three named slots and a non-capsule chassis, it would be this component under another name, and B folds into it."
- The chassis row is closed by floor item 1. The hover that hung returns in 1.5 s in Playwright WebKit (`FLOOR.md` §2.1). Reading 2 keeps the capsule chassis (§4.1).
- The anatomy row is what reading 2 adds (`#media`, `#meta`, the meta ink lift). The check mark (`#mark`) is not built here. Q-3 (b) names it, and it would be one more slot on the same item.

So reading 2 is not "B on ToggleGroup under another name". It is the one item, with B's anatomy row absorbed. What was B's primitive would be the twin, and §9 records no reason to keep it. F passes §9 and does not merge. F also differs from D′: there is no `shape` prop. Under reading 2, D's H-2 pair scene `family-d-undeclared` (two spans in the default slot, no declaration) stays a one-line pill at 195.28×40, 9999px→20, in both engines (T-2 22/22, §5). Rows named as `#meta` or `#media` make cells. The anatomy decides the shape, and nothing declares it.

---

## 5 · T-2 and T-3 on both readings (the harness's own witnesses)

These support question 1 and do not replace F's later questions. Logs: `logs/witness-t2-t3.log`, `logs/t3-narrow-r{1,2}-webkit.log`, `logs/witness-t3-webkit-isolate.log`; JSON in `runs/`.

| witness | reading 1 | reading 2 |
|---|---|---|
| T-2, Chromium (load 47.58 · 69.81) | 18/22. The 4 FAILs are `family-d-undeclared` #0-#3: 131.92×71.58 16px→16, "left its rung (1.79 rungs)". That is D's H-2 pair, whose premise (an undeclared two-row item stays a pill) F rejects by charter | **22/22** |
| T-2, Playwright WebKit (56.59 · 40.39) | 18/22, the same 4 | **22/22** |
| T-3 K1 `preset`, Chromium light / dark / PRT (px² of ≥ 3:1 against the bar) | PASS 820.50 / 833.00 / 821.00 vs 265 | unmigrated FAIL 0 / 0 / 0 vs 274; `preset-migrated` PASS 856.25 / 869.00 / 857.00 |
| T-3 K1, Playwright WebKit (PRT = the forced level-0 path) | PASS 910.00 / 920.00 / 910.00 | unmigrated FAIL 0 / 0 / 0; migrated PASS 946.00 / 956.00 / 945.75 |
| T-3 K1 as shipped (`preset-verbatim`, gating per H-3) | Chromium PASS 831.25 / 842.75 / 838.50; Playwright WebKit PASS 921.00 / 934.00 / 926.75 | Chromium FAIL 0 / 263.75 / 0 vs 278 |
| T-3 K2 `specimen` | Chromium PASS 581.00 / 591.00 / 581.00 vs 307; Playwright WebKit PASS 579.75 / 591.00 / 579.00 | unmigrated FAIL 0 / 0 / 0 in both; `specimen-migrated` Chromium PASS 1157.00 / 1169.00 / 1157.00 vs 305, Playwright WebKit 1066.50 / 1076.50 / 1065.50 |
| T-3 V1 `strip-migrated` | FAIL 0 / 0 / 0 in both engines (a pill, so the perimeter stays dormant; fill 1.20 / 1.21 / 1.00) | PASS in both: Chromium 317.00 / 329.00 / 317.00 vs 98, Playwright WebKit 321.00 / 328.00 / 318.00 |
| T-3 H-3 scenes (invalid, sibling, translucent tone, unresolvable tone, `display: contents`) | all PASS in light, dark and PRT in both engines. Chromium light: 812.00, 500.50, 806.00, 820.50, 820.50; Playwright WebKit light: 902.50, 500.00, 896.50, 910.00, 910.00 | not read: the H-3 scenes use the unmigrated K1 markup, which reading 2 leaves a pill |

The fill stays 1.19-1.23:1 (1.00:1 under PRT) in every cell. The edge carries the state, as TF-2 says. Where a cell is painted, the carrier follows the classification in both readings, so a misclassification costs T-3 as well as the corner.

---

## 6 · Carried, not question 1's

| id | finding | measured | owner |
|---|---|---|---|
| F1-1 | **Question 4 under reading 2: the unmigrated consumer is a silent lozenge.** K1 204×70.17 at 35.09 px; K2 207×102.17 at 51.09 px; perimeter 0; T-3 0 in every mode. E-2 asks for a loud failure, and none fires. The migration is a markup move (`route-r2/migrated.mjs`: readout → `#meta`, stage and glyph → `#media`, item classes deleted), made in each consumer's own tranche (E-6). Reading 1's selector detects a row in the default slot (K1 and K2 match R1 4/4 and 8/8 and R2 0/4 and 0/8). As a guard it would also fire on the two false shapes in §2.1, so it cannot throw | §3, §5 | the F route, question 4 |
| F1-2 | **Question 2: the mixed grid.** A pill beside a cell in one grid row is not stretched. It stays a 204×40 stadium, centred against the 70.6 px cell, because `.toggle-group { align-items: center }`. The floor's grid walk misroutes there in both engines: 1 Down → 2 (the cell below-left, not 3) and 3 Up → 0 (not 1). The all-cell control walks as B's model says: 1D → 3, 3U → 1 (`logs/mixed-keys.log`). The cause is not verified. The row test ("a row starts past the origin's centre line", `FLOOR.md` item 3) meets items of unequal height centred in one grid row | §4.2 | the F route, question 2; the floor walk's owner |
| F1-3 | **Harness: the T-3 witness hangs Playwright WebKit whenever `--route` is passed.** `page.goto` timed out at `preset-contents` in 5 of 5 routed runs: r1, r2, the r1 and r2 re-runs, and floor+route-r1 with no reading rule. Unrouted runs completed: floor-only 2/42 (load 55.80) and r1 without a route 26/42 (load 35.31). The same scene loads in 49-149 ms on a fresh page in every build and both engines (`logs/contents-load.log`, 36/36). So the hang follows the routed scene sequence, not the `:has()` rule. Every pass-2 route passes `--route` | `logs/witness-t3-webkit-{rerun,isolate,floor-control}.log` | the H2 harness owner, before any route scores WebKit T-3 |
| F1-4 | Harness: T-3 counts a migrated arm that a route did not supply as FAIL ("no selected/unselected pair among 0 items"), where HARNESS §1.4 says UNMEASURED. It gave 15 such cells in Chromium on r1, so the `migrated 0/18` tally is 15 absent arms plus V1's 3 | `logs/witness-t2-t3.log` | the H2 harness owner |
| F1-5 | The 16 px corner on V1's 40 px-wide tile is 0.80 of w/2 (40×58.8). This is D-crit C-4's reading on F's tile, and it belongs to Q-1 | §3 | Q-1 |
| F1-6 | Selector reach, a `:has()` on every item of every group, was not timed | — | the F route |
| F1-7 | Real Safari | UNMEASURED (owner's safaridriver checkbox) in every cell | owner |

---

## 7 · Verdict

**PROCEED, with reading 2.** Reading 1 cannot tell a row from an adornment without a marker. It fails V1 in both engines, false-cells a consumer count and fourier's glyph with a label element, and its passes already lean on `.badge-atom` and `.sr-only`. Reading 2 marks the rows in the library's own slots and names all seven gating cases correctly in both engines, 14/14. It also passes design-idioms §9: one item carries both content models, with one chassis, one engine, one ARIA contract and one register. B's two divergence rows are gone, chassis to the floor and anatomy to the item. F does not merge into "B's anatomy on D′'s host", because under F nothing declares the shape. The item's anatomy decides it, with no prop.

The route owes, in order: question 2 (with F1-2), question 3 (the paired witness, which reading 2 passes by construction: `family-d-undeclared` 22/22 under T-2), question 4 (with F1-1) and question 5. The D′ items 3, 4, 6, 9 and 10 follow (REGISTRY §7.3). F1-3 has to be fixed before anyone reads a routed WebKit T-3 cell.
