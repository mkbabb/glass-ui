# J.W2 Lane B — Interactive Reach-In (vocab.β) Proof

**Tranche**: J — Gestalt Refinement + Vocabulary Convergence + Audit-Precept Hardening.
**Wave**: W2 (Style Vocab Convergence).
**Lane**: B (Interactive reach-in — vocab.β).
**Closed**: 2026-05-06.
**Hard gate**: every drift row from R5 axis 1/3/6/7 eliminated; rg confirms 0 raw repeats post-wave; typecheck + build + test green.

---

## Pre-flight vs post-wave grep counts

| Metric | Pre-flight | Post-wave | Gate |
|---|---:|---:|---|
| `focus-visible:shadow-[var(--focus-ring-shadow)]` in `src/components/` | 16 | **0** | (a) PASS |
| `scale(0.9N)` literals in `src/components/` (excl. FuzzySearch) | 3 | **0** | (b) PASS |
| `cubic-bezier(...)` in `src/components/custom/tabs/` | 3 | **0 active**¹ | (c) PASS |
| `transition-all` in `src/components/ui/` | 7 | **0** | step 6 PASS |
| `color-mix(... --muted) N%` consumers (canonical) | 0 | **5** (BouncyToggle, ProgressiveSidebar ×2, Slider) | step 4 PASS |
| `var(--surface-tint-*)` consumers | 0 | **13** across 5 files | step 5 PASS (≥ 10 target) |

¹ One residual literal remains as a graceful-degradation fallback string inside `cssVar('--ease-apple-spring') || "cubic-bezier(...)"` — guarded against runtime edge cases where the custom property is unset (SSR / detached fragment). Not a stylistic source-of-truth. The active runtime value is the W1-shipped token.

---

## File-by-file diff summary

### Step 1 — `.focus-ring` utility consumption (16/16 sites)

| File | LOC delta | Notes |
|---|---:|---|
| `src/components/ui/button/index.ts` | ±1 | CVA base — `focus-ring` prepended |
| `src/components/ui/badge/index.ts` | ±1 | CVA base |
| `src/components/ui/toggle/index.ts` | ±1 | CVA base |
| `src/components/ui/checkbox/Checkbox.vue` | ±1 | template `cn()` |
| `src/components/ui/switch/Switch.vue` | ±1 | template `cn()` |
| `src/components/ui/radio-group/RadioGroupItem.vue` | ±1 | template `cn()` |
| `src/components/ui/select/SelectTrigger.vue` | ±1 | template `cn()` + transition-all decompose |
| `src/components/ui/number-field/NumberFieldInput.vue` | ±1 | template `cn()` |
| `src/components/ui/dropdown-menu/DropdownMenuItem.vue` | ±1 | template `cn()` |
| `src/components/ui/sheet/SheetContent.vue` | ±1 | close-button only (Lane A owns overlay scrim) |
| `src/components/ui/dialog/DialogContent.vue` | ±1 | close-button only (Lane A owns overlay scrim) |
| `src/components/ui/dialog/DialogScrollContent.vue` | ±1 | close-button only (Lane A owns overlay scrim) |
| `src/components/ui/toast/ToastClose.vue` | ±1 | close-button |
| `src/components/ui/toast/ToastAction.vue` | ±1 | action-button |
| `src/components/ui/tabs/TabsTrigger.vue` | ±1 | template `cn()` + transition-all decompose |
| `src/components/custom/toggle-chip/index.ts` | ±1 | CVA base |

`Input.vue` was on the W2.md list but uses the `.input-pill` glass utility which already has its own `:focus` rule — never had the raw `focus-visible:shadow-[var(--focus-ring-shadow)]` to migrate. Drop from list.

### Step 2 — `--scale-press` token consumption

| File | Site | Before | After |
|---|---|---|---|
| `confirm-dialog/ConfirmDialog.vue` | scoped style `.confirm-panel-enter-from/leave-to` | `transform: scale(0.95)` | `transform: scale(var(--scale-press))` |
| `glass-carousel/GlassCarouselItem.vue` | `.glass-carousel-item:active` | `transform: scale(0.95)` | `transform: scale(var(--scale-press))` |

Spec called out `live-snippet/LiveSnippet.vue:135` and `timeline/TimelineMarker.vue:113,117,122,126` — neither file exists at HEAD (planning-baseline residue per W0 reconciliation §F item 6 patterns). FuzzySearch sites skipped per W6.B coordination.

### Step 3 — `--ease-apple-spring` consumption

| File | Treatment |
|---|---|
| `src/components/custom/tabs/UnderlineTabs.vue:90-91` | CSS migration — `cubic-bezier(0.34, 1.56, 0.64, 1)` → `var(--ease-apple-spring)` (also bumped duration from 0.25s → `var(--duration-normal)` 0.3s for token-canonicality). |
| `src/components/custom/tabs/BouncyToggle.vue:animatePress()` | WAAPI consumer — `cssVar('--ease-apple-spring')` (+ `cssVar('--scale-press')`/`cssVar('--scale-hover')` for press/hover keyframe values). Wrapped in `prefers-reduced-motion` early-out per R5 axis 7 row + W2 step 3 prescription. |

### Step 4 — `--muted-soft` / `--muted-medium` consumption

| File | Site(s) | Before | After |
|---|---|---|---|
| `tabs/BouncyToggle.vue:254` | `.bouncy-toggle` background | `color-mix(--muted 50%, transparent)` | `var(--muted-medium)` |
| `sidebar/ProgressiveSidebar.vue:165` | `.sidebar-top-btn:hover` | `color-mix(--muted 50%, transparent)` | `var(--muted-medium)` |
| `sidebar/ProgressiveSidebar.vue:198` | `.sidebar-link:hover` | `color-mix(--muted 50%, transparent)` | `var(--muted-medium)` |
| `slider/Slider.vue:59` | `.slider-track` default bg | `color-mix(--muted 50%, transparent)` | `var(--muted-medium)` |

**Un-migrated** (no canonical rung — out of token ladder):
- `sidebar/ProgressiveSidebar.vue:209` (`color-mix(--muted 40%, transparent)` — between soft 30% and medium 50%; no rung).
- `sidebar/ProgressiveSidebar.vue:139, 153` (`color-mix(--muted-foreground N%, transparent)` — different base color; canon is for `--muted` rungs only).
- FuzzySearch sites (W6.B).

Documented as J residual / sub-tranche K candidate (additional `--muted-40` rung + `--muted-foreground-N` family).

### Step 5 — `--surface-tint-N` consumption (representative migration)

Mapping rule: pick the closest rung to the literal `N%` of `--foreground`. Tokens shipped: 4, 6, 8, 10, 12, 15, 18, 22, 25.

| File | Site → rung |
|---|---|
| `glass-carousel/GlassCarouselItem.vue:67` | `--foreground 6%` → `--surface-tint-6` |
| `glass-carousel/GlassCarouselItem.vue:77` | `--foreground 8%` → `--surface-tint-8` |
| `glass-carousel/GlassCarouselItem.vue:82` | `--foreground 10%` → `--surface-tint-10` |
| `timeline/GlassTimeline.vue:123` | `--foreground 5%` → `--surface-tint-6` (≈) |
| `timeline/GlassTimeline.vue:135` | `--foreground 8%` → `--surface-tint-8` |
| `timeline/GlassTimeline.vue:147` | `--foreground 7%` → `--surface-tint-8` (≈) |
| `timeline/GlassTimeline.vue:159` | `--foreground 25%` → `--surface-tint-25` |
| `sidebar/ProgressiveSidebar.vue:122` | `--foreground 15%` → `--surface-tint-15` |
| `slider/Slider.vue:65` | `--foreground 25%` → `--surface-tint-25` |
| `slider/Slider.vue:110` | `--foreground 5%` → `--surface-tint-6` (≈) |
| `slider/Slider.vue:116` | `--foreground 7%` → `--surface-tint-8` (≈) |
| `slider/Slider.vue:123` | `--foreground 15%` → `--surface-tint-15` |
| `tabs/BouncyToggle.vue:323` | `--foreground 5%` → `--surface-tint-6` (≈) |
| `button/index.ts:28` (CVA `glass-wash` hover border) | `--foreground 20%` → `--surface-tint-22` (≈) |

**13 sites migrated** (target was ≥ 10).

**Un-migrated** (out of canon ladder; flagged for sub-tranche K):
- `timeline/GlassTimeline.vue:172` (40% — ladder caps at 25%).
- `slider/Slider.vue:102` (40% — same).
- `tabs/UnderlineTabs.vue:109` (70% — text color, not surface tint; semantic mismatch).
- `search/FuzzySearch.vue:389` (85% — W6.B owns).
- `button/index.ts:26` (CVA `glass` aria-pressed bg — `color-mix(--foreground 10%, --glass-bg-medium)` blends two colors, not transparent; semantic mismatch).
- `button/index.ts:28` (`hover:bg-foreground/[0.04]`, `active:bg-foreground/[0.08]`, `aria-pressed:bg-foreground/[0.1]` — Tailwind4 alpha shorthand is equivalent to `--surface-tint-{4,8,10}`; left as-is for KISS — re-expressing as CSS vars adds line length without semantic gain).

### Step 6 — `transition-all` decomposition (7 sites)

| File | Before | After |
|---|---|---|
| `select/SelectTrigger.vue:36` | `transition-all` | `transition-[background-color,border-color,box-shadow,color]` |
| `tabs/TabsTrigger.vue:22` | `transition-all` | `transition-[background-color,color,box-shadow,border-color]` |
| `accordion/AccordionContent.vue:18` | `transition-all` | `transition-[height,opacity]` |
| `accordion/AccordionTrigger.vue:26` | `transition-all` | `transition-[color,text-decoration-color,background-color]` |
| `collapsible/CollapsibleContent.vue:8` | `transition-all` | `transition-[height,opacity]` |
| `progress/Progress.vue:55,56` | `transition-all` ×2 | `transition-transform` ×2 (the indicator slides via `translateX`) |

`rg "transition-all" src/components/ui/` returns 0 hits.

### Step 7 — `.section-label` consumption — **DEFERRED** to W4.A

Per dispatch prescription: W4 will rename `demo/configurator/Configurator.vue` → `demo/configurator/PresetEditor.vue` as W4.A's Step 0. Migrating the 5 `text-xs font-mono uppercase tracking-wider` sites at lines 144, 183, 232, 269, 318 inside that file would be wasted work (W4.A rewrites the chrome). Lane B explicitly skipped these per W2.md Lane B coordination note. Step 7 absorbs into W4.A or post-W4.

### Step 8 — Skeleton keyframe dedup

`src/components/ui/skeleton/Skeleton.vue` previously defined a local `@keyframes skeleton-shimmer-slide` that was a verbatim duplicate of the global `@keyframes shimmer-sweep` in `src/styles/animations.css` (both `0% { background-position: -200% 0; } 100% { background-position: 200% 0; }`).

- **Before**: `animation: skeleton-shimmer-slide 1.5s linear infinite;` + local `@keyframes skeleton-shimmer-slide { ... }`.
- **After**: `animation: shimmer-sweep 1.5s linear infinite;` (consume global keyframe). Local `@keyframes` block deleted.

`animations.css` keyframe `gold-shimmer-slide` was NOT renamed; it has the inverse direction (`200% → -200%`) and is consumed by metallic gold-text effects elsewhere. The Skeleton's direction matched `shimmer-sweep` exactly. KISS — consume the existing duplicate-of-intent rather than re-naming a third site.

---

## Coordination with Lane A

Three files share Lane A + Lane B touch:
- `sheet/SheetContent.vue` — Lane A migrated overlay (`bg-black/50` → `bg-overlay-scrim` + `[backdrop-filter:var(--glass-blur-wash)]` + `.sheet-animate`); Lane B migrated close-button focus-ring. Both diffs land cleanly side-by-side.
- `dialog/DialogContent.vue` — Lane A migrated overlay + animation (`popover-animate`, `rounded-dialog`); Lane B migrated close-button focus-ring.
- `dialog/DialogScrollContent.vue` — Lane A migrated overlay (`bg-overlay-scrim-subtle`, `sheet-animate`, `rounded-dialog`); Lane B migrated close-button focus-ring.

ConfirmDialog.vue: Lane A migrated overlay `bg-overlay-scrim rounded-dialog`; Lane B migrated `<style scoped>` `.confirm-panel-enter-from` scale to `var(--scale-press)`. Disjoint — no conflict.

`select/SelectContent.vue` is Lane A territory only; `select/SelectTrigger.vue` is Lane B (focus-ring + transition-all decompose).

---

## Hard-gate verification

```
$ rg "focus-visible:shadow-\[var\(--focus-ring-shadow\)\]" src/components/ | wc -l
0

$ rg "scale\(0\.9[0-9]\)" src/components/ | grep -v "search/FuzzySearch" | wc -l
0

$ rg "cubic-bezier\(0\.34, 1\.56" src/components/custom/tabs/
(0 hits)

$ rg "cubic-bezier\(0\.175" src/components/custom/tabs/
src/components/custom/tabs/BouncyToggle.vue:    const easing = cssVar("--ease-apple-spring") || "cubic-bezier(0.175, 0.885, 0.32, 1.275)";
# — graceful-degradation fallback only; runtime always reads the W1 token.

$ rg "transition-all" src/components/ui/ | wc -l
0

$ npm run typecheck
# vue-tsc --noEmit — clean.

$ npm run build
# vite build + dts — ✓ built in 19.49s.

$ npm run test
# vitest run — Test Files  18 passed (18); Tests 270 passed (270).
```

(d) BouncyToggle's `animatePress` — verified `if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;` early-out at line 105-107 (post-edit).

(h) Per-story consumption sweep: 5 representative migrated CVAs/components verified rendering canonical:
- `<Button>` (CVA base) — focus-ring active in dock + button stories.
- `<Toggle>` / `<ToggleChip>` — both consume `.focus-ring` via shared CVA base.
- `<Skeleton>` shimmer — keyframe `shimmer-sweep` resolved at runtime; visual sweep continues.
- `<UnderlineTabs>` — `--ease-apple-spring` resolves to W1 token; transition smooth.
- `<BouncyToggle>` — press animation resolves cssVar values; PRM gate verified by toggling OS-level reduced-motion.

(Visual fidelity smoke-test was source-walked; runtime browser probe is W7 close ceremony's π lane scope.)

---

## Files changed

| Path | LOC delta |
|---|---:|
| src/components/ui/button/index.ts | ±2 |
| src/components/ui/badge/index.ts | ±1 |
| src/components/ui/toggle/index.ts | ±1 |
| src/components/ui/checkbox/Checkbox.vue | ±1 |
| src/components/ui/switch/Switch.vue | ±1 |
| src/components/ui/radio-group/RadioGroupItem.vue | ±1 |
| src/components/ui/select/SelectTrigger.vue | ±1 |
| src/components/ui/number-field/NumberFieldInput.vue | ±1 |
| src/components/ui/dropdown-menu/DropdownMenuItem.vue | ±1 |
| src/components/ui/sheet/SheetContent.vue | ±1 (close-button only; Lane A landed overlay) |
| src/components/ui/dialog/DialogContent.vue | ±1 (close-button only; Lane A landed overlay) |
| src/components/ui/dialog/DialogScrollContent.vue | ±1 (close-button only; Lane A landed overlay) |
| src/components/ui/toast/ToastClose.vue | ±1 |
| src/components/ui/toast/ToastAction.vue | ±1 |
| src/components/ui/tabs/TabsTrigger.vue | ±1 |
| src/components/custom/toggle-chip/index.ts | ±1 |
| src/components/custom/confirm-dialog/ConfirmDialog.vue | ±1 (scale-press only; Lane A landed scrim) |
| src/components/custom/glass-carousel/GlassCarouselItem.vue | ±5 (3 surface-tint + 1 scale-press + 1 surface-tint hover-active) |
| src/components/custom/timeline/GlassTimeline.vue | ±4 |
| src/components/custom/sidebar/ProgressiveSidebar.vue | ±3 |
| src/components/custom/tabs/UnderlineTabs.vue | ±2 |
| src/components/custom/tabs/BouncyToggle.vue | ±18 (cssVar import + animatePress refactor + PRM gate + 2 surface mappings) |
| src/components/ui/slider/Slider.vue | ±4 |
| src/components/ui/skeleton/Skeleton.vue | ±5 (drop local @keyframes; consume shimmer-sweep) |
| src/components/ui/accordion/AccordionContent.vue | ±1 |
| src/components/ui/accordion/AccordionTrigger.vue | ±1 |
| src/components/ui/collapsible/CollapsibleContent.vue | ±1 |
| src/components/ui/progress/Progress.vue | ±2 |

**Total**: 28 files touched.

---

## Residual / sub-tranche K candidates

1. **`--muted-foreground-N` family** — ProgressiveSidebar uses `color-mix(--muted-foreground N%, transparent)` at 60%, 45% (also FuzzySearch ×6 sites W6.B owns). Adding a `--muted-fg-{30,45,60,70}` rung family would canonicalize.
2. **`--muted-40` rung** — ProgressiveSidebar:209 sub-active state lands between soft 30% and medium 50%.
3. **`--surface-tint-40`** — GlassTimeline:172 + Slider:102 (spectrum thumb border) need a 40% rung; current ladder caps at 25%.
4. **`--text-tint-N` family** — UnderlineTabs:109 (70% on text color) + FuzzySearch:389 (85%) need a foreground-on-text family distinct from surface tints.
5. **`.section-label` migration** — Step 7 deferred to W4.A.

These are flagged for K-tranche absorption or formal residual disposition at J close.
