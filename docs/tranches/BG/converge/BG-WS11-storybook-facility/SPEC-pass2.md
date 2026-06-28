# BG-WS11-storybook-facility — SPEC-pass2

Storybook facility: a FUNCTIONING thick glassy scroll-progress rail · section
typewriter + fade-up entrances on liquid-weight spring clocks · ONE standardized
page-API component family every page composes · consistent per-category suffusal.
Both modes, Chrome AND real Safari, real-paint is the gate.

> **What pass-2 ADVANCES (it does not restart).** Pass-1 is build-ready in
> isolation. Pass-2 closes the integration-coherence frontier the research fleet
> surfaced: **(1)** the WS1↔WS11 demo-bar contradiction (RISK-2 — WS1 ships a
> scaleX bar + a `getAnimations().currentTime` gate; WS11 ships a clip-path bar +
> a `getComputedStyle` gate — both editing one `ba-animate`) is RESOLVED by a
> clean-break ownership split; **(2)** the load-bearing **Safari
> custom-property-via-scroll** assumption (RISK-3 — `supportsScrollTimeline()`
> probes only `scroll()` value support, not custom-property interpolation) is
> de-risked with a capability probe + a prototype that runs FIRST; **(3)** the
> concrete spec-code bugs (positional `useScrollTrigger`, `railHealth()` scrolls
> the wrong element, the SECOND in-fence `30ms` edit) are corrected; **(4)** the
> stale suffuse seam, the StorySectionHeader gate-zombie, the named-timeline
> over-dependency, the WS8 over-claim, and the Apple-HIG glass-on-glass /
> reduced-transparency arms are folded. This is still spec-convergence; the
> WORKSTREAM gate (real-paint on the integrated tree, Chrome AND real Safari) is
> the un-EXECUTED frontier (§8) — gated on the integration branch standing up.

---

## 0. SEQUENCING — WS11 ELEVATES, it does not re-fight (binding)

WS11 is the storybook *apotheosis* layered on three landed workstreams. It
ABSORBS their outcomes and HARD-depends on them; it does NOT re-propose, re-fix,
or re-mint what they own. **At HEAD (`tranche/BG @e6682c7e`) the integration
branch does NOT exist — `git diff master..HEAD -- src/ demo/` is EMPTY. Every
WS1/WS4 precondition is UNLANDED.** WS11 cannot open a single wave today; the
true frontier step is standing up the integration branch (§8 #0).

| Owns | Workstream | The fact WS11 consumes |
|---|---|---|
| Route transition + scroll-progress CORRECTNESS + hero-fit + the field | **WS1** | bare keyed `<component :is :key=route.path class=route-enter>` swap (NO `<Transition>`); `.scroll-build` RETIRED wholesale; `.scroll-cascade`/`.scroll-pin`/`.smooth-scroll` KEPT; the **LIBRARY** `.scroll-progress` recipe corrected to `scaleX(0)` floor + `scroll(nearest block)` (for `scroll-vt.vue` + external consumers); ONE shell `<Aurora>` with per-route `warmFieldHue` + `--field-h` (warm `[25,95]`) |
| Chassis consolidate + scroll-shrink + D14 | **WS4** | `DemoFrame.vue`/`demo-frame.css` DELETED (truly-dead `_chassis/`); `ShowcaseFrame` is THE demo-cel chassis; **D14 cascade-columns fixed to a `%`-off-`--col` form** (`scroll-choreography.css:235-239`, still the `* 0` UNIT-INVALID `calc(% + ms)` bug at HEAD); `Code.vue` the surviving code primitive |
| Glass-deep apotheosis | **WS8** | `--glass-blur-deep-*` / `.glass-deep` / `--glass-depth` exist (they PRE-DATE WS8 — BB.W-DEEP-GLASS). **The bar does NOT consume deep glass** (§0.6) |

**Per-wave precondition HEAD-check (the FIRST acceptance step of every WS11
wave).** A wave that opens against an un-landed precondition STOPS — it does NOT
re-fix the precondition (foreign-wave fence). The checks:

1. `.scroll-build` is GONE from `StoryPage.vue` + `SectionLanding.vue` +
   `scroll-choreography.css` + `glass/liquid-enter.css` (WS1).
2. `scroll-choreography.css:235-239` reads the `%`-off-`--col` form, NOT
   `... * 0` and NOT the `calc(% + ms)` unit error → `animation-range !== normal`
   (WS4 — RED until landed; the §2B body-cascade arm consumes it).
3. The demo bar div no longer carries the library `.scroll-progress` class — OR
   WS11's own BG.W-SCROLL-PROGRESS-GLASSY is the wave that strips it (§0.5: WS11
   is the LAST writer on that div, so this check is "WS1's LIBRARY recipe is the
   `scroll(nearest block)` scaleX floor", not "the demo bar is fixed").
4. `ShowcaseFrame` is the demo cel; `_chassis/` (`DemoFrame`/`demo-frame.css`) is
   deleted (WS4).
5. `--glass-blur-quiet` resolves to the WHOLE composite
   (`blur(...)·level saturate brightness`, `tokens/glass.css:140`) — already true
   at HEAD; the bar consumes it directly.

**RETIRED precondition (pass-1 over-claim).** Pass-1 §0 listed "the named
`--demo-main-progress` timeline declared on `.demo-main-scroller`" as a
WS1-delivered precondition. **WS11's bar no longer depends on it** (§0.5 — the bar
uses `scroll(nearest block)`, resolving to its sticky-parent scroller). The named
timeline stays reserved for `scroll-vt.vue` (WS1's genuine cross-element case).

---

## 0.5. THE WS1↔WS11 DEMO-BAR OWNERSHIP RESOLUTION (RISK-2 — the headline)

The research fleet found a build-blocking incoherence: **WS1 pass4-CONVERGED M4
and WS11 §2A specify MUTUALLY-EXCLUSIVE bars and gates**, both editing
`proof-ba-animate.mjs` + `ba-animate.spec.ts`. Verified against the live specs:

| Axis | WS1 pass4 M4 (`SPEC-pass4-converged.md:164-186`) | WS11 §2A (pass-1) |
|---|---|---|
| mechanism | `transform: scaleX(0→1)` | `clip-path` off `@property --scroll-fill` (scaleX FORBIDDEN as "a LIE") |
| timeline | `scroll(nearest block)`, named reserved for scroll-vt | NAMED `--demo-main-progress` |
| gate primary | `getAnimations()[0].currentTime` + bbox delta ("NOT getComputedStyle") | `getComputedStyle('--scroll-fill')` (main-thread, engine-agnostic) |
| glint | "spring-eased trailing-glint on the fill edge" on the scaleX bar | JS `SpringProgress` follower on the clip-path bar |

If WS1 lands its scaleX bar + scaleX gate, WS11 must demolish and rewrite both —
a foreign-wave-fence violation in BOTH directions, and the single `ba-animate`
gate flips RED for whichever bar is not current.

**THE RESOLUTION — ONE owner per element, two disjoint recipes, two disjoint gate
arms. No collision, no throwaway intermediate.** The key move is a clean break
already in pass-1 (§2A) made LOAD-BEARING here:

> **The demo bar STOPS composing the library `.scroll-progress` class entirely.**
> Once the class is gone (`AppShell.vue:393` → `<div class="demo-scroll-progress"
> …>`, clean break), the demo bar does NOT ride WS1's scaleX recipe AT ALL — so
> there is nothing to contradict. The two recipes live on two elements:

- **WS1 OWNS the LIBRARY `.scroll-progress` recipe** (`scroll-driven.css`): the D5
  root fix — `scaleX(0)` unconditional floor + `scroll(nearest block)`. Its
  consumers are `scroll-vt.vue` + external. Its `ba-animate` teeth read
  `getAnimations().currentTime` + bbox-width (correct: scaleX CAN go
  off-main-thread on WebKit, so `getComputedStyle(transform)` is unreliable for
  THAT recipe). **WS11 does not touch this.**
- **WS11 OWNS the DEMO bar** `.demo-scroll-progress` (`dock-nav.css` +
  `AppShell.vue:393`): the self-contained thick glass TRACK + clip-revealed FILL
  off `@property --scroll-fill`, on `scroll(nearest block)` (NOT the named
  timeline). Its `ba-animate` teeth read `getComputedStyle('--scroll-fill')`
  (correct: a registered custom property feeding `clip-path` is MAIN-THREAD →
  reliable on Chromium AND WebKit AND the JS fallback). **WS11 deletes the OLD
  demo-bar scaleX assertion** (the `|| (headless not reflecting)` OR-escape at
  `ba-animate.spec.ts:166` goes with it) and replaces it with `railHealth()`.

So `ba-animate` carries TWO disjoint arms: a LIBRARY-recipe scaleX/currentTime arm
(WS1, binds `.scroll-progress` on `scroll-vt.vue`) AND a DEMO-bar
clip-path/`--scroll-fill` arm (WS11, binds `.demo-scroll-progress`). Different
elements, different recipes, different signals — they coexist GREEN
simultaneously. **This coexistence is prototype P2 (the architecture risk).**

**The integration-branch sequencing (binding).** WS1 M4 lands the LIBRARY recipe
(scaleX floor + `scroll(nearest block)` + drop `--scroll-progress-scroller`).
**WS11's BG.W-SCROLL-PROGRESS-GLASSY is the LAST writer on the demo bar div** — it
removes the `.scroll-progress` class and rebuilds `.demo-scroll-progress`
self-contained. If they land in one coordinated commit, WS11 writes the demo div
last; if WS1 lands first, WS11 strips the class. Either way the demo bar's FINAL
form is WS11's. WS1 must NOT add the "spring-eased trailing-glint" to the demo bar
(its M4:186 liquid-law line scopes to the demo bar today) — that glint is WS11's
JS `SpringProgress` follower; WS1's glint, if any, rides the LIBRARY recipe only.

---

## 0.6. THE WS8 OVER-DEPENDENCY + the named-timeline drop (reconciled)

Two pass-1 §0 over-claims, corrected:

- **The bar does NOT consume `--glass-blur-deep`.** Pass-1 §0 claimed the bar's
  "glassy" CONSUMES `--glass-blur-deep-*`. The §2A recipe consumes
  `var(--glass-blur-quiet)` (a HEAD fact). **DECISION: keep the bar on
  `--glass-blur-quiet`** — it is a thin chrome strip, and Apple's HIG (web-sota
  arm 2A) says chrome should be the LIGHTER material, the content layer the
  deeper. Deep glass is content-tier; the chrome rail riding quiet is correct.
  The WS8 precondition for the BAR is therefore SOFT (the deep tokens need not
  resolve for the bar to build). WS8 stays a hard precondition only where the
  page-API SHELL composes deep-glass content surfaces.
- **The bar uses `scroll(nearest block)`, not the named timeline** (§0.5). The
  `.demo-scroll-progress` is a `position: sticky` CHILD of `.demo-main-scroller`
  (WS1 M4:182), so `scroll(nearest block)` resolves to that scroller — the simpler
  and more-robust form, matching WS1. The named-timeline dependency is DROPPED.

---

## 1. GESTALT GOAL

The storybook reads like a single coherent iOS-27 document system — the reference
north-star is the user's own dark-mode iOS captures (Apple Music page system +
Control-Center recessed-channel slider + Maps), `scratchpad/evidence/frames/`:

- **A FUNCTIONING glass progress rail** at the top of every route — a thick
  (~10px, √φ over a 6px baseline) frosted RECESSED CHANNEL with a luminous
  warm→route-hue fill that CLIP-REVEALS from one end (rounded caps undistorted —
  the iOS-26.2 Liquid-Glass-slider gestalt), with a spring-LAGGING leading glint.
  Always render the empty channel at scroll-top (a zero-width sliver fails the
  reference). The D5 full-width slab is dead; WS11 makes the corrected bar
  beautiful + integrated — depth (groove inset + separation lift + specular top
  edge) reads it as floating glass above content, NOT a 2px hairline.
- **Sections that TYPEWRITER and FADE UP on scroll-entry** — headings reveal
  per-glyph (a calm iOS-materialization wipe, NOT a bouncy spell-out) as they
  cross into view; bodies lift+fade on their own `view()` timeline. On the spring
  clocks (`--spring-smooth` + `--spring-smooth-duration`), never linear. PRM-safe
  by construction (text never strands invisible); CLS≈0 (no per-glyph reflow).
- **ONE standardized page-API family** — `StoryPage`/`CategoryPage`/`ComponentPage`/`SubPage`
  over a shared `StoryPageShell` core, mapped onto the EXISTING `StoryDepth`
  D0-D3 ladder (depth IS size, the √φ display ladder). Supersedes the ad-hoc
  `StoryPage`-variant-branching + the parallel `SectionLanding` one-off. Clean
  break, no legacy alias.
- **Consistent suffusal** — ONE warm `--field-h` route hue threaded through every
  member: the field bg, the rail fill, the section eyebrow/rail/IconChip POP all
  read the SAME category color event. The LOUD color lives on hero/tile chrome;
  body ink stays untinted (the one-color-event proportion). No page reads
  gray/flat; warm-cream identity; both modes.

The four arms are ONE system: the page-API family is the chassis the bar, the
entrances, and the suffusal all hang off.

---

## 2. MECHANISM (concrete, idiomatic — every mustFix folded; spec-code bugs fixed)

### 2A. The thick glass progress rail (BG.W-SCROLL-PROGRESS-GLASSY)

**Why a thickened scaleX bar is forbidden** (three falsifiers): (a) `scaleX(0→1)`
on a thick pill squashes its end-caps to ellipses and at `scaleX(0)` shows no
TRACK; (b) `backdrop-filter` on a 10px strip blurs a negligible area → a thin
bar's glass is RIM + TINT + SPECULAR + GROOVE, not blur (kube.io / Liquid-Glass
"lensing not scatter"); (c) `proof:no-layout-animation` forbids animating
`width`/`height`. The honest architecture is a TRACK + a clip-revealed FILL with a
single-writer inherited `--scroll-fill`.

**The recipe (the four bar mustFixes baked in):**

```css
@property --scroll-fill { syntax: "<percentage>"; inherits: true; initial-value: 0%; }

.demo-scroll-progress {                       /* the TRACK — always visible, the ONE writer */
    position: sticky; inset-block-start: 0;
    z-index: var(--z-scroll-rail, 5);          /* above content, BELOW --z-dock:40 / --z-overlay:50 */
    pointer-events: none;
    block-size: var(--scroll-rail-thickness, 0.625rem);   /* √φ-proportioned, ~10px */
    border-radius: var(--radius-pill);
    overflow: clip;                            /* the caps belong to the TRACK clip */
    background: var(--glass-bg-quiet);
    backdrop-filter: var(--glass-blur-quiet);  /* FIX#1: the WHOLE composite, never blur(var(composite)) */
    box-shadow:                                /* inner GROOVE + separation lift — carries depth w/o blur */
        inset 0 1px 2px color-mix(in srgb, var(--foreground) 14%, transparent),
        0 1px 3px color-mix(in srgb, var(--shadow-color) 24%, transparent);
}
.demo-scroll-progress__fill {                  /* the FILL — clip-revealed, undistorted caps */
    position: absolute; inset: 0;
    background: linear-gradient(90deg,
        var(--card) 0%,                                    /* FIX#3: warm-cream start, NO oklch(from …) */
        oklch(0.78 0.13 var(--field-h, 60)) 100%);         /* → route hue (suffusion) */
    clip-path: inset(0 calc(100% - var(--scroll-fill)) 0 0 round var(--radius-pill));  /* compositor-safe */
    border-block-start: 1px solid color-mix(in srgb, white 28%, transparent);  /* specular top edge */
}
@supports (animation-timeline: scroll()) {     /* FIX#4: @supports ONLY, NEVER prefers-reduced-motion gate */
    @keyframes gl-scroll-fill { from { --scroll-fill: 0%; } to { --scroll-fill: 100%; } }
    .demo-scroll-progress {                    /* FIX#2: ONE animation on the TRACK; fill/glint inherit --scroll-fill */
        animation: gl-scroll-fill auto linear;
        animation-timeline: var(--scroll-progress-timeline, scroll(nearest block));  /* §0.6: nearest, not named */
    }
}
/* reduced-transparency (a SEPARATE axis from reduced-motion — web-sota arm 2A):
   firm the track toward opaque; the groove+rim carry the silhouette without blur. */
@media (prefers-reduced-transparency: reduce) {
    .demo-scroll-progress { --glass-level: 0; backdrop-filter: none; background: var(--card); }
}
```

- **FIX#1 — consume the WHOLE composite.** `--glass-blur-quiet` IS
  `blur(8px·level) saturate(…) brightness(…)` (`tokens/glass.css:140`).
  `blur(var(--glass-blur-quiet))` double-wraps → invalid → ZERO blur. Use the
  composite directly. Never `url()` (WebKit bug 245510). Under
  `prefers-reduced-transparency: reduce` the composite resolves to `none` already
  (a11y-fallback.css), so the firm-to-opaque arm is the honest floor.
- **FIX#2 — ONE animation on the TRACK; everything reads `--scroll-fill` by
  inheritance** (`@property{inherits:true}`). DRY; "exactly 1 animation" is now
  literally true.
- **FIX#3** — start stop is `var(--card)`, not `oklch(from var(--card) l c h)`
  (reconstructs `--card` for zero gain + a Safari floor).
- **FIX#4 — the drive sits under `@supports` ONLY, never the no-preference gate**
  (that no-preference-only gating IS the D5 dead-bar root). The fill is an
  INFORMATIONAL position cue (the shipped FadingScroll
  `@property-under-@supports-only` precedent, `base-misc.css:96-110`), so it tracks
  under PRM and on Safari<26. Only the glint drops under PRM.

**The strip-reserve, no occlusion.** No negative margin (the occlusion trap).
`StoryPageShell`'s hero reserves `padding-block-start: var(--scroll-rail-thickness)`
+ the scroller carries `scroll-padding-block-start: var(--scroll-rail-thickness)`.
Gate: at scroll-top the hero's first painted content `getBoundingClientRect().top
≥` the bar's `bottom`.

**The drive signal is `--scroll-fill` itself, and it is MAIN-THREAD.** A
registered custom property on a `scroll()` timeline is NOT compositor-accelerated
(it can feed any `var()` → recomputed main-thread each frame), so
`getComputedStyle(fill).getPropertyValue('--scroll-fill')` reflects the live value
on Chromium AND WebKit AND the JS fallback — the engine-agnostic primary.
`getAnimations()` `currentTime` is the Chromium-only refinement. **⚠ This
main-thread reflection on WebKit is the load-bearing UNVERIFIED assumption — see
§2A.bis + prototype P1.**

**§2A.bis — THE SAFARI CUSTOM-PROPERTY-VIA-SCROLL FALSIFIER (RISK-3, new).**
`supportsScrollTimeline()` (`supportsCssTimeline.ts:38`) probes ONLY
`CSS.supports("animation-timeline", "scroll()")` — i.e. that the engine ACCEPTS a
`scroll()` timeline value. It does NOT probe whether the engine INTERPOLATES a
registered custom property animated on that timeline. Safari 26 has full
scroll-driven-animation support, so it PASSES the probe — but custom-property
interpolation via scroll-driven animation is a Chromium-forward capability, and if
WebKit does not interpolate `--scroll-fill`, the NATIVE path silently paints a dead
0%/100% bar WHILE `supportsScrollTimeline()===true` gates the JS fallback OFF →
**a dead bar on the exact "Chrome AND Safari" engine the directive demands** (the
headless-green/visually-broken trap transposed to a feature-detect blind spot).

Resolution — a NARROWER capability probe + the FadingScroll de-risking proxy:

```ts
// supportsCssTimeline.ts — ADD (the bar's actual need, not just scroll() value support)
export function supportsScrollDrivenCustomProperty(): boolean {
    // The shipped FadingScroll recipe (base-misc.css:96-110) animates a registered
    // @property <length-percentage> on scroll(self). If THAT engine reflects the
    // live value, the bar's --scroll-fill does too. The runtime probe is a one-shot
    // hidden-element measure; jsdom/SSR return false (the negative-probe discipline).
    // If the runtime probe is too costly, the BUILD-TIME decision is prototype P1's
    // verdict, hard-coded as a UA-class gate.
}
```

**The binding move:** prototype P1 RUNS FIRST (chromium AND webkit, real engines)
and decides. **If WebKit reflects `--scroll-fill` live → the bar ships as specced**
(gate the JS fallback on `!supportsScrollTimeline()`, the current plan). **If
WebKit does NOT → gate the JS fallback on
`!supportsScrollDrivenCustomProperty()`** (so WebKit, passing
`supportsScrollTimeline()` but failing the narrower probe, runs the JS writer —
the bar lives). The architecture survives either way; the gating predicate is the
prototype's output. This MUST be settled before the bar lands.

**The JS fallback — re-specified with the CONFIRMED signature (FIX, critique
codebase-deep/risk).** `useScrollProgress` is the WRONG tool (returns
`Ref<number>`, maps element-in-viewport, writes nothing). The fallback composes
**`useScrollTrigger`**, whose signature is POSITIONAL (`useScrollTrigger.ts:153`:
`useScrollTrigger(scrollSource: MaybeRefOrGetter<HTMLElement|Window|null>, opts =
{})`) and which is **NOT exported from any barrel** (import directly from
`src/composables/motion/useScrollTrigger` — the demo `scroll-system.vue:45`
precedent). It is constructed ONLY on the fallback path (DEFT, RISK-7 — on a
native engine it would otherwise attach a rAF reader for nothing):

```ts
// AppShell.vue — dual-path single-writer, constructed ONLY when native is absent.
import { useScrollTrigger } from "../../src/composables/motion/useScrollTrigger";
import { supportsScrollDrivenCustomProperty } from "../../src/composables/motion/supportsCssTimeline";

// gate on the NARROWER probe (P1's verdict picks this vs supportsScrollTimeline):
if (!supportsScrollDrivenCustomProperty()) {
    const { progress } = useScrollTrigger(() => mainScrollerEl.value /* .demo-main-scroller */, {});
    watch(progress, (p) => barEl.value?.style.setProperty("--scroll-fill", `${p * 100}%`));
}
// native (capability-confirmed) → the CSS owns --scroll-fill, no JS construction; no double-write.
```

The fallback ALSO runs under PRM (the bar must track for reduce users — it is an
informational cue, not vestibular motion).

**The liquid-weight TENSION, resolved with a REAL spring.** A lagging FILL is a
LIE about scroll position, so the FILL is 1:1 truthful; the liquid weight is the
**JS keyframes.js `SpringProgress` GLINT FOLLOWER** (demo-private, `AppShell.vue` —
import from `@mkbabb/keyframes.js`, the `useDragMorph.ts:54` precedent) — a small
spring that lags the live `--scroll-fill` fraction and writes `--glint-x`, so the
leading-edge glow trails the fill with genuine inertia + overshoot. PRM-dropped
(`display: none`). This is the bar's only motion that carries the universal
liquid-weight law; the whole-bar feel also rides WS1's `.smooth-scroll` momentum +
the §2B section entrances.

**AA + dark arm + glass-on-glass (Apple HIG, new).** The fill-as-graphic clears
≥3:1 over the variable frosted backdrop in BOTH modes (the CC reference fill is
markedly brighter than its channel). Dark arm: the track edge + transmission carry
the silhouette (W-DARK-MATERIAL); plain per-mode token pairs only — NO
`light-dark()` inset-shadow fragment (the trap computes the whole box-shadow to
`none`, MEMORY). **Glass-on-glass:** the bar is CHROME glass; the WS8 deep-glass
surfaces below it are CONTENT glass. Apple's HIG forbids stacked glass — the bar
must read as the ONE chrome glass and NOT as a second plate on the content glass
directly below; a content-tier deep-glass surface immediately under the bar is
subdued (the bar wins the material read). This is an acceptance check (§5), not a
mechanism — it is verified on the gestalt capture.

### 2B. Section typewriter + fade-up entrances (BG.W-SECTION-TYPEWRITER-FADEUP)

`useTypewriter` (413-line stochastic mount-not-IO sleep-loop, grows heading width
per char) → below-fold-invisible + per-char-reflow CLS. The CSS `.char-stagger`
recipe is ALSO mount-triggered. A native `view()` timeline cannot express a
per-glyph stagger. Resolution:

- **Section HEADINGS → `<SplitChars :stagger="false">` + the shipped
  `vScrollRevealOnce` IO gate** (the calm typewriter-WIPE). **TWO in-fence src/
  edits** (pass-1 said "ONE" — the `30ms` literal is the missed second):

  - **`SplitChars.vue` — add `stagger?: boolean` (default `true`).** Today line 90
    is `cn("char-stagger", props.class)` UNCONDITIONAL — the mount-triggered host
    fires at load. `:stagger="false"` omits the `.char-stagger` host (mints BARE
    `.char` spans + `--char-index`/`--char-total`; `aria-label` + per-glyph
    `aria-hidden` PRESERVED — no char-by-char announcement; engine-FREE, composes
    `useCharStagger` only → root-barrel-safe). NOT a `.char-stagger`-neutralizing
    specificity override.
  - **`typography/utilities.css:158` — tokenize the hardcoded `30ms`.** The
    `.char-stagger` step is `calc(var(--char-index,0) * 30ms)`. Mint
    `--char-stagger-step` (default `30ms`) and re-point BOTH the `.char-stagger`
    recipe AND the new `section-entrance.css` reveal onto the ONE token — kills the
    24-vs-30ms drift with no second magic number.
  - **The reveal gate is the shipped `vScrollRevealOnce` directive
    (`useStaggerReveal.ts:123`), NOT a new `useSectionReveal`.** It sets
    `data-revealed` on the bound element's CHILDREN + unobserves-once + has a no-IO
    immediate-reveal fallback. **WIRING constraint:** `.story-section__heading` MUST
    be a DIRECT CHILD of the bound section root, or `[data-revealed]` never reaches
    it.

  ```css
  /* section-entrance.css (NEW, colocated). Re-declares NEITHER gl-cascade-build
     NOR .scroll-cascade > * (the DRY guard). Text NEVER strands invisible. */
  @media (prefers-reduced-motion: no-preference) {
      [data-revealed] .story-section__heading .char {
          animation: gl-char-rise var(--spring-smooth-duration) var(--spring-smooth) both;
          animation-delay: calc(var(--char-index) * var(--char-stagger-step));
      }
      .story-section__heading:not([data-revealed]) .char { opacity: 0; transform: translateY(0.4em); }
  }
  @keyframes gl-char-rise { from { opacity:0; transform:translateY(0.4em);} to {opacity:1; transform:none;} }
  @media (prefers-reduced-motion: reduce) {           /* PRM + no-IO → terminal-visible */
      .story-section__heading .char { opacity: 1; transform: none; }
  }
  ```

- **Section BODIES → the SHIPPED `.scroll-cascade`, REUSED VERBATIM.**
  `section-entrance.css` must NOT re-declare `@keyframes gl-cascade-build` nor
  `.scroll-cascade > *` (a same-name `linear` re-declaration STRIPS the
  `--ease-scroll-spring` liquid-weight law from every storybook body). The section
  root binds the existing WS4-D14-FIXED `.scroll-cascade`. Safari<26 / no-`view()`
  fallback REUSES the shipped `[data-scroll-reveal-once]` / `gl-reveal-once` (not a
  new keyframe).

- **Metric/number values → `useCountup`** (import from `@mkbabb/glass-ui/motion` —
  keyframes-bearing, NEVER the root barrel; the SCC fence). Metric surfaces only.

**No animation double-bind.** `.story-section__heading` is NET-NEW; it is EXCLUDED
from the `.scroll-cascade > *` child set — the cascade lifts the BODY children, the
heading carries ONLY the per-glyph rise on its `.char` descendants. ONE node binds
at most ONE `animation`. **Verified on the WIRED `StorySection` (prototype P3),
across the 97 `<StorySection>` contexts (some inside `.scroll-cascade`, some not).**

**`useTypewriter` is reserved for the front-door D0 hero ONLY** — never a section
heading. `proof:demo-design` D4 anti-fork bite stands. **Named-successor fold
(web-sota arm 2B):** CSS `animation-trigger`/`timeline-trigger-name` (Chrome
145/146, 2026 — `play-forwards none` ≡ the directive's unobserve-once) is recorded
as the named successor; the `vScrollRevealOnce` IO directive stays the cross-engine
floor (WebKit/Safari lack `animation-trigger` in 2026). A future wave does not
re-derive the choice.

**StorySectionHeader fold (NO-LEGACY — the gate-zombie, moved to WS11).** Pass-1
§0 assigned `StorySectionHeader.vue` (105L, ZERO Vue importers) to WS4's delete.
But its FUNCTION migrates into `StorySection`'s `<SplitChars :stagger=false>`
heading + the §2D suffuse accent — WS11's. So WS11 owns the fold ATOMICALLY (no
RED window): delete `StorySectionHeader.vue` AND in the SAME commit retire/re-point
its gate clauses — `proof-storybook-meta.mjs` M9d (the `sshExists &&
sshComposesIconChip` dogfood-mint, lines 422-439) re-points onto `StorySection`
(the new section-header primitive composing the `--section-label-accent`/IconChip
POP), and the `proof-page-hierarchy.mjs:83` allowlist entry is removed. WS4 keeps
only the truly-dead `_chassis/` (`DemoFrame`/`demo-frame.css`) delete.

### 2C. The standardized page-API family (BG.W-STORY-PAGE-API)

**DECIDED: 4 thin named members over ONE shared core (held from the settled
fence).** The user asked for FOUR by name; the Apple Music reference (reference
arm 3) shows four genuinely-distinct page shapes (front-door landing / vibrant
bento / detail-with-hero-card-and-sections / compact sub). **The KISS challenge
(codebase-deep) is acknowledged and answered:** since the member is
manifest-`depth`-derived (not a leaf prop — 121/125 leaves compose bare
`<StoryPage>`), the 4 names ARE a configuration set, not a fork. **The
implementation makes that literal: each member is a ≤1-element ZERO-LOGIC
delegation** to `<StoryPageShell :depth :hero-scale :body-layout>` — no branching,
no member-local layout. `proof:story-page-api` asserts the zero-logic, so IF a
future visual prototype proves D2≡D3-byte-identical-modulo-`heroScale`, the
collapse to `StoryPage(:depth)` + `CategoryPage` is mechanical. **The D2-vs-D3
real-body-layout distinctness is prototype P4** (the named residual, §8).

```
StoryPageShell.vue   ← the shared CORE. SINGLE <article class="route-enter"> root.
                       Owns: the colocated <StoryHeroBackdrop> (carved from StoryHero's
                       6-way substrate switch), the gravity header cluster (LIFTS WS1's
                       de-duped StoryHeader: eyebrow → Fira-Code subpath chip → audacious
                       √φ title → blurb), the .scroll-cascade body wiring, the section
                       system (StorySection + the 2B reveal), the --field-h suffuse thread,
                       the §2A hero top-pad-clear, the progress-rail integration.
                       Props: depth, heroScale, background, body-layout, + the body slot.
  ├─ StoryPage.vue      (D0) heroScale "mega". Full-bleed live backdrop. The lone front door
  │                          (foundations/intro). May host the useTypewriter hero.
  ├─ CategoryPage.vue   (D1) heroScale "hero" (FIX: manifest source-of-truth, NOT "mega").
  │                          The SectionPreviewCard BENTO grid (FOLDS SectionLanding.vue,
  │                          DELETED). One-GL budget: FROZEN preview stills.
  ├─ ComponentPage.vue  (D2) heroScale "5". Hero card + sections + demo cels (ShowcaseFrame)
  │                          + the optional #source code slot (folds Code.vue; CodeBlock.vue
  │                          retires onto Code.vue — its single consumer display/card.vue re-points).
  └─ SubPage.vue        (D3) heroScale "4". Nested sub-variant: sections + cels, NO bento,
                             NO #source. The "depth IS size" smallest rung.
```

**The member→depth→heroScale map is manifest-derived (FIX — reconciled with
`assignDepths()`):** D0 `mega` (foundations/intro) · D1 `hero` (the 11 section
landings) · D2 `5` (each category's first non-front-door MAIN) · D3 `4` (the rest).
Pass-1 §2C said "CategoryPage D1 = mega" — WRONG; `manifest.ts:425` returns
`heroScale: "hero", depth: "D1"`. The family FORMALIZES the existing ladder; it
does NOT re-invent it. **Cap the audacious tier** (reference D10 risk):
`audacious`/`mega` (peaks 177-352px) stay reserved for the D0 front door + the
metric/number surfaces; D1/D2/D3 step DOWN (`hero`/`5`/`4`).

**The single-route-root invariant.** The bare-swap route transition (WS1) requires
each routed root present EXACTLY ONE element. Each member's template is ONE
`<StoryPageShell>` element → Vue resolves the single-child root transparently to
the shell's `<article>`. No fragment, no `TooltipProvider`-as-root (the prior
`StoryPage.vue:64` bug is ALREADY fixed at HEAD — W-CUT P10c moved it inside
`<article>`; the build agent does NOT re-fix it). `proof:story-page-api` asserts
one named member per route AND single-element root across ALL routes — over the
real migrated catalog, NOT a stub set. **Prototype P5.**

**The migration (the real churn risk).** Depth is catalog-position-derived
(`assignDepths()`); the manifest/router owns the member choice. The **121
`<StoryPage>` compositions** (252 references; 97 `<StorySection>` — the spec's
"124-125" corrected) migrate in ONE clean break (manifest-driven, mechanical, no
alias) + scrub the 7+ stale chassis-symbol comments (`StoryHero cardTier` /
`DemoFrame variant` across foundations/substrates/compositions leaves). The
migration folds the **`SectionLanding.vue`** multi-importer (the 3 REAL importers —
`router.ts:31` / `AppShell.vue` / `manifest.ts`; `SectionPreviewCard.vue:167` is a
COMMENT, not an import) into `CategoryPage` and absorbs `StoryHero`'s 6-way backdrop
switch into `StoryHeroBackdrop`. The gate's "single-element root across ALL routes"
is the anti-regression, exercised on the FULL catalog.

**Colocation + the 500-line law.** `StoryHero.vue` (432L) collapses into
`StoryPageShell` + the colocated `StoryHeroBackdrop.vue` (DELETED, clean break —
the 3 real importers are all chassis being rebuilt). `story-hero.css` (717L, over
the bound) splits into colocated partials AND DRAINS its bespoke entrance keyframes
(`story-hero-title-rise:546` / `cluster-rise:576` / `subordinate-fade:522`) by
wiring the hero entrance onto the shared 2B primitives (SplitChars for the title,
the gravity cluster on the spring clocks). A half-migration that leaves StoryHero
alongside adds a 4th dead chassis (the BD spec-ahead-of-wire failure) — the
migration is COMPLETE or the wave does not close.

### 2D. Storybook suffusal consistency (BG.W-STORYBOOK-SUFFUSE)

The smallest, most-integrated arm — a consistency LAYER. WS1 owns the FIELD (one
shell aurora + `warmFieldHue` + the warm `[25,95]` `--field-h` register, already
wired at HEAD). WS11 READS the field hue and threads it through the page-API chrome:

- the rail fill reads `--field-h` (§2A);
- each section's eyebrow/rail/IconChip POP reads the per-category
  `--section-label-accent` (the `.section-label--tinted` register), threaded by
  `StoryPageShell` so a category reads ONE coherent color event across all its
  pages;
- `StorySection` gains a default-on section accent (the StorySectionHeader fold's
  POP, §2B);
- **the warm-not-gray seam — HEAD-CHECK, do NOT blind-fix.** Pass-1 mustFix #5
  said "`SectionPreviewCard --card-field-h` reads a DESATURATED-GRAY value,
  re-point onto `--field-h`." **This is STALE at HEAD:** `SectionPreviewCard.vue:175`
  already reads `--field-h: clamp(25, var(--card-field-h, 62), 95)`, the fills are
  warm `oklch(0.90 0.075 …)`, and the comment (`:191`) is literally "NO gray, NO
  teal — warm by the field-h clamp". The card's READ is already warm. **If gray
  persists it is UPSTREAM** in how `--card-field-h` is WRITTEN (does `SectionLanding`
  pass `warmFieldHue(categoryId)`?), not the card's read. The suffuse arm VERIFIES
  the PAINTED card hue on a fresh capture FIRST; it edits the WRITE source only if
  a real regression is captured — never a wasted edit on a closed seam.

**Fences (preserved):** ONE color event per surface (`proof:suffuse` d1
body-ink-untinted, d2 chip≤glyph, d3 ≤1 tinted-event-family/surface); **the
bar-as-page-chrome is EXEMPT from the one-color-event content-surface count
(RECORDED in the gate, not assumed)**; warm-cream identity; `--motion-accent`
purple demo-local (presets-in-consumers); `--surface-tint-*` in-srgb (AW.W26);
both modes, dark-recalibrated washes (BA.W-STAGE). The binding bar is a FRESH
per-page gestalt capture across categories (NO gray/flat page), not a source-green
claim.

---

## 3. FILES TOUCHED

### BG.W-SCROLL-PROGRESS-GLASSY (⇐ WS1 LIBRARY recipe landed)
- `demo/layout/dock-nav.css` — rebuild `.demo-scroll-progress` as the thick glass
  TRACK + `__fill` (clip-revealed, `--scroll-fill` INHERITED, ONE animation on the
  TRACK, on `scroll(nearest block)`) + `__glint` (JS-spring-lagging, PRM-dropped).
  Consume `var(--glass-blur-quiet)`. The reduced-transparency firm-to-opaque arm.
  Register `@property --scroll-fill { inherits: true }` (demo-private). Mint
  `--scroll-rail-thickness` (√φ ~0.625rem); mint `--z-scroll-rail` (or document the
  literal-5 fallback, below `--z-dock:40`).
- `demo/layout/AppShell.vue` — REMOVE the library `scroll-progress` class from the
  bar div (clean break — the §0.5 LAST writer). Construct `useScrollTrigger(() =>
  mainScrollerEl.value, {})` (POSITIONAL, imported from
  `src/composables/motion/useScrollTrigger`) + the single-writer `--scroll-fill`
  watcher ONLY under the negative capability probe (P1 picks
  `!supportsScrollTimeline()` vs `!supportsScrollDrivenCustomProperty()`). Wire the
  `SpringProgress` glint follower (`--glint-x`), PRM-dropped.
- `src/composables/motion/supportsCssTimeline.ts` — ADD
  `supportsScrollDrivenCustomProperty()` (the narrower probe, P1's verdict drives
  whether it gates the fallback).
- `scripts/proof-ba-animate.mjs` + `tests-visual/ba-animate.spec.ts` — ADD the DEMO
  bar arm: `railHealth()` (the engine-agnostic `--scroll-fill` growth + no-distort
  caps + visible-track-at-top + ≥3:1 AA) scrolling `.demo-main-scroller` (FIX — NOT
  `window`). DELETE the OLD demo-bar scaleX assertion + the `|| (headless not
  reflecting)` OR-escape (`:166`). The LIBRARY-recipe scaleX/`currentTime` arm
  (scroll-vt.vue) is WS1's — UNTOUCHED. **Coexistence is prototype P2.**

### BG.W-SECTION-TYPEWRITER-FADEUP (⇐ WS1 `.scroll-cascade` kept + WS4 D14)
- `src/components/custom/split-chars/SplitChars.vue` — add `stagger?: boolean`
  (default `true`); `:stagger="false"` omits the `.char-stagger` host (a11y
  preserved). (In-fence src/ edit #1.)
- `src/styles/typography/utilities.css` — tokenize `30ms` → `--char-stagger-step`
  (re-point the `.char-stagger` recipe). (In-fence src/ edit #2.)
- `demo/stories/StorySection.vue` — default-on `revealHeading`: wrap the `<h2>` in
  `<SplitChars :stagger="false">`, mark it `.story-section__heading` (DIRECT child),
  EXCLUDE it from `.scroll-cascade > *`, bind `vScrollRevealOnce` on the section
  root. Default-on section accent (the StorySectionHeader fold). DELETE
  `StorySectionHeader.vue` + re-point `proof-storybook-meta.mjs` M9d + remove
  `proof-page-hierarchy.mjs:83` (ATOMIC, §2B).
- `demo/stories/section-entrance.css` (NEW, colocated) — the `[data-revealed]
  .char` reveal ONLY (spring-clocked, PRM terminal-visible, no-IO fallback). REUSES
  `.scroll-cascade` + `gl-reveal-once` verbatim — re-declares NEITHER
  `gl-cascade-build` NOR `.scroll-cascade > *`.
- Metric surfaces — wire `useCountup` (import from `/motion`).

### BG.W-STORY-PAGE-API (⇐ WS1 route-enter/hero-fit/cluster-de-dup + WS4 chassis)
- `demo/stories/StoryPageShell.vue` (NEW) — the shared core, single `<article>`
  root, hero top-pad-clear, the suffuse thread.
- `demo/stories/StoryHeroBackdrop.vue` (NEW, colocated carve from StoryHero's
  6-way switch).
- `demo/stories/StoryPage.vue` (rebuilt D0, pure delegation), `CategoryPage.vue`
  (NEW D1 `hero`, folds `SectionLanding.vue` → DELETED + the 3 real importers
  re-pointed), `ComponentPage.vue` (NEW D2 `5` + `#source` slot folding `Code.vue`;
  `CodeBlock.vue` retired), `SubPage.vue` (NEW D3 `4`). All four ≤1-element
  ZERO-logic delegations.
- `demo/stories/StoryHero.vue` — DELETED (collapsed into shell + backdrop).
- `demo/stories/story-hero.css` — split into colocated partials below 500L; bespoke
  entrance keyframes drained onto 2B.
- `demo/router.ts` + the 121 `<StoryPage>` compositions — depth→member mapping;
  mechanical clean-break migration + the 7+ stale-comment scrub.
- `scripts/proof-story-page-api.mjs` (NEW) — exactly ONE named member per route;
  ZERO member-specific logic; single-element route root across ALL routes (full
  catalog, not a stub); no raw chassis triplet survives. Scope it to
  member-delegation/zero-logic/full-catalog-single-root ONLY (proof-page-chassis
  PC2/PC6 already cover depth-ladder/heroScale/single-root — do not re-assert). FOLD
  the superseded landed-tranche page gates (`proof:page-redesign`/`proof:page-prune`
  subjects the page-API supersedes) rather than stacking a 6th page-* gate.

### BG.W-STORYBOOK-SUFFUSE (⇐ WS1 field)
- `demo/stories/StoryPageShell.vue` — thread `--field-h` + `--section-label-accent`.
- `demo/stories/StorySection.vue` — default-on section accent (shared with §2B).
- `demo/stories/SectionPreviewCard.vue` — ONLY if a real gray regression is
  captured (the seam is closed at HEAD — §2D); else NO edit.
- `scripts/proof-suffuse.mjs` — per-page ledger rows for the page-API members; the
  bar-as-chrome exemption RECORDED.

### Cross-cutting gate enrollment (make Safari REAL)
- `tests-visual/playwright.config.ts:118` — ADD the new WS11 specs
  (`scroll-rail.spec.ts` + the entrance/page-API cross-engine specs) to the
  `webkit` project `testMatch` (currently the 2-spec allowlist
  `["safari-webgl.spec.ts","aurora-swraster.spec.ts"]`). Run:
  `npx playwright test --config tests-visual/playwright.config.ts --project=webkit`.
  Without this the "Chrome AND Safari" bar NEVER executes.

---

## 4. WAVE BREAKDOWN (the BG.W-* set)

1. **`BG.W-SCROLL-PROGRESS-GLASSY`** ⇐ WS1 LIBRARY recipe. The demo bar STOPS
   composing `.scroll-progress` (clean break, §0.5) and becomes the thick glass
   TRACK + clip-revealed FILL (inherited `--scroll-fill`, ONE animation, on
   `scroll(nearest block)`) + a JS `SpringProgress` lagging glint.
   `backdrop-filter: var(--glass-blur-quiet)` (composite). Survives PRM + Safari<26
   (informational cue; JS fallback = `useScrollTrigger` positional + single-writer
   watcher, gated on the P1-chosen negative probe). Reduced-transparency firms to
   opaque. Truth on the fill, liquid weight on the glint. Hero top-pad-clear; ≥3:1
   AA; z below dock; no glass-on-glass stack. ba-animate gains the DEMO arm; the
   LIBRARY arm (WS1) is untouched.
2. **`BG.W-SECTION-TYPEWRITER-FADEUP`** ⇐ WS1 (`.scroll-cascade` kept) + WS4 (D14).
   Section headings per-glyph reveal via `<SplitChars :stagger="false">` + the
   shipped `vScrollRevealOnce` gate (fires on CROSSING); bodies on the REUSED
   `.scroll-cascade`; metrics via `useCountup`. Two in-fence src/ edits (the prop +
   the `30ms` token). PRM terminal-visible, CLS≈0, no double-bind, heading excluded
   from the cascade child set. ATOMIC StorySectionHeader fold + gate re-point.
3. **`BG.W-STORY-PAGE-API`** ⇐ WS1 + WS4. ONE `StoryPageShell` core + 4 ≤1-element
   ZERO-logic named members on the depth ladder (D0 `mega`/D1 `hero`/D2 `5`/D3 `4`);
   `StoryHeroBackdrop` carve; `SectionLanding` folded into `CategoryPage`;
   `StoryHero`/`story-hero.css` collapsed below 500L; single route root across the
   full migrated catalog; `proof:story-page-api` minted + the superseded page gates
   folded. THE capstone the others feed into.
4. **`BG.W-STORYBOOK-SUFFUSE`** ⇐ WS1 (field). Thread ONE warm `--field-h` route
   hue through every member (rail fill + section eyebrow/rail/IconChip);
   default-on section accent; VERIFY the SectionPreviewCard hue (edit only on a
   real regression). One-color-event fences preserved; both modes.

**Intra-WS sequence:** 1 and 2 are independent (parallel). 3 (the page-API) lands
AFTER 1 + 2 (it composes the bar + entrances into the shell). 4 lands LAST. All
four HARD-gate on WS1/WS4 (§0) — each opens with the precondition HEAD-check.

---

## 5. ACCEPTANCE / REAL-PAINT-π BAR

PAINT IS THE GATE. The headless-green/visually-broken trap shipped the hairline
3×; every WS11 acceptance is a FRESH LIVE capture by a NON-authoring agent on a
real GPU, **Chrome AND real Safari/WebKit** (the webkit project enrollment, §3),
`:5199`, both modes.

**Order of operations (binding):**
1. **Prototype P1 FIRST** — the Safari custom-property-via-scroll capability +
   `railHealth()` teeth, on chromium AND webkit, BEFORE any acceptance capture is
   trusted. The gating predicate (`supportsScrollTimeline` vs
   `supportsScrollDrivenCustomProperty`) is P1's output.
2. Stand up the integration branch (WS1+WS4 landed, §0 HEAD-checks GREEN).
3. The four-arm acceptance captures.

**The engine-agnostic gate predicate (`railHealth()` — bugs fixed):**

```ts
// railHealth(page, fillSel) — engine-AGNOSTIC; chromium AND webkit AND JS fallback.
async function railHealth(page, fillSel) {
    const read = () => page.$eval(fillSel, (el) =>
        getComputedStyle(el).getPropertyValue("--scroll-fill").trim());     // MAIN-THREAD → reliable
    // FIX: scroll the .demo-main-scroller, NOT window (window.scrollTo does not move an inner overflow:auto port).
    const scrollPort = (frac) => page.$eval(".demo-main-scroller", (el, f) => {
        el.scrollTop = el.scrollHeight * f;
    }, frac);
    await scrollPort(0);
    const atTop = await read();                                             // PRIMARY: "0%" at scroll-top
    await scrollPort(0.8);
    const at80 = await read();                                             // PRIMARY: grows monotonically (~80%)
    await page.waitForTimeout(400);
    const at80b = await read();                                             // no-drift CONTROL (the killer discriminator)
    const grew = parseFloat(at80) > parseFloat(atTop) + 10;
    const noDrift = Math.abs(parseFloat(at80b) - parseFloat(at80)) < 1;
    const native = await page.evaluate(() => CSS.supports("animation-timeline: scroll()"));
    let timelineOk = true, currentTimeOk = true;
    if (native) {
        timelineOk = await page.$eval(fillSel, (el) => {
            const t = getComputedStyle(el).animationTimeline;
            return /scroll\(/.test(t) && t !== "auto";
        });
        currentTimeOk = await page.$eval(".demo-scroll-progress", (el) => {    // Chromium-only refinement, by NAME
            const a = el.getAnimations().find((x) => x.animationName === "gl-scroll-fill");
            return a == null || a.currentTime != null;
        });
    } else {
        timelineOk = grew;                                                  // Safari<26 / JS fallback: grew proves the live writer
    }
    return grew && noDrift && timelineOk && currentTimeOk;
}
```

**Bar (BG.W-SCROLL-PROGRESS-GLASSY):**
- `railHealth()` GREEN on EVERY route, chromium AND webkit, both modes.
- the TRACK is visible (empty channel) at scroll-top (not a zero-width sliver);
  fill caps UNDISTORTED across 0→100%; the bar reads thick (≥8px) + glassy (frost
  diffuses content behind it) + has depth (groove inset + separation lift +
  specular edge).
- AA both modes (the fill as graphic ≥3:1 over the frosted backdrop).
- Safari<26 / capability-probe-false: the JS fallback writes `--scroll-fill` →
  `railHealth()` GREEN (no dead/static bar). **Force-tested** by stubbing the probe
  → false in a webkit run (the JS fallback must be the SOLE live writer).
- PRM: the fill TRACKS (`railHealth()` GREEN); only the glint drops.
- reduced-transparency: the track firms toward opaque (groove+rim carry the
  silhouette, no blur); the fill still tracks.
- glass-on-glass: the bar reads as the ONE chrome glass, NOT a second plate
  stacked on the deep-glass content directly below.
- the hero's first content clears the bar at scroll-top (no occlusion); CLS≈0.

**Entrances (BG.W-SECTION-TYPEWRITER-FADEUP):**
- a BELOW-THE-FOLD section's heading reveals per-glyph on CROSSING (a fresh
  scroll-through: `firstChar.getAnimations().length` 0→1, name `gl-char-rise`), NOT
  at load; the body lifts+fades on the same crossing. Reads as a liquid-weight
  typewriter-WIPE (a fresh Chrome AND Safari gestalt judgement).
- PRM: heading + body terminal-visible (no transform, never vanishes).
- CLS≈0 (no per-glyph width reflow); no node double-binds two `animation`s; the
  heading is NOT in the cascade child set (verified on the WIRED `StorySection`,
  fresh capture, across in-cascade AND not-in-cascade contexts).
- `animation-range !== 'normal'` on `.scroll-cascade--columns > *` (the WS4 D14 fix
  is consumed — RED until WS4 lands the `%`-off-`--col` form).
- a11y: the heading's accessible name is the FULL text (`aria-label`), glyphs
  `aria-hidden`; no char-by-char announcement.

**Page-API (BG.W-STORY-PAGE-API):**
- every routed page composes exactly ONE named member, ZERO member-specific logic
  (`proof:story-page-api`, over the FULL migrated catalog).
- each route presents exactly ONE element root; the bare-swap does not wedge
  (5-nav burst: `main.children.length===2`, `h1===last-dest`).
- depth→heroScale renders the √φ ladder (D0>D1>D2>D3); `proof:page-hierarchy`
  PH1-PH4 + `proof:hierarchy` H2-ORDER/GRAVITY/CENSUS green.
- one-GL-per-route preserved (category/component pages use frozen stills).

**Suffuse (BG.W-STORYBOOK-SUFFUSE):**
- a per-page gestalt capture across categories: NO gray/flat page; the rail fill +
  section eyebrow/rail read the SAME category `--field-h`; the SectionPreviewCard
  preview reads warm; body ink untinted; `proof:suffuse` d1-d3 green; both modes.

**The capstone:** the `proof:ba-gestalt` BG roster verdict for the storybook
surfaces (scroll-rail · section-entrance · page-API · suffuse), re-earned on fresh
captures, Chrome AND Safari.

---

## 6. FOLDED / DEFERRED ITEMS

- **The 2-vs-4 page-API collapse** — DECIDED: ship 4 (honor the user, reference-
  backed) as ≤1-element zero-logic delegations. IF prototype P4 proves
  D2≡D3-byte-identical-modulo-`heroScale`, the collapse to `StoryPage(:depth)` +
  `CategoryPage` is mechanical (the shell is invariant; the zero-logic gate
  guarantees it).
- **The dynamic OKLCH spectrum fill** (`useBorderSpectrum`/`spectrum-walk.ts`) for
  the bar — DEFERRED. The demo bar uses a static CSS gradient (KISS, demo chrome);
  the dynamic no-trough spectrum is the BorderProgress COMPONENT's.
- **The `#source` code slot** (ComponentPage composing `Code.vue`; `CodeBlock.vue`
  retires) — SECONDARY DRY win (clears the code primitive's ≥2-consumer bar).
- **`scroll-vt.vue` bar + the legacy `[data-scroll-reveal]` migration** — WS1 owns
  it (named-timeline + `timeline-scope` reserved there). WS11 does not touch it.
- **`DemoFrame`/`demo-frame.css` delete + the D14 `* 0` fix** — WS4 owns them
  (HEAD-checked at wave open). The StorySectionHeader fold MOVED to WS11 (§2B).
- **`useTypewriter` on section headings** — REJECTED (mount-not-IO, per-char CLS,
  below-fold invisibility). Reserved for the front-door hero only.
- **`animation-trigger`/`timeline-trigger`** (Chrome 145/146) — recorded as the
  section-entrance named successor; the IO directive stays the cross-engine floor.

---

## 7. OPEN RISKS (with the falsifier each acceptance step kills)

1. **(LOAD-BEARING) Safari custom-property-via-scroll** — `supportsScrollTimeline()`
   probes only `scroll()` value support, not custom-property interpolation. If
   WebKit does not interpolate `--scroll-fill` on a scroll timeline, the native
   path silently paints a dead bar while the JS fallback is gated OFF.
   **Falsifier:** prototype P1 on real WebKit. The gating predicate
   (`supportsScrollTimeline` vs `supportsScrollDrivenCustomProperty`) is P1's
   output; the bar survives either way ONLY if P1 runs first.
2. **WS1↔WS11 bar coexistence** — the LIBRARY scaleX/`currentTime` arm + the DEMO
   clip-path/`getComputedStyle` arm must both green simultaneously in one
   `ba-animate` with the OR-escape deleted. **Falsifier:** prototype P2 (two bars,
   two recipes, two predicates on one page).
3. **Below-fold reveal fires on CROSSING, not mount, on the WIRED `StorySection`**
   — the `.story-section__heading` host is net-new + the disjoint-node discipline
   must hold across 97 contexts. **Falsifier:** prototype P3.
4. **D2-vs-D3 VISUAL distinctness** — structurally decided (4, zero-logic); the
   rendered-layout distinctness is unproven. **Falsifier:** prototype P4 — if
   byte-identical-modulo-`heroScale`, the 4→2 collapse is mechanical.
5. **The 121-file migration churn** — the mechanical rewrite + the `SectionLanding`
   fold + the `StoryHero` 6-way absorption must not re-introduce a fragment route
   root. **Falsifier:** prototype P5 (single-root across the FULL catalog +
   5-route bare-swap burst).
6. **Sequencing fragility.** WS11 HARD-depends on WS1+WS4 landing; the integration
   branch does NOT exist at HEAD. D14 is STILL broken (`scroll-choreography.css`
   `* 0` + the `calc(% + ms)` unit error). Each wave opens with the precondition
   HEAD-check; WS11 does not re-fix a foreign wave.
7. **Stale-edit waste** — the SectionPreviewCard "gray seam" is closed at HEAD;
   a blind re-point is a wasted edit. The suffuse arm VERIFIES the painted hue
   first.

---

## 8. UNCONVERGED FRONTIER (the next-pass brief)

The SPEC is build-ready per wave; the integration contradictions are resolved. The
WORKSTREAM gate is unmet because these are spec-stated but un-EXECUTED:

0. **(THE BLOCKER) The integration branch does not exist.** `git diff master..HEAD
   -- src/ demo/` is EMPTY. WS1 (route-enter, `.scroll-build` retire, LIBRARY
   `.scroll-progress` fix, field) + WS4 (D14 `%`-off-`--col`, `_chassis/` delete,
   ShowcaseFrame-is-cel) must LAND CODE first. WS11 cannot open a wave until the §0
   HEAD-checks pass on a real branch.
1. **Prototype P1 (Safari capability) — un-run.** The load-bearing assumption.
2. **Integrated-tree real-paint** — the bar `railHealth()` GREEN + the
   wired-`StorySection` crossing capture, on the REAL post-WS1+WS4 branch.
3. **Real Safari/WebKit execution** — the webkit `testMatch` enrollment is specced;
   the actual Safari captures (bar fill + entrances + the forced JS fallback) have
   NOT run. "Chrome AND Safari" is unexecuted.
4. **The D2-vs-D3 VISUAL distinctness** (prototype P4) — the 4-vs-2 collapse's
   visual proof (real body layouts, not stubs).
5. **The 121-file migration exercise** (prototype P5) — the fragment-root
   regression risk is specced-against but un-exercised over the full catalog.

Next pass: stand up the integration branch (WS1+WS4 green), RUN prototype P1
FIRST, then the bar + entrance + page-API + suffuse acceptance captures on Chrome
AND real Safari, and settle D2-vs-D3.
