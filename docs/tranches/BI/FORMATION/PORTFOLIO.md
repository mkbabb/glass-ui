# Current-HEAD portfolio and product architecture

## Census authority

All counts in this document are observations at source base
`26c5ae686fd0f1181083aebda1215b00524555f1`; none is an acceptance threshold.
The execution registry expands exact paths from this base and the validator checks
subject digests. Counts are useful for disproving inherited assumptions, not for
locking future shape.

| Surface | Current observation |
| --- | ---: |
| Package version | `5.0.0` |
| Tag at or after 5.0.0 | none; nearest description `v4.2.0-671-g26c5ae68` |
| Package exports | 82 keys |
| Component families | 78: 37 under `src/components/ui`, 41 under `src/components/custom` |
| Generated source subpath barrels | 67 under `src/subpaths` |
| Source | 837 TS/Vue/CSS/MJS/JS/MD files; 107,306 lines |
| Demo | 203 such files; 37,924 lines |
| Scripts | 426 such files; 161,342 lines |
| Unit tests | 112 such files; 17,267 lines |
| Visual tests | 181 such files; 42,677 lines |
| Registered gates | 403 unique; local 375, CI 351, release 126 |
| Source/demo files containing tranche-era identifiers | 663 |
| Tranche-era identifier occurrences in source/demo | 2,969 |

The gate implementation is larger than the library it protects. That does not mean
every test is waste; it means the unit of protection became a historical wave rather
than a durable product invariant. The 403→40–60 abrogation is therefore a semantic
rewrite, not a delete-to-count exercise.

## Approach portfolio and adjudication

### Route A — polish the existing two-tier library

Keep `ui/custom`, keep subpaths and CVA recipes, and repair each component in place.
This minimizes movement but preserves the taxonomy, shadcn-shaped implementation,
duplicate entrypoint machinery, tranche-comment archive, and per-wave gate registry
that created the present maintenance load. Rejected: it improves pixels without
addressing the architecture the user explicitly asked to abrogate.

### Route B — make everything Liquid Glass

Promote glass to the universal visual substrate, including content surfaces. This is
visually loud and superficially coherent, but it destroys hierarchy and conflicts
with current platform guidance: glass is a functional layer over content, not the
content field itself. Rejected: it turns a signature into wallpaper and weakens
legibility, contrast, and product distinction.

### Route C — functional-plane glass over a warm content field

Flatten components into one concept taxonomy; use Reka for headless behavior while
removing shadcn/CVA styling scaffolds; make the warm field the content substrate;
reserve Liquid Glass for controls, navigation, selection, menus, and transient
chrome; give motion one physical vocabulary; and expose procedural rendering through
one substrate with WebGPU-preferred/WebGL2-equivalent capability paths. Selected.

This route earns selection because it simultaneously removes structural duplication,
creates a comprehensible material hierarchy, keeps accessibility states visible,
and gives the system a recognizable signature without requiring decorative novelty
on every component.

### Route D — publish only primitives and move compositions to the demo

Collapse aggressively to a minimal primitive kit. This removes overlap but would
also strand concrete external imports and force consumers to recreate product-grade
compositions. Narrowed and folded into Route C: demo-only artifacts and zero-product
wrappers are removed; behaviorally meaningful, consumed families remain public.

## The selected visual system

### Functional plane

Glass appears on controls, navigation rails, overlays, selection indicators, and
transient configuration surfaces. It must make interactivity clearer. At rest it is
quiet: controlled translucency, content-aware edge separation, restrained specular
response, and no glow halo. On hover/press/drag it becomes active through coherent
lensing, edge lift, and physical motion rather than opacity thrashing.

### Content field

Long-form text, data, code, charts, and story bodies sit on a warm paper-like field
or a near-solid elevated surface. They do not inherit backdrop blur merely because
glass is the brand. Nested glass is budgeted and generally prohibited; a content
card inside glass resolves as content, not another translucent pane.

### Signature

Each major page receives exactly one dominant type gesture, one restrained color
event, and one motion reveal tied to the page's concept. The signature is the tension
between audacious left-weighted typography and quiet functional material—not a teal
gradient, indiscriminate blur, or a repeated pill silhouette.

### Typography

The system keeps a compact reading scale and introduces a true display scale for
story heroes. Display text is optically fitted, left-biased, and allowed to break the
grid deliberately. UI labels remain calm and dense. Weight, tracking, line height,
and width are tokenized as a coordinated rung; component-local arbitrary text sizes
are removed. Fallback faces remain for font-loading geometry and SSR; those are not
legacy API aliases.

### Motion

One clock and one spring vocabulary govern press, selection, panel morph, dock
expansion, route transition, and procedural interaction. Native scroll/view
transitions are used where modern Safari and Chrome share reliable semantics.
JavaScript exists for measurement or capabilities CSS cannot express, not as an
always-running shadow writer. Reduced motion preserves state and spatial meaning
while removing travel, oscillation, and continuous animation.

### Procedural rendering

Aurora, blob, constellation, Fourier field, liquid grid, and related surfaces share
one GPU lifecycle, color resolution, pause/resume policy, DPR/budget policy, and
error contract. WebGPU is preferred. A WebGL2 path is retained only for a named
supported-capability cohort and must meet the same observable scene identity within
declared bands. Canvas2D remains a distinct 2D capability, not a silent visual
substitute for failed GPU scenes.

## Compatibility-path taxonomy

The blanket word “fallback” currently hides four unlike mechanisms. Perfected BI
classifies each occurrence before keeping or deleting it.

| Class | Example | BI disposition |
| --- | --- | --- |
| Legacy API compatibility | `Countup`/`AnimatedNumber` preserved aliases; old token aliases; variant compatibility props | Delete. No alias, shim, dual read, or migration ladder survives. |
| Obsolete browser compatibility | JS shadow writer for a now-shared Safari/Chrome CSS feature; legacy selector or scrollbar branch | Delete after the modern support probe and consumer check. |
| Product capability path | WebGPU preferred with WebGL2 for supported no-WebGPU hardware | Keep only with explicit reach decision, shared semantics, parity evidence, and visible failure when neither works. |
| Resilience/default value | SSR-safe value, font metric fallback, CSS custom-property initial value | Keep when it prevents undefined state without masking a broken required capability; name it `default`, `initial`, or `SSR value`, not compatibility. |
| Accessibility adaptation | reduced transparency, forced colors, increased contrast, reduced motion | Keep and elevate to first-class acceptance. These are product states, never degraded leftovers. |

Specific current residues requiring clean-break disposition include the preserved
aliases in `useCountup.ts` and `useAnimatedNumber.ts`, blob `variant`→`morphT`
compatibility reads, `useSurfaceAxis` compatibility classes, alias rows in motion
curves, MetricRow compatibility token writes, and shadcn-era recipe vocabulary.

## Structural transposition

1. Dissolve `src/components/{ui,custom}` into `src/components/<concept>`.
2. Keep `_shared` for private cross-component behavior only; it cannot export a
   public concept or become a miscellaneous dumping ground.
3. Dissolve pure pass-through root barrels and `src/subpaths`. One generated entry
   graph drives Vite JS, declaration emission, package exports, and type verification.
4. Colocate component-owned CSS with the component. `src/styles` retains only global
   tokens, material substrate, typography, reset, accessibility, and cross-component
   orchestration whose ownership is genuinely global.
5. Move demo-only chassis and artifacts under the demo terminal. A demo import never
   justifies a public export unless it demonstrates a reusable product primitive.
6. Strip tranche archaeology from production source. Durable rationale moves into
   design docs, tests, or architectural decision records; current code describes
   present behavior.

## One concept, one component family

The following adjudications are binding inputs to the wave registry. “Family” may
contain necessary subparts, but it must express one public concept and one styling
authority.

### Definite folds or re-homes

| Current family | Destination | Reason |
| --- | --- | --- |
| `icon-chip` | `chip` | Icon content is a slot/size mode, not a second selection/action concept. |
| `icon-tooltip` | `tooltip` | Trigger content does not justify a second tooltip contract. |
| `metric-badge`, `metric-cell`, `metric-stack` | `metric` family | One metric concept with explicit presentation parts and one token contract. |
| `focus-scope` | private overlay infrastructure | Headless focus containment is implementation substrate, not a branded public component. |
| `goo-filter` | motion/procedural private substrate | An SVG/CSS filter helper is not a user-facing component concept. |
| `header-ribbon` | retain and apotheosize | The tracked import census proves a live keyframes.js consumer; its persistent collapsible header-band semantics are distinct from a one-shot demo hero. |
| `spa-view` | demo shell | Route-view shell behavior belongs to the first-party demo terminal. |
| `completion-seal` | demo feedback composition unless external evidence appears | Current product role is completion storytelling; no speculative public export. |
| `color-swatch` | `configurator` part unless external evidence appears | It is an editor control specialization; a real external import can preserve it. |
| `paper-backdrop` | global content-field recipe | Page field is substrate, not a nestable component concept. |
| `controls` | dissolve into owning controls/configurator | A collection named “controls” has no singular semantic contract. |

Every conditional row is decided during its named wave from the already captured
syntax-level consumer census. It may finish `DONE` with retention or `DEAD` with
permanent withdrawal; it may not be rebooked.

### Retained concepts with clarified boundaries

- `Surface` owns material and elevation; `Card` owns a semantic content group;
  `Section` owns document/layout grouping. None may restyle the others by duplicated
  recipes.
- `Alert` is persistent inline status; `Notification` is a queued message model;
  `Toast` is transient overlay presentation. Shared behavior is private substrate,
  not copy-pasted variants.
- `Badge` is compact categorical metadata; `StatusDot` is nontext live state;
  `Pulse` is an intentional activity signal. Color cannot be their sole distinction.
- `Tabs` owns selection among panels; `ToggleGroup` owns independent or exclusive
  command state; the dock may compose Tabs but cannot fork its keyboard semantics.
- `Dialog`, `Drawer`, `Popover`, `DropdownMenu`, and `Tooltip` keep distinct APG
  interaction contracts while consuming one overlay/focus/escape infrastructure.

## Shadcn abrogation boundary

Reka UI remains the headless behavior substrate where it supplies correct semantics.
The abrogated layer is shadcn-shaped styling and structure: copied component recipes,
CVA variant matrices as visual authority, raw Tailwind utility strings embedded in
component markup, `data-slot` compatibility vocabulary without product use, and thin
forwarding wrappers that exist only to mimic a catalog API.

The replacement is typed Vue props and semantic state attributes feeding colocated
CSS, material tokens, and small private behavior composables. This is not a rewrite
to hand-rolled accessibility: Reka contracts are preserved and tested at the public
boundary.

## Demo architecture

The demo becomes a product-grade instrument rather than a gallery of isolated cards:

- one shell and one route manifest;
- reusable hero, specimen, configurator, code, and comparison chassis;
- every public component reachable through a rendered story, not merely imported;
- each story has a real interaction, dark/light, reduced motion, contrast, keyboard,
  touch, and narrow/wide state as relevant;
- procedural stories expose renderer identity and failure visibly;
- no bespoke page duplicates a chassis or local design language;
- captures are outputs of named π scenarios, not manual aesthetic snapshots.

## Performance posture

Performance acceptance is behavioral: no continuous loop while offscreen or reduced
motion; no layout animation where transforms suffice; bounded backdrop layers;
stable font geometry; route-level procedural ownership; lazy heavy scenes; no nested
GPU contexts without an explicit budget; and bundle attribution by entry graph.
Current byte and timing observations seed ranges but do not become immortal constants.

## What formation deliberately does not decide by taste alone

- A public component is not deleted merely because its local reference count is low;
  actual external imports and product semantics decide it.
- A WebGL2 path is not called legacy merely because WebGPU is preferable; supported
  reach and parity decide it.
- A visual threshold is not frozen from one screenshot; repeatability and perceptual
  discrimination decide it.
- A structure is not retained because many gates mention its path; those gates are
  repair obligations, not votes for the old architecture.
