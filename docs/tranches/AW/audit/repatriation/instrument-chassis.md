# instrument-chassis (InstrumentChassis + ChassisDivider) — KEEP-SHARED verdict

Family dir: `src/components/custom/instrument-chassis/` — `InstrumentChassis.vue`,
`ChassisDivider.vue` (NOTE: the brief calls the divider `RegionDivider`; that name was
renamed → `ChassisDivider` at AI.W1-γ, per `ChassisDivider.vue:21-24` read today. The
barrel `index.ts:1-6` exports `InstrumentChassis`, `ChassisDivider`,
`InstrumentChassisPhase`, `InstrumentChassisVariant` — there is no `RegionDivider` symbol at
HEAD).

## Consumer census

Real import + render (and live type-import) sites grepped today across all 6 consumer repos
+ glass-ui's own `src/` and `demo/`. Stale doc-comments, test mocks, and barrel re-exports
are excluded from render-count but noted.

| repo | file:line | symbol | render-count | class |
|------|-----------|--------|--------------|-------|
| speedtest | `src/App.vue:237` (import), `:88-136` (`<InstrumentChassis :variant :phase>`) | InstrumentChassis | 1 | a |
| speedtest | `src/views/MapView.vue:53` (import), `:20-45` (`<InstrumentChassis>`) | InstrumentChassis | 1 | a |
| speedtest | `src/views/ChartsView.vue:131` (import), `:50-77` + `:86-118` | InstrumentChassis | 2 | a |
| speedtest | `src/composables/useRouteTransition.ts:32-34` (type-import `InstrumentChassisPhase`/`Variant`) | types | 0 (type) | a |
| **muster** | `frontend/src/App.vue:31` (import), `:215-437` (`<InstrumentChassis variant="spine">`) | InstrumentChassis | 1 | **b** |
| **muster** | `frontend/src/components/verdict/WinnerHero.vue:46` (import), `:164` + `:185` (`variant="glass"`) | InstrumentChassis | 2 | **b** |
| **muster** | `frontend/src/components/shell/InstrumentAside.vue:17` (import), `:58`+`:63`+`:68` | ChassisDivider | 3 | **b** |
| **muster** | `frontend/src/composables/useMusterApp.ts:33` (type-import `InstrumentChassisPhase`) | type | 0 (type) | **b** |
| **muster** | `frontend/src/components/shell/VerdictStage.vue:11` (type-import) | type | 0 (type) | **b** |
| **muster** | `frontend/src/components/verdict/WinnerHero.vue:47` (type-import) | type | 0 (type) | **b** |
| fourier-analysis | — | — | 0 | — (no hits) |
| value.js | — | — | 0 | — (no hits) |
| keyframes.js | — | — | 0 | — (no hits) |
| words | — | — | 0 | — (no hits) |
| glass-ui internal | `src/components/custom/dock/GlassDock.vue:23-39,121,139` | (variant string `"instrument-strip"` + doc-comment) | 0 | **NOT a consumer** |
| glass-ui internal | `src/components/custom/instrument-rail/InstrumentRail.vue:12,23` | (doc-comment only) | 0 | **NOT a consumer** |
| glass-ui demo | `demo/stories/compositions/instrument-chassis.vue:5-8,155,195,249` | InstrumentChassis + ChassisDivider | 4 | d |
| glass-ui demo | `demo/stories/foundations/chart-chassis-palette.vue:15,103-113` | InstrumentChassis | 1 | d |
| glass-ui barrels | `src/index.ts:118`, `src/api/index.ts:88`, `src/subpaths/instrument-chassis.ts:1` | re-export | 0 | barrel |

Speedtest non-render hits (excluded): `MeterColumn.vue:420`, `SpeedtestResults.vue` (×5),
`SurveyWizard.vue:3`, `ThankYou.vue:4` are doc-comments referencing the App-level chassis;
`src/__tests__/App.surveyEntry.test.ts:92-98` + `tests-e2e/*` are test mocks/probes.

## Verdict + rationale

**KEEP-SHARED.** The brief's KEY question — "does glass-ui compose it internally via GlassDock
variant=instrument-strip?" — resolves NO at HEAD: `GlassDock.vue` neither imports nor renders
`<InstrumentChassis>`. The `variant="instrument-strip"` is a STRING that MIMICS the chassis CSS
vocabulary (`GlassDock.vue:28-35` — "adopts the `<InstrumentChassis>` family's surface
vocabulary ... matching `InstrumentChassis::before`"); it is CSS-look mimicry, not a class-(c)
internal composition. `InstrumentRail.vue` likewise only name-drops the chassis in a doc-comment.
So the earlier-audit "consumed internally by glass-ui" claim is FALSE at HEAD — there is no
class-(c) consumer.

However, the repatriation is blocked anyway by a class-(b) GENERIC consumer: **muster**
(a multi-source-comparison frontend, NOT speedtest) is a heavy, live consumer — App.vue mounts
`<InstrumentChassis variant="spine">` as its App shell (`App.vue:215-437`), WinnerHero renders
two `variant="glass"` panels (`:164`, `:185`), and InstrumentAside renders three
`<ChassisDivider>` separators (`:58/:63/:68`). All verified as live, prop-bound elements today,
backed by real imports from `@mkbabb/glass-ui/instrument-chassis` and a `^3.1.0` pin. The
`variant="spine"` register (`InstrumentChassis.vue:23-33`) was authored precisely for these
App-level housing mounts that BOTH speedtest and muster share.

The component is therefore NOT bespoke to the speed-test instrument domain: its phase union
(`ready|ping|download|upload|jitter|complete`) and its glass/spine variant axis are consumed
by a non-speedtest app for an entirely different domain (vote/verdict comparison). It is a
generic instrument-housing chassis with ≥2 genuine generic consumers (speedtest + muster).
The user's specificity lens does NOT trip here — unlike metric-cell/metric-stack which
hard-reference speedtest by name, InstrumentChassis carries no speedtest-name reference in
its source. KEEP-SHARED under the >=2-genuine-generic-consumer invariant.

## Move plan

None. Family stays in glass-ui:
`src/components/custom/instrument-chassis/`, subpath `@mkbabb/glass-ui/instrument-chassis`
(`src/subpaths/instrument-chassis.ts`), root-barrel re-export (`src/index.ts:118`), api entry
(`src/api/index.ts:88` — `InstrumentChassisPhase`), `package.json` `./instrument-chassis`
export. No dir/subpath/api/export change.

## Blocking coordination

**muster is the hard block on any repatriation.** Even if speedtest's chassis usage were the
only OTHER consumer, muster's 6 render/type sites (App shell + WinnerHero ×2 + InstrumentAside
×3, plus 3 type-imports) would have to be re-homed or muster would lose its App-level housing
chassis. Because muster is a distinct generic domain, repatriating to speedtest is not even a
SPLIT candidate — there is no speedtest-only skin to carve off; both apps use the same
glass+spine variants and the same phase cascade. The `variant="spine"` housing register
specifically serves the cross-app App-level-mount use case. No coordination is needed for the
KEEP decision; flagged here as the reason repatriation is off the table.

## Summary

1. Verdict: **KEEP-SHARED** — no move.
2. Family = `InstrumentChassis` + `ChassisDivider` (the brief's "RegionDivider" was renamed at AI.W1-γ; no such symbol at HEAD).
3. The brief's KEY claim is FALSE at HEAD: GlassDock does NOT import/render InstrumentChassis — `variant="instrument-strip"` is CSS-vocabulary mimicry only (`GlassDock.vue:23-39`). InstrumentRail only doc-comments it. No class-(c) internal consumer.
4. But repatriation is blocked by a genuine class-(b) consumer: **muster** (non-speedtest) renders `<InstrumentChassis variant="spine">` as its App shell + `variant="glass"` ×2 in WinnerHero + `<ChassisDivider>` ×3 in InstrumentAside, all live + prop-bound today.
5. speedtest renders it 4× (App.vue, MapView, ChartsView ×2) — class (a).
6. fourier-analysis / value.js / keyframes.js / words: zero hits.
7. Two glass-ui demo stories render it (class d) — non-counting.
8. Component is NOT bespoke to speedtest: no speedtest-name reference in source; phase union + glass/spine axis serve muster's distinct vote/verdict domain.
9. The `variant="spine"` register exists for the App-level housing mount shared by BOTH speedtest and muster — a cross-app generic use case.
10. Not a SPLIT candidate either: no speedtest-only skin to carve; both apps use identical variants + phase cascade. >=2 genuine generic consumers ⇒ stays in the shared library.

Digest path: `/Users/mkbabb/Programming/glass-ui/docs/tranches/AW/audit/repatriation/instrument-chassis.md`
