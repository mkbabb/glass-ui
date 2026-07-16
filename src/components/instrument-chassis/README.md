# InstrumentChassis

One landmark-neutral physical instrument sleeve at
`@mkbabb/glass-ui/instrument-chassis`.

```vue
<InstrumentChassis
    state="active"
    tone="var(--accent)"
    proportion="golden"
    :boundaries="['stage-inspector', 'inspector-action']"
>
    <template #stage>Specimen</template>
    <template #inspector>Controls</template>
    <template #action>Actions</template>
</InstrumentChassis>
```

`stage` is the primary region. `inspector` and `action` render only when supplied.
Wide compositions use the exact golden or preview-dominant ratio; narrow hosts keep
stage → inspector → action document order. An absent inspector gives stage the full
width.

Boundaries and reserves are explicit and default to none. The sleeve publishes one spacing
tuple: `--instrument-dial-padding-inline`, `--instrument-dial-padding-block`, and
`--instrument-dial-gap` govern the stage/inspector composition; the corresponding
`--instrument-control-padding-inline`, `--instrument-control-padding-block`, and
`--instrument-control-gap` properties govern the action region. The separate inherited
`--instrument-title-gap` defaults to the dial inline padding divided by `2.618` for consumer title
pairs; it is not another region-spacing value. The sleeve owns no universal minimum block size.
When stable physical space is required, consumers opt into `stage`, `inspector`, or `both` reserve
and supply `--instrument-stage-reserve` or `--instrument-inspector-reserve`; the component never
derives either value from a viewport or dock.

The component emits no landmark, title, interaction, product phase, or brand meaning.
Consumers own all region semantics and map their domain state to `ready`, `active`,
`complete`, or `loading`.
