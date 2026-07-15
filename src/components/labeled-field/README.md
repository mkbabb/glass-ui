# LabeledField

The labeled-control family (`@mkbabb/glass-ui/labeled-field`). A parent field chassis + four
typed wrappers that pair a `<Label>` with a control in one node — the "label above/beside the
input" register a controls column composes.

```vue
<LabeledInput label="Name" v-model="name" />
<LabeledSelect label="Preset" v-model="preset" :options="…" />
<LabeledSlider label="Blur" v-model="blur" />
<LabeledSwitch label="Dark" v-model="dark" />
```

## Exports

- **`LabeledField`** — the parent chassis (the label + control slot + the width contract).
- **`LabeledInput`** / **`LabeledSelect`** / **`LabeledSlider`** / **`LabeledSwitch`** — the four
  typed wrappers over Input / Select / Slider / Switch.

## The width contract (BA.W-CONFIG-CHASSIS)

The `.labeled-field` root claims `inline-size:100%; min-inline-size:0`, so a slotted control (a
`<Slider>` whose inner track resolves `width:100%`) has a DEFINITE width to resolve against —
never the content-sized 0 a bare `display:block` field produced inside a flex slot (the 0px-
slider collapse). The fix is at the CHASSIS, library-wide. Machine-locked by `proof:config-chassis`.
