# BG-WS11-storybook-facility — SPEC-pass1-CONVERGED

Storybook facility: a FUNCTIONING thick glassy scroll-progress bar · section
typewriter + fade-up entrances on liquid-weight spring clocks · ONE standardized
page-API component family every page composes · consistent per-category suffusal.
Both modes, Chrome AND Safari, real-paint is the gate.

> **Convergence status (honest).** Every critique mustFix is folded; the two
> internal contradictions (off-main-thread gate signal; glint liquid-weight) are
> resolved; the 4-vs-2 member architecture is DECIDED. The spec is build-ready
> per wave. The WORKSTREAM gate (real-paint on the *integrated* WS1+WS4+WS8 tree,
> Chrome AND real Safari, all four arms) is UNMET at pass 1 — that is the
> unconverged frontier (§8). This is spec-convergence, not paint-convergence.

---

## 0. SEQUENCING — WS11 ELEVATES, it does not re-fight (binding)

WS11 is the storybook *apotheosis* layered on top of three landed workstreams.
It ABSORBS their outcomes and HARD-depends on them; it must NOT re-propose,
re-fix, or re-mint what they own.

| Owns | Workstream | The fact WS11 consumes |
|---|---|---|
| Route transition + scroll-progress CORRECTNESS + hero-fit + the field | **WS1** | bare keyed `<component :is :key=route.path class=route-enter>` swap (NO `<Transition>`); `.scroll-build` RETIRED wholesale; `.scroll-cascade`/`.scroll-pin`/`.smooth-scroll` KEPT; `.demo-scroll-progress` corrected; the **named `--demo-main-progress` timeline declared on `.demo-main-scroller`**; `proof:ba-animate` hardened to read COMPUTED `animation-timeline`; ONE shell `<Aurora>` with per-route `warmFieldHue` + `--field-h` |
| Chassis consolidate + scroll-shrink + D14 | **WS4** | `DemoFrame.vue`/`demo-frame.css`/`StorySectionHeader.vue` DELETED (zero-importer); `ShowcaseFrame` is THE demo-cel chassis; **D14 cascade-columns fixed to `%`-off-`--col`** (`scroll-choreography.css:236`, still the `* 0` bug at HEAD); `@keyframes title-collapse` shared scale leg; `Code.vue` the surviving code primitive |
| Glass-deep apotheosis | **WS8** | `--glass-blur-deep-*` / `.glass-deep` / `--glass-depth` deep tier the bar's "glassy" CONSUMES |

**WS11 cannot land before WS1 (#1 route, #2 field, #3 scroll-progress-rail, #6
hero-fit), WS4 (chassis-consolidate, scroll-shrink-unify/D14), and WS8
(glass-deep) are green on the integration branch.** Each wave below names its
precondition; **the FIRST acceptance step of every WS11 wave is a HEAD-check that
its preconditions actually landed** (critique #3 mustFix): `.scroll-build` gone,
`scroll-choreography.css:236` reads the `%`-off-`--col` form (NOT `* 0`),
`ShowcaseFrame` is the cel, `--glass-blur-deep-*` tokens resolve, the
`--demo-main-progress` named timeline is declared on `.demo-main-scroller`. A wave
that opens against an un-landed precondition STOPS — it does not re-fix the
precondition (foreign-wave fence).

---

## 1. GESTALT GOAL

The storybook reads like a single, coherent iOS-27 document system, not a pile of
ad-hoc pages:

- **A FUNCTIONING glass progress rail** at the top of every route — a thick
  (~8-12px) frosted RECESSED CHANNEL with a luminous warm→route-hue fill that
  tracks scroll LIVE (the iOS-27 Control-Center-slider gestalt), with a
  spring-LAGGING leading glint. The D5 "aberrative full-width slab" is dead by
  WS1; WS11 makes the corrected bar *beautiful and integrated* — depth +
  separation read it as floating glass above content, NOT a 2px hairline.
- **Sections that TYPEWRITER and FADE UP on scroll-entry**, with liquid weight —
  section headings reveal per-glyph (a calm typewriter-wipe) as they cross into
  view; bodies lift+fade on their own `view()` timeline. On the spring clocks
  (`--spring-smooth`/`--spring-snappy` + the matching `-duration`), never linear.
  PRM-safe by construction (text never vanishes); CLS≈0 (no per-glyph reflow).
- **ONE standardized page-API family** — `StoryPage`/`CategoryPage`/`ComponentPage`/`SubPage`
  over a shared `StoryPageShell` core, mapped onto the EXISTING `StoryDepth`
  D0-D3 ladder (depth IS size, the √φ display ladder). Supersedes the ad-hoc
  `StoryPage`-variant-branching + the parallel `SectionLanding` one-off. Clean
  break, no legacy alias.
- **Consistent suffusal** — ONE `--field-h` route hue threaded through every
  member: the field bg, the progress-bar fill, the section eyebrow/rail/IconChip
  POP all read the SAME category color event (the one-color-event rule). No page
  reads gray/flat; warm-cream identity, body ink untinted; both modes.

The four arms are ONE system: the page-API family is the chassis the bar and the
entrances and the suffusal all hang off.

---

## 2. MECHANISM (concrete, idiomatic — every mustFix folded)

### 2A. The thick glass progress rail (BG.W-SCROLL-PROGRESS-GLASSY)

**Why a thickened scaleX bar is a LIE and is forbidden.** Three falsifiers
(prototype #1, confirmed): (a) `scaleX(0→1)` on a thick pill squashes its
end-caps to ellipses and at `scaleX(0)` there is no visible TRACK; (b)
`backdrop-filter` on a 2-10px strip blurs a negligible backdrop area → "glassy"
reads invisible — a thin bar's glass is RIM + TINT + SPECULAR, not blur; (c)
`proof:no-layout-animation` forbids animating `width`/`height`.

**The honest architecture — TRACK + clip-revealed FILL, single-writer inherited
`--scroll-fill`.** The demo bar STOPS composing the library `.scroll-progress`
class (a CLEAN-BREAK template edit on the REAL Vue shell — `AppShell.vue:393`
becomes `<div class="demo-scroll-progress" …>`, the `scroll-progress` class
REMOVED; this is verified against the live shell, not asserted on an HTML stub —
critique #1 mustFix #8) and becomes a self-contained thick glass structure in
`demo/layout/dock-nav.css`.

**FOLD — the four bar mustFixes baked into the recipe:**

1. **The glass consume is the WHOLE composite, never a re-wrap (critique #1 #1 —
   confirmed: `--glass-blur-quiet` IS `blur(8px·level) saturate(...) brightness(...)`
   at `tokens/glass.css:140`).** `backdrop-filter: blur(var(--glass-blur-quiet))`
   double-wraps an already-composed filter → invalid → ZERO blur (the cardinal
   consume-the-primitive trap). Use `backdrop-filter: var(--glass-blur-quiet)`
   (the whole composite) — or `blur(var(--glass-blur-quiet-radius)) saturate(1.1)`
   off the PRIMITIVE radius. The recipe uses the composite.
2. **`@property --scroll-fill { inherits: true }` + ONE animation on the TRACK
   (critique #1 #2).** ONE writer (the TRACK), the fill + glint + the gate-probe
   all read `--scroll-fill` by INHERITANCE — DRY, and the "exactly 1 animation"
   KISS claim is now literally true (one animation, not one-per-node).
3. **The start stop is `var(--card)`, not `oklch(from var(--card) l c h)`
   (critique #1 #6).** The relative-color identity reconstructs `--card` verbatim
   for zero gain + adds the css-relative-color chronic + a Safari floor. Drop it.
4. **The timeline is the NAMED `--demo-main-progress` (critique #1 #7), not the
   `scroll(nearest block)` guess** — robust if an intermediate scroll container
   appears. `scroll(nearest block)` is the fallback default only.

```
@property --scroll-fill { syntax: "<percentage>"; inherits: true; initial-value: 0%; }

.demo-scroll-progress {                       /* the TRACK — always visible, the ONE writer */
    position: sticky; inset-block-start: 0;
    z-index: var(--z-scroll-rail, 5);          /* above content, BELOW dock/overlays (§risk) */
    pointer-events: none;
    block-size: var(--scroll-rail-thickness, 0.625rem);   /* √φ-proportioned, ~10px */
    border-radius: var(--radius-pill);
    overflow: clip;                            /* the caps belong to the TRACK clip */
    /* recessed frosted GLASS channel — the WHOLE composite, no re-wrap */
    background: var(--glass-bg-quiet);
    backdrop-filter: var(--glass-blur-quiet);  /* FIX: composite, not blur(var(composite)) */
    box-shadow:                                /* inner-shadow GROOVE + separation lift */
        inset 0 1px 2px color-mix(in srgb, var(--foreground) 14%, transparent),
        0 1px 3px color-mix(in srgb, var(--shadow-color) 24%, transparent);
}
.demo-scroll-progress__fill {                  /* the FILL — clip-revealed, undistorted caps */
    position: absolute; inset: 0;
    background: linear-gradient(90deg,
        var(--card) 0%,                                    /* warm-cream start (no relative-color) */
        oklch(0.78 0.13 var(--field-h, 60)) 100%);         /* → route hue (suffusion) */
    /* clip-path is compositor-safe (proof:no-layout-animation ALLOWS it); the
       gradient paints at full width so hue maps to POSITION, no scaleX stretch. */
    clip-path: inset(0 calc(100% - var(--scroll-fill)) 0 0 round var(--radius-pill));
    border-block-start: 1px solid color-mix(in srgb, white 28%, transparent);  /* specular */
}
@supports (animation-timeline: scroll()) {
    @keyframes gl-scroll-fill { from { --scroll-fill: 0%; } to { --scroll-fill: 100%; } }
    .demo-scroll-progress {                    /* the ONE animation, on the TRACK */
        animation: gl-scroll-fill auto linear;
        animation-timeline: var(--scroll-progress-timeline, --demo-main-progress);
    }
}
```

**The strip-reserve must NOT occlude content (critique #1 #8 — the negative-margin
trap).** A sticky strip + `margin-block-end: calc(-1 * thickness)` pulls content
up UNDER the bar → the top ~10px of the first hero content is occluded at
scroll-top. RESOLUTION (single-writer, no library churn): the bar takes NO
negative margin; instead `StoryPageShell`'s hero reserves
`padding-block-start: var(--scroll-rail-thickness)` so the first content clears
the bar, and the scroller carries `scroll-padding-block-start:
var(--scroll-rail-thickness)`. **Gate:** at scroll-top the hero's first painted
content (eyebrow/title) `getBoundingClientRect().top ≥` the bar's `bottom` (no
overlap).

**The drive signal is `--scroll-fill` itself — and it is MAIN-THREAD (critique #6
#4, the §2A contradiction RESOLVED).** A registered custom property animated on a
`scroll()` timeline is NOT compositor-accelerated (a custom property can feed any
`var()`, so the engine recomputes it on the MAIN thread each frame). Therefore the
clip-path consuming `var(--scroll-fill)` recomputes main-thread and
`getComputedStyle(fill).getPropertyValue('--scroll-fill')` DOES reflect the live
value — on Chromium AND WebKit AND the JS fallback. (This is the OPPOSITE of the
OLD `scaleX` recipe, which CAN go off-main-thread on WebKit and is why
`getComputedStyle` was unreliable for D5.) So `--scroll-fill` is the
ENGINE-AGNOSTIC primary gate signal; `getAnimations()` `currentTime` is demoted
to the Chromium-only refinement (§5).

**THE PRM / Safari<26 RESOLUTION (the D5 root-class fix — prototype #4 validated).**
The fill is an INFORMATIONAL position cue (the shipped FadingScroll
"@property-under-@supports-only, discrete-survives" precedent at
`base-misc.css:96-103`), NOT vestibular motion — so it tracks under PRM and on
Safari<26. Therefore the fill drive sits under `@supports` ONLY, NEVER under
`@media (prefers-reduced-motion: no-preference)` (that no-preference-only gating
is the exact D5 dead-bar root cause at `scroll-driven.css:36`).

**The JS fallback — re-specified HONESTLY (critique #1 #4: `useScrollProgress` is
the WRONG tool — it returns `Ref<number>`, maps element-in-viewport, writes
nothing, does NOT compose `createScrollReader`).** The fallback composes
**`useScrollTrigger`** (the shipped `createScrollReader`-composing reader whose
`progress: Ref<number>` IS scroller-extent page-progress, rAF-coalesced,
native-timeline-gated to attach NOTHING when native is present) + an EXPLICIT
single-writer watcher:

```ts
// AppShell.vue — dual-path single-writer, gated OFF under native support
const { progress } = useScrollTrigger({ source: () => mainScrollerEl.value /* the .demo-main-scroller */ });
if (!supportsScrollTimeline()) {            // the hardened negative-probe detector (FALSE in jsdom/SSR)
    watch(progress, (p) => barEl.value?.style.setProperty("--scroll-fill", `${p * 100}%`));
}                                            // native present → useScrollTrigger attaches nothing; CSS owns it
// onUnmounted cleanup is owned by useScrollTrigger's scope; the watcher stops with the component.
```

No double-write: when `supportsScrollTimeline()` is true the CSS owns `--scroll-fill`
and `useScrollTrigger` attaches no listeners; when false the watcher is the SOLE
writer. The fallback ALSO runs under PRM (the bar must track for reduce users).

**The liquid-weight TENSION, resolved with a REAL spring (critique #1 #3 — "build
a real liquid-weight glint or stop claiming one").** A FILL that lags/overshoots
is a LIE about scroll position. So the FILL is 1:1 truthful; the liquid weight is
carried by a **JS keyframes.js `SpringProgress` GLINT FOLLOWER** — a small spring
that lags the live `--scroll-fill` fraction and writes `--glint-x`, so the
leading-edge glow trails the fill with genuine inertia + overshoot (NOT a CSS
animation locked to the same `scroll()` timeline, which would have zero
lag/overshoot). PRM-dropped (`display: none` under reduce). This satisfies the
universal "liquid-weight on ALL motion" law on the bar's actual motion (the
leading edge) WITHOUT lying about position:

```
.demo-scroll-progress__glint {                 /* leading-edge spring-LAGGING cap glow */
    /* a small radial glow positioned at --glint-x (the SpringProgress follower's
       output, lagging --scroll-fill). THE liquid-weight lives here; the FILL stays
       1:1 truthful. */
}
@media (prefers-reduced-motion: reduce) { .demo-scroll-progress__glint { display: none; } }
```

The whole-bar liquid feel also rides (b) WS1's `.smooth-scroll` momentum and
(c) the §2B section entrances — recorded so the convergence-bar "liquid weight"
is met by a real mechanism, not asserted.

**AA + dark arm.** The fill-as-graphic clears ≥3:1 over the variable frosted
backdrop in BOTH modes (an acceptance measure, §5 — previously unmeasured,
critique #1 #8). The dark arm: the track edge + transmission carry the silhouette
(W-DARK-MATERIAL); plain per-mode token pairs only — NO `light-dark()`
inset-shadow fragment (the trap computes the whole `box-shadow` to `none`).

### 2B. Section typewriter + fade-up entrances (BG.W-SECTION-TYPEWRITER-FADEUP)

**The category-mismatch DEFT decision.** `useTypewriter` (413-line stochastic
async sleep-loop with typo simulation) autostarts `onMounted`, NOT
IntersectionObserver-gated → N below-fold sections type INVISIBLY at load and
finish before the user arrives; it grows heading width per char (per-char reflow →
CLS). The CSS `.char-stagger` recipe is ALSO mount-triggered (document timeline) →
same below-fold invisibility. A native `view()` timeline CANNOT express a
per-glyph stagger. Resolution:

- **Section HEADINGS → `<SplitChars :stagger="false">` + the shipped
  `vScrollRevealOnce` IO gate** (the calm typewriter-WIPE). Two SRC mustFixes:

  - **Add a `stagger?: boolean` (default `true`) prop to `SplitChars.vue`
    (in-fence src/ edit — critique #2 #3).** Today `SplitChars.vue:90` stamps
    `cn("char-stagger", props.class)` UNCONDITIONALLY — the mount-triggered
    `.char-stagger` host fires the entrance at load. `:stagger="false"` omits the
    `.char-stagger` host (mints BARE `.char` spans + `--char-index`/`--char-total`,
    `aria-label` + glyph `aria-hidden` PRESERVED), so the section heading carries
    no mount-triggered host and the per-glyph reveal is owned entirely by the
    `[data-revealed]`-gated CSS. This is the first-principles fix — NOT a
    `.char-stagger`-neutralizing specificity override (the 0,2,1-beats-0,2,0
    workaround the prototype flagged is DELETED).
  - **The reveal gate is the shipped `vScrollRevealOnce` directive
    (`useStaggerReveal.ts:123`), NOT a new `useSectionReveal.ts` (critique #2 #2).**
    Identical IO + unobserve-once + clean-unmount + no-IO fallback discipline; DRY,
    no 4th `addEventListener("scroll")`. If a section-scoped variant is genuinely
    needed, EXTEND the shipped directive — never fork a parallel composable.

  ```
  /* HARDEN the base so text NEVER strands invisible (critique #2 #5): the hidden
     state lives in the keyframe `from` under the no-preference gate, the resting
     `.char` is VISIBLE, and a no-IO path lands [data-revealed] immediately. */
  @media (prefers-reduced-motion: no-preference) {
      [data-revealed] .story-section__heading .char {
          animation: gl-char-rise var(--spring-smooth-duration) var(--spring-smooth) both;
          animation-delay: calc(var(--char-index) * var(--char-stagger-step));
      }
      /* pre-reveal hidden ONLY while the no-preference reveal is armed-and-pending */
      .story-section__heading:not([data-revealed]) .char { opacity: 0; transform: translateY(0.4em); }
  }
  @keyframes gl-char-rise { from { opacity:0; transform:translateY(0.4em);} to {opacity:1; transform:none;} }
  /* PRM + no-IO + any path where the reveal never fires → terminal-visible */
  @media (prefers-reduced-motion: reduce) {
      .story-section__heading .char { opacity: 1; transform: none; }
  }
  ```

  `--char-stagger-step` is ONE token (critique #2 #6 — reconcile the 24ms-vs-30ms
  drift): it DEFAULTS to the shipped `.char-stagger` step value so the heading
  wipe and the kinetic host speak ONE cadence. No second magic number.

- **Section BODIES → the SHIPPED `.scroll-cascade` recipe, REUSED VERBATIM
  (critique #2 #1).** `section-entrance.css` must NOT re-declare
  `@keyframes gl-cascade-build` nor `.scroll-cascade > *` — a same-name keyframe
  re-declaration with a bare `linear` STRIPS the `--ease-scroll-spring`
  liquid-weight law from every storybook body (spec §2B: "NO new keyframe set").
  The section root binds the existing `.scroll-cascade` (the WS4-D14-FIXED,
  `--ease-scroll-spring` cascade). For the Safari<26 / no-`view()` fallback, REUSE
  the shipped `[data-scroll-reveal-once]` / `gl-reveal-once` mechanism (NOT a new
  keyframe).

- **Metric/number values → `useCountup`** (imported from `@mkbabb/glass-ui/motion`,
  keyframes-bearing — NEVER the root barrel; the SCC-trap fence). Wire on metric
  surfaces only.

**No animation double-bind (critique #2 #4 — the heading-inside-`.scroll-cascade`
double-motion).** The `.story-section__heading` is NET-NEW (does not exist at
HEAD). The heading is a DESCENDANT of the section; if it sits inside
`.scroll-cascade > *` it would get BOTH the cascade fade-up AND the per-glyph rise
(muddy double-motion). RESOLUTION: the heading is EXCLUDED from the
`.scroll-cascade > *` child set — the cascade lifts the BODY children; the heading
carries ONLY the per-glyph rise on its `.char` descendants. ONE node binds at most
ONE `animation` (the disjoint-wrapper/children precedent from `story-hero.css`).
**This is verified on the WIRED `StorySection`, not a synthetic host** — a fresh
capture proves heading-rise and body-cascade do not collide.

**`useTypewriter` is reserved for the front-door HERO ONLY** (the D0 `StoryPage`
hero, a single above-the-fold heading that can afford the stochastic engine). It
is NEVER applied to a section heading. `proof:demo-design` D4 anti-fork bite stands.

### 2C. The standardized page-API family (BG.W-STORY-PAGE-API)

**DECIDED: 4 thin named members over ONE shared core (critique #3 #2 / #6 #6 /
open-risk #1).** The user asked for FOUR by name (`StoryPage` / `CategoryPage` /
`ComponentPage` / `SubPage`) and the directive is explicit. We SHIP four — honoring
the user — but with a structural DRY guarantee that makes them a configuration set,
NOT a fork: **`proof:story-page-api` asserts ZERO member-specific logic** (each
member is pure delegation to `<StoryPageShell :depth :hero-scale :body-layout>`,
no branching, no member-local layout). The shared CORE is invariant either way, so
IF a future visual prototype proves D2 (`ComponentPage`) and D3 (`SubPage`) are
byte-identical-modulo-`heroScale`, the collapse to `StoryPage(:depth)` +
`CategoryPage` is mechanical (the zero-logic gate guarantees it). The 2-vs-4
*visual* distinctness is the named residual (§8) — structurally decided here, not
yet visually proven.

The `StoryDepth` D0/D1/D2/D3 ladder + `assignDepths()` + the √φ `HeroScale` ladder
ALREADY exist (`manifest.ts:41-44,434`); the family FORMALIZES them — it does NOT
re-invent the depth model.

```
StoryPageShell.vue   ← the shared CORE. Owns the SINGLE <article class="route-enter">
                       root, the colocated <StoryHeroBackdrop> (carved from StoryHero's
                       6-way substrate switch), the gravity header cluster (LIFTS WS1's
                       de-duped StoryHeader: eyebrow → Fira-Code subpath chip → audacious
                       √φ title → blurb), the .scroll-cascade body wiring, the section
                       system (StorySection + the 2B reveal), the --field-h suffuse thread,
                       the §2A hero top-pad-clear, and the progress-rail integration.
                       Props: depth, heroScale, background, body-layout, + the body slot.
  ├─ StoryPage.vue      (D0) heroScale "mega"/"audacious". Full-bleed live backdrop. The lone
  │                          front door (foundations/intro). May host the useTypewriter hero.
  ├─ CategoryPage.vue   (D1) The SectionPreviewCard BENTO grid (FOLDS SectionLanding.vue,
  │                          DELETED). heroScale "mega". One-GL budget: FROZEN preview stills.
  ├─ ComponentPage.vue  (D2) Hero card + sections + demo cels (ShowcaseFrame) + the optional
  │                          #source code slot (folds Code.vue). heroScale "5".
  └─ SubPage.vue        (D3) Smaller hero (heroScale "4"). Nested sub-variant: sections + cels,
                             NO bento, NO #source. The "depth IS size" smallest rung.
```

**The distinguishing axis is concrete:** depth → `heroScale` (the √φ size rung) +
the BODY layout (D0 = pure hero / D1 = bento grid / D2 = sections+cels+source /
D3 = nested sections, no bento/source). The shared CORE handles the 90%.

**The single-route-root invariant (the route-wedge falsifier — prototype #3
validated).** The bare-swap route transition (WS1) requires each routed root
present EXACTLY ONE element. The shared `StoryPageShell` renders the single
`<article class="route-enter">`; every member delegates to it (each member's
template is ONE `<StoryPageShell>` element → Vue resolves the single-child root
transparently to the shell's `<article>`). No fragment, no `TooltipProvider`-as-
root (the prior `StoryPage.vue:64` bug stays fixed). `proof:story-page-api`
asserts one named member per route AND single-element root across ALL routes
(critique #3 #4) — NOT a 4-stub set; it runs over the real migrated catalog.

**Depth→member selection + the migration (critique #3 #4 — exercise the real
risk).** Depth is catalog-position-derived (`assignDepths()`); the manifest/router
owns the member choice. The 124-125 `<StoryPage>` compositions migrate in ONE
clean break (manifest-driven, mechanical, no alias). The migration also folds the
**`SectionLanding.vue` multi-importer** (`router.ts` / `AppShell.vue` /
`SectionPreviewCard.vue` / `manifest.ts`) into `CategoryPage` and absorbs
`StoryHero`'s 6-way backdrop switch into `StoryHeroBackdrop`. The gate's
"single-element root across ALL routes" assert is the anti-regression for the
fragment-root class (the migration's real risk), exercised on the FULL catalog,
not a stub.

**Colocation + the 500-line law.** `StoryHero.vue` (432L) collapses into
`StoryPageShell` + the colocated `StoryHeroBackdrop.vue`. `story-hero.css` (717L,
over the bound) splits into colocated partials AND DRAINS its bespoke entrance
keyframes (`story-hero-title-rise` / `cluster-rise` / `subordinate-fade`,
confirmed at `story-hero.css:546/576/522`) by wiring the hero entrance onto the
shared 2B primitives (SplitChars for the title, the gravity cluster on the spring
clocks). DRY win + the monolith drops below 500.

### 2D. Storybook suffusal consistency (BG.W-STORYBOOK-SUFFUSE)

The smallest, most-integrated arm — a consistency LAYER, not new machinery. WS1
owns the FIELD (one shell aurora + `warmFieldHue` + the `--field-h` register).
WS11 READS the field hue and threads it CONSISTENTLY through the page-API chrome:

- the progress-bar fill reads `--field-h` (§2A);
- each section's eyebrow/rail/IconChip POP reads the per-category
  `--section-label-accent` (the `.section-label--tinted` register), threaded by
  `StoryPageShell` so a category reads ONE coherent color event across all its
  pages (no per-page bespoke);
- `StorySection` gains a default-on section accent so headings aren't un-suffused;
- **fix the WS4-flagged warm-not-gray seam: `SectionPreviewCard --card-field-h`
  reads a DESATURATED-GRAY value — re-point it onto `--field-h`** (critique #3 #5)
  so a category landing's preview cards read warm, not gray.

**Fences (preserved):** ONE color event per surface (`proof:suffuse` d1
body-ink-untinted, d2 chip≤glyph, d3 ≤1 tinted-event-family/surface); **the
bar-as-page-chrome is EXEMPT from the one-color-event content-surface count
(stated, not assumed)**; warm-cream identity; `--motion-accent` purple demo-local
(presets-in-consumers, never a library token); both modes, dark-recalibrated
washes (BA.W-STAGE). The binding bar is a FRESH per-page gestalt capture across
categories (NO gray/flat pages), not a source-green claim.

---

## 3. FILES TOUCHED

### BG.W-SCROLL-PROGRESS-GLASSY (⇐ WS1 #3 + named timeline + WS8 glass-deep)
- `demo/layout/dock-nav.css` — rebuild `.demo-scroll-progress` as the thick glass
  TRACK + `__fill` (clip-revealed, `--scroll-fill` INHERITED, ONE animation on the
  TRACK, on `--demo-main-progress`) + `__glint` (JS-spring-lagging, PRM-dropped).
  Consume `var(--glass-blur-quiet)` (the WHOLE composite) + `--field-h`.
  Register `@property --scroll-fill { inherits: true }` (demo-private).
- `demo/layout/AppShell.vue` — REMOVE the library `scroll-progress` class from the
  bar div (clean break, on the real shell). Wire `useScrollTrigger` + the
  single-writer `--scroll-fill` watcher gated on `!supportsScrollTimeline()`. Wire
  the `SpringProgress` glint follower (`--glint-x`), PRM-dropped.
- `scripts/proof-ba-animate.mjs` — EXTEND with thickness + glass-composite-consume
  asserts + the bar paint-π (the engine-agnostic `--scroll-fill` growth + the
  no-distort caps + the visible-track-at-top + the ≥3:1 AA). The COMPUTED
  `animation-timeline` teeth are WS1's; WS11 extends, does not re-author. **DELETE
  the `|| (headless not reflecting)` OR-escape** (ba-animate.spec.ts) — replaced by
  the `--scroll-fill` computed-value primary (§5).

### BG.W-SECTION-TYPEWRITER-FADEUP (⇐ WS1 `.scroll-cascade` kept + WS4 D14 fix)
- `src/components/custom/split-chars/SplitChars.vue` — add `stagger?: boolean`
  (default `true`); `:stagger="false"` omits the `.char-stagger` host (bare `.char`
  spans, a11y preserved). The ONE in-fence src/ edit.
- `demo/stories/StorySection.vue` — default-on `revealHeading`: wrap the `<h2>`
  in `<SplitChars :stagger="false">`, mark it `.story-section__heading`, EXCLUDE it
  from `.scroll-cascade > *`, bind `vScrollRevealOnce` on the section root.
- `demo/stories/section-entrance.css` (NEW, colocated) — the `[data-revealed] .char`
  reveal recipe ONLY (spring-clocked, PRM terminal-visible, no-IO fallback). It
  REUSES `.scroll-cascade` + `gl-reveal-once` verbatim — it re-declares NEITHER
  `gl-cascade-build` NOR `.scroll-cascade > *`.
- Metric surfaces — wire `useCountup` (import from `/motion`).

### BG.W-STORY-PAGE-API (⇐ WS1 route-enter/hero-fit/cluster-de-dup + WS4 chassis)
- `demo/stories/StoryPageShell.vue` (NEW) — the shared core, single `<article>`
  root, hero top-pad-clear, the suffuse thread.
- `demo/stories/StoryHeroBackdrop.vue` (NEW, colocated carve from StoryHero).
- `demo/stories/StoryPage.vue` (rebuilt D0, pure delegation), `CategoryPage.vue`
  (NEW D1, folds `SectionLanding.vue` → DELETED + the 4 importers re-pointed),
  `ComponentPage.vue` (NEW D2 + `#source` slot), `SubPage.vue` (NEW D3). All four
  ZERO-logic delegations.
- `demo/stories/StoryHero.vue` — collapsed into the shell + backdrop (DELETED,
  clean break).
- `demo/stories/story-hero.css` — split into colocated partials; bespoke entrance
  keyframes drained onto 2B.
- `demo/router.ts` — depth→member mapping; the 124-125 `<StoryPage>` compositions
  migrated (mechanical clean break).
- `scripts/proof-story-page-api.mjs` (NEW) — every routed page composes exactly
  ONE named member; ZERO member-specific logic; single-element route root across
  ALL routes (the full catalog, not a stub set); no raw chassis triplet survives.

### BG.W-STORYBOOK-SUFFUSE (⇐ WS1 field + WS8 glass)
- `demo/stories/StoryPageShell.vue` — thread `--field-h` + `--section-label-accent`
  through the cluster + sections + bar.
- `demo/stories/StorySection.vue` — default-on section accent.
- `demo/stories/SectionPreviewCard.vue` — `--card-field-h` re-point off the
  desaturated-gray seam onto `--field-h`.
- `scripts/proof-suffuse.mjs` — per-page ledger rows for the page-API members
  (the bar-as-chrome exemption recorded).

### Cross-cutting gate enrollment (critique #6 #1 — make Safari REAL)
- `tests-visual/playwright.config.ts` — ADD the new WS11 spec(s)
  (`scroll-rail.spec.ts` + the entrance/page-API specs that must run cross-engine)
  to the `webkit` project `testMatch` allowlist (currently a 2-spec allowlist:
  `["safari-webgl.spec.ts", "aurora-swraster.spec.ts"]` at line 118). State the
  command that runs the webkit arm: `npx playwright test --config
  tests-visual/playwright.config.ts --project=webkit`. Without this enrollment the
  "Chrome AND Safari" bar NEVER executes — the spec names it explicitly.

---

## 4. WAVE BREAKDOWN (the BG.W-* set)

1. **`BG.W-SCROLL-PROGRESS-GLASSY`** ⇐ WS1#3 + WS8. RE-ARCHITECT the demo bar to
   the thick glass TRACK + clip-revealed FILL (inherited `--scroll-fill`, ONE
   animation, on `--demo-main-progress`) + a JS `SpringProgress` lagging glint.
   `backdrop-filter: var(--glass-blur-quiet)` (composite, not re-wrapped).
   Survives PRM + Safari<26 (informational cue; JS fallback = `useScrollTrigger` +
   single-writer watcher, gated on `!supportsScrollTimeline()`). Truth on the fill,
   liquid weight on the glint. Hero top-pad-clear; ≥3:1 AA; z below dock.
2. **`BG.W-SECTION-TYPEWRITER-FADEUP`** ⇐ WS1 (`.scroll-cascade` kept) + WS4 (D14).
   Section headings per-glyph reveal via `<SplitChars :stagger="false">` + the
   shipped `vScrollRevealOnce` gate (fires on CROSSING); bodies on the REUSED
   `.scroll-cascade`; metrics via `useCountup`. PRM terminal-visible, CLS≈0, no
   double-bind, heading excluded from the cascade child set, one stagger token.
3. **`BG.W-STORY-PAGE-API`** ⇐ WS1 + WS4. ONE `StoryPageShell` core + 4 ZERO-logic
   named members on the depth ladder; `StoryHeroBackdrop` carve; `SectionLanding`
   folded into `CategoryPage` (+ 4 importers re-pointed); `StoryHero`/`story-hero.css`
   collapsed; single route root across the full migrated catalog;
   `proof:story-page-api` minted. THE capstone the others feed into.
4. **`BG.W-STORYBOOK-SUFFUSE`** ⇐ WS1 (field) + WS8 (glass). Thread ONE `--field-h`
   route hue through every member (bar fill + section eyebrow/rail/IconChip);
   default-on section accent; fix the SectionPreviewCard warm-not-gray seam.
   One-color-event fences preserved; both modes.

**Intra-WS sequence:** 1 and 2 are independent (parallel). 3 (the page-API) lands
AFTER 1 + 2 (it composes the bar + the entrances into the shell). 4 lands LAST.
All four HARD-gate on WS1/WS4/WS8 (§0) — each opens with a precondition HEAD-check.

---

## 5. ACCEPTANCE / REAL-PAINT-π BAR

PAINT IS THE GATE. The headless-green/visually-broken trap shipped the hairline
3×; every WS11 acceptance is a FRESH LIVE capture by a NON-authoring agent on a
real GPU, **Chrome AND real Safari/WebKit** (the webkit project enrollment, §3),
`:5199`, both modes. **A minimal real-engine fixture (a hand-built `__fill` div on
a `scroll()` timeline + a dead-`auto` twin) runs the `railHealth()` predicate on
chromium AND webkit FIRST** (critique #6 #5) — the teeth themselves must
distinguish a live bar from a dead one on a real engine before the acceptance
captures are trusted.

**The engine-agnostic gate predicate (critique #6 #2/#3/#4/#7 — the complete
`railHealth()`):**

```ts
// railHealth(page, fillSel) — engine-AGNOSTIC; runs on chromium AND webkit AND the JS fallback.
async function railHealth(page, fillSel) {
    const read = () => page.$eval(fillSel, (el) =>
        getComputedStyle(el).getPropertyValue("--scroll-fill").trim());     // MAIN-THREAD → reliable
    await page.evaluate(() => window.scrollTo(0, 0));
    const atTop = await read();                                             // PRIMARY: "0%" at scroll-top
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.8));
    const at80 = await read();                                             // PRIMARY: grows monotonically (~80%)
    // no-drift CONTROL (the killer discriminator) — held scroll across a time gap → no drift.
    await page.waitForTimeout(400);
    const at80b = await read();
    const grew = parseFloat(at80) > parseFloat(atTop) + 10;
    const noDrift = Math.abs(parseFloat(at80b) - parseFloat(at80)) < 1;
    // engine-CONDITIONAL refinements:
    const native = await page.evaluate(() => CSS.supports("animation-timeline: scroll()"));
    let timelineOk = true, currentTimeOk = true;
    if (native) {
        timelineOk = await page.$eval(fillSel, (el) => {
            const t = getComputedStyle(el).animationTimeline;             // where native: must be scroll()-bound
            return /scroll\(|--demo-main-progress/.test(t) && t !== "auto";
        });
        // currentTime is the Chromium-ONLY refinement (demoted from primary):
        currentTimeOk = await page.$eval(".demo-scroll-progress", (el) => {
            const a = el.getAnimations().find((x) => x.animationName === "gl-scroll-fill");
            return a == null || a.currentTime != null;                    // by NAME, not [0]
        });
    } else {
        // Safari<26 / PRM-via-JS: the JS fallback must be the LIVE writer (grew proves it).
        timelineOk = grew;
    }
    return grew && noDrift && timelineOk && currentTimeOk;
}
```

**Bar (BG.W-SCROLL-PROGRESS-GLASSY):**
- `railHealth()` GREEN on EVERY route, chromium AND webkit, both modes.
- the TRACK is visible at scroll-top (not a zero-width sliver); fill caps
  UNDISTORTED across 0→100%; the bar reads thick (≥8px) + glassy (frost diffuses
  content behind it) + has depth (groove inset + separation lift).
- AA both modes (the fill as graphic ≥3:1 over the frosted backdrop).
- Safari<26 / `supportsScrollTimeline()===false`: the JS fallback writes
  `--scroll-fill` → `railHealth()` GREEN (no dead/static bar).
- PRM: the fill TRACKS (`railHealth()` GREEN); only the glint drops.
- the hero's first content clears the bar at scroll-top (no occlusion).
- CLS≈0 (the bar reserves its strip; never shoves content down).

**Entrances (BG.W-SECTION-TYPEWRITER-FADEUP):**
- a BELOW-THE-FOLD section's heading reveals per-glyph on CROSSING (a fresh
  scroll-through capture: `firstChar.getAnimations().length` 0→1, name
  `gl-char-rise`), NOT at load; the body lifts+fades on the same crossing. Read as
  a liquid-weight typewriter-WIPE (a fresh Chrome AND Safari gestalt judgement),
  not a generic fade.
- PRM: heading text terminal-visible (no transform, never vanishes); body terminal.
- CLS≈0 (no per-glyph width growth/reflow).
- no node double-binds two `animation`s; the heading is NOT in the cascade child
  set (heading-rise and body-cascade do not collide — verified on the wired
  `StorySection`, fresh capture).
- `animation-range !== 'normal'` on `.scroll-cascade--columns > *` (the D14 fix is
  consumed, not regressed — fails RED until WS4 lands the `%`-off-`--col` form).
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
- a per-page gestalt capture across categories: NO gray/flat page; the bar fill +
  section eyebrow/rail read the SAME category `--field-h`; the SectionPreviewCard
  preview reads warm (not the desaturated-gray seam); body ink untinted;
  `proof:suffuse` d1-d3 green; both modes.

**The capstone:** the `proof:ba-gestalt` BG roster verdict for the storybook
surfaces (scroll-rail · section-entrance · page-API · suffuse), re-earned on fresh
captures, Chrome AND Safari.

---

## 6. FOLDED / DEFERRED ITEMS

- **The 2-vs-4 page-API collapse** — DECIDED: ship 4 (honor the user) with the
  zero-member-logic gate. IF a future VISUAL prototype proves D2≡D3
  byte-identical-modulo-heroScale, collapse to `StoryPage`(:depth) + `CategoryPage`
  is mechanical (the shell is invariant; the gate guarantees it). The visual
  distinctness proof is the named residual (§8), NOT punted into the migration.
- **The dynamic OKLCH spectrum fill** (`useBorderSpectrum`/`spectrum-walk.ts`) for
  the bar — DEFERRED. The demo bar uses a static CSS gradient (KISS, demo chrome);
  the dynamic no-trough spectrum is the BorderProgress COMPONENT's, not the bar's.
- **The `#source` code slot** (ComponentPage composing `Code.vue`) — SECONDARY; a
  DRY win (clears the code primitive's ≥2-consumer bar) but not load-bearing.
- **`scroll-vt.vue` bar + the legacy `[data-scroll-reveal]` migration** — WS1 owns
  it (named-timeline + `timeline-scope` reserved there). WS11 does not touch it.
- **`DemoFrame`/`StorySectionHeader` delete + the D14 `* 0` fix** — WS4 owns them.
  WS11 builds on the post-WS4 surface (HEAD-checked at wave open).
- **`useTypewriter` on section headings** — REJECTED (category mismatch: mount-not-IO,
  per-char CLS, below-fold invisibility). Reserved for the front-door hero only.

---

## 7. OPEN RISKS (with the falsifier each acceptance step kills)

1. **2-vs-4 page-API VISUAL distinctness.** Structurally decided (4, zero-logic);
   the D2-vs-D3 rendered-layout distinctness is NOT yet visually prototyped.
   **Falsifier:** if `ComponentPage`/`SubPage` prove byte-identical bar a
   heroScale, the 4-member API is a fork → the zero-logic gate makes the collapse
   trivial.
2. **The clip-path/@property fill on `scroll()`** (prototype #1 — WORKED in real
   Chrome: track full-width at top, caps undistorted, three signals agree). Owed:
   the SAME proof on the REAL post-WS1 shell + real Safari.
3. **Below-fold reveal fires on CROSSING, not mount** (prototype #2 — WORKED, 6
   falsifiers defeated). Owed: the proof on the WIRED `StorySection` (the
   `.story-section__heading` host is net-new) + Safari.
4. **PRM + Safari<26 dual-path survival** (prototype #4 — architecture validated:
   `supportsScrollTimeline()` is the hardened negative-probe detector,
   `@property`-under-`@supports`-only is the shipped FadingScroll precedent). Owed:
   the live JS-fallback write on a real Safari<26 / forced-non-native engine.
5. **The 125-file page-API migration churn.** The manifest-driven mechanical
   rewrite + the `SectionLanding` 4-importer fold + the `StoryHero` 6-way backdrop
   absorption must not re-introduce a fragment route root. The gate's "single root
   across ALL routes" assert (full catalog) is the anti-regression.
6. **Sequencing fragility.** WS11 HARD-depends on WS1+WS4+WS8 landing. D14 is STILL
   broken at HEAD (`scroll-choreography.css:236` reads `* 0`) — WS4's. Each wave
   opens with the precondition HEAD-check (§0); WS11 does not re-fix the bar
   timeline, re-delete DemoFrame, or re-mint glass.
7. **Entrance-register saturation.** The disjoint-node discipline (cascade on the
   section root, char-rise on `.char` descendants, heading EXCLUDED from the
   cascade child set) must hold or a node double-binds `animation`. The wired-host
   capture verifies it.

---

## 8. UNCONVERGED FRONTIER (the next-pass brief)

The SPEC is build-ready (every mustFix folded, both contradictions resolved, the
member architecture decided). The WORKSTREAM gate is unmet because these are
spec-stated but un-EXECUTED:

1. **Integrated-tree real-paint.** The two visual arms (bar paint, entrance paint)
   are prototype-validated on synthetic/HTML-only hosts — NOT re-verified against
   the REAL post-WS1+WS4+WS8 integration branch (which must land first). The bar's
   `railHealth()` GREEN and the wired-`StorySection` crossing capture are owed on
   the integrated tree.
2. **Real Safari/WebKit execution.** The webkit `testMatch` enrollment is specced;
   the actual Safari captures (bar fill + entrances + the JS fallback on a
   non-native engine) have NOT run. "Chrome AND Safari" is unexecuted.
3. **The D2-vs-D3 VISUAL distinctness** — the 4-vs-2 collapse decision's visual
   proof (real body layouts, not stubs).
4. **The 125-file migration exercise** — un-run; the fragment-root regression
   risk is specced-against but un-exercised.
5. **The minimal real-engine `railHealth()` fixture** on chromium AND webkit (the
   teeth's own paint-verification) — specced, un-run.

Next pass: stand up the integration branch (WS1+WS4+WS8 green), run the bar +
entrance + page-API + suffuse acceptance captures on Chrome AND real Safari, and
prototype the D2-vs-D3 body layouts to settle 4-vs-2.
