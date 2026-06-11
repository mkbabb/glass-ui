<!-- surface-paths: demo/stories/substrates/blob.vue, src/components/custom/configurator/Configurator.vue, src/components/custom/labeled-field/LabeledField.vue, src/components/custom/labeled-field/LabeledSlider.vue, src/components/custom/labeled-field/LabeledSelect.vue, src/components/custom/labeled-field/LabeledSwitch.vue, src/styles/tokens/offsets-sizing.css, demo/stories/compositions/configurator.vue -->
<!-- surface-hash: 9556f3daf0dbc2f3d104740367f8b7996e1082cd709df233c790adeb4af0aa81 -->

# AZ.W-BLOB-REDRESS — the two reflection misses DELTA

The blob reflection (`docs/tranches/AZ/audit/reflect/blob.md`) FAILed the surface on TWO
S2 first-time-auditor "wtf" misses — the desktop studio is finished, but (M1) the studio
hero bead collapsed to 0×0 on the mobile/coarse-touch viewport, so a phone user saw a
configurator controlling an invisible creature, and (M2) every configurator slider/select
row leaked its raw camelCase config key (`attraction`, `clickImpulse`, `smoothK`, …) as a
visible label, because a `<ConfiguratorRow label="Attraction">` wrapped a `<LabeledSlider
label="attraction">` and BOTH rendered. This wave redresses both at the ROOT. No renderer
edit (the GL is fence-locked, REFUTED-crisp per the reflection); no magic min-height patch.

## Own-surface captures

| facet | light | dark |
|---|---|---|
| mobile studio (390px) — the bead PAINTING + single-label rows | `W-BLOB-REDRESS-mobile-light.png` | `W-BLOB-REDRESS-mobile-dark.png` |

The two captures show, on the 390×844 coarse-touch viewport: the warm-cream lit bead
painting in the now-definite stage (a contained square creature with a necking satellite,
grounded shadow, the mood badge `curious · attraction 0.35 · clicks 0 · Poke`), the
Calm/Excited preset row, the "Interaction" section, and the redressed rows — `Attraction`
(human) over its mono `attraction` token caption, `Click impulse` over `clickImpulse`,
`Responsiveness` over `responsiveness` — NO raw key as a visible primary line.

## Paired-π readback (the falsifiable numbers, measured live on `/substrates/blob`, :5199)

| metric | before (reflection) | after (this wave) | floor / meaning |
|---|---|---|---|
| mobile (390px) configurator `grid-template-rows` | `0px 558px` | `288px 270px` | stage row DEFINITE — the single-column band sets explicit rows so the stage track no longer collapses |
| mobile (390px) studio stage column height | 0 | 288px | the live-specimen viewport has a real height (the `--configurator-stage-min` 18rem floor) |
| mobile (390px) goo-blob-canvas CSS rect | 0 × 0 | 300 × 300 | the GL bead PAINTS (was 0×0 → Playwright read it hidden, the user saw nothing — M1) |
| mobile (390px) goo-blob-canvas backing store | — | 600 × 600 | the device-px backing (2× DSF over the 300px box) |
| mobile (390px) bead wrapper square? | NO (211×225) | YES (187×187) | the `max-w`/`max-h` square-fit keeps the box square on a PORTRAIT stage — the `0.97` four-side-containment RED fixed (the satellites keep their margin) |
| `proof:blob-render` coarse-touch | FAIL (timeout, 0×0 canvas) | PASS (3/3) | the M1 binding-truth gate GREEN on coarse-touch |
| `proof:blob-warm-default` coarse-touch | FAIL (timeout, 0×0 canvas) | PASS (2/2) | the warm-cream identity gate GREEN on coarse-touch |
| `proof:blob-render` desktop | PASS (3/3) | PASS (3/3) | no desktop regression — the `lg:grid-rows-none` reset preserves the 2-column layout |
| visible raw-camelCase labels (blob, 11 rows) | 11 | 0 | each row now shows ONE human label; the raw key demotes to the mono `name` token caption — M2 |
| desktop (1280px) goo-blob-canvas CSS | 696 | 696 | the desktop hero geometry is byte-unchanged |

## §M1 — the mobile-stage 0×0 collapse (root cause + fix)

**Root cause (a grid-track-sizing collapse, NOT an unsized flex child).** The
`<Configurator>` root is a CSS grid: at `lg`+ it is a 2-column layout (stage `1fr` + aside
band), where the single implicit row stretches to the aside's definite content height — so
the stage's inner `h-full` resolves against a real track and the bead paints. Below `lg`
the layout is `grid-cols-1` with a FIXED root height (`h-[min(70vh,560px)]` from
`blob.vue`) and IMPLICIT auto-rows. The stage's content sizes off `h-full` / a percentage
height, which against an INDEFINITE auto-row resolves to 0 — so the stage auto-row collapsed
to `0px` (`grid-template-rows: 0px 558px`), the bead wrapper's `h-[min(78%,30rem)]` =
`78% of 0` = 0, and the `goo-blob-canvas` painted 0×0. The reflection's "the stage uses
`h-full` … gets no resolved height → 0" diagnosis is exactly this.

**The root fix (an explicit, definite single-column stage track).** `Configurator.vue`'s
single-column band now sets EXPLICIT
`grid-rows-[minmax(var(--configurator-stage-min,18rem),auto)_minmax(0,1fr)]`, reset to
`lg:grid-rows-none` so the `lg`+ two-COLUMN layout owns the geometry unchanged. The stage
row is now a DEFINITE `minmax(--configurator-stage-min, …)` track, so the percentage stage
height resolves against a real track; the aside row takes the remainder (`minmax(0,1fr)`)
and scrolls its controls internally. `--configurator-stage-min` (18rem / 288px) is a new
token minted in `tokens/offsets-sizing.css` — the mobile live-specimen floor. This is the
proper intrinsic-size contract the reflection asked for: the stage is a definite track on
the stacked layout, not an auto-row inheriting 0 from a percentage child.

**The square-fit follow-on (a second-order containment RED the fix exposed).** With the
stage now definite, the coarse-touch `proof:blob-render` four-side-containment arm went RED
at worst-edge 0.97 — because the bead wrapper's prior `aspect-square h-[min(78%,30rem)]
max-w-[88%]` drove the square off HEIGHT alone, so on the PORTRAIT mobile stage (240w ×
288h) the `max-w-[88%]` width cap (211px) clamped BELOW the 225px height → the box went
NON-square (211×225) and the 1.6×-overflow canvas clipped tight to the wrapper, pushing the
orbiting satellites onto the frame edge. The bead wrapper is re-based to
`aspect-square w-full max-h-[78%] max-w-[min(78%,30rem)]` — the box wants full width but is
capped at 78% of BOTH axes (≤30rem), and `aspect-square` resolves it to the LARGEST square
fitting both caps = `min(78% w, 78% h)`. On mobile that's a true 187×187 square with margin
on both axes (the necking satellites keep their room); on the landscape desktop stage it is
unchanged (height-limited, the 696px hero). Containment GREEN on both viewports.

## §M2 — the configurator raw-key double-label leak (root cause + fix)

**Root cause.** Each `<ConfiguratorRow label="Attraction">` (the human label) wrapped a
`<LabeledSlider … label="attraction">` (the raw config key), and BOTH labels rendered — the
inner `Labeled*` label painted the raw camelCase identifier as a visible (and, in the
hierarchy, often heavier-reading) line. The same double-label pattern lived in two
Configurator consumers: `blob.vue` (11 rows) and `compositions/configurator.vue` (4 rows).
The AURORA studio was ALREADY CORRECT — it composes `LabeledSlider`/`LabeledSelect`
directly with ONE human label (`"Focal X"`, `"Warp amount"`, `"Palette bias"`), no
`ConfiguratorRow` wrap — so the fix follows that idiom's intent: ONE visible human label per
row.

**The root fix (a house `hideLabel` seam on the LabeledField family).** `LabeledField`
gains a `hideLabel` prop: it renders the field's own label `sr-only` (KEPT in the DOM, so
the `for`/`id`/`aria-labelledby` control↔label association — the Slider thumb's
`aria-labelledby`, the Select trigger's `for` — stays intact and the control is still
accessibly named) and suppresses the tooltip (the enclosing chrome row owns the affordance).
The prop threads through `LabeledSlider`/`LabeledSelect`/`LabeledSwitch`. In both consumer
stories every `<ConfiguratorRow label="…">` now (1) carries the raw config key in its `name`
prop — the mono token caption slot that EXISTS for exactly this ("Optional token name / spec
reference, monospaced") — and (2) wraps a `Labeled*` with a HUMAN `label` + `hide-label`.
Result per row: ONE visible human label (the ConfiguratorRow's `<Label>`), the raw key
demoted to the tertiary mono caption, the a11y label preserved as the inner `sr-only` twin.
Live π: 13 blob rows, 0 visible raw-camelCase leaks. This is the house pattern (a prop on
the shared LabeledField family + the existing `name` slot), not a per-row patch.

## Non-touched (recorded so a re-reflect does not re-flag)

- **GL renderer** — untouched (REFUTED-crisp HOLDS; `proof:blob-page-fence` machine-binds it).
- **uBackdrop refraction** — CONDITIONS-UNMET stands (the reflection's correct disposition).
- **Desktop studio** — the §3.x W-BLOB-STUDIO work (stage-fill hero, satellite layer,
  grounded shadow, louder-lean, merge bridge, hierarchy) is UNCHANGED; the 1280px π
  (canvas 696, grid `558px` single auto-row) is byte-identical.

## Gate roster (re-run this wave)

| gate | result |
|---|---|
| `npx vue-tsc --noEmit` | exit 0 (clean) |
| `proof:blob-studio-config` | PASS (SATELLITE-LAYER-BOUND + CONFIGURATOR-HIERARCHY + MERGE-DEFAULT-REBASE + LOUDER-LEAN-SURFACED + GROUNDED-SHADOW-TOKEN) |
| `proof:hierarchy` | PASS (6/6 — the §M2 row/section vocabulary untouched) |
| `proof:blob-render` (coarse-touch) | PASS (3/3) — M1 closed |
| `proof:blob-render` (desktop) | PASS (3/3) — no regression |
| `proof:blob-warm-default` (coarse-touch) | PASS (2/2) — M1 closed |

Console on `/substrates/blob` (mobile route): 0 errors.
