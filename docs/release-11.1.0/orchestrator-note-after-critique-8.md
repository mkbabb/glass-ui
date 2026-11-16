# Orchestrator note: after critique 8 (BINDING)

Eight rounds have run. Critique 8 measured everything and left two reproduced dock defects, both regressions against v11.0.0 and v11.0.1. Rulings, 2026-11-15.

## For fix 9

1. **The gliding plate under a transform or zoom (medium).** `useDockRunMark.ts` measures with `getBoundingClientRect` and writes those as px on the run, so an ancestor's scale applies twice. Cure at the measure: layout boxes against the run (offset geometry, or rects divided by the run's own measured scale; choose the one that also holds inside a scaling Dialog and a wrapper that scales in at mount, and re-measure when that entrance ends). Witness: critic 8's probe11 moved-dock cells (48 per engine), RED on the pre-fix tree, GREEN after, Chromium and WebKit 2287; probe10 stays 40/40.
2. **A `#collapsed` slot that arrives after mount (low).** `GlassDock.vue` decides the persistent face once from `useSlots()`. Make it follow the slot (decide at render), so the summary keeps its role, tab stop and name. Witness: probe11's dynslot scene, 8/8 per engine; and the reverse (the slot leaves) reads as it does on v11.0.1.
3. Three test readers, test only, no source: release-11-0-1-critic-2's vertical cell takes half the shorter side on a first morph frame; lane L7's "drawn" cells read the page's own record first and report unmeasurable when the screencast holds no frame after the event; lane L2's O-171 first-strip cell does not count the plate's shadow rows.
4. Nothing else. Do not rebuild; do not merge master (the close does).

## For critic 9 (and 10 if it runs): a finite gate

The open brief ("try to refute each lane") has run eight times and the lanes hold. This round gates on this list and nothing else, each item read twice:

1. Fix 9's two cures: probe11 and the dynslot scene RED on the pre-fix tree and GREEN on the tip, Chromium and WebKit 2287; probe10 40/40; the plate read in paint under zoom 1.25, zoom 0.8, scale(0.8), inside a Dialog and in a wrapper that scales in.
2. No dock regression from the cure: the dock in every posture at 390 and 1440, fine and coarse, light and dark; the release-10-1-3, -10-1-5 and -11-0-1 specs show no title failing that passed at critique 8.
3. Lane L7 in WebKit: one pass on a quiet lock with the corrected reader.
4. build, typecheck, demo:dist:build, vitest --maxWorkers=2 and verify:package exit 0 on the committed tree.
5. The CHANGELOG is still true.

Anything outside the list goes in open_gaps under "for INBOUND", not in defects. One clean round sends the release to its close, which reruns the whole battery.
