# Glass → value.js · v2 DAG, provider, export, and migration contract

**Banked:** 2026-07-28  
**Receiving task:** `019fa9a7-5269-76d3-bd9e-89627eb1a639`  
**Glass graph:** `BJ/audits/2026-07-28-library-dag/IMPORT-DAG-V2.json`  
**Adjudication:** `BJ/audits/2026-07-28-library-dag/ADJUDICATION-SOL.md`  
**Posture:** binding formation input; no value.js edit was made

## Exact receiving edge

At the audited value revision, AST/static module scanning finds:

- 80 files with 121 direct Glass module edges;
- 86 files with 134 broader textual Glass references;
- Glass `^7.0.0`;
- a large active dirty tree owned by the value V megatranche.

The textual count is intentionally separate because export-contract tests and
build strings are migration evidence but are not imports.

Known frontend debt remains value-owned:

- local shadcn-forwarding Button and Badge components;
- a permanent desktop `My Palettes` companion on all five Admin routes;
- `dev:web-only` cannot functionally prove palette CRUD.

Glass does not edit value.js, add fallback data, or dictate route composition.

## Flattening idioms value must honor

1. One semantic owner per public family; no root convenience façade.
2. Component-private helpers, styles, fixtures, and feature adapters remain
   beside their owner.
3. Shared code is promoted only below two semantically independent owners.
4. Barrels aggregate outward only; implementation never imports its own
   barrel.
5. Generic primitives never import Dock or another signature feature.
6. Inside a module, child filenames drop the containing-module prefix.
7. Tests live outside product source in an isomorphic owner tree.
8. A major migration replaces the path once. No alias, shim, forwarding
   component, dual path, resolver fallback, or old-route redirect remains.

## Provider boundary

`TooltipProvider` is the sole surviving public provider. It is imported only
from `@mkbabb/glass-ui/tooltip` and mounted once around the nearest real group
of tooltip-bearing controls. It owns dwell and sibling skip-delay policy only.

It is forbidden to:

- repeat a provider per trigger;
- make HeaderRibbon or another leaf silently self-provide;
- turn it into an omnibus application-wide Glass provider;
- put Dock hold/geometry policy in Tooltip;
- catch a missing boundary and render an inert fallback.

The Keyframes root hotfix is valid because the root ribbon and all routed
controls form one stable tooltip-bearing application group. value should place
the boundary according to its own real control groups, not copy the file
location mechanically.

All other Glass provide/inject contexts are owner-private or become explicit
configuration. They do not earn public Provider components.

## Reduced-motion boundary

Glass owns one lower motion producer. Features do not read the media query
independently. The public path is `@mkbabb/glass-ui/motion`; there is no
`/motion-core`.

Under reduction, input and correctness remain while interpolation leaves:
springs/ramps settle synchronously, gestures complete, GPU surfaces paint one
deterministic rest frame and park, and non-motion state cues remain visible.
value must not retain a parallel clamp or wrapper after migration.

## Canonical Glass public surface

The runtime root export is removed. The owner manifest generates package
exports, declarations, Vite entries, and public tests:

```text
./button
./surface
./chip
./avatar
./watercolor-swatch
./forms
./disclosure
./dialog
./drawer
./menu
./command
./popover
./tooltip
./feedback
./data
./search
./sortable-list
./navigation
./carousel
./dock
./configurator
./motion
./motion/easing
./motion/text
./renderers/aurora
./renderers/blob
./renderers/constellation
./renderers/fourier
./handmark
./theme
./styles
./fonts/*
```

This is an ownership/loading plan, not permission to create pass-through
barrels. Every symbol appears at one path.

## value import replacement matrix

| Current value path | Terminal Glass owner | Migration ruling |
| --- | --- | --- |
| package root | exact owner below | Root runtime disappears; perform a symbol-level split, never add a value-local Glass barrel |
| `/aurora` | `/renderers/aurora` | One explicit renderer contract; no adapter fallback |
| `/blob` | `/renderers/blob` | One explicit renderer contract; no adapter fallback |
| `/chip` | `/chip` | Survives; absorbs noninteractive Badge semantics |
| `/color` | `/theme` | Color contract moves to Theme; value payload remains dynamically quarantined |
| `/configurator` | `/configurator` | Survives as one public family with private model/presentation seams |
| `/dark` | `/theme` | Dark state/install/control live under one Theme owner |
| `/dialog` | `/dialog` | Survives; shadcn part/pass-through surface does not |
| `/dock` | `/dock` | Survives; generic controls cannot reach back into it |
| `/dom` | no generic successor | Classify every symbol into theme, forms, interaction, observer, demo/code, or value-local ownership |
| `/easing` | `/motion/easing` | Survives as authored easing tools |
| `/fading-scroll` | `/navigation` | Moves into Navigation |
| `/forms` | `/forms` | One compact field/choice/control family; no individual control subpaths |
| `/motion` | `/motion` | Survives as the one public motion family |
| `/motion-core` | `/motion` | Old path deleted |
| `/search` | `/search` | Survives as a distinct task |
| `/styles` and `/styles.css` | `/styles` | One canonical style entry unless measured byte-loading proves a real independent split |
| `/tabs` | `/navigation` | Tabs move into Navigation |
| `/watercolor-dot` | `/watercolor-swatch` | Authored deterministic SVG/PRM swatch survives under its truthful name |

There is no one-to-one successor for `/dom`: a generic replacement shelf would
launder the same ownership error. GPT Luna x-high should enumerate value's
imported symbols mechanically; GPT Sol x-high then assigns each to the
adjudicated owner or to value itself.

## What survives versus what folds

The final adjudication rejects several pass-1 deletion temptations.
WatercolorSwatch, Carousel, DataTable, Deck, InstrumentChassis, Easing,
Constellation, and Fourier remain semantic products. Counts corroborate their
migration reach but did not decide their worth.

Confirmed clean folds include:

- Badge → Chip;
- AnimatedDigit + Typewriter → Motion/Text;
- native Table wrappers → DataTable/native HTML;
- ExpandableContainer → Dialog;
- Label and labeled forwarders → Forms/Field;
- Accordion + Collapsible → Disclosure;
- PaperBackdrop → Surface/Theme decoration;
- generic Keyboard and Reactive utilities → owning app/feature or existing
  utility runtime.

value's local Button/Badge forwarders cannot survive as migration cushions.
Their consumers move directly to the final authored contracts.

## Coordinated migration constraints

For each Glass owner cut:

1. Glass freezes the symbol/prop/event/CSS contract and packed prerelease.
2. value refreshes its exact AST symbol ledger at the pinned revision.
3. value changes source, tests, CSS, docs examples, and build assertions once.
4. the old path/name and forwarding component are deleted in that same value
   cut.
5. value runs type, behavior, a11y, browser, full-stack, and packed-consumer
   proof.
6. Glass publishes only after the required consumer branches are green.

Raw class recipes, `data-slot` compatibility selectors, Reka pass-through
props, old tokens, and root imports receive semantic replacements, not string
aliases.

This contract does not dispose value's prior O-series asks such as Button
attribute closure, ConfirmDialog safety, Slider rail/stops, Configurator
labelling, dark Card tone, or Skeleton tone. Those remain separate producer
questions and must be reconciled against the terminal families rather than
silently dropped during the export move.

## Receiver acknowledgment

The value audit incorporated this Glass 112/112 contract and the Atlas pass-2
receipt into its durable V handoff. Its closeout landed:

- value `94ad2e71` — explicit feature/unfeature transport with root
  test/demo/** coverage;
- value `fe8785e5` — complete handoff, archaeology, Glass/Atlas coordination,
  and adjudicated G0–G7 program;
- Keyframes `8281638c` — application-group TooltipProvider hotfix.

The receiver explicitly retained the outstanding O-series producer asks.
Remaining value blockers include 117 missing canonical reports, three failed
censuses, incomplete graph authority, Admin stale/soft-delete state,
unreachable CRUD surfaces, Fourier UI/E2E gaps, Keyframes hierarchy/mobile
crowding, and parse-that's two SCCs plus +82.9% performance regression.
