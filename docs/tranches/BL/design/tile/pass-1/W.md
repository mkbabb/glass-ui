# D4 · pass 1 · W · prior art for the selectable multi-line tile

| field | value |
|---|---|
| seat | W, the prior-art seat of D4 pass 1. Research only: it picks no family |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | the task named `91dbcbd8`; the checkout is at `12cb04e3`, 37 docs-only commits later. `git diff --stat 91dbcbd8 HEAD -- src` is empty, so every `src/` citation in `PORTFOLIO.md` still holds |
| inputs | `PORTFOLIO.md` §0-§2, §5-§7. The web, specs and shipping source listed in §9, all read on 2026-09-24 |
| instruments | Playwright 1.61.1 from `glass-ui/node_modules`: headless Chromium 149.0.7827.55 and Playwright WebKit 26.5 (UA `Version/26.5 Safari/605.1.15`). Two tiny pages, `page.html` (CSS support and computed corners) and `radios.html` (native radio arrows in a 2×2 grid). `@mdn/browser-compat-data` 8.1.3 (timestamp 2026-09-24T13:25Z). Contrast figures are WCAG relative-luminance ratios computed from each system's published token values, not from painted pixels. No build, no source edit, so no worktree was opened |
| Safari | every real-Safari cell is UNMEASURED (owner's safaridriver checkbox). WebKit numbers below are Playwright WebKit |

## 0 · What the prior art says, in brief

1. **No shipping system puts a multi-line option on the stadium.** Radix Themes keeps `RadioCards` on `--radius-3`/`--radius-4` (6/8 px × factor) even under `radius="full"`, where only `--radius-full` turns to 9999 px. Material 3 puts cards on `corner-medium` (12 dp) and filter chips on `corner-small` (8 dp). Spectrum 2's `SelectBox` is `lg` (10 px). Fluent cards are 2/4/6 px. Apple defines a capsule as "a radius that's half the height of the container" and keeps it for touch controls and standout actions, with fixed and concentric shapes for the rest. The role split in `DESIGN.md:385-391` (stadium for one line, the card rung for holders) matches every source read.
2. **A background fill never carries the selected state in any of them.** The selected fill measures 1.12 to 1.22:1 in the systems whose tokens we could read, the same band as glass-ui's 1.20. The separation comes from an **edge** (Radix: 2 px accent outline; shadcn: a `border-primary` edge, 16.67:1 in light; Spectrum: a 2 px `gray-900` border from transparent; M3: the stroke switches to `colorSecondary`) or a **mark** (M3: a check icon at `TOP_END`; Fluent: a `floatingAction` checkbox; shadcn: the radio dot; M3 filter chip: a leading check). Fluent's own selected card, with no floating action, separates 1.19:1 on fill and 1.23:1 on stroke. That is the defect T-3 names, shipping in a major system.
3. **Focus vs selection is not solved uniformly, and the best example is the one that splits them by property.** Radix paints both on the same `::after` outline, and focus changes its colour and adds a tint. That is exactly the collision §2.2 forbids. shadcn puts the focus ring on the radio dot and the selection on the card edge, so the card itself never shows focus. Fluent draws focus as an inset outline (`outlineOffset: -2px`) and selection as border plus fill. The Fluent split (focus on `outline`, selection on border/fill) is the one that matches glass-ui's law: `outline` belongs to the ring, and selection uses the plate's edge or a mark.
4. **Arrow keys: the web platform moves linearly, and one library moves by geometry.** The APG radio group, native `<input type=radio>` (measured in both engines here), reka-ui with `orientation` unset, and Radix all make all four arrows move to the next or previous item in DOM order, wrapping. react-aria's `ListKeyboardDelegate` with `layout="grid"` (under Spectrum 2 `SelectBoxGroup`) makes Down move to the next item with the same `x`, a geometry walk that needs no column count. glass-ui today does neither: its cross axis is dead (T-5). Either answer cures it. They differ only in what Up and Down mean in a grid.
5. **A radio cannot hold interactive content.** `radio`, `option`, `tab`, `button` and `checkbox` are all "Children Presentational: True" in ARIA 1.2 (Rec, 2023-06-06) and in the ARIA 1.3 editor's draft (2026-09-22). `gridcell` is not. HTML's `<button>` allows phrasing content only, with "no interactive content descendant". A tile with a live track or a button inside is still a radio only while the inside stays inert. fourier-analysis `GalleryCard` (batch checkbox, like, admin) is a grid or listbox-with-actions case, not a radio tile.
6. **Content-derived corners: the only pure-CSS precedent is rung-bound.** Spectrum 2's style macro defines `pill: calc(self(height, self(minHeight, 9999px)) / 2)`. That is half the *declared* height, the same law as glass-ui's Button bound (A1), resolved at build time. No shipping system measures the box at runtime to set its corner. This seat's probes add one form that §2.1 missed: a **structural** rule (`:has(> * + *)`) works in both engines. It cannot see a single label that wraps.

## 1 · Shipping design systems

| system | primitive and semantics | multi-line anatomy | corner | selected carrier | focus | keys | engagement | source (date) |
|---|---|---|---|---|---|---|---|---|
| **Radix Themes** `RadioCards` | Radix `RadioGroup` → `radiogroup`/`radio` | free children in `Item`; the docs example is "8-core CPU" bold over "32 GB RAM" | `--radio-cards-item-border-radius`: `radius-3` (sizes 1, 2), `radius-4` (size 3) = 6/8 px × `--radius-factor` (0 … 1.5). `radius="full"` sets factor 1.5 and `--radius-full: 9999px`, but RadioCards never read `--radius-full` | `::after { outline: 2px solid var(--accent-indicator) }`. With the default indigo, `#3e63dd` on white is 5.21:1 | `::after` outline `--focus-8`. When checked, focus recolours that same outline to `--focus-10` and adds a `--focus-a3` tint on `::before`. **Same property as selection** | Radix roving: all four arrows, linear | hover box-shadow only when `:not([data-state='checked'])`, under `@media (hover: hover)`. Classic variant: 40 ms | `radio-cards.css`, last commit 2025-05-05; `tokens/radius.css` |
| **shadcn/ui** choice card (`FieldLabel` wrapping `Field` + `RadioGroupItem`) | Radix `RadioGroup`. The card is a `<label>` and the radio dot is the focus target | `FieldTitle` + `FieldDescription` beside the dot | `rounded-md`, applied via `has-[>[data-slot=field]]` | `has-data-[state=checked]:border-primary` + `bg-primary/5` (dark `/10`). Computed: border 16.67:1 light, 10.63:1 dark; fill 1.12:1 light, 1.22:1 dark | `focus-visible:ring-[3px]` on the **dot only**; the card shows no focus | Radix, linear | none on the card | `ui/field.tsx`, last commit 2026-09-04; `examples/field-choice-card.tsx`; `app/globals.css` |
| **reka-ui** `RadioGroup` (installed 2.10.1; docs show 2.10.5) | `Radio` renders `as: "button"`, `role="radio"`, `aria-checked`, `data-state`, `asChild` supported | any slot content | unstyled | unstyled; `RadioGroupIndicator` | unstyled | `getFocusIntent`: with `orientation` unset, Left/Up = prev and Right/Down = next; with `orientation` set, the cross-axis arrows return `undefined` (the same dead-axis shape T-5 measures in glass-ui) | an arrow keypress calls `.click()`, so selection follows focus | `node_modules/reka-ui/dist/RovingFocus/utils.js:9-28`, `RadioGroup/Radio.js:33-100` |
| **Ark UI** `RadioGroup` | Zag machine. `Item` must render a `<label>` with `ItemHiddenInput`, "essential for the radio group to function correctly" | `ItemText` + `ItemControl` | unstyled | unstyled | unstyled | Tab to the checked item; arrows move and check | none | ark-ui.com/docs/components/radio-group (no date shown). The docs do not list `data-state` or `data-focus-visible`: **unverified** |
| **Adobe Spectrum 2** `SelectBoxGroup` / `SelectBox` | react-aria `ListBox` with `layout="grid"`: **`listbox`/`option`**, not a radiogroup; `selectionMode` single (default) or multiple | illustration + `label` + `description` slots; `orientation` vertical or horizontal | `borderRadius: 'lg'` = 10 px | `borderWidth: 2`, `borderColor` transparent → `gray-900` when selected; shadow `emphasized` → `elevated`. A checkbox mark only in `multiple` mode | `isFocusVisible` render prop (paint not read) | `ListKeyboardDelegate` `layout==='grid'`: Down/Up walk forward/back in DOM order, skipping items until one with the same `x` (`isSameRow`); Left/Right skip to the same `y` | `pressScale`: `perspective(max(h, w/3, 24)px) translate3d(0,0,-2px)` | `s2/src/SelectBoxGroup.tsx` (last commit 2026-06-24), `pressScale.ts`, `react-aria/src/selection/ListKeyboardDelegate.ts:137-196`, `spectrum-theme.ts:523-531`. Released as alpha in S2 0.11.0 (releases page) |
| **Fluent 2** `Card` (`selected`, `floatingAction`, `focusMode`) | role supplied by the author; "similar to checkboxes or radio groups" | `CardHeader`, `CardPreview`, `CardFooter` | `borderRadiusSmall/Medium/Large` = 2 / 4 / 6 px by size | `colorNeutralBackground1Selected` `#ebebeb` on `#ffffff` = **1.19:1**; `::after` border `colorNeutralStroke1Selected` `#bdbdbd` vs `#d1d1d1` = **1.23:1**. The docs: "by default, there is no indicator … For a stronger signifier, use the `floatingAction` prop". Forced colours: `Highlight` fill + `HighlightText` | inset outline, `outlineOffset: '-2px'`, `strokeWidthThick`, on `:focus` / `:focus-within` | `focusMode`: `off` / `no-tab` / `tab-exit` / `tab-only` (Tabster groupper) | hover `shadow4` → `shadow8` | `useCardStyles.styles.ts` (last commit 2026-06-01), `tokens/global/borderRadius.ts`, `alias/lightColor.ts:67-153`, fluent2.microsoft.design card usage |
| **Material 3** card (Android `MaterialCardView`, web tokens) | `Checkable`; "no default way to switch to the checked state" | free | `container-shape: corner-medium` = 12 dp | stroke `colorOutline` → `colorSecondary`; `checkedIcon` `ic_mtrl_checked_circle` at `checkedIconGravity` `TOP_END`; foreground overlay changes | state layer (not read) | n/a | dragged state lifts elevation | material-components-android `docs/components/Card.md`; material-web `tokens/versions/latest/sass/_md-comp-elevated-card.scss:35` |
| **Material 3** filter chip | chip | one line | `corner-small` = 8 dp. Chips are not stadiums in M3 | `flat-selected-container-color: secondary-container` + a leading check icon | state layer | n/a | — | `_md-comp-filter-chip.scss:54,88` |
| **Material 3 Expressive** `ToggleButton` (Compose) | toggle | one line | **the shape carries state**: unchecked `ContainerShapeRound` (`CornerFull`), checked `SelectedContainerShapeSquare` (`CornerMedium`, 12 dp), pressed `RoundedCornerShape(6.dp)`. "the ToggleButtonShapes that the toggle button will morph between" | shape + container colour | — | — | the corner morphs on press and on commit | androidx `ToggleButton.kt:694-715` (last commit 2026-09-02), `tokens/ButtonSmallTokens.kt:27-52` |
| **Apple HIG / iOS 26-27** | no "option card" component in the HIG. Segmented controls: "a single choice from among a set of options"; "no more than about five segments on iPhone"; "Prefer using either text or images — not a mix of both". Radio buttons (macOS): "Typically displayed in groups of two to five"; "selected (a filled circle)" | segments can carry "text labels beneath them" | WWDC25 356: "fixed shapes have a constant corner radius. Capsules use a radius that's half the height of the container. And concentric shapes calculate their radius by subtracting padding from the parent's." Capsules suit "touch-friendly layouts, but in dense desktop environments, they're best used for standout actions"; macOS Mini/Small/Medium controls "will continue using rounded rectangles" | HIG Focus and selection: "a button might briefly invert its colors and animate before it transitions to its selected appearance" | "use a focus ring for a text or search field, but use a highlight in a list or collection" | n/a (touch-first) | Liquid Glass controls "transform into liquid glass during interaction" (secondary source). iOS 27: "a darkened edge around Liquid Glass elements, along with brighter specular highlights" | HIG JSON `segmented-controls` (change log 2023-06-21), `toggles` (2024-03-29), `focus-and-selection` (2023-10-24); WWDC25 219 and 356 transcripts; MacRumors 2026-06-10 |

**What Apple's option cards look like on device** (the Settings › Display & Brightness Light/Dark pair, the iOS 26.1 Liquid Glass Clear/Tinted pair, which MacRumors 2025-11-04 describes only as "Tap Tinted … or Clear", and the iOS 27 transparency slider): **UNVERIFIED.** No written source describes their anatomy (thumbnail, label, a check circle under each), and this seat has no device. It needs an owner capture before any family cites it as iOS canon.

## 2 · The selected state and the focus ring: prior art against F-24 and §2.2

| system | fill sel:unsel | edge or mark | selection and focus on different properties? |
|---|---|---|---|
| glass-ui HEAD (PORTFOLIO S1) | 1.20 / 1.23 | none the content cannot erase | n/a (the consumer spent `outline` on selection, T-4) |
| Fluent 2 card, no floating action | 1.19 (light, computed) | stroke 1.23 | yes: outline = focus, border and fill = selection |
| shadcn choice card | 1.12 light / 1.22 dark (computed) | 1 px border 16.67 / 10.63 + radio dot | yes, but the card shows no focus at all (only the dot does) |
| Radix RadioCards | not read | 2 px outline, 5.21 vs white | **no**: one outline carries both, and focus recolours it |
| Spectrum 2 SelectBox | none (`layer-2` both) | 2 px border transparent → `gray-900` | not read |
| M3 checkable card | overlay change (not quantified) | stroke recolour + check icon | not read |

The pattern across sources is consistent. Fill tints stay near 1.2:1 everywhere, and every system that clears 3:1 does it with an edge at least 1 px wide, or with a mark. For glass-ui the free carriers are the plate's `border` (the rim), a mark, or the flood. `outline` stays the ring's.

## 3 · ARIA and keys

### 3.1 The specs

- **APG radio group** (w3.org/WAI/ARIA/apg/patterns/radio, no date on the page): "Right Arrow and Down Arrow: move focus to the next radio button in the group, uncheck the previously focused button, and check the newly focused button. If focus is on the last button, focus moves to the first button." Left and Up mirror it. Tab enters on the checked button, or on the first if none is checked. The pattern says nothing about two-dimensional layout, and no row-wise movement is defined. Inside a toolbar, arrows move without checking and Space checks.
- **APG grid** (w3.org/WAI/ARIA/apg/patterns/grid): a layout grid moves focus by cell. Right at the row end "optionally … may move to the first cell in the following row". Home/End go to the row's ends, and Ctrl+Home/End to the grid's. A cell may hold "one widget whose operation does not require arrow keys". Selection uses `aria-selected`, not `aria-checked`.
- **Children presentational** (ARIA 1.2 Rec 2023-06-06; ARIA 1.3 ED 2026-09-22), parsed from the spec HTML: `radio` True, `option` True, `tab` True, `button` True, `checkbox` True; `gridcell` has no such row, and `radiogroup` has none either. A radio's inner structure is flattened into its name, so a tile's readout and live track are announced as text or not at all.
- **HTML `button`** (WHATWG, updated 2026-09-24): "Phrasing content, but there must be no interactive content descendant and no descendant with the tabindex attribute specified." A tile rendered as `<button>` must build its rows from phrasing elements (`span` with `display:block`), not `div`s, to stay conforming.

### 3.2 Measured: native radios in a 2×2 grid

`radios.mjs`: four `<input type=radio>` in `grid-template-columns: 1fr 1fr`, start on item 1 (top right):

| key from item 1 | Chromium 149 | Playwright WebKit 26.5 | real Safari |
|---|---|---|---|
| ArrowDown | → 2 (bottom left, next in DOM) | → 2 | UNMEASURED (owner's safaridriver checkbox) |
| ArrowRight | → 2 | → 2 | UNMEASURED |
| ArrowUp | → 0 | → 0 | UNMEASURED |
| ArrowLeft | → 0 | → 0 | UNMEASURED |
| Home / End | no move | no move | UNMEASURED |

The platform model is linear on all four arrows, the same in both engines, with no Home/End.

### 3.3 The two precedents for T-5

| model | Up/Down in an auto-fill grid | cost in the engine | precedent |
|---|---|---|---|
| **linear on all four arrows** | the next item in DOM order (moves right, not down, in a two-column grid) | drop the axis filter for one-of-N groups: reka's `getFocusIntent` with `orientation` unset | APG radio, native radios (measured), reka, Radix |
| **geometric** | the next item with the same `x` | a rect walk: step forward in DOM order until `x` matches and `y` differs. No column count, so it survives auto-fill and resize | react-aria `ListKeyboardDelegate` (`layout="grid"`), under Spectrum 2 SelectBoxGroup |

react-aria compares `x` with `===`, which holds for CSS grid columns (identical track offsets) and is fragile for flex-wrap rows of unequal widths. Neither precedent defines Home/End for a radio group, while APG grid does.

## 4 · Shape prior art beyond the tables

- **A rung-bound corner (A1) has a shipping twin.** Spectrum 2 `spectrum-theme.ts:530`: `pill: 'calc(self(height, self(minHeight, 9999px)) / 2)'`, and `:436-437` has `edge-to-text` at 3/8 of the same height. The style macro rewrites `self(height)` into a variable holding the declared height, so the corner is half the declared rung and never follows content. When no height is declared it falls back to a stadium.
- **The capsule is defined to track content.** Apple's capsule is half the container's height, like SwiftUI's `Capsule`, and so is glass-ui's 9999 px. What restrains it is the usage rule (touch controls, standout actions), not a clamp in the shape. That is the canon's role table, not a new mechanism.
- **Shape as a selection carrier** (M3 Expressive): round when unchecked, a 12 dp rounded rectangle when checked, 6 dp while pressed, morphing between them. It is the one prior art where selection moves the corner. For a multi-line tile it points the other way from N-9, because the unchecked tile would be the stadium the owner rejected. As an engagement move on commit (a brief squaring that settles back) it has a precedent. **Unverified**: whether the Compose morph is spring-driven. The source names `ToggleButtonShapes` "that the toggle button will morph between", and the motion spec was not read.
- **Radix's `--radius-full` is a separate role variable, not a size.** It is 0 px on every radius setting except `full`, and only pill-role components read it. A theme-wide "make it rounder" switch therefore cannot turn a card into a stadium. Glass-ui's `--radius-pill` and `--radius-field` split is the same idea.

## 5 · Engagement prior art

| move | source | note for D-2 |
|---|---|---|
| press depth that is constant in pixels | Spectrum `pressScale`: `perspective(max(h, w/3, 24)px) translate3d(0,0,-2px)` | computed scale p/(p+2): 208×50 tile → 0.972; 150×99.1 → 0.980; 44×44 → 0.957. glass-ui's flat 0.97 moves a 208 px tile's edge 3.1 px and a 44 px chip's 0.7 px |
| hover only on unselected items | Radix `:not([data-state='checked']):hover`, `@media (hover: hover)` | the coarse-pointer guard F-77 asks for |
| hover elevation | Fluent `shadow4` → `shadow8`; Spectrum `emphasized` → `elevated` | light channel, PRM-safe |
| commit: invert, then settle | HIG Focus and selection | Apple's precedent for a commit flood |
| shape morph on commit and press | M3 Expressive ToggleButton | see §4 |
| iOS 27 edge | MacRumors 2026-06-10: "a darkened edge around Liquid Glass elements, along with brighter specular highlights" | an edge carrier (§2) sits in the iOS 27 register; it is not a web-only concession |

## 6 · Easing and preset pickers in design tools

| tool | how presets are chosen | how curves are labelled | source |
|---|---|---|---|
| **Figma** (prototype animation) | an **Easing** menu: Linear, Ease in, Ease out, Ease in and out, Ease in back, Ease out back, Ease in and out back, Hold, Custom bezier; springs Gentle, Quick, Bouncy, Slow, Custom spring (stiffness, damping, mass). Easing can be saved as variables | names in the menu; whether each row carries a curve thumbnail is **unverified** (the help text does not describe it) | help.figma.com "Adjust an animation's easing" (no date on the page) |
| **SwiftUI** | `.smooth`, `.snappy`, `.bouncy` spring presets, tunable by duration and extra bounce | names only (API). keyframes.js's Smooth / Snappy / Bouncy follow Apple's vocabulary | WWDC23 session 10158 "Animate with springs" |
| **Framer** | time-based springs: **Time** and **Bounce** replace stiffness/damping/mass as the default | panel UI not read | framer.com/updates/time-based-springs (page body not retrievable; claims from search summary, **partly unverified**) |
| **Rive** | "selecting any of the icons above the graph": Linear, Cubic, Hold, Elastic; a four-value field for cubic | **icon per type** above a live graph; no named ease-in/ease-out presets | rive.app/docs/editor/animate-mode/interpolation-easing |
| **Chrome DevTools** Easing Editor | "click one of the picker buttons: linear, ease-in-out, ease-in, ease-out"; a **Presets switcher** stepping through named variants (In Out Sine, In Out Quadratic, In Out Cubic, Fast Out Slow In, In Out Back; linear() presets elastic, bounce, emphasized); an animated ball preview | picker buttons shown as curve glyphs; the switcher shows names | developer.chrome.com/docs/devtools/css/reference, last updated 2024-03-12 |
| **After Effects** | Keyframe Assistant › Easy Ease (F9), Easy Ease In, Easy Ease Out; the Keyframe Interpolation dialog | the **keyframe glyph** encodes interpolation: a diamond becomes an hourglass under Easy Ease | helpx.adobe.com keyframe interpolation (403 to fetch; claims from search summaries, **partly unverified**) |
| **Apple Motion** | Control-click a keyframe › Interpolation submenu: Constant, Linear, Bezier, Continuous, Exponential, Logarithmic, Ease In, Ease Out. Ease In and Ease Out are "available only when you Control-click a keyframe" | **text only**, no thumbnails | support.apple.com Motion guide "Curve interpolation methods" |

Takeaway for E-3 (can 28 portraits be picked without names?): every tool read here that shows curve glyphs does so for 4 or 5 items (Rive, DevTools' keyword buttons) and switches to names past that (Figma, DevTools' switcher, Motion). None of them identifies a set of 28 by glyph alone. The preset tiles pair a name with a live track, which is the Figma and DevTools pattern of a name plus a preview.

## 7 · CSS for content-derived corners

Support per `@mdn/browser-compat-data` 8.1.3, plus `CSS.supports` and computed corners measured here (`page.html`, `run.mjs`):

| feature | BCD: Chrome / Safari / Firefox | `CSS.supports` Chromium 149 | `CSS.supports` Playwright WebKit 26.5 | real Safari | what it can do for the tile corner |
|---|---|---|---|---|---|
| `anchor-size()` | 125 / 26 / 147 | `width`: true; `border-radius`: **false** | `width`: true; `border-radius`: **false** | UNMEASURED | nothing. The spec (css-anchor-position-1 §5) allows it only in sizing, inset and margin properties, "and is otherwise invalid" |
| `if()` | 137 / no / no | `border-radius: if(style(...))`: true; computed 16 px on the test tile | false; computed 9999 px | UNMEASURED | reads style, not size. Chromium only, so an `if()` corner is a masking fallback in Safari (E-2) |
| typed `attr(... type(<length>))` | 133 / preview / 155 | true; `data-r="16px"` → 16 px | false; 9999 px | UNMEASURED | reads an attribute a script must stamp. Chromium only |
| container query units (`cqh`) | 105 / 16 / 110 | true | true | UNMEASURED | resolve against an ancestor size container. A box cannot be its own container without losing its auto height (PORTFOLIO §2.1) |
| container style queries | 111 / 18 / 151 | not probed | not probed | UNMEASURED | reads a custom property on an ancestor, so the group (not the box) can declare the shape |
| `corner-shape` | 139 / preview / preview | true | false | UNMEASURED | D4-X2, not minted |
| `interpolate-size` | 129 / no / no | true | false | UNMEASURED | not a corner tool; relevant to D-1 height transitions only |
| `:has()` | 105 / 15.4 / 121 | true | true | UNMEASURED | **the structural form** (below) |

**The structural form, which §2.1 does not list.** `.t:has(> * + *) { border-radius: 16px }` over a `9999px` default:

| tile | Chromium 149 | Playwright WebKit 26.5 | real Safari |
|---|---|---|---|
| two child rows (name + readout), 200 px wide | 200×50, **16px** | 200×46, **16px** | UNMEASURED |
| one child row in the same grid row | 200×50, 9999px | 200×46, 9999px | UNMEASURED |
| one text label wrapped to three lines, 90 px wide | 90×80, **9999px** | 90×72, **9999px** | UNMEASURED |

It works in both engines with no script. It reads anatomy (two or more rows), not geometry. It cannot see a wrapped single label, and in a grid a one-row tile stretched to its neighbour's height stays a stadium beside a card. So it is a candidate for D4-A or D4-D ("a tile with a title and a body row is a card"), but it does not close T-1's wrapped-label cases (UIA-V-180, S10). §2.1's "two honest forms" becomes three: rung-bound, measured, structural.

**The measured form, by spec.** The HTML "update the rendering" loop runs "Recalculate styles and update layout", then "Gather active resize observations … broadcast active resize observations", and repeats until no observation is active, before paint (html.spec.whatwg.org, webappapis, updated 2026-09-24). A ResizeObserver stamp therefore lands before the first paint by spec. The `m1` tile here computed 16 px in both engines. Whether either engine ever paints a stadium frame on mount or on a font swap is PORTFOLIO question A-2 and was not measured here.

## 8 · Not verified

- The on-device anatomy of Apple's option pickers (Appearance, Liquid Glass Clear/Tinted, the iOS 27 slider). Needs an owner capture.
- Figma's easing menu thumbnails; Framer's transition-panel UI; the After Effects help text (403); M3 card and chip guidance pages (client-rendered, body not retrievable, so token files were used instead).
- Ark UI's `data-state` and `data-focus-visible` attributes, and whether Zag's radio arrows come from the hidden native inputs.
- Spectrum 2 SelectBox's focus paint; M3's card focus and state layer.
- Every real-Safari cell: UNMEASURED (owner's safaridriver checkbox).

## 9 · Sources (read 2026-09-24)

Specs:
- WAI-ARIA 1.2, W3C Recommendation 2023-06-06, https://www.w3.org/TR/wai-aria-1.2/ (radio, option, tab, button, checkbox, gridcell, radiogroup sections parsed)
- WAI-ARIA 1.3 editor's draft 2026-09-22, https://w3c.github.io/aria/
- APG Radio Group pattern, https://www.w3.org/WAI/ARIA/apg/patterns/radio/ (undated)
- APG Grid pattern, https://www.w3.org/WAI/ARIA/apg/patterns/grid/ (undated)
- HTML Standard, `button` element and the event loop, https://html.spec.whatwg.org/multipage/form-elements.html, https://html.spec.whatwg.org/multipage/webappapis.html (updated 2026-09-24)
- CSS Anchor Positioning 1 editor's draft §5, https://drafts.csswg.org/css-anchor-position-1/
- MDN browser-compat-data 8.1.3, https://unpkg.com/@mdn/browser-compat-data/data.json

Design systems:
- Radix Themes RadioCards, https://www.radix-ui.com/themes/docs/components/radio-cards; source `packages/radix-ui-themes/src/components/radio-cards.css` (last commit 2025-05-05) and `src/styles/tokens/radius.css`, github.com/radix-ui/themes
- shadcn/ui, `apps/v4/registry/new-york-v4/ui/field.tsx` (last commit 2026-09-04), `examples/field-choice-card.tsx`, `ui/radio-group.tsx`, `app/globals.css`, github.com/shadcn-ui/ui
- reka-ui RadioGroup, https://reka-ui.com/docs/components/radio-group (v2.10.5 in header); installed 2.10.1 source under `glass-ui/node_modules/reka-ui/dist/`
- Ark UI RadioGroup, https://ark-ui.com/docs/components/radio-group
- React Spectrum S2 SelectBoxGroup, https://react-spectrum.adobe.com/SelectBoxGroup; https://react-spectrum.adobe.com/releases/ (0.11.0 introduces it as alpha); source `packages/@react-spectrum/s2/src/SelectBoxGroup.tsx` (last commit 2026-06-24), `src/pressScale.ts`, `style/spectrum-theme.ts`, `packages/react-aria/src/selection/ListKeyboardDelegate.ts`, github.com/adobe/react-spectrum; card selection RFC https://github.com/adobe/react-spectrum/issues/5914
- Fluent 2 Card, https://fluent2.microsoft.design/components/web/react/core/card/usage; source `packages/react-components/react-card/library/src/components/Card/useCardStyles.styles.ts` (last commit 2026-06-01), `packages/tokens/src/global/borderRadius.ts`, `packages/tokens/src/alias/lightColor.ts`, github.com/microsoft/fluentui
- Material Components Android Card, https://github.com/material-components/material-components-android/blob/master/docs/components/Card.md; https://developer.android.com/reference/com/google/android/material/card/MaterialCardView
- Material Web tokens, `tokens/versions/latest/sass/_md-comp-elevated-card.scss`, `_md-comp-filter-chip.scss`, `_md-sys-shape.scss`, `tokens/versions/v0_192/_md-sys-shape.scss`, github.com/material-components/material-web
- Compose Material 3 `ToggleButton.kt` (last commit 2026-09-02) and `tokens/ButtonSmallTokens.kt`, github.com/androidx/androidx; https://composables.com/material3/togglebutton
- Apple HIG JSON: https://developer.apple.com/tutorials/data/design/human-interface-guidelines/segmented-controls.json, `toggles.json`, `focus-and-selection.json`
- WWDC25 219 "Meet Liquid Glass", https://developer.apple.com/videos/play/wwdc2025/219/; WWDC25 356 "Get to know the new design system", https://developer.apple.com/videos/play/wwdc2025/356/
- MacRumors, "Here's How Liquid Glass Is Changing in iOS 27", 2026-06-10, https://www.macrumors.com/2026/06/10/how-liquid-glass-is-changing-in-ios-27/
- MacRumors, iOS 26.1 Liquid Glass Clear/Tinted, 2025-11-04, https://www.macrumors.com/how-to/ios-26-1-reduce-liquid-glass-effects/

Design tools:
- Figma, https://help.figma.com/hc/en-us/articles/41414048690839-Adjust-an-animation-s-easing
- WWDC23 10158 "Animate with springs", https://developer.apple.com/videos/play/wwdc2023/10158/
- Framer, https://www.framer.com/updates/time-based-springs
- Rive, https://rive.app/docs/editor/animate-mode/interpolation-easing
- Chrome DevTools CSS reference (Easing Editor), https://developer.chrome.com/docs/devtools/css/reference (last updated 2024-03-12)
- After Effects, https://helpx.adobe.com/after-effects/using/keyframe-interpolation.html (403 to fetch) and https://schoolofmotion.com/blog/after-effects-keyframe-types
- Apple Motion, https://support.apple.com/guide/motion/curve-interpolation-methods-motn17692157/mac and https://support.apple.com/guide/motion/set-curve-interpolation-motn1474a665/mac

## 10 · Scratch artefacts

Under `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D4/p1/W/`: `page.html` + `run.mjs` (CSS support and computed corners, both engines), `radios.html` + `radios.mjs` (native radio arrows in a grid, both engines), `roles.py`/`roles2.py` (ARIA children-presentational parse over `aria12.html`, `aria13.html`), and the fetched sources `radio-cards.css`, `fluent-card.ts`, `tb.kt`, `sbg.tsx`, `lkd.ts`, `st.ts`, `bcd.json`, `hig-*.json`.
