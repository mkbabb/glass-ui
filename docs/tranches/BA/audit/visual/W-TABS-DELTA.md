# BA.W-TABS — DELTA (the standardized tab family: ONE engine, TWO materials)

**Wave**: BA.W-TABS — the tabs overhaul. ONE engine, TWO materials (pill-glass +
underline-paper), ONE orientation axis, the re-timed indicator.
**Branch**: tranche/BA · **HEAD at start**: d60ffdd3
**Captured-π**: `tests-visual/tabs-std.spec.ts` (12/12 GREEN, both projects, both modes,
≥2 viewports) · captures `W-TABS-std-{mobile,desktop}-{light,dark}.png` (this dir).
**Gate**: `proof:tabs-std` — GREEN (SOURCE arm all clauses + the fail-CLOSED π live arm:
glided=true, squished=true, noPlate=true). Born-RED at HEAD by construction (the old
3-value/overflow/multi shape + the `--duration-normal` clock + `INDICATOR_RELEASE_MS`
all flipped every clause).

## The defects fixed (R10-2, the user: "totally overhaul and standardize our tabs")

| # | defect (R10-2 / valuejs-fold) | root cause @ HEAD | fix |
|---|---|---|---|
| W1 | the underline OVAL BLOB — `color(srgb 0.108… / 0.58)` pill, radius 9999px, 40×31 behind "Notes" | the demo drove `ui/Tabs` whose `indicator:true`+`surface:true` baked a `--glass-bg-quiet` pill UNDER a hand-rolled underline | `ui/Tabs` left the public surface; the demo rebuilt on `SegmentedTabs variant="underline"` — the `.paper-ink-mark` 2px ink hairline, NO plate. π: underline `::before` ≤4px, zero filled-pill offenders. |
| W2 | the VERTICAL GRAY SLAB — 28×120 dark plate behind "Profile" | `TabsIndicator.vue:32` horizontal-only utilities (`top-1 bottom-1 w-… translate-x-…`); no vertical-axis arm | the engine is axis-derived (`vertical` param + `.segmented-tabs--vertical` anchor block); the indicator tracks the BLOCK axis. π: dy=93 (block) ≫ dx=0 (inline), indH=31 ≪ stripH=132 (one tab, not a column slab). |
| W3 | "springs … too slow" — within-1px at ~109ms but the transition ran 300ms (a ~190ms dead sub-pixel tail) + squish released mid-glide (`INDICATOR_RELEASE_MS=60ms`, peak 1.062 at 59ms BEFORE arrival) | the generic `--duration-normal` (0.3s) clock + the fixed mid-glide release timer + 3-4 desynced property transitions | the clock re-points to `--tab-indicator-duration` (= `--spring-snappy-duration`, the W-GLASS-CAL calibrated ~0.34s snappy settle); the squish RELEASES AT ARRIVAL (`INDICATOR_RELEASE_AT_ARRIVAL` × the clock); ONE composited transform pair. π: peakStretch>1 during travel, settledAt ≤ clock+slop, transition NOT "0.3s". |
| W5 | the pill indicator MIS-CENTERED on its label (valuejs-fold A-5 / U21) | `useTabIndicator.ts:102/120` `translateX(${btn.offsetLeft}px)` — left-edge write, NO center-correction | the JS slider is CENTER-anchored (translate = center − size/2); AND the live-found `inset-block: auto` anchor-clobber (collapsed the indicator to height 0 → its center 19.5px above the label center) DELETED. π: dx=0, dy=0 (pill); dx=0 (underline) — indicator center == label center, both axes, both materials. |

## The cut taxonomy (clean break, no alias — "No legacy code")

- **`variant`**: `"pill"` (DEFAULT, the GLASS material — absorbs the retired `segmented`)
  + `"underline"` (the PAPER material on `.paper-ink-mark`). The 3-value
  `segmented·pill·underline` axis is GONE.
- **`overflow="scroll"/"auto"` axis RETIRED** (0 consumers; overflow is
  `<FadingScroll>`'s job — the W-FADING-SCROLL coordination). The c5 clause in
  `proof:fading-scroll` narrowed to "SegmentedTabs carries NO scroll-fade machinery"
  (the consumer dissolved with the retired axis).
- **`:multi-select` RE-HOMED to `<ToggleGroup type="multiple">`.** The single-select
  string model replaces the `string | string[]` union.
- **`ui/Tabs` OFF the public barrel** (root + ui/ barrels). The reka substrate files
  STAY INTERNAL solely for the dock-rail consumer (`DockLayerGroup.vue:217` +
  `<TabsIndicator :surface="false">` — re-grepped at HEAD, the **internal-keep arm
  holds**, recorded in PROGRESS). The `/tabs` subpath = `SegmentedTabs`, preserved.

## The two materials over their proper substrates (the demo rebuild — NF-1/3/7)

- **Pill (glass)** — over a live `glass-card`; horizontal + a vertical mount.
  (NF-1: the full-width-track gray bar gone — the pill track is content-width glass.)
- **Underline (paper)** — over a `paper-grain-overlay` card; horizontal + a vertical
  leading-edge ink rail (the math-paper `border-l` read).
- **Responsive** — collapses to a `<Select>` below 640px.
- (NF-3: the rogue `<h3 text-small>` gone — every section is a `<StorySection heading>`
  canonical `<h2 text-subheading>`. NF-7: the four-radii incoherence collapsed to the
  pill/underline pair.)

## The dependency seams (consumed, never re-minted)

- `--spring-snappy-duration` (W-GLASS-CAL Unit 3, `scheme-motion.css:205` = 0.34s) — the
  indicator clock reads it via `--tab-indicator-duration`. Consumed.
- `.paper-ink-mark` (W-SURFACE-AXIS, `glass/surface-axis.css:109`) — the underline ink
  hairline composes it (a HORIZONTAL 2px mark; the documented W-TABS consumer shape, no
  shape gap → no triumvirate fired). Consumed.

## Registry + gate

- `proof:tabs-std` registered (package.json scripts + gates.mjs manifest + the
  tag-parity HEADER_LIVE_VERIFIED re-point); `proof:tabs-unified` retired-with-re-point
  (the script file deleted, the registration removed). `proof:tag-parity` GREEN (0
  header drift). `proof:consumer-staleness` GREEN (10 DEFERRED-with-terminal: the 5 prior
  + 5 NEW ui/Tabs-retirement rows for the 2 `words/frontend` sites).
- MIGRATION.md: the 4 clean-break rows + the external re-issue note. The 5 external
  DEFERRED rows (fourier UnderlineTabs → `variant="underline"`, words BouncyToggle →
  default pill) re-target the standardized API; the receiver contract (`:options` /
  `:model-value` / `@update:model-value` + `variant`) is PRESERVED.

## Triggers fired

NONE. The `.paper-ink-mark` register carried the underline indicator (no shape gap →
no minting-wave triumvirate). The dock-rail consumer rode the internal-keep arm (no
DockLayerGroup structural edit needed → no scope-reveal triumvirate). The timing was
local-edit-recoverable in one iteration (the clock re-point + release-at-arrival). The
one diagnostic loop (the `inset-block: auto` anchor-clobber) was root-caused on the
FIRST π probe — the `@layer`-vs-utility precedence class was not the suspect; it was the
shorthand-clobbers-longhand class, fixed and re-verified inside the iteration budget.
