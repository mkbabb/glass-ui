# BA.W-TABS — the tab family standardized on glass (ONE engine, TWO registers, no legacy)

**Name**: W-TABS - the tabs overhaul: pill-glass + underline-paper on ONE re-timed indicator engine
**Opens after**: BA Batch 4 open, AFTER W-GLASS-CAL's spring-duration unit lands (this wave's indicator clock CONSUMES the `--spring-<name>-duration` vocabulary that unit mints — the intra-batch edge is declared in EXECUTION-DAG §5a); runs ‖ the remaining Batch-4 waves (disjoint bounds: this wave owns `custom/tabs/*` + `ui/tabs/*` + `segmented-tabs.css` + the tabs story; no sibling writes them)
**Agents**: 2 serial (W-TABS.1 the engine + registers → W-TABS.2 the retirements + demo story + migration map)
**Hard gate**: `proof:tabs-std` (born-RED) — the underline paints NO plate (the R10-2 oval blob dead), the vertical indicator tracks the vertical axis, the indicator settles on the calibrated spring clock with squish release-at-arrival, the indicator CENTERS on its label (BA-VJS-3 / valuejs-fold A-5 — indicator center == label center, both axes, both materials), the retired surfaces are GONE (ui/Tabs off the public barrel; overflow/multi-select axes dead), `proof:tabs-unified` REBASELINED — plus the π timing/no-plate/centering readback + the `proof:ba-gestalt` verdict on `/navigation/tabs`.
**Status**: SPEC

## Goal criterion

ONE tab family that speaks the house's two materials: the PILL register (glass track,
the selected-reads-as-glass indicator, the iOS-snappy elastic glide — "the pill
variants are good") and the UNDERLINE register (a pure paper-ink hairline for
paper/editorial scenarios — no plate, no blur). Every superfluous type is gone, the
indicator motion reads crisp (not "too slow"), and a consumer choosing a tab control
faces exactly one decision: which material, which orientation.

## §0 — RE-GROUND (mandatory step-0; re-grep every cite at HEAD before any edit)

Grounding: `audit/fleet/r10-tabs-overhaul.md` (the R10 census — read it WHOLE) +
`ground/R10-02-tabs-awful.png` + `fleet/r10-tabs-{full,underline-blob,vertical}-dark.png`
+ `fleet/r10-fd-delta.md` NF-1/NF-3/NF-7. The user's words (R10-2, binding): "totally
overhaul and standardize our tabs. No legacy code… the pill variants are good, and we
should have underline variants that are used for paper scenarios… too many types…
entirely superfluous. The animations for springs suck and are not smooth enough/too
slow."

The four live-proven mechanisms (BA invariant 3 — re-grep, do not re-diagnose):

1. **The oval blob is `ui/Tabs`, not `SegmentedTabs`.** The demo's underline section
   drives reka `<Tabs>`/`<TabsList>`, which defaults `indicator: true`
   (`TabsList.vue:19`) + `surface: true` (`TabsIndicator.vue:18`) → the baked
   `--glass-bg-quiet` `rounded-pill` plate paints UNDER a hand-rolled `border-b`
   underline. Live: `color(srgb 0.108 0.0984 0.092 / 0.58)`, radius 9999px, 40×31
   behind "Notes" — the AZ dock-rail `surface`-prop class, inverted (default-ON).
2. **The vertical slab is the SAME indicator with horizontal-only utilities**
   (`TabsIndicator.vue:32` — `top-1 bottom-1 w-… translate-x-…`; no vertical axis
   path) → a 28×120 dark column slab behind "Profile".
3. **`SegmentedTabs` underline is already correct** (the `::before` 2px
   `--foreground` hairline, no plate) — the overhaul standardizes ONTO it, not away
   from it.
4. **The timing defect is the clock, not the spring.** The indicator reaches 90%
   travel at ~100ms but rides the generic `--duration-normal: 300ms` (a ~190ms
   sub-pixel undershoot tail), and the squish releases on a fixed
   `INDICATOR_RELEASE_MS = 60ms` — mid-glide, BEFORE arrival (peak stretch 1.062 at
   59ms). 3-4 separate property transitions desync. The general root is the
   suffusion lane's [S1]: `springLinearStops` normalizes the curve and DISCARDS the
   spring's response, so every CSS consumer rides a generic duration token —
   W-GLASS-CAL's spring-duration unit mints the `--spring-<name>-duration`
   vocabulary; THIS wave consumes it for the tab clock.
5. **BA-VJS-3 — the pill indicator is mis-centered on the label (valuejs-fold A-5,
   U21).** `useTabIndicator.ts:102/120` positions the indicator via
   `translateX(${btn.offsetLeft}px)` with NO center-correction; `TabsIndicator.vue` is
   the slab. The value.js consumer side is correct (`flex items-center justify-center`)
   — the offset is INSIDE the indicator engine. The engine rebuild (scope 1-3) must NOT
   re-ship it; folded as an ACCEPTANCE ROW (W5), NOT new scope — the letter is explicit
   ("Do not author new scope — add a centering acceptance row"). Reproduced on a live
   3.13.0 registry consumer per the value.js N2 fleet (`U-CONTROLS.md §U21`).

Census truth (consumer-evidenced, re-grep at HEAD): segmented ×7 · underline ×4 ·
pill ×1 (demo) · `overflow=scroll/auto` ×0 · `:multi-select` ×1 (demo) · `ui/Tabs`
public ×1 binary (`DockLayerGroup.vue:217` — INTERNAL dock-rail use) · slides tab
consumers ×0 · external DEFERRED migrations ×5 (fourier-analysis 3× UnderlineTabs,
words 2× BouncyToggle — `AY W-CONSUMER-ledger:37-41`, both migrate TO SegmentedTabs).

## The design (BINDING — Fable, R10; a lane may not re-taxonomize)

**ONE component — `SegmentedTabs` — TWO registers — ONE orientation axis — ONE
indicator engine.**

| axis | values | the register |
|---|---|---|
| `variant` | **`pill`** (DEFAULT; ABSORBS `segmented` — they are one register, the user kept it by name) | THE GLASS MATERIAL: the track on `--glass-bg-quiet` + hairline edge; the indicator is the selected-reads-as-glass plate (`--glass-bg-floating`, the W-REGISTER-IOS tier — NEVER a saturated hue, never opaque `bg-card`); hover lifts `--glass-bg-resting`. |
| | **`underline`** | THE PAPER MATERIAL: NO plate, NO blur, NO track surface — the 2px `--foreground` ink hairline riding the shared `.paper-ink-mark` register W-SURFACE-AXIS mints (the math-paper rail's sibling); for paper/editorial scenarios (a `paper-grain` page, a math block, an editorial card). The indicator engine drives the hairline's inline position/width only. |
| `orientation` | `horizontal` (default) · `vertical` | FIRST-CLASS on the ONE engine: the indicator transform path is axis-derived (`dim` computed, the dock-morph idiom) — the R10-2 vertical slab class (horizontal-only utilities) is structurally impossible. Vertical underline = the leading-edge ink rail (the `border-l` math-paper read). |
| ARIA | per-variant (AX.W53 PRESERVED) | `underline` = panel-nav (`tablist`/`tab`/`aria-selected`); `pill` = group semantics (`group`/`aria-pressed`). |

**The indicator motion contract (the "springs suck" fix):**
- ONE composited transform channel — `translate` + `scale` composed together (the
  3-4 desynced property transitions collapse to one compositor pair).
- The clock is the CALIBRATED spring duration — `--tab-indicator-duration:
  var(--spring-snappy-duration)` (the W-GLASS-CAL vocabulary; lands ~240ms within
  the lane's measured 220–260ms window), NOT the generic `--duration-normal`.
- The squish RELEASES AT ARRIVAL: the volume-preserving stretch keys off travel
  progress (release when the indicator is within the settle threshold), not the
  fixed `INDICATOR_RELEASE_MS = 60ms` mid-glide timer. `--tab-indicator-max-stretch`
  (1.08 cap) and the PRM no-deform gate are unchanged.

**The retirements (clean break, no alias — "No legacy code"):**
1. `variant="segmented"` FOLDS INTO `pill` (one register; the 7 consumers re-pin via
   a mechanical rename — MIGRATION row).
2. `overflow="scroll" / "auto"` axis RETIRES (0 consumers; overflow is
   `<FadingScroll>`'s job — W-FADING-SCROLL, Batch 2, already landed by Batch 4).
3. `:multi-select` RE-HOMES to ToggleGroup (the IG-B2 segmented ToggleGroup register
   — the W-SURFACE-AXIS/IG-B2 fold gives ToggleGroup the glass track; a multi-pressed
   strip IS a ToggleGroup, not a tab family member). MIGRATION row for the 1 demo
   consumer.
4. **`ui/Tabs` leaves the public surface** (root barrel + `/tabs`-family exports +
   the demo story section): the reka substrate files remain INTERNAL solely for the
   dock-rail consumer (`DockLayerGroup.vue:217` + `TabsIndicator :surface="false"`,
   the AZ hairline contract) — or, if W-DOCK-SECTIONS's rebuild (Batch 3, already
   landed) freed that consumer, the substrate deletes outright; the impl agent
   re-greps the dock consumer at HEAD and records which arm holds. The
   `indicator`/`surface` default-ON plate dies with the public surface either way.
5. The demo `/navigation/tabs` story REBUILDS on the standardized family (the NF-1
   full-column-width tracks fixed to content-width; the NF-3 rogue
   `<h3 text-small>` dies; the NF-7 four-radii incoherence collapses to the
   pill/underline pair); "The constellation can update" (R10, verbatim) — the page's
   substrate may change freely.

## Scope

1. Re-cut `SegmentedTabs`'s variant axis to `pill` (default, absorbing segmented) +
   `underline` (the paper register on `.paper-ink-mark`); retire the segmented value,
   the overflow axis, and the multi-select prop (clean breaks, MIGRATION rows).
2. Make `orientation` first-class in `useTabIndicator`: the transform path derives
   from a computed axis (`dim`), both variants, both orientations — the vertical
   underline is the leading-edge ink rail.
3. Re-time the indicator: one composited translate+scale channel; the clock re-points
   to `--tab-indicator-duration: var(--spring-snappy-duration)`; the squish release
   keys off arrival (travel-progress threshold), retiring `INDICATOR_RELEASE_MS`.
4. Retire `ui/Tabs` from the public surface per design item 4 (re-grep the dock-rail
   consumer; internal-keep or full-delete recorded in PROGRESS).
5. Rebuild the `/navigation/tabs` story on the standardized family (NF-1/NF-3/NF-7
   fixed; both materials demonstrated over their proper substrates — pill over a
   live glass backdrop, underline over a paper/grain card).
6. Rebaseline `proof:tabs-unified` → `proof:tabs-std` (the new taxonomy's witnesses);
   author the MIGRATION rows (segmented→pill, multi-select→ToggleGroup, overflow→
   FadingScroll, ui/Tabs retirement) + RE-ISSUE the external migration map (the 5
   DEFERRED fourier/words rows re-target the new API; `proof:consumer-staleness`'s
   allowlist re-stamps).

## Triumvirate Dispatch

- **Scope-reveal**: the dock-rail consumer (`DockLayerGroup.vue:217`) cannot ride the
  internal-keep NOR free itself without a `DockLayerGroup` structural edit (W-DOCK-
  SECTIONS's landed bound) — triumvirate; do not widen into the dock band unilaterally.
- **The `.paper-ink-mark` seam**: if W-SURFACE-AXIS's minted register cannot carry the
  underline indicator (a shape mismatch), that is the declared cross-wave seam failing
  — triumvirate (research the register's shape), never a local fork of a second
  ink-hairline recipe.
- **Timing not local-edit-recoverable**: if release-at-arrival + the calibrated clock
  still reads wobbly after two iterations, halt — the engine's transition architecture
  (the multi-property desync) is the suspect; triumvirate on the one-channel rebuild.
- **Diagnostic loop**: three iterations on any indicator paint defect without a
  root-cause → halt (the `@layer`-vs-utility precedence class is the recurring
  suspect — the AZ dock-rail precedent).

## File Bounds

| File | Access |
|---|---|
| `src/components/custom/tabs/SegmentedTabs.vue` | modify (the variant re-cut + orientation axis + prop retirements) |
| `src/components/custom/tabs/composables/useTabIndicator.ts` | modify (the axis-derived transform, the one-channel composite, release-at-arrival, the calibrated clock) |
| `src/components/custom/tabs/index.ts` + `src/subpaths/tabs.ts` | modify (the export surface re-cut) |
| `src/styles/segmented-tabs.css` | modify (the pill/underline register split; the underline re-points to `.paper-ink-mark`; the track/indicator glass tiers) |
| `src/components/ui/tabs/*` | modify-carve or delete (design item 4 — the public-surface retirement; the internal dock-rail keep recorded if held) |
| `src/index.ts` + `src/components/ui/index.ts` | modify (the ui/Tabs barrel rows retire) |
| `demo/stories/navigation/tabs.vue` | modify (the story rebuild) |
| `scripts/proof-tabs-std.mjs` | create (born-RED; supersedes `proof-tabs-unified.mjs` — the old gate retires WITH a registry re-point, not a silent delete) |
| `tests-visual/tabs-std.spec.ts` | create (the π: no-plate-under-underline, vertical-axis tracking, the timing readback) |
| `package.json` + `scripts/gates.mjs` | modify (gate registration — append-own-row per DAG §9.1) |
| `MIGRATION.md` | modify (the four clean-break rows + the external re-issue note) |
| `docs/tranches/BA/audit/visual/W-TABS-DELTA.md` | create |

Do NOT touch: `_shared/menuItemVariants.ts` (W-MENU-GLASS); the surface-axis mixin
files (W-SURFACE-AXIS — `.paper-ink-mark` is CONSUMED, a shape gap triumvirates);
`utilities/btn.css`/`tokens/glass.css` blur+spring-duration primitives (W-GLASS-CAL —
the `--spring-snappy-duration` token is consumed, never minted here);
`DockLayerGroup.vue`/the dock band (Batch 3, landed — read-only re-grep);
`curve-gallery.vue` (W-DEMO-AFFORDANCES consumes the standardized family in Batch 6);
ToggleGroup (the multi-select re-home TARGETS the W-SURFACE-AXIS/IG-B2 register —
this wave only retires the prop + writes the MIGRATION row); GL shaders; ppmycota
purple; slides M docs.

### Disjointness

Two agent units SERIAL (.2 consumes .1's re-cut API for the story + migration map);
no parallel write. Across Batch 4: no sibling writes any tabs path; the two declared
consume-seams (`.paper-ink-mark` ← W-SURFACE-AXIS, `--spring-snappy-duration` ←
W-GLASS-CAL unit 1) are ordered by the DAG §5a edge.

## Hard Gate

`proof:tabs-std` (born-RED at HEAD) + the π (`tests-visual/tabs-std.spec.ts`):

1. **W1 — the underline paints NO plate.** π: on `/navigation/tabs`, the underline
   variant's active item has NO ancestor/sibling indicator element whose computed
   `background-color` α > 0.05 or `border-radius` ≥ 9999px (the R10-2 oval blob
   dead); the ink hairline computes 2px `--foreground`. RED at HEAD (the live-traced
   `color(srgb 0.108… / 0.58)` plate).
2. **W2 — the vertical indicator tracks the vertical axis.** π: switching tabs in a
   vertical mount moves the indicator on the BLOCK axis (the bounding box's y/height
   change dominates); no full-height column slab. RED at HEAD (`TabsIndicator.vue:32`
   horizontal-only).
3. **W3 — the motion contract.** Source: the clock reads `--tab-indicator-duration:
   var(--spring-snappy-duration)` (not `--duration-normal`); `INDICATOR_RELEASE_MS`
   is GONE; one composited transform channel. π: a programmatic switch settles
   (within-1px) inside the calibrated clock with NO post-settle transition running
   past it (the 190ms dead tail gone), and the squish max occurs BEFORE the release
   begins (release-at-arrival ordering).
4. **W4 — the taxonomy is cut.** Source: `variant="segmented"`, the overflow axis,
   `:multi-select`, and the ui/Tabs public barrel rows are GONE (grep-negative);
   `proof:tabs-unified` retired-with-re-point; the MIGRATION rows present; the
   external re-issue map authored. **Anti-evasion**: the dock-rail consumer
   re-grepped + its arm (internal-keep vs delete) recorded — a silent ui/Tabs
   survivor on the public barrel reds.
5. **W5 — the indicator centers on its label (BA-VJS-3, valuejs-fold A-5).** π: on
   `/navigation/tabs`, the active indicator's geometric CENTER equals the active-label's
   geometric center on BOTH axes (x AND y), in BOTH materials (pill AND underline). The
   root is `useTabIndicator.ts:102/120` positioning the indicator via
   `translateX(${btn.offsetLeft}px)` with NO center-correction (the value.js consumer
   side is correct — `flex items-center justify-center`; the offset is inside the
   indicator engine). **Acceptance: indicator center == label center, both axes, both
   materials.** This is an ACCEPTANCE ROW on the rebuilt engine — NO new scope (the
   letter is explicit); the W-TABS engine rebuild (scope 1-3) must NOT re-ship the
   offset. RED at HEAD: the un-center-corrected `translateX(offsetLeft)`.
6. **The gestalt verdict (BA invariant 4)**: `/navigation/tabs` whole-page BOTH modes
   over its (updatable) substrate — judged as a designed pair of materials; recorded
   at W-REFLECT2 on the tabs/motion surface.

## Named successors

The ToggleGroup glass-track standardization (the multi-select re-home's TARGET) is
W-SURFACE-AXIS/IG-B2's; if that fold under-delivers the multi-pressed strip, the gap
names a BB-letter successor — it does not silently re-open a tabs prop.

## Commit Plan

- unit 1: `feat(tabs): ONE engine, two materials — pill-glass + underline-paper, axis-derived orientation, release-at-arrival on the calibrated spring clock (BA.W-TABS)`
- unit 2: `feat(tabs)!: retire segmented/overflow/multi-select axes + the ui/Tabs public surface; story rebuild; proof:tabs-std + MIGRATION (BA.W-TABS)`
