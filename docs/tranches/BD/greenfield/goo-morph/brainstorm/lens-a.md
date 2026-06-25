# GOO-MORPH greenfield — LENS A (pure iOS-27 fidelity)

> Lens: the most faithful, audacious iOS-27 Liquid-Glass interpretation of the
> blob↔meatball merge — match or BETTER the Gemini-carousel / Apple Maps-card
> references. North star: design.md §L7 (cross-engine goo floor), §3 (colorful
> field + defined edge), the IOS27-REFERENCE T13 carousel + the metaball precept.
> DEFT union with the extant `useGooMorph` + `#glass-goo` + the landed dark-fix —
> no re-fork, KISS, no legacy.

---

## 0. THE DIAGNOSIS — why the current goo reads "AWFUL" (live-verified)

Live-inspected `/navigation/carousel` (Chromium, light) with a real Next-click +
a frozen-peak capture. The mechanism numbers all "pass" — the **gestalt fails**,
exactly the way JUDGE-2 named it. Three root causes, in priority order:

### R1 — THE WORM HAS NO WAIST (the architectural defect — the #1 fail)
A real metaball neck is a **concave-sided bridge that emerges from the GAP
between two SEPARATE circular masses**: as two discs approach, their blurred
alpha fields overlap and the threshold carves an *hourglass* — the sides pull
IN at the midpoint (the waist), the bridge thins, then snaps. The current
carousel ships **one wide worm-PLATE** (`inline-size: slide-width`,
`border-radius: --radius-card`) that merely `scaleX`-stretches. A single
constant-cross-section rectangle, blurred + thresholded, yields **a fatter
rounded rectangle** — never an hourglass. The frozen-peak capture is decisive:
the worm reads as **a warm tray with one scalloped edge and a flat-bottomed
bump**, the literal "warm tray with wavy edges" JUDGE-2 flagged. The static
plates are *also* full-slide-width, so when the worm overlaps a plate they fuse
into a SLAB, not a neck. **There is no geometry in the system that can produce a
waist.** Raising `--max-stretch` or steepening the threshold (the fix2 lever)
makes the slab fatter/crisper — it cannot conjure a waist that the geometry
never had. This is the gestalt root cause and it is a SHAPE problem, not a token
problem.

### R2 — THE MORPH IS VISUALLY DONE IN ~370ms BUT THE BRIDGE LINGERS ~1070ms
Frame-series (real click): lenRatio peaks **2.19 @141ms**, back to ~1.0 by
**~516ms** — the whole stretch+contract is over in ~370ms. Yet `[data-traveling]`
+ opacity 0.55 hold until ~1070ms (`--carousel-goo-duration: 0.95s` + 120ms).
So for ~550ms the user stares at a **static fat warm slab that is no longer
moving**. THIS is "far too SLOW": not the travel (it's snappy to a fault) but
the **dead dwell of a non-moving bridge**. The `--carousel-goo-flow` curve
front-loads (reaches 0.5 by ~46% but the visible bulge is gone by ~50%) — the
"dwell at the midpoint" the token comment claims does NOT hold the *neck* open;
it holds a *settled plate* open. Weight ≠ a long static hold; weight = a slower,
fuller, **continuously-deforming** arc.

### R3 — THE MERGE IS UNDER-DRAMATIC + NOT GOOEY (the "does not goo morph")
Even granting the slab, the threshold (slope 24 / offset −11, blur 10) is tuned
so aggressively that the alpha bleed is *immediately* re-sharpened — there is no
window where you SEE two fields fusing. Combined with R1 (no waist) the result
reads as a solid plate sliding under a lens, the exact thing §L7 forbids ("two
shapes sliding, not merging").

### R0 — A LATENT BUG (loop-clone plate duplication)
`plateOps` live-read returned `["0.42","1","0","0","0","0.42","1",...]` — TWO
`0.42` actives + TWO neighbour `1`s for a 5-snap carousel rendering 12 plates.
The `plateIndices` is keyed off `slideNodes().length` which **includes embla
loop clones**, so duplicate plates paint at cloned centers. Harmless today
(off-screen, opacity 0) but it muddies the two-mass model and must be keyed off
the *snap* count, deduped, in the rebuild.

### What is FIT (survives — do NOT re-invent)
- `#glass-goo` / `GlassGooFilter` / `DockGooFilter` Safari-correctness facts:
  static literals, `sRGB`, `−50%/200%` region, 1×1 host, regular `filter:url()`
  not `backdrop-filter` — **structurally perfect**, keep verbatim (§4 verified).
- `useGooMorph` as the ONE de-duped engine (pager + carousel + deck), the
  `--goo-t` Houdini-property + flow-curve + rAF-projection drive, PRM snap, the
  `useLiquidFlex` reciprocal squish — the DRIVE is fit; the **silhouette
  geometry it projects is what's broken**.
- The landed dark-fix (`.dark .carousel-goo-layer` warm L0.68 lift +
  saturate/brightness transmissive companion + travel-gate) — keep, it's the
  warm-glass floor, BOTH modes.
- The fission-bridge already KNOWS the answer: it ships a **dedicated narrow
  neck filament** (`--neck-filament: 42%` inset, `clip-path` hourglass, thins to
  a tense thread, snaps with recoil). The carousel/deck simply never adopted it.

---

## 1. THE CORE IDEA — TWO BODIES + A WELLING NECK (the metaball as three elements, not one plate)

Stop morphing ONE plate. A metaball merge is, definitionally, **two round
bodies and the bridge between them**. So the goo layer hosts, per transition,
exactly this triad inside the ONE `#glass-goo` filter:

```
   ●────────●          ●─────●         ●  ╲___╱  ●        ●        ●
  body      body      body neck body   body waist body   bodyA   bodyB
  (rest)               (welling)        (PINCH/snap)      (settled)
   t=0                   t≈.3            t≈.5              t=1
```

1. **`bodyA`** — a round mass (a circle/superellipse, `border-radius: 50%`-ish)
   parked at the OUTGOING slide center. Diameter ≈ the worm girth, NOT the full
   slide width — a *blob*, not a plate.
2. **`bodyB`** — the same round mass parked at the INCOMING slide center.
3. **`neck`** — a SEPARATE thin element spanning A→B whose **cross-axis girth is
   driven by `--goo-t`**: it WELLS up from ~0 at the body edges, peaks at a
   modest mid-girth, and its sides are concave (a `clip-path` hourglass, the
   fission `--neck-filament` idiom). As `--goo-t` advances, bodyA travels toward
   bodyB while the neck stretches between them; the blurred alpha of (bodyA +
   neck + bodyB) fuses through `#glass-goo` into ONE silhouette **with a real
   waist** where the neck is thinnest. Past the midpoint the neck girth recedes,
   the bodies coalesce, the threshold PINCHES the waist off — the snap.

This is the *exact* topology of the freefrontend/animationpatterns SVG-metaball
canon (multiple discs + blur + threshold = merge), the *exact* topology the
fission-bridge already ships at dock scale, and the *exact* read the Gemini
carousel shows. The de-dup HOLDS: it is still ONE `useGooMorph` engine — we
generalize its projection from "one stretching worm" to "two bodies + a welling
neck," driven by the same `--goo-t` scalar, the same flow curve, the same
filter. Per-consumer the worm becomes `{ bodyRef[], neckRef }`; the pager dot
(which IS already two pips + a fattening worm) is the *proof the pattern works*
— we are bringing the carousel/deck UP to the pager's correct topology, not
forking a new one.

### Why this beats every token tweak
A waist is a **concavity** in the silhouette. Concavity can only come from
either (a) the gap between two convex masses (the metaball way) or (b) a
clip-path that carves it. The current single-plate worm offers neither. No
amount of blur/threshold/stretch/girthFloor tuning adds a concavity that the
source geometry lacks. The two-body-plus-neck triad supplies (a); the neck's
hourglass clip-path supplies (b) as a guaranteed floor even before the blur
fuses it. **Belt and suspenders → a waist that is structurally present, then
gooified.**

---

## 2. THE MECHANISM — the projection, the filter, the feel

### 2.1 Geometry (the `useGooMorph` projection, generalized)
`useGooMorph` keeps its `--goo-t` drive verbatim. Its `paint(A,B,t)` is
re-authored to write THREE transforms instead of one:

- **bodyA** at `lerp(A, B, easeBodyA(p))·` with a *late* start — bodyA holds at
  A through p≈0.35 (anticipation), then accelerates toward B (the body is heavy;
  it commits late, the "morph MORE on move" weight). Diameter constant = `G`
  (the girth, ≈ `restSize()·girthFloor`, NOT slide-width).
- **bodyB** parked at B, constant, full presence (it is the destination mass the
  neck wells INTO). On a multi-step travel only the immediate from/to bodies
  paint (the rest hide).
- **neck** spans `[edgeA(p) … edgeB]`: `translate` to the midpoint of the live
  gap, `scaleX` = gap-length / restNeck, `scaleY` = **`neckGirth(p)`** — a
  bell over p: `neckGirth = G · bell(p)` where `bell(p)=sin(π·p)^k` peaks at
  p=0.5 and is ~0 at the ends (the neck does not exist until the bodies start to
  part, peaks fattest mid-gap, vanishes as they coalesce). Its `clip-path` is a
  static hourglass `polygon` (or a `path()` with concave Bézier sides) so even
  pre-blur the sides pinch IN at the waist — the fission `--neck-filament: 42%`
  inset, parameterized by a `--neck-waist` token so the throat is one retune.
- The `#glass-goo` blur (the SAME static filter) then fuses bodyA+neck+bodyB
  into one warm silhouette; because the inputs are round + a concave bridge, the
  output is a true metaball hourglass, not a slab.

All three are `transform`-only per frame (compositor; motion-canon P5). The rest
footprints (`G` circle, `restNeck` bar) are reserved ONCE.

### 2.2 The filter — RE-TUNE for a VISIBLE fuse window (R3)
Keep the graph + every Safari fact verbatim. Re-tune the literals so there is a
window where you SEE the alpha bleed BECOME the neck rather than instant-sharp:
- **blur 10 → ~12-14** at carousel/plate scale (a wider alpha skirt → the two
  bodies start "feeling" each other from further out → the neck wells earlier
  and reads gooier). At plate scale the bodies are large so a bigger blur is
  proportionate.
- **threshold slope 24 → ~14-16, offset re-solved** so the edge is crisp at
  REST but the *transition band* is wider — the fused region holds a soft gooey
  shoulder for a few px instead of a razor edge. (Slope is the metaball
  "surface tension": too high = mercury-hard, no goo; too low = muddy. ~15 is
  the sweet spot the SVG-metaball canon uses.) These stay STATIC literals →
  Safari-safe; they are per-consumer props on `GlassGooFilter` (already
  tokenized), so the deck can run a calmer blur than the carousel.
- Add a `feComposite` `arithmetic` *optional* inner highlight pass is NOT needed
  — the warm domed-droplet `radial-gradient` fill on the bodies (already
  present) supplies the catch-light through the threshold. Keep KISS: blur +
  colorMatrix + atop, three primitives.

### 2.3 The FEEL — weighty, gooey, inertial (R2 + the liquid-weight law)
- **Re-shape the flow curve so the NECK (not a settled plate) dwells.** The
  visible deformation must be the bulk of the clock. Drive `--goo-t` on a curve
  whose *derivative of neckGirth* — i.e. the bell — peaks mid-clock and is wide:
  slow the body-travel so the bodies are still parting/coalescing for ~70% of
  the duration, not 40%. Concretely: the body-travel ease is `--ease-cartoon-
  punch`-flavored (anticipation hold → punchy commit → follow-through settle)
  while the neck bell `sin(π·p)^1.5` spreads the waist across p∈[0.2,0.8]. The
  result: at every frame from ~150ms to ~750ms SOMETHING is deforming (neck
  welling, then pinching) — no dead static-slab dwell.
- **Velocity-couple "morph MORE on move"** via the extant `useLiquidFlex` —
  during a live embla drag (`drive()`), the neck girth + body squish scale with
  drag velocity (`usePointerVelocityField`/embla `scrollProgress` delta): a fast
  fling wells a FATTER, longer neck; a slow drag a tense thin thread. This is
  the iOS-27 "weight responds to gesture" signature and the user's "morph MORE
  on move" — wired through the squish primitive already in the engine, no new
  spring.
- **Durations** (golden-proportioned to the register, not arbitrary): carousel
  ~0.62-0.7s (the `--spring-bouncy-duration` neighborhood — a content carousel
  is snappy-but-weighty, NOT the 0.95s dead-dwell), deck ~0.9s (dignified,
  no-overshoot, the vestibular floor — a full-viewport slide is calmer). Both
  honor T13: **momentum YES, snap-bounce NO on content** — the bounce lives in
  the *neck welling*, not in the slide landing past-target.
- **The bridge opacity gate follows the NECK, not a fixed timer** — fade in as
  neckGirth crosses ~0, fade out as it returns to ~0, so the warm bridge is
  visible EXACTLY while the goo is deforming and gone the instant it settles (no
  R2 lingering slab). The active body cross-fades into the real slide.

### 2.4 Cross-engine (Chrome + Safari) — the §L7 arm, named
- **Channel:** regular `filter: url(#glass-goo)` on the goo layer (NOT
  `backdrop-filter:url` — WebKit bug 245510). Inputs are round bodies + a
  clip-path neck; all `transform`/`opacity` per frame; the filter literals are
  STATIC (no var-driven `stdDeviation` — WebKit bug 283156 absent).
- **sRGB mandatory** (`color-interpolation-filters="sRGB"`) — WebKit forces sRGB
  regardless (bug 136418); declaring it makes Chrome match so the waist
  thresholds IDENTICALLY on both. Already set; keep.
- **The clip-path hourglass is the WebKit insurance:** even where a WebKit
  blur/threshold nuance differs, the neck's *clip-path concavity* guarantees a
  visible waist on both engines BEFORE the filter fuses it — the waist is not
  solely filter-dependent. This is the lens's boldest cross-engine move (below).
- **Region:** keep `−50%/200%` so the welling neck + travelling bodies never
  clip; `contain: layout style` (NOT paint — paint clips the neck), `isolation:
  isolate` to scope the filter. All present; keep.
- **`@supports not (filter: url(#x))`** → drop the goo layer to a plain
  cross-fade (the bodies/neck still translate as the floor); **PRM** → goo layer
  `display:none`, body snaps to target, zero neck frames. Both present; keep.
- **Acceptance = paired-engine π** (Chromium AND WebKit) at the neck peak proving
  the waist, per §L7 — never a single-engine green.

### 2.5 Visual / material (the warm six-layer read survives the threshold)
- Bodies + neck share the warm-cream domed-droplet `radial-gradient` fill
  (already on the worm) so the fused mass reads as ONE continuous liquid-glass
  droplet with an inner catch-light — never a flat slab. NEVER gray
  (BA.W-NO-GRAY): the landed `.dark` L0.68 warm-chroma lift + saturate/brightness
  transmissive companion carries the dark register, BOTH modes.
- §3 colorful-field-behind-glass: the layer opacity (~0.55) keeps it a
  TRANSMISSIVE warm lens — the vibrant slide/aurora reads THROUGH the welling
  neck (the glass bends the content behind it), not an opaque blocker. A defined
  edge: the threshold IS the crisp metaball edge; a 1px inner warm rim
  (`--glass-edge`) on the bodies seals the "defined edge" §3 requirement.
- Golden proportion: body diameter `G = restSize()/φ` (the blob is the
  golden-minor of the slide pitch); neck rest-thickness `G/φ` (the throat is the
  golden-minor of the blob). Concentric `--radius-card` on the bodies' optional
  superellipse. Nothing arbitrary.

---

## 3. THE SINGLE BOLDEST MOVE

**Replace the single stretching worm-plate with a `clip-path` HOURGLASS NECK
welling between TWO round bodies — make the waist a STRUCTURAL concavity, not a
filter accident.** The fission-bridge already proved this exact `--neck-filament`
clip-path idiom at dock scale; the bold move is to **lift that filament into
`useGooMorph` as the universal neck geometry** so the carousel plate, the deck
plate, AND the pager worm all neck through ONE clip-path-hourglass-between-two-
bodies projection. The win is double: the waist is present on BOTH engines
*before* the blur even fuses it (the clip-path is engine-agnostic, killing the
"works in Chrome, broken in Safari" class at the geometry layer, not just the
filter layer), and the `#glass-goo` blur then merely *softens and warms* a
concavity that already reads as a decisive metaball waist. The current system
asks the filter to invent a waist it has no geometry for; this asks the geometry
to GUARANTEE the waist and the filter to make it gooey — which is exactly why
the dock fission necks read right and the carousel/deck do not. ONE engine, one
filter, one clip-path idiom, zero forks — survival of the fittest: the fission
neck is the fittest goo geometry in the codebase, so it wins and propagates.

---

## 4. DELTA-ASSAY → wave amendment (reconcile vs the 116 union waves)

- **Reconciles with `BD.W-GOO-SPLIT-PERF`** (the perf/dwell lever) — that wave's
  charter (split the long dead-dwell, perf-tune the bridge) is SUBSUMED by R2's
  neck-following opacity gate + the re-shaped flow curve + the shorter
  carousel duration. No dup: GOO-SPLIT-PERF becomes the *timing/perf* arm of this
  rebuild; this lens supplies the *geometry* arm. They union into ONE amendment.
- **Augments (does NOT fork) `useGooMorph`** — generalize `morphRef` →
  `{ bodyRefs, neckRef }`; the pager/carousel/deck all adopt the new projection.
  The pager worm (already two pips + worm) is the migration proof. De-dup intact.
- **`GlassGooFilter`/`DockGooFilter`** — re-tune the default literals (blur ~13,
  slope ~15) as new prop DEFAULTS; structurally untouched (Safari facts verbatim).
  Consider MERGING the two filter components into one `GooFilter` with an `id`
  prop (they are byte-identical but for the id default) — KISS, one mount.
- **Excise:** the single-plate worm geometry + the `girthFloor`-as-uniform-pinch
  (replaced by the bell-driven neck girth + clip-path waist). The R0 loop-clone
  plate keying (snap-count, deduped).
- **No legacy:** clean break, no dual paths — the new projection replaces the old
  in the same amendment; the old worm geometry is deleted, not aliased.

**The gate (the gestalt bar):** a paired-engine (Chromium + WebKit) π
frame-series on a REAL Next-click `/navigation/carousel` AND a REAL `deck.next()`
`/motion/deck`, BOTH modes, proving (1) a CONCAVE waist at the neck peak (the
hourglass, born-RED on the current slab), (2) the neck wells→pinches→snaps (not a
fade), (3) zero static-slab dwell (bridge gone within ~80ms of settle), (4)
warm-cream never gray, (5) the WebKit waist == the Chromium waist.
