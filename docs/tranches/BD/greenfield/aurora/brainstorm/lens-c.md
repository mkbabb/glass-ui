# Aurora greenfield — LENS C: AUDACIOUS CARTOON-TECHNICOLOR PUNCH

> Lens: maximum 1940s-technicolor FLOW & PUNCH — bold cartoon shadowing, exaggerated
> squash/stretch/morph, anticipation + follow-through + overlapping action + arcs, real
> weight & inertia; the boldest, most-alive variant (still idiomatic + cross-engine).
> Subject: the `<Aurora>` field engine + the TWO new metallic mediums (pure liquid-metal +
> gradient-metallic-sparkle) + the NEW blurred-macro-flower bg + per-page custom fields.

---

## 0. The live verdict (chrome-devtools `/substrates/aurora`, both modes)

I navigated the demo and read the field in both modes + enumerated every wired preset.

- **Light mode reads PALE.** The default `Sky`/warm-cream smooth field is a soft
  pink→peach→lilac pastel — *pleasant, but low-chroma*. The library `DEFAULT_AURORA_CONFIG`
  palette tops out at `C:0.10` (`{L:0.72,C:0.10,h:55}` … `{L:0.95,C:0.03,h:70}`) — that is a
  WHISPER of color. Over a flat page it is exactly the "warm plate over a flat page reads
  gray" failure the brief names: there is not enough chroma BEHIND the glass for the glass to
  read transmissive. **Answer to brief-(a): the current smooth default is TOO PALE to be the
  load-bearing §3 field.** It is a content-deferential ground, not a vivid field.
- **Dark mode reads RICHER** — a blue→amber sweep with visibly deeper chroma + contrast. So
  vividness is mode-coupled, and the *light-mode chroma ceiling* is the specific defect.
- **NO metal, NO sparkle, NO blurred-image anywhere.** The 13 wired presets are ALL
  smooth/painterly (Sky, Dawn, Meadow, Deliberative, Day9, Oil×3, Van Gogh, Crayon, Speedtest).
  `hasMetal/hasBlur/hasSparkle` all `false` in the demo DOM. The metallic + blurred-image are
  **100% net-new** — this matches `W-AURORA-METALLIC`/`W-BLURRED-IMAGE-BG`/`BD.W-DOT-IMAGE`
  (no `copyExternalImageToTexture`/`texImage2D` in `src/`).
- **The demo copy still claims "WebGPU-first procedural painterly gradient"** even though
  `DESIGN.md §10 Δ09a` excised the WebGPU backend root-and-branch (single-pass WebGL2,
  unconditionally). That is a stale-claim seam, but orthogonal to this lens.

So the field engine is architecturally excellent (the single-pass painterly engine + the
structure-tensor ETF + the OKLCh color core + the offscreen-park/PRM substrate is SOTA) but
its DEFAULT identity is under-saturated for its new load-bearing §3 job, and the two metallic
mediums + the blurred-macro-flower field do not exist yet.

---

## 1. THE CORE IDEA — Aurora is a TECHNICOLOR FILM STOCK, not a watercolor

The 1940s-technicolor lens reframes the whole engine. Technicolor (the 3-strip dye-transfer
process) had a specific look: **hyper-saturated primaries, deep-black shadow density, a
luminous highlight bloom, and a slightly exaggerated separation between color zones** — color
that PUNCHES. Disney's *Fantasia* (1940), *The Wizard of Oz* (1939), the Fleischer Superman
shorts: bold flat color fields with crisp dark cel-outlines and a glossy specular pop.

The current Aurora is wet-on-wet watercolor — soft, bleeding, low-contrast. **The greenfield
move is not to replace that medium but to add a TECHNICOLOR FINISH AXIS that the metallic
mediums + a punched smooth-default ride**: a final-stage operator that lifts chroma, deepens
shadow, and blooms the highlight — the dye-transfer pop. This is the unifying through-line: the
metallic mediums ARE technicolor (mercury chrome IS deep-black-shadow + near-white-crest +
gold-Fresnel-tint — the maximum dynamic-range read); the blurred-macro-flower IS technicolor
(a real macro-bloom's saturated organic hues, dramatized by blur); and the smooth default gets
a `vivid` knob that pushes it off pastel toward the §3 field.

**ONE engine, three new registers, ALL reached by re-parameterizing or appending to the
existing single-pass dispatch — never a fork** (`DESIGN.md` invariant 8 + `BD.W-FIELD-ENGINE`
DRY law). Concretely:

1. **`finish: "metal" | "metal-gradient"`** — the metallic mediums as TWO `uMedium` slots
   (8/9 at HEAD — `MEDIUM_ID` stops at kuwahara:7, so metal slots NEXT, the `satisfies Record`
   forces it; NOT 10/11 which assumed phantom satin/prism), authored per `BD.W-AUR-METAL` (the
   two-term BRDF + cursor-as-light z-synth + twinkle-in-place + the `medium`/`finish` split).
2. **`source: "image"`** on the substrate — the blurred-macro-flower as a TEXTURE source whose
   per-zone blur radius is driven by the EXISTING `nucleiField` drift (the §3 macro-bloom).
3. **`vivid: 0..1`** — a technicolor punch knob on the post-stage (chroma-lift + shadow-deepen
   + highlight-bloom in OKLCh, gated so the pastel default is `vivid:0` byte-identical).

---

## 2. THE SINGLE BOLDEST MOVE — "THE INK & PAINT" register: a hard cel-outline over the liquid metal

> The one audacious, lens-defining move. Everything else unions cleanly with the BD specs;
> THIS is the technicolor-cartoon swing the lens demands and the other lenses will not make.

**1940s cel animation = flat punched color FILLED inside a hand-inked BLACK OUTLINE.** That
crisp dark contour is the single most identifiable cartoon signature, and it is *exactly the
term the metal critique says the current BRDF is missing*: the structure-tensor already computes
`A` (coherence) and the luma-gradient `N` (the height-field normal, currently DISCARDED at
`mediums.glsl.ts:89`). **Re-plumb that discarded gradient not only into the metal crest term
(N·H, as BD.W-AUR-METAL requires) but ALSO into a CEL-OUTLINE term: where the gradient magnitude
is high (a color-zone boundary), lay down a dark technicolor contour** — the inked edge of the
cel. The result: the liquid-metal field reads as a *Fleischer-Superman chrome robot* — molten
metal flow with anisotropic catch-lights, PUNCHED into hard-edged color cels with inked
boundaries. No other lens produces this; it is the literal fusion of the cartoon register with
the metal BRDF, and it costs ZERO extra taps (the gradient is already computed for the streak).

```glsl
// THE INK PASS (the boldest move) — a dark technicolor cel-outline keyed to the SAME
// luma-gradient the metal crest term consumes. Zero extra taps: |∇L| is the Sobel
// magnitude structureTensorField already computes (the re-plumbed N from BD.W-AUR-METAL).
float gradMag = length(vec2(Gx, Gy));            // re-plumbed, not re-paid
float ink = smoothstep(uInkLo, uInkHi, gradMag); // a HARD step → a crisp contour, not a haze
// The ink darkens toward a deep technicolor shadow density (NOT pure black — the warm
// floor holds: a deep warm-umber, oklch L~0.12). Anti-aliased by the smoothstep band.
col = mix(col, INK_SHADOW, ink * uInkStrength);  // uInkStrength=0 → byte-identical (default OFF)
```

`uInkStrength` defaults `0` so the ink pass is **OPT-IN** — the smooth/watercolor/oil mediums
are byte-unchanged (the gate's byte-identical fence holds). It is forced ON for the metallic
finishes (where the cel-outline IS the cartoon-chrome read) and offered as a `cel: true` flag
on any medium for the consumer who wants the full ink-and-paint register. The ink is the
**cartoon SHADOWING** the law demands (the 1940s layered-offset shadow, here as a contour), and
because it keys off the structure tensor it FLOWS with the field — the outline breathes and
drifts as the nuclei move (the FLOW), squashing and stretching as zones merge (the morph). This
is the technicolor-cartoon PUNCH applied to a generative field: nothing in the reference set,
nothing in the other lenses, does an inked-cel generative aurora.

---

## 3. THE METALLIC MEDIUMS — visual + motion + mechanism (unions BD.W-AUR-METAL)

The lens AMPLIFIES the BD.W-AUR-METAL spec rather than diverging from it — that spec is already
the honest, substrate-grounded re-scope (re-plumbed N, both-term BRDF, cursor-light z-synth,
twinkle-in-place, the medium/finish split). The lens adds the technicolor DR-push + the ink.

### 3a. `finish: "metal"` — PURE LIQUID CHROME/MERCURY (ref 1)

**Visual:** a monochromatic high-DR metal flow field — draped molten ridges with sharp
anisotropic catch-lights riding the crests, deep-shadow valleys, the Fleischer-robot chrome.
The technicolor register makes this read as POLISHED metal (max dynamic range: near-white crest
→ deep-warm-shadow valley) not brushed-grey.

**Mechanism (the two-term BRDF, BD.W-AUR-METAL §2, re-confirmed against `mediums.glsl.ts`):**
- **Re-plumb the discarded `N`** — widen `structureTensorField`'s return to carry the luma
  gradient (`return vec4(dir, A, packGrad(Gx,Gy))`); the `.xy`/`.z` callers (kuwahara `:402`)
  stay byte-stable, metal reads the new `.w`. `N = normalize(vec3(Gx, Gy, METAL_HEIGHT_SCALE))`.
- **streak (WHERE) `pow(sinTH, ANISO)`** along the tensor tangent `T` — the highlight runs
  ALONG the ridge (the molten streak), gated on coherence `A` via `mix(1.0, 0.34, A)` (the
  SHIPPED kuwahara form, NOT a `(1-A)` fork — the critique §3.4 bite) so flat zones stay smooth.
- **crest (BRIGHTNESS) `pow(NdotH, CREST)`** — the `N·H` height-normal specular sets the
  valley→crest roll-off (dark valleys, bright crests — the term the critique §1A says the
  current form drops). BOTH terms required or it reads as a tinted tensor-orientation map.
- **cursor-as-light z-synth** — `lightDir3D = normalize(vec3(uCursor - p, METAL_LIGHT_Z))`; the
  light CROSSES to WGSL because `uCursor` does (no phantom `uLightDir` lane). Idle → a static
  upper-right rake so a non-interactive metal backdrop still reads lit.
- **achromatic-warm catch-light** — the crest is white-toward-warm (the warm floor), NO hue
  injected (the metal read is from SHADING not hue; `warmCatchLight` OKLCh anchor).
- **+ the lens TECHNICOLOR push**: the metal applies the `vivid` post-operator at HIGH default
  (deepen shadow density on the valleys, bloom the crest highlight) — this is what turns
  "grey brushed metal" into "polished chrome PUNCH". And `cel`/ink forced ON.

**Motion (the lens — weight & inertia):** the catch-light has WEIGHT — when the cursor moves,
the highlight does NOT snap to the new rake angle; it follows with the existing cursor easing
(position lerp 0.22/frame, the inertial pursuit). As the nuclei drift, the metal ridges
**flow** under the static flake field (overlapping action: the flake stays put — twinkle-in-
place — while the ridges slide beneath, the two motions decoupled). The cel-outline squashes
and stretches as ridges merge (morph-more-on-move). PRM → the rake freezes to the idle axis,
the flow stops, zero frames (the substrate park is untouched).

### 3b. `finish: "metal-gradient"` — GRADIENT-METALLIC SPARKLE (ref 2)

**Visual:** a soft warm multi-tone gradient (copper→bronze→gold, the consumer palette) suffused
with fine high-frequency metallic-FLAKE sparkle catching the light + subtle per-region hue
variation — a shimmering metallic wash, diffuse (no sharp ridges).

**Mechanism:** `mediumMetalGradient` = `mediumMetal`'s BRDF over a PRE-FLATTENED base (the
brushed-sheet read — a `mediumMetal` call with the smoothed `col`, NOT a separate BRDF), the
coherence gate keeping its smooth zones SMOOTH (no phantom banding — the critique §3 fix the
metal-gradient variant RELIES on). PLUS the **sparkle**:
- **twinkle-in-place, fixed seed** — `hash21(floor(p * METAL_SPARKLE_DENSITY))` per-cell
  STABLE seed, the PHASE animated `sin(t + seed*TAU)` (advances the PHASE, not the position —
  the critique §1c boil trap; the flake stays put, the glint pulses). `highp` hash forced
  (a `mediump` hash boils across backends).
- **orientation-gated** — each glint gates on the local highlight so sparkles catch the light
  (metallic FLAKE, not film grain).
- **+ the lens TECHNICOLOR push**: the `vivid` operator lifts the copper/bronze/gold chroma so
  the gradient reads as RICH metal, not muddy beige; the per-region hue variation (the "other
  colors therein") is the OKLCh per-nucleus `paletteBias` already in the engine — the lens just
  pushes its chroma.

**Motion (the lens):** the sparkle GLINTS slowly (the twinkle phase), the gradient zones DRIFT
(the nuclei drift), the two decoupled (overlapping action). On cursor, a glint BLOOM about the
pointer (the local highlight rises as the cursor-light rakes near) — a follow-through pulse.

### 3c. The `medium`/`finish` SPLIT (BD.W-AUR-METAL §4 — minted here)

`MEDIUM_CLASS: Record<AuroraMedium, "medium" | "finish">` — `medium` = paint SUBSTANCE
(smooth/oil/vangogh/etc); `finish` = a relighting/smoothing OPERATOR over the field
(kuwahara re-classed `finish`, metal/metal-gradient join as `finish`). The `vivid` post + the
`cel`/ink are ALSO finishes (operators over the field) — the lens's technicolor axis SLOTS into
the split cleanly. The split is a taxonomy + a doc register, NOT a second runtime enum (the
`uMedium` ladder stays ONE integer dispatch).

---

## 4. THE BLURRED-MACRO-FLOWER FIELD — visual + mechanism (unions W-BLURRED-IMAGE-BG)

### 4a. The target + the lens

A base macro-flower image (soft organic saturated color — the ideal glass-refraction backdrop)
rendered DRAMATICALLY BLURRED with ZONE-VARYING blur that DRIFTS like aurora. The lens makes the
macro-bloom TECHNICOLOR: a real macro shot of a saturated flower (a poppy's crimson, a
ranunculus's layered orange, a dahlia's magenta) is ALREADY hyper-saturated organic color — blur
it and it becomes a drifting field of pure punched hue. This is the §3 field at its most vivid,
sourced from reality instead of a synthetic palette.

### 4b. The mechanism — a SOURCE axis on the substrate, single-pass

The KISS union: `<Aurora source="image" :src="...">` (or a sibling `<BlurredImage>` thin
wrapper that IS an Aurora with `source:"image"` — ONE engine). The substrate gains a `source`
axis: `"procedural"` (today's nuclei field, the default) | `"image"` (the texture). The blur is
the NEW operator:
- **Spatially-varying Gaussian over a clamped tap loop, single-pass** — `DESIGN.md` invariant 8
  forbids FBO ping-pong, so this is NOT a dual-Kawase downsample chain (which needs multiple
  render targets). Instead: a per-fragment **bounded Gaussian tap loop** (e.g. 3 rings × 8 taps
  = 24 elliptical samples, the kuwahara budget precedent — that exact tap count already ships
  and clears the perf budget) whose RADIUS per fragment is driven by the drifting nuclei field:
  `radius(p,t) = mix(BLUR_MIN, BLUR_MAX, nucleiBlurField(p, t))`. The SAME softmax-Gaussian
  nuclei the procedural field uses, but the nuclei drive the BLUR AMOUNT per zone, not the
  color (`W-BLURRED-IMAGE-BG` mechanism, verbatim). Some zones sharp-ish, some dramatically
  dissolved; the zone boundaries DRIFT (the `nucleiDrift` model) — so the blur breathes like an
  aurora. NO second engine, NO new rAF — the ONE substrate leaf.
- **Color from the SAMPLED IMAGE** (the macro-flower's organic hues), linear-light handled via
  the shared OETF/OKLCh chunk (the `field/color` move in `BD.W-FIELD-ENGINE`).
- **The texture upload is the cross-backend hazard** (`BD.W-DOT-IMAGE §3` — but here on the
  Aurora substrate, NOT the dot shell): `copyExternalImageToTexture` vs `texImage2D` carry
  different premultiply/colorspace/flipY semantics. Since Aurora is WebGL2-ONLY now (WebGPU
  excised), this is SIMPLER than the dot case — ONE `texImage2D` path with explicit
  `pixelStorei(UNPACK_PREMULTIPLY_ALPHA_WEBGL,false)` + `UNPACK_COLORSPACE_CONVERSION_WEBGL,NONE`
  + `UNPACK_FLIP_Y_WEBGL,false`, decoded via `createImageBitmap(blob,{premultiplyAlpha:"none",
  colorSpaceConversion:"none"})`. (If/when a WebGPU backend re-opens with a named consumer, the
  capture-pair parity gate from BD.W-DOT-IMAGE applies; today it's single-backend.)
- **+ the lens technicolor push**: the `vivid` operator lifts the bloom's chroma so the blurred
  flower reads as a SATURATED drifting field, not a desaturated smear.

### 4c. The macro-flower ARRAY (presets-in-consumers)

The library ships `<Aurora source="image" :src>`; the macro-flower array is CONSUMER ASSETS
(presets-in-consumers — the library NEVER bundles a demo image as a token). The demo provides a
curated sample array (researched: soft high-color organic macro shots — a crimson poppy, an
orange ranunculus, a magenta dahlia, a blue cornflower macro). A `:src` array + a slow
cross-fade (the existing breath clock) is the per-page-varied register.

### 4d. PRM + perf

PRM → a single static blurred frame (the radius field freezes, no drift — the substrate's
existing PRM-freeze). Offscreen-pause via the existing content-visibility/tab-hidden park (the
ONE lifecycle leaf — a parked frame attaches zero taps). The 24-tap loop rides the SAME
offscreen-park; cost is the kuwahara-class budget the suite already clears.

---

## 5. PER-PAGE CUSTOM FIELDS — the preset/config API (brief-(d))

The user wants each demo page to carry a DIFFERENT field (its own palette/medium/source), NOT
the constellation default — to best display the glass per the §3 mandate.

**Mechanism — `W-PAGE-BACKGROUND` extends, no new machinery:** the page-background system
already stages an Aurora behind each route. The extension is a per-route `auroraField` resolver:
each demo page declares its field (a varied Aurora atoms preset OR a `source:"image"`
macro-flower OR a `finish:"metal"` field). This is the EXISTING `resolveAtoms` door — the
≤7-atom surface (`seed`+`harmony`+`colorEnergy`+`zones`+`noise`+`medium`+`motion`) — so a page
declares `{ seed: <route-hue>, colorEnergy: 0.9, medium: "smooth", vivid: 0.8 }` and gets a
vivid per-page field for free. The `vivid` knob folds into `colorEnergy` (it IS the
chroma/value/breath co-varying cluster the atom already moves — the lens just lifts its ceiling).

**The default identity shift (brief-(a) fix):** the library `DEFAULT_AURORA_CONFIG` palette
chroma is lifted from the pastel `C:0.10` ceiling toward a `C:0.16–0.20` band (still warm-cream
identity, hue 45–70 — NOT teal/navy, the W-NO-GRAY law holds) so a BARE `<Aurora>` reads as a
VIVID warm field, not a pale wash. This is the library's OWN identity evolving (a "lib's own
default tokens evolve as the lib's identity changes" memory-rule case — NOT a consumer preset).
The §3 field is now vivid-by-default.

---

## 6. DEFT INTEGRATION — the union map (no fork, KISS, DRY)

| New register | Composes (extant) | NET-NEW | Fork avoided |
|---|---|---|---|
| `finish:"metal"` | structureTensorField (re-plumbed N), the cursor uniform, OKLCh core, the post-stage | the 2-term BRDF body + cursor-light z-synth + 2 knobs (pack free kuwahara-vec4 slots) | NOT a new shader/substrate — a `uMedium==8` body |
| `finish:"metal-gradient"` | mediumMetal BRDF over flattened base | the sparkle (1 hash + phase) | NOT a second BRDF — `mediumMetal` over pre-flattened col |
| `vivid` technicolor post | the existing `saturate3`/`aces` post-stage in OKLCh | a chroma-lift + shadow-deepen + bloom term (default 0 = byte-id) | NOT a new pass — appends to the post |
| `cel`/ink (THE BOLD MOVE) | the SAME re-plumbed luma gradient | a hard-step contour term (default OFF) | ZERO extra taps — reuses the metal's gradient |
| `source:"image"` blurred-flower | the nucleiField drift, useWebGLCanvas, the OETF/color chunk | a `texImage2D` path + a bounded Gaussian tap loop | NOT a `<BlurredImage>` parallel engine — an Aurora source axis |
| per-page custom | resolveAtoms + W-PAGE-BACKGROUND | a per-route `auroraField` resolver | NOT a new config system — the atoms door |

Every new register is reached by `medium`/`finish`/`source`/`vivid`/`cel` — a re-parameterization
or an APPENDED opt-in body on the ONE single-pass dispatch. The smooth/oil/vangogh/kuwahara
mediums + the procedural source + `vivid:0`/`cel:false` defaults are BYTE-IDENTICAL (the gate
fence). This is the `BD.W-FIELD-ENGINE` DRY discipline: ONE field engine, N modes, no parallel.

---

## 7. CROSS-ENGINE (Chrome + Safari) + a11y/PRM

- **WebGL2-only, single-pass** (DESIGN.md invariant 8; WebGPU excised Δ09a). So the
  cross-engine surface is WebGL2 in Chrome vs WebGL2 in WebKit/Safari — NOT the WGSL/GLSL parity
  hazard the BD specs guard (those assume a WebGPU primary; Aurora has none today). The
  WebKit-fragile ops to fence: `pow(x, highExponent)` (the sharp metal crest — clamp the
  exponent + `highp`), `fract(p.x*p.y)` (the sparkle hash — `highp`, per-cell floor'd seed so
  precision drift can't relocate a flake), `atan(sin,cos)` (the wrap idiom — already shipped).
- **The texture path (blurred-flower)** is the ONE genuine cross-engine seam: explicit
  `pixelStorei` premultiply/colorspace/flipY on the WebGL2 upload (Safari's defaults differ),
  `createImageBitmap` with explicit decode options. A π capture-pair (Chrome WebGL2 vs WebKit
  WebGL2 render of the same image) is the binding proof.
- **PRM** — every motion axis routes through the existing `masterTempo()` scalar (returns 0
  under `prefers-reduced-motion:reduce`); the cursor write-path early-outs on `reducedMotion`.
  The metal rake freezes to idle, the sparkle phase freezes, the blur radius field freezes to
  one static frame, the ink contour is static. PRM → ONE static frame, zero rAF (the substrate
  park, untouched). WCAG 2.2.2 (pause via DockBackgroundToggle) + 2.3.3 (animation-from-
  interaction, the cursor axis) bound.
- **Glass over the field** — the whole point: with `vivid` lifting chroma + the metal/flower
  registers, the §3 field is finally saturated enough that warm-cream transmissive glass over
  it reads TRANSMISSIVE-not-gray (the brief's load-bearing requirement). The `opacity-ceiling`
  prop already lets content-dense routes recede the field behind text.

---

## 8. THE WAVE AMENDMENT (delta-assay → AUGMENT, no dup vs the 116 union waves)

- **AUGMENT `W-AURORA-METALLIC` / `BD.W-AUR-METAL`** — ADD: (1) the `vivid` technicolor
  post-operator (chroma-lift + shadow-deepen + highlight-bloom in OKLCh, default 0 byte-id) as
  the dynamic-range push that makes metal read POLISHED not brushed; (2) **the `cel`/ink pass —
  the boldest move — a hard-step technicolor cel-outline keyed to the re-plumbed luma gradient
  (zero extra taps), default OFF, forced ON for the metallic finishes** — the cartoon-SHADOWING
  register the law demands, applied to a generative field. Both fold into the `finish` axis the
  metal wave mints. KEEP the wave's entire honest substrate scope (re-plumbed N, 2-term BRDF,
  cursor-light z-synth, twinkle-in-place, the medium/finish split, slots 8/9 at HEAD).
- **AUGMENT `W-BLURRED-IMAGE-BG`** — REFRAME the `<BlurredImage>` as an Aurora `source:"image"`
  axis (ONE engine, not a sibling component — the KISS/DRY union); the spatially-varying blur is
  a single-pass bounded Gaussian tap loop (the kuwahara tap-budget precedent, NOT a dual-Kawase
  FBO chain — invariant 8); the `vivid` operator lifts the bloom chroma. KEEP the nuclei-driven
  zone-blur-drift + presets-in-consumers macro-flower array + PRM-static-frame.
- **AUGMENT `BD.W-FIELD-ENGINE`** — the `source` axis (procedural/image) is the construction-time
  permutation the field-engine DRY hoist enables; the `field/color` WGSL-twin move is moot now
  (WebGPU excised) — the GLSL `procedural-color` chunk + the value-noise basis are the shared
  source the metal/blur/procedural all splice. No dup: the field-engine wave OWNS the basis
  hoist; this lens OWNS the source-axis + the technicolor/cel/blur OPERATORS over it.
- **Library identity shift (NOT a new wave — a `DEFAULT_AURORA_CONFIG` chroma lift)** — raise the
  default palette chroma from `C:0.10` to `C:0.16–0.20` (warm-cream, hue 45–70) so the bare
  field is vivid-by-default (brief-(a) fix). Reuses the W-NO-GRAY warm-floor law.
- **No dup vs the dot-flow / dot-image waves** — those own the DOT shell's texture/coverage; this
  owns the AURORA substrate's image source. Distinct hosts, shared upload discipline.

---

## 9. CONVERGENCE

- Field engine architecture: ~95% (SOTA single-pass painterly; the gap is the pale DEFAULT chroma
  + the missing vivid knob — a calibration + 1 post-operator).
- Metallic mediums: ~0% built / ~90% specced (BD.W-AUR-METAL is implementation-ready; the lens
  adds the vivid push + the cel/ink — both small appended operators).
- Blurred-macro-flower: ~5% (the substrate + nuclei drift + park ship; the source-axis + texImage2D
  + the bounded-Gaussian blur loop + the macro-flower array are net-new but all single-pass-cheap).
- Per-page custom: ~70% (resolveAtoms + W-PAGE-BACKGROUND ship; the per-route resolver + the vivid
  fold are small).

**Weighted: the field is assembly/calibration-bound for vividness + per-page, and BUILD-bound for
the metallic + blurred-flower — but EVERY new register unions cleanly onto the ONE single-pass
engine via an appended opt-in body or a re-parameterization. No fork, no second substrate, no
second rAF. The lens's signature contribution is the TECHNICOLOR DYNAMIC-RANGE PUSH (vivid) + the
INK-AND-PAINT CEL-OUTLINE (the boldest move) — the cartoon register that turns the field from a
soft watercolor into a punched, alive, transmissive §3 ground.**
