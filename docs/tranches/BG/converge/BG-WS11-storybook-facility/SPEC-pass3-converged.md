# BG-WS11-storybook-facility — SPEC-pass3-CONVERGED

Storybook facility: a FUNCTIONING thick glassy scroll-progress rail · section
typewriter + fade-up entrances on liquid-weight spring clocks · ONE standardized
page-API family every page composes · consistent per-category suffusal. Both
modes, Chrome AND real Safari, real-paint is the gate.

> **What this CONVERGED pass-3 locks.** Pass-2 converged the DESIGN; pass-3 EXECUTED
> the three load-bearing `build=false` estimates on real engines (P1 + `view()` on
> WebKit 26.4, the oracle on `@vue/compiler-sfc`) and ran a five-arm prototype/critique
> fleet. This spec folds EVERY critique mustFix — the contradictions resolved, the
> overstatements walked back, the regressions caught:
>
> 1. **Rail timeline-source RESOLVED to the already-wired NAMED timeline.** The
>    pass-2/pass-3 `scroll(nearest block)` choice is RETIRED. The demo ALREADY names
>    `--demo-main-progress` on `.demo-main-scroller` (`dock-nav.css:201`) and points
>    `.demo-scroll-progress` at it via `--scroll-progress-scroller` (`:231`); the
>    library recipe already resolves it (`scroll-driven.css:45`). The prototype's own
>    `overflow:clip` footgun proved `scroll(nearest)` is topology-fragile. KISS+DRY:
>    reuse the named timeline, do NOT fork a second resolution model (§2A).
> 2. **The strand-proof RE-ARCHITECTED off the synchronous mount loop.** `useScrollTo`
>    commits the deep-link scroll `nextTick + rAF-retry + behavior:"smooth"`
>    (`useScrollTo.ts:79-91`, verified) — ≥3 frames AFTER mount. A synchronous
>    `mounted` `bottom<0` loop (and any fixed-rAF defer) reads at scroll=0 and strands.
>    The reveal is now SCROLL-SETTLE-REACTIVE — ONE shared page-level observer rooted on
>    the scroll CONTAINER + a throttled passed-sweep until all-revealed (§2B'.3).
> 3. **The §2B' decouple HARDENED.** The heading migrates as
>    `class="text-subheading story-section__heading"` (the √φ rung PRESERVED, not
>    dropped); the `.story-section__body` carries `flex flex-col gap-*` (the flex ripple
>    closed); the CSS floor is INVERTED (heading visible by default, JS ADDS the hide);
>    the false "24-vs-30ms drift" rationale is DROPPED (only `30ms` exists —
>    `--char-stagger-step` is a DRY single-source, not a drift fix).
> 4. **The StoryHeroBackdrop carve REGRESSION caught.** The carve mounts on the SAME
>    6-branch `kind` switch (aurora/constellation/fourier/liquid-grid/grid/paper) with
>    `fullBleed`/`bgFullBleed` as the bleed MODIFIER — NOT gated on `variant==='hero'`
>    (which would strip the grid/paper full-bleed washes from every content page,
>    regressing BC.W-GRID-SIMPLE). The ~14-gate blast radius is enumerated; the oracle
>    re-targets the real 6-branch chain (§2C').
>
> **The DESIGN is converged; the WORKSTREAM gate — real-paint on the integrated tree,
> Chrome AND real Safari — is structurally UNMET** (the integration branch does not
> exist; zero captures have run; user confirmation on the 4→2 collapse + chrome-chroma
> lift is owed). §8 is the cap.

---

## 0. SEQUENCING — WS11 ELEVATES, it does not re-fight (binding)

WS11 is the storybook *apotheosis* over WS1+WS4+WS8. It ABSORBS their outcomes and
HARD-depends on them; it does NOT re-propose/re-fix/re-mint what they own. **At HEAD
(`tranche/BG`) the integration branch does NOT exist — `git diff master..HEAD --
src/ demo/` is EMPTY (verified 2026-06-28). Every WS1/WS4 precondition is UNLANDED.
WS11 cannot open a single wave today; the true frontier step is standing up the
integration branch (§8 #0).**

| Owns | WS | The fact WS11 consumes |
|---|---|---|
| Route transition + scroll-progress CORRECTNESS + hero-fit + field | **WS1** | bare keyed `<component :is :key=route.path class=route-enter>` swap (NO `<Transition>`); `.scroll-build` RETIRED; `.scroll-cascade`/`.scroll-pin`/`.smooth-scroll` KEPT; the **LIBRARY** `.scroll-progress` recipe corrected to `scaleX(0)` floor (for `scroll-vt.vue` + external); ONE shell `<Aurora>` with per-route `warmFieldHue` + warm `[25,95]` `--field-h` |
| Chassis consolidate + scroll-shrink + D14 | **WS4** | `DemoFrame.vue`/`demo-frame.css` DELETED (truly-dead `_chassis/`); `ShowcaseFrame` is THE demo-cel; **D14 cascade-columns fixed to a `%`-off-`--col` form** (`scroll-choreography.css`, still the `* 0` UNIT-INVALID `calc(% + ms)` at HEAD); `Code.vue` the surviving code primitive |
| Glass-deep apotheosis | **WS8** | `--glass-blur-deep-*` / `.glass-deep` / `--glass-depth` exist (PRE-DATE WS8 — BB.W-DEEP-GLASS). **The bar does NOT consume deep glass** (§0.6) |

**Per-wave precondition HEAD-check (the FIRST acceptance step of every WS11 wave;
all RED at HEAD, verified 2026-06-28).** A wave opening against an un-landed
precondition STOPS — it does NOT re-fix it (foreign-wave fence):

1. `.scroll-build` GONE from `StoryPage.vue` (`:72` STILL carries it),
   `SectionLanding.vue`, `scroll-choreography.css`, `glass/liquid-enter.css` (WS1).
2. `scroll-choreography.css` cascade-columns reads the `%`-off-`--col` form, NOT
   `... * 0` and NOT `calc(% + ms)` → `animation-range !== normal` (WS4 — the §2B'
   body-cascade BASE arm does NOT need this; only the opt-in `--columns` flourish
   does — see §2B').
3. The LIBRARY `.scroll-progress` recipe is the `scroll(nearest block)` scaleX floor
   (WS1). WS11's BG.W-SCROLL-PROGRESS-GLASSY is the LAST writer on the demo bar div
   (§0.5).
4. `ShowcaseFrame` is the demo cel; `_chassis/` (`DemoFrame`/`demo-frame.css`)
   deleted (WS4).
5. `--glass-blur-quiet` resolves to the WHOLE composite
   (`blur(...)·level saturate brightness`, `tokens/glass.css:140`) — already true at
   HEAD; the bar consumes it directly.

---

## 0.5. THE WS1↔WS11 DEMO-BAR OWNERSHIP RESOLUTION (RISK-2 — PROVEN by P2)

WS1 and WS11 specify MUTUALLY-EXCLUSIVE bars on the same div, both editing
`proof-ba-animate.mjs` + `ba-animate.spec.ts`. **THE RESOLUTION — ONE owner per
element, two disjoint recipes, two disjoint gate arms. PROVEN collision-free by P2**
(forced both bars onto one page with both gate predicates → green concurrently + red
INDEPENDENTLY):

> **The demo bar STOPS composing the library `.scroll-progress` class** (`AppShell.vue:393`
> → `<div class="demo-scroll-progress" aria-hidden="true" />`, clean break — the
> `.scroll-progress` token GONE). The two recipes live on two elements:

- **WS1 OWNS the LIBRARY `.scroll-progress` recipe** (`scroll-driven.css`): the D5 root
  fix — `scaleX(0)` floor + `scroll(nearest block)`. Consumers: `scroll-vt.vue` +
  external. Its `ba-animate` teeth read `getAnimations().currentTime` + bbox-width.
  **WS11 does not touch this.**
- **WS11 OWNS the DEMO bar** `.demo-scroll-progress` (`dock-nav.css` + `AppShell.vue:393`):
  the self-contained thick glass TRACK + clip-revealed FILL off `@property
  --scroll-fill`, driven on the **already-wired named timeline `--demo-main-progress`**
  (§2A — NOT `scroll(nearest block)`). Its `ba-animate` teeth read
  `getComputedStyle('--scroll-fill')` (a registered custom property feeding `clip-path`
  is MAIN-THREAD → reliable Chromium AND WebKit AND the JS fallback). **WS11 deletes the
  OLD demo-bar scaleX assertion + the `|| (headless not reflecting)` OR-escape
  (`ba-animate.spec.ts:166`)** and replaces it with `railHealth()`.

So `ba-animate` carries TWO disjoint arms — a LIBRARY scaleX/currentTime arm (WS1,
`scroll-vt.vue`) AND a DEMO-bar clip-path/`--scroll-fill` arm (WS11,
`.demo-scroll-progress`). Different elements, recipes, signals — coexist GREEN (P2).
WS1 must NOT add a "spring-eased trailing glint" to the demo bar; that glint is WS11's
JS `SpringProgress` follower.

---

## 0.6. THE WS8 OVER-DEPENDENCY + the timeline-source decision (RESOLVED)

- **The bar does NOT consume `--glass-blur-deep`.** The §2A recipe consumes
  `var(--glass-blur-quiet)` (Apple HIG: chrome is the LIGHTER material). The WS8
  precondition for the BAR is SOFT; WS8 stays hard only where the page-API SHELL
  composes deep-glass content surfaces.
- **The bar uses the already-wired NAMED timeline `--demo-main-progress`, NOT
  `scroll(nearest block)` (CONVERGED REVERSAL of pass-2 §0.6).** The named timeline is
  declared on `.demo-main-scroller` (`dock-nav.css:201-202`), in scope for the
  descendant sticky bar, and immune to intervening overflow contexts (the rail's own
  `overflow:clip` for the caps would make `scroll(nearest)` topology-fragile — the
  prototype's own footgun). Reuse the wiring; do not fork a second resolution model.
  `--scroll-progress-scroller`/`--scroll-progress-timeline` stays the override token.

---

## 0.7bis. PROTOTYPE LEDGER — EXECUTED + the pass-3 critique verdicts folded

| # | Prototype | Build | EXECUTED verdict / critique fold |
|---|---|---|---|
| **P1** | Safari custom-property-via-scroll | proven | **WebKit 26.4 REFLECTS `--scroll-fill` live** (`0%`→`88.856%`@0.8, no drift @400ms; `currentTime != null` survives the WebKit `%`-STRING vs Chromium number). Gate is the SIMPLE `!supportsScrollTimeline()`. **RESIDUAL:** railHealth on the PRODUCTION DOM shape (named timeline) is build=false, owed. |
| **view()** | body-cascade BASE | proven | **WebKit 26.4:** `opacity 0→1` on `view()` scrubs live. The body fade-up works cross-engine TODAY; only the OPT-IN `--columns` flourish consumes the WS4 D14 fix. |
| **P5 oracle** | single-root | proven | `@vue/compiler-sfc` raw-parse distinguishes single-root from fragment. **FALSIFIER FOLDED:** the carve MUST handle a `v-if`/`v-else-if`/`v-else` chain of ARBITRARY length (the real `StoryHeroBackdrop` is a **6-branch** chain → `els.length===6, chain===true`) + a `v-for`-root guard + `v-show` non-false-GREEN (§2C'). |
| **railHealth** | live-from-dead teeth | proven (forced JS fallback) | **chromium 148 AND webkit 26.4 distinguish live-from-dead, exit 0.** Critique folds: (a) bind to the NAMED timeline; (b) **`grew` is the killer discriminator** (a stuck bar has perfect no-drift); (c) commit as an enrolled `*.spec.ts` + webkit testMatch; (d) `overflow:clip`/`clip-path` NEVER `overflow:hidden`; (e) run on the PRODUCTION DOM shape. |
| **decouple** | heading×body disjoint | proven (Chromium) | `getAnimations()` per node: heading-h2-SELF binds 0, each `.char` binds exactly `gl-char-rise`. **CONVERGED on Chromium; the COMBINED disjoint capture on real WebKit 26 is owed.** |
| **strand-proof** | no-strand guarantee | FALSIFIED-honest | The synchronous `mounted` loop reads at scroll=0 (before the smooth-scroll commit) → strands. **RE-ARCHITECTED** to a scroll-settle-reactive shared observer (§2B'.3). |
| **shell collapse** | 2-component + carve | partial | Facade single-root verified; **BLOCKER caught:** the carve must mount on the `kind` switch, not `variant==='hero'`; the ~14-gate blast radius + the real 6-branch oracle re-run are binding (§2C'). |

P2 (coexistence), P3 (reveal-on-crossing Chromium), P4 (ship-2) stand.

---

## 1. GESTALT GOAL

Unchanged from pass-2 §1 (the four-arm iOS-27 document system). North-star: the
user's dark-mode iOS captures (`scratchpad/evidence/frames/`) — the **Control-Center
recessed-channel slider** is the rail (empty frosted channel always visible, luminous
clip-revealed fill, groove inset + specular edge → floating chrome glass, NOT a 2px
hairline); the **Apple Music page system** is the depth ladder (D1 bento ≡ technicolor
card grids; D2/D3 ≡ bold-subheading section stacks). The entrance is the iOS calm
**materialization wipe** (opacity + small translateY on a smooth spring), never a
bouncy spell-out.

**The chrome-chroma punch (pass-3, FLAG-FOR-USER).** The cartoon-technicolor punch is
UNDER-met on chrome surfaces: the Apple-Music bento cards are pure-saturated (C≈0.2),
the storybook `SectionPreviewCard` is warm-cream low-chroma (C 0.075), while the rail
fill already reaches C 0.13. The rail AND the bento card are CHROME (exempt from the
one-color-event body-ink count), so lifting the D1 `SectionPreviewCard` chroma toward
the rail-fill's already-shipped **C 0.10-0.13 chrome band** lands the punch WITHOUT
breaking body-ink-untinted proportion or the no-gray warm identity. Chrome only; the
low-chroma warm read on CONTENT surfaces is untouched. Rides BG.W-STORYBOOK-SUFFUSE;
**flagged for user alongside the 4→2 collapse** (both deviate from / extend the literal
ask — the cheapest things to get wrong at scale).

---

## 2. MECHANISM (concrete, idiomatic — every mustFix folded)

### 2A. The thick glass progress rail (BG.W-SCROLL-PROGRESS-GLASSY)

**Why a thickened scaleX bar is forbidden** (three falsifiers): `scaleX(0→1)` on a
thick pill squashes its end-caps to ellipses and shows no TRACK at `scaleX(0)`;
`backdrop-filter` on a 10px strip blurs negligible area (a thin bar's glass is RIM +
TINT + SPECULAR + GROOVE); `proof:no-layout-animation` forbids animating `width`. The
honest architecture is a TRACK + a clip-revealed FILL on a single-writer inherited
`--scroll-fill`.

**The recipe (the four bar mustFixes + the timeline-source reversal baked in):**

```css
@property --scroll-fill { syntax: "<percentage>"; inherits: true; initial-value: 0%; }

.demo-scroll-progress {                       /* the TRACK — always visible, the ONE writer */
    position: sticky; inset-block-start: 0;
    z-index: var(--z-scroll-rail, 5);          /* above content, BELOW --z-dock:40 / --z-overlay:50 */
    pointer-events: none;
    block-size: var(--scroll-rail-thickness, 0.625rem);   /* √φ-proportioned, ~10px */
    border-radius: var(--radius-pill);
    overflow: clip;                            /* CAP-REVEAL via clip — NEVER overflow:hidden (railHealth mustFix) */
    background: var(--glass-bg-quiet);
    backdrop-filter: var(--glass-blur-quiet);  /* FIX#1: the WHOLE composite, never blur(var(composite)) */
    box-shadow:                                /* inner GROOVE + separation lift — depth w/o blur */
        inset 0 1px 2px color-mix(in srgb, var(--foreground) 14%, transparent),
        0 1px 3px color-mix(in srgb, var(--shadow-color) 24%, transparent);
}
.demo-scroll-progress__fill {                  /* the FILL — clip-revealed, undistorted caps */
    position: absolute; inset: 0;
    background: linear-gradient(90deg,
        var(--card) 0%,                                    /* FIX#3: warm-cream start, NO oklch(from …) */
        oklch(0.78 0.13 var(--field-h, 60)) 100%);         /* → route hue (suffusion); chrome C 0.13 */
    clip-path: inset(0 calc(100% - var(--scroll-fill)) 0 0 round var(--radius-pill));  /* compositor-safe */
    border-block-start: 1px solid color-mix(in srgb, white 28%, transparent);  /* specular top edge */
}
@supports (animation-timeline: scroll()) {     /* FIX#4: @supports ONLY, NEVER a prefers-reduced-motion gate */
    @keyframes gl-scroll-fill { from { --scroll-fill: 0%; } to { --scroll-fill: 100%; } }
    .demo-scroll-progress {                    /* FIX#2: ONE animation on the TRACK; fill/glint inherit --scroll-fill */
        animation: gl-scroll-fill auto linear;
        /* CONVERGED: the already-wired NAMED timeline, NOT scroll(nearest block) (§0.6). */
        animation-timeline: var(--scroll-progress-timeline, --demo-main-progress);
    }
}
@media (prefers-reduced-transparency: reduce) {  /* a SEPARATE axis from reduced-motion */
    .demo-scroll-progress { --glass-level: 0; backdrop-filter: none; background: var(--card); }
}
```

- **FIX#1 — consume the WHOLE composite.** `--glass-blur-quiet` IS `blur(8px·level)
  saturate(…) brightness(…)`. `blur(var(--glass-blur-quiet))` double-wraps → invalid →
  ZERO blur. Never `url()` (WebKit bug 245510).
- **FIX#2 — ONE animation on the TRACK; everything reads `--scroll-fill` by inheritance.**
- **FIX#3 — start stop is `var(--card)`, not `oklch(from …)`.**
- **FIX#4 — the drive sits under `@supports` ONLY** (the D5 dead-bar root was the
  no-preference-only gate). The fill is an INFORMATIONAL cue (the FadingScroll
  `@property-under-@supports-only` precedent), so it tracks under PRM and on Safari<26.
  Only the glint drops under PRM.
- **CAP-REVEAL is `overflow:clip` + `clip-path`, NEVER `overflow:hidden` (railHealth
  mustFix, binding).** An `overflow:hidden` between the fill and the scroller silently
  kills the `scroll()` timeline resolution; the gate asserts the cap mechanism.
- **TIMELINE-SOURCE — the named `--demo-main-progress` (CONVERGED).** The self-contained
  `.demo-scroll-progress` (no longer riding the library `.scroll-progress`) declares its
  OWN `animation-timeline: --demo-main-progress` — the named timeline already on
  `.demo-main-scroller` (`dock-nav.css:201`). `scroll(nearest block)` is RETIRED from the
  spec (topology-fragile; the overflow:clip footgun). If the bar mounts OUTSIDE the
  scroller's descendant scope at execution, `timeline-scope: --demo-main-progress` on the
  common ancestor bridges it (the documented escape — but the bar is a sticky child of
  `.demo-main-scroller` at HEAD, so no `timeline-scope` is needed).

**The strip-reserve, no occlusion.** No negative margin. `StoryPageShell`'s hero
reserves `padding-block-start: var(--scroll-rail-thickness)` + the scroller carries
`scroll-padding-block-start: var(--scroll-rail-thickness)`. Gate: at scroll-top the
hero's first painted content `getBoundingClientRect().top ≥` the bar's `bottom`.

**The drive signal is MAIN-THREAD — PROVEN on WebKit (P1).** A registered custom
property on a `scroll()`/named timeline feeds `var()` → recomputed main-thread each
frame, so `getComputedStyle(fill).getPropertyValue('--scroll-fill')` reflects the live
value on Chromium AND WebKit AND the JS fallback.

**§2A.bis — THE GATING PREDICATE (SETTLED by P1).** The gating predicate is the SIMPLE
`!supportsScrollTimeline()`. WebKit passes the probe AND reflects `--scroll-fill` live
(P1) → it runs the native path, no JS writer. Only Safari<26 fails the probe → JS
fallback. `supportsScrollDrivenCustomProperty()` ships as a DEFENSIVE narrower probe
(the FadingScroll-proxy one-shot hidden-element measure; jsdom/SSR → false) — a
regression tripwire, NOT the gate.

**The JS fallback — the CONFIRMED signature.** `useScrollProgress` is the WRONG tool
(returns `Ref<number>`, writes nothing). The fallback composes **`useScrollTrigger`**
(POSITIONAL — `useScrollTrigger.ts:153`: `useScrollTrigger(scrollSource, opts = {})`;
NOT barrel-exported, import directly — the `scroll-system.vue:45` precedent),
constructed ONLY on the fallback path:

```ts
// AppShell.vue — dual-path single-writer, constructed ONLY when native is absent.
import { useScrollTrigger } from "../../src/composables/motion/useScrollTrigger";
import { supportsScrollTimeline } from "../../src/composables/motion/supportsCssTimeline";

if (!supportsScrollTimeline()) {                 // P1: the SIMPLE predicate is correct
    const { progress } = useScrollTrigger(() => mainScrollerEl.value /* .demo-main-scroller */, {});
    watch(progress, (p) => barEl.value?.style.setProperty("--scroll-fill", `${p * 100}%`));
}
// native (P1-confirmed incl. WebKit) → the CSS owns --scroll-fill, no JS; no double-write.
```

The fallback ALSO runs under PRM (an informational cue, not vestibular motion).

**The liquid-weight — a REAL spring on the GLINT, not the fill.** A lagging FILL is a
LIE about scroll position, so the FILL is 1:1 truthful; the liquid weight is the **JS
keyframes.js `SpringProgress` GLINT FOLLOWER** (demo-private, `AppShell.vue`; import
from `@mkbabb/keyframes.js`, the `useDragMorph.ts:54` precedent) — a small spring
lagging the live `--scroll-fill` fraction, writing `--glint-x` so the leading-edge glow
trails with genuine inertia + overshoot. PRM-dropped (`display: none`). This carries the
universal liquid-weight law; the whole-bar feel also rides WS1's `.smooth-scroll`
momentum + the §2B entrances.

**AA + dark arm + glass-on-glass (Apple HIG).** The fill-as-graphic clears ≥3:1 over
the variable frosted backdrop in BOTH modes. Dark arm: edge + transmission carry the
silhouette (W-DARK-MATERIAL); plain per-mode token pairs only — NO `light-dark()`
inset-shadow fragment (the trap computes the whole box-shadow to `none`, MEMORY).
Glass-on-glass: the bar is the ONE chrome glass; a deep-glass content surface
immediately under it is subdued (the bar wins the material read) — an acceptance check
(§5), not a mechanism.

**The pill-cap question (railHealth mustFix — VISUAL acceptance).** `clip-path: inset()`
gives a FLAT fill leading edge inside a rounded TRACK. The reference Control-Center
slider has UNDISTORTED ROUNDED caps at BOTH ends of the FILL. CONFIRM on the fresh
capture whether the reference requires a rounded LEADING cap; if so, the fill carries
its own `border-radius: var(--radius-pill)` and the `round` term in the clip keeps the
trailing cap — the leading edge reads rounded by the track clip until the fill nears
full. This is a §5 visual-acceptance question, resolved on the real capture, not asserted.

### 2B'. Section entrances — THE DECOUPLE (resolves the double-bind)

**The hole pass-2 missed.** Pass-2 put `.scroll-cascade` on the page-level
`.story-sections` wrapper (`StoryPage.vue:220`, verified — `class="scroll-cascade
story-sections flex flex-col"`) AND per-glyph reveal on each section's heading. That
makes each `<StorySection>` a `.scroll-cascade > *` child → the whole section BLOCK
lifts+fades on a `view()` timeline WHILE the heading glyphs rise per-glyph on the IO
gate → desynced muddiness. Pass-2's "exclude the heading from `.scroll-cascade > *`" is
VACUOUS (the heading is a grandchild, already not a `>*` child).

**The resolution — gestalt-not-patch: retire the page-level block cascade; each
StorySection composes its entrance INTERNALLY as two disjoint sibling registers.**

- **The page-level `.story-sections` wrapper DROPS `.scroll-cascade`** (clean break).
  `StoryPageShell` owns this wrapper; the drop is in-fence (demo-side). It KEEPS
  `flex flex-col` + its gap.
- **`StorySection` owns its entrance composition internally**, two SIBLING registers
  that never superimpose on one visual block:
  1. **The heading register** — `.story-section__heading` (the `<h2>` — a DIRECT child
     of the section root) migrates as **`class="text-subheading story-section__heading"`**
     (the √φ canonical rung PRESERVED — the bare `story-section__heading` form is a
     hierarchy regression, mustFix), wraps its text in `<SplitChars :stagger=false>`, and
     the per-glyph reveal plays via the shared observer (§2B'.3) landing `data-revealed`
     ON the heading → `.story-section__heading[data-revealed] .char` rises per-glyph.
     ONE motion, on the heading's `.char` descendants only.
  2. **The body register** — a `.story-section__body` wrapper (the default `<slot/>`)
     IS the `.scroll-cascade`. **It carries `flex flex-col gap-(--section-gap)` matching
     the section's content gap** (the flex-ripple mustFix — wrapping `<slot/>` must NOT
     collapse inter-item spacing; verified against a REAL multi-child story, not a
     single-child stub). Its DIRECT children (the ShowcaseFrame cels) fade-up on their
     own per-child `view()` timeline. ONE motion, on the body cels only.
  The heading and the body are SIBLINGS — **disjoint by construction**, not by gate
  wording. The section "builds" because its parts build (the heading typewriters, the
  cels fade-up) — MORE refined than a whole-block translate, and KISS.

**Why DRY + correct cross-engine.** The body register REUSES the shipped `.scroll-cascade`
VERBATIM (no re-declaration of `gl-cascade-build` / `.scroll-cascade > *` — the
same-name-strips-`--ease-scroll-spring` trap). The BASE `.scroll-cascade` is
EXECUTED-PROVEN on WebKit 26.4 (§0.7bis), so the body fade-up works cross-engine TODAY —
it does NOT block on the WS4 D14 fix (only the OPT-IN `.scroll-cascade--columns`
flourish, e.g. `foundations/colors.vue`, consumes D14).

**The `#heading` SLOT path = NO typewriter (intentional, RECORDED).** `SplitChars` takes
only a STRING prop; a `#heading` SLOT cannot per-glyph reveal. The slot branch
(`StorySection.vue:78`, `v-if="$slots.heading"`) is the documented ESCAPE — the consumer
owns richer heading markup, no per-glyph reveal, terminal-visible. The per-section
entrance inconsistency (string-prop heading typewriters, slot heading does not) is
INTENTIONAL and recorded; `proof:hierarchy` H2 stays green on the slot path.

**The gate clause with TEETH** (`proof:section-entrance`, the §2B arm): (a)
`.story-sections` does NOT carry `.scroll-cascade`; (b) the per-glyph host
(`.story-section__heading`) is NEVER a `.scroll-cascade` descendant; (c) the
`.story-section__body` IS the cascade, carries `flex flex-col gap-*`, and its children
are NOT per-glyph hosts; (d) the heading KEEPS the `text-subheading` rung; (e) a
self-test bite: a synthetic StorySection that puts `.scroll-cascade` on the section root
REDs.

### 2B'.2. The two in-fence src/ edits

- **`SplitChars.vue` — add `stagger?: boolean` (default `true`).** Line 90 is
  `cn("char-stagger", props.class)` UNCONDITIONAL (verified). `:stagger="false"` omits
  the `.char-stagger` host → BARE `.char` spans + `--char-index`/`--char-total`;
  `aria-label`(full text) + per-glyph `aria-hidden` PRESERVED; engine-FREE (composes
  `useCharStagger` only → root-barrel-safe). Additive, no fork.
- **Mint `--char-stagger-step` (default `30ms`) in `scheme-motion.css`** (a reveal
  cadence is NOT scroll-driven → NOT scroll-tokens.css) and re-point BOTH
  `typography/utilities.css:158` (`calc(var(--char-index, 0) * 30ms)`) AND the new
  `section-entrance.css` reveal onto the ONE token. **RATIONALE CORRECTED (mustFix):**
  this is a DRY SINGLE-SOURCE (one token, two readers), NOT a "24-vs-30ms drift" fix —
  `grep` confirms NO `24ms` exists in src/ or demo/; only `30ms` at utilities.css:158.
  Drop the false drift justification.

`section-entrance.css` (NEW, colocated) is MINIMAL — the
`.story-section__heading[data-revealed] .char` reveal rule + the load-bearing
`.story-section__heading .char { display: inline-block }` (translateY no-ops on inline)
+ the `gl-char-rise` keyframe (opacity 0→1, translateY(0.4em)→0, on `--spring-smooth` +
`--spring-smooth-duration`) + the INVERTED hide floor (§2B'.3). It re-declares NEITHER
`gl-cascade-build` NOR `.scroll-cascade > *`.

### 2B'.3. The strand-proof — RE-ARCHITECTED (scroll-settle-reactive, ONE shared observer)

**The confirmed bug + why the synchronous mount loop is dead-on-arrival.**
`vScrollRevealOnce` (`useStaggerReveal.ts:123`) reveals only on `isIntersecting`,
carries NO `getBoundingClientRect` check (`grep -c == 0`, verified), and uses a `null`
(viewport) IO root. A section ALREADY ABOVE the viewport on first observe (hash
deep-link, F5 mid-scroll, back-nav restoration) gets a non-intersecting first callback →
skipped → never re-intersects on downward scroll → STRANDS at opacity:0. With default-on
`revealHeading` across **279 `<StorySection>` (97 files, verified)**, ANY deep-linked
route strands headings.

**The pass-3 falsifier (verified):** the deep-link scroll commits via `useScrollTo`
`nextTick + rAF-retry + behavior:"smooth"` (`useScrollTo.ts:79-91`) — ≥3 frames AFTER
mount, then a smooth animation. A synchronous `mounted` `bottom<0` loop reads at scroll=0
(before the jump) and an instant-jump restoration SKIPS the middle sections (no IO
threshold crossing). Both a fixed-rAF defer and the synchronous loop are FORBIDDEN
timing WORKAROUNDS — they guess a frame count the real scroll does not honor.

**The CONVERGED architecture — ONE shared page-level observer + a scroll-settle-reactive
passed-sweep, library-correct for any consumer's scroll container.** The shape mutates a
SHIPPED public motion preset (`vScrollRevealOnce`, BC.W-MOTION-PRESETS), so it MUST be
the library-correct gestalt for ANY consumer's scroll container, not a demo patch:

1. **Root the observer on the scroll CONTAINER, not `null`/viewport.** `vScrollRevealOnce`
   accepts a `root` (the existing `rootMargin`/`threshold` opts surface) and the demo
   binds it to `.demo-main-scroller` — so "passed" is computed in the container's
   coordinate space (the `scroll-padding-block-start: 2.5rem` offset respected), NOT
   viewport-relative `top<0`. Fixes the coordinate/root mismatch (mustFix).
2. **ONE shared page-level observer**, not 279 per-section observers + 279 rAF pairs
   (the DRY/perf mustFix — the `useStaggerReveal` shared-observer discipline). The
   directive registers each bound child with the page-level observer; the heading reveal
   is the same single-observer mechanism.
3. **A scroll-settle-reactive PASSED-SWEEP** (the deep-link/restoration close): on each
   THROTTLED scroll event of the container (and once on the router's scroll-complete /
   first post-route settle), reveal ANY bound child whose geometry shows it has PASSED
   (its `bottom` ≤ the container's top edge) and is not yet revealed — until all-revealed,
   then detach the listener. This reacts to the REAL scroll: the native-smooth path
   crosses every section (IO fires) AND the instant-jump/restoration path sweeps the
   skipped middles on the post-jump settle. NO guessed frame count.

```ts
// useStaggerReveal.ts vScrollRevealOnce — the scroll-settle-reactive shape (sketch).
// root = the bound scroll container (the demo passes .demo-main-scroller); falls back
// to the directive's own host scope. ONE observer + ONE throttled sweep, detached when done.
const reveal = (child) => { child.setAttribute("data-revealed", ""); io?.unobserve(child); pending.delete(child); };
// STATE 1 — no IntersectionObserver env: reveal ALL (the SHIPPED fallback, kept).
if (!("IntersectionObserver" in window)) { children.forEach(reveal); return; }
// STATE 3 (in-view) + STATE 4 (below-fold): the IO (rooted on the container) owns them.
children.forEach((c) => { pending.add(c); io.observe(c); });
// STATE 2 — PASSED (deep-link / restoration): a throttled container-scroll sweep, reactive
// to the REAL scroll-settle, reveals any pending child whose container-relative bottom ≤ 0.
const sweep = throttle(() => {
    const top = root.getBoundingClientRect().top;
    for (const c of [...pending]) if (c.getBoundingClientRect().bottom <= top) reveal(c);
    if (!pending.size) root.removeEventListener("scroll", sweep);   // all-revealed → detach
}, 100);
root.addEventListener("scroll", sweep, { passive: true });
// run the sweep once post-route-settle (the router scroll-complete / a single rAF after the
// route's scroll restoration commits) — NOT a fixed mount-frame guess.
```

**The CSS floor is INVERTED (mustFix — no-JS / JS-fail visible under no-preference too).**
The pass-2 `:not([data-revealed]) { opacity: 0 }` under no-preference STRANDS the heading
when JS does not land. INVERT it: **the heading paints VISIBLE by default; JS ADDS the
hide-until-revealed only when it has armed the observer.** The directive sets a
`data-reveal-armed` attribute on the section root synchronously in `mounted` (only when
`IntersectionObserver` exists); the hide rule keys off it:

```css
@media (prefers-reduced-motion: no-preference) {
    /* JS-armed ONLY: the heading hides until revealed. No-JS / JS-fail → no data-reveal-armed → visible. */
    [data-reveal-armed] .story-section__heading:not([data-revealed]) .char { opacity: 0; transform: translateY(0.4em); }
    .story-section__heading[data-revealed] .char {
        animation: gl-char-rise var(--spring-smooth-duration) var(--spring-smooth) both;
        animation-delay: calc(var(--char-index) * var(--char-stagger-step));
    }
}
.story-section__heading .char { display: inline-block; }   /* load-bearing: translateY no-ops on inline */
@media (prefers-reduced-motion: reduce) { .story-section__heading .char { opacity: 1; transform: none; } }
```

So: no-JS / directive-not-run → no `data-reveal-armed` → heading VISIBLE (the
no-preference floor holds); JS armed → hide-until-revealed → the reveal plays; PRM reduce
→ terminal-visible regardless. **The guarantee is honestly scoped: a heading cannot
strand POST-SCROLL-SETTLE** (the sweep reacts to the real scroll; the inverted floor
covers no-JS/JS-fail). The earlier "exhaustive four-state GUARANTEE" claim is WALKED BACK
— the guarantee is conditional on the scroll-settle-reactive read, stated honestly. The
acceptance set (§5) enrolls a hash-deep-link + a scroll-restoration + an F5-mid-scroll
capture proving NO strand on the REAL app scroll model (`.demo-main-scroller` + useScrollTo
smooth), chromium AND webkit.

### 2C'. Page-API — the oracle's v-if/else carve + the StoryHeroBackdrop regression fence

§2C stands (collapse-to-2: `StoryPage` D0/D2/D3 section-stack + `CategoryPage` D1 bento
over ONE `StoryPageShell`; the four user names = the conceptual depth ladder;
FLAG-FOR-USER). Pass-3 hardens THREE things:

**(a) The single-root oracle carries the arbitrary-length conditional-chain carve.**
A naive top-level-element-count===1 FALSE-REDs a legit `v-if`/`v-else` root. The
**StoryHeroBackdrop is a 6-branch chain** (`v-if="kind==='aurora'"` →
`v-else-if`×5: constellation/fourier/liquid-grid/grid/paper — verified), so
`els.length===6, chain===true`. The oracle MUST handle a chain of ANY length + the
`v-for`-root guard + `v-show` non-false-GREEN:

```js
// over the FULL catalog (121 StoryPage leaves + every routed member + the carved
// StoryHeroBackdrop), @vue/compiler-sfc raw-parse (NOT the optimized AST):
const tpl = parse(src).descriptor.template;
const els = tpl.ast.children.filter((n) => n.type === 1);   // type 1 === element
if (els.length === 1) return GREEN;                          // single element root
const has = (n, name) => n.props?.some((p) => p.type === 7 && p.name === name);  // type 7 === directive
if (els.some((n) => has(n, "for"))) return RED;              // a v-for root is a fragment risk — RED
// single-root IFF els[0] is v-if AND every later sibling is v-else / v-else-if (any length):
const chain = has(els[0], "if") && els.slice(1).every((n) => has(n, "else") || has(n, "else-if"));
return chain ? GREEN : RED;                                  // genuine fragment (no chain) → RED
```

A unit fixture proves it: a synthetic fragment REDs, a synthetic 2-branch `v-if`/`v-else`
root GREENs, the REAL 6-branch `StoryHeroBackdrop` GREENs, a `v-for` root REDs, every real
migrated leaf GREENs. **Re-run the oracle against the ACTUAL carved `StoryHeroBackdrop`
output** (the prototype's 3-branch stub `els.length===3` claim is INVALID for the real
6-branch file — mustFix).

**(b) The StoryHeroBackdrop carve mounts on the `kind` switch, NOT `variant==='hero'`
(BLOCKER REGRESSION fence).** At HEAD the backdrop mount is gated on `kind`
(`v-if="kind==='aurora'"`, …), with `fullBleed`/`bgFullBleed` as the bleed MODIFIER on
the class (`fullBleed && 'story-hero-bg--bleed'` for live; `bgFullBleed && '…--bleed'`
for static grid/paper — `bgFullBleed = fullBleed || staticBackdrop`, so a CONTENT page
with `kind: grid|paper` STILL gets the full-bleed wash — BC.W-GRID-SIMPLE). The carved
`StoryHeroBackdrop` MUST preserve this EXACTLY: mount on the 6-branch `kind` switch, thread
`fullBleed`/`bgFullBleed`/`opacityCeiling` as the bleed/opacity MODIFIERS. **Gating the
mount on `variant==='hero'` strips grid/paper washes from every content page — a confirmed
regression.** Acceptance: a real-paint capture of a NON-hero content page (a forms/grid
route) proves its full-bleed grid wash still renders after the carve.

**(c) Thread the descriptor from the shell (resolve the kind duplication).** The shell
computes the `kind`/`fullBleed`/`opacityCeiling` descriptor ONCE (the
`StoryHero.vue:121-238` logic) and passes it as PROPS to `StoryHeroBackdrop` — the carve
is a presentational backdrop, not a second descriptor computation (mustFix: stop framing
it as a pure DRY win unless the descriptor is single-sourced).

**The gate blast-radius (binding — re-point/retire BEFORE any delete).** `StoryHero.vue`
is read/referenced by **~14 proof-* gates** (verified): `proof-page-hierarchy`,
`proof-grid-simple`, `proof-hierarchy`, `proof-ba-animate`, `proof-viz-papergrid`,
`proof-page-chassis`, `proof-suffuse`, `proof-suffuse2`, `proof-split-chars`,
`proof-glass-material-unified`, `proof-substrate-staging`, `proof-hero-audacious`,
`proof-page-redesign`, `proof-customizability-census` (+ archived `wf-*` workflow
scripts, no live gate). Its REAL Vue importers are exactly **TWO** — `StoryPage.vue:6`
(rebuilt into the shell) + `SectionLanding.vue:20` (folded into `CategoryPage`); the
router/StoryHeader/settings/colors/radii references are COMMENTS (verified). The migration
ATOMICALLY re-points or retires each gate clause across the carved
`StoryHeroBackdrop`/`StoryPageShell` pair, in the SAME commit as the delete. **A clean
break that reds an unflagged gate is not a clean break** — the migration enumerates the
14-gate matrix first.

### 2D. Suffusal — unchanged + the chrome-chroma lift

§2C-suffuse stands (thread ONE warm `--field-h` route hue through every member; the field
bg, the rail fill, the section eyebrow/rail/IconChip POP all read the SAME category color
event). **VERIFY the `SectionPreviewCard` painted hue on a fresh capture FIRST** — the
warm-clamp seam is closed at HEAD (`:175` `clamp(25, var(--card-field-h, 62), 95)`,
comment `:191` "NO gray, NO teal — warm by the field-h clamp"); edit the WRITE source
(`--card-field-h`, does the D1 landing pass `warmFieldHue(categoryId)`?) ONLY on a captured
regression, never the card's read. The bar-as-chrome one-color-event exemption is RECORDED
in `proof:suffuse` (not assumed). The ONE pass-3 addition is the §1 chrome-chroma lift (the
D1 `SectionPreviewCard` chroma C 0.075 → the rail-fill's C 0.10-0.13 chrome band; CHROME
only, content untouched), **flagged for user** alongside the 4→2 collapse.

---

## 3. FILES TOUCHED

### BG.W-SCROLL-PROGRESS-GLASSY (⇐ WS1 LIBRARY recipe landed)
- `demo/layout/dock-nav.css` — rebuild `.demo-scroll-progress` as the thick glass TRACK
  + `__fill` (clip-revealed, `--scroll-fill` INHERITED, ONE animation on the TRACK, on the
  NAMED `--demo-main-progress` timeline) + `__glint` (JS-spring-lagging, PRM-dropped).
  Consume `var(--glass-blur-quiet)`. `overflow:clip` cap-reveal (NEVER `overflow:hidden`).
  The reduced-transparency firm-to-opaque arm. Register `@property --scroll-fill
  { inherits: true }` (demo-private). Mint `--scroll-rail-thickness` (√φ ~0.625rem);
  `--z-scroll-rail` (or document the literal-5 fallback, below `--z-dock:40`). The
  `--demo-main-progress` wiring (`dock-nav.css:201`) stays; the bar references it directly.
- `demo/layout/AppShell.vue` — REMOVE the library `scroll-progress` class from the bar div
  (`:393`, clean break — §0.5 LAST writer; → `class="demo-scroll-progress"`). Construct
  `useScrollTrigger(() => mainScrollerEl.value, {})` (POSITIONAL, imported directly) + the
  single-writer `--scroll-fill` watcher ONLY under `!supportsScrollTimeline()`. Wire the
  `SpringProgress` glint follower (`--glint-x`), PRM-dropped.
- `src/composables/motion/supportsCssTimeline.ts` — ADD `supportsScrollDrivenCustomProperty()`
  as a DEFENSIVE tripwire (NOT the live gate, per P1).
- `scripts/proof-ba-animate.mjs` + `tests-visual/ba-animate.spec.ts` — ADD the DEMO bar arm:
  `railHealth()` (the engine-agnostic `--scroll-fill` growth — `grew` the killer
  discriminator + no-distort caps + visible-track-at-top + ≥3:1 AA + the `overflow:clip`
  cap-reveal assert) scrolling `.demo-main-scroller` (NOT `window`). DELETE the OLD demo-bar
  scaleX assertion + the `|| (headless not reflecting)` OR-escape (`:166`). The
  LIBRARY-recipe scaleX/`currentTime` arm (scroll-vt.vue) is WS1's — UNTOUCHED (P2).
- `tests-visual/scroll-rail.spec.ts` (NEW, COMMITTED + ENROLLED) — `railHealth()` as a real
  enrolled spec running through `tests-visual/playwright.config.ts`, added to the **webkit
  project `testMatch` allowlist** (railHealth mustFix — a throwaway HTML+node runner does NOT
  satisfy "railHealth FIRST acceptance"). Runs on the PRODUCTION DOM shape (the bar pinned to
  the content column with the named timeline), NOT the isolated sticky-rail fixture.

### BG.W-SECTION-TYPEWRITER-FADEUP (⇐ WS1 `.scroll-cascade` kept; D14 only for the opt-in --columns)
- `src/components/custom/split-chars/SplitChars.vue` — add `stagger?: boolean` (default
  `true`); `:stagger="false"` omits the `.char-stagger` host (a11y preserved). PRESERVE the
  `#heading` slot branch (the no-reveal escape, RECORDED intentional). (In-fence src/ edit #1.)
- `src/styles/scheme-motion.css` — mint `--char-stagger-step` (default `30ms`); re-point
  `typography/utilities.css:158` onto it (DRY single-source, NOT a drift fix). (In-fence #2.)
- `src/composables/motion/useStaggerReveal.ts` (`vScrollRevealOnce`) — the SCROLL-SETTLE-
  REACTIVE re-architecture (§2B'.3): the IO `root` bound to the scroll container; ONE shared
  page-level observer; the throttled container-scroll PASSED-SWEEP (reveal any passed child
  until all-revealed, then detach); the synchronous `mounted` `bottom<0` loop is NOT used (it
  races the smooth scroll). The no-IO immediate-reveal fallback stays. This mutates the
  SHIPPED public motion preset — the shape is library-correct for any consumer's scroll
  container (a `proof:motion-presets`/`useStaggerReveal` no-regression check).
- `demo/stories/StorySection.vue` — default-on `revealHeading`: wrap the `<h2>` in
  `<SplitChars :stagger=false>`, mark it `class="text-subheading story-section__heading"`
  (√φ rung PRESERVED, DIRECT child of the section root), introduce the
  `.story-section__body` wrapper (`flex flex-col gap-(--section-gap)`, IS the
  `.scroll-cascade`), bind the shared reveal on the section root. Default-on section accent
  (the StorySectionHeader fold). DELETE `StorySectionHeader.vue` + re-point
  `proof-storybook-meta.mjs` M9d + remove `proof-page-hierarchy.mjs:83` (ATOMIC).
- `demo/stories/StoryPageShell.vue` (NEW) — the `.story-sections` wrapper DROPS
  `.scroll-cascade` (keeps `flex flex-col`); the page builds because each section builds.
- `demo/stories/section-entrance.css` (NEW, colocated) — the `[data-reveal-armed]
  .story-section__heading:not([data-revealed]) .char` INVERTED hide + the `[data-revealed]`
  reveal + the `display:inline-block` restate + the PRM terminal-visible arm. Re-declares
  NEITHER `gl-cascade-build` NOR `.scroll-cascade > *`.
- Metric surfaces — wire `useCountup` (import from `/motion`).

### BG.W-STORY-PAGE-API (⇐ WS1 route-enter/hero-fit/cluster-de-dup + WS4 chassis)
- `demo/stories/StoryPageShell.vue` (the shared core, single `<article>` root, hero
  top-pad-clear, the suffuse thread, the INTERNAL `body-layout` stack/bento member-selected;
  computes the backdrop descriptor ONCE).
- `demo/stories/StoryHeroBackdrop.vue` (NEW, colocated carve from StoryHero's 6-branch `kind`
  switch — mounts on `kind`, NOT `variant==='hero'`; `fullBleed`/`bgFullBleed`/`opacityCeiling`
  threaded as PROPS from the shell).
- `demo/stories/StoryPage.vue` (rebuilt — D0/D2/D3 section-stack member, ≤1-element
  ZERO-LOGIC `<StoryPageShell :depth="depthFromManifest" body-layout="stack">`, manifest-bound
  computed `:depth` — `StoryPage.vue:60` `current.value?.story.depth` MUST keep working),
  `CategoryPage.vue` (NEW — D1 `hero` bento, `<StoryPageShell :depth="'D1'" body-layout="bento">`,
  folds `SectionLanding.vue` → DELETED + re-points its router importer + the StoryHeroBackdrop
  carve reachable). **NO `ComponentPage.vue` / `SubPage.vue` new files** (P4 collapse-to-2).
- `demo/stories/StoryHero.vue` — DELETED (collapsed into shell + backdrop) AFTER the 14-gate
  blast-radius re-point.
- `demo/stories/story-hero.css` — split into colocated partials below 500L; bespoke entrance
  keyframes (`story-hero-title-rise` / `cluster-rise` / `subordinate-fade`) drained onto 2B.
- `demo/router.ts` + the 121 `<StoryPage>` compositions — depth→member mapping (StoryPage for
  D0/D2/D3, CategoryPage for D1); mechanical clean-break migration + the 7+ stale-comment
  scrub. The `#source` slot folds `Code.vue` (a per-page option at any depth); `CodeBlock.vue`
  is KEPT (the inline/block pair distinction — §6; the retire is DROPPED from scope).
- `scripts/proof-story-page-api.mjs` (NEW) — exactly ONE named member per route; ZERO
  member-specific LAYOUT logic; `:depth` the manifest-bound COMPUTED (a `depth="D2"` string
  literal REDs; a re-forked section-stack member under a new name REDs); single-element route
  root across ALL routes (the `@vue/compiler-sfc` raw-parse oracle WITH the arbitrary-length
  conditional carve, full catalog incl. the carved StoryHeroBackdrop, not a stub); the 14-gate
  blast-radius re-point recorded. Scope to member-delegation/zero-logic/full-catalog-single-root
  ONLY (proof-page-chassis covers depth-ladder/heroScale). FOLD the superseded landed page
  gates rather than stacking a 6th page-* gate.

### BG.W-STORYBOOK-SUFFUSE (⇐ WS1 field)
- `demo/stories/StoryPageShell.vue` — thread `--field-h` + `--section-label-accent`.
- `demo/stories/StorySection.vue` — default-on section accent (shared with §2B).
- `demo/stories/SectionPreviewCard.vue` — the chrome-chroma lift (C 0.075 → 0.10-0.13 band,
  CHROME only) + ONLY if a real gray regression is captured, the WRITE-source edit
  (`--card-field-h`), not the card's read (the seam is closed at HEAD).
- `scripts/proof-suffuse.mjs` — per-page ledger rows for the page-API members; the
  bar-as-chrome exemption RECORDED.

### Cross-cutting gate enrollment (make Safari REAL)
- `tests-visual/playwright.config.ts` — ADD the new WS11 specs (`scroll-rail.spec.ts` + the
  entrance/page-API/suffuse cross-engine specs) to the `webkit` project `testMatch` (currently
  the 2-spec allowlist `["safari-webgl.spec.ts","aurora-swraster.spec.ts"]` — a new spec
  silently will NOT run on webkit otherwise). Run: `npx playwright test --config
  tests-visual/playwright.config.ts --project=webkit`. **The entrance spec MUST be enrolled**
  (paint-prove the heading reveal on real WebKit, not just Chromium).

---

## 4. WAVE BREAKDOWN (the BG.W-* set)

1. **`BG.W-SCROLL-PROGRESS-GLASSY`** ⇐ WS1 LIBRARY recipe. The demo bar STOPS composing
   `.scroll-progress` (clean break, §0.5) → the thick glass TRACK + clip-revealed FILL
   (inherited `--scroll-fill`, ONE animation, on the NAMED `--demo-main-progress` timeline,
   `overflow:clip` caps) + a JS `SpringProgress` lagging glint. `backdrop-filter:
   var(--glass-blur-quiet)`. Native ships Chromium AND Safari (P1); JS fallback gated on
   `!supportsScrollTimeline()`. Reduced-transparency firms to opaque. Truth on the fill,
   liquid weight on the glint. Hero top-pad-clear; ≥3:1 AA; z below dock; no glass-on-glass
   stack. `railHealth()` committed as an enrolled spec on both engines (`grew` the killer
   tooth). ba-animate gains the DEMO arm (P2); the LIBRARY arm (WS1) untouched.
2. **`BG.W-SECTION-TYPEWRITER-FADEUP`** ⇐ WS1 (`.scroll-cascade` kept). The §2B' DECOUPLE:
   `.story-sections` drops `.scroll-cascade`; each StorySection composes two disjoint sibling
   registers — the heading (`<SplitChars :stagger=false>` on the `text-subheading` √φ rung,
   per-glyph reveal) + the `.story-section__body` (`flex flex-col gap-*`, the REUSED
   `.scroll-cascade`). The strand-proof RE-ARCHITECTED (scroll-settle-reactive shared
   observer rooted on the container + the passed-sweep + the INVERTED CSS floor). Two in-fence
   src/ edits (the prop + `--char-stagger-step`). `#heading` slot = no-typewriter (recorded).
   PRM/no-JS terminal-visible, CLS≈0, no double-bind. ATOMIC StorySectionHeader fold + gate
   re-point.
3. **`BG.W-STORY-PAGE-API`** ⇐ WS1 + WS4. ONE `StoryPageShell` core + TWO ≤1-element
   ZERO-logic named members (`StoryPage` D0/D2/D3 section-stack, manifest-bound `:depth` +
   `CategoryPage` D1 `hero` bento). NO ComponentPage/SubPage new files (P4; the four names are
   the conceptual ladder, FLAG-FOR-USER). `StoryHeroBackdrop` carve (mounts on `kind`, NOT
   `variant==='hero'`; descriptor threaded as props; the 14-gate blast-radius re-pointed
   ATOMICALLY). `SectionLanding` folded into `CategoryPage`; `StoryHero`/`story-hero.css`
   collapsed below 500L; single route root across the FULL migrated catalog (the oracle WITH
   the arbitrary-length conditional carve); `proof:story-page-api` minted (zero-logic +
   manifest-bound-depth + single-root + the two anti-fork bites) + the superseded page gates
   folded. THE capstone the others feed into.
4. **`BG.W-STORYBOOK-SUFFUSE`** ⇐ WS1 (field). Thread ONE warm `--field-h` route hue through
   every member (rail fill + section eyebrow/rail/IconChip); default-on section accent; the
   chrome-chroma lift (CHROME only, FLAG-FOR-USER); VERIFY the SectionPreviewCard hue (edit
   the WRITE source only on a real captured regression). One-color-event fences preserved;
   both modes.

**Intra-WS sequence:** 1 and 2 independent (parallel). 3 lands AFTER 1+2 (composes the bar +
entrances into the shell). 4 LAST. All four HARD-gate on WS1/WS4 (§0) — each opens with the
precondition HEAD-check.

---

## 5. ACCEPTANCE / REAL-PAINT-π BAR

PAINT IS THE GATE. The headless-green/visually-broken trap shipped the hairline 3×; every
WS11 acceptance is a FRESH LIVE capture by a NON-authoring agent on a real GPU, **Chrome AND
real Safari/WebKit** (the webkit testMatch enrollment), `:5199`, both modes.

**Order of operations (binding):**
1. **The `railHealth()` enrolled spec FIRST** — committed `scroll-rail.spec.ts` running on
   chromium AND webkit, on the PRODUCTION DOM shape (named timeline, the bar pinned to the
   content column). `grew` is the KILLER discriminator (a stuck/dead bar has perfect no-drift
   — `grew` brackets stuck-low/high; `noDrift` brackets runaway/oscillation; both ship, the
   gate is built on `grew`). Force the JS fallback (stub the probe → false) → the JS writer is
   the SOLE live writer. Assert `(currentTime != null) AND grew` on the INTEGRATED tree (real
   dock/contain/overflow contexts — animCount/animationTimeline look healthy while a timeline
   is silently dead).
2. Stand up the integration branch (WS1+WS4 landed, §0 HEAD-checks GREEN).
3. The four-arm acceptance captures.

**The engine-agnostic gate predicate (`railHealth()` — `grew` load-bearing):**

```ts
async function railHealth(page, fillSel) {
    const read = () => page.$eval(fillSel, (el) =>
        getComputedStyle(el).getPropertyValue("--scroll-fill").trim());     // MAIN-THREAD → reliable (P1)
    const scrollPort = (frac) => page.$eval(".demo-main-scroller", (el, f) => {
        el.scrollTop = el.scrollHeight * f;                                 // the inner port, NOT window
    }, frac);
    await scrollPort(0);  const atTop = await read();                       // "0%" at scroll-top
    await scrollPort(0.8); const at80 = await read();                       // grows monotonically
    await page.waitForTimeout(400); const at80b = await read();
    const grew = parseFloat(at80) > parseFloat(atTop) + 10;                 // THE KILLER: the bar MOVED
    const noDrift = Math.abs(parseFloat(at80b) - parseFloat(at80)) < 1;     // brackets runaway/oscillation
    const native = await page.evaluate(() => CSS.supports("animation-timeline: scroll()"));
    let timelineOk = true, currentTimeOk = true;
    if (native) {
        timelineOk = await page.$eval(fillSel, (el) => {
            const t = getComputedStyle(el).animationTimeline;
            return t !== "auto" && t !== "none";                            // the named timeline resolves
        });
        currentTimeOk = await page.$eval(".demo-scroll-progress", (el) => {
            const a = el.getAnimations().find((x) => x.animationName === "gl-scroll-fill");
            return a == null || a.currentTime != null;
        });
    } else { timelineOk = grew; }                                           // Safari<26 / JS: grew proves the writer
    return grew && noDrift && timelineOk && currentTimeOk;
}
```

**Bar:** `railHealth()` GREEN on EVERY route, chromium AND webkit, both modes. The TRACK
visible (empty channel) at scroll-top; fill caps UNDISTORTED 0→100% (the rounded-leading-cap
question resolved on the capture — §2A); thick (≥8px) + glassy (frost diffuses content
behind) + depth (groove inset + separation lift + specular edge). AA both modes (fill-graphic
≥3:1). Safari<26 / probe-false: JS fallback writes `--scroll-fill` → GREEN (force-tested by
stubbing the probe). PRM: fill TRACKS, only the glint drops. Reduced-transparency: track firms
toward opaque, fill still tracks. Glass-on-glass: the bar reads as the ONE chrome glass. Hero
first content clears the bar at scroll-top; CLS≈0. **VISUAL gap closed:** a non-authoring
real-GPU capture (Control-Center recessed-channel read, glass-on-glass AA, the SpringProgress
glint follower, the cap question) in both modes, Chrome AND real Safari — railHealth GREEN is
NECESSARY, not SUFFICIENT.

**Entrances:** a BELOW-FOLD heading reveals per-glyph on CROSSING (`firstChar.getAnimations()`
0→1, `gl-char-rise`), NOT at load (Chromium PROVEN + **re-proven on real WebKit/Safari 26** —
the entrance spec enrolled). **The COMBINED disjoint capture** (heading per-glyph rise AND
body cel `view()` cascade together, on a HERO-page StorySection): DISJOINT, no compounded
section-block-translate × char-rise muddiness, no node double-binds two `animation`s (read
`getAnimations()` per node) — on Chromium AND real WebKit 26 (the `gl-char-rise` keyframe is
net-new, untested cross-engine in-combination). **The strand-proof:** a hash deep-link + an
F5-mid-scroll + a back-nav restoration on the REAL app scroll model (`.demo-main-scroller` +
useScrollTo smooth) — every passed-section heading VISIBLE (no opacity:0 strand), chromium AND
webkit, both modes; the INSTANT-JUMP restoration (sections skipped by the jump) captured
explicitly, not only the native-smooth path. The PER-CATEGORY SWEEP (~105 default-on headings:
long/special-char/nested-in-card) is the floor. The `#heading` SLOT carve: no per-glyph
reveal, terminal-visible. PRM/no-JS: heading + body terminal-visible. CLS≈0. The opt-in
`.scroll-cascade--columns > *` `animation-range !== 'normal'` (the WS4 D14 fix — RED until WS4
lands; the BASE cascade does NOT need it). a11y: the heading's accessible name is the FULL
text (`aria-label`), glyphs `aria-hidden`.

**Page-API:** every routed page composes exactly ONE named member (StoryPage or CategoryPage),
ZERO member-specific LAYOUT logic, `:depth` the manifest-bound computed (`proof:story-page-api`,
FULL migrated catalog, the raw-parse oracle WITH the arbitrary-length conditional carve —
incl. the carved 6-branch StoryHeroBackdrop GREEN). The two anti-fork bites RED. Each route
presents exactly ONE element root; the bare-swap does not wedge (5-nav burst:
`main.children.length===2`, `h1===last-dest`) across the FULL catalog. **The carve regression
capture:** a NON-hero content page (forms/grid route) renders its full-bleed grid wash after
the StoryHeroBackdrop carve (no BC.W-GRID-SIMPLE regression). The 14-gate blast-radius is
GREEN post-re-point (none red unflagged). depth→heroScale renders the √φ ladder (D0>D1>D2>D3);
`proof:page-hierarchy` + `proof:hierarchy` H2 green. One-GL-per-route preserved (D1 bento =
frozen stills).

**Suffuse:** a per-page gestalt capture across categories — NO gray/flat page; the rail fill +
section eyebrow/rail read the SAME category `--field-h`; the SectionPreviewCard reads warm at
the lifted chrome chroma; body ink untinted; `proof:suffuse` d1-d3 green; both modes.

**The capstone:** the `proof:ba-gestalt` BG roster verdict for the four storybook surfaces
(scroll-rail · section-entrance · page-API · suffuse), re-earned on fresh captures, Chrome AND
Safari.

---

## 6. FOLDED / DEFERRED ITEMS

- **The page-API member count** — DECIDED (P4): ship **TWO** (StoryPage section-stack over
  D0/D2/D3 + CategoryPage bento D1); the four user NAMES survive as the conceptual depth
  ladder. **FLAGGED FOR USER CONFIRMATION** (the directive literally names all four). The
  zero-logic shell makes re-expansion mechanical/reversible.
- **The chrome-chroma punch lift** (D1 bento card C 0.075 → C 0.10-0.13 chrome band) —
  flagged for user alongside the collapse; CHROME only, content untouched.
- **The timeline-source** — RESOLVED to the already-wired NAMED `--demo-main-progress`;
  `scroll(nearest block)` RETIRED from the spec (topology-fragile).
- **The strand-proof** — RE-ARCHITECTED to a scroll-settle-reactive shared observer; the
  synchronous mount loop AND any fixed-rAF defer are FORBIDDEN (they race the smooth scroll).
- **`CodeBlock.vue` → `Code.vue` retire** — RE-EVALUATED as a CONTRIVANCE per KISS: `Code` is
  the INLINE chip, `CodeBlock` the BLOCK plate (distinct BC.W-CODE-BLOCKS rungs, both used by
  `display/card.vue`); `CodeBlock` is demo-private → ≥2-consumer-EXEMPT. **DROP the CodeBlock
  retire from WS11 scope**; the `#source` slot composes `CodeBlock`.
- **The dynamic OKLCH spectrum fill** for the rail — DEFERRED (static CSS gradient, demo
  chrome, KISS).
- **`scroll-vt.vue` bar + the legacy `[data-scroll-reveal]` migration** — WS1 owns it.
- **`useTypewriter` on section headings** — REJECTED (mount-not-IO / per-char CLS /
  below-fold-invisible); reserved for the D0 front-door hero. `animation-trigger` (Chrome
  145/146) is the recorded successor; the IO directive is the cross-engine floor.

---

## 7. OPEN RISKS (the falsifier each acceptance step kills)

1. **(SETTLED) Safari custom-property-via-scroll** — P1 proved WebKit 26.4 reflects
   `--scroll-fill` live. Gate is the simple `!supportsScrollTimeline()`. RESIDUAL: the
   `railHealth()` enrolled spec on the PRODUCTION DOM shape (build=false, owed).
2. **(RESOLVED-design) The heading×block double-motion** — the §2B' decouple resolves it
   architecturally. **Falsifier:** a muddy heading capture on the integrated HERO-page tree →
   re-architect. RESIDUAL: the COMBINED disjoint capture on real WebKit 26 is owed.
3. **(RE-ARCHITECTED) The deep-link strand** — CONFIRMED default-on bug + the synchronous loop
   is dead-on-arrival vs `useScrollTo` smooth. The scroll-settle-reactive shared observer + the
   container-rooted IO + the INVERTED CSS floor resolve it. **Falsifier:** an instant-jump
   restoration heading stranding at opacity:0 even after the passed-sweep → revealHeading is
   unsafe default-on.
4. **(RESOLVED-design) The oracle conditional blind spot** — the arbitrary-length carve + the
   `v-for` guard + the unit fixture (incl. the real 6-branch StoryHeroBackdrop) resolve it.
   **Falsifier:** the carve red-flags a real conditional-root leaf over the full catalog.
5. **The StoryHeroBackdrop carve REGRESSION** — the carve must mount on the `kind` switch
   (not `variant==='hero'`) with the bleed modifier preserved, and the 14-gate blast-radius
   re-pointed ATOMICALLY. **Falsifier:** a content forms/grid route loses its full-bleed grid
   wash (BC.W-GRID-SIMPLE regression) or an unflagged gate reds at the StoryHero delete.
6. **The 121-file migration churn** — the mechanical rewrite + the `SectionLanding` fold (2
   real importers, P5) + the `StoryHero` 6-branch absorption must not re-introduce a fragment
   route root. **Falsifier:** the raw-parse oracle over the FULL catalog + a 5-route bare-swap
   burst.
7. **Sequencing fragility** — WS11 HARD-depends on WS1+WS4; the integration branch does NOT
   exist; D14 is STILL broken. Each wave opens with the §0 HEAD-check; WS11 never re-fixes a
   foreign wave.
8. **Stale-edit waste** — the SectionPreviewCard gray seam is closed at HEAD; VERIFY the
   painted hue first, edit the WRITE source only on a captured regression.

---

## 8. UNCONVERGED FRONTIER (the next-pass brief — pure EXECUTION on a tree that does not exist)

The DESIGN is converged (P1-P5 + the §2B' decouple + the scroll-settle-reactive strand-proof +
the oracle conditional carve + the StoryHeroBackdrop kind-switch regression fence + every
critique mustFix folded). The WORKSTREAM gate (real-paint on the integrated tree, Chrome AND
Safari) is UNMET because these are spec-stated but un-EXECUTED:

0. **(THE BLOCKER) The integration branch does not exist** — `git diff master..HEAD -- src/
   demo/` EMPTY (verified 2026-06-28). WS1 (route-enter, `.scroll-build` retire, LIBRARY
   `.scroll-progress` fix, field) + WS4 (D14 `%`-off-`--col`, `_chassis/` delete,
   ShowcaseFrame-is-cel) must LAND CODE first; confirm the §0 per-wave HEAD-checks GREEN.
1. **The railHealth enrolled spec** — committed `scroll-rail.spec.ts` proving the teeth
   distinguish live-from-dead (`grew` load-bearing) on chromium AND webkit, on the PRODUCTION
   DOM shape, with the forced JS fallback.
2. **The §2B' decouple captured** — the COMBINED heading per-glyph × body cel-cascade DISJOINT,
   no muddiness, no double-bind, on the integrated HERO-page tree, Chromium AND real WebKit 26.
3. **The strand-proof captured** — deep-link + INSTANT-JUMP restoration + F5-mid-scroll + the
   per-category sweep, no opacity:0 strand, on the REAL app scroll model, Chrome AND Safari.
4. **The 121-file migration exercise** — the collapsed StoryPage/CategoryPage shell rendered,
   the migration run, single-element root over the FULL catalog (the oracle + the conditional
   carve), the StoryHeroBackdrop 6-branch carve surviving one-GL-per-route + the content-page
   grid-wash regression capture + the 14-gate blast-radius GREEN.
5. **Real Safari/WebKit execution** — the webkit testMatch enrollment RUN (the entrance + rail
   + page-API specs on real WebKit 26).
6. **USER CONFIRMATION** — the 4-name → 2-component collapse + the chrome-chroma punch lift
   (both deviate from / extend the literal ask; the cheapest things to get wrong at scale).

Next pass: stand the integration branch (WS1+WS4 GREEN), RUN railHealth on both engines FIRST,
build the §2B' decouple + the scroll-settle-reactive strand-proof + the collapsed shell + the
kind-switch-preserving StoryHeroBackdrop carve, run the migration, then the four-arm acceptance
on Chrome AND real Safari. Obtain user confirmation on ship-2 + the chrome punch.
