# HandMark — GREENFIELD lens-C (AUDACIOUS CARTOON-TECHNICOLOR PUNCH)

> Lens: maximum 1940s-technicolor FLOW & PUNCH — bold cartoon shadowing, exaggerated squash/stretch/morph, anticipation + follow-through + overlapping action + arcs, real weight & inertia; the boldest most-alive variant, still idiomatic + cross-engine. The bar is the GESTALT judged live, both modes, default-to-broken.

---

## 0. Source-verify ledger (grep before citing — every symbol below EXISTS at HEAD)

Read live + grepped, no invented levers:

- **The facility, mapped:** `src/components/custom/handmark/` — `HandMark.vue` (SFC), `composables/useHandMark.ts` (headless core), `brush.ts` (the 12-scalar/4-enum flat Brush continuum + `BRUSHES` register + `resolveBrush`/`lerpBrush`), `geometry.ts` (`shapeGeom` semantic mapper + `naturalUnderlinePoints` + `boilLines` + `serialize`), `ink.ts` (`ink()` brush→fragment + `addPressure`), `texture.ts` (`grainFilter` feTurbulence graph + `hasGrain`), `freehand.ts` (VENDORED perfect-freehand `getStroke`/`getStrokePoints`/`getStrokeOutlinePoints`/`getSvgPathFromStroke`), `constants.ts` (`VB_W=100`,`VB_H=40`,`UNDERLINE_GAP=0.06`,`HIGHLIGHT_RISE=0.22`,`HIGHLIGHT_FALLBACK_FRAC=0.66`,`PERIODS_MIN=2`,`PERIODS_MAX=4`), `types.ts` (`HandShape` 7 shapes, `HandAnimation` 4 modes, `HandMarkProps`), `index.ts` (barrel — `HandMark`/`InkMark` + all pure L1–L3 fns exported).
- **pencil-boil peer symbols (imported, real):** `catmullRomToBezier`, `ellipsePoints`, `perturbPoints`, `perturbPointsClosed`, `pointsToLinear`, `wobbleLinePoints`, `WobbleOptions` (geometry.ts/ink.ts); `useLineBoil` (useHandMark.ts).
- **house prng leaf:** `src/utils/prng.ts` → `mulberry32`, `hashString` (the seed-reconcile single source — NOT pencil-boil's internal mulberry32).
- **The ℱ-redraw egg:** `demo/eggs/FRedrawOverlay.vue` (Canvas2D forward-DFT epicycle reconstruct, `DRAW_MS=2200`+`FADE_MS=700`, live epicycle arms + leading dot, PRM static-curve arm) + `demo/eggs/fGlyphPoints.ts` (`fGlyphPoints(samples)` hand-traced ℱ outline → unit box). Built on **real** fourier-field exports: `dftFromPoints`, `positionsAt`, `BasisComponent` (`src/components/custom/fourier-field/math.ts:113/41/14`). Fired by `demo/layout/SidebarDock.vue` `fireRedraw()` → `window` CustomEvent `glass-ui-demo:f-redraw` via `useLongPress` (`demo/eggs/useLongPress.ts` → `{handlers, fired}`); `demo/layout/AppShell.vue:241` listens, mounts `<FRedrawOverlay>`.
- **The completion-seal cousin:** `src/components/custom/completion-seal/` — `CompletionSeal.vue` (shapes `check`/`ring`/`wordmark`, `pathLength="100"` normalized, `role=status`), `constants.ts` (`COMPLETION_SEAL_PATHS`, `COMPLETION_SEAL_RING={cx:32,cy:32,r:24}`, `COMPLETION_SEAL_SETTLE_SPRING="--spring-bouncy"`, `COMPLETION_SEAL_DRAW_SPRING="--spring-snappy"`), `composables/useCompletionSeal.ts`, recipe `src/styles/completion-seal.css` (`--seal-draw` stroke-dashoffset wipe on `--seal-ink` gold, `[data-play]` one-shot). It is a SEPARATE GOLD-DRAW register, NOT the hand-voice family.
- **Cartoon/motion register tokens — REALITY CHECK (grepped):**
  - **REAL + shipped:** `--spring-smooth/snappy/bouncy/gentle/dock/press` (`src/styles/tokens/scheme-motion.css:236-241`, each with a `--spring-*-duration`); `--shadow-cartoon-md` (`src/styles/tokens/shadow.css:95`, bridged at `theme/bridges.css:315`); `@utility cartoon-surface` (`src/styles/cards.css:178` → `box-shadow:var(--shadow-cartoon-md)`); `@utility paper-grain-overlay` (`src/styles/paper.css:29`).
  - **DESIGN.md TARGET, NOT YET in CSS (grep returns nothing):** `--ease-cartoon-punch` and `--motion-weight`. DESIGN.md §L2/§L4/§Easing/§Shadows specify them (the negative-anticipation `linear()` + the one-scalar cartoon depth), but they are **not landed** at HEAD. This lens therefore **authors the cartoon-punch curve locally** as the named token (the wave LANDS `--ease-cartoon-punch` + `--motion-weight` in `scheme-motion.css` per DESIGN.md, no phantom citation), and grounds every other motion arm on the **real** shipped springs. **No smuggled constant.**

---

## 1. WHAT the facility IS, and the AGGRESSIVE verdict

**What it is (mapped live at `/motion/handmark`, both modes):** HandMark is a *hand-voice mark renderer* — it lays an aria-hidden SVG overlay (underline / strikethrough / highlight band / hand-circle / box / bracket / arbitrary path) over a real selectable word, in any of 6 brush "voices" (pen/boil/pencil/crayon/ring/marker/highlighter), deterministic per `seed`, optionally animated (none / draw-on / boil / draw-then-boil). The architecture is a clean 5-layer pipeline (geometry ⟂ brush ⟂ grain ⟂ animation ⟂ surface). The ℱ-redraw is a SEPARATE demo egg that reconstructs the ℱ wordmark as a Fourier epicycle curve via the shipped fourier-field DFT; the completion-seal is a SEPARATE gold-draw register.

**The verdict — survival of the fittest, judged on the painted pixels:**

| Element | Fit? | Live evidence | Disposition |
|---|---|---|---|
| The 5-layer architecture (Brush continuum, `shapeGeom`, `ink`, headless core) | **FIT — KEEP** | 12 marks render, 0 console errors, the continuum is genuine data (`lerpBrush` proves it), `ink` reads FIELDS never instrument names | **byte-untouched** (the audit's A7 fence) |
| The **pen** underline | **FIT** | "pays in" / "drawn" / "pen" read convincingly hand-made — irregular wobble, round caps, good weight | KEEP |
| The **boil** "natural morphology" (headline voice) | **WEAK — REFINE** | live: boil y-range ≈ **2.25** in a 40-unit box (5.6%) vs pen ≈ 1.83 — a shallow near-even ripple; in dark mode **pen and boil are nearly indistinguishable** (both flat slight wobbles). The audit's "mechanical spell-check squiggle" read is GROUNDED in measured geometry. | **RE-AUTHOR the centerline** (the audit's §1; this lens HARDENS it) |
| **crayon / marker** (the grained STROKE brushes) | **WEAK — REFINE** | live (dark): crayon = a thick **constant-width straight red bar**, marker = a flat green bar — NO visible thick/thin pressure, NO taper, NO swell. Only the highlighter uses the pf variable-width hull. The "juicy"/"waxy" voices read as rulers. | **route through the pf hull** (extend, no re-fork) |
| The animation system (draw-on dashoffset/clip, boil clock) | **FIT but UNDER-SHOWN** | mechanism sound + PRM-carved; but the demo shows only `none`/`draw-on` — the living-line **boil clock is INVISIBLE** on the page; 3/7 shapes only | KEEP engine, **EXPAND demo** (audit's §2) |
| The ℱ-redraw egg | **FIT — KEEP, ELEVATE** | a real forward-DFT epicycle reconstruct on the shipped math — genuinely "the logo literally does the transform"; but it is a *thin grey-ink Canvas line* with no cartoon weight, no glass, no warmth | KEEP the math, **re-skin to the cartoon register** |
| completion-seal cousin | **FIT — KEEP** | clean gold-draw, real `role=status`, reads the spring register | KEEP; **reconcile the draw vocabulary** with HandMark (one draw-on language) |

**Is it coherent + worth keeping?** YES. It is NOT over-engineered — the audit's deep pass already cleared that (each shape ≈ one switch arm, ~30 LOC total). It is NOT broken. It is a FIT facility with **three weak RENDERS** (boil too tame, crayon/marker constant-width, the egg too cold) and **one coverage gap** (3/7 shapes, boil-clock invisible). So: **REFINE the weak, RE-INVENT nothing.** The lens-C contribution is to push the FIT facility through the cartoon-punch register so the marks don't merely *exist* — they land with **WEIGHT, ANTICIPATION, and FOLLOW-THROUGH**.

---

## 2. THE CORE IDEA — "the mark is a STRUCK gesture, not a settled line"

A real hand-mark is not a static squiggle that fades in. It is a **STROKE EVENT**: the nib lifts (anticipation), strikes the page with momentum (the punch), overshoots its run-out, and the ink settles a beat later (follow-through), throwing a cel-shadow that lags the gesture. lens-C re-authors the three weak renders AND wraps the whole draw-on in the cartoon register so every mark *performs* its own making.

Three moves, all UNIONS into the extant engine — no parallel fork, no second renderer:

### Move 1 — RE-AUTHOR the boil centerline to a real hand-line (HARDEN the audit's §1)

The audit specifies "irregular spacing + irregular amplitude + pressure". lens-C pins the OUTPUT and the MECHANISM precisely, the boldest honest form:

- **Incommensurate value-noise displacement, NOT a sine sum.** Replace the `w1·sin + w2·sin` body in `naturalUnderlinePoints` (geometry.ts:68) with a **1-D fractal value-noise** off the house `mulberry32`: `disp(t) = Σ_{k=0..2} a_k · vnoise(t · f_k + φ_k)` with **golden-ratio-incommensurate** frequencies `f_k = F0 · φ^k` (φ ≈ 1.618 — the §L6 proportion law applied to the noise octaves, so the line NEVER closes into a period) and seeded per-octave phase `φ_k`. Amplitudes `a_k` seeded + decaying `a_k = A · (1/φ)^k`. This is the textbook "natural line" recipe and it is NON-periodic by construction → the autocorrelation has no sharp peak (the audit's A1 gate goes green), the inter-extremum spacing CV is high (irregular humps), and the amplitude varies extremum-to-extremum (irregular press). The endpoints anchor (taper `disp→0` at t=0,1) so draw-on does not pop.
- **PRESSURE/THICKNESS via the pf hull — ENGAGE `ribbon:'hull'` for boil.** Today `boil` is `ribbon:'stroke'` (a thin constant line). lens-C makes the `boil` preset **route through the vendored `getStroke`** (the highlighter's path, already shipping) with a **seeded irregular pressure profile** — a thick-here/thin-there walk so the line reads as a real pen pressing into the page. `addPressure` (ink.ts:47) already exists; lens-C feeds it a boil-specific irregular profile (a value-noise pressure, not the current symmetric `sin(π·t)` swell). **No new dep** — pf is vendored, ships with the highlighter.
- The seed reconcile is PRESERVED (house `mulberry32`, never pencil-boil's). FILTER-FREE (wobble + pressure live in control-points + hull width, not a `feTurbulence`).

### Move 2 — ROUTE crayon + marker through the pf hull (the variable-width upgrade)

Live, crayon/marker are flat bars because they are `ribbon:'stroke'` (constant width). lens-C is decisive: **the "juicy"/"waxy" voices earn `ribbon:'hull'`** — they get the same variable-width pf body the highlighter has, with their grain filter on top (crayon keeps its waxy feTurbulence). The result: a crayon that **swells and tapers** like a real wax stick, a marker that has a fat juicy core with frayed-thin ends — not a ruler. This is a brush-row data edit (the continuum absorbs it cleanly; `ink.ts`'s `ribbon==='hull'` arm is already the path). **pen / ring stay `stroke`** (pen is intentionally clean/free; ring is a thin whisper).

### Move 3 — THE CARTOON-PUNCH DRAW-ON (the lens headline) + the cartoon cast

Today the draw-on is a single `cubic-bezier(.16,1,.3,1)` dashoffset sweep — clean but **flat, no weight, no anticipation**. lens-C makes the mark *perform its making*, the 1940s-technicolor register, all compositor-safe:

- **ANTICIPATION + PUNCH + FOLLOW-THROUGH on the draw clock.** The wave LANDS `--ease-cartoon-punch` (DESIGN.md §Easing — the negative-anticipation `linear()`: dips ~4% below origin, crosses 1.0, peaks ~1.22, settles) into `scheme-motion.css`. The HandMark draw-on, under an opt-in `weight` prop (→ `--motion-weight`, also LANDED, rest `1/φ≈0.62`), runs the dashoffset/clip reveal on `--ease-cartoon-punch` instead of the flat bezier — so the ink **races ahead, overshoots its run-out, snaps back**. The nib leads with a tiny **anticipation pull-back** (a `scaleX(0.96)→1` squash on the SVG, transform-only) a frame before the stroke launches.
- **THE LEADING-NIB DOT (overlapping action + arcs).** During draw-on, a small **ink bead rides the stroke tip** (the same idea the ℱ-egg's leading dot already proves) — it travels the arc of the mark ahead of the filled stroke, squashes on the down-stroke, and **flicks off the end** with follow-through (a 120ms `--spring-bouncy` fade-fling). One `<circle>` on the SVG, its `offset-path` = the mark `d` (CSS Motion Path — Chrome+Safari shipped), `offset-distance` animated 0→100% in lockstep with the dashoffset. Pure compositor.
- **THE CARTOON CAST (the moving cel-shadow).** The mark composes a **layered-offset cel-shadow** (the `.cartoon-surface` / `--shadow-cartoon-md` register) — but for a stroke it is a **second, offset, lower-opacity copy of the same `d`** (a `<path>` translated `+dx,+dy` behind the ink, in a fixed light-source direction). On press/draw the cast **lags** the stroke (DESIGN.md §Shadows "the cast is a MOVING cast" — offset travels opposite the motion, scaled by `--motion-weight`), deepening as the nib strikes and snapping back as it settles. This gives the flat overlay real 1940s **layered depth** — the ink sits *above* its shadow, the page reads behind both.
- **SQUASH-&-STRETCH on the highlight band.** The highlighter band, on draw-on, **stretches** along its travel (a velocity-coupled `scaleX` overshoot) then settles to width — the slab reads as *swiped*, not faded.

PRM collapses ALL of it: `--ease-cartoon-punch`→`--ease-standard`, `--motion-weight`→0, no nib bead, no cast travel, no squash — the static fully-formed mark (the existing PRM discipline, extended).

---

## 3. THE SINGLE BOLDEST MOVE — the ℱ-redraw becomes a HANDMARK-INKED cartoon epicycle

Today the ℱ-egg is a thin **grey Canvas2D line** that traces the glyph and fades — clever math, cold paint, no warmth, no glass, no cartoon weight, and it does NOT use the hand-voice family at all (it is a separate Canvas overlay). **lens-C unifies the two facilities and makes the egg the FACILITY'S SHOWPIECE:**

**The ℱ reconstructs itself as a HANDMARK stroke being DRAWN by the epicycle chain.** The forward-DFT `positionsAt` walk (KEPT — the shipped math, the literal-transform poetry) supplies the centerline; but instead of `ctx.lineTo` grey ink, the traced curve is **inked as a live `<HandMark shape="path" brush="boil">`** whose `d` grows term-by-term — the **boil pen-line (now a real pressured hand-line from Move 1)** writing the ℱ in the warm `--viz-fourier` accent. The epicycle arms render as **faint glass-tinted circles** (not flat grey). The leading phasor tip carries **the cartoon leading-nib bead** (Move 3) — squashing on the arcs, flicking at cusps. The completed ℱ then **strikes its CARTOON CAST** (Move 3's offset cel-shadow) and **settles with a `--spring-bouncy` overshoot** (the completion-seal's settle spring — the cousins reconciled) — the glyph *lands* like a struck title card. Finally a **gold completion-seal `ring`** (the cousin, KEPT) draws around it: the transform finished, sealed.

So the boldest move is a **TRIPLE UNION**: the ℱ-egg's Fourier math + the HandMark hand-voice ink + the completion-seal's gold settle — three previously-parallel facilities collapse into ONE coherent showpiece where **the wordmark literally hand-draws itself via its own namesake transform, lands with cartoon weight, and seals in gold.** It is the most-alive possible expression of "the logo IS the transform", it consumes only shipped primitives (DFT walk + `<HandMark>` + `<CompletionSeal>` + the cartoon register), and it is the single artifact that proves the whole facility is coherent rather than three disconnected toys.

(Cross-engine: the inked stroke is plain SVG `<path>` + the static-graph grain filter — Chrome+Safari identical; CSS Motion Path for the bead is shipped both; the cast is a transformed `<path>` copy, not `box-shadow`. The Canvas2D overlay is RETIRED in favor of the SVG HandMark render — KISS, one renderer, and it inherits PRM + warm-cream + cartoon for free. PRM → the completed ℱ inks once, no epicycle animation, gold seal static.)

---

## 4. MECHANISM (precise — tokens / recipes / composables, all UNIONS)

**A. `geometry.ts` — re-author ONE function body (Move 1).**
`naturalUnderlinePoints(x1,y,x2,seed,segments)` → swap the sine-sum for the φ-incommensurate value-noise displacement (house `mulberry32`). EXPORT it (the audit requires the gate MEASURE the real point-set). `NATURAL_AMP_FRAC` re-tunes up (~0.045 — the live 5.6% range is too tame for a "natural" headline; clean break, no alias). New constants colocated in `constants.ts`: `NOISE_OCTAVES=3`, `NOISE_F0`, `NOISE_PHI=1.618` (the incommensurate base). The default underline keeps pencil-boil `wobbleLinePoints` (the `natural=false` arm, byte-untouched).

**B. `brush.ts` — three data edits (Moves 1+2), no schema change.**
`boil`: `ribbon:'stroke'→'hull'`, add irregular pressure intent (consumed by `addPressure`). `crayon`: `ribbon:'stroke'→'hull'` (keep its grain). `marker`: `ribbon:'stroke'→'hull'`. pen/ring/highlighter unchanged. The continuum/`lerpBrush`/field-count discipline are intact (no 13th scalar) — this is moving existing points along the `ribbon` axis.

**C. `ink.ts` — `addPressure` gains an irregular profile (Move 1).**
Replace the symmetric `0.5+0.35·sin(π·t)` swell with a seeded value-noise pressure walk (still clamped 0.05..1, still house-`mulberry32`). One function body; the hull path already consumes it.

**D. The cartoon draw-on (Move 3) — new recipe + 2 tokens + 1 SFC prop.**
- LAND `--ease-cartoon-punch` (the `linear()` from DESIGN.md §Easing) + `--motion-weight: 0.62` in `scheme-motion.css` (the DESIGN.md-specified tokens, finally on disk). PRM arm in the a11y cascade zeroes `--motion-weight` and aliases the punch→`--ease-standard`.
- `HandMark.vue`: a `weight?: number` prop (0..1, default 0 = today's calm draw — opt-in loud) → sets `--motion-weight` on `.hm`; when >0 the `drawTransition` uses `--ease-cartoon-punch`, and the SFC renders (a) the **leading-nib `<circle>`** with `offset-path:path(<d>)` + `offset-distance` keyed to draw, and (b) the **cel-shadow `<path>`** (offset copy of each `d`, `--shadow-cartoon` direction, opacity ~0.18, transform-lag on draw). All in `handmark.css` (new colocated recipe) or scoped — compositor-only (`transform`/`offset-distance`/`opacity`).
- The squash-anticipation: a `scaleX` keyframe on `.hm__svg` gated behind `weight>0` + draw-armed.

**E. The ℱ showpiece (Move 3 / §3) — rebuild `FRedrawOverlay.vue` as an SVG HandMark render.**
Drop the Canvas2D draw loop; keep `dftFromPoints(fGlyphPoints(128))` + `positionsAt`. Drive a `<HandMark shape="path" brush="boil" :weight="0.7" color="var(--viz-fourier)">` whose `:path` grows with `traceT` (the existing rAF sweep clock, KEPT); render epicycle arms as glass-tinted `<circle>`s; mount the cartoon bead at the phasor tip; on complete, fire a `<CompletionSeal shape="ring">` settle. The wiring (`useLongPress`→CustomEvent→`AppShell`) is UNCHANGED. PRM → ink once + static seal.

**F. completion-seal reconcile (the cousin).** No fork: the seal already reads `--spring-snappy`/`--spring-bouncy`. lens-C notes only that HandMark's `weight>0` draw and the seal's gold draw now share ONE draw-on vocabulary (dashoffset reveal + spring settle + optional cartoon cast) — documented as one register, the seal staying the gold sub-case.

---

## 5. CROSS-ENGINE (Chrome + Safari) + a11y/PRM carve (§L7)

- **Stroke + grain:** plain SVG `<path>` stroke/fill + the STATIC seeded `feTurbulence` graph (`color-interpolation-filters="sRGB"` already set in texture.ts) — rasters once, identical Chrome/Safari. **No `backdrop-filter:url()`**, no live filter animation (the Δ4 fence holds).
- **Leading-nib bead:** CSS Motion Path (`offset-path`/`offset-distance`) — shipped Chrome 116+ / Safari 16+. Fallback (`@supports not (offset-path:path(''))`): the bead is simply hidden (the stroke still draws) — graceful, no broken paint.
- **Cartoon cast:** a transformed `<path>` copy (compositor `transform`), NOT animated `box-shadow` (DESIGN.md §Shadows fence) — identical both engines.
- **Draw-on:** `stroke-dashoffset` on `pathLength="1"` (clean ink) / `clip-path:inset()` wipe (grained) — the existing two-mechanism split, both cross-engine.
- **ℱ showpiece:** pure SVG now (the Canvas2D engine retired) → inherits all of the above; one render path.
- **PRM:** `prefers-reduced-motion:reduce` → `--motion-weight:0`, `--ease-cartoon-punch`→`--ease-standard`, no bead, no cast travel, no squash, no epicycle animation — the static fully-formed mark + static gold seal (the existing PRM discipline, extended to the new arms). `prefers-reduced-transparency` does not touch the cast (opaque ink, a legibility bonus per §Shadows). `prefers-contrast:more` floors the cast opacity UP. All marks stay `aria-hidden` overlays on real selectable text; the seal keeps `role=status`.
- **Warm-cream / NO-GRAY (BA.W-NO-GRAY):** every mark inks in `currentColor` or a warm accent (`--viz-fourier`, the crayon red, the marker green) over the `paper-grain-overlay` warm-cream card — never a grey ink. The ℱ-egg's old grey Canvas line (the one cold spot) is RETIRED to the warm accent. Both modes verified live (the dark-mode card is warm-brown, not grey).

---

## 6. RECONCILE vs the 116 union waves (DELTA-ASSAY — no dup)

- **`BD.W-HANDMARK-AUDIT`** (exists, union): owns the boil re-author (§1) + the demo expansion to 7 shapes × 4 animations (§2) + the measuring `proof:handmark-audit` gate. lens-C **UNIONS into it, does not duplicate it**: Move 1 HARDENS its §1 by pinning the φ-incommensurate value-noise mechanism + ENGAGING `ribbon:'hull'` for boil (the audit already names "the vendored pf pressure profile" as the recommendation — lens-C makes it concrete). Move 2 (crayon/marker → hull) is a NEW arm the audit's A7 byte-fence currently forbids — so the wave-amendment must **widen A7** to permit the `ribbon` data-edit on crayon/marker/boil (still fencing `lerpBrush`/`ink.ts`-logic/the other shapes). The audit's demo expansion (A5/A6) ABSORBS lens-C's boil-clock visibility for free.
- **`BD.W-FOURIER-INTERACT`** (exists, union): owns the fourier-field interactivity. lens-C's ℱ-showpiece CONSUMES `dftFromPoints`/`positionsAt` (read-only) — no overlap with the field's own interaction; the showpiece is an EGG render, not a field feature. Note as a downstream consumer, not a dup.
- **NEW deltas this lens contributes (fold into the HANDMARK-AUDIT amendment, or a sibling `BD.W-HANDMARK-CARTOON` if the band prefers a 2nd wave):** (a) crayon/marker variable-width hull; (b) the cartoon-punch draw-on register (`--ease-cartoon-punch` + `--motion-weight` LANDED, leading-nib bead, cel-cast, squash) — opt-in via `weight` prop; (c) the ℱ-egg TRIPLE-UNION re-skin (SVG HandMark + cartoon + gold seal, Canvas2D retired). None duplicate an existing wave title.

---

## 7. THE GESTALT BAR (how this is judged — default-to-broken)

Fresh both-mode `:5199` whole-page capture, NEVER `reducedMotion` (except the PRM arm):
1. **The boil mark reads as a real pressured hand-line** (irregular spacing/amplitude/width measurably present in the painted SVG — boil y-range up from ~2.25 to a real hand wander; boil ≠ pen on sight). Born-FAIL on HEAD.
2. **crayon + marker swell and taper** (variable width visible — no longer flat rulers). Born-FAIL on HEAD.
3. **The cartoon draw-on PERFORMS** (multi-frame capture: anticipation dip → punch overshoot → nib-bead arc + flick → cast lag → settle). Born-FAIL on HEAD (flat bezier today).
4. **The ℱ showpiece is the warm, weighted, gold-sealed hand-draw** — the boldest unification, judged as a sequence (epicycle inks the ℱ in warm accent → strikes its cast → settles bouncy → gold ring seals). Born-FAIL on HEAD (cold grey Canvas line).
5. **7 shapes × 4 animations all visible, both modes, warm-cream, no gray, PRM single-paint static.**
