# FourierField — WAVE-AMENDMENT (reconciled against the extant 116-wave union set)

> The concrete tranche amendment for the FourierField golden. Cites every touched wave by
> filename in `docs/tranches/BD/union/waves/`. Reference implementation: `GOLDEN.md` (this dir),
> hardened by `challenge/{1,2,3}.md` and reconciled in `DELTA-ASSAY.md`. No duplicative work —
> the draw/keymap/egg/U3 is already owned; the warm ground folds into the demo chassis; only the
> shader-side LOOM (the §2a/§2b/§3b lift) is genuinely net-new and earns ONE narrow wave.

---

## DISPOSITION SUMMARY

| Action | Wave / file | Why |
|---|---|---|
| **AUGMENT** | `BD.W-FOURIER-INTERACT.md` | add the a11y keyboard-equivalent carve for the pointer-draw (WCAG 2.1.1) + the Lens-B perf fences (cap/twin-parity), as STRENGTHENING clauses. No re-spec. |
| **FOLD (no new sibling)** | `BD.W-PAGE-BACKGROUND.md` | the colourful warm GROUND = ONE shared warm-mesh recipe (the dot-matrix amendment already routes its ground here). Add a `substrates → warm-mesh` consume + a born-RED stage-paint clause. |
| **NEW wave** | `BD.W-FOURIER-LOOM.md` (author) | the §2a lit-field bloom seam + the §2b squash head + the §3b cel-shadow + the `FOURIER_PRESET_VIVID` demo lift. Genuinely net-new shader/seam math no extant wave covers. |
| **PRUNE** | — | nothing. No extant wave covers the loom lift; FOURIER-INTERACT covers only draw/keymap/egg/U3. |
| **EXCISE (build, no-legacy)** | — | the phantom `BD.W-VIZ-WARM-FIELD` sibling (DRY-fork vs. PAGE-BACKGROUND); the golden's "tier=field supplies colour" / "zero new GL" / "0.92 hairline" / "spike G1/G2 born-GREEN" claims (corrected per the assay). |

---

## 1. AUGMENT — `BD.W-FOURIER-INTERACT.md`

The wave EXISTS and is AFFIRMED (the draw loop, the `FOURIER_KEYMAP`/`useVizKeyboard` transport,
the Canvas2D egg D1-purge, the numeric U3 round-trip, and its `proof:fourier-interact` F1-F7 gate
are all sound). Add two STRENGTHENING clauses (challenges fold here, not a re-scope):

- **§3/§5 a11y carve (challenge-1 R7 / challenge-2 R6) — the keyboard-equivalent for the draw.**
  The canvas is `aria-hidden="true"` (`FourierField.vue:197`); the draw is pointer-only. State the
  curated ℱ/heart/star gallery (or a "cycle preset shapes" key in `FOURIER_KEYMAP`) as the EXPLICIT
  WCAG-2.1.1 keyboard equivalent: draw = pointer enhancement, keymap = the accessible baseline. The
  host gains an accessible name + `aria-description` ("draw with pointer, or press [key] to cycle
  preset shapes"); selecting a gallery shape drives the SAME `"drawn"`/`activeSpectrum` swap the
  pointer draw does.
- **Gate clause F8 (born-RED) — the draw has a keyboard path.** The `FOURIER_KEYMAP` carries a
  shape-cycle verb that swaps `activeSpectrum` to the curated/`"drawn"` source AND the host has an
  accessible name; an `aria-hidden` host with NO keyboard shape-author path REDs. Reuses the F4
  keymap detector seam.

No other change — the cap-at-`MAX_PHASORS` (F2) and the twin-parity-by-construction (the
CPU-minted `"drawn"` spectrum feeding the SAME `getSpectrum()` seam) the golden's "Lens B fences"
ask for are ALREADY in the wave (§2 + the F2/F7 clauses). Do not duplicate them.

---

## 2. FOLD — `BD.W-PAGE-BACKGROUND.md` (the colourful warm GROUND, ONE shared recipe)

`BD.W-PAGE-BACKGROUND` is the demo-chassis single-writer for per-category live fields +
`tier="field"` staging (`CATEGORY_DEFAULT_BG` + `StoryHero.vue` seam). dot-matrix's WAVE-AMENDMENT
already FOLDS its warm-mesh ground here. Fourier consumes the SAME primitive — **no second mint, no
`BD.W-VIZ-WARM-FIELD` sibling.**

**Augment `BD.W-PAGE-BACKGROUND`:**
- Author the warm-mesh recipe ONCE (the shared `.viz-warm-field`-class CSS the dot-matrix amendment
  references — 2 `radial-gradient`s + 1 slow `conic-gradient`, hues `[20,70]`, sRGB-interp,
  compositor-only, `@property` angle drift > 20s, PRM-frozen). `auroraFallbackGround`-FREE
  (`proof:teal-navy-purge` fence). Dark arm → deep warm-umber centre → near-black edge (NEVER
  gray/teal — the BA.W-NO-GRAY warm floor).
- The fourier stage consumes it via TWO moves (challenge-1 R2): flip `fourier-field.vue:300`
  `tier="quiet"` → `tier="field"` (KILL the `bg-card/40` plate) AND apply `.viz-warm-field` to the
  stage element (PAINT the warm ground). The tier flip alone yields a transparent-still-dead stage.
- **Born-RED clause (extends the dot-matrix G7 to fourier):** the stage region behind the fourier
  glass paints a non-flat WARM hue GRADIENT — sample ≥3 points, OKLab-hue spread within `[20,70]`,
  mean chroma ≥ 0.045, AND ≥2 visibly distinct warm pools (Δhue + ΔL above a perceptual floor — not
  a monochrome coral wash, challenge-2 R7), BOTH modes. NO hue in `[180,270]`. A flat
  `rgba(0,0,0,0)` stage (the HEAD state, measured) REDs.

---

## 3. NEW WAVE — `BD.W-FOURIER-LOOM.md` (the §2a/§2b/§3b lift — the genuine net-new)

The one slice no extant wave covers: the comet that LIGHTS the field, the squash head, the
cel-shadow, the fat-rope demo preset. Reference impl: `GOLDEN.md` §2a/§2b/§3b + this assay.

**Band 13 (V per-viz redevelopments) · depends: `BD.W-PAGE-BACKGROUND` (the warm-field recipe the
bloom rides on) · `BD.W-VIZ-PARITY-METAL` (the WGSL↔GLSL twin-parity net) · sibling
`BD.W-FOURIER-INTERACT` (the draw loop the lit field weaves under — orthogonal, no overlap).**

**The mechanism (every src touch is a refine of an extant file or ONE new shared CPU derive — no fork):**

1. **§2a — the comet lights the field (the SURPASS arm).** A NEW shared `headXY()` derive in
   `useFourierField` (`partialSumAt(getSpectrum(), headT, harmonicN)` once/frame — own the cost
   honestly per challenge-2 R1; the GL twin already runs it, the WGPU twin uploads only the scalar,
   so ONE shared CPU derive kills the engine-asymmetry). The composable EXPORTS `headXY` + the
   cached `FourierFit` (center/scale). The SFC (`FourierField.vue`, NOT `onFrame` — challenge-2 R2)
   writes `hostRef.value.style.setProperty('--ff-head-xy', …)` per frame (+ `--ff-head-hue`
   reactively off `getPalette()`, challenge-1 R8). A bloom SPRITE in `.viz-warm-field`
   **translated** to `--ff-head-xy` (a composite transform, NOT a re-rastered gradient position —
   challenge-3 R3) + a decaying phosphor wake. Light-mode bloom DARKENS-toward-warm, dark-mode
   BRIGHTENS — one blend cannot serve both (challenge-2 R4); Safari-verified pair, no un-gated
   WebKit-only blend.
2. **§2b — the squash head (the ONE new shader math, ~8 lines × twin).** The round head SDF
   (`dHead = length(p - head)`, `render.wgsl.ts:178` / `glsl.ts:145`) becomes a volume-preserving
   anisotropic ellipse off the local tangent `T` from `curveSamples[0]` vs `[1]`. **Guarded cusp:**
   `T = s > EPS ? d/s : lastT`, a SHARED `EPS` in `constants.ts` consumed by both shaders + the GL
   CPU bead path so `s→0` resolves identically (challenge-1 R4 + challenge-3 secondary). The src
   default carries a SMALL non-zero squash gain (challenge-3 R4b — cartoon-weight at rest); the
   vivid preset turns it to 11.
3. **§3b — the cel-shadow + the fat rope.** ~6 shader lines/twin: a second darker offset chain copy
   opposite travel (PRM-static; `prefers-contrast:more` floors the ink UP). The fat two-tone rope +
   louder scaffold are the DEMO `FOURIER_PRESET_VIVID` (`trailWidth→5-6`, `trailFloor→0.40-0.45`,
   `intensity`, `epicycle*`) over the now-darker-warm field — NOT a src-token edit. `presets.ts`
   in `demo/stories/substrates/` already hosts `FLOW_PRESET_*`/`PAPER_GRID_PRESET_*`; the pattern
   is established.
4. **The clock settle (challenge-3 R4a).** `momentum *= Math.pow(0.92, dt*60)`
   (`useFourierField.ts:130,141`) → a bounded-overshoot spring settle (the `--ease-cartoon-punch`/
   `SpringProgress` register, ζ<1). Do NOT copy the exponential to any keyboard scrub.
5. **The PRM "alive at rest" carve (challenge-3 R2).** Under PRM seat the frozen-T phosphor as a
   visible woven WAKE along the frozen partial-sum curve (a luminance ridge, not a single dot) so
   the loom gestalt survives reduced-motion.

**FENCES:** math byte-frozen (`math.ts`); `WARM_IDENTITY_PALETTE` + the render `* 0.7` default
byte-frozen (the lift is presets-in-consumers); the warm field is plain CSS (no
`backdrop-filter:url`/`filter:url` — design.md §L7); twin-parity by SAME-evaluator construction.

### The born-RED gate — `proof:fourier-loom` (`scripts/proof-fourier-loom.mjs`, `tags:["local","ci"]`)

Every BEHAVIORAL clause asserts a RUNTIME CALL-SITE or a COMPUTED readback; survival fences are
labeled static byte-diffs (challenge-1 R6). Born-RED on HEAD by construction.

- **L1 — the §2a seam EXISTS + LIGHTS the field.** `getComputedStyle(host).getPropertyValue('--ff-head-xy')`
  is a parsed `x y` pair in `[0,1]²` AND CHANGES across 2 frames; the field luminance near
  `--ff-head-xy` > far (REAL painted-pixel readback, not the spike proxy — challenges); the bloom
  pixel co-locates with the GPU comet head within ≤2% stage width (the desync fence, challenge-1
  R3). **Born-RED: `--ff-head-xy` is ABSENT at HEAD** (live-measured). PRM → present + STABLE,
  near>far holds.
- **L2 — the head SQUASHES (§2b).** At a high-speed straight tangent-extent > normal-extent
  (anisotropy > 1); at a tight corner it inverts; the webkit project paints the SAME anisotropy
  within an absolute ΔE bar at the SAME frozen-T corner (challenge-1 R4). The src DEFAULT (not only
  the vivid preset) paints anisotropy > 1 at speed (challenge-3 R4b). **Born-RED: round disc at
  HEAD.**
- **L3 — the rope is FAT, not a hairline (D3).** Painted comet stroke-width + peak luminance
  measurably exceed the captured HEAD baseline (`trailWidth:3`/`trailFloor:0.34-0.36`/`peak*0.7` —
  the REAL baseline, NOT 0.92, challenge-3 R1); dominant painted hue ∈ `[20,70]`; the lift reads
  OVER the now-dark-warm field. BOTH modes. **Born-RED on the unlifted preset over a dead ground**
  (1.77% coverage measured).
- **L4 — the clock settle OVERSHOOTS (challenge-3 R4a).** A flick-impulse readback shows the head
  overshoots its rest phase then settles (NOT monotonic exponential decay). **Born-RED on
  `Math.pow(0.92, …)`.**
- **L5 — Safari/PRM floors.** The webkit project paints the rope + squash + cel + bloom; the field
  is plain CSS (no `filter:url`/`backdrop-filter` on it); the bloom is a composite-transform sprite
  (a 60fps frame-budget clause on the webkit project — challenge-3 R3); under PRM the drift +
  bloom-sweep + squash-deform + cel-travel freeze and the woven-wake ridge persists (challenge-3
  R2).
- **L6 — the KEEP survival fence (STATIC arm, labeled).** `math.ts` byte-identical (a diff REDs);
  `WARM_IDENTITY_PALETTE` + the render `* 0.7` default byte-frozen (a src-token edit for the lift
  REDs — the lift is DEMO-only); the curated gallery + the scrub SURVIVE (additive).

**Self-test bites:** (a) `--ff-head-xy` absent → L1 RED; (b) bloom written at the wrong fit (desync
> 2%) → L1 RED; (c) round head → L2 RED; (d) WGPU/GLSL anisotropy disagree at the cusp → L2 RED
(the EPS-guard parity bite); (e) the lift as a src-token edit → L6 RED; (f) `Math.pow(0.92)`
monotonic settle → L4 RED; (g) `screen`-blend bloom invisible in light (no perceptual ΔL) → L1 RED
(the challenge-2 R4 bite); (h) a `math.ts` diff → L6 RED.

**Born-RED on HEAD:** L1 (no seam — measured ABSENT), L2 (round disc), L3 (1.77% hairline over dead
ground), L4 (exponential settle). GREEN only after the bloom seam + the warm-field consume + the
squash + the cel/rope lift + the spring settle land — math byte-frozen throughout.

---

## 4. RECONCILE — no overlap, no dup vs. the union set
- **vs. `BD.W-FOURIER-INTERACT`:** orthogonal. INTERACT owns the draw/keymap/egg/numeric-U3; LOOM
  owns the lit-field/squash/cel/rope lift. The drawn shape WEAVES on LOOM's living field (lighting
  it via §2a) — a compose edge, not an overlap. The a11y carve is folded INTO interact (§1) where
  the draw lives, not duplicated in LOOM.
- **vs. `BD.W-PAGE-BACKGROUND` + the dot-matrix amendment:** ONE shared warm-mesh recipe, authored
  in PAGE-BACKGROUND's facility, consumed by both vizzes — the DRY union (no `BD.W-VIZ-WARM-FIELD`
  fork).
- **vs. `BD.W-VIZ-PARITY-METAL`:** the §2b/cel land inside its WGSL↔GLSL twin net (the CSS ground +
  bloom are outside the shader twin — engine-identical by construction).
- **vs. the dot/goo vizzes:** the loom is a thread-weaving epicycle structure, not a dot lattice or
  a metaball — the ONLY shared seam is the intentional `.viz-warm-field`. Fourier has NO
  meatball/blob register (the metaball law is dock/blob's, not here).
