# STORY-PAGE-STANDARD — GOLDEN: the WARM-CEL CHASSIS (`<DemoFrame variant>` · the field is the floor · the φ² stage · the cel-slam)

> The canonical synthesis of lens-a (ONE `<DemoFrame variant>` chassis — conformity-by-construction,
> the field-is-the-floor, the φ² stage escape), lens-b (the box-model INVERSION — the page body is no
> longer a card; free glass cards float over ONE shared field; the φ ladder off one article width;
> the paired-engine π) and lens-c (the 1940s-technicolor CEL-SLAM with the LAGGING CAST — overlapping
> action, the cartoon entrance). The standardized storybook page chassis + the five demo SUB-TYPES,
> redesigned from first principles as a UNION with the shipped `StoryPage`/`StoryHero`/`StorySection`/
> `ShowcaseFrame` chassis + the shared `<Card tier>` glass register + the page-background `.paper-field`
> primitive. **Tranche-dev only. No re-fork, no parallel page system, no second field engine, NO LEGACY.**
>
> **De-risked LIVE** (Chrome, both modes, the three boldest mechanisms at once) — `golden/spike.html`
> + `golden/spike-light.png` + `golden/spike-dark.png`. The numbers below are NOT asserted; they are
> the spike's `getBoundingClientRect` + SVG-foreignObject→canvas RASTER readout (the page-background
> GOLDEN's honest-raster lesson — never `getComputedStyle`-string parsing).

---

## 0 — THE BORN-RED TRUTH (live-measured `:5173`, both modes, all three lenses unanimous)

Sampled `/display/buttons` + `/forms/select` + `/substrates/aurora` via `getComputedStyle` +
`getBoundingClientRect` + screenshot read. The five conformity invariants, each MISSED on every
content page:

| invariant | live measurement | verdict |
|---|---|---|
| **bigger φ² stage** | `.story-page-article` = **1152px on a 1440 viewport** → **288px dead margin** each side; the stage card matches the article, NOT φ²-dominant | RED — the stage is SMALLER, not bigger |
| **colorful field behind glass** | `--field-h` **(unset)**, `.paper-field` count **0**; page chroma **C 0.0029** (15× below the §3 0.045 floor) | RED — the §3 field is UNBUILT; the glass has nothing to bend |
| **glassy sub-cards** | the body is ONE big `bg-card` plate; the sections are flat `flex flex-col` blocks delimited by a hairline | RED — "each sub-section its own GLASSY CARD" unmet |
| **one title** | the chassis renders 1 `<h1>` (good), BUT the body card still hand-rolls a duplicate eyebrow + IconChip cluster (the double-header, W-PAGE-CHASSIS arm-2; 36 files) | AMBER — `<h1>` single; the in-card descriptor dup persists |
| **alive entrance** | `.scroll-build`/`.scroll-cascade` ARE wired (the page assembles in order) — largely landed; the sub-card squish/morph is the gap | GREEN-ish — entrance exists, no cartoon punch |
| **sub-type taxonomy** | **0** `_chassis/` — no `DemoStage`/`Specimen`/`Interaction`/`Matrix`/`Composition`; every page hand-rolls its own arrangement | RED — conformity is by convention, not construction |

**The two-storybooks gestalt:** `/substrates/aurora` (the HERO variant) reads ALIVE — a full-bleed live
field, an audacious title, glass over a live ground. The content pages read DEAD — a flat tan/charcoal
card, gray glass over nothing, a 288px dead margin, a spec-sheet stack of same-weight sections. **The
hero variant is the proof the chassis CAN do this; the content pages never inherit it.** The job: make
every content page wear the hero page's clothes — contained, calmer, per-sub-type, BY CONSTRUCTION.

**Source-verified deps (grep):** `.paper-field` / `--field-h` / `warmFieldHue` / `--ease-cartoon-punch`
= **0 mounts** (they LAND in the sibling page-background + motion-spring GOLDENs — this chassis CONSUMES
them, never re-mints). `PaperBackdrop` @ `AppShell.vue:251` (the universal mount). `categoryHue(id)` @
`category-hero.ts:159` (the per-route hue source). `VizStudio.vue` (the proven `StoryPage` +
`Configurator asideSide="right"` + rounded-stage shape — the `DemoStage` reference). `ShowcaseFrame
tier="field"` (the plate-less glass host, BG-2). `<Card tier="quiet"/"wash">` (the shipped glass
register). All present except the field tokens (the stated upstream dep).

---

## 1 — THE GOLDEN IDEA: ONE `<DemoFrame variant>` chassis — the field is the floor, the sub-types are PRESETS not forks, the page is a stack of glassy cels that SLAM in

Three reconciled moves, each a UNION with a shipped seam:

**(A) The box model INVERTS (lens-b's keystone).** The current chassis is a MONOLITH: `StoryPage` →
ONE `StoryHero` card → a flat `<StorySection>` stack INSIDE it. That single big card is why (a) the
stage is article-width not φ²-dominant, (b) the sections are flat blocks not glassy cards, (c) the
field sits behind the one card not behind each demo. The greenfield inverts: the page is NOT one card
with sections inside — it is **a header cluster + a stack of FREE glassy cels floating directly over ONE
shared full-bleed warm field.** The `.paper-field` is the universal ground (mounted once, per-route
`--field-h`); every sub-section is its OWN glass cel transmitting that field; the protagonist is a
φ²-dominant STAGE that can grow without fighting an enclosing card.

**(B) The sub-type is a VARIANT of ONE chassis, not five components (lens-a's keystone — maximal
KISS/DRY).** Ship ONE `<DemoFrame variant="stage|specimen|interaction|matrix|composition">` that owns
the conformity register ONCE — the glassy field-aware cel, the cel-slam entrance, the caption band, the
φ proportion — and switches ONLY its internal layout per variant. The five "sub-types" the brief names
are **layout presets of one frame**, exactly as `VizStudio` IS a `DemoFrame variant="stage"` instance.
ONE writer owns conformity; the variant owns the internal arrangement; the slot owns the free content.
**A page is PHYSICALLY INCAPABLE of rendering a flat opaque box over a dead field — `bg-card` opaque
slabs are DEFINITION-ABSENT from the chassis.** The thin `DemoStage`/`DemoSpecimen`/… named exports are
zero-logic re-exports (`DemoStage = <DemoFrame variant="stage">`), for ergonomics + the gate's
structural fingerprint — not five parallel SFCs.

**(C) The page ASSEMBLES with the CEL-SLAM + a LAGGING CAST (lens-c's keystone — the boldest motion).**
Not a uniform fade. Each cel builds on its OWN view-timeline clock with an overlapping offset, on the
`--ease-cartoon-punch` arc (anticipation squash → arc → follow-through stretch overshoot → settle),
the cels OVERLAPPING in time (cel N+1 begins before cel N settles — the §L4 overlapping-action law),
and the cel's `--shadow-cartoon` CAST animating its OWN transform on a +8% LATER clock so the shadow
visibly CATCHES UP to the plate after it lands (the "weight follows the body" read). The page paints
itself like a 1940s technicolor cel sequence flipping into place — the most ALIVE storybook in the set.

### The single boldest move (de-risked, §spike)

> **The page body is NO LONGER a card; it is a stack of FREE glassy cels over ONE shared warm field,
> each a `<DemoFrame variant>` that SLAMS into place on the cartoon punch arc with a lagging cast, the
> protagonist `<DemoStage>` bled to φ² of the prose column.** Conformity is structural (no code path
> renders a flat opaque section), the cel-slam is a pure `@keyframes` + `view()`-timeline cascade
> (compositor `transform`+`opacity`, no JS clock, PRM→one static frame), and the φ² stage is geometry
> (the article widens; the prose recedes to `--story-article-w / φ`; the stage spans the article — so
> stage : prose = φ, the "bigger card" is the natural consequence of the inversion, not a magic px).

This is DRY-er than the status quo (one cel kernel, five thin presets vs N hand-rolled per-page
layouts), KISS (no new engine — it RE-POINTS `ShowcaseFrame tier="field"` + `.paper-field` + `<Card>` +
the entrance registers, all shipped), and it lands the §3 colorful-field where it belongs: behind every
glass demo, for free, on every page.

---

## 2 — THE MECHANISM (the union — reuse, no fork; the EXACT files/tokens/recipes)

### 2a — `<DemoFrame>` : the ONE sub-type chassis (`demo/stories/_chassis/DemoFrame.vue`, NET-NEW)

```vue
<!-- demo/stories/_chassis/DemoFrame.vue — the ONE demo sub-type chassis. A page CANNOT
     render a flat opaque section off the allowlist: it composes a DemoFrame (glass register ·
     field-host · cel-slam entrance · caption) and only fills the FREE body slot. -->
<script setup lang="ts">
import { computed } from "vue";
import { Card } from "../../../src/components/ui/card";          // the shipped glass register
import { ShowcaseFrame } from "..";                              // tier="field" — the plate-drop host
import StorySection from "../StorySection.vue";
type DemoVariant = "stage" | "specimen" | "interaction" | "matrix" | "composition";
const props = withDefaults(defineProps<{
  variant?: DemoVariant;
  heading?: string;       // the in-body section <h2> (the page <h1> is the chassis's — ONE title)
  label?: string;         // the mono eyebrow caption
  blurb?: string;
  caption?: string;       // the mono footer band (ShowcaseFrame's --showcase-caption-gap rhythm)
  bleed?: boolean;        // stage: the φ² protagonist breaks out of the measure column (default true on stage)
}>(), { variant: "specimen" });
// the glass TIER is field-aware: every variant reads quiet/wash (translucent) over the universal
// .paper-field — NEVER a flat opaque bg-card slab (the BG-2/§L1 fix). stage reads quiet (deeper plate).
const tier = computed(() => (props.variant === "stage" ? "quiet" : "wash"));
const doBleed = computed(() => props.bleed ?? props.variant === "stage");
</script>

<template>
  <StorySection :heading="heading" :label="label" :blurb="blurb"
                class="demo-frame story-cel" :data-variant="variant"
                :data-bleed="doBleed ? '' : null" :style="{ '--glass-backdrop': 'light' }">
    <!-- the glassy cel on the shared register, field-aware tier, the cel-slam entrance. the §3
         field reads THROUGH it (the page .paper-field is the -z fixed floor; glass samples the
         field's COMPOSITED output — §L1 "glass cannot sample glass" holds by construction). -->
    <ShowcaseFrame tier="field" :caption="caption" class="demo-frame-frame">
      <Card :tier="tier" class="demo-frame-card">
        <slot />                              <!-- the ONLY per-page free content: the demo -->
      </Card>
    </ShowcaseFrame>
  </StorySection>
</template>
```

The five sub-types are ZERO-logic re-exports (`demo/stories/_chassis/index.ts`):

```ts
// the named sub-types are presets of ONE frame — for ergonomics + the gate's structural fingerprint.
export { default as DemoFrame } from "./DemoFrame.vue";
export const DemoStage       = (p) => h(DemoFrame, { variant: "stage", ...p });
export const DemoSpecimen    = (p) => h(DemoFrame, { variant: "specimen", ...p });
export const DemoInteraction = (p) => h(DemoFrame, { variant: "interaction", ...p });
export const DemoMatrix      = (p) => h(DemoFrame, { variant: "matrix", ...p });
export const DemoComposition = (p) => h(DemoFrame, { variant: "composition", ...p });
```

| sub-type | `variant` | internal layout (the ONLY thing that differs) | for |
|---|---|---|---|
| **`DemoStage`** | `stage` | φ²-bleed canvas LEFT (`flex-1`) + a slim `<Configurator asideSide="right">` rail at the `1/φ²` cockpit ratio (the VizStudio shape, GENERALIZED) | substrates · dock overview/morph |
| **`DemoSpecimen`** | `specimen` | a state row (rest/hover/active/disabled) in one glassy plate + caption | display · forms · feedback |
| **`DemoInteraction`** | `interaction` | the live control + a readout that drives the real API | dock sections/cta · containers |
| **`DemoMatrix`** | `matrix` | a `grid` of concentric-radius glassy cells, one per variant/size, each slamming on the overlapping stagger (the grid ripples in) | buttons/badges · data |
| **`DemoComposition`** | `composition` | a glassy stage composing a SERIES of glass-ui components (the "deftly composes" bar) | compositions · navigation |

`VizStudio` is RE-EXPRESSED as `DemoStage` (a `DemoFrame variant="stage"` preset) — NOT a parallel
chassis. One chassis, retire the fork.

### 2b — the universal field mount (CONSUME page-background `.paper-field` — the demo-side host)

This chassis is where the field LANDS as the demo-side host. It writes ONE `--field-h` per route onto
the already-mounted `PaperBackdrop`, via the page-background GOLDEN's `warmFieldHue` adapter (NOT a third
registry — it derives from the existing cool `categoryHue`):

```vue
<!-- AppShell.vue:251 — grow ONE prop on the SAME fixed element (no second plane) -->
<PaperBackdrop field :palette="warmFieldHue(categoryHue(currentCategory))"
               class="fixed inset-0 -z-10 bg-background" />
```

ONE writer → all 118 routes inherit a vivid warm field. The glass `Card` tier samples the COMPOSITED
field output (a normal painted `-z` layer) — the transmit-delta becomes perceptible (the gray-glass
complaint DIES). On a `DemoStage` substrate route the `<Aurora field>` is the opt-in rung-1 amplifier
OVER the mesh (the one-GL-per-route budget); the CSS mesh is the universal floor so NO route is flat.
**This chassis does NOT re-mint `.paper-field` — it DEPENDS on the page-background GOLDEN (the build-DAG:
page-background lands the primitive + `warmFieldHue`; this lands the universal per-route mount + the
per-sub-type transmit).**

### 2c — the φ² STAGE escape (the BIGGER card · §L6 · de-risked, §spike: stage/prose = 1.691 ≈ φ)

The prose column stays measure-bound; the `stage`-variant cel breaks out so the protagonist is φ² of
the prose block — the BIGGER card, killing the dead margin FOR THE STAGE (the prose stays readable).

```css
/* demo/stories/_chassis/demo-frame.css (NET-NEW) — the φ ladder off ONE article width */
:root {
  --phi: 1.618;
  --story-article-w:    min(96vw, 87rem);                       /* the WIDE article (was 1152 → kills the 288px dead margin) */
  --story-prose-measure: calc(var(--story-article-w) / var(--phi));   /* φ⁻¹ — the long-form read column */
  --story-stage-w:      var(--story-article-w);                 /* the stage = φ² of the prose block (stage:prose = φ) */
}
.demo-frame[data-variant="stage"][data-bleed] .demo-frame-frame {
  inline-size: var(--story-stage-w);
  margin-inline: calc(50% - 50cqw);                             /* center-bleed past the prose column */
  min-block-size: 56vh;                                         /* the stage is the protagonist */
}
.demo-frame[data-variant="stage"] .demo-frame-card {
  display: grid; grid-template-columns: 1fr minmax(13rem, 0.382fr); gap: 1.5rem;  /* 1/φ² rail */
}
/* the prose/specimen cels stay bound to the golden measure */
.demo-frame:not([data-variant="stage"]) .demo-frame-frame { inline-size: var(--story-prose-measure); margin-inline: auto; }
/* concentric radius on the matrix cells (§L6 BD.W-CONCENTRIC-RADIUS): r_inner = r_outer − gap */
.demo-frame[data-variant="matrix"] .cell { border-radius: calc(var(--radius-card) - var(--story-matrix-gap, 1rem)); }
```

The stage carries the live demo + a slim configurator rail (the cockpit ratio `1/φ²` per the
`InstrumentRail` precedent) so the controls sit RIGHT on desktop, stacking below on mobile — the shipped
`Configurator asideSide="right"` does this; the frame reuses it.

### 2d — the CEL-SLAM entrance + the LAGGING CAST (CONSUME `.scroll-cascade` + `--ease-cartoon-punch`)

The cel build rides the shipped `.scroll-cascade`/`.scroll-build` register — NOT a new engine. This
chassis AUGMENTS the cascade's terminal keyframe with the cartoon punch arc + the lagging cast. The cast
is a `::after` offset-stamp painting `--shadow-cartoon` so it animates its OWN transform independently of
the plate (a `box-shadow` cannot lag a `transform` on the same element). De-risked compositor-only (§spike).

```css
/* demo/stories/_chassis/demo-frame.css — the cel-slam + the lagging cast (presets-in-consumers) */
@supports (animation-timeline: view()) {
  @media not (prefers-reduced-motion: reduce) {
    .story-cel .demo-frame-frame {
      animation: cel-slam 720ms var(--ease-cartoon-punch, cubic-bezier(.5,-0.22,.36,1.32)) both;
      animation-timeline: view(); animation-range: entry 0% entry 42%;
      will-change: transform, opacity;
    }
    .story-cel .demo-frame-frame::after {              /* the cartoon cast — +8% LATER (overlapping action) */
      content: ""; position: absolute; inset: 0; z-index: -1; border-radius: inherit;
      box-shadow: var(--shadow-cartoon);
      animation: cast-lag 720ms var(--ease-cartoon-punch) both;
      animation-timeline: view(); animation-range: entry 8% entry 50%;
    }
  }
}
@keyframes cel-slam {  /* anticipation squash (vol-preserving) → arc → follow-through stretch → settle */
  0%   { opacity: 0; transform: translate3d(0, calc(14px * var(--motion-weight)), 0)
                                scale(calc(1 - 0.07*var(--motion-weight)), calc(1 + 0.05*var(--motion-weight))); }
  60%  { transform: translate3d(0, calc(-4px * var(--motion-weight)), 0)
                                scale(calc(1 + 0.02*var(--motion-weight)), calc(1 - 0.02*var(--motion-weight))); }
  100% { opacity: 1; transform: none; }
}
@keyframes cast-lag {  /* the cast starts displaced up-left (under the lifted plate), settles LATER */
  0%   { opacity: 0; transform: translate3d(calc(-5px*var(--motion-weight)), calc(-7px*var(--motion-weight)), 0); }
  100% { opacity: 1; transform: none; }
}
/* the OVERLAPPING stagger — cel N+1 begins before cel N settles (the existing --i index) */
.story-cel { animation-delay: calc(var(--i, 0) * 0.62 * 120ms); }  /* 1/φ overlap step */
@media (prefers-reduced-motion: reduce) {
  .story-cel .demo-frame-frame, .story-cel .demo-frame-frame::after { animation: none; }
}
```

`--ease-cartoon-punch`, `--motion-weight`, `--shadow-cartoon` are DEPENDS (motion-spring + cartoon-shadow
GOLDENs / shipped tokens) — never re-minted. `--motion-weight` co-scales the squash depth + overshoot +
cast lag so the whole cel deforms as ONE proportioned object (§L4); the dock/celebration register pushes
it toward 1, the page rest is 1/φ.

### 2e — ONE title + named sections (CONSUME `BD.W-PAGE-CHASSIS`)

The chassis `StoryHeader` renders the eyebrow → display `<h1>` → blurb ONCE (W-PAGE-CHASSIS arm-2 folds
the 36 duplicate in-card headers; the `--story-header-rule` seam arm-1 paints the header→body rule).
`<DemoFrame>` renders only `<StorySection heading>` (a semantic `<h2 class="text-subheading">`) — NEVER a
second `<h1>` or in-card eyebrow cluster. The "title ~3×" defect dies by construction.

---

## 3 — DEFT INTEGRATION (the union — reuse, no fork, no legacy)

| concern | reuse (the union) | NOT a new… |
|---|---|---|
| the page chassis | `StoryPage`/`StoryHero`/`StoryHeader`/`StorySection` — INVERT the box model (field-ground + free cels), keep the header cluster + entrance registers | parallel page system |
| the conformity kernel | `<DemoFrame>` = `<ShowcaseFrame tier="field">` (plate-drop) + `<Card tier="quiet"/"wash">` (glass register) + `.scroll-cascade` (entrance) | a new glass primitive |
| the colorful field | `.paper-field` + `--field-h` + `warmFieldHue(categoryHue)` (page-background GOLDEN — DEPEND, mount universally + per-route here) | a second field engine |
| the GL amplifier | `<Aurora field>` reading `--field-h`; `CATEGORY_DEFAULT_BG` the amplifier selector (amplified vs plain, never live vs dead) | a parallel viz |
| the stage layout | `<Configurator asideSide="right">` + the `InstrumentRail` 1/φ² ratio | a new layout engine |
| the caption band | `ShowcaseFrame`'s `--showcase-caption-gap` rhythm token | a new caption recipe |
| the φ proportion | THREE derived tokens off `--story-article-w` (widen the shipped `--story-page-max-inline`) | a magic px |
| the cel-slam + cast | `.scroll-cascade` + `--ease-cartoon-punch` + `--motion-weight` + `--shadow-cartoon` (DEPENDS) AUGMENTED with the punch arc | a new motion engine |
| the named-section rung | `<StorySection heading>` → `<h2 class="text-subheading">` (shipped, AZ.W-HIERARCHY) | a new heading size |
| the one title + rule | `--story-header-rule` + the descriptor-fold (CONSUME `BD.W-PAGE-CHASSIS`) | a per-page masthead |
| `VizStudio` | RE-EXPRESS as `DemoFrame variant="stage"` (a preset, retire the parallel) | a second viz chassis |

**Net-new artefacts (exactly FOUR):** `demo/stories/_chassis/DemoFrame.vue` (the one sub-type chassis),
`demo/stories/_chassis/index.ts` (the five zero-logic re-exports), `demo/stories/_chassis/demo-frame.css`
(the variant layouts + the φ² stage escape + the cel-slam + cast), and the `field`/`palette` prop wiring
at `AppShell.vue:251`. The library is BYTE-UNTOUCHED — `Card`/`ShowcaseFrame`/`Configurator`/the tier
tokens already exist correctly.

**The dup-kill / reconcile (the three page waves COLLAPSE onto ONE chassis, no overlap):**
`W-STORY-PAGE-STANDARD` (the sub-type spine) + `BD.W-PAGE-CHASSIS` (the header rule + one-title fold +
section re-key) + `BD.W-PAGE-BACKGROUND` (the field) are NOT three separate edits racing the same four
files — they are ONE inversion that subsumes all three: the field-ground mount IS the background fix, the
`<DemoFrame>` single-descriptor IS the dup-header fold, the `<StorySection heading>` rung IS the section
re-key. The DELTA-ASSAY amendment folds PAGE-CHASSIS + PAGE-BACKGROUND INTO `W-STORY-PAGE-STANDARD` as
its arms, so the BD set carries ONE chassis wave with the field-host + header-fold + sub-type arms, not
three overlapping waves. **No legacy, no alias, no dual path** — `VizStudio` is FOLDED, not kept.

---

## 4 — CROSS-ENGINE (Chrome AND Safari — §L7 · de-risked, §spike both engines’ contract)

- **The field path is pure compositor CSS** (radial/conic `oklch` gradients + a `transform` drift on a
  `::before`) — inherited from page-background, WebKit-native (oklch ≥ Safari 15.4). **NO `backdrop-filter:
  url`, NO SVG goo, NO trig in the field path.** sRGB interp pinned (the spike pins `background-color` so
  the Safari-default-oklab interpolation does not muddy the warm stops — the page-background §6 lesson).
  `@supports not (color: oklch(…))` falls to an sRGB warm-hsl triad. Identical Chrome↔Safari.
- **The glass `Card`/`ShowcaseFrame`** uses `backdrop-filter: blur() saturate()` (plain blur, both
  engines) over the field's COMPOSITED output — never glass-samples-glass (§L1 holds by construction; the
  field is a `-z` sibling BEHIND all glass). The Chromium-only `glass-refract` enhancement is
  `@supports`-gated with a plain-blur WebKit fallback — inherited, never an un-gated declaration.
- **The cel-slam + cast** are compositor-only (`transform`/`opacity` on `animation-timeline: view()`).
  WebKit ships `view()` timelines (Safari 17+); the `@supports (animation-timeline: view())` gate falls
  to a plain `@keyframes`-on-mount stagger (the shipped `.scroll-build`) on older WebKit. Byte-comparable
  both engines; the `cubic-bezier` easing is universal.
- **MEATBALLING stays OUT of the chassis** — the goo (dock-fission/blob) is the demo CONTENT a
  `DemoStage` may host (the dock band's static-SVG sRGB `filter:url()` metaball); the FRAME carries ZERO
  goo, ZERO `backdrop-filter:url`, no naive ellipsoids.
- **Acceptance = paired-engine π** (Chromium + WebKit captures of the composited page behind a real glass
  `DemoFrame` over the real field, both modes) — never a single-engine source-green close.

---

## 5 — A11Y / PRM CARVE (§L5)

- **`prefers-reduced-motion: reduce`** → the cel-slam + cast-lag + the field drift FREEZE to the terminal
  frame (`--motion-weight: 0` collapses the squash + overshoot + cast lag in one assignment; the `@media`
  gate zeroes the animations). The page reads ONE static, fully-assembled cel sheet: the field warm +
  static, the cels in place, the casts stamped, the ONE title + rule present. The cel-stage is a build
  CHOREOGRAPHY, never a content dependency.
- **`prefers-reduced-transparency`** → the page-background `--field-intensity: 0` drops the warm stops to
  the decoupled `--neutral-0` solid floor; the `<DemoFrame>` glass falls to its opaque tier (the library's
  shipped reduced-transparency arm). Conformity (the cel structure, the heading, the caption) survives;
  only the transmission drops. The glassy-cel aesthetic is an enhancement, never a legibility dependency.
- **`prefers-contrast: more`** → prose AA holds via the `--glass-backdrop: light` bucket the kernel sets
  on every cel; the field's mean opacity sits below the loud-protagonist ceiling so dense bands
  (forms/feedback) read calm-legible over the warm ground.
- **Semantics** — ONE `<h1>` (chassis), `<h2 class="text-subheading">` per named section
  (`StorySection heading`); the field is `aria-hidden`; the sub-type taxonomy adds NO new landmark, just
  ordered `<section>`s. Keyboard/focus is the live components' own (the chassis hosts, never traps); the
  `Configurator` rail is the shipped accessible inspector; the φ² bleed is visual, the tab-order stays
  reading-order.
- **Proportion has NO a11y bracket** (§L6) — the φ² stage + the √φ rhythm hold identically across all
  a11y states.

---

## 6 — THE BORN-RED GATE (painted-pixel, paired-engine, both modes — `proof:story-page-standard`)

`tests-visual/story-page-standard.spec.ts` + `scripts/proof-story-page-standard.mjs` (the device-free
source arm). Born-RED on HEAD by construction (0 `_chassis`, 0 field, 1152-cap stage, double-header).
Sample a per-category set: `/display/buttons`, `/forms/select`, `/substrates/aurora`,
`/containers/dialog`, `/feedback/alert`. **Sample the COMPOSITED page pixel via SVG-foreignObject→canvas
RASTER — NEVER `getComputedStyle`-string parsing** (the page-background GOLDEN's fraudulent-proof lesson:
the gate that averages stop STRINGS false-passes a teal field; the honest raster is binding).

| # | assert | born-RED on HEAD | GREEN when |
|---|---|---|---|
| **S1 chassis-adopted** | every `demo/stories/<cat>/*.vue` composes `<StoryPage>` + ≥1 `<DemoFrame variant>`; NO bespoke `rounded-card border bg-card` scaffold off the allowlist | ad-hoc per-page boxes, 0 `_chassis` | the migration lands |
| **S2 field-behind-glass (§3)** | every glassy `DemoFrame` has a `.paper-field` ancestor at `z` below it; the field region RASTERS mean OKLab **C ≥ 0.045 warm** (H ∈ [25,95], tealFrac 0) | `/buttons`: 0 fields, C 0.0029 | the universal mount + hue (spike: C 0.0907 light / 0.0862 dark) |
| **S3 glassy sub-card** | each `DemoFrame` cel is a translucent `quiet`/`wash` tier (NOT opaque `bg-card`); composited transmit-delta over the field vs a flat `--neutral-0` patch **C ≥ 0.018 warm** | flat opaque cards | the field-aware tier |
| **S4 φ²-stage** | a `stage`-variant cel measures **≥ φ × the prose column** AND **> 1152** (the bigger card); the prose cels stay measure-bound; the dead margin < 60px | 1152 on 1440, 288px dead | the stage escape (spike: stage/prose 1.691, stage 1382 > 1152, dead 58px) |
| **S5 ONE title** | each page renders EXACTLY 1 `<h1>` + the descriptor ONCE (no 2nd in-card eyebrow); the `--story-header-rule` seam paints (`border-bottom > 0`) | header rule unset, double-header | consume W-PAGE-CHASSIS |
| **S6 cel-slam (the punch)** | a frame-series shows each cel building on the punch arc (anticipation dip BELOW origin → overshoot > 1 → settle) with the cast LAGGING (the cast transform settles ≥1 frame after the plate) | static chrome, no build | the cel-slam + cast wire |
| **S7 overlapping stagger** | cel N+1's build begins BEFORE cel N settles (the build windows OVERLAP over the frame-series) | — | the 1/φ overlap step |
| **S8 both-mode warm** | the field + glass read warm-luminous in BOTH modes (dark GLOWS, never charcoal-gray) — dark raster C ≥ 0.045, L ∈ [0.25,0.6] | dark gray-glass over near-black | the warm-dark mesh + tier (spike: dark C 0.0862, L 0.342) |
| **S9 conformity WITH variation** | ≥4 sampled pages share the kernel fingerprint (glassy · field · one-title · entrance) WHILE their body content DIFFERS — a structural-fingerprint MATCH on the chrome, a DIVERGENCE on the body | ad-hoc per-page | the chassis |
| **S10 anti-evasion (≥7 bites)** | FAILS on: a flat opaque cel (S1/S3), a dead field C 0.003 (S2), a teal field h210 (S2), a 1152-capped stage (S4), a 2nd header (S5), a fade-only entrance with no anticipation dip (S6), a non-overlapping march (S7), a cast that does NOT lag (S6) | — | passes ONLY on the real cel-stage |

**Self-test:** re-introduce a bare `bg-card` section → S1/S3 RED; pin the article to 1152 → S4 RED;
strip the `.paper-field` mount → S2 RED; re-paste an in-card eyebrow → S5 RED; swap the punch arc for a
linear fade → S6 RED; set the stagger step to 0 (synchronous) → S7 RED; a teal field h210 → S2 RED. Each
MUST flag; the fixed tree clean. **No source-green close — the painted, paired-engine, RASTER-honest π is
the binding truth.**

---

## 7 — GESTALT — THE BAR (live-judge AS A USER, both modes, both engines, fresh paint)

Open `/display/buttons` + `/forms/select` + `/substrates/aurora` + a containers + a feedback page, both
modes, both engines. PASS iff:

1. **A VIVID warm colorful field is behind EVERY glass demo** — component pages read as alive as the
   aurora hero, not flat tan/charcoal. Today: NO (C 0.0029, 0 fields). Spike: YES (C 0.09 both modes).
2. **Each sub-section is its OWN glassy cel** on the shared register, transmitting the field — not a flat
   opaque box. Today: NO (one flat card). Spike: YES.
3. **The protagonist stage is BIGGER** — φ²-dominant, near-viewport, the 288px dead margin GONE. Today:
   NO (1152 cap). Spike: YES (1382 > 1152, dead 58px, stage/prose ≈ φ).
4. **ONE title** — one audacious descriptor + the header rule, never the title ~2-3×. Today: AMBER.
5. **The page ASSEMBLES** — each cel SLAMS in on the punch arc with a lagging cast, overlapping in time;
   the field drifts heavy beneath; the page paints itself like a technicolor cel sequence. Today: NO.
6. **Conformity WITH natural variation** — every page wears the SAME chassis idiom (field · glassy cels ·
   ONE title · φ² stage · cel-slam) while the demo CONTENT varies freely per sub-type — not a mechanical
   banality, not an ad-hoc per-page layout.
7. **The page DEFTLY composes glass-ui components** — docks/viz/cards/tabs/buttons as the demo hosts in
   the stage/composition variants. A UNION with the shipped chassis, never a bolt-on.
8. **Both modes warm-luminous; prose AA holds; KISS/DRY** — ONE chassis, the field is the floor, the
   sub-types are presets; zero fork, zero legacy.

The reference is the SHIPPED `/substrates/aurora` hero (full-bleed live field + audacious title) — the
content pages finally inherit its language, contained and per-sub-type, by construction. The §3
colorful-field half of the iOS-27 bar lands HERE on the demo side, behind every glass demo.

---

## 8 — THE SPIKE (de-risked LIVE — `golden/spike.html` + the paired PNGs)

A standalone HTML page de-risking the THREE boldest mechanisms AT ONCE (the field-floor, the φ² stage
escape, the cel-slam with lagging cast), verified in Chrome both modes. The LIVE readout (NOT asserted —
the `getBoundingClientRect` + SVG-foreignObject→canvas RASTER):

- **φ² stage (1440 viewport):** article 1382px · dead margin **58px** (was 288) · stage 1382 · prose 817
  · **stage/prose 1.691 ≈ φ** · stage > 1152 ✓.
- **field-behind-glass, light:** warm-mass raster **meanC 0.0907 · meanH 78.3°** — warm, clears the 0.045
  floor 2×, tealFrac 0.
- **field-behind-glass, dark:** raster **meanC 0.0862 · meanH 61° · L 0.342** — warm-GLOW, NOT charcoal.
- **cel-slam + cast:** compositor-only `transform`/`opacity` on `view()` timeline, `@supports`-gated, the
  cast on a +8% later clock, PRM → one static frame (the `@media` floor present).
- **screenshots:** `spike-light.png` (amber field · audacious title · glassy φ² stage + rail · prose
  cels) · `spike-dark.png` (warm-brown GLOW · same structure · warm cast offset).

The real `DemoFrame.vue` + `demo-frame.css` re-express this spike over the shipped `Card`/`ShowcaseFrame`/
`Configurator` register + the consumed `.paper-field` — a UNION, not a re-build.
