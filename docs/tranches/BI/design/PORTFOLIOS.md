# BI DESIGN PORTFOLIOS — round 0 (orchestrator/Fable, 2026-07-11)

The approach portfolio per design problem: genuinely ORTHOGONAL formulations (different architectural
centers, different substrates, different decompositions — not rewordings). Each formulation is a
FAMILY in the design registry; research/prototype/critique passes advance, bank, block, or retire
families independently. Cross-pollination only after independent development exposes real strengths.

Registry states: LIVE (staffed) · BANKED (named re-trigger) · BLOCKED (missing primitive named) ·
RETIRED (rationale) · WINNER (survived adversarial audit + two clean passes).

---

## D-DOCK — the dock suite, greenfield from iOS-27 first principles

The indictment (UF-C1..C9): three consecutive tranches re-opened dock fundamentals; the module carries
duplicated systems and "an infinite amount of superfluous code"; hover clips; the rail is broken; the
morph is dead; Safari breaks; animations are sluggish. The greenfield question: what IS a dock on the
web, idiomatically, in 2026?

| family | formulation | architectural center |
|--------|-------------|----------------------|
| DOCK-A "the one pill" | Radical reduction: the dock is ONE non-clipping flex container (`overflow: visible` everywhere — clipping is structurally absent, so hover-clip cannot exist). Expansion/collapse/orientation are transforms over a reserved footprint. Layers = one crossfade slot. Overflow = fisheye magnification (the macOS dock law: compress, never scroll). State machine: rest/hover/expanded, CSS-first. | subtraction; clip-free by construction |
| DOCK-B "the island graph" | The Siri-island model: the dock is a small set of glass ISLANDS that split/merge (goo seam) under one JS layout solver writing only transforms. Rail chips, stacks, and satellites are islands, not slots. Morph = solver retarget; V↔H = island re-flow. | one solver, many islands |
| DOCK-C "the platform dock" | Native-first: every dock facility maps to a 2026 platform primitive — popover API for stacks/menus, CSS anchor positioning for satellites/rail chips, view transitions for layer swaps, scroll-driven animations for scrolled strips. JS holds selection state only. Safari-parity by construction (Baseline-gated features only). | platform primitives |
| DOCK-D "the control continuum" | The dock IS the segmented-control family: one selection engine (tabs/toggle-group/dock share indicator, overflow, roving focus), dock chrome is a decoration tier. Kills the duplicate control registers (dock-tab vs segmented-tab vs toggle). | unification with existing engines |

Fixed constraints all families inherit: WCAG floors (44px, roving tabindex), PRM carves, the glass
material system (consumes D-GLASS output), compositor-only motion, honest Safari degrades (no masking
fallback), the one-`--spring-dock` clock, box-inviolate rail (a rail never resizes the dock).

## D-PAGER — carousel + the pager dot-MORPH (the goo worm)

| family | formulation | center |
|--------|-------------|--------|
| PAGER-A "SVG goo worm" | Dots live in one SVG under the house goo filter; the active indicator is a metaball that detaches, travels, and re-merges (the Google-deck worm). Spring-driven cx; filter does the merge. | SVG filter metaball |
| PAGER-B "FLIP worm" | Pure-DOM: active pill + a transient bridge element; travel = scaleX stretch between geometric endpoints with volume-preserving squish (useLiquidFlex), then release. No filter (Safari-cheap). | transform choreography |
| PAGER-C "painted strip" | The dot strip is ONE canvas/paint surface drawing dots + worm; an a11y button row overlays it (visually hidden hit targets). Unlimited liquid fidelity, zero filter cost. | single painted surface |
| PAGER-D "view-transition morph" | Each selection change is a `startViewTransition` where the indicator's ::view-transition group morphs dot→dot. | platform VT |

Carousel page breakage (UF-I1 "totally broken") is diagnosed as a repair row independent of the pager
design; embla stays the scroll substrate unless research overturns.

## D-VIZ — substrate interaction physics + the grand simplification

Deletions are FIXED by mandate (dot-flow-field, concentric, dot-matrix — UF-E8). The design problem is
the interaction layer of the survivors + the roster itself.

| family | formulation | center |
|--------|-------------|--------|
| VIZ-A "one field core" | ONE shared pointer-field physics core (attractor with position/velocity/acceleration injection, mass-spring smoothing, flick impulse — usePointerVelocityField evolved) consumed by every viz through a per-viz MAPPING (fourier: draw-phase bias toward cursor; blob: weighted pull + satellite orbits perturb; aurora: nuclei drift toward pointer; constellation: attract/repel). One engine, N small mappings. | shared physics, per-viz projection |
| VIZ-B "per-medium physics" | Each viz owns a bespoke pointer model tuned to its medium (the pre-BG fourier the user preferred is the reference). Shared code only at the raw-pointer layer. | medium-authentic feel |
| VIZ-C "the simulation service" | A tiny simulation clock (springs/particles) as a service all vizzes subscribe to; vizzes become pure renderers of simulated state. | simulation/render split |

Roster question (UF-B1-adjacent): which vizzes survive as library exports vs demo-private vs deleted —
decided by consumer truth + paint quality, in the tranche not the loop. Aurora work (vibrancy,
setting-sun preset, interactability, larger studio canvas) rides whichever family wins.

## D-STORY — the storybook meta-component system

The user: "we should have a meta-component system built out and used for storybook pages. Codified and
the like — is this not extant?" (It half-exists: StoryPage/StorySection/ShowcaseFrame — adopted
unevenly, no code-block system, no live tiles, meta text everywhere.)

| family | formulation | center |
|--------|-------------|--------|
| STORY-A "pages as data" | Each story is a MANIFEST (sections, specimens, prose, code refs); ONE StoryPage engine renders everything (shrink-on-scroll hero, cascade, veil demarcation, dividers, code blocks, permutation grids). Meta-text and sizing become structurally impossible (copy lives in vetted fields). | declarative schema |
| STORY-B "the hardened kit" | Keep authored SFC stories; harden the chassis kit (StoryPage + StorySection + SpecimenFrame + CodeBlock + PermutationGrid) and enforce adoption + copy rules by gate (meta-text lexicon gate, affordance lint, w-full-trigger ban). | components + gates |
| STORY-C "literate stories" | Stories authored as markdown/MDX-like documents with embedded live specimen mounts; prose is content, layout is the engine's. | literate authoring |

Sub-problems all families answer: (1) live-component bento tiles (scaled real components, inert) vs
captures; (2) the highlight.js code-block register (theme per keyframes.js/value.js house pattern);
(3) shrink-on-scroll title as THE standard hero; (4) bidirectional scroll choreography; (5) the
never-again meta-text gate (lexicon: tranche letters, wave ids, kf/keyframes internals, proof:/gate,
design-axis codenames).

## D-GLASS — surface taxonomy simplification + the geometry grammar

| family | formulation | center |
|--------|-------------|--------|
| GLASS-A "two-axis collapse" | EVERY bounded surface = (tier × decoration) on ONE Surface primitive; Card/GlassPanel/ShowcaseFrame/veil/floating-panel/chassis become expressions of it; duplicate names (pane/panel/plate/tile/frame) die. | one primitive |
| GLASS-B "material classes only" | No surface components: a `.surface-*` class grammar (the 5-rung ladder + decorations) + components merely compose classes; component-level surface props retired. | CSS grammar |
| GLASS-C "keep components, kill synonyms" | Keep Card + the ladder; retire every OTHER surface component onto Card/tier expressions; one naming law (card/plate only). | consolidation by retirement |

The GEOMETRY GRAMMAR rides the winner (likely family-invariant): (a) the CONCENTRIC-RADIUS law —
child radius = parent radius − inset gap (floored), expressed as an inherited `--radius-ctx` +
derivation, so nested surfaces are concentric by construction; (b) the CAPSULE-vs-CARD law — capsule
(pill) is reserved for single-row interactive strips whose height ≈ content; multi-row/sectional
containers read card radii; (c) alignment floors (badge optical centering); (d) border grammar —
decorative rims are masked-conic/inset-ring, NEVER border-image on rounded surfaces.

## D-MOTION — the motion register unification

| family | formulation | center |
|--------|-------------|--------|
| MOTION-A "the register table" | ONE named-register table (enter-overlay, enter-menu, enter-tooltip, exit, draw-in, press, morph, cascade) in one CSS home; every surface BINDS a register by name; a gate bans local timing literals in SFCs. Tightening = editing the table once. | single source table |
| MOTION-B "orchestrated JS" | All overlay enters route through the JS reveal engine (useLiquidReveal presets); CSS registers only as degrade floors. | JS orchestration |
| MOTION-C "tempo axis" | Registers + a global `--motion-tempo` scalar (default tight; consumers opt into longer) multiplying every per-register clock — the user's "tighter, responsive, with options for longer". | calibration axis |

Fixed repairs riding the winner: accordion indent kill, dropdown-bounce refinement, popover→menu
register homogenization, sheet divider draw-in smoothing, drawer/live-behind perf, command jitter.

---

## Loop state

| problem | pass | state |
|---------|------|-------|
| D-DOCK | 0 (portfolio) | 4 families LIVE |
| D-PAGER | 0 | 4 families LIVE |
| D-VIZ | 0 | 3 families LIVE |
| D-STORY | 0 | 3 families LIVE |
| D-GLASS | 0 | 3 families LIVE |
| D-MOTION | 0 | 3 families LIVE |

Pass-1 research charters derive one-per-family plus a prior-art sweep per problem. Early-round
researchers receive the task statement + their family charter ONLY (the favored approach is withheld).
