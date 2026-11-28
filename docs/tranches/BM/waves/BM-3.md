# BM-3: springs on curves Safari's compositor takes

| field | value |
|---|---|
| release | BM's parts minor |
| status | planned. Step 1 (the tokens) and step 3 (the reduced-motion rule) depend on nothing of another repo's; step 2 (the settle player) lands when keyframes.js's sampler does |
| rests on | choice 4 B (Q6), ratified under IN O-426; `motion-canon.md` P5, P6 and P7 as BM-0 amended them; O-350's ruling on reduced motion (P6) |
| DESIGN | §4.1, §4.2; with §10.6 |
| starts from | `SPRING_PRESETS` and `scripts/regen-spring-tokens.mjs`; the fits in `study/pass-2/delivery/curves.json` (`tokenReplacement`) and D§4.2's refitted panel; the player sketches `study/pass-2/delivery/sketch/playSpring.ts` and `study/pass-6/fold/sketch/playSpring.ts` |
| page | R2 (Four Ways to Settle) and P2-scroll (Scroll Under Load), optional readings |
| gates | G-1, G-2, G-5 (both modes) |
| depends on | 11.1.2's generator cure (IN O-430 item 6: every spring easing's sampled duration runs until it settles within 0.1 %); keyframes.js's sampler export (OPEN §2) for step 2 |

## What it builds

**Step 1, the tokens (rule 1).** `regen-spring-tokens.mjs` writes each `--spring-*` token as the closest single `cubic-bezier()` that leaves rest at no speed and, on every row but panel, never passes its target. A `linear()` reaches WebKit's compositor only from Safari 27.3 ([27.3] 190761783), and Home Assistant's WKWebView on iOS 26 never has it (D§4.1), so a state change that must glide while the page is busy rides a curve every supported Safari takes. Read from WebKit's source and release notes; no iPhone has timed it.

| Row | Curve | Against today's `linear()` |
|---|---|---|
| press | `cubic-bezier(0.244, 0, 0.251, 0.672)` | 1.48 % |
| present | `cubic-bezier(0.197, 0, 0.124, 0.808)` | 1.96 % |
| dock | `cubic-bezier(0.232, 0, 0.18, 0.703)` | 1.89 % |
| bloom | `cubic-bezier(0.183, 0, 0.237, 1)` | 0.95 % |
| world | `cubic-bezier(0.176, 0, 0.066, 1)` | 2.44 % |
| panel | `cubic-bezier(0.215, 0, 0.059, 1.288)`, keeping its own 4.21 % overshoot | 3.67 % |

The generator computes them. The percentages are each fit's distance from today's `linear()` (`pass-2/delivery/curves.json`, `err_vs_token_pct`; `pass-3/fold/panel-fit.json:23`), not from the closed form, so they bound nothing here: G-1 reads the built sheet structurally (BM.md §4), and each fit's distance from its row's closed form is computed at the wave and recorded in FINAL as a reading. Each row's `-duration` stays the spring's own clock (P4). The generator, not a hand edit, writes the tokens, as 11.1.2's cure does.

**Every entrance leaves the row that passes its target.** Panel keeps its overshoot for the spatial morphs the owner ruled, and today it also eases every overlay's entrance, the route zoom, the chart bars and the staff's notes, which P2 bars ("mount, popover open, dialog in … no overshoot"). In the same commit:

- `--enter-overlay-spring` and `--enter-overlay-clock` (`src/styles/tokens/motion-registers.css:69-70` on master and `release/11.1.1`), read by `styles/glass/reveal.css` (master `:49-50`, `:99-100`; `R111` `:52-53`, `:106-107`) for Dialog, Sheet, Popover and Toast, and by `styles/animations.css` (master `:323-326`, `R111` `:312-315`), move to `bloom` (r 0.42, ζ 0.9; 370 ms), which does not pass its target.
- The exit follows its entrance. `--exit-overlay-duration` (`:147`) is "derived from the row it enters on" (`R111` `:143-147`), so it moves to `--spring-bloom-exit-duration`, 222 ms (six tenths of bloom's 370, P0a rule 2), where it read panel's 250 ms; the comment stays true. The curve stays 11.1.1's `--exit-curve` (`:152`).
- `--route-zoom-spring` and `--route-zoom-clock` (`:97-98`, read by `styles/view-transition.css:170-171`) move to `bloom`, and `--route-collapse-clock` (`:104`) to bloom's exit clock.
- The chart bars (`styles/glass/viz-enter.css:45`, with its stagger cap at `:33`) and the staff's notes (`components/music-staff/styles.css:231`, `:288`) move to `bloom`, curve and clock.

After it, no part of glass rides `--spring-panel`'s curve. One clock reader stays: the deck's flat turn on a phone (`components/deck/styles/turn.css:174`, `--turn-dur`), a page's travel that reads panel's settle and none of its curve. The token stays public, for a site's own spatial morph. Six sites read it today, five of them for an entrance or a reader element (atlas's rule seam drawing in, `src/editorial/AnimatedRule.vue:185`; daraksha's reader tray, `src/scripture/PhraseTray.vue:264-270`, with `src/scripture/correspond.ts:97`; value.js's plates landing, `demo/app/composables/boot/overture.css:14-18`, `:97`, `:129`; fourier's configurator columns and gap, `web/src/components/visualization/VisualizationView.vue:1325-1326`, and its sidebar, `:1351-1352`; keyframes' lane drop, `demo/scenes/sequence/SequenceTarget.css:192`); each note names its lines, says the token keeps its overshoot, and offers `--spring-bloom` for an entrance. Home Assistant defines its own `--spring-panel` from its own tokens (`frontend/src/styles/motion/tokens.css:27`), so glass's curve does not reach it.

**Step 2, the settle player (rule 2).** A body that carries a speed (a release, a settle, a mark retargeted mid-glide) plays keyframes keyframes.js samples from the row's closed form, from the body's own position and speed, by `element.animate()`. A retarget samples again from where the body is. A `translate` ends within half a pixel of its rest. A control's keyframes are clamped at the rest, so no frame passes it (P0a: "overshoot: none on a control"). glass writes no sampler of its own (P7: keyframes.js computes, the browser plays). Where a site is at its cap (daraksha's reader route), the player loads on the first `pointerdown` on any part that plays it, so it is in place before that gesture can release or retarget. Until step 2 lands, nothing that carries a speed ships on a transition in its place (rule 6): BM-4 and BM-11's settle wait for it.

**Rules 3 to 5** need no new code here: a follow writes `translate` per pointer event (BM-5's drag), a state set by scrolling plays as rule 1 (BM-9's scroll-chrome), and a scroll function rides a scroll timeline where its value is the page's scroll fraction. No BM part has one today: BM-7's rim draws a value its site computes.

**`--ease-cartoon-punch`** (`src/styles/tokens/scheme-motion.css:163`), a `linear()` that passes its target by 22 %. Its comment calls it compositor-safe in both engines, which before Safari 27.3 it is not; the comment is corrected. Its readers, every one on a control or an entrance, move to `present`, by `restraint.md`'s check ("no overshoot on a control") and P2: the `transition-disclosure` utility (`styles/utilities/btn.css`, master `:82-84`, `R111` `:86-88`), which turns every disclosure caret, the Accordion's, the Select's and the Configurator's (atlas's Selects among them; Home Assistant's floors are glass's Collapsible with a chevron of their own that already turns on `--spring-present`, `frontend/src/tiles/css/automatic.css:82-86`, so the move does not reach them); the chip's scale (`styles/glass/glass-chip.css:30`); the atom's translate and scale (`glass-atom.css:50-51`); and the liquid entrance (`styles/glass/liquid-enter.css:121`, `:176`). The slider's transform (`components/slider/styles.css:317`) leaves with BM-5's sheet. The comments that name the token at `SelectTrigger.vue:70-74`, `ConfiguratorLayer.vue:161-166` and `btn.css:70-81` follow the move. After it glass reads the token nowhere, so BM-9 removes it in 12.0.0, and the two sites that read it are told: value.js (`demo/palettes/inspector/PaletteInspector.vue:531`) and keyframes (`demo/scenes/spring/SpringPhysicsFacet.vue:531`). This closes OPEN O-1 on the law, and FINAL tells the owner, who may reverse it.

**The canvases' first appearance.** A canvas that opts in (FourierField, `useFourierField.ts:192`; the Blob by default, `blob/composables/useMetaballRenderer.ts:167`) enters by `@keyframes substrate-reveal-bloom` (`styles/viz-reveal.css:42-63`): an opacity fade over 1,100 ms with `filter: brightness(1.08) saturate(1.05)` at its peak, on `--ease-out`. It never read `--ease-cartoon-punch`; the comments that say it does (`composables/glass/webgl/visibility.ts:241-247`, `webgpu/useGpuSubstrate.ts:75-80`, `webgl/createCanvasLifecycle.ts:123`) are corrected. Its filter is motion animating `filter` (P5: "motion leaves both alone"; `restraint.md`, "Transform and opacity only"), and its peak lifts the field past its own light. It becomes the fade alone, on the compositor; the lift leaves. value.js asked for the palette-honest lift (the file's own note, T-60), and its note says so.

**Step 3, P6's reduced-motion rule.** Under Reduce Motion, opacity and colour transitions keep a clock of 150 ms or less, and transform, translate, scale, size and filter transitions and every non-ambient animation stop at their end state (O-350's ruling, placed for 11.1.1, of which 11.1.1 built only the consumer-override clause: `R111` `a11y-overrides.css:6-30` runs every transition on a zero clock, and `view-transition.css:28-34` sets `animation: none !important` on every view-transition pseudo). No 11.1.2 row holds the rest (S112 counts O-350 among the rows 11.1.1 built), so BM builds it here unless BL builds it in 11.1.2 first (BM.md §8). The rule mints no `transition-property` and carries no `!important` a site cannot override: it acts on the clocks glass's own legs read, the spatial rows' durations to zero and the effect clocks held at 150 ms or less, settled at the wave against every leg the G-2 run finds. The view-transition sheet's reduced block follows the same rule. After it, a reduced carve stays only where the rule cannot reach (a fill's length, a dip, the theme's crossfade), and each wave's carve that the rule now covers is removed in the same commit.

**Nothing writes a custom property each frame** to drive motion, and one node never carries a held animation and a transition on the same property.

## Inputs folded

- **The spring's end step** (IN O-430 item 6). 11.1.2 fixes the generator so no easing's last step exceeds 0.1 %. Step 1 replaces the tokens after it, from the same generator.
- **keyframes.js today** (read on keyframes.js `origin/master` at `2a11fb1f`, 6.5.0). The pieces are there: `SpringProgress` is public (`src/animation/index.ts:37`) and steps a spring from any position and speed; `springLinearStops` and `springTimingLUT` (`:52`, `:57`) take an `initialVelocity`, on the normalized spring, as even samples or a `linear()`; `sampleNormalizedSpring` (`src/animation/physics/spring/solver/sample.ts:75`) is their shared seeded step loop; and `Draggable` (`src/animation/orchestration/drag/draggable.ts:127`) re-seats its spring from the release speed. What no export gives is keyframes from a start position, target and speed to a tolerance, with the spring's state at any time. The ask in keyframes' message is that one function, and a follow in `Draggable` that starts the spring at release. Rule 2 needs keyframes and not a `linear()` easing, which Safari's compositor takes only from 27.3.

## Bytes

CSS: −1,637 B of `linear()` tokens and +150 B of curves at every site, net −1,487 B. JS: +655 B for the player, on intent (`study/pass-10/ledger/ledger.json`). The reduced-motion rule and the canvas fade are priced at the wave. Indicative until G-4.

## Proof

- G-1 on the built token sheet and the G-2 run (BM.md §4): no `linear()`; each curve leaves rest at zero slope; a curve passes 1 only where its row's damping is below one and by no more than that row's closed-form overshoot; no `--enter-*`, `--route-*` or running timing function outside P5's two parts passes 1. Each fit's distance from its closed form is recorded as a reading.
- The strip: each row's curve drawn beside its closed form and today's list.
- The player, in headless Chromium and Playwright WebKit: a release from speed lands within 0.5 px; a retarget mid-glide keeps its speed across the turn (no step in velocity between the two sampled runs); a control's settle never passes its rest; under Reduce Motion the dip or the crossfade (D§5.3), each an `!important` carve.
- The first gesture on a cold page: its first fling settles with its speed, the player having loaded on its `pointerdown` (a cell, so a late chunk fails here and never degrades silently).
- Every overlay, the route zoom, the chart bars and the staff's notes enter on `bloom` with no frame past their rest, and leave on bloom's exit clock and 11.1.1's exit curve. Each overlay entrance (Dialog, Sheet, Popover, Toast) is read at 200 ms, with its share of the travel and of the fade recorded (`motion-canon.md` P0a: a surface that appears, 100 to 200 ms; IN O-410: read as done by 200 ms).
- The disclosure carets (Accordion, Select, Configurator) turn on `present` with no frame past their rest.
- A canvas that opts into the first-appearance fade animates `opacity` alone.
- Step 3: under Reduce Motion, every part the G-2 run visits keeps each fade at 150 ms or less and moves nothing (G-5's reduced reading); an unlayered site rule setting a 120 ms opacity transition computes to 120 ms; a Popover, a Sheet, a Select and the dock's fold each show three intermediate opacity frames and no frame of travel (S112's O-350 witness).
- G-2 and G-5 over every part that rides a token.
- Optional, never blocking: R2 and P2-scroll on an iPhone with Low Power Mode off and on (D§15.2, Q7).

## Sites it serves

Every site that loads glass's tokens: atlas, value.js, daraksha, fourier, keyframes, gaggle, Home Assistant, and slides once it moves to 11. None has to change anything. keyframes.js is asked for the sampler. atlas, daraksha, value.js, fourier and keyframes are told which of their lines read `--spring-panel` for an entrance, with `--spring-bloom` offered; value.js and keyframes are told their `--ease-cartoon-punch` readers lose the token in 12.0.0; value.js is told the canvases' first appearance loses its lift; atlas is told its Selects' carets turn on `present`, and its rule's seam (`src/editorial/AnimatedRule.vue:185`) is named among the `--spring-panel` readers.

## Not this wave's

keyframes.js's sampler and `Draggable`'s follow (keyframes'); the generator's 0.1 % cure (11.1.2); `--spring-panel`'s own curve, which stays public for a site's own spatial morph.
