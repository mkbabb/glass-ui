# GooDotMatrix — greenfield · LENS-B (CROSS-ENGINE / PERF-FIRST)

> Lens: design for FLAWLESS Chrome AND Safari + performance — the meatball/liquid
> motion must be PERFECT on WebKit; KISS, GPU-only-where-it-is-a-viz, offscreen-park.
> LIVE-inspected `/substrates/goo-dot` on `localhost:5173` (Chrome WebGPU primary,
> light default + near-dark reference preset, 2026-06-24) + source-read the whole
> engine (`GooDotMatrix.vue`, `goo-dot.wgsl.ts`, `goo-dot.frag.ts`,
> `useGooDotMatrix.ts`, `constants.ts`, the spliced goo-blob `metaball.wgsl.ts`
> `sceneDistG`). **Tranche-dev only. A UNION with the landed BC.W-VIZ-HYBRID engine —
> no re-fork, no parallel viz.**

---

## 0. The live witness — what the eye actually sees

Two screenshots, ONE engine, the whole verdict:

- **Light default (warm-cream over flat cream):** a TINY (~20% of the card), DIM,
  near-invisible cluster of cream dots floating dead-center. The metaball density
  falloff IS present (you can read the dense core → sparse rim), but warm-cream
  dots (`L 0.92 C 0.03 h 78`) over the page's flat cream (`--card` ≈ `L 0.96`) have
  almost zero luminance contrast. This is the §3 finding made flesh: **a viz over
  flat cream reads dull** — here it reads nearly ABSENT.
- **Near-dark reference preset (mono-warm-white over warm near-black):** the dot
  metaball reads BEAUTIFULLY — a bright dense core, a clean falloff, and you can
  watch a satellite neck-bridge into the body as a thickening band of dots. **This
  is the only legible look the component currently ships.**

**The diagnosis is unambiguous: the ENGINE is fit (real smin-merged metaball field,
analytic gradients, true neck-bridges drawn as dots, WGSL/GLSL twin parity, the
shared substrate park/PRM all present and correct). What is BROKEN is the DEFAULT
PRESENTATION — palette + ground + scale + size.** This is a calibration-and-ground
rebuild, NOT a math rebuild. Survival of the fittest: keep the field, REFINE the
ground, RE-INVENT nothing in the shader's distance function.

### What I VERIFIED exists (grep-confirmed — no invented levers)

| Mechanism | Location | Confirmed |
|---|---|---|
| `sceneDistG(uv) → vec3(d, ∂x, ∂y)` real smin metaball | `metaball.wgsl.ts:159` | ✅ analytic-gradient field, spliced byte-untouched |
| `sminG` → `sminQuadraticG`/`sminCircularG` (the NECK) | `metaball.wgsl.ts:119–143` | ✅ the merge math the dots draw |
| satellites smin-merged + pointer-trail pseudopod | `metaball.wgsl.ts:204–222` | ✅ the bridges the dots thicken across |
| `breath(uPulsePhase)` body pulse | `metaball.wgsl.ts` (`bodyR = …+breath()*uPulseAmp`) | ✅ |
| velocity squash-stretch (vol-preserving tanh) | `metaball.wgsl.ts:175–187` (`uStretch`,`uVelocity`) | ✅ morph-more-on-move IS wired in the FIELD |
| dot-stamp `fCell = clamp(-scene.x/bodyR,0,1)` → size+bright | `goo-dot.wgsl.ts:124–151` | ✅ tixy-on-SDF, the hybrid's one idea |
| dot-cursor influence (swell/brighten/sampleUv shift) | `goo-dot.wgsl.ts:118–132` + `dotPush` | ✅ §T7 local influence |
| accel/flick `uBloom` burst | `useGooDotMatrix.ts:191` (`pointerField.burst`) | ✅ `usePointerVelocityField`, no 2nd rAF |
| Bayer8 ordered dither (`dot-dither`) | `goo-dot.wgsl.ts:58–67` | ✅ |
| substrate park/PRM/offscreen | `useGooDotMatrix.ts` (`useIntersectionPause`, `createGpuSubstrate`, `respectReducedMotion`) | ✅ inherited, one canvas |
| `fwidth`-feathered AA dot (the ONE AA canon) | `goo-dot.wgsl.ts:143–145` | ✅ ~1px band, fs_main-only fence |

I did **not** find — and therefore do **not** cite — any "orbitWiden", any
per-dot temporal twinkle clock, any backdrop-sample, any chroma ground in the
LIBRARY default. (Prior goldens invented `orbitWiden`; this lens grepped first.)

---

## 1. The core idea (one breath)

**Keep the metaball-dot ENGINE exactly as it is; rebuild the GROUND and the
CALIBRATION so the dots read as liquid metaballs that POP, on a colorful field, in
both modes, cross-engine. Three moves, all KISS, all on the extant uniforms:**

1. **GROUND THE DEFAULT (the §3 fix):** the library default stops being warm-cream
   dots over transparent-onto-flat-cream. The default becomes a **luminance-CONTRAST
   pairing** — the dot palette and the card it sits in are a RELATIONSHIP, never the
   same tone. Two shipped ways to be legible (the consumer picks): (a) the dots ride
   a **deep warm-charcoal viz-ground** baked into the component's own wrapper (the
   reference look, promoted from a demo preset to the DEFAULT viz-ground because
   `glass is a relationship not a color` — §3), OR (b) when `background:"transparent"`
   the dots auto-darken-and-saturate to read over a light card (a contrast-guaranteed
   palette). The teal-purge stays; this is warm, not teal.

2. **FILL THE FRAME + SIZE THE DOTS (the scale fix):** the metaball currently
   occupies ~20% of the card because `bodyRadius` + satellite spread are tuned for a
   focal bead, and `dotPixelSize:10`/`dotMax:0.42` make small dots. The greenfield
   default spreads the field to **fill the card** (a larger body + wider satellite
   orbits + a default that reads as a FIELD of merging dots edge-to-edge, the §3
   dot-flow vignette idiom) and grows the dots toward a confident **`dotPixelSize`
   ladder bound to the √φ proportion** so the dot grid itself carries the
   Aristotelian rhythm (cell : dot-core : neck-waist = 1 : 1/φ : 1/φ²).

3. **A COLORFUL FIELD UNDER THE DOTS (the §3 SURPASS):** the single boldest move —
   the dots are not the only thing painting. The component composes the EXTANT
   `<Aurora>` (or the cheap `auroraFallbackGround` static mesh) as a **living warm
   color field BEHIND the dot layer in the SAME canvas budget**, so the dots read as
   a halftone over a breathing aurora — vivid, warm, alive — exactly the "colorful
   field behind glass" §3 mandate, the thing the flat-cream default lacks.

Everything rides uniforms and config that ALREADY EXIST plus the extant Aurora
engine. No new shader entry point, no new distance function, no fork.

---

## 2. The visual + motion + interaction spec

### 2.1 The field reads as REAL metaballs (the headline question)

It already does in the math — the answer to "stamped circles vs real metaballs" is
**real**, because the dot size/brightness sample `-d/bodyR` of the *smin-merged*
field at the cell center, so where two beads bridge, the smin membrane lifts the
field between them and the dots there THICKEN into a connected band, then thin and
snap when the satellite absorbs. The defect was never the merge; it was that you
couldn't SEE it. The greenfield makes the neck unmissable:

- **Neck legibility tune:** raise the default `field.smoothK` (the smin `k`) a touch
  so the membrane between bead and satellite is a fatter, more visible bridge of
  dots (a wider waist reads more clearly at dot resolution than a thread). The neck
  must read at the split midpoint as a **band of dots that stretches, thins to a
  waist, then snaps** — never a fade-disconnect. §L7's "necks stretch, thin, SNAP —
  never a naive ellipsoid tween" applies to the DOT band identically.
- **Brightness signature at the waist:** the dots ON the neck inherit the same
  `fCell`-driven brightness ramp, so the waist is dimmer than the two cores — a
  liquid-metal pinch read, not a flat connector.

### 2.2 Morph/flow QUALITY — liquid, weighty, alive

The "cartoon-punch / inertia / morph-more-on-move" register is already FED into the
field (`uStretch` velocity squash-stretch, `breath` pulse, `usePointerVelocityField`
burst). The greenfield's job is CALIBRATION toward the LIQUID-WEIGHT-UNIVERSAL bar:

- **Morph-MORE-on-move:** the default `field.stretch` is the calm `0.5` (per
  BD.W-BLOB-MOTION-TUNE the flick reads only ~6% — within noise). For the goo-dot
  DEFAULT (a backdrop field, not a focal bead), bump the default toward the louder
  register so a cursor flick visibly **taffy-pulls the whole dot-cloud along the
  velocity axis** — the dots smear into elongated arcs on a fast move, settle round
  on rest. This is the squash-and-stretch with real WEIGHT, drawn in dots.
- **Inertia + follow-through:** the field-lean (`uPointer` deformation) + the spring
  on the pointer trail give overlapping action for free — the cloud leans, the trail
  pseudopod lags and catches up. Keep it; verify the settle is a single decisive
  overshoot (ζ≈0.7 weight), never a tight spring (the liquid-weight law: NEVER
  tight/springy).
- **The flick BLOOM (the cartoon PUNCH):** the `uBloom` accel-burst already fires a
  one-shot brightness/swell on a sharp flick. Calibrate it LOUDER so a flick reads as
  a momentary lightning-bloom of the near-cursor dots — anticipation (the lean) →
  exaggeration (the bloom) → follow-through (the decay). The 1940s technicolor punch,
  in a dot field.
- **The calm steady-state:** at rest, the `breath` pulse + a slow satellite orbit
  keep the field ALIVE (a gentle in-place breathing of the dot cluster) without
  kinetic flow — calm, not frantic. This is the "alive" floor.

### 2.3 Vivid/warm, NOT gray — and over a colorful field (§3)

- **The dot palette** is warm by identity (cream core → amber rim) but the GROUND it
  reads against is the fix. The default viz-ground is a **deep warm charcoal**
  (`oklch(0.16 0.02 60)` band — warm near-black, NOT navy, NOT gray) so the warm dots
  GLOW. The BA.W-NO-GRAY warm floor is honored: the ground is warm-to-the-byte
  (chroma > 0, hue in the amber band), never a neutral gray.
- **The colorful field (the boldest move — §2.4):** an `<Aurora>` warm mesh drifts
  BEHIND the dot layer, so the "field behind glass + a defined edge" §3 requirement
  is met by the viz itself: the dots are a warm halftone over a living amber/rose
  aurora. The dots pick up the aurora's local hue at the edges (a faint
  section-color suffusion the flat-cream default can never have).

### 2.4 THE BOLDEST MOVE — the dots float over a LIVING aurora field, one canvas

The single audacious move: **GooDotMatrix composes a warm `<Aurora>` color field as
its own backdrop, IN THE SAME canvas/GL budget, with the dot-stamp drawn OVER it.**

- Today the dot-stamp clears to transparent and the card behind shows flat cream →
  dull. The greenfield renders, in the ONE GL context the substrate already owns, a
  **two-pass frame**: pass 1 the warm Aurora mesh (the living color field), pass 2
  the metaball dot-stamp composited over it. The dots are warm-white where the field
  is deep, and the GROUND between/behind dots is a breathing amber→rose→cream aurora
  instead of dead cream.
- The dots **read against the aurora**: a `mode="field-over-aurora"` default vs the
  current `mode="dots-only-transparent"` (kept as an opt-in for placing the matrix
  over an already-colorful host). ONE component, two grounds — the dim-idiom
  discipline, no fork.
- **Why it surpasses the reference:** the iOS-27 dot-flow reference (v4) is a flat
  halftone over near-black; goo-dot over a LIVING aurora is richer — a warm
  generative field the reference's static video cannot do, and the dots
  pointer-react over it. This is "approach-but-FAR-SURPASS" in one composition.
- **The budget honesty:** this is two GPU passes in ONE context, NOT two contexts
  (the one-GL-per-route budget holds). If even one pass over budget on the WebGL2
  fallback tail, the Aurora pass degrades to the `auroraFallbackGround` static-mesh
  (already shipped) — a cheap compositor-static warm gradient, still colorful, still
  warm. PRM freezes BOTH passes to one static frame.

---

## 3. The precise mechanism (tokens / config / shaders / composables — all extant)

**No new shader entry point. No new distance function. No fork.** The changes:

### 3.1 `constants.ts` — the default re-calibration (the bulk of the fix)

```
DEFAULT_GOO_DOT_CONFIG:
  field: spread to fill the card — larger bodyRadius, wider satellite orbits,
         a slightly higher smoothK (fatter visible neck), stretch bumped toward
         the louder morph-more-on-move register (the BD.W-BLOB-MOTION-TUNE louder
         arm, applied to the goo-dot DEFAULT not the blob default)
  dotPixelSize: a √φ-laddered default (a confident cell, e.g. 12–14) — §L6
  dotMax / dotMin: cell : core : rim = 1 : 1/φ : 1/φ² (the Aristotelian dot rhythm)
  fieldFloor: lowered so the field reaches further toward the card edges (a FIELD,
              not a focal bead — the §3 vignette idiom)
  palette: WARM_IDENTITY (kept) — but legible BY GROUND, not by self-contrast
  background: the deep warm-charcoal viz-ground (promoted from demo preset to the
              DEFAULT, because glass/viz is a RELATIONSHIP — §3); a `"transparent"`
              opt-in keeps the over-a-colorful-host path with a contrast-guaranteed
              auto-darkened palette
  interactive: true by default (the field is alive + reactive — the liquid-weight
               universal; PRM still parks it)
  aurora: NEW config sub-object — the warm Aurora backdrop preset (boldest move);
          OFF → the dots-only-transparent legacy ground
```

### 3.2 The two-pass frame (the boldest move) — in `useGooDotMatrix.ts`

The substrate already owns the encoder/pass loop. The greenfield adds a FIRST pass
that draws the extant Aurora mesh shader to the same canvas (load `clear`), then the
dot-stamp pass (load `load`, blend over). This reuses the EXTANT Aurora WGSL/GLSL
(`src/components/custom/aurora/shaders/`) — a SPLICE+compose, the same idiom the
hybrid already uses to splice the goo-blob field. The Aurora uniforms ride a third
binding; the dot-stamp + field bindings are untouched (the SoT-extend discipline,
never a re-fork). The `shouldContinue` gate already covers the aurora drift (it
breathes → the loop stays alive; parks when both settle).

### 3.3 Demo (`demo/stories/substrates/goo-dot.vue` + `presets.ts`)

- The DEFAULT story now reads vivid out of the box (warm dots over warm aurora over
  warm-charcoal) — the §3 colorful-field demonstrated.
- The near-dark mono reference stays a named preset (the iOS-27 dot-flow homage).
- A NEW preset: `dots-over-light-host` (transparent ground + auto-darkened palette)
  showing the matrix placed over an already-colorful glass card.
- Variant chips (`dot-field`/`dot-dither`/`dot-lattice`/`dot-sphere`) unchanged.

### 3.4 Proportion (§L6 Aristotelian)

The dot grid itself carries √φ: `cell : core-dot : neck-waist = 1 : 1/φ : 1/φ²`, and
the `dotPixelSize` default sits on the √φ pixel ladder. The card the viz fills is a
√φ-proportioned showcase frame (the demo already uses `ShowcaseFrame tier="field"`).

---

## 4. Cross-engine (Chrome + Safari) — the §L7 arm (this lens's spine)

The viz is **GPU-only, owns its own canvas** — so it is the §L7 viz path, NOT the
SVG-goo path. The metaball merge here is computed in the SHADER (the smin field),
not an SVG `filter:url()`. The §L7 cross-engine obligations for a GPU viz:

- **WGSL ⟷ GLSL twin parity (already shipped, must be preserved):** the WebGPU
  primary (`goo-dot.wgsl.ts`) and the WebGL2 fallback (`goo-dot.frag.ts`) are
  byte-locked twins of the same field+dot-stamp. Safari ships WebGPU behind a flag
  in many builds → **WebKit overwhelmingly hits the WebGL2 path**, so the GLSL twin
  IS the Safari surface and must be paint-verified as the lead, not an afterthought.
  The two-pass Aurora addition MUST land in BOTH twins in lockstep (the round-trip
  gate `proof:viz-hybrid` clause 3 extends to the aurora pass).
- **sRGB color-interp:** the dot-stamp does its own OKLCh→linear→sRGB conversion in
  the shader (`oklabToLinearSrgb`/`linearToSrgb`) — engine-independent, no reliance
  on `color-interpolation-filters`. Good. The Aurora pass must use the SAME OKLCh
  color core (the one shared `/color` math) so the two passes agree cross-engine.
- **NO `backdrop-filter:url()` anywhere** — the merge is in-shader, the §L7 forbidden
  list is not touched. ✅
- **`fwidth` AA in fs_main only** — the dual-module WGSL-validation fence is already
  held (`goo-dot.wgsl.ts` comment + the metaball precedent). The Aurora pass adds no
  vs_main-reachable derivative. Preserve.
- **`@supports`/PRM floors:** the substrate already paints ONE static frame then
  parks under PRM (the dot field freezes mid-merge, the shape held + legible) and
  offscreen-parks via `useIntersectionPause`. The Aurora pass inherits the same park
  (frozen mesh + frozen dots = one static warm composite). ✅
- **The paint-cost fence:** two GPU passes in one context is the cost to watch. The
  fence: the Aurora pass runs at the budget DPR (`resolveBudgetDpr`, already used);
  if the WebGL2 tail can't afford the live mesh, it degrades to the static-mesh
  fallback (one quad, near-free). Never a per-frame backdrop re-blur (forbidden).
- **The acceptance proof:** a PAIRED-engine π capture (Chromium WebGPU primary AND
  WebKit WebGL2 fallback) proving (a) the neck waist + snap reads, (b) the dots are
  vivid over the aurora (edge-density + warm chroma both non-zero), (c) BOTH modes,
  (d) the parked-when-hidden + PRM-freeze static composite. Single-engine green is
  NOT acceptance (§L7).

---

## 5. A11y / PRM carve

- **WCAG-2.2.2 pause:** the `v-model:paused` seam already parks the loop; wire a
  `<DockBackgroundToggle>` in the demo. ✅ extant.
- **PRM → one static frame:** `respectReducedMotion:true` paints one frozen warm
  composite (dots + aurora) then parks — the field reads as a still warm halftone,
  legible, no motion. The flick-bloom + lean are PRM-gated off (`tick(0)`).
- **`aria-hidden` on the canvas** (already set) — it is decoration, not content.
- **Contrast guarantee:** the default ground/palette pairing ships a real luminance
  ΔL (the dots are visibly legible — the live witness proves the reference pairing
  clears it where the flat-cream default fails). The `transparent`-over-light path
  auto-darkens the palette to hold a min ΔL against a light card.
- **No motion trap:** the calm steady-state is a gentle breath, well under any
  vestibular threshold; the loud morph is pointer-GATED (only on user move).

---

## 6. The DELTA-ASSAY — reconcile vs the 116 union waves (no dup)

| Existing wave / engine | Relationship | This greenfield |
|---|---|---|
| BC.W-VIZ-HYBRID (the goo-dot engine) | UNION — the base | re-calibrates its DEFAULT + adds the aurora ground pass; ZERO new distance fn |
| goo-blob greenfield (sibling) | DISJOINT | goo-blob = the lit creature; goo-dot = the dot-rendered field. Shares `sceneDistG` (already spliced), no new overlap |
| goo-morph greenfield (sibling) | DISJOINT | goo-morph = the DOM/SVG barbell-neck (dock fission); goo-dot = GPU dot field. No shared surface |
| W-DOTFLOW-REBUILD (§3, dot-flow) | ADJACENT, NOT dup | dot-flow = density-gradient halftone vignette (no metaball); goo-dot = metaball-driven dots. Distinct register; both share the §3 "colorful-field" and "fill the frame" findings — this lens APPLIES that finding to goo-dot |
| BD.W-BLOB-MOTION-TUNE | CONSUMES its louder-arm finding | applies the louder stretch/bloom register to the goo-dot DEFAULT (a backdrop field wants more morph than the focal blob) |
| BD.W-GOOBLOB-SAT-SHADE / SQUIRCLE | INHERITS via the spliced field | per-satellite shade + squircle dome land in the goo-blob shader; goo-dot reads the merged field, gets them free at the dots' color — no goo-dot-side work |

**Proposed wave: `BD.W-GOODOT-GROUND-VIVID`** (calibration + the aurora-ground
compose). NOT a rebuild — the engine is fit. Scope: (1) the default re-calibration
in `constants.ts` (ground, scale, dot-√φ ladder, louder morph); (2) the two-pass
warm-Aurora ground compose in `useGooDotMatrix.ts` + both shader twins in lockstep;
(3) the demo re-host (vivid default + the two named presets); (4) the paired-engine
π acceptance (neck-waist + vivid-over-aurora + both modes + PRM-static).
**CONVERGENCE: ~55%** — engine 100% (the metaball-dot math, the substrate, the
pointer field, the twins, the park/PRM all ship and are correct); the GROUND +
CALIBRATION + the aurora compose are the genuine build, and they are the entire
reason the live default reads dull.

---

## 7. The one-line gestalt

The metaball dot-merge engine is already SOTA and already correct — it reads as
real liquid metaballs the moment you put it on a ground it can contrast against. The
greenfield is not a new viz; it is the act of **giving the dots a colorful, warm,
living ground to glow against** (a warm Aurora field in the same canvas) and the
calibration to fill the frame, size the dots on √φ, and morph-MORE-on-move — so the
default reads vivid and alive in Chrome AND Safari instead of a dim cream smudge on
flat cream.
