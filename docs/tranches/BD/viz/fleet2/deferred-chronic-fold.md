# BD viz/glass/dock EXPANSION — the deferred + chronic FOLD (the §7 fleet-2 arm)

The viz/glass/dock expansion's **no-silent-drop ledger**. It does TWO jobs the union `DEFERRED-CENSUS.md` (69 rows, D1-D69) cannot: (1) it **re-scores the union rows that the GPU-only / no-Canvas2D / no-legacy mandate INVERTS or supersedes** (the viz expansion overturns specific union dispositions — those flips are recorded here, never silently); (2) it **enumerates + decides every NEW deferral the viz expansion + the 2026-06-22 media addendum introduced** (the //CONSUME interims, the budget books, the FBO/compute successors, the metallic-aurora and dot-image books, the `.wgsl`↔`.glsl` transpiler book, the "rides W-REFLECT" sweep) — items with NO prior census row.

Each row carries a terminal disposition: **BUILD** (a V0-V4 viz-band wave or a named union wave lands it) · **DEFER-with-trigger** (an honest hold + the concrete re-entry condition) · **RETIRE-with-rationale** (subsumed / permanently-out / superseded by the mandate) · **DEDUP-into-wave** · **INVERT** (a prior census/precept disposition the mandate REVERSES — the binding precept-inversion class, recorded as a decision-flip, never a silent re-open). A fold is a disposition FLIP in place; no row is deleted (L-inv-8).

This ledger FOLDS into the union `W-FOLD-LEDGER` machine-readable ledger; the no-silent-drop gate reds on any row that loses its disposition or names a phantom destination wave. Wave IDs are cross-checkable against `BD/union/{EXECUTION-DAG,UNIFIED-ROSTER}.md` + the V0-V4 band roster in `viz/VIZ-BAND-PLAN.md`.

> **The binding mandate this ledger scores against:** GPU-only (WebGPU **or** WebGL2 — both co-equal GPU backends; ZERO Canvas2D / software-raster / CSS-gradient sub-GPU fallback tier) · no-legacy/clean-break · architectural-transposition-for-elegance · KISS+DRY · Safari-first (the WebGL2 arm IS the Safari path, never deletable) · paint-first · ≥2-consumer · presets-in-consumers · foreign-tree fence.

---

## §A — The PRECEPT-INVERSION class (the binding reversals — the mandate OVERTURNS the prior census disposition)

The single most load-bearing fold of the expansion: the GPU-only mandate **inverts** a cluster of BB/BC precepts + union census rows that codified the *fallback-as-permanent-floor* model. Each is a deliberate DECISION-FLIP-with-rationale (the §5-style "cross-tranche conflict" discipline), carried with BOTH the prior disposition AND the union's re-decision so the no-silent-drop machine shows the reversal was intentional. The decision: **the charitable reading wins** — WebGPU↔WebGL2 is two co-equal GPU backends (the WebGL2 arm is the Safari path, KEPT); the forbidden "fallback" is ONLY the Canvas2D / software-raster / CSS-gradient CPU tier. (Full rationale: `audit/gpu-only-conflict.md §F`, `audit/changes-this-session.md §4`, `fleet2/gpu-only-architecture.md §8`.)

| # | Item | prior disposition | INVERTED disposition | Destination / rationale |
|---|---|---|---|---|
| F-1 | **`W-VIZ-FALLBACK-RETIRE-WATCH`** (union D34-B11) — "do NOT delete a fallback; re-affirm the fence HOLDS; the ~5-10% tail has not closed" (DEFER-with-trigger WATCH) | DEFER-with-trigger (no-delete) | **INVERT → RETIRE** | the mandate makes "no Canvas2D fallback" the LAW — the wave's whole premise (keep + protect the CPU fallback) is upside-down. The WebGL2 arm survives as a co-equal GPU **backend** (a rename, not a fallback); the CPU-tier retire-watch RETIRES. Owner: `BD.W-GPU-ONLY-SPINE` |
| F-2 | **`proof:gpu-substrate-single` clause B** (the machine-BLOCK on fallback retirement — asserts the Canvas2D/WebGL2 fallback pair stays as a parity reference) | machine-block (keep) | **INVERT → replace** | clause B RETIRES; the WebGL2-vs-WebGPU parity stays (two GPU backends), but the "Canvas2D fallback as a retained floor" clause is replaced by `proof:gpu-only-spine` G1-G7. Owner: `BD.W-GPU-ONLY-SPINE` |
| F-3 | **`PROCEDURAL-SUITE.md` "DO NOT MIGRATE"** prose (the stale instruction that the Canvas2D render paths are KEPT) | KEEP-don't-migrate | **INVERT → CORRECT** | the viz suite ALREADY renders GPU (BC migrated it); the prose is stale. Correct to the GPU-only reality + the Canvas2D-substrate delete. Owner: `BD.W-GPU-ONLY-SPINE` (§8 prose reconcile) |
| F-4 | **CLAUDE.md §"The Canvas2D substrate is single-source (BB.W-CANVAS-UNIFY)"** — documents `useCanvas2D` (0 live callers) | canonized | **INVERT → RETIRE the section** | `useCanvas2D`/`resolveCanvasColor`/`subpaths/canvas.ts`/the `/canvas` export DELETE wholesale (clean break, MIGRATION row + disposition flip `book→retired`); the section retires. Owner: `BD.W-GPU-ONLY-SPINE` G1 |
| F-5 | **CLAUDE.md §"The software-raster guard + the luminance-faithful headless fallback (BB.W-AURORA-SWRASTER)"** — `auroraFallbackGround` `getContext("2d")` ground + `renderMode.ts` swraster machine + `proof:aurora-swraster` | canonized | **INVERT → RETIRE** | `auroraFallbackGround.ts` + `renderMode.ts` (`resolveRenderMode`/`isSoftwareWebGLRenderer`/the `webgl\|css\|auto` prop) DELETE; `proof:aurora-swraster` + `tests-visual/aurora-swraster.spec.ts` RETIRE with the path. The page-hang circuit-breaker SURVIVES as the selector's `"none"` verdict (don't arm a software-WebGL loop). Owner: `BD.W-GPU-ONLY-SPINE` G5/G6 |
| F-6 | **CLAUDE.md §"The WebGPU substrate is the THIRD thin backend… the WebGL2 fallback is NOT retired… the graceful path for the ~5-10% tail"** | canonized | **INVERT → RE-AUTHOR** | re-author to "TWO co-equal GPU backends selected at init" (drop "third"/"fallback"/"graceful path"/"~5-10% tail"); rename `fallback`→`backend` suite-wide across the 6 GPU viz + `useGpuSubstrate.ts` header + the PROCEDURAL-SUITE "degraded" rows. Owner: `BD.W-GPU-ONLY-SPINE` §8 |
| F-7 | **The try-then-rebuild CHAIN** — `freshCanvasForFallback` canvas-clone + `fallToWebGL2` rebuild + the dual-held `webgpu`/`webgl2` state + `onBackendFallback` (~120 LOC) | shipped substrate | **INVERT → DELETE (transpose)** | the architectural transposition: `requestAdapter()` does NOT poison the canvas (only `getContext("webgpu")` does), so probe-the-adapter-BEFORE-getContext → `selectGpuBackend` picks ONCE → one `getContext` arms; the chain/clone/dual-held state evaporate. "Never crash to black" survives as a property of selection ORDER. Owner: `BD.W-GPU-ONLY-SPINE` G3 |

**The reconcile fence (so the prior verdicts' INTENT survives):** the `.wgsl`↔`.glsl` twins are KEPT (collapsing breaks Safari-first); the WebGPU↔WebGL2 parity (`W-VIZ-PARITY-METAL` + the WGSL parity tails) STAYS verbatim with the `fallback`→`backend` rename (under the charitable reading the parity is between two GPU backends, still a ship-correctness reference); the no-GPU host is served ONE inert non-animated CSS-gradient placeholder (the honest "out of support for live motion" floor — categorically NOT a fallback viz, the `<img>`-poster-behind-`<video>` class). The literal "single-backend selector / collapse every twin" reading is REJECTED as over-reading the user's "no fallbacks" against a co-equal GPU pair.

---

## §B — The NEW deferrals the viz/glass expansion introduces (no prior census row)

Items the viz redevelopment + the 2026-06-22 media addendum + the fleet-2 research mint, each DECIDED at mint.

| # | Item | chronic | Disposition | Destination / trigger |
|---|---|---|---|---|
| N-1 | The Canvas2D-purge / GPU-only-spine wave itself (the 62nd `[NEW]` wave the union roster was SILENT on — `audit/changes-this-session.md §5.3`) | — | **BUILD** | `BD.W-GPU-ONLY-SPINE` (V0, FIRST) + `proof:gpu-only-spine` G1-G7 — the adapter-select transposition + the Canvas2D delete + the swraster purge + the §A precept-inversions; zero `proof:ba-gestalt` (zero real-GPU-pixel delta) |
| N-2 | `useGlassRenderer` Snell-bake `getContext("2d")` displacement-map (LIVE in `GlassPanel.vue`/`DockGooFilter.vue`) | — | **BUILD (separate wave)** | `BD.W-LENS-RASTER-PURGE` — fold onto the `.glass-lens` crossed-CSS-gradient squircle (`⁴√(1-(1-x)⁴)`, already shipped); if the gradient covers the profile, DELETE `useGlassRenderer` too. A glass-DECORATION wave (NOT the viz spine), sequenced with `W-GLASS-EVERY-ELEMENT`/`W-SQUIRCLE`; does NOT block the spine |
| N-3 | The shared wave-math FIELD engine (the noise basis forked 5-6×, Gerstner trapped in dot-flow, `9.81` twice — a DRY violation) | — | **BUILD** | `W-FIELD-ENGINE` (V0) — `field/{noise,wave,flow,color}.{glsl,wgsl}.ts` shared chunks + `proof:wave-field-single`; the `proof:flow-field`/`proof:viz-papergrid` round-trips FOLLOW the fold |
| N-4 | `useEmotionalState` (the 4-circumplex affect framework hoisted from the shipped `useBlobMood`) | — | **BUILD** | `W-EMOTION-PRIMITIVE` (V1) — 4 Russell quadrants, vue-only/root-barrel-eligible, ≥2 consumers (blob+aurora) + `proof:emotional-state` |
| N-5 | `useLavaField` (the reusable CPU-side procedural smin lava field) | — | **BUILD** | `W-LAVA-FIELD` (V1) — ≥2 consumers (Blob + dock goo-split) + `proof:lava-field` |
| N-6 | The 3-dot-viz UNIFY (dot-flow-field + dot-matrix + goo-dot-matrix, ~5067 LOC, same instanced-billboard+fwidth-SDF over different drivers) | — | **BUILD** | `W-DOT-UNIFY` (V2 fold) → `W-DOT-IMAGE` (the arbitrary-image/cloud-wash); clean break onto `/dot-matrix`, MIGRATION rows; absorbs union D4 |
| N-7 | The metallic aurora ×2 (`medium:"metal"` pure-specular + `medium:"metal-gradient"` sparkle/chromatic-bleed — the iOS-27 flow-field-background register) | — | **BUILD** | `W-AUR-METAL` (V2) — anisotropic-specular BRDF over the structure-tensor field; ≥2 consumers (demo metal preset + the now-playing dock-pill backdrop / `BD.W-AUR-ALBUM` metallic field) + `tests-visual/aur-metal.spec.ts` |
| N-8 | The metallic-aurora `dist/aurora.js` gzip-ceiling lift (the two metal shader bodies) | — | **BUILD (named-successor)** | `W-AUR-METAL` — the kuwahara-50000-ceiling's named successor; the anisotropic streak + sparkle are compact (structure-tensor reuse, no neighborhood-sample blowup) — a bounded lift, not a blowup |
| N-9 | concentric → topological LEVEL-SET rings (overturn the source field to contours of a curl-warped fbm terrain) | — | **BUILD** | `W-CONCENTRIC-LEVELSET` (V2) — KEEP the IQ `contourInk` extraction; consume the shared wave-math; per-ring jitter |
| N-10 | paper-grid structured multi-scale warp deepening (coarse bow + fine perturb + Gerstner breathe) | — | **BUILD** | `W-PAPERGRID-WARP` (V2) — the "deepen the warp" = STRUCTURED, never cranked amplitude; consumes the shared wave-math (discharges the booked `flow.glsl.ts` consumer-#2 "paper-grid-breathe") |
| N-11 | The robust per-viz Configurator law (dot-flow-field has NONE; lift the 3 thin + constellation onto VizStudio+Configurator) | — | **BUILD** | `W-VIZ-CONFIGURATOR-LAW` (V1) — `<VizStudio>` demo-chassis (DEMO-PRIVATE, the storybook class) + the shipped `<Configurator>`; ONE chassis, 10 consumers |
| N-12 | `useVizKeyboard` (the zero-keyboard suite gap) | — | **BUILD** | `W-VIZ-KEYBOARD` (V1) — ≥2-consumer met by construction (every viz composes it) |
| N-13 | The unified viz pointer + birthdaycolor-like generative play | — | **BUILD** | `W-VIZ-INTERACT` (V1) + per-viz `W-AUR-INTERACT`/`W-FOURIER-INTERACT`/`W-CONSTELLATION-STUDIO` (V2) |
| N-14 | The dock stranded-engine WIRE (`useDockContextSilhouette` 551 LOC, 0 exports/call-sites; `useDockLink` doesn't exist; `GlassDock.vue` composes only `useDockState`) | ✓ | **BUILD** | `W-DOCK-WIRE` (V3, PREREQUISITE) — compose the engines INTO GlassDock + export the silhouette + mint `useDockLink`; absorbs union D5/D12/D54 |
| N-15 | The one-organism dock SEQUENCE (nav→media→split→subdock→minimize→search as one continuous read; the hero capture) | — | **BUILD** | `W-DOCK-SEQUENCE` (V3) + `W-DOCK-ALBUM-FIELD` + `W-DOCK-SEARCH-BLOOM`; binding π = the side-by-side overlay against the iOS-27 reference frames |
| N-16 | The iOS-27 glass every-element suffusion (lighter inner shadow · flatter tops/sides · brighter upper/lower edges · real bleed-through) | — | **BUILD** | `W-GLASS-IOS27` + `W-GLASS-IOS27-CONTROLS` (V3) — the de-shadcn FORM precept extended to every element; KEEP+DEEPEN the glass identity, ABROGATE only the default reka/shadcn/Tailwind base styling |
| N-17 | The Maps-card EXPAND morph (compact-card → full-sheet liquid grow) | — | **BUILD** | `W-MAPS-CARD-EXPAND` (V3) — composes `useLiquidReveal`/the shipped chip/control/sheet/squircle registers; no new engine (absorbs union D57's expand arm) |

---

## §C — The NEW DEFER-with-trigger + BOOKED-successor class (honest holds the expansion mints)

Items the expansion correctly does NOT build now — each with a concrete re-entry trigger or a republish gate. The ≥2-consumer / no-overfit-substrate (J-inv-10) and the foreign-tree fences are the binding discipline.

| # | Item | chronic | Disposition | Trigger / re-entry condition |
|---|---|---|---|---|
| N-18 | The blob DENSE-SWARM register (>~50 micro-satellites: the additive-density-FBO OR the MLS-MPM/SPH fluid sim) | — | **DEFER-with-trigger** | fires ONLY if a consumer needs >~50 balls; the default multi-blob (M≤6 cores + K≤12 sats) stays on the fragment-`O(W·H·N)` floor. Do NOT build the swarm now (overfit substrate). Booked `W-BLOB-FLUID` (the lava-lamp is PROCEDURAL, not physical — the fluid sim is the dense-only escape) |
| N-19 | The ping-pong FBO multi-pass substrate (the booked aurora-Kuwahara *literal* multi-pass home + reaction-diffusion/fluid-ink/caustics) | ✓ | **DEFER-with-trigger** | re-enters when a real FBO consumer lands (≥2: the multi-pass Kuwahara + one of RD/fluid-ink/caustics); the single-pass Kuwahara (`uMedium==7`, shipped) is the interim. Absorbs union D34-B4's multi-pass arm + V4 |
| N-20 | The GPU compute neighbor-query substrate (boids/flock + the dense-lattice constellation) | — | **DEFER-with-trigger (GATED)** | union D34-B10 carried forward — ships ONLY if a real dense-count (N≫256) / ≥2-binary consumer fires; else HELD (all-pairs handles count=64). Booked `W-CONSTELLATION-GPU`/`W-VIZ-COMPUTE-DENSITY` |
| N-21 | The single-source-shader transpiler (WGSL→GLSL or a common IR — the `.wgsl`↔`.glsl` twin maintenance burden) | — | **DEFER-with-trigger** | fires if the twin divergence exceeds a maintenance threshold; the shared `field/` chunks + the parity table are the KISS DRY answer for BD. A large net-new capability with its own ≥2-consumer + correctness bar — BOOKED, not built |
| N-22 | The novel-viz tail (reaction-diffusion · fluid-ink · voronoi-flow · caustics · lightning · iso-flow · moiré · flock · chladni · truchet · marble · ripple · slime) | — | **DEFER-with-trigger** | each ≥2-consumer-gated or successor-class; `marble`→an aurora medium (defer to aurora chapter), `fluid-blob`/SPH→a blob successor (`W-BLOB-FLUID`), `ripple`/`slime`→successors once the FBO/compute substrates land. V4 is the opt-in band; the top ★★★ (RD/fluid-ink/voronoi/caustics) are the ≥2-consumer candidates |
| N-23 | The metallic-aurora chromatic-aberration per-channel UV offset (`metal` default 0; `metal-gradient` small fixed) | — | **BUILD (rider)** | folded into `W-AUR-METAL` — the same chromatic-aberration term `research/aurora.md §5 M6` books, applied to the metal base; not a standalone wave |
| N-24 | The album-derived per-PIECE GL-seam shade (`uSatColor` on the metaball field) | ✓ | **DEFER-with-trigger** | union D26 carried — re-enters when `<DockNowPlaying>` ships its ≥2nd binary consumer; the album→aurora-FIELD path IS built (`BD.W-AUR-ALBUM`); this is the per-PIECE GL-color-seam shade only. NOTE: union D34-B5 (`uSatColor` for goo satellites) DOES fire (STROKES+SQUIRCLE-REFRACT re-touch the shader, sanctioning the seam widen) — distinct from this per-album-piece row |
| N-25 | The aurora "similar logic behind it" album→aurora dock backdrop low-priority speculative book | — | **DEFER (BOOK only)** | LOW priority; the field-path album reactivity (`BD.W-AUR-ALBUM`) is the shipped version; the speculative per-surface color-handoff is book-only |
| N-26 | The fourier "thousands of phasors" stress register (the original `W-FOURIER-GPU` trigger — NOW reachable on the storage-buffer SDF) | ✓ | **BUILD** | `W-FOURIER-INTERACT` (V2) — the original booked trigger is now cheap on the migrated renderer; a `complexity="detail"` preset tracing a 200+-phasor glyph. The stale "Canvas2D / DO NOT MIGRATE / W-FOURIER-GPU booked" PROCEDURAL-SUITE prose CORRECTS (the migration happened) |
| N-27 | The viz "none"-host inert CSS-gradient placeholder (`<VizPlaceholder :stops>` OR per-viz CSS lines) | — | **BUILD** | `BD.W-GPU-ONLY-SPINE` §5b — ≥2-consumer-clean across the 10 viz; the honest no-live-motion floor (zero canvas/raster/animation), DISTINCT from the in-GPU reduced-motion one-static-frame path |

---

## §D — The "rides W-REFLECT" sweep + the binding-π discipline (the BB-disease guard)

The expansion's fleet-2 + research docs carry ~8-10 `rides W-REFLECT` / `rides the BD paint-close` deferral strings on the binding π specs (`aur-metal.spec.ts`, `dock-sequence.spec.ts`, `dock-album-stage.spec.ts`, `dock-search-field.spec.ts`, …). The BB single-terminal-reflect disease (union D42-J3) is the binding LAW: a wave that defers its OWN gestalt verdict to a later W-REFLECT is FORBIDDEN (`proof:ba-gestalt` G8). The expansion's π discipline already honors it — **each viz/dock/glass wave closes against its OWN fresh both-mode `:5199` pixels + the webkit-π + the `proof:ba-gestalt` per-wave verdict** (the dock-sequence doc states this verbatim: "Each closes against its OWN fresh both-mode `:5199` pixels + webkit-π… no deferral to W-REFLECT").

| # | Item | chronic | Disposition | Destination / rationale |
|---|---|---|---|---|
| N-28 | The ~8-10 `rides W-REFLECT` π strings on the new viz/dock/glass specs | ✓ | **BUILD (re-scope, not defer)** | every per-viz/dock/glass wave authors + GREENS its OWN binding π at its OWN close (the anti-disease close-invariant); `W-REFLECT` (union) RE-CONFIRMS on the union tree, it is NOT the first-paint. The "rides W-REFLECT" string is the union-tree re-confirm pointer, not a deferral of the wave's own verdict |
| N-29 | The Safari/WebKit real-device π for every liquid transition (the dock morph, player bloom, tab indicator, card expand) | ✓ | **BUILD** | `W-SAFARI-CAPTURE` (union) + the webkit Playwright project on every viz/dock spec; absorbs union D7. The sRGB-on-every-SVG-filter floor + the coarse-pointer scroll-jank + the backdrop-filter-in-transformed-descendant traps are `W-SAFARI-FILTER-FLOOR`/`W-SAFARI-STACKING-AUDIT` (union D63/D64/D65) |
| N-30 | The real-Metal-GPU cross-backend parity readback (structural-proxy ΔE 0.0 is NOT proof) | ✓ | **BUILD** | `BD.W-VIZ-PARITY-METAL` (union D24/D34-B1) — re-scored under §A: parity stays (two GPU backends), the `fallback`→`backend` rename applies to its column header; the real-device leg via `W-GOO-SPLIT-PERF` |

---

## §E — The cross-repo ASK the expansion mints (foreign-tree fence)

The GPU-only purge retires the mechanism a sibling depends on — a by-name coordination ask, never a foreign-tree edit.

| # | Item | Disposition | Destination / rationale |
|---|---|---|---|
| N-31 | The speedtest headless-AA certification the `auroraFallbackGround` swraster ground served (it let speedtest's headless CI certify text-on-aurora AA contrast without a GPU) | **BOOK (cross-repo ask)** | the swraster ground retires at `BD.W-GPU-ONLY-SPINE` — the cert moves to a real-GPU capture (the W-REFLECT-style Metal capture) OR a palette-derived floor (re-derived off the aurora palette stops, no rendered ground — recommended). Booked to the BD cross-repo asks relay (`BD.W-CROSSREPO-ADOPT-SWEEP` band); speedtest's edit, not ours (inv-26) |

---

## §F — The kf / value.js BOOKED republish-gated consumes (carried, re-confirmed under the expansion)

The union's republish-gated books (D27/D35-C1/C2/C3) are re-confirmed by the expansion's dock + viz scope — the snap/oscillator/color-subpath consumes the new dock-link + viz-interact waves would use are STILL not on the published dist. Carried unchanged (no new disposition; the interims work on the published surface).

| # | Item | chronic | Disposition | Trigger |
|---|---|---|---|---|
| N-32 | kf `snap`-option (`useDragMorph`/`useDockLink` interim wires `reset`+`decayRest`+`spring.target`) | ✓ | **DEFER (BOOKED)** | re-enters on kf's next cut; DEDUP into `BD.W-KF-DRAGSNAP-CONSUME`. The honest interim is documented (`dock/interactivity-prove.md`) — the published `DragOptions` lacks `snap`; the foreign-tree fence holds |
| N-33 | kf LIGHT `Oscillator`/`waveformValue` loop-clock (the viz/curve-picker `loop` playback seam) | ✓ | **DEFER (BOOKED)** | `BD.W-KF-OSCILLATOR-CONSUME` — kf republishes past 4.3.0; interim KEEP-until-republish; NO peer-spine widen |
| N-34 | value.js `/color` subpath footprint-shrink (7 import sites; the `useBorderSpectrum`/viz-color CONSUME markers) | ✓ | **DEFER (BOOKED)** | `BD.W-VALUEJS-COLOR-SUBPATH` — value.js publishes `/color` in 0.14.x+; peer forward-compatible; NO build against a non-existent subpath |

---

## §G — Net disposition tally + the no-silent-drop assertion

| Disposition | Count | Items |
|---|---|---|
| **INVERT (precept-reversal)** | **7** | F-1…F-7 (the fallback-architecture reversals: FALLBACK-RETIRE-WATCH retire · clause-B replace · DO-NOT-MIGRATE correct · CANVAS-UNIFY retire · SWRASTER retire · THIRD-backend re-author · the chain DELETE) |
| **BUILD** | **20** | N-1…N-17 (spine/lens/field/emotion/lava/dot/metal/concentric/papergrid/configurator/keyboard/interact/dock-wire/sequence/glass-iOS27/maps-expand) + N-26 (fourier-phasors) + N-27 (placeholder) + N-28 (π re-scope) + N-29/N-30 (Safari/Metal π) |
| **BUILD (rider/named-successor)** | **2** | N-8 (aurora budget lift), N-23 (metal chromatic-aberration) |
| **DEFER-with-trigger** | **6** | N-18 (blob swarm), N-19 (FBO multi-pass), N-20 (compute neighbor GATED), N-21 (shader transpiler), N-22 (novel-viz tail), N-24 (per-piece album shade) |
| **DEFER (BOOK only / republish-gated)** | **4** | N-25 (album-aurora speculative), N-32 (kf snap), N-33 (kf oscillator), N-34 (value.js /color) |
| **BOOK (cross-repo ask)** | **1** | N-31 (speedtest headless-AA cert) |

- **Headline:** ~**20 BUILD** + **2 rider** · **7 INVERT** (the binding precept-reversals) · **6 DEFER-with-trigger** · **4 DEFER-BOOKED** · **1 cross-repo ASK**.
- **The convergence's load-bearing MISS, now closed:** the union 61-wave roster carried ZERO wave for the GPU-only / Canvas2D-purge mandate while canonizing FOUR fallback-architecture waves verbatim (`audit/changes-this-session.md §5`). The expansion's `BD.W-GPU-ONLY-SPINE` (V0, FIRST) + the §A inversions close it.
- **The ONE cross-tranche inversion-cluster** (§A, F-1…F-7) is recorded as a DECISION-FLIP-with-rationale carrying BOTH the prior census/precept disposition AND the mandate's re-decision — never a silent re-open (the §5 union-charter discipline).
- **Zero silent drops.** Every NEW deferral (N-1…N-34) carries a terminal disposition + (where held) a concrete re-entry trigger; every BUILD names a real V0-V4 viz-band wave or union wave (cross-checkable against `viz/VIZ-BAND-PLAN.md` + `union/{EXECUTION-DAG,UNIFIED-ROSTER}.md`); every precept-inversion names the OVERTURNED prior disposition. This ledger folds into the union `W-FOLD-LEDGER`; the no-silent-drop gate reds on a lost disposition or a phantom destination wave.
