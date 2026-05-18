# Qσ (sigma) — keyframes.js animation-scenes deep audit

Round-4 Q audit-augmentation lane. Slice: the **animation demo scenes** of keyframes.js — `demo/{amiga,cube,simple,square,balls,bench,boxes}/` plus `demo/app/scenes/{Amiga,Cube,Simple,Square}Scene.vue`. The easing scene + playground are Qρ's slice; the shared chrome / TopDock / dropdowns are Qτ's slice. This audit drives each scene to a live runtime, attributes every defect to substrate-or-consumer origin, and designs the idiomatic glass-ui upgrade.

**Date**: 2026-05-18. **Consumer**: `/Users/mkbabb/Programming/keyframes.js`, glass-ui resolved via `file:../glass-ui` (always HEAD). **Tooling**: Playwright MCP — `browser_navigate` + `browser_evaluate` + `browser_take_screenshot` + `browser_console_messages`, 3 viewports (390 / 820 / 1280), 30+ DOM-state probes. 12 screenshots at `screenshots/q-sigma-*.png`.

Cross-referenced: `Qeta-keyframes-cosmetic-regressions.md` (round-2) and `Qomicron-keyframes-timeline-reaudit.md` (round-3). This audit extends them; it does not re-litigate the IconTooltip-collapses-Slider finding (Qο Defect 1) or the hero-font cascade race (Qη §1.A) — those are referenced where they touch a scene and inherited as-is.

---

## §0 — Summary verdict

The scene slice carries **two genuinely broken surfaces and a pile of dead code**:

1. **P0 — cold deep-link to any async scene crashes the scene `<Transition>`** (`demo/app/App.vue:106-115`). On a first-navigation deep-link to `/#/square`, `/#/amiga`, or `/#/easing`, the `defineAsyncComponent` chunk resolves *after* the initial render, triggering a `<Transition mode="out-in">` swap from a null/placeholder vnode to the resolved component. Vue's `getNextHostNode` walks a torn-down subtree and throws three consecutive `TypeError`s (`Cannot read properties of null (reading 'nextSibling' / 'subTree' / 'parentNode')`). The new scene's target DOM never mounts — the stage is left empty. CubeScene escapes this because App.vue statically imports it (`import CubeScene from "./scenes/CubeScene.vue"`); SquareScene/AmigaScene/EasingScene are all async and all vulnerable. AmigaScene partially mitigates via an explicit `loadingComponent` + `delay:100`, which gives the transition a stable non-null vnode to leave from — but it is not reliable. **Consumer-attributable; glass-ui is not in the stack.**

2. **P1 — boxes / balls / bench standalone demos are orphaned and unrunnable**. `demo/boxes/`, `demo/balls/`, `demo/bench/` are pre-unified-app standalone HTML entries. They are not referenced in `vite.config.ts`, have no npm script, and are not reachable from the unified app. Worse, `demo/boxes/script.ts` and `demo/bench/runner.ts` import via the `@src/animation/utils` alias, which is only registered in the root vite config's `resolve.alias`. Served standalone (the only way to reach them), the alias is unresolved and Vite returns a **500 Internal Server Error** — confirmed live (`q-sigma-boxes-1280.png` shows the full vite error overlay). These are dead code: ship a path or delete them.

3. **P2 — `SimpleScene.vue` is orphaned**. `demo/app/scenes/SimpleScene.vue` exists but is not registered in `demo/app/scenes.ts` and is imported nowhere. The unified-app scene roster is Cube / Amiga / Square / Easing; Simple was dropped from the roster but the file was left behind. `demo/simple/` (its standalone `App.vue` + `index.html`) is likewise orphaned the same way as boxes/balls/bench.

4. The IconTooltip-collapsed scrub-Slider (Qο Defect 1) reproduces inside every scene's PlaybackRibbon — `glass-slider[data-variant="timeline"]` measures 16×40 on cube, square, and amiga. This is a **glass-ui substrate** defect already attributed and waved by Qο (W3 revert). Not re-counted here; cross-referenced in §3.

5. The Fira Code self-host font 403 (`/@fs/.../glass-ui/src/fonts/fira-code/fira-code-latin.woff2` → Forbidden) fires on every scene. This is Qη's Q-misc-3 (keyframes.js `vite.config.ts` needs `server.fs.allow`). It also makes the dev server's parent shell fragile — three dev-server deaths during this probe, matching Qη §0.1. Not a scene defect; noted because it pollutes every console capture.

**Working as intended**: CubeScene (3D CSS cube, OrbitalDrag, rainbow facets, axis lines, idle-bob), AmigaScene (Three.js room + tesselated checkerboard sphere), SquareScene (CSS box transform animation) all render and *animate correctly* once reached without hitting the transition crash. The animation engine itself — `CSSKeyframesAnimation`, `AnimationGroup`, `interpFrames` — is sound across all three.

Functional defects: **4**. Visual defects: **5**. Verdicts: 2 CONSUMER-FIX, 1 DELETE-OR-WIRE, 1 substrate cross-reference (Qο), 1 misc cross-reference (Qη).

---

## §1 — Surface inventory

The scene slice spans three generations of demo code layered in the repo:

| Generation | Files | Status | Reachable |
|------------|-------|--------|-----------|
| **Unified app scenes** (current, `e761a01`+) | `demo/app/scenes/{Cube,Amiga,Square,Easing}Scene.vue` registered in `demo/app/scenes.ts` | Live | `npm run dev` → `/#/{cube,amiga,square,easing}` |
| **Orphaned app scene** | `demo/app/scenes/SimpleScene.vue` | Dead — not in `scenes.ts`, imported nowhere | Not reachable |
| **Standalone pre-app demos** | `demo/{amiga,cube,simple,square}/App.vue` + `index.html` + `use*Animations.ts` | Partially dead — each has an `index.html` mounting its own `App.vue`, but `vite.config.ts` dev root is `demo/app/` so none are served | Not reachable via any script |
| **Standalone scriptless demos** | `demo/boxes/`, `demo/balls/`, `demo/bench/` | Dead — no Vue, raw `<script type="module">`, `@src` alias breaks standalone | 500 / unrunnable |

### 1.1 — Unified-app scene composition (the live surfaces)

All four live scenes mount inside `<EditorShell>` via App.vue's `#target` slot, wrapped in `<Transition name="scene" mode="out-in"><KeepAlive :max="3">`. Each scene `defineExpose`s `{ animationGroup, superKey, ... }` so the shell's `<AnimationControlsGroup>` can drive it.

| Scene | File | Substrate | Animation source | Target |
|-------|------|-----------|------------------|--------|
| **Cube** | `CubeScene.vue` (228 LOC) | `<CubeTarget>` (3D CSS cube, `<OrbitalDrag>`, axis lines), `MatrixEditor`, glass-ui `HoverCard`/`Tabs`/`Button` | `useCubeAnimations` — `Rotations` + `Matrix` named animations | DOM cube `.cube-side` faces |
| **Amiga** | `AmigaScene.vue` (149 LOC) | bare `<canvas>` + Three.js `WebGLRenderer`, `OrbitControls`, `HemisphereLight`/`SpotLight` | `useAmigaAnimations` — `Rotations` (drives a `tesselateSphere` mesh) | Three.js sphere mesh |
| **Square** | `SquareScene.vue` (54 LOC) | bare `<div class="square-box">` + scoped CSS | `useSquareAnimations` — `Transform` (nested-object transform path) | DOM `.square-box` |
| **Easing** | `EasingScene.vue` | (Qρ slice — not audited here) | — | — |

CubeScene is statically imported in App.vue; the other three are `defineAsyncComponent`. This asymmetry is the root of the §2 D1 crash.

### 1.2 — Standalone demos (orphaned)

- `demo/amiga/App.vue` — full Three.js room scene + `<AnimationControlsGroup>`. Self-contained, imports `@styles/style.css`. Body-level SVG grid background inlined as a global `<style>`.
- `demo/cube/App.vue` — full `<EditorShell>` composition with header slots (ppmycota HoverCard, @mbabb DropdownMenu, SharePopover, DarkModeToggle). This is the *pre-unified-app* cube — superseded by `demo/app/scenes/CubeScene.vue` + `demo/app/App.vue`. Substantial duplication.
- `demo/simple/App.vue`, `demo/square/App.vue` — minimal: `<AnimationControls>` + a `.demo-box`. Import `@styles/style.css` + `@styles/utils.css`.
- `demo/boxes/`, `demo/balls/`, `demo/bench/` — no Vue. Raw `index.html` + `script.ts` / `runner.ts`. boxes = `interpFrames` scrub demo with a Pause button + range input. balls = 6 bouncing circles, keyframes.js vs CSS side-by-side. bench = FPS benchmark harness (keyframes.js rAF vs CSS @keyframes vs WAAPI).

---

## §2 — Functional defects

| # | Severity | Scene(s) | Defect | Root cause | Attribution | Verdict |
|---|----------|----------|--------|------------|-------------|---------|
| **D1** | **P0** | Square, Amiga, Easing | Cold deep-link to an async scene crashes the scene `<Transition>`. Three `TypeError`s — `Cannot read properties of null (reading 'nextSibling')` / `'subTree'` / `'parentNode'` — fire from `getNextHostNode` / `componentUpdateFn` during the `<Transition mode="out-in">` leave/enter. The new scene's target DOM never mounts; stage is left blank. | `App.vue:106-115` wraps `<KeepAlive>` of a `defineAsyncComponent` inside `<Transition mode="out-in">`. The async chunk resolves after first paint → Vue performs an out-in swap from a not-yet-resolved vnode whose `subTree` is null. CubeScene is statically imported so it never hits this path. AmigaScene's `loadingComponent`+`delay:100` gives the transition a stable vnode to leave, partially masking it. | **CONSUMER** (keyframes.js). glass-ui not in the stack. | **CONSUMER-FIX**. See §5 D1. |
| **D2** | **P1** | boxes, balls, bench | Standalone demos unrunnable. `npm run dev` root is `demo/app/`; these dirs are outside it. No npm script targets them. Served standalone (`npx vite demo/boxes`), `script.ts` imports `@src/animation/utils` — the `@src` alias lives only in the root vite config's `resolve.alias`, unresolved standalone → **HTTP 500** (`q-sigma-boxes-1280.png`). | Pre-unified-app dead code never swept. The `e761a01` unified-app commit added the app but did not retire or re-wire the standalone demos. | **CONSUMER** (keyframes.js). | **DELETE-OR-WIRE**. See §5 D2. |
| **D3** | **P2** | Simple | `SimpleScene.vue` orphaned — not in `scenes.ts` roster, imported nowhere. `demo/simple/` standalone likewise dead. | Simple was dropped from the unified-app scene roster (`scenes.ts` ships Cube/Amiga/Square/Easing) but the `.vue` file + standalone dir were not deleted. | **CONSUMER** (keyframes.js). | **DELETE**. See §5 D3. |
| **D4** | **P3** | all live scenes | Fira Code self-host font → HTTP 403 (`/@fs/.../glass-ui/src/fonts/fira-code/fira-code-latin.woff2` outside Vite `fs.allow`). Mono text falls back to the system mono stack. Also destabilises the dev server (3 deaths during this probe). | keyframes.js `vite.config.ts` lacks `server.fs.allow` for the sibling `../glass-ui/src/fonts/` path. | **CONSUMER** (keyframes.js). Already filed by Qη as Q-misc-3. | **CONSUMER-FIX** — cross-reference Qη; not re-counted. |

**Functional verification of the working path** — once a scene is reached without tripping D1:

- Cube: `Rotations` plays. `.cube` `transform` matrix sampled twice over 700 ms — values change (`matrix3d` rotation advancing). OrbitControls drag works; axis lines + idle-bob render.
- Amiga: Three.js context present (`getContext('webgl2')` truthy), 1 canvas at full 803×792, sphere mesh + room render. Play advances the animation.
- Square: `.square-box` 192×192, `bg rgb(127,255,212)`. Play → `transform` goes `none` → `matrix(-0.79, 0.91, -0.91, ...)` within 900 ms — the nested-object transform path (`transform.a.b.c.d` scale) animates correctly. `animationGroup.singleTarget = false` (SquareScene.vue:21) is load-bearing — documented inline.

---

## §3 — Visual defects

3 viewports per scene: 390 (mobile), 820 (tablet), 1280 (desktop).

| # | Severity | Scene · viewport | Defect | Screenshot | Attribution | Verdict |
|---|----------|------------------|--------|------------|-------------|---------|
| **V1** | **P1** | Square · 390, 820 | Controls panel overlays and clips the animation stage. At 390 the `.square-box` is almost fully hidden behind the opaque controls panel — only a sliver of the box edge peeks at the left margin. At 820 the box (mid-animation, rotated) intersects the centered controls panel. The scene has no stage-vs-panel layout reservation at narrow widths. | `q-sigma-square-390.png`, `q-sigma-square-820.png` | **CONSUMER**. The `EditorShell` `controls-layout` grid places the controls pane over the target on small viewports; the square scene's stage is `flex items-center justify-center` with no offset for the panel. | **CONSUMER-FIX**. See §5 V1. |
| **V2** | **P2** | all live scenes | No glass / aurora ground. Every scene renders on a transparent body (browser checkerboard in screenshots; the inlined critical CSS gives a near-white `rgb(251,250,249)` in a real browser). No paper-backdrop, no aurora, no glass wash behind the stage. The scenes float UI chrome on a flat ground. | every screenshot | **CONSUMER**. keyframes.js never wired `<Aurora>` / `<PaperBackdrop>` globally. Qο Defect 4 noted the same. | **CONSUMER-FIX** (enhancement). See §5 V2. |
| **V3** | **P2** | Square · 390 | PlaybackRibbon scrub-Slider collapsed to a 16×16 green dot. `glass-slider[data-variant="timeline"]` measures 16×40 inside its `.timeline-green` wrapper; the wrapper is also 16px wide. The scrub track that should fill the ribbon row is a thumb-only nub. | `q-sigma-square-390.png`, `q-sigma-amiga-390.png`, `q-sigma-cube-controls-1280.png` | **SUBSTRATE (glass-ui)** — IconTooltip's `<span class="icon-tooltip-trigger">` wrapping span (`25e1b5a`, tranche-o/w6) does not propagate width to a `width:100%` child. Identical to **Qο Defect 1**. | Cross-reference Qο — already waved **W3 substrate revert**. Not re-counted as a Qσ defect; logged for completeness. |
| **V4** | **P3** | Cube · all | Cube-face digit glyphs (`1`–`6`) render as italic Instrument Serif and, on faces caught by the 3D perspective transform, look like distorted squiggles (`5` on the magenta top face reads as a tilde). | `q-sigma-cube-1280.png`, `q-sigma-cube-820.png` | **NOT A DEFECT** — the faces apply `instrument-serif ... font-bold` italic intentionally (`CubeTarget.vue:69-73`); the squiggle is the 3D `rotateX(90deg)` foreshortening of a glyph, not a render bug. Documented to forestall a future re-probe misread. | NO-OP. |
| **V5** | **P3** | Amiga · 390 | Controls panel dims and covers the Three.js canvas (canvas visible behind at reduced contrast). Same class as V1 but the canvas *is* full-bleed behind the panel, so it reads as intentional dim-behind-modal rather than clipping. | `q-sigma-amiga-390.png` | **CONSUMER**. Acceptable at mobile (canvas is a background); flagged only as the milder sibling of V1. | NO-OP / accept. |

---

## §4 — Feature inventory (last-known-good)

Demo-rebuild lineage from `git log -- demo/app/scenes/`: the unified app landed at `e761a01` (`feat(demo): add unified multi-scene demo app`); all four scenes were added in that commit. Later commits (`5073893`, `e920efe`, `cceb6e7` token adoption; `30efba3` glass-ui import rewrite; `ab071a2` easing wire; `2183f32` HeaderRibbon + Fira Code CDN drop) refined chrome but did not add scenes. There is no "broken rebuild" commit — the scenes have been stable since `e761a01`; the D1 crash is a structural flaw present since the unified app shipped, not a regression.

What each scene is supposed to do:

| Scene | Intended behaviour |
|-------|--------------------|
| **Cube** | 3D CSS-transform cube with 6 rainbow faces (red/green/blue/yellow/magenta/cyan), draggable via `<OrbitalDrag>`, dashed XYZ axis lines, idle-bob hover animation when not playing. Two animations: `Rotations` (rotates the cube) and `Matrix` (matrix3d editor wired to `<MatrixEditor>`). `pp-mode` toggle swaps faces for the ppmycota logo. |
| **Amiga** | Three.js scene — a `BoxGeometry` room (BackSide material) lit by a hemisphere + spot light, containing a tesselated checkerboard sphere (`tesselateSphere`). The `Rotations` animation drives the sphere; OrbitControls let the user orbit the camera. Renders at `devicePixelRatio * 2` for crispness. |
| **Square** | A 12rem aquamarine `.square-box` reading "heyyyy". The `Transform` animation walks a 4-keyframe CSS sequence: translate (-100%,-100%)→(50%,75%), nested-object scale 75%→200%, `rotate` 0turn→1turn, background `#C462D8`→`#6280D8`→`#52E898`→`#E85252`, fontSize 1rem→3rem. Demonstrates the nested-object transform path (`transform.a.b.c.d`). |
| **Simple** (orphaned) | Minimal sibling of Square — a `.simple-box` driven by a CSS-string keyframes definition (`fromString`) rather than the object form. Demonstrates `CSSKeyframesAnimation.fromString`. |
| **boxes** (orphaned) | Single box, `interpFrames`-scrubbed via a range input + a Pause button; demonstrates manual timeline scrubbing and the `float` keyframes (box-shadow + translate + scale). |
| **balls** (orphaned) | 6 circles bouncing via keyframes.js, next to 3 bouncing via native CSS `@keyframes` — a side-by-side parity demo. |
| **bench** (orphaned) | FPS benchmark harness: keyframes.js (rAF) vs CSS @keyframes vs WAAPI (vs optional GSAP). Reports avg/P1/P5 FPS, dropped frames, frame-budget %, setup time, TTFF. |

No feature has been *lost* from the live scenes — Cube/Amiga/Square do everything they were built to do. The "loss" the user perceives is (a) the D1 crash blanking a scene on deep-link, and (b) four demos (Simple/boxes/balls/bench) that demonstrate distinct engine capabilities — string-parsing, interp-scrubbing, CSS parity, benchmarking — being unreachable. Those four capabilities have no live demo surface anymore.

---

## §5 — Idiomatic glass-ui upgrade design

### D1 — async-scene transition crash (P0, CONSUMER-FIX)

The crash is structural: `<Transition mode="out-in">` over `<KeepAlive>` over `defineAsyncComponent` is a known-fragile Vue combination. Three idiomatic fixes, in order of preference:

1. **Statically import all four scenes** (mirror CubeScene). The scenes are small — SquareScene 54 LOC, AmigaScene 149 LOC. Only AmigaScene pulls a heavy dep (Three.js). Keep Amiga async but give the others static imports; or keep all async but fix the transition (option 2).
2. **Resolve the async component before the transition runs.** Replace the bare `defineAsyncComponent(() => import(...))` in `scenes.ts` with the object form carrying both `loadingComponent` *and* `suspensible: false`, and wrap the `#target` slot's `<component :is>` in `<Suspense>` so the async resolution completes before `<Transition>` sees a vnode. `<Suspense>` + `<Transition mode="out-in">` is the canonical Vue pairing for exactly this case — the transition only fires on the resolved tree.
3. **Drop `mode="out-in"`** and use a default (simultaneous) transition, or drop the scene `<Transition>` entirely. The scene-swap cross-fade is cosmetic; the crash is not worth it.

Recommended: **option 2** — wrap in `<Suspense>`, keep async for code-splitting (Amiga's Three.js chunk genuinely benefits). This is a ~10-line consumer change in `App.vue` + `scenes.ts`. No glass-ui primitive is involved; glass-ui exposes nothing that helps here. **Substrate-fix: none. Consumer-fix: App.vue + scenes.ts.**

### D2 — orphaned boxes/balls/bench (P1, DELETE-OR-WIRE)

Two coherent paths, pick one — do not leave them half-dead:

- **WIRE**: fold the three engine-capability demos into the unified app as routes. boxes → an `InterpScene` (manual scrub), balls → a `ParityScene` (keyframes.js vs CSS), bench → a `BenchScene`. Re-express each in Vue, register in `scenes.ts`, fix imports to the `@src` alias (which then resolves because they run under the app root). The bench harness in particular is a strong showcase. If wired, the scene roster becomes Cube/Amiga/Square + Interp/Parity/Bench — 6 scenes, every engine capability live.
- **DELETE**: if the unified app is the canonical demo and these capabilities are covered elsewhere (the playground covers multi-element; the easing scene covers timing-functions), delete `demo/{boxes,balls,bench,simple}/` and the standalone `demo/{amiga,cube,square}/` outright. The standalone `demo/cube/App.vue` is a near-complete duplicate of `CubeScene.vue` + App.vue chrome — pure maintenance debt.

Recommended: **WIRE bench** (unique, high-value, no other surface), **DELETE the rest** (boxes/balls capabilities are adequately implied by the live scenes + playground; the standalone `demo/{amiga,cube,simple,square}/` are all superseded). No glass-ui primitive needed — these are plain consumer-app routes; if wired they would mount inside `<EditorShell>` like the existing scenes.

### D3 — orphaned SimpleScene (P2, DELETE)

`demo/app/scenes/SimpleScene.vue` and `demo/simple/` are dead. Square already demonstrates the transform path; Simple's only distinct value is `fromString` (CSS-string keyframes). If that path needs a live demo, fold one keyframe-source toggle into SquareScene (object form ↔ string form) rather than carrying a whole orphan scene. Otherwise **delete** `demo/app/scenes/SimpleScene.vue` + `demo/simple/`. Clean break, no shim — consistent with the no-backwards-compat invariant.

### V1 — Square controls panel clips the stage (P1, CONSUMER-FIX)

The square scene's stage is a bare `flex items-center justify-center` div with no awareness of the controls panel. At ≥1024 the panel is a left rail and the stage has room; below that the panel overlays the stage. Idiomatic fix is consumer-side layout, not a glass-ui primitive:

- The `EditorShell` `controls-layout` grid should reserve a stage region that the panel does not occlude — or the scene stage should apply a responsive offset (`lg:pl-0` vs a panel-width pad below `lg`).
- glass-ui offers nothing scene-specific here. The panel itself is fine — it is the consumer's `controls-layout` grid that needs a stage track. If the project wants the panel to *float* over a full-bleed stage (acceptable for Amiga's canvas), the square box just needs enough translate headroom; if it wants the panel to *push* the stage, add a grid column. This is a `EditorShell.vue` (consumer) change.

### V2 — no glass / aurora ground (P2, CONSUMER-FIX, enhancement)

Every keyframes.js scene floats on a flat near-white body. The idiomatic glass-ui treatment — and what would make the demo read as a glass-ui showcase — is a global substrate:

- Mount `<Aurora>` (from `@mkbabb/glass-ui/aurora`) or `<PaperBackdrop>` (`@mkbabb/glass-ui/paper-backdrop`) once in `App.vue` behind the `<EditorShell>`. Aurora gives the WebGL aurora-tinted ground the speedtest demo carries; PaperBackdrop is the cheaper paper-grain option.
- The controls panel already uses glass tiers (`.glass-*` ladder visible in the DOM probe — `rounded-card ... scrollbar-hidden glass-*`). A backdrop behind it would let the glass blur actually *read*. Right now the glass surfaces sit on a flat ground so the blur has nothing to refract.
- This is a pure consumer addition — one component mount in `App.vue`. No substrate change.

### Substrate vs consumer split — summary

| Defect | Substrate (glass-ui) | Consumer (keyframes.js) |
|--------|----------------------|-------------------------|
| D1 transition crash | — | `App.vue` + `scenes.ts` — `<Suspense>` wrap |
| D2 orphaned boxes/balls/bench | — | wire bench / delete rest |
| D3 orphaned Simple | — | delete |
| D4 font 403 | — | `vite.config.ts` `server.fs.allow` (Qη Q-misc-3) |
| V1 panel clips stage | — | `EditorShell.vue` `controls-layout` grid |
| V2 no glass ground | — | `App.vue` mount `<Aurora>`/`<PaperBackdrop>` |
| V3 scrub-Slider collapsed | **IconTooltip wrapping span** (`25e1b5a`) | — |

The animation-scenes slice is **almost entirely a consumer-side story**. The only glass-ui substrate defect touching a scene is V3, and that is Qο's already-waved IconTooltip revert. Nothing in the scene slice requires a new glass-ui primitive or a new substrate change beyond Qο's W3 revert.

---

## §6 — Wave fold-in

| Defect | Owner | Wave | Action |
|--------|-------|------|--------|
| **D1** — async-scene transition crash | keyframes.js consumer | **consumer-side, post-Q** | Wrap the `#target` `<component :is>` in `<Suspense>`; keep `defineAsyncComponent` for code-split. ~10 LOC in `App.vue` + `scenes.ts`. Track as a keyframes.js issue. Highest priority — it blanks scenes on deep-link. |
| **D2** — orphaned boxes/balls/bench | keyframes.js consumer | **consumer-side, post-Q** | Wire `bench` into the unified app as a route; delete `demo/{boxes,balls,balls,simple}/` and standalone `demo/{amiga,cube,square}/`. Clean break. |
| **D3** — orphaned SimpleScene | keyframes.js consumer | **consumer-side, post-Q** | Delete `demo/app/scenes/SimpleScene.vue` + `demo/simple/`. |
| **D4** — font 403 / dev-server fragility | keyframes.js consumer | **consumer-side, post-Q** | `vite.config.ts` `server.fs.allow: ['..']`. Already filed by Qη as Q-misc-3 — do not double-file; cross-reference. |
| **V1** — Square panel clips stage | keyframes.js consumer | **consumer-side, post-Q** | `EditorShell.vue` `controls-layout` grid reserves a stage track below `lg`. |
| **V2** — no glass ground | keyframes.js consumer | **consumer-side, post-Q** | Mount `<Aurora>` / `<PaperBackdrop>` in `App.vue`. Enhancement, not a regression. |
| **V3** — scrub-Slider collapsed | glass-ui substrate | **W3** (per Qο) | NO new action — fold under Qο Defect 1's W3 IconTooltip revert. |
| **V4** — cube-face glyph squiggle | n/a | — | NO-OP. Not a defect (3D foreshortening). |
| **V5** — Amiga panel dims canvas | keyframes.js consumer | — | NO-OP / accept. |

**Counts**: 6 consumer-side fold-ins (D1, D2, D3, D4, V1, V2), 1 substrate cross-reference to Qο W3 (V3), 2 NO-OPs (V4, V5). D4 cross-references Qη — net new keyframes.js issues from this slice: **5** (D1, D2, D3, V1, V2). New glass-ui substrate work: **0** (V3 already waved by Qο).

---

## §7 — Severity summary

| Severity | Count | Defects |
|----------|-------|---------|
| **P0** | 1 | D1 — cold deep-link blanks any async scene (transition crash) |
| **P1** | 2 | D2 — boxes/balls/bench orphaned & unrunnable (500); V1 — Square controls panel clips stage |
| **P2** | 3 | D3 — orphaned SimpleScene; V2 — no glass/aurora ground; V3 — scrub-Slider collapsed (Qο cross-ref) |
| **P3** | 2 | D4 — font 403 (Qη cross-ref); V5 — Amiga panel dims canvas (accept) |
| not-a-defect | 1 | V4 — cube-face glyph squiggle (3D foreshortening) |

**Top 3 P0/P1**:

1. **D1 — async-scene transition crash (P0)**. `/#/square`, `/#/amiga`, `/#/easing` deep-links blank the stage with three `TypeError`s from the `<Transition mode="out-in">` over `<KeepAlive>` over `defineAsyncComponent`. CubeScene escapes only because it is statically imported. This is the dominant "feature loss" the user reports for the scenes. Fix: `<Suspense>` wrap. Consumer-side.
2. **D2 — boxes/balls/bench unrunnable (P1)**. Three engine-capability demos (interp-scrub, CSS parity, FPS benchmark) are dead code — outside the dev root, `@src`-alias 500, no npm script. The benchmark harness in particular has no live surface anywhere. Fix: wire bench, delete the rest. Consumer-side.
3. **V1 — Square controls panel clips stage (P1)**. At 390 and 820 the controls panel overlays the `.square-box`, hiding the animation it is meant to control. The `EditorShell` `controls-layout` grid reserves no stage track at narrow widths. Fix: responsive grid track. Consumer-side.

**Overall verdict**: the keyframes.js animation engine and all four live scenes (Cube/Amiga/Square/Easing) are functionally sound — animations run, controls drive them, 3D renders. The scene slice's problems are a structural Vue `<Transition>`+async-component crash and a layer of un-swept pre-unified-app dead code. **glass-ui carries no scene-specific substrate defect** beyond Qο's already-waved IconTooltip-collapses-Slider revert. The fix surface is almost entirely consumer-side: `App.vue`, `scenes.ts`, `EditorShell.vue`, `vite.config.ts`, plus a delete-or-wire decision on four orphan demos.

---

## Operational appendix

- Dev server: `npm run dev` (vite, root `demo/app/`). Picked port 5173 in the stable window; earlier probe noise from multiple `npm run dev` invocations spawning servers on 5174/5199 — all killed and re-grounded to a single 5173 instance before the final captures.
- Dev-server fragility: the server died 3× during the probe (matching Qη §0.1) — the Fira Code 403 plus Playwright-shell parent-signal sensitivity. Each death was followed by a clean restart; all 12 screenshots and DOM probes landed during live windows.
- The boxes/balls/bench standalone probe used `npx vite demo/<dir> --port <p>` (positional path; the `--root` flag is rejected by this vite version). boxes conclusively returned HTTP 500 with the `@src/animation/utils` resolve error captured in `q-sigma-boxes-1280.png` and `/tmp/kf-boxes.log`. balls/bench share the same standalone-import shape.
- Screenshots (12) at `docs/tranches/Q/research/screenshots/`: `q-sigma-cube-{1280,820,390}.png`, `q-sigma-cube-controls-1280.png`, `q-sigma-amiga-{1280,390}.png`, `q-sigma-amiga-playing-1280.png`, `q-sigma-square-{1280,820,390}.png`, `q-sigma-square-fresh-1280.png` (shows the cube rendered under a contaminated `/#/square` deep-link during the port-jump window — superseded by the clean `q-sigma-square-1280.png`), `q-sigma-boxes-1280.png` (vite 500 overlay).
