# AV — Progress

## W15 — iOS-26 Liquid Glass design-evolution

**Status:** DEV-COMPLETE, green.

### What landed (all three lanes)

**Lane A — material token folds.** Over the warm-cream identity (HELD — no hue swap,
no clone): (1) the `quiet` rung gained `saturate(1.05) brightness(1.02)` so the lower
ladder reads with the same saturation life as `resting`+ (M1); the
`prefers-reduced-transparency: reduce` bracket already maps `--glass-blur-quiet: none`,
so the whole chain drops with the blur. (2) `--glass-edge-light{,-dark}` minted — a
full-perimeter `inset 0 0 0 0.75px` rim (alpha 0.18/0.10) distinct from the top-only
`--glass-highlight`, wired onto `.glass-floating` (glass.css) + `.glass-dock` (dock.css)
as the catch-light that "defines the silhouette" (M3); the `-dark` companion remaps
inside `.dark`. (3) The content-aware under-shadow modifier `.glass-over-text` /
`[data-over-content]` swaps a text-bearing glass surface one rung heavier
(quiet→default, resting→vivid) and lightens over solid-light (M4) — reuses the existing
`--glass-under-shadow-*` rungs, no new shadow value (`vivid` sufficient over text). (4)
The three `@property --specular-x`/`--specular-y` (`<percentage>`) + `--specular-intensity`
(`<number>`) regs landed in tokens.css §11b alongside the existing three. The no-glass-on-
glass discipline + the spring cross-ref drafted into the glass.css header.

**Lane B — the pointer-anchored MOVING specular (HEADLINE).** New
`src/styles/glass-specular-track.css` (index.css cascade rung 4a): a `.glass-specular-track`
`::before` paints a `radial-gradient(circle at var(--specular-x) var(--specular-y), …)`
over a `mask-image` so the catch-light rides the surface, `mix-blend-mode: screen`. The
consumer writes pointer position as `--mouse-x/--mouse-y` (unregistered → inherits to the
pseudo); the pseudo maps them onto the typed `--specular-*` props. Intensity drives the
layer `opacity` (NOT a `calc()` in the stop alpha — a registered-`@property` `var()` nested
in `calc()` in an `hsl()` alpha in a gradient computes to 0 in Chromium; the layer-opacity
model is correct AND cleaner). Guards: `prefers-reduced-motion: reduce` pins the catch-light
static-centred (50%) + `transition: none`; a `var(--specular-x, 50%)` floor paints a centred
catch-light without the typed-property animation; `prefers-reduced-transparency: reduce`
drops it. The `feDisplacementMap` refraction garnish ships `@supports (backdrop-filter:
url(…))`-gated PE-only over the blur base — no `url(#…)` declaration leaks the substrate.
Three consumers opt in: `DockIconButton.vue` (`.glass-specular-track` + the `@pointermove`
`--mouse-x/--mouse-y` write seam), the Button `glass`/`glass-wash` variants
(`button/index.ts`), and `surface=glass` cards (`Card.vue`).

**Lane C — the no-glass-on-glass discipline doc.** `dock/README.md` carries the three
layer bands (content → navigation → overlay, per the `--z-*` registry), the no-glass-on-
glass rung-pairing rule, and the material↔spring duality cross-ref to AV.W9 (dock motion /
velocity continuity) + AV.W11 (slider) for the momentum-gated press squish.

### Gate + verification

- `proof:liquid-glass-tokens` (NEW, born RED → **GREEN**) — registered in `package.json`,
  `gates.mjs` (local+ci), `ci.yml`. Asserts the rim wiring, the quiet-rung saturate parity,
  the content-aware modifier, the three `@property` regs, the reduced-motion static paint +
  centred var() fallback, the saturate-drops-with-blur under reduced-transparency, the
  `@supports`-gated refraction garnish (no substrate leak), and the AA floors at
  tokens.css:332/341.
- `npm run typecheck` — **GREEN**. `npm run build` — **GREEN** (both arms).
- `npm run gates:verify-ci` — **GREEN** (manifest==ci, 43 gates).
- **Playwright live-verify** (http://localhost:5175): the moving specular tracks a real
  pointer-move (`circle at 72% 28%` follows the cursor, hover lifts opacity 0.35→0.6); under
  emulated `prefers-reduced-motion: reduce` the off-centre pointer write is ignored and the
  catch-light pins static-centred (`circle` 50%/50%, `transition: none`, still paints at
  0.35); the `--glass-edge-light` rim + the quiet-rung `saturate(1.05) brightness(1.02)` are
  live in the cascade. Screenshots under `docs/tranches/AV/audit/W15-*.png`.

Token tally: `docs/tranches/AV/audit/W15-liquid-glass.json`.

Green run id: local — recorded above (CI run id to be stamped by the orchestrator at
integration).

## W3 — motion-composables lift + keyframes orchestration-tier adoption

**Status:** DEV-COMPLETE, green.

### What landed (the green subset)

**Lane A — `useCountup` lift (D3, ADOPT).** `src/composables/motion/useCountup.ts`
created — the editorial `[data-countup]` DOM-walker, RE-EXPRESSED on the keyframes LIGHT
`NumericAnimation` engine (the hand-rolled `requestAnimationFrame(tick)` linear loop is
gone). The engine owns the rAF loop + easing + segment lookup; the composable owns the
DOM walk, the per-frame `textContent` write, the `prefers-reduced-motion`/`skip` snap,
and the teardown. **The unmount-mid-tween leak is FIXED** — every live tween is tracked
in a `Map<HTMLElement, NumericAnimation>`; `cancel()` (also `onScopeDispose`) stops every
in-flight animation. `settle()` cancels then snaps. The `data-countup`/`-dur`/`-delay`
DOM contract + `runActive`/`settle` surface are preserved (the delay is honoured by
deferring `.play()` with a cancellable timer wrapping `.stop()`). value.js-FREE: the
easing is a callable (`easeFn`), forwarded as the engine's `timingFunction` — never a
string name (a name would dynamic-import value.js's registry). Ships on `/motion`
(keyframes-bearing — NOT root, NOT `/motion-core`); `Countup`/`UseCountupOptions` promoted
to `/api`.

**Lane B — `vReveal` lift (ADOPT).** `src/composables/motion/vReveal.ts` created — the
`[data-reveal]`/`--d` entrance directive, `vue` type-only (`ObjectDirective`), so
dependency-free and root-barrel safe per the `useViewTransition` precedent. The slides
`v-reveal="N"`/`v-reveal:fade="N"` surface is preserved; the slides-deck-specific doc
comment was de-slidesed (the glass-ui docstring documents the contract the consumer's CSS
reads, no "ported from slides"). Ships on `/motion-core` + the root barrel.

**Lane C — D1 stagger() adoption: BOOKed.** The installed keyframes (peer
`^2.2.0 || ^3.0.0`, resolved 2.2.0 at HEAD) does **NOT export `stagger`** on its LIGHT
barrel (verified: `Object.keys` + `keyframes.d.ts` grep — only `ElementMorph`,
`NumericAnimation`, `SpringProgress`). The E.W10 LIGHT orchestration tier
(`stagger`/`flip`/`flipShared`) the spec presumed is not present. Combined with the
CONDITIONAL D1 gate (adopt IFF a non-linear `from`/`ease` distribution consumer appears —
none at HEAD), the §3.3 default holds: **BOOK**. The two hand-rolled linear ramps
(`useStagger.ts:123-137` `initialDelayMs + idx*delayMs`; `useStaggerReveal.ts:65-68`
`staggerMs*idx`) are KEPT byte-identical. **Trigger to revisit:** keyframes ships
`stagger()` on its LIGHT barrel AND a non-linear `from`/`ease` distribution consumer
appears (the keyframes-bearing relocation of the two leaves from `/motion-core` to
`/motion` is not worth a behavior-identical linear ramp).

**Lane D — D2 flip() FLIP-mechanics adoption: DEFERRED (cannot adopt at HEAD).** Same
root cause: keyframes 2.2.0 does **NOT export `flip`/`flipShared`** (only `ElementMorph`,
a shared-element morph primitive — NOT the read/invert FLIP-batching seam the dock +
carousel mechanics need). Per §3a Triumvirate Dispatch, a LIGHT `flip()` API that does
not exist / does not expose the needed batching seam is a DOCS-bounds-breaking expansion
against READ-ONLY keyframes (inv-16). Rather than halt the whole wave, the largest correct
green subset landed (A/B/C2) and D2 is DEFERRED. The two hand-rolled FLIP sequences
(`useLayerTransition.ts` dock; `useGlassCarousel.ts` carousel) are UNTOUCHED — each keeps
its driver (dock `SpringProgress`, carousel CSS-transition + `transitionend`) and its
correct mechanics. **Trigger to revisit:** keyframes publishes `flip()`/`flipShared()` on
its value.js-free LIGHT barrel with a read/invert batching seam that accepts a
CSS-`transition-duration`-parsed duration (carousel) and a per-frame `SpringProgress`
value (dock) WITHOUT a keyframes edit.

**useIdleSchedule (§4): KEEP-BOOK (the spec's lean default).** `useCountup.runActive` is
invoked imperatively on slide-activate — already past first-paint — so it does not need a
post-first-paint idle-defer. The single aurora consumer does not clear the J-inv-10 ≥2
bar, so `scheduleAfterFirstPaint` stays inline in `useAurora.ts` (untouched). **Trigger to
extract:** a 2nd library primitive needs post-first-paint idle deferral.

**C2 — `linear()`-spring token-coverage sweep (ADOPT).** The three surviving
`--ease-apple-spring` consumer sites converged onto `--spring-bouncy` (the apple-spring's
+27.5% overshoot maps to the bouncy `linear()` stop-set, peak ~1.20): `cards.css:41` (the
cartoon-surface `translate`), `animations.css:334` (the top-layer
`transition-timing-function`), `tokens.css:1261` (`--vt-ease`), plus the
`view-transition.css:39` `var(--vt-ease, …)` fallback (re-pointed at `--spring-bouncy`).
`--ease-apple-spring` survives as a token DEFINITION only (`tokens.css:181`/`theme.css:320`
+ the `--motion-…` seed) — zero spring-flavored consumers (grep evidence). The D6 slides
`--spring-deck` → `var(--spring-smooth)` pin is recorded as a G.W0 deliverable (the
canonical `--spring-smooth` it aliases is the glass-ui side of the single-source contract).

**§5 native-scroll bridge: DEFER (KEEP-BOOK).** glass-ui already runs the
native-scroll-first contract hand-rolled + hardened (`supportsCssTimeline.ts`'s
garbage-value negative probe; the inert-on-native dual-path-single-writer rule).
keyframes' `createNativeTimeline` is the opposite shape (a JS timeline OBJECT to drive an
animation, vs glass-ui's "detect native → go inert → let CSS own it"). `supportsCssTimeline.ts`
+ `scroll-driven.css` UNTOUCHED. **Trigger:** a consumer needs a reactive JS scroll value
ON a supporting engine driving a non-CSS-expressible animation.

**AV.W3.6 Baseline CSS-motion folds (typed/active VT, `@starting-style`/`allow-discrete`
dock/popover/tooltip extension, `color-mix(in oklch)` dock phase-tint): NOT landed in
W3** — they ride AV.W5/W7 (the styles/dock hygiene + perf arms). W3's styles touch is the
C2 spring-token convergence only (the cleanest token-touch home, per the spec's "fold
where the token-touch is cleanest"). The C3 dock velocity-continuity seam is already wired
at HEAD (`useLayerTransition.ts:202-223` AV.W9.2 re-seats the live `SpringProgress` from
`(value, velocity)` on a retarget) — recorded, not re-edited (the §4 Do-NOT-touch spring
block).

### §3 grep result (recorded)

`grep -rn "stagger|Sequence|setTimeout.*cascade" src/` → exactly two hand-rolled linear
ramps (`useStagger.ts:123-137`, `useStaggerReveal.ts:65-68`), both KEPT (D1 BOOK). FLIP:
two hand-rolled measure/pin/invert sequences (`useLayerTransition.ts`,
`useGlassCarousel.ts`), both KEPT (D2 DEFER — no `flip()` export). `Sequence`/`drag`/`decay`
— no hand-roll in `src/`, SKIP.

### Gate matrix

- `proof:motion-composables-consumer` (NEW, born-RED) — **GREEN**. 2 items, 4 consumer
  paths checked (each composable: demo route + test, both resolve at HEAD); 2 pending
  cross-repo slides forks listed, NOT counted. Bite-verified: drop a consumer → the item
  falls under 2 resolving consumers → RED.
- `proof:motion-value-free` (NEW) — **GREEN**. 6 guarded files
  (`useCountup`/`vReveal`/`useStagger`/`useStaggerReveal`/`useLayerTransition`/`useGlassCarousel`):
  zero `@mkbabb/value.js` imports, zero `loadAnimationEngine`/`animate`/`CSSKeyframesAnimation`
  HEAVY edges.
- `proof:vueuse-free-root` — **GREEN** (`vReveal` is dependency-free; `useCountup` is OFF
  the root). `proof:consumers:static` — **GREEN** (`vReveal` added to the targeted
  root-surface allowlist alongside the View-Transition trio). `proof:strict-templates` —
  **GREEN**.
- `proof:dock-motion-parity` / `proof:dock-motion-single-source` — **GREEN** (the
  `DOCK_SPRING` driver is untouched; D2 deferred).
- New motion `__tests__/` — **GREEN** (`useCountup.test.ts` 5/5, `vReveal.test.ts` 5/5):
  the `[data-countup]` settle, the reduced-motion snap, the `cancel()`/scope-dispose leak
  fix, the `skip()` short-circuit; the `v-reveal`/`v-reveal:fade` hooks + `updated`
  re-apply.
- `node scripts/gates.mjs --verify-ci` — **GREEN** (manifest==ci, 42 gates; both new gates
  registered in `package.json`, `gates.mjs`, `ci.yml`).
- `npm run typecheck` — **GREEN**. `npm run build` — **GREEN** (both arms).

Green run id: local — recorded above (CI run id to be stamped by the orchestrator at
integration).

## W2 — blob-converge (aurora↔blob shared-GLSL convergence)

**Status:** DEV-COMPLETE, green.

### What landed

The shared procedural-color/noise GLSL chunk
`src/composables/glass/webgl/shaders/procedural-color.glsl.ts` is created as the
SINGLE GPU-side source of the math both shaders need:

- `OETF_GLSL` — the sRGB OETF + inverse (`srgbToLinearCh`/`srgbToLinear`/
  `linearToSrgbCh`/`linearToSrgb`), VERBATIM from the blob's former local block. THE
  HEADLINE: there is now exactly ONE OETF; aurora's (AV.W1-copied) and the blob's can
  never again diverge — the root cause of the AV.W1 too-dark defect is structurally
  eliminated.
- `OKLCH_MATRICES_GLSL` — the four Ottosson `mat3` literals (`LINEAR_SRGB_TO_LMS`,
  `LMS_TO_OKLAB`, `OKLAB_TO_LMS`, `LMS_TO_LINEAR_SRGB`) + the four space-conversion
  fns (`srgbToOklab`/`oklabToLinearSrgb`/`oklabToOklch`/`oklchToOklab`), VERBATIM
  (value.js EXACT constants, transposed for GLSL column-major). The blob splices it;
  aurora does NOT (no in-shader OKLCh path — KISS).
- `FBM_ROT_GLSL` — the byte-identical `const mat2 FBM_ROT = mat2(0.8, 0.6, -0.6, 0.8);`
  rotation constant. BOTH shaders splice it.

Both `.frag.ts` modules splice the chunk via JS template-literal interpolation
(`${OETF_GLSL}` / `${OKLCH_MATRICES_GLSL}` / `${FBM_ROT_GLSL}`) at module load — NO
`#include` preprocessor, NO new bundler step (the SOTA-crosswalk-ratified KISS choice).
The chunk is imported with a relative specifier (`../../../../composables/glass/webgl/shaders/procedural-color.glsl`)
matching the repo's relative-import convention (the `@/` alias in CLAUDE.md has no
tsconfig `paths` entry and is unused elsewhere in `src/`; using it would be a born-RED
import). The renderer consumers (`useMetaballRenderer.ts`, `runtime.ts`) are UNTOUCHED
— the `.frag.ts` modules still export the same assembled `*_SRC` string.

### `hash21`/noise-helper route decision (§3a)

**Route: `hash21` + value-noise + the `fbm` LOOP scoped OUT of the chunk** (each shader
keeps its own). The two HEAD hashes legitimately DIVERGE — aurora uses a 2D
`fract(p*vec2(123.34,456.21))` hash, the blob uses a 3D `p3 = fract(vec3(p.xyx)*0.1031)`
hash — and the `fbm` loop shapes differ (aurora 2.02 lacunarity + uniform-driven
octaves vs the blob 2.0 + param octaves). Reconciling them would re-bless BOTH shaders'
noise fields for no gain — the over-abstraction the wave forbids. Per §3a the OETF +
matrices + FBM_ROT are the MANDATORY convergence; the noise helpers are extract-if-clean
and they are NOT cleanly KISS, so only the byte-identical `FBM_ROT` CONSTANT converges
(each `fbm` loop references it but stays local). NO snapshot re-bless was needed — the
emitted GLSL is character-equivalent modulo the splice boundary.

### A7 shared-noise leaf — DEFER (crosswalk-consistent)

No simplex/`snoise` basis was minted (substrate-without-consumer per J inv 10). The
named trigger: **AV.W8 constellation** landing needing the same fbm/domain-warp basis is
the third consumer that clears the ≥2-distinct-consumer bar; at that point the
value-noise/simplex sub-source folds into THIS chunk (its named landing site).

### Character-equivalence

The assembled `METABALL_FRAGMENT_SRC` and aurora `FRAGMENT_SRC` carry the EXACT spliced
OETF/matrix/FBM_ROT blocks (verified by evaluating the template literals and asserting
each block is `includes`-present byte-for-byte, no unresolved `${`, aurora carries NO
OKLCh matrices, each shader's local `fbm` loop is preserved and references `FBM_ROT`).
The splice boundary is the only diff vs a hand-inlined shader. `dist/useWebGLCanvas-*.js`
carries the inlined OETF (`1.055`), the matrices (`0.4122214708`), and `FBM_ROT` — fully
inlined; no separate `procedural-color` chunk is emitted.

### Live WebGL2 compile+link verify

Both shaders compile + link on a LIVE WebGL2 context (headless Chromium 1.58.0 via
Playwright; a real `canvas.getContext('webgl2')`): a harness embedding the assembled
fragment + vertex strings compiled both shaders and linked both programs —
`{ webgl2: true, metaball: { ok: true }, aurora: { ok: true }, pass: true }`. The only
console error was a benign `favicon.ico` 404 (no shader/GL error). This is the binding
evidence that the spliced GLSL is syntactically valid (a name-collision or broken splice
would fail `gl.linkProgram`).

### `/color` leaf no-op confirmation (§3.6 / DEC-AT-7)

The CPU-side color-resolution path was ALREADY converged at the `/color` leaf at HEAD —
aurora's `oklchToLinear` palette bake and the blob's `oklchToGammaRgb` resolver both
source value.js's Ottosson core through the one leaf. No forced shared resolver was
invented (aurora bakes a PALETTE of stops, the blob resolves a SINGLE base color —
different signatures, legitimately). W2's convergence is the GPU-side GLSL math; the
CPU-side leaf convergence is a landed no-op. `src/composables/color/index.ts` was NOT
touched.

### Gate matrix

- `proof:shader-shared-source` (NEW, born-RED) — **GREEN**. Chunk single-source: OETF
  4/4, matrices 4/4, FBM_ROT 1/1; both frags local-defs 0/0/0; both splice the chunk.
  Bite-verified: re-inline a local `vec3 linearToSrgb` into aurora.frag.ts → RED;
  re-inline a `mat3 LINEAR_SRGB_TO_LMS` literal into metaball.frag.ts → RED.
- `proof:blob-color-equivalence` (8-assert 1e-6) — **GREEN** (8/8; matrices moved homes,
  byte-identical).
- `proof:blob-space-gamma` — **GREEN**.
- `proof:aurora-space-gamma` (AV.W1) — **GREEN** (aurora's OETF now sourced from the
  chunk; the call still precedes `fragColor`).
- `proof:blob-value-free` — **GREEN** (the chunk is GLSL string, value.js-free; the lone
  `value.js` dist substring is a provenance COMMENT, `@mkbabb/value.js` count = 0).
- `proof:webgl-substrate-single` — **GREEN**.
- `node scripts/gates.mjs --verify-ci` — **GREEN** (manifest==ci, 40 gates; the new gate
  is registered in `package.json`, `gates.mjs`, and `ci.yml`).
- `npm run typecheck` — **GREEN**.
- `npm run build` — **GREEN** (both arms; dist carries both assembled shaders inlined).

Green run id: local — recorded above (CI run id to be stamped by the orchestrator at
integration).
