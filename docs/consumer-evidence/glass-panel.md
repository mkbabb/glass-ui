# GlassPanel

## Artefact path

`src/components/custom/glass-panel/` (the published subpath `@mkbabb/glass-ui/glass-panel`).
Its component-local dependency `src/composables/glass/useGlassRenderer.ts` (the
`useGlassRenderer`/`createGlassFilter`/`destroyGlassFilter` detection-cascade cluster) is RESTORED
with it — imported directly by `GlassPanel.vue` via relative path, NOT re-exported through the
`composables/glass` root barrel (the E4-3 barrel-seat retire still holds; the cluster earns its
weight only as GlassPanel's internal renderer).

## Verdict

`keep-current` — **RESTORED at AZ.W-PRUNE2 on the live keyframes.js binary consumer.** The
AY/AZ prune census (W-PRUNE/W-SB1) wrongly counted GlassPanel as a 0-consumer orphan and retired
it (component dir + `/glass-panel` subpath + api seats + demo story + the tiers gate, deleted at
`c90f4aee`). The census missed keyframes.js: it is a live external binary consumer of
`@mkbabb/glass-ui/glass-panel`. Consumer-truth wins — the surface un-prunes. `GlassPanel` is the
five-rung glass tier ladder (`wash`/`quiet`/`resting`/`floating`/`overlay`) over a renderer-tier
detection cascade (svg-filter / css / fallback) — a substrate, not a UI primitive; the renderer is
its headline differentiator from `<Card>`.

## Consumer proof (re-runnable; re-grounded AZ.W-PRUNE2 2026-06-11)

**External consumers — 1 (keyframes.js, the binary consumer at the committed HEAD).**

```bash
# committed keyframes HEAD — the census record the RESTORE ruling rests on:
git -C ~/Programming/keyframes.js show HEAD:demo/@/components/custom/EasingCurveCanvas.vue \
  | grep -n 'GlassPanel\|glass-panel'
#   2:    <GlassPanel
# 102:    </GlassPanel>
# 107:import { GlassPanel } from "@mkbabb/glass-ui/glass-panel";
```

`keyframes.js/demo/@/components/custom/EasingCurveCanvas.vue` imports `GlassPanel` from
`@mkbabb/glass-ui/glass-panel` and mounts it as the canvas-wrapper glass chrome — the editor's
easing-curve substrate panel.

**Internal consumers — 1 demo (the showcase story, NOT counted).**

```bash
grep -rln 'GlassPanel' demo/   # → demo/stories/substrates/glass-panel.vue (own-route showcase — own-story exclusion)
```

## In-flight migration — the re-audit trigger

There is an UNCOMMITTED working-tree migration in keyframes.js (a sibling lane, edits NOT yet
committed at this wave's HEAD) that re-expresses the canvas wrapper with a local `glass-wash` class
instead of `<GlassPanel>`. Until that migration COMMITS, the committed keyframes HEAD is the binding
record and the binary consumer is live. The named re-audit signal: when the keyframes.js migration
COMMITS (the `EasingCurveCanvas.vue` glass-wash re-expression replaces the `<GlassPanel>` mount in
the keyframes HEAD), re-grade this artefact — if no second external consumer has arrived, RETIRE the
`/glass-panel` subpath + the api seats + the component dir again (a clean re-prune, honest this
time), and barrel-retire the `useGlassRenderer` cluster source with it.

## The named ≥2-consumer TRIGGER

The binding close-criterion is a SECOND real consumer composing `<GlassPanel>` (a sibling repo, a
deck slide, a library surface). When the second ships, record it here; the component clears the
≥2-consumer bar on its own.

## Re-audit proof

This document satisfies `proof:component-orphan` `keep-current` for `GlassPanel` while the committed
keyframes-HEAD grep finds the consumer. If both (a) the keyframes migration commits AND (b) no
second consumer has arrived, the verdict re-grades to `library-orphan` — formally re-retire the
subpath + export + the component-local renderer cluster.

**Re-audit date: 2026-09-01.**

## Cross-references

- `keyframes.js/demo/@/components/custom/EasingCurveCanvas.vue` (the external binary consumer at HEAD).
- `src/components/custom/glass-panel/GlassPanel.vue` (the five-rung ladder over the renderer cascade).
- `src/composables/glass/useGlassRenderer.ts` (the restored component-local renderer — off the barrel).
- `demo/stories/substrates/glass-panel.vue` (the showcase story — own-route, NOT a counted consumer).
- `scripts/proof-glass-panel-tiers.mjs` (`proof:glass-panel-tiers` — the per-rung CSS-seam gate).
