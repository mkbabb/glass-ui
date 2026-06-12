# BA fleet lane — configurator-occlusion (R8-4)

Audit-only. Live-probed on :5199 (dark + light). Captures beside this report:
`configurator-occlusion-aurora-aside-dark.png`, `configurator-occlusion-blob-aside-dark.png`,
`configurator-occlusion-gear-sheet-dark.png`. Ground: `ground/R8-04-aurora-configurator-occlusion-{a,b}.png`,
`ground/R8-07-goo-configurator-broken.png`.

## TL;DR

Three of glass-ui's four configurator surfaces share the SAME library chassis
(`<Configurator>`/`<ConfiguratorLayer>`/`<ConfiguratorRow>`) — but the chassis has
no **section-divider weight that survives the dark plate**, no **horizontal
overflow contract for an in-row chip group** (so the aurora DERIVE row hard-clips),
no **control-width contract for a slotted intrinsic-zero-width control** (so the
blob studio's sliders collapse to 0px → the R8-7 "labels with no controls"
defect), and **no Seed/color-swatch register** (so the aurora Seed reads as a raw
full-width browser `<input type=color>` slab). The fourth surface — the gear demo
`PresetEditor` — does not compose the chassis AT ALL (hand-rolled `<section>` +
`<h3 text-xs mono>` headers + a parallel `PresetEditorField` clone of
`ConfiguratorRow`), so it inherits none of the W-HIERARCHY vocabulary and is a
second source of truth. The remedy is ONE refined configurator anatomy all four
inherit, plus retiring the gear's parallel chassis onto it.

## The four configurators (live inventory)

| surface | file | chassis | section header register | sliders |
|---|---|---|---|---|
| Aurora studio | `demo/stories/aurora/AuroraConfigDock.vue` + `sections/AuroraColorSection.vue` | `<ConfiguratorLayer>` × 7, content is RAW `LabeledField`/`LabeledSlider` (no `<ConfiguratorRow>`) | `.configurator-section-label` 20.4px/600 ✓ | render OK (block context) |
| Blob studio | `demo/stories/substrates/blob.vue` | `<Configurator>` + `<ConfiguratorLayer dividers>` × 3 + `<ConfiguratorRow>` × 13 | `.configurator-section-label` 20.4px/600 ✓ | **COLLAPSE to 0px width** |
| Gear demo | `demo/configurator/PresetEditor.vue` + `PresetEditorField.vue` | NONE — hand-rolled `<section>` + `<h3 class="text-xs font-mono uppercase">` + `PresetEditorField` (a `ConfiguratorRow` clone) | `text-xs` 12px mono-uppercase ✗ (NOT the rung) | render OK (`<Slider class="w-full">` direct) |
| Configurator primitive story | `demo/stories/compositions/configurator.vue` | `<Configurator>` + `<ConfiguratorLayer>` + `<ConfiguratorRow>` × 4 | `.configurator-section-label` 20.4px/600 ✓ | **COLLAPSE to 0px width** (same as blob) |

## Mechanical defects (root-caused to file:line)

### 1. The blob/primitive sliders collapse to ZERO WIDTH — the R8-7 "labels with no controls" (S1)

Live DOM probe on `/substrates/blob` (dark): every `<LabeledSlider>` inside a
`<ConfiguratorRow>` paints at **0px width**:

```
controlSlot (div.flex.items-center) w=335  display=flex
  .labeled-field                    w=0    display=BLOCK   ← collapses
    [data-slot=slider].glass-slider w=0    display=flex
      .slider-track                 w=0
```

Root cause: **`ConfiguratorRow.vue:120`** wraps the control slot in
`<div class="flex items-center">`. A flex item with no `flex-1`/`w-full` sizes to
its **content** width; the reka slider track has **no intrinsic min-width**, and
**`LabeledField.vue:2`** roots a bare `<div class="labeled-field">` (`display:block`,
no `w-full`). So a slotted `LabeledSlider` collapses to 0 inside the flex slot.
This is exactly the R8-7 read ("Interaction/Mood rows render LABELS WITH NO
CONTROLS, the sliders missing/invisible"). It does NOT reproduce in the aurora
studio because `AuroraColorSection` drops `LabeledSlider` into a `flex flex-col`
(block) context, not a `ConfiguratorRow` flex slot; and not in the gear because it
passes `<Slider class="w-full">` directly (the reka root, which carries width).
The defect is the **`ConfiguratorRow` slot × `LabeledField`-family** intersection —
the chassis offers no width contract to a slotted control. Capture:
`configurator-occlusion-blob-aside-dark.png` (Attraction / Click impulse /
Responsiveness, all label-only).

### 2. The aurora DERIVE-FROM-COLOR chip row hard-clips at the card edge (S1)

Live DOM probe on `/substrates/aurora` (both light AND dark — mechanical, not
dark-only): the DERIVE harmony `<ToggleGroup>` renders 4 chips whose min-content
text widths sum past the 360px aside; the group's right edge = 1447px, the aside
content right edge = 1407px, so **MONO clips by 40px** and overflows its own
container:

```
ANALOGOUS(108) COMPLEMENT(119) TRIAD(65) MONO(55)  →  group scrollW 366 > aside content ~326
```

Root cause: **`AuroraColorSection.vue:167`** — `<ToggleGroup class="flex-1">`
with 4 `<ToggleGroupItem class="h-8 flex-1 px-1.5 text-mono-caption">`. The
`flex-1` items can't shrink below their min-content uppercase labels, so they
overflow; the parent scroll wrapper at **`AuroraConfigDock.vue:229`**
(`overflow-x-clip`) then HARD-CLIPS the overflow → MONO is sliced off. The user's
R8-4 read ("the DERIVE FROM COLOR chip row clips ANALOGOUS/COMPLEMENT/TRIAD at the
card edge"). A 4-item segmented control simply does not fit a 360px aside at this
label length. Captures: `ground/R8-04-*.png`, `configurator-occlusion-aurora-aside-dark.png`.

### 3. The aurora Seed is a raw full-width browser color slab (S2)

Live: the Seed control (`AuroraColorSection.vue:123`) is a `<input type="color">`
sized `h-8 w-full` → **335px × 32px solid blue slab**. It reads as an
undifferentiated heavy block (the user's "undifferentiated full-width blue
slab"), visually identical in weight to a full-width slider but carrying only one
swatch's worth of information. There is no library color-swatch register — every
configurator that needs a color input re-rolls a raw `<input type=color>` (aurora
Seed atom + aurora DERIVE seed + blob Seed is a bare text `<input class="input-pill">`,
three divergent color-input treatments).

## Design defects (the anatomy is under-differentiated)

### 4. Section dividers vanish on the dark plate (S2 — the "sections run together" read)

Live: `.configurator-layer` carries `border-b border-border/40` (alpha 0.4) and
`<ConfiguratorLayer dividers>` rows carry `border-t border-border/30` (alpha 0.3).
Over the cream light plate these read; over the **dark `glass-floating` plate they
are effectively invisible** (the divider color `oklab(0.456 … / 0.3-0.4)` against a
near-equal-luminance dark glass). So the dark configurator reads as one
undifferentiated vertical run — the user's R8-4 "sections run together without
dividers" and R8-7 are the same dark-register weakness. The W-HIERARCHY vocabulary
landed the section LABEL weight (20.4px/600 resolves correctly, verified live) but
**did NOT land a divider register that adapts to the dark plate** — the dividers
are a hardcoded `border-border/N` alpha, off the token system, so there is no one
knob to lift them on dark.

### 5. The hierarchy vocabulary is half-consumed; the gear is OFF it entirely (S2)

The W-HIERARCHY tokens EXIST and the label rungs resolve (section 20.4px → row
16.4px → mono caption), confirmed live. But:
- **Dividers** are NOT tokenized — they're inline `border-border/40` (defect 4), so
  the "section rhythm" half of the vocabulary is unowned.
- **The gear `PresetEditor`** composes NONE of it: section headers are
  `text-xs font-mono uppercase tracking-wider text-muted-foreground` (12px mono
  caption — BELOW body, reads as an eyebrow not a section), and `PresetEditorField`
  is a hand-cloned `ConfiguratorRow` (`gap-1.5 py-2` + reset button + name + desc —
  byte-for-byte the same surface, two sources of truth). So the gear is a parallel
  configurator chassis that drifts from the library one. This is the W-HIERARCHY
  "tokens exist — where are they unconsumed?" answer: unconsumed on the dividers
  (everywhere) and on the entire gear surface.

### 6. The preset chip row + DERIVE row both need a real fading-scroll register (S3 — overlaps R8-8)

The blob preset chips ("Calm/Excited/Shy") and the aurora preset/DERIVE rows all
use `overflow-x-auto scroll-fade-mask` hand-rolled masks; the "Shy" chip clips at
rest with no scroll affordance (the R8-8 fading-scroll defect surfaces inside the
configurator too). The configurator anatomy should consume the abstracted
fading-scroll component R8-8 proposes rather than three hand-rolled mask variants.

## Proposed anatomy — ONE configurator all four inherit (DESIGN direction, no impl)

A single refined `<Configurator>` anatomy, consumed by aurora · blob · gear ·
primitive (the gear's hand-rolled chassis RETIRES onto it — clean break, no parallel
`PresetEditor` surface):

1. **Control-width is a chassis guarantee, not a per-consumer concern.** The
   `<ConfiguratorRow>` control slot establishes full width for ANY slotted control
   (the slider-collapse class dies at the chassis): the slot becomes a definite-width
   block context, and the `LabeledField` family roots full-width, so a slotted
   slider/select/swatch fills the row regardless of its intrinsic width. This is the
   gestalt fix for R8-7 — one contract, every configurator inherits a visible
   control. Resolve the label DUPLICATION at the same seam (`ConfiguratorRow label`
   + `LabeledSlider hide-label` is a redundant double-label — the row owns the label,
   the slotted control is label-less by contract).

2. **A dark-adaptive section-divider token register.** Promote the section + inter-row
   dividers off inline `border-border/40` onto a `--configurator-divider-*` token
   that lifts its weight on the dark plate (the same self-adaptive register the
   adaptive-glass tint axis uses) — ONE knob, both rules read it, dividers survive
   dark. This is the "more dividing lines / better section rhythm" half of R8-4 done
   as a token, not a per-site alpha. Pair with a subtle section-header band (a faint
   tonal step or top-rule) so a section reads as a section without relying on the
   hairline alone.

3. **A first-class color-swatch row register.** A library swatch/seed control
   (a bordered, radius'd, proportioned swatch + hex affordance) replaces the raw
   full-width `<input type=color>` slab and the three divergent color treatments
   (aurora Seed, aurora DERIVE seed, blob Seed). One register, all configurators
   read it; the Seed stops being a heavy undifferentiated block.

4. **An overflow contract for in-row option groups.** A segmented/chip group inside
   the aside either (a) wraps to a second line when its items exceed the width
   (the natural fit for the 4-harmony DERIVE row), or (b) routes to the
   fading-scroll register (defect 6 / R8-8) — never hard-clips. The
   `AuroraConfigDock` `overflow-x-clip` becomes redundant once the group can't
   overflow. This kills the MONO clip at the anatomy level, not per-consumer.

5. **The hierarchy vocabulary is fully consumed, gear folded in.** The gear demo
   recomposes on `<Configurator>`/`<ConfiguratorLayer>`/`<ConfiguratorRow>` so its
   sections read on the 20.4px rung (not the 12px mono eyebrow), `PresetEditorField`
   retires onto `ConfiguratorRow`, and the W-HIERARCHY vocabulary becomes the SINGLE
   source of truth for every configurator's section/row/divider rhythm — the
   "one anatomy all configurators inherit" the lane asks for.

## Cross-cutting notes

- Defects 1 + 2 reproduce in BOTH light and dark (mechanical layout, not register);
  defects 4 is dark-dominant (the divider-vs-plate luminance). The lane's dark
  emphasis is correct for the "sections run together" read.
- The aurora studio runs `scrollMode="never"` (it owns its own internal scroll in
  `AuroraConfigDock:229`); the blob/primitive run the chassis scroll. The refined
  anatomy should reconcile these so the scroll-fade + overflow contract is owned in
  ONE place, not split between the chassis and the consumer.
