# W-AUR-METAL CRITIQUE — the metallic ×2 (RUTHLESS / ADVERSARIAL)

**Lane** BD viz-research / critique · **Status** AUTHORED 2026-06-22 · **Branch** `prototype/liquid-dock` ·
**Substrate-checked** against HEAD `src/components/custom/aurora/constants/shaders/{aurora.frag.ts, mediums.glsl.ts, aurora.wgsl.ts, aurora-mediums.wgsl.ts}`, `composables/{uniformBridge.ts, uniformBridgeWGPU.ts}`, `constants/presets.ts` ·
**Reviews** `fleet2/metallic-aurora.md` (the spec) + `VIZ-BAND-PLAN.md:80` (the W-AUR-METAL row) · cross-reads `critique/{field-engine, gpu-only, generalize-no-hardcoded}.md`

> **VERDICT UP FRONT:** the perceptual READ goal (anisotropic specular ridges + sparkle = liquid metal, not plastic) is achievable and the math is the right family. But the spec is built on **THREE phantom substrate claims that are false at HEAD** — (1) `uLightDir` does NOT exist in the WGSL uniform struct, so the "Safari-first FULL lockstep no-degrade" catch-light has no substrate to ride; (2) the `metal==10 / metal-gradient==11` slots assume `satin==8`/`burst==9` already landed, but the on-disk `MEDIUM_ID` stops at `kuwahara: 7` (those siblings are phantom pool-claims in unmerged specs); (3) the ≥2-consumer bar rests on `W-AUR-ALBUM` — itself a TIER-A D7 overfit-name offender the sibling critique condemns as the disease. The parity claim (ΔE≤2 for a BRDF + sparkle RNG across WebKit-Metal vs Chrome) is **un-verifiable at the gate level**: `field-engine.md` proves `proof:gpu-substrate-single`'s ΔE is a demoted regex-transcription + luminance-mean proxy, NOT numeric. This is CHALLENGE-class, not polish.

---

## 1. Does it READ as liquid metal, or as plastic/noise? — QUALIFIED YES, with two real risks

The core physics is sound. Three facts make the metal-vs-plastic distinction REAL and the spec gets all three right in PROSE:

- **F0=albedo metallic Fresnel tint** (§2.5, §3.5) is the load-bearing perceptual fact. Gold crests carry gold (not white); chrome carries white. The spec names it correctly — this is what separates metal from glossy plastic, and it is the single most important line. ✓
- **Anisotropic Kajiya-Kay streak** (§2 "the load-bearing formula") gives the directional banding the ref shows, vs the round isotropic Blinn-Phong highlight (= plastic). The anti-pattern bite (`proof:aur-metal` W2 "isotropic-Blinn-Phong reds") is the right gate. ✓
- **Orientation-gated sparkle** (§2 sparkle field) — gating each glint on the micro-facet facing `uLightDir` is what makes it read as metallic FLAKE not film grain. The distinction (vs a random white speck) is correctly stated. ✓

**BUT the read has two real failure modes the spec hand-waves:**

**(A) The Kajiya-Kay streak `sinTH = sqrt(1 - dot(T,H)²)` needs a HALF-VECTOR `H`, which needs a VIEW direction AND a LIGHT direction — neither exists meaningfully in a 2D procedural field.** Aurora is a flat fullscreen pass with no camera and no Z. `H = normalize(L + V)`. The spec supplies `L` via `uLightDir` (which is itself broken — §2 below) but NEVER defines `V` (the view vector). For a fullscreen 2D field the honest `V` is `(0,0,1)` (straight at the screen), which makes `H` collapse to `normalize(L + ẑ)` — a CONSTANT across the whole field. A constant `H` means `dot(T,H)` varies ONLY with `T` (the tangent), so the "streak" degenerates to a pure function of the structure-tensor orientation — it will read as **the tensor field tinted**, not as a moving specular crest. The ref's "sharp catch-lights in the crests, deep dark valleys" requires the highlight to depend on the HEIGHT-FIELD NORMAL (`N`, the luma gradient), which the spec lists in §3.3 but then the §2 formula `pow(sinTH, s)` **does not consume `N` at all** — `sinTH` is purely `T·H`. The valleys-vs-crests contrast comes from `N·L`/`N·H`, which the compact Kajiya-Kay form drops. So as written, the formula gives directional banding but NOT the crest/valley specular roll-off the ref's "dark→bright over a small spatial step" demands. **This is a real math gap: the spec conflates two terms (the anisotropic streak `f(T,H)` and the height-field specular `f(N,H)`) into one, and only writes the first.** A faithful metal read needs BOTH — the streak masks WHERE the highlight runs (along the ridge) and the height-normal specular sets the CREST brightness. `uMetalPolish` (the crest/valley contrast knob, §3.6) is the height-normal term in disguise, but §2's formula has no `N·H` for it to scale. Fix or it reads as a tinted tensor-orientation map, not folded liquid metal.

**(B) The sparkle "scintillates slowly over `t` so it twinkles" (§3.2-metal-gradient) is a determinism trap.** A per-frame-advancing hash seed (`hash21(p*scale + t*k)`) produces a NEW random field every frame → the sparkle does not "twinkle in place," it BOILS (every speck relocates each frame). The ref is a STATIC flake field that glints as the surface flows under it (the flake stays put, the light moves). To twinkle-in-place you advance the GLINT PHASE per flake, not the flake POSITION — i.e. `hash` the cell ONCE (stable position) and modulate brightness by `sin(t + cellPhase)`. The spec's "the hash seed advances" produces the wrong motion (a noise-field crawl, indistinguishable from film grain in motion — exactly the "reads as noise" failure the goal forbids). This is a concrete way it reads wrong.

---

## 2. THE PHANTOM `uLightDir` — the catch-light has no WGSL substrate (parity claim is FALSE at HEAD)

The spec's entire catch-light mechanism rests on §2.catch-light + §4: *"riding the existing movable `uLightDir` (cursor-as-light — already wired, AW.W8)."* **This is false on the WGSL side, which is the load-bearing Safari path.**

- `uLightDir` exists ONLY in the WebGL2 impasto/stroke-cascade path (`uniformBridge.ts:285` — `cfg.lightDir ?? [-0.5, 0.6, 0.62]`, fed to `relightImpasto`). It is a vec3 in the GLSL impasto seam.
- **It is ABSENT from the WGSL uniform struct.** I read `uniformBridgeWGPU.ts` offsets 0–576 in full: scalars0–5, cursor, ints0/1, palette, nuc0/1/2, kuwahara. There is `uCursor`/`uCursorStrength`/`uCursorRadius` — but **NO `uLightDir` lane.** The WGSL `applyMedium` (`aurora-mediums.wgsl.ts:300`) and `aurora.wgsl.ts` carry no light-direction uniform at all.

So the spec's §5 claim — *"both mediums MUST have a byte-lockstep WGSL body … metal is a FULL WGSL port (the BD-mandate posture)"* — is **un-satisfiable as scoped.** A WGSL metal body that needs `uLightDir` requires FIRST plumbing a new `uLightDir` lane into the WGPU struct (a byte-layout change), wiring the cursor-as-light AW.W8 write-path into the WGPU pack (it is WebGL2-only today), and re-verifying every existing parity offset. That is substrate work the spec assumes is done. **The spec under-scopes by an entire uniform-plumbing sub-wave** and mis-states it as "already wired."

Worse, this collides with the actual WGSL degrade reality: `applyMedium` in `aurora-mediums.wgsl.ts:308` degrades oil/vangogh/oil-pastel(3/5/6) to kuwahara — the WGSL primary does NOT carry the full stroke cascade where `uLightDir` lives. The spec's "metal is NOT the degrade-to-smooth path oil/vangogh took" is true, but it ignores that the catch-light input it depends on lives on the SIDE OF THE FENCE that degrades. **To deliver a Safari catch-light you must port a light direction that has never crossed to WGSL.** This is the single biggest under-claim in the spec.

(Caveat in the spec's favor: `structureTensorField`, `sampleBase`, `flowField` DO exist on the WGSL side — `aurora-mediums.wgsl.ts:56,76`. So the structure-tensor reuse for the ANISOTROPY DIRECTION is genuinely sound on both backends. The break is specifically the light/catch-light input.)

---

## 3. Structure-tensor tangent reuse for anisotropy direction — SOUND, with a coherence-semantics bug

The reuse is the spec's strongest claim and it is correct: `structureTensorField(p, t, flowField(p,t))` returns `vec3(dir.xy, A)` where `dir` is the coherence-blended edge-tangent and `A∈[0,1]` is coherence (`mediums.glsl.ts:77-90`). The kuwahara precedent (`mediums.glsl.ts:401-403`) reads exactly `tangent = stf.xy; A = stf.z` — so metal reusing it is byte-precedented, ONE Sobel, no re-roll. ✓

**BUT §3.4 inverts the coherence semantics:** *"lobe width by `(1-A)` (flat zones → broad, coherent ridges → tight streak)."* Read against the source: `A≈0` in FLAT zones (low coherence), `A≈1` in COHERENT ridges. So `(1-A)` is HIGH in flat zones, LOW in ridges — which the spec then maps to "broad in flat, tight in ridges." That direction is correct, BUT the existing kuwahara precedent uses `aniso = mix(1.0, 0.34, A)` (`mediums.glsl.ts:411`) — i.e. it squeezes by `A` directly, not `(1-A)`. The spec introduces a SECOND, inconsistent anisotropy parameterization (`(1-A)` vs the shipped `mix(...,A)`). Minor, but it means the spec has NOT actually grounded its lobe-width formula against the precedent it claims to reuse — a reviewer should force it onto the shipped `mix(broad, tight, A)` form, not a hand-rolled `(1-A)`.

**Second concern:** the tangent in flat zones relaxes to `flowField(p,t)` (the fallback). In a low-coherence aurora region the "ridge direction" is then just the global flow — so the metal streak in flat zones runs along an ARBITRARY global direction, not a ridge (there is no ridge). The ref's flat-gradient regions (metal-gradient base) should read as a SMOOTH gradient with no banding there — but a streak-along-fallback-flow will paint phantom banding in zones that have no structure. The `(1-A)→broad` widening MITIGATES this (broad lobe ≈ no streak) but does not eliminate it. The spec should gate the streak amplitude on `A` (fade the anisotropic term to zero as `A→0`), not just widen the lobe — otherwise metal-gradient gets phantom directional banding in its smooth zones.

---

## 4. WGSL↔GLSL parity for a BRDF + sparkle RNG — the ΔE≤2 bar is UN-VERIFIABLE, and the spec self-exempts the hard part

Two layers of problem:

**(A) The gate cannot measure what the spec promises.** `field-engine.md §4` (cross-critique, binding) establishes that `proof:gpu-substrate-single`'s ΔE is *"a captured-PNG luminance proxy, mostly DEMOTED to enrollment … the structural-proxy ΔE-0.0 is 'demoted to enrollment' and the real ΔE needs a Metal-GPU capture (rides W-REFLECT)."* So the metal-row "mean ΔE≤2.0 / p99≤5.0" (§5, §8) is, at the device-free gate, a **regex transcription check + a luminance mean** — NOT numeric BRDF equivalence. A subtly-divergent specular exponent or a `pow`/`atan` precision split between WebKit-Metal and Chrome ANGLE passes the gate green. The spec rests its "Safari-first no-degrade" safety on a bar that does not exist yet for this class of math.

**(B) The spec EXEMPTS the sparkle from parity — which is most of metal-gradient's signature.** §5 fence: *"the sparkle PATTERN may differ sub-pixel between GLSL/WGSL `hash21` rounding, so the parity bar is read on the MACRO field … the sparkle is a high-freq overlay below the ΔE-on-downsample threshold."* I verified the two `hash21` bodies — they are **ALGEBRAICALLY IDENTICAL** (`aurora.frag.ts:161` ≡ `aurora.wgsl.ts:94`: `fract(p*vec2(123.34,456.21)); p += dot(p,p+45.32); fract(p.x*p.y)`). So the divergence is NOT "different functions" — it is float evaluation-order/precision between Metal and ANGLE for `fract(p.x*p.y)`, a notoriously precision-sensitive op (large products → catastrophic cancellation in `fract`). The spec is RIGHT that the per-speck pattern will diverge, but the consequence is worse than admitted: a thresholded glint field (`only top few % fire`) is a STEP function on a precision-divergent hash — a speck that fires on Metal but not ANGLE (or vice versa) is a 0→1 brightness swing at that pixel, and across a dense field these aggregate. Downsampling averages them, so the macro-ΔE survives — but the LIVE π (full-res) will show a visibly different sparkle on the two backends. **The spec quietly concedes metal-gradient's signature feature is NOT parity-bound, then claims "FULL lockstep no-degrade."** Those are in tension. metal-gradient on Safari and Chrome will look DIFFERENT at the sparkle scale, and the spec's own fence admits it while the headline denies it.

**(C) The trig/RNG determinism question is real and unaddressed.** A BRDF needs `pow`, `sqrt`, `atan` (for sector/orientation); the sparkle needs `fract`/`floor`. `atan(sin(d),cos(d))` (the kuwahara wrap idiom, `mediums.glsl.ts`) and `pow(x, highExponent)` are the two most backend-divergent ops. The spec does NOT address whether the HIGH specular exponent (`shininessAniso` for the "sharp polished crest") amplifies a tiny `T·H` precision split into a visible highlight-position shift. A `pow(0.998, 200)` vs `pow(0.9981, 200)` is a large relative delta. The narrower the crest (the metal read), the MORE parity-fragile it is. **The sharp-crest goal and the ΔE≤2 parity bar are in direct tension, and the spec resolves neither.**

---

## 5. Single-pass / no-FBO — TRUE, and correctly budgeted

This claim holds. ✓ Metal reuses the ONE `structureTensorField` call (8 `sampleBase` taps, `mediums.glsl.ts:43-50`) the kuwahara/satin path already pays, plus a 2–4-tap luma gradient for `N`. No neighborhood blowup, no second Sobel, no FBO ping-pong. The kuwahara precedent (32 procedural taps, `mediums.glsl.ts`) is heavier; metal is cheaper. `proof:offscreen-pause`/PRM-freeze untouched. The "no FBO except multi-pass kuwahara" framing is accurate. The sparkle is a single extra `hash21` per fragment — negligible. **This is the one section with no objection.** (The §3.3 "2-tap central difference for the normal" is fine for `N`, though it is one more reason the §2 formula MUST consume `N` — see §1A — or those taps are computed and discarded.)

---

## 6. The 5 uniforms — bounded but NOT byte-stable-as-claimed, and one redundant default

`uMetalPolish/Tint/Aniso/Sparkle/Bleed`, read only inside `uMedium==10/11`, default-zeroing the discriminators (`uMetalSparkle=0`/`uMetalBleed=0` for `metal`). The "read only inside the branch → zero effect on smooth/oil/kuwahara → default byte-identical" logic is SOUND. ✓ The `smooth==0` no-op pass-through is genuinely untouched (the WGSL `applyMedium` returns `col` for `medium==0`, `aurora-mediums.wgsl.ts`). ✓

**BUT "append-at-end so existing offsets are byte-stable" (§4, §9) is imprecise.** The WGPU struct (`uniformBridgeWGPU.ts:10-27`) has EXISTING PAD LANES: `scalars3.w` (off 60, currently `0`), `ints1.y/z/w` (off 100/104/108), `nuc2.y/z/w`, `kuwahara.z/w` (off 568/572). 5 scalars could fit into existing pad slots (`scalars3.w` + a new `scalars6` vec4 = 4 lanes, with 1 spilling) WITHOUT growing the 576-byte buffer if packed into pads — OR appending a clean `scalars6: vec4` (4 lanes) + 1 spilling into a pad. The spec says "append at end" which is SAFE (576→592) but the claim "byte-stable offsets" is only true for the PRE-EXISTING lanes; the spec does not specify whether the 5 metal scalars pack into 2 new vec4s (8 lanes, 3 wasted) or scavenge pads (alignment-fragile). **A reviewer must force the exact lane assignment** — a careless metal-uniform pack that reorders or mis-aligns is exactly the std140-vs-WGSL garbage-read trap `uniformBridgeWGPU.ts`'s whole header warns against. "Bounded" ✓; "byte-stable" needs the explicit lane map the spec defers.

**Redundant default:** `uMetalTint` default `~0.85` and `uMetalPolish` default `~0.7` for `metal` vs `~0.35` for `metal-gradient` — these are fine, but `uMetalAniso` default `~0.8` is read against a structure-tensor `A` that the existing `blendW = pow(A, 0.28)` (`mediums.glsl.ts:88`) already strongly biases. Stacking a second anisotropy multiplier on an already-A-biased tangent risks over-orienting (the §4.2 "too isotropic" lift was tuned for the EXISTING consumers; metal adds a third multiplier). Not a blocker, but the default is asserted, not grounded against the tuned tensor.

---

## 7. The ≥2-consumer bar — FAILS D7 (the second consumer IS the disease)

§7/§8 claim ≥2 consumers: *"(1) the demo aurora studio metal preset + (2) the iOS-27 flow-field-background register (the now-playing dock pill backdrop / the `BD.W-AUR-ALBUM` album-reactive metallic field)."*

**Consumer #2 is `W-AUR-ALBUM` — a TIER-A D7 overfit-name offender.** `generalize-no-hardcoded.md` (sibling critique, binding) lists `W-AUR-ALBUM` as census row **A13** (wave name), `proof:aur-album` as **A14**, `albumPalette.ts` as **A15** (a LIBRARY file on `/aurora`), `aurora-album` as **A16** (gestalt row). The metal spec leans its second consumer on the exact wave D7 says must be RENAMED and `proof:no-hardcoded-ref`-born-RED. The prompt's own binding constraint — *"a generalized backdrop — NOT an app-overfit 'iOS-27 flow-field' name per D7"* — is **violated verbatim**: §7 names "the iOS-27 flow-field-background register" as the consumer.

So the metal medium has **ONE honest consumer** (a demo preset). The "two surfaces by construction" (§8) is circular — it asserts the iOS-27/album register exists as a consumer, but that register is itself an un-landed, un-renamed, D7-condemned wave. **The ≥2-bar is NOT met with a generalized second consumer.** A real second consumer would be: a generic `<Aurora medium="metal">` backdrop behind ANY content surface (a card, a hero, a dock) named WITHOUT "album"/"iOS-27"/"now-playing" — e.g. the generalized `W-DOCK-CONTENT-FIELD` (D7's rename target) IF that lands generalized. As written, the spec inherits the disease.

---

## 8. Over-claims — the headline census

1. *"already wired, AW.W8"* (`uLightDir`) — FALSE on WGSL (§2). The catch-light input does not exist on the Safari path.
2. *"WGSL FULL lockstep (no degrade-to-smooth)"* (`VIZ-BAND-PLAN.md:81`, §5) — UN-DELIVERABLE without first plumbing `uLightDir` into the WGPU struct; AND self-contradicted by the §5 sparkle parity-exemption (the signature feature is NOT lockstep).
3. *"the free slots after kuwahara==7 … metal==10, metal-gradient==11"* (§3) — FALSE premise: `MEDIUM_ID` stops at `kuwahara: 7` on disk; `satin==8`/`burst==9` are phantom pool-claims in unmerged specs. Metal should slot `8`/`9` at HEAD (the `satisfies Record` will force it), NOT `10`/`11`. The spec hedges ("shift if those land first") but the headline number is wrong-by-default and will mis-coordinate the WGSL `applyMedium` dispatch arms.
4. *"≥2 consumers"* (§7) — one honest consumer; #2 is the D7 disease (§7 above).
5. *"the OKLab parity holds WGSL↔GLSL"* (§8 π) — un-measurable at the gate (field-engine.md); the live π WILL show divergent sparkle (§4B).
6. *"the metal read comes from the SHADING not the hue"* (§1) is correct, but the §2 formula as written produces an orientation-tinted tensor map, not crest/valley specular shading (§1A) — the prose goal and the formula diverge.

---

## 9. Verdict + the minimum fixes to make it buildable

**The medium is worth building — the perceptual target is right and most of the math family is correct — but the spec is NOT implementation-ready.** It is a planning doc that asserts substrate it does not have. The minimum corrections:

1. **Plumb `uLightDir` into the WGPU struct as its OWN sub-step** (a new lane + the cursor-as-light WGPU write-path), or re-scope the catch-light to a uniform that DOES cross to WGSL today (`uCursor`-derived light from the cursor position is the honest reuse — the cursor exists in the WGPU pack; the "movable light" is the cursor vector, not a separate `uLightDir`). The latter is the KISS fix and avoids a struct-layout change.
2. **Fix the §2 formula to consume `N`** — the metal read needs BOTH the anisotropic streak `f(T,H)` (WHERE) AND the height-normal specular `f(N,H)` (CREST BRIGHTNESS). One without the other reads as a tinted tensor map.
3. **Fix the sparkle to twinkle-in-place** (stable cell hash + per-flake phase), not a `t`-advanced seed (which boils → reads as noise).
4. **Re-slot to `8`/`9` at HEAD** and let `satisfies Record` force coordination if satin/burst land first.
5. **Replace consumer #2 with a generalized, D7-clean surface** (no album/iOS-27/now-playing in any name).
6. **Demote the parity headline to honest** — "macro-field ΔE bar (regex+luminance at the gate; Metal-GPU capture rides W-REFLECT); sparkle is NOT parity-bound and WILL diverge per-backend" — and stop claiming "FULL lockstep."
7. **Specify the exact uniform lane map** (no "append-at-end" hand-wave over a struct with live pad lanes).

---

## Sources
- HEAD: `aurora/constants/shaders/{aurora.frag.ts:161 (hash21), mediums.glsl.ts:40-90 (structureTensorField), :401-470 (mediumKuwahara precedent)}`, `aurora.wgsl.ts:94 (hash21), aurora-mediums.wgsl.ts:56,76,300-320 (sampleBase/structureTensorField/applyMedium degrade)`, `uniformBridge.ts:285 (uLightDir WebGL2-only), uniformBridgeWGPU.ts:10-27 (struct offsets — NO uLightDir lane), :42-56 (MEDIUM_ID stops at kuwahara:7)`, `presets.ts:61 (AuroraMedium union, no satin/burst)`
- `fleet2/metallic-aurora.md` (the spec) · `VIZ-BAND-PLAN.md:80-81`
- `critique/field-engine.md §4` (the parity net is regex+luminance, not numeric — binding cross-finding)
- `critique/generalize-no-hardcoded.md` rows A13-A16 (`W-AUR-ALBUM` is the TIER-A D7 disease the consumer-#2 inherits)
