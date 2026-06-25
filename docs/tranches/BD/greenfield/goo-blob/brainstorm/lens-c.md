# GooBlob greenfield — LENS C: AUDACIOUS CARTOON-TECHNICOLOR PUNCH

**Lens** 1940s-technicolor FLOW & PUNCH — squash/stretch/anticipation/follow-through/overlapping-action/arcs, real
weight + inertia, bold layered-offset cartoon shadowing. **The bar:** the field must read as **liquid mercury
beads that MERGE and SPLIT through a true thinning neck**, not a lumpy clay potato. **Live-judged** `/substrates/blob`
in both modes, WebGPU-primary armed in Chrome (verified: the canvas holds a `webgpu` context, the WGSL path is live).

---

## 0. The live verdict — what I actually saw (the source-truth, not the doc claims)

I drove the real `/substrates/blob` route. The captured truth:

| Axis | Live read | Verdict |
|---|---|---|
| **Warm / not gray** | A warm honey-gold bead (`#d4a25f`-ish), lit clay dome. The BA.W-NO-GRAY warm floor HOLDS. | PASS — keep |
| **Backend** | `canvas.getContext('webgpu')` returns a live context — the **WGSL primary armed** (BD.W-VIZ-BROKEN-FIX's uniformity fix worked; the Safari-critical twin path is exercised in Chrome). | PASS — the engine is alive |
| **MEATBALL merge/split** | **FAIL.** The plain-blob (variant=blob) frame reads as ONE amorphous soft potato with gentle bumps. Over a full satellite cycle the silhouette elongates into a soft peanut and pinches *slightly* at one end — but there is **no thin neck, no waist, no SPLIT into two distinct beads, no re-merge**. It is a single squishy bean morphing its outline. | **BROKEN — the user's law is unmet** |
| **Liquid quality** | The lit dome is a competent matte-clay / play-doh read. It is sculpted, not WET — no specular travel, no caustic, no mercury sheen that says "liquid". | WEAK — refine |
| **Cartoon punch** | The grounded gel-dome drop-shadow is soft and tasteful — the OPPOSITE of cartoon. No anticipation, no exaggerated squash, no overlapping action on the satellites, no bold offset cel-shadow. | WEAK — elevate |

**THE ROOT CAUSE (source-verified in `constants.ts` + `types.ts`):** the metaball merge/split was **optimized away by
the containment gates.** `BLOB_CONFIG_DEFAULTS.geometry`: `orbitRadius: 0.17` sits **INSIDE** `bodyRadius: 0.22`, and
`eccentricity: 0.05` (near-circular), so satellites never travel far enough to leave the body. `constants.ts:144-158`
(BA.W-GOO-REDRESS) literally states the envelope was TIGHTENED so "the worst-case satellite near-edge stays **within
the widened band's reach across the WHOLE orbit**" — i.e. **a satellite is, by construction, ALWAYS inside the smin
merge band.** It can never separate, so it can never neck or split. The `smoothK: 0.05` was then held DELIBERATELY low
(`types.ts:312`) because a louder band "inflates the whole-canvas lean centroid past the existing `proof:blob-render`
calm-lean ceiling (0.10)". **The merge/split phenomenon the user demands was sacrificed to two synthetic gates
(four-side containment + calm-lean centroid).** This is the gestalt-blocking defect — not a shader bug, a
*choreography* that forbids the very thing it advertises.

---

## 1. The greenfield idea — "a BEAD THAT SPLITS, with WET MERCURY skin and a CEL-INK silhouette"

**The single reframe:** stop treating GooBlob as *one body wearing decorative orbit-nubs*. Treat it as a **small
COLONY of warm-mercury beads** that breathe, drift apart, **neck-split into two beads, then snap-merge back into
one** — the canonical metaball event the reference (and the user) want, run as a *deliberate choreographed cycle*
rather than a containment-suppressed accident. The lit surface becomes genuinely **wet mercury** (a travelling
specular hot-spot + a Fresnel that brightens the necking waist), and the whole creature sits inside a **bold
cartoon cel-ink silhouette** that thickens at the neck during a split (the cartoon "stretch line"). Everything reuses
the EXISTING WGSL/GLSL twin, the existing smin field, the existing satellite system — **no re-fork, no new substrate.**
The fix is **choreography + three shader terms + a geometry re-base**, not a rewrite.

Three pillars, each mapped to the existing engine:

### Pillar A — THE SPLIT IS REAL (the headline; geometry choreography, ZERO new shader)
The smin field already produces a perfect metaball neck **when two bodies are at the right separation** — the math
(`sminCircularG`, the IQ circular smin, `metaball.wgsl.ts:130`) is correct and gate-green. The problem is purely that
the choreography never *puts* a satellite at the necking distance. So:

1. **Re-base the orbit OUTSIDE the body.** `orbitRadius 0.17 → ~0.30`, `bodyRadius 0.22` held, so a satellite at apoapsis
   sits a clean gap beyond the body skin (a SEPARATE bead) and at periapsis necks IN through the smin band. This is a
   pure `BLOB_CONFIG_DEFAULTS.geometry` edit — the field math is untouched.
2. **A FISSION phase added to the satellite lifecycle.** The satellite `SatellitePhase` is today
   `orbiting | merging | absorbed | emerging` (`types.ts:55`). Add a **`fissioning`** beat: a satellite that has been
   absorbed BUDS BACK OUT of the body through a *thinning neck* — the body bulges toward the bud point, the bulge necks,
   the neck thins past the smin threshold, and the bead SNAPS free (the mercury-drop pinch-off). This is the inverse of
   `merging`, driven by the SAME `useBlobSatellites` phase machine + the SAME smin — it just animates the
   separation distance through the smin band's neck-thinning regime instead of holding satellites permanently inside it.
3. **The neck-thinning must clear the AA + smin band so the waist genuinely PINCHES to a hairline then disconnects.**
   The smin band `smoothK` rides UP to ~0.09-0.11 during the merge/fission window (a per-frame, phase-scoped multiplier on
   the existing `uSmoothK` upload — `useBlobMood` already supplies a `smoothK` *multiplier*, `constants.ts:81`, so this is
   a phase term, NOT a new uniform) so the neck is a fat gooey bridge while connected, and the *separation distance*
   (not the band) is what carries it past the pinch-off — the band stays lean-safe at rest, loud only mid-event.

**Why the gates don't block it this time:** the `proof:blob-render` calm-lean ceiling (0.10) measures a whole-canvas
lean centroid at REST. A choreographed split is a transient EVENT (a satellite budding out and snapping free), not a
steady lean — the rest state can stay calm-centred while the *event* is loud. The four-side containment is satisfied by
the canvas already being 160% of the wrapper (`POS_SCALE 0.625`) — an orbit at 0.30 painting at `0.30 × 0.625 = 0.1875`
uv still clears the canvas edge with margin (the body at 0.22 already does). **The gates were over-fit to a tight orbit;
the greenfield re-solves containment against the LOUDER orbit + records the new lean ceiling for the EVENT window.**

### Pillar B — WET MERCURY, not matte clay (the surface refinement; ONE travelling-specular term + a neck-bright Fresnel)
The lit block (`metaball.frag.ts:430-488` / `metaball.wgsl.ts:476-511`) is energy-conserving and tasteful but reads
matte because the specular is a STATIC Blinn-Phong lobe locked to `uLightDir`. Liquid reads liquid when the highlight
**TRAVELS** as the surface breathes and when the **necking waist catches a bright wet rim**:

1. **A travelling specular hot-spot.** Drive the spec half-vector's effective light position with a slow
   `breath()`-phased orbit (the same de-synced multi-sine already in the shader, `metaball.frag.ts:80`) so the wet
   gleam slides across the dome as the bead pulses — a mercury bead's catch-light moves; a clay bead's does not. Pure
   shader, no new uniform (reuse `uPulsePhase` / `uTime`).
2. **A neck-bright Fresnel.** Where the SDF field is in the *necking band* (`abs(d)` small AND the field is a smin
   blend of two sources — readable from the existing analytic gradient magnitude `|fieldGrad|` dipping at the waist),
   LIFT the rim term: a real liquid neck is a bright meniscus catching light around its full circumference. This makes
   the SPLIT *legible as liquid* — the waist glows wet right as it pinches. Reuses the existing `fieldGrad` + Fresnel,
   adds a `wetNeck = smoothstep` band weight, no uniform.
3. **The §3 COLORFUL-FIELD read:** the body stays the warm-cream `paletteStops` default
   (`["#b5947f","#d4b27d","#dad6b1"]`, `types.ts:353` — VERIFIED present, NOT invented), and the per-satellite shade
   (BD.W-GOOBLOB-SAT-SHADE, already planned) gives each splitting bead its OWN derived analogous shade so the moment of
   SPLIT shows two RELATED-but-distinct warm beads pulling apart — the technicolor punch is in the chroma separation at
   the waist, congruent with the warm-cream identity (never a cool default).

### Pillar C — CEL-INK SILHOUETTE + CARTOON PUNCH (the lens signature; CSS-side, off the shader)
The current grounded gel-dome drop-shadow (`GooBlob.vue:312`) is the *calm* register. The 1940s-technicolor lens wants
a **bold layered-offset cel-ink silhouette** — but applied with the §L7 cross-engine discipline (a `drop-shadow()`
filter chain follows the irregular metaball silhouette; a `box-shadow` would stamp a rectangle and miss the necking
satellites — `GooBlob.vue:308` already notes this). The cartoon register:

1. **A bold offset ink-cast** as a THIRD `drop-shadow()` rung — a harder, higher-contrast, larger-offset cast (the
   Memphis cel-stamp the `<Card surface="cartoon">` identity owns, here applied to the blob's silhouette) that travels
   *opposite the motion* on a `--motion-weight`-scaled `transform` (design.md §L4 "the cast is a MOVING cast", line 413)
   — the cel light-source stays fixed while the bead moves. PRM → static cast (design.md §L7 floor).
2. **ANTICIPATION + FOLLOW-THROUGH on the split.** Before a satellite buds out, the body squashes slightly toward the
   bud point (anticipation — "winding up"); as the bead snaps free, the body recoils the opposite way and OVERSHOOTS
   (follow-through), then settles with a damped ring. This rides the EXISTING `useBlobPointer` symplectic spring
   (`PULSE_OMEGA 18`, `PULSE_ZETA 0.35`, `constants.ts:132-135`) — the click-impulse oscillator is re-used as the
   fission recoil impulse, so it is ONE spring, not a new clock. The `breath()` asymmetric slow-exhale already gives the
   bead weight; the fission recoil gives it PUNCH.
3. **OVERLAPPING ACTION on the orbit.** Satellites lag the body's lean (already true via the trail pseudopod) — exaggerate
   it: when the body leans toward the pointer, the budding bead arrives LATE and overshoots, the cartoon "the tail
   catches up after the head". Pure phase-offset on the existing satellite spring, no new mechanism.

---

## 2. The BOLDEST single move

**MAKE THE SPLIT THE DEFAULT, CHOREOGRAPHED EVENT — re-base the orbit OUTSIDE the body and add a `fissioning`
lifecycle beat so a bead VISIBLY necks-thin-and-SNAPS into two warm-mercury droplets, then snap-merges back — the
mercury pinch-off the engine was always capable of but the containment gates had suppressed to a lumpy potato.**

This is bold because it directly overturns the BA.W-GOO-REDRESS containment regime (which the on-disk waves treat as
settled "fit" geometry) on the evidence of the live paint: a blob that cannot split is not a metaball, it is a bean,
and the user's law ("we must NAIL this goo morphing and not have naive ellipsoids") is failed by a *non-splitting*
field just as surely as by overlapping ellipsoids. The move keeps EVERY engine primitive (the smin math, the WGSL/GLSL
twin, the satellite phase machine, the spring) — it changes the **choreography numbers + adds one phase + three shader
terms**, the deftest possible union — but the *result* is a categorically different creature: a living colony of
splitting mercury beads instead of a single lumpy clay drop. It is survival-of-the-fittest applied honestly: the field
math is fit (keep), the surface is weak (refine to wet), the choreography is broken (re-invent the split).

---

## 3. Cross-engine (Chrome + Safari) — the §L7 arms

The whole point of GooBlob is that the metaball is a **GPU SDF field** (not the DOM `filter:url()` goo of the dock
fission — that is the *other* meatball, design.md §L7 line 178). The cross-engine discipline for THIS field:

- **WGSL primary / GLSL fallback parity is the cardinal fence.** Every new term (the travelling specular, the neck-bright
  Fresnel, the fission distance animation) lands in BOTH `metaball.wgsl.ts` AND `metaball.frag.ts` in LOCKSTEP — the
  byte-twin discipline the existing BD.W-GOOBLOB-SQUIRCLE-REFRACT §3a-D names. The Pillar-A geometry re-base is CPU-side
  (`useBlobSatellites` + `BLOB_CONFIG_DEFAULTS`), OFF the GL fence entirely — no shader touch, no parity risk.
- **The `fwidth()` uniformity trap is the Safari/Metal landmine** — already cured (BD.W-VIZ-BROKEN-FIX hoisted both
  `fwidth` sites into uniform control flow, `metaball.wgsl.ts:352,377`). Any new term must NOT re-introduce a derivative
  inside a per-fragment branch; the neck-bright Fresnel reads the *already-computed* `fieldGrad` (no new derivative), so
  it is uniformity-safe by construction. **This must be re-verified on a real WebKit/Metal capture — the paired-engine
  π is the acceptance proof (design.md §L7 line 189), never a single-engine green.**
- **PRM floor:** under `prefers-reduced-motion`, the substrate freezes the rAF (`tempo → 0`) — the fission cycle stops,
  the bead rests as a single warm-cream droplet (a calm static metaball, no neck frames). The cel-ink cast goes static.
  This is the existing `tempo`/PRM seam, reused.
- **The static `WatercolorDot` companion** (the zero-GL register below the hero, `blob.vue:41`) is the
  `@supports`-not-WebGL floor — already shipped, the SVG `color-interpolation-filters: sRGB` cross-engine goo. Keep.

---

## 4. a11y / PRM carve

- **PRM:** fission cycle + travelling specular + recoil + cel-cast travel ALL freeze; the bead rests as a single calm
  warm-cream metaball. The substrate `tempo=0` freeze already does this for the field; the cel-cast CSS adds the
  `@media (prefers-reduced-motion)` static arm (`GooBlob.vue:334` already has the pattern).
- **WCAG 2.2.2 pause:** the `v-model:paused` seam (`GooBlob.vue:66`) + `DockBackgroundToggle` parks the loop for ALL
  users — unchanged, reused.
- **Offscreen park:** `content-visibility:auto` + the substrate's intersection/`contentvisibilityautostatechange` park
  (`GooBlob.vue:299`) freezes the cycle when scrolled away — unchanged.
- **`prefers-contrast: more`:** the cel-ink cast opacity floors UP (the inked edge is a legibility asset — design.md
  §L4 line 413 precept), reused.
- **`prefers-reduced-transparency`:** does not touch the cel-ink (opaque ink, survives as a bonus legibility anchor).
- **aria-hidden:** the canvas stays `aria-hidden="true"` (decorative substrate) — unchanged.

---

## 5. DELTA-ASSAY — reconcile vs the 116 union waves (no dup)

Grepped the BD waves; THREE blob waves on disk, all of which this lens **unions with** (no re-fork, no new parallel wave):

| Existing wave | What it owns | This lens' relationship |
|---|---|---|
| **BD.W-GOOBLOB-SQUIRCLE-REFRACT** | arm 1 = the ⁴√ squircle dome-Z (lockstep `.frag`+`.wgsl`); arm 2 = the conditional `uBackdrop` Snell refraction. Owns the metaball.frag byte-untouched canon reconcile (§7). | **CONSUME, do not dup.** Pillar B's travelling-specular + neck-Fresnel terms RIDE the SAME single metaball re-touch this wave anchors (the sanctioned GL-seam widen) — they are ADDITIONAL surface terms on the one lockstep shader edit, re-snapshotting M2 the same way. The squircle dome-Z is *complementary* (a beveled wet dome reads more liquid). **No new shader re-touch.** |
| **BD.W-GOOBLOB-SAT-SHADE** | per-satellite OKLCh-derived shade (the satColor lane). | **CONSUME.** Pillar B's "two related-but-distinct beads at the split" IS this wave's per-satellite shade made *legible by the split* — the sat-shade is invisible while satellites are permanently merged (today); the fission split is what makes the derived shades READ. The lens gives sat-shade its reason to exist. |
| **BD.W-BLOB-MOTION-TUNE** | arm 1 = pulse-zeta flinch tune; arm 2 = flick-stretch read-or-honest-down. | **CONSUME + EXTEND.** Pillar C's anticipation/follow-through recoil reuses the SAME `PULSE_ZETA`/`PULSE_OMEGA` spring this wave tunes. The fission recoil is a new *trigger* for the existing impulse, not a new spring. |

**THE GENUINELY NEW AMENDMENT this lens proposes (the gap the 3 waves do NOT cover):** a
**`BD.W-GOO-FISSION-SPLIT`** wave (or amend BD.W-BLOB-MOTION-TUNE) carrying (i) the orbit-OUTSIDE-body geometry re-base
+ the new `fissioning` `SatellitePhase` beat (CPU-side, off the GL fence); (ii) the containment + lean-ceiling gate
**re-solve** for the EVENT window (the `proof:blob-render` calm-lean ceiling re-derived: rest stays calm, the split
event is a recorded transient); (iii) the dedicated feature-π — a `tests-visual/goo-fission.spec.ts` frame-series that
asserts the silhouette **goes from one connected blob → a thin-necked waist → TWO disconnected beads → re-merged**
(a topology/connected-components readback over the decoded silhouette, the `goo-redress.spec.ts` silhouette-mask
precedent), born-RED on the current non-splitting potato, BOTH modes, PAIRED-ENGINE. This is the assay's output: the
split choreography is **unowned by any of the 3 existing waves** (they tune surface, color, and spring — none re-opens
the suppressed orbit envelope), so it is the net-new wave, deftly unioned with the surface/color/spring waves it shares
the one metaball re-touch with.

**No dup with the goo-morph CSS worm** (the dock/pager goo-morph, design.md §L4 / the `goo-morph/golden/barbell-neck`
spike) — that is the DOM `filter:url()` metaball; THIS is the GPU SDF field. Distinct engines, distinct waves, named so.

---

## 6. The one-screen spec extract (for the executing wave)

1. **Geometry re-base (CPU, off the GL fence):** `orbitRadius 0.17 → ~0.30`, `eccentricity 0.05 → ~0.12`, hold
   `bodyRadius 0.22`; re-solve four-side containment against the louder orbit (the canvas 160% margin already covers it).
2. **New `fissioning` `SatellitePhase`** in `useBlobSatellites` — the inverse of `merging`: bud-out through a thinning
   neck, animate the *separation distance* (not the band) past the smin pinch-off, snap free. Phase-scoped `smoothK`
   multiplier rides UP mid-event (reuse the mood multiplier seam), lean-safe at rest.
3. **Three lockstep shader terms** (ride BD.W-GOOBLOB-SQUIRCLE-REFRACT's one re-touch, re-snapshot M2):
   travelling specular (breath-phased half-vector), neck-bright Fresnel (`|fieldGrad|`-waist band, no new derivative),
   per-satellite split shade (consume SAT-SHADE).
4. **Cel-ink cast + cartoon punch (CSS, off the shader):** a third bold offset `drop-shadow()` rung that travels
   opposite the motion (`--motion-weight`); anticipation/follow-through recoil on the existing fission impulse spring;
   overlapping-action satellite lag. PRM → static.
5. **Cross-engine:** WGSL/GLSL lockstep; no new `fwidth` in non-uniform flow; PRM `tempo=0` rest; paired-engine π is the
   proof. **WebKit/Metal capture REQUIRED — single-engine green is not acceptance.**
6. **Gate:** `tests-visual/goo-fission.spec.ts` — connected-components topology readback proving merge→neck→split→re-merge,
   born-RED on the potato, both modes, paired engine. Plus the warm-cream floor (`proof:blob-warm-default` ≥0.62) HELD.

**Survival of the fittest:** the smin field math (fit, keep) · the WGSL/GLSL twin (fit, keep) · the satellite phase
machine + spring (fit, extend with `fissioning`) · the warm-cream palette default (fit, keep) · the matte-clay surface
(weak, refine to wet mercury) · the containment-suppressed non-splitting orbit (BROKEN, re-invent the split). No legacy,
no fork, one union.
