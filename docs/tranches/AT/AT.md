# Tranche AT — the blob primitives + the WebGL/color transposition + the dock perfection + the AS-residual fold

AT is glass-ui's post-AS tranche (glass-ui@3.2.0, verified sound). It is forward
work AS correctly named-forward — not remediation — augmented + hardened by a
two-round, 24-lens deep audit (W0: 6 lenses authoring the plan; W0b: 18 lenses —
blob/aurora SOTA, dock perfection, hardening + the value.js color question — that
sharpened every wave and added the dock as a co-headline). The plan basis is
`audit/W0-L{1..6}` + `audit/W0b-{A1..A6,B1..B6,C1..C6}` + the design slices in
`design/`.

Three braided headlines:

1. **The blob primitives, lifted as a forcing function for three transpositions.**
   goo-blob (WebGL2 metaball) + watercolor-dot (CSS/SVG) move from value.js's demo
   into proper subpaths — but a faithful lift DRIVES (per the user's "transpositions
   for elegance/simplicity/performance are desirable; no legacy"): (a) ONE
   `useWebGLCanvas` substrate aurora + goo-blob share, with the zero-consumer
   `frostShader.ts` orphan deleted AND aurora's missing `webglcontextrestored`
   handler + an off-screen `useIntersectionPause` gate absorbed (the extraction is
   strictly ADDITIVE on robustness — `audit/W0b-A3`); (b) the color-resolver as a
   first-class injected `ColorResolver` seam (required-inject; `defaultBlobColorResolver`
   opt-in from an extracted `/color` leaf) replacing the demo's DOM-coupled
   1×1-canvas hack; (c) the metaball shader transposed to OKLCh **plus** the four
   citable SOTA quality gaps the W0b read found (`fwidth` AA, Quilez quadratic
   `smin`, rotated-octave FBM, the linear-color-space OETF correctness bug).

2. **Perfect the dock.** The dock is functionally sound (no lens found a shipped
   bug) but its verification fabric + a11y contract are thin and AQ.W6's VT-fork
   left two quiet-wrong motion paths. AT folds the dock as W6/W7 slices (file-disjoint
   from the blob graph — no successor tranche needed): the `proof:strict-templates`
   binding-guard at the right altitude (closing the silent-no-op class library-wide,
   not one dock prop), the a11y + state-machine contract test, the VT-fork
   motion-parity reconcile, and the overflow 3-prop→one-enum clean break.

3. **The color consolidation + the AS-residual correctness fold.** glass-ui's
   runtime color is ALREADY single-sourced on value.js (inv-K-2); AT finishes it
   (the `/color` leaf is the one home; `inv-AT-color` + gates lock the tier split and
   the acyclic graph) and folds the AS-residual defects the audit verified at HEAD
   (the dead `optionalPeerDependencies` field that silently makes every peer
   required; the DataTable `@vueuse` root-barrel leak; the keyframes `||` peer tested
   in no context; `supportsPostTask` 0-callers; the R4/R6 quiet paths) + the slipped
   Fraunces `@font-face` ship.

Ships as **3.3.0** (additive `/color` + `/goo-blob` + `/watercolor-dot` subpaths +
the `useWebGLCanvas` substrate; the only breaking surface is the dock `overflow`
prop collapse, scoped to a 0-consumer `wrap` boolean → not a major).

## §The question

Can glass-ui lift goo-blob + watercolor-dot DRIVING the WebGL-substrate + color-leaf
+ OKLCh-shader transpositions (with the SOTA quality + the linear-color-space
correctness folded), PERFECT the dock (the binding-guard + a11y + motion-parity +
the overflow clean break), and finish the value.js color consolidation (runtime-JS
on value.js, CSS tokens native, the graph a proven DAG) — WHILE folding the
AS-residual correctness debts (`peerDependenciesMeta`, `proof:vueuse-free-root`, the
peer-matrix, `supportsPostTask`, R4/R6) and the Fraunces ship — as a **3.3.0** minor,
all gates fail-closed-green, no overfitting (props tallied not just components), no
legacy, every cross-repo item name-forward under inv-16?

## §Success criteria

AT succeeds when:

- **The substrate transposition lands additively (W2).** ONE `useWebGLCanvas`
  (compile→link→quad→uniforms + the RAF/visibility/**off-screen-pause**/
  context-loss-AND-**restore**/reduced-motion/ResizeObserver harness) is consumed by
  aurora AND goo-blob; `frostShader.ts` DELETED; aurora is byte-parity (the
  `proof:webgl-golden` ±1-LSB GPU floor) AND scheduling-parity (the table) identical
  to 3.2.0; the substrate does NOT bake aurora's quad/attrs/DPR choices (consumer-#2
  usability gate). The `/color` leaf is hoisted (C3-1).
- **watercolor-dot ships (W3).** `/watercolor-dot` — component + `useWatercolorBlob` +
  an internalized namespaced auto-mounted SVG filter + a private `prng` leaf; renders
  with ZERO consumer wiring; seeded-shape spec on an asymmetric color.
- **goo-blob ships on the GAMMA shader + the seam (W4).** `/goo-blob` consumes W2;
  `ColorResolver` REQUIRED-injected (no baked default; a no-resolver mount throws a
  dev error naming `defaultBlobColorResolver`); the W4 shader paints in GAMMA sRGB
  (the faithful lift); `dist/goo-blob.js` value.js-free (the two-tier
  source-graph + dist proof); the demo story is consumer #2 (≥2 met); off the root
  barrel; premultiplied-alpha context asserted.
- **The shader-quality wave (W5).** `fwidth` AA + Quilez quadratic `smin` (fudge
  deleted, `--blob-smooth-k` token) + rotated-octave FBM + the OKLCh perturbation
  with the **linear flip + the `linearToSrgb()` OETF output stage** (D1's own gated
  change), exact value.js Ottosson matrices (transposed), `radians()` hue,
  hue-preserving chroma-reduction. Gate: the 8-assertion CPU-equivalence over a
  textually-parallel `metaball-color.glsl-port.ts` (asymmetric witness `#3a7bd5`) +
  `proof:webgl-golden` on-GPU zero-perturb identity; the manual-visual line scoped to
  the `--blob-edge-glow-l` token only.
- **The correctness + dock-hardening fold (W6).** `proof:peer-optional` +
  `peerDependenciesMeta` fixed; `proof:vueuse-free-root` + DataTable swapped to an
  in-house `useResizeObserver` (the ONE hard ordering edge); the keyframes
  `[2.2.0,3.0.0]` `proof:package` axis; `supportsPostTask` WIRED (its first real
  caller); the R4/R6 hardening; `proof:color-acyclic` + `proof:single-color-core`.
  Dock: `proof:strict-templates` (the binding-guard), the a11y + state contract test,
  `proof:dock-motion-parity` (the VT-fork reconcile via `--dock-resize-spring`).
- **The slipped ship + dock clean-break (W7).** Fraunces `@font-face` +
  `proof:font-axes`; the dock overflow 3-prop→one `grow|wrap|scroll` enum (the `wrap`
  boolean DELETED — 0 consumers); the dock press-canon/glass-hover/spring-micro/
  rail-indicator design refinements; the rail adopting reka-ui `Tabs`; the ι doc-rot
  sweep + `proof:doc-consistency`.
- **Gates green + the fold (W8).** Overfitting audit clean (tallying PROPS not just
  components — the dock proved prop-accretion hides under component-legitimacy);
  the `gates.mjs` matrix green; AT.FINAL records `inv-AT-color` + the `§token-tier`
  CSS-native guard + the two-tier (source-graph + dist) gate idiom; the **3.3.0**
  minor published — the constellation unlock (value.js K.W3 consumes the blob subpaths).

## §DEC-AT — the decisions the 24 lenses settled

- **DEC-AT-1 — extract `useWebGLCanvas` (W2); delete `frostShader.ts`.** The lift
  drives the substrate unification; aurora + goo-blob consume it. Gated by BOTH
  pixel-parity (`proof:webgl-golden`) AND scheduling-parity (the table) — the
  byte-parity gate alone is blind to a scheduling downgrade. The substrate is
  parameterized (quad geometry/attrs/DPR/needsAnimation/maxFps), NOT aurora-baked —
  a consumer-#2 usability assert co-gates W2 (`audit/W0b-C6` must-fix #4).
- **DEC-AT-2 — `ColorResolver` required-injected; `defaultBlobColorResolver` opt-in
  from `/color`.** No baked demo resolver; a no-resolver mount throws (the loud
  failure replacing the demo's silent gray). `/goo-blob` stays value.js-free.
- **DEC-AT-3 — watercolor-dot internalizes its SVG filter** (auto-mounted, namespaced
  `glass-watercolor-filter`).
- **DEC-AT-4 — the shader gates on CPU-equivalence (8 assertions) + `proof:webgl-golden`
  (the PROMOTED `profile-aurora.mjs` headless WebGL2) + a scoped manual-visual line.**
  The "stand up a WebGL harness" premise is REFUTED — it already exists; AT promotes
  it. No binding Playwright golden (anti-gold-plating).
- **DEC-AT-5 — goo-blob's 2nd consumer is the glass-ui demo story** (the `deriveAurora`
  precedent); motive stated honestly (the D1 shader + the seam + the substrate, not
  breadth). Do NOT manufacture a speedtest/muster consumer.
- **DEC-AT-6 — blobs OFF the root barrel + OFF the value.js peer.**
- **DEC-AT-7 (NEW, the load-bearing seam) — color space is GAMMA at W4, LINEAR at
  W5.** The W4 faithful lift paints in gamma sRGB (HSV needed no OETF); W5's OKLCh
  transposition flips `uBaseColor` to linear AND adds the mandatory `linearToSrgb()`
  output stage as D1's OWN gated change. Each wave's gate asserts THAT wave's declared
  space. Left implicit, the blob ships visibly too-dark (linear default, no OETF) AND
  the perceptual-uniformity claim is voided (`audit/W0b-A2`, `C6` must-fix #1).
- **DEC-AT-8 (NEW) — W5 is the "shader-quality wave," not "D1 OKLCh only."** Five
  byte-isolated, individually-gated edits (AA, smin, FBM, OKLCh, gamut); OKLCh
  CPU-equivalence stays the binding math gate.
- **DEC-AT-9 (NEW) — the dock stays IN AT** (file-disjoint from the blob graph; no
  successor split — `audit/W0b-C5`). The rail adopts reka-ui `TabsRoot/List/Trigger/
  Content` (APG-Tabs canon, free roving tabindex, no fourth boilerplate copy — the
  B2-vs-B4 rail-role conflict resolved at W1).
- **DEC-AT-10 (NEW) — the matrix-source trap.** Hardcode value.js's EXACT Ottosson
  constants (transposed for GLSL column-major), NOT the GM-Shaders/LYGIA convenience
  matrices (~1e-4 off — they'd red-flag the 1e-6 gate on a non-bug).

## §inv-AT-color — the color answer

**Can glass-ui employ value.js for ALL color, avoiding circularity? Tier-scoped:
YES for the runtime-JS tier (already ~95% done), NO for the CSS token tier — and the
graph is a proven DAG.** (`audit/W0b-C3`, first-hand verified.)

- **CSS token tier** (`tokens.css`/`theme.css` — `hsl()`/`oklch()`/`color-mix()`/
  `light-dark()`, 54 color-mix sites) is CSS-native and **STAYS native.** Compiling it
  through value.js would regress `light-dark()` runtime re-resolution, the token-first
  consumer-override precept, and payload (the AN.W2 precedent). `color-mix()`/`oklch()`
  ARE the 2026 SOTA token engine. This is GUARDED so a future audit does not wrongly
  "finish the consolidation."
- **Runtime-JS tier** (aurora/blob/`deriveAurora`) is **already 100% on value.js**
  (`color.ts:11-21`, zero local math — K.W2c deleted the 8 duplicates). The only
  remaining hand-rolled resolver is value.js's DEMO 1×1-canvas probe, which AT.W4
  deletes. Post-AT: zero hand-rolled runtime color anywhere.
- **GLSL tier** mirrors value.js on the GPU (the Ottosson fn pair, W5).
- **"One core" binds the MATH SOURCE, not the return space.** The `/color` leaf needs
  BOTH `oklchToLinear` (aurora's bake) AND `oklchToGammaRgb` (the blob seam's gamma
  exit — DEC-AT-7) — both value.js-backed. Forcing one return space re-introduces the
  darkening defect.
- **Circularity REFUTED at HEAD.** value.js's PUBLISHED `src/` imports glass-ui ZERO
  times (glass-ui appears only as a devDependency + `vite.config.ts` + `demo/**`). The
  runtime graph `consumers → glass-ui → value.js → parse-that` is a strict DAG.

**inv-AT-color:** *one runtime-JS color source (value.js, via the `/color` leaf); the
CSS token tier stays native; the GLSL tier mirrors value.js; the published graph is a
DAG because value.js's published lib never imports glass-ui — the coupling is dev-only.*

## §The hardened gate set

All fail-closed, runner-ready, two-tier where applicable (source-graph BENEATH
dist-floor). Full specs: `audit/W0b-C1/C2/C3` + the synthesis.

| Gate | Wave | Status@HEAD | Fail-closed spec |
|---|---|---|---|
| `proof:webgl-substrate-single` | W2 | new | one WebGL bootstrap in `glass/webgl/` (allowlist webgpu) + the scheduling-parity table (off-screen/tab-hidden park, RM=1 frame, context-restore re-arm, DPR≤2). W2 green needs pixel AND scheduling parity. |
| `proof:webgl-golden` | W2,W5 | PROMOTE | promote `scripts/profile-aurora.mjs` (already headless-Chrome WebGL2 + `readPixels` + SwiftShader-deterministic) to a golden: aurora fold ±1 LSB (W2); on-GPU zero-perturb == `linearToSrgb(base)` (W5). `{local,ci}`, fail-soft tolerance. |
| `proof:color-acyclic` | W6 | green→guard | `grep "@mkbabb/glass-ui" value.js/src/ == 0` (sibling-aware) + a within-glass-ui `/color`→component no-back-import walk. |
| `proof:single-color-core` | W6 | green→guard | grep for K.W2c duplicate signatures (`srgbToOKLab`/in-JS `rgb2hsv`/1×1-canvas/local OKLab matrix) outside `/color`'s value.js composition → any match fails; both equivalence canaries exist. |
| `proof:blob-value-free` | W3,W4 | new | two-tier: source-graph walker (reaches `/watercolor-dot`) BENEATH the dist grep; throw-message contains `defaultBlobColorResolver`. |
| `proof:peer-optional` | W6 | **RED** | peer P is `optional:true` IFF its literal is absent from `dist/glass-ui.js`. RED: `peerDependenciesMeta` undefined + the dead `optionalPeerDependencies` field → value.js/keyframes/embla/tw-animate all required; CLAUDE.md:362 false. |
| `proof:vueuse-free-root` | W6 | **RED** | retarget `proof-consumers-static.mjs`'s comment-stripped transitive walker from `src/index.ts`, scan `.vue <script>`. RED: `index.ts:104`→`DataTable.vue:3 useElementSize`. Fix precedes the gate. |
| `proof:strict-templates` | W6 | new | `checkUnknownProps:true`; `<GlassDock bogus-prop>` is a RED typecheck. Supersedes the booked point-spec binding-guard — closes the silent-no-op class library-wide. |
| `proof:dock-motion-parity` | W6 | new | native-VT timing-fn ≡ `--dock-motion-resize` easing (one-grep); fails on VT-vs-FLIP curve divergence. |
| `proof:doc-consistency` | W7 | new | every CLAUDE.md `custom/<dir>` + cited dep resolves (catches `dock-group`/`@lucide/vue` rot). |
| `proof:font-axes` | W7 | new | every `font-variation-settings` axis `typography.css` declares is carried by a shipped face. KEPT (AT has the Fraunces slice — words + value.js ≥2); the synthesis' "drop if no consumer" does not apply. |
| CPU-equivalence (8-assertion) | W5 | hardened 4→8 | over `metaball-color.glsl-port.ts` (witness `#3a7bd5`): round-trip 1e-6 · exact-matrix · OETF agreement · full-chain space · out-of-gamut no-hue-drift · perceptual-uniformity (OKLCh ΔL < HSV ΔL) · radians-unit · premultiply-ordering. |

**Intra-W6 ordering — the ONE hard edge:** the DataTable `useElementSize`→
`useResizeObserver` swap MUST precede `proof:vueuse-free-root` green + the `@vueuse`
flip-to-optional. Everything else (keyframes matrix, peer-optional, color gates, dock
slices) is file-disjoint and order-free.

## §Wave sequence

| Wave | Title | Phase | Hard gate |
|---|---|---|---|
| **AT.W0** | Deep 6-lens audit | DEV | DONE — `audit/W0-L{1..6}` |
| **AT.W0b** | 18-lens augment+harden (blob/aurora SOTA · dock · color/correctness) | DEV | DONE — `audit/W0b-{A,B,C}*` |
| **AT.W1** | Design slices — `design/AT.W1-blob-primitives.md` (+ the shader-quality + DEC-AT-7 space-seam) · `design/AT.W1b-dock.md` (dock waves + reka-ui Tabs decision) · `design/AT.W1c-color-gates.md` (`/color` leaf + inv-AT-color + the gate set). **END OF DEV.** | DEV (boundary) | every slice file:line-verified |
| **AT.W2** | `useWebGLCanvas` (additive: off-screen-pause + context-restore) + aurora refactor + `frostShader` delete + `/color` leaf hoist + aurora D-1 dither + D-2 OKLab LUT | IMPL | `proof:webgl-substrate-single` (pixel+sched parity) · `proof:webgl-golden` aurora fold · consumer-#2 usability · `proof:color-acyclic`/`single-color-core` |
| **AT.W3** | Lift watercolor-dot (CSS/SVG) + internalized filter + `prng` leaf | IMPL | `/watercolor-dot` ships; zero-wiring filter; `proof:blob-value-free` source-graph; seeded-shape (asymmetric color) |
| **AT.W4** | Lift goo-blob (GAMMA shader) onto W2 + `ColorResolver` seam + demo story (#2) | IMPL (headline) | `proof:blob-value-free` + `proof:no-value-default` (dist); no-resolver throws (names `defaultBlobColorResolver`); premultiplied-alpha asserted; ≥2 met; off root barrel |
| **AT.W5** | The shader-quality wave (fwidth AA · quadratic smin · rotated FBM · OKLCh linear-flip + `linearToSrgb` · exact matrices · radians · hue-preserving gamut) | IMPL | 8-assertion CPU-equivalence over the TS port + `proof:webgl-golden` zero-perturb identity; manual-visual scoped to `--blob-edge-glow-l` |
| **AT.W6** | Correctness + dock-hardening — `peerDependenciesMeta`+`proof:peer-optional`; DataTable→`useResizeObserver`+`proof:vueuse-free-root`; keyframes `[2.2.0,3.0.0]` axis; `supportsPostTask` wire; R4/R6 (4 specs); the color gates. Dock: `proof:strict-templates`; the a11y+state contract test; `proof:dock-motion-parity` (`--dock-resize-spring`) | IMPL | each gate fails-closed; DataTable swap precedes the vueuse gate |
| **AT.W7** | Slipped ship + dock clean-break — Fraunces `@font-face`+`proof:font-axes`; dock overflow→one enum (`wrap` deleted); dock press/hover/spring/rail-indicator design + reka-ui Tabs rail; ι doc-rot+`proof:doc-consistency`; dead `ValueJs` UMD global | IMPL | inert axes paint; `rg .dock-wrap = 0`; one overflow enum; `git status` clean post-sweep |
| **AT.W8** | Close — overfitting audit (PROPS tallied) + gates matrix + AT.FINAL (inv-AT-color + §token-tier guard + two-tier gate idiom) + the **3.3.0** publish | IMPL (LAST) | matrix green; provenance publish; the constellation unlock |

**Wave count: 10 (W0-W8 + W0b)** — 3 DEVELOPMENT (W0 + W0b audits, W1 design) + 7
IMPLEMENTATION. Dev/impl boundary at W1|W2. **The atomic dock template pass** (rail
ARIA + overflow-collapse + rail-indicator) spans the W6/W7 boundary as ONE edit set
to avoid double-touching `GlassDock.vue`/`DockLayerGroup.vue`. Every dock gate carries
a no-regression line preserving the inert+pointer-events+visibility triad and the
verified-correct PRM degradation.

## §Must-fix-before-impl (W0b-C6)

1. **Name the W4/W5 color-space seam (DEC-AT-7) before any IMPL** — GAMMA@W4, LINEAR@W5
   with the mandatory `linearToSrgb()`. The single load-bearing contract; left implicit
   the blob ships too-dark AND the perceptual claim voids.
2. **`proof:vueuse-free-root` is RED at HEAD** — the DataTable→`useResizeObserver` swap
   is the one hard ordering edge in W6.
3. **`peerDependenciesMeta` is `undefined`; `optionalPeerDependencies` is dead** — fix
   the field shape, don't just write the gate.
4. **Do NOT bake aurora's choices into `useWebGLCanvas`** — aurora/goo-blob diverge on
   quad geometry/attrs/DPR/frozen-t; the scheduling-parity table + the consumer-#2
   usability assert must BOTH gate W2.
5. **The matrix-source trap (DEC-AT-10)** — value.js's exact Ottosson constants, not
   convenience matrices.
6. **`proof:font-axes` has a consumer (the Fraunces slice)** — KEEP it; verify the
   words+value.js ≥2 at W7.

## §Folded ledger

Full disposition: `audit/W0-L4` (47 items) + `audit/W0b-C4/C5` (the dock + SOTA
dispositions).

**AT-WAVE:** the blob trio + the WebGL-substrate/`/color`-leaf/ColorResolver
transposition + the shader-quality SOTA edits (fwidth/smin/FBM/OETF/matrices/gamut) +
the aurora D-1 dither/D-2 LUT free-ride + the dock hardening (strict-templates, a11y
contract, motion-parity, overflow-collapse, press/hover/spring/rail-indicator, doc-rot)
+ the correctness fold (peer-optional, vueuse-free-root, peer-matrix, supportsPostTask,
R4/R6) + the color gates + Fraunces.

**BOOK:** dock magnification (`useDockMagnify` ready, 0 firm consumers) · expand-stagger ·
pane-VT directional slide (needs 2nd consumer + visual proof) · `overflow:"clip"` member ·
typed dock `tier` prop · D-3 aurora hue-steering (art-direction-gated) · analytic-derivative
noise / exponential smin / raymarching / binding Playwright golden (anti-gold-plating) ·
OffscreenCanvas+Worker (SOTA-confirmed WRONG for small bg canvases) · WebGPU aurora
(pre-refuted) · Drawer `:native` (≥2 firm muster+speedtest — the strongest successor seed,
held out for blast-radius) · `/deck` (slides) · `useGlobalDark({initialValue})`+FOUC
primitive · the 1-consumer W-ASKS · the CSS levers · the platform-gated pilots.

**KILL:** P5 inner-rounding (user-ruled outer-only) · the 4 already-shipped DDR rows ·
shadcn-parity · VAL-9 · P7 · folding aurora into a shared in-shader OKLab path (aurora
bakes per-nucleus, blob perturbs per-pixel — correctly different shaders; the shared
primitive is the GLSL fn pair, not the shader).

## §Cross-repo perimeter (inv-16)

AT is glass-ui-internal; every cross-repo item is NAME-FORWARD:
- **value.js K.W3** — delete the demo blob impls, import the published `/goo-blob` +
  `/watercolor-dot`, supply its own `ColorResolver`. BLOCKED until AT's 3.3.0 publish.
- **The π visual-evidence precept** pin advance — USER-DOMAIN.
- **fourier P5** — outer-only ruled; fourier adjusts its side.
- The **3.3.0 publish** is the one user-domain release leg AT owns; outward-facing → confirm-first.

## §Format / process

bbnf tranche format. W0+W0b+W1 are DEVELOPMENT (write NO src); W2-W8 are IMPLEMENTATION,
authored now as binding specs, RUN only on explicit user authorization. The overfitting
audit runs at close tallying PROPS not just components. The paired-π protocol applies to
the visual waves (W2 aurora dither, W3-W5 blobs, W7 dock) — `baseline|close/` + `DELTA.md`,
the convention W7 also adopts into the precepts glass-ui-side.
