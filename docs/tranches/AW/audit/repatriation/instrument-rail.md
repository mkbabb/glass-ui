# instrument-rail — ORPHAN (PRUNE) verdict

Not a repatriation. `InstrumentRail` has **zero genuine consumers** anywhere in the constellation — no render in any of the 6 consumer apps, no glass-ui internal composition, no glass-ui demo story. Its single historical consumer (speedtest `SurveyWizard.vue`) **deleted** the rail at AN-D6/D7/D11 ("retired entirely, deletion-favoring, no legacy code left behind"). The component is dead substrate-without-consumer and should be **pruned from glass-ui**, not moved to speedtest.

## Family symbols

- `InstrumentRail` (default export, `InstrumentRail.vue`)
- `InstrumentRailProps` (type)

Sources: `src/components/custom/instrument-rail/index.ts:1-2` (read today).

## Consumer census

| repo | file:line | symbol | render-count | class |
|------|-----------|--------|--------------|-------|
| glass-ui | `src/index.ts:119` (`export * from "./components/custom/instrument-rail"`) | barrel re-export | n/a (re-export, not render) | — |
| glass-ui | `src/subpaths/instrument-rail.ts:1` (`export * from "../components/custom/instrument-rail"`) | subpath barrel | n/a (re-export) | — |
| glass-ui | `src/components/custom/instrument-chassis/InstrumentChassis.vue:45` | — | 0 (doc-comment only: "idiom InstrumentRail established") | d (comment) |
| glass-ui | `package.json:103-104,373-375` (`./instrument-rail` export + `typesVersions`) | export entry | n/a | — |
| glass-ui | `src/api/index.ts` | — | 0 (NO api entry — grep empty) | — |
| glass-ui | `demo/**` | — | 0 (NO `<InstrumentRail` render in any story) | — |
| speedtest | `src/components/survey/SurveyWizard.vue:14,22,252,409` | — | 0 (all 4 are stale comments documenting the RETIRED rail posture; AN-D6/D7/D11) | d (comment) |
| speedtest | `src/components/survey/SurveyResultDock.vue:41` | — | 0 (stale comment) | d (comment) |
| speedtest | `docs/**` (9 audit/spec hits) | — | 0 (audit prose only) | d (docs) |
| fourier-analysis | — | — | 0 (grep empty) | — |
| value.js | `docs/tranches/G/audit/G-PEER-GLASS-UI.md:62,133` | — | 0 (audit explicitly: "Zero imports of `@mkbabb/glass-ui/instrument-rail`"; "no consumer surface for cockpit-ratio rails") | d (docs) |
| keyframes.js | — | — | 0 (grep empty) | — |
| muster | — | — | 0 (grep empty) | — |
| words | — | — | 0 (grep empty) | — |

Method: grepped `InstrumentRail` + `instrument-rail` + `glass-ui/instrument-rail` + `<InstrumentRail` across all 6 consumer `src/`/`web/src/`/`frontend/src/`/`demo/`/`package.json` and glass-ui `src/`+`demo/`, today. Verified each hit by reading the surrounding lines: every non-barrel match is a comment, audit-doc, or retired-posture annotation — there is not a single `<InstrumentRail` template tag or `import { InstrumentRail }` import anywhere in the constellation.

## Verdict + rationale

**ORPHAN — PRUNE (not repatriate).**

1. **No genuine consumer of any class (a/b/c/d-as-render).** Zero speedtest renders, zero non-speedtest app renders, zero glass-ui internal composition, zero demo-story renders. The `InstrumentChassis.vue:45` mention is a prose doc-comment ("the idiom InstrumentRail established"), not a `<InstrumentRail>` composition — InstrumentChassis does not render the rail.
2. **Its only-ever consumer deleted it.** speedtest authored the rail (AK-W2-α) then retired the entire two-pane cockpit posture at AN-D6/D7/D11 — `SurveyWizard.vue:22-23`: "The `InstrumentRail` branch and `isDesktopCockpit` dock split are retired entirely (deletion-favoring, no legacy code left behind)." speedtest now renders a single-column horizontal dock hat with no rail.
3. **Repatriation does not apply.** Repatriation moves a live speedtest-domain component back to speedtest. speedtest does not consume this — moving it native to speedtest would re-introduce dead code speedtest deliberately deleted. The correct action is to PRUNE it from glass-ui under the L invariant 8 / J invariant 10 substrate-without-consumer-binary rule.
4. **The component is also speedtest-domain-specific** (cockpit-ratio instrument rail, 1/φ² flex-basis, chassis-bezel hairlines — authored for the speedtest survey cockpit per A3 §8.T-1), so even if a future consumer wanted it, it is bespoke instrument-domain substrate. But the operative fact is it has **no consumer at all**.

## Prune plan (what leaves glass-ui)

Since there is no consumer in speedtest or elsewhere, nothing lands native — this is a clean deletion:

- **dir:** delete `src/components/custom/instrument-rail/` (`InstrumentRail.vue` + `index.ts`).
- **CSS:** delete `src/styles/instrument-rail.css` (the only `container-type` in `src/styles/` per `docs/constellation/next/audit/A1-glass-ui.md:56`); remove its `@import` from `src/styles/index.css`.
- **root barrel:** remove `src/index.ts:119` (`export * from "./components/custom/instrument-rail"`) and trim the `instrument-rail` mention in the header comment at `src/index.ts:53`.
- **subpath barrel:** delete `src/subpaths/instrument-rail.ts`.
- **package.json:** remove the `./instrument-rail` export entry (`package.json:373-375`) and its `typesVersions["*"]` entry (`package.json:103-104`).
- **api/:** no change — `instrument-rail` has no `src/api/index.ts` entry (already absent).
- **speedtest:** **no import rewrites** — speedtest holds zero live imports/renders. Optional hygiene only: scrub the stale `InstrumentRail` comments in `SurveyWizard.vue` (lines 14, 22, 252, 409) and `SurveyResultDock.vue:41` that reference the deleted posture, but these are non-blocking prose and out of scope for this read-only audit.

## Blocking coordination

**None.** No non-speedtest consumer (fourier/value.js/keyframes/muster/words) imports or renders `InstrumentRail` — the value.js G-tranche peer audit explicitly recorded zero imports and "no consumer surface for cockpit-ratio rails." The pruning is unblocked across the full constellation. The `./instrument-rail` subpath removal is a clean break (no migration shim per the no-backwards-compat invariant); since there are zero importers, no consumer release coordination is required.

## Summary

1. `InstrumentRail` (cockpit-ratio rail, AK-W2-α) is an **ORPHAN** — verdict PRUNE, not repatriate.
2. Zero `<InstrumentRail>` renders and zero `import`s exist anywhere in the 6-consumer constellation + glass-ui internal + glass-ui demo (grep'd today).
3. Its only-ever consumer, speedtest `SurveyWizard.vue`, **deleted** the rail posture at AN-D6/D7/D11 ("retired entirely, no legacy code left behind").
4. All remaining `InstrumentRail` mentions are stale comments (SurveyWizard, SurveyResultDock, InstrumentChassis.vue:45) or audit/spec prose.
5. value.js's G-PEER audit explicitly confirms zero `/instrument-rail` imports and no cockpit-rail consumer surface.
6. glass-ui internal: InstrumentChassis does NOT compose the rail — the `:45` hit is a doc-comment, not a render.
7. There is no api/ entry; the component is exposed only via root barrel + `/instrument-rail` subpath + package.json export.
8. Repatriation is inapplicable — moving it native to speedtest would re-introduce code speedtest intentionally removed.
9. Prune scope: the dir, `instrument-rail.css`, the root-barrel line, the subpath barrel, and the package.json `./instrument-rail` + typesVersions entries; clean break (no shim).
10. No blocking coordination — no non-speedtest consumer is affected; the subpath removal has zero importers.

Digest path: /Users/mkbabb/Programming/glass-ui/docs/tranches/AW/audit/repatriation/instrument-rail.md
