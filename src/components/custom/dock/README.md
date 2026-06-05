# Dock — the `<Role>Dock` vocabulary + the base primitives

The dock is glass-ui's most-consumed custom primitive (composed across the demo,
slides, keyframes, and fourier). This README is the SOURCE OF TRUTH for the dock's
naming convention (AU.W8, ASK-7) — so a new consumer picks a ROLE rather than
inventing a name, and so the canonical composable names are not re-invented.

## The base primitives (what glass-ui ships)

The dock base is `GlassDock` + `DockIconButton` + the `#collapsed` slot (the
two-layer collapse: a resting summary ↔ the expanded children). Richer docks
compose `DockLayerGroup` + `DockLayer` for a multi-pane switcher. The button
family: `DockIconButton`, `DockTabButton`, `DockSelectTrigger`,
`DockDropdownTrigger`. All reach consumers via `@mkbabb/glass-ui/dock`.

There is **no `<Role>Dock` component** in glass-ui — the base IS `GlassDock` +
`DockIconButton` + `#collapsed`. A role-typed dock surface is a NET-NEW contract,
BOOK until a 2nd consumer appears (the named candidate is keyframes D.W5, which
adopts the role vocabulary as LOCAL renames now and circles back only IF a
role-typed base ships AND it is that base's 2nd consumer). Do NOT ship a role-typed
component speculatively (the substrate-with-consumer precept).

## The `<Role>Dock` role vocabulary (the naming convention)

When a consumer composes the base into a named dock instance (a local wrapper /
rename), pick the role that fits — so the constellation speaks ONE dock vocabulary:

| Role | Use it for |
|---|---|
| **ChromeDock** | App chrome / global navigation — the persistent shell dock (the deck's home·count·gear pill, an app's nav rail). |
| **TransportDock** | Media / playback transport — play·pause·scrub·speed controls over a timeline. |
| **CanvasDock** | A canvas / editor toolbar — the tool strip over a drawing / WebGL / map surface. |
| **ToolDock** | A tool / action palette — a floating set of mode toggles or actions that mutate one surface. |

These are CONSUMER-SIDE names (a local rename composing `GlassDock` + the button
family + `#collapsed`); glass-ui ships only the base. slides binds the same base,
no role-typed component.

## The canonical `useDock*` composables (do not re-invent)

ONE canonical name per dock composable — a consumer reaches for these, never a
re-invented equivalent:

- `useDockState` — the collapse / idle-timer / keep-open state machine.
- `useLayerTransition` — the axis-aware FLIP crossfade between `DockLayer` panes.
- `useDockContext` / `useOptionalDockContext` — the dock provide/inject seam.
- `useDockLayerGroupContext` / `useOptionalDockLayerGroupContext` — the layer-group seam.

## Re-grounding notes (AU.W8, vs HEAD)

- **`useTouchGate` is NOT renamed.** It is a GENERAL `composables/dom` primitive
  (the per-control tap-to-activate guard) consumed by `Slider` as well as the dock,
  and is root-barrel public. Renaming it to `useDockTouchGate` would mis-name a
  general composable and break non-dock consumers — so it stays `useTouchGate`. The
  dock-vocabulary precept's rename clause was mis-grounded against HEAD.
- **`DockTabButton` is KEPT.** It has real consumers (the demo storybook —
  `StoryPager`, the instrument-chassis composition), so it is not a 0-consumer
  orphan; the precept's "retire" clause was mis-grounded against HEAD.
