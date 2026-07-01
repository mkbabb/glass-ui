# KS-PAPER — SOTA research (SUBTLE paper morphism, 2026)

**Lane:** KS-A · PAPER · SOTA researcher. **Date:** 2026-07-01 · **HEAD:** `fa6ed40a` (tranche/BG).
**Waves this feeds:** 14.1 `W-PAPER-TEXTURE-UNIFY` / `-GRAIN-REAL` (raster tooth PRIMARY) · 14.3-adjacent
congruence · 17.5 `W-GLASS-PAPER-CONGRUENCE` · the LX.2 no-double-warm CEILING (owned by 14.1).
**Fence honored:** research + verdicts only; ZERO src/demo/scripts edits; siblings read-only; every corpus
claim cites file:line; every SOTA reference is named + linked.

This report is the SOTA half of the KS-PAPER keystone. It does NOT restate the mechanism (the corpus already
carries it — see §0). It (a) grounds the corpus decisions in named 2026 SOTA, (b) resolves the ONE live tension
in the plan (raster-primary vs the twice-built feTurbulence), (c) supplies the perceptual numbers the build
calibration needs, and (d) issues ADOPT/REJECT verdicts per finding.

---

## 0 · The corpus the SOTA must serve (build on; never re-derive)

The paper register has been designed THREE times; the tension the KS spec must resolve is which one is PRIMARY.

1. **BD greenfield GOLDEN + what LANDED on disk** (`docs/tranches/BD/greenfield/paper-morphism/GOLDEN.md`;
   `src/styles/paper.css:44`): a **grey** `feColorMatrix saturate=0` speckle, `baseFrequency='0.04 0.09'` coarse
   anisotropic tooth, `feComponentTransfer` slope-1.8/intercept-(-0.4) contrast-stretch, `feFuncA slope=0
   intercept=1` full-opaque, `color-interpolation-filters='sRGB'` pinned, 140px tile, composited via
   `multiply` (light) / `screen` (dark). Opacity `0.21` light (`glass-fx.css:31`) / `0.16` dark
   (`dark-arm.css:247`). This is the CURRENT `src/` state.
2. **BG-WS9 pass-2 `W-PAPER-GRAIN-REAL`** (`docs/tranches/BG/converge/BG-WS9-paper-deep/SPEC-pass2.md:47-74`):
   replace `feColorMatrix saturate=0` (chroma-0 = the grey the user condemned) with a **warm** `feDiffuseLighting`
   MATTE-diffuse relief over the turbulence ALPHA height-field, warm `lighting-color` HEX ecru, `azimuth='290.56'`
   gate-locked to `--glass-key-direction`, `elevation='55'`, `kernelUnitLength='1 1'`, `surfaceScale` swept 1.0–1.7.
   Pre-wires a **committed raster-asset fallback** as the "pre-decided branch the P1 prototype's verdict selects"
   (`:74`) — engaged if the live capture reads metallic/film/brushed-metal (the structural sheen risk, `:201`).
3. **BG RESPEC-GESTALT amendment (the LIVE plan, row 14.1)**
   (`docs/tranches/BG/audit/RESPEC-GESTALT/AMENDED-GESTALT-PLAN.md:98`;
   `pass-2/DEV-A2-restructure-rows-10-19.md:241-247`): **INVERT the priority** — the committed warm scanned/generated
   tooth-tile **raster is the PRIMARY born-RED close anchor** (engine-stable by construction: it kills the Safari
   `lighting-color` colorspace risk + cross-engine determinism risk + metallic-recurrence risk in ONE move);
   `feDiffuseLighting` over `feTurbulence` is **DEMOTED to a progressive-enhancement layer OVER the raster,
   sequenced second, `@supports`-gated**. Same token (`--paper-grain-tooth`), same multiply/screen blend law, same
   seed leaf — *"a transposition, not a third procedural attempt at the exact mechanism the eye rejected"* (`:246`).

**The binding history (the fence in SEED-KEYSTONES.md line 54 — "the twice-rejected feTurbulence history is
BINDING"):** the user rejected the SVG-noise paper register TWICE, verbatim *"disgusting metallic"*
(`DEV-A2:241`). The escape branch of WS9 pass-2 is now the DEFAULT. This report's #1 job is to confirm, from SOTA,
that **raster-primary is not a retreat — it is the state of the art for this exact problem.**

**The single-light spine (17.5 + 14.0 GU-1 token):** `--glass-key-direction: -0.375` = tan 20.56° down-left, the
soft-FILL lean; the key comes FROM the upper-right at `azimuth = atan2(-1, -(-0.375))·180/π mod 360 ≈ 290.56°`
(`GU-1-glass-key-fill.md:23`; WS9 `SPEC-pass2.md:45`). One light governs glass specular, the under-shadow fill,
AND the paper tooth relief (`SPEC-pass2.md:18`). 17.5 `W-GLASS-PAPER-CONGRUENCE` owns the `--glass-key-*` SPINE
that ties WS8-bevel + WS9-tooth to ONE source (`FINAL.md:207,303-304`); a data-URI cannot read `var()`, so the
azimuth ships as a HARDCODED literal `290.56` gate-locked `|literal − 290.56| < 1°` (`SPEC-pass2.md:45`). **The
raster-primary decision does NOT dissolve this spine** — the `@supports` `feDiffuseLighting` enhancement still
carries the azimuth, and the raster tile is BAKED with a directional relief leaning the same hemisphere (see §7).

---

## 1 · SOTA landscape — the 2026 texture-in-UI movement (all five axes at a glance)

The 2026 zeitgeist is **DIRECTLY aligned with the paper register's design intent** — this is not a niche move, it
is the dominant trend, and the corpus's "SUBTLE where subtle" mandate is exactly the discipline SOTA prescribes.

- **"Tactile Maximalism" / "texture, warmth and tactile rebellion"** is the headline 2026 graphic + web-design
  trend: a deliberate pivot away from flat vector "digital sterility" toward paper, grain, fabric, and glass that
  *"mimic the physical world"* — explicitly the **anti-AI aesthetic** ("work that feels unmistakably made by human
  hands"). [Creative Bloq](https://www.creativebloq.com/design/graphic-design/texture-warmth-and-tactile-rebellion-the-big-graphic-design-trends-for-2026) ·
  [SNIX Tactile Maximalism 2026](https://www.snix.mt/post/tactile-maximalism-web-design-2026) ·
  [Fireart Web Design Trends 2026](https://fireart.studio/blog/the-best-web-design-trends/).
  **ADOPT (validation):** the whole KS-PAPER thesis (warm tactile paper, hand-voice HandMark, no-gray) is the SOTA
  center of mass. Cite this as the identity anchor, not a defense.
- **The mechanism SOTA prescribes is precisely the corpus's:** *"a subtle CSS grain filter or an animated SVG noise
  overlay... breaks up digital perfection and provides a tactile quality resembling printed paper"*; *"a 50px square
  repeating pattern of transparent noise can add grit to an entire page without adding significant weight"*; and,
  load-bearing for the metallic history, *"avoiding the processor lag associated with heavy WebGL
  implementations"* (Fireart / SNIX). The corpus's static-raster-`::after`, compositor-cached, ZERO-per-frame
  contract (GOLDEN §5; `paper.css:48-92`) IS the SOTA-endorsed path.
- **Grain must be PLAINLY VISIBLE but restrained** — the corpus's dual bar ("if you squint, it FAILS" — GOLDEN top;
  yet SUBTLE — SEED line) is the exact SOTA tension. The resolution (§4) is that "subtle" governs AMPLITUDE, not
  VISIBILITY: real letterpress tooth reads at 1× without a loupe (WS9 `SPEC-pass2.md:69`) yet ink coverage stays
  < half the area (letterpress law, §5).

---

## 2 · AXIS 1 — Paper/print texture without kitsch (grain amplitude · tooth scale · blend · warm tint)

### Findings
- **Blend law — multiply/soft-light is the 2026 SOTA sweet spot, and the poles matter.** SOTA consensus:
  *"the sweet spot appears to be 8-12% opacity range with either soft-light or multiply blend modes"*; *"Soft Light
  is the gentler sibling of Overlay, reacting to the brightness of the base layer with a softer, more natural
  contrast curve"* ([grain overlay opacity search]; [CSS-Tricks Grainy Gradients](https://css-tricks.com/grainy-gradients/)
  uses `mix-blend-mode: multiply` + `isolation: isolate`). **This VALIDATES the corpus's decisive move
  and its indictment of overlay:** overlay/soft-light collapse to identity on the L≈0.98 cream / near-black ink
  POLES where the paper register lives (GOLDEN §0.1, measured std 0.02–0.86; `paper.css:9-14`). The reason SOTA
  says "8-12% soft-light" works is that those tutorials paint on **mid-tone** backdrops; glass-ui's cream/ink poles
  need the physically-true **multiply (light) / screen (dark)** the corpus chose. **ADOPT the corpus's multiply/screen
  for the tooth; the SOTA 8-12% soft-light figure applies only to a mid-tone plate and is a REJECT for the poles.**
- **Coarse structured tooth over fine speckle — SOTA-confirmed by the film-grain frequency signature.** The single
  most important corpus visibility fix (GOLDEN §0.2, §1: "fine bf 0.65 averages to grey on hiDPI; coarse survives")
  is corroborated by the perceptual literature: *"the frequency domain signature of film grain for an adequate block
  size (e.g. 8×8) is closer to uniform texture rather than random texture"* and *"film grain pixel values fluctuate
  within a limited range"* ([film grain amplitude search]; [Wikipedia Film grain](https://en.wikipedia.org/wiki/Film_grain)).
  Real grain is STRUCTURED and bounded-amplitude, not TV static. **ADOPT:** the tooth must be a coarse, structured,
  bounded-amplitude field — which is exactly what a real scanned-paper RASTER tile IS by construction (§6), and what
  a raw high-`baseFrequency` feTurbulence is NOT (it is unbounded random speckle). This is an INDEPENDENT SOTA
  argument for raster-primary, distinct from the cross-engine one.
- **Warm substrate tinting — the wash is load-bearing.** SOTA: *"subtle beige noise at 8% opacity... adds warmth
  and premium feel"* — grain over a WARM base, not pure white ([grain overlay opacity search]). The corpus's
  `--story-paper-wash` 4% warm-`--foreground` tint in light (GOLDEN §3.5; DELTA-ASSAY §3.5; the "never-landed leg-2"
  flagged as a single-point-of-failure in challenge/2 R5) is the SOTA move: multiply is weakest at the pure-white
  top-end, so the tooth must bite on a faintly-tinted plate. **ADOPT — and make the washed-plate measurement the
  gate condition (not a bare-white control), per challenge/2 R5.**

### Verdict
The corpus's blend law (multiply/screen), coarse-tooth thesis, and warm-wash leg are all SOTA-confirmed. No change
to the DIRECTION; the SOTA sharpens the AMPLITUDE numbers (§4) and the substrate (§6).

---

## 3 · AXIS 2 — Film-grain/noise done right (raster tile vs feTurbulence vs CSS gradients)

**This is the decisive axis — it is where the raster-primary amendment lives or dies. SOTA verdict: raster-primary
is CORRECT.**

### The three techniques, SOTA-ranked
| technique | SOTA finding | verdict for the PAPER tooth |
|---|---|---|
| **feTurbulence SVG noise** | resolution-independent, tiny payload, *"look\[s\] sharp on retina"*; BUT *"can impact paint performance on large areas — especially on mobile"* and cross-engine blend/displacement differences are documented ([Daniel Immke](https://daniel.do/article/making-noisy-svgs); [Codrops feTurbulence](https://tympanus.net/codrops/2019/02/19/svg-filter-effects-creating-texture-with-feturbulence/); [CSS-Tricks Grainy Gradients](https://css-tricks.com/grainy-gradients/)) | **ENHANCEMENT layer only** — demote to `@supports`, exactly as row 14.1 amends |
| **raster PNG tile** | *"For performance-critical pages, use a small tiling PNG texture instead"*; seamless-mirror tiling *"algorithmically ensures the edges mirror each other perfectly"*; *"recommended starting point is 512px for performance"* ([uwarp nnnoise](https://www.uwarp.design/nnnoise); [tinkpro Noise Generator](https://tinkpro.com/noise-generator/)) | **PRIMARY** — the born-RED close anchor |
| **CSS multi-stop gradient noise** | a fallback trick, not paper tooth; no structured grain | REJECT for tooth |

### Why raster-PRIMARY is the SOTA answer to THIS problem (four converging arguments)
1. **Cross-engine determinism — the metallic-history killer.** The `feColorMatrix`/`feComponentTransfer`/
   `feDiffuseLighting` chain's default `color-interpolation-filters` is **`linearRGB`, not sRGB**
   ([MDN feDiffuseLighting](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feDiffuseLighting):
   *"handles color components in the linearRGB color space by default"*). challenge/2 R1 MEASURED a **51% std swing
   (3.65 → 5.54) and a 6-point mean-darken purely from this one attribute**
   (`docs/tranches/BD/greenfield/paper-morphism/challenge/2.md:56-72`). Chrome/Safari implement `mix-blend-mode`
   *"slightly differently"* and *"each implement relative displacement in a different way... for non-square filter
   inputs"* (CSS-Tricks; [nnnoise search]). A **baked raster is engine-invariant by construction — it ships the
   SAME pixels to every engine.** This is the single strongest SOTA argument and it directly retires the twice-
   rejected metallic risk (WS9 `SPEC-pass2.md:200-201`; `DEV-A2:243`).
2. **feDiffuseLighting is STRUCTURALLY sheen-prone.** MDN confirms it *"lights an image using the alpha channel as a
   bump map"* and computes surface normals from it; a single distant key over noise reads as anisotropic **metal
   sheen** at any non-trivial `surfaceScale` (WS9 M4, `SPEC-pass2.md:68`: *"specular IS the metal"*). The one thing
   the user rejected is exactly what this primitive is built to produce. *"A scanned tooth cannot read metallic"*
   (`SPEC-pass2.md:74`) — a photographed/generated matte paper surface carries diffuse relief with NO specular term.
3. **The `lighting-color` colorspace risk is Safari-only and silent.** WS9 M2 (`SPEC-pass2.md:66`): an
   `oklch()` `lighting-color` in a data-URI *"is unproven in Safari → falls back to white → metallic IN SAFARI
   ONLY"* — a silent one-engine regression. Even the HEX-ecru mitigation must be captured on REAL Safari
   (`wkshot.m`, not bundled Playwright — `SPEC-pass2.md:167`). A raster tile removes the risk entirely.
4. **Perf on large areas / mobile.** SOTA explicitly: SVG filter noise *"can impact paint performance on large
   areas — especially on mobile"* → *"use a small tiling PNG texture"* ([nnnoise search]). The
   `paper-underpaint` is a `position:fixed inset:0` fullscreen layer (`paper.css:48-52`) — the exact large-area
   case SOTA warns against.

### The costs of raster-primary (honest — and how to pay them)
- **Payload.** A raster tile is heavier than a ~600-byte data-URI SVG. Mitigation (SOTA + corpus): a **512px
  seamless-mirror tile** (the SOTA "recommended starting point", [tinkpro]) as a base64 data-URI in the SAME
  `--paper-grain-tooth` token. A grey/warm-ecru matte-paper tile at 512² compresses well as PNG-8 (the tooth is a
  narrow-band luminance field, few colors) or WebP; budget it and record the byte figure on `profile:budget` (the
  corpus already rebaselines that gate for texture growth — CLAUDE.md aurora-budget precedent). **REJECT** an
  uncompressed 1024² RGBA tile (payload blowout for no percept gain — the tooth is bounded-amplitude, §2).
- **DPR / retina crispness.** The SVG's headline advantage is resolution-independence. Mitigation: the tooth is a
  LOW-contrast luminance modulation composited at ~0.16–0.21 alpha via multiply/screen — sub-pixel softness at 2×/3×
  is IMPERCEPTIBLE (unlike a sharp line-art tile). A 512px tile at `background-size` in CSS px repeats cleanly;
  optionally ship a 2× companion behind `image-set()` if a P1 capture shows softness (unlikely at this alpha).
  `image-rendering` stays default (auto) — `pixelated`/`crisp-edges` would REINTRODUCE the hiDPI grey-averaging the
  corpus fixed (GOLDEN §0.2). **ADOPT default `image-rendering`; do NOT force pixelation.**
- **Determinism of the SOURCE.** The tile must be a COMMITTED artifact (a checked-in generated/scanned tile), not a
  build-time-generated one — so the "same pixels every engine" guarantee holds and the born-RED gate reads a fixed
  input. Generate it once (procedural fBm/turbulence baked to PNG via [tinkpro]/[nnnoise]/a Perlin baker, warm-tinted
  and directionally embossed — §7), commit it, gate its hash.

### The `@supports` enhancement — accept the corpus's demotion, with a fence
The `feDiffuseLighting` warm-lit relief is a REAL upgrade *where it renders faithfully* (crisp, directional,
resolution-independent). Ship it as row 14.1 amends: **`@supports`-gated OVER the raster**, sequenced second. The
fence: the enhancement must never be the SOLE paint (the raster is always the floor) and must lean the SAME 290.56°
azimuth as the baked tile (§7), so a supporting engine sees the SAME hemisphere-coherent relief, not a fork.
**ADOPT the demotion; REJECT any framing where the enhancement is load-bearing for the born-RED close** (that is the
3×-shipped "device-free-green / eye-rejects" trap, `SPEC-pass2.md:20`).

### Verdict
**Raster tooth PRIMARY is the SOTA-correct decision — endorsed independently by (a) cross-engine determinism,
(b) the structural sheen-proneness of feDiffuseLighting, (c) the Safari colorspace risk, (d) large-area/mobile perf,
and (e) the film-grain-is-structured-bounded-amplitude signature.** Row 14.1's amendment is not a retreat from SVG;
it is the state of the art. feTurbulence/feDiffuseLighting = `@supports` progressive enhancement.

---

## 4 · AXIS 3 — The perceptual thresholds (texture vs dirt vs metal — real numbers)

The build calibration (WS9 M1/M4/M5, `SPEC-pass2.md:65-69`) needs numbers. SOTA + the corpus measurements converge:

- **The JND / visibility floor.** The corpus metric is painted **luminance std-dev over a content-free patch**, JND
  floor **std 3.0** (GOLDEN §8), hardened to the **no-squint floor std ≥ 4.5** (light) by challenge/3 R2
  (DELTA-ASSAY §4.1). The GOLDEN spike MEASURED: light multiply @0.22 → std **3.65**, dark screen @0.16 → std
  **3.86** (GOLDEN §8 table); challenge/2 re-measured under **pinned sRGB** → std **5.54**, mean **236.3** at the
  SAME 0.22 (challenge/2 R1 table). **The sRGB pin bites ~51% harder, so the alpha steps DOWN under sRGB.** For the
  RASTER tile the alpha is re-derived against the committed tile's own bounded-amplitude field (the tile is not a
  contrast-stretched turbulence — its std is baked, the alpha scales it). **ADOPT:** the build re-measures std on
  the ACTUAL raster over the washed plate; target **std ∈ [4.5, ~7]** light (no-squint but not dirt), the
  golden's 0.21/0.16 as the STARTING anchor expected to move.
- **The upper bound — where texture becomes DIRT.** No single published number, but the transferable law is
  letterpress restraint: **ink coverage < half the printable area, "more white area on paper than printed"**
  ([Alphabet Press letterpress](https://thealphabetpress.com/designing-in-letterpress/); [TAP designing-in-letterpress]).
  Translated: the grain must modulate luminance around the mean, not DOMINATE it — mean-L drift stays small (the
  GOLDEN measured mean 247→242, a 3% darken, GOLDEN §2.3; warm floor held). **ADOPT the heuristic:** tooth is DIRT
  when the composite mean-L drifts > ~5% from the un-grained plate OR the local contrast under body glyphs drops
  below the AA floor (the σ is a SURFACE signal on empty plate, never under glyphs — GOLDEN §6). SOTA subtle range
  8-12% opacity ([grain overlay search]) is the mid-tone-plate figure; on the poles with multiply/screen the corpus
  0.16-0.21 is the pole-equivalent — cross-check both against the mean-drift bound.
- **The metal boundary — where relief becomes SHEEN.** This is the failure the user named. Numbers from the corpus
  build sweep (WS9 M1/M4): metal appears at **high `surfaceScale`** (sweep {1.0, 1.4, 1.7}, pick LOW —
  `SPEC-pass2.md:68`) and **high directional anisotropy at fine frequency** (a single distant key over fine noise
  → anisotropic sheen). The defenses: LOW surfaceScale + near-isotropic fine bf + elevation 55° (flatter =
  less streak) + MATTE diffuse (never specular). **For the RASTER primary this boundary is moot by construction**
  (a matte-paper tile has no specular term); it only governs the `@supports` enhancement. **ADOPT:** the metal
  boundary is a CONSTRAINT on the SVG enhancement, not on the raster floor — another reason raster-primary is safer.
- **Warm-hue floor — the no-gray fence.** The house warm floor is chroma **C ≥ 0.020** (OKLab), and the tile/source
  must clear it with 2-3× margin at SOURCE (~0.04-0.05, e.g. `#F3EAD3` ≈ oklch(0.94 0.045 85)) because the composite
  DILUTES toward grey after the blend at deployment alpha (WS9 M2, `SPEC-pass2.md:66`; row 14.1: `C≥0.02` on any
  substrate; LX.2 landed tiles at C 0.02-0.045, EXECUTION-PROGRESS:188). The gate asserts the SOURCE hex/tile mean
  chroma ≥ 0.020, NOT the diluted composite (the 3×-shipped headless-green trap, `SPEC-pass2.md:66`). **ADOPT** —
  and the raster tile is warm-tinted AT BAKE, so it clears the floor deterministically in every engine.

### Verdict
The numbers: **light std target [4.5, ~7]** on the washed plate; **mean-L drift < ~5%** (the dirt ceiling);
**source chroma ≥ 0.020** (2-3× margin at bake); the metal boundary is a raster non-issue and a low-surfaceScale
constraint on the SVG enhancement only. The build re-measures on the committed tile — the golden's 0.21/0.16 are the
starting anchor, not the answer.

---

## 5 · AXIS 4 — Paper + glass cohabitation (matte + transmissive read as ONE system)

### Findings
- **Apple Liquid Glass is EXPLICITLY a multi-layer material system with HIERARCHY, not a single element** — the
  exact framing the paper+glass duality needs. *"The 'glass' isn't a single layer; it is a stack of distinct optical
  operations"*; the 2026 HIG revision states apps *"should show hierarchy between content and controls"*
  ([Liquid Glass — Wikipedia](https://en.wikipedia.org/wiki/Liquid_Glass);
  [Apple HIG Materials](https://developer.apple.com/design/human-interface-guidelines/materials);
  [createwithswift — Hierarchy, Harmony, Consistency](https://www.createwithswift.com/liquid-glass-redefining-design-through-hierarchy-harmony-and-consistency/);
  [The Engineering Behind Liquid Glass](https://medium.com/@manavkaushal756/the-quiet-engineering-behind-apples-liquid-glass-ui-fb51b1d599ad)).
  **ADOPT as the identity frame:** paper is the MATTE CONTENT/BACKDROP layer; glass is the TRANSMISSIVE
  CONTROL/CHROME layer floating above it. They read as ONE system precisely BECAUSE they are different material
  registers in a hierarchy — the corpus's "paper is loud, glass is a whisper; that separation IS the design"
  (GOLDEN §1; WS9 A2, `SPEC-pass2.md:10,25`) is the same principle Apple ships.
- **The "one light" is the cohesion mechanism.** Apple: glass *"refract\[s\] and reflect\[s\] elements placed
  behind them"*, adapts to *"light conditions"* — a shared optical environment. The corpus's `--glass-key-*` spine
  (17.5 `W-GLASS-PAPER-CONGRUENCE`) makes this literal and TESTABLE: ONE light source (azimuth 290.56°) governs the
  glass specular/bevel, the under-shadow fill, AND the paper tooth relief (`SPEC-pass2.md:18`; `FINAL.md:207,303`).
  **This is the SOTA-differentiated move** — Apple's cohesion is per-surface runtime adaptation; glass-ui's is a
  gate-locked single-source-of-light TOKEN spine. **ADOPT + elevate:** 17.5 is the mechanism that makes paper+glass
  read as ONE lit system; the paper tooth's azimuth literal EQUALS `atan2(token)` — the congruence is machine-proven,
  not asserted.
- **The register FENCE — no warm tooth on glass (the A2 no-win resolution).** WS9 A2 (`SPEC-pass2.md:10`) proved
  that re-pointing the glass-tier whisper onto the warm-lit tooth is a no-win: imperceptible at 0.025 = pointless
  churn, OR perceptible = the directional metallic sheen LEAKS into the chrome. Resolution: the glass whisper keeps a
  dedicated NEUTRAL fine-noise source (`--glass-grain-fine`, the honest rename of `--paper-clean-texture`), the
  library fence `--glass-grain-opacity` (0.025 light / 0.045 dark) **BYTE-UNTOUCHED** (GOLDEN §2.3; DELTA-ASSAY
  §3.7 — the per-mode fence π, NOT a flat `== 0.025`). **ADOPT — this is the load-bearing cohabitation rule:** the
  materials cohere through the SHARED LIGHT, not a shared texture. Warm+loud paper ≠ neutral+whisper glass; the tooth
  never touches a glass surface. SOTA Apple hierarchy is the theory; the register split is the implementation.
- **"Paper felt through glass."** The corpus's most ambitious claim (GOLDEN §3.4): the grit reads THROUGH the
  translucent glass tint on a defined edge — the six-layer composite where paper grain is the layer-6 cap over the
  transmissive glass-on-field stack. challenge/3 R5 flagged this as the LEAST-proven application; DELTA-ASSAY §4.6
  demands a de-risk spike + a gate arm (through-glass chroma ≥ floor over a saturated field). **ADOPT with the
  through-glass spike as a BUILD precondition** — the paper-band `proof:ba-gestalt` verdict must include a
  paper-through-a-`.glass-material`-tile capture, both modes, not just the opaque-plate patch.

### Verdict
Paper (matte content) + glass (transmissive chrome) read as ONE system via the Apple-validated multi-layer HIERARCHY
principle, IMPLEMENTED as glass-ui's gate-locked single-light spine (17.5). The cohabitation rule: cohere through the
SHARED LIGHT (azimuth 290.56° on both), fence the TEXTURE (warm tooth = paper only; neutral whisper = glass only;
`--glass-grain-opacity` byte-untouched). The "paper felt through glass" claim gets a through-glass spike + gate arm.

---

## 6 · AXIS 5 — Print principles that transfer (ink floors · paper white · deckle/edge restraint)

### Findings
- **Ink-coverage restraint → grain-amplitude restraint (the SUBTLE law made numeric).** Letterpress: *"ink coverage
  should be less than half the total printable area... more white area on paper than printed"*; *"solid fills used
  moderately — letterpress cannot reproduce large block areas"* ([Alphabet Press](https://thealphabetpress.com/designing-in-letterpress/);
  [Metallic Elephant letterpress](https://www.metallicelephant.co.uk/blog/guide-the-letterpress-printing-process/)).
  **ADOPT as the dirt-ceiling heuristic (§4):** the tooth modulates AROUND the paper-white mean; it never becomes
  the dominant tone (mean-L drift < ~5%). This is the print-native articulation of "SUBTLE where subtle."
- **Paper white = warm substrate, never pure #FFF.** Real paper stock is a warm off-white; digital paper white must
  be tinted (the `--story-paper-wash` 4% warm tint, §2; the warm-cream `--card` decoupled from the page,
  CLAUDE.md BA.W-NO-GRAY). SOTA "beige noise on a warm base" ([grain overlay search]) is the same instinct. **ADOPT
  — the wash leg is not optional polish; it is the paper-white substrate the tooth bites into.**
- **Debossing → the letterpress ink-into-tooth read.** *"A heavily impressed image on thick paper creates debossed
  designs... crisp and sharp; debossing indents the paper"* ([WebFX printing techniques];
  [Metallic Elephant]). The corpus's DEBOSS rider (WS9 `SPEC-pass2.md:72`): marks pressed INTO the tooth via a
  static inset/text-shadow pair (dark top-left + warm highlight bottom-right) keyed to the SAME 290.56° azimuth,
  PRM-safe (static). **ADOPT — the deboss is the print-authentic "ink sinks into paper" read, and it is FREE
  (static, compositor-only, one azimuth).** It also unifies with the multiply-darkens-the-valleys blend physics.
- **Deckle/torn-edge is FENCED — SOTA restraint agrees.** The corpus fences the deckle (torn-paper absolute-px
  amplitude) as FORBIDDEN skeuomorphic excess (WS9 `SPEC-pass2.md:29`, `:188` — atlas FD1/DL2 §P4). SOTA "tactile
  maximalism" is TEXTURE, not literal paper-cutout mimicry — the anti-kitsch line. **ADOPT the fence:** grain-only is
  the close; no deckle, no torn edges, no drop-shadow "lifted corner" skeuomorphism. The tooth + deboss + warm wash
  is the complete print vocabulary; anything more is kitsch.

### Verdict
Print transfers cleanly: ink-coverage restraint → the < ~5% mean-drift dirt-ceiling; warm paper-white → the wash leg
is load-bearing; deboss → the free static ink-into-tooth read on the shared azimuth; deckle → FENCED (anti-kitsch).

---

## 7 · The synthesized golden path — what the KS-PAPER spec should bind (raster-primary, SOTA-grounded)

The KS-PAPER spec (KS author) should perfect row 14.1 as: **ONE warm raster tooth PRIMARY, feDiffuseLighting
`@supports` enhancement SECOND, single-light spine congruence, register fence held.** Concretely:

1. **The PRIMARY: a committed warm raster tooth tile.** A 512px seamless-mirror tile (SOTA starting point,
   [tinkpro]), procedurally BAKED once (fBm/Perlin → warm-ecru matte relief, directionally embossed leaning the
   290.56° hemisphere), base64-inlined in the SAME `--paper-grain-tooth` token (`paper.css:44`), SAME
   `multiply`(light)/`screen`(dark) blend law, SAME 512px tile size, SAME seed leaf discipline. Warm at SOURCE
   (chroma ≥ 0.020, 2-3× margin). Engine-invariant by construction. Alpha re-measured on the washed plate to std
   ∈ [4.5, ~7] light; mean-L drift < ~5%. `image-rendering` default (no pixelation). Payload budgeted on
   `profile:budget` (PNG-8/WebP compression; the tooth is narrow-band).
2. **The `@supports` ENHANCEMENT: feDiffuseLighting over feTurbulence, sequenced second.** Only where it renders
   faithfully; `color-interpolation-filters='sRGB'` PINNED (never linearRGB — [MDN]), warm HEX ecru
   `lighting-color` (never oklch — Safari risk), `azimuth='290.56'` (= the raster's baked hemisphere), `elevation`
   55°, LOW `surfaceScale` (matte, no sheen), `kernelUnitLength='1 1'` (DPR/engine relief stabilizer, tested with
   AND without per WS9 M6). Never the sole paint; the raster is the floor.
3. **The single-light spine (17.5 + 14.0 GU-1 token).** `--glass-key-direction: -0.375` lands FIRST (value-only,
   3 edits, `GU-1-glass-key-fill.md:26-36`); the paper tooth's baked emboss AND the `@supports` azimuth literal both
   lean `atan2(-1, 0.375) ≈ 290.56°`; the gate asserts `|literal − 290.56| < 1°` + hemisphere-coherence (lit/shade
   sign agreement). ONE light: glass bevel/specular + under-shadow fill + paper tooth.
4. **The register fence (A2, LX.2 ceiling).** Warm tooth = PAPER only (`--paper-grain-tooth`); neutral whisper =
   GLASS only (`--glass-grain-fine`, the honest rename of `--paper-clean-texture`); `--glass-grain-opacity`
   (0.025/0.045) BYTE-UNTOUCHED, per-mode fence π. **The LX.2 "no-double-warm CEILING" (owned by 14.1):** the tooth
   is warm ONCE — the tile carries the warmth; the wash carries a SEPARATE small warm tint; they must not COMPOUND
   into a brassy over-warm plate (LX.2 landed C 0.02-0.045; the ceiling gate bounds the composite chroma from ABOVE
   so warm-substrate + warm-tooth ≤ the identity ceiling, not double-counted). The DELTA-ASSAY warm-floor gate
   (chroma ≥ floor) is the FLOOR; LX.2 adds the CEILING. Both bound the composite.
5. **The print vocabulary.** Warm wash (paper-white substrate, load-bearing). Deboss rider (free static ink-into-
   tooth, shared azimuth). Deckle FENCED. Coverage: grain as MATERIAL on the specimen surfaces
   (`ShowcaseFrame :grain` on `typography.vue` — the headline miss; `Card :grain`/`surface="paper"` on math-paper +
   paper-glass), not just a buried backdrop (GOLDEN §3; DELTA-ASSAY §2 REFINE).
6. **The a11y carve (absolute).** `prefers-reduced-transparency: reduce` → paper grain → 0 + the `@supports`
   enhancement → 0 + wash → opaque warm-cream (`paper.css:111-119`; extend `a11y-fallback.css` — genuinely absent
   for paper per challenge/2 R4). Static grain STAYS under `prefers-reduced-motion` (a still texture is not a motion
   hazard); only any emboss-sweep motion is gated.
7. **The through-glass spike (challenge/3 R5, DELTA-ASSAY §4.6).** A build precondition: capture the paper tooth
   through a `.glass-material` tile over a saturated field, both modes; the `proof:ba-gestalt` paper-band verdict
   includes it. "Paper felt through glass" is proven in pixels, not prose.

### The born-RED gate shape (rebased onto raster-primary — merges GOLDEN §8, DELTA-ASSAY §4, WS9 gates)
```
proof:paper (paper-texture-single + warm-hue floor + azimuth==token), both modes, both engines:
1. painted L std-dev over a content-free patch, ON THE LIVE ROUTE NODE, on the WASHED plate:
     >= 4.5 (light no-squint) / re-measured (dark)          — the tooth READS
2. composite mean-L drift from un-grained plate < ~5%       — the DIRT ceiling (letterpress restraint)
3. --paper-grain-tooth == the committed raster tile (hash)  — born-RED on the grey/feColorMatrix speckle
4. resolved tooth blend == multiply(light) / screen(dark)   — NOT overlay/soft-light
5. --story-paper-wash != transparent in light               — the plate the tooth bites
6. LIBRARY FENCE: --glass-grain-opacity == 0.025(light) AND 0.045(dark)  — per-mode, glass stays a neutral whisper
7. warm-floor: SOURCE tile mean chroma (oklch) >= 0.020     — NO gray; AND LX.2 CEILING: composite chroma <= ceiling
8. one-key: baked emboss + @supports azimuth literal == atan2(--glass-key-direction) ≈ 290.56 ±1°  — single light
9. @supports arm: feDiffuseLighting resolves color-interpolation-filters == sRGB (no-attr→linearRGB→RED)
10. through-glass: tooth chroma >= floor read THROUGH a .glass-material tile over a saturated field
+ @webkit paired arm: the SAME live-route patch std within tolerance (raster makes this trivially portable)
```

---

## 8 · ADOPT / REJECT register (every finding, one line)

| # | finding | source | verdict |
|---|---|---|---|
| F1 | Tactile-maximalism / warm-texture / anti-AI is the 2026 SOTA center | Creative Bloq · SNIX · Fireart | **ADOPT** as identity frame |
| F2 | Static CSS/SVG grain overlay, avoid heavy WebGL, ~50px repeat, low weight | Fireart · SNIX | **ADOPT** (corpus static-raster contract is SOTA) |
| F3 | multiply / soft-light are the subtle sweet spot on MID-TONE plates | grain-overlay search · CSS-Tricks | **ADOPT for mid-tone; REJECT for poles** — poles need multiply/screen (corpus) |
| F4 | Film grain ≈ uniform STRUCTURED bounded-amplitude texture, not random | film-grain search · Wikipedia | **ADOPT** — independent argument for coarse raster tooth |
| F5 | Warm-substrate ("beige noise") over warm base, not pure white | grain-overlay search | **ADOPT** — the wash leg is load-bearing |
| F6 | Raster PNG tile for perf-critical/large-area/mobile over SVG filter | nnnoise search · Daniel Immke | **ADOPT** — raster PRIMARY |
| F7 | SVG feTurbulence: resolution-independent, tiny, but paint-heavy on large areas + cross-engine blend/displacement deltas | Codrops · CSS-Tricks · nnnoise | **ADOPT the demotion** — `@supports` enhancement only |
| F8 | feDiffuseLighting/feTurbulence default color-interpolation-filters = linearRGB (51% std swing measured) | MDN · challenge/2 R1 | **ADOPT** — pin sRGB on the enhancement; raster sidesteps entirely |
| F9 | feDiffuseLighting is structurally sheen-prone (alpha bump-map + distant key = metal) | MDN · WS9 M4 | **ADOPT** — the metallic-history killer → raster primary |
| F10 | Safari `lighting-color` colorspace unproven in data-URI (white fallback → metallic) | WS9 M2 | **ADOPT** — HEX not oklch on enhancement; raster removes risk |
| F11 | Seamless-mirror tiling, 512px SOTA starting point, procedural bake | tinkpro · nnnoise | **ADOPT** — the raster tile spec |
| F12 | Subtle grain 8-12% opacity (mid-tone) | grain-overlay search | **ADOPT as cross-check**, not the pole value (corpus 0.16-0.21) |
| F13 | JND std 3.0 → no-squint 4.5; sRGB bites 51% harder → alpha steps down | GOLDEN §8 · challenge/2·3 | **ADOPT** — re-measure on the raster, washed plate |
| F14 | Letterpress: ink < half printable area ("more white than printed") | Alphabet Press · Metallic Elephant | **ADOPT** — the dirt-ceiling (< ~5% mean drift) |
| F15 | Apple Liquid Glass = multi-layer material with content/control HIERARCHY | Wikipedia · Apple HIG · createwithswift | **ADOPT** as the paper-matte/glass-transmissive cohabitation theory |
| F16 | Cohesion via shared light; register fence via separate textures | Apple HIG · WS9 A2 | **ADOPT** — 17.5 single-light spine + warm-tooth-paper-only fence |
| F17 | Debossing = crisp indent, ink pressed into paper | WebFX · Metallic Elephant | **ADOPT** — the free static deboss rider on the shared azimuth |
| F18 | Deckle/torn-edge skeuomorphism | WS9 fence · atlas FD1/DL2 | **REJECT/FENCE** — anti-kitsch; grain + deboss + wash is the complete vocabulary |
| F19 | `image-rendering: pixelated/crisp-edges` for tiles | (raster hiDPI) | **REJECT** — reintroduces hiDPI grey-averaging; keep default auto |
| F20 | Build-time-generated (not committed) tile | (determinism) | **REJECT** — commit the tile; gate its hash for engine-invariance |

---

## 9 · Open frontier for the BUILD (what SOTA cannot settle — the P1 prototype must)

1. **The exact committed tile.** Its baked frequency band, warm-ecru hue/chroma, emboss direction/depth, and PNG-8
   vs WebP compression are PIXEL JUDGEMENTS against a real `:5199` render in Chrome AND REAL Safari (`wkshot.m`, not
   bundled Playwright — `SPEC-pass2.md:167`). SOTA gives the recipe (512px seamless-mirror fBm, warm tint, coarse
   structured band); the eye picks the tile.
2. **The alpha re-derivation.** std ∈ [4.5, ~7] on the washed plate is the target; the golden 0.21/0.16 is the
   anchor, expected to move once the alpha scales a baked (not contrast-stretched) tile.
3. **The LX.2 no-double-warm ceiling number.** The composite-chroma upper bound so warm-wash + warm-tooth do not
   compound to brassy — measured on the LX.2 landed range (C 0.02-0.045) as the ceiling anchor.
4. **The through-glass spike.** The least-proven §5 application; a build precondition + gate arm.
5. **The `@supports` enhancement accept/reject.** Whether the feDiffuseLighting layer is worth shipping at all, or
   whether the raster alone is the whole register — a live capture decision (if the enhancement adds nothing
   perceptible over the raster on supporting engines, DROP it per KISS; the raster-primary already closes the wave).

---

## Sources

- [Texture, warmth and tactile rebellion — Creative Bloq](https://www.creativebloq.com/design/graphic-design/texture-warmth-and-tactile-rebellion-the-big-graphic-design-trends-for-2026)
- [Tactile Maximalism in Web Design 2026 — SNIX](https://www.snix.mt/post/tactile-maximalism-web-design-2026)
- [Web Design Trends 2026 — Fireart](https://fireart.studio/blog/the-best-web-design-trends/)
- [Grainy Gradients — CSS-Tricks](https://css-tricks.com/grainy-gradients/)
- [SVG Filter Effects: feTurbulence — Codrops](https://tympanus.net/codrops/2019/02/19/svg-filter-effects-creating-texture-with-feturbulence/)
- [Making noisy SVGs — Daniel Immke](https://daniel.do/article/making-noisy-svgs)
- [Noise Texture Generator (nnnoise) — uwarp](https://www.uwarp.design/nnnoise)
- [Noise Texture Generator (512px, seamless) — tinkpro](https://tinkpro.com/noise-generator/)
- [feDiffuseLighting — MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feDiffuseLighting)
- [feTurbulence — MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feTurbulence)
- [Film grain — Wikipedia](https://en.wikipedia.org/wiki/Film_grain)
- [Film Grain vs Digital Noise — Anissa D Photography](https://anissadphotography.com/film-grain-vs-digital-noise-differences/)
- [Liquid Glass — Wikipedia](https://en.wikipedia.org/wiki/Liquid_Glass)
- [Human Interface Guidelines: Materials — Apple](https://developer.apple.com/design/human-interface-guidelines/materials)
- [Liquid Glass: Hierarchy, Harmony, Consistency — createwithswift](https://www.createwithswift.com/liquid-glass-redefining-design-through-hierarchy-harmony-and-consistency/)
- [The Quiet Engineering Behind Liquid Glass — Manav Kaushal](https://medium.com/@manavkaushal756/the-quiet-engineering-behind-apples-liquid-glass-ui-fb51b1d599ad)
- [Designing in Letterpress — The Alphabet Press](https://thealphabetpress.com/designing-in-letterpress/)
- [Guide: The Letterpress Printing Process — Metallic Elephant](https://www.metallicelephant.co.uk/blog/guide-the-letterpress-printing-process/)
- [A Guide to Popular Printing Techniques — WebFX](https://www.webfx.com/blog/web-design/a-guide-to-popular-printing-techniques/)
- [Grainy Texture for Graphic Design — Peterdraw](https://peterdraw.studio/blog/grainy-texture-for-graphic-design)
