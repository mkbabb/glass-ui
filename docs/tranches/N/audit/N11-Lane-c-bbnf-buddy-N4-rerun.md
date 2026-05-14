# N11 Lane c — bbnf-buddy consumer audit (N.W4 re-run, post-N substrate)

7-axis bidirectional style audit per `docs/audits/style-audit.md`. Target: `/Users/mkbabb/Programming/bbnf-buddy/` — READ-ONLY cross-repo. Re-run of N11/c (`docs/tranches/N/audit/N11-Lane-c-bbnf-buddy.md`, 2026-05-12) post-N substrate landings + KISS revision.

## Preamble

- **Glass-ui baseline**: N close + N.W4 HEAD (consumer pin is `file:../glass-ui` — live HEAD, not a versioned pin)
- **Audit date**: 2026-05-14
- **bbnf-buddy HEAD**: `e06d629` (`feat(glass-ui): migrate to v1.0 subpath surface` — M.W1 Lane E close, unchanged from baseline)
- **Working tree**: 1 modified file (`src/poses/css.ts` — keyframes.js → value.js refactor; orthogonal to glass-ui surface)
- **Commits since 2026-05-13**: 0 (bbnf-buddy has no origin remote; commits stay local; `git log --since=2026-05-13` returns empty)
- **Scope**: 47 Vue components + 2 custom CSS files + 1 preset override + 1 utilities module

## Substrate consumption (v1.0 subpath surface)

21 files consume v1.0 flat subpaths cleanly:

| Subpath | Sites |
|---|---|
| `@mkbabb/glass-ui` (root) | 22 imports across 22 files |
| `@mkbabb/glass-ui/dock` | 11 sites |
| `@mkbabb/glass-ui/dark` | 3 sites (main.ts, CodeEditor, SettingsPanel) |
| `@mkbabb/glass-ui/sortable-list` | 3 sites (LayersPanel, BehaviorsEditor, LayerRow) |
| `@mkbabb/glass-ui/toggle-chip` | 2 sites (EmotionStateSelect, OffsetPicker) |
| `@mkbabb/glass-ui/tabs` | 1 site (EditorPanel) |
| `@mkbabb/glass-ui/controls` | 1 site (SettingsPanel) |

- 0 references to retired v0.9.x nested `@mkbabb/glass-ui/composables/*` paths.
- 0 references to L.W3-retired `@mkbabb/glass-ui/pagination` / `/virtual`.
- 0 references to `@mkbabb/glass-ui/keyboard` (bbnf-buddy carries no keyboard-shortcut registry usage).
- 0 references to `@mkbabb/glass-ui/carousel` or `/forms` (no Carousel/Combobox surfaces consumed).

No N-wire-induced regression. Subpath surface is binary-compliant.

## Drift delta vs. N11/c baseline (2026-05-12)

| Drift class | N11/c baseline | N.W4 re-run | Delta |
|---|---|---|---|
| `:deep()` escapes (rule-sites) | 25 | **25** | **0** |
| `:deep()` raw rg-line matches | (n/a) | 26 | +1 (formatting: EditorPanel split one rule's `[data-slot]` + `[data-radix-…]` selectors onto two lines — same rule) |
| Hardcoded HSL (cosmetic palette, drift-relevant) | 30 | **30** | **0** (preset.css's 37 hsl entries are token *definitions*, not drift; palette.ts/SmartGuides/ToolsLayer rg counts unchanged) |
| `transition: all` | 1 (EmotionStateSelect) | **1** | **0** |
| One-consumer inline candidates | 1 (`useLeaveTimer`) | **1** | **0** (still single-consumer at OffsetEditor.vue) |
| Total drift findings | 53 | **53** | **0** |

### Per-file `:deep()` distribution (unchanged from baseline)

```
ToolsLayer.vue                7  (DockIconButton hover/active/disabled overrides)
DockViewControls.vue          3  (.is-destructive variant)
DockPoses.vue                 2  (emotion-state-trigger + [role="combobox"])
App.vue                       2  (layers-panel + selection-info layout)
EditorPanel.vue               2  (scroll-area-viewport dual-selector; one rule)
LayersPanel/BoneRow.vue       2  (.editable-slider.is-compact + .compact-label)
PoseActionsPopover.vue        1  (.emotion-trigger)
SettingsPanel.vue             1  (.mascot-monogram)
EasingSelect.vue              1  (> span)
LayerRow.vue                  1  (.editable-slider.is-compact)
DockNavigation.vue            1  (.is-current)
LeftToolsDock.vue             1  (.is-current)
DockViewControls.vue          (counted above)
EmotionStateSelect.vue        1  ([data-state="on"])
utilities.css                 1  (doc-comment mention only — not a rule)
─────────────────────────────────
Total rule-sites              25
```

## 7-axis sweep (delta-only)

**Axis 1 — Token alignment**: unchanged. 30 hardcoded HSL cosmetic palette constants across 11 files (palette.ts, SmartGuides, ToolsLayer rainbow). preset.css's 37 hsl values are token definitions (`--color-…: hsl(…)`), not drift. **No N-substrate regression.**

**Axis 2 — Utility & @apply hygiene**: unchanged. 0 utility soup; 0 `@layer components` redefinitions.

**Axis 3 — Interactive consistency**: unchanged. 8 sites of inline `outline: 2px solid var(--ring)` focus-ring still candidate for local `.custom-focus-ring` utility.

**Axis 4 — Variant orthogonality + rooting**: unchanged. 25 `:deep()` rule-sites (18 glass-ui/reka internals + 7 internal bbnf tuning). Primary drift class persists at identical surface area.

**Axis 5 — Overlay + motion vocabulary**: unchanged. 0 keyframe duplication; proper named transitions.

**Axis 6 — Typographic + structural hierarchy**: unchanged. 0 ad-hoc `text-[Xrem]` literals.

**Axis 7 — Accessibility resilience**: unchanged. Layers atop glass-ui base surfaces; resilient.

## § One-consumer / overfitting (KISS post-revision check)

**`useLeaveTimer`** — still single-consumer at `OffsetEditor.vue:71`. Composable at `src/composables/useLeaveTimer.ts` is 42 lines; comment now annotates it as "M.W1 Lane E useLeaveTimer-resolution; the symbol was never on the [glass-ui surface]". **Status: same recommendation — INLINE candidate per KISS; not blocking.**

No new overfitting signals introduced by the in-flight `src/poses/css.ts` modification (keyframes.js parseCSSStyleBlock → value.js extractKeyframes + extractProperties + parseCSSStylesheet — orthogonal substrate; not glass-ui-related).

## § N-substrate regression sweep

| N-wave | bbnf-buddy exposure | Verdict |
|---|---|---|
| N6 storybook mobile | uses custom floating-panel chrome, not Dialog | clean |
| N7 dock blur | consumes canonical DockIconButton via subpath | clean |
| N8 dock collapse | uses canonical GlassDock; no home-rolled collapse | clean |
| N9 typography | 0 ad-hoc `text-[Xrem]` | clean |
| N.W1 substrate residuals | n/a (no substrate consumer of changed packages) | clean |
| N.W2 carousel/forms re-pin | n/a (no consumer) | clean |
| N.W3 close | subpath surface unchanged | clean |

## § Glass-ui gaps surfaced (re-confirmed)

Same 5 gaps as N11/c baseline; all still single-consumer (bbnf only); all DEFER pending ≥ 2-consumer threshold per L invariant 8:

- `ToggleChip labelClass?` slot prop — 1 site
- `DockIconButton` styling-override CVA branch — 7 sites (1 consumer)
- `--color-intent-outer` + `--color-intent-counter` semantic tokens — 11 sites (1 consumer)
- `--color-guide` smart-guide token — 1 site
- `--z-panel` intermediate tier — bbnf-local

## Closing tally (N.W4 re-run)

| Metric | N11/c baseline | N.W4 re-run | Delta |
|---|---|---|---|
| Drift findings | 53 | 53 | 0 |
| `:deep()` rule-sites | 25 | 25 | 0 |
| Hardcoded HSL (drift-relevant) | 30 | 30 | 0 |
| `transition: all` | 1 | 1 | 0 |
| One-consumer inline candidates | 1 | 1 | 0 |
| Glass-ui gaps surfaced | 5 | 5 | 0 |
| Union candidates | 0 | 0 | 0 |
| Retired-subpath references | 0 | 0 | 0 |

## Verdict

bbnf-buddy at N.W4 HEAD shows **zero drift movement** vs. the 2026-05-12 N11/c baseline. The consumer remained at commit `e06d629` (M.W1 Lane E close) throughout N tranche; the only in-flight modification (`src/poses/css.ts`) is an orthogonal keyframes.js → value.js refactor with no glass-ui surface contact. The post-N substrate (N.W1 residuals + N.W2 carousel/forms re-pin + N.W3 close + KISS revision) introduced **no regressions** in this consumer. All 5 glass-ui gaps from the baseline persist at identical surface area and remain DEFER under the ≥ 2-consumer threshold. `useLeaveTimer` inline candidate persists; harmless as-is.
