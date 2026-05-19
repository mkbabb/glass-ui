# Q.W5 Lane D + F — idiomatic glass-ui adoption + dead-code purge

**Lanes**: D (Q-cos-18 — idiomatic adoption sweep) + F (Q-cos-17 dead-code purge + Q-cos-20 playground).
**Repo modified**: `keyframes.js` (sibling of glass-ui). glass-ui untouched — W5 is a consumer-side wave.
**Date**: 2026-05-18. glass-ui master @ `d244dd5`.
**Predecessors landed**: Lane A (scene-crash fix, `84f1659`), Lanes B/C/E (`5861d18`). The rotations-dropdown `<StatusDot>` adoption is DONE in Lane B — not re-done here.

---

## Charter

Two lanes against the keyframes.js demo:

- **Lane D** — per-surface, replace hand-rolled chrome with the glass-ui primitive, gated on a feature-parity check against the round-4 feature inventories (Qρ §4 / Qσ §4 / Qτ §4 — the binding "no loss of functionality" checklist).
- **Lane F** — purge the pre-unified-app dead code; complete the playground OR file a scoped follow-on.

Plus the Q.Rh-3 substrate-gap referral (`ProgressRing`).

---

## Lane D — idiomatic glass-ui adoptions

### D.1 — t-value scrubber → `<Slider variant="glass-scrubber">`

**File**: `demo/easing/EasingTarget.vue`.

The singular-mode t-scrubber was a hand-rolled draggable `<div class="track-ball">` plus ~90 LOC of pointer math (`onBallPointerDown`, `progressFromPointerX`, `grabOffset`, `setPointerCapture`, the `track-line`/`track-marker` chrome, the singular-only `getSingularMaxX`/`measureTrackWidth` measurement code).

**Variant verification**: `sliderVariants` at glass-ui HEAD (`src/components/ui/slider/index.ts`) ships a `glass-scrubber` variant — "tall scrub track + grab-friendly thin-bar thumb". No referral needed; the canonical variant exists. Adopted with `size="lg"` (12px track / 24px thumb) for a grab-friendly t-scrubber, tinted from the demo's `--color-progress` token via the standard `--slider-{track,range,thumb}-bg` colour block.

**Replacement**:
```vue
<Slider class="t-scrubber w-full" variant="glass-scrubber" size="lg"
  :model-value="[demo.progress.value]" :min="0" :max="1" :step="0.001"
  @update:model-value="onScrub" @pointerdown="onScrubStart" @value-commit="onScrubEnd" />
```

**Feature-parity check vs Qρ §4.1 feature 8** ("one large draggable ball on a track; dragging scrubs `progress`, pausing playback during the gesture and resuming after"):

| Sub-feature | Old (track-ball) | New (Slider) | Status |
|---|---|---|---|
| Drag scrubs `demo.progress` | `pointermove` → `progressFromPointerX` | `@update:model-value` → `onScrub` | PARITY |
| Pause playback during gesture | `pointerdown` → `demo.pause()` | `@pointerdown` → `onScrubStart` → `demo.pause()` | PARITY |
| Resume playback after gesture | `pointerup` → `demo.play()` | `@value-commit` (reka-ui drag-end) → `onScrubEnd` → `demo.play()` | PARITY |
| Clamp to [0,1] | `Math.max(0, Math.min(…,1))` | `min=0 max=1` + clamp in `onScrub` | PARITY |
| Keyboard scrubbing | — (absent) | arrow / Home / End (reka-ui SliderRoot) | BONUS |

Zero feature loss. `value-commit` confirmed as a valid `SliderRootEmits` member in reka-ui's d.ts (`valueCommit: [payload: number[]]`). The large-ball aesthetic is replaced by the glass scrub track — this IS the idiomatic upgrade the user asked for (Qρ §5.3 "leverage our glass-ui system").

**Comparison mode kept hand-rolled**: the multi-track comparison balls (Qρ §4.1 feature 9) stay as `.track-ball--active/--muted` divs — they are read-only progress indicators, not scrubbers; a Slider per row would be semantically wrong (Qρ §5.3 explicit guidance). The `getBallX` measurement code for the comparison tracks is retained; only the singular-mode measurement (`getSingularMaxX`, `singularBallX`, `dragBallX`, `BALL_SIZE_SINGULAR`, the `--track-ball-size-singular` token, the `track-line--singular`/`track-marker` CSS) was removed as now-dead.

### D.2 — bezier-editor canvas → `<GlassPanel variant="wash">` substrate

**File**: `demo/@/components/custom/EasingCurveCanvas.vue`.

Per Qρ §5.2 / V2 / V3. Three changes, all chrome — the SVG plotting, draggable handles, rubber-band/smoothing logic, and traveling dot (Qρ §4.1 features 1-3) are untouched:

1. **Substrate** — the bare `<div class="… rounded-xl">` wrapper is now `<GlassPanel variant="wash">` (`@mkbabb/glass-ui/glass-panel`). `GlassPanel` is the tier-adaptive substrate wrapper; `variant="wash"` composes the canonical `.glass-wash` rung of the 5-rung glass ladder. Fixes V2 "no glass treatment".
2. **Sizing lock dropped** — the `max-height: 360px` cap is removed; the canvas now holds `aspect-ratio: 1` and fills its pane width, keeping `min-height: 140px`. The curve scales with its container rather than being locked into a fixed sidebar-column square (Qρ V2 "far too small and clipped"). Lane E owns the responsive sidebar grid; this lane removes the canvas-side lock.
3. **Stroke token retired** — `.bezier-path` and `.traveling-dot` stroked `var(--ppmycota-primary, var(--foreground))` — when pp-mode is off the fallback was near-black. Now `var(--ppmycota-primary, var(--primary))` — the curve carries the design-system accent in all modes; pp-mode still retints via the cascade when `--ppmycota-primary` is defined. Fixes V3.

**Feature-parity check vs Qρ §4.1 features 1, 2, 3**: SVG plot + background grid + axis labels + clamped viewBox (feature 1), draggable cubic-bezier handles with dashed lines + rubber-band clamp + pointer smoothing (feature 2), traveling progress dot (feature 3) — all carried verbatim. Only the surface, the size lock, and the stroke token changed. Zero feature loss.

### D.3 — duration slider → `<Slider size="sm">`

**File**: `demo/easing/EasingSidebar.vue`.

Per Qρ §5.4 / F7 / V5. The `.duration-slider` wrapper set `--slider-track-height: 4px` + `--slider-thumb-size: 0.75rem` as custom properties on the **parent** div. `sliderVariants` emits the size axis as arbitrary CSS-variable classes **on the SliderRoot itself** — an own-element custom property wins over an inherited one, so the `md`-default size class shadowed the consumer's wrapper geometry. The geometry tokens were dead.

Fix: pass `size="sm"` (`sliderVariants` `sm` = 4px track / 12px thumb — exactly the intended geometry) and drop the two dead geometry tokens from the wrapper. The colour tokens (`--slider-track-bg`, `--slider-range-bg`, `--slider-thumb-bg` — no own-element declaration on SliderRoot, so they correctly inherit) are kept. One-line idiomatic change: geometry is a prop, colour is a token block.

**Feature-parity check vs Qρ §4.1 feature 7** (duration `<Slider>` 300-5000ms step 100 + the paired `<Input>`): the Slider's range/step props and the duration `<Input>` are untouched; only the geometry-binding mechanism changed (and now actually takes effect). Zero feature loss; this is a net fix — the intended 4px/12px geometry now renders.

### D.4 — other surfaces flagged across Qρ/σ/τ §5

- **Rotations / TopDock / view-mode Selects** — already glass-ui `<Select>` + `<DockSelectTrigger>` (Qρ §5.5, Qτ). No adoption needed.
- **Rotations-dropdown option-dots** — `<StatusDot>` adoption landed in Lane B. Not re-done.
- **`EasingSelect` trigger `!important` overrides** (Qρ §5.5) — flagged as a code smell, explicitly "not a regression". Left as-is; out of this lane's scope (a glass-ui `SelectTrigger` line-clamp review, not a consumer adoption).
- **Playground asset manager** — already composes glass-ui `<Card>`, `<Button>`, `<DropdownMenu>`, `<Switch>`, `<Input>`. The playground work (below) is reachability, not chrome.

---

## Lane F — dead-code purge

### Purge — DELETED

| Path | Rationale |
|---|---|
| `demo/boxes/` | Orphaned standalone — outside the dev root, no npm script, `@src`-alias 500 standalone (Qσ D2). Entire dir dead. |
| `demo/balls/` | Same — orphaned standalone parity demo (Qσ D2). Entire dir dead. |
| `demo/simple/` | Orphaned standalone (Qσ D3) — `App.vue` + `index.html` + `useSimpleAnimations.ts`. Simple was dropped from the unified-app scene roster. |
| `demo/bench/` | Orphaned **browser** harness — `index.html` + `runner.ts`. The `bench` npm script (`vitest bench`) targets `bench/*.bench.ts` at the **repo root** (`bench/interpolation.bench.ts`, `bench/parser.bench.ts`, `bench/playwright.bench.ts`) — a DIFFERENT directory, untouched. `demo/bench/runner.ts` is imported only by its own `demo/bench/index.html`; `bench/playwright.bench.ts` merely *names* `/demo/bench/index.html` in a comment, it does not import it. See decision note below. |
| `demo/cube/App.vue`, `demo/cube/index.html` | Standalone pre-unified-app cube — superseded by `demo/app/scenes/CubeScene.vue`. ONLY the standalone entry files deleted. |
| `demo/amiga/App.vue`, `demo/amiga/index.html` | Standalone pre-unified-app amiga — superseded by `demo/app/scenes/AmigaScene.vue`. ONLY the standalone entry files deleted. |
| `demo/square/App.vue`, `demo/square/index.html` | Standalone pre-unified-app square — superseded by `demo/app/scenes/SquareScene.vue`. ONLY the standalone entry files deleted. |
| `demo/app/SceneNav.vue` | Orphaned — zero importers confirmed by grep (superseded by TopDock). |
| `demo/app/scenes/SimpleScene.vue` | Orphaned — not in the `scenes.ts` roster, imported nowhere (Qσ D3). |
| `demo/@/components/ui/{23 dirs}` | Orphaned shadcn-vue shadow dirs — `alert, alert-dialog, aspect-ratio, auto-form, breadcrumb, button, calendar, carousel, chart, chart-area, chart-bar, chart-donut, chart-line, form, label, navigation-menu, pagination, pin-input, range-calendar, resizable, sonner, table, toast, v-calendar`. Zero importers outside `ui/`. Live primitives import `@mkbabb/glass-ui` directly per the consumer-wiring pattern. |

### Purge — KEPT (audit corrections)

The Qτ/Qσ audits' delete-lists contained two over-broad claims, corrected here:

1. **`demo/@/components/ui/menubar/` — KEPT.** Qτ §1.3 listed 25 orphaned `ui/` dirs. Grep shows `menubar` has **1 live importer**: `demo/@/components/custom/animation-controls/keyframes/KeyframesEditor.vue` (`import { Menubar, MenubarTrigger, MenubarMenu } from "@components/ui/menubar"`). glass-ui ships no `Menubar` primitive, and the dir is self-contained (depends only on `@utils/utils`, `reka-ui`, `lucide`, `vue`). It is a live, self-contained shadcn-vue component with no glass-ui equivalent — it stays. 24 dirs deleted, not 25.

2. **`demo/cube/`, `demo/amiga/`, `demo/square/` — PARTIALLY kept.** The audits called these "standalone dupes — DELETE". They are NOT pure dupes. The live unified-app scenes import shared substrate from them:
   - `demo/app/scenes/CubeScene.vue` → `../../cube/CubeTarget.vue`, `../../cube/useCubeAnimations`
   - `demo/app/scenes/AmigaScene.vue` → `../../amiga/utils`, `../../amiga/useAmigaAnimations`
   - `demo/app/scenes/SquareScene.vue` → `../../square/useSquareAnimations`

   The dirs hold a MIX: live substrate (`*Target.vue`, `use*Animations.ts`, `utils.ts`, the `checkerboard.jpg` / `cube.png` assets) + the genuinely-dead standalone entry pair (`App.vue` + `index.html`). Only the `App.vue` + `index.html` pairs were deleted; the live substrate is retained. (This was caught when the first delete-everything pass broke the `gh-pages` build with `Could not resolve "../../cube/CubeTarget.vue"`; the live files were restored byte-exact from `HEAD` via `git cat-file` for the binaries, and the dirs re-verified to contain only live-imported substrate.)

### `demo/bench/` decision — DELETE (not wire)

The W5 plan offered "wire into the dev root OR delete if redundant". Decision: **DELETE**, with this justification:

- `demo/bench/` is a standalone browser HTML harness with hardcoded dark inline styles, an `@src`-alias dependency that 500s outside the root, and no npm script. Wiring it as a scene would mean a full Vue rebuild (per Qσ §5 D2's WIRE path).
- A live benchmark surface **already exists**: the repo-root `bench/` dir holds `interpolation.bench.ts` + `parser.bench.ts` + `playwright.bench.ts`, run by the existing `bench` npm script (`vitest bench`, glob `bench/*.bench.ts` per `vitest.config.ts`). The engine-perf capability is not lost — it has a live, scripted home. `demo/bench/` is a redundant, unrunnable second harness.

Deleting `demo/bench/` and keeping the root `bench/` suite is the clean break — no half-dead code, the benchmark capability stays live via `npm run bench`.

---

## Playground disposition — COMPLETED

**Files**: `demo/playground/App.vue`, `demo/@/components/custom/asset-manager/AssetViewport.vue`.

Per Qρ F4/F5/V6/V7, the playground booted to a non-functional shell: empty canvas, no Assets tab, no add-asset affordance, no controls panel. **This was a reachability bug, not a missing build** — the asset manager (`AssetLayerPanel` with its add-asset dropdown, layer list, properties panel, grid-snap; `AssetViewport` with drag/resize/rotate; `useAssetManager` CRUD) was fully built. Completion was within the wave envelope — no follow-on filed.

**Root cause**: `AnimationControlsGroup.vue` gates the controls pane (which hosts the playground's `#tabs-content` "Assets" tab) on `v-show="storedControls.selectedAnimation && !hideControls"`. The control-options store default is `selectedAnimation: ""` (falsy). The playground has no animation picker — it binds animations per-asset — so `selectedAnimation` was never set, the pane never rendered, and the Assets tab content was unreachable. `EditorShell`'s `show-start-screen=false` correctly clears `hideControls`, but that alone is not enough.

**Fix** (`demo/playground/App.vue`): on init, seed the control-options store for the playground's `superKey` via `getStoredAnimationGroupControlOptions(superKey)` —
- set `selectedAnimation` to the first preset (`bounce`) if unset/stale → the controls pane renders;
- set `selectedControl = "assets"` → the pane's `<Tabs>` routes to the playground's Assets `TabsContent`;
- set `isControlsPanelOpen = true` → the pane is open on cold boot.

This makes the "Assets" tab + the full asset manager reachable on a cold boot — no rebuild, no new component, just the missing store seed.

**Empty-state** (`AssetViewport.vue`): added a glass-card empty-state CTA, shown when `sortedAssets.length === 0` — a `<Card class="glass-card">` with a `Shapes` icon, "Compose a scene" heading, an instructional line, and an "Add a shape" `<Button>`. The button emits a new `add` event; `App.vue` wires it to `useAssetManager().addAsset`. Fixes V6 ("empty canvas reads as broken") — the blank viewport now reads as intentional with a clear affordance. The asset manager state is shared between `App.vue` and `AssetLayerPanel.vue` via vueuse `useStorage` (same `"asset-manager-state"` key) — both `useAssetManager()` calls observe the same persisted store, so an asset added from the viewport empty-state appears in the layer panel.

**Feature-parity check vs Qρ §4.2 playground features 1-5**: asset manager CRUD (1), asset layer panel (2), asset viewport with grid-snap (3), per-asset animation binding (4), playback dock (5) — all already in code; the fix makes them *reachable*. Zero feature loss; net gain (the surface is now functional + has an empty-state).

---

## Q.Rh-3 — substrate-gap referral (`ProgressRing` / `CircularProgress`)

**Status**: PROVISIONAL — filed for evaluation at W6 close against the ≥2-consumer test.

**Gap**: glass-ui has linear determinate `Progress` (default + gradient) and indeterminate `Pulse` (dots/ring loading), but **no determinate radial/circular progress** primitive. The keyframes.js rotations-dropdown per-option dots, in their *active/playing* state, want a conic-gradient progress arc driven by a `--dot-p` (0-1) custom property — a determinate radial progress. The discrete idle/active/paused states are covered by `<StatusDot>` (adopted in Lane B); the **continuous progress arc** is not.

**Spec** — `ProgressRing` (proposed): a token-driven determinate radial-progress primitive.
- Props: `value` (0-1), `size` (`xs | sm | md`), optional `glow: boolean`.
- Render: a conic-gradient fill swept to `value × 360deg`, a track ring underneath, optional glow at high values. Stroke/track/glow tone from CSS custom properties (`--progress-ring-fill`, `--progress-ring-track`), defaulting to `--primary` / `--muted`.
- Substrate home: `src/components/custom/progress-ring/` (or fold a `circular` variant into the existing `progress/` package).

**≥2-consumer test** (the W6 gate):
- Consumer 1 — keyframes.js rotations-dropdown per-option active-progress arc (currently a demo-private conic-gradient scoped in `AnimationMenuBar.vue`'s `<style scoped>` — already correctly isolated).
- Consumer 2 — candidate: the `AnimationMenuBar` collapsed-pill could ring the play button with overall group progress; the timeline scrubber caret is another. Not yet a confirmed second *shipping* consumer.

**Disposition**: PROVISIONAL. If W6 confirms a second shipping consumer, `ProgressRing` becomes a post-Q substrate-primitive candidate. If not, the conic-gradient stays demo-private in keyframes.js (it is already scoped to one SFC — no harm). The W5 rotations-dropdown fix uses `<StatusDot>` regardless; Q.Rh-3 is an enhancement, not a blocker.

---

## Verification

| Gate | Command | Result |
|---|---|---|
| Library typecheck | `npm run check` (`tsc --noEmit`) | GREEN |
| Library build | `npm run build` | GREEN — `dist/keyframes.js` 50.19 kB |
| Demo app build (dev root + all 4 live scenes) | `npm run gh-pages` | GREEN — `CubeScene`, `SquareScene`, `AmigaScene`, `EasingScene` all chunked |
| Playground build | `vite build --mode playground` | GREEN |
| Dangling-ref scan | grep for `demo/{simple,balls,boxes,bench}`, `SceneNav`, `SimpleScene` | clean — zero references |

**Feature-parity walk** — Qρ §4 / Qσ §4 / Qτ §4 inventories:
- Qρ §4.1 easing scene (11 features) — scrubber (D.1), bezier canvas (D.2), duration control (D.3) verified parity per the per-surface tables above; all other features (preset Select, steps editor, play/pause/reset, multi-track, auto-follow) untouched. Zero loss.
- Qρ §4.2 playground (5 features) — all reachable post-completion. Zero loss.
- Qσ §4 scenes (Cube/Amiga/Square + the engine-capability demos) — the 4 live scenes' substrate retained byte-exact (`demo/{cube,amiga,square}/` live files restored after the over-broad first pass); only standalone entry pairs deleted. The Simple/boxes/balls/bench standalone demos were already orphaned and unrunnable pre-W5 — the bench *capability* survives via the live root `bench/` `vitest bench` suite. Zero loss of any reachable feature.
- Qτ §4 shared chrome — `menubar` (a live `KeyframesEditor` dependency) corrected OUT of the delete-list; status-dot/rainbow restorations are Lane B. Zero loss.

---

## Verdict

Lane D + F **COMPLETE**.

- **Lane D** — 3 idiomatic adoptions landed, each feature-parity-verified: t-scrubber → `<Slider variant="glass-scrubber">` (parity + keyboard-scrub bonus); bezier canvas → `<GlassPanel variant="wash">` + `aspect-ratio` + `--primary` stroke; duration slider → `<Slider size="sm">` (geometry now actually renders). The `glass-scrubber` variant was verified present at glass-ui HEAD — no substrate referral needed for a missing variant.
- **Lane F** — dead code purged: 4 fully-orphaned dirs (`boxes`, `balls`, `simple`, `bench`), 6 standalone entry files, `SceneNav.vue`, `SimpleScene.vue`, 23 orphaned `ui/` dirs. Two audit over-reach corrections: `menubar` kept (1 live importer), and `demo/{cube,amiga,square}/` live substrate kept (the unified-app scenes import from them — only the standalone `App.vue`/`index.html` dupes deleted). `demo/bench/` deleted with justification — the bench capability has a live home in the root `bench/` `vitest bench` suite.
- **Playground** — COMPLETED in-wave (no follow-on): the reachability bug is fixed by seeding the control-options store; an `AssetViewport` empty-state CTA added. Full asset manager now functional on cold boot.
- **Q.Rh-3** — `ProgressRing` substrate-gap referral filed, PROVISIONAL, for W6 ≥2-consumer evaluation.

All four verification gates GREEN. Zero feature or functionality loss against the round-4 inventories.
</content>
