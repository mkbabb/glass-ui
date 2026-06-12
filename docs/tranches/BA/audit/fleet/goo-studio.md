# BA fleet — lane: goo-studio (R8-7)

Surface: `demo/stories/substrates/blob.vue` → route `/substrates/blob`. Live-probed on
:5199, dark (the page default) + light, desktop 1440 + mobile 390. Ground:
`ground/R8-07-goo-configurator-broken.png`. Evidence captures beside this report.

The user's words: "The goo configurator is almost entirely broken, the hover over effects
are far too quick and jittery, and the blobbing/satellite feature of the blobs are broken."

Three independent defects, each root-caused below.

---

## (a) THE MISSING SLIDERS — the "labels with no controls" defect [S1, mechanical]

**Root cause: `src/components/custom/configurator/ConfiguratorRow.vue:120`** — the slotted
control wrapper.

```html
<div class="flex items-center">
    <slot />
</div>
```

The wrapper is a flex ROW. The slotted child is the `<LabeledSlider>`'s root
`.labeled-field` (`display:block`). As a flex item it computes `flex: 0 1 auto`, so its
main-axis (WIDTH) is content-sized. The ONLY width contributor inside is the slider's
`.glass-slider` with `w-full` (`width:100%`) — a percentage that resolves against the
content-sized parent → circular → **0**. So `.labeled-field` collapses to width 0 and the
slider with it.

LIVE PROOF (fresh load, dark, desktop):
- The 8 studio sliders are ALL in the DOM (`display:flex`, `visibility:visible`,
  `opacity:1`) but `getBoundingClientRect().width === 0`. Track height is a healthy 20px;
  only the WIDTH collapses.
- Parent chain: `.configurator-row` 335px → `div.flex.items-center` 335px →
  **`.labeled-field` 0px (flex:0 1 auto, display:block)** → `.glass-slider` (`w-full`) 0px.
- The SELECT rows in the SAME wrapper survive (Mood 111px, Harmony 131px, Merge 121px) —
  their trigger `<button>` carries intrinsic CONTENT width, so the block doesn't collapse.
  This is why R8-07 shows the Mood select rendered but every slider blank.
- Mode-INDEPENDENT (layout, not contrast) and viewport-INDEPENDENT: identical 0-width at
  390px mobile and in light mode.

REGRESSION TRIGGER: this is the `hide-label` interaction (AZ.W-BLOB-REDRESS). Before
`hide-label`, the LabeledField rendered a VISIBLE `.labeled-field-label` that gave the
block intrinsic width; once the label went `sr-only` (kept for a11y, zero layout width),
the only width contributor vanished and the block collapsed under flex content-sizing.

LIBRARY-WIDE, not blob-local: the dedicated Configurator showcase
`/compositions/configurator` ALSO renders its 2 slider rows at width 0. Both demo
consumers that compose `LabeledSlider`-in-`ConfiguratorRow` are broken
(`demo/stories/substrates/blob.vue`, `demo/stories/compositions/configurator.vue`). The
Aurora studio is UNAFFECTED only because it composes `LabeledSlider` inside a flex COLUMN
(`AuroraMotionSection.vue:43` `flex flex-col gap-3`), where the cross-axis default
`align-items:stretch` stretches the block to full width — it never routes through
`ConfiguratorRow`'s flex-row wrapper.

REMEDY VALIDATED LIVE (read-only DOM experiment): applying `flex:1 1 0%; min-width:0;
width:100%` to the slotted `.labeled-field` child restored the 8 slider widths **0 →
335px** (captured: `goo-studio-remedy-validated.png` — the full Attraction/Click-impulse/
Responsiveness tracks now paint). The SELECT rows already had width, so they were
unaffected.

GESTALT REMEDY DIRECTION: the `ConfiguratorRow` control wrapper must make its slotted
control FILL the row's inline axis — the chrome owns row layout, so the fix lives there
(at the wrapper, library-side), not per-consumer. Idiomatically: have the wrapper stretch
its slotted child to the row width (e.g. the slotted control occupies the full inline
extent regardless of intrinsic content width). The companion hardening is for the
labeled-field family to not depend on a visible label for its width — a control whose
label is `sr-only` must still claim its inline space. A `proof:*` gate asserting a
slider inside `ConfiguratorRow` resolves a non-zero painted width would close the class
(the existing gates are headless/source and missed the 0-width render entirely — the
"headless-green / visually-broken" pattern).

Evidence: `goo-studio-sliders-collapsed-dark.png`, `goo-studio-mobile-sliders-collapsed.png`,
`goo-studio-remedy-validated.png`.

---

## (b) THE DETACHED SATELLITE — the "blobbing/satellite feature broken" defect [S2, mechanical-design]

**Root cause: knife's-edge orbit geometry vs the smin reach** —
`demo/stories/substrates/blob.vue:144` (`STUDIO_GEO_BASE`) × the smin band upload in
`src/components/custom/goo-blob/composables/uploadBlobUniforms.ts:214` × the random orbit
inflation in `src/components/custom/goo-blob/composables/useBlobSatellites.ts:37,116`.

The studio Calm default: `orbitRadius 0.30`, `satelliteRadius 0.10`, `smoothK 0.06`, body
radius ~0.22. Everything is POS_SCALE'd (`1/1.6 = 0.625`, constants.ts:28): body edge
0.1375, orbit 0.1875, satellite near-edge 0.125, smin band 0.0375 (UV).

At the nominal orbit the satellite OVERLAPS the body and bridges. BUT `useBlobSatellites`
inflates the per-satellite orbit by a random `0.8..1.2×` (`baseR = orbitRadius * (0.8 +
rng()*0.4)`, lines 37/116) and adds eccentricity + wobble. At the high end
(orbit×1.2 = 0.36, ×0.625 = 0.225) the satellite near-edge (0.1625) sits OUTSIDE the body
edge (0.1375) by 0.025 — and the smin band (0.0375) only barely reaches. Wobble +
eccentricity push it past the band intermittently, leaving a fully-detached floating disc
with NO gooey bridge — exactly the R8-07 capture (a separate circle above a two-lobe body).

So the merge is tuned to the EDGE of the smin reach and flickers between "merged neck" and
"detached disc" as the random orbit/wobble breathes. Live confirmation: a fresh-load frame
shows a coherent teardrop with a working neck (`goo-studio-blob-live-dark.png`), but the
ground capture caught the detached state — the mechanism is intermittent, which reads as
"broken."

A secondary structural smell: the phase-spread `baseAngle = (index/4)*2π`
(useBlobSatellites.ts:35) hardcodes `/4` regardless of `satelliteCount`, so a non-4 count
clusters the satellites unevenly — not the R8-07 defect but a latent over-fit.

GESTALT REMEDY DIRECTION: the metaball relationship must ALWAYS read — a satellite should
never float as an unrelated disc. Either (i) keep the orbit envelope (nominal × random ×
ecc × wobble) inside a RELIABLE smin reach so a bridge always paints, or (ii) widen the
orbiting-phase smin so the neck persists across the whole orbit, or (iii) make the design
intentional — a satellite that genuinely separates does so with a visible stretching-then-
snapping neck (a teardrop pinch-off), never an instantaneous detach. The user asked to
"watch the metaballing" (the studio's whole purpose), so the bridge should be the DEFAULT
visible state, not a brief window. The smin band riding POS_SCALE while the orbit random
multiplier does NOT is the specific coupling to revisit — the band must scale with the
worst-case orbit excursion, not the nominal.

Evidence: `goo-studio-blob-live-dark.png` (working neck frame), ground/R8-07 (detached).

---

## (c) THE HOVER JITTER — "hover effects far too quick and jittery" defect [S2, mechanical]

**Root cause: no pointer→wake on the demand-parked render loop** —
`src/components/custom/goo-blob/GooBlob.vue` (no `watch(pointer.active, renderer.wake)`)
× `src/components/custom/goo-blob/composables/useBlobPointer.ts:78` (sets `active.value =
true` but cannot reach the renderer) × `src/components/custom/goo-blob/composables/useMetaballRenderer.ts:368-369`
(wakes ONLY on `color`/`paletteStops` change).

The blob runs a demand loop that PARKS when fully at rest (the AX.W16 quiescence gate,
useMetaballRenderer.ts:307-330). The park re-arms via a satellite-phase `setTimeout`
scheduler (`scheduleWake`, lines 122-141) OR a `color`/`paletteStops` watch. There is NO
wake wired to POINTER activity: `onPointerMove` (useBlobPointer.ts:72-79) flips
`active.value = true` but holds no reference to `canvasHandle`/the renderer, and nothing
`watch`es `pointer.active`. So when the blob has parked (all 4 satellites simultaneously
`orbiting` → `isQuiescent()` true → `isAtRest()` true → loop parked), the first hover does
NOT repaint until the next SCHEDULED satellite wake (up to the orbit horizon away). When
the loop finally wakes, `drawFrame` reads the now-far-off pointer target and the spring
catches up in one clamped 50ms step (the first-post-park dt clamp, useBlobPointer.ts:116)
— a delayed-then-lurching response that reads as "quick and jittery."

This is intermittent because the 4 satellites are rarely all-orbiting at once (the merge/
absorb/emerge phases keep the loop alive most of the time), so hover sometimes responds
instantly and sometimes lurches — the classic jitter signature.

Secondary "too quick" register: the pointer trail pseudopod pushes a fresh sample on EVERY
pointermove (useBlobPointer.ts:156-160) and rebuilds the reaching limb each frame; a fast
flick spawns a rapidly-morphing pseudopod that reads twitchy. The body-lean spring itself
(`response:0.18, dampingFraction:1.0`, useBlobPointer.ts:49) is critically-damped and
frame-rate-independent — it is NOT the jitter source; the demand-loop park/wake seam is.

GESTALT REMEDY DIRECTION: pointer activity must WAKE the parked loop the same way
`color`/`paletteStops` do — a `watch(pointer.active, () => renderer.wake())` (or the
pointer machine calling back into the renderer's wake on enter) so the first hover repaints
on the same frame, with no accumulated-delta lurch. This is the canonical demand-loop
discipline already established for the color/palette path; the pointer path was simply
never wired into it. Folding the pointer into the existing wake seam (not a new rAF) keeps
the single-substrate-loop invariant intact. The trail pseudopod's per-move rebuild can be
smoothed on the same pass (rate-limit the sample push or ease the limb radius) once the
wake lag is gone.

Evidence: source trace above (useBlobPointer.ts:72-79 vs useMetaballRenderer.ts:368-369).

---

## Cross-cutting note

(a) is the headline — it is what makes the studio read "almost entirely broken" (half the
controls invisible). It is a clean mechanical bug at `ConfiguratorRow.vue:120` affecting
EVERY Configurator slider library-wide, with a live-validated one-point remedy. (b) and (c)
are real but secondary; both are demand-loop / geometry-tuning concerns local to the
goo-blob composables. None is a dark-register defect — all three reproduce identically in
light and dark (the cross-cutting dark weakness flagged in R8 does not apply to this lane;
the studio's near-black plate is the page background, not a goo-studio bug).
