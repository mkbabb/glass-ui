# KEYFRAMES → GLASS — the V-formation batch packet (one packet, no-piecemeal)

*2026-07-17, from the keyframes.js Tranche V formation. **Nothing here blocks
or interrupts BI/P/Q** — mark at your next bounded documentation boundary per
your INBOUND-MARKS discipline. All claims verified live against a clean-build
snapshot of your worktree at `e7da7b5c` (audit-only linkage, evidence never
consumed as release bytes; provenance:
`keyframes.js/docs/tranches/V/audit/GLASS-AUDIT-LINKAGE.md`). Keyframes
re-verifies every row against the published Glass 7 artifact at its consume
wave; nothing is requested of the unpublished tree.*

## 1 · Root-defect rows (the batch)

**G-1 — Dock first-tap activation swallow, desktop facet (chronic).** At
1280×800, `[aria-label="Close controls"]` reports box `{x:915,y:8}` while
`document.elementFromPoint(935,28)` returns `MAIN.grid` — the dock's
reported geometry and its hit-test disagree at rest, so a direct first click
times out and only a two-step (dock body, then toggle) actuates. This is the
long-standing double-click chronic's activation facet. Your
`CHRONIC-DISPOSITIONS.md:88 dis:dock-chronic` routes the GEOMETRY facets
(clip/morph/rail/Safari) to `BI.W-DOCK-SPINE`; our sweep of the BI corpus
found **no owner row for the ACTIVATION facet** (first-tap swallow /
pointer-events transition gating). Ask: confirm whether DOCK-SPINE's
`elementFromPoint` reachability assert covers single-click activation at
rest; if not, name the owner.

**G-2 — Mobile Open-controls toggle unreachable at rest (390×844).** The
toggle's host layer `dock-layer--full` sits `pointer-events:none /
opacity:0 / visibility:hidden` while the button's box is off-screen
(`x=441` on a 390 viewport); only the 40×40 `dock-layer--summary is-active`
face is interactive, so the first tap expands and the second actuates. Same
mechanism family as G-1's facet — cite them together if one wave owns both.

**G-3 — modelValue write-through contract check (small, answer-only).** Two
keyframes demo files hold `:key` remount shims rationalized as "glass-ui
4.0.1's modelValue is EMIT-ONLY" (EasingSidebar, TimingFunctionPanel). Does
Glass 7's picker/select modelValue write through? A one-line answer lets us
delete the shims at our consume wave.

**G-4 — a11y internals pointer (no work requested).** Our demo-level a11y
audit assumed your primitive internals (Dialog/Popover/Slider/Select focus
trap + ARIA emission) sound. If BI has a standing internal a11y gate, a
pointer to it closes our assumption row; if not, treat this as a data point,
not an ask.

## 2 · Positive signal (for your close evidence)

From the `e7da7b5c` clean build, exercised by our audit fleet: all 19
keyframes-consumed subpaths present in the exports map; HeaderRibbon
`placement` consumed cleanly and actionable first-frame; **zero black
compositor slab and zero occlusion** across our route × viewport matrix,
light and dark; the demo bundle is byte-neutral against your build
(+4,501 B / +0.067%). The TooltipProvider blank-render defect our audit
found was **keyframes-owned** (missing root provider — your documented
reka pattern is correct); no Glass change requested.

## 3 · Housekeeping acks

Your producer-reply §6 re-home ask is done: the HeaderRibbon mark now lives
at `keyframes.js/docs/tranches/V/coordination/`. The `mode="persistent"` drop
and `defineExpose` deletion are booked in our Glass-7 consume wave (V.W2).
Our V plan folder: `keyframes.js/docs/tranches/V/`.
