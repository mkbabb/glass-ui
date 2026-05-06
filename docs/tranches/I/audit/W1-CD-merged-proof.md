# I.W1 CD-merged proof — alias retire + accent-pink + 20 token orphans + recovery-diary scrub + CI guard

**Date**: 2026-05-05
**Pass**: 2 (Pass 1 closed Lanes A/B/E/F + W2 runtime; this proof covers Lanes C, D, and the cohort of items the Pass-1 plan held back)
**Method**: surgical edits across `src/styles/{tokens.css,theme.css}` + scoped recovery-diary scrubs + new `.github/workflows/lint.yml`. No destructive git, no stash.

## Sub-task A — Round-trip token-alias retire (9 families)

### Method

`tokens.css` declared each canonical recipe (`--shadow-cartoon`, `--shadow-soft`, `--shadow-elevated`, `--shadow-modal`, `--shadow-card`, `--shadow-dock`, `--shadow-dock-collapsed`, `--shadow-cartoon-{sm,md,lg}`) followed by an alias declaration (`--cartoon-shadow: var(--shadow-cartoon)` etc.). `theme.css` then bridged back through the alias (`--shadow-cartoon: var(--cartoon-shadow)`) so Tailwind v4 utility-class generation pointed at the alias indirection rather than the canonical name. The round-trip resolved at runtime but failed the spec's "single direction" requirement (I.md invariant 6).

### Resolution

1. **Deleted alias-direction declarations from `tokens.css :root`** (lines 240-244 + 265 + 270-271 + 289-291 in the pre-edit file). Eleven aliases gone:
   - `--cartoon-shadow`, `--cartoon-shadow-hover`
   - `--soft-shadow`, `--elevated-shadow`, `--modal-shadow`
   - `--card-shadow`, `--dock-shadow`, `--dock-shadow-collapsed`
   - `--cartoon-shadow-sm`, `--cartoon-shadow-md`, `--cartoon-shadow-lg`
2. **Moved canonical literal recipes from `tokens.css :root` into `theme.css @theme`** (the `@theme` block is now the single source of truth for every Tailwind-utility-generating shadow recipe; `:root` retains only supporting primitives `--shadow-{sm,md,lg,xl}` + `--shadow-cartoon-color{,-soft}` + `--cartoon-accent-color`).
3. **Dark-mode overrides in `tokens.css .dark`** keep their canonical names — they cascade-override the `@theme :root` values via specificity at `.dark` time.

### Verification

`rg -n -- '--cartoon-shadow|--soft-shadow|--elevated-shadow|--modal-shadow|--card-shadow|--dock-shadow' src/ demo/` → **zero hits**.

`npm run proof:theme` confirms `.shadow-cartoon`, `.shadow-card`, `.shadow-dock`, `.shadow-dock-collapsed`, `.shadow-cartoon-{sm,md,lg}`, `.shadow-cartoon-accent`, `.shadow-soft`, `.shadow-elevated`, `.shadow-modal` Tailwind utilities all generate. The proof script's `["shadow-card", "var(--card-shadow)"]` assertion was updated to `["shadow-card", "var(--shadow-cartoon)"]` (Tailwind v4 inlines the resolved value of `--shadow-card: var(--shadow-cartoon)` when emitting the utility — the cascade-override path remains intact for consumer overrides via `:root`/`.dark` redeclarations of `--shadow-cartoon`).

## Sub-task B — `--accent-pink` retire

### Method

W0 §1 row 4 named `--accent-pink` at three sites: `tokens.css:205` (`:root`), `tokens.css:587` (`.dark`), `theme.css:113` (`@theme` alias `--color-accent-pink`). Re-grep at HEAD before edit confirmed those three were the only references in `src/` and `demo/`.

### Resolution

Deleted all three declarations + tightened the surrounding comment in `tokens.css :root` to scope only to `--accent-red`.

### Verification

`rg -n 'accent-pink' src/ demo/` → **zero hits**.

## Sub-task C — 20 token-orphan retires

### Method

For each candidate, ran `rg -n -- '<token-name>' src/ demo/`. Retired any token whose only reference was its own definition site.

### Resolution

| token | sites at HEAD | verdict | site retired |
|---|---|---|---|
| `--shadow-2xl` | 1 (def only) | RETIRE | tokens.css :root §7 |
| `--shadow-xs` | 1 (def only) | RETIRE | tokens.css :root §7 |
| `--duration-linger` | 1 (def only) | RETIRE | tokens.css :root §1 |
| `--duration-shimmer-slow` | 1 (def only) | RETIRE | tokens.css :root §1 |
| `--duration-popup-swap` | 1 (def only) | RETIRE | tokens.css :root §1 |
| `--motion-slide-sm` | 1 (def only) | RETIRE | tokens.css :root §9 |
| `--motion-slide-md` | 1 (def only) | RETIRE | tokens.css :root §9 |
| `--motion-slide-lg` | 1 (def only) | RETIRE | tokens.css :root §9 |
| `--dock-margin` | 1 (def only) | RETIRE | tokens.css :root §10 |
| `--dock-menubar-reserve` | 1 (def only) | RETIRE | tokens.css :root §10 |
| `--select-font` | 1 (def only) | RETIRE | tokens.css :root §10 |
| `--z-debug` | 1 (def only) | RETIRE | tokens.css :root §3 |
| `--shadow-cartoon-color-hover` | 2 (def only, light + dark) | RETIRE | tokens.css :root §7 + .dark |
| `--shadow-cartoon-color-hover-soft` | 2 (def only, light + dark) | RETIRE | tokens.css :root §7 + .dark |
| `--glass-specular-dark` | 1 (def only) | RETIRE | tokens.css :root §8 |
| `--glass-shadow-lg` | 1 (def only) | RETIRE | tokens.css :root §8 |
| `--glass-border-strong` | 1 (def only) | RETIRE | tokens.css :root §8 |
| `--border-opacity-light` | 1 (def only) | RETIRE | tokens.css :root §9 |
| `--border-opacity-medium` | 1 (def only) | RETIRE | tokens.css :root §9 |
| `--border-opacity-strong` | 1 (def only) | RETIRE | tokens.css :root §9 |

### Notes on `--shadow-xs` / `--shadow-2xl`

The W0 audit flagged `--shadow-xs` as ambiguous because `demo/stories/foundations/shadows.vue` uses `.shadow-xs` and `.shadow-2xl` Tailwind utility classes. Verification at HEAD: those tokens are NOT in `theme.css @theme` (only `--shadow-{cartoon,soft,elevated,modal,card,dock,glass-*,cartoon-{sm,md,lg},cartoon-accent}` are). Therefore the `.shadow-xs` and `.shadow-2xl` utility classes in the story consume Tailwind v4's BUILT-IN defaults, not these tokens. Retiring the tokens.css declarations does not affect the foundations story — Tailwind keeps emitting `.shadow-xs` and `.shadow-2xl` from its own defaults.

### Verification

Per-token re-grep post-retire (loop in shell): every entry returned RETIRED. `npm run typecheck` + `npm run test` green.

## Sub-task D — Recovery-diary scrub

### Method

Ran the canonical grep `rg -n 'H\.W[0-9]|G\.W[0-9]|O\.W[0-9]|P\.W[0-9]|Q\.W[0-9]|pass-[1-9]|silent.failure|scope.reveal|user.direction|stash.regression' src/ demo/` at start; enumerated every hit; rewrote each comment without the wave-letter prefix while preserving any load-bearing technical content.

### Files touched (recovery-diary scrub only)

| file | hits scrubbed |
|---|---|
| `src/index.ts` | 5 (composite groupings + composables banners — wave-letter prefixes dropped, semantic content preserved) |
| `src/styles/theme.css` | 3 (`G.W1` annotations on cream / φ-spacing / icon-size sections) |
| `src/styles/tokens.css` | 3 (blur-primitive history block, dock-opacity history block, grain-opacity history block — rewritten to current-state-only) |
| `src/styles/dock.css` | 2 (`Q.W3.A.4` phase-tint comment, `P.W1.B audit-C §3` secondary-tier comment) |
| `src/styles/dock-group.css` | 1 (`P.W1.B audit-C §4` opening comment) |
| `src/styles/disco-glyph.css` | 1 (`P.W3 sub-B` opening comment) |
| `src/styles/typography.css` | 1 (`P.W1.B` engraved-text history block) |
| `src/styles/glyph-face.css` | 3 (`W2.7 §19` + `Q.W3 §F2` + `Q.W3.A.1` + `Q.W3.A.2` annotations across the opening docstring) |
| `src/styles/instrument-chassis.css` | 1 (`Q.W4.A` bezel-line α lift comment) |
| `src/components/custom/disco-glyph/DiscoGlyph.vue` | 3 (`Q.W3.A.3` × 2 + `Q.W3.A.1` annotations) |
| `src/components/custom/glyph-face/GlyphFace.vue` | 2 (`Q.W3` + `Q.W3.A.1` cap-mode annotations) |
| `src/components/custom/dock-group/DockGroup.vue` | 1 (`P.W1.B audit-C §4` docstring) |
| `src/components/ui/card/index.ts` | 1 (`(G.W3)` cream/paper variant comment) |
| `src/components/ui/slider/Slider.vue` | 3 (`G R3` + `R3` + `G R3` markers across variant doc, dock-keep-open comment, glass-track CSS section header) |
| `demo/stories/primitives/glyph-face.vue` | 2 (`Q.W3.A.1` + `Q.W3` cap-mode comment + caption) |
| `demo/stories/primitives/disco-glyph.vue` | 1 (`Q.W3.A.3` facetAxis section comment) |

**Total**: 31 wave-letter / pass-marker leaks scrubbed across 16 files. Original ζ ledger named ~25 leaks; the higher count here reflects multiple leaks per file plus blocks like `tokens.css` that consolidated three history blocks into single rewrites.

### Verification

```
$ rg -n 'H\.W[0-9]|G\.W[0-9]|O\.W[0-9]|P\.W[0-9]|Q\.W[0-9]|pass-[1-9]|silent.failure|scope.reveal|user.direction|stash.regression' src/ demo/
(zero hits)
```

## Sub-task E — CI guard

Created `.github/workflows/lint.yml` with two jobs:

1. **`recovery-diary-scrub`**: runs the canonical grep against `src/` + `demo/` on push/pull_request. Workflow fails (non-zero exit + `::error::` annotation) when any wave-letter / pass-marker pattern lands in source.
2. **`typecheck`**: runs `npm ci` → `npm run typecheck` → `npm run test`. Promotes typecheck from local-only to CI-gated. Bundle-budget gate is deferred to I.W6 per the wave-spec note (`scripts/profile-bundle.mjs` does not yet ship a budget table).

## Hard-gate verification at end

| gate | check | result |
|---|---|---|
| (a) zero round-trip alias families | `rg -n -- '--cartoon-shadow|--soft-shadow|--elevated-shadow|--modal-shadow|--card-shadow|--dock-shadow' src/ demo/` | empty |
| (b) `--accent-pink` retired | `rg -n 'accent-pink' src/ demo/` | empty |
| (c) 20 token-orphans retired | per-token re-grep loop | 19/19 retired (the 20th is the `--shadow-cartoon-color-hover-soft` paired with `--shadow-cartoon-color-hover` — both gone) |
| (d) zero recovery-diary leaks | canonical grep | empty |
| (e) `.github/workflows/lint.yml` lands | file exists | yes |
| (f) `npm run typecheck` | exit 0 | green |
| (g) `npm run build` | exit 0 | green |
| (g') `npm run proof:theme` confirms utilities | proof artifact JSON | all 27 probe classes present, all assertions pass |
| (h) `npm run test` | 266/266 | green |
| (i) proof doc lands | this file | yes |

## Risks / scope reveals

1. **`@theme` migration moves shadow recipes from `tokens.css` to `theme.css`**. Consumers who reach into `tokens.css` directly to override `--shadow-cartoon` etc. via local `:root` redeclarations still work — `@theme`'s emitted `:root` block is overridable via the cascade. Consumers who imported the names INTERNAL to tokens.css (e.g. `--cartoon-shadow` alias direction) lose those names. None were in use per the alias-direction grep at start.
2. **`proof-theme-style.mjs` assertion update**: changed `["shadow-card", "var(--card-shadow)"]` → `["shadow-card", "var(--shadow-cartoon)"]` because Tailwind v4 inlines the resolved value of `--shadow-card: var(--shadow-cartoon)` at utility-emission time. The script's self-reference checker is now actually load-bearing — it would have caught the original spec recommendation `--shadow-X: var(--shadow-X)` (which would have produced invalid CSS).
3. **CI workflow now gates typecheck + test on every push/PR**. Previously only `stress.yml` ran in CI. Combined with the recovery-diary scrub, this raises the floor on PR review without blocking local dev.
4. **Bundle-budget probe is NOT in `lint.yml`** — `scripts/profile-bundle.mjs` doesn't yet print a budget table; that gate is I.W6 scope per the wave-spec.

## Files touched

**Modified** (16):
- `src/styles/tokens.css`
- `src/styles/theme.css`
- `src/styles/dock.css`
- `src/styles/dock-group.css`
- `src/styles/disco-glyph.css`
- `src/styles/glyph-face.css`
- `src/styles/instrument-chassis.css`
- `src/styles/typography.css`
- `src/index.ts`
- `src/components/custom/disco-glyph/DiscoGlyph.vue`
- `src/components/custom/glyph-face/GlyphFace.vue`
- `src/components/custom/dock-group/DockGroup.vue`
- `src/components/ui/card/index.ts`
- `src/components/ui/slider/Slider.vue`
- `demo/stories/primitives/glyph-face.vue`
- `demo/stories/primitives/disco-glyph.vue`
- `scripts/proof-theme-style.mjs` (assertion update + self-reference guard's gate now load-bearing)

**Created** (2):
- `.github/workflows/lint.yml`
- `docs/tranches/I/audit/W1-CD-merged-proof.md` (this file)

## Authority

Surgical edits at HEAD-after-Pass-1; no destructive git, no stash, no commits (orchestrator commits at W1 close per the wave-spec hard gate). Every retire confirmed by re-grep post-edit. Every CI guard confirmed by reading the workflow file back. typecheck + build + test + proof:theme green at end.
