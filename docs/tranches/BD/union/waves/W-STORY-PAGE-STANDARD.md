# W-STORY-PAGE-STANDARD — the standardized storybook-page chassis + demo sub-type taxonomy (Band 16, the SPINE)

**Surfaced by:** every Pass-E category gestalt (dock + substrates so far; 9/11 substrates pages + all 7 dock pages fold the bulk of their defects here). The single highest-leverage authoring task — named everywhere, authored nowhere at HEAD.

## The defect (uniform across the storybook)
Every page hand-rolls its scaffold → the same failures recur per-page: (a) no glassy sub-cards (flat opaque `bg-card` boxes or `ShowcaseFrame` slabs); (b) the main stage is SMALLER not bigger (1152px cap on 1440 = ~290px dead margin); (c) spec-sheet aesthetic — N same-weight sections, no protagonist; (d) glass floats over a dead/flat field; (e) a giant sticky hero crashes through the stage / double-triple-header; (f) static chrome (no entrance); (g) shouting dev-speak copy. This is the ADDENDUM's KISS/DRY thesis: per-page bespoke is the anti-pattern; ONE chassis is the fix.

## The chassis (mint ONCE; every page composes it — no bespoke scaffold)
`<StoryPage>` already exists (`demo/stories/StoryPage.vue` + `StoryHeader`/`StoryHero`/`StorySection`/`ShowcaseFrame`). This wave STANDARDIZES it + adds the DEMO SUB-TYPE taxonomy each page composes, guaranteeing CONFORMITY (the glassy-cards · header+rule · colorful background · iOS-27/paper/glass language) while the demo CONTENT varies NATURALLY (not surgical banality — the sub-type is a frame, the content is free).

### The conformity invariants (hold on EVERY page — gate-asserted)
1. **ONE header cluster**, reading-order (eyebrow → display `<h1>` → blurb), arriving on the GRAVITY entrance (W-HIERARCHY2), with the dividing RULE below it. No double/triple-header (W-PAGE-CHASSIS fold). The hero scale is the W-HEADER-SCALE rung (~½ the current — it must NOT eat 70vh / crash the stage).
2. **The protagonist stage is φ²-DOMINANT** — the main demo at near-viewport, the BIGGER card the user asked for (kill the 1152 cap on the stage; the prose column may stay measure-bound, the stage is full-bleed).
3. **Each sub-section is its OWN glassy card** — a `glass-quiet`/`glass-floating` plate (NOT a flat opaque box), over the colorful field (the lens has something to refract — §L1).
4. **A colorful background** — the page's lead field (a contained colorful `<Aurora>` for component pages — the FIX-4 `PRESETS.OPENAI_SKY` precedent; OR the viz's OWN loud lead palette for substrate pages — presets-in-consumers).
5. **Alive entrance** — the page BUILDS (`.scroll-build`/`.scroll-cascade` + W-LIQUID-ENTRANCE-GENERAL squish/morph/fade on the glassy sub-cards).
6. **Tight copy** — no dev-speak/jargon/ALL-CAPS shouting (W-PAGE-OFFTOKEN-SWEEP).

### The demo SUB-TYPE taxonomy (refined from the dock + substrates corpus)
| Sub-type | For | Shape | Pages |
|---|---|---|---|
| **`<DemoStage>`** | a full-bleed live viz/procedural OR a hero interactive | the φ²-dominant stage: a big glassy frame hosting the canvas (the substrate now sizes the buffer — FIX 5; the stage owns the box + the colorful field + the caption band) + a slim configurator rail (or a `<DockStack mode="facets">` contextual switch) | substrates (all 11) · dock (overview/morph/rail) |
| **`<DemoSpecimen>`** | ONE component shown multi-state in a glassy card | the glassy plate + a state matrix (rest/hover/active/disabled) + the caption | display · forms · feedback |
| **`<DemoInteraction>`** | a manipulable single component | the glassy card + the live control + a readout; drives the component's real API | dock (sections/cta) · containers |
| **`<DemoMatrix>`** | a variant/size grid | a grid of glassy cells, one per variant | display (buttons/badges) · data |
| **`<DemoComposition>`** | a multi-component scene | a glassy stage composing a SERIES of glass-ui components (the "deftly composes" bar) | compositions · navigation |

Each sub-type is a thin chassis component (`demo/stories/_chassis/`) that bakes the conformity invariants (glassy card · entrance · the caption band) so a page CANNOT bypass them; the CONTENT slot is free (natural variation).

## The gates (real π, Pass-D bar — not presence)
`proof:story-page-standard` (device-free source arm): every `demo/stories/**/*.vue` page composes `<StoryPage>` + ≥1 sub-type (no bespoke `rounded-card border bg-card` scaffold off the allowlist); the header cluster is single (no 2nd `<h1>`/hand-rolled masthead); the conformity classes resolve. + the `<DemoStage>` resize π — a 300×150-stuck canvas REDS (FIX 5 backstop). + the binding π `tests-visual/story-page-standard.spec.ts`: a sampled page set resolves glassy sub-cards (translucent over the colorful field) · the stage ≥ φ²·the prose column · the header clears the stage (no bleed-through) · the entrance frame-series · BOTH modes. + the `proof:ba-gestalt` per-page verdict (the demo pages JOIN the gestalt roster).

## Migration roster (loop 2 — mechanical adoption, ONE shared edit propagates)
substrates: all 10 non-aurora (aurora is the `<VizStudio>` reference) · dock: all 7 · then the remaining categories per their gestalts. Each page: compose `<StoryPage>` + the right sub-type; delete the bespoke scaffold (no legacy). aurora's `<VizStudio>` is the `<DemoStage>` reference shape — `<DemoStage>` GENERALIZES it (VizStudio becomes a `<DemoStage>` preset/instance, not a parallel chassis).

## Dependencies / sequencing
- DEPENDS: FIX 5/6 (the substrate canvas-resize — LANDED, so `<DemoStage>` need not size the canvas, only host it) · W-HEADER-SCALE (the hero rung) · W-HIERARCHY2 (the cluster + gravity) · W-PAGE-BACKGROUND (the colorful field) · W-LIQUID-ENTRANCE-GENERAL (the sub-card entrance).
- The taxonomy REFINES as the remaining 9 categories audit (the sub-type set may gain/merge members — the dock + substrates corpus seeds it; motion/forms/display/containers/data/feedback/navigation/compositions confirm/extend).
- BUILD timing: author NOW (this spec); BUILD the chassis once the taxonomy converges (≥6 categories audited) to avoid rework; MIGRATE per-category as each gestalt lands.
