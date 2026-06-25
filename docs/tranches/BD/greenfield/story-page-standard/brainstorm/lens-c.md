# STORY-PAGE-STANDARD — LENS-C: the CEL-STAGE chassis (1940s technicolor FLOW & PUNCH)

> Greenfield brainstorm. Lens: maximum 1940s-technicolor flow & punch — bold layered-offset
> shadowing, exaggerated squash/stretch/morph, anticipation + follow-through + overlapping
> action + arcs, real weight & inertia. The boldest variant that stays idiomatic + cross-engine.
>
> Binding law: design.md (§L1 glass · §L4 motion tiers · §L6 golden proportion · §L7 cross-engine)
> + GREENFIELD-HARDENING-PLAN §1 + IOS27-REFERENCE. NO legacy, KISS/DRY, a UNION with the shipped
> `StoryPage`/`StoryHero`/`ShowcaseFrame` chassis — never a re-fork. Source-verified live, both modes.

---

## 0 — THE BORN-RED TRUTH (live-measured, `/display/buttons` + `/forms/select` + `/substrates/aurora`, both modes)

Sampled `localhost:5173` via chrome-devtools `getComputedStyle` + DOM-count + screenshot read:

| probe | measured | verdict |
|---|---|---|
| `--field-h` / `--glass-key` / `--story-header-rule` @ `:root` | **(unset) · (unset) · (unset)** | the colorful field, the cel key-light, the header rule are ALL absent (the three depends unbuilt) |
| `.paper-field` count, every glass route | **0** (52 glass surfaces on `/display/buttons`, 0 fields) | the §3 colorful field is ABSENT — every glass demo over a flat near-white page |
| page region behind the card (`/forms/select` light) | `rgb(251,250,248)` → **C 0.0029 H 84.6** | flat near-achromatic — the select pills bend cream-on-cream, morphism imperceptible |
| `.story-hero-card` width @ 1440 viewport | **1152px** (1152 cap → **288px dead margin**) | the stage is SMALLER not bigger — the φ²-dominant stage the user asked for is unbuilt |
| in-card hand-rolled `<header>` (chrome `<h1>` + the in-card IconChip descriptor) | **2 descriptors** (`/forms/select`: "Select" h1 + "FORMS · SELECT / Single-choice…" in-card header) | the double-header the user saw (W-PAGE-CHASSIS arm 2 finding, 36 files) |
| `.story-sections > *` glassiness | `background: rgba(0,0,0,0)` · `backdrop-filter: none` | the sub-sections are BARE bands inside ONE big card, NOT their own glassy contexts (the user's #1 ask, missed) |
| `headerBorderBottom` | **0px** | no header→body dividing rule on any page |
| the card composite | `oklab(0.928 … / 0.664)` over flat page | a near-white translucent plate — warm-ish material, but NOTHING colorful behind it (reads gray, the cards-golden diagnosis) |

The `/substrates/aurora` HERO page is the lone bright spot — a full-bleed live aurora field behind a
single audacious "Aurora" title with a read-through descriptor cluster. **It is the `<DemoStage>`
reference shape** (the wave names it: VizStudio generalizes to `<DemoStage>`). But its body sections
below the fold are the SAME flat undifferentiated bands. The disease is systemic, the cure is the chassis.

**The synthesis:** the chassis HAS the bones — `StoryPage` mounts the header cluster + the section
stack, `StoryHero` mounts a contained/full-bleed live field behind a `CardTier` plate, `ShowcaseFrame`
has the `tier="field"` plate-drop. What is MISSING is (1) the colorful field actually mounted (the
depend), (2) the sub-sections promoted to their own glassy cards, (3) a φ²-BIGGER stage, (4) the
double-header folded to one, and (5) a demo SUB-TYPE taxonomy that bakes conformity so a page CANNOT
hand-roll a flat band. This lens designs all five as ONE cel-stage chassis with cartoon flow & punch.

---

## 1 — THE GOLDEN IDEA: the CEL-STAGE — every page is a lit cel over a colorful field, assembled by overlapping-action build

A 1940s technicolor cel is **paint on glass over a lit backdrop, with bold ink outlines and a hard
drop-shadow that sells the depth.** That IS the storybook page: a colorful field (the painted
backdrop), glassy sub-cards (the cels), a defined edge + cartoon cast (the ink outline + drop-shadow),
and a page that ASSEMBLES with overlapping action (each cel snaps in on its own arc, never all at once).
The chassis is not a layout grid — it is a **cel compositor** with five conformity invariants baked
into thin sub-type frames, so the CONTENT varies naturally while the LANGUAGE is guaranteed.

Five moves, each a UNION with a shipped seam:

1. **The field is the page paint, not a flat plate (the §3 fix — DEPEND, not re-build).** The chassis
   mounts `.paper-field` (page-background GOLDEN's `@utility`, `--field-h` per route via `warmFieldHue`)
   behind EVERY page — `StoryHero`'s `liveBackdrop` branch already mounts a contained field; this lens
   threads `paper-field` as the universal GROUND under it (rung 0, every route, 0-JS) with the live
   `<Aurora>`/`<PaperGrid>` as the opt-in HERO amplifier (rung 1). One writer → all 118 routes have a
   warm colorful cel backdrop. The lens has something to refract.

2. **Each sub-section is its OWN cel — a glassy card on the shared register (the user's #1 ask).** The
   ONE big 1152px opaque card is RETIRED. The body becomes a stack of `<Card tier="quiet">` cels, each
   a translucent warm-glass plate over the colorful field, each with a defined `--glass-key`-cast edge
   and a `--shadow-cartoon` drop. The sub-type frames (§3) bake this — a page CANNOT render a bare
   `rgba(0,0,0,0)` band. Glass-first by default: a page composing the chassis DEMONSTRATES the glass it
   ships.

3. **The protagonist stage is φ²-DOMINANT + BIGGER (the proportion fix — §L6).** The 1152 cap is killed
   ON THE STAGE: `<DemoStage>` goes near-viewport-wide (`--story-stage-max-inline`, ~φ wider than the
   prose column), while the prose/spec cels stay measure-bound (`--story-page-max-inline`). The φ law:
   the main stage targets **φ² of the body rung** (§L6 "hero stages target φ² of the body"); the cels
   are **as wide as the hero title** (the user's "cards as wide as the hero title"). The stage is the
   protagonist; the spec cels are the chorus.

4. **One title, header folded to one descriptor (the double-header fix — W-PAGE-CHASSIS).** The 36
   hand-rolled in-card `<header>` IconChip blocks are RETIRED into the chassis cluster; the per-category
   color identity routes through the manifest `CATEGORY_STOP` map. ONE descriptor (eyebrow → IconChip
   POP → display `<h1>` → blurb) above a `--story-header-rule` hairline. The "title ~3×" is gone.

5. **The page ASSEMBLES with OVERLAPPING ACTION (the cartoon entrance — the boldest move, §2).** Not a
   uniform fade. Each cel builds on its OWN clock with an offset, on the `--ease-cartoon-punch` arc
   (anticipation dip → arc sweep → follow-through overshoot), the cels OVERLAPPING in time (cel N+1
   starts before cel N settles — the §L4 overlapping-action principle), the drop-shadows lagging the
   plates (the cast catches up — overlapping action on the shadow layer too). The page paints itself
   like a cel sequence flipping into place.

### The single boldest move (de-risk target)

**THE CEL-SLAM ENTRANCE WITH A LAGGING CAST.** Every sub-card (cel) builds in not with a fade, but
with a 1940s SLAM: it ANTICIPATES (scales down to ~0.94 + lifts ~10px, a pull-back — squash), then
SLAMS into place on `--ease-cartoon-punch` (overshoots to ~1.04 scale + a sub-px settle — stretch),
while its **`--shadow-cartoon` cast LAGS one beat behind the plate** (the offset-shadow animates its
own `translate` on a later clock, so the shadow visibly catches up to the plate after it lands — the
overlapping-action "the weight follows the body" read). The cels build in READING ORDER with an
overlapping stagger (`--cel-build-step` ≈ 1/φ of the cel duration, so cel N+1's anticipation begins
while cel N is still overshooting — never a mechanical one-at-a-time march). The field's own
`field-cel-drift` is the slow heavy backdrop the slamming cels land over. The result is the most ALIVE
storybook in the set: a page that doesn't appear — it ASSEMBLES, cel by cel, with weight and a cast
that chases. It is a pure `@keyframes`-on-mount + `view()`-timeline cascade (compositor `transform` +
`opacity` only, no JS clock), so it costs nothing and PRM collapses it to one static frame.

---

## 2 — THE MECHANISM (the cel-stage motion + the chassis seams)

### 2a — the SUB-CARD CEL-SLAM (the entrance — `demo/stories/_chassis/cel.css`, presets-in-consumers)

The cel build rides the shipped `.scroll-cascade`/`.scroll-build` register (`scroll-choreography.css`)
— NOT a new engine. This lens AUGMENTS the cascade's terminal keyframe with the cartoon arc + the
lagging cast. `--motion-weight` (motion-spring DEPEND) co-scales the squash depth + overshoot + cast
lag so the whole cel deforms as ONE proportioned object (§L4).

```css
/* the cel — a glassy sub-card that SLAMS into place over the field, cast lagging */
.story-cel {
  --cel-weight: var(--motion-weight, 0.62);          /* 1/φ rest; dock/celebration push → 1 */
  --cel-build-step: 0.62;                              /* the overlapping stagger ratio (1/φ) */
  will-change: transform, opacity;
}
@supports (animation-timeline: view()) {
  @media not (prefers-reduced-motion: reduce) {
    .story-cel {
      /* the plate SLAMS — anticipation (squash, pull-back) → arc → follow-through (stretch) */
      animation: cel-slam 720ms var(--ease-cartoon-punch, cubic-bezier(.5,-0.2,.4,1.2)) both;
      animation-timeline: view();
      animation-range: entry 0% entry 38%;             /* builds as it enters the scroller */
    }
    /* the CAST lags one beat — the offset-shadow catches up after the plate lands */
    .story-cel::after {                                 /* the cartoon drop-shadow layer */
      animation: cel-cast-lag 720ms var(--ease-cartoon-punch) both;
      animation-timeline: view();
      animation-range: entry 8% entry 46%;             /* +8% later → the weight FOLLOWS the body */
    }
  }
}
@keyframes cel-slam {
  /* anticipation: squash + pull-back (scale-down + lift); then SLAM through to overshoot; settle */
  0%   { opacity: 0; transform: translate3d(0, calc(10px * var(--cel-weight)), 0)
                                scale(calc(1 - 0.06 * var(--cel-weight))); }
  100% { opacity: 1; transform: translate3d(0,0,0) scale(1); }   /* punch easing bakes the ~1.04 overshoot */
}
@keyframes cel-cast-lag {
  /* the cast starts displaced UP-LEFT (under the lifted plate) and settles to its offset stamp,
     visibly LATER than the plate — overlapping action: the shadow chases the body */
  0%   { opacity: 0; transform: translate3d(calc(-4px * var(--cel-weight)), calc(-6px * var(--cel-weight)), 0); }
  100% { opacity: 1; transform: translate3d(0,0,0); }
}
/* the OVERLAPPING stagger — cel N+1 begins before cel N settles (the §L4 principle).
   keyed off the existing --scroll-build-step / --i index the chassis already writes. */
.story-cel { animation-delay: calc(var(--i, 0) * var(--cel-build-step) * 120ms); }

@media (prefers-reduced-motion: reduce) {
  .story-cel, .story-cel::after { animation: none; }  /* one static frame, terminal state */
}
```

The **cast** is the `--shadow-cartoon` offset-stamp (DEPEND: `tokens/shadow.css:9`, ships) painted on
a `::after` so it can animate its OWN transform independently of the plate (a `box-shadow` cannot lag a
`transform` on the same element). On the cel the `::after` is the cartoon drop; its lag is the
overlapping-action signature. The cel's EDGE reads the `--glass-key` cast direction (DEPEND:
glass-material golden) so the field over-glaze, the cel rim, and the cel cast all answer to ONE light.

### 2b — the φ² STAGE (the bigger card — proportion, §L6)

```css
/* the two width rungs — the prose column (measure-bound) and the protagonist stage (φ²-dominant) */
:root {
  --story-page-max-inline: 72rem;                     /* the prose/spec-cel column (shipped) */
  --story-stage-max-inline: min(100vw - 4rem, calc(var(--story-page-max-inline) * 1.272)); /* √φ wider */
}
.story-stage {                                          /* the <DemoStage> protagonist box */
  inline-size: var(--story-stage-max-inline);          /* near-viewport, BIGGER (kills the 1152 cap) */
  margin-inline: calc((var(--story-page-max-inline) - var(--story-stage-max-inline)) / 2); /* bleed out */
  aspect-ratio: var(--phi, 1.618);                     /* the stage box is golden by default */
}
```

The stage breaks the prose cap to near-viewport (the user's "main card BIGGER, more screen space"); the
spec cels stay at the prose width (the user's "cards as wide as the hero title" — the title sits on the
same `--story-page-max-inline` measure). The φ family throughout: the stage is **φ² of the body's calm
content rung** (§L6), the cel radius + padding share the √φ proportion (concentric — `r_inner = r_outer − gap`).

### 2c — the FIELD as page paint (the §3 colorful field — DEPEND, the union)

No re-build. The chassis mounts the page-background GOLDEN's `.paper-field` as the universal ground via
the SAME `<PaperBackdrop>`/`StoryHero` seam, writing `--field-h` per route from `warmFieldHue(category)`.
The cels (`tier="quiet"`) float over it; the stage hosts the opt-in `<Aurora field>` HERO amplifier. The
field's `field-cel-drift` (page-background §2c) is the slow heavy backdrop the cels slam over — the two
motions COMPOSE: a heavy drifting field, light cels slamming in on top, casts chasing. Cartoon depth.

### 2d — the header fold (one title — W-PAGE-CHASSIS, the union)

The chassis cluster gains the leading `<IconChip :icon="categoryIcon" :section="categoryStop" bloom reveal>`
(threaded from the manifest `CATEGORY_STOP` map); the `--story-header-rule` hairline draws on the chrome
header bottom (reading `--configurator-divider`, dark-adaptive). The 36 in-card `<header>` blocks DELETE.
ONE descriptor, the IconChip POP the single color event, the rule the single seam. The IconChip's
`reveal`/`bloom` is the header's OWN cel-slam moment (it rides the same punch register).

---

## 3 — THE DEMO SUB-TYPE TAXONOMY (the conformity frames — `demo/stories/_chassis/`)

Five thin chassis components, each baking the five invariants (a cel · the entrance · the caption band ·
the field read-through) so a page CANNOT bypass conformity; the CONTENT slot is free (natural variation).
Each is a `<Card tier="quiet">` cel + the cel-slam class + a `ShowcaseFrame tier="field"` host — a UNION
of shipped primitives, not a new surface.

| Sub-type | For | Shape (the baked conformity) | Pages |
|---|---|---|---|
| **`<DemoStage>`** | a full-bleed live viz / hero interactive | the φ²-dominant `.story-stage` cel: a big glassy frame hosting the canvas (substrate sizes the buffer — FIX 5) + the opt-in `<Aurora field>` amplifier + a slim configurator rail (`<DockStack mode="facets">`) + caption band. **VizStudio generalizes to this.** | substrates (11) · dock (overview/morph/rail) |
| **`<DemoSpecimen>`** | ONE component, multi-state | the cel + a rest/hover/active/disabled state matrix over the field + caption | display · forms · feedback |
| **`<DemoInteraction>`** | a manipulable component | the cel + the live control + a readout; drives the real API; the readout ticks on the spring register | dock (sections/cta) · containers |
| **`<DemoMatrix>`** | a variant/size grid | a grid of cel-cells, one per variant, each slamming in on the overlapping stagger (the grid ripples in) | display (buttons/badges) · data |
| **`<DemoComposition>`** | a multi-component scene | a stage cel composing a SERIES of glass-ui components (docks · viz · cards · tabs · buttons — the "deftly composes" bar) | compositions · navigation |

Each sub-type is `~40 LOC`: it slots the content, wraps it in a cel, sets `--i` for the stagger,
applies `tier="field"` to the showcase host, and emits the caption band. The PAGE composes `<StoryPage>`
+ the right sub-type(s); the bespoke `rounded-card border bg-card` scaffold DELETES (no legacy). DRY:
one cel recipe, five thin frames, 118 pages.

### How a page reads (the cel-stage, end to end)

`/forms/select` becomes: ONE "Select" title + IconChip POP + rule (the chrome cluster) → a stack of
`<DemoSpecimen>` cels, each a warm-glass card over the terracotta-warm field (h48), the select pills
bending the live field-mass, each cel SLAMMING in on its overlapping arc with a lagging cast. The
big "Font family" picker is a `<DemoInteraction>` stage cel (φ-wider). No double-header, no flat band,
no dead margin — a lit technicolor cel sheet that assembles itself.

---

## 4 — CROSS-ENGINE (Chrome AND Safari — §L7)

- **The cel-slam is pure compositor `transform` + `opacity` on `animation-timeline: view()`** — WebKit
  ships `view()` timelines (Safari 17+); the `@supports (animation-timeline: view())` gate falls to a
  plain `@keyframes`-on-mount stagger (the shipped `.scroll-build` already does this) on older WebKit.
  No `backdrop-filter: url`, no SVG goo, no trig in the entrance path. Identical compositor behavior.
- **The cel glass** is the shipped `<Card>` `backdrop-filter: blur() saturate()` — WebKit-native; the
  cel samples the field's COMPOSITED output (a normal painted layer behind it), never another filter
  (the §L1 "glass cannot sample glass" rule holds — the field is a `-z` sibling, not a backdrop).
- **The cast `::after`** is a `box-shadow` offset stamp (`--shadow-cartoon`) with an independent
  `transform` lag — both forever-supported, both engines.
- **The field path** (DEPEND) inherits page-background's cross-engine fences (oklch stops, sRGB interp
  pinned, `@supports` oklch fallback). The `<Aurora field>` amplifier inherits Aurora's WebKit fences.
- **MEATBALLING stays in the dock/blob band** — the cel-stage entrance has ZERO goo; the field has zero
  `backdrop-filter:url`. The metaball lives where it belongs.
- **Acceptance = paired-engine π** (Chromium + WebKit captures of the assembled page + a frame-series of
  the cel-slam) — the entrance is verified painting, never assumed.

---

## 5 — A11Y / PRM CARVE

- **`prefers-reduced-motion: reduce`** → every cel-slam + cast-lag + the field drift FREEZE to the
  terminal frame (the `@media` gate zeroes the animations; `--motion-weight: 0` collapses the squash +
  overshoot + cast lag in one assignment — §L5). The page reads one static, fully-assembled cel sheet:
  the field warm + static, the cels in place, the casts stamped, the title + rule + IconChip present. No
  entrance, full content. The cel-stage is a build CHOREOGRAPHY, never a content dependency.
- **`prefers-reduced-transparency`** → the cels drop to the opaque `tier="resting"` plate (the shipped
  Card fallback) + `--field-intensity: 0` shows the `--neutral-0` floor (page-background carve). The
  glassy cel becomes a calm opaque card; legibility floor holds.
- **`prefers-contrast: more`** → the `--glass-backdrop: light` AA bucket on each cel (shipped,
  `StoryHero.vue:379`) holds prose ≥ 4.5:1 over the live field; the cel opacity sits below the loud ceiling.
- **Keyboard / focus** — the cels are layout, not interactive; the demo content inside owns its own focus
  order (unchanged). The header rule + IconChip are decorative (`aria-hidden` where appropriate). The ONE
  `<h1>` per page is the document title; sections are named `<h2 class="text-subheading">` (W-PAGE-CHASSIS
  arm 3) so the heading hierarchy is real for AT.

---

## 6 — DEFT INTEGRATION (the union — reuse, no fork, no legacy)

| concern | reuse (the union) | NOT a new… |
|---|---|---|
| the page chassis | `StoryPage`/`StoryHero`/`StoryHeader`/`StorySection` (shipped) — STANDARDIZE + add sub-types | second chassis |
| the colorful field | `.paper-field` + `--field-h` + `warmFieldHue` (page-background GOLDEN — DEPEND) | per-page field |
| the cel plate | `<Card tier="quiet">` + `--glass-bg-sheet` (shipped, `glass.css:290`) | new glass surface |
| the cel cast | `--shadow-cartoon` offset stamp (shipped, `shadow.css:9`) on a `::after` | new shadow token |
| the cel edge / light | `--glass-key` (glass-material GOLDEN — DEPEND) drives rim + cast + field over-glaze, ONE light | new light token |
| the entrance | `.scroll-cascade`/`.scroll-build` + `view()` timeline (shipped) AUGMENTED with the punch arc | new motion engine |
| the punch easing + weight | `--ease-cartoon-punch` + `--motion-weight` (motion-spring GOLDEN — DEPEND) | literal cubic-bezier |
| the showcase host | `ShowcaseFrame tier="field"` (shipped, `ShowcaseFrame.vue:88`) | new frame |
| the header fold | `CATEGORY_STOP` map + `<IconChip>` + `--story-header-rule`/`--configurator-divider` (W-PAGE-CHASSIS) | new header primitive |
| the per-route hue | `warmFieldHue(categoryHue(id))` (page-background — DEPEND, no 3rd registry) | new color map |
| the configurator rail | `<DockStack mode="facets">` (shipped dock) inside `<DemoStage>` | new rail |

**Net-new artefacts (honest):** the 5 thin sub-type components (`demo/stories/_chassis/Demo{Stage,
Specimen,Interaction,Matrix,Composition}.vue`); the `cel.css` slam/lag/stagger recipe; the
`--story-stage-max-inline` φ² rung; the per-page migration (delete bespoke scaffold → compose sub-types).
Everything load-bearing — the field, the glass plate, the cast, the light, the punch easing, the header
fold — is a DEPEND on a sibling greenfield or a re-point of a shipped seam. **No re-fork. No legacy.**

**The dup-kill / reconcile (vs the 116-wave set + the three named waves):**
- `W-STORY-PAGE-STANDARD` (the sub-type taxonomy spine) is the PARENT — this lens IS its reference
  implementation: the 5 sub-types + the conformity invariants + the φ² stage + the alive entrance.
- `BD.W-PAGE-CHASSIS` (header rule · dup-header fold · `label`→`heading` re-key) is CONSUMED — the cel
  cluster IS its single descriptor; no second header authoring.
- `BD.W-PAGE-BACKGROUND` + the page-background GOLDEN (the `.paper-field`/`--field-h` field) is DEPENDED —
  this lens is the demo-side HOST that mounts the field behind every cel; it does NOT re-mint the field.
- The cel entrance RECONCILES `W-LIQUID-ENTRANCE-GENERAL` (the squish/morph/fade) onto ONE cel-slam
  recipe — no parallel entrance.

The three named waves stay DISTINCT but COMPOSE: PAGE-BACKGROUND grounds the field, PAGE-CHASSIS folds
the header, STORY-PAGE-STANDARD adds the sub-types + the φ² stage + the cel-slam entrance THAT USE both.
This lens is the keystone that makes them read as ONE cel-stage.

---

## 7 — THE BORN-RED GATE (painted-pixel, paired-engine, both modes)

`tests-visual/story-page-standard.spec.ts` + `scripts/proof-story-page-standard.mjs` (the device-free
source arm). Born-RED on HEAD by construction (0 fields, flat bands, 1152 cap, double-header). Sample a
per-category set: `/display/buttons`, `/forms/select`, `/substrates/aurora`, `/containers/dialog`,
`/feedback/alert`. NO source-green close — the painted π binds.

| # | assert | born-RED on HEAD | GREEN when |
|---|---|---|---|
| **S1 sub-cards are glassy cels** | each `.story-sections > *` resolves a non-`none` `backdrop-filter` + a translucent warm bg over the field (NOT `rgba(0,0,0,0)`) | bare bands, `backdrop-filter:none` (live) | the cel sub-types render |
| **S2 colorful field present + vivid** | every glass cel composites a `.paper-field`/`<Aurora field>` at `z` below it; field region mean OKLab C ≥ 0.045 warm (H ∈ [25,95]) | 0 fields, C 0.0029 (live) | the field mounts (DEPEND lands) |
| **S3 φ² stage is BIGGER** | `<DemoStage>` inline-size > the prose column AND ≥ φ·the spec-cel width; the 1152 cap is GONE on the stage | 1152 cap, 288px dead margin (live) | `--story-stage-max-inline` lands |
| **S4 ONE descriptor** | exactly 1 descriptor cluster per page (chassis cluster); NO 2nd in-card `<header>`; `--story-header-rule` border > 0 | 2 descriptors, rule 0px (live) | the fold + rule land |
| **S5 cel-slam entrance (the punch)** | a frame-series captures each cel building on the punch arc (anticipation dip below origin → overshoot > 1 → settle) with the cast LAGGING the plate (the cast transform settles ≥1 frame after the plate) | static chrome, no build (live) | the cel-slam + cast-lag wire |
| **S6 overlapping stagger** | cel N+1's build begins before cel N settles (the build windows OVERLAP, measured over the frame-series) | — | the `--cel-build-step` 1/φ overlap |
| **S7 transmit-DELTA** | a cel over the real field differs measurably from the same cel over a flat `--neutral-0` patch (composited C ≥ 0.018 warm — morphism perceptible) | identical/muddy (live) | field + cel land |
| **S8 prose-AA + proportion** | body text ≥ 4.5:1 over the live field both modes; field below the loud ceiling on dense bands | — | the bucket + opacity cap |
| **S9 PRM single-frame** | under PRM the page reads one static assembled frame — no slam, no lag, full content (field static, cels in place, casts stamped, title + rule + IconChip present) | — | the PRM carve |
| **S10 anti-evasion (≥7 bites)** | FAILS on: a flat band (S1), a missing field (S2), the 1152 cap on the stage (S3), a 2nd header (S4), a fade-only entrance with no anticipation dip (S5), a non-overlapping march (S6), a cast that does NOT lag (S5), a teal field h210 (S2) | — | passes only on the real cel-stage |

**Self-test:** re-introduce a bare `<section>` band → S1 RED; strip the field → S2 RED; re-cap the stage
at 1152 → S3 RED; re-paste an in-card `<header>` → S4 RED; swap the punch arc for a linear fade → S5 RED;
set `--cel-build-step: 0` (synchronous) → S6 RED. Each MUST flag; the fixed tree clean.

---

## 8 — GESTALT — THE BAR (live-judge AS A USER, both modes, both engines)

Open `/display/buttons` + `/forms/select` + `/substrates/aurora` + a containers + a feedback page, fresh
paint, both modes, both engines. PASS iff:

1. **Each sub-section is its OWN glassy cel** — a translucent warm-glass card over a colorful field, a
   defined `--glass-key` edge + cartoon cast, NEVER a bare band or a flat opaque box. Today: NO (bare
   bands in one 1152 plate).
2. **A VIVID warm colorful field is behind every cel** — the glass TRANSMITS it, not cream-on-cream.
   Today: NO (flat C 0.0029).
3. **The protagonist stage is BIGGER** — near-viewport, φ²-dominant, the dead margin GONE. Today: NO (1152 cap).
4. **ONE title + ONE descriptor** — the IconChip POP + eyebrow + display `<h1>` + blurb above a dividing
   rule; no double/triple header. Today: NO (2 descriptors).
5. **The page ASSEMBLES** — each cel SLAMS in on the punch arc with a lagging cast, overlapping in time;
   the field drifts heavy beneath; the page paints itself like a technicolor cel sequence. Today: NO
   (static chrome).
6. **Conformity WITH natural variation** — every page wears the SAME cel-stage language (field · cels ·
   rule · stage · slam) while the demo content varies freely (the sub-type is a frame, the content is free).
7. **Both modes warm-luminous** — dark glows, never charcoal; the cels read warm-glass over the warm-dark field.
8. **Text AA holds**; dense bands calm-legible; PRM → one static assembled frame.
9. **No-legacy / KISS / DRY** — ONE cel recipe, 5 thin sub-types, the field/plate/cast/light/punch all
   DEPENDED or re-pointed; zero re-fork; the bespoke scaffold DELETED on every migrated page.

The boldest, most ALIVE storybook in the set: not a layout — a lit technicolor cel sheet that assembles
itself with weight, a cast that chases, over a colorful field, conformity guaranteed, variation free.
Both modes, both engines, painted-pixel verified.
