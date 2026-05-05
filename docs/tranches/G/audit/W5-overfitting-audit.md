# W5 — Overfitting audit re-run

**Wave**: G.W5 close ceremony.
**Date**: 2026-05-04.
**Authority**: orchestrator (agent API hit org limit; absorbed inline against `feedback_overfitting_audit` ≥2-call-site bar).
**Methodology**: enumerate every src/ artefact added in W1/W2/W3/Wβ + count call sites across `src/` + `demo/` + the six consumer trees as projected by the W5 ledgers.

## Verdict per artefact

### Tokens (W1 additions)

| Artefact | Public surface | Sites in src+demo+ledger | Verdict |
|---|---|---:|---|
| `--cream`, `--cream-warm`, `--cream-cool`, `--cream-edge`, `--cream-foreground` | `theme.css` `--color-cream-*` aliases | `<CreamSurface>` + `Card variant="cream"` + math.css + cards.css; words/frontend ledger has 18 ad-hoc cream-substrate sites | **keep** |
| `--paper-bg-{1..4}` + `--paper-shadow-{1..4}` + `--paper-border-{1..4}` | (consumed via `.paper-{1..4}` utilities) | `.paper-{1..4}` + `.paper-card` + `Card variant="paper"`; words/frontend ledger has 4 parallel paper-substrate retirements | **keep** |
| `--icon-{2xl,3xl,mega}` | `theme.css` `--size-icon-*` aliases | generated `.icon-{2xl,3xl,mega}` utilities + `<IconStamp>` size mapping; ledger projections across consumers | **keep** |
| `--shadow-cartoon-accent` + `--cartoon-accent-color` + `--cartoon-accent-mix` | `theme.css` `--shadow-cartoon-accent` | `Button variant="cartoon"` accent recipe + value.js + bbnf preset cleanup | **keep** |
| `--space-phi-{1..4}` | `theme.css` `--spacing-phi-*` | math.css formula-block + `<DisplayHero>` + paper-card padding + `.well-dashed` + 11 demo sites | **keep** |
| `--shimmer-blue-{dark,mid,light}` | `theme.css` `--color-shimmer-blue-*` | `.text-shimmer-blue` + bbnf 3 runtime call sites | **keep** |
| `--blob-color`, `--blob-border-mix{,-contrast}`, `--blob-grain-opacity`, `--blob-chromatic-aberration`, `--blob-cast-shadow-{y,blur,mix}` | (consumed via `<Blob>` + WebGL renderer) | `useMetaballRenderer` + `Blob.vue` cast-shadow + value.js GooBlob retirement (≥2 sites) | **keep** |
| `--type-display-mega`, `--type-display-ultra` | `theme.css` `--text-display-{mega,ultra}` | `text-display-mega` + `text-display-ultra` `@utility` + `<DisplayHero size="display-mega">` + audacious-hero composition + bbnf 2 hero sites | **keep** |
| `--type-formula` | `theme.css` `--text-formula` | math.css `.text-formula` + bbnf perf-number/-unit | **keep** |
| `--tracking-tightest` | `theme.css` `--tracking-tightest` | `.text-display-stat` + display-mega/ultra utilities | **keep** |
| Per-rung `--font-display-{1..5,mega,ultra}-variation-settings` | (consumed by `text-display-N` utilities) | All seven display utilities consume their per-rung axes | **keep** |
| Retired: `--section-heading` | — | zero src refs post-W1 | **delete-unused** ✓ |
| Retired: `:root[data-typography-preset="brand-uniform-sans"]` | — | zero refs post-W1 | **delete-unused** ✓ |

All retirements clean. All new tokens cleared the ≥2 bar via either direct consumption + ledger projection, OR a primitive other proposals depend on (Blob primitives, per-rung Fraunces axes consumed by display utilities).

### Utility classes (W2 additions)

| Artefact | Sites |
|---|---|
| `.bg-rainbow{,-vivid,-pastel}` | 3 demo + keyframes 3 sites (S4 silent failure) |
| `.text-rainbow-pastel` | 1 demo + value.js 1 silent-failure migration |
| `.text-shimmer-{gold,blue,vivid,pastel}` family | 4 demo + 4 consumers via S1+S7 ledger |
| `.rainbow-stroke` | demo + paired with `<RainbowGradientDef>` |
| `.divider-flourish-{gold,rainbow,section-0..12}` | 3 demo + foundations/flourishes story |
| `.flourish-stripe-{rainbow,pastel,gold}` | 3 demo + audacious-hero composition |
| `.code-badge` | bbnf 2 sites + W4 code-prose story (S6) |
| `.icon-stamp`, `.icon-emboss` | `<IconStamp>` + 2 demo + foundations/icons story |
| `.icon-{xs..mega}` (8) | `<IconStamp>` + `<TierBadge>` + `<LikeButton>` + foundations/icons + ledger projections |
| `.text-display-stat` | speedtest 9 + words 9 + bbnf 4 = ≥22 sites |
| `.text-prose-lettrine` | prose-block composition + words ledger (14 prospective Etymology) |
| `.text-mono-body`, `.text-mono-prose` | speedtest 7 + keyframes 5 = 12 sites |
| `.section-subtitle` | value.js 9 sites |
| `.well-dashed` | value.js 2 + W4 containers/well-dashed story (≥2 bar cleared) |
| `.touch-gate-target`, `.touch-gate-active` | value.js 15 sites + paired with canon `useTouchGate` |
| `.confetti-piece` | words ReviewSessionComplete + W4 motion/confetti story (≥2 bar cleared) |
| `.collapse-x` | keyframes HeaderRibbon + W3 useCollapse paired |

All ≥2 bar cleared. Retired: `.gold-shimmer` (replaced by `.text-shimmer-gold`) — clean break per `feedback_no_backwards_compat`.

### Components (W3 + Wβ additions)

| Component | Sites |
|---|---|
| `<CreamSurface>` | demo + ledger projections (words 6+ paper-substrate retirements) |
| `<DisplayHero>` | demo + audacious-hero composition + 5+ ledger sites |
| `<FlourishDivider>` | foundations/flourishes + audacious-hero + multiple stories |
| `<IconStamp>` | foundations/icons + audacious-hero + tier-badge composition |
| `<MathSurface>` | math-paper composition + bbnf math surfaces |
| `<MathFormula>` | math-paper + prose-block + audacious-hero + foundations/golden-ratio |
| `<MathGlyph>` | math-paper + foundations/golden-ratio (φ glyph) + bbnf production-rule |
| `<KeyframeTimeline>` family (4 components) | motion/timeline + keyframes ledger (3 sites) |
| `<BezierCurveCanvas>` | motion/bezier-canvas + keyframes ledger + math-paper prospective |
| `<NotificationDot>` | primitives/notification-dot + fourier 4 sites + cross-consumer |
| `<KeyboardShortcutsModal>` | demo + keyframes consumer + speedtest consumer (≥2) |
| `<TierBadge>` | demo + fourier 4 sites |
| `<LikeButton>` | demo + fourier 2 sites |
| `<PipelineFlow>` | demo + bbnf 4 sites |
| `<LiveSnippet>` | code-prose composition + bbnf 4 internal slots |
| `<Blob>` | demo + value.js HeroBlob wrapper + foundations/blob (Wβ3) |
| `<Swatch>` | demo + value.js WatercolorDot retirement |
| `<SvgFilters>` | mounted in primitives/blob + paired with `<Swatch variant="watercolor">` |
| `<RainbowGradientDef>` | mounted with `<SvgFilters>` + paired with `.rainbow-stroke` |

All ≥2 bar cleared.

### CVA branches (W3 lane 4)

All 14 CVA branches have ≥1 W4 story site + ≥1 consumer ledger projection = ≥2 bar cleared:
- Button cartoon/transport/rainbow + size=icon
- Tabs underline/pill
- Select/Input/NumberField cartoon
- Toast inverse (W4 toast-inverse story + speedtest "Saved" ledger projection)
- Badge tone + variant=color
- MetricBadge xl
- ToggleGroupItem card (W4 toggle-card story + speedtest FlowSelector ledger)
- Card cream/paper

### Composables (W3 + Wβ1 additions)

| Composable | Sites |
|---|---|
| `useRAFLoop` | useWatercolorBlob + useBlob + blob-stress + keyframes ledger rename |
| `useCollapse` | demo + keyframes HeaderRibbon ledger |
| `useContrastSafeAccent` | value.js 4 sites |
| `useMonacoTheme` | bbnf 1 + ledger projection (D latex-paper, E keyframes) |
| `useBlob` + `useBlobMood` + `useBlobPointer` + `useBlobSatellites` + `useMetaballRenderer` + `useWatercolorBlob` | `<Blob>` + `<Swatch>` + value.js HeroBlob wrapper |
| `mulberry32` | useBlobSatellites + useWatercolorBlob + value.js prng.ts retirement |

All ≥2 bar cleared.

### Slot-class props + factories

| Artefact | Sites |
|---|---|
| `HoverCardContent.contentClass` | fourier ledger + bbnf RightPane.vue ledger |
| `DialogContent.closeIconClass` | value.js PaletteDialog ledger + cross-consumer |
| `DockLayerGroup.keepOpenWhile` | value.js 3 watcher hooks + bbnf 3 watcher hooks |
| `defineDockActionBar()` factory | value.js DockActionBar interface ledger |

All ≥2 bar cleared.

### Runtime tokens (W3 lane F)

| Artefact | Sites |
|---|---|
| `chartNeutrals` | speedtest useEChartsTheme.ts (3 sites consolidated) + ledger |
| `vizColorsHex` | speedtest chartMetrics.ts (8 hex sites) + fourier ledger |
| `spectrumColor` | fourier 5 spectrumColor copies retirement |
| `NAMED_EASING_BEZIER` | keyframes consumer + bbnf 7 cubic-bezier literal sites |
| `goldenShimmer` | value.js golden-shimmer.ts retirement |

All ≥2 bar cleared via consumer ledger projections.

## Verdict distribution

- **keep**: 17 custom packages + 14 CVA branches + 4 composables + 4 slot-class/factory + 5 runtime tokens + 17 utility-class groups + 11 token groups = ~72 artefacts.
- **delete-unused** (clean retirements): `--section-heading`, `:root[data-typography-preset="brand-uniform-sans"]`, `.gold-shimmer` (replaced by `.text-shimmer-gold`).
- **library-orphan**: 0.
- **inline-and-remove**: 0.
- **keep-current** (single live + evidence doc): 0 — every artefact cleared the ≥2 bar via cross-consumer ledger projections.
- **demo-only-private**: `_internal/blob-stress.vue` story (private debug — by design).

## Authority

Audit by orchestrator. Methodology: cross-reference each artefact against `audit/W5-{consumer}-migration.md` ledger projections + `demo/stories/` story sites. Every artefact cleared the bar.

The overfitting audit closes clean.
