# AX.W06 — dock storybook honest rail + dock.css carve · live-capture DELTA

The dock.css monolith → cohesive partials carve + the storybook rail honesty.
Captured 2026-06-09 (shares the W61 unified-dock captures — same dock surface).

## Captures

| surface | light | dark |
|---------|-------|------|
| dock rail / showcase | `W61-rail-desktop-light.png` | `W61-rail-desktop-dark.png` |

## Verdict

**PASS.** `src/styles/dock.css` is now a thin 111-line `@import` root over the
cohesive `dock/{shell,morph,density,layers,layer-group,overflow}.css` partials
(each under the 500-line no-god-module budget), the shared four-state `:where()`
contract preserved, and `index.css`'s import order intact (`dock.css` then
`dock-controls.css`). `proof:dock-css-carve` green. The storybook dock rail renders
the honest unified nav pattern (see W61). Two demo stories that duplicated the dock
surface (`dock-with-slider`, `dock-active-tokens`) were retired with the manifest
re-synced (`proof:no-orphan-demo-route` + `proof:storybook-ia` green).
