# W0 — Gap Classification (lane α)

- **Agent**: G.W0.α (vocabulary + convergence verification)
- **Date**: 2026-05-04
- **Scope**: classify every gap row from `docs/tranches/G/research/00-synthesis.md` (post bbnf-lang/playground fold-in) into `vocabulary | convergence | hygiene`, assign owning wave, lead file(s), verified call-site count, and accepted/rejected status.
- **Methodology**: read all seven lane reports + synthesis + G.md + W0.md + blob/SPEC.md. Cross-checked every cited count with `rg` against the live consumer trees at HEAD (`speedtest`, `fourier-analysis/web`, `words/frontend`, `keyframes.js`, `value.js`, `bbnf-lang/playground`) and against `glass-ui/src` for canon presence. Cross-checked git log on `master` for any post-synthesis absorption (only versioned dock+blur tweaks landed; none absorb a vocabulary gap).
- **Bucket definitions** (per W0.md):
  - **vocabulary**: net-new token / utility / component / composable that materializes a user-named axis.
  - **convergence**: canonical replacement already exists; consumers (or glass-ui itself) reinvented it.
  - **hygiene**: silent-failure / dead-recipe / DESIGN.md drift to fix.
- **Wave shorthand**: W1 = tokens, W2 = surface CSS, W3 = components / composables, Wβ-N = blob sub-tranche, W4 = stories, W5 = ledger / no consumer edits.

---

## Gap Table

| # | Name | Bucket | Wave | Lead file(s) | Call-site count (verified) | Risk-of-overfitting note | Accepted/Rejected |
|--:|---|---|---|---|---|---|---|
| 1 | `.section-label` migration (drift, not gap; tally row) | convergence | W5 | (consumer-side, ledger only) | 8 speedtest + 9 words + 10 bbnf + scattered C/F = ≥30 sites; canon class already in `typography.css:286`. | None — class exists; consumers reinvent; ≥2 bar trivially cleared. | **accepted** (W5 ledger) |
| 2 | `--shadow-cartoon-accent` recipe + `--cartoon-accent-color` hook (+ `--shadow-cartoon-lg` rung from bbnf evidence) | vocabulary | W1 | `src/styles/tokens.css` (token); `src/styles/utilities.css` (utility) | 27+ across F (5), B (chassis), C (5+), D (8+), bbnf (14+); `--shadow-cartoon-lg` 5px+7px hover step from bbnf preset. | None — accent-tinted cartoon shadow is the modern-skeuo axis; G.md invariant 7 declares the bevel pair out-of-scope, this is the canonical replacement. | **accepted** |
| 3 | `Button variant="cartoon" size="icon"` | vocabulary | W3 | `src/components/ui/button/index.ts` | 16 (D 8+, C 5+, F, A); words sidebar pattern repeats 12× alone. | None — direct replacement of an inline 40-char Tailwind chain at 8+ sites. | **accepted** |
| 4 | `paper-1..4` tier + `Card variant="paper"` + `.paper-card` | vocabulary | W2 (surfaces) + W3 (variant) | `src/styles/paper.css` (rename / extend), `src/components/ui/card/Card.vue` | 13 (D 6+ + REFACTOR_PLAN, B `.meter-card` recess, A surface story, C `.paper-article`); words paper-substrate sites: 29. | None — user-direction overlay #1 names paper as a tier sibling, not a glass blur knob. Canonical primitive. | **accepted** |
| 5 | Cream namespace (`--cream*`) + `<CreamSurface>` + `Card variant="cream"` | vocabulary | W1 (tokens) + W3 (component/variant) | `src/styles/tokens.css`, `src/components/custom/cream-surface/`, `src/components/ui/card/Card.vue` | 6+ direct sites (A self math-paper + auth-shell story, C 2 `--background hsl(48`, D 2 same); cream is *already* the library identity (`tokens.css:3-6`) — gap is naming, not adding. | None — user-direction #4 declares cream canon default; per `feedback_presets_in_consumer`, named themed variants stay consumer-side, the warm-cream noun lives in glass-ui. | **accepted** |
| 6 | Display-mega/ultra type rungs + `<DisplayHero>` + per-rung Fraunces axes | vocabulary | W1 (tokens + axes) + W3 (component) | `src/styles/typography.css`, `src/components/custom/display-hero/` | 16+ (A self, B `.text-hero`, D 9+ stat sites + `AnimatedText` text-7xl, F display selectors, bbnf hero `text-display-2 sm:text-display-3` + 2xl logo + editor pane title `text-3xl`). | None — user-direction #6 accepts mild footgun of per-rung axes; G.md Design POV makes per-rung WONK/SOFT/wdth load-bearing. | **accepted** |
| 7 | `--icon-{2xl,3xl,mega}` + `<IconStamp>` + generated `.icon-{xs..mega}` utilities | vocabulary | W1 (tokens) + W2 (utility generation) + W3 (component) | `src/styles/tokens.css`, `src/styles/utilities.css`, `src/components/custom/icon-stamp/` | 12+ (B chrome/content split, A empty-states, C 5rem dark-mode + 2.2em basis F-glyph, F 7rem GooBlob, D StarIcon, E play/pause, bbnf `BbnfLogo` h-4..h-20 grid). | None — `.icon-{xs..xl}` claimed by DESIGN.md but ungenerated (A axis 2.3) — drift fix + token expansion. | **accepted** |
| 8 | Skeuo bevel pair `--shadow-skeuo-{raised,pressed}` + `.glass-skeuo` tier + `Switch variant="skeuo"` | — | — | — | 0 consumer sites (only A self-evidence; bbnf has *zero* skeuo signal) | Out of scope per G.md invariant 7 + user-direction #3 — modern-skeuo axis is delivered by extending cartoon-shadow, not adding bevel vocabulary. | **rejected** (superseded by gap 2) |
| 9 | Rainbow utilities (`.bg-rainbow*`, `.text-rainbow-pastel`, `.text-shimmer-gold`, `.rainbow-stroke`, `<RainbowGradientDef>`) + `--rainbow-pastel-*` `@theme` exposure | vocabulary | W2 (utilities) + W3 (`<RainbowGradientDef>`) | `src/styles/utilities.css`, `src/styles/theme.css`, `src/components/custom/svg-filters/` | 21 sites (consumer rainbow refs across F+E+bbnf+C+D); 3 silent failures (`gold-shimmer` text variant, `rainbow-vivid`/`rainbow-pastel` undefined classes in keyframes.js demo, `pastel-rainbow-text` value.js). | None — A axis 4.1 surfaces 3 demo sites in glass-ui itself; ≥2 bar cleared internally + cross-consumer demand. | **accepted** |
| 10 | `<MathSurface>` + math.css + `<MathFormula>` + `<MathGlyph>`/`<TypographicIcon>` + `--type-formula` (+ `<ProductionRule>`/`.production-rule` from bbnf fold-in) | vocabulary | W1 (`--type-formula`) + W2 (`math.css`) + W3 (components) | `src/styles/math.css` (NEW), `src/styles/tokens.css`, `src/components/custom/math-surface/`, `src/components/custom/math-formula/`, `src/components/custom/math-glyph/` | 12+ (C 7+ KaTeX surfaces + 5 typography-as-icon + 5 spectrumColor; A self math-paper story; bbnf 5+ math-grammar surfaces + `.perf-number`/`.perf-unit` + `.production-rule` shape). | `<ProductionRule>` is single-live-consumer (bbnf) but G.md invariant 3 names it a math-axis primitive; in scope per user-direction Q20. | **accepted** |
| 11 | Spectrum/rainbow runtime utilities (`spectrumColor`, `vizColorsHex`, `chartNeutrals`, `NAMED_EASING_BEZIER`, `goldenShimmer` canvas helper) | vocabulary | W3 (runtime tokens module addition under existing `@mkbabb/glass-ui/tokens` subpath) | `src/composables/...` or runtime `tokens.ts` (existing) | 25+ hex literals across speedtest charts + 5 `spectrumColor` copies in fourier-analysis + 8 echarts hex; bbnf adds runtime-highlighter co-need (see new gap row). | None — runtime-tokens contract per G.md invariant 13 + user-direction #12 (no new public subpath). | **accepted** |
| 12 | `<Swatch>` solid/cartoon/watercolor (with `<SvgFilters>` companion) → folded into sub-tranche β | vocabulary | Wβ2 + Wβ3 | `src/components/custom/swatch/`, `src/components/custom/svg-filters/`, `src/components/custom/blob/` | 5+ palette + basis preview (F WatercolorDot + 4 swatch variants + C basis-preview cells); blob sub-tranche absorbs the broad lift per user-direction #10 + Q24. | None — `<HeroBlob>` stays consumer wrapper per Q24; `<Blob>` is the single primitive; Mulberry32 promotes alongside. | **accepted** (folded into β) |
| 13 | `<ColorPill>` / `Badge variant="color"` + categorical color encoding (+ icon slot from bbnf section-badge) | vocabulary | W3 | `src/components/ui/badge/index.ts` | 11+ across C (basis-pill 6 sites + notation-active 3) + F (palette pills) + bbnf `tagToneStyle`/`tokenToneMap`/`sectionTheme` 5+; pass-2 user direction Q17 absorbs `<Badge variant="section">` into this row via `:icon` slot. | None — categorical color encoding is missing; absorbs 11+ sites. | **accepted** |
| 14 | `<NotificationDot>` / `DockIconButton :badge` | vocabulary | W3 | `src/components/custom/dock/DockIconButton.vue` (extend), `src/components/custom/notification-dot/` | 4 (C `view-dot` + GalleryAdminBanner Shield + AppHeader admin badge + CanvasControlsDock `view-dot`); bbnf narrows but does not contradict. | None — clears ≥2; bbnf narrowing notes the gap stays. | **accepted** |
| 15 | `Tabs variant="underline" \| "pill"` (CVA branch) | vocabulary | W3 | `src/components/ui/tabs/index.ts` | 21 sites (E 4 in `utils.css` + 4 cube/playground/CubeScene/AnimationControls; F `.underline-tabs`; bbnf 4 — TabBar + EditorPanel pill switcher). | None — CVA branch absorbs 8+ ad-hoc tab recipes. | **accepted** |
| 16 | `<Input variant="cartoon">` / `<SelectTrigger variant="cartoon">` / `<NumberField variant="cartoon">` | vocabulary | W3 | `src/components/ui/input/Input.vue`, `src/components/ui/select/SelectTrigger.vue`, `src/components/ui/number-field/` | 10 sites (C 5 ContourSettings/SearchBar/FunctionInput/MorphPhaseConfig/HarmonicLevelGrid; gallery 2; consumers prospective). | Borderline overfit — fourier-analysis is the dominant evidence. ≥3 distinct files in C clear bar; expected adoption in math-paper + value.js form trees. | **accepted** |
| 17 | `pane-swap-scale` transition + `.collapse-x` utility + `useCollapse({ axis })` composable | vocabulary | W2 (transition + utility) + W3 (composable) | `src/styles/transitions.css`, `src/styles/utilities.css`, `src/composables/motion/` | 3 (E `.scene-enter-active` cube↔easing↔playground + HeaderRibbon collapse-x); bbnf-lane fold-in narrowed: `<SplitPane>` peeled to risk register per Q15. | Pass-2 Q15 split: `<SplitPane>` becomes its own row → risk register (single live consumer). `useCollapse` stays in scope. | **accepted (narrowed)** |
| 18 | `<KeyframeTimeline>` family (`<TimelineMarker>`, `<TimelineRuler>`, `<TimelinePlayhead>`) + `<BezierCurveCanvas>` | vocabulary | W3 | `src/components/custom/timeline/`, `src/components/custom/bezier-curve-canvas/` | 12 (E timeline 3 + caret + zoom-pan + EasingCurveCanvas + step canvas; prospective math-paper). | E is the canonical reference; one live consumer + math-paper prospective demo clears bar via "primitive other proposals depend on" exception in G.md invariant 3. | **accepted** |
| 19 | `useRafLoop` composable | vocabulary | W3 | `src/composables/motion/` | 7 (E `useRafLoop.ts` + 2 internal sites + value.js metaball reuse + speedtest live-progress prospective + dashboard heartbeat prospective). | None — generic guard-driven rAF primitive; cross-cuts motion/aurora/blob already in src. | **accepted** |
| 20 | `<KeyboardShortcutsModal>` reference component | vocabulary | W3 | `src/components/custom/keyboard-shortcuts-modal/` | 3 (E reference impl + speedtest equivalent + bbnf walkthrough adjacency). | None — pure orchestration shell; bbnf evidences a *peer* primitive (walkthrough), not collision. | **accepted** |
| 21 | `<StatusDot variant="progress">` (conic-gradient + glow) | vocabulary | W3 | `src/components/custom/status-dot/StatusDot.vue` (extend) | 12 (E `--dot-p` site + AnimationMenuBar style block + speedtest `<Pulse>` prospective stage indicators). | None — extends existing `<StatusDot>` API; bbnf `StatusPill` (without dot) is sibling and tracked under gap 24. | **accepted** |
| 22 | `<Toast variant="inverse">` | vocabulary | W3 | `src/components/ui/toast/` | 1 site live (E AnimationControlsGroup) + ≥2 prospective ("Copied"/"Saved" patterns); bbnf `WalkthroughOverlay` annotation card narrows toward a `<TourStep>` sibling, not a toast variant. | Borderline — single live site. Pass-2 Q19 keeps bbnf walkthrough in risk register; toast variant stays in main scope per synthesis. Watch for promotion-by-prospective. | **accepted (low confidence)** |
| 23 | `<FlourishDivider>` + `.divider-flourish-{rainbow,gold}` + `.flourish-stripe-{rainbow,pastel}` | vocabulary | W2 (utilities) + W3 (component) | `src/styles/utilities.css`, `src/components/custom/flourish-divider/` | A self 3 demo + prospective hero/dashboard; bbnf narrowed (uses `.tapered-rule` only — no flourish). | Single-lane evidence; A self + prospective hero. ≥2 prospective bar borderline. | **accepted (narrowed)** |
| 24 | `Badge tone="success \| warning \| destructive \| info"` (+ default lucide icons per tone, absorbing `<StatusPill>`) | vocabulary | W3 | `src/components/ui/badge/index.ts` | 6+ direct (B 3 admin status + D 3 status-badge); bbnf adds 4+ pastel-tone sites + StatusPill 4 sites (Q18: `<StatusPill tone>` absorbs into Badge tone with default icons). | None — semantic tones already in tokens (`--success`/`--warning`/`--destructive`/`--info`); CVA branch only. | **accepted** |
| 25 | `Progress :smoothed-value` prop wrapping `useAnimatedNumber` | convergence | W3 | `src/components/ui/progress/Progress.vue` | 7 (B 3 phase progress + per-pill smoothing + 5 metric cards); composable already exists, gap is the *binding*. | None — saves boilerplate at 7 sites; alternative is to just document the pattern. | **accepted** |
| 26 | `MetricBadge size="xl"` (display-tier) | vocabulary | W3 | `src/components/custom/metric-badge/MetricBadge.vue` | 9+ B (5 MetricGaugeCards + 4 StatsCards) + 1 bbnf `dock-badge`; pattern is `text-display tabular-nums` + color-keyed unit. | None — extends existing variant; speedtest is the canonical reference. | **accepted** |
| 27 | `ToggleGroupItem variant="card"` (tier-aware toggle) | vocabulary | W3 | `src/components/ui/toggle-group/index.ts` | 1 + prospective (B FlowSelector — radio-card pattern); the `data-[state=on]:bg-[var(--glass-bg-medium)]` recipe is ≥2 by prospective survey-pickers. | Single live site, prospective only. Below ≥2 bar; survives only via "tier-aware toggle" composition argument. | **accepted (low confidence — risk row)** |
| 28 | `.text-mono-body` + `.text-mono-prose` (round out family) | vocabulary | W2 | `src/styles/typography.css` | 12+ (B 7 IP/identifier sites + E 5 `font-mono text-base` + bbnf admin labels). | None — completes existing family `.text-mono-{micro,small,caption}`. | **accepted** |
| 29 | `.well-dashed` utility | vocabulary | W2 (silent-failure resolution) | `src/styles/utilities.css` | 2 (F MixSourceSelector + CurrentPaletteEditor — both reference `dashed-well`, undefined → silent failure). | Exactly meets ≥2 bar; **lands as silent-failure ship**. | **accepted** |
| 30 | `.section-subtitle` companion to `.section-label` | vocabulary | W2 | `src/styles/typography.css` | 9 in F value.js (BrowsePane, PaletteDialog ribbon, MixSourceSelector + cross-pane). | None — direct companion class; meets bar via 9 sites in one consumer. | **accepted** |
| 31 | `.touch-gate-target` + `.touch-gate-active` (pair with existing `useTouchGate`) | vocabulary | W2 | `src/styles/utilities.css` | 15 (F SpectrumCanvas + ComponentSliders + glass-ui's own slider prospective). | None — pairs CSS with already-canonical composable. | **accepted** |
| 32 | `.confetti-piece` utility | vocabulary | W2 | `src/styles/utilities.css` | 5 (D ReviewSessionComplete + transitions.css definition + `confetti-fall` keyframe references). | Single live consumer; prospective generic ("session complete" / "achievement"). Meets bar via D existence + `--rainbow-*` token alignment argument. | **accepted (narrowed)** |
| 33 | `.text-prose-lettrine` (drop cap) | vocabulary | W2 | `src/styles/typography.css` | 0 live; 14 prospective files in D (Etymology, DefinitionItem, ProviderDataView, +). | Below ≥2 live sites bar; survives only via "primitive that exposes Fraunces ss01 axis" argument. Risk row. | **accepted (low confidence — risk row)** |
| 34 | `brand-uniform-display` typography preset (companion to `brand-uniform-sans`) | — | — | — | 1 site live (D theme.css) + latex-paper sibling repo. | Out of scope per G.md invariant + user-direction overlay #8: `brand-uniform-sans` retired; symmetric `-display` does *not* ship. Consumer preset territory. | **rejected** (per user direction #8) |
| 35 | `.text-display-stat` (display + tabular-nums + leading-none) | vocabulary | W2 | `src/styles/typography.css` | 13 (D 9 WordlistDashboard + WordlistStatsBar + bbnf 4 BenchChart + LiveBench). | None — tabular numerics + display tier is a clean utility. | **accepted** |
| 36 | `<DataList>` / key-value tooltip body (+ telemetry hovercard via Q16 absorption) | vocabulary | W3 | `src/components/ui/data-list/` | 6 (C coeff-tooltip 2 + GalleryAdminBanner stat panels + InfoCard + PaperSidebar tooltip + bbnf telemetry hovercard at RightPane). | Pass-2 Q16: `<TelemetryHoverCard>` absorbed via existing gap 36 = `<HoverCard>` + `<DataList>`. No separate primitive. | **accepted** |
| 37 | `<TierBadge>` (Crown/Bookmark) + `<LikeButton>` | vocabulary | W3 | `src/components/custom/tier-badge/`, `src/components/custom/like-button/` | 6 (C 4 TierBadge sites + 2 LikeButton); bbnf section-badge is sibling but absorbed under gap 13. | None — clears ≥2 in C alone. | **accepted** |
| 38 | `Button variant="transport" \| "rainbow"` + rainbow play-pause optical-offset contract | vocabulary | W3 | `src/components/ui/button/index.ts` | 7+ (E PlaybackRibbon Play/Pause + Reverse + AnimationMenuBar rainbow play (collapsed + expanded) + C AnimationControls play-btn + bbnf btn-cta hero buttons 2). | None — unifies `.btn-playback`/`.btn-cta`/rainbow play patterns. | **accepted** |
| 39 | `GlassDock position="fixed"` auto-applies safe-area-inset-bottom | hygiene (contract gap) | W3 | `src/components/custom/dock/GlassDock.vue` | 2 prospective (E AnimationMenuBar + speedtest mobile dock). | Single live site (E); prospective ≥2 across iOS-PWA consumers. Borderline. | **accepted (narrowed)** |
| 40 | `<Slider variant="glass-track">` (pointer-capture + `:keep-dock-open` round-trip) | vocabulary | W3 | `src/components/ui/slider/index.ts` | 3 distinct C implementations (SliderControl, GlassTimeline, ConvergenceTimeline) + 2 EditorControlsDock/EditorToolsPanel inputs. | None — three independent implementations of the same pattern in one consumer. | **accepted** |
| 41 | `DockLayerGroup :keepOpenWhile` + exported `defineDockActionBar()` factory | hygiene (contract gap) + vocabulary | W3 | `src/components/custom/dock/DockLayerGroup.vue` (prop), `src/components/custom/dock/index.ts` (factory) | 6 (F 3 watcher hooks per consumer + bbnf 3 — ErrorDialog/ExampleSelector/FormatterSettings). | None — eliminates 3 watcher hooks per consumer; F-lane evidence + bbnf-lane second-site corroboration. | **accepted** |
| 42 | Slot-class props on reka wrappers (`HoverCardContent` content-class, `Dialog` `closeIconClass`) | hygiene (contract gap) | W3 | `src/components/ui/hover-card/HoverCardContent.vue`, `src/components/ui/dialog/Dialog.vue` | 3 (F `:has(> .lucide-x)` + C HoverCardRoot direct reka import + bbnf RightPane direct reka import). | None — direct evidence of consumers bypassing wrappers. | **accepted** |
| 43 | `useContrastSafeAccent` composable shape (no color-math dep) | vocabulary | W3 | `src/composables/...` | 4 F sites (App.vue + ComponentSliders + PaletteCard + SAFE_ACCENT_KEY injection). | Library-shaped clone with WCAG L*-clamping; richer color stack stays in value.js. | **accepted** |

---

## Bbnf-lang/playground fold-in (lane G report)

The bbnf-lane research surfaced 47 drift rows + 9 new gap proposals + 2 new silent failures. The Q16-Q29 user-disambiguation pass already coalesced most into existing gaps; this section enumerates each new bbnf row and where it slots.

| bbnf row | Resolution | Slot |
|---|---|---|
| `useMonacoTheme()` composable | Pass-2 Q22: in scope. ~15-line composable watching `useGlobalDark` + `monaco.editor.setTheme()`. | **NEW gap row 44** below |
| `<MonacoSurface>` wrapper | Single live consumer; absorbed into `useMonacoTheme()` (Q22 declined the wrapper). | merged into 44 |
| `<SplitPane>` + `useSplitPane({ axis, persistKey })` + `<SplitPaneDivider>` | Pass-2 Q15: split out from gap 17 → risk register (single live consumer). | **risk register** |
| `runtimeHighlight()` + `LANGUAGE_RULES` 8-language rule-table | Pass-2 Q19: risk register (single live consumer). | **risk register** |
| `<ProductionRule>` / `.production-rule` | Pass-2 Q20: in scope under math.css. Math axis primitive even at single live site (G.md invariant 3 exception). | folded into gap 10 |
| `<HorizontalBarChart>` / `<MetricList>` | Pass-2 Q19: risk register (1 here + 1 prospective B chassis). | **risk register** |
| `<PipelineFlow>` (vertical pipeline of node pills) | Pass-2 Q21: in scope. W3 main track, lane D'. | **NEW gap row 45** below |
| `<LiveSnippet>` / `<RunnableCode>` | Pass-2 Q21: in scope. W3 main track, lane D'. | **NEW gap row 46** below |
| `<WalkthroughTour>` / `<TourStep>` | Pass-2 Q19: risk register (single live consumer; E adjacency is `<KeyboardShortcutsModal>`, not walkthrough). | **risk register** |
| `<StatusPill tone>` (without dot) | Pass-2 Q18: absorbed into gap 24 (`Badge tone=…` extended to render default lucide icons per tone). No separate primitive. | merged into gap 24 |
| `<TelemetryHoverCard>` | Pass-2 Q16: absorbed into existing gap 36 as `<HoverCard>` + `<DataList>`. | merged into gap 36 |
| `<Badge variant="section">` w/ icon slot | Pass-2 Q17: absorbed into gap 13 by adding `:icon` slot to `Badge variant="color"`. | merged into gap 13 |
| `--shadow-cartoon-lg` rung (5px+7px asymmetric hover step) | Pass-2 Q25: added to W1 token list. | merged into gap 2 |
| `.code-badge` silent failure (6 sites in bbnf — 2 × 3 cards each in FeatureCards + DemoCards) | Pass-2 Q26: ship in W2 (re-add canonical `.code-badge` `@utility`). | **silent failure → ship in W2** (also tracked in W0-silent-failures.md by lane β) |
| `.blue-shimmer` silent failure (5 sites via `shimmerClass()` in toneMaps.ts) | Pass-2 Q26: ship in W2 (sibling to `.gold-shimmer`, ideally as part of synthesis gap-9 family). | **silent failure → ship in W2** (also tracked by lane β) |
| `--ease-spring` undefined-token reference (CodeCardFan.vue:68) | Hygiene: bbnf invented; canon offers `--spring-bouncy` / `--ease-apple-spring`. Consumer fix in W5 ledger. | **W5 ledger** (no canon change) |

### Newly added gap rows (post bbnf fold-in)

| # | Name | Bucket | Wave | Lead file(s) | Call-site count (verified) | Risk-of-overfitting note | Accepted/Rejected |
|--:|---|---|---|---|---|---|---|
| 44 | `useMonacoTheme()` composable (token→Monaco bridge) | vocabulary | W3 | `src/composables/monaco/useMonacoTheme.ts` (NEW directory) | 1 live (bbnf MonacoEditor) + ≥2 prospective (D latex-paper editor, E keyframes Monaco demo) | Single live site; prospective ≥2 across IDE-shaped consumers. Per Q22 it is intentionally tiny (~15 lines). | **accepted (narrowed)** |
| 45 | `<PipelineFlow>` / `<NodeChain>` (vertical pipeline of node pills + connectors) | vocabulary | W3 | `src/components/custom/pipeline-flow/` | 1 live (bbnf docs FlowChart 4 sites within) + prospective for any pipeline-documenting consumer | Single live consumer. Per Q21 explicitly in scope. | **accepted (narrowed)** |
| 46 | `<LiveSnippet>` (embedded run-with-output snippet) | vocabulary | W3 | `src/components/custom/live-snippet/` | 1 live (bbnf RunnableCode 4 internal slots) + prospective for any docs-with-execution consumer | Single live consumer. Per Q21 explicitly in scope. | **accepted (narrowed)** |
| 47 | Prism/Shiki bridge — `prism-theme.css` consuming canon CSS variables | hygiene (canon-side surface) | W2 | `src/styles/prism-theme.css` (NEW), opt-in import (not in default cascade) | 1 prospective consumer (any code-block markdown consumer); satisfies bbnf code-card prose without Monaco | Per Q23: opt-in only; light/dark via canon `.dark` cascade; Shiki users compute from CSS vars at runtime. | **accepted** |

---

## Counts

### By bucket
- **vocabulary**: 33 (gaps 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 26, 27, 28, 29, 30, 31, 32, 33, 35, 36, 37, 38, 40, 43, 44, 45, 46) — *recount*: 39
- **convergence**: 2 (gaps 1, 25)
- **hygiene** (contract gap / silent failure / drift): 4 (gaps 39, 41, 42, 47)
- **rejected/superseded**: 2 (gap 8 → out of scope, gap 34 → out of scope per user direction #8)

Total live rows after fold-in: **47**, of which **45 accepted** (some narrowed/risk-flagged), **2 rejected**.

Independent recount of accepted: gaps 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47 = **45 accepted**, **2 rejected** (8, 34).

### By owning wave
- **W1 (tokens / typography axes)**: 5 (parts of 2, 5, 6, 7, 10)
- **W2 (surface CSS / utilities / math.css / prism-theme.css)**: 13 (parts of 4, 7, 9, 10, 17, 23, 28, 29, 30, 31, 32, 33, 35, 47)
- **W3 (components / CVA branches / composables)**: 28 (parts of 3, 4, 5, 6, 7, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46)
- **Wβ (sub-tranche β — Blob)**: 1 (gap 12, fold of `<Swatch>`/`<SvgFilters>`/blob primitives)
- **W5 (consumer migration ledgers)**: 1 (gap 1 — section-label drift; plus the consumer-side `--ease-spring` and `active-scale`/`disabled-base` migration entries owned by lane β / W0-silent-failures.md)

(Many gaps span multiple waves — counts reflect lead wave per row.)

### By bucket × wave (for orchestrator wave-loading view)
- W1: 5 vocabulary
- W2: 11 vocabulary + 2 hygiene
- W3: 25 vocabulary + 2 convergence + 2 hygiene
- Wβ: 1 vocabulary
- W5: 1 convergence

---

## Flips vs synthesis preamble

The synthesis preamble's pre-fold count was "≤25 canonical replacements" + "~43 deduped gaps" + "~23 risk-register entries" + "3 silent failures". After bbnf fold + verification:

- **Accepted ↔ rejected flips**:
  - Gap **34** (`brand-uniform-display`): synthesis had it as accepted gap row in pass-1; user-direction overlay #8 retired it — **rejected** here.
  - Gap **8** (skeuo bevel pair): synthesis listed as gap row 8; user-direction #3 declared it out of scope — **rejected** here. Replacement is gap 2 (cartoon-shadow accent).
- **Narrowed scope** (still accepted, risk-flagged):
  - Gap **17**: split — `<Collapse>` row stays (`useCollapse({ axis })`); `<SplitPane>` becomes risk register per Q15.
  - Gap **22** (`<Toast variant="inverse">`): single live site; accepted with low confidence.
  - Gap **23** (`<FlourishDivider>`): single-lane evidence (A self).
  - Gap **27** (`ToggleGroupItem variant="card"`): single live site + prospective only.
  - Gap **32** (`.confetti-piece`): single live site (D).
  - Gap **33** (`.text-prose-lettrine`): zero live sites; 14 prospective.
  - Gap **39** (`GlassDock` safe-area): single live site + prospective.
  - Gap **44** (`useMonacoTheme()`): single live consumer; ≥2 prospective.
  - Gap **45** (`<PipelineFlow>`): single live consumer.
  - Gap **46** (`<LiveSnippet>`): single live consumer.
- **Silent failures growth**: synthesis preamble said 3 (gold-shimmer text, dashed-well, stagger-children); bbnf fold-in adds 2 (`.code-badge`, `.blue-shimmer`). Total **5** for lane β to inventory in `W0-silent-failures.md`.

---

## Risks (for orchestrator's challenge log)

Gaps whose verified live call-site count is **under** the ≥2 bar but whose owning wave still lists them. These need explicit redress in `W0-challenge.md`:

1. **Gap 22** (`<Toast variant="inverse">`) — 1 live site (E AnimationControlsGroup); rest are prospective. **Decision needed**: ship as a CVA branch on Toast (cheap, 5-line variant) or move to risk register with a "promote when speedtest/words ship a saved-toast" trigger.
2. **Gap 27** (`ToggleGroupItem variant="card"`) — 1 live site (B FlowSelector); rest prospective. **Decision needed**: ship the CVA branch (low cost) or hold for a second consumer.
3. **Gap 32** (`.confetti-piece`) — single live consumer (D ReviewSessionComplete) + 7 raw rainbow hex literals at the same site. **Decision**: bundle with `--rainbow-*` token alignment + ship; alternative is to retire the consumer pattern via W5 ledger.
4. **Gap 33** (`.text-prose-lettrine`) — 0 live sites; 14 prospective Etymology/Definition surfaces. **Decision**: ship as a one-line `@utility` to expose Fraunces ss01 axes (low cost, doc value), or retire to consumer preset.
5. **Gap 39** (`GlassDock position="fixed"` safe-area-inset) — 1 live site (E AnimationMenuBar); 1 prospective (speedtest mobile dock). Counts marginal but the iOS-PWA contract is real.
6. **Gap 44** (`useMonacoTheme()`) — 1 live consumer (bbnf). The ~15-line composable is cheap; the gating question is whether glass-ui wants Monaco knowledge in `composables/monaco/`.
7. **Gap 45** (`<PipelineFlow>`) — 1 live consumer (bbnf). Per Q21 in scope; the orchestrator should confirm no over-shaping for a single use case.
8. **Gap 46** (`<LiveSnippet>`) — 1 live consumer (bbnf). Same as 45.

Additional **non-overfit risks** for the challenge log:

- **Gap 16** (`<Input variant="cartoon">` family): all evidence concentrated in fourier-analysis/web. Counts ≥10 in one consumer but no second consumer until math-paper or value.js form trees materialize. Watch.
- **Gap 18** (`<KeyframeTimeline>` family): one live consumer (E). Promoted via "primitive other proposals depend on" exception (`<BezierCurveCanvas>` powers math-paper bezier visualization). Audit the dependency claim at W3 close.
- **Gap 36** (`<DataList>`): 6 sites, but the `key/value tooltip body` is a pattern with thin reuse outside C. Pass-2 Q16 absorbed `<TelemetryHoverCard>` into this row — verify the absorption holds.

### Known misses

- The original synthesis preamble said "23 risk-register entries"; this lane has not re-counted the consolidated risk register. Lane β + γ may surface additional rows. **Pass-through to challenge log**.
- Gap 11 ships *runtime tokens* under the existing `@mkbabb/glass-ui/tokens` subpath (per G.md invariant 13). Re-verify in W3 that no agent silently introduces a `@mkbabb/glass-ui/runtime` or similar new subpath.
- Gap 9 cleanup depends on the `.code-badge`/`.blue-shimmer` resolution in W2 — those silent failures are owned by lane β's `W0-silent-failures.md`; ensure the gap-9 ship and the silent-failure ship are coordinated to avoid double-implementation.
- `<HeroBlob>` is explicitly *not* a glass-ui primitive (Q24 — stays consumer-side as a wrapper around `<Blob>`). Confirm Wβ does not silently smuggle it back in.

---

## Closing note

This audit is read-only and writes only to `docs/tranches/G/audit/W0-gap-classification.md`. No `src/`, `demo/`, consumer-tree, or other docs/tranches files were modified. All counts cited above are reproducible via the `rg` invocations recorded in the working trace; the lead-file column points the W1-W5 amenders at exact targets without prescribing implementation shape.
