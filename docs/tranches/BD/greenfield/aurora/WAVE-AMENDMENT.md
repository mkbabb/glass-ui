# Aurora — WAVE-AMENDMENT

The concrete tranche amendment reconciled against the extant 116-wave set: which existing
waves in `docs/tranches/BD/union/waves/` to AUGMENT / UPDATE / PRUNE / EXCISE, and the NEW
waves to author. Every wave references `docs/tranches/BD/greenfield/aurora/GOLDEN.md` as the
reference implementation, with a real born-RED gate. No duplicative work.

Reference: `GOLDEN.md` (the canonical spec) + `DELTA-ASSAY.md` (the union path). The three
challenges (`challenge/1.md`, `2.md`, `3.md`) are FOLDED into the gate clauses below.

---

## 0. The extant aurora wave census (what already exists, what collides)

Six waves in the union set touch this item. Their disposition:

| Wave | What it is | Verdict |
|---|---|---|
| `W-AURORA-METALLIC.md` | the user's metal ask, metal as a `medium` at `uMedium==8`, two variants | **PRUNE → folded into NEW `BD.W-AUR-METAL-FINISH`** (its slot-8 instinct is RIGHT; it predates the re-plumbed-N / cursor-z-light / gestalt-re-tune hardening) |
| `W-BLURRED-IMAGE-BG.md` | the user's blurred-flower ask, as a SEPARATE `<BlurredImage>` component | **PRUNE → folded into NEW `BD.W-AUR-IMAGE-SOURCE`** (the `<BlurredImage>` fork is RETIRED into the aurora `source:"image"` axis — the deft union) |
| `BD.W-AUR-METAL.md` | a competing metal spec, slots `uMedium==10/11`, "medium/finish split" | **EXCISE the 10/11 + finish-split framing → SUPERSEDED by `BD.W-AUR-METAL-FINISH`** (its 10/11 premise is PHANTOM — depends on satin=8/prism=9 which are not user asks; its medium×finish split is taxonomically incoherent — Challenge-3 R2. Its VERIFIED ground-truth + BRDF math + numeric-gate discipline are HARVESTED into the new wave.) |
| `BD.W-AUR-SATIN.md` (uMedium==8) | a NON-user-asked painterly medium, the phantom slot-8 anchor metal's 10/11 rests on | **OUT OF THIS ITEM'S AUTHORITY** — but FLAG: it COLLIDES with metal at slot 8. Disposition note below. |
| `BD.W-AUR-PRISM.md` (uMedium==9) | a NON-user-asked medium, the phantom slot-9 anchor | **OUT OF THIS ITEM'S AUTHORITY** — collides with metal-gradient at slot 9. Note below. |
| `BD.W-AUR-ALBUM.md` | album-art-reactive aurora (the now-playing field) | **NOT TOUCHED** — orthogonal (a `palette`-derivation register, not a finish/source). It was the D7 app-name "2nd consumer" the metal critique correctly killed; metal's 2nd consumer is the generalized backdrop, never album. |

### The slot-collision verdict (the load-bearing reconcile)

The USER asked for metal + blurred-image. The user did NOT ask for satin or prism. The golden
verified at HEAD that `MEDIUM_ID` stops at `kuwahara:7`, so the next free slots are **8/9** —
and the four asks need exactly two new medium slots (metal + metal-gradient). **The fittest
allocation is metal=8, metal-gradient=9** (the golden + `W-AURORA-METALLIC`'s instinct).

`BD.W-AUR-SATIN`/`BD.W-AUR-PRISM` claim 8/9 for non-user-asked mediums, pushing metal to a
phantom 10/11. This is a tranche-level slot contention that exceeds this item's authority to
resolve unilaterally. **The amendment RECORDS the verdict and the dependency:** if satin/prism
SHIP, metal lands at 10/11 (and `BD.W-AUR-METAL-FINISH` reads the live `MEDIUM_ID` rather than
hardcoding 8); if satin/prism are themselves pruned as non-user-asks (the likelier call given
the BD union's user-grounded discipline), metal lands at 8/9. **`BD.W-AUR-METAL-FINISH` does
NOT hardcode a slot integer — it appends MONOTONICALLY above the highest shipped `MEDIUM_ID`
and the gate asserts the `satisfies Record<AuroraMedium,number>` total-map**, so it is correct
under either resolution. The cross-wave coordination note is logged for the orchestrator.

---

## 1. NEW WAVE — `BD.W-AUR-VIVIDNESS` (the §3 chroma floor + palette lift)

> **The literal §3 gray-glass fix at the source. Born-RED on the live `C:0.10` pale default
> (verified this session: rendered field mean OKLab chroma 0.0350 < the 0.045 floor).**

**Reference:** `GOLDEN.md §2a`. **Depends:** none (pure OKLab arithmetic on the shared
`procedural-color` chunk). **Composes:** `BD.W-FIELD-ENGINE` (the moved `procedural-color`
WGSL twin home) — soft, not a hard edge.

**Mechanism:** append an OKLab chroma-floor lift to the shared `procedural-color` chunk (GLSL
+ WGSL twin), after color/medium, before tonemap. Opt-OUT, default-high. Pack `uVividness`
into the free `scalars3.w` pad slot (off 60) — no new struct lane. Lift
`DEFAULT_AURORA_CONFIG.palette` C:0.10 → warm `C:0.16–0.20` band (hues 45–70). The near-gray
hue guard is STRUCTURAL: below `VIVID_EPS` the floor synthesizes along the warm
`AURORA_CATCH_LIGHT_ANCHOR` direction (`uniformBridge.ts:106`), never the noisy near-zero
vector (Challenge-2 R4).

**Gate — `proof:aur-vividness` (born-RED):**
- **V1 — vividness floor (§3).** The default field's mean OKLab chroma over the frame ≥ 0.045
  at `vividness=1`, on BOTH backends, BOTH modes, from a CLEAN shader readback (not a
  screenshot). **Born-RED on HEAD: the live `C:0.10` pale field reads 0.0350 < 0.045.**
- **V2 — per-zone warm-hue (Challenge-1 R4 / Challenge-2 R4).** The lifted default field's
  chroma-weighted mean hue stays in the warm band [40°,75°] over ≥ X% of weighted area (OKLab
  b ≥ −ε) — the floor must NOT amplify the visible periwinkle zone into a saturated cold zone.
  Born-RED if a cold zone clears the mean-chroma bar but harbors a saturated cold hue.
- **V3 — byte-identity carve (Challenge-1 R5).** An EXPLICIT `{palette: LEGACY_C010,`
  `vividness:0}` config renders byte-identical to the prior smooth parity capture, BOTH
  backends — the byte-identity invariant and the palette-lift identity move are BOTH literally
  true (asserted against the legacy palette, not "the default with vividness:0").
- **V4 — composes the glass no-gray π.** A warm glass surface over the default field reads
  transmissive-not-gray (the field carries chroma — composes `W-GLASS-ABROGATE-GRAY`).
- *Spike-grounded:* `golden/spike.html` JS-readback 0.031 (no-vivid, RED) → 0.057 (vivid,
  GREEN); the live ship default 0.0350 corroborates RED.

---

## 2. NEW WAVE — `BD.W-AUR-METAL-FINISH` (metal + metal-gradient mediums, slots 8/9 monotonic)

> **The two metal variants the user asked for, as new aurora MEDIUMS, folded from the engine's
> own DISCARDED structure-tensor gradient. Supersedes `W-AURORA-METALLIC.md` +
> `BD.W-AUR-METAL.md` (the 10/11 + finish-split framing EXCISED).**

**Reference:** `GOLDEN.md §2b/§2c`. **Depends:** `BD.W-WAVE-FIELD-HARNESS` +
`BD.W-GATE-TRUTH-AUDIT` (the numeric parity net — a metal parity gate is theater without it).
**Reads (not hardcodes) the live `MEDIUM_ID`** (the slot is the monotonic-next above the
highest shipped medium — 8/9 if satin/prism pruned, 10/11 if shipped; see §0). **Harvests**
`BD.W-AUR-METAL.md`'s verified ground-truth + BRDF math + the numeric-gate-no-sparkle-self-
exempt discipline; **drops** its phantom 10/11 + the incoherent medium×finish split (metal IS
a medium — the `uMedium` ladder is mutually-exclusive replace-`col` dispatch; Challenge-3 R2).

**Mechanism (per `DELTA-ASSAY §2b`):**
1. WIDEN `structureTensorField` to RETURN its discarded gradient, BOTH `mediums.glsl.ts` AND
   `aurora-mediums.wgsl.ts`; `.xy`/`.z` callers byte-unchanged. The grad-transport is a
   PRECISION-PROVEN scheme (returned struct WGSL / vec4-or-out GLSL), NOT the spike's
   `packGrad`-never-unpacked non-answer (Challenge-2 R6).
2. metal body (8): `N` from the re-plumbed gradient + a **low-pass of the height field**
   (smoothed grad / lower nuclei octave — so folds resolve at SHEET scale, NOT pixel speckle —
   Challenge-3 R1); the cursor-z-synth light (the ONLY form crossing to WGSL); a two-term
   `streak × crest` BRDF, coherence-gated; a **deep technicolor warm-near-black valley**;
   achromatic-warm catch-light. The light synthesis is **NET-NEW WGSL shader code** (not a
   re-point of the WebGL2-only `uLightDir` — Challenge-1 R3).
3. metal-gradient (9): the BRDF over a pre-flattened base + a twinkle-IN-PLACE sparkle (fixed
   per-cell seed, PHASE animated; value-conditioned for cross-backend stability — NO WGSL
   `highp` qualifier, which does not exist — Challenge-2 R2).
4. Knobs pack into free pad slots (`cursor.z/.w` or `kuwahara.z/.w`) — no new struct lane.
5. Cartoon-punch (Challenge-3 R3): velocity-coupled streak-stretch (squash & stretch, morph-
   MORE-on-move) + the deep technicolor valley — the FLOW & PUNCH binding law.

**Gate — `proof:aur-metal-finish` (born-RED; COMPOSES `shader-eval-harness.mjs`):**
- **M1 — the finishes exist on BOTH backends, monotonic slots.** `mediumMetal`/
  `mediumMetalGradient` DEFINED + DISPATCHED in BOTH `mediums.glsl.ts` AND the SPLICED
  `aurora-mediums.wgsl.ts` (splice-following, not the empty literal); the `AuroraMedium` union
  carries both; `satisfies Record<AuroraMedium,number>` total-map holds. **Born-RED on HEAD:
  `MEDIUM_ID` stops at kuwahara==7, no metal body.** A missing WGSL body / silent kuwahara-
  degrade REDs (no-silent-degrade).
- **M2 — the metal FOLDS, and reads as METAL not speckle (Challenge-3 R1, GESTALT).** The
  `medium:metal` field's local crest-valley contrast ≥ the fold bar AND ≥ 1.5× the smooth
  field's; **AND a COHERENCE/orientation-co-alignment clause** — the high-freq L texture must
  be CO-ALIGNED over a neighborhood (isotropic salt-and-pepper speckle FAILS even at high
  localContrast). **Born-RED on the smooth field AND on an isotropic-speckle metal** (the
  golden spike PNG's actual failure). + a human EYE-VERIFY both modes (the live-verify rule).
- **M3 — the re-plumbed N, not a re-paid Sobel.** The metal body reads `N` from the widened
  return; NO second 8-tap Sobel in the body. Born-RED on HEAD (the gradient is discarded).
- **M4 — both BRDF terms + the cursor-light crosses to WGSL + coherence gate.** The body
  computes BOTH streak AND `N·H`; the light derives from `uCursor` in the WGSL body too (a
  WGSL metal reading a phantom `uLightDir` → flat → REDs); the coherence `smoothstep(...,A)`
  is present. Born-RED on a streak-only (tinted-tensor-map) or constant-H body.
- **M5 — twinkle-in-place determinism.** Per-cell fixed seed, PHASE animated; a position-
  animated sparkle (`hash21(p+t)`) produces a 2-frame temporal ΔE > bar → REDs (the boil bite).
- **M6 — metal is a MEDIUM, no incoherent finish-split (Challenge-3 R2).** metal/metal-gradient
  are `AuroraMedium` members in the single `uMedium` ladder; the configurator shows them in the
  medium dropdown (no `finish:metal` that silently overrides `medium` — the configurator-lie
  bite). The medium×finish split map is NOT minted (it claims orthogonality the slots refute).
- **M7 — fences.** ONE generalized "Metal"/"Brushed Metal" preset (no album/iOS-27/app-name —
  D7); achromatic-warm catch-light (no hue in the body); default byte-identical (new lanes 0);
  the gate COMPOSES the numeric net (no `.test(/mediumMetal/)` name-presence, no sparkle self-
  exempt).
- **M8 — PRM (Challenge-2 R5).** Under `prefers-reduced-motion`, the catch-light is pixel-
  FROZEN across two frames with a cursor move injected between (the cursor branch gated on a
  `uReducedMotion` scalar in-shader — one guarantee, not two chained); the sparkle phase + the
  rake do not advance; metal contrast damped toward a calm static read (Challenge-3 R4).

---

## 3. NEW WAVE — `BD.W-AUR-IMAGE-SOURCE` (the `source:"image"` blurred macro-flower)

> **The blurred-image macro-flower bg as an Aurora SOURCE axis, not a `<BlurredImage>` fork.
> Honestly Aurora's FIRST texture pipeline (net-new sampler + binding on both backends).
> Supersedes `W-BLURRED-IMAGE-BG.md`.**

**Reference:** `GOLDEN.md §3`. **Depends:** `BD.W-GATE-TRUTH-AUDIT` (the texture parity is a
real rendered-capture-pair, never a name-presence) + the texture-upload primitive seam. **The
upload-seam dependency is REAL and must be sequenced (Challenge-1 R2 / Challenge-2 R1):**
`BD.W-DOT-IMAGE` also needs this exact upload primitive, and it does NOT exist in HEAD (`grep`
= ZERO texture/sampler in `src/...aurora/`). **ONE of the two waves is the PRODUCER.** This
amendment designates `BD.W-AUR-IMAGE-SOURCE` and `BD.W-DOT-IMAGE` to SHARE one upload
primitive (`createImageBitmap` decode + the explicit premultiply/colorspace/flipY on both
backends + the rendered-capture-pair parity gate); whichever lands first BUILDS it, the second
CONSUMES it. The union-map row reads "BUILDS-or-consumes the shared upload seam," NOT "reuses
an extant seam."

**Mechanism (per `DELTA-ASSAY §2c`):** a CONSTRUCTION-TIME `source:"palette"|"image"` program
permutation (no runtime god-branch). NET-NEW: a `GPUSampler` + `texture_2d<f32>` + bind-group
entry (WGPU); `gl.createTexture` + sampler + `uImage` + texture-unit (WebGL2); the upload
decode seam. The blur is a single-pass bounded FIXED-tap loop, radius modulated per-fragment by
the SAME drifting `nucleiField` zone, **explicit-LOD on every tap** (`textureSampleLevel` /
`textureLod(...,0.0)` — no implicit-derivative reads in the varying-radius loop — Challenge-2
R3). The §3 vividness floor applies on the final `col`.

**Gate — `proof:aur-image-source` (born-RED):**
- **I1 — the source axis is a construction-time permutation, GPU-native.** `source:`
  `{palette, image}`; each a separate shader program (no runtime `if (uSource)` switch). The
  texture path is NET-NEW on both backends (named, not assumed shipped). **Born-RED on HEAD
  (no source axis, no sampler).**
- **I2 — the blur is a single-pass explicit-LOD bounded tap-loop, zone-driven.** The blur
  radius reads the drifting `nucleiField`; the zones DRIFT over frames; the tap count is fixed;
  every tap is explicit-LOD (no implicit derivative). A dynamic loop bound / implicit-LOD read
  REDs (the WebKit trap bite). The "kuwahara tap-budget precedent" is NOT cited as the perf
  justification (ALU ≠ dependent texture reads — Challenge-2 R3); a real mobile-class frame-time
  measurement backs the budget.
- **I3 — texture parity is a REAL rendered-capture-pair (the Safari divergence).** A
  chromium-WGSL vs **webkit-WGSL** (real WebKit, Playwright `webkit`) rendered-capture-pair of
  the SAME uploaded macro-flower agrees OKLab ΔE ≤ threshold; both backends declare
  `premultiplyAlpha:false`/`colorSpaceConversion:none`/`flipY:false` explicitly. A name-
  presence `/copyExternalImageToTexture/.test()` / a hand-typed `ΔE 0.0` / a missing
  `pixelStorei(UNPACK_PREMULTIPLY_ALPHA_WEBGL,false)` REDs. **Born-RED on a default-premultiply
  build.** SHARED with `BD.W-DOT-IMAGE`'s T3 capture-pair (one parity methodology, two consumers).
- **I4 — the flower clears the §3 floor on the BLURRED output (Challenge-3 R5).** ≥1 real
  licensed macro-flower asset, run through the image path, the blurred output's mean OKLab
  chroma ≥ the §3 floor in both modes (a pale-petal image with near-zero hue cannot be lifted —
  the asset must be measured, not asserted). Born-RED with no asset / a sub-floor asset.
- **I5 — PRM single static blurred frame** (no zone drift, no cross-fade; inherited freeze).
- **I6 — consumer assets.** The library ships `<Aurora source="image" :src>`; the demo curates
  the macro-flower array (presets-in-consumers) — no flower literal in `src/`.

---

## 4. AUGMENT — `BD.W-PAGE-BACKGROUND` (the per-route varied field registry)

> **The per-page custom-aurora wiring — a chassis convention, not a library fork.**

**Reference:** `GOLDEN.md §4`. AUGMENT the existing `BD.W-PAGE-BACKGROUND.md` to add a
per-route field registry: each demo page declares its field (a varied vivid aurora preset / a
`source:"image"` macro-flower / a `medium:"metal"` field) so the storybook is non-monotone and
every glass demo has its own colorful §3 field to refract. Consumer convention
(presets-in-consumers); the library exposes the axes via `resolveAtoms`, the consumer selects.

**Gate addendum:** the per-route registry resolves a DISTINCT field per page (≥ N distinct
fields across the storybook); each clears the §3 vividness floor behind its glass surfaces
(composes `BD.W-AUR-VIVIDNESS` V1 + `W-GLASS-ABROGATE-GRAY`). Born-RED on the current
monotone-constellation chassis.

---

## 5. RECONCILE — `BD.W-FIELD-ENGINE` (the shared basis, the genuine 2nd/3rd consumers)

No new wave. RECONCILE note only: `BD.W-FIELD-ENGINE`'s shared `field/{noise,color}` basis +
the moved `procedural-color.wgsl.ts` home are READ by metal's `N` host + the image source's
drift + the vividness floor's OKLab chunk — the metal/image/vividness arms are the genuine
2nd/3rd consumers that keep the field-engine hoist non-overfit (its E5 over-abstraction fences
hold; the painterly/IQ/host-field registers stay distinct). No augmentation to its gate.

---

## 6. DEFERRED (not adopted)

- **lens-c's ink-and-paint cel-outline** (`GOLDEN.md §8/§10`) — a real, audacious second bold
  swing, but the four asks do not need it and a hard contour fights the §3 soft-transmissive
  field. Logged as a future opt-in `cel:true` register, not in the critical path.

---

## 7. Summary of the amendment

| Action | Wave | Why |
|---|---|---|
| **NEW** | `BD.W-AUR-VIVIDNESS` | the literal §3 fix; born-RED live (0.0350 < 0.045) |
| **NEW** | `BD.W-AUR-METAL-FINISH` | the two metal mediums, re-plumbed-N, gestalt-re-tuned, monotonic slot |
| **NEW** | `BD.W-AUR-IMAGE-SOURCE` | the blurred flower as the aurora `source:"image"` axis; honest net-new texture pipeline |
| **AUGMENT** | `BD.W-PAGE-BACKGROUND` | per-route varied field registry (chassis convention) |
| **PRUNE** | `W-AURORA-METALLIC` | folded into `BD.W-AUR-METAL-FINISH` (slot-8 instinct kept, hardenings added) |
| **PRUNE** | `W-BLURRED-IMAGE-BG` | folded into `BD.W-AUR-IMAGE-SOURCE` (the `<BlurredImage>` fork retired into the source axis) |
| **EXCISE** | `BD.W-AUR-METAL.md` (the 10/11 + finish-split framing) | superseded by `BD.W-AUR-METAL-FINISH`; verified ground-truth + BRDF math + numeric-gate discipline HARVESTED |
| **RECONCILE** | `BD.W-FIELD-ENGINE` | metal/image/vividness are its genuine 2nd/3rd consumers (no gate change) |
| **FLAG (out of authority)** | `BD.W-AUR-SATIN` / `BD.W-AUR-PRISM` | non-user-asked mediums that COLLIDE with metal at slots 8/9 — slot-contention logged for the orchestrator; metal reads the live `MEDIUM_ID`, correct under either resolution |
| **NOT TOUCHED** | `BD.W-AUR-ALBUM` | orthogonal palette-derivation register; NOT metal's 2nd consumer (the D7 register the critique killed) |
