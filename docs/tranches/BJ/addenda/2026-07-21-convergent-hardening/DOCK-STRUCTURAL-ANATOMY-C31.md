# Dock Structural Anatomy — C31

**Date:** 2026-07-22  
**Phase:** formation / browser assay / source reconciliation only  
**Parent:** `DOCK-STRUCTURAL-SIMPLIFICATION-WORKFLOW-C30.md`

This is the first lossless source reconciliation for the owner-directed Dock
simplification workflow. It is not an implementation proposal and grants no
product, package, browser-acceptance, or tranche-execution credit.

## Live browser falsifiers already bound

- The true-touch 390×844 Assay-A Dock is icon-only in its collapsed posture and
  does not communicate destination or orientation well enough to be usable as
  primary navigation.
- The fixed Dock overlays story content and controls. The final mobile
  `compositions/chassis` frame still places the Dock over the Grid section rather
  than reserving or owning an adjacent safe frame.
- Compact/open transitions retain a visibly soft root for many frames and show
  jitter before settling. They do not yet satisfy BREATH OF LIFE or MOVEMENT OF
  MOMENTUM.
- The Overview compact action changes a separate open specimen, exposing shared
  causal/state coupling.
- Dock Sections clips its trailing control on mobile.
- CTA→Dock Morph contains an extended interval in which neither source nor
  destination action is legible, with terminal handoff only around 1.96 seconds.
- The global Dock interferes with the overlay, menu, search, and control stories
  used to inspect it.

## Current runtime owners

`GlassDock.vue` composes at least these distinct runtime responsibilities:

1. backdrop sampling — `useGlassBackdropLuminance` (`:21`, `:100`);
2. disclosure/hold/pin/focus state — `useDockState` (`:23`, `:128`);
3. outer morph episode — `useDockMorphOrchestrator` (`:24`, `:176`);
4. collapsed/expanded endpoint measurement — `useDockExpandedSize` (`:25`,
   `:193`);
5. pointer identity and suppressed-click integrity — `useDockClickIntegrity`
   (`:27`, `:217`);
6. coarse-touch expansion/collapse discrimination — `useDockTouchGate` (`:28`,
   `:227`);
7. overflow measurement/mode switching — `useDockOverflowFit` (`:34`, `:83`).

This census does not itself prove excess. The simplification board must require
each owner to name a surviving invariant and a mutation that fails if that owner
is removed or folded. State that exists only to compensate for another layer or
timing seam is not independently load-bearing.

## Current DOM/layer topology

The public shell currently renders:

- `.glass-dock` — layout, state attributes, capture listeners, containment and
  elevation;
- `.dock-plate` — an absolute negative-z glass surface with its own backdrop
  filter, background, border, grain pseudo-element, clip path, and pointer hit
  surface (`GlassDock.vue:301-309`; `styles/dock.css:46-110`);
- `.dock-controls` — a `display: contents` grouping layer whose children continue
  to participate directly in the root flex layout (`GlassDock.vue:313-318`;
  `styles/dock.css:122-135`);
- optional leading and trailing `.dock-persistent` regions;
- `.dock-layers` — a measured summary/full grid with active, leaving,
  press-keepalive, opacity, inert, and pointer-event states;
- an optional search region inside the morph aperture;
- separate top-layer/teleported surfaces and ownership markers.

The current topology is therefore not simply “three layers.” It combines a
negative-z hit-bearing plate, a non-box controls wrapper, two persistent sibling
regions, a measured face grid, an optional nested search face, and portal
ownership. The adjudication must distinguish essential public composition from
historical compensations.

## Transitional scalar and geometry coexistence

The source itself records an unfinished interlock:

- `styles/dock.css:28-38` says ONE ENGINE / ONE SCALAR is the target but calls the
  current bridge “TRANSITIONAL COEXISTENCE” and “forbidden-at-close”;
- the plate aliases `--dock-t` to `--dock-morph-t` (`:89`);
- `morph.css:48-63` derives directional `--dock-expand-t` from
  `--dock-morph-t` and dock class state;
- `layers.css:48-105` blends measured collapsed/expanded pixel endpoints from
  that directional scalar;
- the plate also owns a clip-path aperture, but its collapse inset defaults to
  zero during the transitional bridge (`dock.css:83-96`).

This is a named RED seam: the implementation advertises one scalar while keeping
three scalar names, endpoint measurement, root box-size interpolation, and a
plate aperture whose intended collapse geometry is not yet authoritative. The
board must either prove each projection necessary or collapse them into one
observable spatial model.

## Direct source cause of the blurry intermediary

`styles/morph.css:68-93` applies `filter: blur(...)` to the entire
`.glass-dock[data-morphing]` root. Although the comment describes a brief
front-loaded decongestion bloom, the live Browser assay shows controls and text
remaining visibly soft across multiple intermediate frames. Because the filter
is on the root, it rasterizes the plate and interactive descendants together.

The owner’s correction is binding: this whole-subtree blur is RED. Glass material
may blur its backdrop; interactive glyphs and text must remain native-DPR sharp.
A future prototype may use localized opacity, tint, rim, or aperture changes, but
must not use a root filter to simulate life.

## Paint ownership concerns to challenge

- base plate background/border/backdrop live in `styles/dock.css`;
- horizontal and vertical plate background/border interpolation live in
  `styles/morph.css`;
- vertical static plate paint and shape/radius rules also live in
  `styles/shell.css`;
- adaptive luminance rewrites inherited material variables in a separate
  partial;
- grain is a plate pseudo-element with blend-mode changes by theme;
- elevation remains on the root while the optical surface is a negative-z child.

This can be correct only if cascade and compositing order are deliberate and
observable. The second live assay must record computed background, border,
backdrop filter, own-pixel filter, clip path, stacking context, and hit owner at
rest/onset/mid/settle/reversal for each posture. Final screenshots alone are
non-probative.

## Simplification prototypes the board must compare

These are formation hypotheses, not selected APIs:

1. **One shell + one optical pseudo-layer + one real content box.** Challenge
   whether the negative-z element and `display: contents` wrapper can become a
   non-hit-bearing `::before`/sibling plus a conventional content container.
2. **One observable progress value.** Drive extent, radius, padding and face
   reveal from one directional value with no aliasing scalar zoo. Endpoint
   measurement may remain only if intrinsic-content support proves it necessary.
3. **One interaction reducer.** Model rest/approach/pinned/held/morphing and input
   provenance transactionally; challenge whether state, touch gate, click guard,
   and morph busy ownership can be folded without losing cross-target safety.
4. **Sharp descendants.** Remove root self-blur. Compare aperture/material-only
   motion against native-DPR text/icon sharpness and interruption continuity.
5. **Structural safe frame.** Compare a current-orientation adjacent slot against
   the overlaying fixed Dock. A bottom posture remains owner-held; the frame must
   not smuggle in that decision.
6. **Semantic origin and 2D aperture.** Horizontal, vertical, centre, edge and
   bounded custom origins must remain invariant through reversal without child
   countertransforms or a settle teleport.

The winning topology is the smallest one that keeps the actual interaction,
overflow, material, accessibility and consumer invariants. Deletion count is not
the goal; a single causal owner per invariant is.

## Required next evidence

1. independent mobile and desktop Assay B on Dock Overview, Layers, Vertical,
   Sections, Controls, Overflow, CTA Morph and Search;
2. rest/onset/mid/settle/reverse/interrupt frames with computed layer and hit
   receipts;
3. keyboard, true coarse touch, focus return, portal ownership, PRM, dark/light,
   native-DPR sharpness and arbitrary-position occlusion;
4. two topology prototypes with identical public scenarios;
5. three independent failure-assuming Sol x-high challenges;
6. separate dependency-ordered adjudication into existing GF-DOCK, motion,
   accessibility, colocation, material and package owners.

