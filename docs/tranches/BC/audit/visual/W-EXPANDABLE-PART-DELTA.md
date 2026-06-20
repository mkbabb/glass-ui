# W-EXPANDABLE-PART — captured paint DELTA

The ExpandableContainer `data-part` / named-slot chrome-hook seam (the Atlas AR-7
expand-fullscreen seam; no consumer fork). The chrome is the consumer's; the
mechanism is the library's.

## Route

`/containers/expandable-container` (demo `:5199`).

## What the eye should see (orchestrator capture, both modes)

1. **DEFAULT instance — the no-op floor.** The first two specimens (`button-position=right`
   / `button-position=left`) render the `<Maximize2>` corner trigger BYTE-IDENTICAL to
   HEAD. Click → the panel teleports to a fixed full-viewport host; the overlay reads as
   the surface LIFTING off the page — the frosted-over-content `glass-overlay` plate
   (BA.W-SURFACE-AXIS), NOT a clipped/`bg-background`-walled slab (the "WTF clipped"
   PAGE-PRUNE flag). The `<Minimize2>` corner button + Escape both exit; the body locks
   while open. Warm-cream Band-1 identity reads through.

2. **CONSUMER-RE-SKINNED instance — "Chrome hook" section.** The `.reskinned`
   ExpandableContainer's expand trigger is re-painted via the contracted
   `[data-part="trigger"][data-mode="expand"]` PLAIN descendant selector (a `--primary`
   tint backplate — NOT a `:deep()` reach). Click → the fullscreen overlay renders a
   BRANDED top toolbar ("Branded toolbar" + an `X` Close button) from the
   `#fullscreen-chrome` named slot REPLACING the corner `<Minimize2>`. The Close button
   (its `collapse()` callback) AND Escape both exit; the body-lock still fires — the
   behaviour is unchanged, only the chrome swapped.

3. **`#expand-trigger` replacement — third section.** A consumer-rendered "Open" button
   (its own glyph + label) replaces the corner expand affordance via the
   `#expand-trigger` named slot; its `expand()` callback flips the same `v-model:open`,
   so the teleport + lock + Escape are still the library's.

A human reads: **the chrome is the consumer's; the mechanism is the library's.**

## Gate

`proof:expandable-part` — born-RED on HEAD (10 violations: EP1 all five re-skin
hooks absent, EP2 the two named slots + the flip-the-same-model callbacks absent) →
GREEN at the fix (EP1 re-skin hooks + EP2 replacement slots with the today-default
fallback + no parallel state + EP3 the behaviour byte-untouched anti-fork freeze +
EP4 AR-7 stayed a seam, no new component, + per-clause self-test bites).

## Capture (orchestrator — live π over :5199, both modes)

<!-- pending-orchestrator-capture: /containers/expandable-container default + re-skinned
     instances, light + dark; the overlay un-walled (glass-overlay, not clipped),
     the body-lock fires, Escape exits, the branded #fullscreen-chrome toolbar + the
     [data-part] re-skin paint. -->
