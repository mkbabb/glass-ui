# PaperGrid — WAVE-AMENDMENT (the concrete tranche reconciliation)

> Reference implementation: `docs/tranches/BD/greenfield/paper-grid/GOLDEN.md` (the LIT RIPPLING
> PAPER SHEET — render the cell FACE, lit by the slope of the SAME traveling-wave height the twist
> already rides, with a volume-preserving squash). Reconciled against the extant 116-wave union
> set (`docs/tranches/BD/union/waves/`). NO duplicative work. The verdict is **REFINE** — one
> fragment FACE layer on the KEPT `cellTwist`, all math in the shared `waveField` leaf.

---

## The headline reconciliation: `BD.W-PAPERGRID-WARP` is DOUBLY STALE → RE-POINT (do NOT add a sibling)

`BD.W-PAPERGRID-WARP.md` (the ONLY existing paper-grid wave) is scoped to *"DEEPEN the (already
genuine Bridson curlFBM) warp by +1 octave on `curlWarp`."* That premise is dead twice over,
verified at HEAD:

1. **`curlWarp` is RETIRED from the live path.** `paperGrid.ts:113`: *"§3/§4 RETIRED — the
   LINE-warp `curlWarp` + the radial `cursorBulge` are GONE (clean break, no alias)."* The active
   mechanism is `cellTwist` (per-cell rotate/shear) + `cursorSwirl`. Only stale prose comments +
   `README.md` still name `curlWarp`. So the wave's "+1 octave on `curlWarp`" targets a function
   that no longer exists in the render.
2. **The remaining defect is NOT the warp depth — it is the ABSENT FACE.** The live render
   (`delta-canvas-{light,dark}.png`) shows the cells DO twist but paint only line ink
   (`vec4f(col*a,a)`, `paper-grid.wgsl.ts:195`) → the warp is INVISIBLE. A deeper warp does not
   fix invisibility; a filled lit face does.

**AMENDMENT — AUGMENT/RE-POINT `BD.W-PAPERGRID-WARP` in place (no parallel fork, no legacy):**
rewrite its scope from *"+1 line-octave on the retired `curlWarp`"* → *"+1 FACE layer on the kept
`cellTwist`: a height-lit, squashed filled cell face, all math in the shared `waveField` leaf,
referencing GOLDEN.md."* KEEP its THREE fit fences VERBATIM — they transfer cleanly:

- **the cell-pitch CV < 0.15 legibility fence** — now BOUNDS the squash inset (the face inflates
  but the grid stays legible) instead of the warp depth;
- **the byte-identical default** — re-pointed from `depth:0` → `faceAlpha:0` (the face evaporates
  → HEAD-identical, the `proof:viz-papergrid` cage + warm-identity fence stay GREEN);
- **the NUMERIC twin parity** (the `shader-eval-harness.assertParity` net via `BD.W-WAVE-FIELD-
  HARNESS`, NOT the name-presence P3) — now witnesses `cellHeight`/`faceRelief`/`facePlateau` +
  the refactored `cellTwist` round-trip, with a sign-flip/coefficient-drift bite.

The wave's predecessor edges are KEPT and CORRECT: **DEPENDS `BD.W-WAVE-FIELD-HARNESS`** (the new
leaf fns close against the real numeric round-trip) + **DEPENDS `BD.W-FIELD-ENGINE`** (the curl
basis the height reuses — no second basis). De-stale the body's `curlWarp`/`waveAmplitude`/
`depth` language to the `cellTwist`/`faceAlpha` reality (no-legacy hygiene) + correct the stale
`README.md`/source comments that still cite the retired `curlWarp`.

---

## NEW wave to author: `BD.W-PAPERGRID-FACE`

`BD.W-PAPERGRID-WARP` carries the FENCES + the parity discipline (the re-pointed legibility/
default/parity spine). The FACE mechanism + its vivid register + the born-RED painted-pixel gate
are net-new enough to warrant a dedicated companion wave (the concentric-relief / fourier-loom
precedent — a fences-wave + a finishing-layer wave). It REFERENCES GOLDEN.md as the reference
implementation.

**Band 13 (per-viz redevelopments) · depends: `BD.W-PAPERGRID-WARP` (the re-pointed fences),
`BD.W-WAVE-FIELD-HARNESS` (numeric parity net), `BD.W-FIELD-ENGINE` (shared curl basis),
`BD.W-MOTION-WEIGHT` + `BD.W-CARTOON-PUNCH` (the macro cel register tokens — DEPEND, do not
duplicate). Cross-link: `BD.W-PAGE-BACKGROUND` (the §3 field).**

**The mechanism (per GOLDEN §2, all folds applied):**
1. `waveField.ts`(+`.glsl`+`.wgsl`): refactor `cellTwist` to RETURN `{ g, cc, env }` (FOLD A — the
   pre-twist driver pivot); add `cellHeight` (surfaces the envelope; `cellTwist` calls it → ONE
   envelope), `faceRelief` (central-difference slope, NO `dFdx` on height → Safari-safe),
   `facePlateau` (soft inset-square; `aa=fwidth(g)` shaders / fixed `uvDeriv` JS).
2. `paperGrid.ts` `samplePaperGrid`: sample height/relief at the driver `cc`; multi-stop warm-
   divergent `faceInk=ramp(mix(shade,h))` (FOLD B — height-keyed crest, NOT a 2-point mid-park
   `mix`); crest-gate the `TWIST_FLOOR` (FOLD C — `floor·env` so off-crest relaxes to calm paper);
   `inset=baseInset·(1−squashK·h)`; `faceA=face·faceAlpha·fieldAlpha` (FOLD D — drop the `h`-term;
   shade carries brightness, squash carries inflation; ONE field-blend scalar, `fieldAlpha`
   reconciled).
3. `paper-grid.{wgsl,glsl}.ts` `fs_main`: face composite UNDER the KEPT Golus creases, premultiplied
   over transparent; face ink through the shared `linearToSrgb`/OETF (the production color space).
4. `constants.ts`: OPT-IN config — `faceAlpha` (**default 0** → byte-identical), `faceRelief`,
   `squashK`, `baseInset`, `faceWarmLo/Hi` (hue∈[20,90]), `lightDir`; register `--paper-grid-face-
   depth` `@property <number>` inheriting.
5. `demo/.../presets.ts`: `PAPER_GRID_PRESET_RIPPLE` (vivid, demo-only — `faceAlpha:0` stays the
   src identity); the substrate route leads with it. The cursor height-bump is DECORATIVE only
   (stays `aria-hidden`, NO keyboard owed — challenge-2 R4 resolved as non-interactive ambient art).
6. The substrate route adds ONE small warm stage-paint (DEPEND-cross-linked to `BD.W-PAGE-
   BACKGROUND`, NOT `auroraFallbackGround`) so the lit sheet reads glass-over-painterly.

**The born-RED gate — `proof:viz-papergrid` FACE arm (extend-in-place; painted-pixel, NOT a
geometric proxy).** CRITICAL precondition (the preserved-buffer trap, live-reproduced: an
out-of-frame `drawImage`/`readPixels` on this `webgl2` canvas returns ALL-ZERO): the gate MUST
read the DRAWN buffer (a `preserveDrawingBuffer:true` capture context OR a `take_screenshot` pixel
oracle OR a post-`drawArrays` in-frame hook); an all-zero readback FAILS LOUD. The face clauses
measure over a NEUTRALIZED background (a missing/flat field REDS the FACE gate instead of a vivid
conic masking it — challenge-2 R1.3):

- **G1 — cells read as LIT FACES.** Over the crest band, `facePaintFrac ≥ 0.4` AND `sdLuma ≥ floor`.
  HEAD reds (`vec4f(col*a,a)` → `facePaintFrac ≈ 0`).
- **G1b — lit-CV floor (challenge-3 R1.2/FOLD B).** `sdLuma/meanLuma ≥ 0.35` over the FACE,
  field-neutralized. A washed-out low-contrast tan REDS.
- **G2 — coherent TRAVELING front.** Over ≥8 frames the bright-face band translates along `waveDir`
  (cross-correlation peak shift), with a static-hold CONTROL (a stationary lit band must RED).
- **G2b — off-crest calm (challenge-3 R2/FOLD C).** Trough-band cell-twist magnitude < 0.3× the
  crest band. A global crinkle (the floor leaking off-crest) REDS.
- **G3 — vivid + warm, NO teal/navy.** `warmHueFrac ≥ 0.85` (hue∈[20,90]) over faces,
  `tealNavyFrac = 0` (hue∈[180,270]). HEAD reds (flat plate).
- **G3b — crest hue REACH (challenge-3 R1/FOLD B).** Over the brightest face-decile, hue ≥ 55 for
  ≥ 0.3 of pixels (the wheat crest must PAINT). A muddy brown-orange monochrome REDS.
- **G4 — NUMERIC twin parity.** `cellHeight`/`faceRelief`/`facePlateau` + the refactored
  `cellTwist` round-trip JS↔WGSL↔GLSL ≈0 via `assertParity`. A coefficient flip in one backend reds.
- **G4b — pivot registration (FOLD A).** The bright-face centroid coincides (within ½ cell) with
  the max-twist cell centroid over the crest band. A post-twist-pivot desync REDS.
- **G5 — legibility + PRM + byte-default.** The Golus crossings unmoved by the height-lift (a SHADE,
  not a smear), CV < 0.15 under the squash; PRM → ONE flat static lit frame (warm, not gray); the
  bare `<PaperGrid>` (`faceAlpha:0`) byte-identical to the HEAD line-only capture. BOTH modes + the
  WebKit project.
- **G6 (DEPEND-gated) — the §3 field chroma.** The substrate stage field behind measures chroma
  ≥ 0.045; conditionally-RED until the stage-paint lands (cross-linked to `BD.W-PAGE-BACKGROUND`),
  NOT merged before it.

**Self-test bites:** flat-fill face (no slope-shade) → G1b RED; a 2-point mid-park ramp → G3b RED;
a stationary pulse → G2 RED; the floor leaking off-crest → G2b RED; a post-twist pivot → G4b RED;
a cool [180,270] highlight → G3 RED; a sign-flipped `∇H` in one backend → G4 RED; a non-zero
default `faceAlpha` → G5 RED; a squash that moves the Golus crossings → G5 RED; an all-zero
readback → FAILS LOUD.

**π — `tests-visual/papergrid-face.spec.ts`** (NET-NEW): the painted-truth readback, BOTH modes +
the **webkit project**, over a NEUTRALIZED field (the face carries the read) + a separate field-on
frame for G6, served at the π port, NEVER `reducedMotion` (except the PRM arm). The committed
in-frame readback is the artifact (RED on HEAD, GREEN on the spike).

---

## The PRUNE / EXCISE / NO-OP reconciliation (against the union set)

- **PRUNE — nothing.** No existing wave is made redundant; `BD.W-PAPERGRID-WARP` is RE-POINTED in
  place (its fences survive), not deleted.
- **EXCISE (in the re-point) — the stale `curlWarp`/`+1-octave`/`waveAmplitude`/`depth` framing**
  from `BD.W-PAPERGRID-WARP`'s body (it targets a retired function) + the `README.md`/source
  comments still citing the retired `curlWarp` (no-legacy hygiene). HARVEST the wave's parity-net +
  CV-fence + byte-default machinery (re-aimed at the face).
- **CUT the "concentric inherits the face for free" line** from GOLDEN §0/§2a (challenge-3 R5):
  concentric's height is `heightField` (FBM), NOT `cellHeight`; the leaf placement is the right DRY
  home (concentric MAY later reuse), but it is not auto-inheritance.
- **NO-OP / cross-link (no edit):** `BD.W-CONCENTRIC-RELIEF`/`-LEVELSET` (concentric reuses the
  shared leaf — kindred, no dup; the face fns are paper-grid-consumed); `BD.W-WAVE-FIELD-HARNESS`
  (the numeric net — DEPEND, already in-wave); `BD.W-FIELD-ENGINE` (the shared curl basis — DEPEND);
  `BD.W-MOTION-WEIGHT`/`BD.W-CARTOON-PUNCH` (the macro cel tokens — DEPEND, the cartoon-shadow/
  motion-spring siblings already book them, do NOT duplicate); `BD.W-PAGE-BACKGROUND`
  (cross-link for G6 — it enrolls forms/feedback, NOT the substrates band, so the substrate
  route's own stage-paint is THIS wave's small add, cross-linked not subsumed).

---

## Summary table

| Wave | Action | What |
|---|---|---|
| `BD.W-PAPERGRID-WARP` | **AUGMENT / RE-POINT** | scope: "+1 octave on retired `curlWarp`" → "+1 FACE layer on kept `cellTwist`, per GOLDEN.md"; KEEP the 3 fences (CV<0.15→bounds squash; byte-default→`faceAlpha:0`; numeric parity→face fns); EXCISE the stale `curlWarp`/octave/depth framing + source comments |
| `BD.W-PAPERGRID-FACE` | **NEW (author)** | the height-lit squashed face + multi-stop warm-divergent ramp + crest-gated floor + pre-twist pivot; born-RED `proof:viz-papergrid` FACE arm (G1/G1b/G2/G2b/G3/G3b/G4/G4b/G5/G6) + `papergrid-face.spec.ts` paired-engine π; references GOLDEN.md |
| `BD.W-WAVE-FIELD-HARNESS` | DEPEND (no edit) | numeric parity net for the new leaf fns |
| `BD.W-FIELD-ENGINE` | DEPEND (no edit) | shared curl basis (no second noise basis) |
| `BD.W-MOTION-WEIGHT` / `BD.W-CARTOON-PUNCH` | DEPEND (no edit) | macro cel register tokens (no dup) |
| `BD.W-PAGE-BACKGROUND` | CROSS-LINK (no edit) | the §3 field for G6 (substrate route's own stage-paint, cross-linked not subsumed) |
| `BD.W-CONCENTRIC-RELIEF/-LEVELSET` | NO-OP (no edit) | kindred shared-leaf reuse, no dup |
