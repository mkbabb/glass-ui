# Qρ (rho) — keyframes.js easing scene + playground deep audit

Round-4 Q audit-augmentation. The user reports the keyframes.js demo UI is broken well beyond the timeline — verbatim "the bezier selector is far too small and clipped, amongst many another problems (the t-value scrubber doesn't even work), like ... and many other style losses". This audit takes the **easing scene** (`demo/easing/`) and the **playground** (`demo/playground/`), live-probes both with Playwright, and designs the idiomatic glass-ui upgrade with no loss of feature.

Probe environment: keyframes.js master @ `2183f32` (+ `8d824ee` HEAD), glass-ui master @ `d244dd5`. Dev server `npm run dev` (`--mode development`, resolves glass-ui via the `"development"` conditional-exports branch → `src/` directly). Playground probed via `npm run dev:playground`. Cross-referenced: `Qomicron-keyframes-timeline-reaudit.md`, `Qeta-keyframes-cosmetic-regressions.md`.

---

## Section 1 — Surface inventory

### 1.1 — Easing scene component tree

The easing scene is route `#/easing`. `demo/app/scenes.ts` registers it as a `defineAsyncComponent` lazy chunk. `EasingScene.vue` (`demo/app/scenes/`) is the host:

```
EditorShell  (demo/@/components/custom/editor-shell)
├── #target slot  → EasingScene.vue
│   └── EasingTarget.vue  (demo/easing/)
│       ├── Select / DockSelectTrigger / SelectContent  → view-mode picker (glass-ui)
│       ├── singular mode  → hand-rolled .track-line + .track-marker + .track-ball
│       │                    draggable ball (the "t-value scrubber" — pointerdown/move/up)
│       └── multi mode     → .track-row list, one .track-ball per comparison curve
├── #tabs-content slot  → EasingSidebar.vue  (demo/easing/)
│   ├── EasingCurveCanvas.vue  (demo/@/components/custom/) — the "bezier selector"
│   │     SVG curve + draggable cubic-bezier control-point handles
│   ├── Card + Input + CopyButton              — CSS-value bar
│   ├── EasingSelect.vue  (demo/@/components/custom/) — grouped preset Select
│   ├── Card + Input + Select                  — steps editor (steps mode only)
│   └── label + Slider + Input                 — duration control (glass-ui <Slider>)
└── #ribbon-content slot → Play / Reset buttons (glass-ui <Button variant=outline>)
```

State lives in `useEasingDemo.ts` (`useEasingDemo()` composable, `provide`/`inject` via `EASING_DEMO_KEY`). It owns `currentEasingName`, `bezierControlPoints`, `stepOptions`, `duration`, `isPlaying`, `progress`, a rAF ping-pong loop, and a dummy `AnimationGroup` for the EditorShell scene contract.

Per `EASING_GROUPS` (`demo/easing/easingGroups.ts`): 10 families — Standard, Sine, Quad, Cubic, Expo, Circ, Back, Bounce, Steps, Custom (`cubic-bezier`).

### 1.2 — Playground component tree

The playground is a separate Vite entry (`vite --mode playground`, `root: ./demo/playground/`). `demo/playground/App.vue`:

```
EditorShell  (show-start-screen=false)
├── #tabs-trigger slot  → TabsTrigger "Assets"
├── #tabs-content slot  → TabsContent value=assets → AssetLayerPanel
└── #target slot        → AssetViewport  (asset manager — drag/transform/grid-snap)
```

State: `usePlaygroundAnimations.ts` builds a 5-preset `AnimationGroup` (bounce, fade-in, pulse, rotate-scale, shake) plus `useAssetManager()` for the asset CRUD. `App.vue` wires asset DOM elements as animation targets when an asset's `animationName` is set.

---

## Section 2 — Functional defects

All live-probed with Playwright `browser_navigate` / `browser_evaluate` / `browser_click`.

| # | Control | Expected | Actual | Console error | Attribution |
|---|---------|----------|--------|---------------|-------------|
| F1 | **Easing scene mount** (the whole scene) | Navigating to `#/easing` mounts `EasingTarget` + `EasingSidebar` | Scene fails to mount on most loads. `.dock-inset`, `.track-ball`, `.easing-curve-canvas`, `.duration-slider` all absent from the DOM; viewport blank except the dock pill and bottom bar. Recovers only in a narrow timing window (1 of ~6 loads). | `TypeError: Cannot read properties of null (reading 'nextSibling')` / `'subTree'` / `'parentNode'` — all in the Vue renderer `getNextHostNode` during a `<Transition>` `afterLeave` hook + `KeepAlive` component update | CONSUMER — `demo/app/App.vue:106` |
| F2 | **Route stability** | `#/easing` stays on the easing route | The hash spontaneously rewrites to `#/cube?anim=Rotations` / `#/square?anim=Transform` seconds after navigation, with no user input. Reproduced ~5×. The easing scene cannot be held on screen. | (follows F1 — the crash leaves the router/KeepAlive in an inconsistent state) | CONSUMER — `demo/app/App.vue` + `useSceneUrl` |
| F3 | **t-value scrubber** (singular draggable ball) | Drag the ball → `demo.progress` updates → ball and bezier traveling-dot follow the pointer; animation pauses during drag and resumes after | UNTESTABLE in isolation — the scrubber is a descendant of `EasingTarget`, which does not mount (F1). When the scene did render (1 lucky load), the ball geometry measured correct (72px ball, `translateX` tracking progress, 654px track). The scrubber **code is sound** (`onBallPointerDown` → `progressFromPointerX` → `demo.progress.value = p`). The user's "scrubber doesn't work" is the **F1 mount failure** surfacing as a dead control, not a logic bug in the scrubber itself. | (inherits F1) | CONSUMER — root cause is F1; scrubber logic itself is OK |
| F4 | **Playground — add asset** | Some affordance to add/import an asset into the viewport | None. The playground boots to an empty canvas: bottom dock (animation Select + reset + clear + play) and a Share/dark-mode pair top-right. `AssetViewport` and `AssetLayerPanel` query null. No "Assets" tab is found (`[role=tab]` returns 0). No empty-state, no add-asset button, no instructions. The playground is non-functional as shipped — there is nothing to interact with. | none (clean console once the server is stable) | CONSUMER — `demo/playground/App.vue` + asset-manager |
| F5 | **Playground — controls panel** | The 5 preset animations' controls reachable | All `[role=tabpanel]` nodes measure 0×0 (collapsed). The controls panel never opens — `EditorShell` is mounted with `show-start-screen=false` but no path opens the controls. The preset-animation controls (`alternate`/`forwards`/`ease-in-out` buttons found in the DOM at 0×0) exist but are unreachable. | none | CONSUMER — `demo/playground/App.vue` |
| F6 | **Playground identity** | Playground renders `demo/playground/App.vue` | One probe showed the playground tab had drifted to the main app (`Page Title: keyframes.js`, a `Scene`/`@mbabb` dock — App-shell chrome the playground App.vue does not contain). The Playwright session jumped between cached dev-server instances; the playground entry itself is correct, but the dev-server multi-instance fragility (Qη §0.1) makes it unprobeable without process discipline. | `ERR_CONNECTION_REFUSED` ×65 (server died mid-load) | INFRA — dev-server fragility, not playground code |
| F7 | **Duration-slider geometry tokens** | `.duration-slider` wrapper sets `--slider-track-height:4px` + `--slider-thumb-size:0.75rem` → slider renders at that geometry | Slider renders at **6px track / 16px thumb** — the `md` default, not the consumer's 4px/12px. The consumer's geometry tokens are dead. | none | SUBSTRATE + CONSUMER — see §5.4 |

**Functional-defect total: 7.** F1 is the P0 — it subsumes F2, F3 and makes the entire easing scene (scrubber, bezier, presets, duration) unusable. F4+F5 make the playground a non-functional shell.

### 2.1 — The t-value scrubber root cause (P0 deep-dive)

The dispatch named the scrubber as the P0 and asked whether it shares the `Qomicron` IconTooltip root cause. **It does not.** Qο's defect was a substrate `IconTooltip` wrapping-span that collapsed a `width:100%` Slider. The easing scrubber is a **hand-rolled draggable `<div class="track-ball">`** — it consumes no glass-ui Slider, no IconTooltip. Its logic (`EasingTarget.vue:280-313`) is correct: `pointerdown` captures the pointer, `pointermove` computes progress from `clientX` and writes `demo.progress.value`, `pointerup` releases.

The scrubber "doesn't work" because **`EasingTarget.vue` never mounts** — the scene-transition crash (F1) leaves the `#target` slot empty. The user drags on a blank canvas. The fix is not in the scrubber; it is in the App-shell scene-transition machinery (§5.1). Once the scene mounts, the scrubber works (verified geometrically in the one successful load).

### 2.2 — F1 mechanism (the scene-transition crash)

`demo/app/App.vue:106-115`:

```vue
<Transition name="scene" mode="out-in" :css="ready">
    <KeepAlive :max="3">
        <component :is="activeSceneComponent" :key="activeSceneKey" ref="sceneRef" v-bind="activeSceneProps" />
    </KeepAlive>
</Transition>
```

`activeSceneComponent` for `easing` is a `defineAsyncComponent` lazy chunk (`scenes.ts`). The crash is the well-known Vue interaction bug: `<Transition mode="out-in">` + `<KeepAlive>` + an async-component `:key` change. The leaving scene's `afterLeave` hook runs `getNextHostNode` against a vnode whose `component.subTree` has already been nulled (the async wrapper resolved/unmounted out of step with the transition's leave timing). `:css="ready"` — toggled true after `router.isReady()` — compounds it by flipping transition-CSS mode mid-flight on the very first navigation.

This is a CONSUMER bug in keyframes.js's App-shell, not a glass-ui substrate defect. It is also **not specific to easing** — it can hit any scene transition — but easing is the most reliably-broken because it is a lazy chunk reached cold.

---

## Section 3 — Visual defects

Screenshots at `docs/tranches/Q/research/screenshots/q-rho-*.png`. The easing scene rendered fully on exactly one capture (`q-rho-easing-1280-initial.png`) — that frame is the visual-audit evidence; all later loads crashed (§2).

| # | Surface | Defect | Screenshot | Attribution |
|---|---------|--------|------------|-------------|
| V1 | Easing scene (whole) | On the crash path the scene is **entirely blank** — only the floating dock pill and the bottom bar paint. No card, no curve, no controls. | `q-rho-easing-1280-clean.png`, `q-rho-easing-390-crashed.png` | CONSUMER (= F1) |
| V2 | Bezier selector (`EasingCurveCanvas`) | The SVG canvas is capped `max-height: 360px` and at 1280 measures **318×360** inside a ~344px sidebar — a near-square box. The user's "far too small and clipped" reads at narrow viewports: the canvas is locked into a fixed sidebar column, so on mobile the curve editor is a cramped ~320px square with `min-height: 140px`. The drag handles (`r=0.04` in a `viewBox` ~1 unit wide) have a hit radius that shrinks with the box. No glass treatment — bare `rounded-xl` div, no `glass-card`/`glass-wash` substrate. | `q-rho-easing-1280-initial.png` | CONSUMER — `EasingCurveCanvas.vue` |
| V3 | Bezier curve stroke colour | `.bezier-path` / `.traveling-dot` / handle SVGs stroke `var(--ppmycota-primary, var(--foreground))`. When pp-mode is off, `--ppmycota-primary` is undefined → falls back to `--foreground` (near-black). The curve reads as a flat black line with no glass-system accent — a colour loss vs a themed accent. | `q-rho-easing-1280-initial.png` | CONSUMER — hard-coded `--ppmycota-primary` fallback |
| V4 | Easing scene grid background | The scene renders against the browser transparent-checkerboard (no backdrop). Same as Qο defect 4 — pre-existing, not a regression, but it makes every easing/playground capture read as unfinished. | all q-rho captures | CONSUMER — pre-existing |
| V5 | Duration slider | Renders at the `md` default geometry (6px/16px), ignoring the consumer's intended 4px/12px compact sizing (F7). Visually the slider is chunkier than the design intent — a "style loss" from the `cf75db9` token refactor. | `q-rho-easing-1280-initial.png` | SUBSTRATE + CONSUMER (§5.4) |
| V6 | Playground viewport | Empty canvas — no empty-state card, no drop-zone, no instructional copy. Reads as a broken page. | `q-rho-playground-1280-clean.png` | CONSUMER — `demo/playground/App.vue` |
| V7 | Playground chrome | Only a bottom dock + a top-right Share/dark pair float over blank space. No header, no panel, no glass surfaces. No `glass-card`, no aurora, no paper backdrop. | `q-rho-playground-1280-clean.png` | CONSUMER |
| V8 | Square scene (route-drift collateral) | When the route drifts post-crash, the Square scene paints with a **stray green rectangle** overlapping the controls panel and floating pink blobs — a corrupt compositing state left by the half-applied transition. | `q-rho-easing-390-crashed.png` | CONSUMER (= F1 collateral; out of slice, logged for completeness) |

**Visual-defect total: 8** (V1-V8; V8 is route-drift collateral, the easing/playground-owned set is V1-V7 = 7).

---

## Section 4 — Feature inventory (last-known-good)

The easing scene was added whole at `f1d4fe6` ("feat(demo): add interactive easing function demo scene") and last touched at `cf75db9` ("adopt glass-ui slider tokens and DockSelectTrigger"). The playground predates the glass-ui migration. Every feature below MUST survive the §5 upgrade.

### 4.1 — Easing scene features

1. **Hero bezier curve canvas** — SVG plot of the active easing function over `[0,1]`, with background grid, diagonal reference line, axis labels (`0`, `1`, `t`, `f(t)`), and a clamped viewBox that accommodates overshoot curves (`ease-*-back`, bounce) up to ±0.6.
2. **Editable cubic-bezier handles** — when the curve is `cubic-bezier` or a named curve with a bezier approximation (`NAMED_EASING_BEZIER`), two draggable control-point handles with dashed handle-lines, rubber-band clamping past `[0,1]`, and pointer smoothing. Dragging a named curve's handle promotes it to `cubic-bezier`.
3. **Traveling progress dot** — a dot on the curve at `(progress, f(progress))`, driven by the rAF ping-pong loop.
4. **CSS-value bar** — an `<Input>` showing `cubic-bezier(...)` / `steps(...)` / the named curve, editable: typing a CSS easing string parses it back into state (`parseCSSValue`); a `CopyButton` copies it. Invalid input raises a `vue-sonner` toast.
5. **Grouped preset Select** (`EasingSelect`) — all 10 families, each curve item rendered with a mini SVG curve thumbnail + name + description, "detail" curves gold-shimmered.
6. **Steps editor** — for `steps`/`step-start`/`step-end`: a steps-count `<Input>` (1-60) and a jump-term `<Select>` (`jump-start/end/none/both`).
7. **Duration control** — a `<Slider>` (300-5000ms, step 100) plus an `<Input>` accepting parsed CSS time (`1.5s`, `500ms`).
8. **Singular t-value scrubber** — one large draggable ball on a track; dragging scrubs `progress`, pausing playback during the gesture and resuming after.
9. **Multi-track comparison mode** — a view-mode `<Select>` (Singular / per-family / All) renders a scrollable list of tracks, one ball per curve in the chosen family, the active curve highlighted.
10. **Play / Pause / Reset** — ribbon buttons driving the rAF loop; ping-pong (forward then reverse) playback.
11. **Auto-follow** — switching the active curve auto-tracks its family in multi mode.

### 4.2 — Playground features

1. **Asset manager** — add/select/transform assets, grid snap, multi-select (`useAssetManager`).
2. **Asset layer panel** — an "Assets" tab listing assets (`AssetLayerPanel`).
3. **Asset viewport** — a canvas where assets are positioned/transformed (`AssetViewport`), with grid-snap.
4. **Animation binding** — each asset can be bound to one of 5 preset animations (bounce, fade-in, pulse, rotate-scale, shake); the asset's DOM element becomes the animation target.
5. **Playback dock** — animation Select + reset + clear-all + play/pause.

---

## Section 5 — Idiomatic glass-ui upgrade design

The user demands "a PROPER and IDIOMATIC upgrade with no loss of feature or functionality" leveraging glass-ui. The disposition splits cleanly: the dominant defects (F1/F2) are an App-shell bug fixed consumer-side; the surface-level upgrades adopt glass-ui primitives that already exist on the `/api` surface.

### 5.1 — F1/F2 fix (scene-transition crash) — CONSUMER, P0

Not a glass-ui matter. The fix is in `demo/app/App.vue`:

- **Option A (minimal)** — drop `mode="out-in"` from the scene `<Transition>`, or move `<KeepAlive>` OUTSIDE `<Transition>` (`<KeepAlive><Transition>...`), so the leave hook never runs against an async wrapper whose subtree is being torn down. Vue's documented guidance is KeepAlive-inside-Transition for caching, but the async-component `:key`-swap case is the known-fragile combination — wrapping order or dropping `out-in` resolves it.
- **Option B (robust)** — eagerly `import()` the scene components (drop `defineAsyncComponent` for the 4 light scenes; keep it only for Monaco/Three-heavy ones), so the `:key` swap is synchronous and the transition's host-node walk always finds a resolved subtree.
- Also remove the `:css="ready"` first-render toggle — gate the whole `<Transition>` on `ready` with `v-if` instead, so transition mode never flips mid-flight.

This single fix restores the easing scene, the t-value scrubber, the bezier selector, the presets, and the duration control all at once. No glass-ui change required.

### 5.2 — Bezier selector (`EasingCurveCanvas`) — CONSUMER upgrade, glass-ui substrate

The bezier editor is a bespoke SVG. glass-ui has no cubic-bezier-editor primitive and should not gain one for a single consumer (visual-load-bearing-ness invariant). The idiomatic upgrade is consumer-side, composing glass-ui substrate:

- **Wrap the SVG in `<GlassPanel>`** (`@mkbabb/glass-ui` — substrate wrapper) or apply `.glass-wash` so the canvas sits on a glass surface instead of a bare `rounded-xl` div (fixes V2 missing-glass).
- **Drop the `max-height: 360px` + sidebar-column lock.** Make the canvas `aspect-ratio: 1` and let it fill available width; on mobile, the EasingSidebar should become a full-width sheet rather than a cramped column (fixes "too small and clipped"). Use a container-query (`@container`) so the canvas scales with its pane, not the viewport.
- **Retire the `--ppmycota-primary` hard-coded fallback.** Stroke the curve with a glass-ui accent token — `var(--primary)` or `var(--ring)` — so the curve carries the design-system accent in all modes (fixes V3). pp-mode can still retint via the cascade.
- **Preserves**: features 1, 2, 3 unchanged — the SVG plotting, the draggable handles, the rubber-band/smoothing logic, the traveling dot. Only the chrome (surface + sizing + stroke token) changes.

Glass-ui side: no change strictly required. Optional — confirm `<GlassPanel>` is exported on the curated root barrel (it is, per CLAUDE.md custom cherry-pick list note — `glass-panel` is a subpath; verify it is reachable).

### 5.3 — t-value scrubber — CONSUMER, adopt glass-ui `<Slider>`

The singular draggable ball is ~90 LOC of hand-rolled pointer math (`onBallPointerDown`, `progressFromPointerX`, `grabOffset`, `setPointerCapture`). This is exactly what glass-ui `<Slider variant="glass-scrubber">` (or `variant="timeline"`) exists for.

- **Replace the singular `.track-ball` block with `<Slider variant="glass-scrubber" :model-value="[demo.progress]" :min="0" :max="1" :step="0.001" @update:model-value="...">`.** The `glass-scrubber` variant ships a tall scrub track + grab-friendly thumb that materialises on hover/scrub — a far better t-scrubber than a bare ball.
- The pause-during-drag / resume-after behaviour: wire `@pointerdown` → `demo.pause()` is too coarse; instead watch the slider's drag via `update:model-value` (set `progress`) and resume on `pointerup`. The Slider's `keepDockOpen` contract is irrelevant here (not in a dock) — leave default.
- **Preserves** feature 8 (scrub `progress`, pause/resume). The large-ball aesthetic is replaced by a glass scrub track — this IS the idiomatic upgrade the user asked for ("leverage our glass-ui system").
- Multi-track comparison mode (feature 9) — keep the `.track-ball` list AS-IS for the comparison balls (they are read-only indicators, not scrubbers; a Slider per row would be wrong). Only the *singular interactive* ball becomes a `<Slider>`.

### 5.4 — Duration slider geometry-token bug (F7/V5) — SUBSTRATE + CONSUMER

Root cause: `sliderVariants` (`src/components/ui/slider/index.ts`) emits the size axis as Tailwind arbitrary classes **on the SliderRoot itself** — `size="md"` → `[--slider-track-height:0.375rem] [--slider-thumb-size:1rem]`. The consumer's `EasingSidebar.vue` `.duration-slider` wrapper sets `--slider-track-height: 4px` + `--slider-thumb-size: 0.75rem` on the **parent**. A custom property declared directly on the element wins over an inherited one — so the `md` class on the root shadows the consumer's wrapper tokens. The consumer's geometry override is dead; only the colour tokens (`--slider-track-bg`, `--slider-thumb-bg` — no own-element declaration) take effect.

This is the same "tokens-set-on-wrapper-don't-reach-the-styled-element" shape Qο found with IconTooltip. Two fixes, both legitimate:

- **CONSUMER fix** — drop the geometry tokens from the `.duration-slider` wrapper and instead pass `size="sm"` to `<Slider>` (`sm` = 4px track / 12px thumb — exactly the intended geometry). This is the idiomatic path: the size axis is a prop, not a token. The `cf75db9` refactor moved colour to tokens correctly but left geometry as wrapper tokens, which the size-class shadows. One-line change.
- **SUBSTRATE consideration** — the size-axis-as-root-class design means consumers genuinely cannot override geometry via wrapper tokens. If glass-ui wants wrapper-token geometry overrides to work, the `sliderVariants` size classes should be the *fallback* (`var(--slider-track-height, 0.375rem)` resolved from a non-root scope) — but the cleaner answer is the consumer fix above (use the `size` prop). Recommend: no substrate change; document that geometry is the `size` prop, colour is the token block. Fold a one-line note into the Slider CVA doc-comment.

### 5.5 — Easing preset Select / view-mode Select — already glass-ui, OK

`EasingSelect` and the view-mode picker already use glass-ui `<Select>` + `<DockSelectTrigger>`. No upgrade needed beyond the F1 mount fix. The `EasingSelect` trigger has heavy `!important` overrides (`!flex`, `![-webkit-line-clamp:unset]`, `!overflow-visible`) — a code smell suggesting the glass-ui `SelectTrigger` clamps its content; worth a follow-up but not a regression. Note for §6.

### 5.6 — Playground rebuild (F4/F5/V6/V7) — CONSUMER, large

The playground is a non-functional shell. This is a consumer rebuild, not a glass-ui defect. The idiomatic plan:

- The "Assets" tab must be reachable — the `EditorShell` controls panel must open by default (or expose an open affordance). Currently `show-start-screen=false` mounts the shell but nothing opens the panel.
- Add an **empty-state** to `AssetViewport` — a `<Card>` / glass-panel with a "drag or add an asset" call-to-action and an add-asset button, so the blank canvas reads as intentional.
- Surface an **add-asset** control (glass-ui `<Button>`) in the layer panel or viewport.
- Wrap the playground chrome in glass-ui surfaces (`glass-card` for panels) for parity with the rest of the demo.
- **Preserves** features 1-5 — asset CRUD, layer panel, viewport, animation binding, playback dock all already exist in code; the rebuild makes them *reachable*.

### 5.7 — Per-surface disposition summary

| Surface | Fix owner | Glass-ui primitive adopted |
|---------|-----------|----------------------------|
| Scene-transition crash (F1/F2) | CONSUMER (App.vue) | — (Vue Transition/KeepAlive ordering) |
| Bezier selector chrome (V2/V3) | CONSUMER | `<GlassPanel>` / `.glass-wash`, `--primary`/`--ring` token |
| t-value scrubber (F3, §5.3) | CONSUMER | `<Slider variant="glass-scrubber">` |
| Duration slider geometry (F7/V5) | CONSUMER (1-line `size="sm"`) | `<Slider size>` prop |
| Preset / view-mode Selects | none (already glass-ui) | `<Select>`, `<DockSelectTrigger>` |
| Playground reachability (F4/F5/V6/V7) | CONSUMER (rebuild) | `<Card>`/glass-panel, `<Button>` |

**No glass-ui substrate fix is strictly required by this slice.** Every defect is a consumer-side bug or a consumer-side idiomatic-upgrade opportunity. This is the opposite of Qο (which found a substrate IconTooltip regression). The Slider geometry-token shadowing (§5.4) is a substrate *design* sharp-edge worth a doc-comment, not a code change.

---

## Section 6 — Wave fold-in

| Defect | Owner | Wave | Action |
|--------|-------|------|--------|
| F1/F2 — scene-transition crash + route drift | keyframes.js consumer | **W1 (consumer)** | Reorder `Transition`/`KeepAlive` or drop `mode="out-in"` / eager-import scenes / drop `:css="ready"` toggle in `demo/app/App.vue`. P0 — unblocks the entire easing scene. |
| F3 / §5.3 — scrubber → `<Slider variant=glass-scrubber>` | keyframes.js consumer | **W1 (consumer)** | Replace the hand-rolled singular `.track-ball` with a glass-ui Slider. |
| V2/V3 — bezier canvas chrome + stroke token | keyframes.js consumer | **W1 (consumer)** | `<GlassPanel>`/`.glass-wash` wrap, drop `max-height` lock + container-query sizing, retire `--ppmycota-primary` fallback for `--primary`. |
| F7/V5 — duration slider geometry | keyframes.js consumer | **W1 (consumer)** | One-line: pass `size="sm"`, drop the dead geometry tokens from the `.duration-slider` wrapper. |
| §5.4 — Slider size-axis-vs-wrapper-token sharp edge | glass-ui substrate | **W3 (substrate, doc-only)** | Add a doc-comment to `sliderVariants` clarifying geometry = `size` prop, colour = token block; no code change. |
| §5.5 — `EasingSelect` trigger `!important` overrides | keyframes.js consumer | **W1 follow-up** | Investigate why `SelectTrigger` clamps content; likely a `line-clamp` default worth a substrate review if it recurs. Logged, low priority. |
| F4/F5/V6/V7 — playground non-functional shell | keyframes.js consumer | **new lane / post-Q** | Playground rebuild: reachable Assets tab, viewport empty-state, add-asset control, glass surfaces. Large; track as a keyframes.js consumer epic separate from the Q tranche. |
| F6 / dev-server fragility | keyframes.js infra | — | Pre-existing (Qη §0.1, Q-misc-3). `vite.config.ts` `server.fs.allow` + the font 403. NO-OP here. |
| V4 — no scene backdrop | keyframes.js consumer | — | Pre-existing (Qο defect 4). NO-OP. |

**Wave fold-in counts: W1 consumer = 5** (F1/F2, F3, V2/V3, F7/V5, §5.5 follow-up) · **W3 substrate = 1** (doc-only) · **new lane / post-Q = 1** (playground rebuild) · **NO-OP = 2** (F6, V4).

---

## Section 7 — Severity summary

| Severity | Defects | Rationale |
|----------|---------|-----------|
| **P0** | F1 (scene-transition crash), F2 (route drift), F3 (scrubber dead — inherits F1) | The easing scene does not mount on most loads. The t-value scrubber, the bezier selector, the presets, and the duration control are all unreachable. This is the user's "scrubber doesn't work" — diagnosed as a Vue `Transition mode=out-in` + `KeepAlive` + async-component crash in the keyframes.js App-shell, NOT a scrubber-logic bug and NOT the Qο IconTooltip cause. |
| **P1** | F4, F5, V6, V7 (playground non-functional shell) | The playground boots to an empty canvas with no way to add an asset or open controls. A whole demo surface is dead. Consumer rebuild required. |
| **P2** | V2, V3 (bezier canvas too small / clipped / no glass / black stroke), F7/V5 (duration slider wrong geometry) | The user's "bezier selector is far too small and clipped" + "style losses" — real, but cosmetic once F1 is fixed. Idiomatic glass-ui upgrade per §5.2-5.4. |
| **P3** | §5.5 (`EasingSelect` `!important` smell), V8 (route-drift collateral), V4 (no backdrop) | Low-impact / pre-existing / out-of-slice. |

**Top-3 P0s**: (1) the easing-scene scene-transition crash (`App.vue:106` Transition/KeepAlive/async-component) — fix unblocks everything; (2) the post-crash route drift `#/easing → #/cube/#/square`; (3) the t-value scrubber being dead, which is a *symptom* of (1), not its own bug.

**The t-value-scrubber root cause**: the scrubber is a hand-rolled draggable `<div class="track-ball">` inside `EasingTarget.vue`; its pointer logic is correct. It "doesn't work" because `EasingTarget` never mounts — the `<Transition mode="out-in">` wrapping `<KeepAlive>` wrapping a `defineAsyncComponent` in `demo/app/App.vue:106` crashes the Vue renderer (`getNextHostNode` null-deref) on the easing route, leaving the `#target` slot empty. NOT the Qο IconTooltip substrate cause — different root, consumer-side, App-shell.

### Screenshot inventory

`docs/tranches/Q/research/screenshots/`:
- `q-rho-easing-1280-initial.png` — easing scene rendered fully (the one successful load; visual-audit evidence — bezier canvas, ball track, sidebar).
- `q-rho-easing-1280-working.png` / `q-rho-easing-1280-recheck.png` — easing route showing the stale CubeScene after route drift (F2).
- `q-rho-easing-1280-clean.png` — easing route crashed: blank scene, only dock + bottom bar (F1/V1).
- `q-rho-easing-1280-full.png` — route drifted to Square scene, also blank.
- `q-rho-easing-390-crashed.png` — 390px: route-drifted Square scene with stray green rectangle + pink blob compositing corruption (V8).
- `q-rho-playground-1280-initial.png` — playground mid-`ERR_CONNECTION_REFUSED` (dev-server died).
- `q-rho-playground-1280-clean.png` — playground clean load: empty canvas, only bottom dock (F4/F5/V6/V7).

### Cross-references

- `Qomicron-keyframes-timeline-reaudit.md` — the timeline scrubber's root cause (IconTooltip substrate wrapping span). The easing scrubber is a DIFFERENT, consumer-side cause — confirmed here.
- `Qeta-keyframes-cosmetic-regressions.md` §0.1 — dev-server fragility (font 403 + parent-shell signal). Reproduced here ×4; F6 is the same class.
- `demo/app/App.vue:106-115` — F1 root cause.
- `demo/easing/EasingTarget.vue:280-313` — the scrubber logic (sound).
- `demo/@/components/custom/EasingCurveCanvas.vue` — the bezier selector (V2/V3 upgrade target).
- `src/components/ui/slider/index.ts` — `sliderVariants` size-axis-as-root-class (F7/§5.4 sharp edge).
