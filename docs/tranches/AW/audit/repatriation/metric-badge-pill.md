# metric-badge (MetricBadge) + metric-pill (MetricPill) — KEEP-SHARED verdict

MetricBadge is a GENERIC inline value+unit pill primitive with THREE genuine consumer classes (speedtest + fourier-analysis + muster) — it is the textbook ≥2-generic-consumer keep case, not overfit speedtest substrate. MetricPill is a thin glass-ui-internal stacked-default skin over MetricBadge with ZERO external consumers (a demo-story-only surface) — it does not repatriate (there is nowhere to repatriate it TO; speedtest never consumes it), but it is a separate overfit-prune question flagged below. **The earlier constellation audit's claim that metric-cell composes MetricBadge is FALSE at HEAD** — metric-cell and metric-stack are standalone (neither imports MetricBadge), so the "if metric-cell repatriates does MetricBadge go with it" branch is moot: MetricBadge has no compositional coupling to the repatriating metric-cell/stack families.

## Consumer census — MetricBadge (`@mkbabb/glass-ui/metric-badge`)

| repo | file:line (import) | render sites | render-count | class |
|------|--------------------|--------------|--------------|-------|
| speedtest | `src/components/survey/SurveyResultDock.vue:154` | `SurveyResultDock.vue:59` (`v-for` over `registry.visible`) | 2 tags (1 is the result-pill loop) | **a** (speedtest) |
| fourier-analysis | `web/src/components/visualization/EditorControlsDock.vue:5` | `EditorControlsDock.vue:113` | 1 | **b** (generic app) |
| fourier-analysis | `web/src/components/visualization/EquationPanel.vue:12` | `EquationPanel.vue:77` | 1 | **b** |
| fourier-analysis | `web/src/components/visualization/AnimationControls.vue:10` | `AnimationControls.vue:75` | 1 | **b** |
| fourier-analysis | `web/src/components/visualization/gallery/GalleryAdminBanner.vue:5` | `GalleryAdminBanner.vue:45,52,60,68,75,82` | 6 | **b** |
| fourier-analysis | `web/src/components/visualization/gallery/GalleryDraftsSection.vue:8` | `GalleryDraftsSection.vue:58` | 1 | **b** |
| fourier-analysis | `web/src/components/equation/EquationView.vue:10` | `EquationView.vue:292` | 1 | **b** |
| fourier-analysis | `web/src/components/equation/InfoCard.vue:4` | `InfoCard.vue:31` | 1 | **b** |
| muster | `frontend/src/components/verdict/WinnerHero.vue:48` | `WinnerHero.vue:224` (`size="xl"` hero score) | 1 | **b** |
| muster | `frontend/src/components/dock/CommandDock.vue:42` | `CommandDock.vue:158,161,167,175` | 4 | **b** |
| glass-ui (internal) | `src/components/ui/metric-pill/MetricPill.vue:4` | `MetricPill.vue:55` | 1 | **c** (glass-ui-internal: MetricPill composes it) |
| glass-ui (demo) | `demo/stories/primitives/metric-badge.vue` + `compositions/instrument-chassis.vue` + `compositions/dashboard.vue` | story renders | — | **d** (demo only) |

Render-count totals: fourier-analysis **13** tags across 7 files, muster **6** tags across 2 files, speedtest **2** tags in 1 file. MetricBadge ships ONLY via the `/metric-badge` subpath (no root-barrel re-export; not in `api/index.ts`) — every external import above is the real `import { MetricBadge } from "@mkbabb/glass-ui/metric-badge"` line, not a barrel alias or stale comment.

## Consumer census — MetricPill (root barrel `@mkbabb/glass-ui`)

| repo | file:line | symbol | render-count | class |
|------|-----------|--------|--------------|-------|
| glass-ui (demo) | `demo/stories/primitives/metric-pill.vue:3` | `import { MetricPill } from "../../../src/components/ui/metric-pill"` | 12 story tags | **d** (demo only) |
| — every consumer repo (speedtest/fourier/value.js/keyframes/muster/words) | — | — | **0** | — |

No consumer imports glass-ui's `MetricPill`. The speedtest hits for `MetricPill` are RED HERRINGS: `MetricPillCluster` is a RETIRED speedtest-LOCAL component (no `.vue` file at HEAD — survives only in test comments `App.surveyEntry.test.ts:136`, `metric-format.ts:160`), and `.metric-pill-stack` (`SpeedtestResults.vue:149,161,221,248`) is a speedtest-LOCAL CSS layout class, not the glass-ui `<MetricPill>` component. MetricPill has NO subpath, NO `api/` entry, NO `package.json` export — it reaches consumers only through `ui/index.ts:20` → root barrel `src/index.ts:95`.

## Verdict + rationale

**MetricBadge → KEEP-SHARED (decisive).** It is a generic inline value+unit pill — fourier-analysis renders it for magnet-radius/equation-count/animation-speed/gallery-stats readouts (13 tags, 7 files, ZERO speedtest-domain coupling), muster for a verdict hero-score (`size="xl"`) and command-dock vote counts (6 tags). Three genuine app consumer classes (b ×2 apps + a) plus a glass-ui-internal compositor (c, MetricPill). The component carries no speed-test vocabulary in its props (`amount`/`unit`/`label`/`abbreviation`/`color`/`size`/`labelPosition`) — it is domain-neutral by construction. This is the canonical ≥2-generic-consumer keep; repatriating it to speedtest would BREAK fourier-analysis (7 files) and muster (2 files), which is a hard block, not a coordination cost.

**The "metric-cell composes MetricBadge → goes with it" branch is MOOT.** Verified at HEAD: `metric-cell/MetricCell.vue` imports only `vue` + `cn` (`MetricCell.vue:2-4`); `metric-stack/{MetricStack,MetricRow}.vue` import only `vue` + `cn` (`:2-4` each). Neither composes MetricBadge or AnimatedDigit. The earlier constellation digest's premise (`docs/tranches/AW/audit/constellation/speedtest-components-origin.md`) never claimed this coupling for metric-cell, and the directive's framing is the one inaccuracy — there is no compositional thread tying MetricBadge to the repatriating metric-cell/stack families. MetricBadge's ONLY internal glass-ui consumer is MetricPill (`MetricPill.vue:55`). So even if metric-cell + metric-stack repatriate to speedtest, **MetricBadge stays in glass-ui untouched** — fourier-analysis and muster keep consuming it over the unchanged `/metric-badge` subpath.

**MetricPill → NOT a repatriation target, but a SEPARATE overfit-prune flag.** MetricPill cannot repatriate to speedtest because speedtest never consumes it (the only `MetricPill` references in speedtest are the retired-local `MetricPillCluster` and the local `.metric-pill-stack` CSS class — neither is this component). Its sole render site anywhere is the glass-ui demo story (`primitives/metric-pill.vue`, 12 tags) — a class-d demo-only surface. Under glass-ui's own ≥2-genuine-consumer invariant (a demo is NOT a genuine 2nd consumer), MetricPill is overfit substrate that should be PRUNED from glass-ui (delete `ui/metric-pill/` + its root-barrel re-export + the demo story), NOT moved to speedtest. Its self-described purpose — "the speedtest stacked-pill default" (`MetricPill.vue:8`) — is a stale credit: speedtest's stacked pills route through MetricBadge directly (`SurveyResultDock.vue:59`, `label-position`/`abbreviation`), never through MetricPill. This prune is in-scope for the AW overfit-audit band but is a glass-ui-internal cleanup with zero consumer coordination (no external import to break).

## Move plan

**MetricBadge: NO MOVE.** Stays in glass-ui at `src/components/custom/metric-badge/`, ships via `/metric-badge` subpath unchanged. No speedtest import rewrite — speedtest keeps `import { MetricBadge } from "@mkbabb/glass-ui/metric-badge"` (`SurveyResultDock.vue:154`). fourier-analysis (7 files) + muster (2 files) likewise unchanged.

**MetricPill: glass-ui-internal PRUNE (not a speedtest move).** If the AW overfit pass elects to prune:
- Delete `src/components/ui/metric-pill/` (dir + `MetricPill.vue` + `index.ts`).
- Remove the re-export `export * from "./metric-pill";` (`src/components/ui/index.ts:20`) and `export * from "./components/ui/metric-pill";` (`src/index.ts:95`).
- Delete the demo story `demo/stories/primitives/metric-pill.vue` + its `demo/stories/manifest.ts` entry.
- Optionally retire the MetricPill density CSS comment block in `src/styles/utilities.css:470` (the `.metric-pill` density modifiers — verify no `.metric-pill` class is referenced by any consumer first; the badge `.metric-badge` utilities at `:364+` STAY, they are MetricBadge's, consumed by all three apps).
- No `package.json`/`api/`/subpath edits — MetricPill was never published on any of those surfaces.
- No speedtest landing site: speedtest does not consume MetricPill, so nothing lands native there.

## Blocking coordination

**MetricBadge KEEP is BLOCKED-FROM-REPATRIATION by two genuine non-speedtest apps** — fourier-analysis (7 files / 13 renders) and muster (2 files / 6 renders) both pin glass-ui and import MetricBadge over `/metric-badge`. Any attempt to remove MetricBadge from glass-ui would force re-forking it into both apps. This is not a coordination cost to manage — it is a hard KEEP signal: the component has clearly outgrown its speedtest origin and is now a generic design-system primitive.

**MetricPill prune has NO coordination cost** — zero external consumers, demo-only. The only care item: confirm no consumer references the `.metric-pill` CSS class (grep showed only speedtest's unrelated `.metric-pill-stack` local class) before retiring the `utilities.css:470` block.

**No drift risk on the MetricBadge surface.** All three apps bind only the stable prop set (`amount`/`unit`/`label`/`abbreviation`/`color`/`size`/`labelPosition`/`placeholder`/`class`); a future glass-ui version bump is type-safe for them.

## Summary

MetricBadge is KEEP-SHARED — a generic inline value+unit pill with three genuine consumer classes: speedtest (`SurveyResultDock.vue:154,59`, 2 tags), fourier-analysis (7 files, 13 tags — magnet-radius/equation/animation/gallery readouts, zero speed-test coupling), and muster (`WinnerHero.vue:224` hero score + `CommandDock.vue` vote counts, 6 tags). It ships only via the `/metric-badge` subpath; its props carry no speed-test vocabulary; it is domain-neutral by construction. Repatriating it would break fourier-analysis and muster — a hard block, the textbook ≥2-generic-consumer keep. The directive's "metric-cell composes MetricBadge, does it go with it?" branch is MOOT: verified at HEAD, metric-cell and metric-stack import only vue+cn and do NOT compose MetricBadge — its sole internal glass-ui consumer is MetricPill. So even if metric-cell/stack repatriate, MetricBadge stays put, untouched. MetricPill is a separate matter: it is a thin glass-ui-internal stacked-default skin over MetricBadge with ZERO external consumers (the speedtest `MetricPillCluster`/`.metric-pill-stack` hits are a retired-local component and a local CSS class, not this component) — its only render site is the glass-ui demo story (12 tags, class-d). MetricPill cannot repatriate (speedtest never consumes it) but is overfit demo-only substrate that should be PRUNED from glass-ui (delete `ui/metric-pill/` + root-barrel re-export + demo story; zero consumer coordination). The `.metric-badge` CSS utilities (`utilities.css:364+`) STAY — they belong to MetricBadge and are consumed by all three apps.

Digest path: /Users/mkbabb/Programming/glass-ui/docs/tranches/AW/audit/repatriation/metric-badge-pill.md
