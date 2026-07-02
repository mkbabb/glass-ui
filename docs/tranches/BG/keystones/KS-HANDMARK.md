# KS-HANDMARK — the hand-voice keystone (binding spec)

**Series:** KS-B (motion + craft) · **Date:** 2026-07-01 · **HEAD:** `29f280c8` (tranche/BG)
**Waves bound:** `14.3 BG.W-HANDMARK-PERFECT` (F4, `proof:paper` family — absorbs `14.4 W-PENCIL-BOIL-DEEPEN`
as clauses, per the frozen row `EXECUTION-PROGRESS.md:82`). **Binding context:** the three-underline-register
fence (both directions).
**Research composed:** `research/HANDMARK-sota.md` + `research/HANDMARK-corpus.md` (all file:line claims
re-verified on disk at HEAD) + the BD GOLDEN (`docs/tranches/BD/greenfield/handmark/GOLDEN.md`).
**Fences:** spec only — no src/demo/scripts edits; siblings READ-ONLY (`~/Programming/pencil-boil` quoted,
never touched); the wave SET is frozen (new wants → fold-candidate notes only).

---

## §1 · The hallmark delineated

**The hand voice is the platform's ONE way of saying "a human pointed here."** `<HandMark>` (alias
`<InkMark>`) lays a deterministic, seeded, `aria-hidden` SVG mark — underline · strikethrough · highlight
band · circle · box · bracket · arbitrary path — over/under/behind REAL selectable text, in seven brush
voices (`pen`·`boil`·`pencil`·`crayon`·`marker`·`ring`·`highlighter`), any CSS color, optionally animated
(`draw-on` · `boil` · `draw-then-boil`). A stranger recognizes the library by it the way they recognize the
warm-cream glass: the marks read hand-MADE at a glance — pressured, irregular, warm — never machine-perfect,
never a spell-check squiggle, never a filter effect.

The identity is architectural, not decorative — a **flat-data Brush continuum** under a five-layer engine:

- **L1 GEOMETRY** — `@mkbabb/pencil-boil` primitives (`wobbleLinePoints`/`ellipsePoints`/`perturbPoints`/
  `catmullRomToBezier`, `geometry.ts:24-32`) + glass-ui's own `naturalUnderlinePoints` φ-incommensurate
  fractal value-noise morphology (`geometry.ts:93-155`).
- **L2 BODY** — `ink.ts`: field-gated union, ZERO instrument-name `if`. `ribbon:'stroke'` (plain stroked
  path) vs `'hull'` (vendored perfect-freehand variable-width body, `freehand.ts`) + the curvature-coupled
  pressure profile (`ink.ts:102-119` — presses harder on straights, thins through wobbles; the move that
  makes a wiggly line a PEN line).
- **L3 GRAIN** — `texture.ts`: ONE parameterized STATIC seeded `feTurbulence` filter; `grain<=0 ⇒ no
  filter` (the PEN-is-free law, `texture.ts:38-39`); `color-interpolation-filters="sRGB"` pinned.
- **L4 ANIMATION** — `composables/useHandMark.ts`: draw-on (dashoffset clean | clip-path wipe grained —
  never dashoffset under a filter) + the discrete-cadence boil (`boilFps` 8 / `boilFrames` 3 defaults,
  `useHandMark.ts:95-96`); a non-boiling mark gets a `NOOP_BOIL` stub (zero-cost by construction).
- **L5 SURFACE** — `HandMark.vue`: real-baseline Range measure (fonts.ready + ResizeObserver re-measure,
  `HandMark.vue:170-181`), namespaced filter mount, a11y (`aria-hidden` overlay; the word stays real text).

Every medium is a frozen literal POINT in one 20-field space (`BRUSHES`, `brush.ts:108-280`); `lerpBrush`
proves the continuum. The renderer branches on FIELDS (`ribbon`/`passes`/`grain`/`blend`/`cap`), never on
name. Seed discipline: the house `mulberry32`/`hashString` (`utils/prng.ts`) is the ONLY rng; pencil-boil is
FED a derived int, its `mulberry32` never imported (`geometry.ts:33`, gate W4).

### §1.1 · The negative space (structural immunity)

- **NOT a sketch-shape engine.** rough.js-style jittered polylines + hatch fill is the wrong register for a
  variable-width INK mark over text (SOTA §2 verdict: REJECT as engine, ADOPT the Excalidraw lesson).
- **NOT a signature pad / freehand capture.** Deterministic per seed; no pointer input.
- **NOT the structural hairline.** The three-underline-register fence (README `§0.6`, `proof:handmark` W6):
  (1) `.paper-ink-mark` — the STRAIGHT structural 2px `--foreground` hairline (tab indicator, math-paper
  rail) — NEVER wobbled, NEVER grained; (2) `HandMark shape="underline"` — the hand wobble; (3) deck-local
  red-pen glyphs — consumer CSS, not this family. One pencil-boil engine under every wobble; zero wobble
  under the structural mark. **Both directions** (§3.Q4 final form).
- **NOT a body texture.** The hand voice is emphasis, marginalia, correction, celebration — never the
  default typographic register (the editorial-restraint law, §3.Q4).

---

## §2 · SOTA grounding (named references; where glass-ui already leads)

| SOTA input | Verdict | Where it lands |
|---|---|---|
| **perfect-freehand** (Steve Ruiz/tldraw, MIT — github.com/steveruizok/perfect-freehand): pressure→variable-width outline, `thinning`/`taper`/`cap` | ADOPT — vendored (`freehand.ts`); hull body for boil/crayon/marker/highlighter | shipped |
| pf's velocity-simulated pressure | REFINED PAST — `addPressure` derives pressure from centerline CURVATURE (`ink.ts:102-119`), the correct model for a deterministic seeded mark | shipped; extends to pencil (§4.D5) |
| **rough.js** (Preet Shihn — roughjs.com; algorithms: shihn.ca/posts/2020/roughjs-algorithms/) | REJECT as engine (shape-sketcher, wrong register); the seeded-determinism + annotate vocabulary is the theft (`types.ts:2-6`) | — |
| **Excalidraw #7239** "Adaptive roughness reduces hand-drawn feel" (github.com/excalidraw/excalidraw/issues/7239) | ADOPT the lesson — the wobble must be VISIBLE; sub-perceptual amplitude is the shipped-and-walked-back failure | `NOISE_AMP_FRAC` 0.05 (`constants.ts:61`) + the §6 "hand-made at a glance" bar |
| feTurbulence+feDisplacementMap SMIL boil (Visini — camillovisini.com/coding/simulating-hand-drawn-motion-with-svg-filters; kirgroup.net 2025-07-21) | REJECT mechanism (per-frame filter repaint storm; engine-divergent) — the boil is FILTER-FREE, wobble in control points | shipped |
| The **discrete low cadence** truth: ~4.4–12fps reads hand-drawn; 60fps reads digital-wobble (paper-animation.com/blog/understanding-boil-effect-animation) | ADOPT — `boilFps` 8 / 3 frames sits mid-band; pencil-boil's interval scheduler is already discrete (`~/Programming/pencil-boil/src/vue.ts:111-112`) | held; §3.Q3 |
| CSS highlighter: `mix-blend-mode: multiply` + low→high→low opacity taper (max.hn/blog/how-to-create-a-highlighter-marker-effect-in-css; MDN mix-blend-mode) | ADOPT — and glass-ui LEADS: the hull IS the frayed edge, `taper` IS the opacity ramp as WIDTH, multiply is UN-WALLED (`.hm` carries no `isolation:isolate`, `HandMark.vue:277-286`) | shipped; §3.Q2 |
| Editorial restraint (award annotation UIs: one deliberate mark; kitsch = wobble-as-theme) | ADOPT as ceiling | §3.Q4 law |
| a11y: decorative SVG `aria-hidden`, no title/desc (Smashing 2021-05 accessible-svg-patterns; TPGI; Scott O'Hara) | ADOPT — already correct; CompletionSeal's `role="status"` is the ONE sanctioned informative exception | shipped |

---

## §3 · First-principles design — the greenfield loop (four contested questions)

### Q1 — what "perfect" means per brush: the seven-voice physics matrix

**Directions considered:** (a) per-voice bespoke renderers (each brush its own code path — instrument-name
branches, N engines); (b) physical simulation (wax-deposition / pigment-fluid models per voice — maximal
realism); (c) the shipped field-gated continuum, perfected as DATA + a small set of SHARED physical
mechanisms (hull pressure, curvature coupling, taper asymmetry, grain, alpha, blend).

**GOLDEN: (c).** The continuum IS the keystone — "perfect" per voice means the voice's real-world physics
is EXPRESSIBLE and EXPRESSED through the shared mechanisms, as field values. (a) is the anti-pattern the
architecture exists to forbid (`ink.ts` branches on fields, never names); (b) is contrived — a 6-word
underline does not need Navier-Stokes, and every simulation output would be quantized back into the same
five render channels anyway. Per-voice perfection bar (each row is a BRUSHES literal, `brush.ts:108-280`):

| Voice | Physical model | Field signature (shipped) | The perfect bar | Gap at HEAD |
|---|---|---|---|---|
| `pen` | fine nib, wet uniform ink | stroke · w6 · thin 0.15 · grain 0 (FREE — no filter) | pressured-but-quiet; reads pen, never vector-ruler | none |
| `boil` | the living masthead line | hull · w7 · thin 0.55 · taper 14/18 (≈√φ run-out) · natural morphology auto-engaged (`useHandMark.ts:101`) | hump-IRREGULAR (spacing-CV≥0.30), pressured, breathes discrete | aspect distortion (D1) · offscreen park (D6) |
| `pencil` | graphite dragged across paper tooth | stroke · w3 · α0.6 · high-freq grain 0.5/0.42 | DRY + pale; the grain reads as tooth-CATCH; pressure swells the graphite | constant-width (D5: →hull) · tooth congruence (D5) |
| `crayon` | wax stick | hull · w16 · 2-pass waxy buildup · coarse grain 0.85/0.16 | swells + tapers; wax core fattens; dry run-out | none |
| `ring` | red-pencil margin circle | stroke · w5 · α0.55 · 1-pass (E7a whisper, `brush.ts:203-230`) | a SUGGESTION around the datum, never a slab; ROUND | ellipse-stretched by aspect (D1 makes rings round) |
| `marker` | juicy felt tip | hull · w12 · α0.92 · thin 0.1 · cap square | fat near-solid core, frayed-thin ends | none |
| `highlighter` | wide translucent chisel | hull · w26 · α0.38 · multiply · cap square · taper 6/10 | the flagship — §3.Q2 | cap/hull x-smear on wide words (D1) |

**Self-challenge.** Does pencil→hull (D5) erode `proof:handmark` W5's voice-distinctness? No — distinctness
is carried by weight 3 / α 0.6 / the high-frequency grain; the hull adds the pressure axis all real graphite
has (a 2B line swells under press). Does the matrix invite a 13th schema field? No — ZERO schema change;
every delta in this spec is a data-row move or an engine fix. Does grounding each voice in physics overfit?
The falsifier is the paint: each bar is a per-voice gestalt clause in §6, judged on captures.

**Final form:** the matrix above is BINDING acceptance language per voice; the only brush-row edits 14.3
ships are the D5 pencil deepen. The continuum schema, `lerpBrush`, and the other six rows' character are
fenced (the audit A7 class: data rows may move, the machinery may not).

### Q2 — the highlighter band (seat · hull · taper · cap · blend): the flagship

**Directions:** (a) the CSS background-recipe highlighter (max.hn class — gradient + uneven radius on the
text element); (b) the shipped five-delta SVG hull band; (c) a wet-edge refinement on (b) — real markers
pool pigment at the band edges (a duplicated inset path at higher alpha, or a radial alpha profile).

**GOLDEN: (b), held as the flagship — the five deltas ARE the bar** (all LIVE, disk-verified): (α) the
LOW-SEAT — the band centerline seats at `baselineFrac − HIGHLIGHT_RISE` (0.22), riding the x-height→baseline
band a real highlighter covers, never box-middle (`geometry.ts:209-219`, `constants.ts:30`); (β) the HULL —
pf variable-width slab, the real frayed edge (`brush.ts:262`); (γ) non-zero TAPER 6/10 — the lift-on /
dry-run-out expressed as WIDTH, which is strictly stronger than the CSS recipes' background-gradient opacity
ramp; (δ) `cap:'square'` plumbed to the DOM (`ink.ts:196,205` → `HandMark.vue:266` — the chisel tip);
(ε) `multiply` UN-WALLED — no `isolation:isolate` on `.hm`, so the band composites against the PAGE text
behind the word (the exact stacking-context trap the CSS recipes fall into). Direction (a) is the fork's
class — it cannot seat on a measured baseline, cannot taper as width, and occludes rather than multiplies.
Direction (c) is REJECTED as gilding: multiply against real glyphs already produces the edge-darkening read
(ink-on-ink), a wet edge doubles pigment exactly where legibility lives, and the one-color-event proportion
law says the band is already the surface's color event — do not make it louder.

**Self-challenge (the honest hole): dark mode.** Multiply can only DARKEN — over the luminous-dark page a
low-L highlight tint collapses toward black and the band reads dim. This is physics, not a bug; the posture
is guidance, not a blend swap (`screen`/`overlay` read as glow, not ink — SOTA §4): **in dark mode a
highlight must be a HIGH-L tint** (the demo's `#ffd84a` survives; a consumer's dark-navy marker will not).
Presets-in-consumers — the color is the consumer's; the README + demo carry the guidance; the §6 π judges
BOTH modes so a dim dark-mode band on the specimen page is caught.

**Final form:** no highlighter brush-row edit in 14.3. The one perfection delta the flagship receives is
D1 — the isotropic marking space stops the square cap + hull curvature x-SMEAR on wide words (today
`preserveAspectRatio="none"` stretches the chisel tip into a wedge as word aspect grows).

### Q3 — the boil aliveness calibration: alive vs distracting

**Directions:** (a) smooth 60fps rAF morphing of the wobble field; (b) the web-SOTA SMIL
feTurbulence/feDisplacementMap boil; (c) the shipped discrete-frame control-point re-perturb — `boilFrames`
distinct seeded frames cycled at `boilFps` by pencil-boil's interval scheduler.

**GOLDEN: (c), held.** The whole field agrees on ONE parameter: a LOW discrete cadence (~4.4–12fps) reads
hand-drawn; smooth 60fps reads digital-wobble (SOTA §3). The shipped defaults (8fps · 3 frames → a 375ms
full cycle) sit mid-band. (b) is a per-frame filter repaint storm AND engine-divergent — rejected with the
mechanism recorded so nobody re-proposes it. (a) is the digital-wobble failure. The calibration bar that
makes the boil ALIVE rather than DISTRACTING: the per-frame re-perturbation is a VIBRATION of the same line,
never a redraw — frame-to-frame displacement stays a small fraction of the base wobble amplitude, so line
identity persists across the cycle (the eye reads "the ink is alive," not "the mark is unstable"); 3 frames
(not 2) so the cycle never strobes A-B-A-B.

**Self-challenge.** Is anything actually broken here? Yes — one invariant, not the cadence: **the boil has
no element-offscreen park.** The SFC's IntersectionObserver is a one-shot draw TRIGGER (`play()` then
`io.disconnect()`, `HandMark.vue:189-199`); pencil-boil's scheduler parks on `document.hidden` only
(`vue.ts:79-98`). A boiling mark scrolled offscreen keeps ticking — the invariant-8 offscreen-pause
discipline the WebGL substrate holds is NOT held for boil. That is D6. PRM is already inviolable
(`useLineBoil.start()` early-returns; the SFC `@media` snap, `HandMark.vue:337-347`) — keep byte-identical.

**Final form:** cadence untouched (the knobs `boilFps`/`boilFrames` are already public props); D6 wires the
park; the ≤1-boiling-mark-per-surface restraint rides Q4's law. PRM posture: the boil is decorative
continuous motion — static under reduce, no exception, ever.

### Q4 — WHERE the hand voice belongs: the editorial-restraint law

**Directions:** (a) thematic — the hand voice as a body-wide texture (everything wobbles; the Comic-Sans
failure mode); (b) emphasis-only — at most ONE hand-mark event per surface, mirroring the one-color-event
rule; (c) driver-only — masthead + celebration exclusively, nothing else ever.

**GOLDEN: (b) as the LAW, with (c) as the loudness ladder inside it.** The frontier consensus (SOTA §5): the
hand mark earns its place as emphasis, marginalia, correction, wayfinding, celebration — a single deliberate
mark. It becomes kitsch as default texture. So: **≤1 hand-mark EVENT per product surface** (the specimen/
demo page is the sanctioned exception — a specimen sheet's job is many marks). Within the law, loudness is
tiered: a STATIC calm mark (pen/pencil underline, the ring whisper) may serve any surface's single emphasis
event; the ANIMATED voices (`boil`, `draw-on`, `draw-then-boil`) are reserved for masthead/driver moments
where attention is already earned. **A tinted mark IS a color event** — a highlighted phrase counts against
the surface's one-color-event ledger (`proof:suffuse` d3 counts the event FAMILY): a highlight + a saturated
IconChip on the same surface is two events, a proportion FAIL.

**The three-register fence, held BOTH ways:** (→) `.paper-ink-mark` never wobbles, never grains — no
amplitude/roughness knob this spec mints may leak onto it (`proof:handmark` W6, `proof-handmark.mjs:236-252`,
extended to scan the new knobs); (←) HandMark never renders a straight structural rule — `amplitude: 0` is
NOT a sanctioned path to a hairline (a consumer wanting a straight underline uses `.paper-ink-mark`; the D3
knob floors above zero, see §4.D3); (3rd) the deck-local red-pen glyphs stay consumer CSS.

**Self-challenge.** Is the law enforceable, or prose? It is acceptance LANGUAGE, not a new gate (the
overhead floor — sub-threshold checks are clauses, not rows): the ≤1-event ceiling lands in §6 and in the
F8.6 aristotelian 3-axis verdict for the handmark roster surfaces; the machine-checkable halves (the fence
scan, the knob floor) land as `proof:paper` arm clauses. Does (c)-inside-(b) contradict the shipped demo?
No — the demo is the specimen exception, stated explicitly so the census never flags it.

---

## §4 · Wave binding — `14.3 BG.W-HANDMARK-PERFECT` (absorbs 14.4), perfected

**Row (frozen):** `EXECUTION-PROGRESS.md:82` — F4 · `proof:paper` · handmark + handmark-audit + boil-park
arm · DesignSync "hand-voice / paper marks" · precond — (independent). The build-map deltas
(`bg-build-map.md:1193-1199`): aspect-correct viewBox · hull se-guard · amplitude knob · draw-easing token ·
mint `proof:handmark-audit` · the 14.4 clause (graphite-in-tooth + pencil pressure + boil offscreen-park).
This section SHARPENS each; scope/preconds untouched.

### D1 — the isotropic marking space (the aspect fix; the wave's headline)

**The defect:** `VB_W=100 × VB_H=40` (aspect 2.5, `constants.ts:9-11`) + `preserveAspectRatio="none"`
(`HandMark.vue:240-241`) maps the marking space onto a word box of ANY aspect (~1.5:1 chip → 8:1 phrase):
x stretches while y compresses — wobble humps smear, the highlighter's square cap wedges, `ring` ellipses.
`vector-effect:non-scaling-stroke` saves stroked BAND widths only, never path geometry or hulls.

**Mechanism mini-loop:** (a) viewBox := the measured px box wholesale — REJECT: every weight/amplitude
becomes word-LENGTH-proportional (a longer word gets a taller highlight band; band height must track FONT
size); (b) stretch-invariant amplitude only (divide y-amp by the aspect ratio) — REJECT: a band-aid that
fixes hump height but leaves hulls, caps, and rings anisotropic; (c) **GOLDEN — anchor on VB_H, derive from
the RENDERED SVG box:** keep `VB_H = 40`; derive `VB_W = VB_H · (svg_w / svg_h)` where `svg_w × svg_h` is
the **rendered `.hm__svg` box**, NOT the `.hm` word box. The two differ by the per-shape CSS overscan
(`HandMark.vue:287-308`): the underline family renders at `104% × 100%` of `.hm` (a 4% x-residual a
`.hm`-box derivation would leave), but **circle/box/bracket render at `124% × 144%`** — a `.hm`-box
derivation leaves an x/y scale ratio of `1.24/1.44 = 0.861`, a 14% x-compression that keeps the ring
elliptical (exactly the shape A3 gates). Deriving from the rendered box folds the overscan in by
construction; the per-shape overscan pairs are static CSS percentages, so `svg_w/svg_h` computes as
`(box_w·sx)/(box_h·sy)` from the SAME `.hm` measure tick — no second observer, and the shipped per-shape
hand character (the circle's wider bleed) is preserved untouched. `preserveAspectRatio="none"` stays but
becomes an EXACT identity-aspect map — ONE uniform scale `svg_h / VB_H` on both axes, for every shape.
Every y-anchored constant (`UNDERLINE_GAP`, `HIGHLIGHT_RISE`, brush weights ∝ VB_H) keeps its painted size
BYTE-NEAR-IDENTICAL (band heights stay font-proportional, exactly as shipped); x-geometry becomes physically
true — round rings, un-smeared chisel caps, isotropic wobble.

**Positioned mode (the self-reference dissolved).** The `box` prop's coords live TODAY in the fixed
`0..100 × 0..40` marking space (`geometry.ts:180-186`) — deriving `VB_W` from the box aspect would be
circular (coords expressed in the space being derived). Resolution: positioned mode derives `VB_W` from the
SAME rendered `.hm__svg` box as text mode (aspect comes from the DOM host, never from the `box` coords), and
the `box` prop RE-ANCHORS as **host-box fractions** — `{x, y, w, h} ∈ 0..1` of the host, mapped at layout
(`x·VB_W`, `y·VB_H`) — a clean break, no `100×40`-coordinate alias (the demo's positioned specimens
re-express in-wave; MIGRATION row for any external consumer).

**The morphology re-anchor (the load-bearing consequence).** `naturalUnderlinePoints` currently samples
noise over normalized span-t (`freq = NOISE_F0·φ^k` humps per SPAN) and scales amplitude by span
(`amp = span·NOISE_AMP_FRAC`) — correct in the old fixed-span space, wrong in the new variable-width one
(humps would stretch with word length; amplitude would grow unbounded on banners). Re-anchor BOTH on VB_H
(≈ the font's box height — the physical unit a hand works in):

- **Wavelength font-anchored:** sample at `u = (x − x1)/VB_H`; base frequency = humps per VB_H. At the
  legacy reference aspect the shipped morphology reproduces (legacy: 2.5 humps over a ~92-unit span ⇒
  wavelength ≈ 0.92·VB_H); a wider word gets MORE humps of the SAME physical size — what a real hand does —
  never stretched humps. Mint `NOISE_LAMBDA ≈ 0.92` (hump wavelength as a VB_H fraction); octaves still step
  `φ^k` (the incommensurability is untouched). **`NOISE_F0` (base frequency in humps-per-SPAN) is DELETED —
  superseded by the `NOISE_LAMBDA` wavelength derivation; clean break, no alias** (the existing
  `proof:handmark` W4 hard-asserts `/NOISE_F0/` — D7 updates it in the same wave, see below).
- **Amplitude font-anchored:** `amp = NOISE_AMP_FRAC_H · VB_H` with `NOISE_AMP_FRAC_H ≈ 0.115` (the exact
  shipped paint at the reference aspect: `92 × 0.05 = 4.6vb = 0.115·VB_H`) — aspect-STABLE by definition.
  `NOISE_AMP_FRAC` (span-relative) is DELETED — clean break, no alias.
- **Sampling density constant:** `segments` for the natural path derive as `max(6, ceil(span_vb/VB_H ·
  SEGMENTS_PER_UNIT))` (≈6/unit reproduces the shipped density) so wide words don't under-sample humps.
- **Determinism note (execution-binding):** the lazy value-noise lattice fills in monotone-x order
  (`geometry.ts:113-131`) — the field is a pure function of `(seed, sample set)`. The re-anchor changes the
  sample set per box, so determinism is per `(seed, box)` — the gate's byte-equal assert (D7.A2) pins
  exactly that pair, and the boil's frame-seeding is unaffected (frames vary seed, not box).
- **Pre-measure fallback:** until the first measure lands, the legacy `100×40` space paints (the
  `baselineFrac`-null pattern, `geometry.ts:186-190`); the measured re-render lands on the same
  ResizeObserver tick as the baseline. POSITIONED mode (`box` prop) has an explicit rect — aspect known at
  first paint.

**π:** vb-aspect ≈ the px-aspect of the RENDERED `.hm__svg` box on every mark (per-shape overscan folded — a
`.hm`-box compare would false-green the elliptical ring); across a 3-width specimen strip (narrow word /
normal / wide phrase, equal font size) the painted hump wavelength is CONSTANT within tolerance; `ring`
paints round (`rx ≈ ry` measured on the PAINTED ellipse, never marking-space coords — trivially round there,
proving nothing). Files: `constants.ts`, `geometry.ts`, `HandMark.vue`.

### D2 — the hull self-intersection guard

`ink.ts:184-198` calls `getStroke` unconditionally. The guard (in the hull arm, shared by all hull brushes):
(i) dedupe consecutive coincident centerline points (pf's known artifact source); (ii) precondition ≥3
distinct points AND positive span — else render the `ribbon:'stroke'` FALLBACK (never throw, never emit a
garbage polygon); (iii) clamp the effective hull weight to `HULL_MAX_WEIGHT_FRAC · centerline-length` (a
hull wider than its own length self-intersects — the 1-character-highlight case); (iv) NaN/empty-outline
check → stroke fallback. Constants colocate in `constants.ts`. Gate bite: degenerate inputs (2 coincident
points; a 2px-span w26 highlight) take the guard path and emit a parseable finite `d` (D7.A4).

### D3 — the amplitude knob (token-first)

Mint the tunable that `NOISE_AMP_FRAC_H` hardcodes: **`amplitude?: number` prop** (default 1, a multiplier
on the natural-morphology displacement) + **`--handmark-amplitude`** custom-property read once per measure
(`getComputedStyle` on the `.hm` root — zero extra layout pass, it rides the measure rAF; prop wins over
token; token default 1). Scope: the natural underline morphology ONLY (per-brush `roughness`/`wobble`
already have props). **Threading (explicit):** the morphology is computed reactively in `useHandMark`, not
the SFC measure — the resolved multiplier threads through `normalizeProps` the way `baselineFrac` does
(`useHandMark.ts:83-105`), and `naturalUnderlinePoints` gains an amplitude parameter (an ARITY change —
D7's audit gate calls the NEW signature; the A2 determinism pin extends to `(seed, box, amplitude)`).
**Floor:** the resolved multiplier clamps to `≥ 0.25` — `amplitude:0` is NOT a path to
a straight rule (§3.Q4 fence, gate-asserted); a consumer wanting straight uses `.paper-ink-mark`.
Presets-in-consumers: a consumer's louder marginalia register is a `:root { --handmark-amplitude: 1.4 }` in
THEIR repo. Files: `types.ts`, `useHandMark.ts`, `HandMark.vue`, `geometry.ts`.

### D4 — the draw-easing token

`drawTransition` hardcodes `cubic-bezier(.16,1,.3,1)` inline (`HandMark.vue:84-89`) — this IS the house
`--ease-out-expo` (`scheme-spring.css:215,220`) as a stranded literal. Mint **`--handmark-draw-ease:
var(--ease-out-expo)`** (one row in `src/styles/tokens/scheme-spring.css`, beside the §6 easing table its
source resolves in — EFFECTS-tagged) and emit the inline style as
`var(--handmark-draw-ease, cubic-bezier(0.16, 1, 0.3, 1))` (the literal is the no-stylesheet floor — the
mark never breaks bare). **motion-canon P1 check:** draw-on animates `stroke-dashoffset`/`clip-path` — an
EFFECTS channel ⇒ bezier is CORRECT, a spring would be a canon violation; the gate asserts the token
resolves an `--ease-*`, never a `--spring-*` (D7.A6). One-edit retune library-wide.

### D5 — the pencil deepen (14.4 clause a: graphite-in-tooth + pressure profile)

Two data-row moves on `pencil` (`brush.ts:159-177`), zero schema change: (i) **pressure** — `ribbon:
'stroke' → 'hull'` with GENTLE `thinning ≈ 0.2` (graphite swells less than wax; weight 3 / α 0.6 / dry
taper 8/18 keep the dry-line character; the curvature-coupled `addPressure` is inherited free — graphite
darkens-and-widens on the straights); (ii) **graphite-in-tooth** — re-tune the grain triple
(`grain`/`grainFreq`/`grainScale`) so the tooth-catch PITCH at 1× matches the 14.1 raster paper tooth's
pitch band (the KS-PAPER §4.3 congruence contract: a graphite mark pressed into the tooth is the deboss read
in hand-voice; ONE seed leaf across paper + HandMark). The pencil grain stays the brush-local static seeded
`feTurbulence` (isotropic — no azimuth channel to couple; PITCH is the congruence axis). **Cross-lane
divergence, explicit (the two binding specs currently disagree):** KS-PAPER §4.3.3 (`KS-PAPER.md:460-462`)
words this same seam as "*the shared azimuth is the congruence*" — the paper tooth DOES carry a real
directional deboss (azimuth 290.56°). This spec DIVERGES deliberately: an isotropic brush-local
`feTurbulence` has no azimuth to couple, so **PITCH (+ the shared seed leaf) is the operative congruence
axis for 14.3**; the deboss azimuth stays a PAPER-side property. KS-HANDMARK owns the wave, so this axis
governs — **flagged to the orchestrator: amend KS-PAPER §4.3.3's wording** ("the shared tooth pitch + seed
leaf are the congruence; the deboss azimuth is paper's own") so an executor reading both specs gets ONE
answer. Final numbers are capture-decided (Fable arm). Voice-distinctness (`proof:handmark` W5) held per §3.Q1. NOT blocked on 14.1
(pitch calibrates against the landed tile if present, else the shipped `--paper-*` period; row precond
stays "—").

### D6 — the boil offscreen-park (14.4 clause b; the invariant-8 close)

Replace the one-shot draw IO with **ONE persistent IntersectionObserver** (rootMargin `200px`, the substrate
precedent) serving both concerns: fires `play()` once on first intersection (the existing `appear:
"visible"` contract, byte-equal behavior); toggles `boil.stop()`/`boil.start()` on every visibility
transition for a boiling mark. **Construction condition (the binding widen):** the IO is created whenever
**`boils || appear === 'visible'`** — NOT only inside the `appear === 'visible'` branch it lives in today
(`HandMark.vue:189-199`). A `<HandMark animation="boil" appear="mount">` (the §3.Q4 masthead driver case)
and the demo's own `appear="manual"` specimen (`handmark.vue:72`) currently arm + tick with NO observer at
all — the invariant-8 close must reach them, or it closes only the visible-appear path. A NON-boiling
`mount`/`manual` mark constructs NO observer (the zero-cost floor held); the jsdom/SSR no-IO env keeps
today's degrade (play immediately; `document.hidden` park stays upstream). Disconnect when neither concern
remains (`drawn && !boils`). pencil-boil's
`document.hidden` park (`vue.ts:79-98`) + PRM early-return + the `NOOP_BOIL` stub are UPSTREAM and
byte-untouched — the park composes the existing public `start/stop` API; **no pencil-boil edit** (§4.P
posture). π: an offscreen boiling mark ticks zero frames (two captures 400ms apart, scrolled out —
byte-identical); scrolled back in, it breathes again. Files: `HandMark.vue` only.

### D7 — the gates: `proof:paper` family arms (no new top-level gate name)

Per the row + F8 `W-GATE-FAMILY-CONSOLIDATE` (net-negative gate-count law), everything lands as arms of the
ONE `proof:paper` family:

- **`handmark` arm** — the existing `proof:handmark` W1–W6 (`scripts/proof-handmark.mjs`) EXTENDED in place:
  +W7 hull-guard (source: the guard exists in the hull arm; bite: degenerate input → guarded finite `d`);
  W6 fence scan WIDENED to the new knobs (no `--handmark-amplitude`/wobble reaches `.paper-ink-mark`).
  **W4 constant-presence UPDATED in the same wave (the D1 rename/delete would otherwise green→red it):**
  `proof-handmark.mjs:198-205` hard-asserts `/NOISE_F0/` — deleted by D1, so the regex re-points to
  `/NOISE_LAMBDA/`; `/NOISE_AMP_FRAC/` currently survives the `NOISE_AMP_FRAC_H` rename by SUBSTRING LUCK —
  re-pin it exact (`/NOISE_AMP_FRAC_H\b/`) so a future regex cleanup cannot silently RED it; the stale
  narrative comment (`:192-197`, still telling the humps-per-span story) rewrites to the VB_H-anchored
  story. Clean-break hygiene: the gate and the code move in ONE diff.
- **`handmark-audit` arm** — NEW `scripts/proof-handmark-audit.mjs`, a MEASURING gate (W-GATE-TRUTH: never a
  symbol-presence regex). It imports the REAL exported `naturalUnderlinePoints` (`index.ts:42` exports it
  for exactly this) and MEASURES:
  - **A1 (the discriminator):** inter-extremum spacing-CV ≥ **0.30** over ≥3 seeds at paint segment count.
    **Lineage (binding correction):** the BD GOLDEN keyed autocorrelation (`GOLDEN.md §8 A1`); the shipped
    400-seed spike proved autocorr CANNOT separate smooth low-frequency value-noise from a sinusoid at any
    resolution (`constants.ts:44-56`) — spacing-CV separates cleanly (~0.41 vs the sinusoid's ~0.14). This
    spec pins spacing-CV as the discriminator; the autocorr arm is dead, do not resurrect it.
  - **A2 (determinism + seed reconcile):** same `(seed, box)` byte-equal; distinct seeds distinct; house
    `mulberry32` only (a `Math.random()` or pencil-boil-`mulberry32` plant REDs).
  - **A3 (aspect):** construct two boxes (2:1 and 6:1); assert `vb-aspect ==` the RENDERED `.hm__svg` box
    aspect (the per-shape overscan folded — asserting against the `.hm` box would green a still-elliptical
    circle/box/bracket), painted hump wavelength equal within tolerance, `ring` rx≈ry **on the painted
    ellipse** (marking-space rx≈ry is trivially round — the named evasion). Born-RED on the HEAD fixed
    `100×40`.
  - **A4 (hull guard):** the D2 degenerate-input bites.
  - **A5 (boil-park wiring):** the persistent IO gates `boil.stop()`/`start()` (source-level; the live
    tick-freeze is the π's).
  - **A6 (draw-ease canon):** `--handmark-draw-ease` resolves an `--ease-*` bezier, never a `--spring-*`;
    the SFC reads the token with the literal floor; the D3 amplitude floor ≥0.25 holds.
  - **Self-test bites per clause:** a synthetic sinusoid → A1 RED; `Math.random` → A2 RED; the legacy fixed
    VB → A3 RED; an unguarded degenerate hull → A4 RED.
- **`boil-park` arm** — the row names it distinctly; implementation freedom to home it as audit clause A5 +
  the π arm (recorded so the row's three-arm language maps 1:1).

### D8 — the demo π-hosting deltas (`demo/stories/motion/handmark.vue`)

The audit + π need measuring surfaces the demo lacks (`handmark.vue` shows underline/highlight/circle +
draw-on only): add the missing-shapes row (`strikethrough`/`box`/`bracket`/`path`), a LIVE `boil` +
`draw-then-boil` specimen (the park + cadence π target), and the **3-width aspect strip** (narrow/normal/
wide at equal font size — D1's measuring surface), over the visible warm paper field. The specimen page is
the sanctioned many-marks exception (§3.Q4); product surfaces stay under the ≤1-event law.

### Fable arm + DesignSync surface (per `W-FABLE-DESIGN-ARM`)

**Fable arm:** holds final-number authority against captures for every capture-decided constant
(`NOISE_LAMBDA`/`NOISE_AMP_FRAC_H` at off-reference aspects; `HULL_MAX_WEIGHT_FRAC`; the D5 pencil
thinning + grain triple; the amplitude-floor 0.25). **DesignSync surface** (the row's "hand-voice / paper
marks"): ONE annotated canvas — the seven-voice specimen strip + the highlighter over real body text (the
multiply visibly darkening the page behind the word) + the boil at three widths — both modes, both engines.
The verdict question: **"do the marks read HAND-made at a glance — and does the same mark keep its character
at every word width?"**

### Paint close — BOTH engines (the SVG rendering diffs, named)

The per-wave paint verify is dual-engine (Chrome + REAL Safari), both modes, per the protected close
discipline. SVG is where engines drift; judge each engine on its OWN paint:

- **`feTurbulence`** — the algorithm is spec-pinned but filter-region rounding + dithering differ per
  engine; `color-interpolation-filters="sRGB"` is already pinned (`texture.ts`). The π asserts the grain
  STATISTIC per engine (pitch band, alpha band), NEVER a cross-engine byte-diff.
- **`mix-blend-mode` on SVG** — multiply reaches the page only with no intervening stacking context. The
  un-walled `.hm` is the guard; a consumer placing a highlight inside a `filter`/`transform`ed ancestor
  walls the blend on BOTH engines per spec — README guidance, not a bug. The π hosts the flagship on a
  plain-flow paragraph and asserts the page behind the band is DARKER than beside it, both engines.
- **`stroke-dashoffset` + `pathLength="1"`** and **`clip-path` transitions** — supported both engines; the
  grained-draw clip-wipe (never dashoffset under a filter — the Δ4 rule) is the Safari-safe path already.
- **`vector-effect: non-scaling-stroke`** — both engines; D1 REDUCES the divergence surface overall
  (non-uniform SVG scaling is where engines drift most; the isotropic space removes it).

The binding artifact: fresh dual-engine both-modes captures by a NON-AUTHORING agent, judged by §6; literal
PASS recorded on the row (the C-PAINT discipline; device-free arms are necessary, never sufficient).

### The pencil-boil peer posture (foreign-tree fence — by-name ask ONLY)

**The boundary law:** geometry primitives (`wobbleLinePoints`/`ellipsePoints`/`perturbPoints`/
`catmullRomToBezier`) + the boil clock (`useLineBoil`) = **pencil-boil's**; morphology + Brush + render +
measure = **glass-ui's**; the seed = the **house** prng (glass-ui FEEDS pencil-boil a derived int; imports
ZERO `mulberry32` from it — gate W4). 14.3 requires **NO pencil-boil edit** — D6 composes the existing
public `start/stop`. Recorded to the F8 asks ledger (`W-PAPER-CROSSREPO-ASKS`, which owns the channel):
(1) OPTIONAL upstream ask — an element-offscreen park seam inside `useLineBoil` so every consumer inherits
it; glass-ui's D6 IO gate is the interim, deleted on consume (the consume-and-delete cadence); (2) the dead
`perfect-freehand ^1.2.3` peer drop (`package.json:1085,1107` — vendored in `freehand.ts`) rides F8, out of
this lane. Never a local fork of pencil-boil internals; never a sibling edit from here.

---

## §5 · Precepts conformance (explicit checks)

- **design-idioms** — the three-underline fence held both ways (§3.Q4; W6 widened); the seed-leaf
  single-source held (house `mulberry32`); colocation shape untouched (constants in `constants.ts`,
  composable under `composables/`, README updated with the dark-mode highlight + stacking-context guidance).
- **motion-canon P1–P7** — draw-on is EFFECTS ⇒ bezier token (D4, gate-asserted); the boil is a living-line
  register outside the spring/bezier axis, discrete-cadence, PRM-static (P6: the drawn mark's terminal state
  survives reduce; no transform channel animates anywhere in the family); compositor posture: dashoffset/
  clip-path draws, static filters, cheap `d` re-serialization at ≤8fps — no per-frame filter raster, no
  layout channel (`proof:no-layout-animation` unaffected).
- **Compositor-only + PRM + invariant-8** — D6 closes the one open offscreen-pause hole; PRM byte-identical.
- **Token-first / presets-in-consumers** — `--handmark-draw-ease` + `--handmark-amplitude` are `:root`
  retunes; consumer voices (colors, louder amplitude) live in consumers; the seven BRUSHES literals are the
  library's own identity evolving at home.
- **Clean breaks, no legacy** — `NOISE_AMP_FRAC` → `NOISE_AMP_FRAC_H` with NO alias; the one-shot IO is
  replaced, not dual-pathed; no back-compat shim anywhere (DEC-8 precedent).
- **≥2-consumer** — HandMark: the demo story + the slides/atlas masthead (`InkMark` consumer); the new knobs
  ship ON the existing ≥2-consumer primitive (no new orphan primitive is minted; the guard/space/knobs are
  engine-internal).
- **Warm identity / no-gray** — marks default `currentColor`; grain is color-agnostic; the demo field rides
  the 14.1/LX.2 warm substrate; the dark-mode highlight guidance keeps the band legible on the luminous-dark
  page.
- **Overhead floor / gates-as-family-arms** — zero new top-level gate names; two scripts as `proof:paper`
  arms; the restraint law is acceptance language + F8.6 verdict axes, not a gate row.
- **Protected set (SYNTHESIS-PASS1 §4)** — no identity value moves; no spring/dock/glass machinery touched;
  the φ constants GAIN a member (`NOISE_LAMBDA`) in the handmark home — the sanctioned in-home evolution;
  foreign-tree fence absolute (§4.P).
- **Wave-set frozen** — everything above fits the 14.3 row's own deltas; residue → fold-candidates below.

---

## §6 · The gestalt bar (the acceptance language)

**"Hand-MADE at a glance; the same hand at every width; a whisper of a human, never a theme."**

Fresh dual-engine (Chrome + real Safari), both-modes captures over the D8 specimen surfaces, judged:

1. **Hand-made at a glance** (the Excalidraw-#7239 bar): every voice reads as its instrument — pen pressured
   -but-quiet, pencil DRY with graphite catching tooth, crayon waxy and swelling, marker juicy with a chisel
   tip, ring a red-pencil suggestion, boil a living pressured line. Never sub-perceptual, never a vector
   ruler, never a spell-check squiggle (spacing-CV ≥ 0.30 is the machine floor; the eye is the verdict).
2. **The same hand at every width** (D1): across the 3-width strip the hump wavelength, band height, cap
   shape, and ring roundness are CONSTANT — a wide phrase gets more humps, never stretched ones.
3. **The flagship multiplies** (Q2): the highlighter visibly darkens the page THROUGH the band, both modes
   (the dark-mode high-L tint reads); the chisel cap is square, the ends run out as width.
4. **Alive, not distracting** (Q3): the boil breathes hump-irregular at the discrete cadence — line identity
   persists across frames; offscreen it is STILL (zero frames); under PRM every mark is a single static
   paint.
5. **Restraint** (Q4): on every product surface, at most ONE hand-mark event; animated voices only where the
   moment is earned; the structural hairline nearby stays perfectly straight — the two registers legible as
   DIFFERENT materials in one frame.
6. **√φ proportion + warm identity:** taper run-outs keep the ≈√φ asymmetry; marks ink warm (`currentColor`
   /accents), never gray; the specimen page reads as ink ON PAPER (the 14.1 field through the marks).

The verdict is filed by the Fable design arm against the DesignSync canvas; the user's eye is the final
falsifier; `proof:ba-gestalt`-class paper-band verdict is the binding paint at the reflection close.

---

## Fold-candidates (orchestrator notes — never self-inserted)

1. **BD GOLDEN Move-3 residue — the opt-in `weight` cartoon draw-on** (anticipation + nib-bead + cel-cast,
   `GOLDEN.md §2 Move 3`): its Band-0 token dependencies (`--ease-cartoon-punch`, `--motion-weight`) now
   SHIP (`segmented-tabs.css:154,276` consume them) — the dependency edge is satisfied, but no BG row owns
   the HandMark weight prop. Candidate for an F5 motion-family fold.
2. **BD GOLDEN Move-4/5 residue — the ℱ-redraw SVG re-skin + seal union**: `demo/eggs/FRedrawOverlay.vue` is
   still the cold Canvas2D line at HEAD; no BG row owns the `<HandMark shape="path">` re-skin. Candidate for
   an F7 demo-family fold (the showpiece that proves "one ink engine").
3. **The dead `perfect-freehand` peer drop** (`package.json:1085,1107`) — confirm the F8
   `W-PAPER-CROSSREPO-ASKS` row explicitly carries it (the build-map names it at `bg-build-map.md:1200-1204`).
4. **Full 7-shapes × 4-animations demo matrix as a DESIGNED specimen** beyond D8's π-hosting minimum — an F7
   demo-design concern if wanted.
5. **Wet-edge highlighter refinement — REJECTED here** (§3.Q2: gilding; multiply is the realism carrier).
   Recorded so it is not re-proposed without a capture-grounded case.

## Open questions (P1 / Fable design arm)

1. Final `NOISE_LAMBDA`/`NOISE_AMP_FRAC_H` at off-reference aspects (the 3-width strip decides; reference-
   aspect byte-parity is the anchor).
2. The D5 pencil numbers (hull `thinning ≈ 0.2`; the grain triple vs the 14.1 tooth pitch band) —
   capture-decided; W5 voice-distinctness held.
3. `HULL_MAX_WEIGHT_FRAC` + the exact degenerate-fallback rendering (stroke fallback vs skip) on the
   1-character highlight.
4. The amplitude-floor value (0.25 proposed) — low enough for a whisper register, high enough that the fence
   (§3.Q4 ←) is real.
5. Per-engine grain-statistic tolerance bands for the Safari π arm (feTurbulence drift).

---

## REVISION — 2026-07-01, post-critique (HANDMARK-crit.md applied)

Surgical revision against the adversarial critique (verdict 87/100; all four must-fixes + the F5 nits
applied; scope/preconds/protected-set untouched):

- **F1 (major) → D1 respecified:** `VB_W` derives from the **rendered `.hm__svg` box**, not the `.hm` word
  box — the per-shape CSS overscan (`HandMark.vue:287-308`; circle/box/bracket `124%×144%`) is folded into
  the derivation, so the isotropic guarantee now reaches the ring the A3 gate tests (the `.hm`-box form left
  a 14% x-compression). The "ONE uniform scale `box_h/40`" overclaim corrected to the exact `svg_h/VB_H`.
  Positioned mode named: `VB_W` from the same rendered box; the `box` prop re-anchors as host-box fractions
  (0..1) — the self-referential marking-space-coords derivation dissolved, clean break. D1's π + D7.A3 now
  measure the rendered box + the PAINTED ellipse (the marking-space-rx≈ry evasion named and barred).
- **F2 → NOISE_F0's fate stated:** DELETED, superseded by `NOISE_LAMBDA` (clean break, no alias); D7's
  `handmark` arm now updates `proof-handmark.mjs:198-205` W4 in the same diff (`/NOISE_F0/`→`/NOISE_LAMBDA/`,
  `/NOISE_AMP_FRAC/` re-pinned exact against the substring-luck rename, the stale `:192-197` comment
  rewritten).
- **F3 → D6 construction condition widened:** the persistent IO is created whenever
  `boils || appear === 'visible'` — mount/manual boiling marks (the demo's `appear="manual"` specimen,
  the masthead boil-on-mount) now park too; a non-boiling mount/manual mark constructs no observer.
- **F4 → the azimuth↔pitch congruence divergence flagged in D5:** isotropic brush-local `feTurbulence` has
  no azimuth to couple, so PITCH + the seed leaf are 14.3's congruence axis; KS-PAPER §4.3.3's "shared
  azimuth" wording flagged to the orchestrator for amendment so the two binding specs agree.
- **F5 nits:** D4's token home named (`src/styles/tokens/scheme-spring.css`); D3's `normalizeProps` thread +
  the `naturalUnderlinePoints` arity change stated (A2 determinism pin extends to `(seed, box, amplitude)`).

The greenfield loop (§3), the frozen row binding, the fold-candidates, and the fence posture are unchanged.
