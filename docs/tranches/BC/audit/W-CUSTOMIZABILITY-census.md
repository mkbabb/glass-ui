# W-CUSTOMIZABILITY census — the per-component customization-surface verdict

> **BC.W-CUSTOMIZABILITY-CENSUS** · the binding *"fully customizable with reasonable, pragmatic,
> GOLDEN (like our golden typography) defaults that afford design hierarchy"* bar
> (`component-customizability.md §0`). The three-layer surface every published glass-ui component
> meets: **PROPS** for the semantic per-instance choices (variant / size / tier / tone), **`--token`
> `:root` overrides** for the visual MAGNITUDES (padding / blur / glyph / alpha / hue / duration),
> **SLOTS** for content — AND the bare component already reads as a proportioned √φ-typography /
> warm-cream-glass / spring-clocked design that AFFORDS hierarchy out of the box.
>
> This census is the **anti-smuggle floor**: every published `src/components/ui/` component +
> every enrolled `src/components/custom/` compound appears on **EXACTLY ONE** list below —
> `gold` | `gap` | `token-only-correct` — so a future agent cannot smuggle a new bare un-audited
> component (or a customization gap) into the surface (the `proof:dock-normalize` W5-closure /
> `proof:no-shadcn-default` D4-closure precedent transposed onto the customization-SURFACE axis).
>
> The binding bar is the machine gate `proof:customizability-census`
> (`scripts/proof-customizability-census.mjs`, `["local","ci"]`): the four golden-default asserts
> **C1** (no hardcoded control type/height off the `--control-*` cohort), **C2** (overlay golden
> uniformity — the `surface` axis + the φ `--overlay-pad-*` ladder), **C3** (no fork-forced px
> literal / `!important`-fighting-CVA in a compound), **C4** (audacious-type-not-starved) + the
> census-closure arm (every dir below on exactly one list). **This wave authors the bar + the gate +
> this census — ZERO per-component paint;** the per-component THREADS land in the OWNING band waves
> (`BC.W-CONTROL-CUSTOM` / `BC.W-OVERLAY-UNIFORM` / `BC.W-SEARCH-CUSTOM` / `BC.W-HERO-AUDACIOUS`),
> each consuming its census verdict + re-earning its own `proof:ba-gestalt` band verdict.

## The bar is set INSIDE the library (the gold-standard exemplars)

- **Card** — **GOLD.** 7 `tier` rungs, `surface` glass/cartoon/veil, `specular` off/subtle/full,
  `pressable`/`shadow`/`grain`/`grid`; the golden sqrt-φ/φ/φ² padding ladder
  (`--card-pad-inline` → `--card-pad-block`=`calc(*1.272)` → `--card-pad-footer`=`÷1.618` →
  `--card-pad-title-gap`=`÷2.618`); default `tier:"resting" surface:"glass"` reads as the
  canonical warm-cream glass plate.
- **Button** — **GOLD.** 13 variants + 6 size rungs reading `--control-h-{xs,sm,md,lg}` +
  `--control-text` / `--ui-glyph`. The control hierarchy-affordance template.
- **GlassDock** — **GOLD** (12 axes). **Dialog / Popover** — `surface` + φ overlay-pad.
  **Badge / IconChip / ColorSwatch / SegmentedTabs** — strong surfaces.

## The three registers this band threads (ZERO new register — DRY, ≥2 consumers each)

- the `--control-h-{xs,sm,md,lg}` + `--control-text` / `--control-text-sm` + `--ui-glyph` cohort
  (`tokens/sizing.css`) — Button / Badge / NumberField already read it;
- the shared `{glass·veil·opaque}` `Surface` axis (`_shared/useSurfaceAxis.ts` + `surface-axis.css`) —
  Card / Dialog / Sheet / Drawer / Popover / Toast already thread it;
- the φ `--overlay-pad-inline/-block` ladder — Dialog / Popover / Toast / HoverCard already paint it;
- the √φ type ladder (`typography/scale.css`) + the `text-display-*` / `--type-*` rungs.

---

## List 1 — `gold` (a real customization axis + golden defaults that afford hierarchy; clean)

These already expose the right knobs (variant / size / tier / surface / tone props + the magnitude
tokens) and the bare default reads as the proportioned √φ / warm-cream-glass design. **No customization
gap.**

| Component | the customization surface it exposes |
|---|---|
| `button` | 13 variants + 6 size rungs (`--control-h-*` / `--control-text` / `--ui-glyph`) — the control template |
| `card` | 7 tiers + surface (glass/cartoon/veil) + specular/pressable/shadow/grain/grid + the golden √φ pad ladder |
| `badge` | the loud-saturated-pill variant register + the `--control-text-sm` rung |
| `alert` | the `.feedback-tone` tinted-glass variant axis (info/success/warning/error) |
| `avatar` | the size axis + the fallback register |
| `carousel` | the orientation + control-register axes |
| `combobox` | the `.input-pill` well + the `glass-floating` listbox surface |
| `data-table` | the column/sort/density axes |
| `dialog` | the shared `surface?: Surface` axis + the φ `--overlay-pad-*` ladder (the overlay exemplar) |
| `popover` | the shared `surface?: Surface` axis + the φ `--overlay-pad-*` ladder (the overlay exemplar) |
| `sheet` | the shared `surface?: Surface` axis (edge-anchored panel — surface-uniform; no φ-pad by design) |
| `drawer` | the shared `surface?: Surface` axis + the snap-detent register (edge-anchored — no φ-pad by design) |
| `toast` | the shared `surface?: Surface` axis + the variant tones + the φ `--overlay-pad-*` ladder |
| `dropdown-menu` | the shared `surface?: Surface` axis + the φ `--overlay-pad-*` ladder + `--overlay-min-width`/`--overlay-max-block` (BC.W-OVERLAY-UNIFORM threaded) |
| `select` | the shared `surface?: Surface` axis + the φ `--overlay-pad-*` ladder + `--overlay-min-width` + the chevron `--select-chevron-opacity` (BC.W-OVERLAY-UNIFORM threaded; the Select precompiled `[data-slot]` max-height KEEP — see on-the-line) |
| `tooltip` | the shared `surface?: Surface` axis + the φ `--overlay-pad-*` ladder (tight chip anchor) + the `--tooltip-text` caption rung (BC.W-OVERLAY-UNIFORM threaded) |
| `context-menu` | the shared `surface?: Surface` axis + the φ `--overlay-pad-*` ladder + `--overlay-min-width` (BC.W-OVERLAY-UNIFORM threaded) |
| `command` | the shared `surface?: Surface` axis (rides the Dialog host via `<Dialog surface>` when Dialog-hosted) + the φ `--overlay-pad-*` ladder + `--overlay-max-block` (BC.W-OVERLAY-UNIFORM threaded; see on-the-line) |
| `hover-card` | the shared `surface?: Surface` axis (the golden φ `--overlay-pad-*` ladder already lands — KEPT) (BC.W-OVERLAY-UNIFORM threaded) |
| `metric-pill` | the glass metric-pill variant register |
| `multi-select` | the chip/listbox surface + the `.input-pill` well |
| `notification` | the `.feedback-tone` type map + the `glass-floating` surface |
| `progress` | the variant register + the glass track |
| `section` | the section-surface axis |
| `slider` | the orientation + thumb/track surface register |
| `tabs` | the iOS-27 capsule/plate variant register |
| `toggle` | the variant + size register |
| `toggle-group` | the per-toggle variant/size register |

---

## List 2 — `gap` (a real customization axis is MISSING; the named THREAD lands in the owning band wave)

Each row names the **missing axis**, the **golden register** it should THREAD (an existing register —
ZERO new register), the **owning band wave**, and the **C-assert** it flips GREEN. The gate is
**born-RED** here.

| Component | missing axis | golden register to THREAD | owning wave | C-assert |
|---|---|---|---|---|
| `input` | a `size` axis + the control type register (bare `text-sm` on the well root, `Input.vue:81`) | `--control-text` (type) + `--control-h-*` (size axis) | `BC.W-CONTROL-CUSTOM` | **C1** |
| `switch` | a `size` axis (bare `h-6 w-11` track / `h-5 w-5` thumb off the cohort, `Switch.vue:37,42`) | `--control-h-*` (the track/thumb box rungs) | `BC.W-CONTROL-CUSTOM` | **C1** |
| `textarea` | a `size` axis + the control type register (bare `text-sm`, `Textarea.vue:73`) | `--control-text` (type) + `--control-h-*` (size axis) | `BC.W-CONTROL-CUSTOM` | **C1** |
| `number-field` | the control type register (height token-backed `h-(--control-h-md)` ✓, but bare `text-sm`, `NumberFieldInput.vue:37`) | `--control-text` (route the bare `text-sm` onto the cohort) | `BC.W-CONTROL-CUSTOM` | **C1** |
| `custom/search` | the compound fork-forced px literals + the `!important`-fighting-CVA cluster (`SearchBar.vue:6`, `FuzzySearch.vue:111-139`) | `--search-icon-size` / `--search-result-text` / `--search-button-size` (token-back) + a real Button `iconSize`/dimension CVA rung | `BC.W-SEARCH-CUSTOM` | **C3** |
| `demo/stories/StoryHero` *(display surface, not a `ui/` dir — listed for the C4 closure)* | the tunable hero RUNG (pinned `text-display-3`, the 177/287/352px mega/hero/audacious tiers starved, `StoryHero.vue:292,333`) | a `heroScale` prop OR a `--hero-scale` `:root` token driving the display rung | `BC.W-HERO-AUDACIOUS` | **C4** |

**Born-RED state (PARTIAL-until-threads-land — CORRECT, not a failure):** at HEAD
`proof:customizability-census` reds C1 (4 control surfaces) / C2 (6 picker overlays) / C3 (2 search
compounds) / C4 (the StoryHero hero rung). It goes GREEN incrementally as each owning band wave threads
the existing register. `BC.W-CUSTOMIZABILITY-CENSUS` does **not** edit any of them — it records the
verdict + erects the gate.

**C2 DISCHARGED (BC.W-OVERLAY-UNIFORM threaded — gate GREEN):** the six picker overlays
(`dropdown-menu` / `select` / `tooltip` / `context-menu` / `command` / `hover-card`) now thread the
shared `surface?: Surface` axis (`surfaceClass(surface,'floating')` + `:data-surface`) AND the φ
`--overlay-pad-inline/-block` ladder, and the raw `min-w-32` / `max-h-[60vh]` / `max-h-[300px]` /
tooltip `text-sm` / chevron `opacity-50` literals are token-backed onto `--overlay-min-width` (`8rem`) /
`--overlay-max-block` (`60vh`) / `--tooltip-text` (`var(--type-caption)`) / `--select-chevron-opacity`
(`0.5`) — each defaulting to the byte-identical HEAD magnitude (a bare overlay is pixel-unchanged; a
`:root` override retunes every overlay in lockstep). ZERO new register — the `Surface` axis + the φ
overlay-pad ladder are WIDENED onto the LACK overlays (`proof:surface-axis` W1 stays GREEN, no fork;
W3's enrolled set widens by construction). The six rows are now in **List 1 (gold)** above
(EXACTLY-ONE-LIST preserved).

**On-the-line rows (RECORDED, not retired):**
- **Command-is-a-Dialog-host** — `command`'s `surface` flows THROUGH its Dialog host (`CommandDialog.vue`
  threads `<DialogContent :surface>`); the standalone `<CommandList surface=…>` also carries the axis via
  its own `:data-surface` binding (no second surface axis on a Dialog-hosted overlay). The list
  `max-h-[300px]` → `--overlay-max-block`.
- **The Select precompiled `[data-slot="select-content"]` `max-height`** — the BA.W-EMISSION
  consumer-content-scan-reach floor (a 16-item dropdown bounds inside the viewport in EVERY consumer
  regardless of JIT reach) is **KEPT** in `src/styles/select.css`, NOT threaded onto `--overlay-max-block`
  (which threads the OTHER overlays' max-block). The two coexist: the precompiled rule is the always-shipped
  floor, the token the per-`:root` retune lever.

---

## List 3 — `token-only-correct` (a `:root` token fully serves; a size/variant axis would be CONTRIVANCE)

The DON'T-over-prop fence + the no-contrivance fence: a size/variant/tier axis is added **ONLY** where the
hierarchy choice is REAL. These surfaces have **no size hierarchy** (a hairline / a label / a 16px selection
atom / a structural collapse), so a `:root` token (geometry / hairline-color / type) fully serves and forcing
a prop axis would be the anti-pattern. **Correct as-is — NOT a gap.**

| Component | why a `:root` token suffices (a prop axis would be contrivance) |
|---|---|
| `separator` | a hairline + a centered label chip — no size hierarchy; `--border-hairline` / the type token fully serve |
| `label` | a form label is text on the page — the √φ type token serves; a size axis is contrivance |
| `skeleton` | a loading shimmer — the geometry/animation tokens serve; no size-hierarchy choice |
| `checkbox` | a 16px selection atom (the STATE-maximal-contrast register, `proof:no-shadcn-default` allowlist) — no size hierarchy at 16px |
| `radio-group` | the same 16px-selection-atom argument — the radio dot has no size hierarchy |
| `accordion` | a hairline-divided collapse list — structural (the `--accordion-*` / `--border-hairline` tokens serve), no surface-size axis |
| `collapsible` | behavior + content — no surface to size; the collapse animation tokens serve |
| `table` | a data substrate — the row/cell geometry + the `--table-*` tokens serve (the legibility-opaque register) |
| `tags-input` | the chip register rides the `--control-*` / glass-well tokens; the chip has no independent size hierarchy |
| `focus-scope` | **behavior-only** — `FocusScope.vue` is a thin reka focus-management wrapper; it paints ZERO surface (nothing to customize). Listed so the closure stays complete. |

---

## Fences (the gate scope + the disjoint-by-clause boundary)

- **DON'T over-prop (binding).** A TOKEN beats a prop where a `:root` override suffices: magnitudes
  (padding / blur / glyph / alpha / hue / duration) → tokens; semantic per-instance choices
  (variant / size / tier / tone) → props. The gate does **NOT** demand a prop for a magnitude a `:root`
  token already covers — a wave that adds a `padding` prop where `--overlay-pad-inline` suffices is the
  anti-pattern (recorded here as a gate note).
- **No contrivance.** A size / variant / tier axis is added **ONLY** where the hierarchy choice is REAL.
  The input register (Input / Switch / Textarea / NumberField) gets a `size` axis (control-size hierarchy
  is real); Separator / Label / Skeleton / checkbox / radio-group do **NOT** (List 3 — a hairline / a
  16px atom has no size hierarchy; forcing one is contrivance).
- **DRY — thread the EXISTING register, ZERO new register.** The `--control-*` cohort, the `Surface`
  axis, the φ overlay-pad ladder, the √φ type ladder all have ≥2 consumers. This band threads them onto
  the gap surfaces; a wave that mints a parallel size / surface / pad register instead reds (the
  de-shadcn KISS discipline).
- **The gate scopes the customization-SURFACE axis, NOT the paint axis.** `proof:no-shadcn-default` owns
  "is the default paint ours?" (the shadcn-neutral token vocabulary); `proof:glass-cohesion` owns the
  bg-opacity axis; `proof:customizability-census` owns "can a consumer express hierarchy via the right
  knobs?" — the three are **disjoint by clause** and never contradict. Where a fix overlaps (e.g. the
  Switch thumb `bg-background` is `BC.W-DESHADCN`'s paint AND the Switch `size` axis is this band's),
  the two gates assert DIFFERENT facts on the same file.
- **No public-prop break from the THREADS.** The size / surface axes the consumer waves add are ADDITIVE
  default-`"default"` / default-`"glass"` (byte-near-identical at HEAD) — a bare component is unchanged,
  no MIGRATION row is owed for the additive axes (only a deliberate paint change in a consumer wave gets
  one). The gate asserts the bare default is golden, not that every component sprouts new props.
- **`proof:ba-gestalt` is the per-consumer-wave verdict, not this wave's.** Each consumer wave re-earns
  its own `proof:ba-gestalt` band verdict on its threaded surfaces. This wave owns the structural gate +
  census + π enrollment; it does not double-own the per-band paint sign-off.

## Closure (the EXACTLY-ONE-LIST anti-smuggle floor)

Every `src/components/ui/` component dir + every enrolled `src/components/custom/` compound appears on
**EXACTLY ONE** of List 1 / List 2 / List 3 above. The gate's census-closure arm asserts this
machine-checkably: a new un-listed component bearing a customization gap reds (the smuggle attempt is
caught). `_shared` (shared CVA internals, not a component surface) is the only non-listed `ui/` entry, by
the same reasoning `proof:glass-cohesion` / `proof:no-shadcn-default` exempt it.
