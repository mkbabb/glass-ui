# Metallic aurora ×2 — the flow-field metal register (W-AUR-METAL)

**Lane** BD viz-research / fleet2 / metallic-aurora · **Status** AUTHORED 2026-06-22 · **Branch** `prototype/liquid-dock` ·
**Substrate-grounded** against `src/components/custom/aurora/constants/shaders/{aurora.frag.ts, mediums.glsl.ts, aurora.wgsl.ts, aurora-mediums.wgsl.ts, brush.glsl.ts}`, `composables/uniformBridge.ts`, `constants/presets.ts` at HEAD ·
**Scope** PLANNING/RESEARCH ONLY — zero `src/` edits.

> Read alongside `research/aurora.md` (§1 shipped SOTA, §5 M2 satin / M3 burst / M4 caustics — the metal medium is the next member of the SAME `uMedium` ladder), `media-analysis.md §A` (the two refs), `arch/no-fallback-policy.md` (the WGSL-lockstep Safari-first floor — a metal config must NEVER silent-degrade on Safari), and the BD union mediums (`BD.W-AURORA-WGSL-STROKES`, `BE.W-AUR-SATIN`).

---

## 0. TL;DR

The user asked for "a suffused new aurora variant, metallic, redolent of the iOS-27 flow-field backgrounds. Two variants." This spec mints TWO NEW painterly mediums on the EXISTING `uMedium` dispatch ladder — `medium: "metal"` (pure liquid-gold/chrome specular ridges) + `medium: "metal-gradient"` (warm copper→bronze gradient + sparkle grain + chromatic bleed). Both are single-pass fragment overlays following the established kuwahara/satin/oil precedent: a type-union member, a `MEDIUM_ID` slot, a GLSL `.frag` body, a byte-lockstep WGSL body (Safari-first), an atom-door case. **Default byte-identical** (no preset selects them; `smooth==0` is untouched). The OKLCh field drives the metallic GRADIENT; an anisotropic specular term + a flow-aligned catch-light ride the field's OWN structure tensor. This is a paint-only render — no new substrate, no new rAF, no Canvas2D, no FBO.

The metal medium is the **iOS-27 satin/flow-field-background register** the `vid-aurora` frames carry — it is the painterly-medium sibling of satin (`==8`, pool-claimed) and the literal answer to "metallic gradient-like flow field."

---

## 1. The two references — frame-read deltas

### metal-pure.jpg ("METAL FLOW / Liquid Metal") → `medium: "metal"`
- **Vertical undulating specular RIDGES** — smooth flowing liquid-gold/chrome folds, oriented (vertical-ish, following the flow). NOT isotropic; the light banding is anisotropic, aligned to the flow direction.
- **Sharp catch-lights in the crests** — bright thin highlight stripes where a ridge faces the light; deep DARK valleys between (high contrast specular, narrow highlight lobe).
- **Polished, NO sparkle, NO grain** — a clean continuous specular surface; the metal read comes from the gradient roll-off (dark→bright over a small spatial step, the metallic Fresnel-like edge), not texture.
- **Monochrome-metal palette** — gold here; chrome/steel/copper are palette choices. The metal read is the SHADING (the anisotropic specular BRDF), not the hue.

### metal-gradient.jpg → `medium: "metal-gradient"`
- **Warm copper→bronze→gold gradient** — a soft large-scale luminance+hue ramp (top-left brighter/cooler-copper, bottom-right deeper/warmer-bronze). The base is a smooth metallic gradient, far less ridged than pure-metal.
- **Fine SPARKLE grain** — dense glittering sub-pixel specks scattered over the whole field (a metallic-flake / glitter-paint field): high-frequency random bright glints, each a tiny point catch-light. This is the medium's signature.
- **Subtle chromatic BLEED** — faint other-hues bleeding into the metal base (a hint of multi-hue iridescence over the warm base); imperfection-rich, softer.
- → a metallic gradient + a high-freq sparkle field (random glints) + a bounded chromatic-aberration-style hue drift over the metal base.

### The iOS-27 connection
`vid-aurora` (Apple Music generative backgrounds) carries a SATIN/metallic-sheen flowing-gradient quality on several frames. The metal medium is the iOS-27 flow-field-background register — the metal mediums + the album-reactive single-hue register (`BD.W-AUR-ALBUM`) compose: a metallic-gold field that absorbs the playing album's hue and flows. The satin medium (`==8`, pool) is the SOFTER sheen sibling; metal is the sharp-specular sibling. They share the structure-tensor flow read; they differ in the highlight lobe (satin = broad folded-silk sheen; metal = narrow polished crest).

---

## 2. The metallic-specular math (the SOTA grounding)

The metal read is a **flow-aligned anisotropic specular BRDF over a procedural height field**, where:
- the **height field** is the existing domain-warp magnitude / value-modulation (the ridges are where the warped field folds — `domainWarp` already gives us the fold geometry);
- the **surface normal** is the gradient of that height field (a `sampleBase`-luma gradient — the SAME Sobel the `structureTensorField` already computes; we reuse it, not re-roll);
- the **anisotropy** runs along the structure-tensor edge-TANGENT (the ridge direction) — an anisotropic specular lobe stretched along the flow, narrow across it, gives the directional metal banding the ref shows;
- the **catch-light** is a narrow, high-power specular highlight (`pow(NdotH, shininess)` with a HIGH shininess for the sharp polished crest) riding the existing movable `uLightDir` (cursor-as-light — the catch-light runs where the pointer is, the satin-extension idea from `research/aurora.md §5 M2`);
- the **metallic Fresnel** tints the specular with the BASE color (metals tint their specular highlight by their albedo — a key gold-vs-chrome difference: gold's highlight is warm-gold, chrome's is white). This is the F0=albedo metallic-workflow fact: for a metal, the specular reflectance F0 ≈ the base color, so the catch-light carries the gold hue, not white. THIS is what makes it read as metal and not glossy plastic.

### Anisotropic specular — the load-bearing formula
The isotropic Blinn-Phong `pow(max(dot(N,H),0), s)` reads as a round highlight (plastic). The metal banding wants the **Ward/Kajiya-Kay anisotropic lobe**: split the half-vector into its components along the tangent `T` (ridge direction) and bitangent `B`, weight them by separate roughness `αT` (low — tight along the ridge) and `αB` (high — broad across), so the highlight stretches into a STREAK along the flow. The compact GPU form (Kajiya-Kay hair / brushed-metal):
```
sinTH = sqrt(1 - dot(T,H)²)        // the half-vector's angle off the tangent
spec  = pow(sinTH, shininessAniso)  // a streak perpendicular to T, running ALONG T
```
This is cheaper than full Ward and gives the brushed/flowing-metal streak directly. The crest sharpness is the `shininessAniso` exponent (high → narrow polished crest; the ref's sharp catch-lights).

### The sparkle field (metal-gradient signature)
A **high-frequency glint field**: sample a hash-noise at a fine spatial scale, threshold it HIGH (only the top few % fire), and where it fires, add a tiny specular point IF that micro-facet's orientation faces the light (a glint is a sub-pixel mirror facet catching the light). The orientation gate (not just a random white speck) is what makes it read as metallic flake and not film grain — each sparkle is a micro-specular event, biased brighter where the macro-surface already faces the light. Bounded, default-off-magnitude for `metal`, ON for `metal-gradient`. SOTA anchor: the stochastic-glint / multiscale-microfacet sparkle (Jakob et al. "discrete stochastic microfacet" / the cheap shader-glitter idiom — a thresholded animated hash glint, NOT a full LEADR/NDF-importance model; single-pass).

### The chromatic bleed (metal-gradient)
A bounded per-channel UV offset on the palette sample (R/G/B sampled at slightly different field positions, scaled by the local gradient magnitude) — the same chromatic-aberration term `research/aurora.md §5 M6` books, applied to the metal base so faint other-hues bleed at the high-gradient ridges. Default 0 for `metal`; a small fixed amount for `metal-gradient`.

---

## 3. The two mediums — the dispatch design

Both are NEW `uMedium` slots on the existing ladder. The free slots after `kuwahara==7` (and the pool-claimed `satin==8`/`burst==9`) are `==10..13`. **Proposed: `metal==10`, `metal-gradient==11`** (leaving `8`/`9` for the pool-claimed satin/burst; if those land first the metal slots shift up — the `satisfies Record<AuroraMedium, number>` makes the slot a compile-forced fact, never a guess).

### `medium: "metal"` — `mediumMetal(col, p, t)` (the PURE register)
1. **Base gradient** = the incoming `col` (the OKLCh field already drives the metallic gradient — the palette IS the gold/chrome/copper ramp; presets-in-consumers, the library default stays warm-cream, a gold/chrome PRESET ships in the demo). The field's value-modulation gives the dark-valley→bright-crest roll-off.
2. **Structure tensor** = `structureTensorField(p, t, flowField(p,t))` — reuse it ONCE, read `tangent` (ridge direction) + coherence `A`. No second Sobel.
3. **Height + normal** = the `sampleBase`-luma gradient (the SAME 4 taps the satin/watercolor edge-mask use — a 2-tap central difference is enough for the normal; reuse the watercolor `gx/gy` pattern).
4. **Anisotropic specular** = the Kajiya-Kay streak along `tangent`, lobe width by `(1-A)` (flat zones → broad, coherent ridges → tight streak), catch-light off `uLightDir`.
5. **Metallic Fresnel tint** = the specular is tinted by `col` (F0=albedo) so the crest carries the metal's own hue — gold crests are gold, not white. A bounded `uMetalTint` (default ~0.85) blends specular-color between `col` (full metal) and warm-white (a hint of dielectric coat).
6. **Composite** = `col * ambient + specStreak * crestColor` (the dark valleys are `col * lowAmbient`, the bright crests add the streak). The contrast (`crest/valley` ratio) is `uMetalPolish` (the polished-vs-brushed knob — high = sharp mirror crest + dark valley; low = soft satin).
7. **NO sparkle, NO grain** — pure specular. `uStrokeAmount` blends the whole finish back toward `col` (amount=0 → raw field passes through, the studio-knob contract every medium honors).

### `medium: "metal-gradient"` — `mediumMetalGradient(col, p, t)` (the SPARKLE register)
1. **Softer base** — the SAME metallic-specular core as `metal` but with a LOWER `uMetalPolish` (less ridge contrast — the ref is a soft gradient, not sharp folds) and the structure-tensor anisotropy dialed down (a near-uniform gradient, not strong ridges).
2. **+ Sparkle field** — the thresholded orientation-gated glint field (§2), at the metal-gradient default magnitude. Each glint a warm-white-to-base-hue point, brighter where the macro-surface faces `uLightDir`. The sparkle scintillates slowly over `t` (the hash seed advances) so it twinkles — but PRM freezes it (a static frame under reduce, the substrate's live-PRM the medium inherits for free).
3. **+ Chromatic bleed** — the bounded per-channel palette-UV offset (§2) for the faint iridescent multi-hue over the warm base.
4. **Composite + amount blend** — same `uStrokeAmount` contract.

### The shared core (DRY)
A single `metalSpecular(col, p, t, tangent, A, polish, tint)` helper computes the anisotropic-specular streak; `mediumMetal` calls it with high polish + no sparkle, `mediumMetalGradient` calls it with low polish + the sparkle/bleed add-ons. ONE specular body, two register presets — the StrokeProfile "logic-as-data" discipline applied to metal (a `metal-gradient` is NOT a forked body, it is a parameter vector over the shared metal core).

---

## 4. The uniforms (the studio knobs)

New scalar lanes (each bounded, default chosen so a NON-metal config is untouched — these uniforms are READ only inside the `uMedium==10/11` branches, so they have ZERO effect on the smooth/oil/kuwahara paths):
- `uMetalPolish` — crest/valley specular contrast (the polished↔brushed↔satin knob). Default ~0.7 for `metal`, ~0.35 for `metal-gradient`.
- `uMetalTint` — specular-color metal-vs-dielectric blend (F0=albedo strength). Default ~0.85 (mostly metal-tinted crest).
- `uMetalAniso` — the anisotropic-streak strength (how stretched the highlight runs along the ridge). Default ~0.8.
- `uMetalSparkle` — the sparkle-field magnitude. Default 0 for `metal`, ~0.5 for `metal-gradient` (the discriminating term).
- `uMetalBleed` — the chromatic-bleed amount. Default 0 for `metal`, ~0.04 for `metal-gradient`.

These ride the EXISTING `uLightDir` (cursor-as-light — already wired, AW.W8) + `uStrokeScale` (the macro ridge scale — reused, no new spatial knob) + `uStrokeAmount` (the finish-strength blend — the universal medium-amount contract). No new spatial/orientation uniform; the ridge geometry is the existing domain-warp + structure-tensor. The new lanes append to the `uniformBridge.ts` scalar pack + the WGSL `Uniforms` struct (the `uniformBridgeWGPU.ts` typed-struct SOURCE-OF-TRUTH closes the std140/WGSL alignment — append to the END so existing offsets are byte-stable).

---

## 5. The WGSL lockstep (Safari-first — load-bearing)

Per `arch/no-fallback-policy.md` + the existing `aurora-mediums.wgsl.ts` precedent, **both mediums MUST have a byte-lockstep WGSL body** — a `medium: "metal"` config on Safari 26 paints metal, NEVER a silent smooth degrade (the user's explicit no-fallbacks mandate; the WGSL primary already ports pastel/watercolor/crayon/kuwahara for exactly this reason). The WGSL `mediumMetal`/`mediumMetalGradient` transcribe the GLSL bodies line-for-line (the same `structureTensorField`/`sampleBase`/`flowField`/`saturate3` helpers exist in both shaders — the WGSL `applyMedium` dispatch gains the `uMedium==10/11` cases). The OKLab output parity is verified by `proof:gpu-substrate-single` (the aurora row, mean ΔE ≤ 2.0 / p99 ≤ 5.0) — a metal config must hold that bar across both backends. This is NOT the "degrade to smooth core" path the OLD WGSL took for oil/vangogh; metal is a FULL WGSL port (the BD-mandate posture).

Fence: the `uMetalSparkle` hash-glint uses `hash21` (exists in both shaders) — the sparkle PATTERN may differ sub-pixel between GLSL/WGSL `hash21` rounding, so the parity bar is read on the MACRO field (the gradient + ridge + catch-light), and the sparkle is a high-freq overlay below the ΔE-on-downsample threshold (the same posture the film-grain `hash21` already takes — grain is not parity-bound). Record this in the parity table.

---

## 6. The fences (default-byte-identical + the medium-family discipline)

1. **Default byte-identical.** No preset carries `metal`/`metal-gradient`; `smooth==0` is the no-op pass-through. Every existing `proof:aurora-*` gate + the WGSL parity stays green by construction (a new `uMedium` branch + new uniforms read only inside that branch). The metal mediums are reached ONLY by an explicit `medium: "metal"` config.
2. **GL-fence on existing bodies.** `mediumPastel`/`Oil`/`Kuwahara`/`Vangogh` are BYTE-UNTOUCHED. The metal bodies are NEW functions; the dispatch ladder gains two `else if` arms.
3. **Single-pass, no FBO.** Like every medium except multi-pass Kuwahara (the ONE booked FBO case), metal runs in the existing one-draw/one-shader loop — `proof:offscreen-pause` / PRM-freeze untouched (a parked frame attaches zero specular taps). The structure-tensor reuse means NO new neighborhood-sample budget beyond the kuwahara precedent.
4. **No Canvas2D, no new substrate, no new rAF.** Pure fragment math on the shipped `useGpuSubstrate` leaf.
5. **Presets-in-consumers.** The gold/chrome/copper PALETTE is a demo preset; the library default stays warm-cream (a metal medium over warm-cream reads as warm-gold metal — congruent). A consumer ships its own metal palette; no metal hue enters a library token.
6. **The structure-tensor `forceTensor` orientation** (the `resolveStrokeOrientId` painterly-hug list) gains `metal`/`metal-gradient` — the metal ridges MUST hug the color zones (the anisotropic streak runs along the flow, not a hand-pattern). Same one-line addition kuwahara/vangogh made.
7. **The metal-gradient sparkle is PRM-frozen** (inherits the substrate live-PRM — a parked frame is one static metal frame, the twinkle off).

---

## 7. The atom door + the studio

- `AuroraMedium` union gains `"metal" | "metal-gradient"`; `MEDIUM_ID` gains the two slots (the `satisfies Record` compile-forces them).
- The atom-door `medium` atom (`atoms.ts resolveAtoms`) accepts the two new members; `warpModeFor`/`profileFor` are UNTOUCHED (metal is a peer overlay, not a stroke-cascade medium — like crayon/kuwahara, it never reaches `paintStrokeLayers`).
- The aurora studio (`research/aurora.md §3` Section 3 — Medium) gains two material chips; each exposes its signature sliders (`metal`: polish/tint/aniso; `metal-gradient`: + sparkle/bleed). The textured-medium `amount` slider applies (`uStrokeAmount` — both metal mediums honor it).
- **≥2 consumers**: (1) the demo aurora studio metal preset + (2) the iOS-27 flow-field-background register (the now-playing dock pill backdrop / the `BD.W-AUR-ALBUM` album-reactive metallic field). Recorded in the consumer-evidence the union owes (the metal medium is named in `media-analysis.md §A` as the iOS-27 register, two surfaces by construction).

---

## 8. The machine-lock + the paint bar

- **`proof:aur-metal`** (the source arm, device-free): W1 the two mediums exist as `MEDIUM_ID` slots + `forceTensor` list members + `AuroraMedium` union members; W2 the GLSL bodies splice + the dispatch arms + the metallic-Fresnel `F0=albedo` tint present + the anisotropic Kajiya-Kay streak present (the round-Blinn-Phong-only anti-pattern reds — a metal that uses isotropic specular is not metal); W3 the WGSL lockstep bodies present + the `applyMedium` dispatch cases (the Safari no-degrade floor — a metal id falling through to smooth on WGSL reds); W4 default-byte-identical (no preset selects metal, smooth==0 untouched, the new uniforms read only inside the metal branches) + the GL-fence on existing bodies; W5 the sparkle/bleed discriminate metal-gradient from metal (the `uMetalSparkle`/`uMetalBleed` default-0-for-metal fence) + a self-test bite per clause.
- **`proof:gpu-substrate-single`** — the metal row in the parity table (mean ΔE ≤ 2.0 / p99 ≤ 5.0 on the macro field; the sparkle high-freq overlay recorded as below-threshold like grain).
- **The binding π** (`tests-visual/aur-metal.spec.ts`, rides W-REFLECT/the BD paint-close): pure-metal renders anisotropic specular RIDGES with sharp flow-aligned catch-lights + dark valleys (a structure-tensor read shows the highlight coherence ALONG the flow; an isotropic-highlight control fails); metal-gradient renders the warm gradient + the sparkle field + the faint chromatic bleed; the catch-light tracks `uLightDir`/cursor; PRM freezes the sparkle; both modes; the OKLab parity holds WGSL↔GLSL.
- **The `proof:ba-gestalt` aurora verdict** — the metal medium JOINS the aurora gestalt roster (the iOS-27 flow-field-background read, re-earned on a fresh capture).

---

## 9. Sequencing + deltas (for the roster)

- **NEW WAVE `BD.W-AUR-METAL`** — two new `uMedium` slots (`metal==10`, `metal-gradient==11`; shift if satin/burst land first), the shared `metalSpecular` core (anisotropic Kajiya-Kay streak + F0=albedo metallic Fresnel tint + flow-aligned catch-light off the existing `uLightDir`/cursor), the metal-gradient sparkle/bleed add-ons, the 5 new bounded uniforms (append-at-end, byte-stable offsets), the WGSL lockstep (Safari-first FULL port, not degrade-to-smooth), the atom-door + studio chips, the `forceTensor` one-liner. Default-byte-identical, single-pass, no FBO, no Canvas2D.
- **Sequence**: after the BD WGSL-medium baseline (`BD.W-AURORA-WGSL-STROKES`) lands (the WGSL `applyMedium` dispatch must exist to extend); coordinate slot numbers with `BE.W-AUR-SATIN` (`==8`)/burst (`==9`) — metal is the sharp-specular sibling of satin's soft sheen, they share the structure-tensor flow read (sequence metal AFTER satin so the shared specular helper, if satin mints one, is reused not re-forked).
- **Budget**: the `dist/aurora.js` gzip ceiling lifts for the two metal bodies (the kuwahara-lift precedent — a named successor to the 50000 ceiling); the anisotropic streak + sparkle are compact (no neighborhood-sample blowup; the structure-tensor reuse is the cost, already paid).
- **Fence on the satin overlap**: satin (`research/aurora.md §5 M2`) is folded-silk BROAD sheen; metal is polished NARROW crest. They are distinct registers on the SAME structure-tensor flow read — the `uMetalPolish` knob spans satin→brushed→polished, so a future fold could express satin as a low-polish metal preset (recorded as a candidate, NOT done here — satin is pool-claimed independently).

---

## Sources
- `media-analysis.md §A` (the two refs: metal-pure.jpg, metal-gradient.jpg) + the iOS-27 `vid-aurora` satin frames
- `research/aurora.md §1` (shipped SOTA: structure-tensor field, the painterly mediums, `uLightDir` cursor-as-light) + §5 M2 satin / M6 chromatic-aberration (the booked siblings the metal medium relates to)
- `arch/no-fallback-policy.md` (the WGSL-lockstep Safari-first floor — no silent smooth degrade; the `proof:gpu-substrate-single` ΔE bar)
- On-disk HEAD: `aurora/constants/shaders/{mediums.glsl.ts, aurora.frag.ts (the uMedium dispatch ladder), aurora.wgsl.ts + aurora-mediums.wgsl.ts (the WGSL lockstep), brush.glsl.ts, structureTensorField}`, `composables/uniformBridge.ts` (`MEDIUM_ID`, `resolveStrokeOrientId` forceTensor list, the scalar pack), `constants/presets.ts` (`AuroraMedium` union)
- BRDF SOTA: Kajiya-Kay anisotropic hair/brushed-metal streak (`sinTH = sqrt(1-dot(T,H)²)`); the metallic-workflow F0=albedo specular-tint fact (gold crests are gold, not white); stochastic-glint / multiscale-microfacet sparkle (Jakob et al. discrete stochastic microfacet — the cheap thresholded orientation-gated hash-glint idiom, single-pass)
