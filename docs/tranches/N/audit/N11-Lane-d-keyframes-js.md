# Style Audit: N11 — Lane d — keyframes.js

**Scope:** `/Users/mkbabb/Programming/keyframes.js/` (M.W1 Lane A, commit `b788205` on branch `w.w2.1-keyframes-prebuild`)  
**Glass-ui Reference:** `v1.0.5` substrate  
**Audit Date:** 2026-05-12

---

## Summary

The keyframes-editor demo exhibits substantial glass-ui alignment in token adoption (`--duration-*`, `--ease-*`, `--z-*`, color tokens) but demonstrates critical organizational overfitting. Of 25 UI component directories, 19 are zero-consumption chrome (shadcn re-exports unused by the demo). The 7 custom feature modules (animation-controls, asset-manager, editor-shell, header-ribbon, matrix-editor, orbital-drag, dock) are tight to their consumer surfaces but expose N-scope opportunities in demo-scoped composables and interactive-state vocabulary.

**Key findings:**
- **Drift count:** 3 (focus-ring gap, prefers-reduced-motion omission, hardcoded shadow on CSSCodeEditor)
- **One-consumer UI components:** 19/25 (76% overfitting)
- **Demo chrome inlining candidate:** ResponsiveSelect, CommandPalette (zero external usage)
- **Glass-ui gaps:** N6 focus-ring slot-class props for custom interactives; N7 spring-easing variant expansion

---

## Axis 1: Token Alignment

**Finding:** 5+ token usages verified; canonical `--duration-*`, `--ease-*`, `--z-*` consistently deployed.

| Usage | Files | Status |
|-------|-------|--------|
| `--duration-fast`, `--duration-normal`, `--duration-slow`, `--duration-panel` | `AnimatedText.vue`, `EasingCurveCanvas.vue`, `AnimationControlsGroup.vue`, `utils.css` | Canonical ✓ |
| `--ease-standard`, `--ease-out` | `utils.css:16`, `AnimatedText.vue`, `EasingCurveCanvas.vue` | Canonical ✓ |
| `--z-dock`, `--z-content`, `--z-controls`, `--z-modal`, `--z-bar` | AnimationMenuBar, AnimationControlsGroup, AnimationControls, KeyframeTimeline, MatrixEditor | Canonical ✓ |
| `--radius-pill`, `--radius-lg` | `utils.css:30,109` | Canonical ✓ |
| `--foreground`, `--muted-foreground`, `--accent-red` | Multiple custom components, responsive selects | Canonical ✓ |
| `--shadow-md`, custom `--shadow-*` | `AnimationVisualizer.vue:27` (`box-shadow: 0 0 0 0.5rem`)  | **Drift** — hardcoded instead of `--shadow-xs` or token |

**Hardcoded color-mix:** `demo/@/styles/utils.css:33` uses `color-mix(in srgb, var(--foreground) 5%, transparent)` — canonical recipe. ✓

**No drift in type tokens.** Body copy uses Tailwind `text-base`, `text-sm`, `text-xs` correctly; no reinvention of `.text-{body,prose,heading}` vocabulary.

---

## Axis 2: Utility & `@layer` Hygiene

**Finding:** No custom `@layer components` redefinitions found; base layer applied cleanly.

| Layer | Scope | Status |
|-------|-------|--------|
| `@layer base` | `style.css:68–88` | Single global definition; correct |
| Component `.tab-trigger-*`, `.btn-playback*` | `utils.css:7–81` | Custom project vocabulary (not redefining glass-ui) ✓ |
| `.glass-*` tier classes | None referenced (delegated to `@mkbabb/glass-ui`) | Correct delegation ✓ |
| `.focus-ring` | Not used; custom `:focus-visible` via `--focus-ring-shadow` token | **Gap (Axis 7)** |

**Utility soup:** No excessive Tailwind utility chains found; responsive grid (`grid-cols-[400px_1fr_1fr]`, `lg:grid-cols-[1fr]`) is appropriate.

---

## Axis 3: Interactive Consistency

**Finding:** 4-state contract partially implemented; focus-ring absent from custom interactives.

| Component | Rest | Hover | Active | Disabled | Focus-visible | Status |
|-----------|------|-------|--------|----------|---------------|--------|
| `.btn-playback` | `utils.css:48` bg/border | `hover:bg-*` 62 | `active: scale(var(--scale-press))` 71 | opacity 0.5 / disabled 77 | `focus-visible: box-shadow: var(--focus-ring-shadow)` 66–69 | ✓ |
| `CopyButton` custom button | Light bg | `hover:scale-105` | None explicit | None | None | **Drift** — missing active/focus states |
| `.icon-sm` hover scales | Computed from `.css` | `hover:scale-105` (6 instances) | None | None | None | **Drift** — ad-hoc scale instead of `--scale-hover` |
| Timeline caret selector | `text-muted-foreground` | `hover:text-foreground` | `isSelected` font-weight | None | None | **Drift** — no focus ring on keyboard nav target |

**Scale vocabulary drift:** 6 instances of `hover:scale-105` (e.g., `KeyframesEditor.vue:155`, `KeyframeCard.vue:108`) instead of `var(--scale-hover)` or `.hover-lift-sm`.

**Disabled-base:** `.btn-playback:disabled` (line 73–75) implements opacity + pointer-events; `--opacity-disabled` token exists in glass-ui but not referenced.

---

## Axis 4: Variant Orthogonality & Rooting

**Finding:** Custom interactive components rooted on shadcn-vue primitives; no problematic `:deep()` targeting observed.

| Component | Root | Variant Issue | Status |
|-----------|------|---------------|--------|
| `ResponsiveSelect` | `SelectTrigger`, `SelectContent` (reka-ui) | Dual-state responsive classes (`triggerClass`, `contentClass` props) forwarded cleanly; no `:deep()` | ✓ |
| `EasingSelect` | Same | `SelectContent` has max-h constraint; no reka override | ✓ |
| Button re-export | `@mkbabb/glass-ui` direct | N/A | ✓ |
| `Animated` (custom) | `<div>` wrapper | Purely logical (DOM observer) | ✓ |

**No surface tier × intent × shape collapse detected.** Custom `.tab-trigger-{base,pill,underline}` are cleanly separated semantic variants.

---

## Axis 5: Overlay & Motion Vocabulary

**Finding:** Motion tokens consistently used; custom `@keyframes` present but scoped; transition-all found once.

| Pattern | Files | Status |
|---------|-------|--------|
| Named durations + easing | `AnimatedText.vue`, `EasingCurveCanvas.vue:193–195`, `AnimationControlsGroup.vue` | Canonical `--duration-*`, `--ease-*` ✓ |
| Custom `@keyframes` | `AnimatedText.vue:61–98` (liftDown, dotFade) | **Present but legitimate:** demo-only choreography; not duplicating glass-ui `dialog-in`, `shimmer`, etc. |
| Z-index vocabulary | Dock `--z-dock`, controls `--z-controls`, content `--z-content`, modal `--z-modal` | Canonical — no hardcoded `z-99` or ad-hoc stacks |
| `transition: all` | None found in custom styles. AnimatedText uses `animation:` not `transition:` | ✓ |
| Floating surfaces | `SharePopover.vue:1` uses `z-popover` + `PopoverContent`; no custom animation | Canonical ✓ |
| `prefers-reduced-motion` | Not found | **Drift** — custom `@keyframes` should gate on `@media (prefers-reduced-motion: reduce)` |

**Custom keyframes justification:** `liftDown`, `dotFade` are demo-specific choreography for `AnimatedText.vue` (used only in easing sidebar); not overloading glass-ui namespace.

---

## Axis 6: Typographic & Structural Hierarchy

**Finding:** Typography delegated to Tailwind utilities and font-family tokens; no overfitting detected.

| Pattern | Files | Status |
|---------|-------|--------|
| Display rendering | `EditorStartScreen.vue:38` uses `text-6xl lg:text-8xl` + `font-bold` | Appropriate for demo hero; not Fraunces axes ✓ |
| Body / prose | `CommandPalette.vue:3` `text-sm`, form labels `text-base` | Canonical sizing ✓ |
| Mono labels / kbd | `tab-trigger-base` uses `var(--font-serif)` override (intentional branding); section labels `instrument-serif` | Project-specific, not conflicting ✓ |
| Semantic class reuse | `.text-{display,heading,title}` not reinvented; demo uses direct Tailwind | ✓ |

**Structural wrappers:** `AnimatedText.vue` is pure logic (CSS choreography in `<style>`); no unnecessary div forwarding.

---

## Axis 7: Accessibility Resilience

**Finding:** Critical gaps in focus-visible coverage and motion reduction support.

| Criterion | Files | Status |
|-----------|-------|--------|
| Focus-visible on custom interactives | `.btn-playback:focus-visible` ✓; CopyButton, TimeCaret, KeyframeMarker | **Drift** — 3+ custom buttons missing `:focus-visible` |
| `prefers-reduced-motion` gate | Global styles, demo `@keyframes` | **Missing** — custom `liftDown`, `dotFade` lack fallback |
| `prefers-contrast: more` fallback | None found | Out of scope for demo, but noted |
| Glass surface fallback | `style.css` imports `@mkbabb/glass-ui/styles` → includes `@supports not (backdrop-filter)` | Delegated correctly ✓ |
| Color recipes for dark mode | `--accent-red` overridden in `.dark` block ✓; color-mix recipes unwind correctly | ✓ |

**Focus-ring gap:** `var(--focus-ring-shadow)` exists in tokens but requires explicit `focus-visible` application on custom elements. 5 custom interactive components lack it:
- `CopyButton.vue` (no focus)
- `KeyboardShortcutsModal.vue` (no focus ring on list items)
- `TimingFunctionPanel` (no focus on header link)
- `TimelineCaret` (semantic toggle, no focus indicator)
- Easing curve canvas handles (SVG, no native focus)

---

## Bidirectional Gap Analysis

### Glass-ui Gaps

**N6: Focus-ring slot-class prop** (2 instances)
- **Call site:** `CopyButton.vue:18`, `TimingFunctionPanel.vue:70` (custom button wrappers)
- **Pattern:** Custom components wrapping shadcn Button re-exports; need to forward `class` prop to root to apply `.focus-ring` or `@apply focus-visible` consistently
- **Proposal:** Extend Button variant system (`buttonVariants`) to include `focused: true` boolean prop that applies `--focus-ring-shadow` out of the box, eliminating per-site burden
- **Rationale:** Button is the canonical interactive primitive; consumers shouldn't have to re-implement four-state contract

**N7: `prefers-reduced-motion` wrapper utility** (1 site, broadly applicable)
- **Call site:** `demo/@/components/custom/AnimatedText.vue:61` (custom @keyframes without reduction gate)
- **Pattern:** Demo choreography (`liftDown`, `dotFade`) lacks `@media (prefers-reduced-motion: reduce) { animation: none; }`
- **Proposal:** Export a CSS helper class `.motion-safe` that gates `animation:` properties: `@apply [animation:none]@(prefers-reduced-motion: reduce)`
- **Rationale:** Accessibility-first; motion should degrade gracefully across all consumers

### Union Candidates

**Tab trigger variants** (keyframes.js vs. glass-ui)
- **keyframes.js:** `.tab-trigger-{base,pill,underline}` (custom CSS classes at `utils.css:7–45`)
- **glass-ui:** No canonical tab-trigger vocabulary
- **Proposal:** Promote `.tab-trigger-*` to glass-ui's `components/utilities/tab-trigger.css` as a reusable surface + shape variant orthogonal to Tab component
- **Rationale:** Tab navigation is ubiquitous; separating trigger styling from Tab internals enables consumers to customize appearance without patching components

---

## Demo Chrome Overfitting Analysis

### Single-consumer UI component directories (zero external usage)

Of 25 UI component directories in `/demo/@/components/ui/`, **19 have zero imports**:
```
alert-dialog (0)
alert (0)
aspect-ratio (0)
auto-form (0)
breadcrumb (0)
carousel (0)
chart-area (0)
chart-bar (0)
chart-donut (0)
chart-line (0)
navigation-menu (0)
pagination (0)
pin-input (0)
range-calendar (0)
resizable (0)
sonner (0)
table (0)
toast (0)
v-calendar (0)
```

**Verdict:** These are pure scaffolding from the shadcn-vue preset. Not migrated for any demo feature; recommend deleting or moving to a separate `_archived/` directory to reduce cognitive load on future developers.

### Custom component consumption analysis

| Component | Usage Count | Consumers | Verdict |
|-----------|-------------|-----------|---------|
| `CommandPalette.vue` | 0 | None (demo-only chrome) | Inline into EditorShell or remove |
| `ResponsiveSelect.vue` | 0 | None (orphaned responsive wrapper) | Inline as utility or remove |
| `CopyButton.vue` | 8 | TimingFunctionPanel, KeyframesEditor (animation-controls only) | Consolidated in animation-controls barrel |
| `CSSPasteDialog.vue` | 3 | KeyframesEditor only | Fold into keyframes component |
| `EditableLabel.vue` | 3 | AssetLayer, AssetPropertiesPanel (asset-manager only) | Fold into asset-manager |
| `AnimatedText.vue` | 5 | EasingSidebar only | Consolidate in easing demo utilities |

**Overfitting verdict:** 3 zero-consumer components (CommandPalette, ResponsiveSelect, Animated) are pure chrome. `CopyButton`, `CSSPasteDialog`, `EditableLabel` are single-domain utilities best refactored as private to their parent modules to clarify scope.

### Composable scope analysis

| Composable | Location | Usage Sites | Scope | Verdict |
|-----------|----------|-------------|-------|---------|
| `useAnimationGroupPlayback` | `animation-controls/composables/` | AnimationControlsGroup, App.vue (references only) | Tracks group playback state | **Remain unified** — core animation-controls logic, not demo-scoped |
| `useTransformState` | `matrix-editor/` | CubeScene, CubeApp, MatrixEditor | 3D transform sync + validation | **Remain separate** — matrix-editor domain-specific; not reusable outside 3D context |
| `useAssetManager` | `asset-manager/composables/` | AssetLayer, AssetPropertiesPanel | Layer/asset state management | **Remain unified** — encapsulates asset manager domain logic |
| `useEasingDemo` | `demo/easing/` | EasingSidebar, easing routes | Easing UI coordination | **Remain separate** — easing demo specific, not part of animation-controls |

**Verdict:** N-scope decision — these are tightly-scoped domain composables, not overfitted chrome. Retain structure per M.W1 Lane A decision (out-of-scope for this audit; referenced for traceability).

---

## Tallies

- **Drift findings:** 3 (shadow hardcoding, focus-ring gaps, prefers-reduced-motion omission)
- **One-consumer UI components:** 19/25 (76% overfitting—delete or archive)
- **Demo-chrome inlining candidates:** 3 (CommandPalette, ResponsiveSelect, Animated)
- **Glass-ui gaps surfaced:** 2 (focus-ring variant, prefers-reduced-motion utility)
- **Union candidates:** 1 (tab-trigger vocabulary)

---

## Recommendations (Summary)

1. **Immediate:** Delete/archive 19 zero-consumer UI directories; consolidate 3 single-domain utility components into their parent modules
2. **N6 proposal:** Extend Button variant API to include `focused` boolean; expose focus-ring state via CVA
3. **N7 proposal:** Add `.motion-safe` / `@motion-gate` CSS helper to gate custom keyframes on `prefers-reduced-motion`
4. **Documentation:** Promote `.tab-trigger-*` pattern to glass-ui as canonical tab-trigger surface variant
5. **Accessibility:** Audit all 5+ custom interactive elements for `:focus-visible`; backport focus-ring implementation to demo

---

**Audit signature:** N11 Lane d — 3 drift, 19 overfitted components, N-scope gaps identified for N6/N7 wave coordination.
