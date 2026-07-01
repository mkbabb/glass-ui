# PROCEDURAL-crit — adversarial critique of KS-PROCEDURAL.md

**Critic:** opus adversarial · **Date:** 2026-07-01 · **HEAD:** `fa6ed40a` · **Convergence: 88/100.**
Target: `docs/tranches/BG/keystones/KS-PROCEDURAL.md` (waves 6.1 · 6.3 · 6.4 · 6.5 · 6.6 · 6.8 · 6.9 ·
W-AUR-METAL-FINISH · W-AUR-IMAGE-SOURCE). Every claim below grepped/read on HEAD.

The spec is strong: the nine wave ids match the frozen cursor EXACTLY (no self-inserts; the `6.1+6.2` and
`6.3+6.7` folds and the `6.4` precond `10.5` are all honored — `EXECUTION-PROGRESS.md:105-113`); the SOTA
is named, current, and ADOPT/REJECT-verdicted; the greenfield loops B/C are genuine; the protected-set
discipline is careful (vividness recorded-not-remade, fission held out of 6.9, warm fence held). One MAJOR
defect blocks binding-spec-ready, plus one MODERATE inventory bug and minor nits.

---

## MAJOR — CONFIRMED

### M1 · L8 rests on a disk-FALSE claim; `captureFrame` is not a real method, and the capture-mode `preserveDrawingBuffer` flip lives in aurora's OWN runtime, NOT the shared substrate — so every non-aurora WebGL2-leg pixel-floor π is born-unmeasurable exactly as its feeders warned

The spec's §2 "the ONE correction" REJECTS both feeder reports' R0 flag (SOTA `PROCEDURAL-sota.md:141-148,
504` + corpus `PROCEDURAL-corpus.md:170-177` both demand a `preserveDrawingBuffer:true` substrate fix "or
every paired-engine π on the WebGL2/Safari-real path is born-unmeasurable"). The rejection basis (spec §2,
L8, §8): *"the EXACT-PIXEL read is `captureFrame(timeSec)` in `mode:"capture"` (`useGpuSubstrate.ts:78-79` —
capture-mode auto-flips `preserveDrawingBuffer:true` at context creation)."* This is **false on disk**:

- **`captureFrame` does not exist.** `grep -rln captureFrame src/` → the ONLY hit is the *comment* at
  `useGpuSubstrate.ts:51`. The real handle method is `renderAt(timeSec)` (`useGpuSubstrate.ts:164,390-392`).
  The cited `:78-79` is `mode?: "live" | "capture"` + *"renderAt-only (no auto-loop)"* — it says nothing
  about a `preserveDrawingBuffer` flip.
- **The substrate never sets `preserveDrawingBuffer`.** `grep -rn preserveDrawingBuffer src/composables/glass/`
  → only the two comment lines (`useGpuSubstrate.ts:46,52`). The actual flag is HARDCODED `false` by the
  non-aurora viz themselves (`useGooDotMatrix.ts:471`, `useMetaballRenderer.ts:337`) and `mode:"capture"` in
  the substrate does NOTHING but pre-seed manual suspension. The auto-flip is implemented ONLY in aurora's
  SEPARATE imperative core `aurora/composables/runtime.ts:121-122,165,254` (`shouldPreserveDrawingBuffer`) —
  which is `createAurora`, NOT `useGpuSubstrate`. The substrate comment at `:44-53` describing "the substrate
  auto-flips" is aspirational folklore the spec inherited as family law.

**Blast radius.** 6.6's gate arm (§4.5) states verbatim: *"R1-R6 as numbered floors — all through
capture-mode (L8; the GOLDEN's R0 is satisfied by the substrate contract, NOT a live-default flip)."*
Dotflow renders on the `useGpuSubstrate` WebGL2 state-texture leg — which does NOT flip
`preserveDrawingBuffer` in capture mode. Its floors (`litFrac`, `meanChroma`, orientation-coherence — pixel
statistics, not CSS) therefore read all-zero via in-page readback: **the exact born-unmeasurable defect the
feeders flagged, relocated not solved.** §4.1 ("capture-mode `meanByte > floor`"), §4.7-b ("capture-mode
localContrast"), and §4.9-d ("through capture-mode") inherit the same reliance.

**Why it's only MAJOR not fatal:** L8 ALSO names the compositor screenshot (`locator.screenshot()`), which
IS real, implemented, and used (`goo-blob/RESEARCH.md:194` reads blob pixels this way *precisely because*
`getImageData` "reads empty without `preserveDrawingBuffer`"). So the fix is bounded, not a redesign.

**Required fix.** L8 must: (1) name the real method `renderAt`, delete `captureFrame`; (2) state that the
capture-mode flip is aurora-`runtime.ts`-LOCAL, not a `useGpuSubstrate` contract; (3) route every non-aurora
WebGL2-leg pixel floor (all of 6.6's R1-R6, plus 6.1's `meanByte`) through the compositor screenshot (the
goo-blob precedent) — OR make 6.1/6.6 actually add the capture-mode flip to `useGpuSubstrate` (which is
essentially the feeders' R0, correctly scoped to capture mode). Either way the flat "no wave flips it; the
substrate already handles it" is over-broad and not disk-true for the WebGL2-leg viz. Until corrected, a
build agent grepping for `captureFrame` finds nothing and the dotflow π cannot measure its own floors.

---

## MODERATE — CONFIRMED

### M2 · §4.2 constellation DELETE inventory is internally inconsistent (sum≠total) and omits the dead WebGL2 shaders a full-Canvas2D demigrate must remove

§4.2 bills itself as "the exact DELETE/KEEP file inventory with LOC," but the constellation bullet is broken:
- Itemized: `constellation-{lines,points}.wgsl.ts` (115+97) · `constellationWGPUSetup.ts` (267) ·
  `uniformBridgeWGPU.ts` (196) · `constellationGLSetup.ts` (222) = **897 LOC**, but the bullet header says
  **"~1,066 LOC."** The missing 169 LOC are `constellation-{lines,points}.glsl.ts` (94+75) — the WebGL2
  shaders — which the corpus DELETE list DOES include (`PROCEDURAL-corpus.md:118-120`) and which are dead
  once constellation is fully on `useCanvas2D` (verified present on disk: `constellation/shaders/` carries
  both `.glsl.ts` and `.wgsl.ts`). Fourier's bullet correctly lists `fourier-field.glsl.ts (228)` under
  DELETE (full Canvas2D, no WebGL2 remains) — so the asymmetry is constellation-only.

A build agent following §4.2 verbatim orphans two dead `.glsl.ts` files (the "dead code / incomplete family
table" class the demigrate is meant to close). Fix: add `shaders/constellation-{lines,points}.glsl.ts`
(94+75) to the constellation DELETE list so the itemization sums to the stated 1,066.

---

## MINOR

### m3 · §3.1 mis-describes the `flowTrailDecay` signature (self-contradicts §4.5)
§3.1 writes the helper as `flowTrailDecay(halfLifeSec)`; §4.5-1 says it "already takes `dtRef`." Disk:
`flowTrailDecay(halfLifeSec: number, dtRef = 1/60)` (`constants.ts:48`). §4.5 is right; §3.1 is imprecise.
The DELIVERABLE is disk-accurate and executable — both call sites (`flowSetupGLFlow.ts:253`,
`flowSetupWGPU.ts:347`) DO call `flowTrailDecay(config.trailHalfLife)` omitting `dtRef` (the fixed-60 default
confirmed), so the "one-line re-point to pass measured `dt`" is real. Just fix §3.1's one-arg wording.

### m4 · Metal exhausts BOTH remaining WGSL pad lanes; unstated
The pad-slot claim IS disk-correct (§4.7-5: `cursor.z/.w` off 72/76 are written `0` — confirmed
`uniformBridgeWGPU.ts` `f32[OFF.cursor+2]=0; +3=0`; the spec even correctly drops the corpus's erroneous
"scalars3.w free" — that lane is `uVividness`, written). But metal's two knobs consume the LAST two free
lanes. The spec should note zero WGSL struct pad remains afterward — image-source (§4.9-4) is safe (separate
bind-group/program), but any future shared-struct aurora addition must append a lane. One sentence.

### m5 · Greenfield Loop A is ratification, not fresh design
§3.1's three directions are real, but the loop concludes "the register is BUILT; BG's work is
perfect+close" — the GOLDEN was decided at BD and spike-landed (`a5f184cd`). The spec is HONEST about this
(§4.5 "re-scoped build→perfect"), so it's not theater, but the loop's design-generativity is lower than the
"≥3 brainstormed directions → GOLDEN" framing implies. Loops B (metal) and C (image) are genuinely
generative. No change owed; noted for the convergence read.

---

## Verified STRENGTHS (convergence support — do not regress)
- **Wave binding exact.** Nine ids ≡ cursor; folds (`6.1+6.2`, `6.3+6.7`) + `6.4` precond `10.5` correct;
  no self-inserted rows; the four §7 fold-candidates are notes, not rows.
- **The `uLightDir`-absent-from-WGSL catch is real and load-bearing** — grep confirms `uLightDir` lives on
  the WebGL2 frag (`glSetup.ts:59`, `uniformBridge.ts:284-292`, `frameLoop.ts:75,94`) and is ABSENT from the
  WGSL struct (`uniformBridgeWGPU.ts` = scalars0-3/cursor/ints/palette, no light lane). The cursor-z-synth
  metal + dual-port requirement is correctly derived. Genuinely deft, not contrived.
- **Metal-from-the-discarded-gradient + medium-not-finish taxonomy** — well-argued (the 28-permutation
  untestable-surface rationale is a real argument, not "because frozen"); `MEDIUM_ID` stops at `kuwahara:7`
  confirmed (`uniformBridge.ts:43-56`), 8/9 is the next pair.
- **6.3 DELETE `.wgsl` inventory exists on disk** (all fourier/constellation `.wgsl.ts` present;
  concentric/paper-grid carry both `.wgsl`+`.glsl` so the "delete `.wgsl`, keep `.glsl`" split is accurate).
- **DEFAULT_PARALLAX protector grounded** — `constants.ts:146` = `0` confirmed; `proof-constellation-gen.mjs`
  has zero `DEFAULT_PARALLAX` asserts (`grep -c` → 0), so the born-RED arm is genuinely absent/needed.
- Precepts conformance (§5) is honest: compositor-only/PRM/clean-break/≥2-consumer/warm-fence all held;
  fission kept OUT of the 6.9 `[H]` carve (a fold-note), vividness recorded-not-remade.

---

## The bar to 100
Fix **M1** (the L8 `captureFrame`/`preserveDrawingBuffer` correction — name `renderAt`, scope the flip to
aurora-runtime, route non-aurora pixel floors through the compositor screenshot) and **M2** (the
constellation `.glsl` DELETE omission + sum≠total). m3-m5 are one-line clarity edits. With M1/M2 resolved
the spec is binding-spec-ready: a build agent could execute 6.6's floors and 6.3's delete without hitting a
phantom method or an orphaned-shader/inconsistent-inventory wall.
