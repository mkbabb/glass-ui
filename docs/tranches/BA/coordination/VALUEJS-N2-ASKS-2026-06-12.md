# The value.js letter (2026-06-12, BINDING cross-repo input — the N2 user-audit asks)

Relayed from the value.js N-tranche second deep-audit fleet (canonical evidence:
`value.js/docs/tranches/N/audit/user-audit-2026-06-12/LEDGER.md` — the user's first-person
33-finding audit, U1–U33, 28 screenshots — plus the per-item lanes2 grounding reports cited
below, all live-probed against value.js HEAD `199fd15` with glass-ui resolved at 3.13.0).
value.js is the constellation's pure sink — it publishes grammar, consumes glass-ui
PUBLISHED, never the reverse — and a live registry consumer whose N.W9 close pins the BA cut.

**The lineage truth this letter rides**: the SAME user drove BA's R8/R9/R10 audits and the
value.js U-ledger, the same hour, against the same glass system. The two audits are two views
of ONE defect surface, and BA already authors the producer-side fix for the bulk of it — the
value.js overlap matrix (`value.js/docs/tranches/N/audit/lanes2/X-GU.md`) found ~16 of the 33
U-findings collapse to "consume the BA cut." This letter carries ONLY the remainder: the
register-A mechanisms BA's fleet did not witness (the value.js demo exercises surfaces the
glass-ui storybook does not — a viewport-overflowing 16-item dropdown, a `DockLayerGroup`-
nested dock, a real-GPU aurora at rest, a derived-satellite blob, a dashed palette slot), the
register-B systemic class, and the register-C new capabilities. Per the atlas precedent:
**need-shaped, not name-shaped** — where BA solves a need structurally better, the shape is
BA's to choose; the need may not drop. Every diagnosis below is REPRODUCED (live trace, not
hypothesis); per BA inv-3 a folding lane re-greps anchors at HEAD but inherits the diagnosis.

---

## Register A — shipped mechanisms broken, reproduced live (fix at the root; fold into the owning wave)

### A-1 — the dock morph FLIP measures its expand target as `to:0px` — deterministic, not first-mount-intermittent (U6 + U16) · P0

- **Finding**: dock expand/collapse "takes FAR too long to squish/morph; slow, laggy,
  jittery" (U6); "not sized properly between transitions" (U16).
- **Evidence**: `value.js/docs/tranches/N/audit/lanes2/U-DOCK.md §1` — the full live trace.
  From a verified rested-collapsed state, `expand()` arms the FLIP span **`from:40px →
  to:0px`**: the box springs the WRONG direction (55→19px over ~200ms), dead-holds at 19px
  for ~455ms, then **snaps 19→280px in one un-animated frame**. Four-cycle probe: `to:0px`
  every cycle. No long tasks, no layout thrash — the dock burns user time, not CPU time.
- **Root**: the demo nests `<DockLayerGroup>` inside `<GlassDock>`; the group registers as a
  SECOND morph target (`DockLayerGroup.vue:86,92-99` → `morphHost.registerGroup`). During the
  outer FLIP's measure window (`dockMorphContext.ts:271-361` `onSwap`), the orchestrator
  forces `inline-size:max-content` on the OUTER `.dock-layers`, but the active full pane's
  only content is the nested `.dock-layer-stack` — itself a pinned morph target still at its
  collapsed span in the same rAF — so the outer measure shrink-wraps to ~0. Replicating the
  measure on a settled-expanded dock reads the correct 261.1px, proving the bug is
  **measurement ORDERING, not geometry**. The spring constants are FINE
  (`DOCK_SPRING {response:0.32, dampingFraction:0.7}`, `constants.ts:32`) — do not re-tune.
- **BA coverage**: W-DOCK-GEOMETRY owns the clip cluster (a different defect);
  W-DOCK-MORPH-INSITU demonstrates the one-scalar morph (same files). **Neither names the
  nested-group measure-ordering bug.** The `AY.W-GOD1 §F2` booking
  (`dockMorphContext.ts:328-343`) calls this "first-mount intermittent" — it is
  **deterministic and permanent for any `DockLayerGroup`-nested dock** (the booking tested a
  non-nested slider dock).
- **The ask**: fold the nested-measure fix into W-DOCK-GEOMETRY or W-DOCK-MORPH-INSITU's §0
  RE-GROUND + defect table, and RE-SCOPE the §F2 booking with this reproduction. The fix
  shape (yours to choose): measure the outer `to` with the inner group ALSO forced to its
  target `max-content`, or compose the inner group's target contribution into the outer
  measure. **Acceptance**: from a rested-collapsed nested dock, `expand()` arms
  `from:40 → to:≈261` (never 0), the spring animates the full span, zero dead-hold, zero
  snap; the value.js four-cycle probe (`U-DOCK.md §5`, recipe 2) reads a non-zero `to` every
  cycle.

### A-2 — the Select/dropdown work-order: collision-bound + inner-scroll + font parity + the open-jerk (U8 + U23 + U7 + U30a) · P0

One defect family, two roots, three work-orders. Full grounding:
`value.js/docs/tranches/N/audit/lanes2/U-DROPDOWN.md`. The user's directive (LEDGER U8) is
explicit: "FIRST-CLASS in glass-ui; study how the keyframes.js easing-curve picker dropdown
does it and bring that mechanism."

**WO-1 (U8 root → U23 downstream): the collision bound is authored but never emits.**
`SelectContent.vue:47` carries `[max-height:var(--reka-popper-available-height,60dvh)]
overflow-y-auto` — correct. But `glass-ui/dist/styles/index.css:160` declares
`@source "../components"`, which resolves to **`dist/components/` — a directory that does
not exist** (the compiled components are flat `dist/*.js`). The arbitrary-bracket class is
never extracted → never compiled → dead in EVERY consumer. Live proof on value.js: reka
computes `--reka-popper-available-height: 608.6px` correctly, yet
`getComputedStyle(content).maxHeight === "none"`; the 16-item color-space dropdown renders
745px tall and overflows a 900px viewport by 125px; no backing rule exists in any loaded
stylesheet. **U23 (the open jerk) is downstream**: `zoom-in-95` (origin `50% 0`) scales the
unbounded 745px column, sweeping its bottom edge ~37px over 0.15s — bound the box and the
sweep dies.
- **The ask**: structural bounds must NEVER depend on the consumer scanning glass-ui source.
  Pre-compile the bound into glass-ui's shipped CSS (a static rule or a named `@utility`
  e.g. `dropdown-bound`), AND fix the broken `@source` to the real distribution surface (see
  Register B — this is one instance of a class). Adopt the kf donor's cap as the default:
  `keyframes.js/demo/@/components/custom/EasingSelect.vue:29`
  (`max-h-[var(--easing-dropdown-max-h)]`) + `design-idioms.css:113`
  (`--easing-dropdown-max-h: min(24rem, 60dvh)`) — a sane viewport-relative ceiling, with
  reka's `--reka-popper-available-height` tightening it when the viewport is short, and
  `overflow-y-auto` turning the surplus into inner scroll. **Acceptance**: on a 900px-tall
  viewport the color-space dropdown computes a real `maxHeight`, bottoms inside the
  viewport, scrolls within; a backing CSS rule exists in the loaded stylesheet.

**WO-2 (U23 polish, after WO-1): origin-anchored open.** Keep the 0.15s `enter`; ensure the
scale origin tracks the anchor edge for non-center-aligned triggers (honor
`--reka-popper-transform-origin` faithfully, or document `align="start"` for audacious
left-aligned triggers). The panel grows from the trigger edge, no lateral settle.

**WO-3 (U7 root): one prop scales the whole picker family.** glass-ui already binds trigger
+ items to ONE rung — `--dropdown-text` (`offsets-sizing.css:185-186`: "item rows,
triggers"; `SelectTrigger.vue:47`; `menuItemVariants.ts:37`). The value.js demo BROKE the
parity by hand-overriding only the trigger (`ColorSpaceSelector.vue:17`,
`sm:text-display` → 32.9px trigger over 20.7px items, a 1.59× desync). The documented lever
(`offsets-sizing.css:182` — override `--dropdown-text`, the whole family re-resolves) should
be a first-class prop: extend `SelectTrigger`'s `size` prop (today height-only,
`SelectTrigger.vue:35-37`) into a font-rung register (`display`/`audacious`) that writes
`--dropdown-text` on the shared Select scope — trigger, items, labels re-resolve together.
This also serves U30a (the audacious color-space dropdown) at the consume edge.
- **BA coverage**: W-MENU-GLASS owns the ITEM register (the glass-quiet hover-lift plate on
  `menuItemVariants`) — it does not name the content bound, the collision contract, or the
  font-rung prop. The X-GU grep across all 30 BA waves returns ZERO for
  collision/bound-on-page/scroll-within. **WO-1/WO-2 are a net-new roster item (or a
  W-MENU-GLASS scope extension); WO-3 is a small W-MENU-GLASS-adjacent rider.** The
  open-jerk's spring half: confirm the Select/DropdownMenu open transition is in
  W-GLASS-CAL.3's ~20-site spring-clock census — if it rides a hardcoded duration it is not
  swept.

### A-3 — the Slider size axis is structurally dead in every consumer (U28, blocks U32 "sliders bigger") · P0/P1

- **Finding**: "slider too thin" (U28); the spectrum-glass channel slider (U20b).
- **Evidence**: `value.js/docs/tranches/N/audit/lanes2/U-CONTROLS.md §U28` — live: a
  `variant=standard size=md` glass-ui Slider renders its track at **6px** (the 0.375rem
  fallback); `--slider-track-height` on the root is EMPTY. The `md` size is supposed to set
  `[--slider-track-height:1.25rem]` via `sliderVariants`
  (`src/components/ui/slider/index.ts:60-62`) — a CVA arbitrary-property utility that ships
  only inside `dist/slider-B-JP2JlI.js`, which no `@source` scans and the precompiled
  `glass-ui.css` never emits (`grep -c` = 0). **The `size` prop is inert in every consumer.**
- **The ask**: geometry must ship as real CSS. Either bind the size axis via `[data-size]`
  scoped-CSS selectors in `Slider.vue` (the SFC already keys recipes off
  `[data-variant]`/`[data-size]`, `Slider.vue:150-154` — the pattern is proven in-file), or
  emit the size rules into the precompiled stylesheet. Then **re-verify the spectrum thumb**:
  `Slider.vue:333-344` sizes it at `calc(var(--slider-thumb-size,1rem) * 0.75)` — it rides
  the SAME dead axis and is only coincidentally correct today; under the fix it must stay
  the slim 12px bar.
- **BA coverage**: W-DARK-MATERIAL re-anchors the dark `--primary` the range-fill reads
  (`Slider.vue:200`); W-GLASS-CAL fences the thumb halo OUT of the blur dial-back. **No wave
  touches the dead size axis.** The slider primitive itself (incl. the `spectrum` variant —
  "the value.js color-picker reference EXACTLY", `Slider.vue:315-381`) already exists and is
  first-class; value.js's U15/U20 consumption (migrating its raw-reka `ComponentSliders`
  onto `variant="spectrum"` with a real `--slider-track-bg` gradient) is value.js-side work
  gated only on this fix. Optional, LOW: a per-channel-gradient convenience (or
  `track-content` slot) for the spectrum face — value.js can compose this demo-side via
  `--slider-track-bg`; file only if a second consumer materializes.

### A-4 — the aurora `breathing` motion register is dead: all spatial drift zeroed (U33) · P1, cohort-grade

- **Finding**: "background aurora completely broken: does not move, no shade variation."
- **Evidence**: `value.js/docs/tranches/N/audit/lanes2/U-AURORA.md` — **the LEDGER's prime
  suspect (the software-GL probe mis-firing → static CSS fallback) is REFUTED live**:
  `resolveRenderMode("auto") = "webgl"` on a real GPU (Apple M5 Max ANGLE Metal), the
  canvas holds a live webgl2 context at ~44fps with an advancing `uTime`. The probe is
  innocent; do NOT spend a wave on it.
- **Root**: `MOTION_FIELDS.breathing = { nucleiDrift: 0, paletteDrift: 0, warpDrift: 0,
  breathDepth: 0.05 }` (`src/components/custom/aurora/composables/atoms.ts:164-168`). All
  three spatial/chromatic motion terms in the frag (`aurora.frag.ts:148-157`) multiply by
  zero; the sole surviving term is `col *= 1 + 0.05·breath·0.5` (`:367-368`) — a **±2.5%
  global luminance pulse**. `gl.readPixels` over 2.5s: ±1–2/255 — sub-perceptible. A
  "breathing" atmosphere that only pulses brightness 2.5% reads as DEAD on any calm seed,
  for every consumer.
- **The ask**: make `breathing` honest — give it small-but-perceptible spatial life
  (non-zero `nucleiDrift` and/or `paletteDrift`; the `K_*` lifts already scale these into
  the "slowly alive 5–15s window") and/or raise the breath amplitude. This is the
  composables motion table, NOT the fragment shader — it sits OUTSIDE BA's
  GL-shader fence-lock, so it folds as a small rider wherever BA prefers (W-STAGE touches
  the aurora backdrop map; the register table is the natural neighbor).
- **BA coverage**: W-STAGE fixes WHERE the aurora paints; W-DARK-MATERIAL makes it READ
  through dark glass. Neither touches the motion-fields table. (value.js takes its own
  interim demo-side fix — default atom `breathing`→`drifting` — regardless; the ask makes
  the register honest for all consumers.)

### A-5 — the SegmentedTabs pill indicator is mis-centered (U21) · P2, fold as a W-TABS acceptance row

- **Evidence**: `value.js/docs/tranches/N/audit/lanes2/U-CONTROLS.md §U21` — the value.js
  consumer side is correct (`flex items-center justify-center`); the mis-centering is inside
  `SegmentedTabs.vue`/`TabsIndicator.vue`/`useTabIndicator.ts` (the active-pill
  indicator/label alignment).
- **BA coverage**: W-TABS rebuilds the indicator engine wholesale. **Do not author new
  scope** — add a centering acceptance row to W-TABS's gate (indicator geometric center ==
  active-label geometric center, both axes, both materials) so the rebuild cannot re-ship
  the offset.

---

## Register B — the systemic class: glass-ui's self-emission of arbitrary utilities is broken in every consumer (the P9 class) · HIGH

A-2/WO-1 (the Select bound) and A-3 (the Slider size axis) are two live instances of ONE
mechanism: **glass-ui authors Tailwind arbitrary-property/bracket utilities in source it
ships only as compiled JS, and its own `@source "../components"`
(`dist/styles/index.css:160`) points at a directory that does not exist in the dist — so
every glass-ui-internal arbitrary utility silently dies in every consumer.** This is the
constellation grand-audit's P9 ("rounded-panel utility silently no-ops in consumers —
Tailwind-v4 dep-utility-scan gap"), now with two structural-severity instances reproduced on
a live registry consumer.

- **The ask**: ONE structural sweep, owned wherever BA prefers (W-HYGIENE is the natural
  dist-hygiene home; or a net-new roster item):
  1. fix the `@source` to the real distribution surface (the flat `dist/*.js` bundles, or
     restore a `dist/components/` tree) so the class CLOSES, not just these two instances;
  2. census every `[--token:value]` / fully-arbitrary bracket utility in shipped CVAs and
     SFCs; any STRUCTURAL one (geometry, bounds, sizing) moves to precompiled CSS or
     `[data-*]` scoped selectors — consumer JIT reach must never be load-bearing;
  3. an emission gate: a consumer-simulating probe asserting each shipped structural utility
     has a backing rule in the built stylesheet (value.js's inv-N-7 "zero phantom classes"
     is the consumer-side mirror; the producer-side gate kills the class at the root).

---

## Register C — new capability, design-grade specs ready (no BA wave owns these)

### C-1 — `uSatColor[]`: per-satellite derived-shade color for the goo blob (U3) · HIGH, N-chartered

- **Finding**: "NO satellite blobs that orbit and meatball out; satellites = slightly-
  different shades of the current color, like deriveAurora" (U3).
- **Evidence**: `value.js/docs/tranches/N/audit/lanes2/U-BLOB.md §U3.c` — satellites ARE
  armed (default count 3) and ticking; they are imperceptible because they render from the
  SAME palette field as the body. The satellite uniform block carries only
  `uSatPos/uSatRadius/uSatOpacity` (`metaball-uniforms.glsl.ts:83-86`); `grep uSatColor` =
  zero. The `deriveBlobPalette` docstring already promises "satellites take the lighter
  in-family stops" (`src/composables/color/index.ts:266-267`) — the renderer never honors it
  per-source. value.js chartered this ask at `N.md §8` (V4).
- **The spec** (ready, from the value.js fleet):
  1. `uSatColor[MAX_SATS]` (vec3) added to `metaball-uniforms.glsl.ts` + `UNIFORM_NAMES`
     (`constants.ts:151-192`) + the program-builder location cache;
  2. in `metaball.frag.ts`, the satellite contribution samples its OWN color with a
     per-source weighted blend so the smin neck CROSS-FADES satellite color into body color
     (no hard seam at the fillet);
  3. `uploadBlobUniforms.ts` assigns satellite i ← `paletteStops[(i % (stopCount-1)) + 1]`
     (the lighter derived in-family shades — `frame.paletteStops` is already plumbed,
     `uploadBlobUniforms.ts:48/100`);
  4. optional `config.color.satelliteShadeSpread` knob.
- **BA coverage + the fence**: W-GOO-REDRESS opens exactly the named smin/orbit-envelope
  seam (`uploadBlobUniforms.ts:214` + the bridge) and otherwise fence-locks `metaball.frag`.
  This ask requires the frag's per-source COLOR seam — **either widen W-GOO-REDRESS's named
  seam to include the satellite color routing (same files, same uniforms module, natural
  rider) or ship it as a 4.x point release.** It is the ONE blob ask BA leaves open; value.js
  cannot derive satellite colors until it lands.
- **Companion (small, same surface)**: a `bodyLightness`/`lightnessFloor` option on
  `deriveBlobPalette` (`src/composables/color/index.ts:291` centers the ramp on the seed L)
  so a near-white seed still yields a perceptible body — the U3 "colors FAR TOO WHITE" base
  case is a value.js-side near-white SEED (root-caused, `U-BLOB.md §U3.a`; the chromaCeiling
  hypothesis is disproven), but the deriver currently gives the consumer no floor to stand
  on.

### C-2 — `<WatercolorDot variant="ghost">`: the dashed/outline register (U18 + U22) · MED

- **Finding**: "the dashed outline = a dashed/GHOST variant of the watercolor dot —
  abstracted to glass-ui" (U18); "not a proper watercolor ghost" (U22). The user's
  abstraction directive is verbatim.
- **Evidence**: LEDGER §F; X-GU.md §1F. `WatercolorDot.vue` ships props
  `color/animate/cycleDuration/range/seed` — no variant/ghost/outline axis. The value.js
  empty-palette-slot affordance today is a CSS dashed rectangle, which is exactly what the
  user rejects.
- **The ask**: a `ghost` (or `outline`/`dashed`) register that renders the SAME
  `useWatercolorBlob` PRNG geometry as a stroke / low-alpha fill — the irregular-blob
  silhouette as an outline, reading as a proper watercolor ghost (the empty-slot/add
  affordance). Same seed discipline as the solid dot so a ghost that fills keeps its
  silhouette.
- **BA coverage**: ABSENT — the 30-wave grep returns watercolor only in a passing
  W-PROGRESS-GRADIENT mention. Net-new roster item or a 4.x rider; small surface.

### C-3 — the published `<EasingPicker>`/`<EasingConfigurator>` primitive (U27 + U25; co-scheduled with A-2's kf donor) · HIGH, cross-repo

- **Finding**: "the easing area → a FIRST-CLASS easing selector + configurator, ABSTRACTED
  FROM keyframes.js INTO glass-ui, supporting the panoply of easing fns, styled like
  keyframes.js" (U27).
- **Evidence**: `value.js/docs/tranches/N/audit/lanes2/X-KF.md §§0-1,6` — the decisive
  structural fact: **three repos hand-roll three easing editors on the same value.js math,
  none published.** kf's trio is the richest donor
  (`EasingEditor.vue` 95 LoC composition root + `EasingCurveCanvas.vue` 385 LoC editable
  SVG bezier — drag handles, rubber-band clamp, overshoot viewBox `MAX_OVERSHOOT=0.6`,
  container-bounded `38cqi`, traveling progress dot + `EasingSelect.vue` 137 LoC grouped
  dropdown — 10 families, per-curve SVG previews, the bounded-scroll cap that is ALSO the
  U8 reference). glass-ui's own `BezierEditor.vue` (curve-gallery story) is the
  Tailwind-first twin, demo-only. value.js's `gradient/EasingSelector.vue` is the weakest
  (select + static thumbnail) — the U25 pane.
- **The ask**: publish ONE first-class primitive (picker + configurator), reconciling the kf
  trio with the in-house `BezierEditor` twin, consuming value.js
  `bezierPresets`/`CSSCubicBezier`/`timingFunctions`/`timingFunctionDescriptions` (all
  barrel-exported, `value.js src/index.ts:226-238`), using glass-ui's OWN drag idiom (not
  kf's `useDragCapture` seam). **Coordinate with W-FOURIER-STUDIO's `StepsEditor` fold so
  the steps sub-editor lands IN the published primitive, not a fourth demo-only fork**, and
  note W-DEMO-AFFORDANCES' curve-picker chip rack is explicitly DEMO-LOCAL by BA's own fence
  — the published primitive is a different artifact, not a duplication of it. Three
  consumers re-point on their own schedules: the kf easing rail (their L tranche), the
  glass-ui curve-gallery story, the value.js gradient pane (N.W6.C, upgraded to consume).
- **Boundary law** (kf L-SEED, already drawn): curve MATH = value.js; playback/spring = kf;
  the editor COMPONENT = glass-ui. Neither kf's K nor BA schedules this publish — it is the
  one U-finding that crosses both siblings and is authored by neither. Net-new roster item.

---

## Register D — confirmations (BA already covers; named downstream consumer only — extend, don't re-state)

1. **Skeleton glass (U20a)**: W-SURFACE-AXIS scope 6 (`<Skeleton surface="glass">`, the
   translucent shimmer over the frosted plate) is EXACTLY the fix. No new scope. Named
   downstream consumer: value.js re-authors its bespoke `PaletteCardSkeleton.vue`
   (`bg-foreground/[0.04]` over `bg-card` — the "too black" composite) onto the register at
   the pin. (`U-CONTROLS.md §U20a`.)
2. **The dropdown open-jerk's spring half (U23)**: after A-2/WO-1 bounds the box, confirm
   the Select/DropdownMenu open transition appears in W-GLASS-CAL.3's spring-clock census;
   if it rides a hardcoded duration it is not swept and needs explicit inclusion.
3. **The consume-only bulk**: U1 (gray/dark → W-DARK-MATERIAL + W-NO-GRAY), U6/U12's spring
   feel (W-GLASS-CAL.3), U16's clip half (W-DOCK-GEOMETRY), U7's glass item register
   (W-MENU-GLASS), U13's veil (W-SURFACE-AXIS) — value.js consumes these at the cut, no ask.

---

## Register E — the cut (the value.js pin)

- value.js N chartered its close pin at glass-ui 3.13.0 (`inv-N-6`). **BA's 4.0.0 is where
  the U-fixes actually land — value.js will re-target N.W9's pin to the BA cut** and holds
  until it ships. The acyclic spine holds (value.js never blocks BA); the wait is
  one-directional and gates only the final pin, not the work.
- The 4.0.0 MIGRATION/cut notes owe value.js BY NAME the rows that hit its live consumers:
  the tabs break (`SegmentedTabs` `segmented`→`pill`, `ui/Tabs` leaving the public surface —
  value.js consumes `@mkbabb/glass-ui/tabs` in `PaneSegmentedControl.vue`), the Dialog
  `variant`→`surface` move, the menu-row glass default flip (A-2's family), and any Select/
  Slider surface renames out of registers A/B above. Same discipline as the atlas letter's
  register D: by name in the cut notes, never silently.

## Routing

The asks fold smallest-first: A-1/A-4/A-5/D are riders on existing waves (defect-table +
acceptance-row additions, the BA inv-3 RE-GROUND idiom); A-2 + Register B are one
robustness item (a W-MENU-GLASS/W-HYGIENE extension or a net-new roster wave — the
emission gate is the load-bearing half); C-1 rides W-GOO-REDRESS's seam or a 4.x; C-2 is a
small net-new register; C-3 is the one genuinely new primitive (cross-repo, co-scheduled
with A-2's donor study). Authored by the value.js N2 fleet under its sanctioned docs-only
grant; value.js writes no glass-ui code (inv-16/inv-10 — the foreign-repo fence); the BA
lead reviews, amends, and owns the fold. Tranche development only — NO implementation.
