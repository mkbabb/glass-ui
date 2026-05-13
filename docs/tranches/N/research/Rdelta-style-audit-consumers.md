# Rδ — Bidirectional style-audit, CONSUMER half (post-migration)

Per the canonical 7-axis bidirectional style audit at `docs/audits/style-audit.md`. Targets = 6 constellation consumers post-M.W1 migration. Slices a–f (words / fourier-analysis / bbnf-buddy / keyframes.js / value.js / speedtest).

## Preamble

**Scope**: each consumer's `src/` (or `frontend/src/`, `web/src/`, `demo/` per repo structure) at the post-M.W1 commit (per CONSTELLATION.md §1 final). Glass-ui revision = v1.0.5 (M close `54a8acb`).

## Per-consumer drift tally

| Consumer | Branch / commit | Drift count | Notes |
|---|---|---|---|
| A — words/frontend | master `0f16925` | 365 | Heavy manual typography (text-sm/lg in 232 sites); 39 custom @keyframes; 53 bespoke hover scales |
| B — fourier-analysis/web | master `301a95e` | 270 | 58 `transition: all`; 16 custom @keyframes; manual typography 119 sites |
| C — bbnf-buddy | master `e06d629` | 52 | Lowest drift; minimal glass-ui consumption surface |
| D — keyframes.js | WIP branch `b788205` | 46 | Demo-only consumption; isolated; 2 `@layer components` redefinitions |
| E — value.js | WIP branch (commit landed) | 156 | Demo-heavy; 136 inline color opacity wrappers `bg-[var(--color-*)]/N` |
| F — speedtest | (no M.W1 source changes) | 0 | v1.0.4 consumption verified clean at M.W1 Lane F |
| **TOTAL** | | **889** | drift across 5 consumers |

## Post-migration errors

**0 errors introduced by M.W1 migrations.** All M.W1 transformations landed clean:
- words/frontend: `glass-subtle` → `glass-wash` (17 sites, 0 phantoms remaining); `danger-subtle` → `destructive` (1 site).
- fourier-analysis/web: `DockPopover` → `HoverPopover` (4 sites, 0 phantom imports).
- bbnf-buddy: `ScrollArea` → `ScrollPane` (9 correct uses, 0 phantoms).
- keyframes.js / value.js: subpath migrations verified per Lane A + B proofs.

## Drift breakdown by axis (aggregated across consumers)

| Axis | Total | Dominant pattern |
|---|---|---|
| 1 Token alignment | 292 | Inline color-mix / opacity wrappers `bg-[var(--color-*)]/N` |
| 2 Utility & @apply hygiene | 4 | Local Tailwind utility redefinitions in `@layer components` |
| 3 Interactive consistency | 109 | Bespoke `hover:scale-*` instead of `--scale-hover*` tokens |
| 4 Variant rooting | 0 | No `:deep()` against reka-ui; clean composition |
| 5 Overlay + motion | 73 | `transition: all` + custom @keyframes duplicating canonical |
| 6 Typography | 381 | Manual `text-sm/md/lg` Tailwind defaults instead of `.text-{body,small,caption}` canonical |
| 7 Accessibility resilience | 30 | Custom glass surfaces missing `@supports not (backdrop-filter)` / `prefers-reduced-transparency` fallbacks (when not using canonical tier) |

## Glass-ui gaps surfaced by consumers (≥ 2 consumer signatures)

| ID | Pattern | Sites | Proposed |
|---|---|---|---|
| **CG1** | Notification color-palette tier: `bg-[var(--color-success/warning/info)]/Nα%` hand-coded | A (NotificationToast.vue), E (palette-color hand-coded) | `.glass-{success,warning,info,error}-subtle` semantic tiers in `glass.css` |
| **CG2** | Interactive lift vocabulary: `hover:scale-125` / `hover:scale-110` bespoke | A, B, D, E | `--scale-hover-{sm,md,lg}` triplet in tokens + `.hover-lift-sm/md/lg` utilities |
| **CG3** | Animation primitive duplication: `@keyframes fade-in`, `@keyframes lift`, `@keyframes dot` reimplemented | A, D | promote `fade-in` + `dot` to canonical animations.css |
| **CG4** | Typography sizing-tier documentation gap: consumers reach for Tailwind defaults instead of `.text-{display,heading,body,prose,small,micro}` | A (232 sites), B (119), C (30) | Promote `text-micro` @utility (Rγ G2); add explicit DESIGN.md tier mapping table; consider Tailwind-side semantic aliases via @theme |

## Union candidates (same pattern, different vocabulary)

| ID | A form | B form | Canonical |
|---|---|---|---|
| **CU1** | `@keyframes golden-shimmer` (A, gold-specific) | `@keyframes shimmer` (glass-ui canon) | parameterize `shimmer` with `--shimmer-color` token; retire `golden-shimmer` |
| **CU2** | `@keyframes border-pulse` (A custom) | (glass-ui gap) | add `@keyframes border-pulse` + `--duration-pulse` token to glass-ui |
| **CU3** | `@keyframes lift` (A + D, both custom) | `--lift-*` tokens (glass-ui, transform value not animation) | clarify: animation vs transform; document both OR consolidate |
| **CU4** | `@keyframes tab-content-in` (A custom) | `.popover-animate .slide-in-from-side` (glass-ui canonical) | extend slide-in for tab-content; retire `tab-content-in` |
| **CU5** | `hover:scale-{125,110,105}` (A bespoke) | `--scale-hover` single token (glass-ui) | extend to `--scale-hover-{sm,md,lg}` (matches CG2) |
| **CU6** | `text-[var(--color-success)]` (A inline) | (glass-ui gap) | add `.text-{success,warning,info,error}` semantic color utilities + opacity variants |
| **CU7** | Custom `.kbd` per-consumer (A implied) | `.kbd` canonical (glass-ui utilities.css) | verify `.kbd` exported via canonical path; demo story |
| **CU8** | Swipe-gesture indicator gradients (A ios-pwa.css) | (glass-ui gap) | optional: add `.swipe-indicator-{left,right}` utility for PWA gesture cohort |

## N-directive cross-walk

- **N6 (storybook mobile)**: no consumer has its own storybook conflict; clean.
- **N7 (dock blur)**: no consumer over-blurs dock surfaces; clean.
- **N8 (dock collapse)**: no consumer implements its own dock-collapse primitive that would conflict; clean (consumer benefits from new substrate).
- **N9 (glass panels frosted-default)**: words/frontend uses `.glass-wash` + `.glass-elevated` canonically; no consumer overrides glass tier with their own frosted recipe. Clean.
- **N9 typography audit**: 381 typography drift instances aggregate; consumers consistently bypass `.text-{display,heading,body,prose,small,micro}` for Tailwind defaults. PRIMARY DRIFT CLASS; warrants N.W1 typography sweep PLUS documentation refinement (CG4 + DESIGN.md tier table).
- **N10 (bidirectional audit)**: this is N10's deliverable.
- **N11 (6-agent consumer audit)**: this is N11's deliverable.

## Per-consumer closing tally

| Consumer | Drift | Gaps surfaced | Post-migration errors | Status |
|---|---|---|---|---|
| A words/frontend | 365 | 4 (CG1-CG4) | 0 | clean migration; typography + animation primary drift |
| B fourier-analysis/web | 270 | 2 | 0 | clean migration; `transition: all` dominates |
| C bbnf-buddy | 52 | 0 | 0 | lowest drift; minimal surface |
| D keyframes.js | 46 | 1 | 0 | clean migration; demo isolated |
| E value.js | 156 | 1 | 0 | clean migration; inline color wrappers high |
| F speedtest | 0 | 0 | — | not in M.W1 scope; v1.0.4 clean |
| **TOTAL** | **889** | **4 (deduped)** | **0** | **6/6 canonical post-migration; 4 gaps; 8 unions** |

## Conclusion

M.W1 migration delivered cleanly. The 889 drift instances are NOT post-migration regressions — they represent pre-existing drift the consumers carried before M, now surfaced by the audit lens. Primary drift class is typography (381 instances; 43% of total) where consumers default to Tailwind defaults instead of glass-ui's golden-ratio semantic scale. N.W1 typography sweep + Rγ G2 (promote `text-micro` to @utility) + DESIGN.md tier table address this cohort directly.
