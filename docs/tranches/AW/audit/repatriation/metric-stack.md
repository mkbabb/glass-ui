# metric-stack (MetricStack + MetricRow) — KEEP-SHARED verdict

The family ships from `src/components/custom/metric-stack/` (`MetricStack.vue` + `MetricRow.vue` + `index.ts`), reaches consumers via the `@mkbabb/glass-ui/metric-stack` subpath (`src/subpaths/metric-stack.ts`; `package.json:317-319`), and publishes its `MetricStackProps` + `MetricRowProps` types through `@mkbabb/glass-ui/api` (`src/api/index.ts:205-207`).

## Consumer census

All file:line read today (2026-06-07). Import = the `import { … } from "@mkbabb/glass-ui/metric-stack"` statement; render = the `<MetricStack>` / `<MetricRow>` tags.

| repo | file:line | symbol | render-count | class |
|------|-----------|--------|--------------|-------|
| speedtest | `src/components/speedtest/ResultStack.vue:116` (import) | `MetricRow, MetricStack` | — | a |
| speedtest | `ResultStack.vue:18,57` + `:70,109` | `MetricStack` ×2 (`register="result"`, `:as="TransitionGroup"`) | 2 | a |
| speedtest | `ResultStack.vue:28,56` + `:80,108` | `MetricRow` ×2 `v-for` blocks (primary DL/UL + secondary ping/jitter) | 2 v-for (4 logical rows) | a |
| **muster** | `frontend/src/components/verdict/RankedVerdict.vue:40` (import) | `MetricStack, MetricRow` | — | **b** |
| **muster** | `RankedVerdict.vue:198,268` + `:204,267` | `MetricStack` ×1 + `MetricRow` `v-for` (runners-up ranked list) | 1 + 1 v-for | **b** |
| **muster** | `frontend/src/components/verdict/WhyThisWonSheet.vue:35` (import) | `MetricStack, MetricRow` | — | **b** |
| **muster** | `WhyThisWonSheet.vue:278,321` + `:285,320` | `MetricStack` ×1 (`as="ul"`) + `MetricRow` `v-for` (per-voter pull breakdown) | 1 + 1 v-for | **b** |
| glass-ui | `src/api/index.ts:205-207` | `MetricRowProps, MetricStackProps` (type re-export) | 0 | barrel — not a consumer |
| glass-ui | `src/styles/tokens.css` (`--metric-row-*` token defs) | — | 0 | token defs — not a render consumer |
| glass-ui | `src/subpaths/metric-stack.ts` | `export *` | 0 | subpath barrel — not a consumer |
| glass-ui | `tests/components/custom/metric-stack/MetricStack.test.ts:4` | `MetricRow, MetricStack` | test fixture | not a consumer |
| glass-ui | `demo/**` | — | **0** | **NO demo story renders this family** |
| fourier-analysis / value.js / keyframes.js / words | — | — | 0 | no hits |

Negative confirmations (greps run today):
- `grep -rIln "<MetricStack|<MetricRow" glass-ui/src` excluding `metric-stack/` → **zero** glass-ui-internal render sites (no `GlassDock`-style internal composition; class (c) is empty).
- `grep -rIln metric-stack glass-ui/demo` → **zero** (class (d) is empty — there is no demo story at all).
- fourier-analysis, value.js, keyframes.js, words → zero code hits.

## Verdict + rationale

**KEEP-SHARED.** The family has **TWO genuine generic-app consumers** — speedtest AND muster — which clears glass-ui's ≥2-genuine-consumer invariant on the strongest possible footing (a non-speedtest app, not a demo story, not an internal composition).

The user's specificity lens asks: is this *bespoke to the speed-test instrument domain?* The answer is **no** — and muster is the proof. muster's frontend is a ranked-candidate **verdict/voting** UI (place-ranking, per-voter pull, score breakdowns), a domain with zero overlap with network speed-testing. It composes the family through the **generic subgrid slot contract** (`#icon` / `#label` / `#value`) and the generic `register="result"` ledger knob:
- `RankedVerdict.vue:198-268` — runners-up list: rank glyph + candidate name + `★ rating` + an animated score `<Progress>` bar.
- `WhyThisWonSheet.vue:278-321` — per-voter pull: voter `StatusDot` + name + weighted-travel-min + a contribution `<Progress>` bar, rendered `as="ul"`.

Neither muster site touches any speedtest concept. MetricStack/MetricRow are a **generic 3-track (icon|label|value) subgrid metric-ledger primitive** — the kind of "stack of labeled numeric rows with per-row tint" pattern any data-dense app reaches for.

The "speedtest by name" references the directive flagged (`MetricStack.vue:45,58`) are **doc-comment illustrations** of the `variant` and `register` props — "e.g. speedtest's `dpi` variant lifts `--result-row-scale: 1.25`", "e.g. speedtest's complete-screen `ResultStack`". The single baked-in speedtest-flavoured CSS rule is the illustrative `.metric-stack[data-variant="dpi"] { --result-row-scale: 1.25 }` knob in the scoped block — an *example* of the generic `variant`→`--result-row-scale` mechanism, not a hardcoded speedtest code path. speedtest's actual `dpi`-specific styling (`.metric-stack[data-register="result"] .metric-row[data-metric="download"]…`) lives in **speedtest's own** `ResultStack.vue` scoped CSS (`:282-323`), not in glass-ui. The library's surface is domain-neutral.

This is the family the earlier constellation audit argued KEEP for on the speedtest-consumer basis; under the user's harsher specificity test it *still* holds, because the specificity signal (a hard speedtest dependency) is absent — only an illustrative doc/CSS example exists, and a real second-domain consumer (muster) exercises the generic surface.

## Move plan

Not applicable — the family stays in glass-ui. No dir move, no subpath retire, no `api/` removal, no `package.json` exports change.

Optional cleanup (NOT a repatriation, purely hygiene — flag only, do not block):
- The doc-comment lines `MetricStack.vue:45,58` and the `[data-variant="dpi"]` example CSS could be **de-speedtested** to read as generic illustrations (the constellation cleanup spirit) so glass-ui's source carries no consumer-name coupling. This is cosmetic and out of scope for a repatriation move — note it as a follow-on de-coupling, not a move.

## Blocking coordination

**muster blocks any repatriation** — it is a fully realised, non-speedtest app consumer with two live render sites across `RankedVerdict.vue` and `WhyThisWonSheet.vue`, pinned `@mkbabb/glass-ui: ^3.1.0` (`muster/frontend/package.json:19`). Removing metric-stack from glass-ui (or moving it native into speedtest) would break muster's verdict UI outright and would require either (a) duplicating the primitive into muster too, or (b) creating a cross-app dependency from muster → speedtest — both of which violate the design-system contract. There is therefore no clean repatriation path; KEEP-SHARED is forced, not merely preferred.

## Summary

1. metric-stack (MetricStack + MetricRow) lives at `glass-ui/src/components/custom/metric-stack/`, shipped via the `/metric-stack` subpath + `/api` types.
2. Consumers: speedtest `ResultStack.vue:116` (import; 2 MetricStack + 4 MetricRow rows) AND muster `RankedVerdict.vue:40` + `WhyThisWonSheet.vue:35` (2 import+render sites).
3. muster is a GENUINE non-speedtest app consumer — a ranked-candidate verdict/voting UI, zero network-speed-test overlap.
4. muster uses the generic subgrid slot contract (`#icon`/`#label`/`#value`) + the generic `register="result"` knob — no speedtest concept touched.
5. ZERO glass-ui-internal render sites (no GlassDock-style composition) and ZERO demo stories render the family.
6. fourier-analysis / value.js / keyframes.js / words have no hits.
7. The "speedtest by name" references (`MetricStack.vue:45,58`) are doc-comment illustrations; the only speedtest-flavoured CSS is an illustrative `[data-variant="dpi"]` example, not a hardcoded code path — speedtest's real dpi styling lives in speedtest's own ResultStack scoped CSS.
8. Verdict: KEEP-SHARED — the ≥2-genuine-generic-consumer invariant is met by two distinct-domain apps; the primitive is a domain-neutral icon|label|value metric-ledger, not speed-test-bespoke.
9. muster is a hard blocker on any repatriation (would break its verdict UI; pinned ^3.1.0).
10. Optional follow-on (non-blocking): de-speedtest the doc-comments + the illustrative dpi CSS example so the library source carries no consumer-name coupling.
