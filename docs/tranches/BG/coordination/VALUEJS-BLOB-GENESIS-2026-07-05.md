# VALUEJS-BLOB-GENESIS — the blob genesis brief (value.js Tranche S, W0-8)

**To**: the glass-ui BG inbox (`tranche/BG` live → 5.0.0). **From**: value.js Tranche S.
**Authority**: the owner-ratified Q7 ruling — "The blob likely needs to be re-built from first
principles, starting with a SOTA assay and archaeological survey of the past implementations
hitherto" (`value.js audit/RATIFICATION-2026-07-05.md §2.2`) — first-principles **JOINT**
rebuild, **full presence at every viewport**, and the GooBlob→`Blob` symbol rename.
**Companion to**: the already-dispatched `GLASSUI-S-ASKS` letter at this repo's `01c32375`
(asks **L5** — blob first-principles co-rebuild — and **L17** — the rename). This document is
the shared ground that dispatch stamp promises: the archaeology, SOTA assay, and 10 producer
questions L5 references.
**Source of record**: `value.js docs/tranches/S/audit/blob-genesis.md` @ `4567a81` (their tree;
read-only from here). **Status**: relayed verbatim, unmodified below the fold — this is shared
ground, not a summary; answer the §4 questions in-place or in a reply doc in this same
`coordination/` directory.

---

# S.W0-8 — BLOB GENESIS: archaeology · SOTA assay · the joint-rebuild brief

**Mandate**: owner Q7 ruling — "The blob likely needs to be re-built from first principles,
starting with a SOTA assay and archaeological survey of the past implementations hitherto"
(`audit/RATIFICATION-2026-07-05.md §0` Q7, encoded §2.2.2). **Provenance**: value.js
`tranche-q`; glass-ui read at `tranche/BG` (foreign tree, read-only). **Consumers**: S.W6 blob
items (`waves/S.W6.md` W6-4) + the glass-ui letter (`letters/GLASSUI-S-ASKS.md` L5/L17 — this
document is the shared ground the dispatch stamp §3 promises). **Consumed**:
`audit/lanes/blob-greenfield-tech.md` · `audit/lanes/design-blob-atmosphere-vision.md` ·
`audit/seeds/w6-blob-redress.md` + `audit/seeds/SEEDS.md` w6 riders · glass-ui's own
`goo-blob/README.md` + `goo-blob/RESEARCH.md`.

The one-line thesis: **three generations, one conserved soul.** The orbit→merge→absorb→emerge
satellite choreography, the seeded determinism, and the "living calm bead" intent survived every
substrate swap; what kept being replaced was the *rendering* substrate (SVG filter → demo WebGL2 →
producer dual-backend) and what was never solved is the *composition* (scale, placement, presence)
and the *boundary* (pointer, palette, preset). The genesis rebuild is the first generation where
both repos own their half explicitly.

---

## 1 · ARCHAEOLOGY — every implementation hitherto

### 1.1 The value.js SVG-goo era (2026-02-27 → 2026-04-05)

**Born** `475f8f3` ("animated satellite blobs with gooey filter, share link, cursor avoidance"):
a `useSatelliteBlobs` composable (562 LoC at birth) driving absolutely-positioned satellite divs
around a `WatercolorDot` hero, composited through two SVG filters. Later factored (`3be3f42`)
into `orbital.ts` (244 LoC) + `cursor-repulsion.ts` (104) + `satellite-types.ts` (69) +
`useSatelliteBlobs.ts` (214). Recovered in full from `git show 88f8f09^:…`.

**The mechanism** (from `SvgFilters.vue` at `88f8f09^`, lines 27–72):

- `#gooey-filter` — the classic blur+threshold goo: `feGaussianBlur stdDeviation=14` →
  `feColorMatrix` alpha `12 −5` threshold → `feGaussianBlur 1` → `feBlend` re-composite.
- `#watercolor-filter-hero` — `feTurbulence fractalNoise 0.022 / 4 octaves` +
  `feDisplacementMap scale=2.7` for the deckled edge.
- Satellites: flat color discs, `translate3d` GPU-composited, per-vertex `border-radius`
  animation (8 corners, staggered phases), CSS `drop-shadow` on a *separate* wrapper because
  "Safari can't chain url() + drop-shadow() in one filter" (`HeroBlob.vue` at `88f8f09^`,
  scoped-style comment).

**What it did well** — and what the rebuild should keep honoring:

1. **The 4-phase satellite FSM was born here**: `orbiting → merging → absorbed → emerging`
   (`475f8f3` commit body) — the exact machine that survives, renamed, into the producer's
   `useBlobSatellites` today. The choreography is the conserved asset of all three generations.
2. **Deterministic seeding** (mulberry32 PRNG, `hashString`) and **incommensurate multi-frequency
   wobble** (two radius terms 0.15–0.30 Hz + 0.25–0.45 Hz plus per-axis 0.10–0.24 Hz drift,
   `orbital.ts` at `88f8f09^`) — organic non-circular paths that never re-phase. Also conserved.
3. **Zero GL contexts** — cheap, no context budget, no context loss, and the satellites were DOM
   elements so **silhouette hit-testing was free**. (The WebGL migrations silently lost this; it
   resurfaces 4 months later as the L5 pointer-shaping ask.)
4. Safari-compat discipline in the filter graph itself (feBlend over `feComposite atop`,
   the shadow/goo wrapper split).

**What killed it** (`88f8f09`, 2026-04-05, −798 LoC): the blur+threshold approximation ceiling.
A 14px `feGaussianBlur` re-runs over the whole layer every frame (filter fill-cost, CPU/GPU
filter path); the alpha-threshold "goo" has no analytic edge (halo/fringe class, no per-pixel
shading — flat discs + drop-shadow was the entire material story); and reduced-motion had to
*disable the goo entirely* (`475f8f3` body: "Reduced-motion fallback disables gooey filter") —
the register degraded to nothing rather than a composed rest pose. The WebGL2 field replaced it
the same day.

### 1.2 The demo WebGL2 metaball era (2026-04-05 → 2026-06-11)

**Born** `06929a4` ("WebGL2 metaball component with affective state FSM", +1211 LoC):
`demo/@/components/custom/goo-blob/` — the leap from filter approximation to an analytic
per-pixel field.

**The mechanism** (from `git show e32111c^:demo/@/components/custom/goo-blob/…`):
`sdCircle` body + `MAX_SATS 4` satellites merged by polynomial `smin`, 3-octave FBM edge
displacement, `fwidth`-class AA, pointer deformation (`metaball.frag.glsl` lines 40–133);
**HSV color perturbation** — `rgb2hsv`/`hsv2rgb` with hue/sat/brightness noise swings (lines
93–157). Around it: `useBlobMood` (the 5-mood FSM — idle/happy/curious/sleepy/excited — born
here), `useBlobPointer`, `useBlobSatellites` (the FSM carried over from era 1), and
`useMetaballRenderer` (WebGL2 lifecycle, context-loss recovery, reduced-motion support).

**What it did well**: the architecture that still stands — analytic single-pass 2D SDF field,
the mood FSM, context-loss recovery, and the era-1 choreography preserved intact. HeroBlob's
mood triggers (click→happy, hover→curious, idle→sleepy) date from its integration commit
(`88f8f09` body).

**What killed it** (`e32111c`, 2026-06-11, N.W5.A — "blob fork (1270 LoC) → glass-ui goo-blob"):

1. **The fork problem** — by then glass-ui carried the same engine, better; a 1270-LoC duplicate
   violated glass-ui-first (`feedback_glass_ui_first_class.md`) and at-the-root discipline. The
   demo kept only a 62-LoC shell (`HeroBlob.vue`, verified live this session).
2. **Flat-HSV color math** — perceptually non-uniform perturbation (the muddy/garish drift OKLCh
   exists to prevent; the producer's README §Color notes names the gamma trap class the fork
   also lived in: "linear-in-without-an-OETF-out ships visibly ~2.2× too dark",
   `goo-blob/README.md:293`).
3. No gamut discipline, no lit surface, no quiescence economics — all of which the producer era
   built.

### 1.3 The glass-ui producer era (2026-06 → live; `../glass-ui`, read-only)

**The living engine**: `../glass-ui/src/components/custom/goo-blob/` — 5,246 LoC measured this
session (`GooBlob.vue` 343 · `types.ts` 494 · `useMetaballRenderer.ts` 427 · `metaball.frag.ts`
510 · `metaball.wgsl.ts` 529 + composables/shaders). ~30 tranches (AT→BG) of recorded tuning
(`blob-greenfield-tech.md §0`). **Already rebuilt from first principles once**: WS5-02
"Goo-blob rebuilt from first principles … rename goo-blob → just 'blob'" — status **PARTIAL
(rebuild landed; rename UNADDRESSED)** (`glass-ui docs/tranches/BG/DIRECTIVE-LEDGER.md:166`).

**What it does well — the settled axis their own RESEARCH.md ratifies (do NOT re-derive):**

| Axis | Verdict | Cite |
|---|---|---|
| Field math | IQ-2024 *normalized* smin (quadratic `k *= 4.0` + circular variants), analytic gradient carried through the merge (`sminG` — no 4-tap normal), dome-Z lift, POS_SCALE regime, premultiplied alpha. Gate-green, 12 `proof:blob-*` locks. | `goo-blob/RESEARCH.md:27`; `shaders/sdf-body.glsl.ts:38-47`; `shaders/metaball.frag.ts:170-174` |
| Motion doctrine | De-synced multi-sine breath (~6 bpm), critically-damped pointer spring (response 0.18 / ζ 1.0), symplectic-Euler click impulse, volume-preserving squash, Codrops 15-sphere pseudopod trail. SOTA, preserved. | `goo-blob/RESEARCH.md:28` |
| Render floor | **"WebGL2 single-pass 2D-SDF is the PERMANENT floor. WebGPU is NOT warranted."** Ratified, with the reasoning (flat `O(W·H·N)`, no overdraw, `fwidth`-AA resolution independence). | `goo-blob/RESEARCH.md:139` (§4.1) |
| Color | In-shader OKLCh perturbation + hue-preserving gamut clamp + mandatory sRGB OETF + IGN dither; color math spliced from the shared `procedural-color` chunk both blob and aurora compose. | `goo-blob/README.md:78-82, 290-297` |
| AA | `fwidth`-derivative AA on the SDF isoline (`metaball.frag.ts:292`) + Toksvig normal-variance specular clamp (`:448`) — the right tool; MSAA off by design. | `blob-greenfield-tech.md §4` |
| Perf lifecycle | **GAP-4 LANDED**: single canvas (zero second `createElement("canvas")`), IntersectionObserver + `document.hidden` + PRM park, quiescence (event-scheduled rAF). Confirmed by the producer: "Verify at your 5.0.0 adopt." **The rebuild must not regress this.** | `glass-ui docs/tranches/BG/coordination/VALUEJS-R-RELAY-2026-07-04.md:117-120` |
| Config | The ~50-knob sprawl already collapsed to **8 cohesive atoms** (`geometry/satellites/membrane/color/surface/interaction` + `quality/tempo`). | `goo-blob/README.md:145-147`; seed dist-verified `w6-blob-redress.md §b` |

**What ails it — the reasons the owner ordered generation three** (all measured, none fatal to
the engine core):

1. **The WGPU twin is dead weight**: `metaball.wgsl.ts` (529 LoC) + `wgpuSetup.ts` (171) +
   `uniformBridgeWGPU.ts` (327) are condemned by the producer's own book
   `BG.W-VIZ-SUBSTRATE-DELETE2` ("goo-blob/dot-matrix/goo-dot WGPU delete, GATED on per-viz
   arm-probe" — `glass-ui docs/tranches/BG/FINAL.md:99`; ledger `BE-BF-LEDGER.md:141`). It also
   *causes* a live defect: Chrome takes WebGPU, Safari takes WebGL2 — the less-exercised path —
   while the aurora holds a second WebGL2 context: the Safari dual-surface contention P0
   (`blob-greenfield-tech.md §3-P0`).
2. **Frame pacing lurches**: every frame delta clamps to 50 ms and advances the whole sim
   (`useMetaballRenderer.ts:225` per the tech lane); a run of long frames = 50 ms lurches on a
   76 px mark — the "spazz" hypothesis (`blob-greenfield-tech.md §3-P0`).
3. **Deformation is not scale-aware**: ±35%/frame body-area churn measured under pointer-storm
   (561→1429 px², decel-kick + follow spring + satellite excursion summing) — tuned against a
   studio render, over-reads at hero scale (`blob-greenfield-tech.md §1, §3-P0`).
4. **The default identity hides the show**: `orbitRadius 0.17 < bodyRadius 0.22`
   (`goo-blob/types.ts:323-330`) — satellite centers orbit *inside* the body skin; plus the
   quiescence park freezes satellites at rest, often absorbed. Zero distinct beads at rest,
   measured (`blob-greenfield-tech.md §1`; `design-blob-atmosphere-vision.md P1-3`).
5. **Per-satellite ink is impossible**: `uSatColor[]` absent from the dist at 4.2.0 (GAP-1,
   dist-grep confirmed, `w6-blob-redress.md §b`). The sanctioned home is **F9.R1
   `W-BLOB-SATELLITE-SHADE` — PENDING**: "the per-satellite `uSatColor[]` GL color-seam widen +
   `bodyLightness`/`lightnessFloor` on deriveBlobPalette; byte-identical default; rides 5.0.0"
   (`glass-ui docs/tranches/BG/execution/bg-build-map.md:101`).
6. **The root square eats sibling clicks**: canvas `pointer-events:none`, root `auto` — in the
   corner-break composition the dead corners intercept About-card clicks (hit-test at (770,150),
   `w6-blob-redress.md §d-3`; now the L5 pointer-shaping append).
7. **The ONE sanctioned extension is unbuilt**: the `uBackdrop` Snell-refraction sampler over a
   glass-ui-rendered backdrop (aurora FBO / baked gradient) — "a portable WebGL2 primitive…
   NOT a WebGPU re-open, NOT a DOM-sample" (`goo-blob/RESEARCH.md §4.2`, lines 155–183).

**The size identity every consumer calculation reduces to** (seed-derived, load-bearing for §3):
canvas is CSS-sized 1.6× its wrapper, world POS_SCALE = 1/1.6 = 0.625
(`goo-blob/constants.ts:22-28`) — the factors cancel, so **visible bead px = 2 · bodyRadius ·
wrapper px** (`w6-blob-redress.md §Learnings 2`).

### 1.4 The conserved through-line

Across all three: the satellite FSM + seeded incommensurate wobble (era 1), the analytic SDF
field + mood FSM (era 2), the OKLCh material + motion doctrine + lifecycle economics (era 3).
Each era ALSO lost something the previous had: era 2 lost free silhouette hit-testing (DOM →
canvas); era 3's default lost the visible satellite show (contained-droplet identity). The
genesis rebuild's job is to keep all conserved assets **and give the two losses back**.

---

## 2 · SOTA ASSAY — the current art, and what neither prior implementation used

### 2.1 Field math (settled — producer is AT the frontier)

The reference is IQ's 2024 smin rewrite — normalization, the kernel ("CD") family
(quadratic/cubic/quartic/circular), exact-exponential smin
([iquilezles.org/articles/smin](https://iquilezles.org/articles/smin/)). The producer implements
the normalized quadratic + circular variants with the gradient carried analytically
(`sdf-body.glsl.ts:38-47`) — nothing to add. One property worth stating for the joint contract:
**a smin field is a distorted approximation of true distance** (the article's own caveat), so
any CPU-side hit-test mirroring the field (§2.5) needs a tolerance band, not an exact-zero test.

### 2.2 Analytic vs marching (settled — the ratified floor is SOTA-correct)

The three public approaches: marching-squares / instanced-geometry contours
([Codrops 2021, 2D metaballs with WebGL2](https://tympanus.net/codrops/2021/01/19/drawing-2d-metaballs-with-webgl2/))
— geometry passes, resolution-dependent contours; raymarched 3D SDF droplets
([Codrops 2025, droplet-like metaballs](https://tympanus.net/codrops/2025/06/09/how-to-create-interactive-droplet-like-metaballs-with-three-js-and-glsl/))
— per-fragment step loops, real volume, heavy; and the analytic single-pass 2D field with
derivative AA — flat cost, exact silhouette, fake volume by gradient lift. For a flat UI mark at
≤4 nuclei the third dominates on every axis, which is exactly the producer's permanent-floor
ratification (`goo-blob/RESEARCH.md:139`). **No architecture change is on the table; the owner's
"first principles" targets identity, composition, and boundary — not the field algorithm.**

### 2.3 Stylized NPR goo — what the field knows that neither implementation used

1. **Backdrop refraction (the 2025 liquid-glass register)** — the blob is a self-lit opaque
   overlay today; the field's premium droplets sample and bend what's behind them. The producer
   already sanctioned the portable form: a `uBackdrop` sampler + Snell displacement off the
   analytic normal (`goo-blob/RESEARCH.md §4.2`). Unbuilt. In the demo's corner-break
   composition (card content directly behind the bead) this is the single highest-leverage
   material upgrade available.
2. **SDF-band wet-edge darkening** — watercolor pigment accumulates at wash boundaries; the
   library's own `WatercolorDot` carries a wet edge, the blob does not — yet the blob has the
   *distance field*, so `darken ∝ smoothstep(band, 0, |d|)` on the isoline is nearly free and
   would visually sibling the two components (the stated design intent,
   `goo-blob/README.md:5-9`). The NPR-watercolor register is current art
   ([Codrops 2026, Susurrus watercolor world](https://tympanus.net/codrops/2026/04/24/susurrus-crafting-a-cozy-watercolor-world-with-three-js-and-shaders/)).
3. **Toon/quantized shading off SDF bands** — cheap NPR variant (posterized L steps on the dome
   lift); noted as a register option, not an ask.

### 2.4 Mobile-GPU perf envelope (the Q7 full-presence constraint made concrete)

Every mainstream mobile GPU is tile-based (Adreno/Mali/Apple) and **fragment/fill-rate bound**
([Android Developers, efficient render passes](https://medium.com/androiddevelopers/efficient-render-passes-on-tile-based-rendering-hardware-621070158e40);
[MDN WebGL best practices](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices)).
The consequences for a blob that is now PRESENT at every viewport:

- **Cost is quadratic in DPR** — the producer already clamps DPR ≤ 2× and ships
  `quality:"half"` (`goo-blob/README.md:312, 325-327`); phones ship DPR 3 — the <lg presence
  budget should state the effective backing-store policy explicitly (non-integer DPR also risks
  moire, [Emscripten WebGL notes](https://emscripten.org/docs/optimizing/Optimizing-WebGL.html)).
- **iOS low-power mode throttles rAF to 30 fps and is effectively undetectable**
  ([WebKit 168837](https://bugs.webkit.org/show_bug.cgi?id=168837),
  [215745](https://bugs.webkit.org/show_bug.cgi?id=215745);
  [Popmotion](https://popmotion.io/blog/20180104-when-ios-throttles-requestanimationframe/)).
  A 33 ms frame is *steady state* on a throttled phone, not an anomaly — frame pacing must
  integrate it smoothly. The current 50 ms hard clamp turns any stall-run into visible lurches
  (§1.3-2); the rebuild wants accumulator/smoothed pacing, not a bigger clamp.
- **Live GL contexts are a hard budget** — browsers cap ~8/page (`goo-blob/README.md:279-281`),
  and the seed proved **hidden-but-mounted holds a live GL context** (`waves/S.W0.md` W0-8 row;
  `w6-blob-redress.md` — the mount-gate finding). Q7 full presence means blob + aurora coexist
  at <lg: the single-full-cost-surface policy (L5) is *mobile-critical*, not just a Safari
  desktop concern.

### 2.5 Pointer/hit-testing for non-rectangular canvases

The platform removed the canvas hit-region API; the field standard is a second offscreen "hit
canvas" or path-based `isPointInPath`
([Konva custom hit region](https://konvajs.org/docs/events/Custom_Hit_Region.html);
[W3C wiki, canvas hit testing](https://www.w3.org/wiki/Canvas_hit_testing)). **An SDF engine can
do strictly better and neither prior implementation used it**: the body + ≤4 satellite positions,
radii, and smoothK are already CPU-side simulation state (they upload as uniforms every frame) —
evaluating the same smin field at the pointer coordinate on the CPU is a handful of flops and
yields an *exact-silhouette* hit test with zero readback. That restores what the SVG era had for
free (§1.4) and is the principled form of the L5 pointer-shaping ask (with the §2.1 tolerance
caveat).

---

## 3 · THE GENESIS BRIEF — the joint-rebuild contract

### 3.0 Ownership (RATIFICATION §2.2.2, verbatim split)

- **The producer (glass-ui) owns the ENGINE** — the single-WebGL2 single-pass 2D-SDF core (their
  own permanent-floor ratification, `goo-blob/RESEARCH.md:139`), the material/shading grammar,
  the satellite/mood/pointer physics, the canvas lifecycle + perf envelope (GAP-4 non-regression
  binding), the exported presets, and the hit-test seam. L5 carries the standing asks into the
  rebuild; F9.R1 is the sanctioned home for the satellite color-seam.
- **value.js owns the CONSUMER CONTRACT** — the config atoms it consumes at ONE site
  (`demo/@/composables/color/useAtmosphere.ts:32` + `HeroBlob.vue:36` + `BlobPane.vue:12-13`
  are the only three import sites, verified live), the exported HERO preset consumption, the
  accent-live → `paletteStops` feed, the mood bindings (scrub→excited, save/copy→happy,
  idle→sleepy — pure consumer wiring on the exposed `setMood/nudge/pulse`,
  `w6-blob-redress.md §Mood`), and the SDF-shaped pointer semantics at the demo boundary
  (click = copy, with the drip receipt, `design-blob-atmosphere-vision.md §2`).
- **value.js also owns the demo's COMPOSITIONAL LAW** (§3.2).

### 3.1 The engine floor (what generation three keeps, deletes, and gains)

**Keeps** (the settled axis, §1.3 table): IQ-normalized smin + analytic gradient · OKLCh
perturb + gamut clamp + OETF + dither · `fwidth` AA · the motion doctrine · quiescence + the
GAP-4 lifecycle · the 8-atom config shape. **Deletes**: the WGPU twin (DELETE2 — the rebuild
should land WebGL2-only from day one, which also dissolves the Chrome/Safari backend split
feeding the dual-surface P0). **Gains** (the L5 slate + this assay): scale-aware deformation
ceiling · satellites-visible-at-rest posture · throttle-robust frame pacing (§2.4) ·
`uSatColor[]` + `bodyLightness`/`lightnessFloor` (F9.R1) · SDF hit-test seam (§2.5) · exported
HERO preset with the overscan/POS_SCALE headroom the ≥96 px bead needs · the mobile perf
envelope as a first-class constraint · optionally `uBackdrop` refraction + the wet-edge register
(§2.3, producer's call). **Rename**: GooBlob → `Blob`, symbol AND subpath, at 5.0.0 (L17;
owner's verbatim order supersedes the earlier subpath-only ruling — flagged honestly in the
letter's dispatch stamp).

### 3.2 The demo's compositional law (value.js-owned; seed-proven numbers)

1. **Corner-break placement**: the bead's center sits exactly on the card's corner-radius
   origin — `top/right: calc(var(--radius-card) − var(--blob-fp)/2)`; proven exact to the pixel
   ([695, 136.90625] ≡ measured, `w6-blob-redress.md §a`). The blob is the pane slot's topmost
   ornament — a LATER SIBLING of the card, slot-assigned layer, ZERO per-instance z-index
   (`w6-blob-redress.md §Learnings 3`).
2. **Footprint**: `--blob-fp: clamp(11rem, 26cqi, 13rem)` — the ratified rider (SEEDS.md w6
   rider 1; the specced 9rem/18cqi floor measured as a SHRINK and was refuted).
3. **Overflow law**: **≥ 25% of the bead's diameter overflows outside each broken edge** — the
   geometric maximum at center-on-radius-origin is (R−r)/2R ≈ 25–27% measured (SEEDS.md w6
   rider 2; the 40% clause was jointly unsatisfiable).
4. **Visible bead ≥ 96 px** — conditioned on the producer HERO preset headroom (consumer ceiling
   is ~94 px via bead = 2·bodyRadius·wrapper without starving the satellite ring; SEEDS.md w6
   rider 3). Producer miss in the window → recorded as the wave's producer-gap row, re-verified
   at W8.
5. **Nothing paints over the bead**; the card's cartoon-offset shadow never slices it; the bead
   casts its own (`design-blob-atmosphere-vision.md §2`).

### 3.3 The presence law (Q7 — FULL PRESENCE AT EVERY VIEWPORT)

The owner flipped absence: the blob is PRESENT at every viewport, and "figure out an idiomatic
way" is W6 design scope with perf as a hard gate (`RATIFICATION §2.2.1`). What the seed's
evidence contributes as *constraints*, its mount-gate cure being obsolete:

- **Presence is designed, not toggled**: hidden-but-mounted holds a live GL context, so
  `display:none`/`visibility:hidden` blobs are forbidden — the <lg presence needs a real
  footprint + placement, and any true unmount/remount ceremony must ride the substrate's
  context lifecycle, not CSS.
- **The forbidden state is the 390 px clipped smudge**: mobile canvas right edge 401.8 > 390
  viewport measured pre-seed (`design-blob-atmosphere-vision.md P1-4`); the <lg composition must
  keep `scrollWidth == viewport` (the seed proved the layout math that achieves this).
- **The mobile perf envelope is a PRODUCER constraint** (letter L5, producer-visible): blob +
  aurora both alive at <lg on a DPR-3 tile-based GPU under a possible 30 fps rAF throttle —
  the single-full-cost-surface policy and the DPR/quality ladder are engine deliverables, not
  consumer tuning.

### 3.4 What must not regress (both repos)

GAP-4 (single-canvas · IO/hidden/PRM park · quiescence) — producer-confirmed LANDED, value.js
re-verifies at the W8 adopt (`VALUEJS-R-RELAY-2026-07-04.md:117-120`). The 12 `proof:blob-*`
locks on the settled math. The WCAG 2.2.2 pause seam (`v-model:paused`) and the PRM
composed-rest-pose discipline (`goo-blob/README.md:340-350`).

---

## 4 · OPEN QUESTIONS FOR THE PRODUCER (numbered; relayed with the letter)

1. **HERO preset headroom** — will the rebuilt engine grant overscan/POS_SCALE headroom so a
   ≥96 px visible bead AND ≥2 *detached* satellites coexist at the 13rem footprint? (Consumer
   ceiling measured 94 px; orbit reach 0.40+0.09 = 0.49 already grazes the canvas edge,
   `w6-blob-redress.md §d-2`.)
2. **Satellites-at-rest posture** — never-park-while-`satelliteCount>0` (the 24 k px/frame pass
   measured <7% of the page's GPU cost, `blob-greenfield-tech.md §4`) or a frozen
   visible-orbit rest pose? And how does the choice compose with the GAP-4 quiescence economics
   you must not regress?
3. **Pointer seam shape** — an engine-exposed SDF `hitTest(x, y)` (the CPU field mirror, §2.5)
   or a managed root `pointer-events` seam? The demo needs click-to-copy on the silhouette and
   pass-through everywhere else in the corner-break overlap strip.
4. **Mobile envelope numbers** — what does the engine promise at <lg: the DPR clamp policy on
   DPR-3 devices, an auto `quality:"half"` derivation, and a target sustained frame rate on a
   mid-tier tile-based GPU with blob + aurora both present (Q7 makes this the real requirement)?
5. **Frame pacing under throttle** — will the rebuild replace the 50 ms dt clamp with
   accumulator/smoothed pacing so iOS low-power 30 fps (undetectable, §2.4) reads as steady
   state and stall-runs never lurch?
6. **Single-full-cost-surface policy** — where does aurora↔blob coordination live: a substrate
   registry (`createGpuSubstrate`-level) or a consumer-visible atom? Who yields at <lg?
7. **Sequencing** — does the genesis rebuild land AFTER `BG.W-VIZ-SUBSTRATE-DELETE2` (WebGL2-only
   from day one), and does the L17 rename land before WS12's export-surface regen freezes the
   window (your own dispatch-stamp recon's flag)? Does the WGPU ΔE-parity harness retire with
   the twin?
8. **Scale-aware deformation** — is the ±35%/frame churn ceiling damped by rendered footprint
   *inside* the engine (a uniform derived from canvas size) or exposed as an interaction atom?
9. **`uBackdrop` refraction + the wet-edge register** — is the sanctioned §4.2 extension
   in-scope for the genesis cut or booked? If in: what backdrop texture should the demo provide
   (aurora FBO vs baked gradient)? And is SDF-band wet-edge darkening (§2.3-2) wanted in the
   genesis surface grammar, or is the lit-droplet register final?
10. **Atom stability** — does the rebuild preserve the 8-atom `BlobConfig` partition and names
    (`geometry/satellites/membrane/color/surface/interaction/quality/tempo`) so the value.js
    consume sites survive the 5.0.0 cut with rename-only changes? (The chord-dent verify, G-4,
    is assumed carried inside the rebuild — confirm.)

---

*Cross-references: `RATIFICATION-2026-07-05.md §2.2` (the three-part Q7 encoding) ·
`waves/S.W0.md` W0-8 (this item) · `waves/S.W6.md` W6-4 (the consuming wave) ·
`letters/GLASSUI-S-ASKS.md` L5/L17 + dispatch stamp (the relay vehicle) ·
`audit/seeds/w6-blob-redress.md` + `SEEDS.md` w6 riders (the measured law).*
</content>
</invoke>
