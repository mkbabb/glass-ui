# FourierField — DELTA-ASSAY (golden vs. current, the UNION path)

> The survival-of-the-fittest reconciliation: GOLDEN.md (+ the three challenges, folded as
> hardening) vs. the live `/substrates/fourier-field` implementation at HEAD. Live-inspected
> on `:5173` (both modes, painted-pixel readback + DOM bg-chain + composable/shader source).
> Verdict: **REFINE-dominant** (the bones are fit; the §3 ground is the one genuine RE-INVENT).
> Reconciled against the extant 116-wave union set — no duplicative work.

---

## 0. LIVE DELTA (what the eye + the readback actually measure)

Driven both modes, default-to-broken. The three diagnosed defects are **CONFIRMED born-RED**:

| Probe | HEAD measurement | Verdict |
|---|---|---|
| `--ff-head-xy` (the §2a lit-field seam) | `getComputedStyle(documentElement)` → **ABSENT** | D2 confirmed — no seam |
| Stage + 4 ancestors `background` | ALL `rgba(0,0,0,0)`, `background-image: none` | **D1 confirmed — dead ground** |
| Nearest painted surface | `.configurator.glass-floating` → `oklab(0.793 0.005 0.012)` → chroma **≈0.012** | under the §3 0.045 floor — gray-cream glass over nothing |
| Canvas painted coverage (light) | **1.77%** of pixels, mean painted RGB `[238,105,104]` | **D3 confirmed — thin coral hairline diagram** |
| Canvas painted coverage (dark) | **1.87%**, mean RGB `[238,107,105]`, glass plate `oklab(0.379 0.010 0.017/0.89)` | dark glass IS warm-umber (NOT gray — warm floor holds) but it is the PLATE, not a colourful field behind it |
| Stage `ShowcaseFrame` tier | `tier="quiet"` (`fourier-field.vue:300`) | the occluding `bg-card/40` plate, not `field` |

The viz reads as a **faint coral diagram floating over a dead cream (light) / dead umber (dark)
ground**, exactly the golden's headline. The math is correct, the engines paint, the structure
is coherent — but there is no field behind the glass, no draw, the chain is a hairline.

---

## 1. SURVIVAL TRIAGE (KEEP / REFINE / RE-INVENT)

### KEEP (fit — byte-frozen or additive-only)
- **The math leaf** (`math.ts`) — `dftFromPoints`/`partialSumAt`/`positionsAt`/`makeEllipticSpectrum`/
  `comp`, machine-precise (3.04e-15 round-trip). **NEVER re-touch.**
- **The twin engine + substrate lifecycle** — the WGSL compute/render twin
  (`fourier-field.compute.wgsl.ts` + `…render.wgsl.ts`) and the WebGL2 GLSL twin
  (`fourierFieldGLSetup.ts` + `fourier-field.glsl.ts`), both stepping the SAME evaluator over
  `createGpuSubstrate` (offscreen-pause, PRM freeze, DPR). Not a rebuild.
- **The ONE `head_t` clock + scrub + 2-D follow-lean** (`useFourierField.ts:100-165`,
  `SCRUB_GAIN`/`FOLLOW_LEAN` in `constants.ts`). The velocity scrub + the cursor-follow are the
  shipped interaction baseline.
- **The curated ℱ/heart/star gallery** (`fourier-paths.ts`) + the `WARM_IDENTITY_PALETTE`
  (`constants.ts:97`) + the render `* 0.7` scaffold default (`render.wgsl.ts:151`).
- **The configurator + transport** (`fourier-field.vue` — source/N/epicycles/comet/color rows +
  `DockBackgroundToggle` pause + `GlassTimeline` scrubber). The reactive-config Proxy/getter wiring
  is correct (every edit reaches the renderer).

### REFINE (weak — the presence + the punch)
- **D3 — the chain/comet read pastel-hairline** (1.77% coverage, faint over cream). The fix is
  TWO-lever: (a) a darker-warm field BEHIND it (the dominant lever — challenge-3 R1 proved the
  field, not the floor, carries D3), (b) a louder DEMO preset (`trailWidth→5-6`,
  `trailFloor→0.40-0.45`, `intensity`, `epicycle*`). The HEAD baseline is `trailWidth:3` /
  `trailFloor:0.34(hero)/0.36(final)` (`presets.ts:71,79,99`) — **NOT the phantom 0.92** the
  golden's G3 cited (challenge-3 R1). The src defaults stay byte-frozen; the lift is
  presets-in-consumers.
- **§2b squash head + cel-shadow** — the cartoon punch. The shipped head is a round disc on both
  twins (`dHead = length(p - head)`, `render.wgsl.ts:178` / `glsl.ts:145`). The squash is the ONE
  net-new shader math (volume-preserving anisotropic ellipse off the local tangent). Challenge-3
  R4b: the src DEFAULT must carry a SMALL non-zero squash (`k` small-but-visible) so the library
  identity has cartoon-weight at rest — not `k≈0`-OFF-in-src.
- **The clock momentum** — challenge-3 R4a: `momentum *= Math.pow(0.92, dt*60)`
  (`useFourierField.ts:130,141`) is a stiff exponential decay (inertia, no overshoot) — the
  "tight" settle the liquid-weight law forbids. REFINE toward a bounded-overshoot spring settle
  (the `--ease-cartoon-punch` / `SpringProgress` register), and do NOT propagate the exponential
  to the keyboard scrub.

### RE-INVENT (absent — the one genuine net-new)
- **THE GROUND (D1)** — there is no colourful field behind the glass. A NEW warm-amber CSS field
  is owed, and (the §2a SURPASS arm) it is LIT BY the comet via a per-frame `--ff-head-xy` seam.
  This is the only true re-invent; everything else is refine/keep.
- **DRAW-YOUR-OWN (D2)** — net-new, but **ALREADY OWNED** by `BD.W-FOURIER-INTERACT`
  (the wave EXISTS at `docs/tranches/BD/union/waves/BD.W-FOURIER-INTERACT.md` — challenge-2 R5's
  "phantom wave" claim is FALSE; the wave is real and AFFIRMED). Not re-specced here.

---

## 2. THE UNION PATH (deft integration — reuse extant primitives, KISS, no dual-path, no legacy)

The golden is a UNION, not a fork. Every src touch is a refine of an extant file or ONE new
composable/utility. The path, with the challenge-hardenings folded:

### U-A. The warm field GROUND + the §2a lit-field bloom (the RE-INVENT)
- **DEFER the ground primitive's HOME to the demo-chassis facility, NOT a fourier-bespoke wave.**
  Challenge-3 R-secondary + the live reconcile proved a DRY hazard: dot-matrix's WAVE-AMENDMENT
  already FOLDS its warm-mesh ground into `BD.W-PAGE-BACKGROUND` ("a small NEW warm-mesh CSS
  primitive, NOT `auroraFallbackGround`"). Two greenfields each minting a warm mesh = the exact
  fork the shared util was meant to prevent. **The union: ONE shared warm-mesh recipe, authored
  ONCE** (a small demo/chassis `@utility`/CSS, riding `BD.W-PAGE-BACKGROUND`'s single-writer
  seam), consumed by BOTH dot-matrix and fourier (and the other flat vizzes that genuinely sit on
  a dead ground — enumerate, don't assert ≥7 per challenge-1 R5). **It is `auroraFallbackGround`-
  FREE** (teal-navy purge) and **hues in `[20,70]`** (the `proof:teal-navy-purge` fence,
  `scripts/proof-teal-navy-purge.mjs:67` already binds `constants.ts`).
- **The fourier consume is TWO moves, not one** (challenge-1 R2): (a) flip `tier="quiet"` →
  `tier="field"` to KILL the occluding `bg-card/40` plate (`fourier-field.vue:300`); AND (b) apply
  the shared `.viz-warm-field` to the STAGE element to PAINT the warm ground. The tier flip alone
  yields a transparent (still-dead) stage — the primitive is the load-bearing half.
- **The §2a bloom seam — own the cost honestly + re-home the write-site** (challenge-2 R1/R2):
  - The seam is a **NEW shared CPU `headXY()` derive** in `useFourierField` —
    `partialSumAt(getSpectrum(), headT, harmonicN)` once per frame (N≤64 cos/sin, cheap). It is
    NOT "zero new GL": the GL twin already runs `partialSumAt` CPU-side (`fourierFieldGLSetup.ts:165`),
    but the WGPU twin computes the head INSIDE the compute shader and uploads only the `headT`
    scalar (`fourierFieldWGPUSetup.ts:252`, no `mapAsync`/readback). One shared CPU derive
    consumed by BOTH twins kills the engine-asymmetry by construction.
  - The `setProperty` write is **SFC-level, not inside `onFrame`** — `onFrame(timeSec)` has no host
    element in scope; the styleable wrapper is `hostRef` in `FourierField.vue:193`. Expose `headXY`
    from the composable; the SFC writes `hostRef.value.style.setProperty('--ff-head-xy', …)` in a
    frame hook (the `useGlassBackdropLuminance.ts:442` observer pattern — precedented, but the
    fourier seam OWNS its target wiring, it is not "verbatim").
  - **Export the cached `FourierFit`** (center/scale, `computeFourierFit`, `uniformBridgeWGPU.ts:92`)
    from the composable so the SFC maps model→`[0,1]²` off the SAME fit the GPU uses — no re-derived
    CPU fit that can drift (challenge-1 R3 desync fence).
  - `--ff-head-hue` is written **reactively off `getPalette()`** (on palette/mode change, not
    per-frame) so the bloom hue tracks the active warm anchor (challenge-1 R8).
- **The light-mode blend (challenge-2 R4 — the load-bearing visual fix).** `mix-blend-mode: screen`
  over a near-white cream is a no-op (the SURPASS mechanism faint in the exact mode D3 flags). The
  light-mode bloom must DARKEN-toward-warm (a warm-amber pool that deepens over cream —
  `multiply`/`color-burn`/a 2nd darkening layer), the dark-mode bloom BRIGHTENS — **one blend
  cannot serve both**. Pick a Safari-verified pair (no WebKit-only `plus-darker` un-gated).
- **The per-frame PAINT honesty (challenge-3 R3).** A moving `radial-gradient` CENTER is a per-frame
  PAINT, not a composite-transform. Prefer a fixed-size bloom SPRITE **translated** to
  `--ff-head-xy` (`translate(...)`, a true compositor transform) over re-rastering a gradient
  position. Gate a frame-budget clause on the webkit project.

### U-B. The loom presence + punch (the REFINE)
- The fat two-tone rope + the louder scaffold are a **DEMO preset** (`FOURIER_PRESET_VIVID` in
  `demo/stories/substrates/presets.ts` — the file EXISTS, already hosts `FLOW_PRESET_*`/
  `CONCENTRIC_PRESET_*`/`PAPER_GRID_PRESET_*`; the pattern is established). The src defaults +
  `WARM_IDENTITY_PALETTE` + the `* 0.7` scaffold stay byte-frozen.
- The §2b squash + the cel-shadow land in `fourier-field.render.wgsl.ts` AND `fourier-field.glsl.ts`
  AND the GL CPU bead path, all derived from the SAME `partialSumAt` tangent → parity by
  construction. **Guard the cusp**: `T = s > EPS ? d/s : lastT` with a SHARED `EPS` in
  `constants.ts` consumed by both shaders + the CPU path, so the degenerate `s→0` resolves
  identically across engines (challenge-1 R4 + challenge-3 secondary). The src default carries a
  small non-zero squash gain (challenge-3 R4b); the vivid preset turns it to 11.
- The clock settle → a bounded-overshoot spring (challenge-3 R4a).

### U-C. The draw / keymap / egg / numeric-U3 (AFFIRM `BD.W-FOURIER-INTERACT` — already owned)
- The wave EXISTS and specs the draw loop (`useFourierStroke`: pointerdown→move→up →
  arc-length resample capped at `MAX_PHASORS=64` → the SHIPPED `dftFromPoints` → swap into a
  `"drawn"` source), the transport keymap (`FOURIER_KEYMAP` via `useVizKeyboard`, focus-guarded to
  the host), the Canvas2D egg D1-purge (`FRedrawOverlay` → `<FourierField source="drawn">`), and
  the REAL numeric U3 (`shader-eval-harness` JS↔WGSL round-trip with a coefficient-flip bite). Its
  born-RED gate `proof:fourier-interact` (F1-F7) is sound. **AFFIRMED verbatim** — the golden adds
  only staging + perf clauses (below), never a re-spec.
- **The a11y keyboard-equivalent for the draw (challenge-1 R7 / challenge-2 R6 — fold into the wave).**
  The canvas is `aria-hidden="true"` (`FourierField.vue:197`) and the draw is pointer-only. The
  curated ℱ/heart/star gallery (or a "cycle preset shapes" key) is the EXPLICIT WCAG-2.1.1 keyboard
  equivalent: draw = pointer enhancement, keymap = the accessible baseline. The host gains an
  accessible name + an `aria-description` ("draw with pointer, or press [key] to cycle preset
  shapes"); the gallery drives the SAME `"drawn"`/`activeSpectrum` swap.

### U-D. The PRM "alive at rest" carve (challenge-3 R2 — the deepest gestalt note)
Under PRM the conic drift freezes, the bloom freezes — and the field collapses to a GENERIC warm
card (the loom gestalt dies). The carve: seat the frozen-T phosphor as a visible woven WAKE along
the frozen partial-sum curve (a luminance ridge along the path, not a single frozen dot), so "the
loom wove this" survives reduced-motion. Optionally φ-lock the conic-drift period to the spectrum
fundamental (the §L6 "nothing arbitrary" precept) so the ambient breath is harmonically-meant.

---

## 3. WHAT THE GOLDEN GETS WRONG (struck / corrected before build)
- **The §9 spike "G1/G2 born-GREEN" is theater** (all three challenges). Its `fieldLumaAt()` is a
  geometric distance-to-where-the-var-was-written PROXY, not a painted-pixel read; `screen`-blend
  visibility (esp. the dark-core gray-white risk + the light-mode no-op) is never measured. RESTATE
  §9: the spike de-risks the SEAM PLUMBING (one setProperty/frame, the sprite tracks), NOT the
  painted readback. The painted G1/G2 are proven first in the src build's π. (Optionally upgrade the
  spike to a real `getImageData`/OKLab readback — but it is not load-bearing for the amendment.)
- **G3's "0.92 hairline" is fabricated** (challenge-3 R1). Cite the REAL HEAD baseline
  (`trailWidth:3`, `trailFloor:0.34/0.36`, `peak*0.7`) and assert the DELTA over that captured
  baseline.
- **"`tier="field"` supplies the colour" is false** (challenge-1 R2) — it only drops the plate.
- **"zero new GL / `onFrame` writes the var" is false** (challenge-2 R1/R2) — the seam is a new
  shared CPU derive, written at the SFC.
- **`BD.W-VIZ-WARM-FIELD` as a NEW sibling micro-wave is a DRY-fork** vs. dot-matrix +
  `BD.W-PAGE-BACKGROUND`. The warm ground FOLDS into the demo-chassis facility (ONE shared recipe),
  not a third wave.

---

## 4. UNION VERDICT

**REFINE-dominant.** The math, the twin engines, the lifecycle, the clock, the curated gallery,
the configurator are all FIT and survive (byte-frozen / additive). The chain presence + the head
punch + the clock settle are REFINEs (demo preset + ~14 shader lines + a spring leaf). The ONLY
genuine RE-INVENT is the colourful GROUND + the §2a lit-field bloom — and even that unions onto an
extant CSS-recipe layer + the shared demo-chassis facility, not a parallel system. The draw-your-own
is net-new but already owned by an existing wave. **No fork, no legacy, no dual-path.**
