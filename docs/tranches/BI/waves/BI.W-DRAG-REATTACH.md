# BI.W-DRAG-REATTACH — the tabs `:draggable` double-kill (the reattach seam + the z-order occlusion)

Band B8 (prunes + consumer-truth / mechanism-local repair). Born-RED at HEAD.

## §Mandate

Discharges:
- **UF-H2** — "These are not draggable." (ss-18; the SegmentedTabs `:draggable` demo — the liquid tab is DEAD).
- **FAM-2 / MOTION-1 / bld:drag-reattach** (CHRONIC §2) — TWO independent kills, both live at HEAD (ARV lens
  re-confirmed via `elementFromPoint`).

## §Design

Decided mechanism (ROUND-1 FAM-2, source-verified — a decidable double-repair, no design loop). BOTH kills
must fall or the tab stays dead:

- **Kill A — the reattach seam never re-runs.** `useDragMorph.reattach()` (`useDragMorph.ts:311`) creates the
  lazy `Draggable` + resolves the snap centers, but it runs ONCE in setup (pre-mount, before the indicator
  element + button geometry exist) and nothing re-runs it: the consumer's watch is non-immediate over stable
  deps, so `reattach` is never called with a live element. FIX: the SegmentedTabs consumer arms `reattach`
  with `{immediate:true}` on the resolved indicator ref (and re-arms on resize/orientation flip — the geometry
  re-resolve path at `useDragMorph.ts:366-368` already exists, it just needs a live first call).
- **Kill B — the indicator is occluded by the tab buttons.** Even attached, `.segmented-indicator` is
  `z-0` (`segmented-tabs.css:84`) UNDER `.segmented-tab` `z-10` (`:234`), so `pointerdown` at the indicator
  center hits a button, never the draggable indicator (live `elementFromPoint(indicatorCenter)` returns the
  tab). FIX: while grabbing (the `dragging` state the consumer already tracks for `.glass-drag-lift`), raise
  the indicator ABOVE the buttons (`z-index` lift scoped to the grab state — compositor-only, no layout).
  The rest-state z-order is UNTOUCHED (the indicator paints behind the labels at rest — correct).

Clean break: no fallback, no "drag sometimes works" masking. The click-selection path stays byte-identical
(the drag is the additive `:draggable` axis; `select` + `squishOnTravel` untouched, per the W-DRAG-MORPH
contract).

## §Work

- `src/components/custom/tabs/*` (the SegmentedTabs consumer that calls `useDragMorph`) — arm `reattach()`
  with `{immediate:true}` on the live indicator ref; re-arm on the existing resize/orientation watcher.
- `src/styles/segmented-tabs.css` — add a grab-state z-index lift on `.segmented-indicator` (e.g. under a
  `[data-dragging]`/`.glass-drag-lift` scope) so the indicator sits above `.segmented-tab z-10` DURING the
  gesture only; the rest z-0 is unchanged.
- `src/composables/motion/useDragMorph.ts` — no engine edit; confirm `reattach` re-resolves centers on the
  immediate call (the geometry path at L366-368 already supports it).

## §Acceptance

Gate: **`proof:drag-morph`** (EXTENDED in place — the D5 reachability arm, no 2nd gate).
- **BORN-RED at HEAD**: (a) the consumer's `reattach` watch is non-immediate (the reattach-arms-live clause
  reds); (b) `elementFromPoint(indicatorCenter)` returns a `.segmented-tab`, not the indicator (the
  reachability clause reds).
- R-reattach — the SegmentedTabs consumer arms `reattach` immediately on a live indicator element (a driven
  `pointerdown` on the indicator arms `Draggable`).
- R-reach — a live `elementFromPoint(indicatorCenter)` DURING grab returns the indicator (not an occluding
  button); the grab-state z-lift is present and the rest z-order unchanged.
- Self-test bites: a non-immediate reattach reds R-reattach; an indicator kept z-0-during-grab reds R-reach.

## §π/DELTA

`tests-visual/drag-morph.spec.ts` (EXTEND — the liquid-tab arm; LOCAL-only, rides the B-close gestalt ceremony (W-GESTALT-LEDGER-FILE oracle + the close battery)):
- drive a real `pointerdown → pointermove → pointerup` on the pill indicator: the indicator FOLLOWS the
  pointer (frame-series translate), SQUISHES on travel, and FLINGS to the nearest tab on release (the
  drag-morph frame contract); the click path is un-regressed (a plain click still selects). Chromium + real
  WebKit, BOTH modes.

## §Obligations

- No cross-repo ask (internal SFC + CSS repair; the `:draggable` prop surface is unchanged — the a11y
  roving-tabindex is already correct per ARV "refuted clean").

## §Dispositions

- Terminalizes **bld:drag-reattach** (CHRONIC §2): BUILT (both kills). Liveness probe: a non-immediate reattach
  OR an `elementFromPoint(indicatorCenter)` returning an occluding button REDs (the gate carries the LIVE
  reachability assert the ROUND-1 disposition demanded).
