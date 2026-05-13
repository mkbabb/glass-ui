# N11 Lane c — bbnf-buddy consumer audit (post-migration)

7-axis bidirectional style audit per `docs/audits/style-audit.md`. Target: `/Users/mkbabb/Programming/bbnf-buddy/` (M.W1 Lane E close `e06d629` on master; NO origin remote — local-only).

## Preamble

- **Glass-ui baseline**: v1.0.5 + N planning at `cbe2d13`
- **Audit date**: 2026-05-12
- **Scope**: 47 Vue components + 2 custom CSS files + 1 preset override + 1 utilities module
- **Mode**: bidirectional + KISS overfitting

## Axis 1 — Token alignment

30 hardcoded HSL values; 0 raw rgba/hex outside token definitions.

### Hardcoded palette colors (not tokenized) — 11 files
- `ControlPointOverlay/palette.ts:28-46` (6 sites): `hsl(40 90% 55%)` outer/gold + `hsl(210 80% 60%)` counter/blue at varying alphas. Duplicated across 5+ files. Should be `--color-intent-outer` + `--color-intent-counter` semantic tokens.
- `SmartGuides.vue` stroke: `hsl(320 85% 60%)` magenta guide line; no token.
- `ToolsLayer.vue` SVG defs: 7-stop rainbow gradient inline; should be a named `<linearGradient>` or `--gradient-intent-rainbow`.
- Remaining 7 sites: SVG overlay opacities + fills (one-off; low priority).

### Compliance highlights
- **Motion tokens**: 68 uses of `--duration-*`, `--ease-*`, `--spring-*` across CSS. Proper.
- **Surface-tint recipes**: 103 uses of `color-mix(in srgb, var(--foreground/...) N%, transparent)` properly token-driven.
- **Glass tier opacity overrides** (preset.css:157-207): intentional bbnf-buddy override for nested-card cartoon stacking; documented; not drift.

**Verdict**: 30 hardcoded HSL values are cosmetic palette constants that belong in preset.css as semantic tokens, not codebase drift.

## Axis 2 — Utility & @apply hygiene

0 Tailwind utility soup; clean.

- `src/styles/utilities.css` defines 4 custom utilities (`.edge-fade-{y,x,xy}`, `.dot-grid`, `.editor-panel-card`, `.editor-field`, `.state-label`, `.dock-separator`) — all proper bbnf-scoped, token-aware.
- 47 Vue components use scoped CSS with token-driven property declarations.
- Zero `@layer components` redefinition of glass-ui slots.
- Zero canonical glass-ui utility class reimplementations.

**Verdict**: clean.

## Axis 3 — Interactive consistency

8 custom interactive patterns; focus-visible present in 8/8 audited files.

- **Focus-ring pattern**: bbnf-buddy uses inline `outline: 2px solid var(--ring); outline-offset: 2px;` (8 sites). All identical → candidate for extracting to `.custom-focus-ring` local utility OR adopting glass-ui's canonical `.focus-ring` if matching.
- Hover/press/disabled states use `color-mix` + `--duration-fast var(--ease-standard)` — properly token-driven.
- Touch hit areas correct (DockIconButton from glass-ui enforces `--size-icon-btn`).

**Verdict**: mostly compliant; focus-visible logic correct but repetitive.

## Axis 4 — Variant orthogonality + rooting

**25 `:deep()` uses across 10 files** — primary drift class.

### `:deep()` on glass-ui/reka-ui internals (18 sites)
1. `EmotionStateSelect.vue:215` — `:deep([data-state="on"])` on ToggleChip → propose `labelClass?` prop on glass-ui ToggleChip
2. `DockPoses.vue:98-99` — `:deep([role="combobox"])` on Combobox → reka-ui-side gap
3. `EditorPanel.vue:233-234` — `:deep([data-slot="scroll-area-viewport"])` on ScrollArea → reka-ui-side gap
4. `EasingSelect.vue:105` — `:deep(> span)` on button text
5. `ToolsLayer.vue:301-358` — 7× `:deep(.dock-icon-button)` rules for hover/active/disabled state overrides on glass-ui DockIconButton re-exports → propose CVA `variant="custom"` branch OR `hoverClass?`/`activeClass?`/`disabledClass?` props
6. `DockNavigation.vue:147` — `.is-current` state class
7. `DockViewControls.vue:269-273` — `.is-destructive` variant styling
8. `LeftToolsDock.vue:256` — `.is-current` variant styling

### `:deep()` on sibling bbnf-buddy components (7 sites)
- `BoneRow.vue:178-183` + `LayerRow.vue:327` — `:deep(.editable-slider.is-compact)` (cross-component grid+label tuning)
- `SettingsPanel.vue:85` — `:deep(.mascot-monogram)` sizing override

**Verdict**: 25 `:deep()` uses — primary drift class. 18 are escape hatches against glass-ui/reka-ui internals; 7 are internal bbnf cross-component tuning. Glass-ui-side gaps are clear: ToggleChip + DockIconButton + reka-ui wrapper components need more styling slots.

## Axis 5 — Overlay + motion vocabulary

0 custom `@keyframes` duplicating glass-ui canon; 3 named Vue transitions using proper token durations/easings.

`src/styles/animations.css:5-83` defines:
- `.fade-enter-active` — `opacity 200ms var(--ease-standard)` ✓
- `.slide-{right,left}-enter-active` — proper tokens ✓
- `.dock-layer-enter-active` — proper tokens ✓
- `.scale-enter-active` — proper tokens ✓

Z-index discipline: preset.css adds local `--z-{canvas,grid,mascot,label,panel}` composing between glass-ui's rungs. Clean composition.

**Verdict**: exemplary. Named transitions use proper tokens; no animation duplication; z-index composition correct.

## Axis 6 — Typographic + structural hierarchy

0 hardcoded font-sizes outside token use; 5 custom heading styles in editor panels (all token-driven).

- `.card-heading` uses `var(--type-subheading)` ✓
- `.component-label` uses `var(--font-mono)` + `var(--type-caption)` ✓
- `.state-label` (utility) uses `font-variant: small-caps` + `letter-spacing: 0.08em` — proper semantic use

No spreadsheet-shaped lists; no Fraunces axis violations.

**Verdict**: clean.

## Axis 7 — Accessibility resilience

0 custom glass surfaces missing fallbacks; bbnf-buddy layers atop glass-ui's base surfaces which already carry `@supports`/`prefers-*` cascades. No reimplementation; no critical regressions.

**Verdict**: resilient.

## § One-consumer / overfitting (KISS directive)

### Components with single call site — all PROPERLY SCOPED (not overfitting)
- `CodeEditor.vue` (1 import) — wraps Monaco editor; load-bearing
- `EditableNumber.vue` (1 explicit + 6 implicit via EditableSlider) — DRY building block; load-bearing
- `MascotMonogram.vue` (1 import: SettingsPanel) — specialized pose preview; KEEP (clarity over inline)
- `OffsetEditor/OffsetPicker.vue` — embedded in OffsetEditor only; focused scope correct
- `dock/DockPoses/PoseActionsPopover.vue`, `overlay/PointContextMenu.vue` — clear separation of concerns

### Composables with single call site — 1 INLINE candidate

**`useLeaveTimer`** (1 call: `OffsetEditor.vue:71`):
- 42-line composable, single consumer
- Logic is straightforward (defer cancel by timeout)
- No external dependencies
- **Recommendation: INLINE** per V3 + KISS — abstraction tax for single-use utility
- Current verdict: harmless as separate file; inlining tidies but not blocking

### Reverse-overfitting candidates (glass-ui-side)
Per Axis 4 findings, the 25 `:deep()` uses signal glass-ui-side gaps:
- ToggleChip lacks `labelClass?` slot prop (1 consumer)
- DockIconButton lacks styling override CVA branch (7 sites in 1 consumer; clear signal)
- reka-ui Combobox/ScrollArea wrappers absent in glass-ui (1 site each; low priority)

## § N-directive cross-walk

- **N6 storybook mobile**: bbnf-buddy defines custom floating panels at `--z-panel: 25` with slide transitions (not Dialog motion). Intentional editor-specific chrome; no conflict with glass-ui canon.
- **N7 dock blur**: bbnf-buddy doesn't over-blur; uses canonical DockIconButton subpath.
- **N8 dock collapse**: bbnf-buddy uses glass-ui's GlassDock primitive without home-rolled collapse.
- **N9 typography**: zero ad-hoc `text-[Xrem]` literals; canonical tokens used throughout.

## § Glass-ui gaps surfaced

| Gap | Sites | Cross-consumer evidence | Disposition |
|---|---|---|---|
| `--color-intent-outer` + `--color-intent-counter` semantic tokens | 11 (bbnf only) | unverified | defer until ≥ 2 consumer; bbnf-local intent palette |
| `ToggleChip labelClass?` slot prop | 1 (bbnf) | unverified | defer; ≥ 2 consumer threshold |
| `DockIconButton` styling override CVA branch | 7 (bbnf only) | unverified | defer; ≥ 2 consumer threshold |
| `--color-guide` smart-guide color token | 1 (bbnf) | unverified | defer cosmetic |
| `--z-panel` intermediate tier | bbnf preset only | unverified | defer; orthogonal composition already works |

Per KISS + L invariant 8 (substrate-without-consumer binary): all 5 gaps require ≥ 2 consumer evidence before promotion. N.W4 cross-consumer audit will surface multi-consumer signals.

## § Union candidates

- **Surface-tint opacity rungs**: aligned (both use color-mix recipes); bbnf could adopt glass-ui rung tokens but recipes are identical — no union needed
- **Z-index tiers**: orthogonal composition; clean

## Closing tally

| Metric | Count |
|---|---|
| Drift findings | 53 (Rδ Lane C reported 52; +1 granularity variance) |
| `:deep()` uses (primary drift class) | 25 (18 glass-ui/reka internals + 7 internal tuning) |
| Hardcoded HSL colors (cosmetic palette constants) | 30 across 11 files |
| `transition: all` pattern | 1 (EmotionStateSelect.vue) |
| One-consumer overfitting candidates | 1 (`useLeaveTimer` inline candidate) |
| Glass-ui gaps surfaced | 5 (all defer pending ≥ 2 consumer) |
| Union candidates | 0 (clean composition) |

## Verdict

bbnf-buddy is the cleanest of the 5 audited migrated consumers. Primary drift class is `:deep()` escapes against glass-ui/reka-ui internals (signals real glass-ui-side slot-prop gaps but lacks ≥ 2 consumer evidence at N open). One inline candidate for `useLeaveTimer` per KISS. All other single-consumer components are properly scoped, not overfitted.

**useLeaveTimer recommendation: INLINE** (single consumer; 42 lines; no reuse pattern). Per V3 + KISS, can be absorbed inline at N tranche if the user dispatches; otherwise harmless as-is.
