# BA.W-GOO-REDRESS — the goo studio's renderer half: the bridge holds, the hover wakes

**Name**: W-GOO-REDRESS - the satellite-bridge envelope + the pointer wake seam
**Opens after**: Batch 1 (W-DARK-MATERIAL holds its live verdict — BA inv-5) · runs ‖ W-CONFIG-CHASSIS ‖ W-DOCK-GEOMETRY ‖ W-FADING-SCROLL (Batch 2; disjoint file bounds per the EXECUTION-DAG §3 table)
**Agents**: 1
**Hard gate**: `proof:goo-redress` (born-RED) — two falsifiable SOURCE witnesses (the smin band scales with the WORST-CASE orbit excursion not the nominal; a `watch(pointer.active) → renderer.wake()` wire EXISTS in GooBlob.vue) + the π live readback DELTA (the bridge neck paints across the full random×ecc×wobble envelope; first-hover-after-park repaints same-frame with no accumulated-delta lurch) + the W-REFLECT2 gestalt verdict on the configurators+goo surface (BA inv-4).
**Status**: SPEC

## §0 — RE-GROUND (mandatory step-0; re-grep every cite at HEAD before any edit)

This wave starts from the goo-studio lane's two root-caused renderer defects, not a blind
re-diagnose (BA invariant 3 — re-opened ≠ rebuilt-blind). Before touching a byte, the impl
agent re-greps each anchor below at HEAD and confirms the two mechanisms still hold; if any
cite has drifted, the agent records the drift in PROGRESS and re-locates the mechanism
before proceeding — it does NOT re-invent the diagnosis. The headline missing-sliders
defect (goo-studio §(a), `ConfiguratorRow.vue:120`) is OWNED BY W-CONFIG-CHASSIS, NOT this
wave — this wave is the renderer half only (the satellite bridge + the pointer wake).

Grounding findings (`audit/fleet/goo-studio.md` + `audit/fleet/disco-hover.md`):
**BA-goo-2** [the detached satellite, goo-studio §(b)], **BA-goo-3** [the hover jitter,
goo-studio §(c)], **BA-disco-04** [disco-hover B2 — the renderer-half coordination note
that splits R8-7's "jittery" by mechanism]. Plus the cross-repo fold
**BA-VJS-5** [valuejs-fold C-1, `audit/fleet/valuejs-fold.md:247-278` + the value.js
letter §C-1] — per-satellite derived-shade color: the satellites should render as
slightly-different in-family shades (like `deriveAurora`), not the body color.
Captures: `docs/tranches/BA/audit/fleet/{goo-studio-blob-live-dark.png` (the working-neck
frame), `goo-studio-remedy-validated.png}`; ground `docs/tranches/BA/audit/ground/R8-07-goo-configurator-broken.png`
(the detached disc above a two-lobe body — the BA-goo-2 fail state).

The user's words (R8-7): "the blobbing/satellite feature of the blobs are broken" +
"the hover over effects are far too quick and jittery". The user asked to "watch the
metaballing" — the bridge is the studio's whole purpose, so the merge must be the DEFAULT
visible state, not a brief window.

The two renderer root causes (each independently confirmed at HEAD this authoring):

1. **The satellite bridge is tuned to the EDGE of the smin reach (BA-goo-2).** The studio
   Calm default seeds `orbitRadius 0.30`, `satelliteRadius 0.10`, `smoothK 0.06`, body
   radius ~0.22 (`STUDIO_GEO_BASE`, blob.vue:144). All POS_SCALE'd (`1/1.6 = 0.625`,
   constants.ts:28). At the NOMINAL orbit the satellite overlaps the body and bridges —
   but `useBlobSatellites` inflates the per-satellite orbit by a random `0.8..1.2×`
   (`baseR = orbitRadius * (0.8 + rng()*0.4)`, useBlobSatellites.ts:37 at create + :116 at
   the orbit re-randomize) and adds eccentricity + wobble. At the high end (orbit×1.2 =
   0.36, ×0.625 = 0.225) the satellite near-edge (0.1625) sits OUTSIDE the body edge
   (0.1375) by 0.025, and the smin band (0.0375 UV, `cMem.smoothK * params.smoothK *
   POS_SCALE`, uploadBlobUniforms.ts:214) only barely reaches; wobble + ecc push it past
   the band intermittently → a fully-detached floating disc with NO gooey bridge (the
   R8-07 capture). **The specific coupling**: the smin band rides POS_SCALE while the orbit
   random multiplier (×0.8..1.2) does NOT — the band must scale with the WORST-CASE orbit
   excursion, not the nominal. A secondary latent over-fit: the phase-spread
   `baseAngle = (index/4)*2π` (useBlobSatellites.ts:35) hardcodes `/4` regardless of
   `satelliteCount`, so a non-4 count clusters unevenly (not the R8-7 defect, flagged not
   fixed unless the envelope work touches it).

2. **There is no pointer→wake on the demand-parked render loop (BA-goo-3).** The blob runs
   a demand loop that PARKS when fully at rest (the AX.W16 quiescence gate,
   useMetaballRenderer.ts:314-335 `shouldContinue()`). The park re-arms via a satellite-phase
   `setTimeout` (`scheduleWake`) OR the `color`/`paletteStops` watch
   (useMetaballRenderer.ts:368-369, `watch(color, () => canvasHandle?.wake())`). There is
   NO wake wired to POINTER activity: `onPointerMove` (useBlobPointer.ts:78) flips
   `active.value = true` but holds no renderer reference, and nothing `watch`es
   `pointer.active`. So when all 4 satellites are simultaneously orbiting (loop parked),
   the first hover does NOT repaint until the next SCHEDULED satellite wake (up to the orbit
   horizon away); when the loop finally wakes, `drawFrame` reads the now-far-off pointer
   target and the spring catches up in one clamped 50ms step (the first-post-park dt clamp,
   useBlobPointer.ts:116) — a delayed-then-lurching response that reads as "quick and
   jittery". Intermittent because the 4 satellites are rarely all-orbiting at once (the
   merge/absorb/emerge phases keep the loop alive most of the time) — the classic jitter
   signature. The body-lean spring (`response:0.18, dampingFraction:1.0`, useBlobPointer.ts:49)
   is critically-damped and frame-rate-independent — NOT the jitter source; the park/wake
   seam is.

**BA-VJS-5 — per-satellite derived-shade color (the C-1 seam note; CONFIRMED at HEAD).**
The satellite uniform block carries ONLY `uSatPos`/`uSatRadius`/`uSatOpacity`
(`metaball-uniforms.glsl.ts:84-86`); `grep uSatColor` returns 0. `constants.ts:13`
`MAX_SATS=4`; `UNIFORM_NAMES` (`:151`) lists `uSatShift`/`uSatCount` but no `uSatColor`.
The `deriveBlobPalette` docstring already PROMISES "satellites take the lighter in-family
stops" (`src/composables/color/index.ts:267,290`) — the renderer never honors it
per-source, so satellites render from the SAME palette field as the body and read as the
body color. value.js chartered this at `N.md §8` (V4); it is the ONE blob ask BA leaves
open, and value.js cannot derive satellite colors until it lands. **THE SEAM DECISION (both
arms recorded — see §Scope item 6):** the C-1 fix needs the FRAG's per-source COLOR seam
(`metaball.frag.ts` samples the satellite's own color + a smin-neck cross-fade), which is
FENCE-LOCKED under BA inv-9 — this wave's named seam is the `uSmoothK`/orbit ENVELOPE
(`uploadBlobUniforms.ts:214` + `useBlobSatellites.ts` atoms), NOT the frag color. So C-1 is
EITHER (arm A) a NAMED-SEAM-WIDEN — extend this wave's fence-open to include the satellite
color routing (same uniforms module + `uploadBlobUniforms.ts`, the natural rider) OR (arm B)
a 4.x POINT RELEASE after BA. Both arms are recorded; the wave lead picks at dispatch (the
default below is the conservative arm B — book to 4.x — unless the lead widens the fence).

RE-GROUND command set (run all; confirm each mechanism):

```
sed -n '30,40p' src/components/custom/goo-blob/composables/useBlobSatellites.ts    # the /4 phase + baseR random ×0.8..1.2
sed -n '106,130p' src/components/custom/goo-blob/composables/useBlobSatellites.ts  # randomizeOrbit re-inflation
sed -n '200,230p' src/components/custom/goo-blob/composables/uploadBlobUniforms.ts # the uSmoothK band upload (POS_SCALE)
sed -n '70,90p'  src/components/custom/goo-blob/composables/useBlobPointer.ts      # active.value=true, no renderer reach
sed -n '356,370p' src/components/custom/goo-blob/composables/useMetaballRenderer.ts # the wake watchers (color/paletteStops only)
grep -n 'pointer.active\|watch(' src/components/custom/goo-blob/GooBlob.vue        # MUST show NO pointer→wake (the missing wire)
sed -n '144,151p' demo/stories/substrates/blob.vue                                # STUDIO_GEO_BASE the studio default
```

## Defect table (file:line — RE-GREP at HEAD)

| # | finding | file:line | the mechanism |
|---|---|---|---|
| 1 | BA-goo-2 detached satellite [S2] | `demo/stories/substrates/blob.vue:144` (`STUDIO_GEO_BASE`); `useBlobSatellites.ts:37` (`baseR = orbitRadius * (0.8 + rng()*0.4)` at create), `:116` (re-randomize); `uploadBlobUniforms.ts:214` (`uSmoothK = cMem.smoothK * params.smoothK * POS_SCALE`) | the smin band rides POS_SCALE but NOT the ×0.8..1.2 orbit random; at the high excursion + ecc + wobble the satellite leaves the band → instantaneous detach, no bridge |
| 2 | BA-goo-2 latent /4 phase over-fit [S3] | `useBlobSatellites.ts:35` (`baseAngle = (index/4)*2π`) | the `/4` hardcode clusters a non-4 `satelliteCount` unevenly — flagged, fixed only if the envelope work touches the spread |
| 3 | BA-goo-3 / BA-disco-04 hover lurch [S2] | `GooBlob.vue` (no `watch(pointer.active, …)`); `useBlobPointer.ts:78` (`active.value = true`, no renderer reach); `useMetaballRenderer.ts:368-369` (wake watches `color`/`paletteStops` only) | the parked loop has no pointer wake → first hover repaints up to an orbit horizon late, then the spring lurches one 50ms-clamped step |
| 4 | the working-neck baseline [S2] | `ground/R8-07-goo-configurator-broken.png` (detached); `fleet/goo-studio-blob-live-dark.png` (working neck) | the merge is intermittent — a coherent teardrop one frame, a detached disc the next; "broken" = the detach window |
| 5 | BA-VJS-5 per-satellite color [valuejs-fold C-1, HIGH] | `metaball-uniforms.glsl.ts:84-86` (`uSatPos`/`uSatRadius`/`uSatOpacity` only, `uSatColor`=0); `constants.ts:13,151` (`MAX_SATS=4`, no `uSatColor` in `UNIFORM_NAMES`); `color/index.ts:267,290` (`deriveBlobPalette` promises lighter in-family stops, unhonored per-source) | satellites render from the SAME palette field as the body → read as the body color; needs the frag's per-source COLOR seam (fence-locked) — arm A widen the named seam OR arm B 4.x. The ONE blob ask BA may leave open |

## Goal criterion

The goo studio's metaball relationship ALWAYS reads — a satellite never floats as an
unrelated disc; the gooey bridge is the DEFAULT visible state across the full orbit
envelope (nominal × random × ecc × wobble), and the first pointer hover after the loop has
parked repaints on the SAME frame with no delayed-then-lurching catch-up. A user opening
`/substrates/blob` to "watch the metaballing" sees a continuously-merging creature whose
hover follows instantly, in BOTH modes.

## Scope

1. **Hold the bridge across the WORST-CASE orbit excursion (root cause 1).** Scale the smin
   band by the orbit random multiplier's worst case, not the nominal — the named smin/orbit
   envelope seam (the ONLY shader-adjacent seam this wave may touch, BA inv-9 / scope
   fences). The impl agent picks ONE of the lane's three remedy directions, recorded in the
   DELTA: (i) **keep the envelope inside a reliable smin reach** — tighten the orbit envelope
   (cap or re-center the `0.8..1.2×` random + the ecc/wobble amplitudes in
   `useBlobSatellites.ts:37,116`) so the satellite near-edge never leaves the band; or (ii)
   **widen the orbiting-phase smin** — inflate the uploaded `uSmoothK`
   (uploadBlobUniforms.ts:214) by the worst-case orbit factor (`×1.2` + the ecc max) so the
   neck persists across the whole orbit; or (iii) **make separation INTENTIONAL** — a
   satellite that genuinely separates does so with a visible stretching-then-snapping neck
   (a teardrop pinch-off), never an instantaneous detach. Direction (ii) is the recommended
   default (it scales the band with the excursion the lane named as the specific coupling,
   touching only the named seam and not the geometry the gate already bounds); the agent may
   compose (i)+(ii) if (ii) alone over-inflates the resting bridge past the lean ceiling.
2. **Respect the existing smin-lean ceiling.** Any `uSmoothK` widening (direction ii) stays
   under the gated calm-lean centroid ceiling that `proof:blob-smin-normalized` enforces (the
   STUDIO_GEO_BASE comment, blob.vue:133-143, records the 0.10 ceiling: `0.06 + circular`
   measures lean ≈ 0.099; `0.08` over-inflated it). The widening rides POS_SCALE in the SAME
   UV space as the radii (uploadBlobUniforms.ts:200-214) — no split-length regime, no
   `/DEFAULTS` ratio normalization. The `uMaxReach` bounding-discard
   (uploadBlobUniforms.ts:217-229) already sums the worst-case orbit `×1.2 × (1+ecc)` + the
   smin band + the FBM edge; confirm it still pads any widened band (it must never clip the
   wet meniscus) and widen the pad if the new band exceeds it.
3. **Wire pointer activity into the existing wake seam (root cause 2).** Add a
   `watch(pointer.active, (a) => { if (a) renderer.wake() })` (or the pointer machine calling
   back into the renderer's wake on enter) in `GooBlob.vue`, mirroring the `color`/`paletteStops`
   wake (useMetaballRenderer.ts:368-369) — so the first hover repaints on the same frame with
   no accumulated-delta lurch. This folds the pointer into the EXISTING wake seam (NOT a new
   rAF), keeping the single-substrate-loop invariant intact. `renderer.wake` is the
   `canvasHandle?.wake()` handle the captured `useMetaballRenderer` return already exposes
   (GooBlob.vue:117 captures `renderer`; the color watchers prove `wake` is reachable).
4. **(opt) Smooth the trail pseudopod on the same pass** — the per-pointermove sample push
   (useBlobPointer.ts:156-160) rebuilds the reaching limb each frame; a fast flick spawns a
   rapidly-morphing pseudopod that reads twitchy. Rate-limit the sample push or ease the limb
   radius ONLY if the wake fix alone does not settle the "too quick" register (the lane names
   this as the secondary register, addressed once the wake lag is gone). This is in-scope but
   gated on the wake fix being insufficient — NOT a speculative add.
5. **Do NOT touch the `/4` phase over-fit (defect 2)** unless the envelope edits in scope 1
   land in the same `createSatellite`/`randomizeOrbit` block and the fix is a one-line
   `satelliteCount`-aware spread — record it in the DELTA if folded, leave it flagged
   otherwise (it is not the R8-7 defect).

## Coordination (the R8-7 "jittery" split — declared, not raced)

R8-7's "far too quick and jittery" is split by MECHANISM across two waves (EXECUTION-DAG §3
+ disco-hover B2):

- **The renderer half is THIS wave** — the pointer wake seam (scope 3) + the satellite
  bridge (scope 1). The WebGL blob pointer-follow and the demand-loop park/wake are
  goo-studio's territory.
- **The CSS chip-easing half is W-GLASS-CAL (Batch 4)** — the `<ToggleChip>` register the
  goo/aurora configurator chip rows use (`toggle-chip/index.ts:19`,
  `transition-colors duration-150 ease-out` — the hardcoded 150ms flat-snap off the §6
  doctrine). That file is W-GLASS-CAL's bound; THIS wave does not touch it.
- **The W-REFLECT2 goo verdict checks BOTH halves landed** (EXECUTION-DAG §3: "the W-REFLECT2
  goo verdict checks BOTH"). So this wave's gestalt verdict on the configurators+goo surface
  is NOT independently closeable until W-GLASS-CAL's chip-easing fix also holds — the gestalt
  bar (BA inv-4) is the reconciliation point, and that bar binds at W-REFLECT2, not here.
  This wave closes its OWN per-mechanism gate + its own π readback at Batch 2; the joint goo
  gestalt verdict is W-REFLECT2's.

## Triumvirate Dispatch

- **File-bounds expansion that invalidates the wave**: if holding the bridge across the
  envelope (scope 1) cannot be done WITHIN the named smin/orbit envelope seam
  (`useBlobSatellites.ts` orbit atoms + `uploadBlobUniforms.ts:214` band + the
  `uMaxReach` pad) and demands editing the shader GLSL internals (`metaball.frag` /
  `sdf-body.glsl.ts` smin math) — that is a fence breach (BA inv-9); STOP and triumvirate
  (research the band/envelope coupling options + plan-augment the bound + redress), do NOT
  cross the GL fence unilaterally.
- **Hard-gate failures not local-edit-recoverable**: if widening the smin band to hold the
  worst-case bridge (direction ii) pushes the resting lean past the
  `proof:blob-smin-normalized` ceiling AND tightening the envelope (direction i) collapses
  the orbit→merge→absorb→emerge show the studio exists to demonstrate (the two constraints
  are in tension and no value satisfies both), that is a register-design miss — triumvirate,
  do not loop on smin/orbit values.
- **Diagnostic loop halt**: if the pointer wake wire is in place but the first-hover-after-park
  still lurches and three iterations have not isolated whether the lag is the wake itself, the
  first-post-park dt clamp (useBlobPointer.ts:116), or the satellite scheduler racing the
  pointer wake — halt and triumvirate (the demand-loop wake ordering is the suspect).

## File Bounds

| File | Access |
|---|---|
| `src/components/custom/goo-blob/composables/useBlobSatellites.ts` | modify (the orbit envelope: `baseR` random + ecc/wobble amplitudes; the optional `/4` spread) |
| `src/components/custom/goo-blob/composables/uploadBlobUniforms.ts` | modify (the `uSmoothK` band scale + the `uMaxReach` pad — the named smin/orbit envelope seam) |
| `src/components/custom/goo-blob/GooBlob.vue` | modify (the `watch(pointer.active) → renderer.wake()` wire) |
| `src/components/custom/goo-blob/composables/useBlobPointer.ts` | modify (the optional trail-pseudopod rate-limit — scope 4, gated) |
| `demo/stories/substrates/blob.vue` | modify (`STUDIO_GEO_BASE` only, IF scope 1 picks direction (i) and re-centers the studio default) |
| `scripts/proof-goo-redress.mjs` | create (the born-RED gate) |
| `package.json` | modify (register `proof:goo-redress` in scripts) |
| `scripts/gates.mjs` | modify (register the `proof:goo-redress` registry row) |
| `docs/tranches/BA/audit/visual/W-GOO-REDRESS-DELTA.md` | create (the π readback DELTA) |
| `CLAUDE.md` | modify (record the pointer-wake seam + the worst-case-orbit smin coupling in the goo-blob / WebGL substrate section) |

Do NOT touch:

- **The GL shader internals** — `metaball.frag.ts`, `sdf-body.glsl.ts`, `aurora.frag.ts`,
  and any `.glsl.ts` smin/SDF math. The fence is open ONLY for the named smin/orbit envelope
  seam (the `uSmoothK` UNIFORM UPLOAD in `uploadBlobUniforms.ts` + the JS-side orbit atoms in
  `useBlobSatellites.ts`) — the in-shader smin formula stays fence-locked (BA inv-9 / scope
  fences: "the GL renderer fence (blob/aurora shader internals) is untouched except where a
  wave names it" — this wave names ONLY the upload+envelope seam, NOT the shader).
- **`src/components/custom/configurator/ConfiguratorRow.vue`** + the LabeledField family — the
  0px-slider headline (goo-studio §(a)) is **W-CONFIG-CHASSIS**'s bound (Batch 2 sibling).
  This wave is the renderer half ONLY.
- **`src/components/custom/toggle-chip/index.ts`** + `src/styles/utilities/btn.css` + the chip
  easing — the CSS chip-easing half of R8-7 is **W-GLASS-CAL** (Batch 4). Do not pre-fix it.
- **`src/styles/dock/*`, `demo/layout/*`** — W-DOCK-GEOMETRY (sibling) owns the dock geometry;
  W-SHELL-HOLD (Batch 0, landed) owns the railContext guard.
- **The `useMetaballRenderer` quiescence/park machinery** beyond consuming its EXISTING `wake`
  handle — do not add a parallel rAF or a second wake path (the single-substrate-loop
  invariant); scope 3 is a watcher that calls the existing handle, nothing more.
- **ppmycota purple** never enters library tokens (the standing fence; not in this wave's
  reach regardless).
- **The slides `docs/tranches/M/` docs** — foreign (the standing fence).

### Disjointness

Single agent; no intra-wave path contention. Across Batch 2 (per EXECUTION-DAG §3):
W-CONFIG-CHASSIS writes `configurator/*` + `labeled-field/*` + `demo/configurator/*` + the
aurora preset stories (this wave writes NONE of those); W-DOCK-GEOMETRY writes
`dock/{shell,overflow}.css` + `dock-controls/*` + the shell-dock `overflow` prop (this wave
writes none); W-FADING-SCROLL creates `fading-scroll/*` + retires `.scroll-fade-*` +
`PresetPickerRow.vue` + `segmented-tabs.css` (this wave writes none). The goo-blob composable
quartet + `GooBlob.vue` + `STUDIO_GEO_BASE` in `blob.vue` are touched by NO other Batch-2
wave. `package.json` + `scripts/gates.mjs` are shared registration surfaces across Batch-2
gate-minting waves — **coordination note**: each wave appends its OWN script key + registry
row; the orchestrator sequences the `package.json`/`gates.mjs` registration commits (not
parallel writes to the same row), OR commits each wave before the next parallelizes per
WAVE_SPEC §4b. No two waves write the SAME `package.json` script key or the SAME `gates.mjs`
row. `blob.vue` is this wave's exclusive bound in Batch 2 (W-CONFIG-CHASSIS's demo bound is
`demo/configurator/*` + the aurora stories, not the blob story).

## Agent Units

### BA.W-GOO-REDRESS.1 the worst-case-orbit bridge envelope

- Goal: the gooey bridge paints across the FULL orbit envelope (nominal × random ×0.8..1.2 ×
  ecc × wobble) so a satellite never detaches as an unrelated disc; the resting lean stays
  under the gated ceiling.
- Mechanism: the named smin/orbit envelope seam. Pick ONE direction (recorded in the DELTA):
  (i) tighten the orbit random/ecc/wobble amplitudes in `useBlobSatellites.ts:37,116` so the
  near-edge never leaves the band; (ii) scale `uSmoothK` (uploadBlobUniforms.ts:214) by the
  worst-case orbit factor (`×1.2` + ecc max) so the neck persists; (iii) intentional
  pinch-off separation (visible stretching neck, never instantaneous detach). (ii) is the
  default. Confirm `uMaxReach` (uploadBlobUniforms.ts:217-229) still pads the widened band.
  Stays under the `proof:blob-smin-normalized` lean ceiling.
- Files: `useBlobSatellites.ts:35-130`, `uploadBlobUniforms.ts:200-229`, `blob.vue:144`
  (`STUDIO_GEO_BASE`, only if direction (i) re-centers the studio default).
- Sub-gate: the gate's W1 witness — the `uSmoothK` upload (or the orbit envelope atoms) is
  computed from the WORST-CASE orbit excursion, not the nominal (source-asserted: the band
  scale references the `×1.2`/ecc-max term, or the random multiplier is capped so the
  near-edge stays inside the band), AND `proof:blob-smin-normalized` STILL GREEN (the lean
  ceiling held), AND the π readback measures a non-zero bridge-neck width across a multi-frame
  sweep of the orbit (no detached-disc frame).

### BA.W-GOO-REDRESS.2 the pointer wake seam

- Goal: the first pointer hover after the demand loop has parked repaints on the same frame
  with no accumulated-delta lurch.
- Mechanism: add `watch(pointer.active, (a) => { if (a) renderer.wake() })` in `GooBlob.vue`
  (mirroring the `color`/`paletteStops` wake at useMetaballRenderer.ts:368-369), consuming the
  EXISTING captured `renderer.wake` handle — no new rAF, no second wake path. The pointer's
  `active.value = true` (useBlobPointer.ts:78) becomes the wake trigger.
- Files: `GooBlob.vue` (the watcher), optionally `useBlobPointer.ts:156-160` (the trail
  rate-limit — scope 4, gated on the wake fix being insufficient).
- Sub-gate: the gate's W2 witness — a `watch` on `pointer.active` (or the pointer-machine
  wake callback) that calls `renderer.wake()`/`canvasHandle.wake()` EXISTS in `GooBlob.vue`
  (source-asserted, not a literal-string match on the prop name — a renamed signal must still
  reach the wake handle on pointer-enter), AND the π readback shows the first
  hover-after-park repaints within one frame (the canvas content-hash changes on the hover
  frame, no multi-frame stall) with the spring following continuously (no single 50ms-clamp
  jump on the post-park frame).

## Hard Gate

`proof:goo-redress` (born-RED at HEAD, driven GREEN by the wave) — two falsifiable SOURCE
witnesses (the comment-strip + pure-detector house pattern, mirroring
`proof-blob-smin-normalized.mjs` / `proof-blob-studio.mjs`), each red at HEAD pre-wave:

1. **W1 — the smin band holds the worst-case bridge.** The `uSmoothK` upload (or the orbit
   envelope atoms) is scaled by the WORST-CASE orbit excursion, not only the nominal:
   POSITIVELY, the band-scale expression references the orbit random worst case (`×1.2` /
   the ecc max) OR the orbit random multiplier is capped/re-centered so the satellite
   near-edge provably stays inside the band. RED at HEAD: `uploadBlobUniforms.ts:214` scales
   `uSmoothK` by `cMem.smoothK * params.smoothK * POS_SCALE` (the nominal band, no
   worst-case term) and `useBlobSatellites.ts:37,116` inflates `baseR` by an uncapped
   `0.8..1.2×`. **Anti-evasion**: the source half asserts the COUPLING (the band scale and
   the orbit worst case are tied), not a magic constant; AND `proof:blob-smin-normalized`
   must stay GREEN (a widening that breaches the lean ceiling fails the existing gate — the
   two gates compose, the new one cannot green by over-inflating past the calm-lean ceiling
   the old one bounds).
2. **W2 — pointer activity wakes the parked loop.** A `watch(pointer.active, …)` (or an
   equivalent pointer-enter callback) that calls the renderer's `wake`/`canvasHandle.wake()`
   handle EXISTS in `GooBlob.vue`. RED at HEAD: `grep -n 'pointer.active' GooBlob.vue`
   returns 0 — no pointer→wake wire; the only wake watchers are `color`/`paletteStops`
   (useMetaballRenderer.ts:368-369). **Anti-evasion**: the source half asserts the wake
   handle is REACHED from a pointer-active signal (not merely that a `watch` exists, and not
   a literal `pointer.active` string — a renamed signal that still drives the wake on
   pointer-enter passes; a `watch` that does NOT call `wake` fails); the π half (W3) is the
   binding behavioural floor.
3. **The π binding readback** (the cardinal-lesson DELTA, captured own-surface at
   `/substrates/blob`, `:5199`, BOTH modes): a live capture with a paired π readback proving
   (a) the bridge neck paints a non-zero width across a multi-frame sweep of the orbit
   envelope — NO frame shows a fully-detached satellite disc (the BA-goo-2 fail state), read
   against the `ground/R8-07-goo-configurator-broken.png` baseline + the
   `fleet/goo-studio-blob-live-dark.png` working-neck frame; (b) the first hover after a
   forced park repaints within one frame (the canvas content-hash changes on the hover
   frame) with the pointer-follow spring advancing continuously (no single clamped 50ms jump
   on the post-park frame). Captured to `docs/tranches/BA/audit/visual/W-GOO-REDRESS-DELTA.md`
   with before/after frames. **The π half is the binding visual truth — if the source half
   passes but the live `/substrates/blob` render still shows a detaching satellite or a
   lurching hover, the wave does NOT close (the source-green/visually-broken gap is exactly
   the P-1 close class BA inv-4 forbids).**
4. **The gestalt verdict (BA inv-4, binding at W-REFLECT2).** Per-mechanism greens (W1-W3)
   alone do NOT close this visual wave. The configurators+goo surface in the
   `proof:ba-gestalt` roster (`docs/tranches/BA/audit/reflect/ba-gestalt-roster.md`) is owed
   a whole-page capture in BOTH modes over its real backdrop + an explicit gestalt verdict —
   AND that goo verdict checks BOTH this wave's renderer half AND W-GLASS-CAL's chip-easing
   half landed (the EXECUTION-DAG §3 reconciliation). This wave records its π DELTA at Batch
   2; the joint goo gestalt verdict flips at W-REFLECT2 once both halves hold. The wave
   closes `complete` at Batch 2 on W1-W3 + its own π DELTA; the gestalt-PASS is the tranche's
   W-REFLECT2 close condition, not this wave's local close.

W1-W2 are the device-free CI half (`proof:goo-redress`); the π readback is the binding
visual truth (a source-green/visually-broken gap is the exact BA failure class). The
gestalt verdict (inv-4) binds at W-REFLECT2. All hold for the clean tranche close.

## Format And Lint Cadence

`npm run typecheck` after the `GooBlob.vue` watcher + the composable edits;
`npm run build` to confirm the SFC + composables compile; `node scripts/proof-goo-redress.mjs`
born-RED before the source edits (proof it fails at HEAD), GREEN at close;
`npm run proof:blob-smin-normalized` after the smin band edit (the lean ceiling held — must
stay GREEN); `npm run proof:gate-script-parity` after the `package.json`/`scripts/gates.mjs`
registration; `git diff --check` before close.

## Verification Artefacts

- `docs/tranches/BA/audit/visual/W-GOO-REDRESS-DELTA.md` — before/after `/substrates/blob`
  frames (the multi-frame orbit sweep showing the bridge holds + the first-hover-after-park
  repaint), the paired π readback (bridge-neck width per frame, the hover-frame content-hash
  delta, the spring-follow continuity), and the chosen smin/orbit direction (i/ii/iii)
  recorded.
- The `proof:goo-redress` JSON artefact (born-RED log + GREEN-at-close log).
- The `proof:blob-smin-normalized` GREEN log post-widening (the lean ceiling evidence).
- The gate-script-parity output post-registration.

## Commit Plan

- impl commit: `fix(goo-blob): satellite bridge holds worst-case orbit + pointer wakes parked loop (BA.W-GOO-REDRESS)` — names the two mechanisms (the smin/orbit envelope coupling + the `watch(pointer.active) → renderer.wake`) in the body.
- gate commit: `test(goo-blob): proof:goo-redress born-RED→GREEN + parity registration`.
- doc/status commit: the CLAUDE.md pointer-wake + worst-case-smin record + the DELTA doc + the PROGRESS row.

## Dependencies

- **Depends on**: W-DARK-MATERIAL (Batch 1) holds its live verdict before this wave's π
  capture (BA inv-5 — no capture over a broken dark register); structurally the goo-studio
  lane confirmed all three defects reproduce IDENTICALLY in light and dark (goo-studio
  cross-cutting note: "None is a dark-register defect"), so the dark-register prerequisite is
  about CAPTURE-OVER-A-FIXED-BACKDROP, not a goo dependency on the dark tokens. The chip-easing
  half of R8-7's "jittery" is **W-GLASS-CAL** (Batch 4): this wave does NOT depend on it to
  land its OWN gate, but the joint goo gestalt verdict at W-REFLECT2 needs both halves
  (declared in §Coordination).
- **Blocks**: W-REFLECT2 (Batch 7) — the configurators+goo gestalt verdict checks this wave's
  renderer half landed (alongside W-CONFIG-CHASSIS's 0px-slider fix + W-GLASS-CAL's chip
  easing). No structural successor wave consumes this wave's seam.

## Archaeology

Prior attempt: the AZ blob band (W-BLOB-STUDIO, W-BLOB-PAGE) tuned the studio bridge to the
NOMINAL orbit (`STUDIO_GEO_BASE` smoothK 0.06, blob.vue:144) and the AX.W16 demand-loop
quiescence wired the color/palette wake (useMetaballRenderer.ts:368-369) — but neither closed
the worst-case orbit excursion (the band rides POS_SCALE, the orbit random ×0.8..1.2 does
not) nor the pointer wake (the pointer machine flips `active` but never reaches the renderer).
The new guardrail: this wave's gate asserts the COUPLING (band-scale ↔ worst-case orbit) and
the pointer→wake WIRE with a π behavioural readback (the bridge holds across the sweep, the
hover repaints same-frame), not the nominal-frame coherence the prior band proved — the
intermittent detach + the intermittent lurch are exactly the "works on a fresh frame, broken
on the next" signature the per-mechanism nominal-frame check missed (the P-1 gap BA inv-4
closes).
