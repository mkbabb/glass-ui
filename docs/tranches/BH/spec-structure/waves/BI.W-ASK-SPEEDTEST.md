# BI.W-ASK-SPEEDTEST — the by-name relay: speedtest restructures itself

> **Wave id:** `BI.W-ASK-SPEEDTEST` · **band:** S5 (SIBLING ASKS) · **class:** `H` (device-free) · **gate:**
> `proof:crossrepo-asks` + READ-ONLY `proof:sibling-sideEffects`/`proof:barrel-pure`/`proof:backend-structure`
> over speedtest · **preconds:** BI.W-G9-HARVEST, BI.W-DIFFERENTIAL-CLOSE. A BY-NAME relay — the foreign-tree
> fence (inv-26): glass-ui edits ZERO speedtest tree; the SIBLING executes in its OWN repo.

## §0 — Verdict

speedtest is the §4-PRODUCT reference (~85% of the live tree already matches the archetype). This wave AUTHORS the
ASK + the repo-agnostic FORMULA (§7) + the per-repo instrument spec + runs the READ-ONLY census, so the sibling
receives a PRECISE violation list. The reshape (greening) is speedtest's own edit on its `^5.1.0` consume.

## §1 — The ask (the per-repo instrument)

| axis | value |
|---|---|
| `sideEffects` | `["**/*.css","*.css","src/components/dashboard/charts/echartsInit.ts"]` (RECOMPUTE at cut) |
| barrels to un-mix | **1** — `features/speedtest/state/index.ts` (the barrel-reader re-point rides it) |
| §4P.5 graduations | fold `survey` FIRST (SOFT branch — softSegments≥2 by the colocated-segment criterion, now a gate OUTPUT), then `admin`/`dashboard` (HARD, camel-segment: `dashboard` = components + api/dashboard.ts + `useDashboardFilterStore`→`Dashboard`-segment → hard 3) |
| App.vue drain | 833 → 301 via T1b→T1c compose (T1b `<style>`+docblock → `./App.css` non-scoped → 550; T1c `AuroraBackdrop.vue` + `useMockResultsGate.ts` → 301). Anti-gaming: 64% comment — the drain is STRUCTURAL, comments NOT stripped |
| §4P.7/8 | `design/` → `styles/`; `MOTION-DOCTRINE.md` → `docs/`; `config/` presets home |
| the boundary chain (§9.10) | survey's graduation triggers the born-RED on `components/survey/composables/useSurveyFlow.ts:12-13` (`import { variant } from "../SurveyStep.vue"`/`"../SurveyReview.vue"`) — the SFC-embedded `export const variant` moves OUT into `features/survey/constants.ts` (the clean-break; `check-internal-boundaries.mjs` runs born-RED before greening) |
| backend | speedtest/server 4 violations — `routes/`+`services/`+`validation/` dissolve; the `services/` adapters move to `integrations/` (FOLD4) |
| feature-interior rule | a drain-tripping `ui/` SFC promotes to a component-folder-with-index inside `ui/`; a deeply-nested pure-`.ts` pipeline (`features/speedtest/ui/meter/canvas/meter/` — 4 dirs, repeated `meter`) gets an `index.ts` OR flattens the repeated segment (`canvas/meter/ → canvas/`) — G3 decidable |

## §2 — Binding criteria (born-RED → GREEN)

- The ASK doc is authored + the FORMULA + the per-repo alias set recorded (`proof:crossrepo-asks` no-silent-drop
  completeness — every ask names a consumer wave + a disposition).
- glass-ui runs the READ-ONLY census over speedtest at the cut (born-RED list: 3 graduation violations,
  speedtest/server 4, the 1 barrel, App.vue). The GREENING is speedtest's own edit — recorded as a consume-and-
  delete cadence, NOT executed here.

## §3 — Fences

- **Foreign-tree fence (inv-26, LITERAL).** glass-ui reads speedtest read-only; edits ZERO speedtest file. The
  by-name ask is the ONLY channel. Content-only (inv-26).
- Fold `survey` FIRST (cheapest, soft-branch, gate OUTPUT) to confirm typecheck + boundary gate + per-route bundle
  delta green BEFORE born-REDing admin/dashboard.
- `views/` stays app-global (NEVER folds). The proportion fence: `features/` is EARNED, not mandatory.

## §4 — Cross-refs

§4-PRODUCT / §4P.5 (camel-segment hard + decidable soft); §4P.13 (per-sibling instrument); §9.10; Appendix A6;
BB.W-CROSSREPO-ASKS (the relay discipline).
