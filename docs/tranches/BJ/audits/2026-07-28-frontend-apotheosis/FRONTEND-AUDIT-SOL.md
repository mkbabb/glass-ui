# FRONTEND APOTHEOSIS AUDIT — SOL

**Seat:** GPT Sol, xhigh — independent design/adjudication arm
**Cut audited:** `d844bef6` plus the live dirty tree, 2026-07-28
**Scope:** frontend structure, public component topology, consumers, demo, material,
motion, accessibility, and the staged `W-DESIGN-CANON` body
**Mutation posture:** read-only except this report

## Executive verdict

BK has an unusually strong material-and-motion research corpus, but the shipped
library and the terminal roster still reproduce the two failure modes the last
months repeatedly identified:

1. **The research is not yet the product.** The current tree remains 62 component
   families / 174 SFCs / 57,657 component-source lines, with 81 source files
   importing Reka, 180 `data-slot` emissions, 99 distinct literal slot names,
   122 `cn()` sites, a 225-line class conflict resolver, and 44 SFCs still carrying
   Tailwind-style structural class strings. Full shadcn abrogation is planned, not
   implemented.
2. **Consumer truth was corrected and then forgotten again.** The current
   GESTALT/terminal record calls Carousel the “clean 8/8 zero.” This is false,
   already disproved and corrected repeatedly in the BJ corpus. `words` imports six
   Carousel symbols. The newest roster regressed from the previously ruled
   11-repository census back to a hard-coded eight.

The next Claude session should resume BK, but **must amend the record before it
executes deletion or consumer waves**. Carousel may still be deleted on the
already-ratified `<2 current-contract consumers` ground, but it is
**DELETE-with-relay to words**, never a zero-consumer clean delete.

The staged 907-line design canon and 288-line emitter are present at the documented
`/private/tmp/.../W-DESIGN-CANON-APOTHEOSIS/` path, and
`node regen-design-canon.mjs --check` is GREEN. They are, however, ephemeral
scratchpad bytes. Banking those exact files into the repository is the first
session-durability duty before another wall.

## Evidence floor

Static census at this cut:

| measure | current |
|---|---:|
| component directories, including `_shared` | 63 |
| governed component families | 62 |
| component SFCs | 174 |
| component `.vue/.ts/.css` LOC | 57,657 |
| package export keys | 72 |
| files importing `reka-ui` | 81 |
| SFCs importing `reka-ui` | 80 |
| `data-slot` emissions | 180 |
| distinct literal `data-slot` values | 99 |
| `data-part` occurrences | 10 |
| `cn()` source sites | 122 |
| demo story-route SFCs | 99 |
| co-located authored tile SFCs | 4 |

The demo therefore has **112 derived routes**, not “124 routes”: root + 11 category
landings + 99 story routes + 404. The 124 figure counts every SFC under
`demo/stories`, including helpers and four `.tile.vue` files.

### Browser evidence

This seat followed the frontend-design and in-app Browser skills. Its own in-app
Browser allocation was unavailable (`agent.browsers.list()` returned no browsers),
so it made no independent pixel claims. The root audit seat supplied these
in-app-Browser measurements, corroborated here against source:

- Home at 1280×720 has a working dedicated main scroller
  (`clientHeight=652`, `scrollHeight=1862`); the bottom dock is adjacent, not an
  occluding overlay. Do not resurrect the false “unreachable fold” defect.
- The home renders every category name twice. This is source-exact:
  `demo/chassis/landing/SectionPreviewCard.vue:49-56` prints `tile.title` in the
  identity tile and then prints `title` below it.
- `/forms/inputs` has no horizontal overflow; default inputs are 40px and the
  36/40/44 scale is coherent. Its repeated cards-within-cards staging makes state
  comparison heavier than necessary.
- A live Dialog has correct `role=dialog`, autofocus, working backdrop/focus
  treatment, and a stable 512×274 plate. The total palette nevertheless reads as
  low-chroma brown rather than a demonstrable Golden Glass transmission study.
- `/dock/overview` presents the hero primitive as a large opaque/salmon-like slab
  under dense explanation. The route demonstrates API prose before it demonstrates
  the library’s glass signature.
- Home mobile has no horizontal overflow and reaches its endpoint without dock
  occlusion. The Buttons route truncates the selected dock label from “Buttons” to
  “But”; treat this as a narrow-seat label/responsive acceptance row.

## The consumer-truth regression — BK must amend before execution

`/Users/mkbabb/Programming/words/frontend/src/components/custom/definition/components/media/ImageCarousel.vue:83-90`
imports `Carousel`, `CarouselContent`, `CarouselItem`, `CarouselNext`,
`CarouselPrevious`, and `CarouselApi` from `@mkbabb/glass-ui/carousel`.
`words/frontend/package.json:19` declares `@mkbabb/glass-ui:^3.0.0`.
`CarouselNext` and `CarouselPrevious` are already absent from the 7.0.0 barrel, so
this is a partially stale old-major consumer—not a KEEP veto, but unquestionably a
relay.

This was not newly discovered:

- `docs/tranches/BJ/ASK-REDUCTION.md:188-203` re-issued the ruling with words named.
- `docs/tranches/BJ/waves/BAND-REDUCTION.md:612-620` says the census was
  “CORRECTED AGAIN” and requires the words relay.
- `docs/tranches/BJ/formation/refable/REFABLE-RU-03-REDUCTION.md:58` records that
  the nine-repo fence excluded words and muster.
- `docs/tranches/BJ/addenda/2026-07-24-refinement/COMPONENT-WAVES-TERMINAL-3.md:33`
  explicitly ruled the 11-repository universe.
- `docs/tranches/BJ/addenda/2026-07-24-refinement/GESTALT.md:22,60,74` later
  regressed to “zero across all 8” and omitted words, muster, and bbnf-lang.

This is the clearest “ÉCOUTE-MOI” recurrence in the frontend corpus: a correct
finding was repeated, adopted, and then lost by a later summarization pass.
Hard-coded repo lists must die. Generate the consumer universe from package
manifests declaring `@mkbabb/glass-ui`, plus explicitly registered alias/workspace
consumers such as keyframes.js; walk whole repositories, not only `src/`.

Other current relay omissions to correct:

- `instrument-chassis`: speedtest has four source imports and muster has six.
- `completion-seal`: sci-report has two component imports in addition to atlas.
- `paper-backdrop`: speedtest `ThankYou.vue:99` in addition to atlas.
- `data-table`: current consumers include three speedtest files and atlas; the
  Table/DataTable **SPLIT with shared internals** remains correct.

## Component topology: keep, merge, delete, reshape

| disposition | families | ruling |
|---|---|---|
| KEEP as behavioral substrate | Button; form controls; Dialog; Select/Command/menu behaviors; Surface; Search; Table; DataTable | Preserve Reka keyboard/focus/ARIA mechanisms. “Full shadcn abrogation” means delete shadcn naming, mirror shells, utility recipes, and catalogue anatomy—not reimplement proven accessibility behavior. |
| KEEP, aggressively reshape | Configurator, Easing, Typewriter, Constellation, PagerDots, Dock, Timeline, Aurora, Blob, FourierField, HandMark | They have real consumers or signature merit, but several expose implementation knobs or demo-device anatomy. Typewriter’s public surface has already improved to nine intent props; HandMark still exposes 19 props, including brush-engine pass-throughs. |
| MERGE internals, keep distinct public jobs | Table + DataTable; Accordion + Collapsible; Select + Command + Dropdown menu plates | Share row/cell, disclosure, and overlay plate mechanisms. Do not merge semantically distinct user jobs merely to lower a family count. |
| COLLAPSE shells | Card parts; Reka mirror/forwarder SFCs; DialogTrigger/DialogClose | One compound owner with slots and `data-part`; direct re-exports where no adaptation exists. This is the credible route from 174 toward ~116 SFCs. |
| DELETE/RELOCATE with relays | Metric, InstrumentChassis, AnimatedDigit, PaperBackdrop, HeaderRibbon, CompletionSeal, WatercolorDot; Drawer into Dialog detents | Standing owner direction is coherent only if the complete speedtest/muster/sci-report/atlas/keyframes/fourier/value.js relay table travels with it. |
| DELETE-with-relay, not clean | Carousel | Words is the named relay. Delete can still stand on merit and the `<2 current-contract consumers` bar; its census premise must be corrected. |
| RE-HEAR | Deck | Atlas’s headless `useStageDeck` and `useDeckDetent` remain materially different from a visual Carousel shell. |

### Card is the clearest library-gestalt overfit

`src/components/card/Card.vue:15-40` combines Surface material, size, cartoon, grid,
selection, selected state, metal, hue, and hue strength. Its defaults include
`grain:true` and dormant `metal:"gold"`. Generic Card should be semantic grouping +
material role. Selection color/metal belongs in a selection recipe; cartoon and
engineering-grid treatments belong in compositions. A “Golden Glass” canon that
says “not metallic” while generic Card owns a metal axis is internally unserious.

## Shadcn abrogation

The target is sound: preserve Reka as an implementation dependency while removing
the shadcn catalogue as the library’s ontology.

Execute these as one structural program:

1. Replace surviving meaningful `data-slot` vocabulary with a small `data-part`
   anatomy; delete dead emissions. Do not mechanical-rename all 99 values.
2. Collapse class-only mirror/forwarder SFCs into compound owners.
3. Replace four variant-map/class-string dialects and the 225-line `cn()` conflict
   table with typed semantic axes + attributes.
4. Remove `ui/`, `default`, `card/popover/accent/muted`, and stale ghost-export
   language from public docs and comments where it denotes inherited shadcn
   structure rather than a real role.
5. Keep structural Tailwind only where it is genuinely the consumer-facing styling
   contract; component identity should compile from colocated CSS and semantic
   attributes.

## Demo and frontend-design direction

**Subject:** an optical component bench.
**Audience/job:** library consumers comparing real material, state, accessibility,
and motion behavior before choosing an API.
**Current signature:** decorative chromatic meniscus + WatercolorDot.
**Required signature:** one real Golden Glass lens specimen showing the same
component through rest → hover → press → selected/focus, over a structured field.

Compact token critique, using the current light-arm values:

- Paper `#FBFAF8`
- transmitted cream `#FDF5EC`
- carbon ink `#1C1917`
- hover clay `#DFD2C3`
- edge clay `#C6B49F`
- destructive `#DB2424`

These six roles are enough for the core bench. Category chroma belongs in the live
field behind the lens, not in multiple decorative hero objects. Plus Jakarta Sans
currently serves both text and display and Fira Code serves instrumentation. Keep
that stable for BK; the immediate hierarchy defect is
`demo/chassis/landing/SectionLanding.vue:23-29`, where `landing.heroScale` exists
but the template hard-codes `"4"`. Do not reopen Fraunces until the data-driven
depth ladder actually binds.

Proposed chassis:

```text
┌ category rail ┬──────────────── main scroller ───────────────┐
│               │ title + one-sentence job                     │
│               │ GOLDEN GLASS LENS: live state matrix         │
│               │ component-family cards: real specimen first  │
│               │ API/copy second                              │
├───────────────┴───────────────────────────────────────────────┤
│ adjacent transport / mobile category dock                    │
└───────────────────────────────────────────────────────────────┘
```

Keep `StoryPage`/`StoryHero`/`StoryBodyRenderer` as the one chassis. Fix the hard
hero-scale binding, remove duplicate identity tiles, and do **not** answer
`G-TILE-COVERAGE` by authoring ~95 bespoke mini-components. Use a few family-level,
state-driven specimens; authored tiles are reserved for signature components and
frozen stills for GL substrates.

## Audit of the staged DESIGN.md replacement

The generated-canon mechanism is the right architecture: one law home, emitted
constants, a real `--check`, and OWED rows instead of invented shipped facts. The
Golden Glass section is the strongest distillation in the corpus. Land it only
after these edits:

1. Change “Golden glass is what a bare component paints” to **“what bare
   material-bearing chrome paints.”** Content, data, canvases, and structural
   primitives are explicitly not all frosted.
2. Delete the universal claim that every interactive component implements all five
   `rest/hover/press/engaged/modal` rungs. Engaged promotion and modal presentation
   are topology classes, not states every Checkbox, Link, Slider, or Table row must
   implement. Require only applicable states and a declared omission.
3. Rename the singleton law to the narrow **active promoted engagement** it means.
   Persistent selected, checked, and expanded states are not document-singletons.
4. Demote “exactly one rebounding row,” global delay ranks
   `−1/0/+2/+3/+6/+9…21`, universal squash-relax, and `exit=0.6×entry` from
   metaphysical laws to default motion recipes with evidence-based exceptions.
   Their causal ordering is valuable; their universal numerology is contrivance.
5. Do not mint the full-viewport Focus Veil as a shared primitive from four planned
   sites. The canon’s own rule requires two consumers; prospective consumers are
   not consumers. Stage it locally, promote after two implementations.
6. Correct section numbering: under `# 4 · THE PROPORTION`, headings are labeled
   `3.1…3.5`; under `# 5 · THE LIGHT AND THE INK`, they are `4.1…4.4`.

Breath of Life should reduce to: **no decorative idle animation; every applicable
state answers within one frame; hover is fine-pointer-only; press reports before
travel; persistent semantic state remains truthful; PRM reaches a static terminal
state.**

Movement of Momentum should reduce to: **spatial change uses an interruptible,
job-named spring or inertial decay; chromatic change uses a curve; exits do not
overshoot; PRM removes spatial enrichment; one owner writes each channel.**

## Accessibility and reduced motion

Keep:

- `demo/shell/AppShell.vue:96-131,239-270`: one scroll owner, route scroll reset,
  focus transfer, keyboard-only focus styling, and polite route announcement.
- `src/styles/accessibility.css`: contrast/forced-color state boundaries.
- `src/styles/utilities/a11y-overrides.css:40-47`: global PRM prevents transition
  resurrection and uses a genuine zero transition clock.
- Reka’s focus, keyboard, labeling, and presence semantics during shell collapse.

Add acceptance:

- every collapsed dock control must be absent/inert in the accessibility tree, not
  merely visually hidden;
- mobile selected labels must not truncate to ambiguous text;
- every shell consolidation keeps behavior tests, not only DOM snapshots;
- every hover rule is gated by `(hover:hover)`;
- PRM assertions test final state and absence of continuing rAF/timer work.

## Exact BK amendments and resume order

Before any implementation wave:

1. **Bank the 907-line canon body and 288-line emitter from `/private/tmp` into
   durable repo paths.** Re-run `--check`; preserve the exact byte source.
2. Amend Terminal row #18 and all downstream summaries:
   `carousel clean 8/8 zero` → `carousel DELETE-with-relay; words named; partially
   stale ^3 consumer`.
3. Restore the ruled 11-repository/full-manifest census law; add bbnf-lang, words,
   and muster. Record keyframes.js as an alias/undeclared workspace consumer rather
   than silently losing it.
4. Complete relay rows: InstrumentChassis → speedtest+muster; CompletionSeal →
   atlas+sci-report; PaperBackdrop → atlas+speedtest; AnimatedDigit →
   fourier+speedtest; HeaderRibbon → keyframes.js; Carousel → words.
5. Correct every route/story count: 99 story routes, 112 total routes, 124 story-dir
   SFCs.
6. Amend W-DESIGN-CANON with the six anti-contrivance edits above before LAND.
7. Bind `landing.heroScale`, remove identity-title duplication, and add the mobile
   dock-label acceptance row to the demo wave.

Then execute in this order:

1. token/material truth (`W-TOKEN-CANON`, frost transmission, radius/type cleanup);
2. shell collapse (`data-part`, mirror/forwarder removal, class dialect);
3. shared Breath wiring (`field-control`, capsule/atom, engagement owner);
4. component reshapes and relayed deletions;
5. demo lens bench and route-level dual-engine/PRM/a11y captures;
6. fresh component/export/consumer census before close.

The durable anti-recurrence rule is simple: **a deletion row stores its generated
consumer query and manifest-derived universe beside the verdict. A prose summary
may cite that artifact; it may never replace it with a remembered repo count.**
