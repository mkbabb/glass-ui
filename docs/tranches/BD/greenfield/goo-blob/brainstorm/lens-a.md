# GooBlob greenfield — LENS A: "liquid mercury, not buttered ovals — the droplet that LENSES the field behind it"

**Lens** the most faithful, audacious iOS-27 Liquid-Glass interpretation · **Surface** `src/components/custom/goo-blob/`
(GooBlob.vue + the `metaball.frag.ts`/`metaball.wgsl.ts` twin + composables) on the shared substrate lifecycle ·
**Route live-judged** `/substrates/blob` (both modes, WGSL primary + WebGL2 fallback) · **Discipline** UNION with the
extant engine, KISS, no re-fork, no legacy.

---

## 0. What I VERIFIED live before designing (the source-truth pass — the prior goldens invented levers)

I navigated `/substrates/blob` on `localhost:5173` and live-judged the creature in BOTH modes + read the shaders + the
lifecycle. The status quo is **much stronger than the seed RESEARCH.md described** — that doc is stale on three points,
and being honest about it is the whole point of a greenfield pass:

| Claim I tested | Live/source verdict |
|---|---|
| "naive overlapping ellipsoids" | **FALSE — it is genuine metaballs.** The field is IQ-normalized smin (`sminQuadraticG`/`sminCircularG`, `metaball.wgsl.ts:119-144`) with the proper neck `m`-term AND gradient-propagating `w`-mix — a satellite passing the body **merges into one connected gooey silhouette with a real waist**, then separates (live-captured on the STAGE-1 plain-blob register: a body + a satellite joined by a true thinning neck, NOT two stamped discs). The merge/split is CORRECT. |
| "~50-knob `BlobConfig` sprawl" | **FALSE — already collapsed to 8 cohesive atoms** (`types.ts:214-253`: `geometry · satellites · membrane · color · surface · interaction` + `variant`/`morphT`/`quality`/`tempo`). OPEN-2 in RESEARCH.md is CLOSED. Do not re-open it. |
| "dark coffee-bean default, gray" | **FALSE now — warm-cream holds in BOTH modes.** The live default paints a warm amber/cream lit bead (light AND dark); the BA.W-NO-GRAY warm floor + the cream `paletteStops` ramp landed. Never gray. |
| "WWDC-2025 refraction architecturally absent" | **TRUE — the one real gap.** `grep uBackdrop = 0` in both backends; `fragColor = vec4(rgb*alpha, alpha)` over the droplet's OWN self-lit color (`metaball.frag.ts:480`). The blob is a self-lit OPAQUE goo (WWDC-2015), it samples NOTHING behind it. It does not LENS the field — the iOS-27 liquid-glass signature is the missing axis. |
| substrate lifecycle | **ROBUST.** `createCanvasLifecycle.ts` ships offscreen content-visibility park + PRM-freeze (one static frame then park) + ResizeObserver re-fit + context-loss hold; the canvas-resize hang fix is in. WGSL-primary on the shared substrate, WebGL2 fallback, one GL/route. Keep it whole. |

**So the greenfield bar is NOT "fix broken metaballs."** The metaballs are real. The bar is: take a *correct-but-buttery*
self-lit droplet and make it read as **liquid MERCURY behind glass that LENSES the warm field** — the WWDC-2025 register —
while keeping the (already-fit) merge/split math byte-untouched. Survival of the fittest: the smin field + the 8-atom config
+ the lifecycle are FIT (keep). The SURFACE READ is weak (refine). The backdrop-lens is BROKEN-by-absence (re-invent).

---

## 1. The core idea — three reads, one field: **GOO → GLASS → MERCURY**, the dome that drinks the warm field

The droplet already nails the silhouette (the metaball merge). What it misses is the iOS-27 *material*: a liquid-glass
droplet is not a lit opaque bean — it is a **transmissive lens** that bends the warm field behind it through its bevel,
catches a hard specular star on its crown, and reads with the weight of mercury. My lens unifies the existing 8-atom
`surface` cohort into ONE perceptual axis the user can slide — **`material: goo → glass → mercury`** — driven by the
SAME `morphT` scalar that already lerps blob↔meatball dressing (`types.ts:243`), now extended one notch further:

- **GOO (0.0)** — today's STAGE-1: flat warm-cream fill, the honest metaball floor. KEPT byte-identical.
- **GLASS (0.5)** — today's lit meatball: Blinn-Phong glint + Fresnel rim + SSS, self-lit. KEPT.
- **MERCURY (1.0) — THE NEW READ** — the droplet becomes a **refractive lens**: it samples a glass-ui-PRODUCED warm
  backdrop texture (`uBackdrop`) and DISPLACES the sample along the dome-normal × Snell (IOR 1.5), so the field behind
  bends through the waist and pools at the rim; a tight crown specular (the catch-light star) rides the squircle bevel;
  a whisper of chromatic dispersion (R/G/B sampled at three IORs, ≤1px) fringes the rim. The merge NECK becomes the
  most beautiful moment — two bodies sharing one lensed pool, the field warping continuously across the waist, exactly
  the mercury-blob-merging read the user's law demands.

This is a UNION, not a fork: `material` is a single derived scalar over the EXISTING `surface` atom (no 9th atom — it
re-bundles `rimStrength/specStrength/iridescence/sssScale/coreGlow` behind the slider per "the variant IS the bundle"),
the lens rides the `morphT` machinery already in the shader, and the dome-normal it displaces along is the SAME analytic
`surfaceNormalFromGrad` normal the lit pipeline already computes. One field, three reads, one slider.

---

## 2. THE SINGLE BOLDEST MOVE — `uBackdrop`: the droplet drinks the route's own warm Aurora as a lens

**The mercury read samples a glass-ui-produced backdrop texture and refracts it through the dome — turning the self-lit
opaque goo into a true WWDC-2025 liquid-glass lens, with NO DOM-sampling API and NO second GL context.**

The mechanism (both backends, lockstep — this is the band-3 `W-GOOBLOB-SQUIRCLE-REFRACT` arm-2 the seed parked as
CONDITIONAL, now de-parked because the live blob clears the floor):

1. **The backdrop is a glass-ui texture, never a DOM read.** There is no web API to read pixels behind a backdrop
   element. So the droplet samples a texture the library itself produces — the SAME route's `<Aurora>` FBO (the
   canonical "blob over aurora" hero), OR, when no aurora is present, a cheap baked warm-cream radial-gradient texture
   generated once on mount (a 1×N gradient strip, the warm `paletteStops` ramp → a texture). One GL/route preserved
   (the backdrop is the route's existing aurora, not a new context).
2. **Snell displacement off the dome-bevel.** The dome surface normal `N` (already computed analytically) drives a
   refraction vector `refract(viewDir, N, 1.0/1.5)`; the backdrop UV is offset by its in-plane projection scaled by
   the local dome thickness. Flatter interior → near-zero displacement (the field reads straight through the crown);
   steep rim → strong displacement (the field pools/curls at the edge — the lens caustic). The **squircle dome-Z**
   (`⁴√(1-(1-x)⁴)`, the SQUIRCLE-REFRACT arm-1 switch from the spherical curve) is what makes this read as Apple's
   beveled liquid-glass and not a round marble — flat crown, curvature concentrated at the rim where the lensing lives.
3. **Composite, not replace.** `fragColor = mix(self-lit-rgb, refracted-backdrop, material·fresnelTransmission) ` —
   the droplet keeps its warm catch-light (the crown star + rim) AND lenses the field; at `material=1` the body goes
   transmissive (you see the warm aurora bent through it) while the rim/crown specular stays opaque. Premultiplied-alpha
   math unchanged.
4. **The merge neck is the payoff.** Because the backdrop sample is a continuous field and the displacement follows the
   shared smin normal, two merging bodies share ONE continuously-warped lensed pool across the waist — the field bends
   smoothly through the neck as it thins and snaps. This is the "real blob↔meatball metaball merge" reading as **liquid
   mercury**, the user's literal law, achieved by the field-lens, not by more silhouette work.

**Why bold:** it crosses the droplet from the 2015 self-lit-goo era to the 2025 liquid-glass-lens era — the single
architectural axis the live blob is genuinely missing — using only a portable WebGL2/WGSL sampler over a texture the
library already paints, no DOM hack, no second context, no new config atom. It is the one move that makes the merge read
as mercury instead of butter.

---

## 3. Motion + interaction — liquid weight, morph-MORE-on-move (the cartoon register)

The motion doctrine is SOTA and preserved (de-synced multi-sine breath, critically-damped pointer follow, symplectic
click pulse, volume-preserving squash). My lens elevates it toward the universal liquid-weight law:

- **Morph-more-on-move (the lens reacts).** A fast pointer flick already drives the velocity squash + the trail
  pseudopod (live-verified — the body taffy-pulls along the velocity axis and the trail buds a decaying-radius limb that
  smin-merges and snaps back). The lens AMPLIFIES this: the refraction displacement scales with `tanh(speed)` so a
  moving droplet bends the field MORE — the mercury sloshes. This is `BD.W-BLOB-MOTION-TUNE` arm-2's "make the stretch
  READ," now reading because the lensed field makes the elongation legible (the field warps with the stretch, not just
  the silhouette). PREFER the CPU-side `cInt.stretch` default raise (off the GL fence).
- **The click flinch (cartoon punch).** The symplectic pulse at `PULSE_ZETA=0.35` rings back; `BD.W-BLOB-MOTION-TUNE`
  arm-1 decides toward the iOS single-decisive-overshoot flinch (`ζ≈0.5-0.6`) — anticipation (a hair of squash before),
  exaggeration (the overshoot), follow-through (the settle), no ring-back. A one-constant tune, live-walked.
- **Per-satellite derived shades** (`BD.W-GOOBLOB-SAT-SHADE`) give each merging body its own analogous OKLCh shade off
  the warm body anchor — so a merge is two RELATED warm tones pooling into one, the chroma reading the union (not a flat
  monochrome lump). The smin color-mix already blends them across the neck; the shade makes the relationship visible.

---

## 4. Cross-engine (Chrome + Safari) — the twin-parity discipline, the cardinal fence

The whole point of the user's "PERFECT in Chrome AND Safari." The lens MUST land in both `metaball.frag.ts` (WebGL2,
Safari-safe) and `metaball.wgsl.ts` (WebGPU, Chrome primary) as byte-faithful twins:

- **The `uBackdrop` sampler is a portable WebGL2 `sampler2D` / WGSL `texture_2d` — no `backdrop-filter:url`, no Metal
  artifact.** The refraction is pure fragment math over a sampled texture; Safari's WebGL2 runs it identically. WGSL is
  the Chrome primary; if WebGPU is absent the WebGL2 twin carries the identical lens (the live blob already falls to the
  WebGL2 net cleanly — verified the lifecycle).
- **The squircle dome-Z `⁴√(1-(1-x)⁴)` byte-matches across backends** (the `pow(max(0.0,1.0-pow(1.0-interior,4.0)),0.25)`
  guarded canonical string, `SQUIRCLE-REFRACT §3a-A`) — a one-sided switch desyncs the lit read; the parity ΔE catches it.
- **sRGB color-interp + premultiplied-alpha** unchanged — the backdrop sample is OKLab-aware (the shared `/color` leaf
  matrices), no naive sRGB lerp.
- **The parity gate** (`BD.W-VIZ-PARITY-METAL` machinery): capture the lensed dome on at least one real-GPU backend pair,
  assert OKLab ΔE under threshold — the `fwidth()`-bearing dome normal feeding the Snell displacement is the drift-prone
  region, so this is the binding cross-engine witness.

---

## 5. a11y / PRM carve (the liquid-weight law has a floor)

- **PRM-freeze:** under `prefers-reduced-motion: reduce` the lifecycle draws ONE static frame then parks (already in
  `createCanvasLifecycle.ts:18`). The lens renders its resting frame (a still mercury droplet lensing the static warm
  field) — no breath, no advection, no dispersion shimmer. `tempo=0` freezes every integrated dt.
- **Offscreen park:** content-visibility / IntersectionObserver park (already shipped) — the lens sampler costs nothing
  when the blob is scrolled away.
- **Dispersion floor:** the chromatic fringe defaults whisper-low (≤1px) and is `@media (prefers-reduced-motion)`-zeroed
  (no shimmering edges for vestibular sensitivity); the lens is a static refraction, not an animated caustic, under PRM.
- **The droplet is decorative** (`aria-hidden`); no information is carried only by the lens read.

---

## 6. DELTA-ASSAY — reconcile vs the 116 union waves (no dup, no re-fork)

This lens is a SYNTHESIS of three on-disk band-3 waves + one de-park, NOT new waves:

| Existing wave | This lens's relationship |
|---|---|
| `BD.W-GOOBLOB-SQUIRCLE-REFRACT` arm 1 (squircle dome-Z) | **ADOPT unchanged** — the squircle is the prerequisite that makes the lensing read as a bevel. |
| `BD.W-GOOBLOB-SQUIRCLE-REFRACT` arm 2 (`uBackdrop` Snell refraction, CONDITIONAL/HELD) | **DE-PARK → BUILD.** The live blob clears the floor (verified the working creature); arm 2 is the boldest move (§2). The lens composite + the dispersion whisper + the material-slider bundling are the amendment this lens ADDS to arm 2's spec. |
| `BD.W-GOOBLOB-SAT-SHADE` (per-satellite derived shade) | **ADOPT** — rides the SAME one metaball re-touch (§4); the merge reads as two related warm tones pooling. |
| `BD.W-BLOB-MOTION-TUNE` (pulse-ζ + flick-stretch) | **ADOPT** — the lens makes the flick-stretch READ (§3), discharging arm-2's "make it read or honest-down" toward "make it read." |
| RESEARCH.md OPEN-1 (dark default), OPEN-2 (50-knob sprawl) | **CLOSED — do NOT re-open.** Live-verified: warm-cream holds, config is 8 atoms. The seed doc is stale; record it. |

**The amendment:** fold the §1 `material: goo→glass→mercury` slider as the consumer-facing UNION of the SQUIRCLE-REFRACT
arm-2 + SAT-SHADE + MOTION-TUNE reads — ONE perceptual axis over the existing `surface` atom + the `morphT` scalar, no
9th config atom, ONE coordinated `.frag`+`.wgsl`+packer re-touch (the band-3 single-re-touch discipline), ONE parity
re-record. The merge/split smin field stays byte-untouched (it is fit). No new component, no fork, KISS.

---

## 7. The gestalt bar (how this gets live-judged)

`/substrates/blob`, both modes, both engines: the droplet must read as **liquid mercury behind glass that LENSES the warm
field** — the crown catches a hard specular star, the warm aurora bends through the bevel and pools at the rim, a fast
flick sloshes the field, and a satellite passing the body MERGES into one continuously-lensed pool through a true thinning
neck then SPLITS — mercury merging, never stamped ovals, never gray, never butter. Born-RED on the current self-lit opaque
goo (it samples nothing behind it); GREEN when the field bends through the droplet in both backends.
