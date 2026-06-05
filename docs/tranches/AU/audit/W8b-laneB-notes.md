# AU.W8b Lane B (design-idiom) — lane notes

Worktree `/Users/mkbabb/Programming/glass-ui-w8b-b` (branch `w8b-b`, off W8 commit `6dd0d14`).
Units: AU.W8b.4 (12-site Tailwind lift) then AU.W8b.7 (-webkit re-grounding). Serial.

## AU.W8b.4 — 12-site disposition

| # | site | disposition |
|---|------|-------------|
| 1 | `card/CardDescription.vue:11` `text-[var(--muted-foreground-strong)]` | LIFTED → `text-muted-foreground-strong`. PRE-REQ landed: added `--color-muted-foreground-strong: var(--muted-foreground-strong);` bridge to `theme.css` (base token already at `tokens.css:362`). |
| 2 | `tabs/TabsTrigger.vue:22` `data-[state=active]:text-[var(--active-tab-color,var(--foreground))]` | KEEP + ALLOWLIST (the SOLE allowlist entry — runtime-themed consumer var with `--foreground` fallback). Encoded `{file, line:22, var:"--active-tab-color"}` in the gate. |
| 3 | `tabs/TabsTrigger.vue:22` compound `transition-[…] duration-[var] ease-[var]` | LIFTED → `transition-control` (shared `@utility`). |
| 4 | `card/Card.vue:73` `shadow-[var(--shadow-card)]` | LIFTED → `shadow-card`. `Card.test.ts:70,118` literal assertions UPDATED → `shadow-card` (same pass). |
| 5 | `combobox/ComboboxList.vue:24` `w-[200px]` | LIFTED → `w-popover`. Added `--popover-width: 200px` (`tokens.css`) + `--width-popover` bridge (`theme.css`). |
| 6 | `carousel/CarouselDots.vue:62` compound `transition-[…] duration-[var]` | KEPT arbitrary — single-site, distinct property list (spec permits "keep arbitrary if single-site"); not a gate-flagged form. |
| 7 | `accordion/AccordionContent.vue:18` `transition-[height,opacity]` | LIFTED → `transition-collapse` (shared `@utility`). `animate-accordion-*` data-state animation unchanged (recipe declares WHICH props transition only). |
| 8 | `accordion/AccordionTrigger.vue:26` `transition-[color,text-decoration-color,background-color]` | LIFTED → built-in `transition-colors` (superset, covers text-decoration-color). |
| 9 | `collapsible/CollapsibleContent.vue:8` `transition-[height,opacity]` | LIFTED → `transition-collapse` (with #7). |
| 10 | `custom/stacked-icons/StackedIconGroup.vue:16,37` `… duration-[var] ease-[var(--spring-snappy)]` | LIFTED → `duration-fast ease-spring-snappy` (canonical @theme utilities binding `--spring-snappy`; per-line `transition-[…]` kept — two distinct single-site property lists, no overfit utility minted). |
| 11 | `toggle/index.ts:33` glass-tier wraps | LIFTED → `hover:bg-glass-quiet` / `data-[state=on]:border-glass-border-quiet` / `data-[state=on]:bg-glass-quiet` / `data-[state=on]:shadow-glass-quiet`. Added `--color-glass-quiet` + `--color-glass-border-quiet` bridges (`theme.css`); `--shadow-glass-quiet` bridge pre-existed. Compound `transition-[…]` kept (single-site, opacity+transform beyond `transition-control`'s list). |
| 12 | `select/SelectTrigger.vue:36` `transition-[background-color,border-color,box-shadow,color]` | LIFTED → `transition-control` (exact match to the recipe; with #3). |

### Shared @utility recipes (authored ONCE in `utilities.css`)
- `transition-control` — `transition-property: background-color, color, box-shadow, border-color; duration var(--duration-fast); timing var(--ease-standard)` (≥2 sites: #3, #12).
- `transition-collapse` — `transition-property: height, opacity` (≥2 sites: #7, #9).

### @property boundary
NO design-token color registered as `@property <color>`. The new `--color-*` bridges
(`muted-foreground-strong`, `glass-quiet`, `glass-border-quiet`) stay UNregistered so
`light-dark()` re-resolution under a descendant `color-scheme` is preserved. `--spring-snappy`
is an easing function, needs no registration.

## Files changed (AU.W8b.4)
- `src/styles/theme.css` — `--color-muted-foreground-strong`, `--color-glass-quiet`, `--color-glass-border-quiet`, `--width-popover` bridges.
- `src/styles/tokens.css` — `--popover-width: 200px`.
- `src/styles/utilities.css` — `@utility transition-control` + `@utility transition-collapse`.
- `src/components/ui/card/CardDescription.vue`, `Card.vue`, `__tests__/Card.test.ts` (×2 assertions).
- `src/components/ui/tabs/TabsTrigger.vue`, `combobox/ComboboxList.vue`, `accordion/AccordionContent.vue`, `accordion/AccordionTrigger.vue`, `collapsible/CollapsibleContent.vue`, `select/SelectTrigger.vue`, `toggle/index.ts`, `custom/stacked-icons/StackedIconGroup.vue`.
- `scripts/proof-design-idiom-localization.mjs` (created — NOT registered in package.json/gates.mjs/ci.yml; orchestrator registers at close).

### cn.test.ts note
`src/utils/__tests__/cn.test.ts:104-108` passes `shadow-[var(--shadow-card)]` as a literal
fixture string to test the dedup logic — it is NOT coupled to Card.vue output and is OUTSIDE
the gate scope (`src/components/`). Left untouched; suite stays green (30 tests).

## Gate outputs
- `node scripts/proof-design-idiom-localization.mjs` → PASS (390 files scanned, 0 wrap hits, 1 allowlisted).
- Bite-check: re-injected `text-[var(--muted-foreground-strong)]` into `CardDescription.vue` →
  RED: `src/components/ui/card/CardDescription.vue:11: text-[var] arbitrary-value wrap \`text-[var(--muted-foreground-strong)]\` — use the @theme utility (text-<token>)` (exit 1). Reverted → green.
- `npm run typecheck` GREEN. `npm run build` GREEN (≈420ms vite arm + dts arm).
- Card suite 15/15 + cn suite 30/30 GREEN (only the Card dir among touched dirs has tests).
- `npm run proof:components-css` GREEN.
- `npm run proof:phantom-classes` — RED on PRE-EXISTING `fourier-analysis/web` pending-handoff
  sites ONLY (documented, unrelated to W8b); `PROOF_PHANTOM_ALLOW_PENDING=1` → GREEN, confirming
  glass-ui src/+demo/ CLEAN. My lifts introduce zero phantom classes.

### dist-bundle verification
The lifted utilities (`text-muted-foreground-strong`, `shadow-card`, `w-popover`, `bg-glass-quiet`,
`border-glass-border-quiet`, `shadow-glass-quiet`, `transition-control`, `transition-collapse`,
`ease-spring-snappy`) do NOT appear pre-generated in `dist/glass-ui.css` — CORRECT and consistent
with every existing library utility (CLAUDE.md: Option A pre-generation was rejected at AN.W2; the
consumer's `@source` content-scan generates them). The `@theme` bridges + `@utility` recipes + the
`--popover-width` token SHIP verbatim in `dist/styles/theme.css` / `tokens.css` / `utilities.css`
(all verified present), so the consumer's Tailwind resolves them.

## AU.W8b.7 — four -webkit re-grounding verdicts (verify-and-record; ZERO live edits)

1. **`glass.css:326` `-webkit-backdrop-filter`** — KEEP. At HEAD it is INSIDE
   `@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)))` — a
   correct defensive feature-query gating the no-blur fallback (tests absence of BOTH the standard
   and prefixed property), NOT a deprecated raw paint property. Stripping the `-webkit-` arm would
   mis-gate Safari ≤15 (prefixed-only). Verdict CORRECT at HEAD.

2. **`utilities.css` scrollbar family** — KEEP, already guarded. `.scrollbar-hidden` already carries
   `scrollbar-width: none` at `utilities.css:109` (the "one real fold" the prior spec assumed missing
   is ALREADY PRESENT — no edit). `.scrollbar-thin`'s `::-webkit-scrollbar` family is already gated
   under `@supports not (scrollbar-color: auto)` at `utilities.css:125`, with `scrollbar-color` as the
   primary path (`:121-124`). `scrollbar-color` is **Baseline Newly available since 2025-12-12**
   (reached Safari 26.2) — because it is Newly, NOT Widely, the `@supports not(...)`-guarded
   `::-webkit-scrollbar` is KEPT, not stripped. Verdict CORRECT at HEAD.

3. **Raw `rgb(255 255 255)` → `--highlight-overlay`** — NO-OP, the AU-AUGMENT site is stale.
   ZERO **opaque** `rgb(255 255 255)` (no-alpha — the actual fold target) exist in `src/styles/`
   (grep exit 1). The alpha-bearing `rgb(255 255 255 / N)` whites that DO exist
   (`instrument-rail.css`, `instrument-chassis.css`, `tokens.css`, `utilities.css:424`) are the
   intentional house catch-light/specular idiom (and the load-bearing ones are token-driven:
   `--hairline-catch-light`, `--shadow-cartoon-color*`). `--highlight-overlay` does not exist and is
   not needed. The spec's "zero raw rgb(255 255 255)" claim is CORRECT in intent; my grounding
   sharpens it (the alpha-bearing whites are the idiom, not a fold target). No edit.

4. **`utilities.css:334` `-webkit-background-clip: text`** — KEEP. Load-bearing in the
   `.gold-shimmer` clip-to-text recipe (`:330-336`), paired with the standard `background-clip: text`
   one line above. AU-AUGMENT explicitly says keep. Verdict CORRECT at HEAD.

`scrollbar-color` Baseline date cited per the gate spec: **Newly available 2025-12-12**.
`proof:components-css` GREEN; `npm run build` GREEN — no §7 regression.

## Risks
- None functional. The lifted utilities are resolution-equivalent to the arbitrary wraps (same
  token values via the @theme bridge). Sites #6/#10/#11 retain single-site `transition-[…]`
  property lists (the gate intentionally does not flag compound transitions); this is the spec-
  sanctioned choice over minting overfit single-site `@utility` recipes.
- `proof:phantom-classes` RED at HEAD is a pre-existing fourier sibling pending-handoff, NOT a W8b
  regression (orchestrator should run it with the documented `PROOF_PHANTOM_ALLOW_PENDING=1` or
  after the fourier patch lands).
- Gate NOT registered in package.json/gates.mjs/ci.yml per the dispatch (orchestrator owns the
  manifest==ci registration at close).

## Hardened-clause confirmation
ZERO working-tree-mutating git subcommands run (read-only `git rev-parse`/`status`/`branch` only).
ZERO writes to the main tree — all edits repo-relative inside `/Users/mkbabb/Programming/glass-ui-w8b-b`.
`docs/precepts/` untouched.
