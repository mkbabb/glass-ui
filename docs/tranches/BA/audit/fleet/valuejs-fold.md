# valuejs-fold — the value.js N2 letter folded into BA, need-shaped

The value.js N2 letter (`coordination/VALUEJS-N2-ASKS-2026-06-12.md`) carries the REMAINDER
of the U1–U33 audit after ~16 findings collapsed to "consume the BA cut" (the letter's own
preamble + `value.js/.../lanes2/X-GU.md` matrix). value.js is the constellation's pure sink —
a live 3.13.0 registry consumer whose N.W9 close PINS the BA cut. This report folds each
register-A/B/C item NEED-shaped (the atlas precedent — `audit/fleet/atlas-ab-census.md`):
every diagnosis is REPRODUCED at HEAD (the cites re-grepped, the diagnosis inherited per BA
inv-3 — re-opened ≠ rebuilt-blind), and where BA solves a need structurally better the SHAPE
is BA's to choose, but the need does not drop. No source was edited; this is a docs-only fold
the BA lead reviews and owns.

---

## Verdict table (the per-item digest)

| # | NEED (one line) | mechanism @HEAD | BA coverage | fold target | new? |
|---|---|---|---|---|---|
| A-1 | nested-`DockLayerGroup` dock measures expand `to:0px` → dead-hold + snap | CONFIRMED | PARTIALLY-OWNED (the §F2 booking under-scopes it) | W-DOCK-MORPH-INSITU §0 RE-GROUND + §F2 re-scope | rider |
| A-2/WO-1 | Select content bound never emits (dead `@source`) → 16-item dropdown overflows viewport | CONFIRMED | UNOWNED (W-MENU-GLASS = item register only) | NEW wave **W-DROPDOWN-BOUND** (or W-MENU-GLASS scope-ext) + the Register-B emission gate | new |
| A-2/WO-2 | open-jerk: origin-anchored grow from trigger edge | CONFIRMED (downstream of WO-1) | UNOWNED | same wave as WO-1 (polish item) | new |
| A-2/WO-3 | one prop scales the whole picker font family | CONFIRMED | PARTIALLY-OWNED (`--dropdown-text` lever exists; no prop) | W-MENU-GLASS rider (the `size`→font-rung prop) | rider |
| A-3 | Slider `size` axis dead → 6px track in every consumer | CONFIRMED | UNOWNED (no wave touches the size axis) | NEW wave **W-CONTROL-GEOMETRY** (or fold into W-DROPDOWN-BOUND→**W-EMISSION**) | new |
| A-4 | aurora `breathing` register has all spatial drift = 0 → reads DEAD | CONFIRMED | UNOWNED (W-STAGE = where; W-DARK = read-through) | W-STAGE rider (the composables motion table — OUTSIDE the shader fence) | rider |
| A-5 | SegmentedTabs pill indicator mis-centered | CONFIRMED | OWNED (W-TABS rebuilds the engine) | W-TABS acceptance-row addition (no new scope) | rider |
| B | glass-ui's own arbitrary utilities die in every consumer (dead `@source`) | CONFIRMED | UNOWNED (W-HYGIENE = dist-hygiene home, but no `@source` clause) | **W-HYGIENE scope-ext** + the producer-side emission gate (the load-bearing half) | rider |
| C-1 | per-satellite derived-shade color for the goo blob | CONFIRMED (`uSatColor` = 0) | PARTIALLY-OWNED (W-GOO-REDRESS fence-locks `metaball.frag`) | W-GOO-REDRESS named-seam widen **OR** a 4.x point release | rider/4.x |
| C-2 | `<WatercolorDot variant="ghost">` dashed/outline register | CONFIRMED (no variant axis) | UNOWNED | NEW small wave **W-WATERCOLOR-GHOST** (or 4.x rider) | new |
| C-3 | published `<EasingPicker>`/`<EasingConfigurator>` primitive | CONFIRMED (3 hand-rolled forks) | UNOWNED (W-FOURIER-STUDIO's `StepsEditor` is demo-only) | NEW wave **W-EASING-PRIMITIVE** (cross-repo, co-sched with A-2's kf donor study) | new |
| D-1 | Skeleton glass over a frosted plate | CONFIRMED | OWNED (W-SURFACE-AXIS scope 6) | confirmation only — no new scope; named downstream consumer | none |
| D-2 | dropdown open-jerk spring half in the clock census | CONFIRMED | OWNED (W-GLASS-CAL.3) | confirm Select/DropdownMenu in the ~20-site census | none |
| E | value.js pins the BA cut; cut-notes owe it BY NAME | n/a | OWNED (W-CLOSE) | W-CLOSE adopt-book gains a value.js section beside slides + atlas | rider |

---

## Register A — shipped mechanisms broken (fix at the root)

### A-1 — the nested-`DockLayerGroup` dock measures expand `to:0px`

**NEED**: a `<DockLayerGroup>`-nested dock must expand `from:40 → to:≈261`, never `to:0`.

**Mechanism @HEAD (re-grepped, CONFIRMED)**: `dockMorphContext.ts:271-361` `onSwap` — the
pin (`:316-319`), the ONE-rAF measure-defer (`:344-360`) that forces `max-content` on the
morph axis for the single measurement (`:355-357`). `DockLayerGroup.vue:92-93` registers a
SECOND morph target via `morphHost.registerGroup({containerEl, activeLayer, axis})`. The §F2
booking is LITERALLY at `:328-343` and reads "first-mount intermittent / interaction-order-
dependent" — it tested a non-nested `#persistent` slider dock (`data-testid="dock-capture"`,
`:341-343`). The letter's reproduction (`U-DOCK.md §1`) shows the bug is DETERMINISTIC and
PERMANENT for any nested group: the outer `.dock-layers` measure shrink-wraps to ~0 because
the active pane's only content is the inner `.dock-layer-stack` — itself a pinned target
still at its collapsed span in the SAME rAF. Replicating the measure on a settled dock reads
261.1px → the bug is measurement ORDERING, not geometry.

**Coverage**: PARTIALLY-OWNED. W-DOCK-GEOMETRY owns the clip cluster (a different defect);
W-DOCK-MORPH-INSITU demonstrates the one-scalar morph on the SAME files. Neither names the
nested-group measure-ordering bug; the §F2 booking UNDER-scopes it as first-mount-intermittent.

**CONTRADICTION FLAG**: the letter EXPLICITLY forbids re-tuning the spring — `DOCK_SPRING
{response:0.32, dampingFraction:0.7}` (`constants.ts:32`) is FINE. This is NOT a clock/spring
defect; W-GLASS-CAL.3's clock census must NOT touch `DOCK_SPRING` chasing this. The fix is a
measure-ORDERING change in `onSwap`, not a timing value.

**Recommended fold** — W-DOCK-MORPH-INSITU (it already touches `dockMorphContext.ts`'s measure
window in-situ; the morph driver is its consumer #2). Amend:

- §0 RE-GROUND row (BA inv-3 idiom): "**BA-VJS-1** [valuejs-fold A-1] — the nested-group
  measure-ordering bug. `dockMorphContext.ts:344-360` measures the OUTER `to` with the inner
  `<DockLayerGroup>` morph target (`DockLayerGroup.vue:92-93`) still pinned at its collapsed
  span in the same rAF → the outer shrink-wraps to ~0. The §F2 booking (`:328-343`) is
  RE-SCOPED from first-mount-intermittent to deterministic-for-any-nested-group with the
  value.js four-cycle reproduction (`U-DOCK.md §5` recipe 2). The spring is FINE — do not
  re-tune (`constants.ts:32`)."
- §Defect-table row: `| 5 | BA-VJS-1 nested-measure-to-0 | dockMorphContext.ts:344-360 +
  DockLayerGroup.vue:92-93 | the outer measure reads the inner pinned-collapsed span → to:0
  every cycle (deterministic, not first-mount) |`
- §Scope item: "Fix the nested-group measure ordering — measure the outer `to` with the inner
  group ALSO forced to its target `max-content` (compose the inner target's contribution into
  the outer measure). The §F2 booking RESOLVES with this reproduction. The shape is yours;
  the spring constants are not in scope."
- §Gate-witness (`proof:dock-morph-insitu` or a §F2-resolution clause): "from a rested-collapsed
  nested dock, `expand()` arms `from:40 → to:≈261` (never 0), the spring animates the full span,
  ZERO dead-hold, ZERO un-animated snap; the value.js four-cycle probe reads a non-zero `to`
  every cycle." **Acceptance: from:40→to:≈261, four-cycle non-zero `to`.**

### A-2 — the Select/dropdown work-order (collision-bound + inner-scroll + font parity + open-jerk)

**NEED**: a 16-item dropdown bounds inside the viewport with inner scroll, the family scales
on one prop, and the open grows from the trigger edge.

**Mechanism @HEAD (CONFIRMED — and the root is LIVE at HEAD)**: `SelectContent.vue:47` carries
the authored bound `[max-height:var(--reka-popper-available-height,60dvh)]` + `overflow-y-auto`
— correct in source. But `src/styles/index.css:152` (`dist/styles/index.css:160`) declares
`@source "../components"`, which resolves to a directory that — at HEAD — contains **ZERO `.js`
and ZERO `.vue` files** (`find dist/components -name '*.js'` = 0; it is an empty subdir mirror).
The compiled SFC render-functions live at flat `dist/*.js`. So Tailwind never scans the
arbitrary-bracket class, never compiles it: `grep -c reka-popper-available-height dist/glass-ui.css`
= 0, `grep` across all `dist/styles/*.css` = 0. The bound is DEAD in every consumer; the live
proof is the 745px-tall 16-item dropdown overflowing a 900px viewport by 125px (`U-DROPDOWN.md`).
U23 (the open-jerk) is downstream — `zoom-in-95` scales the unbounded column, sweeping its
bottom ~37px. WO-3: the family already binds trigger + items to ONE rung `--dropdown-text`
(`offsets-sizing.css:186` "item rows, triggers"; `SelectTrigger.vue:35-37` size = height-only;
`menuItemVariants.ts:33`); value.js BROKE parity by hand-overriding only the trigger (1.59×
desync). The documented lever (`offsets-sizing.css:182`) should become a first-class prop.

**Coverage**: UNOWNED for WO-1/WO-2. W-MENU-GLASS owns the ITEM register only (the `.glass-menu-row`
hover-lift plate on `menuItemVariants`) — it does not name the content bound, the collision
contract, or the font-rung prop (re-grep of W-MENU-GLASS scope confirms: zero on
collision/bound/scroll-within). WO-3 is PARTIALLY-OWNED (the `--dropdown-text` lever exists; no
prop). The X-GU grep across all 30 BA waves returns ZERO for collision/bound-on-page/scroll-within.

**Recommended fold** — WO-1/WO-2 are a **NET-NEW roster wave W-DROPDOWN-BOUND** (Batch 4,
‖ W-MENU-GLASS, disjoint bounds: it writes the precompiled-bound CSS + the `@source` fix, never
the CVA); the emission gate (Register B) is the load-bearing half so the two waves SHOULD share
a roster item — recommend **W-EMISSION** owning both A-2/WO-1 AND A-3 AND Register B (one
structural sweep). WO-3 is a small W-MENU-GLASS rider. Amend W-EMISSION/W-DROPDOWN-BOUND:

- §Defect-table: `| BA-VJS-2 select-bound-dead | SelectContent.vue:47 + index.css:152
  @source "../components" (empty dist dir) | the authored max-height never compiles → 745px
  dropdown overflows 900px viewport by 125px |`
- §Scope: "Pre-compile the collision bound into glass-ui's SHIPPED CSS (a static rule or a
  named `@utility dropdown-bound`) so structural bounds NEVER depend on the consumer scanning
  glass-ui source. Adopt the kf donor cap: `min(24rem, 60dvh)` (kf `design-idioms.css:113`
  `--easing-dropdown-max-h`; `EasingSelect.vue:29`) with reka's `--reka-popper-available-height`
  tightening it on a short viewport + `overflow-y-auto` → inner scroll. WO-2: honor
  `--reka-popper-transform-origin` so the panel grows from the trigger edge (or document
  `align='start'` for audacious left-aligned triggers)."
- §Gate-witness: "on a 900px viewport the 16-item color-space dropdown computes a REAL
  `maxHeight` (not `none`), bottoms INSIDE the viewport, scrolls within; a backing CSS rule
  exists in the LOADED stylesheet (a consumer-simulating probe finds it)." **Acceptance: real
  computed maxHeight, bottoms in-viewport, scrolls within, backing rule present.**

WO-3 → W-MENU-GLASS rider: "extend `SelectTrigger`'s `size` prop (today height-only,
`SelectTrigger.vue:35-37`) into a font-rung register (`display`/`audacious`) that writes
`--dropdown-text` on the shared Select scope — trigger, items, labels re-resolve together."

### A-3 — the Slider size axis is structurally dead

**NEED**: `<Slider size="md">` must render a real ≈20px track in every consumer.

**Mechanism @HEAD (CONFIRMED)**: `slider/index.ts:60-62` ships `md:'[--slider-track-height:1.25rem]
[--slider-thumb-size:1rem]'` as a CVA arbitrary-property utility, compiled only into a `dist/*.js`
chunk no `@source` scans (`grep -c slider-track-height:1.25rem dist/glass-ui.css` = 0). The
`size` prop is INERT; a `variant=standard size=md` Slider renders its track at the 6px fallback.
The spectrum thumb rides the SAME dead axis: `Slider.vue:341` width = `calc(var(--slider-thumb-size,
1rem) * 0.75)` — only COINCIDENTALLY correct today via the `1rem` default; under the fix it must
stay the slim 12px bar (the value.js color-picker reference, the file's own B14 comment).

**Coverage**: UNOWNED. W-DARK-MATERIAL re-anchors the dark `--primary` the range-fill reads
(`Slider.vue:200`); W-GLASS-CAL fences the thumb halo OUT of the blur dial-back. No wave touches
the dead size axis. Same root mechanism as A-2/WO-1 and Register B (the dead `@source`).

**Recommended fold** — **W-EMISSION** (shared with A-2/WO-1 + Register B — it is the same
mechanism). Amend:

- §Scope: "Bind the Slider size axis as real shipped CSS — either `[data-size]` scoped-CSS
  selectors in `Slider.vue` (the SFC already keys recipes off `[data-variant]`/`[data-size]`,
  the pattern is proven in-file), or emit the size rules into the precompiled stylesheet.
  Re-verify the spectrum thumb stays the slim 12px bar under the fix (`Slider.vue:341` rides
  the same axis)."
- §Gate-witness: "a `size=md` standard Slider computes a track-height ≈20px (not 6px) with a
  backing rule in the loaded stylesheet; the spectrum thumb stays ≤0.5× track." **Acceptance:
  md track ≈1.25rem painted, spectrum thumb slim.**

(The LOW optional per-channel-gradient `track-content` slot is value.js-composable demo-side
via `--slider-track-bg`; file only on a 2nd consumer — do NOT fold pre-emptively.)

### A-4 — the aurora `breathing` motion register is dead

**NEED**: `breathing` must read as small-but-perceptible atmospheric life, not a 2.5% pulse.

**Mechanism @HEAD (CONFIRMED)**: `atoms.ts:166` `breathing:{nucleiDrift:0, paletteDrift:0,
warpDrift:0, breathDepth:0.05}` — all three spatial/chromatic terms are zero; the frag's
`col *= 1 + 0.05·breath·0.5` (`aurora.frag.ts`) is a ±2.5% global luminance pulse only
(`gl.readPixels` ±1–2/255, sub-perceptible). The LEDGER's software-GL-fallback suspicion is
REFUTED live (`resolveRenderMode("auto")="webgl"`, ~44fps advancing `uTime`) — do NOT spend a
wave on the probe.

**Coverage**: UNOWNED. W-STAGE fixes WHERE the aurora paints; W-DARK-MATERIAL makes it READ
through dark glass. Neither touches the motion-fields table. The table is the composables motion
register, OUTSIDE the GL-shader fence-lock — a safe small rider.

**Recommended fold** — W-STAGE rider (it touches the aurora backdrop map; the register table is
the natural neighbor). Amend:

- §Scope: "Make `breathing` honest in `atoms.ts:166` — give it small non-zero `nucleiDrift`
  and/or `paletteDrift` (the `K_*` lifts already scale these into the slowly-alive 5–15s window)
  and/or raise the breath amplitude. This is the motion TABLE, not the fragment shader — the
  GL fence holds (`aurora.frag` untouched)."
- §Gate-witness: "a calm-seed aurora on `breathing` shows perceptible spatial drift over a 2.5s
  `readPixels` window (>±2/255 luminance OR a non-zero positional delta)." **Acceptance:
  perceptible drift on a calm seed.** (value.js takes its own interim demo-side
  `breathing`→`drifting` default regardless.)

### A-5 — the SegmentedTabs pill indicator is mis-centered

**NEED**: the active-pill indicator's geometric center == the active-label's geometric center.

**Mechanism @HEAD (CONFIRMED)**: `useTabIndicator.ts:102/120` positions the indicator via
`translateX(${btn.offsetLeft}px)` with no center-correction; `TabsIndicator.vue` is the slab.
The value.js consumer side is correct (`flex items-center justify-center`); the offset is inside
the indicator engine.

**Coverage**: OWNED. W-TABS rebuilds the indicator engine wholesale (`proof:tabs-std`). The
risk is the rebuild re-ships the offset.

**Recommended fold** — W-TABS acceptance-row addition (NO new scope — the letter is explicit):

- §Gate-witness (append to `proof:tabs-std` / the π readback): "the indicator's geometric center
  equals the active-label's geometric center on BOTH axes, BOTH materials (pill + underline)."
  **Acceptance: indicator center == label center, both axes, both materials.**

---

## Register B — the systemic emission class (the P9 class)

**NEED**: a glass-ui-internal arbitrary utility must NEVER silently die in a consumer; the dead
`@source` class CLOSES at the root, not per-instance.

**Mechanism @HEAD (CONFIRMED)**: `index.css:152` `@source "../components"` → `dist/components/`,
which at HEAD is an empty subdir mirror (0 `.js`, 0 `.vue`). A-2/WO-1 (Select bound) and A-3
(Slider size) are two STRUCTURAL-severity live instances of this ONE mechanism on a live registry
consumer. This is the constellation grand-audit's P9 ("rounded-panel utility silently no-ops").

**Coverage**: UNOWNED. W-HYGIENE is the dist-hygiene home (the letter names it) but its scope (10
items: MIGRATION re-anchor, DELTAs retire, CLAUDE structure-sync, colocation, precepts submodule,
orphan pngs, AX residue, branch-close) carries NO `@source`/phantom/arbitrary-utility clause
(re-grep confirms zero).

**Recommended fold** — **W-HYGIENE scope-extension** (the natural dist-hygiene home) OR the
NET-NEW **W-EMISSION** roster wave (recommended — the emission gate is the load-bearing half and
co-owns A-2/WO-1 + A-3). The ONE structural sweep:

- §Scope: "(1) fix the `@source` to the real distribution surface (the flat `dist/*.js` bundles,
  or restore a built `dist/components/` source tree) so the class CLOSES, not just the two
  instances; (2) census every `[--token:value]` / fully-arbitrary bracket utility in shipped CVAs
  and SFCs — any STRUCTURAL one (geometry, bounds, sizing) moves to precompiled CSS or `[data-*]`
  scoped selectors (consumer JIT reach must never be load-bearing); (3) an EMISSION GATE."
- §Gate-witness (the load-bearing half): "a consumer-simulating probe asserts each shipped
  STRUCTURAL arbitrary utility has a backing rule in the BUILT stylesheet (the producer-side
  mirror of value.js's inv-N-7 zero-phantom-classes)." **Acceptance: every structural utility has
  a backing rule in the built CSS; the dead `@source` is gone.**

---

## Register C — new capabilities (no BA wave owns these)

### C-1 — `uSatColor[]`: per-satellite derived-shade color for the goo blob

**NEED**: satellites render as slightly-different in-family shades (like `deriveAurora`), not the
body color.

**Mechanism @HEAD (CONFIRMED)**: the satellite uniform block carries only `uSatPos/uSatRadius/
uSatOpacity` (`metaball-uniforms.glsl.ts:84-86`); `grep uSatColor` = 0. `constants.ts:13`
`MAX_SATS=4`; `UNIFORM_NAMES` (`:151`) lists `uSatShift`/`uSatCount` but no `uSatColor`. The
`deriveBlobPalette` docstring already promises "satellites take the lighter in-family stops"
(`color/index.ts:267`, `:290`) — the renderer never honors it per-source. value.js chartered
this at `N.md §8` (V4).

**Coverage**: PARTIALLY-OWNED. W-GOO-REDRESS opens exactly the named smin/orbit-envelope seam
(`uploadBlobUniforms.ts:214` + the bridge) and OTHERWISE fence-locks `metaball.frag`. C-1 needs
the frag's per-source COLOR seam.

**Recommended fold** — either widen W-GOO-REDRESS's named seam to include the satellite color
routing (same files, same uniforms module, natural rider) **OR** ship as a 4.x point release. It
is the ONE blob ask BA leaves open; value.js cannot derive satellite colors until it lands. The
ready spec (from the value.js fleet): (1) `uSatColor[MAX_SATS]` vec3 → `metaball-uniforms.glsl.ts`
+ `UNIFORM_NAMES` + the location cache; (2) in `metaball.frag.ts` the satellite samples its OWN
color with a per-source weighted blend so the smin neck CROSS-FADES sat→body (no hard seam at the
fillet); (3) `uploadBlobUniforms.ts` assigns satellite `i ← paletteStops[(i % (stopCount-1))+1]`
(`frame.paletteStops` already plumbed, `:48/:100`); (4) optional `satelliteShadeSpread` knob.

- §Gate-witness (if folded into W-GOO-REDRESS): "the satellite contribution samples a DISTINCT
  in-family shade; the smin neck cross-fades sat-color → body-color with no hard seam at the
  fillet." **Acceptance: distinct satellite shade, no fillet seam.**
- Companion (small, same surface): a `bodyLightness`/`lightnessFloor` option on
  `deriveBlobPalette` (`color/index.ts:291` centers the ramp on the seed L) so a near-white seed
  still yields a perceptible body — the U3 "colors FAR TOO WHITE" base case is a value.js-side
  near-white SEED (root-caused; the deriver gives no floor to stand on).

### C-2 — `<WatercolorDot variant="ghost">`: the dashed/outline register

**NEED**: a proper watercolor GHOST (the irregular-blob silhouette as a stroke/low-alpha fill) for
the empty-palette-slot / add affordance — NOT a CSS dashed rectangle.

**Mechanism @HEAD (CONFIRMED)**: `WatercolorDot.vue:18-33` ships `color/animate/cycleDuration/
range/seed` — no `variant`/`ghost`/`outline` axis. The value.js empty-slot affordance is the
dashed rectangle the user rejects (LEDGER §F, U18/U22).

**Coverage**: ABSENT — the 30-wave grep returns watercolor only in a passing W-PROGRESS-GRADIENT
mention.

**Recommended fold** — NET-NEW small wave **W-WATERCOLOR-GHOST** (or a 4.x rider). §Scope: "a
`ghost` (`outline`/`dashed`) `variant` rendering the SAME `useWatercolorBlob` PRNG geometry as a
stroke / low-alpha fill — the irregular-blob silhouette as an outline; same seed discipline as the
solid dot so a ghost that fills keeps its silhouette." **Acceptance: a seeded ghost renders the
blob silhouette as a stroke; a fill of the same seed matches the silhouette.**

### C-3 — the published `<EasingPicker>`/`<EasingConfigurator>` primitive

**NEED**: ONE first-class published easing selector + configurator, abstracted from keyframes.js
into glass-ui, styled like kf, supporting the panoply of easing fns.

**Mechanism @HEAD (CONFIRMED)**: three repos hand-roll three easing editors on the same value.js
math, NONE published (`X-KF.md §§0-1,6`). kf's trio is the richest donor (`EasingEditor.vue` 95
LoC + `EasingCurveCanvas.vue` 385 LoC editable SVG bezier + `EasingSelect.vue` 137 LoC grouped
dropdown — the U8 bounded-scroll reference). glass-ui's own `BezierEditor.vue` (curve-gallery
story) is the Tailwind-first twin, demo-only. value.js's `gradient/EasingSelector.vue` is the
weakest (U25).

**Coverage**: UNOWNED. W-FOURIER-STUDIO unit C CREATES `curve-gallery/StepsEditor.vue` — but
DEMO-ONLY (a story sub-editor, not a published primitive); W-DEMO-AFFORDANCES' curve-picker chip
rack is explicitly DEMO-LOCAL by BA's own fence. Neither is the published primitive.

**Recommended fold** — NET-NEW wave **W-EASING-PRIMITIVE** (cross-repo, co-scheduled with A-2's kf
donor study). §Scope: "publish ONE first-class primitive (picker + configurator) reconciling the
kf trio with the in-house `BezierEditor` twin, consuming value.js `bezierPresets`/`CSSCubicBezier`/
`timingFunctions`/`timingFunctionDescriptions` (barrel-exported, value.js `src/index.ts:226-238`),
using glass-ui's OWN drag idiom (not kf's `useDragCapture`). **Coordinate with W-FOURIER-STUDIO so
the `steppedEase` steps sub-editor lands IN the published primitive, not a fourth demo-only fork.**"
The boundary law (kf L-SEED): curve MATH = value.js; playback/spring = kf; the editor COMPONENT =
glass-ui. Three consumers re-point on their own schedules (kf easing rail, glass-ui curve-gallery,
value.js gradient pane). **Acceptance: a published `/easing` subpath primitive ≥2 consumers, the
steps sub-editor IN it, no fourth fork.**

---

## Register D — confirmations (extend, don't re-state)

- **D-1 Skeleton glass (U20a)** — OWNED by W-SURFACE-AXIS scope 6 (`<Skeleton surface="glass">`,
  the `--skeleton-glass-bg` translucent shimmer over the frosted plate). EXACT fix; no new scope.
  Named downstream consumer for the W-CLOSE adopt-book: value.js re-authors its bespoke
  `PaletteCardSkeleton.vue` (`bg-foreground/[0.04]` over `bg-card` — the "too black" composite)
  onto the register at the pin.
- **D-2 dropdown open-jerk spring half (U23)** — OWNED by W-GLASS-CAL.3. After A-2/WO-1 bounds the
  box, confirm the Select/DropdownMenu open transition appears in the ~20-site spring-clock census;
  if it rides a hardcoded duration it is not swept → explicit inclusion.
- **Consume-only bulk** (no ask): U1 → W-DARK-MATERIAL + W-NO-GRAY; U6/U12 spring feel →
  W-GLASS-CAL.3; U16 clip half → W-DOCK-GEOMETRY; U7 glass item register → W-MENU-GLASS; U13 veil
  → W-SURFACE-AXIS.

---

## Register E — the cut + the adopt-book (value.js pins the BA cut)

value.js N chartered its close pin at 3.13.0 (`inv-N-6`); BA's **4.0.0** is where the U-fixes
land — value.js re-targets N.W9's pin to the BA cut and HOLDS until it ships (the acyclic spine
holds; value.js never blocks BA; the wait gates only the final pin). **W-CLOSE's adopt-book gains
a value.js section BESIDE slides + atlas** (`docs/tranches/BA/audit/slides-adopt-deploy-book.md`
or the FINAL §handoff). The 4.0.0 cut-notes owe value.js BY NAME (the atlas register-D discipline
— by name, never silently):

- the tabs break (`SegmentedTabs` `segmented`→`pill`, `ui/Tabs` leaving the public surface —
  value.js consumes `@mkbabb/glass-ui/tabs` in `PaneSegmentedControl.vue`);
- the Dialog `variant`→`surface` move (W-SURFACE-AXIS scope 3);
- the menu-row glass default flip (A-2's family / W-MENU-GLASS);
- any Select/Slider surface renames out of registers A/B (the emission fixes);
- the named downstream consumer for D-1 (the `PaletteCardSkeleton.vue` re-author);
- the cut-note must record: value.js holds 3.13.0 → re-pins EXACT to the 4.0.0 cut; its U-fixes
  land producer-side; its interim demo-side arms (`breathing`→`drifting`, bespoke skeleton,
  trigger-only font override) RETIRE at the bump (the AZ W-ADOPT precedent).

**Recommended fold** — W-CLOSE §11 (the adopt-book) + §12 (the atlas close set) gain a parallel
value.js subsection; the cut-notes BY-NAME table (W-CLOSE scope 4 + §94) appends the value.js rows.

---

## Routing summary (smallest-first)

- **Riders on existing waves** (defect-table + acceptance-row, the BA inv-3 RE-GROUND idiom):
  A-1 → W-DOCK-MORPH-INSITU (§F2 re-scope); A-4 → W-STAGE; A-5 → W-TABS (acceptance row);
  A-2/WO-3 → W-MENU-GLASS; D-1/D-2 → confirmations; E → W-CLOSE adopt-book.
- **One robustness wave** (recommended **W-EMISSION**, Batch 4 ‖ W-MENU-GLASS, disjoint bounds —
  the emission gate is the load-bearing half): A-2/WO-1 + A-2/WO-2 + A-3 + Register B. (Alternative:
  Register B as a W-HYGIENE scope-ext + A-2/WO-1 as a W-MENU-GLASS scope-ext.)
- **C-1** rides W-GOO-REDRESS's named seam (widen to the per-source color) OR a 4.x.
- **C-2** is a small net-new register (**W-WATERCOLOR-GHOST**) or a 4.x rider.
- **C-3** is the one genuinely new primitive (**W-EASING-PRIMITIVE**, cross-repo, co-scheduled
  with A-2's kf donor study, coordinated with W-FOURIER-STUDIO's `StepsEditor`).

No source edited; tranche-development only. The BA lead reviews, amends, and owns the fold.
