# J.R2 — Aurora + blob deep audit

## Preamble

- **Scope.** User findings 7–11 (J/findings.md:14–20). Read-only research lane.
- **Glass-ui revision.** `950d1f4` (post-I close).
- **Speedtest revision read.** `6eb6f0b` — `../speedtest/src/composables/useAuroraPolicy.ts`,
  `../speedtest/src/config/auroraConfig.ts`, `../speedtest/src/App.vue`.
- **Substrate placement.** Aurora is a substrate (DESIGN.md §Substrate
  Hierarchy frames paper / cream / glass tiers; aurora is a *fourth*,
  unwritten background-substrate tier — full-bleed, animated, painterly).
  Blob is a primitive on cream paper (G/blob/SPEC.md §1, §2.1). Both
  consume the design-language axis (CLAUDE.md:205+); aurora is the
  open-ended editorial maximalism, blob is its mascot grammar.
- **Method.** Source read for all 16 listed inputs (Aurora.vue,
  presets.ts, useAurora.ts, runtime.ts, AuroraConfigDock.vue,
  PresetPickerRow.vue, AuroraStage.vue, useAuroraStudio.ts, demo
  presets.ts, six config layers, BouncyToggle.vue, ExpandableContainer.vue,
  Blob.vue, blob composables, blob.vue story, blob-stress.vue,
  speedtest aurora pair). Playwright probe of `/aurora` captured at
  1440×900 (`aurora-page.png`); `/primitives/blob` viewport hero
  captured (`blob-page.png`). DevTools `evaluate` runs to confirm
  layout boxes (340px aside, no `overflow-hidden` ancestor on the
  configurator panel; `bg-background/20` semi-translucent left panel).

The aurora studio (`demo/stories/aurora.vue`) is the polished
configurator; the blob playground is one section out of eight in
`primitives/blob.vue`. The two configurators do not share chrome,
even though their semantics are identical: scrub fields → re-render
the specimen.

---

## Findings by axis (style-audit 1–7)

### 1. Token alignment

- **Aurora `bg-background/20` aside** (`demo/stories/aurora.vue:103`) — uses
  Tailwind opacity shorthand; OK, but the sibling stage has **no neutral
  fallback** when `prefers-reduced-transparency` is set. The aside's
  semi-transparent fill bleeds the canvas through the configurator
  unless the canvas pauses (it does, via `useAurora`'s reduced-motion
  watcher, but the canvas's last frame still composites under the
  panel).
- **Aurora pastel wash literal** (`aurora.vue:86`) — three
  `radial-gradient(...)` strings are inlined as a `:style` literal that
  references `--rainbow-pastel-{red,blue,yellow}`. Same recipe lives
  inline in `primitives/blob.vue:215–222` (warm yellow + violet + blue
  pastel wash) and in primitives/* uplift heroes
  (I/audit/W4-A2-uplift-proof.md repair pattern). Three+ sites
  hand-inlining the same recipe → glass-ui gap (`.pastel-wash-{warm,
  cool, rainbow}` utility, see *Glass-ui gaps*).
- **Blob playground** (`primitives/blob.vue:74–90`) — fifteen colors
  written as `hsl(...)` strings. The *names* (rainbow-red, viz-fourier,
  gold) match canonical token names but the values are duplicated
  literals, not `var(--rainbow-red)` references. `tokens.css` exposes
  these tokens — the demo bypasses them. Same drift in MOODS table at
  blob.vue:46–71 and NINE at blob.vue:117–127.
- **Speedtest aurora palette** uses raw OKLCH values
  (`auroraConfig.ts:19–26`) with comments mapping to `--aurora-1..6`
  hex tokens. The library has no `--aurora-N` tokens; speedtest
  defines them locally. Cross-consumer drift candidate (see *Union
  candidates* — a vendored `auroraPresets.speedtest`).
- **Aurora `--ease-apple-spring`** is consumed by the blob's
  `idle-bob` keyframe (blob.vue:697–700) and the BouncyToggle press
  spring (BouncyToggle.vue:119 — *literal* `cubic-bezier(0.175,0.885,
  0.32,1.275)` because Web Animations API can't read tokens). The
  fallback site is documented; not drift.

### 2. Utility and `@apply` hygiene

- **AuroraConfigDock layer body** uses raw `flex-1 min-h-0
  overflow-y-auto` on a div without applying `.scroll-fade-y` or
  `.scrollbar-hidden` — the canonical scroll-mask fade pair from
  `utilities.css:137`. The configurator overflows on tall layers
  (PaletteLayer with 4–8 stops) but shows the bare browser scrollbar.
- **PresetPickerRow** (`PresetPickerRow.vue:37`) correctly uses
  `scrollbar-thin scroll-fade-mask` — the *better* idiom. The
  configurator dock should mirror this.
- **`bg-background/20` on the aside** is ad-hoc; no glass tier ladder
  is consumed even though the aside is a translucent overlay over the
  aurora canvas. Should be `glass-subtle` (DESIGN.md:43–47 ladder) or
  flagged as a *new* "configurator-pane" tier (see *Glass-ui gaps*).
- **Aurora `text-mono-caption uppercase tracking-widest`** at
  AuroraStage.vue:39 duplicates `.section-label`'s structure with an
  extra `mix-blend-difference` — semi-canonical. Acceptable as a
  cursor-overlay ornament.

### 3. Interactive consistency

- **BouncyTabs press animation** uses Web Animations API direct
  cubic-bezier literal at BouncyToggle.vue:119 — documented constraint
  (WAAPI can't read CSS variables). Acceptable.
- **AuroraStage.vue cursor-crosshair** at line 30 is bespoke; OK.
- **Configurator Reset button** (`AuroraConfigDock.vue:35–44`) uses
  `<Button variant="ghost" size="sm">` — canonical idiom.

### 4. Variant orthogonality

- **`<Aurora>` props are minimal** (`Aurora.vue:16–19`):
  `config: AuroraConfig`, `runtimeOptions?: AuroraRuntimeOptions`. All
  variation lives in `config`. Proper functional decomposition;
  authored configs in `presets.ts` are the variant axis.
- **`<Blob>` props** (`Blob.vue:14–44`): 11 props, well-orthogonal.
  `config: Partial<BlobConfig>` is the equivalent escape hatch.
- **`AuroraConfig` field count** = 30 fields in 6 axes (composition,
  warp, medium, motion, output, plus nested `flow` and `palette`
  arrays). **`BlobConfig` field count** = 25 fields. Both have the
  same shape: high-axis-count parameter pack with a
  `DEFAULT_*_CONFIG` baseline. Symmetry → the configurator chrome
  should be DRY (see C below).
- **Configurator layer split** — aurora has six layers (Medium,
  Palette, Flow, Texture, Comp, Nuclei) per `options.ts:52–60`. Blob
  has *no* layer split at all (one playground subsection in
  blob.vue:333–525). For 25 fields this is too flat; the user's
  finding 7 ("Blob section should become its own proper section with
  a configurator mirroring aurora") is the explicit ask.

### 5. Overlay and motion

- **Aurora medium animations** are managed inside the WebGL fragment
  shader; there is no DOM motion to PRM-gate other than the canvas's
  own RAF loop. `useAurora.ts:31–35,47` watches the PRM mediaquery
  and calls `setReducedMotion(flag)` on the runtime; runtime then
  freezes (one frame at t=3.7s in speedtest's `useAuroraPolicy`).
  Conformant.
- **Blob breath / orbit** runs through `useRAFLoop({
  respectReducedMotion: true })` (DESIGN.md §Library-tier commitments,
  blob-stress.vue:91). Conformant. PRM contracts visible in
  `primitives/blob.vue:561–597` (three-state accessibility section).
- **`idle-bob` 6.18s spring** (blob.vue:697) consumes
  `--ease-apple-spring` token; conformant.

### 6. Typographic and structural hierarchy

- **Aurora story header** is *missing* — `aurora.vue` does not open
  with a `<DisplayHero>` or `<CreamSurface>` chassis. It opens
  directly with `PresetPickerRow`. This is correct for a polished
  product-grade studio (the studio chassis IS the gesture); the
  *bold-maximalist* commitment from DESIGN.md §Story Fidelity Policy
  is satisfied via the live aurora canvas itself.
- **Blob story** (primitives/blob.vue) is fully bold-maximalist per
  the W4-A2 uplift (8 sections, 4 nested `<DisplayHero>`s, 3
  `<FlourishDivider>`s).

### 7. Accessibility

- **Aurora `prefers-reduced-transparency` fallback** — none. The
  WebGL canvas always renders at full alpha; consumers (speedtest)
  step the alpha down via the config's `alpha` field but the library
  does not honor `prefers-reduced-transparency: reduce` automatically.
  **Gap**: should disable aurora rendering or cap alpha when the
  media query matches (mirror the cream-surface paper-grain
  dim-to-zero pattern).
- **Aurora `prefers-contrast: more`** — not handled; the painterly
  shader inherently softens edges. Probably acceptable; flag for
  challenge.
- **Blob accessibility** — three contracts honored
  (blob.vue:561–631; PRM, reduced-transparency, contrast-more). Full
  conformance.

---

## A — Aurora configurator clip / shadow at sides

**Diagnosis (cited):**

The configurator side-shadow / side-clip the user reports is the
intersection of three independent issues, not a single rule:

1. **Layer body content exceeds the 340px aside width.**
   - `AuroraConfigDock.vue:103`: aside is `flex w-[340px] flex-shrink-0
     ... border-l border-border/60 bg-background/20`.
   - `AuroraConfigDock.vue:67`: layer scroller is
     `flex-1 min-h-0 overflow-y-auto` — **no `overflow-x` declaration**,
     so it inherits `visible`.
   - `PaletteLayer.vue:27`: `<div class="flex min-w-[320px] flex-col
     gap-2 p-3">` — explicit `min-w-[320px]` + 24px padding (`p-3`) =
     **344px**, which exceeds the aside's 340px content box. Same
     pattern in `MediumLayer.vue:40` (`min-w-[280px]` + p-3 = 304px,
     fits but tightly).
   - The layer wraps in `DockLayerGroup`, which crossfades between
     `DockLayer` children. Each layer's content forces a horizontal
     overflow that the parent does not scroll → content visually
     clips at the aside's `border-l` edge. The user reads the clip
     as a "shadow" because the aside has `bg-background/20`
     (semi-translucent) over the aurora canvas, and the aurora's
     warm/dark hue at the boundary can read as a soft edge-shadow.

2. **Tab row clipping at right edge.** Visible in the captured
   screenshot — "Nucl…" instead of "Nuclei". Source:
   - `AuroraConfigDock.vue:54–60`: BouncyTabs is wrapped in a
     `<div class="border-b border-border/40 px-3 py-2">` (no
     `overflow-x-auto` on the outer wrapper) — but BouncyTabs itself
     receives `class="overflow-x-auto scrollbar-hidden"`.
   - `BouncyToggle.vue:242–250`: root is
     `display: inline-grid; grid-auto-flow: column; grid-auto-columns:
     1fr;` — six 1fr columns must fit the parent's content box.
   - The `overflow-x-auto` is applied to the inline-grid root, but
     because each grid track is `1fr`, the grid *shrinks* its tracks
     to share available width rather than overflow. With 6 tabs and
     ~300px effective parent (340px aside − 24px x-padding), each tab
     gets ~50px and `Nuclei` is truncated by the button's own
     `padding: 0.125rem 0.625rem; white-space: nowrap` — text spills
     out of the 50px track and gets clipped by the tab row's
     `overflow-x-auto`.
   - The fix surface is at `BouncyToggle.vue:244–246`:
     `grid-auto-columns: 1fr` should become `min-content` (or
     `minmax(min-content, 1fr)`) when the tabs overflow — but that's a
     library-wide change. Cheaper: at the configurator site, override
     the tab CSS with `[grid-auto-columns:min-content]` or wrap in a
     dedicated scroll container that takes its content's intrinsic
     width.

3. **Aside has no rounded clip.** The frame
   (`aurora.vue:91–98`) is `rounded-card border border-border
   shadow-cartoon overflow-hidden`. The aside (`aurora.vue:102–104`)
   has `border-l border-border/60 bg-background/20` but no
   `rounded-r-card`. The frame's `overflow-hidden` clips the aside's
   right edge cleanly (no leak), so this is not the source of the
   "shadow" — the shadow is from (1) above (content overflow against
   the cyan aurora canvas).

**Root cause:** the configurator panel is a translucent aside over a
canvas that mutates color rapidly. Content that overflows the aside's
right edge bleeds through the `bg-background/20` haze and renders as
a smudge that the user reads as a shadow. The fix is to **clip the
aside on its right edge** (`overflow-clip` or `[clip-path:inset(0)]`)
AND make the layer body genuinely scroll horizontally when needed.
The user's finding 9 conflates "the panel has shadows / clips" — both
are present; both have distinct fixes.

---

## B — Aurora top "black padding bar"

**Diagnosis (cited):**

The user's finding 10 is somewhat ambiguous; the captured /aurora
screenshot does not show a literal black bar above the aurora canvas.
Two candidate sources:

1. **`AuroraStage.vue:38–42` cursor overlay** —
   ```html
   <div class="pointer-events-none absolute bottom-3 left-3
        text-mono-caption uppercase tracking-widest
        text-foreground/50 mix-blend-difference">drag to swirl</div>
   ```
   `mix-blend-difference` against a saturated aurora reads as a
   high-contrast inverted band; on cyan-warm aurora the result is a
   reddish-black smear that, when stacked against the panel chrome
   above, can read as a "padding bar". Visible in the captured
   screenshot at the bottom-left; not the top.

2. **`PresetPickerRow.vue:55`** —
   ```html
   <div class="aspect-[16/10] w-full overflow-hidden rounded-t-card bg-muted">
   ```
   The thumbnail card has `bg-muted` underneath the image. While
   thumbnails bake (the `usePresetThumbnails` capture-mode aurora
   draws each preset deterministically off-screen), the `bg-muted` is
   visible. In dark mode `--muted` is a near-black neutral; the user
   may have observed thumbnails *during baking* and seen a black
   strip at the top of every preset card. Once thumbnails are baked
   (`<img v-if="thumbs[key]"...>` line 56) the strip is hidden by
   `object-cover`. **This is the most likely "top black padding bar"
   candidate** — visible only during the cold-load thumbnail bake
   window.

3. **Less likely:** `aurora.vue:118` hint `<aside>` block has no
   black background; ruled out.

**Recommended verification:** open `/aurora` in dark mode, throttle
network, observe the preset row during thumbnail bake. If a 1.6:1
neutral strip is briefly visible at the top of each preset card,
candidate 2 is confirmed. Fix: replace `bg-muted` with a
content-shaped skeleton (`<Skeleton class="aspect-[16/10]
rounded-t-card" />`) or with a transparent background until the
thumbnail resolves.

---

## C — Blob configurator buildout proposal

### Aurora exposes (current configurator vocabulary)

Six layers (`AuroraConfigDock.vue:74–102` + per-layer files):

| Layer | Fields | Control idiom |
|---|---|---|
| Medium | `medium` (4), `strokeMode` (4 conditional), `strokeLayers` (2 conditional), `noiseOctaves` (3) | BouncyTabs pill |
| Palette | `palette[]` (2..8 OklchStops), each with L / C / h sliders | SortableList of OklchStopRow |
| Flow | `flow.pattern` (5), `flow.focalX/Y`, `flow.angle`, `flow.curl` | BouncyTabs + sliders |
| Texture | `strokeAmount`, `strokeScale`, `strokeAnisotropy`, `wetEdge`, `granulation`, `impasto`, `brokenColor`, `canvasGrain`, `paperGrain` | sliders |
| Comp | `softmaxBeta`, `valueVariance`, `warpAmount`, `warpScale`, `warpDrift`, `warpMode`, `breathDepth`, `breathPeriod`, `saturation`, `alpha` | sliders + warpMode pill |
| Nuclei | `nuclei[]` (1..6 attractors with x, y, radius, paletteBias, valueBias, drift) | NucleiOverlay drag + x/y NumberFields |

Plus chrome:
- Reset button at `AuroraConfigDock.vue:35–44`.
- Studio state at `useAuroraStudio.ts` — per-preset live clones,
  selectPreset, resetCurrent, cyclePreset.
- PresetPickerRow with baked thumbnails.

### Blob would need (proposed configurator vocabulary)

Mapping the 25 `BlobConfig` fields (`composables/blob/types.ts:37–97`)
into the same six-axis grammar:

| Layer | Fields | Control idiom |
|---|---|---|
| Mood | `mood` (5: idle/happy/curious/sleepy/excited) — driven via prop, not config | ToggleGroup or BouncyTabs pill |
| Body | `bodyRadius`, `satelliteCount`, `satelliteRadius`, `orbitRadius`, `eccentricity`, `smoothK` | NumberField + sliders |
| Surface | `noiseAmp`, `noiseFreq`, `noiseSpeed`, `pulseFreq`, `pulseAmp` | sliders |
| Color | `color` prop (single string), `hueRange`, `satShift`, `brightnessShift`, `colorNoiseFreq`, `colorNoiseSpeed`, `chromaticAberration` (CSS var) | OklchStopRow x1 + sliders |
| Motion | `orbitSpeedScale`, `wobbleScale`, `mergeRate`, `mergeDuration`, `absorbedDuration` (range), `emergeDuration`, `orbitDuration` (range) | sliders, range slider |
| Pointer | `pointerAttract` (prop bool), `pointerAttraction`, `pointerStrength` | switch + sliders |
| Render | `canvasSize`, `seed`, `reducedMotion`, `lazy`, `lazyMargin` | NumberField + ToggleGroup |

Plus chrome:
- Preset row: 5 mood specimens (`MOODS` table, currently inline at
  `primitives/blob.vue:46–71`) → converts cleanly to
  `BLOB_PRESETS`-style structure.
- Reset.
- Live specimen at the center of the configurator (the playground
  pane in current blob.vue:347–360 already has this — needs to be
  the *single* surface, not embedded mid-page).

### Unification proposal — `<Configurator>` primitive

A new custom-component package: `src/components/custom/configurator/`.

```vue
<Configurator
  v-model:active-layer="activeLayer"
  :preset-row="presetRow"          <!-- thumbnail buttons + meta -->
  :layers="layers"                  <!-- [{ id, label, render }] -->
  :on-reset="handler"
  :stage="StageComponent"           <!-- live specimen — Aurora or Blob -->
  :stage-config="config"
  variant="aurora|blob|generic"
  :scroll-mode="'auto'|'fade-y'|'fixed'"
/>
```

Internals: composes `BouncyTabs` + `DockLayerGroup` + a stage frame
(equivalent to `aurora.vue:91–112` minus the aurora-specific bits) +
the `Reset` ghost button + the preset row. Each consumer wires its
own preset table and per-layer `render` slots.

### What this saves

- **Aurora:** `demo/stories/aurora.vue` shrinks from 124 lines to
  ~40 (preset table + layer slot wiring). `AuroraConfigDock.vue` is
  retired (its chrome moves into `<Configurator>`); the six layer
  files stay as content slots.
- **Blob:** finding 7 ("Blob section should become its own proper
  section with a configurator") becomes a 30-minute composition.
  Blob mood gallery + spectrum + nine-grid stay as separate sections;
  the playground sub-section becomes a full-page `<Configurator>`
  story or a discrete sub-route.

### Where this lives

`src/components/custom/configurator/Configurator.vue` plus a small
composable `useConfiguratorState<T>` mirroring
`useAuroraStudio.ts:25–63` (per-preset live clones, reset, cycle).
Public surface re-exports through `src/index.ts`. The component is
*generic over the config type* — no aurora/blob coupling beyond the
stage slot.

---

## D — Speedtest aurora preset extraction

Read in full at `../speedtest/src/config/auroraConfig.ts:1–129`.
Components:

### Palette (lines 19–26)

```ts
const PALETTE: AuroraConfig["palette"] = [
    { L: 0.72, C: 0.22, h: 300 }, // --aurora-1 purple (#c084fc)
    { L: 0.74, C: 0.14, h: 245 }, // --aurora-2 blue (#60a5fa)
    { L: 0.72, C: 0.22, h: 345 }, // --aurora-3 pink (#f472b6)
    { L: 0.78, C: 0.16, h: 160 }, // --aurora-4 emerald (#34d399)
    { L: 0.84, C: 0.18, h: 85 },  // --aurora-5 amber (#fbbf24)
    { L: 0.70, C: 0.18, h: 285 }, // --aurora-6 violet (#a78bfa)
];
```

### Nuclei (lines 28–35)

Six nuclei distributed across the canvas, biases stepping uniformly
0.0 → 1.0 across the palette:

```ts
const NUCLEI: AuroraConfig["nuclei"] = [
    { x: 0.18, y: 0.22, radius: 0.55, paletteBias: 0.0, valueBias:  0.04, driftRadius: 0.020, driftPhase: 0.3 },
    { x: 0.80, y: 0.30, radius: 0.52, paletteBias: 0.2, valueBias:  0.00, driftRadius: 0.020, driftPhase: 1.7 },
    { x: 0.50, y: 0.18, radius: 0.48, paletteBias: 0.4, valueBias:  0.02, driftRadius: 0.020, driftPhase: 3.4 },
    { x: 0.72, y: 0.78, radius: 0.55, paletteBias: 0.6, valueBias: -0.02, driftRadius: 0.018, driftPhase: 0.9 },
    { x: 0.22, y: 0.82, radius: 0.50, paletteBias: 0.8, valueBias:  0.02, driftRadius: 0.022, driftPhase: 2.1 },
    { x: 0.55, y: 0.58, radius: 0.58, paletteBias: 1.0, valueBias:  0.00, driftRadius: 0.015, driftPhase: 4.6 },
];
```

### Static knobs (lines 38–66)

`softmaxBeta: 3.2`, `valueVariance: 0.08`, `warpAmount: 0.38`,
`warpScale: 1.6`, `warpDrift: 0.02`, `warpMode: "fbm"`,
`noiseOctaves: 4`, `medium: "smooth"`,
`flow: { pattern: "none", focalX: 0.5, focalY: 0.5, angle: 0, curl: 0 }`,
all stroke knobs zero, all medium knobs zero,
`canvasGrain: 0`, `nucleiDrift: 0.04`, `paletteDrift: 0.02`,
`breathDepth: 0.08`, `breathPeriod: 42`, `saturation: 0.85`,
`paperGrain: 0`.

### Alpha fork (lines 73–88)

Reactive on `useGlobalDark` × phase:
- `ALPHA_LIGHT = 0.26`
- `ALPHA_DARK  = 0.18`
- `ALPHA_LIGHT_RUNNING = 0.18` (during ping/download/upload)
- `ALPHA_DARK_RUNNING  = 0.12`

### Policy (`useAuroraPolicy.ts`)

Wraps glass-ui's `useIntersectionPause` + a PRM listener. PRM reduces
to `aurora.renderAt(3.7); pause()`; intersection-pause runtime
governs otherwise.

### Library export shape

```ts
// src/components/custom/aurora/presets/speedtest.ts
import type { AuroraConfig, OklchStop, AuroraNucleus } from "../presets";

export const SPEEDTEST_AURORA_PALETTE: OklchStop[] = [ /* 6 stops, exact L/C/h above */ ];
export const SPEEDTEST_AURORA_NUCLEI: AuroraNucleus[] = [ /* 6 nuclei, exact above */ ];

/** Static fallback — usable directly in tests / consumers without dark fork. */
export const speedtestAuroraConfig: AuroraConfig = {
    palette: SPEEDTEST_AURORA_PALETTE,
    nuclei: SPEEDTEST_AURORA_NUCLEI,
    softmaxBeta: 3.2,
    valueVariance: 0.08,
    warpAmount: 0.38,
    warpScale: 1.6,
    warpDrift: 0.02,
    warpMode: "fbm",
    noiseOctaves: 4,
    medium: "smooth",
    flow: { pattern: "none", focalX: 0.5, focalY: 0.5, angle: 0, curl: 0 },
    strokeAmount: 0,
    strokeScale: 140,
    strokeAnisotropy: 0.7,
    strokeLayers: 1,
    strokeMode: "oil",
    wetEdge: 0,
    granulation: 0,
    impasto: 0,
    brokenColor: 0,
    canvasGrain: 0,
    nucleiDrift: 0.04,
    paletteDrift: 0.02,
    breathDepth: 0.08,
    breathPeriod: 42,
    saturation: 0.85,
    paperGrain: 0,
    alpha: 0.26,  // light default; speedtest forks dark / running internally
};

/** Optional alpha fork helper for consumers that want the light/dark + idle/running fork. */
export const SPEEDTEST_AURORA_ALPHA = {
    light: { idle: 0.26, running: 0.18 },
    dark:  { idle: 0.18, running: 0.12 },
} as const;
```

Re-exported from `@mkbabb/glass-ui/aurora` and the package barrel. The
*reactive* consumer composable
(`useSpeedtestAuroraConfig`) stays in the speedtest repo because it
binds to `useSpeedtestStore.currentPhase` — that store is a
consumer-domain concept the library cannot model. But the static
`speedtestAuroraConfig` + alpha table is library-shaped and worth
shipping.

**Memory rule alignment** — `feedback_presets_in_consumer.md` says
named themed presets live in consumers. Speedtest is a *consumer*;
exporting `speedtestAuroraConfig` from the library would violate the
rule. **Re-read the rule:** "Presets in consumers — named themed
presets live in consumers; the library's *own* default tokens evolve
in `src/styles/` as the lib's identity changes." The 11 demo presets
already live in `demo/stories/aurora/presets.ts`, not in
`src/components/custom/aurora/presets.ts`. The user's finding 11
("Speedtest aurora preset — add as a preset") is consistent with
adding it to the **demo** preset table, not the library exports.

**Revised proposal:** add `SPEEDTEST` to
`demo/stories/aurora/presets.ts`'s `PRESETS` table — as the 12th
preset (label "Speedtest", sub "smooth · 6 nuclei · 6-hue", medium
"smooth"). Authored verbatim from the speedtest source. The
`SPEEDTEST_AURORA_ALPHA` fork stays in the speedtest repo. This
honors the memory rule and still gives the user a visible reference
preset in the studio.

---

## E — Configurator scroll-wrap proposal

The user's finding 8 ("Aurora configurator needs proper scroll-
wrapping within docks/tabs headers") and finding 9 (side clips) point
to the same axis: the configurator chrome should know how to scroll.

**Three modes in the unified `<Configurator>` primitive:**

1. **`scroll="fade-y"`** — wraps each layer body in
   `[overflow-y-auto] .scroll-fade-y .scrollbar-hidden`. Default for
   inline (in-page) configurators.
2. **`scroll="fade-x"`** — for *tab row* overflow specifically.
   Wraps the BouncyTabs in a `[overflow-x-auto] .scroll-fade-mask
   .scrollbar-hidden` with `[grid-auto-columns:min-content]` applied
   to the tabs to prevent the 1fr-shrink behavior diagnosed in (A).
3. **`scroll="fixed"`** — height clamp via the `max-h` token from
   J.R1's proposal; content scrolls inside a fixed-height shell.

Tab-row scroll-wrapping is the harder of the three because it
requires either (a) overriding BouncyToggle's grid layout from
outside (slot-class prop, currently absent) or (b) making
BouncyToggle natively support an `overflow="scroll"` prop that
swaps `grid-auto-columns: 1fr` → `min-content`. The latter is a
glass-ui change with broader leverage.

This finding folds into J.R1's proposal: a canonical `.scroll-fade-y
.scrollbar-hidden` wrapper at the dock/configurator/popover layer,
keyed by content size and a max-w/h token.

---

## F — Configurator-pattern union (glass-ui gap)

**Pattern repeated:**

- Aurora studio (`demo/stories/aurora.vue` + `aurora/AuroraConfigDock.vue`).
- Blob playground (`primitives/blob.vue:333–525`, *partial* — no
  layer split).
- Slider-glass-track story has a similar config panel
  (`demo/stories/primitives/slider-glass-track.vue` per
  J/findings.md:26 — needs separate audit).
- Number Field story (per J/findings.md:25).
- Speedtest (consumer) does not currently have a configurator
  surface, but the speedtest dashboard has a debug panel that fits
  this shape.

**Proposed primitive** —
`src/components/custom/configurator/Configurator.vue`:

```ts
export interface ConfiguratorLayer<T> {
  id: string;
  label: string;
  /** vNode/slot rendering the per-layer controls; receives the live config. */
  render: (config: T) => VNode;
}

export interface ConfiguratorPreset<T> {
  key: string;
  label: string;
  sub?: string;
  thumb?: string; // baked or live
  config: T;
}

export interface ConfiguratorProps<T> {
  layers: ConfiguratorLayer<T>[];
  presets?: ConfiguratorPreset<T>[];
  modelValue: T;                   // the live config
  initialPreset?: string;
  scrollMode?: "fade-y" | "fade-x" | "fixed" | "none";
  variant?: "inline" | "fullscreen-capable";
  // events: update:modelValue, reset, preset-select
}
```

Plus `useConfiguratorState<T>(presets, initial)` composable
(modeled on `useAuroraStudio.ts:25–63`). Plus a slot for the live
**stage** (specimen viewport).

**Where it sits in the design axis**: design-language axis (CLAUDE.md
:205+). Sibling to `<DisplayHero>`, `<FlourishDivider>`,
`<CreamSurface>` — chrome for editorial-maximalist demo and tool
surfaces.

---

## Glass-ui gaps surfaced

| # | Gap | Sites | Proposed placement |
|---|---|---|---|
| G1 | `<Configurator>` primitive (preset row + layer-tabbed dock + reset + stage slot) | aurora studio (1), blob playground (1), slider-glass-track config (1), other primitives playgrounds (per J findings 12–14) | `src/components/custom/configurator/` — new package |
| G2 | `useConfiguratorState<T>` composable (per-preset clones, select, reset, cycle) | same three sites | `src/composables/configurator/` |
| G3 | `BouncyToggle` `overflow="scroll"` prop (or `[grid-auto-columns]` slot-class) — fixes the tab-row clip | aurora configurator (1), any tab row narrower than its content | `src/components/custom/tabs/BouncyToggle.vue` — new prop |
| G4 | Aurora `prefers-reduced-transparency` honor — pause runtime + pin to last frame at clamped alpha | speedtest already wires PRM via consumer composable; library-side PRT is missing | `src/components/custom/aurora/composables/runtime.ts` + `useAurora.ts` |
| G5 | `.pastel-wash-{warm,cool,rainbow}` utilities — three-radial gradient backgrounds | aurora.vue:84–88, blob.vue:215–222, primitives/* uplift heroes (G/H/I lineage) | `src/styles/utilities.css` (or a new `washes.css`) |
| G6 | Substrate ladder: aurora as a fourth substrate tier, alongside paper / cream / glass | speedtest (1) and any consumer wanting full-bleed painterly background | `DESIGN.md` §Substrate Hierarchy + `src/components/custom/aurora` doc cross-link |
| G7 | Speedtest aurora preset entry in the demo studio | demo/stories/aurora/presets.ts: 11 → 12 entries | `demo/stories/aurora/presets.ts` |
| G8 | Skeleton thumbnail in `PresetPickerRow` while baking — replace `bg-muted` strip | `demo/stories/aurora/PresetPickerRow.vue:55` | demo-only |

---

## Union candidates

| Pattern | Aurora form | Blob form | Canonical (proposed) |
|---|---|---|---|
| **Configurator chrome** | `aurora/AuroraConfigDock.vue` + `useAuroraStudio.ts` | `primitives/blob.vue:347–525` (inline, no layer split) | `<Configurator>` + `useConfiguratorState<T>` (G1, G2) |
| **Preset table shape** | `demo/stories/aurora/presets.ts` `PRESET_KEYS / PRESET_META` | `primitives/blob.vue:45–71` `MOODS` (5) | `interface Preset<T> { key, label, sub?, thumb?, config: T }` consumed by `<Configurator>` |
| **PRM gating** | `useAurora.ts:31–35,47` mediaquery + `setReducedMotion(flag)` on runtime | `useRAFLoop({ respectReducedMotion: true })` | Existing — keep both; document as paired idiom in DESIGN.md §Library-tier commitments |
| **Pause-on-offscreen** | speedtest `useAuroraPolicy.ts` wraps `useIntersectionPause` | blob lazy-mount via IntersectionObserver in `Blob.vue:135–155` | `useIntersectionPause` is the canonical; blob's lazy-mount is a *different* axis (defer-mount vs pause-running). Both correct. |
| **Pastel three-radial wash** | `aurora.vue:84–88` (red/blue/yellow) | `blob.vue:215–222` (yellow/violet/blue) | `.pastel-wash-{warm,cool,rainbow}` utility (G5) |
| **Translucent overlay panel over canvas** | `bg-background/20` on aside | (n/a in blob; would emerge if blob configurator overlays the specimen) | New "configurator-pane" tier in glass.css OR explicit `glass-subtle` consumption |

---

## Proposed J wave shape (recommendation)

**J.W-aurora-blob** — 4 lanes, parallel, ≤ 5 agents:

- **J.W-aurora-blob.A1: `<Configurator>` primitive** (1 agent).
  Build `src/components/custom/configurator/Configurator.vue` +
  `useConfiguratorState<T>` composable. Refactor `aurora.vue` and
  `aurora/AuroraConfigDock.vue` to consume. Net: AuroraConfigDock
  retires; aurora.vue ≤ 50 lines.
- **J.W-aurora-blob.A2: Blob configurator + bold-maximalist
  blob/primitives split** (1 agent). Lift the blob playground out of
  `primitives/blob.vue` into a dedicated `<Configurator>` story
  (e.g. `demo/stories/primitives/blob-configurator.vue` or
  `compositions/blob-studio.vue`). 7-axis layer split per (C). Blob
  story keeps mood gallery / spectrum / nine-grid / accessibility
  sections only.
- **J.W-aurora-blob.A3: aurora clip / shadow / black-bar fixes**
  (1 agent). Add `overflow-clip` (or `overflow-hidden`) to
  configurator aside; declare `overflow-x: auto` (or `clip`) on the
  layer body to stop content bleed; replace `PresetPickerRow.vue:55`
  `bg-muted` strip with skeleton or transparent; add
  `prefers-reduced-transparency: reduce` honor in `runtime.ts` /
  `useAurora.ts` (G4). Tab-row clip fix lands in this lane via
  BouncyToggle prop addition (G3).
- **J.W-aurora-blob.A4: speedtest preset entry + pastel-wash
  utility** (1 agent). Add 12th `SPEEDTEST` preset to
  `demo/stories/aurora/presets.ts` with verbatim values from (D).
  Land `.pastel-wash-{warm,cool,rainbow}` utilities (G5);
  retrofit aurora.vue + blob.vue + primitive uplift heroes to
  consume. Substrate-with-consumer satisfied: every utility added
  has ≥ 2 consumer call sites in the same wave.

Hard gates: `npm run build` green; `npm run typecheck` green;
Playwright probe of `/aurora` + `/primitives/blob-configurator` (or
new compositions blob route) confirms no overflow clip, tab row
fits without truncation, top "black bar" gone in dark mode +
throttled bake.

Brittleness window: not required; lanes are disjoint.

---

## Closing tally

8 glass-ui gaps · 6 union candidates · 4 wave lanes · 1 substrate
tier (aurora) seeking explicit DESIGN.md placement · 1 memory-rule
checkpoint resolved (speedtest preset belongs in *demo* presets
table, not library exports).
