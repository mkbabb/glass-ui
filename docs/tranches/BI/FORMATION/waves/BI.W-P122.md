# BI.W-P122 — InstrumentChassis apotheosis — one physical instrument sleeve

**Status:** IMPLEMENTED — NATIVE COORDINATE ACCEPTANCE PENDING
**Topological stratum:** BI.S16
**Formation family:** component-data
**Core centers:** C1_LIQUID_GLASS, C6_COMPONENT_APOTHEOSIS, C8_DEMO_CHASSIS
**Terminal owner:** glass-ui orchestrator

## Intent

Retain only the genuine cross-product concept: a stable App-level physical sleeve that frames an
instrument's stage, optional inspector, and actions. Remove the generic Card duplication and the
Speedtest-specific phase, meter, and viewport machinery that accumulated around it.

InstrumentChassis remains public only at `@mkbabb/glass-ui/instrument-chassis`. It is not re-exported
from the package root.

## Landed disposition

- `/instrument-chassis` exports one runtime sleeve plus its generic state, proportion, boundary,
  reserve, and props types. The package root exports none of the family.
- `stage`, optional `inspector`, and optional `action` regions render in ordinary document order.
  The root and every region wrapper are landmark-neutral.
- The single material owns its edge, quiet curvature, generic consumer-tone state tint, private
  responsive rhythm, optional grooves, overflow containment, and stable reserve hooks.
- Product phases, chart-token reads, glass/spine/structure variants, the internal meter grid,
  viewport/dock sizing, compatibility warnings, and `ChassisDivider` are absent.
- The data story is the sole chassis specimen. The former chassis palette story now demonstrates
  only the independently owned chart palette.

## Evidence and owner ruling

Speedtest has four chassis elements and Muster has three, but only each application's root mount is
a true instrument housing. Speedtest's two chart wrappers and one map wrapper, plus Muster's two
conditional WinnerHero branches, are ordinary nested content surfaces and should use `Card` or
`Surface` rather than a chassis.

The retired API and stylesheet contradicted a general housing contract:

- `InstrumentChassisPhase` hardcodes `ping`, `download`, `upload`, and `jitter`;
- `InstrumentChassisVariant` forks `glass`, `spine`, and `structure` material identities;
- CSS reads Speedtest chart colors, supplies a gold completion default, and assumes an internal
  three-track meter/readout grid;
- narrow layout assumes exactly three dial children and reserves a hardcoded 24rem meter region;
- wide layout inherits a dock-adjusted viewport budget; and
- the dial is always a `<main>`, which creates a nested landmark in Muster.

`ChassisDivider` has three external Muster uses, including teleported content outside any chassis.
That is evidence for the ordinary `Separator`/twin-line primitive, not for a public chassis part.

## Public contract

The subpath exports `InstrumentChassis`, `InstrumentChassisProps`, and the generic state,
proportion, boundary, and reserve types.

- `state?: "ready" | "active" | "complete" | "loading"` describes housing state without naming a
  product phase.
- `tone?` supplies the consumer-owned accent/color value used by the state treatment. The chassis
  must not import chart/domain tokens or assign a brand meaning to completion.
- `class?` remains the ordinary styling escape hatch.
- `proportion?: "golden" | "preview-dominant"` controls only the outer stage/inspector ratio:
  `61.8033989/38.1966011` or `66.6666667/33.3333333`; without an inspector, stage is 100%.
- `boundaries?` is an order-insensitive, set-like request for only the `stage-inspector` and
  `inspector-action` grooves; it defaults to `[]` and never manufactures a line.
- `reserve?: "none" | "stage" | "inspector" | "both"` opts into stable consumer-sized regions and
  defaults to `none`.
- `stage`, `inspector`, and `action` slots render in that document order. Optional regions and
  their private grooves render only when populated.

The sleeve's only region-spacing authorities are dial inline/block padding, dial gap, control
inline/block padding, and control gap. Its independent `--instrument-title-gap` defaults to
`calc(var(--instrument-dial-padding-inline, 1.5rem) / 2.618)`.

The root is the one non-Card sleeve/housing material. It owns its outer edge, subtle state tint,
vertical region rhythm, internal grooves, overflow containment, and explicit stage/inspector
reserve hooks. It owns no universal minimum block size and does not own the dial slot's internal
columns, child count, meter dimensions, dock offset, or content semantics. The dial wrapper is a
neutral `<div>`; consumers own landmarks.

There is no public `ChassisDivider`, `variant`, `phase`, phase-name union, structure register, or
glass-as-card register. The component never animates reserved block size.

## Implementation scope

1. Rewrite `InstrumentChassis.vue` around the single sleeve contract and emit generic `data-state`
   plus the consumer tone custom property. Replace the dial `<main>` with `<div>`.
2. Keep region grooves as private markup/CSS and delete `ChassisDivider.vue` plus its public export.
3. Reduce `styles.css` to the outer sleeve, private regions/grooves, generic state treatment,
   stable reserve, responsive padding, and reduced-motion handling. Delete variant selectors,
   chart-token reads, completion gold, internal meter grid, exact-child layout, and viewport/dock
   sizing assumptions.
4. Remove the family from `src/index.ts`; retain only the explicit `/instrument-chassis` package
   subpath and declarations.
5. Remove now-unowned chassis phase/meter/variant tokens and narration from:
   `src/styles/tokens/offsets.css`, `property-regs.css`, `scheme-motion.css`, `glass-fx.css`,
   `glass.css`, and any metric/progress token block that exists only for the old internal layout.
   Preserve a token only when the reduced component or another real owner still reads it.
6. Update the component README, `README.md`, `DESIGN.md`, `MIGRATION.md`, style entry commentary,
   data story, chart palette story, and manifest to describe the sleeve rather than a generic
   content chassis.
7. Replace phase-canon and spine-variant tests with one focused housing contract suite. Delete
   tests that assert retired phase names or variants.

No sibling repository is edited by this wave.

## External migration order

The clean break is smallest when consumer topology is simplified before the producer API is
removed:

| order | consumer site | disposition |
| ---: | --- | --- |
| 1 | Speedtest `ChartsView.vue` (2) and `MapView.vue` (1) | Replace nested chassis wrappers with `Card`/`Surface`; those sites do not require a physical app sleeve. |
| 2 | Muster `WinnerHero.vue` (2 conditional branches) | Replace nested chassis wrappers with `Card`/`Surface`. |
| 3 | Muster `InstrumentAside.vue` (3 dividers) | Replace public `ChassisDivider` with `Separator` or the shared twin-line divider. |
| 4 | Speedtest `App.vue` | Keep the root sleeve; map ping/download/upload/jitter locally to `state="active"` and pass the active chart tone. |
| 5 | Muster `App.vue` | Keep the root sleeve; map run state locally and remove `variant="spine"`. |
| 6 | Glass producer | Remove root export, divider, variants, and domain phases at the planned major boundary after the coordinated consumer changes are ready. |

Consumer-owned content grids, meter reserves, active-phase animation, and viewport/dock budgeting
remain in the consumer repositories. They are not promoted back into Glass as compatibility props.

## Product acceptance

- Built output exposes InstrumentChassis only from `/instrument-chassis`; the root and subpath do
  not export `ChassisDivider`, `InstrumentChassisVariant`, or domain phase types.
- Source and built CSS contain no `data-variant`, `data-phase`, `ping`, `download`, `upload`,
  `jitter`, chart-token, completion-gold, exact-child, or fixed meter-grid arm owned by this family.
- Every region wrapper is neutral and creates no nested landmark.
- Omitted inspector/action slots emit neither empty regions nor grooves.
- Ready, active, complete, and loading states use a consumer tone without changing geometry or
  claiming product-specific meaning.
- Wide and narrow layouts preserve the sleeve edge, region hierarchy, and readable spacing while
  leaving the dial's internal layout untouched.
- Loading and hydration do not shift the reserved outer geometry; reduced motion removes tint
  interpolation without changing state visibility.
- Without an explicit stage/inspector reserve, content alone determines the sleeve's block size.
- The sleeve is visibly distinct from a nested Card/Surface and is used only where physical
  instrument housing is the truthful role.

## Native visual validation

Use the in-app browser only; do not use Playwright. Inspect Safari-current and Chrome-current in
wide/fine, narrow/coarse, and reduced-motion modes. The family story must show:

- ready, active with two consumer tones, complete, and loading;
- stage + inspector + action, stage-only, and omitted optional-region markup;
- wide and narrow sleeves containing consumer-defined one- and two-column stage layouts; and
- a chassis surrounding a Card so the material hierarchy can be judged directly.

Review edge continuity, groove alignment, border/rim occlusion, nested-landmark semantics, stable
outer geometry, contrast, proportional padding, and motion. Capture screenshots only where human
comparison is useful.

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P075 | Any composed progress remains truthful and owns its own segmented/value semantics. |
| BI.W-P117 | The chassis story imports Metric family parts only from `/metric`. |

## Archaeology folded

- Current home at the audited branch: `src/components/instrument-chassis`; decision: retain only
  the root physical sleeve and delete the public accessory/variant/domain surface.
