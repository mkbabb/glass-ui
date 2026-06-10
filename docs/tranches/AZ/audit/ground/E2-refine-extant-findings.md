# E2-refine-extant — refinement candidates within extant components

Lane E2. READ-ONLY. Tranche-development evidence (no implementation).

## Metric* family — the headline ≥2-site abstraction (+ a latent zero-value defect)

Four primitives compose the identical "value display" gestalt — a primary metric
+ unit + placeholder, with optional icon/label — yet share NO core:

| component | primary field | unit | placeholder | coalesce | exports prop type? |
|---|---|---|---|---|---|
| MetricBadge | `amount` | `unit` | `placeholder:'—'` | `amount \|\| placeholder` (BUGGY) | NO |
| MetricPill (wraps Badge) | `amount` | `unit` | `placeholder:"—"` | (delegates) | n/a |
| MetricCell | `value` | `unit` | `placeholder:"—"` | `v===null\|\|undefined\|\|""` | yes (`MetricCellProps`) |
| MetricRow | `value` | `unit` | `placeholder:"—"` | `value===null\|\|undefined\|\|""` | yes (`MetricRowProps`) |

Evidence:
- field-name split `amount` vs `value`: MetricBadge.vue:11 / MetricCell.vue:67 / MetricRow.vue:48
- placeholder `'—'` redeclared 4×: MetricBadge.vue:41, metric-pill/MetricPill.vue:47, MetricCell.vue:85, MetricRow.vue:81 (+ AnimatedDigit.vue:52)
- coalesce divergence: MetricBadge.vue:131,144 (`amount || placeholder`) vs MetricCell.vue:113 vs MetricRow.vue:120

LATENT DEFECT (S2): MetricBadge `amount || placeholder` (lines 131/144) + `!amount`
muted/color gates (lines 129-130) render a VALID `0` metric as the em-dash
placeholder, muted, with the color stripped. MetricCell/MetricRow use the correct
explicit-empty check. The divergence is the textbook "two sites want one abstraction,
and the copy that diverged hides a bug."

Abstraction proposal (NO impl this phase): one package-private `useMetricValue(value,
placeholder)` composable (or a shared `MetricValueProps` type + a `coalesceMetric()`
leaf in the metric-stack/metric-badge shared seam) owning (a) the canonical field name
(pick ONE — `value`, since 2 of 4 + the bug is on the `amount` side), (b) the single
correct null/undefined/"" coalesce, (c) the single `placeholder:"—"` default. The four
SFCs keep their distinct surfaces (badge pill / wash tile / subgrid row) but consume
ONE value core. MetricBadge.index.ts should also export its prop type for parity.

## Dock taxonomy — the R3-2 disambiguation headline

"rail" is overloaded THREE ways across the lib:
1. `GlassDock variant="rail"` — a vertical icon-rail DOCK (useDockShellProps.ts:146)
2. `DockLayerGroup showRail` — the embedded layer-SWITCHER rail (tabs) (DockLayerGroup.vue:30)
3. R3-2's intended "hairline RAIL facility" — an extended divider that goes BEYOND the dock (does not exist)
4. (+ timeline/ContinuousRail.vue — a 4th unrelated "Rail")

Redundant prop axes: `variant` ("dock"|"rail"|"instrument-strip") and `orientation`
("horizontal"|"vertical") partially encode the SAME thing — `variant="rail"`/`"instrument-strip"`
FORCE vertical (useDockShellProps.ts:226-230), so a consumer can express "vertical dock"
TWO ways. The demo rail.vue literally shows `<GlassDock variant="rail">` AND
`<GlassDock orientation="vertical">` side by side as distinct surfaces (rail.vue:130-155) —
the exact axis confusion R3-2 names.

R3-2 model = ONE dock, an orientation axis (horizontal | vertical), BOTH with the
layering system, PLUS a separate hairline-RAIL facility. The current `variant` axis
conflates orientation (rail=vertical) with surface vocabulary (instrument-strip=chassis).

Grounding capture: docs/tranches/AZ/audit/ground/C1-switcher-rail-zoom.png — the switcher
rail paints as a dark fused column with illegible glyphs (R3-1).

## ConfiguratorRow vs LabeledField — two label+control row primitives

Both are "label (+ meta) above/beside a slotted control":
- ConfiguratorRow.vue (label + name + reset + description + density) — configurator-local
- LabeledField.vue (label + tooltip + required + error + for/id wiring) — form-local

Different feature emphasis (a11y for/id + error region vs token-name + reset + density),
so NOT a clean merge — but they share the "labeled control row" gestalt and a consumer
choosing between them has no documented guidance. Candidate: a shared row chassis OR a
documented "ConfiguratorRow for token controls / LabeledField for form fields" divergence
note (the same kind of recorded-DIVERGENCE the project already uses for cn/focus-ring).

## Shared-helper duplications (smaller)

- `isComponent(icon)` functional/object guard lives only in DockLayerGroup.vue:160 but the
  identical "render a lucide v1 functional icon or fall back" need exists in MetricCell
  (IconLike type, MetricCell.vue:14) and MetricRow. The `IconLike` permissive-icon type is
  declared once (MetricCell.vue:14) but the guard logic is re-expressed. Candidate: one
  `isIconComponent()` + `IconLike` leaf in utils/ or a shared icon helper.
- `readToken()` getComputedStyle token-read (SegmentedTabs.vue:33) — single site today;
  watch if a 2nd WAAPI-keyframe consumer appears (not yet ≥2, so NOT a fold yet).

## Verdicts (no rough-edge found / legitimate divergence)

- DockSeparator vs ui/Separator — legitimate (DockSeparator carries orientation-aware
  dock-context paint the bare reka Separator can't; DockSeparator.vue:30-43).
- GlassUnderline vs SegmentedTabs underline-variant — distinct primitives, no dup.
- ToggleChip vs SegmentedTabs multi-select / ToggleGroup — distinct (single-toggle chip
  vs N-segment strip); ToggleChip docstring already steers away from ToggleGroup.
- DockIconButton / DockTabButton / DockSelectTrigger / DockDropdownTrigger — thin
  class-contract wrappers, correct shape; styling centralized in dock-controls.css.
