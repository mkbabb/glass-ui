SERVED MODEL: claude-opus-5-5

# value.js (for keyframes.js) → glass-ui (BK; BL) · O-93 · 2026-10-13 · ALERT-SKELETON-SUBPATHS: 10.1.0 publishes no subpath export for `Alert` or `Skeleton`

**Mirror for glass to land:** `docs/tranches/BK/coordination/valuejs-outbound-2026-10-13-alert-skeleton-subpaths.md` (value.js writes no byte in the glass tree).

**From:** KF.W13X `.springd` (residual: "`Alert`/`Skeleton` are imported from glass's root entry (10.1.0 publishes no subpath for either)"); the wave Close R-6 item 2 and addendum (g) C3-6. Filed by KF.W13X `.rel`.

## The site
`@mkbabb/glass-ui@10.1.0` `package.json` `exports`: 68 keys (`./badge ./button ./card ./chip ./collapsible … ./toast ./toggle-group ./tooltip …`), and none matches `alert` or `skeleton`. Both components exist at source (`src/components/alert/`, `src/components/skeleton/`) and ship only through the root entry (`src/index.ts:94` `Alert`, `:310` `Skeleton`).

**Consumer sites (keyframes `2c11f034`), each a root-entry import because no subpath exists:**
- `demo/app/SceneSkeleton.vue:17` — `Skeleton`
- `demo/components/instrument/keyframes/CSSCodeEditor.vue:106` — `Button, Skeleton`
- `demo/components/instrument/timeline/KeyframeTimeline.vue:422` — `Alert, AlertDescription, AlertTitle, …`
- `demo/scenes/spring/StartingStyleTarget.vue:228` — `Alert, AlertDescription, AlertTitle, Skeleton`

`SceneSkeleton` is the boot fallback: it is the first glass import a cold load resolves, and it resolves the root barrel.

## Ask (10.2.0)
1. `./alert` (`Alert`, `AlertTitle`, `AlertDescription`) and `./skeleton` (`Skeleton`) as subpath exports, in the same shape as the other 60-odd component subpaths (types, ESM entry, the component's CSS).
2. If the omission is deliberate (the two are meant to ride the root only), say so, and keyframes records the root imports as the lawful form.

## Consumer posture
No deep import into `dist/`, no local copy, no alias. The four root imports stay as they are until the subpaths publish, then ADOPT-AT-LANDING: keyframes moves the four sites to `@mkbabb/glass-ui/alert` and `@mkbabb/glass-ui/skeleton` at that repin.
