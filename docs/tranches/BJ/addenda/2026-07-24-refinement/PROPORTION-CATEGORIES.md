# PROPORTION-CATEGORIES — the six category terminal rulings, banked

**Provenance:** run `wf_6cb9f75f-b6c` (proportion, CLOSED 07-25), the six per-category adjudicated
terminal rulings harvested verbatim 2026-07-28 under VALIDATION.md CURE-2 (they existed only in the
journal; `PROPORTION.md` is the fold and CITES — this file is the per-component measured record).
Measured at the run's pin — re-derive line numbers at consumption.


# ═══════════ CATEGORY RULING (21323 chars) ═══════════

## navigation-dock — TERMINAL RULING (D12 + D2)

**modelId: `claude-opus-5[1m]`** · Chromium 1440×900 + 393×852 dsf3, live `http://localhost:4188` · **WebKit/Safari: OWED** (safaridriver blocked this seat; `EXEC-STATE.md:16` says Safari went live 2026-07-24 23:53 — that claim and this seat's probe conflict; the cell stays OWED until re-probed).
Adjudication artefacts: `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/adj-navdock/` — `a1..a6.mjs`, `a1.json`, `a2.json`, `c_{rest,hover,press}.png`, `d_{rest,hover,press}.png`.

---

## 1 · THE SERIES

**The generator, already on disk and hit exactly:** `.glass-dock` = plate 56 / control 40 / cross-inset 8 → **inner = 5/7, inset = 1/7**. `IOS27-ARCHIVE.md` §1 independently measures 50/72 = 0.694 and inset 0.14. Everything below derives from it.

| axis | series | role |
|---|---|---|
| **cross-inset (padding)** | **4 · 6 · 8 · 12** | **not chosen — `= plate/7`.** Plate 28→4, 40→6, 56→8, 84→12. Kills 3, 5, 7, 10 (13 values → 4). |
| **gap** | **6 · 12 · 18 · 24** = 6×{1,2,3,4} | 6 intra-plate members · 12 sibling tiles · **18 inter-group (3× intra — the separator channel)** · 24 section |
| **radius** | **9999 · 16 · 12 · derived** | 9999 = pill role (dock, track, ring, pip, any single tap-target) eff = h/2 · 16 = card/tile · 12 = bounded panel (`shape="rounded"`, vertical strip) · **inner = outer_eff − cross_inset, never a literal** |
| **divider** | **ink α 0, channel 18px** | ONE currency, and it is space. Ratio to intra gap **3.00**. |
| **border-α** | **0.08 interior · 0.12 plate edge** | plate edge ≥ **1.5 ×** strongest interior rule; no interior rule above the active-state signal |
| **white specular** | **≤ 0.12, one layer, one edge** | today 0.45 / 0.30 / 0.25 / 0.18 across four carriers |
| **control text** | `--control-text` = `clamp(.875,.8+.25vw,1.25rem) × --ui-scale` → **16.4 / 24.4** | label : body = 0.881 desktop → **1.5** coarse |

---

## 2 · STRIKE TABLE

| element | route | why superfluous (number) | what carries it after |
|---|---|---|---|
| `.dock-separator` **ink** | all dock | channel measured **25.00px** edge-to-edge vs ordinary gap **6.00** = **4.17×** (8/11 separators, `a1.json`). The 1px α0.15 rule is **4% of its own channel** and out-inks the active state (1.140:1 vs 1.098:1) | the channel, re-set to **18px = 3× gap**; `role="separator"` survives at zero size |
| `--dock-h` + `--dock-separator-height` | `sizing.css:172`, `shell.css:65` | `calc(2.5rem + .75rem + 3px)` = **55px** naming a plate painted **56**; **one consumer library-wide**, and it exists only to halve itself | dies with the ink |
| `.segmented-indicator` `0 8px 24px α.14` | `/navigation/tabs` | offset/inset = **8/4 = 2.0**, reach 20/4 = **5.0** — 28px of a 32px shadow paints through a track seated **4px** deep. `.dock-plate`, actually off-page, carries **0** drop layers | fill contrast (row A2 below) |
| `.segmented-indicator` `0 0 0 0.5px α.05` outer ring | same | a second outer edge on a 7-layer 88×35 object | the rim |
| second white rim `0 0.5px 0 0 @ 0.25` | indicator, `.glass-quiet`, 8 `.glass-wash` cards | composites with `[0]` to **α 0.475** over the upper half-pixel; measured effect **0.16 L units = 1.001:1** | the 0.30 rim (itself struck to ≤0.12, row A5) |
| `.glass-dock` shell **or** `.dock-plate` | all dock | **14/14 pairs delta (0,0,0,0)** this seat. Shell: rim + `0 0 20px α.14`, `backdrop-filter: none`, bg transparent. Plate: the material, **0** shadows | one box — the material box; must preserve the collapse channel 0.52 → **0.328** |
| per-member `::before` ring in a dock | `/dock/controls`, `/dock/overview` | cream/0.7 `0 0 0 0.75px inset` at opacity .07 = **α 0.049**, 6px inside a plate whose rim is already 4 layers; contributes **≈8%** of the active-state delta | fill (transparent → cream/0.80), scale 1.10, the plate rim |
| `.glass-card / .glass-quiet / .glass-wash` hover arm | tabs, carousel | a **1288px** passive `DIV` (`role: null`, `cursor: auto`) brightens `::before` **.07→.10** — the identical step a 40px button uses. Fires on 7 + 8 boxes; the loudest hover in the category is on the only things that do nothing | nothing — there is no state |
| `‹ › « »` (4 `DockControl` + 2 `DockSeparator`) | `demo/shell/BottomDock.vue:161-263` | at 393px the story strip gets **0.0px of 377** (scrollWidth 976); active tab at strip-x 600.5 in a 0px port. `:103` states the case itself | the strip, the `▯` sheet, the desktop sidebar (11 targets, `aria-current` live), `[ ] { }` |
| per-card `slide N / M` ×8 | `carousel.vue:171` | contradicts `:150` — *"the ONE pager for this exhibit"* — 3 lines above | `<CarouselPager>` `1 / 6` |
| 6 selection readouts | `tabs.vue:122,132,156,272,290,310` | duplicate the indicator; 2 lie (`Selected: month` against *Today / 7 days*; `المحدد: activity`) | the indicator |
| `label="pager-dots"` eyebrow | `pager-dots.vue:19` | renders **PAGER-DOTS** under H1 **Pager Dots**; only `label=` in 6 routes | the H1 |
| `.dock-stage-tile` 1px α0.3 border | `/dock/overview` ×3 | 32px pad holding a 56px specimen while sitting **12px** from its neighbour — **2.67×** inverted; a 4th concentric edge inside 32px | the 12px gutter + caption baseline |

**NOT struck** (removal orphans a signal): `Page 4 of 8` (`windowFit=5` vs `count=8` — the only magnitude carrier) · the separator **channel** · `.glass-pager-ring` on the counter · prev/next disabled opacity *unless* the buttons go with it.

---

## 3 · ADD TABLE

| element / state | route | missing (number) | channel · magnitude · curve |
|---|---|---|---|
| **A1 `.segmented-tab` hover + press** | tabs | `segmented.css:182` `scale: 1` is **unlayered**; `.glass-capsule-hover:hover{scale:1.015}` is `@layer components` (`glass-capsule.css:31,125`) → unlayered wins. Decisive pair: on hover `--specular-intensity` **does** reach 0.14 (same selector, `:117`) while `scale` stays **1**. Rest→hover pixel diff **0 px / maxDelta 0**; press **maxDelta 1** | **TESTED this seat** (`a6.mjs`): pin overridden → hover `1.015` paints **467px / 1.97% / maxDelta 144**, press `0.97` paints **479px / 2.02% / maxDelta 160**, and the indicator anchor is **unmoved** (x 145.00 w 88.41 rest = during hover; travel lands 232.74→233.41). The file's stated fear at `:180` is discharged. Curve `--spring-press` (0.20/ζ0.80, 0.12s), rank 0 |
| **A2 selected-vs-unselected contrast** | tabs | ΔL **−7.8**, **1.032:1** — *below* WCAG 1.4.11's 3:1 and *below* the divider at 1.140:1. Indicator and track compute **the same rim verbatim**; only fill differs (0.50 → 0.839) | fill α, to **≥ 3:1**. The category proves it in its own language: `.pager-dot` active/inactive = **2.106:1**, pip/ring **2.853:1**. **Ships in the same wave as the S4 strike** — never before it |
| **A3 selected tab is unhittable** | tabs | `.segmented-indicator` computes `pointer-events: auto; cursor: grab`; `elementFromPoint` at the selected tab centre returns **the indicator** (tabs 2-4 return the tab). Playwright `.hover()` times out 60s | the drag affordance must not eat the tab's hit box — hit cell on the tab, drag on an inset handle. **Localised, cure untested (Law 6)** |
| **A4 coarse-pointer press** | tabs, mobile | `hover:none`, `pointer:coarse`; `pointerdown` changes **nothing** (scale/bg/color/filter/shadow). Positive control same session: `.dock-icon-button` → `scale 0.988`, `--dock-press-t 0→1.012`. 36 instances | A1's press leg is the whole budget here; ≤150ms per MOTION-CANON §4 |
| **A5 frost: three surfaces resolve `none`** | tabs, pager-dots, carousel | `:where(.glass-card,…,.glass-dock) > * { --glass-cell-backdrop-filter: none }` **inherits** past depth 1. `.segmented-tabs` ×8 → `none` at bg **0.50** + white **0.30**. `.glass-pager-ring`: **3 instances blur(11px) saturate(1.6), 2 instances `none`** — one class, two materials, decided by ancestry | reset `--glass-cell-backdrop-filter: initial` on the cell so nested glass re-arms; rim then falls **0.30 → ≤0.12** because blur, not specular, carries the material |
| **A6 `.pager-dot` press paints nothing** | pager-dots, carousel | computed `scale 1 → 0.965`; the element is 28×28 transparent, `box-shadow: none`, 0 children, `::before/::after content: none`. Whole-ring diff rest→press **0 px**. The visible pip is `.goo-body` 13×13, a **sibling**, `pointer-events: none` | drive the per-index goo scalar: hover pip **13 → 15**, press **13 → 11.5**, `--spring-press`, rank 0. Nothing new mounts |
| **A7 focus rings** | tabs, dock strip | `.segmented-tab` and `.fading-scroll[tabindex="0"]` (672 wide, `scrollWidth 1068`, `role: null`, `aria-label: null`) fall through to Chrome `rgb(0,95,204) auto 1px` on warm cream. `.segmented-tab` rest computes `outline-width: 3px; outline-style: none` — declared, never switched on | join `.focus-ring` (already carried by `.pager-dot`, `.dock-icon-button`, `.dock-tab-button`). One class |
| **A8 `.pager-dot` rest radius** | pager-dots | **0px** at rest → **9999px** on `:focus-visible`; ring Ø28 around a pip Ø13 = **2.15×** centred on nothing visible | `--radius-pill` at rest; `outline-offset: -5px` to the pip's optical bounds. A focus state must not change shape |
| **A9 underline track has no rule** | tabs | tablist `border-width: 0px`; the mark is `::before` **78.28×2 opaque** `rgb(28,25,23)` | `border-block-end: 1px` at α0.10 → mark:track weight **2:1** |
| **A10 DockControl tab shape has no selected state** | `/dock/controls` | both `.dock-tab-button` compute bg `transparent`, `aria-pressed`/`aria-current` **null**; the story promises "per-mode ARIA". The demo's own bottom dock does it correctly 2 subtrees away | bind a selected member; `aria-current` + cream/0.80 fill |
| **A11 coarse hit floor** | tabs, mobile | `.segmented-tab` **26.28px** vs `.dock-tab-button` 44.45 / `.dock-icon-button` 46.80 — misses 44 by 40% | `min-block-size: 44px` with the capsule painted on an inset `::before` — the idiom `/dock/controls` already documents |
| **A12 reduced-motion defeat** | dock | `icon-button.css:112` `&:hover:not(:disabled):not([aria-disabled])` (0,4,0) outranks the guard `glass-capsule.css:136` `.glass-capsule-hover:hover` (0,2,0) → `scale: 1.10` still fires under PRM. Largest geometric response in the category, unsuppressed | PRM arm on the dock's own rule |
| **A13 carousel drag/wheel** | carousel | `cursor: auto` on track + viewport **and while the pointer is down**; 240px horizontal wheel leaves the transform at identity; **0** real scroll containers on the route; `touch-action: auto`. Page copy says "Drag or tap a dot" | `.glass-drag-grabbable` (shipped; measured `grab → grabbing` on the indicator), wheel→scrub, `touch-action: pan-y` |
| **A14 clamp with no boundary** | pager-dots | "Remove page" at `Page 1 of 1`: `disabled false`, `opacity 1`, `cursor pointer` — clamps silently. Neighbour route does it right (`Previous slide` → `disabled true`, 0.5, `not-allowed`) | disable at the clamp |
| **A15 disabled tab** | tabs | `pointer-events: none` makes `cursor: not-allowed` **unpaintable**; with A1 dead, "Urgent" (disabled) and "List" (enabled) give the pointer identical nothing. `filter: blur(.5px)` on text appears nowhere else in our language | drop `pointer-events: none`, keep `disabled`; disabled ink instead of blur |

---

## 4 · RE-PROPORTION TABLE

| selector | current | target | ratio satisfied |
|---|---|---|---|
| `.glass-dock` **vertical** | 64 thick, cross-inset **12** | **56**, inset **8** | 1/7 in both orientations (today 3/16). Root cause: `padding: 8px 12px` is authored per-**edge**; cross-inset must be per-**axis-role** |
| `.glass-pager-ring` **vertical** | 44 thick, inset **10** | **34**, inset **5** | 0.147, matching its horizontal twin (today 0.227 = **1.29×**) |
| `.segmented-tabs--pill` track | 42.61 / tab 34.61 / trim **4** | **56 / 40 / 8** | 5/7 · 1/7 — the dock's three numbers; radii 28/20 fall out free. Today 0.76 of it, trim 0.50 |
| `--dock-tab-h` (`density.css:201`) | **`calc(38px * --dock-scale)`** raw literal | `var(--dock-control-size)` = **40** | one row, one height. Kills the orphan pad **7px** (`density.css:196` `0.4375rem`) — (40−24)/2 = **8**, already the dock's own inset |
| `.dock-trigger` | `min-height: auto` → **35.91 / 33.34 coarse** | `var(--dock-control-size)` → 40 / 46.8 | sibling spread **1.114× → 1.000** desktop, **1.404× → 1.000** coarse. 33.34 is **0.76** of the 44 floor; `touch-floor.css:44` gives the *pointer* a transparent `::after` — proportion is about what is painted |
| `--dock-coarse-scale` (`sizing.css:213`) | **0.78** → ×1.5 = **1.17** | **0.833** → **1.25** | 4/8/12 land on 5/10/15 CSS px = **15/30/45 device px, all whole**. Today 4→4.68 (14.04), 7→8.19 (24.57), 8→9.36 (28.08), 12→14.04 (42.12) — **not one whole device pixel** |
| `.segmented-tabs` `@media (min-width:640px)` (`segmented.css:186-191`) | phone gets pad 4/10 + `--type-caption`; ≥640 gets 5/12 + `--type-small` → **×0.76** | delete the rung; read `--control-text` | every sibling grows ×1.17 on coarse; this one **shrinks**. Category spread 1.54× → 1.00 |
| `.segmented-tab` font | 16.4 → **12.19** coarse (body holds 16.4 → 16) | `var(--control-text)` = 16.4 → **24.4** | label : body **0.762 → 1.5**. `sizing.css:85` already says so; SegmentedTabs does not read it |
| `.segmented-tabs--underline` | **78.28×42.53, fs 20.352 at both viewports** (specificity 0,2,0 beats the 640 rung; `--type-subheading: 1.272rem` is the category's only non-`clamp()` type token) | `calc(var(--type-subheading) * var(--ui-scale))` | one stated ratio to body at both widths |
| `.dock-separator` | 1×27.5 at both viewports; rule/member **0.688 → 0.588** as members grow ×1.17 | **no rule**; channel 18px, scaled | the only dock element that ignores the pointer |
| `.glass-pager-ring` (counter) | **31.58** tall between two **40×40** flankers = **0.79**; same class = **34** holding dots | `min-height: var(--control-h-md)` = **40** | 40/40/40 in the cluster; its inset then reads 40/7 = **6**, in series (today 5) |
| pager pip | Ø **13**, pitch **30.00** → **0.433**; pip:air **1 : 1.32** | **Ø/pitch = 0.25** | iOS specimen 12/53.7 = **0.223**, 1 : 3.48. Two routes — Ø 13→7.5 at pitch 30, or pitch 30→52 at Ø 13. **Constraint:** 13 is *also* the goo worm's body D (`--pager-dot-elongated: 2.25rem` = 2.77 D), and `carousel.vue:303` *raises* it to 18 for waist mass. **Localised with a stated target; neither route tested (Law 6)** |
| `.dock-stage-tile` | pad **32** at both viewports; page gutter 40 → **20** coarse | tile pad ≤ gutter | today tile padding exceeds the page gutter on mobile |
| `.segmented-indicator` height | 0.812 of track | **0.714** | 5/7; iOS specimen 50/72 = 0.694 |

---

## 5 · GLASS DEFECTS

| surface | measured | verdict |
|---|---|---|
| `.segmented-tabs` ×8 | `backdrop-filter: none`, bg **srgb(.992 .961 .925 / 0.50)**, white inset **0.30** | **DEFECT.** ~50% cream veil, no blur, specular-led. The mechanism of "trite, shiny, bright" |
| `.segmented-indicator` | `none`, bg 0.839, white **0.30 + 0.25 + 0.18** on one edge | **DEFECT** |
| `.glass-pager-ring` (pager-dots route, carousel counter) | `none`, bg 0.808, white **0.45** — the category's brightest specular | **DEFECT.** Same class resolves `blur(11px) saturate(1.6)` 3 lines away |
| root cause | `:where(.glass-wash,…,.glass-dock) > * { --glass-cell-backdrop-filter: none }` — a custom property, therefore **inherited to the whole subtree**. Chain read live: `.glass-card` `""` → wrapper `"none"` → `.segmented-tabs` `"none"` | **ONE fix, three surfaces** |
| `.dock-icon-button[data-active]` | `none`, bg cream/**0.80** | **DEFECT** — the loudest state in the dock is the least glass |
| `.dock-plate` `[data-testid=dock-static-backdrop]` | `blur(0px) saturate(1.2)`, opaque cream | **NOT a frost defect** — `backdrop-mode="static"` is shipped API (`overview.vue:186`). **But `blur(0px)` is a no-op filter that still promotes a backdrop root: must be `none`.** Geometry bench's flag retracted, rebooked |
| **`.pager-dots` parent** | **`filter: url("#pager-worm-filter-v-13")`** | **ENGINE-CONDITIONAL / FORBIDDEN.** `MOTION-CANON.md` §8 rules `filter: url()` forbidden and names the pager-worm as a **live obligation to discharge**. **Discharged RED this seat** — the worm is an SVG filter, and on `/navigation/carousel` it sits under a `.glass-pager-ring` computing `blur(11px) saturate(1.6)`: exactly the `filter:url()` + `backdrop-filter` stack named as the prime Safari suspect |
| three floating plates vs their ground | `.dock-plate` **1.094:1** (1px α0.08) · `.segmented-tabs--pill` **1.035:1** (`border-width: 0`) · `.glass-pager-ring` **1.014:1** | **DEFECT.** The divider *inside* the dock (1.140) out-edges the dock's own boundary (1.094) |

---

## 6 · DE-SHADCN NOTES

| tell | number |
|---|---|
| `border-border/50`, `border-border/30`, `rounded-lg`, `grid gap-3` written as Tailwind class strings in dock stories | `overview.vue:192`, ×3 tiles; α **0.50** is a category singleton, and `rounded-lg` (10px) is off our radius roles entirely |
| the seven-layer nested-plate shadow | 3 white inset + 2 dark inset + `0 8px 24px α.14` drop + `0 0 0 0.5px` ring on an 88×35 object. Ours is frost-led: alpha + blur carry the material, the rim is a hairline |
| `role="group"` + plain buttons on the pill arm, `role="tablist"`/`role="tab"` on the underline arm, `role="tab"` on `.pager-dot` | **one component, three ARIA idioms** — a port seam, not a design |
| `role="separator"` `data-orientation` names the **dock's** axis, not the rule's | verified: a 27.5×1 rule declares `"vertical"`; a 1×27.5 rule declares `"horizontal"`. Both inverted |
| a shipped hover register that the component's own reset defeats | `.glass-capsule-hover` applied by `SegmentedTabs.vue:174` and cancelled by `segmented.css:182` — the class is decorative, which is the shadcn "add the variant class and hope" reflex |
| `.segmented-tabs--underline .segmented-tab:hover` declared **twice** with conflicting values (`var(--foreground)`, then `color-mix(…70%)`); the first never applies | dead CSS |
| the 3 raw px literals + 1 absent one | `--dock-tab-h: 38px`, `--dock-h: …+3px`, `--dock-coarse-scale: 0.78`, `.dock-trigger min-height: auto`. Ours derives from the plate; a port hard-codes |

---

## 7 · π/DELTA OBLIGATIONS

| claim | route | viewport | engine |
|---|---|---|---|
| tab hover/press paints (A1) | `/navigation/tabs` | 1440×900 | **Chromium BANKED** (`c_rest/c_hover/c_press.png`, 1.97% / 2.02%) · **Safari OWED** |
| selected ≥ 3:1 (A2) | `/navigation/tabs` | 1440×900 + 393×852 | Chromium OWED (post-fix) · Safari OWED |
| frost restored, rim ≤0.12 (A5) | `/navigation/tabs`, `/navigation/pager-dots`, `/navigation/carousel` | both | Chromium OWED · **Safari REQUIRED** — the `color-mix()` population is the WebKit-engine crash threshold |
| separator ink→space, channel 18 | `/dock/overview`, `/dock/controls` | both | Chromium OWED · Safari OWED |
| shell/plate merge preserves 0.52 / 0.328 | `/dock/overview` (collapsed + expanded) | 1440×900 | Chromium OWED · Safari OWED |
| pill track 56/40/8 | `/navigation/tabs` | both | Chromium OWED · Safari OWED |
| coarse scale 1.25, whole device px | `/dock/controls` | 393×852 **dsf3** | Chromium OWED · **Safari REQUIRED** (dsf differs) |
| goo worm without `filter: url()` | `/navigation/pager-dots`, `/navigation/carousel` | both | **Safari BLOCKING** — this is `MOTION-CANON` §8's named live obligation, now RED |
| bottom-dock strip ≥ 5 tabs after the chevron strike | `/dock/controls`, `/navigation/carousel` | 393×852 | Chromium OWED · Safari OWED |
| PRM arm suppresses dock scale (A12) | `/dock/controls` | 1440×900, `prefers-reduced-motion: reduce` | Chromium OWED · Safari OWED |

**Every Safari cell in this category is OWED.** No WebKit result is inferred from Chromium, and `webkit-engine` ≠ `safari-app`.

---

### CORRECTIONS ISSUED (evidence juror)

1. `.dock-separator` channel is **25.00px / gap 6.00 = 4.17×** (verified, 8 instances). The 13px "margin-only" figure is **retracted**.
2. `.dock-select-trigger` hover **responds** (`transparent → cream/0.65`, `rgba(0,0,0,.8) → rgb(28,25,23)`) and does **not** detach on focus. Retracted.
3. The rail's **12px** radius is `shape="rounded"` (`rail.vue:108-120`), a shipped shape axis — **not drift**. The real defect is the relay: at radius 12 with inset 8 the inner control must read **4**; it reads **20** (verified: 64×265 shell+plate 12px, icon 40 @ 9999px). "Corrected: 9999px" is retracted.
4. `blur(0px)` on `.dock-plate` is `backdrop-mode="static"`, not a frost defect. Rebooked as a no-op filter.
5. The 0-pixel tab-hover diff was measured on a tab the pointer **cannot reach** (A3). Re-measured on unselected "List": `:hover` matches, `--specular-intensity` 0→0.14, `scale` stays 1, **0 px changed**. Conclusion stands; evidence replaced.
6. `segmented.css:180`'s stated reason for the pin ("so a hover/press transform never mints a stacking context that severs `anchor()`") is **empirically discharged** — the indicator's rect is byte-identical rest vs a hovering neighbour at `scale: 1.015`, and travel resolves. It is also inverted on its face: the initial value of `scale` is `none`; `scale: 1` is the value that establishes the containing block.


# ═══════════ CATEGORY RULING (32180 chars) ═══════════

**modelId: `claude-opus-5[1m]`** · TERMINAL RULING · category **display** (`/display`, `/display/{buttons,surface,card,badge,atoms}`) · adjudicator seat, read-only, no repo file touched.

**Engines admitted:** Chromium 149 @1440×900 dpr1/dpr2, iPhone 15 Pro 393×852 dpr3 `isMobile+hasTouch`, `colorScheme:dark`, `reducedMotion:reduce`. **`safari-app`: OWED** — `safaridriver` returns "You must enable 'Allow remote automation'" from this seat this session. EXEC-STATE:16 records Safari live at 2026-07-24 23:53 ET; **not reproducible here**. No WebKit cell measured, none inferred, none inherited from Chromium.

**Corrections adopted into the record** (evidence juror, they carry file:line):
1. `[data-emphasis="text"]` rest→hover **is** a delta: `text-decoration-line: none → underline`, `button/styles.css:71`. Geometry brief's "NO DELTA" row is struck.
2. `[disabled]` carries `opacity: 0.5` + `pointer-events: none`, not `cursor: not-allowed` alone.
3. **Focus states must be read ≥420ms after `Tab`.** A read at 0ms samples the 0.2s transition mid-flight and produces false silences. One bench withdrew an S0 on this.
4. Photometry is **pixel-sampled from screenshots only**. `getComputedStyle` on `oklab()` fills returns the coefficients as an rgb triple — the live-π oklab trap, hit again this round.

---

## 0 · COLLISIONS RESOLVED

| collision | ruling |
|---|---|
| rim: STRIKE (S7/S10/E2) vs ADD RANGE (I-3) | **Both, by scope.** The rim as a *constant 0.049 on all 5 rungs* carries zero bits — struck. The rim as the ladder's *graded* channel is the only discriminator FROST leaves standing once veil→0 — kept, with 5 values. Struck outright on `[data-surface=opaque]` (7 elements) and wherever the 4-part inset already fires. |
| grain: STRIKE (S1) vs CONDITIONAL (E2) | **STRIKE outright.** 0.04 × 0.025 = **0.001** effective α; paired π = **0 px changed** on 8 of 9 plates, all three viewports. No condition survives a zero. |
| card hover rim: STRIKE (S3) vs selection needs affordance (I-7) | **Both.** Strike hover/press rim from non-interactive `.card` (fires on 8 plates, 0s clock, discriminates nothing at 4 s.f.); the selection variant gets a real affordance instead. |
| separator: strike a demo plate (S9) vs the vertical arm paints nothing (I-10) | **Both, disjoint.** One plate struck; the vertical arm fixed (cure tested, DELTA banked). |
| badge dot: strike (S4/S5) vs needs a silhouette axis (I-11) | **Strike the hand-rolled span + viz-palette sourcing; bind `StatusDot`.** Two opposite states at ΔE_ok **0.0188** is not redundancy, it is a lie. |
| card √φ ladder vs 4px ladder | **4px wins; the φ *relations* are preserved as integer ratios.** One rung shared today (24) and it is coincidence. |

---

## 1 · THE SERIES

**PADDING** — 4px grid, role-bearing. Seven values, no more.

| px | role | replaces |
|---|---|---|
| 4 | inline-mark inset (badge y) | 2, 4 |
| 8 | control xs pad-x | 8 |
| 12 | control sm pad-x · cell inset | 12 |
| 16 | control md pad-x · field inset · card `sm` pad-inline | 16 |
| 20 | showcase-frame inset (both frames) · card footer pad-top | 20, 18.868 |
| 24 | card pad-inline · section frame | 24 |
| 32 | card pad-block | 30.528 |

`8 : 12 : 16 : 20 : 24 : 32` = `2 : 3 : 4 : 5 : 6 : 8`. Card relations restated as integers: pad-block : pad-inline = **4 : 3** (√φ, +4.8%); footer-top : pad-block = **5 : 8** (1/φ, +1.1%).

**GAP** — three containment rungs + one intra-control rung, all stated as ratios.

| gap | role | law |
|---|---|---|
| **0.5 × pad-inline** | glyph ↔ label inside a control | 8 md / 6 sm / 4 xs / 10 lg — replaces the flat unstated 6 on 39 elements |
| **12** | body — peer ↔ peer, same rank | `0.5 × shared line-height` |
| **20** | family — item ↔ item | — |
| **32** | section | — |
| **24** | rank change (heading → body) | `0.75 × line-height of the larger party` |

`section : family : body = 32 : 20 : 12 = 8 : 5 : 3`, **held at every viewport**. Desktop ships 40 : 24 : 12 (10 : 6 : 3, near); mobile ships **24 : 24 : 12** — the section and item boundaries collapse to one distance. That is the mobile shear, and it is one number.

**RADIUS** — four roles. 25 declared names → 7 values → **4 roles**. `--radius-tooltip` has **0** consumers; `--radius-button` has **1** and it is `expandable-container/styles.css:30`, not a button.

| role | value | law |
|---|---|---|
| control / pill | `h/2` (`--radius-pill: 9999px`) | stadium. **One spelling** — `calc(infinity*1px)` = `3.35544e+07px` on the 5 status dots is struck |
| field | `0.25 × h` → **10px** at h=40 | shipped 16 on a 40px field = **0.40**, two-thirds to a stadium, which is why `radius.css:20-24`'s "a box is not a stadium" fails to read |
| card / panel | **16px** fixed | `radius : pad-inline = 16 : 24 = **2 : 3**` — the one radius ratio in the library that survives scrutiny |
| sheet / dock-card | **24px** = `1.5 × card` | — |
| *nested* | `max(4, r_parent − inset)` | concentric. `surface-cell` inside a 10px field → **4px**, killing `border-radius: 0` and giving `--radius-xs` its only job |

**DIVIDER WEIGHT** — ink mass = `px × α`, a three-rung series at **1 : 3 : 9**.

| rung | mass | spec | shipped | over/under |
|---|---|---|---|---|
| whisper (plate rim) | **0.06** | 0.75px @ 0.08 | 0.75px @ 0.049 = 0.037 | −38% |
| rule (separator) | **0.18** | 1px @ 0.18 | 1px @ 0.22 = 0.220 | +22% |
| indicator (tab underline, selection) | **0.54** | 2px @ 0.27 | 2px opaque = **2.00** | **+270%** |

Shipped spread is **1 : 5.9 : 54** across two orders of magnitude for three marks that all mean "boundary". The tab indicator is the loudest non-destructive mark in the category.

**A rule spans the run it divides, and states which:** `0.5 × the run` when the run is chrome (`--dock-separator-height: calc(--dock-h * 0.5)`, `dock/styles/shell.css:65` — already correct, already stated); `1.0 × the content column` when the run is prose. Shipped `.separator` is `inline-size: 100%` of the *plate*: **1246px of rule against 390.7px of widest ink = 3.19 : 1**; the labelled arm is **6.67 : 1** with a hinge that is **3.31%** of its own run.

---

## 2 · STRIKE TABLE

| # | element | route | why superfluous — the number | what carries the meaning after |
|---|---|---|---|---|
| K1 | `src/styles/glass/grain-overlay.css` entire, the `grain` prop, `surface.vue:76-78` specimen | all | eff α `0.04 × 0.025 = **0.001**`; paired π **0 px, maxΔ 0** on `/display/surface` and `/display/atoms` at dpr1, dpr2 and mobile; **8/9** plates on `/display/card` at 0 px. Cost: one `mix-blend-mode: overlay` layer × **38–52** blend-pseudos per route | veil + blur + saturate — the measured iOS transmission triple (`IOS27-ARCHIVE §1`) |
| K2 | `.glass-*::before` rim under `[data-surface="opaque"]` | buttons, surface, atoms | **7 elements** with `backdrop-filter: none` over a fully opaque `srgb(.992 .961 .925)` still running `plus-lighter` specular; contribution maxΔ **1/255** over 2.44% of the cell | the 1px ink border + the drop shadow — the honest signals for a solid plate |
| K3 | `box-shadow` legs #6 and #7 on `li.surface-cell` | surface | exact duplicates. #7 `rgba(255,255,255,0.25)` composites with #1 `oklab(1/0.302)` to **0.4765** white on the top pixel row — measured spike `(224,219,219) → (243,240,238)`, **+11/255, one CSS px wide, directly under a dark line**. #6 is #5's offset repeated | leg #1 alone at the ≤0.12 ceiling — one specular hairline |
| K4 | `.card` / `.card::before` hover + press rim legs | card | fires on **9** plates of which **8** have `role: null`, `tabindex: null`, `cursor: auto`; rest 0.07 → hover **0.0999** → press **0.160**, **identical to 4 s.f. across all nine**; transition `all **0s**` — an untimed step, no clock at all | the selection variant's gold rim `oklab(0.673 0.0267 0.1246 / 0.3088)` — already 6× the rim delta, already what the story copy claims |
| K5 | landing identity rung, `demo/chassis/landing/storyTile.ts:49-50` | `/display` | prints `story.title` **twice, 12px apart**, same family, same weight, same `rgb(28,25,23)`, only 22.88 vs 20.35px (1.124×), on **3 of 5** tiles; **159,456 px²** of landing | the card heading, already saying it at the correct rung. A story without a tile renders the frame collapsed |
| K6 | `span.h-1.5.w-1.5.rounded-full` + `bg-viz-*` sourcing, `demo/stories/display/badge.vue:40-45` | badge | **Active** `oklch(.579 .201 30.4)` vs **Error** `oklch(.574 .216 27.5)`: **ΔE_ok 0.0188**, Δh **2.9°**, at 6×6px. Two opposite states, one red. A data-viz series token doing semantic status duty | the label, plus `StatusDot` on the semantic ramp with its silhouette axis (see A6) |
| K7 | `badge.vue:152` `span.size-1.5.bg-current` dot specimens | badge | dot bg **byte-equal** to label colour on all four tones; **36 : 4,982 px² = 0.72%** of the pill; third carrier of a state already carried twice | the pill fill and the label |
| K8 | permute `caption` when it equals the specimen's own text, `StoryBodyRenderer.vue:204-206` + `:214` | badge | 3 cells with `caption === specimenText`, `identical: true`; frame **46,517 px²** around a **2,005 px²** badge = **23.2 : 1** (page range 12.2–28.8 : 1). The file's own doc-block `:20-22` forbids exactly this | the badge — it is already the label. No frame for a single-axis one-word specimen |
| K9 | `.surface-field` radial gradient, `demo/stories/display/surface.vue:91-97` | surface | 52% stop is `oklab(.9053 +.0024 **−0.0108**)` — the **only negative-b substrate in the category**, Δb **−0.0247** from `--card`. Removing it moves **22.08%** of the viewport, mean Δ **9.65**. A transmission ladder rendered over a cool, non-uniform field | the cream page substrate — the only honest backdrop for a transmission specimen |
| K10 | one of the two separator plates (`HORIZONTAL · SEMANTIC` / `· DECORATIVE`) | atoms | every computed property **identical** (`1246×1`, `srgb(.1098 .098 .0902/0.22)`, offset 59.97); ~**310px** of page for a delta that exists only in the a11y tree | one specimen, two `role` arms side by side, difference stated in prose |
| K11 | `.section-preview-card-preview` middle box + the ladder inversion | `/display` | 3 nested framed boxes (4 + 1 + 4 edge channels) to show one card; inner specimen at `glass-floating` inside a `glass-resting` host — **rung 3 in a rung-2 container**, against `MOTION-CANON §3` | the outer card's plate as the frame, specimen at `glass-quiet` (nested content) |
| K12 | the `heading` on `/display/surface` §1 | surface | 4 statements before a specimen (`MATERIAL HIERARCHY` → *One authority for every plate* → 26-word blurb → plates). Category ships **3** section-header grammars across 5 pages | the eyebrow — the heading on 15 of the category's 18 remaining sections |
| K13 | 21 unused radius names | all | **25 names → 7 values → 4 roles.** `--radius-tooltip` **0** consumers; `--radius-button` **1**, on `expandable-container/styles.css:30` | the four roles in §1 |
| K14 | hover legs on coarse pointers | all | `(hover: hover)` **false**, `(any-hover: hover)` **false** on iPhone 15 Pro, yet `.button[emphasis=primary]` still runs `scale 1 → 1.015` and rim `0.07 → 0.14`. **MOTION-CANON G7 violated**; on touch the state sticks after tap so the press answer and the stale hover are the same picture | the press squish alone — `@media (hover: hover)` guard |
| K15 | `.segmented-tabs::before` `0.44s` clock | atoms | **2.2×** every other control channel (0.2s), on the loudest mark in the category | `--spring-dock-duration` (0.21s), the coordinated-travel row that owns indicator glide |

---

## 3 · ADD TABLE

| # | element / state | route | what is missing — the number | channel · magnitude · curve |
|---|---|---|---|---|
| A1 | focus ring on `quiet`, `text`, `tone=destructive`, `.segmented-tab`, `.card-scroll-host`, `.story-code-block-scroll`, `.demo-bottom-dock__tabs` | buttons, card, atoms | settled tab-walk: **21 designed rings · 7 nothing · 4 Chrome UA `rgb(0,95,204)`** — a cold blue in a warm-cream library, on the four elements that never got an indicator. Mechanism: `button/styles.css:98` `.button:not([data-tone="neutral"]){box-shadow: var(--shadow-sm)}` at (0,2,0) beats `.focus-ring:focus-visible` (`utilities/base.css:113-117`) — **ring and fill share one property**. `outline` is **100% unoccupied**: every button on every display route computes `outline-style: none` | **move the ring to `outline`.** `2px` @0.30 + `0 0 8px` @0.15, `outline-offset: 2px`, **all five emphasis rungs, invariant**. `ring : control height = 2 : 40 = 1 : 20`. Emphasis grades REST, never focus |
| A2 | `.button[data-tone="destructive"]` rest→hover | buttons | **0 of 6** channels move (`color`, `background-color`, `scale`, `box-shadow`, `::before` op, `text-decoration`). Its only feedback arrives *after* mousedown | one channel: tone fill **one step** (ΔL\* 2), `0.2s cubic-bezier(0.4,0,0.2,1)` — `--spring-press` clock |
| A3 | `.button[data-emphasis="text"]` rest | buttons | `color: rgb(28,25,23)` — **byte-identical to body ink**; contrast to ground **1.000**; no plate, no rim, no ring. At mobile 21px it reads as a heading | 1px hairline at rule mass **0.18**, `boundary : gap = 1 : 12`. Same relation every other boundary gets |
| A4 | `[data-variant=selection][data-selected=true]` | card | `role: null`, `tabindex: null`, `aria-selected: null`, `cursor: auto`; hover delta **byte-identical** to a non-interactive card; no unselected sibling to read the gold rim against | `role="option"`, `tabindex="0"`, `aria-selected`, `cursor: pointer`, a hover distinct from a plain card (K4 frees the channel), plus an unselected specimen beside it |
| A5 | `.card-scroll-host` overflow evidence | card | `scrollHeight 525 / clientHeight 318` — **207px hidden**, `scrollbar-width: none`, `mask-image: none` at `scrollTop 0` **and 120**, no `data-scrolled`, `aria-label: null`. Only cue is "Timeline entry 4" cut through its descenders. The demo has to say it in body copy | **the cure is 400px away on the same route**: `.story-code-block-scroll` resolves `mask-image: linear-gradient(…, #000 calc(100% - 16px), transparent)` and tracks `gl-fade-start-in`/`gl-fade-end-out`. Apply `FadingScroll`. 16px fade, opacity leg on `0.6 × --reveal-clock` |
| A6 | badge silhouette axis | badge | badge dots have **one** silhouette (disc) for 4 semantic states; `StatusDot` on `/display/atoms` ships **7** (filled / hollow / donut / check / diamond / cross / dotted) and its own story says the axis keeps it legible without colour | bind `StatusDot`; drop the hand-rolled span (K6) |
| A7 | `.card-footer` edge | card | `background: none`, `border: none`; padT **18.868** / padB **30.528** = **0.618** — the command row is pushed *toward* the content it should be separated from. Its label sits **37px** inboard vs the title's **25px** — the answer is 12px further in than its question | 1px rule at mass **0.18**, inset to the content column so it runs exactly the title's width. `padT : padB = 3 : 2` (**20 : 32**, was 5 : 8) |
| A8 | `.separator[data-orientation="vertical"]` | atoms | measures **1 × 0 px** at both instances in a 65px flex parent. `Separator.vue:110-113` sets `block-size: 100%` (indefinite against an auto-height flex container) while `:101` sets `flex: none` (defeating stretch). **The rule meant to give it height is the rule that takes it away** | **CURE TESTED, DELTA BANKED:** delete `block-size: 100%`; `inline-size: 1px; align-self: stretch` → box **1 × 22.97**. `prop/sep-vert-BEFORE.png` (3 labels, no rules) → `sep-vert-AFTER.png` (2 hairlines) |
| A9 | loading vs disabled | buttons | identical `background-color` (0.52α), `opacity: 0.5`, 7-leg `box-shadow`, `backdrop-filter`. **Sole delta: `cursor: progress`** — invisible on an element with `pointer-events: none`. Indicator is a **6.2%-alpha ring on a 1.8s period**. `p.sr-only[role=status][aria-live=polite]` empty at mount, never announces | a determinate/indeterminate track at rule mass 0.18 on `--spring-transient`; `aria-busy` announced through the live region; **strike the 1.8s idle pulse** — decorative idle on a control, D10 floor violated |
| A10 | `main.demo-main-scroller` | all display | `scrollHeight 2549 / clientHeight 832`, `mask-image: none`, overlay scrollbar invisible at rest; content hard-clips mid-glyph at y=832 (visible, bottom edge of `display__card.jpeg`). Not occlusion — the dock sits in a reserved 68px band, overlap **0** | same 16px `FadingScroll` mask as A5 |
| A11 | card heading measure | card | 25.888px title in a **262px** column ≈ **11 characters/line**; the long heading wraps to **six** lines of 1–3 words. `card/styles.css:20-21` declares `container-type: inline-size; container-name: card-header` and **`grep -rn "@container" src/` returns zero readers of it** | measure floor **18 characters**. At 262px that caps the title at **~20.4px** = `--type-subheading`, not `--type-heading`. The 25.888 rung earns a plate ≥ **400px**. Bind through the container query the component already opens |

---

## 4 · RE-PROPORTION TABLE

| selector | current | target | ratio satisfied |
|---|---|---|---|
| `--card-pad-block` (`card/styles.css:5`) | `calc(24 * 1.272)` = **30.528** | **32** | block : inline = **4 : 3** |
| `--card-pad-footer` (`:7`) | `calc(30.528 / 1.618)` = **18.868** | **20** | footer : block = **5 : 8**; and it stops being the only rung derived by *division* |
| `--card-pad-title-gap` (`:8`) | `calc(24 / 2.618)` = **9.167** | **24** | rank break = `0.75 × 31.066 LH`. Shipped rank : peer = **1 : 3.33, sign inverted**; target **2 : 1** |
| `--card-pad-section-gap` (`:6`) | 30.528 | **12** | peer break = `0.5 × 24.6 LH` |
| `.card[data-size="sm"]` (`:11-13`) | pad 24→16 **only**; title 25.888 both, radius 16 both | pad **16**, title **16.4**, radius **10** | one factor `2/3` on three properties. Shipped `title : pad` swings **1.079 → 1.618**; target 1.079 → 1.025 |
| `li.surface-cell` gap | **3.2px** ×6 | **12** | body rung |
| `li.surface-cell` radius | **0** | **4** | `max(4, 10 − inset)` concentric |
| `li.surface-cell` pad | 12 | **12** | pad : gap = **1 : 1** for a cell (single content run) |
| `ul.surface-field` radius | 10 | **10** | `0.25 × h` — correct; but `--radius-field` must stop resolving to `--radius-2xl` (`radius.css:97`) |
| `.button` glyph↔label gap | **6** (39 elements) | **8** md / 6 sm / 4 xs / 10 lg | `0.5 × pad-inline` |
| `.button > svg` mobile | 16 on 60 = **0.267** for dock icons (`h-4 w-4` utility beats `--dock-icon-glyph` → `max(46.8×0.5, 16)`) | **0.40 invariant** | one glyph : box ratio. Library ships **two** (button 0.40, dock 0.50); close the utility escape (`sizing.css:216`) |
| `.segmented-tab` font-size | **20.352** (`--type-subheading`, the φ *display* rung `sizing.css:36-40` excludes from the control axis) | **14.63** | chrome sits one rung **below** prose: `chrome : prose = 1 : 1.272`. Shipped **1.094 : 1** — a **39%** swing. Full ladder at r = √φ from prose 18.608: `11.50 / 14.63 / 18.608 / 23.67 / 30.10 / 38.29` |
| control label font (all viewports) | desktop **1.000** × prose, mobile **1.500** × prose | **1.30 × prose at every viewport** | `--ui-scale` moves the control **box only** (height, pad, gap, glyph). A 44px touch target needs 44px of box, not a 21px label |
| `section.story-cels` gap mobile | **24** (= family gap) | **32** | `section : family : body = 8 : 5 : 3`. Mobile currently `24 : 24 : 12` — the hierarchy loses a rung |
| `--card-pad-inline` mobile | **24** on a 361px card (0.0665) | `max(16px, 7.7cqi)` → **28** | pad : width held at **0.077** across viewports; uses the already-declared, unread `container-type` |
| `.showcase-frame--captioned` / `--field` insets | **16 + 1px border** (137) and **24** (144) — three content edges at 120 / 137 / 144; **+17 is not on the 4px grid** | **20** on both, border drawn inside the padding box → edges **120 / 140** | two content edges, never three, separated by exactly **one gap rung**. And the frame *with* a boundary currently takes the *smaller* inset — backwards |
| `badge-atom--outline` height | **+2px** vs filled at every size (sm 21.8/19.8, md 28/26, lg 34.5/32.5) = **7.7%** of the md badge | delta **0** | filled variants carry a 1px transparent border; `outline` becomes a paint change, not a geometry change |
| status dot | **6×6** fixed both viewports; `dot : cap` falls **0.508 → 0.397 (−22%)** on mobile | **`0.36em`** | `dot = 0.5 × cap-height`. Tracks 16.4 → 5.9 and 21 → 7.6 for free, at every size, both viewports |
| `.separator` inline-size | **100%** of plate → **3.19 : 1** vs widest ink (labelled **6.67 : 1**) | content column, **1 : 1** | weight : separation = **1 : 12** → 1.33px at a 16px gap, or hold 1px and bring the gap to 12 |
| `.separator-labelled` break | **41.28 / 1246 = 3.31%** | **≥12%** = 150px = **55px clear each side** (was 12) | a hinge reads as a junction, not a speck |
| `.segmented-tabs::before` | 2px **opaque**, mass **2.00** | 2px @ **0.27**, mass **0.54** | indicator rung of `1 : 3 : 9` |
| emphasis ladder (pixel-sampled, bare ground) | quiet 1.000 · text 1.000 · **primary 1.012 (+ΔY)** · **secondary 1.018 (−ΔY)** — **1.8% of range, non-monotone, sign-flipped**, `\|secondary\| = 1.43 × \|primary\|` | plate **6 L\*** below page ground; α `0 / 0 / 0.45 / 0.90` → ΔL\* `0 / 0 / 2.7 / 5.4` → contrast `1.00 / 1.00 / 1.07 / 1.15` | monotone, single-signed, **1 : 2** between the two filled rungs |
| `presence(destructive) : presence(primary)` | **2768 : 60 = 46 : 1** (area × \|ΔY\|) | **≤ 2 : 1** | `tone` is a *hue* axis riding the secondary rung. It carries meaning in chroma, not in a 46× luminance spike. Exact `--destructive` value is a colour wave's tested call, not prescribed here (Law 6) |
| glass ladder ΔL\* | `1.89 / 2.59 / **4.11** / **3.78**` — **2.22 L\* total**, **non-monotone at the top**, beaten **4.0×** by its own opaque rung (8.80) | **0 / 2 / 4 / 6 / 8** | ≥2 L\* per step — the span the opaque rung already proves is available |
| glass blur | **7 / 7 / 11 / 11 / 14.5** (3 values, 5 rungs) | **5 / 7 / 10 / 14** calm + **16** deep | √2 series. 16 is the on-disk `--glass-blur-deep-radius` ceiling (`glass-deep.css:56`); the bench's 20 violates the ≤15px budget band and is **rejected** |
| glass rim | **eff α 0.049 on all 5 rungs** — one value | **0.03 / 0.05 / 0.07 / 0.09 / 0.12** | the ladder's discriminating channel once veil → 0. Ceiling **0.12** (D7: "a hairline and stays one") |
| `\|plate − ground\|` | **+1.00 / −0.69 / −0.38 L\*** on three cards on one page — **the sign flips**; field's own gradient noise **1.53 L\*** → figure : noise = **0.65 : 1** | **≥3.0 L\*, one sign** | `≥ 2 × the ground's gradient amplitude over one plate-width`. The FROST target already asks for this: −2% of L\*92 = **−1.84**, itself ≥ 1.53 |
| `--card` vs `--background` | `hsl(30 85% 96%)` vs `hsl(40 30% 98%)` — **2 HSL-L apart** (`color-radius.css:40,72`) | **≥6 L\*** | a 0.808 veil of a colour 2 L from ground can yield at most 1.6 L. **The alpha ladder is grading a difference that does not exist** |

---

## 5 · GLASS DEFECTS

**`backdrop-filter: none` on a declared glass surface** — every one is a defect under D7.

| # | surface | route | computed | mechanism |
|---|---|---|---|---|
| G1 | `.button[data-emphasis="primary"]` | buttons | **none**, over `oklab(…/0.808)` | `button/styles.css:43` reads `var(--glass-cell-backdrop-filter, var(--glass-blur-deep))`. **`--glass-blur-deep` is declared ONLY inside `.glass-deep`** (`glass/deep.css:64-81`) and the dark arm (`tokens/dark-arm-glass.css:51`) — verified on disk. A non-`.glass-deep` button has it undefined → guaranteed-invalid at computed-value time → initial `none`, and it **overrides `.glass-capsule`'s working `var(…, --glass-blur-floating)`**. Net: the primary action is an **80.8% cream veil with zero blur** while `secondary` beside it computes `blur(7px) saturate(1.4)` at 0.52. The higher rung is the deader material |
| G2 | `.button` inside `.card-footer` / `.card-action` | card | **none**, over `oklab(…/0.52)` | inherited `--glass-cell-backdrop-filter: none` from `.card`. The same button on `/display/buttons` computes `blur(7px) saturate(1.4)` |
| G3 | `[data-surface="opaque"]` ×7 | buttons, surface, atoms | **none**, over opaque `srgb(.992 .961 .925)` | by design — but still carrying `::before` `plus-lighter` rim + `::after` grain. Four decorative channels simulating light through a material that resolves to none. Strike per K2/K1 |
| G4 | `.segmented-tabs`, `.glass-track-well` | atoms + slider | **none**, ~50% cream veil | lead-measured, EXEC-STATE:67-69. The slider's *fill* is correctly frosted while its *track* is not |

**White specular above 0.12 α** — every one exceeds the D7 hairline ceiling.

| element | light | dark | over ceiling |
|---|---|---|---|
| `.glass-capsule` leg 1 | `rgba(255,255,255,**0.302**)` | **0.40** | **2.5× / 3.3×** |
| `.glass-capsule` leg 2 | 0.18 | 0.24 | 1.5× / 2.0× |
| `li.surface-cell` legs 1+7 composited | **0.4765** | — | **4.0×** |
| `.segmented-tabs` inset | **0.30** | — | 2.5× |

**The dark arm makes the rim 33% brighter in the mode where a bright rim reads most as plastic** (`ins/dark-display__card.png`: "Open report" reads as a chrome outlined pill). And at `border-radius: 0` on the surface cells, the 0.7-white `::before` at 0.75px turns the dark ladder into a **wireframe** — four rungs as outlined boxes, mutually indistinguishable (`ins/dark-display__surface.png`).

**The saturate contradiction — SETTLED for display** (EXEC-STATE OWED #6). Target is **+62%**. Measured, plate against page `oklch(.9374 .0204 53.2°)`:

| rung | measured | ΔC | Δh |
|---|---|---|---|
| `.glass-quiet` | `oklch(.9199 .0063 30.8°)` | **−69%** | −22.4° |
| `.glass-resting` | `oklch(.9248 .0158 42.4°)` | −23% | −10.8° |
| opaque | `oklch(.9739 .0147 70.9°)` | −28% | +17.7° |

**Every glass rung desaturates the thing it declares `saturate(1.4)` on.** The sign is inverted, and it is not a `saturate()` tuning question: a 52–95% near-neutral cream veil dilutes the lifted chroma back **past neutral** regardless of the multiplier. Quiet needs **5.2× its current chroma** to hit +62%. **The veil is the defect; the saturate value is innocent.** Near-zero veil + heavy blur + strong saturate, in that order of causation.

**Engine-conditional arms:** none found in the display category. The `.dark` arm is a *mode* arm, not an engine arm — legal in kind, defective in amplitude (above). No masking fallback found in display. `-webkit-backdrop-filter` duplication (`GlassTimeline.vue:201-202`) is a vendor prefix, not a special-case branch.

---

## 6 · DE-SHADCN NOTES

| # | tell | number |
|---|---|---|
| D-1 | **`--radius: 0.625rem`** (`radius.css:62`) — shadcn's literal default radius token, verbatim, still the root of the ladder. **5 names** collapse onto it (`--radius-lg`, `--radius-media`, `--radius-button`, `--radius-tooltip`, and `--radius` itself), of which **2 have ≤1 consumer**. Ours is a role table, not a `--radius` with size suffixes |
| D-2 | **25 radius names → 7 values.** A variant map inherited wholesale. `--radius-field` and `--radius-card` are asserted as different roles at `radius.css:20-24` ("a box is not a stadium") and both bind `--radius-2xl`. A role that resolves to its neighbour's value is a variant map, not a design system |
| D-3 | **The mono-caps eyebrow** — `.section-label` at 14.384px Fira Code, `uppercase`, `letter-spacing: 1.4384px`, on **15 of 18** display sections. That is the storybook chrome idiom, not a warm-cream library's voice |
| D-4 | **`border-radius: 0` on `.surface-cell`** ×6, inside a 10px field, in a library whose identity clause is *deft rounding*. Zero is not a rounding; it is the absence of one. Role → radius today: card 16 · pill 9999 · field 10 · **cell 0** |
| D-5 | **`data-orientation` means opposite things in two of our own components.** `Separator` names the *line's* axis; `DockSeparator.vue:57-68` names the *dock's* — so `.dock-separator[data-orientation="vertical"]` measures **27.5 × 1**, a horizontal line. Both emit truthful `aria-orientation`; only the data attribute lies. One attribute name, two meanings, one library |
| D-6 | **Two ladders, two grids, zero shared rungs.** The card family runs √φ (`9.167 → 11.661 → 18.868 → 24 → 30.528`); everything else runs 4px. Two systems, imported at different times, never reconciled — the structural signature of a port |
| D-7 | **Chrome UA blue `rgb(0,95,204)`** as the focus indicator on 4 elements in a warm-cream library. Not a port so much as the absence of a decision |
| D-8 | **Three section-header grammars across five pages of one category** (heading-only ×2, eyebrow-only ×2, both ×1). A component library with three grammars for one job has three authors and no editor |

**The two places the library states a relation are the two that survive scrutiny intact:** `--dock-separator-height: calc(var(--dock-h) * 0.5)` (`dock/styles/shell.css:65`) and `radius : card pad-inline = 2 : 3`. Every defect above is a relation that was never stated, so nothing could hold it. **This is not a token problem.**

---

## 7 · π / DELTA OBLIGATIONS

Every row here is paired before/after, same route, same engine, same viewport, DOM node count within tolerance of the working baseline (a far-off count is **VOID, not passing**).

| claim | route | engine | viewport | pair |
|---|---|---|---|---|
| K1 grain strike is a no-op | `/display/{surface,atoms,card,buttons}` | Chromium | 1440×900 dpr1 **+ dpr2** + 393×852 dpr3 | `background-image:none` on `::after` only. **Expect 0 px on surface/atoms at all three; card dpr1 ≤2,101 px / dpr2 ≤8,437 px, maxΔ ≤7** |
| G1 primary-button blur restored | `/display/buttons` | Chromium | 1440×900 dpr2 | contrast to bare ground **1.012 → ≥1.15**; ΔY single-signed |
| Emphasis ladder monotone | `/display/buttons` | Chromium | dpr2 | pixel-sampled ΔL\* `0/0/2.7/5.4`, one sign; `presence(destructive):presence(primary) ≤ 2:1` |
| Glass ladder ≥2 L\*/rung | `/display/surface` | Chromium | dpr1 + dpr2 | 5 rungs, monotone, `0/2/4/6/8` ±0.5 |
| Saturate +62% reached | `/display/surface` | Chromium | dpr2 | quiet ΔC **−69% → +62%** vs page `oklch(.9374 .0204 53.2°)` |
| Plate figure-ground ≥3 L\*, one sign | `/display/card` | Chromium | dpr2 | **all three cards**, same sign; field-noise baseline 1.53 L\* re-measured in the same frame |
| A8 vertical separator paints | `/display/atoms` | Chromium | 1440×900 + 393×852 | **BEFORE/AFTER already banked** at `prop/sep-vert-{BEFORE,AFTER}.png`; re-shoot at HEAD after the cure lands |
| K3 top-edge piping gone | `/display/surface` | Chromium | **dpr2** (the spike is 1 CSS px) | luminance profile down the cell top edge; y=2 spike **+11 → ≤+3** |
| Dark specular ≤0.12 | `/display/{card,surface}` | Chromium `colorScheme:dark` | dpr2 | wireframe read gone; `ins/dark-display__*.png` are the BEFORE |
| K14 hover guard | `/display/buttons` | Chromium `isMobile+hasTouch` | 393×852 dpr3 | `(hover:hover) false` → scale stays 1.000, rim stays 0.07 |
| A9 loading ≠ disabled | `/display/buttons` | Chromium **+ `reducedMotion:reduce`** | dpr2 | ≥1 painted channel differs; idle pulse absent under reduce |
| Mobile hierarchy restored | `/display/{buttons,card}` | Chromium `isMobile+hasTouch` | 393×852 dpr3 | `section:family:body = 32:20:12`; `control:prose = 1.30` |
| A1 focus ring, all rungs | `/display/{buttons,card,atoms}` | Chromium | dpr2 | settled tab-walk **≥420ms per stop**; **0** silent stops, **0** UA-blue stops |
| K5 landing duplicate gone | `/display` | Chromium | dpr1 + 393×852 dpr3 | 3 tiles, one title glyph each |

**WebKit cells — OWED, all rows.** `safaridriver` unavailable from this seat this session. When a driver returns, bank **`safari-app`** and **`webkit-engine`** as **separate cells** and infer neither from the other: measured, Playwright-WebKit crashes 5/5 on mount (a threshold on the population of `color-mix()`-valued custom properties — 38 keep OK, 46 keep CRASH, **249 shipped**) while real Safari 26.4 renders `/` at **302 nodes, exactly Chromium's 302**. The crash is a harness defect and is not this category's subject; the Safari cell is still owed on every row above.


# ═══════════ CATEGORY RULING (36147 chars) ═══════════

# TERMINAL RULING — category `data-feedback`

**modelId: `claude-opus-5[1m]`** · adjudicator · engine **Chromium only** · 1440×900 + 393×852 · repo untouched.
**SAFARI: OWED.** `safaridriver` refuses remote automation this session. `EXEC-STATE.md:16` records Safari LIVE at 2026‑07‑24 23:53 — **stale**; all three benches independently hit the refusal. Every WebKit cell below is OWED, none inferred.

**Benches adjudicated:** GEOMETRY (measure), PROPORTIONS-WRONG, TOO-MUCH, TOO-LITTLE. Four bench claims are **OVERRULED** (§0). Everything else is folded.

---

## 0 · OVERRULED BENCH CLAIMS — struck before the ruling, so they cannot be re-raised

| # | claim | bench | ruling |
|---|---|---|---|
| O-1 | "plate padding drifts 3.57× as a share of frame width (3.73% → 13.30%) — the mobile transposition is a squeeze" | PROPORTIONS §3 | **REJECTED.** A plate's padding serves the **type it encloses**, not the viewport. The frame *must* compress harder than the plate. The real defect is smaller and exact: plate padding transposes at **1.000** where its type transposes at **0.860** — a **16% error**, not a 3.57× one. Rule the 0.860, not the share. |
| O-2 | "row rule → ΔL 0.225 = `rgb(224,216,204)` = 1.31:1" | PROPORTIONS §2 | **REJECTED for strokes, ADOPTED for fills.** The bench's own witness for 1.31:1 is a **16px-tall filled bar**; perceived weight ≈ contrast × coverage, and a 1px rule over a 61px row is **1.6% coverage**. 1.31:1 does not survive the transfer. Strokes land at **1.86:1** (`--border`) — the value the timeline `divide-y` already uses and which the TOO-MUCH bench screenshot-corroborates as reading correctly. **1.31:1 is ruled the FILL rung** (skeleton, track), where both benches independently landed on it anyway. |
| O-3 | "`.metric-row` needs a 1px rule (0 → 0.225 / 1.86:1)" | PROPORTIONS §2, TOO-LITTLE I-12b | **REJECTED.** Measured intra-row gap **2px** vs inter-row **16px** (gap 8 + pad 4 + 4) — an **8:1** binding ratio. Proximity already does the job; six hairlines on a 129px term/value pair is the superfluity the sibling bench warns of. A 1288px five-column row and a 129px pair are **not the same job**. Cure the interval instead (§4 RP-14). |
| O-4 | "selection → `inset 3px 0 0 0 var(--foreground)`, giving `.phase-detail`'s 3px a second site" | TOO-LITTLE I-2 | **REJECTED.** That is a fill wearing a stroke's clothing, and it justifies a weight (3px) the same seat strikes 40 lines later. Selection is a **state**, so it takes the fill channel at a rung hover cannot mint (§3 A-2). `.phase-detail`'s 3px dies with no second site. |

---

## 1 · THE SERIES

### 1a · PADDING — module **4**, five rungs, one per role

| px | role | carriers |
|---|---|---|
| **4** | atom interior | `.badge-atom` (block), `.caret-value`, toast close |
| **8** | control interior | `.button` block, `.glass-dock`, `−10/+10` |
| **12** | **row** — a list item inside a plate | `.interactive-item`, `li` segment rows, `td.table-cell` block |
| **16** | **plate, secondary** — a division that holds its own column | `.metric-cell`, `.ghost-slot`, `.glass-card`, alert body, `.phase-detail` |
| **24** | **plate, primary** — a card holding a content column | `.glass-resting`, toast `li`, timeline card |

Frame gutters run a **separate 8-module** {16, 24, 32, 40} — `main`, `section.story-cels`. Two modules, nested, 8 = 2×4.

**STRUCK from padding:** `20` (p-5 → p-6), `30.528`, `10`, `8.4`, `6`, `3`, `2`, and every L/R asymmetry (toast 24 vs 32).

### 1b · GAP — the interval carries the RANK; the stroke never does

| px | role | ratio against the 1px rule |
|---|---|---|
| **4** | intra-atom (icon↔label inside a pill) | — |
| **8** | intra-row (term↔value) | — |
| **12** | **row ↔ row** | **1 : 12** |
| **24** | **group ↔ group** | **1 : 24** |
| **40** | **section ↔ section** | **1 : 40** |

**STRUCK:** `2`, `6`, `16`, `32`, `5.5824`, `1.88679`. Currently measured 1:32 (table rows), 1:16 (timeline), 1:12 (footer) — three ranks assigned at random.

### 1c · RADIUS — **five values, and it is not an independent token family**

`r = the plate's own inline padding.` The corner arc equals the content inset, so a glyph's clearance is constant all the way around. Nested flush: `r_inner = r_outer − inset` (attested, `IOS27-ARCHIVE §5g`: track r 36, inset 10–11, inner r 25).

| value | role |
|---|---|
| **0** | **cell** — a division of a plate's own grid (`td`, `tr`) |
| **12** | **row** (pad 12) |
| **16** | **plate, secondary** (pad 16) |
| **24** | **plate, primary** (pad 24) |
| **h/2** | **capsule** — any single-line control, pill, badge, rail, track, dot |

Radius values **are** the padding values. `--radius-*` collapses **25 tokens → 5**: `--radius-cell/row/plate/plate-lg/capsule`. The `.625rem` family, `--radius-md`, `--radius-panel/xl/strip` lose every consumer. Current spread: pad:radius **0.75 → 2.67 (3.6×)** across same-tier plates.

### 1d · DIVIDER WEIGHT — **one stroke, one colour, one width**

| | value | contrast | ΔL |
|---|---|---|---|
| **the rule** | `1px rgb(198,180,159)` (`--border`) | **1.86 : 1** | 0.451 |
| **everything else** | **no stroke** | — | 0 |

Rank is expressed by the **adjacent interval** (§1b), never by a heavier stroke. Containment is expressed by the plate's **under-shadow** (`ink/0.06 0 2px 8px`), not by a boundary that must out-weigh its own contents.

Kills, in one move: **16.20 : 5.02 : 1.86 : 1.38** (11.7× spread) → **1.86**, and `w·ΔL` **0 → 1.824** (7 weights) → **0.451**.

### 1e · FILL WEIGHT — the channel the stroke ladder does not cover

| rung | value | contrast | role |
|---|---|---|---|
| **quiet fill** | `rgb(224,216,204)` (`--progress-track-on-glass`) | **1.31 : 1** | skeleton plate, unfilled track |
| **hover** | `ink/0.05` | ~1.15 : 1 | transient pointer answer |
| **selected** | `ink/0.12` | ~1.40 : 1 | persistent state — hover cannot mint it |
| **header** | `--surface-tint-8` | — | a header separates by fill, not by a 5.02:1 rule |

### 1f · TYPE — one ladder, ratio **√φ = 1.272**, rooted at 16px

Rungs: 9.89 · **12.58** · **16** · **20.352** · 25.888 · 32.928 · 41.888 · 53.28 · 67.776.

| role | desktop | mobile (×0.860) | ratio to body |
|---|---|---|---|
| body | **20.352** | 17.50 | 1 |
| control / small | **16** | 13.76 | 1/√φ |
| caption / label | **12.58** | 10.82 | **1/φ = 0.618** |

label:body is **constant 0.618 at both viewports** — currently it moves 0.591 → 0.688 (**16% drift**) because 11px is a literal. 0.618 is also the measured `h1` transposition ratio; the ladder and the frame agree.

**STRUCK:** `11`, `14.384`, `16.4`, `18.608`, `20.672`, `67.776`; the entire Tailwind stock `--text-*` t-shirt ladder (a second, foreign proportional system shipped beside ours); 6 alias type tokens (`--dropdown-text` ≡ `--search-result-text` ≡ `--control-text`; and the 5-way secondary alias) — **8 tokens, 2 values**.

### 1g · MOBILE — **one scalar**, not nine

Root font-size becomes the ramp: **18.608 → 16 (×0.860)**; every spacing, gap and radius expressed in `rem`. Frame gutters keep their explicit two-rung breakpoint (40→24, 32→16), because a frame serves the viewport and a plate serves its type. **Nine transposition ratios → two: 0.860 (plate) and 0.600 (frame).** The one plate that already responds — `.metric-cell` 16→12 — is the corroboration.

---

## 2 · STRIKE TABLE

| # | element | route | why superfluous | what carries the meaning after |
|---|---|---|---|---|
| S-1 | 17 of 25 radius tokens | all | byte-identical aliases; `--radius-field` (40px control) ≡ `--radius-dialog` (600px plate) | 5 role radii (§1c) |
| S-2 | 6 alias type tokens + Tailwind `--text-*` ladder | all | 8 tokens → 2 values; a second proportional system | the √φ ladder (§1f) |
| S-3 | `::before` specular hairline on `[data-surface="opaque"]` | skeleton×4, metric×2, toast×1 | composites **1.075:1** over 0.75px, 1px from a border at **1.082:1** — they cancel to a grey smudge. `a11y-fallback.css:12-18` already zeroes it at the same `--glass-level: 0` | the opaque `--card` fill + the `0 2px 8px` under-shadow |
| S-4 | `::after` feTurbulence grain on `[data-surface="opaque"]` | same 7 plates | swing **±6.4/255 at α0.025** — below JPEG quantisation in every capture in the set | nothing lost |
| S-5 | 1px border on `[data-surface="opaque"]` | same 7 plates | see S-3; the stylesheet declares the surface is not glass | the fill + shadow |
| S-6 | `.glass-resting:hover::before { --specular-intensity: .1 }` | skeleton | fires **+43% (0.07→0.10)** on a bare `<div aria-busy>` — `role: null`, `tabIndex: -1`, no listener. MOTION-CANON G5/G7 | nothing; hover stays on `.glass-wash`/`.glass-capsule` |
| S-7 | box-shadow layers 2, 4, 6, 7 + `::before` on `.glass-wash` active | data-table | **3 superimposed top-edge speculars** (white 0.30 / white 0.25 / 0.049 ring) over `backdrop-filter: none`. The "trite, shiny, bright" stack, in-category | layer 1 (catch-light) + layer 3 (bottom) + layer 5 (lift) — the 3-part composite the rim comment describes |
| S-8 | `backdrop-filter` on 15 sub-perceptual layers | alert×9 `blur(1px)`, metric×2 `blur(1px)`, dock×4 `blur(0px)` | 1px σ is identical to `none` and still costs a backdrop snapshot + compositing layer per element | raise into the frost band (§5) or pay nothing |
| S-9 | `.segmented-tabs--underline` single-cell switcher | toast | **one cell**, `gap: 4px` with nothing to gap, cell type **20.352 > page body**, indicator `w·ΔL = 1.824` — **4.04× the plate boundary** — under a control with nothing to switch | the `<h3>` above it; the switcher does not render at <2 members |
| S-10 | 32×32 numbered event badge | timeline | restates the `<ol>` ordinal; same semantic as the 8×8 rail dot at **1:4** with hue as the only link | the 8×8 rail dot (position) + the row label (identity) |
| S-11 | 48×12 segment swatch | timeline | third carrier of one datum (swatch hue + literal `state: completed` + `100%`); `radius: 1.67772e+07px` is the sole outlier in a 450-strong `9999px` series | the rail dot directly above already paints that hue at that x |
| S-12 | 2 × `.ghost-slot` instruction plates | timeline | **3.7× the height of the 15.3px rail they describe**; prose standing in for a missing affordance | **gated on A-6 + A-7 landing first** — the caret's rest opacity and the dot's `<button>` role |
| S-13 | `0 0 0 0.5px ink/0.05` ring on `.badge-atom` | table | third edge on a 56.5×28 pill; composites **≈1.02:1**, invisible at dpr 2 | the in-hue 1px α0.30 border + the α0.15 fill |
| S-14 | `<caption>` "…status, payment method, and total" | table | names 3 of the 5 column headers visible six rows above | the headers are the caption |
| S-15 | `pr-8` asymmetry (32 vs 24) | toast | 8px reserved forever for a 24×24 button at `opacity: 0` | the close leaves the box entirely (A-8, corner-straddling) |
| S-16 | `.glass-value-mark` host node | progress | computes **0 × 16** — a zero-width element whose entire paint is a `::before` | a `::before` on the rail at `left: var(--at)` |
| S-17 | `.metric__value` loading type 67.776 | metric | **area 6.73:1 / font 3.28:1** against the value it reserves; the emptiest state gets the most mass | the settled box at 1.00:1 (A-11) |
| S-18 | `.phase-detail` 3px left rule | timeline | the only 3px in the category, at the **lowest** contrast of any divider (1.38:1) — 3× the width at 0.74× the weight | 1px `--border` at 1.86:1 |
| S-19 | `.continuous-dot` / `.segmented-dot` material fork | timeline | same class, same aria pattern, **opposite materials** (`none`+α0.91 vs `blur(7px) saturate(1.4)`) and **44 vs 40** hit targets | one dot, one material, one 44px target |
| S-20 | `bg-transparent` utility on `.interactive-item` | timeline | outranks the component's own authored `color-mix(--accent 50%)` hover — a **dead rule**, measured `:hover === true` with zero delta | the authored hover lands on the existing 0.2s leg |
| S-21 | `.metric-row` 4px block padding | metric | redundant against the 8px row gap; produces a 2:16 intra:inter ratio by accident | gap 12 alone (RP-14) |
| S-22 | off-module residue `30.528 / 8.4 / 5.5824 / 3 / 2` | toast, timeline, metric, progress | `--overlay-pad-block: calc(--spacing(6) * 1.272)` applies √φ to a **spacing** value in a linear module | the 4-module (§1a) |
| S-23 | `isMobile` font-size branch on `.badge-atom` | table | **14 → 21px (×1.50), height ×1.94** at 393 while the neighbouring `td` holds at 14 — isolated to `isMobile` alone by 2×2 matrix (dpr is innocent) | `--text-caption`, one ladder rung, at every viewport |

---

## 3 · ADD TABLE

Channel · magnitude · curve. Rank per MOTION-CANON §2. `G3` budget = ≤2 of {geometry, luminance, blur, light}.

| # | element / state | route | what is missing | channel · magnitude · curve · rank |
|---|---|---|---|---|
| A-1 | `.data-table-sort` — **sorted** | data-table | `aria-sort="descending"` column is **byte-identical in every computed property** to the four `aria-sort="none"` columns | **ink + weight**, `rgb(124,102,80)` → `--foreground` (**5.02 → 16.20:1**), `500 → 600`. **Rest state, no curve.** |
| A-2 | `tr[data-state="selected"]` | data-table | selected computes `ink/0.08` — **exactly the hover value**; hovering an unselected row makes it look selected | **fill**, hover `ink/0.05` → selected `ink/0.12` → both `ink/0.16`. Three rungs, one channel. `--duration-fast`, rank 0. Overrules I-2's 3px bar (§0 O-4). |
| A-3 | `.data-table-sort` — **hover** | data-table | zero computed delta on the sole sort affordance | **opacity** on the `↕` glyph, **0.4 → 1**, `--spring-press-duration` (0.12s) / `--ease-standard`, rank 0 |
| A-4 | error / empty / filtered-empty | data-table | three states render **pixel-identical**: `td` 1286×135.5, `rgb(28,25,23)`, `16.4px`, **`svg: 0`, `button|a: 0`** — a failure carries the weight of a success-with-no-rows | **(a) tone:** error takes `Progress.vue:121-123`'s shipped ring, `inset 0 0 0 1px color-mix(--destructive 48%)`, lead line `--destructive`. **(b) action:** Retry / Clear-filter into the **already-existing** slots (`data-table.vue:262-264`). **(c)** the cell adopts `.data-table-state` (`styles.css:18-22`), which currently ships only on the card layout |
| A-5 | live region | all 8 | every route carries an **empty** `<p class="sr-only" role="status" aria-live="polite">`; it carries nothing anywhere. `aria-busy` toggles 1→0 — that is not a message | **text**, into the existing node. No new element. |
| A-6 | `.timeline-caret` — focus | timeline | `[role="slider"][tabindex="0"]`; caret has `:hover` and `:active` arms and **no `:focus-visible`**. `:active` never fires on keydown → a keyboard user sees nothing. `(hover:hover)` false at 393 kills the other arm | **opacity 0 → 1**, one selector, curve already on the element (`--duration-fast`/`--ease-standard`), rank 0. **Cheapest row in the set; closes an entire input modality.** |
| A-7 | `.segmented-dot` | timeline | `role: null`, `tabindex: null`, a `<div>` carrying an `aria-label` on a node with no role, instructed by prose | **`<button>`** with the label it already holds; the 44×44 `::before` target already exists. Unblocks S-12. |
| A-8 | `ToastClose` | toast | `opacity: 0` at rest; **at 393 with `hasTouch: true` it is still 0** — a transient plate whose only visible dismissal does not exist on touch. First reachable at **Tab #17** against a measured **5.0s** lifetime | **corner-straddling grammar** (`IOS27-ARCHIVE §3/§6`, which names `ToastClose.vue` explicitly): opaque, no glass, no shadow, centre on the corner point, inset `0.065 × Ø`. **Ø ≥ 44** (coarse floor; also = 1.87 × r at r 24, the archive's measured badge:radius ratio). Parent → `overflow: visible`. **≥3:1 at rest, always.** Contrast channel, no curve. |
| A-9 | toast lifetime | toast | hover-pause **works and is invisible** — the plate survived 8s of continuous hover with nothing on screen saying a clock exists | `::after` hairline on the bottom edge, `scale-x 1 → 0` over the toast's own duration, **`linear`** (a clock is not a spring), paused by the same hover. One pseudo-element, one channel. |
| A-10 | toast plate rest floor | toast | hover with `:hover === true` → `background-color`, `box-shadow`, `transform`, `backdrop-filter` **all byte-identical**. G5 REST FLOOR fails on a floating, dismissible, time-limited surface | **one ladder rung** (`.glass-floating` → overlay α), `--spring-press` (0.12s), rank 0 |
| A-11 | `.metric__value` loading | metric | placeholder at **122×67.8 (8,267 px²)** for a settled box of **59.4×20.7 (1,229 px²)** | **box → 1.00:1**: font 20.352, height 1lh, width from a `ch`-measure. Tone `ink/0.15` (1.36:1) is already correct. |
| A-12 | `.glass-value-mark` — **passed** | progress | `ink/0.34` over an opaque `rgb(28,25,23)` fill is **1.00:1** — the checkpoint's most important state is the one that vanishes. `ScrollProgressRim.vue:105-112` solves the same problem by setting passed marks to **`opacity: 0`** — two contradictory non-answers | **inversion across the fill boundary**: `color-mix(in oklab, var(--card) 70%, transparent)` on-fill, `ink/0.34` on-track → **2.04 : 2.04**, equal local contrast both sides. Rides the fill's own travel, `--spring-dock` (0.21s), rank 0. `ScrollProgressRim`'s `opacity: 0` arm is struck and takes the same inversion. |
| A-13 | table overflow edge | table, data-table | **21.6%** and **73.8%** of the row hidden at 393; container computes `mask-image: none`, `box-shadow: none`, `::before`/`::after` content `none`, `tabindex: null` — a boundary with no edge and no keyboard path (WCAG 2.1.1). The Amount column is hard-clipped at the card edge in the capture | swap `Table.vue:19` for the shipped `FadingScroll` — already live on `/feedback/toast` with `tabindex="0"` and a **16px** mask. A swap, not new machinery. |
| A-14 | toast stack seam | toast | `toast[0].bottom = 635.1 == toast[1].top = 635.1`; mobile `122.2 == 122.2`. Three plates sharing edges read as one 385px band with a pinched waist where corner arcs meet | **gap 12** (the row rung, §1b) — enough that each shadow resolves and each corner arc completes |
| A-15 | disabled | data-table (loading/empty/error) | the filter `Input` **is** disabled and keeps **`blur(7px) saturate(1.4) brightness(1.02)`** under a blanket `opacity: 0.5` — frosted glass that still reads as able to take a pointer. (Corrects the brief's "0 instances": true for the default scenario only) | material-split law §3b — chrome is translucent **because** it is interactive: `backdrop-filter: none` + flat recessed fill; the 0.5 stays on **ink only**. Two channels, rest, no curve. |
| A-16 | `Alert` action + dismiss | alert | `grep -rni "dismiss\|close\|onClose" src/components/alert/` → **nothing**. Route has **0 interactive elements in `main`** across 6 plates, one of which reads *"Session expired — Re-authenticate to continue."* | `#action` slot + optional **inset, low-contrast, chromeless** dismiss (`IOS27-ARCHIVE §3` — explicitly **not** the corner form; an alert is persistent chrome). `opacity: 1` at rest. **The only row adding public API surface**, and the component cannot currently express the action its own copy demands. |
| A-17 | `.skeleton` rest plate | skeleton, data-table, metric | `rgb(246,243,239)` on `rgb(253,245,236)` = **1.02:1**, ΔRGB (7,2,−3) pixel-sampled. The 470×264.4 card — **124,268 px², the largest element on the page** — is invisible at rest. Under `reduce`, `animation: 1e-05s` and the loading state **stops existing** | fill → `rgb(224,216,204)` (§1e; already shipped as `--progress-track-on-glass`), **1.31:1, ΔL ×9.7**. Scan drops to a ≤0.10 ΔL modulation so the state survives `reduce` at full strength. Also: the fill is neutral (R−B = 7) on a warm card (R−B = 17) — the one desaturated surface in the category. |
| A-18 | alert icon | alert | icon:text column **1 : 76.6** — 256 px² of a 97,373 px² plate = **0.26%**; the only non-colour carrier of the tone | **16 → 20.352** (one √φ rung) → 1:60. Colour alone is not a tone signal. |
| A-19 | indeterminate `Progress` name | progress | 2 of 29 `[role="progressbar"]` compute `aria-label: null`, `aria-labelledby: null`, `aria-valuenow: null`, `textContent: ""` | an accessible name |
| A-20 | timeline progressbar unit | timeline | `aria-valuenow="1.6"`, **`aria-valuetext: null`** — 1.6 of what. The sibling `[role="slider"]` on the same page carries `aria-valuetext="0%"` | `aria-valuetext`; the vocabulary is present and unspent |
| A-21 | metric delta | metric | `[class*=delta],[class*=trend],[class*=direction]` → **0 matches**. A metric is a comparison object by nature and the family expresses no direction, change or threshold | signed delta at the caption rung (12.58) beside the reading; the tone vocabulary already ships 5 arms in `Alert` |
| A-22 | skeleton story resolution | skeleton | 4 static specimens, **0 interactive elements**, no settled comparison — the one thing the component must get right (does the placeholder box match the content box) is undemonstrable. Directly hides S-17/A-11 | a resolve toggle |

---

## 4 · RE-PROPORTION TABLE

| # | selector | route | current | target | ratio satisfied |
|---|---|---|---|---|---|
| RP-1 | `tbody tr` / `thead tr` `.border-b` | table, data-table | `1px rgb(28,25,23)` α1 — **16.20:1**, inherited from `currentColor` (no colour utility) | `1px --border` — **1.86:1** | rule = one stroke; rows no longer assert **2.02× the ΔL of the plate containing them** |
| RP-2 | `tr.data-table-header-row` | data-table | `1px rgb(124,102,80)` — 5.02:1 | `1px --border` + `--surface-tint-8` fill | header separates by fill (§1e), not by a second stroke weight |
| RP-3 | `.segmented-tabs--underline::before` | toast | `2px rgb(28,25,23)` α1, r 4 — `w·ΔL 1.824`, **indicator:gap = 2:4** | struck with S-9; where a tab indicator is needed it is a **filled lens**, not a stroke | a selection is a state, not a boundary |
| RP-4 | `.phase-detail` border-left | timeline | `3px rgb(223,210,195)` — 1.38:1 | `1px --border` — 1.86:1 | one stroke; 3× width at 0.74× weight dies |
| RP-5 | `div.border-t` table footer | table | `1px --border`, pad 12 → **1:12** | `1px --border`, gap **24** → **1:24** | a summary break outranks a row break by **interval**, not by ink |
| RP-6 | `td.table-cell` | table, data-table | pad 16 all round → interval **1:32** | pad-block **12** → **1:24** | row rank (§1b) |
| RP-7 | `ol.divide-y > li` | timeline | 1px, row 70.9, gap 16 → 1:16 | gap **12** → **1:12** | row rank |
| RP-8 | `.glass-resting.p-6` | metric, toast | pad 24, **r 16** — pad:r 1.50 | **r 24** | `r = pad` |
| RP-9 | `.glass-resting.p-5` | skeleton | pad 20, r 16 — pad:r 1.25 | pad **24**, r **24** | 20 leaves the series |
| RP-10 | alert plate | alert | pad 12/16, **r 10** — pad:r 1.20; row-gap:col-gap **2:12** (0.12em is leading noise) | pad **16**, r **16**; gap **8 / 12** | `r = pad`; 1:1.5 |
| RP-11 | toast `li.glass-floating` | toast | pad **30.528/32/30.528/24**, r **12**; close r 10; Undo r 6 — **three radii on one 388×136 plate**, and the *more elevated* surface is **less rounded** than the plate beneath (0.75:1) | pad **24** uniform, r **24**; Undo → h/2 | `r = pad`; elevation and radius stop inverting |
| RP-12 | `.glass-card` | progress | pad **12/16/20/16** (`px-4 py-3 pb-5`), r 16 — pad:r **0.75** top | pad **16** uniform, r **16** | `r = pad`; symmetry |
| RP-13 | `.interactive-item` | timeline | pad 12/16, r 10 | pad **12**, r **12** | row rung |
| RP-14 | `.metric-row` | metric | pad-block 4, gap 8 → intra:inter **2:16** | pad **0**, gap **12** → **2:12** | 1:6 binding; **no rule added** (§0 O-3) |
| RP-15 | `.metric__value` | metric | **20.672** | **20.352** | on-rung; +1.57% off dies |
| RP-16 | `.metric-cell .metric__value` | metric | 32.928, **fixed at both viewports** | 32.928 desktop / **28.3** mobile (root ramp) | the two readouts stand at exactly **φ (1.618)** — two rungs — instead of 1.593 (a non-integral 1.85 rungs) |
| RP-17 | `.metric__label`, `.text-micro` | metric, progress | **11px fixed at 1440 and 393**; label:body **0.591 → 0.688** | **12.58 / 10.82** via the root ramp | label:body **= 1/φ = 0.618, constant** |
| RP-18 | `--control-text` | all | `clamp(.875rem, .8rem + .25vw, 1.25rem)` → 14 / 20 — **neither endpoint is a rung**; computes **16.4**, 2.50% off 16 | both endpoints land on rungs | one ladder. **Mechanism stated, cure NOT prescribed — Law 6** |
| RP-19 | `.button` label | all | `line-height 18.04` on `font-size 16.4` — **ratio 1.10** vs 1.40 everywhere else | 1.40, or the control rung's own lh | one leading ratio |
| RP-20 | `.badge-atom` | table | 56.5×28 with `16.4px` type at lh 18.04 — label fills **64%** of the pill; at 393 breaks **one glyph per line** ("Paid" → P/ai/d), inflating the row to ~340px | type → **12.58** caption rung; **`white-space: nowrap` unconditionally**; cell `min-width` from the longest tone label at the ramp ceiling | a status pill that wraps has failed at its one job. **Cure not paint-tested — Law 6** |
| RP-21 | `.progress-rail` sizes | progress | `h-1.5` (6), default, `h-6` (24) **all compute 16px** — 17 of 17 rails; three identical 1288×16 bars under "SIZES" | **{6, 12, 24}** — a ×2 series, aspect 215:1 / 107:1 / 54:1 | one octave per rung, unmistakable. Mechanism: unlayered Vue-scoped `block-size` (`Progress.vue:109-114`) beats `@layer utilities`. **Cure = drive `--progress-size` from the `size` prop; the story stops passing height utilities** |
| RP-22 | `.progress-value-fill` | progress | `rgb(28,25,23)` α1 in a 16px capsule — **16.20:1**, tied for heaviest mark in the category | the fill rung + frost (§5) | a 6px rail was asked for and a 16px black capsule was drawn |
| RP-23 | `main` padding | all | 40/32 → 24/16 (×0.600 / ×0.500) | 40/32 → **24/16** ✓ **keep** | frame compresses two rungs; correct as shipped |
| RP-24 | every plate padding | all | **×1.000** at 393 | **×0.860** via the root ramp | the type's own ratio; `.metric-cell`'s 16→12 is the corroborating instance |
| RP-25 | `.continuous-region::after` insets | timeline | `1.19531px\|0\|1.19531px\|351.984px` for first/active vs `10%\|0\|10%\|auto` for last — **two unit systems on one pseudo** | one system | — |

---

## 5 · GLASS DEFECTS

### 5a · `backdrop-filter: none` on a surface the class calls glass

| # | surface | route | computed | verdict |
|---|---|---|---|---|
| G-1 | `.progress-rail.glass-track-well` | progress | `none`, bg **opaque `rgb(224,216,204)`**, fill **opaque `rgb(28,25,23)`** | **the lead-measured defect, confirmed.** A pure binary black-on-grey bar on cream paper at **16.20:1**, on a component named `.glass-track-well`. **Zero glass.** |
| G-2 | `.segmented-tabs--underline` | toast | `none` | the lead-measured defect's twin, in-category |
| G-3 | `.glass-track.timeline-rail`, `.segmented-track`, `.continuous-track` | timeline | `none`, `oklab(0.9739 … / 0.65)` | **65% veil, no blur** — the exact inversion of the frost law |
| G-4 | `.glass-fill` | timeline | `none`, α0.30 | slider disease: the *fill* frosts, the *track* does not — here neither does |
| G-5 | `.segmented-dot` | timeline | `none`, tone α0.91–0.92 | and its sibling `.continuous-dot.segmented-dot` **is** `blur(7px) saturate(1.4) brightness(1.02)` — **same class, opposite material** |
| G-6 | `.button.glass-wash[aria-pressed]` | data-table | `none`, `oklab(0.936 … / 0.808)` | an **81% veil with zero blur** under **3 stacked white speculars** (S-7) |
| G-7 | `.dock-plate` at t ≈ 0.9s | progress (4/4 inline docks) | **`blur(0px) saturate(1.2)`**, opaque cream | settles to `blur(7px)` — a transient flatten with no a11y query active |
| G-8 | `.glass-resting`, `.skeleton` | skeleton, metric, toast | `none`, opaque | correct per `surface-axis.css:93-103` — but see S-3/S-4/S-5: the opaque rung keeps grain + highlight that `a11y-fallback.css:12-18` zeroes at the same `--glass-level: 0` |
| G-9 | alert ×9, `.metric-cell` ×2 | alert, metric | `blur(1px) saturate(1.4)` against a **α0.426** veil | **heavy veil + near-zero blur** — the inversion, at **1/7 the library's own quiet rung (7px)** and 1/11 of floating. Four saturated pastel gels + one hard black outline box in the capture |

**Ruled:** every surface above resolves a **non-`none`** `backdrop-filter` at the `.glass-quiet` rung (**blur 7px**) or drops the declaration entirely (S-8). No middle. Saturate → 1.6.
**RESERVED:** the veil **alpha** is not ruled here. `EXEC-STATE` OWED #6 — motion canon says saturate down on cream, iOS photometry measures **+62%** and says up — is explicitly reserved to `W-FROST`'s first paired capture. Ruling it from arithmetic would be the second wrong prescription (Law 6).

### 5b · White specular above 0.12 alpha

| # | source | value | verdict |
|---|---|---|---|
| G-10 | `.glass-wash` active layer 1 | `rgba(255,255,255,0.30) 0 1px 0 0 inset` | **KEEP — the one catch-light** |
| G-11 | `.glass-wash` active layer 7 | `rgba(255,255,255,0.25) 0 0.5px 0 0 inset` — `glass-fx.css:40` `--glass-highlight` | **STRIKE.** Second light on the same edge |
| G-12 | `.glass-wash` active layer 2 | `rgba(255,255,255,0.18) -1px 0 0 0 inset` | **STRIKE** |
| G-13 | toast `li.glass-floating` | 1px inset white specular **α0.302**, ×3 stacked plates at gap 0 | **STRIKE to a hairline**; MOTION-CANON §9.10 — the specular rim is a hairline and stays one |
| G-14 | `[data-surface=opaque]::before` | `srgb(.949,.929,.890)/0.7` at `opacity 0.07` → effective **0.049** | below 0.12 but **STRUCK anyway** (S-3): it cancels the border 1px away |

### 5c · Engine-conditional arms

**None measured in-category.** One duplicate-name defect: **`--glass-material-rim` has two live definitions** — `shadow.css:38` (`0 0 0 0.5px shadow-color 5%`) and `rim.css:90` (a 4-stop directional rim). One name, two materials. **WebKit/Safari cell: OWED.**

---

## 6 · DE-SHADCN NOTES

| # | site | the tell |
|---|---|---|
| D-1 | `src/components/table/TableRow.vue:14` `'border-b'`; `TableHeader.vue:11` `'[&_tr]:border-b'` | **no colour utility** → the rule inherits `currentColor`. `equalsCurrentColor: TRUE` on 4 of 5 measured rules. This is shadcn's class string landing on our ink and producing a **black ledger grid inside a tan card** at 16.20:1. The one rule that got it right (timeline `divide-y`, `equalsCurrentColor: FALSE`) is the one nobody ported. |
| D-2 | Alert default: `class="relative w-full rounded-lg border px-4 py-3"` | shadcn Alert verbatim. The 5 toned arms override the border with their hue at α0.40, so **only the neutral status shows the black outline** — the *good news* carries 2.5× the alpha and ~8× the contrast of destructive. |
| D-3 | 4 × `class="rounded-md border border-border bg-background px-3"` | timeline. `radius: 6px`, **`cursor: default`** on an enabled button, inside a glass card whose every other control is a `9999px` `.glass-capsule`. Two button vocabularies, side by side in one frame. An enabled button with `cursor: default` is an action with no invitation. |
| D-4 | `--text-base/lg/xl/2xl/3xl/4xl` = 1/1.125/1.25/1.5/1.875/2.25rem | Tailwind's stock t-shirt ladder shipped **beside** our √φ ladder. Ratios 1.125/1.111/1.20/1.25/1.20 — a second, foreign proportional system. |
| D-5 | `--radius` / `--radius-lg` / `--radius-sm` / `--radius-xs` / `--radius-md` | shadcn's radius idiom wearing **role-name aliases** (`--radius-field`, `--radius-dialog`, `--radius-card`, `--radius-tooltip`). 25 tokens, 8 values, zero role information. |
| D-6 | `.data-table-state` (`styles.css:18-22`) defined and **unused on desktop** | desktop renders `table-cell … p-4`; the muted, centred state treatment ships only on the card layout. A ported style block that lost its consumer. |
| D-7 | `Skeleton.vue:31-36` `background: var(--muted)` | shadcn's `bg-muted animate-pulse` — correct on shadcn's grey-100, **1.02:1 on warm cream**. The port kept the token and lost the contrast. |
| D-8 | `bg-transparent` on `.interactive-item` | a utility from the port outranking the component's own authored `color-mix(--accent 50%)` hover. The port silently wins over the design. |
| D-9 | `divide-y` + `border-b` + `--border` | three idioms for one job, on adjacent routes. |
| D-10 | `<caption>` restating the column headers | shadcn's Table demo copy, shipped as content. |

---

## 7 · π / DELTA OBLIGATIONS

Every visual claim below needs a **paired** capture (before/after), route + engine + viewport. **Safari/WebKit: OWED on every row — `safaridriver` remote automation refused this session; no cell may be inferred from Chromium.**

| # | claim | route | engine | viewport | mode |
|---|---|---|---|---|---|
| π-1 | row rule 16.20 → 1.86:1 does not orphan the row separator | `/data/table`, `/data/data-table` | Chromium ✓ · **safari-app OWED** | 1440×900, 393×852 | light + dark |
| π-2 | skeleton plate 1.02 → 1.31:1, and the `reduce` arm survives | `/feedback/skeleton`, `/data/data-table#loading` | Chromium ✓ · **OWED** | 1440×900, 393×852 | light + dark, `prefers-reduced-motion: reduce` **and** no-preference |
| π-3 | alert `blur(1px)` → 7px reads as frost, not as a gel; the frost quadruple (mean L −2%, σ 80% kept, HF 10% kept, sat +62%) | `/feedback/alert` | Chromium ✓ · **OWED** | 1440×900 | light + dark |
| π-4 | `.glass-track-well` / `.segmented-track` resolve a non-`none` `backdrop-filter` and the rail still reads at ≥3:1 | `/feedback/progress`, `/data/timeline` | Chromium ✓ · **OWED** | 1440×900, 393×852 | light + dark |
| π-5 | 3 speculars → 1 on `.glass-wash` active, without losing the pressed read | `/data/data-table` | Chromium ✓ · **OWED** | 1440×900 | light + dark |
| π-6 | opaque-rung border + `::before` + `::after` removal is not perceptible (S-3/4/5) | `/feedback/skeleton` | Chromium ✓ · **OWED** | 1440×900 @ dpr 1 **and** dpr 2 | light + dark |
| π-7 | corner-straddling ToastClose at Ø ≥ 44 with `overflow: visible` — no clipping, ≥3:1 at rest, visible with `hasTouch` | `/feedback/toast` | Chromium ✓ · **OWED** | 1440×900, 393×852 | light + dark |
| π-8 | toast stack gap 0 → 12 resolves three plates as three objects | `/feedback/toast` (2 + 3 fired) | Chromium ✓ · **OWED** | 1440×900, 393×852 | light |
| π-9 | badge `nowrap` + caption rung ends the one-glyph-per-line break; the column reserves the room | `/data/table` | Chromium ✓ · **OWED** | 393×852 @ `isMobile: true`, dpr 1 **and** 3 | light |
| π-10 | progress `{6,12,24}` render as three distinct rails | `/feedback/progress` | Chromium ✓ · **OWED** | 1440×900 | light |
| π-11 | checkpoint inversion reads at 2.04:1 on **both** sides of the fill boundary | `/feedback/progress` @ 42% | Chromium ✓ · **OWED** | 1440×900 | light + dark |
| π-12 | hover 0.05 / selected 0.12 / both 0.16 are three distinguishable rows | `/data/data-table` | Chromium ✓ · **OWED** | 1440×900 | light + dark |
| π-13 | `FadingScroll` swap shows the 16px edge and takes keyboard focus | `/data/table`, `/data/data-table` | Chromium ✓ · **OWED** | 393×852 | light |
| π-14 | root-ramp transposition: every plate padding ×0.860, frame ×0.600, node count unchanged | all 8 | Chromium ✓ · **OWED** | 1440×900 → 393×852 | light |
| π-15 | radius {0,12,16,24,h/2} — elevation and radius no longer invert (toast r ≥ card r) | `/feedback/toast`, `/data/metric` | Chromium ✓ · **OWED** | 1440×900 | light |
| π-16 | S-10/S-11 removal does not orphan the event's position or hue | `/data/timeline` @ scrollTop 0 and 1150 | Chromium ✓ · **OWED** | 1440×900, 393×852 | light |
| π-17 | disabled loses frost, keeps 0.5 on ink only | `/data/data-table#loading` | Chromium ✓ · **OWED** | 1440×900 | light + dark |

**Node-count gate:** desktop↔mobile parity is currently identical on 7 of 8 routes (83/123/89/186/86/219/39; toast 99→102). Any post-change capture whose node count departs that baseline is **VOID, not passing** (`ANALYSIS-SPEC D2`).

---

**Counts.** Series: 5 padding rungs · 5 gap rungs · 5 radius values (from 25 tokens) · **1** divider weight (from 7 spanning 0–1.824) · 4 fill rungs · 4 type rungs on one ratio (from 10 sizes on two ladders). **23 strikes · 22 additions · 25 re-proportions · 14 glass defects · 10 de-shadcn sites · 17 π obligations, every WebKit cell OWED.**


# ═══════════ CATEGORY RULING (31884 chars) ═══════════

# TERMINAL RULING — CATEGORY `forms`

**modelId `claude-opus-5[1m]`** · adjudicated against three benches (geometry, D12-proportion, SUPERFLUOUS, INSUFFICIENT) + `ANALYSIS-SPEC` D2/D12, `MOTION-CANON` §3/§4/G1-G7, `IOS27-ARCHIVE` §1/§3, `EXEC-STATE` lead-verified facts. Chromium 1440×900 DPR2 + iPhone 15 Pro, live `localhost:4188`. **Every WebKit cell OWED** — `safaridriver` refuses this seat; `EXEC-STATE:16-20` records Safari LIVE at 2026-07-24 23:53 ET and it is not live now. No cell inferred.

New measurements this seat (`scratchpad/adj-forms/a1.mjs`, `inputs.png`): page `rgb(243,228,219)` **L 230.5** · plate `rgb(253,245,236)` **L 246.05** · field `rgb(243,236,226)` **L 236.77** · 25 plates on `/forms/inputs`, all `data-surface="opaque" data-material="content" data-grain="false"` · 19 sliders, 4 carry marks, **0 carry `step`**, `aria-valuetext` null ×19, standard thumbs w0/op0 ×13, spectrum thumbs 6/12/18px op1.

---

## 0 · THE FOUR COLLISIONS, RESOLVED

| # | collision | ruling | evidence |
|---|---|---|---|
| C1 | D12-11 "plate fails frost by +20.8 L" **vs** MOTION-CANON §3(a) "content is never frosted" | **Neither. It is a DEMO defect.** `ladder.css:121-132` — `.glass-resting` *does* publish `backdrop-filter: var(--glass-blur-resting)`. `ShowcaseFrame.vue:40` hard-codes `surface: "opaque"`, and `surface-axis.css:93-102` then sets `backdrop-filter: none`. The library glass is intact; the demo chassis opts out of it. Fix the chassis, do not retune the ladder. | computed + file:line |
| C2 | S3/S4/D12-14 **strike** the plates **vs** D12-09/D12-02/D12-07 **re-proportion** them | **Strike wins where the plate groups <2 controls** (25×1 control on `/forms/inputs`; 11.7% ink on `/forms/chip`). With the plate gone, D12-02 (proximity inversion), D12-07 (corner inversion 1.25→2.06×) and half of D12-09 **dissolve**. Only `/forms/labeled-field` (88.1% ink, 33 children) keeps a plate and takes the re-proportion. | 25/25 single-control; 151px of chips in a 1288px plate |
| C3 | S9 **strike 25 value marks** **vs** F-INS-12 **give marks a state** | **Split by data.** 0 of 19 sliders carry `step`; the marks are at arbitrary pitches (300/597/996/1266 — non-uniform). IOS27 §1's absorb grammar requires stops. **Strike on continuous; keep + `data-state` on stepped**, of which the category currently mounts none. | measured this seat |
| C4 | D12-22 **add hover to 9 null classes** **vs** F-INS-1 **hover destroys the checkbox readout** | **Both. Add the rung, move the channel.** Hover never writes `background-color` on a control whose *state* is `background-color`. Channel = well depth + one blur rung, inside `@media (hover: hover)`. | tap → checked box paints hover-cream `oklab(…/0.5525)` and sticks |

---

## 1 · THE SERIES

### 1.1 Space — φ, six rungs, one role each (21 shipped values → 6)

| rung | px | role | absorbs |
|---|---|---|---|
| 0 | **4** | inside a control — shell inset, tab gap | 1, 4, 6 |
| 1 | **8** | an atom and its glyph | 6, 8, 10 |
| 2 | **12** | a control and its label — *the binding gap* | 12, 14, 16 |
| 3 | **20** | a plate's own wall | 16, 20, 24 |
| 4 | **32** | plate ↔ plate | 24, 32, 40 |
| 5 | **52** | section ↔ section | 40, 48 |

Ratios 2.00 / 1.50 / 1.67 / 1.60 / 1.63 — mean **1.60** (φ − 1.2%); every rung ≥1.5× its neighbour, so no two are confusable. Two values are **derivations, not members**: `.number-field__input` inline pad `= calc(44 + rung0)`; `.switch__track` pad `= calc((track − thumb)/2 − border)`.

**Coarse-pointer rule:** rungs 0-3 are viewport-invariant; rungs 4 and 5 step **down one rung** (32→20, 52→32). This replaces the measured ×0.60 section squeeze against ×1.00 everywhere else.

### 1.2 Radius — role, not literal (14 names / 7 values → 5 roles)

| role | value | expresses |
|---|---|---|
| **pill** | `9999px` (= 0.5 h) | one line of text or one glyph: field, chip, tab, switch track, slider track, toggle item, radio |
| **tick** | `0.30 × h` = **6px @ h18** | **many-of-N** — the checkbox, and only the checkbox |
| **panel** | **16px** | a box of content: textarea, vertical chip, group box |
| **card** | `calc(0.5 × --control-h-md + 20)` = **40 / 50 mobile** | concentric with its tallest child (`R_outer − R_inner = pad`) |
| **media** | **10px** | as shipped |

`50%` is **struck** (14 sites) — one spelling, `--radius-pill`; a stadium degrades correctly on a non-square box, `50%` ellipses. Strike `--radius-field`, `--radius-dialog`, `--radius-ctx` (five names, one number, `radius.css:61-129`).

### 1.3 The two ink ledgers — this is the load-bearing distinction

**Species, not depth, sets line weight.** A control edge carries an affordance; a grouping line carries nothing.

| ledger | α | 1px contrast on our cream | who |
|---|---|---|---|
| **`--ink-boundary` = 0.48** | 0.48 | **3.0 : 1** (WCAG 1.4.11 floor, computed on page `rgb(243,228,219)`) | every control perimeter, the focus ring, the selected-tab indicator |
| **grouping ladder** | 0.07 / 0.05 | 15.4 L / 11.0 L | plate↔page edge / group↔group rule |

Derivation of 0.07: plate L 246.05, page L 230.5, ink L 25.5 → break-even α = 15.55/220.5 = **0.0705**. At that alpha the border sits exactly at page luminance — a single monotone step, no bright ridge, no dark ridge. Line : step = **0.99**, satisfying "line ≤ 1.0 × the step it announces".

### 1.4 Divider weight : adjacent gap

| rank | role | weight | α | contrast | weight : gap |
|---|---|---|---|---|---|
| A | selected-state indicator | 2px | **0.48** | 98 L | 2 : 12 = **1 : 6** |
| B | group ↔ group inside a plate | 1px | **0.05** | 11.0 L | 1 : 12 |
| C | plate ↔ page | 1px | **0.07** | 15.4 L | 1 : 32 |
| — | specimen ↔ specimen | **0px** | — | — | whitespace only, 32 |

Shipped today: **one** rule in the entire category, at α **1.0 / 204 L**, and it marks "which of 7 stories". Rank A drops it 2.1×.

### 1.5 Type — one clamp, φ^(1/4) rungs

| role | px | step to next |
|---|---|---|
| story `h1` | **32.93** (+6) | — |
| section `h2` | **20.35** (+2) | φ = 1.618 |
| field VALUE | **16.00** (0) | φ^(1/2) = 1.272 |
| field label · story prose | **14.19** (−1) | φ^(1/4) = 1.128 |
| section-label · story-switcher tab | **12.58** (−2) | φ^(1/4) = 1.128 |

`label : value = φ^(−1/4) = 0.887` **at every viewport** (shipped: 1.000 desktop, 0.667 mobile). Mechanism: **one `clamp()` on `--type-body`; all rungs `= base × 1.127838^n`** — the idiom `scale.css:125-133` already ships for exactly one pair. Kills the 2.6% inter-rung drift from four independent slopes.

Leading: five named values only (`scheme-motion.css:54-59`). 1.10 and 1.00 are not in the token set and are struck.

### 1.6 Control heights — one series, one meaning for `md`

`field {36, 40, 44}` · `slider track = 0.5 × control-h → {18, 20, 22}` · **the spectrum height series {12, 24, 36} is struck** — variants differ by handle and fill, never by metrics.

---

## 2 · STRIKE TABLE

| # | element | route | why superfluous | what carries it afterwards |
|---|---|---|---|---|
| K1 | `ShowcaseFrame` plate ×25 (`demo/chassis/showcase/ShowcaseFrame.vue`) | `/forms/inputs` | 25 of 25 hold **exactly one control**; field spans **93.4%** of inner width. A second boundary around one thing. | label + the field's own edge — the grammar `/forms/number-field`, `/checks`, `/toggle`, `/slider` already use with **zero** plates |
| K2 | `ShowcaseFrame` plate ×2 | `/forms/chip` | 1288×110 plate around **151px of chips = 11.7% ink**; 1089px bare cream | the chips' own capsule edges (already the strongest edge in the category) |
| K3 | `.glass-resting::before` specular (`material.css:137`) under `[data-surface="opaque"]` | all 7 | plus-lighter catch-light on a plate with **no backdrop to catch**; L **254.42**, the brightest pixel on the traverse, **+8.37 above the plate's own interior**. Paired diff: inputs 36,104px, chip 22,008px | the 1px border + `ink/0.06 0 2 8` |
| K4 | `.glass-*::after` grain on forms surfaces (`grain-overlay.css`, 79 lines) | all 7 | **0 changed pixels on 7/7 routes**, 5.18M px each, bit-identical. 25/27 carriers `display:none`; the 2 live ones at α 0.025 on cream round to nothing | nothing — the paired capture is identical. **Global strike HELD** pending the dark arm (`dark-arm.css:240`, α 0.045) |
| K5 | `.glass-chip` drop `ink/0.14 0 8 24` + ring `ink/0.05 0 0 0 .5` + `border-color` on a 0-width border | `/forms/chip` | blur : own height **0.686 = 7.7×** its container's 0.089; α **2.3×**; **7 layers on 34.97px** vs 1 on the 1288×90 plate. Strip-diff 9,630/17,800 crop px | the white `0.25 0 .5 0` hairline + the 83.2% cream fill |
| K6 | `.glass-chip[data-state=on] scale: 1.07416` at rest | `/forms/chip` | settled ≥4s; **2.59px height mismatch in one flex row**; magnifies its own 0.5px hairline and 16.4px text by 7.4% | fill + border. The 1.22-peak `linear()` is the arrival, not the destination |
| K7 | `.checkbox__seat` (44×44 `aria-hidden` span, 0 children) | `/forms/checks` | three spellings of one 44px target on one page; only this one mints a node | `min-height/min-width: 44px` on `.checkbox` — the mechanism `.switch` proves two rows below |
| K8 | `.checkbox__indicator` (14×14, transparent, no shadow/border/radius) ; `.number-field` ⊃ `.number-field__content` (identical 624×44 rects, both invisible) | `/forms/checks`, `/number-field` | boxes that paint nothing and centre one child | the parent that already exists |
| K9 | `glass-specular-track` on the standard `.slider-thumb` + `::before` (w0, op 0.07) | `/forms/slider` ×4/route | specular machinery on a **0×20, opacity 0** element | nothing — width 0 × opacity 0 |
| K10 | `.glass-value-mark` ×25 (continuous sliders) | `/forms/slider` | `aria-hidden` parent, no `aria-label`, no `data-state`, **no `step` on any of 19 sliders**, non-uniform pitch | fill length + the mono readout. **Order: lands only after A3** |
| K11 | 2 of 3 mono captions (`align · left`, `density · comfortable`) | `/forms/toggle` | restate the pressed item's own word at **16.4px — identical to the label restated** | `[data-state=on]` fill `rgb(223,210,195)` + `1px @ 0.28`. The multiple-select caption folds into section prose |
| K12 | `[data-variant=default]` off-item `border: 1px rgba(0,0,0,0)` ×6 | `/forms/toggle` | a layout reservation shipped as a paint declaration | size the on-state ring inside the item's own box |
| K13 | one of the two toggle-group boundary grammars | `/forms/toggle` | `outline`: no shell at all, frost on the items. `default`: 5-shadow shell, `backdrop-filter: none` on items. One group, one owner | the surviving grammar (shell owns the boundary) |
| K14 | `border-radius: 10003px` on `.toggle-group[default]`; `3.2/6.4/9.6px` on `.slider-thumb`; `4px` on a 2px underline | `/forms/toggle`, `/slider`, `/inputs` | 10003 = arithmetic on the pill sentinel, discarded by the h/2 clamp at every padding value. 3.2/6.4/9.6 all **exceed the w/2 ceiling** (3/6/9) — unreachable at every size | `--radius-pill`; the clamp |
| K15 | `--radius-inset` relay for control-bearing plates (`radius.css:131-146`) | all | never published by a single card; resolves to the root `0px`, so `calc(--radius-ctx − --radius-inset)` returns the parent's own corner. A `calc()` whose result never reaches paint | `--radius-card: calc(0.5 × --control-h-md + 20)` — derive the plate from its tallest child, not the child from the plate |
| K16 | `.segmented-tab` `font-size: var(--type-subheading)` (`segmented.css:309`) + `transition: color … ease` (`:322`) | `/forms/inputs` | tab label at **20.352px — byte-identical to `h2`**, on a page that has no `h2`; 1.41× the section-label that titles every real section. Bare `ease` against `cubic-bezier(0.4,0,0.2,1)` everywhere else | rung −2 (12.58px); the one curve |
| K17 | the 4-layer inset quad's two lateral legs (`white/.18 -1 0 0`, `ink/.04 1 0 0`) | 5 selectors | three simultaneous edge assertions on one 1px ring (border + quad + fill step); 4 inset layers on a **16×16** checkbox = 1/8 of the element per side | the 1px border (ledger 1.3) + a 2-leg well (§3 A6) |
| K18 | `.label-requirement` destructive arm (`Label.vue:84-86`) | all | a pristine required field wears the **exact error red** `rgb(219,36,36)` | the base rule's `--muted-foreground` — already there, 3 lines above |
| K19 | three of the four `invalid` grammars: 2px border (`number-field`), inset ring (`slider-track`), outer `0.35` ring (`switch__track`) | all | four spellings of one state | one grammar: `1px solid var(--destructive)` + the A9 glyph |
| K20 | `:not([data-variant="spectrum"])` gates at `Slider.vue:384, 397, 475` | `/forms/slider` | they gate the **visible-handle, handle-focus and handle-held recipes** to the colour picker, leaving the value slider with a 0×20 invisible thumb | the same recipes, ungated (`Slider.vue:508-566`) — see A3 |

---

## 3 · ADD TABLE

| # | element / state | route | what is missing | channel · magnitude · curve |
|---|---|---|---|---|
| A1 | `input`, `textarea` hover | `/forms/inputs` | `transition-duration: 0s`, hover Δ **NONE** — the most-used control in the library has no rest response (MOTION-CANON §4 REST(i)) | **deepen the well**: ink bottom inset 0.06 → **0.10**, + one blur rung (7 → 11px). 2 channels (G3). `--spring-press` **0.12s**, `--transition-liquid-spatial`. `@media (hover: hover)` |
| A2 | 39 unguarded `:hover` rules (57% of 69) | all | G7 violated 39×; on touch a freshly-checked box keeps the hover cream `oklab(…/0.5525)` under a `rgb(251,250,248)` tick and **sticks until the next tap** | wrap in `@media (hover: hover)`; **hover never writes a channel that carries state** |
| A3 | the slider handle | `/forms/slider`, `/labeled-field` | 13 of 19 thumbs are **w 0, op 0, radius 0**, and one of them is `document.activeElement` after Tab wearing Chrome's UA `rgb(0,95,204) auto 1px` — the only blue in a warm-cream library | **the cure already ships**: ungate `Slider.vue:508-566`. Handle = circle `d = trackH − 2·inset` (14.4 @ h20), `--radius-pill`, fill `rgb(251,250,248)`, no glass, no specular (IOS27 §1 "solid white pill"). Focus ring moves off the **1288px** track (aspect 64.4:1) onto the handle. `cursor: pointer` → `grab` → `grabbing` |
| A4 | slider fill inset | same | fill height **= track height**, inset **0**, same corner — paint on a track, not an object in it. Reads as a progress bar (`forms__slider.jpeg`) | **inset = 0.14 × track h** (IOS27 §1, measured 10-11pt on 72pt); fill r = track r − inset → sm 1.7/8.6/4.3 · md 2.8/14.4/7.2 · lg 3.1/15.8/7.9 |
| A5 | `aria-valuetext` | same | null ×19; thumbs announce `22`/`78` against a visible `$22 – $78`, `43` against `43%` | bind the formatter that already renders the numeral |
| A6 | field recess | `/forms/inputs` | field L **236.77** vs page L **230.5** = **+6.2 raised**, once K1 removes the plate. IOS27 §1: iOS renders the field *darker* than its host | fill = host − **4% L** → target **L 221.3 ≈ `rgb(233,219,210)`**; white top inset **0.30 → 0.12**; ink bottom inset 0.06 |
| A7 | read-only | `/forms/inputs` | authored and paints **Δ (+1,+1,+2)/255** — cream mixed into cream; 3 differing properties, all the same colour; `caret-color: rgb(28,25,23)` blinks in a field you cannot edit | recess **≥4% L** below the editable field; `cursor: default`; `caret-color: transparent`; drop the top specular (a recess has no top light) |
| A8 | unchecked `.checkbox` / `.radio-group__face` | `/forms/checks` | border contrast **1.19:1** and **1.02:1** against WCAG 1.4.11's 3:1 — the radio's edge is effectively absent; both read as the same pale disc | 1px @ **`--ink-boundary` 0.48 → 3.0:1**. **Shape carries the semantic**: checkbox → `tick` r6 @ h18; radio → `pill` @ h18. Same size, different shape |
| A9 | every destructive message | `/forms/inputs`, `/compositions/form-validation` | colour-only: `querySelector('svg') === null`, no `role`, and the summary identifies fields as "the highlighted" ones | 16×16 `circle-alert` inline-start (lucide already imported: `check`, `minus`, `plus` ship) |
| A10 | focus ring alpha | all | `ink/0.30 0 0 0 2px` composites to **1.91:1** against page L 230.5 — **the focus indicator itself fails 3:1** | → **0.48**, the one `--ink-boundary` constant. Not raised by any bench; arithmetic on the shipped alpha + measured page colour |
| A11 | disabled | all | one channel, `opacity: 0.5`, which **halves the only thing carrying the boundary** — the field recess falls 9.28 → 4.64 L. `.checkbox`/`.radio-group__face` still run `scale 0.96` while disabled | hold geometry + border at full alpha; ink → 0.45, **chroma → 0**. Same law as the modal scrim: *dim ≠ desaturate*. Strike the disabled press transform |
| A12 | `.glass-chip__remove` | `/forms/chip` | the **destructive** action has hover Δ **NONE**, press Δ **NONE**, while its benign host carries hover 1.015 / press 0.9942 / focus 1.074. 20×20 desktop = 0.57 of its chip's height, below the 24px floor | box **20 → 24**; hover bg `ink/0.10 → destructive/0.12`, `color → rgb(219,36,36)`; press `scale 0.94`; `--spring-press` 0.12s. IOS27 §3: **inset, chromeless** grammar — *not* the corner-straddling disc |
| A13 | OFF `.switch__track` | `/forms/checks` | OFF **1.13:1** vs ON **10.47:1** — a **9.27×** swing on one channel; hover Δ = one property, `::before` opacity 0.07→0.10 ≈ **0.021 alpha on a 0.75px ring** | 1px @ `--ink-boundary` 0.48 on the OFF track; hover pairs the specular leg with `.switch__thumb scale 1 → 1.06` (the one channel the state does not occupy), `--spring-press` |
| A14 | bounded `textarea` overflow | `/forms/inputs` | `scrollHeight 344 > clientHeight 293`; `mask-image: none`; the last line is **sliced through its x-height by the field's own 16px bottom radius** | the **y-arm of `.fading-scroll`** — shipped and correct on the same page (`--x` arm, 16px feather). Mask only, no new element |
| A15 | `[data-variant=default]` off item | `/forms/toggle` | `bg transparent` + `border transparent` + `shadow none` — no boundary between adjacent options | rank-B rule, 1px @ ink **0.05**, against the 4px shell gap = **1 : 4** |
| A16 | the surviving plate's internal division | `/forms/labeled-field` | 419px, **33 children**, zero rules; grouped by gaps of 4/8/12/24 whose adjacent ratios run 1.20-1.33 — below discrimination at every level | at ≥3 sibling groups: rank-B rule, 1px @ ink **0.05**, weight : gap = **1 : 12** |
| A17 | `button[type=submit]` "Review details" | `/compositions/form-validation` | authored `data-emphasis="secondary"` with **no cancel to be secondary to**, α **0.52** — less opaque than a decorative chip (0.832). The affordance ladder's top rung is empty on the one real form | flip the emphasis. **No new machinery** |
| A18 | `button.control-surface[role=combobox]` | `/forms/labeled-field` | `cursor: default` — the one interactive in the category that says "not clickable"; every peer is `pointer`, every disabled one `not-allowed` | `cursor: pointer` |
| A19 | number-field at-limit | `/forms/number-field` | at 99 the `+` takes `opacity: 0.5` — **the same channel and value as whole-component disabled**; at-limit inside a disabled group is unresolvable | at-limit = ink only (0.45, chroma 0, per A11); disabled keeps opacity + `not-allowed` |
| A20 | `.glass-value-mark[data-state]` — **stepped sliders only** | — | no stepped specimen is mounted anywhere in the category, so IOS27 §1's absorb grammar is undemonstrated | mount one stepped slider; passed stop `ink/0.34 → cream/0.70` + `mix-blend-mode: plus-lighter` so it reads *through* the fill instead of vanishing under it |

---

## 4 · RE-PROPORTION TABLE

| # | selector | current | target | ratio satisfied |
|---|---|---|---|---|
| R1 | inter-card gap, `/forms/inputs` | **16** (< card padding 21) | **32** | 12 : 20 : 32 = 1 : φ : φ² — proximity stops reversing |
| R2 | `.glass-label` : field value | 1.000 desktop / 0.667 mobile | **0.887** | φ^(−1/4), viewport-invariant |
| R3 | `sizing.css:85` + `Label.vue:67` | `--control-text = --type-small × --ui-scale`; label reads `--type-small` **raw** → 21 vs 14 on mobile | mint **`--control-label: calc(var(--control-text) × 0.886653)`** | one comfort axis, one rung apart, every viewport |
| R4 | `--radius-card` | `1rem` fixed; control h rides `--ui-scale` → inner:outer 1.25 desktop, **2.06 mobile** | `calc(0.5 × --control-h-md + 20)` = **40 / 50** | `R_outer − R_inner = pad` — concentric |
| R5 | `.toggle-group__item` line-height | 16.4 / 16.4 = **1.00** | `--type-leading-small` **1.4** → 22.96 | in the token set; box height unchanged |
| R6 | `.number-field__step` line-height | 16.4 / 18.04 = 1.10 | `--type-leading-micro` **1.2** → 19.68 | in the token set; box height unchanged |
| R7 | slider track height | std {12,20,28}, spectrum {12,24,36} — two series, `md` = 20 **and** 24 | **{18, 20, 22}** = 0.5 × {36,40,44} | track : control = **0.500** at every size (shipped: 0.333 → 0.636) |
| R8 | `.glass-chip` shadow | `ink/.14 0 8 24` on h 34.97 — blur:h **0.686** | `ink/.03 0 1 3` | blur : own h **≤ 0.10** at every depth; α strictly decreasing with containment (plate 0.06 → atom 0.03) |
| R9 | `.glass-chip` padding / gap | `6px 14px`, gap 6 (both absent from every other control) | **8px 12px**, gap 8 | rungs 1 and 2 |
| R10 | vertical `.glass-chip` | pad `10px 8px` (block > inline, inverted vs every sibling), font **11px** (off the scale) | pad `8px 12px`, font **12.58** | rung 1/2; type rung −2 |
| R11 | `.glass-chip` height parity | text 34.97 vs icon-only 40 desktop; **31.59 vs 44 mobile (12.4px in one row)** | one height per pointer class: **40 / 44** | 0 mismatch, both viewports |
| R12 | `.segmented-tabs--underline::before` | 2px @ α **1.0** = 204.4 L, marking "which story", while the specimen boundary gets 9.0 L (**22.7 : 1**) | 2px @ **0.48** = 98 L | rank A; **6.4 : 1** against the rank-B rule — an order of magnitude, not two |
| R13 | `.glass-resting` border (surviving plate) | 1px @ 0.04 → L 237.05, **+13.4 above the page**: not a line at all | 1px @ **0.07** | border L = page L exactly; line : step = **0.99** |
| R14 | `.control-surface` / `.segmented-tab` transitions | 0.12s / 0.2s `ease` / 0.2s `cubic-bezier(0.4,0,0.2,1)` — three vocabularies | **`--spring-press` 0.12s** spatial, `--ease-standard` effects | one vocabulary (MOTION-CANON §4) |
| R15 | `svg.lucide.size-4` in chips | renders **12 × 16** (3:4) beside `h-4 w-4` siblings at 16×16 | **16 × 16** | one icon idiom |
| R16 | four `clamp()` slopes, `scale.css:100-119` | 0.21/0.25/0.27/0.28vw → ratio spread **2.6%**, *compressing* as the viewport grows | one clamp on `--type-body`, rungs `× 1.127838^n` | φ^(1/4) invariant by construction; spread → 0 |

---

## 5 · GLASS DEFECTS

| # | surface | computed | verdict |
|---|---|---|---|
| G1 | `.segmented-tabs` | `backdrop-filter: none` + ~50% cream veil + white inset specular @ **0.30** | **LIBRARY defect.** Lead-verified (`EXEC-STATE:67-69`). Veil down, blur on, specular ≤0.12. This is the mechanism of "trite, shiny, bright" |
| G2 | `.slider-track.glass-track-well` | `backdrop-filter: none`; `--glass-track-well-bg` resolves to the **empty string**; 3 instances fully opaque `rgb(237,230,222)` | **LIBRARY defect.** Lead-verified. The *fill* is correctly frosted `blur(7px) saturate(1.4)` while its *track* is not — the well has no well |
| G3 | `.glass-resting` on all 7 forms routes | `backdrop-filter: none`, opaque `color(srgb .992 .961 .925)`, while carrying live `--glass-blur-resting: blur(7px) saturate(1.4)` | **DEMO defect, not library.** `ladder.css:121-132` publishes the blur; `ShowcaseFrame.vue:40` sets `surface: "opaque"`; `surface-axis.css:93-102` then zeroes it. `material="content"` + `surface="opaque"` + `tier="resting"` are three contradictory declarations on one node. **Drop `surface` from the resting arm** |
| G4 | `input.field-control.glass-defined` | `backdrop-filter: none`, opaque `rgb(243,236,226)` — while the **same class** computes `blur(7px)` as `.number-field__input` | **LIBRARY defect.** Same part, two materials |
| G5 | `.switch__track` | `blur(1px) saturate(1.4)` on `/forms/checks`, `none` on `/forms/labeled-field`, same class + same `data-size`/`data-state` | **LIBRARY defect.** Route-dependent material |
| G6 | `.toggle-group__item` | `blur(7px)` under `[variant=outline]`, `none` under `[variant=default]` | **LIBRARY defect.** The frost changes owner with the variant |
| G7 | **white specular above 0.12α** | `white/0.30 0 1 0 inset` on `.field-control`, `textarea`, `.number-field__input`, `.checkbox`, `.control-surface`, `.toggle-group[default]`, `.switch__track` — **7 selectors** | **Cap at 0.12.** On a control that must read *recessed*, a 0.30 top light is the embossed-plastic read. F-INS-8's proposed 0.30→0.40 hover is **rejected** on this ground |
| G8 | engine-conditional arms | **none found in `forms`** | clean. (The `@supports` guards implicated in the Playwright-WebKit crash are innocent per `EXEC-STATE:60-66`) |
| G9 | `.glass-*::after` grain | α 0.025 light / 0.045 dark; **0 changed pixels across 5.18M × 7 routes** | below 8-bit quantization on cream. **Strike from forms surfaces; global strike OWED a dark π** |

---

## 6 · DE-SHADCN NOTES

| # | where | the tell |
|---|---|---|
| N1 | 25 single-control cards on `/forms/inputs` | the shadcn demo idiom — every specimen in its own bordered card. Ours is `/forms/number-field`: label, field, helper, no plate. **The category already contains the cure and contradicts itself 4 routes to 3** |
| N2 | equal 1px borders on the card and the field | shadcn weights grouping and action identically. §1.3 splits them: **0.48 on the control, 0.07 on the group** — weight where the meaning is |
| N3 | `data-variant="standard|spectrum"` on the slider | a variant map that gates *behaviour* (`Slider.vue:384/397/475`), so the colour picker gets a handle and the value slider does not. The visible-handle recipe is 60 lines away behind a `:not()` |
| N4 | `--bouncy-slider-radius` / `--bouncy-track-radius` (`segmented.css:47-48, 81`) | local aliases named for `bouncy`, a spring row **deleted** by MOTION-CANON §1 (0.60/0.60, +9.5%, above the entire measured corpus). A name pointing at nothing |
| N5 | `.segmented-tab` at `--type-subheading` with a comment calling it "the audacious editorial label voice" | 20.352px on a nav element, on a page with no `h2`. Prose defending a size the page cannot afford |
| N6 | `disabled = opacity: 0.5`, uniformly, one channel, no cursor or material change | the framework default. Ours: hold the structure, drop the ink, kill the chroma |
| N7 | UA `outline: rgb(0,95,204) auto 1px` reachable by Tab on the standard slider | Chrome's blue, in a warm-cream library, on a 0-width element |
| N8 | `resize: vertical` on `textarea` | Chrome paints its own grey diagonal grip — **the only grip in the category, and it is the browser's** |
| N9 | 14 radius role-names over 7 values; `--radius-card` = `--radius-dialog` = `--radius-field` = `--radius-ctx` = `--radius-2xl` = 16px | a token layer that renames rather than distinguishes. A name that never differs from another name is not a role |

---

## 7 · π/DELTA OBLIGATIONS

Every row is a **paired** capture (HEAD vs wave), same DOM node count ±0 or the capture is **VOID**. Harness floor established this session: a no-op injected rule returns **0 changed px**.

| # | claim | route | engine | viewport |
|---|---|---|---|---|
| P1 | K1/K2 plate strike — no ink loss, gap R1 lands | `/forms/inputs`, `/forms/chip` | Chromium · **safari-app OWED** | 1440×900 DPR2 + 393×852 |
| P2 | G3 chassis fix — `.glass-resting` resolves `blur(7px) saturate(1.4)`; frost quadruple (−2% L, σ 80% kept, HF 10% kept, sat +62%) | `/forms/labeled-field` | Chromium · **OWED** | 1440×900, light **and dark** |
| P3 | K3 specular strike | `/forms/inputs`, `/chip`, `/labeled-field`, `/checks` | Chromium · **OWED** | 1440×900 |
| P4 | K4 grain strike — must be **0 changed px in DARK**, as it is in light | all 7 | Chromium · **OWED** | 1440×900 **dark** ← the one blocking cell |
| P5 | G1/G2 frost — `.segmented-tabs` + `.glass-track-well` resolve non-`none` | `/forms/inputs`, `/forms/slider` | Chromium · **OWED** | 1440×900 + 393×852 |
| P6 | A3/A4/K20 handle + inset — handle w>0, op 1; fill inset 0.14×h; focus ring off the 1288px track | `/forms/slider`, `/labeled-field` | Chromium · **OWED** | 1440×900 + 393×852, rest/hover/press/focus-visible |
| P7 | A8/A10 contrast — unchecked border and focus ring both ≥3:1, rasterised | `/forms/checks`, `/forms/inputs` | Chromium · **OWED** | 1440×900, light + dark |
| P8 | A2/C4 — tap a checkbox on a coarse pointer; checked bg must be `…/0.976`, never `…/0.5525` | `/forms/checks` | Chromium coarse · **OWED** | 393×852 `(hover:none)` |
| P9 | A6/A7 recess — field ≥4% below host; read-only ≥4% below field | `/forms/inputs` | Chromium · **OWED** | 1440×900 + 393×852 |
| P10 | R2/R3 — `label : value = 0.887` at **both** viewports | `/forms/inputs` | Chromium · **OWED** | 1440×900 **and** 393×852 |
| P11 | R4/R7/R11 — inner:outer corner ≤1.0; track:control = 0.5 at 3 sizes; chip row mismatch = 0 | `/forms/labeled-field`, `/slider`, `/chip` | Chromium · **OWED** | both |
| P12 | R12/K16 — indicator 98 L not 204 L; tab at rung −2 | `/forms/inputs` | Chromium · **OWED** | 1440×900 |
| P13 | K5/K6/A12 — chip blur:h ≤0.10; rest scale 1.000; remove 24px + destructive hover | `/forms/chip` | Chromium · **OWED** | 1440×900 + 393×852 |
| P14 | A11/A19 — disabled holds its boundary; at-limit ≠ disabled | `/forms/inputs`, `/number-field` | Chromium · **OWED** | 1440×900 |
| P15 | K19/A9 — one invalid grammar, glyph present on every destructive message | `/forms/inputs`, `/compositions/form-validation` | Chromium · **OWED** | 1440×900 |

**Unmeasurable, recorded owed:** (i) every `safari-app` cell — `safaridriver` refuses this seat, contradicting `EXEC-STATE:16-20`; re-probe (`pkill -f safaridriver` first) before the fold. (ii) **dark mode, entirely** — all photometry above is light-arm; P4 is *blocking* for K4. (iii) `aria-invalid` rendering for `.checkbox`, `.radio-group`, `.toggle-group`, `.glass-chip` — no invalid specimen is mounted on any of the seven routes, so K19 cannot be closed without one.

---

## 8 · CLAIMS KILLED — do not re-raise

| claim | bench | why killed |
|---|---|---|
| "the plate is 20.8 L on the wrong side of the frost law" as a **library** defect | D12-11 | `ladder.css:121-132` publishes `blur(7px) saturate(1.4)`; `ShowcaseFrame.vue:40` overrides it. Demo chassis, one line |
| "raise the card border to 0.077 so it outranks the field's" | D12-09 | the card is **struck**; and control edges outrank grouping edges by species, not depth. Making the group louder than the control puts weight where the meaning is not |
| "unchecked border ink ≈0.30 at 1px, or 1.5px at 0.22" | F-INS-4 | computes **1.91:1** against the same bench's own 3:1 citation. Corrected to **0.48**. Thickness earns no relief under 1.4.11 |
| "hover: white top inset 0.30 → 0.40" | F-INS-8 | pushes a specular already 2.5× over the 0.12 cap. Hover goes on the well + one blur rung |
| "strike all 25 value marks" | S9 | correct for continuous, wrong as a general rule — the marks are the stepped grammar IOS27 §1 measures. Split by `step` |
| "delete the grain block library-wide" | S1 | light-arm evidence only; the dark arm ships at 1.8× (`dark-arm.css:240`). Scoped to forms; global strike gated on P4 |
| "`rounded-card` beside `.glass-resting` is duplicative" | S-killed | verified FALSE — a synthetic `.glass-resting` computes `border-radius: 0px` |
| "the in-page switcher duplicates the dock" | S-killed | verified FALSE — dock carries 7 routes, the switcher 3 sub-stories. Removable as **weight** (R12/K16), not as function |
| "`.slider-thumb` is a superfluous element" | S-killed | it carries `role="slider"`, `tabindex="0"`, `aria-valuenow`. Misdesigned, not superfluous |


# ═══════════ CATEGORY RULING (26211 chars) ═══════════

# FOUNDATIONS — TERMINAL RULING

**modelId: `claude-opus-5[1m]`** · adjudicated over three benches + the lead geometry pass. Chromium 1440×900 / 393×852, light + dark, live `localhost:4188`. **Safari (`safari-app`): OWED** — `safaridriver` refuses this session; no WebKit cell inferred. Source claims re-verified on disk before ruling (`src/styles/tokens/shadow.css:5`, `src/styles/theme/radius.css:61-71`, `src/styles/typography/scale.css:120-122`, `demo/chassis/showcase/ShowcaseFrame.vue:37-41`, `demo/chassis/landing/SectionPreviewCard.vue:85-92`, `demo/stories/foundations/colors.vue:52-55`, `demo/stories/foundations/radii.vue:12-30`).

---

## 1 · THE SERIES

**SPACE — padding and gap share one generator: 4 × Fibonacci = `4 · 8 · 12 · 20 · 32 · 52`.** Steps 2.00 / 1.50 / 1.667 / 1.60 / 1.625 → limit φ. Today's head {12, 16, 20, 24, 32} is Tailwind's additive grid sampled at 1.333/1.25/1.20/1.333 — a sample, not a series.

| rung | role |
|---|---|
| **4** | concentric residue · `--radius-floor` · hairline well |
| **8** | intra-object (glyph↔label, dot↔caption) |
| **12** | field inset · related-group gap |
| **20** | plate inset (the dominant, and already correct — on a 24px plate) |
| **32** | section separation. **A 32px gap is a boundary; it takes no rule.** |

Migration cost, measured: 90 of 191 padding occurrences (16 ×50, 24 ×40) move ±4px; gaps 6 ×12, 16 ×9, 24 ×6, 40 ×6 move to rung.

**RADIUS — `4 · 6 · 10 · 16 · 24 · pill`.** Steps 1.50 / 1.67 / 1.60 / 1.50, geometric mean **1.565 = φ − 3.3%**. Roles: 4 floor · 6 small-control square · 10 button · 16 card/field · 24 plate/dock-card · pill = stadium (control/badge/dock/tab). **STRIKE `--radius-sm`** (byte-duplicate of `--radius-xs`, `radius.css:63-64`) and **`--radius-xl`** (12px, the one 1.20 step); `--radius-panel` → `--radius-2xl`, `--radius-strip` → `--radius` (10). Do **not** retune 24→26: 1.8% of φ purity is not worth touching `--radius-dock-card`.

**PLATE LAW — `pad ≤ r_outer − 4`.** The library already ships the relay (`radius.css:131-137`); **0 uses in `demo/`**. Two rungs only: plate = `rounded-3xl`(24) + `p-5`(20) → residue 4; field = `rounded-card`(16) + `p-3`(12) → residue 4. Today's 50 plates at 20-on-16 are the one combination that can be neither (20 − 16 = **+4**, residue negative).

**DIVIDER — two weights, one hue base (`--border`, warm tan `rgb(198,180,159)`).**

| weight | α | role | when |
|---|---|---|---|
| 1px | **1.00** | the object's own edge | specimen, field, checker |
| 1px | **0.50** | grouping rule | gap ≤ 20px |
| — | — | **no rule** | gap ≥ 32px |
| 1px | 0.04 ink | glass rim — a **material**, never composed with a border on the same element |

Ratio law: **weight × α : adjacent gap ≤ 1 : 20.** Today the segmented indicator is 2 × 1.00 against a 4px gap (**1 : 2**, 10× over) and the section rule is 1 × 0.50 against 64px (**1 : 128**, 6.4× under → invisible → strike). **STRIKE `border-border/60`** (24 sites) — a third weight. The 25× α spread is ~5× in *effective* contrast (tan at 1.0 vs ink at 0.04); the defect is two edge languages, not the numbers.

**TYPE — one generator, applied term-by-term to all three clamp terms.** Ascending = `--type-body × φ^(n/2)`; descending = `× φ^(−1/4)` per step (1.1279); `--type-micro` 11px and `--type-admin-label` 10px are declared literals **outside** the series.

```
--type-subheading: clamp(1.272rem, 1.170rem + 0.343vw, 1.749rem)   /* √φ  */
--type-heading:    clamp(1.618rem, 1.489rem + 0.437vw, 2.225rem)   /* φ   */
--type-title:      clamp(2.058rem, 1.894rem + 0.556vw, 2.830rem)   /* φ^1.5 */
--type-display-1:  clamp(2.618rem, 2.409rem + 0.707vw, 3.599rem)   /* φ²  */
```

Floors for subheading/heading/title are byte-identical to today (no mobile reflow). `display-1`'s floor moves 1.618rem → 2.618rem — **intended**: today it equals `--type-heading` exactly at 393.

**LEADING — lh/fs monotone non-increasing in fs. Four bands, one carve.** 1.05 (fs ≥ 40) · 1.20 (24–40) · 1.50 (15–24) · 1.60 (< 15) · carve: `prose` 1.618 (long-form measure, declared as a carve). Today: **eight** ratios, inverting below `prose` — smallest type gets the tightest leading.

---

## 2 · STRIKE TABLE

| # | element · route | why · the number | carries the meaning after |
|---|---|---|---|
| K1 | `.section-preview-card-identity` · /foundations, /intro | 12/12 strings **byte-identical** to the `text-subheading` 12px below; at 22.88px it **outranks** the real title 1.124:1; the only non-fluid type in the demo (22.88 at 1440 **and** 393) | the `text-subheading` + blurb |
| K2 | `inset 0 1px 0 white 45%` · `SectionPreviewCard.vue:90` | white specular on a plate computing `backdrop-filter: none`; removal Δ **87/channel dark vs 10/channel light = 8.3×**; hardcoded literal on a non-literal plate | `inset 0 0 0 1px var(--glass-border-quiet)`, already present |
| K3 | `max-block-size: 11rem` · `:86` | overrides the `aspect-ratio: 1.618` declared one line above at any width > 284.8px; measured **302×176 = 1.716**, lead **670×176 = 3.807** | `aspect-ratio` alone |
| K4 | `.segmented-tabs--underline` + `::before` · /paper-glass | **one** tab; the `::before` is 2px × 148.297px at **α 1.00** `rgb(28,25,23)` — the highest-contrast line in the content area — reporting a selection among n=1. Removal Δ 4,653px @ 168/channel | nothing; fold `paper-texture.vue` inline |
| K5 | `shadow-cartoon` on 14 radii specimens · /radii | Δ **25,212px**, 31% more than the border it competes with; on the 4px rungs the offset corner is 3px from the real one = **75% of the radius** | the 1px `--border` edge |
| K6 | "Semantic aliases" row (7 × 80×80) · /radii | **4** distinct values, all four painted 30px above; `rounded-input` → **0px** (`--radius-input` renamed to `--radius-media`, `radius.css:82`) | a 7-row alias→rung table |
| K7 | `border-border/60` on 11 specimens · /shadows | on the page whose subject is shadows the hairline is **10.2×** the shadow per pixel (105.8 vs 10.4 mean Δ on `shadow-xs`) | the shadow, once K8 lands |
| K8 | Tailwind's stock `.shadow-{xs…2xl}` paint · /shadows | `tokens/shadow.css:5` opens a plain `:root`, not `@theme` → **two `--shadow-sm` values in one build**; 8 of 11 specimens are neutral black +y, 3 are warm −x/+y. Two light sources, one `<h2>` | move the elevation rungs into `@theme`; all 11 become ours |
| K9 | `shadow-cartoon-hover` static specimen · /shadows | **1px on a 140px plate = 0.71%** from its neighbour, and it lies about which state it is | the live hover card 700px below |
| K10 | `div.h-[3px]` viz accent · /colors | the **4th** assertion of one hue (rule + glyph + name + the words "red basis"); removal Δ 13,610px @ **129/channel**, the strongest per-pixel delta in the category; `border-radius: 0` inside a 16px `overflow:hidden` plate | the `display-2` glyph — same hue, 3× larger. Strike the `sub` wording too |
| K11 | `filter` + `box-shadow` legs of `.watercolor-swatch`'s transition | no state rule matches. **PARTIAL** — the `transform` and `border-radius` legs are live under `animate` | the two live legs |
| K12 | 12 of 13 `<Chip shape="icon">` "Pops" · /icons | all 13 compute **one** bg `oklab(0.955842 …/0.832)` and **one** glyph `rgb(91,70,51)`; `tone` does not accept the `var()` it is passed; padding `8px 20px` on a textless 48×48 | one chip + the prose — **unless `tone` is repaired**, then keep 13 |
| K13 | `text-math` / `text-math-body` | byte-identical to `text-body` / `text-prose` (18.608/27.912 · 20.672/33.447, same weight, family, tracking) | `text-body` / `text-prose` |
| K14 | `--type-proportional-{headline,kicker}-size` | headline **is** `var(--type-display-2)` by definition (`scale.css:126`); once §1 lands the √φ pair is the ladder's own step | `text-display-2` / `-display-1` + `--type-proportional-leading: 1` |
| K15 | 3 of 4 `.scale-on-hover` circles, frame 1 · /css-utilities | identical geometry, surface and `--scale-hover`; hiding copies 2–4 Δ **12,290px @ 192.7** | the override grid below (1.04/1.08/1.15/1.25, labelled) |
| K16 | duplicate "Section facets" + ‹ › + « » · all routes @1440 | facets renders **twice** (same aria-label, both 40×40, both visible); ‹ › reach nothing the 12 on-screen labelled tabs do not; « » nothing the rail's 11 buttons do not. **18 controls in a 393px band** | the tab strip + the rail / "Open category navigation" |
| K17 | `.section-label` breadcrumb arm · /colors, /icons | 2 of 12 routes; both facts already on screen (rail icon + h1 at **2.9×**); drifts ("Color" vs "Colors") | the h1 + the dock tab |
| K18 | `.paper-grain-overlay` on the 10 ladder specimens · /paper-glass | a second material over the material under test; `::after` covers **97.25%** at Δ 31.2 (10/channel, multiply), **identical on all 5 rungs** → zero differential, flattens the 0.328→0.952 spread the page exists to show | one dedicated grain specimen |
| K19 | `section.border-t.border-border/50` · all story routes | three separators for one boundary: 32px pad + 40px gap + a 1px α0.50 rule. Rule-to-rule **1 : 104** | the 32px gap (§1) |
| K20 | 5 cards in `lg:grid-cols-4` · /paper-glass | **828 × 192px** of empty cells = 19% of the 1080×408 block | `grid-cols-5` |
| K21 | 3 alias swatches · /surface-tints | all compute `rgba(0,0,0,0)`; `--surface-tint-{quiet,floating,modal}` undefined; the `→ tint-6/12/18` arrows are the only carrier | the alias table |
| K22 | one of the two full-bleed pseudo-layers per `.section-preview-card` · /foundations | 13 × 2 = **26** viewport-composited layers on a route whose content is 12 links. **CONDITIONAL**: keep the `::before` (the pointer-field carrier, MOTION-CANON §4 rest floor); strike the `::after` unless it carries a measured channel | the `::before` |

### REJECTED from the strike bench — on evidence

| claim | ruling |
|---|---|
| `.watercolor-swatch` per-instance "random" `margin-top` | **AUTHORED, and an owner ask.** `colors.vue:52-55`: `STAGGER_REM = [0,1.6,0.5,…]`, *"the irregular hand-laid zigzag the user named"*, static, capture-deterministic. The zigzag **stays**. |
| swatch width 115.3–127.2 in a 120px column | the seeded blob silhouette + turbulence displacement — the library's voice. Stays. |
| `filter: url()` is FORBIDDEN | MOTION-CANON §8 forbids it for **new** primitives and names it a Safari suspect. `WatercolorDot` is shipped, filters are static-cached (`:66-72`), and real Safari 26.4 renders every route (EXEC-STATE). **Stays; Safari cell OWED.** |
| "4 variables per comparison row" on /colors | the ramp is paint, not a comparison row. Only the **caption baselines** are a defect → A10. |
| `.scrim-stage` radial `oklch(0.552 0.192 359.8)` | load-bearing, MOTION-CANON §3 requires proving chroma survives the scrim. Keeps. |
| the glass `::before` catch-light at rest (Δ 2/channel) | misdesigned-**low**, not superfluous → routes to A7. |

---

## 3 · ADD TABLE

| # | element/state · route | missing · the number | channel · magnitude · curve |
|---|---|---|---|
| A1 | resolved-value cell · `TokenLadder.vue:56`, `radii.vue:13-20`, showcase captions | the value column is hand-typed prose, so a dead token is pixel-identical to a live one. **8 tokens documented and undefined**: `--motion-slide-{sm,md,lg}`, `--popover-offset`, `--surface-tint-{quiet,floating,modal}`, `--radius-input`. `/typography` prints 3 px figures; **2 are wrong by 42px** (352/287 vs measured 310.4/244.8) and cannot be right at two viewports | text · `--type-mono-caption` 14.38px `--muted-foreground`, same slot · no curve. Empty resolution renders the literal `undefined` in `--destructive` |
| A2 | `TokenLadder` sample binding · /overlays-scrims | 7 samples **byte-identical** (12×12, `rgb(28,25,23)`, `translate: none`) while `--lift-{sm,md,lg}` resolve **−1/−2/−4px**. Cause: `cls: ""` on every row (`overlays-scrims.vue:34-41` vs `TokenLadder.vue:50`) | `translate` · the token's own value **1:1**, against a hairline baseline on the cell's `::after` · static at rest; on row hover/`:focus-visible` 0→value on `--spring-dock` 0.21s |
| A3 | trigger on the 3 `.scrim-cell`s · /overlays-scrims | the page's own blurb says *"Open Dialog or Confirm dialog"*; `<main>` has **0** focusables | `role="button"` + `tabindex="0"` · hover/focus ramps the existing `.scrim-overlay` 0 → the row's own α (0.4/0.5/0.8); activate opens the real Dialog · `--ease-standard` 0.2s, **rank +2** |
| A4 | per-row easing specimen · /motion | 6 easing tokens named, **0 run, 0 drawn**; the 2 shipped specimens are indistinguishable (both `opacity 0.2s`, gone by +80ms); grid `413.33 × 3` holds 2 children (**122,000px²** empty) | `translate` on a `::after` dot across the `<td>`'s own width · full column, **700ms** so the curve is legible · the row's own token. Reduced-motion arm = static sparkline from the `linear()` stops. Swap token cell `micro` 11px → `small`, label → `caption` (today the subject is **0.67×** its caption) |
| A5 | hover guard + keyboard path + reference frame · /css-utilities, `src/styles/utilities/btn.css:24` | G7 violated (`:hover` unguarded); at 393 all 8 read `scale: 1` and a tap sets 1.08 **sticky**; 1.04 vs 1.08 on 48px = **1.9px** with no reference; `--spring-smooth-duration` `calc(.35s*1)`, t90 250–300ms — **outside the 150ms G1 window** | (a) wrap `:hover` in `@media (hover:hover)` + `:active` coarse arm; (b) `tabindex="0"` + `:focus-visible { scale: var(--scale-hover) }`; (c) `::before { inset:0; border:1px dashed var(--border); scale:1 }` · 1px hairline · **no curve** — it must not move. Clock → `--spring-press` 0.12s |
| A6 | `:focus-visible` · `button.glass-card` /shadows | **zero computed delta** (`box-shadow −3px 3px` and `radius 16px` unchanged, `outline: 3px none`) while hover works. `.focus-ring:focus-visible` is `@layer components`; `.rounded-card` + `.shadow-cartoon` are `@layer utilities` and win. **focus : hover = 0 : 1** | move the focus arm into `@layer utilities` · `--focus-ring-shadow` + the same −3→−4px step · `--ease-standard` 0.12s, rank 0. **Focus weight ≥ hover weight** |
| A7 | `.section-preview-card:hover` geometry · /foundations, /intro | a **712×341** target answers with material only: bg α 0.664→0.84, `::before` 0.07→0.10, and a border α **0.04→0.05** leg — one hundredth of alpha on a 1px hairline | add `translate: -1px -1px` + `shadow-cartoon` −3→−4px · 1px/1px · `--spring-press` 0.12s. **Strike the border-α leg** → 2 channels, G3 satisfied |
| A8 | `box-shadow` in the transition list · `button.glass-card` /shadows | list is `transform, translate, scale, rotate` @0.2s — the shadow step is **instantaneous** while the 1px travel takes 200ms | add `box-shadow`, same clock |
| A9 | state on the ramp stop · /colors | 13 marks, `pointer-events: none`, `aria-hidden`, no state. **Adjudicated**: the dot stays paint; the **column** becomes the control | `tabindex="0"` on the stop wrapper · `scale 1.04` + one shadow rung · `--spring-press` 0.12s |
| A10 | caption baseline · /colors | 9 captions on **9 baselines** (tops 288.6–315.5, **26.9px** spread) because the numeric readout sits inside the staggered column | move `<span>{{i}}</span>` out of the staggered div onto one baseline row · no new channel. The zigzag keeps the paint |
| A11 | `<h2>` level · /surface-tints, /motion, /overlays-scrims, /chart-palette, /css-utilities | **0 h2**; structure carried by `<p class="section-label">` at 14.384px = **0.77 × body**. `StorySection.vue:9-18` ships the `level` axis and its own docblock calls it *"the fix for the total flatness"* — **shipped, never called**. All 17 existing h2 compute 20.352 = **1.094 × body** | call `level="heading"` · h1 : h2 : body = **φ : √φ : 1** (30.11 : 23.67 : 18.608 @1440; 25.888 : 20.352 : 16.0 @393) |
| A12 | label column · /surface-tints, /overlays-scrims | `--surface-tint-4` at 16.4px Fira ≈ **157px** in a **128.9px** column → 12/12 shear mid-token; `--overlay-scrim-subtle` shears in 201.3px while its sibling ladder gives a 17-char token **396.7px** | column ≥ **1.25 × 161px longest-token width**, or drop the cell to `--type-mono-caption` 14.38px · no curve |
| A13 | boundary between the two shadow families · /shadows | 6 neutral +y and 5 warm −x/+y under one `<h2>`, 32px gap, no mark. **CONDITIONAL — void once K8 lands** (one light direction, one family) | — |
| A14 | a disabled specimen · category | **0 disabled controls on 13 routes**; the state is undemonstrated, so "disabled indistinguishable from enabled" is untestable here | one disabled control on /motion or /css-utilities |

---

## 4 · RE-PROPORTION TABLE

| # | selector · file | current | target | ratio satisfied |
|---|---|---|---|---|
| R1 | `.section-preview-card-preview` · `SectionPreviewCard.vue:87` | `calc(var(--radius-card) − 0.75rem)` = **4px** on a plate inset `p-4 lg:p-5` (16/20) — matches neither | `max(var(--radius-floor), calc(var(--radius-ctx) − var(--radius-inset)))` | concentric (the shipped relay, **0 demo uses**) |
| R2 | the 50 plates at `rounded-card` + `p-5` | 20 on 16 → residue **+4** | `rounded-3xl`(24) + `p-5`(20) → residue **4** | pad : rad **0.833**, inner well = `--radius-floor` |
| R3 | field/control inside a plate | 16/16, 16/24 mixed | `rounded-card`(16) + `p-3`(12) | pad : rad **0.75** |
| R4 | `.glass-quiet.p-4` /colors ×12 · `.p-6` /typography · `.p-5 md:p-7` /paper-glass | 16 · 24 · 28 | **12 · 20 · 20** | on-series |
| R5 | `ShowcaseFrame` `PAD_CLASS` · `:23-30` | 0/12/16/20/24/**40** (steps 1.333/1.25/1.20/**1.667**; `xl` = 2.5× the plate radius) | **0/4/8/12/20/32** | 4·Fib, steps 2/1.5/1.667/1.6 |
| R6 | `.showcase-frame-caption` · `:79` | `padding-inline: 1.25rem` hardcoded → 40 vs 20 at `pad="xl"` | tracks `padClass` | caption pad : body pad **1 : 1** (today 1:2) |
| R7 | `.shadow-stage` | `px-4 py-8 gap-8` = 16/32/32 | `p-5 gap-5` = 20/20 | outer pad : inner gap **1 : 1** (today 1:2 on x) |
| R8 | `--type-{subheading,heading,title}` · `scale.css:120-122` | fixed 1.272/1.618/2.058rem against a fluid body | term-wise clamps (§1) | √φ at **every** viewport — kills the **858.0px** `title > display` inversion (measured 32.928 > 31.488 @768) and the 393 nine-rungs-into-five collision |
| R9 | `--type-display-1` | floor `1.618rem` = `--type-heading` **exactly** | floor `2.618rem` | φ² over body. Intended mobile reflow |
| R10 | `--type-{small,caption}` | 1.135 / 1.140 steps | body × φ^(−1/4) = 1.1279 | one descending ratio; ≤1% from today, a re-derivation not a reflow |
| R11 | lh/fs | **8** values, inverts below `prose` | 4 bands + 1 carve (§1) | monotone non-increasing in fs |
| R12 | `border-border/60` ×24 | a 3rd divider weight | α 1.00 or α 0.50 | two weights |
| R13 | `span.h-3.w-3` status dot | `border 2px` on Ø12 = **17% of diameter**; 3-layer shadow reaches 4px = **33%** | 1px border, 1 shadow layer at −1px | edge : diameter ≤ **1 : 12** |
| R14 | /motion sample chip | `border 2px` α1.00 inside 1px α0.60 inside 1px α1.00 — **weight increases inward**; 3 shadow copies at 1px pitch on the one object whose job is to move | 1px, α descending inward 1.00 → 0.60 → 0.40; one shadow layer | depth read restored |
| R15 | mobile transposition, all metrics | column ÷3.568, hero pad ÷2.25, scroller pad ÷2.00, gap ÷1.667, h1 ÷1.618, body ÷1.163, **every inner pad/gap/specimen ÷1.000** — seven factors | **≤768px: one rung down the space series** (32→20, 20→12, 12→8, 8→4; 80px specimen → 52) | **0.625**, within one rung of the h1's measured 1.618. Type is legibility-bound and keeps its own clamp — two declared laws, not seven factors |
| R16 | `.story-cels` gap | 40 / 24 | **32 / 20** | on-series both ends |
| R17 | /motion doctrine grid | `413.33px × 3` with 2 children | `grid-cols-2` | 0 empty cells (today 122,000px²) |
| R18 | h1 register | 41.888 (9 routes) / 86.112 / **155.429** — **3.71×** for one role; article 1288 vs 1152 | index = `display-1`, specimen = `title`; one column at 1288 | h1 : h2 = **2.058** everywhere (today 7.64 on /paper-glass) |
| R19 | /radii row idioms | "Scale" `flex-wrap gap-4` pitch 96 fill **0.833** vs "Semantic" `grid-cols-7 gap-4` pitch 170.3 fill **0.470** — **1.77×** density on one page | closed by K6 | one row idiom |

---

## 5 · GLASS DEFECTS

| defect | measurement | ruling |
|---|---|---|
| `backdrop-filter: none` on glass-classed surfaces | **15 of 106** in `<main>` across 13 routes (14.2%), plus `.segmented-tabs`, `.glass-track-well` (lead) | split by ROLE, per MOTION-CANON §3 |
| root cause | `ShowcaseFrame.vue:37-41` — default `tier: "resting"` passes `surface: "opaque"`. **118 mounts across 32 files** | **§3(a) says content is never frosted — the material is correct, the CLASS is the lie.** The specimen plate keeps `data-surface="opaque"` and **loses every `glass-*` class**. |
| chrome that must frost | `.segmented-tabs`, `.glass-track-well`, `.segmented-tabs--underline` (`bf: none`, `bg: rgba(0,0,0,0)`), `.glass-wash.glass-capsule` /intro (**α 0.84**, no blur, two white rims on the *thinnest* rung) | **§3(b) violation.** 11px band + W-FROST saturate. Blur-led, not specular-led. |
| white specular > 0.12 α | `.section-preview-card-preview` **0.45** (dark Δ **87/channel** vs light 10 — 8.3× the same declaration); **all five** ladder rungs at `oklab(0.999994 …/0.301961) 0 1px 0 inset` + a second `rgba(255,255,255,0.25) 0 0.5px 0 inset`; dark arm **rises 0.30 → 0.40** | rim α **≤ 0.12** in light, and **dark ≤ light**. The 0.30 the lead flagged on `.segmented-tabs` is systemic to the ladder, not local. §9.10 FROST FIRST |
| rung collapse | 5 named rungs → **3** blur values (1/7/11) and **2** saturate (1.4/1.6); `.glass-floating` ≡ `.glass-overlay` byte-identically; `.glass-quiet` is the only rung carrying `brightness(1.02)` | 5 names must resolve 5 materials or the ladder loses rungs |
| engine-conditional arms | `@media (prefers-reduced-transparency: reduce)` on the preview card — legal, not engine-conditional. `filter: url()` ×13 (WatercolorDot) — legal at HEAD, static-cached, **no new consumer**, Safari cell OWED | no masking fallbacks found in category |

---

## 6 · DE-SHADCN NOTES

1. **The elevation ladder that ships in our own demo is Tailwind's.** `tokens/shadow.css:5` opens a plain `:root`, not `@theme` (contrast `theme/radius.css:61` `@theme static`); `theme/bridges.css` bridges only `--shadow-glass-*` and `--shadow-focus-ring`. So `.shadow-{xs,sm,md,lg,xl,2xl}` paint Tailwind's stock ramp verbatim while `var(--shadow-sm)` resolves the warm `color-mix(--shadow-color 6%)` for **25 `src` readers**. Two `--shadow-sm` values, one build. **This is the sharpest de-shadcn evidence in the category.** Fix = move the elevation rungs into `@theme`.
2. `--shadow-soft: 0 4px 12px rgba(0,0,0,0.1)` and `--shadow-elevated: 0 8px 24px rgba(0,0,0,0.12)` are raw neutral black **inside the library**, contradicting `shadow.css:9-12`'s own comment (*"no neutral … gray smudge"*). Re-author on `--cartoon-ink` / `--shadow-color`.
3. `/colors` role table is the shadcn token sheet: background · foreground · muted · card · popover · primary · secondary · accent · destructive, plus `bridges.css:94`'s surviving `--color-ring` bridge. Ours is warm cream + the 13-stop section ramp + the viz basis. The shadcn names belong in an appendix or nowhere.
4. The demo shows the **Tailwind** radius row first (`rounded-xs…2xl`, 7 specimens at pitch 96) and the house semantic aliases second, at **0.470 fill**. Our language is the aliases; the Tailwind row is the port.
5. **Two pill idioms coexist:** `9999px` (`--radius-pill`, ours, ×4) and `calc(infinity*1px)` = 16777200px (`rounded-full`, Tailwind's, ×3). One goes.
6. `.section-preview-card:hover` answers with alpha only — the shadcn card idiom. Ours is the cartoon offset step + 1px travel, which this library ships and this card does not call (→ A7).
7. `rounded-xs` ≡ `rounded-sm` ≡ 4px: two Tailwind names, one value, and the story captions them "2px" and "4px" against `radius.css:63`. The hint strings are hand-typed literals (→ A1).

---

## 7 · π/DELTA OBLIGATIONS

Paired before/after, route · engine · viewport · scheme. **Every `safari-app` cell below is OWED** — remote automation off this session; `webkit-engine` is a separate cell and neither infers the other.

| claim | route | engine | viewport | scheme |
|---|---|---|---|---|
| K1 tile strike + A7 hover geometry | /foundations, /intro | chromium · safari-app **OWED** | 1440, 393 | light + dark |
| K2 specular 0.45 → ≤0.12 | /foundations, /intro | chromium · **OWED** | 1440 | **dark is the load-bearing arm** (Δ 87/channel) |
| K3 aspect-ratio restore | /foundations | chromium · **OWED** | 1440, 393 | light |
| K4 switcher strike | /paper-glass | chromium · **OWED** | 1440 **and** 393 (a different component at each) | light |
| K5/K6 radii | /radii | chromium · **OWED** | 1440, 393 | light. The 4px-rung corner claim needs a 2× crop |
| K7/K8/K9 + A13 shadow family | /shadows | chromium · **OWED** | 1440 | light + dark (the warm ink re-derives per scheme) |
| K10 accent rule | /colors | chromium · **OWED** | 1440 | light |
| K18 grain overlay | /paper-glass | chromium · **OWED** | 1440 | light + dark |
| §5 frost re-tier (118 mounts) | /overlays-scrims, /chart-palette, /css-utilities (the three `bf: none` witnesses) + /intro (the 0.84 capsule) | chromium · **OWED** | 1440, 393 | light + dark |
| §1 type series (R8/R9) | /typography | chromium · **OWED** | **393, 405, 768, 858, 1024, 1326, 1440** — 858.0 and 1325.7 are the crossover proofs | light |
| §1 space + plate series (R2–R7) | /radii, /shadows, /paper-glass, /typography | chromium · **OWED** | 1440, 393 | light |
| R15 one-rung mobile | all 13 | chromium · **OWED** | 393 | light |
| A6 focus-visible | /shadows | chromium (keyboard-driven, `Tab` not `.focus()`) · **OWED** | 1440 | light + dark |
| A4 easing specimens | /motion | chromium 60fps trace · **OWED** | 1440 | light |
| A5 coarse-pointer arm | /css-utilities | chromium `pointer: coarse` emulation · **OWED** | 393 | light |
| A1/A2 resolved-value cells | /overlays-scrims, /surface-tints, /radii, /typography | chromium · **OWED** | 1440 | light |

**Void rule carried:** a capture whose DOM node count is far from the working baseline is VOID, not passing (`/` baseline = 302 nodes, Chromium and Safari 26.4 alike).


# ═══════════ CATEGORY RULING (28999 chars) ═══════════

TERMINAL RULING — CATEGORY **containers** (D12 proportion + D2 visuals)

**SAFARI / WebKit: OWED.** `safaridriver` refuses remote automation this session; no `safari-app` cell exists in this ruling and none is inferred. Every number below is Chromium 1440×900 @1x/@2x light + iPhone-15-Pro 393×659, live at `http://localhost:4188`.

**Adjudicator's own measurements** (drivers + JSON + PNGs at `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/adjc/`: `edge-alpha.mjs`, `rule-alpha.mjs`, `edge-alpha.json`, `rule-alpha.json`). Two α-sweeps run to settle the two collisions the benches could not resolve between themselves. Both null cleanly (α=0 returns the un-bordered plate to 229.1 against an interior of 228.9; the accordion returns dip 0.00, matching I-9's independent `max|dI/dy| = 0.000`).

**Plate-edge sweep** — `.dropdown-menu__content`, 1px ink `oklab(0.2161 0.0053 0.0075/α)`, plate interior L 228.9, exterior shadow ramp L 207.5 → 201.0:

| α | border px L | dip vs interior | local minimum? |
|---|---|---|---|
| 1.00 | 25.6 | 203.3 | yes |
| 0.20 | 188.7 | 40.2 | yes |
| **0.16** | **195.7** | **33.2** | **yes, 5.3-unit margin** |
| 0.14 | 200.2 | 28.7 | yes, 0.8-unit margin (inside AA noise) |
| 0.12 | 204.3 | — | **no** |
| 0.05 (shipped) | 218.4 | — | **no** |

**The threshold is α 0.14 and it is structural, not perceptual:** below it the border pixel is *lighter* than the drop-shadow immediately outside it, so no local minimum can exist at any DPR. This kills the proportion bench's "α 0.05, uniform, every plate" outright and confirms I-8's pixel finding by mechanism.

**In-content-rule sweep** — `.disclosure-item` bottom, flat cream L 235.5: α 0.14→29.6 · 0.12→26.1 · 0.10→21.2 · **0.08→17.1** · 0.06→13.6 · 0.04→8.9 · 0→**0.00** (shipped).

---

## 1. THE SERIES

### padding-inline — role rungs, four values
| value | role | surfaces |
|---|---|---|
| **8px** | annotation / menu row | tooltip plate, `.command__item`, `.dropdown-menu__item` |
| **12px** | disclosure row, well | `.disclosure-trigger`, inner cards |
| **16px** | presented plate | popover, dropdown, context-menu, command, hover-popover |
| **24px** | room plate | dialog, sheet, drawer (header **and** list — today 16/24 inside one plate) |

**padding-block = padding-inline × 1.272 (√φ)**, universal, no exemption → **10.176 / 15.264 / 20.352 / 30.528**. Four values already shipped; applied **17 times instead of 5**. Where a 44px min-height governs (`.command__item`, `.dropdown-menu__item`: declared 6 + 24.6 line + 6 = 36.6 inside a 44px painted box) the block token is **deleted**, not left decorative.

**Coarse pointer: one rung down the same series** — 24→16, 16→12, 12→8, 8→8. Equivalent to `max(16px, 0.017 × viewport)` at both measured viewports. Dialog inner column 345→361px, body measure 33.7→**35.2ch**; `pad:viewport` 6.1%→4.1% against desktop's 1.7%. Today the inline pad is the *only* axis pinned at ×1.00 while type runs ×1.28 and controls ×1.50.

### gap — four values
**6px** (label→value inside a header) · **8px** (sibling controls, footer) · **12px** (rows in a list) · **16px** (regions inside a plate). Strike `6.11154px` (DrawerHeader, `16/2.618`) and `12.5785px` (DrawerFooter, `20.352/1.618`): φ governs the block-padding axis only, never the gap axis.

### radius — six rungs, two non-overlapping laws
| rung | role | consumers |
|---|---|---|
| **4px** `--radius-floor` | relay product only | nested **surfaces** where pad > ctx |
| **10px** `--radius-lg` | annotation, and the relay product of a 16px plate with 6px list pad | tooltip; `.command__item`, `.dropdown-menu__item` |
| **12px** `--radius-strip` | a box you **enter or traverse** | text fields at any width, tracks, wells, full-width disclosure rows, `--radius-panel` consumers |
| **16px** `--radius-card` | the **presented plate** | popover, dropdown, context-menu, command, dialog, card |
| **24px** `--radius-3xl` | the **room plate** | sheet, drawer, big-dock |
| **9999px** `--radius-pill` | an **object you press** | button, chip, badge, grip, dock member, close ✕ |

Ladder **10 · 16 · 24** = ×1.6, ×1.5 — a real geometric step, replacing today's 10 · 12 · 16 (×1.2, ×1.33), which is below the just-noticeable step for a corner (12 vs 16 on a 512px plate = 0.8% of silhouette).

**LAW A — the concentric relay governs nested SURFACES.** Every padded surface publishes `--radius-inset` = its own resolved inline pad, **unconditionally** (`radius.css:131-146` is already the right law; three publishers, two consumers, one of which contradicts its sibling). Nested surface corner = `max(4, ctx − inset)`.
**LAW B — role tokens govern CONTROLS.** A field, button or chip inside a plate takes its role rung, never the relay. `radius.css:20-21` currently contradicts itself: the canon publishes the relay as law *and* routes the dialog-nested input to `--radius-field` (16px) — the plate's own corner across a 24px inset, the exact inverse of concentricity. **`--radius-field` re-binds to `--radius-strip` (12px)**, which also retires the Input's stadium and with it the same-component-two-radii collapse (`input#w` r=9999 beside `input#slug` r=16 on one route).

### divider — one weight, two alphas, ratio 2 : 1
**1px, always** (277 of 277 borders in the category are already 1px; no second weight is needed and none is minted).

| channel | ink | measured dip | rule |
|---|---|---|---|
| **plate edge** | `oklab(0.2161 0.0053 0.0075 / 0.16)` | **33.2** | every plate, no exception; the outermost boundary is always the strongest line the object draws |
| **in-content rule** | same ink **/ 0.08** | **17.1** | exactly half the edge; the whitespace separates, the line registers the seam |

Struck alphas: **0.00, 0.04, 0.05, 0.50, 0.55, 0.60, 0.70, 1.00**, and the only 2px in the category. Today's spread is 20× and **inverted** — the plate edge is the faintest line drawn while the rules inside it are 10–20× more opaque.

---

## 2. STRIKE TABLE

| element | route | why superfluous (number) | what carries the meaning afterwards |
|---|---|---|---|
| `.glass-*::after` grain + `--glass-grain-opacity` (`glass/grain-overlay.css:27-31`) | all 14 | **79 layers; max Δ 0/255 over ~3.1M sampled px, light *and* dark**, on 5 plates | nothing — it currently carries nothing |
| plate `::before` specular ring | all | effective α **0.7 × 0.07 = 0.049**, coincident with the 0.050 border; joint removal 1.51% ≥4 < separate sum 1.68% — they overlap in paint | the 1px ink border (now 0.16) + the top catch-light |
| `--glass-material-rim` **side leg** `inset var(--glass-key-lit-x) 0 0 hsl(0 0% 100%/0.18)` (`glass/rim.css:93-94`) | all | a second white assertion on the same silhouette | the top catch-light, capped at 0.12 |
| white specular on any cell resolving `--glass-cell-backdrop-filter: none` (`glass/material.css:56-67`) | dialog 4, sheet 3, popover 4, hover-popover 4, configurator 4, dropdown 2 | **21 of 50** white-specular surfaces have no blur; stripping the two white legs alone: **max Δ 46/255, mean 3.98, 36.6% of px ≥4** | an ink tint (below), the under-shadow, the pill |
| inner `.command.glass-floating` plate inside `CommandDialog` | `/containers/command` | byte-identical material 1px inside its parent; composite veil **1 − (1−0.6928)(1−0.84) = 0.951** | one plate, one alpha, one blur |
| `[backdrop-filter:var(--glass-blur-wash)]` (`dialog/ModalOverlay.vue:83`, `drawer/DrawerOverlay.vue:53`) | dialog, sheet, drawer | blur(1px): **max Δ 106 entirely on glyph edges**; saturate(1.4): **99.95% of px move, none by >5/255**. Forbidden by MOTION-CANON §3(d) | the 50%/45.6% warm-ink dim, untouched |
| `showClose: true` default (`dialog/DialogContent.vue:63`) | dialog, sheet | 4 dismissals on one plate; the same page's own `:show-close="false"` section is captioned *"the named footer action is the only visible close affordance"* | the named footer action + Escape + scrim |
| `data-[state=open]:bg-accent data-[state=open]:text-accent-foreground` (`DialogContent.vue:496`) | dialog, sheet | the element has **no `data-state` attribute**; both utilities unreachable | — |
| `outline-width: 3px` with `outline-style: none` | all | **570 declared / 0 resolved** | the shipped `box-shadow` ring `0 0 0 2px ink/0.3, 0 0 8px ink/0.15` |
| `padding: 0.375rem 0.5rem` block leg (`command/styles.css:89-99`) | command, dropdown | 6 + 24.6 + 6 = 36.6 inside a **44px** painted box; any value ≤9.7px paints identically | the 44px floor |
| `.sheet-animate` selector (`glass/squircle.css:44`) | sheet | **zero component consumers**; retired at `DialogContent.vue:268` | re-key the squircle off `[data-placement]` — the canon row lives, the dead selector does not |
| `brightness(1.02)` on `.glass-quiet` | 8 bands | isolated: **max Δ 3/255, 0.00% of px ≥4** | blur + saturate |
| 8 bare `<Surface material="content" surface="veil">` bands (`popover.vue:61,178`; `dropdown-menu.vue:101,156`; `hover-popover.vue:22,99,124`; `sheet.vue:90`) | 4 routes | 1288×80-190, **r 0, border 0, shadow none**; whole-band suppression = **max Δ 7/255** | the section heading + the 40px section gap |
| `ShowcaseFrame` `tier` prop (`demo/chassis/showcase/ShowcaseFrame.vue:33-44`) | all | two frames differing on 5 channels, stacked on one page, encoding nothing; the **default** maps to `surface="opaque"`, `backdrop-filter: none` on **12 of 15** routes | one frame, one material |
| story class `rounded-[…] border-border/50 bg-card/70 shadow-lg backdrop-blur` (`command.vue:116`) | command | kills the saturate (`blur(8px)` vs `blur(11px) saturate(1.6)`), 10× the plate hairline, the only neutral-black shadow in the category; suppression max Δ **37**, 2.11% ≥4 | `.glass-floating`, which is what the story exists to show |
| `.configurator-preset-tile` 2px α 1.0 border + shadow | configurator | the heaviest object in the category is a demo tile — **40×** the structural boundary beside it | 1px @ 0.08 + the selected state |
| 1px border on full-bleed plates (`.expandable-container.glass-overlay` 1440×900 r0; `.glass-drawer` bottom 1440×900) | expandable, drawer | an edge drawn on the viewport edge | — |
| `CommandSeparator` between **labelled** groups | command | three carriers for one boundary (label register `14.384px/500/rgb(112,89,66)` + 16px gap + rule); suppression max Δ **74/255** against the plate border's **11** | the group label + the 16px gap |
| 5 of 13 command icons (`command.vue:51-53` triple `FileText` under a "Files" heading; `:72,76` double `Package`) + `"(unavailable)"` in the row label at `:75` | command | 26 of 26 rows carry an icon; 5 discriminate nothing; the disabled row already reports `opacity 0.5` + `not-allowed` + `pointer-events:none` + `aria-disabled` — the text is a **fourth** carrier | the glyphs that do discriminate; the three shipped disabled channels |
| routes `/containers/{sheet, hover-card, hover-popover, context-menu}` | — | **14 routes / 10 components**; no `src/components/sheet`, no `src/components/hover-card`; `hover-card` + `hover-popover` demonstrate **the same prop on the same component**, and `hover-card` has zero glass surfaces of its own | prop rows on the parent route; 4 fewer tiles in a dock that already overflows to arrows on desktop and overlaps the last card on mobile in every capture |
| the centered dialog's **second scroll mechanism** (plate = scroller) | dialog | `scrollHeight 757 / clientHeight 510`; at max scroll the `h2` and ✕ rects both sit at **y = −21** | the sheet's `[data-slot=dialog-content-region]`, in every placement |

---

## 3. ADD TABLE

| element / state | route | what is missing | channel · magnitude · curve |
|---|---|---|---|
| context-menu drop zone (1288×288 = **29% of viewport**) | context-menu | rest/hover/press all identical: **0 non-zero px of 48,000**; `cursor: default`; tap → `NOTHING-OPENED` | rest `cursor: context-menu`; hover fill α 0 → `--glass-bg-quiet` 0.443 + edge 0.08 → 0.16, `--spring-press` 0.12s; **long-press progress** — the existing fill sweeps from the touch point to 100% at the 500ms platform threshold, drained at `press-drain` 55/120ms on `pointercancel`. 2 channels, inside G3 |
| `.disclosure-item` seam | accordion | measured dip **0.00** over a 1248px run; 1px reserved, α 0 | 1px ink **α 0.08 → dip 17.1**, inset to the trigger text box. weight:gap = 1:32 against the edge's 1:24 at half its alpha |
| plate edge, all five floating/overlay plates | dialog, sheet, popover, tooltip, command | α 0.05 produces **no local minimum** — the shadow ramp outside (201.0) is darker than the border pixel (218.4) | ink **α 0.16 → dip 33.2**, static |
| `.command__input` + `.command__input-wrapper` | command | **no Δ on hover, press, or `:focus-visible`** (verified true); the wrapper's α 1.0 rule is the strongest line in the plate and never moves | wrapper rule → α 0.08 at rest, → **0.16** on child focus (edge alpha, i.e. the field is promoted to a boundary), `--spring-press` 0.12s |
| `.glass-drawer-handle` / `.glass-drawer-grip` | drawer | `role="slider"`, `aria-valuetext="40%, position 2 of 4"`, **no hover Δ, no press Δ, cursor stays `grab` through mousedown**; `transition: opacity .2s, width .2s` declared and never fired | opacity 0.45 → 0.70 hover; width **36 → 44px** between detents on `--spring-dock` (0.30, ζ0.88, 0.21s); `cursor: grabbing` on press. **Detent ticks REJECTED** — new paint for a value the sheet height already reports |
| `Button emphasis="quiet" iconOnly` | tooltip | `box-shadow: none`, `outline-style: none` with `:focus-visible` **true** — no focus ring at all | the library ring `0 0 0 2px ink/0.3, 0 0 8px ink/0.15` |
| `.expandable-container button[data-part=trigger]` (class list = `""`) and the hover-card trigger | expandable, hover-card | four focus answers in one category, one of them **`outline: 1px auto rgb(0,95,204)`** — Chrome's blue on warm cream | the same ring. One answer, five plates |
| hover-card trigger | hover-card | the only interactive element in `main`: `transition-duration: 0s`, `cursor: default`, one property moves (`decoration-style: dotted→solid`), mobile target **120×24** (`meets44: false`) | underline plate α 0 → 0.443 + decoration solidify, both `--spring-press` 0.12s; coarse block pad to clear 44px |
| `.disclosure-trigger` press + disabled | accordion | press computes **identical to hover** (no third channel); `cursor: pointer` retained under `[disabled]` while Button and command rows use `not-allowed` | `scale: 1.0128 0.9962` (the Button's shipped anisotropic squish); `cursor: not-allowed` |
| `CollapsibleTrigger` indicator | collapsible | **5 of 6 triggers have `svg: 0`**, no border, no fill — indistinguishable from the caption below | the sibling's 16×16 chevron, `rgb(91,70,51)`, same disclosure transition |
| destructive menu row | dropdown-menu | `text-destructive` computes `rgb(28,25,23)` — **byte-identical to a benign row**; a bare `<span class="text-destructive">` in the same document computes `rgb(219,36,36)` (unlayered `dropdown-menu/styles.css` beats the layered utility; **118,218 of 318,622 served bytes = 37.1% unlayered**) | a destructive **state on the component**: ink `var(--destructive)`, hover fill `color-mix(in oklab, var(--destructive) 10%, transparent)`, icon tint, same on `data-highlighted` |
| `CommandList` overflow | command | **171px below the fold** (711/540), `mask-image: none`, no `::before`/`::after`, no scrollbar gutter — while the demo's own `demo-bottom-dock__tabs` and `story-code-block-scroll` carry the mask | the shipped `FadingScroll`: 16px trailing opacity mask, leading edge once `scrollTop > 0` |
| dialog scroll region | dialog | header + ✕ leave the viewport at max scroll (both rects y = −21) | one scroller (`dialog-content-region`) in every placement + the same 16px edge mask |
| dialog / sheet close ✕ **where retained** | dialog, sheet | 16×16 desktop **and** mobile = **13% of a 44px target**; `cursor: default` on a `<button>`; one channel (opacity 0.7→1.0) | 44×44 hit box, 16px glyph, `--radius-pill`, `cursor: pointer`; retained **iff** the plate has no named dismissal (IOS27 §3: inset chromeless = content-owned dismissal) |
| tooltip on coarse | tooltip | `NO-TOOLTIP-ON-TAP` — no popper wrapper mounts | long-press → the same plate, `--spring-transient` 0.20s |
| popover collision padding on coarse | popover | lands at **x = 0**, gutter outside 0 vs inside 16 | collision padding = the plate's own resolved coarse pad-inline (12px). ratio 1:1 |
| keyboard `data-highlighted` | command, dropdown | pointer hover gets `translate: 0 −1px`, keyboard gets `translate: 0px` — same fill token, two geometries | the lift, both paths |
| expanded `.expandable-container` | expandable | content stays 192px inside a 1440×900 host: **708px of empty cream**, a hard seam at y≈192, no boundary | content region fills the host, or the host stops at the content column's gutter (MOTION-CANON §9-5); plate edge at α 0.16 |
| **ROUTED, not a proportion row** | collapsible | `.click()`, `Enter`, `Space` all leave `data-state="closed"`, content 0×0; `default-open` ignored; only `v-model:open` works. `Collapsible.vue:51` binds `:open="open"` unconditionally where `open?: boolean` has no default → reka's uncontrolled arm is never entered. **Remedy not tested (Rule 6)** | correctness seat |

---

## 4. RE-PROPORTION TABLE

| selector | current | target | ratio it now satisfies |
|---|---|---|---|
| `.popover-content`, `.dropdown-menu__content`, `.command` (`utilities/base.css:75`, `dropdown-menu/styles.css:7`, `command/styles.css:7`) | `--radius-panel` 12px | **`--radius-card` 16px** | category ladder **10 · 16 · 24** = ×1.6, ×1.5 |
| `[data-placement]` dialog (sheet), `.glass-drawer` | 16px / 12px, `corner-shape: round` | **24px** + squircle re-keyed off `[data-placement]` | the room rung acquires its first consumer; `CSS.supports("corner-shape: squircle")` is already `true` and `--corner-shape-sheet: superellipse(2)` is already minted |
| `.disclosure-trigger` (1248×59.9 / 321×56) | `9999px` → cap = **2.4% / 8.7%** of width, **3.6× apart** | **`--radius-strip` 12px** | r:h **1:5**; cap 0.96% / 3.7% — one silhouette at both viewports |
| `input.field-control`, `--radius-field` | 16px full-width / 9999px at `w-20` | **12px at every width** | r:h 1:3.3 desktop, 1:5 on the 60px coarse box |
| dialog/sheet close ✕ | `4px`, 16×16 | **`--radius-pill`, 44×44 hit / 16px glyph** | the only 4px in the category leaves; ✕ : Button = 44:40 instead of 16:40 |
| `.configurator-preset-tile` | 16px inside a 12px plate — **inner corner larger than outer** | relay `max(4, 12 − 20)` = **4px** | 1:3 inner:outer, matching its compliant sibling `.configurator-layer` |
| `.disclosure-trigger` padding | 16/4 → block:inline **4.000** | **15.264 / 12** | 1.272; height 58.5 against a shipped 59.9 |
| `.configurator` layer trigger + body | 8/20 → **0.400** | 20.352 / 16 | 1.272 |
| `ShowcaseFrame`, dropdown plate, presets | 20/20, 6/6, 10/12 | 20.352/16, 10.176/8, 15.264/12 | 1.272. **Spread closes from 10× (0.400→4.000) to 1** |
| DrawerHeader gap / DrawerFooter pad-top | 6.11154px / 12.5785px | **6px / 15.264px** | φ leaves the gap axis; one derivation law, not three |
| drawer header vs list inline pad | 16 vs 24 inside one plate — an unexplained 8px step | **24 both** | title edge = row edge |
| `--overlay-pad-inline` on coarse | ×1.00 (24px on a 393px screen = **6.1%**) | one rung down → **16px** = 4.1% | dialog measure 33.7 → **35.2ch** |
| `.command__item` / `.dropdown-menu__item` type on coarse | ×1.28 (16.4 → **21px**), measure **21.0ch** | **×1.00**, 44px floor takes the touch load | measure **26.9ch**; the dialog stops shrinking its body 15% while growing its input 28% inside one plate |
| plate-edge alpha | 0.04 / 0.05 / 0.60 / 1.00 | **ink 0.16** (dip 33.2) | one value, five plates |
| in-content rule alpha | 0.00 / 0.50 / 0.55 / 0.70 / 1.00, width 1–2px | **ink 0.08, 1px** (dip 17.1) | rule : edge = **1 : 2** (today 20 : 1, inverted) |
| `.dropdown-menu__separator` inset | `margin: 0 -4px` → stops **3px short** of each edge inside a 256px plate | **6px** (the content box) or **0** (full bleed) | never 3 |
| `--glass-rim-ink` top leg (`glass/rim.css:90-92`) | white **0.30** | **0.12** | the owner's specular ceiling; the silhouette moves from white-led to ink-led |
| `[data-slot=glass-graded-halo]` | `blur(34px)`, 3.1× the floating rung | banded **3/5/8/12px** composing to σ ≤ 15.6 | IOS27 §2: σ_max **12.3pt** at the element edge, reach **148pt**, linear |
| `stage=immersive backdrop=graded` | `blur(20px)` + **cream 0.475 (lightens)** | blur-only, banded as above, cream **struck** | every other scrim darkens (ink 0.50/0.72); IOS27 §2 measures L = **exactly 0.00** in the graded gap — the field has no luminance component at all |
| accordion chevron | rotate 0→180° over 0.44s, **+22% overshoot at 70% of clock** | `--spring-press` 0.12s, **monotone** | corpus ceiling is **4.7%**; MOTION-CANON Law 0 — a peak at 70% of clock is a late tick, the worst read of the three |
| `.glass-drawer` alpha by direction | bottom **0.852** vs left/right **0.952** | one rung | same component, one alpha |
| ladder alpha order | floating **0.808** > overlay **0.6928** | monotone up the ladder | the modal rung is currently **14% more transparent than the rung beneath it** |

---

## 5. GLASS DEFECTS

**`backdrop-filter: none` on a veiled surface — 37 of 84 glass surfaces in the category.** Two mechanisms, both proven, and they get different rulings.

| surface | veil | bdf | ruling |
|---|---|---|---|
| `.configurator.glass-floating` (1240×560 — the largest glass surface in the category) | **0.808** | none | the GPU-canvas rationale is sound, the execution is not: **if the root sheds its blur it sheds its veil.** Root → `background: transparent` + rim only; `--glass-bg-floating` moves to the two chrome siblings that already carry `blur(11px) saturate(1.6)` |
| `.configurator-preset-tile.glass-capsule` ×3 | 0.839 | none | same |
| `.button.glass-wash.glass-capsule` ×17 across 5 routes | 0.52–0.60 | none | the **cell rule stands** (`material.css:56-67` — one backdrop sample per plate; MOTION-CANON §3: a control inside a plate is not a second piece of glass). The defect is that veil and specular do not follow it. **Gate all three channels on one condition:** `--glass-cell-backdrop-filter: none` ⟹ **ink tint ≤ 0.06** (a recessed well, darker than its host — IOS27 §1 Maps still) **and zero white specular**. Today: a 52-60% *cream* veil that lightens, plus an 18%-peak white highlight (max Δ 46, 36.6% of px ≥4) |
| `.glass-resting` ShowcaseFrame (default tier) ×5, `--glass-level: 0` | **opaque** `color(srgb .992 .961 .925)` | none | the third named surface joining the lead's `.segmented-tabs` and `.glass-track-well`. Strike the tier prop; one frame at the resting rung |
| sheet plate (glass **and** opaque), tooltip story toolbar (0.5 veil), `.command` inline (`blur(8px)` **no saturate**) | 0.44–1.0 | none / no saturate | frost delegated to a child is legal (`glass-graded-halo`); a veil with no blur anywhere in the chain is not |

**White specular above 0.12α:** `--glass-material-rim` ships `inset 0 y 0 rgb(255,255,255,0.30)` + `inset x 0 0 rgb(255,255,255,0.18)` (`glass/rim.css:90-95`) on **every rung**, plus the `::before` plus-lighter ring. Ruling: top leg → **0.12**, side leg **struck**, `::before` **struck**. Plates then assert their boundary on exactly **two** channels (ink 0.16 + white 0.12) instead of four, and the ink is the stronger of the two — frost-led, not specular-led.

**Engine-conditional arms:** two in the category, both legal-as-written, both **unverifiable this session**. (1) `@supports (corner-shape: superellipse(2))` — a PE tier; an unsupporting engine gets `round`, not a broken plate. Keep. (2) `mask-composite: intersect` paired with `-webkit-mask-composite: source-in` on the graded halo — these are **not synonyms in general**; MOTION-CANON §8 requires a pixel diff proving the pool shape is identical. **OWED, Safari down.** No masking fallback exists in the category, and none may be added.

---

## 6. DE-SHADCN NOTES

1. `class="… rounded-sm opacity-70 hover:opacity-100 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-accent-foreground"` on the dialog ✕ (`DialogContent.vue:496`) — verbatim shadcn, on a button that is never disabled and has no `data-state`.
2. `border: 1px solid var(--border)` as a **plate edge** (`dropdown-menu/styles.css:6`) — the `border-border` idiom surviving intact; `--border` (`rgb(198,180,159)`, α 1.0) does two jobs at two altitudes (plate edge on menus, row rule in Command). A colour that means "outermost boundary" and "row separator" simultaneously cannot carry hierarchy.
3. `bg-card/70 border-border/50 shadow-lg backdrop-blur` on `command.vue:116` — five foreign utilities over `.glass-floating`, producing Tailwind's stock `rgba(0,0,0,0.1) 0 10px 15px -3px`, the **only neutral-black shadow in the category**, against the library's own warm `--shadow-lg`.
4. `text-destructive` as a **consumer-applied utility** rather than a component state — and it silently loses to 37.1% unlayered CSS.
5. `divide-y` on the dialog list; `rounded-sm`, `rounded-[var(--radius-card)]` arbitrary-value classes where a role token exists.
6. `outline: 3px` reserved on 570 elements while the ring is delivered by `box-shadow` — the shadcn focus idiom half-ported.
7. `cursor: default` on three non-menu interactive surfaces (the 1288×288 drop zone, the hover-card trigger, the expandable trigger); defensible only inside a macOS menu.
8. **14 routes for 10 components** — a docs-site shape (one page per named recipe: `sheet`, `hover-card`, `context-menu`) rather than a component library's shape (one page per component, props as rows).
9. `ShowcaseFrame` `tier="resting" → surface="opaque"` — a specimen chrome that turns the library's identity off around every specimen.
10. Two frame idioms on one page: `ShowcaseFrame` at `rounded-card` 16px (38 uses) and raw `Surface` at **0px, no border, no shadow** — square corners in a library whose identity is deft rounding.

---

## 7. π / DELTA OBLIGATIONS

Every row: paired before/after, same DOM node count (a capture far from baseline is **VOID, not passing**). **`safari-app` is OWED on every row** — `safaridriver` refuses remote automation this session and no WebKit result is inferred from Chromium. `webkit-engine` (Playwright) is separately blocked: 5/5 mount crash, diagnosed, not this seat's subject.

| # | claim | route | engine | viewport | modes |
|---|---|---|---|---|---|
| 1 | plate edge ink 0.05 → 0.16 registers a local minimum (dip 33.2) | popover, dropdown, dialog, sheet, tooltip | Chromium **+ safari-app OWED** | 1440×900 @1x **and** @2x (AA margin is 5.3 units) | light + dark |
| 2 | in-content rule 0.00 → 0.08 (dip 17.1) reads as a seam, not a plate edge | accordion, dialog list | Chromium + OWED | 1440×900 @1x | light + dark |
| 3 | grain removal is a null delta | dialog, tooltip, accordion | Chromium + OWED | 1440×900 @2x | **light + dark both** (dark uses `soft-light` @ 0.045) |
| 4 | rim 0.30→0.12 + side leg + `::before` struck ⇒ frost-led silhouette, not plastic | dialog, popover, command | Chromium + OWED | 1440×900 @2x | light + dark |
| 5 | cell veil (cream 0.52) → ink tint 0.06 reads recessed, not raised | dialog footer, popover, dropdown | Chromium + OWED | 1440×900 @2x + 393×659 | light + dark |
| 6 | scrim `backdrop-filter` removal ⇒ text behind the scrim gains legibility (chroma survives, contrast ≥3:1) | dialog, sheet, drawer | Chromium + OWED | 1440×900 | light + dark |
| 7 | command single-plate: composite veil 0.951 → 0.808 | command | Chromium + OWED | 1440×900 | light + dark |
| 8 | radius 12→16 / 16→24 / pill→strip reads as three roles | popover, command, sheet, accordion | Chromium + OWED | 1440×900 + **393×659** (cap ratio 8.7%→3.7%) | light |
| 9 | coarse pad rung-step: dialog measure 33.7→35.2ch, command 21.0→26.9ch | dialog, command | Chromium + OWED | **393×659 @3x** | light + dark |
| 10 | ✕ 16×16 → 44×44, and absent where a footer action exists | dialog, sheet | Chromium + OWED | 1440×900 + 393×659 | light |
| 11 | graded halo banded 3/5/8/12 (σ≤15.6) replaces blur(34)/blur(20); cream 0.475 struck | sheet, dialog `backdrop=graded` | Chromium + OWED | 1440×900 @2x | light + dark |
| 12 | `FadingScroll` on `CommandList` + one dialog scroller: header never leaves the viewport | command, dialog | Chromium + OWED | 1440×900 + 393×659 | light |
| 13 | context-menu zone hover/long-press: ≠0 px of 48,000 | context-menu | Chromium + OWED | 1440×900 + 393×659 coarse | light |
| 14 | chevron monotone ≤4.7% overshoot | accordion, collapsible | Chromium + OWED | 1440×900, frame-stepped | light |
| 15 | `mask-composite: intersect` vs `-webkit-mask-composite: source-in` pool-shape parity | sheet, dialog graded | **safari-app — OWED, blocking** | 1440×900 | light |
