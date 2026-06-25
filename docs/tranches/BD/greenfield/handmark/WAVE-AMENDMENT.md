# HANDMARK — WAVE-AMENDMENT (the concrete tranche reconciliation)

> Reconciled against the extant 116-wave BD/union set. Reference implementation: `docs/tranches/BD/greenfield/handmark/GOLDEN.md` (+ the corrections in `DELTA-ASSAY.md`). No duplicative work — the boil re-author + 7×4 demo + measuring gate already live in `BD.W-HANDMARK-AUDIT`; this AUGMENTS it (gate-keying correction + highlighter fence + crayon/marker→hull) and authors TWO NEW dependent waves for the genuinely-new scope (the opt-in cartoon weight; the cousins-union). Nothing pruned or excised.

## Disposition summary

| Wave | Action | Why |
|---|---|---|
| `BD.W-HANDMARK-AUDIT` (exists) | **AUGMENT** | already owns Move 1 (boil re-author) + Move 2 (demo 7×4) + the measuring gate; fold the gate-keying correction + the crayon/marker→hull arm + the highlighter regression fence + the prose corrections |
| `BD.W-FOURIER-INTERACT` (exists) | **NO CHANGE** (cited) | the ℱ-showpiece is a downstream read-only CONSUMER of `dftFromPoints`/`positionsAt`, not a re-fork |
| `BD.W-PRECEPT-CANON` (exists) | **NO CHANGE** (cited as dependency edge) | mints `--ease-cartoon-punch` + `--motion-weight` (the §L4 cartoon register); the cartoon-weight wave is a CONSUMER, hard-blocked on this mint |
| `BD.W-HANDMARK-CARTOON-WEIGHT` | **NEW** | Move 3 — the opt-in `weight` cartoon draw-on; token-blocked, sequenced AFTER the core |
| `BD.W-INKEVENT-UNION` | **NEW** | Moves 4+5 — the ℱ-redraw showpiece + the seal fold under the one ink family |

---

## A. AUGMENT `BD.W-HANDMARK-AUDIT.md`

The wave's scope (re-author `naturalUnderlinePoints` + expand the demo to 7×4 + add the measuring `proof:handmark-audit`) is KEPT. Fold these amendments:

### A.1 — RE-KEY the gate's A1 discriminator (THE load-bearing correction)

The wave's §gate A1 currently keys born-RED on **both** spacing-CV ≥ 0.18 AND an autocorrelation periodicity peak ≤ `PERIODIC_PEAK_CEIL` (0.6). **The autocorr-peak ceiling is REMOVED as a discriminator** — it is seed-overfit and sampling-fragile (DELTA-ASSAY §2, measured over 400 seeds: 73% breach 0.6 at the gate's segs=14, maxPeak 0.883 > the HEAD sinusoid's 0.85; and at fixed RES=64 the value-noise autocorr is HIGHER than the sinusoid because smooth low-frequency noise self-correlates). The §9 spike's GREEN was a 4-seed lucky draw on a metric that cannot separate value-noise from a sinusoid.

**Re-keyed A1 (born-RED on HEAD, robustly GREEN on the golden):**
- The discriminator is **inter-extremum SPACING-CV, mean over ≥3 seeds ≥ `SPACING_CV_FLOOR` = 0.30** (measured headroom: NEW median 0.53, OLD median 0.14; the OLD sinusoid mean-over-seeds is ≤0.20 → REDs; the golden value-noise ≥0.40 → GREEN). Sampled at the REAL span-driven segment count (decoupled from any gate-fixed N — measure at the count the paint uses, or sweep 6/9/14/20 and require the floor at every count).
- Autocorr-peak is DEMOTED to a non-load-bearing corroborating rail (ceiling relaxed to ≤0.85, a sanity check only) OR dropped — it is NOT the born-RED teeth.
- `facts.boilSpacing` records per-seed spacing-CV (the discriminator) + the autocorr-peak (rail).
- **Self-test bite (a) re-keyed:** a clean `amp·sin(2π·periods·t)` → A1 RED on spacing-CV (a strict sinusoid has near-uniform extremum spacing, CV→0). Bite (b) (irregular spacing + clean `sin(π·t)` envelope) stays the A2 amplitude bite.

### A.2 — RE-RUN the de-risk spike before claiming "de-risked"

`golden/boil-spike.mjs` MUST be extended to (i) run ≥256 seeds and print p100 spacing-CV (and the autocorr rail), and (ii) **spike the FULL render path** — feed the value-noise centerline through the REAL `addPressure(curvature)`→`getStroke` and measure post-hull spacing-CV ≥ floor AND emitted hull width-CV ≥ floor, at both `streamline=0.2` and `0.53`. Pin the compose order: **value-noise centerline → ONE Catmull pre-smooth → curvature→pressure → hull**, boil `streamline` lowered to ~0.2 so the wander survives the low-pass. Pin the curvature constants (window, clamp 0.05..1, gain). The wave's §9 "de-risk status" line is corrected to cite the spacing-CV discriminator + the post-hull measurement (the autocorr framing is struck).

### A.3 — ADD gate arm A8 (the highlighter regression fence, born-GREEN must-stay)

The `addPressure` curvature re-author (`ink.ts:47`) is the SINGLE pressure source for `ribbon:'hull'`, and **the highlighter already ships `ribbon:'hull'`** (`brush.ts:258`) — so the re-author re-paints a shipped, audited brush. The wave's A7 byte-fence cannot catch this (a logic change to `addPressure` IS an `ink.ts` edit). **A8 (born-GREEN): the highlighter's emitted hull width-profile (mean width + width-CV at a fixed seed) stays within ±ε of the HEAD baseline** — prove the curvature term is a no-op on the highlighter's low-curvature flat slab, or screenshot+accept the delta explicitly. `facts.highlighterFence` records the pre/post width stats. Self-test bite (h): a perturbed `addPressure` that moves the highlighter width-CV beyond ε → A8 RED.

### A.4 — WIDEN A7 + Move-2 to the crayon/marker→hull arm

The wave currently fences `boil`-only and lists `crayon`/`marker` as byte-untouched. Per GOLDEN Move 2 (live: crayon `brush.ts:177` + marker `brush.ts:226` are `ribbon:'stroke'`, flat rulers), **flip `crayon` + `marker` rows → `ribbon:'hull'`** (two data edits; the pf body already ships). A7's byte-fence is WIDENED to PERMIT the `ribbon`/`taper`/`weight`/`thinning` data-edit on `boil`/`crayon`/`marker` rows (the schema/continuum/`lerpBrush`/`ink.ts`-logic/the other shapes stay fenced — the data rows are not). Add a gate arm A3-extension: crayon + marker emit non-constant hull width (width-CV ≥ floor between the taper zones — NOT merely "non-constant", which a 2-sample taper passes).

### A.5 — Prose corrections to the wave doc (honest-keying)

- Strike the implication that the boil row alone changes — name `crayon`/`marker` (A.4) and name the HIGHLIGHTER as an affected shipped brush (A.3).
- Demo-field language: the demo card is ALREADY warm-cream `rgb(253,245,236)` + `.paper-grain-overlay` @0.08 (live) — the residual gap is "solid plate, not a translucent glass card over a visible field" (§3); key any field born-RED on card-alpha<1 + a non-uniform warm field behind it, NOT a grain-opacity floor already exceeded. The PAGE-field gray is `page-background`'s job (named dependency edge), not this wave.
- Fix `boil` taper `{start:14,end:22}`: 22/14≈1.571≈φ, NOT √φ — set `{start:14,end:18}` (≈√φ) OR relabel the ratio φ. `NOISE_AMP_FRAC=0.05` is a tuned visibility constant, NOT φ-derived — say so.

**Born-RED proof for the augmented wave (on HEAD):** A1 spacing-CV (HEAD sinusoid mean-CV ≤0.20 → RED), A3 width-variation (HEAD boil/crayon/marker `ribbon:'stroke'` constant-width → RED), A5 (3-shape demo → RED), A6 (1-animation demo → RED). A4 (determinism) + A7 (continuum fence) + A8 (highlighter fence) GREEN on HEAD, must stay GREEN.

---

## B. NEW `BD.W-HANDMARK-CARTOON-WEIGHT.md` (Move 3 — opt-in cartoon draw-on)

**Band 16 (DEMO-CHASSIS / motion) · depends: `BD.W-PRECEPT-CANON` (HARD — mints `--ease-cartoon-punch` + `--motion-weight`), `BD.W-HANDMARK-AUDIT` (the re-authored boil it draws).** This wave is SEQUENCED AFTER the token mint and the boil core — it CANNOT land until both `--ease-cartoon-punch` + `--motion-weight` exist on `:root` (live-confirmed EMPTY today; the "graceful fallback to bezier" would otherwise silently void the acceptance bar). Reference: `GOLDEN.md` Move 3 + DELTA-ASSAY §3.

**Scope:** ADD an opt-in `weight?: number` prop (0..1, rest 0 = today's calm draw) to `HandMark.vue`. When `>0`, the draw-on engages the cartoon register (all compositor-safe-where-true, honest-scoped: NO `backdrop-filter:url`, NO per-frame filter re-raster — but the `dashoffset`/`clip` reveal DOES repaint; do not claim "compositor-only"):
- `--ease-cartoon-punch` on the reveal (anticipation dip → punch overshoot → settle) + a `scaleX(0.96)→1` squash-anticipation.
- A leading-nib bead — **driven by JS rAF sampling `SVGGeometryElement.getPointAtLength()`** (the platform idiom that works identically Chrome+Safari), NOT `offset-path` (net-new, Safari-16.x-buggy-but-present so `@supports` can't gate it). Bead-absence is the graceful default.
- A cel-cast: a second offset lower-opacity `<path>` copy translated by `--shadow-cartoon` (compositor `transform`, NEVER animated `box-shadow`).
- `--motion-weight` scales anticipation depth + overshoot + cast travel together (morph-more-on-move).

**PRM/a11y carve (enumerate the NEW DOM):** under PRM the nib `<circle>` is `display:none` (a static dot at offset 0 is a defect, not a no-op); the cel-cast renders at its settled offset for `weight>0` ONLY; a `weight:0` body underline paints IDENTICAL pixels with/without PRM (no cast in any mode). `prefers-contrast:more` floors cast opacity UP (confirm it does not read as a double-strike).

**Born-RED gate (`proof:handmark-cartoon`):** (C1) the tokens resolve non-empty on `:root` (born-RED today — both EMPTY). (C2) a `weight>0` mark's painted draw-on shows the multi-frame morph (anticipation→punch→bead→cast→settle) — a binding-π multi-frame capture, NOT a stop-string. (C3) a `weight:0` mark paints byte-identical with/without PRM (the no-leak fence). Born-RED on HEAD: no `weight` prop, no tokens, no bead/cast.

---

## C. NEW `BD.W-INKEVENT-UNION.md` (Moves 4+5 — the ℱ-showpiece + the seal fold)

**Band 16 · depends: `BD.W-HANDMARK-CARTOON-WEIGHT` (the `weight>0` arm it consumes), `BD.W-FOURIER-INTERACT` (read-only consumer of `dftFromPoints`/`positionsAt`).** Reference: `GOLDEN.md` Moves 4+5 + DELTA-ASSAY §3.

**Scope — the ℱ-redraw showpiece (Move 4):** re-skin `demo/eggs/FRedrawOverlay.vue` — KEEP the math (`dftFromPoints(fGlyphPoints(128))`→`positionsAt` walk supplies the centerline) + the `traceT` rAF clock; DROP the Canvas2D `ctx.stroke` loop; drive `<HandMark shape="path" brush="boil" :weight="0.7" :path color="var(--viz-fourier)">`. The epicycle arms render as faint glass-tinted `<circle>`s; the leading phasor tip carries the cartoon nib-bead; on complete a gold `<CompletionSeal shape="ring">` (KEPT cousin) draws around it. The wiring (`useLongPress`→`glass-ui-demo:f-redraw`→AppShell mount) is UNCHANGED.

**Prose corrections (honest-keying):** (a) the egg is NOT grey today — it already inks `var(--viz-fourier)` crimson (`FRedrawOverlay.vue:54`); the born-RED keys on the TRUE deltas: HEAD renders via Canvas2D not `.hm__svg`, no cartoon weight, no gold seal, full-screen-fixed not card-composited. (b) `boil shape="path"` does NOT engage `natural` (underline-only) → the ℱ inherits boil's HULL+pressure+warm+cartoon, NOT the value-noise displacement — say so.

**Perf gate (the KEEP-Canvas decision — born from a real measurement):** spike the ℱ-showpiece frame cost (`performance.now()` per frame: SVG-`d`-rewrite of the 128-segment glyph + cel-cast vs the retired Canvas at 128 terms, both engines). **If the SVG path churn drops frames, KEEP Canvas2D for the egg** (one-renderer ≠ KISS when the perf envelopes differ; a full-screen growing polyline is Canvas's job). The union is then "the egg shares the warm accent + PRM carve + the gold seal," not necessarily "one SVG renderer."

**Scope — the seal fold (Move 5):** reconcile `CompletionSeal.vue` to the one draw vocabulary (dashoffset reveal + optional `weight>0` cartoon + spring settle); ADD a `seal` gold preset row to `brush.ts`; document the seal as the GOLD sub-case of the family. **KEEP its `role="status"`/`aria-live` shell** (the one a11y semantic it genuinely adds — do NOT collapse it into a bare `<HandMark>`). Strike the seal `constants.ts:19` "distinct from the HandMark hand-voice family" wall.

**Born-RED gate (`proof:inkevent-union`):** (U1) the overlay mounts a `.hm__svg` (HEAD: Canvas — RED). (U2) a `<CompletionSeal>` fires on ℱ-complete (HEAD: none — RED). (U3) the seal's draw recipe shares the cartoon-register seam (HEAD: separate vocabulary — RED). (U4) the perf measurement is recorded (the KEEP-Canvas decision is data-backed, not asserted). PRM: the completed ℱ inks once + static gold seal.

---

## D. No-dup / fence audit

- **No new gate duplicates `proof:handmark` (W1–W6)** — it stays GREEN unchanged; the new gates add render-quality + cartoon + union teeth it cannot carry.
- **No parallel fork:** the boil re-author + crayon/marker→hull are data/one-function edits to the SHIPPED family; the cartoon arm is an opt-in prop on the SHIPPED SFC; the ℱ-showpiece + seal COMPOSE shipped primitives (`<HandMark>`, `<CompletionSeal>`, `dftFromPoints`). The old Canvas loop + the period constants are DELETED (no legacy, no alias, no migration shim) — UNLESS the perf gate keeps Canvas, in which case Canvas is the deliberate measured choice for that one artefact.
- **Token discipline:** `BD.W-HANDMARK-CARTOON-WEIGHT` is a CONSUMER of `BD.W-PRECEPT-CANON`'s mint — no smuggled constant; hard-blocked, not graceful-faked.
- **Fourier discipline:** `BD.W-INKEVENT-UNION` is a read-only consumer of `BD.W-FOURIER-INTERACT` — no re-fork of the DFT math.
