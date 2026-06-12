# BA.W-ICON-CHIP — the pop register abstracted into a library `<IconChip>` primitive

**Name**: W-ICON-CHIP - the section-color icon-chip primitive (recipe + ratio + duotone/bloom/reveal axes)
**Opens after**: BA Batch 4 (the glass grammar lands — W-GLASS-CAL's disco retirement is the binding fence on the bloom axis); runs ALONE as Batch 5 (the only Batch-5 wave; precedes W-SUFFUSE2 in Batch 6, whose pop map's vehicle is this primitive — EXECUTION-DAG §6)
**Agents**: 2 serial (the primitive+CSS+exports unit, then the consumer-collapse+gate unit on the landed primitive)
**Hard gate**: `proof:icon-chip` (born-RED) — the `<IconChip>` primitive owns the `color-mix` backplate recipe + the chip≤glyph ratio + the three opt-in axes; the four copy-pasted inline-`:style` chip recipes (`icons.vue`, `empty-states.vue`, `auth-shell.vue`, + `MetricCell` iconColor) are GONE (no surviving inline `color-mix(in srgb, var(--section-color-${…}) 25%, transparent)` paste outside the primitive); born ≥2 consumers; the one-color-event rule holds (the chip is the ONE event vehicle, the `proof:suffuse` d1/d2/d3 ledger asserts against the single component, not N pastes); + the π readback at `:5199` proving the rendered chip is byte-faithful to the reference register in BOTH modes + the `proof:ba-gestalt` verdict.
**Status**: SPEC

## §0 — RE-GROUND (mandatory step-0; re-grep every cite at HEAD before any edit)

This wave starts from the icon-pops fleet lane's root-cause anchors, not a blind re-diagnose
(BA invariant 3 — re-opened ≠ rebuilt-blind). Before touching a byte, the impl agent re-greps
each anchor below at HEAD, confirms the four inline-paste sites still carry the identical
`color-mix` recipe, and re-confirms there is still NO library `IconChip`/`Pop` primitive; if any
cite has drifted (a paste already collapsed, the recipe `%` retuned, MetricCell's `iconColor`
seam moved), the agent records the drift in PROGRESS and re-locates the mechanism — it does NOT
re-invent the diagnosis.

Grounding findings (`audit/fleet/icon-pops.md`): **POP-1** (the abstraction gap — the chip
recipe is a hand-rolled inline `:style` pattern copy-pasted across 4 surfaces, NO library
primitive owns it), **POP-2** (the register is FLAT-STATIC — no hover-bloom, no glyph
micro-animation, no entrance reveal; the headroom for "how might the icon register increase"),
**POP-3** (the richness directions in proportion-safe order: duotone glyph → chip hover-bloom →
entrance reveal → the dead `--tier-featured` gold marker). The lane's reference register +
proportion rule are the binding design constraints.
Captures: `audit/fleet/icon-pops-evidence/{icons-ref-light-pops.png, empty-states-dark.png,
forms-inputs-dark-flat.png}` (the 13-chip reference row, the empty-states ONE-event read, the
monochrome-starvation read).

The mechanism (confirmed at HEAD this authoring — every cite re-read this session):

1. **The chip recipe is a hand-rolled inline `:style` paste with NO owning primitive (POP-1).**
   The canonical register lives at `demo/stories/foundations/icons.vue:144-158` — a `size-12`
   (48px) `rounded-full` circle, backplate `color-mix(in srgb, var(--section-color-${pop.section})
   25%, transparent)` (`:148`), glyph `var(--section-color-${pop.section})` at full chroma (`:149`),
   `:size="22"` `:stroke-width="1.75"` (`:154-155`). The applied twin at
   `empty-states.vue:130-139` repeats the SAME recipe at `size-14`/`size-6` glyph (`:131`, `:138`)
   plus a `hue-rotate(var(--hue-shift,0deg))` and a `var(--muted)`/`var(--muted-foreground)`
   fallback (`:133-135`). `auth-shell.vue:99-100` is the THIRD verbatim paste (the trust badges,
   same `color-mix(… 25%, transparent)` + glyph-color pair with the `--muted` fallback). A grep
   confirms ZERO `IconChip`/`Pop` library primitive — `src/components/custom/` carries
   `toggle-chip`, `metric-badge`, `status-dot`, `stacked-icons` but none is the section-color
   icon chip. A new surface that wants a pop must re-paste the recipe and re-derive the chip≤glyph
   proportion by hand.
2. **`MetricCell` exposes a parallel, narrower seam — the 4th consumer the primitive subsumes.**
   `MetricCell.vue:72` declares `iconColor?: string` (the LEADING-GLYPH-only tint, the
   one-color-event prop), consumed at `:142` as `:style="iconColor ? { color: iconColor } : undefined"`.
   It tints the glyph but has NO backplate — it is the chip recipe MINUS the `color-mix` plate. The
   primitive's `:section`/`:tone` axis reconciles it: MetricCell's glyph-tint becomes the
   primitive's no-plate register (or composes `<IconChip variant="bare">`), so the seam is ONE
   recipe, not two.
3. **The register is FLAT-STATIC — the headroom for richness (POP-2/POP-3).** The chip never
   reacts (only the host CARD lifts on hover, `icons.vue:107` / `empty-states.vue:126`). There is
   ZERO duotone/fill treatment on any lucide glyph in the codebase (grep-confirmed). `vReveal`
   (`src/composables/motion/vReveal.ts:25`, on the root barrel `src/index.ts:162`) ships the
   `[data-reveal]`/`--d` entrance directive and the library's own pop showcase never consumes it.
   `--tier-featured` (`tokens/light-dark.css:136` light arm + `tokens/dark-arm.css:105` dark arm,
   `oklch(0.841 0.173 84.2)` / `oklch(0.867 0.165 88.7)`) is minted with a dual arm but DEAD —
   zero demo consumers — the natural warm pop the cool-biased section ramp does not cover.
4. **The one-color-event rule is binding + machine-checked (the proportion fence).** The chip is
   the ONE event vehicle per surface, NEVER a rainbow: `proof:suffuse` (`scripts/proof-suffuse.mjs`)
   asserts (d1) body ink untinted on each enrolled surface (`:330-355`), (d2) chip ≤ icon scale,
   (d3) ≤1 declared tinted event family per enrolled surface (`:355-396`) against a per-surface
   LEDGER (`:103`). The primitive must make this STRUCTURALLY easy — the chip≤glyph ratio is
   enforced in the component, so a consumer cannot oversize the plate, and `proof:suffuse` gains a
   SINGLE component to assert against instead of N inline pastes.

RE-GROUND command set (run all; confirm each mechanism):

```
sed -n '124,164p' demo/stories/foundations/icons.vue              # the canonical chip recipe (the reference register)
sed -n '129,140p' demo/stories/compositions/empty-states.vue      # the applied twin (size-14/size-6 + hue-shift + fallback)
sed -n '95,102p'  demo/stories/compositions/auth-shell.vue        # the third verbatim paste (trust badges)
sed -n '60,75p'   src/components/custom/metric-cell/MetricCell.vue # the iconColor glyph-tint seam (:72 decl)
sed -n '138,144p' src/components/custom/metric-cell/MetricCell.vue # the iconColor consumption (:142)
grep -rn 'color-mix(in srgb, var(--section-color-' src demo       # the FULL inline-paste census (the d-count)
grep -rn 'IconChip\|<Pop\b' src                                   # MUST be empty (no owning primitive at HEAD)
sed -n '25,60p'   src/composables/motion/vReveal.ts               # the entrance directive the reveal axis consumes
grep -n 'tier-featured' src/styles/tokens/light-dark.css src/styles/tokens/dark-arm.css  # the dead gold marker
sed -n '95,120p'  scripts/proof-suffuse.mjs                       # the LEDGER the primitive consolidates the d-checks onto
```

## Defect table (file:line — RE-GREP at HEAD)

| # | finding | file:line | the mechanism |
|---|---|---|---|
| 1 | POP-1 abstraction gap (the reference) | `demo/stories/foundations/icons.vue:144-158` (`:148` backplate, `:149` glyph, `:154-155` size/stroke) | the canonical recipe is an inline `:style` paste; no owning primitive |
| 2 | POP-1 applied twin | `demo/stories/compositions/empty-states.vue:130-139` (`:131` size-14, `:134-135` color-mix+glyph w/ `--muted` fallback, `:133` hue-shift, `:138` size-6) | the same recipe re-pasted at a different scale + a hue-rotate + a fallback arm |
| 3 | POP-1 third paste | `demo/stories/compositions/auth-shell.vue:99-100` | the trust-badge chips — a third verbatim `color-mix(… 25%, transparent)` + glyph-color paste |
| 4 | POP-1 fourth consumer (narrower seam) | `src/components/custom/metric-cell/MetricCell.vue:72` (`iconColor?` decl), `:142` (the glyph-tint `:style`) | the leading-glyph tint without a backplate — the chip recipe minus the plate; the primitive subsumes it |
| 5 | POP-2 register flat-static | `icons.vue` (the `pops` block — no hover/reveal); `vReveal` `src/composables/motion/vReveal.ts:25` unused by the showcase | the chip never animates; the entrance directive exists and the pop showcase never consumes it |
| 6 | POP-3 dead gold marker | `src/styles/tokens/light-dark.css:136`; `src/styles/tokens/dark-arm.css:105` | `--tier-featured` minted with a dual arm, zero demo consumers — the natural warm pop for a featured/recommended surface |
| 7 | the proportion fence | `scripts/proof-suffuse.mjs:103` (LEDGER), `:330-355` (d1), `:355-396` (d3) | the one-color-event rule is machine-checked; the primitive consolidates N pastes onto one assertable component |

## Goal criterion

`<IconChip>` ships as the library's single section-color pop primitive — it OWNS the
`color-mix(in oklab, …)`-faithful backplate recipe, enforces the chip≤glyph proportion in the
component (a consumer cannot oversize the plate), and exposes the three opt-in richness axes
(duotone fill / hover-bloom / entrance-reveal, each PRM-gated and disco-FREE per the W-GLASS-CAL
fence). The four hand-rolled inline-`:style` paste sites collapse onto it, MetricCell's `iconColor`
glyph-tint reconciles into its no-plate register, and a new proportioned pop becomes ONE component
rather than a re-paste — so the one-color-event rule is structurally easy to honor and
`proof:suffuse` asserts against a single component, not N pastes. This wave succeeds if a user
opening `/foundations/icons` and `/compositions/empty-states` sees the SAME pop register in BOTH
modes, now driven by the primitive, with the chip the ONE event on every enrolled surface.

## Scope

1. **Mint the `<IconChip>` primitive** (`src/components/custom/icon-chip/`, the colocation shape —
   `IconChip.vue` + `index.ts` + `types.ts` per the `stacked-icons`/`status-dot` precedent). The
   contract: `icon: Component` (the lucide glyph; functional-component form per the AZ `isComponent`
   precedent), `section?: number` (0..12, the `--section-color-N` ramp index) XOR `tone?: string`
   (a complete token color, e.g. `var(--chart-download)`/`var(--tier-featured)` — the
   MetricCell-`iconColor` reconcile path), `size?` (the chip diameter; default `48`/`size-12` — the
   reference register), `glyphSize?`/`strokeWidth?` (default `22`/`1.75`). The component owns the
   backplate `color-mix(in oklab, var(--section-color-${section}) 25%, transparent)` (or
   `color-mix(… <tone> 25% …)` on the tone arm) + the full-chroma glyph color, with the
   `var(--muted)`/`var(--muted-foreground)` fallback the empty-states paste carries. The visual CSS
   half lives in `src/styles/icon-chip.css` (the recipe + the three axes + the dark-arm reconcile;
   imported into `src/styles/index.css` so `/styles` ships it).
2. **Enforce the chip≤glyph ratio IN the component** (the d2 proportion, structurally). The chip
   diameter is `max(<glyphSize> × <chip-glyph-ratio>, <glyphSize>)` so the plate can never paint
   smaller than the glyph, and the default ratio reproduces the reference 48/22 ≈ 2.18 — a consumer
   that sets a tiny `size` cannot collapse the plate under the glyph. The ratio is a
   `--icon-chip-glyph-ratio` token (token-first; consumers retune without a component edit).
3. **The duotone axis** (`duotone?: boolean`, default `false` — POP-3 direction 1, the richest
   single uplift). When set, a low-alpha `fill` of the same `--section-color-N`/`tone`
   (`color-mix(… 18%, transparent)`-class) paints UNDER the full-chroma `stroke` — the iOS/Material
   "filled-tonal" move, the same 25%-vs-full relationship the backplate already speaks, moved INSIDE
   the glyph. STAYS mono-hue (proportion-safe — never a second hue). The fill alpha is an
   `--icon-chip-duotone-fill` token. (Lucide glyphs are stroke-only by default; the duotone fill is
   applied via the SVG `fill` channel on the icon element the primitive renders — the impl agent
   confirms the lucide-vue v1 icon honors a forwarded `fill` / `:fill`, and routes through a
   `[data-duotone] svg` rule if the prop form does not reach the inner paths.)
4. **The hover-bloom axis** (`bloom?: boolean`, default `false` — POP-2 direction 2, the chip is
   static today). The chip's OWN hover register: the backplate mix lifts 25%→~35%, a soft
   `--section-color` glow ring appears, the glyph stroke firms — on the §6 easing doctrine
   (`--ease-standard` for the surface bg/glow cross-fade, `--spring-smooth` for any scale). **DISCO
   FENCE (binding):** the bloom is the SMOOTH GLASS register, NEVER a sparkle-sweep/disco-grain — it
   composes the W-GLASS-CAL-retired-disco's REPLACEMENT calm register, not the retired family. No
   `sparkle-sweep`/`btn-audacious`/`disco-grain` utility is referenced.
5. **The entrance-reveal axis** (`reveal?: boolean | number`, default `false` — POP-2 direction 3).
   When set, the chip composes the shipped `vReveal` directive (`--d` index for the stagger) so a
   chip CLUSTER (the 13-stop Pops row, the empty-states grid) blooms in sequence. PRM-gated by
   `vReveal`'s own construction (no motion under reduce). A numeric `reveal` is the `--d` stagger
   index; `true` is index 0.
6. **Collapse the four paste sites onto the primitive** (the ≥2-consumer bar, met by the LIBRARY
   consumer alone + the demo consumers): `icons.vue:144-158` → `<IconChip>` walked over the ramp;
   `empty-states.vue:130-139` → `<IconChip :section :icon>` (the `hue-shift`/fallback preserved as
   props); `auth-shell.vue:99-100` → `<IconChip>`; `MetricCell.vue` `iconColor` reconciles — its
   glyph-tint becomes the primitive's no-plate/`bare` register (MetricCell either composes
   `<IconChip variant="bare">` for its leading glyph OR the `iconColor` prop is documented as the
   tone-arm-no-plate alias; the impl agent picks the path that keeps MetricCell's value/unit ink
   untinted and the `bare` register byte-identical). NO inline `color-mix(in srgb,
   var(--section-color-${…}) 25%, transparent)` paste survives outside the primitive.
7. **Publish the surface** (the L.W1 subpath shape): `src/subpaths/icon-chip.ts`
   (`export * from "../components/custom/icon-chip"` — batch-resolved by the vite glob, no hand-add
   to vite config); the `IconChip`/`IconChipProps` types added to `src/api/index.ts`; the
   `./icon-chip` entry added to `package.json` `exports` + `typesVersions["*"]` (contract-v2
   `{ types, import }` shape, mirroring `./status-dot:339`). The primitive is on the curated root
   barrel `src/index.ts` (it is vueuse-free + lightweight — the StackedIcons/StatusDot precedent;
   confirm no `@vueuse/core` reaches it).
8. **Consolidate the `proof:suffuse` d-checks onto the primitive** (the abstraction's gate
   dividend): the d2 chip≤glyph assert points at the component's enforced ratio (a source assert on
   the `--icon-chip-glyph-ratio` recipe) rather than re-deriving from N inline pastes; the LEDGER
   enrolls the IconChip-bearing surfaces so the d3 one-event count holds. Body ink stays untinted
   (d1 unchanged — the primitive tints ONLY the chip+glyph, never a sibling `<p>`).

## Triumvirate Dispatch

- **File-bounds expansion that invalidates the wave**: if reconciling `MetricCell.iconColor`
  (scope 6) cannot be done without changing `MetricCell`'s value/unit ink rendering or the
  `bare`/`compact`/`dashboard` register contract (a cross-consumer surface speedtest binds) — that
  is a scope-reveal; triumvirate (research the reconcile options + plan-augment the bound +
  redress), do NOT widen the MetricCell contract unilaterally.
- **Hard-gate failures not local-edit-recoverable**: if the duotone `fill` channel cannot reach the
  lucide-vue v1 inner SVG paths after the prop-forward + the `[data-duotone] svg` fallback (the
  glyph stays stroke-only, the duotone axis paints nothing) — that is a glyph-substrate miss;
  triumvirate, do not loop on `:fill` prop forms (the binding-verification class: a stale icon-lib
  prop binding silently no-ops — MEMORY glass-ui-binding-verification).
- **Diagnostic loop halt**: if after the seam fix the rendered chip still diverges from the
  reference register's π readback (the wrong `%`, the wrong glyph color, a plate-over/under-glyph
  ratio break) and three iterations have not isolated which token/recipe layer differs, halt and
  triumvirate (the `in srgb`→`in oklab` interpolation-space choice + the chip-glyph-ratio recipe are
  the suspects; the lane's reference readback at stop 0 — bg `color(srgb 0.915 0.484 0.671 / 0.25)`,
  glyph `oklch(0.721 0.145 354)` — is the binding target).

## File Bounds

| File | Access |
|---|---|
| `src/components/custom/icon-chip/IconChip.vue` | create (the primitive SFC) |
| `src/components/custom/icon-chip/index.ts` | create (the package barrel) |
| `src/components/custom/icon-chip/types.ts` | create (`IconChipProps`/`IconChipSection`/`IconChipTone`) |
| `src/styles/icon-chip.css` | create (the recipe + duotone/bloom axes + dark-arm reconcile) |
| `src/styles/index.css` | modify (`@import` the icon-chip partial in cascade order) |
| `src/components/custom/index.ts` | modify (add the `icon-chip` package barrel re-export) |
| `src/subpaths/icon-chip.ts` | create (the one-line subpath mirror barrel) |
| `src/index.ts` | modify (root-barrel re-export — the cherry-pick rationale comment) |
| `src/api/index.ts` | modify (add `IconChip`/`IconChipProps`/`IconChipSection`/`IconChipTone` to the discovery layer) |
| `package.json` | modify (`./icon-chip` export + `typesVersions` entry + register `proof:icon-chip` in scripts + `proof:all`/parity) |
| `scripts/proof-icon-chip.mjs` | create (the born-RED gate) |
| `scripts/gates.mjs` | modify (register the `proof:icon-chip` row in the gate registry) |
| `scripts/proof-suffuse.mjs` | modify-carve (point d2 at the component's enforced ratio + enroll the IconChip surfaces in the LEDGER) |
| `src/components/custom/metric-cell/MetricCell.vue` | modify (reconcile `iconColor` onto the primitive's no-plate register — value/unit ink untouched) |
| `demo/stories/foundations/icons.vue` | modify (the Pops block → `<IconChip>` walked over the ramp) |
| `demo/stories/compositions/empty-states.vue` | modify (the state cards → `<IconChip :section :icon>`) |
| `demo/stories/compositions/auth-shell.vue` | modify (the trust badges → `<IconChip>`) |
| `CLAUDE.md` | modify (record the IconChip primitive in §Structure custom/ + the suffusion register section) |
| `MIGRATION.md` | modify (no breaking row — additive primitive; note the new `./icon-chip` subpath) |

Do NOT touch:
- **`scripts/proof-ba-gestalt.mjs` / the W-GESTALT-GATE roster** (Batch 0 owns the gestalt gate;
  this wave's surfaces are JUDGED by it, never edit it — enroll via the gate's own consumer seam if
  needed, coordinated, not by editing the gate).
- **`demo/stories/compositions/settings.vue`** — it composes the section-EYEBROW accent
  (`--section-label-accent`/`.section-label--tinted`, `settings.vue:279-300`), NOT the chip recipe;
  it is NOT a paste site (the brief named it but the eyebrow register is W-SUFFUSE2's bound, Batch 6).
  Touching it here is out of scope.
- **W-SUFFUSE2's surfaces** (Batch 6) — the page-by-page pop SPREAD (forms eyebrows, the 16-story
  Containers category, the metric-demo `--chart-*` wiring) is W-SUFFUSE2's bound; this wave SHIPS
  the vehicle and collapses the EXISTING four pastes only. The new-surface spread consumes the
  primitive THERE, not here.
- **`src/composables/motion/vReveal.ts`** — the reveal axis CONSUMES the shipped directive; it does
  not modify it.
- **`src/styles/tokens/light-dark.css` / `dark-arm.css`** (W-DARK-MATERIAL Batch 1 owns the token
  arms; the `--section-color-N` dual arms + `--tier-featured` are READ, never re-tuned here).
- The standing fences: the GL shader internals (aurora.frag/metaball.frag); ppmycota purple never
  enters library tokens (the IconChip `tone` arm takes a token, never a demo-local purple literal);
  the slides `docs/tranches/M/` docs are foreign.

### Disjointness

Two agent units, SEQUENCED (serial), so no intra-wave concurrent path contention:
**W-ICON-CHIP.1** creates the primitive + CSS + the subpath/api/exports plumbing and lands the gate
born-RED→source-ready; **W-ICON-CHIP.2** runs ON the landed primitive to collapse the four
consumers + the `proof:suffuse` carve + the gate GREEN. No two units write the same path
concurrently — unit 1's create-set (`icon-chip/*`, `icon-chip.css`, the barrels, `api`, `package.json`,
`gates.mjs`, `proof-icon-chip.mjs`) is disjoint from unit 2's consumer-collapse set
(`MetricCell.vue`, the three demo stories, `proof-suffuse.mjs`), and the serial order means unit 2
imports a finished surface. Across the tranche: W-ICON-CHIP is ALONE in Batch 5 — no parallel
sibling wave writes any path. W-SUFFUSE2 (Batch 6) writes the SPREAD surfaces (NOT the four pastes
this wave owns) and lands strictly after; no shared-path race.

### Worktree Plan

Two serial agents share clean main (the orchestrator commits unit 1 before dispatching unit 2 — the
serial ordering means no sibling-worktree parallelism is needed; unit 2 dispatches against the
unit-1-landed HEAD). If the orchestrator elects to run them in one worktree sequentially, the
commit-before-unit-2 discipline (WAVE_SPEC §4b) holds: unit 2 begins from a clean tree carrying the
landed primitive.

## Agent Units

### BA.W-ICON-CHIP.1 the `<IconChip>` primitive + the recipe/ratio/axes + the publication plumbing

- Goal: `<IconChip>` ships as a vueuse-free root-barrel primitive owning the `color-mix` backplate
  recipe, the chip≤glyph ratio enforced in-component, and the three opt-in axes (duotone/bloom/reveal),
  on its `./icon-chip` subpath + `/api` discovery types, byte-faithful to the reference register.
- Mechanism: create `src/components/custom/icon-chip/{IconChip.vue,index.ts,types.ts}` (the
  colocation shape) + `src/styles/icon-chip.css` (recipe + axes + dark reconcile, `@import`ed into
  `index.css`). The recipe reproduces `icons.vue:144-158` exactly on `:section` (bg
  `color-mix(in oklab, var(--section-color-${section}) 25%, transparent)`, glyph
  `var(--section-color-${section})`, `:size`/`:stroke-width` defaults 22/1.75) and on `:tone` (the
  same with a complete token color). The chip≤glyph ratio is the `--icon-chip-glyph-ratio` recipe
  (default reproduces 48/22). `duotone` adds the low-alpha `fill` under the stroke; `bloom` adds the
  smooth-glass hover register (NO disco); `reveal` composes `vReveal`. Then the publication:
  `src/subpaths/icon-chip.ts`, `src/components/custom/index.ts` re-export, `src/index.ts`
  root-barrel cherry-pick, `src/api/index.ts` types, `package.json` `./icon-chip` export +
  `typesVersions`. Confirm vueuse-free (the root-barrel SCC trap).
- Files: `src/components/custom/icon-chip/*` (create), `src/styles/icon-chip.css` (create),
  `src/styles/index.css`, `src/components/custom/index.ts`, `src/subpaths/icon-chip.ts` (create),
  `src/index.ts`, `src/api/index.ts`, `package.json`, `scripts/proof-icon-chip.mjs` (create),
  `scripts/gates.mjs`.
- Sub-gate: the gate's W1+W2+W3+W5 SOURCE witnesses — the primitive EXISTS and owns the recipe
  (W1), enforces the ratio (W2), exposes the three axes prop-gated (W3), and is published on the
  subpath + api + barrel (W5); `npm run typecheck` + `npm run build` green (the CSS partial
  compiles, the `.d.ts` for `./icon-chip` emits); `npm run verify-export-types` passes the
  `./icon-chip` subpath probe.

### BA.W-ICON-CHIP.2 the consumer collapse + the proof:suffuse consolidation + GREEN

- Goal: the four paste sites are GONE (no inline `color-mix(… section-color … 25% …)` survives
  outside the primitive), MetricCell's `iconColor` reconciles onto the no-plate register with its
  value/unit ink untouched, and `proof:suffuse` asserts against the one component.
- Mechanism: re-point `icons.vue:144-158` (the Pops block) + `empty-states.vue:130-139` +
  `auth-shell.vue:99-100` to `<IconChip>` (preserve empty-states' `hue-shift`/`--muted` fallback as
  props); reconcile `MetricCell.vue:142`'s `iconColor` glyph-tint onto the primitive's `bare`/no-plate
  register (value/unit ink untouched — the d1 floor). Carve `proof-suffuse.mjs`: point d2 at the
  component's `--icon-chip-glyph-ratio` recipe, enroll the IconChip surfaces in the LEDGER so the d3
  count holds.
- Files: `demo/stories/foundations/icons.vue`, `demo/stories/compositions/empty-states.vue`,
  `demo/stories/compositions/auth-shell.vue`, `src/components/custom/metric-cell/MetricCell.vue`,
  `scripts/proof-suffuse.mjs` (modify-carve).
- Sub-gate: the gate's W4 witness — `grep -rn 'color-mix(in srgb, var(--section-color-${' src demo`
  returns ZERO inline paste outside `icon-chip/` (the consolidation is COMPLETE, not partial); the
  ≥2-consumer census (W6) holds (icons + empty-states + auth-shell + MetricCell ≥ 2); `proof:suffuse`
  GREEN against the consolidated component; the π readback (W7) shows the rendered chip byte-faithful
  to the reference register in BOTH modes.

## Hard Gate

`proof:icon-chip` (born-RED at HEAD, driven GREEN by the wave) — falsifiable SOURCE witnesses (the
comment-strip + pure-detector house pattern, mirroring `proof-suffuse.mjs`/`proof-dock-unify.mjs`),
each red at HEAD pre-wave:

1. **W1 — the primitive OWNS the recipe.** `src/components/custom/icon-chip/IconChip.vue` EXISTS and
   its template renders the `color-mix(… var(--section-color-${section}) 25% …)` (or the `tone` arm)
   backplate + the full-chroma glyph color. RED at HEAD: the dir does not exist (`grep -rn 'IconChip'
   src` returns 0). **Bite-tightening (anti-evasion):** the assert is POSITIVE — the component's
   recipe references the `--section-color`/`tone` token AND the `25%` mix stop (the reference register
   value), not merely "a file named IconChip exists" (an empty stub passes a name check while the
   recipe lives elsewhere).
2. **W2 — the chip≤glyph ratio is enforced IN the component.** The chip diameter recipe is
   `max(<glyph> × --icon-chip-glyph-ratio, <glyph>)` (or equivalent floor) so the plate can NEVER
   paint under the glyph — the d2 proportion is structural, not a per-consumer hope. RED at HEAD: no
   component owns the ratio (the four pastes hardcode `size-12`/`size-14` independently). The assert
   names the `--icon-chip-glyph-ratio` token AND the `max()`/floor form (a bare `size: 48px` literal
   that happens to be ≥ the glyph fails — the ratio must be the mechanism, so a consumer's small
   `size` cannot collapse it).
3. **W3 — the three axes are prop-gated + disco-FREE.** `IconChipProps` declares `duotone?`,
   `bloom?`, `reveal?`; the duotone adds a `fill` under the stroke, the bloom adds the smooth-glass
   hover register, the reveal composes `vReveal`. RED at HEAD: no such props exist. **Bite-tightening:**
   the gate asserts the bloom recipe references NO `sparkle-sweep`/`btn-audacious`/`disco-grain`
   utility (the W-GLASS-CAL disco fence, negative-predicate) AND the reveal references `vReveal`/`[data-reveal]`
   (the shipped directive, not a hand-rolled keyframe) AND a `prefers-reduced-motion` guard exists on
   the deform axes.
4. **W4 — the four pastes are GONE.** `grep -rn 'color-mix(in srgb, var(--section-color-${' src demo`
   (the inline-template-literal paste form) returns ZERO outside `src/components/custom/icon-chip/`.
   RED at HEAD: the grep returns the four paste sites (`icons.vue:148`, `empty-states.vue:134`,
   `auth-shell.vue:99`, + the `MetricCell` glyph-tint seam). The assert is the COMPLETE-consolidation
   floor — a partial collapse (3 of 4 migrated) fails.
5. **W5 — the surface is published.** `package.json` `exports["./icon-chip"]` carries the contract-v2
   `{ types, import }` shape AND `typesVersions["*"]["icon-chip"]` resolves AND
   `src/subpaths/icon-chip.ts` exists AND `IconChip`/`IconChipProps` are in `src/api/index.ts`. RED at
   HEAD: no such entries. Verified by `npm run verify-export-types` (the subpath dts probe) +
   `npm run proof:resolution`.
6. **W6 — born ≥2 consumers.** The IconChip consumer census (icons.vue + empty-states.vue +
   auth-shell.vue + MetricCell) is ≥2 LIVE binary/demo consumers (the L inv-8 substrate-with-consumer
   bar). The assert counts the live `<IconChip` render sites; RED at HEAD (zero — the primitive does
   not exist).
7. **The π binding readback** (the cardinal-lesson DELTA, captured own-surface): a live
   `/foundations/icons` + `/compositions/empty-states` capture at `:5199` in BOTH modes with a paired
   π `getComputedStyle` readback proving (a) the rendered chip backplate resolves to
   `color-mix(… --section-color-N 25% …)` at the reference value (the lane's stop-0 target: bg
   `color(srgb 0.915 0.484 0.671 / 0.25)`, glyph `oklch(0.721 0.145 354)` — the POSITIVE token test,
   not a `≠`-string), (b) the chip diameter ≥ the glyph (the d2 proportion holds at render), and (c)
   on the duotone-demo chip the glyph carries a `fill` (the axis paints, not a no-op). Captured to
   `docs/tranches/BA/audit/visual/W-ICON-CHIP-DELTA.md` with before/after frames against the
   `audit/fleet/icon-pops-evidence/icons-ref-light-pops.png` baseline. **The π half is the binding
   visual truth — if the source half passes but the live render diverges from the reference register
   (the wrong `%`, a plate-under-glyph break, the duotone fill absent), the wave does NOT close.**

W1-W6 are the device-free CI half (`proof:icon-chip`); the π readback is the binding visual truth.

**THE GESTALT BAR (BA invariant 4 — the P-1 close-class fix).** Per-mechanism greens alone do NOT
close this visual wave. `/foundations/icons` and `/compositions/empty-states` are captured WHOLE-PAGE,
BOTH modes, over their real backdrop, and judged as a gestalt ("does the pop register read as a
designed whole, the chip the ONE event, no rainbow?") — recorded against `proof:ba-gestalt`
(W-GESTALT-GATE's roster). A wave whose `proof:icon-chip` passes but whose page reads wrong closes
`complete_with_misses`, not `complete`. The binding gestalt verdict is re-confirmed at W-REFLECT2.

## Format And Lint Cadence

`npm run typecheck` after the IconChip SFC + the api/index.ts type additions; `npm run build` to
confirm the `icon-chip.css` partial compiles + the `./icon-chip` `.d.ts` emits;
`npm run verify-export-types` after the package.json/subpath edits (the subpath dts probe);
`node scripts/proof-icon-chip.mjs` born-RED before the source edits (proof it fails at HEAD), GREEN
at close; `npm run proof:suffuse` GREEN after the consumer-collapse + the LEDGER carve;
`npm run proof:gate-script-parity` after the package.json/gates.mjs registration; `git diff --check`
before close.

## Verification Artefacts

- `docs/tranches/BA/audit/visual/W-ICON-CHIP-DELTA.md` — before/after `/foundations/icons` +
  `/compositions/empty-states` frames in BOTH modes + the paired π readback (chip bg resolved color,
  glyph color, chip-vs-glyph diameter, the duotone fill present) against the
  `icon-pops-evidence/icons-ref-light-pops.png` baseline.
- The `proof:icon-chip` JSON artefact (born-RED log + GREEN-at-close log).
- The `proof:suffuse` GREEN log post-consolidation (the d2/d3 against the single component).
- The `verify-export-types` + `proof:resolution` output proving `./icon-chip` resolves.
- The gate-script-parity output post-registration.

## Commit Plan

- impl commit (unit 1): `feat(icon-chip): the <IconChip> section-color pop primitive — recipe + chip≤glyph ratio + duotone/bloom/reveal axes (BA.W-ICON-CHIP)` — names the recipe + the three axes + the subpath publication in the body.
- impl commit (unit 2): `refactor(demo,metric-cell): collapse the four inline chip pastes onto <IconChip>; consolidate proof:suffuse onto the primitive (BA.W-ICON-CHIP)` — names the four sites + the MetricCell reconcile + the LEDGER carve.
- gate commit: `test(icon-chip): proof:icon-chip born-RED→GREEN + parity registration + suffuse re-point`.
- doc/status commit: the CLAUDE.md IconChip record (§Structure custom/ + the suffusion section) + the MIGRATION additive-subpath note + the DELTA doc + PROGRESS row.

## Dependencies

- **Depends on**: W-GLASS-CAL (Batch 4) — the hover-bloom axis must compose the disco-RETIRED calm
  replacement register, not the retired `btn-audacious`/sparkle-sweep/disco-grain family; W-GLASS-CAL
  lands the retirement first, so the bloom axis builds on the settled §6-doctrine register (the gate's
  W3 disco-fence negative-predicate would fail if the bloom re-introduced a retired utility).
  W-DARK-MATERIAL (Batch 1) — the `--section-color-N` dual light/dark arms + `--tier-featured` dark
  arm are the substrate the chip reads (the pop is mode-robust by construction, the lane's key
  property); this wave READS those arms, never re-tunes them.
- **Blocks**: W-SUFFUSE2 (Batch 6) — its page-by-page pop SPREAD (the forms eyebrows, the 16-story
  Containers category, the metric-demo `--chart-*` wiring, the content-page focal pop) consumes
  `<IconChip>` as the pop vehicle; the EXECUTION-DAG §6 sequences W-ICON-CHIP → W-SUFFUSE2 for exactly
  this reason (the vehicle ships before the spread). W-ANIMATE (Batch 6) may consume the chip's
  `reveal` axis on the pop-cluster surfaces (the entrance stagger).

## Archaeology

No prior attempt — the IconChip primitive is net-new (the abstraction gap POP-1 names is that it has
NEVER existed; the recipe lived only as inline pastes). The closest precedent is AZ.W-SUFFUSE, which
ENROLLED the high-leverage pop subset (motion purple, settings eyebrows, metric glyphs) onto the
`proof:suffuse` ledger and explicitly NAMED the library-wide breadth + the abstraction to a successor
(the icon-pops lane is that successor's under-spent half). The guardrail this wave adds over
W-SUFFUSE: the pop is now a COMPONENT (the one-event rule is structurally easy, `proof:suffuse`
asserts against one surface not N pastes), and the gate's W4 complete-consolidation floor + the π
reference-faithful readback close the "recipe drifts per paste" class W-SUFFUSE's inline-paste model
left open.
