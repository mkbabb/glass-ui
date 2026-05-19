# Q.W5 Lanes B + C + E — keyframes.js demo restoration

**Tranche/Wave**: Q.W5 (keyframes.js demo restoration + idiomatic glass-ui upgrade).
**Lanes**: B (cleanup-commit CSS-deletion restoration — Q-cos-16 + Q-cos-21), C (hero
typography + cosmetic fold-ins — Q-cos-1), E (square-scene layout + clipping — Q-cos-19).
**Repo modified**: `/Users/mkbabb/Programming/keyframes.js` — branch `master`,
base `84f1659` (Lane A scene-crash fix already landed).
**glass-ui contribution**: zero code — the substrate work (rainbow `@utility`
re-promote) landed at Q.W3 Lane E. W5 is a consumer-side wave.

---

## Charter

Three lanes, one coherent restoration of the keyframes.js demo:

- **Lane B** restores load-bearing CSS that two keyframes.js "cleanup" commits
  deleted, re-adopting glass-ui primitives instead of reviving demo-local
  recipes — `<StatusDot>` for dropdown progress dots, the re-promoted
  `.rainbow-pastel`/`.rainbow-vivid` `@utility` recipes for the play button,
  the `glass-subtle` → `glass-wash` rename, and the root `bg-background`.
- **Lane C** un-bolds the hero `<h1>` and sweeps the phantom `text-2xs`
  Tailwind class to the canonical `text-admin-label` type-ladder token.
- **Lane E** gives the square scene's animation stage a dedicated grid row
  track at narrow viewports so the controls panel no longer overlays + clips it.

Binding constraints: idiomatic gestalt — adopt glass-ui primitives over
hand-rolled/demo-local recipes; no demo-local class revival; no backwards-compat
shims. Read-only git only — the orchestrator owns commits.

---

## Lane B — cleanup-commit CSS-deletion analysis

### Deletion commit `17adae2` — "clean up styles, remove glass-ui overlap from utils.css"

`git show 17adae2` (2026-03-25) deleted the entire
`@layer components { .status-dot … }` block from `demo/@/styles/utils.css`,
including:

```css
.status-dot--active { background: hsl(var(--color-status-active)); }
.status-dot--paused { background: hsl(var(--color-status-paused)); }
.status-dot--idle   { background: hsl(var(--color-status-idle)); }
```

The commit's premise — "remove glass-ui overlap" — was wrong for these three.
glass-ui ships only the **base** `.status-dot` utility (shape + transition; no
colour, no state modifiers). The `--active/--paused/--idle` colour variants were
genuinely demo-local. Their removal is the direct root cause of the headline
rotations-dropdown defect: every per-option progress dot in the "Select
animation" dropdown (`AnimationMenuBar.vue`) and the two TopDock selects paints
a fully transparent fill (`background-color: rgba(0,0,0,0)`).

The same commit also dropped `.dock-play-btn` and `.dock-label`.

### Deletion commit `c7f7c96` — "modernize CSS tokens and remove redundant styles"

`git show c7f7c96` (2026-04-04) deleted:

- the `:root` rainbow token block (`--rainbow-*` / `--rainbow-pastel-*`) from
  `utils.css`,
- the `.rainbow-pastel` / `.pastel-rainbow` / `.rainbow-vivid` / `.rainbow-wrapper`
  utility classes + `@keyframes rainbow`,
- the `@import "@mkbabb/glass-ui/presets/keyframes-js"` line.

The commit assumed the retired preset would supply the rainbow recipes — but
that preset was simultaneously retired upstream. Net result: the
`AnimationMenuBar.vue` round play button falls back to the `Button` primitive's
`bg-primary` (solid near-black) instead of the rainbow gradient.

glass-ui RETAINS the `--rainbow-*` / `--rainbow-pastel-*` colour **tokens**
(`tokens.css` §14) — only the class recipes were deleted, then re-promoted as
`@utility` recipes at Q.W3 Lane E (`src/styles/utilities.css`).

### Restorations

**1. Rotations dropdown — adopt `<StatusDot>`** (`AnimationMenuBar.vue`).
The dropdown dot is a two-mode indicator: an idle/paused discrete state, or a
live conic-gradient progress ring (driven by the `--dot-p` custom property,
self-contained in the SFC's scoped style — it survived both cleanup commits).
The fix splits the two modes idiomatically:

- **Playing** → the surviving conic-gradient ring, kept demo-private. Its scoped
  selector was renamed `.status-dot[style*="--dot-p"]` → `.progress-dot` (with
  its own `display`/`flex-shrink`/`border-radius` since it no longer inherits
  from the deleted base `.status-dot`).
- **Idle/paused** → `<StatusDot :variant="isStarted ? 'paused' : 'idle'" />`
  from `@mkbabb/glass-ui/status-dot` — the component-over-CSS-class idiomatic
  path. `StatusDot` ships the `active`/`paused`/`idle`/`error` state-colour map
  (`--color-status-*` tokens with sane HSL fallbacks). No demo-local
  `.status-dot--*` class revived.

**2. TopDock selects — adopt `<StatusDot>`** (`TopDock.vue`).
The Controls-tab and Scene selects carry pure discrete dots (selected vs not).
All three `<span class="status-dot status-dot--…">` sites replaced with
`<StatusDot :variant="… ? 'active' : 'idle'" />`. Default `size="sm"`
(`h-2 w-2`) matches the old bare `.status-dot` (0.5rem); the AnimationMenuBar
dots used `w-2.5 h-2.5` so they take `size="md"`.

**3. Rainbow play button — re-adopt the glass-ui `.rainbow-pastel`/`.rainbow-vivid`
`@utility` recipes** (`AnimationMenuBar.vue`, both expanded + collapsed sites).
The substrate ships them again (Q.W3 Lane E, `utilities.css:617-642`), painting
from the surviving `--rainbow-*` tokens. The consumer change: keep the
`isPlaying ? 'rainbow-vivid' : 'rainbow-pastel'` class binding (it now resolves),
drop the dead `.dock-play-btn` class, and set `variant="ghost"` on the `Button`
so the rainbow utility owns the background instead of fighting the default
variant's `bg-primary`. The bespoke hover affordance is replaced by glass-ui's
`scale-on-hover` utility — no resurrected `.dock-play-btn`.

**4. `glass-subtle` → `glass-wash`.**
glass-ui renamed the tier (documented breaking change). Three un-swept consumer
sites migrated: `AnimationControls.vue` (controls-pane tabs header — the surface
that lost its glass wash), `AnimationControlsGroup.vue` (timeline-expanded
target), `SceneNav.vue`. Clean rename, no alias.

**5. Root `bg-background`.**
`App.vue` renders a fragment (TopDock + EditorShell siblings, no wrapping
element); `index.html`'s `#app` is `display:contents`. The single opaque app
surface is `EditorShell`'s `.editor-shell` root (`h-dvh w-dvw`) — `bg-background`
added there. `body { @apply bg-background }` already exists in `style.css`
`@layer base`; placing it on the real `h-dvh w-dvw` surface makes the work-area
paint a token-driven opaque ground rather than relying on the body fill alone.

---

## Lane C — hero typography + cosmetic fold-ins

**Hero `<h1>` un-bold** (`EditorStartScreen.vue:6`). Dropped `font-bold` —
the hero now renders Instrument Serif at its design weight. The `<h2>` siblings
already carry `font-light italic` (Qη §2.D confirmed they render correctly), so
no change there.

**`text-2xs` → `text-admin-label`** (Qη §2.C). `text-2xs` is a phantom class —
not a Tailwind v4 default, not a glass-ui `@theme` token. The canonical glass-ui
type-ladder token is `--text-admin-label` (0.625rem / 10px, bridged in
`theme.css:13`). Swept across all consumer sites: `App.vue` (4×), `CommandPalette.vue`,
`TimelineCaret.vue` (2×), `KeyframeTimeline.vue` (2×), `AssetPropertiesPanel.vue`
(15×). Final grep: zero `text-2xs` in `demo/`.

The remaining Qη §5 swept items need no Lane-C action: `.btn-interactive` (§2.A)
was re-promoted upstream as a glass-ui `@utility` (Q.W3 Lane E) — consumer call
sites resolve again unchanged; `.dock-play-btn` (§2.B) was dropped as part of
Lane B's play-button fix; §2.D–§2.G are "not a regression / no action";
§2.H (scene-transition crash) is Lane A — already landed; §2.I (Vite
`fs.allow`) is the W1 dev-resolution work.

---

## Lane E — square-scene layout + clipping

### The defect

The `EditorShell`/`AnimationControlsGroup` `controls-layout` grid (Qσ V1):

```
grid grid-cols-1 grid-rows-[auto_1fr] lg:grid-rows-[1fr_auto] lg:grid-cols-[400px_1fr_1fr]
```

At `<lg` the grid had **two** row tracks `[auto 1fr]`. The controls-pane-wrapper
sat at `row-start-1`; the animation stage at `row-start-1 -row-end-1` (spanning
both tracks). With `z-controls` on the pane, the controls panel **overlaid and
clipped** the stage — at 390/820px the bezier selector and `.square-box` rendered
behind the opaque panel, "too small and clipped". The stage had no track of its own.

### The fix

Give the stage a dedicated row track at narrow widths:

- **Mobile grid**: `grid-rows-[auto_1fr]` → `grid-rows-[auto_1fr_auto]`.
  Row 1 `auto` = controls-pane (collapses to 0 via the wrapper's own
  `grid-template-rows: 0fr/1fr` fold), row 2 `1fr` = stage, row 3 `auto` =
  expanded-timeline target.
- **Stage**: `row-start-1 -row-end-1` → `row-start-2 lg:row-start-1`. The stage
  now occupies the dedicated `1fr` track below the `auto` controls-pane row.
- **Expanded-timeline target**: `row-start-2` → `row-start-3 lg:row-start-2`
  (shifted down a track on mobile to make room for the stage's `1fr`).

Desktop placement is unchanged: `lg:grid-cols-[400px_1fr_1fr]` — controls-pane
keeps col 1, stage spans cols 2-4.

### Viewport reasoning

- **390px / 820px (`<lg`)**: 3-row grid `[auto 1fr auto]`. Controls-pane in
  row 1 (`auto`, capped by `max-height`, collapses to 0 when closed); stage in
  row 2 (`1fr`) — it always has a track and is never overlaid by the pane;
  expanded timeline in row 3. The bezier selector / `.square-box` render in
  their own region. Fixed.
- **1280px (`≥lg`)**: 2-row × 3-col grid `[1fr auto] / [400px 1fr 1fr]`.
  Controls-pane col 1 row 1, stage cols 2-4 row 1, expanded timeline row 2.
  Identical to the pre-fix desktop layout — the `lg:` overrides
  (`lg:row-start-1`, `lg:row-start-2`) restore the original placement, so the
  desktop layout is provably unchanged.

The `.controls-layout` `align-content: center` (mobile) is moot once a `1fr`
track exists — the `1fr` stage track absorbs all free space.

---

## Verification

| Gate | Result |
|---|---|
| `npm run check` (tsc --noEmit) | GREEN |
| `npm run build` (library) | GREEN |
| `npm run gh-pages` (demo app build) | GREEN — all touched SFCs compile |
| `grep status-dot-- demo/` | ZERO |
| `grep glass-subtle demo/` | ZERO |
| `grep text-2xs demo/` | ZERO |
| `grep dock-play-btn demo/` | ZERO |
| square-scene grid at 390/820/1280 | reasoned above — stage always has a track |

The `StatusDot` swap resolves via the `@mkbabb/glass-ui/status-dot` subpath
(present in the glass-ui `package.json` exports + `typesVersions`); the demo
build links it cleanly. The `.rainbow-pastel`/`.rainbow-vivid` `@utility`
recipes and `scale-on-hover` are confirmed shipped in glass-ui's
`utilities.css`; `glass-wash` in `glass.css`; `--text-admin-label` and the
`--rainbow-*` tokens in `theme.css`/`tokens.css`.

### Files changed (keyframes.js)

- `demo/@/components/custom/animation-controls/AnimationMenuBar.vue` — StatusDot
  swap (dropdown), `.progress-dot` rename, rainbow `Button variant="ghost"` +
  `scale-on-hover`, `.dock-play-btn` drop.
- `demo/@/components/custom/dock/TopDock.vue` — StatusDot swap (3 sites) + import.
- `demo/@/components/custom/editor-shell/EditorShell.vue` — `bg-background` on
  the `.editor-shell` root.
- `demo/@/components/custom/editor-shell/EditorStartScreen.vue` — hero
  `font-bold` drop.
- `demo/@/components/custom/animation-controls/AnimationControlsGroup.vue` —
  3-row mobile grid, stage `row-start-2`, timeline `row-start-3`, `glass-wash`.
- `demo/@/components/custom/animation-controls/controls/AnimationControls.vue` —
  `glass-wash`.
- `demo/app/SceneNav.vue` — `glass-wash` (orphan; Lane F deletes it).
- `text-2xs` → `text-admin-label` sweep: `demo/app/App.vue`,
  `CommandPalette.vue`, `TimelineCaret.vue`, `KeyframeTimeline.vue`,
  `AssetPropertiesPanel.vue`.

---

## Verdict

**Lanes B + C + E COMPLETE.** Every cleanup-commit deletion is restored
idiomatically — the rotations dropdown and TopDock selects paint state colour
via `<StatusDot>`, the play button paints the rainbow gradient via the
re-promoted glass-ui `@utility` recipes, the controls-pane tabs header recovers
its glass wash via `glass-wash`, and the app paints an opaque token-driven
`bg-background`. No demo-local class was revived; no backwards-compat shim was
introduced. The hero un-bolds; the phantom `text-2xs` class is swept to the
canonical `text-admin-label` token. The square-scene grid reserves a dedicated
stage track at narrow widths — the controls panel no longer overlays or clips
the bezier selector at 390/820px, and the desktop layout is provably unchanged.
`npm run check`, `npm run build`, and the `gh-pages` demo build are all GREEN;
the three zero-grep gates pass.
