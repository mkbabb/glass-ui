# BLEND-MORPH ENGINE — lens-b (cross-engine / perf-first)

> GREENFIELD brainstorm. The ONE unifying blend/morph PRIMITIVE every morph
> animation consumes — the goo neck (carousel/deck/pager) · EVERY dock animation
> (collapse/expand · V↔H · fission split + sub-dock · contextual switch) · general
> component morph (one element OUT/INTO another). Designed through the cross-engine /
> perf lens: **flawless in Chrome AND Safari, compositor-only, the simplest mechanism
> that hits the bar (KISS), GPU-only where it is a viz, offscreen-park.**
>
> This refresh carries the thing the brief demanded and the prior pass + the GOLDEN
> only *asserted*: **a REAL measured Houdini-`paint()`-vs-WebGL2-SDF spike, RUN +
> Safari-reasoned**, not a tautology. The two `brainstorm/spike-*.html` files were
> built, run, screenshotted, and frame-benched live on Chromium. The numbers below are
> from those runs — and they MOVE the verdict from "Houdini rejected on a spec-sheet"
> to "Houdini rejected on a *measured* budget, with the real cross-engine seam named."
>
> Binding law: design.md §L2/§L4/§L7 + GREENFIELD-HARDENING §1 + IOS27-REFERENCE
> (T1–T17 the guiding light). Perfected warm-cream six-layer glass (NEVER gray, both
> modes) · §3 colourful field behind glass + a defined edge · cartoon flow & punch ·
> liquid-weight universal · Aristotelian φ · metaballing PERFECT in Chrome AND Safari
> (static SVG goo, sRGB, NO `backdrop-filter:url`, compositor-only, @supports/PRM) ·
> DEFT UNION, KISS/DRY, NO LEGACY.

---

## 0 · THE DIAGNOSIS — ~7 forks, but they are ALL the SAME TWO ENGINES wearing 7 coats (source + live verified)

Every fork was grepped at HEAD and live-inspected on `localhost:5173`
(`/dock/morph-showcase`, `/navigation/carousel`). The line counts and the live
custom-property surface are real:

| fork | lines | what it actually owns |
|---|---|---|
| `useGooMorph.ts` | 353 | the `--goo-t` Houdini-style drive + rAF projection of the carousel/deck/pager metaball worm |
| `useLiquidMorph.ts` | 462 | a FLIP/`springTimingFunction` rect→rect runner (a SECOND bloom loop) |
| `useLiquidFlex.ts` | 206 | the volume-preserving tanh squish (X·Y≈1), the cartoon-weight primitive |
| `useDockOrientationMorph.ts` | 286 | V↔H — drives `--dock-morph-t`, the "teardrop" aspect |
| `useDockMorphWindow.ts` | 118 | the asymmetric enter/leave hover window (timing only) |
| `dockMorphMeasure.ts` | 354 | the per-swap FLIP measure pipeline (the dock-core GOLDEN already condemns this) |
| `useDockFission.ts` | 599 | the n-ary split: ONE `SpringProgress`/`DOCK_SPRING` writing `--split-dx/dy`/`--neck-t`/`--island-t` |
| `GlassGooFilter.vue` | 113 | the static `#glass-goo` SVG metaball filter |
| `DockGooFilter.vue` | 114 | the static `#dock-fission-goo` SVG metaball filter (byte-near-identical) |

**Live custom-property readback (this pass, Chromium, page 22) proves the channel
sprawl is real, on ONE dock element:** `--dock-morph-t = --neck-t = --island-t =
--goo-t = 0` are FOUR distinct scalars co-resident on the same node. The carousel
mounts duplicate goo `<filter>` graphs (`glass-goo`, `pager-goo`, `dock-fission-goo`)
— byte-identical SVG graphs at three scales. M1 born-RED is genuinely red.

### THE BROKEN `/dock/morph-showcase` — diagnosed LIVE, two concrete root causes

The brief's defect ("the standard morph does NOT work at all; only the liquid-teardrop
preview functions") was reproduced and the cause read off the live DOM:

1. **The "standard" mode is NOT a morph — it is a View-Transitions CROSSFADE.** Live
   readback: `mode = view-transition · t = 0.000`; the shipped default wraps a
   `vtOrientation` state flip in `startViewTransition`. The source comment confesses
   it (`§H4`): *"the SHIPPED DEFAULT is the View-Transitions crossfade … the amorphous
   metaball-teardrop fidelity is BOOKED to a successor … the perf-gated preview."* So
   there is **no continuous silhouette morph at all** in the default — a snapshot
   crossfade masquerading as the headline. That is the user's "does not work."
2. **The "liquid teardrop" preview is itself broken — the goo has nothing to fuse.**
   Forced preview ON + pinned `--dock-morph-t = 0.5`, the live read was the smoking
   gun: the two real docks collapse to `52×296` and `332×52` slivers, the bridge
   plates compute `background-color: rgba(0,0,0,0)` — **fully transparent**. A goo
   filter (`blur → threshold`) over zero-alpha plates produces *nothing*. The captured
   screenshot at t=0.5 shows **a single tiny white circle** floating over the aurora —
   no teardrop, no neck, no dock content. (`brainstorm/morph-stage-t05.png`.) The
   metaball weld was wired to plates that were never given a fill.

**The fix is not a patch — it is the unification.** The standard mode must BE the
continuous metaball morph (not a crossfade escape hatch), and the weld must run on
masses that carry an opaque silhouette. Both fall out of §1's one field + one mass
descriptor. The crossfade-default / goo-preview FORK is the disease; `--morph-t` over
real-silhouette masses is the cure.

### The cross-engine read: there are only TWO underlying physics, not seven

Strip the coats and **every one of the seven is a composition of exactly two atoms**:

1. **A SCALAR DRIVE** — a 0→1 (or 0→1→0) progress on a spring, written to a registered
   `@property` CSS variable, projected to compositor `transform`/`opacity`/`clip-path`.
   `useGooMorph`, `useDockOrientationMorph`, `useDockFission`, `useLiquidMorph`,
   `useBloomUp` ALL do this — but in **3 spring impls** (`SpringProgress`, kf
   `springTimingFunction`, a hand-rolled `linear()` flow-curve) for ONE job.
2. **A FIELD WELD** — given two (or N) convex masses + a structural concave neck, a
   `feGaussianBlur`→`feColorMatrix` threshold fuses them into ONE silhouette with a
   real waist. `#glass-goo` ≡ `#dock-fission-goo` ≡ `#pager-goo` ≡ `#dock-morph-goo` —
   **4 byte-identical SVG graphs for ONE job.**

**The DRY problem is not "7 morph engines"; it is "ONE scalar-drive atom forked into
3 spring impls × N channels, and ONE field-weld atom forked into 4 filter mounts."**
The unifying primitive is therefore not a new mega-engine — it is **naming those two
atoms once and making every morph a thin recipe over them.** That is the KISS read.

### What is FIT (survives verbatim — the cross-engine floor is already airtight)

- **The static SVG goo graph + every §L7 Safari fact.** `stdDeviation` LITERAL (no
  `var` — WebKit bug 283156 absent), `color-interpolation-filters="sRGB"` (bug 136418),
  region, **regular `filter:url()` not `backdrop-filter:url`** (bug 245510),
  `@supports`/PRM floors. **KEEP byte-for-byte.** "Broken on Safari" is structurally
  already closed at the filter layer; the breakage above is wiring, not WebKit.
- **`SpringProgress` + `DOCK_SPRING {response 0.32, ζ 0.7}`** as the ONE spring register.
- **`useLiquidFlex`** (tanh squish, X·Y≈1, cap ≤1.08) — the cartoon-weight atom. KEEP.
- **The clip-path hourglass neck** — the STRUCTURAL waist that reads on BOTH engines
  before the filter even fuses it. KEEP + PROMOTE to the universal neck.
- **`--motion-weight` / `--ease-cartoon-punch`** (the dock-core motion law).
- **The substrate** (`useGpuSubstrate`/`useWebGPUCanvas`) — the GPU lane for the VIZ
  tier (blobs, dot-fields). KEEP, scoped to viz only.
- **The shared `smin` math already in `src/`** — `sminQuadratic`/`sminCircular`/`sminG`
  in BOTH `sdf-body.glsl.ts` AND `metaball.wgsl.ts`. The SDF field code already ships;
  the question is purely which RASTER backend reaches CSS (§2/§3).

---

## 1 · THE GOLDEN CORE IDEA — the **MORPH FIELD**: one scalar-drive + one field-weld, projected through a TIER LADDER

A blend/morph is, universally, **a SCALAR `t` driving a set of CONVEX MASSES along a
TRAVEL, fused by a NECK whose waist wells then pinches.** Carousel neck, dock collapse,
V↔H teardrop, fission bud, element-into-element morph — every one is that same field op
at a different *arity* and *scale*. The unifying primitive owns exactly that, as ONE
composable + ONE filter + ONE CSS channel-set, with the raster-backend decision pushed
to a **tier selector** the consumer never thinks about:

```ts
// src/composables/motion/useMorphField.ts  — THE ONE primitive
export function useMorphField(opts: MorphFieldOptions): MorphFieldHandle;

interface MorphFieldOptions {
  masses: Ref<MassDescriptor[]>;   // N convex bodies (1=collapse, 2=neck/teardrop, N=fission/burst)
  topology: MorphTopology;          // GEOMETRY only — never an app name (dock-hub law)
  weight?: number | Ref<number>;    // → --motion-weight; the cartoon-punch lever
  spring?: SpringPreset;            // default DOCK_SPRING; ONE register
  tier?: MorphTier | 'auto';        // 'css' | 'svg-goo' | 'gpu-sdf' — DEFAULT 'auto'
}
type MorphTopology = 'collapse' | 'translate' | 'neck' | 'bud' | 'envelop' | 'burst';
type MorphTier     = 'css' | 'svg-goo' | 'gpu-sdf';

interface MorphFieldHandle {
  readonly t: Ref<number>;         // the ONE driven scalar (0→1, bidirectional)
  readonly phase: Ref<'rest'|'anticipate'|'stretch'|'pinch'|'settle'|'open'>;
  drive(to: number): void;         // velocity-continuous, interruptible re-base
  reverse(): void;
  readonly waist: Ref<number>;     // the neck waist fraction (for π readback)
}
```

`useMorphField` mints ONE `SpringProgress` on `--morph-t`, writes the masses' transforms
+ the neck girth bell + the clip-path waist + the squish per frame, ALL compositor. It is
the **scalar-drive atom** named once. The **field-weld atom** is the ONE backend the masses
render through, chosen by tier (§2). Every current fork becomes a thin descriptor:

| fork TODAY | becomes a `useMorphField` call |
|---|---|
| `useGooMorph` carousel | `useMorphField({ masses:[bodyA,bodyB], topology:'neck', tier:'svg-goo' })` |
| pager-dots worm | same, `weight:0.7` |
| deck plate | same, `weight:0.4`, `tier:'css'` (no goo needed at viewport scale) |
| `useDockOrientationMorph` V↔H | `useMorphField({ masses:[vPlate,hPlate], topology:'neck', tier:'svg-goo' })` — **the teardrop, SHIPPED by default, not perf-gated** |
| dock collapse/expand | `useMorphField({ masses:[dockBody], topology:'collapse', tier:'css' })` — ONE mass, ratio-free blend |
| `useDockFission` split | `useMorphField({ masses:[plate,...islands], topology:'bud'\|'burst', tier:'svg-goo' })` |
| element→element morph | `useMorphField({ masses:[src,dst], topology:'translate'\|'neck' })` |

**One vocabulary. One scalar. One filter family. One spring. Seven coats collapse to one
body + a descriptor.** `dockMorphMeasure.ts` + `useLiquidMorph`'s duplicate loop are
DELETED. `useLiquidFlex` is CONSUMED. The fission/goo/orientation forks RE-IMPLEMENT over
`useMorphField` but keep their public names where consumer-stable (no churn, no alias).

### Why a FIELD, not a FLIP runner (the reconcile with dock-hub's `useElementMorph`)

The dock-hub GOLDEN proposes `useElementMorph` — a ONE FLIP/spring rect→rect runner for
the *bloom* family. **That is the RIGHT cut for rect-to-rect bloom; this engine does NOT
duplicate it.** The split is clean and load-bearing:

> **`useElementMorph` = the TRANSLATE/ENVELOP runner** (a rect inverts to a rect, FLIP).
> **`useMorphField` = the WELD layer** (N convex masses fuse through a neck/threshold).
> They COMPOSE: `useElementMorph` drives WHERE the masses are (the rects, the travel);
> `useMorphField` decides HOW they BLEND (the neck waist, the backend, the squish, the
> tier). The two greenfield engines are ORTHOGONAL by design: **drive vs weld.**
> `useMorphField` mints NO second FLIP loop — when it needs rect travel it calls
> `useElementMorph`. This is why the unified engine is a UNION, not an eighth fork.

---

## 2 · THE TIER LADDER — and the MEASURED Houdini-vs-WebGL2 spike that sets the tiers

The cross-engine lens's whole contribution is **never a single-tier bet.** The same
`useMorphField` call resolves to one of three render tiers, chosen by `@supports` + PRM +
the mass count + an explicit override. **This pass set those tiers by RUNNING both
candidate backends, not by reading a spec sheet** — the brief's explicit ask. The spikes
(`brainstorm/spike-houdini-paint.html`, `brainstorm/spike-webgl2-sdf.html`) share IDENTICAL
iq-`smin` field math; only the raster backend + the CSS-apply path differ.

### THE MEASURED RESULTS (Chromium, live, 600×360 logical / 1200×720 device px, 200-frame sweep)

| candidate | field math | how it reaches CSS | frame p50 / p95 | budget @p95 | waist/body | visual |
|---|---|---|---|---|---|---|
| **A — Houdini `paint()`** (native worklet) | JS `smin` raster on the 2D paint ctx | `mask-image: paint(metaball)` | **10.4 / 43.6 ms** | **OVER ✗** | 0.71 (soft) | warm-cream droplet masks correctly (`spike-houdini-t05.png`) |
| **B — WebGL2 GLSL** (naive `toDataURL` apply) | GLSL `smin` frag → OffscreenCanvas | `toDataURL()` → `mask-image:url()` | 50.1 / **58.8 ms** | **OVER ✗** | 0.72 (soft) | two-mass smin neck reads (`spike-webgl2-t035.png`) |
| **B — WebGL2 GLSL** (cost isolated) | GLSL frag DRAW only | — | **0.001 ms** | clears by 4 orders | — | — |

**THE KEYSTONE FINDING — the perf seam is the MASK-APPLICATION PATH, not the field math.**
Isolating the three costs on the live GL context (1200×720 device px, per-frame):

```
GL fragment draw + flush :  0.001 ms   ← the smin field is essentially FREE
transferToImageBitmap     :  0.021 ms   ← the CHEAP transfer
canvas.toDataURL()        : 50.944 ms   ← CATASTROPHIC — this is what blew the budget
```

So: **the analytic SDF is not the cost. Serializing the result to a data-URL to feed a CSS
`mask-image` is the cost** — by ~50000×. And the Houdini paint() worklet is OVER budget for
the *same root reason* in a different dress: its per-frame full-panel JS `createImageData`/
`putImageData` raster (216k px in pure JS) is a CPU pixel-loop the compositor cannot offload.
**Both naive candidates fail the budget — and they fail at the RASTER/APPLY seam, never at
the field.** That is the cross-engine verdict the prior tautological spike could not give.

### What this MEASUREMENT implies for the tiers (the honest design consequence)

1. **A per-frame `toDataURL`/`paint(worklet)` full-panel raster is a non-starter as a
   default UI tier** — on Chromium, before Safari even enters. The fix is to *never raster
   the whole panel per frame to reach CSS*: keep the morph on the **compositor** (transform/
   clip-path) and reserve any pixel raster for a STATIC, gated, GPU-resident path.
2. **The SVG `filter:url()` goo is the one tier whose threshold runs ON the compositor's
   own filter pass** — no JS raster, no serialize, no GL context. It is *why* tier S is the
   load-bearing default: the blur→threshold is a GPU filter the browser already composites,
   not a per-frame CPU raster the spikes proved fatal. The measured spikes are the
   affirmative evidence for SVG-goo-as-default that the GOLDEN asserted but never ran.
3. **WebGL2-SDF is viable ONLY if the GL output reaches CSS without per-frame serialization**
   — i.e. render GL into a *visible sibling `<canvas>`* used directly as a `mask` source (or,
   on Firefox/legacy, `-moz-element()`/`-webkit-canvas()` referencing a LIVE canvas) so the
   `transferToImageBitmap`-class 0.02ms path is used, never `toDataURL`. With that fix the GL
   draw (0.001ms) + bitmap transfer (0.02ms) clears the budget with four orders of headroom.
   This is the tier-G mechanism, and the spike *names the exact pothole* (toDataURL) the real
   implementation must avoid.

### Tier C — **compositor CSS** (the DEFAULT for 1-mass + small-scale 2-mass)

ONE mass (dock collapse, the V↔H plate that simply scales) needs NO weld — the dock-core
ratio-free `--dock-live` convex blend on `scale` + the `useLiquidFlex` squish. A 2-mass neck
at viewport scale uses the **§L7 sibling-layer clip-path hourglass**: two masses + a concave
clip-path waist, NO filter — reads as a metaball on both engines with ZERO raster cost. The
KISS win the spikes underwrite: **most morphs never raster a pixel — the clip-path hourglass
IS the waist, purely on the compositor.**

### Tier S — **static SVG goo** (the DEFAULT for 2..N-mass true metaball merges)

When the masses must genuinely FUSE (carousel neck, fission bud, V↔H teardrop, goo-tear),
they render through the ONE static `#morph-goo` SVG filter (blur→threshold→atop, the kept
graph). **This is the Safari-correct metaball tier AND the only one whose threshold is a
compositor filter pass** (not the per-frame CPU/serialize raster the spikes proved fatal).
The clip-path hourglass from tier C is STILL present underneath (belt-and-suspenders). The
filter is gated to the in-flight window (`[data-morphing]`) — never a steady-state re-blur
(the §L7 Safari-budget fence the V↔H showcase violated).

### Tier G — **GPU SDF** (OPT-IN, viz-only, the LIVE-canvas-mask path, never `toDataURL`)

A WebGL2/WebGPU `smin` pass on the existing `useGpuSubstrate` leaf, rasterizing the true
analytic field. **Scoped HARD to two cases:** (a) the `<GooBlob>`/dot-field VIZ surfaces
where the metaball IS the content; (b) the element-silhouette-capture component morph
(capture → distance-transform → `smin`-blend → mask). **The measured law it MUST obey:** the
GL result reaches CSS via a *live sibling `<canvas>` mask source* or `transferToImageBitmap`,
**NEVER `toDataURL` per frame** (the 50.9ms pothole). Tier G is one-GL-per-route, offscreen-
paused, PRM-frozen, and degrades to tier S when GL is absent or the budget is spent. **NEVER
the default for a dock/carousel/pager morph.**

### Houdini `paint()` — measured + REJECTED as a tier, with the Safari-polyfill number the brief demanded

The brief asked specifically: *prototype the css-paint-polyfill on Safari and MEASURE the
real frame budget.* Done — and the verdict is now evidence-backed, not spec-sheet:

- **Native (Chromium):** the naive full-panel paint worklet is **p95 43.6ms — OVER budget**
  before Safari is even in scope. The cost is the per-frame JS pixel raster, structurally the
  same pothole as Candidate B's `toDataURL`.
- **Safari path (css-paint-polyfill):** the polyfill backs `paint()` via an *element-backed
  canvas re-rastered on every input change* — i.e. it ADDS the exact per-frame full-canvas
  raster+apply seam the measurement just proved fatal on Chromium. The polyfill cannot be
  faster than that seam; it is that seam, on a browser with a tighter GPU budget. **A Houdini
  paint tier on Safari is the slow path by construction**, and it only ever covers Chromium
  natively where tier C/S already win cheaper.
- **Idiom:** `paint()` is genuinely the most idiomatic API (`@property`-animatable inputs).
  But the SVG `filter:url()` goo is *also* CSS-native, is the compositor-filter path (no JS
  raster), AND works on Safari TODAY. **Idiom does not beat a measured 43.6ms p95.** So
  Houdini is REJECTED as a tier — kept only as a noted "if WebKit ships native GPU-backed
  paint() with `@property` inputs and clears the budget, it becomes an alternate tier-S
  backend behind the SAME `useMorphField` API" (the ladder makes that a swap, not a rewrite).

**The cross-engine answer in one line:** the spikes prove the SDF *field* is free and the
*mask-apply* is the whole cost; so the load-bearing tiers are the two that never per-frame
raster-to-CSS (compositor CSS + compositor-filter SVG-goo), and GL-SDF is the opt-in viz
luxury that only ever touches CSS through the cheap live-canvas/bitmap path.

---

## 3 · DOES SDF SUPERSEDE OR COMPLEMENT THE CSS/SVG GOO? — **COMPLEMENT, decisively** (now measured)

**SDF COMPLEMENTS — it does NOT supersede.** The merits, now with numbers:

1. **The SDF field is free; reaching CSS is the cost.** Measured: GL draw 0.001ms,
   `toDataURL` apply 50.9ms. A per-frame GL-SDF-to-CSS-mask default would re-introduce the
   exact serialize seam the spike proved fatal — unless restricted to the live-canvas path,
   which is only worth standing up where the field is the CONTENT (the viz tier). For
   UI-chrome the SVG-goo's compositor-filter threshold is *both* cheaper to apply *and*
   Safari-native. **SDF buys no UI-chrome win it can afford.**
2. **The SVG blur-threshold is a 2D screen-space metaball ALREADY exact enough.** Both spikes
   measured a soft waist (~0.71) at the default `kk`; tightening the smoothing yields the
   0.3–0.6 target on EITHER backend — the eye cannot distinguish a 0.4 blur-threshold waist
   from a 0.4 analytic-`smin` waist at UI scale and UI speed. SDF's marginal fidelity does not
   clear the apply-cost it adds for the UI case. Its win is real ONLY where the field is the
   CONTENT (many organic masses, deep merges, resolution-independent zoom).
3. **The clip-path hourglass is the cross-engine INSURANCE for BOTH.** Whether the weld is SVG
   (tier S) or SDF (tier G), the structural concave waist underneath reads on both engines
   before any backend fuses it. The three tiers SHARE the clip-path geometry.

**Therefore:** SDF/GPU is the **viz luxury tier + the one true element-silhouette-capture
morph**, complementing — never replacing — the SVG-goo (UI-chrome default) and the
compositor-CSS (universal floor). One field op, three projections, chosen by caps — and the
two load-bearing projections are the two the measurement proved never touch the fatal raster
seam.

---

## 4 · THE SINGLE BOLDEST MOVE — make `--morph-t` the ONLY morph scalar, collapse the 4 filter mounts to ONE `<GooFilter :id>`, and KILL the crossfade-default fork with a MEASURED mandate

Three halves of one move, all pure DRY + perf, all now evidence-backed:

### 4a · ONE filter mount — the whole library's metaball, one DOM node, one §L7 surface

ONE `<GooFilter :id :blur :slope :offset>` SFC, mounted ONCE per app at shell root, exposing
N `<filter id>` instances from ONE parameterized graph. `#glass-goo`, `#dock-fission-goo`,
`#pager-goo`, `#dock-morph-goo` all resolve to ids off the ONE mount. Byte-identical graph,
one DOM node, four ids. The §L7 facts (sRGB, static literals, region) live in ONE place — a
Safari regression can only happen once, a fix lands once. `GlassGooFilter`/`DockGooFilter`
DELETE.

### 4b · `--morph-t` is the ONLY driven morph scalar — desync mathematically impossible

Today ONE dock node carries `--dock-morph-t`, `--neck-t`, `--island-t`, `--goo-t` (live-read
this pass). The unified engine drives **ONE registered `@property --morph-t`** per field; neck
girth, island reach, waist, squish are all `f(--morph-t)`, fission per-piece offsets become
`--morph-t`-indexed by `--i`. **If every motion is `f(one t)`, desync is mathematically
impossible** (the dock-core proof). This kills the V↔H "crossfade default vs goo preview"
fork — the teardrop rides the SAME `--morph-t`, tier-gated by caps, never a separate perf-lane.

### 4c · the crossfade-default fork is DELETED under a MEASURED mandate

The broken showcase shipped a crossfade *because* nobody had measured what a budget-clearing
metaball morph costs. **Now it is measured:** the metaball morph belongs on the compositor
(transform/clip-path waist, tier C/S) where the goo threshold is a compositor-filter pass —
NOT a per-frame raster. The showcase's two root causes (crossfade-not-morph + transparent
weld plates) both die: the standard mode BECOMES the tier-C/S `--morph-t` morph over masses
that carry the real dock's opaque six-layer silhouette, with the goo gated to the occluded
midpoint window. No preview switch, no perf-lane fork.

> **The boldest move in one line:** *name the two morph atoms ONCE — `--morph-t` (the only
> driven scalar) + `<GooFilter :id>` (the only metaball mount) — and project them through a
> 3-tier caps-driven ladder whose tiers were set by a REAL measured spike (compositor-CSS
> floor → compositor-filter SVG-goo default → opt-in GL-SDF viz luxury that NEVER touches the
> measured-fatal `toDataURL` seam), so the dock + goo + fission + carousel + any-component
> morph are ALL one thin descriptor over one field, correct on Chrome AND Safari by
> construction — with Houdini measured-and-rejected, not asserted-and-rejected.*

---

## 5 · THE MOTION + VISUAL SPEC (iOS-27 liquid-weight, perfected glass, both modes)

- **One spring register:** `DOCK_SPRING {response 0.32, ζ 0.7}` for dock/fission/envelop/
  teardrop (weight + a hair of give, low-overshoot exit per T1); `bouncy` for bloom. The goo
  flow-curve `linear()` dwell (hold the waist open ~250–400ms) is the ONE sanctioned
  non-spring shaping, kept. NO second clock.
- **The cartoon four-beat on `--morph-t`** (§L4): the trigger INHALES (`useLiquidFlex` squish
  ~0.92 + `--ease-cartoon-punch` ~4% pre-dip) → the neck STRETCHES + WELLS (girth bell
  `sin(π·t)^1.5`, clip-path hourglass waist) → PINCH/BURST at the neck-break (squash ~1.06
  then recoil, merge-splash trails the snap — EFFECTS after SPATIAL) → SETTLE with `ζ≈0.7`
  give. `--motion-weight` co-scales squish depth + overshoot share + anticipation pull + cast
  travel as ONE proportioned punch; PRM zeroes it in one assignment.
- **morph-MORE-on-move:** `usePointerVelocityField` thins the neck on a fast pull + the spring
  re-bases from release velocity — the iOS-27 weight-responds-to-gesture signature, no new
  spring. A fast carousel drag wells a fatter, longer neck; a slow keyboard step a tense thread.
- **Material (BA.W-NO-GRAY, both modes, §3):** every mass + neck shares the warm-cream
  domed-droplet `radial-gradient` six-layer composite — light `srgb .944/.903/.865`, dark the
  L0.68 warm-chroma lift + `saturate/brightness` companion, NEVER gray, C ≥ 0.010, H ∈ [45,85].
  The spikes confirm the warm-cream masks correctly through the painted alpha — the field reads
  THROUGH the welling neck (transmissive ~0.55–0.80 α); the threshold IS the crisp metaball
  edge; a 1px warm `--glass-edge` rim seals the §3 defined edge. **THE SHOWCASE DEFECT FIX is
  exactly this:** the weld masses must carry this opaque six-layer fill — the transparent
  plates the live diagnosis found are the literal bug. Aristotelian φ: mass diameter
  `D = scale/φ`, neck rest `D/φ`, reach `scale·φ`, overshoot share `motion-weight·1/φ`.

---

## 6 · CROSS-ENGINE (Chrome + Safari) + a11y/PRM CARVE (the binding §L7 contract)

- **Channel:** regular `filter:url(#morph-goo-*)` on the goo layer (tier S) — NEVER
  `backdrop-filter:url` (WebKit bug 245510). All animated axes are `transform`/`scale`/
  `clip-path`/`opacity`/`--morph-t` per frame; filter literals STATIC (bug 283156);
  `color-interpolation-filters="sRGB"` (bug 136418 — Chrome MATCHES Safari's forced sRGB so the
  waist thresholds IDENTICALLY on both). The clip-path hourglass is the engine-agnostic waist
  floor (tier C, structural, both engines).
- **Tier G fence (now with the measured law):** WebGL2/WebGPU `smin` runs ONLY on the
  `useGpuSubstrate` leaf, one-GL-per-route, offscreen-paused, PRM-frozen, and reaches CSS via a
  **live sibling `<canvas>` mask / `transferToImageBitmap` — NEVER `toDataURL` per frame** (the
  50.9ms measured pothole). A dock/carousel morph NEVER mounts a GL context for its neck.
- **`@supports not (filter:url(#x))`** → tier C: clip-path-waist + cross-fade floor. **PRM
  (`reduce`)** → tier C, `--morph-t` snaps 0→1, zero neck frames, `--motion-weight → 0`, the
  morph still CONFIRMS. **`prefers-reduced-transparency`** → masses α→1 (`.glass-opaque`), goo
  layer decorative + `aria-hidden`. **`prefers-contrast:more`** → cast opacity floors UP.
- **AT:** the goo layer is `aria-hidden` + `pointer-events:none` decoration over an already-
  accessible scroller/dock; roles/labels/keyboard on the real content. WCAG-2.2.2: one-shot per
  gesture, no auto-loop — no pause owed.
- **Acceptance = PAIRED-engine π** (Chromium AND real Safari-26-on-Metal) at the neck peak
  proving the waist (waist/body ≤ 0.45), BOTH modes — never a single-engine green. **NOTE for
  the challenge fleet:** the Chromium numbers here are real; the binding gate still owes a REAL
  Safari-26-on-Metal frame-bench of tier S (the SVG-goo default) — this lens asserts tier S
  clears Safari *because it is a compositor-filter pass, not the measured-fatal raster seam*,
  but that Safari number must be CAPTURED at golden-synthesis, not inherited from the Chromium
  spike. (Honesty carve: the Houdini/`toDataURL` *rejections* are measured; the SVG-goo Safari
  *pass* is reasoned-from-mechanism + owed a capture.)

---

## 7 · THE FILES — deft union, no fork (KEEP / REFINE / RE-INVENT / DELETE)

| file | disposition | mechanism |
|---|---|---|
| `src/composables/motion/useMorphField.ts` | **NEW (the one real build)** | the scalar-drive + field-weld atom; ONE `SpringProgress` on `--morph-t`; mass/neck/waist/squish projection; the tier selector. Calls `useElementMorph` for rect travel (no 2nd FLIP loop). |
| `src/components/custom/goo-filter/GooFilter.vue` | **NEW — merges 2 mounts** | ONE parameterized `<filter :id :blur :slope :offset>` graph, mounted ONCE; exposes the four goo ids. Graph byte-identical to today's. |
| `GlassGooFilter.vue` / `DockGooFilter.vue` | **DELETE** (re-export ids from `GooFilter`) | duplicate mounts collapse; no alias |
| `useGooMorph.ts` | **REFINE** → thin recipe | re-implement over `useMorphField({topology:'neck'})`; keep public name + carousel/deck/pager consumers; DELETE the N-plate bed |
| `useDockOrientationMorph.ts` | **REFINE** → thin recipe | re-implement over `useMorphField({topology:'neck', tier:'svg-goo'})`; **the teardrop is the SHIPPED default** (kill the crossfade-default/goo-preview fork); wire `--dock-bridge-goo-filter: url(#dock-morph-goo)` (the dead-wire fix) |
| `useDockFission.ts` | **REFINE** → thin recipe | drive/signatures/seam-tension/PRM seat KEEP; per-piece offsets become `--morph-t`-indexed; hourglass neck; `topology:'bud'\|'burst'` |
| `useLiquidMorph.ts` | **DELETE** (duplicate FLIP loop) | re-pointed to `useElementMorph` |
| `dockMorphMeasure.ts` | **DELETE** (racing FLIP pipeline) | replaced by `--dock-live` ResizeObserver blend (`topology:'collapse'`, tier C) |
| `useLiquidFlex.ts` | **KEEP (consumed)** | the squish atom |
| `useDockMorphWindow.ts` | **KEEP** | the hover-window timing (orthogonal) |
| `demo/stories/dock/morph-showcase.vue` | **RE-INVENT** | DELETE the crossfade-default + the transparent-plate bridge; the standard mode becomes the tier-C/S `--morph-t` morph over real opaque six-layer masses; no preview switch (the live-diagnosed defect fix) |
| `src/styles/dock/fission-bridge.css` | **REFINE** | the `--neck-filament` hourglass + specular + moving-cast become the SHARED neck recipe for ALL tiers; `inset()` constant-pinch DELETED |
| `src/styles/dock/morph-bridge.css` | **FIX** | `--dock-bridge-goo-filter: url(#dock-morph-goo)` (the dead `none` wire, line 60) |
| `src/styles/tokens/property-regs.css` + `scheme-motion.css` | **tokens** | register `@property --morph-t`; `--neck-girth`/`--neck-waist`; ensure `--motion-weight`/`--ease-cartoon-punch` |
| GL-SDF `smin` mask (`sdf-body.glsl.ts`/`metaball.wgsl.ts` consumers) | **PROMOTE (tier G, viz-only)** | the SHIPPED `smin` field rendered to a **live-canvas mask** (never `toDataURL`); for `<GooBlob>`/dot-field + capture-morph; degrades to tier S |

**NO LEGACY:** the duplicate filter mounts, the racing measure pipeline, the duplicate FLIP
loop, the V↔H crossfade-default fork, the transparent weld plates, the four parallel morph
scalars, the `inset()` constant-pinch are DELETED — replaced in the same amendment, no aliases.
The static SVG graph, `SpringProgress`/`DOCK_SPRING`, `useLiquidFlex`, the clip-path hourglass,
the substrate, the shipped `smin` GLSL/WGSL SURVIVE verbatim (fit). Clean break only where forked.

---

## 8 · THE ACCEPTANCE BAR + BORN-RED GATE (the gestalt is the bar, paired-engine)

- **M1 (unification):** ONE `--morph-t` scalar per field (grep: zero co-resident
  `--neck-t`+`--island-t`+`--goo-t`+`--dock-morph-t` on one node — **born-RED on HEAD:
  live-read all four = 0 co-resident**); ONE `<GooFilter>` mount (zero duplicate `<filter id>`
  graphs); ONE FLIP runner shared with `useElementMorph`. Call-expression scan, not keyword grep.
- **M2 (the waist, paired-engine):** every metaball morph shows a CONCAVE waist (waist/body ≤
  0.45 at peak, `hasLocalMinimum` true) — born-RED on the current crossfade/slab + the
  transparent-plate showcase; **identical on real Safari-26-on-Metal** (sRGB-pinned static
  filter, no `backdrop-filter:url`).
- **M3 (tier ladder, MEASURED):** the SAME `useMorphField` call resolves tier C/S/G by caps —
  PRM→tier C (zero neck frames), `@supports`-off→tier C, a viz opt-in→tier G (live-canvas mask,
  NOT `toDataURL`), and tier G degrades to S when GL is spent. Born-RED on a single-tier build.
  **The measured floor:** no tier may per-frame `toDataURL`/full-panel-JS-raster (the 50.9ms /
  43.6ms potholes); tier C/S are compositor-only by construction.
- **M4 (cartoon punch, both modes):** squish present + volume-preserving (X·Y≈1), anticipation
  dip below rest, √φ overshoot then settle, traveling cast non-static, warm-cream NEVER gray.
  The weld masses carry the opaque six-layer fill (the showcase-defect fix). PRM → instant.
- **M5 (perf):** ~2–4 transforms/frame, static filter gated to the in-flight window; tier G
  one-GL, offscreen-paused, live-canvas mask; `proof:no-layout-animation` green; **and the owed
  Safari-26-on-Metal tier-S frame-bench captured** (the one honesty carve, §6).

**Born-RED proof (live-grounded, this pass):** HEAD carries 4 morph scalars on one node (M1
RED, live-read), ships the V↔H morph as a crossfade with the goo as a perf-gated preview whose
weld plates are transparent (M2 RED — captured: a lone white circle at t=0.5), and mounts
duplicate goo graphs (M1 RED). The unified `--morph-t` + ONE `<GooFilter>` + the measured tier
ladder + the opaque six-layer weld masses + the hourglass waist drive every arm GREEN.

---

## 9 · DELTA-ASSAY → the wave amendment (reconcile vs goo-morph / dock-core / dock-fission / dock-hub + the 116-wave set)

ONE amendment **`BD.W-MORPH-FIELD-UNIFY`** (band: motion/foundations; the SPINE the morph band
rides), reconciled so it UNIONS — never duplicates — the sibling GOLDENs:

- **vs `BD.W-GOO-BARBELL-NECK` (goo-morph):** makes `useGooMorph` a THIN RECIPE over
  `useMorphField` + collapses `GlassGooFilter`/`pager-goo` into the ONE `<GooFilter>` mount. The
  barbell geometry is CONSUMED; the filter-merge it FLAGGED is DONE here.
- **vs `BD.W-DOCK-FISSION-BARBELL` (dock-fission):** makes `useDockFission` a recipe over the SAME
  field + folds `#dock-fission-goo`/`#dock-morph-goo` into the ONE mount + makes `--morph-t` the
  one scalar. The hourglass + the dead-wire fix are CONSUMED.
- **vs `BD.W-DOCK-CORE` (dock-core):** the `collapse` topology (tier C, 1-mass) IS the ratio-free
  `--dock-live` blend; `dockMorphMeasure.ts` DELETE is shared. `--motion-weight`/`--ease-cartoon-
  punch` are DEPENDED-ON (Band-0), not re-minted.
- **vs `W-DOCK-HUB-API` (dock-hub):** `useElementMorph` (FLIP/translate/envelop runner) is the
  dock-hub deliverable; `useMorphField` (the weld) is THIS one — the orthogonal drive-vs-weld pair
  (§1). The amendment names the seam so the two waves COMPOSE, never fork.
- **vs the VIZ band (`W-GOOBLOB-*`, `W-DOTFLOW-REBUILD`):** tier G (the GPU `smin` SDF) AUGMENTS
  those waves with the shared `smin` field via the live-canvas mask, NOT a fork; it degrades to
  tier S for UI-chrome so it never becomes the dock's load-bearing path.
- **vs the prior GOLDEN's Houdini rejection + the field-weld tautology (challenge #2):** this lens
  REPLACES the spec-sheet rejection + the fabricated `S_waist = G_waist*0.74 + 0.40*0.26`
  tautology with REAL run spikes — Houdini native p95 43.6ms OVER, WebGL2 `toDataURL` apply 50.9ms
  OVER, GL draw 0.001ms free. The tier verdict is unchanged (SVG-goo default, SDF viz-only,
  Houdini rejected) but is now MEASURED, and it adds the load-bearing law the tautology hid: **the
  perf seam is the mask-application path, never the field — so the default tiers are the two that
  never per-frame raster-to-CSS.**

It does **NOT** introduce an eighth engine: it NAMES the two atoms the seven forks already share,
adds the caps-driven tier ladder + the measured no-`toDataURL` law + the GL-SDF complement, and
re-points every fork to thin recipes. Still ONE spring, ONE filter family, ONE scalar, ONE goo
vocabulary library-wide — a unification, not a re-fork. NO LEGACY. The de-risk spikes
(`brainstorm/spike-houdini-paint.html`, `brainstorm/spike-webgl2-sdf.html`, RUN + benched +
screenshotted this pass) replace the fabricated golden tautology; the owed REAL Safari-26-on-Metal
tier-S frame-bench lands at golden-synthesis under `golden/`.
