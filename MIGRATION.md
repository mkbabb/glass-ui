# MIGRATION — v0.9.x → v1.0

L is the v1.0 cohort. v1.0 freezes the public API surface and lands four
architectural transpositions:

1. **Root-barrel Phase 2** (L.W1 Lane A) — vueuse-bearing leaves removed from
   the root barrel; consumers use explicit subpaths.
2. **`src/api/` discovery layer** (L.W1 Lane B) — pure-types discovery surface.
3. **Subpath flatten** (L.W1 Lane C) — `composables/dark` + `composables/keyboard`
   collapse to flat `/dark` + `/keyboard`; `/carousel` subpath added.
4. **Second-consumer fidelity** (L.W3 Lane A composables + Lane B primitives) —
   substrate-without-consumer is binary at the v1.0 freeze.

This guide is the canonical migration path. Per L invariant 4, no legacy aliases
ship — every break is documented here.

---

## L.W1 Lane A — root-barrel Phase 2

Consumers importing vueuse-bearing symbols from the root barrel must move to the
named subpath:

| v0.9.x | v1.0 |
|---|---|
| `import { Input } from "@mkbabb/glass-ui"` | `import { Input } from "@mkbabb/glass-ui/forms"` |
| `import { Textarea } from "@mkbabb/glass-ui"` | `import { Textarea } from "@mkbabb/glass-ui/forms"` |
| `import { Combobox } from "@mkbabb/glass-ui"` | `import { Combobox } from "@mkbabb/glass-ui/forms"` |
| `import { Carousel } from "@mkbabb/glass-ui"` | `import { Carousel } from "@mkbabb/glass-ui/carousel"` |

Rationale: each of these depends on `@vueuse/core`, which forms a single SCC
with the rest of the vueuse surface. Re-exporting from the root barrel forces
every consumer to walk that SCC at tree-shake time, regressing entry-chunk
gzip by ~2 KB. Subpaths isolate the walk.

## L.W1 Lane C — subpath flatten

| v0.9.x (introduced at v0.9.4) | v1.0 |
|---|---|
| `@mkbabb/glass-ui/composables/dark` | `@mkbabb/glass-ui/dark` |
| `@mkbabb/glass-ui/composables/keyboard` | `@mkbabb/glass-ui/keyboard` |

Flat naming matches every other public subpath (`/forms`, `/dock`,
`/configurator`, ...). The v0.9.4 nested form was transitional; v1.0 collapses
it.

<!-- Lane A appends here -->

---

## L.W3 Lane A — composable retirements

L.W3 Lane A audits six composables against the substrate-without-consumer
binary (L invariant 8). Three are WIRED (cross-repo speedtest consumer
satisfies the ≥ 2 bar); three retire.

### Composables KEPT (cross-repo wired)

| Composable | Speedtest consumer | Status |
|---|---|---|
| `useRAFLoop` | `src/components/speedtest/composables/useMeterRenderer.ts` | WIRED |
| `useIntersectionPause` | `src/composables/useAuroraPolicy.ts` | WIRED |
| `useDarkModeSync` | `src/components/speedtest/SpeedtestMeter.vue` + `src/components/dashboard/composables/useEChartsTheme.ts` | WIRED |

All three remain on the `@mkbabb/glass-ui` root barrel (vueuse-free) via
`src/composables/motion/index.ts`. Each composable also has a demo story
under `demo/stories/composables/` for documentation. No consumer-side
migration required.

### `useOffsetPagination` — RETIRED

- **Status**: REMOVED in v1.0.
- **Reason**: 0 production consumers (no `src/` site; no speedtest consumer).
  Demo-only at v0.9.x. Per L invariant 8.
- **Subpath retired**: `@mkbabb/glass-ui/pagination` (entry removed from
  `package.json` `exports` + `typesVersions` and from `vite.library.ts`).
- **Migration**: roll your own with `ref()` + a `fetchFn`-driven loader.
  The v0.9.3 reference shape lived at
  `src/composables/pagination/useOffsetPagination.ts` (60 LOC, no
  glass-ui-private substrate dependency) and can be copy-lifted as-is.

### `useVirtualSectionWindow` — RETIRED

- **Status**: REMOVED in v1.0.
- **Reason**: 0 production consumers. Demo-only at v0.9.x.
- **Subpath retired**: `@mkbabb/glass-ui/virtual` (the entire subpath retires;
  it housed `useVirtualSectionWindow` + `useWindowedStore`).
- **Migration**: consumers needing sectioned virtualisation use
  `@tanstack/vue-virtual` or a hand-rolled IntersectionObserver windower.

### `useWindowedStore` — RETIRED

- **Status**: REMOVED in v1.0.
- **Reason**: 0 production consumers. Demo-only at v0.9.x.
- **Subpath retired**: `@mkbabb/glass-ui/virtual` (shared with
  `useVirtualSectionWindow`).
- **Migration**: a sliding-window resident store is a `ref<T[]>` plus an
  eviction policy — copy from v0.9.3 source if needed.

### `virtualSectionLayout` helpers — RETIRED

- **Status**: REMOVED in v1.0. Affected exports: `buildSectionLayout`,
  `findSectionOffset`, `resolveActiveSection`, `resolveSectionWindow`, plus
  the `FlatSection`, `SectionLayout`, `SectionWindowRange`, and
  `ForcedSectionWindowRange` types.
- **Reason**: support substrate for `useVirtualSectionWindow`. Retires with
  its parent.
- **Migration**: copy the file from v0.9.3
  (`src/composables/virtual/virtualSectionLayout.ts`) if cumulative section-
  offset math is genuinely needed; it's pure functions, no glass-ui
  dependencies.

---

## L.W3 Lane B — primitive retirements

L.W3 Lane B audits four primitives against the substrate-without-consumer
binary (L invariant 8). All four reached the wave at 1 consumer.

### `<DockShowcaseFrame>` — RETIRED

Demo-private chassis introduced at V.W4 60fd745 as a dock-context showcase
host. The wave-open survey returned ZERO non-self consumers
(`rg "DockShowcaseFrame" demo/` matched only the definition file). Per
Rε §A.3 verdict + L invariant 4 (no backwards-compat shims), the component
is removed:

- **Deleted file**: `demo/stories/DockShowcaseFrame.vue`.
- **No public-surface impact**: the component was never exported from
  `src/index.ts` nor `src/api/index.ts` nor reachable via any subpath; it
  was a demo-private chassis primitive (per V.W4 close).
- **Consumer guidance**: dock-tier demos compose raw chassis recipes
  (`rounded-[var(--radius-card)] border border-border/40 bg-card/40 ...`)
  or use the canonical `<ShowcaseFrame>` directly. Non-dock contexts
  already use `<ShowcaseFrame>`.

The `<DockShowcaseFrame>` bullet under "Demo storybook chassis (demo-private)"
in `CLAUDE.md` has been removed and an explanatory note added.

### `<DiscoGlyph>` — WIRED 2nd consumer

Wave-open consumer count: 1 (`demo/stories/primitives/disco-glyph.vue`).
2nd consumer added at `demo/stories/foundations/chart-chassis-palette.vue` —
a chart-palette facet-swatch row binds each `--chart-{ping,download,upload,jitter}`
hue into the DiscoGlyph 8-stop gradient. The foundations page previously
referred to chart palette only via background swatches; the live DiscoGlyph
row now verifies that the chart tokens read at glyph scale (the size cells
consumers compose under GlyphFace caps and inside primary-audacious CTAs).

No public-surface change. DiscoGlyph remains exported via the root barrel
under `@mkbabb/glass-ui` (vueuse-free).

### `<DockGroup>` — WIRED 2nd consumer

Wave-open consumer count: 1 (`demo/stories/primitives/dock-group.vue`).
2nd consumer added at `demo/stories/compositions/dashboard.vue` — the
dashboard now opens with a `<DockGroup density="comfortable">` shelf
composing 4 `<MetricBadge>` cells as the KPI pill-row. This is the
canonical chassis-strip pattern DockGroup was designed for, now exercised
in a multi-component composition site rather than a primitive showcase only.

No public-surface change. DockGroup remains exported via the root barrel
under `@mkbabb/glass-ui` and the `@mkbabb/glass-ui/dock-group` subpath.

### `<InstrumentChassis>` — WIRED 2nd consumer

Wave-open consumer count: 1 (`demo/stories/compositions/instrument-chassis.vue`;
the foundations/chart-chassis-palette.vue token-ladder mention was text-only
documentation, not a component-instantiating consumer).

2nd consumer added at `demo/stories/foundations/chart-chassis-palette.vue` —
a live mini-chassis sits below the chassis-tier-tokens ladder so consumers
see the four chassis tokens composed (engraved-bezel `::before`, twin-line
region dividers, radial curvature overlay) immediately after seeing them as
swatches. The compositions/instrument-chassis.vue page retains the
phase-state interactive consumer.

No public-surface change. InstrumentChassis remains exported via the root
barrel under `@mkbabb/glass-ui` and the `@mkbabb/glass-ui/instrument-chassis`
subpath. `InstrumentChassisPhase` continues to be re-exported through
`@mkbabb/glass-ui/api`.

---

## Final disposition

Per L hard gate 8 (substrate-without-consumer binary at v1.0): every L-shipped
primitive carries ≥ 2 consumers at HEAD or is formally retired with rationale.
L.W3 Lane B closes this binding for `<DiscoGlyph>`, `<DockGroup>`,
`<InstrumentChassis>` (WIRED), and `<DockShowcaseFrame>` (RETIRED).

L.W5 doc cohort absorbs final wording; this file is the canonical migration
guide at v1.0 release.
