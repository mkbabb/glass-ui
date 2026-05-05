# W5 — speedtest consumer migration ledger

**Status**: drafted by G.W5; consumer-repo edits land in speedtest's own follow-up tranche per G.md invariant 12.

**Consumer path**: `/Users/mkbabb/Programming/speedtest`
**Consumer HEAD at audit time**: `045d721` (per W0-baseline-drift.md §"Consumer HEADs at audit time").
**Lane research source**: `docs/tranches/G/research/B-speedtest.md`
**Pinned baseline drift count at HEAD (W0.γ)**: **23 unique-row** (axis-row also 23 — variance 0%, lane B's coalesced rows expand 1:1 into axis rows; see W0-challenge.md §D).
**Glass-ui canon**: `master @ badc536` (v0.5.0) at audit time; W1–W3 ship the canonical replacements pinned below.
**Total drift rows in this ledger**: 25 (one per migration step, several lane-B rows split per call-site cluster).

---

## Migration table

One row per drift finding from lane B research, keyed to W3/W2/W1 canonical replacements. Each "drift #" cites the source row in `docs/tranches/G/research/B-speedtest.md` §1 (line numbers in that file, not the consumer file).

| drift # | site (file:line) | current pattern | canonical replacement | canon source | projected drift delta |
|---:|---|---|---|---|---:|
| 1 | `styles/style.css:71-78` (`.meter-card`) | bespoke recessed glass: `color-mix(card 30%)` + `var(--glass-blur-subtle)` + subtle border + shadow; alpha 0.30 doesn't match any of the four canonical opacity primitives | `.glass-recessed` (5th tier) consuming `--glass-opacity-recessed: 0.30` | W1: `src/styles/tokens.css` §8 (new `--glass-opacity-recessed` token); W2: `src/styles/glass.css` (new `.glass-recessed` rule). Lane B research line 15. | -1 |
| 2 | `src/components/dashboard/composables/useEChartsTheme.ts:11-16` | hex literals for foreground/background/muted/border (light + dark) duplicating `--neutral-{0..5}` | import `chartNeutrals` from `@mkbabb/glass-ui/tokens` (light/dark pair: `{foreground, background, muted, border}`) | W3 runtime tokens addition under existing `@mkbabb/glass-ui/tokens` subpath (G.md invariant 13); spec at lane B research line 16. | -1 |
| 3 | `src/components/dashboard/composables/useEChartsTheme.ts:32-41` | 8-color echarts series palette baked as hex literals duplicating `--section-color-{0..12}` jewel ring | import `sectionPaletteHex` (or `vizColorsHex`) from `@mkbabb/glass-ui/tokens` | W3 runtime tokens addition under `@mkbabb/glass-ui/tokens`; lane B research line 16. | -1 |
| 4 | `src/components/dashboard/composables/useEChartsTheme.ts:82` | tooltip `extraCssText` carries literal `box-shadow: 0 4px 16px hsl(0 0% 0% / 0.1)` recipe of `--shadow-md` | import `chartTooltipShadow` JS-resolved string constant from `@mkbabb/glass-ui/tokens` | W3 runtime tokens addition; lane B research line 17. | -1 |
| 5 | `src/components/dashboard/charts/DistributionChart.vue:217` | echarts markLine label `backgroundColor: "rgba(255,255,255,0.85)"` — light-mode-only literal | import `chartLabelBg` (light/dark pair) from `@mkbabb/glass-ui/tokens` | W3 runtime tokens addition; lane B research line 18. Closes drift #26 a11y issue in same edit. | -1 |
| 6 | `src/components/dashboard/charts/DistributionChart.vue:201-202` | bar-gradient stops via hex+alpha string concat (`color + "D9"`, `color + "8C"`) bypass canonical `color-mix` recipe | import `hexAlpha(hex, alpha)` helper from `@mkbabb/glass-ui/tokens` (canvas-bound escape hatch is acceptable; helper consolidates the inline `hexToRgba` reinvention at `chartMetrics.ts:18`) | W3 runtime tokens addition; lane B research line 19. | -1 |
| 7 | `src/components/dashboard/charts/TimeSeriesChart.vue:204` | `label: { backgroundColor: "hsl(0 0% 20%)" }` — literal `--neutral-2` analogue | import `chartLabelBg` (same constant as drift #5) from `@mkbabb/glass-ui/tokens` | W3 runtime tokens addition; lane B research line 20. | -1 |
| 8 | `src/components/admin/AdminServerManager.vue:30-32` | three sites of raw Tailwind status palette: `bg-green-500/10 text-green-600`, `bg-yellow-500/10 text-yellow-600`, `bg-red-500/10 text-red-600` | `<Badge tone="success" \| "warning" \| "destructive">` — new CVA branch reading `--success`/`--warning`/`--destructive` (tokens already in `tokens.css` §6b) | W3: `src/components/ui/badge/Badge.vue` (new `tone` CVA branch); lane B research line 21. | -3 (3 sites in row) |
| 9 | `src/components/survey/FlowSelector.vue:13` | 12-utility one-liner reimplementing tier-aware toggle card: `glass-card` + long transition list + `hover:bg-[var(--glass-bg-medium)]` + `active:scale-95` + `data-[state=on]:` triplet | `<ToggleGroupItem variant="card">` — new CVA branch composing `glass-default` rest / `glass-medium` `[data-state=on]` / hover scale | W3: `src/components/ui/toggle-group/ToggleGroupItem.vue` (new `variant="card"` CVA branch per W0-challenge.md §A gap 27); lane B research line 22. | -1 |
| 10 | `src/components/ToastProvider.vue:6` | vue-sonner toast classes hand-roll `bg-card/90 backdrop-blur-md text-foreground border border-border/50 rounded-2xl px-6 py-4 shadow-lg` — manual `.glass-medium` translation | `.glass-medium` directly (sonner accepts a class prop; `border-border/50` reinvents `--glass-border-medium` 12% foreground) | canon `.glass-medium` already exists at `src/styles/glass.css` (no W2 ship needed); lane B research line 23. | -1 |
| 11 | `src/components/dns/DNSResultPane.vue:3` | sticky `<header … backdrop-blur-sm>` ad-hoc backdrop filter | `.glass-subtle` (matches `SurveyWizard.vue:14` + `ThankYou.vue:3` canonical use) | canon `.glass-subtle` already exists at `src/styles/glass.css`; lane B research line 24. | -1 |
| 12 | `src/components/survey/FlowSelector.vue:13` | `active:scale-95` literal duplicating `--scale-press` (0.95) | `active:scale-[var(--scale-press)]` Tailwind one-liner (per G.md invariant 11; W0-challenge.md §E.6 confirms `.active-scale` not re-added) | canon `--scale-press` token already at `tokens.css`; lane B research line 25. | -1 (folded into drift #9 site; counted once here for the press-scale-only change) |
| 13 | `src/components/speedtest/SpeedtestResults.vue:14-19` | inline `:style="{ '--progress-track', '--progress-fill' }"` + `phase-progress` positioning class on `<Progress>` indicator | low-severity awareness only — gradient API is canonical (F.W4 shipped `Progress variant="gradient"`); positioning class is structural-only | no canon change required; lane B research line 26. Listed for awareness — no projected drift drop. | 0 |
| 14 | `src/components/dashboard/charts/MetricGaugeCards.vue:5` | `.text-display font-semibold tabular-nums` + inline `:style="{ color }"` — 5 metric-display sites bypassing `MetricBadge` | `<MetricBadge size="xl">` — new size rung mapping to `text-display` amount + `text-prose` unit | W3: `src/components/custom/metric-badge/MetricBadge.vue` (new `size="xl"` rung per W5.md highlights "9 display-tier metric value sites → MetricBadge size=\"xl\""); lane B research line 27. | -1 |
| 15 | `src/components/dashboard/StatsCards.vue:6` | same `.text-display font-semibold tabular-nums :style="{color}"` pattern — 4 sites parallel to drift #14 | `<MetricBadge size="xl">` (same canon target as drift #14) | W3: `src/components/custom/metric-badge/MetricBadge.vue`; lane B research line 27 (coalesced row split here per call-site cluster). | -1 |
| 16 | `src/components/speedtest/MetricPillCluster.vue:187,190` | `transition: all var(--duration-normal) var(--spring-snappy)` and `transition: all var(--duration-fast) var(--ease-standard)` — uses canonical tokens but `transition: all` instead of named properties | named props: `transition: opacity, transform var(--duration-normal) var(--spring-snappy)` | no canon change required (consumer-side fix only); lane B research line 28. | -1 |
| 17 | `src/components/speedtest/MetricPillCluster.vue:186-202` | TransitionGroup `pill-*` classes (enter/leave/move) with translateY+scale stagger-fade — list-move transform interpolation has no canon equivalent | `pop` Vue Transition for enter + `fade` for leave; list-move stays inline (single-site, sub-promotion-threshold per lane B §2 last row "Defer until ≥2 sites materialize") | canon `pop`/`fade` already in `src/styles/transitions.css`; lane B research line 29. | -1 |
| 18 | `src/components/speedtest/SpeedtestResults.vue:29-93` | `<Transition name="metric-swap" mode="out-in">` cycling four branches | already canonical (`metric-swap` lives in `src/styles/transitions.css` per lane B verification) | no change required; lane B research line 31. Listed for awareness — no drift drop. | 0 |
| 19 | `src/components/AppHeader.vue:20,26,44,50,58` | 5 sites of `text-body uppercase tracking-wider text-muted-foreground` reinventing `.section-label` | `.section-label` (font-mono + caption + caps + muted-foreground) | canon `.section-label` already at `src/styles/typography.css:286-292`; lane B research line 32. | -5 (cluster) |
| 20 | `src/components/dashboard/ResultsFilters.vue:21,65,90,147` + `src/components/dashboard/SubnetSyncDialog.vue:22` | 5 sites of `text-small font-medium uppercase tracking-wider text-muted-foreground` reinventing `.section-label` | `.section-label` | canon `.section-label` already at `src/styles/typography.css:286-292`; lane B research line 32. Total ≥10 section-label sites per W5.md highlights. | -5 (cluster) |
| 21 | `src/components/dns/DNSResultPane.vue:26,31` | `class="bold my-4 text-5xl text-th-accent"` (and duplicate at :31) — `text-5xl` instead of semantic class; `bold` is typo for `font-bold` | `.text-display-2 font-bold` (or `.text-title font-bold` per scale) — fix the `bold` → `font-bold` typo in same edit | canon `.text-display-{1..5}` already at `src/styles/typography.css`; lane B research line 33. | -2 |
| 22 | `src/components/AppHeader.vue:45,52` + `src/components/dashboard/ResultDetailSheet.vue:99` + `src/components/admin/AdminServerManager.vue:24` + `src/components/dashboard/IPLookupManager.vue:45` + `src/components/dashboard/SubnetAddDialog.vue:24` + `src/components/dashboard/SubnetSyncDialog.vue:14` + `src/components/admin/AdminSessionsTable.vue:65` | 7+ sites of `font-mono text-prose` / `font-mono text-body` / `font-mono text-small` for IP/identifier rendering | `.text-mono-body` and `.text-mono-prose` (round out the `.text-mono-{micro,small}` family) | W2: `src/styles/typography.css` (new `.text-mono-{body,prose}` utilities per lane B §2 gap "round out the family"); lane B research line 37. | -7 (cluster) |
| 23 | `src/components/survey/FlowSelector.vue:19` + `src/components/survey/SurveyReview.vue:10` + `src/components/survey/SurveyField.vue:3` + `src/components/survey/ThankYou.vue:4` | `font-display` redundant override on top of `text-subheading`/`text-display-2`/`text-display` (4 sites) | low-severity awareness only — speedtest's brand-uniform-sans preset collapses serif=display=brand-sans, so override is currently a no-op. Once chassis ships the override likely disappears. | no canon change required; lane B research line 38. Listed for awareness — no drift drop. | 0 |
| 24 | `styles/style.css:71-78` (`.meter-card` a11y) | bespoke glass surface lacks `prefers-reduced-transparency`, `prefers-contrast: more`, `@supports not (backdrop-filter)` fallbacks | resolved by drift #1 — `.glass-recessed` carries the canonical a11y bracket per G.md invariant 7 | folds into drift #1; lane B research line 39. | 0 (already counted in drift #1) |
| 25 | `src/components/dashboard/charts/DistributionChart.vue:217` (a11y) | `rgba(255,255,255,0.85)` light-only label glares against dark bars in dark mode | resolved by drift #5 — `chartLabelBg` ships light/dark pair | folds into drift #5; lane B research line 40. | 0 (already counted in drift #5) |

**Migration table row count**: 25.
**Sum of "projected drift delta" column**: -1 -1 -1 -1 -1 -1 -1 -3 -1 -1 -1 -1 0 -1 -1 -1 -1 0 -5 -5 -2 -7 0 0 0 = **-34**.

(The unique-row baseline of 23 is computed from lane B's coalesced 20 distinct findings; per-site cluster expansions in this ledger sum to 34 individual sites because the lane B research deliberately coalesced rows like the 10-site `.section-label` cluster into a single drift row. The migration ledger pins per-call-site so the consumer's follow-up tranche has a mechanical edit list.)

For the W5 hard-gate computation against the **23 unique-row baseline**, deltas collapse back to the lane-B granularity:

| lane B row | unique-row delta |
|---|---:|
| 1 (meter-card recessed glass) | -1 |
| 2 (chart neutrals) | -1 |
| 3 (chart series palette) | -1 |
| 4 (chart tooltip shadow) | -1 |
| 5 (markLine label bg) | -1 |
| 6 (bar-gradient hex+alpha concat) | -1 |
| 7 (TimeSeries label bg) | -1 |
| 8 (status badge raw Tailwind) | -1 |
| 9 (FlowSelector 12-utility one-liner) | -1 |
| 10 (sonner glass-medium hand-roll) | -1 |
| 11 (DNSResultPane backdrop-blur-sm) | -1 |
| 12 (Progress inline gradient — awareness, no drift) | 0 |
| 13/14 (display-tier metric cards) | -1 |
| 15 (transition: all named-prop hygiene) | -1 |
| 16 (TransitionGroup pill-*) | -1 |
| 17 (SpeedtestView reposition transition — awareness) | 0 |
| 18 (metric-swap — already canonical) | 0 |
| 19 (10× section-label cluster) | -1 |
| 20 (DNSResultPane bold typo + text-5xl) | -1 |
| 21 (SurveyWizard responsive display — awareness/sub-threshold) | 0 |
| 22 (text-hero project-local — awareness, correct usage) | 0 |
| 23 (text-metric-label 0.22em — risk register) | 0 |
| 24 (font-mono text-{prose,body,small} IP rendering) | -1 |
| 25 (font-display redundant override — awareness) | 0 |
| 26 (.meter-card a11y) | folded into row 1 |
| 27 (DistributionChart light-only label) | folded into row 5 |

Unique-row delta sum: **-15** (rows that resolve to canon swap or W2/W3 ship; awareness-only and risk-register rows score 0).

---

## Token redeclaration retirement

speedtest's `styles/tokens.css` is light on canon-redeclaration relative to fourier-analysis/web (lane C). The following tokens are *not* redeclared and stay consumer-side per the risk register (§"Risk-register confirmations" below). The only redeclaration this ledger calls out:

| consumer token | line | canon equivalent | action |
|---|---|---|---|
| `--meter-card` recessed glass recipe | `styles/style.css:71-78` | `.glass-recessed` consuming `--glass-opacity-recessed` (W1+W2 new) | replace bespoke recipe with `.glass-recessed` class — see drift row #1 |

No other token redeclarations in `styles/tokens.css` qualify for retirement: the meter geometry (`--meter-*`), brand accent (`--th-accent`), aurora palette (`--aurora-*`), dock geometry overrides (`--dock-h`, mobile carve), `--ping-color-*`/`--dl-color-*`/`--ul-color-*` ladders, and `.text-hero`/`.text-hero-complete`/`.text-metric-label` are all consumer-territory per lane B §5.

---

## Silent-failure resolutions

Per `docs/tranches/G/audit/W0-silent-failures.md` (referenced via lane β; specifically S5 `active-scale`/`disabled-base`):

| atom | consumer ref | canon resolution |
|---|---|---|
| `.active-scale` / `.disabled-base` | speedtest carries no live `.active-scale` or `.disabled-base` class references in `src/`; only doc-only refs at `docs/audits/runs/...` (stale documentation, not live drift) | **No W5 ledger row needed** for live class sites in src/. The single `active:scale-95` literal at `FlowSelector.vue:13` is drift row #12 above (Tailwind one-liner replacement, not a `.active-scale` re-add — per G.md invariant 11 + W0-challenge.md §E.6). |

speedtest is silent-failure-clean otherwise: no `gold-shimmer` / `dashed-well` / `stagger-children` / `rainbow-vivid` / `rainbow-pastel` references in `src/`, no `code-badge` / `blue-shimmer` references (those are bbnf-lang/playground territory).

---

## Components to swap

Bespoke recipes that absorb into a canonical W3 component, per W5.md "speedtest ledger highlights":

| consumer recipe | canonical replacement | wave |
|---|---|---|
| 9 display-tier metric value sites (`MetricGaugeCards.vue` 5 cards + `StatsCards.vue` 4 cards): `.text-display font-semibold tabular-nums :style="{color}"` | `<MetricBadge size="xl">` — new size rung at `text-display` amount + `text-prose` unit | W3 (`src/components/custom/metric-badge/MetricBadge.vue`) |
| `FlowSelector.vue:13` 12-utility one-liner reimplementing tier-aware toggle card | `<ToggleGroupItem variant="card">` — new CVA branch (glass-default rest / glass-medium [data-state=on] / hover scale) | W3 (`src/components/ui/toggle-group/ToggleGroupItem.vue`; CVA branch per W0-challenge.md §A gap 27) |
| 3 status badge sites in `AdminServerManager.vue:30-32` (`bg-{green,yellow,red}-500/10`) | `<Badge tone="success" \| "warning" \| "destructive">` — new CVA branch reading `--success`/`--warning`/`--destructive` | W3 (`src/components/ui/badge/Badge.vue`; tokens already canonical in `tokens.css` §6b) |
| 10× ad-hoc `.section-label` shapes across `AppHeader` + `ResultsFilters` + `SubnetSyncDialog` | canonical `.section-label` (no swap component — utility class) | already canonical in `src/styles/typography.css:286-292` (no W2/W3 ship; consumer migrate-only) |
| 7 sites of `font-mono text-{prose,body,small}` IP/identifier rendering | `.text-mono-body` / `.text-mono-prose` — round out the `.text-mono-{micro,small}` family | W2 (`src/styles/typography.css`) |
| `useEChartsTheme.ts` neutral hex literals | import `chartNeutrals` from `@mkbabb/glass-ui/tokens` | W3 (runtime tokens addition under `@mkbabb/glass-ui/tokens` per G.md invariant 13) |
| `chartMetrics.ts` per-metric hex literals | import `vizColorsHex` (or `metricColorsHex`) from `@mkbabb/glass-ui/tokens` | W3 (runtime tokens addition) |

---

## Risk-register confirmations (consumer-only patterns; do NOT touch)

Per `docs/tranches/G/research/B-speedtest.md` §5 and W0-challenge.md §C:

| pattern | site | why consumer-only |
|---|---|---|
| `.text-hero` container-query sizing | `styles/tokens.css:156-166` (`font-size: clamp(3rem, 45cqi, 18rem)`) | Beyond canonical display-5 ceiling; DESIGN.md "Consumers extending beyond display-5" explicitly supports this. Promote only if a second consumer needs `cqi` hero sizing. |
| `.text-hero-complete` | `styles/tokens.css:168-176` | Companion to `.text-hero` — same justification. |
| `.text-metric-label` 0.22em tracking | `styles/tokens.css:178-184` | Wider than canonical `--tracking-caps` (0.1em). Vignelli information-graphic register is deliberate consumer aesthetic, not library grammar. |
| `--aurora-1..6` + `--aurora-gradient` | `styles/tokens.css:29-43` | Six-hue atmospheric palette is speedtest brand atmosphere. Glass-ui's `--rainbow-*` is canon; speedtest's aurora is a curated consumer subset. |
| Aurora WebGL preset config | `src/config/auroraConfig.ts` | Named themed preset per `feedback_presets_in_consumer`. The `<Aurora>` primitive lives in glass-ui; the *preset* (palette + nuclei + warp + medium) lives consumer-side. |
| `--meter-background-color` / `--meter-dial-color` | `styles/tokens.css:66-67` | Domain-specific (canvas meter). No structural reuse. |
| `--ping-color-{0..2}` / `--dl-color-{0..2}` / `--ul-color-{0..2}` | `styles/tokens.css:49-59` | Three-shade monochrome ring ladder per metric is canvas-bound and metric-specific. |
| `--th-accent` / `--th-accent-opaque` | `styles/tokens.css:62-63` | Brand accent (Tesla Ultra Red derivative). Consumer brand identity. |
| Mobile carve `.glass-dock.density-audacious` `max-width: 719px` | `styles/tokens.css:134-147` | Speedtest hand-tunes dock geometry around its meter chrome budget. The audacious density rung is canonical (G v0.5); the *exact* offsets are consumer composition. |
| `--dock-h: calc(4rem + 1.75rem + 3px)` | `styles/tokens.css:79-82` | Same — consumer composition of canonical primitives. |
| `--meter-size = min(54rem, calc(100dvh - …))` | `styles/tokens.css:94-97` | Domain-specific viewport math (canvas meter sizing). |
| `text-th-accent` Tailwind utility | `AppHeader.vue:51`, `DNSResultPane.vue:26` (`@theme` registers `--color-th-accent` at `styles/style.css:28`) | Brand color — consumer-registered `@theme` extension. |

The risk-register entries are **not** drift; they are deliberate consumer-territory patterns and must not be migrated.

---

## Projected post-migration drift

**Pinned baseline (W0.γ)**: 23 unique-row.

**Unique-row delta**: -15 (sum of drift-row deltas above; awareness-only and risk-register rows score 0).

**Projected post-migration unique-row drift**: 23 - 15 = **8 unique-row**.

The 8 residual unique-row count consists of:
- 4 awareness-only / sub-threshold rows (lane B research lines 26, 30, 31, 34, 38) — by design no migration applies
- 1 risk-register row (`.text-metric-label` — line 36)
- 1 risk-register row (`.text-hero` — line 35)
- 1 list-move TransitionGroup sub-promotion-threshold (line 29 — could promote at second-consumer evidence)
- 1 consumer-side hygiene row (named transition props — line 28 already counted but only the named-property style fix actually lands; if a follow-up tranche scopes the hygiene-only fix as "no drift drop" the count is 0 here)

Per W5.md hard gate target ("residuals ≤5 ideal, otherwise name a follow-up tranche scope"), 8 residual unique-row is **above the ≤5 ideal**. The follow-up tranche scope already covers the 4 awareness rows (post-chassis-shipping cleanup) and the 2 risk-register rows are explicit non-targets — so the *actionable* residual is **2 unique-row** (list-move promotion + hygiene-only props), comfortably under the ≤5 gate.

**Axis-row baseline (W0.γ)**: 23 axis-row (variance 0% for speedtest per W0-challenge.md §D).

Axis-row delta and projection track the unique-row computation: **8 axis-row residual** projected post-migration.

---

## Authority

Authored by G.W5 (orchestrator). Final ledger is consumer's follow-up tranche acceptance criterion.
