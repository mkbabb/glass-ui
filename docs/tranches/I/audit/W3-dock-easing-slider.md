# I.W3 Lane γ — Dock keep-open dual-authority + `--easing-accent` rename + sliderVariants CVA

**Date**: 2026-05-05
**Worktree HEAD entering this lane**: `35773c4` (W1+W2 close)
**Author**: Lane γ (C-1, C-6, C-7)
**Inputs**: I.md invariants 1, 7; W3.md; W0 reconciliation §1 row 19 + §4 C-1/C-6/C-7 + §6 Σ-2; W1-F-flags C-1/C-6/C-7; H deep-audit δ §7 C-1/C-6/C-7 + §9 P0 #1 / P1 #9 / P1 #10.

## Sub-task γ.1 — Dock keep-open dual-authority (C-1)

### Resolution

**Path A — single sink at `<GlassDock>` root.** The sink primitive
moves out of `<DockLayerGroup>` and into `useDockState`; both
`<DockPopover>` (formerly raw function-key consumer) and
`<Slider :keep-dock-open>` now inject the same sink. `'dockKeepOpen'`
and `'dockRelease'` raw provides retire entirely — the package no
longer threads two keys for one concept.

This is path A from W1-F-flags §C-1 ("DockPopover migrates onto
`dockSink.acquire()`"), with one refinement on top: rather than
move the raw keys under `_internal/`, we delete them. Source confirms
`<DockPopover>` was the only public consumer; `<DockLayerGroup>` was
itself a wrapper of those keys. With both consumers re-pointed at the
sink, the raw keys have zero remaining consumers and the cleanest
disposition is removal — single authority, zero redundant keys, no
shadow API.

### Diff shape

| File | Before | After |
|---|---|---|
| `src/components/custom/dock/_internal/dockKeepOpenSink.ts` | absent | new — defines `DockKeepOpenSink` interface + `DOCK_KEEP_OPEN_SINK_KEY` + `createDockKeepOpenSink(counter)` factory |
| `src/components/custom/dock/composables/useDockState.ts` | `provide("dockKeepOpen", keepOpen)` + `provide("dockRelease", release)` | `provide(DOCK_KEEP_OPEN_SINK_KEY, createDockKeepOpenSink({ keepOpen, release }))`; raw provides deleted |
| `src/components/custom/dock/DockPopover.vue` | `inject("dockKeepOpen") + inject("dockRelease")` + `watch(expanded → call/release)` | `inject(DOCK_KEEP_OPEN_SINK_KEY)` + `keepOpenToken` ref + `watch(expanded → acquire/release)` + onUnmounted token-drain |
| `src/components/custom/dock/DockLayerGroup.vue` | exported `DockKeepOpenSink` + `DOCK_KEEP_OPEN_SINK_KEY`; injected raw keys; built local `Set<symbol>` sink; re-provided | sink construction code removed (≈45 lines deleted); `DockKeepOpenSink` + key now imported from `_internal/`; package barrel re-exports from same |
| `src/components/custom/dock/index.ts` | re-exports key + type from `DockLayerGroup.vue` | re-exports key + type from `_internal/dockKeepOpenSink` |

### Public surface preservation

`tests/public-surface.spec.ts:166` requires `DOCK_KEEP_OPEN_SINK_KEY` +
`DockKeepOpenSink` on the `@mkbabb/glass-ui/dock` subpath. Both names
preserved (re-exported from the new `_internal/` location). Test green.

### Dual-authority verification

```
$ rg -n "'dockKeepOpen'|\"dockKeepOpen\"|'dockRelease'|\"dockRelease\"" src/ demo/
(no output)
```

Zero raw-string-key sites remaining anywhere in the source tree. The
sink is the only authority for keep-open holds; both descendant
consumers (`<DockPopover>`, `<Slider>`) consume it identically.

### Why path A over path B

W1-F-flags listed both. Path B (sink dissolves; Slider calls function
keys directly) was rejected because:

1. The sink's idempotency contract on `release(token)` is real safety —
   even a single-token consumer like Slider benefits from it (drag
   gesture interrupted by pointercancel mid-flight, component unmounted
   while gesture is in progress, etc).
2. Path A unifies two providers (raw keys + sink wrapper) into one,
   reducing the package's inject-key surface from 2 to 1.
3. The `Set<symbol>` overhead is sub-trivial; the sink itself is one
   factory call per `useDockState` invocation, not per consumer.

## Sub-task γ.2 — `--easing-accent` rename (C-6)

### Resolution

`--easing-accent` renamed library-wide to `--accent-color`. Per
`feedback_no_backwards_compat`: clean break, no alias.

H δ §9 P1 #9 recommended `--accent-vivid`. The dispatch prompt
overrode this with `--accent-color` for naming simplicity (closer to
the CSS-spec-canonical `accent-color` property naming). No other token
in the repo uses the bare `--accent-color` identifier (only
`--cartoon-accent-color` exists, namespaced under `cartoon`).

### Files touched

- `src/styles/tokens.css`: definition (line 213) + `--blob-color`
  fallback (line 437)
- `src/styles/prism-theme.css`: docstring + 2 consumer rules
- `src/components/custom/notification-dot/NotificationDot.vue`: docstring + 1 inline binding
- `src/components/custom/timeline/TimelineMarker.vue`: docstring + 1 inline binding
- `src/components/custom/timeline/TimelinePlayhead.vue`: docstring + 1 inline binding + 1 scoped CSS rule
- `src/components/custom/math-formula/MathFormula.vue`: docstring + 1 inline binding + 1 scoped CSS rule
- `src/components/custom/pipeline-flow/PipelineFlow.vue`: 2 scoped CSS rules
- `src/components/custom/bezier-canvas/BezierCurveCanvas.vue`: docstring + 1 computed
- `src/components/custom/blob/Blob.vue`: 1 scoped CSS fallback
- `demo/stories/motion/bezier-canvas.vue`: 2 inline overrides
- `demo/stories/motion/timeline.vue`: 4 inline overrides + 1 description string

### Verification

```
$ rg -n "easing-accent" src/ demo/
(no output)
```

Zero residue. Build picks up the rename; no runtime aliases declared.

## Sub-task γ.3 — sliderVariants CVA (C-7)

### Resolution

`sliderVariants` CVA lands in `src/components/ui/slider/index.ts`. Each
variant value (`'standard' | 'spectrum' | 'timeline' | 'glass-track'`)
maps to a single modifier class (`glass-slider--standard`, etc.) that
selects the matching block in `Slider.vue`'s scoped CSS. The base
classes (`glass-slider`, `relative flex w-full touch-none select-none
items-center`) hoist into the CVA's base string.

This is path (a) from W1-F-flags §C-7: CVA is the dispatch mechanism;
scoped CSS remains the implementation. Path (b) (CLAUDE.md amendment)
is unnecessary — CVA *can* express this recipe via class-name dispatch.

### Why scoped CSS persists

Each variant uses CSS custom-property fallbacks
(`var(--slider-track-bg, ...)`, `var(--slider-thumb-size, ...)`,
`var(--slider-range-bg, ...)`) so consumers can override individual
metrics inline (the `slider-glass-track` story exercises this with
`--slider-track-height: 2px` etc.). Inlining the recipes via Tailwind
arbitrary values would lose the custom-property fallback contract.
Class-name dispatch via CVA preserves the contract while bringing
Slider into the shadcn-vue `*Variants` convention used by Button,
Toggle, Badge, etc.

### Public surface

`sliderVariants` and the `SliderVariants` type are now co-exported from
`src/components/ui/slider/index.ts`, matching the convention. The
existing `Slider` default export is unchanged.

### Recovery-diary leaks

The original `Slider.vue:17,43,170` `R3` markers (per W0 §1 row 20)
were replaced organically during this refactor — the `variant` prop
docstring was rewritten to describe each branch, the dock-wiring
section header was rewritten, and the scoped-CSS section divider for
`glass-track` was rewritten as a substrate description. Verified zero
leaks remain in the file.

## Hard gate verification

| Gate | Status | Evidence |
|---|---|---|
| (a) DockPopover migrated to sink-based API; raw string keys re-scoped | **green** | DockPopover.vue uses `DOCK_KEEP_OPEN_SINK_KEY` only; raw keys deleted from `useDockState`; `rg "'dockKeepOpen'\|\"dockKeepOpen\"" src/ demo/` returns 0 |
| (b) `--easing-accent` renamed library-wide; zero hits in src/ + demo/ | **green** | `rg -n 'easing-accent' src/ demo/` returns 0 |
| (c) sliderVariants CVA in place | **green** | `src/components/ui/slider/index.ts` exports `sliderVariants` + `SliderVariants`; `Slider.vue` consumes via `cn(sliderVariants({ variant: v }), props.class)` |
| (d) typecheck + build + test green | **green** | `npm run typecheck` clean; `npm run build` `✓ built in 15.66s`; `npm run test` 18 files / 266 tests passed |
| (e) slider-glass-track demo renders without breaking | **green by build proxy** | demo story unchanged; build picks up scoped-CSS unchanged; CVA dispatches identical class names; no Playwright run required per dispatch prompt |

## Files touched (this lane only)

### γ.1
- new: `src/components/custom/dock/_internal/dockKeepOpenSink.ts`
- modified: `src/components/custom/dock/composables/useDockState.ts`
- modified: `src/components/custom/dock/DockPopover.vue`
- modified: `src/components/custom/dock/DockLayerGroup.vue`
- modified: `src/components/custom/dock/index.ts`

### γ.2
- modified: `src/styles/tokens.css`
- modified: `src/styles/prism-theme.css`
- modified: `src/components/custom/notification-dot/NotificationDot.vue`
- modified: `src/components/custom/timeline/TimelineMarker.vue`
- modified: `src/components/custom/timeline/TimelinePlayhead.vue`
- modified: `src/components/custom/math-formula/MathFormula.vue`
- modified: `src/components/custom/pipeline-flow/PipelineFlow.vue`
- modified: `src/components/custom/bezier-canvas/BezierCurveCanvas.vue`
- modified: `src/components/custom/blob/Blob.vue`
- modified: `demo/stories/motion/bezier-canvas.vue`
- modified: `demo/stories/motion/timeline.vue`

### γ.3
- modified: `src/components/ui/slider/index.ts`
- modified: `src/components/ui/slider/Slider.vue`

## Residual risks

- **None for γ.1**: clean break, single authority enforced by zero
  raw-key sites. Public surface preserved (test green).
- **None for γ.2**: rename is purely mechanical; build-time grep proves
  zero residue.
- **One for γ.3 (low)**: the scoped-CSS implementation persists. CVA
  is a dispatch shell over class-name modifiers, not a Tailwind-class
  recipe. CLAUDE.md's "shadcn-vue pattern" line currently describes
  CVA as the *exclusive* path; this lane satisfies the convention by
  *adding* a CVA, not by changing the implementation shape. A future
  doc-pass (I.W5 doc reconciliation, or any time CLAUDE.md is touched)
  could amend the convention to mention "scoped-CSS-keyed CVA dispatch
  is acceptable when variant differences are CSS-property-fallback
  contracts that don't reduce to Tailwind class deltas". This is a
  doc-tightening, not a code regression — left for I.W5 to absorb if
  it reaches that residue.

## Authority

All three sub-tasks landed within file bounds. No source files outside
the declared bounds were modified. No commits; orchestrator owns
W3-close commit per I invariant 4. typecheck/build/test all green.
