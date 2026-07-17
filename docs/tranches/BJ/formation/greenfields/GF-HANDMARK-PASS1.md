# GF-HANDMARK — greenfield design, PASS 1 (Fable seat)

One-seat compression of the design-loop charter (`PROMPTS/design-loop-prompt.md`): round-zero
portfolio → codebase research per family → leading-spec draft (wave shape + born-RED gates + π
obligations) → self-critique → honest convergence. TRANCHE-DEVELOPMENT: no source touched; this
doc is the only artifact. No browser (a Playwright suite owns the seat) — every π obligation is
OWED, not discharged, and convergence is capped accordingly.

Authorities read in full: the seven feedback stills (`feedback/F34-…`→`F40-handmark-meta-text-SE.png`),
`FEEDBACK-LEDGER.md:46-52`, `REGISTRY.md` family G (`:142` "handmark-total-failure → GREENFIELD w/
pencil-boil") + the surface census (`:69` HandMark 11 dead knobs), `round-1/component-surface---overfit-census.md:9-15`
(the 11-prop algorithm-knob-leak), `ios27/IOS27-CODEX.md` (law 10 — no mono ALL-CAPS jargon; law 11 —
the editorial hand voice), the full shipped family (`src/components/handmark/` — SFC, `brush.ts`,
`geometry.ts`, `ink.ts`, `noise.ts`, `texture.ts`, `freehand.ts`, `constants.ts`, `types.ts`,
`composables/useHandMark.ts`), the demo story (`demo/stories/motion/handmark.vue`), and the published
substrate the user named — `@mkbabb/pencil-boil@0.9.2` (real API censused from
`node_modules/@mkbabb/pencil-boil/src/{index,path}.ts`).

---

## 1. Problem statement (the ledger + the seven stills)

The user's verdict is total: *"Each one generally awful — should be greenfielded"* (`FEEDBACK-LEDGER.md:50`).
All seven brushes/modes fail naturalness, each in its own way. The headline directive (F35): **"should
be more pen-like, more natural."** The substrate is fixed by name: **pencil-boil** (`REGISTRY.md:142`).

| id | brush · mode | symptom (still) | inferred root (file:line) |
|----|--------------|-----------------|---------------------------|
| F34 | boil · underline | fat white **worm** under "future"/"here" — a bulbous filled sausage, not a line | boil `ribbon:'hull'` + auto-`natural` value-noise; `getStroke` fills a fat blobby hull on a short, curvy span (`ink.ts:177-219`, `noise.ts:63-127`, `brush.ts:139-157`) |
| F35 | pen · underline | wobbly **double-line** under "pays in" — two parallel wavy strokes reading as a lens | thin stroked Catmull-Rom over `wobbleLinePoints` (perp displace ≈1% span, `path.ts:89`) with endpoint overshoot (`path.ts:92-95`) **under `preserveAspectRatio="none"` x-stretch + `vector-effect:non-scaling-stroke`** → self-crossing / parallel-edge read (`geometry.ts:120-128`, `HandMark.vue:271-299`) |
| F36 | highlighter · highlight | gold multiply slab **escapes below the card** — broken isolation | `.hm` carries NO `isolation:isolate` (deliberate, `HandMark.vue:311-316`) + `overflow:visible` (`:327`) + weight-26 low-seat hull (`brush.ts:261-279`); NOTHING clips the mark to the card |
| F37 | pen · draw-on | **disjointed** — curl under "dr", gap, tiny dash under "li" | dashoffset reveal (`dasharray:1` on `pathLength:1`, `HandMark.vue:349-356`) over a high-excursion self-crossing Catmull-Rom path → reads as broken fragments |
| F38 | gallery | pen wobbly, boil worm, **crayon RED BLOB over the "y" descender**, marker flat GREEN slab | crayon weight 16 / wobble 3.0 (ampScale 3.0/1.4 ≈ **2.14**, `useHandMark.ts:162`) hull → a blob taller than the descender line; marker weight 12 square-cap = a lozenge (`brush.ts:183-252`) |
| F39 | ring · circle | **torn + mis-layered** rust ellipse over "ringed" | `ellipsePoints` wobble amp (roughness 1.4 × min-r × 0.06, `path.ts:305`) + grain filter fragments the ring; circle svg is `z-index:-1` (`HandMark.vue:331-339`) so the WHOLE ring sits behind the glyphs (parts vanish under fat letters) |
| F40 | box/bracket + meta | green/red **slivers** over 1-char datums "a"/"it"; and jargon captions ("SE-GUARD", "hull", "excursion knob") | box emits 4 wobble sides; over a ~1ch datum the width collapses so the se-guard falls back to a thin vertical stroke = a sliver (`geometry.ts:143-168`, `ink.ts:203-210`); the demo leaks internal spec terms as UI copy (`handmark.vue:37,50,66,119,150`) — **codex law 10 violation** (`IOS27-CODEX.md:~48`) |

### The unifying diagnosis (the greenfield thesis)
The component chased naturalness through **high-frequency wobble** and a **16-scalar brush taxonomy**,
and it produced worms, blobs, double-lines, torn rings, and slivers. A believable hand mark reads
natural through the **opposite** move:

1. a **near-straight, confident centerline** with LOW-frequency drift — not a squiggle;
2. **pressure-driven WIDTH** on a **single filled ribbon** — not a thin stroked outline;
3. **tight containment** and **shape-appropriate geometry** — never a box over one character.

Everything the current system adds to chase "hand" — the φ-incommensurate value-noise octave sum
(`noise.ts`), the per-instrument stroke/hull split (`ink.ts:177-229`), curvature-coupled pressure
(`ink.ts:104-121`), the amplitude excursion knob (`constants.ts:65-74`), boil frames, two draw-on
mechanisms — either FIGHTS naturalness or is **dead surface**: 11 of 19 props have zero consumers
repo-wide (`component-surface---overfit-census.md:11-13`). **Wobble ≠ hand.** That is the reframe.

---

## 2. Census — what survives, what the greenfield replaces

Evidence is file:line at HEAD (`codex/bi-p-q-execution`). The substrate is `@mkbabb/pencil-boil@0.9.2`,
whose REAL exported surface (`index.ts`) is: `wobbleLinePoints`, `perturbPoints`,
`perturbPointsClosed`, `ellipsePoints`, `catmullRomToBezier`, `pointsToLinear`, `boilLineFrames`,
`useLineBoil`, `createStrokeDrawIn`, `mulberry32`, + raster/hold/frames helpers. The component today
uses a small slice (`wobbleLinePoints`, `perturbPoints[Closed]`, `ellipsePoints`, the serializers,
`useLineBoil`) and vendors perfect-freehand for the hull.

### SURVIVES (reuse, do not re-fork)
- **`freehand.ts`** — the vendored perfect-freehand geometry core (MIT, `getStroke` /
  `getSvgPathFromStroke`, `:353-379`). This is the ONE engine that produces a true variable-width
  filled ribbon; the greenfield makes it UNIVERSAL (every brush fills), so it earns its bundle weight.
- **`wobbleLinePoints` / `perturbPoints`** (pencil-boil `path.ts:69,115`) — the calm-drift skeleton
  and the micro-life perturb. KEEP, but drive at a MUCH lower `roughness` (§4.2). The user named this
  substrate; it stays load-bearing.
- **`pencil-boil createStrokeDrawIn`** (`vue.ts`, censused in `index.ts`) — a scheduler-parked
  stroke-dashoffset draw-in that already honors PRM and settles to a solid stroke. The greenfield
  ADOPTS it for the one surviving animation, replacing the component's hand-rolled dual mechanism
  (`useHandMark.ts:190-194` + the clip-path wipe) where possible.
- **The measured baseline machinery** (`HandMark.vue:143-209`, `textRangeRect` + ResizeObserver +
  `document.fonts.ready`) — anchoring the mark to the REAL glyph baseline is correct and hard-won
  (the 3.11.0 gate-flip lesson, `:167-174`). SURVIVES; the greenfield builds the calm centerline on
  the same measured anchor.
- **The house PRNG seed leaf** (`src/composables/glass/procedural/prng.ts`, imported at `noise.ts:22`,
  `ink.ts:28`) — one seed identity. SURVIVES unchanged.
- **`a11y` contract** — the word stays REAL selectable text; the mark is an `aria-hidden` SVG overlay
  (`HandMark.vue:266-303`). SURVIVES; it is the family's whole reason to exist.

### REPLACED (clean break, no alias — no-backwards-compat)
- **`noise.ts` (the φ-value-noise "natural" morphology)** — `NOISE_AMP_FRAC=0.05` × `NOISE_OCTAVES=4`
  (`constants.ts:57-63`) is the fat-worm/double-line amplitude+frequency engine. RETIRED. A single
  low-frequency drift with end-lift replaces the octave sum (§4.2). The `natural` prop and the whole
  `boil` auto-engage (`useHandMark.ts:113`) die with it.
- **The `ribbon:'stroke'` vs `'hull'` split** (`brush.ts:43`, `ink.ts:177-229`) — the double-line
  (F35) is a THIN STROKED path artifact; a filled ribbon has no two edges to read as parallel.
  UNIFIED: every brush fills one variable-width ribbon. The `ribbon` field retires.
- **The se-guard** (hull→stroke degenerate fallback, `ink.ts:195-210`) — it is a MASKED FALLBACK that
  turns a vanish into a sliver (F40). RETIRED; a datum below a min-span DEGRADES its SHAPE (§4.4),
  it does not fall back its ink.
- **`preserveAspectRatio="none"` + the aspect-correct-viewBox patch** (`HandMark.vue:271`,
  `:70-89` `boxAspect`/`vbH`, `geometry.ts:85-101`) — the x-stretch is the co-cause of the double-line
  and the flat-ruler trap the `vbH` patch was fighting. The greenfield builds geometry in a
  UNIFORM px-proportional marking space so the ribbon never stretches (§4.3). The whole `vbH`/`boxAspect`
  measure-and-correct apparatus is deleted, not patched.
- **The 11 dead props** — `roughness, segments, jagged, amplitude, natural, overrides, path, points,
  boilFps, boilFrames, drawDelayMs, drawMs` (`types.ts:33-92`; zero consumers per
  `component-surface---overfit-census.md:11-13`). DELETED.
- **The demo captions** (`handmark.vue:26,37,50,66,119,150`) — "the se-guard (never a vanish)",
  "box-mode hull", "the excursion knob", "byte-identical", "multiply over the page", "grain:0". The
  user: *"Remove ALL reference to meta text (what is 'SE')"* (`FEEDBACK-LEDGER.md:52`). REWRITTEN to
  the editorial voice (codex law 10/11), no internal jargon.

### CANDIDATE-CUT (the critic default — cut unless a pass-2 prototype proves it reads natural)
- **`boil`, `crayon`, `marker`, `ring` as named brushes** (`brush.ts:139-230`) — four of the five
  worst stills. Per the charter's adjunct edict ("critics default-assume the current state is
  wrong"), they RETIRE to the reduced register unless prototyped-natural under the new ribbon. An
  "inky" / "waxy" feel becomes a Brush-object override, not a preset in a taxonomy zoo (§4.5).

---

## 3. Portfolio — four orthogonal families (round zero)

Keyed by ARCHITECTURAL CENTER — where naturalness is SOURCED. Two routes that source it the same way
share a family.

### Family A — RIBBON (pressure-centric; naturalness in the WIDTH). **LEADING**
Center: a hand mark is ONE low-frequency centerline (calm pencil-boil skeleton) rendered as ONE
filled **variable-width ribbon** (perfect-freehand), where the natural read lives in the PRESSURE
PROFILE — lift-on, press-through, run-out — **not** the wobble.
- **Mechanism:** cut amplitude (`NOISE_AMP_FRAC` 0.05 → ~0.012) + frequency (4 octaves → 1 gentle
  drift + end-lift); ALWAYS fill the pf ribbon (kills the stroked double-line); build geometry in a
  UNIFORM marking space (kills the x-stretch ruler + its aspect patch); clip the highlight band; and
  DEGRADE box/circle over tiny datums to a legible mark (kills the sliver).
- **Codebase fit:** strongest — the ribbon engine EXISTS (`freehand.ts`, `ink.ts` hull path); the
  work is DELETION + retune, not a new hard primitive. Honors the user's named substrate (pencil-boil)
  AND the registry family-G verdict ("GREENFIELD w/ pencil-boil"). Reuses the measured baseline + house
  PRNG untouched.
- **Research verdict:** the only family that satisfies BOTH the literal ask ("more pen-like, more
  natural") AND the named substrate AND the surface-reduction census target (19→~5 props).
- **Disposition: LEADING** — full spec §4.

### Family B — CORPUS (motion-data-centric; naturalness is CAPTURED, not computed)
Center: authentic hand motion is unfakeable procedurally at this quality — so ship a small library of
REAL stylus-recorded gestures (≈10 underlines, strikes, circles), normalized to unit space, picked by
`seed`, time-warped to the word, then inked with the SAME pressure ribbon as A.
- **Mechanism:** the skeleton is HUMAN DATA (recorded `[x,y,pressure,t]` streams), not `wobbleLinePoints`.
  pencil-boil's role shrinks to `perturbPoints` micro-life on replay.
- **Codebase fit:** the ribbon inking is shared with A; the NEW piece is a capture/authoring pipeline
  + a bundled corpus — a missing primitive of real cost ("and then someone hand-draws 30 gestures with
  a stylus and we bundle them").
- **Research verdict:** highest authentic-ceiling, but the corpus + capture tool don't exist and add
  bundle weight; finite variety risks visible repeats at scale.
- **Disposition: BANKED-ALIVE** — the fallback if A's procedural centerline still can't pass "pen-like"
  by pass 3. Reopens on a concrete corpus source.

### Family C — FIELD (render-substrate-centric; naturalness in a coverage FIELD)
Center: model the mark as a signed-distance / coverage FIELD, not an SVG stroke. A ribbon = the union
of pressure-stamped disks along the centerline, thresholded to ONE crisp body (marching-squares → one
SVG path, or a canvas/WebGL coverage pass).
- **Mechanism:** single-body by construction (no two edges → **no double-line possible**); exact
  containment (clip the field to the line box); morphological box/circle (dilate the datum bbox).
- **Codebase fit:** none landed — the field→path (or field→raster) seam is a new substrate; the
  "threshold a hand line out of a noise field" step is genuine work; WebGL reintroduces the Safari
  filter-stack risk the constellation retired (`Never park sibling repos` / dock fission precedent).
- **Research verdict:** most robust against the double-line class, but the load-bearing field→body
  primitive is unspecified and substrate-heavy.
- **Disposition: BLOCKED** — reopens only on a concrete field→path primitive that is NOT
  equal-difficulty to the original problem.

### Family D — TYPE (typography-centric; naturalness DRAWN by a type designer)
Center: a hand mark is best drawn by a human type designer — ship a small HAND-MARK glyph set / variable
font (weight axis = pressure, width axis = span); shape = glyph; animation = draw-on.
- **Mechanism:** no procedural geometry at all; the glyphs ARE the marks, contained + PRM-trivial.
- **Codebase fit:** none landed; needs a font-authoring dependency; per-word span fitting is awkward
  (a fixed glyph does not stretch cleanly to arbitrary word widths — the very x-stretch trap A is
  escaping); seed-variety is limited to the drawn set.
- **Research verdict:** maximal per-primitive naturalness, minimal runtime math, but the span-fit + the
  authoring dependency are real gaps.
- **Disposition: BANKED-ALIVE** — could SUPPLY A's highlight/circle primitives (a designed slab reads
  better than a computed one) and compose under A rather than compete. Reopens if A's computed
  highlight/circle can't pass π.

---

## 4. Leading spec — GF-HANDMARK-A "The Pressure Ribbon"

### 4.1 The load-bearing reframe
**Naturalness ⊥ wobble.** The believable hand mark is decomposed on three independent axes, and the
current failure is that ALL THREE are mis-set at once while the code spends its complexity fighting the
symptoms:

1. **CENTERLINE** — near-straight, LOW-frequency drift (≤ ~1.5 gentle arcs across a word, amplitude ≤
   ~1.5% of span), settling to baseline at both ends.
2. **WIDTH** — a pressure profile (lift-on → press → run-out) on ONE filled ribbon, identical engine
   for every brush.
3. **CONTAINMENT** — uniform marking space (no x-stretch), highlight clipped to the line box,
   shape-appropriate geometry (no box/circle over 1ch).

The reframe is why this BESTs the current design rather than patching it: the current system inverts
axis 1 (high wobble), splits axis 2 (stroke vs hull → the double-line), and drops axis 3 (no clip,
`preserveAspectRatio="none"`, se-guard slivers). Fixing all three is a DELETION-heavy retune, not new
machinery.

### 4.2 The calm centerline (retire the value-noise)
Replace `naturalUnderlinePoints` (`noise.ts`, 4-octave φ-value-noise, amp 5% span) with a SINGLE
low-frequency drift: one gentle arc (or a shallow S at most) across the span, amplitude ≈ 1–1.5% of
span, cosine-tapered to baseline at both ends (keep the end-settle idea from `noise.ts:117-123`; drop
the octave sum). Concretely, pencil-boil's `wobbleLinePoints` at `roughness ≈ 0.25` gives perp
displace ≈ 0.25 × span × 0.015 ≈ **0.4% span** (`path.ts:89`) — already calmer than the value-noise;
the greenfield tunes ONE drift constant against the pen still, not a 400-seed spacing-CV spike. The
non-periodicity anxiety that motivated the octave sum (`constants.ts:34-53`) is MOOT at ≤1.5 arcs —
there is no period to detect in a single arc.

### 4.3 The universal ribbon in uniform space (retire the stroke/hull split + the x-stretch)
Every brush renders ONE filled `getStroke` ribbon (`freehand.ts`), pressure = a lift-on/press/run-out
profile keyed to arc-length (NOT curvature — cut `addPressure`'s curvature coupling, `ink.ts:104-121`;
a pen presses evenly, it does not thin at every micro-wobble because there are no micro-wobbles now).
Geometry is built in a UNIFORM marking space sized to the MEASURED word box (reuse the `getBoundingClientRect`
already taken at `HandMark.vue:186`), so `preserveAspectRatio` is the DEFAULT (`xMidYMid`) and the
ribbon never x-stretches into a ruler. The whole `boxAspect`/`vbH` measure-and-correct apparatus
(`HandMark.vue:70-89`, `geometry.ts:91-101`) is DELETED — it exists only to fight the stretch this
change removes.

### 4.4 Containment + shape re-expression (F36/F39/F40 cures)
- **highlight (F36):** clip the multiply band to the word's line box. The design tension is real — the
  no-isolation multiply (`HandMark.vue:311-316`) MUST still composite against the page, but the mark
  must not ESCAPE the card. Resolution: the band geometry is bounded to the measured line box (a
  contained rect, low-seat), and the multiply blend stays; containment is a GEOMETRY bound, not a
  stacking-context wall. (A `clip-path` on the svg to the line-box rect keeps overflow visible for the
  round end-caps but kills the vertical escape.)
- **circle/ring (F39):** retire the wobbled CLOSED ellipse behind the text. Draw an OPEN hand-loop
  that overshoots and crosses itself ONCE, rendered at ONE consistent z IN FRONT of the text at low
  alpha (a margin annotation sits ON the page, not behind the ink). Drop the grain filter on the ring
  (it fragments the thin stroke into the "torn" read). `ellipsePoints` (`path.ts:296`) stays as the
  base ring; the greenfield opens the sweep + fixes the layer.
- **box/bracket over a tiny datum (F40):** NEVER a box (collapses to a sliver). Below a min-span
  threshold (~2ch), a datum mark DEGRADES its shape to one that reads at 1ch — an underline tick or a
  caret — a SHAPE rule, not the se-guard's ink fallback. box/bracket retire as first-class shapes (or
  become the ≥2ch-only geometry).

### 4.5 Prop surface (census target: brush · shape · color · animation)
Collapse 19 → ~5, zero dead (`component-surface---overfit-census.md:15`):

| prop | values | note |
|------|--------|------|
| `brush` | `pen`(default) · `pencil` · `highlighter` · `Partial<Brush>` | the three that CAN read natural; `boil`/`crayon`/`marker`/`ring` retire to Brush-object overrides unless pass-2 proves them natural |
| `shape` | `underline`(default) · `strike` · `highlight` · `circle`(open loop) | `box`/`bracket` retire or become ≥2ch-only |
| `color` | any CSS color (default `currentColor`) | unchanged |
| `animation` | `none`(default) · `draw-on` | via pencil-boil `createStrokeDrawIn`; `boil` + `draw-then-boil` retire |
| `seed` | number (hidden determinism input, not a tuning knob) | kept; not a "config" prop |

DELETE: `roughness, segments, jagged, amplitude, natural, overrides, path, points, boilFps, boilFrames,
drawDelayMs, drawMs, appear`(fold to a sensible default). The `Brush` model shrinks from 16 scalars +
4 enums (`brush.ts:33-80`) to the ~6 that the ribbon actually reads (weight, taper, opacity, blend for
highlighter, a pressure shape, grain for pencil).

### 4.6 Wave shape (bbnf-lang tranche format; hard gates; FINAL.md)

| wave | title | scope | hard gate(s) | π obligation |
|------|-------|-------|--------------|--------------|
| **W0** | CONTRACT-LOCK | freeze §2 survives/replaces/candidate-cut; author all born-RED gate scaffolds (RED at HEAD) | gate suite compiles + all RED | — |
| **W1** | CALM-CENTERLINE | retire `noise.ts` value-noise; single low-freq drift + end-settle; delete `natural`/amplitude machinery | G-CALM | π-CALM |
| **W2** | UNIVERSAL-RIBBON | every brush fills ONE pf ribbon; arc-length pressure; kill stroke/hull split + se-guard + curvature-pressure | G-NO-DOUBLE-LINE, G-NO-SLIVER | π-PEN, π-DATUM |
| **W3** | UNIFORM-SPACE + CONTAIN | build geometry in measured px-proportional space; drop `preserveAspectRatio="none"` + `vbH`/`boxAspect`; clip highlight to line box | G-CONTAIN | π-CONTAIN |
| **W4** | SHAPE-DEGRADE + RING-LAYER | open-loop ring at one front z (no grain); datum-min-span degrade; box/bracket retire-or-≥2ch | G-RING-LAYER, G-NO-SLIVER | π-RING, π-DATUM |
| **W5** | SURFACE-REDUCTION | 19→~5 props, 0 dead; shrink the Brush model; adopt pencil-boil `createStrokeDrawIn` for draw-on | G-PROPS | — |
| **W6** | DEMO-DE-JARGON | rewrite `handmark.vue` copy to the editorial voice; strip SE-guard/hull/excursion/byte-identical captions | G-NO-JARGON | π-GALLERY |
| **W7** | CONSUMER + FINAL | re-point the one consumer (`handmark.vue`); overfit audit (≥2 sites/exported/private-helper); FINAL.md | G-CONSUMER, overfit-audit | π-GALLERY |

### 4.7 Born-RED gates (each names its RED-at-HEAD condition; small per the gates-abrogation mandate)
- **G-CALM** — the underline centerline has ≤ 1.5 sign changes in its perpendicular drift and peak
  excursion ≤ 1.5% of span. *RED today:* `noise.ts` sums 4 octaves at amp 5% span (`constants.ts:57-61`)
  — the F34 worm / F35 wobble.
- **G-NO-DOUBLE-LINE** — a pen underline renders as ONE filled body; no scanline crosses the mark's
  fill boundary more than twice (no interior parallel edge). *RED today:* the stroked Catmull-Rom under
  x-stretch reads as two lines (F35, `HandMark.vue:271` + `geometry.ts:120`).
- **G-NO-SLIVER** — a datum mark over a 1ch box paints a band ≥ a legibility floor width AND never
  covers a descender. *RED today:* box→se-guard sliver (F40, `ink.ts:203-210`); crayon blob over the
  "y" (F38, `brush.ts:183-201`).
- **G-CONTAIN** — the highlight/mark never paints outside the word's line box (vertical), while the
  multiply blend still composites against the page. *RED today:* the gold slab escapes below the card
  (F36, `HandMark.vue:327` + no clip).
- **G-RING-LAYER** — the ring paints at ONE consistent z, in FRONT of the text, unfragmented (no grain
  filter on the thin ring). *RED today:* whole ring at `z-index:-1` behind the glyphs + grain fragments
  = torn/mis-layered (F39, `HandMark.vue:331-339`).
- **G-PROPS** — HandMarkProps ≤ 6 props, ZERO with 0 repo consumers. *RED today:* 19 props, 11 dead
  (`component-surface---overfit-census.md:11-13`).
- **G-NO-JARGON** — the demo copy contains no internal spec terms (SE-guard, hull, ribbon, excursion,
  byte-identical, grain:0) and no mono ALL-CAPS jargon caption (codex law 10). *RED today:*
  `handmark.vue:37,50,66,119,150`.

### 4.8 π obligations (live paint-verified deltas — ALL OWED; run live-π per band; paint-arm parses oklab)
- **π-PEN** — capture a pen underline; prove ONE confident line, no double/lens read (paired vs F35).
- **π-CALM** — capture the reduced underline; prove ≤1.5 arcs / ≤1.5% excursion (paired vs F34 worm).
- **π-CONTAIN** — capture the highlight over a word near a card edge; prove no vertical escape, multiply
  still hitting the page (paired vs F36).
- **π-DATUM** — capture a mark over a 1ch datum; prove a legible band, no sliver, no descender cover
  (paired vs F38 crayon + F40 slivers).
- **π-RING** — capture the circle; prove front-z, single-layer, untorn (paired vs F39).
- **π-GALLERY** — capture the surviving-brush gallery; prove each is distinct AND reads natural, with
  de-jargoned copy (paired vs F38 + F40 captions).

Per the browser-seat-singleton + live-π memory: serialize the browser seat; run live π per band
(device-free gates pass while live π false-FAILS on oklab tokens — paint-arm now parses oklab; grey
separates by L not chroma).

---

## 5. Banked-route dispositions
- **B (recorded corpus): BANKED-ALIVE** — the authentic-ceiling fallback if A's procedural centerline
  can't pass π-PEN/π-CALM by pass 3. Reopens on a concrete corpus + capture source. Shares A's ribbon
  inking, so it is a skeleton swap, not a rewrite.
- **C (coverage field): BLOCKED** — reopens only on a concrete field→body primitive that is not
  equal-difficulty to the problem and does not reintroduce the Safari filter-stack risk.
- **D (hand-mark type): BANKED-ALIVE** — could COMPOSE under A (supply the highlight/circle primitives)
  rather than compete. Reopens if A's computed highlight/circle fail π-CONTAIN/π-RING.

---

## 6. Self-critique (failure-mode checklist)
- **Vacuous convergence:** avoided — PASS 1, ~55%, not a convergence claim.
- **Spec-cites-itself circularity:** the reframe cites the seven stills + shipped file:line + the census
  + pencil-boil's real API + codex laws — not itself. Clean.
- **Gates that cannot fail:** each gate names a RED-at-HEAD file:line. G-NO-DOUBLE-LINE (scanline
  crossing count) and G-CALM (sign-change + excursion bound) are hard scalar predicates on the emitted
  geometry, checkable headless — NOT hand-wavy.
- **Elegant-reduction trap ("and then the hard part"):** the load-bearing primitive (the filled
  variable-width ribbon) ALREADY EXISTS (`freehand.ts`, `ink.ts` hull path). The greenfield's work is
  DELETION (value-noise, stroke/hull split, se-guard, x-stretch, 11 props) + retune (drift constant,
  arc-length pressure). No step reads "and then compute naturalness." A passes this test; C FAILS it
  (its field→body step is unspecified → BLOCKED, honestly).
- **Legacy aliases / masked fallbacks:** clean break, no alias (no-backwards-compat). The se-guard —
  the family's one masked fallback — is explicitly RETIRED; the datum mark works (degrades its shape)
  or is absent, never a hidden sliver.
- **Unverified gestalt:** REAL, and the primary cap. No browser this seat. The double-line ROOT (F35)
  is INFERRED from the stroke + x-stretch + Catmull-Rom overshoot code path, not captured; the calm-drift
  constant is reasoned from `path.ts:89` arithmetic, not tuned against a live still. Every π is OWED.
- **Consumer-less substrate:** the one consumer (`handmark.vue`) is re-pointed at W7 with the overfit
  audit; the reduced surface makes the ≥2-consumer bar honest (a 5-prop component is defensible where a
  19-prop one with 11 dead props is not).

## 7. Convergence + open gaps
**Convergence: 55%.** The reframe (naturalness ⊥ wobble; universal filled ribbon; uniform space +
containment; shape-degrade over slivers) is codebase-grounded, honors the user's named substrate, and
answers the literal ask + the census target in one move. It passes the elegant-reduction test (the
primitive exists; the work is deletion + retune). What is NOT earned:

1. **Zero paint verification (the sharpest gap).** Doc-only seat; every π is OWED. The double-line
   root is inferred, not captured; the calm-drift amplitude is arithmetic, not tuned against the still.
   Pass 2 MUST prototype the ribbon + capture the RED baselines (π-PEN/π-CALM/π-CONTAIN) — this is the
   one thing that could re-order A vs B.
2. **Which brushes survive is unproven.** "Cut boil/crayon/marker/ring" is the critic default, not a
   demonstrated verdict. Pass 2 must EITHER prototype them under the new ribbon and show they still
   can't read natural, OR retune-and-keep. The reduced-register claim (§4.5) is a hypothesis.
3. **The uniform-space change is load-bearing and untested.** Dropping `preserveAspectRatio="none"`
   (§4.3) interacts with the measured-baseline anchor AND the positioned box-mode datum geometry
   (`geometry.ts:96-101` deliberately KEEPS the none-stretch to fill the datum rect). The box-mode path
   may break; unverified.
4. **The highlight containment vs the intentional multiply (F36) is a genuine tension.** §4.4 asserts a
   geometry bound keeps the multiply hitting the page while killing the escape, but the exact
   `clip-path` vs `overflow` vs stacking spec is not drawn — a `clip-path` that contains the vertical
   escape must NOT clip the round end-caps the design wants. Concrete stacking spec owed.
5. **Open-loop ring geometry is asserted, not drawn.** §4.4 says "overshoot + cross once, front z, no
   grain" — the actual `ellipsePoints` sweep-open + the single-crossing construction + the front-layer
   CSS are unspecified.
6. **B/D are banked but under-developed.** Neither has a concrete corpus/font source; they are
   fallbacks, not yet independent competitors developed far enough to expose their real gaps (the
   charter wants each family developed independently before cross-pollination).

Per the charter, run 3+ passes before contemplating convergence. Next pass: prototype the pressure
ribbon on the calm centerline + capture π-PEN/π-CALM/π-CONTAIN RED baselines (gap 1), and resolve gap
2 (prototype the four candidate-cut brushes under the ribbon — the one decision that sets the final
brush register).
