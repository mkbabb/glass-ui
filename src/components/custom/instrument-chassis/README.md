# InstrumentChassis

The instrument-panel chassis surface (`@mkbabb/glass-ui/instrument-chassis` + the root
barrel). A bezelled glass instrument frame with groove dividers and a phase bus — the host
for a live meter/dial (a speedtest gauge, a scoring readout) that reads as a physical
instrument panel, not a flat card.

```vue
<InstrumentChassis :phase="phase">
    <template #default>
        <canvas ref="meter" />
    </template>
</InstrumentChassis>

<InstrumentChassis variant="structure">…</InstrumentChassis>  <!-- the cool-metal register -->
```

## Exports

- **`InstrumentChassis`** — the chassis surface. `variant`: the default warm-glass register,
  or `structure` (the silver cool-metal register — W-NO-GRAY's ONE sanctioned cool-neutral
  exception, a brand METAL identity).
- **`ChassisDivider`** — the groove-divider rule between chassis regions.
- **`InstrumentChassisPhase`** / **`InstrumentChassisVariant`** — the phase + variant type
  unions.

## The phase bus (BB.W-PHASE-PALETTE / N18)

The `InstrumentChassisPhase` union (`ready | ping | download | upload | jitter | complete`)
carries `"ping"` as the canonical generic-active phase (map any active-but-unspecialised
state onto it; there is no per-domain `"scoring"` member). The four active arms read a
consumer-registerable `--chart-{phase}` (with a `--viz-*` library fallback) so the bus carries
phase IDENTITY. The `complete` phase resolves `--phase-complete-color` (default `--color-gold`)
— gold is EARNED at completion, and a consumer (or any ancestor) re-inks completion by
overriding the token, no library edit. Machine-locked by `proof:phase-palette`.

## The wide-axis dial reserve — CLS≈0 (BB.W-DESKTOP-RESERVE)

The dial cell reserves its settled block extent from frame 0 on BOTH axes (a STATIC
`min-block-size` reservation, never an animated height), so the meter `<canvas>` + readout
hydrate into an already-correct envelope. The desktop dial reads
`--instrument-dial-min-block-size-desktop` (default the library's dock-adjusted dynamic-
viewport guardrail); a consumer retunes THIS token. Machine-locked by `proof:desktop-reserve`.
