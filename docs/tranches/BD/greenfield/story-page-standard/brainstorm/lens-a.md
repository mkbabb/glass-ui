# STORY-PAGE-STANDARD — lens-a: the WARM-CEL STAGE chassis (one chassis · five sub-type frames · the field is the floor)

> GREENFIELD-BRAINSTORM, PURE iOS-27 FIDELITY. The standardized storybook page +
> the demo SUB-TYPE taxonomy (`DemoStage` / `DemoSpecimen` / `DemoInteraction` /
> `DemoMatrix` / `DemoComposition`), redesigned from first principles. A UNION with
> the shipped `StoryPage`/`StoryHero`/`ShowcaseFrame` chassis + the page-background
> `.paper-field` primitive + the shared glass register. No re-fork, no parallel chassis.
> **Tranche-dev only. KISS/DRY. No legacy.**
>
> **Live-interrogated** (Chrome, both modes): `/display/buttons`, `/substrates/aurora`,
> `/forms/select`. The numbers below are the live getComputedStyle/DOM readback, not assertions.

---

## 0 — THE BORN-RED TRUTH (live-measured on `localhost:5173`, both modes)

| route | finding | verdict |
|---|---|---|
| `/display/buttons` light | `--field-h` **(unset)**, `.paper-field` count **0**, glass count **52**, body bg `rgba(0,0,0,0)` | gray-glass over flat cream — **§3 field ABSENT** |
| `/display/buttons` | `--story-header-rule` **(unset)**, `article > header` `border-bottom: 0px` | no header→body seam (W-PAGE-CHASSIS arm-1 unbuilt) |
| `/display/buttons` | article width **1152px** on **1440px** viewport | ~288px dead margin — the stage is SMALLER, not the φ²-bigger the user asked for |
| `/display/buttons` | two stacked headers ("Buttons" `<h1>` + an in-card "Launch the sequence" cluster) | the descriptor reads ~2× (the double-header defect) |
| `/forms/select` dark | `.paper-field` **0**; first `.glass-*` el `backgroundColor: rgba(0,0,0,0)`, `backdropFilter: none` | the glass is transparent over a near-black flat page — **gray-glass-over-nothing**, the user's #1 complaint |
| `/substrates/aurora` | full-bleed live aurora, audacious `<h1>`, `.paper-field` 0 (aurora is its OWN GL field) | the hero shape WORKS — but it is a per-page bespoke read, NOT the universal chassis |
| **no `demo/stories/_chassis/`** | the `DemoStage`/`Specimen`/`Interaction`/`Matrix`/`Composition` sub-types are **unbuilt** | the taxonomy is named everywhere, authored nowhere |

**The two-storybooks problem (the live gestalt):** substrate hero pages (`/substrates/aurora`)
read ALIVE — a vivid full-bleed field, an audacious title, the glass over a live ground.
Component pages (`/display/buttons`, `/forms/select`) read DEAD — a single flat tan/charcoal
card, gray glass over nothing, dead side-margins, a spec-sheet stack of same-weight sections.
The user wants EVERY page to read like the aurora hero: a colorful field behind the glass, a
big protagonist stage, glassy sub-cards, one title, an alive entrance — **conformity, with
natural variation**. The disease is that the chassis exists but is half-applied: `StoryHero`
hosts a live field ONLY on substrate-hero routes; every other route gets the flat card.

**Source-verified deps (grep):** `.paper-field` / `--field-h` / `warmFieldHue` / `--glass-key`
/ `--ease-cartoon-punch` = **0 mounts** (they LAND in `BD.W-PAGE-BACKGROUND`, the hard upstream
dep — this wave CONSUMES them, does not re-mint). `PaperBackdrop` @ `AppShell.vue:251` (the
universal mount). `categoryHue(id)` @ `category-hero.ts:159` + `CATEGORY_DEFAULT_BG` @
`manifest.ts:181` (the per-route hue/amplifier source). `VizStudio.vue` (the proven
`StoryPage`+`Configurator`-right+rounded-stage shape — the `DemoStage` reference). `scroll-build`
/ `scroll-cascade` entrance registers (story-hero.css). `ShowcaseFrame` `tier="field"` (the
plate-less glass-demo host, BG-2). All present except the field tokens (the stated dep).

---

## 1 — THE GOLDEN IDEA: ONE chassis, the field is the floor, five sub-types are FRAMES not forks

The standardized page is **not** a new component — it is the shipped `<StoryPage>` chassis,
completed so its three half-built guarantees become universal, with the demo sub-types as
**thin declarative frames** (`demo/stories/_chassis/`) that BAKE the conformity invariants so a
page physically *cannot* render a flat opaque box, a dead field, a double-header, or a tiny stage.

Four moves, each a UNION with a shipped seam:

1. **The field is the floor (consume `BD.W-PAGE-BACKGROUND`).** The chassis writes ONE
   `--field-h` per route (from `warmFieldHue(categoryHue(category))`) onto the `PaperBackdrop`
   it already mounts at `AppShell.vue:251`. Every route — component OR substrate — inherits its
   OWN vivid warm `.paper-field` for free. The glass demos finally have a colorful field to
   refract. This is the systemic gray-glass fix; this wave is where the field LANDS as the
   demo-side host (it does not re-mint the primitive — it mounts it universally + sets the hue).

2. **The sub-type is a FRAME that bakes the invariants (the conformity engine).** Five thin SFCs
   in `demo/stories/_chassis/`, each a `<StoryPage>`-composing shell that bakes: a glassy card
   on the shared register (NOT a flat `bg-card` box), the entrance, the caption band, the φ
   proportion. The CONTENT slot is FREE — natural variation lives in the slot, conformity lives
   in the frame. A page CANNOT bypass the glass register because it never authors the box.

3. **The φ² STAGE escapes the measure-bound article (the BIGGER card).** The prose column stays
   measure-bound (`--story-page-max-inline`, the golden read width); the protagonist STAGE
   breaks out to near-viewport via a `--stage-bleed` escape so the main demo is φ² of the body
   rung (§L6: "hero stages target φ² of the body rung"). The 1152-cap on a 1440 viewport — the
   ~288px dead margin — is killed FOR THE STAGE ONLY (the prose stays readable, the stage goes big).

4. **One title, alive entrance (consume W-PAGE-CHASSIS + the entrance registers).** The chassis
   already renders ONE descriptor cluster + suppresses the duplicate; this wave folds the sub-type
   frames onto that ONE cluster (no sub-type re-renders the title) and rides the shipped
   `.scroll-build`/`.scroll-cascade` so each glassy sub-card BUILDS in on the liquid-entrance
   stagger (squish-grow + fade + settle — T10).

### The single boldest move

**Make the demo SUB-TYPE a `mode` of ONE chassis component, not five components — and make the
glassy card + the field + the φ² stage NON-OPTIONAL by construction, so a storybook page is
PHYSICALLY INCAPABLE of rendering a flat opaque box over a dead field.** Instead of five parallel
SFCs that each re-author the glass card, ship ONE `<DemoFrame variant="stage|specimen|interaction|matrix|composition">`
that owns the glass register + the entrance + the caption band + the proportion ONCE, and
switches only its INTERNAL LAYOUT per variant (stage = φ²-bleed canvas + right rail; specimen =
state-matrix grid; matrix = variant grid; etc.). The five "sub-types" the user named are
**layout presets of one frame**, exactly like `VizStudio` is a `DemoFrame variant="stage"`
instance. This is the maximal KISS/DRY read of "conformity with natural variation": ONE writer
owns conformity (the glass card, the field-aware tier, the entrance, the φ proportion); the
variant owns only the internal arrangement; the slot owns the free content. The user cannot get
a flat box because there is no code path that renders one — `bg-card` opaque slabs are
DEFINITION-ABSENT from the chassis.

---

## 2 — THE MECHANISM (the union — reuse, no fork)

### 2a — `<DemoFrame>` : the ONE sub-type chassis (`demo/stories/_chassis/DemoFrame.vue`)

A thin SFC composed INSIDE a `<StoryPage>` body (or hosting it). It owns the conformity register
ONCE; the `variant` switches the internal layout; the slots are free.

```vue
<!-- demo/stories/_chassis/DemoFrame.vue — the ONE demo sub-type chassis -->
<script setup lang="ts">
import { Card } from "../../../src/components/ui/card";        // the shared glass register
import StorySection from "../StorySection.vue";
type DemoVariant = "stage" | "specimen" | "interaction" | "matrix" | "composition";
const props = withDefaults(defineProps<{
  variant?: DemoVariant;
  heading?: string;           // the in-body section <h2> (the page <h1> is the chassis's — ONE title)
  label?: string;             // the mono eyebrow caption
  blurb?: string;
  caption?: string;           // the mono footer band
  /** stage variant: the φ² protagonist breaks out of the measure column */
  bleed?: boolean;            // default true on `stage`, false elsewhere
}>(), { variant: "specimen", bleed: undefined });
// the glass TIER is field-aware: every variant reads `wash`/`quiet` (transmissive) over the
// universal `.paper-field` — NEVER a flat opaque `bg-card` slab (the BG-2/§L1 fix).
const tier = computed(() => props.variant === "stage" ? "quiet" : "wash");
const doBleed = computed(() => props.bleed ?? props.variant === "stage");
</script>

<template>
  <StorySection :heading="heading" :label="label" :blurb="blurb"
                class="demo-frame scroll-cascade" :data-variant="variant"
                :data-bleed="doBleed ? '' : null">
    <!-- the glassy sub-card on the shared register, field-aware tier, the liquid entrance.
         the §3 field reads THROUGH it (the page-background .paper-field is the -z-1 floor). -->
    <Card :tier="tier"
          :style="{ '--glass-backdrop': 'light' }"
          class="demo-frame-card glass-card-enter paper-grain-overlay rounded-card">
      <!-- per-variant internal layout — the ONLY thing variant switches -->
      <slot />              <!-- free content: the configurator, the state matrix, the grid -->
    </Card>
    <!-- the captioned-frame band (reuse ShowcaseFrame's --showcase-caption-gap rhythm) -->
    <p v-if="caption || $slots.caption" class="demo-frame-caption fira-code">
      <slot name="caption">{{ caption }}</slot>
    </p>
  </StorySection>
</template>
```

The five "sub-types" the brief names are thin convenience wrappers OR straight
`<DemoFrame variant="…">` usages — a page reaches for the variant that fits, the content is free:

| sub-type | `variant` | internal layout (the only thing that differs) | for |
|---|---|---|---|
| **`DemoStage`** | `stage` | φ²-bleed canvas/hero LEFT (`flex-1`) + a slim `<Configurator asideSide="right">` rail (the VizStudio shape, GENERALIZED) | substrates · dock overview/morph |
| **`DemoSpecimen`** | `specimen` | a state row (rest/hover/active/disabled) in one glassy plate + caption | display · forms · feedback |
| **`DemoInteraction`** | `interaction` | the live control + a readout that drives the real API | dock sections/cta · containers |
| **`DemoMatrix`** | `matrix` | a `grid` of glassy cells, one per variant/size | buttons/badges · data |
| **`DemoComposition`** | `composition` | a glassy stage composing a SERIES of glass-ui components (the "deftly composes" bar) | compositions · navigation |

`VizStudio` is RE-EXPRESSED as `DemoStage` (a `DemoFrame variant="stage"` preset) — NOT a parallel
chassis. The grep-confirmed `VizStudio` = `StoryPage` + `Configurator`-right + rounded-stage IS
exactly `DemoStage`; the wave folds it onto the shared frame (one chassis, no second).

### 2b — the universal field mount (consume `BD.W-PAGE-BACKGROUND`, the demo-side host)

This wave is where the field LANDS as the demo-side host. The chassis writes ONE `--field-h` per
route onto the already-mounted `PaperBackdrop`:

```ts
// demo/stories/field-script.ts (the BD.W-PAGE-BACKGROUND registry — CONSUMED here)
import { categoryHue } from "./category-hero";
// adapt the EXISTING cool categoryHue → the warm-clamped field hue ∈ [25,95]
export const warmFieldHue = (h: number): number => 25 + ((h % 360) / 360) * 70; // → [25,95], warm by construction
```

```vue
<!-- AppShell.vue:251 — grow ONE prop on the SAME fixed element (no second plane) -->
<PaperBackdrop field :palette="warmFieldHue(categoryHue(currentCategory))"
               class="fixed inset-0 -z-10 bg-background" />
```

ONE writer → all 118 routes inherit a vivid warm field. The glass `Card` tier (`wash`/`quiet`)
samples the COMPOSITED field output (a normal painted `-z-1` layer) — the §L1 "glass cannot
sample glass" rule holds, the transmit-delta becomes perceptible (the user's gray-glass complaint
DIES). On a `DemoStage` substrate route the `<Aurora field>` is the opt-in rung-1 amplifier OVER
the mesh (the one-GL budget); the mesh is the universal floor so NO route is ever flat.

### 2c — the φ² STAGE escape (the BIGGER card · §L6)

The prose column stays measure-bound; the `stage`-variant frame breaks out so the protagonist
demo is φ² of the body rung — the BIGGER stage the user demanded, killing the 288px dead margin
FOR THE STAGE:

```css
/* demo/stories/_chassis/demo-frame.css */
.demo-frame[data-variant="stage"][data-bleed] .demo-frame-card {
  /* break out of the --story-page-max-inline measure column to a φ²-dominant stage.
     the prose sections stay bound; only the protagonist stage goes near-viewport. */
  inline-size: min(
    calc(var(--story-page-max-inline) * 1.618 * 1.618 / 1.618),  /* φ² of the body rung */
    calc(100vw - 2 * var(--stage-gutter, 2rem))                  /* viewport-bound safety */
  );
  margin-inline: calc(50% - 50cqw);   /* center-bleed past the measure column */
  min-block-size: 62vh;               /* the stage is the protagonist (≈1/φ of viewport-ish, big) */
  aspect-ratio: 1.618;                /* golden stage box where content allows */
}
```

The stage carries the live demo + a slim configurator rail (the cockpit ratio `1/φ²` per the
`InstrumentRail` precedent, design.md:1749) so the controls sit RIGHT on desktop, stacking below
on mobile — the shipped `Configurator asideSide="right"` does this; the frame reuses it.

### 2d — ONE title + the liquid entrance (consume W-PAGE-CHASSIS + the registers)

- **ONE descriptor cluster.** The chassis `StoryHeader` renders the eyebrow → display `<h1>` →
  blurb ONCE (W-PAGE-CHASSIS arm-2 folds the 36 duplicate in-card headers; the header rule arm-1
  paints the `--story-header-rule` seam). `<DemoFrame>` renders only `<StorySection heading>`
  (a `<h2>`) — NEVER a second `<h1>`. The "title ~3×" defect dies by construction.
- **The alive entrance (T10 · liquid-weight universal).** Each `<DemoFrame>` is a `.scroll-cascade`
  child → it BUILDS in on its own view-timeline with the squish-grow (≈0.88 vol-preserving) + fade
  + settle. The glassy card rides `.glass-card-enter`: a squash-&-stretch arrival on
  `--ease-cartoon-punch` (anticipation dip → overshoot → settle), morphing MORE on entry (the
  liquid-weight law). PRM → static terminal state (the `@media` floor on every keyframe).

```css
.glass-card-enter {
  animation: demo-card-rise 0.62s var(--ease-cartoon-punch, cubic-bezier(.5,-0.2,.4,1.2)) both;
}
@keyframes demo-card-rise {           /* squish-grow + rise — liquid weight, not a tight spring */
  from { opacity: 0; transform: translateY(14px) scale(0.94, 1.04); }  /* anticipation squish */
  60%  { transform: translateY(-3px) scale(1.01, 0.99); }              /* overshoot stretch */
  to   { opacity: 1; transform: none; }                                /* settle */
}
@media (prefers-reduced-motion: reduce) { .glass-card-enter { animation: none; } }
```

---

## 3 — DEFT INTEGRATION (the union — reuse, no fork, no legacy)

| concern | reuse (the union) | NOT a new… |
|---|---|---|
| the page chassis | `<StoryPage>`/`<StoryHero>`/`<StoryHeader>`/`<StorySection>` — completed, not re-forked | second page component |
| the glass register | `<Card tier="wash"/"quiet">` (the shipped library tier) — the sub-card surface | new glass plate |
| the colorful field | `.paper-field` + `--field-h` + `PaperBackdrop` (CONSUME `BD.W-PAGE-BACKGROUND`) — mounted universally here | second field engine |
| the per-route hue | `warmFieldHue(categoryHue(id))` — adapt the EXISTING cool `categoryHue`, one number | bespoke per-page palette |
| the stage layout | `<Configurator asideSide="right">` (CONFIG-RIGHT) + the `InstrumentRail` 1/φ² ratio | new layout engine |
| the caption band | `ShowcaseFrame`'s `--showcase-caption-gap` rhythm token | new caption recipe |
| the header rule + ONE title | `--story-header-rule` + the descriptor-fold (CONSUME `W-PAGE-CHASSIS`) | new header primitive |
| the entrance | `.scroll-cascade`/`.scroll-build` + `--ease-cartoon-punch` (CONSUME the registers) | new motion system |
| the φ proportion | the √φ/φ ladder (§L6) — `--story-page-max-inline` × φ² for the stage | a magic px |
| `VizStudio` | RE-EXPRESS as `DemoFrame variant="stage"` (a preset, not a parallel chassis) | second viz chassis |

**Net-new artefacts (exactly THREE):** `demo/stories/_chassis/DemoFrame.vue` (the one sub-type
chassis), `demo/stories/_chassis/demo-frame.css` (the variant layouts + the φ²-stage escape + the
entrance), and the `field`/`palette` prop wiring at `AppShell.vue:251` (CONSUMED from
`BD.W-PAGE-BACKGROUND`). The five "sub-types" are THIN convenience re-exports of `DemoFrame`
(`DemoStage = <DemoFrame variant="stage">`), or straight variant usages. The library is
BYTE-UNTOUCHED — `Card`/`Configurator`/the tier tokens already exist correctly.

**The dup-kill (reconcile the three waves, no dup):** `W-STORY-PAGE-STANDARD` (the spine, the
taxonomy) + `BD.W-PAGE-CHASSIS` (the header rule + ONE-title fold + section re-key) +
`BD.W-PAGE-BACKGROUND` (the field) COLLAPSE onto ONE buildable chassis: `BD.W-PAGE-BACKGROUND`
mounts the field universally (the floor); `BD.W-PAGE-CHASSIS` guarantees ONE title + the header
seam (consumed, not re-authored); `W-STORY-PAGE-STANDARD` ships `<DemoFrame>` (the sub-type frame
that bakes the glassy card + the φ² stage + the entrance over that field). No overlap: the field
wave owns the ground, the chassis wave owns the header, this wave owns the sub-type FRAME.

---

## 4 — CROSS-ENGINE (Chrome AND Safari — §L7)

- **The field is pure compositor CSS** (radial/conic `oklch` gradients + a `transform` drift) —
  inherited from `BD.W-PAGE-BACKGROUND`, WebKit-native, NO `backdrop-filter: url`, NO SVG goo in
  the field path. Identical both engines.
- **The glass `Card`** uses `backdrop-filter: blur()` (plain blur, both engines) over the field's
  COMPOSITED output — never glass-samples-glass (§L1 holds by construction; the field is a `-z-1`
  sibling). The Chromium-only `glass-refract` enhancement is `@supports`-gated with a plain-blur
  WebKit fallback (design.md:182) — the frame inherits this, never an un-gated declaration.
- **The entrance keyframes** are compositor-only (`transform`/`opacity`) — byte-comparable both
  engines; `linear()`/`cubic-bezier` easing is universal.
- **MEATBALLING stays out of the chassis** — the goo (dock-fission/blob) is the demo CONTENT a
  `DemoStage` may host; the FRAME carries zero goo, zero `backdrop-filter:url`.
- **Acceptance = paired-engine π** (Chromium + WebKit) of the composited page behind a real glass
  `DemoFrame` over the real field, both modes — never a source-green close.

---

## 5 — A11Y / PRM CARVE

- **`prefers-reduced-motion`** → `.glass-card-enter` + `.scroll-cascade` snap to terminal state;
  the field drift freezes (warm stays). The page reads ONE static frame: the field, the ONE
  descriptor + rule, the glassy sub-cards, the φ² stage. (§L5.)
- **`prefers-reduced-transparency`** → the field `--field-intensity: 0` drops to the opaque
  `--neutral-0` floor; the glass `Card` falls to its opaque tier (the chassis legibility floor).
  The glassy-card aesthetic is an enhancement, never a legibility dependency.
- **`prefers-contrast: more`** → prose AA holds via the `--glass-backdrop: light` bucket on every
  `DemoFrame` card; the field mean opacity sits below the loud-protagonist ceiling on dense bands
  (forms/feedback) so they read calm-live.
- **Proportion is geometry** (§L6) — no PRM/transparency bracket; the φ² stage + the √φ rhythm
  hold identically across all a11y states.
- **The stage is keyboard-reachable** — the `Configurator` rail is the shipped accessible
  inspector; the bleed is visual, the tab-order stays reading-order.

---

## 6 — THE BORN-RED GATE (the painted-pixel truth)

`tests-visual/story-page-standard.spec.ts` + `proof:story-page-standard` (device-free source arm).
Born-RED on HEAD by construction (0 `_chassis`, 0 field, 1152-cap stage, header rule unset,
double-header). Sample the COMPOSITED page pixel — never a hardcoded inline, never the base token.

| # | assert | born-RED on HEAD | GREEN when |
|---|---|---|---|
| **S1 chassis-adopted** | every `demo/stories/<cat>/*.vue` composes `<StoryPage>` + ≥1 `<DemoFrame variant>`; NO bespoke `rounded-card border bg-card` scaffold off the allowlist | ad-hoc per-page boxes | the migration lands |
| **S2 field-behind-glass (§3)** | every glassy `DemoFrame` has a `.paper-field` ancestor at `z` below it; the field region samples mean OKLab **C ≥ 0.045 warm** (H ∈ [25,95]) | `/buttons`: 0 fields, gray-glass | the universal mount + hue |
| **S3 glassy sub-card** | each `DemoFrame` card is a translucent `wash`/`quiet` tier (NOT opaque `bg-card`); composited transmit-delta over the field **C ≥ 0.018 warm** | flat opaque cards | the field-aware tier |
| **S4 φ²-stage** | a `stage`-variant demo measures ≥ φ² × the prose column AND > the 1152-cap (the bigger card); the prose column stays measure-bound | 1152 on 1440, dead margin | the stage escape |
| **S5 ONE title** | each page renders EXACTLY 1 `<h1>` + the descriptor cluster ONCE (no 2nd in-card header); the `--story-header-rule` seam paints (`border-bottom > 0`) | header rule unset, double-header | consume W-PAGE-CHASSIS |
| **S6 alive entrance** | a frame-series capture shows each `DemoFrame` BUILDS (squish-grow + fade); PRM → one static terminal frame | static chrome | the entrance register |
| **S7 both-mode warm** | the field + glass read warm-luminous in BOTH modes (dark GLOWS, never charcoal-gray) | dark gray-glass over near-black | the warm-dark mesh + tier |
| **S8 anti-evasion** | the gate FAILS on a flat opaque card, a dead field (C 0.003), a teal field (h210), a 1152-capped stage, a double-header; PASSES only on the real composited chassis | — | self-test (≥6 bites) |

**Surfaces:** `/display/buttons`, `/forms/select`, `/substrates/aurora`, a containers + a
feedback page, BOTH modes, BOTH engines. NO source-green close — the painted π is binding.

---

## 7 — DELTA-ASSAY → making the three waves buildable (the amendment)

`W-STORY-PAGE-STANDARD` (the spine) + `BD.W-PAGE-CHASSIS` (the header) + `BD.W-PAGE-BACKGROUND`
(the field) RECONCILE onto ONE buildable chassis, no dup:

| amendment | scope | gate |
|---|---|---|
| **W-DEMO-FRAME** (buildable core) | NEW `demo/stories/_chassis/DemoFrame.vue` + `demo-frame.css` — the ONE sub-type chassis (5 variants), the glassy field-aware card, the φ²-stage escape, the liquid entrance | S1 S3 S4 S6 |
| **W-FIELD-HOST** (the demo-side field mount) | grow `PaperBackdrop field :palette` @ `AppShell.vue:251`; write `--field-h` per route via `warmFieldHue(categoryHue)` — CONSUME `BD.W-PAGE-BACKGROUND`'s `.paper-field` | S2 S7 |
| **W-ONE-TITLE** (consume W-PAGE-CHASSIS) | the `--story-header-rule` seam + the descriptor-fold + the section re-key — `DemoFrame` renders only `<h2>`, never a 2nd `<h1>` | S5 |
| **W-VIZSTUDIO-FOLD** | RE-EXPRESS `VizStudio` as `DemoFrame variant="stage"` — one chassis, retire the parallel | S1 S4 |
| **proof:story-page-standard** | the born-RED painted gate (§6) + the device-free source census + the self-test | all |

**RECONCILE:** the three page waves POINT AT `<DemoFrame>` (the conformity frame) + `.paper-field`
(the field floor) + the shipped `Card`/`Configurator` register. ONE chassis, the field is the
floor, the sub-types are frames. No per-page bespoke, no parallel chassis, no second field engine.

**HELD / FROZEN (the union law):** the library `Card`/`Configurator`/tier tokens (byte-untouched);
`.paper-field`/`--field-h`/`--glass-key` (CONSUMED from `BD.W-PAGE-BACKGROUND`, not re-minted);
`--story-header-rule`/the descriptor-fold (CONSUMED from `BD.W-PAGE-CHASSIS`); `--ease-cartoon-punch`
(DEPENDED, not duplicated); `--story-page-max-inline`/`--story-page-section-gap` (the rhythm tokens,
reused). **No legacy, no alias, no dual path** — `VizStudio` is FOLDED (re-expressed), not kept.

---

## 8 — GESTALT — THE BAR (live-judge AS A USER, both modes, both engines)

Open `/display/buttons` + `/forms/select` + `/substrates/aurora` + a containers page, BOTH modes,
fresh paint. PASS iff:

1. **A vivid warm colorful field is behind EVERY glass demo** — component pages read as alive as
   the aurora hero, not flat tan/charcoal. Today: NO (`/buttons` C 0.003, 0 fields).
2. **Each sub-section is its OWN glassy card** on the shared register, transmitting the field —
   not a flat opaque box. Today: NO (one flat tan card).
3. **The main stage is BIGGER** — φ²-dominant, near-viewport, killing the 288px dead margin. Today:
   NO (1152 on 1440).
4. **ONE title** — one audacious descriptor cluster + the header rule, never the title ~2-3×.
   Today: NO (double-header).
5. **An ALIVE entrance** — the page BUILDS, the glassy cards squish-grow in on the liquid stagger.
   Today: NO (static chrome).
6. **Conformity WITH natural variation** — every page wears the SAME chassis idiom (field · glassy
   cards · ONE title · φ² stage · entrance) while the demo CONTENT varies freely per sub-type —
   not a surgical/mechanical banality, not an ad-hoc per-page layout.
7. **The page DEFTLY composes glass-ui components** — docks, viz, cards, tabs, buttons in the
   stage/composition variants. A UNION with the shipped chassis, never a bolt-on.
8. **Both modes warm-luminous; prose AA holds; KISS/DRY** — ONE chassis, the field is the floor,
   the sub-types are frames; zero fork, zero legacy.
