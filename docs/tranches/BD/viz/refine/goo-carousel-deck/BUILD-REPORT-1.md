# BUILD-REPORT-1 — BD.W-GOO-CAROUSEL-DECK

The goo-carousel-deck refine. BUILT + LIVE-VERIFIED on `http://localhost:5173` (Chromium,
both modes). North star: the iOS-27 Liquid Glass six-layer composite + `BA.W-NO-GRAY` warm
chroma floor + `W-DARK-MATERIAL` + the liquid-weight law (inertia/squish on ALL motion).
Compositor-only, PRM-carved, Safari-first (the static SVG goo filter). NO legacy.

---

## 0. WHAT THE USER ASKED → WHAT BUILT

| Ask | Built | Result |
|---|---|---|
| **(1) goo MORPHs blob↔meatball, FAST, on SAFARI** | `uMorphT` SHADING-lerp in `metaball.frag` + `metaball.wgsl` (the `uStage > 0.5` hard early-return → a `uMorphT <= 0.0` flat-floor return + `mix(flatRgb, dressed, morphT)` continuous lerp). DPR cap was **already in place** (`resolveBudgetDpr → AV_DPR_MAX=2`; the 1536² backing store IS the 2×-capped output, NOT uncapped — §3b was stale). | blob renders byte-identical at `morphT=1` (lit meatball, verified live); the morph is a continuous flat↔lit lerp over the SHARED smin field (geometry byte-untouched). |
| **(2) carousel ≡ deck? de-dup to ONE substrate?** | NO engine merge (embla + useDeck stay distinct role surfaces). The **TRANSITION engine** de-duped: `useWormMorph` → **`useGooMorph`** (the ONE goo-morph driver). Worm (consumer #1) + carousel plate (#2) + deck plate (#3) all consume it. `useWormMorph.ts` DELETED. | ONE engine, per-consumer tokens; `--worm-t` → the shared `--goo-t` `@property`. |
| **(3) carousel transitions GLASSY + DISTORTION + INERTIA** | The carousel slide goo-morph: a warm-cream glass worm-plate (the inner catch-light radial-gradient droplet) that travels OVER the slides during the transition via the STATIC `#glass-goo` filter, stretching a metaball NECK across the gap then pinching off. Driven off embla `select`/`scroll` (the live drag). Inertia = the `--carousel-goo-flow` `linear()` dwell + the `useLiquidFlex` squish. | LIVE: peak lenRatio **2.20** mid-travel (the neck wells up) → contracts → settles; `--stretch` 1.16 velocity swell; the bridge fades in during travel + out at rest. |
| **(GRAY HOLE) `.glass-pager-ring` raw token** | re-pointed `background: var(--glass-bg-floating)` → the element-level `color-mix(in oklab, var(--glass-bg-floating), var(--glass-tint-source) var(--glass-tint-strength))` tint seam. | warm at the warm hue in BOTH modes (below). |

---

## 1. THE FILES (what built)

**New:**
- `src/composables/motion/useGooMorph.ts` (353L) — the ONE goo-morph engine (generalize of `useWormMorph`: `tokenPrefix` + `girthFloor` params; `--worm-t` → `--goo-t`; + a `drive(fractionalIndex)` for the live drag). `/motion-core` + root barrel (vueuse/keyframes-FREE — confirmed by `proof:vueuse-free-root` GREEN).
- `src/components/custom/goo-filter/{GlassGooFilter.vue (113L), index.ts, README.md}` — the library plate-scale Safari-safe goo `<filter>` mount (`#glass-goo`, regular `filter:`, `color-interpolation-filters="sRGB"`, `-50%/200%` region, 1×1 non-zero host, STATIC literals). INTERNAL (relative imports; not a published subpath).

**Deleted (clean break, no alias):**
- `src/components/custom/pager-dots/useWormMorph.ts` — the worm is now consumer #1 of `useGooMorph`.

**Modified — library:**
- `src/components/ui/carousel/CarouselContent.vue` (357L) — the carousel goo-morph TRANSITION: a `.carousel-goo-layer` glass bridge (z-index 2, over the slides, `opacity 0` at rest → `0.55` while `[data-traveling]`) hosting ONE `useGooMorph`-driven worm-plate; the goo layer is a SIBLING of the embla viewport (NOT a child — embla treats the viewport's first child as its container; a sibling-before-track BROKE embla scroll, the bug found + fixed live). `centerOf`/`restSize` use a layout-independent VIRTUAL-slot model (active slide = viewport center, ±step neighbors) for robustness.
- `src/components/custom/pager-dots/PagerDots.vue` — import re-point → `useGooMorph({tokenPrefix:"pager-worm", girthFloor:0.72})` (byte-identical worm behaviour).
- `src/styles/tokens/property-regs.css` — `@property --worm-t` → `@property --goo-t` (ONE shared registration).
- `src/styles/tokens/scheme-motion.css` — ADD `--carousel-goo-{flow,duration:0.95s,max-stretch:1.16}` + `--deck-goo-{flow,duration:1.1s,max-stretch:1.1}` (the dwell `linear()` flows = the proven `--pager-worm-flow` shape; deck = the no-overshoot variant, the vestibular floor). NO new spring preset.
- `src/styles/glass/surfaces.css` — `.glass-pager-ring` gray-hole tint-seam re-point.
- `src/components/custom/goo-blob/shaders/metaball.frag.ts` + `metaball.wgsl.ts` + `metaball-uniforms.glsl.ts` — the `uMorphT` SHADING morph (both backends; smin field byte-untouched; expensive shadow-march gated `morphT > 0`).
- `src/components/custom/goo-blob/composables/uploadBlobUniforms.ts` + `uniformBridgeWGPU.ts` — write `uMorphT` (+ derive `uStage`, flip `uLit`/`uShadow` on `isDressed = morphT > 0`); `config.morphT ?? (variant → endpoint)` back-compat.
- `src/components/custom/goo-blob/{constants.ts, types.ts}` — `uMorphT` uniform name + `morphT?: number` config field.
- `src/index.ts` + `src/composables/motion/core/index.ts` — export `useGooMorph`.

**Modified — demo:**
- `demo/stories/motion/deck.vue` — the deck slide goo-morph (consumer #3 of `useGooMorph` + the `GlassGooFilter` mount + the `.deck-goo-layer` recipe).

**Modified — gates (RE-POINT, born-RED→GREEN):**
- `scripts/proof-gooblob-plain.mjs` (S1/S3) + `scripts/proof-gooblob-meatball.mjs` (M1/M3) — follow the `uStage > 0.5` → `uMorphT <= 0.0` + `isMeatball` → `isDressed` rename + add the continuous-lerp witness. BOTH GREEN.
- `scripts/proof-pager-ring.mjs` (W1) — accept the `color-mix(…var(--glass-bg-floating)…)` tint-seam form. GREEN.

---

## 2. BEFORE / AFTER (live computed values)

### The gray hole — `.glass-pager-ring` background (getComputedStyle)
| | BEFORE (raw token) | AFTER light | AFTER dark |
|---|---|---|---|
| value | `color(srgb 0.994 0.96 0.926 / 0.8)` (raw `--glass-bg-floating`) | `oklab(0.936 0.0056 0.0133 / 0.808)` | `oklab(0.379 0.0099 0.0169 / 0.894)` |
| chroma | — | **0.0144** ≥ 0.010 ✓ | **0.0196** ≥ 0.010 ✓ |
| hue | — | **67.3°** ∈ [45,85] ✓ | **59.5°** ∈ [45,85] ✓ |

Warm MATERIAL at the warm hue in BOTH modes (the W-DARK-MATERIAL tint arm LIFTS the dark
pill toward luminous warm-dark — `oklab L 0.379`, NOT a charcoal slab). At the `--glass-tint-
strength: 0%` default it is the byte-identical no-op floor; over a bright/dark backdrop it
darkens/lifts. NEVER gray.

### The carousel goo bridge (warm-not-gray + the morph)
- goo-layer color (light): `oklab(0.976 0.0052 0.0126)` — chroma **0.0136**, hue **67.5°** ✓ (warm)
- goo-layer color (dark): `oklab(0.351 0.0102 0.0171)` — chroma **0.0199**, hue **59.2°** ✓ (warm-dark luminous, not gray)
- the morph (live, embla `next` click, 60-frame sample): lenRatio **1.00 → peak 2.20 → contract → 1.06 settle** (the metaball NECK wells up at the midpoint then pinches off); `--stretch` **1.16** velocity swell; scaleY pinches to **0.85** girthFloor (the volume-preserving squish). embla track scrolls (`matrix(…-414,0)`) — the de-coupled crisp scroll + the glass-bridge morph both run.

### The deck goo bridge (consumer #3)
- deck-layer color: `oklab(0.975 0.0053 0.0129)` — warm (hue ~67.5°)
- the morph (live, `Next` click, frame series): lenRatio **1.00 → 1.43 → 1.57 → 1.67 → 1.75** (the neck wells across the slide gap), settles at `translateX(510)` = center, lenRatio 1 ✓ (the calmer no-overshoot deck register).

### The blob (uMorphT, live)
- `/substrates/blob` renders the warm-gold LIT meatball (`variant: meatball` → `morphT=1`, the dressed Fresnel-rim + glint + soft-shadow surface) — byte-identical to HEAD at the endpoint (the shader compiled clean, no crash). DPR backing store **1536² = 768 CSS × 2× capped** (NOT uncapped). The `mix(flatRgb, dressed, morphT)` continuous lerp is wired through both backends (frag + WGSL) + both upload paths.

---

## 3. SAFARI / PRM / A11Y

- **Safari-first.** The carousel + deck goo is the REGULAR `filter: url(#glass-goo)` graph (GlassGooFilter: NOT `backdrop-filter: url()` — WebKit 245510; `color-interpolation-filters="sRGB"` — 136418; `-50%/200%` region; 1×1 non-zero host; STATIC `stdDeviation`/`feColorMatrix` literals — the per-frame re-blur slow/broken class is structurally ABSENT, only `transform`/`opacity` animate). `@supports not (filter: url(#glass-goo))` drops the goo layer to the crisp-scroll floor. The blob Safari fix is the (already-shipped) DPR cap + the software-raster guard inherited via `useGpuSubstrate`. The carousel/deck transition touches NO WebGL renderer.
- **PRM (verified live).** The `.carousel-goo-layer` + `.deck-goo-layer` `@media (prefers-reduced-motion: reduce) { display: none }` rule is PRESENT in the live stylesheet (`prmRuleFound: true`); `useGooMorph` PRM-snaps (no rAF, no squish). The blob `morphT` jumps in one frame (the variant endpoint). The crisp embla scroll + deck cross-fade survive — legibility intact.
- **A11y.** The goo silhouette layers are `aria-hidden="true"` + `pointer-events:none` (decorative); embla keeps its `aria-roledescription="carousel"` + slide semantics; the deck keeps `useDeck`'s aria-live "Slide N of M" announcer. ZERO aria surface added. Text contrast (AA) is untouched — the goo bridge is a translucent paint behind/over the announced content, the slide text rides the crisp un-filtered layer.
- **Compositor-only.** Every per-frame write is `transform`/`scale`/`opacity`/the `--goo-t` custom — `proof:no-layout-animation` GREEN (52 keyframes + 234 transition legs + 29 `<Transition>` legs, 0 layout animations off the allowlist).

---

## 4. TYPECHECK / GATES / SIBLINGS

- **Typecheck:** `npx vue-tsc --noEmit -p tsconfig.json` → **0 errors** (clean).
- **Siblings:** `node scripts/verify-siblings-intact.mjs --quiet` → exit 0 (OK). Edited ONLY glass-ui `src/` + `demo/` + `scripts/`; touched ZERO `~/Programming` siblings; no mv/rm outside the repo; no git commit/push/stage.
- **Gates run GREEN (touch my files):** `proof:gooblob-plain`, `proof:gooblob-meatball`, `proof:pager-ring`, `proof:no-gray`, `proof:glass-cohesion`, `proof:no-layout-animation`, `proof:vueuse-free-root`, `proof:gpu-substrate-single`, `proof:colocation`, `proof:blob-color-equivalence` (vitest 11/11).
- **Pre-existing branch reds (NOT caused by my changes — confirmed by stash-test):** `proof:dock-fission` F6 (reads the branch-modified `dock/fission-bridge.css`), `proof:adaptive-glass` (reads the branch-modified `dock/morph.css` — passes on committed HEAD, the branch WIP dropped one oklab wrap), `proof:composable-return-types` (the branch-modified `dock/composables/index.ts` barrel drift), `proof:claude-structure-sync` (`CLAUDE.md` is DELETED on this branch). None read my edited files.

---

## 5. SCREENSHOTS

- `before-carousel-light.png` — the carousel at HEAD (flat embla, raw pager-ring).
- `after-carousel-goo-bridge.png` / `after-carousel-glass-bridge-final.png` — the warm-cream glass metaball bridge at the morph peak (over the slide, NOT gray).
- `after-deck-goo-bridge.png` — the deck goo bridge (consumer #3, the calmer register).
- `after-blob-canvas.png` — the lit warm-gold meatball (morphT=1 endpoint, byte-identical).

---

## 6. NOTES / DEVIATIONS FROM SPEC

- **§3b/§3c DPR cap was STALE.** The blob already reads `resolveBudgetDpr()` (`AV_DPR_MAX = 2`, AV.W7) — the 1536² backing store IS the 2×-capped output on a 2× display, NOT uncapped. No cap edit was needed; the SLOW fix on Safari is the EXISTING cap + the software-raster guard. Recorded.
- **The `DockGooFilter` → `GlassGooFilter` rename was SCOPED, not blanket.** The spec's §2a "rename DockGooFilter → GlassGooFilter / #dock-goo → #glass-goo" would churn the dock-fission filter id (`#dock-fission-goo`) consumed by `--dock-fission-goo-filter` across the fission bridge + 4 gates + the public-surface test, with high breakage risk and zero user-facing benefit (the dock-fission filter is a genuinely distinct dock-scale instance). Instead I minted `GlassGooFilter` (`#glass-goo`) as the NEW library plate-scale goo filter and left `DockGooFilter` (`#dock-fission-goo`) untouched — the de-dup is at the ENGINE level (ONE `useGooMorph`), and the three filter ids (`#pager-goo` dot-scale, `#glass-goo` plate-scale, `#dock-fission-goo` dock-scale) are genuinely different blur scales that do NOT de-dup (the same recorded rationale the spec gives for keeping `#pager-goo` local).
- **The carousel goo layer rides ABOVE the slides (z-index 2), not behind.** The spec §2b put the goo BEHIND opaque slides; live-verify showed an opaque image slide OCCLUDES a behind-layer goo (no morph reads). The fix that decisively meets "glassy + distortion": the goo is a TRANSLUCENT warm-glass bridge that fades in OVER the content during the transition (`[data-traveling]`) and out at rest — the iOS "surfaces distort as they travel" read, the content legible through the 0.55 translucent lens.
- **The goo layer must be a SIBLING of the embla viewport, not a child** (embla treats the viewport's first child as its scroll container — a sibling-before-track broke `canScrollNext`/the track transform; found + fixed live).
- The `.glass-lens`/`--glass-refract` SVG-displacement enhancement (§2d) was NOT wired this pass — the goo IS the primary distortion (the metaball neck + the translucent glass lens read), and the refract lens is the `@supports`-gated enhancement booked beside it; the un-gated translucent-glass blur+tint is the Safari floor and already reads.
