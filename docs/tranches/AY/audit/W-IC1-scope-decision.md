# AY.W-IC1 — Instrument-chassis family scope decision

The instrument-chassis FAMILY has two members on the public surface with **asymmetric
consumer support**. This doc settles each against the ≥2-consumer bar (L invariant 8 /
the overfitting-audit canon) with the ACTUAL HEAD consumer graph, picks the
`InstrumentRail` disposition, and dismisses the seed's "slides removal" premise as moot.

## Per-member consumer graph (re-run greps, 2026-06-10, at `tranche/AY` HEAD)

### Member 1 — `InstrumentChassis` (+ `ChassisDivider`, `InstrumentChassisPhase`, `InstrumentChassisVariant`)

CLEARS the ≥2-consumer bar decisively.

- **Binary consumer (speedtest):** 4+ live `@mkbabb/glass-ui/instrument-chassis` import sites —
  `speedtest/src/App.vue`, `speedtest/src/composables/useRouteTransition.ts`,
  `speedtest/src/views/ChartsView.vue`, `speedtest/src/views/MapView.vue` (+ a test
  `App.surveyEntry.test.ts`). The chassis is the App shell, not decorative.
- **Demo:** `demo/stories/compositions/instrument-chassis.vue` + `demo/stories/foundations/chart-chassis-palette.vue`.
- **Tests:** `tests/components/custom/instrument-chassis/InstrumentChassis.phase-canon.test.ts` +
  `InstrumentChassis.spine-variant.test.ts`.
- **Public surface:** root barrel (`src/index.ts`), `/instrument-chassis` subpath, `/api` (`InstrumentChassisPhase`).

**Verdict: KEEP** (≥2 distinct usage sites — speedtest binary + demo + tests).

### Member 2 — `InstrumentRail`

FAILS the ≥2-consumer bar at HEAD.

- **No binary consumer.** Speedtest DELETED its `InstrumentRail` branch
  (`SurveyWizard.vue` / `SurveyResultDock.vue` carry only COMMENTS documenting the
  deleted two-pane cockpit; AN-D6/D7/D11). Re-grep confirms ZERO live `<InstrumentRail>`
  mount or `from "@mkbabb/glass-ui/instrument-rail"` import in `speedtest/src`.
- **One live consumer, demo-only:** `demo/stories/compositions/instrument-rail.vue` (the sole
  `<InstrumentRail>` mount, on the relative `../../../src/...` path). `demo/stories/dock/rail.vue`
  mentions it only inside a `<code>` block (documentation, not a mount).
- **Zero tests** (`tests/components/custom/instrument-rail/` does not exist).
- **Not in `/api`** (`InstrumentRail` absent from `src/api/index.ts`).
- **Public surface (at HEAD, before this wave):** root barrel (`src/index.ts:118`) +
  `/instrument-rail` subpath (`package.json` + `src/subpaths/instrument-rail.ts`).

No `docs/consumer-evidence/instrument-rail.md` exists, so a `keep-current` (1-site-with-value)
disposition is unjustified by the canon.

**Verdict: demo-only-private → Disposition A (RETIRE from the public surface).**

## The slides premise — DISMISSED as moot

The seed framed this row as "slides-side removal vs glass-ui retention." Slides imports
NEITHER family member — the one slides hit is an audit doc
(`slides/docs/audits/runs/2026-06-04-style-union/f-glassui-demo-union.md`), not a consumer.
The real ≥2-consumer question is `InstrumentRail` (the speedtest-deleted member), not the
slides angle.

## Disposition A — RETIRE `InstrumentRail` to demo-private (the default, chosen)

No binary consumer + one demo + no evidence doc → retire from the PUBLIC surface, clean break
(no alias, no shim — slides/speedtest never imported the rail subpath, so there is no consumer
to migrate). The library edits:

1. `src/index.ts` — DELETE `export * from "./components/custom/instrument-rail";` (the root-barrel re-export).
2. `src/subpaths/instrument-rail.ts` — DELETE the file (the subpath mirror barrel).
3. `package.json` — DELETE the `typesVersions["*"]["instrument-rail"]` block + the `"./instrument-rail"` exports block.

The component file (`src/components/custom/instrument-rail/`) + the demo story STAY: the demo
keeps importing it on the relative `../../../src/...` path — it is a demo-private primitive now,
not a shipped one. `dist/instrument-rail.{js,d.ts}` stops emitting (the build-diff deletion proof);
`dist/instrument-chassis.{js,d.ts}` still emit (the retained member).

## Machine lock — `proof:instrument-scope`

`scripts/proof-instrument-scope.mjs` binds both members so neither drifts:

- **Clause 1 (CHASSIS-RETAINED):** `InstrumentChassis` + `ChassisDivider` re-exported from
  `instrument-chassis/index.ts`, the `/instrument-chassis` subpath present, and ≥1 binary
  consumer found via the speedtest consumer-walk (a LOGGED skip if speedtest is absent, never a
  silent pass).
- **Clause 2 (RAIL-DISPOSITION, Arm A):** the public surface does NOT carry `InstrumentRail`
  (no `instrument-rail` in `src/index.ts`, no `src/subpaths/instrument-rail.ts`, no
  `./instrument-rail` exports block in `package.json`) AND the demo story
  `demo/stories/compositions/instrument-rail.vue` still resolves (the demo-private consumer
  survives — deleting it would orphan the component below the substrate floor).

Bite: re-add the root-barrel re-export with no evidence doc → RED; delete the demo story leaving
the component orphaned → RED; drop the `/instrument-chassis` subpath or its last binary consumer → RED.
