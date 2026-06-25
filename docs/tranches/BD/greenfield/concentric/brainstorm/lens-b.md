# Concentric — GREENFIELD lens-b (CROSS-ENGINE / PERF-FIRST)

> Lens: design for FLAWLESS Chrome AND Safari + performance. The level-set / topography
> contours must be perfect on WebKit. Favor the simplest mechanism that hits the bar (KISS).
> GPU-only where it is a viz; offscreen-pause inherited.

## 0. SOURCE-VERIFY — what is REAL vs SPEC'd (grepped + live-read, not asserted)

Every symbol below was grepped on disk at HEAD; every visual claim is a live `/substrates/concentric` read (WebGPU primary active, `navigator.gpu` present, screenshots captured both modes).

**REAL (ships, verified):**
- `levelField.ts` — `sampleHeight(p,t,q)` IS a true curl-warped fbm topography evaluator. NOT a radial sum-of-sines. It composes the SHARED `waveField` leaf: `waveFlow` (continuous traveling-wave flow warp), `cursorSwirl` (cursor gravity), `heightField` (the low-octave value-noise fbm), `waveSwell` (ω=√(g·k) breathing). The radial ring engine (`ringField.ts`) is RETIRED — grep finds no `ringField.ts`, no `sampleRingField` in `src/`. **The clean break already happened.**
- The two shaders (`concentric.wgsl.ts` / `concentric.glsl.ts`) transcribe `sampleHeight` line-for-line and extract iso-contours via the KEPT IQ gradient-free `contourInk` (`band=|fract(fN+0.5)−0.5|`, `aaW=fwidth(fN)`). The density tracks `1/|∇H|` automatically (bunched on steep ground — a real topographic map).
- The SHARED `waveField` leaf is real: `waveFlow`/`cursorSwirl`/`heightField`/`waveSwell`/`cellTwist`/`cellWarpBeforeHeight` all exported at `src/composables/glass/wave/waveField.ts`, with `.glsl.ts` + `.wgsl.ts` twins. This IS the paper-grid kinship — a tune lands once, both viz move together.
- The substrate lifecycle is real + correct: `useConcentric` → `createGpuSubstrate` picker (WGPU primary / WebGL2 fallback), offscreen-pause, `content-visibility:auto`, live-PRM freeze, the shared `usePointerVelocityField` fed via `onFrame` (NO own rAF). Cursor mapped to domain space with a velocity LEAD (gravity trails the pointer — liquid weight). This is all KEEP.

**STALE / DRIFTED (the gaps this lens names):**
- `BD.W-CONCENTRIC-LEVELSET.md` is STALE relative to the code. It specs a `field: "rings" | "levelset"` mode axis with `"rings"` as a byte-identical default. **That axis does not exist** — the code went FURTHER than the spec: there is no rings mode, levelset IS the only path. The wave-amendment must reconcile this (the spec's L2 "default is byte-identical rings" / L4 "contourInk byte-untouched" clauses are obsolete; the real fence is now the topography READ, not a mode toggle). See §6.
- The demo page intro copy still reads "A WebGPU-first radial Fourier ring-interference field … concentric ellipsoid rings whose interference is a sum of radial harmonics" (`concentric.vue` story hero `desc`). **This is dead copy** describing the retired engine. A one-line copy fix is owed.
- `useConcentric.ts:63` doc-comment still says "the ONE math source `ringField.ts`" + "radial-Fourier field". Dead comment.
- `concentricWGPUSetup.ts:4` header still says "radial-Fourier ring evaluator". Dead comment.

**THE TEAL-NAVY RE-OPEN (binding purge violation — verified literal):**
- `demo/stories/substrates/presets.ts`: `CONCENTRIC_THEME_PALETTE = [{L:0.16,C:0.04,h:250}, {L:0.52,C:0.12,h:210}, {L:0.9,C:0.07,h:190}]` + `CONCENTRIC_PRESET_THEME.background = {L:0.12,C:0.03,h:255}`. Hues **250 / 210 / 190 / 255 ALL sit inside the BINDING purge band hue∈[180,270]** with chroma above the W-NO-GRAY neutral floor. The comment literally says "aurora-teal rings over an indigo ground" + "a deep indigo ground … a teal-cyan … a bright aqua". This is the EXACT teal-on-navy the user said "REMOVE … entirely" (§E). It is a non-DEFAULT preset (the demo defaults to `CONCENTRIC_PRESET_WARM`), so `proof:teal-navy-purge`'s default-shown sampler may not catch it — but the spirit is violated and the literal lives. **The amendment PURGES this preset** (re-theme to a warm-divergent or amber-magenta-ember alt; presets-in-consumers stays, but never teal-navy).

## 1. THE LIVE GESTALT VERDICT (painted-pixel read, BOTH modes — default-to-broken)

**Structure: PASS (genuine).** The contours ARE true level-set topology — irregular iso-lines that bend, branch, form nested basins + ridges, merge and split exactly like a topographic map. The warp is visible (the field drifts + twists). This is NOT naive concentric circles. The hardest part is DONE.

**Execution: FAIL on three counts (the bar is gestalt; default-to-broken):**

1. **ANEMIC / near-invisible.** The contours render as THIN, DASHED orange hairlines. At the substrate DPR the `contourInk` line is sub-pixel, so the AA aliases the iso-line into a broken dotted stroke — fragile, not the confident continuous topographic-map ink. Live both modes.
2. **FLAT GRAY GROUND — the §3 systemic finding, CONFIRMED live (7 vizzes now).** The WGSL renders premultiplied-alpha over a TRANSPARENT background; `tone` (the warm height ramp, basins-cream→ridges-amber) is multiplied by `ink` (the line alpha) — so **the ramp ONLY tints the LINES; between lines alpha=0 and the page's flat grey-cream plate shows through.** There is NO warm FILL. The whole field reads gray-beige. avg impression: gray-dominant, low chroma. Fails "vivid/warm not gray."
3. **MODE-FLAT.** In `html.dark` the canvas STILL shows a light grey-cream plate (the transparent ground lets the flat page plate through in both modes — there is no per-mode warm ground). The dark-mode read is not a dark warm-ember topography; it is the same anemic light read. Fails "both modes."

**Root cause is ONE line of compositing philosophy:** concentric draws LINES over nothing. The iOS-27 / topographic-map register is a FILLED hypsometric tint (the colored elevation bands of a real topo map / a weather pressure map) WITH the iso-lines on top — the color IS the field, the lines are the contour overlay. The fix is to paint the height ramp as an OPAQUE (or near-opaque) hypsometric FILL first, then composite the contour ink on top. That single change converts the anemic line-doodle into a living, vivid, weighty topography — and it is the §3 "colorful field behind glass" fix delivered AT the viz.

## 2. THE GREENFIELD DESIGN — "the living hypsometric topography" (KISS, cross-engine)

The viz is RIGHT in bones; it is BROKEN in compositing + presence. The greenfield is a **survival-of-the-fittest REFINE of the extant engine**, not a rebuild. Keep `levelField.ts` + the shared `waveField` leaf + `contourInk` + the substrate. Change WHAT the fragment paints, and add the missing warm ground.

### A. FILLED hypsometric tint + contour overlay (the §3 fix at the viz — the boldest move)

The fragment composites in two layers, in ONE pass (no extra target):

```
// 1. THE HYPSOMETRIC FILL — the field IS the color (a real topo / weather-map ramp).
//    tone = clamp(0.5 + H*uFieldNorm, 0, 1)  // the height → ramp position (already computed)
//    fill = samplePaletteLin(tone)            // basins cool-cream → ridges warm-amber, OKLab-mixed
//    This is now OPAQUE (alpha 1 over the per-mode warm ground), not multiplied by ink.
// 2. THE CONTOUR INK — the iso-lines on TOP of the fill (a darker/lighter ember of the SAME ramp).
//    inkColor = mix(fill, contourTint, ink)   // contourTint = a deeper ember (L−0.2) of the local fill
//    so the line reads as a darker edge of its own band — the topographic-map signature.
// 3. OUTPUT opaque: vec4(linearToSrgb(inkColor), 1.0).  The viz is a SOLID warm topography,
//    NOT transparent line-scaffolding. It IS the colorful field §3 demands.
```

Why this is the right mechanism (KISS + cross-engine):
- It DELETES the broken "lines over transparent" path. No premultiply edge cases, no flat-plate bleed-through, no sub-pixel dashing dominating the read (the fill carries the field even where the line aliases).
- It is the SAME palette + the SAME `tone` + the SAME `contourInk` — a ~6-line `main()` rewrite in each twin, byte-mirrored. Zero new uniforms beyond a `contourTintDelta` constant (or derive it from the palette).
- It is identical math on WGSL + GLSL → trivial Safari parity (no `backdrop-filter:url`, no Houdini, no compute — a pure fullscreen fragment, which WebKit's WebGL2 fallback runs flawlessly today).

### B. THE PER-MODE WARM GROUND — route into the SHARED `BD.W-PAGE-BACKGROUND` warm-mesh (NOT a sibling)

The §3 root cause is "the page is FLAT." The binding instruction: route the warm-ground fix into the SHARED `BD.W-PAGE-BACKGROUND` warm-mesh, **NOT a new sibling viz, NOT `auroraFallbackGround`.** So:
- The viz now paints OPAQUE (§A), so it no longer NEEDS the page field to read — the topography IS the colorful field. But the substrate page chassis still owes the warm mesh behind the GLASS demos (the systemic §3). Concentric's contribution: it stops being a transparent line-scaffold that REVEALS the flat plate, and becomes a self-sufficient warm field. The page-background wave's `liquid-grid`/warm-mesh map (already specced, `manifest.ts` `CATEGORY_DEFAULT_BG`) handles the OTHER glass bands; concentric's substrate page reads the warm mesh as a fallback ground ONLY where the viz is `background:"transparent"` (the library default). **The default config flips `background` from `"transparent"` to the per-mode warm-ground token** (light: warm-cream `L≈0.96,C≈0.012,h≈85`; dark: warm-ember `L≈0.14,C≈0.02,h≈55`), resolved via the existing `bgStyle` CSS path + passed as `uBg` so the FILL composites over a real warm floor in BOTH modes. This is the BA.W-NO-GRAY warm floor, per-mode, plain arms (NOT a `light-dark()` inset trap).
- Net: concentric never reads gray. The fill carries warm in light mode; the dark arm swaps the ramp anchor to a warm-ember basin → amber-gold ridge ladder (a per-mode palette, two plain arms — no smuggled teal).

### C. THE CONTOUR INK — confident + continuous (kill the dashing)

The dashing is sub-pixel aliasing. Fix WITHOUT new machinery:
- Bump the effective line half-width so the stroke is ≥1.5 device px at the substrate DPR (`lineWidth` default 1.8 → resolve against DPR in the uniform bridge so it is DPR-stable, not CSS-px guessed).
- Add the SOTA topographic "index contour" register the LEVELSET spec already names (`levelJitter(round(H·N))`): every Nth iso-line (e.g. every 5th) is BOLDER + carries a faint label-weight — the real topo-map "index line" idiom. Pure `f(level)` (a hash of the rounded level index → a per-level width/darkness offset), stateless, no buffer. This makes adjacent bands read DISTINCT (the spec's L3 jitter clause, delivered as the index-contour register).
- The ink color is a darker ember of the LOCAL fill (§A.2), not a flat orange — so the line reads as the edge of its own elevation band (parallel-curve topographic signature).

### D. ALIVE + WEIGHTY + cursor-reactive (KEEP + elevate)

Already real, KEEP: the `waveFlow` continuous drift, the `waveSwell` ω=√(g·k) basin breathing (weight/inertia), the `cursorSwirl` + Gaussian cursor-well bulge (gravity, velocity-led). Elevate to the liquid-weight bar:
- The cursor well should MORPH MORE on move (the universal liquid-weight law: morph more on move). Scale the well depth + radius by the pointer SPEED (`usePointerVelocityField.velocity` magnitude, already available) — a fast sweep bulges the topography hard + drags a wake; at rest it settles with overshoot (the spring ease already in `getAmp`). This is squash-&-stretch with real weight on the field itself.
- The swell + the cursor well together give the "living topographic map" read — basins inflate/deflate (breathing) while the wave flows the contours across (drift) and the cursor pulls a mountain up under the pointer (gravity). All three are extant; the amendment just verifies they read at the new opaque fill amplitude.

### E. ARISTOTELIAN proportion + warm identity

- The contour-level count + the index-contour interval are golden-ratio related (e.g. 13 levels, index every 5 — Fibonacci neighbors). The warm-identity ramp stays the library default (`WARM_IDENTITY_PALETTE`, hues 80/62/44 — warm cream→amber→ember, all OUTSIDE the purge band). The demo theme preset is RE-THEMED off teal-navy (§0) to a warm-divergent alt (e.g. a sunset coral→magenta-ember ramp over a deep warm-plum ground, all hues outside [180,270]).

## 3. CROSS-ENGINE (Chrome + Safari) — the lens's core

- **Pure fullscreen fragment, both backends.** WGPU primary + WebGL2 GLSL fallback already mirror byte-for-byte. WebKit runs the GLSL twin today (no WebGPU on shipping Safari yet); the opaque-fill rewrite is the SAME 6 lines in both. No `backdrop-filter:url`, no Houdini `paint()`, no compute — nothing WebKit chokes on.
- **sRGB color-interp / OKLab in-shader.** The palette mix is already OKLab-in-linear (`samplePaletteLin` via `OKLCH_MATRICES`), output through the shared OETF (`linearToSrgb`). No CSS `color-mix(in oklch)` dependency that WebKit gradient-banding would hit. The fill bands stay smooth on Safari.
- **No meatball here** — concentric is a fragment field, not a goo-blob; the metaball law is N/A. But the §3 warm ground IS shared with the goo vizzes, so the per-mode warm-ground token is the same one the meatball surfaces read (DRY).
- **Performance.** ONE draw (3 verts), ONE uniform write per frame, sub-2× DPR ceiling (`resolveBudgetDpr`), offscreen-pause + `content-visibility:auto` + PRM-freeze all inherited. The opaque fill is the SAME ALU cost as the line-only path (one extra `mix`). Net: zero perf regression, simpler blend (opaque output → the compositor drops the premultiply blend mode entirely → CHEAPER). Offscreen-pause: a screen-down concentric spends zero frames.

## 4. a11y / PRM carve

- `aria-hidden="true"` on the canvas (decorative) — KEEP.
- PRM: `getAmp()→0` freezes the wave envelope → ONE static topography frame (the substrate-PRM freeze, extant). Under the new opaque fill this is even BETTER — a static frame still reads as a full warm hypsometric map (a beautiful still topo print), not a frozen scaffold of faint lines. KEEP.
- The cursor-well + velocity morph are gated on `config.interactive` + `pointer.active` + PRM (the field freezes under PRM via `tick(0)`). KEEP.
- No motion-essential information; the field is pure ambience. Contrast is N/A (decorative) but the AA prose over it is the page chassis's concern (the opacity-ceiling read-through the page-background wave owns).

## 5. HOW IT COMPOSES EXISTING PRIMITIVES (deft, KISS, DRY — a UNION not a fork)

| Need | Reuse (extant) | Touch |
|---|---|---|
| Topography math | `levelField.ts` `sampleHeight` + shared `waveField` leaf | KEEP byte-for-byte |
| Contour extraction | IQ `contourInk` (both twins) | KEEP (operator), bump DPR-stable width |
| Hypsometric fill | `samplePaletteLin` + `tone` (already computed) | REWIRE: fill opaque, ink on top (~6 lines/twin) |
| Index-contour | `levelJitter(round(H·N))` pure `f(level)` | ADD (stateless, the spec's L3 jitter) |
| Warm per-mode ground | `BD.W-PAGE-BACKGROUND` warm-mesh + per-mode `background` token | ROUTE (default `background` flips off `transparent`) |
| Cursor weight | `usePointerVelocityField` velocity (already fed) | ELEVATE (well depth ∝ speed) |
| Lifecycle/perf | `createGpuSubstrate`, offscreen-pause, PRM, DPR ceiling | KEEP |
| Demo theme | `presets.ts` (presets-in-consumers) | PURGE teal-navy → warm-divergent |

No new composable. No new shader file. No second noise basis (the shared `field/noise`+`field/flow` chunks stay single-source). No re-fork. The whole greenfield is a fragment-`main()` recomposition + a default-config flip + a preset purge + 4 dead-comment fixes.

## 6. THE WAVE-AMENDMENT (reconcile vs the 116 union waves — NO dup)

- **`BD.W-CONCENTRIC-LEVELSET` — AMEND (the code outran the spec).** The spec's `field:"rings"|"levelset"` mode axis + the L2 "default byte-identical rings" / L4 "contourInk byte-untouched diff against rings HEAD" clauses are OBSOLETE (rings is RETIRED, no mode toggle ships). RE-POINT the wave to the REAL remaining work: (1) the hypsometric OPAQUE FILL compositing (§2A — the §3 fix at the viz), (2) the per-mode warm ground via the SHARED page-background route (§2B — NOT a sibling), (3) the index-contour register (§2C — the L3 jitter, delivered), (4) the DPR-stable line width (§2C — kill the dashing). KEEP the L1 "shared `field/noise`+`field/flow`, no re-fork" + L5 "numeric JS↔WGSL↔GLSL parity via `shader-eval-harness`, not name-presence" fences — those are still load-bearing and still TRUE on disk. The binding π becomes a PAINTED-PIXEL hypsometric-fill readback (avg chroma + warm-fraction + non-gray + both-mode warm ground), NOT a geometric line-presence proxy.
- **`BD.W-PAPERGRID-WARP` — NO dup, sibling-coherent.** Concentric's warp is the SAME shared `waveField`/`curlFBM` leaf paper-grid deepens. The concentric amendment touches NOTHING in the warp octave-depth (that is paper-grid's wave); it only consumes the shared warp. The kinship holds: a paper-grid warp-depth tune flows into concentric for free. No collision.
- **`BD.W-CONCENTRIC-RADIUS` — NO collision (verified).** That is a CSS `--radius-concentric` register (Apple `containerConcentric`), orthogonal to the viz. Different namespace, different file (`theme/radius.css`). The name overlap is incidental. No amendment interaction.
- **`BD.W-PAGE-BACKGROUND` — CONSUME, do not dup.** Concentric routes its warm ground through this wave's per-category warm-mesh map (the substrates band already reads a live field; the concentric default `background` token is the per-mode warm floor the chassis owns). The amendment adds a one-line note: concentric is now SELF-SUFFICIENT (opaque fill) so it no longer DEPENDS on the page field to read — it CONTRIBUTES one.
- **`proof:teal-navy-purge` / `proof:concentric` clause 5 — HARDEN.** The amendment adds the demo `CONCENTRIC_THEME_PALETTE`/`CONCENTRIC_PRESET_THEME` to the purge census (hues 250/210/190/255 RED today as a latent teal-navy literal even though non-default-shown). Re-theme to warm-divergent. Re-point any surviving `/sampleRingField/` name-presence assert (dead — the symbol is gone) onto the real `sampleHeight` numeric parity.

## 7. DELTA-ASSAY summary (current → greenfield)

| Axis | CURRENT (live-verified) | GREENFIELD |
|---|---|---|
| Topology read | TRUE level-set contours (PASS) | KEEP — unchanged bones |
| Presence | anemic thin DASHED hairlines over flat gray plate (FAIL) | opaque hypsometric FILL + bold continuous ink (vivid warm field) |
| §3 colorful field | absent — transparent ground reveals flat plate (FAIL) | viz IS the colorful field; warm ground routed via shared page-background |
| Both modes | light grey plate in BOTH (FAIL) | per-mode warm ground (cream / ember), two plain arms |
| Warm/not-gray | gray-dominant (FAIL) | warm hypsometric ramp, all hues outside [180,270] |
| teal-navy | RE-OPENED in demo preset (h 250/210/190/255) (FAIL) | PURGED → warm-divergent preset |
| Alive/weighty | drift+swell+cursor real (PASS) | KEEP + elevate (well ∝ pointer speed, morph-more-on-move) |
| Cross-engine | WGSL/GLSL parity real (PASS) | KEEP — opaque rewrite is identical both twins |
| Perf | one draw, DPR-capped, paused offscreen (PASS) | KEEP — opaque output is CHEAPER (no premultiply blend) |
| Spec fidelity | LEVELSET wave STALE (mode axis never built) | AMEND to real work; obsolete clauses retired |
| Dead copy | story hero + 3 comments say "radial Fourier rings" | FIX (4 one-liners) |
