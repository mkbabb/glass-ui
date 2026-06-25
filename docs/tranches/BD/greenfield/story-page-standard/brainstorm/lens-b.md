# STORY-PAGE-STANDARD — lens-b (cross-engine / perf-first) greenfield

> The standardized storybook PAGE chassis + the demo SUB-TYPE taxonomy
> (`DemoStage` / `Specimen` / `Interaction` / `Matrix` / `Composition`) — ONE chassis
> that GUARANTEES conformity (glassy sub-cards · colorful field behind every glass demo ·
> a bigger φ² stage · one title · alive entrance) WITH natural variation. Designed from
> first principles through the CHROME+SAFARI / KISS / compositor-only / golden-proportion lens.
> **Tranche-dev only. A UNION with the shipped `StoryPage`/`StoryHero`/`StorySection`/`ShowcaseFrame`
> chassis + the page-background `.paper-field` primitive + the shared glass register — no re-fork,
> no parallel page system, no legacy.**

---

## 0 — THE LIVE BORN-RED TRUTH (measured `:5173`, 2026-06-24, chrome-devtools, both modes)

Navigated `/display/buttons` + `/forms/select` + `/substrates/aurora`, `getComputedStyle` +
`getBoundingClientRect` + screenshot read. The five conformity invariants, each MISSED on the
content pages:

| invariant | live measurement | verdict |
|---|---|---|
| **bigger φ² stage** | `.story-page-article` = **1152px on a 1440 viewport** → `--story-page-max-inline: 1152px`, **288px dead margin** each side; the `<h1>` is **1066px wide** but the stage card matches the article, NOT φ²-dominant | RED — the stage is SMALLER, not bigger; the brief's "main card BIGGER" unmet |
| **colorful field behind glass** | `--field-h` = **(unset)**, `--glass-key` = **(unset)**, `.paper-field` count = **0**; on `/forms/select` the select pills read flat cream-on-cream, zero refraction (lens-a/b/c page-background goldens: page chroma **C 0.0029**, 15× below the §3 0.045 floor) | RED — the §3 colorful field is UNBUILT; glass has nothing to bend |
| **glassy sub-cards** | the body is **ONE big `bg-card` plate** (`.story-hero-card`); inside it the sections are flat `flex flex-col` blocks delimited by a hairline rule — NOT individual glass cards on the shared register | RED — "each sub-section in its own GLASSY CARD" unmet |
| **one title** | chassis renders **1 `<h1>`** (good), BUT the body card still hand-rolls a **duplicate eyebrow** ("DISPLAY · BUTTONS" / "FORMS · SELECT") + IconChip cluster inside it (screenshot-confirmed on both routes) — the descriptor renders twice | AMBER — `<h1>` is single; the in-card descriptor dup persists (W-PAGE-CHASSIS arm-2 targets it) |
| **alive entrance** | `.scroll-build`/`.scroll-cascade` registers ARE wired (the page assembles in reading order) — the one invariant largely landed | GREEN-ish — entrance exists; the sub-card squish/morph is the gap |
| **sub-type taxonomy** | **0** — no `DemoStage`/`Specimen`/`Interaction`/`Matrix`/`Composition`; every page hand-rolls its own `<StorySection>` + `<ShowcaseFrame>` arrangement | RED — conformity is by convention, not by construction |

The reference shape EXISTS and reads beautifully: `/substrates/aurora` (the HERO variant) — a
full-bleed live aurora field behind an audacious `Aurora` title and the content (screenshot-confirmed,
`fullBleed: true`, `canvasCount: 2`). **The hero variant is the proof the chassis CAN do this; the
content pages just never inherit it.** The gestalt gap: a content page is a flat gray sheet with one
big opaque card and a duplicated header — the spec-sheet aesthetic the brief condemns. The hero page
is the technicolor read the brief wants. The job is to make the content page wear the hero page's
clothes — contained, calmer, per-sub-type — by construction.

---

## 1 — THE CORE IDEA: the page is a COMPOSITION of glass cards over ONE shared field — and a sub-type is a PRESET of that composition, not a new component

The current chassis is a **monolith**: `StoryPage` → ONE `StoryHero` card → a flat `<StorySection>`
stack inside it. That single big card is why (a) the stage is article-width not φ²-dominant, (b) the
sections are flat blocks not glassy cards, (c) the field sits behind the card not behind each demo.

The greenfield **inverts** the box model. The page is NOT one card with sections inside — it is a
**header cluster + a stack of FREE glassy cards floating directly over ONE shared full-bleed warm
field.** The `.paper-field` (the page-background primitive, mounted by the chassis) is the universal
ground; every sub-section is its OWN glass card transmitting that field; the protagonist sub-section
is a φ²-dominant STAGE. A "sub-type" is then nothing more than a **named preset of card geometry +
demo-host shape** — `DemoStage` is the big φ²-bleed card, `Specimen` is the state-matrix card,
`Matrix` is the variant-grid card. Same chassis, same field, same glass register, same entrance —
the geometry and the host vary. **Conformity is structural (you literally cannot author a flat opaque
section), variation is the free content slot.**

```
THE PAGE (one fixed warm field + a free glass-card stack, NOT one card with sections inside):

  .paper-field          ← fixed, inset:0, z:-1, per-route --field-h (page-background primitive)
   ├ <StoryHeader>      ← ONE cluster: eyebrow → IconChip POP → display <h1> → blurb + the rule
   └ .story-stack       ← the glass-card column, gap = --story-page-section-gap
       ├ <DemoStage>    ← the PROTAGONIST: a φ²-DOMINANT bleed card (the big stage the user asked for)
       │    └ slot: the live viz / hero interactive + a slim configurator rail + caption band
       ├ <DemoSpecimen> ← a glass card hosting ONE component multi-state (rest/hover/active/disabled)
       ├ <DemoMatrix>   ← a glass card whose body is a grid of glass cells (one per variant)
       ├ <DemoInteraction> ← a glass card + live control + readout (drives the real API)
       └ <DemoComposition> ← a glass card composing a SERIES of glass-ui components (the "deftly composes" bar)
```

Five sub-type components, **each a thin wrapper over ONE shared `<DemoCard>` base** (the conformity
kernel). `<DemoCard>` = `<ShowcaseFrame tier="field">` (the plate-drops-to-transparent host that
already exists) + the glass register (`<Card tier="quiet">`) + the entrance (`.scroll-cascade` child
+ the liquid-entrance squish) + the caption band + the optional `<StorySection heading>` head. The
sub-types differ ONLY in their geometry token + their default body layout:

| sub-type | geometry | body layout | grounds in |
|---|---|---|---|
| `<DemoStage>` | **φ² grid** (`--story-stage-w`, full-bleed of the article + GL ceiling) | the big canvas + a slim `aside` configurator rail (or `<DockStack mode="facets">`) | generalizes the shipped `VizStudio`/`StoryHero` hero |
| `<DemoSpecimen>` | 1 column, golden measure | a state-matrix row (rest/hover/active/disabled) | `forms/inputs`, `feedback/toaster` |
| `<DemoMatrix>` | a responsive glass-cell grid (`--story-matrix-min`) | one glass cell per variant/size | `display/buttons`, `display/badges` |
| `<DemoInteraction>` | golden split (control · readout) | a live control + a live readout over the real API | `dock/sections`, `containers` |
| `<DemoComposition>` | a free glass stage | composes ≥3 glass-ui primitives into one scene | `compositions`, `navigation` |

**The single boldest move (de-riskable on the live tree):**

> **Dissolve the one-big-card monolith: the page body is NO LONGER a card. The shared `.paper-field`
> becomes the universal page ground (mounted once by the chassis, per-route `--field-h`), and EVERY
> sub-section is a free glass card floating over it — so the field reads through every demo by
> construction, the stage can grow to φ² without fighting an enclosing card, and "conformity" is the
> shared `<DemoCard>` kernel that a page composes, not a convention a page is asked to honor.** The
> protagonist `<DemoStage>` then grows to the full article width (the 1152 cap stays on the PROSE
> column only — `--story-prose-measure` ≈ φ⁻¹ of the article — while the stage bleeds to
> `--story-stage-w` ≈ the article width, φ² of the prose), so the "bigger card" is the natural
> consequence of the inversion, not a magic number.

This is DRY-er than the status quo (one kernel, five 20-line presets vs N hand-rolled per-page
layouts), KISS (no new engine — it RE-POINTS `ShowcaseFrame tier="field"` + `.paper-field` + the
glass register + the entrance, all shipped), and it makes the §3 colorful-field land where it belongs:
behind every glass demo, for free, on every page.

---

## 2 — THE PROPORTION SYSTEM (Aristotelian golden — §L6, measured not magic)

The brief's φ asks ("cards as wide as the hero title; the main stage φ² of the body") become THREE
derived tokens, all off ONE article width — no round px:

```css
:root {
  /* the article is the φ-anchor; the title spans it; everything derives from it */
  --story-article-w: min(96vw, 1392px);          /* was 1152 — widen toward the viewport (the BIGGER ask) */
  --story-prose-measure: calc(var(--story-article-w) / 1.618);   /* φ⁻¹ — the long-form measure column */
  --story-stage-w: var(--story-article-w);        /* the stage = the article = φ² of the prose measure */
  /* φ² check: stage / prose = article / (article/φ) = φ ... ×? — see note */
}
```

**The φ ladder, stated precisely:**
- The **header `<h1>`** spans `--story-article-w` (the brief's "cards as wide as the hero title" → the
  article IS the title width; cards inherit it).
- The **prose/caption column** inside any sub-card is bound to `--story-prose-measure` (`φ⁻¹` of the
  article ≈ 860px) — long-form stays at the golden measure, never a 1392px line.
- The **`<DemoStage>` protagonist** spans the full `--story-stage-w` (the article), so stage : prose =
  `1392 : 860 = 1.618 = φ`; and stage AREA : prose-block AREA lands at φ² when the stage's height is
  also φ-keyed (`--story-stage-h: calc(var(--story-stage-w) / 1.618)` — a golden-rectangle stage). The
  brief's "φ² of the body" reads as the stage's golden-rectangle AREA dominating the body rhythm — the
  stage is the unmistakable protagonist, not a peer block.
- **Card radius** is concentric (§L6 `BD.W-CONCENTRIC-RADIUS`): a glass cell inside a `<DemoMatrix>`
  reads `calc(var(--radius-card) − var(--story-matrix-gap))` so the inner corners stay parallel.
- **The gap rhythm** is the shipped `--story-page-section-gap` (axis-3, already tokenized) — the stack
  gap stays the measured rhythm; the stage simply occupies more of it.

This kills the 288px dead margin (the article widens to `min(96vw, 1392px)`) AND makes the stage the
protagonist (it spans the full widened article; the prose recedes to the golden measure). **The
"bigger card" is geometry, not a hack.**

---

## 3 — THE CONFORMITY KERNEL: `<DemoCard>` (the one shared glass-card host every sub-type wraps)

```vue
<!-- demo/stories/_chassis/DemoCard.vue — the conformity kernel. Every sub-type wraps THIS.
     A page CANNOT render a flat opaque section off the allowlist: it composes a DemoCard
     (glass register · field-host · entrance · caption) and only fills the free body slot. -->
<script setup lang="ts">
import { ShowcaseFrame } from "..";          // tier="field" — the plate-drop host (SHIPPED)
import { Card } from "../../../src/components/ui/card";   // the glass register (SHIPPED)
interface Props {
  heading?: string;          // → <StorySection heading> semantic <h2> (the named-section rung)
  label?: string;            // → the mono-caption eyebrow
  caption?: string;          // → the ShowcaseFrame footer band (mono-caption register)
  tier?: "quiet" | "wash";   // the glass rung over the field (default quiet — reads the field through)
  stage?: boolean;           // the φ²-dominant geometry flag (DemoStage sets it)
}
</script>
<template>
  <!-- the .scroll-cascade child + the liquid-entrance squish ride here, ONCE, for every sub-type -->
  <section
    class="demo-card scroll-cascade demo-card--enter"
    :class="stage && 'demo-card--stage'"
    :style="{ '--glass-backdrop': 'light' }"        <!-- W55 AA bucket over the live field -->
  >
    <StorySection v-if="heading || label" :heading="heading" :label="label" />
    <!-- the glass card transmits the page .paper-field (tier=field drops the opaque plate;
         Card tier=quiet is the translucent register — the lens has the warm field to bend) -->
    <ShowcaseFrame tier="field" :caption="caption" class="demo-card-frame">
      <Card :tier="tier ?? 'quiet'" class="demo-card-surface">
        <slot />
      </Card>
    </ShowcaseFrame>
  </section>
</template>
```

The kernel bakes ALL five conformity invariants:
1. **glassy** — `<Card tier="quiet">` over `<ShowcaseFrame tier="field">` = a translucent glass plate
   that transmits the page `.paper-field` (NOT a flat `bg-card` box). The brief's "each sub-section in
   its own GLASSY CARD."
2. **colorful field behind glass** — the page mounts `.paper-field` once (§4); EVERY `<DemoCard>` floats
   over it, so the §3 colorful field reads behind every glass demo for free.
3. **one title** — the kernel renders NO descriptor; only the chassis `<StoryHeader>` above does (the
   W-PAGE-CHASSIS arm-2 fold). The in-card eyebrow dup is structurally impossible.
4. **alive entrance** — `.scroll-cascade` child + the liquid-entrance squish ride on the kernel, once.
5. **named sections** — `<StorySection heading>` → semantic `<h2>` (the W-PAGE-CHASSIS arm-3 rung).

A page composes sub-types; it never hand-rolls `rounded-card border bg-card`. The conformity gate
(§7) asserts EXACTLY this: no off-allowlist bespoke scaffold.

---

## 4 — THE COLORFUL FIELD (the §3 keystone — this is where `.paper-field` LANDS on the demo side)

This item is the BUILD-DAG host for `.paper-field`. The page-background GOLDEN
(`docs/tranches/BD/greenfield/page-background/GOLDEN.md`) mints the primitive
(`@utility paper-field` + `--field-h ∈ [25,95]` + `field-script.ts`); THIS chassis MOUNTS it
universally + per-route, so every glass demo composites it.

**The mount (ONE writer, every route — the KISS/DRY single-writer seam):**

- `StoryPage` reads the route's category and writes `--field-h` inline on the article root from
  `warmFieldHue(categoryHue(id))` (the page-background `FIELD_SCRIPT` adapter — forms terracotta h48,
  display amber-gold h58, substrates amber h62, etc.). ONE inline var, ONE writer.
- The `.paper-field` is the existing `<PaperBackdrop>` element at `AppShell.vue:251`, warmed (the
  page-background GOLDEN's mount move) — NOT a second fixed plane. The chassis just routes the hue.
- **Two renderers of ONE color-script (the page-background reconcile):** the CSS mesh is the universal
  GROUND (rung 0, every route, 0-JS, compositor-only — so even a content page like `/display/buttons`
  reads warm); a showcase/hero `<DemoStage>` mounts ONE `<Aurora field>` OVER the mesh (rung 1, the
  one-GL-per-route ceiling, reading the SAME `--field-h`). The CSS field guarantees the floor; the
  GL amplifies on the protagonist surfaces.
- **The amplifier selector** is the shipped `CATEGORY_DEFAULT_BG` (`manifest.ts:181`) — it now chooses
  "amplified (GL over mesh) vs plain (mesh only)", never "live vs dead" (the mesh is universal; no route
  is ever flat again).

The §3 floor (mean OKLab C ≥ 0.045 warm behind the glass, H ∈ [25,95], zero teal) is the
page-background GOLDEN's painted-pixel gate; THIS item's gate (§7) asserts the FIELD-IS-MOUNTED +
TRANSMITTED-PER-SUB-TYPE half: every `<DemoCard>` on every enrolled page has a `.paper-field` ancestor
at `z` below it, and the glass composites a perceptible warm delta vs a flat plate.

**No fork.** This item does NOT re-mint the field; it DEPENDS on the page-background `.paper-field` +
`field-script.ts` (the build-DAG order: page-background lands the primitive, this lands the universal
per-route mount + the sub-type transmit). The dup-kill: the in-card eyebrow's `--section-color-N`
borderLeft rail (W-PAGE-CHASSIS) and the field hue both derive from ONE `categoryHue` — one color
identity per route, two consumers (the IconChip POP + the field), never two registries.

---

## 5 — MOTION: the alive entrance + the liquid-weight sub-card build (§L4, cartoon flow & punch)

The page BUILDS in reading order, the sub-cards arrive with WEIGHT — the brief's "alive entrance"
+ the LIQUID-WEIGHT UNIVERSAL law. Reuse the shipped registers; add ONE sub-card stagger.

- **Page assembly (shipped, kept):** `.scroll-build` (the header rises beat-0) → `.scroll-cascade`
  (each sub-card builds on its own `view()` timeline, the implicit stagger — NO setTimeout). Already
  wired on `StoryPage`/`StoryHero`; the inversion keeps it (the cascade now staggers the free glass
  cards instead of the flat sections — same register, richer payload).
- **The sub-card liquid-entrance (the elevated gap):** each `<DemoCard>` arrives on
  `W-LIQUID-ENTRANCE-GENERAL` — a coupled `transform: translateY + scale` squish-settle on the
  `--ease-cartoon-punch` curve (anticipation dip → arc → ~4% overshoot → settle), `--motion-weight`
  ≈ 1/φ (the rest cartoon scalar). The card has WEIGHT: it pulls back, swings in on an arc, overshoots,
  settles — never a tight 6px fade. COMPOSITOR-ONLY (transform + opacity, never margin/top — §L7
  paint fence). The header title keeps the GRAVITY settle (no overshoot on the audacious type — §L4
  driver rule: the title is an observer-arrival, not a bounce).
- **The `<DemoStage>` field drift** is the page-background `field-cel-drift` (a 42s compositor
  transform on the `.paper-field::before`, anticipation→arc→follow-through) — the warm ground breathes
  with liquid weight, the whole page feels alive.
- **PRM** → `--motion-weight: 0` (the §L5 cascade zeroes squish/overshoot/anticipation/stagger in one
  assignment); the page paints its static terminal state, the field stays warm but stops drifting. The
  entrance is an enhancement, never a dependency.

---

## 6 — CROSS-ENGINE (Chrome AND Safari — §L7 hard gate, the lens-b mandate)

The whole chassis is **compositor-only CSS + the shipped viz fences** — no new Safari-fragile path:

- **The field path is pure compositor CSS** (the page-background GOLDEN's WebKit-clean mechanism):
  `radial-gradient` + `conic-gradient` + `oklch()` stops (Safari ≥15.4) + a `transform` drift on a
  `::before`. **NO `backdrop-filter: url`, NO SVG goo, NO trig in the field path.** Identical Chrome↔
  Safari. The `@supports not (color: oklch(…))` arm falls to an sRGB warm-hsl triad.
- **The glass register** is the shipped `<Card tier>` over `<ShowcaseFrame tier="field">` — the
  library's six-layer composite already carries its `@supports (backdrop-filter)` + PRM fallbacks
  (byte-untouched; live-confirmed correct). The glass samples the field's COMPOSITED output (a normal
  painted layer), never another filter — the §L1 "glass cannot sample glass" rule holds by construction
  (the field is a fixed `-z-1` sibling BEHIND all glass).
- **The `<DemoStage>` GL amplifier** inherits Aurora's shipped WebKit fences (`renderMode="auto"` →
  CSS-gradient placeholder on low-power/PRM/Safari-fragile; offscreen-paused via `useIntersectionPause`
  + `content-visibility`). One GL per route (the budget); a content-page mesh is 0-GL.
- **MEATBALLING stays where it belongs** — the dock-fission / goo-blob metaball is the dock/viz band's
  static-SVG sRGB `filter:url()`; the PAGE chassis carries ZERO goo. The field never carries a
  `backdrop-filter:url`. The page-build motion is transform/opacity only (the paint-cost fence).
- **The grid `linear()` / `view()` timeline** entrance has a `@supports (animation-timeline: view())`
  arm with a plain on-mount-keyframe fallback (shipped in `scroll-choreography.css`).
- **Acceptance = paired-engine π** (Chromium + WebKit captures of the composited page behind a real
  glass demo) — never a single-engine green. The page-background spike must clear the §3 floor in
  Safari before build-close.

---

## 7 — A11Y / PRM CARVE (§L5)

- **`prefers-reduced-motion`** → `--motion-weight: 0`: the sub-card squish/overshoot/anticipation/
  stagger zero in one assignment; the field drift freezes (warm stays). The page paints its static
  terminal state — the entrance is enhancement, the layout is the dependency.
- **`prefers-reduced-transparency`** → the page-background `--field-intensity: 0` drops the warm stops
  to the decoupled `--neutral-0` solid floor; the `<DemoCard>` glass falls to its opaque tier (the
  library's shipped reduced-transparency arm). Conformity (the card structure, the heading, the
  caption) survives; only the transmission drops.
- **`prefers-contrast: more`** → prose AA holds via the `--glass-backdrop: light` bucket the kernel
  sets on every card (`StoryHero.vue:379` precedent); the field's mean opacity sits below the
  loud-protagonist ceiling so dense bands (forms/feedback) read calm-legible over the warm ground.
- **Semantics** — ONE `<h1>` (chassis), `<h2>` per named section (`StorySection heading`), the field
  is `aria-hidden`, the IconChip POP is decorative; the sub-type taxonomy adds no new landmark, just
  ordered `<section>`s. Keyboard/focus is the live components' own (the chassis hosts, never traps).
- **Proportion has NO a11y bracket** (§L6) — the φ geometry holds identically across all a11y states.

---

## 8 — DEFT INTEGRATION (the union — reuse, no fork, no legacy)

| concern | reuse (the union) | NOT a new… |
|---|---|---|
| the page chassis | `StoryPage`/`StoryHero`/`StoryHeader`/`StorySection` (shipped) — INVERT the box model (field-ground + free cards), keep the header cluster + entrance registers | parallel page system |
| the conformity kernel | `<DemoCard>` = `<ShowcaseFrame tier="field">` (shipped plate-drop) + `<Card tier="quiet">` (shipped glass register) + `.scroll-cascade` (shipped entrance) | a new glass primitive |
| the colorful field | `.paper-field` + `--field-h` + `field-script.ts` (page-background GOLDEN — DEPEND, mount universally + per-route here) | a second field engine |
| the GL amplifier | `<Aurora field>` + `heroAuroraConfig` reading `--field-h`; `CATEGORY_DEFAULT_BG` the amplifier selector | a parallel viz |
| the φ proportion | THREE derived tokens off `--story-article-w` (widen the shipped `--story-page-max-inline`) | magic px |
| the sub-card entrance | `.scroll-cascade` + `--ease-cartoon-punch` + `--motion-weight` (shipped registers) | a new keyframe |
| the named-section rung | `<StorySection heading>` → `<h2 class="text-subheading">` (shipped, AZ.W-HIERARCHY) | a new heading size |
| the descriptor (one title) | the chassis `<StoryHeader>` cluster + the W-PAGE-CHASSIS in-card-dup fold | a per-page masthead |
| offscreen-pause / PRM | `useIntersectionPause` + `content-visibility` (inherited by `<Aurora field>`) | a new perf seam |

**The net-new artefacts are exactly SIX:** the five thin sub-type wrappers (`DemoStage`/`DemoSpecimen`/
`DemoInteraction`/`DemoMatrix`/`DemoComposition`, each ~20 lines over `<DemoCard>`) + the `<DemoCard>`
kernel itself + the THREE φ tokens (an augment, not a file). Everything else is a re-point of a shipped
seam. The library glass material + `.paper-field` + the entrance registers stay BYTE-UNTOUCHED.

**The dup-kill (the reconcile, no dup wave):** `W-STORY-PAGE-STANDARD` (the spine) + `BD.W-PAGE-CHASSIS`
(the header-rule + dup-header fold + section re-key) + `BD.W-PAGE-BACKGROUND` (the per-category field
map) collapse onto ONE build: the inverted chassis hosts the field (background) + the dup-fold + named
sections (chassis) + the sub-type taxonomy (spine). They are NOT three separate edits to the same
chassis — they are ONE inversion that subsumes all three: the field-ground mount IS the background fix,
the `<DemoCard>` kernel's single-descriptor IS the dup-header fold, the `<StorySection heading>` rung IS
the section re-key. The DELTA-ASSAY amendment: fold `BD.W-PAGE-CHASSIS` + `BD.W-PAGE-BACKGROUND` INTO
`W-STORY-PAGE-STANDARD` as its arm-2/arm-3 (the header) + arm-4 (the field), so the 116-wave set carries
ONE chassis wave with four arms, not three overlapping waves racing the same four files.

---

## 9 — THE BORN-RED GATE: `proof:story-page-standard` + `tests-visual/story-page-standard.spec.ts`

Born-RED on HEAD by construction (288px dead margin, 0 fields, one-big-card, dup eyebrow, 0 sub-types).

**Source-structure arm (`scripts/proof-story-page-standard.mjs`, computed-from-disk page set):**
- **S1 — every page composes `<StoryPage>` + ≥1 sub-type; NO off-allowlist bespoke
  `rounded-card border bg-card` scaffold.** Born-RED: pages hand-roll `<ShowcaseFrame>`/`<StorySection>`
  arrangements directly.
- **S2 — the φ tokens resolve.** `--story-article-w` / `--story-prose-measure` / `--story-stage-w`
  resolve a non-empty `min()`/`calc()` value; `--story-prose-measure` = `--story-article-w / 1.618`.
  Born-RED: only the flat `--story-page-max-inline: 1152px`.
- **S3 — ONE descriptor cluster per page** (the W-PAGE-CHASSIS arm-2 fold) — no hand-rolled in-card
  `<header>` + `IconChip`. Born-RED: 36 dup-header pages.

**Binding π (`story-page-standard.spec.ts`, painted-pixel, paired-engine, both modes):**
- **P1 — the stage is φ²-dominant.** On a `<DemoStage>` page the stage card width ≥ φ · the prose
  column; the article ≥ `min(96vw, 1392px)` (the dead margin < 60px). Born-RED: 1152 / 288px dead.
- **P2 — glassy sub-cards over a live field.** Each `<DemoCard>` is translucent (composited differs
  from a flat plate) AND has a `.paper-field` ancestor at `z` below it; the field samples mean OKLab
  C ≥ 0.045 warm (H ∈ [25,95]) behind the glass (the page-background §3 floor). Born-RED: 0 fields,
  flat opaque cards.
- **P3 — ONE title, named sections.** EXACTLY one `<h1>`; ≥1 `<h2.text-subheading>` per multi-section
  page; no second descriptor cluster. Born-RED: dup in-card eyebrow.
- **P4 — alive entrance (frame-series).** A multi-frame capture shows the sub-cards build with a
  squish-settle delta (transform progression); under PRM the page is one static terminal frame.
- **P5 — conformity WITH variation.** ≥4 sampled pages across categories share the kernel (glassy ·
  field · one-title · entrance) WHILE their body content differs (the sub-type is a frame, the content
  free) — a sampled structural-fingerprint match on the chrome, a divergence on the body.
- **P6 — both modes warm.** Dark-mode field C ≥ 0.045, NOT gray; the glass cards read luminous, never
  charcoal. **Paired-engine** (Chromium + WebKit) — the field/glass clear the floor per engine.

**Self-test (≥6 bites):** (1) widen a page to a flat `bg-card` section off-allowlist → S1 RED; (2) pin
the article to 1152 → P1 RED; (3) strip the `.paper-field` mount → P2 RED; (4) re-add an in-card
eyebrow → P3/S3 RED; (5) a teal field hue (h210) → P2 RED; (6) make every sampled page byte-identical
(mechanical banality) → P5 RED (no natural variation). Each MUST flag; the fixed tree MUST be clean.

**No source-green close** — the painted, paired-engine π is the binding truth.

---

## 10 — GESTALT — THE BAR (live-judge AS A USER, both modes, both engines, fresh paint)

Open `/display/buttons` + `/forms/select` + `/substrates/aurora` + a containers page, BOTH modes,
BOTH engines. PASS iff:

1. **The main stage is BIGGER** — the protagonist `<DemoStage>` spans the widened article (no 288px
   dead margin), the prose recedes to the golden measure; the stage is the unmistakable φ-protagonist.
   Today: NO (1152 cap, stage = a peer block).
2. **A VIVID warm colorful field is behind EVERY glass demo** — the select pills bend warm field-mass,
   the buttons refract the technicolor ground; not flat cream-on-cream. Today: NO (C 0.0029, 0 fields).
3. **Each sub-section is its OWN glassy card** — translucent glass plates on the shared register over
   the field, not flat opaque `bg-card` boxes. Today: NO (one big card, flat sections).
4. **ONE title** — one audacious `<h1>` + the IconChip POP, no duplicated in-card eyebrow. Today:
   AMBER (dup in-card descriptor).
5. **The page is ALIVE** — it builds in reading order; the glass sub-cards arrive with liquid weight
   (anticipation→arc→overshoot→settle), the field drifts with inertia. Today: partial (entrance wired,
   no sub-card squish).
6. **Conformity WITH natural variation** — every page reads as ONE family (glassy · field · one-title ·
   entrance) yet each demo's content is free; NOT surgical banality, NOT ad-hoc chaos. Today: NO
   (ad-hoc per-page).
7. **The page DEFTLY composes glass-ui components** — docks/viz/cards/tabs/buttons as the demo hosts,
   not bespoke scaffold. Today: partial.
8. **Both modes warm-luminous; text AA holds; cross-engine identical.** Today: flat both modes.

The reference is the SHIPPED `/substrates/aurora` hero (full-bleed live field + audacious title) — the
content pages finally inherit its language, contained and per-sub-type. The §3 colorful-field half of
the iOS-27 bar lands HERE on the demo side, behind every glass demo, by construction.
