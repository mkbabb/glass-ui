# BLEND-MORPH ENGINE — brainstorm / lens-C (AUDACIOUS CARTOON-TECHNICOLOR PUNCH)

> GREENFIELD first-principles redesign of the ONE unifying blend/morph **WELD primitive**
> every morph animation consumes — the goo neck (carousel/deck/pager) · EVERY dock animation
> (collapse/expand · V↔H orientation · the fission split + sub-dock · contextual recompose) ·
> general element-INTO-element morph. Designed through the **1940s-technicolor register**: bold
> layered-offset ink shadow, exaggerated squash & stretch, anticipation + follow-through +
> overlapping action + arcs, real WEIGHT & INERTIA — the boldest, most ALIVE variant, still
> idiomatic + Chrome+Safari cross-engine by construction. SDF/GPU where it MATERIALLY helps,
> compositor-CSS where sufficient, the §L7 static-SVG-goo floor below both — never a single-tier bet.
>
> **Binding law:** design.md (§L1 glass · §L2 driver/observer · §L4 cartoon · §L5 PRM · §L6
> golden proportion · §L7 cross-engine) + `GREENFIELD-HARDENING-PLAN.md §1` +
> `IOS27-REFERENCE.md` (T1–T17). The iOS-27 reference demos are the guiding light.

---

## 0. THE LIVE DIAGNOSIS — what I measured on the broken surface (not asserted, captured)

I drove `/dock/morph-showcase` + `/navigation/carousel` live (chrome-devtools-mcp). The findings
that REFRAME the item — every number below is a readback, not a claim:

### 0.1 Why `/dock/morph-showcase` "does NOT work — only the teardrop preview functions"

The page ships **TWO arms behind a toggle, and the default arm is not a morph at all**:

- **Default arm (`liquidPreview=false`, `mode = view-transition`)** — the "Morph to horizontal"
  button calls `startViewTransition(() => vtOrientation = …)`. Live readback: clicking it flips
  `dock-morph-vt-vertical` → `dock-morph-vt-horizontal` (a hard DOM swap) while
  **`morph.t` stays `0.000` for the entire transition.** There is NO continuous interpolation, NO
  waist, NO goo — it is a compositor **opacity crossfade between two static snapshots**. To the
  user this reads as a dissolve/hard-cut, NOT a dock flowing column→row. *This is the "does not
  work" — the headline morph is a non-morph.* The surface even **confesses** it in body copy:
  *"the platform cannot continuously interpolate a mismatched-topology silhouette (a binding
  platform limit); the showcase respects that limit rather than fighting it."* That sentence is the
  whole bug in prose: a fork that, when topology mismatches, **gives up and crossfades**.

- **Preview arm (`liquidPreview=true`)** — only THIS drives `morph.t` (0→1 spring), mounts
  `#dock-morph-goo`, and builds the bridge: I pinned `t=0.5` and read two real plates —
  `52×296` (vertical) + `332×52` (horizontal) sharing a center → a true **cross/teardrop**,
  geometric **waist-ratio 0.157**. So the metaball math is RIGHT and the scalar drive is RIGHT.

- **BUT even the preview is half-broken** (screenshot `lens-c-preview-waist.png`): at `t=0.5` over
  the live aurora the goo filter collapses the whole cross to a **single ~24px white dot** — the
  `feColorMatrix` threshold (`stdDeviation 7`, alpha `20 / −9`) is tuned for *small* plates and
  **eats the 296px/332px arms**, leaving only the overlap nub. The teardrop "that works" reads as a
  pin-dot, not a column→row flow. The threshold is overfit to one scale; the field has no
  scale-aware `k`.

**Root cause (first-principles):** the V↔H is a **single-tier perf bet that failed** — the
per-frame `feGaussianBlur` couldn't clear the 4×-CPU-throttle budget, so the default silently fell
back to a NON-MORPH (crossfade) rather than degrading to a *cheaper morph*. There was no ladder, so
the failure mode was "no morph," and the one morph that survived is mis-scaled. **A tiered field
weld with a compositor-CSS floor would have degraded to a real (cheaper) morph, never to a cut.**

### 0.2 The duplicate-mount, live-counted

On `/dock/morph-showcase` with preview on, the route mounts **TWO goo `<filter>` graphs** —
`#dock-fission-goo` (always present, from the dock chrome) **+** `#dock-morph-goo` (the showcase's
own). Byte-near-identical (blur→matrix-threshold→atop), differing only by `id`. The carousel route
adds more (`#glass-goo`, pager variants). **The same Safari §L7 facts are re-typed per mount — a
regression can hide in any of N copies.**

### 0.3 The six scalars on one node, live-read

`getComputedStyle('.glass-dock')` returns **six morph scalars co-resident**:
`--dock-morph-t · --dock-split-t · --goo-t · --island-t · --neck-t · --seam-tension` (+`--stretch`).
Each fork re-derived the SAME `0→1` spine in its own dialect.

### 0.4 The seven forks, line-counted (`wc -l`, verified)

| fork (verified path) | L | the slice of "blend two shapes / morph one into another" it owns |
|---|---|---|
| `useGooMorph.ts` | 353 | the carousel/deck/pager NECK (one `--goo-t` Houdini drive → metaball weld) |
| `useLiquidMorph.ts` | 462 | element→element split/union/expand at arbitrary θ (a SECOND FLIP/spring loop) |
| `useLiquidFlex.ts` | 206 | the volume-preserving X·Y≈1 squish (the FEEL leaf every fork consumes) |
| `useDockOrientationMorph.ts` | 286 | dock V↔H (rides `--dock-morph-t`; ships a VT crossfade) |
| `useDockMorphWindow.ts` | 118 | the asymmetric enter/leave morph TIMING window |
| `dockMorphMeasure.ts` | 354 | the per-swap FLIP measure pipeline (dock-core GOLDEN condemns this) |
| `useDockFission.ts` | 599 | the n-ary split: one plate buds N islands through necks → sub-dock |

Plus `GlassGooFilter.vue` + `DockGooFilter.vue` (the two byte-near-identical mounts). **2378 L of
composables that are one verb in seven dialects.**

### 0.5 What is FIT — survives verbatim (do NOT re-invent)

The shipped repo already contains the SOTA primitives the directive asks me to "research":

- **A real analytic smin engine** — `goo-blob/shaders/sdf-body.glsl.ts` + `metaball.wgsl.ts`:
  `sdCircle`, `sdgCircle` (value+gradient), `sminQuadratic`, `sminCircular` (IQ-2024 *normalized*
  smooth-min, `k` a real distance-unit blend band), `sminG` (gradient-carrying) — in BOTH GLSL and
  WGSL. **The smin already exists; the cure is naming the shared op + tiering the raster.**
- **Apple's literal liquid-glass technique** — `feDisplacementMap` (`useGlassRenderer.ts` +
  `glass-refract.css`) — already in-repo for the deep refraction tier.
- **The static SVG goo graph + every §L7 Safari fact** — `stdDeviation` LITERAL (no `var` — WebKit
  bug 283156 absent), `color-interpolation-filters="sRGB"` (bug 136418), region `−50%/200%`,
  **regular `filter:url()` NOT `backdrop-filter:url`** (bug 245510), `@supports`/PRM floors. The
  "broken on Safari" class is structurally already closed at the filter layer.
- **`SpringProgress` + `DOCK_SPRING {response 0.32, ζ 0.7}`** — the ONE spring register.
- **`useLiquidFlex`** (tanh squish, X·Y≈1, cap ≤1.08) — the cartoon-weight leaf. CONSUMED.
- **The clip-path hourglass neck** (the goo-morph + fission GOLDEN finding) — the STRUCTURAL waist
  readable on BOTH engines BEFORE any filter fuses it. The cross-engine insurance.
- **`useElementMorph`** (the dock-hub GOLDEN's ONE FLIP/spring rect→rect runner) — the DRIVE atom.

---

## 1. THE CORE IDEA — `useMorphField`: morph the SCALAR FIELD, not the elements

Stop morphing *elements*. Morph the **scalar field** the masses occupy. From first principles every
blend/morph in the library is ONE operation:

> **N warm "bodies" (rounded masses with center + radius), driven by a `0→1` field a consumer
> already owns, fused by a `smin` (smooth-minimum) into ONE continuous liquid silhouette with a
> real waist — rasterized through a TIER chosen by `@supports`/PRM/budget.**

This is the literal iOS-27 model: Apple's `glassEffectContainer` is a smin union of rounded-rects
driven by a progress field — the dock triad, the carousel neck, the V↔H teardrop are the *same
shader with different rects*. The seven forks differ ONLY in their **body descriptor** (how many
bodies, each `t=0`/`t=1` endpoint, each silhouette) and their **weight** (`--motion-weight`).

### 1.1 The keystone reconcile — DRIVE vs WELD (the line that prevents an EIGHTH fork)

The single most important reconcile in this design, and what makes it a UNION not a parallel fork:

> **`useElementMorph` (dock-hub GOLDEN) = the DRIVE / TRANSLATE runner** — a rect inverts to a rect
> on ONE spring (FLIP). It owns WHERE the masses are: the travel, the rect endpoints, the `envelop`
> boundary-as-surface.
> **`useMorphField` (THIS engine) = the WELD layer** — N convex masses fuse through a neck/threshold
> into one continuous liquid silhouette with a real waist. It owns HOW the masses BLEND: the waist,
> the filter/SDF, the squish channel, the cartoon punch, the tier.
> They **COMPOSE**. `useMorphField` mints NO second FLIP loop — when it needs rect travel it CALLS
> `useElementMorph`. A `neck`/`bud`/`burst`/`envelop` topology is `useElementMorph` (drive) wrapped
> by `useMorphField` (weld). A pure `translate`/`envelop` with no metaball is `useElementMorph`
> ALONE. The goo-tear eruption is `useElementMorph` (boundary rect) + `useMorphField` (the tear
> neck).

The drive already has a GOLDEN home; folding it INTO this engine (as a naive read might) would be
the eighth fork. **This engine is the WELD half only.**

### 1.2 The unification proof — ONE field model fits ALL the morphs

| consumer | bodies | `t=0` → `t=1` envelope | waist? | signature | drive scalar (UNCHANGED) |
|---|---|---|---|---|---|
| carousel/deck neck | 2 equal beads (`D=step/φ`) | apart → near → coalesce | yes (hourglass) | `neck` | `--goo-t` |
| pager-dots worm | 2 pips | dot A → dot B | yes (thin) | `neck` | `--goo-t` |
| dock collapse/expand | 1 body | collapsed-px → expanded-px (convex blend) | no (squish only) | `collapse` | `--dock-morph-t` |
| **dock V↔H** | 1–2 bodies | H footprint → V footprint (continuous teardrop) | optional (teardrop mid) | `neck`/`rotate` | `--dock-morph-t` |
| dock fission split | 1 plate + N buds | union → bud-off → necks pinch → sub-dock | yes (asymmetric) | `bud`/`burst` | `--neck-t`/`--island-t` |
| component → component | 1 source + 1 target | FLIP source-rect → target-rect, smin mid-flight | yes (the morph IS the neck) | `envelop` | `--dock-portal-t` |

The dock collapse (1 body, no waist) and the fission (1+N bodies, waist) are the SAME weld with a
different body count. **The size-blend is the degenerate 1-body field; the goo neck is the 2-body
field; the fission is the (1+N)-body field. No fork — a parameter.**

### 1.3 The honest token contract (HARDENING-corrected — where naive reads over-claim)

The dock-core GOLDEN's HARDENING BANNER is binding:

- **DO NOT rename `--dock-morph-t`** (registered `dock.css:83`, the dock's collapse/expand
  authority). The engine READS it. The carousel keeps `--goo-t`; fission keeps `--neck-t`/`--island-t`
  as **named reads off** the consumer's field scalar. NO rename, NO alias.
- **The cartoon punch is NOT one clock.** A monotone `SpringProgress` cannot express anticipation (a
  damped spring approaches from one side). The punch rides a SEPARATE driver on a real
  `--ease-cartoon-punch` `linear()` (a ~4% sub-origin dip + ~22% overshoot), written to a DEDICATED
  CSS-only `@property` squish channel — **NEVER `--stretch`** (6 JS owners + the
  `--dock-morph-max-stretch:1.14` cap clobber). Honestly TWO drivers per morph: the SIZE channel is
  the convex blend; the PUNCH is the orthogonal volume-preserving squish that deforms but cannot
  resize.
- **`--motion-weight` / `--ease-cartoon-punch` are BOOKED by Band-0** (`BD.W-MOTION-WEIGHT` /
  `BD.W-CARTOON-PUNCH`). This engine **DEPENDS** on them; it does NOT re-mint them. It is the first
  library-wide CONSUMER, so the carousel/component-morph inherit the punch for free.

### 1.4 The API (the WELD contract)

```ts
// src/composables/motion/useMorphField.ts — THE ONE weld primitive
export function useMorphField(opts: MorphFieldOptions): MorphFieldHandle;

interface MorphFieldOptions {
  bodies: MaybeRef<BodySpec[]>;        // 1..N warm masses
  signature: MorphSignature;           // GEOMETRY only — never an app name (dock-hub law)
  driveVar?: string;                   // the EXISTING scalar this weld reads — default '--goo-t';
                                       // dock passes '--dock-morph-t', fission '--neck-t'. NO rename.
  weight?: MaybeRef<number>;           // → --motion-weight (Band-0, DEPENDED, not minted)
  tier?: MorphTier | 'auto';           // 'css' | 'svg-goo' | 'gpu' — default 'auto'
}
interface BodySpec {
  el?: Ref<HTMLElement | null>;        // the DOM node this body IS (FLIP via useElementMorph)
  at0: () => Rect;  at1: () => Rect;    // measured-ONCE endpoints (dock-core: no per-frame measure)
  radius?: () => number;               // D = thickness/φ default (golden-minor BLOB, not a plate)
  silhouette?: 'circle' | 'squircle' | 'capture';  // 'capture' = sample clip-path → SDF (tier-gpu)
}
type MorphSignature = { vector: 'lateral'|'radial'|'inward'|'axial'|'directed';
                        kRest: number; kPeak: number; neckHold: number; maxStretch: number };
type MorphTier = 'css' | 'svg-goo' | 'gpu';

interface MorphFieldHandle {
  readonly t: Readonly<Ref<number>>;      // mirrors the consumer's drive scalar (read-only)
  readonly waist: Readonly<Ref<number>>;  // the neck waist fraction (for π readback)
  readonly tier: Readonly<Ref<MorphTier>>;// the resolved tier
}
```

The **signature is DATA, not code paths**: `search`/`media`/`nav` etc. are rows in ONE
`MORPH_SIGNATURES` map carrying `{vector, kRest, kPeak, neckHold, maxStretch}` — and per dock-hub
they are MOTION-named (`radialBurst`/`lateralPeel`/`inwardMerge`), never app-named. One weld reads
the row; one recipe (`morph-field.css`) paints whatever the masses carry.

**Crucially, `kRest/kPeak` are a fraction of the GAP, not a px literal** — this is the direct fix
for the §0.1 single-dot defect: `k(p) = lerp(kRest, kPeak, bell(p)) · gap(p)` so the weld bridges at
the midpoint at ANY scale and never over-thresholds a 296px arm to a dot. Scale-aware by math.

---

## 2. THE TIER LADDER — never a single-tier bet (the live-diagnosed cure)

The same `useMorphField` call resolves to ONE of three render tiers by `@supports` + PRM + body
count + explicit override. The tiers are a LADDER — each is the graceful degrade of the one above —
so a feature is correct on Chrome AND Safari AND below, **never "broken below tier N," never falling
back to a NON-morph crossfade.** The structural clip-path hourglass is present in ALL THREE tiers, so
they sit on ONE waist and degrade by *softening*, never by changing the silhouette.

### Tier C — compositor CSS (the DEFAULT for 1-body + small-scale 2-body)

The cheapest, most-compatible, most-frequently-correct tier. ONE body (dock collapse; the V↔H plate
that simply scales) needs NO weld — it is the dock-core ratio-free `--dock-live` convex blend on
`scale` + the `useLiquidFlex` squish. A 2-body neck at viewport scale uses the **§L7 sibling-layer
goo**: two masses + a clip-path hourglass neck, NO SVG filter — the structural concave waist + a
warm-cream `radial-gradient` alpha skirt reads as a metaball on both engines with ZERO filter cost.
**Most morphs never need a filter at all — the clip-path hourglass IS the waist.**

### Tier S — static SVG goo (the DEFAULT for 2..N-body true metaball merges)

When masses must genuinely FUSE (the carousel neck, the fission bud-off, the V↔H teardrop, the
goo-tear), they render through the ONE static `#morph-goo` SVG filter. **The Safari-correct metaball
tier** — every §L7 fact lives in the static graph. The Tier-C clip-path hourglass is STILL present
underneath (belt-and-suspenders), so Tier S is Tier C + a soft warm fuse. **The filter is gated to
`[data-morphing]`** — never a steady-state re-blur (the §L7 budget fence the showcase violated).
Sweet spot: blur ~13/10/8 (carousel/deck/pager) · slope ~15 · offset ~−7 — **but with the
GAP-fraction `k` of §1.4 so the threshold scales**, fixing the 296px→dot defect.

### Tier G — GPU SDF / displacement (OPT-IN, where the analytic field is the point)

A WebGL2/WebGPU pass on the EXISTING `useGpuSubstrate` leaf rasterizing a true analytic `smin` field
— exact, resolution-independent, with a controllable neck radius `k`. **Exactly three cases, NO
others:** (a) the contextual element→element morph (`silhouette:'capture'` — the ONLY tier that
gooes two arbitrary outlines, the one genuinely new capability); (b) n>3 merges (the `search` radial
burst); (c) deep transmissive refraction-on-the-neck (`feDisplacementMap`, Apple's literal path).
Both sub-paths already in-repo: **G-sdf** reuses `goo-blob`'s `sminG`/`sdgCircle`; **G-refract**
reuses `feDisplacementMap`. OPT-IN, one-GL-per-route, offscreen-paused, PRM-frozen, ALWAYS degrades.
**A dock/carousel/pager morph NEVER mounts a GL context for its neck.**

### The selector (`tier:'auto'`) — geometry + caps, never an app name

```
PRM reduce                          → tier C, t snaps 0→1, zero neck frames
@supports not (filter:url(#x))      → tier C (clip-path waist + cross-fade floor)
bodies.length === 1                 → tier C   (collapse — no weld needed)
signature.vector ∈ {lateral,radial,inward,directed} (a metaball) → tier S (the default)
silhouette:'capture' || bodies>3 || (opted GPU + substrate live + GL budget free) → tier G
```

**90%+ of morphs resolve to tier C or S — both compositor-only and Safari-airtight; tier G is a
deliberate viz luxury, never load-bearing for the dock/goo.** That is what makes it idiomatic +
compatible + performant at once: the expensive tier is opt-in and degrades.

### Houdini `paint()` — researched, REJECTED as a binding tier

The directive asks to prototype Houdini paint() + the GoogleChromeLabs css-paint-polyfill. I carry
the verdict: **Houdini `paint()` is Safari-ABSENT** (MDN/WebKit: not shipped, no positive signal); the
css-paint-polyfill backs it via `-webkit-canvas()` — but that is a **per-element offscreen 2D-canvas
raster invalidated on every `@property` change**, i.e. a per-frame CPU canvas re-paint, which is the
*exact* per-frame cost the V↔H showcase already failed on under throttle. It is also a Chromium-tier
toy the floor must cover anyway. **Tier G (the GL SDF) gives the same analytic raster cross-engine,
GPU-side, with the one-GL budget.** Houdini is named ONLY as a forward-ref behind `tier:'gpu'`'s
selector if/when WebKit ships native paint() with compositor-side raster — never a binding tier, and
never the thing that makes Safari work. **The polyfill does NOT clear the perf bar this engine sets,
so per the auto-FAIL rule it cannot be the golden Safari path; Tier C/S is.**

---

## 3. THE BOLDEST MOVE — the WELD is a CARTOON CEL: the deformation ITSELF carries the punch

This is the lens-C thesis. In a 1940s-technicolor cel the *blend IS the performance* — the squash,
the anticipation, the follow-through live in the shape's own deformation, not in a property pasted on
top. So the cartoon principles are **WELD PARAMETERS THAT BREATHE**, all `f(--ease-cartoon-punch)` /
`f(--motion-weight)`, compositor-only, on the DEDICATED squish channel (NEVER `--stretch`):

- **Anticipation** = bodyB BUDS out of bodyA (scale 0→1) AND the neck `k` **pre-dips ~4% below rest**
  before it wells (a `linear()` dip no damped spring can express — the showcase's monotone
  `SpringProgress` literally cannot do this).
- **Squash & stretch** = each mass's volume-preserving `useLiquidFlex` on the travel axis (cap ≤1.08
  — the anti-taffy fence HOLDS). The LOUD register lives in the NECK girth, not body taffy.
- **Exaggeration** = the mid-neck girth **swells PAST rest** (the bold meatball); masses overshoot
  their slots by `--motion-weight · 1/φ` then settle.
- **Follow-through / overlapping action** = the trailing mass's neck-limb LAGS the leading mass
  (`--i`-indexed stagger, the fission idiom); the `--neck-specular-angle` conic catch-light
  (`plus-lighter`, sRGB-safe) sweeps the throat **~60ms AFTER** the geometry settles.
- **Arc** = mass centers travel a subtle parabola (`±D·0.06·sin(πt)`) so the merge **LOBS**, never
  slides flat. (The fix for the showcase's straight-line cross: the V↔H teardrop arcs through the
  midpoint.)
- **Slow-in/out + WEIGHT** = the `--{prefix}-flow` `linear()` DWELLS at the neck (~250–400ms open)
  so the pinch READS as weighty liquid mercury — never a flicker; opacity follows neckGirth (gone
  within ~80ms of settle, no dead-slab dwell).
- **Solid drawing — THE 1940s INK CAST SHADOW** (the single most ALIVE detail): a moving cast-shadow
  plane under the silhouette — a `::after` compositor-`transform` caster on the REAL
  `--shadow-cartoon-md/lg` rung (NEVER an animated `box-shadow`) — that **slides OPPOSITE the field's
  motion and DEEPENS mid-merge.** The bold layered-offset ink that makes the blob read as a HEAVY
  physical droplet of glass, not a flat alpha smear. As the two masses LOB toward each other their
  casts converge and pool darkest exactly at the waist — the shadow tells you the mass is heaviest
  where the neck is thinnest. This is the cartoon-shadow precept (`cartoon-shadow/` GOLDEN) applied
  to a liquid blend for the first time.

**morph-MORE-on-move** (the iOS-27 weight-responds-to-gesture signature): `usePointerVelocityField`
(already fed from inside the loop) wells a FATTER, LONGER neck on a fast gesture — fling the carousel
hard and the bead-bridge stretches taffy-long then SNAPS; nudge it gently and it barely necks. The
morph is louder the harder you move it. ALL gated on `--motion-weight`; **PRM → 0 zeroes
squash/overshoot/anticipation/arc/cast/stagger in ONE assignment.** The §L2 driver/observer carve
holds: PUNCH on drivers, the embla CONTENT snap stays calm-overdamped (T13 — momentum YES,
snap-bounce NO; never push bounce onto the content carousel).

### 3.1 The two structural sub-moves the punch rides on

**(a) ONE `<GooFilter :id>` mount — the whole library's metaball.** `GlassGooFilter.vue` +
`DockGooFilter.vue` (+ the showcase's inline `#dock-morph-goo`, + pager mounts — I live-counted 2
graphs on ONE route) MERGE into ONE `<GooFilter :id :blur :slope :offset>` SFC, mounted ONCE at
shell root, exposing N `<filter id>` off ONE parameterized graph. **Byte-identical graph, one DOM
node, the §L7 facts in ONE place — a Safari regression can happen in only one place.**

**(b) The V↔H / collapse topology-crossfade DIES.** The showcase's default crossfade (live-confirmed:
`morph.t` never leaves 0) is DELETED. `useMorphField` makes V↔H a continuous metaball interpolation:
the column mass and the row mass are two distributions in ONE topology-free field; the threshold
finds fewer-then-more connected components as `--dock-morph-t` sweeps, a gooey teardrop LOBBING
column→row through the midpoint (with the ink cast pooling at the waist). **There is no topology to
mismatch because the field is topology-free.** The drive stays `--dock-morph-t` (the dock-core
authority) — only the *projection* changes from a crossfade to a weld.

> **The boldest move in one line:** *the WELD is rendered as a 1940s cartoon cel — the blend's OWN
> deformation carries the anticipation (neck `k` pre-dip), the follow-through (the trailing neck-limb
> + the lagged specular sweep), the arc (the LOBBING merge), and the WEIGHT (a moving ink cast-shadow
> that pools darkest at the thinnest waist) — so the ONE generalized `useMorphField` (reading whatever
> drive scalar the consumer already owns, projected through a 3-tier caps ladder with a topology-FREE
> field that KILLS the V↔H crossfade-dodge) feels as ALIVE and HAND-DRAWN as a per-app morph, correct
> on Chrome AND Safari by construction — never an eighth fork, never a single-tier bet, never a fall
> back to a non-morph cut.*

---

## 4. THE MATERIAL + PROPORTION (warm six-layer survives every tier, NEVER gray, both modes)

Bodies/neck/island share the warm-cream domed-droplet `radial-gradient` → ONE continuous liquid-glass
droplet with an inner catch-light, transmissive (~0.55–0.80 α) so the §3 colorful field reads THROUGH
the weld; the threshold IS the crisp metaball edge + a 1px `--glass-edge` inner rim (§3 defined edge).
Light `srgb .944/.903/.865`; `.dark` the L0.68 warm-chroma lift + `saturate/brightness` companion
(plain per-mode arms — NO inset-shadow-in-`light-dark()` trap), C ≥ 0.010, H ∈ [45,85] BOTH modes,
R>G>B never gray. **Aristotelian proportion everywhere:** body D = thickness/φ, reach = thickness·φ,
neck rest D/φ, overshoot share `motion-weight·1/φ`, arc 1/φ², radii concentric. **Audacious √φ type**
on sub-dock/context labels (-1.5% tracking, 1.05 leading).

---

## 5. THE DELTA — which of the 7 forks RETIRE / MERGE / SURVIVE (DRY, no legacy, clean break)

| fork | disposition | into what |
|---|---|---|
| `useGooMorph.ts` | **REFINE → thin recipe** | `useMorphField({signature:'neck', driveVar:'--goo-t'})`; keeps name + carousel/deck/pager + `--goo-t` (NO rename); adopts the barbell + hourglass; the N-plate bed DELETED |
| `useLiquidMorph.ts` | **DELETE** (duplicate FLIP loop) | re-pointed to `useElementMorph` (travel) + `useMorphField` (weld); `directed`/`capture` IS `silhouette:'capture'` |
| `useLiquidFlex.ts` | **KEEP (consumed)** — the FEEL leaf | the squish channel `useMorphField` composes. NO change. |
| `useDockOrientationMorph.ts` | **REFINE → thin recipe** | V↔H = continuous field weld on `--dock-morph-t` (NO rename); **the VT crossfade DIES**; dead `--dock-bridge-goo-filter:none` wire FIXED to `url(#dock-morph-goo)` off the ONE `<GooFilter>` |
| `useDockMorphWindow.ts` | **KEEP** — the timing window | the asymmetric enter/leave is orthogonal SCHEDULING; the weld USES it to open/close the morph window |
| `dockMorphMeasure.ts` | **DELETE** (the ratio-FLIP seizure) | replaced by measure-ONCE `at0()/at1()` (`useDockExpandedSize` RO); the 1-body convex blend IS the degenerate field (`collapse`, tier C) |
| `useDockFission.ts` | **REFINE → `useMorphField` consumer** | drive/spring/signatures/seam-tension/PRM-seat are FIT → become weld signature DATA (`MORPH_SIGNATURES`, motion-named); keeps public API (box-inviolate); per-piece offsets indexed off `--neck-t`/`--island-t` (NO rename). Net-negative LOC. |
| `GlassGooFilter`+`DockGooFilter`(+inline+pager) | **MERGE → ONE `<GooFilter :id :blur :slope :offset>`** | byte-identical graphs → one mount, an `id` prop. Tier-S's rasterizer. |
| `goo-blob` smin (WGSL/GLSL) | **PROMOTE → Tier-G raster** | `sminQuadratic`/`sminCircular`/`sminG`/`sdgCircle` → the GPU-tier field renderer; the viz keeps it; capture-morph also consumes it. ONE smin library-wide. |
| `feDisplacementMap` (`useGlassRenderer`) | **PROMOTE → Tier-G refraction** | the deep media-dock + captured-silhouette refraction read this path. |

**Net:** 7 forks → ONE `useMorphField` weld + 2 SURVIVING leaves (`useLiquidFlex`,
`useDockMorphWindow`) + ONE `<GooFilter>` + the PROMOTED GPU/displacement tiers (shipped, now NAMED)
+ the COMPOSED `useElementMorph` drive. `dockMorphMeasure` + `useLiquidMorph`'s loop are the only pure
DELETES (both broken/redundant). **SDF COMPLEMENTS the CSS goo** — the hourglass is the floor +
default, SDF is the deep tier. NO LEGACY, NO ALIASES — the same amendment deletes the forks it
replaces. Survival of the fittest: the static SVG graph, `SpringProgress`/`DOCK_SPRING`,
`useLiquidFlex`, the clip-path hourglass, the substrate, `useElementMorph`, the smin chunk SURVIVE.

---

## 6. CROSS-ENGINE (Chrome + Safari) — the binding §L7 contract

- **The clip-path hourglass (Tier C) is the cross-engine FLOOR + insurance** — a concave waist
  guaranteed on BOTH engines BEFORE any filter. "Works in Chrome, broken in Safari" is closed at the
  GEOMETRY layer.
- **Tier S** = static `filter:url(#morph-goo-*)` (NEVER `backdrop-filter:url` — bug 245510),
  `color-interpolation-filters="sRGB"` (bug 136418 → Chrome MATCHES Safari's forced sRGB so the waist
  thresholds IDENTICALLY), static literals (bug 283156 absent), region `−50%/200%`. All per-frame
  writes are `transform`/`opacity`/`clip-path`/the drive scalar. Filter gated to `[data-morphing]`.
- **Tier G** runs ONLY on `useGpuSubstrate`, one-GL-per-route, offscreen-paused, PRM-frozen;
  `feDisplacementMap` runs on the ELEMENT (not `backdrop-filter`) → cross-engine. Degrades to S.
- **Houdini `paint()` REJECTED** (Safari-absent; the polyfill is a per-frame CPU canvas re-paint that
  does NOT clear the perf bar). Tier G gives analytic raster cross-engine, GPU-side.
- **Acceptance = a PAIRED-engine π** (Chromium AND real Safari-26-on-Metal) at the neck peak, BOTH
  modes — never a single-engine green.

---

## 7. A11Y / PRM CARVE (§L5)

PRM (`reduce`) → `seatSync()`: one-frame topology snap, `--motion-weight → 0` zeroes
squish/overshoot/anticipation/arc/cast/stagger, zero neck frames, bodies cross-fade (no weld), the
morph still CONFIRMS; the goo/SDF layer drops to `display:none` (tier G parks offscreen).
`prefers-contrast:more` → cartoon-cast opacity floors UP (inked edge = legibility asset).
`prefers-reduced-transparency` → body α → 1 (the `.glass-opaque` endpoint via the ONE `--glass-level`
path). The goo/field layer is `aria-hidden="true"` + `pointer-events:none` decoration over an
already-accessible surface (the carousel track / dock buttons / the morphed component own
roles/labels/keyboard). **WCAG-2.2.2:** one-shot per gesture, no auto-loop — no pause owed.

---

## 8. THE FILES (deft union, no fork)

| file | disposition | mechanism |
|---|---|---|
| `src/composables/motion/useMorphField.ts` | **NEW (the one real build)** | the field-weld atom; reads `driveVar` (NO rename); body/neck/waist/squish/cartoon-punch across the 3-tier ladder; GAP-fraction `k`; calls `useElementMorph` for travel |
| `src/components/custom/goo-filter/GooFilter.vue` | **NEW — merges 2(+) mounts** | ONE `<filter :id :blur :slope :offset>`; mounted ONCE; exposes all ids. Graph byte-identical to today's |
| `GlassGooFilter.vue` / `DockGooFilter.vue` | **DELETE** | re-export ids from `GooFilter`; no legacy alias |
| `useGooMorph.ts` | **REFINE → thin recipe** | `signature:'neck', driveVar:'--goo-t'`; barbell+hourglass; DELETE N-plate bed |
| `useDockOrientationMorph.ts` | **REFINE → thin recipe** | `signature:'neck', driveVar:'--dock-morph-t', tier:'svg-goo'`; teardrop is the SHIPPED default (kill crossfade); fix the dead goo-filter wire |
| `useDockFission.ts` | **REFINE → thin recipe** | orchestrator KEEPS; signatures → `MORPH_SIGNATURES`; offsets off `--neck-t`/`--island-t`; `signature:'bud'|'burst'` |
| `useLiquidMorph.ts` / `dockMorphMeasure.ts` | **DELETE** | the duplicate FLIP loop / the racing measure pipeline |
| `useLiquidFlex.ts` / `useDockMorphWindow.ts` | **KEEP** | the squish leaf / the timing window |
| `useElementMorph.ts` (dock-hub) | **COMPOSE (not built here)** | the DRIVE runner `useMorphField` calls |
| `src/styles/dock/fission-bridge.css` | **REFINE** | the hourglass + specular + moving-ink-cast become the SHARED neck recipe; `inset()` constant-pinch DELETED |
| `src/styles/dock/morph-bridge.css` | **FIX** | `--dock-bridge-goo-filter: url(#dock-morph-goo)` (the dead `none` wire) |
| `src/styles/motion/morph-field.css` | **NEW** | the dedicated `@property` squish channel (NOT `--stretch`); the body/neck/waist/cast recipe `f(driveVar, --ease-cartoon-punch, --motion-weight)` |
| `src/styles/tokens/property-regs.css` | **tokens** | register the punch-squish `@property`; DEPEND on `--motion-weight`/`--ease-cartoon-punch` (Band-0, don't re-mint); keep `--dock-morph-t` |
| GPU-SDF `smin` (`goo-blob`) + `feDisplacementMap` | **PROMOTE (tier G)** | the SDF mask/field renderer + the refraction path; degrade to S |

---

## 9. THE ACCEPTANCE BAR + BORN-RED GATE (paired-engine, the gestalt is the bar)

- **M1 (unification):** ONE `<GooFilter>` mount (grep + live count: zero duplicate `<filter id>` —
  **born-RED on HEAD: I live-counted 2 mounts on one route**); ONE WELD; ONE FLIP runner shared with
  `useElementMorph` (`useLiquidMorph` DELETED). Each consumer keeps its OWN drive scalar.
- **M2 (the waist, paired-engine):** every metaball morph shows a CONCAVE waist (waist/body ≤ 0.45
  at peak, `hasLocalMinimum` true, neckGirth rises→falls) — born-RED on the crossfade default
  (`morph.t≡0`) **and on the mis-scaled preview (the 296px arm → 24px dot, live-captured)**; identical
  on real Safari-26-on-Metal.
- **M3 (the crossfade DIES):** V↔H is a continuous field weld (a real gooey LOBBING teardrop
  column→row), NOT a View-Transitions crossfade — born-RED on the shipped default I confirmed live.
- **M4 (tier ladder, never single-tier):** the SAME call resolves C/S/G by caps — π that PRM→C,
  `@supports`-off→C, capture/viz→G, G degrades to S. The SDF smin neck-radius matches the CSS
  clip-path waist within ±0.05. Born-RED on a single-tier build (the showcase IS one).
- **M5 (cartoon punch, both modes):** squish present + volume-preserving (X·Y≈1), anticipation dip
  below rest (the spring can't), √φ overshoot then settle, the ink cast NON-static + pooling at the
  waist, warm-cream NEVER gray (C ≥ 0.010, H ∈ [45,85]). Punch on the dedicated channel, NOT
  `--stretch`. PRM → instant, weight 0.
- **M6 (perf — the live-diagnosed bar):** ~2–4 transforms/frame, the static filter gated to the
  in-flight window (NOT a steady-state re-blur — the §L7 fence the showcase broke under throttle);
  tier G one-GL offscreen-paused; **the default V↔H clears the 4× CPU throttle as a real morph**
  (the bar the crossfade dodged), `proof:no-layout-animation` green.

### 9.1 Born-RED gate sketch

```js
// pi/morph-field-weld.mjs — born-RED on HEAD (live-grounded: crossfade V↔H, mis-scaled preview, 2 goo mounts)
const frames = await captureMorphFrames(page, '[data-morphing]');     // gesture → settle, paired-engine
const peak = frames[Math.floor(frames.length * 0.5)];
assert(peak.waistRatio <= 0.45, 'RED: no waist — slab/crossfade/dot');           // M2
assert(hasLocalMinimum(peak.crossAxisProfile), 'RED: monotone — one mass');       // M2
assert(neckGirthRisesThenFalls(frames), 'RED: monotone fade, not well→pinch');    // M2
assert(peak.silhouetteArea > minVisibleArea, 'RED: threshold ate the arms (dot)');// M2 — the live preview defect
assert(!isCrossfade(frames), 'RED: V↔H crossfades (the shipped dodge)');          // M3 — confirmed live: morph.t≡0
assert(Math.abs(sdfWaist(frames) - cssWaist(frames)) <= 0.05, 'RED: tiers disagree');  // M4
assert(Math.abs(peak.scaleX*peak.scaleY - 1) < 0.12, 'RED: not volume-preserving');// M5
assert(anticipationDipBelowRest(frames), 'RED: no --ease-cartoon-punch dip');      // M5
assert(castOffsetVariance(frames) > 0, 'RED: ink cast static — no weight');        // M5
assert(warmCream(peak), 'RED: gray — C<0.010 or H∉[45,85]');                       // M5
assert(countGooFilterMounts(dom) === 1, 'RED: 2+ <filter id> graphs (live-counted)');// M1
assert(!exists('useLiquidMorph'), 'RED: duplicate FLIP loop not deleted');         // M1
assert(Math.abs(webkit.waistRatio - chromium.waistRatio) <= 0.05, 'RED: single-engine green'); // §L7
```

**Born-RED proof (live-grounded, captured this session):** the default V↔H is a crossfade
(`morph.t≡0.000` measured — M3 RED), the only working preview mis-scales to a 24px dot at t=0.5 over
the aurora (M2 RED, screenshot `lens-c-preview-waist.png`), the route mounts 2 goo `<filter>` graphs
(M1 RED), six morph scalars sit on one node, the punch tokens are unshipped (M5 RED). The ONE
`<GooFilter>` + `useMorphField` weld + the GAP-fraction `k` + the tier ladder + the hourglass waist +
the dedicated punch channel + the ink cast drive every arm GREEN.

---

## 10. WHY THIS LENS — the cartoon-technicolor synthesis

lens-C's distinctive contribution to the golden: **the topology-FREE field KILLS the V↔H crossfade
dodge** (I confirmed live the dodge ships and is a non-morph), and **the cartoon punch is welded INTO
the field's own deformation** — anticipation = the neck `k` pre-dip, follow-through = the trailing
neck-limb + the lagged specular sweep, arc = the LOBBING merge, weight = the moving 1940s ink cast
that pools darkest at the thinnest waist. The generalized weld feels as ALIVE and hand-drawn as a
bespoke per-app morph, while staying compositor-only + one weld + the tier ladder (lens-b's perf
fence) over the field-of-bodies model (lens-a's iOS-27 fidelity). The boldest, most alive variant —
still idiomatic, still Chrome+Safari by construction, never a single-tier bet, never a fall back to a
cut.
