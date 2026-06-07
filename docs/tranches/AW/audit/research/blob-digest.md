# Goo-blob SOTA research (32-agent, complete)

## SYNTHESIS

All three deliverables are written and grounded against the live blob source (every file:line cited was verified against HEAD) and the established AW format (matching the aurora arm's PATH-FORWARD / wave-seeds structure).

## Deliverables

1. **`/Users/mkbabb/Programming/glass-ui/docs/tranches/AW/blob/PATH-FORWARD.md`** — the blob perfection plan. §0 baseline (field/color/substrate already SOTA; four named gaps), §1 lit-droplet surface (SDF-normal keystone → spec/rim → iridescence → fake-SSS → tonemap+dither), §2 soft-body squish + the unwired-mood resolution, §3 organic-membrane motion + normalized smin + seamless loop, §4 OKLCh derive-palette, §5 perf budget (half-res headline), §6 the WebGPU/particle evaluation with Baseline dates (verdict: do NOT migrate — documented non-goal), §7 sequencing, plus the headline + 5 highest-value adopts.

2. **`/Users/mkbabb/Programming/glass-ui/src/components/custom/goo-blob/README.md`** — the research-backed consumer README. What it is, use cases, quick start, full `BlobConfig` API table, the interaction model (shipped + planned), best practices, color/perf/a11y notes, worked examples (pointer-reactive, gooier, pausable-AV-background), architecture, and dated references.

3. **`/Users/mkbabb/Programming/glass-ui/docs/tranches/AW/blob/wave-seeds.md`** — 10 concrete wave specs (`AW.Wb1`–`AW.Wb10`), each with scope / cited SOTA technique / machine-locking gate, dependency graph, and the WebGPU/particle non-goals.

**Key findings that shaped the plan:** the field + OKLCh color + substrate are already SOTA (ahead of nearly every reference blob); the gaps are the FLAT-shaded surface, sine-only motion physics, a half-built mood/interaction model that paints `idle` forever (no `setMood` caller; `orbitSpeedScale`/`wobbleScale` lerped but never read), and sticker-on-glass integration. Verdict on WebGPU/particles: explicit non-goal (≤4 nuclei = no accumulation bottleneck; WebGPU is Baseline "newly available" as of 2025-11-25 but a substrate-wide decision, never blob-local).

---

**HEADLINE:** the blob is already a SOTA single-pass WebGL2 SDF metaball with a perceptually-uniform OKLCh pipeline most reference blobs get wrong — so the path to *stunning* is not a rewrite and not WebGPU, but layering a **lit, iridescent, translucent glass surface** onto the SDF gradient it already half-computes, giving it **spring-driven soft-body squish**, and **wiring (or cutting) the half-built mood/interaction model**.

**The 5 highest-value adopts:**
1. SDF-gradient fake normal → warm-cream specular + Fresnel rim (the lit droplet; premult-correct) — the biggest delta, unanimous across the research.
2. IGN dither + Khronos PBR-Neutral tonemap (the cheap filmic finish; aurora ships the dither, the blob is missing it; PBR-Neutral not ACES/AgX for the LDR brand color).
3. Spring pointer + velocity squash-and-stretch (alive, not animated; ~80% of soft-body feel, zero sim).
4. Wire-or-cut the mood/interaction model (no orphaned substrate; drive moods from pointer/idle state or collapse to one `energy` scalar; the demo must exercise it).
5. Warm-biased OKLCh iridescence + fake-SSS (thickness-from-`-d`, both mixed before the gamut clamp + OETF, reusing the normal from adopt #1).

All five ship on WebGL2 today on the existing fragment shader + `useWebGLCanvas` substrate.

---

## Lane briefs

### Lane 1

I now have everything needed for a complete brief. Let me compile the findings into the tight markdown brief with citations and wave-seeds. The key actionable findings are clear, with the most important being the smin normalization bug.

---

# SOTA Brief: GooBlob SDF Metaballs — Lane `metaball-sdf`

Research-only. No implementation. All findings tie to the current 2D-analytic-SDF blob (single full-quad pass, flat OKLCh fill, no normals/lighting/refraction).

## Current state (what we have)

- 2D analytic SDF: `sdCircle` + IQ quadratic `smin`, body + ≤4 smin-merged satellites — `src/components/custom/goo-blob/shaders/sdf-body.glsl.ts:16`
- Edge: fwidth-AA `1 - smoothstep(-aa, aa, d)`; FBM-displaced radius for the watercolor edge — `metaball.frag.ts:134,149`
- Color: gamma→linear→OKLab→OKLCh per-pixel perturbation + edge inner-glow lightness lift — `metaball.frag.ts:159-173`
- It is **flat-shaded**: no surface normal, no depth, no specular/refraction. It reads as a soft sticker, not a droplet.
- Satellite orbit/merge/absorb/emerge state machine in JS — `composables/useBlobSatellites.ts`

## Findings

### F1 — `smin` k-normalization is the old (pre-2024) form [HIGH-VALUE, low-risk]
Current `smin` uses `h = max(k-|a-b|,0)/k; return min - h*h*k*0.25` with **raw k** — `sdf-body.glsl.ts:16`. IQ's 2024 rewrite normalizes so `k` maps directly to blend-band width in distance units: `k *= 4.0;` then the same body. Without it, `k`'s perceived strength drifts as you change radii/scale, and `POS_SCALE` multiplication on `uSmoothK` (`useMetaballRenderer.ts:273`) is a fudge for exactly this. Normalized k makes the gooeyness scale-invariant and the config value mean a real distance.
Source: [iquilezles.org/articles/smin](https://iquilezles.org/articles/smin/) (IQ full rewrite, 2024; via [x.com/iquilezles status 1765935148091261277](https://x.com/iquilezles/status/1765935148091261277), Mar 2024).

### F2 — Circular smin gives the rounder, more "liquid" merge [MEDIUM]
The quadratic is "close enough to circular" and fastest, but the **circular** CD-family variant produces an exact circular fillet at the join — the visually rounder, more fluid merge premium blobs use. GPU `sqrt` is ~as cheap as a multiply on modern hardware, so the cost is negligible at one fragment-shader pass:
```glsl
float smin(float a, float b, float k){ k *= 1.0/(1.0-sqrt(0.5));
  float h = max(k-abs(a-b),0.0)/k;
  return min(a,b) - k*0.5*(1.0+h-sqrt(1.0-h*(h-2.0))); }
```
Both quadratic and circular are CD-family: rigid, conservative (never overestimate), shape-preserving outside the band. Source: [iquilezles.org/articles/smin](https://iquilezles.org/articles/smin/).

### F3 — smin material/blend-factor return → per-region color [MEDIUM, high polish-per-effort]
IQ's vec2 smin returns blend distance `.x` AND a mix factor `.y` in `[0,1]`. Threading `.y` through the body↔satellite merges lets satellites carry a slightly different hue/lightness that blends *through the goo seam* rather than the current uniform fill. This is the cleanest way to add depth-reading without normals:
```glsl
vec2 sminN(float a,float b,float k){ float h=1.0-min(abs(a-b)/(4.0*k),1.0);
  float w=h*h, m=w*0.5, s=w*k; return (a<b)?vec2(a-s,m):vec2(b-s,1.0-m); }
```
Source: [iquilezles.org/articles/smin](https://iquilezles.org/articles/smin/).

### F4 — SDF gradient → surface normal → fake 3D specular/fresnel [HIGH-VALUE, the "droplet" upgrade]
The Codrops droplet tutorial (Jun 2025) is the canonical premium-metaball reference. Core moves that turn a flat field into a droplet: take the **SDF gradient as a 2D normal**, lift to a fake-3D normal via `nz = sqrt(1 - clamp(d/r,...))` near the edge (spherical meniscus), then Blinn-Phong specular + a fresnel rim. We can compute the gradient analytically (no extra SDF samples) — see F5. This is what makes it read as glass, not paper. Codrops uses raymarched 3D spheres + central-difference normals + `reflect()`-sampled noise + `pow(color, 7.0)` to crush midtones and pop highlights — but the 2D-analytic equivalent (gradient-of-the-field normal) gets 90% of the look at a fraction of the cost and keeps our single-pass architecture.
Sources: [tympanus.net/codrops droplet metaballs](https://tympanus.net/codrops/2025/06/09/how-to-create-interactive-droplet-like-metaballs-with-three-js-and-glsl/) (Yuki Kojima, Jun 2025); liquid-glass rim/fresnel/specular grammar corroborated by [Prismal](https://github.com/styropyr0/Prismal) (SDF shape + spherical meniscus normals + Blinn-Phong + fresnel rim) and [ybouane/liquidglass](https://github.com/ybouane/liquidglass).

### F5 — Analytic-derivative gradient noise (one eval → value + gradient) [HIGH-VALUE, perf + quality]
Our edge displacement uses value noise; for a lit blob we'd need the field gradient, and central-differencing the SDF costs 4 extra `map()` evals. IQ's `noised()` returns the noise value AND its analytic gradient `(va+dx+dy)` in a single evaluation — "reusing sub-expressions across value and derivatives," strictly cheaper than finite differences. Gradient noise (value in `[-1,1]`, smoother) also beats our current value noise for organic edges. Derivatives sum across FBM octaves so the whole edge field carries an exact gradient for free.
```glsl
vec3 noised(in vec2 x){ vec2 i=floor(x),f=fract(x);
  vec2 u=f*f*f*(f*(f*6.-15.)+10.), du=30.*f*f*(f*(f-2.)+1.); /* ...hash, dots... */ }
```
Source: [iquilezles.org/articles/gradientnoise](https://iquilezles.org/articles/gradientnoise/).

### F6 — Domain warping for the organic edge [MEDIUM]
Current edge perturbs the radius by one FBM sample. IQ domain warping `fbm(p + 4*fbm(p + ...))` produces the flowing, marbled organic deformation premium blobs use. Two layers (`fbm(p+fbm(p))`) gets the look at ~33% less cost than three — the recommended real-time tradeoff. Cleaner than scaling a single noise amplitude up (which just looks noisy).
Sources: [iquilezles.org/articles/warp](https://iquilezles.org/articles/warp/); two-layer optimization corroborated [MiniMax-AI skills/shader-dev/domain-warping.md](https://github.com/MiniMax-AI/skills/blob/main/skills/shader-dev/techniques/domain-warping.md).

### F7 — Trail-based pointer interaction (elastic stretch) [MEDIUM, interaction]
Our pointer just attracts/displaces UV near the cursor (`metaball.frag.ts:123-128`). Codrops keeps a **15-position pointer trail**, smin-merges a sphere at each with decreasing radius → the blob *stretches elastically* toward the cursor and snaps back. Far more premium/intentional than the current single-point pull. Cheap: it's just more smin terms over a small uniform array (we already do MAX_SATS=4 array uniforms).
Source: [tympanus.net/codrops droplet metaballs](https://tympanus.net/codrops/2025/06/09/how-to-create-interactive-droplet-like-metaballs-with-three-js-and-glsl/).

### F8 — Glass-ui integration / palette [context]
Library identity is warm-cream + muted-black, OKLCh-uniform neutrals at hue 48 (`src/styles/tokens.css:4,297-299`). The blob already perturbs in OKLCh (`metaball.frag.ts`) and resolves base color through the injected `ColorResolver` seam — any new lighting/specular must stay in linear-then-OETF space (the existing A5/A2 gamma trap, `proof:blob-space-gamma`) and any specular tint should pull from a warm highlight, not pure white, to sit in the cream system. A subtle fresnel rim using `--card`/`--foreground`-derived tones keeps it on-brand vs the cold blue rims of generic liquid-glass libs.

## ADOPT / wave-seed list

Ordered by value-to-risk. All single-fragment-pass — preserves the existing `useWebGLCanvas` substrate, no raymarch, no second target.

| Seed | What | Source | Risk |
|------|------|--------|------|
| **W-a** | Normalize `smin` k (`k *= 4.0`); drop the `POS_SCALE` fudge on `uSmoothK`. k becomes a real distance | F1 / [smin](https://iquilezles.org/articles/smin/) | Low — 1-line + uniform recalibration; `blob-color-equivalence` test unaffected (geometry only) |
| **W-b** | Switch quad→circular smin for the rounder liquid fillet (gate behind a config flag if the quadratic look is wanted) | F2 / [smin](https://iquilezles.org/articles/smin/) | Low |
| **W-c** | SDF-gradient normal → fake-3D meniscus → Blinn-Phong specular + warm fresnel rim. THE droplet upgrade; reads as glass | F4 / [Codrops](https://tympanus.net/codrops/2025/06/09/how-to-create-interactive-droplet-like-metaballs-with-three-js-and-glsl/) | Med — new uniforms + the gamma seam; ship with a `lighting` toggle so flat-fill stays default |
| **W-d** | Replace value-noise edge with IQ `noised()` analytic-gradient gradient noise; feed gradient into W-c normal for free | F5 / [gradientnoise](https://iquilezles.org/articles/gradientnoise/) | Med — noise swap shifts edge look; pairs naturally with W-c |
| **W-e** | Two-layer domain warp on the edge displacement | F6 / [warp](https://iquilezles.org/articles/warp/) | Low-Med — purely additive to existing FBM |
| **W-f** | smin `.y` blend-factor return → per-satellite hue/lightness blended through the goo seam (cheap depth without normals) | F3 / [smin](https://iquilezles.org/articles/smin/) | Low |
| **W-g** | Pointer trail (N positions, decreasing-radius smin spheres) → elastic stretch-toward-cursor interaction | F7 / [Codrops](https://tympanus.net/codrops/2025/06/09/how-to-create-interactive-droplet-like-metaballs-with-three-js-and-glsl/) | Med — JS trail buffer + uniform array growth; mirrors satellite plumbing |

Smallest premium win: **W-a + W-c** (correct k + a lit meniscus rim) — flips the blob from sticker to droplet with no architecture change. Everything stays one fragment pass on the existing substrate; warm-cream/OKLCh discipline (F8) constrains the specular/rim tint.

### Key files (absolute)
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/goo-blob/shaders/sdf-body.glsl.ts:16` — the smin to normalize (F1/W-a)
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/goo-blob/shaders/metaball.frag.ts:134-176` — edge/AA/color block; where lighting (W-c) and warp (W-e) land
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/goo-blob/shaders/watercolor-edges.glsl.ts:36` — FBM to swap for `noised()` (W-d)
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/goo-blob/composables/useMetaballRenderer.ts:242-248,273` — pointer + smoothK uniform plumbing (W-a, W-g)
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/goo-blob/types.ts:58-133` — `BlobConfig` where new toggles/params declare
- `/Users/mkbabb/Programming/glass-ui/src/styles/tokens.css:297-299` — warm-cream palette the specular/rim must sit in (F8)

### Sources
- [Inigo Quilez — Smooth minimum (2024 rewrite: normalization, kernels, circular smin)](https://iquilezles.org/articles/smin/)
- [Inigo Quilez — Domain warping](https://iquilezles.org/articles/warp/)
- [Inigo Quilez — Gradient noise with analytic derivatives](https://iquilezles.org/articles/gradientnoise/)
- [Codrops — Interactive droplet-like metaballs with Three.js + GLSL (Yuki Kojima, Jun 2025)](https://tympanus.net/codrops/2025/06/09/how-to-create-interactive-droplet-like-metaballs-with-three-js-and-glsl/)
- [IQ smin announcement tweet (Mar 2024)](https://x.com/iquilezles/status/1765935148091261277)
- [Prismal — physics-based liquid glass (SDF + meniscus + Blinn-Phong + fresnel)](https://github.com/styropyr0/Prismal)
- [ybouane/liquidglass — WebGL glass refraction/fresnel/specular](https://github.com/ybouane/liquidglass)
- [MiniMax-AI skills — domain-warping technique (two-layer perf note)](https://github.com/MiniMax-AI/skills/blob/main/skills/shader-dev/techniques/domain-warping.md)

---

### Lane 2

I have enough to synthesize. The marching-squares cost analysis is a CPU/JS framing — the blob already runs the field per-pixel on the GPU, where that argument inverts (per-pixel SDF is the right call on GPU; marching squares is for CPU/canvas). Let me write the brief.

Key findings synthesized. Returning the brief.

---

# GOO-BLOB SOTA brief — lane `raymarch-sdf-2d`

Research only. No implementation. All file refs are at HEAD on `at-dock-convergence`.

## Current state (what the blob does today)

The blob is already a **per-pixel 2D SDF metaball on a full-screen GPU quad** — the modern, correct substrate. It is NOT the naive CPU/SVG approach.

- **Field:** `sdCircle` body + up to 4 satellites merged with IQ quadratic `smin` — `src/components/custom/goo-blob/shaders/sdf-body.glsl.ts:16`.
- **Edge:** `fwidth`-derived analytic AA — `metaball.frag.ts:149`. This is correct and resolution-independent.
- **Organic edge:** rotated-octave value-noise FBM displaces the body radius — `watercolor-edges.glsl.ts:36`, applied at `metaball.frag.ts:134-137`.
- **Color:** perceptually-uniform OKLCh L/C/h perturbation with mandatory OETF + hue-preserving gamut clamp — `metaball.frag.ts:157-173`. This is ahead of most reference work (most blobs perturb in gamma sRGB or HSV and ship muddy).
- **Shading:** one cheap `edgeGlow` inner-lightness lift — `metaball.frag.ts:166-168`. This is the ONLY depth cue. The blob currently reads **flat** — a colored silhouette, not a surface.
- **Animation:** satellite orbit/merge/absorb/emerge state machine (`useBlobSatellites.ts`) + sine pulsation + mood drift. Solid.
- **Interaction:** pointer deforms UV via a single `smoothstep` push/pull — `metaball.frag.ts:122-128`, smoothed in `useBlobPointer.ts`. Functional but crude (a uniform radial shove, no surface tension).

**Gap diagnosis:** the field machinery is SOTA; the **surface look is flat** and the **interaction is a blunt push**. The premium delta is almost entirely in (a) distance-based fake-3D shading and (b) a better pointer-tension model — both are fragment-shader changes, no architecture change.

## Findings + citations

**1. Per-pixel GPU SDF is the right substrate; marching squares is the wrong axis here.** The classic "marching squares is faster" argument ([Jamie Wong, 2014-08-19](https://jamie-wong.com/2014/08/19/metaballs-and-marching-squares/)) is a **CPU/JS** framing — it samples a coarse grid to avoid millions of JS ops. On the GPU the cost model inverts: per-pixel field eval is free and gives a true smooth gooey merge with no facet/interpolation artifacts. Marching squares would only buy us a polygonal contour (for SVG/canvas stroking), which is a downgrade in smoothness. **Do not adopt marching squares.** Keep the GPU per-pixel field. (Confirmed by the metaball/marching-squares comparison and the raymarch SDF note in the same search cluster — [Lumitree](https://lumitree.art/blog/metaballs), [IQ raymarching DF](https://iquilezles.org/articles/raymarchingdf/), 2026-06-06.)

**2. SVG gooey-filter (feGaussianBlur + feColorMatrix contrast) is strictly inferior to what we have.** It is the cheap CSS/DOM way to fake metaballs ([Olivier Larose text-gooey](https://blog.olivierlarose.com/tutorials/text-gooey), 2026-06-06). Trade-offs: `feGaussianBlur` is radius-dependent **heavy** and the blur+threshold gives a soft, low-fidelity edge that cannot do OKLCh color, fwidth AA, or per-pixel shading ([MDN feGaussianBlur](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feGaussianBlur); [LogRocket CSS/SVG filters](https://blog.logrocket.com/complete-guide-using-css-filters-svgs/), 2026-06-06). **Do not adopt.** Our shader path wins on crispness, color, and control. (Worth noting only as a documented rejected alternative.)

**3. IQ's 2024 smin rewrite adds normalization + a material-blend variant we should use.** The canonical article was fully rewritten ([Inigo Quilez, smin](https://iquilezles.org/articles/smin/); rewrite announced [2024-03](https://x.com/iquilezles/status/1765935148091261277)). Two takeaways:
   - **Normalized k** — `k *= 4.0` for quadratic, so `k` maps directly to blend thickness in distance units. Our current `smin` (`sdf-body.glsl.ts:16`) uses the **un-normalized** `h*h*k*0.25` form, so `uSmoothK` is in arbitrary units. Normalizing makes the gooey-ness physically meaningful and reusable. Low-risk swap.
   - **Material/color smin** — the `vec2 smin(a,b,k)` variant returns `(distance, blendFactor)`. The blend factor lets you **tint the merge seam** — satellites can carry their own hue and bleed it into the body across the neck, instead of every pixel reading one `uBaseColor`. This is the single biggest "premium organic" upgrade available and it is ~10 lines. (GLSL quoted in the fetched article.)

**4. Distance-based fake-3D is the premium-look unlock, and it's cheap.** Premium blobs read as *surfaces*, not silhouettes. From the SDF-shading sources ([GM Shaders / Xor SDF](https://mini.gmshaders.com/p/sdf); [Ronja 2D SDF basics](https://www.ronja-tutorials.com/post/034-2d-sdf-basics/); [Lettier rim lighting](https://lettier.github.io/3d-game-shaders-for-beginners/rim-lighting.html); [Varun Vachhar SDF crystal](https://varun.ca/ray-march-sdf/), all 2026-06-06):
   - **Fake normal from the SDF gradient** — `vec2 n = normalize(vec2(dFdx(d), dFdy(d)))` (or central differences on the field) gives a 2D surface normal essentially free. A dot with a fixed light direction yields a soft directional shade across the blob body — instant volume.
   - **Rim/fresnel edge light** — brighten where the normal faces away from the light (the silhouette), per the rim-lighting source. Reads as a glossy gel edge.
   - **Inner shadow + outer glow from the raw distance** — `outline_dist = d - thickness`; soft-shadow falloff from `d`. The GM Shaders source: "you can add glow effects or soft drop shadows when using the distance field." This is what makes it sit *in* the warm-cream glass rather than *on* it.
   - Our current single `edgeGlow` lift (`metaball.frag.ts:166`) is a degenerate special case of this — replace it with a proper distance-band shading stack.

**5. Interaction SOTA is surface-tension / displacement, not a uniform shove.** Awwwards-tier interactive blobs react with *local* ripple/displacement at the pointer, with falloff and a little overshoot ([Awwwards WebGL fluid gradients](https://www.awwwards.com/inspiration/interactive-webgl-fluid-gradients-kota-1); [Cobo WebGL organic blob, Dribbble](https://dribbble.com/shots/18883283-Cobo-WebGL-Organic-Blob), 2026-06-06). Our pointer (`metaball.frag.ts:122-128`) is a single global UV translate scaled by one `smoothstep` — it moves the whole field, not the local surface. Better: deform the **field** near the pointer (dent or bulge `d` by a Gaussian centered on `uPointer`), and optionally spawn a transient satellite that the pointer drags — so the blob *reaches toward* the cursor and a droplet pulls off and re-merges (gooey, on-brand).

**6. Grain/texture is a known premium tell.** The fluid-gradient reference work consistently notes "grainy gradient fills" over flat color ([Framer Liquid Aura](https://www.framer.com/marketplace/components/liquid-aura-gradient/); [DesignDrastic blobs](https://www.designdrastic.com/snippet/animated-blob-backgrounds/), 2026-06-06). A faint film-grain dither over the body (and it also kills OKLCh banding on large flat fills) ties the blob to glass-ui's existing paper/disco-grain idiom. Cheap: one hash per pixel, ~3 lines.

## ADOPT / wave-seed list

Ordered by visual-impact-per-line. Each is a fragment-shader-local change unless noted — no substrate or architecture change, fits the existing `useWebGLCanvas` seam.

- **W-seed A — Fake-3D surface shading (HEADLINE).** Compute a 2D normal from the SDF gradient (`dFdx`/`dFdy` of `d`, or central differences), shade with one fixed light dir + a rim/fresnel edge term + distance-band inner-shadow/outer-glow. Replaces the lone `edgeGlow` (`metaball.frag.ts:166-168`). Turns the flat silhouette into a glossy gel surface. *Biggest premium delta; ~20 GLSL lines; no new uniforms strictly required, a few for tuning.*

- **W-seed B — Material/color smin (per-satellite tint bleed).** Switch the merge to IQ's 2024 `vec2 smin` (distance + blend factor); give each satellite its own OKLCh hue offset and mix it into the body across the neck via the blend factor. `sdf-body.glsl.ts` + `metaball.frag.ts:140-145` + a `uSatHue[]` uniform. *Most "organic/alive" upgrade after shading.*

- **W-seed C — Normalize smin k.** Adopt the `k *= 4.0` normalized quadratic so `uSmoothK` is in real distance units. `sdf-body.glsl.ts:16`. Re-baseline `config.smoothK` once. *Correctness + tunability; trivial; do alongside B.*

- **W-seed D — Local pointer field-deformation + reach-toward droplet.** Replace the global UV translate with a Gaussian dent/bulge on `d` near `uPointer`; optionally a pointer-anchored transient satellite that pulls off and re-merges. `metaball.frag.ts:122-128` + `useBlobPointer.ts` + `useBlobSatellites.ts`. *Makes interaction feel like surface tension, not a shove.* Respect the `useWebGLCanvas` PRM freeze — interaction must not re-arm motion under reduced-motion.

- **W-seed E — Film-grain dither over the body.** One per-pixel hash modulation on the final body color (the `hash21` in `watercolor-edges.glsl.ts:12` is already in scope). Premium texture + kills OKLCh flat-fill banding. *~3 lines; ties to glass-ui grain idiom.*

- **REJECTED (document, don't build):** SVG gooey-filter (feGaussianBlur+feColorMatrix) — inferior edge/color/perf; marching squares isoline extraction — a CPU-era downgrade from per-pixel GPU field, costs smoothness. Both belong in the wave write-up as considered-and-rejected alternatives, not as work.

**Integration guardrails (carry into every seed):** stay inside `useWebGLCanvas` (offscreen-pause, tab-hidden, PRM-freeze, DPR≤2 ceiling — `useMetaballRenderer.ts:136-143`, `205`); keep all color in OKLCh + the mandatory `linearToSrgb()` OETF (`metaball.frag.ts:173`) — the `proof:blob-space-gamma`/`proof:blob-color-equivalence` gates forbid a linear-in/no-OETF-out regression; share any new OETF/matrix GLSL via the `procedural-color.glsl.ts` chunk, never re-inline. Warm-cream integration means the rim/glow should read against the cream glass — tune the light/rim against `--background`/glass tokens, not pure white.

---

### Lane 3

I have everything needed. Here is the synthesized brief.

---

# SOTA Brief — GooBlob "soft-body-jelly" lane (research only, no impl)

## What GooBlob does today (baseline)

The blob is a fragment-shader SDF render: one `sdCircle` body + up to 4 smin-merged satellites, FBM-displaced edge, OKLCh per-pixel color (`metaball.frag.ts:118-177`). Its "life" comes from three **kinematic** sources, none physical:

- **Pulsation** is a pure sine on radius — `bodyR = uBodyRadius + sin(uPulsePhase)*uPulseAmp` (`metaball.frag.ts:131`). No velocity, no decay, no overshoot.
- **Pointer deformation** is an instantaneous, stateless UV-warp — `uv -= normalize(pointerDir)*influence` (`metaball.frag.ts:122-128`); the only smoothing is a fixed-alpha lerp on the pointer position itself (`useBlobPointer.ts:57-67`, `SMOOTH_FACTOR=0.12`). When the pointer leaves, the dent vanishes immediately — **there is no jiggle, no settle, no bounce-back**.
- **Mood** cross-fades scalar param sets (`useBlobMood.ts`); **satellites** orbit on layered sines (`useBlobSatellites.ts:77-91`).

Gap: the blob reads as *animated* but not *squishy*. Nothing carries momentum; nothing reacts-then-recovers. That is exactly the "alive/jelly" axis the SOTA addresses.

## Findings (SOTA, cheap + real-time)

### 1. Pressure soft-body is the canonical "jelly that holds shape and wobbles"
The dominant web/game technique for a 2D squishy blob: **perimeter springs + an ideal-gas pressure force toward a target area**, integrated with Verlet. Springs alone collapse a blob back to a circle; the pressure term gives it volume/turgor so it deforms then springs back. ([Charlotte Dann, charlottedann.com](https://charlottedann.com/article/soft-blob-physics) — tension `0.002`, pressure `(targetArea/currentArea - 1)*20`, velocity damping `0.99/frame`, 20-50 perimeter points; [Matyka, "Pressure Model of Soft Body Simulation", arXiv physics/0407003](https://arxiv.org/pdf/physics/0407003); [smacke/pressure-softbody](https://github.com/smacke/pressure-softbody)). Accessed 2026-06-06.

This is the *gold standard look* but it is a particle sim + a path/mesh render. GooBlob renders an SDF in a fragment shader — there is no perimeter polygon. Adopting full pressure-soft-body means changing the render model (N control points fed as metaball sources, or an SDF built from a control ring). High value, high cost. Flag as a **stretch** seed.

### 2. Verlet mass-spring + metaball is the proven web pairing
Independent sources converge on: simulate a handful of point masses with **Verlet integration** (position-only, no explicit velocity → resilient, never explodes), then **render with metaballs** so the discrete points read as one continuous gooey surface. ([slsdo "Blob Family"](https://slsdo.github.io/blob-family/) — single/double-skinned/interconnected ring topologies, constraint-relaxation loop, metaball field render; [VerletExpressJS](https://github.com/matthewmain/VerletExpressJS)). Accessed 2026-06-06. GooBlob already has the metaball half — the missing half is a tiny Verlet ring whose points become the `uSatPos` sources. This is the lowest-friction path to *real* soft-body without abandoning the shader.

### 3. Velocity-skinning / "squashy deformer" — squash-and-stretch with ZERO sim
The cheapest premium win, and it fits the SDF model exactly. Use the **blob's center-of-mass velocity vector to drive an anisotropic scale**: stretch along the motion direction, compress perpendicular, magnitude ∝ |velocity|. ([Houdini "squashy" deformer, Artivoxa](https://www.artivoxa.com/houdini-metaballs-for-organic-blob-motion-design/); [Velocity Skinning for Real-time Stylized Skeletal Animation, arXiv 2104.04934](https://arxiv.org/pdf/2104.04934)). Accessed 2026-06-06. In a fragment shader this is a 2×2 domain warp on `uv` before `sdCircle` — a handful of uniforms (`uVelocity`, `uStretch`), no particles. This single technique converts a rigid sine-pulse blob into one that visibly leans-and-squashes when the pointer flicks or a satellite slams home.

### 4. Critically-damped spring is the framerate-independent way to get jiggle/settle
For the *reaction-then-recover* feel without a sim, drive every interaction scalar (pointer-dent depth, squash amount, pulse impulse) through a **critically-damped spring (SmoothDamp / Game Programming Gems 4)** instead of the current fixed-alpha lerp. Closed form, stable at any dt:
`n1 = v - (cur-target)*(k²·dt); v = n1/(1+k·dt)²; cur += v·dt` ([josimard gist / Keijiro SmoothDamp](https://gist.github.com/josimard/5737f3488fdfa2d207d68de282904479); [Alexis Bacot "The Art of Damping"](https://www.alexisbacot.com/blog/the-art-of-damping)). Accessed 2026-06-06. Critically-damped (damping ratio = 1) = "clean, settled arrival, no overshoot" → premium/serious; drop damping slightly under 1 for a tasteful 1-2 cycle wobble on release. Frame-rate independent, so it survives GooBlob's variable rAF (offscreen-pause, PRM). This is a `~30-line` composable, no shader change required for the pointer-spring half.

> Note: GooBlob's deps already include `@mkbabb/keyframes.js` (spring/keyframe runtime). Verify whether its spring solver exposes a per-frame `tick(dt)` usable here before hand-rolling SmoothDamp — reuse over reinvention.

### 5. Domain-warp / FBM is already the right idle-life primitive — extend it, don't replace it
The existing FBM edge displacement (`metaball.frag.ts:134`) is exactly Inigo Quilez domain-warping ([iquilezles.org/articles/warp](https://iquilezles.org/articles/warp/), accessed 2026-06-06). The cheap upgrade is **layered/animated warp coupled to velocity** (warp amplitude rises with motion) so idle is calm and motion is turbulent — reads as a living membrane rather than a constant boil.

## ADOPT / wave-seed list (ranked: value-per-cost)

- **SEED A — `useBlobSpring` critically-damped scalar composable (ADOPT, low cost, high impact).** Replace `useBlobPointer`'s fixed-alpha lerp and the bare sine pulse-coupling with a framerate-independent critically-damped spring (SmoothDamp form, or keyframes.js spring if it fits). Gives genuine jiggle/settle on pointer-enter, flick, and leave. No shader change for the pointer half. Cite: gist/Bacot/GPG4.

- **SEED B — velocity-driven squash-and-stretch domain warp (ADOPT, low-med cost, high impact).** Track blob center-of-mass velocity (from pointer-attraction + satellite pull), feed `uVelocity`+`uStretch` uniforms, apply a 2×2 anisotropic warp on `uv` before `sdCircle` in `metaball.frag.ts`. Pure shader + 2 uniforms, no particles. Converts rigid blob to leaning/squishing blob. Cite: Velocity Skinning arXiv 2104.04934, Houdini squashy.

- **SEED C — release wobble via underdamped spring + coupled FBM amplitude (ADOPT, low cost).** On pointer-leave/satellite-merge impact, kick the spring (SEED A) into a 1-2 cycle underdamped overshoot AND ramp `uNoiseAmp`/warp amplitude with |velocity| (extends existing FBM, `metaball.frag.ts:134`). Idle stays calm; interaction makes the membrane ripple. Cite: iquilezles warp, Bacot damping-ratio.

- **SEED D — Verlet control-ring soft-body feeding metaball sources (SEED, stretch / med-high cost).** Add a small Verlet point-ring (8-16 masses, neighbor + opposing springs, constraint-relaxation), surface its points as additional `uSat*` metaball sources so the body itself deforms as a true soft body, not just a warped circle. The metaball renderer already consumes point sources — this is the principled "real jelly" path. Cite: slsdo Blob Family, VerletExpressJS, Matyka.

- **SEED E — full pressure soft-body (perimeter springs + ideal-gas area term) (SEED, stretch / highest cost).** The charlottedann/Matyka model — only if D's look proves insufficient. Requires moving from "circle SDF + warp" to "SDF built from a deforming control polygon." Highest fidelity, biggest architectural change; document as a deferred option, not a near-term wave. Cite: charlottedann, Matyka arXiv physics/0407003, smacke/pressure-softbody.

## Integration / constraint notes for the planning agent
- Any physics tick must run inside the existing `frame(timeSec)` callback (`useMetaballRenderer.ts:220-309`), which already derives a `dtMs` — feed that dt to the spring/Verlet integrators so they inherit the substrate's offscreen-pause, tab-hidden, and PRM freeze for free (`useMetaballRenderer.ts:100-143`). Under reduced-motion the substrate paints one static frame and parks — the soft-body must settle to a deterministic rest pose, not freeze mid-jiggle.
- Seeds A-C are **zero new runtime deps** (or reuse keyframes.js); Seeds D-E add a sim module under `composables/` but **no new package**, consistent with PRNG/leaf conventions.
- Determinism: GooBlob seeds via `mulberry32(hashString(color))` (`useBlobSatellites.ts:129`); any new physics noise should route the same PRNG leaf (`utils/prng.ts`) to keep the blob reproducible.
- Premium/warm-cream-glass fit: default to **critically-damped (ratio ≈ 1)** for the resting feel; expose a `bounciness`/`squishiness` knob on `BlobConfig` (`types.ts:58`) so consumers dial wobble without editing source (token-first axis).

### Sources
- [Charlotte Dann — Soft-blob physics](https://charlottedann.com/article/soft-blob-physics) (2026-06-06)
- [Matyka — Pressure Model of Soft Body Simulation, arXiv physics/0407003](https://arxiv.org/pdf/physics/0407003) (2026-06-06)
- [smacke/pressure-softbody](https://github.com/smacke/pressure-softbody) (2026-06-06)
- [slsdo — Blob Family](https://slsdo.github.io/blob-family/) (2026-06-06)
- [matthewmain/VerletExpressJS](https://github.com/matthewmain/VerletExpressJS) (2026-06-06)
- [Velocity Skinning for Real-time Stylized Skeletal Animation, arXiv 2104.04934](https://arxiv.org/pdf/2104.04934) (2026-06-06)
- [Houdini Metaballs for Organic Blob Motion — Artivoxa](https://www.artivoxa.com/houdini-metaballs-for-organic-blob-motion-design/) (2026-06-06)
- [josimard / Keijiro — Critically Damped Spring (SmoothDamp) gist](https://gist.github.com/josimard/5737f3488fdfa2d207d68de282904479) (2026-06-06)
- [Alexis Bacot — The Art of Damping](https://www.alexisbacot.com/blog/the-art-of-damping) (2026-06-06)
- [Inigo Quilez — Domain Warping](https://iquilezles.org/articles/warp/) (2026-06-06)

---

### Lane 4

I have everything needed to synthesize a tight brief. Let me write it up.

---

# GooBlob SOTA brief — lane "liquid-surface-tension"

Research-only. Findings + citations + a wave-seed list. No implementation.

## Where the blob is today (baseline, file:line)

- **Field merge**: Quilez *quadratic* `smin` (h*h*k*0.25 form) — `src/components/custom/goo-blob/shaders/sdf-body.glsl.ts:16`.
- **Edge**: FBM-displaced circle SDF, `fwidth`-AA, premultiplied straight-alpha — `shaders/metaball.frag.ts:134-176`.
- **Color**: per-pixel OKLCh L/C/h perturbation + a small inner-edge lightness lift (`edgeGlow`, frag.ts:166-168). Faithful gamma→linear→OKLab→OKLCh→OETF pipeline.
- **Motion**: JS state machine — `orbiting → merging → absorbed → emerging` with eased lerps and an orbit-blend smoothstep — `composables/useBlobSatellites.ts:192-314`.
- **Shape**: flat single-color fill. **No fake normal, no specular, no rim, no refraction.** This is the single biggest gap vs. SOTA "premium liquid" looks.

The field/merge/motion machinery is already strong. The *surface read* is the weak link — it currently looks like a colored blob, not a cohesive droplet of liquid.

## SOTA findings

### 1. The cohesive-droplet merge → circular smin, not quadratic
Quilez's 2024 smin rewrite formalizes **normalization + kernels** and shows the **circular smooth-min** yields "mathematically perfect circular profiles" at junctions — the exact meniscus geometry surface tension produces, where the quadratic only polynomial-approximates it. Cost: one `sqrt`. ([iquilezles.org/articles/smin, 2024](https://iquilezles.org/articles/smin/))

```glsl
// circular smin — k normalized to true blend-thickness
float smin(float a, float b, float k){
  k *= 1.0/(1.0-sqrt(0.5));
  float h = max(k-abs(a-b),0.0)/k;
  return min(a,b) - k*0.5*(1.0+h-sqrt(1.0-h*(h-2.0)));
}
```
The normalization also means `uSmoothK` finally reads as a real distance, decoupling it from the current `/0.22` magic-number normalize in `useMetaballRenderer.ts:272`.

### 2. The premium "liquid" read → fake 3D normal from the 2D SDF + rim/specular/refraction
This is the headline. Every premium 2D-blob/liquid-glass result builds a fake normal from the SDF you *already have*: XY from the screen-space gradient of `d`, Z from edge proximity, then Blinn-Phong specular + a Fresnel/rim term + an optional refraction offset (IOR ~1.5, glass 1.52). ([imadrahmoune "How Apple's Liquid Glass probably works"](https://imadrahmoune.com/liquid-glass/); [kube.io liquid-glass CSS/SVG](https://kube.io/blog/liquid-glass-css-svg/); [Shadertoy "liquid glass" WccXDj](https://www.shadertoy.com/view/WccXDj))

```glsl
vec2 g = vec2(dFdx(d), dFdy(d));           // screen-space SDF gradient
float z = sqrt(max(0.0, 1.0 - dot(g,g)));  // dome the surface near the edge
vec3 N = normalize(vec3(-g, z));
vec3 L = normalize(vec3(-0.4, 0.6, 0.7));  // fixed warm key, upper-left
vec3 H = normalize(L + vec3(0.0,0.0,1.0)); // view ≈ +Z
float spec = pow(max(dot(N,H),0.0), 32.0);          // tight gloss dot
float rim  = pow(1.0 - max(dot(N,vec3(0,0,1)),0.0), 3.0); // Fresnel edge glow
```
Take `max(spec, rim*scale)` so it reads as a single soft highlight, not two ([Blinn-Phong+Fresnel rim guidance, GameDev.net](https://gamedev.net/forums/topic/625142-blinn-phong-with-fresnel-effect/); [Wikipedia Blinn-Phong](https://en.wikipedia.org/wiki/Blinn%E2%80%93Phong_reflection_model)). For glass-ui specifically: tint the specular warm-cream (not white), and tint the rim toward `--foreground` — that's what marries it to the warm-cream glass system instead of looking like a generic glossy bubble. Refraction (offsetting a sampled backdrop along `N.xy`) is the richest tier but needs a backdrop texture; the rim+spec alone already lifts the flat fill to "premium droplet" with **zero extra textures** and reuses the existing `fwidth(d)`.

### 3. Codrops droplet metaballs (the closest reference, June 2025)
Three.js/GLSL interactive droplets: SDF + `smoothMin(k=7)` exponential blend, normal-from-gradient central differences, mouse-trail spawns **satellite spheres with diminishing radii** along a 15-element trail (the taffy/stretch read), `pow(color, 7.0)` to crush mids and pop highlights for the glass look, 16 raymarch iterations, orthographic camera. ([Codrops, 2025-06-09](https://tympanus.net/codrops/2025/06/09/how-to-create-interactive-droplet-like-metaballs-with-three-js-and-glsl/)). The 3D raymarch is overkill for a 7rem chip, but two transferable ideas: (a) the **diminishing-radius trail** as the pinch-off shape, (b) the **`pow()` tone-crush** as a cheap glossy contrast lift.

### 4. Pinch-off / surface-tension dynamics → physically-grounded timing
Liquid columns break by **Rayleigh-Plateau instability**; detachment happens at critical aspect ratio ≈ 4.5 (the neck thins, then snaps). Lava-lamp sims model this as a **one-time upward "detachment impulse"** when a blob breaks free, plus thermal rise/fall. ([WebSearch: Rayleigh-Plateau / lava-lamp detachment](https://damianvandermerwe.com/blog/painting-with-math-lava-lamp-shader); arXiv 1601.03887 on drop pinch-off). For GooBlob this argues the merge/emerge should be **asymmetric**: the neck should *thin and accelerate at snap* (a sharp ease-in tail) rather than the symmetric eased lerp at `useBlobSatellites.ts:283-304`. Currently the absorb is a smooth fade; a real droplet pinches — the connecting neck necks down then releases with a tiny recoil bounce.

### 5. Organic breathing → domain warping, cheaply
`fbm(p + fbm(p))` (two-level warp) is "organic enough" and saves ~33% over deeper nesting; inject `uTime` into one octave for the breathing evolution. ([iquilezles.org/articles/warp](https://iquilezles.org/articles/warp/); [Book of Shaders ch.13](https://thebookofshaders.com/13/)). The current single-FBM edge displacement (`watercolor-edges.glsl.ts`) is one warp level; a second nested level on the displacement coord would make the surface ripple read as fluid, not noisy.

### 6. The cheap fakes (know them, to reject them)
The SVG `feGaussianBlur` + `feColorMatrix` "goo filter" merges DOM elements with no shader — wide support, near-free, but a flat 2D illusion with no surface, no normal, no per-pixel control, and the blur/threshold combo is jittery and aliases on retina. ([CSS-Tricks Gooey Effect](https://css-tricks.com/gooey-effect/); [dev.to SVG Metaballs](https://dev.to/antogarand/svg-metaballs-35pj)). **Verdict: stay on WebGL2.** glass-ui's SDF approach already dominates this; the only thing the goo-filter has that we lack is it's *trivially* cheap — irrelevant given the substrate's offscreen-park machinery already handles cost.

## ADOPT / wave-seed list

Ranked by visual-impact-per-cost. All are shader/composable edits within the existing `useWebGLCanvas` substrate — no new deps, no surface change.

- **W-seed 1 — HEADLINE: fake-normal surface (spec + rim) [HIGH impact, LOW cost].** Build `N` from `dFdx/dFdy(d)` + edge-dome Z; add a warm-cream Blinn-Phong specular and a `--foreground`-tinted Fresnel rim, combined via `max()`. Reuses the existing SDF and `fwidth`. This converts the flat fill into a cohesive liquid droplet and is the single biggest premium win. Tint to warm-cream to bind it to glass-ui. (Refs: Apple-liquid-glass explainer, Shadertoy WccXDj, Codrops `pow()` tone-crush.)

- **W-seed 2 — circular smin [MED impact, LOW cost].** Swap the quadratic `smin` in `sdf-body.glsl.ts:16` for Quilez's normalized **circular** smin; retire the `/0.22` magic normalize in `useMetaballRenderer.ts:272` since `k` becomes true blend-thickness. Cleaner menisci at the satellite merge — the surface-tension seam. (Ref: iquilezles smin 2024.)

- **W-seed 3 — asymmetric pinch-off timing [MED impact, LOW cost].** Reshape `merging`/`emerging` in `useBlobSatellites.ts:283-304`: neck thins then snaps (sharp ease-in tail) with a small recoil overshoot on emerge, instead of the symmetric eased lerp. Physically-grounded by Rayleigh-Plateau neck pinch. JS-only, no shader change. (Ref: lava-lamp detachment impulse, drop pinch-off arXiv.)

- **W-seed 4 — two-level domain warp on the edge [MED impact, LOW cost].** Nest the edge displacement as `fbm(p + fbm(p))` with `uTime` in the inner octave. Surface reads as a breathing fluid, not static noise. (Ref: iquilezles warp.)

- **W-seed 5 — `pow()` glossy tone-crush [LOW impact, near-zero cost].** A mild `pow(rgb, ~1.3–1.6)` (gentler than Codrops' 7.0, which is for full 3D glass) after the OETF to deepen mids and pop the new specular. Tune in OKLCh-L instead of raw RGB to stay perceptual and not muddy the warm hue. (Ref: Codrops droplet `pow(color,7.0)`.)

- **W-seed 6 — OPTIONAL interactive refraction [HIGH impact, MED cost].** Sample the glass backdrop along `N.xy * (IOR-1)` for true liquid-glass refraction + a subtle chromatic split on R/B. Requires feeding a backdrop texture into the blob (it currently composites over transparent). Highest-fidelity tier; defer unless the blob sits over a known busy surface. (Refs: kube.io, LiquidGlass.js, imadrahmoune.)

- **W-seed 7 — OPTIONAL pointer-trail satellites [MED impact, MED cost].** On active pointer, spawn 2-3 diminishing-radius satellites along the cursor path (Codrops taffy trail) that smin into the body — turns the existing static pointer-deform into an interactive droplet-stretch. Builds on `useBlobPointer.ts`. (Ref: Codrops droplet trail.)

**Reject:** SVG/CSS goo-filter (flat, aliases on retina, no surface — strictly inferior to current WebGL2). 3D raymarch (Codrops full approach) — overkill for a 7rem chip; the 2D-SDF fake-normal gets ~90% of the premium read at a fraction of the cost.

**Integration note for all seeds:** every one composes the existing `useWebGLCanvas` substrate (offscreen-park, PRM-freeze, DPR clamp already handle the performance budget) and the OKLCh color pipeline — keep specular/rim/tone-crush *in OKLCh-L space before the OETF* so they stay perceptual and married to the warm-cream tokens, never raw-RGB white.

### Sources
- [Quilez — smooth minimum (2024 rewrite, normalization+kernels, circular smin)](https://iquilezles.org/articles/smin/)
- [Quilez — domain warping](https://iquilezles.org/articles/warp/)
- [Codrops — Interactive droplet-like metaballs, Three.js/GLSL (2025-06-09)](https://tympanus.net/codrops/2025/06/09/how-to-create-interactive-droplet-like-metaballs-with-three-js-and-glsl/)
- [imadrahmoune — How Apple's Liquid Glass probably works (2D-SDF fake normal, rim, IOR)](https://imadrahmoune.com/liquid-glass/)
- [kube.io — Liquid Glass in the browser: refraction with CSS+SVG](https://kube.io/blog/liquid-glass-css-svg/)
- [Shadertoy — "liquid glass" WccXDj (2025)](https://www.shadertoy.com/view/WccXDj)
- [Damian van der Merwe — Painting with Math: lava lamp shader (field metaballs, banding, drift)](https://damianvandermerwe.com/blog/painting-with-math-lava-lamp-shader)
- [Book of Shaders — Fractal Brownian Motion (ch.13)](https://thebookofshaders.com/13/)
- [CSS-Tricks — The Gooey Effect (SVG cheap fake)](https://css-tricks.com/gooey-effect/)
- [dev.to — SVG Metaballs](https://dev.to/antogarand/svg-metaballs-35pj)
- [Blinn-Phong + Fresnel rim (GameDev.net)](https://gamedev.net/forums/topic/625142-blinn-phong-with-fresnel-effect/) · [Wikipedia Blinn-Phong](https://en.wikipedia.org/wiki/Blinn%E2%80%93Phong_reflection_model)
- WebSearch (2026-06-06): Rayleigh-Plateau pinch-off / lava-lamp detachment-impulse dynamics

---

### Lane 5

I have everything needed. The current blob has all the kinematic machinery (mood, satellites, pointer, pulse, FBM edges, OKLCh color) but is **optically flat** — no glass material at all. The research maps cleanly onto wave-seeds. Here is the brief.

---

# SOTA Brief — iOS-26 "Liquid Glass" for GooBlob
Lane: `ios-liquid-glass-blob` · research + wave-seeds only, NO implementation

## What Apple's Liquid Glass actually is (the target)

Apple's material (WWDC25 "Meet Liquid Glass", Jun 9 2025) is NOT glassmorphism. Glassmorphism = blur + transparency. Liquid Glass = **light that is bent, shaped, and concentrated in real time** — refraction, not scatter. The canonical behaviors, in Apple's own words:

- **Lensing / refraction** — "dynamically bends, shapes, and concentrates light in real time"; content behind it is optically lensed, not just blurred. Larger/thicker glass = "more pronounced lensing and refraction."
- **Specular highlights that travel** — "light sources inside this environment shine on the material producing highlights that respond to geometry"; on interaction "these lights move in space, causing light to travel around the material, defining its silhouette." Responds to device motion.
- **Gel-like flex & morph** — "inherent gel-like flexibility… transient and malleable"; elements "materialize in and out by gradually modulating the light bending and lensing" (NOT fade). Merge/separate via smin-style blending.
- **Energize-from-within on touch** — "illuminates from within… starting right under your fingertips, the glow spreads throughout the element and onto any Liquid Glass elements nearby."
- **Adaptive shadow** — shadow opacity rises over text/dark content, drops over light; light "bleeds into the shadow."
- **Two variants** — *Regular* (adaptive, legible anywhere) vs *Clear* (permanently transparent, needs a dimming layer). Never mixed.
- **Accessibility** — honors Reduce Motion (simplify transitions), Reduce Transparency (add opacity), Increase Contrast (more separation).

Sources: [Meet Liquid Glass — WWDC25 (Apple, 2025-06-09)](https://developer.apple.com/videos/play/wwdc2025/219/) · [Apple Newsroom (2025-06-09)](https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/) · [Liquid Glass — Wikipedia](https://en.wikipedia.org/wiki/Liquid_Glass) · [designed-for-humans accessibility (2025)](https://designedforhumans.tech/blog/liquid-glass-smart-or-bad-for-accessibility)

## Where GooBlob stands today (the gap)

GooBlob already owns the **kinematics** Apple describes — gel morph (smin merge of body+satellites, `metaball.frag.ts:144`), pulse, FBM organic edge, mood system, pointer deformation, per-pixel OKLCh color (`metaball.frag.ts:157-173`), reduced-motion freeze via the `useWebGLCanvas` substrate. What it entirely lacks is the **optical/material layer**: the body is a flat filled SDF with a solid color + a tiny inner-glow lift (`metaball.frag.ts:166-168`). No refraction of what's behind, no specular highlight, no Fresnel rim, no chromatic aberration, no sense of thickness. It reads as a colored goo, not glass.

The blob's color pipeline (linear OKLCh, Ottosson matrices, mandatory OETF — `metaball.frag.ts:104-173`) is already the right substrate to add physically-plausible lighting into. The SDF (`d` in `metaball.frag.ts:137`) already gives a signed distance — which is exactly the height-field/normal source every refraction technique needs. The pieces are there; the material math is missing.

## The web techniques to approach it (three camps)

**1. SVG displacement-map refraction (CSS, the kube.io canon).** Build a displacement map (R=x-shift, G=y-shift, 128=no shift), feed `feDisplacementMap` over `backdrop-filter`. Refraction derived from Snell's law on a surface height-field; normal via numerical derivative `(-dy, 1)`; Apple's softer edge is the **convex squircle** `⁴√(1-(1-x)⁴)`, NOT a plain circle. Specular = a separate rim-light keyed to surface-normal-vs-light angle, blended via `feBlend`. **Verdict for GooBlob: wrong tool** — `backdrop-filter: url(#filter)` is Chrome-only, maps must rebuild on any shape change (the blob morphs every frame → constant rebuild = death), and it only does rounded rects/circles, not an organic morphing SDF.
Source: [kube.io — Liquid Glass in the Browser (2025)](https://kube.io/blog/liquid-glass-css-svg/), confirmed on [HN #45174297](https://news.ycombinator.com/item?id=45174297)

**2. WebGL screen-texture refraction (ybouane, naughtyduk/liquidGL, dashersw).** Capture the DOM behind via `html-to-image`, pass as a texture, displace its UVs by a normal/height map in a fragment shader. Exposes the exact parameter vocabulary GooBlob wants: `refraction` (0.69), `chromAberration` (0.05), `specular`/Blinn-Phong, `fresnel` (1), `edgeHighlight` (rim, 0.05), `zRadius`/`bevelMode` (thickness). **Verdict: right shader model, wrong capture step** — `html-to-image` rasterization is "expensive," one WebGL context per instance (16-context cap), re-captures on resize. GooBlob is already WebGL2 on a shared substrate; it should borrow the *shader math* (UV-displacement refraction + Fresnel + Blinn-Phong + chroma split) but NOT the DOM-capture pipeline.
Sources: [LiquidGlass — ybouane.com](https://liquid-glass.ybouane.com/) · [naughtyduk/liquidGL (GitHub)](https://github.com/naughtyduk/liquidGL) · [dashersw/liquid-glass-js](https://dashersw.github.io/liquid-glass-js/)

**3. True 3D transmission (Three.js `MeshTransmissionMaterial`).** The premium gel/epoxy look: `transmission`, `thickness` (magnify), `ior`, `roughness`, `chromaticAberration` (0→1 rainbow edges), `distortion`. This is the "real glass orb" gold standard. **Verdict: too heavy** — pulls in Three.js, breaks the shared `useWebGLCanvas` substrate, overkill for a 2D-screen-space blob. Use it only as the **visual reference** for what "thickness magnifies" and "IOR bends" should look like, then approximate in the existing 2D fragment shader.
Sources: [drei MeshTransmissionMaterial docs](https://drei.docs.pmnd.rs/shaders/mesh-transmission-material) · [Codrops — glass torus refraction (2025-03-13)](https://tympanus.net/codrops/2025/03/13/warping-3d-text-inside-a-glass-torus/)

**Performance guidance (2026 consensus):** WebGL/WebGPU fragment refraction is the direction; cap ~3 concurrent glass surfaces; blur 8–16px compensated with saturation; OKLCh-normalize highlight lightness so specular stays visible on any background; 60fps with layer isolation. Source: [Lucky Graphics — Definitive Guide 2026](https://lucky.graphics/learn/liquid-glass-css-glassmorphism-tutorial/)

## ADOPT / wave-seed list

The throughline: **GooBlob stays a 2D-screen-space WebGL2 SDF on the shared substrate** (no Three.js, no DOM-capture). We graft the *material math* from camp 2 onto the existing SDF + OKLCh pipeline. The SDF `d` is the height-field; `∇d` (via `fwidth`/numerical derivative, already used for AA at `metaball.frag.ts:149`) is the surface normal source.

- **WAVE-SEED A — Refractive lensing of the background.** Sample the substrate's backdrop (or a downscaled scene/aurora texture, or `backdrop` of the page region) and displace its UVs by the SDF gradient, scaled by an `ior`/`refraction` uniform. Stronger displacement where the SDF normal is steep (the blob's rim). Apple's "content lenses through it." Gate behind a `material: "goo" | "glass"` prop so the flat goo look stays default. *Risk: getting a usable backdrop texture in 2D screen-space without DOM-capture — likely sample the substrate's own framebuffer or accept a passed-in `backgroundTexture` prop.*

- **WAVE-SEED B — Specular highlight + Fresnel rim (the headline).** Add a Blinn-Phong specular lobe and a Fresnel term computed from the SDF normal vs a light-direction uniform. This is the single highest-visual-impact, lowest-risk add — pure shader math on the normal we already derive, no backdrop needed. New uniforms map onto the existing config struct (`types.ts:58`): `specularStrength`, `fresnelPower`, `lightDir`, `rimWidth`. Drop the crude `edgeGlow` lift (`metaball.frag.ts:166-168`) in favor of a real Fresnel rim.

- **WAVE-SEED C — Specular travel on pointer/motion.** Drive `lightDir` from the existing `useBlobPointer` (`composables/useBlobPointer.ts`) so the highlight tracks the cursor, and optionally from `DeviceOrientation` on touch devices — Apple's "light travels around the material." Reuses the pointer seam already wired into the renderer (`GooBlob.vue:61,71`). Honor reduced-motion: freeze `lightDir` to a static top-left under PRM (the substrate already freezes the rAF).

- **WAVE-SEED D — Chromatic aberration at the rim.** Split the refraction sample into R/G/B with a small per-channel UV offset scaled by the SDF gradient magnitude — color fringing only where the glass is "thickest" (the edge). One `chromAberration` uniform (default ~0.05). Cheap, instantly "premium," reads as real glass dispersion. Depends on A (needs the refracted sample).

- **WAVE-SEED E — Energize-from-within on interaction.** On `nudge()`/click (`GooBlob.vue:80`), pulse an inner OKLCh-lightness bloom that originates at the pointer position and spreads outward over ~400ms — Apple's "illuminates from within, starting under your fingertip." Layers onto the existing OKLCh lightness channel (`metaball.frag.ts:168`); no new pipeline. Pairs naturally with the existing mood→`excited` transition.

- **WAVE-SEED F — Thickness / adaptive shadow.** Make the wrapper drop-shadow (`GooBlob.vue:127-139`) adaptive: deepen over dark/text backgrounds, soften over light — Apple's adaptive shadow. Low-risk CSS-side; can read a `--blob-on-dark` token or sample backdrop luminance. Couple shadow depth to the new `thickness` uniform so a "thicker" glass blob casts a richer shadow (Apple: bigger glass → deeper shadow).

- **WAVE-SEED G (de-scope candidate) — `material` variant axis.** Formalize Apple's Regular/Clear split as a `variant: "goo" | "glass-regular" | "glass-clear"` prop. `goo` = today's flat look (default, zero regression). `glass-regular` = full A–F stack, adaptive. `glass-clear` = max transmission + a dimming layer. Honors the "never mix" rule and gives consumers the warm-cream-glass integration knob. *Likely the wave that ties A–F together rather than a standalone.*

**Cross-cutting constraints to bake into every wave:**
- Stay on `useWebGLCanvas`; never bootstrap a second context or pull Three.js (substrate-single invariant, `proof:webgl-substrate-single`).
- All new color math goes through the existing linear→OKLCh→OETF pipeline (`metaball.frag.ts`); never short-circuit the OETF (the `proof:blob-space-gamma` trap).
- Reduced-motion: static specular, no travel, no energize bloom (substrate already parks the rAF — the shader must also resolve to a single coherent still frame).
- Warm-cream integration: specular/rim tint should ride the glass-ui foreground/`--blob-color` tokens, not hardcoded white, so highlights read warm not clinical.
- Default look unchanged: gate all material adds behind the variant/material prop so existing consumers see zero delta.

## Key file references
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/goo-blob/shaders/metaball.frag.ts:137` — SDF body `d` (the height-field for refraction)
- `…/metaball.frag.ts:149` — `fwidth(d)` already derives the screen-space gradient (normal source for A/B/D)
- `…/metaball.frag.ts:157-173` — OKLCh color block (where E's bloom and B's rim lighting splice in)
- `…/metaball.frag.ts:166-168` — crude `edgeGlow` to be replaced by a real Fresnel rim (B)
- `…/goo-blob/GooBlob.vue:61,71` — pointer seam (drives C); `:80` `nudge()` (drives E); `:127-139` wrapper shadow (drives F)
- `…/goo-blob/types.ts:58-133` — `BlobConfig` struct + `BLOB_CONFIG_DEFAULTS`, where new material uniforms register

---

### Lane 6

I have everything needed. Here is the brief.

---

# SOTA brief — GooBlob organic ambient motion (lane: organic-motion-noise)

Research only. NO implementation. Findings + citations + wave-seeds for tranche planning.

## Baseline (what GooBlob does today)

- **Boundary perturbation:** value-noise FBM (3 octaves, 2.0 lacunarity, 0.5 persistence, ~0.5rad rotated octaves) displaces a circular SDF radius — `bodyDisplacement = (noise-0.5)*uNoiseAmp` at `metaball.frag.ts:134-137`.
- **Breathing:** single `sin(uPulsePhase)*uPulseAmp` on the body radius (`metaball.frag.ts:131`).
- **Satellites:** JS-side orbiting metaball sources, `smin`-merged in shader, with an orbit→merge→absorbed→emerge lifecycle (`useBlobSatellites.ts`).
- **Color:** per-pixel OKLCh L/C/h perturbation off a second FBM field (`metaball.frag.ts:159-170`).
- **Pointer:** single-vector UV pull/push, `smoothstep(0.4,0,dist)` falloff (`metaball.frag.ts:123-128`).
- **Mood:** 5 named param presets cross-faded (`useBlobMood.ts`).
- **Accessibility (already held):** WCAG 2.2.2 pause via `DockBackgroundToggle`; live `prefers-reduced-motion` freeze in `useWebGLCanvas`. The lane should NOT re-solve this — it's done.

The gap vs SOTA: the body is **single-frequency, axis-Cartesian noise + one sine**. SOTA blobs feel alive through (1) domain-warped noise, (2) deliberately-detuned multi-frequency motion that never resyncs, (3) liquid-tuned FBM constants, and (4) momentum/spring response rather than instantaneous pointer pull.

---

## Findings

### 1. Domain warping is the single highest-leverage upgrade (Inigo Quilez)
Instead of `noise(p)`, evaluate `noise(p + noise(p + noise(p)))`. Nested warp layers compound distortion while keeping recognizable structure — "abstract but beautiful images with a pretty organic quality." The intermediate `q`/`r` warp vectors can ALSO drive color variation (free dimensionality). Canonical form with IQ's offset constants and `4.0` warp amplitude.
[iquilezles.org/articles/warp, technique predates 2002, fetched 2026-06-06](https://iquilezles.org/articles/warp/)

GooBlob's `fbm(uv*freq + time*speed)` is a *zeroth-order* (un-warped) field. One warp pass on the boundary-noise input would move it from "wobbly circle" to "living membrane" with no new uniforms beyond a warp-amp scalar.

### 2. Liquid-tuned FBM constants ≠ terrain constants (lava lamp shader)
Textbook FBM uses persistence 0.5 / lacunarity 2.0 ("rocky terrain"). For a **liquid feel** the lava-lamp author deliberately detunes to **persistence 0.42 / lacunarity 1.8**. Movement uses sinusoidal paths with **irrational frequency ratios (0.13 and 0.11 rad/s) so blobs never perfectly synchronise**. Only **2 octaves** for performance. Startup uses an ease-in-out acceleration curve to avoid abrupt onset.
[damianvandermerwe.com/blog/painting-with-math-lava-lamp-shader, fetched 2026-06-06](https://damianvandermerwe.com/blog/painting-with-math-lava-lamp-shader)

Direct hit: GooBlob's body uses textbook 2.0 lacunarity (`procedural-color.glsl.ts:24` notes blob loop is 2.0). The "never resync" insight is the cheapest path to perceived life — GooBlob's single `sin(uPulsePhase)` is perfectly periodic and reads as mechanical.

### 3. Polar/radial noise for true boundary morph (Codrops)
Apply noise as a function of **angle and distance from center** so the perturbation propagates radially — a ring that pulsates via distance-modulated noise frequency (`density = 1.8 - dist; noise(uv*40*density, time)`), animated continuously through a `u_time` uniform. The Cartesian-distance variant naturally produces radial wave propagation.
[tympanus.net/codrops/2024/05/02/model-texture-transition-and-procedural-radial-noise, 2024-05-02, fetched 2026-06-06](https://tympanus.net/codrops/2024/05/02/model-texture-transition-and-procedural-radial-noise-using-webgl/)

GooBlob displaces the SDF radius with *Cartesian* `uv`-space noise, which is biased along screen axes (the rotated-octave hack at `watercolor-edges.glsl.ts:31` is a partial mitigation). Sampling noise as `fbm(angle, time)` along the boundary perimeter gives axis-free, genuinely radial breathing.

### 4. Soft-body springs as an alternative motion source (gorillasun)
Perimeter points on a circle (`x=cx+r·cosθ`), neighbor springs + center-anchor springs + an inner concentric ring; stiffness 0.25 perimeter / 0.2 center; pointer deformation rides drag velocity so momentum is retained on release ("natural feel without mechanical snapping"). Single-ring springs collapse — the multi-spring topology is what makes it return-to-shape and jiggly.
[gorillasun.de/blog/soft-body-physics-and-blobs, fetched 2026-06-06](https://www.gorillasun.de/blog/soft-body-physics-and-blobs/)

This is an *alternative* to pure-noise (CPU spring sim feeding boundary radii into the shader). Higher fidelity for jiggle/pointer-squish, but heavier and harder to keep on the existing GPU SDF substrate. Recommend as a **considered-and-deferred** option, not a headline — pure noise + momentum-smoothed pointer gets 80% of the feel on the existing substrate.

### 5. Curl/divergence-free noise for satellite drift (Bridson SIGGRAPH 2007 + current work)
Curl noise is divergence-free → produces swirling, fluid-like, non-converging flow (vs value/gradient noise which has sources/sinks that look like "random peaks"). It's the standard VFX flow primitive; recent improvements (2025) exist.
[Bridson, "Curl-Noise for Procedural Fluid Flow", SIGGRAPH 2007](https://www.cs.ubc.ca/~rbridson/docs/bridson-siggraph2007-curlnoise.pdf) · [emildziewanowski.com/curl-noise, fetched 2026-06-06](https://emildziewanowski.com/curl-noise/) · [janba/DivFree-VectorNoise (Improving Curl Noise, 2025)](https://github.com/janba/DivFree-VectorNoise)

GooBlob's satellites are hand-tuned sin/cos orbit + wobble (`useBlobSatellites.ts:77-91`) — lots of magic constants. A curl-noise field would give organically-divergent satellite drift from one coherent flow, replacing ~12 per-satellite tunables.

### 6. Breathing rhythm grounded in human cadence (Apple Breathe)
Apple Breathe grows on inhale / shrinks on exhale at **4–10 breaths/min**, with **smooth inhale↔exhale transition** (not symmetric); calm range is **5–7 bpm**. 5 bpm = a **12-second** full cycle; 6 bpm = 10s.
[Apple Support — Reflect/Breathe on Apple Watch, fetched 2026-06-06](https://support.apple.com/guide/watch/start-a-reflect-or-breathe-session-apd371dfe3d7/watchos)

GooBlob idle `pulseFreq: 0.3` (`useBlobMood.ts:9`) → 0.3 rad/s ≈ 21s/cycle (≈2.9 bpm), slower than the calm band, AND symmetric (pure sine). A **slightly asymmetric** breath (slower exhale) at ~6 bpm reads as "alive thing breathing" rather than "oscillator." This is a tuning + curve-shape change, not new machinery.

### 7. Pointer interaction: momentum/spring, not instantaneous pull
SOTA repulsion/attraction UI uses spring-mass response with retained momentum; the deform eases out and recovers rather than snapping. 2024-25 is an active trend (Codrops repulsion, GSAP magnetic cursor).
[tympanus.net/codrops/2018/12/06/interactive-repulsion-effect-with-three-js](https://tympanus.net/codrops/2018/12/06/interactive-repulsion-effect-with-three-js/) · [speckyboy.com/repelling-effect-in-web-design (2025)](https://speckyboy.com/repelling-effect-in-web-design/)

GooBlob's pointer is a stateless per-frame UV pull (`metaball.frag.ts:123-128`) — it tracks the cursor exactly with zero lag/overshoot, which reads mechanical. A spring-smoothed `uPointer` (CPU lerp toward target + velocity term) gives the premium "blob chases and overshoots" feel cheaply.

### 8. Accessibility — already satisfied, guard it
WCAG 2.2.2 requires pause/stop for continuous non-essential motion (held by `DockBackgroundToggle`); 2.3.3 + `prefers-reduced-motion` for interaction motion (held by `useWebGLCanvas` live PRM freeze). Best practice: reduce/replace motion, don't strip — opacity fade / shortened duration as the reduced variant.
[w3.org/WAI/WCAG22/Techniques/css/C39](https://www.w3.org/WAI/WCAG22/Techniques/css/C39) · [w3.org/WAI/WCAG22/Understanding/animation-from-interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)

Any new interactive pointer-deform (seed 7) must inherit the existing PRM freeze — do not add a parallel path. New motion must stay reachable by `DockBackgroundToggle`'s `pause()`/`resume()` seam.

---

## ADOPT / wave-seed list (ranked)

| # | Seed | What | Why / payoff | Cost | Touches |
|---|------|------|--------------|------|---------|
| **S1** | **Domain-warp the boundary noise** | One warp pass: feed `fbm(uv + W·fbm(uv))` into the body displacement; add `uWarpAmp` uniform. | Highest leverage; "wobbly circle" → "living membrane." Free color-modulation bonus from the warp vector. | Low | `metaball.frag.ts:134-137`, `watercolor-edges.glsl.ts` |
| **S2** | **Liquid-tune the body FBM + de-sync the breath** | Body-loop lacunarity 2.0→1.8, persistence 0.5→0.42; replace single `sin(pulsePhase)` with 2-3 detuned sines at irrational ratios (~0.11/0.13/0.17). | "Liquid not rocky"; kills the mechanical periodicity. Pure constant/curve change. | Low | `procedural-color.glsl.ts:24` (blob loop), `metaball.frag.ts:131`, `useBlobMood.ts` |
| **S3** | **Polar boundary breathing** | Sample boundary displacement as `fbm(angle, time)` (or distance-modulated) instead of Cartesian `uv` noise, so morph is axis-free and radial. | True radial breathing; removes axis bias the rotated-octave hack only partially fixes. | Med | `metaball.frag.ts:133-137` |
| **S4** | **Breath cadence to human range** | Idle breath → ~6 bpm (10s cycle), slightly asymmetric (slower exhale). | Reads as a calm living thing; aligns with Apple Breathe calm band. | Low | `useBlobMood.ts:9,13,etc` (pulseFreq across moods) |
| **S5** | **Spring/momentum pointer** | CPU-smooth `uPointer` toward cursor with velocity + overshoot; deform eases out and recovers. | Premium "chase + overshoot" vs exact-tracking snap. MUST inherit PRM freeze. | Low-Med | new state in `useBlobPointer.ts`, `metaball.frag.ts:123-128` |
| **S6** | **Curl-noise satellite drift** | Replace per-satellite sin/cos orbit constants with a shared 2D curl-noise flow field for organically divergent drift. | Coherent fluid drift; collapses ~12 magic constants per satellite. | Med-High | `useBlobSatellites.ts:77-117` (orbitPos/randomizeOrbit) |
| **S7** | *(defer)* Soft-body spring boundary | CPU Verlet perimeter ring → feed radii to shader. | Highest-fidelity jiggle/squish, but heavy + off the GPU-SDF substrate. | High | new composable; out of scope for a light wave — log as considered-rejected unless jiggle is a headline goal |

**Suggested wave grouping for the planner:** a **"living-membrane" wave** (S1+S2+S3, all shader-side, shared `metaball.frag.ts` blast radius — do together to avoid re-touching the splice), a **"breath + pointer feel" wave** (S4+S5, JS/composable-side, premium-feel pass), and **S6 as a standalone satellite-motion wave** (isolatable, higher risk). S7 stays out unless the tranche explicitly wants physical jiggle.

**Guardrails carried from baseline:** every seed must (a) keep the AV.W2 shared-`FBM_ROT`/OETF splice intact (don't fork the color chunk), (b) inherit the `useWebGLCanvas` PRM freeze + offscreen-park (no parallel rAF), and (c) stay reachable by `DockBackgroundToggle`'s `pause()`/`resume()`. The OKLCh color path and gamut clamp are SOTA already — leave them.

---

### Lane 7

I have all axes corroborated. Synthesizing the brief.

---

# SOTA Brief — goo-blob OKLCh color (Lane: oklch-blob-color)

Research-only. No implementation. Findings grounded against the current shader in `src/components/custom/goo-blob/` + `src/composables/glass/webgl/shaders/procedural-color.glsl.ts`.

## Where the blob is today (baseline)

The current color path is solid but **flat and self-contained**:

- `metaball.frag.ts:159-173` — color is one `uBaseColor` lifted into OKLCh, perturbed by a single FBM field (`hue/chroma/lightness` swing), gamut-clamped, OETF'd out. Defaults (`types.ts:116-119`): `hueRange: 5°`, `satShift: 0`, `brightnessShift: 0` — i.e. **near-monochrome**. The "color that shifts with the boundary" is just a `±2.5°` hue wobble.
- The only spatial color cue is `edgeGlow` (`metaball.frag.ts:167-168`) — a flat inward lightness lift of `+0.06`. No view/angle/normal term, no gradient axis, no specular, no iridescence.
- The shader **has the right substrate already**: exact Ottosson OKLab/OKLCh matrices, a hue-preserving gamut clamp (`oklch-perturb.glsl.ts`), an analytic-ish SDF (`sdf-body.glsl`), and `fwidth` AA. It is one color-model upgrade away from premium — the math foundation is done.

The gap vs SOTA: **no surface model.** Premium 2025 blobs read as *material* (gel/soap-film/oil-slick) because color varies along a derived surface axis — a fake normal, a fresnel rim, or a gradient mapped through the body — not a uniform fill with a hue jitter.

## SOTA findings (cited)

**1. 2D SDF gradient = free fake normal.** Inigo Quilez's 2D distance-gradient primitives return `∇f(p)` (unit-length) alongside distance, usable directly as a surface normal for lighting on a flat shape — cheaper than numerical differentiation. The blob already computes the SDF; taking its gradient (or `fwidth`/`dFdx`/`dFdy` of `d`, already partly used for AA at `metaball.frag.ts:149`) yields a normal axis for free. ([iquilezles.org/articles/distgradfunctions2d, ~2020](https://iquilezles.org/articles/distgradfunctions2d/))

**2. Fresnel rim as the iridescence driver.** The premium-but-cheap idiom (Phish Chiang, Ronja, inspirnathan): compute a fresnel-like term `pow(1 - dot(N, V), p)`, then *use that scalar as a 1D coordinate into a color cycle* — view/edge angle drives the hue band. On a 2D blob, `N` is the SDF gradient and "edge-ness" is the normalized `d`, so the rim term is `pow(saturate(d_normalized), k)`. ([Phish Chiang, GLSL iridescent shader](https://medium.com/phishchiang/glsl-study-simple-iridescent-shader-156f8d1a9e5d); [inspirnathan Fresnel/Rim, part 12](https://inspirnathan.com/posts/58-shadertoy-tutorial-part-12/); [Ronja Fresnel](https://www.ronja-tutorials.com/post/012-fresnel/))

**3. Cosine palette = the oil-slick generator.** Inigo Quilez's `a + b*cos(τ(c*t + d))` (4× vec3) is *the* standard procedural iridescence/oil-slick palette — feed it the fresnel/edge coordinate `t` and it sweeps a continuous, controllable rainbow band. Cheaper and smoother than the discrete 5-color `smoothstep` banding. To stay perceptually clean it should drive **OKLCh hue (h)** rather than raw RGB. ([iquilezles.org/articles/palettes](https://iquilezles.org/articles/palettes/); [Erkaman/glsl-cos-palette](https://github.com/Erkaman/glsl-cos-palette))

**4. Physically-based thin-film is overkill here.** Real soap-film interference samples many wavelengths (6 is the cheap floor, 81 for accuracy) and needs view+thickness geometry — too heavy and too saturated for a warm-cream glass UI. The RGB-at-3-wavelengths approximation (650/510/475nm into the Fresnel term) is the fast compromise, but even that is more than a flat decorative blob warrants. **Recommendation: fake iridescence (fresnel→cosine-palette), not PBR thin-film.** ([Alan Zucconi car-paint thin-film](https://www.alanzucconi.com/2017/10/27/carpaint-shader-thin-film-interference/); [Physically-Based Soap Bubble, Shadertoy XtKyRK](https://www.shadertoy.com/view/XtKyRK); [OpenPBR thin-film, arXiv 2512.23696](https://arxiv.org/pdf/2512.23696))

**5. SOTA interactive metaballs (Codrops, Yuki Kojima, Jun 9 2025).** Reference patterns worth lifting: **pointer-trail** (array of 15 historical pointer positions, each spawning a shrinking sphere `smin`-merged into the body — a liquid "comet tail" following the cursor), and **reflection-mapped noise color** (sample noise along the reflect/normal vector, not flat — the same idea as #1/#2). No iridescence/fresnel in that demo; its color is dual-noise-blended RGB. ([Codrops, droplet metaballs](https://tympanus.net/codrops/2025/06/09/how-to-create-interactive-droplet-like-metaballs-with-three-js-and-glsl/))

**6. Premium fluid UI direction (2025 market).** "Liquid Glass" kits ship surface-tension cohesion (droplets stretch/snap), true-refraction sampling the background, and mesh-gradient fills — the bar for "premium blob" is now *material that interacts with its backdrop*, not a colored sprite. Refraction (sampling glass-ui's warm-cream backdrop through the blob) is the highest-effort, highest-payoff option. ([Liquid Glass UI Kit v1.6 "Organics"](https://liquid-glass-web.itch.io/liquid-glass-ui-kit-modern-tailwind-components-for-websites-apps); [Fluid Scroll Mesh, Framer](https://www.framer.com/marketplace/components/fluid-scroll-mesh/))

## ADOPT / wave-seed list

Ordered by payoff-to-cost. Each is additive to the existing OKLCh path — none discards the Ottosson/gamut machinery.

- **W-seed A — SDF-gradient fake normal + fresnel rim (HEADLINE, low cost).** Derive a normal from the SDF gradient (`dFdx(d)`,`dFdy(d)` — partly present at `metaball.frag.ts:149`) and a rim term `rim = pow(1 - saturate(-d/bodyR), k)`. Replaces the flat `edgeGlow` (`metaball.frag.ts:167-168`) with a true view-angle-style falloff. Gives the blob a gel/glass read. Foundation for B and C.

- **W-seed B — OKLCh-hue cosine-palette iridescence (HEADLINE).** Add `iqPalette(t)` driving **OKLCh hue** (keep L/C from base so it stays in the warm-cream family), with `t = rim` (from A) + the existing FBM color field + `uTime`. This is the "oil-slick sheen that shifts with the boundary." Default it *subtle* (small hue arc, e.g. ±20-30°, gated by a `iridescence: 0..1` config knob; preset can crank it). Replaces the near-dead `hueRange: 5` jitter with a real, boundary-coupled sweep. New uniforms: `uIridescence`, palette `a/b/c/d` vec3s (or a curated warm-cream-friendly default).

- **W-seed C — gradient-mapped body fill (medium).** Map a linear/radial axis through the body (e.g. the SDF-gradient direction or a fixed light vector) to an OKLCh L+C ramp — a directional sheen/volumetric read instead of uniform fill. Composes with B (B = hue along edge, C = lightness along body axis). This is the "gradient fill" axis of the ask.

- **W-seed D — specular glint (low cost, high polish).** One soft specular dot from a fixed virtual light against the fake normal (A): `spec = pow(saturate(dot(N, L)), s)`, added as OKLCh lightness near 1.0. Reads as a wet/glass highlight. Cheap; big "premium" delta.

- **W-seed E — pointer-trail liquid tail (interaction, medium).** Lift Codrops' 15-slot pointer-trail: shrinking `smin`-merged satellites tracking the cursor, so the blob *reaches toward* the pointer as liquid. Extends the existing pointer deform (`metaball.frag.ts:122-128`, currently just a single attraction warp) and the satellite array (`MAX_SATS 4` → trail). The "optionally dynamic/interactive" axis. ([Codrops](https://tympanus.net/codrops/2025/06/09/how-to-create-interactive-droplet-like-metaballs-with-three-js-and-glsl/))

- **W-seed F — backdrop refraction (high cost, premium ceiling).** Sample glass-ui's warm-cream backdrop through the blob (offset by the fake normal) for real liquid-glass refraction — the 2025 market's top tier. Highest effort (needs a backdrop texture/sample seam on `useWebGLCanvas`); flag as a stretch wave, not a default. ([Liquid Glass v1.6](https://liquid-glass-web.itch.io/liquid-glass-ui-kit-modern-tailwind-components-for-websites-apps))

- **W-seed G — convergence + perf hygiene (do alongside).** (1) The cosine-palette + fresnel helpers are shareable with aurora — fold into `procedural-color.glsl.ts` (the existing AV.W2 single-source chunk) so iridescence can't diverge, same as the OETF did. (2) Iridescence is motion: respect the substrate's live `prefers-reduced-motion` freeze (already owned by `useWebGLCanvas` per CLAUDE.md AV.W7) — the static frame should paint a *still* iridescent sheen, not a frozen mid-sweep artifact. No new perf path; all seeds are per-pixel ALU on an already-running fragment shader. Gate equivalence with the existing `blob-color-equivalence` pattern.

**Do NOT adopt:** physically-based multi-wavelength thin-film (finding 4 — too saturated/heavy for warm-cream glass, wrong aesthetic), and discrete N-color `smoothstep` banding (finding 3 — the cosine palette is smoother and cheaper).

**Anchor files for the implementing wave:** color assembly `src/components/custom/goo-blob/shaders/metaball.frag.ts:159-173`; shared chunk `src/composables/glass/webgl/shaders/procedural-color.glsl.ts`; gamut machinery `src/components/custom/goo-blob/shaders/oklch-perturb.glsl.ts`; config knobs `src/components/custom/goo-blob/types.ts:78-83,116-119`.

---

### Lane 8

I have a complete picture of both the SOTA techniques and the exact integration seams in the existing blob. Synthesizing the brief now.

---

# Lane "iridescent-thinfilm" — SOTA brief for GooBlob

Research for tranche-development. No implementation. The goal: give the GooBlob a mesmerizing, premium iridescent surface that reads as warm-cream glass, stays tasteful on a light background, and runs cheap in WebGL2.

## Where the blob is today

The blob is a **flat-shaded 2D SDF metaball** with a per-pixel OKLCh perturbation — but the color has **no view/curvature term**. It only swings hue/chroma by FBM noise, then lifts lightness near the edge:

- `src/components/custom/goo-blob/shaders/metaball.frag.ts:159-168` — `oklch.z += (colorNoise-0.5)*uHueRange` (noise-only hue swing), `edgeGlow` lifts `oklch.x` inward. No normal, no Fresnel, no thickness map.
- `src/components/custom/goo-blob/shaders/sdf-body.glsl.ts:10-12` — `sdCircle` returns scalar distance only; the gradient (the would-be pseudo-normal) is thrown away.
- `metaball.frag.ts:149-150` — `fwidth(d)` AA edge already computes the screen-space gradient magnitude; the **direction** `normalize(grad)` is one cheap step away.
- The OKLab/OKLCh + OETF machinery is already spliced in and gate-locked (`procedural-color.glsl.ts`, `proof:blob-color-equivalence`). Iridescence color must ride this same linear→OETF discipline or it ships ~2.2× too dark (the named A5/A2 trap).

The missing ingredient is **a view-dependent / curvature-dependent angle term to drive the rainbow** — which is exactly what thin-film interference needs, and the SDF gives it for free.

## SOTA techniques (ranked for this use case)

**1. The IQ cosine palette driven by a pseudo-Fresnel angle — the artist-friendly path (RECOMMEND as the headline).**
`color = a + b*cos(2π(c*t + d))` — one cosine, GPU-cheap, infinitely tunable, and the `a/b/c/d` vectors let you pick a *warm* spectrum that never goes garish. Drive `t` by the SDF-gradient·view angle (Fresnel-like rim term), not by raw noise. This is exactly the Varun Vachhar iridescent-SDF recipe: `spectrum(dot(normal, eyeDir) * k)` through a cosine palette.
Sources: [IQ — Procedural Color Palettes](https://iquilezles.org/articles/palettes/) (accessed 2026-06-06); [Varun Vachhar — Iridescent crystal with raymarching and SDFs](https://varun.ca/ray-march-sdf/) (accessed 2026-06-06).

**2. Zucconi `spectral_zucconi6` — physically-flavored spectrum without spectral integration.**
Six-parabola fit, `w∈[400,700]nm → RGB`. Pairs with the path-difference formula `u = n₂·2d·cos(θᵣ)` (thickness `d`, refraction angle from Snell). More "real rainbow" than the cosine palette, slightly more code. Good if the cosine palette reads too synthetic. The `spectral_zucconi6` coefficient vectors are in hand (c1/x1/y1, c2/x2/y2).
Sources: [Zucconi — Improving the Rainbow 2](https://www.alanzucconi.com/2017/07/15/improving-the-rainbow-2/) (accessed 2026-06-06); [Zucconi — Thin-Film Interference / Car Paint Shader](https://www.alanzucconi.com/2017/10/27/carpaint-shader-thin-film-interference/) (accessed 2026-06-06).

**3. Belcour–Barla pre-integrated Airy reflectance — the physically-accurate path (DEFER).**
The SIGGRAPH 2017 reference standard, used in Unity HDRP and Blender's Principled BSDF. Analytically pre-integrates the high-frequency spectral oscillation so RGB renderers don't alias. **Overkill for a 2D decorative blob** — it's a microfacet BRDF for lit 3D surfaces; the blob has no light rig. Cite as the ceiling; do not implement.
Sources: [Belcour — A Practical Extension to Microfacet Theory for Varying Iridescence](https://belcour.github.io/blog/research/publication/2017/05/01/brdf-thin-film.html) (accessed 2026-06-06); [Unity Blog](https://blog.unity.com/technology/a-practical-extension-to-microfacet-theory-for-the-modeling-of-varying-iridescence) (accessed 2026-06-06).

**4. The pseudo-normal from the SDF gradient — the enabler all of the above need.**
IQ's distance+gradient 2D SDFs: `sdgCircle(p,r) = vec3(length(p)-r, p/length(p))` — `.yz` is the unit gradient, reused from terms already computed. For a metaball, the merged-field gradient is the smin-blended gradient. This gives a fake "surface normal" so a Fresnel rim and thickness map have something to vary against — turning the flat blob into something that looks curved and lit.
Source: [IQ — Distance + Gradient 2D SDF](https://iquilezles.org/articles/distgradfunctions2d/) (accessed 2026-06-06).

**5. Animated thickness map (the soap-bubble shimmer).**
A physically-based soap bubble varies film thickness ~150–700nm with FBM noise + slow "micro-sloshing" advection — that's what makes the bands drift and shimmer rather than sit static. The blob already FBM-displaces its edge (`watercolor-edges.glsl`) and already has `uColorNoiseSpeed`/`uTime` plumbed; reuse that FBM as a **thickness field** feeding the palette `t`, so the iridescence flows over the body.
Source: [Shadertoy — Physically-Based Soap Bubble](https://www.shadertoy.com/view/XtKyRK) (accessed 2026-06-06).

## Design constraints (taste on warm-cream glass)

- **Restraint is the trend, not maximal rainbow.** Premium 2024–2026 iridescence is *subtle*, light-shifting, layered — "2026 is the year of human taste." The blob should shimmer, not scream. ([Graphic Design Junction — 2026 trends](https://graphicdesignjunction.com/2025/12/10-top-visual-trends-for-2026/), accessed 2026-06-06; [design.tutsplus holographic textures](https://design.tutsplus.com/articles/100-best-holographic-iridescent-textures-foil-backgrounds-and-effects--cms-40042), accessed 2026-06-06)
- **Keep it warm-tinted.** Don't sweep full-saturation cyan/magenta on a cream surface — bias the palette `d` phase + clamp chroma so the sheen stays in the warm-pearl band that matches glass-ui's `--shadow-color: var(--foreground)` warm identity. Do the mix in OKLCh and reuse `gamutClampOklch` (`metaball.frag.ts:170`) so it never goes out-of-gamut ugly.
- **Iridescence = a perturbation of the existing base color, not a replacement.** Mix the spectral term in by a small `uIridescence` amount over the resolved `uBaseColor`, concentrated at the rim via the Fresnel term, so the body stays cream and only the edge/curvature catches the rainbow. Matches the existing `edgeGlow` intent.

## Performance

All of the recommended paths are **per-pixel and cheap**: one `cos` palette eval + one `normalize(grad)` + reuse of the existing FBM. No extra passes, no extra textures, no spectral 81-sample loop. Stays within the existing `useWebGLCanvas` rAF/offscreen-pause/PRM-freeze envelope (`useMetaballRenderer.ts:139-142`, `proof:offscreen-pause`). Belcour is the only heavy option and is being deferred for exactly that reason.

## ADOPT / wave-seed list

- **W-seed A — SDF pseudo-normal.** Promote `sdCircle` → `sdgCircle`-style `vec3(dist, grad)` (`sdf-body.glsl.ts:10`); blend gradients through `smin` alongside distance so the merged metaball has a coherent pseudo-normal. Cheap; reuses `fwidth` terms already at `metaball.frag.ts:149`. This is the prerequisite for everything else.
- **W-seed B — Fresnel rim term.** `fresnel = pow(1.0 - clamp(dot(normal, viewDir), 0,1), p)`, viewDir as a fixed/screen-facing vector (no camera in 2D). Use as the iridescence mask so the sheen concentrates at the curved rim — replaces the noise-only swing as the *driver*.
- **W-seed C — IQ cosine palette, warm-biased.** Add `palette(t, a,b,c,d)` with a hand-tuned **warm-pearl** `a/b/c/d` (start from IQ palette #7 `(0.8,0.5,0.4)/(0.2,0.4,0.2)/(2,1,1)/(0,0.25,0.25)` and pull chroma down). Drive `t` by `fresnel + thicknessNoise + uTime*speed`. New uniforms: `uIridescence` (mix amount), `uIridHue` (palette phase), `uIridSpeed`.
- **W-seed D — animated thickness map.** Feed the existing edge FBM (`watercolor-edges.glsl`, already time-advected) into the palette `t` as a thickness field so bands drift/shimmer across the body — the soap-bubble look — using uniforms already plumbed (`uColorNoiseSpeed`, `uTime`).
- **W-seed E — OKLCh-correct compositing.** Convert the spectral term into OKLCh and `mix` it onto `oklch` BEFORE `gamutClampOklch` (`metaball.frag.ts:170`) so the rainbow inherits the perceptual-uniformity + hue-preserving clamp + mandatory OETF. Extend `proof:blob-color-equivalence` / `metaball-color.glsl-port.ts` with the new term. Hard gate, no exceptions.
- **W-seed F — mood/config plumbing.** Add `iridescence`, `iridHue`, `iridSpeed` to `BlobConfig` (`types.ts:58`, defaults `types.ts:100`) and to `MoodParams` so moods modulate sheen (excited = stronger/faster shimmer, sleepy = nearly flat) — wired exactly like the existing `hueRange`/`satShift` at `useMetaballRenderer.ts:277-281`. Keep default `iridescence` LOW (taste-first).
- **W-seed G (interactive, optional) — pointer-reactive sheen.** The pointer already deforms the body (`metaball.frag.ts:123-128`); let pointer proximity also locally boost `uIridescence` / shift `uIridHue`, so the blob "catches the light" where you touch it. Reuses `uPointer`/`uPointerActive`, zero new input plumbing.
- **W-seed H (stretch) — Zucconi `spectral_zucconi6` alt-path.** Ship as an opt-in palette mode if the cosine palette reads too synthetic in review; gives a truer thin-film rainbow at slightly higher cost. Coefficients in hand.
- **DEFER — Belcour–Barla Airy BRDF.** Documented as the physical ceiling; not warranted for a lit-less 2D decorative surface.

**Key file:line seams for implementation:** `metaball.frag.ts:149` (gradient already half-computed), `:159-170` (OKLCh block — insertion point), `:170` (gamut clamp — composite before this); `sdf-body.glsl.ts:10` (promote to gradient form); `types.ts:58/100` (config); `useMetaballRenderer.ts:277-281` (uniform upload pattern to copy).

---

### Lane 9

I have the complete picture. Synthesizing the brief now.

---

# SOTA Brief — GooBlob fake subsurface-scattering / translucency (lane: sss-translucency)

Research-only. No implementation. All file:line refs are to glass-ui HEAD.

## Where the blob is today

The blob is **flat-shaded**. The fragment shader (`src/components/custom/goo-blob/shaders/metaball.frag.ts:119-177`) computes an SDF body + smin satellites, an FBM watercolor edge, and a per-pixel OKLCh color perturbation — then paints a single base color with one weak lightness lift near the edge:

- The only "luminosity" today is `metaball.frag.ts:166-168` — `edgeGlow = smoothstep(0.0, -bodyR*0.6, d)` lifting OKLCh L by +0.06 *inward*. That's a flat radial fade, not translucency: no fake normal, no thickness, no rim, no specular, no light direction.
- The SDF body returns distance only (`sdCircle`, `sdf-body.glsl.ts:10-12`) — it throws away the gradient that a fake-normal needs.
- No light-direction or view uniforms exist (`metaball.frag.ts:52-89`) — there is nothing for an SSS back-light term to read.

So the gap is exactly the lane: the blob reads as a *sticker*, not a *gel*. Everything below is about giving it inner volume cheaply, in 2D, on the existing SDF.

## The core bridge (why 3D SSS techniques port to our 2D blob)

Every cited SSS/translucency model wants two 3D quantities we don't have: a surface **normal** and a **thickness**. For an SDF blob both fall out of the field we already compute, for free:

1. **Fake normal from the SDF gradient.** A circle's analytic distance+gradient is `vec3 sdgCircle(p,r){ float d=length(p); return vec3(d-r, p/d); }` — the `.yz` is a unit vector pointing outward, i.e. the 2D surface normal, reusing the `length(p)` we already pay for ([Inigo Quilez, "Distance + Gradient functions 2D"](https://iquilezles.org/articles/distgradfunctions2d/), n.d.). For the smin-merged multi-source field, the same normal comes from screen-space derivatives: `normalize(vec2(dFdx(d), dFdy(d)))` ([enkisoftware / Khronos forum, dFdx/dFdy normals](https://www.enkisoftware.com/devlogpost-20150131-1-Normal-generation-in-the-pixel-shader), 2015). We then lift it to a pseudo-3D normal `vec3 N = normalize(vec3(grad.xy * bend, 1.0))` so a fixed light can rake across it.

2. **Thickness from the SDF value.** Inside the blob `d < 0`; `-d` *is* the depth from the nearest edge — a free thickness proxy. SSS models that elsewhere need a baked thickness map ("thinner areas show more SSS", [Alisavakis](https://halisavakis.com/my-take-on-shaders-simple-subsurface-scattering/), n.d.) read `thickness = -d` directly. This is the cheap version of the raymarch-thickness approach ([kosmonaut, "SDF Rendering Journey Pt.2"](https://kosmonautblog.wordpress.com/2017/05/09/signed-distance-field-rendering-journey-pt-2/), 2017).

These two are the foundation; the techniques below layer onto them.

## SOTA techniques (the menu)

**A. Translucent back-light (the SSS headline).** The canonical fast/fake SSS term, identical across the three primary sources:
`I_back = pow(saturate(dot(V, -normalize(L + N*distortion))), power) * scale` ([Alan Zucconi, "Fast Subsurface Scattering in Unity Pt.1"](https://www.alanzucconi.com/2017/08/30/fast-subsurface-scattering-1/), 2017; [Alisavakis](https://halisavakis.com/my-take-on-shaders-simple-subsurface-scattering/), n.d.). `distortion` bends the back-light toward the normal; `power`/`scale` shape the diffusion curve. In 2D with a fixed light + fixed view (z-out), this collapses to a cheap term modulated by `(1.0 - thickness)` so thin edges glow and the thick core stays dense — exactly the jelly/wax look the same sources call out. This is the single highest-value adopt.

**B. Inner luminosity gradient (depth ramp).** Instead of the current edge-only lift, drive an *interior* glow off thickness: a core that's brighter/warmer and an edge that's translucent, via `smoothstep` over `-d` or a 1D gradient ramp. SDF inner-glow uses the reciprocal `glow = clamp(k/abs(d), 0, 1)` for an edge bloom ([inspirnathan, "Glow Shader in Shadertoy"](https://inspirnathan.com/posts/65-glow-shader-in-shadertoy/), n.d.); inverting it (lift L toward the *center*, fade toward edge) gives the lit-from-within gel core. This *replaces* the weak `edgeGlow` at `metaball.frag.ts:166-168`.

**C. Fresnel / rim translucency.** The light-leak silhouette. `fresnel = pow(1.0 - saturate(dot(N, V)), p)` using the fake normal from the gradient — brightens grazing edges, which on a translucent body reads as light passing through the rim ([Ronja, "Fresnel"](https://www.ronja-tutorials.com/post/012-fresnel/), n.d.; [Frontend Masters, "Rim Lighting"](https://frontendmasters.com/courses/webgl-shaders/rim-lighting/), n.d.). Liquid-glass UIs build their whole material from "spec / fresnel / rim" highlights ([Lucky Graphics, "Liquid Glass… High-Performance Refractive UI in 2026"](https://lucky.graphics/learn/liquid-glass-css-glassmorphism-tutorial/), 2026).

**D. Specular hot-spot.** A single small Blinn-style highlight off the fake normal + fixed light — the wet/gel cue. The same SSS sources note fake-SSS "resembles wax and jade in particular *if combined with specular highlights*" ([GLSL Programming/Translucent Bodies, Wikibooks](https://en.wikibooks.org/wiki/GLSL_Programming/Unity/Translucent_Bodies), n.d.). Cheap, one `pow(dot(N,H), shininess)`, OKLCh-lift not RGB-add so it stays in gamut.

**E. Internal bubbles / inhomogeneity (optional, premium).** Slime/gel references author "internal bubbles" and inhomogeneity in the emissive layer for the high-end look ([ArtStation "Slime Shader / Fake Translucency" by Daniil Spivak](https://www.artstation.com/artwork/P6Wkk4), n.d. — found via search, page itself 403s to fetch). We already have an FBM field (`watercolor-edges.glsl.ts`) — modulating interior L with a second low-freq FBM gives floating density variation for near-zero cost.

## Integration notes (glass-ui fit)

- **Stay in OKLCh.** Every lift above must go through L/C/h, not RGB-add, to respect the warm-cream identity and the mandatory OETF (`metaball.frag.ts:157-173`, `proof:blob-space-gamma`). SSS back-light and rim lift `oklch.x` (and slightly warm `oklch.z`); specular lifts L toward white. Adding in linear-RGB before the OETF would re-open the A5/A2 dark-ship trap the shader header warns about (`metaball.frag.ts:14-18`).
- **Reuse the shared chunk.** Light dir + the new SSS math are pure functions — they belong in a spliced partial alongside `sdf-body.glsl.ts` / `oklch-perturb.glsl.ts`, keeping the character-equivalent splice discipline (`metaball.frag.ts:40-43`).
- **`sdCircle` must return the gradient.** Promote `sdCircle` → `sdgCircle` (`vec3`) per the IQ analytic form so the fake-normal is free for the body; satellites/smin use the `dFdx/dFdy` fallback normal once, post-merge.
- **Performance.** All of A-E are a handful of `dot`/`pow`/`smoothstep` per fragment on the *already-shaded* pixel (post the `alpha < 0.001` early-out at `metaball.frag.ts:152-155`). No extra passes, no texture reads, no raymarch — fits the `useWebGLCanvas` single-frame-under-PRM budget. The raymarched/multipass thickness variants ([Philipp-Seifried MultipassTranslucency](https://github.com/Philipp-Seifried/MultipassTranslucency), n.d.; [GPU Gems Ch.16](https://developer.nvidia.com/gpugems/gpugems/part-iii-materials/chapter-16-real-time-approximations-subsurface-scattering), n.d.) are explicitly **rejected** — overkill for a 2D blob when `-d` gives thickness for free.
- **Light direction as a soft interaction hook.** A `uLightDir` uniform makes the whole effect respond to pointer/time — the back-light, rim, and specular all sweep as the light moves. This is the optional "dynamic" axis, and it composes with the existing `uPointer` deformation (`metaball.frag.ts:122-128`) for a blob that both deforms toward and catches light from the cursor.

## ADOPT / wave-seed list

Ordered by value-to-cost. Each is a self-contained wave seed.

1. **`SSS-W1` — SDF gradient → fake normal.** Promote `sdCircle`→`sdgCircle` (analytic gradient for the body); add a `dFdx/dFdy` post-merge normal for the satellite field. Pure substrate; unlocks 2-4. *Foundation — do first.*
2. **`SSS-W2` — Thickness-driven inner luminosity.** Replace the flat `edgeGlow` (`metaball.frag.ts:166-168`) with a thickness ramp off `-d`: bright translucent core fading to a light-leaking edge, in OKLCh. The single biggest read-as-gel win.
3. **`SSS-W3` — Translucent back-light (fast-SSS term).** Add `uLightDir`; implement `pow(saturate(dot(V,-(L+N*distortion))),power)*scale*(1-thickness)`, lifting OKLCh L + warming hue. The headline SSS effect.
4. **`SSS-W4` — Fresnel rim + specular hot-spot.** Grazing-edge fresnel (light through the rim) + one Blinn specular off N — the wet/jade cue. Both OKLCh-lifted, gamut-clamped via the existing `gamutClampOklch`.
5. **`SSS-W5` (optional) — Internal density FBM.** Second low-freq FBM modulating interior L for floating-bubble inhomogeneity, reusing the existing noise field. Premium polish only.
6. **`SSS-W6` (optional) — Dynamic light hook.** Drive `uLightDir` from pointer/time so back-light/rim/specular sweep with interaction, composing with the existing `uPointer` deformation. The "interactive" axis.

New config surface (extends `BlobConfig`, `types.ts:58-98`): `lightDir`, `sssDistortion`, `sssPower`, `sssScale`, `sssColor`(hue/warmth), `rimPower`, `rimStrength`, `specStrength`, `specShininess`, `coreGlow`, `innerDensityAmp`. All default to current-look-preserving values (0 / no-op) so the change is additive, per the no-backwards-compat-but-additive house pattern.

## Sources

- [Inigo Quilez — Distance + Gradient functions 2D](https://iquilezles.org/articles/distgradfunctions2d/) (n.d.) — analytic SDF gradient = fake 2D normal
- [Inigo Quilez — Distance functions](https://iquilezles.org/articles/distfunctions/) (n.d.) — SDF primitives / interior distance
- [Alan Zucconi — Fast Subsurface Scattering in Unity, Pt.1](https://www.alanzucconi.com/2017/08/30/fast-subsurface-scattering-1/) (2017) — the `pow(dot(V,-(L+Nδ)),p)*s` back-light model
- [Harry Alisavakis — Simple Subsurface Scattering](https://halisavakis.com/my-take-on-shaders-simple-subsurface-scattering/) (n.d.) — same model + `(1-thickness)` modulation + thickness-map role
- [inspirnathan — Glow Shader in Shadertoy](https://inspirnathan.com/posts/65-glow-shader-in-shadertoy/) (n.d.) — `glow = k/abs(d)` SDF inner/edge glow
- [enkisoftware — Normal generation in the pixel shader](https://www.enkisoftware.com/devlogpost-20150131-1-Normal-generation-in-the-pixel-shader) (2015) + [Khronos forum dFdx/dFdy normals](https://community.khronos.org/t/getting-the-normal-with-dfdx-and-dfdy/70177) (n.d.) — derivative-based fake normal for the merged field
- [Ronja — Fresnel](https://www.ronja-tutorials.com/post/012-fresnel/) (n.d.) + [Frontend Masters — Rim Lighting](https://frontendmasters.com/courses/webgl-shaders/rim-lighting/) (n.d.) — fresnel/rim from normal·view
- [GLSL Programming / Translucent Bodies (Wikibooks)](https://en.wikibooks.org/wiki/GLSL_Programming/Unity/Translucent_Bodies) (n.d.) — wax/jade = fake-SSS + specular
- [kosmonaut — SDF Rendering Journey Pt.2](https://kosmonautblog.wordpress.com/2017/05/09/signed-distance-field-rendering-journey-pt-2/) (2017) — SDF-thickness for translucency
- [ArtStation — Slime Shader / Fake Translucency, Daniil Spivak](https://www.artstation.com/artwork/P6Wkk4) (n.d.; via search, page 403s) — emissive bubbles/inhomogeneity layering for gel
- [Lucky Graphics — Liquid Glass: High-Performance Refractive UI in 2026](https://lucky.graphics/learn/liquid-glass-css-glassmorphism-tutorial/) (2026) — premium-UI spec/fresnel/rim material vocabulary
- [GPU Gems Ch.16 — Real-Time Approximations to Subsurface Scattering](https://developer.nvidia.com/gpugems/gpugems/part-iii-materials/chapter-16-real-time-approximations-subsurface-scattering) (n.d.) + [Philipp-Seifried — MultipassTranslucency](https://github.com/Philipp-Seifried/MultipassTranslucency) (n.d.) — multipass/depth thickness (cited as the **rejected** heavyweight alternative)

Relevant glass-ui files: `/Users/mkbabb/Programming/glass-ui/src/components/custom/goo-blob/shaders/metaball.frag.ts`, `/Users/mkbabb/Programming/glass-ui/src/components/custom/goo-blob/shaders/sdf-body.glsl.ts`, `/Users/mkbabb/Programming/glass-ui/src/components/custom/goo-blob/shaders/oklch-perturb.glsl.ts`, `/Users/mkbabb/Programming/glass-ui/src/components/custom/goo-blob/shaders/watercolor-edges.glsl.ts`, `/Users/mkbabb/Programming/glass-ui/src/components/custom/goo-blob/types.ts`.

---

### Lane 10

I have everything needed. Here is the research brief.

---

# SOTA brief — specular/rim/curvature shading on 2D SDF blobs (Lane "specular-blob-light")

GooBlob today renders a flat-shaded SDF: `fwidth` AA edge, OKLCh per-pixel color perturbation, FBM watercolor edge, and a faint inner edge-glow (`metaball.frag.ts:166-168`). There is **no normal, no specular catch-light, no rim, no curvature shading** — it reads as a soft 2D sticker, not a glossy 3D object. The entire lane is greenfield. The good news: everything needed is already in `main()` — the merged SDF distance `d`, the screen-space gradient via `fwidth`, premultiplied-alpha output, and a linear-light pipeline that's the correct place to add light before the OETF.

## The two ways to get a normal (pick per surface)

**A. Lift the 2D SDF gradient + synthesize Z — the right fit for a gooey merged blob.** The gradient of an SDF is the outward surface normal direction; it's unit-length by construction ([shaderfun, 2018-07-23](https://shaderfun.com/2018/07/23/signed-distance-fields-part-8-gradients-bevels-and-noise/); [Ronja, 034-2d-sdf-basics](https://www.ronja-tutorials.com/post/034-2d-sdf-basics/)). Get it cheaply from the distance field you already compute. Two routes:
- **Analytic-ish via `dFdx/dFdy`**: `vec2 g = normalize(vec2(dFdx(d), dFdy(d)))`. Near-free (you already call `fwidth(d)` at `metaball.frag.ts:149`, which is `abs(dFdx)+abs(dFdy)` — same derivatives). It tracks the *real* merged isosurface including satellites + FBM wobble, so the catch-light bends correctly across a smin seam.
- **Central difference** if you want it smoother than raw derivatives: 4 extra `sdField()` taps. IQ's tetrahedron trick is the 3D-raymarch sweet spot at 4 taps ([IQ, normalsSDF](https://iquilezles.org/articles/normalsSDF/)), but for a 2D field the central-difference 2-axis form is enough.

Then lift to 3D. The grammar everyone uses: treat the SDF interior as a rounded dome, so the height (and thus normal Z) rises toward the center. `float h = sqrt(max(0.0, -d / bodyR)); vec3 N = normalize(vec3(g * (1.0 - h), h + bevel));` — or simply blend a fixed up-vector by edge-proximity so the rim tilts outward and the center faces the viewer. The `-d/bodyR` term is the bevel falloff (sharp rim, flat top — Ronja's bevel; shaderfun part 8).

**B. Pretend the blob is a sphere — the cheapest, most "premium-glossy" for the round body.** Skip the gradient entirely on the body interior: `vec3 N = vec3(uv/bodyR, sqrt(1.0 - dot(uv/bodyR, uv/bodyR)))` ([Clockwork Chilli, "3D Shaders In A 2D World"](https://clockworkchilli.com/blog/2_3d_shaders_in_a_2d_world)). This gives a perfect sphere normal — the top reads dead-on to the viewer, the limb falls off — and produces a textbook glossy catch-light with zero extra taps. **Recommended hybrid**: use the sphere normal (B) for the body's interior glossy shading and the SDF-gradient normal (A) only at the rim/seam region so satellites and the gooey merge still get a curved edge. The mix factor is `h` (sphere weight near center → gradient weight near edge).

## The lighting (add in linear space, before the OETF)

GooBlob already converts base color to linear sRGB and only applies `linearToSrgb()` at the very end (`metaball.frag.ts:172-173`). That is exactly where light belongs — add diffuse/spec/rim to the linear `lin` value, then OETF. Components:

- **Diffuse (NdotL)**, optional and subtle: `float diff = max(dot(N, L), 0.0)` ([Clockwork Chilli]; [opengl-tutorial t8](http://www.opengl-tutorial.org/beginners-tutorials/tutorial-8-basic-shading/)). Keep it small — the blob's identity is its flat color; a full Lambert term flattens the warm-cream palette. A 5-15% wrap-lit lift reads as form without darkening half the blob.

- **Specular catch-light = Blinn-Phong**, the single most important term for "glossy 3D object". Halfway vector `H = normalize(L + V)`, with `V = vec3(0,0,1)` for a flat-facing 2D canvas. `float spec = pow(max(dot(N, H), 0.0), shininess)`; shininess 16-64 for a tight glossy dot, 4-8 for a broad sheen ([MiniMax-AI lighting-model](https://github.com/MiniMax-AI/skills/blob/main/skills/shader-dev/techniques/lighting-model.md); [Interplay of Light, 2013](https://interplayoflight.wordpress.com/2013/12/23/an-educational-normalised-blinn-phong-shader/)). Two highlights (one tight white spec + one broad soft sheen) is the classic gel/glossy-button look. The energy-normalized form `(shininess+8)/(8π)·pow(NdotH,shininess)` keeps it physically sane but for a stylized UI blob a hand-tuned scalar is fine.

- **Fresnel rim = Schlick**: `float rim = pow(1.0 - max(dot(N, V), 0.0), 5.0)` — bright where the normal turns perpendicular to the eye, i.e. the blob's silhouette ([3d-game-shaders-for-beginners, fresnel-factor](https://lettier.github.io/3d-game-shaders-for-beginners/fresnel-factor.html); [danielilett, 2019-06-12](https://danielilett.com/2019-06-12-tut2-3-fresnel/); [Shadertoy sdjGR3](https://www.shadertoy.com/view/sdjGR3)). The power-5 is Schlick's default; lower it (2-3) for a wider, softer rim that suits a watercolor blob. This is what makes a translucent blob read as a *volume* rather than a disc, and it pairs naturally with glass-ui's warm-cream glass aesthetic — a faint warm rim where the blob meets the page.

## Premium / cheap-but-rich option: matcap

If you want full environment-style shading (reflections + soft studio light baked in) for near-zero ALU, a **matcap** samples a pre-lit sphere texture by the view-space normal: `vec2 muv = N.xy * 0.5 + 0.5; vec3 mat = texture(uMatcap, muv).rgb` ([Godot Shaders matcap](https://godotshaders.com/shader/view-matcap-based-fake-vertex-lighting/); [nidorx/matcaps lib](https://github.com/nidorx/matcaps)). It's the cheapest path to a "polished crystal" surface and tints trivially. Tradeoff: it bakes the light direction, so it doesn't animate a moving catch-light, and it adds a texture upload + sampler — heavier than the analytic Blinn-Phong which needs zero assets. **Recommend analytic Blinn-Phong+Fresnel as the default** (no asset, animatable, OKLCh-friendly) and matcap as an optional `lightingStyle` preset for a richer "studio" look.

## Critical compositing caveat (premultiplied alpha)

GooBlob outputs premultiplied (`fragColor = vec4(rgb * alpha, alpha)` at `metaball.frag.ts:176`, blend `ONE, ONE_MINUS_SRC_ALPHA` at `useMetaballRenderer.ts:202`). A bright specular highlight on a semi-transparent surface renders **wrong** unless you add the spec into the color *before* the premultiply, OR add it as energy without raising alpha. A glossy white catch-light that should "bloom over" the edge needs the additive term folded into `rgb` then `*alpha` — adding it after premultiply double-darkens it ([three.js #5810](https://github.com/mrdoob/three.js/issues/5810); [webglfundamentals webgl-and-alpha](https://webglfundamentals.org/webgl/lessons/webgl-and-alpha.html)). The fix is trivial here because the OETF + premultiply are the last two lines — just inject light into `lin`/`rgb` upstream of line 173-176. A spec that should glow *past* the silhouette (bloom) would need `rgb` to exceed `alpha`; that's the one place to be deliberate.

## Animation / interaction seams (the lane's "dynamic" ask)

The renderer already feeds `uTime`, `uPointer`, mood params, and per-frame uniforms — the catch-light can be made alive at no structural cost:
- **Moving light**: drive `L` from a slow `uTime` orbit, or — premium touch — bind `L` to `uPointer` so the catch-light *tracks the cursor* (the blob "looks wet" and responds). The pointer uniform is already live (`useMetaballRenderer.ts:242`).
- **Mood-reactive gloss**: route a `shininess`/spec-intensity through `MoodParams` (`types.ts:5-17`) — "excited" = tight bright spec, "sleepy" = broad dull sheen. Mood already modulates ~10 axes; gloss is a natural addition.
- **Reduced-motion**: the substrate freezes one static frame under PRM (`useMetaballRenderer.ts:100-106`); a static catch-light still reads as 3D, so the feature degrades gracefully with no extra work.

## ADOPT / wave-seed list

1. **W-α — SDF gradient normal + sphere-normal hybrid.** Add `vec3 surfaceNormal(vec2 uv, float d, float bodyR)`: sphere normal (`sqrt(1-r²)`) weighted toward center, SDF-gradient normal (`normalize(vec2(dFdx(d),dFdy(d)))`) weighted toward rim, blended by interior depth `h`. Reuse the derivatives already computed for `fwidth(d)`. Source: Clockwork Chilli (sphere) + shaderfun pt8 / Ronja (SDF gradient) + IQ normalsSDF (tap discipline).
2. **W-β — Blinn-Phong specular catch-light.** `H = normalize(L + vec3(0,0,1))`, `pow(NdotH, shininess)`, added to linear `lin` *before* `linearToSrgb()` + premultiply. Two-lobe (tight spec + broad sheen) for the gel look. New uniforms: `uLightDir`, `uSpecShininess`, `uSpecIntensity`. Source: MiniMax lighting-model, Interplay of Light.
3. **W-γ — Fresnel/Schlick rim light.** `pow(1 - NdotV, p)`, warm-tinted to sit in glass-ui's cream palette, added to `lin`. Power ~2-3 for a soft watercolor rim. New uniforms: `uRimColor`, `uRimPower`, `uRimIntensity`. Source: 3d-game-shaders-for-beginners, danielilett, Shadertoy sdjGR3.
4. **W-δ — premultiplied-alpha-correct light injection.** Light terms fold into `rgb` upstream of line 173-176; guard the bloom case. A gate/test in the spirit of the existing `proof:blob-space-gamma` (e.g. `proof:blob-spec-premult`) asserting spec enters before the OETF + premultiply. Source: three.js #5810, webglfundamentals.
5. **W-ε (optional) — interactive catch-light + mood gloss.** Bind `uLightDir` to `uPointer` (cursor-tracking highlight) and route `shininess`/`uSpecIntensity` through `MoodParams`. Pure uniform wiring, no new shader structure. Source: existing renderer seams.
6. **W-ζ (optional, deferred) — matcap "studio" preset.** A `lightingStyle: "analytic" | "matcap"` config axis; matcap samples a pre-lit sphere by `N.xy`. Heavier (texture asset + sampler), so gate behind explicit opt-in; only ship if a 2nd consumer wants the baked-reflection look (visual-load-bearing invariant). Source: Godot matcap shader, nidorx/matcaps.

**Sequencing note for the tranche author:** W-α is the prerequisite (no light without a normal); W-β + W-γ are the visible payload and can land together; W-δ is the correctness gate that must accompany them; W-ε/W-ζ are polish that should only ship with a real consumer.

**Sources**
- https://clockworkchilli.com/blog/2_3d_shaders_in_a_2d_world (sphere normal from circle)
- https://shaderfun.com/2018/07/23/signed-distance-fields-part-8-gradients-bevels-and-noise/ (SDF gradient → bevel normal)
- https://www.ronja-tutorials.com/post/034-2d-sdf-basics/ (gradient = normal, unit length)
- https://iquilezles.org/articles/normalsSDF/ (normal tap methods, h-scaling)
- https://github.com/MiniMax-AI/skills/blob/main/skills/shader-dev/techniques/lighting-model.md (Blinn-Phong + Fresnel-Schlick GLSL)
- https://github.com/MiniMax-AI/skills/blob/main/skills/shader-dev/techniques/normal-estimation.md (central-difference/tetrahedron normals)
- https://interplayoflight.wordpress.com/2013/12/23/an-educational-normalised-blinn-phong-shader/ (normalized Blinn-Phong)
- https://lettier.github.io/3d-game-shaders-for-beginners/fresnel-factor.html (Schlick rim)
- https://danielilett.com/2019-06-12-tut2-3-fresnel/ (Fresnel rim tutorial)
- https://www.shadertoy.com/view/sdjGR3 (sphere rim lighting w/ Fresnel)
- https://godotshaders.com/shader/view-matcap-based-fake-vertex-lighting/ + https://github.com/nidorx/matcaps (matcap)
- https://github.com/mrdoob/three.js/issues/5810 + https://webglfundamentals.org/webgl/lessons/webgl-and-alpha.html (premultiplied-alpha specular caveat)
- https://github.com/naughtyduk/liquidGL (2025-26 "Liquid Glass" idiom context)

All dates accessed 2026-06-06. Baseline files: `src/components/custom/goo-blob/shaders/metaball.frag.ts:119-177` (main, the integration point), `:166-168` (existing edge-glow to subsume), `src/components/custom/goo-blob/shaders/sdf-body.glsl.ts` (the `d`/`smin` field to derive normals from), `src/components/custom/goo-blob/composables/useMetaballRenderer.ts:30-51` + `:236-303` (uniform list to extend), `src/components/custom/goo-blob/types.ts:5-17` (MoodParams for gloss routing), `:58-133` (BlobConfig for new lighting axes).

---

### Lane 11

I have everything needed. Here is the brief.

---

# SOTA brief — goo-blob satellite/orbital system (lane: satellite-orbit)

Research only. Findings + citations, then an ADOPT / wave-seed list. No implementation.

## Baseline (what goo-blob does today)

- **Field math**: 2D SDF, body `sdCircle` + up to 4 satellite circles, merged with IQ quadratic `smin` (`h*h*k*0.25`). `src/.../shaders/sdf-body.glsl.ts:16-19`. The smin **returns distance only** — the per-source blend weight is discarded, so the neck/seam paints one flat base color (`metaball.frag.ts:140-145` then a single OKLCh perturb of `uBaseColor`).
- **Motion**: CPU phase machine — `orbiting → merging → absorbed → emerging` (`useBlobSatellites.ts:192-258`). Orbits are pseudo-elliptical (`baseRadiusX/Y`) with two layered sine wobbles + two sine perturbations (`orbitPos`, lines 77-91). No real forces, no neighbor awareness, no curl field.
- **Placement**: initial angles are `(index/4)*2π` plus a large random jitter (line 31); re-emergence picks a fresh random orbit (`randomizeOrbit`, 93-117). No relaxation — satellites can clump or stack angularly.
- **Merge geometry**: a satellite merges by lerping toward a point `0.08` from center (lines 200-206), scaling 1→0.65, fading at t>0.85. It's a translate-and-shrink, not a surface-tension neck.
- **Interaction**: pointer only deforms the body UV (`metaball.frag.ts:123-128`); satellites ignore the pointer entirely. `pointerAttraction` default is `0` (`types.ts:122`).

So the gaps vs SOTA: (1) flat color across merged regions, (2) sinusoidal not physical motion, (3) random not relaxed placement, (4) merge is a shrink not a tension neck, (5) satellites inert to pointer, (6) no specular/rim premium pass.

## Findings (cited)

**1. Material-blending smin — the single biggest visual win.** IQ documents a smin variant that returns `vec2(distance, blendWeight)`; the `.y` blends per-source color via `mix(colorA, colorB, w)`. This is what makes merged blobs read as *liquid mixing* rather than one flat mass — the neck takes on a gradient between the two source colors. goo-blob already uses the scalar quadratic form; lifting to the `vec2` form is a drop-in. [iquilezles.org/articles/smin, fetched 2026-06-06]

**2. Smooth-minimum k and variant character.** Quadratic is the recommended default (fast, clean C1 seam, shape-preserving outside the blend band). Exponential `smin` is associative (merge order independent) and silkier but distorts shapes everywhere and costs a log — overkill here. `k` ∝ neck thickness in distance units. Current `uSmoothK=0.22` is reasonable; the exp variant is the move only if asymmetric merge order ever shows. [iquilezles.org/articles/smin, 2026-06-06]

**3. Codrops 2025 droplet metaballs — the reference premium implementation.** Uses exponential smin (`k=7.0`), a **trail array** of 15 diminishing-radius spheres echoing a target with time delay (elastic stretch, no n-body), and a glass finish via `pow(color, vec3(7.0))` to crush darks and pop highlights + dual time-offset 3D noise on the reflection vector for surface life. The takeaway for us: *kinematic following with inertia* reads as organic without a physics solver, and a cheap `pow()` tonemap sells "liquid glass." [tympanus.net/codrops/2025/06/09/how-to-create-interactive-droplet-like-metaballs-with-three-js-and-glsl, 2025-06-09]

**4. Curl noise for organic drift.** Curl of a noise potential is divergence-free → particles never clump or scatter, they flow in continuous swirling loops; the field is `noise(x, y, time)` so it morphs smoothly and loops seamlessly. This is the principled replacement for goo-blob's two hand-tuned sine perturbations (`pertX/Y`): one curl-noise sample gives correlated, non-repeating, self-avoiding orbital drift for free. Params: frequency (swirl tightness), octaves (detail), time-scale (morph speed). [Bridson, "Curl-Noise for Procedural Fluid Flow," SIGGRAPH 2007, cs.ubc.ca/~rbridson/docs/bridson-siggraph2007-curlnoise.pdf; al-ro.github.io/projects/particles, both via search 2026-06-06]

**5. Lloyd relaxation / blue-noise placement.** Lloyd's algorithm (Voronoi iteration) converges any point set to a centroidal Voronoi diagram with blue-noise spectrum — uniform spacing, no preferred direction or distance, no clumps. A handful of iterations is enough; it's cheap for n≤8 points. Use it to seed initial satellite angles/radii and to pick re-emergence slots so satellites stay visually well-distributed around the body instead of stacking. For an orbital ring the 1D analog is "relax the angular gaps toward equal spacing with jitter." [Lloyd's algorithm, en.wikipedia.org/wiki/Lloyd's_algorithm; Deussen 2009 "Aesthetic Placement of Points," graphics.uni-konstanz.de, both via search 2026-06-06]

**6. n-body-lite via boids cohesion/separation.** Reynolds boids = separation + alignment + cohesion over neighbors. For goo-blob the relevant pair is **separation** (satellites push off each other so they never overlap awkwardly) + a soft **cohesion/tether** toward the orbit ring. That's "n-body-lite" without gravity: a couple of inverse-distance force terms integrated per frame. Surface-tension/cohesion is also exactly how SPH liquids get their look (Müller 2003: cohesion forces between same-phase particles). [Boids/particle-system + SPH surface tension, via search 2026-06-06: en.wikipedia.org/wiki/Particle_system, developer.nvidia.com GPU Gems 3 ch.7]

**7. Surface tension is the *premium* signal (Apple Liquid Glass, WWDC 2025).** Apple's Liquid Glass is explicitly "surface tension and elasticity" — glass pulls toward the cursor, springs back with scaleX/scaleY alternation; third-party fluid layers add "cohesion and mass" for the natural premium feel. This validates two directions for goo-blob: (a) **pointer-reactive satellites** — nearby satellites get tugged toward the cursor and snap back on a spring; (b) **the merge should read as a tension neck** (stretch-then-pinch), not a shrink. [apple.com/newsroom/2025/06/apple-introduces-..., 2025-06; medium liquid-glass droplet→toolbar, via search 2026-06-06]

**8. Premium 2D shading: SDF-gradient fake normal + rim/specular.** The SDF gradient (`fwidth` is already computed for AA at `metaball.frag.ts:149`) doubles as a cheap surface normal; a Fresnel/rim term + one specular highlight off a fixed light sells volume on a flat 2D blob. Godot's community metaball + 2D-PBR shaders do exactly this (fresnel rim + SDF-scaled highlights). goo-blob currently has only an inner-edge lightness lift (`edgeGlow`, frag.ts:167) — no specular, no rim. [godotshaders.com/shader/metaballs, godotshaders.com drop-in-PBR-2D, via search 2026-06-06]

## ADOPT / wave-seed list

Ordered by visual-impact / effort. Each is a candidate wave, not a commitment.

- **W-α — material-blending smin (color at the neck).** Swap the scalar quadratic `smin` in `sdf-body.glsl.ts` for the IQ `vec2(d, w)` form; carry a per-source tint (body color vs a satellite tint derived from the OKLCh hue swing) and `mix()` by `w`. *Highest ratio.* Pure shader, no CPU change. Pairs with the existing OKLCh pipeline. [Finding 1,2]

- **W-β — curl-noise orbital drift.** Replace `pertX/pertY` four-sine perturbation in `orbitPos` (`useBlobSatellites.ts:84-90`) with one 2D curl-noise sample over `(angle, time)`. Self-avoiding, seamless-looping, fewer magic constants. Keep the deterministic seed (curl is seedable). [Finding 4]

- **W-γ — Lloyd/blue-noise placement.** Seed initial satellite angles + radii and re-emergence slots via a few Lloyd relaxation passes (or the 1D equal-gap-with-jitter analog) instead of `(index/4)*2π + random` and `randomizeOrbit`'s pure random. Removes clumping. Cheap, deterministic. [Finding 5]

- **W-δ — surface-tension merge (neck, not shrink).** Rework the `merging` phase (`useBlobSatellites.ts:200-289`): instead of lerp-to-0.08 + scale-to-0.65, hold radius and let a rising `uSmoothK` (per-satellite, ramped over the merge) form a stretching neck that pinches off. The blob already exposes `smoothK` — make it per-source so one satellite can be mid-merge while others stay crisp. Needs a `uSatSmoothK[]` uniform. [Finding 3,7]

- **W-ε — n-body-lite separation + pointer tension (interactive axis).** Add per-frame separation force between satellites (inverse-distance push) + a soft tether to the orbit ring; when pointer is active and `pointerAttraction>0`, add a spring pull of nearby satellites toward the cursor with spring-back. Turns the inert satellites into the Liquid-Glass "pulls toward cursor" gesture. Opt-in via existing `pointerAttraction` (currently default 0). [Finding 6,7]

- **W-ζ — premium 2D shading pass.** From the SDF gradient (reuse the `fwidth(d)` site) derive a fake normal; add one Fresnel rim term + a single fixed-light specular highlight + a gentle `pow()`/tonemap to crush darks. Sells volume and "wet glass" without leaving 2D. Layers on after the OKLCh resolve, before premultiply. [Finding 3,8]

- **W-η (stretch) — exponential associative smin.** Only if W-δ's per-source merge ordering shows asymmetry artifacts. Order-independent but distorts globally + costs a log; measure first. [Finding 2]

Integration notes for whoever plans these: all of α/δ/ζ/η are shader-side and ride the existing `metaball.frag.ts` assembler + AV.W2 shared OKLCh chunk; β/γ/ε are CPU-side in `useBlobSatellites.ts` and must keep the `mulberry32(hashString(color+"goo"))` determinism contract (`useBlobSatellites.ts:129`) and the `proof:blob-color-equivalence` / `proof:blob-space-gamma` gates green. New uniforms (`uSatTint[]`, `uSatSmoothK[]`, light dir) extend `UNIFORM_NAMES` in `useMetaballRenderer.ts:30-51` and the `MAX_SATS=4` arrays. Warm-cream fit: drive satellite tints from the OKLCh hue range already in config (`hueRange`, `types.ts:116`) so merges stay inside the glass palette, not rainbow.

## Sources

- [IQ — smooth minimum variants](https://iquilezles.org/articles/smin/) (fetched 2026-06-06)
- [Codrops — Interactive droplet-like metaballs, Three.js + GLSL](https://tympanus.net/codrops/2025/06/09/how-to-create-interactive-droplet-like-metaballs-with-three-js-and-glsl/) (2025-06-09)
- [Bridson — Curl-Noise for Procedural Fluid Flow, SIGGRAPH 2007](https://www.cs.ubc.ca/~rbridson/docs/bridson-siggraph2007-curlnoise.pdf); [al-ro — curl-noise particles](https://al-ro.github.io/projects/particles/)
- [Lloyd's algorithm — Wikipedia](https://en.wikipedia.org/wiki/Lloyd's_algorithm); [Deussen 2009 — Aesthetic Placement of Points](https://graphics.uni-konstanz.de/publikationen/Deussen2009AestheticPlacementPoints/Deussen2009AestheticPlacementPoints.pdf)
- [NVIDIA GPU Gems 3, ch.7 — Point-Based Metaballs](https://developer.nvidia.com/gpugems/gpugems3/part-i-geometry/chapter-7-point-based-visualization-metaballs-gpu); [Particle system / boids — Wikipedia](https://en.wikipedia.org/wiki/Particle_system)
- [Apple — Liquid Glass newsroom](https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/) (2025-06); [Liquid Glass droplet→toolbar — Medium](https://medium.com/@sarvjeet-singh/liquid-glass-ui-crafting-a-droplet-inspired-animation-that-transforms-into-a-toolbar-43070e0e46e1)
- [Godot Shaders — Metaballs](https://godotshaders.com/shader/metaballs/); [Godot Shaders — drop-in 2D PBR](https://godotshaders.com/shader/drop-in-pbr-2d-lighting-system-with-soft-shadows-and-ambient-occlusion/)

(All searches/fetches dated 2026-06-06 unless a publication date is given.)

---

### Lane 12

I have comprehensive material across both approaches. Synthesizing now.

---

# SOTA brief — GooBlob organic metaball (lane `gooey-filter-css`)

Research-only. The goal: perfect the blob's visual style, animation, interaction — premium, warm-cream-glass-native, performant. No implementation.

## 1. The current implementation (where we stand)

- **GooBlob = per-pixel WebGL2 SDF shader.** Body `sdCircle` + up to 4 orbiting satellites merged with Inigo Quilez **quadratic-polynomial `smin`** (`smin` at `src/components/custom/goo-blob/shaders/sdf-body.glsl.ts:16`). Edge is `fwidth`-based 1px AA (`metaball.frag.ts:149`). Color goes gamma-sRGB → OKLab → OKLCh perturb → linear → mandatory `linearToSrgb()` OETF (`metaball.frag.ts:159-173`). Runs on the shared `useWebGLCanvas` substrate with offscreen/PRM parking.
- **WatercolorDot = CSS/SVG sibling.** Seeded per-vertex `border-radius` morph + an internalized `feTurbulence`+`feDisplacementMap` filter (`WatercolorDot.vue:97-111`). No WebGL, no resolver — color is a CSS string painted straight onto the swatch.
- **The boundary is already drawn and documented.** `docs/tranches/AU/design/AU.W1-blob-primitives.md:18-29`: the goo-blob is the WebGL2 metaball, the watercolor-dot is the CSS/SVG dot. They are deliberate siblings, not redundant. The shader has an explicit **BOOKed ceiling** (`AU.W1-blob-primitives.md:67-71`): analytic-derivative noise, exponential smin, raymarching, and a Playwright golden are listed as deferred, not folded — "ONE quality level (the correct one)."

So the central question this lane poses (CSS/SVG gooey-filter vs shader SDF) is **already answered correctly for GooBlob.** The findings below confirm that and seed refinement waves on top.

## 2. CSS/SVG gooey-filter — the technique and its ceiling

The canonical recipe (`feGaussianBlur stdDeviation` → `feColorMatrix` alpha contrast → `feBlend`/`feComposite`) sharpens blurred-together shapes into a merged silhouette ([CSS-Tricks, The Gooey Effect](https://css-tricks.com/gooey-effect/); [Effect.Labs](https://effect-labs.com/en/pages/blog/animations-fluides-css.html)):

```
feGaussianBlur stdDeviation="10"
feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"   // alpha *18, -7*255 → contrast
```

**Why it's wrong for GooBlob specifically:**
- **Blur is the slow primitive.** `feGaussianBlur` cost scales with radius; animating it is "resource intensive" and the merge distance IS the blur radius, so you can't cheapen it ([MDN feGaussianBlur](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feGaussianBlur); [WebKit bug 283156](https://bugs.webkit.org/show_bug.cgi?id=283156)).
- **Safari hazards.** SVG filters on DOM elements are unreliable in Safari; `filter: blur()` tanks interaction perf Safari-only (workaround `translate3d` to force GPU); a CSS filter on an `<svg>` can make it vanish ([CSS-Tricks](https://css-tricks.com/gooey-effect/); [Graffino TIL](https://graffino.com/til/how-to-fix-filter-blur-performance-issue-in-safari)).
- **The alpha-contrast step crushes color.** `feColorMatrix` defaults to linearRGB and only thresholds alpha — semi-transparent edge pixels get binary-clipped, which kills the soft inner glow and per-pixel OKLCh hue swing GooBlob does in-shader. Set `color-interpolation-filters="sRGB"` if you ever do use it ([MDN feColorMatrix](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feColorMatrix)).

**Where CSS/SVG genuinely wins (and why WatercolorDot is correctly CSS/SVG):** crisp at any scale, zero GPU-context cost, trivially themeable, fine for a handful of static/low-motion shapes. SVG is the right call for "hundreds or fewer objects, crisp scaling" ([Tapflare](https://tapflare.com/articles/web-graphics-comparison-canvas-svg-webgl); [Jamie Wong](https://jamie-wong.com/2016/07/06/metaballs-and-webgl/)). The watercolor-dot's `feDisplacementMap` wet edge is exactly this sweet spot.

**Verdict:** Do NOT port GooBlob to a gooey-filter. The shader SDF path is the correct one for a continuously-animating, per-pixel-shaded, color-perturbed creature. The CSS/SVG boundary stays where it is.

## 3. Shader SDF — the SOTA to pull from

The June-2025 Codrops droplet-metaballs piece is the current reference ([Codrops](https://tympanus.net/codrops/2025/06/09/how-to-create-interactive-droplet-like-metaballs-with-three-js-and-glsl/)). Adoptable ideas, mapped against what GooBlob already does:

| Technique | Codrops / SOTA | GooBlob today | Gap |
|---|---|---|---|
| Smooth-min | exponential `smin` (`-log(exp(-k·d1)+exp(-k·d2))/k`) | Quilez quadratic poly | quadratic is faster, never overestimates, fine for ≤4 sources — **keep it** ([iquilezles smin](https://iquilezles.org/articles/smin/)) |
| Anti-alias | none (raymarch EPS + gamma) | `fwidth` 1px AA | **GooBlob is ahead** — keep |
| Pointer interaction | **15-position mouse-trail** of shrinking spheres, smin-blended → elastic stretch following cursor | single pointer-attraction warp | **ADOPT-candidate** (see wave seeds) |
| Surface richness | 3D value-noise on reflection vector + dual-color time-offset blend + `pow(color, 7)` gamma compression for translucent glass look | FBM hue/chroma perturb + subtle inner edge-glow | **ADOPT-candidate**: fake specular highlight + rim |
| Premium "glass" feel | gamma compression lets highlights dominate | flat fill + drop-shadow | **gap** |

**Fake lighting from the SDF** is the highest-leverage premium upgrade and is cheap: the SDF gradient gives a 2D normal for free, then a Blinn-Phong-style specular dot + a rim term (`1 - dot(N, viewDir)`) reads as a glossy gel droplet ([LearnOpenGL Basic Lighting](https://learnopengl.com/Lighting/Basic-Lighting); [3D Game Shaders rim lighting](https://lettier.github.io/3d-game-shaders-for-beginners/rim-lighting.html)). This is partially BOOKed already (`AU.W1-blob-primitives.md:67-71`) — this lane is the moment to un-book the *cheap analytic* half.

## 4. Liquid-glass refraction — relevant but Chromium-gated

Apple's WWDC-2025 Liquid Glass spawned a CSS/SVG refraction technique: a precomputed `feDisplacementMap` (Snell's-law displacement encoded R=x/G=y) + `feSpecularLighting` rim, applied as `backdrop-filter: url(#filter)` ([kube.io](https://kube.io/blog/liquid-glass-css-svg/); [rizroze/liquid-glass](https://github.com/rizroze/liquid-glass)). Strongly on-brand for warm-cream glass-ui — but **Chromium-only** (SVG-as-backdrop-filter isn't in the CSS spec), needs manual filter-dimension management, and any shape change forces a full map rebuild (only `scale` is cheap to animate). **Not adoptable as a baseline** for a cross-browser library primitive. Note for a future, progressively-enhanced glass-panel experiment, not for GooBlob.

## 5. ADOPT / wave-seed list

Tight, ranked, each scoped as a refinement wave on the existing shader (no rewrite):

**ADOPT (high value, low risk, on-brand):**
1. **Cheap analytic fake-lighting pass** — derive a 2D normal from the SDF gradient, add a Blinn-Phong specular dot + a soft rim term, tinted to warm-cream (`--background`/specular ~0.4–0.5 opacity per kube.io's tested range). Turns the flat fill into a glossy gel droplet. Un-books the cheap half of the AU BOOK ceiling. Gate: extend the existing color-equivalence/golden story. ([Codrops](https://tympanus.net/codrops/2025/06/09/how-to-create-interactive-droplet-like-metaballs-with-three-js-and-glsl/); [LearnOpenGL](https://learnopengl.com/Lighting/Basic-Lighting))
2. **Keep the Quilez quadratic smin** — research confirms it's the right pick for ≤4 sources (fast, never overestimates, clean C1). Do NOT swap to exponential. ([iquilezles smin](https://iquilezles.org/articles/smin/))
3. **Pointer mouse-trail (optional dynamic mode)** — replace the single-warp with an N-position shrinking-sphere trail (N≈8–15) smin-blended into the body, for elastic cursor-following. Gate behind the existing pointer config so it's opt-in; respects PRM via the substrate freeze. ([Codrops](https://tympanus.net/codrops/2025/06/09/how-to-create-interactive-droplet-like-metaballs-with-three-js-and-glsl/))

**WAVE-SEED (evaluate, more cost/scope):**
4. **Gamma-compression highlight pass** (`pow` curve) for translucency — but reconcile with the existing mandatory `linearToSrgb()` OETF so it doesn't reintroduce the too-dark trap (`metaball.frag.ts:173`). Needs the `proof:blob-space-gamma` gate to stay green; likely fold INTO the lighting pass rather than as a separate stage.
5. **Soft contact-shadow grounding** — the current drop-shadow is a static CSS `filter` on the wrapper (`GooBlob.vue:127`); a blob-shaped, body-radius-driven shadow would ground it on the cream surface more premium-ly. CSS-side, cheap, no shader change.

**REJECT / boundary-confirm (record the decision):**
6. **CSS/SVG gooey-filter port** — rejected; blur-radius perf, Safari DOM-filter unreliability, alpha-contrast color crushing. Shader SDF stays. ([CSS-Tricks](https://css-tricks.com/gooey-effect/); [WebKit 283156](https://bugs.webkit.org/show_bug.cgi?id=283156))
7. **Liquid-glass `backdrop-filter` refraction** — rejected as a baseline (Chromium-only, fixed-size, rebuild cost). Note as a future progressively-enhanced glass-panel experiment, not GooBlob. ([kube.io](https://kube.io/blog/liquid-glass-css-svg/))

The watercolor-dot ↔ goo-blob CSS/SVG-vs-shader boundary is correct and should be restated, not moved.

Key source files: `/Users/mkbabb/Programming/glass-ui/src/components/custom/goo-blob/shaders/metaball.frag.ts`, `.../shaders/sdf-body.glsl.ts`, `.../GooBlob.vue`, `/Users/mkbabb/Programming/glass-ui/src/components/custom/watercolor-dot/WatercolorDot.vue`, `/Users/mkbabb/Programming/glass-ui/docs/tranches/AU/design/AU.W1-blob-primitives.md` (boundary + BOOK ceiling at lines 18-29, 67-71).

---

### Lane 13

I now have comprehensive coverage. The key findings are clear: Baseline 2026, compute is overkill for a ≤4-ball 2D blob, and the real visual SOTA wins are in the fragment shader (SDF normals → fresnel/specular for a glossy droplet look). Let me compile the brief.

---

# GooBlob SOTA Research Brief — Lane "webgpu-blob-compute"

*Research + wave seeds only. No implementation. Tranche-development.*

## TL;DR verdict

**Do NOT migrate GooBlob to a WebGPU compute pipeline.** Compute-shader particle accumulation is the SOTA for *thousands-to-millions* of simulated bodies — it is genuine overkill for a ≤4-nucleus 2D metaball (body + ≤3 satellites, hard-capped at 4 in `useMetaballRenderer.ts:16` and `AV_MAX_BLOBS = 3` in aurora `budget.ts`). The current full-quad fragment-shader SDF + `smin` approach is the *correct* architecture for this body count and is exactly what the 2025 SOTA references use. The premium-look wins are all in the **fragment shader and the CPU-side motion/interaction systems**, not in the GPU API. WebGPU's value here would be a single shared-backend modernization (one codebase compiling to WGSL+GLSL), not a perf necessity — and that's a substrate-wide call (it'd have to take Aurora with it), not a blob-local one.

## Findings + citations

### 1. WebGPU is Baseline as of 2026 — but compute is the wrong tool for this component

- WebGPU shipped by default in all four major engines: Chrome/Edge 113 (2023, Android 121), Firefox 141 (Windows, Jul 2025) / 145 (macOS Apple Silicon), **Safari 26** (macOS Tahoe 26, iOS/iPadOS 26). Officially **Baseline "newly available" — "Baseline 2026"** (announced Nov 25 2025); it's an Interop 2026 focus area. [web.dev, 2025-11-25](https://web.dev/blog/webgpu-supported-major-browsers) · [web.dev/baseline](https://web.dev/baseline) · [caniuse webgpu](https://caniuse.com/webgpu)
- "Newly available" ≠ "widely available." Coverage is ~70% (Oct 2024 baseline, growing); Firefox Linux/Android still in progress into 2026. A blob that's a background decoration on a warm-cream surface cannot afford a hard WebGPU dependency without a WebGL2 fallback path — doubling the shader maintenance surface. [byteiota 2026](https://byteiota.com/webgpu-2026-70-browser-support-15x-performance-gains/) · [gpuweb Implementation-Status](https://github.com/gpuweb/gpuweb/wiki/Implementation-Status)

### 2. Compute's advantage is real — and irrelevant at N≤4

- The compute win: particle physics stays in GPU buffers across frames (positions never round-trip to CPU), with shared workgroup memory + synchronization. WebGL2 has no compute pipeline; GPGPU there means encoding state in float textures and ping-ponging framebuffers. This buys **1M particles in sub-2ms** vs ~5k on CPU. [Chrome: From WebGL to WebGPU](https://developer.chrome.com/docs/web-platform/webgpu/from-webgl-to-webgpu) · [threejsroadmap WebGL vs WebGPU](https://threejsroadmap.com/blog/webgl-vs-webgpu-explained) · [galaxy sim](https://threejsroadmap.com/blog/galaxy-simulation-webgpu-compute-shaders)
- GooBlob has **4 nuclei**, and they're already simulated cheaply on the CPU per-frame (`useBlobSatellites.ts` — orbit/wobble/phase math, then uploaded as ~12 uniforms). There is no accumulation bottleneck. The marching-cubes/compute metaball demos ([gnikoloff](https://gnikoloff.github.io/webgpu-compute-metaballs/), [toji](https://toji.github.io/webgpu-metaballs/)) are **3D isosurface extraction** — a different problem class entirely.
- SOTA confirms fragment-shader is the standard for few 2D balls: "For a small number of metaballs, the fragment shader approach appears to be the standard and sufficient solution." [shud.in metaballs](https://shud.in/posts/metaballs-1) · [Codrops droplet metaballs, 2025-06-09](https://tympanus.net/codrops/2025/06/09/how-to-create-interactive-droplet-like-metaballs-with-three-js-and-glsl/)

### 3. The premium-look gap is in the fragment shader, not the API

The current `metaball.frag.ts` is a **flat-fill** SDF: alpha-cutout body + OKLCh per-pixel hue/chroma perturbation + an inner edge glow (`metaball.frag.ts:166-168`). It has no surface lighting. The 2025 Codrops droplet (the most directly relevant SOTA reference, also a fragment full-quad) gets its glossy/translucent read from techniques GooBlob doesn't yet use:

- **SDF normal estimation via central differences** across the distance field → a usable surface normal for shading (Codrops uses this; it's the standard trick). The blob already has `d` per-pixel — normals are ~4 extra `sdCircle` taps.
- **Tone compression for a glass read**: blend two noise-influenced colors, then `pow(color, vec3(7.0))` to suppress darks so highlights pop → "more glass-like, translucent surface." Cheap, dramatic, and on-brand for warm-cream glass. [Codrops, 2025-06-09](https://tympanus.net/codrops/2025/06/09/how-to-create-interactive-droplet-like-metaballs-with-three-js-and-glsl/)
- **Fresnel rim + specular highlight** from the SDF normal + view/light dirs — the canonical "wet droplet" cue. Fresnel reflectivity rises at grazing angles; a single specular lobe reads as a gloss highlight. [demofox fresnel/refraction](https://blog.demofox.org/2017/01/09/raytracing-reflection-refraction-fresnel-total-internal-reflection-and-beers-law/) · [lousodrome fresnel](https://lousodrome.net/blog/light/tag/fresnel/)
- **Pointer-trail metaballs** for interactivity: Codrops stores a 15-element pointer trail as a uniform array and spawns shrinking metaballs along it — a "liquid following the cursor" read. GooBlob's pointer is currently a single attract/deform vector (`metaball.frag.ts:123-128`). A short trail (reusing the existing `MAX_SATS` upload machinery) would make the interaction feel alive without new infrastructure.

### 4. If WebGPU is ever adopted, do it substrate-wide via a backend abstraction — not raw WGSL in the blob

- Raw WGSL would fork every shader (Aurora + GooBlob both compose `useWebGLCanvas` + the shared `procedural-color.glsl.ts` OETF/OKLCh chunk). The SOTA path for dual-backend is **TSL** (Three Shader Language) — author once, compile to WGSL *and* GLSL — but that pulls in Three.js, which glass-ui does not depend on. Migration cost for custom shaders: "1-2 days for TSL conversion" *per project*, plus the Three.js runtime weight. [utsubo migration guide 2026](https://www.utsubo.com/blog/webgpu-threejs-migration-guide) · [Maxime Heckel TSL field guide](https://blog.maximeheckel.com/posts/field-guide-to-tsl-and-webgpu/)
- Net: a WebGPU port here is a **substrate decision** (rewrite `useWebGLCanvas` → a `useGPUCanvas` with a WGSL twin of every shader + a WebGL2 fallback), justified only when a *different* future consumer needs compute (e.g. a 10k-particle field). Out of scope for perfecting *this* blob. Park it as a documented non-goal with a revisit trigger.

## ADOPT / wave-seed list

**Architecture verdict (wave-seed: decision record)**
1. **REJECT compute/WebGPU migration for GooBlob.** Record as a non-goal: N≤4 2D metaball has no accumulation bottleneck; fragment-quad SDF is SOTA-correct. Revisit trigger = a consumer needing ≥ ~1k simulated bodies, and then only as a substrate-wide `useGPUCanvas` with a WGSL+GLSL twin (TSL-style or hand-dual), never blob-local raw WGSL. Keep `useWebGLCanvas` as the single backend.

**Visual-quality waves (fragment shader — the real wins, all WebGL2)**
2. **SDF-normal shading seam.** Estimate a surface normal from `d` via central differences; thread it into the OKLCh path. Foundation for #3/#4. (Cost: ~4 extra SDF taps/pixel; well under `AV_DPR_MAX`-clamped budget.)
3. **Fresnel rim + single specular lobe** for the wet-droplet/glass gloss — bind highlight tint + intensity + a light direction to `--blob-*` tokens (token-first precept). This is the headline premium-look lift.
4. **Tone-compression glass pass** (`pow()` highlight concentration over a 2-color noise blend) — token-tunable exponent. Cheap glass-translucency read that suits warm-cream glass.

**Interaction wave**
5. **Pointer-trail metaballs.** Replace the single-vector pointer deform with a short trail (4-8 samples) feeding the existing satellite-upload path → "goo follows the cursor." Optional/dynamic per the goal's "optionally interactive."

**Integration / guardrails (carry-over, no new tech)**
6. Keep the OKLCh perceptual color pipeline + the shared `procedural-color.glsl.ts` OETF (already correct; #3/#4 must splice through it, not around it — the `proof:blob-space-gamma` + `blob-color-equivalence` gates stay green).
7. Hold the `AV_DPR_MAX=2` / `AV_MAX_BLOBS=3` budget ceilings and the `useWebGLCanvas` offscreen/PRM park — every new shader cost lands inside the existing frame budget; no new rAF path.

## Relevant files (absolute)
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/goo-blob/shaders/metaball.frag.ts` — flat-fill SDF target for #2-#5 (pointer at :123-128, edge glow at :166-168)
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/goo-blob/composables/useMetaballRenderer.ts` — uniform upload + 4-sat cap (:16); where trail uniforms would wire
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/goo-blob/composables/useBlobSatellites.ts` — CPU nucleus sim (no accumulation bottleneck — the compute-rejection evidence)
- `/Users/mkbabb/Programming/glass-ui/src/composables/glass/webgl/useWebGLCanvas.ts` — the single shared WebGL2 substrate; any WebGPU port is here, substrate-wide, or nowhere
- `/Users/mkbabb/Programming/glass-ui/src/composables/glass/webgl/shaders/procedural-color.glsl.ts` — shared OETF/OKLCh chunk #3/#4 must splice through
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/aurora/constants/budget.ts` — `AV_DPR_MAX`/`AV_MAX_BLOBS` ceilings the new shader cost lives under

---

### Lane 14

I now have everything needed for a tight, well-cited brief. Let me compile the findings.

---

# SOTA brief — GooBlob particle-blob systems (lane: particle-blob-systems)

Research only. No implementation. Citations carry URL + access date (2026-06-06).

## Where GooBlob is today

The current renderer is **few-analytic-SDF**, not particle-based: one main `sdCircle` body + up to 4 satellites `smin`-merged, FBM-displaced edges, OKLCh per-pixel perturbation, all in one full-screen fragment shader. Satellites are scripted orbits (`useBlobSatellites`), not simulated bodies.
- Body+satellites+smin: `src/components/custom/goo-blob/shaders/metaball.frag.ts:137-145`
- Hard cap of 4 satellites: `useMetaballRenderer.ts:16` (`MAX_SATS = 4`)
- Per-frame uniform upload of each satellite pos/radius/opacity (no texture path): `useMetaballRenderer.ts:289-303`

The lane's premise — "make the blob from *many* particles for richer dynamics" — means moving from "4 scripted analytic balls" toward "N simulated points that form one organic field." The research below maps the cheap→premium ladder for that.

## Findings

**1. The cheapest premium route is still a fragment-shader density field — just fed by more points.** The canonical N-metaball pipeline sums an inverse-square falloff (`r²/dist²`) per ball per pixel against a threshold; the GPU parallelizes across pixels so "adding more balls just means more distance evaluations in the loop." The reference tutorial uses **12 metaballs** via uniform arrays. ([Jamie Wong, *Metaballs and WebGL*](https://jamie-wong.com/2016/07/06/metaballs-and-webgl/), accessed 2026-06-06). This is exactly GooBlob's existing structure — the gap is count and how positions arrive.

**2. Uniform arrays cap out ~512 vec4s; textures are the route past ~30 particles.** Uniform-array metaballs are simple but limited; a float texture (positions in texels) lifts the ceiling to thousands and is the standard "many particle" transport. ([Jamie Wong](https://jamie-wong.com/2016/07/06/metaballs-and-webgl/); [Metaballs and WebGL, particle-as-texture note], accessed 2026-06-06). GooBlob currently uploads per-satellite uniforms one-by-one (`useMetaballRenderer.ts:289-303`) — that pattern does not scale; a position texture is the migration seam.

**3. `smin` (polynomial smooth-min) is the right merge operator and GooBlob already uses it — but iq's 2024 rewrite adds better kernels.** Polynomial smin can return *exact* a/b at the boundaries (exponential/sigmoid never do), which keeps far-apart blobs crisp while near ones fuse. iq fully rewrote the article introducing normalization, kernels, and a *circular* smooth-min with better-behaved blends. ([Inigo Quilez, *smin*](https://iquilezles.org/articles/smin/), accessed 2026-06-06). GooBlob's `smin` is the older polynomial form (`metaball.frag.ts:144`); the circular/normalized variant is a drop-in quality lift.

**4. Many-particle motion is cheap on the CPU at UI scale (verlet/spring), GPU only if you go to thousands.** For a UI badge-scale blob you do not need a full SPH solver — verlet integration with neighbor springs gives organic, fluid-feeling motion and runs fine on CPU for tens of particles; GPU verlet-in-fragment-shader scales to a quarter-million only if you need it. ([WebSearch synthesis: Unity 2D metaballs / GPU verlet, danielilett.com & prideout.net, accessed 2026-06-06](https://danielilett.com/2020-03-28-tut5-2-urp-metaballs/)). Implication: a 15–40-particle CPU verlet "swarm" feeding a position texture is the sweet spot — richer than 4 scripted orbits, far below SPH cost.

**5. Full SPH/PIC-FLIP is the premium ceiling but overkill here.** Modern WebGPU SPH does density/pressure/viscosity in compute shaders with prefix-sum + linear-grid neighbor search, hitting "tens of thousands of particles at 60 FPS." ([jeantimex/fluid](https://github.com/jeantimex/fluid), accessed 2026-06-06; [robert-leitl/gpgpu-2d-sph](https://github.com/robert-leitl/gpgpu-2d-sph-fluid-simulation) does the WebGL2 version with odd-even-merge sort + offset-list cells). This is real fluid behavior (splashes, pressure) — wrong register for a warm-cream glass UI accent, and WebGPU isn't universally available. Note as "ceiling, not target."

**6. Screen-space fluid (depth→blur→normal→shade) is how particle fluids get a premium *surface*, and the cheap variant is viable.** The pipeline: render particles as sprites to a depth buffer → smooth depth (bilateral, or cheaper plain Gaussian) → thickness via additive blend → reconstruct normals from smoothed depth → shade with specular + screen-space refraction. The author's cheapest-viable variant **skips bilateral, uses Gaussian**, and notes the three steps that matter most for look are **depth smoothing, normal reconstruction, and the foam/edge term**. Minimum ~5 passes. ([devfault, *Screen-space Water Rendering*](https://devfault.wordpress.com/2018/08/07/screen-space-water-rendering/), accessed 2026-06-06; NVIDIA GDC2010 *Screen Space Fluid Rendering* is the canonical source). 2023 anisotropic SSF stretches point sprites along principal axes + curvature-flow/narrow-range filters for smoother surfaces without losing detail. ([Anisotropic SSF, Computers&Graphics 2022/23](https://www.sciencedirect.com/science/article/pii/S0097849322002308), accessed 2026-06-06). For GooBlob's flat 2D look this is mostly overkill, but **normal-from-density-field + one specular term** is the single highest-ROI premium upgrade.

**7. Marching squares is the *cheap-contour* alternative, not a quality upgrade.** It extracts the iso-contour on a coarse grid (4–6px cells give clean outlines at a fraction of per-pixel cost) — useful only if per-pixel field eval becomes a budget problem at high particle counts. For GooBlob's per-pixel SDF shader already running fine, marching squares is a *fallback*, not the premium path. ([Grokipedia/Metaballs + iradicator marching-squares-metaballs, accessed 2026-06-06](https://iradicator.com/2d-surface-reconstruction-marching-squares-with-meta-balls/)).

**8. The SVG `feGaussianBlur` + `feColorMatrix` "goo filter" is the zero-WebGL premium trick — relevant as a reduced-motion/fallback tier.** Heavy blur a group, then crank contrast via color-matrix alpha to crush fuzzy edges into one sharp fused shape. Cheap, ubiquitous, no GPU context. ([CSS-Tricks *Blobs*](https://css-tricks.com/blobs/) + [DEV *SVG Metaballs*](https://dev.to/antogarand/svg-metaballs-35pj), accessed 2026-06-06). Worth noting as the static/PRM fallback the WebGL substrate already needs (GooBlob freezes one frame under reduced-motion via the `useWebGLCanvas` substrate).

## ADOPT / wave-seed list

Ordered by ROI for "richer dynamics, premium, performant, integrated with warm-cream glass." Each is a seed, not a spec.

- **W-seed A — Particle-fed density field (the headline).** Replace the 4 scripted analytic satellites with **N (≈15–40) simulated points** summed as a metaball field in the existing fragment shader. Keep the single full-screen SDF pass; change the *input* from per-satellite uniforms to a **position texture** (uniform arrays cap ~512 / texture scales to thousands — finding 1, 2). This is the literal "blob from many particles" the lane asks for and reuses the current shader spine. Source: Jamie Wong.

- **W-seed B — CPU verlet/spring swarm for motion.** Drive the N points with **verlet integration + soft neighbor springs + a center tether** (so the swarm coheres into one body but breathes/jiggles organically). CPU-side is ample at this count; no SPH. Mood system modulates spring stiffness / tether strength instead of scripted orbit params. Source: finding 4. This is where "richer dynamics" lives — pointer pushes become real impulses on particles, not a UV-warp.

- **W-seed C — Upgrade `smin` to iq's normalized/circular kernel.** Drop-in swap of the merge operator for crisper far-apart separation + smoother fusion (finding 3). Cheapest quality win; isolated shader edit. Source: iquilezles.org/articles/smin.

- **W-seed D — Density-gradient normals + one specular term.** Reconstruct a normal from the density field gradient and add a single soft specular/inner-bevel highlight tinted to the warm-cream glass tokens. This is the **highest-ROI premium *look* upgrade** (finding 6 names normals + edge as the look-defining steps) without the full 5-pass SSF cost. Keeps it a 2D accent, not a 3D fluid.

- **W-seed E — Pointer as physical impulse (interaction).** With particles real (W-seed B), the existing `uPointer` warp becomes an **attract/repel impulse field** on the swarm — flick the pointer and the blob sloshes and re-coheres. Far more intuitive/premium than the current UV displacement (`metaball.frag.ts:123-128`). Optional/dynamic per the goal.

- **W-seed F (note, don't build) — SVG goo-filter static fallback.** Document the `feGaussianBlur`+`feColorMatrix` recipe as the reduced-motion / no-WebGL2 fallback tier (finding 8). Pairs with the substrate's existing one-static-frame PRM freeze.

- **Explicitly OUT of scope (ceiling markers).** Full **SPH/PIC-FLIP** (finding 5) and **multi-pass screen-space fluid** (finding 6) — correct SOTA for *liquid* simulations, wrong register and wrong cost for a warm-cream glass UI accent. **Marching squares** (finding 7) — a cheap-contour fallback only, not a quality path; revisit only if per-pixel eval blows the budget at high N.

## Integration constraints to carry into any wave

- Stay on the **`useWebGLCanvas` substrate** — it owns context lifecycle, offscreen/tab-hidden park, and the live reduced-motion freeze (`useMetaballRenderer.ts:73-143`). A particle sim must keep its rAF inside the substrate's `frame`/`shouldContinue` gates, and the verlet step must be a no-op when parked.
- **WebGL2 only** (the substrate's contract); WebGPU SPH is off the table for the universal path. A position-texture particle field is fully WebGL2-doable (float textures).
- **Warm-cream glass fidelity is non-negotiable**: keep color in the existing OKLCh linear pipeline (`metaball.frag.ts:159-173`) — any new specular/normal term composes in OKLCh/linear and exits through the mandatory `linearToSrgb` OETF, or it ships visibly too-dark (the documented A5/A2 trap).
- **DPR≤2 budget** (`AV_DPR_MAX`, `useMetaballRenderer.ts:205`) and the per-subpath ≈16KiB-class chunk budget bound how much new shader/JS a wave can add.

**Sources:**
- [Jamie Wong — Metaballs and WebGL](https://jamie-wong.com/2016/07/06/metaballs-and-webgl/) (2026-06-06)
- [Inigo Quilez — smooth minimum (smin) rewrite](https://iquilezles.org/articles/smin/) (2026-06-06)
- [devfault — Screen-space Water Rendering](https://devfault.wordpress.com/2018/08/07/screen-space-water-rendering/) (2026-06-06)
- [Anisotropic screen-space rendering for particle fluids — ScienceDirect](https://www.sciencedirect.com/science/article/pii/S0097849322002308) (2026-06-06)
- [robert-leitl — GPGPU 2D SPH (WebGL2)](https://github.com/robert-leitl/gpgpu-2d-sph-fluid-simulation) (2026-06-06)
- [jeantimex/fluid — WebGPU SPH + PIC/FLIP](https://github.com/jeantimex/fluid) (2026-06-06)
- [vishald — Gooey metaballs using fragment shaders](https://vishald.com/blog/gooey-webgl/) (2026-06-06)
- [iradicator — Marching Squares with Metaballs](https://iradicator.com/2d-surface-reconstruction-marching-squares-with-meta-balls/) (2026-06-06)
- [CSS-Tricks — Blobs](https://css-tricks.com/blobs/) + [DEV — SVG Metaballs](https://dev.to/antogarand/svg-metaballs-35pj) (2026-06-06)
- [danielilett — 2D Metaballs in Unity URP](https://danielilett.com/2020-03-28-tut5-2-urp-metaballs/) (2026-06-06)

Relevant existing files: `/Users/mkbabb/Programming/glass-ui/src/components/custom/goo-blob/shaders/metaball.frag.ts`, `/Users/mkbabb/Programming/glass-ui/src/components/custom/goo-blob/composables/useMetaballRenderer.ts`, `/Users/mkbabb/Programming/glass-ui/src/components/custom/goo-blob/types.ts`.

---

### Lane 15

I have comprehensive coverage. Let me write the brief.

---

# SOTA brief — reaction-diffusion (Gray-Scott / Turing) for the goo-blob surface

**Lane:** reaction-diffusion · **Mode:** research + wave seeds (NO implementation)

## Where the blob is today

The current goo-blob is a **single-pass procedural** surface, not a simulation. `metaball.frag.ts:118-177` is one fullscreen quad: an SDF body (`sdCircle` + `smin` satellites, `sdf-body.glsl`) with an **fBM-displaced edge** (`watercolor-edges.glsl`, `fbm(uv*uNoiseFreq + uTime*uNoiseSpeed, 3)` at `metaball.frag.ts:134`) and per-pixel **OKLCh color perturbation** (`metaball.frag.ts:159-170`). There is no feedback texture — every frame is computed fresh from time + uniforms. So the "living, growing" quality is faked by noise drift; there is no actual pattern formation, no memory, no emergent texture.

The substrate (`useWebGLCanvas.ts`) already gives us everything an RD pass needs for free: WebGL2 context, demand-driven rAF park, offscreen/PRM freeze, context-loss self-heal, ResizeObserver. The renderer (`useMetaballRenderer.ts:145-340`) currently builds **one program + one VAO + one draw**. Adding a ping-pong RD pre-pass is additive — a second program writing to FBOs, sampled by the existing display shader. Canvas is small (`types.ts:100` `canvasSize: 200`, DPR-clamped at `useMetaballRenderer.ts:205`), which is the single biggest reason RD is affordable here (see perf).

## What SOTA reaction-diffusion actually is

**Gray-Scott** is the canonical two-chemical model. Two scalar fields A, B per cell; A is fed in, B kills, B² autocatalyzes. The update (from the WebGPU Unleashed tutorial, the clearest concrete statement):

```
A' = A + (Dₐ·∇²A − A·B² + f·(1−A))·Δt
B' = B + (D_b·∇²B + A·B² − (k+f)·B)·Δt
```
— [WebGPU Unleashed, Reaction Diffusion](https://shi-yan.github.io/webgpuunleashed/Compute/reaction_diffusion.html) (accessed 2026-06-06)

**Laplacian = 3×3 convolution**, weights: center `−1.0`, edge-adjacent (N/S/E/W) `0.2`, diagonal `0.05`. Diffusion `Dₐ=1.0`, `D_b=0.5`. The *pattern identity* lives entirely in two numbers — feed `f` and kill `k`:
- `f=0.055, k=0.062` → the classic mottled/coral "default"
- spots/mitosis vs stripes/worms/coral are all just `(f,k)` coordinates on a 2D map (Robert Munafo's parameter chart; Jason Webb's playground exposes f on Y, k on X) — [Jason Webb, reaction-diffusion-playground](https://github.com/jasonwebb/reaction-diffusion-playground) (accessed 2026-06-06)

**Spatially-varying f/k is the killer feature for us.** If `f` and `k` are read from a *map* (a gradient, an SDF, a noise field) instead of constants, the pattern morphology *changes across the surface* — coral here, spots there — which reads as a living, differentiated organism rather than a uniform texture. piellardj varies f/k per-pixel from source-image brightness; we'd vary them from the blob's own SDF (denser pattern toward the rim, calmer at the core). — [piellardj/reaction-diffusion-webgl](https://github.com/piellardj/reaction-diffusion-webgl) (accessed 2026-06-06)

### The mechanism: GLSL ping-pong

Two textures (or two FBO color attachments). Read current state from tex0, write next state to tex1, swap. The kernel needs neighbor samples, so the field must live in a texture, not in a uniform — this is the architectural delta from today's stateless shader. — [amandaghassaei/ReactionDiffusionShader](https://github.com/amandaghassaei/ReactionDiffusionShader), [lejeunerenard/reaction-diffusion](https://github.com/lejeunerenard/reaction-diffusion) (accessed 2026-06-06)

### Precision

A, B are in `[0,1]`. WebGL2 has native half/float textures, so use **RG16F** (`gl.RG16F` / `HALF_FLOAT`) — two channels, 16-bit, exactly fits A,B and is half the bandwidth of RG32F on a 200px surface. The 32-bit `rg32float` the WebGPU tutorials use is overkill at our size. (WebGL1-era tricks — packing 16 bits across two 8-bit channels, piellardj's RGBA scheme — are obsolete for us; we're WebGL2-only via the substrate.) — [WebGPU Unleashed](https://shi-yan.github.io/webgpuunleashed/Compute/reaction_diffusion.html), [piellardj](https://github.com/piellardj/reaction-diffusion-webgl) (accessed 2026-06-06)

## Performance — the load-bearing facts

RD's cost is iterations × resolution × fetches-per-cell. Three independent levers, all standard SOTA:

1. **Substep, don't render-step.** RD needs many small Δt iterations to settle, but you only *display* once per frame. Run N ping-pong iterations per rAF (8–20 typical) at sim resolution, display once. — [Jason Webb](https://jasonwebb.github.io/reaction-diffusion-playground/), [WebGPU Unleashed](https://shi-yan.github.io/webgpuunleashed/Compute/reaction_diffusion.html)
2. **Sim at a fraction of display res.** Codrops runs the sim at "a quarter of the canvas size" and upsamples with bilinear smoothing — the pattern is low-frequency, so this is nearly free visually. At our 200px CSS the sim grid is tiny (e.g. 128² or 96²). — [Codrops, Reaction-Diffusion Compute Shader in WebGPU](https://tympanus.net/codrops/2024/05/01/reaction-diffusion-compute-shader-in-webgpu/) (2024-05-01)
3. **9-fetch Laplacian, not the 5-fetch hack.** The GPU-linear-interpolation 5-tap trick saves fetches but injects numerical error that destabilizes the *simulation* (fine for blur, not for feedback). piellardj explicitly avoids it for the compute pass. Keep 9 explicit taps; at 128² it's negligible. — [piellardj](https://github.com/piellardj/reaction-diffusion-webgl)

The substrate's park machinery (`useWebGLCanvas.ts:153-166`, offscreen/PRM/tab) already gates this — an idle/offscreen blob runs zero RD iterations. Under `prefers-reduced-motion` the substrate freezes after one frame, so the RD pass must paint a *settled* static state (seed→settle on first arm, then park), not a blank field.

## Aesthetic — making it premium, not a science demo

The raw A/B field is a grayscale lab visualization. The premium look is **how you map and composite it**:

- **Use RD as a texture/displacement map, not the silhouette.** The blob shape stays the existing SDF+`smin` body (`sdf-body.glsl`); RD modulates *within* the mask — perturbing the OKLCh lightness/chroma (`metaball.frag.ts:159-170`), driving the edge displacement that fBM does today, or feeding a thin specular vein. This keeps it on-brand glassmorphic and warm-cream while adding the organic interior.
- **Confine RD to the body via the SDF mask** and run **reflective/clamped boundaries** (CLAMP_TO_EDGE) so the pattern doesn't leak past the rim or seam. Toroidal wrap is for tileable fields; we want a contained organism — copy/clamp at the mask boundary. — [Witkin & Kass, Reaction-Diffusion Textures (CMU)](https://www.cs.cmu.edu/~jkh/462_s07/reaction_diffusion.pdf)
- **Color via cosine/IQ palette + emboss, not heatmap.** Codrops' 5-step finish is the template: bulge-distort UV → IQ cosine palette → emboss filter for volumetric "veins" → fake iridescence (inverted emboss) → vignette. We swap their palette for a warm-cream OKLCh ramp so it matches glass-ui tokens. — [Codrops](https://tympanus.net/codrops/2024/05/01/reaction-diffusion-compute-shader-in-webgpu/), [IQ cosine palettes](https://iquilezles.org/articles/palettes/)
- **Domain-warp the sample.** Reading the RD field through an fBM-warped UV (the technique we already half-use) gives the marbled, flowing quality rather than a static print. — [IQ, domain warping](https://iquilezles.org/articles/warp/)

## Interaction (the "optionally dynamic" axis)

RD is *stateful*, which makes interaction far richer than today's stateless pointer-pull (`metaball.frag.ts:122-128`):
- **Pointer = seed injection.** Inject B (or clear A) at the pointer position into the ping-pong field; the pattern *grows and heals* from the touch over the next seconds — a memory effect impossible with the current per-frame shader.
- **Mood → (f,k) target.** The existing `BlobMood` system (`useBlobMood.ts`, `MoodParams`) drives a smooth lerp of `f`/`k` toward a per-mood coordinate on the Munafo map (sleepy=calm coral, excited=fast mitosis spots). This reuses the mood seam wholesale; only the consumed uniforms change.

---

## ADOPT / wave-seed list

| # | Wave seed | What | Files touched | Cost |
|---|-----------|------|---------------|------|
| **W-rd1** | **Ping-pong RD pre-pass** | Add a 2nd GLSL program + two `RG16F`/`HALF_FLOAT` FBOs; N substeps/frame writing A,B; classic Gray-Scott (`f=0.055,k=0.062`, Laplacian `−1/0.2/0.05`, `Dₐ=1,D_b=.5`). Sim grid ~96–128² (sub-canvas res). | new `shaders/reaction-diffusion.frag.ts`; `useMetaballRenderer.ts` (2nd program, FBO swap, N-iter loop) | M |
| **W-rd2** | **RD-driven display, not new silhouette** | Display shader samples the settled RD field and modulates the *existing* OKLCh perturbation + edge displacement inside the SDF mask. Keep body shape from `sdf-body.glsl`. | `metaball.frag.ts` (replace fBM color/edge noise with RD sample), `watercolor-edges.glsl` | M |
| **W-rd3** | **Spatially-varying f/k from the SDF** | Read `f`,`k` from the blob's own distance field (rim vs core) so morphology differs across the surface — the "differentiated organism" look. | RD frag shader; uniform/map from `sdf-body.glsl` | S |
| **W-rd4** | **Warm-cream palette + emboss finish** | IQ cosine palette tuned to glass-ui cream tokens; emboss → fake-iridescence vein pass; vignette. Reuse existing OETF/OKLCh chunk (`procedural-color.glsl.ts`). | `metaball.frag.ts`, possibly new `palette.glsl.ts` | S |
| **W-rd5** | **Pointer = seed injection (stateful interaction)** | Inject into the RD field at pointer pos; pattern grows/heals over seconds. Replaces the stateless UV-pull. | RD frag + `useBlobPointer.ts` uniform wiring | S |
| **W-rd6** | **Mood → (f,k) lerp** | Map each `BlobMood` to a Munafo (f,k) coordinate; smooth-lerp via the existing mood tick. Spots↔coral↔worms per mood. | `useBlobMood.ts`/`MoodParams` (`types.ts:5-17`), RD uniforms | S |
| **W-rd7** | **Perf + PRM contract** | N-substeps@sub-res, 9-tap Laplacian (no 5-tap hack), CLAMP_TO_EDGE boundaries, seed-then-settle-then-park so reduced-motion shows a settled static pattern (not blank). Verify against substrate park gates. | `useMetaballRenderer.ts`, RD shader | S |

**Sequencing:** W-rd1 (substrate) → W-rd2 (wire to display) → W-rd3/W-rd4 (morphology + look) → W-rd5/W-rd6 (interaction/mood) → W-rd7 (harden). W-rd1+W-rd2 are the load-bearing pair; everything else is additive polish on the established ping-pong.

**Key risk to flag for planning:** RD adds a stateful texture pass to a previously-stateless shader. The seed→settle lifecycle must be deterministic on `arm()` and on every `webglcontextrestored` (`useWebGLCanvas.ts:260-264` re-runs setup) — a context-loss that drops the RD field must re-seed, or the blob comes back blank. Bake re-seed into the substrate's `setup` callback.

## Sources
- [Codrops — Reaction-Diffusion Compute Shader in WebGPU](https://tympanus.net/codrops/2024/05/01/reaction-diffusion-compute-shader-in-webgpu/) (2024-05-01)
- [WebGPU Unleashed — Reaction Diffusion](https://shi-yan.github.io/webgpuunleashed/Compute/reaction_diffusion.html) (accessed 2026-06-06)
- [Jason Webb — reaction-diffusion-playground](https://github.com/jasonwebb/reaction-diffusion-playground) · [live](https://jasonwebb.github.io/reaction-diffusion-playground/) (accessed 2026-06-06)
- [piellardj/reaction-diffusion-webgl](https://github.com/piellardj/reaction-diffusion-webgl) (accessed 2026-06-06)
- [amandaghassaei/ReactionDiffusionShader](https://github.com/amandaghassaei/ReactionDiffusionShader) · [lejeunerenard/reaction-diffusion](https://github.com/lejeunerenard/reaction-diffusion) (accessed 2026-06-06)
- [Witkin & Kass — Reaction-Diffusion Textures, CMU](https://www.cs.cmu.edu/~jkh/462_s07/reaction_diffusion.pdf) (boundary conditions; accessed 2026-06-06)
- [Inigo Quilez — domain warping](https://iquilezles.org/articles/warp/) · [cosine palettes](https://iquilezles.org/articles/palettes/) (accessed 2026-06-06)

---

### Lane 16

I have comprehensive SOTA coverage across all five interaction patterns the prompt named, plus the existing component's coupling seam. Let me compile the brief.

---

# SOTA Brief: GooBlob Interaction Lane ("interaction-blob")

Research-only. Tranche-development wave seeds for making the metaball blob a delightful, performant interactive toy seamlessly integrated with glass-ui's warm-cream glass.

## Current state (what exists at HEAD)

The blob already has a WebGL2 metaball substrate but its interaction surface is **a single, shallow gesture**: a smoothed pointer warp toward the cursor. There is no press, no flee, no ripple, no grab.

- `useBlobPointer.ts:3` — `SMOOTH_FACTOR = 0.12` exponential lerp toward the raw pointer; decays to center on leave. **Position-only; no velocity, no press state, no touch-specific path** (uses `pointermove`/`pointerleave`, so it covers pointer but tracks no `pointerdown`/`up`).
- `metaball.frag.ts:123-128` — the entire deformation is one block: `vec2 pointerDir = uPointer - uv; influence = smoothstep(0.4, 0.0, dist) * uPointerAttraction * uPointerStrength; uv -= normalize(pointerDir) * influence;`. A uniform inward/outward pull of the SDF domain. No squish, no ring, no anisotropic stretch.
- `useMetaballRenderer.ts:241-248` — only `uPointer`, `uPointerActive`, `uPointerAttraction`, `uPointerStrength` are wired. No press/velocity/ripple uniforms exist yet.
- `types.ts:122-123` — `pointerAttraction: 0.0` (off by default), `pointerStrength: 0.08`. The blob ships effectively non-interactive.
- Mood system (`useBlobMood.ts`) and orbiting satellites (`useBlobSatellites.ts`) exist and are independent of pointer — good seams for "flee" coupling (mood can gate interaction intensity).

So the lane is greenfield: every named pattern (squish, follow/flee, ripple, grab-and-stretch) is net-new on top of a clean uniform-driven SDF.

## SOTA findings by pattern

### 1. Follow / attraction (the trail-of-spheres technique)
The canonical 2025 reference (Codrops droplet metaballs) does NOT warp one body — it **lays a trail of `smoothMin`-merged spheres along the pointer history**, radii tapering down the trail, which reads as the blob *reaching* toward the cursor and stretching elastically. Trail length 15; `baseRadius = 8e-3`; per-index radius `radius - baseRadius * fi`; merged with `smoothMin(d1,d2,k)` at `k=7.0`. This is a far more organic "follow" than a uniform domain pull, and it composes directly with the existing satellite `smin` loop. ([Codrops, 2025-06-09](https://tympanus.net/codrops/2025/06/09/how-to-create-interactive-droplet-like-metaballs-with-three-js-and-glsl/))

### 2. Spring-coupled pointer (replace the flat lerp)
Premium feel comes from spring physics, not a constant lerp: springs accelerate/decelerate so motion overshoots and settles organically. Standard control axes are **mass / stiffness(tension) / damping(friction)**; a known-good elastic config is `stiffness: 300, damping: 12`. The spring also gives **velocity for free** — the key input for velocity-driven stretch. ([Josh Comeau, spring physics](https://www.joshwcomeau.com/animation/a-friendly-introduction-to-spring-physics/); [Motion, follow-cursor spring](https://motion.dev/tutorials/js-spring-follow-cursor))

### 3. Squish-on-press (squash & stretch with volume preservation)
The animation-canon rule: deform with **inverse-reciprocal scale** so volume is preserved — `scale: squashRatio, 1/squashRatio`. Recommended subtle range **25–50%** (`--stretch-ratio: 1.25; --squash-ratio: 1.5` as the demo's loud values; keep it subtler). Event-based snap-back ~150ms reads as "playful and unexpected." For an SDF blob this maps to an **anisotropic scale of the UV domain** on `pointerdown` (squash along press axis, stretch perpendicular), released via spring. ([Josh Comeau, squash & stretch](https://www.joshwcomeau.com/animation/squash-and-stretch/))

### 4. Ripple on press/release (expanding ring via animated progress uniform)
The Codrops GSAP-shader piece is the direct recipe: on click, store impact origin `uMouse = intersection.uv`, then tween a `uRippleProgress` through keyframes `[0, 1, 0]` over **1.5s, `power3.inOut`**. Shader: `dist = distance(uv, uMouse); ripple = sin(-PI*10.0*(dist - uTime*0.1))`, modulated by `uRippleProgress` as an envelope, applied as displacement `* 0.1`. For the blob this becomes an SDF edge displacement ring radiating from the touch point — the classic "press feedback" with decay. ([Codrops, 2025-10-08](https://tympanus.net/codrops/2025/10/08/how-to-animate-webgl-shaders-with-gsap-ripples-reveals-and-dynamic-blur-effects/); generic ripple math corroborated by [Geeks3D shader library](https://www.geeks3d.com/20110316/shader-library-simple-2d-effects-sphere-and-ripple-in-glsl/))

### 5. Grab-and-stretch / rubber-band (drag with snap-back)
Pattern: on `pointerdown` near the body, bind a control point to the drag position; redraw the deformed shape each frame; on release, **snap back with a spring** (stored elastic potential → kinetic overshoot). For the SDF, this is a localized domain pull anchored at the grab point whose magnitude grows with drag distance and is released by the same spring used elsewhere. ([SammiApps, rubber-band stretch](https://sammifriends.medium.com/rubber-band-stretching-effect-a1697b32364))

### 6. Flee / repulsion + character idle (the "toy" layer)
Repulsion is just the attraction formula with sign flipped (`uv += normalize(pointerDir) * influence`), gated by a `mood`/state flag so the blob can *choose* to flee vs. follow — the existing `useBlobMood` is the natural gate. The "delight" layer is idle character behavior: breathing/swaying when untouched (already partly present via pulsation), plus googly-eyes-style cursor tracking and an occasional blink for empty-state charm. ([Googly Eyes / idle-breathing patterns](https://www.framer.com/marketplace/components/googly-eyes/); [garagefarm idle animation](https://garagefarm.net/blog/idle-animation-tips-to-animate-your-characters))

### 7. Performance + accessibility coupling
- Drive everything off **one rAF tick** updating uniforms (the renderer already does this at `useMetaballRenderer.ts:227`); cancel/short-circuit transient tweens on new input. ([fsjs.dev rAF](https://fsjs.dev/mastering-performance-requestanimationframe-smooth-scrolling/))
- **All interaction must respect `prefers-reduced-motion`** — the substrate already freezes to one static frame under reduce (per CLAUDE.md `useWebGLCanvas` contract), so the interaction layer must NOT bypass that: under reduce, press/ripple/flee should degrade to instant or no-op, never force motion. ([MDN prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion); [web.dev](https://web.dev/articles/prefers-reduced-motion))
- Coupling stays GPU-cheap because all five effects are **additional uniforms feeding the existing SDF `smin` pipeline** — no extra passes, no render targets. The trail technique adds N `smin` calls (bounded, like the existing `MAX_SATS=4` loop).

## ADOPT / wave-seed list

Ranked, each a candidate wave. All are uniform-driven additions to the existing single-pass SDF — no architecture change.

1. **W-seed: Spring pointer core** — Replace the flat `SMOOTH_FACTOR=0.12` lerp in `useBlobPointer.ts` with a critically-tunable spring (mass/stiffness/damping; seed `stiffness:300, damping:12`). Expose **smoothed position AND velocity**. This is the foundation every other seed consumes. *Prereq for 3,4,5.*

2. **W-seed: Squish-on-press** — Add `pointerdown`/`pointerup`/`pointercancel` tracking + a `uPressAmount` (spring-released) and `uPressAxis` uniform. In `metaball.frag.ts main()`, apply volume-preserving anisotropic UV scale (`squash, 1/squash`, 25–50% range). Touch-first (works on tap).

3. **W-seed: Ripple-on-tap** — Add `uRippleOrigin` + `uRippleProgress` uniforms; on press, store origin and tween progress `[0,1,0]` over ~1.2–1.5s `power3.inOut` (drive from rAF, not a GSAP dep — keep peer-free). Shader: ring displacement `sin(-PI*k*(dist - progress))` enveloped by progress, applied to the SDF edge.

4. **W-seed: Follow-trail upgrade** — Replace the uniform domain-pull (`metaball.frag.ts:123-128`) with a tapering `smoothMin` sphere-trail along a short pointer history (length ~8–15, radii tapering). Reuse the existing satellite `smin` loop pattern. Gives the elastic "reach."

5. **W-seed: Grab-and-stretch** — Localized domain pull anchored at the grab point, magnitude ∝ drag distance, spring snap-back on release (reuses seed 1's spring). Pointer-capture for clean drag.

6. **W-seed: Flee/mood-gated repulsion** — Sign-flipped attraction gated by `useBlobMood` state (e.g. `sleepy`/`curious` flee, `excited`/`happy` follow). Makes the blob feel like it has intent — the "toy" payoff, near-zero cost.

7. **W-seed: Idle character (optional, lower priority)** — Breathing/sway when untouched (extends existing pulsation) + optional cursor-tracking "eye" highlight + occasional blink for empty-state charm.

8. **W-seed (cross-cutting): Reduced-motion + perf gate** — Every seed above must degrade under `prefers-reduced-motion` (no forced motion; instant/no-op), ride the existing single rAF tick, and cancel transient tweens on new input. Candidate `proof:blob-interaction-prm` gate mirroring the existing `proof:offscreen-pause` discipline.

## Integration notes (glass-ui fit)

- Warm-cream glass: the ripple/squish must not introduce hue shifts — keep all deformation in the **SDF domain** (geometry), leaving the existing OKLCh color pipeline (`metaball.frag.ts:157-173`) untouched, so the blob stays on-palette.
- Keep peer-free: drive ripple/spring tweens from the **existing rAF loop** (`useMetaballRenderer.ts:227`), not GSAP — glass-ui's interaction layer ships no animation peer.
- Config surface: extend `BlobConfig` (`types.ts:58`) and `BLOB_CONFIG_DEFAULTS` with the new uniforms, defaulting interactions **on but subtle** (current `pointerAttraction:0.0` ships it dead — the lane should flip this to a tasteful default).
- All new uniforms slot into the existing `U.*` table in `useMetaballRenderer.ts` — no new GL program, no second pass.

### Sources
- [Codrops — Interactive droplet metaballs, Three.js + GLSL (2025-06-09)](https://tympanus.net/codrops/2025/06/09/how-to-create-interactive-droplet-like-metaballs-with-three-js-and-glsl/)
- [Codrops — Animate WebGL shaders with GSAP: ripples, reveals (2025-10-08)](https://tympanus.net/codrops/2025/10/08/how-to-animate-webgl-shaders-with-gsap-ripples-reveals-and-dynamic-blur-effects/)
- [Josh Comeau — Squash and Stretch](https://www.joshwcomeau.com/animation/squash-and-stretch/)
- [Josh Comeau — Friendly intro to spring physics](https://www.joshwcomeau.com/animation/a-friendly-introduction-to-spring-physics/)
- [Motion — Spring follow-cursor tutorial](https://motion.dev/tutorials/js-spring-follow-cursor)
- [Geeks3D — Simple 2D ripple shader (GLSL)](https://www.geeks3d.com/20110316/shader-library-simple-2d-effects-sphere-and-ripple-in-glsl/)
- [SammiApps — Rubber-band stretching effect](https://sammifriends.medium.com/rubber-band-stretching-effect-a1697b32364)
- [Framer — Googly Eyes (cursor-tracking idle)](https://www.framer.com/marketplace/components/googly-eyes/)
- [garagefarm — Idle animation tips (breathing/sway)](https://garagefarm.net/blog/idle-animation-tips-to-animate-your-characters)
- [MDN — prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- [web.dev — prefers-reduced-motion](https://web.dev/articles/prefers-reduced-motion)
- [fsjs.dev — requestAnimationFrame performance](https://fsjs.dev/mastering-performance-requestanimationframe-smooth-scrolling/)

---

### Lane 17

I have everything needed. Here is the brief.

---

# SOTA Research Brief — GooBlob shape-morph / metamorphosis (Lane: blob-morph-transition)

Research only. No implementation. Wave-seeds at the end.

## Where the blob is today

The current GooBlob is a single SDF-circle body smin-merged with orbiting satellite circles, FBM-displaced edges, OKLCh per-pixel color perturbation, and a "mood" system that is a **scalar-parameter cross-fade** — it lerps 11 named scalars (`orbitSpeedScale`, `wobbleScale`, `pulseAmp`, `smoothK`, `hueRange`…) between mood presets:

- Mood = parameter lerp, not shape interpolation — `useBlobMood.ts:81` `lerpParams()`, `:127` `easeInOut(raw)`, `:128` `params.value = lerpParams(...)`. The blob never changes *form*; it changes wobble/color/speed of the same circle-plus-satellites topology.
- Edge organic-ness = single-pass additive FBM displacement — `metaball.frag.ts:134` `fbm(uv*uNoiseFreq + uTime*uNoiseSpeed, 3)`, added to the radius at `:137`.
- Merge = IQ quadratic smin — `sdf-body.glsl.ts:16`, called at `metaball.frag.ts:144`. This is already the best-practice CD-family smin (confirmed below), but it throws away the blend factor.
- Pointer = a single radial push of `uv` — `metaball.frag.ts:123-128`. No spring, no trail, no lag.

The gap vs SOTA: there is **no true shape morph** (form A → form B), the organic edge is a weaker idiom than nested domain-warp, the smin discards the free **material/color blend factor**, and the interaction is a hard instantaneous deformation rather than a spring-trailed one.

## Findings (SOTA)

**1. SDF shape morph = mix two distance fields by a `morphFactor`.** The canonical technique: compute `d1 = sdShapeA(p)`, `d2 = sdShapeB(p)`, then `d = mix(d1, d2, morphFactor)` — at 0 you see A, at 1 you see B, intermediate values are a true in-between form. Drive `morphFactor` with an eased clock for smooth metamorphosis. ([den4ic, DEV Community](https://dev.to/den4ic/morphing-geometric-shapes-with-sdf-in-glsl-fragment-shaders-and-visualization-in-jetpack-compose-5db8); [roombawulf/sdf-morph](https://github.com/roombawulf/sdf-morph)). Color/glow accents in the same idiom: `col *= 1.05 - exp(-6.0*abs(d))` (edge fade) and `col *= 0.8 + 0.2*cos(110.0*d)` (interior bands) ([den4ic, Medium](https://medium.com/@den4icccccc/morphing-geometric-shapes-with-sdf-in-glsl-fragment-shaders-and-visualization-in-jetpack-compose-48fd8d403e24)).

**Caveat (load-bearing):** `mix(d1, d2, t)` of two SDFs is a *pseudo*-SDF, not a Euclidean distance field — sign is preserved but magnitude is wrong. This is fine for a 2D fill mask with `fwidth`-based AA (what GooBlob already does at `metaball.frag.ts:149`), but it would break anything relying on exact distance (true outline thickness, raymarch step safety). For GooBlob's fill-and-AA pipeline it is safe. ([Ronja's 2D SDF Combination](https://www.ronja-tutorials.com/post/035-2d-sdf-combination/); [Higher-Order Algebraic SDFs, CAD Journal 2023](https://cad-journal.net/files/vol_20/CAD_20(5)_2023_1005-1028.pdf)).

**2. The smin catalog — and the free blend factor we're discarding.** IQ's smooth-min reference confirms the current quadratic polynomial is the right default (fast, near-circular, conservative, no interior ghosting). But the **2-component variant returns a blend weight in `.y`** for material/color mixing between merged shapes — exactly what you want to tint a satellite's color as it fuses into the body:

```glsl
vec2 smin(float a, float b, float k){
  float h = 1.0 - min(abs(a-b)/(4.0*k), 1.0);
  float w = h*h; float m = w*0.5; float s = w*k;
  return (a<b) ? vec2(a-s, m) : vec2(b-s, 1.0-m);
}
```

Only quadratic/cubic give this factor natively. Exponential smin is the one to reach for if you ever need **N-way associative** merging (it's associative + scales naturally), at the cost of rigidity and transcendentals. ([IQ — smooth minimum](https://iquilezles.org/articles/smin/); [IQ — distance functions](https://iquilezles.org/articles/distfunctions/), both accessed Jun 2026).

**3. Nested domain warping beats single-pass FBM for the organic edge.** Instead of *adding* one FBM sample to the radius, *warp the sample coordinate* through recursive FBM before evaluating the SDF: `fbm(p + fbm(p + fbm(p)))`. Each layer deforms space already deformed by the prior, producing a flowing "beating-edge" quality single-pass displacement cannot match — and the intermediate warp vectors (`q`, `r`) are free inputs for color modulation. ([IQ — domain warping](https://iquilezles.org/articles/warp/); [tuxalin/procedural-tileable-shaders — Domain Warping](https://deepwiki.com/tuxalin/procedural-tileable-shaders/4.2-domain-warping), accessed Jun 2026). This is a drop-in upgrade over `metaball.frag.ts:134-137` and reuses the existing `FBM_ROT`/`fbm()` chunk (`procedural-color.glsl.ts:66`).

**4. Premium metaball interaction = a pointer *trail* of shrinking spheres, not one push.** Codrops' June 2025 droplet-metaballs keeps an array of ~15 historical pointer positions and places spheres along it with decreasing radius (`radius - baseRadius*fi`), producing an elastic, stretchy follow. Their merge uses the **exponential** smin `-log(exp(-k*d1)+exp(-k*d2))/k` with `k=7.0`. They also use 3D value noise on the reflection vector for surface life. ([Codrops — Interactive Droplet-like Metaballs with Three.js and GLSL, 2025-06-09](https://tympanus.net/codrops/2025/06/09/how-to-create-interactive-droplet-like-metaballs-with-three-js-and-glsl/)). GooBlob's satellites are already a sphere pool — a trail is the same primitive driven by pointer history instead of orbit math.

**5. Make the follow feel alive with frame-rate-independent spring smoothing.** A hard `uPointer` write reads as mechanical. Critically-damped or light-underdamped spring smoothing of the pointer target (and of `morphFactor`) gives organic lag/overshoot. Use an exponential damper that is stable at large timesteps so behavior is identical across frame rates — glass-ui already ships a spring runtime (`@mkbabb/keyframes.js`), so this is reuse, not a new dep. ([Orange Duck — Spring-It-On](https://theorangeduck.com/page/spring-roll-call); [Ryan Juckett — Damped Springs](https://www.ryanjuckett.com/damped-springs/)).

**6. Mood should be SHAPE language, not just parameter tint.** Animation theory maps emotion to silhouette: rounded = friendly/calm, angular/spiky = alert/excited, squashed-wide = sleepy/heavy, stretched-tall = eager. Squash-and-stretch is the primary emotional-delivery deformation. This is the key reframe for the mood system — pair each mood with a **target silhouette** (an aspect-ratio / spikiness / corner-rounding tuple the SDF reads) so a mood change is a real metamorphosis, not a wobble-speed change. ([IxDF — UI Animation & Disney's 12 Principles](https://ixdf.org/literature/article/ui-animation-how-to-apply-disney-s-12-principles-of-animation-to-ui-design); [Animotions — Squash & Stretch 2025](https://animotionsstudio.com/squash-and-stretch/); [Pixune — Squash and Stretch](https://pixune.com/blog/squash-and-stretch/)).

## ADOPT / wave-seed list

Ordered by impact-to-effort. All reuse the existing single-pass WebGL2 substrate, the `fbm()`/`FBM_ROT` chunk, and the OKLCh color path — no new deps.

- **WS-1 — Silhouette-morph mood (headline).** Reframe `useBlobMood` so each mood owns a *target silhouette* (aspect ratio + spikiness + corner-rounding), not just the 11 scalars. Add `uMorph`/silhouette uniforms; in the shader compute the body as `mix(dRound, dShaped, morphFactor)` per WS finding #1. Drive `morphFactor` and silhouette params with the existing eased clock (`useBlobMood.ts:127`). This turns mood from a wobble-tint into true metamorphosis. Shape-language mapping per finding #6. *Risk: pseudo-SDF magnitude — safe for the fill+`fwidth` AA pipeline; gate that the AA edge stays ~1px across the morph.*

- **WS-2 — Nested domain-warp edge.** Replace the single additive FBM at `metaball.frag.ts:134-137` with a 2–3 level `fbm(uv + fbm(uv + fbm(uv)))` coordinate warp before `sdCircle`. Reuses `procedural-color.glsl.ts:66` `FBM_ROT`. Biggest visual-quality win per pixel of effort (finding #3). Feed the intermediate warp vector into the existing OKLCh hue perturbation for coherent color motion.

- **WS-3 — smin blend-factor → satellite color fusion.** Swap `sdf-body.glsl.ts:16` for the 2-component `vec2 smin` (finding #2) and use `.y` to blend a satellite's color into the body color as it merges, instead of only fading opacity (`useBlobSatellites.ts:287`). Makes the merge read as fusion, not crossfade. Keeps the quadratic family (no ghosting).

- **WS-4 — Spring-smoothed pointer + morph clock.** Route `uPointer` (and `morphFactor`) through a critically-damped spring (keyframes.js) for organic lag/overshoot, frame-rate-independent (finding #5). Replaces the instantaneous push at `metaball.frag.ts:123-128`.

- **WS-5 — Optional pointer trail (interactive idiom).** Repurpose the satellite sphere pool as a Codrops-style shrinking-radius pointer trail when the pointer is active, snapping back to orbit on release (finding #4). Additive to WS-4; gate behind an `interactive` prop. Respects the existing `useWebGLCanvas` PRM-freeze + offscreen-pause — trail only animates when active and visible.

- **Keep / don't adopt.** Quadratic smin stays the merge default (SOTA-confirmed over exponential for a small fixed satellite count — exponential only earns its cost for N-way associative merging, which GooBlob doesn't need). The fill+`fwidth` AA pipeline stays (the pseudo-SDF caveat is harmless there). Single-pass WebGL2 (no raymarch) stays — Codrops raymarches in 3D; GooBlob is a 2D field and should remain so for the warm-cream-glass integration and the bundle budget.

### Integration / non-functional notes for the waves
- Warm-cream glass: keep all new color motion inside the existing OKLCh perceptual path (`metaball.frag.ts:159-173`) so morphs never break gamut or the MANDATORY OETF; do not add a parallel sRGB path.
- Performance: every seed above is per-fragment ALU on the same single draw — no extra passes, no new uniforms beyond a handful of scalars/vec2s. Must inherit the substrate's PRM-freeze + offscreen/`document.hidden` park (CLAUDE.md "WebGL substrate offscreen-pause"). Add a `proof:`-style gate that the morph holds ~1px AA edge and that a static PRM frame still paints one frame then parks.
- Test fixtures: a silhouette-morph and a 2-component-smin change both touch `metaball.frag.ts` / `sdf-body.glsl.ts` — update the line-for-line TS port `tests/components/custom/goo-blob/metaball-color.glsl-port.ts` and `blob-color-equivalence.test.ts` in the same wave.

Relevant files:
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/goo-blob/composables/useBlobMood.ts` (mood = scalar lerp; WS-1 target)
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/goo-blob/shaders/metaball.frag.ts` (edge FBM :134, pointer push :123, smin call :144, OKLCh :159; WS-2/3/4)
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/goo-blob/shaders/sdf-body.glsl.ts` (quadratic smin :16; WS-3)
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/goo-blob/composables/useBlobSatellites.ts` (sphere pool / merge opacity :287; WS-3/5)
- `/Users/mkbabb/Programming/glass-ui/src/composables/glass/webgl/shaders/procedural-color.glsl.ts` (shared `FBM_ROT` :66, OETF/OKLCh matrices; WS-2 reuse)

---

### Lane 18

I have everything I need. Here is the brief.

---

# SOTA brief — goo-blob mood/state-driven expressive character

Lane: **mood-state-blob**. Research + wave seeds, no implementation.

## What the current system is (the baseline)

`useBlobMood` (`src/components/custom/goo-blob/composables/useBlobMood.ts`) is already a credible SOTA skeleton: 5 named moods (`idle/happy/curious/sleepy/excited`), each a flat `MoodParams` record of 11 axes (orbit speed, wobble, pulse freq/amp, surface-noise amp, OKLCh hue/sat/brightness shift, smin `smoothK`, pointer attraction, merge rate). `setMood` cross-fades old→new params with a per-mood duration (`TRANSITION_MS`, 600-2500ms) via a single quadratic `easeInOut` (`useBlobMood.ts:127`). The renderer reads the eased `params` per frame. Color is perceptually-uniform OKLCh perturbation in-shader (`metaball.frag.ts:157-170`), pointer is a single-vector attraction (`useBlobPointer.ts`), satellites are a deterministic seeded orbit/merge/absorb/emerge pool (`useBlobSatellites.ts`).

This is genuinely close to how voice-orb tools work. The gaps versus SOTA are: (1) the mood→motion map is **tuned-by-hand, not principled** (no valence/arousal axis, so adding a mood means inventing 11 numbers); (2) **linear lerp transitions** (no spring/overshoot — the SOTA "tangible weight" feel); (3) **single pointer-vector deformation** (the SOTA is a trail-of-spheres elastic stretch); (4) **no layered idle "breathing" / secondary motion** (the thing that reads as *alive* vs *animated*); (5) flat surface — **no fresnel rim / inner translucency** that the premium orbs all carry.

## Findings (cited)

**1. The 4-state voice-orb pattern is the canonical analogue — and it maps state to color + motion + displacement + glow simultaneously.** aguscruiz/voiceorb runs Idle/Listening/Thinking/Speaking with per-state color (purple/green/amber/pink), per-state noise displacement amount, animation+rotation speed, **and fresnel-glow intensity**, blended by "smooth interpolation," with audio level driving displacement and color intensity live. ([github.com/aguscruiz/voiceorb](https://github.com/aguscruiz/voiceorb), accessed 2026-06-06.) ElevenLabs Orb (Three.js/R3F) and SmoothUI Siri Orb run the same idle/listening/thinking/talking state model with input-volume → displacement reactivity. ([smoothui.dev/docs/components/siri-orb](https://smoothui.dev/docs/components/siri-orb), accessed 2026-06-06.) **Takeaway: glass-ui's 11-axis `MoodParams` is richer than these but is missing fresnel-glow intensity as an axis, and is missing any live input signal (volume/data) driving displacement.**

**2. SOTA pointer interaction is a trail of decaying-radius spheres, not a single attraction vector.** The Codrops droplet-metaballs technique stores a pointer-position history array and places spheres along it with radii tapering as `radius - baseRadius * fi`, smin-merged at `k=7.0`, producing elastic stretch/surface-tension that follows the cursor and snaps back — no explicit spring, the trail interpolation + smin *is* the easing. They also pop highlights with `pow(color, vec3(7.0))` for a glass/translucent read. ([tympanus.net/codrops, 2025-06-09](https://tympanus.net/codrops/2025/06/09/how-to-create-interactive-droplet-like-metaballs-with-three-js-and-glsl/), accessed 2026-06-06.) **glass-ui's `useBlobPointer` is a single smoothed `[-1,1]` vector → one `uPointer` uniform; a 4-6 entry trail of transient satellites would give the cursor-follow "goo reaching toward you" read for free on the existing satellite/smin machinery.**

**3. "Alive" is layered desynchronized sine + noise (breathing + secondary motion), not one pulse.** Procedural idle = a primary breathing sine (15-20 cycles/min ≈ 0.25-0.33 Hz, 1-2cm amplitude) plus secondary layers: a 4-8s weight-shift drift and a few-mm head bob phase-offset from the breath — the desync is what avoids the mechanical loop. ([palospublishing.com, breathing/idle](https://palospublishing.com/simulating-breathing-and-idle-motion-procedurally/); [animationmentor.com breathing loops](https://www.animationmentor.com/blog/tutorial-animate-natural-breathing-loops/); both accessed 2026-06-06.) **glass-ui idle has ONE `pulseFreq: 0.3` sine (`useBlobMood.ts:9`) — exactly the breathing band, but single-layer. Adding a second desynced low-freq drift sine (offset orbit-center) would read as secondary motion.**

**4. Emotion→motion is a principled 2-axis map (valence/arousal) + squash-stretch, not 11 free numbers.** Excited/joyful = light, more *stretch*, faster timing; heavy/grumpy/tired = more *squash*, slower, fewer fidgets — arousal drives speed+amplitude, valence drives stretch-vs-squash and warmth. ([cg-wire squash & stretch 2026](https://blog.cg-wire.com/squash-stretch-principle/); [binus.ac.id emotion through movement, 2025-11-03](https://binus.ac.id/bandung/dkv/2025/11/03/building-emotion-through-movement-how-animators-make-you-feel/), accessed 2026-06-06.) **glass-ui has no global anisotropic squash/stretch — the body is a radius-perturbed circle (`metaball.frag.ts:131`). A single `(scaleX, scaleY)` mood axis driven by valence/arousal would be the highest-leverage expressive add, and would let `MOOD_TARGETS` be *derived* from a 2-axis model instead of hand-authored.**

**5. SOTA transitions are spring physics (overshoot + settle), not eased lerp.** Spring "weight and momentum" is now standard for premium UI; `stiffness 400 / damping 30` default, bounce kept under ~0.1 for restraint, higher for playful. ([blog.maximeheckel.com spring physics](https://blog.maximeheckel.com/posts/the-physics-behind-spring-animations/); [hookedonui Motion 12 vs React Spring, 2025](https://hookedonui.com/animating-react-uis-in-2025-framer-motion-12-vs-react-spring-10/), accessed 2026-06-06.) **glass-ui's `setMood` is a linear quadratic-eased lerp (`useBlobMood.ts:123-130`); a spring per axis (a moody mood "lands" with a tiny overshoot) reads as physical. The repo already ships a spring runtime — `@mkbabb/keyframes.js` / `useSpringOrchestrator` — so this is a fold, not a new dep.**

**6. Premium orbs are a layered composite: gradient core + organic blobs + core glow + particles + fresnel rim + shadow.** metasidd/Orb's taxonomy is gradient bg, wavy procedural blobs, `coreGlowIntensity` 0.7-1.5, particle shimmer, shadow anchor, speed 30-90. ([github.com/metasidd/Orb](https://github.com/metasidd/Orb), accessed 2026-06-06.) Fresnel rim = bright translucent edge from view-angle; subsurface/translucency = inner glow where light passes through — the jelly read. ([gameidea.org fresnel GLSL](https://gameidea.org/short-posts/fresnel-effect-glsl/); [godotshaders fresnel](https://godotshaders.com/snippet/fresnel/), accessed 2026-06-06.) **glass-ui has the inner-edge lightness lift (`metaball.frag.ts:166-168`) and a CSS drop-shadow (`GooBlob.vue:127`) but NO fresnel rim and NO particle/shimmer layer. A view-independent 2D fresnel analogue (rim = `smoothstep` on the SDF gradient `fwidth(d)`, tinted toward white/warm-cream) is cheap and would give the premium translucent edge.**

**7. Color: stay OKLCh, add a state-color *target* (hue/warmth shift toward a mood color), not just perturbation.** All the orbs change *base hue* per state (green/amber/pink); glass-ui only swings hue ±range around the consumer's fixed `color`. Tinting the base OKLCh hue toward a mood-specific target (warm-cream-compatible: idle = the consumer color, happy = warmer/brighter, sleepy = desaturated/cooler) is the SOTA state-color read and composes cleanly with the existing in-shader OKLCh path (`metaball.frag.ts:159-164`). Generative-blob practice also ties dark/light tints to one base hue for cohesion ([dev.to georgedoescode SVG blob characters](https://dev.to/georgedoescode/tutorial-generative-blob-characters-using-svg-1igg), accessed 2026-06-06) — glass-ui's warm-cream glass is the cohesion anchor here.

## ADOPT / wave-seed list

Ordered by expressive-leverage ÷ cost. Each is a fold onto existing machinery; none is a new dependency.

- **W-α · Valence/Arousal mood model (HIGH leverage).** Replace the hand-authored `MOOD_TARGETS` with a 2-axis `{valence, arousal}` → `MoodParams` *derivation*: arousal drives orbitSpeed/pulseFreq/noiseAmp/wobble, valence drives warmth (hue target), brightness, and the new squash/stretch sign. Keep the 5 named moods as named `(valence,arousal)` points so the public API (`setMood`) is unchanged; adding a mood becomes 2 numbers. Source: findings 4. Touches `useBlobMood.ts`, `types.ts`.

- **W-β · Global squash/stretch axis (HIGH leverage, visible).** Add `scaleX/scaleY` (anisotropic) to `MoodParams` + a `uBodyScale vec2` uniform; excited stretches, sleepy/sad squashes. Renders on the existing SDF body (`metaball.frag.ts:131-137`). This is the single most "expressive-character" add. Source: findings 4.

- **W-γ · Spring transitions (MED, premium feel).** Swap the linear `lerpParams`/`easeInOut` cross-fade (`useBlobMood.ts:123-130`) for a per-axis critically-damped spring (stiffness≈400, damping≈30, small overshoot on high-arousal moods). Reuse `useSpringOrchestrator` / `@mkbabb/keyframes.js` (already a peer dep). Source: findings 5.

- **W-δ · Pointer trail → elastic reach (MED, interaction).** Extend `useBlobPointer` to emit a short decaying-radius position trail; feed it as transient extra metaball sources (the satellite/smin path already supports up to `MAX_SATS=4`) so the goo *reaches* toward the cursor and snaps back, gated by mood `pointerAttraction`. Source: findings 2. Touches `useBlobPointer.ts`, `useMetaballRenderer.ts`, frag uniform packing.

- **W-ε · Layered idle breathing + secondary motion (MED, "alive").** Add a second desynchronized low-freq drift (offset the body center on a ~4-8s sine, phase-offset from the ~0.3Hz pulse) so idle stops reading as one mechanical pulse. Pure CPU, feeds existing `uv` offset / pulse uniforms. Source: findings 3.

- **W-ζ · Fresnel rim + translucency (MED, premium look).** Add a 2D fresnel-analogue rim in the frag (rim factor from the SDF edge band via `fwidth(d)`, tinted toward warm-cream/white, intensity as a new mood axis like voiceorb's fresnel-glow). Composes with the existing inner-glow (`metaball.frag.ts:166`). Source: findings 1, 6. Frag-only.

- **W-η · Mood base-color targeting (MED, state legibility).** Add a per-mood OKLCh hue/warmth *target* (not just perturbation range) so a mood shift is legible as a color shift, anchored to the consumer's `color` as idle. In-shader OKLCh path already present. Source: findings 6, 7.

- **W-θ · Optional live signal input (LOW/optional, dynamic).** Expose an optional `intensity`/`level` ref (0-1) that scales displacement+glow live — the voice-orb "audio reactivity" generalized to any data signal (scroll, load, activity). Makes the blob *interactive/dynamic* per the goal's optional clause. Source: findings 1.

### Notes / constraints to respect at wave-planning

- The blob is a **pausable AV background** (`DockBackgroundToggle`, WCAG 2.2.2) on the `useWebGLCanvas` substrate that owns offscreen-park + `prefers-reduced-motion` freeze. Any new motion axis (W-β/δ/ε) must collapse to the single static frame under PRM — keep all new motion driven by the substrate's rAF, never a parallel loop.
- Warm-cream-glass integration: color targets (W-η) and fresnel tint (W-ζ) should reference the warm-cream/`--foreground` family, not arbitrary hues, to stay seamless.
- Keep determinism: seeded PRNG (`utils/prng`) already governs satellites; any trail/drift randomness should seed from the same source so the character stays reproducible.
- All new color work stays in the existing OKLCh shader path (the `proof:blob-space-gamma` / `proof:blob-color-equivalence` gates forbid an HSV/gamma regression).

**Sources:** [voiceorb](https://github.com/aguscruiz/voiceorb) · [Siri Orb / SmoothUI](https://smoothui.dev/docs/components/siri-orb) · [Codrops droplet metaballs 2025-06-09](https://tympanus.net/codrops/2025/06/09/how-to-create-interactive-droplet-like-metaballs-with-three-js-and-glsl/) · [palospublishing procedural breathing](https://palospublishing.com/simulating-breathing-and-idle-motion-procedurally/) · [Animation Mentor breathing loops](https://www.animationmentor.com/blog/tutorial-animate-natural-breathing-loops/) · [CG-Wire squash & stretch](https://blog.cg-wire.com/squash-stretch-principle/) · [binus.ac.id emotion through movement 2025-11-03](https://binus.ac.id/bandung/dkv/2025/11/03/building-emotion-through-movement-how-animators-make-you-feel/) · [Maxime Heckel spring physics](https://blog.maximeheckel.com/posts/the-physics-behind-spring-animations/) · [metasidd/Orb](https://github.com/metasidd/Orb) · [gameidea fresnel GLSL](https://gameidea.org/short-posts/fresnel-effect-glsl/) · [georgedoescode SVG blob characters](https://dev.to/georgedoescode/tutorial-generative-blob-characters-using-svg-1igg). All accessed 2026-06-06.

---

### Lane 19

I have everything I need. Compiling the brief.

---

# SOTA brief — GooBlob (organic metaball) performance + premium craft

Lane **performance-blob**. Research + wave-seeds only — no implementation.

## Baseline (what GooBlob ships today)

Read from source — the implementation is already past several SOTA traps:

- **Single fullscreen-quad fragment shader, one pass, no FBO chain.** `useMetaballRenderer.ts:178-185` draws one 6-vert quad; the whole effect (body + ≤4 satellites + watercolor edge + OKLCh perturbation) is one "supershader" — already the mobile-correct shape (no off-screen buffer chain). `metaball.frag.ts:140-145`.
- **DPR is capped.** `useMetaballRenderer.ts:205-206` → `resolveBudgetDpr()` clamps to `AV_DPR_MAX` (≤2). Correct direction; see Finding 3 for the next step.
- **Quadratic IQ smin already chosen.** `sdf-body.glsl.ts:16-19` uses `h*h*k*0.25` — exactly IQ's recommended cheapest variant.
- **rAF parks aggressively.** Offscreen (`useIntersectionPause`, `rootMargin:200px`), content-visibility, tab-hidden, reduced-motion all park the loop (`useMetaballRenderer.ts:100-143`). This is the single biggest real-world battery/perf win and it's already done.
- **`fwidth`-based AA edge** (`metaball.frag.ts:149-150`) — resolution-independent ~1px edge, correct.
- **Satellite cap = 4** (`useMetaballRenderer.ts:16`), default 3 (`types.ts:104`).

So the perf headroom is NOT in "make it 60fps" — it's already there. The headroom is in **fill-rate at high DPR on weak mobile GPUs** (the one quadratic cost), and the craft headroom is in **visual richness + interaction** without adding fill-rate.

## Findings (cited)

**1. The blob's only real cost is fill-rate, and fill-rate is quadratic in DPR.** Retina (DPR 2) is literally 4× the fragment work; "WebGL demos which render at Retina resolution often have poor performance unless the fragment shader is extremely simple." The GooBlob frag is NOT extremely simple — it runs FBM (3 octaves) twice per pixel (`metaball.frag.ts:134,161`) plus a full OKLCh round-trip (sRGB→linear→OKLab→OKLCh→back + gamut clamp, `metaball.frag.ts:159-173`). That's the per-pixel ALU bill, paid for every pixel of a 1.6×-oversized canvas. MDN's canonical lever: "render into a smaller back buffer and upscale… reduce canvas.width/height, keep canvas.style.width/height constant." [MDN WebGL best practices](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices) · [Khronos public_webgl](https://www.khronos.org/webgl/public-mailing-list/public_webgl/1707/msg00029.php)

**2. The canvas is 1.6× oversized — 2.56× the fragments — and most of it is transparent.** `useMetaballRenderer.ts:21-28`: canvas is CSS-sized 1.6× the layout wrapper so satellite orbits have overflow room. That 60% margin is mostly `alpha < 0.001` pixels that early-`return` (`metaball.frag.ts:152-155`) — but the early-return fires AFTER the two FBM calls and the pointer math, and the GPU still rasterizes/schedules those fragments. The transparent border is pure fill-rate waste at full FBM cost. Patent/tile-rendering literature confirms the win of skipping primitives/regions that don't contribute. [USPTO 8970584 bounding-box sample-test](https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/8970584) · [reindernijhoff WebGPU SDF editor, Jan 2026](https://reindernijhoff.net/2026/01/webgpu-sdf-editor-real-time-signed-distance-field-modeling/)

**3. Half-res render + bilinear upsample is the standard fill-rate cut for soft/blobby content — and blobs are the ideal candidate** because the edge is already soft (no sharp text/lines to alias). "Render as low as you can without sacrificing visual quality, then upscale"; bilinear gives a free 4-pixel average. A blob at 0.5× internal scale upsampled to full is visually near-identical because the FBM watercolor edge hides the interpolation. [Unity half-res render](https://discussions.unity.com/t/render-at-half-resolution-upsample-to-full-resolution/526483) · [catlikecoding bloom](https://catlikecoding.com/unity/tutorials/advanced-rendering/bloom/) · [arm bandwidth-efficient graphics](https://community.arm.com/cfs-file/__key/communityserver-blogs-components-weblogfiles/00-00-00-20-66/siggraph2015_2D00_mmg_2D00_marius_2D00_notes.pdf)

**4. The IQ quadratic smin is correct and there is no cheaper better option — but the generalized N-way smin is the upgrade for richer merges.** IQ: quadratic smin is "fast, close enough to circular, never overestimates." The current code calls `smin` in a sequential pairwise loop (`metaball.frag.ts:140-145`), which is order-dependent and can produce asymmetric seams as satellites cross. IQ's exponential/sigmoid family is *associative* (blends in any order, symmetric) but "distorts input SDFs everywhere in space" — wrong for this. The pragmatic SOTA: keep quadratic smin, but the circular smin variant gives a perfectly round blend at near-equal cost ("GPUs perform square roots almost in the same cycles as multiplications") if the merge seam ever looks too "pinched." [IQ smin](https://iquilezles.org/articles/smin/)

**5. Mobile rule #1 is "no fullscreen blur, no multi-pass post chain."** GooBlob already obeys this — it fakes the gooey glow *inside* the SDF via smin rather than the SVG/CSS `blur()+contrast()` gooey trick. That's the right call: the CSS `filter: blur() contrast()` gooey path is Chrome/Edge-only (the `feColorMatrix` alpha trick "is not supported in Safari or Firefox") and blur is "too GPU heavy for mobile." Do NOT regress toward an SVG-filter gooey for any new effect. [Airtight 60fps mobile WebGL](https://www.airtightinteractive.com/2015/01/building-a-60fps-webgl-game-on-mobile/) · [CSS-Tricks gooey](https://css-tricks.com/gooey-effect/) · [jh3y CSS gooey trick](https://x.com/jh3yy/status/1754546575248953457)

**6. Uniform-array transport for ≤4 satellites is correct; do not over-engineer.** Jamie Wong's metaball survey: uniform arrays are the right transport when "not transferring massive amounts of data" — only reach for data-textures or codegen at hundreds of primitives. GooBlob's 4-satellite uniform array (`useMetaballRenderer.ts:189-199`) is the KISS-correct choice; no change warranted. [Jamie Wong metaballs+WebGL](https://jamie-wong.com/2016/07/06/metaballs-and-webgl/)

**7. Craft/interaction direction: 2026 trend is "breathing, organic, premium-yet-approachable" — squash-and-stretch + idle micro-motion.** The blob already has pulse + FBM drift + pointer attraction. The premium gap is *weight*: squash-and-stretch on pointer/merge events ("gives objects weight and flexibility… apply subtly to make components feel responsive"). The warm-cream glass identity wants the blob to feel like it has surface tension, not just a wobbling circle. [Bricx micro-interactions 2025/26](https://bricxlabs.com/blogs/micro-interactions-2025-examples) · [Design Deluxe organic shapes 2026](https://designdeluxe.in/web-design-trends-2026-with-organic-shapes/) · [Awwwards UI animation collection](https://www.awwwards.com/awwwards/collections/animation/)

## ADOPT / wave-seed list

Ordered by value-to-effort. Each is a seed for a tranche wave, not an instruction to implement now.

- **W-seed A — Half-resolution internal render + bilinear upsample (HEADLINE perf).** Render the metaball pass into a half-size drawing buffer, upsample to display with the GPU's free bilinear filter. Blobs are the ideal half-res candidate (soft edge hides interpolation). Expect ~4× fragment-cost reduction on the heavy FBM+OKLCh path with near-zero visual delta. Gate it behind a `quality` axis (`full | half`) so a hero blob can opt into full-res. Tension to resolve: this re-introduces a second pass (the upsample blit) — keep it ONE extra blit, not a Kawase chain, to honor the "no multi-pass on mobile" rule. *(Findings 1, 3, 5.)*

- **W-seed B — Tighten the oversize margin / clip the dead transparent border.** The 1.6× canvas (2.56× fragments) is mostly transparent FBM-cost waste (Finding 2). Two cheap options: (1) reduce POS_SCALE oversize from 1.6× to the empirically-minimal orbit envelope (measure max satellite excursion); (2) add a cheap pre-FBM bounding early-out — a coarse `length(uv) > maxReach` discard BEFORE the two `fbm()` calls (`metaball.frag.ts:134` runs FBM unconditionally even for pixels that will discard). A single conservative bounding-circle test gating the FBM is the per-pixel analogue of tile primitive-skipping. *(Findings 1, 2.)*

- **W-seed C — DPR/quality budget tiers tied to a GPU heuristic.** Already cap at 2 (`AV_DPR_MAX`); add a tier that drops weak mobile GPUs to DPR 1 + half-res (W-seed A). Retina is 4× the work and "low resolution generally looks acceptable" for soft WebGL content. Pair with the existing `prefers-reduced-motion` freeze. *(Findings 1, 3.)*

- **W-seed D — Squash-and-stretch on pointer + merge events (HEADLINE craft).** Add a volume-conserving anisotropic scale on the body SDF driven by pointer velocity and satellite-merge impulse — the blob bulges toward an approaching pointer and recoils on absorb. This is pure vertex-side / uniform math, near-zero fill-rate cost, and is the single biggest "premium, alive, has-weight" upgrade. The mood system (`useBlobMood`) is the natural home for the squash params. *(Finding 7.)*

- **W-seed E — Generalized/circular smin audit (craft, low risk).** Keep quadratic as default; spike the circular smin variant and an order-independent N-way accumulation to fix any asymmetric seam when two satellites merge simultaneously (current pairwise loop is order-dependent, `metaball.frag.ts:140-145`). Ship only if the seam visibly improves — quadratic is already IQ-recommended, so this is a refinement not a fix. *(Finding 4.)*

- **W-seed F — Optional viscous pointer trail / surface-tension ripple (dynamic-interactive, GATE it).** A low-amplitude traveling deformation along the surface where the pointer last touched (decaying over ~600ms). High delight, but it's added per-pixel cost on the hot path — gate behind the `quality` axis and `prefers-reduced-motion`. Lower priority than A/B/D. *(Finding 7.)*

- **DO-NOT seed (explicit non-goals):** no SVG/CSS `blur()+contrast()` gooey (Safari/Firefox-broken, blur too heavy — Finding 5); no Kawase/Gaussian glow chain (multi-pass mobile penalty — Finding 5); no data-texture/codegen satellite transport (uniform array is correct at N≤4 — Finding 6); no DPR>2 (quadratic waste — Finding 1).

## Source map (file:line — current code)

- `src/components/custom/goo-blob/composables/useMetaballRenderer.ts:16,21-28,100-143,205-206` — satellite cap, 1.6× oversize rationale, rAF park seams, DPR clamp.
- `src/components/custom/goo-blob/shaders/metaball.frag.ts:134,140-145,149-150,152-173` — FBM ×2, pairwise smin loop, fwidth AA, early-return + OKLCh round-trip.
- `src/components/custom/goo-blob/shaders/sdf-body.glsl.ts:16-19` — quadratic IQ smin (already SOTA).
- `src/components/custom/goo-blob/composables/useBlobSatellites.ts` — 4-phase orbit/merge/absorb/emerge state machine (the home for squash-impulse, W-seed D).
- `src/components/custom/goo-blob/types.ts:100-133` — `BLOB_CONFIG_DEFAULTS` (where a `quality` axis would land).

## Citations (URL · accessed 2026-06-06)

- MDN WebGL best practices — https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices
- Khronos public_webgl (Retina = 4× fragment work) — https://www.khronos.org/webgl/public-mailing-list/public_webgl/1707/msg00029.php
- Inigo Quilez, smooth minimum — https://iquilezles.org/articles/smin/
- Jamie Wong, Metaballs and WebGL — https://jamie-wong.com/2016/07/06/metaballs-and-webgl/
- frost.kiwi, Dual Kawase blur — https://blog.frost.kiwi/dual-kawase/
- Unity, render half-res then upsample — https://discussions.unity.com/t/render-at-half-resolution-upsample-to-full-resolution/526483
- catlikecoding bloom (bilinear half-res averaging) — https://catlikecoding.com/unity/tutorials/advanced-rendering/bloom/
- Arm, bandwidth-efficient graphics (SIGGRAPH 2015) — https://community.arm.com/cfs-file/__key/communityserver-blogs-components-weblogfiles/00-00-00-20-66/siggraph2015_2D00_mmg_2D00_marius_2D00_notes.pdf
- Airtight Interactive, 60fps WebGL on mobile (no blur, supershader) — https://www.airtightinteractive.com/2015/01/building-a-60fps-webgl-game-on-mobile/
- CSS-Tricks, the gooey effect (Safari/Firefox feColorMatrix gap) — https://css-tricks.com/gooey-effect/
- reindernijhoff, WebGPU SDF editor + spatial accel (Jan 2026) — https://reindernijhoff.net/2026/01/webgpu-sdf-editor-real-time-signed-distance-field-modeling/
- USPTO 8970584, bounding-box sample-test efficiency — https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/8970584
- Bricx, micro-interactions 2025/26 — https://bricxlabs.com/blogs/micro-interactions-2025-examples
- Design Deluxe, organic shapes + micro-animation 2026 — https://designdeluxe.in/web-design-trends-2026-with-organic-shapes/
- Awwwards UI animation collection — https://www.awwwards.com/awwwards/collections/animation/

---

### Lane 20

I now have everything I need: current code grounded, SOTA sources fetched. Let me confirm one detail — the antialias context attr is `antialias: false` (line 150 in the renderer), which matters for the brief. I have all the pieces. Writing the brief.

The current AA one-liner `smoothstep(-aa, aa, d)` with `aa = fwidth(d)` uses a full-`fwidth` half-width — that's a ~2px transition (smoothstep spans `-aa` to `+aa` = `2*fwidth`), which is on the soft side of SOTA. The canonical crisp form is `clamp(0.5 - d/fwidth(d), 0, 1)` (1px) or `smoothstep(-aa, aa, d)` with `aa = 0.5*fwidth(d)`. That's a concrete finding.

---

# SOTA brief — GooBlob metaball, lane "antialiasing-sdf"

**Scope:** research only. Findings + citations, then an ADOPT / wave-seed list. The current shader already uses the SOTA *primitive* (fwidth-derived AA) and the SOTA *smin* (IQ quadratic) — so the gains here are in **calibration, free analytic gradient, and the premium/glass surface treatment** rather than a rewrite.

## What's already SOTA in the current code

- **fwidth-based AA** — `metaball.frag.ts:147-150`: `float aa = max(fwidth(d), 1e-6); float alpha = 1.0 - smoothstep(-aa, aa, d);`. This is the canonical analytic-AA approach. ([numb3r23](http://www.numb3r23.net/2015/08/17/using-fwidth-for-distance-based-anti-aliasing/), 2015; still standard per [shadergif](https://shadergif.com/guides/anti-aliasing-basics/), confirmed current Jul 2025)
- **IQ quadratic smin** — `sdf-body.glsl.ts:16-19`: `h*h*k*0.25`. Quilez's own current pick: *"I use the Quadratic polynomial smooth-min because it's fast, close enough to circular, never overestimates."* ([iquilezles.org/articles/smin](https://iquilezles.org/articles/smin/))
- **OETF-correct OKLCh perturbation + hue-preserving gamut clamp** — `metaball.frag.ts:157-173`, `oklch-perturb.glsl.ts`. Linear-space color work with a mandatory OETF on output is exactly right; dithering (below) is the only color-pipeline gap.
- **Rotated-octave FBM** breaking axis-aligned banding — `watercolor-edges.glsl.ts:31-48`.

## Findings (gaps vs SOTA), with file:line

**1. AA half-width is mis-calibrated — edge is ~2px soft, not 1px crisp.**
`smoothstep(-aa, +aa, d)` with `aa = fwidth(d)` spans a `2·fwidth` (≈2px) transition. The brief's mandate is "crisp-yet-smooth." The canonical 1px forms:
- `float h = clamp(0.5 - d/fwidth(d), 0.0, 1.0);` (the divide; cheaper than smoothstep, linear ramp) — recommended one-liner per [Perfecting AA on SDFs](https://blog.pkh.me/p/44-perfecting-anti-aliasing-on-signed-distance-functions.html) (`clamp(0.5 + d/fwidth(d),0,1)`; sign flips for our inside-positive coverage).
- or keep smoothstep but halve: `aa = 0.5*fwidth(d)`.
A small `aa` floor (`max(fwidth(d), 0.8px-in-uv)`) avoids over-sharp shimmer at extreme zoom (the "clamp to minimum width" step in [shadergif](https://shadergif.com/guides/anti-aliasing-basics/)). `length(vec2(dFdx(d),dFdy(d)))` is the more-accurate-but-pricier alternative; fwidth (the `|dFdx|+|dFdy|` L1 approx) is fine here. (pkh.me)

**2. Analytic distance+gradient is computed for free and thrown away — unlocks the whole premium surface for ~zero cost.**
Today only scalar `d` survives. A proper 2D SDF "has a gradient of length 1.0 everywhere," and the circle's gradient is just `p/length(p)` — already in hand. ([iquilezles.org/articles/distgradfunctions2d](https://iquilezles.org/articles/distgradfunctions2d/)). Returning `vec3(d, grad.xy)` from `sdCircle`/the merged field gives a **surface normal** that drives, with no extra passes:
- **fake fresnel/rim light** at the silhouette (depth, "this is a 3D droplet"),
- **directional inner shading / bevel** (top-lit highlight, bottom shadow → reads as a glossy bead),
- **consistent-width AA** without relying on screen derivatives.
This is the single highest-leverage move for "premium glass droplet." The Codrops 2025 droplet tutorial achieves its look via reflect-vector noise + `pow(color, 7.0)` highlight crush — a 3D-raymarch route ([Codrops, 2025-06-09](https://tympanus.net/codrops/2025/06/09/how-to-create-interactive-droplet-like-metaballs-with-three-js-and-glsl/)); for our 2D field the analytic-gradient fake-fresnel is the cheaper, equally premium equivalent.

**3. No dithering on the cream gradient — banding risk on warm low-contrast fills.**
The blob's inner-glow lightness ramp (`metaball.frag.ts:167-168`) and OKLCh chroma sweep are exactly the low-contrast gradients where 8-bit banding shows, and warm-cream glass is the worst case. SOTA fix is a sub-LSB dither applied right before output: `rgb += (hash(gl_FragCoord.xy)-0.5)/255.0;` (ordered/Bayer or blue-noise; cheap value-noise hash is enough at this scale). ([frost.kiwi "How to fix color banding"](https://blog.frost.kiwi/GLSL-noise-and-radial-gradient/); [GM Shaders Mini: Dither](https://mini.gmshaders.com/p/gm-shaders-mini-dither); [Maxime Heckel, dithering for web](https://blog.maximeheckel.com/posts/the-art-of-dithering-and-retro-shading-web/)). The blob already has a `hash21` in scope — near-zero cost.

**4. Material/color does NOT blend across the smin seam — satellites pop their color at the merge.**
`smin` returns only the merged distance; base color is uniform, so a satellite of a different tone would hard-switch at absorption. Quilez's `vec2 smin(a,b,k)` returns `(distance, blendFactor)`; `mix(colorA, colorB, .y)` gives a seamless material transition across the gooey weld. ([iquilezles.org/articles/smin](https://iquilezles.org/articles/smin/)):
```glsl
vec2 smin(float a, float b, float k){ k*=4.0; float h=max(k-abs(a-b),0.0)/k; float m=h*h*0.5,s=h*h*k*0.25; return (a<b)?vec2(a-s,m):vec2(b-s,1.0-m);}
```
Note the **normalized `k *= 4.0`**: with it, `k` reads as literal blend-thickness in distance units (makes `uSmoothK` self-documenting and the `/0.22` magic-divisor in `useMetaballRenderer.ts:273` removable). This is the current SOTA smin form vs the bare `h*h*k*0.25` at `sdf-body.glsl.ts:18`.

**5. Pointer interaction is position-only — no velocity/spring, so it can't feel alive.**
`useBlobPointer.ts:57-66` is a single exponential smoother (`SMOOTH_FACTOR=0.12`) feeding a one-shot `smoothstep` deformation (`metaball.frag.ts:123-128`). SOTA organic-pointer feel is a **critically-damped spring on pointer velocity** so the blob lags, overshoots slightly, and settles — plus a velocity-magnitude term that stretches the blob toward fast motion. ([Josh Comeau, spring physics](https://www.joshwcomeau.com/animation/a-friendly-introduction-to-spring-physics/); [Maxime Heckel, spring physics](https://blog.maximeheckel.com/posts/the-physics-behind-spring-animations/)). The Codrops droplet uses a **15-sample pointer trail** of decaying-radius spheres smin-merged into the body for a gooey comet-tail — directly portable to our `MAX_SATS` machinery. ([Codrops, 2025-06-09](https://tympanus.net/codrops/2025/06/09/how-to-create-interactive-droplet-like-metaballs-with-three-js-and-glsl/))

**6. `antialias: false` on the context is correct — keep it.**
`useMetaballRenderer.ts:150`. The full-screen quad has no geometric edges; all edges are SDF-analytic, so MSAA would only cost fillrate. This is the right call and should stay (note it in the wave so it isn't "fixed").

## ADOPT / wave-seed list

Ordered by leverage-per-risk. Each is independently shippable.

- **WAVE-A · AA recalibration (crisp 1px).** Replace `smoothstep(-aa,aa,d)`/`aa=fwidth(d)` with `clamp(0.5 - d/aa, 0,1)`, `aa=max(fwidth(d), <floor>)`. Pure shader, one line, visually verifiable. Lowest risk, immediate sharpness win. *Source: pkh.me, shadergif, numb3r23.*

- **WAVE-B · analytic distance+gradient → premium glass surface.** Refactor the field to carry `vec3(d, gradient)`; add fake-fresnel rim + directional top-light inner shading keyed to the gradient normal. The "premium 3D droplet" headline. Medium effort, high payoff, no new passes. *Source: iquilezles distgradfunctions2d; Codrops 2025 (aesthetic target).* Gate idea: `proof:blob-gradient-unit-length` (assert |grad|≈1).

- **WAVE-C · normalized material-blend smin.** Adopt IQ `vec2 smin` (`k*=4.0` normalized + blend-factor); `mix` color across the weld; retire the `/0.22` normalizer in the renderer. Enables per-satellite tinting later. Keeps the existing `proof:blob-color-equivalence` discipline — extend its TS port. *Source: iquilezles smin.*

- **WAVE-D · output dither (anti-banding).** Add a `±0.5/255` blue-noise/value-noise dither immediately before `fragColor` (after the OETF). Reuses in-scope `hash21`. Removes warm-cream banding; trivial cost. *Source: frost.kiwi, GM Shaders, Maxime Heckel.*

- **WAVE-E · spring-physics pointer + gooey trail (optional/interactive).** Swap `useBlobPointer`'s exp-smoother for a critically-damped spring; add a velocity-stretch term; optionally a decaying-radius pointer trail smin-merged like satellites. The "alive/interactive" axis from the goal. Largest scope — gate behind an opt-in prop so the calm default is preserved. *Source: Josh Comeau, Maxime Heckel, Codrops 2025.*

- **NON-CHANGE (document, don't touch):** keep `antialias: false` (SDF-analytic edges) and keep the rotated-octave FBM. Both are already SOTA.

**Sequencing:** A → D are independent quick wins (ship together). B and C are the visual headline and pair naturally (gradient + material blend). E is the stretch/interactive wave, opt-in.

**Sources:**
- https://blog.pkh.me/p/44-perfecting-anti-aliasing-on-signed-distance-functions.html
- https://shadergif.com/guides/anti-aliasing-basics/
- http://www.numb3r23.net/2015/08/17/using-fwidth-for-distance-based-anti-aliasing/
- https://iquilezles.org/articles/smin/ (Quilez smin rewrite, announced 2024)
- https://iquilezles.org/articles/distgradfunctions2d/
- https://tympanus.net/codrops/2025/06/09/how-to-create-interactive-droplet-like-metaballs-with-three-js-and-glsl/ (2025-06-09)
- https://blog.frost.kiwi/GLSL-noise-and-radial-gradient/
- https://mini.gmshaders.com/p/gm-shaders-mini-dither
- https://blog.maximeheckel.com/posts/the-art-of-dithering-and-retro-shading-web/
- https://www.joshwcomeau.com/animation/a-friendly-introduction-to-spring-physics/
- https://blog.maximeheckel.com/posts/the-physics-behind-spring-animations/

**Files referenced:** `/Users/mkbabb/Programming/glass-ui/src/components/custom/goo-blob/shaders/metaball.frag.ts` · `.../shaders/sdf-body.glsl.ts` · `.../shaders/watercolor-edges.glsl.ts` · `.../shaders/oklch-perturb.glsl.ts` · `.../composables/useMetaballRenderer.ts` · `.../composables/useBlobPointer.ts` · `.../types.ts`

---

### Lane 21

I have everything needed. Synthesizing the brief now.

---

# SOTA Brief — GooBlob noise-displacement-boundary lane

Research only. No implementation. Lane: organic, non-circular, ever-shifting silhouette + wispy/tendril extensions, integrated with warm-cream glass.

## Where the blob is today (baseline)

The current edge is a **single-pass radial FBM displacement** added to the body radius — competent but flat:

- `metaball.frag.ts:134-137` — `fbm(uv*uNoiseFreq + uTime*uNoiseSpeed, 3)` mapped to `(noise-0.5)*uNoiseAmp`, added to `bodyR` inside `sdCircle`. The displacement is **isotropic and shallow** (default `noiseAmp: 0.025`, `noiseFreq: 3.5` — `types.ts:109-110`): it perturbs the radius uniformly, so the silhouette stays a softly-wobbled circle. No directional structure, no tendrils.
- `watercolor-edges.glsl.ts:36-48` — value-noise FBM, fixed 2.0 lacunarity, ONE inter-octave rotation (`FBM_ROT`). Value noise (not gradient noise) → no analytic derivatives available → domain-warp and erosion variants are off the table without a noise upgrade.
- `sdf-body.glsl.ts:16-19` — IQ quadratic `smin` already present (good; this is SOTA for the merge).
- `metaball.frag.ts:149-150` — `fwidth`-based AA already present (good).
- Pointer is a **whole-field UV pull** (`metaball.frag.ts:123-128`), not an edge-local deformation.

So: the merge and AA are already at SOTA. **The boundary itself is the gap** — it lacks domain warping (organic non-circular shape) and any flow/curl mechanism (tendrils/wisps).

## SOTA techniques (with citations)

### 1. Domain warping — the headline for "organic, non-circular, ever-shifting"
Quilez's recursive warp is the canonical move: evaluate FBM, feed its output back as a positional offset, twice. ([iquilezles.org/articles/warp](https://iquilezles.org/articles/warp/), accessed 2026-06-06)

```glsl
q = vec2(fbm(p), fbm(p + vec2(5.2,1.3)));
r = vec2(fbm(p + 4.0*q + vec2(1.7,9.2)), fbm(p + 4.0*q + vec2(8.3,2.8)));
warped = fbm(p + 4.0*r);
```
Offsets `(5.2,1.3)/(1.7,9.2)/(8.3,2.8)` decorrelate the channels; the `4.0` multiplier scales warp magnitude. Quilez: this "allows you to shape apples, buildings, animals." Applied to the edge, the radial displacement field becomes **swirled and lobed** instead of uniformly wobbly — that is the single biggest "organic" upgrade available, and it composes directly onto the existing `bodyDisplacement` term. The "Book of Shaders ch.13" covers the same recursion for entry-level reference ([thebookofshaders.com/13](https://thebookofshaders.com/13/), accessed 2026-06-06).

### 2. Curl noise — the headline for "wispy tendrils / filament extensions"
Curl noise is divergence-free (the flow neither spreads nor converges → perpetual swirl that never settles), which is exactly the "ever-shifting wisp" quality. ([emildziewanowski.com/curl-noise](https://emildziewanowski.com/curl-noise/), accessed 2026-06-06; orig. Bridson SIGGRAPH 2007, [cs.ubc.ca/~rbridson/docs/bridson-siggraph2007-curlnoise.pdf](https://www.cs.ubc.ca/~rbridson/docs/bridson-siggraph2007-curlnoise.pdf))

2D curl is the 90°-rotated gradient: `curl = vec2(dN/dy, -dN/dx)`. The tendril recipe from the same source: take the SDF gradient (perpendicular to the surface), multiply by noise, curl it → vectors **parallel to the surface** that advect edge points sideways into flowing filaments rather than just pushing the radius in/out. This is the mechanism for wisps the current isotropic-radius approach structurally cannot produce.

### 3. Analytic-derivative ("flow") FBM — makes #1 and #2 cheap, and adds erosion
Upgrading from value noise to **gradient noise that returns `vec3(value, ddx, ddy)`** in one pass gives the derivatives curl needs for free, and unlocks "derivative FBM": each octave's amplitude is attenuated by accumulated gradient steepness (the `1/(1+dot(d,d))` term), producing billowy, eroded, non-uniform features instead of uniform fractal fuzz. ([iquilezles.org/articles/gradientnoise](https://iquilezles.org/articles/gradientnoise/), accessed 2026-06-06; [iquilezles.org/articles/fbm](https://iquilezles.org/articles/fbm/)). "Flow noise" (Perlin/Neyret) is the cheaper cousin — rotate gradients over time + displace later octaves by earlier accumulated gradients for a turbulent-flow impression ([Book of Shaders ch.11](https://thebookofshaders.com/11/), [jcgt.org/published/0011/01/02](https://www.jcgt.org/published/0011/01/02/paper-lowres.pdf), accessed 2026-06-06). Either gives the edge time-evolving internal motion without bumping `uNoiseSpeed`.

### 4. Premium edge feathering + translucency
The Codrops droplet-metaball tutorial (the freshest premium reference, June 2025) is 3D ray-march, but two of its post-process moves are directly portable to our 2D SDF: a **power curve on the color** (`pow(color, vec3(7.0))`) to suppress mids for a glass-like translucent read, and **dual time-offset noise samples** (`noise(p + t)` blended with `noise(p - t)`) for shimmer that never loops visibly. ([tympanus.net/codrops droplet metaballs](https://tympanus.net/codrops/2025/06/09/how-to-create-interactive-droplet-like-metaballs-with-three-js-and-glsl/), accessed 2026-06-06). For the edge itself, a **feathered alpha band** (widen the `smoothstep` beyond `fwidth` near the silhouette, or a second outer SDF ring) reads as a soft watercolor halo — fits warm-cream glass better than a hard cut. SDF-glow refs: [inspirnathan.com glow shader](https://inspirnathan.com/posts/65-glow-shader-in-shadertoy/), [Cassidy SDF AA](https://drewcassidy.me/2020/06/26/sdf-antialiasing/) (accessed 2026-06-06).

### 5. Pointer interaction — trail-of-spheres for "stretchy"
Codrops' interaction is a **mouse-trail array of shrinking spheres** smin-merged into the body — the blob stretches an elastic pseudopod toward the cursor and snaps back. This is a richer, more "alive" interaction than the current whole-field UV pull, and it reuses the satellite/smin machinery we already have. ([Codrops, same URL](https://tympanus.net/codrops/2025/06/09/how-to-create-interactive-droplet-like-metaballs-with-three-js-and-glsl/), accessed 2026-06-06).

## ADOPT / wave-seed list

Ordered by impact-per-risk. Each is additive over the existing shader; all respect the existing `useWebGLCanvas` reduced-motion freeze and the OETF/OKLCh color seam.

- **SEED-1 — Domain-warp the edge displacement (HEADLINE).** Wrap the existing `fbm()` edge call in one IQ warp pass before it hits `sdCircle`. Gate behind a new `edgeWarp: number` (0 = current behavior, back-compat default). Single new uniform; ~6 extra noise taps. Highest organic payoff, lowest blast radius. (Tech #1.)
- **SEED-2 — Upgrade `valueNoise` → analytic-derivative gradient noise.** Return `vec3(v, dx, dy)`. Prerequisite for SEED-3 and enables derivative-FBM erosion as a free byproduct. Touches `watercolor-edges.glsl.ts` only; `fbm()` signature change is internal. Verify against the existing `proof:blob-color-equivalence` / glsl-port gates. (Tech #3.)
- **SEED-3 — Curl-noise tendril field (HEADLINE for wisps).** With derivatives from SEED-2, advect the edge tangentially via 2D curl to grow flowing filaments. New `tendrilAmp` / `tendrilFreq` config + mood-system hook (e.g. "excited" grows longer wisps). This is the only path to true tendrils. (Tech #2.)
- **SEED-4 — Feathered translucent edge + power-curve.** Widen the alpha falloff into a soft watercolor halo and apply a gentle `pow` lift; tune toward warm-cream glass (compose on the existing OKLCh inner-glow at `metaball.frag.ts:166-168`). Pure look-polish, no new geometry. (Tech #4.)
- **SEED-5 — Pointer trail-of-spheres ("stretchy pull").** Replace/augment the whole-field UV pull with N shrinking smin-merged spheres along a short pointer-trail ring buffer. Reuses satellite uniforms. Opt-in via the existing `pointerAttraction` axis. (Tech #5.)
- **SEED-6 — Dual time-offset noise sampling.** Sample edge/color noise at `+t` and `-t`, blend — kills visible looping for free. Trivial; can ride with any of the above. (Tech #4.)

Suggested wave grouping: **W-a** = SEED-1 + SEED-6 (cheap, immediate organic win, no noise rewrite). **W-b** = SEED-2 → SEED-3 (the tendril arc, gated by the noise upgrade). **W-c** = SEED-4 + SEED-5 (look + interaction polish).

Key source files for any implementing wave: `src/components/custom/goo-blob/shaders/watercolor-edges.glsl.ts` (noise core — SEED-2/3), `metaball.frag.ts:130-150` (edge assembly — SEED-1/4), `metaball.frag.ts:122-128` (pointer — SEED-5), `types.ts:57-133` (`BlobConfig` — new axes), `composables/useMetaballRenderer.ts:30-51` (`UNIFORM_NAMES` — new uniform wiring).

### Sources
- [Quilez — Domain warping](https://iquilezles.org/articles/warp/) (accessed 2026-06-06)
- [Quilez — Gradient noise + analytic derivatives](https://iquilezles.org/articles/gradientnoise/) (accessed 2026-06-06)
- [Quilez — fBM](https://iquilezles.org/articles/fbm/) (accessed 2026-06-06)
- [Codrops — Interactive droplet-like metaballs (Three.js + GLSL), 2025-06-09](https://tympanus.net/codrops/2025/06/09/how-to-create-interactive-droplet-like-metaballs-with-three-js-and-glsl/) (accessed 2026-06-06)
- [Emil Dziewanowski — Dissecting Curl Noise](https://emildziewanowski.com/curl-noise/) (accessed 2026-06-06)
- [Bridson et al. — Curl-Noise for Procedural Fluid Flow, SIGGRAPH 2007](https://www.cs.ubc.ca/~rbridson/docs/bridson-siggraph2007-curlnoise.pdf) (accessed 2026-06-06)
- [Book of Shaders — ch.11 Noise (flow noise)](https://thebookofshaders.com/11/) / [ch.13 FBM (domain warp)](https://thebookofshaders.com/13/) (accessed 2026-06-06)
- [Lague/JCGT — Tiling Simplex + Flow Noise](https://www.jcgt.org/published/0011/01/02/paper-lowres.pdf) (accessed 2026-06-06)
- [Cassidy — SDF antialiasing](https://drewcassidy.me/2020/06/26/sdf-antialiasing/) / [Inspirnathan — SDF glow](https://inspirnathan.com/posts/65-glow-shader-in-shadertoy/) (accessed 2026-06-06)

---

### Lane 22

I have everything I need. Here is the brief.

---

# SOTA Brief — GOO-BLOB glassmorphic refraction (Lane: glassmorphic-blob)

Research-only. No implementation. Wave seeds + ADOPT list at the end.

## Where the blob is today

The current `GooBlob` is an **opaque, self-lit colored creature** on a transparent WebGL2 canvas overlay. It is well-engineered but is NOT glass — it does not touch the backdrop at all:

- SDF body + smin-merged satellites, FBM watercolor edge, OKLCh per-pixel color perturbation — `src/components/custom/goo-blob/shaders/metaball.frag.ts:119-177`.
- The only "glass" cue is a **CSS `drop-shadow`** on the wrapper — `src/components/custom/goo-blob/GooBlob.vue:127-139`. There is no refraction, no backdrop sampling, no Fresnel, no specular, no chromatic aberration.
- It already has the hard infrastructure done: the shared `useWebGLCanvas` substrate, DPR≤2 clamp, offscreen/PRM park, OKLCh-correct OETF pipeline (`metaball.frag.ts:1-26`), injected `ColorResolver` seam.
- Identity context: library is "warm-cream + paper-and-glass" — `src/styles/tokens.css:4-6`; glass blur/opacity rungs at `tokens.css:572-649` (resting = `blur(12px) saturate(1.05)`, `--card`-tinted).

The gap between "colored gooey shape" and "liquid-glass blob that refracts the warm-cream backdrop" is the entire opportunity. SOTA (Apple Liquid Glass, WWDC June 2025) is exactly this: glassmorphism + **real light distortion** — bending edges, localized refraction, specular highlights that respond to context, edge-only chromatic aberration.

## Findings (SOTA, with citations)

### 1. Refraction is the headline — and the blob's SDF already gives it for free

The whole SOTA shift is from "blur the backdrop" → "displace the backdrop along surface normals." The single most reusable insight: **an SDF's gradient IS the surface normal.**

- "SDFs can fake the normal of a 3D rounded shape by using the screen-space gradient of the SDF on X and Y, combined with a Z component based on how close it is to the edge." — [GM Shaders / Xor, SDF](https://mini.gmshaders.com/p/sdf); [shaderfun.com Part 8, 2018-07-23](https://shaderfun.com/2018/07/23/signed-distance-fields-part-8-gradients-bevels-and-noise/). The gradient of an SDF is always a unit vector pointing toward the nearest edge.
- glass-ui's blob already computes `d` (the smin SDF) and `aa = fwidth(d)` per pixel — `metaball.frag.ts:137-149`. The normal is `normalize(vec2(dFdx(d), dFdy(d)))` plus a Z term from edge distance. **No new geometry needed** — the lens curvature falls out of the existing distance field.
- Apple's effect: "creates rounded glass panels with SDFs, implements lens distortion through mathematical curves that simulate light refraction, adds edge-only chromatic aberration." — [imadr.me, How Apple's Liquid Glass probably works](https://imadr.me/liquid-glass/).

### 2. The refraction math (clean, bounded parameters)

- Snell/Descartes with simplifying constraints: air IOR=1, glass IOR≈1.5, single refraction event, orthographic view, 2D shape parallel to backdrop. — [kube.io, Liquid Glass in CSS+SVG](https://kube.io/blog/liquid-glass-css-svg/).
- **Squircle height profile** `y = ⁴√(1-(1-x)⁴)` gives Apple's softer, smoother refraction gradient — preferred over the spherical `y=√(1-(1-x)²)` (harsh transitions). A "lip" profile (raised rim, shallow center via smoothstep) reads as a thick glass bead. — [kube.io](https://kube.io/blog/liquid-glass-css-svg/).
- The Grida (grida.co) liquid-glass shader is the cleanest **parameter API to copy**: `refraction` [0-1]→IOR[1.0-2.0], `depth` (glass thickness px → curvature), `dispersion` [0-1] (chromatic aberration), `light_intensity` [0-1], `light_angle` (deg), `blur_radius` (frost). Plus Cauchy wavelength-dependent IOR (R≈1.51 / G≈1.52 / B≈1.53), Schlick Fresnel for grazing-edge specular, and total-internal-reflection handling. — [Grida PR #435](https://github.com/gridaco/grida/pull/435).

### 3. Chromatic aberration + Fresnel = the "premium" tell

- Cheapest convincing version: sample the backdrop texture's **R and B channels at slightly offset UVs** (offset scales with edge proximity / displacement magnitude). — [imadr.me](https://imadr.me/liquid-glass/); [Grida PR #435](https://github.com/gridaco/grida/pull/435).
- Fresnel via Schlick: reflectance minimal head-on, strong at grazing/edge angles → drives a **rim specular highlight** that reads as a wet glass bead. — [Grida PR #435](https://github.com/gridaco/grida/pull/435). A cheaper rim light: `diffuse = saturate(dot(sdfGradient, -lightDir))` blended only in the border band via `curvature = pow(saturate(d/borderWidth), bevelCurvature)`. — [shaderfun.com Part 8](https://shaderfun.com/2018/07/23/signed-distance-fields-part-8-gradients-bevels-and-noise/).

### 4. The real problem: getting the backdrop INTO the shader

A transparent overlay canvas can't refract what it can't sample. Three strategies, in ascending fidelity:

- **CSS+SVG `feDisplacementMap` as `backdrop-filter`** — zero JS texture capture, runs on compositor thread, but **Chrome-only** for SVG-as-backdrop-filter, and most parameter changes force a full displacement-map rebuild (only `scale` animates free). — [kube.io](https://kube.io/blog/liquid-glass-css-svg/); [LogRocket](https://blog.logrocket.com/how-create-liquid-glass-effects-css-and-svg/). Poor fit for an *organic, animated* blob (the map would need constant rebuilds).
- **html2canvas snapshot → WebGL texture** (the naughtyduk **liquidGL** model): single shared canvas for all instances (avoids context exhaustion, ~30 elements OK), `resolution` 0.1-3.0, scroll-synced via Lenis. But: static snapshot, **no CSS animations refracted**, Safari unstable >50% viewport, slow capture. — [liquidGL](https://github.com/naughtyduk/liquidGL).
- **HTML-in-Canvas API** (`texElementImage2D` for WebGL, `layoutsubtree`, `paint` event) — draws **live DOM as a GPU texture** natively; CSS/animations/fonts/SVG all work, accessibility preserved, pointer events pass through. Origin trial, Chrome Canary / Brave Stable (Chromium 146+), `chrome://flags/#canvas-draw-element`, as of May 2026. — [byteiota](https://byteiota.com/html-in-canvas-api-draw-live-dom-inside-webgl-chrome-2026/). **VFX-JS** already ships a wrapper that auto-falls-back to SVG `foreignObject` on Firefox/Safari. — [VFX-JS](https://x.com/amagitakayosi/status/2044196125599781206).

**Recommendation for glass-ui**: the blob is small (one isolated chunk, ~7rem footprint) and warm-cream — it does NOT need a pixel-perfect live DOM capture. A **synthetic backdrop** (the blob samples a procedural warm-cream gradient / the `--card` color it already knows, plus the section's own background token) gives 90% of the look at zero capture cost and works in every browser. Reserve HTML-in-Canvas as a progressive-enhancement tier behind `@supports`.

### 5. Performance budget (hard numbers from the field)

- "Limit to 3 concurrent active glass panels" / "every `backdrop-filter` forces a full screen-buffer copy+blur+paste; 50 on a page crashes 2026 mobile." — [lucky.graphics](https://lucky.graphics/learn/liquid-glass-css-glassmorphism-tutorial/); [grafit.agency](https://www.grafit.agency/blog/why-you-shouldnt-use-the-liquid-glass-effect-on-your-website-yet).
- Lower blur radii (8-16px) + compensating saturation bump; render heavy backdrops to a hidden canvas at 50% res; `contain: strict` + `will-change: transform` to promote glass to its own layer. — [lucky.graphics](https://lucky.graphics/learn/liquid-glass-css-glassmorphism-tutorial/). glass-ui's blob **already** has `contain: layout style` + `content-visibility: auto` + DPR clamp + offscreen park — it is ahead of this curve.

### 6. Motion idiom: spring physics + squash-and-stretch

- SOTA organic motion is **spring-driven (tension/mass/damping), not duration-keyed**, with subtle idle motion while at rest, and squash-and-stretch to convey weight/cohesion/surface-tension. — [animations.dev](https://animations.dev/vocabulary); [liquidGL fluid layer](https://liquidgl.naughtyduk.com/). glass-ui already has `@mkbabb/keyframes.js` springs and a mood system — the blob can deform its body radius/eccentricity on a spring rather than the current sinusoidal pulse for a more alive, premium feel.

## ADOPT / wave-seed list

Tight, ordered by impact-per-effort. Each is a candidate wave.

**W-α — SDF refraction normals + lens displacement (HEADLINE).**
Derive a surface normal from the existing smin SDF (`normalize(vec2(dFdx(d),dFdy(d)))` + edge-distance Z), apply a **squircle height profile** (`⁴√(1-(1-x)⁴)`) to bend a sampled backdrop. Reuses `d`/`fwidth(d)` already in `metaball.frag.ts:137-149`. Backdrop = synthetic warm-cream gradient from `--card`/section tokens (no DOM capture). This converts the blob from "colored shape" to "glass lens" — the core of the lane. Param API per Grida: `refraction`→IOR[1.0-2.0], `depth`. Cite: [shaderfun Part 8], [kube.io], [Grida PR #435].

**W-β — Edge chromatic aberration + Fresnel rim specular.**
Offset R/B backdrop samples by displacement magnitude (edge-only); add a Schlick/`dot(gradient,-lightDir)` rim highlight in the border band with `light_angle`/`light_intensity` config. This is the single biggest "premium" tell. Folds into the same fragment pass. Cite: [imadr.me], [Grida PR #435], [shaderfun Part 8].

**W-γ — Glass tier integration (warm-cream identity).**
Promote the blob from "uses `--blob-color` + drop-shadow" to a real glass surface: read the section background as the refracted field, tint refraction toward `--card` with `saturate(1.05)` to match the `glass-resting` rung (`tokens.css:572-649`), keep the cartoon-offset drop-shadow as the contact shadow. New `--blob-refraction`/`--blob-dispersion`/`--blob-frost` tokens so consumers retune on the cascade (house pattern). Make the refraction strength a `BlobConfig` field alongside `smoothK`/`noiseAmp` (`types.ts:58-98`).

**W-δ — Spring-driven body + squash-and-stretch.**
Replace the sinusoidal `uPulsePhase` (`useMetaballRenderer.ts:252-260`) with a keyframes.js spring on body radius/eccentricity; satellites merge with squash-stretch on absorb/emerge. Wire to the existing mood system. Premium "alive" motion without new deps. Cite: [animations.dev], [liquidGL].

**W-ε (progressive enhancement, OPTIONAL) — live DOM backdrop via HTML-in-Canvas.**
Behind `@supports`/feature-detect: use `texElementImage2D` (Chromium 146+, origin trial) or a VFX-JS-style SVG-`foreignObject` fallback to refract the *actual* content behind the blob, not a synthetic field. Gate it; ship the synthetic field as the universal baseline. Cite: [byteiota], [VFX-JS].

**Explicitly DO NOT adopt:**
- CSS+SVG `feDisplacementMap` as `backdrop-filter` for the body — Chrome-only and forces map rebuilds on every animated frame; wrong tool for an organic animated blob ([kube.io]).
- html2canvas snapshot capture as the primary path — static, no-CSS-animation, Safari-fragile; the blob is too small to justify it ([liquidGL]).
- Multiple concurrent live-refraction blobs — respect the "≤3 glass panels" budget ([lucky.graphics]).

**Sequencing:** W-α and W-β are one shader pass and should land together as the headline; W-γ binds them to the design system; W-δ is independent motion polish; W-ε is a gated stretch tier.

Sources: [kube.io](https://kube.io/blog/liquid-glass-css-svg/) · [lucky.graphics](https://lucky.graphics/learn/liquid-glass-css-glassmorphism-tutorial/) · [imadr.me](https://imadr.me/liquid-glass/) · [Grida PR #435](https://github.com/gridaco/grida/pull/435) · [shaderfun Part 8](https://shaderfun.com/2018/07/23/signed-distance-fields-part-8-gradients-bevels-and-noise/) · [GM Shaders SDF](https://mini.gmshaders.com/p/sdf) · [byteiota HTML-in-Canvas](https://byteiota.com/html-in-canvas-api-draw-live-dom-inside-webgl-chrome-2026/) · [liquidGL](https://github.com/naughtyduk/liquidGL) · [VFX-JS](https://x.com/amagitakayosi/status/2044196125599781206) · [grafit.agency](https://www.grafit.agency/blog/why-you-shouldnt-use-the-liquid-glass-effect-on-your-website-yet) · [LogRocket](https://blog.logrocket.com/how-create-liquid-glass-effects-css-and-svg/) · [animations.dev](https://animations.dev/vocabulary). All accessed 2026-06-06.

Key code anchors: `src/components/custom/goo-blob/shaders/metaball.frag.ts:119-177` (current fragment main), `:137-149` (SDF + AA — the normal source), `src/components/custom/goo-blob/GooBlob.vue:127-139` (CSS drop-shadow = the only current glass cue), `src/components/custom/goo-blob/types.ts:58-133` (BlobConfig — where refraction params slot), `src/components/custom/goo-blob/composables/useMetaballRenderer.ts:252-260` (sinusoidal pulse to replace with spring), `src/styles/tokens.css:572-649` (glass rungs to match).

---

### Lane 23

The current renderer composites everything as a single SDF field (body + satellites smin-merged) in one plane with premultiplied-alpha output. That confirms the depth-layering gap precisely. I have what I need.

---

# SOTA brief — GooBlob depth-layering (lane: depth-layered-blob)

Research-only. Web-cited. Targets: depth planes, foreground/background composition, fake DOF/bokeh. Goal: give the single-plane metaball scene visual depth without breaking the warm-cream glass identity or the performance budget.

## Where GooBlob is today (the gap)

The component is a **single flat SDF field**: one body circle + up to 4 satellites, all `smin`-merged in one fragment shader, one canvas, premultiplied-alpha out.

- `src/components/custom/goo-blob/shaders/metaball.frag.ts:137-145` — body and every satellite are merged into one `float d` distance via `smin`. There is no per-blob depth, no z-order, no per-layer blur.
- `src/components/custom/goo-blob/types.ts:100-133` — `BlobConfig` has zero depth/parallax/DOF fields. Satellites carry `x,y,radius,opacity` only (`MetaballSource`, line 19-24).
- `useMetaballRenderer.ts:16` `MAX_SATS = 4`; `:149` `premultipliedAlpha: true`; `:28` everything lives in one `[-0.5,0.5]` plane scaled by `POS_SCALE = 1/1.6`.

So the blob reads as a sticker on glass. Everything researched below is about making it read as a small scene with a near plane, a far plane, and air between them.

## Findings (SOTA techniques, by relevance)

**1. Depth = layered planes composited back-to-front (painter's order).** The canonical way to fake depth in a 2D shape scene is render far layers first, near layers last, alpha-over. Wikipedia/Grokipedia painter's algorithm: sort by a single per-element depth value, draw ascending. For a metaball field this means **N independent SDF passes** (or N evaluated fields in one `main()`), each with its own `z`, composited far→near — *not* one merged `smin` field. Merging across depth is wrong; merging only happens *within* a plane. [Painter's algorithm — Wikipedia, accessed 2026-06-06]

**2. Atmospheric perspective sells depth cheaply — haze + desaturate + lighten far layers.** Standard fragment-shader fog: `mix(layerColor, hazeColor, depthAmount)` where `depthAmount` rises with distance. For warm-cream glass the haze color = the cream background tint, so far blobs **dissolve toward the background** (lower contrast, slightly desaturated, slightly lighter), near blobs stay saturated/contrasty. This is a 2-line `mix()` per layer and is the single highest visual-return technique. [3D Game Shaders For Beginners — Fog, lettier.github.io; WebGL Fog, webglfundamentals.org — accessed 2026-06-06]

**3. Fake DOF via per-layer blur keyed to distance-from-focal-plane (circle of confusion).** The Blurry library model: define a focal plane; blur radius scales with `|z − focalZ|`. Near AND far go soft, the focal band stays crisp. Adopt the *concept* (focal plane + CoC falloff), not the millions-of-particles accumulation (too heavy). The far plane gets a wide blur, the hero blob stays sharp. [Codrops — Simulating DOF with Particles / Blurry, 2019-10-01; therealmjp.github.io "How To Fake Bokeh" — accessed 2026-06-06]

**4. Cheap real-time blur = Dual Kawase, not Gaussian.** For blurring background layers per-frame, Dual Kawase (Marius Bjørge, SIGGRAPH 2015) is the SOTA real-time choice: downsample + upsample passes, ~4 taps/pass, built for weak-throughput mobile GPUs, visually ≈ Gaussian at a fraction of cost. This is the right tool if blur becomes a render-target pass rather than an in-shader many-tap loop. [Intel — "Investigation of fast real-time GPU blur algorithms"; Lee Jia Keat "Kawase Dual Filter Blur" — accessed 2026-06-06]

**5. Progressive/gradient blur without a depth texture — screen-space falloff.** Codrops OGL progressive-blur: blur amount = a `smoothstep` over screen position, multiplied into a multi-sample loop. Cheaper than true DOF; good for a "the far plane is hazier toward the bottom/edges" gradient. Translates directly to vanilla WebGL2. Use as the *fallback* blur when a Kawase RT pass is too much. [Codrops — Progressive Blur with WebGL/OGL, 2024-07-02 — accessed 2026-06-06]

**6. Parallax = different layers move at different speeds.** The depth illusion completes when near and far planes respond differently to motion. Two motion sources available: the existing pointer (`useBlobPointer`) and the existing intersection/scroll seam (`useIntersectionPause`). Near layer gets a larger pointer-offset / scroll-offset multiplier; far layer barely moves. This is a per-layer scalar on the existing `uPointer` offset — near-zero cost. [Codrops — "Smooth Horizontal Parallax Gallery: DOM to WebGL", 2026-02-19; Adobe layer-depth — accessed 2026-06-06]

**7. Grain + blur is the 2026 premium-aurora idiom, and grain reads as depth.** The dominant 2026 hero look (Stripe/Linear/OpenAI-class "ethereal glow") is *heavily-blurred overlapping shapes + grainy layer + slow 8-12s cycles*. glass-ui already ships the grain/FBM machinery (`metaball.frag.ts` FBM, the shared `procedural-color.glsl`). Layered depth + a touch more grain on far planes converges the blob onto this idiom while staying on the warm-cream palette. Keep motion slow (8-12s) — the research is explicit that fast color-shifting reads cheap. [Kittl — gradient/aurora trend; colorshunter.com — "CSS Gradient Trends 2026"; nineproo.com — "Apple Style mesh gradients" — accessed 2026-06-06]

**8. Glass/backdrop-filter is NOT the right depth tool here, and stacking it is the trap.** Multiple sources warn: stacking 3-4 `backdrop-filter` blur layers drops frames on mid Android; cap at ≈3. So do depth *inside* the WebGL canvas (one GPU surface, N evaluated layers), not as a stack of DOM glass panels. One canvas with in-shader layers stays under budget where a DOM blur stack would not. [Josh Comeau — backdrop-filter; weblogtrips.com — "Glassmorphism 2.0"; wpdean — accessed 2026-06-06]

## ADOPT / wave-seed list

Tight, ordered by visual return per unit cost. Each is a candidate wave seed (no implementation here).

- **SEED-1 · Depth planes (back-to-front composite).** Add a `depth` (z) axis to blobs; extend `MetaballSource`/`BlobConfig` (`types.ts:19,100`) with `z` per source + a layer count. Restructure `main()` (`metaball.frag.ts:119-177`) from one merged `smin` field into **per-depth-plane SDF evaluation, alpha-over back-to-front**. `smin` merges *within* a plane only. Foundation for everything else. *(painter's algorithm — finding 1)*

- **SEED-2 · Atmospheric haze on far planes.** Per-layer `mix(color, var(--cream-haze), depthAmount)` + slight desaturate/lighten with depth. Haze color = the warm-cream background token so far blobs dissolve into glass. Highest return, ~2 lines/layer. New `BlobConfig` fields: `hazeStrength`, `hazeColor` (default → cream). *(fog/atmospheric perspective — finding 2)*

- **SEED-3 · Fake DOF: focal plane + per-layer blur.** `focalZ` + circle-of-confusion falloff (`blur ∝ |z − focalZ|`). Hero plane sharp, near/far soft. Start with an in-shader multi-tap on far layers only (cheap), reserve a Kawase RT pass for the high-quality tier. New fields: `focalZ`, `dofStrength`, `dofMaxBlur`. *(Blurry/CoC — finding 3; Kawase — finding 4; progressive blur fallback — finding 5)*

- **SEED-4 · Parallax response per layer.** Scalar per layer on the existing `uPointer` offset (`useBlobPointer`) and the `useIntersectionPause`/scroll seam: near moves more, far barely. Near-zero cost, completes the depth illusion under motion. New field: `parallaxStrength` (per-layer or global with depth scaling). *(finding 6)*

- **SEED-5 · Far-plane grain + slow-cycle convergence on the 2026 aurora idiom.** Reuse the existing FBM/`procedural-color.glsl` grain; bias slightly heavier on far planes; hold animation cycles in the 8-12s band. Converges GooBlob onto the premium hero look without leaving warm-cream. *(finding 7)*

- **SEED-6 (guardrail, not a feature) · Keep depth inside the single WebGL canvas.** Do NOT implement depth as stacked DOM `backdrop-filter` panels — that's the frame-drop trap. N in-shader layers on the one existing `useWebGLCanvas` surface. Performance budget stays as-is: the existing offscreen-pause / PRM-freeze substrate (per CLAUDE.md AV.W7) already covers this single surface; adding layers must not add canvases. *(finding 8)*

### Sequencing note
SEED-1 is the structural prerequisite (the shader stops being one merged field). SEED-2 and SEED-4 are the cheapest big wins and should ride the same wave as SEED-1. SEED-3's high-quality (Kawase RT) tier is the one item with real perf cost — gate it behind a quality flag and default to the in-shader/progressive fallback. SEED-5/SEED-6 are polish + guardrail, foldable into whichever wave lands the visuals.

## Sources
- Painter's algorithm — Wikipedia / Grokipedia (accessed 2026-06-06)
- 3D Game Shaders For Beginners, Fog — lettier.github.io; WebGL Fog — webglfundamentals.org (accessed 2026-06-06)
- Simulating Depth of Field with the Blurry Library — Codrops, 2019-10-01; "How To Fake Bokeh" — therealmjp.github.io (accessed 2026-06-06)
- Dual Kawase blur — Intel "fast real-time GPU blur algorithms"; Lee Jia Keat "Kawase Dual Filter Blur" (Bjørge SIGGRAPH 2015) (accessed 2026-06-06)
- Progressive Blur with WebGL (OGL/GLSL) — Codrops, 2024-07-02 (accessed 2026-06-06)
- Smooth Horizontal Parallax Gallery: DOM to WebGL — Codrops, 2026-02-19; Adobe layer-depth (accessed 2026-06-06)
- 2026 aurora/gradient + grain trend — Kittl blog; colorshunter.com; nineproo.com (accessed 2026-06-06)
- backdrop-filter performance — Josh Comeau; "Glassmorphism 2.0" weblogtrips.com; wpdean.com (accessed 2026-06-06)

Relevant files: `/Users/mkbabb/Programming/glass-ui/src/components/custom/goo-blob/shaders/metaball.frag.ts:119` (the `main()` to restructure), `/Users/mkbabb/Programming/glass-ui/src/components/custom/goo-blob/types.ts:19` (`MetaballSource` + `BlobConfig` to extend), `/Users/mkbabb/Programming/glass-ui/src/components/custom/goo-blob/composables/useMetaballRenderer.ts:16` (`MAX_SATS`/uniform plumbing).

---

### Lane 24

I have everything I need. The current blob is a flat-fill SDF metaball with FBM edges and OKLCh perturbation — it lacks the dimensional lighting, refraction, dithering, and physics-driven motion that define the premium bar. Here is the brief.

---

# SOTA brief: GOO-BLOB organic metaball — reference exemplars & the bar to beat

Lane: `reference-blob-exemplars`. Research only. All citations dated; code refs are `file:line`.

## Where the current blob stands

`src/components/custom/goo-blob/` is already a respectable WebGL2 SDF metaball: smin-merged satellites, FBM-displaced watercolor edge, fwidth AA, and a *perceptually-uniform* OKLCh per-pixel color perturbation (`metaball.frag.ts:119-177`). That OKLCh color path (`metaball.frag.ts:157-173`) already beats most exemplars on the web, which perturb in gamma/HSV and band. The CSS drop-shadow gives a faint lift (`GooBlob.vue:127-132`).

What it is **missing** versus the premium bar: the body is a **flat fill** — no surface lighting, no dimensionality, no refraction/specular. Motion is parametric sine/orbit (`types.ts:100-133`), not physics. There is no dithering, so the flat fill and the inner-glow ramp (`metaball.frag.ts:166-168`) will band on wide gamuts. Pointer interaction is a weak UV pull (`metaball.frag.ts:122-128`, default `pointerAttraction: 0.0` — effectively off). The blend is a plain `smin` (no blend-factor color mixing between body and satellites).

## The exemplars — and what makes each premium

**1. Inigo Quilez — smooth-minimum (full rewrite, 2024).** The canonical reference. The premium move is the **blend-factor variant** of smin: return `vec2(dist, m)` where `m` is the interpolation weight, then `mix(colorA, colorB, m)` so the merged neck **blends material/color**, not just distance. The current blob throws this away (`metaball.frag.ts:144` uses scalar `smin`). The quadratic CD-family smin maps `k` directly to neck thickness in distance units — exactly the controllable "clay" look. [iquilezles.org/articles/smin — rewrite Mar 2024](https://iquilezles.org/articles/smin/)

**2. IQ — domain warping.** The recursive `fbm(p + fbm(p + fbm(p)))` is *the* technique behind premium organic/iridescent surfaces. Expose the intermediate warp vectors `q`,`r` and drive color ramps off their magnitudes → flowing iridescence that follows the deformation's internal structure. The current single-octave `fbm(uv*freq + t)` edge displacement (`metaball.frag.ts:134`) is one warp shy of this. [iquilezles.org/articles/warp](https://iquilezles.org/articles/warp/)

**3. Apple Liquid Glass + the imadrahmoune breakdown (2025).** The current premium bar for glassy UI. The exemplar techniques, all SDF-driven: fake normal = `normalize(vec3(gradient(d).xy, edgeProximity))`; **refraction** by sampling the backdrop along the refracted vector (IOR ~1.52); **specular/rim** by mixing reflected light arbitrarily off the normal; **chromatic dispersion** by offsetting R/B sample coords at the edge. This is what would turn glass-ui's blob from a "sticker" into a "drop of warm glass." [imadrahmoune.com/liquid-glass](https://imadrahmoune.com/liquid-glass/) · announced WWDC [Jun 9 2025](https://en.wikipedia.org/wiki/Liquid_Glass) · web ports: [sorrell.info liquid-glass-lens](https://www.sorrell.info/blog/liquid-glass-lens-effect), [kube.io liquid-glass-css-svg](https://kube.io/blog/liquid-glass-css-svg/)

**4. Codrops — Bayer dithering for WebGL backgrounds (Jul 30 2025).** The cheap premium win. An 8×8 ordered Bayer dither kills gradient banding on smooth color fields; renders <0.2 ms at 4K, ~3 KB. Directly applicable to the blob's flat fill + inner-glow ramp, which *will* band. Tiny GLSL, no quality tradeoff. [tympanus.net/codrops Bayer dithering](https://tympanus.net/codrops/2025/07/30/interactive-webgl-backgrounds-a-quick-guide-to-bayer-dithering/)

**5. Codrops — gooey effect / CSS-Tricks (the SVG `feGaussianBlur`+`feColorMatrix` lineage).** The classic lightweight metaball: blur then alpha-contrast to merge shapes. Good to know as the *non-WebGL fallback* bar; cheaper but blurry and main-thread-costly at scale (INP risk). The WebGL SDF path (what glass-ui has) is strictly higher quality. [css-tricks.com/gooey-effect](https://css-tricks.com/gooey-effect/) · [tympanus.net/codrops creative-gooey-effects (Mar 10 2015)](https://tympanus.net/codrops/2015/03/10/creative-gooey-effects/)

**6. Cobo / Niccolò Miranda (Dribbble) + Awwwards WebGL-liquid collection.** The interaction bar: organic blobs that **atomize, wave, and morph amplitude in response to the cursor** — the blob feels alive and reactive, not a looping GIF. Mouse-deform creating real-time surface ripples is the recurring premium signature. [dribbble.com Cobo WebGL Organic Blob](https://dribbble.com/shots/18883283-Cobo-WebGL-Organic-Blob) · [awwwards.com WebGL collection](https://www.awwwards.com/awwwards/collections/webgl/) · [awwwards mouse-interaction WebGL liquid distortion](https://www.awwwards.com/inspiration/mouse-interaction-webgl-liquid-distortion-heroine)

**7. Josh Comeau — spring physics + squash-and-stretch.** The motion bar. Premium organic motion is spring-driven (tension/damping/mass) with **idle breathing** (sine + slight randomization to avoid mechanical loops) and **follow-through** (parts settle after the main move). The blob's pointer-nudge and satellite-absorb should ride springs, and the body should squash/stretch (volume-preserving) when poked. Current motion is pure parametric sine — reads as mechanical. [joshwcomeau.com spring-physics](https://www.joshwcomeau.com/animation/a-friendly-introduction-to-spring-physics/) · [joshwcomeau.com squash-and-stretch](https://www.joshwcomeau.com/animation/squash-and-stretch/)

**8. SDF lighting refs (Ronja, shaderfun SDF Part 8, Xor/GM Shaders).** Concrete recipes for the dimensional look: gradient→normal, Blinn-Phong, **bevels**, inner glow, soft shadow. This is how a flat 2D SDF reads as a lit 3D droplet. [ronja-tutorials 2D shadows](https://www.ronja-tutorials.com/post/037-2d-shadows/) · [shaderfun SDF Part 8: gradients/bevels/noise](https://shaderfun.com/2018/07/23/signed-distance-fields-part-8-gradients-bevels-and-noise/) · [mini.gmshaders.com SDF](https://mini.gmshaders.com/p/sdf)

## The bar to beat, in one line

A premium organic blob in 2025/26 is a **lit, dimensional droplet** (normal-from-gradient + specular/rim + subtle refraction of the warm-cream glass behind it), **domain-warped** for iridescent organic surface, **dithered** so nothing bands, **physics-driven** (springs + breathing + squash-stretch), and **reactive to the cursor** (real-time deform/ripple). glass-ui already owns the hardest part most exemplars get wrong — perceptually-uniform OKLCh color. The gap is **dimension, motion physics, and interaction.**

---

## ADOPT / wave-seed list

Ordered by visual-impact-per-effort. Each is a candidate wave; none is implemented here.

- **W-seed A — Dimensional lighting (highest impact).** Add fake-3D shading to the body: normal from SDF gradient (`vec3(dFdx(d), dFdy(d), edge)`), a soft Blinn-Phong/rim specular highlight, and a bevel near the edge. Turns the flat fill into a lit droplet. Drives off existing `d` at `metaball.frag.ts:137`. Refs: imadrahmoune, shaderfun Part 8, Xor.

- **W-seed B — Bayer dither pass.** 8×8 ordered dither over the final OKLCh output to kill banding on the flat fill + inner-glow ramp (`metaball.frag.ts:166-173`). <0.2 ms, ~3 KB, pure quality win, no motion cost. Ref: Codrops Bayer (2025).

- **W-seed C — smin blend-factor color mixing.** Swap the scalar `smin` (`metaball.frag.ts:144`) for IQ's `vec2(dist, m)` variant; use `m` to blend body↔satellite color in the merge neck. Organic clay-like color flow at the joints. Ref: IQ smin rewrite (2024).

- **W-seed D — Spring-driven interaction + idle breathing.** Replace parametric sine motion (`types.ts:113-114` pulse, satellite orbits) with spring physics: pointer-poke → squash/stretch with follow-through; idle breathing = sine + jitter. Wire `pointerAttraction` (currently `0.0`, `types.ts:122`) to a real spring-backed deform. Refs: Comeau spring + squash-stretch; Cobo/Awwwards for the interaction target.

- **W-seed E — Subtle refraction of the cream-glass backdrop.** Sample the backdrop along a refracted vector (low IOR, small offset) + tiny R/B chromatic split at the rim. This is what *seamlessly integrates* the blob with glass-ui's warm-cream glass — the blob reads as a drop *of* the same glass, not a sticker on top. Heaviest of the five; gate behind a quality prop. Refs: imadrahmoune, kube.io, sorrell.info.

- **W-seed F — Second warp octave (domain warping).** Promote the single-octave edge FBM (`metaball.frag.ts:134`) to `fbm(uv + fbm(uv + fbm(uv)))` and optionally drive a faint iridescent secondary tint off the intermediate warp vectors. Cheap richness on the surface silhouette + sheen. Ref: IQ warp.

**Cross-cutting constraints to honor in any wave:** keep the OKLCh color seam intact (it's the existing advantage, `metaball.frag.ts:157-173`); keep `prefers-reduced-motion` static-frame park (substrate already does this per CLAUDE.md AV.W7) — any spring/breathing must freeze under PRM; keep the per-subpath chunk lean (the aurora chunk is ~16 KiB-gzip — refraction/lighting must not bloat `/goo-blob` past that class); gate the heavy W-seed E refraction behind a quality/`tier` prop so low-end devices fall back to the lit-but-non-refractive path.

Source files surveyed: `/Users/mkbabb/Programming/glass-ui/src/components/custom/goo-blob/GooBlob.vue`, `.../shaders/metaball.frag.ts`, `.../types.ts`.

---

### Lane 25

Key finding confirmed: the blob takes a SINGLE `uBaseColor` uniform and perturbs it per-pixel in OKLCh — it has no multi-stop palette like aurora. This is the central gap. I have everything I need.

---

# Goo-Blob color-palette SOTA brief — Lane "color-palette-blob"

## Context: what the blob has today vs. aurora

The blob and aurora share one color core (`src/composables/color/index.ts`) but diverge sharply in how they *use* it:

- **Aurora** derives a full N-stop OKLCh palette from one seed via `deriveAurora` (`src/components/custom/aurora/composables/color.ts:152`), with named harmony schemes (`analogous | complementary | triad | monochrome`, `color.ts:110`), an L-band clamp (`color.ts:134`), chroma-falloff-toward-apex, and per-stop gamut mapping (`color.ts:250`). The shader interpolates the stops.
- **The blob** takes a **single** `uBaseColor` gamma-sRGB uniform (`metaball.frag.ts:54`) and applies a **per-pixel** OKLCh perturbation (`hueRange/satShift/brightnessShift` from `MoodParams`, `useBlobMood.ts:5`). There is **no multi-stop palette derivation** and **no `deriveBlobPalette` seam**. Mood currently only nudges one base color; it cannot express a *palette* mood.

**The central gap:** the blob should gain an aurora-parallel seed→palette derivation (shared harmony vocabulary) plus a mood→palette mapping, so a single seed + mood produces a harmonious, gamut-safe multi-color gooey gradient that integrates with the warm-cream glass — not one perturbed base color.

## Findings (with citations)

**1. OKLCh harmony from a seed is the established SOTA, and aurora already implements the canonical form.** Complementary = +180°, analogous = ±30°, triad = +120/+240°; OKLCh's perceptually-uniform hue makes these rotations *actually* read as harmonious (unlike HSL). Tools also derive tint/shade ramps along the OKLCh L axis. ([oklch.fyi](https://oklch.fyi/), accessed 2026-06-06; [HN OKLCH theme builder #46024168](https://news.ycombinator.com/item?id=46024168), 2026). Aurora's `deriveHue` (`color.ts:203`) is exactly this — the blob should reuse the same `AuroraHarmony`-style vocabulary rather than invent a second one.

**2. OKLCh gradient interpolation needs explicit hue-arc control to avoid muddy mid-tones.** sRGB interpolation crosses gray (the "dead zone") when mixing complementary colors; OKLCh maintains chroma across the arc. Critically, you must choose **shorter vs. longer hue arc** — orange→blue-violet via shorter arc passes through *green*; via longer arc through *red/magenta*. ([Toolbox365 gradient banding & OKLCH](https://www.toolbox365.net/tutorials/gradient-banding-and-oklch/), accessed 2026-06-06; [CSS-Tricks color interpolation](https://css-tricks.com/what-you-need-to-know-about-css-color-interpolation/), accessed 2026-06-06). The blob's shader interpolates in OKLab already, but a seed→palette deriver must pick the arc deliberately (and a chroma-bump at the midpoint counters the OKLCh mid-gradient chroma sag).

**3. Premium metaball color is multi-color accumulation + gamma-pop contrast, not one tint.** The Codrops 2025 droplet tutorial blends two color fields by noise (`color0*noisePosTime + color1*noiseNegTime`), multiplies intensity (`*2.3`), and **suppresses darks with `pow(color, 7.0)`** so highlights pop — glass-like translucence with no explicit lighting model. SmoothMin `k≈7` controls blend softness. ([Codrops, 2025-06-09](https://tympanus.net/codrops/2025/06/09/how-to-create-interactive-droplet-like-metaballs-with-three-js-and-glsl/)). Paper Design's commercial metaballs shader exposes **up to 8 colors** + a separate `colorBack`, and credits the premium feel to *smooth merging between multiple colored elements* rather than stark transitions. ([shaders.paper.design/metaballs](https://shaders.paper.design/metaballs), accessed 2026-06-06). Takeaway: the blob wants a **palette (≥2–4 stops)** distributed across body + satellites, plus a contrast curve — not a flat per-pixel perturbation of one color.

**4. Mood → palette maps cleanly onto OKLCh axes via valence/arousal.** Design-system practice: warm hues + high saturation + high brightness = positive valence + high arousal (energy/joy); cool hues + low saturation + lower brightness = calm/serene; low-saturation suits prolonged-use surfaces. Preset emotion sets (Joy, Calm, Energy, Nostalgia, Confidence) regulate H+S+B jointly. ([arxiv 2502.16038 "Emotion-Aware Design: VAD"](https://arxiv.org/abs/2502.16038), 2025; [Toptal colors & emotions](https://www.toptal.com/designers/ux/colors-and-emotions), accessed 2026-06-06; [atmos.style color theory](https://atmos.style/blog/color-theory-ui-design), accessed 2026-06-06). This maps directly: the blob's existing `BlobMood` (`idle/happy/curious/sleepy/excited`, `types.ts:3`) should each carry **palette deltas in OKLCh** (hue-warmth shift, chroma scale, L shift, hue-spread width), not just the current scalar `satShift/brightnessShift`.

**5. The premium 2025 idiom for organic blobs is iridescent multi-hue gradient + grain + soft rim glow.** Holographic/iridescent liquid-blob collections blend a *spectrum* with a soft white rim light along the lit edge; glassmorphism adds glowing outlines + vibrant gradients for depth; OKLCh + blend modes are cited for the "polished translucent hardware" feel. ([Gravix iridescent blob collection, Figma](https://www.figma.com/community/file/1451426853451982049/gravix-3d-holographic-iridescent-gradient-liquid-blob-abstract-shapes-collection), accessed 2026-06-06; [NN/G Glassmorphism](https://www.nngroup.com/articles/glassmorphism/), accessed 2026-06-06). A faint grain/dither also kills OKLCh gradient banding (finding 2).

**6. Interaction SOTA = spring-physics pointer follow + magnetic attraction.** Premium blob cursors use spring-delayed follow ("heavy, natural, premium" metaball systems); magnetic cursors attract nearby elements; loading states use a single organic glass blob reacting to the mouse. ([Liquid Glass OS Organics update](https://liquid-glass-web.itch.io/liquid-glass-ui-kit-modern-tailwind-components-for-websites-apps/devlog/1483217/liquid-glass-os-ui-kit-v16-the-organics-update), accessed 2026-06-06; [React Bits Blob Cursor](https://reactbits.dev/animations/blob-cursor), accessed 2026-06-06). The blob already has `useBlobPointer` + `pointerAttraction` (`types.ts:122`) — the seed-worthy add is a **color-reactive** interaction (pointer warms/cools the local palette), not just geometric attraction.

## ADOPT / wave-seeds

1. **`deriveBlobPalette(seed, mood, options)` seam — the headline.** Mirror `deriveAurora` (`color.ts:152`): one CSS-string/OklchStop seed → 2–4 gamut-mapped OKLCh stops, reusing the **same `AuroraHarmony` vocabulary** (rename to a shared `ColorHarmony` type in `src/composables/color`). Distribute stops across body + satellites instead of one `uBaseColor`. This replaces the blob's single-color perturbation with a real palette. (Findings 1, 3)

2. **Mood → palette table in OKLCh, valence/arousal-shaped.** Extend `MoodParams` (`types.ts:5`) / `MOOD_TARGETS` (`useBlobMood.ts:5`) with palette deltas: `hueWarmthShift` (valence: happy/excited warm, sleepy cool), `chromaScale` (arousal: excited saturated, sleepy desaturated), `lightnessShift`, `hueSpread` (excited wide/iridescent, idle tight). The existing per-frame `hue/sat/brightness` perturbation becomes the *animated micro-layer* over the derived palette, not the whole color story. (Finding 4)

3. **Multi-stop shader: pass `uPalette[N]` + `uStopCount` (aurora-parallel) and interpolate in OKLab with deliberate hue-arc + midpoint chroma-bump.** Generalize `metaball.frag.ts` from `uBaseColor` (`:54`) to a stop array; reuse aurora's `flattenPalette` buffer-reuse pattern (`color.ts:42`) to avoid GC churn on slider drag. Pick shorter/longer arc per harmony to avoid the gray dead zone. (Findings 1, 2, 3)

4. **Contrast-pop + grain for premium translucence.** Add a tunable gamma/contrast curve at the gamma exit (Codrops `pow` pop, finding 3) and a low-amplitude grain/dither over the gradient to kill OKLCh banding and read as "frosted." Token-drive both (`--blob-contrast`, `--blob-grain`). Reuse `src/utils/prng.ts` (already shared with watercolor-dot). (Findings 2, 5)

5. **Warm-cream-glass integration default.** Default seed/palette should derive from glass-ui tokens (`--primary` / a warm anchor) so an un-themed blob reads as belonging to the cream-glass system, not a random neon. Add a `complementary`/`analogous` default tuned to warm anchors; keep authored *named* palettes in the consumer per the "presets in consumers" rule (mirror aurora's `presets.ts:1` note). (Finding 5)

6. **Color-reactive pointer (interaction seam).** Extend the existing `pointerAttraction` (`types.ts:122`) so the pointer also locally warms/brightens the palette near the cursor (a moving hue/L bias in the shader), and consider a spring-delayed "heavy" follow for the body. Keep it opt-in/token-gated; respect the substrate's PRM freeze. (Finding 6)

7. **Shared harmony vocabulary as a wave-zero refactor.** Hoist `AuroraHarmony` + `deriveHue` + `gamutMapStop` (`color.ts:110/203/250`) into the `/color` leaf so aurora and the blob derive from one harmony source — keeps `proof:single-color-core` honest and prevents a second divergent harmony implementation. (Findings 1, 7-coordination)

## Coordination note (aurora ↔ blob)

Aurora is the reference implementation; the blob should **consume aurora's harmony/derivation machinery, not fork it**. Aurora bakes to **linear** (ACES-tonemapped, `oklchToLinear`, `color/index.ts:50`); the blob exits **gamma** (DEC-AT-7, `oklchToGammaRgb`, `color/index.ts:64`) — the deriver returns OKLCh stops (space-neutral), so each component bakes to its own target. The one shared addition is `deriveBlobPalette` living beside `deriveAurora`, or both refactored onto a shared `derivePalette(seed, {harmony, lBand, chromaFalloff, hueSpread, stopCount})` with component-specific L-band/falloff presets. No new color core — value.js stays the single math source.

Sources: [oklch.fyi](https://oklch.fyi/) · [HN OKLCH theme builder](https://news.ycombinator.com/item?id=46024168) · [Toolbox365 gradient banding & OKLCH](https://www.toolbox365.net/tutorials/gradient-banding-and-oklch/) · [CSS-Tricks color interpolation](https://css-tricks.com/what-you-need-to-know-about-css-color-interpolation/) · [Codrops droplet metaballs 2025-06-09](https://tympanus.net/codrops/2025/06/09/how-to-create-interactive-droplet-like-metaballs-with-three-js-and-glsl/) · [Paper Design metaballs](https://shaders.paper.design/metaballs) · [arxiv 2502.16038 Emotion-Aware Design (VAD)](https://arxiv.org/abs/2502.16038) · [Toptal colors & emotions](https://www.toptal.com/designers/ux/colors-and-emotions) · [atmos.style color theory](https://atmos.style/blog/color-theory-ui-design) · [Gravix iridescent blob collection](https://www.figma.com/community/file/1451426853451982049/gravix-3d-holographic-iridescent-gradient-liquid-blob-abstract-shapes-collection) · [NN/G Glassmorphism](https://www.nngroup.com/articles/glassmorphism/) · [Liquid Glass OS Organics update](https://liquid-glass-web.itch.io/liquid-glass-ui-kit-modern-tailwind-components-for-websites-apps/devlog/1483217/liquid-glass-os-ui-kit-v16-the-organics-update) · [React Bits Blob Cursor](https://reactbits.dev/animations/blob-cursor)

---

### Lane 26

I have enough to synthesize a tight, well-grounded brief. The Apple Liquid Glass reference is a useful 2025 premium-aesthetic touchstone too. Let me compose the brief.

---

# GooBlob SOTA brief — accessibility-motion-blob lane

Research for tranche-development (research + wave seeds, NO implementation). The blob is already strong: substrate-owned live-monitored `prefers-reduced-motion` freeze, offscreen/hidden RAF park, DPR≤2 clamp, `DockBackgroundToggle` (WCAG 2.2.2), OKLCh perceptual color, FBM watercolor edges, `fwidth` AA edge, smin satellite merge. The gaps are in the **reduced-motion aesthetic** (the static frame is correct but not *composed* as a deliberate beauty state) and in the **premium 3D-ish glassy lighting** that separates a flat 2D field from a droplet-like surface.

## Findings

### A. Reduced-motion: the static frame is correct, but should be a *designed* state
- The current freeze paints "one static frame" of whatever phase the loop happened to be in — a snapshot, not a composition. SOTA reduced-motion is "thoughtfully removing only non-essential motion while maintaining a functional, **beautiful** static state" — the fallback is a chosen poster, not nothing and not a random freeze. [web.dev, prefers-reduced-motion — fetched 2026-06-06](https://web.dev/articles/prefers-reduced-motion)
- The `<picture>` poster pattern is the canonical "static-but-beautiful" idiom: serve a hand-chosen still under reduce rather than a frozen mid-animation. For the blob, the analog is freezing at a **deterministic, composed `t`** (satellites at a pleasing rest arrangement, body at peak-roundness) rather than wherever the RAF stopped. [web.dev — fetched 2026-06-06](https://web.dev/articles/prefers-reduced-motion)
- Safe-under-reduce property classes (explicitly low-risk): **opacity, color, blur** — non-moving properties. These are *allowed* even in a reduced-motion variant. So a reduced-motion blob need not be fully dead: a slow color/opacity drift (no positional motion) is within bounds and keeps it feeling alive. [A List Apart, Designing Safer Web Animation — fetched 2026-06-06](https://alistapart.com/article/designing-safer-web-animation-for-motion-sensitivity/); [Pope Tech, accessible animation — 2025-12-08](https://blog.pope.tech/2025/12/08/design-accessible-animation-and-movement/)

### B. Motion-sickness triggers — what the blob's *full* motion must respect
- Highest-risk: **large-area movement across screen space**, **mismatched direction/speed (parallax)**, **large perceived distance traversed rapidly**, **continuous looping motion without a pause control**. [A List Apart — fetched 2026-06-06](https://alistapart.com/article/designing-safer-web-animation-for-motion-sensitivity/)
- Scaling/zooming is a named trigger — so the body **pulse** (`uPulseAmp`) and satellite **orbit radius** are the blob's two vestibular-relevant axes. Current `pulseAmp: 0.008` (≈0.8% radius) is well under the "small change in scale ≤1.04" safe band; keep it there. [W3C WAI 2.3.3 — fetched 2026-06-06](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html); [development-tools.net, reduced motion — fetched 2026-06-06](https://development-tools.net/blog/designing-with-reduced-motion-for-motion-sensitivities/)
- The satellite orbit is the blob's largest spatial excursion (`orbitRadius: 0.35` of canvas). Continuous looping orbital motion is the "looping without controls" class — the existing `DockBackgroundToggle`/`pause()` seam is the correct mitigation; the brief recommendation is to make that pause control *discoverable per-instance*, not only available at the dock chrome level. [A List Apart — fetched 2026-06-06](https://alistapart.com/article/designing-safer-web-animation-for-motion-sensitivity/)
- No source gives numeric amplitude/duration thresholds — the literature is qualitative ("small," "large"). The control-to-disable is the universal escape hatch. WCAG 2.3.3 itself is AAA and scoped to *interaction-triggered* motion; the blob's autonomous loop is governed by `prefers-reduced-motion` + a pause control, which it has. [W3C WAI 2.3.3 — fetched 2026-06-06](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html); [Includia SC 2.3.3 — fetched 2026-06-06](https://www.includia.com/guides/posts/sc-233/)

### C. Premium glassy aesthetic — the Codrops 2025 droplet recipe
The blob currently shades a **flat** OKLCh field (color perturbation only — no lighting). The Codrops June-2025 droplet tutorial is the SOTA reference for the *premium glass pop*, and every technique maps onto the existing `metaball.frag.ts:119` `main()`:
- **SDF-gradient normals** (central-difference on the distance field) — the blob already computes `d` via `sdCircle`/`smin`; a 4-tap gradient gives a fake surface normal for free, turning the flat fill into a lit surface. [Codrops, interactive droplet metaballs — 2025-06-09](https://tympanus.net/codrops/2025/06/09/how-to-create-interactive-droplet-like-metaballs-with-three-js-and-glsl/); SDF-normal "fake" confirmed by [Ronja's Fresnel tutorial — fetched 2026-06-06](https://www.ronja-tutorials.com/post/012-fresnel/)
- **Gamma-pop highlight** (`pow(color, vec3(7.0))`) — "suppresses darker regions, allowing highlights to pop, creating a more glass-like translucent surface. This is what separates murky from premium." The single highest-leverage one-line change. [Codrops — 2025-06-09](https://tympanus.net/codrops/2025/06/09/...)
- **Reflection-vector noise texturing** (`noise3D(reflectDir*2 ± uTime)` × two color layers) for a moving caustic/iridescence inside the body — the blob already has the OKLCh perturbation engine; this is a richer driver for it. [Codrops — 2025-06-09](https://tympanus.net/codrops/2025/06/09/...)
- **Fresnel rim** — edge becomes more reflective at grazing "view angle"; in 2D, drive a rim-light from the SDF-gradient normal facing outward. Reinforces the existing `edgeGlow` (`metaball.frag.ts:167`) with a directional, not just radial, highlight. [Ronja's Fresnel — fetched 2026-06-06](https://www.ronja-tutorials.com/post/012-fresnel/); [lettier, Fresnel factor — fetched 2026-06-06](https://lettier.github.io/3d-game-shaders-for-beginners/fresnel-factor.html)
- **Apple "Liquid Glass" (2025)** corroborates the house direction: specular edge highlight + refraction/displacement + a soft inner glow is the current premium-glass vernacular — aligns the blob with glass-ui's warm-cream glass identity rather than a generic neon metaball. [imadrahmoune, How Apple's Liquid Glass works — fetched 2026-06-06](https://imadrahmoune.com/liquid-glass/)

### D. Pointer interaction — spring trail, not instant deform
- Current pointer is a single-point smoothstep deform (`metaball.frag.ts:123`). Codrops uses a **15-element pointer trail** with progressively-decaying radius — a "stretchy," lagging follow that reads as a viscous droplet chasing the cursor. A spring/lerp-followed trail is the premium upgrade over instant attraction. [Codrops — 2025-06-09](https://tympanus.net/codrops/2025/06/09/...)
- Caveat for this lane: pointer-driven deformation is *interaction-triggered* motion (WCAG 2.3.3 scope). Keep it small-area and gate trail amplitude under `prefers-reduced-motion` (the deform can stay; the lagging-trail excursion should shrink or disable). [W3C WAI 2.3.3 — fetched 2026-06-06](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)

### E. Decorative-canvas a11y — current `aria-hidden="true"` is correct
- The canvas is decorative; `aria-hidden="true"` (`GooBlob.vue:101`) is the right call — no accessible-name obligation when the visual is purely decorative and conveys no information. The SOTA only requires a semantic alternative when the canvas carries *meaning* (data viz, game state), which the blob does not. No change needed. [Quorum, accessible WebGL — fetched 2026-06-06](https://quorumlanguage.com/tutorials/accessibility/accessibleGraphicsWebGL.html); [web.dev, animation and motion — fetched 2026-06-06](https://web.dev/learn/accessibility/motion)

## ADOPT / wave-seed list

**Reduced-motion aesthetic (lane core):**
1. **Composed static poster, not a random freeze.** Under reduce, freeze at a *deterministic* `t` (peak body-roundness + satellites at a designed rest arrangement) instead of wherever the RAF stopped. The substrate freeze gate (`useWebGLCanvas.ts` reschedule gate) should draw a chosen rest-`t` frame, not the live one. — Codrops/web.dev poster idiom.
2. **Allow a motion-free "alive" drift under reduce.** A *very slow* color/opacity-only drift (zero positional motion — no pulse, no orbit) is within A-List-Apart safe-property bounds and keeps the frozen blob from feeling dead. Opt-in flag; default off (truest reduce = fully static). — A List Apart safe properties.
3. **Per-instance pause affordance** beyond the dock-level `DockBackgroundToggle` — surface `pause()`/`resume()` (already on the renderer return) as a documented per-blob control so a non-dock consumer isn't forced to wire dock chrome to satisfy "pause looping motion."

**Motion-sickness guardrails (verify/lock):**
4. **Cap the two vestibular axes in config.** Document + soft-clamp `pulseAmp` (scale axis) and `orbitRadius` excursion (large-area axis) to the current safe band; these are the only two trigger-class motions. Keep `pulseAmp ≤ ~0.012` (≤1.2% radius). — scaling-is-a-trigger sources.
5. **Reduced-motion gates the pointer trail amplitude** (seed D below), not just the autonomous loop.

**Premium glass aesthetic (the visual-perfection ask):**
6. **`pow()` gamma-pop highlight** in `main()` after the OETF — the single highest-leverage premium change; murky→glassy. — Codrops.
7. **SDF-gradient fake normal + Fresnel rim-light** — 4-tap central difference on `d`, drive a directional rim that reinforces the existing radial `edgeGlow`. Turns the flat field into a lit droplet. — Codrops + Ronja.
8. **Reflection-vector noise texturing** as a richer driver for the existing OKLCh perturbation — moving inner caustic/iridescence instead of static hue noise. — Codrops.
9. **Align to "Liquid Glass" warm-cream identity** — specular highlight + soft inner glow tuned to glass-ui's `--foreground`/cream tokens, not a neon metaball. — Apple Liquid Glass reference.

**Interaction (optional/dynamic):**
10. **Spring-followed pointer trail** (decaying-radius multi-point) replacing the single-point instant deform — viscous lagging chase. Gate amplitude under reduce (seed 5). — Codrops.

**No-change confirmations (don't touch):**
- `aria-hidden="true"` on the decorative canvas is correct (`GooBlob.vue:101`).
- Substrate-owned live-monitored `prefers-reduced-motion` + offscreen park + DPR clamp are already SOTA — keep.

## Key sources
- [Codrops — Interactive droplet-like metaballs, Three.js+GLSL, 2025-06-09](https://tympanus.net/codrops/2025/06/09/how-to-create-interactive-droplet-like-metaballs-with-three-js-and-glsl/) — premium technique (gamma-pop, SDF normals, reflection texturing, pointer trail)
- [A List Apart — Designing Safer Web Animation for Motion Sensitivity](https://alistapart.com/article/designing-safer-web-animation-for-motion-sensitivity/) — trigger ranking, safe properties
- [web.dev — prefers-reduced-motion](https://web.dev/articles/prefers-reduced-motion) — static-poster fallback, "beautiful static state"
- [W3C WAI — Understanding SC 2.3.3 Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html) — pause-control obligation
- [Ronja's tutorials — Fresnel](https://www.ronja-tutorials.com/post/012-fresnel/) — SDF-gradient fake normal + Fresnel rim
- [imadrahmoune — How Apple's Liquid Glass works](https://imadrahmoune.com/liquid-glass/) — 2025 premium-glass vernacular
- [Pope Tech — Design accessible animation, 2025-12-08](https://blog.pope.tech/2025/12/08/design-accessible-animation-and-movement/) — safe property classes corroboration

**Relevant files:** `/Users/mkbabb/Programming/glass-ui/src/components/custom/goo-blob/GooBlob.vue` (canvas a11y `:101`, reduced-motion CSS `:155`), `/Users/mkbabb/Programming/glass-ui/src/components/custom/goo-blob/shaders/metaball.frag.ts` (`main()` `:119`, `edgeGlow` `:167`, pointer deform `:123`), `/Users/mkbabb/Programming/glass-ui/src/components/custom/goo-blob/composables/useMetaballRenderer.ts` (freeze/pause seam `:319`, `:360`), `/Users/mkbabb/Programming/glass-ui/src/composables/glass/webgl/useWebGLCanvas.ts` (substrate reduced-motion reschedule gate `:160`), `/Users/mkbabb/Programming/glass-ui/src/components/custom/goo-blob/types.ts` (`pulseAmp`/`orbitRadius` config `:113`,`:125`).

---

### Lane 27

I have enough primary sources with concrete GLSL. Let me write the brief.

# Tonemapping-blob — SOTA brief (Lane "tonemapping-blob")

Research-only. No implementation. Targets the goo-blob's color richness, filmic feel, and avoiding clipped/garish color, plus adjacent premium-polish wins.

## Current state (what the blob does today)

The blob has a real OKLCh color pipeline but **no tonemapping operator**. Path in `src/components/custom/goo-blob/shaders/metaball.frag.ts:157-173`:

```
gamma base → srgbToLinear → OKLab → OKLCh → perturb L/C/h → gamutClampOklch → oklab→linear → linearToSrgb (OETF) → clamp(0,1)
```

- Gamut handling is a **hue-preserving chroma bisection** (`gamutClampOklch`, `oklch-perturb.glsl.ts:16-31`) — 16-step binary search shrinking chroma until in `[0,1]³`. This is a *hard clamp*, not a soft filmic roll-off. Bright/over-saturated perturbations snap rather than compress.
- A naive `clamp(..., 0.0, 1.0)` on the final RGB (`metaball.frag.ts:173`) — any channel that blows past 1.0 clips flat (the garish/posterized failure mode).
- An inner-glow term lifts OKLCh lightness near the edge (`metaball.frag.ts:166-168`) — can push L toward 1 and clip on saturated bases.
- **No dithering** → 8-bit banding risk on the blob's smooth low-contrast OKLCh gradients (exactly the case dithering exists for).
- Color is flat-ish: per-pixel FBM hue/chroma/lightness jitter (`metaball.frag.ts:159-164`) but **no fake lighting** — no SDF-derived normal, no fresnel rim, no specular. Visually it reads as a tinted silhouette, not a premium "droplet."

## Key finding: AgX/ACES are the WRONG tool here; Khronos PBR Neutral is the right one

The headline. Filmic tonemappers (ACES, AgX) are built for **strongly-HDR linear input** ([0,∞]) and **desaturate by design** when mapping bright yellows/greens/cyans down to sRGB. Sources confirm both halves:

- AgX expects RAW/EXR-grade linear HDR input; running it on LDR is "problematic" because its dynamic-range compression assumes high range. AgX Base is *intentionally less saturated* than ACES and "flattens the image out," colors trending toward gray — it's a grading foundation, not a final look. ([three.js forum, "Is AGX implemented correctly?", 2024](https://discourse.threejs.org/t/is-agx-tonemapping-implemented-correctly/60609))
- ACES/filmic mappers make in-gamut assets "appear washed out"; artists often skip tonemapping entirely to keep saturation, which then introduces hue shifts. ([Khronos PBR Neutral press release, 2024](https://www.khronos.org/news/press/khronos-pbr-neutral-tone-mapper-released-for-true-to-life-color-rendering-of-3d-products))

The blob's input is a **single in-gamut brand color** (warm-cream glass palette) lightly perturbed — it is *not* an HDR scene. Applying ACES/AgX would mute the exact warm-cream identity glass-ui wants to keep.

**Khronos PBR Neutral** is purpose-built for this case: "a 1:1 match for colors up to a certain maximum value, with the remainder used as headroom for compressed highlights." It preserves base hue/saturation for in-gamut color and only soft-compresses what exceeds the headroom — replacing today's hard `clamp(0,1)` with a graceful filmic roll-off that *doesn't* desaturate the identity color. It's designed for product/brand-color fidelity, not film looks. ([Khronos, 2024](https://www.khronos.org/news/press/khronos-pbr-neutral-tone-mapper-released-for-true-to-life-color-rendering-of-3d-products))

The three.js shader source is short, self-contained, operates on linear RGB (drops in right before the OETF), and needs no Rec2020 round-trip (unlike AgX). Verbatim ([three.js `tonemapping_pars_fragment.glsl.js`, dev branch](https://github.com/mrdoob/three.js/blob/dev/src/renderers/shaders/ShaderChunk/tonemapping_pars_fragment.glsl.js)):

```glsl
vec3 NeutralToneMapping( vec3 color ) {
    const float StartCompression = 0.8 - 0.04;
    const float Desaturation = 0.15;
    color *= toneMappingExposure;            // drop exposure term; blob has none
    float x = min(color.r, min(color.g, color.b));
    float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
    color -= offset;
    float peak = max(color.r, max(color.g, color.b));
    if (peak < StartCompression) return color;   // in-gamut path: 1:1, untouched
    float d = 1. - StartCompression;
    float newPeak = 1. - d * d / (peak + d - StartCompression);
    color *= newPeak / peak;
    float g = 1. - 1. / (Desaturation * (peak - newPeak) + 1.);
    return mix(color, vec3(newPeak), g);
}
```

For comparison, the AgX path (rejected) requires `LINEAR_SRGB_TO_LINEAR_REC2020` + inset/outset matrices + a 6th-order contrast polynomial + log2 EV remap — heavier and built for HDR. Source preserved for the record ([same file](https://github.com/mrdoob/three.js/blob/dev/src/renderers/shaders/ShaderChunk/tonemapping_pars_fragment.glsl.js)).

This composes with the existing OKLCh path: keep OKLCh perturbation (perceptual uniformity is good), but **replace the hard chroma-bisection clamp + final `clamp(0,1)` with the Neutral soft-compress in linear** before `linearToSrgb()`. Convergence note: like the AV.W2 OETF, the Neutral operator could live in `procedural-color.glsl.ts` so aurora can share it.

## Secondary findings (polish that compounds with tonemapping)

**1. Dithering to kill banding.** The blob's smooth low-contrast OKLCh gradients are the textbook banding case. Interleaved Gradient Noise (Jimenez, CoD:AW) is the imperceptible fix — add `±0.5/255` of triangular dither in screen space *after* the OETF, just before output. Naive hash/white noise produces visible grain; IGN is "half-way between dithered and random." ([frost.kiwi, "How to fix color banding", with exact GLSL](https://blog.frost.kiwi/GLSL-noise-and-radial-gradient/); corroborated by [Codrops dithering shader, 2025](https://tympanus.net/codrops/2025/06/04/building-a-real-time-dithering-shader/)):

```glsl
float gradientNoise(vec2 uv){ return fract(52.9829189*fract(dot(uv, vec2(0.06711056,0.00583715)))); }
// after OETF, before fragColor:
rgb += (1.0/255.0)*gradientNoise(gl_FragCoord.xy) - (0.5/255.0);
```

**2. Fake lighting for a "droplet," not a silhouette.** The blob already has an SDF (`sdf-body.glsl.ts`, `d` in `metaball.frag.ts:137`). Derive a 2D normal from the SDF gradient (`fwidth`/central differences on `d` — already computing `fwidth(d)` at `metaball.frag.ts:149`), then add a cheap fresnel rim + a single specular highlight. The Codrops droplet tutorial does exactly this — normal-from-distance-gradient, `reflect()` to modulate noise, and a `pow(color, vec3(7.0))` power-curve to make highlights pop while suppressing darks (glass translucency). ([Codrops, "Interactive droplet-like metaballs", 2025](https://tympanus.net/codrops/2025/06/09/how-to-create-interactive-droplet-like-metaballs-with-three-js-and-glsl/)). This is the single biggest perceived-premium lever and stays 2D/cheap.

**3. Pointer interaction is currently coarse.** The droplet tutorial shifts a pointer-trail array per frame with no lerp/spring. The blob already has `useBlobPointer` + `uPointerAttraction`; a spring-smoothed pointer (ease toward cursor) reads as "premium heavy motion" — matches the Liquid Glass kit's "surface tension / cohesion / mass" framing. ([Codrops, 2025](https://tympanus.net/codrops/2025/06/09/how-to-create-interactive-droplet-like-metaballs-with-three-js-and-glsl/); [Liquid Glass UI Kit v1.6 devlog](https://liquid-glass-web.itch.io/liquid-glass-ui-kit-modern-tailwind-components-for-websites-apps/devlog/1483217/liquid-glass-os-ui-kit-v16-the-organics-update)). glass-ui already ships a spring runtime (`@mkbabb/keyframes.js`) — reuse it CPU-side, don't reinvent in-shader.

## ADOPT / wave-seed list

Ordered by impact-to-effort. Each is a candidate wave; sizing is rough.

- **W-seed 1 — Khronos PBR Neutral soft-compress (HEADLINE).** Replace the final hard `clamp(0,1)` (`metaball.frag.ts:173`) and reconsider the chroma-bisection clamp with `NeutralToneMapping` applied in linear before `linearToSrgb()`. Preserves the warm-cream identity color 1:1, soft-rolls only out-of-gamut highlights. Reject ACES/AgX (HDR-built, desaturating). Drop the `toneMappingExposure` term (blob has no exposure). Co-locate the operator in `procedural-color.glsl.ts` for aurora reuse (AV.W2 convergence pattern). Add a `proof:` equivalence test mirroring the existing `blob-color-equivalence` gate. *Small-medium.*

- **W-seed 2 — Interleaved Gradient Noise dither.** Add the IGN one-liner post-OETF (`metaball.frag.ts` after :173) at `±0.5/255`. Kills banding on the smooth OKLCh gradients. Sharable into `procedural-color.glsl.ts` (aurora bands too). *Trivial-small.*

- **W-seed 3 — SDF-normal fake lighting (fresnel rim + 1 specular).** Derive normal from the `d` gradient (reuse `fwidth(d)`), add fresnel rim + single specular + optional `pow()` translucency curve. Turns the silhouette into a droplet. Gate behind a `lit?: boolean` config flag (respect `prefers-reduced-motion`/perf budget). Biggest perceived-premium win. *Medium.*

- **W-seed 4 — Spring-smoothed pointer interaction.** Ease `uPointer`/attraction toward the cursor via `@mkbabb/keyframes.js` CPU-side in `useBlobPointer.ts`; add subtle pointer-proximity highlight. "Heavy/premium" motion feel. *Small-medium.*

- **W-seed 5 (optional) — Tonemap-operator config seam.** If a consumer ever wants the filmic look, expose `tonemap?: "neutral" | "agx" | "none"` (default `"neutral"`) so AgX/ACES stay reachable without being the default. Only ship if ≥2 consumers want it (overfitting-audit invariant — likely defer). *Small; probably DON'T build yet.*

### Files touched (for the implementing waves)
- `src/components/custom/goo-blob/shaders/metaball.frag.ts:157-176` — tonemap insert, dither, lighting.
- `src/components/custom/goo-blob/shaders/oklch-perturb.glsl.ts` — chroma-bisection clamp likely superseded by soft-compress.
- `src/composables/glass/webgl/shaders/procedural-color.glsl.ts` — co-locate `NeutralToneMapping` + IGN for aurora sharing.
- `src/components/custom/goo-blob/composables/useBlobPointer.ts` — spring smoothing.
- `src/components/custom/goo-blob/types.ts` — `lit`/`tonemap` config flags if adopted.

### Sources
- [Khronos PBR Neutral Tone Mapper press release (2024)](https://www.khronos.org/news/press/khronos-pbr-neutral-tone-mapper-released-for-true-to-life-color-rendering-of-3d-products)
- [three.js `tonemapping_pars_fragment.glsl.js` — Neutral + AgX GLSL source (dev branch)](https://github.com/mrdoob/three.js/blob/dev/src/renderers/shaders/ShaderChunk/tonemapping_pars_fragment.glsl.js)
- [three.js forum — "Is AGX tonemapping implemented correctly?" (2024)](https://discourse.threejs.org/t/is-agx-tonemapping-implemented-correctly/60609)
- [dmnsgn/glsl-tone-map — operator catalog](https://github.com/dmnsgn/glsl-tone-map)
- [frost.kiwi — "How to (and how not to) fix color banding" — IGN dither GLSL](https://blog.frost.kiwi/GLSL-noise-and-radial-gradient/)
- [Codrops — "How to Create Interactive, Droplet-like Metaballs with Three.js and GLSL" (2025-06-09)](https://tympanus.net/codrops/2025/06/09/how-to-create-interactive-droplet-like-metaballs-with-three-js-and-glsl/)
- [Codrops — "Building a Real-Time Dithering Shader" (2025-06-04)](https://tympanus.net/codrops/2025/06/04/building-a-real-time-dithering-shader/)
- [Liquid Glass UI Kit v1.6 "Organics" devlog — organic metaball premium-motion framing](https://liquid-glass-web.itch.io/liquid-glass-ui-kit-modern-tailwind-components-for-websites-apps/devlog/1483217/liquid-glass-os-ui-kit-v16-the-organics-update)

---

### Lane 28

All references confirmed. Here is the brief.

---

# Lane `loop-seamless-blob` — SOTA research brief: GooBlob seamless-loop + premium ambient

## TL;DR

GooBlob is already strong on the hard parts (WebGL2 SDF metaballs, OKLCh perceptual color, fwidth AA, smin merging, substrate park/PRM). Its weakness for "the eternal-motion aesthetic" is that **motion is open-ended linear time, not loop-closed** — `uTime` increments forever, FBM is sampled at `uv * freq + uTime * speed` so the noise field translates linearly and never returns to a state (`metaball.frag.ts:134,161`), and pulsation is a bare `sin(uTime*freq)` (`metaball.frag.ts:131`). The current design hides the seam by being *stochastic and unbounded* (random satellite phase durations, no fixed period) rather than *closed*. That is a legitimate "no visible seam" strategy, but it forfeits the deliberate, composed **breathing cycle** premium ambient backgrounds are built on, and it can't be captured as a poster/GIF/CSS-fallback or driven by a single normalized phase.

The SOTA upgrade is small and well-bounded: **circular-time noise sampling** (map `uTime` to `cos/sin` on a loop circle so the field returns to itself over a chosen period), the **IQ normalized smin** (the current `smin` predates the 2024 rewrite), **domain-warped FBM** for richer organic flow, and **Bayer-8 dithering** to kill banding on the warm-cream glass — the standard 2025 premium-ambient quality bar.

---

## Findings (with citations)

### 1. Seamless loop = circular time, not linear time
The canonical trick: a perfect loop means output at `t=0` equals output at `t=1`. You get there by **never accumulating linear time** — instead normalize to a phase and map it to a point on a circle, because trig completes exactly one cycle per 2π so start/end match automatically.

```glsl
float phase(float seconds, float period){ return fract(seconds / period); }
vec2 loopVec(float p){ float a = p * TAU; return vec2(cos(a), sin(a)); }
// feed loopVec into an EXTRA noise dimension, not into a translation
```
— shadergif, *How to Make a Perfect Loop in GLSL* (fetched 2026-06-06). https://shadergif.com/guides/how-to-make-a-perfect-loop/

For a 2D field, the loop-safe form is `noise3D(vec3(uv*scale, ... ))` where the animated axis rides a circle: `snoise(vec3(p_xy, cos(t)*r, sin(t)*r))`-style. Mapping a circle in the extra dimension introduces no distortion (circle→line, 4D circle→2D plane are isometric). — GameDev.net *Seamless Noise*; corroborated by The Book of Shaders ch.12 *More noise* (2026-06-06). https://thebookofshaders.com/12/

> Direct contrast with current code: `fbm(uv * uNoiseFreq + uTime * uNoiseSpeed, 3)` at `metaball.frag.ts:134` is a **linear translation** of the noise domain — it visibly drifts forever and never closes. Replace the `+ uTime*speed` translation with a circular offset over a `uLoopPeriod`.

### 2. Smooth-minimum: the current `smin` is pre-2024
IQ fully rewrote the smin article (Mar 2024) introducing **normalization** (so `k` maps to blend thickness in real distance units) and a **circular smin** with mathematically exact circular blend profiles. The recommended default is the **normalized quadratic** ("fast, close enough to circular, never overestimates"); upgrade to circular only if exact profiles are needed. Exponential/sigmoid variants distort the SDF everywhere and are to be avoided.

```glsl
// normalized quadratic (recommended default)
float smin(float a, float b, float k){
  k *= 4.0;
  float h = max(k - abs(a-b), 0.0) / k;
  return min(a,b) - h*h*k*(1.0/4.0);
}
```
— Inigo Quilez, *Smooth Minimum* (fetched 2026-06-06). https://iquilezles.org/articles/smin/

> GooBlob's `smin` lives in `sdf-body.glsl.ts` and is the older un-normalized form (the `uSmoothK` is hand-tuned with a `/0.22` magic normalizer in `useMetaballRenderer.ts:273`). Adopting the normalized form makes `k` mean "merge-thickness in blob-radius units" and removes the magic divisor.

### 3. Domain warping = the organic-flow upgrade
Warping the noise *input* coordinates with another noise field (`f(p + g(p))`) yields the abstract-but-organic, "alive" flow that linear FBM can't. For looping, inject the looped time only into low + high octaves. — Inigo Quilez *Domain Warping* (https://iquilezles.org/articles/warp/) + The Book of Shaders ch.13 (2026-06-06). https://thebookofshaders.com/13/

### 4. Banding is the #1 premium-ambient tell — dither it
Smooth low-contrast color over a large soft fill bands on 24-bit displays; the universal fix is per-pixel ordered dithering. **Bayer-8 is the production sweet spot** (beyond 8×8 the perceptual gain is negligible; Bayer beats blue-noise for *moving* content because blue-noise has a perceptible crawling pattern). Renders <0.2ms at 4K, ~3KB.
```glsl
float Bayer2(vec2 a){ a = floor(a); return fract(a.x/2.0 + a.y*a.y*0.75); }
// recurse to Bayer8; add (dither-0.5)/255 to the final color before output
```
— Codrops, *Interactive WebGL Backgrounds: Bayer Dithering* (2025-07-30, fetched 2026-06-06, https://tympanus.net/codrops/2025/07/30/interactive-webgl-backgrounds-a-quick-guide-to-bayer-dithering/); ShaderToy *Blue noise vs Bayer* (https://www.shadertoy.com/view/wl3XWs); Frontend Masters *Grainy Gradients*. This matters specifically against glass-ui's warm-cream low-chroma palette where banding is most visible.

### 5. The leading production reference library
`@paper-design/shaders` (v0.0.76, ~2 months old as of search) ships a **gooey metaballs** shader: up to 20 balls orbiting a center and smin-merging, params `count / size / speed / colors[8] / colorBack / scale / rotation / offset`, plus `minPixelRatio`/`maxPixelCount` perf clamps. Zero-dependency canvas shaders, React + vanilla. It is the closest analog to GooBlob and validates the param surface. — paper.design (fetched 2026-06-06). https://shaders.paper.design/metaballs · https://github.com/paper-design/shaders

### 6. Premium-delight idiom (the "why")
2025's expressive direction (Apple Liquid Glass, Material 3 Expressive springy physics) leans on **physics-informed micro-motion + tactile response** — organic surfaces that respond to interaction feel premium, static ones read as decoration. — Apple Newsroom 2025-06 (https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/); Material 3 "Expressive" coverage (2026-06-06). GooBlob's `useBlobMood` + `useBlobPointer` already embody this; the seam work makes the *resting* breathing read as intentional rather than just busy.

---

## ADOPT / wave-seed list

Ordered by impact-to-effort. All are dev/research seeds — no implementation here.

**W-seed 1 — Circular-time loop closure (HEADLINE).** Add a `uLoopPeriod` uniform; replace the linear `uTime*speed` domain translation in both FBM calls (`metaball.frag.ts:134` edge noise, `:161` color noise) with a circular offset `loopVec(fract(uTime/period))*loopRadius` fed as an extra axis (promote `fbm` to sample a 3rd looped dimension, or offset by the loop circle). Drive pulsation (`:131`) off the same normalized phase. Net: the whole resting field returns to itself every N seconds — a real **breathing cycle**, GIF/poster-capturable, single-phase-drivable. Keep satellites stochastic OR loop-close them too (see W-seed 4). *Effort: medium — shader + one uniform + renderer plumbing.*

**W-seed 2 — Normalized smin (IQ 2024).** Swap the un-normalized `smin` in `sdf-body.glsl.ts` for the normalized quadratic; retire the `/0.22` magic divisor at `useMetaballRenderer.ts:273` so `uSmoothK` becomes a real distance-unit thickness. *Effort: low. Cite https://iquilezles.org/articles/smin/.*

**W-seed 3 — Bayer-8 dithering before output.** Add a `bayer8(gl_FragCoord)` term `(d-0.5)/255` to `rgb` immediately before the `fragColor` premultiply (`metaball.frag.ts:176`). Kills banding on the soft warm-cream body — the cheapest premium-quality win. *Effort: low; ~3KB, <0.2ms.* This is a candidate to **share with aurora** via the existing `procedural-color.glsl` chunk seam (both surfaces band).

**W-seed 4 — Loop-closed satellite cycle (optional, pairs with W1).** The satellite state machine (`useBlobSatellites.ts`) uses random phase durations (`6000 + rng()*10000`, `orbitDuration: [8000,14000]`) — inherently aperiodic. To make the *entire* blob a true loop, derive satellite phase from `fract(t/period)` with fixed per-satellite sub-periods that divide the master period. Trade-off: less "infinite variety," more "composed." Recommend exposing both as a `loopMode: "stochastic" | "closed"` config flag rather than replacing the current behavior. *Effort: medium-high.*

**W-seed 5 — Domain-warped edge FBM.** Upgrade the watercolor edge (`watercolor-edges.glsl.ts` `fbm`) to one warp pass (`fbm(uv + warpAmp*fbm(uv + loopOffset))`) for richer organic edge flow. Keep it loop-safe by warping with looped coordinates. *Effort: medium; cite https://iquilezles.org/articles/warp/.* Lower priority — current rotated-octave FBM is already decent.

**W-seed 6 — Circular smin escalation (defer).** Only if W2's quadratic blend reads visibly non-circular at large `k`. Adds a `sqrt`. Document as a known escape hatch, don't ship preemptively (substrate-without-consumer rule).

**W-seed 7 — Config/param parity audit vs paper.design.** Cross-check GooBlob's `BlobConfig` against the paper metaballs param surface (`count/size/speed/smoothing/colors/perf-clamp`). GooBlob already has richer mood/pointer/satellite axes; confirm no obvious premium knob is missing (e.g. an explicit `loopPeriod` and a `colorBack`/multi-color stop are the two gaps). *Effort: low — audit only.*

### Non-goals / cautions
- **Don't** chase WebGPU — no production-ready advantage for a single small canvas; the WebGL2 substrate is correct.
- **Don't** drop the stochastic mode wholesale; "no visible seam via unboundedness" is a valid aesthetic. Make loop-closure an *added mode*, preserving the no-backwards-compat-shim rule by treating it as a new config axis, not a replacement.
- All shader-shared math (dither, OETF, loop helpers) should route through the existing `procedural-color.glsl` chunk seam so aurora and blob never diverge (the AV.W2 precedent).

### Sources
- [shadergif — How to Make a Perfect Loop in GLSL](https://shadergif.com/guides/how-to-make-a-perfect-loop/)
- [Inigo Quilez — Smooth Minimum (2024 rewrite)](https://iquilezles.org/articles/smin/)
- [Inigo Quilez — Domain Warping](https://iquilezles.org/articles/warp/)
- [The Book of Shaders ch.12 (More noise / looping)](https://thebookofshaders.com/12/) · [ch.13 (FBM)](https://thebookofshaders.com/13/)
- [GameDev.net — Seamless Noise (circle-through-noise)](https://www.gamedev.net/blog/33/entry-2138456-seamless-noise/)
- [Codrops — Bayer Dithering for Interactive WebGL Backgrounds (2025-07-30)](https://tympanus.net/codrops/2025/07/30/interactive-webgl-backgrounds-a-quick-guide-to-bayer-dithering/)
- [ShaderToy — Blue noise vs Bayer dithering](https://www.shadertoy.com/view/wl3XWs)
- [paper.design — Metaballs shader](https://shaders.paper.design/metaballs) · [GitHub paper-design/shaders](https://github.com/paper-design/shaders)
- [Apple Newsroom — new software design, 2025-06](https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/)

### Key file:line anchors (current state)
- `src/components/custom/goo-blob/shaders/metaball.frag.ts:131` — bare `sin(uPulsePhase)` pulsation (not phase-normalized)
- `…/metaball.frag.ts:134,161` — linear `uTime*speed` FBM domain translation (the open-ended-motion root; the seamless-loop target)
- `…/metaball.frag.ts:176` — `fragColor` output point (insert Bayer dither here)
- `…/shaders/sdf-body.glsl.ts` — `smin` (pre-2024, un-normalized)
- `…/composables/useMetaballRenderer.ts:254,259,273` — magic `/0.015`, `/0.22` normalizers that the normalized smin/phase work would retire
- `…/composables/useBlobSatellites.ts:39,132` — random aperiodic phase durations (the stochastic-no-seam strategy; W-seed 4 target)

---

### Lane 29

I have enough to write the brief. Let me do two quick confirmation checks on the current shader — the satellite count default vs MAX_SATS, and whether there's any lighting/normal/specular at all in the fragment (there isn't — flat fill).

I have the complete picture. Here is the brief.

---

# GOO-BLOB shader SOTA audit — lane `cb-blob-shader`

Research + wave-seeds only. No implementation. All file:line refer to absolute paths under `/Users/mkbabb/Programming/glass-ui/`.

## What ships today

**SDF body.** `src/components/custom/goo-blob/shaders/sdf-body.glsl.ts:8-19` — a single `sdCircle` body plus IQ quadratic-polynomial `smin` (`h*h*k*0.25`, distance-only). The body is one circle; up to 4 satellites are `smin`-merged in `metaball.frag.ts:137-145`. Edge is `fwidth`-derived AA (`metaball.frag.ts:147-150`) — correct and resolution-stable.

**Color.** Faithful OKLCh path (`metaball.frag.ts:157-173`): gamma sRGB → linear → OKLab → OKLCh, per-pixel L/C/h perturbation off an FBM color-noise field, hue-preserving bisection gamut clamp (`oklch-perturb.glsl.ts:16-31`), mandatory `linearToSrgb` OETF, premultiplied output. This half is genuinely SOTA — perceptually-uniform, single-source OETF shared with aurora (`procedural-color.glsl.ts:46-59`). No notes.

**Surface / "watercolor."** 3-octave rotated FBM displaces the body radius (`metaball.frag.ts:133-137`; `watercolor-edges.glsl.ts:36-49`) and separately drives the color noise. `hash21` is the 3D-`p3` value-noise hash.

**Satellites.** `useBlobSatellites.ts` — a deterministic PRNG orbit/merge/absorb/emerge state machine with eccentric orbits, dual-wobble, per-axis perturbation, smoothstep orbit-blend. Rich and well-tuned. `MoodParams` (`useBlobMood.ts:5-71`) cross-fades 5 named moods.

**Pointer.** `useBlobPointer.ts` smooths pointer to [-1,1]; shader does a single radial pull (`metaball.frag.ts:122-128`). Default `pointerAttraction: 0.0` (`types.ts:122`) — **interaction is off by default**.

**Perf.** Demand-driven rAF, offscreen/hidden/PRM park via substrate, DPR≤2 clamp (`useMetaballRenderer.ts:204-218`), resolver memo, antialias:false. Solid.

## The gap vs SOTA — the blob is FLAT

The headline finding: **the fragment shader has zero lighting model.** It computes `alpha` from the SDF and fills it with a near-flat perturbed base color. There is no normal, no gradient, no highlight, no rim, no depth cue. Premium "gooey" / "droplet" looks in 2025-era work all derive a fake normal from the SDF and shade it. The blob reads as a flat sticker with a CSS `drop-shadow` (`GooBlob.vue:127-131`) doing all the dimensionality. Against warm-cream glass-ui glass it should read as a translucent gel body with a soft specular and a lit edge.

Specific SOTA levers the current shader leaves on the table:

1. **No SDF gradient / fake normal.** SOTA 2D metaball shading reconstructs a 2-component normal from the field gradient (analytic per IQ `distgradfunctions2d`, or cheap central-difference `fwidth`/offset sample) and lights it. The current `smin` is distance-only (`sdf-body.glsl.ts:16-18`); IQ's gradient-carrying `vec3 smin` interpolates *both* distance and gradient and is nearly free since terms are reused. This is the single biggest visual upgrade. (cite: iquilezles.org/articles/distgradfunctions2d — `vec3 smin(a,b,k)` formula; Codrops 2025 "normal via central difference → surface normal".)

2. **No specular / inner highlight.** The Codrops droplet uses `pow(color, vec3(7.0))` tone-mapping + a noise-modulated reflection to make highlights pop and read as glass. The blob has only a faint inward lightness lift (`metaball.frag.ts:166-168`, `edgeGlow`) — additive, not a directional highlight. A single soft specular dot from the fake normal + a light direction would make it read as a 3D gel.

3. **No rim / fresnel-style edge.** Premium blobs brighten or hue-shift the rim where the gradient faces away from the light. Cheap on a 2D SDF: `1 - dot(normal, lightDir)` or a function of `d` near the edge. Would integrate beautifully with the warm-cream palette (warm rim, cool core or vice-versa in OKLCh).

4. **`smoothMin` form is the distance-only quadratic.** Fine for merge geometry, but it discards the gradient needed for (1). The exponential `smoothMin` (`-log(exp(-k d1)+exp(-k d2))/k`, Codrops) blends >2 fields associatively; the IQ `vec3` quadratic smin keeps the C1 seam *and* carries the gradient. Prefer the latter here.

5. **Satellite default under-fills the budget headroom.** `satelliteCount: 3` default (`types.ts:103`) vs `MAX_SATS 4` (`metaball.frag.ts:85`); budget soft cap `AV_MAX_BLOBS = 3` (`budget.ts`). The 4th slot is wired but never reached by defaults — either lift the body+3 default or document the headroom. Minor.

6. **Pointer interaction is a single radial pull, off by default.** SOTA droplet interaction is a *trail* of decreasing-radius spheres `smin`-merged along the pointer path (Codrops "place spheres along mouse trail, radius - baseRadius*fi") — reads as the blob *reaching toward* the cursor and stretching. Current is one attract/repel offset (`metaball.frag.ts:122-128`) gated off. Big intuitive-interaction win, and the satellite machinery already proves the merge plumbing.

7. **No chromatic / refractive glass cue.** Optional. A tiny per-channel UV offset along the normal near the rim (chromatic aberration) or sampling the cream backdrop through the body (refraction) would seat the blob in glass-ui's glass language. Codrops explicitly skips these — they're the differentiator for a *glass*-ui blob.

8. **Body is a single circle.** All organic shape comes from FBM edge displacement + satellites. SOTA blobs often build the body itself from 2-3 `smin`-merged offset circles (animated centers) for a lobed, living silhouette rather than a displaced disc. Cheap, more characterful.

## ADOPT / wave-seed list

Tight, ordered by visual-payoff-per-cost. Each is a candidate wave for a `cb-blob` tranche.

- **W-α — Fake-normal lighting (HEADLINE).** Switch `smin` to IQ's gradient-carrying `vec3 smin` (`sdf-body.glsl.ts`), reconstruct a 2-component normal from the field, add ONE soft directional specular + a token-driven light dir. Convert flat fill → lit gel. *Biggest single win; ~30 lines.* Cite: iquilezles.org/articles/distgradfunctions2d.

- **W-β — Rim / OKLCh edge shading.** Fresnel-style rim term from the normal (or `d`), expressed as an OKLCh hue/lightness shift so it stays perceptually uniform and warm-cream-aware. Folds into the existing OKLCh block (`metaball.frag.ts:157-173`). Token-first (`--blob-rim-*`).

- **W-γ — Glass tone-map + highlight pop.** Add the Codrops-style highlight emphasis (gentle `pow`/tone-map on the lit color, NOT the flat base) so the specular reads translucent. Keep it post-OETF-aware so it doesn't re-break the gamma seam the `proof:blob-space-gamma` gate guards.

- **W-δ — Lobed body.** Build the body from 2-3 `smin`-merged slowly-animated offset circles instead of one `sdCircle`, for a living silhouette. Pure shader + a couple uniforms.

- **W-ε — Pointer-trail interaction (opt-in).** Replace the single radial pull with a short pointer-trail of decreasing-radius merge sources so the blob stretches toward the cursor; keep default off, expose as a config flag. Reuses the satellite `smin` plumbing. Cite: Codrops 2025 droplet trail.

- **W-ζ — Optional chromatic/refraction glass cue.** Per-channel rim UV offset or backdrop sample-through for the glass-ui glass language. Lowest priority, highest "premium glass" differentiation. Gate behind a flag — it's the one effect that can read as cheap if overdone.

- **W-η (housekeeping).** Reconcile default `satelliteCount` (3) with `MAX_SATS` (4) / `AV_MAX_BLOBS` (3); document the unused slot or lift the default.

**Keep as-is (already SOTA, do not touch):** the OKLCh color pipeline + shared OETF, the `fwidth` AA edge, the rotated-octave FBM, the substrate park/PRM/DPR perf model, the deterministic satellite state machine. The lighting waves layer *on top* of these; none require ripping out the color or perf work.

**Sources:**
- [IQ — 2D SDFs with analytic gradients](https://iquilezles.org/articles/distgradfunctions2d/) (gradient-carrying `vec3 smin`, normal-from-gradient, AA from gradient magnitude)
- [IQ — distance functions / smin](https://iquilezles.org/articles/raymarchingdf/)
- [Codrops 2025 — Interactive droplet metaballs (Three.js + GLSL)](https://tympanus.net/codrops/2025/06/09/how-to-create-interactive-droplet-like-metaballs-with-three-js-and-glsl/) (normal via central difference, `pow()` glass tone-map, pointer-trail merge)
- [Xor / GM Shaders — SDF tricks](https://mini.gmshaders.com/p/gm-shaders-mini-sdf-tricks)
- [vishald.com — gooey metaballs fragment shaders](https://vishald.com/blog/gooey-webgl/)

---

### Lane 30

I have the complete picture. The audit is done. Let me compile the brief.

---

# GooBlob composables audit + SOTA brief

Lane `cb-blob-composables`. Research + wave seeds, no implementation.

## What's there — the model

The blob is a WebGL2 SDF metaball: a pulsing body + up to 4 orbiting satellites `smin`-merged, FBM-displaced organic edge, per-pixel OKLCh color perturbation. Four composables drive it:

**`useBlobMood.ts`** — five named moods (`idle/happy/curious/sleepy/excited`), each an 11-field `MoodParams` target (`useBlobMood.ts:5-71`). `setMood` cross-fades via a per-mood duration table (`:73-79`) and a quadratic `easeInOut` (`:127`). Clean, simple, correct.

**`useBlobSatellites.ts`** — a 4-phase state machine per satellite (`orbiting → merging → absorbed → emerging`, `:192-307`) with elliptical orbits + dual-sine wobble + perturbation noise (`orbitPos`, `:77-91`). Deterministic from `initialColor` via mulberry32 (`:129`). Smoothstep blend out of `emerging` into live orbit kills the snap (`:264-280`).

**`useMetaballRenderer.ts`** — composes the shared `useWebGLCanvas` substrate (`:146`); owns shader compile, quad, uniform cache, per-frame upload. Color through an injected `ColorResolver` seam, memoised (`:116-124`). Offscreen-pause via `useIntersectionPause` (`:136-143`). DPR clamped to 2 (`:205`, `AV_DPR_MAX`).

**`useBlobPointer.ts`** — pointer → `[-1,1]`, exponential smoothing at `SMOOTH_FACTOR = 0.12` (`:3,:57-67`), decay-to-center on leave.

**`easing.ts`** — three hand-rolled quadratics. Fine for what they do.

## The gaps

**G1 — the mood system is orphaned. This is the headline.** `setMood`/`currentMood` are exposed (`GooBlob.vue:84-88`) but **no consumer calls `setMood`**. Grep across `demo/` + `src/`: zero `setMood` callers, zero mood wiring. The demo (`demo/stories/substrates/goo-blob.vue`) mounts four static blobs and a color picker — every blob lives and dies in `idle`. So ~140 lines of mood machinery, the richest part of the model, paint nothing the user ever sees. Per the overfitting-audit precept (≥2 sites or exported-and-consumed), this is substrate-without-consumer: either wire it to real interaction or it's dead weight.

**G2 — interaction is one-way and shallow.** The only input is hover-deform: pointer pushes the SDF away (`metaball.frag.ts:122-128`). It's a repulsion (`uv -= ... influence`), not attraction, despite the uniform being named `pointerAttraction` and `MoodParams.pointerAttraction` going negative for `sleepy` (`useBlobMood.ts:55`). No click feedback (the `click` emit fires but the blob does nothing), no idle→curious-on-approach, no settle. `nudge()` exists (`:317-323`) but only `WatercolorDot` calls it, never the blob's own demo. The model is built for a "creature that reacts" and ships as a lava lamp.

**G3 — motion is pure deterministic sine-sum; no physics, no spring.** Orbits are closed-form `angularSpeed * t` (`useBlobSatellites.ts:79`). Pointer smoothing is a raw exponential lerp (`useBlobPointer.ts:59`), not a critically-damped spring — so attraction can't overshoot/settle with weight. glass-ui already ships `@mkbabb/keyframes.js` springs and `useSpringOrchestrator`; the blob reinvents a weaker lerp instead of borrowing the house spring. SOTA organic-blob interaction (Rauno Freiberg / Family-style fluid UIs, Paper-app blob menus) is spring-driven, not sine-driven, because the eye reads damping as aliveness.

**G4 — pointer feels detached on retina + when reduced.** `SMOOTH_FACTOR` is a per-frame constant (`useBlobPointer.ts:3`), so smoothing is framerate-dependent — at 120Hz the blob tracks ~2× faster than at 60Hz. Should be `dt`-normalized (the same `dtMs` the renderer already computes at `useMetaballRenderer.ts:222`). Also, the pointer never participates in mood; approaching the blob can't make it `curious` even though the mood for it exists.

**G5 — the edge-glow is the only depth cue; the body is flat-lit.** The shader lifts lightness inward (`metaball.frag.ts:166-168`) but there's no specular/rim/gradient that reads as a 3D gelatinous surface. Aurora's sibling shader is richer. SOTA goo (Codrops metaball tutorials, the "liquid" shader family) adds a fake-normal from the SDF gradient + a soft top-light specular for the wet-jelly look. Cheap (the `fwidth`/gradient is already computed for AA at `:149`).

**G6 — no warm-cream glass integration beyond a drop-shadow.** The blob sits on a transparent canvas with a `drop-shadow` (`GooBlob.vue:127-131`). It doesn't read the glass substrate: no backdrop tint pickup, no inner translucency that lets the warm-cream `--background` glow through, no `--glass-*` token consumption. It looks like a sticker on glass, not goo *in* glass. The house identity is warm-cream glassmorphism (`--surface-tint-*`, `--border-soft`); the blob ignores all of it.

**G7 — satellite count is capped at 4 in-shader but config/budget say ≤3.** `MAX_SATS = 4` (`useMetaballRenderer.ts:16`, `metaball.frag.ts:85`) vs `AV_MAX_BLOBS = 3` (`budget.ts`) and `satelliteCount: 3` default. The renderer doesn't clamp the authored config to the budget despite budget.ts existing for exactly that ("clamped at upload"). Minor, but it's an unenforced contract.

**G8 — `orbitSpeedScale`/`wobbleScale` mood params are defined but never read.** `MoodParams.orbitSpeedScale` + `wobbleScale` (`types.ts:6-7`, set per-mood in `useBlobMood.ts`) are never consumed in `useBlobSatellites.tick` or the renderer. So `excited` (`orbitSpeedScale: 2.2`) orbits at the exact same speed as `sleepy` (`0.4`). Two of the eleven mood levers are no-ops — dead params reinforcing G1.

## ADOPT / wave-seed list

Ordered by impact-to-effort. Each is a wave seed, not a spec.

**W-seed 1 — Wire the mood system to real interaction, or cut it (resolves G1, G2, G8).** The biggest lift for the least code. Make the blob a creature: idle by default, `curious` on pointer-approach (the pointer composable already knows proximity), a brief `happy`/`excited` pulse on click (the `click` emit already fires), `sleepy` after an inactivity timeout. Then actually consume `orbitSpeedScale`/`wobbleScale` in `useBlobSatellites.tick` (multiply `angularSpeed` and the wobble amps). If the team decides the creature framing is out of scope, *delete* the mood system per no-backwards-compat — don't ship orphaned substrate.

**W-seed 2 — Replace pointer lerp with a `dt`-normalized critically-damped spring (resolves G3, G4).** Borrow the house spring (`keyframes.js` / `useSpringOrchestrator`) instead of `SMOOTH_FACTOR`. Frame-rate independent, gives weight/overshoot/settle. This single change is what flips the blob from "smooth gradient" to "alive." Same seam, drop-in at `useBlobPointer.tick`.

**W-seed 3 — Add SDF-gradient fake-normal + soft specular for wet-jelly depth (resolves G5).** The SDF gradient is already computed for `fwidth` AA (`metaball.frag.ts:149`). Reuse it as a fake normal, add a single soft top-light specular lobe + a subtle Fresnel rim. ~10 lines of GLSL, no new uniforms beyond a light-dir constant. This is the cheapest "premium" upgrade — it's what separates SOTA goo from a blurred circle.

**W-seed 4 — Integrate with warm-cream glass (resolves G6).** Let the body read the substrate: a translucent core that lets `--background` warm-cream glow through (lower interior alpha), an inner color tint from `--surface-tint-*`, optionally a `backdrop-filter`-style refraction sample. Consume `--glass-*` tokens so a consumer retuning the glass cascade retunes the blob. Makes it goo *in* glass, not *on* glass — the house identity.

**W-seed 5 — Make attraction genuinely bidirectional + add a click "jiggle" (resolves G2).** The shader hard-codes repulsion (`uv -= influence`); honor the sign of `pointerAttraction` so `sleepy` (negative) shies away and `curious` (positive) leans in. On click, fire a one-shot radial impulse (a decaying `nudge`-style perturbation already half-exists). Tiny, high-delight.

**W-seed 6 — Enforce the budget contract at upload (resolves G7).** Clamp `satelliteCount` to `AV_MAX_BLOBS` in `syncCount`, reconcile `MAX_SATS` vs the budget. The budget.ts doc already promises "clamped at upload"; the renderer doesn't do it. One guard.

**W-seed 7 — Demo must exercise the model.** Whatever ships from W1-W5, the demo story (`demo/stories/substrates/goo-blob.vue`) has to drive it (mood buttons, an interactive hero blob), because today it proves none of the interaction model works — and a feature with no demo consumer is invisible to the next audit.

### Files (absolute)
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/goo-blob/composables/useBlobMood.ts` — mood targets + cross-fade (orphaned)
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/goo-blob/composables/useBlobSatellites.ts` — 4-phase orbit FSM (sine-driven, ignores 2 mood params)
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/goo-blob/composables/useMetaballRenderer.ts` — substrate composition + uniform upload (unclamped satellite count)
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/goo-blob/composables/useBlobPointer.ts` — framerate-dependent lerp, no spring
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/goo-blob/composables/easing.ts` — three quadratics
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/goo-blob/shaders/metaball.frag.ts` — flat-lit body, hardcoded repulsion (`:122-128`), edge-glow-only depth (`:166-168`)
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/goo-blob/GooBlob.vue` — sticker-on-glass shadow, exposes orphaned `setMood`
- `/Users/mkbabb/Programming/glass-ui/demo/stories/substrates/goo-blob.vue` — static demo, exercises zero interaction

**Bottom line:** the renderer + color pipeline are SOTA-solid (OKLCh perceptual perturbation, shared OETF, offscreen-park, fwidth AA). The *interaction/animation model is half-built and unwired* — a full mood/creature system that paints `idle` forever. Highest-leverage work is W1 (wire or cut mood) + W2 (spring the pointer) + W3 (cheap jelly depth); these three turn a competent lava lamp into a premium, alive, glass-native creature.

---

### Lane 31

I have everything I need. IGN dither is confirmed absent (the SOTA crosswalk's #1 visible-defect fix). The blob's only glass integration is a `drop-shadow` filter; it consumes `--blob-color` and `--foreground` but none of glass-ui's specular/glass token vocabulary. Color tier derivation is `in srgb`, not `in oklch`. Now I'll write the brief.

---

# GOO-BLOB SOTA Audit — Lane cb-blob-api

WebGL2 metaball "creature": a pulsing SDF body + ≤4 orbiting satellites that merge in / get absorbed / re-emerge, perceptually-uniform OKLCh color perturbation, composed on the shared `useWebGLCanvas` substrate. The shader-quality core is genuinely SOTA (Quilez quadratic `smin`, rotated-octave FBM, `fwidth` AA, exact-Ottosson OKLCh with hue-preserving gamut clamp, full sRGB OETF). The defects are in the **API surface, the interaction story, and the glass-integration** — not the GPU math.

## Findings

### A. Dead / unwired API surface (the biggest finding — overfit substrate)
- **`MoodParams.orbitSpeedScale` and `MoodParams.wobbleScale` are dead.** They are declared (`types.ts:6-7`), set per-mood across all 5 targets (`useBlobMood.ts:8,21,34,47,60`), and lerped every frame in `lerpParams` (`useBlobMood.ts:84-85`) — but **never read by anyone**. `useBlobSatellites.tick` consumes only `mood.mergeRate` (`useBlobSatellites.ts:180`). The satellite orbit speed (`angularSpeed`, `useBlobSatellites.ts:79`) and wobble (`useBlobSatellites.ts:80-82`) ignore the mood entirely. Two of eleven mood params are pure ceremony.
- **The entire mood + nudge + pointer interaction surface has zero consumers.** `GooBlob` exposes `nudge()`, `setMood()`, `currentMood` (`GooBlob.vue:88`), and threads a full pointer-deformation system (`useBlobPointer.ts`, shader `metaball.frag.ts:123-128`). The only consumer — the demo story — sets `color` and nothing else (`demo/stories/substrates/goo-blob.vue:43-48,59-63`). Per the repo's own overfitting-audit invariant (≥2 sites or exported-and-used), `useBlobMood` (5 moods, 11 params, per-mood transition timing) is a large speculative subsystem with no exercised consumer. **`pointerAttraction` defaults to `0.0`** (`types.ts:122`), so even the pointer deform is off by default.

### B. Config object is flat, large, and unscaled (1.6× POS_SCALE leak)
- `BlobConfig` is a flat 28-field bag (`types.ts:58-98`) with no grouping in the type system (only comment headers). Many fields are coupled magic constants that a consumer cannot reason about: `mergeDuration:1800`, `absorbedDuration:[2000,4000]`, `emergeDuration:2200`, `orbitDuration:[8000,14000]` (`types.ts:129-132`).
- **The `POS_SCALE = 1/1.6` correction (`useMetaballRenderer.ts:28`) is smeared across ~10 uniform uploads** (`:242,248,251,259,265,273,295,296`), each hand-multiplied. This couples every length-like config value to the canvas-160%-of-wrapper CSS decision (`GooBlob.vue:148-149`). A consumer authoring `bodyRadius:0.25` has no idea it renders at `0.156` of the canvas. The scale should live in one place (a derived uniform block or a `vec`-space transform), not be re-applied per uniform.
- **Mood normalization divides by hardcoded idle baselines** (`/0.015`, `/0.025`, `/0.22` at `:259,265,273`) — magic re-derivations of `MOOD_TARGETS.idle` values that will silently desync if the idle target is retuned.

### C. Glass integration is shallow — not "seamlessly integrated"
- The blob's only tie to glass-ui is a `drop-shadow` filter mixing `--blob-color` with `--foreground` (`GooBlob.vue:127-139`). It consumes **none** of glass-ui's specular/glass/halo token vocabulary. There is no warm-cream substrate underneath, no glass-tier backplate, no inner specular — it reads as a flat sticker on whatever sits behind it, not a glass creature.
- Tier derivation uses `color-mix(in srgb, …)` (`GooBlob.vue:129,137,159`). The SOTA crosswalk explicitly flags this as the upgrade target: `color-mix(in oklch …)` is Widely-Available 2025-11-09 and is the "perceptual upgrade of the in-house `in srgb` pattern" (SOTA-crosswalk.md:27).
- The blob does not consume the dock's `--phase-color` cascade the way `primary-audacious` / dock primary tier does, so it can't phase-tint inside a dock.

### D. Confirmed visible-quality gap: IGN dither absent
- The metaball shader carries **no dither** (grep of all `goo-blob/shaders/*.ts` confirms — only the SDF/FBM film-grain). The SOTA crosswalk names this the **#1 visible defect fix** on exactly glass-ui's soft-gradient surfaces: 8-bit mid-tone banding on the OKLCh body gradient, fixed by one texture-free line `color += (1.0/255.0)*ign(gl_FragCoord.xy) - 0.5/255.0` pre-quantization (SOTA-crosswalk.md:105). The smooth body + inner-glow (`metaball.frag.ts:166-168`) is precisely the banding-prone case.

### E. Smaller correctness / polish issues
- **`drawArrays(gl.TRIANGLES, 0, 6)`** (`useMetaballRenderer.ts:307`) but the buffer holds 6 verts for a full-quad that only needs **4 with `TRIANGLE_STRIP`**; minor, but the comment says "two triangles … six-vertex quad" — a deliberate 50% vertex waste on a primitive that's drawn every frame.
- **`uPointerStrength` is `POS_SCALE`-scaled but the pointer position is too** (`:242` and `:248`), so pointer deformation is double-attenuated relative to body radius — likely why it reads weak even when enabled.
- **Reseed-on-color-change resets the whole satellite system** (`GooBlob.vue:76-78` → `satelliteSystem.reseed`). Changing color visibly re-randomizes orbits. For "live color" this is a jarring coupling — color and motion-seed should be independent inputs.
- The wrapper hardcodes `cursor: pointer` and emits a `click` (`GooBlob.vue:96,113`) but exposes no keyboard affordance / role — if it's interactive it's mouse-only; if it's decorative the `cursor:pointer` is misleading. `aria-hidden="true"` on the canvas (`:101`) says decorative, the click handler says interactive — contradictory.
- `colorCache.clear()` at 256 entries (`useMetaballRenderer.ts:121`) is a blunt cache-drop; fine, but unbounded distinct colors (e.g. an animated hue input) would thrash it every frame.

## ADOPT / wave-seed list

1. **W-seed: collapse the mood subsystem (overfit excision).** Either (a) delete `useBlobMood` + `setMood`/`currentMood` + the 5 mood targets and replace with a small `BlobEnergy` scalar (one 0..1 input driving pulse/noise/orbit-speed/merge-rate together), or (b) if moods stay, **wire `orbitSpeedScale` + `wobbleScale` into `useBlobSatellites.tick`** so they stop being dead. Decision gate: does any real consumer want named moods? Current answer is no. KISS toward (a). (`useBlobMood.ts`, `types.ts:5-17`, `useBlobSatellites.ts:180`)

2. **W-seed: restructure `BlobConfig` into grouped sub-objects + move POS_SCALE into one transform.** Group `{geometry, surface, color, satellites, pointer}`; collapse the `*Duration` lifecycle constants into a single `satelliteLifecycle` preset with 2-3 named presets (calm / lively). Apply the 1/1.6 canvas-overflow scale **once** (a `uViewScale` uniform or a space remap in the vertex stage), deleting the ~10 hand-multiplications. (`types.ts:58-133`, `useMetaballRenderer.ts:28,242-296`)

3. **ADOPT: IGN interleaved-gradient dither** pre-quantization in `metaball.frag.ts` (one line before `fragColor`). Highest visible-quality-per-byte fix; matches the SOTA crosswalk's #1 named gap and lands the blob at parity with the aurora dither story. (`metaball.frag.ts:173-176`)

4. **ADOPT: `color-mix(in oklch …)` for the glass tier derivation** in `GooBlob.vue` shadow/hover, and add a real glass-substrate integration — a warm-cream glass backplate (`.glass-*` tier) behind the canvas + an OKLCh-derived inner specular, so the blob reads as glass not sticker. Optionally consume `--phase-color` for dock phase-tinting. (`GooBlob.vue:107-163`)

5. **W-seed: decouple color-seed from motion-seed.** Stop calling `reseed` on color change (`GooBlob.vue:76-78`); keep the satellite system stable when only `color` changes. Make `seed` the sole motion-randomizer input.

6. **W-seed: resolve the interaction contract.** Pick one: decorative (drop `cursor:pointer` + `click`, keep `aria-hidden`) OR interactive (add `role="button"` + `tabindex` + keyboard activation + a real default `pointerAttraction > 0` so the deform is felt). The current half-and-half is the intuitiveness gap. If interactive, also fix the double-`POS_SCALE` pointer attenuation (`useMetaballRenderer.ts:242,248`).

7. **Cheap-win: `TRIANGLE_STRIP` 4-vert quad** in place of the 6-vert `TRIANGLES` draw. (`useMetaballRenderer.ts:178-180,307`)

## Files (absolute)
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/goo-blob/types.ts` — `BlobConfig` + `MoodParams` + `BLOB_CONFIG_DEFAULTS` + `BLOB_CONFIG_KEY`
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/goo-blob/GooBlob.vue` — props/inject/expose, glass-shadow CSS, interaction contract
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/goo-blob/composables/useMetaballRenderer.ts` — POS_SCALE smear, uniform uploads, color cache, draw call
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/goo-blob/composables/useBlobMood.ts` — dead params, 5-mood subsystem
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/goo-blob/composables/useBlobSatellites.ts` — lifecycle FSM, mergeRate-only mood read
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/goo-blob/composables/useBlobPointer.ts` — pointer smoothing
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/goo-blob/shaders/metaball.frag.ts` — IGN-dither insertion point (`:173`)
- `/Users/mkbabb/Programming/glass-ui/src/composables/color/index.ts` — `ColorResolver` seam + `defaultBlobColorResolver`
- `/Users/mkbabb/Programming/glass-ui/src/composables/glass/webgl/useWebGLCanvas.ts` — substrate (PRM/offscreen-pause already solid; no changes needed)
- `/Users/mkbabb/Programming/glass-ui/demo/stories/substrates/goo-blob.vue` — only consumer (proves the unwired-interaction finding)
- `/Users/mkbabb/Programming/glass-ui/docs/tranches/AV/audit/SOTA-crosswalk.md` — prior research (IGN dither `:105`, oklch `:27`, contain `:86`)

---

### Lane 32

I have the complete picture. Here is the brief.

---

# GOO-BLOB SOTA Audit + Wave Seeds — lane `cb-blob-interaction`

Research-only. Codebase audited file:line. No implementation.

## What exists today

**Architecture (clean, already SOTA-shaped).** A WebGL2 fragment-shader metaball: one pulsing SDF body + up to 4 orbiting satellites IQ-smin-merged, FBM-displaced watercolor edges, per-pixel OKLCh color perturbation with a mandatory OETF (`metaball.frag.ts:119-177`). Renderer composes the shared `useWebGLCanvas` substrate (`useMetaballRenderer.ts:88-369`) — never bootstraps its own context, self-heals context loss, batched uniform cache. Color through an injected `ColorResolver` seam (`GooBlob.vue:31-43`). This substrate/seam separation is good and should be preserved.

**Pause/resume + offscreen-park (W7) — solid, leave it.** Three-reason ORed suspend set `tab-hidden | off-screen | manual` (`useWebGLCanvas.ts:52,131-133`). Offscreen park has belt-and-suspenders: `content-visibility:auto` + `contentvisibilityautostatechange` listener (`useWebGLCanvas.ts:218-249`, `GooBlob.vue:124-126`) AND an `useIntersectionPause` `rootMargin:200px` IO fallback (`useMetaballRenderer.ts:136-143`). Live-monitored `prefers-reduced-motion` paints one static frame then parks (`useWebGLCanvas.ts:143-183`). The demand-gate parks a settled surface — but the blob is perpetually animated so it never actually parks on-screen (`useMetaballRenderer.ts:319-321` always returns `!paused`). `pause()/resume()` exposed for `DockBackgroundToggle` (`useMetaballRenderer.ts:360-368`). This is mature; no changes recommended here.

**Interaction — this is the gap.** The blob has a rich interactive *vocabulary* that is almost entirely unwired:

- **Pointer**: `useBlobPointer` tracks pointer normalized to [-1,1], smooths at `SMOOTH_FACTOR=0.12`, decays to center on leave (`useBlobPointer.ts:3,57-67`). The shader uses it for a single `smoothstep(0.4,0.0,dist)` UV-warp deformation (`metaball.frag.ts:122-128`). BUT `pointerAttraction` defaults to `0.0` (`types.ts:122`) and the idle mood adds `0.0` (`useBlobMood.ts:16`) — **so at rest the pointer does nothing visible.** Only `curious`/`happy` moods turn it on, and nothing sets those moods.
- **Mood**: a full 5-mood cross-fade engine — `idle/happy/curious/sleepy/excited` with 11 eased params each (`useBlobMood.ts:5-79`). `setMood` is exposed via `defineExpose` (`GooBlob.vue:84-88`). **No consumer ever calls it** (grep: only `useBlobMood.ts` self-references; demo mounts static swatches only — `goo-blob.vue:43-49`).
- **Click / nudge**: `click` emit (`GooBlob.vue:45,96`) and `nudge()` (perturbs satellite phases — `useBlobSatellites.ts:317-323`) both exposed; **neither wired to anything.** No internal click→nudge or click→mood reaction.
- **Satellites**: deterministic orbit→merge→absorb→emerge lifecycle, seeded PRNG, smooth blend-in (`useBlobSatellites.ts:175-315`). Self-running, not interactive.
- `pointer-events: none` on canvas; clicks land on the wrapper `<div>` (`GooBlob.vue:96,152`), which is correct.

**Net**: the interaction surface is built and tested but **dead at the seams** — the blob today is a pretty self-animating ornament, not the interactive toy the API implies.

## SOTA gap (vs. interactive-toy potential)

The current shader is a flat 2D filled SDF with OKLCh hue jitter + a faint inner glow (`metaball.frag.ts:166-168`). Modern premium organic blobs (Codrops Jun-2025 droplet metaballs, shadertoy fresnel-rim work) add cheap fragment-shader depth cues the blob currently lacks:

1. **No fake lighting / dimensionality** — no fresnel rim, no specular hot-spot, no normal estimation from the SDF gradient. A 2D SDF can derive a fake normal and add a rim + soft highlight in a few lines; this is the single biggest "premium / glassy" lever and matches the warm-cream glass identity (rim tint = `--foreground` over `--blob-color`, mirroring the existing drop-shadow color-mix at `GooBlob.vue:127-130`).
2. **No translucency / subsurface cue** — a thickness-from-SDF inner-glow exists but is hue-flat; a warm SSS-tinted inner gradient reads as jelly, not paint.
3. **Pointer is a UV-warp, not a follow** — SOTA droplet metaballs spawn a *satellite that tracks the pointer trail* (stretchy goo reaching toward the cursor), and apply **squash-and-stretch on press** via a spring. The blob has the satellite system and the spring-able mood params to do this; it just doesn't.
4. **No press physics** — no spring/overshoot on click; `nudge()` is a discrete phase-jitter, not a felt impulse. Keyframes.js (already a peer dep) is the natural spring engine.
5. **Reactivity is invisible at rest** — because idle attraction is 0, a first-time user gets zero feedback that the thing is interactive.

## ADOPT / wave-seed list

Ordered by impact-to-effort. All are fragment-shader or composable-local; none touch the substrate.

- **W-seed 1 — Fresnel rim + fake-normal specular (visual, highest ROI).** Derive a fake normal from the SDF gradient (`fwidth`/central-diff on `d`, already computing `fwidth(d)` at `metaball.frag.ts:149`), add a fresnel rim term tinted toward `--foreground` and a single soft specular lobe. Pure shader, ~15 lines, no new uniforms beyond a light-dir constant. *This alone makes it read premium.*

- **W-seed 2 — Subsurface/translucency inner gradient.** Replace the flat inner-glow (`metaball.frag.ts:166-168`) with a thickness-driven warm SSS tint (OKLCh lightness+chroma lift toward body center) so the blob reads translucent over warm-cream glass. Shader-local.

- **W-seed 3 — Wire idle pointer-follow + at-rest reactivity (interaction).** Give `idle` a small non-zero `pointerAttraction` (`useBlobMood.ts:16`) OR default `BLOB_CONFIG_DEFAULTS.pointerAttraction` > 0 (`types.ts:122`) so hover always deforms the blob toward the cursor — closing the "looks inert" gap. Optionally spawn/bias one satellite toward the smoothed pointer (a goo tendril reaching for the cursor — the Codrops droplet pattern), reusing `useBlobSatellites`.

- **W-seed 4 — Press squash-and-stretch on click (interaction).** Wire the existing `click` emit internally to a keyframes.js spring impulse on `pulseAmp`/`smoothK` (overshoot then settle) — a felt "boop". Replace or augment the discrete `nudge()` (`useBlobSatellites.ts:317`) with this. keyframes.js is already a peer dep.

- **W-seed 5 — Auto-mood from interaction (interaction polish).** Internally drive `setMood` from pointer/idle state (e.g. pointer present → `curious`/`happy`; long idle → `sleepy`) so the 5-mood engine (`useBlobMood.ts`) actually animates without the consumer wiring anything. Keep `setMood`/`currentMood` exposed for manual override.

- **W-seed 6 — Demo: an interactive playground story (proof + 2nd-consumer).** The current story (`goo-blob.vue`) mounts static swatches only. Add a story that exercises hover-follow, click-squash, a mood switcher, and `nudge` — this is also the honest 2nd consumer that proves the interactive seams (the W7 DEC-AT-5 consumer-#2 discipline).

- **W-seed 7 — On-screen idle park (perf, optional).** Today `shouldContinue` is always true (`useMetaballRenderer.ts:319-321`) so the blob never parks while visible. If interaction lands, consider parking after N seconds of no pointer + settled satellites (let `shouldContinue` return false when truly idle), waking on `pointermove`. Lower battery cost for a decorative element. Verify against the offscreen-park gates before adopting.

**Do NOT touch**: the `useWebGLCanvas` suspend-set / offscreen-park / PRM machinery (W7, mature), the injected `ColorResolver` seam, the OKLCh+OETF color path (gate-locked by `proof:blob-space-gamma` / `proof:blob-color-equivalence`), the shared `procedural-color.glsl` splice. Any new color math must ride the existing OETF, not a parallel path.

## Sources
- [Codrops — Interactive droplet-like metaballs with Three.js & GLSL (Jun 2025)](https://tympanus.net/codrops/2025/06/09/how-to-create-interactive-droplet-like-metaballs-with-three-js-and-glsl/) — smoothMin blending, surface noise, mouse-trail stretch, spring/squash for mascots
- [Sphere Rim Lighting with Fresnel — Shadertoy](https://www.shadertoy.com/view/sdjGR3) — fresnel rim term
- [SDF in Metal: Adding the Liquid to the Glass — Victor Baro](https://medium.com/@victorbaro/sdf-in-metal-adding-the-liquid-to-the-glass-69abd57e2151) — SDF gooey/liquid premium feel
- [GPU Gems 16 — Real-Time Approximations to Subsurface Scattering (NVIDIA)](https://developer.nvidia.com/gpugems/gpugems/part-iii-materials/chapter-16-real-time-approximations-subsurface-scattering) — thickness-from-distance translucency
