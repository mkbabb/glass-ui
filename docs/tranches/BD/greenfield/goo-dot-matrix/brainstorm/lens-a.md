# GooDotMatrix — GREENFIELD lens-a: **the warm halftone FIELD the metaball SWELLS through**

> Lens: the most faithful, audacious iOS-27 Liquid-Glass interpretation. Live-judged
> `/substrates/goo-dot` BOTH modes on `localhost:5173`. Source-verified every cited uniform/
> composable on HEAD (`goo-dot.wgsl.ts`, `goo-dot.frag.ts`, `useGooDotMatrix.ts`, `constants.ts`,
> the spliced `metaball.wgsl.ts`/`uniformBridgeWGPU.ts` field SoT). UNION with the extant
> engine — no re-fork, KISS. Reconciled against goo-blob GOLDEN (owns the SDF field + fission +
> mercury-lens) and the dot-flow `W-DOTFLOW-REBUILD` halftone density-field (the §3 surpass).
>
> **Component:** `src/components/custom/goo-dot-matrix/` (the existing one — no new component).
> **Field:** byte-untouched goo-blob `sceneDistG` (spliced, never re-derived).

---

## 0. SOURCE-TRUTH — what is FIT, WEAK, BROKEN (live + grep on HEAD, not the seed)

Drove BOTH modes live. Both reproduce the SAME structural defect; the cite-table is grepped.

| Axis | Verified state (HEAD) | Verdict |
|---|---|---|
| **the metaball math** | the dots sample the real goo-blob `sceneDistG` (spliced, `goo-dot.wgsl.ts:36`/`125`); `sminG` quadratic/circular neck is in the field; `fCell = clamp(-scene.x/bodyR,0,1)` (`:126`) is the honest thickness. The merge/neck topology IS real. | **FIT — byte-untouched, keep.** |
| **the dot-grid OUTPUT stage** | `dotR = (dotMin + (dotMax−dotMin)·smoothstep(fieldFloor,1,fCell))·cellHalf` (`:131`), `fwidth`-AA stamp (`:143-145`), OKLCh ramp reads `fCell` (`:151-154`). A clean single idea. | **FIT — the OUTPUT idea is right.** |
| **the field FILLS the card** | **BROKEN — live.** `alpha = dot · step(uFieldFloor, fCell)` (`:159`) + `if(alpha<0.002){discard}` (`:160`). Outside the metaball body `fCell→0` → EVERY dot discarded. Live: a tiny dotted clump (~⅓-width) floats in a VAST empty void; "a regular grid of dots fills the card" is a LIE. There is **no base lattice** — dots exist ONLY where the blob is. The card is 85% dead ground. | **BROKEN — re-invent: the field must be EVER-PRESENT; the metaball MODULATES it, it does not GATE it.** |
| **vivid / warm, not gray** | **BROKEN — live, both modes.** Dark preset: muted warm-GREY dots, low-L. Warm-cream default over the cream page: the dots are INVISIBLE (warm-on-warm, near-zero contrast — the §3 flat-field failure in its purest form: the library default literally cannot be seen). `WARM_IDENTITY_PALETTE` is L0.92/C0.03 + L0.84/C0.07 (`constants.ts:101-104`) — barely-chromatic, no pop. | **BROKEN — re-invent the tonal contrast + a colorful field behind.** |
| **over a COLORFUL field (§3)** | **BROKEN — absence.** `background:"transparent"` (default) → the dots float on the page's flat cream; the demo preset paints flat near-black. NO living field behind the dots — the §3 systemic finding confirmed live. | **BROKEN — add a colorful field BEHIND the dots (a defined edge + warm-chroma ground).** |
| **liquid weight / morph-more-on-move** | **WEAK.** The dot-cursor influence (`influence` swell + `bloom`, `:120-132`) + the field-lean (goo-blob `uPointer`) exist and are real, but at the current tiny-clump scale they're imperceptible; no halftone breathing, no twinkle, no inertia in the lattice itself. | **WEAK — refine: a living base-lattice twinkle + readable on-move swell.** |
| **cross-engine (WGSL/GLSL twin)** | **FIT.** `goo-dot.frag.ts` is a line-for-line GLSL twin; `fwidth` AA in `fs_main`/`main` only; premultiplied-alpha; `discard` parity. The substrate (`createGpuSubstrate`) carries offscreen-park + PRM one-frame + device-loss heal. | **FIT — keep the twin discipline; new terms ride BOTH packers in lockstep.** |

**The greenfield bar is therefore ONE structural re-think + ONE material re-think:**
the field never FILLS (the metaball is a gate, not a modulator — a speck in a void), AND the
field is gray/invisible over a flat ground (no vivid contrast, no colorful field behind). The
metaball math, the dot OUTPUT idea, and the cross-engine twin are all FIT — keep them whole.

---

## 1. THE CORE IDEA — **the metaball SWELLS through an ever-present warm halftone FIELD, over a living color ground**

Invert the gate. Today the dots **exist only inside** the metaball (`step(fieldFloor,fCell)`
discards the rest) — so the viz is a lonely clump. The iOS-27 / Cowork-halftone reference is
the opposite: a **dot lattice fills the entire surface ALWAYS**, and the liquid form is read as
a **swelling, brightening, NECKING REGION within that ever-present field** — the dots near and
inside the metaball grow big+bright+warm and *merge their stamps into a continuous goo* (the
metaball reading); the dots far away stay a calm, dim, breathing halftone (the field reading).
The blob is not a thing *on* a void — it is a *disturbance the field rises to meet*. That is
the whole liquid-glass move: **the medium is everywhere; the form is where the medium thickens.**

Three concentric reads on ONE `fCell` thickness scalar the shader already computes (golden-ratio
banded — the field is φ-stepped, nothing arbitrary):

- **FIELD (fCell ≈ 0, far)** — a calm warm-grey halftone lattice, ever-present, dim, *breathing*
  in place (a slow per-dot twinkle, NOT advection — the dot-flow register, shared). The card is
  alive everywhere, not dead-black.
- **MENISCUS (0 < fCell < floor, the rim band)** — the dots ramp up in size+brightness+warmth as
  the field thickens toward the body. This is the band today's `step(fieldFloor,…)` THROWS AWAY.
  Restore it as a *soft falloff*, not a hard cut → the metaball reads with a gooey halo, not a
  stamped circle. **This is where merge/neck becomes legible.**
- **BODY (fCell → 1, the core/neck)** — the dots are big, bright, warm-cream, their `fwidth`
  stamps **overlapping into a continuous goo** (the dot pitch is tuned so core dots kiss — the
  halftone DISSOLVES into solid metaball at the core, the dot-matrix↔goo bridge made real).

Over it all: a **colorful field behind** (§3) — a faint warm-chroma radial/aurora ground the
dots sit over, with a defined card edge, so the field never reads flat-cream-on-flat-cream.

This is a UNION: the field math, the OUTPUT stage, the cursor influence, the twin — all KEPT.
The change is (A) a **base-lattice presence floor** so dots paint everywhere (the gate becomes
a modulation), (B) a **vivid tonal + warm-chroma re-grade** of the OKLCh ramp + a colorful
ground, (C) a **soft meniscus falloff** replacing the hard `step` cut, (D) a **calm twinkle**
on the base lattice (DRY — the dot-flow breathing register). All four ride the EXISTING s8/s11
dot lanes + the EXISTING color ramp; ZERO new uniform struct, ZERO field re-fork.

---

## 2. THE SINGLE BOLDEST MOVE — **dissolve the discard: a φ-banded presence field where the metaball thickens an EVER-PRESENT halftone (and the core dots kiss into goo)**

Today (`goo-dot.wgsl.ts:159-160`):
```
let alpha = dot * step(uFieldFloor, fCell);
if (alpha < 0.002) { discard; }      // ← outside the blob: EVERYTHING discarded → a speck in a void
```
Replace the binary gate with a **presence floor + a φ-banded ramp** so the dot is ALWAYS present
(a dim base lattice) and the metaball *adds* size/brightness/warmth on top:

```
// presence = a calm base lattice (uDotPresenceFloor) the metaball SWELLS above.
let band     = smoothstep(0.0, uFieldFloor, fCell);          // the MENISCUS rise (was the hard cut)
let core     = smoothstep(uFieldFloor, 1.0, fCell);          // the BODY rise (kept)
let present  = max(uDotPresenceFloor, band);                 // ← the dot NEVER vanishes: a living lattice
let baseR    = (uDotMin + (uDotMax - uDotMin) * core) * cellHalf;
let dotR     = mix(uDotMin * cellHalf, baseR, present) * (1.0 + influence*0.5 + uBloom*influence);
let twinkle  = 0.85 + 0.15 * sin(uTime*0.6 + hash21(cell)*6.283);   // calm in-place breathing (NO advection)
// ... fwidth stamp as today ...
let alpha    = dot * present * twinkle;                       // present, not step()-gated
if (alpha < 0.002) { discard; }                              // only sub-pixel dots discard now
```
- `uDotPresenceFloor` (new s11 lane, default ≈0.12) — the base-lattice opacity/size floor. At
  0 it is byte-identical to today (the gate restored — a calm-default escape hatch). Above 0 the
  field fills the card. **Born-RED on HEAD:** today the card is ~85% empty (a π edge-vs-center
  presence ratio is ∞-or-undefined → fails); GREEN when dots paint corner-to-corner.
- `band = smoothstep(0,fieldFloor,fCell)` is the **meniscus** — the soft rim falloff that makes
  merge/neck read as gooey instead of a stamped edge (the user's "real metaball, not stamped
  circles" bar). It is the band the old `step()` deleted.
- `twinkle` (φ-phase-offset, slow) — the base lattice is ALIVE (the breathing register; in-place,
  zero net drift — the dot-flow `W-DOTFLOW-REBUILD` discipline, DRY, no advection).
- **Core-kiss:** with `dotMax` raised toward `0.5·cell` and the pitch held, the `fCell→1` core
  dots' `fwidth` stamps overlap → the halftone DISSOLVES into continuous goo exactly where the
  metaball is solid. The dot-matrix becomes the metaball at the core, halftone at the rim — the
  honest goo↔dot bridge the README *claims* but the discard *prevents*.

**Why this is THE move:** it is the difference between "a procedural curiosity floating in a
void" and "iOS-27 liquid glass." One sign-flip (gate→floor) + one restored band (the meniscus)
+ one shared twinkle turns a dead speck into a living warm field that the metaball swells
through. It rides the EXISTING dot lanes and the EXISTING field — the boldest *result* from the
smallest, most surgical, no-fork change. Everything else (the re-grade, the colorful ground) is
the supporting cast that makes this move VIVID.

---

## 3. THE VISUAL SPEC (vivid, warm, §3 colorful-field, golden proportion)

1. **Re-grade the OKLCh ramp toward technicolor-warm (vivid, not gray).** The default
   `WARM_IDENTITY_PALETTE` (`constants.ts:101`) is barely-chromatic (C0.03/C0.07). Re-grade to a
   **two-stop warm-cream→amber-ember with real chroma**: core `L0.96 C0.06 h82` (bright warm
   cream), rim `L0.74 C0.13 h54` (saturated amber-ember). The brightness term (`:151`) already
   multiplies L by `fCell` — so the core POPS bright, the rim glows warm-amber, the base lattice
   sits dim-warm. Presets-in-consumers: the near-dark reference + the de-grayed grade are demo
   presets; the *default identity* gets the chroma lift (the library's own tokens evolve — MEMORY
   `feedback_presets_in_consumer`). The §3 BA.W-NO-GRAY warm floor is the gate.
2. **A COLORFUL FIELD BEHIND (the §3 fix — the headline-adjacent move).** The dots are
   premultiplied-additive over a *transparent* ground today, so the card color IS the page. Add
   an OPT-IN `fieldGround` (default ON for the demo, the library default keeps `"transparent"`
   for composability): a faint warm-chroma **radial-warm ground** painted as the canvas clear
   color (a low-C amber→cream radial) OR — the audacious read — composited under the dots so the
   warm field *bleeds through* the halftone (the iOS hue-transmission read). A **defined card
   edge** (a 1px inner warm-rim + the concentric `rounded-card` radius) frames it. Now the dots
   sit on a living warm field with a defined edge — never flat cream-on-cream.
3. **Golden proportion (Aristotelian).** `dotPixelSize` and the dot radius band are φ-related:
   `dotMin : dotMax = 1 : φ` (≈0.28 : 0.45 of the cell), the `fieldFloor`/`presenceFloor` split at
   `1/φ²`, the meniscus band width = `1/φ` of the floor→core span. The cell pitch is a φ-fraction
   of the canvas min-dim so the lattice is proportioned, not arbitrary.
4. **Cartoon punch on the cursor bloom.** The `uBloom` accel-burst (`:132`/`:151`) already swells
   near-cursor dots — calibrate it to a real **anticipation→overshoot→settle** (the bloom fires
   ~1.2× then damps, reusing `usePointerVelocityField.burst` which the composable already feeds,
   `useGooDotMatrix.ts:191`). The dots squash-toward then snap-back — overlapping action across
   the lattice (the field "catches up" to a flick), morph-MORE-on-move.

---

## 4. THE MOTION + INTERACTION SPEC (liquid weight, both modes alive)

- **Base lattice breathing (always-on, calm):** the φ-phase `twinkle` (§2) — sub-perceptible,
  in-place, the WCAG/PRM-frozen breathing register. The card is never static-dead.
- **Field-lean (kept):** the goo-blob `uPointer` deformation leans the whole metaball toward the
  cursor (`useGooDotMatrix.ts:160` feeds the pointer) — the dot-cloud follows.
- **Dot swell + warm-flush near cursor (kept, calibrated):** `influence` (`:120`) swells +
  brightens + warms the near-cursor dots; tie it ALSO to a hue-warm shift (the local dots flush
  toward the amber stop) so the cursor leaves a warm wake.
- **Flick bloom (kept, punched):** `usePointerVelocityField.burst` → `uBloom` one-shot
  anticipation→overshoot→damp (§3.4). Morph-more-on-move.
- **PRM:** `respectReducedMotion` (`constants.ts:91`) → `tick(0)` freezes; the substrate paints
  ONE static frame. The presence-floor field freezes mid-breath, shape held + legible (the field
  fills the card even frozen — strictly BETTER than today's frozen speck).

---

## 5. THE PRECISE MECHANISM (union, KISS, no re-fork — every touch grepped)

**Shaders (`goo-dot.wgsl.ts` + the GLSL twin `goo-dot.frag.ts`, lockstep):**
- Replace the `step()` gate (`:159`) with the presence-floor + φ-band ramp (§2). ~6 lines, both files.
- Add `uDotPresenceFloor` to the s11 lane (the dot uniform struct already has s11 `(pAct,x,y,bloom)`
  — extend to a s12 lane `(uPresenceFloor, uTime, uGroundC, _pad)`; `uTime` feeds the twinkle).
  The struct extend rides binding1 — the field struct (binding0) stays byte-identical (the SoT
  discipline `goo-dot.wgsl.ts:17-20`). Mirror in `uniformBridgeWGPU.ts` `packGooDotUniforms` +
  the GL `dU.*` uniform set (`useGooDotMatrix.ts:325-338`).
- The OKLCh re-grade is a CONSTANT swap (`WARM_IDENTITY_PALETTE`) — no shader change; the ramp
  (`samplePaletteOklch`) is byte-untouched (the goo-blob field SoT).

**Config (`constants.ts`):** add `presenceFloor:number` + `fieldGround: OklchStop|"transparent"`
to `GooDotConfig`; default `presenceFloor:0.12`, `fieldGround:"transparent"` (library composable
default), the demo preset sets the warm radial. Re-grade `WARM_IDENTITY_PALETTE` (the chroma lift).

**Composable (`useGooDotMatrix.ts`):** pack the two new lanes in `resolveFrame`/the GL uniform
block (~4 lines, beside the existing dot-push pack `:325-338`). The twinkle `uTime` is `simTimeMs`
(already tracked, `:154`). ZERO new rAF, ZERO new context, ZERO field re-fork.

**Demo (`goo-dot.vue` + `presets.ts`):** the warm-cream default preset gets the colorful warm
ground + the re-graded palette; the near-dark reference preset keeps its near-black ground but
the SAME presence-floor field (so it fills, vividly). A presence-floor slider demonstrates the
gate→field continuum.

**Field ground / §3:** the cheapest read is the canvas `clearValue` as a warm low-C color (one
line, `useGooDotMatrix.ts:274`) + a CSS radial-warm under the canvas in the demo wrapper. The
audacious read composites a tiny static warm-mesh under the dots — DRY via the
`auroraFallbackGround` static mesh (the dot-flow `W-DOTFLOW-REBUILD` "brand suffusion" lever),
NO second GL context.

---

## 6. CROSS-ENGINE (Chrome + Safari) + a11y/PRM CARVE

- **WGSL/GLSL twin lockstep** — every new term (presence floor, twinkle, s12 lane) lands in BOTH
  `goo-dot.wgsl.ts` and `goo-dot.frag.ts` identically; the `proof:viz-hybrid` round-trip gate
  keeps the dot-grid constants byte-lockstep (the existing discipline). `hash21`/`sin` are in
  both field splices already — no new intrinsic.
- **No `backdrop-filter:url`, compositor-safe** — the field ground is a canvas clear color / CSS
  radial / static mesh, NOT a filter. The dots are premultiplied-additive (Safari sRGB-safe,
  `:163`). No naive ellipsoid — the metaball `sceneDistG` smin field + the core-kiss is the real
  blob↔meatball merge.
- **`fwidth` AA** stays in `fs_main`/`main` only (the dual-module WGSL trap, `:24`) — the new
  twinkle/presence terms are fragment-local, no vs_main reach.
- **a11y/PRM** — `aria-hidden` canvas (decorative, `GooDotMatrix.vue:101`). PRM → ONE static
  frame, the field frozen-but-filled. WCAG-2.2.2 pause via `v-model:paused` (kept). Offscreen
  park + content-visibility (kept). The twinkle is sub-perceptible AND PRM-frozen (no seizure
  surface).

---

## 7. THE DELTA-ASSAY SEED (wave reconciliation — no dup vs goo-blob / goo-morph / dot-flow)

- **goo-blob GOLDEN** owns the SDF field + fission lifecycle + mercury-lens (CPU + GL on the
  goo-blob source). goo-dot CONSUMES that field byte-untouched — ZERO overlap. When goo-blob's
  fission lands, goo-dot's dots will neck+split FOR FREE (the field is shared) — a compounding
  win, no new work.
- **dot-flow `W-DOTFLOW-REBUILD`** owns the density-gradient halftone + the calm twinkle + the
  content-mask vignette. goo-dot REUSES the twinkle/breathing register (DRY) but its density is
  **metaball-driven** (`fCell`), not radial-vignette — a distinct register (the union, not a dup).
  The shared lever is the breathing twinkle + the warm-suffusion ground.
- **goo-morph** owns the carousel/deck worm (a different surface). No overlap.
- **NEW WAVE (proposed):** `BD.W-GOODOT-PRESENCE-FIELD` — the gate→floor dissolve + the meniscus
  band + the vivid re-grade + the §3 colorful ground + the shared twinkle. Born-RED gate
  `proof:goodot-field`: (G1) edge-presence vs center-presence ratio is FINITE and >0 over the
  whole card (born-RED: today the edges are empty → ratio undefined/0); (G2) the core dots kiss
  (a connected-component over the core silhouette is 1 solid mass, not separated stamps); (G3)
  warm-chroma floor ≥ the BA.W-NO-GRAY threshold both modes (born-RED: the cream-on-cream default
  is invisible); (G4) twinkle in-place (no net advection over N frames); BOTH engines. AUGMENTS
  `BC.W-VIZ-HYBRID`; DEPENDS `BD.W-DOTFLOW-REBUILD` (shares the twinkle register).

---

## 8. SUMMARY

GooDotMatrix today is a dead speck in a void: the `step(fieldFloor,fCell)` gate discards every
dot outside the small metaball body, so 85% of the card is empty and — over the cream page — the
warm-cream default is literally invisible (the §3 flat-field failure, live-confirmed both modes).
The greenfield inverts the gate into a **presence FLOOR**: an ever-present, calmly-breathing warm
halftone lattice fills the whole card, and the liquid metaball reads as a **swelling, brightening,
warm-flushing, NECKING REGION the field rises to meet** — the dots near the body grow big+bright+
amber and their `fwidth` stamps KISS into continuous goo at the core (the honest dot↔metaball
bridge), softly falling off through a restored meniscus band at the rim (so merge/neck read as
gooey, not stamped). Re-graded to real warm chroma over a colorful warm field with a defined edge
(§3), it goes from gray-invisible to vivid liquid glass. The whole thing rides the EXISTING dot
lanes, the EXISTING shared field (byte-untouched — goo-blob's coming fission necks the dots for
free), and the EXISTING WGSL/GLSL twin — a surgical UNION, no fork. **The single boldest move:
dissolve the `step()` discard into a φ-banded presence floor — one sign-flip turns a procedural
curiosity floating in a void into an iOS-27 liquid-glass field the metaball swells through.**
