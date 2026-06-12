# R10-2 — the TABS OVERHAUL analysis (the standardize-and-re-time lane)

**Lane:** the full tab-family census + the oval-blob/vertical-panel root-cause + the spring-timing
verdict + the target taxonomy. Read-only; live-probed `:5210/navigation/tabs` (headless dark) via the
chrome-devtools CLI. Captures under `fleet/r10-tabs-*`. Builds on R8 fleet + R9 (the gray self-engage)
+ the AZ dock-rail precedent (`TabsIndicator.surface` prop). The user's binding read: "totally overhaul
and standardize our tabs. No legacy code … pill … good … underline … for paper scenarios … these are
awful … too many types … entirely superfluous. The animations for springs … not smooth enough/too slow."

---

## 0. The headline (the read, anchored)

The capture's two defects are **NOT in `SegmentedTabs`** — they are in the **`ui/Tabs` (reka) family**,
which the demo story drives with hand-rolled Tailwind recipes that COLLIDE with two new always-on
defaults: `TabsList`'s `indicator: true` (`TabsList.vue:19`) and `TabsIndicator`'s `surface: true`
(`TabsIndicator.vue:18`). The blob behind "Notes" and the gray vertical panel are the **baked glass
PLATE indicator** (`bg-(--glass-bg-quiet) [backdrop-filter] rounded-pill`) painting underneath a
hand-rolled underline/vertical `TabsList` that never set `:indicator="false"`. `SegmentedTabs`'
underline `::before` is a CORRECT 2px hairline (live-measured below). So the overhaul has TWO halves:
(1) **the bug** — a `ui/Tabs` default-collision, (2) **the standardization** — TWO parallel tab
families (reka `ui/Tabs` + `SegmentedTabs`) each with their own underline/pill/vertical recipes is the
"too many types" the user means; the gestalt fix is ONE family on ONE indicator engine.

---

## 1. THE FULL TAB-FAMILY CENSUS (at HEAD)

### 1.A The two families that ship

| family | files | indicator engine | variants shipped |
|---|---|---|---|
| **`ui/Tabs`** (reka wrapper) | `src/components/ui/tabs/{Tabs,TabsList,TabsTrigger,TabsContent,TabsIndicator}.vue` (subpath: root barrel `src/index.ts`) | reka `TabsIndicator` + `--reka-tabs-indicator-{size,position}` baked plate (`TabsIndicator.vue:32`), `--spring-snappy` | implicit: `orientation="horizontal\|vertical"` × whatever the consumer hand-rolls (default · pill · underline · vertical are all DEMO recipes, NOT component variants) |
| **`SegmentedTabs`** (custom) | `src/components/custom/tabs/SegmentedTabs.vue` + `composables/useTabIndicator.ts` + `constants.ts` (subpath `/tabs`) | `useTabIndicator` (CSS anchor or JS-measured) + the elastic squish, `--spring-snappy` | `variant: segmented\|pill\|underline` × `multiSelect` × `overflow: none\|scroll\|auto` × `responsive` |

### 1.B `SegmentedTabs` — the full combination matrix (each × consumer count)

`variant` (3) × `multiSelect` (segmented/pill only) × `overflow` (3) × `responsive` is the declared axis
space (`SegmentedTabs.vue:72-99`). The combinations that ACTUALLY ship (grep `<SegmentedTabs` over
`src/` + `demo/` + slides):

| combination | LIVE consumers (file:line) | count |
|---|---|---|
| `segmented` (default, single) | `aurora/config/CompositionLayer.vue:20`, `TextureLayer.vue:39,48,57`, `PresetEditor.vue:240,350`, `navigation/tabs.vue:255` | 7 |
| `variant="pill"` | `navigation/tabs.vue:272` (the demo only) | 1 |
| `variant="underline"` | `motion/curve-gallery.vue:165` (the curve-family PICKER, `:responsive`), `aurora/config/FlowLayer.vue:26`, `navigation/tabs.vue:294,341` | 4 |
| `:multi-select` | `navigation/tabs.vue:316` (the demo only) | 1 |
| `overflow="scroll"` / `"auto"` | **ZERO live consumers** (demo + tests only — declared-but-unconsumed) | 0 |
| `responsive` | `curve-gallery.vue:165`, `navigation/tabs.vue:341` | 2 |

**Slides repo: ZERO tab consumers** (grep `:5273` repo — no `SegmentedTabs`/`<Tabs`/`/tabs` import).
The slides break risk is NIL for this overhaul.

### 1.C `ui/Tabs` — consumer truth

| `ui/Tabs` site | role | break-on-overhaul? |
|---|---|---|
| `src/components/custom/dock/DockLayerGroup.vue:217-235` | the in-dock switcher RAIL — uses `<TabsIndicator :surface="false">` deliberately (the AZ.W-DOCK-RAIL hairline) | **YES — load-bearing**; the dock rail IS a real `ui/Tabs` binary consumer (the only non-demo one) |
| `demo/stories/navigation/tabs.vue:109,142,171,202` | 4 hand-rolled demo recipes (default/pill/underline/vertical) | demo-only — the constellation may freely change (R10 directive 2) |

**The verdict the census forces:** `ui/Tabs` has exactly ONE binary consumer beyond the demo — the
dock switcher rail (`DockLayerGroup`). `SegmentedTabs` has ~13 live demo consumers + the 5 DEFERRED
external (§4). The `pill` and `multi-select` `SegmentedTabs` variants have ONE demo consumer each; the
`overflow="scroll"/"auto"` axis has ZERO. The "superfluous types" are concrete: the entire `ui/Tabs`
public surface (kept only for the dock rail, which can compose the unified engine directly), plus the
unconsumed `overflow` axis on `SegmentedTabs`.

### 1.D The adjacent overlaps

- **`ToggleGroup`** (`src/components/ui/toggle-group/`) — the IG-B2 overlap the user named elsewhere.
  `SegmentedTabs :multi-select` IS a ToggleGroup-shaped surface (`role="group"`/`aria-pressed`,
  README:36). Two primitives now express "N independent toggles on one surface": `<ToggleGroup>` and
  `<SegmentedTabs :multi-select>`. Live `ToggleGroup` consumers: `toggle-chip/ToggleChip.vue`,
  `aurora/sections/AuroraColorSection.vue`, `aurora/config/PaletteLayer.vue`, 3 demo stories. This is a
  SEPARATE standardization (toggle-vs-tab) — flag for the synthesis, do not fold into the tab cut.
- **`DockTabButton`** (`src/components/custom/dock/DockTabButton.vue`) — a dock-CONTROL button, NOT a
  tab strip; it has its own `dock-controls/tab-button.css` register. Consumers: `BottomDock.vue`,
  `instrument-chassis.vue`. NOT a tab-family member; leave untouched.
- **The curve-picker strip** (`curve-gallery.vue:165`) — already a `SegmentedTabs variant="underline"`
  (the canonical picker). W-DEMO-AFFORDANCES's chip-rack re-conception touches the curve-gallery PLAY
  controls (the `.btn-pill.glass-btn` blob, fleet `demo-affordances.md:60`), NOT this picker — the
  picker is correct and stays.

---

## 2. ROOT-CAUSE (live-proven, dark)

Live `getComputedStyle` on the 4 `ui/Tabs` baked indicators + the `SegmentedTabs` hairline (dark on,
`document.documentElement.classList.contains("dark") === true`):

### 2.A The oval blob — `ui/Tabs` underline `[S2]`

The "Underline" section (`navigation/tabs.vue:169-198`) renders `<Tabs>` + `<TabsList class="rounded-none
border-b … bg-transparent">`. `TabsList` defaults `indicator: true` (`TabsList.vue:19`) → renders
`<TabsIndicator>` → which defaults `surface: true` (`TabsIndicator.vue:18`) → bakes the PLATE utilities
(`TabsIndicator.vue:33`):

```
ui_indicators[2] (orientation=horizontal, the underline section):
  bg:            color(srgb 0.108 0.0984 0.092 / 0.58)   ← --glass-bg-quiet dark plate
  backdropFilter: blur(10px) saturate(1.05) brightness(…)
  borderRadius:   9999px                                  ← rounded-pill → the OVAL
  w×h:            40 × 31                                  ← a pill behind "Notes"
```

**The mechanism is the AZ dock-rail class, INVERTED.** AZ.W-DOCK-RAIL added `surface` SO the dock rail
could turn the plate OFF (`:surface="false"`) and let a token rule win; the DEFAULT stayed `true`
("byte-identical to the prior unconditional render", `TabsIndicator.vue:7`). But the DEMO's underline
recipe is a SEPARATE hand-rolled register (`data-[state=active]:border-foreground` underline on the
trigger) that never anticipated a baked plate — so the always-on `surface=true` plate paints a pill
UNDER the hand-rolled border-bottom underline. Two indicators stack: the (invisible, transparent-bg)
hand-rolled `border-b` AND the baked glass pill. The pill is the blob.

### 2.B The vertical gray panel — `ui/Tabs` orientation=vertical `[S2]`

The "Vertical" section (`navigation/tabs.vue:200-238`) renders `<Tabs orientation="vertical">` + the
same `<TabsList>` (indicator defaults true AGAIN). The baked `TabsIndicator` is **authored for the
horizontal axis only** — `absolute left-0 bottom-1 top-1 w-(--reka-tabs-indicator-size)
translate-x-(--reka-tabs-indicator-position)` (`TabsIndicator.vue:32`). In a vertical column reka feeds
`--reka-tabs-indicator-size` = the tab HEIGHT and `-position` = the vertical offset, but the utility
only consumes `width`/`translate-x`:

```
ui_indicators[3] (orientation=vertical):
  bg:           color(srgb 0.108 0.0984 0.092 / 0.58)  ← same dark glass plate
  borderRadius: 9999px
  w×h:          28 × 120                                ← a tall narrow dark plate filling the column
```

The 28×120 dark plate behind "Profile", over the `bg-card/40` panel wrapper, IS the flat gray-on-gray.
The indicator has no vertical-axis arm — it cannot track a column. (This is the same axis-blind-indicator
class as the AZ dock vertical-morph trap, here un-fixed for `ui/Tabs`.)

### 2.C The CORRECT register (proof the SegmentedTabs underline is right) `[reference]`

```
seg_underline_before (.segmented-tabs--underline::before):
  bg:         rgb(232, 231, 227)   ← --foreground (dark mode)
  blockSize:  2px / height: 2px    ← a TRUE hairline, NOT a plate
  borderRadius: 4px
  content:    ""  scale: 1
```

`SegmentedTabs`' underline (`segmented-tabs.css:209-221`) is a 2px `--foreground` rule anchored to the
active tab — exactly the "underline for paper scenarios" the user wants. **The bug is NOT in the unified
component**; it is the demo driving the reka family with a plate-baking default. Captures:
`fleet/r10-tabs-underline-blob-dark.png` (the pill behind Notes), `fleet/r10-tabs-vertical-dark.png`
(the column plate behind Profile), `fleet/r10-tabs-full-dark.png` (the page).

---

## 3. THE SPRINGS TIMING AUDIT (live-measured)

**Register:** the indicator GLIDES on `--spring-snappy` at `--duration-normal` (verified at HEAD —
`segmented-tabs.css:69,80,100-102,228`; `TabsIndicator.vue:32`). Tokens resolve to:
`--duration-normal: 0.3s` (`scheme-motion.css:68`), `--tab-indicator-max-stretch: 1.08`
(constants.ts:11), squish release `INDICATOR_RELEASE_MS = 60` (constants.ts:17).

**The `--spring-snappy` curve** (`scheme-motion.css:184`, a 49-stop `linear()`): peak overshoot **y=1.068
at 16.3% (≈49ms of 300ms)**, undershoot trough **y=0.9954 at 32.7% (≈98ms)**, then a sub-pixel crawl
back to 1.0 over the **remaining ≈200ms**.

**Live measurement** (programmatic far-jump idx0→last on the default `SegmentedTabs`, frame-sampled
`getBoundingClientRect`):

| measure | value |
|---|---|
| `getAnimations()` scheduled | 3 transitions (`scale`, `left`, `right`), each `duration: 300ms`, easing `--spring-snappy` |
| reaches 90% of travel | **≈100ms** |
| within 1px of final | **≈109ms** |
| positional overshoot | **0px** (the curve's 6.8% overshoot is on the indicator SCALE/inset, sub-pixel at this width) |
| peak `--stretch` (squish) | **1.062** at **59ms** (the elastic open) |
| transition still "running" until | **300ms** (the declared duration; last ≈190ms is the sub-pixel tail) |

**The verdict — WHY it reads "not smooth enough/too slow":**

1. **`--duration-normal` (300ms) is the wrong clock.** iOS segmented controls settle in ~250-300ms but
   with a HIGH-stiffness spring whose visible work is front-loaded and whose tail is imperceptible. Here
   the curve does its real positional work by ≈100ms, but the transition is declared 300ms — the element
   stays "in transition" for ~190ms of sub-pixel undershoot-recover that reads as a soft, lagging settle
   rather than a crisp snap. The house §6 doctrine (tokens.css §2) puts segmented-control travel on
   `--spring-snappy`; the DURATION is the un-tuned knob (`--duration-normal` is a generic 300ms, not a
   travel-calibrated tab clock).
2. **The squish RELEASE fires mid-glide.** `INDICATOR_RELEASE_MS = 60ms` (constants.ts) opens the stretch
   to 1.062 at 59ms then schedules `squish(0)` at +60ms — i.e. the release happens WHILE the position is
   still gliding (90% at 100ms). The open-then-release on a 300ms scale transition produces a width-wobble
   that desyncs from the position glide. The "grow then shrink" is meant to punctuate ARRIVAL, but it
   releases before arrival.
3. **Multi-property desync.** The glide animates 3-4 separate properties (`left`+`right`+`scale` on the
   anchor path; `transform`+`width`+`scale`+`opacity` on the JS path, `segmented-tabs.css:75-81`) each on
   the same 300ms spring. Coordinating 3-4 spring transitions is more fragile than one transform; any
   per-property rounding reads as a micro-stutter.
4. **The curve's undershoot dip** (y=0.9954 at 98ms) means the indicator slightly RETREATS past its
   target then recovers — on a translucent glass plate against text, this micro-reversal reads as
   "not smooth."

**Direction (analysis, Fable designs):** re-time onto a SHORTER, travel-calibrated clock (a dedicated
`--tab-indicator-duration` ≈ 220-260ms, NOT the generic 300ms `--duration-normal`); keep `--spring-snappy`
but ensure the squish release lands AT or AFTER positional arrival (release ≈ duration, not +60ms);
collapse to ONE animated transform where possible (translate+scale on the compositor, off `left`/`right`
layout-inset). The §6 doctrine stays (spring for transform-travel); the knob is the duration + the
release-timing coordination, not the easing family.

---

## 4. THE TARGET TAXONOMY (KEEP / RE-CUT / RETIRE — with consumer evidence)

### 4.A The disposition table

| artefact | disposition | rationale + consumer evidence |
|---|---|---|
| **`SegmentedTabs` `variant="pill"`** | **KEEP** (the user: "pill … good") | the glass-track pill; 1 demo consumer but it IS the named-good register — promote to the flagship |
| **`SegmentedTabs` `variant="segmented"`** | **KEEP / fold into pill** | 7 consumers; segmented IS a pill-on-a-track. Consider collapsing segmented+pill into ONE "pill" register with a track-density axis (the user named "pill", not "segmented") |
| **`SegmentedTabs` `variant="underline"`** | **KEEP, RE-CUT for PAPER** (the user: "underline … for paper scenarios") | 4 consumers; already a correct 2px hairline (§2.C). RE-CUT = key it to the PAPER register (no glass plate, no blur — the ink hairline on a paper surface; the `--foreground` rule over `paper-grain`, never the glass-bg-quiet plate). Drop the squish on the underline (a hairline does not squish — it slides) |
| **`SegmentedTabs` `overflow="scroll"/"auto"`** | **RETIRE** | ZERO live consumers (declared-but-unconsumed); the W-FADING-SCROLL wave already owns the scroll-fade migration (BA.md:140 names "SegmentedTabs overflow=scroll mask") — fold the retirement into that wave |
| **`SegmentedTabs` `:multi-select`** | **RE-HOME or KEEP-narrow** | 1 demo consumer; overlaps `ToggleGroup` (§1.D). Decide one home for "N toggles on one surface" — either ToggleGroup absorbs it or SegmentedTabs owns toggle+tab. Flag for synthesis |
| **`SegmentedTabs` `:responsive`** | **KEEP** | 2 consumers (the curve-picker collapses to Select <768px); a real affordance |
| **`ui/Tabs` family (reka)** | **RETIRE the public surface; keep ONLY the dock-rail internal** | 1 binary consumer (`DockLayerGroup.vue:217`). The dock rail composes the reka `TabsIndicator :surface=false` for its hairline; re-home that as a dock-internal, drop `ui/Tabs` from the root barrel. The 4 demo recipes become `SegmentedTabs` variants. THIS is the "too many types" cut |
| **`TabsIndicator surface` prop** | **RE-EVALUATE** | the prop exists ONLY for the dock-rail off-switch; if `ui/Tabs` is internalized to the dock, the prop folds into the dock-rail's own indicator |
| **`ToggleGroup`** | **separate standardization** | not folded here; flag the tab-vs-toggle overlap for the synthesis |
| **`DockTabButton`** | **untouched** | a dock control, not a tab strip |

### 4.B The glass-idiom tab (the sketch — Fable finalizes)

ONE component, ONE indicator engine, TWO surface registers keyed to substrate:

- **The PILL (glass scenario)** — the pill on a glass track. The track is `--glass-bg-wash` (the flagship
  surface, already at `segmented-tabs.css:33`); the active indicator is a forward glass tier
  (`--glass-bg-quiet`, `segmented-tabs.css:48`) that reads FORWARD of the track — the keyframes-dock-
  selected "selected reads as glass" model (the same register W-REGISTER-IOS shipped for the dock). It
  GLIDES + squishes. This is the default. **No gray** (R10-5): the track + indicator are glass tiers, not
  `--muted`/`--surface-tint` plates — re-point any `--surface-tint-6` (the pill variant's track,
  `segmented-tabs.css:166`) onto the glass-bg ladder so it reads as warm glass, not gray.
- **The UNDERLINE (paper scenario)** — a 2px `--foreground` ink hairline on a paper/flat surface. NO
  plate, NO blur, NO glass tier (the §2.C register, RE-CUT to never inherit the glass-bg-quiet plate that
  the reka family wrongly baked). It SLIDES (no squish — a hairline does not deform). This is "underline
  for paper scenarios."

**The ONE indicator engine must support:** (1) a gliding indicator on a calibrated spring clock (§3
direction), (2) a plate register (pill, glass) AND a hairline register (underline, paper) selected by
variant — NEVER both stacked (the §2 bug), (3) the squish on the PLATE only, (4) single-select panel-nav
(`role=tablist`) AND multi/single toggle (`role=group`) per the ARIA-role-per-variant contract
(README:29), (5) the vertical axis (the reka family lacked it; the unified engine must track a column —
the squish/anchor logic keys off a computed `dim` like the AZ dock morph does), (6) responsive collapse.

### 4.C Consumers that BREAK at each retirement (the binding ledger)

| retirement | breaks | mitigation |
|---|---|---|
| `ui/Tabs` from root barrel | `DockLayerGroup.vue:217` (re-home as dock-internal); the 4 demo recipes (constellation may change, R10 dir-2) | re-home the dock rail's reka `Tabs` as a dock-private composition OR migrate to the unified engine |
| `SegmentedTabs overflow` axis | none (0 consumers) — but the `.scroll-fade-mask` class on `tabs.vue` + W-FADING-SCROLL coordination | clean removal; coordinate with W-FADING-SCROLL (BA.md:140) |
| ANY `SegmentedTabs` API reshape (props/emits) | the **5 DEFERRED external consumers** — `fourier-analysis/web` 3× `UnderlineTabs`→`SegmentedTabs variant=underline` (`I.W-TABS-MIGRATE`), `words/frontend` 2× `BouncyToggle`→`SegmentedTabs` (`A.W-TABS-MIGRATE`) — all migrate TO `SegmentedTabs` as the receiver (AY W-CONSUMER-ledger.md:37-41) | the overhaul MUST preserve the `:options`/`:model-value`/`@update:model-value` + `variant` contract the migration mapping promises (coordination doc lines 24-32), OR the external receiver-waves re-target. Per "no legacy code": if the API reshapes, RE-ISSUE the migration mapping at the new SHA and re-flag the 5 DEFERRED rows |
| slides repo | **NONE** (zero tab consumers at `:5273`) | n/a |

**The gate to rebaseline:** `proof:tabs-unified` (`scripts/proof-tabs-unified.mjs`) machine-locks the
CURRENT shape — ONE `SegmentedTabs`, the three-value variant axis, `--spring-snappy` +
`--tab-indicator-max-stretch` reads, the ARIA-role-per-variant, no `Bouncy*` export. A taxonomy re-cut
(fold segmented↔pill, retire `ui/Tabs` surface, re-time the spring) is a gate-REBASELINE, not a quiet
edit — the clean-break "no legacy code" directive applies (the overhaul IS the new canon).

---

## 5. Severity roll-up

- **`[S2]` the oval blob** (§2.A) — a published-surface demo defect + a latent `ui/Tabs` default-collision
  trap any consumer hits who hand-rolls an underline without `:indicator="false"`.
- **`[S2]` the vertical gray panel** (§2.B) — the `ui/Tabs` indicator has no vertical axis; the baked
  plate paints a column slab. Gray-on-gray, converges with R10-5 "no gray".
- **`[S2]` the spring timing** (§3) — 300ms generic clock + mid-glide squish release + multi-property
  desync = the "not smooth/too slow" read. A re-time, not a rewrite.
- **`[S3]` the taxonomy bloat** (§1, §4) — two families + an unconsumed `overflow` axis + the
  ToggleGroup overlap. The "superfluous types" — a consolidation, consumer-evidenced.
