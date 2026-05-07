# K — Rε — Architectural Transpositions (gestalt sweep)

**Authored**: 2026-05-06
**HEAD**: `5bcf1ce` (J close ceremony commit)
**Lane**: ε — substrate transposition opportunities
**Mode**: READ-ONLY

J shipped three transpositions (DockPopover→HoverPopover, Configurator unification, StoryChassis defer) and absorbed the v0.8.0 token-cleanup miss. K's gestalt sweep finds the next transpositions: collapse-and-retire over wire-and-forget, substrate over decoration, canonical primitive over duplicated recipe. The sweep walks all four sub-slices (`src/components/{ui,custom}`, `src/styles/`, `src/composables/`, `demo/`) and applies the canonical 7-axis style audit plus higher-order gestalt detection.

---

## §A — 7-axis style sweep findings

| Axis | Row count | Top file:line citations |
|---|---|---|
| 1 — Magic literals | **8** | `src/styles/utilities.css:165,183` (raw `color-mix(--foreground) 14%/22%` for metric-badge border — should be `var(--surface-tint-15)` / `var(--surface-tint-22)`); `src/styles/glass.css:143,165,166,219` (4 sites raw `color-mix(--foreground) {20,10,25,35}%`); `src/styles/dock.css:370,585,649,672` (4 sites raw `color-mix(--foreground) {15,10,8,10}%`); `src/styles/instrument-chassis.css:59,65` (raw `color-mix(--foreground) 4%/6%`); `src/styles/typography.css:324` (raw 8%); `src/components/ui/slider/Slider.vue:163` (raw 40%); `src/components/custom/timeline/GlassTimeline.vue:172` (raw 40%); `src/components/custom/tabs/UnderlineTabs.vue:109` (raw 70%); `demo/stories/aurora/NucleiOverlay.vue:68` (raw 22%); `demo/stories/foundations/paper-glass.vue:184` (raw 8% ×2). Total **18 raw `--foreground` color-mix bypasses** at HEAD despite W2 vocab.γ shipping `--surface-tint-{4..25}`. Magic ms: `src/components/custom/controls/DarkModeToggle.vue:97,102` (`750ms`, `500ms`); `src/components/custom/sidebar/ProgressiveSidebar.vue:219,220` (`0.4s`, `0.3s`). Raw rgba: `src/styles/tokens.css:263-264,664-665` (`rgba(0,0,0,0.10/0.12/0.30/0.35)` in shadow tokens); `src/components/custom/tabs/BouncyToggle.vue:298` (`rgba(0,0,0,0.08)` slider shadow). Cubic-bezier literal: `src/components/custom/tabs/BouncyToggle.vue:130` (fallback string in WAAPI consumer — defensible). |
| 2 — Recipe duplication | **3** | (a) `bg-foreground/[0.04]`/`/[0.08]`/`/[0.10]`/`/8`/`/12`-style raw alpha syntax co-exists with `var(--surface-tint-N)` consumers in the same component (`src/components/ui/button/index.ts:24,28` — `ghost`/`glass-wash` mix raw `bg-foreground/8` with `var(--surface-tint-22)`). Pick one vocab. (b) `<Pulse>` declares its own `@keyframes pulse-dot-bounce` + `pulse-ring-spin` (`src/components/custom/pulse/Pulse.vue:67,82`) — pulse semantics could cross-fertilize with `animations.css` if reused; currently 1 consumer (`demo/stories/primitives/pulse.vue`). (c) `<TypewriterText>` defines local `tw-cursor-blink` keyframe (`src/components/custom/typewriter/TypewriterText.vue:250`); single consumer. |
| 3 — Reach-in patterns | **6** | Demo `focus-visible:shadow-[var(--focus-ring-shadow)]` raw shadow assembly: `demo/stories/primitives/combobox.vue:48`; `demo/layout/CategoryRail.vue:33`; `demo/stories/foundations/intro.vue:69`; `demo/stories/navigation/dock-layers.vue:49`; `demo/stories/foundations/shadows.vue:61` (the foundations DEMO is acceptable). All 5 should consume the `.focus-ring` utility. Hardcoded scale literal: `src/components/custom/glass-carousel/GlassCarouselItem.vue:69` (`scale(1.03)` should consume `--scale-hover`). The four `src/styles/transitions.css:46,50,70,87,134` and four `src/styles/animations.css:44,68,92` `scale(0.95)`/`scale(0.96)` keyframe-internal literals are within Vue Transition / `@keyframes` definitions — defensible (named-keyframe canonical body). Single CSS-internal literal `src/styles/utilities.css:52` (`scale(0.98)`) is `.btn-press`'s defining keyframe — same defensibility. WAAPI: `src/components/custom/tabs/BouncyToggle.vue` (line 130-138) consumes `cssVar()` correctly — no reach-in. |
| 4 — Component structure drift | **5** | (a) `src/components/ui/card/Card.vue:46` still uses `rounded-xl` (primitive) — every other overlay migrated to `rounded-card`/`rounded-panel`/`rounded-dialog`/`rounded-tooltip` post-J.W2; Card root is the lone primitive-radius holdout. (b) `src/components/ui/cartoon-card/CartoonCard.vue:29` same `rounded-xl` literal. (c) `src/components/ui/dropdown-menu/DropdownMenuItem.vue:21` and `DropdownMenuRadioItem.vue:29` use `rounded-lg` (item-tier — could earn `--radius-menu-item` semantic alias or accept). (d) `:deep()` against `.glass-carousel-item` (`src/components/custom/glass-carousel/GlassCarousel.vue:198,202,212,216`) — sibling component, intra-package — defensible. (e) `:deep(.katex)` (`src/components/custom/math-surface/MathSurface.vue:77`) — third-party, defensible. (f) Bug: `src/components/ui/carousel/CarouselPager.vue:46,49,59,68,87` — `orientation` from `useCarousel()` is a `ComputedRef`, not a string. The template compares `orientation === 'vertical'` — always false. **F1 P0 regression from J.β still latent**; the W7 close ceremony resolved the mount error, but vertical-orientation pager rendering is silently mis-paired. |
| 5 — Substrate hierarchy bypass | **2** | (a) `src/components/ui/notification/Notification.vue:10,25,52-55` — uses raw `rounded-lg` + `rounded-md` instead of semantic radius; uses raw `text-white` + `bg-{success,destructive,warning,info}/90` instead of the W1-shipped `--{success,warning,info}-foreground` semantic family (which has 0 consumers). (b) `src/components/ui/sheet/index.ts:13` ships its own `data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500` slot list inline rather than fully consuming `.sheet-animate` (which the OVERLAY consumes correctly at `SheetContent.vue:41`). Magic 300/500ms inline. |
| 6 — Typography drift | **5** | (a) `demo/configurator/PresetEditor.vue:144,183,232,269,318` — 5 `text-xs font-mono uppercase tracking-wider` raw recipes; should consume `.section-label`. (b) `src/components/custom/configurator/ConfiguratorLayer.vue:83`, `ConfiguratorRow.vue:44,64` — 3 raw `text-[0.6875rem] font-mono` (= `--type-micro`) inside the canonical `<Configurator>` family — should consume `.text-mono-micro`. (c) `src/components/custom/search/FuzzySearch.vue:110,140` — raw `text-[0.6rem]`, `text-[0.65rem]` literal sizes. (d) `src/components/ui/{dialog/DialogTitle,drawer/DrawerTitle,confirm-dialog/ConfirmDialog}.vue` all reissue `text-lg font-semibold leading-none tracking-tight` (3 sites) — candidate for `.text-dialog-title` semantic utility. (e) `src/components/ui/{dropdown-menu/DropdownMenuShortcut,command/CommandShortcut,context-menu/ContextMenuShortcut}.vue` all reissue `text-xs tracking-widest` (3 sites) — candidate for `.text-shortcut`. |
| 7 — A11y / motion / transparency gates | **2** | (a) `src/components/custom/pulse/Pulse.vue:67-91` declares `pulse-dot-bounce` + `pulse-ring-spin` keyframes with no `prefers-reduced-motion` gate at the component level (the global `*:not([data-allow-motion])` wildcard catches it via `utilities.css:438-449` — defensible for CSS keyframes; flagged per audit precept 7). (b) `src/components/custom/typewriter/TypewriterText.vue:250` `@keyframes tw-cursor-blink` — same wildcard coverage. The `data-allow-motion` escape-hatch attribute is referenced in `utilities.css:439,445` but **0 explicit author sites** in source/demo (J.R5 row 90 already flagged — still unaddressed). |

**Drift count tally**: 31 distinct rows (8 + 3 + 6 + 5 + 2 + 5 + 2). Concentration: Axis 1 (magic literals — 18 surface-tint bypasses dominate) and Axis 6 (typography drift — Configurator + dialog-title + shortcut clusters). Axis 4 (Card/CartoonCard `rounded-xl` + Carousel orientation bug) carries the only structural P0.

---

## §B — Architectural transposition candidates

### B1 — `<Pulse>` + `<TypewriterText>` keyframes → animations.css

- **Source state**: `src/components/custom/pulse/Pulse.vue:67-91` declares `pulse-dot-bounce` + `pulse-ring-spin` locally; `src/components/custom/typewriter/TypewriterText.vue:250` declares `tw-cursor-blink` locally. 1 consumer each.
- **Target state**: lift the three keyframes into `src/styles/animations.css` as `pulse-bounce` / `pulse-spin` / `cursor-blink`; component scoped CSS just `animation: pulse-bounce ...`. Mirrors the canonical pattern for `dialog-in/out`, `sparkle-sweep`, `dock-in`, `gold-shimmer-slide`.
- **Reason**: simplicity — the canonical animation grammar lives in `animations.css`; component-local keyframes split the catalog.
- **Brittleness**: zero — keyframe names live in the global stylesheet; lifting them is rename-and-reference. Cross-repo speedtest doesn't consume Pulse/Typewriter keyframes directly.
- **K wave-spec recommendation**: K.W1 (vocab.δ keyframe consolidation), HARD GATE = `rg "@keyframes" src/components/` returns 0 hits.

### B2 — `--surface-tint-N` family — second-pass migration

- **Source state**: 18 `color-mix(in srgb, var(--foreground) N%, transparent)` bypass sites at HEAD (post-W2.γ). The token family ships and 13 consumers exist, but 18 sites still bypass — 7 in `src/styles/` (utilities.css, glass.css, dock.css, instrument-chassis.css, typography.css), 5 in `src/components/`, 6 in `demo/`. Detailed list in §A axis 1.
- **Target state**: every `color-mix(--foreground) N%` recipe at HEAD consumes `var(--surface-tint-N)` (or `bg-surface-tint-N`/`border-surface-tint-N` Tailwind utilities). Cross-cascade audit absorbs the 18 sites.
- **Reason**: elegance — the W2 vocab.γ landed the tokens; W2 vocab.β migrated 13 sites; the residue should not survive K open. Token-without-consumer is anti-substrate; consumer-without-token is anti-vocab. The W2 sweep was incomplete.
- **Brittleness**: zero — `var(--surface-tint-N)` is byte-identical to its expansion (verified `tokens.css:189-197`). Visual diff = none.
- **K wave-spec recommendation**: K.W1 (vocab.δ). HARD GATE = `rg "color-mix\(in srgb, var\(--foreground\) [0-9]+%" src/ demo/ | rg -v "tokens.css|surface-tint" | wc -l` returns 0.

### B3 — `<CarouselPager>` orientation bug — pager substrate fix-or-retire

- **Source state**: `src/components/ui/carousel/CarouselPager.vue:46,49,59,68,87` — `orientation` from `useCarousel()` resolves as `ComputedRef<'horizontal'|'vertical'>`, but the template (and computed icon refs) compares `orientation === 'vertical'` directly — always false. Vertical pager renders horizontal chevrons + flex-row layout. The `useProvideCarousel` returns `orientation` from `useCarousel` as a destructured prop — needs `.value` unwrap. **J.β.F1 P0** marked carousel pager mount-failure; W7 fixed the mount but missed the orientation correctness. CarouselDots.vue + GlassCarouselPager.vue must be inspected for the same drift.
- **Target state**: unwrap `orientation.value` in CarouselPager template (or hoist it into a computed ref); add a vertical-pager test fixture in the carousel.vue story; verify CarouselDots (`<CarouselDots>` likely has the same mistake) and GlassCarouselPager.
- **Reason**: simplicity — pager substrate must work in both orientations or it ceases to be a valid 2-axis primitive. The W6.C.2 ship was substrate-without-fidelity.
- **Brittleness**: low — fix is local; story coverage gap (no vertical CarouselPager story) is the load-bearing gap.
- **K wave-spec recommendation**: K.W2 (carousel substrate hardening). HARD GATE = π rendered probe at `/navigation/carousel` with vertical orientation flips chevrons to `ChevronUp`/`ChevronDown` + flex-col layout.

### B4 — Notification.vue → semantic foreground tokens consumption

- **Source state**: `src/components/ui/notification/Notification.vue:52-55` hardcodes `text-white` over `bg-{success,destructive,warning,info}/90`. The W1-shipped `--{success,warning,info}-foreground` tokens have **0 consumers at HEAD** (J.β.F7 flagged, deferred to K). Notification is the natural consumer.
- **Target state**: `success → 'bg-success text-success-foreground'`, etc. Notification consumes the canonical pair; Notification's `rounded-lg` → `rounded-card`; close button `rounded-md` + `hover:bg-white/10` → `rounded-input` (or matching) + `hover:bg-foreground/10`.
- **Reason**: substrate-with-consumer — W1 promised Notification as the named consumer; W7 didn't wire it. K should either wire (B4 lands) or formally retire the foreground tokens per `feedback_no_backwards_compat`.
- **Brittleness**: zero — Notification.vue has 1 consumer (`demo/stories/feedback/notification.vue:92`); update is leaf-only.
- **K wave-spec recommendation**: K.W1 (vocab.δ). HARD GATE = `rg "(success|warning|info)-foreground" src/components/` returns ≥ 4 sites; π contrast probe ≥ 4.5:1 on each tone.

### B5 — `useRAFLoop` + `useIntersectionPause` + `useDarkModeSync` — public surface 0-consumer audit

- **Source state**: `src/composables/motion/index.ts:15-28` exports `useDarkModeSync`, `useRAFLoop`, `useIntersectionPause`. Tests exist (`__tests__/useRAFLoop.test.ts`, `__tests__/useIntersectionPause.test.ts`); no production consumer in `src/` or `demo/`. Same shape as J.β.F5/F6/F7/F8 substrate-without-consumer pattern.
- **Target state**: triage per overfitting precept. Either (a) wire `useRAFLoop` into Pulse.vue / Typewriter.vue / aurora-canvas / metaballs-canvas (those all run their own RAF loops); (b) document each as "library-orphan, K-tranche named consumer roadmap" with explicit destination wave; or (c) retire.
- **Reason**: simplicity — 3 public-surface composables with tests but no runtime consumers is the strongest overfitting signal per `feedback_overfitting_audit`. The tests prove correctness, not consumption.
- **Brittleness**: low — wiring into the 3-4 RAF callsites is mechanical (Aurora/Metaballs already use raf via shaders). Retiring breaks no consumer.
- **K wave-spec recommendation**: K.W3 (composable consolidation). HARD GATE = each of the 3 has ≥ 1 production consumer OR is removed from the public barrel.

### B6 — `useOffsetPagination` + `useVirtualSectionWindow` + `useWindowedStore` — same 0-consumer pattern

- **Source state**: `src/composables/pagination/`, `src/composables/virtual/` — fully exported via `composables/index.ts:11,12`. **0 production consumers** in `src/` or `demo/`. Even `useGlassRenderer` has only 2 consumers (`paper-glass.vue` + `GlassPanel.vue`); `<GlassPanel>` itself has 1 demo consumer.
- **Target state**: consolidate or retire the 3 pagination/virtual composables. Per CLAUDE.md they're public surface — but without consumers they're speculative substrate.
- **Reason**: simplicity. Per `feedback_overfitting_audit` "library-orphan" verdict, exported with 0 distinct usage sites is the strongest deletion signal. Cross-repo consumers (fourier-analysis/web/, words/frontend/, bbnf-lang/playground/) should be checked before retire.
- **Brittleness**: medium — cross-repo grep required; if any external consumer imports `useOffsetPagination`, retire becomes a brittleness window.
- **K wave-spec recommendation**: K.W3 (composable consolidation), preceded by R-step cross-repo audit.

### B7 — `<GlassPanel>` resurrection — substrate vs. shadow

- **Source state**: `src/components/custom/glass-panel/GlassPanel.vue` exists at HEAD with single consumer (`demo/stories/foundations/paper-glass.vue:188`). CLAUDE.md (line 196) says `<GlassPanel>` retired in I.W1. Either CLAUDE.md is stale or the component was un-retired.
- **Target state**: confirm intent. If retired → delete + remove demo. If kept → CLAUDE.md update; register as canonical demo of `useGlassRenderer` adaptive tier. The `useGlassRenderer` composable + `<GlassPanel>` together form a substrate-with-consumer pair (only 1 consumer each, but the pair is canonical).
- **Reason**: clarity. CLAUDE.md drift is a process gap (J FINAL.md flagged "CLAUDE.md major refresh" as cross-tranche debt).
- **Brittleness**: low.
- **K wave-spec recommendation**: K.W0 (planning + CLAUDE.md refresh — see §F).

### B8 — `<labeled-field>` 4-component package collapse → single CVA

- **Source state**: `src/components/custom/labeled-field/{LabeledInput,LabeledSlider,LabeledSelect,LabeledSwitch}.vue` — 4 separate SFCs, each ~10-line wrappers around `<Label>` + the corresponding control + `<IconTooltip>`. Single consumer (`demo/stories/compositions/settings.vue` × 8 instances). All 4 hardcode `font-display text-base/text-lg text-muted-foreground cursor-help`.
- **Target state**: collapse to a single `<LabeledField>` component with `<slot>` for the control, OR a CVA with `as` prop selecting the control type. Lifts the 4-file 4-import hardship to one symbol; eliminates the 4 raw `font-display text-base` recipes.
- **Reason**: simplicity — 4 nearly-identical 10-line wrappers is overfitting; the substrate is the label-tooltip composition, not the underlying input type.
- **Brittleness**: low — single consumer, atomic refit.
- **K wave-spec recommendation**: K.W4 (labeled-field gestalt) OR formally accept as 4-package canonical and document the as-control axis in DESIGN.md.

### B9 — `<DiscoGlyph>` + `<GlyphFace>` + `<DockGroup>` — P-tranche second-consumer audit

- **Source state**: per CLAUDE.md Design Axes section, the P-tranche cohort is the silent-addition cluster I.W1 first owned. `<DiscoGlyph>` consumers: `demo/stories/primitives/disco-glyph.vue` only (1 demo). `<GlyphFace>`: `demo/stories/primitives/glyph-face.vue` + `demo/stories/compositions/instrument-chassis.vue` (2). `<DockGroup>`: `demo/stories/primitives/dock-group.vue` only (1). `<InstrumentChassis>` + `<RegionDivider>`: `demo/stories/compositions/instrument-chassis.vue` only (1 file). `<MetricBadge>`: not yet audited at HEAD.
- **Target state**: at K close, every P-tranche package has ≥ 2 consumer files (per the substrate-with-consumer precept) with visual fidelity OR is formally retired. The instrument-cluster axis was justified by the cohort; if 4/5 packages are still 1-consumer, the axis is overfitting.
- **Reason**: simplicity — the H-tranche silent-addition retro named these explicitly. K is the natural absorption point.
- **Brittleness**: low — adding a second consumer per package is demo-only work; retiring is clean per `feedback_no_backwards_compat`.
- **K wave-spec recommendation**: K.W4 (instrument-cluster fidelity), HARD GATE = ≥ 2 stories per package.

### B10 — Card + CartoonCard root `rounded-xl` → `rounded-card`

- **Source state**: `src/components/ui/card/Card.vue:46`, `src/components/ui/cartoon-card/CartoonCard.vue:29`. The W2 vocab.α convergence migrated all overlay `rounded-xl → rounded-panel/dialog`; Card was the documented exception ("rounded-card semantic for content cards"). At HEAD Card + CartoonCard still use `rounded-xl`. Token alias `--radius-card` exists (`tokens.css §4`).
- **Target state**: both consume `rounded-card`. Verify `--radius-card == --radius-xl` so visual diff = 0.
- **Reason**: elegance — every other card-tier surface in `demo/` consumes `rounded-card` (verified ≥ 30 sites); only the canonical Card root bypasses.
- **Brittleness**: zero — token-equivalent.
- **K wave-spec recommendation**: K.W1 (vocab.δ).

### B11 — Configurator's typography drift → `.text-mono-micro` + `.section-label`

- **Source state**: `src/components/custom/configurator/{ConfiguratorLayer,ConfiguratorRow}.vue` — 3 raw `text-[0.6875rem] font-mono text-muted-foreground/70` recipes (lines `Layer.vue:83`, `Row.vue:44,64`). Plus `demo/configurator/PresetEditor.vue:144,183,232,269,318` — 5 raw `text-xs font-mono uppercase tracking-wider` (the section-label recipe).
- **Target state**: Configurator family consumes `.text-mono-micro` (or `.section-label` for headings); PresetEditor consumes `.section-label`.
- **Reason**: elegance — the canonical typography vocab (`typography.css`) already names these. The library's own canonical primitive should not bypass its canonical typography.
- **Brittleness**: zero.
- **K wave-spec recommendation**: K.W1 (vocab.δ).

---

## §C — Must-investigate items (verdicts)

| # | Item | Verdict |
|---|---|---|
| 1 | 3 J-named primitives with ≥ 2 consumers + visual fidelity | **MIXED**. `<Configurator>` family: ≥ 2 consumers (aurora + metaballs), VISIBLE per J.β.V1/V2 — KEEP. `<CarouselPager>`: 1 consumer + orientation bug per §B3 — **FIX in K.W2**. `<CarouselDots>`: 1 consumer — sub-bar; verify same orientation bug. `<GlassCarouselPager>`: 1 consumer — sub-bar; J.β.F3 not-probed. **K.W2 carousel substrate hardening absorbs.** |
| 2 | `<HoverPopover keepDockOpen>` cross-repo speedtest | NOT VERIFIED in this sweep (cross-repo grep out of scope). 3 demo consumers in `demo/stories/navigation/dock.vue:183,199,217` confirms in-repo. Cross-repo verify is K.W0 reconciliation step. |
| 3 | `<Configurator>` aurora vs metaballs slot/prop divergence | KEEP. Both consume `<Configurator>` + `<ConfiguratorLayer>` + `<ConfiguratorRow>` + `useConfiguratorState`. Aurora uses `<Configurator>` direct (single layer); metaballs uses 7 `<ConfiguratorLayer>` instances. The shape is consistent — divergence is consumer-depth, not API-shape. No schism risk. |
| 4 | `<BouncyToggle overflow="scroll">` cross-tab consumer | SUB-BAR — 1 consumer (`demo/stories/aurora/AuroraConfigDock.vue:60`). `<Tabs>` (reka-ui-based) does NOT have its own overflow approach at HEAD (verified — no `overflow=` prop on TabsList/TabsTrigger). The "<Tabs> already has its own overflow" assumption in the K brief is incorrect. **Recommendation**: add a 2nd BouncyToggle/BouncyTabs `overflow="scroll"` consumer (or formally accept as aurora-only in DESIGN.md), or unify with Tabs by adding the prop to BouncyTabs and migrating the Tabs primitive. |
| 5 | `sliderVariants` 5×3 matrix all 15 cells distinct | KEEP. J.β.V3-V9 verified all 15 cells render distinctly with computed-style differentiation (track height, thumb size, bg α, border, halo). Demo consumes the full matrix at `demo/stories/primitives/slider.vue:152-164`. Non-default variant consumers in production: `spectrum`/`timeline`/`glass-pill`/`glass-cartoon` each appear once in the slider story (`:92,107,113,121`). All 15 cells justified. |
| 6 | W2 vocab.α + β consumers still consume + new bypasses | **PARTIAL DRIFT**. `.focus-ring`: 16 in-lib consumers preserved; 5 demo bypasses unchanged from J.δ — see B2. `--surface-tint-N`: 13 src/ + 1 demo consumer preserved; **18 raw `--foreground` color-mix recipes still bypass** — see B2 (the W2 migration was incomplete). |
| 7 | Glass tier ladder (`wash/quiet/resting/floating/overlay`) coverage | **CLEAN**. 0 stale `glass-{subtle,default,medium,elevated}` references at HEAD (J.δ row "Glass ladder rename" verified). 70 `glass-{wash,quiet,resting,floating,overlay}` consumers across src/ + demo/. Tier-vs-semantic mismatches not detected in this sweep. |
| 8 | 4 P-tranche packages ≥ 2 consumer bar | **SUB-BAR** for 3 of 4. `<InstrumentChassis>`: 1 demo consumer. `<DiscoGlyph>`: 1. `<DockGroup>`: 1. `<GlyphFace>`: 2 consumers. **K.W4 absorbs** (per B9). |
| 9 | Aurora vs Configurator vs PresetEditor naming | **CLEAN at API level, MIXED at implementation**. `<Configurator>` (lib primitive) ≠ `<PresetEditor>` (demo's app-shell preset editor) ≠ Aurora's `<AuroraConfigDock>` (story-local consumer of Configurator). Each owns its semantic. Drift: PresetEditor.vue (356 LOC) replicates `.section-label` 5× + `--scale-press` raw + `.focus-ring` raw — 8-9 raw bypasses inside the demo configurator that the canonical `<Configurator>` consumes correctly. **K.W1 absorbs** as part of vocab.δ residue. |

---

## §D — K wave-spec themes

The transpositions cluster into 4 natural waves:

### K.W0 — Reconciliation + CLAUDE.md refresh
Reconcile the documented file tree (CLAUDE.md) with HEAD reality. Outstanding drift items: `<GlassPanel>` resurrection (B7); `notification-dot` renamed to `status-dot`; `paper-backdrop` + `cartoon-card` + `multi-select` + `tags-input` + `data-table` + `scroll-pane` + `command` packages absent from CLAUDE.md; `blob` → `metaballs` rename; design-axes ledger needs P-tranche second-consumer audit results pre-baked. Doc-only commit; HARD GATE = `npm run typecheck` + spot-grep for cited paths.

### K.W1 — vocab.δ — second-pass vocabulary convergence
Absorbs **B2** (18 surface-tint bypasses), **B4** (Notification semantic foreground), **B10** (Card + CartoonCard `rounded-card`), **B11** (Configurator typography), the J cross-tranche-debt 5 demo `.focus-ring` bypasses, the 1 `transition-all` survivor in motion/stagger.vue (note: `motion/stagger.vue:59` uses `transition-all duration-normal ease-out` — actually decomposable). HARD GATE: zero raw `color-mix(--foreground) N%`, zero raw `focus-visible:shadow-[var(--focus-ring-shadow)]`, ≥ 4 `--{success,warning,info}-foreground` consumers OR formal retire. Mechanical sweep — risk low, leverage high.

### K.W2 — carousel substrate hardening
Absorbs **B3** (CarouselPager orientation bug + same-pattern check on CarouselDots + GlassCarouselPager). Adds vertical-orientation pager story + Playwright probe. HARD GATE: π rendered probe verifies vertical chevrons + flex-col layout; 2-orientation × 3-pager-component matrix all renders.

### K.W3 — composable consolidation (overfitting absorb)
Absorbs **B5** (motion composables 0-consumer triage), **B6** (pagination + virtual composables 0-consumer triage), the J cross-tranche-debt `cssVar()` 1-consumer bar (current 1 consumer; either ship a 2nd or document as WAAPI-only). Pre-step: cross-repo audit (`fourier-analysis/web/`, `words/frontend/`, `bbnf-lang/playground/`) for external consumers. HARD GATE: every public-surface composable has ≥ 1 production consumer OR is removed from the barrel; deletion proof per `feedback_overfitting_audit` library-orphan verdict.

### K.W4 — instrument-cluster + labeled-field consolidation
Absorbs **B8** (`<labeled-field>` 4-component collapse), **B9** (P-tranche second-consumer fidelity for `<InstrumentChassis>`/`<DiscoGlyph>`/`<DockGroup>`/`<GlyphFace>`). HARD GATE: each P-tranche package has ≥ 2 consumer files at K close; `<labeled-field>` either collapsed to single primitive or formally accepted as 4-component family with documented `as`-control axis. Plus **B1** keyframe consolidation (Pulse + TypewriterText keyframes lift to `animations.css`).

### K.W5+ — close ceremony + post-close audit
Standard J-pattern strengthened 6-agent audit. Re-run β + δ at HEAD. Verify all wave-spec gates hold against rendered probes.

---

## §E — Out-of-scope (defer to L or formally retire)

| Candidate | Why out-of-scope for K |
|---|---|
| Audacious primary-CTA variant extraction (`Button variant="primary-audacious"` from the dock-tab `data-tier="primary"` recipe) | J.cross-tranche-debt named L-deferral. The dock-tab primary recipe at `dock.css:687-767` is intricate (4 multi-line CSS rules + sparkle-sweep keyframe + edge-light + specular highlight) — extraction is its own gestalt wave with a story. K open is too soon; the recipe needs a 2nd consumer site (currently only `<DockTabButton data-tier="primary">`) before extraction earns its CVA. |
| `<Toast>` re-export gestalt | `src/components/ui/toast/` exists; ToastClose, ToastAction, Toaster all wired but the consumer pattern is unverified at HEAD (no `<Toaster>` mount at app shell). Defer to L. |
| `<Command>` + `<MultiSelect>` overlap | `<MultiSelect>` consumes `<Command>` internally; both are public surface. Overlap is intentional but not yet documented. Defer documentation to L. |
| Stress harness retire decision (J.cross-tranche-debt) | Ε-lane process work; defer to K.process-residue or L. |
| Bundle-budget gate re-land (J.cross-tranche-debt I.invariant 8) | CI-hardening process work; not transposition. Defer to K.process-residue (a separate non-transposition wave) or L. |
| `--space-phi-{5,6}` 0-consumer status | 9-rung Fibonacci spacing axis exists in tokens; W2 named these as preemptive. Either name a K consumer roadmap entry OR retire per `feedback_no_backwards_compat`. Defer to K.W3 if any composable consolidation creates a consumer; otherwise retire in K.W5 close. |
| `data-allow-motion` escape-hatch documentation | J.R5 row 90 named; J.W2 didn't address. Either document the canonical author-attribute usage OR retire the wildcard escape. Defer to L (process-doc, not transposition). |
| `.overlay-scrim` `@utility` block — already retired in J.W7 (verify) | If still extant at K open, retire. Otherwise close. |
| `--radius-tooltip` single-consumer status | Acceptable per J.β table — only one tooltip primitive exists. Not transposable. |

---

## §F — Cross-tranche debt (J residuals K should absorb)

J.R5 produced 32 drift rows + 9 gaps + 8 union candidates; J.W1+W2 absorbed the largest fraction. Below: which residuals K should now absorb.

| J.R5 residual | K disposition |
|---|---|
| 5 demo `focus-visible:shadow-[var(--focus-ring-shadow)]` raw recipes (J.cross-tranche-debt) | **K.W1** (B2 + parallel demo cleanup). |
| 3 demo `--surface-tint` bypasses (J.cross-tranche-debt) | **K.W1** (B2 — but the actual count at HEAD is 18 across src/ + demo/, not 3; J.δ undercounted). |
| `motion/stagger.vue:59` `transition-all` (J.cross-tranche-debt) | **K.W1**. Trivial — `transition-[transform,opacity]`. |
| `--{success,warning,info}-foreground` 0 consumers (J.cross-tranche-debt) | **K.W1** (B4 — Notification refit). |
| `cssVar()` ≥ 2 consumer bar (J.cross-tranche-debt) | **K.W3**. Either second consumer (BouncyToggle is 1) or formal WAAPI-only doc. Candidate 2nd: lifting `animatePress` literal scale `0.93/1.02` reads in `BouncyToggle.vue:113-114` — wait, those are 4-pose WAAPI keyframes (press + hover overshoot), already cssVar-consuming at line 130-138. The ≥ 2 bar is genuinely unmet without a 2nd consumer. |
| `--muted-soft` 0 consumers | **K.W3** retire OR wire (no obvious K consumer). |
| `--space-phi-{5,6}` 0 consumers | **K.W3** triage (see §E). |
| Audacious primary-CTA | DEFERRED (see §E). |
| drag-keep-open story-fidelity gap | **K.W4** add story (Slider inside GlassDock visual demo). |
| Top story-pager dock 4px overflow at 375 viewport | **K.W2** (carousel substrate hardening adjacent). |
| GlassCarousel audacious pager chevrons unreachable on mobile | **K.W2** (carousel substrate hardening). |
| `ay-close` reappearance | None at HEAD per `rg "ay-close" src/ demo/` — closed. |
| CLAUDE.md major refresh | **K.W0** (B7 + the 7+ undocumented packages). |
| README.md drift | **K.W0** (doc-only). |
| Bundle-budget gate re-land | DEFERRED (see §E). |

J.β residuals (J's strengthened audit emitted 9 sub-bar flags + 3 P0 visual regressions):
- F1/F2 P0 (CarouselPager mount) — **fixed in J.W7** (verified runtime mount works); F1 latent orientation bug is **B3** (K.W2).
- F4 drag-keep-open caveat — **K.W4 story-add**.
- F5–F8 preemptive token 0-consumers — **K.W1** (B4 wire-or-retire) + **K.W3**.
- F9 `.overlay-scrim` `@utility` duplicate — **fixed in J.W7** (verify at K.W0).

---

## Closing line

31 drift rows across 7 axes; 11 named transposition candidates (B1–B11); 4-wave K shape (W0 reconciliation + CLAUDE.md, W1 vocab.δ, W2 carousel substrate, W3 composable consolidation, W4 instrument-cluster + labeled-field); the dominant theme is **second-pass vocabulary convergence** — W2 landed the tokens; K finishes the migration the W2 sweep undercounted (18 surface-tint bypasses, 5 focus-ring bypasses, 18 typography bypasses, 5 component-typography drifts) — plus public-surface overfitting absorb (3 motion composables + 3 pagination/virtual composables with 0 production consumers).
