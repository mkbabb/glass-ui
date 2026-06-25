# HANDMARK — the GOLDEN reference (the single synthesized design)

> The canonical spec for the HANDMARK facility — `HandMark.vue` + the brush/freehand/texture engine (`brush.ts`, `freehand.ts`, `texture.ts`, `geometry.ts`, `ink.ts`, `useHandMark.ts`) — and its two estranged ink-event cousins (the ℱ-wordmark Fourier-redraw egg + the gold completion-seal). Synthesized from lens-a (pure iOS-27 fidelity + the ink-event UNION), lens-b (cross-engine/perf-first + KISS), lens-c (audacious cartoon-technicolor punch). The strongest move from each, reconciled to ONE coherent, deftly-integrable design that is PERFECT in Chrome AND Safari.
>
> **De-risk status:** the boldest mechanism (the boil centerline re-author) is SPIKED + PASSING — see §9 and `golden/boil-spike.mjs` (born-RED on the HEAD sinusoid, GREEN on the GOLDEN value-noise, determinism held). The spike surfaced a load-bearing gate correction (the born-RED proof must key on the autocorrelation periodicity peak, NOT amplitude-CV — the latter is a false-green trap).

---

## 0. The three-lens reconciliation (what survives, from whom)

All three lenses INDEPENDENTLY judged the facility live at `/motion/handmark` (both modes) and reached the SAME verdict: **the architecture is FIT — a genuine 12-scalar/4-enum Brush continuum where `ink.ts` reads FIELDS never instrument-names, shapes are pure `switch` arms, grain is ONE static seeded `feTurbulence` (rasters once, sRGB-correct), the headless core owns the clock, the SFC measures the real baseline. KEEP it. RE-INVENT nothing structural.** The disagreements are about AUDACITY, and the golden resolves them:

| Tension | lens-a | lens-b | lens-c | GOLDEN resolution |
|---|---|---|---|---|
| The boil fix mechanism | hull + raised amp + curvature-coupled pressure | irregular waypoints + seeded pressure through the existing hull | φ-incommensurate value-noise + hull | **φ-incommensurate value-noise centerline (lens-c) routed through `ribbon:'hull'` with curvature-coupled pressure (lens-a)** — the spike proves value-noise is the cleanest born-RED→GREEN; curvature-coupling is the "pen line not wiggly line" truth |
| The cousins | UNION all three under one InkEvent engine (bold) | KEEP as-is, two perf nits | TRIPLE-UNION showpiece (boldest) | **UNION via composition (lens-a's reuse discipline), executed as the showpiece (lens-c's ambition), but the seal keeps its `role="status"` shell + the egg keeps Canvas2D where KISS says so (lens-b's restraint)** — see §5 |
| The draw-on weight | §L4 cartoon ink-lay, velocity-coupled | ONE opt-in `weight` lever, compositor-only | full cartoon cast + leading-nib bead + squash | **opt-in `weight` prop (lens-b's restraint) that, when >0, engages the cartoon register (lens-c's punch): `--ease-cartoon-punch` draw-on + leading-nib bead + moving cel-cast** — loud is opt-in, calm is default |
| crayon/marker → hull | not proposed | not proposed | route through hull (bold) | **YES, route crayon+marker through hull (lens-c)** — they read as flat rulers today; the variable-width body is the fix. Widens the audit's A7 byte-fence to permit the `ribbon` data-edit |

**The throughline all three name:** the facility is the library's INK ENGINE, and an ink stroke is a physical event that lays itself down over time with weight, pressure, and follow-through. The golden makes that literally true and makes the three ink events (hand mark · gold seal · ℱ redraw) ONE family.

---

## 1. What the facility IS (mapped from source, live-verified by all three lenses)

A **generalized hand-mark renderer** — NOT a signature pad, NOT a freehand-capture surface. It lays a deterministic, seeded, `aria-hidden` SVG mark (`underline` · `strikethrough` · `highlight` · `box` · `bracket` · `circle` · arbitrary `path`) over/under/behind REAL selectable text, in any of seven brush voices (`pen`·`boil`·`pencil`·`crayon`·`marker`·`ring`·`highlighter`), deterministic per `seed`, in 4 animations (`none`·`draw-on`·`boil`·`draw-then-boil`).

The five-layer pipeline (all symbols grep-verified at HEAD):

- **`brush.ts`** — the flat 12-scalar + 4-enum `Brush` DATA model + `lerpBrush` continuum + `resolveBrush`. Every medium is a POINT in one space, a frozen literal, not a class. **KEEP the model byte-for-byte; the golden edits only data rows.**
- **`geometry.ts`** — `shapeGeom(shape, opts, box, baselineFrac, natural)` maps semantic shape → centerlines. `naturalUnderlinePoints` (`geometry.ts:68`) is the `boil` register — **the one broken function (the GOLDEN re-author).**
- **`ink.ts`** — `ink()` renders centerline + Brush → SVG fragment, gated by FIELDS. The `ribbon:'hull'` arm (`ink.ts:115`) routes through the vendored perfect-freehand `getStroke` + the seeded `addPressure` swell (`ink.ts:47`) — **the variable-width pressure engine the boil/crayon/marker fix needs already ships, today consumed only by the highlighter.**
- **`texture.ts`** — one static seeded `feTurbulence` grain filter; `grain<=0 ⇒ '' ⇒ no filter` (pen is free), `color-interpolation-filters="sRGB"`. **KEEP.**
- **`freehand.ts`** — vendored perfect-freehand (`getStroke`/`getSvgPathFromStroke`, MIT, treeshaken unless any brush uses `ribbon:'hull'`). **KEEP.**
- **`useHandMark.ts`** — headless reactive core; `useLineBoil` frame-cycle clock (lazy, PRM-early-returns). **KEEP.**
- **`HandMark.vue`** — measures the real text baseline (`Range`+`ResizeObserver`+`document.fonts.ready`), mounts the namespaced filter, draws-on (`stroke-dashoffset` clean | `clip-path` wipe grained). **KEEP; the golden adds the opt-in `weight` prop + the cartoon arms.**

**The two estranged cousins:**
- **`FRedrawOverlay.vue`** (`demo/eggs/`) — a full-screen Canvas2D egg that reconstructs the ℱ glyph as a Fourier epicycle chain via the SHIPPED `dftFromPoints`+`positionsAt` (fourier-field/math.ts), then fades. Fired by a long-press on the sidebar ℱ wordmark.
- **`CompletionSeal.vue`** (`src/components/custom/completion-seal/`) — a gold `stroke-dashoffset` draw-on of a `check`/`ring`/`wordmark` glyph, `role="status"`/`aria-live`. Its own constants self-describe it as **"distinct from the HandMark hand-voice family"** — the design wall the golden removes.

---

## 2. The GOLDEN design — "the family is the library's INK ENGINE; every ink event is one of its strokes"

Six moves, ordered by load. Moves 1–2 are the correctness core (the boil fix + the variable-width voices); Move 3 is the cartoon weight; Moves 4–5 are the UNION (the showpiece + the seal fold); Move 6 is the demo + field.

### Move 1 (THE FIX — re-invent the boil centerline): φ-incommensurate value-noise, SPIKED

`boil` is billed as the masthead voice and is the weakest mark (live: it reads as a spell-check squiggle, autocorr peak ~0.8 — it self-correlates like the sinusoid it is). Re-author `naturalUnderlinePoints` (`geometry.ts:68`) to a **1-D fractal value-noise displacement off the HOUSE `mulberry32`**:

```
disp(t) = Σ_{k=0..3} aₖ · vnoise(t·fₖ + φₖ)        normalized by Σaₖ
  fₖ = NOISE_F0 · φ^k        (φ ≈ 1.618 — mutually irrational → NEVER closes into a period)
  aₖ = (1/φ)^k               (per-octave decay — the §L6 golden law on the noise octaves)
  φₖ = seeded per-octave phase (house mulberry32)
  vnoise = seeded lattice value-noise, smootherstep-faired (6t⁵−15t⁴+10t³)
```

**Spiked constants (de-risked — see §9):** `NOISE_OCTAVES=4`, `NOISE_F0=1.9`, `NEW_AMP_FRAC=0.05` (~2.3× the HEAD 0.022 — the line must be VISIBLE), `PHI=1.6180339887`.

- **Endpoint anchor, NOT a body-wide envelope.** The HEAD code multiplies by `Math.sin(π·t)` — a symmetric half-arch that makes the body amplitude smooth-and-uniform (the clean-envelope tell). Replace with a **narrow cosine taper at the very ends only** (`edge=0.12`: `0.5−0.5·cos((t/edge)·π)`), so the ends settle to baseline (no draw-on pop) while the BODY amplitude stays irregular hump-to-hump.
- **DELETE the periodicity constants** (`PERIODS_MIN`/`PERIODS_MAX`/`NATURAL_AMP_FRAC`, `constants.ts:42-43,66`) — no alias, clean break (NO LEGACY). New colocated constants in `constants.ts`: `NOISE_OCTAVES`, `NOISE_F0`, `NOISE_AMP_FRAC`, `NOISE_PHI=1.618`, `NOISE_EDGE=0.12`.
- **Flip the `boil` brush row to `ribbon:'hull'`** (one field in `brush.ts`) so the line routes through the EXISTING hull arm → `addPressure` → `getStroke` → a TRUE variable-width fill. The pf body already ships (highlighter), so ZERO new bytes. `boil`: `thinning ≈ 0.55`, `weight ≈ 7`, `taper {start:14, end:22, ease:'out-cubic'}` (the run-out is longer than the lead by `√φ` — §L6).
- **Couple the pressure profile to the centerline curvature** (lens-a's load-bearing truth — a hand presses HARDER on straights, LIGHTER through a tight wobble). Feed `addPressure` a curvature-derived swell: high local curvature → low pressure → thin; straight → high pressure → thick. This is the single move that turns "a wiggly line" into "a pen line". `addPressure` already exists (`ink.ts:47`); the golden replaces its symmetric `0.5+0.35·sin(π·t)` swell with the curvature walk (clamped 0.05..1, still house-`mulberry32`). **Shared by every hull brush (DRY)** — crayon/marker/highlighter inherit it.
- **Seed reconcile PRESERVED** (house `mulberry32`, ZERO pencil-boil import). FILTER-FREE (wobble+pressure in control points + hull width, never a `feTurbulence`).

**FENCE:** touches ONLY `naturalUnderlinePoints`'s body + the `boil` brush row's `ribbon`/`taper`/`weight`/`thinning` + `addPressure`'s swell. The other six brushes' centerline character, `lerpBrush`, `texture.ts`, the `natural=false` default underline — untouched.

### Move 2 (THE VOICES — variable-width crayon + marker): route through the hull

Live, crayon and marker are `ribbon:'stroke'` (constant width) — they read as flat rulers, not a waxy stick / a juicy marker (lens-c, grounded). Flip `crayon` and `marker` to `ribbon:'hull'` (two data rows in `brush.ts`). They get the SAME variable-width pf body the highlighter has — a crayon that **swells and tapers** like a real wax stick (its grain `feTurbulence` rides on top, unchanged), a marker with a fat juicy core and frayed-thin ends. `pen` stays `stroke` (intentionally clean/free); `ring` stays `stroke` (a thin whisper); `pencil` stays `stroke` (the dry tooth grain is its character). This is a brush-row data edit; `ink.ts`'s `ribbon==='hull'` arm is already the path. **No new machinery.**

### Move 3 (THE WEIGHT — the cartoon draw-on, opt-in): §L4 made a curve

The draw-on today is a single `cubic-bezier(.16,1,.3,1)` dashoffset/clip sweep — clean but inert. Add ONE opt-in lever (lens-b's restraint × lens-c's punch): a **`weight?: number` prop (0..1, rest 0 = today's calm draw)**. When `>0`, the mark engages the **Cartoon register** (design.md §L4/§Easing/§Shadows), all compositor-safe:

- **Anticipation + punch + follow-through on the draw clock.** The dashoffset/clip reveal runs on `--ease-cartoon-punch` (the design.md `linear()` that dips ~4% below origin, crosses 1.0, peaks ~1.22, settles) instead of the flat bezier — the ink races ahead, overshoots its run-out, snaps back. A tiny `scaleX(0.96)→1` squash-anticipation on `.hm__svg` one frame before launch.
- **The leading-nib bead (overlapping action + arcs).** A small `<circle>` ink bead rides the stroke tip via CSS Motion Path (`offset-path: path(<d>)`, `offset-distance` keyed in lockstep with the dashoffset 0→100%), then flicks off the end with a `--spring-bouncy` fade-fling. This is the SAME leading-dot idea the ℱ-egg already proves. Pure compositor.
- **The moving cel-cast (the 1940s layered depth).** A second, offset, lower-opacity copy of each `d` (a `<path>` translated by the `--shadow-cartoon` light-direction, opacity ~0.18) behind the ink. On draw it LAGS the stroke (the cast offset travels opposite the motion, scaled by `--motion-weight`) and snaps back on settle. A `transform` on the caster path — **never an animated `box-shadow`** (design.md §Shadows / §L7 fence).
- **Velocity-coupled.** `--motion-weight` (rest `1/φ≈0.62`) scales the anticipation depth + overshoot share + cast travel together (one proportioned deformation), so a fast replay morphs MORE (the "morph more on move" law).

**This is a DRIVER motion** (the user's `play()`/appear caused it) → it earns the bounce. The completion-seal's gold draw and the ℱ-showpiece are the natural first `weight>0` consumers (a celebratory/hero mark SHOULD punch); the body underline stays `weight:0` calm.

**Token dependency (honest):** `--ease-cartoon-punch` + `--motion-weight` are design.md-SPECIFIED but NOT YET in `src/styles/` (grep-confirmed empty — only `--spring-*` + `--shadow-cartoon-*` + `@utility cartoon-surface` are minted). The golden **does NOT smuggle a private constant**: it declares minting these two tokens (the exact `linear()` is in design.md §Easing line 311; `--motion-weight: 0.62`) a dependency edge that folds to the §L4 cartoon-register wave (`scheme-motion.css` + the a11y-cascade PRM arm). If absent at build time, `weight>0` falls back to the existing bezier (graceful, no broken paint) and the wave depends on that mint landing first.

### Move 4 (THE BOLDEST MOVE — the ℱ-redraw becomes the family's SHOWPIECE): the triple union

Today the ℱ-egg is a thin grey Canvas2D line that traces the glyph and fades — clever math, cold paint, and it does NOT use the hand-voice family at all. The golden makes it the facility's **showpiece**, a TRIPLE UNION of three previously-parallel facilities:

**The ℱ reconstructs itself as a HandMark stroke being drawn by its own namesake transform, lands with cartoon weight, and seals in gold.**

- **Keep the math** (`dftFromPoints(fGlyphPoints(128))` → `positionsAt` epicycle walk — the literal-transform poetry, the shipped fourier-field exports, KISS). The walk supplies the **centerline**.
- **Re-skin the render: `FRedrawOverlay.vue` drives a `<HandMark shape="path" brush="boil" :weight="0.7" color="var(--viz-fourier)">`** whose `:path` grows term-by-term with the existing `traceT` rAF sweep clock (KEPT). Instead of grey `ctx.lineTo`, the curve is the re-authored warm pressured boil hand-line (Move 1) writing the ℱ. The epicycle arms render as faint glass-tinted `<circle>`s (not flat grey). The leading phasor tip carries the Move-3 cartoon nib-bead.
- **On complete: it strikes its cartoon cast (Move 3) and settles `--spring-bouncy`, then a gold `<CompletionSeal shape="ring">` (the cousin, KEPT) draws around it** — the transform finished, sealed.
- **The Canvas2D overlay is RETIRED** (NO LEGACY) in favor of the SVG HandMark render — KISS, ONE renderer, and it inherits PRM + warm-cream + cartoon for free. The wiring (`useLongPress` → `glass-ui-demo:f-redraw` CustomEvent → `AppShell` mounts the overlay) is UNCHANGED. PRM → the completed ℱ inks once + static gold seal.

This is the union the BINDING LAW demands — a UNION via composition of shipped primitives (DFT walk + `<HandMark>` + `<CompletionSeal>` + the cartoon register), never a parallel fork. It is the single artefact that proves the facility is ONE coherent ink engine, not three toys.

### Move 5 (THE SEAL FOLD — the cousin reconciled, not re-forked)

The completion-seal's `check`/`ring`/`wordmark` glyphs are already SVG `d`-strings / a circle — exactly the `path`/`circle` shapes HandMark renders; its gold `stroke-dashoffset` draw IS HandMark's clean-ink draw-on; its springs are the shared register. **The golden reconciles the draw VOCABULARY (one draw-on language: dashoffset reveal + optional cartoon weight + spring settle) and documents the seal as the GOLD sub-case of the family** — it adopts a `seal` gold-ink preset + `weight>0`. **It KEEPS its `role="status"`/`aria-live` announcement shell** (lens-b's restraint — that a11y semantic is the ONE thing the seal genuinely adds; do NOT collapse it into a bare `<HandMark>` and lose the live-region). So: one ink language, one draw clock, one warm palette, one PRM carve across all three events; the seal's accessibility contract preserved. This is the deft-integration middle path between lens-a's "collapse it entirely" and lens-b's "leave it alone."

### Move 6 (THE BREADTH + THE FIELD — demo at full span over a visible paper field)

- **Demo all 7 shapes × 4 animations** (the audit's A5/A6) — `strikethrough`/`box`/`bracket`/`path` + the `boil`-continuous living-line clock + `draw-then-boil` are INVISIBLE today. ADD the unioned ink trio (hand mark · gold seal · ℱ-redraw) as a demonstrated set so the "one ink engine" thesis is VISIBLE.
- **The §3 colorful field behind glass.** Live, the demo cards are opaque `bg-card` — the paper grain the page advertises is OCCLUDED; the marks float on a flat plate. Replace with a **translucent glass card over a visible warm paper-grain field** (bump `--paper-grain-opacity` locally above the sub-perceptual 0.025 floor; a faint living warm tint behind the glass), so the marks read as ink ON PAPER, both modes, never gray (BA.W-NO-GRAY warm floor). This is a DEMO-CHASSIS refinement — the PRIMITIVE stays field-agnostic (it renders over whatever it is slotted into).

---

## 3. The exact mechanism (files · tokens · recipes · composables — all UNIONS)

| File | Edit | Move |
|---|---|---|
| `src/components/custom/handmark/geometry.ts` | re-author `naturalUnderlinePoints` body → φ-incommensurate value-noise (the spiked recipe); EXPORT it for the gate to MEASURE | 1 |
| `src/components/custom/handmark/constants.ts` | DELETE `PERIODS_MIN`/`PERIODS_MAX`/`NATURAL_AMP_FRAC`; ADD `NOISE_OCTAVES=4`, `NOISE_F0=1.9`, `NOISE_AMP_FRAC=0.05`, `NOISE_PHI=1.618`, `NOISE_EDGE=0.12` | 1 |
| `src/components/custom/handmark/brush.ts` | `boil`/`crayon`/`marker`: `ribbon:'stroke'→'hull'`; `boil` taper `{start:14,end:22}` (√φ run-out), weight 7, thinning 0.55; ADD a `seal` gold preset row | 1·2·5 |
| `src/components/custom/handmark/ink.ts` | `addPressure` swell → curvature-coupled profile (shared by all hull brushes, DRY) | 1 |
| `src/components/custom/handmark/HandMark.vue` | ADD `weight?:number` prop (rest 0); when >0: `drawTransition` uses `--ease-cartoon-punch`, render the leading-nib `<circle>` (`offset-path`) + the cel-cast `<path>` copy + the `scaleX` squash-anticipation | 3 |
| `src/components/custom/handmark/handmark.css` (or scoped) | the cartoon-draw recipe — compositor-only (`transform`/`offset-distance`/`opacity`), PRM-carved | 3 |
| `src/styles/tokens/scheme-motion.css` | LAND `--ease-cartoon-punch` (design.md §Easing `linear()`) + `--motion-weight: 0.62`; PRM arm zeroes weight + aliases punch→`--ease-standard` | 3 (folds to the §L4 cartoon-register wave) |
| `demo/eggs/FRedrawOverlay.vue` | DROP the Canvas2D draw loop; keep `dftFromPoints`/`positionsAt`; drive `<HandMark shape="path" brush="boil" :weight="0.7" :path>` + glass-tinted arm `<circle>`s + the nib-bead; fire `<CompletionSeal shape="ring">` on done; RETIRE Canvas | 4 |
| `src/components/custom/completion-seal/` | reconcile to the one draw vocabulary + `weight>0`; KEEP `role="status"` shell; document as the gold sub-case | 5 |
| `demo/stories/motion/handmark.vue` | expand to 7 shapes × 4 animations + the ink-event trio; translucent glass over a visible paper-grain field | 6 |

**The continuum schema is UNTOUCHED** — no 13th scalar; `boil`/`crayon`/`marker` are existing points moved along the `ribbon` axis; `lerpBrush`/`resolveBrush`/the field-count discipline intact.

---

## 4. Cross-engine (Chrome + Safari) + a11y/PRM carve (§L7)

- **No `backdrop-filter:url()`, no per-frame filter re-raster.** The grain `feTurbulence` is STATIC + seeded (rasters once, `color-interpolation-filters="sRGB"`); the draw-on is `clip-path`/`dashoffset` (compositor); the pf hull is a plain filled `<path>` (geometry, not a filter). The ℱ-showpiece emits a static `d` per frame from `positionsAt` (pure math). **Safari-safe by construction — the family has ZERO backdrop-filter dependency.**
- **CSS Motion Path** (the leading-nib bead — `offset-path`/`offset-distance`) ships Chrome 116+ / Safari 16+. Fallback `@supports not (offset-path: path(""))` → the bead is simply hidden (the stroke still draws) — graceful.
- **The cel-cast** is a transformed `<path>` copy (compositor `transform`), NOT animated `box-shadow` — identical both engines.
- **No meatball/goo in this facility** (a hand mark is not a metaball surface — correctly out of scope; the §L7 goo arm does not apply, and the spec states so explicitly so no one bolts one on).
- **PRM:** every draw-on collapses to the finished static mark (`@media (prefers-reduced-motion: reduce)` in HandMark.vue + the cartoon arms zero: `--motion-weight:0`, `--ease-cartoon-punch`→`--ease-standard`, no bead, no cast travel, no squash); `useLineBoil.start()` early-returns; the ℱ-showpiece inks the COMPLETED glyph once + static gold seal.
- **`prefers-reduced-transparency`** → the paper-field tint floors out; the warm ink stays opaque (a legibility asset). The cel-cast is opaque ink — survives as a bonus legibility anchor. **`prefers-contrast: more`** floors the cast opacity UP.
- **Warm-cream / NO GRAY (BA.W-NO-GRAY):** every mark inks in `currentColor` or a warm accent (`--viz-fourier`, crayon red, marker green) over the paper-grain warm-cream card — never grey. The ℱ-egg's old grey Canvas line (the one cold spot) is RETIRED to the warm accent. Both modes (dark card = warm-brown `rgb(233,230,226)` ink, not `#888`).
- **The mark is `aria-hidden`; the word stays real selectable text.** The seal keeps `role="status"`/`aria-live`.

---

## 5. Proportion (Aristotelian golden, §L6)

- `boil` `taper.end:start ≈ 22:14 ≈ √φ` (the run-out is longer than the lead by the type-ladder ratio). The value-noise octaves step `fₖ = F0·φ^k`, amplitudes `(1/φ)^k` — the φ family IS the non-periodicity mechanism, not a decorative ratio. `NOISE_AMP_FRAC=0.05` derives from the φ family. The draw-on `--motion-weight` rests at `1/φ≈0.62`. The seal/ℱ glyph scale steps by √φ from the body underline.

---

## 6. The acceptance bar (the gestalt, judged live, default-to-broken)

Fresh whole-page both-mode `:5173` capture, NEVER `reducedMotion` (except the PRM arm):
1. **The boil mark reads as a real pressured hand-line** — irregular spacing + amplitude + width VISIBLE in the painted SVG; boil ≠ pen on sight; autocorr periodicity gone. Born-FAIL on HEAD.
2. **crayon + marker swell and taper** (variable width visible — no longer flat rulers). Born-FAIL on HEAD.
3. **The cartoon draw-on PERFORMS** (multi-frame: anticipation dip → punch overshoot → nib-bead arc + flick → cast lag → settle), opt-in `weight>0`. Born-FAIL on HEAD.
4. **The ℱ showpiece** is the warm, weighted, gold-sealed hand-draw (epicycle inks the ℱ in warm accent → strikes its cast → settles bouncy → gold ring seals). Born-FAIL on HEAD (cold grey Canvas line).
5. **7 shapes × 4 animations all visible, both modes, over a VISIBLE paper field, warm-cream, no gray, PRM single-paint static.**

---

## 7. Deft integration / reconciliation vs the union waves (no dup, no fork)

- **`BD.W-HANDMARK-AUDIT`** — the golden is its DESIGN twin + a SHARPENED mechanism + a WIDENED scope. The audit already specs "irregular spacing + amplitude + pressure" + the 7×4 demo + the measuring gate. The golden AMENDS it: (1) pins the mechanism (φ-incommensurate value-noise, spiked); (2) **corrects the gate** — the born-RED proof keys on the AUTOCORRELATION periodicity peak, NOT amplitude-CV (the spike proves amplitude-CV is a false-green: the HEAD sinusoid already passes it); (3) adds the Move-2 crayon/marker→hull arm (WIDENS A7's byte-fence to permit the `ribbon` data-edit on boil/crayon/marker, still fencing `lerpBrush`/`ink.ts`-logic/the other shapes); (4) adds the Move-3 cartoon draw-on (opt-in, PRM-carved); (5) adds the Move-4 ℱ-showpiece + Move-5 seal-fold UNION. NOT a dup — an amendment that folds into the audit wave's scope.
- **`BD.W-FOURIER-INTERACT`** — the ℱ-showpiece CONSUMES `dftFromPoints`/`positionsAt` (read-only) — a downstream consumer, not a re-fork.
- **The §L4 cartoon-register wave** — owns minting `--ease-cartoon-punch` + `--motion-weight` in `scheme-motion.css`; the golden's Move-3 is a CONSUMER (the dependency edge), not a minter — no smuggled constant.
- **Survival of the fittest:** KEEP the Brush continuum + `lerpBrush` + `ink.ts` + `texture.ts` + `freehand.ts` + the core + the SFC + the 4 unchanged brushes + the default underline + the seed reconcile. RE-INVENT `naturalUnderlinePoints` (broken). REFINE crayon/marker→hull, the draw-on→cartoon, the demo field. UNION the seal + the ℱ-redraw under the family. NO legacy, NO alias, NO migration shim — the old SFCs/Canvas loop are deleted, not deprecated.

---

## 8. The born-RED gate sketch — `proof:handmark-audit` (a MEASURING gate, NOT a presence-regex)

`scripts/proof-handmark-audit.mjs`, `tags:["local","ci"]`. IMPORTS the real `naturalUnderlinePoints` (or samples via `shapeGeom(...natural=true)`), MEASURES the emitted point-set; parses the demo's actual coverage. NEVER round-trips a symbol-presence regex (the W-GATE-TRUTH-AUDIT false-green discipline).

- **A1 (LOAD-BEARING — the periodicity gate, born-RED on the HEAD sinusoid).** Over ≥3 seeds, detrend the y-series, compute the AUTOCORRELATION; assert the MAX autocorr peak (over lags 2..n/2) ≤ `PERIODIC_PEAK_CEIL=0.6` for EVERY seed (a clean sine self-correlates ~0.8 at its period lag → REDs). AND spacing CV (inter-extremum) ≥ `0.18`. **The spike proves: HEAD maxPeak=0.85 → RED; GOLDEN maxPeak=0.60 (all seeds 0.49–0.60) → GREEN.** `facts.boilSpacing` records per-seed peak + CV.
- **A2 (CORROBORATING, NOT the discriminator).** Amplitude CV ≥ 0.20. **The spike WARNS: HEAD already passes this (meanAmpCV=0.505) — so A2 alone is a FALSE-GREEN trap; it must NOT be the born-RED proof.** Keep it as a corroborating signal only; A1's autocorr is the teeth.
- **A3 (pressure/width present — born-RED).** The boil emit carries WIDTH variation (the `ribbon:'hull'` body / a non-constant pressure array reaches the renderer). A constant-width thin stroke REDs. HEAD's `ribbon:'stroke'` boil REDs.
- **A4 (determinism + seed reconcile — GREEN, no regression).** Seed 3 ≠ seed 17 (distinct); same seed reproduces byte-equal; `mulberry32` from the HOUSE leaf, NEVER `@mkbabb/pencil-boil`. **Spike: reproduces=true, distinct=true.**
- **A5 (demo ≥ 7 distinct shapes — born-RED on the HEAD 3-shape demo).**
- **A6 (demo ≥ 4 distinct animations incl. the living-line boil clock — born-RED on the HEAD 2-animation demo).**
- **A7 (the no-rebuild fence — GREEN, must stay).** `lerpBrush` + `ink.ts`-logic + `texture.ts` + the `natural=false` underline byte-unchanged. WIDENED from the audit: the `ribbon` data-edit on boil/crayon/marker is PERMITTED (the schema/continuum is what's fenced, not the data rows).

**Self-test bites (the detector is pure, invoked over synthetic inputs):** (a) a clean `amp·sin(2π·periods·t)` → A1 RED (autocorr ≈ 1.0 — the false-green the HEAD code sails past a presence-regex AND past an amplitude-CV-only gate); (b) an irregular-spacing line with a clean `sin(π·t)` amplitude envelope → A1 still keys on autocorr (the discriminator); (c) a constant-width boil emit → A3 RED; (d) a `Math.random()` displacement / a pencil-boil `mulberry32` import → A4 RED; (e) a 3-shape demo → A5 RED; (f) a 2-animation demo → A6 RED; (g) a mutated `lerpBrush`/`ink.ts`-logic hash → A7 RED.

**The binding π** (`tests-visual/handmark-audit.spec.ts`) reads PAINTED PIXELS, both modes, over the visible paper field, NEVER `reducedMotion` (except the PRM arm): the boil mark's rendered hull width-profile + amplitude (not a stop-string); the cartoon draw-on multi-frame morph (anticipation→punch→bead→cast→settle); the ℱ-showpiece sequence; the 7-shape coverage; PRM single-paint static. The gate measures the point-set; the π measures the painted stroke (the cardinal-lesson split).

---

## 9. The de-risk spike (BUILT + verified)

`golden/boil-spike.mjs` — a throwaway node spike implementing BOTH morphologies (HEAD sinusoid vs GOLDEN value-noise) over 4 seeds, computing the gate statistics side by side. **Run result (SPIKE PASS ✓):**

```
OLD sinusoid (HEAD):   A1 maxPeak=0.850, spacingCV=0.176  → RED   (born-RED proof)
                       A2 meanAmpCV=0.505                 → GREEN (the false-green warning!)
GOLDEN value-noise:    A1 maxPeak=0.597, spacingCV=0.611  → GREEN (all 4 seeds 0.49–0.60)
                       A2 meanAmpCV=0.723                 → GREEN
both: determinism reproduces=true, distinct=true          → GREEN
```

**Three load-bearing findings the spike de-risked:**
1. **The φ-incommensurate value-noise mechanism WORKS** — born-RED on the HEAD sinusoid's autocorr (0.85), GREEN on the GOLDEN (≤0.60 every seed), with the exact constants (`OCTAVES=4`, `F0=1.9`, `AMP_FRAC=0.05`, `PHI=1.618`, smootherstep value-noise, `edge=0.12` endpoint-only anchor).
2. **The gate correction** — amplitude-CV (A2) is a FALSE-GREEN trap (the HEAD sinusoid already passes it at 0.505); the born-RED proof MUST key on A1's autocorrelation periodicity peak. This is exactly the W-GATE-TRUTH-AUDIT false-green class — the spike caught it before the gate shipped.
3. **Determinism holds** under the new noise (house mulberry32; same seed byte-equal, distinct seeds distinct) — the [S2] seed reconcile survives the re-author.

The spike is throwaway (greenfield dir, not src/). The remaining bold mechanisms (the cartoon draw-on, the ℱ-showpiece SVG re-skin) are LOWER-risk — they compose shipped primitives (`offset-path`, `<HandMark>`, `<CompletionSeal>`, `dftFromPoints`) with documented cross-engine fallbacks — and are verified live at implementation, not spiked here.
