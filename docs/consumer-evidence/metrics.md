# Metrics family — metric-cell · metric-stack · metric-badge · instrument-chassis · pulse (+ metric-pill)

## Artefact paths

The compact-metric family — a distinct readout mechanism (a fixed-grid numeric
cell/row/badge, the instrument-chassis phase frame, the pulse liveness dot) —
published OFF the root barrel as five subpaths:

- `metric-cell` — `src/components/custom/metric-cell/` (`MetricCell`) → `@mkbabb/glass-ui/metric-cell`
- `metric-stack` — `src/components/custom/metric-stack/` (`MetricStack` + `MetricRow`) → `@mkbabb/glass-ui/metric-stack`
- `metric-badge` — `src/components/custom/metric-badge/` (`MetricBadge`) → `@mkbabb/glass-ui/metric-badge`
- `instrument-chassis` — `src/components/custom/instrument-chassis/` (`InstrumentChassis` + `ChassisDivider` + `InstrumentChassisPhase`) → `@mkbabb/glass-ui/instrument-chassis`
- `pulse` — `src/components/custom/pulse/` (`Pulse`) → `@mkbabb/glass-ui/pulse`

`metric-pill` (`src/components/ui/metric-pill/MetricPill.vue`) is the stacked-pill
default composed over `<MetricBadge>` — a composition-only ui/ surface on the root
barrel, no parallel logic. It rides the family; it is not a separate subpath.

## Current consumer state — a THREE-repo public surface (speedtest + muster + sci-report)

The family is consumed across THREE external repos, not speedtest alone. Per-site,
present-tense — each path resolves on disk and each site imports the published
subpath:

### metric-cell — published via `@mkbabb/glass-ui/metric-cell`

- muster — `../muster/frontend/src/components/verdict/TravelMatrix.vue:27`
- speedtest — `../speedtest/src/features/speedtest/ui/SharedResultView.vue:104`, `../speedtest/src/components/dashboard/ResultDetailSheet.vue:7`

### metric-stack — published via `@mkbabb/glass-ui/metric-stack` (`MetricStack` + `MetricRow`)

- muster — `../muster/frontend/src/components/verdict/RankedVerdict.vue:40`, `../muster/frontend/src/components/verdict/WhyThisWonSheet.vue:35`
- speedtest — `../speedtest/src/features/speedtest/ui/ResultStack.vue:172`

### metric-badge — published via `@mkbabb/glass-ui/metric-badge` (the widest surface — all THREE repos)

- muster — `../muster/frontend/src/components/verdict/WinnerHero.vue:48`, `../muster/frontend/src/components/dock/CommandDock.vue:42`
- sci-report — `../sci-report/dashboards/ecf/features/essay/WindowArcBeat.vue:18`, `../sci-report/dashboards/sci/features/essay/ChaseBeat.vue:25`
- speedtest — `../speedtest/src/features/speedtest/ui/SpeedtestResults.vue:641`, `../speedtest/src/components/survey/SurveyResultDock.vue:166`

### instrument-chassis — published via `@mkbabb/glass-ui/instrument-chassis`

- muster (×5) — `../muster/frontend/src/App.vue:31`, `../muster/frontend/src/composables/useMusterApp.ts:33`, `../muster/frontend/src/components/shell/VerdictStage.vue:11`, `../muster/frontend/src/components/shell/InstrumentAside.vue:17`, `../muster/frontend/src/components/verdict/WinnerHero.vue:46`
- speedtest (×4) — `../speedtest/src/App.vue:257`, `../speedtest/src/composables/useRouteTransition.ts:34`, `../speedtest/src/views/MapView.vue:53`, `../speedtest/src/views/ChartsView.vue:132`

### pulse — published via `@mkbabb/glass-ui/pulse`

- muster — `../muster/frontend/src/components/dock/CommandDock.vue:43`
- speedtest (×4) — `../speedtest/src/features/speedtest/ui/CompleteBadge.vue:64`, `../speedtest/src/features/speedtest/ui/ResultStack.vue:174`, `../speedtest/src/features/speedtest/ui/SpeedtestResults.vue:649`, `../speedtest/src/views/AdminLoginView.vue:117`

## Disposition — KEEP the whole family (STRUCT-8 / XR-3 / UF-K1, BI.W-METRICS-DEMO)

**KEEP.** The FAM-10 "speedtest-only sextet" premise — that the metric family is speedtest-only and should move to speedtest's repo (UF-K1) — is FALSE and is CORRECTED here: the surface is a three-repo public API (muster + sci-report + speedtest), so a metrics relocate or retire would silently break muster + sci-report.

Under the mechanism-distinctness law (FAM-10), the family owns a distinct
compact-metric mechanism AND clears the ≥2-binary-consumer bar by a wide margin
(metric-badge alone spans all three repos), so it is not a fold candidate and not a
speedtest-transfer candidate. `metric-pill` (ui/, composes `<MetricBadge>`) stays
with it — a D-FACTOR Metric fold, if it lands, renames layout axes but retires no
mechanism (recorded, not executed here).

UF-K1's overfit instinct is real, but it lands on the `/data/metrics` DEMO page (a
spec-sheet built for speedtest's benefit), NOT the components — the demo-page
redesign (proportion, veil demarcation, permutation-fill, FamilyTabs IA) is
W-AFFORDANCE-REDESIGN's D-STORY worklist, cross-referenced here, not duplicated.
Only `icon-tooltip` and `scrolling-text` were ever truly speedtest-only (adjudicated
by W-SPEEDTEST-ONLY-PAIR); the metric family is not in that set.

### FamilyTabs IA (STRUCT-8 / CBA-5)

The `/data/metrics` family page is the canonical demo home; the folded
`data/metric-cell` / `data/metric-stack` deep-links resolve to it (W-FOLDED-REDIRECTS
routes the redirects). The metric family page is the aggregator; standalone member
routes fold in.

## Cross-repo guard (XR-9)

Because the family STAYS there is NO metrics-relocate ask; the speedtest / muster /
sci-report peer bumps at the 5.0.0 cut ride the existing `crossrepo-asks:bi` roster.
Recorded as the guard that a future metrics prune would need ALL THREE repos' adopt,
not one.

## Re-audit proof

```ts
import { MetricCell } from "@mkbabb/glass-ui/metric-cell";
import { MetricStack, MetricRow } from "@mkbabb/glass-ui/metric-stack";
import { MetricBadge } from "@mkbabb/glass-ui/metric-badge";
import { InstrumentChassis, ChassisDivider } from "@mkbabb/glass-ui/instrument-chassis";
import { Pulse } from "@mkbabb/glass-ui/pulse";
```

The honest grep: `metric-badge` resolves in muster (`WinnerHero.vue`,
`CommandDock.vue`), sci-report (`WindowArcBeat.vue`, `ChaseBeat.vue`), AND speedtest
(`SpeedtestResults.vue`, `SurveyResultDock.vue`). A silent drop of any metric subpath
REDs `proof:consumer-evidence-true` M1 (the muster / sci-report break-guard); a
re-inserted (corrected-away) metric-family speedtest-only claim REDs M2.
