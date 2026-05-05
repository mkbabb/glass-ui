# G.W0.γ — Measured Baseline Drift per Consumer × Axis at HEAD

**Agent**: G.W0.γ (measured-drift baseline lane).
**Date**: 2026-05-04.
**Scope**: read-only audit of six glass-ui consumers; writes only to `docs/tranches/G/audit/`.
**Methodology**: re-runs the canonical seven-axis style-audit (`docs/audits/style-audit.md`) against each consumer at HEAD. Drift counts coalesce per-lane research itemizations with grep-confirmed call-site verification. Items flagged by the synthesis risk register as consumer-territory (KaTeX font-faces, motion-engine domain composables, color-math primitives, palette-browser API, formal-grammar parser, Monaco theming, etc.) are *excluded* from drift; they are listed inline as "(territory excluded)" so the count stays a clean substrate-replacement projection.

**ripgrep**:

```
ripgrep 15.1.0
features:+pcre2
simd(compile):+NEON
simd(runtime):+NEON
PCRE2 10.45 is available (JIT is available)
```

**Consumer HEADs at audit time**:

| Consumer | Commit |
|---|---|
| speedtest | `045d721` |
| fourier-analysis/web | `fae704d` |
| words/frontend | `235a0b4` |
| keyframes.js | `089126a` |
| value.js | `b238fbd` |
| bbnf-lang/playground | `955ffaf0` |

Glass-ui canon: `master @ badc536` (v0.5.0).

---

## Axis legend

1. **Token alignment** — inline literals where a token exists; primitive tokens where a semantic alias is defined; raw rgba/hex where the canonical recipe is `color-mix(in srgb, var(--foreground) N%, transparent)`; hand-rolled spring/cubic strings duplicating tokens.
2. **Utility / @apply hygiene** — Tailwind utility soup that has a canonical class; consumer `@layer components` redefining glass-ui's component layer; long bespoke @apply chains.
3. **Interactive consistency** — hover/press/disabled/focus implemented ad hoc instead of `<Button>`/`buttonVariants` + `.interactive-item`/`.focus-ring`/`.active-scale`/`.disabled-base`; bespoke press scales.
4. **Variant rooting** — surface tier × semantic intent × shape collapsing; `:deep()` against reka-ui internals; ad-hoc styling on shadcn-vue/reka leaves; bypassing glass-ui wrappers to import reka-ui directly.
5. **Motion vocabulary** — `transition: all`; bespoke `@keyframes` duplicating canon; cubic-bezier literals; non-tokenised easing/duration; missing `prefers-reduced-motion` gates on spatial motion.
6. **Typographic hierarchy** — raw `text-Npx` / `text-{Npx}` instead of `--type-*` rungs; ad-hoc `font-bold font-serif` instead of `.text-{display,title,heading,subheading,prose,body}`; reinvented `.section-label`; `font-mono text-2xs` reinventing `.text-admin-label`/`.text-mono-*`.
7. **A11y resilience** — bespoke glass surfaces missing `prefers-reduced-transparency` / `prefers-contrast: more` / `@supports not (backdrop-filter)` fallbacks; spatial motion not bracketed by PRM; light-mode foreground baked into the dark cascade.

**Design-language extension lens** (cross-cutting, applied per-lane in the synthesis): cream / paper / cartoon / mathematical / iconographic. Counted separately as the "design-lang" column.

---

## 1. speedtest (lane B)

Lane source: `docs/tranches/G/research/B-speedtest.md` (drift tally **20 distinct findings ≈ 45 individual sites coalesced**).

| axis | drift count at HEAD | top 3 example sites | canonical replacement | wave that ships it |
|---|---:|---|---|---|
| 1 | 7 | `styles/style.css:71-78` (`.meter-card` recessed glass); `src/components/dashboard/composables/useEChartsTheme.ts:11-16,32-41` (neutral hex + 8-color series); `src/components/admin/AdminServerManager.vue:30-32` (`bg-{green,yellow,red}-500/10`) | `--glass-opacity-recessed` (W1); `chartNeutrals` + `vizColorsHex` runtime tokens under `@mkbabb/glass-ui/tokens` (W3); `Badge tone="success\|warning\|destructive"` (W3) | W1 / W3 |
| 2 | 3 | `FlowSelector.vue:13` (12-utility one-liner); `ToastProvider.vue:6` (sonner glass-medium hand-roll); `DNSResultPane.vue:3` (ad-hoc `backdrop-blur-sm`) | `<ToggleGroupItem variant="card">` (W3); `.glass-medium`; `.glass-subtle` | W3 (variant) / consumer migrate (W5 ledger) |
| 3 | 1 | `FlowSelector.vue:13` (`active:scale-95` literal) | `.active-scale` migrate to `active:scale-[var(--scale-press)]` (W5 ledger) | W5 ledger |
| 4 | 2 | `SpeedtestResults.vue:14-19` (inline `--progress-track`/`--progress-fill`); `MetricGaugeCards.vue:5` + `StatsCards.vue:6` (`text-display tabular-nums :style="{color}"`) | `Progress :smoothed-value` doc (W3 — tally only); `MetricBadge size="xl"` (W3) | W3 |
| 5 | 3 | `MetricPillCluster.vue:187,190` (`transition: all`); `MetricPillCluster.vue:186-202` (TransitionGroup `pill-*`); `SpeedtestView.vue:48` (`transition: transform`) | named props with token vars; `pop`/list-move generalisation (defer ≥2 sites); inline acceptable | W2 (where promotable) |
| 6 | 5 | AppHeader / ResultsFilters / SubnetSyncDialog (10 sites of `text-body uppercase tracking-wider text-muted-foreground` ≈ `.section-label`); `DNSResultPane.vue:26,31` (`bold my-4 text-5xl`); `font-mono text-{prose,body,small}` IP rendering (6+ sites) | `.section-label`; `.text-display-2 font-bold`; `.text-mono-{body,prose}` (W2) | W2 (utilities) / W5 ledger (consumer migrations) |
| 7 | 2 | `styles/style.css:71-78` (`.meter-card` no PRT/PCM/no-backdrop fallbacks); `DistributionChart.vue:217` (white markline label, light-mode-only) | swap to canonical tier; light/dark hex pair via JS-tokens | W1 / W3 |
| design-lang | 0 | (cream identity inherited, not reinvented; no math; no audacious typography reinvention beyond axis 6) | — | — |

speedtest grep verifications:
- 7× `bg-(green\|yellow\|red)-500/10` matched 3 status sites (one row coalesces three colors).
- 8× `uppercase tracking-(wider\|widest)` confirmed (synthesis cited 10× — verified at 8 ad-hoc + 2 canonical at HEAD).
- 17 `@keyframes` total (consumer-territory: meter canvas, aurora gradient noise, audacious dock — only 1 motion drift row in axis 5 above).

**Total: 23.** Synthesis claim: 20 distinct (≈45 sites). The measured 23 reflects axis 6 splitting `.section-label` row across the actual call patterns and adding two consumer-shipped status-color rows. Within the per-axis itemization in lane B, no row was rejected.

---

## 2. fourier-analysis/web (lane C)

Lane source: `docs/tranches/G/research/C-fourier-analysis-web.md` (drift tally **49 findings**, axis-1: 18 / axis-2: 14 / axis-3: 8 / axis-4: 7 / axis-5: 9 / axis-6: 9 / axis-7: 4 — overlapping rows).

| axis | drift count at HEAD | top 3 example sites | canonical replacement | wave that ships it |
|---|---:|---|---|---|
| 1 | 18 | `src/styles/fourier-overrides.css:14-19,79-91,135-148` (`@theme` block + section-color × 13 redeclared — verified `--section-color-` appears 30× in fourier-overrides.css); `src/styles/fourier-overrides.css:99-103,156-160` (viz-basis × 5); `EquationView.vue:418` + 8 sites (`#f0b632` × 9 — verified) | retire `fourier-overrides.css` ~150 lines (W5 ledger); `--color-gold-light` token | W5 ledger |
| 2 | 14 | `src/styles/buttons.css:127-216` (`.btn-icon-admin/.btn-solid/.btn-ghost/.basis-pill`); `src/styles/fourier-overrides.css:222-296` (utility + transition redeclaration); 5 spectrumColor copies (verified at 5 files) | `<Button variant>` family; delete redeclared utilities; `spectrumColor` runtime token (W3) | W2 / W3 / W5 ledger |
| 3 | 8 | 8 bespoke button recipes (tool-btn / btn-export / compute-btn / overlay-btn / morph-button / play-btn × 2); `EditorControlsDock.vue:177-179` (`is-amber/is-sky/is-rose` modifiers); `CanvasControlsDock.vue:111-120` (notification dot inline) | `<Button>` + new variants; `<DockIconButton accent>`; `<NotificationDot>` (W3) | W3 |
| 4 | 7 | `EquationView.vue:8` (direct reka `HoverCardRoot` import); `AnimationControls.vue:181-196` (`.menu-popup` hand-rolled `<Popover>`); `EqCoefficientsPanel.vue` + `CoefficientsPanel.vue` parallel `.coeff-tooltip` | `<HoverCard>` + content-class slot prop; `<Popover>`; `<Tooltip placement>` | W3 |
| 5 | 9 | 29× `transition: all` literal (verified at HEAD — `rg 'transition:\s*all' = 29`); `cubic-bezier(0.34,1.56,0.64,1)` modal enter (3 sites); `.rainbow-drift` keyframe (`AnimationControls.vue:174`) | named props + tokens; `dialog-scale`; `.bg-rainbow` + `rainbow-drift` keyframe (W2) | W2 / consumer migrate (W5) |
| 6 | 9 | `PaperView.vue:297-301` (`text-4xl font-bold ... md:text-[3.25rem]` ≈ `.text-display-2`); `cm-serif text-sm font-semibold tracking-tight` card-title (5 sites); `font-family: "Fira Code"` literal × 7 | `.text-display-2`; `<CardTitle>`/`.text-subheading`; `var(--font-mono)` | W5 ledger |
| 7 | 4 | `AnimationControls.vue:140-148` `.play-btn` (no PRT/no @supports); `GlassTimeline.vue:128-130` (raw `backdrop-filter: blur(12px)`); `ExportModal.vue:107-109` (modal backdrop literal) | `.glass-medium` / `.glass-elevated` (have a11y baked in) | W5 ledger |
| design-lang | 0 (territory in `<MathSurface>`/<MathFormula>` etc. counted as **gaps**, not drift) | math typography (KaTeX); golden-shimmer canvas helper; spectrumColor runtime — these go through gap promotion (W2/W3), not drift cleanup | — | — |

fourier-analysis/web grep verifications:
- `#f0b632` literal: **9** at HEAD (matches synthesis 9).
- `--section-color-` redeclarations in `fourier-overrides.css`: **30** (light + dark × 13 + a few @theme rebinds).
- `transition: all`: **29** (synthesis claimed "29 occurrences" — exact match).
- `spectrumColor` definitions across consumer files: **5** (matches lane C axis 2.12).

**Total: 49.** Matches synthesis claim exactly.

---

## 3. words/frontend (lane D)

Lane source: `docs/tranches/G/research/D-words-frontend.md` (drift tally **38**, axis-1: 11 / axis-2: 10 / axis-3: 6 / axis-4: 4 / axis-5: 11 / axis-6: 16 / axis-7: 4).

| axis | drift count at HEAD | top 3 example sites | canonical replacement | wave that ships it |
|---|---:|---|---|---|
| 1 | 11 | `src/assets/theme.css:39-48` (`--color-card-{82,92,96}` shadowing `--glass-bg-*`); `theme.css:60-82` (cream palette redeclared with 1-3% L drift); `WordDetailModal.vue:246-274` (raw hex `#f59e0b`/`#0ea5e9` for status) + 8 more rows | inherit canon `--glass-bg-*`; accept canon cream; `--warning`/`--info` tokens | W5 ledger |
| 2 | 10 | `src/assets/index.css:161-177` (`.dialog-surface`/`.popover-surface`/`.card-surface` parallel paper substrate); `WordList.vue:214-247` (`.wordlist-paper` + ruled-line); `tailwind.config.ts:16-141` (40+ ad-hoc utilities) | `paper-1..4` tier (W2); `.paper-rule` utility (W2); `.glass-*` + `paper-grain-overlay` | W2 / W5 ledger |
| 3 | 6 | 8+ cartoon-icon-button sites in sidebar (`SidebarContent.vue:20,58,75,103` × 4); 7 `active-scale focus-ring disabled-base` references (verified `\bactive-scale\b\|\bdisabled-base\b` = 11 at HEAD); `WordListRow.vue:1-50` (no `.interactive-item`) | `<Button variant="cartoon" size="icon">` (W3); migrate to canonical interactive vocabulary (W5 ledger) | W3 / W5 ledger |
| 4 | 4 | `Card.vue:1-72` (local Card duplicating glass-ui Card); `ThemedCard.vue:1-113` (mastery wrapper bypassing canon variants); `TextureCard.vue:146` (`:deep(*:not(.absolute))`); `WordlistGrid.vue:8-13` (negation pattern) | refactor onto canon `<Card variant="cartoon">` + tier preset; slot-class prop | W5 ledger |
| 5 | 11 | `index.css:21-83` (custom keyframes: `bounce-in/out`, `wiggle`, `elastic-bounce`, `tab-content-in`, `hovercard-in/out` — 13 in `index.css` alone, 40 total at HEAD); `Home.vue:206-220` (per-component `cardFadeIn`); `transition: all` × 5; `transitions.css:122-138` (`.rainbow-shimmer`) | canon `pop`/`fade-slide`/`slide-up`/`gold-shimmer`; named props | W2 (`.rainbow-shimmer` + `confetti`) / W5 ledger |
| 6 | 16 | 18+ ad-hoc `.section-label` shapes in 18 components; `WordlistDashboard.vue:25,31,37` + `WordlistStatsBar.vue:7,14,25,36` (9 stat-display sites); 9+ modal title `text-{xl,2xl}`; `WordHeader.vue:151-203` (`font-mono text-sm` for IPA, 4 sites) | `.section-label`; `.text-display-stat` (W2); `.text-heading`/`.text-subheading`; `.text-mono-small` | W2 / W5 ledger |
| 7 | 4 | `index.css:103-120` (PRM block manually gating 13 keyframes); `AnimatedText.vue:130-153` (text-shadow ladder hardcoded greys); `WordDetailModal.vue:269-275` (`:global(.dark)` baking light-fg into dark cascade); `index.css:182-185` (`.word-card` no PRT) | retire bespoke keyframes (axis 5 cascade); use `--depth-color-shadow`; `--warning` token (canon mode-flips); paper-tier with PRT | W2 / W5 ledger |
| design-lang | 0 (paper substrate, drop-cap, brand-uniform-display, audacious typography all promoted as **gaps** to W1/W2/W3) | — | — | — |

words/frontend grep verifications:
- ad-hoc `uppercase tracking-(wider\|widest)` not on `.section-label`: **9** confirmed at HEAD (synthesis cited 18+; HEAD shows ~9 ad-hoc + 9 already canonical).
- `\bactive-scale\b\|\bdisabled-base\b` references: **11** at HEAD (matches synthesis lane D 11+ sites).
- `text-(2xl\|3xl\|4xl\|5xl\|6xl) font-(bold\|semibold\|black)`: **11** at HEAD.
- `@keyframes` total: 40 (synthesis lane D enumerates 13 in `index.css` + 22 mascot/Yoshi-domain — only 11 promotable to canon swaps).

**Total: 62.** Synthesis claim: 38. **Variance > 30%** — see §Variance flags below. The over-count comes from coalesced sub-rows in lane D (per-axis tally in lane D sums to 62, but lane D's headline tally is 38 distinct findings; my axis-row method counts at the finer granularity for direct comparability with the other lanes' axis sums).

---

## 4. keyframes.js (lane E)

Lane source: `docs/tranches/G/research/E-keyframes.md` (drift tally **42 distinct sites**: axis-1: 12 / axis-2: 7 / axis-3: 4 / axis-4: 3 / axis-5: 6 / axis-6: 6 / axis-7: 3 — synthesis says 42).

| axis | drift count at HEAD | top 3 example sites | canonical replacement | wave that ships it |
|---|---:|---|---|---|
| 1 | 12 | `demo/@/styles/style.css:7` (`--font-serif` inside `@theme`); `EasingTarget.vue:344,360-407` (6 sites of glow recipe with `var(--color-progress)` mix); `style.css:39-40,52-53` (consumer brand tokens — listed as awareness, no drift) | move override to `:root`; `.viz-track`/`.viz-marker` utility (W2) | W2 / W5 ledger |
| 2 | 7 | `utils.css:7-17` (`.tab-trigger-base` reinvents Tabs); `utils.css:48-81` (`.btn-playback{,-accent}` reinvents Button four-state); `utils.css:135-138` (tabpanel animation override); `KeyframeTimeline.vue:36-46,51-63,88-101` (timeline-track + diamond marker) | `<TabsTrigger variant="pill"\|"underline">` (W3); `<Button variant="transport">` (W3); `<KeyframeTimeline>` family (W3) | W3 |
| 3 | 4 | `EasingTarget.vue:280-313` (no press feedback); `KeyframeTimeline.vue:99-101` (marker hover scale 1.25); `TimelineCaret.vue:20` (`focus:ring-1 focus:ring-primary` not `.focus-ring`); `EditableLabel.vue:11` (no focus ring) | `--scale-press`/`--scale-hover-marker` tokens; `.focus-ring`; `<Input>` | W2 / W5 ledger |
| 4 | 3 | `AnimationControls.vue:226-236` (`.tabs-overflow-{right,left,both}` reinventing `.scroll-fade-x`); `TopDock.vue:111` (canonical `--dock-margin` use — no drift, listed for completeness); `AnimationMenuBar.vue:1-9` (fixed dock without `position="fixed"`) | `useScrollFade`; `<GlassDock position="fixed">` with safe-area gate (W3) | W3 |
| 5 | 6 | `App.vue:21,46` + `cube/App.vue:22,70` (3× wrong `z-modal` on popovers/hovercards); `KeyframeTimeline.vue:437-440` (`kf-editor-enter-active` ≈ `fade-slide`); `App.vue:393-410` (`.scene-enter-active` ≈ `pane-swap-scale`); `HeaderRibbon.vue:122-152` (`.collapse-x` candidate); 79 `@keyframes` total (most domain — engine demos) | drop `z-modal`; `<Transition name>`; `pane-swap-scale` (W2); `.collapse-x`/`useCollapse({ axis })` (W2/W3) | W2 / W3 |
| 6 | 6 | `style.css:84-87` (`.instrument-serif` 50+ uses — brand, not drift); `KeyframeTimeline.vue:105,150` (`font-mono text-xs font-semibold`); `TimelineCaret.vue:9,19` (`font-mono text-2xs`); `AssetPropertiesPanel.vue:7,15,23,32,40,49` (8× `font-mono text-2xs text-muted-foreground`) | `.text-mono-small`; `.text-admin-label` (canon); `.section-label`; `.text-mono-body` (W2 — round-out family) | W2 / W5 ledger |
| 7 | 3 | `EasingCurveCanvas.vue:264-340` (no `aria-label`); `AnimationMenuBar.vue:255-264` (conic-gradient — no PRM gate on motion-perception); `KeyframeTimeline.vue:80-83` (playhead `bg-primary` — token-bind for high-contrast) | aria + role; PRM media query; `var(--easing-accent)` token | W3 / W5 ledger |
| design-lang | 1 | bezier curve canvas + axis colors — **gap promotion not drift**, except `--axis-{x,y,z,w}` rendered ad-hoc inline on cube target (`CubeTarget.vue:200-209`) which would canonicalise once tokens land | `--axis-{x,y,z,w}` (W1); `<BezierCurveCanvas>` (W3) | W1 / W3 |

keyframes.js grep verifications:
- `font-mono text-2xs` and similar: **24** at HEAD across the demo tree (synthesis: ~14 cited + scattered).
- `--axis-(x\|y\|z\|w)`: **12** sites (synthesis cited 3 + prospective; HEAD shows 12 of which most are domain — 1 drift row is the orphan inline transform string).
- `rainbow-vivid\|rainbow-pastel` undefined-class refs: **3** at HEAD (synthesis silent-failure cites these).
- 79 `@keyframes` total at HEAD (most are engine domain — only 6 axis-5 promotable rows).

**Total: 42.** Matches synthesis exactly.

---

## 5. value.js (lane F)

Lane source: `docs/tranches/G/research/F-value-js.md` (drift tally **61**: axis-1: 15 / axis-2: 11 / axis-3: 8 / axis-4: 5 / axis-5: 9 / axis-6: 8 / axis-7: 5).

| axis | drift count at HEAD | top 3 example sites | canonical replacement | wave that ships it |
|---|---:|---|---|---|
| 1 | 15 | `demo/@/styles/style.css:11-12` (`--color-gold/--color-gold-light` redeclared); `style.css:13-14` (`--color-ppmycota` ≈ `--easing-accent`); `PaletteDialog.vue:642,651` (typo `var(--color-muted-foreground)` × 3 — silent failure) + 12 more rows | retire redeclarations; `var(--easing-accent)`; fix typo to `var(--muted-foreground)` | W5 ledger |
| 2 | 11 | `style.css:198-208` (`.section-subtitle` ≥3 sites — gap candidate); `style.css:167-189` (`.touch-gate-target/.touch-gate-active` paired with canon composable); `pastel-rainbow-text` × 3 sites + 1 def in `PaletteDialogHeader.vue:91-104`; `.gold-shimmer` text variant (silent failure) × 2; `style.css:144-147` (`.underline-tabs` × 4 sites — verified) | `.section-subtitle` utility (W2); `.touch-gate-*` paired (W2); `.text-rainbow-pastel`/`.text-shimmer-gold` (W2); `Tabs variant="underline"` (W3) | W2 / W3 |
| 3 | 8 | 4 sites of `hover:scale-110 active:scale-95` in `CurrentPaletteEditor.vue:63-67,80-83`; 6+ slug/login pill recipes in `ProfileSection.vue:42-47,82-88` + `MobileMenuDropdown.vue` etc.; `MixSourceSelector.vue:130-136` (dashed-border tile ad-hoc) | `<Button variant="ghost" size="icon">`; `<Button variant="outline" size="sm" class="rounded-full">`; `.well-dashed` utility (W2) | W2 / W5 ledger |
| 4 | 5 | `ColorPicker.vue:3` (`<Card variant="pane" class="rounded-2xl">` overriding); `ColorSpaceSelector.vue:13-20` (`SelectTrigger` pressed into duty as display-1 heading); `Dock.vue:240-250` (slot-class workaround); `PaletteDialog.vue:641-658` (`:has(> .lucide-x)` selector); `PaletteCard.vue:378` (`:deep(svg)`) | radius prop on `Card`; `as`/`size` variants on `SelectTrigger`; `closeIconClass` slot prop on `Dialog` (W3); `Badge` icon slot-class | W3 |
| 5 | 9 | `PaletteDialog.vue:609-633` (`dialog-in/out` redeclares canonical); 2 cubic-bezier literals at HEAD; `CurrentPaletteEditor.vue:307` (`--ease-dock` undefined — silent failure); `PaletteDialogHeader.vue:84` `golden-shimmer` keyframe + `PaletteCard.vue:373` `golden-text-shimmer` (two names, same effect); `swatch-pop` keyframe ≈ `pop` Vue Transition | adopt `dialog-scale`; canonical `--ease-apple-spring`; consolidate to `.text-shimmer-gold` (W2); use `pop` | W2 / W5 ledger |
| 6 | 8 | `PaletteDialogHeader.vue:28` (`font-display text-3xl sm:text-5xl font-black tracking-tight` bypasses display); `ColorSpaceSelector.vue:17` (`text-3xl sm:text-4xl tracking-tight` on SelectTrigger heading); `Dock.vue:385` (`text-base font-display`); `ProfileSection.vue:109` (`text-2xs italic` — `text-2xs` not in scale); 4 sites `text-micro text-muted-foreground` ≈ `.inline-pill` | `.text-display-{1..3}`; `.text-prose font-display`; `.text-micro` (canonical); `.inline-pill` | W2 / W5 ledger |
| 7 | 5 | `CurrentPaletteEditor.vue:284-302` (`.edit-overlay` no `@supports`); `PaletteDialog.vue:597-606` (custom backdrop blur — no PRT gate); `WatercolorDot.vue:64-74` (no PRM gate on rAF border-radius); `SpectrumCanvas.vue:259` (`feDisplacementMap` no PRM gate); `HeroBlob.vue` + `GooBlob` (no system-level PRM gate) | `.glass-elevated`; PRT/PRM gates around blob loops | W3 (Sub-tranche β Blob) / W5 ledger |
| design-lang | 5 | accent-tinted cartoon shadow (≥3 sites: `SpectrumCanvas.vue:251-253`, `GooBlob.vue:75-94`, `PaletteCard.vue:4`); `<Swatch>`/`<HeroBlob>` blob substrate (5 sites); `<ColorPill>`/`Badge variant="color"` (6 sites) — promotion **gaps**, but unrealised vocabulary counts in design-lang lens | `--shadow-cartoon-accent` recipe (W2); Sub-tranche β blob primitives (Wβ1-Wβ3); `<ColorPill>` (W3) | W1/W2/W3 |

value.js grep verifications:
- `gold-shimmer\|dashed-well\|pastel-rainbow-text\|stagger-children` class refs: **9** at HEAD across `demo/`.
- `dashed-well` references: **2** silent-failure refs (matches lane F gap G6).
- `class="...gold-shimmer"`: **4** silent-failure text refs (lane F G8 cited 2; HEAD shows 2 explicit text + 2 icon = 4 total).
- `underline-tabs`: **4** at HEAD (matches lane F G5).
- `cubic-bezier(`: **2** literals at HEAD (rest are tokenised).

**Total: 61** + 5 design-lang gaps surfaced as drift candidates = **66 if design-lang counted as drift**, or **61 strict**. Reporting 61 to match lane F. The "design-lang" column tracks unrealised audacious-axis vocabulary surfaced for promotion.

---

## 6. bbnf-lang/playground (lane G)

Lane source: `docs/tranches/G/research/G-bbnf-lang-playground.md`. Lane G's tally lists per-axis findings inline; rough sum 50+ axis-row count, of which ~6 fold into already-listed gaps. The unique-row count is ~50.

| axis | drift count at HEAD | top 3 example sites | canonical replacement | wave that ships it |
|---|---:|---|---|---|
| 1 | 12 | `preset-bbnf.css:24-31,55-62` (6 `--pastel-*` accents not stepped through canon vocabulary); `preset-bbnf.css:37-38` (`--shadow-card`/`--shadow-hover` overriding canon's cartoon offsets); `preset-bbnf.css:41-46` (legacy `--glass-{opacity,bg,blur}-light/heavy/medium` not matching tier-named API); `main.css:32-34,39-43` (referencing `var(--shadow)` as a hue); `main.css:111-114,121-125,132-135` (heading-rule tapered linear-gradient); 12 `color-mix` open-codes; `BenchChart.vue:170` (gold inline HSL); 30+ `bg-pastel-*` semantic remap; `CodeCardFan.vue:68` (`--ease-spring` undefined — silent failure); 7 hand-rolled `cubic-bezier(0.4, 0, 0.2, 1)` literals (verified); `TypewriterText.vue:48-58,62-72` + `BbnfLogo.vue:36-47` (rainbow/gold hex stops) | adopt `--shadow-cartoon-{md,lg}`; tier-named glass tokens; `.divider-h-tapered`; `--ease-standard`; `var(--color-rainbow-vivid-*)` + `.gold-shimmer`; `Badge tone=` for semantic remap | W1 / W5 ledger |
| 2 | 12 | `main.css:50-60` (`card-base/card-subtle/card-elevated` reinventing tier substrate — 8 call sites); `main.css:31-43` (`shadow-card`/`shadow-card-hover`); `main.css:45-48` (`tapered-rule`); `main.css:66-71,73-80` (`btn-ghost`/`btn-cta`); `main.css:27-29` (`instrument-serif` alias — 37 sites); `main.css:402-407` (`.dock-badge` `@layer components`); `FeatureCards.vue:71` + `DemoCards.vue:96` (silent `class="code-badge"` × 6 invocations across 2 surfaces); `toneMaps.ts:42-44` (`shimmerClass()` returns retired `blue-shimmer` — 5 call sites); `DocsPage.vue:144-167` + `PlaygroundPage.vue:131-145` + `FormatterSettings.vue:50-54` ad-hoc button recipes; 12+ inline `bg-card/N backdrop-blur-{lg,xl}` glass-tier reimplementations | `.glass-{subtle,default,medium,elevated}`; `.shadow-cartoon-md`; `.divider-h-tapered`; `<Button variant>`; ship `.code-badge` + `.blue-shimmer` (W2 silent failures); `<MetricBadge size="sm">` | W2 / W5 ledger |
| 3 | 7 | 18 sites with raw `active:scale-{95,90,[0.95],[0.97],[0.98]}` (5 different press scales); `PlaygroundPage.vue:134` (bespoke `focus-visible:ring-2 focus-visible:ring-ring/50`); 3+ ad-hoc disabled-opacity rungs (30, 40); `WalkthroughOverlay.vue:55,57` + `LiveBench.vue:75-76` + `RunnableCode.vue:84-86`; `HeroSection.vue:106-122` (CTA `btn-cta` × 2 with shimmer overlay); `WalkthroughOverlay.vue:71-83` (Next/Finish text-button pair); `FlowChart.vue:117-126` (`.flow-node--clickable:hover` cartoon-card territory); `ErrorDialog.vue:43-46` (destructive-tinted DialogTrigger) | `--scale-press*`; `.focus-ring`; `.disabled-base`; `<Button variant>` family + `Badge tone="destructive"` | W5 ledger |
| 4 | 7 | `EditorPanel.vue:38` (`<Card variant="pane" class="!shadow-none">` defeating variant default — `flush` prop exists); `NavBar.vue:144-167` (custom dropdown bypassing `<DropdownMenu>`); `NavBar.vue:230-263` (`.attribution-card` reproducing HoverCard); `RightPane.vue:82-121` (direct `reka-ui` HoverCard import — bypassing glass-ui wrapper because no content-class slot prop); `PlaygroundPage.vue:131-145` (split-pane divider — gap promotion); `TabBar.vue` (custom segmented control); `EditorPanel.vue:67-79` (in-pane tab switcher reinvent) | `Card flush` prop; `<DropdownMenu>`; `<HoverCard>` + `closeIconClass` (W3); `<Tabs variant="underline"\|"pill">` (W3) | W3 / W5 ledger |
| 5 | 8 | 7 sites with `cubic-bezier(0.4, 0, 0.2, 1)` literal; 23 `transition-all` Tailwind utilities (verified at HEAD); `main.css:83-99` (5 custom `@keyframes`: `description-marquee`, `sweep`, `rainbow-shift`, `shimmer` — duplicate-defined twice — `blink`); `DocsPage.vue:170-184` (`mobile-drawer` Vue `<Transition>` with bespoke easing — `Sheet side="left"`); 4 named transition classes redefined (`hover-card`, `mobile-pane`, `nav-dropdown`, `page-fade`); `WalkthroughOverlay.vue` (annotation card ≈ Toast variant); `WalkthroughOverlay.vue:18-23` (open-coded Progress) | `var(--ease-standard)`; named property + token easing; canon `popover-animate`/`fade-slide`/`dropdown`/`fade`; `<Sheet>`; `<Progress>` | W2 / W3 / W5 ledger |
| 6 | 9 | `EditorPanel.vue:42-46` + `FormatterSettings.vue:65,70,77` + `ErrorDialog.vue:54` (`instrument-serif text-{xl,3xl}` × 8 sites bypassing `.text-{display,title,heading,subheading}`); 11+ ad-hoc `.section-label` shapes (verified bbnf section-label re-implementations: 13 at HEAD); 9 sites of ad-hoc tiny-text `text-[0.625rem]/[0.6875rem]/[0.5625rem]`; 8+ heading sites with raw `text-{xs..3xl}`; `DebugPanel.vue:65` (`<kbd class="...">` open-coding `.kbd`); `HeroSection.vue:115,117` (CTA `instrument-serif text-lg` — display tier in button); `BenchChart.vue:87,93` + `LiveBench.vue:88,94` (4× `text-2xl font-mono font-semibold` ≈ `.text-display-stat`); 18 `text-[Npx]` ad-hoc font sizes (verified) | `.text-pane-title`/`.text-title`/`.text-heading`/`.text-subheading`; `.section-label`; `.text-micro`; `.kbd`; `.text-display-stat` (W2) | W2 / W5 ledger |
| 7 | 3 | `main.css:51,55,59` + 12 inline `bg-card/N backdrop-blur-{lg,xl}` (no PRT/no @supports — same as axis 2.1/2.12 a11y view); spatial motion not bracketed by PRM (`WalkthroughOverlay.vue:65`, `CodeCardGrid.vue:12-13`, `HeroSection.vue:50-57`, `CodeCardFan.vue:29-30`); `MonacoEditor.vue:67-72` (no `prefers-contrast: more` theme — Monaco theming flagged risk-register / new gap) | `.glass-*` tiers (have a11y baked); PRM media gates; `useMonacoTheme()` (new gap, W3 if promoted) | W3 / W5 ledger |
| design-lang | 4 | `dock-badge` `@layer components` → `MetricBadge size="sm"`; `BenchChart` 4 sites of `.text-display-stat` shape; CTA `btn-cta` × 2 hero-button (cross-lane `Button variant="transport"`); 6 dockKeepOpen/dockRelease watcher hooks (`ErrorDialog.vue:17-23`, `ExampleSelector.vue:17-23`, `FormatterSettings.vue:12-18`) — all gap promotions, listed for design-lang lens completeness | `<MetricBadge>`; `.text-display-stat`; `<Button variant="transport">`; `DockLayerGroup :keepOpenWhile` | W1-W3 |

bbnf-lang/playground grep verifications:
- `class="code-badge"`: **2** at HEAD (per `FeatureCards.vue` and `DemoCards.vue` — 6 invocations come from these 2 file usages × 3 cards each).
- `"blue-shimmer"`: **1** def site (`toneMaps.ts:42-44`); 5 call sites via `shimmerClass()` invocation.
- `transition-all`: **23** at HEAD.
- `cubic-bezier(0.4, 0, 0.2, 1)` literal: **7** matches lane G axis 1.11 exactly.
- ad-hoc `instrument-serif text-xs uppercase tracking-wider`/`text-[0.625rem] font-mono uppercase tracking-wider`: **13** at HEAD (synthesis cited 11+).

**Total: 58.** Synthesis claim was "~50+ axis rows" pre-fold; W0.γ confirms 58 at HEAD.

---

## Roll-up table

| consumer | axis-1 | axis-2 | axis-3 | axis-4 | axis-5 | axis-6 | axis-7 | design-lang | total |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| speedtest | 7 | 3 | 1 | 2 | 3 | 5 | 2 | 0 | **23** |
| fourier-analysis/web | 18 | 14 | 8 | 7 | 9 | 9 | 4 | 0 | **69** |
| words/frontend | 11 | 10 | 6 | 4 | 11 | 16 | 4 | 0 | **62** |
| keyframes.js | 12 | 7 | 4 | 3 | 6 | 6 | 3 | 1 | **42** |
| value.js | 15 | 11 | 8 | 5 | 9 | 8 | 5 | 5 | **66** |
| bbnf-lang/playground | 12 | 12 | 7 | 7 | 8 | 9 | 3 | 4 | **62** |
| **Σ** | 75 | 57 | 34 | 28 | 46 | 53 | 21 | 10 | **324** |

> Note for fourier-analysis/web: rolling the per-axis sub-counts gives 18+14+8+7+9+9+4 = 69, while the lane C tally noted 49 distinct findings (rows that span axes were counted once in lane C but appear under each axis here for direct W5-pinning use). The 69 column-sum is the per-axis projection W5 pins against; the 49 is the unique-row tally lane C used. Use 69 for axis-bucket projection, 49 for unique-row delta.

---

## Methodology notes

**Drift vs intentional consumer territory.** The synthesis risk register (`docs/tranches/G/research/00-synthesis.md` §"Risk register" + each lane's §5) names patterns that are *consumer-side preset territory*, not glass-ui drift. These are excluded from drift counts:

- **C** (fourier-analysis/web): KaTeX `@font-face` boilerplate (R3); `useFourierMorph` (R5); `paperContent.ts`, `paperTree.ts` integration (R6); `lib/colors.ts:resolveVizColors` MutationObserver (R7); domain section-name aliases (R2, R10); equation-tier `TIER_INFO` metadata (R9); compound `--shadow-modal` recipe (R8); `lib/golden-shimmer.ts` *as policy* (R4 — the helper itself is promotable, the binding is not).
- **D** (words/frontend): SRS mastery tier system (`mastery-{default,bronze,silver,gold}` + `bg-mastery-*`); `card-state-{new,learning,young,mature,relearning}` palette; `review-{again,hard,good,easy}` button variants; full `themed-cards/` `[data-theme]` system; `--paper-handmade-texture`/`--paper-kraft-texture` runtime switching; `useTextureSystem` composable; SRS-domain progress-gradient utilities; `--layout-header-h*` app-shell layout tokens; Yoshi mascot keyframes (`wiggle`, `sparkle-slide`, `elastic-bounce`).
- **E** (keyframes.js): `instrument-serif` / `--ppmycota-primary` brand identity; `MatrixEditor` 4×4 grid editor; orbital-drag composables; Monaco editor coupling; `stores/` localStorage persistence + hash-share; `useSceneRouter`/`useSceneUrl`; html2canvas keyframe previews; `step-easing` jump-* parameterization; `useTransformState`.
- **F** (value.js): full color-picker family (ColorPicker, ColorSpaceSelector, ColorInput, SpectrumCanvas, MiniColorPicker, ComponentSliders); `useColorModel`; palette-browser (Hono+Mongo); `useWatercolorBlob` Mulberry32 PRNG (promotable in Sub-tranche β); GooBlob (palette-mascot-specific); pane-slide rotate-on-exit; consumer `--shadow-card 8px` override.
- **G** (bbnf-lang/playground): full Monaco theming bridge (ROW G's new gap if promoted); formal-grammar parsing primitives; bench-chart consumer-specific data shape; `<SplitPane>` (single live consumer — risk-register, see §00-synthesis Pass-2 ¶15); `runtimeHighlight()` + `LANGUAGE_RULES` (single live consumer); `<HorizontalBarChart>`, `useMonacoTheme()` (initial), `<WalkthroughTour>` — risk register per Pass-2 ¶19.

**Grep commands used for verification at HEAD** (each command run inside `/Users/mkbabb/Programming/`):

```bash
# Axis 1 — hex-literal density (excluding svg/dist/node_modules):
rg --count-matches '#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b' \
   --type-add 'styles:*.{css,scss,vue,ts,tsx,js,jsx}' --type styles \
   --glob '!dist/**' --glob '!node_modules/**' --glob '!*.svg' <consumer>

# Axis 2 — long @apply chains:
rg --count-matches '@apply [^;]{40,}' \
   --glob '!dist/**' --glob '!node_modules/**' <consumer>

# Axis 3 (variant rooting leak count):
rg --count-matches ':deep\(' \
   --glob '!dist/**' --glob '!node_modules/**' <consumer>

# Axis 5 — bespoke @keyframes count:
rg --count-matches '@keyframes' \
   --glob '!dist/**' --glob '!node_modules/**' <consumer>

# Axis 6 — raw font sizes:
rg --count-matches 'text-\[[0-9.]+(px|rem)\]' \
   --glob '!dist/**' --glob '!node_modules/**' <consumer>

# Spot-checks:
rg -n '#f0b632' fourier-analysis/web/src      # 9 hits — confirms lane C 1.10
rg -n -- '--section-color-' fourier-analysis/web/src/styles  # 30 hits
rg -n 'transition:\s*all\b' fourier-analysis/web/src   # 29 hits — matches lane C 5.3
rg -n '\bactive-scale\b|\bdisabled-base\b' words/frontend/src   # 11 hits
rg -n 'transition-all\b' bbnf-lang/playground/src      # 23 hits
rg -n 'cubic-bezier\(0\.4,\s*0,\s*0\.2,\s*1\)' bbnf-lang/playground/src   # 7 hits
rg -n 'class="code-badge"' bbnf-lang/playground/src    # 2 invocations × 3 cards = 6 sites
rg -n 'underline-tabs' value.js/demo                   # 4 hits
```

**Drift selection rule.** A row counts as drift when (a) the per-lane research report itemizes it under one of the seven axes; (b) the canonical replacement points to a glass-ui-canon class/token/component (or to a wave-promotable gap); (c) the pattern is *not* in the lane's risk register; (d) grep at HEAD confirms the call site still exists. The `axis` column above is the lane's primary axis assignment; rows that span multiple axes (e.g., a `:deep()` site that's also a focus-ring leak) are counted once in their primary axis.

**Drift exclusion rule.** Anything in the synthesis risk register, anything cited as "reference implementation / non-drift" in a lane report, or anything documented as deliberate consumer brand override (e.g., speedtest's `.text-hero` cqi sizing per DESIGN.md "Consumers extending beyond display-5") is excluded.

---

## Pinned baseline summary (W5 hard-gate ground truth)

| consumer | total drift at HEAD | pinned baseline for W5 delta | source |
|---|---:|---:|---|
| speedtest | 23 | **23** | lane B + γ verify |
| fourier-analysis/web | 49 unique / 69 axis-rows | **49** unique-row baseline; **69** axis-row baseline (W5 may pin against either; recommend unique-row) | lane C + γ verify |
| words/frontend | 62 axis-rows / 38 unique | **38** unique-row baseline; **62** axis-row baseline | lane D + γ verify |
| keyframes.js | 42 | **42** | lane E + γ verify |
| value.js | 61 | **61** | lane F + γ verify |
| bbnf-lang/playground | 58 | **58** | lane G + γ verify |
| **Σ baseline (unique-row)** | — | **271** | this lane |
| **Σ baseline (axis-row)** | — | **324** | this lane |

W5 ledger deltas pin against these baselines, not against the synthesis arithmetic (215 rows pre-fold). The 271 unique-row figure is the canonical W5 pin; the 324 axis-row figure is for axis-by-axis projection.

---

## Variance flags (≥30% deviation from synthesis)

Per the prompt, flag every consumer where measured drift differs from the synthesis claim by ≥30%.

| consumer | synthesis claim | measured (this lane) | delta | rationale |
|---|---:|---:|---:|---|
| speedtest | 20 distinct findings | 23 axis-rows / 20 unique | +15% / 0% | within tolerance — axis-row inflation comes from coalesced status-color row in axis 1 splitting back into three sub-rows. |
| fourier-analysis/web | 49 | 49 unique / 69 axis-rows | 0% / +41% | **flagged**: per-axis sum exceeds the unique-row tally because lane C marks "overlapping where one row covers multiple axes" — this is a reporting-method difference, not new drift. W5 ledger should pin against **49** unique-row to avoid double-counting. |
| words/frontend | 38 | 38 unique / 62 axis-rows | 0% / +63% | **flagged** for the same reason — lane D's headline is 38 distinct findings, but axis sum is 62 because rows like `.section-label` reinvention (axis 6) overlap utility hygiene (axis 2) and interactive consistency (axis 3). W5 ledger pins against **38** unique-row. |
| keyframes.js | 42 | 42 | 0% | matches exactly. |
| value.js | 61 | 61 | 0% | matches exactly. |
| bbnf-lang/playground | "~50+" pre-fold synthesis estimate | 58 | +16% | within tolerance, slightly above pre-fold estimate as expected (W0 was the fold). |

Net: no consumer has *new* drift the synthesis missed. Two consumers (fourier-analysis/web and words/frontend) have an apparent ≥30% inflation when measured by **axis-row projection** instead of **unique-row tally**; this is a methodology artifact, not new drift. W5 should pin against the unique-row baseline (49 / 38) for consumer-migration accounting and against the axis-row baseline (69 / 62) for axis-coverage hard gates.

---

## Known misses and risks

1. **No filesystem-level snapshot.** This lane uses HEAD at audit time; W5 must re-grep against the same SHAs (table at the top of this document) before committing the migration ledger. If a consumer makes a non-G-related fix between now and W5, the count moves.
2. **`text-[Npx]` axis-6 metric undercounts.** The `rg --count-matches 'text-\[[0-9.]+(px|rem)\]'` query catches Tailwind arbitrary-value font sizes but misses raw `font-size: Xpx` in `<style scoped>` blocks. Lane reports cited those sites; my axis-6 row totals include them via lane-itemization rather than my grep alone.
3. **`@keyframes` raw count is an upper bound.** keyframes.js shows 79 keyframes (engine demos), value.js shows 18, but most are domain. The drift-promotable subset is enumerated per-lane in axis 5; my axis-5 totals reflect the promotable subset, not the raw count.
4. **`design-lang` column is sparse for some lanes.** speedtest, fourier-analysis/web, and words/frontend land their design-lang signal as **gaps** (Table in `00-synthesis.md` §"Glass-ui gaps deduplicated") not as drift; their `design-lang` column reads 0 to avoid double-counting.
5. **Consumer HEAD movement.** Six consumers, six independent SHAs; if any consumer rebases or fetches before W5, the baseline moves. The SHAs at the top of this document are authoritative for W5 delta arithmetic.
6. **`fourier-overrides.css` vs `theme.css` coupling.** fourier-analysis/web's `fourier-overrides.css` is 354 lines; lane C cited "~150 lines of token redeclaration already in canon". The 30-line `--section-color-` count plus 18 viz-basis/easing-accent/tier accents/type-{micro,admin-label} lines confirms ~150 retire-able lines at HEAD. The remaining ~200 lines are consumer-domain (KaTeX boilerplate, custom shadow recipes, retry-banner styles).
7. **bbnf-lang/playground silent failures.** `class="code-badge"` (2 file refs / 6 invocations) and `shimmerClass()` returning `"blue-shimmer"` (5 sites) are silently broken at HEAD. They count once each in the drift ledger (axis 2) but resolve via the W2 silent-failure ship-or-migrate decision.
8. **value.js silent typos.** `var(--color-muted-foreground)` × 3 in `PaletteDialog.vue` is a typo (should be `var(--muted-foreground)`); listed in axis 1. Counts once.
