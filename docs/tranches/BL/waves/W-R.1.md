# W-R.1: restraint, as glass-ui 12.0.0

Sources: the owner's restraint precept (`docs/precepts/restraint.md`, precepts cb5b0fa, with glass's amendments to `affordance-map.md` and `motion-canon.md` P2 in c2f64ed; INBOUND O-203); the cross-app restraint audit of 2026-11-09 (O-208, O-209, O-210; evidence in `~/.dev-logs/feedback-canon/PLAN.md` and its `*-verify` folders); O-218, O-220, O-221 and O-225; the Fable second looks of 2026-11-10 (`review/fable-2026-11-10/plans.md` items 3 to 6 and 9, `review/fable-2026-11-10/design-D5.md`, and the 11.1.0 note's items 1 and 8 in the `release-11.1.0` worktree, `docs/release-11.1.0/orchestrator-note-fable-review.md`). Its release is `waves/INDEX.md`'s.

This text replaces the list that stood here with its addendum. One rule decides what is in the wave: **a line is here only if it removes an export or a token, or changes a default every consumer sees.** A cure that breaks nothing ships sooner, in a patch or a minor, and is named in "Moved out" below. Every cure removes or plainens. None swaps one ornament for another, and identity stays: glass, paper, the palette, the typefaces, gold, the aurora and the blob (`restraint.md`, "How conflicts settle" 3 and 4).

It runs on its own branch, **cut from master after 11.2.0 merges**. Every gate is **RED on the last published 11.x** and GREEN on the branch.

## Moved out

- **G2, G7, G8, K2 and O-225's paint** are the patch 11.1.1 (`driver/glass-11.1.1-scope.md`). They remove nothing and change no default a consumer chose.
- **G11, per-component CSS entry points,** is W-G.7's subject, with its design already ruled there (`waves/W-G.7.md` §11: `./styles/<entry>` exports, no JS chunk imports CSS). W-G.7 is a wave of the 12.0.0 run, since its `./styles` change is a break. This wave carries no line for it.
- **O-215, the dock's forced layout at first mount,** is read on 11.1.0's close trace. At 16 ms or less the row closes there; above it, the row rides W-I.8 in 11.2.0 (`waves/W-I.8.md` OQ-7). It is not a 12.0.0 item.
- **The paint half of O-221 ships in 11.2.0.** The three enter start radii default to `0px` there: `--lq-enter-blur` (4 px today, `src/styles/glass/liquid-enter.css:48`), `--enter-overlay-blur` (6 px) and `--enter-menu-blur` (2 px) (`src/styles/tokens/motion-registers.css:73`, `:80`). The tokens, the keyframes' `filter` leg and every name stay, so nothing breaks and a host restores a ramp by setting the token back: `--enter-overlay-blur` and `--enter-menu-blur` on `:root`, and `--lq-enter-blur` on `.liquid-enter`, where the recipe declares it. That is one commit on `release/11.2.0` with a vitest witness over the built CSS (the three declarations read `0px`; RED on 11.1.0) and a CHANGELOG line among the defaults that change, the same shape as O-199's capsule in 11.1.0. The INBOUND row's advice to hosts ("set `--lq-enter-blur: 0px`") is withdrawn at that publish. 12.0.0 then deletes the leg (§2.2).

## 1 · Owed before any build seat: the budget design pass

Two of the precept's budgets cannot be built from their text. "One shadow layer per surface" is RED on every glass surface by construction, since the house rim is two inset layers beside the elevation (`src/styles/glass/rim.css:54`, `--glass-material-rim: var(--glass-rim-top), var(--glass-rim-bottom)`). "No blur inside a blur" does not say which layer keeps the blur or what the inner one becomes. This seat does not guess them. One Fable design pass runs before any build seat and writes four rulings into §2.5 of this file, each read on a capture in light and dark:

1. **The rim and the shadow count.** Is the rim the surface's edge, so that the budget counts outer shadow layers only, or does the rim drop to one leg? One or the other, shown as the same surface both ways.
2. **Nested blur.** The owner's O-222 words give the direction: a control beside or inside a plate is bare, "not with the dock bg". Confirm on paint that the outermost glass keeps the blur and anything inside it paints a flat fill with no `backdrop-filter` and no plate of its own, and say what that flat fill is for a control, a listbox row and an active dock seat.
3. **Elevations.** Which three names survive. Master defines `--shadow-sm`, `-md`, `-lg`, `-xl`, `-2xl`, `--shadow-soft`, `--shadow-elevated`, `--shadow-modal`, `--shadow-card`, `--shadow-dock`, `--shadow-dock-collapsed` and the five `--glass-shadow-*` rungs (`src/styles/tokens/shadow.css:15-35`, `src/styles/theme/bridges.css:325-329`), and 11.1.0's shadow table promises the set only "within a major". The pass also says whether the cartoon offset shadow (`--shadow-cartoon*`) is identity outside the count or one of the three.
4. **The blur value.** This one is the owner's (O-226 (c)): is the u/dp register (wash 4 px, quiet 6, resting 8, floating and overlay 0, saturate 1, control blur none) the library default, or atlas's preset over master's (10, 14, 16, 20, 22, saturate 1.5; `src/styles/tokens/glass.css:69-79`)? He answers on two captures of the same value.js popover and dock, one per register. The pass writes his answer as the one `backdrop-filter` value. If no answer has come when the pass runs, OQ-2 says what waits.

**Fixtures.** One scratch page, built once, each scene captured at 1440 and 390 in light and dark:
- frame 9's geometry: a card over gold ink on cream (`~/.dev-logs/owner-1110/shots/9.png`, the surah title card), at rest and mid-enter. It serves questions 1 and 4, G6 (§2.6) and the enter grammar (§2.2);
- frame 2's geometry: a control inside a glass capsule (`~/.dev-logs/owner-1110/shots/2.png`, a glass disc inside the dock's plate), for question 2, beside a Card holding a Select trigger and a ToggleGroup, and a popover holding a listbox;
- value.js's popover and dock, for question 4;
- one elevation strip: a Card, a popover, a Dialog and the dock on the same ground, for question 3.

The pass rules; it builds nothing in `src`. One capture seat builds the scratch page and shoots it under the guard, and the pass reads the captures. It ends with §2.5 rewritten as its rulings with their capture paths, and with no question left in it but the owner's. No build seat of this wave starts before that.

## 2 · Scope

### 2.1 · Deletions (O-203)

- **The specular gleam.** The exports `vSpecular`, `createSpecularWriter` and `useSpecularTracking` with their types `SpecularWriter` and `UseSpecularTracking` (`src/index.ts:477-494`, `src/composables/glass/index.ts:9-17`); the files `useSpecularTracking.ts`, `vSpecular.ts`, `src/styles/glass-specular-track.css` and `src/styles/tokens/property-regs-specular.css`; the `.glass-specular-track` class; every `--glass-specular-*` token; and the `::before` gleam of the material group (`src/styles/glass/material.css`). "Remove, do not tune." (C-2)
- **The press indent.** `--scale-press`, `--scale-press-sm` and `--scale-press-dock` (`src/styles/tokens/scale-paper.css:10-26`); `tap-squish` and the press leg of `interactive-item` (`src/styles/utilities/base.css:255-333`); and `useLiquidPress`, public on `./motion` (`src/composables/motion/index.ts:26`), with the private `useSpringPress` under it. Its four callers use it for the squish, a shrink or the gleam's press drive and nothing else (`Button.vue:113`, `DockControl.vue:137`, `DarkModeToggle.vue:23`, `Timeline.vue:230`). `useLiquidFlex` stays for the drag morph and the pager worm. OQ-5 covers what the build finds left over.
- **The hover lift's scale,** by `affordance-map.md`'s amendment ("HOVER-LIFT keeps only the tier shift and the coupled colour leg"): `--scale-hover` (1.08, `src/styles/tokens/scale-paper.css:9`) and the capsule's hover lift. D5 retired the same thing on its own evidence (CK-11). OQ-6 puts it to the owner, since no row of his names hover.
- **`affordance-map.md`'s G and P columns,** rewritten in the precepts repo and the submodule bumped in the commit that deletes the code.
- **The dock plate's grain.** `.dock-plate::after`, its dark blend and its stand-down under a grasp carrier (`src/components/dock/styles/dock.css:155-178` on master; three radial gradients on 11.1.0). It sits at or below one 8-bit step at its default strength (the 11.1.0 note, item 8). The dock is the only live reader of `--glass-grain-opacity`: `paper.css:113` and `:158` name it as a fallback behind `--paper-grain-opacity`, which `:root` always defines (`src/styles/tokens/glass-fx.css:17`). So the token goes too, with that dead fallback, its two writes in `src/styles/glass/a11y-fallback.css`, and `--glass-grain-engage-duration`, which has no reader. The paper grain is identity and is untouched.
- **`--focus-ring-shadow`.** After 11.1.1 no rule reads it. 12.0.0 deletes the token (`src/styles/tokens/scale-paper.css:40`), its two aliases `--dock-ring` (`src/styles/tokens/sizing.css:256`) and `--shadow-focus-ring` with the `shadow-focus-ring` utility (`src/styles/theme/bridges.css:343`), and its manifest entry. `--focus-ring-width` and `--focus-ring-color` stay; the outline recipe and the dock's ring read them.

### 2.2 · Enter and exit (O-221)

The owner's words on frame 9: "a bit too blurred and a bit too AI--more deft, apple-like--communicate with glass-ui in generality for this." The row names one token. The same ramp enters through three recipes, with a squish and an overshoot beside it:

| recipe | today | source |
|---|---|---|
| the mount recipe, `.liquid-enter` | fade, a 0.5 rem rise, a squish from 1.06 × 0.945, a 4 px blur ramp, on `--spring-present` | `src/styles/glass/liquid-enter.css:46-102` |
| the overlay reveal, `.glass-reveal` (Dialog, Sheet, Popover, Toast) | fade, scale from 0.94 times the same squish, a slide, a 6 px ramp, on `--spring-panel` (damping 0.71, the one row whose overshoot is intrinsic) | `src/styles/glass/reveal.css:57-74`, `:150-180`; `src/styles/tokens/motion-registers.css:68-74`; `src/composables/motion/spring/springPresets.ts:92-101` |
| menus | the same reveal at 0.96 with a 2 px ramp, on `--spring-present` | `motion-registers.css:76-81` |
| the native top-layer enter and the reveal's exit | the same ramp, forward and reversed | `src/styles/tokens/scroll-tokens.css:65`; `src/styles/animations.css:173-176`, `:233`, `:263`; `reveal.css:186-199` |

**One grammar for every surface that enters or leaves.**
- Opacity plus one motion. A surface with an anchor scales from it; a surface without one rises. Never both, and never a squish (`restraint.md`, Motion: "one primary motion per interaction, plus its coupled fade").
- The curve is `--spring-present` on its own clock (damping 1.0, `springPresets.ts:73-75`), for overlays as for menus. No enter names a row whose damping is below 1. The exit keeps `--reveal-exit-curve` on the exit clock, which already has no overshoot.
- Under reduced motion, a plain fade.
- The start values (scale 0.94, 0.96 and 0.97; the 0.5 rem rise) stay as shipped unless the fixture reads otherwise (OQ-7).

**Deleted.**
- The `filter` leg of every enter and exit keyframe and transition list.
- `--lq-enter-blur`, `--glass-reveal-blur`, `--enter-overlay-blur`, `--enter-menu-blur`, `--enter-tooltip-blur` and `--top-layer-enter-blur`.
- `--lq-stretch-x` and `--lq-stretch-y` as enter channels, with the squish stops that read them. The Switch thumb and `control-bit.css` cite them in comments only; the build re-reads that at the cut.
- The second motion of the overlay reveal (`--enter-overlay-slide`, `--enter-menu-slide`) where the surface already scales.
- `.is-cel`, `gl-cel-slam` and the `.is-cel > .cartoon-cast` rules. `git grep -n "is-cel" -- src demo` finds the definitions and one comment and no user.

**Stale and corrected here.** The earlier text of this wave and `motion-canon.md` P2 name `transitions.css` and `--spring-bouncy` as the overshoot's home. On master `transitions.css` already rides `--spring-present` (`:50`, `:70`). The live overshoot is the overlay register's `--spring-panel`. The orchestrator amends P2's sentence with the deletion commit.

**Witness.** The section is read on frame 9's geometry (§1's fixture), at rest as well as mid-enter. In the owner's frame the card's own text is sharp and everything behind it is a grey smear, so what reads "too blurred" there is also the plate's backdrop and tint, which no enter ramp changes. G6 (§2.6) and the blur ruling (§1, question 4) are read on the same frame.

### 2.3 · Engagement: what D5 lands

D5 is closed as a design loop (`design/engagement/LANDING.md`). Its sound half lands here, built on the 12.0.0 branch from the parts below. It is not rebased from `design/engagement/pass-15/P-E15.patch`: that patch is built on `eb845639f`, 76 `src` commits behind master, and does not apply (`pass-15/P-E15.md:436`). The patch is the reference for what each part is. This wave takes W-J.2's subject; `waves/INDEX.md` says so.

**Built.**
- **The declaration table.** Every directory under `src/components/` declares one of nine classes: pressed, chosen, held, dragged, disclosed, presented, field, ambient, static. The class is stamped on the root and read at runtime. `static` answers "a component nobody presses" and carries its reason. (55 directories at the patch's base; the count is the tree's at the cut.)
- **One writer per attribute.** `data-engaged`, `data-held` and `data-press` each have one writer, under `src/composables/motion/engage/`. Today components write them in place (`GlassDock.vue:386` and `:420` write `data-held`; `PagerDots.vue:361` writes `data-press`). No commit attribute is built: it existed to key the pop, and nothing reads it once the pop is gone.
- **The press mark, as tone.** A press writes `data-press`, and the recipe deepens the hover wash on it. That is the whole press: "A press confirms with its state change and its tone" (`affordance-map.md`, the restraint ruling). No scale, no gleam.
- **The held grow, on the block axis.** A held Slider or NumberField grows to ×1.06 on `springPreset("dock")` (damping 0.88, `springPresets.ts:84-86`), at every pointer, on the block axis only. No reach, no gutter read, no `--stage-reach`. Reduced motion cuts it.
- **The loupe** stays, hung from its track by CSS anchor positioning (`pass-15/S15-challenge.md:38` measured the anchored box at 0.00 px in both engines under an ancestor's scale and translate and the host's own grow).
- **The release rule.** The velocity owners (Slider, SortableList, Sheet detents, the tabs drag) take one rule: the measured release velocity seeds a named preset row. After release the control settles and then nothing runs: 0 frames a second, as cand15 measured in both engines (Q-14's ruling). A released body lands without passing its rest (OQ-4).
- **The mount.** A control mounted already committed plays nothing, and a model set in the mount's own task commits nothing.
- **Reduced motion.** Every spatial leg retires and the tone stays. A commit is an instant state change.
- **A held control moves with the page.** When layout moves under it, it moves with its neighbours, like any element. This is the default of the one owner question (OQ-1).

**A commit is the state's own change.** The Switch's thumb travels, the Checkbox's mark draws, the tab's indicator moves, the Chip's fill changes. Nothing else moves, on any path, and nothing passes its rest. E-2 is re-cut once to say so: a commit passes when the state's own change is painted within the acknowledge window, the face's scale stays within 0.002 of rest for the whole film, a travelling body lands without passing its rest, and on the keyboard path nothing but the state's own change moves. The plants flip: `e2-glide` (a body that lands without overshoot) becomes a pass control, and a planted pop must fail. Arm (iii), the commit light, does not come back in arm (ii)'s place.

**Not built, and why** (so no later seat revives them).
- The commit pop, with `--rung-commit`, `--rung-crest` and `--scale-commit-pop`: overshoot and an indent on every control (`restraint.md`, Motion; O-203 is later than O-103d (1)).
- The Button's squish through the engagement door, and the gleam re-keyed to `data-press`: both are §2.1's deletions. O-118 (3) is struck from the rulings in force; O-203 stands in its place.
- The stage's glide: the per-frame read, the frame loop, the carrier maps, the probes, the reach's script reads, the thirteen private registered properties, witnesses E-14 and E-15, the stale-place cells of E-10 and their 25 plants. It cured a defect of the promoted control, which O-103f retired at pass 9, and no owner row asks for it (`design-D5.md` item 1).
- The inline half of the held grow, with its gutter read.
- The raise of the eager-JS ceiling from 492 to 500 KiB. This wave's ceiling is master's at the cut.

CK-20 (no one-frame discontinuity) is re-cut to the transitions the library itself plays: the hand-off, Escape, and the sortable and tabs releases.

### 2.4 · Weight (O-218, O-220; folds K9, G15 and G4's bold)

**Size carries hierarchy. No library default sets a weight above regular on a title, a label, an option, a unit or a selected state** (`restraint.md`, Text and markup; C-9, C-52). The sites, each once:

| site | today | source |
|---|---|---|
| `--type-weight-display` (through `--font-display-weight`) | 600 | `src/styles/typography/scale.css:165-166` |
| Metric: `.metric__label` | 550, caps, wide tracking | `src/components/metric/styles.css:48-50` |
| Metric: `.metric__value` | 650 | `metric/styles.css:71` |
| `.text-subheading` | 600 | `src/styles/typography/semantic.css:163-168` |
| the ConfiguratorLayer trigger label (`.configurator-section-label`) | 600 (`--configurator-section-weight`) | `src/styles/tokens/sizing-config.css:41`, `src/components/configurator/styles.css:89` |
| SubPaneHeader and the easing catalogue's family headings (K9, as keyframes reported them) | not found | neither name greps in `src` on master; the build reads at the cut whether they are glass's or keyframes' own, and strikes the row if they are not glass's |
| the selected ToggleGroup item | 600 on `[data-state="on"]` | `src/components/toggle-group/styles.css:120` |
| the primary Button | 600 on `[data-emphasis="primary"]` | `src/components/button/styles.css:136` |

Each goes to regular. Metric's label is also set in sentence case with no wide tracking, and its value keeps tabular figures. A consumer who wants the old display weight sets `--font-display-weight`. Two neighbours of the rule are not ruled here: `--type-weight-heading` and `--type-weight-title` at 700 (OQ-8), and the 500 that Button and ToggleGroup set at rest (OQ-9).

**StatusDot, a separate line (O-220 (2)).** Its online and warning hues compete with the page's focal ink. The default becomes a quiet tone; the full hue stays reachable. The tone's value is read on a capture beside focal ink in both themes before it is built (OQ-10).

### 2.5 · Budgets

The five budgets are the precept's shading and layout checks. Four of them wait on §1, and this section is rewritten by that pass.

- **Shadows:** one layer per surface, at most three elevations, no coloured or glow shadow, no `text-shadow`. Counting rule and names: §1, questions 1 and 3. The blob's files are outside the coloured-shadow check until 13.0.0: master's eleven `--blob-shadow-*` declarations (`src/styles/tokens/shadow.css:106-145`) are tinted, and the blob run deletes them for one neutral stamp (`W-G.5.md`, G5-G8a).
- **Blur:** one `backdrop-filter` value library-wide, and no blur inside a blur. Value and the inner layer's paint: §1, questions 2 and 4. The cost on record: value measured fourier `/equation` under software compositing at a frame p50 of 58 ms as shipped and 8 ms with `backdrop-filter: none`, with 28 blur layers, 25 of them nested.
- **Radius:** at most three radius tokens per view. What a view is for a library is OQ-13.
- **Gradient:** no gradient fill outside data and identity. The check reads fills (`background`, `background-image`, `border-image`), not masks, and passes a gradient whose stops are one colour. The allowed list is OQ-3. The audit named the Configurator stage's and aside's radial gradients and ToggleGroup's chip tint; on master the component files hold neither (`git grep -c radial-gradient -- src` puts them in `src/styles/glass/overlay-plate.css`, `material.css` and `glass-chip.css`), so the build's first read is the check's own list at the cut.

### 2.6 · Component defaults (O-208, O-209)

- **G4, ToggleGroup:** the stacked chip tint is deleted, and off-state text reaches 4.5:1 without it (C-45). Its bold is §2.4's.
- **G5, DockControl:** hover and active fills read as distinct states (C-39). `shape="tab"` seats share their row's height (38 px against 44 px today; C-46). The cut reads what W-I.8 left of the seats in 11.2.0 first; what it already cured is struck.
- **G6, material:** listbox and menu surfaces read as surfaces, not smudges at alpha .18 to .22 (C-59). The popover panel is warm on cream, not taupe-grey, and the CommandDialog scrim does not grey a cream page (C-5). Read on frame 9's fixture, with the blur ruling.
- **G9, the easing selector:** one tab register, not a third style (C-42). Bezier mode draws no step staircase (C-100). Presets show curve previews (C-78).
- **K1, EasingPicker:** each mode draws only its own curve, and a prop hides the picker's own preset list for a host whose gallery is the selector.
- **G12, field skins:** one field skin library-wide. NumberField's filled skin and Select's transparent skin become one (C-5, C-18).

### 2.7 · One height engine for Collapsible and Accordion

11.1.0 ships reka's content with a CSS-only change, and a reversal mid-flight still restarts (the 11.1.0 note, item 1). 12.0.0 builds one engine for both. The candidate is the grid-row region of `8d3dc8d2d` on `release/11.1.0`. Its breaks are declared: the region gains a wrapper, so a consumer's `>` rule no longer reaches the slot's children, and the `--reka-*-content-height` variables are no longer written. The engine is read against `motion-canon.md` P5 before it is adopted (OQ-11).

## 3 · Gates

Each gate is RED on the last published 11.x and GREEN on the branch, and each is shown to bite by a planted violation. A budget or a deletion is one static check, run in node over the built CSS or the source, or a vitest case. A browser cell exists only where paint is the claim, and a WebKit cell only where the two engines can differ. No gate here runs "every item, both engines, two widths, two themes".

**Static, in node or vitest.**
- **Deletions.** `git grep` over `src` returns nothing for each deleted name of §2.1 and §2.2 (the specular exports and tokens, `scale-press`, `tap-squish`, `useLiquidPress`, `focus-ring-shadow`, `--dock-ring:`, `shadow-focus-ring`, `glass-grain`, the six enter-blur tokens, `is-cel`). The export roster loses exactly the names the MIGRATION table lists and no other.
- **No filter in motion.** Over the built CSS: no `filter` declaration inside any `@keyframes` block, and no `filter` in any `transition` list, outside the blob's files. Plant: one restored ramp stop.
- **No overshoot on an enter.** Vitest over the token table: every `--enter-*-spring` resolves to a preset row whose `dampingFraction` is at least 1, or to an ease with no stop above 1. Plant: `--spring-panel` restored on the overlay row.
- **No press scale.** Over the built CSS: no `scale` or `transform: scale` below 1 on `:active`, `[data-press]` or `[data-held]`.
- **Weight.** Over the built CSS: no `font-weight` above 400 on the sites of §2.4, and `--font-display-weight` computes 400.
- **Budgets.** One check per budget over the built CSS, as §2.5 states them after §1. Each has its plant: a second outer shadow layer, a second blur value, a `backdrop-filter` on a rule nested under a glass surface by the ruling's own selector list, a fourth elevation name, a `text-shadow`, a gradient fill outside the list.
- **One writer** (E-7's three rows) and **one clock, no rung literal** (E-8), from `design/engagement/harness/`.
- **The declaration** (E-1's static half): every component directory has a class, and `static` has a reason.
- **Height engine contract:** vitest, open and closed states, the wrapper, no `--reka-*-content-height` write.

**Chromium only.**
- **Engagement battery, one read:** E-1's runtime half, the re-cut E-2 with its mount and arrival cells, E-3's block read, E-9, E-12, and E-4 with the landing clause of OQ-4.
- **Enter and exit, geometry:** on frame 9's fixture, filmed every frame, the entering card's painted box never exceeds its rest box on either axis. Today the squish starts it 6 % wide and the overlay row carries it past rest. The mid-enter and rest captures of the same fixture are for the owner's look and are not a gate; sharpness is held by the static filter check.
- **Contrast:** G4's off-state text at 4.5:1. G5's hover against active, and G6's listbox and menu surfaces against their ground, at the thresholds of OQ-14.
- **Radius:** the count of OQ-13, per view.
- **Height engine, motion:** a reversal mid-flight continues from the painted height: the first frame after the reversal is within 2 px of the last frame before it (the bound the 11.1.0 note set for the first open frame). On 11.x the reversal restarts.

**WebKit as well, once each.**
- **E-5,** the held touch (its press-only property differs by engine).
- **The loupe's anchor** (E-13's placement cell): anchor positioning is the engine-specific part.
- **Nested blur, paint:** on frame 2's fixture over a striped ground, the outer plate still blurs the stripes and the control inside it paints its flat fill. A `backdrop-filter` under a clip or a blend is where the two engines have differed (`src/components/dock/styles/dock.css:140-153`).
- **Height engine, motion:** grid-row interpolation.

The CHANGELOG's 12.0.0 entry lists every deleted export and token and every changed default with its plain migration, in consumer prose.

## 4 · Order

1. **The budget design pass** (§1), with the owner's blur answer if it has come (OQ-2). The capture seat of that step also takes the captures the open questions need: frame B and the block-only grow for OQ-1, from cand15 with one plant each (`design/engagement/LANDING.md` names the scene and the output paths), and the Weight and StatusDot captures (OQ-8, OQ-10) on the scratch page.
2. **The cut,** from master after 11.2.0 merges. Each gate's RED is read on the last published 11.x and recorded.
3. **Deletions first** (§2.1, §2.2), one commit per bullet with its MIGRATION row, so the engagement build lands on a tree with no gleam and no press scale to route around.
4. **Engagement** (§2.3), then weight, the component defaults, the budgets and the height engine.
5. **One battery read, one challenge and one fold.** A critic gates on §3 and adds no row; what it finds outside the list goes to INBOUND.

W-G.7 runs in the same 12.0.0 run and is independent of this wave's commits. W-J.1 is 12.0.0 by `waves/INDEX.md`.

## 5 · Open questions

Each has a default, and the build follows the default unless the answer comes first.

- **OQ-1 (owner).** "When the page moves under a held control, should the control glide to its new place, or move with the page?" The two frames are in `design/engagement/LANDING.md`, with one more pair beside them: the grow on the block axis against the capped inline grow. Default: it moves with the page, and the grow is block-only. If he rules the glide stays, the three rules whose plants are not red (the flat-tree walk, route (iv), the exit clock) are struck before anything is built, and the glide is specified as its own wave, not inside this one.
- **OQ-2 (owner; O-226 (c)).** Is the u/dp blur register the library default, or atlas's preset? No default value is built on a guess. If he has not answered when §1 runs, the pass rules questions 1 to 3 and the build proceeds on them; master's rungs stay as they are, the "one value" check is recorded as waiting on him, and it does not hold the tag. atlas carries its register as overrides either way.
- **OQ-3 (owner, by capture).** The gradient list. The precept names a colour space, a gradient editor, the aurora, the watercolour dot and the blob. Default: those, plus the paper grid and grain and the gold recipes, which the precept names as identity elsewhere. Every other fill the check lists at the cut is deleted, or shown to him.
- **OQ-4 (measurement).** Does a released fling pass its rest on the Slider and the tabs with motion on? E-4 reads it only under reduced motion (`design-D5.md` item 5 (c)). Default: the gate is "lands without passing its rest", and a release row that fails it is replaced by one whose damping is at least 1.
- **OQ-5 (measurement, at the cut).** What the press deletion leaves. Default: the `press` preset row and `--spring-press` go if no reader remains; Timeline's `useLiquidFlex` call (`Timeline.vue:84`) goes if it squishes a control under a press and stays if it follows a drag. The wave record states each.
- **OQ-6 (owner).** Does the hover lift's scale go with the press? Default: yes, by `affordance-map.md`'s amendment and D5's CK-11. Hover keeps its tier shift and colour.
- **OQ-7 (measurement).** The enter's start values on frame 9's fixture. Default: as shipped. If a Dialog or Sheet on `--spring-present`'s 0.2 s clock reads abrupt, the cure is a longer clock on a curve with no overshoot, never the overshoot back.
- **OQ-8 (owner, by capture).** Do `--type-weight-heading` and `--type-weight-title` (700, `scale.css:167-168`) follow display to regular? The rule's letter names titles, and no row has weighed these two. Default: yes, shown to him on the §1 page before the build.
- **OQ-9 (measurement).** Is the 500 that Button and ToggleGroup set at rest "above regular" under the rule? Default: it stays; the rows weigh 600 and above.
- **OQ-10 (measurement).** StatusDot's quiet tone. Default: the state's hue mixed toward the foreground until it reads at or under the focal ink's chroma on the capture; the build proposes the mix and the capture decides.
- **OQ-11 (measurement).** The height engine. Default: the grid-row region, adopted if one trace cell (a 20-row Accordion at 4× CPU) holds its frames; if it does not, reka's content stays and the reversal is recorded as a bound.
- **OQ-12 (orchestrator).** W-G.7's edges. PLAN §5 has it wait on W-G.1, W-A.5 and W-G.6, none of which has run, and the blob's major may not be 12.0.0. Default: W-G.7's CSS half (§11 of its spec) is re-cut against master as W-G.1 is, with its fixtures inside the wave, and runs in 12.0.0 without the blob; its aurora derive subpath follows W-G.1 wherever that lands.
- **OQ-13 (measurement).** What a "view" is for the radius budget. The precept counts per page of an app; a library has stories. Default: each demo story at 1440, counting distinct radius tokens in computed style. The first read lists the stories over three. If that is most of them, the count says little about the library, and the budget is put to the owner restated as the number of radius tokens the library defines.
- **OQ-14 (measurement).** The thresholds for G5 and G6. No record states them. Default: the build seat proposes each on the §1 captures (G5: active differs from hover by at least as much as hover differs from rest; G6: the surface is told from its ground at a glance in both themes, with the alpha it took recorded), and the challenge seat accepts or rejects them before they become gates.

## 6 · Consumer half

Every consumer reads one MIGRATION table: each deleted export and token, each changed default, and the one line that restores a default where one exists (`--font-display-weight`, the StatusDot hue). A press, a gleam and an enter blur have no restore; they are gone.

- **value, keyframes, fourier, daraksha** delete their local restraint overrides at the repin (the audit's `*-apply` folders list them). daraksha's `--lq-enter-blur: 0px` line goes at 11.2.0.
- **atlas** is told at booking and at publish, per "Inform atlas always": the blur ruling, the weight defaults, the press and hover deletions, and that `useLiquidPress` is gone.
- **gregg, parkway, slides, gaggle** get the table with the publish notice.

## 7 · Records the orchestrator amends

This seat wrote this file, `driver/glass-11.1.1-scope.md`, `waves/INDEX.md`, `design/engagement/LANDING.md`, one paragraph in `waves/W-I.8.md` §8 and the release fields of `W-G.1.md`, `W-G.5.md` and `W-G.5b.md`. Left for the orchestrator: INBOUND's placed cells for O-208 (G2, G7, G8 to 11.1.1; G11 to W-G.7), O-209 (K2 to 11.1.1), O-215 (the 11.1.0 close or W-I.8), O-221 (11.2.0 for the defaults, 12.0.0 for the deletion) and O-225 (11.1.1 for the paint, 12.0.0 for the token); PLAN §2's "ships in" column and the same field in the other wave headers, which now repeat a superseded release; `motion-canon.md` P2's `transitions.css` sentence; and W-J.2's header, which still calls D5 a loop to open. The records seat made these on 2026-11-11, except P2's sentence, which is in the precepts repository and is owed with the deletion commit (`review/fable-2026-11-10/owed-outside-BL.md`).
