# W5 — keyframes.js consumer migration ledger

**Consumer path**: `/Users/mkbabb/Programming/keyframes.js`
**Lane research source**: `docs/tranches/G/research/E-keyframes.md`
**Pinned baseline drift count at HEAD (W0.γ)**: **42 unique-row** = **42 axis-row** (no axis vs unique variance — 0% delta).
**Consumer HEAD at audit time**: `089126a`.
**Glass-ui canon**: `master @ badc536` (v0.5.0); W1–W4 additions per `audit/W1-token-proof.md`, `audit/W2-utility-proof.md`, `audit/W3-component-proof.md`.

This ledger names every edit the keyframes.js follow-up tranche must perform. No edits land in the consumer repo as part of G — proof-by-ledger only, per W5.md.

---

## 1. Migration table

Schema: `drift # | site (file:line) | current pattern | canonical replacement | canon source (file:line in glass-ui src) | projected delta`

### Axis 1 — Token alignment (12 rows)

| # | site | current pattern | canonical replacement | canon source | Δ |
|---:|---|---|---|---|---:|
| 1 | `demo/@/styles/style.css:7` | `--font-serif: "Instrument Serif"` set inside `@theme {}` (Tailwind v4 footgun) | move to `:root {}` block (rows 14-48) | DESIGN.md §Typography; `src/styles/theme.css` (canon `@theme` reserves `--font-*` for primitives only) | -1 |
| 2 | `demo/@/styles/style.css:10-11, 43-44, 54-55` | redundant `--accent-red` / `--accent-red-foreground` redeclaration in `@theme` + light + dark roots (6 rows total) | drop the consumer redeclarations — canon retains `--accent-red` per W0 challenge §B.1 / R4 | `src/styles/tokens.css` `--accent-red` (kept post-W1) | -6 |
| 3 | `demo/easing/EasingTarget.vue:344, 360-407` (6 sites) | hand-rolled `color-mix(in srgb, var(--color-progress) N%, transparent)` for track-line + 4 marker variants + ball glow | `.viz-track` / `.viz-marker` / `.viz-marker--start` / `.viz-marker--end` / `.viz-ball` utility set parameterised via `--viz-color` | `src/styles/utilities.css` (W2 viz-track family) | -6 |
| 4 | `demo/@/components/custom/EasingCurveCanvas.vue:296, 328` | `stroke: var(--ppmycota-primary, var(--foreground))` — fallback hardcodes foreground | `stroke: var(--ppmycota-primary, var(--easing-accent))` | `src/styles/tokens.css:209` `--easing-accent: hsl(248 88% 71%)` | -2 |
| 5 | `demo/@/components/custom/animation-controls/AnimationMenuBar.vue:215-229` | `CSSKeyframesAnimation.fromString('@keyframes twist {…}')` reset-icon spin + 5-stop trash shake — no token coupling on duration/easing | refactor to `{ duration: var(--duration-fast), timingFunction: "ease-spring-bouncy" }` via canon icon-feedback composable (or accept ad-hoc and bind tokens) | `src/composables/motion/useIconFeedback.ts` (W3 lane 3) | -1 |
| 6 | `demo/cube/CubeTarget.vue:139-146` | `@keyframes idle-bob` — local breathe-Y duplicating canon weight-breathe axis | use canon `breathe-y` keyframe + `--motion-bob-distance` token, OR accept (also evidenced in `EditorStartScreen.vue` chevron) | `src/styles/animations.css` (W2 idle-bob promotion) | -1 (deferred — gap promotion) |
| 7 | `demo/app/App.vue:393-410` | `.scene-enter-active` hand-rolled `pane-swap`-shaped transition with `scale(0.97)→scale(1.02)` + `var(--ease-spring)` | `<Transition name="pane-swap-scale">` | `src/styles/transitions.css` `pane-swap-scale` (W3 lane 3) | -1 (covered by row 24 below) |
| 8 | `demo/@/components/custom/orbital-drag/OrbitalDrag.vue:58` | string-built `transform: translate3d(...)` — no replacement (correct OrbitalDrag behaviour) | retain (axis colors `--axis-{x,y,z,w}` consumed but kept consumer-side per risk register) | — | 0 |
| 9 | `demo/@/components/custom/animation-controls/AnimationMenuBar.vue:255-264` | conic-gradient progress dot driven by `--dot-p`; `box-shadow` glow hand-rolled | `<StatusDot variant="progress" :model-value="0..1">` | `src/components/custom/status-dot/StatusDot.vue` (W3 lane 3 — `progress` variant added) | -1 |
| 10 | `demo/@/styles/style.css:39-40, 52-53` | `--color-progress` / `--color-slider-track` — consumer brand tokens (no drift, listed for completeness) | keep — legitimate consumer preset | — | 0 |
| 11 | `demo/@/components/custom/animation-controls/timeline/KeyframeTimeline.vue:80-83` | playhead `bg-primary` literal — no token-bind, fragile under contrast overrides | `var(--easing-accent)` via inline style or `.viz-playhead` utility | `src/styles/tokens.css:209` `--easing-accent`; W2 viz family | -1 |
| 12 | (axis-1 spacer — `--ppmycota-primary` brand identity stays consumer-side) | brand token | risk-register kept | — | 0 |

**Axis 1 subtotal**: -19 site-Δ across 12 unique rows. Pinned drift contribution: **-12**.

### Axis 2 — Utility & `@apply` hygiene (7 rows)

| # | site | current pattern | canonical replacement | canon source | Δ |
|---:|---|---|---|---|---:|
| 13 | `demo/@/styles/utils.css:7-17` (`.tab-trigger-base`) + `utils.css:20-46` (`.tab-trigger-pill`, `.tab-trigger-underline`); 4 invocations across `cube/App.vue:106`, `playground/App.vue:8`, `CubeScene.vue:139`, `AnimationControls.vue:170` | reinvented Tabs four-state contract with bespoke `transition: all` recipe | `<TabsTrigger variant="pill" \| "underline">` | `src/components/ui/tabs/` `tabsTriggerVariants` (W3 lane 4 — pill + underline branches) | -1 |
| 14 | `demo/@/styles/utils.css:48-81` (`.btn-playback`, `.btn-playback-accent`); applied at `PlaybackRibbon.vue:25-50` (Play/Pause + Reverse), `AnimationMenuBar.vue:91-104, 127-136` (rainbow play, collapsed + expanded) | full Button four-state contract reinvented with `--accent-red` color-mix recipe | `<Button variant="transport">` (consumes `--accent-red` for vibrant playback CTA) | `src/components/ui/button/` `buttonVariants` (W3 lane 4 — `transport` branch) | -1 |
| 15 | `demo/@/styles/utils.css:135-138` | `[data-state="active"][role="tabpanel"] { animation: enter ... }` redefining `tab-fade` via `--tw-enter-*` overrides | delete; rely on `<Transition name="tab-fade">` wrapping `TabsContent` | `src/styles/transitions.css:90-98` `tab-fade` | -1 |
| 16 | `demo/@/components/custom/animation-controls/timeline/KeyframeTimeline.vue:36-46` | utility-soup mini-bar `relative flex-1 h-1.5 rounded-full bg-muted/50 border border-border/30` + absolute `bg-primary/40` indicator (zoom mini-rail) | `<Progress variant="range" :start :end>` OR `.progress-rail` utility | `src/components/ui/progress/` `range` variant (W3 lane 3) | -1 |
| 17 | `demo/@/components/custom/animation-controls/timeline/KeyframeTimeline.vue:51-63` | `class="timeline-track relative rounded-lg border border-border bg-muted/50 hover:bg-muted/70 transition-all duration-fast ..."` | `<KeyframeTimeline>` family root surface (track exposed via `.viz-track` utility) | `src/components/custom/timeline/KeyframeTimeline.vue` (W3 lane 3) | -1 |
| 18 | `demo/@/components/custom/animation-controls/timeline/KeyframeTimeline.vue:88-101` | `'rotate-45 rounded-sm cursor-grab border-2 transition-all'` + size-state classes — diamond keyframe marker reinvented across 3 sites (marker, expanded marker, percent caret) | `<TimelineMarker variant="diamond">` family member | `src/components/custom/timeline/TimelineMarker.vue` (W3 lane 3) | -1 |
| 19 | `demo/@/components/custom/animation-controls/AnimationControlsGroup.vue:144-153` | inline `transition-[max-height,opacity] duration-slow ease-standard` collapse drawer | `<Transition name="pane-slide">` | `src/styles/transitions.css` `pane-slide` | -1 |

**Axis 2 subtotal**: -7. (Note: `RIBBON_BUTTON_CLASS` at `AnimationControlsGroup.vue:236` keeps `instrument-serif` per risk register — non-promotable; not a drift row.)

### Axis 3 — Interactive consistency (4 rows)

| # | site | current pattern | canonical replacement | canon source | Δ |
|---:|---|---|---|---|---:|
| 20 | `demo/easing/EasingTarget.vue:280-313` | pointer-capture drag — no `:active` press feedback (cursor-grabbing only) | apply `:active { transform: scale(var(--scale-press)) }` on grab | `src/styles/tokens.css` `--scale-press`; `.interactive-item` recipe | -1 |
| 21 | `demo/@/components/custom/animation-controls/timeline/KeyframeTimeline.vue:99-101` | marker hover `hover:scale-105` + selected `scale-125` — magic numbers diverging from canonical `--scale-hover: 1.08` | rebind to `var(--scale-hover, 1.08)` for hover; expose `--scale-hover-marker: 1.25` token if 1.25 active state needed | `src/styles/tokens.css` `--scale-hover` (W1) | -1 |
| 22 | `demo/@/components/custom/animation-controls/timeline/TimelineCaret.vue:20` | edit-input `focus:ring-1 focus:ring-primary` not `var(--focus-ring-shadow)` | wrap in `.focus-ring` utility OR use canon `<Input class="font-mono text-2xs h-5 w-10">` | `src/styles/utilities.css:27` `.focus-ring` | -1 |
| 23 | `demo/@/components/custom/EditableLabel.vue:11` | rename input `'border-b border-primary outline-none'` — no focus ring | route through `<Input>` + canonical focus ring | `src/components/ui/input/Input.vue` | -1 |

**Axis 3 subtotal**: -4.

### Axis 4 — Variant orthogonality and rooting (3 rows)

| # | site | current pattern | canonical replacement | canon source | Δ |
|---:|---|---|---|---|---:|
| 24 | `demo/@/components/custom/animation-controls/controls/AnimationControls.vue:226-236` | `.tabs-overflow-{right,left,both}` with `--tabs-mask-fade: 2.5rem` — reinvents `.scroll-fade-x` because canonical `--mask-fade-width: 1rem` is too narrow for tab labels | `useScrollFade({ classPrefix: "scroll-fade", axis: "x" })` + new `--mask-fade-width-wide` token (or pass override) | `src/composables/motion/useScrollFade.ts`; `src/styles/utilities.css:103-121` | -1 |
| 25 | `demo/@/components/custom/dock/TopDock.vue:111` | `style="top: calc(var(--work-area-top-offset, 0px) + var(--dock-margin) / 4);"` — uses canonical `--dock-margin` correctly | keep — reference implementation | `src/styles/tokens.css` `--dock-margin` | 0 |
| 26 | `demo/@/components/custom/animation-controls/AnimationMenuBar.vue:1-9` | fixed-bottom dock wrapped in `<div class="fixed left-0 right-0 z-dock">` with `pb-[max(calc(var(--dock-margin)/2),env(safe-area-inset-bottom))]` for iOS | `<GlassDock position="fixed" always-expanded>` (auto-applies safe-area-inset-bottom per W3 lane 4 bundle) | `src/components/custom/dock/GlassDock.vue` (W3 lane 4 — `position="fixed"` + safe-area auto-pad per W0 challenge §C / Gap 39) | -1 |

**Axis 4 subtotal**: -2 (row 25 is non-drift reference).

### Axis 5 — Overlay and motion vocabulary (6 rows)

| # | site | current pattern | canonical replacement | canon source | Δ |
|---:|---|---|---|---|---:|
| 27 | `demo/app/App.vue:21, 46`; `demo/cube/App.vue:22, 70` (3 sites) | `class="z-modal min-w-[17rem] instrument-serif text-base p-1.5"` on `<DropdownMenuContent>` / `<HoverCardContent>` — `z-modal` is wrong tier (canon: `--z-popover` 70 / `--z-hovercard` 60) | drop `z-modal` class entirely; canon defaults to correct tier | `src/styles/tokens.css:103` `--z-popover`; `--z-hovercard` | -3 (sites collapse to 0 drift) |
| 28 | `demo/@/components/custom/animation-controls/timeline/KeyframeTimeline.vue:437-440` | custom `kf-editor-enter-active` / `-leave-active` Vue Transition — `opacity + transform translateY(±4-8px)` over `--duration-fast` / `--duration-instant` | `<Transition name="fade-slide">` | `src/styles/transitions.css:14-31` `fade-slide` | -1 |
| 29 | `demo/@/components/custom/header-ribbon/HeaderRibbon.vue:122-152` | bespoke max-width/opacity collapse on hover — also evidenced in `TopDock.vue` | `<RevealOnHover>` composable OR `.collapse-x` utility | `src/composables/motion/useCollapse.ts` (W3 lane 3 — `useCollapse({ axis: "x" })`) | -1 |
| 30 | `demo/@/components/custom/animation-controls/AnimationControlsGroup.vue:493-506` | desktop pane reveal `transform: translateX(-110%) rotate(-2deg)` with `--duration-slow var(--spring-snappy)` | `<Transition name="pane-left">` (canonical) + grid-row collapse separately | `src/styles/transitions.css` `pane-left` | -1 |
| 31 | `demo/@/components/custom/animation-controls/AnimationControlsGroup.vue:454-470` | mobile pane open/close `grid-template-rows: 1fr ↔ 0fr` over `--duration-panel` | accept inline (canon `expand-fade` covers) | `src/styles/transitions.css` `expand-fade` | 0 |
| 32 | `demo/app/App.vue:393-410` | `.scene-enter-active` cube↔easing↔playground swap with `scale(0.97)→scale(1.02)` accents | `<Transition name="pane-swap-scale">` | `src/styles/transitions.css` `pane-swap-scale` (W3 lane 3 — see W3-component-proof) | -1 |

**Axis 5 subtotal**: -6 (3 `z-modal` site removals coalesce into 1 drift row).

### Axis 6 — Typographic and structural hierarchy (6 rows)

| # | site | current pattern | canonical replacement | canon source | Δ |
|---:|---|---|---|---|---:|
| 33 | `demo/@/styles/style.css:84-87` (`.instrument-serif` 50+ uses) | brand identity — letter-spacing 0.02em diverges from `--tracking-snug: -0.01em` | keep (consumer brand) — optionally introduce `--tracking-prose: 0.02em` consumer token | — | 0 |
| 34 | `demo/@/components/custom/animation-controls/timeline/KeyframeTimeline.vue:105, 150` | `<span class="font-mono text-xs font-semibold">` percent labels | `.text-mono-caption` (locks weight via family) | `src/styles/typography.css` `.text-mono-caption` (W2) | -1 |
| 35 | `demo/@/components/custom/animation-controls/timeline/TimelineCaret.vue:9, 19` | `font-mono text-2xs` (custom 10px) — caret label + caret input | `.text-admin-label` | `src/styles/typography.css` `.text-admin-label` (`--type-admin-label: 0.625rem`) | -1 |
| 36 | `demo/@/components/custom/asset-manager/AssetPropertiesPanel.vue:7, 15, 23, 32, 40, 49` (8 sites) | `<label class="font-mono text-2xs text-muted-foreground">` axis-form labels | `.text-admin-label` | `src/styles/typography.css` `.text-admin-label` | -1 (8 sites coalesce) |
| 37 | `demo/@/components/custom/animation-controls/controls/AnimationControlsControls.vue:13, 21, 33, 49, 61, 69` | repeated `label-class="font-mono text-base text-muted-foreground"` for `LabeledInput` / `LabeledSelect` | `.text-mono-caption` (mono caption rung) — or `.text-admin-label` for tighter sites | `src/styles/typography.css` `.text-mono-caption` (W2) | -1 |
| 38 | `demo/@/components/custom/animation-controls/AnimationMenuBar.vue:33, 43, 116, 122` | `class="instrument-serif text-lg"` / `text-xl` in dock-internal labels | accept as consumer dock-display signature OR migrate to `.text-subheading` per canon | `src/styles/typography.css` `.text-subheading` | 0 (consumer signature acceptable) |

**Axis 6 subtotal**: -3 promotable (rows 33 + 38 retained as brand signature).

### Axis 7 — Accessibility resilience (3 rows)

| # | site | current pattern | canonical replacement | canon source | Δ |
|---:|---|---|---|---|---:|
| 39 | `demo/@/components/custom/EasingCurveCanvas.vue:264-340` | interactive `<svg>` without `aria-label` / `role` | add `aria-label="Easing curve editor"` + `role="application"` (consumer-side fix; not canon's concern) | (consumer cleanup) | -1 |
| 40 | `demo/@/components/custom/animation-controls/AnimationMenuBar.vue:255-264` | conic-gradient progress dot — no `prefers-reduced-motion` fallback for hue rotation | once migrated to `<StatusDot variant="progress">` (row 9), canon's PRM gate applies | `src/components/custom/status-dot/StatusDot.vue` (W3 lane 3 — PRM block bundled) | -1 |
| 41 | `demo/@/components/custom/animation-controls/timeline/KeyframeTimeline.vue:80-83` | playhead `bg-primary` div — invisible at high contrast if consumer overrides primary | bind to `var(--easing-accent)` (cf. row 11) OR token-bound `.viz-playhead` | `src/styles/tokens.css` `--easing-accent` | -1 (collapses with row 11) |

**Axis 7 subtotal**: -2 net (row 41 collapses with axis-1 row 11).

### Design-language gap (1 row)

| # | site | current pattern | canonical replacement | canon source | Δ |
|---:|---|---|---|---|---:|
| 42 | `demo/cube/CubeTarget.vue:200-209` (axis colors rendered ad-hoc inline) | inline `--axis-{x,y,z,w}` axis colors | adopt canon `--axis-{x,y,z,w}` tokens (W1 lane 1) | `src/styles/tokens.css` `--axis-{x,y,z,w}` (W1) | -1 |

**Design-lang subtotal**: -1.

---

## 2. Silent-failure resolutions

Both keyframes silent-failure rows from `audit/W0-silent-failures.md` are enumerated below; each canonical utility ships in W2 per `audit/W2-utility-proof.md`.

### S1 — `gold-shimmer` text variant (3 keyframes sites)

| Site (file:line) | Current | Canonical replacement | Wave |
|---|---|---|---|
| `demo/@/components/custom/animation-controls/controls/AnimationControlsControls.vue:69` | `class="...gold-shimmer"` (conditional on detail-active) | `.text-shimmer-gold` | W2 — `.text-shimmer-{gold,blue,vivid,pastel}` family |
| `demo/@/components/custom/EasingSelect.vue:23` | conditional `gold-shimmer` | `.text-shimmer-gold` | W2 |
| `demo/@/components/custom/EasingSelect.vue:59` | conditional `gold-shimmer` | `.text-shimmer-gold` | W2 |

Resolution: rename — clean break. Canonical utility `.text-shimmer-gold` ships in W2 per W0 challenge §B.3 (family naming clarification: `text-shimmer-{gold,blue,vivid,pastel}`); old `.gold-shimmer` class retired same wave per `feedback_no_backwards_compat`.

### S4 — `rainbow-vivid` / `rainbow-pastel` background classes (3 keyframes sites)

| Site (file:line) | Current | Canonical replacement | Wave |
|---|---|---|---|
| `demo/@/components/custom/animation-controls/AnimationControlsGroup.vue:87` | `'rainbow-vivid text-white !border-transparent'` | `.bg-rainbow-vivid text-white !border-transparent` | W2 |
| `demo/@/components/custom/animation-controls/AnimationMenuBar.vue:97` | `isPlaying ? 'rainbow-vivid' : 'rainbow-pastel'` (collapsed play btn) | `isPlaying ? 'bg-rainbow-vivid' : 'bg-rainbow-pastel'` | W2 |
| `demo/@/components/custom/animation-controls/AnimationMenuBar.vue:130` | `isPlaying ? 'rainbow-vivid' : 'rainbow-pastel'` (expanded play btn) | `isPlaying ? 'bg-rainbow-vivid' : 'bg-rainbow-pastel'` | W2 |

Resolution: rename + prefix. Canonical `.bg-rainbow-vivid` / `.bg-rainbow-pastel` utilities ship in W2 (gap #9), plus `--rainbow-pastel-*` `@theme` exposure (W1) so `bg-rainbow-pastel-{hue}` Tailwind utilities resolve natively. State semantics (vivid = playing, pastel = paused) preserved.

**Silent-failure subtotal**: -6 sites resolve via W2 utilities; collapses into 2 drift rows in the table above (already counted under axis 1 / axis 5 — silent failures are *resolved* by migration, not double-counted).

---

## 3. Components to swap (W3 lane 3 + lane 4 inventory)

| Bespoke recipe | Canon component | Sites (file:line) | W3 lane |
|---|---|---|---|
| `.tab-trigger-{base,pill,underline}` (`utils.css:7-46`) | `<TabsTrigger variant="pill" \| "underline">` | `cube/App.vue:106`, `playground/App.vue:8`, `CubeScene.vue:139`, `AnimationControls.vue:170` | 4 |
| `.btn-playback{,-accent}` (`utils.css:48-81`) | `<Button variant="transport">` | `PlaybackRibbon.vue:25-50`, `AnimationMenuBar.vue:91-104, 127-136` | 4 |
| Conic-gradient progress dot (`AnimationMenuBar.vue:255-264`) | `<StatusDot variant="progress" :model-value="0..1">` | `AnimationMenuBar.vue:50-60` (per-animation progress in select), `AnimationMenuBar.vue:255-264` (style block) | 3 |
| Bezier curve canvas (`EasingCurveCanvas.vue:264-340`) | `<BezierCurveCanvas>` | `EasingCurveCanvas.vue` (full file replacement); also `EasingSelect` mini-curves | 3 |
| Diamond keyframe marker + playhead + tick rule + percent caret (`KeyframeTimeline.vue:51-101`, `TimelineCaret.vue:7-28`) | `<KeyframeTimeline>` family — `<TimelineMarker variant="diamond" \| "circle">`, `<TimelinePlayhead>`, `<TimelineRuler>`, `<TimelineCaret>` | `KeyframeTimeline.vue:65-101`, `TimelineCaret.vue:7-28` | 3 |
| `.scene-enter-active` rotate-on-exit (`App.vue:393-410`) | `<Transition name="pane-swap-scale">` | `App.vue:393-410` (cube↔easing↔playground scene swap) | 3 |
| iOS safe-area-bottom dock pad (`AnimationMenuBar.vue:1-9`) | `<GlassDock position="fixed">` (auto-pads safe-area-inset-bottom) | `AnimationMenuBar.vue:1-9` | 4 (bundled per W0 challenge §C / gap 39) |
| `.collapse-x` candidate (`HeaderRibbon.vue:122-152`) | `useCollapse({ axis: "x" })` composable | `HeaderRibbon.vue:122-152` (left + right variants) | 3 |
| `.kf-editor` enter/leave (`KeyframeTimeline.vue:437-440`) | `<Transition name="fade-slide">` | `KeyframeTimeline.vue:437-440` | (canon transition; no new component) |
| `useRafLoop` (`useRafLoop.ts:1-62`) | `useRAFLoop` (canon — note canon name uses capital RAF) | `useRafLoop.ts` consumer file → drop; import `useRAFLoop` from `@mkbabb/glass-ui/composables` | 3 |
| Easing-name table (`animationDescriptions.ts:53-84` `NAMED_EASING_BEZIER`) | `NAMED_EASING_BEZIER` from `@mkbabb/glass-ui/tokens` (runtime data) | `animationDescriptions.ts:53-84` | 3 (runtime tokens — no new public subpath) |
| `spectrumColor` / `chartNeutrals` / `vizColorsHex` runtime usage | import from `@mkbabb/glass-ui/tokens` (existing subpath) | (n/a — no current consumer site, listed for symmetry with cross-consumer ledgers) | 3 |

---

## 4. Token redeclaration retirement

| Site (file:line) | Token | Disposition |
|---|---|---|
| `demo/@/styles/style.css:7` | `--font-serif` inside `@theme` | move to `:root` |
| `demo/@/styles/style.css:10-11` | `--color-accent-red`, `--color-accent-red-foreground` (`@theme` aliases of `var(--accent-red)` / `var(--accent-red-foreground)`) | drop — canon retains `--accent-red` per W0 challenge §B.1 / R4; the `@theme` aliasing is consumer-redundant since canon ships these via its own theme bridge |
| `demo/@/styles/style.css:43-44` | `--accent-red`, `--accent-red-foreground` (`:root` light) | drop — canon provides per W1 (rescinded retirement) |
| `demo/@/styles/style.css:54-55` | `--accent-red`, `--accent-red-foreground` (`.dark`) | drop — canon provides per W1 |

**Net redeclaration retirement**: 6 row drops. The 12 fourier component sites consuming `var(--accent-red)` are unaffected — they continue to resolve against canon. keyframes.js's playback-accent migration to `<Button variant="transport">` (axis-2 row 14) is what carries the live consumption of `--accent-red` going forward.

---

## 5. Risk-register confirmations (do NOT touch in migration)

Per `research/E-keyframes.md` §5, these patterns stay consumer-side; the migration must not promote them to canon-bound replacements:

1. **`instrument-serif` font-family + brand identity** — `--font-display` / `--font-serif` already give consumers the swap point; do not ship `instrument-serif` as a canonical class.
2. **`--ppmycota-primary` brand cosmetic** — stays consumer-side (`style.css` cosmetics, ppmycota mode toggles).
3. **MatrixEditor (4×4 `matrix3d` grid editor)** — niche-domain; `MatrixEditor.vue` + `useTransformState` stay consumer-side.
4. **OrbitalDrag composables** — `useOrbitalInertia`, `useOrbitalPointer`, `useOrbitalPinch` (pinch / inertia / quaternion) stay consumer-side.
5. **Monaco-based CSS editor** — `CSSCodeEditor.vue` heavy dep, niche. Stays consumer-side. (bbnf-lang/playground gets `useMonacoTheme()` per W0 challenge §A; keyframes.js does not.)
6. **`html2canvas` keyframe previews** — `KeyframeTimeline.vue:282-296` heavy dep; niche. Consumer-side.
7. **`stores/` localStorage persistence + hash-share** — animation-store layer is keyframes-domain; consumer-side.
8. **`useSceneRouter` / `useSceneUrl`** — demo-app scene routing; consumer-side.
9. **`step-easing` jump-* parameterization (`steps(n, jump-{start,end,none,both})`)** — canon's curated motion vocabulary deliberately avoids this. Surface as runtime data only if needed; do not add `--ease-step-*` tokens to canon.
10. **`--axis-{x,y,z,w}` colors** — canon ships them as W1 promotion (3D-tooling convention); but if any consumer-specific CubeTarget visualization adds custom axis hues beyond red/green/blue/foreground, those stay consumer-side.

---

## 6. Projected post-migration drift

**Pinned baseline (W0.γ)**: 42 unique-row.

| Bucket | Drift rows resolved |
|---:|---|
| Axis 1 — token alignment | 9 (rows 1, 2, 3, 4, 5, 7, 9, 11, 12) — rows 6, 8, 10 deferred or non-drift |
| Axis 2 — utility hygiene | 7 (rows 13–19) |
| Axis 3 — interactive consistency | 4 (rows 20–23) |
| Axis 4 — variant rooting | 2 (rows 24, 26) — row 25 non-drift |
| Axis 5 — overlay/motion | 5 (rows 27, 28, 29, 30, 32) — row 31 accepted inline |
| Axis 6 — typography | 3 (rows 34, 35, 36, 37 collapsed into 3 unique replacements) — rows 33, 38 brand signature |
| Axis 7 — a11y | 2 (rows 39, 40) — row 41 collapses with row 11 |
| Design-lang | 1 (row 42) |
| **Σ resolved** | **33** |
| **Residuals** | rows 6, 8, 10, 25, 31, 33, 38 (7 of 42 — 6 non-drift / brand / domain; 1 deferred gap promotion `idle-bob`) |

**Projected post-migration drift**: **42 - 33 = 9 unique-row residuals**, of which 7 are intentional (brand identity, OrbitalDrag domain, `--color-progress` consumer token) and 2 are deferred-gap promotions (`idle-bob` keyframe + `--mask-fade-width-wide` token if it doesn't ship in W2). If both deferred gaps land in canon by close, residual drops to **5 unique-row** (all consumer-territory brand or domain).

**Hard gate target for keyframes.js follow-up tranche**: ≤ 5 unique-row residuals (all classified as risk-register / brand-signature / consumer-domain). 88% drift absorption.

---

## 7. Net retirement aggregate (lines projected)

| Source | Lines | Notes |
|---|---:|---|
| `demo/@/styles/utils.css:7-81` (tab-trigger family + btn-playback family) | ~75 | absorbs into `<TabsTrigger variant>` + `<Button variant="transport">` |
| `demo/@/styles/utils.css:135-138` (tabpanel animation override) | ~4 | absorbs into canonical `tab-fade` |
| `demo/@/styles/style.css:7` move (font-serif relocation) | 1 | structural |
| `demo/@/styles/style.css:10-11, 43-44, 54-55` (accent-red redeclarations) | 6 | drop redundancy |
| `demo/@/components/custom/animation-controls/timeline/KeyframeTimeline.vue` (timeline scaffolding) | ~200 | absorbed into canon `<KeyframeTimeline>` family |
| `demo/@/components/custom/animation-controls/timeline/TimelineCaret.vue` | ~30 | absorbed into canon `<TimelineCaret>` |
| `demo/@/components/custom/EasingCurveCanvas.vue:264-340` | ~75 | absorbed into canon `<BezierCurveCanvas>` |
| `demo/@/composables/useRafLoop.ts` | ~62 | drop; import canon `useRAFLoop` |
| `demo/easing/EasingTarget.vue:336-407` (track + 4 marker variants) | ~70 | absorbed into `.viz-track` / `.viz-marker` family |
| `demo/app/App.vue:393-410` (`.scene-enter-active`) | ~17 | absorbed into `pane-swap-scale` canonical transition |
| `demo/@/components/custom/header-ribbon/HeaderRibbon.vue:122-152` (collapse-x) | ~30 | absorbed into `useCollapse({ axis: "x" })` |
| `demo/@/components/custom/animation-controls/AnimationMenuBar.vue:1-9` (safe-area wrap) | ~3 | absorbed into `<GlassDock position="fixed">` |
| **Σ** | **≥ 573 lines** | matches lane E gap-promotion estimate |

---

## Authority

Pinned-baseline authority: `audit/W0-baseline-drift.md` §4 (keyframes.js).
Silent-failure authority: `audit/W0-silent-failures.md` (S1, S4).
Token-rescission authority: `audit/W0-challenge.md` §B.1 R4 (`--accent-red` kept).
Component / utility canonical sources: `audit/W1-token-proof.md`, `audit/W2-utility-proof.md`, `audit/W3-component-proof.md`.

Final ledger authority: G.W5 orchestrator close (proof-by-ledger; no consumer-repo edits land in this tranche).
