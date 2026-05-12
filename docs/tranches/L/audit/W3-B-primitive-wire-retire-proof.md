# L.W3 Lane B — Primitive wire-or-retire proof

**Wave**: L.W3 Lane B
**Lane**: B — primitives
**Hard gate**: every public primitive at HEAD either ≥ 2 consumers OR formally retired with rationale per L invariant 8 (substrate-without-consumer binary at v1.0 freeze).
**Status**: closed.

## Scope

Four primitives, per Rε §A.3-A.4 + W0 reconciliation rows L8 + L9:

1. `<DiscoGlyph>` (`src/components/custom/disco-glyph/`)
2. `<DockGroup>` (`src/components/custom/dock-group/`)
3. `<InstrumentChassis>` (`src/components/custom/instrument-chassis/`)
4. `<DockShowcaseFrame>` (`demo/stories/DockShowcaseFrame.vue` — demo-private)

## Wave-open survey

| Primitive | Consumer count at open | Sites |
|---|---|---|
| `<DiscoGlyph>` | 1 component-instantiating | `demo/stories/primitives/disco-glyph.vue` (other matches were doc strings + provide/inject key references in `<GlyphFace>` — no actual `<DiscoGlyph ... />` instantiation) |
| `<DockGroup>` | 1 | `demo/stories/primitives/dock-group.vue` |
| `<InstrumentChassis>` | 1 component-instantiating | `demo/stories/compositions/instrument-chassis.vue` (the `foundations/chart-chassis-palette.vue` reference was prose-only — token-ladder hint strings, no component instantiation) |
| `<DockShowcaseFrame>` | 0 | self-defined at `demo/stories/DockShowcaseFrame.vue` but ZERO consumers (the V.W4 close named 13 dock-tier consumer sites but the imports have since been removed — every `demo/stories/navigation/*.vue` at HEAD composes raw chassis recipes) |

Note: per `docs/tranches/L/audit/W0-reconciliation.md` row L8, the
W0 reconciliation lane *believed* DiscoGlyph already had 2 consumers
(claiming `foundations/chart-chassis-palette.vue` as the second).
W3-B re-verified that claim: the foundations file contains only prose
references to chart palette + "InstrumentChassis frame" hint strings,
never component instantiation. So DiscoGlyph was 1-consumer at wave
open, identical to DockGroup and InstrumentChassis.

## Disposition matrix

| Primitive | Decision | Rationale |
|---|---|---|
| `<DiscoGlyph>` | **WIRE 2nd consumer** | Visual primitive; foundations-tier facet-swatch row is a natural showcase — verifies chart palette reads at glyph scale where consumers compose under GlyphFace caps and inside primary-audacious CTAs |
| `<DockGroup>` | **WIRE 2nd consumer** | Pill-row shelf primitive; dashboard KPI strip is the canonical chassis-strip pattern DockGroup was designed for; exercises the primitive in a non-primitive-showcase composition site |
| `<InstrumentChassis>` | **WIRE 2nd consumer** | Foundations-tier live mini-chassis under the chassis-tier-tokens ladder shows the four chassis tokens in composition; complements the compositions/instrument-chassis.vue phase-state interactive consumer |
| `<DockShowcaseFrame>` | **RETIRE** | Zero consumers since V.W4; per Rε §A.3 verdict + L invariant 8; demo-private (no public-surface impact) |

## Execution

### Retire — `<DockShowcaseFrame>`

- **Deleted**: `demo/stories/DockShowcaseFrame.vue` (the only file holding the component definition).
- **CLAUDE.md update**: removed the `<DockShowcaseFrame>` bullet under "Demo storybook chassis (demo-private)"; replaced with explanatory note pointing dock-tier consumers at raw chassis recipes or `<ShowcaseFrame>`.
- **No `src/` change**: component was never on the library public surface (demo-private chassis primitive per V.W4 close); not exported from any barrel; not in any `package.json` exports entry.

### Wire — `<DiscoGlyph>` 2nd consumer

- **Site**: `demo/stories/foundations/chart-chassis-palette.vue`.
- **Pattern**: 4-cell facet-swatch row, each cell binds one chart-palette token (`--chart-{ping,download,upload,jitter}`) into the `phaseColor` prop of an ARROW_RIGHT-silhouette DiscoGlyph at `facet-axis="vertical"`. Result: the foundations page now shows the chart palette twice — first as token-ladder swatches, then as live DiscoGlyph instances proving the tokens read at glyph scale.

### Wire — `<DockGroup>` 2nd consumer

- **Site**: `demo/stories/compositions/dashboard.vue`.
- **Pattern**: added a `<DockGroup density="comfortable" class="self-start">` shelf at the top of the dashboard `<main>` region, composing 4 `<MetricBadge>` cells (active count, requests/min, p95 latency, error rate). The shelf sits above the existing Card-grid metric tiles — same data, denser representation; the dashboard naturally consumes the chassis-strip pattern DockGroup was designed for.

### Wire — `<InstrumentChassis>` 2nd consumer

- **Site**: `demo/stories/foundations/chart-chassis-palette.vue`.
- **Pattern**: added a new StorySection "chassis-tier tokens · composed surface" with a live mini-`<InstrumentChassis phase="ready">` showing the engraved-bezel `::before` stroke, twin-line region dividers, and radial-gradient curvature overlay reading at rest. Sits immediately below the chassis-tier-opacities token ladder so consumers see the tokens both as swatches and in composition.

## Hard-gate verification

```bash
$ rg "DockShowcaseFrame" src/ demo/
# (no output — 0 hits; retirement complete)

$ rg -l "DiscoGlyph" demo/
demo/stories/primitives/disco-glyph.vue
demo/stories/foundations/chart-chassis-palette.vue
demo/stories/primitives/glyph-face.vue  # doc-string mention only
# ≥ 2 component-instantiating consumers

$ rg -l "DockGroup" demo/
demo/stories/primitives/dock-group.vue
demo/stories/compositions/dashboard.vue
# ≥ 2 component-instantiating consumers

$ rg -l "InstrumentChassis" demo/
demo/stories/compositions/instrument-chassis.vue
demo/stories/foundations/chart-chassis-palette.vue
# ≥ 2 component-instantiating consumers

$ npm run typecheck
# vue-tsc --noEmit — exit 0

$ npm test
# 27 files / 330 tests passed

$ NODE_OPTIONS="--max-old-space-size=8192" npm run build
# built in 32.66s; dts declaration files emitted; bundle sizes nominal
```

## Files touched

| Path | Action |
|---|---|
| `demo/stories/DockShowcaseFrame.vue` | DELETED |
| `demo/stories/foundations/chart-chassis-palette.vue` | MODIFIED (added DiscoGlyph swatch row + live InstrumentChassis section) |
| `demo/stories/compositions/dashboard.vue` | MODIFIED (added DockGroup KPI strip) |
| `CLAUDE.md` | MODIFIED (removed `<DockShowcaseFrame>` bullet; added retirement note) |
| `MIGRATION.md` | CREATED (multi-lane file; Lane B section authored) |
| `CHANGELOG.md` | MODIFIED (appended W3 Lane B BREAKING + ADDED sections under v1.0) |
| `docs/tranches/L/audit/W3-B-primitive-wire-retire-proof.md` | CREATED (this file) |

7 files modified total.

## Hard-gate summary

- (a) Every primitive in scope has a final disposition (3 WIRED, 1 RETIRED).
- (b) `rg "DockShowcaseFrame" src/ demo/` returns 0 hits.
- (c) `src/api/index.ts` is unchanged — no retired type was exported from `api/`. `InstrumentChassisPhase` continues to be re-exported.
- (d) `MIGRATION.md` captures all four dispositions (Lane B section).
- (e) typecheck + build + test green.
- (f) Lane B proof doc authored (this file).
- (g) orchestrator will commit at W3 close.

Closes L.W3 Lane B.
