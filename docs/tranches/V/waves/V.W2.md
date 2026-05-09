# V.W2 — Foundation polish (v0.8.0 → v0.8.6)

**Cohort window**: `d62a836` (2026-05-06) → `6dbb189` (2026-05-07) — 23 commits across 4 mid-tranche releases (v0.8.3, v0.8.4, v0.8.5, v0.8.6).
**Mode**: sequential bundled cohort (the actual dispatch was direct-to-master; this spec is post-hoc).
**Status**: closed @ `6dbb189`.

## Purpose

V.W2 sweeps the long-tail substrate residuals J FINAL flagged as cross-tranche debt and the U.W1 14-agent audit flagged across cohorts A/B/C: orphan tokens, duplicate type-token vocabularies, cartoon-shadow dual-system, raw radii on toggle/button/avatar/badge, popover-class shadow-md double-stack, status-color foreground unwiring, canonical glass-tier consumption gaps, and the `--opacity-disabled` bridge.

V.W2 also lifts three composables from speedtest into the library tier (v0.8.4) and ships the MetricPill primitive family (v0.8.3).

## Commit cohort

### v0.8.3 release — MetricPill primitive family

| Commit | Subject | Notes |
|---|---|---|
| `d62a836` | feat(GlassDock): containerName prop lifts container-query host onto the dock primitive | T.W2 audit-B §1.3; first V commit. |
| `96dd160` | feat(MetricBadge): labelPosition="stacked" 2-row refinement + min-height token | New `--metric-badge-min-height-stacked` + `--metric-badge-padding-block-stacked` tokens. |
| `0601d62` | feat(MetricPill): new primitive — stacked taller-fatter pill composing MetricBadge | Composition-only; `density` knob. |
| `cc5f07b` | release(v0.8.3): containerName + MetricPill primitive + stacked MetricBadge refinement | 0.8.2 → 0.8.3 bump. |

### v0.8.4 release — composable promotion

| Commit | Subject | Notes |
|---|---|---|
| `a4959ef` | feat(composables/useTokenColor): read CSS custom property as ComputedRef + theme-aware fallback | T audit F §"Library gaps"; arguably supersedes `cssVar()`. |
| `4e28520` | feat(composables/useStagger): one-shot staggered reveal-flag array with cleanup-safe timer set | Lifted from speedtest. |
| `16df6db` | feat(composables/useAnimatedNumberMap): N-up useAnimatedNumber fan-out behind a Record-returning composable | Lifted from speedtest. |
| `1a685ad` | release(v0.8.4): composable promotion — useTokenColor + useStagger + useAnimatedNumberMap | 0.8.3 → 0.8.4 bump; +12 new tests (288/288). |

### v0.8.5 release — backdrop-filter dedup

| Commit | Subject | Notes |
|---|---|---|
| `39f5cc5` | release(v0.8.5): drop manual -webkit-backdrop-filter + add release.sh script-tightening | P1 backdrop-filter dedup (live-DOM evidence at speedtest.friday.institute); 7 source files swept. |
| `9d2b2ba` | feat(useAnimatedNumber): clamp progress mode to prevent backward overshoot | Composable refinement. |
| `18aa1ca` | feat(useStagger): prefers-reduced-motion brackets | Composable refinement. |

### v0.8.6 release — bundled patches per audit a/b/c/d

| Commit | Subject | Notes |
|---|---|---|
| `f657d21` | refactor(GlassPanel): retire v0.7 vocab; migrate to 5-rung ladder | C-b axis 4 #21. |
| `69d6f7f` | fix(popover-class): drop shadow-md double-stack on glass-floating | C-a §1 + §5.2; 7 components. |
| `221d783` | fix(notification): consume status-color foreground tokens | C-a §1.4; absorbs K W2.a (Notification consumer). |
| `905a00e` | fix(button.glass): consume canonical .glass-wash composition | C-a §2.1. |
| `89e6d40` | fix(sheet): consume canonical .sheet-animate utility | C-a §2.3. |
| `5dfe6fb` | feat(badge): add success/warning/info variants | B-b §"glass-ui gaps"; absorbs K W2.a (Badge consumer). |
| `5a8a7f8` | fix(dark-mode-toggle): add focus-visible ring | C-b axis 3 #16. |
| `c5e56a1` | chore(styles): retire duplicate --leading/--tracking tokens (use --type-* canon) | C-c §1.1 / Union 2. |
| `52cb1d8` | refactor(styles): collapse cartoon-shadow + adopt canonical glass tier | C-c §1.3 / Union 1. |
| `a22f335` | feat(theme): bridge --opacity-disabled + sweep 12 components | C-a §1.2 / §gap.4. |
| `6dbb189` | release(v0.8.6): bundled patches per audit a/b/c/d | 0.8.4 → 0.8.6 bump (skipped 0.8.5 ordinal — 0.8.5 was the manual-prefix dedup release; 0.8.6 is the audit-bundled patch release). |

## Hard-gate items

Derived from the cohort:

- 12 orphan tokens excised with zero-consumer verification (`afb2b34` — note: `afb2b34` actually lands in V.W3 chronologically but is a V.W2-flavor foundation polish; attribution is fluid since V was never formally waved). The K reconciliation attributes it to V.W2.
- Duplicate `--leading` / `--tracking` retired in favor of `--type-*` canon (`c5e56a1`).
- Cartoon-shadow collapsed; canonical glass tier adopted (`52cb1d8`).
- `<Notification>` consumes status-color foreground tokens (`221d783`).
- `<Sheet>` consumes canonical `.sheet-animate` (`89e6d40`).
- `<Button.glass>` consumes `.glass-wash` (`905a00e`).
- Popover-class shadow-md double-stack dropped on glass-floating (`69d6f7f`).
- GlassPanel migrated to 5-rung ladder (`f657d21`).
- Radii sweep: toggle / button / avatar / badge (verified at HEAD via `8912d4b` in V.W3 cohort; the v0.8.6 release includes parts of this).
- Typography ladder migrations: Card + Label (`38b94ac`), Dialog/Sheet/Drawer titles (`cf3bf37`) — these land chronologically after `6dbb189` but ship in v0.9.0 alongside V.W3.
- `useStagger` PRM brackets (`18aa1ca`).
- `useAnimatedNumber` clamp progress mode (`9d2b2ba`).
- v0.8.4 composable promotion (`useTokenColor` + `useStagger` + `useAnimatedNumberMap`) — `1a685ad`.
- v0.8.5 release: `-webkit-backdrop-filter` drop + `release.sh` script-tightening — `39f5cc5`.
- `<MetricPill>` primitive (`0601d62`); `<MetricBadge>` stacked (`96dd160`); `containerName` prop (`d62a836`).

## Architectural transpositions executed

- **`<MetricPill>`** (`0601d62`, v0.8.3) — stacked-pill primitive composing `<MetricBadge>` with stacked-pill defaults.
- **`containerName` prop on `<GlassDock>`** (`d62a836`, v0.8.3) — lifts container-query host onto the dock primitive.

## Token expansion

- `--metric-badge-min-height-stacked` + `--metric-badge-padding-block-stacked` (`96dd160`).
- `--opacity-disabled` bridge (`a22f335`) — sweeps 12 components.
- Duplicate `--leading` / `--tracking` retired (`c5e56a1`) in favor of `--type-*` canon.

## Composable shipping

- `useTokenColor` (`a4959ef`) — read CSS custom property as ComputedRef + theme-aware fallback.
- `useStagger` (`4e28520`) — one-shot staggered reveal-flag array with cleanup-safe timer set.
- `useAnimatedNumberMap` (`16df6db`) — N-up useAnimatedNumber fan-out.
- `useStagger` PRM bracket (`18aa1ca`).
- `useAnimatedNumber` clamp progress mode (`9d2b2ba`).

## Scope-reveal note (post-hoc)

V.W2 was never formally waved. The cohort grouping into "v0.8.3 + v0.8.4 + v0.8.5 + v0.8.6 = V.W2 foundation polish" is K.WV's retroactive attribution per `release(v0.9.0)` commit message which names V.W2 / V.W3 / V.W4 explicitly. Some commits (e.g., `afb2b34` orphan-token excise) chronologically land in the V.W3 window but are foundation-polish flavor; W-V.md spec attributes them to V.W2 per release-note semantics. Where the chronological vs semantic attribution diverges, this spec follows release-note semantics (the v0.9.0 release notes are authoritative).

## Authority

V.W2 closes at `6dbb189` (v0.8.6 release commit). The 6-agent post-close audit pattern J established was not run; no `audit/V.W2-*.md` deliverables exist. K's 2026-05-08 reconciliation substitutes for the missing close.

Cross-tranche debt absorbed: K W2.a (Notification + Badge foreground-token consumers); 12 K chronic-deferral substrate-without-consumer rows (`afb2b34` orphan-token excise).
