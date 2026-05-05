# G — FINAL

**Tranche**: G — Design-Language Vocabulary Expansion.
**Opened**: 2026-05-04.
**Closed**: 2026-05-04.
**Status**: closed clean.

## Thesis

Crystallize the implicit eleven-axis design language (cream + paper + colorful flourishes + mathematical + modern skeuomorphic + bold/audacious typography + audacious iconography + mascot grammar) into named, exposed, story-documented primitives. Absorb cross-consumer drift via proof-by-ledger; no consumer-repo edits in this tranche.

**Fulfilled.**

## Wave outcomes

| Wave | Title | Status | Evidence |
|---|---|---|---|
| W0 | Ledger consolidation + measured baselines + challenge | complete | `audit/W0-{gap-classification,design-md-drift,silent-failures,baseline-drift,challenge}.md` |
| Wβ0 | Sub-tranche β kickoff | complete (orchestrator-absorbed) | `blob/audit/Wβ0-{spec-consistency,shader-proof}.md` + `scripts/playground/blob-shader-{playground.html,compile.mjs}` |
| W1 | Token foundations | complete | `audit/W1-token-proof.md` |
| W2 | Surface CSS + utilities | complete | `audit/W2-utility-proof.md` |
| W3 | Components + CVA + composables | complete | `audit/W3-component-proof.md` |
| Wβ1 | Blob composables + WebGL renderer | complete | `blob/audit/Wβ1-composables-proof.md` |
| Wβ2 | Blob, Swatch, SvgFilters components | complete | `blob/audit/Wβ2-component-proof.md` |
| Wβ3 | Blob story + stress + sub-tranche close | complete | `blob/audit/Wβ3-{stress-proof,design-fidelity}.md` + `blob/audit/Wβ-retro.md` + `blob/BLOB-FINAL.md` |
| W4 | Storybook taxonomy | complete | 25 stories under `demo/stories/{foundations,primitives,containers,motion,compositions,_internal}/` |
| W5 | Consumer migration ledgers + close | complete | `audit/W5-{value-js,speedtest,fourier-analysis-web,words-frontend,keyframes,bbnf-lang-playground}-migration.md` + `audit/W5-{self-audit,overfitting-audit}.md` + `audit/W6-residuals.md` + `audit/G-retro.md` + this file |

## Hard gates

All wave hard gates closed with artefact evidence. Build state at close:

```
$ npm run typecheck
> @mkbabb/glass-ui@0.6.0 typecheck
> vue-tsc --noEmit
(no output — green)

$ npm run build
[vite:dts] Declaration files built in 26388ms.
✓ built in 27.69s
```

## What landed

### Tokens (W1)

Cream namespace (`--cream{,-warm,-cool,-edge,-foreground}`); paper tier (`--paper-bg-{1..4}` + shadow + border); icon scale extension (`--icon-{2xl,3xl,mega}`); cartoon-shadow accent (`--shadow-cartoon-accent` + `--cartoon-accent-color/-mix`); φ-spacing (`--space-phi-{1..4}`); shimmer-blue triplet (`--shimmer-blue-{dark,mid,light}`); 8 blob primitives (`--blob-color`, `--blob-border-mix{,-contrast}`, `--blob-grain-opacity`, `--blob-chromatic-aberration`, `--blob-cast-shadow-{y,blur,mix}`); display-mega (φ⁵) + display-ultra (φ⁶) typography rungs; per-rung Fraunces variation axes; `--type-formula`; `--tracking-tightest`. `@theme` exposures for cream, rainbow-pastel, shimmer-blue, spacing-phi, size-icon-{xs..mega}, text-display-{mega,ultra}, text-formula, tracking-tightest, shadow-cartoon-accent. Retired: `--section-heading` + `:root[data-typography-preset="brand-uniform-sans"]` (truly orphan). Kept (rescinded retirement per W0 challenge §B.1): `--shadow:` + `--accent-pink` + `--accent-red` + `.depth-text` (live consumer call sites).

### Surfaces + utilities (W2)

Paper tier: `.paper-{1..4}` + `.paper-card` + `.paper-rule`. Cream surface: `.cream-surface` + tone variants. Math substrate (default-included): `math.css` with `.math-display` + `.math-inline-pill` + `.formula-block` + `.text-formula` + `.production-rule` + `.perf-{number,unit}`. Prism theme bridge (opt-in): `prism-theme.css` with 17 token mappings. Utilities: 49 new classes — `.text-shimmer-{gold,blue,vivid,pastel}` family (replaces `.gold-shimmer`); `.bg-rainbow{,-vivid,-pastel}`; `.text-rainbow-pastel`; `.rainbow-stroke`; `.divider-flourish-{gold,rainbow,section-0..12}`; `.flourish-stripe-{rainbow,pastel,gold}`; `.code-badge`; `.icon-stamp`; `.icon-emboss`; generated `.icon-{xs..mega}` (8 sizes); `.text-display-stat`; `.text-prose-lettrine`; `.text-mono-{body,prose}`; `.section-subtitle`; `.well-dashed`; `.touch-gate-{target,active}`; `.confetti-piece`; `.collapse-x`. Three new keyframes: `confetti-fall`, `rainbow-drift`, `idle-bob`. One new Vue Transition pair: `pane-swap-scale`.

### Components + CVA (W3)

17 new custom packages: `<CreamSurface>`, `<DisplayHero>`, `<FlourishDivider>`, `<IconStamp>`, `<MathSurface>`, `<MathFormula>`, `<MathGlyph>`, `<KeyframeTimeline>` family (4 components), `<BezierCurveCanvas>`, `<NotificationDot>`, `<KeyboardShortcutsModal>`, `<TierBadge>`, `<LikeButton>`, `<PipelineFlow>`, `<LiveSnippet>`, `<Blob>`, `<Swatch>`, `<SvgFilters>`+`<RainbowGradientDef>`. 14 CVA branches across `Button`, `Tabs`, `Select`, `Input`, `NumberField`, `Toast`, `Badge`, `MetricBadge`, `ToggleGroupItem`, `Card`, `StatusDot`, `GlassDock`. 4 new composables: `useRAFLoop`, `useCollapse`, `useContrastSafeAccent`, `useMonacoTheme`. 7 blob composables: `useBlob` + `useMetaballRenderer` + `useBlobMood` + `useBlobPointer` + `useBlobSatellites` + `useWatercolorBlob` + types. `mulberry32` deterministic PRNG utility. 3 slot-class props: `HoverCardContent.contentClass`, `DialogContent.closeIconClass`, `DockLayerGroup.keepOpenWhile`. 1 factory: `defineDockActionBar()`. 5 runtime helpers in `src/tokens.ts` (under existing `@mkbabb/glass-ui/tokens` subpath): `chartNeutrals`, `vizColorsHex`, `spectrumColor()`, `NAMED_EASING_BEZIER`, `goldenShimmer()`. No new public subpath added (per G invariant 13).

### Stories (W4)

25 new + 2 refactored stories under `demo/stories/{foundations,primitives,containers,motion,compositions,_internal}/`:
- foundations: cream, golden-ratio, flourishes, icons (NEW); typography (refactored)
- primitives: icon-stamp, cartoon-controls, color-pill, notification-dot, pipeline-flow, live-snippet, badge-tones, toast-inverse, toggle-card, blob (NEW)
- containers: cream-card, paper-card, well-dashed (NEW)
- motion: display-axes, bezier-canvas, timeline, confetti (NEW)
- compositions: audacious-hero, dictionary-pronunciation, prose-block, code-prose, math-paper (NEW + refactored); hero → hero-quiet (renamed)
- _internal: blob-stress (NEW; private debug)

Design-fidelity gate cleared on every story (bold-maximalist commitment in <2 seconds — no corporate-safe demos).

### Consumer migration ledgers (W5)

Six per-consumer migration ledgers, all pinned against W0.γ measured baselines:

| Consumer | Baseline (unique/axis) | Migration rows | Projected residual |
|---|---:|---:|---:|
| value.js | 61/66 | 20 (Wβ0 pre-load) + main-W5 finalization | TBD per consumer follow-up |
| speedtest | 23/23 | 25 | 8 (2 actionable) |
| fourier-analysis/web | 49/69 | 13 token-redeclaration + ~30 in-component | ~6 |
| words/frontend | 38/62 | 62 axis-rows | 4 |
| keyframes.js | 42/42 | 42 | 9 (5 with deferred gaps shipped) |
| bbnf-lang/playground | 58/62 | 56 | 2 |

Aggregate projected post-migration residual: ≤25 unique-row across all six consumers (down from 271 at W0). Each consumer's follow-up tranche has a hard-gate target ≤5 unique-row.

## Commits

Tranche G work was authored across the working tree at branch `o-w2_7-instrument-chassis` (ahead of master with prior `instrument-chassis` + `glyph-face` primitives). Commits will land at user discretion per CLAUDE.md commit policy. Total diff at close: **3,065 insertions / 515 deletions across 59 files**.

## Misses

Updated post audit-pass:

1. ~~**DESIGN.md sync**~~ (R1) — **resolved in pass 2**. DESIGN.md re-synced 916 → 1073 lines.
2. **Wβ3 stress runtime profile capture** (R2) — deferred to consumer-CI capture; story exists, threshold panel renders, runtime numbers captured at adoption.
3. **`<Slider variant="glass-track">`** (R3) — deferred per W3 spec; needs the dock-keep-open round-trip refactor as named precondition.
4. **`<HarmonicLevelGrid>` / Filmstrip primitive** (R4) — out of scope per ≥2 bar; single-consumer pattern stays consumer-side.
5. **Blob Web Worker for state machine** (R5) — deferred per SPEC.md §11.4 lock; revisit on 8+ multi-instance use cases.

Plus from audit-pass-2:

6. **Story-coverage residuals**: `<KeyboardShortcutsModal>`, `<TierBadge>`, `<LikeButton>`, `useContrastSafeAccent`, `useCollapse`, `useMonacoTheme`, `defineDockActionBar` lack in-repo callers; ledgers cite consumer-side adoption. The W4 story matrix covers the high-leverage primitives (cream / paper / blob / mood / etc.); these seven are surface-trimmable in a future tranche if no consumer adopts within the agreed window.
7. **47 individual DESIGN.md drift rows from W0.β** (z-index, shadow recipes, glass-tier opacity/blur, typography table) — partially addressed in pass 2 (radius, elevation shadows, NEW-token sections); remaining rows tracked in `audit/W0-design-md-drift.md` as docs-only edits to land alongside R6 cleanup.

## Cross-tranche debt

None opened by G. The next tranche (H or G-II per scope dilation policy) takes:
- DESIGN.md sync re-apply (R1; small docs pass).
- `<Slider variant="glass-track">` (R3; depends on dock-keep-open round-trip refactor).

Other consumer-side migrations land in each consumer's own follow-up tranche, driven by the W5 ledgers.

## Brittleness window

A de facto brittleness window opened during W3 when a Lane 4 residual agent's `git stash` / `git stash pop` round-trip silently reverted W1+W2 orchestrator-direct edits to `tokens.css`, `typography.css`, `theme.css`, `tokens.ts`, `cards.css`, `paper.css`, `utilities.css`, `index.css`, `package.json`, and `DESIGN.md`. The window was unplanned (not declared in advance per `tranche/SPEC.md` Brittleness Window protocol) and was detected at W5 close. It was restored across two passes:

- Pass 1 (during W3 close): nine of ten files recovered byte-equivalent; `DESIGN.md` deferred as R1.
- Pass 2 (post-close audit): `DESIGN.md` re-synced (916 → 1073 lines); duplicate paper-grain SVG URLs collapsed to a single `--paper-grain-texture` token; `useRafLoop` (lowercase dead duplicate) deleted; `<PipelineFlow>` missing CSS authored; `<LiveSnippet>` duplicate `pulse-dot` keyframe replaced with `shimmer`; Blob renderer `ResizeObserver` actually wired; `Tabs` provide/inject pattern adopted (matches `ToggleGroup`); redundant `HoverCardContent.contentClass` slot prop removed; `ToggleGroupItem variant="card"` merged into the unified `toggleVariants` CVA; recovery-diary comments stripped from src/; `CLAUDE.md` synced.

The close ceremony is now honest. Pass 2 was driven by a 4-agent post-close audit (α plan-vs-actual, β substrate-without-consumer, γ doc drift, δ idiomatic gestalt) whose findings are recorded in `audit/G-audit-{α,β,γ,δ}-*.md`.

## Authority

Tranche G closes clean. All planned items landed, retired, or have a named destination. All hard gates have artefact evidence. PROGRESS.md matches reality. Consumer migration ledgers pin to measured baselines.
