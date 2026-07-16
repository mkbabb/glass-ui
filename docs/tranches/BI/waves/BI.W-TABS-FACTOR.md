# BI.W-TABS-FACTOR — pill default + variant cull (P092/Q020 terminal state)

Band: B3. P092 supersedes the early two-rest-state proposal; BI.W-Q020 owns the
terminal spring-register retirement.

## Mandate

UF-H1 asked for the loupe to be the default tab treatment and for duplicative variants
to be culled. The shipped answer is one `pill` material (default) plus `underline`, not a
named eyeglass variant or a second state machine.

## Design

- `pill` paints exactly one childless `.glass-lens` fill measured from the active button.
- The indicator travels on the shared `snappy` selection clock and matches the active
  button within 0.5 CSS px per edge across axis and direction.
- Selection has no persistent button-scale state: the measured indicator and foreground
  color carry identity. The existing `animatePress` interaction remains a one-shot press
  response and always returns the button to its base scale.
- `useLeadTrail` remains pager-owned; Tabs do not compose it.
- The former proud/settled sizing scalar, live release scalar, and dedicated eyeglass
  spring are deleted without aliases or replacement paths.

## Work

Keep the two-value material axis and one measured indicator. Retire the dead
`SpringPresetName` member, preset row, generated curve/settle/duration tokens, and stale
consumer promises. The old `eyeglass` prop and CSS controls remain definition-absent.

## Acceptance

Ordinary component tests cover the one-fill geometry, selection semantics, orientation,
direction, keyboard, and pointer behavior. The spring projection unit proves every live
preset matches its generated token. Native Browser acceptance remains in BI.W-Q020 at
1440 and 390 CSS px, light/dark, horizontal/vertical/RTL, pointer/keyboard, and reduced
motion. No proof script or source-grep gate is retained.

## Inbound acceptance constraint

The indicator box equals the active button box within 0.5 CSS px per edge on each tested
viewport, orientation, direction, and engine. This is an output-geometry contract, not a
reason to reintroduce an alternate indicator engine.
