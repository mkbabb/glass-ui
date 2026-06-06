# AV SOTA-animation crosswalk (14-agent web research, 2026-06)

The binding Baseline-dated SOTA synthesis for the AV aurora/animation folds. Source: the 14-lane SOTA research workflow.

I have complete grounding. The shaders already implement Quilez double-warp, rotated-octave FBM, quadratic smin, fwidth-AA (goo-blob), and the full OETF + OKLCh discipline. The confirmed gaps are: IGN dither (absent — only hash-based film grain), offscreen-pause via content-visibility/IntersectionObserver (absent from substrate), reduced-motion seam in the WebGL substrate itself (delegated to aurora consumer only, not goo-blob), and a frame-budget proof gate. Here is the synthesis.

---

# glass-ui AV — SOTA Animation Synthesis

Research window June 2026. Every Baseline date and technique below is brief-cited. Grounded against the live substrate: aurora + goo-blob shaders already implement Quilez double-warp, rotated-octave FBM (`mat2(0.8,0.6,-0.6,0.8)`), quadratic `smin`, `fwidth`-AA (goo-blob), and the full sRGB-OETF + OKLCh-perceptual discipline (AU.W7). The remaining deltas are convergence, not invention.

---

## (1) THE BASELINE CROSSWALK

Today is **2026-06-05**. "WA" = Widely Available; "NA" = Newly Available; "Limited" = ships in some engines, not Baseline.

| Capability | Baseline status + date | Engines / caveat | AV verdict |
|---|---|---|---|
| **`linear()` physics easing** | **WA — newly-avail 2023-12-11; crosses WA 2026-06-11** (6 days out) | Chrome/Edge 113, FF 112, Safari 17.2 [B5, B14] | **ADOPT** — strip "experimental" framing; demote cubic-bezier to fallback-only. Already shipped as `--spring-*` tokens. |
| **Individual transforms (`scale`/`translate`/`rotate`)** | **WA — 2022-08-05** | Chrome 104, FF 72, Safari 14.1 [B14] | **ADOPT** — dock control press/hover declare only the changed axis. |
| **`@starting-style` + `transition-behavior: allow-discrete`** | **NA — 2024-08-06** (FF 129) | Chrome 117, Safari 17.5, FF 129; WA ~2027-02 [B6, B14] | **ADOPT** — extend the existing `.glass-top-layer` grammar to dock/popover/tooltip enter-leave incl. `display:none`. |
| **Same-document View Transitions + `view-transition-class`** | **NA — 2025-10-14** (FF 144 crossed it) | Chrome 111, Safari 18, FF 144 [B6, B14] | **ADOPT** — `useViewTransition` already in tree; widen to dock layer/tab + configurator-preset swaps. |
| **Typed/active VT (`types` + `:active-view-transition-type()`)** | **NA — 2026-01-13** (FF 147) | Chrome 125, Safari 18.2, FF 147 [B6] | **ADOPT (layered)** — directional dock-layer slides; replaces hand-rolled FLIP-direction branching. Second PE tier above base VT. |
| **OKLCh `oklch()`/`oklab()`** | **WA — 2025-11-09** | Safari 15.4, Chrome 111, FF 113; ~92%+ [B10, B14] | **ADOPT** — author aurora/blob token seeds in `oklch()`; free P3 reach. |
| **`color-mix(in oklch …)`** | **WA — 2025-11-09** | Safari 16.2, Chrome 111, FF 113 [B10] | **ADOPT** — dock/blob hover/active/halo tier derivation off one seed; perceptual upgrade of the in-house `in srgb` pattern. |
| **Gradient `in oklch` / `longer hue` interpolation** | **WA — ~June 2024** | Chrome 111, Safari 16.4, FF 113 [B10] | **ADOPT** — CSS aurora-fallback layer + sparkle/primary-tier sweeps; kills sRGB grey dead-zone, zero JS. |
| **`@property` typed `<color>`/`<angle>`** | **NA — 2024-07-09** | Chrome 85, Safari 16.4, FF 128; WA ~2027-01 [B10] | **ADOPT** — natively animate aurora hue-drift + conic rotation on the reduced-motion / no-WebGL / CSS-fallback path (retires that RAF color loop). |
| **Relative color `oklch(from … calc(h+…))`** | **NA — ~Sept 2024; WA 2027-03-16** | Chrome 119, Safari 18, FF 128 [B10] | **ADOPT (gated)** — collapse `--phase-color` cascade to one seed + channel math; wrap in `@supports`, `color-mix` else-path. |
| **CSS Masks (`mask-image`)** | **NA — 2023-12-07** | Chrome 120, Safari 15.4, FF 53 [B14] | **ADOPT** — aurora edge-feather, blob silhouette soft-clip, paper-grain overlay; removes extra canvas passes. |
| **`content-visibility: auto` + `contentvisibilityautostatechange`** | **NA — 2025-09-15** | Chrome 108, FF 130, Safari 26 [B11, B13] | **ADOPT** — the single biggest perf lever the substrate does NOT yet pull (gap confirmed). Offscreen RAF pause; IO `rootMargin` fallback. |
| **OffscreenCanvas + Worker** | **WA — 2025-09-27** (2D context since 2023-03) | Chromium, FF 105, Safari 16.4 [B1, B9] | **DEFER** — trigger: profiled main-thread contention (LoAF `duration` regression). Adds worker-message plumbing. |
| **Scroll-driven `scroll()`/`view()`** | **Limited** — NOT Baseline | Chrome 115, Safari 26; **FF flag-gated** (`layout.css.scroll-driven-animations.enabled`), ~85% [B6, B14] | **ADOPT (gated)** — keep `@supports`-primary over JS fallback (current `scroll-driven.css` posture is correct). Trigger to sole-path: FF unflips. |
| **WebGPU** | **Limited** — NOT Baseline (~83% caniuse) | Chrome 113, Safari 26, FF 141-Win/147-AppleSi; **FF-Linux/Android open in 2026** [B1, B8, B14] | **DEFER (render)** / **ADOPT (compute, gated)** — WebGL2 stays substrate; `navigator.gpu`-detection enhancement only. Fragment auroras gain ~nothing from compute. |
| **`interpolate-size: allow-keywords` / `calc-size()`** | **Limited** — Chromium 129 only | No Safari, no FF [B6] | **DEFER** — would let dock animate to true `height:auto`. Trigger: 2-of-3 engines. Keep FLIP/`dim` axis logic. |
| **Cross-document VT / scoped `element.startViewTransition()`** | **Limited** — Chromium-led | Chrome 126+/147-flagged [B6, B14] | **DEFER** — glass-ui is SPA-scoped; low value. Watch Interop 2026. |
| **`scheduler.yield()`** | **Limited** | Chrome 115, FF Aug 2025; no Safari [B11] | **DEFER** — trigger: AV JS does >50ms per-frame batch (color-resolver over many stops). Feature-detect. |
| **HTML-in-Canvas (`texElementImage2D`)** | **Not in any engine** (experimental) | polyfill-only [B1, B14] | **DEFER hard** — trigger: any native ship. |
| **`prefers-reduced-motion`** | **WA — mature** (~92 compat) | Chrome 74+, FF 63+, Safari 10.1+ [B12] | **ADOPT** — hard dependency, no fallback needed. JS `matchMedia` gate for the RAF/WebGL loop (CSS reset can't reach it). |

---

## (2) THE SOTA FOLD LIST FOR AV

Grouped by lane. Each fold: technique + citation + the AV wave it seeds. **(✓ shipped)** = already in the live shader/substrate (convergence/assertion work only); **(GAP)** = confirmed-absent, net-new fold.

### A. Shader-quality (aurora/blob)
- **A1 — Quilez recursive double domain-warp** `fbm(p + fbm(p))`, decorrelated offsets (5.2/1.3/1.7/9.2). [B2, B3] — **✓ shipped** in `aurora.frag.ts:152-156`. *Wave: assert-only; the offsets are the canon.*
- **A2 — Per-octave rotation `mat2(0.8,0.6,-0.6,0.8)`** to kill axis-aligned streaking. [B2 §3] — **✓ shipped** in both `aurora.frag.ts:124` and `metaball.frag.ts:91`. *Wave: assert-only.*
- **A3 — Quadratic-polynomial `smin` (`h*h*k*0.25`)** as the one blob union; rigid, never overshoots; normalized so `k` means the same across kernels. [B3 §1] — **✓ shipped** in `metaball.frag.ts:113-120`. *Wave: promote `uSmoothK` to a `--blob-gooeyness` token with `g(0)` normalization.*
- **A4 — Analytic `fwidth` AA, `edge_blur_px ≈ 1.2`** on every SDF/blob iso-edge. [B2 §6, B3 §2] — **✓ shipped goo-blob** (`metaball.frag.ts:252-254`); **GAP: extend to watercolor-dot + dock blob trio** if any risk jaggies. *Wave: AV-W (shader-quality) audit sweep.*
- **A5 — Curl / Bitangent-noise divergence-free flow field** so aurora *flows* incompressibly vs scrolls. [B7 §1] — **DEFER** (current double-warp reads as flowing). Trigger: design pass judges aurora flat. *Wave: AV-W2 enhancement only.*
- **A6 — IGN dither at 1/255 LSB, pre-quantization** (texture-free, one line: `color += (1.0/255.0)*ign(gl_FragCoord.xy) - 0.5/255.0`). [B2 §7] — **GAP confirmed**: AV shaders carry only hash-based film grain (`aurora.frag.ts:813`), not IGN at LSB strength. This is the #1 fix for 8-bit soft-gradient banding. *Wave: AV-W headline shader-quality fold; token `--av-dither`.*
- **A7 — Shared texture-free `snoise` GLSL leaf** under `composables/glass` (Ashima/Gustavson), canonical across aurora/goo-blob/constellation. [B2 §4, B7 §2] — **DEFER** (each shader currently self-contains noise). Trigger: constellation lands needing the same basis. *Wave: AV-W2.*

### B. Color-correctness (OETF + OKLCh-in-shader)
- **B1 — sRGB OETF discipline: decode→blend-in-linear→encode**, GPU-`*_SRGB`-target double-encode caveat. Exact Ottosson M1/M2 + piecewise `0.04045/12.92/1.055/2.4` constants. [B4 §2-3] — **✓ shipped**: goo-blob does `srgbToLinear → OKLab → OKLCh → perturb → linear → linearToSrgb` with value.js-EXACT Ottosson constants (`metaball.frag.ts:6-13,122-132`); aurora bakes palette to linear CPU-side, ACES-tonemaps in linear. *Wave: assert-only (the 8-assert CPU-equivalence proof already exists per AU.W7).*
- **B2 — Precompute OKLab stops on CPU, decode-only per-pixel** (per-pixel `cbrt`/`pow` is 10-20× sRGB; precomputed → 1.3-1.5×). [B4 §4] — **✓ shipped**: aurora bakes palette CPU-side via `color.ts oklchToLinear`; reuses the injected `ColorResolver` seam. *Wave: assert-only; design rule for any new AV shader.*
- **B3 — Shared `color/` GLSL include** mirroring `composables/color/` (one audited M1/M2 + piecewise source across aurora/goo-blob/watercolor-dot). [B4 §3] — **GAP**: constants are duplicated per-shader today. *Wave: AV-W color-correctness consolidation fold.*
- **B4 — OKLCh / linear-light + shorter-hue-arc for dock phase-tint crossfades**, `color-mix(in oklch)` on the token side so CPU+GPU share one space. [B4 §6-7, B10, B14] — **GAP**: dock `--phase-color` crossfade should mix in oklch. *Wave: AV-W (dock-motion) color fold.*
- **B5 — OKLCh chroma-reduction gamut mapping** (CSS-Color-4 binary search, hold L+h). [B4 §5, B3] — **DEFER**. Trigger: a preset produces visibly-clipping out-of-sRGB blob color. goo-blob already does a hue-preserving clamp; full binary-search only when clipping appears. *Wave: AV-W2.*

### C. Spring / motion (the linear()-spring SOTA)
- **C1 — `linear()`-token + analytic `springLinearStops()` driver** is the SOTA architecture and glass-ui already embodies it end-to-end (`@mkbabb/keyframes.js` `SpringProgress` + `springLinearStops()`, regen script as single source of truth). [B5, B7 §8, B14] — **✓ shipped**. *Wave: AV-W coverage audit (below).*
- **C2 — Token-coverage audit: every spring-flavored transition reads a `--spring-*` token.** The surviving hand-rolled `--ease-apple-spring` cubic-beziers in `cards.css`/`animations.css` (and `--vt-ease`, `tokens.css:1261`) are the convergence debt. [B5 §2] — **ADOPT**. *Wave: AV-W (spring-coverage) sweep.*
- **C3 — Velocity-continuity for the dock: hand interrupted/mid-flight gestures to the live `SpringProgress`/`useSpring`** (re-seats from current `(value,velocity)` on retarget — Apple's core argument). Dock resize currently uses the *static* `--spring-dock`. [B5 §3, B7 §7] — **ADOPT**. *Wave: AV-W (dock-motion) — the dock-lag-adjacent fold.*
- **C4 — Design rule: ambient WebGL (aurora/blob) stays on cheap static curves; live solver reserved for interactive surfaces (dock).** The documented Motion One tradeoff turned into a boundary. [B5 §4] — **ADOPT as invariant**. *Wave: AV-W convention doc.*
- **C5 — Apple `duration/bounce` two-knob parameterization** (vs the repo's `response/ζ`) + Motion `visualDuration` for choreographed multi-stage entries. [B5 §5] — **DEFER**. Trigger: AV surfaces spring tuning to consumers/configurator (then `duration/bounce` is the legible knob), or a spring must align to a fixed-duration sibling. *Wave: AV-W2.*

### D. Procedural-animation primitives
- **D1 — Constellation primitive (proximity-graph + spatial binning [+ optional Verlet settle])** — the missing named sibling to aurora/blob. [B7 §5-6, B9 §3] — **ADOPT as the AV headline deliverable**, built on **Canvas2D, NOT WebGL** (it sits below the WebGL crossover — hundreds of nodes; faster startup, no GPU init tax). [B9 §1,3] *Wave: AV-W (procedural-anim) headline.*
- **D2 — Constellation draw discipline: polyline batching, state-change minimization, floor coords, NO `shadowBlur` (pre-rendered radial-gradient glow sprite `drawImage`'d per node).** [B9 §2] — **ADOPT** with D1. *Wave: AV-W with D1.*
- **D3 — fbm + domain-warp drift driving nuclei/blob positions** (cheap in 2D — field eval, no raymarch). [B2, B3 §4] — **✓ shipped** (warp drift in aurora). *Wave: extend the pattern to constellation node drift in D1.*
- **D4 — WebGPU compute-driven particles** (1M@60fps desktop / 100k@30fps mobile; 256-thread workgroups, spatial-hash grid, ping-pong). [B7 §3, B8 §4] — **DEFER**. Trigger: a surface needs ≫10k simulated particles AND the WebGL fallback already shipped. *Wave: AV-W3 second-phase.*
- **D5 — Second-order spring secondary-motion (follow-through/overshoot)** for dock/icon micro-motion. [B7 §7] — **DEFER**. Trigger: a surface needs overshoot `linear()` tokens can't express (runtime-variable target / interruption) — mostly covered by C3. *Wave: AV-W2.*

### E. Substrate decisions (Canvas2D vs WebGL vs WebGPU)
- **E1 — Constellation = Canvas2D, sibling to (not folded into) `useWebGLCanvas`.** Below the crossover; pays no GPU init/complexity tax. [B9 §1,3] — **ADOPT** (pairs with D1). *Wave: AV-W.*
- **E2 — Keep + harden the dual-API seam: capability-gated `useWebGLCanvas`→`useWebGPUCanvas` behind `navigator.gpu`, WebGL2 unconditional fallback.** The `webgpu/glassShader.wgsl` stub is the seam to promote. [B8 §5, B1 §3] — **ADOPT (seam only)** / WebGPU render path **DEFER**. *Wave: AV-W2.*
- **E3 — Author new AV shaders TSL/WGSL-parity (source-of-truth)** so the eventual WebGPU port is a compile target, not a rewrite — WITHOUT taking the Three.js dep (glass-ui's hand-rolled substrate is the lighter correct choice). [B1 §5, B8 §3] — **DEFER (authoring convention)**. Trigger: divergent WGSL+GLSL sources actually needed. *Wave: AV-W2.*
- **E4 — Never `getImageData` per-frame; keep AV canvases GPU-accelerated** (Chrome flips to CPU after 2 un-flagged reads; isolate any pixel readback on a dedicated `willReadFrequently` canvas off the animation path). [B9 §4] — **ADOPT as guardrail/lint note**. *Wave: AV-W convention.*

### F. Perf (compositor / content-visibility)
- **F1 — Offscreen RAF pause via `content-visibility: auto` + `contentvisibilityautostatechange`**, IO `rootMargin:200px` fallback; gate the existing `shouldContinue()`/`armed` machinery. [B11 §9, B13] — **GAP confirmed** (substrate has visibility owner but no content-visibility/IO). The single biggest perf+battery lever still unpulled; Baseline 2025-09-15. *Wave: AV-W (perf) headline fold.*
- **F2 — `contain: content` (or `strict` for fixed-size aurora/blob hosts) + clamp `--glass-blur-*` to the 8-15px band** (>20px exponentially more expensive); high-end-only override. [B11 §4,6] — **ADOPT**. Attacks glass-ui's most expensive idiom (`backdrop-filter`); 50-80% paint/layout-area reduction, caps VRAM. *Wave: AV-W (perf) — `dock.css`/`glass.css` pass.*
- **F3 — On-demand `will-change` lifecycle** in `useDockTransition`/`useLayerTransition` (set `transform`/`dim` at gesture start, clear to `auto` on transition end — never standing). [B11 §3] — **ADOPT**. *Wave: AV-W (dock-motion).*
- **F4 — Wire aurora + goo-blob RAF to `useIntersectionPause` + `document.visibilityState`** (composable already exists in `composables/motion`). [B11 §9] — **ADOPT** (complements F1). *Wave: AV-W (perf).*
- **F5 — CSS-var inheritance-bomb guard**: animated values stay on `transform`/`opacity`; `--phase-color`/`--shadow-color` are *set, not tweened* per frame (animating an inherited var forces whole-subtree style recalc). [B11 §1] — **ADOPT as guard**. *Wave: AV-W convention.*
- **F6 — DPR clamp ≤2 promoted to a named token** + budget caps (≤2-3 blobs, 3-4 colors, 8-15s loop) as `aurora/constants/` tokens, not magic numbers, so consumer presets can't blow the budget. [B11 §2, B13] — **ADOPT** (DPR clamp already at `runtime.ts:257`; promote + lint). *Wave: AV-W.*
- **F7 — LoAF `PerformanceObserver` + frame-budget assertion (≤16.7ms tick, degrade toward 8ms)** as the objective AV jank gate, via a `scripts/proof-*` script. [B11 §8, B13] — **ADOPT** — turns "feels smooth" into a measured `duration`/`blockingDuration` threshold. *Wave: AV-W acceptance gate.*

### G. A11y-motion (the hard floor — every fold inherits)
- **G1 — Reduced-motion RAF gate in `useWebGLCanvas` substrate: `matchMedia('(prefers-reduced-motion: reduce)')` reactive seam → freeze RAF, render ONE static frame** (replace-not-remove; a CSS reset *cannot* reach the WebGL loop). [B1 §7, B2 §8, B12 §1,6] — **PARTIAL**: aurora's `runtime.ts:197` reads it + freezes; **GAP: goo-blob and the substrate itself don't own the seam.** Lift to a substrate-level guarantee so both consumers (and any future AV surface) inherit it. *Wave: AV-W (a11y) headline.*
- **G2 — Pause/Stop control on continuously-running AV backgrounds (WCAG 2.2.2, Level A — available to ALL users, not gated behind reduced-motion).** Auto-start + >5s + non-essential = obligatory. Dock is the natural host (a `DockIconButton` pause/play toggle). [B12 §4] — **ADOPT** — the only *Level-A* obligation in scope; the conformance-critical fold. *Wave: AV-W (a11y) + dock-controls.*
- **G3 — Replace-not-remove for dock/layer transitions: under `reduce`, drop the size/translate FLIP (the vestibular trigger), keep the opacity crossfade.** State still reads, motion stops. Wire via axis-aware `useDockTransition`/`useLayerTransition`. [B12 §1-3] — **ADOPT**. *Wave: AV-W (dock-motion).*
- **G4 — Assert smooth (non-hard-cut, <3 flashes/s) shader color animation** (WCAG 2.3.1). OKLCh-LINEAR path already favors smooth interpolation. [B12 §5] — **ADOPT as assertion, not code change**. *Wave: AV-W a11y proof.*
- **G5 — CSS `0.01ms !important` `reduce` cap as a `/styles` rung** (use `0.01ms` not `0` to preserve `transitionend` for dock state machines) — belt-and-suspenders over the CSS-transition surface only. [B12 §6] — **DEFER**. Trigger: a CSS transition leaks under `reduce`. *Wave: AV-W2.*
- **G6 — In-app reduced-motion toggle (SC 2.3.3 Gx)** — library-level override independent of OS. [B12 §5] — **DEFER**. Trigger: consumer asks / AV ships a settings surface (honoring the OS query already satisfies 2.3.3 AAA). *Wave: AV-W2.*

---

## (3) THE 5 HIGHEST-VALUE ADOPTS — AV ANIMATION HEADLINE

1. **IGN dither at 1/255 LSB, pre-quantization, across aurora + goo-blob (+ any conic/radial gradient surface).** [B2 §7] One texture-free line (`color += (1.0/255.0)*ign(gl_FragCoord.xy) - 0.5/255.0`). **Confirmed gap** — the AV shaders carry only hash film-grain, not LSB-strength IGN. This is the #1 *visible* defect fix on exactly glass-ui's soft-gradient surfaces (8-bit mid-tone banding), and it's nearly free.

2. **Offscreen RAF pause via `content-visibility` + `contentvisibilityautostatechange` (Baseline 2025-09-15), IntersectionObserver `rootMargin` fallback, landed on the existing `shouldContinue()`/`armed` seam.** [B11 §9, B13] **Confirmed gap** — the single biggest perf+battery lever the substrate doesn't pull, and it's power discipline not just a11y (animation ≈11% screen-on battery). The substrate is already *ahead* of the copy-paste field (frozen reduced-motion frame, DPR≤2 clamp, settle-to-idle parking); this closes the one real platform-SOTA gap.

3. **Lift the reduced-motion freeze-frame gate into the `useWebGLCanvas` substrate so goo-blob inherits it (aurora already has it), + add the WCAG-2.2.2 Level-A pause/stop dock toggle.** [B12 §1,4; B1 §7] **Partial gap** — aurora's `runtime.ts` freezes, but goo-blob and the substrate don't own the seam; a CSS reset can never reach the WebGL RAF loop. The pause/stop control is the *only Level-A obligation* in scope.

4. **Velocity-continuity for the dock: hand interrupted/mid-flight gestures from the static `--spring-dock` token to the live `SpringProgress`/`useSpring` solver** (re-seats from current value+velocity on retarget — Apple's whole argument for springs), keeping ambient WebGL on cheap static curves. [B5 §3-4, B7 §7] This is the **dock-lag-adjacent fold** and the highest-leverage *interaction*-motion win; the live solver already exists and re-seats correctly.

5. **`contain` + blur-budget pass on every glass/dock/aurora/blob host (`contain: content`/`strict` + clamp `--glass-blur-*` to 8-15px) and `linear()`-spring token-coverage convergence (retire the surviving `--ease-apple-spring` cubic-beziers in `cards.css`/`animations.css`/`--vt-ease`).** [B11 §4,6; B5 §2; B14 §1] Two cheap convergence sweeps: the containment pass directly attacks `backdrop-filter` (glass-ui's most expensive idiom) for 50-80% paint-area reduction + VRAM cap, and `linear()` crosses Widely-Available **2026-06-11** (6 days out) — AV lands the week the SOTA easing primitive becomes Baseline, so the cubic-bezier debt is now pure convergence, not risk.

**The one binding caution:** scroll-driven animations and WebGPU *look* finished but are NOT Baseline (FF flag-gated / FF-Linux+Android open). Both must stay `@supports`/`navigator.gpu`-gated with working fallbacks — the existing `scroll-driven.css` and `useWebGLCanvas` postures are correct and must NOT be promoted to sole paths in this tranche. [B6, B8, B14]

**Grounded file seams:** `src/composables/glass/webgl/useWebGLCanvas.ts` (RAF `shouldContinue()` seam; G1/F1/F4 land here), `src/components/custom/aurora/composables/runtime.ts:197,257` (reduced-motion freeze + DPR clamp already present), `src/components/custom/aurora/constants/shaders/aurora.frag.ts` + `src/components/custom/goo-blob/shaders/metaball.frag.ts` (A1-A4/B1-B2 ✓ shipped; A6 IGN-dither + B3 shared color-include are the gaps), `src/styles/tokens.css:159-163,178-181,1261,1279` (`--spring-*` ✓; `--ease-apple-spring`/`--vt-ease` are the C2 convergence debt), `src/styles/scroll-driven.css` + `view-transition.css` (correct gated postures to preserve).
