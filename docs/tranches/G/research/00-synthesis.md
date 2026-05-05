# Tranche G — Cross-Lane Synthesis

Merges lanes A–G into one orchestrator reference. Lanes:

- **A** `A-glass-ui-self.md` — self audit of `@mkbabb/glass-ui` against the seven axes; F residuals; design-language gaps.
- **B** `B-speedtest.md` — speedtest dashboard + meter chassis + dock.
- **C** `C-fourier-analysis-web.md` — KaTeX-driven math consumer, paper page, gallery, harmonic morph.
- **D** `D-words-frontend.md` — dictionary / SRS / paper substrate, Fraunces-as-everything.
- **E** `E-keyframes.md` — motion engine demos (cube/easing/playground/cube/amiga); timelines, bezier canvas.
- **F** `F-value-js.md` — color-picker, palette browser, dock action-bar, watercolor swatches.
- **G** `G-bbnf-lang-playground.md` — bbnf-lang playground (Monaco + glass-ui + keyframes.js + value.js stack). *Lane G dispatched after the other six; W0.α folds its findings into the synthesis. Counts below are pre-fold; W0 retallies.*

## User-direction overlay (2026-05-04)

The following decisions narrow the synthesis. Read these *first* — they override gap-by-gap shape choices the orchestrator made before the user disambiguation pass.

1. **Paper tier**: separate `paper-1..4` family, *not* a glass-tier blur knob.
2. **math.css**: default-included via `src/styles/index.css` cascade; not opt-in.
3. **Modern skeuomorphic shadowing**: fold into existing cartoon-shadow family via `--shadow-cartoon-accent` extension; *no new bevel vocabulary* (`--shadow-skeuo-*`, `.glass-skeuo`, `Switch variant="skeuo"`, `Toggle variant="skeuo"` all out of scope).
4. **Cream**: canon default; `--cream-*` tokens land in `tokens.css`.
5. **`active-scale` / `disabled-base`**: F.W4 removed them as redundant atoms of `.interactive-item` (lines 34-54 of utilities.css). Tailwind one-liners replace them. Not re-added; W5 ledger covers consumer migration.
6. **Per-rung Fraunces axes**: ship the per-rung tokens (audacious sizes get `SOFT 100`, `wdth 110`+); identity tightens, mild footgun, accepted.
7. **W5 discipline**: proof-by-ledger; *no consumer-repo edits* land in this tranche.
8. **`brand-uniform-sans` preset**: retired; symmetric `brand-uniform-display` does *not* ship (consumer-side preset territory).
9. **W0 must measure drift baseline per consumer** at HEAD; W5 deltas pin to that baseline, not synthesis arithmetic.
10. **value.js blob primitives lift**: broad — `useWatercolorBlob`, `useMetaballRenderer`, `<SvgFilters>` filter pack, `<Swatch variant="watercolor">`, `<HeroBlob>`/`<GooBlob>` general primitive; Mulberry32 PRNG promotes with them.
11. **bbnf-lang/playground is a consumer**: 7th audit lane added.
12. **No new public subpath**: runtime helpers (`spectrumColor`, `goldenShimmer`, `chartNeutrals`, `vizColorsHex`, `NAMED_EASING_BEZIER`) ship under existing `@mkbabb/glass-ui/tokens`.
13. **Orphan accent retirement**: `--accent-pink`, `--section-heading`, `--accent-red` all retired in W1.
14. **Tranche letter**: G.

## Pass-2 user disambiguation (post-bbnf-lang fold-in)

The Q16-Q29 round resolved the new gaps surfaced by lane G and re-shaped several existing gaps:

15. **Gap 17 split** — `<Collapse>` keeps the row; `<SplitPane>` becomes its own row but goes to risk register (single live consumer).
16. **`<TelemetryHoverCard>`** — absorbed into existing gap 36 as `<HoverCard>` + `<DataList>`. No separate primitive.
17. **`<Badge variant="section">`** — absorbed into gap 13 by adding an `:icon` slot to `Badge variant="color"`. No separate variant.
18. **`<StatusPill tone>`** — absorbed into gap 24 by extending `Badge tone=` to render with default lucide icons per tone. No separate primitive.
19. **`<SplitPane>`, `runtimeHighlight()`, `<HorizontalBarChart>`, `useMonacoTheme()` (initially), `<WalkthroughTour>`** — risk register (single live consumer / domain-specific).
20. **`<ProductionRule>`** — in scope under math.css. Primitive of the math axis even at single live site (per G invariant 3).
21. **`<PipelineFlow>`** and **`<LiveSnippet>`** — in scope (W3 main track, Lane D').
22. **`useMonacoTheme()`** — in scope. Watches `useGlobalDark`, calls `monaco.editor.setTheme()`. ~15-line composable in `src/composables/monaco/`.
23. **Prism/Shiki bridge** — single artifact: `src/styles/prism-theme.css` consuming canon CSS variables; light/dark via canon's `.dark` cascade. Opt-in import (not in default cascade). Shiki users compute from CSS vars at runtime.
24. **Blob deep absorb (sub-tranche β)** — `<Blob>` (renamed from GooBlob, single primitive — HeroBlob stays consumer-side as a wrapper), full-greenfield WebGL renderer + 11 improvements per `docs/tranches/G/blob/SPEC.md`. Five moods shipped as default; `:config` prop only (no provide/inject); `mulberry32` public utility; size as `string | number`. Sub-tranche has its own four waves (Wβ0–Wβ3).
25. **Cartoon-shadow `--shadow-cartoon-lg` rung** — added to W1 token list (5px+7px asymmetric hover step from bbnf evidence).
26. **Two new silent failures from bbnf** — `.code-badge` (6 sites) and `.blue-shimmer` (5 sites via `shimmerClass()`). Resolution lands in W2.
27. **Frontend-design lens applied tranche-wide** — bold-maximalist commitment recorded as the explicit Design POV in G.md. W4 ships a "design fidelity gate" — every story must land a deliberate design-language choice visible in <2 seconds.

## Drift totals

| Lane | Drift rows | Notable concentration |
|------|------:|---|
| A | 5 (P3) | `.depth-text` dead recipe; DESIGN.md z-index/icon claim drift; `--accent-pink` orphan; `brand-uniform-sans` orphan preset; `.metric-badge`/`.input-bar` raw blur literals |
| B | 20 | 10× `.section-label` reinvented; `useEChartsTheme` baking neutral hex; `.meter-card` fifth glass tier; raw status-color tailwind |
| C | 49 | `fourier-overrides.css` ~150 lines redeclaring tokens already in canon; 9× `#f0b632` golden literal; 5× `spectrumColor` copies; bespoke modals/hovercards |
| D | 38 | 18+ ad-hoc `.section-label` shapes; parallel paper substrate (`card-surface`/`popover-surface`/`dialog-surface`/`word-card`); 9+ display headings bypassing `.text-display-*`; `.active-scale`/`.disabled-base` referenced but removed in F |
| E | 42 | `.tab-trigger-{base,pill,underline}` reinvents Tabs; `.btn-playback{,-accent}` reinvents Button four-state; bespoke pop/scene transitions duplicating canon; `font-mono text-2xs` reinventing `.text-admin-label` |
| F | 61 | 12+ recipes reinventing canonical `Button`/`Tabs`/`Dialog`; 3 silent-failure classes (`gold-shimmer` text variant, `dashed-well`, `stagger-children`); accent-tinted cartoon shadows everywhere |
| **Σ** | **215** | converges on ≤25 canonical replacements once coalesced |

## Cross-cutting themes

### Theme 1 — Design-language vocabulary expansion (user-named axes)

The user's eleven axes map onto concrete primitives the lanes evidence:

| Axis | Primary lanes | Library additions | Call-site reach |
|---|---|---|---|
| **Cream** (new identity name) | A,C,D | Name the cream namespace; `<CreamSurface>`; `Card variant="cream"`; `paper-1..4` defaults to cream | C+D redeclare canon's hue-48 cream; A surfaces existing identity; B leans away from cream |
| **Paper tier (no-blur sibling of glass tiers)** | D,B | `--paper-bg-{1..4}`, `.paper-1..4`, `.paper-card`, `Card variant="paper"`; `.paper-rule` (lined-paper) | D ≥6 sites + REFACTOR_PLAN; B `.meter-card` recessed-glass shape (≈ paper at non-zero blur) |
| **Colorful flourishes** | A,C,D,E,F | `.bg-rainbow{,-vivid,-pastel}`; `.text-rainbow-pastel`; `.text-shimmer-gold`; `.rainbow-stroke`; `<RainbowGradientDef>`; `<FlourishDivider>`; `.flourish-stripe-{rainbow,gold}`; `--rainbow-pastel-*` exposed in `@theme` (A drift 4.1) | A 3 demo + C 2 + D rainbow-shimmer + E 2 + F 5 silently-broken refs ≈ 13 |
| **Mathematical** | C,A,E | `math.css` (`@import "@mkbabb/glass-ui/styles/math"`): `--type-formula`, `.math-display`, `.math-inline-pill`; `<MathSurface>`; `<MathFormula>`; `<MathGlyph>`/`<TypographicIcon>`; φ-spacing tokens `--space-phi-{1..4}`; `goldenShimmer` canvas helper; runtime `spectrumColor` + `NAMED_EASING_BEZIER` table | C 7+ KaTeX surfaces, 5 spectrumColor copies, 5 typography-as-icon sites; A math-paper story; E bezier canvas |
| **Modern skeuomorphic with shadowing** | A,B,D,F,C | `--shadow-skeuo-{raised,pressed}` bevel pair; `--shadow-cartoon-accent` w/ `--cartoon-accent-color` hook; `Card variant="cartoon-paper"`; `Button variant="cartoon" size="icon"`; `Switch variant="skeuo"`; `Toggle variant="skeuo"`; `<SelectTrigger variant="cartoon">`/`<Input variant="cartoon">` | D 8+ cartoon icon buttons; F 5 accent-tinted shadows; C 5+ cartoon select/input; B chassis spec |
| **Bold / audacious large typography** | A,B,D,F | `--type-display-mega` (φ⁵), `--type-display-ultra` (φ⁶); per-rung `--font-display-{rung}-variation-settings` (WONK/SOFT/wdth); `--tracking-tightest`; `.text-display-stat` (display + tabular-nums + leading-none); `<DisplayHero>`; `brand-uniform-display` preset; `.text-prose-lettrine` (drop cap) | D 9+ stat sites, 18+ section-label sites, lettrine prospective 3+; B `.text-hero` + `.text-pane-title`; F 2 display selectors |
| **Large / audacious iconography** | A,B,C,F,D | `--icon-{2xl,3xl,mega}`; generated `.icon-{xs..mega}` utilities (closes DESIGN.md drift); `--size-icon-{xs..mega}` `@theme` mapping; `.icon-stamp`/`.icon-emboss`; `<IconStamp>`; optical-offset play/pause icon contract | B `--icon-lg`/`--icon-md` chrome/content split; A empty-states; C 5rem dark-mode toggle; F 7rem GooBlob + dock dot; E play/pause optical offset |

### Theme 2 — Convergence (drift cleanup, the audit's bidirectional payoff)

The single highest-leverage moves:

1. **C: retire `fourier-overrides.css` token redeclaration** (~150 lines) — every section-color, viz-basis, tier, semantic accent, easing-accent, type-{micro,admin-label}, `.cm-serif`/`.fira-code`/`.fourier-f` already lives in canon.
2. **B+D: `.section-label` migration** — 18+ sites in D, 10 in B, scattered in C.
3. **D: parallel paper substrate retirement** — `.dialog-surface`/`.popover-surface`/`.card-surface` collapse onto `Card variant="paper"` + canonical glass tiers once `paper-1..4` lands.
4. **C: bespoke modals/hovercards** retire onto `<Dialog>`/`<HoverCard>` once `HoverCardContent` exposes a slot-class prop and `Dialog` exposes `closeIconClass`.
5. **D+C: cartoon icon button** — 14+ sites across consumers absorb into `Button variant="cartoon" size="icon"`.
6. **F: silent failures fix** — `gold-shimmer` text, `dashed-well`, `stagger-children` either ship as utilities (G2) or be removed from consumers; 3 silently broken visuals.
7. **B: `chartNeutrals`+`vizColorsHex` JS exports** — echarts/canvas can't read CSS vars; ~12 hex literals across 3 files collapse to one import.
8. **D+E: Fraunces axes** — `.text-display-{1..5}` exists with `WONK 1, SOFT 0` baked in; consumers bypass with raw `font-bold font-serif`. Storybook + docs.

### Theme 3 — Library hygiene (silent failures, dead code, DESIGN.md drift)

Per `feedback_overfitting_audit`:

- A axis 1.5 + 2.1: `.depth-text` dead (zero in-source consumers) — repurpose as canonical skeuo text utility for new `<DisplayHero>` + splash.
- A axis 2.2: `data-typography-preset="brand-uniform-sans"` orphan — single-presence preset; D evidences need for symmetric `brand-uniform-display` (gap 2.4); ship the pair or retire both.
- A axis 2.3: `.icon-{xs..xl}` documented in DESIGN.md but never generated. Generate from existing tokens.
- A axis 4.1: `--rainbow-pastel-*` not in `@theme`. 3 demo sites need `bg-rainbow-pastel-*`.
- A axis 4.2: `--accent-pink` / `--section-heading` orphan tokens, no consumers.
- A axis 5.1: DESIGN.md z-index numbers contradict `tokens.css` (60/70/80/100 vs 120/120/130/140/160). Update DESIGN.md only.
- D + cross-lane: `.active-scale`, `.disabled-base` removed in F.W4 but still referenced — re-add (cheap; many consumer sites) or migrate consumers to `.interactive-item`.

## Glass-ui gaps deduplicated (cross-lane call-site totals)

Sorted by total call-site count across all lanes (`feedback_overfitting_audit` ≥2 bar):

| # | Gap | Lanes | Total sites |
|--|---|---|---:|
| 1 | `.section-label` migration (existing canon) — drift, not gap; listed for tally | B,D,C | ≥30 |
| 2 | `--shadow-cartoon-accent` recipe + `--cartoon-accent-color` hook | F,B,C,D | 13 |
| 3 | `Button variant="cartoon" size="icon"` | D,C,F,A | 16 |
| 4 | `paper-1..4` tier + `Card variant="paper"` + `.paper-card` | D,B,A,C | 13 |
| 5 | Cream namespace (`--cream*`) + `<CreamSurface>` + `Card variant="cream"` | A,C,D | 6+ |
| 6 | Display-mega/ultra type rungs + `<DisplayHero>` + per-rung Fraunces axes | A,B,D,F | 13 |
| 7 | `--icon-{2xl,3xl,mega}` + `<IconStamp>` + generated `.icon-{xs..mega}` utilities | A,B,C,F,D | 12 |
| 8 | Skeuo bevel pair `--shadow-skeuo-{raised,pressed}` + `.glass-skeuo` tier + `Switch variant="skeuo"` | A | 6+ (3 named + prospective) |
| 9 | Rainbow utilities (`.bg-rainbow*`, `.text-rainbow-pastel`, `.text-shimmer-gold`, `.rainbow-stroke`, `<RainbowGradientDef>`) + `--rainbow-pastel-*` `@theme` exposure | A,C,D,E,F | 13 (incl. 3 silent failures) |
| 10 | `<MathSurface>` + math.css + `<MathFormula>` + `<MathGlyph>`/`<TypographicIcon>` + `--type-formula` | C,A | 7+ KaTeX, 5 glyph sites |
| 11 | Spectrum/rainbow runtime utilities (`spectrumColor`, `vizColorsHex`, `chartNeutrals`, `NAMED_EASING_BEZIER`, `goldenShimmer` canvas helper) | C,B,E | ~25 hex literals + 5 spectrumColor + 8 echarts hex |
| 12 | `<Swatch>` solid/cartoon/watercolor (with `<SvgFilters>` companion) | F,C | 5+ palette + basis preview |
| 13 | `<ColorPill>` / `Badge variant="color"` + categorical color encoding | C,F | 6+ basis + palette pills |
| 14 | `<NotificationDot>` / `DockIconButton :badge` | C | 4 |
| 15 | `Tabs` `variant="underline" \| "pill"` (CVA branch) | E,F | 4 + 2 |
| 16 | `<Input variant="cartoon">` / `<SelectTrigger variant="cartoon">` / `<NumberField variant="cartoon">` | C | 5+ |
| 17 | `pane-swap-scale` transition + `.collapse-x` utility + `useCollapse({ axis })` composable | E | 3 |
| 18 | `<KeyframeTimeline>` family (`<TimelineMarker>`, `<TimelineRuler>`, `<TimelinePlayhead>`) + `<BezierCurveCanvas>` | E | timeline 3, canvas 1+prospective math-paper |
| 19 | `useRafLoop` composable | E | 2 prospective+1 site |
| 20 | `<KeyboardShortcutsModal>` reference component | E,B | 2 (E + speedtest) |
| 21 | `<StatusDot variant="progress">` (conic-gradient + glow) | E | 2 |
| 22 | `<Toast variant="inverse">` | E | 1+prospective ≥2 |
| 23 | `<FlourishDivider>` + `.divider-flourish-{rainbow,gold}` + `.flourish-stripe-{rainbow,pastel}` | A | 3 demo + prospective |
| 24 | `Badge tone="success \| warning \| destructive \| info"` | B,D | 3+3 |
| 25 | `Progress :smoothed-value` prop wrapping `useAnimatedNumber` (or document existing pattern) | B | 7 |
| 26 | `MetricBadge size="xl"` (display-tier) | B | 9 |
| 27 | `ToggleGroupItem variant="card"` (tier-aware toggle) | B | 1 + prospective |
| 28 | `.text-mono-body` + `.text-mono-prose` (round out family) | B,E | 7+5 |
| 29 | `.well-dashed` utility | F | 2 |
| 30 | `.section-subtitle` companion to `.section-label` | F | 3+ |
| 31 | `.touch-gate-target` + `.touch-gate-active` (pair with existing `useTouchGate`) | F | 3 |
| 32 | `.confetti-piece` utility | D | 1 + prospective |
| 33 | `.text-prose-lettrine` (drop cap) | D | 3+ |
| 34 | `brand-uniform-display` typography preset (companion to `brand-uniform-sans`) | D | 1+latex-paper sibling |
| 35 | `.text-display-stat` (display + tabular-nums + leading-none) | D | 9 |
| 36 | `<DataList>` / key-value tooltip body | C | 4 |
| 37 | `<TierBadge>` (Crown/Bookmark) + `<LikeButton>` | C | 4+2 |
| 38 | `Button variant="transport" \| "rainbow"` + rainbow play-pause optical-offset contract | E,C | 4+1 |
| 39 | `GlassDock position="fixed"` auto-applies safe-area-inset-bottom | E | 2 prospective |
| 40 | `<Slider variant="glass-track">` (pointer-capture + `:keep-dock-open` round-trip) | C | 3 |
| 41 | `DockLayerGroup :keepOpenWhile` + exported `defineDockActionBar()` factory | F | 3 watcher hooks per consumer |
| 42 | Slot-class props on reka wrappers (`HoverCardContent` content-class, `Dialog` `closeIconClass`) | F,C | 2 |
| 43 | `useContrastSafeAccent` composable shape (no color-math dep) | F | 4 |

## Risk register (consumer-side preset territory; do NOT promote)

Consolidated from per-lane risk registers, deduped:

- **B**: `.text-hero` cqi, 0.22em tracking, aurora preset, `--meter-*`, `--th-accent`, mobile carve specifics, dock height calc.
- **C**: KaTeX `@font-face` boilerplate, `useFourierMorph`, latex-paper integration, `TIER_INFO.{spline,fourier,...}`, harmonic morph SVG, the per-section named-color mapping.
- **D**: SRS mastery tiers (`gold/silver/bronze` × `[data-theme]`), `card-state-{new,learning,young,mature,relearning}`, `review-{again,hard,good,easy}`, themed-cards system, Yoshi mascot keyframes (`wiggle`, `sparkle-slide`, `elastic-bounce`), `--paper-handmade-texture`/`-kraft-texture` runtime switching, `useTextureSystem` composable.
- **E**: `instrument-serif` brand, ppmycota brand, `--accent-red` consumer brand, MatrixEditor, OrbitalDrag composables, Monaco editor, html2canvas previews, animation-store hash-share, scene routing, step-easing `jump-*` parameterization.
- **F**: color-picker family (`ColorPicker`, `ColorSpaceSelector`, `ColorInput`, `SpectrumCanvas`, `MiniColorPicker`, `ComponentSliders`), `useColorModel`, palette-browser (Hono+Mongo bound), `useWatercolorBlob` (Mulberry32 PRNG; promotable only with second non-color call site), GooBlob (palette-mascot specific), pane-slide rotate-on-exit, `--shadow-card 8px` override (3× canon).

The `--axis-{x,y,z,w}` 3D-tooling color convention from E is borderline — promote only with explicit 3D-math-tooling framing or hold for math-paper.

## Wave shape (proposal — feeds G.md)

Six waves, F-shaped:

- **W0** Ledger consolidation + challenge — confirm cross-lane gap counts, classify each gap as (vocabulary expansion / convergence drift / silent-failure-or-dead-code), DESIGN.md numeric drift fix scope. Read-only on src/styles, demo, consumers; write-only on `docs/tranches/G/`.
- **W1** Token foundations — orchestrator-owned. Cream namespace, φ-spacing, display-mega/ultra rungs + per-rung Fraunces axes, `--icon-{2xl..mega}`, skeuo bevel + accent-tinted cartoon shadow, `--type-formula`, `--paper-bg-{1..4}`, status JS exports, `--rainbow-pastel-*` `@theme` exposure, retire `--accent-pink`/`--shadow` orphan, fix DESIGN.md numeric drift, decide `brand-uniform-sans`/`brand-uniform-display` pair.
- **W2** Surface CSS + utilities — single style authority per family. paper.css (`paper-1..4`, `paper-card`, `paper-rule`); glass.css (`.glass-skeuo`); cards.css/utilities.css (cream-surface, formula-block, icon-stamp/emboss, divider-flourish-*, flourish-stripe-*, text-rainbow-pastel/shimmer-gold, bg-rainbow-{vivid,pastel}, rainbow-stroke, touch-gate-*, well-dashed, section-subtitle, collapse-x, confetti-piece, text-prose-lettrine, text-display-stat); generate `.icon-{xs..mega}`; new math.css opt-in; re-add `.active-scale`/`.disabled-base`.
- **W3** Components + CVA branches + composables — `<MathSurface>`/`<MathFormula>`/`<MathGlyph>`, `<DisplayHero>`, `<IconStamp>`, `<CreamSurface>`, `<FlourishDivider>`, `<Swatch>`+`<SvgFilters>`, `<ColorPill>`, `<NotificationDot>`, `<TierBadge>`, `<LikeButton>`, `<KeyframeTimeline>` family, `<BezierCurveCanvas>`, `<StatusDot variant="progress">`, `<KeyboardShortcutsModal>`, `<RainbowGradientDef>`. CVA branches across Card/Button/Switch/Toggle/Tabs/SelectTrigger/Input/NumberField/Toast/Badge. Slot-class props on reka wrappers. Composables `useRafLoop`, `useContrastSafeAccent`, `useCollapse({ axis })`. Runtime tokens module additions: `chartNeutrals`, `vizColorsHex`, `spectrumColor`, `NAMED_EASING_BEZIER`, `goldenShimmer`.
- **W4** Storybook taxonomy — `foundations/{cream,golden-ratio,flourishes,icons}`, refactor `foundations/typography` (Fraunces axes + display-mega/ultra), `primitives/{icon-stamp,skeuo-controls,swatch,color-pill,notification-dot}`, `containers/{cream-card,paper-card}`, `motion/{display-axes,bezier-canvas,timeline}`, refactor `compositions/math-paper` onto new primitives, add `compositions/audacious-hero` + rename existing hero → `hero-quiet`, add `compositions/{dictionary-pronunciation,prose-block}`.
- **W5** Consumer rollout proof + close — drift-heaviest consumer (C: fourier-analysis/web) absorbs the new vocabulary; B speedtest absorbs `chartNeutrals` JS-token migration + `.section-label` migration; D words/frontend absorbs `paper-1..4` (the load-bearing one) + `.section-label` migration; E keyframes.js consumes `<KeyframeTimeline>`/`<BezierCurveCanvas>` if shipped; F value.js consumes `<Swatch>`/`<ColorPill>` + accent-tinted cartoon shadow + silent-failure fixes. Each consumer reports drift count delta vs W0 baseline. Re-run `docs/audits/style-audit.md` per consumer. Run `docs/audits/overfitting-audit.md` per `feedback_overfitting_audit`. Final tally: drift delta, lines retired (target ≥150 in C alone), components added, ≥2 call-site bar verified.

## Tally

215 drift rows · 43 deduped gaps · 23 risk-register items · 3 silent-failure visuals · ≥150-line consumer convergence opportunity in C · 6 waves proposed.
