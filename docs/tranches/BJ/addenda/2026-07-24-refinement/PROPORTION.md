# THE PROPORTION SETTLEMENT

**Provenance.** `wf_6cb9f75f-b6c`, 31 seats, all Opus 5, 6.0M subagent tokens, 2026-07-25.
Six category benches + adversarial challenge + adjudication, folded. Live Chromium 149 @1440x900 dpr1
against `localhost:4188`, 36 routes. **`safari-app` is OWED on every row.**

This is the canonical series of record. Any wave that mints a spacing, radius, divider, fill or type
value outside it is authoring a defect. Greenfield lanes consume this; they do not re-derive it.

---

**modelId: `claude-opus-5[1m]`** · THE PROPORTION SETTLEMENT · six terminal category rulings folded, 16 inter-category collisions adjudicated · Chromium 149 @1440×900 dpr1, live `localhost:4188` · **`safari-app`: OWED on every row** (§7).

My own artefacts: `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/settle/{census.mjs,census2.mjs,census.json,c2.json}` — a surface-wide census over **36 routes**, run this seat, reported in §0 and used to adjudicate §1.

---

# 0 · THE CENSUS — the whole surface, measured this seat

36 routes, every painted element in `<main>`, Chromium 1440×900 dpr1 light.

| axis | distinct values shipped | target | most-used |
|---|---|---|---|
| **padding** | **21** | 6 | 16 (787) · 4 (576) · 20 (396) · 12 (388) · 24 (132) · 8 (119) · 32 (117) · 6 (116) · 40 (98) · 10 (92) · 5 (70) · 30.53 · 1 · 3 · 14 · 2 · 48 · 7 · 18.87 · 20.35 · 8.4 |
| **gap** | **18** | 6 | 12 (698) · 6 (420) · 8 (291) · 4 (160) · 24 (101) · 16 (99) · 40 (84) · 20 (24) · 2 · 3.2 · 5.58 · 9.17 · 32 · 48 · 11.66 · 10 · 6.11 · 1.89 |
| **border-radius** | **66** (14 structural + 52 one-off blob silhouettes) | 7 | 0 (11,560) · 9999 (2,028) · 16 (852) · 10 (372) · **50% (136)** · 6 (124) · **33554400 (116)** · 12 (88) · 4 (56) · **10003 (32)** · 24 (24) · 6.4 · 3.2 · 9.6 |
| **font-size** | **16 structural** | 9 rungs on 1 ratio | 16.4 (792) · 20.35 (119) · 14.38 (111) · 11 (110) · 18.61 (48) · 41.89 (38) · 36 · 25.89 · 20.67 · 18 · 53.28 · 20 · 24 · 30 · 32.93 · 67.78 |
| **border α** | **15** | 3 | ink/0.04 (324) · **α 1.0 (272)** · 0.05 (172) · 0.6 (92) · 0.4 (72) · 0.08 (68) · 0.3 (56) · 0.14 (40) · 0.12 (24) · 0.976 · 0.28 · 0.5 · 0.22 · 0.43 · 0.309 |
| **divider ink mass** (px × α) | **18**, spread **0.04 → 3.00 = 75×** | 3, ratio 1:2:6 | for marks that all mean *boundary* |
| **declared glass surfaces** | **305** | — | **188 (61.6%) compute `backdrop-filter: none`** |
| **white specular legs > 0.12 α** | **321**, at three alphas | 1 leg ≤ 0.12 | 0.30 ×119 · 0.18 ×119 · 0.25 ×83 |

**Four spellings of one stadium**: `9999px` (2,028) · `50%` (136) · `33554400px` (116, `calc(infinity*1px)`) · `10003px` (32, arithmetic on the sentinel). **2,312 corner declarations, one shape.**

**Two inks carry boundaries**: warm ink `rgb(28,25,23)` and tan `rgb(198,180,159)` (`--border` = `--neutral-4`, `color-radius.css:95`). The two most-used are the **faintest** (ink/0.04 ×324) and among the **heaviest** (tan α1.0 ×272), with nothing systematic between them.

---

# 1 · THE CANONICAL SERIES

## 1.1 SPACE — one generator for padding *and* gap: `4 · 8 · 12 · 20 · 32 · 52`

4 × Fibonacci. Steps **2.00 / 1.50 / 1.667 / 1.60 / 1.625**, limit φ. Every rung ≥1.5× its neighbour, so no two are confusable at any size.

### Padding, by role

| px | role | pairs with radius | replaces |
|---|---|---|---|
| **4** | concentric residue · inline-mark block inset (badge y) · a cell inside a well | floor 4 | 1, 2, 3, 4, 5 |
| **8** | atom ↔ glyph · control `xs` · annotation plate (tooltip) · dock cross-inset at plate 56 | control 10 → residue clamps to floor | 6, 7, 8, 8.4, 10 |
| **12** | a control's own interior (`md`) · field inset · list-row inset | card 16 → **residue exactly 4** | 12, 14, 16 |
| **20** | **the presented plate** — card, popover, dropdown, context-menu, command, alert, toast · showcase frame | room 24 → **residue exactly 4** | 16, 18.87, 20, 20.35, 24, 30.53 |
| **32** | **the room plate** — dialog, sheet, drawer, big-dock card · section frame · page gutter | — | 24, 32, 40 |
| **52** | page-section break (block axis only) | — | 40, 48 |

**The pairing law: `pad(role) = r(role) − 4`.** Room 24−20=4 · card 16−12=4 · control 10−8=2→floor. Every rung of the radius series paired with the padding rung one below it yields the 4px floor exactly.

### Gap, by role

| px | role | law |
|---|---|---|
| **4** | intra-atom — dot ↔ caption, glyph ↔ label in a tight control | — |
| **8** | control ↔ glyph · term ↔ value · intra-plate member gap (dock) | `0.5 × control pad-inline` at `md` |
| **12** | **body** — peer ↔ peer, same rank; row ↔ row | `0.5 × shared line-height` |
| **20** | **family** — item ↔ item; group ↔ group inside a plate; **the separator channel** | — |
| **32** | **section** — and at this distance **no rule is ever drawn** | — |
| **52** | page-section | — |

`section : family : body = 32 : 20 : 12 = **8 : 5 : 3**`, at every viewport.

### Derivations, not members
A value off the series is legal **iff** it is the arithmetic product of a stated law. Four exist:
1. **dock cross-inset `= plate / 7`** → 4 / 6 / 8 / 12 at plate 28 / 40 / 56 / 84. On disk (`.glass-dock` 56/40/8 = 5/7, 1/7); iOS independently measures **50/72 = 0.694** and inset **0.14**.
2. `.number-field__input` inline pad `= calc(44 + 4)`.
3. `.switch__track` pad `= (track − thumb)/2 − border`.
4. slider fill inset `= 0.14 × track height` (IOS27 §1, measured 10–11pt on 72pt).

### Mobile transposition — ONE law
> **≤768px: every space rung steps down exactly one.** 52→32, 32→20, 20→12, 12→8, 8→4, 4→4. `--ui-scale` moves the **control box only** (height, pad, glyph). **Type keeps its own clamp and never rides `--ui-scale`.**

`32:20:12 → 20:12:8 = 5:3:2` — three distinct rungs survive; ratio-of-ratios drifts ≤6%. Shipped today: **seven** transposition factors on one page (column ÷3.568, hero pad ÷2.25, scroller ÷2.00, gap ÷1.667, h1 ÷1.618, body ÷1.163, every inner pad ÷1.000) and a mobile hierarchy that collapses section into family (24 : 24 : 12).

## 1.2 DIVIDER — one ink, 1px, three alphas, ratio 1 : 2 : 6

Ink is the warm `rgb(28,25,23)` at every rung. **1px always** — 277 of 277 borders in one category are already 1px; no second weight is minted.

| rung | α | mass (px×α) | dip on cream L230.5 | contrast | who |
|---|---|---|---|---|---|
| **seam** | **0.08** | 0.08 | **17.1** | ~1.09:1 | in-content rule; group ↔ group; a **flush** plate's own edge (break-even is 0.0705 — rounds to the seam) |
| **edge** | **0.16** | 0.16 | **33.2** | ~1.17:1 | a **floating** plate's boundary — where a drop shadow sits outside it |
| **perimeter** | **0.48** | 0.48 | **98.4** | **3.0 : 1** | a control's own edge · the focus ring · the selection indicator |
| *indicator* | 2px @ **0.24** | 0.48 | 49 | — | the perimeter rung **spread over 2px** — same ink mass, twice the height, because it must be findable along a 1288px run |

### The gap law — a boundary is drawn only where the gap cannot carry the rank
- gap **≥ 32** → **no line, ever**
- gap **20** → seam (0.08) · weight : gap = **1 : 250**… stated as mass : gap = 0.08 : 20
- gap **≤ 12** → edge (0.16)
- **control perimeter and focus ring are gap-independent** — always 0.48, because WCAG 1.4.11 does not care what is beside them.

### `--border` retires as a divider ink
tan α1.0 computes dip **47.5**, contrast **1.28:1** — fails 3:1 for a control perimeter and is **1.43×** the plate edge for a grouping line. It sits between two rungs and belongs to neither. Two inks is a second colour system.

## 1.3 FILL — the channel the stroke ladder does not cover

| rung | ink α | role |
|---|---|---|
| **hover** | 0.05 | transient pointer answer |
| **selected** | 0.12 | persistent state — hover cannot mint it |
| **both** | 0.16 | |
| **sole-carrier state** | **whatever reaches ≥3:1 against its unselected sibling** | segmented indicator, dock active member, toggle on-state |

Where a glyph or stroke co-carries the state, 0.05/0.12/0.16 suffice. Where the fill is alone, 3:1 or it is a lie. Measured today: selected tab **1.032:1**, *below* the divider beside it at 1.140:1; selected table row **`ink/0.08` — byte-equal to hover**.

## 1.4 TYPE — one ratio, `φ^(1/4) = 1.127838`, one clamp

Root `--type-body` (computes **18.608** at 1440). Every rung `= body × 1.127838ⁿ`. **Display roles take every second rung.**

| n | px @1440 | role | ratio to body |
|---|---|---|---|
| −4 | **11.50** | admin label / micro | 1/φ² |
| −3 | **12.97** | caption | — |
| −2 | **14.63** | section-label · chrome (segmented tab) · mono-caption · **control label** | 1/√φ |
| −1 | **16.50** | **control value** · button label | — |
| **0** | **18.608** | body / prose | 1 |
| +2 | **23.67** | subheading (h2) | √φ |
| +4 | **30.10** | heading (h1) | φ |
| +6 | **38.29** | title | φ^1.5 |
| +8 | **48.70** | display-1 | φ² |

**`control label : control value = φ^(−1/4) = 0.887, invariant at every viewport.`** Two independent measurements corroborate: forms 0.887, navigation-dock 0.881 desktop. navigation-dock's "→ 1.5× on coarse" is **OVERRULED** and display's "1.30 × prose" is **OVERRULED**: a 44px touch target needs 44px of box, not a 21px label.

**Leading** — lh/fs monotone non-increasing in fs. Four bands, one carve: **1.05** (fs ≥40) · **1.20** (24–40) · **1.50** (15–24) · **1.60** (<15) · carve **1.618** for long-form prose. Shipped: **eight** ratios, *inverting* below prose — the smallest type gets the tightest leading.

## 1.5 THE SIXTEEN COLLISIONS, RULED

| # | collision | ruling | why — the number |
|---|---|---|---|
| C1 | padding: 4·Fib (foundations, forms) vs a 4-grid keeping 16/24 (display, data-feedback, containers) | **4·8·12·20·32·52** | 12→16→20→24 steps are 1.333 / 1.25 / 1.20 — below the just-noticeable step for a length. 16 (787) and 24 (132) are the census's #1 and #5 values and are exactly the two Tailwind rungs |
| C2 | `pad-block = pad-inline × 1.272` (containers universal; display card 4:3) | **STRUCK. Block = inline unless a role differs** | it applies φ to a *linear* module and mints 30.528 / 18.868 / 20.352 / 10.176 / 15.264 — five off-series values from one multiplier |
| C3 | gap as a separate series (containers 6·8·12·16; data-feedback 4·8·12·24·40; navdock 6·12·18·24) | **one generator, shared with padding** | 21 paddings + 18 gaps = 39 values for what 6 rungs express; and a shared generator is what makes "weight : gap" statable once |
| C4 | dock cross-inset `= plate/7` (4·6·8·12) | **KEPT as a derivation, not a member** | on disk 56/40/8 = 5/7, 1/7; iOS measures 0.694 and 0.14 independently |
| C5 | is there a 12px radius rung? (yes: containers, data-feedback, navdock) | **NO** | 10→12→16 = 1.20, 1.33. 12 is the ladder's one 1.20 step. On a 512px plate, 12 vs 16 = **0.8% of silhouette** |
| C6 | `r = pad` (data-feedback) | **STRUCK** | it makes radius a function of a container's inset instead of its role — the literal-radius defect this tranche exists to kill. It would put a room plate at r 20 and a row at r 12, neither on the radius series |
| C7 | `--radius-card = calc(0.5 × control-h + 20)` = 40/50 (forms) | **STRUCK** | the relay runs **parent → child only**. A stadium child has no corner to be concentric with; run backwards it yields r 50 on a 361px mobile card = **13.8% of width** — a cartoon, not deft rounding |
| C8 | divider: 1 weight / 2 / 3 / two ledgers / α 0 + space only / 0.16+0.08 — all six disagree | **one ink, 1px, 0.08 / 0.16 / 0.48, ratio 1:2:6** | 15 alphas, 18 masses, **75× spread**, for marks that all mean boundary |
| C9 | plate-edge α: **0.07** (forms break-even) vs **0.16** (containers local-minimum sweep) | **BOTH, by elevation** | 0.07 puts the border exactly at page L — correct for a flush plate. Against a drop shadow (207.5 → 201.0) any α below **0.14** makes the border *lighter* than its surround and no local minimum exists at any DPR. **Elevation earns the heavier edge** |
| C10 | `--border` tan (data-feedback, foundations) vs warm ink at low α (display, forms, containers) | **one ink; `--border` retires as a divider** | tan α1.0 → dip 47.5 → 1.28:1: fails 3:1 as a perimeter, 1.43× the edge as a group rule |
| C11 | selection = stroke (display gold rim, forms 2px) vs fill (containers, data-feedback, navdock) | **fill carries the state; a stroke is a locator only** | display measured hover/press rim identical to 4 s.f. across 9 plates on a **0s** clock; navdock measured selected-vs-unselected at **1.032:1** |
| C12 | indicator weight: 2px@0.27 vs 2px@0.48 vs struck | **2px @ 0.24 = mass 0.48** | equals a 1px perimeter's mass. Shipped 2px opaque = mass **2.00 = +270%**, the loudest non-destructive mark in the library |
| C13 | mobile: one scalar 0.860 vs one rung down vs ratios held vs label ×1.5 | **one rung down, all rungs; `--ui-scale` = box only** | 0.860 puts every value off-series (32→27.5); one rung preserves rank distance with ≤6% ratio drift |
| C14 | type descending step: √φ (display) vs φ^(1/4) (forms, foundations) vs 1/φ at 4 rungs (data-feedback) | **φ^(1/4) = 1.127838, one ratio; display roles every second rung** | all four reconcile *exactly*: display 2 rungs, forms 1 rung (0.887), data-feedback 4 rungs (1.128⁴ = 1.618 exact), foundations 2/4/6/8 |
| C15 | separator channel = 18px = 3× gap (navdock) | **20 (the family rung) = 2.5× the intra-plate gap** | 18 is off-series; the ratio it protects survives at 20:8 |
| C16 | grain: strike now vs hold for a dark π (forms P4) | **STRUCK GLOBALLY NOW** | containers measured the dark arm: 79 layers, **max Δ 0/255 over ~3.1M sampled px, light AND dark**. The blocking cell is discharged |

---

# 2 · THE CONSOLIDATED STRIKE LIST

Deduplicated across six categories. Counts are painted elements/layers unless stated. ★ = measured this seat.

| # | strike | scope | count | evidence |
|---|---|---|---|---|
| K1 | `src/styles/glass/grain-overlay.css` **entire** (79 lines, verified on disk) + the `grain` prop + `--glass-grain-opacity` | library | **79 live layers**, 1 file, 1 prop, 1 token | eff α 0.04×0.025 = **0.001**; 0 changed px on 7/7 forms routes (5.18M px), 8/9 display plates, 3 container routes light **and dark** |
| K2 | `.glass-*::before` plus-lighter specular ring | library | **305 elements** ★ | eff α 0.049, coincident with the border 1px away; joint removal 1.51% ≥4 < separate sum 1.68% — they overlap in paint |
| K3 | white specular legs above 0.12α: the `0.18` side leg and the `0.25` second-top leg | library | **202 legs deleted, 119 retuned** ★ | 321 legs at three alphas; `.surface-cell` legs 1+7 composite to **0.4765** → measured spike (224,219,219)→(243,240,238) = **+11/255, one CSS px wide** |
| K4 | 17 radius token names (25 → 8) | library | **17 names**, 44 declaration sites | verified on disk: 25 names → **8 values**; `--radius-tooltip` 0 consumers; `--radius-button` 1, on `expandable-container/styles.css:30`, not a button |
| K5 | `outline-width: 3px` with `outline-style: none` | library | **570 declarations** | 570 declared / **0 resolved**. The ring **moves to `outline`** — 100% unoccupied today |
| K6 | `ShowcaseFrame` `tier` + `surface` props | demo | **2 props, 118 mounts / 32 files** | the default maps to `surface="opaque"` → `backdrop-filter: none` on 12 of 15 routes; the chassis turns the library's identity off around every specimen |
| K7 | 27 single-specimen plates | `/forms/inputs` ×25, `/forms/chip` ×2 | **27 plates** | 25 of 25 hold exactly one control; field spans **93.4%** of inner width; chip plate = **11.7% ink** in 1288×110 |
| K8 | 3 nested duplicate plates: `CommandDialog` inner plate, `.section-preview-card-preview` middle box, `.glass-dock` shell **or** `.dock-plate` | containers, display, dock | **17 plates** | composite veil **0.951**; rung 3 in a rung-2 container; **14/14 shell/plate pairs delta (0,0,0,0)** |
| K9 | scrim `backdrop-filter` + 15 sub-perceptual blur layers | `ModalOverlay.vue:83`, `DrawerOverlay.vue:53`, alert ×9, metric ×2, dock ×4 | **17 layers** | blur(1px): max Δ **106, entirely on glyph edges**; saturate(1.4): 99.95% of px move, none by >5/255; `blur(0px)` still promotes a backdrop root. MOTION-CANON §3(d) |
| K10 | `.dock-separator` **ink** + `--dock-h` + `--dock-separator-height` | dock | **11 rules, 2 tokens** | channel **25.00px vs gap 6.00 = 4.17×**; the rule is 4% of its own channel and out-inks the active state (1.140:1 vs 1.098:1). `--dock-h` = 55px naming a 56px plate, one consumer |
| K11 | duplicate identity/title prints | `/display` landing, `SectionPreviewCard` | **16 elements** | 12/12 byte-identical strings at 22.88px **outranking the real title 1.124:1**; 159,456 px² of landing |
| K12 | third-carrier dots, swatches, numbered badges, icon chips | badge ×8, timeline ×16, colors ×1, icons ×12 | **~37 elements** | badge Active vs Error = **ΔE_ok 0.0188, Δh 2.9°** at 6×6px; dot bg **byte-equal** to label colour ×4; 32×32 event badge restates the `<ol>` ordinal at **1:4** against the rail dot; 12 of 13 chips compute one bg and one glyph |
| K13 | 39 unguarded `:hover` rules (57% of 69) + hover arms on non-interactive surfaces | library + demo | **39 rules, ~19 elements** | `(hover:hover)` and `(any-hover:hover)` both **false** on iPhone 15 Pro, yet scale 1→1.015 and rim 0.07→0.14 still fire and **stick after tap**; a 1288px `role:null` div runs the loudest hover in its category |
| K14 | dead / unreachable declarations | 6 categories | **~10 rules, 44 corner decls** ★ | `border-radius: 10003px` ×32 and `3.2/6.4/9.6px` ×16 — all above the w/2 ceiling, unreachable at every size; `data-[state=open]:*` on an element with no `data-state`; `.sheet-animate` 0 consumers; `--radius-inset` relay never published, so its `calc()` never reaches paint |
| K15 | duplicate navigation: facets ×2, `‹ ›`, `« »`, 4 `DockControl` + 2 `DockSeparator` | all routes | **~24 controls** | **18 controls in a 393px band**; at 393 the story strip gets **0.0px of 377** (scrollWidth 976) |
| K16 | separator/rule redundancy | display ×1 plate, command, `section.border-t` ×all | **~14 rules** | two separator plates **identical in every computed property** (~310px of page for an a11y-tree delta); `CommandSeparator` suppression max Δ **74/255** against the plate border's **11**; three separators for one boundary at rule-to-rule **1:104** |
| K17 | captions restating their own specimen | badge, toggle, table, surface | **~10 elements** | 3 cells with `caption === specimenText`; frame **46,517 px² around a 2,005 px² badge = 23.2:1**; `<caption>` naming 3 of 5 headers visible six rows above |
| K18 | `shadow-cartoon` on specimens + Tailwind's stock `.shadow-*` paint + `--shadow-soft`/`--shadow-elevated` | `/foundations/{radii,shadows}` | **14 specimens, 11 utilities, 2 tokens** | Δ **25,212px**, 31% more than the border it competes with; on 4px rungs the offset corner is **75% of the radius**; `tokens/shadow.css:5` opens a plain `:root` → **two `--shadow-sm` values in one build** |
| K19 | 8 bare `<Surface material="content" surface="veil">` bands | 4 container routes | **8 elements** | 1288×80–190 at r 0, border 0, shadow none; whole-band suppression = **max Δ 7/255** |
| K20 | chrome that outweighs its subject | configurator tile, paper-grain overlay, dock-stage tile | **~16 elements** | 2px α1.0 = **40×** the structural boundary beside it; `::after` covering **97.25%** at Δ 31.2, **identical on all 5 rungs** → zero differential; 32px pad on a 56px specimen sitting 12px from its neighbour = **2.67× inverted** |
| K21 | single-member switchers | `/paper-glass`, `/feedback/toast` | **2 components** | a `--underline` indicator at 2px α **1.00** reporting a selection among **n=1**; `w·ΔL 1.824` = **4.04× the plate boundary** |
| K22 | 4 surplus routes | `/containers/{sheet,hover-card,hover-popover,context-menu}` | **4 routes** | 14 routes / 10 components; no `src/components/sheet`, no `src/components/hover-card`; `hover-card` + `hover-popover` demonstrate the same prop on the same component |
| K23 | layout residue and dead specimens | foundations ×8, data-feedback ×6 | **~35 elements** | 828×192px of empty grid cells; 3 alias swatches all `rgba(0,0,0,0)`; 3 of 4 identical `.scale-on-hover` circles (Δ 12,290px @ 192.7); `max-block-size: 11rem` overriding the `aspect-ratio` declared one line above; `.glass-value-mark` host computing **0 × 16** |
| K24 | `.segmented-tabs::before` 0.44s clock | atoms | 1 leg | **2.2×** every other control channel (0.2s), on the loudest mark in the category |
| K25 | `.glass-chip` 4 of 7 shadow layers + rest `scale: 1.07416` | chip | 5 legs | blur : own height **0.686 = 7.7×** its container's; **2.59px height mismatch in one flex row** at rest |
| K26 | `.label-requirement` destructive arm + 3 of 4 `invalid` grammars + `filter: blur(.5px)` on disabled text | forms, tabs | 5 rules | a **pristine required field wears the exact error red** `rgb(219,36,36)`; four spellings of one state; a text blur that appears nowhere else in the language |

**TOTAL: ≈ 867 painted elements/layers · 17 tokens · 570 outline reservations · 39 unguarded hover rules · 44 unreachable corner declarations · 118 prop mounts · 4 routes · 1 stylesheet file (79 lines).**

Deduplication is conservative: where two categories struck the same class on different routes, it is counted once.

---

# 3 · THE CONSOLIDATED ADD LIST

**The two lists are near-balanced, and the numbers say so.** Raw rows across six categories: **99 adds : 111 strikes = 0.89 : 1**. In `navigation-dock` the adds (15) **exceed** the strikes (12). The add bench was not under-weighted.

The asymmetry is in *character*, not count, and it is the finding: **40 of the 46 deduplicated add rows restore a state that already exists in the DOM and reports nothing.** A `role="slider"` on a 0-width thumb. An `aria-busy` wired to an empty live region. A `:focus-visible` that computes zero delta. **Six rows add machinery.** The library is not under-afforded in paint. It is under-afforded in **truth**.

| # | add | count | what is missing — the number | channel · magnitude · curve |
|---|---|---|---|---|
| A1 | **focus indicator** — move the ring from `box-shadow` to `outline` and raise α | **16 elements** | settled tab-walk: 21 designed rings · **7 nothing** · **4 Chrome UA `rgb(0,95,204)`** — a cold blue in a warm-cream library. Mechanism: `button/styles.css:98` `box-shadow: var(--shadow-sm)` at (0,4,0) beats `.focus-ring:focus-visible` at (0,2,0) — **ring and fill share one property**. Shipped α 0.30 composites to **1.91:1** — the focus indicator itself fails 3:1 | `outline: 2px @ **0.48**` + `0 0 8px @ 0.15`, `outline-offset: 2px`, **all five emphasis rungs, invariant**. ring : control height = **1 : 20** |
| A2 | **hover/press on a dead interactive** | **18 elements** | `input`/`textarea`: `transition-duration: 0s`, hover Δ **NONE**. `.segmented-tab`: rest→hover **0 px changed**. `.pager-dot`: whole-ring rest→press **0 px**. context-menu drop zone (**29% of viewport**): rest/hover/press identical, **0 non-zero px of 48,000**. `.glass-chip__remove` (destructive): hover Δ NONE, press Δ NONE, while its benign host carries three channels | **CURE TESTED, DELTA BANKED** for the tab: pin overridden → hover `1.015` paints **467px / 1.97% / maxΔ 144**, press `0.97` paints **479px / 2.02% / maxΔ 160**, indicator anchor **unmoved**. Field hover = deepen the well (ink inset 0.06→0.10) + one blur rung. `--spring-press` 0.12s, `@media (hover:hover)` |
| A3 | **overflow with no edge** → the shipped `FadingScroll` | **8 scroll containers** | `main` 2549/832 · card-scroll-host 525/318 (**207px hidden**) · CommandList 711/540 · textarea 344/293 · table 21.6% and **73.8%** of the row hidden at 393. All compute `mask-image: none`, `scrollbar-width: none`, no `data-scrolled`, `aria-label: null` | **the cure is already on the same routes**: `.story-code-block-scroll` resolves `linear-gradient(…, #000 calc(100% − 16px), transparent)` and tracks `gl-fade-start-in`/`gl-fade-end-out`. A swap, not new machinery. 16px feather, opacity leg on `0.6 × --reveal-clock` |
| A4 | **disabled ≠ loading ≠ at-limit** | **5 states** | loading and disabled share `background-color` (0.52α), `opacity: 0.5`, a 7-leg shadow and `backdrop-filter`; **sole delta `cursor: progress`**, invisible under `pointer-events: none`. At 99 the `+` takes `opacity: 0.5` — **the same channel and value as whole-component disabled**. A disabled filter `Input` keeps `blur(7px) saturate(1.4)` under a blanket 0.5 | disabled: **hold geometry and border at full alpha, ink → 0.45, chroma → 0** (*dim ≠ desaturate*, the modal-scrim law). at-limit = ink only. loading = a determinate track at seam mass on `--spring-transient`; **strike the 1.8s idle pulse** (D10 floor) |
| A5 | **state not announced** | **6 + every route** | every route ships an **empty** `<p class="sr-only" role="status" aria-live="polite">`; `aria-busy` 1→0 is not a message. `aria-valuetext` **null ×19** — thumbs announce `22`/`78` against a visible `$22 – $78`; `aria-valuenow="1.6"` of what; 2 of 29 progressbars have no accessible name at all | text into the node that already exists. Bind the formatter that already renders the numeral |
| A6 | **44px coarse floor** | **5 targets** | dialog ✕ **16×16 desktop and mobile = 13% of a 44px target**, `cursor: default` on a `<button>`; `.segmented-tab` **26.28px** vs `.dock-tab-button` 44.45 (misses by 40%); hover-card trigger **120×24**; `.glass-chip__remove` 20×20 = 0.57 of its chip's height | 44px hit box, glyph unchanged, capsule painted on an inset `::before` — the idiom `/dock/controls` already documents |
| A7 | **a boundary with no edge** | **10 rules** | `.disclosure-item` seam: measured dip **0.00** over a 1248px run, 1px reserved at α 0. `.separator[vertical]` measures **1 × 0 px** at both instances. `[data-variant=default]` off-item: bg transparent + border transparent + shadow none. Five floating plates at α 0.05 produce **no local minimum** | seam 0.08 (dip 17.1) / edge 0.16 (dip 33.2). **A8 CURE TESTED, DELTA BANKED**: delete `block-size: 100%`, use `align-self: stretch` → box **1 × 22.97**; `sep-vert-{BEFORE,AFTER}.png` |
| A8 | **selection / sort has no signal** | **4 states** | `aria-sort="descending"` column is **byte-identical in every computed property** to the four `aria-sort="none"` columns. `tr[data-state=selected]` computes `ink/0.08` — **exactly the hover value**. `[data-variant=selection][data-selected=true]` has `role: null`, `tabindex: null`, `aria-selected: null`, `cursor: auto`. Both `.dock-tab-button` compute bg `transparent`, `aria-pressed` null | ink `rgb(124,102,80)` → `--foreground` (**5.02 → 16.20:1**) + weight 500→600; fill 0.05 / 0.12 / 0.16; real ARIA + `cursor: pointer` + an unselected sibling to read against |
| A9 | **error/destructive is colour-only and colourless** | **5 sites** | every destructive message: `querySelector('svg') === null`, no `role`; the summary identifies fields as "the highlighted" ones. `text-destructive` computes `rgb(28,25,23)` — **byte-identical to a benign row** (unlayered component CSS beats the layered utility; **37.1% of served bytes are unlayered**). Three data-table states (error/empty/filtered-empty) render **pixel-identical**, `svg: 0`, `button|a: 0` | 16×16 `circle-alert` inline-start (lucide already imported); a destructive **state on the component**, not a consumer utility; error takes the shipped ring `inset 0 0 0 1px color-mix(--destructive 48%)` + a Retry into the slot that already exists |
| A10 | **the field is raised where it must be recessed** | **~57 fields** | field L **236.77** vs page L 230.5 = **+6.2 raised**. Read-only paints **Δ (+1,+1,+2)/255** and keeps a blinking `caret-color: rgb(28,25,23)`. Unchecked checkbox border **1.19:1**, radio **1.02:1** against a 3:1 requirement | fill = host − **4% L** → **L 221.3**; white top inset **0.30 → 0.12** (a recess has no top light); read-only a further 4% down, `caret-color: transparent` |
| A11 | **the slider has no handle** | **13 thumbs** | 13 of 19 thumbs compute **w 0, op 0, radius 0** — and one of them is `document.activeElement` after Tab, wearing Chrome's UA blue. Fill height **= track height**, inset **0** — paint on a track, not an object in it | **the cure ships 60 lines away**: ungate `Slider.vue:508-566` (`:not([data-variant=spectrum])` at `:384,:397,:475` gates the visible-handle, focus and held recipes to the colour picker). Handle `d = trackH − 2·inset`, `--radius-pill`, solid white, no glass, no specular. Fill inset **0.14 × track h** |
| A12 | **the corner-straddling dismissal** | **3 plates** | `ToastClose` `opacity: 0` at rest — **still 0 with `hasTouch: true`**; first reachable at Tab #17 against a measured **5.0s** lifetime | IOS27 §3, which names `ToastClose.vue`: opaque, **no glass, no shadow**, centre on the corner point, inset `0.065 × Ø`, **Ø ≥ 44**, parent `overflow: visible`, **≥3:1 at rest**. `Card`/`Alert` take the *contrasting* inset chromeless form — the two grammars never mix |
| A13 | **measure and wrap floors** | **2 laws** | 25.888px title in a **262px** column ≈ **11 characters/line** — the long heading wraps to six lines of 1–3 words, while `card/styles.css:20-21` declares `container-type: inline-size` and `grep -rn "@container" src/` returns **zero readers**. `.badge-atom` at 393 breaks **one glyph per line** ("Paid" → P/ai/d), inflating the row to ~340px | measure floor **18 characters** → caps the title at ~20.4px at 262px, and the 25.888 rung earns a plate ≥400px. `white-space: nowrap` unconditionally on a status pill |
| A14 | **resolved-value cells in the token ladders** | **4 stories** | the value column is hand-typed prose, so a dead token is pixel-identical to a live one: **8 tokens documented and undefined**; `/typography` prints 3 px figures of which **2 are wrong by 42px** and cannot be right at two viewports; `TokenLadder` samples are byte-identical while `--lift-{sm,md,lg}` resolve −1/−2/−4px | bind the resolved value; empty resolution renders the literal `undefined` |
| A15 | ★ **new machinery — 6 rows only** | | toast lifetime hairline (hover-pause **works and is invisible**: 8s of hover, nothing on screen says a clock exists) · metric delta (`[class*=delta\|trend\|direction]` → **0 matches** on a comparison object) · per-row easing specimen (**6 tokens named, 0 run, 0 drawn**; grid 413×3 holding 2 children = 122,000px² empty) · stepped-slider absorb marks (**0 of 19 sliders carry `step`**, so IOS27's absorb grammar is undemonstrated) · long-press progress on the context-menu zone · **`Alert` `#action` slot — the only new public API in this settlement**: `grep -rni "dismiss\|close\|onClose" src/components/alert/` returns **nothing**, and the route has **0 interactive elements in `main`** across 6 plates, one of which reads *"Session expired — Re-authenticate to continue."* | |

---

# 4 · RADIUS BY ROLE — the terminal table

25 names → **8 values** on disk → **7 roles**. `--radius: 0.625rem` (`radius.css:62`) is shadcn's literal default, verbatim, still the root of the ladder, with **5 names collapsed onto it**.

| role | value | law | binds | current name(s) that die into it |
|---|---|---|---|---|
| **cell** | **0** | inherits the parent's clip — **legal only where the element has no silhouette of its own** (`td`, `tr`) | table cells, grid cells | — |
| **floor** | **4** | `max(4, r_ctx − inset)` — the relay's minimum, and the only value a nested corner never rounds below | surface-cell in a field, configurator tile in a plate, any role-less nested surface | `--radius-xs`, `--radius-sm` |
| **tick** | **6** | `0.30 × h` at h=18 — the **many-of-N** mark, and only that | the checkbox. Nothing else | `--radius-md` |
| **control** | **10** | `≈0.25 × h` at h=40 — a box you type in, press, or read as an annotation | input, textarea, button (square arm), media tile, skeleton, avatar-square, tooltip, disclosure row, chip (square arm) | `--radius`, `--radius-lg`, `--radius-media`, `--radius-button`, `--radius-tooltip`, **`--radius-strip` (12→10)**, `--radius-panel` (12→10 where annotation) |
| **card** | **16** | **the presented plate.** `radius : pad-inline = 16 : 12 = 4 : 3`; `r − pad = 4` exactly | card, popover, dropdown, context-menu, command, alert (**today 10**), toast (today 12), metric, skeleton plate, group box | `--radius-2xl`, `--radius-card`, `--radius-dialog`, `--radius-field`, `--radius-ctx` default, **`--radius-panel` 12→16 on plates** |
| **room** | **24** | `1.5 × card`. **the room plate** — a box you enter. `r − pad = 4` exactly | dialog, sheet, drawer, big-dock card, showcase frame | `--radius-3xl`, `--radius-dock-card` |
| **pill** | **`h/2` via `--radius-pill: 9999px`, ONE spelling** | a stadium — a single-line control or an object you press | button, chip, badge, status dot, switch track, slider track, tab, toggle item, radio, dock member, grip, close ✕ | `--radius-control`, `--radius-badge`, `--radius-dock`, `--radius-tab`; and the **struck spellings `50%` (136), `33554400px` (116), `10003px` (32)** ★ |

**Surviving names: 7 roles + 2 relay channels (`--radius-ctx`, `--radius-inset`) = 8. From 25.**

### The two laws, and they do not overlap
- **LAW A — the concentric relay governs role-LESS nested surfaces.** Every padded surface publishes `--radius-inset` = its own resolved inline pad, **unconditionally**. Child corner = `max(4, ctx − inset)`. Today: three publishers, two consumers, one contradicting its sibling, and the root identity `--radius-inset: 0px` means the `calc()` returns the parent's own corner — **a calculation whose result never reaches paint**.
- **LAW B — role tokens govern anything with a role.** A field, button, chip or card inside a plate takes its role rung, never the relay. `radius.css:20-21` currently asserts *"a box is not a stadium"* and then routes the dialog-nested input to `--radius-field` = 16px — **the plate's own corner across a 24px inset, the exact inverse of concentricity**.
- **The relay runs parent → child only.** A stadium child never drives its parent's radius (C7).

### The named inversions this fixes
`.configurator-preset-tile` r16 inside a r12 plate — **inner corner larger than outer** → relay 4. `.surface-cell` **r 0 inside a 10px field**, ×6, in a library whose identity clause is *deft rounding* → floor 4. Toast r12 sitting on a card r16 — **the more elevated surface less rounded, 0.75:1** → both 16. `.disclosure-trigger` at `9999px` on a 1248px box — cap = **2.4% desktop / 8.7% mobile, 3.6× apart** → control 10, cap 0.96%/3.7%. `.slider-thumb` 3.2/6.4/9.6 — **all above the w/2 ceiling** → pill.

---

# 5 · GLASS DEFECT ROLL-UP

## 5a · `backdrop-filter: none` on a declared glass surface — **188 of 305 = 61.6%** ★

Measured this seat, 36 routes, elements carrying one of `glass-{wash,quiet,resting,floating,overlay,card,dock,capsule,chip,track-well,defined,pager-ring}`:

| class | none | veil it still paints |
|---|---|---|
| `.glass-resting` | **47** | opaque `color(srgb .992 .961 .925)` |
| `.glass-track-well` | **39** | `srgb(.965 .953 .937 / 0.5)` and `rgb(224,216,204)` fully opaque |
| `.glass-defined` (field-control) | **32** | `srgb(.945 .863 .827)` opaque |
| `.glass-wash` | **29** | `oklab(… / 0.328)` and `oklab(… / 0.52)` |
| `.glass-dock` | **20** | `rgba(0,0,0,0)` — shell with no material |
| `.glass-chip` | **9** | `oklab(… / 0.832)` |
| `.glass-capsule` | **9** | `oklab(… / 0.808)` |
| `.glass-pager-ring` | **3** | `0.808` under white specular **0.45** — the brightest specular in the library |

### Three root causes, all named, all one-line
1. **`src/styles/glass/material.css:66`** — `:where(.glass-wash, .glass-quiet, .glass-resting, .glass-floating, .glass-overlay, .glass-card, .glass-dock) > * { --glass-cell-backdrop-filter: none }`. A **custom property**, therefore inherited to the *whole subtree*, not depth 1. Chain read live: `.glass-card` `""` → wrapper `"none"` → `.segmented-tabs` `"none"`. **ONE fix (`--glass-cell-backdrop-filter: initial` at the cell) re-arms `.segmented-tabs`, `.glass-pager-ring` and every nested capsule.**
2. **`button/styles.css:43`** reads `var(--glass-cell-backdrop-filter, var(--glass-blur-deep))`, and **`--glass-blur-deep` is declared only inside `.glass-deep`** (`glass/deep.css:64-81`) and the dark arm. A non-`.glass-deep` button has it undefined → guaranteed-invalid at computed-value time → `none`, and it **overrides `.glass-capsule`'s working fallback**. Net: the **primary** action is an 80.8% cream veil with zero blur while `secondary` beside it computes `blur(7px) saturate(1.4)` at 0.52. **The higher rung is the deader material.**
3. **`ShowcaseFrame.vue:40`** hard-codes `surface="opaque"` → `surface-axis.css:93-102` zeroes the blur. `ladder.css:121-132` **does** publish `blur(7px) saturate(1.4)` on `.glass-resting`. **Demo chassis, 118 mounts, not a library defect.**

Route-dependent and variant-dependent materials, same class: `.switch__track` = `blur(1px)` on `/forms/checks`, `none` on `/forms/labeled-field`. `.toggle-group__item` = `blur(7px)` under `variant=outline`, `none` under `default`. `.glass-pager-ring` = 3 instances `blur(11px) saturate(1.6)`, 2 instances `none`. **One class, two materials, decided by ancestry.**

## 5b · White specular above 0.12α — **321 legs** ★

| source | light | dark | over the 0.12 ceiling |
|---|---|---|---|
| `--glass-material-rim` top leg (`rim.css:90-92`) | **0.30** (×119) | **0.40** | 2.5× / **3.3×** |
| `--glass-material-rim` side leg (`rim.css:93-94`) | **0.18** (×119) | 0.24 | 1.5× / 2.0× |
| `--glass-highlight` second-top leg (`glass-fx.css:40`) | **0.25** (×83) | — | 2.1× |
| `li.surface-cell` legs 1+7 composited | **0.4765** | — | **4.0×** |
| `.glass-pager-ring` | **0.45** | — | **3.8×** |
| `SectionPreviewCard.vue:90` | **0.45** | — | dark removal Δ **87/channel** vs light **10/channel = 8.3×** |

**Ruling: top leg → 0.12, side leg STRUCK, `::before` ring STRUCK, `--glass-highlight` STRUCK, dark arm ≤ light.** A plate then asserts its boundary on exactly **two** channels (ink 0.16 + white 0.12) instead of four, and **the ink is the stronger** — frost-led, not specular-led. *"The dark arm makes the rim 33% brighter in the mode where a bright rim reads most as plastic"*; at `border-radius: 0` the 0.7-white `::before` turns the dark ladder into a **wireframe** — four rungs as mutually indistinguishable outlined boxes.

## 5c · The saturate contradiction — **SETTLED, and EXEC-STATE OWED #6 is discharged**

Measured plate against page `oklch(.9374 .0204 53.2°)`:

| rung | measured | ΔC vs target **+62%** | Δh |
|---|---|---|---|
| `.glass-quiet` | `oklch(.9199 .0063 30.8°)` | **−69%** | −22.4° |
| `.glass-resting` | `oklch(.9248 .0158 42.4°)` | −23% | −10.8° |
| opaque | `oklch(.9739 .0147 70.9°)` | −28% | +17.7° |

**Every glass rung desaturates the thing it declares `saturate(1.4)` on. The sign is inverted.** And it is not a tuning question: a 52–95% near-neutral cream veil dilutes the lifted chroma **past neutral** regardless of the multiplier. Quiet needs **5.2×** its current chroma to reach +62%.

> **The veil is the defect. The saturate value is innocent.** Near-zero veil + heavy blur + strong saturate, **in that order of causation.** The canon's "saturate down on cream" and the photometry's "+62%" were never in conflict — they were describing opposite ends of one broken chain.

## 5d · The ladder does not ladder

- **ΔL\* across five rungs: `1.89 / 2.59 / 4.11 / 3.78` = 2.22 L\* total, non-monotone at the top, beaten 4.0× by its own opaque rung (8.80).** Target `0 / 2 / 4 / 6 / 8`.
- **Blur: 3 values for 5 rungs** (7 / 7 / 11 / 11 / 14.5). Target `5 / 7 / 10 / 14` calm + **16** deep (`--glass-blur-deep-radius` on disk; 20 violates the ≤15px budget band and is **rejected**).
- **Rim: eff α 0.049 on all five rungs — one value, zero bits.** Target `0.03 / 0.05 / 0.07 / 0.09 / 0.12`; the ladder's only discriminating channel once the veil → 0.
- `.glass-floating` ≡ `.glass-overlay` **byte-identical**; `.glass-quiet` is the only rung carrying `brightness(1.02)` (isolated: max Δ **3/255, 0.00% of px ≥4**).
- **`--card` vs `--background` = 2 HSL-L apart** (`color-radius.css:40,72`). A 0.808 veil of a colour 2 L from ground yields at most **1.6 L**. *The alpha ladder is grading a difference that does not exist.*
- `|plate − ground|` measures **+1.00 / −0.69 / −0.38 L\*** on three cards on one page — **the sign flips** — against a field-gradient noise floor of **1.53 L\***, i.e. figure : noise = **0.65 : 1**.
- **`--glass-material-rim` has two live definitions**: `shadow.css:38` and `rim.css:90`. One name, two materials.

## 5e · Engine-conditional arms — a near-clean bill, and one RED

| arm | verdict |
|---|---|
| **`filter: url("#pager-worm-filter-v-13")` on `.pager-dots`** | **RED, discharged this round.** MOTION-CANON §8 forbids `filter: url()` and names the pager-worm a **live obligation**. It is an SVG filter, and on `/navigation/carousel` it sits under a `.glass-pager-ring` computing `blur(11px) saturate(1.6)` — **exactly the `filter:url()` + `backdrop-filter` stack named as the prime Safari suspect** |
| `mask-composite: intersect` + `-webkit-mask-composite: source-in` | **OWED, BLOCKING.** Not synonyms in general; §8 requires a pixel diff proving the pool shape is identical. **The only row in six categories where a Safari result is the primary evidence, not a confirmation** |
| `WatercolorDot` `filter: url()` ×13 | **legal at HEAD** — shipped, static-cached (`colors.vue:66-72`), real Safari 26.4 renders it. **No new consumer** |
| `@supports (corner-shape: superellipse(2))` | legal PE tier; an unsupporting engine gets `round`, not a broken plate. `CSS.supports("corner-shape: squircle")` is already `true` |
| `@media (prefers-reduced-transparency: reduce)` | a **mode** arm, not an engine arm. Legal |
| `-webkit-backdrop-filter` duplication | a vendor prefix, not a branch |
| **masking fallbacks** | **ZERO found in six categories.** One law with a clean bill |

---

# 6 · WHAT THIS COSTS

| | count | notes |
|---|---|---|
| **tokens DELETED** | **≥ 45** | 17 radius names (25→8, verified on disk) · 6 type aliases + the Tailwind `--text-*` stock ladder (6) · `--type-math`, `--type-math-body` · `--type-proportional-{headline,kicker}-size` · `--glass-grain-opacity` · `--dock-h`, `--dock-separator-height`, `--dock-tab-h` literal · `--bouncy-slider-radius`, `--bouncy-track-radius` · `--glass-halo-{blur,core,bloom}` · `--surface-tint-{quiet,floating,modal}` (all three resolve `rgba(0,0,0,0)`) · `--shadow-soft`, `--shadow-elevated` (raw neutral black inside the library) · `--border` as a divider role |
| **tokens ADDED** | **6 net** | `--ink-seam` 0.08, `--ink-edge` 0.16, `--ink-perimeter` 0.48, `--fill-hover` 0.05, `--fill-selected` 0.12, `--control-label` = `calc(--control-text × 0.886653)` |
| **tokens RENAMED, value unchanged** | 3 | `--radius-{tick,control,room}`; `--glass-halo-{reach,sigma-max,bands}` replace the 3 deleted halo tokens 1:1 |
| **NET TOKEN COUNT** | **−42** | |
| **justification** | | **not one added token carries a new value.** Each names a ratio the library already asserts — in **15 different alphas** across 18 ink masses spanning 75×. The additions are the *names* that make the 15 collapse to 3 |
| **library components touched** | **~34 of 62** | button, input, textarea, number-field, checkbox, radio, switch, slider, chip, toggle-group, tabs/segmented, select, badge, status-dot, card, surface, separator, alert, toast, skeleton, progress, metric, table, data-table, timeline, dialog, drawer, popover, dropdown-menu, command, tooltip, accordion, dock, pager-dots |
| **style files touched** | **~18** | `grain-overlay.css` **deleted** (79 lines) · `radius.css`, `shadow.css`, `material.css`, `rim.css`, `ladder.css`, `surface-axis.css`, `glass-capsule.css`, `glass-fx.css`, `segmented.css`, `track-well.css`, `deep.css`, `scale.css`, `sizing.css`, `spacing`, `dark-arm-glass.css`, `color-radius.css`, `utilities/base.css` |
| **demo files touched** | **~40** | `ShowcaseFrame.vue` (118 mounts across 32 files) + 36 story routes + `SectionPreviewCard.vue`, `storyTile.ts`, `StoryBodyRenderer.vue`, `TokenLadder.vue`, `StorySection.vue`, `BottomDock.vue` |
| **routes removed** | **4** | `/containers/{sheet,hover-card,hover-popover,context-menu}` → prop rows on the parent |
| **net new machinery** | **6 rows**, 1 public API | the `Alert` `#action` slot. Everything else is a swap, an ungate, or a value |
| **net new gates** | **≤ 8** | G1–G7 + the Law-0 invariant, against the mandated 40–60 budget. Every one born-RED at HEAD |

---

# 7 · OWED

## 7a · Every Safari/WebKit cell

**`safaridriver` refuses remote automation from this seat this session.** All six category adjudicators hit the identical refusal independently. **`EXEC-STATE.md:16` records Safari LIVE at 2026-07-24 23:53 ET — that record is contradicted six times over and must be treated as STALE.** Re-probe with `pkill -f safaridriver` first; `DidMigrateWebDriverAllowRemoteAutomation` is not the setting and the Develop menu is not the setting.

| category | π rows | `safari-app` cells owed | `webkit-engine` cells owed |
|---|---|---|---|
| display | 14 | **14** | 14 |
| forms | 15 | **15** | 15 |
| containers | 15 | **15** (row 15 **BLOCKING**) | 15 |
| data-feedback | 17 | **17** | 17 |
| navigation-dock | 10 | **10** (3 marked REQUIRED) | 10 |
| foundations | 16 | **16** | 16 |
| **this seat's §0 census** | 1 | **1** | 1 |
| **TOTAL** | **88** | **88** | **88** |

**Bank `safari-app` and `webkit-engine` as separate cells and infer neither from the other.** Measured: Playwright-WebKit crashes **5/5** on mount (a threshold on the population of `color-mix()`-valued custom properties — keep 38 OK, keep 46 CRASH, **249 shipped**), while real Safari 26.4 renders `/` at **302 nodes, exactly Chromium's 302**. The crash is a harness defect and is not this settlement's subject; **the Safari cell is still owed on every row above.**

### The four Safari cells that are BLOCKING, not merely owed
1. **`mask-composite: intersect` vs `-webkit-mask-composite: source-in` pool-shape parity** (`sheet`, `dialog data-backdrop=graded`). The two spellings are not synonyms. No Chromium result substitutes.
2. **The frost restore across `/navigation/{tabs,pager-dots,carousel}`** — the `color-mix()` population *is* the WebKit-engine crash threshold, so the fix and the crash are the same variable.
3. **The goo worm without `filter: url()`** — MOTION-CANON §8's named live obligation, discharged **RED** on Chromium this round.
4. **Coarse scale 1.25 at 393×852 dsf3** — device-pixel rounding differs by engine; `4/8/12 → 5/10/15 CSS px = 15/30/45 device px, all whole` is an engine-specific claim.

## 7b · Non-Safari cells owed

| # | owed | why it blocks |
|---|---|---|
| 1 | **dark mode across `forms` entirely** | all forms photometry is light-arm |
| 2 | **`aria-invalid` rendering for `.checkbox`, `.radio-group`, `.toggle-group`, `.glass-chip`** | **no invalid specimen is mounted on any of 7 forms routes**, so the one-invalid-grammar strike cannot be closed without one. An owed *specimen*, not an owed engine |
| 3 | **a stepped slider specimen** | **0 of 19 sliders carry `step`**; IOS27 §1's absorb grammar is undemonstrated library-wide |
| 4 | **a disabled specimen on the foundations category** | **0 disabled controls on 13 routes** — "disabled indistinguishable from enabled" is untestable there |
| 5 | **§0's own census in dark, at dpr2, and at 393×852** | this seat measured Chromium 1440×900 dpr1 light only. The 21/18/66/16/15/18 distinct-value counts are a **light dpr1 floor** |
| 6 | **`Collapsible` correctness** | `.click()`, `Enter`, `Space` all leave `data-state="closed"`; `default-open` ignored; `Collapsible.vue:51` binds `:open="open"` unconditionally where `open?: boolean` has no default, so reka's uncontrolled arm is never entered. **Remedy not tested — routed to a correctness seat under Rule 6, not prescribed here** |

## 7c · Node-count gate, carried

A capture whose DOM node count is far from the working baseline is **VOID, not passing**. Baselines banked: `/` = **302 nodes** (Chromium and Safari 26.4 alike); data-feedback desktop↔mobile parity identical on 7 of 8 routes (83/123/89/186/86/219/39; toast 99→102).

---

**COUNTS.** 6 padding rungs · 6 gap rungs (one generator) · 7 radius roles from 25 names · **1 divider ink, 3 alphas, ratio 1:2:6** · 4 fill rungs · 9 type roles on **one** ratio · **26 consolidated strikes ≈ 867 elements + 17 tokens + 570 reservations + 4 routes** · **15 consolidated adds, 99 raw rows, 0.89 : 1 against the strikes, 40 of 46 restoring a state that already exists and reports nothing** · **188 of 305 declared glass surfaces (61.6%) computing `backdrop-filter: none`** · **321 white specular legs above 0.12α** · net token count **−42** · **88 Safari cells OWED, 4 of them blocking.**
