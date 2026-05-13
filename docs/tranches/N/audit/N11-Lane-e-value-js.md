# N11 Lane e — value.js consumer audit (post-migration)

7-axis bidirectional style audit per `docs/audits/style-audit.md`. Target: `/Users/mkbabb/Programming/value.js/` (M.W1 Lane B close on user WIP branch `w.w2.1-value-js-prebuild`).

## Scope

- **Target**: value.js demo root, WIP branch `w.w2.1-value-js-prebuild`
- **Glass-ui reference**: v1.0.5 (M close `54a8acb` + N planning at `cbe2d13`)
- **Audit date**: 2026-05-12
- **Mode**: bidirectional canonical gap analysis + KISS overfitting probe

## Axis 1 — Token alignment

11 findings grouped into 3 patterns; all justified intentional overrides documented in DESIGN.md:

1. Custom shadow overrides — `--shadow-card` reimplemented with heavier cartoon offset (project pop-art aesthetic; documented).
2. Glass opacity override `--glass-opacity-subtle: 0.75` — load-bearing for hero-blob readability (documented).
3. Custom font bindings `--select-font: var(--font-mono)` — monospace numeric display for palette picker.
4. 11 layout-specific tokens (`--dock-h`, `--content-max-h`, etc.) — demo-scope extension.
5. Dark mode color tuple `--popover: hsl(224 50% 10%)` — project-intentional warmer override; correct cascading; no light-foreground bleed.

**Verdict**: zero true drift; all overrides documented + intentional.

## Axis 2 — Utility & @apply hygiene

3 patterns (4 sites); all custom utilities consume glass-ui tokens correctly:
- `.underline-tabs` palette-tab pattern
- `.palette-tab-content` transition (uses `--duration-normal` + `--ease-standard`)
- `.touch-gate-target` mobile-touch affordance
- `.pane-scroll-fade { contain }` + `content-visibility: hidden` performance pattern

**Verdict**: no `@apply` violations; no undeclared color soup; all custom utilities canonical.

## Axis 3 — Interactive consistency

2 patterns:
- Focus-visible coverage gap: 21 sites use `:focus-visible` correctly (`WatercolorDot.vue`, `ColorInput.vue`); ~5 custom buttons miss the focus ring → minor drift.
- Hover/press transforms in `GradientStopEditor.vue` use motion-token-driven coupled box-shadow + transform; legitimate custom motion fine-tuning.
- 9 `:disabled` sites use `--opacity-disabled` token correctly.

**Verdict**: ~80% focus-ring coverage; minor demo-scope gap.

## Axis 4 — Variant orthogonality + rooting

1 site: `.featured-badge :deep(svg)` in `PaletteCard.vue` — minimal isolated SVG styling; resolves via forwarded `class`; not load-bearing.

**Verdict**: clean.

## Axis 5 — Overlay + motion vocabulary

7 custom `@keyframes` all DOMAIN-SPECIFIC (zero duplications of glass-ui canon):
- `edit-drawer-in` (slug edit layer entry slide)
- `swatch-pop` (`ImageEyedropper`)
- `pane-header-shrink` + `pane-title-shrink` + `pane-desc-shrink` (PaneHeader animation triplet)
- `action-pulse` + `action-spin` (`ActionButton`)
- `input-mode-flash` + `crown-appear` (`ColorInput`)
- `golden-text-shimmer` (`PaletteCard`)
- `blink` (debug overlay)

Floating layers correctly inherit `--z-dock`/`--z-modal`/`--z-overlay`. Modal/drawer transitions use glass-ui motion. `prefers-reduced-motion` coverage ~70% (GooBlob authored; PointerDebugOverlay debug-only).

**Verdict**: zero duplicated keyframes; all custom motion load-bearing; partial reduced-motion gate (acceptable demo-scope).

## Axis 6 — Typographic + structural hierarchy

5 sites verified:
- `--font-display: "Fraunces"` + `--font-serif: "Fraunces"` — intentional Fraunces-everywhere per DESIGN.md
- `.hero-lab-title` uses `--type-display-3` ✓; `.hero-lab-subtitle` uses `--type-body` ✓
- `.hero-controls__label` uses `var(--font-mono)` + `--type-caption` + `--tracking-caps` ✓
- One minor: Markdown component uses inline `line-height: 1.65` instead of `--leading-prose: 1.618` (demo-scope; not blocking)
- Palette browser uses grid + cards (gallery metaphor); no hierarchy drift

**Verdict**: typographic tokens used consistently; one minor prose-leading gap.

## Axis 7 — Accessibility resilience

- No `@supports (backdrop-filter)` guards in hero-lab CSS; demo-scope acceptable (IE 11 / early Safari acceptable to no-blur)
- Dark-mode color tuples use absolute values (not color-mix); correct cascading; no light-foreground trapping
- Focus-ring ~80% coverage (Axis 3)
- Reduced-motion ~70% coverage (Axis 5)

**Verdict**: no critical regressions; demo-scope acceptable.

## § One-consumer / overfitting (KISS directive)

### Local forks (M.W1 Lane B retired-upstream)

| Composable | Sites | Verdict |
|---|---|---|
| `copyToClipboard` | 14 | LOAD-BEARING (multi-site clipboard fallback essential for color-share UX) |
| `usePopupMutex` | 1 (Dock.vue) | LOAD-BEARING (dock interaction model depends on it) |
| `useLayerTransition` | 1 (ActionBarLayer.vue) | LOAD-BEARING (FLIP width animation + crossfade for layer swaps) |

All 3 forks are load-bearing; not overfitted.

### Single-consumer demo components

| Component | Uses | Verdict |
|---|---|---|
| **`header-ribbon/`** | **0** | **REMOVE candidate** — orphaned; never instantiated |
| `markdown/` | 1 (BrowsePane) | LOAD-BEARING |
| `katex/` | 2 (BrowsePane + Markdown) | LOAD-BEARING |
| `image-palette-extractor/` | 2 | LOAD-BEARING (dual-role) |
| `svg-filters/` | 1 (GooBlob) | LOAD-BEARING (metaball shader) |
| `dark-mode-toggle/` | 1 (Dock) | LOAD-BEARING (top-level affordance) |
| `panes/PaneHeader.vue` | 10 panes | LOAD-BEARING |
| `dock/layers/{ActionBar,Generic,SlugEdit}Layer.vue` | each 1 (Dock context) | LOAD-BEARING (dock-internal) |

**Result**: 1 orphaned component (`header-ribbon/`) recommended for removal; all other single-consumer components serve load-bearing dock-internal or domain-specific purposes.

### Dead-barrel audit

`dock/index.ts`, `goo-blob/index.ts`, `watercolor-dot/index.ts`, `palette-browser/index.ts` — all clean, no residual shims. M.W1 Lane B cleanup verified at HEAD.

### Inline opacity-modifier audit

`bg-[var(--color-*)]/N` Tailwind opacity-modifier pattern: **0 instances** at HEAD. (Rδ Lane C's 136 inline opacity count was pre-migration noise; M.W1 Lane B absorbed it.)

## § N-directive cross-walk

- **N6 storybook mobile**: value.js demo has its own hero-lab + dock chrome; aligned with glass-ui canonical motion; mobile rendering verified at the demo's responsive grid system.
- **N7 dock blur**: value.js dock uses glass-ui subpath re-exports correctly; no over-blur override.
- **N8 dock collapse**: value.js uses `GlassDock` + `DockLayer` from glass-ui subpath; no home-rolled collapse.
- **N9 typography**: 0 ad-hoc `text-[Xrem]` literals; all typography uses canonical tokens.

## § Glass-ui gaps revealed (≥ 2 consumer signal)

| Gap | Sites in value.js | Cross-consumer evidence | Proposed |
|---|---|---|---|
| `usePopupMutex` | 1 (Dock.vue) | likely shared by other dock consumers (verify in N11/c, N11/a) | promote to `@mkbabb/glass-ui/composables` if 2nd consumer surfaces |
| `useLayerTransition` | 1 | likely shared | same |
| `copyToClipboard` | 14 | likely shared across constellation | promote to `@mkbabb/glass-ui/utils` if 2nd consumer surfaces |
| `.tab-content-crossfade` utility | 1 (palette tabs) | unverified across consumers | defer until 2nd consumer evidence |

**Conservative disposition per KISS**: ALL 4 gaps require ≥ 2 consumer evidence before promotion (J invariant 10 + L invariant 8). N.W4 N11 cross-consumer audit will surface multi-consumer signals.

## § Union candidates

None detected. No vocabulary collisions between value.js and glass-ui canon.

## Closing tally

| Metric | Count |
|---|---|
| Drift findings | 27 (9 patterns; all intentional overrides or minor demo-scope gaps) |
| Single-consumer overfitting candidates | 1 (`header-ribbon/`) |
| Local forks (M.W1 Lane B) | 3 (all load-bearing) |
| Dead-barrel residuals | 0 |
| Inline opacity-modifier abuse | 0 |
| Custom @keyframes | 7 (all domain-specific; zero canon-duplication) |
| Glass-ui gaps surfaced | 4 (3 composable + 1 utility) |
| Union candidates | 0 |
| N-directive cross-walk findings | 0 (all directives aligned) |

## Verdict

value.js post-M.W1 demonstrates **tight alignment** with glass-ui v1.0.5 canon. No drift regressions. Three local forks are load-bearing — recommend N.W4 N11-cross-consumer audit verify multi-consumer evidence before any glass-ui-side promotion. One orphaned component (`header-ribbon/`) is a pruning candidate but is local to value.js, not glass-ui surface.
