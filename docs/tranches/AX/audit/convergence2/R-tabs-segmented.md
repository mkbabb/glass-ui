# R-tabs-segmented — SOTA tab/segmented-control spring-slider + squish-on-travel (convergence-2 research lane)

**Lane** SOTA-RESEARCH (T1/T2/T3 deepening). **Severity** research.
**Verdict** **net-new-wave** (the `tabs-unify` wave the T1/T2/T3 asks demand does NOT yet
exist in `docs/tranches/AX/waves/`) — this lane is its SOTA consumer.
**Dedup anchor:** sibling lane `convergence2/R-apple-liquid.md` §4 already SURVEYS the
segmented-control idiom ("snappy glide + brief squish, drop 'Bouncy', one `variant` axis")
and maps it to "the T-tabs wave family" — but that family has no plan file, and R-apple-liquid
gives the DIRECTION without the squish MECHANISM or NUMBERS. This lane is the depth that survey
defers to: the exact directional-stretch technique + the concrete scaleX/scaleY/spring values
the tabs-unify wave needs to actually author the elastic indicator.

---

## The ask (USER-DEFECTS pass-2 §T)

- **T1** — Default tabs → the BOUNCY (custom spring-slider) variant; offer `tabs` (underline) +
  `pill` variants (pill NOT the default).
- **T2** — BouncyToggle → replaced by bouncy-tabs (remove OR leverage the EXACT same animation);
  drop the "Bouncy" prefix; update ALL consumers.
- **T3** — `/navigation/responsive-tabs` → subsumed by the underline tabs; ALL within ONE component.

The headline pivot: glass-ui's spring-slider (`BouncyToggle`/`BouncyTabs`) becomes the DEFAULT
tabs. The SOTA target the user names is "the elastic indicator that squishes/stretches between
tabs" — which glass-ui's slider does NOT currently do (see §3).

---

## 1. The SOTA segmented-control / tab indicator — what Apple + Material actually ship

**The canonical idiom: the active-indicator is a SINGLE liquid body that GLIDES + STRETCHES
between segments, never a crossfade.** Two primary-source authorities define the mechanism:

### 1a. Apple (iOS segmented control / Liquid Glass tab bar) — the register + the squish

- The active-indicator glides on the iOS **control register = `snappy`, bounce 0.15** (NOT bouncy).
  Apple's restraint doctrine, confirmed across the spring references: *iOS system controls
  (segmented, tab, toggle) ride snappy; `bounce > 0.4` "reads too exaggerated for a UI element";
  iOS 26.2 DIALED motion DOWN.* (Cross-confirmed in `R-apple-liquid` §2.)
- Liquid Glass adds the squish: *"some elements squish and wiggle when you interact with them …
  when you grab an element it warps and moves as you interact with it."* On a segmented control
  this reads as a brief width/scale flex of the indicator as it travels — the "controls insist on
  animating themselves" register, kept RESTRAINED. The `.glassEffect(.regular.interactive())`
  modifier couples the light (specular) and the squish onto ONE clock.
- iOS 26 tab bars additionally *"shrink to bring focus to the content"* on scroll and *"fluidly
  expand"* on scroll-back, and *"bubble and wiggle when switching views"* (NN/g live-product
  report) — the same liquid-body-morph substrate, not per-element keyframes.

### 1b. Material Design 3 — the EXACT squish-on-travel MECHANISM (the net-new depth)

Material names the effect **ELASTIC indicator animation mode** and gives the precise mechanism
R-apple-liquid's survey omits. From the Android Material spec (`TabLayout` API + m3.material.io):

> "Translate the selected tab indicator by **growing and then shrinking** the indicator, making
> it look like it is **stretching** while translating … the left and right side of the selection
> indicator translate **out of step** — with the **right decelerating and the left accelerating**
> (when moving right). This difference in velocity between the sides of the indicator, over the
> duration of the animation, makes the indicator look like it **grows and then shrinks back down**
> to fit its new destination's width."

**This is the cardinal mechanism the squish-on-travel requires, stated exactly:** the indicator's
LEADING edge departs FIRST/FASTER and the TRAILING edge departs LATER/SLOWER, so mid-travel the
indicator is wider than either rest width (it stretches toward the destination), then the trailing
edge catches up and it shrinks to fit. The two edges animate on DIFFERENT easing curves — leading
on an *accelerate* curve, trailing on a *decelerate* curve.

**Material 3 motion tokens to pin (source-confirmed, `material-foundation/material-tokens` JSON):**

| Token | cubic-bezier | role on the indicator |
|---|---|---|
| `emphasized-accelerate` | `cubic-bezier(0.3, 0, 0.8, 0.15)` | the **leading** edge (departs fast, the stretch open) |
| `emphasized-decelerate` | `cubic-bezier(0.05, 0.7, 0.1, 1)` | the **trailing** edge (catches up late, the shrink close) |
| `emphasized` (standard) | `cubic-bezier(0.2, 0, 0, 1)` | the indicator as a whole (single-spring path) |

Material 3 duration tokens (ms): short 50/100/150/200 · medium 250/300/350/400 · long
450/500/550/600 · extra-long 700/800/900/1000. The tab-indicator travel sits in **medium**
(~`medium2` 300 ms to `long1` 450 ms — Apple's perceptual `snappy` is 0.5 s, the same band).

---

## 2. The squish PHYSICS — volume-preserving scale (Josh W. Comeau, primary source)

The disciplined way to author the stretch (over Material's two-edge raw-translate) is the Disney
**squash-and-stretch** atom — and the rule is **volume conservation**: when an element stretches
along one axis it must compress the other in INVERSE proportion, or it reads as a size change, not
an elastic deform.

The confirmed recipe (`joshwcomeau.com/animation/squash-and-stretch`, the bouncing-ball playground):

- Stretch and squash ride a single `--stretch` ratio; the scale pairs are reciprocal:
  `scale: var(--squash) calc(1 / var(--stretch))` for the squash, `scale: calc(1 / var(--stretch))
  var(--stretch)` for the stretch.
- The playground uses `--stretch-ratio: 1.25` / `--squash-ratio: 1.5` for a bouncing ball, but the
  explicit author guidance is: *"In practice, I tend to pick much more subtle values … something in
  the 25–50% range"* — and for a UI control it is far lower still.
- `transform-origin` is LOAD-BEARING: it anchors the un-deformed edge so the stretch grows toward
  the direction of travel (the ball uses `center bottom`; a horizontal tab-indicator wants
  `transform-origin` keyed to the travel direction — leading edge on enter, or `center` for the
  symmetric width-flex).
- Stretchy spring values for the arrow demo: `stiffness: 300, damping: 12` (a lively, low-damped
  spring — for a UI control this is too loose; the indicator wants the snappy register, §1a).

**The glass-ui translation (the value to pin):** a horizontally-traveling indicator stretches
along X and compresses Y in lockstep: `scale: var(--stretch) calc(1 / var(--stretch))` where
`--stretch = 1 + clamp(|travel-velocity| · k, 0, maxStretch)`. **Cap `maxStretch` LOW (~1.06–1.10)**
— this is the EXACT same low cap `R-apple-liquid` §3 pins for the press-squish (Liquid Glass is
restrained; `--spring-dock` is only +4.6%). The reciprocal X/Y pairing is non-negotiable or the
volume reads wrong.

---

## 3. The glass-ui GAP — what the current slider does NOT do (source-confirmed)

The existing spring-slider (`BouncyToggle.vue` + `useBouncySlider.ts`, with `BouncyTabs.vue` a thin
single-select shim) GLIDES but does NOT squish/stretch on travel. Confirmed at source:

- **The travel is a rigid `inset`/`transform` interpolation, no deform.** On the anchor path
  (`BouncyToggle.vue:361-375`) the slider `transition: inset var(--duration-normal) var(--spring-snappy)`
  — `inset` animates the box rigidly between anchors. On the JS path
  (`useBouncySlider.ts:81-86`, `.bouncy-slider--js` rule `BouncyToggle.vue:350-355`) it animates
  `transform: translateX(…)` + `width` — again rigid, no scaleX overshoot. **There is NO scaleX
  stretch, no two-edge out-of-step, no volume-preserving deform anywhere on the travel path.**
  The slider is a sliding pill on `--spring-snappy`, which is the right REGISTER (post-W05) but the
  wrong SHAPE — it lacks the elastic squish the user explicitly names.
- **The press squish exists but is SEPARATE.** `animatePress` (`BouncyToggle.vue:125-155`) is the
  per-button WAAPI press bounce — a `scale()` keyframe on the BUTTON, not the indicator, and it is
  the double-spring W05's MOTION-SHAPE arm collapses. The travel-squish is a DISTINCT animation the
  indicator needs and does not have.
- **The name mis-signals.** "Bouncy"/`--spring-bouncy` (bounce ~0.3, +20.5%) signals PLAYFUL; the
  SOTA segmented register is CONTROL/snappy (bounce 0.15). T2's "drop the Bouncy prefix" is the
  correct semantic fix — and post-W05 the slider transitions already read `--spring-snappy`, so the
  rename matches the curve already shipped.

**Net:** the tabs-unify wave must ADD the squish-on-travel (a new animation atom), not just rename
+ reparent the existing rigid glide. R-apple-liquid §4 said "the indicator squishes (a brief
width/scale flex) into the new segment" but did not specify HOW — this lane supplies the how.

---

## 4. The SOTA recipe the tabs-unify wave consumes (the actionable synthesis)

**ONE component, three `variant`s, ONE shared elastic indicator** (T1/T2/T3 collapse into one):

1. **Unify the three tab surfaces under one component with a `variant` axis** —
   `segmented` (default, the pill-slider — formerly BouncyToggle's `default`), `pill` (the solid
   foreground pill — formerly the `--pill` variant), `underline` (formerly UnderlineTabs).
   `responsive-tabs` subsumes into the `underline` variant's overflow handling (the existing
   `overflow: "none" | "scroll" | "auto"` axis on BouncyToggle already covers the matchMedia
   Select↔UnderlineTabs swap responsive-tabs did — verify the breakpoint-swap is the same affordance).
   Drop the "Bouncy" prefix everywhere (T2); update all consumers (sweep `BouncyTabs`/`BouncyToggle`
   imports). The indicator-morph is ONE animation shared across all three variants.

2. **The indicator GLIDES on `--spring-snappy` (CONTROL, bounce 0.15)** — the register is already
   correct post-W05 (`BouncyToggle.vue:352-354,373`, `UnderlineTabs.vue:77`). KEEP it; do NOT route
   the travel to `--spring-bouncy`. This is the confirmed iOS segmented register (§1a).

3. **ADD the squish-on-travel — the new atom** (the net SOTA add). Two viable mechanisms, in
   preference order:
   - **(preferred) Velocity-driven volume-preserving scaleX overshoot.** On travel, apply
     `scale: var(--stretch) calc(1 / var(--stretch))` to the indicator where
     `--stretch = 1 + clamp(|Δx|/travelTime · k, 0, var(--tab-indicator-max-stretch))`, capped LOW
     (`--tab-indicator-max-stretch` default ~`1.08`, ≤1.10 — §2). `transform-origin: center` for a
     symmetric width-flex, OR keyed to travel direction for a leading-edge stretch. The X/Y pairing
     is reciprocal (volume-preserving) or it reads as a size pump. This composes WITH the `inset`/
     `transform` glide already shipped — the glide moves the box, the scale deforms it.
   - **(alternative, CSS-only on the anchor path) Two-edge out-of-step `inset` easing.** Animate the
     `inset-inline-start` (leading) on `emphasized-accelerate` `cubic-bezier(0.3,0,0.8,0.15)` and
     `inset-inline-end` (trailing) on `emphasized-decelerate` `cubic-bezier(0.05,0.7,0.1,1)` so the
     leading edge departs first and the trailing catches up — the Material ELASTIC mechanism (§1b)
     expressed as two separately-eased `inset` axes. Pure CSS, no JS velocity, anchor-path-native.
     LIMITATION: the two-edge easing is harder to land on a velocity-aware spring; it is the
     declarative-fallback path (parallels glass-ui's existing JS-spring vs `linear()`-token two-track
     model — `R-apple-liquid` §2 / W05 §6).
   - The squish must be **gated behind `prefers-reduced-motion`** (the slider already early-returns
     on PRM in `animatePress`; the indicator deform inherits the same gate).

4. **Token-first the squish magnitude** — `--tab-indicator-max-stretch` (~1.08) + the velocity
   constant `k` as a tunable, so a consumer dials the elasticity without editing source (J invariant).
   Reuse the W05 `--spring-snappy` register; do NOT mint a parallel spring.

5. **Default = the `segmented` spring-slider variant** (T1). `pill` is opt-in, NOT default. The
   `underline` variant retains the `role="tablist"` semantics for panel-nav (the Tabs-vs-ToggleGroup
   contract in CLAUDE.md — segmented/pill are the ToggleGroup-shaped surface, underline is the
   panel-nav Tabs surface; keep the ARIA distinction).

---

## 5. The exact numbers (the SOTA values table — what the wave pins to)

| Quantity | SOTA value | Source | glass-ui binding |
|---|---|---|---|
| Indicator glide register | `snappy` — bounce **0.15**, perceptual duration **0.5 s**, ζ ~0.85, overshoot ~+4–7% | Apple Dev (snappy default) + `R-apple-liquid` §2 | `--spring-snappy` (already shipped, `--duration-normal` 0.3 s) — KEEP |
| Squish cap (`maxStretch`) | **~1.06–1.10** (LOW — restrained UI control) | Comeau "subtle 25–50% only for big motion" + Apple restraint + `--spring-dock` +4.6% | `--tab-indicator-max-stretch: 1.08` (new token) |
| Squish scale pairing | `scale: var(--stretch) calc(1/var(--stretch))` (volume-preserving, reciprocal X/Y) | Comeau squash-and-stretch | indicator inline `scale` on travel |
| Two-edge leading easing (alt path) | `cubic-bezier(0.3, 0, 0.8, 0.15)` (emphasized-accelerate) | Material 3 motion tokens | `inset-inline-start` transition |
| Two-edge trailing easing (alt path) | `cubic-bezier(0.05, 0.7, 0.1, 1)` (emphasized-decelerate) | Material 3 motion tokens | `inset-inline-end` transition |
| Travel duration band | medium2–long1 = **300–450 ms** | Material 3 duration tokens | `--duration-normal` (0.3 s) is in-band; the slower close may want `--duration-slow` |
| `transform-origin` | travel-direction-keyed (leading edge) OR `center` (symmetric flex) | Comeau (anchored un-deformed edge) | indicator `transform-origin` |
| Bounce ceiling for UI controls | `bounce ≤ 0.4`, never `bouncy` on a high-frequency control | Apple restraint doctrine | `--spring-snappy` only; NOT `--spring-bouncy` |
| Reduced-motion | squish + glide skip entirely under PRM | existing `animatePress` PRM guard | inherit the PRM early-return |

---

## 6. Verdict + dedup mapping

**Verdict: net-new-wave — `tabs-unify`** (no `docs/tranches/AX/waves/AX.W*-tabs*` plan file exists;
the T1/T2/T3 asks have no covering wave; `R-apple-liquid` §4 maps the idiom to "the T-tabs wave
family" that must be MINTED). This research lane is that wave's SOTA consumer.

**Dedup — what folds where (no duplicate prescription):**

- **vs `R-apple-liquid` §4 (sibling research lane).** R-apple-liquid SURVEYS the segmented idiom
  (register, "drop Bouncy", one `variant` axis) at altitude and defers the MECHANISM. This lane is
  the DEPTH: the Material ELASTIC two-edge mechanism, the volume-preserving scaleX values, the
  concrete maxStretch cap, the source-confirmed easing/duration tokens, and the source-confirmed GAP
  (the current slider has NO travel-squish). The two are complementary — R-apple-liquid for the
  cross-element fusion map, this lane for the tabs-indicator squish recipe. **Fold:** the tabs-unify
  wave consumes BOTH; this lane supplies its §"author the squish" block.
- **vs W05 (one-iOS-spring-vocabulary).** W05 OWNS the `--spring-snappy` register the indicator
  glides on, and its MOTION-SHAPE arm collapses the per-button PRESS double-spring. The tabs-unify
  TRAVEL-squish is a DISTINCT animation (the indicator deform, not the button press) — it CONSUMES
  W05's settled `--spring-snappy` register but adds no spring token. **No overlap, clean dependency:
  tabs-unify dependsOn W05** (the register must be settled first).
- **vs W42 (liquid-morph substrate).** The cross-element FUSION (tab-indicator ↔ carousel-indicator,
  the dots↔Search morph) is W42's `MorphGroup`/`glassEffectID` substrate; the tabs-unify
  single-component indicator squish is NOT that — it is one component's own indicator. tabs-unify is a
  W42 CONSUMER for any cross-component morph, but the within-component squish is local. **No overlap.**
- **vs W23 (carousel indicator reauthor).** The carousel liquid-pill page-indicator (P5) shares the
  squish PHYSICS atom (volume-preserving scaleX) but is a separate surface. If the squish atom is
  worth ≥2 consumers (tabs-indicator + carousel-indicator + dock-press-squish = 3), it warrants a
  shared `useSquish`/`--*-max-stretch` token family rather than three copies — flag for the overfitting
  bar. **The squish atom MAY be shared infra; tabs-unify is its first consumer.**
- **vs W18 (storybook IA) / `/navigation/responsive-tabs`.** T3 (responsive-tabs subsumed) is a
  demo-IA + component-consolidation concern the tabs-unify wave owns (the component merge) and W18
  reflects (the storybook tree). **tabs-unify owns the merge; W18 updates the tree.**

**One design call for the user (RATIFY, not blocking this research):** whether the squish uses the
**velocity-driven scaleX** (preferred — true elastic, needs a JS velocity read on the spring) or the
**two-edge CSS `inset` easing** (declarative, anchor-path-native, no JS). The former is more faithful
to Apple's continuous deform; the latter is the Material ELASTIC mechanism and ships pure-CSS. This is
the same two-track CPU/GPU split W05 §6 documents — recommend the velocity-driven path for the
interactive default and the two-edge CSS as the `@supports`/reduced-complexity fallback.

---

## Sources

- [UISegmentedControl — Apple Developer](https://developer.apple.com/documentation/uikit/uisegmentedcontrol)
- [Animate with springs — WWDC23 (snappy/smooth/bouncy presets)](https://developer.apple.com/videos/play/wwdc2023/10158/)
- [snappy — Apple Developer (default bounce 0.15)](https://developer.apple.com/documentation/swiftui/animation/snappy)
- [TabLayout (ELASTIC indicator mode) — Android Developers](https://developer.android.com/reference/com/google/android/material/tabs/TabLayout)
- [Tabs specs — Material Design 3](https://m3.material.io/components/tabs/specs)
- [Easing and duration tokens — Material Design 3](https://m3.material.io/styles/motion/easing-and-duration/tokens-specs)
- [material-tokens motion.json (cubic-bezier + ms values)](https://github.com/material-foundation/material-tokens/blob/json/json/motion.json)
- [Squash and Stretch — Josh W. Comeau (volume-preserving scale)](https://www.joshwcomeau.com/animation/squash-and-stretch/)
- [Animated Tabs — buildui.com (spring bounce 0.2, duration 0.6)](https://buildui.com/recipes/animated-tabs)
- [Segmented Control for web — Samuel Kraft (Framer Motion shared-layout)](https://samuelkraft.com/blog/segmented-control-framer-motion)
- [Smooth Tabs — Motion.dev](https://motion.dev/tutorials/react-smooth-tabs)
- [Liquid Glass Is Cracked — NN/g (tab-bar/carousel live behavior)](https://www.nngroup.com/articles/liquid-glass/)
