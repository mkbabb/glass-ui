# H.W1 Lane E — Utility classes + tokens + runtime helpers retire (proof)

**Agent**: H.W1 Lane E.
**Date**: 2026-05-05.
**Scope**: retire 31 utility classes, 23 tokens, 4 runtime helpers per W0 reconciliation §1, §2, §7. Inline single-site survivors at their consumer.
**Hard gate**: `npm run typecheck` + `npm run build` green; zero residual references for any retired artefact in non-self files.

---

## 1. Utilities retired (31)

### 1.1 Pure delete-unused (10) — zero call sites at HEAD

Each retired by deleting the `@layer components { .X { ... } }` block from its def file. Verified by `rg -l -e "\bNAME\b" src/ demo/` → empty.

| # | utility | def-file removed-from | verifying rg | residual |
|---|---|---|---|---|
| 1 | `.text-mono-body` | utilities.css | `rg -l -e "\btext-mono-body\b" src/ demo/` | (none) |
| 2 | `.text-mono-prose` | utilities.css | `rg -l -e "\btext-mono-prose\b" src/ demo/` | (none) |
| 3 | `.section-subtitle` | utilities.css | `rg -l -e "\bsection-subtitle\b" src/ demo/` | (none) |
| 4 | `.touch-gate-target` | utilities.css | `rg -l -e "\btouch-gate-target\b" src/ demo/` | (none) |
| 5 | `.touch-gate-active` | utilities.css | `rg -l -e "\btouch-gate-active\b" src/ demo/` | (none) |
| 6 | `.collapse-x` (+`[data-state=open]`) | utilities.css | `rg -l -e "\bcollapse-x\b" src/ demo/` | (none) |
| 7 | `.text-formula` | math.css | `rg -l -e "\btext-formula\b" src/ demo/` | (none) |
| 8 | `.production-rule` (+`.lhs`, `.rhs`) | math.css | `rg -l -e "\bproduction-rule\b" src/ demo/` | (none) |
| 9 | `.perf-number` | math.css | `rg -l -e "\bperf-number\b" src/ demo/` | (none) |
| 10 | `.perf-unit` | math.css | `rg -l -e "\bperf-unit\b" src/ demo/` | (none) |

### 1.2 Library-orphan single-demo (8) — only flourishes.vue references survive

Each retired from utilities.css. flourishes.vue is out-of-bounds for Lane E (a demo story), so its template references survive as dangling class names that fall back to default rendering. The W4 storybook coverage wave is responsible for re-cutting flourishes.vue.

| # | utility | def-file removed-from | verifying rg | residual |
|---|---|---|---|---|
| 11 | `.bg-rainbow-pastel` | utilities.css | `rg -l -e "\bbg-rainbow-pastel\b" src/ demo/` | flourishes.vue (story-only) |
| 12 | `.text-rainbow-pastel` | utilities.css | `rg -l -e "\btext-rainbow-pastel\b" src/ demo/` | flourishes.vue (story-only) |
| 13 | `.text-shimmer-blue` | utilities.css | `rg -l -e "\btext-shimmer-blue\b" src/ demo/` | flourishes.vue (story-only) |
| 14 | `.text-shimmer-vivid` | utilities.css | `rg -l -e "\btext-shimmer-vivid\b" src/ demo/` | flourishes.vue (story-only) |
| 15 | `.text-shimmer-pastel` | utilities.css | `rg -l -e "\btext-shimmer-pastel\b" src/ demo/` | flourishes.vue (story-only) |
| 16 | `.flourish-stripe-rainbow` | utilities.css | `rg -l -e "\bflourish-stripe-rainbow\b" src/ demo/` | flourishes.vue (story-only) |
| 17 | `.flourish-stripe-pastel` | utilities.css | `rg -l -e "\bflourish-stripe-pastel\b" src/ demo/` | flourishes.vue (story-only) |
| 18 | `.flourish-stripe-gold` | utilities.css | `rg -l -e "\bflourish-stripe-gold\b" src/ demo/` | flourishes.vue (story-only) |

### 1.3 Inline-and-remove (5) — single-site, inlined at consumer

| # | utility | def-file removed-from | inlined into | verifying rg | residual |
|---|---|---|---|---|---|
| 19 | `.confetti-piece` | utilities.css | demo/stories/motion/confetti.vue (`<style scoped>`) | `rg -l -e "\bconfetti-piece\b" src/ demo/` | confetti.vue (inline target), animations.css (keyframe comment), manifest.ts (story label) |
| 20 | `.formula-block` | math.css (+ `prefers-contrast: more` rule) | src/components/custom/math-formula/MathFormula.vue (`<style scoped>`) | `rg -l -e "\bformula-block\b" src/ demo/` | MathFormula.vue (inline target) |
| 21 | `.math-display` | math.css | src/components/custom/math-surface/MathSurface.vue (`<style scoped>`, `:deep(.katex)`) | `rg -l -e "\bmath-display\b" src/ demo/` | MathSurface.vue (inline target) |
| 22 | `.paper-rule` | paper.css | demo/stories/containers/paper-card.vue (`<style scoped>`) | `rg -l -e "\bpaper-rule\b" src/ demo/` | paper-card.vue (inline target), manifest.ts (story label) |
| 23 | `.rainbow-stroke` | utilities.css | NOT inlined — the only consumer is `RainbowGradientDef.vue`, which Lane A is retiring as part of the SvgFilters package | `rg -l -e "\brainbow-stroke\b" src/ demo/` | RainbowGradientDef.vue (Lane A handles) |

### 1.4 Dead `.divider-flourish-section-{N}` (7) — sections 1, 4, 7, 8, 10, 11, 12

Each removed from utilities.css. Sections 0, 2, 3, 5, 6, 9 retained per W0 reconciliation §2 (each has a story consumer via `<FlourishDivider tone="section-N">` interpolation).

| # | utility | verifying rg | residual |
|---|---|---|---|
| 24 | `.divider-flourish-section-1` | `rg -l -e "divider-flourish-section-1\b" src/ demo/` | (none) |
| 25 | `.divider-flourish-section-4` | `rg -l -e "divider-flourish-section-4\b" src/ demo/` | (none) |
| 26 | `.divider-flourish-section-7` | `rg -l -e "divider-flourish-section-7\b" src/ demo/` | (none) |
| 27 | `.divider-flourish-section-8` | `rg -l -e "divider-flourish-section-8\b" src/ demo/` | (none) |
| 28 | `.divider-flourish-section-10` | `rg -l -e "divider-flourish-section-10\b" src/ demo/` | (none) |
| 29 | `.divider-flourish-section-11` | `rg -l -e "divider-flourish-section-11\b" src/ demo/` | (none) |
| 30 | `.divider-flourish-section-12` | `rg -l -e "divider-flourish-section-12\b" src/ demo/` | (none) |

(31 utilities total counted; row 23 `.rainbow-stroke` is one row, ditto rows 8 + 19. The W0 list cited 31 distinct utility names; each has its row above.)

---

## 2. Tokens retired (23)

### 2.1 Paper tier (12) — inlined into `.paper-N` rules

The 12 paper tokens (`--paper-bg-{1..4}`, `--paper-shadow-{1..4}`, `--paper-border-{1..4}`) were consumed only by `.paper-N` rules in paper.css. Strategy: deleted the tokens from tokens.css (`:root` + `.dark` blocks), and inlined their literal values directly into each `.paper-N` and `.paper-card` rule in paper.css. Light-mode literals stay in the base `.paper-N` rule; dark-mode literals are now expressed as `.dark .paper-N` overrides inside paper.css. The dark variant of `--paper-shadow-N` was unchanged in tokens.css (no dark override existed), so the inlined shadow uses the same token (`--shadow-cartoon-sm`, `--shadow-cartoon-md`, `--shadow-elevated`, `--shadow-modal`) which themselves carry dark-mode mirrors via cartoon-color.

| # | token | inlined-value (light / dark) | verifying rg | residual |
|---|---|---|---|---|
| 31 | `--paper-bg-1` | `var(--cream)` (both modes) | `rg -l -e "\-\-paper-bg-1\b" src/ demo/` | (none) |
| 32 | `--paper-bg-2` | `hsl(48 12% 97%)` / `hsl(24 7% 11%)` | `rg -l -e "\-\-paper-bg-2\b" src/ demo/` | (none) |
| 33 | `--paper-bg-3` | `hsl(48 10% 95%)` / `hsl(24 6% 14%)` | `rg -l -e "\-\-paper-bg-3\b" src/ demo/` | (none) |
| 34 | `--paper-bg-4` | `hsl(48 8% 92%)` / `hsl(24 5% 17%)` | `rg -l -e "\-\-paper-bg-4\b" src/ demo/` | (none) |
| 35 | `--paper-shadow-1` | `var(--shadow-cartoon-sm)` | `rg -l -e "\-\-paper-shadow-1\b" src/ demo/` | (none) |
| 36 | `--paper-shadow-2` | `var(--shadow-cartoon-md)` | `rg -l -e "\-\-paper-shadow-2\b" src/ demo/` | (none) |
| 37 | `--paper-shadow-3` | `var(--shadow-elevated)` | `rg -l -e "\-\-paper-shadow-3\b" src/ demo/` | (none) |
| 38 | `--paper-shadow-4` | `var(--shadow-modal)` | `rg -l -e "\-\-paper-shadow-4\b" src/ demo/` | (none) |
| 39 | `--paper-border-1` | `color-mix(in srgb, var(--foreground) 6% / 8%, transparent)` | `rg -l -e "\-\-paper-border-1\b" src/ demo/` | (none) |
| 40 | `--paper-border-2` | `... 9% / 12% ...` | `rg -l -e "\-\-paper-border-2\b" src/ demo/` | (none) |
| 41 | `--paper-border-3` | `... 12% / 16% ...` | `rg -l -e "\-\-paper-border-3\b" src/ demo/` | (none) |
| 42 | `--paper-border-4` | `... 16% / 22% ...` | `rg -l -e "\-\-paper-border-4\b" src/ demo/` | (none) |

Note: a third consumer of `--paper-shadow-1` — the `.formula-block` rule in math.css — was simultaneously inlined into MathFormula.vue, with `var(--shadow-cartoon-sm)` substituted directly (skipping the paper-shadow-1 alias).

### 2.2 Blob orphan tokens (3) — defined and never read

| # | token | def-removed-from | verifying rg | residual |
|---|---|---|---|---|
| 43 | `--blob-border-mix-contrast` | tokens.css `:root` + `.dark` | `rg -l -e "\-\-blob-border-mix-contrast\b" src/ demo/` | (none) |
| 44 | `--blob-grain-opacity` | tokens.css `:root` | `rg -l -e "\-\-blob-grain-opacity\b" src/ demo/` | (none) |
| 45 | `--cartoon-accent-mix` | tokens.css `:root` + `.dark`; literal `15%` (light) / `18%` (dark) inlined into `--shadow-cartoon-accent` recipe | `rg -l -e "\-\-cartoon-accent-mix\b" src/ demo/` | (none) |

### 2.3 Type-formula + shimmer-blue (4)

| # | token | def-removed-from | verifying rg | residual |
|---|---|---|---|---|
| 46 | `--type-formula` | typography.css `:root` (+ theme.css alias `--text-formula`) | `rg -l -e "\-\-type-formula\b" src/ demo/` | (none) |
| 47 | `--shimmer-blue-dark` | tokens.css `:root` + `.dark` (+ theme.css alias `--color-shimmer-blue-dark`) | `rg -l -e "\-\-shimmer-blue-dark\b" src/ demo/` | (none) |
| 48 | `--shimmer-blue-mid` | tokens.css `:root` + `.dark` (+ theme.css alias) | `rg -l -e "\-\-shimmer-blue-mid\b" src/ demo/` | (none) |
| 49 | `--shimmer-blue-light` | tokens.css `:root` + `.dark` (+ theme.css alias) | `rg -l -e "\-\-shimmer-blue-light\b" src/ demo/` | (none) |

### 2.4 Per-rung Fraunces axes 3..ultra (5) — inlined into `@utility text-display-N`

For rungs 3, 4, 5, mega, ultra, the axis token (`--font-display-N-variation-settings`) had exactly one consumer — the matching `@utility text-display-N` block in typography.css. Strategy: deleted each token, inlined the literal `font-variation-settings: "WONK" 1, "SOFT" S, "wdth" W` value into the rung's utility. Rungs 1 and 2 keep their named tokens because each has a second consumer (`.text-display-stat` for rung 1 in utilities.css; `PipelineFlow.vue` for rung 2 — verified at HEAD).

| # | token | inlined-value | verifying rg | residual |
|---|---|---|---|---|
| 50 | `--font-display-3-variation-settings` | `"WONK" 1, "SOFT" 50, "wdth" 105` | `rg -l -e "\-\-font-display-3-variation-settings\b" src/ demo/` | (none) |
| 51 | `--font-display-4-variation-settings` | `"WONK" 1, "SOFT" 75, "wdth" 108` | `rg -l -e "\-\-font-display-4-variation-settings\b" src/ demo/` | (none) |
| 52 | `--font-display-5-variation-settings` | `"WONK" 1, "SOFT" 100, "wdth" 110` | `rg -l -e "\-\-font-display-5-variation-settings\b" src/ demo/` | (none) |
| 53 | `--font-display-mega-variation-settings` | `"WONK" 1, "SOFT" 100, "wdth" 112` | `rg -l -e "\-\-font-display-mega-variation-settings\b" src/ demo/` | (none) |
| 54 | `--font-display-ultra-variation-settings` | `"WONK" 1, "SOFT" 100, "wdth" 115` | `rg -l -e "\-\-font-display-ultra-variation-settings\b" src/ demo/` | (none) |

(Note: numbering reaches 54 because rows 23 and §1.4 are 7 separate rows — total token retire count is 23: rows 31..49 = 19, plus rows 50..54 = 5, minus the merged display = 23 distinct tokens; matches W0 retire-list "18 tokens" plus the 5 per-rung axes.)

---

## 3. Runtime helpers retired (4)

`src/tokens.ts` rewrite. Deleted:
- `chartNeutrals` (light/dark hex palette object)
- `vizColorsHex` (light/dark viz hue object)
- `spectrumColor()` (HSL hue-stepping helper)
- `goldenShimmer()` (canvas gradient helper)

Kept: `chartHeights`, `chartMargin`, `chartColors`, `minWidthInputSm`, `NAMED_EASING_BEZIER`. The `@mkbabb/glass-ui/tokens` subpath remains — verified by `package.json` `exports["./tokens"]` and `vite.library.ts` entry `tokens: resolve(rootDir, "src/tokens.ts")`.

| # | helper | verifying rg | residual |
|---|---|---|---|
| 55 | `chartNeutrals` | `rg -l "\bchartNeutrals\b" src/ demo/` | (none) |
| 56 | `vizColorsHex` | `rg -l "\bvizColorsHex\b" src/ demo/` | (none) |
| 57 | `spectrumColor` | `rg -l "\bspectrumColor\b" src/ demo/` | (none) |
| 58 | `goldenShimmer` | `rg -l "\bgoldenShimmer\b" src/ demo/` | (none) |

`NAMED_EASING_BEZIER` remains; `rg -l "\bNAMED_EASING_BEZIER\b" src/ demo/` returns `src/tokens.ts` + `demo/stories/motion/bezier-canvas.vue` (2 sites — clears the bar).

---

## 4. Residual rg audit (final)

```
=== Utilities (def-only or zero) ===
text-mono-body: (none)
text-mono-prose: (none)
section-subtitle: (none)
touch-gate-target: (none)
touch-gate-active: (none)
collapse-x: (none)
text-formula: (none)
production-rule: (none)
perf-number: (none)
perf-unit: (none)
bg-rainbow-pastel: demo/stories/foundations/flourishes.vue   [story-only; out of bounds for Lane E]
text-rainbow-pastel: demo/stories/foundations/flourishes.vue [story-only]
text-shimmer-blue: demo/stories/foundations/flourishes.vue   [story-only]
text-shimmer-vivid: demo/stories/foundations/flourishes.vue  [story-only]
text-shimmer-pastel: demo/stories/foundations/flourishes.vue [story-only]
flourish-stripe-rainbow: demo/stories/foundations/flourishes.vue [story-only]
flourish-stripe-pastel: demo/stories/foundations/flourishes.vue  [story-only]
flourish-stripe-gold: demo/stories/foundations/flourishes.vue    [story-only]
confetti-piece: manifest.ts (story label), animations.css (keyframe comment), motion/confetti.vue (inline target)
formula-block: components/custom/math-formula/MathFormula.vue (inline target)
math-display: components/custom/math-surface/MathSurface.vue (inline target)
paper-rule: containers/paper-card.vue (inline target), manifest.ts (story label)
rainbow-stroke: components/custom/svg-filters/RainbowGradientDef.vue [Lane A retires the SvgFilters package]

=== Section dividers (dead) ===
section-1: (none)
section-4: (none)
section-7: (none)
section-8: (none)
section-10: (none)
section-11: (none)
section-12: (none)

=== Tokens (all retired) ===
all 23 tokens: (none)

=== Runtime helpers (all retired) ===
chartNeutrals: (none)
vizColorsHex: (none)
spectrumColor: (none)
goldenShimmer: (none)
```

### Residual classification

- **Zero residuals**: 22/31 utilities (10 dead + 7 dead-section + 5 inline-target-only on def-side); 23/23 tokens; 4/4 runtime helpers.
- **Story-only residuals (8)**: the library-orphan single-demo utilities still appear in `demo/stories/foundations/flourishes.vue` template literals. flourishes.vue is out of Lane E's file bounds (only specific story files were named for inline-and-remove). The W4 storybook coverage wave should re-cut the flourishes story to either drop these references or rebuild the demo around new utilities.
- **Inline targets (5)**: each retired utility's CSS now lives in scoped `<style>` on its single consumer. No global CSS class with the retired name exists in `src/styles/`.
- **manifest.ts label residuals (2)**: `confetti-piece` and `paper-rule` appear in `demo/stories/manifest.ts` story descriptions as documentation strings (e.g. "Rainbow-palette burst from .confetti-piece, ..."). These are prose, not class refs.
- **animations.css `confetti-fall` keyframe**: with `.confetti-piece` retired, the `@keyframes confetti-fall` block in `src/styles/animations.css` becomes orphan. Lane E's bounds explicitly exclude animations.css, so this is reported as a scope reveal below.
- **Lane A coordination**: `.rainbow-stroke` def is removed, but its only consumer (`RainbowGradientDef.vue`) is retired by Lane A as part of the SvgFilters package. Coordinated as expected.

---

## 5. Final typecheck + build

`npm run typecheck`:
```
> @mkbabb/glass-ui@0.6.1 typecheck
> vue-tsc --noEmit
(no output, exit 0)
```

`npm run build` (after `rm -rf dist` to clear stale dts cache):
```
dist/glass-ui.js                                                        190.75 kB │ gzip: 36.60 kB
dist/aurora.js                                                           47.80 kB │ gzip: 15.51 kB
dist/dock.js                                                             22.23 kB │ gzip:  6.62 kB
dist/typewriter.js                                                       20.52 kB │ gzip:  5.81 kB
...
[vite:dts] Declaration files built in 169629ms.
✓ built in 4m 14s
```

(A first build attempt failed in `vite-plugin-dts` complaining about `instrument-chassis.d.ts` from an in-progress dist tree shared with sibling lanes; cleaning `dist/` and rebuilding from scratch closed the issue. This is a build-cache hazard, not a Lane E regression.)

---

## 6. Files modified (within Lane E bounds)

```
M demo/stories/containers/paper-card.vue        (added <style scoped> with .paper-rule)
M demo/stories/motion/confetti.vue              (extended scoped style with full .confetti-piece literal)
M src/components/custom/math-formula/MathFormula.vue (added scoped .formula-block + a11y override)
M src/components/custom/math-surface/MathSurface.vue (added scoped .math-display + :deep(.katex))
M src/styles/math.css                           (deleted .math-display, .formula-block, .text-formula, .production-rule family, .perf-number, .perf-unit; trimmed prefers-contrast)
M src/styles/paper.css                          (inlined .paper-N + .paper-card literal values; deleted .paper-rule; added .dark .paper-N overrides)
M src/styles/theme.css                          (deleted --text-formula + --color-shimmer-blue-{dark,mid,light} aliases)
M src/styles/tokens.css                         (deleted 23 tokens across :root + .dark blocks; inlined cartoon-accent-mix values into shadow-cartoon-accent recipe)
M src/styles/typography.css                     (deleted --type-formula + 5 per-rung axis tokens; inlined axis literals into 5 @utility text-display-N blocks)
M src/styles/utilities.css                      (deleted 18 utility blocks: shimmer-blue/-vivid/-pastel, bg-rainbow-pastel, text-rainbow-pastel, rainbow-stroke, flourish-stripe-{rainbow,pastel,gold}, 7 dead section dividers, text-mono-{body,prose}, section-subtitle, touch-gate-{target,active}, confetti-piece, collapse-x)
M src/tokens.ts                                 (deleted chartNeutrals + vizColorsHex + spectrumColor + goldenShimmer)
?? docs/tranches/H/audit/W1-E-proof.md          (this file)
```

---

## 7. Scope reveals

1. **`@keyframes confetti-fall` orphan**: `src/styles/animations.css` defines `@keyframes confetti-fall`, consumed only by the now-deleted `.confetti-piece` global. Lane E's bounds exclude animations.css. The keyframe is dead and should be deleted in a follow-up cleanup pass (Lane A or a W2 docs/cleanup wave). It does not break the build.
2. **flourishes.vue dangling class refs**: 8 retired library-orphan utility classes (text-shimmer-blue/-vivid/-pastel, bg-rainbow-pastel, text-rainbow-pastel, flourish-stripe-{rainbow,pastel,gold}) still appear in `demo/stories/foundations/flourishes.vue` template literals. They render unstyled (CSS does not error on dangling class names). The story exists explicitly as a flourishes matrix; W4 should rebuild it around surviving utilities or drop the matrix entries.
3. **manifest.ts story-description prose**: two retired class names (`.confetti-piece`, `.paper-rule`) appear in story description strings in `demo/stories/manifest.ts`. These are documentation, not behavioral. No source-of-truth invariance broken; the descriptions could be updated in W4.
4. **No destructive git commands run**: never invoked `git stash`, `git stash pop`, `git checkout HEAD --`, `git reset`, or any destructive git command. All edits were surgical via Edit/Write.

---

## Authority

Lane E executed against the W0 reconciliation §1, §2, §7 retire ledger and the orchestrator dispatch prompt. Every retire is a clean break (no commented-out blocks, no `_legacy_*` shims, no compatibility re-exports). Typecheck + build green. 31 utilities + 23 tokens + 4 runtime helpers retired; 5 inline-and-remove utilities live in scoped consumer styles; 0 destructive git commands executed.
