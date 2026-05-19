# Q.W3 Lane F — Typography `:root` literal retire (Q-cos-2)

**Date**: 2026-05-18
**Author**: Q-tranche agent — W3 Lane F
**Status**: COMPLETE

---

## Charter

Per W3.md Lane F + Qη §1.A: Commit `6ce14e5` (L.W1, "feat(glass-ui/canon): land W1 root tokens,
dock density, and package contract") introduced a `:root` block in `src/styles/typography.css`
that declared `--font-serif`, `--font-display`, and `--font-mono` as **literal** font-stack
values. These are redundant with — and actually shadow — the tokens.css→theme.css bridge already
in place. Retire the three literals. Verify the cascade routes correctly without them.

Scope: touch only `src/styles/typography.css`.

---

## Git-history trace

### When `6ce14e5` added the literals

```
commit 6ce14e5 (L.W1)
feat(glass-ui/canon): land W1 root tokens, dock density, and package contract
```

Diff excerpt (typography.css at that commit):

```diff
 :root {
     /* Font stacks */
     --font-serif: "Computer Modern Serif", "Latin Modern Roman", "CMU Serif", Georgia, serif;
-    /* Independent system sans stack; ... */
-    --font-sans: "Helvetica Neue", "Arial Nova", Arial, system-ui, sans-serif;
+    --font-brand-sans: "Helvetica Neue", "Arial Nova", Arial, system-ui, sans-serif;
+    --font-sans: var(--font-brand-sans);
     --font-display: "Fraunces", Georgia, serif;
     --font-mono: "Fira Code", "Fira Mono", monospace;
+    --font-display-variation-settings: "WONK" 1, "SOFT" 0;
+    --font-display-weight: 400;
```

`--font-serif`, `--font-display`, `--font-mono` were already present before `6ce14e5`; the commit
preserved them as literals while also adding the new `--font-brand-sans` / variation-settings /
display-weight tokens. At the time the tokens.css `--font-stack-*` → theme.css `@theme` bridge
either did not yet exist or was not complete; the literals were load-bearing at L.W1.

### When the bridge made them redundant

The tokens.css→theme.css bridge is confirmed present at HEAD:

**tokens.css** (lines 22-30):
```css
--font-stack-display: "Fraunces", Georgia, serif;
--font-stack-serif: "Computer Modern Serif", "Latin Modern Roman", "CMU Serif", Georgia, serif;
--font-stack-sans: "Helvetica Neue", "Arial Nova", Arial, system-ui, sans-serif;
--font-stack-mono: "Fira Code", "Fira Code Fallback", "Fira Mono", monospace;
```

**theme.css** (lines 49-52):
```css
@theme {
    --font-display: var(--font-stack-display);
    --font-serif:   var(--font-stack-serif);
    --font-sans:    var(--font-stack-sans);
    --font-mono:    var(--font-stack-mono);
}
```

The bridge became the single SOT; the three literals in typography.css became fossils.

---

## The cascade defect

`styles/index.css` import order (load-bearing):
1. `tokens.css`
2. `typography.css`
3. `theme.css`

Tailwind v4 compiles `@theme` declarations to `@layer theme { :root { … } }`. Un-layered `:root`
declarations (like those in typography.css) have higher effective specificity than `@layer theme`
declarations — they win regardless of source order. This means:

- A consumer who adds `@theme { --font-serif: "Instrument Serif", Georgia, serif; }` in their
  stylesheet produces a `@layer theme { :root { --font-serif: ... } }` rule.
- typography.css's un-layered `:root { --font-serif: "Computer Modern Serif", ... }` wins over it.
- Result: `getComputedStyle(:root).getPropertyValue('--font-serif')` returns the library's CM
  Serif literal, NOT the consumer's Instrument Serif — the override is silently swallowed.

Confirmed by Qη §1.A Playwright DOM probe:
```json
{ "h1_fontFamily": "\"Computer Modern Serif\", \"Latin Modern Roman\", \"CMU Serif\", Georgia, serif" }
```
despite the keyframes.js consumer declaring `@theme { --font-serif: "Instrument Serif", Georgia, serif; }`.

---

## Retired block

The three lines removed from the `:root` block in `typography.css` (pre-revert lines 196, 200, 201):

```css
/* RETIRED — Q.W3 Lane F (Q-cos-2) */
--font-serif: "Computer Modern Serif", "Latin Modern Roman", "CMU Serif", Georgia, serif;
--font-display: "Fraunces", Georgia, serif;
--font-mono: "Fira Code", "Fira Code Fallback", "Fira Mono", monospace;
```

Retained in the same block (serve live purposes not covered by the tokens.css bridge):
```css
--font-brand-sans: "Helvetica Neue", "Arial Nova", Arial, system-ui, sans-serif;
--font-sans: var(--font-brand-sans);
--font-display-variation-settings: "WONK" 1, "SOFT" 0;
--font-display-weight: 400;
```

`--font-brand-sans` and `--font-sans` are NOT in the tokens.css `@theme` bridge and serve the
brand-uniform-sans preset and `--font-sans` alias at `:root` level. `--font-display-variation-settings`
and `--font-display-weight` are also not in the bridge and serve the display-utility cascade.

---

## Post-revert cascade verification

### Fleet grep — `--font-serif` is now defined exactly once (canonical)

```
src/styles/theme.css:50:    --font-serif:   var(--font-stack-serif);
src/styles/typography.css:245:    --font-serif: var(--font-brand-sans);  ← brand-uniform-sans preset (correct override)
```

No un-layered `:root` literal for `--font-serif` in `src/styles/`. The theme.css bridge is the
single definition path.

`--font-display` and `--font-mono` are each defined only in `theme.css` (via `var(--font-stack-*)`).

### Token flow post-revert

```
tokens.css :root { --font-stack-serif: "Computer Modern Serif", ... }
  ↓
theme.css  @theme { --font-serif: var(--font-stack-serif) }   → compiled to @layer theme { :root }
  ↓
Consumer's own @theme { --font-serif: "Instrument Serif", ... }  → same @layer, later source position
  → wins. Override flows through unshadowed.
```

### Body cascade still routes correctly

```css
body { font-family: var(--font-serif); }
```

`body` consumes `var(--font-serif)`, which now resolves via the `@layer theme` chain. The
`brand-uniform-sans` preset's un-layered `:root[data-typography-preset="brand-uniform-sans"] {
--font-serif: var(--font-brand-sans); }` still correctly overrides for that preset — un-layered
`:root` with attribute selector wins over `@layer theme :root`, as intended for a deliberate
library preset.

---

## Verification results

```
npm run typecheck → PASS (vue-tsc --noEmit, zero errors)
npx vitest run   → PASS (32 files, 377 tests)
```

---

## Verdict

The three-line retire is correct. The tokens.css→theme.css bridge was the canonical resolution
path; the typography.css `:root` literals were fossil code introduced at L.W1 that became
redundant when the bridge was completed. The fossil's cascade position (un-layered `:root`) caused
it to silently shadow any consumer `@theme` override for `--font-serif`, `--font-display`, and
`--font-mono`. Post-revert, all three resolve through `@layer theme` and consumer overrides flow
through unshadowed. No functional regression to the library's own typography ladder — all utilities
still consume `var(--font-serif)` / `var(--font-display)` / `var(--font-mono)` which now resolve
correctly via the bridge.
