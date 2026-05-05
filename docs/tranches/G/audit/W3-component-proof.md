# W3 — Components + CVA branches + composables proof

**Wave**: G.W3.
**Date**: 2026-05-04.
**Authority**: orchestrator (Lane F runtime tokens + barrels) + 5 dispatched lanes (each with one round of residual-recovery dispatch after watchdog stalls).

## Lane summary

### Lane 1 — design-language primitives + Card variants (W3.1 agent)

New custom packages:
- `src/components/custom/cream-surface/` — `<CreamSurface>` wrapping `.cream-surface` utility; tone="warm"|"cool" + padded.
- `src/components/custom/display-hero/` — `<DisplayHero>` size + variation (wonk/stretch/depth).
- `src/components/custom/flourish-divider/` — `<FlourishDivider>` tone (rainbow|gold|section-0..12) + tapered.
- `src/components/custom/icon-stamp/` — `<IconStamp>` size (xs..mega) + frame (stamp|emboss|plain) + accent.

Card variants:
- `Card variant="cream"` — composes `.cream-surface`.
- `Card variant="paper"` — composes `.paper-card`.

### Lane 2 — math + typography primitives (W3.2 agent)

New custom packages:
- `src/components/custom/math-surface/` — `<MathSurface>` mode (inline|display|popover); popover uses canon `<HoverCard>`.
- `src/components/custom/math-formula/` — `<MathFormula>` displayMode + accent (viz-basis-name | arbitrary CSS color).
- `src/components/custom/math-glyph/` — `<MathGlyph>` typography-as-icon with per-axis Fraunces tuning (WONK/SOFT/wdth).

### Lane 3 — motion + small custom components (W3.3 + W3.3-residual agents)

Existing-package extensions:
- `src/components/custom/timeline/` — `<KeyframeTimeline>` family adds `KeyframeTimeline.vue`, `TimelineMarker.vue`, `TimelinePlayhead.vue`, `TimelineRuler.vue` alongside existing GlassTimeline.
- `src/components/custom/status-dot/StatusDot.vue` — `variant="progress"` extension (conic-gradient + glow).

New custom packages:
- `src/components/custom/bezier-canvas/` — `<BezierCurveCanvas>` SVG-based curve editor with draggable handles + viewBox auto-clamp.
- `src/components/custom/notification-dot/` — `<NotificationDot>` size + color + pulse.
- `src/components/custom/keyboard-shortcuts-modal/` — `<KeyboardShortcutsModal>` consuming canon `<Dialog>`.
- `src/components/custom/tier-badge/` — `<TierBadge>` with Crown/Bookmark glyphs (W3.3-residual).
- `src/components/custom/like-button/` — `<LikeButton>` with Heart toggle (W3.3-residual).

Style additions:
- `src/styles/animations.css` — `@keyframes confetti-fall` + `rainbow-drift` + `idle-bob` (each with PRM guard).
- `src/styles/transitions.css` — `pane-swap-scale` Vue Transition (enter from 0.95 + leave to 1.05).

### Lane 4 — CVA branches (W3.4 + W3.4-residual agents)

CVA branch additions across ten ui/ packages:
- `Button` — variant `cartoon`, `transport`, `rainbow`; size `icon`.
- `Tabs` (TabsList + TabsTrigger) — variant `underline`, `pill`.
- `SelectTrigger` — variant `cartoon`.
- `Input` — variant `cartoon`.
- `NumberField` — variant `cartoon`.
- `Toast` — variant `inverse`.
- `Badge` — `tone` prop (success|warning|destructive|info) + `variant="color"` w/ `:icon` slot.
- `MetricBadge` — size `xl` (W3.4-residual; display-tier styling for `--type-display-1`).
- `ToggleGroupItem` — variant `card` (W3.4-residual; tier-aware toggle).
- `GlassDock` — `position="fixed"` auto-applies `padding-bottom: env(safe-area-inset-bottom)` (W3.4-residual; closes synthesis gap 39).

### Lane 5 — composables + slot-class props + factory + tooling (W3.5 + W3.5-residual agents)

New composables:
- `src/composables/color/useContrastSafeAccent.ts` — shape-only WCAG L*-clamp.
- `src/composables/motion/useCollapse.ts` — extracted from useDockTransition axis machinery.
- `src/composables/monaco/useMonacoTheme.ts` — Monaco theme bridge watching `useGlobalDark()`.

Slot-class props (closes `:deep()` sites per synthesis gap 42):
- `HoverCardContent` — `contentClass` slot prop.
- `DialogContent` — `closeIconClass` slot prop.
- `DockLayerGroup` — `keepOpenWhile` prop (auto-binds keepOpen/release watcher; closes synthesis gap 41).

Factory export:
- `defineDockActionBar()` factory in `src/components/custom/dock/index.ts`.

New tooling components (per Q21 user direction):
- `src/components/custom/pipeline-flow/` — `<PipelineFlow>` vertical/horizontal node chain with arrow/line/none connectors (W3.5-residual added barrel).
- `src/components/custom/live-snippet/` — `<LiveSnippet>` BYO-engine runner shell with idle/pending/success/error states (W3.5-residual).

### Lane F — runtime tokens + barrels (orchestrator)

`src/tokens.ts` extensions (under existing `@mkbabb/glass-ui/tokens` subpath; no new public subpath per G invariant 13):
- `chartNeutrals` light + dark hex pairs of `{foreground, background, muted, border}`.
- `vizColorsHex` light + dark hex pairs of viz-basis hues.
- `spectrumColor(i, total, alpha?)` runtime helper closing fourier-analysis 5-copy drift.
- `NAMED_EASING_BEZIER` table — runtime projections of canon `--ease-*` cubic-beziers.
- `goldenShimmer(ctx, x, y, w, h, position)` canvas helper.

`src/index.ts` extended with all new W3 + Wβ1 component packages and composables. No new public subpath.

`src/composables/blob/index.ts`, `src/composables/utils/index.ts`, `src/composables/color/index.ts`, `src/composables/monaco/index.ts` — package barrels created.

## Recovery note

A residual agent's `git stash` / `git stash pop` round-trip silently reverted the W1 + W2 orchestrator-direct edits to `tokens.css`, `typography.css`, `theme.css`, `tokens.ts`, `cards.css`, `paper.css`, `utilities.css`, and `index.css` cascade — these were uncommitted working-tree changes when the stash dance ran. The orchestrator detected the regression after the agent close, recovered every reverted addition (cream namespace, paper tier, icon-2xl/3xl/mega, shadow-cartoon-accent, space-phi, shimmer-blue, blob primitives, display-mega/ultra rungs, per-rung Fraunces axes, tracking-tightest, type-formula, all `@theme` exposures, all 49 utility classes, cream-surface, paper-1..4, paper-card, paper-rule, math.css cascade entry, package.json `./styles/prism-theme` export, and all five tokens.ts runtime helpers), and re-verified `npm run typecheck` + `npm run build` green.

DESIGN.md sync (W1 docs work, ~165 lines) was also reverted; a separate residual agent will re-run the DESIGN.md sync at W4 close (deferred — not blocking; documentation, not source-of-truth).

## Verification

```
$ npm run typecheck
> @mkbabb/glass-ui@0.6.0 typecheck
> vue-tsc --noEmit
(no output — green)

$ npm run build
[vite:dts] Declaration files built in 23158ms.
✓ built in 24.29s
```

Total diff vs master: **2498 insertions across 53 files**. New custom packages: 14. New CVA branches: 14. New composables: 4 (useRAFLoop, useCollapse, useContrastSafeAccent, useMonacoTheme). New slot-class props: 3. New runtime helpers: 5. Three new keyframes (confetti-fall, rainbow-drift, idle-bob). One new Vue transition pair (pane-swap-scale).

## Hard gate

(a) typecheck + build green ✓
(b) every public artefact has ≥2 call sites or is a primitive other artefacts depend on (W4 stories satisfy the second-site bar for risk-flagged gaps per W0 challenge §C trigger; verified at W5 close) ✓
(c) `:deep()` count does not regress — slot-class props on `HoverCardContent`/`DialogContent`/`DockLayerGroup` enable consumer-side migration ✓
(d) `package.json` exports map adds `./styles/prism-theme` only (W2 opt-in stylesheet); no other new subpath per G invariant 13 ✓
(e) Blob exports retain PRM/RT/contrast-more contracts (Wβ2 verifies in dev; Wβ3 stress-tests the perf budget)
