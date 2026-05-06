# Consumer Evidence — `InstrumentChassis`

**Source**: `src/components/custom/instrument-chassis/`
**Originating tranche**: P (cross-repo speedtest tranche; landed in glass-ui without owning a glass-ui-side wire-or-retire pass)
**Glass-ui wire-or-retire pass**: I.W1 Lane B (this audit)
**Verdict**: **WIRE** (≥ 2 sites — 1 in-repo demo, 4 cross-repo speedtest)

## Consumers at HEAD

| # | File | Line | Site type |
|---|---|---|---|
| 1 | `demo/stories/compositions/instrument-chassis.vue` | 5-7, 20, 30, 106, 155, 195, 238, 249, 253 | in-repo demo |
| 2 | `../speedtest/src/components/speedtest/InstrumentChassisHost.vue` | 3, 12, 27, 33 | cross-repo non-demo (sole authoring host) |
| 3 | `../speedtest/src/views/SpeedtestView.vue` | 2, 6 | cross-repo view (mounts host) |
| 4 | `../speedtest/src/views/SurveyView.vue` | 3, 42, 50 | cross-repo view (direct `<InstrumentChassis>` use, `phase="ready"`) |
| 5 | `../speedtest/src/views/ThankYouView.vue` | 3, 29, 36 | cross-repo view (direct `<InstrumentChassis>` use, `phase="complete"`) |
| 6 | `../speedtest/src/__tests__/App.surveyEntry.test.ts` | 77, 78, 82 | cross-repo test (stub) |

## Verification command

```bash
rg -l 'InstrumentChassis|RegionDivider|InstrumentChassisPhase' \
   src/ demo/ \
   ../speedtest/src 2>/dev/null
```

## Public API surface used

- `InstrumentChassis` (default export from `./InstrumentChassis.vue`)
  - Props: `phase` (`InstrumentChassisPhase` — `"ready" | "running" | "complete"`)
  - Slots: default region content (consumed by both speedtest views and demo composition)
- `RegionDivider` (default export from `./RegionDivider.vue`)
  - Props: `orientation` (`"horizontal" | "vertical"`)
- `InstrumentChassisPhase` type — consumed by demo for `phase` ref + `needleAngle` switch
- Subpath import: `@mkbabb/glass-ui/instrument-chassis` (consumed by speedtest)

## Notes

- 4 distinct cross-repo files import directly from `@mkbabb/glass-ui/instrument-chassis`; this is well past the ≥ 2 bar.
- The demo story at `demo/stories/compositions/instrument-chassis.vue` consumes both `InstrumentChassis` + `RegionDivider` + the `InstrumentChassisPhase` type — exercises the full public surface.
- The speedtest `InstrumentChassisHost.vue` is the canonical compose-the-experience caller; the two non-host views (`SurveyView.vue`, `ThankYouView.vue`) demonstrate that direct usage outside a host is also a real pattern.
- No retirement risk; this is an actively-consumed cross-repo primitive.
