# BD viz — the per-viz ROBUST CONFIGURATOR pattern (`<VizStudio>` + the control taxonomy)

**Lane** BD viz-research · **Status** AUTHORED 2026-06-22 · **Branch** prototype/liquid-dock ·
**Scope** PLANNING/RESEARCH ONLY — zero `src/` edits ·
**Grounded against** `src/components/custom/configurator/{Configurator,ConfiguratorLayer,ConfiguratorRow}.vue`
+ `useConfiguratorState.ts` + `density.ts` · `demo/stories/substrates/blob.vue` (the robust reference) +
`dot-flow-field.vue` (the thin straggler) · the BD audit `configurator-interactivity-state.md` (the 10-viz
matrix) + the framework `emotional-states.md` (the `useEmotionalState` adapter) + `birthdaycolor-interactivity.md`
(the play discipline) ·
**Reads with** `arch/shared-field-engine.md` (the substrate handle) · `audit/substrate-consolidation.md`.

> The user edict (binding): *"each viz gets a robust configurator + full mouse/keyboard interactivity +
> birthdaycolor-like play."* The audit found **5 robust / 3 thin / 2 none**. This doc designs the ONE
> configurator pattern every viz exposes — the control taxonomy, the preset/clone discipline, the live-edit
> seam, and the `<VizStudio>` chassis that ENDS the robust-vs-thin split. No new engine; a thin chassis over
> the shipped `<Configurator>` + `useConfiguratorState`, DRY across all 10.

---

## 0. TL;DR

- **The gap is studio-vs-surface, not surface.** Every viz already has a `~30-field <Viz>Config` interface
  passed WHOLE to the renderer. The thin three (`dot-flow-field`/`dot-matrix`/`goo-dot-matrix`) expose 3
  Switches over it; the robust five hand-author 21-34 `ConfiguratorRow`s. The fix is NOT new config surface
  — it is a SHARED chassis that turns a config schema into a studio.
- **Mint `<VizStudio>`** (demo-private chassis, `demo/stories/substrates/_shared/`) — the ONE pattern: stage
  slot + `<Configurator>` aside + a SCHEMA-DRIVEN control fan. Every viz studio COMPOSES it; the 10 studios
  collapse to `<VizStudio :schema :presets :config>` + the stage.
- **The control taxonomy is FOUR groups** (the universal viz spine): **Emotion · Field · Color · Motion**,
  with a per-viz **Specifics** group. The four map to `useEmotionalState`'s adapter axes, so the emotion
  group is ONE select that re-seeds the whole config.
- **`useConfiguratorState` is the ONE state idiom** — `cloneMode: "per-preset"` is the studio default (a
  preset is a named editable baseline). Retire concentric's hand-rolled `reactive<ConcentricConfig>` and the
  thin-three's `reactive(...)` + `Object.assign` preset-swap onto it (clean break, no alias).
- **Live-edit is the existing reactive→atom watcher seam** (blob's D1/D2 watchers): a `VizConfigSchema`
  declares each field's `{group, control, min/max/step, label}`, and `<VizStudio>` renders the row + binds
  `v-model` to `state.config[field]` — the renderer's existing whole-config watch carries the edit live.

---

## 1. What ships today (the two shapes, grounded)

### 1a. The ROBUST reference — blob.vue

`demo/stories/substrates/blob.vue` is the gold standard the user names ("the same studio shell Aurora
composes"). Its anatomy:

```
<StoryHero> → <Configurator :presets :active-preset @select-preset>
  ├─ presets slot   → PresetPickerRow (weighted chips, the per-preset affordance)
  ├─ stage slot     → the live <GooBlob :config="liveConfig"> hero
  └─ controls slot  → N × <ConfiguratorLayer> (grouped sections)
        each layer → M × <ConfiguratorRow label name> → <LabeledSlider | Select | ColorSwatch>
```

State: `useConfiguratorState<BlobStudioCfg>({ presets, cloneMode: "per-preset" })` returns
`{config, activePreset, isDirty, selectPreset, resetCurrent, cyclePreset}`. The live config drives the hero
via per-field watchers that copy `config.x` → the renderer's reactive atom (the D1/D2 fix). 34 rows across
mood/satellite/orbit/seed-harmony/merge groups.

### 1b. The THIN straggler — dot-flow-field.vue

```
const config = reactive<FlowFieldConfig>({ ...FLOW_PRESET_WARM, interactive: true });   // hand-rolled
3 × <Switch>  // preset-toggle / interactive / paused — over a 32-field config passed WHOLE, unexposed
<DotFlowField :config="liveConfig" />
```

The config SURFACE exists (32 fields); the studio exposes 3 Switches. `dot-matrix` + `goo-dot-matrix` are
byte-identical in shape. constellation has NO config interface at all (flat props + a 9-panel static gallery);
watercolor-dot is a CSS swatch (out of the procedural-canvas scope, exposed via `<ColorSwatch>` only).

### 1c. The state-idiom split (the DRY defect)

| idiom | viz |
|---|---|
| `useConfiguratorState` (per-preset) | aurora · blob · fourier-field |
| hand-rolled `reactive<Cfg>` + manual preset-swap | concentric · dot-flow-field · dot-matrix · goo-dot-matrix |
| flat props, no config | constellation |

The hand-rolled `reactive` + `Object.assign(config, JSON.parse(JSON.stringify(src)))` preset-swap is the EXACT
thing `useConfiguratorState` factors (deep-clone + dirty-detect + reset). It must converge onto the composable.

---

## 2. The ONE pattern — `<VizStudio>` (demo-private chassis)

`<VizStudio>` (`demo/stories/substrates/_shared/VizStudio.vue`, NOT exported — the demo-storybook-chassis
class, like `<StorySection>`/`<ShowcaseFrame>`/`<DockStage>`) is the schema-driven studio every viz composes.
It is a THIN wrapper over the shipped `<Configurator>` — it adds ZERO new config surface, only the
schema→rows fan-out + the `useConfiguratorState` wiring the robust five hand-roll.

### 2a. Props

```ts
defineProps<{
  schema: VizConfigSchema<T>          // the field→control descriptor table (§3)
  presets: readonly ConfiguratorPreset<T>[]
  initialPreset?: string
  cloneMode?: ConfiguratorCloneMode   // default "per-preset"
  emotion?: EmotionProfileTable<T>    // optional — the 4-state adapter (§4)
  keyboard?: boolean                  // default true — wire useVizKeyboard (§5)
}>()
// slots: #stage (the live <Viz :config>), #presets-extra (per-viz chip variant)
// exposes: state (the useConfiguratorState handle) — the stage binds :config="state.config"
```

### 2b. The render (schema-driven, the studio-vs-surface fix)

`<VizStudio>` owns the `useConfiguratorState` instance, groups the schema by `group`, and renders one
`<ConfiguratorLayer>` per group with one `<ConfiguratorRow>` + control per field — the EXACT structure blob
hand-rolls, generated from the schema:

```
const state = useConfiguratorState<T>({ presets, initialPreset, cloneMode })
<Configurator :presets="presets" :active-preset="state.activePreset.value" @select-preset="state.selectPreset">
  <template #stage><slot name="stage" :config="state.config" /></template>
  <template #controls>
    <ConfiguratorLayer v-for="g in groups" :label="g.label" dividers>
      <ConfiguratorRow v-for="f in g.fields" :label="f.label" :name="f.name" :can-reset="dirty(f)" @reset="reset(f)">
        <component :is="controlFor(f)" v-model="state.config[f.key]" v-bind="f.bind" />
      </ConfiguratorRow>
    </ConfiguratorLayer>
  </template>
</Configurator>
```

`controlFor(f)` maps `f.control` → `LabeledSlider | Select | Switch | ColorSwatch | OklchStopRow | NumberField`
(the existing control vocabulary; no new control minted). The robust five DELETE their hand-rolled row markup
and pass a schema; the thin three GAIN the full row treatment for free; constellation gains a `ConstellationConfig`
+ schema. ONE chassis, 10 consumers (the ≥2-consumer bar met 5×).

---

## 3. The control taxonomy — the universal viz spine (FOUR groups + Specifics)

Every viz config decomposes into the SAME four semantic groups, declared in its `VizConfigSchema`. This is
the recurring shape across all 10 configs — naming it makes the studios legible AND lets `useEmotionalState`
target the right group:

```ts
type VizControl = "slider" | "select" | "switch" | "color" | "oklch-stop" | "number"
interface VizField<T> {
  key: keyof T; group: VizGroup; control: VizControl; label: string; name?: string
  min?: number; max?: number; step?: number; options?: {value; label}[]   // control-specific
  bind?: Record<string, unknown>                                          // extra control props
}
type VizGroup = "emotion" | "field" | "color" | "motion" | "specifics"
type VizConfigSchema<T> = readonly VizField<T>[]
```

| group | semantic | the universal fields | per-viz instance |
|---|---|---|---|
| **Emotion** | the 4-state affect select (§4) — ONE control that re-seeds the others | `mood`/`emotionalState` | blob mood · aurora seed-mood · dot-matrix wash-mood |
| **Field** | the procedural-field STRUCTURE knobs | density · scale · count · octaves · warp-strength | nuclei count · ring families · dot grid density · wave amplitude |
| **Color** | the palette seam (the ONE color event) | seed · harmony · stops · strength | OklchStopRow (aurora) · ColorSwatch seed (blob) · palette stops |
| **Motion** | the temporal life | speed · drift · breath-depth · pulse | flow drift · orbit speed · beat period |
| **Specifics** | the per-viz facilities the four don't cover | (viz-unique) | satellites/merge (blob) · level-set contours (concentric) · image-target (dot-matrix) |

**The taxonomy is the legibility win:** a user opening ANY viz studio sees the same Emotion→Field→Color→Motion
spine, then the viz-specific Specifics — the "robust configurator" the mandate names, uniform across the suite.

### 3a. Per-viz control set (the concrete schemas)

| viz | emotion | field | color | motion | specifics |
|---|---|---|---|---|---|
| **aurora** | seed-mood select | nuclei count · turbulence · medium · warp-mode | OklchStopRow ×4 · seed swatch · harmony | flow speed · drift · breath | medium-params · album-reactive · metal-sheen (NEW) |
| **blob** | 4-state mood | satellite count · orbit/sat radii · eccentricity · smin | seed swatch · harmony | orbit speed · wobble | merge · cartoon-shadow (NEW) · multi-blob (NEW) |
| **concentric** | wash-mood | ring families · base wavelength · beat · perturb | stops · warm/theme | drift speed | level-set contours (NEW) · source count |
| **dot-flow-field** | flow-mood | grid density · dot size · wave amp · octaves | palette stops | flow drift · wash speed | image/SDF target (NEW) · ripple |
| **dot-matrix** | wash-mood | grid density · dot size/opacity · phyllotaxis | warm/reference | rotation · parallax | image-target (NEW) · dither mode |
| **goo-dot-matrix** | mood | grid · goo field · threshold | stops | orbit · pulse | dot-register (field/dither/lattice/sphere) |
| **fourier-field** | mood | epicycle count · radius · path | stops | speed | preset path · trace |
| **paper-grid** | mood | grid scale · two-tier · curl-warp · perturb | ink color | breath drift | warp octaves (deepen) |
| **constellation** (NEW config) | mood | star count · link distance · parallax | star color | speed · twinkle | well-interaction · panel |
| **watercolor-dot** | — | (CSS swatch, out of canvas-studio scope) | color · variant · seed | animate wobble | ghost variant |

---

## 4. The emotion group — ONE select, the whole config re-seeds (`useEmotionalState`)

The Emotion group is NOT a passive label — it is the headline control. Per `emotional-states.md`, the suite
speaks FOUR canonical states (CALM · JOYFUL · MELANCHOLY · ELECTRIC) on a `{valence, arousal}` circumplex.
`<VizStudio>` wires the emotion select to a per-viz `EmotionProfileTable<T>` adapter: picking a state lerps
the `{valence, arousal}` point and the adapter maps it onto the viz's Field/Color/Motion fields (orbit speed,
palette warmth, wobble, drift) — so ONE pick re-tunes the studio coherently, the "birthdaycolor-like play"
(a single high-level gesture paints the whole field). The intermediate states are reachable by a `valence`/`arousal`
slider pair in the Emotion group (the anchors are samples, not an enum wall). This is the SAME 4-state vocabulary
across all vizzes — the cross-viz coherence the mandate wants, no fifth state path.

PRM: the emotion re-seed is a config swap (instant), the MOTION it implies seats per the substrate's PRM policy.

---

## 5. Live-edit, keyboard, and the interactivity floor

- **Live-edit** rides the existing reactive→atom watcher seam (blob D1/D2): `state.config` is reactive,
  `<VizStudio>` binds `v-model="state.config[key]"`, the renderer's whole-config watch carries the edit to GL
  the same frame. No new live-edit mechanism — the schema just declares which fields are editable.
- **Keyboard** (`keyboard` prop, default true) wires a shared `useVizKeyboard` reading arrow/±/space/digit onto
  the SAME `usePointerVelocityField` the pointer feeds (the audit gap-1: keyboard is ZERO suite-wide). Composes
  `useKeyboardShortcuts` (`/keyboard`), PRM-safe, focus-scoped to the stage. ONE seam, 10 consumers.
- **Pointer richness** (audit gap-5): the four thin-consume vizzes (fourier/concentric/dot-matrix/paper-grid call
  1 field method) lift to the full velocity+accel+flick API aurora/blob consume — the configurator surfaces an
  `interactive` switch, but the CONSUME depth is the renderer's, booked beside the studio rebuild.

---

## 6. Fences + the no-fork discipline

- `<VizStudio>` is DEMO-PRIVATE (not a library export — the storybook-chassis class). The shipped `<Configurator>`
  + `useConfiguratorState` stay the library primitives; `<VizStudio>` is the demo's schema-driven composition.
- `useConfiguratorState` is the ONE state idiom — concentric's `reactive` + the thin-three's `reactive`+`Object.assign`
  RETIRE onto it (clean break, no alias; the per-preset clone replaces the JSON-stringify swap).
- NO new control primitive — `controlFor` maps to the existing `LabeledSlider/Select/Switch/ColorSwatch/OklchStopRow/NumberField`.
- Presets-in-consumers holds: the schema declares structure, the presets carry the named baselines (a viz's WARM
  default is the library identity; a teal-navy reference is a non-default preset).
- The emotion adapter is per-viz (`EmotionProfileTable<T>`) but the 4 states + the `useEmotionalState` core are shared.

---

## 7. The wave shape (for the roster)

**`W-VIZ-CONFIGURATOR`** (Band: viz) — mint `<VizStudio>` + `VizConfigSchema` + the 4-group taxonomy; migrate
all 10 studios onto it (the robust five DELETE hand-rolled rows → schema; the thin three GAIN full rows;
constellation GAINS `ConstellationConfig` + schema). Converge the state idiom onto `useConfiguratorState`.
Depends on: `W-EMOTIONAL-STATE` (the adapter) + `W-VIZ-KEYBOARD` (the keyboard seam). Machine-lock candidate:
`proof:viz-configurator` (every substrate story composes `<VizStudio>`, exposes ≥1 row per Field/Color/Motion
group, uses `useConfiguratorState`, no hand-rolled `reactive<Cfg>` preset-swap survives + a self-test bite).
