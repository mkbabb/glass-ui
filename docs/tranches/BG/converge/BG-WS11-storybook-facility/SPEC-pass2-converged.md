# BG-WS11-storybook-facility — SPEC-pass2-CONVERGED

Storybook facility: a FUNCTIONING thick glassy scroll-progress rail · section
typewriter + fade-up entrances on liquid-weight spring clocks · ONE standardized
page-API component family every page composes · consistent per-category suffusal.
Both modes, Chrome AND real Safari, real-paint is the gate.

> **What this converged pass LOCKS.** Pass-2 was build-ready in isolation; the
> research/prototype/critique fleet then (a) PROVED the load-bearing Safari
> capability on a real WebKit engine, (b) PROVED the WS1↔WS11 bar coexistence
> collision-free, (c) PROVED the below-fold heading reveal fires on crossing (not
> mount) on Chromium, and (d) SETTLED the 4-vs-2 page-API question to **ship-2**.
> This converged spec folds every critique mustFix: the page-API collapses from 4
> NEW components to **2 shipped components over ONE shell** (the 4 user names
> survive as the D0-D3 conceptual depth ladder — flagged for user confirmation),
> the §2B reveal selector is corrected to the verified `[data-revealed]`-on-the-
> heading form + deep-link/above-viewport mitigation, the §2A gating predicate is
> simplified to `!supportsScrollTimeline()` (P1 proved WebKit reflects the custom
> property live), and the SectionLanding-importer / CodeBlock-consumer / J-inv-10
> mis-attributions are corrected. **The DESIGN is converged; the EXECUTION frontier
> (§8 — integration branch + real-paint Chrome AND Safari + the 121-file
> migration) is un-run and is what caps the workstream below 100%.**

---

## 0. SEQUENCING — WS11 ELEVATES, it does not re-fight (binding)

WS11 is the storybook *apotheosis* layered on three landed workstreams. It
ABSORBS their outcomes and HARD-depends on them; it does NOT re-propose, re-fix,
or re-mint what they own. **At HEAD (`tranche/BG @e6682c7e`) the integration
branch does NOT exist — `git diff master..HEAD -- src/ demo/` is EMPTY (verified).
Every WS1/WS4 precondition is UNLANDED.** WS11 cannot open a single wave today; the
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

**RETIRED precondition (pass-1 over-claim).** The named `--demo-main-progress`
timeline is NOT a WS11 dependency. The bar uses `scroll(nearest block)`, resolving
to its sticky-parent scroller (§0.5). The named timeline stays reserved for
`scroll-vt.vue` (WS1's genuine cross-element case).

---

## 0.5. THE WS1↔WS11 DEMO-BAR OWNERSHIP RESOLUTION (RISK-2 — PROVEN by P2)

The research fleet found a build-blocking incoherence: **WS1 pass4-CONVERGED M4
and WS11 §2A specify MUTUALLY-EXCLUSIVE bars and gates**, both editing
`proof-ba-animate.mjs` + `ba-animate.spec.ts`:

| Axis | WS1 pass4 M4 | WS11 §2A |
|---|---|---|
| mechanism | `transform: scaleX(0→1)` | `clip-path` off `@property --scroll-fill` |
| timeline | `scroll(nearest block)`, named reserved for scroll-vt | `scroll(nearest block)` (§0.6 — named DROPPED) |
| gate primary | `getAnimations()[0].currentTime` + bbox delta | `getComputedStyle('--scroll-fill')` (main-thread) |
| glint | spring-eased trailing glint on the scaleX bar | JS `SpringProgress` follower on the clip-path bar |

**THE RESOLUTION — ONE owner per element, two disjoint recipes, two disjoint gate
arms. PROVEN collision-free by prototype P2 (est 88%, build=false).** P2 forced
both bars onto ONE page with both gate predicates and confirmed they *green
concurrently and red INDEPENDENTLY* — the disjoint-by-element architecture is
genuinely collision-free, not theory. The clean break:

> **The demo bar STOPS composing the library `.scroll-progress` class entirely.**
> Once the class is gone (`AppShell.vue:393` → `<div class="demo-scroll-progress"
> …>`, clean break), the demo bar does NOT ride WS1's scaleX recipe AT ALL. The
> two recipes live on two elements:

- **WS1 OWNS the LIBRARY `.scroll-progress` recipe** (`scroll-driven.css`): the D5
  root fix — `scaleX(0)` unconditional floor + `scroll(nearest block)`. Consumers:
  `scroll-vt.vue` + external. Its `ba-animate` teeth read
  `getAnimations().currentTime` + bbox-width (scaleX CAN go off-main-thread on
  WebKit). **WS11 does not touch this.**
- **WS11 OWNS the DEMO bar** `.demo-scroll-progress` (`dock-nav.css` +
  `AppShell.vue:393`): the self-contained thick glass TRACK + clip-revealed FILL
  off `@property --scroll-fill`, on `scroll(nearest block)`. Its `ba-animate` teeth
  read `getComputedStyle('--scroll-fill')` (a registered custom property feeding
  `clip-path` is MAIN-THREAD → reliable on Chromium AND WebKit AND the JS
  fallback). **WS11 deletes the OLD demo-bar scaleX assertion** + the `|| (headless
  not reflecting)` OR-escape (`ba-animate.spec.ts:166`) and replaces it with
  `railHealth()`.

So `ba-animate` carries TWO disjoint arms: a LIBRARY scaleX/currentTime arm (WS1,
binds `.scroll-progress` on `scroll-vt.vue`) AND a DEMO-bar clip-path/`--scroll-
fill` arm (WS11, binds `.demo-scroll-progress`). Different elements, recipes,
signals — coexist GREEN simultaneously (P2 verified).

**The integration-branch sequencing (binding).** WS1 M4 lands the LIBRARY recipe.
**WS11's BG.W-SCROLL-PROGRESS-GLASSY is the LAST writer on the demo bar div** — it
removes the `.scroll-progress` class and rebuilds `.demo-scroll-progress` self-
contained. WS1 must NOT add a "spring-eased trailing glint" to the demo bar; that
glint is WS11's JS `SpringProgress` follower.

---

## 0.6. THE WS8 OVER-DEPENDENCY + the named-timeline drop (reconciled)

- **The bar does NOT consume `--glass-blur-deep`.** The §2A recipe consumes
  `var(--glass-blur-quiet)` (a HEAD fact). **DECISION: keep the bar on
  `--glass-blur-quiet`** — Apple's HIG (web-sota arm 2A) says chrome should be the
  LIGHTER material, content the deeper. The WS8 precondition for the BAR is SOFT;
  WS8 stays a hard precondition only where the page-API SHELL composes deep-glass
  content surfaces.
- **The bar uses `scroll(nearest block)`, not the named timeline** (§0.5). The
  `.demo-scroll-progress` is a `position: sticky` CHILD of `.demo-main-scroller`,
  so `scroll(nearest block)` resolves to that scroller — the named-timeline
  dependency is DROPPED.

---

## 0.7. PROTOTYPE VERDICT LEDGER (the pass-2 evidence the converged spec stands on)

| # | Prototype | Build | Est | VERDICT folded into this spec |
|---|---|---|---|---|
| **P1** | Safari custom-property-via-scroll + `railHealth()` teeth | false | 90% | **WebKit REFLECTS `--scroll-fill` live.** Playwright's bundled WebKit is `Version/26.4 Safari/605.1.15` (the real Safari 26 target, not a shim); `getComputedStyle` reflects the registered custom property animated on a `scroll()` timeline. → **The native path ships as-specced on Safari; gate the JS fallback on the SIMPLE `!supportsScrollTimeline()`.** `supportsScrollDrivenCustomProperty()` ships as a DEFENSIVE probe but is NOT the gating predicate. REMAINING EXECUTION: stand the `railHealth()` fixture on both real engines (build=false). |
| **P2** | WS1↔WS11 ba-animate coexistence | false | 88% | **Collision-free.** Two recipes / two elements / two disjoint signals green concurrently + red independently. §0.5 holds. |
| **P3** | Below-fold heading per-glyph reveal on CROSSING | **true** | 85% | **Fires on crossing, not mount (Chromium live, `/forms/checks`).** At load `firstChar.getAnimations().length===0`, opacity 0, `translateY(0.4em)`; on cross `===1`, `gl-char-rise`, opacity 1. **CORRECTION:** `vScrollRevealOnce` sets `data-revealed` ON each crossed DIRECT CHILD → the selector is `.story-section__heading[data-revealed] .char`, NOT the ancestor form `[data-revealed] .story-section__heading .char`. |
| **P4** | D2-vs-D3 real body distinctness + member-count | false | 80% | **COLLAPSE-TO-2.** Decidable from `grep`: 121/121 leaves compose bare `<StoryPage>` (zero `:depth`/`:hero-scale` leaf overrides), D2 (`buttons`) and D3 (`card`) compose IDENTICAL `StoryPage`+`StorySection`+`ShowcaseFrame` stacks. → **ship StoryPage (section-stack, D0/D2/D3 by manifest depth) + CategoryPage (bento, D1). DROP ComponentPage.vue/SubPage.vue as NEW files.** |
| **P5** | 121-file migration single-root anti-regression + SectionLanding fold | false | 79% | **Single-root oracle = `@vue/compiler-sfc` raw-parse** (comment+element root → child types `[3,1]`=1 element; genuine fragment → `[1,1]`; v-if/v-else → `[1,1]` but the sibling carries the `else` directive — distinguishable). **CORRECTION:** `SectionLanding.vue` has **exactly ONE real importer — `router.ts:31`** (the manifest `SectionLanding` is a TYPE, `AppShell` references `SectionLandingSkeleton`, the dock-nav/preview-card refs are comments). The facade-resolver design has correctness holes to resolve at execution. |

---

## 1. GESTALT GOAL

The storybook reads like a single coherent iOS-27 document system — the reference
north-star is the user's dark-mode iOS captures (Apple Music page system +
Control-Center recessed-channel slider + Maps), `scratchpad/evidence/frames/`:

- **A FUNCTIONING glass progress rail** at the top of every route — a thick
  (~10px, √φ over a 6px baseline) frosted RECESSED CHANNEL with a luminous
  warm→route-hue fill that CLIP-REVEALS from one end (rounded caps undistorted —
  the iOS-26.2 Liquid-Glass-slider gestalt), with a spring-LAGGING leading glint.
  Always render the empty channel at scroll-top. The D5 full-width slab is dead;
  WS11 makes the corrected bar beautiful + integrated — depth (groove inset +
  separation lift + specular top edge) reads it as floating glass above content,
  NOT a 2px hairline.
- **Sections that TYPEWRITER and FADE UP on scroll-entry** — headings reveal
  per-glyph (a calm iOS-materialization wipe, NOT a bouncy spell-out) as they
  cross into view; bodies lift+fade on their own `view()` timeline. On the spring
  clocks (`--spring-smooth` + `--spring-smooth-duration`), never linear. PRM-safe
  by construction (text never strands invisible); CLS≈0 (no per-glyph reflow).
- **ONE standardized page-API family** — the user's four conceptual names
  (`StoryPage`/`CategoryPage`/`ComponentPage`/`SubPage`) map onto the EXISTING
  `StoryDepth` D0-D3 ladder (depth IS size, the √φ display ladder). **The depth
  ladder ships as TWO components over ONE `StoryPageShell` core** (§2C — the P4
  collapse): `StoryPage` is the section-stack member for D0/D2/D3 (manifest-depth-
  derived), `CategoryPage` is the D1 bento. Supersedes the ad-hoc `StoryPage`-
  variant-branching + the parallel `SectionLanding` one-off. Clean break, no
  legacy alias.
- **Consistent suffusal** — ONE warm `--field-h` route hue threaded through every
  member: the field bg, the rail fill, the section eyebrow/rail/IconChip POP all
  read the SAME category color event. LOUD color on hero/tile chrome; body ink
  untinted (the one-color-event proportion). No page reads gray/flat; warm-cream
  identity; both modes.

The four arms are ONE system: the page-API family is the chassis the bar, the
entrances, and the suffusal all hang off.

---

## 2. MECHANISM (concrete, idiomatic — every mustFix folded)

### 2A. The thick glass progress rail (BG.W-SCROLL-PROGRESS-GLASSY)

**Why a thickened scaleX bar is forbidden** (three falsifiers): (a) `scaleX(0→1)`
on a thick pill squashes its end-caps to ellipses and at `scaleX(0)` shows no
TRACK; (b) `backdrop-filter` on a 10px strip blurs a negligible area → a thin
bar's glass is RIM + TINT + SPECULAR + GROOVE, not blur; (c) `proof:no-layout-
animation` forbids animating `width`/`height`. The honest architecture is a TRACK +
a clip-revealed FILL with a single-writer inherited `--scroll-fill`.

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
  `blur(8px·level) saturate(…) brightness(…)` (`tokens/glass.css:140`, verified).
  `blur(var(--glass-blur-quiet))` double-wraps → invalid → ZERO blur. Use the
  composite directly. Never `url()` (WebKit bug 245510).
- **FIX#2 — ONE animation on the TRACK; everything reads `--scroll-fill` by
  inheritance** (`@property{inherits:true}`). DRY; "exactly 1 animation" literally
  true.
- **FIX#3** — start stop is `var(--card)`, not `oklch(from var(--card) l c h)`.
- **FIX#4 — the drive sits under `@supports` ONLY, never the no-preference gate**
  (that no-preference-only gating IS the D5 dead-bar root). The fill is an
  INFORMATIONAL position cue (the shipped FadingScroll
  `@property-under-@supports-only` precedent, `base-misc.css:96-110`), so it tracks
  under PRM and on Safari<26. Only the glint drops under PRM.

**The strip-reserve, no occlusion.** No negative margin. `StoryPageShell`'s hero
reserves `padding-block-start: var(--scroll-rail-thickness)` + the scroller carries
`scroll-padding-block-start: var(--scroll-rail-thickness)`. Gate: at scroll-top the
hero's first painted content `getBoundingClientRect().top ≥` the bar's `bottom`.

**The drive signal is `--scroll-fill` itself, and it is MAIN-THREAD — PROVEN on
WebKit (P1).** A registered custom property on a `scroll()` timeline is NOT
compositor-accelerated (it feeds any `var()` → recomputed main-thread each frame),
so `getComputedStyle(fill).getPropertyValue('--scroll-fill')` reflects the live
value on Chromium AND WebKit AND the JS fallback. **P1 verified this on real Safari
26** — the load-bearing assumption HOLDS.

**§2A.bis — THE GATING PREDICATE (RISK-3, SETTLED by P1).** `supportsScroll
Timeline()` (`supportsCssTimeline.ts:38`, verified) probes ONLY
`CSS.supports("animation-timeline", "scroll()")`. The open question was whether
WebKit, passing that probe, ALSO interpolates a registered custom property on a
scroll timeline. **P1 proved it does.** So:

- **The gating predicate is the SIMPLE `!supportsScrollTimeline()`.** WebKit passes
  the probe AND reflects `--scroll-fill` live → it runs the native CSS path, no JS
  writer. Chromium likewise. Only a genuinely-no-`scroll()` engine (Safari<26)
  fails the probe and gets the JS fallback.
- **`supportsScrollDrivenCustomProperty()` ships as a DEFENSIVE narrower probe**
  (the FadingScroll-proxy one-shot hidden-element measure; jsdom/SSR return false —
  the negative-probe discipline) but is NOT the gating predicate. It is retained so
  a future WebKit regression that ACCEPTS `scroll()` yet drops custom-property
  interpolation is catchable without a UA sniff; the bar's live gate stays the
  simple form P1 validated.

```ts
// supportsCssTimeline.ts — ADD (defensive; NOT the live gating predicate per P1):
export function supportsScrollDrivenCustomProperty(): boolean {
    // A one-shot hidden-element measure of a registered @property <percentage>
    // animated on scroll(self) (the FadingScroll base-misc.css:96-110 proxy).
    // jsdom/SSR → false. Retained as a regression tripwire, not the gate.
}
```

**The JS fallback — the CONFIRMED signature.** `useScrollProgress` is the WRONG
tool (returns `Ref<number>`, maps element-in-viewport, writes nothing). The
fallback composes **`useScrollTrigger`**, whose signature is POSITIONAL
(`useScrollTrigger.ts:153`: `useScrollTrigger(scrollSource: MaybeRefOrGetter<…>,
opts = {})`, verified) and which is **NOT exported from any barrel** (import
directly from `src/composables/motion/useScrollTrigger` — the `scroll-system.vue:45`
precedent). It is constructed ONLY on the fallback path (DEFT — on a native engine
it would otherwise attach a rAF reader for nothing):

```ts
// AppShell.vue — dual-path single-writer, constructed ONLY when native is absent.
import { useScrollTrigger } from "../../src/composables/motion/useScrollTrigger";
import { supportsScrollTimeline } from "../../src/composables/motion/supportsCssTimeline";

if (!supportsScrollTimeline()) {                 // P1: the SIMPLE predicate is correct
    const { progress } = useScrollTrigger(() => mainScrollerEl.value /* .demo-main-scroller */, {});
    watch(progress, (p) => barEl.value?.style.setProperty("--scroll-fill", `${p * 100}%`));
}
// native (P1-confirmed incl. WebKit) → the CSS owns --scroll-fill, no JS construction; no double-write.
```

The fallback ALSO runs under PRM (the bar must track for reduce users — an
informational cue, not vestibular motion).

**The liquid-weight TENSION, resolved with a REAL spring.** A lagging FILL is a
LIE about scroll position, so the FILL is 1:1 truthful; the liquid weight is the
**JS keyframes.js `SpringProgress` GLINT FOLLOWER** (demo-private, `AppShell.vue` —
import from `@mkbabb/keyframes.js`, the `useDragMorph.ts:54` precedent) — a small
spring that lags the live `--scroll-fill` fraction and writes `--glint-x`, so the
leading-edge glow trails the fill with genuine inertia + overshoot. PRM-dropped
(`display: none`). This carries the universal liquid-weight law; the whole-bar feel
also rides WS1's `.smooth-scroll` momentum + the §2B section entrances.

**AA + dark arm + glass-on-glass (Apple HIG).** The fill-as-graphic clears ≥3:1
over the variable frosted backdrop in BOTH modes. Dark arm: track edge +
transmission carry the silhouette (W-DARK-MATERIAL); plain per-mode token pairs
only — NO `light-dark()` inset-shadow fragment (the trap computes the whole box-
shadow to `none`, MEMORY). **Glass-on-glass:** the bar is CHROME glass; the WS8
deep-glass surfaces below it are CONTENT glass. Apple's HIG forbids stacked glass —
the bar reads as the ONE chrome glass and a content-tier deep-glass surface
immediately under it is subdued (the bar wins the material read). An acceptance
check (§5), not a mechanism.

### 2B. Section typewriter + fade-up entrances (BG.W-SECTION-TYPEWRITER-FADEUP)

`useTypewriter` (413-line stochastic mount-not-IO sleep-loop, grows heading width
per char) → below-fold-invisible + per-char-reflow CLS. The CSS `.char-stagger`
recipe is ALSO mount-triggered. A native `view()` timeline cannot express a
per-glyph stagger. Resolution — **PROVEN on Chromium (P3, build=true):**

- **Section HEADINGS → `<SplitChars :stagger="false">` + the shipped
  `vScrollRevealOnce` IO gate** (the calm typewriter-WIPE). **TWO in-fence src/
  edits:**

  - **`SplitChars.vue` — add `stagger?: boolean` (default `true`).** Today line 90
    is `cn("char-stagger", props.class)` UNCONDITIONAL (verified) — fires at load.
    `:stagger="false"` omits the `.char-stagger` host (mints BARE `.char` spans +
    `--char-index`/`--char-total`; `aria-label` + per-glyph `aria-hidden`
    PRESERVED; engine-FREE, composes `useCharStagger` only → root-barrel-safe). NOT
    a `.char-stagger`-neutralizing specificity override.
  - **`typography/utilities.css:158` — tokenize the hardcoded `30ms`** (verified at
    that line). Mint `--char-stagger-step` (default `30ms`) and re-point BOTH the
    `.char-stagger` recipe AND the new `section-entrance.css` reveal onto the ONE
    token — kills the 24-vs-30ms drift. **HOME (P3 mustFix):** a reveal/mount
    cadence is NOT scroll-driven, so the token lives in **`scheme-motion.css` /
    typography**, NOT `scroll-tokens.css`.
  - **The reveal gate is the shipped `vScrollRevealOnce` directive**
    (`useStaggerReveal.ts:123`), NOT a new `useSectionReveal`. It sets
    `data-revealed` on the bound element's CHILDREN + unobserves-once + has a no-IO
    immediate-reveal fallback. **WIRING constraint:** `.story-section__heading` MUST
    be a DIRECT CHILD of the bound section root, so `data-revealed` lands ON the
    heading.

  ```css
  /* section-entrance.css (NEW, colocated). Re-declares NEITHER gl-cascade-build
     NOR .scroll-cascade > * (the DRY guard). Text NEVER strands invisible. */
  @media (prefers-reduced-motion: no-preference) {
      /* P3 CORRECTION: data-revealed lands ON the heading (the crossed direct child),
         NOT on an ancestor. Selector is .story-section__heading[data-revealed], not
         the ancestor form [data-revealed] .story-section__heading. */
      .story-section__heading[data-revealed] .char {
          animation: gl-char-rise var(--spring-smooth-duration) var(--spring-smooth) both;
          animation-delay: calc(var(--char-index) * var(--char-stagger-step));
      }
      .story-section__heading:not([data-revealed]) .char { opacity: 0; transform: translateY(0.4em); }
  }
  /* FIX (P3, load-bearing): the .char must lay out as inline-block or translateY no-ops. */
  .story-section__heading .char { display: inline-block; }
  @keyframes gl-char-rise { from { opacity:0; transform:translateY(0.4em);} to {opacity:1; transform:none;} }
  @media (prefers-reduced-motion: reduce) {           /* PRM + no-IO → terminal-visible */
      .story-section__heading .char { opacity: 1; transform: none; }
  }
  ```

  - **The jumped-past / deep-link mitigation (P3 mustFix — do NOT ship an
    opacity:0 heading as "expected IO semantics").** A section already ABOVE the
    viewport on first observe (a hash deep-link, scroll-restoration, or a fast
    jump) MUST reveal. `vScrollRevealOnce`'s no-IO immediate-reveal fallback covers
    the no-`IntersectionObserver` env; for the IO-present env, the binding adds a
    first-observe check: any bound child whose `getBoundingClientRect().bottom < 0`
    (already scrolled past) is revealed immediately. A hash-deep-link + a scroll-
    restoration case JOIN the acceptance set (§5), not just gradual-scroll.
  - **The `#heading` SLOT carve (P3 mustFix — PRESERVE, do not silently break).**
    `SplitChars` takes only a STRING `text`, so a `#heading` SLOT cannot per-glyph
    reveal. Keep `v-if="$slots.heading"` intact; the slot branch is the documented
    ESCAPE (slot → no per-glyph reveal, the consumer owns its own heading markup).
    `proof:hierarchy` H2 stays green on the slot path.

- **Section BODIES → the SHIPPED `.scroll-cascade`, REUSED VERBATIM.**
  `section-entrance.css` must NOT re-declare `@keyframes gl-cascade-build` nor
  `.scroll-cascade > *` (a same-name `linear` re-declaration STRIPS the
  `--ease-scroll-spring` liquid-weight law from every storybook body). The section
  root binds the existing WS4-D14-FIXED `.scroll-cascade`. Safari<26 / no-`view()`
  fallback REUSES the shipped `[data-scroll-reveal-once]` / `gl-reveal-once`.
  **CAVEAT (P3 mustFix):** the body cascade arm is verified ONLY AFTER WS4 lands the
  `%`-off-`--col` form — at HEAD the cascade-columns recipe is STILL the `* 0` +
  `calc(% + ms)` unit error (`scroll-choreography.css:233-238`). Do NOT imply the
  body cascade works today. The §5 `animation-range !== 'normal'` check is RED until
  WS4 lands.

- **Metric/number values → `useCountup`** (import from `@mkbabb/glass-ui/motion` —
  keyframes-bearing, NEVER the root barrel; the SCC fence). Metric surfaces only.

**No animation double-bind.** `.story-section__heading` is NET-NEW; it is EXCLUDED
from the `.scroll-cascade > *` child set — the cascade lifts the BODY children, the
heading carries ONLY the per-glyph rise on its `.char` descendants. ONE node binds
at most ONE `animation`. **The cross-context case (P3 mustFix):** capture a page
whose StorySection root is ITSELF a page-level `.scroll-cascade > *` child — confirm
no compounded section-block-fade × char-rise muddiness and no node double-binds
(the "verified across 97 contexts" claim is OVERSTATED — P3's evidence is ONE page,
`/forms/checks`; §5 enrolls the cross-context + the per-category sweep).

**`useTypewriter` is reserved for the front-door D0 hero ONLY** — never a section
heading. `proof:demo-design` D4 anti-fork bite stands. **Named-successor fold:** CSS
`animation-trigger`/`timeline-trigger-name` (Chrome 145/146, 2026) is recorded as
the named successor; the `vScrollRevealOnce` IO directive stays the cross-engine
floor (WebKit/Safari lack `animation-trigger` in 2026).

**StorySectionHeader fold (NO-LEGACY — the gate-zombie, owned by WS11).**
`StorySectionHeader.vue` (105L, ZERO Vue importers) — its FUNCTION migrates into
`StorySection`'s `<SplitChars :stagger=false>` heading + the §2D suffuse accent.
WS11 owns the fold ATOMICALLY (no RED window): delete `StorySectionHeader.vue` AND
in the SAME commit re-point its gate clauses — `proof-storybook-meta.mjs` M9d (the
`sshExists && sshComposesIconChip` dogfood-mint, lines 422-439) re-points onto
`StorySection`, and the `proof-page-hierarchy.mjs:83` allowlist entry is removed.
WS4 keeps only the truly-dead `_chassis/` delete.

### 2C. The standardized page-API family (BG.W-STORY-PAGE-API)

**DECIDED (P4 — COLLAPSE-TO-2): TWO shipped components over ONE shell. The user's
four NAMES survive as the D0-D3 CONCEPTUAL DEPTH LADDER; only two COMPONENTS
ship.** This deviates from the literal four-component ask — **FLAG FOR USER
CONFIRMATION** (the user asked for `StoryPage`/`CategoryPage`/`ComponentPage`/
`SubPage` by name). The reconciliation:

- **The depth ladder is the user's four names**: D0 front-door (`StoryPage` proper),
  D1 category landing (`CategoryPage`), D2 component main ("ComponentPage"), D3 sub
  ("SubPage"). The four CONCEPTS are real and honored.
- **Only TWO components are needed to express them** (P4, decidable from `grep`):
  - `StoryPage` (D0/D2/D3) — present at HEAD: 121/121 leaves compose bare
    `<StoryPage>`, ZERO `:depth`/`:hero-scale` LEAF overrides; D2 (`buttons`, the
    first `display` MAIN) and D3 (`card`, a later sub) compose IDENTICAL
    `StoryPage`+`StorySection`+`ShowcaseFrame` stacks — NO body-shape difference,
    only the manifest `heroScale`/`depth` differs. The "ComponentPage" and "SubPage"
    body layouts are byte-identical-modulo-`heroScale`, which is already manifest-
    derived. A second + third NEW component would be dead-code forks.
  - `CategoryPage` (D1) — the genuinely-distinct bento: `SectionPreviewCard` grid +
    FROZEN preview stills, folding `SectionLanding.vue` (DELETED).

**Why NOT a J-inv-10 argument (P4 mustFix — corrected mis-attribution).** The
collapse is NOT justified by the `src/` ≥2-consumer invariant — `ComponentPage`/
`SubPage` would be DEMO-PRIVATE chassis, EXEMPT from that bar (the overfitting-audit
"private demo helper" clause). The collapse is justified on **KISS + zero-consumer
dead-code**: a NEW `ComponentPage.vue`/`SubPage.vue` whose body is a byte-identical
zero-logic delegation to the SAME shell as `StoryPage` adds two files with no
behavior of their own — dead chassis the BD spec-ahead-of-wire failure warns
against.

```
StoryPageShell.vue   ← the shared CORE. SINGLE <article class="route-enter"> root.
                       Owns: the colocated <StoryHeroBackdrop> (carved from StoryHero's
                       6-way substrate switch), the gravity header cluster (LIFTS WS1's
                       de-duped StoryHeader: eyebrow → Fira-Code subpath chip → audacious
                       √φ title → blurb), the .scroll-cascade body wiring, the section
                       system (StorySection + the 2B reveal), the --field-h suffuse thread,
                       the §2A hero top-pad-clear, the progress-rail integration.
                       Props: depth, heroScale, background, + the body slot.
                       body-layout is INTERNAL to the shell (section-stack vs bento),
                       SELECTED by the member, not a leaf-settable string.
  ├─ StoryPage.vue     (D0/D2/D3) the section-stack member. heroScale is the manifest-bound
  │                    computed (mega @ D0 / "5" @ D2 / "4" @ D3). A ≤1-element ZERO-LOGIC
  │                    delegation: <StoryPageShell :depth="depthFromManifest" body-layout="stack">.
  │                    The optional #source code slot (folds Code.vue) is a per-page option
  │                    AT ANY DEPTH (decoupled from the member — §below), not a member axis.
  └─ CategoryPage.vue  (D1) the bento member. heroScale "hero" (FIX: manifest source-of-truth,
                       NOT "mega"; manifest.ts:421 returns heroScale:"hero", depth:"D1").
                       A ≤1-element ZERO-LOGIC delegation: <StoryPageShell :depth="'D1'"
                       body-layout="bento">. Folds SectionLanding.vue (DELETED). One-GL
                       budget: FROZEN preview stills.
```

**SPA4 — byte-precise (P4 mustFix).** `proof:story-page-api` asserts ZERO member-
specific layout LOGIC AND that the member's `:depth`/`:hero-scale` is **the
manifest-bound COMPUTED** (`StoryPage.vue:60` reads `current.value?.story.depth`,
verified — that MUST keep working), NOT a STRING LITERAL. Self-test bites: (1) a
`depth="D2"` STRING LITERAL on the section-stack member REDs; (2) a re-forked
section-stack member under a NEW name (a re-introduced `ComponentPage.vue`/
`SubPage.vue` zero-logic delegation) REDs. `body-layout` is INTERNAL to the shell
and member-selected (`StoryPage`→`stack`, `CategoryPage`→`bento`); a leaf-settable
`body-layout` string is forbidden.

**The `#source` code slot (P4 mustFix — DECOUPLED from the member-count question).**
The `#source` code slot is a per-page OPTIONAL at ANY depth on the ONE shell, NOT a
distinguishing member axis. The falsified premise was "`#source` distinguishes
ComponentPage from SubPage" — **CodeBlock's SOLE importer is `display/card.vue`** (a
D3 sub, verified), so `#source` does not partition D2 from D3. The
**`CodeBlock.vue` → `Code.vue` retire** stays a SEPARATE DRY win (clears the code
primitive's ≥2-consumer bar by re-pointing `display/card.vue`), decoupled from the
page-API member count.

**The member→depth→heroScale map is manifest-derived (verified against
`assignDepths()`):** D0 `mega` (foundations/intro) · D1 `hero` (the 11 section
landings) · D2 `5` (each category's first non-front-door MAIN) · D3 `4` (the rest).
The family FORMALIZES the existing ladder; it does NOT re-invent it. **Cap the
audacious tier:** `audacious`/`mega` (peaks 177-352px) stay reserved for the D0
front door + metric/number surfaces; D1/D2/D3 step DOWN (`hero`/`5`/`4`).

**The single-route-root invariant (P5 — oracle settled).** The bare-swap route
transition (WS1) requires each routed root present EXACTLY ONE element. Each
member's template is ONE `<StoryPageShell>` element → Vue resolves the single-child
root transparently to the shell's `<article>`. No fragment, no `TooltipProvider`-as-
root (the `StoryPage.vue:64` bug is ALREADY fixed at HEAD — `TooltipProvider` sits
INSIDE the `<article>` at line 81, verified; the build agent does NOT re-fix it).
**The single-root ORACLE (P5):** `@vue/compiler-sfc` raw-parse — a comment+element
root parses to child types `[3,1]` (1 element, GREEN); a genuine fragment to
`[1,1]` (2 elements, RED); a v-if/v-else root also `[1,1]` but the later sibling
carries the `else` directive (distinguishable — allow). `proof:story-page-api`
asserts one named member per route AND single-element root across ALL routes — over
the real migrated catalog, NOT a stub set.

**The migration (the real churn risk).** Depth is catalog-position-derived
(`assignDepths()`); the manifest/router owns the member choice. The **121
`<StoryPage>` compositions** (252 references; **97 `<StorySection>`**, both verified)
migrate in ONE clean break (manifest-driven, mechanical, no alias) + scrub the 7+
stale chassis-symbol comments (`StoryHero cardTier` / `DemoFrame variant`). The
migration folds **`SectionLanding.vue`** — **which has exactly ONE real importer,
`router.ts:31`** (P5 correction; the manifest `SectionLanding` is a TYPE, `AppShell`
references `SectionLandingSkeleton`, the dock-nav/preview-card refs are comments —
NOT three importers as pass-2 said) — into `CategoryPage`, and absorbs `StoryHero`'s
6-way backdrop switch into `StoryHeroBackdrop`. **The facade-resolver design (P5)
carries correctness holes to resolve AT EXECUTION** (the single live importer means
the router re-point is small, but the resolver's depth→member dispatch must be
proven over the FULL catalog, not designed on paper). The gate's "single-element
root across ALL routes" is the anti-regression, exercised on the FULL catalog.

**Colocation + the 500-line law.** `StoryHero.vue` (432L) collapses into
`StoryPageShell` + the colocated `StoryHeroBackdrop.vue` (the 1 real importer
re-pointed — `router.ts` via `CategoryPage`; `StoryHero` proper is rebuilt into the
shell). `story-hero.css` (717L, over the bound) splits into colocated partials AND
DRAINS its bespoke entrance keyframes (`story-hero-title-rise:546` /
`cluster-rise:576` / `subordinate-fade:522`) by wiring the hero entrance onto the
shared 2B primitives (SplitChars for the title, the gravity cluster on the spring
clocks). A half-migration that leaves StoryHero alongside adds a 4th dead chassis —
the migration is COMPLETE or the wave does not close.

### 2D. Storybook suffusal consistency (BG.W-STORYBOOK-SUFFUSE)

The smallest, most-integrated arm — a consistency LAYER. WS1 owns the FIELD (one
shell aurora + `warmFieldHue` + the warm `[25,95]` `--field-h` register, already
wired at HEAD). WS11 READS the field hue and threads it through the page-API chrome:

- the rail fill reads `--field-h` (§2A);
- each section's eyebrow/rail/IconChip POP reads the per-category
  `--section-label-accent` (the `.section-label--tinted` register), threaded by
  `StoryPageShell` so a category reads ONE coherent color event across its pages;
- `StorySection` gains a default-on section accent (the StorySectionHeader fold's
  POP, §2B);
- **the warm-not-gray seam — HEAD-CHECK, do NOT blind-fix.**
  `SectionPreviewCard.vue:175` already reads `--field-h: clamp(25, var(--card-field-
  h, 62), 95)`, the fills are warm `oklch(0.90 0.075 …)`, the comment (`:191`) is
  "NO gray, NO teal — warm by the field-h clamp". The card's READ is already warm.
  **If gray persists it is UPSTREAM** in how `--card-field-h` is WRITTEN (does the
  D1 landing pass `warmFieldHue(categoryId)`?), not the card's read. The suffuse arm
  VERIFIES the PAINTED card hue on a fresh capture FIRST; it edits the WRITE source
  only if a real regression is captured.

**Fences (preserved):** ONE color event per surface (`proof:suffuse` d1 body-ink-
untinted, d2 chip≤glyph, d3 ≤1 tinted-event-family/surface); **the bar-as-page-
chrome is EXEMPT from the one-color-event content-surface count (RECORDED in the
gate, not assumed)**; warm-cream identity; `--motion-accent` purple demo-local;
`--surface-tint-*` in-srgb (AW.W26); both modes, dark-recalibrated washes
(BA.W-STAGE). The binding bar is a FRESH per-page gestalt capture across categories
(NO gray/flat page), not a source-green claim.

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
  mainScrollerEl.value, {})` (POSITIONAL, imported directly from
  `src/composables/motion/useScrollTrigger`) + the single-writer `--scroll-fill`
  watcher ONLY under `!supportsScrollTimeline()` (P1's SIMPLE predicate). Wire the
  `SpringProgress` glint follower (`--glint-x`), PRM-dropped.
- `src/composables/motion/supportsCssTimeline.ts` — ADD
  `supportsScrollDrivenCustomProperty()` as a DEFENSIVE tripwire (NOT the live gate,
  per P1).
- `scripts/proof-ba-animate.mjs` + `tests-visual/ba-animate.spec.ts` — ADD the DEMO
  bar arm: `railHealth()` (the engine-agnostic `--scroll-fill` growth + no-distort
  caps + visible-track-at-top + ≥3:1 AA) scrolling `.demo-main-scroller` (NOT
  `window`). DELETE the OLD demo-bar scaleX assertion + the `|| (headless not
  reflecting)` OR-escape (`:166`). The LIBRARY-recipe scaleX/`currentTime` arm
  (scroll-vt.vue) is WS1's — UNTOUCHED. (Coexistence PROVEN by P2.)

### BG.W-SECTION-TYPEWRITER-FADEUP (⇐ WS1 `.scroll-cascade` kept + WS4 D14)
- `src/components/custom/split-chars/SplitChars.vue` — add `stagger?: boolean`
  (default `true`); `:stagger="false"` omits the `.char-stagger` host (a11y
  preserved). PRESERVE the `#heading` slot branch (the no-reveal escape). (In-fence
  src/ edit #1.)
- `src/styles/scheme-motion.css` (NOT scroll-tokens.css — P3 mustFix) — mint
  `--char-stagger-step` (default `30ms`); re-point `typography/utilities.css:158`
  `.char-stagger` recipe onto it. (In-fence src/ edit #2.)
- `demo/stories/StorySection.vue` — default-on `revealHeading`: wrap the `<h2>` in
  `<SplitChars :stagger="false">`, mark it `.story-section__heading` (DIRECT child of
  the section root), EXCLUDE it from `.scroll-cascade > *`, bind `vScrollRevealOnce`
  on the section root. Default-on section accent (the StorySectionHeader fold).
  DELETE `StorySectionHeader.vue` + re-point `proof-storybook-meta.mjs` M9d + remove
  `proof-page-hierarchy.mjs:83` (ATOMIC, §2B).
- `src/composables/motion/useStaggerReveal.ts` (`vScrollRevealOnce`) — the first-
  observe `getBoundingClientRect().bottom < 0` already-past reveal (the deep-link /
  scroll-restoration mitigation, P3). Verify this is additive (the existing no-IO
  fallback stays).
- `demo/stories/section-entrance.css` (NEW, colocated) — the
  `.story-section__heading[data-revealed] .char` reveal ONLY (CORRECTED selector,
  P3) + the `display:inline-block` restate (load-bearing, P3) + the PRM terminal-
  visible arm. REUSES `.scroll-cascade` + `gl-reveal-once` verbatim — re-declares
  NEITHER `gl-cascade-build` NOR `.scroll-cascade > *`.
- Metric surfaces — wire `useCountup` (import from `/motion`).

### BG.W-STORY-PAGE-API (⇐ WS1 route-enter/hero-fit/cluster-de-dup + WS4 chassis)
- `demo/stories/StoryPageShell.vue` (NEW) — the shared core, single `<article>`
  root, hero top-pad-clear, the suffuse thread, the INTERNAL `body-layout`
  (stack/bento) selected by the member.
- `demo/stories/StoryHeroBackdrop.vue` (NEW, colocated carve from StoryHero's
  6-way switch).
- `demo/stories/StoryPage.vue` (rebuilt — the D0/D2/D3 section-stack member, ≤1-
  element ZERO-LOGIC delegation, manifest-bound computed `:depth`), `CategoryPage.vue`
  (NEW — the D1 `hero` bento member, folds `SectionLanding.vue` → DELETED + the ONE
  real importer `router.ts:31` re-pointed). **NO `ComponentPage.vue` / `SubPage.vue`
  new files** (P4 collapse-to-2). The optional `#source` slot folds `Code.vue` as a
  per-page option at any depth; `CodeBlock.vue` retires (its sole importer
  `display/card.vue` re-points) — a SEPARATE DRY win.
- `demo/stories/StoryHero.vue` — DELETED (collapsed into shell + backdrop).
- `demo/stories/story-hero.css` — split into colocated partials below 500L; bespoke
  entrance keyframes drained onto 2B.
- `demo/router.ts` + the 121 `<StoryPage>` compositions — depth→member mapping
  (StoryPage for D0/D2/D3, CategoryPage for D1); mechanical clean-break migration +
  the 7+ stale-comment scrub.
- `scripts/proof-story-page-api.mjs` (NEW) — exactly ONE named member per route;
  ZERO member-specific LAYOUT logic; `:depth` is the manifest-bound COMPUTED (a
  `depth="D2"` string literal REDs; a re-forked section-stack member under a new
  name REDs); single-element route root across ALL routes (`@vue/compiler-sfc` raw-
  parse oracle, full catalog, not a stub); no raw chassis triplet survives. Scope to
  member-delegation/zero-logic/full-catalog-single-root ONLY (proof-page-chassis
  PC2/PC6 cover depth-ladder/heroScale/single-root — do not re-assert). FOLD the
  superseded landed-tranche page gates (`proof:page-redesign`/`proof:page-prune`
  subjects) rather than stacking a 6th page-* gate.

### BG.W-STORYBOOK-SUFFUSE (⇐ WS1 field)
- `demo/stories/StoryPageShell.vue` — thread `--field-h` + `--section-label-accent`.
- `demo/stories/StorySection.vue` — default-on section accent (shared with §2B).
- `demo/stories/SectionPreviewCard.vue` — ONLY if a real gray regression is
  captured (the seam is closed at HEAD — §2D); else NO edit. If a regression IS
  captured, the edit is at the WRITE source (`--card-field-h`), not the card's read.
- `scripts/proof-suffuse.mjs` — per-page ledger rows for the page-API members; the
  bar-as-chrome exemption RECORDED.

### Cross-cutting gate enrollment (make Safari REAL)
- `tests-visual/playwright.config.ts:118` — ADD the new WS11 specs
  (`scroll-rail.spec.ts` + the entrance/page-API cross-engine specs) to the `webkit`
  project `testMatch` (currently the 2-spec allowlist
  `["safari-webgl.spec.ts","aurora-swraster.spec.ts"]`). Run:
  `npx playwright test --config tests-visual/playwright.config.ts --project=webkit`.
  Without this the "Chrome AND Safari" bar NEVER executes. **The entrance spec
  (§2B) MUST be enrolled** (P3 mustFix — paint-prove the heading reveal on real
  WebKit, not just Chromium).

---

## 4. WAVE BREAKDOWN (the BG.W-* set)

1. **`BG.W-SCROLL-PROGRESS-GLASSY`** ⇐ WS1 LIBRARY recipe. The demo bar STOPS
   composing `.scroll-progress` (clean break, §0.5) and becomes the thick glass
   TRACK + clip-revealed FILL (inherited `--scroll-fill`, ONE animation, on
   `scroll(nearest block)`) + a JS `SpringProgress` lagging glint.
   `backdrop-filter: var(--glass-blur-quiet)` (composite). Native path ships on
   Chromium AND Safari (P1); JS fallback gated on `!supportsScrollTimeline()` for
   Safari<26 only. Reduced-transparency firms to opaque. Truth on the fill, liquid
   weight on the glint. Hero top-pad-clear; ≥3:1 AA; z below dock; no glass-on-glass
   stack. ba-animate gains the DEMO arm (coexistence PROVEN, P2); the LIBRARY arm
   (WS1) untouched.
2. **`BG.W-SECTION-TYPEWRITER-FADEUP`** ⇐ WS1 (`.scroll-cascade` kept) + WS4 (D14).
   Section headings per-glyph reveal via `<SplitChars :stagger="false">` + the
   shipped `vScrollRevealOnce` gate (fires on CROSSING — PROVEN Chromium, P3;
   selector `.story-section__heading[data-revealed] .char`); bodies on the REUSED
   `.scroll-cascade`; metrics via `useCountup`. Two in-fence src/ edits (the prop +
   the `--char-stagger-step` token in scheme-motion). Deep-link/above-viewport
   reveal + `#heading` slot carve preserved. PRM terminal-visible, CLS≈0, no double-
   bind, heading excluded from the cascade child set. ATOMIC StorySectionHeader fold
   + gate re-point.
3. **`BG.W-STORY-PAGE-API`** ⇐ WS1 + WS4. ONE `StoryPageShell` core + **TWO** ≤1-
   element ZERO-logic named members on the depth ladder: `StoryPage` (D0/D2/D3
   section-stack, manifest-bound `:depth`) + `CategoryPage` (D1 `hero` bento). NO
   ComponentPage/SubPage new files (P4 collapse-to-2; the four names are the
   conceptual ladder, flagged for user confirmation). `StoryHeroBackdrop` carve;
   `SectionLanding` folded into `CategoryPage` (ONE real importer re-pointed);
   `StoryHero`/`story-hero.css` collapsed below 500L; single route root across the
   full migrated catalog; `proof:story-page-api` minted (zero-logic + manifest-bound-
   depth + single-root + the two anti-fork self-test bites) + the superseded page
   gates folded. THE capstone the others feed into.
4. **`BG.W-STORYBOOK-SUFFUSE`** ⇐ WS1 (field). Thread ONE warm `--field-h` route
   hue through every member (rail fill + section eyebrow/rail/IconChip); default-on
   section accent; VERIFY the SectionPreviewCard hue (edit the WRITE source only on
   a real captured regression). One-color-event fences preserved; both modes.

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
1. **The `railHealth()` fixture FIRST** — stand the minimal real-engine
   `railHealth()` fixture and prove the teeth distinguish live-from-dead on
   **chromium AND webkit** (P1 proved the WebKit capability; the FIXTURE stand-up is
   build=false, still owed). The gating predicate is `!supportsScrollTimeline()`
   (P1's verdict, not the narrower probe).
2. Stand up the integration branch (WS1+WS4 landed, §0 HEAD-checks GREEN).
3. The four-arm acceptance captures.

**The engine-agnostic gate predicate (`railHealth()`):**

```ts
// railHealth(page, fillSel) — engine-AGNOSTIC; chromium AND webkit AND JS fallback.
async function railHealth(page, fillSel) {
    const read = () => page.$eval(fillSel, (el) =>
        getComputedStyle(el).getPropertyValue("--scroll-fill").trim());     // MAIN-THREAD → reliable (P1)
    const scrollPort = (frac) => page.$eval(".demo-main-scroller", (el, f) => {
        el.scrollTop = el.scrollHeight * f;                                 // FIX: the inner port, NOT window
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
  diffuses content behind it) + has depth (groove inset + separation lift + specular
  edge).
- AA both modes (the fill as graphic ≥3:1 over the frosted backdrop).
- Safari<26 / capability-probe-false: the JS fallback writes `--scroll-fill` →
  `railHealth()` GREEN. **Force-tested** by stubbing the probe → false in a webkit
  run (the JS fallback must be the SOLE live writer).
- PRM: the fill TRACKS (`railHealth()` GREEN); only the glint drops.
- reduced-transparency: the track firms toward opaque (groove+rim carry the
  silhouette, no blur); the fill still tracks.
- glass-on-glass: the bar reads as the ONE chrome glass, NOT a second plate stacked
  on the deep-glass content directly below.
- the hero's first content clears the bar at scroll-top (no occlusion); CLS≈0.

**Entrances (BG.W-SECTION-TYPEWRITER-FADEUP):**
- a BELOW-THE-FOLD section's heading reveals per-glyph on CROSSING (a fresh scroll-
  through: `firstChar.getAnimations().length` 0→1, name `gl-char-rise`), NOT at load
  (PROVEN Chromium, P3) — **AND re-proven on real WebKit/Safari** (P3 mustFix —
  enroll the entrance spec in the webkit testMatch); the body lifts+fades on the
  same crossing. Reads as a liquid-weight typewriter-WIPE (fresh Chrome AND Safari
  gestalt judgement).
- the JUMPED-PAST / deep-link case: a hash deep-link + a scroll-restoration capture
  — the heading does NOT strand at opacity:0 (the first-observe past-viewport
  reveal, P3).
- the CROSS-CONTEXT case: a page whose StorySection root is ITSELF a page-level
  `.scroll-cascade > *` child — no compounded fade×rise muddiness, no double-bind.
- the PER-CATEGORY SWEEP: the ~105 default-on headings captured per-category, both
  modes — long headings, special chars, headings nested in cards/grids (the
  headless-green/visually-broken floor; P3 admitted this sweep not-done).
- the `#heading` SLOT carve: a slot-based heading does NOT per-glyph reveal (the
  documented escape) and stays terminal-visible.
- PRM: heading + body terminal-visible (no transform, never vanishes).
- CLS≈0 (no per-glyph width reflow — `display:inline-block` on `.char`); no node
  double-binds two `animation`s; the heading is NOT in the cascade child set.
- `animation-range !== 'normal'` on `.scroll-cascade--columns > *` (the WS4 D14 fix
  CONSUMED — RED until WS4 lands the `%`-off-`--col` form; re-verify AFTER).
- a11y: the heading's accessible name is the FULL text (`aria-label`), glyphs
  `aria-hidden`; no char-by-char announcement.

**Page-API (BG.W-STORY-PAGE-API):**
- every routed page composes exactly ONE named member (StoryPage or CategoryPage),
  ZERO member-specific LAYOUT logic, `:depth` the manifest-bound computed
  (`proof:story-page-api`, over the FULL migrated catalog — the `@vue/compiler-sfc`
  raw-parse oracle, P5).
- the two anti-fork self-test bites RED (a `depth="D2"` string literal; a re-forked
  section-stack member under a new name).
- each route presents exactly ONE element root; the bare-swap does not wedge
  (5-nav burst: `main.children.length===2`, `h1===last-dest`) across the FULL
  catalog (no fragment route root re-appears, P5).
- depth→heroScale renders the √φ ladder (D0>D1>D2>D3); `proof:page-hierarchy`
  PH1-PH4 + `proof:hierarchy` H2-ORDER/GRAVITY/CENSUS green.
- one-GL-per-route preserved (the D1 bento uses frozen stills).

**Suffuse (BG.W-STORYBOOK-SUFFUSE):**
- a per-page gestalt capture across categories: NO gray/flat page; the rail fill +
  section eyebrow/rail read the SAME category `--field-h`; the SectionPreviewCard
  preview reads warm; body ink untinted; `proof:suffuse` d1-d3 green; both modes.

**The capstone:** the `proof:ba-gestalt` BG roster verdict for the storybook
surfaces (scroll-rail · section-entrance · page-API · suffuse), re-earned on fresh
captures, Chrome AND Safari.

---

## 6. FOLDED / DEFERRED ITEMS

- **The page-API member count** — DECIDED (P4): ship **TWO** (StoryPage section-
  stack over D0/D2/D3 + CategoryPage bento D1), the four user NAMES surviving as the
  conceptual depth ladder. **FLAGGED FOR USER CONFIRMATION** (deviates from the
  literal four-component ask). The shell is invariant + the zero-logic gate
  guarantees a future re-expansion (or further collapse) is mechanical.
- **The dynamic OKLCH spectrum fill** (`useBorderSpectrum`/`spectrum-walk.ts`) for
  the bar — DEFERRED. The demo bar uses a static CSS gradient (KISS, demo chrome).
- **The `#source` code slot** (folding `Code.vue`; `CodeBlock.vue` retires) — a
  per-page option AT ANY DEPTH, a SEPARATE DRY win decoupled from the member count
  (P4; CodeBlock's sole importer is the D3 `display/card.vue`).
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

1. **(SETTLED — was load-bearing) Safari custom-property-via-scroll** — P1 proved
   WebKit reflects `--scroll-fill` live on real Safari 26. The gate is the simple
   `!supportsScrollTimeline()`. RESIDUAL: the `railHealth()` FIXTURE stand-up on
   both engines is build=false (owed at execution).
2. **(PROVEN) WS1↔WS11 bar coexistence** — P2 confirmed the two arms green
   concurrently + red independently. RESIDUAL: re-run on the real integrated tree
   with the OR-escape deleted.
3. **(PROVEN-Chromium) Below-fold reveal fires on CROSSING** — P3 confirmed on
   Chromium with the corrected `[data-revealed]`-on-the-heading selector. RESIDUAL:
   real WebKit paint, the deep-link/above-viewport case, the cross-context case, the
   ~105-heading per-category sweep — none run.
4. **(DECIDED) D2-vs-D3 — ship-2** — P4 settled COLLAPSE-TO-2 from the catalog.
   RESIDUAL: the verdict is gated on standing up the integration branch + rendering
   the collapsed shell + the migration (the DECISION is settled; the ARM is not
   converged until it runs).
5. **The 121-file migration churn** — the mechanical rewrite + the `SectionLanding`
   fold (ONE real importer, P5) + the `StoryHero` 6-way absorption must not re-
   introduce a fragment route root. The facade-resolver carries correctness holes.
   **Falsifier:** the `@vue/compiler-sfc` raw-parse oracle (P5) over the FULL catalog
   + a 5-route bare-swap burst.
6. **Sequencing fragility.** WS11 HARD-depends on WS1+WS4 landing; the integration
   branch does NOT exist at HEAD. D14 is STILL broken. Each wave opens with the
   precondition HEAD-check; WS11 does not re-fix a foreign wave.
7. **Stale-edit waste** — the SectionPreviewCard "gray seam" is closed at HEAD; a
   blind re-point is a wasted edit. The suffuse arm VERIFIES the painted hue first
   and edits the WRITE source only on a captured regression.

---

## 8. UNCONVERGED FRONTIER (the next-pass brief)

The SPEC is build-ready per wave; the design contradictions are resolved and every
prototype's DESIGN question is settled (P1 capability proven, P2 coexistence proven,
P3 mechanism proven on Chromium, P4 ship-2 decided, P5 oracle settled). The
WORKSTREAM gate is unmet because these are spec-stated but un-EXECUTED:

0. **(THE BLOCKER) The integration branch does not exist.** `git diff master..HEAD
   -- src/ demo/` is EMPTY (verified). WS1 (route-enter, `.scroll-build` retire,
   LIBRARY `.scroll-progress` fix, field) + WS4 (D14 `%`-off-`--col`, `_chassis/`
   delete, ShowcaseFrame-is-cel) must LAND CODE first. WS11 cannot open a wave until
   the §0 HEAD-checks pass on a real branch.
1. **The `railHealth()` fixture stand-up** — P1 proved the WebKit capability; the
   minimal real-engine fixture proving the teeth distinguish live-from-dead on
   chromium AND webkit is build=false, owed.
2. **Integrated-tree real-paint** — the bar `railHealth()` GREEN + the wired-
   `StorySection` crossing capture (incl. the deep-link/cross-context/per-category-
   sweep cases) on the REAL post-WS1+WS4 branch.
3. **Real Safari/WebKit execution** — the webkit `testMatch` enrollment is specced;
   the actual Safari captures (bar fill + entrances + the forced JS fallback) have
   NOT run. "Chrome AND Safari" is unexecuted.
4. **The 121-file migration exercise** (P5) — render the collapsed StoryPage/
   CategoryPage shell, run the migration over the FULL catalog, prove single-element
   root (the raw-parse oracle) + no fragment route root re-appears + resolve the
   facade-resolver correctness holes.
5. **USER CONFIRMATION** of the 4-name → 2-component collapse (§6) — it deviates
   from the literal four-component ask.

Next pass: stand up the integration branch (WS1+WS4 green), RUN the `railHealth()`
fixture on chromium AND webkit FIRST, render the collapsed page-API shell + run the
migration, then the bar + entrance + page-API + suffuse acceptance captures on Chrome
AND real Safari. Obtain user confirmation on ship-2.
