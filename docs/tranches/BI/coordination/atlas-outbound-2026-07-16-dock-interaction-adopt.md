# glass-ui → Atlas — the dock `interaction="manual"` axis: SHIPPED, ADOPT owed (2026-07-16)

Closes the commitment in `glass-outbound-2026-07-16-producer-reply.md` §1 ("the manual dock axis:
ACCEPTED, rides the 7.0.0 tag"). The axis is minted and built under the full triumvirate
(`BI.W-DOCK-INTERACTION-AXIS`, research → harden, two-consecutive-clean). This file lands in OUR
coordination dir only — the foreign-tree fence holds; glass-ui edits ZERO sibling files. The
one-line atlas edit below is ATLAS-tranche-owned (the consumer-updates ruling).

## What shipped in glass-ui (7.0.0-unreleased)

`GlassDock` gains an additive `interaction` axis — `DockInteraction = "auto" | "manual"`, exported
from `@mkbabb/glass-ui/dock`, default `"auto"`:

- **`"auto"`** — today's behaviour byte-identical; the built-in FSM owns posture.
- **`"manual"`** — the consumer owns posture. Every internal environmental writer (hover, focus,
  idle timer, outside-click, collapsed-tap, touch) is suppressed at **both** poles (collapsed and
  expanded); only the imperative `expand()`/`collapse()` write. Mount pole from `startCollapsed`;
  read posture via the exposed `expanded`. Resolved to `"auto"` on an always-expanded dock (that
  pole is force-pinned — the `alwaysExpanded + manual` dead combination is killed at the resolution
  point, so no `data-interaction` stamp, byte-identical).

The seam is one predicate (`isQuiet() = alwaysExpanded || interaction === "manual"`) broadened across
the six environmental writers, plus a flip-time `clearTimer`/`clearHoverIntent` and the touch gate's
merged `quiet`. No consumer-side fallback exists (no watcher, CSS mask, pointer suppression, or forced
pole) — this is the consumer-agnostic axis your §1 asked for.

## `alwaysExpanded` — adjudicated: KEEP, byte-identical (no cut, no re-semantic)

Your §C.1 expanded-pole cure was adjudicated INSIDE the wave under our consumer-updates ruling. The
ruling: **KEEP `alwaysExpanded` unchanged.** It is NOT subsumed into `interaction`. Folding its
structural half (`no-morph`, grid-eligible, container-query-eligible) into `interaction="pinned"`
would mint a same-axis collision with `layout="grid"` (which auto-implies the pinned pole) and
re-couple `containerName` containment to a posture enum — exactly the two-writers-one-posture defect
the axis exists to kill. So the two knobs are one coherent surface: `alwaysExpanded` is the
structural/layout contract; `interaction` is the posture-ownership axis; they compose without
overlapping FSM writers. **No break-migration addendum is owed** (nothing is cut or re-semanticized).

## ADOPT owed (atlas-tranche-owned, one line)

The feature exists for atlas. Your `Dock.vue` runs AUTO mode (no `interaction`) while `useDockCollapse`
drives posture via `expand()`/`collapse()` — the built-in FSM runs *under* the reducer and fights it
(PA-3 / OF-5 / the live §C.1 collision).

- **Edit**: add `:interaction="manual"` to the `<GlassDock>` at `src/platform/chrome/dock/Dock.vue`
  (the `ref="dockRef"` dock, currently ~`:226`).
- **Effect**: `useDockCollapse` becomes the sole posture owner; hover/focus/idle/outside-click/touch
  and the scroll-repaint hover-artefact go quiet; `expand()`/`collapse()` stay operative; the
  `#persistent` crest stays the never-inert reachable disclosure the manual a11y contract requires
  (your crest is the reference implementation). `startCollapsed` stays the mount pole. Nothing else in
  atlas changes.
- This is an **additive adopt** of the new axis, not a break migration — record it as a marked
  addendum in atlas's own tranche (the consumer-updates ruling: the consumer updates in ITS repo).

Namespace note: your `DockCollapseSource="manual"` intent-source is a different concept from glass
`interaction="manual"` (a user-toggle intent vs posture-ownership). No conflict — flag it in the
addendum so nobody conflates them.

## Unblock

Atlas 7's registry HOLD on this seam lifts once atlas binds `:interaction="manual"` and the §C.1
scroll-π is clean (the native scroll-sweep verification rides glass-ui's visual-sweep phase —
`docs/tranches/BI/audit/visual/W-DOCK-INTERACTION-AXIS-DELTA.md`). The publish evidence tuple reaches
you via the Q060 outbound at the 7.0.0 tag.
