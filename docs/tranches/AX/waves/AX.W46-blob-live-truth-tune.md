# AX.W46 — Blob live-truth tune: floor→band gates + calm-bead lighting/interaction + manual-mood latch

**Band** D · BLOB · **Severity** blocker · **dependsOn** AX.W00 (the π live-runtime
close machinery), AX.W08 (the smin un-flood — the field this re-tunes), AX.W15 (the
contained-droplet geometry + the lighting/interaction blocks this re-opens), AX.W16
(the blob-integration band closer — the quiescence/pause seam this composes with, NOT
re-touches) · **Charter** the AX convergence ledger
(`audit/convergence/CONVERGENCE-PLAN.md` — the W46 NET-NEW row: "blob live-truth tune,
folds D4+D5+D7, discharges the deferred W15/W16 live π") · **Audit**
`audit/convergence/D4.md` (skeuomorphic lighting — the over-bright specular/rim) +
`audit/convergence/D5.md` (hover broken + far too dramatic — the lunging lean) +
`audit/convergence/D7.md` (blob-mood totally broken — the auto-mood clobber) +
`audit/convergence/A-waves-blob.md` (the lane synthesis — D4/D5 share ONE one-sided-floor
pathology; the cardinal-lesson trigger: W15/W16 closed headless-GREEN with an UNMET
`liveVerifyNeeded` clause).

---

## State (born-RED — the gate must fail at HEAD before the wave)

The wave is born-RED on FOUR falsifiable witnesses at HEAD `002bda5`. Each is a
source-true line probe (the magnitudes / gate thresholds / mood-priority chain live and
verified), and the new `proof:blob-live-truth` gate inverts each. The cross-cutting
pathology (A-waves-blob §"Cross-cutting gestalt"): the lighting AND the interaction were
both tuned to clear ONE-SIDED FLOOR gates (`domeLumaStd ≥ 9`, `centroidShift ≥ 0.012`)
with NO upper bound, so "louder" kept passing and the tune drifted loud — and the live
π-lane (the only ceiling) never ran.

- **RED witness 1 (the gate is a one-sided FLOOR — "louder" passes forever; the
  structural root).** `tests-visual/blob-render.spec.ts` asserts the dome-variance and
  centroid-shift as bare FLOORS: `DOME_LUMA_STD_MIN = 9` (`:95`) checked only
  `toBeGreaterThanOrEqual` (`:460-463`), and `CENTROID_SHIFT_MIN = 0.012` (`:104`) checked
  only `toBeGreaterThanOrEqual` (`:506-509`). There is NO ceiling on either — a garish
  dome (`std ~18+`) and a lunging lean (`shift ~0.11`) PASS "better." The
  `proof-blob-render.mjs` driver header even documents the stale intent ("the TIGHT
  droplet band (coverage 0.25–0.6)") while the live spec ships floor-only. **Falsifiable
  RED:** *parse the two assertions — at HEAD each is a single `toBeGreaterThanOrEqual`
  with no paired `toBeLessThanOrEqual` (RED — one-sided ratchet). After the wave each is a
  BAND (`9 ≤ domeLumaStd ≤ ~14`, `0.012 ≤ centroidShift ≤ ~0.06`) — a paired floor-AND-
  ceiling so an over-bright dome or an over-dramatic lean goes RED (GREEN).*

- **RED witness 2 (the lighting cohort is over-bright — the skeuomorphic wet-plastic bead;
  D4).** `BLOB_CONFIG_DEFAULTS` (`types.ts:272-275,262-267`) ships `specStrength: 0.9`,
  `specShininess: 32`, `rimStrength: 0.5`, `iridescence: 0.18`, `sssScale: 0.2`,
  `coreGlow: 0.1`. The shader (`metaball.frag.ts:434-437`) normalizes the Blinn-Phong glint
  energy-conservingly: `energyNorm = (shininess+2)/8 = 4.25` at the flat dome centre, so
  the glint peak is `1.0 × 0.9 × 4.25 ≈ 3.83` — a ~3.8× over-unity additive highlight that
  `clamp(linearToSrgb(lin),0,1)` (`:465`) crushes to pure white over a hard spot. The
  `specStrength: 0.9` was never re-derived against `energyNorm` (it is a raw W9.b-era
  toggle-only value carried unchanged when W15 flipped `lit: true`); five lighting layers
  (spec glint + Fresnel rim + iridescence + fast-SSS + Beer-Lambert core-glow) co-add on a
  ~0.14-uv bead. **Falsifiable RED:** *resolve the worst-case rendered highlight pixel's
  linear value on `BLOB_CONFIG_DEFAULTS` — at HEAD it clamps to white (255,255,255) over a
  tight spot and the resting dome-luma-std runs hot (≈16+), the over-described surface (RED).
  After the wave the worst-case highlight stays sub-unity (a contained warm gleam, never a
  blown hotspot) and the dome-luma-std lands INSIDE the band (a calm wet bead, GREEN).*

- **RED witness 3 (the interaction is far too dramatic — the lunging hover; D5).**
  `BLOB_CONFIG_DEFAULTS` (`types.ts:299-302`) ships `pointerAttraction: 0.35`,
  `pointerStrength: 0.45` (W15-REDRESS bumped `0.11 → 0.45`), `stretch: 0.5`,
  `clickImpulse: 0.5`; the shader falloff (`metaball.frag.ts:322`) is
  `smoothstep(0.65, 0.0, pointerDist)` (W15-REDRESS widened `0.4 → 0.65`). The in-shader UV
  pull is `influence = smoothstep(0.65,0,dist) · uPointerAttraction · uPointerStrength`,
  `uv -= normalize(dir)·influence` (`:319-324`). On a plain hover the mood machine
  auto-promotes to `curious` (`useBlobMood.ts:162`), reaching a peak lean ≈ 1.17× the body
  radius; a click latches `excited` (the 1.70× regime). The squash compounds it:
  `sa = 1.0 + speed · uStretch` (`metaball.frag.ts:206`) against an UNBOUNDED spring
  velocity → `sa ≈ 1.78–2.25×` on a fast flick (a taffy-pull). The W15-REDRESS drove
  `pointerStrength` to clear the `0.012` floor by ≈9× (modeled `0.111` shift) — tuned-to-
  the-gate, never to the eye. **Falsifiable RED:** *drive a synthetic hover-flick on the
  live render and read the painted centroid shift — at HEAD it lurches ≈0.11 width (≈9× the
  floor, the "far too dramatic" lurch; RED). After the wave the shift lands INSIDE the new
  band (a calm bead leaning, `pointerStrength ~0.15–0.22`, falloff back toward `~0.45–0.5`,
  the squash saturated so a flick cannot reach 2.25×; GREEN).*

- **RED witness 4 (blob-mood is totally broken — the auto-mood clobbers manual setMood
  every frame; D7).** `useMetaballRenderer.ts:366-373` calls `mood.update({pointerActive,
  clicked, idleMs})` UNCONDITIONALLY on every non-reduced frame BEFORE `mood.tick(stepMs)`.
  `update` (`useBlobMood.ts:154-169`) with no pointer, no click, `idleMs < IDLE_SLEEP_MS`
  falls through to `else → setMood("idle")`. So one frame (~16ms) after the demo button
  fires `blobRef.setMood(m)` (`blob-mood.vue:32-34` → `GooBlob.vue:160-162` →
  `useBlobMood.setMood`, correctly exposed at `GooBlob.vue:178-180`), `update()` force-
  retargets back to `idle`. The `activeMood` ref highlights the pressed pill
  (`blob-mood.vue:96`) but the render never changes — the UI lies. The auto-mood arc is the
  ONLY mood path that survives because it is the only one `update` drives. The W11.c
  `update` docstring (`useBlobMood.ts:151`) declares it "the single internal caller of
  setMood" — architecturally incompatible with the public `setMood` expose the demo +
  README assume is authoritative. **Falsifiable RED:** *click a mood pill on
  `/substrates/blob-mood` and read a mood-DERIVED rendered delta vs idle — at HEAD every
  mood renders identical (the auto-arc clobbers the manual retarget within one frame; RED).
  After the wave a manual `setMood` arms a latch `update` respects, released only on a
  genuine fresh interaction signal, so the pill drives a VISIBLE param delta (GREEN).*

The wave is RED at HEAD on all four; the HardGate below drives each to GREEN. **CRITICAL
COUPLING:** the EXISTING `proof:blob-render` (W08-authored, W15-retuned, W16-inherited)
currently PASSES over exactly the floor-only/over-bright/over-dramatic state this wave
dismantles — its one-sided floors are the live witness that "louder always passes." The
floor→band conversion is RE-AUTHORED IN THIS WAVE (the bands red the current over-bright /
over-dramatic render), and `proof:blob-mood-resolved` (`scripts/proof-blob-mood-resolved.mjs`
— a STATIC param-resolution check that `setMood` has an internal caller) PASSES over the
broken mood because it never asserts a manual `setMood` PERSISTS. This is the headline
gate-truth-up: the headless gates are green over a visually-broken surface — the literal
cardinal-lesson instance the deferred `liveVerifyNeeded` clause always required.

---

## Goal

The default GooBlob reads as a calm warm-cream membrane — a contained wet bead with ONE
load-bearing rim/glint cue, a gentle hover lean (not a lurch), and a saturated squash
(not a taffy-pull) — and a manual `setMood` is AUTHORITATIVE (the mood pills drive a
visible param delta), all closed against the LIVE real-device render under floor-AND-
ceiling band gates so "louder" can never again pass headless over a skeuomorphic surface.

---

## Scope (the gestalt fix — no patch, no gate-chasing, no parallel mood path)

D4 + D5 share ONE root pathology (A-waves-blob §"Cross-cutting gestalt") — both the
lighting AND the interaction were tuned to satisfy one-sided FLOOR gates with no upper
bound, so the tune drifted loud and the live π-lane (the only ceiling) never ran. D7 is a
separate, clean library precedence fix. These fold into ONE wave — NOT three — because the
floor→band gate conversion is the SHARED structural antidote both D4 and D5 need, and the
re-tunes must be measured against the SAME re-authored band gates + the SAME discharged
live π-lane. The wave re-opens W15's lighting + interaction blocks (which W16 explicitly
never touched) under the band gates, plus the manual-mood latch (which no wave addresses).

1. **Convert the FLOOR gates to BANDS (the structural antidote — RED witness 1).**
   Re-author `blob-render.spec.ts` so the two one-sided ratchets become two-sided taste
   bands: `domeLumaStd` gains a ceiling (`9 ≤ std ≤ ~14` — a lit dome that rolls luma, NOT
   a garish over-bright dome at `~18+`), and `centroidShift` gains a ceiling
   (`0.012 ≤ shift ≤ ~0.06` — a legible lean, NOT a lunge at `~0.11`). The floors stay
   (legibility — a flat fill / invisible lean still reds); the ceilings are the restraint
   axis that makes "more variance / more lean" stop being "more passing." This is the
   structural fix that converts the gate from the one-sided ratchet that REWARDED the
   overshoot into a band — tune the final ceilings LIVE against the calm-bead render (the
   numbers below are the audit-modeled targets; the binding ceilings are set at the live
   audit, see Open Questions).

2. **Re-tune the lighting cohort DOWN to a calm wet bead (D4 — RED witness 2).**
   Re-derive `specStrength` against `energyNorm` (not as a raw weight): target a contained
   warm gleam (linear peak ≈ 0.4–0.6, not 3.8) so `specStrength` drops to ≈ 0.12–0.18, and
   optionally clamp the linear highlight before the OETF so a worst-case normal can never
   blow to white. Soften `specShininess` (32 → ≈ 18–22) for a broader/softer glint lobe
   (wet plastic = tight bright spot; soft glass = wide gentle gradient — congruent with the
   Toksvig fwidth-widen the shader already does). Drop the stacked-layer count to the
   load-bearing two: keep the Fresnel rim (it reads the silhouette) + a whisper of
   core-glow; pull `iridescence` and `sssScale` floors DOWN (≈ half) so the sheen is felt,
   not seen — one perceptual cue, not four. `lit: true` stays (the identity is right; the
   AMOUNT is wrong). The rim already reads `rimColor: "var(--foreground)"` (correct,
   token-first) — the re-tune is pure config-magnitude + the optional shader highlight
   clamp, no new uniform, no consumer break (a consumer wanting the glossier look passes a
   higher `specStrength`).

3. **Re-tune the interaction DOWN to a calm lean (D5 — RED witness 3).** Drop
   `pointerStrength` back toward ≈ 0.15–0.22 (a gentle "the creature notices you" lean at
   ≈ 0.2–0.35× body radius, not the 0.93–1.70× lurch); narrow the falloff back toward
   `smoothstep(0.45–0.5, 0.0, dist)` (the lean stays COHERENT across the creature — the
   falloff is what makes it whole; the drama lives in strength, not falloff). Decouple the
   mood compounding so a hover does not auto-jump into the excited regime — clamp
   `uPointerAttraction` or flatten `useBlobMood.ts:54`'s arousal multiplier so the
   auto-`curious` hover lean stays calm. BOUND the squash velocity so a fast flick cannot
   reach 2.25× elongation: saturate `sa` (`1 + tanh(speed·k)·maxStretch` in
   `metaball.frag.ts:206`) so the taffy-pull is impossible. The spring/trail/squash/mood
   MACHINERY is sound (W16's quiescence/pause integration is untouched) — this is a
   magnitude reconciliation, NO new interaction code.

4. **Generalize `excitedHoldMs` into a manual-mood latch (D7 — RED witness 4).** Give the
   public `setMood` a first-class override layer over the autonomic arc, using the SAME
   priority shape `update` already runs internally (click > pointer > idle) — the manual
   latch sits ABOVE it. In `useBlobMood`, `setMood(mood, { source })` records whether the
   retarget came from `update` (autonomic) or the public expose (manual). A manual
   `setMood` arms a `manualOverride` latch (the generalization of the existing
   `excitedHoldMs` one-shot latch at `:131,157,161,198`); `update` EARLY-RETURNS while the
   latch holds (it does not auto-drive over a user-pinned mood). The latch RELEASES on a
   genuine fresh interaction signal — a click or pointer-over the live canvas — so hovering
   the live blob still hands control back to the autonomic arc (the demo's "auto-drives from
   interaction" blurb stays true). This ALSO fixes the quiescence gate for free: the latch
   is part of the `isSettled()` predicate (`:179-184`), so a pinned non-idle mood keeps
   animating instead of being silently dragged to idle-then-parked. ONE principled
   precedence rule (manual > auto until interrupted), not a flag soup — `setMood` simply
   starts honoring its own contract. NO backwards-compat concern; no migration shim.

### NOT in scope (routed elsewhere — the dedup boundary)

- **The demo `overflow-hidden` clip + the showcase footprint (D5 mechanism B-1).**
  `blob-interaction.vue:57` wraps `<GooBlob>` in `overflow-hidden`, hard-clipping the
  intentional 160% canvas overflow (satellites + meniscus + lean sliced at the card edge —
  the "broken" READ that is NOT the magnitude). This is DEMO IA, routed to **W18 / W40**
  (D6 already re-casts the blob stories through them). W46 writes NO demo-shell layout.
- **The listener-host vs painted-field coordinate mismatch (D5 mechanism B-2).**
  `useBlobPointer(wrapperRef)` (`GooBlob.vue:77`) attaches `pointermove` to the wrapper
  while the field paints over the 160% canvas — a real user hovering the visible outer ring
  gets a premature `pointerleave` snap-home. This is a LIBRARY geometry/coordinate
  reconciliation adjacent to W46's magnitude axis; per D5 it folds most cleanly into THIS
  wave (it is W15's coordinate domain), so it is IN scope as a co-tune IF the live audit
  shows the outer-ring dead-zone (RATIFY — see Open Questions). If deferred, it routes to a
  geometry follow, never silently dropped.
- **The blob-page consolidation (D6 — 3-4 blob stories → one).** CONFLICTS with W18's
  ratified "trio stays" decision; needs-user-decision, routed to **W18**. W46 touches no IA.
- **`glass-material.vue` totally broken (D8).** OUT of the blob lane — an aurora/glass
  surface (the Aurora backdrop rendering black), routed to the **aurora / W20** lane.

---

## SOTA deepening (blob-membrane research)

This is a default-identity + interaction re-derivation, not new mechanism — the
energy-conserving Blinn-Phong, the OKLCh-tinted warm-cream glint, the Fresnel rim, the
fast-SSS, the spring/trail/squash machinery, and the OETF are all in place and CORRECT.
The literature supplies the restraint principles the re-tune lands on:

- **The skeuomorphic tell is too-many-cues-on-one-object [W09 specular principle, applied
  to the WebGL surface].** W09 (specular tune-to-subtle, COMPLETE) settled the CSS
  `--glass-specular-*` cohort to a "warm-cream low-alpha whisper, rim-defines-silhouette,
  one owner" identity. D4 adopts W09's PRINCIPLE (not its code path — disjoint subsystem,
  the CSS box-shadow vs the WebGL shader) on the blob's in-shader highlight: the glint
  should read as a soft catch-light that DEFINES the dome curvature (a normal-driven
  highlight, not a flat bloom), and the load-bearing cue is the rim + one whisper, not the
  five-layer stack. The over-described surface is the textbook skeuomorphic over-shading
  (D4 root cause).

- **Energy-conservation means `specStrength` is NOT "0.9 of something" [the (shininess+2)/8
  factor].** The `energyNorm` factor is CORRECT physics (it decouples shininess from
  strength so the two knobs do not fight — the W15 [9] note). But it means `specStrength`
  must be re-derived as a fraction of the NORMALIZED peak, not a raw weight: `0.9 × 4.25`
  is a 3.8× peak. Re-deriving against `energyNorm` (target sub-unity peak) is the principled
  magnitude fix — not a hand-tuned guess (D4 gestalt fix item 1).

- **A bounded squash saturates; an unbounded velocity strobes [volume-preserving stretch].**
  The squash `sa = 1 + speed·stretch` against an unbounded critically-damped spring velocity
  (O(5–8)/s on a flick) reaches 2.25× elongation — a violent taffy-pull. A `tanh`/sigmoid
  saturation (`1 + tanh(speed·k)·maxStretch`) caps the elongation at a tasteful ceiling so
  the fastest flick reads as a lively squash, never a rubber-band snap (D5 gestalt fix item
  1). This is the standard volume-preserving squash-and-stretch restraint.

- **A one-sided floor gate REWARDS the exact overshoot it is meant to bound [the cardinal
  lesson, operationalized].** A.W-blob §"Cross-cutting gestalt": the single highest-leverage
  fix is to convert the floor assertions to BANDS and discharge the deferred live π-lane.
  The band is the machine-enforced restraint axis — a floor checks "the cue is legible"; the
  paired ceiling checks "the cue is RESTRAINED." Without the ceiling, every retune that
  clears the floor by more passes "better," which is precisely how the lighting AND
  interaction drifted loud (D4 + D5 shared mechanism). The band is the structural antidote.

- **Manual override is a first-class layer ABOVE the autonomic arc, not a competing path
  [affect-model priority].** The `{valence, arousal}` affect model already separates "named
  mood point" from "auto-driving signal." The clean transposition is a `manualOverride`
  latch the auto-arc respects (the generalization of the existing `excitedHoldMs` one-shot),
  released on fresh interaction — ONE precedence rule (manual > auto until interrupted), not
  a parallel mood path or a flag soup. A `setMood` that silently no-ops is a worse API
  contract than an honest override (D7 gestalt fix). The complementary `autoMood?: boolean`
  prop (default `true`) gating the renderer's `mood.update(...)` call is the demo-honest
  escape hatch for a pure discrete-control showcase — flagged RATIFY, the latch is the
  library-correct default.

---

## FileBounds (the EXACT files this wave may touch — for parallel-dispatch disjointness)

| File | Edit |
|------|------|
| `src/components/custom/goo-blob/types.ts` | Re-tune `BLOB_CONFIG_DEFAULTS` lighting cohort DOWN (`:262,265,267,272,273,275` — `specStrength`/`specShininess`/`rimStrength`/`iridescence`/`sssScale`/`coreGlow` to the calm-bead magnitudes) + the interaction cohort DOWN (`:299-302` — `pointerStrength`/`stretch`; `pointerAttraction` per the mood-decouple). Update the inline rationale comment blocks (`:253-302`) to the calm-bead reality (documentation is part of the change). `lit: true` STAYS. |
| `src/components/custom/goo-blob/shaders/metaball.frag.ts` | Narrow the pointer falloff (`:322` — `smoothstep(0.65,…) → smoothstep(0.45–0.5,…)`); SATURATE the squash velocity (`:206` — `sa = 1.0 + speed·uStretch → 1.0 + tanh(speed·k)·uStretch`); OPTIONALLY clamp the linear highlight before the OETF (`:462-465`) so a worst-case normal cannot blow to white. NO geometry/POS_SCALE edit (W08/W15 own the distance regime). |
| `src/components/custom/goo-blob/composables/useBlobMood.ts` | Add the `source: "auto" \| "manual"` param to `setMood` (`:139`); arm a `manualOverride` latch on a manual call (generalize `excitedHoldMs` `:131`); `update` (`:154`) EARLY-RETURNS while the latch holds; RELEASE the latch on a fresh `clicked`/`pointerActive` signal; fold the latch into `isSettled()` (`:179`). Decouple the `pointerAttraction` arousal multiplier (`:54`) if the mood-compound is the hover-lean culprit. |
| `src/components/custom/goo-blob/GooBlob.vue` | Thread `setMood(m)` (`:160-162`) to pass `{ source: "manual" }`; OPTIONALLY add the `autoMood?: boolean` prop gating the renderer's `mood.update(...)` call (the RATIFY escape hatch). The `defineExpose` (`:178-180`) stays — `setMood` now honors its contract. |
| `src/components/custom/goo-blob/composables/useMetaballRenderer.ts` | Pass `{ source: "auto" }` from the renderer's `mood.update(...)` call (`:366-373`) — OR gate the call behind the `autoMood` prop if RATIFIED. NO uniform-upload length edit (W08/W15). |
| `tests-visual/blob-render.spec.ts` | **RE-AUTHOR** the two FLOOR assertions to BANDS: add a `DOME_LUMA_STD_MAX` ceiling paired with `DOME_LUMA_STD_MIN` (`:95,460-463`) and a `CENTROID_SHIFT_MAX` ceiling paired with `CENTROID_SHIFT_MIN` (`:104,506-509`); add the worst-case-highlight-sub-unity (no-blown-white) assertion. The final ceilings are set LIVE against the calm-bead render. |
| `tests-visual/blob-mood-live.spec.ts` | **NEW** — the born-RED π-lane mood-DELTA spec: mount `<GooBlob>` on `/substrates/blob-mood`, click a mood pill, read back a mood-DERIVED rendered param delta (orbit speed / wobble / sheen) vs idle, assert the manual `setMood` PERSISTS (the render visibly changes), assert a fresh pointer/click RELEASES the latch back to the auto-arc. |
| `scripts/proof-blob-live-truth.mjs` | **NEW** — the `proof:blob-live-truth` gate driver: (a) source-parse the band assertions (each `toBeGreaterThanOrEqual` has a paired `toBeLessThanOrEqual` — the floor→band STRUCTURE proof); (b) source-parse the manual-mood latch (`setMood` carries a `source` param + a `manualOverride` latch `update` respects — the priority-inversion-resolved STRUCTURE proof); (c) INVOKE the π-workspace `blob-render.spec.ts` (band) + `blob-mood-live.spec.ts` (mood-delta) fail-CLOSED, parse the JSON report, emit a byte-stable artefact via `gate-output.mjs`. |
| `package.json` | ADD `proof:blob-live-truth` (+ the W00 `proof:gate-script-parity` meta-gate match). |
| `src/components/custom/goo-blob/README.md` | Correct the lighting/interaction default-magnitude prose to the calm-bead reality + the `setMood`-is-authoritative contract (the README's `setMood` expose stops being a documented lie). |
| `docs/tranches/AX/audit/W46-blob-live-truth-tune.json` | **NEW** — the born-RED→GREEN ledger + the paired-π BEFORE/AFTER + DELTA capture + the discharged-W15/W16-`liveVerifyNeeded` record. |

**OUT of bounds:** every length/geometry/POS_SCALE constant (`bodyRadius`/`orbitRadius`/
satellite radii/`smoothK`/the `* POS_SCALE` uploads — **W08 + W15** own the distance regime
atomically; W46 touches NO length); the demo `overflow-hidden` clip + showcase footprint +
the blob-page IA consolidation (**W18 / W40** — D5 mechanism B-1, D6); `glass-material.vue`
+ the Aurora backdrop (**aurora / W20** — D8, out of the blob lane); the
`useMetaballRenderer` god-module CARVE (**W26**); the value.js fork source (**W34**); the
WGSL / `WEBGPU_PARITY` surface (**W07/W14**); the W00 `tests-visual/` harness +
`proof:substrate-paints-color` (**W00** owns the floor; W46 composes it). The
listener-host/canvas coordinate mismatch (D5 B-2) is IN scope ONLY if the live audit shows
the outer-ring dead-zone (RATIFY); otherwise routed to a geometry follow.

---

## Disjointness (sibling waves it must NOT overlap)

W46 is the convergence DISCHARGE of the W15/W16 deferred live π — it re-opens the exact
blocks W16 declared out-of-scope, so the dispatch contract keeps it disjoint from the
landed blob band:

- **vs W15 (blob contained droplet — `complete`).** W15 OWNS `BLOB_CONFIG_DEFAULTS`
  lighting + interaction magnitudes (its FileBounds) AND the geometry constants. W46 is the
  REDRESS of W15's inherited-magnitude miss — the lighting cohort + interaction cohort it
  re-tunes are EXACTLY W15's declared FileBounds (`types.ts` lighting/interaction blocks +
  `metaball.frag.ts:322` falloff). W46 does NOT touch the GEOMETRY constants (body/orbit/
  satellite radii / `smoothK`) — those are W15's atomic distance regime, untouched. Because
  W15 is `complete`, W46 is the ratified re-open (the same class as the W15-REDRESS already
  on record — `liveVerifyNeeded` was always the unmet close criterion). Sequential by
  dependsOn — W15's contained-droplet geometry is the settled field W46 re-tunes the LOOK on.

- **vs W16 (blob integration — `complete`) — the SHARED-FILE dedup, restated from the
  finding.** W16 touched `useBlobMood.ts` + `useMetaballRenderer.ts` + `blob-mood.vue` — but
  on DISJOINT axes: the WebGL-context-count re-cast (multi-mount → WatercolorDot), the
  `v-model:paused` seam, the quiescence/wake scheduler (`isSettled`/`nextAutoMoodMs`), and
  surfacing `transitioning` read-only. W16's "auto-mood hazard" (its plan §204) is the
  SCHEDULED-not-polled WAKE HORIZON (a parked loop must re-arm for the idle→sleepy arc) — a
  DIFFERENT concern from D7's explicit-`setMood` CLOBBER. W16's FileBounds + §NOT-in-scope
  EXPLICITLY route "every interaction-magnitude constant to W15" and state "it does NOT
  re-balance interaction magnitudes" (W16 plan `:278-280`) — so W16 owns NEITHER the
  lighting/interaction magnitudes (D4/D5) NOR the manual-mood priority (D7). **W16 as
  planned does NOT fix any of D4/D5/D7.** W46 shares the three files (`useBlobMood.ts`,
  `useMetaballRenderer.ts`, `types.ts`) with W16 but on line-disjoint axes: W16's
  `isSettled`/`quality`/`paused`/concrete-string seams vs W46's `source`-param latch +
  magnitude re-tune. Sequential (W46 dependsOn W16) — no concurrent collision; W46 COMPOSES
  W16's latch into the `isSettled` predicate W16 authored, never re-touches the quiescence
  seam itself.

- **vs W08 (blob smin un-flood — `complete`).** W08 un-floods the SDF + authored
  `proof:blob-render` / `blob-render.spec.ts`. W46 RE-AUTHORS the spec's two FLOOR
  assertions to BANDS — the gate W08 authored + W15 retuned is the one W46 truths-up. W46
  touches NO smin/geometry constant (W08's domain). File-shared on the spec only; the band
  conversion is additive to W08's un-flood assertions (coverage/gradient/four-side stay
  floors — the un-flood is correct; only the dome-variance + centroid-shift gain ceilings).

- **vs W09 (specular tune-to-subtle — `complete`).** W09 is the CSS `--glass-specular-*`
  cohort (Card/Dock chrome, DOM box-shadow). W46 is the blob's in-shader Blinn-Phong/
  Fresnel/SSS (the WebGL shader). DISJOINT subsystem — W46 adopts W09's PRINCIPLE (D4
  cross-ref), never its code path. No shared file. (D11 is the W09-regression specular
  defect — a SEPARATE convergence re-open, not D4.)

- **vs W18 / W40 (storybook IA / demo-shell — `planned`).** W18/W40 own the demo
  `overflow-hidden` clip + the blob-page footprint/consolidation (D5 mechanism B-1, D6).
  W46 writes NO demo-shell layout — it touches only the LIBRARY magnitudes/latch + the π
  specs. File-disjoint (W18/W40: `demo/stories/substrates/*.vue` IA; W46: library source +
  `tests-visual/`).

- **vs W34 (cross-repo consumer adoption).** W46's magnitude re-tune is a default-identity
  change a consumer overriding `specStrength`/`pointerStrength` is insulated from (the
  defaults move; an explicit prop wins). No constellation forcing-function census is
  required (no token deletion — the blob config is a JS default, not a CSS token a consumer
  reads via `var()`). W46 writes NO sibling source.

---

## Triumvirate (implement / adversarially-verify / gate-author split)

- **Implement (≤2 agents — the magnitude/shader re-tune + the mood-latch fold).** Agent 1
  lands the lighting cohort re-tune (`types.ts` `specStrength`/`specShininess`/`rimStrength`/
  `iridescence`/`sssScale`/`coreGlow` DOWN + the optional shader highlight clamp), the
  interaction re-tune (`pointerStrength`/falloff/squash-saturation DOWN), and the inline
  rationale-comment correction. Agent 2 lands the manual-mood latch (`useBlobMood.setMood`
  `source` param + `manualOverride` + `update` early-return + `isSettled` fold + the
  `GooBlob.vue`/`useMetaballRenderer.ts` source threading) + the optional `autoMood` prop.
  Both lint + typecheck at every interval; coordinate on the shared `useBlobMood.ts` (the
  arousal-decouple `:54` vs the latch `:139,154,179` are line-disjoint) and `types.ts` (the
  lighting/interaction blocks vs no type-shape change). Correct the README to the painted
  reality.
- **Adversarially-verify (≤1 read-only lane).** Re-runs the four RED witnesses against the
  patched tree: parses the band assertions (each floor has a paired ceiling); resolves the
  worst-case highlight pixel (asserts sub-unity, never blown-white); drives a synthetic
  hover-flick on the LIVE render (asserts the centroid shift lands INSIDE the band, not the
  ≈0.11 lurch); clicks a mood pill on the live `/substrates/blob-mood` (asserts a visible
  mood-DERIVED param delta — the manual `setMood` PERSISTS). ADVERSARIAL twist: tries to make
  the band gate PASS with the OLD over-bright dome (`std ~18`) / over-dramatic lean
  (`shift ~0.11`) still present (confirms the ceilings RED the legacy state); tries a manual
  `setMood` followed by an idle frame and confirms the mood PERSISTS (not clobbered);
  confirms a fresh pointer-over RELEASES the latch back to the auto-arc. Drives the
  VISUAL-TRUTH live audit (the binding close — see HardGate). Confirms NO geometry/length
  constant moved (the W08/W15 guard).
- **Gate-author (≤1 agent).** RE-AUTHORS `blob-render.spec.ts` (the floor→band conversion +
  the no-blown-white assertion — born-RED on the current over-bright/over-dramatic render);
  authors the NEW `blob-mood-live.spec.ts` (the mood-DELTA persistence assertion — born-RED
  on the current clobber); authors the NEW `proof-blob-live-truth.mjs` driver (the
  source-parse band-structure + latch-structure arms + the fail-CLOSED π invocation);
  confirms ALL FAIL at HEAD `002bda5` (floor-only gates + over-bright magnitudes + the mood
  clobber present) and PASS on the patched tree. Registers `proof:blob-live-truth` in
  `package.json` + the W00 meta-gate parity match.

(All within the AX ≤6-implementation / ≤7-read-only ceiling — this wave's actual count is 4.)

**Autonomous-resilience clause + triumvirate auto-triggers (per WAVE_SPEC §3a; AX REQUIREMENTS §22.4b — mandatory):** the wave-agnostic authorization grant is AX.md §6.1 (the canonical clause — work AROUND a roadblock with an idiomatic gestalt fix, never stall; §6.2 is the 4-class halt-vs-work-around decision tree) — read it by reference, it is not restated here. The wave-SPECIFIC §3a auto-triggers (authored from this wave's FileBounds + HardGate):

- **Scope-reveal → halt + triumvirate (Class 2; NEVER absorb in-line):** any need to touch the OUT-of-bounds surfaces — the GEOMETRY/length/POS_SCALE regime (`bodyRadius`/`orbitRadius`/satellite radii/`smoothK`/the `* POS_SCALE` uploads — W08/W15 own the distance regime atomically; W46 touches NO length, only the lighting/interaction MAGNITUDES + the falloff/squash shape), the demo `overflow-hidden` clip / blob-page IA (W18/W40), `glass-material.vue` / the Aurora backdrop (aurora/W20), the `useMetaballRenderer` god-module carve (W26), the value.js fork (W34), the WGSL/`WEBGPU_PARITY` surface (W07/W14).
- **Non-local hard-gate failure → triumvirate (Class 2):** if `proof:blob-live-truth` REDs non-locally — the band-structure source-parse (each floor paired with a ceiling), the latch-structure source-parse (`setMood` source-param + `manualOverride` + `update` early-return), or the fail-CLOSED π invocation (the band render or the mood-delta readback) — escalate the gate design, do NOT make a gate pass over a residual over-bright/over-dramatic/clobbered state.
- **3rd diagnostic-loop iteration → triumvirate (Class 2):** if the re-tuned lighting does NOT read as a calm wet bead (the glint still blows to white, the surface still over-described) after three magnitude iterations, OR the re-tuned interaction still lurches / the squash still taffy-pulls after three retunes, OR the manual `setMood` still does not persist after three latch iterations — dispatch research→plan→redress rather than re-tuning constants ad hoc.
- **§5.3 ratify reached un-ratified → HALT-and-ratify (Class 3):** the band CEILINGS (the `domeLumaStd`/`centroidShift` max values — tuned LIVE against the calm-bead render, not pre-committed), the manual-latch RELEASE semantics (which interaction signals release the latch), the `autoMood` prop (ship the escape hatch vs latch-only), and the listener-host/canvas coordinate co-tune (in-scope vs deferred to a geometry follow) are ratify-before-impl decisions — if reached un-ratified, surface to the orchestrator (take the recorded default + run the live-audit cadence step), do NOT self-ratify.

---

## HardGate (born-RED→GREEN + the MANDATORY VISUAL-TRUTH live audit)

**Headless / runtime gates — born-RED→GREEN.** ONE composite gate (`proof:blob-live-truth`)
with three arms, plus the two re-authored/new π specs it invokes:

- **`proof:blob-live-truth` arm A — the floor→band STRUCTURE proof (born-RED).** Source-parse
  `blob-render.spec.ts`: the `domeLumaStd` and `centroidShift` assertions each carry a paired
  `toBeLessThanOrEqual` ceiling (not a bare `toBeGreaterThanOrEqual` floor); the
  worst-case-highlight assertion is present. **Born-RED at HEAD** (the two assertions are
  floor-only at `:460-463,506-509`; no ceiling). This is a source-structure proof (the spec
  text is the artefact — the precept-valid form per SPEC.md §Hard Gates).

- **`proof:blob-live-truth` arm B — the manual-mood-latch STRUCTURE proof (born-RED).**
  Source-parse `useBlobMood.ts`: `setMood` carries a `source` discriminant; a `manualOverride`
  latch exists; `update` early-returns while the latch holds; the latch is in the `isSettled`
  predicate. **Born-RED at HEAD** (`setMood` has no `source` param; `update` unconditionally
  drives — the priority inversion). Source-structure proof.

- **`proof:blob-live-truth` arm C — the fail-CLOSED π readback (born-RED).** INVOKES the
  π-workspace `blob-render.spec.ts` (the BAND render — domeLumaStd INSIDE `9..~14`,
  centroidShift INSIDE `0.012..~0.06`, worst-case highlight sub-unity) AND
  `blob-mood-live.spec.ts` (the mood-DELTA — a manual `setMood` paints a measurable param
  delta vs idle that PERSISTS across an idle frame; a fresh pointer RELEASES the latch). Rides
  the W00 fail-CLOSED contract (workspace PRESENT + render over-bright/over-dramatic/clobbered
  → exit 1; befitting-silent SKIP only on genuine device-absence). **Born-RED at HEAD** (the
  band render reds the over-bright dome / lurching lean; the mood readback reds the clobber).
  A RUNTIME-OBSERVATION artefact (a real device render + per-pixel + mood-param readback) — the
  RUNTIME behaviour proven by the π-lane, NOT a text gate.

These are **source-parse + runtime-statistical** gates (the precept-valid artefact forms per
SPEC.md §Hard Gates). The band-pairing + the latch-structure are STRUCTURE proofs (the spec /
composable text is the artefact); the RUNTIME behaviour (the painted calm bead, the persisting
mood) is proven by the VISUAL-TRUTH π-lane readback below, NOT a text gate.

**VISUAL-TRUTH live audit (NON-NEGOTIABLE per AX.W00 — the wave's close criterion; the
discharge of the W15/W16 deferred `liveVerifyNeeded` clause both their JSONs recorded UNMET).**
A live Playwright + frontend-design pass in the π workspace, rendering the real WebGL2
`<GooBlob>` on `BLOB_CONFIG_DEFAULTS` at ≥ 2 viewports in light AND dark:

- **The default blob reads as a calm warm-cream bead, NOT a glossy wet-plastic droplet** —
  the specular glint is a soft contained catch-light defining the dome curvature (never a
  blown pure-white spot), the load-bearing cue is the rim + a whisper, NOT a five-layer
  over-described surface. Side-by-side BEFORE (the over-bright skeuomorphic bead) / AFTER (the
  calm membrane). The dome-luma-std lands INSIDE the band (a lit dome that rolls luma, not a
  garish over-bright one).
- **The hover lean reads as a gentle lean, NOT a lurch** — a synthetic hover-flick pulls the
  bead a fraction of its body radius toward the cursor (the creature notices you), NOT the
  body lunging a full body-width. The squash on a fast flick is a lively bounce, NOT a taffy
  pull. The centroid shift lands INSIDE the band (legible but restrained).
- **The mood pills drive a VISIBLE param delta** — on `/substrates/blob-mood`, clicking each
  mood (idle/happy/curious/sleepy/excited) visibly changes the render (orbit speed, wobble,
  sheen), the manual `setMood` PERSISTS (it is not clobbered back to idle within a frame), and
  a fresh hover/click over the live blob hands control back to the auto-arc. The README's
  `setMood` expose stops being a documented lie.
- **Affordance / hierarchy / NO visual occlusion / no regression on the contained geometry**
  per the AX cardinal gate (W08/W15's contained footprint is untouched — W46 changes only the
  LOOK + the interaction magnitude + the mood priority, never the geometry).

**The wave does NOT close on the headless gates alone** — the executed live audit (captured as
a paired-π BEFORE/AFTER + DELTA artefact under `docs/tranches/AX/audit/`, per the W00 protocol)
is the binding close criterion. The BEFORE capture pins the HEAD over-bright/over-dramatic/
clobbered render the calm-bead re-tune + the persisting mood must visibly beat.

---

## Cadence (sub-step order)

1. **Live re-diagnosis ritual (W00 wave-open).** Re-confirm the four RED witnesses against
   HEAD `002bda5` on the live demo: the floor-only gate assertions, the over-bright lighting
   cohort (the blown-white glint), the lunging hover lean (the ≈0.11 centroid shift), the
   mood clobber (every pill renders identical). Capture the BEFORE π render (the wet-plastic
   bead, the lurch, the dead moods) as the born-RED baseline in
   `audit/W46-blob-live-truth-tune.json`. Do NOT proceed on the audit's word — re-prove.
2. **RE-AUTHOR the band gate + author the mood-delta spec + the driver born-RED.** Convert
   `blob-render.spec.ts`'s two FLOOR assertions to BANDS (paired ceilings) + add the
   no-blown-white assertion; author `blob-mood-live.spec.ts` (the mood-DELTA persistence
   readback); author `proof-blob-live-truth.mjs` (the three arms); register
   `proof:blob-live-truth` in `package.json` + the W00 meta-gate; confirm ALL FAIL at HEAD.
3. **Re-tune the lighting cohort DOWN.** `types.ts` `specStrength`/`specShininess`/
   `rimStrength`/`iridescence`/`sssScale`/`coreGlow` to the calm-bead magnitudes; the optional
   shader highlight clamp before the OETF; correct the inline rationale comments. Lint +
   typecheck.
4. **Re-tune the interaction DOWN.** `types.ts` `pointerStrength`/`stretch`; the
   `metaball.frag.ts:322` falloff narrow; the `:206` squash saturation; the
   `useBlobMood.ts:54` arousal-decouple. Lint + typecheck.
5. **Generalize the manual-mood latch.** `useBlobMood.setMood` `source` param +
   `manualOverride` latch + `update` early-return + the `isSettled` fold; thread
   `{ source: "manual" }` from `GooBlob.vue` and `{ source: "auto" }` from
   `useMetaballRenderer.ts`; the optional `autoMood` prop per the RATIFY. Lint + typecheck.
6. **Correct the README.** The calm-bead lighting/interaction default-magnitude prose + the
   `setMood`-is-authoritative contract.
7. **Gates GREEN + VISUAL-TRUTH.** Set the band CEILINGS LIVE against the calm-bead render;
   confirm `proof:blob-live-truth` passes; run the VISUAL-TRUTH live π audit (the calm bead +
   the gentle lean + the persisting moods, light/dark, ≥ 2 viewports); capture the paired-π
   BEFORE/AFTER + DELTA; write `audit/W46-blob-live-truth-tune.json` to GREEN (recording the
   discharged W15/W16 `liveVerifyNeeded`).

---

## Artefacts (the audit json + evidence it emits)

- `docs/tranches/AX/audit/W46-blob-live-truth-tune.json` — the born-RED→GREEN ledger: the four
  RED witnesses (the floor-only gates, the over-bright lighting cohort, the lunging lean, the
  mood clobber), the per-finding (D4/D5/D7) disposition, the W08/W15-geometry-untouched
  confirmation, the discharged-W15/W16-`liveVerifyNeeded` record, and the post-wave GREEN
  band-thresholds + π-readback measurements (the live-set ceilings).
- `tests-visual/blob-render.spec.ts` — the RE-AUTHORED band spec (the two FLOOR→BAND
  conversions + the no-blown-white assertion).
- `tests-visual/blob-mood-live.spec.ts` — the NEW mood-DELTA persistence spec.
- `scripts/proof-blob-live-truth.mjs` — the NEW gate driver (band-structure + latch-structure
  source-parse arms + the fail-CLOSED π invocation).
- The paired-π **BEFORE/AFTER + DELTA** capture (the W00 protocol): π-lane readbacks of
  `BLOB_CONFIG_DEFAULTS` BEFORE (the over-bright wet-plastic bead; the ≈0.11 lurch; the dead
  moods) vs AFTER (the calm warm-cream bead; the gentle lean; the persisting mood deltas), at
  ≥ 2 viewports × light/dark, with the dome-luma-std + centroid-shift band measurements and
  the per-mood rendered-param delta.

---

## CommitPlan (conventional-commit messages, one per sub-step)

1. `test(blob): re-author blob-render FLOOR assertions → BANDS + no-blown-white + new blob-mood-live mood-delta spec born-RED (AX.W46 D4/D5/D7)`
2. `fix(blob): re-tune the lighting cohort DOWN to a calm warm-cream bead — specStrength/specShininess/iridescence/sssScale/coreGlow + optional highlight clamp (AX.W46 D4)`
3. `fix(blob): re-tune the interaction DOWN to a gentle lean — pointerStrength/falloff + saturated squash velocity + mood-compound decouple (AX.W46 D5)`
4. `feat(blob): manual-mood latch — generalize excitedHoldMs so an imperative setMood survives the auto-mood arc (AX.W46 D7)`
5. `docs(blob): README to painted reality — calm-bead defaults + setMood-is-authoritative contract (AX.W46)`
6. `chore(AX.W46): audit ledger GREEN + live-set band ceilings + paired-π BEFORE/AFTER + DELTA + discharged W15/W16 liveVerifyNeeded`

(One conventional-commit per sub-step; the orchestrator owns the index — agents NEVER stage/
commit/stash per the hardened agent git clause. These are the messages the orchestrator authors.)

---

## Dependencies (dependsOn from the charter + why)

- **AX.W00 (π visual-runtime lane) — the close machinery.** The band gates + the mood-delta
  readback ride the W00 fail-CLOSED π lane, and the calm-bead + persisting-mood VISUAL-TRUTH
  audit is the binding close criterion (the discharge of the W15/W16 `liveVerifyNeeded` clause
  W00 exists to close). W46 cannot close on a headless gate alone; W00 stands up the lane it
  closes on.
- **AX.W08 (blob smin un-flood) — the field.** W08 un-floods the SDF + authored
  `blob-render.spec.ts`. W46 RE-AUTHORS that spec's two FLOOR assertions to BANDS (the gate W08
  authored is the one W46 truths-up); W46 touches no smin constant. Sequential — the un-flooded
  field is the surface W46 re-tunes the LOOK on.
- **AX.W15 (blob contained droplet) — the magnitudes this re-opens.** W15 OWNS the lighting +
  interaction magnitudes (its FileBounds) + the geometry. W46 is the ratified REDRESS of W15's
  inherited-magnitude overshoot (the `liveVerifyNeeded` close W15 recorded but never ran). W46
  re-tunes ONLY the lighting/interaction blocks (W15's declared FileBounds), never the geometry
  (W15's atomic distance regime). Sequential — W15's contained geometry is the settled field.
- **AX.W16 (blob integration) — the quiescence seam it composes with.** W16 authored
  `isSettled`/`nextAutoMoodMs` + the `paused`/`quality` seams on DISJOINT axes from D4/D5/D7
  (W16 touches NO magnitude + does NOT address the manual-mood priority). W46 COMPOSES the
  manual-latch INTO W16's `isSettled` predicate (a pinned mood keeps the loop alive), never
  re-touches the quiescence scheduler. Sequential — W16's integration is the settled
  pause/wake machinery W46's latch participates in.
- **Downstream:** **W18 / W40** receive the demo `overflow-hidden` clip + blob-page IA (D5
  mechanism B-1, D6 — the "broken" READ half, distinct from W46's magnitude half). The
  listener-host/canvas coordinate co-tune (D5 B-2) is IN W46 if the live audit shows the
  outer-ring dead-zone, else routed to a geometry follow.

---

## PreceptAlignment (the SPECIFIC precepts this wave is pursuant to + must not violate)

- **one-path / no-legacy-code.** The manual `setMood` and the auto-mood arc are reconciled
  onto ONE precedence rule (manual > auto until interrupted) — NOT a parallel mood path, NOT a
  flag soup. `setMood` simply starts honoring its own contract; no migration shim, no
  backwards-compat alias (the MEMORY no-backwards-compat: clean break). The lighting/
  interaction re-tune is a default-identity re-derivation, not a fallback branch.
- **token-first.** The rim already reads `rimColor: "var(--foreground)"` (correct — untouched);
  the re-tune is pure config-MAGNITUDE + the optional shader highlight clamp, no new uniform,
  no hardcoded color. A consumer wanting the glossier look passes a higher `specStrength` (the
  config seam, not a library edit).
- **no-overfitting (substrate-without-consumer-binary).** The manual-mood latch generalizes the
  EXISTING `excitedHoldMs` mechanism (not a new knob) and makes the SHIPPED `setMood` expose +
  the `blob-mood` demo's entire raison d'être (the mood-pill row) actually work — it strikes a
  documented-lie, not adds speculative surface. The `autoMood` prop is the demo-honest escape
  hatch (≥1 consumer — the discrete-control showcase) flagged RATIFY, never added speculatively.
- **gates-close-on-evidence / π visual-runtime lane (SPEC.md §Hard Gates; the cardinal AX
  precept).** The band-pairing + the latch-structure are source-structure proofs (the spec /
  composable text is the artefact — the precept-valid form); the RUNTIME behaviour (the calm
  bead, the gentle lean, the persisting mood) is proven by the VISUAL-TRUTH π-lane readback,
  NEVER a green text gate. The wave closes on the executed live audit — the discharge of the
  W15/W16 `liveVerifyNeeded` clause their headless-GREEN closes never ran. This wave is the
  LITERAL cardinal-lesson instance: the headless gates were green (floor-only) over a
  visually-broken surface; the floor→band + the live π is the structural antidote.
- **fail-explicit on library-internal violations.** A `setMood` that silently no-ops is a
  library-internal contract violation (the code contradicts the README + the demo); the manual
  latch makes the painted reality TRUE to the doc. A one-sided floor gate that rewards the
  overshoot it should bound is a gate-design violation; the band fails LOUD on an over-bright /
  over-dramatic render. (No browser-API degradation path — the PRM freeze the substrate owns is
  untouched.)
- **binding-verification (glass-ui MEMORY — stale bindings silently no-op).** The clobbered
  `setMood` is exactly the binding-verification class: a correctly-wired, correctly-exposed
  imperative call that silently no-ops at runtime (vue-tsc + units miss it; only the live
  mood-DELTA π readback catches it). The `blob-mood-live.spec.ts` mood-delta assertion is the
  binding-verification sweep this class demands.

---

## Archaeology (the git commits / prior-tranche lineage the audit cited)

- **`29dd5f38`** (W9.b era, 2026-06-07) — the ORIGIN of the over-bright lighting magnitudes
  (`specStrength`/`specShininess`/`rimPower`/`rimStrength`/`lightDir`/`rimColor`), authored when
  `lit` defaulted OFF — demo-toggle-only values never validated as a default identity (D4 root).
- **W15 (`9d0ec2f7`)** — flipped `lit: false → true` (`types.ts:269`) and set the
  iridescence/SSS/coreGlow FLOORS, but CARRIED the W9.b specular/rim magnitudes UNCHANGED — the
  "tasteful low floors" promise was applied to iridescence/SSS/coreGlow but NEVER to the
  specular/rim pair, the brightest contributors (D4 incompleteness).
- **W15 REDRESS (`d472292`)** — bumped `pointerStrength 0.11 → 0.45` + the falloff `0.4 → 0.65`
  (`types.ts:299-302`, `metaball.frag.ts:322`) to clear the synthetic `centroidShift ≥ 0.012`
  gate floor by ≈9× (modeled `0.111` shift) — tuned-to-the-gate, never to the eye (D5 root; the
  REDRESS reasoning explicitly "could NOT run a real browser… modeled body-integrated centroid
  shift ≈0.078–0.111 width").
- **W11.c (`useBlobMood.ts:151` docstring)** — authored `update` as "the single internal caller
  of setMood," the design intent that auto-mood is the ONLY mood driver — architecturally
  incompatible with the public `setMood` expose the demo + README assume is authoritative (D7
  root, the priority inversion).
- **W16 (`91fc2e0`)** — added `isSettled`/`nextAutoMoodMs` + the `paused`/`quality` seams on
  DISJOINT axes; its "auto-mood hazard" is the scheduled-not-polled wake horizon, NOT the
  explicit-`setMood` clobber — W16 as planned does NOT fix D7 (the dedup the finding proved).
- **Both `W15-blob-contained-droplet.json` + `W16-blob-integration.json`** — stamped
  headless-`GREEN` with an UNMET `liveVerifyNeeded` clause ("the orchestrator MUST run the
  π-lane on the real Metal GPU"). The live π-lane was the close criterion and was NOT
  discharged — D4/D5/D7 are exactly the headless-green/visually-broken class their audits
  warned about. W46 IS that discharge.
- **HEAD `002bda5`** (the convergence baseline) — the floor-only gates, the over-bright lighting
  cohort, the lunging lean, and the mood clobber are all live-proven here.

---

## Open questions / RATIFY-BEFORE-IMPL

1. **The band CEILINGS — tune LIVE, not pre-committed.** The audit-modeled targets are
   `domeLumaStd ≤ ~14` and `centroidShift ≤ ~0.06`, but the exact ceilings are visual taste
   knobs. **RECOMMENDATION: set the ceilings LIVE against the calm-bead render** in the π audit
   (just above the calm-bead's measured value so a future over-bright/over-dramatic retune reds,
   never below it). RATIFY the final ceilings against the live audit, not a pre-committed number.
   **RATIFY-BEFORE-IMPL** (the gate is born-RED on the floor→band STRUCTURE; the ceiling VALUE is
   set at the live audit).
2. **The lighting magnitude triple — tune LIVE.** The audit targets `specStrength ≈ 0.12–0.18`,
   `specShininess ≈ 18–22`, iridescence/sssScale ≈ half, but the exact calm-bead magnitudes are
   visual knobs. **RECOMMENDATION: tune live against the warm-cream-bead reference** — the
   binding target is the worst-case highlight sub-unity (never blown-white) + the dome-luma-std
   INSIDE the band. RATIFY the final triple against the live audit.
3. **The manual-latch RELEASE semantics — RATIFY.** A manual `setMood` latch releases on a fresh
   interaction signal — but WHICH (a click only, a pointer-over only, or either)?
   **RECOMMENDATION: either a fresh `clicked` OR a fresh `pointerActive` over the live canvas
   releases the latch** (so hovering the live blob hands control back to the auto-arc, the demo's
   "auto-drives from interaction" blurb stays true). RATIFY whether a bare pointer-over should
   release (it might steal a deliberately-pinned mood on an accidental hover) or only a click.
   **RATIFY-BEFORE-IMPL.**
4. **The `autoMood?: boolean` prop — ship the escape hatch vs latch-only.** The latch is the
   library-correct default (a `setMood` that silently no-ops is a worse API). The complementary
   `autoMood` prop (default `true`) gating the renderer's `mood.update(...)` is the demo-honest
   seam for a pure discrete-control showcase (the mood demo IS a discrete demonstration, not an
   ambient creature). **RECOMMENDATION: ship the latch as the default; add `autoMood` as the
   escape hatch** IF the latch-release proves fiddly in the live audit (the prop is complementary,
   NOT a substitute). **RATIFY-BEFORE-IMPL.**
5. **The listener-host/canvas coordinate co-tune (D5 B-2) — IN scope vs deferred.** The pointer
   listener on the wrapper while the field paints over the 160% canvas gives a premature
   `pointerleave` snap-home on the visible outer ring. Per D5 it folds most cleanly into W46 (it
   is W15's coordinate domain). **RECOMMENDATION: co-tune it HERE IF the live audit shows the
   outer-ring dead-zone** (attach the listener to the canvas, OR normalize the wrapper-pointer by
   the 1/1.6 factor); if the calm-bead re-tune alone resolves the "broken" read, route the
   coordinate reconciliation to a geometry follow (never silently dropped). **RATIFY at the live
   audit.**
