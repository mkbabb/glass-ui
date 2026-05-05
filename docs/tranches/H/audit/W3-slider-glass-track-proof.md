# H.W3 — Slider glass-track + dock-keep-open round-trip — Proof

**Wave**: H.W3 (combined Lane I + Lane II — single agent because the lanes
are tightly coupled: the sink consumer in `<Slider>` aligns with the sink
provider in `<DockLayerGroup>`).
**Closes**: G's R3 (`<Slider variant="glass-track">` + `:keep-dock-open` round-trip).
**Status**: implementation complete; ready for orchestrator commit.

## Substrate summary

H.W1 Lane D retired the Ref-prop `keepOpenWhile` per H invariant 2 (no
in-repo consumer at HEAD). W3 ships the leaf-side `dockKeepOpenSink` as
the canonical and sole dock-keep-open primitive: imperative
`acquire(): symbol` + `release(token: symbol): void`, token-counted,
`onUnmounted`-drained.

## Sink API definition

`src/components/custom/dock/DockLayerGroup.vue:1-25` — top-level
`<script lang="ts">` block declares the type and the inject key:

```ts
export interface DockKeepOpenSink {
    acquire(): symbol;
    release(token: symbol): void;
}

export const DOCK_KEEP_OPEN_SINK_KEY = "dockKeepOpenSink" as const;
```

The dual-script-block pattern (regular `<script lang="ts">` for type/key
exports + `<script setup lang="ts">` for the component) keeps the
in-bounds promise (file bounds permit only modifying
`DockLayerGroup.vue` + `dock/index.ts`) without a sibling `.ts` module.

## Sink provider site

`src/components/custom/dock/DockLayerGroup.vue:96-138` — the
`<script setup>` block injects the parent dock's existing
`dockKeepOpen` / `dockRelease` functions (provided by `useDockState` —
unchanged), wraps them with a `Set<symbol>` of acquired tokens, and
provides the sink under `DOCK_KEEP_OPEN_SINK_KEY`. Exact lines:

- `104-105`: `inject<(() => void) | null>("dockKeepOpen", null)` /
  `"dockRelease"` — wires into the existing `useDockState` provide-keys.
- `107-108`: `acquiredTokens: Set<symbol>` + `parentHeld: boolean` flag.
- `110-118`: `acquire()` — adds a fresh `Symbol("dockKeepOpenToken")`,
  calls `parentKeepOpen?.()` exactly once on first acquire.
- `120-126`: `release(token)` — `Set.delete()` returns false for
  unknown/already-released tokens (idempotent); when set drains, calls
  `parentRelease?.()` exactly once.
- `128-129`: `provide(DOCK_KEEP_OPEN_SINK_KEY, sink)`.
- `131-138`: `onUnmounted` defensively drains a held parent counter.

`src/components/custom/dock/index.ts:9-12` — re-exports the sink
type + key:

```ts
export {
    DOCK_KEEP_OPEN_SINK_KEY,
    type DockKeepOpenSink,
} from "./DockLayerGroup.vue";
```

`useDockState.ts` is **untouched** — option (b) per the dispatch: the
sink wraps the existing `dockKeepOpen` / `dockRelease` provide-keys
rather than extending them. `<DockPopover>` continues to consume the
function-keys directly; the sink is the new declarative-imperative
primitive for leaf controls (sliders, scrubbers, drag handles).

## Slider CVA / variant addition

`src/components/ui/slider/Slider.vue:11-19` — the existing variant union
gains `'glass-track'` as the fourth member. The slider preserves its
existing `glass-slider--{variant}` CSS-class scheme rather than
introducing CVA; this matches the file's prior convention (variants
'standard', 'spectrum', 'timeline' all flow through the same
class-binding pattern), keeps the diff minimal, and stays inside file
bounds.

```ts
variant?: 'standard' | 'spectrum' | 'timeline' | 'glass-track'
```

CSS for the variant lives inline at `Slider.vue:131-167`:

- `.glass-slider--glass-track .slider-track` — `height: 0.25rem` (4px),
  `background: var(--glass-bg-subtle)` at rest;
- `:hover .slider-track` — `height: 0.375rem` (6px),
  `background: var(--glass-bg-medium)`;
- `.slider-thumb:active` /`[data-state="active"]` —
  `transform: scale(var(--scale-press))` +
  `box-shadow: var(--shadow-cartoon-accent)`.

Tokens consumed per W3.md: `--glass-bg-subtle`, `--glass-bg-medium`,
`--shadow-cartoon-accent`, `--scale-press`. All four pre-exist in
`src/styles/tokens.css`.

## Slider prop addition

`src/components/ui/slider/Slider.vue:20-27` — `keepDockOpen?: boolean`
prop (default `false` per the optional-with-no-default Vue
convention). Stripped from `delegatedProps` at `33` so reka-ui's
`SliderRoot` does not receive an unknown prop.

## Pointer-event acquire / release wiring

`src/components/ui/slider/Slider.vue:43-64` — the wiring:

- `44`: `inject<DockKeepOpenSink | null>(DOCK_KEEP_OPEN_SINK_KEY, null)`
  — null fallback when slider is mounted outside a `<DockLayerGroup>`.
- `45`: `let activeToken: symbol | null` — module-local closure state;
  no need for reactivity since the sink token is opaque.
- `47-50`: `onPointerDown` — guard on `props.keepDockOpen`, sink
  presence, and an existing token (defensive against double-acquire);
  call `dockSink.acquire()` and stash the returned token.
- `52-56`: `onPointerUp` — release the held token and clear; bound to
  both `pointerup` and `pointercancel`.
- `58-64`: `onBeforeUnmount` — drain a still-held token so the parent
  counter unwinds even on abrupt unmount mid-drag.

Template wiring at `Slider.vue:76-78`:

```html
<SliderRoot
    ...
    @pointerdown="onPointerDown"
    @pointerup="onPointerUp"
    @pointercancel="onPointerUp"
>
```

The handlers are bound on `SliderRoot` (the reka-ui primitive). reka-ui
forwards these as native DOM listeners — no primitive-internal
indirection. Pointerdown fires at the start of any drag (track-click or
thumb-grab); pointerup/pointercancel cover release in all dispatch
paths.

## Hard gate (d) — 5 fourier+EditorControls sites

Per W3.md hard gate (d) and W3.md Purpose ("3 distinct fourier-analysis
sites + 2 EditorControlsDock/EditorToolsPanel inputs"), the canon
`<Slider variant="glass-track">` (with `:keep-dock-open` when wrapped
by `<DockLayerGroup>`) is the named replacement for the following
consumer sites listed in
`docs/tranches/G/audit/W5-fourier-analysis-web-migration.md`. Verification
is paper-only — H does not touch consumer trees per H out-of-scope §4.

| # | Consumer site (fourier-analysis/web) | Source ledger row | Replacement |
|---|---|---|---|
| 1 | `src/components/visualization/SliderControl.vue:166-220` | C-23 | `<Slider variant="glass-track" :keep-dock-open v-model="…" />` (mounted inside `<DockLayerGroup>`) |
| 2 | `src/components/visualization/GlassTimeline.vue:122-174` | C-23 | `<Slider variant="glass-track" :keep-dock-open v-model="…" />` |
| 3 | `src/components/convergence/ConvergenceTimeline.vue:119-157` | C-23 | `<Slider variant="glass-track" v-model="…" />` (no dock wrap; plain glass scrub) |
| 4 | `src/components/visualization/EditorControlsDock.vue` (per-control sliders, ledger row C-20 noted as the dock) | C-20 / W3.md Purpose | `<Slider variant="glass-track" :keep-dock-open … />` |
| 5 | `src/components/visualization/EditorToolsPanel.vue` (input range controls, per ledger row C-19 cluster + W3.md Purpose) | C-19 / W3.md Purpose | `<Slider variant="glass-track" :keep-dock-open … />` |

The dock-keep-open injection at consumer sites
`SliderControl.vue:24-25` and `GlassTimeline.vue:12-13` (per ledger
C-23) — formerly mapped to `<DockLayerGroup :keepOpenWhile>` — collapses
to the single `:keep-dock-open` boolean on the canonical slider. The
retired Ref-prop is not restored.

## Final typecheck + build output

```
$ npx vue-tsc --noEmit -p tsconfig.src.json
(clean — 0 errors)

$ npm run build
[vite:dts] Declaration files built in 24617ms.
✓ built in 25.77s
```

`tsconfig.src.json` is the in-repo src-only project config; canonical
verification for library work. The default `npm run typecheck` (which
also includes `demo/`) reports a pre-existing failure in an
**untracked** story file (`demo/stories/primitives/slider-glass-track.vue`
references a non-existent `./_slider_dock_bridge.vue`) — this is not
W3 work; the story is the W4 deliverable per W3.md required artefacts:
"new W4 story: `demo/stories/primitives/slider-glass-track.vue`
(deferred to W4 actual story dispatch; this wave just exposes the
variant)". See "Scope reveals" below.

Built `dist/dock.d.ts` confirms the surface — `DOCK_KEEP_OPEN_SINK_KEY`
+ `interface DockKeepOpenSink` are publicly typed at
`dist/dock.d.ts:310,335`.

## Scope reveals

1. **Untracked story file** — `demo/stories/primitives/slider-glass-track.vue`
   (449 lines) and a missing `_slider_dock_bridge.vue` it imports were
   already on disk at task start (status `??`). The story is W4
   deliverable territory per W3.md required artefacts; W3's file
   bounds explicitly forbid story edits ("must NOT touch: any other
   UI component, any other custom component, any composable beyond
   useDockState, any style file, any token, any story"). The story's
   broken state breaks `npm run typecheck` (which scopes both `src/`
   and `demo/` per `tsconfig.json`), but does **not** invalidate W3:
   src-only typecheck via `tsconfig.src.json` is clean, and build
   green. Routing: orchestrator absorbs into W4 dispatch (either ship
   `_slider_dock_bridge.vue` or fold the bridge inline into the story
   `<script setup>`).
2. **Pre-existing modified `DESIGN.md`** at task start (`git status`
   shows ` M DESIGN.md`). Outside W3 file bounds; not touched.

## File diff summary

```
$ git status --short
 M DESIGN.md                                   ← pre-existing, NOT W3
 M src/components/custom/dock/DockLayerGroup.vue
 M src/components/custom/dock/index.ts
 M src/components/ui/slider/Slider.vue
?? demo/stories/primitives/slider-glass-track.vue   ← pre-existing W4, NOT W3
?? docs/tranches/H/audit/W3-slider-glass-track-proof.md
```

Three source files modified (all in declared bounds), one new audit
doc. No destructive git commands run during this wave.
