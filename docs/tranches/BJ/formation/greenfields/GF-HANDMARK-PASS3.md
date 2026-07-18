# GF-HANDMARK — the pen-natural mark, terminal design (REFABLE union)

- verified-model: claude-fable-5—read verbatim from this seat's system context ("The exact model
  ID is claude-fable-5").
- union provenance: REFABLE RU-06, 2026-07-18. The prior PASS1→CRIT2→PASS3 loop ran on
  claude-opus-4-8 under Fable declarations; this seat derived the design anew from the corrected
  canon (18-law IOS27-CODEX, MARKS-A/B, the measured timelines, SUFFUSION-MATRIX, FEEDBACK-LEDGER
  F34-F40 + the seven stills, the shipped family at HEAD) with the opus trio unread, then unioned.
  This design is authoritative on every conflict; opus decisions survive only where RATIFIED.
  Verdict ledger: `../refable/REFABLE-RU-06.md`. Boundary artifact: `ru06-anew-handmark.md`
  (scratchpad, session-local).
- crit fix applied (RU-06 fix seat, claude-fable-5, 2026-07-18): `../refable/crit-dock-handmark.md`
  H-1 MAJOR—the P4 width law re-normalized to the peak-normalized bell ĝ(t)=16t²(1−t)² (peak 1);
  the unit-integral v̂ stays the pace/duration form, where it is exact (v̂=s′). G-RESTRAINT is now
  satisfied by the spec's own generator (12% peak thinning, ≤15% bound, D3's ±12% figure).
- THE USER RULING (2026-07-17, standing, supersedes any census floor): "handmark is keep. But
  greenfield and perfect from first principles. Fable." Full surface authority; consumers adapt
  per the consumer-updates ruling. Q-HM-1/Q-HM-2 resolve inside this loop (below), not at ASK.
- TRANCHE-DEVELOPMENT: no source touched; this doc is the only artifact. No browser this seat—
  every π is OWED (LIVE-DEFER for paint claims).

---

## 1. The verdicts and the diagnosis (ratified, with two sharpenings)

The user's rows: F34/F35 awful, should be more pen-like, more natural · F36 doesn't even work ·
F37 broken and disjointed · F38 each one generally awful, greenfield · F39 wrong layering, awful
smoothing, awful encapsulation · F40 remove ALL meta text ("SE") (`FEEDBACK-LEDGER.md:46-52`).
The prior loop's file:line roots are verified and carry: the hull+pressure body slugs (F34/F38,
`brush.ts` weights 7/16/12/26, `ink.ts:104-121` curvature gain 2.5), the value-noise tremor (F35,
`noise.ts`), the dual draw mechanisms fragmenting (F37, `HandMark.vue:349-365`), the grain-frayed
behind-glyph ring (F39, `brush.ts:222` + `HandMark.vue:338`), the box-over-1ch slivers + the
se-guard masked fallback (F40, `ink.ts:195-210`), the jargon captions (F40, law 10).

Two sharpenings the prior loop missed:

1. **The F36 band is invisible INSIDE the card, not merely escaped below it.** The still shows no
   yellow behind "really matters"—only the escaped blob under the card's border. An unfenced
   `z-index:-1` (isolation deliberately removed, `HandMark.vue:311-316`) sends the band to
   whatever ancestor stacking context exists: behind the card's own background wherever they
   overlap, visible only where the mis-spaced geometry escapes the card bounds. "Wrong layering"
   is structural, and any fix that keeps the unfenced negative z (the prior PASS3 §5 did) ships a
   highlight that cannot paint inside a backed card.
2. **The tremor is a modeling error, not a tuning error.** Every shipped centerline—value-noise
   octaves AND `wobbleLinePoints` at any roughness—puts randomness in the SAMPLES and splines
   through the jitter. Lowering the amplitude yields a fainter squiggle, never a pen line.

## 2. The physics reframe (first principles; the design's spine)

A hand mark is a BALLISTIC GESTURE recorded in ink. Six principles, each load-bearing:

- **P1 minimum-jerk sweep.** One confident stroke follows the bell velocity profile
  v̂(t)=30t²(1−t)²—the unit-integral form (∫₀¹v̂=1, peak 1.875 at t=½), the exact derivative of
  the quintic position profile s(t)=6t⁵−15t⁴+10t³. Draw pace and duration derive from v̂; width
  modulation uses the peak-normalized bell ĝ(t)=16t²(1−t)²=v̂(t)/1.875 (peak 1), so P4's
  coefficient reads directly as a fraction of W. One bell, two normalizations, each where its
  form is exact.
- **P2 parameter randomness, never sample noise.** A stroke has an inflection budget of 1-2.
  Seeded variety enters ONLY through the low-dimensional parameters of a smooth analytic family—
  tilt, bow, harmonic phase, endpoint offsets—sampled densely from the smooth curve. Zero
  per-point jitter anywhere in the family. This is the "awful smoothing" cure: smoothness comes
  from few degrees of freedom, not from filtering many noisy points.
- **P3 the bow.** A hand line bows (the wrist/elbow pivot): sagitta 0.6-1.5% of span, seeded
  sign (sag-biased), plus one second harmonic ≤0.4× amplitude so it reads arc, not sine; whole-
  line tilt ±~1°.
- **P4 width restraint.** w(u)=W·(1−0.12·ĝ(u))—the peak-normalized bell of P1, thinnest where
  fastest, peak thinning exactly 12% at mid-stroke—plus a short entry taper (~5% of arc) and a
  longer lift-off run-out (~8%, to ~0.55W). Total modulation ≤~15% outside the tips; the
  generator sits at 12%, inside its own bound and G-RESTRAINT by construction. (The unit-integral
  v̂ does not belong here—0.12·v̂ peaks at 22.5% and breaches the bound; crit H-1, fixed.) The
  shipped slug was over-modulation; the pen is restraint.
- **P5 endpoint truth.** Touchdown lands slightly off (±0.5px, ±1°); the circle overshoots
  closure (sweep ~390-400°, ~5% radial miss)—the canonical hand-circle signature.
- **P6 ink is still.** A made mark does not wriggle. The boil retires entirely—codex law 11's
  attested ambient life is luminance drift, never geometry jitter, and the suffusion matrix rules
  substrates never carry engagement light.

## 3. The synthesis model

### 3.1 One coordinate space—measured pixels
Geometry is generated at the wrapper's measured pixel size: `viewBox="0 0 w h"`, default
`preserveAspectRatio`. No stretch anywhere—wobble is isotropic by construction. The entire
stretch apparatus dies whole: the 0..100×0..40 marking space, `preserveAspectRatio="none"`, the
`vbH`/`boxAspect` compensation, `vector-effect:non-scaling-stroke`, the `VB_H` fallbacks. (The
prior loop retracted this deletion to protect the positioned box-mode path—a path its own surface
had already cut. Nothing depends on the stretch once box mode is gone.) ResizeObserver
regenerates the SAME seeded stroke at the new scale—continuity of state through shape (law 17).

### 3.2 The measured baseline (ratified)
The Range-based baseline measurement (`document.fonts.ready` + ResizeObserver) survives—it is
correct and hard-won. Underline y = baseline + ~0.06em; strike y = mid-x-height with a slight
rising tilt; the highlight band seats baseline→x-height. Pre-measure/SSR renders nothing for one
frame—no fallback constants painting wrong lines (fail honest, not masked).

### 3.3 The four gestures (media collapse into shape)
- **underline** (default)—span ±1.5% overshoot, P3 bow, P4 ribbon.
- **strike**—the same stroke at mid-x-height.
- **circle**—ellipse around the measured word box (+~0.35em/0.22em pad), start ~110-140°, sweep
  past closure (P5), radial wobble r(θ)=r₀(1+0.03sin(θ+φ₁)+0.02sin(2θ+φ₂)). Drawn OVER the
  glyphs—an annotation sits on the print.
- **highlight**—chisel band ~0.62em tall, ±~0.15em overrun, α≈0.32, flat ends at ±2° chisel
  angle, near-zero bow. Behind the glyphs, inside the isolated context (§4).

box/bracket retire (slivers by geometry over small datums—ratified); positioned/box mode retires
from the SFC (chart-datum consumers use the pure exports, §6). With both gone, the degenerate-
datum class is vacuous: no shape-degrade machinery, no se-guard, no masked fallback of any kind.

### 3.4 One body, one draw mechanism
The body is a computed RIBBON: the analytic centerline offset ±w(u)/2 along its normals, closed
with round caps—~30 lines of pure geometry. No perfect-freehand (the vendored `freehand.ts`
deletes), no feTurbulence grain, no filters at all.

The draw is ONE mechanism for every shape: the ribbon is masked by a stroked copy of its own
centerline (mask stroke wider than max ribbon width) whose dashoffset animates over the real path
length. True along-path reveal with tapered tips; the dashoffset-vs-clip-wipe fork and its F37
fragment class die. On completion the dash clears outright—solid at rest.

## 4. The layering law (the F36/F39 cure, structural)

- The wrapper carries `position:relative; isolation:isolate`. The mark CANNOT escape the
  component's stacking context—load-bearing, stated in the SFC.
- underline/strike/circle: the SVG follows the slot in DOM order and paints over the glyphs. No
  z-index at all.
- highlight: `z-index:-1` INSIDE the isolated context—behind the glyphs, in front of everything
  outside the component, visible inside any card by construction.
- NO blend modes. The shipped multiply required un-walling the stacking context—the exact
  layering break the user named—and multiplies toward black over dark glass anyway. Plain alpha
  ink is deterministic on both themes. (The prior PASS3 kept multiply citing codex law 1
  "multiply against the page"—that phrase exists in no codex version; the citation is struck.)
- The word stays real selectable text; the SVG is `aria-hidden` (ratified—the family's reason to
  exist).

## 5. The choreography (codex-bound)

- **Entry (laws 8/15):** fire-and-forget draw along the path at the min-jerk pace. Duration
  T = clamp(150, 120 + 0.35·L_px, 450) ms—length-tempered, duration-stable in spirit (law 14):
  a checkbox check ~150ms (SUFFUSION-MATRIX-exact), a word underline ~220-250ms, a circle
  ~350-400ms. Default ON: the mark draws at first visibility (IntersectionObserver)—the entry
  choreography is the component's engagement, per the breath-of-life edict.
- **The detuned second channel (law 5):** ink lands at ~0.85 opacity and settles to 1.0 over
  ~200ms AFTER geometry completes—the wet-ink whisper. Never one shared clock.
- **Exit (law 8 asymmetry):** never a reverse un-draw—fade ~150ms. The story and consumers apply
  it; the spec states it as the family's exit rule.
- **Replay:** `play()` restarts clean—a new gesture is fire-and-forget, never a scrub (law 15).
- **PRM:** the finished static state, no motion. Resize: same seed, same stroke, new scale
  (law 17).

## 6. The surface (G-PROPS: exactly five) and the stroke vocabulary

| prop | type | default |
|---|---|---|
| `shape` | `"underline" \| "strike" \| "circle" \| "highlight"` | `"underline"` |
| `color` | any CSS color | `"currentColor"` |
| `weight` | number (px) | font-derived: clamp(1.5, 0.045·fontSize, 5) |
| `seed` | number | hash of the slotted text (deterministic variety, zero config) |
| `draw` | boolean | `true` (draw at first visibility; `false` = static) |

Exposed: `play()`. There is no brush prop: the register is ONE pen voice, and the highlighter is
a SHAPE, not a medium. Cut with the taxonomy: `brush`, `overrides`/`Partial<Brush>`, `animation`,
`appear`, `drawMs`, `drawDelayMs`, `boilFps`, `boilFrames`, `roughness`, `segments`, `jagged`,
`amplitude`, `natural`, `box`, `path`, `points`—and the 17-field Brush model, `lerpBrush`, the
`stamp` hatch, `BRUSHES`, the grain stack. (Census accounting stays honest per the prior loop's
correction: 11 census-dead; the rest retire on merit under the user ruling's full surface
authority.) pencil/crayon/marker/boil/ring die as named media—the user's F38 verdict was "each
one generally awful", pencil included; wax and tooth are aurora-family texture problems, not
mark-family taxonomy rows.

**The stroke vocabulary (the shared voice).** Pure exports serving the SUFFUSION-MATRIX bindings—
checkbox/radio marks DRAW (~150ms, :118), FeedbackMark's valid state draws (:168), the
completion-seal's theatrical draw (:287): `minJerk(t)`, `markDuration(lengthPx)`,
`handLine(...)`, `handEllipse(...)`, `strokeRibbon(centerline, weight, seed)`, `serialize(...)`.
Consumers import the functions or the idiom (mask-draw + min-jerk pace + markDuration)—never the
SFC. This satisfies the ≥2-site overfitting rule for the pure module the moment checkbox and seal
adopt it (marked addenda in their own waves, consumer-updates ruling).

## 7. Structure (colocation; dependency-zero)

```
handmark/
├── HandMark.vue   # the surface: measure, layering law, draw clock, play()
├── stroke.ts      # the voice: minJerk, markDuration, hand curves, ribbon, serialize
└── index.ts       # barrel
```

~400-450 LOC replacing 2306 across 12 files. DELETED: `brush.ts`, `ink.ts`, `noise.ts`,
`texture.ts`, `freehand.ts` (vendored perfect-freehand), `geometry.ts`, `constants.ts`,
`types.ts` (types inline), `composables/useHandMark.ts`. Seeding stays on the house prng leaf
(`mulberry32` + `hashString`—the single-source identity). The `@mkbabb/pencil-boil` peer RETIRES
from the family—the handmark family is its sole importer at HEAD, so the peer leaves
`package.json` with it. Per-point wobble cannot express P2; the substrate was the tremor engine,
not the cure. (BAND-COLOCATION Move D—six loose helpers → `composables/`—is superseded: the
helpers are deleted, not moved; the `handmark/ink/` OPEN closes as moot.) README rewritten short
and jargon-free.

## 8. The story (F40 cure; law 10)

Sentence-case gesture-named sections—"Underline", "Strike", "Circle a word", "Highlight",
"The draw"—user-voice blurbs, zero implementation vocabulary (no hull/se-guard/dashoffset/
φ/byte-identical/grain). The manifest blurb (`demo/stories/manifest.ts:984-986`, currently "boil
natural morphology · multiply over the page") rewrites with it. BAND-STORY G-COPY-2/G-COPY-4
survive and re-anchor after the rewrite.

## 9. Waves (6, all Fable seats per the ruling)

| wave | title | scope | hard gate(s) | π |
|------|-------|-------|--------------|----|
| **W0** | CONTRACT-LOCK | freeze §6 surface + §2 physics; born-RED gate scaffolds | suite compiles, all RED | — |
| **W1** | THE-VOICE | `stroke.ts` pure module: P1-P5 generators, ribbon, duration law | G-CALM, G-RESTRAINT | — (analytic) |
| **W2** | THE-SURFACE | `HandMark.vue`: px-space measure, layering law, 5 props, seed-hash; delete the 9 files + retire the pencil-boil peer | G-LAYER, G-WEIGHT, G-PROPS | π-BAND |
| **W3** | THE-CHOREOGRAPHY | mask-draw, min-jerk pace, ink-settle channel, exit rule, PRM, `play()` | G-DRAW | π-DRAW, π-PEN, π-RING |
| **W4** | THE-STORY | gesture-named story rewrite + manifest blurb | G-NO-JARGON | π-GALLERY |
| **W5** | CONSUMER+FINAL | stroke-vocabulary adoption marks (checkbox/seal addenda in their waves); overfit audit; FINAL.md | G-VOICE, overfit-audit | π-GALLERY |

## 10. Born-RED gates (small, per the abrogation mandate; each names its RED-at-HEAD)

- **G-CALM**—the centerline is an analytic 2-harmonic family: ≤2 perpendicular extrema, peak
  excursion ≤1.5% of span, zero per-sample noise (provable on the generator, not sampled). RED:
  `noise.ts` 4 octaves at 5% span; `wobbleLinePoints` per-point displacement.
- **G-RESTRAINT**—width modulation ≤15% outside the end tapers; tapers ≤5%/8% of arc. RED:
  curvature-gain 2.5 + taper 14-18 slugs (F34/F38).
- **G-WEIGHT**—weight font-proportional (≤ x-height/6), one px meaning everywhere. RED: weights
  7/16/12/26 in mixed stretch/px units.
- **G-LAYER**—the wrapper isolates; the mark never paints outside the component's stacking
  context; the highlight paints ABOVE ancestor backgrounds and below its own glyphs. RED:
  unfenced `z-index:-1`, isolation removed (F36/F39).
- **G-DRAW**—one connected reveal per mark, min-jerk pace, T=clamp(150,120+0.35L,450)ms, solid at
  rest, exit is a fade ≤180ms, PRM static. RED: dual mechanisms, `pathLength=1` fragments (F37),
  800ms robot default.
- **G-PROPS**—exactly the 5 props of §6, zero dead. RED: 19 props, 11 census-dead.
- **G-NO-JARGON**—no internal spec terms, no mono ALL-CAPS captions in story copy (law 10). RED:
  `handmark.vue:37,50,66,119,150`.
- **G-VOICE**—the pure exports have ≥2 consuming sites (checkbox + completion-seal) or stay
  exported-public per the overfitting rule. RED: no shared voice exists.

## 11. π obligations (ALL OWED—LIVE-DEFER; serialize the browser seat; paint-arm parses oklab)

- **π-PEN**—the underline at font-derived weight: one confident bowed line, no tremor, no slug
  (paired vs F34/F35).
- **π-BAND**—the highlight inside a `bg-card` panel: VISIBLE within the card, behind the glyphs,
  zero escape (paired vs F36—the invisibility half is the new probe the prior loop lacked).
- **π-RING**—the circle: over-glyph, clean, overshoot-closed (paired vs F39).
- **π-DRAW**—the reveal: one connected growing stroke at the min-jerk pace, solid at rest, exit
  fade (paired vs F37).
- **π-GALLERY**—the four gestures + the draw, de-jargoned copy, both themes (paired vs F38/F40).

## 12. Register answers + fallback appendix

- **Q-HM-1 (register):** resolved—ONE pen voice, no named-brush rows, no `Partial<Brush>` hatch.
  The highlighter is the `highlight` shape.
- **Q-HM-2 (box/bracket):** resolved—gone entirely, with positioned box mode; the pure exports
  serve datum-annotation consumers.
- **B (recorded stylus corpus): FALLBACK** (ratified posture)—reopens only if the parametric
  min-jerk stroke fails π-PEN on a live seat; shares the ribbon inking, a skeleton swap.
- **C (coverage field): BLOCKED** (ratified)—equal-difficulty primitive, Safari filter risk.
- **D (hand-mark type): FALLBACK** (ratified)—could supply designed slab/ring primitives if the
  computed ones fail π; span-fit remains its gap.

## 13. Convergence

Design-complete for tranche-development: the physics model is analytic (G-CALM/G-RESTRAINT are
provable, not sampled), the layering law is structural, the surface is exactly five, the
choreography is codex-bound, and the dependency graph is zero. Every paint claim is OWED to a
live seat (π-PEN's "pen-like enough" reading is the one residual that could reopen B). The prior
loop's honest diagnosis and its census/weight/de-jargon corrections carry; its architecture does
not—the union verdicts row by row live in `../refable/REFABLE-RU-06.md`.
