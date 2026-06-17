# W-EYEBROW-UNION — the four mono-caption eyebrow recipes union onto ONE register

## The defect (HEAD, pre-wave)

The library spoke FOUR dialects of one word — the mono-caption EYEBROW (mono ·
caption-size · uppercase) — diverging on three secondary axes:

| recipe | file | tracking | weight | color |
|---|---|---|---|---|
| `.section-label` (canon-by-usage) | `typography/utilities.css` | `--type-tracking-caps` (0.1em) | none | `--muted-foreground` |
| `@utility text-mono-caption` | `typography/utilities.css` | `--type-tracking-wider` (0.05em) | **500** | **none** (consumers hand-append `text-muted-foreground`) |
| `.glass-menu-section-label` | `menu.css` | knob → `--type-tracking-caps` | none | knob → `--muted-foreground` |
| `text-admin-label` (a DISTINCT size) | `typography/semantic.css` | `--type-tracking-caps` | 500 | none — stacked alongside `.section-label` in 35 demo sites |

## The union (this wave — clean break, no alias)

- **`@utility text-mono-caption` is THE canonical vocabulary**, made color-agnostic:
  `--font-mono` + `--type-caption` + `uppercase` + `--type-tracking-caps`. The drift
  reconciled: tracking-WIDER → tracking-CAPS, weight-500 DROPPED (a per-use choice via
  inline `font-medium`), color stays UNBAKED so the 17 `text-mono-caption text-foreground`
  pairings keep their ink (baking muted would have broken them — the real risk found at RE-GROUND).
- **`.section-label` COMPOSES the vocabulary** via `@apply text-mono-caption` + bakes
  `color: var(--muted-foreground)` — the colored canon, ONE declaration of the vocabulary.
- **The menu caption folds**: the `--menu-section-*` knobs DEFAULT to the canon tokens
  (already true at HEAD), so the un-overridden `.glass-menu-section-label` resolves
  byte-equal to the canon; the knobs STAY as the sanctioned override layer (the
  `proof:menu-glass` W2 token surface — `--font-mono`/`--type-caption`/`--border-hairline`/
  `--menu-section-*` — preserved).
- **The double-stack collapsed**: the spec cited 4 sites; HEAD carried **35** (the 4 named
  + **31 micro-tinted breadcrumbs** `section-label section-label--tinted text-admin-label`
  copy-pasted across the story pages — the §0 RE-GROUND drift, recorded). The 4 named →
  `section-label` alone (the caption canon); the 31 → `section-label--tinted text-admin-label`
  (drop the redundant caption-size base — `text-admin-label` owns the 0.625rem micro size,
  `--tinted` the accent; ZERO-paint). `text-admin-label` STAYS a distinct micro register (a KEEP).

## Verification

- `proof:eyebrow-union` born-RED→GREEN (W1 vocab-declared-once + `.section-label` composes ·
  W2 no drift on `text-mono-caption` · W3 menu knobs default to canon + menu-glass W2 surface ·
  W4 0 double-stacks remaining, exact-token match so `section-label--tinted` is not a false hit).
- `proof:menu-glass` GREEN (the coupled W2-stays-green — the fold preserved the token surface).
- `proof:suffuse` GREEN (the `.section-label--tinted` accent register intact, 31 consumers).
- `typecheck` + `vite build` GREEN (the `@apply text-mono-caption` composes — the house pattern,
  cf. `instrument-chassis.css @apply twin-line-divider`).

## The binding π

`tests-visual/eyebrow-union.spec.ts` — the live readback: every `.section-label` +
`text-mono-caption` eyebrow (EXCLUDING the distinct-size `text-admin-label`) resolves ONE
mono family, ONE `--type-tracking-caps` tracking, `uppercase`, and ONE `--type-caption` size,
both modes. Per BA inv-4 the binding live capture + the `proof:ba-gestalt` display/glass-band
gestalt verdict ride **W-REFLECT3 (Batch 7)** — the per-mechanism gate GREEN + the byte-equality
π are this token-consolidation wave's close floor.
