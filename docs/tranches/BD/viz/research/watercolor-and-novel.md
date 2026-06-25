# watercolor-dot scope + the NOVEL generative-viz brainstorm (BD viz expansion)

**Lane** BD viz-research / watercolor + suite-gap brainstorm · **Status** AUTHORED 2026-06-22 ·
**Branch** prototype/liquid-dock · **Scope** PLANNING/RESEARCH ONLY — zero `src/` edits.
**Grounded** against `src/components/custom/watercolor-dot/**` at HEAD + the BD viz-audit/research pool
(`viz/audit/{gpu-only-conflict,no-legacy-hunt,substrate-consolidation,roster-coverage}.md`,
`viz/research/{aurora,blob,concentric-levelset,dotmatrix-image,papergrid-warp,constellation,fourier-field}.md`)
+ `PROCEDURAL-SUITE.md` + the shared `flow.{glsl,wgsl}.ts` wave-math seam.

This doc answers the two open asks: **(a)** is watercolor-dot in scope for the GPU-only mandate, and
**(b)** 12+ NOVEL generative-viz ideas the suite is missing — the families *not* already covered by the
seven per-viz research chapters (which own aurora / blob / concentric / dot-matrix / paper-grid /
constellation / fourier brainstorms). This chapter deliberately does NOT re-brainstorm those seven; it
covers the white space between them.

---

## Part A — watercolor-dot: DECISION + rationale

### A.1 What it is (the live ground)

`<WatercolorDot>` is a **pure CSS/SVG primitive that mounts ZERO drawing context** — no `getContext("2d")`,
no `getContext("webgl2")`, no `navigator.gpu`. Its anatomy:

1. **Shape** — a seeded per-vertex `border-radius` morph (`useWatercolorBlob.ts` `randomRadii` → `radiiToCSS`),
   deterministic given `color + seed` via the house `mulberry32`/`hashString` prng leaf (`prng.ts`).
2. **Wet edge** — an **internalised SVG `<filter>`** (`feTurbulence` + `feDisplacementMap`) with a per-instance
   `seed`, namespaced via `useId()`. It rasterizes **ONCE and caches** (the HandMark `texture.ts` idiom).
3. **Liveness** (`animate` mode) — a seeded **COMPOSITOR `transform` wobble** (scaleX/scaleY/skew/rotate, all
   sub-perceptual) the compositor accelerates **without re-rastering the SVG filter** — the explicit
   §H Safari-flash fix (a per-frame `border-radius` write under the filter forces a per-frame filter
   re-rasterize, which flashes WebKit; this code structurally avoids it).
4. **`ghost` variant** — the same seeded silhouette traced as a displaced dashed `<ellipse>` outline (the
   empty-palette-slot affordance).

It is the suite's deliberate **counterexample mark**: a decorative dot whose own docstring documents *why*
it is not a GPU context. Its only consumer is `<ColorSwatch>` inside the blob/aurora configurators (a palette
chip), and the `roster-coverage.md` audit lists it as a swatch primitive, not a procedural-canvas viz.

### A.2 DECISION — **EXEMPT. Stays pure CSS/SVG. Out of the GPU-only mandate.**

The GPU-only mandate's literal text is *"all web **facilities** use WebGPU or WebGL2 — ZERO **Canvas2D**
(no `getContext("2d")`)."* watercolor-dot triggers **none** of the three conditions that would pull it in:

- **It is not a Canvas2D user.** The mandate names the migration targets explicitly: *"fourier-field,
  constellation, dot-flow-field(fallback), aurora(getContext-2d raster ground)."* watercolor-dot is **not on
  that list** and mounts no `getContext("2d")`. The `gpu-only-conflict.md` audit's KEEP roster names it
  verbatim: *"`watercolor-dot` (deliberate pure-CSS/SVG counterexample, NO canvas of any kind — not a
  conflict)."* The `no-legacy-hunt.md` S-row confirms it: *"SVG `<filter>` + CSS, NOT Canvas2D."*
- **It is not a "facility rendering a generative field."** It is a *swatch* — a single decorative chip a
  configurator stamps into a palette row. The mandate's redevelopment scope (the four named re-architectures:
  blob / dot-flow-field→image-dot-matrix / concentric→level-sets / paper-grid-warp) is the *generative-field*
  suite. A color swatch is a control-chrome primitive that happens to wobble, not a field.
- **GPU-ifying it is a strict regression.** The page-budget law is *one GL/compute context per route*
  (`PROCEDURAL-SUITE.md` shared discipline; the ~8-context-per-page cap). A configurator palette renders
  **N swatches at once** (one per preset/stop — easily 6–20). Mounting a GPU context per swatch would blow the
  context cap on a single configurator panel, the exact regression `PROCEDURAL-SUITE.md` records as the reason
  it is *"PERMANENTLY OUT — a GPU context for one decorative dot is a regression."* The CSS/SVG path is also
  **strictly cheaper**: one cached filter rasterize + a compositor transform vs. an rAF GPU draw loop.

**The rationale is the same shape as the `--surface-tint-* in srgb` and `cn()` keeps**: a documented
*divergence with a reason*, not drift. watercolor-dot is the canonical "mark NOT to migrate, with the reason"
entry — its value to the suite is precisely that it *demonstrates* the boundary (the lifecycle leaf is for
fields that need a frame loop; a decorative seeded mark needs neither a context nor a loop).

### A.3 The fences this decision must carry (so it cannot silently rot into a conflict)

1. **No `getContext` of ANY kind may enter watercolor-dot.** If a future "richer wet bleed" want arises, it
   rides **more SVG filter primitives** (`feGaussianBlur` / `feComposite` / a second `feTurbulence` octave) or
   a **CSS `@property`-animated mask**, never a canvas. The exemption is *"pure CSS/SVG,"* not *"any non-GPU
   path."* (A Canvas2D bake would re-trigger the mandate.)
2. **It stays OFF the lifecycle leaf + the substrate gates.** `proof:webgl-substrate-single` /
   `proof:gpu-substrate-single` must NOT enroll it (it has no substrate to be single about) — the
   `substrate-consolidation.md` audit already records it as the exempt case. After the §B `useCanvas2D`
   wholesale delete (the gpu-only-conflict deliverable), watercolor-dot is the *only* surviving non-GPU viz
   member and the suite's single "no drawing context" exemplar — the `PROCEDURAL-SUITE.md` member table must
   keep its row (renamed if the suite renames) with the verdict **PERMANENTLY OUT** + this reason.
3. **The Safari-flash invariant is load-bearing and must be gate-asserted under BD's Safari-first edict.** The
   one real risk is a future edit that animates `border-radius` (or any filter-input geometry) per frame,
   re-triggering the §H WebKit filter re-rasterize flash. BD's `W-SAFARI-FILTER-FLOOR` wave is the natural
   home for a bite: *the watercolor `animate` path writes ONLY a compositor `transform`, never a per-frame
   filter-input property* (a grep/AST assert that the rAF tick touches `transform.value` and nothing that
   feeds the `<filter>` graph). This converts the docstring promise into a machine fact.

### A.4 One *optional* refinement (NOT a migration — a polish, if BD wants it)

If the blob/aurora configurators want the palette swatches to read as *liquid glass chips* congruent with the
`W-GLASS-EVERY-ELEMENT` coverage law, the move is to **compose the `--glass-accent` per-instance chromatic-rim
axis** (BB.W-GLASS-ACCENT) onto the swatch — the chip's rim/glint reads its color via `--glass-accent` over a
`glass-quiet` plate, instead of a flat painted background. That is a *CSS-only* upgrade (zero GPU, zero canvas),
keeps the exemption intact, and folds the swatch into the every-element-glass audit. Book it as a *consumer*
of `W-GLASS-EVERY-ELEMENT`, not a viz re-development. (Flagged as optional — the swatch is fine as-is.)

---

## Part B — the NOVEL generative-viz brainstorm (the suite's white space)

The seven per-viz chapters own the *redevelopment* of the extant members. This section brainstorms **NEW
families** the suite is missing. Every idea below honors the BD edicts: **WebGPU-first/WebGL2** (no Canvas2D,
no sub-GPU fallback), **Safari-first** (WGSL on Safari 26+, GLSL ES 3.0 the universal floor), **KISS+DRY**
(reuse `createCanvasLifecycle` + `useGpuSubstrate` + the shared `flow.{glsl,wgsl}.ts` wave-math + `procedural-
color` OKLCh seam + `usePointerVelocityField`), **compositor/GPU-only**, **warm-cream identity default +
presets-in-consumers**, and each carries a **cited SOTA** + a **falsifiable acceptance bar** + a **DRY-reuse
note** (what existing seam it composes so it is not a new engine).

Ranking heuristic: ★★★ = high-leverage + clean reuse + distinct gestalt · ★★ = strong but heavier ·
★ = niche/successor-class.

### B.1 ★★★ Reaction-diffusion (Gray-Scott) — `reaction-diffusion`
- **What:** the classic Turing-pattern field — spots/stripes/coral/mitosis emerging from a two-chemical
  ping-pong simulation. The single most-requested generative-art primitive the suite lacks.
- **SOTA:** Gray-Scott model (Pearson 1993, "Complex Patterns in a Simple System"); Karl Sims' WebGL RD is the
  canonical reference; feed/kill parameter map (Munafo's "uskate world").
- **GPU shape:** a **ping-pong render-to-texture** pair (two framebuffers, swap each frame) — the first
  *stateful multi-pass* viz in the suite. WebGPU storage-texture or WebGL2 FBO ping-pong; the Laplacian is a
  9-tap stencil. Born WebGPU-first; the WebGL2 FBO path is the universal floor.
- **DRY reuse:** `createCanvasLifecycle` for the loop + offscreen-park (a parked RD freezes the sim — correct);
  `procedural-color` OKLCh ramp to ink the concentration field (warm-cream identity); `usePointerVelocityField`
  to *inject* chemical at the cursor (paint-to-seed — the birthdaycolor-like play). The feed/kill pair is a 2D
  config slider that sweeps the whole pattern phase-space (a *genuinely* rich configurator).
- **New seam it forces:** the suite's first **multi-pass FBO/ping-pong substrate helper** — a real, reusable
  capability (caustics, fluid-ink, and the booked aurora-Kuwahara FBO path all want it). This is the headline
  *architectural* addition, not just a new picture.
- **Bar:** a feed/kill preset reproduces the known "mitosis"/"coral"/"fingerprint" regimes (an orientation/blob-
  count histogram over a settled frame matches the reference regime); pointer-inject visibly seeds a new spot
  within ~1s; PRM → one settled static frame.

### B.2 ★★★ Curl-noise FLUID-INK / dye advection — `fluid-ink`
- **What:** colored ink/dye injected into a flowing field, advected + diffused — the "liquid-glass ink drop
  blooming in water" gestalt the whole BD liquid-glass north-star wants. Distinct from `dot-flow-field` (which
  traces *dots* along streamlines); this advects a *continuous dye texture*.
- **SOTA:** Stam "Stable Fluids" (1999) semi-Lagrangian advection; Bridson curl-noise (2007, already the
  suite's `flow.glsl.ts`); GPU-Gems-style stable-fluids-on-GPU. For KISS, the **kinematic** form (advect a dye
  texture along a *prescribed* curl field — no pressure-projection solve) is the right altitude, not a full
  Navier-Stokes solver.
- **GPU shape:** ping-pong dye texture advected by the SHARED `curlFBM` velocity field (the `flow.{glsl,wgsl}.ts`
  seam — its #4+ consumer, deepening the DRY win). WebGPU-first / WebGL2 FBO.
- **DRY reuse:** **the same `flow.{glsl,wgsl}.ts` wave-math** the BD edict wants shared across concentric +
  paper-grid + dot-matrix — this is its natural fluid-domain home; `procedural-color` for the dye OKLCh tint;
  `usePointerVelocityField` to inject ink + perturb the field at the cursor (drag = stir the water).
- **Bar:** an injected ink blob visibly advects + blooms along the curl streamlines over ~2s, color preserved
  (OKLab ΔE within band along the flow); cursor-drag stirs visible vorticity; PRM → static.

### B.3 ★★★ Voronoi / Worley shatter-flow — `voronoi-flow`
- **What:** an animated Voronoi cellular field whose seed points drift on the shared wave-math — cracked-glass /
  cellular-stained-glass / dragonfly-wing gestalt, the cells breathing + flowing. Pairs naturally with the
  liquid-glass identity (a *shattered* glass register).
- **SOTA:** Worley noise (1996, "A Cellular Texture Basis Function"); IQ's "voronoi edges" + "smooth voronoi"
  (the F1/F2 distance-difference edge); jump-flood algorithm (JFA) for an exact GPU Voronoi if cell count is
  high.
- **GPU shape:** a fullscreen fragment (the aurora/concentric shape-class — fits the existing single-pass
  substrate, no FBO needed for the IQ analytic form). Seed points = a small drifting set animated on `curlFBM`.
- **DRY reuse:** fullscreen-fragment substrate (no new helper); `flow` wave-math drifts the seeds (shared);
  `procedural-color` per-cell tint; the IQ smooth-min `smin` already lives in the blob's `metaball` chunk —
  *harvest it* for soft cell borders (a real DRY harvest, not a re-author). `usePointerVelocityField` repels
  the nearest seeds (cells flee/part around the cursor — the birthdaycolor play).
- **Bar:** N cells with crisp derivative-AA edges (the Golus `fwidth` AA the paper-grid already uses — DRY);
  edges flow continuously, no pop; pointer parts cells locally; both modes; ΔE parity WGSL↔GLSL = 0.

### B.4 ★★★ Caustics — `caustics`
- **What:** the dancing rippled light-on-pool-floor / through-water-glass caustic pattern — the *single most
  "liquid glass" optical phenomenon* and a perfect thematic fit for a library whose identity IS refractive
  glass. Could even underlay glass surfaces as a backdrop.
- **SOTA:** procedural caustic via layered domain-warped distance fields (Martijn Steinrucken/"The Art of Code"
  caustic shader is the canonical cheap form — iterated `abs(sin)` domain folding); the physically-grounded
  form is wavefront/photon-gathering (too heavy — the procedural form is the KISS altitude).
- **GPU shape:** fullscreen fragment, iterated domain-warp (~4-6 folds), the bright veins = the inverse of the
  warped distance. Fits the existing single-pass substrate exactly.
- **DRY reuse:** `flow` wave-math for the warp (shared — the ripples ARE the wave-math, deepening the
  concentric/paper-grid/dot-matrix shared-seam story); `procedural-color` for the warm caustic tint (a pale
  warm-cream light by default); `usePointerVelocityField` perturbs the wave source (cursor = a stone dropped in
  the pool). **Composes thematically WITH glass** — a caustic can render *behind* a `.glass-deep` surface as
  the thing the glass refracts (a real liquid-glass demo).
- **Bar:** bright caustic veins animate continuously on the shared wave clock; cursor drop ripples outward;
  reads unmistakably as "light through water"; PRM → static; ΔE parity.

### B.5 ★★ Metaball-on-a-grid → `iso-flow` (marching-squares contour flow)
- **What:** the level-set/contour idea but on a *living scalar field* — render the iso-contours of a flowing
  noise field as flowing topographic lines. **Note:** the `concentric-levelset.md` chapter already proposes
  level-sets of a *randomly-generated curve*; this is the *complementary* dynamic case (contours of a *live
  flow field*, not a static curve) — flag for the orchestrator as a possible *fold into concentric* rather than
  a separate viz if the gestalt overlaps too much. Listed for completeness; **lower priority** precisely
  because concentric may absorb it.
- **SOTA:** marching squares; IQ "fbm + contour" (`fract(fbm*N)` band trick — the cheap analytic contour).
- **DRY reuse:** the `fract(field*N)` analytic-contour trick is a 2-line fragment over the shared `curlFBM`;
  `procedural-color` ramp. No new seam.
- **Bar:** living iso-lines that flow + merge/split (saddle topology changes) without popping. **Decision flag:
  candidate to MERGE into concentric, not ship standalone.**

### B.6 ★★ Moiré / interference lattice — `moire`
- **What:** two (or N) overlaid line/dot lattices at a slowly-drifting relative angle, the moiré interference
  beating across the field — a hypnotic, *cheap*, high-impact op-art register. (`concentric` already mints
  *ring* moiré; this is the *linear/grid* moiré — distinct gestalt, flag the adjacency.)
- **SOTA:** classic moiré superposition; Amidror "The Theory of the Moiré Phenomenon."
- **GPU shape:** fullscreen fragment, two `sin(dot(uv, dir)*freq)` lattices multiplied/added; the drift is the
  relative angle on a slow clock. Trivially cheap.
- **DRY reuse:** the paper-grid's derivative-AA line render (DRY harvest); `procedural-color`. No new seam.
- **Bar:** visible beating bands that drift; the period/angle are configurator-swept; pointer warps one lattice
  locally; both modes. **Decision flag: adjacency with concentric (ring-moiré) — keep distinct only if the
  linear gestalt is wanted.**

### B.7 ★★ Boids / flocking field — `flock`
- **What:** a flocking swarm (separation/alignment/cohesion) drifting as an organic murmuration — the *agent*
  complement to `constellation`'s static lattice + `dot-flow-field`'s passive advection. The dots have *will*.
- **SOTA:** Reynolds "Boids" (1987); GPU-flocking via a neighbor-grid compute pass (spatial hashing).
- **GPU shape:** **WebGPU compute** (storage buffer of agents, a spatial-hash neighbor pass + an integrate
  pass) → instanced billboard render. The WebGL2 fallback runs a coarser transform-feedback particle pass.
  This is the suite's first *compute-neighbor-query* viz — a real new capability (and the booked
  `W-CONSTELLATION-GPU` "denser lattice → advection compute generalizes" successor is its natural sibling).
- **DRY reuse:** the dot-matrix instanced-billboard render (DRY); `usePointerVelocityField` as a predator/
  attractor the flock flees-or-follows (the play); `procedural-color` tint by velocity.
- **Bar:** the swarm exhibits emergent murmuration (no central control, visible alignment waves); pointer acts
  as attractor/repeller; 5k+ agents at 60fps on WebGPU; PRM → frozen.

### B.8 ★★ SPH / particle-fluid metaballs — `fluid-blob` (a blob successor, flag adjacency)
- **What:** position-based-fluid particles rendered as a metaball surface — a *physically-simulated* lava-lamp,
  the heavyweight sibling of the re-developed `blob`. **Strong adjacency with the blob redevelopment** (the
  `blob.md` chapter owns the lava-lamp satellite work) — flag as a *successor to blob*, not a separate viz,
  unless the *many-particle* fluid gestalt is distinctly wanted beyond blob's satellite model.
- **SOTA:** Müller PBF (2013, "Position Based Fluids"); screen-space-fluid metaball rendering (depth + blur +
  threshold).
- **DRY reuse:** the blob's `metaball`/`smin` SDF surface (DRY harvest); WebGPU compute for the PBF solve.
- **Bar:** N particles settle + slosh as a fluid under a gravity/containment field; pointer stirs. **Decision
  flag: likely a BLOB successor (`W-BLOB-FLUID`), not a standalone — defer to the blob chapter's verdict.**

### B.9 ★★ Chladni / cymatics plate — `chladni`
- **What:** standing-wave nodal patterns (the "sand on a vibrating plate" figures) — `sin(n·πx)sin(m·πy) ±
  sin(m·πx)sin(n·πy)`, the (n,m) mode pair sweeping a vast family of symmetric figures. Mathematically elegant,
  visually striking, *trivially cheap*, and a real distinct register (symmetric standing waves, not flow).
- **SOTA:** Chladni 1787; the analytic nodal-line equation is a one-liner; the modal superposition the rich form.
- **GPU shape:** fullscreen fragment, the nodal field = `abs(chladni(uv, n, m))` thresholded to lines.
- **DRY reuse:** fullscreen substrate; the paper-grid derivative-AA line render for crisp nodal lines (DRY);
  `procedural-color`. `usePointerVelocityField` morphs (n,m) continuously (the cursor *plays the plate* — a
  literal birthdaycolor-like instrument). No new seam.
- **Bar:** (n,m) sweep reproduces the canonical Chladni figures; cursor morphs the mode continuously; PRM →
  static; both modes.

### B.10 ★★ Truchet / Wang-tile flow — `truchet`
- **What:** a grid of randomly-oriented arc/line tiles (Truchet tiles) forming continuous flowing labyrinths/
  maze-curves, with the tile orientations *animating* on the wave-math — a generative-architecture / circuit-
  board / maze gestalt. Distinctly *structured* (vs. the suite's organic-field bias).
- **SOTA:** Truchet 1704; IQ "Truchet patterns + smith chart"; multiscale Truchet (Roberts 2018).
- **GPU shape:** fullscreen fragment, per-cell hash → tile orientation → analytic arc SDF. Cheap.
- **DRY reuse:** the `prng`/`hashString` seeding leaf (DRY — already cross-suite); derivative-AA line render
  (DRY); `flow` wave-math drifts the per-cell orientation phase (shared seam); `procedural-color`.
- **Bar:** continuous flowing curves with no broken joins at tile seams; orientations drift coherently;
  multiscale subdivision configurable; both modes.

### B.11 ★★ Domain-warped FBM marble/nebula — `marble`
- **What:** the IQ "domain warping" showcase field — fbm(p + fbm(p + fbm(p))) — the marbled-paper / nebula /
  smoke gestalt. **Strong adjacency with aurora** (aurora IS a warped-fbm OKLCh field) — flag as a possible
  *aurora preset/medium* rather than a new viz, UNLESS a non-painterly *marble-paper* register is distinctly
  wanted (the warm-cream paper identity makes a literal marbled-endpaper register genuinely on-brand).
- **SOTA:** IQ "domain warping" (the canonical article); paper-marbling (suminagashi) references.
- **DRY reuse:** aurora's warped-fbm core is 90% of this — the DRY question is whether it's an aurora *medium*
  or a sibling. **Decision flag: likely an aurora medium (`marble`/`suminagashi`), not a standalone — defer to
  the aurora chapter.**
- **Bar:** if shipped: a marbled field with the two-level warp reading as ink-in-water paper; both modes.

### B.12 ★★★ Procedural lightning / dielectric breakdown — `lightning`
- **What:** branching fractal lightning / Lichtenberg-figure / neuron-dendrite growth — a *branching* structural
  generative form the suite entirely lacks (everything today is fields, dots, or rings; nothing *branches*).
- **SOTA:** dielectric breakdown model (Niemeyer 1984); diffusion-limited aggregation (DLA); the cheap
  procedural form is recursive midpoint-displacement bolts or an SDF-distance-to-fractal-tree.
- **GPU shape:** for the cheap procedural bolt — a fullscreen fragment scoring distance to a hash-seeded
  recursive bolt path (no simulation). For the rich DLA/breakdown — a multi-pass growth sim (the §B.1 RD
  ping-pong substrate generalizes — DRY with reaction-diffusion's new FBO helper).
- **DRY reuse:** `prng` seeding (DRY); `procedural-color` for the warm-electric tint; the RD ping-pong helper if
  the growth form is chosen; `usePointerVelocityField` strikes a bolt from the cursor (the play).
- **Bar:** branching figures with a believable fractal-dimension; cursor-strike spawns a bolt; PRM → a static
  settled figure (a Lichtenberg figure at rest).

### B.13 ★ (successor-class) Wave-equation ripple field — `ripple`
- **What:** a real 2D wave-equation FDTD ripple pool — interference, reflection off walls, the cursor dropping
  stones. The *physical* sibling of the procedural `caustics`. Lower rank because caustics gives 80% of the
  gestalt at 10% of the cost.
- **SOTA:** 2D wave equation FDTD (the "water ripple" classic); ping-pong height/velocity buffers.
- **DRY reuse:** the RD/fluid ping-pong FBO helper (DRY — the same new substrate capability); `usePointer
  VelocityField` drops stones. **Decision flag: ship caustics first (B.4); ripple is its physical successor.**

### B.14 ★ (successor-class) Slime-mold / Physarum transport network — `slime`
- **What:** the Physarum agent-transport network (Jones 2010) — agents deposit + follow a trail field, growing
  organic transport networks (the "slime mold solves the maze" / mycelium gestalt). Visually stunning, heavy.
- **SOTA:** Jones 2010 "Characteristics of Pattern Formation… Physarum"; Sage Jenson's MPM Physarum is the
  reference WebGPU art piece.
- **DRY reuse:** the flock compute-neighbor + the RD trail-field ping-pong both generalize here (DRY with B.1 +
  B.7) — it's essentially RD + agents. `procedural-color` trail tint.
- **Bar:** emergent transport-network topology; PRM → settled network. **Rank ★: heaviest of the set; a clear
  successor once the RD FBO + compute-agent substrates both exist.**

---

## Part C — synthesis for the orchestrator

**Substrate-capability lens (the real architectural payoff).** The current suite is *all single-pass
fullscreen-fragment or instanced-billboard* — it has NO stateful multi-pass capability. The highest-leverage
brainstorm outcome is not any one picture but **two new reusable substrate helpers**:
1. a **ping-pong FBO / storage-texture multi-pass helper** over `createCanvasLifecycle` (unlocks
   reaction-diffusion, fluid-ink, caustics-physical/ripple, lightning-growth, slime) — and it is the booked
   home for the aurora-Kuwahara *literal* multi-pass FBO successor (`PROCEDURAL-SUITE.md` records that as a
   separate future capability — this helper IS it);
2. a **compute neighbor-query helper** (spatial hash) over the WebGPU substrate (unlocks flock, slime, and the
   booked `W-CONSTELLATION-GPU` dense-lattice successor).
Building either pays for itself across 3+ viz — the DRY/KISS bar is *met by construction*, not contrived.

**Recommended priority tranche (top 5, by leverage × distinctness × DRY-clean):**
1. **reaction-diffusion** (B.1) — mints the ping-pong substrate; the most-wanted missing primitive.
2. **caustics** (B.4) — the single best thematic fit for a liquid-glass library; single-pass, cheap, composes
   *with* glass surfaces.
3. **fluid-ink** (B.2) — deepens the shared `flow` wave-math; the BD liquid-ink north-star gestalt.
4. **voronoi-flow** (B.3) — the shattered-glass register; harvests `smin` + Golus AA (pure DRY).
5. **chladni** (B.9) — cheapest high-impact addition; a literal cursor-played instrument (birthdaycolor play).

**Adjacency decisions to resolve (flagged, do NOT silently ship as standalone):**
- `iso-flow` (B.5) → candidate **fold into concentric** (dynamic level-sets).
- `moire` (B.6) → adjacency with concentric's ring-moiré; ship only if the *linear* gestalt is wanted.
- `fluid-blob`/SPH (B.8) → likely a **blob successor** (`W-BLOB-FLUID`), defer to the blob chapter.
- `marble` (B.11) → likely an **aurora medium** (`marble`/`suminagashi`), defer to the aurora chapter.
- `ripple` (B.13) + `slime` (B.14) → **successors** once the ping-pong/compute substrates land.

**Every idea inherits the suite discipline for free** (offscreen-park, live-PRM-one-static-frame, consumer-
owned DPR, warm-cream identity + presets-in-consumers, one-context-per-route, `usePointerVelocityField` play,
configurator-driven) — the brainstorm's job was the *math + the new substrate seams*, and the discipline is
already a solved, shared inheritance.
