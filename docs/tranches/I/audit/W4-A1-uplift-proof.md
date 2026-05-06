# I.W4.A1 — Primitives Aesthetic Uplift (Set 1) Proof

**Date**: 2026-05-05
**HEAD anchor**: post-W3+W6+W5 close (`73c40fa`)
**Lane**: W4.A1 (8 primitives stories)
**Status**: COMPLETE — story-file edits landed; agent stream timed out before final response but all edits verified by orchestrator.

## Stories uplifted (8)

Each opens with the canonical wrapper:

```vue
<template>
    <div class="story-page">
        <CreamSurface tone="warm" class="relative overflow-hidden">
            <DisplayHero size="display-3" variation="wonk" :title="..." :subtitle="..." />
            <FlourishDivider tone="section-N" />
            <!-- existing functional demo content preserved inside -->
        </CreamSurface>
    </div>
</template>
```

| # | story | section accent | rationale |
|---|---|---|---|
| 1 | `demo/stories/primitives/badge.vue` | section-1 | vivid; small ornament — accent leads through dot leaders |
| 2 | `demo/stories/primitives/buttons.vue` | section-2 | warm; cartoon variants pair with section-2 |
| 3 | `demo/stories/primitives/checks.vue` | section-3 | check states layered with single-direction accent |
| 4 | `demo/stories/primitives/combobox.vue` | section-4 | functional surface; subtle warm accent |
| 5 | `demo/stories/primitives/dock-group.vue` | section-5 | instrument-cluster axis; pill-row reads against section-5 |
| 6 | `demo/stories/primitives/inputs.vue` | section-6 | input-pill chassis; cool accent for read |
| 7 | `demo/stories/primitives/label.vue` | section-7 | nested controls; quiet accent |
| 8 | `demo/stories/primitives/metric-badge.vue` | section-8 | viz-coloured stats; section-8 frames the inline-prose gesture |

## Verification

- `rg -l 'CreamSurface' demo/stories/primitives/{badge,buttons,checks,combobox,dock-group,inputs,label,metric-badge}.vue` — 8/8 hits
- `rg -l 'DisplayHero' demo/stories/primitives/{badge,buttons,checks,combobox,dock-group,inputs,label,metric-badge}.vue` — 8/8 hits
- `rg -l 'FlourishDivider' demo/stories/primitives/{badge,buttons,checks,combobox,dock-group,inputs,label,metric-badge}.vue` — 8/8 hits
- `npm run typecheck` — green
- `npm run build` — green
- `npm run test` — 266/266

## Residual

- W7 close ceremony re-runs the design-fidelity gate via Playwright; this lane self-attests that each story carries the canonical wrapper.
- Per W4.A2 + W4.C proof docs: dispatch language used `display-2` which is not a real `<DisplayHero>` rung; lanes substituted `display-3` (or `display-mega` for audacious specimens). Same disposition here — `display-3` is canonical for primitives.
