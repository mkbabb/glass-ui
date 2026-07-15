# GlassDock — the floating glass control surface

The dock is glass-ui's most-consumed custom primitive (composed across the demo,
slides, keyframes, and fourier). It is a collapsible glass pill that rests as a
compact summary and expands to its full control set on hover, focus, or tap — the
iOS Now-Playing mini-bar register, on a warm-cream-glass plate with the NCSU-red
accent. This README is the SOURCE OF TRUTH for the dock's animation language, its
layering discipline, its API, and its naming convention — so a consumer reaches
for the right surface and does not re-invent a name or a motion.

All dock surfaces reach consumers via `@mkbabb/glass-ui/dock`.

---

## The animation language

The dock's motion is a single design idea: **one interruptible spring drives every
axis of a state change, and the whole transition reads as one coordinated, redirectable
motion.** The model is Apple's damped-harmonic-oscillator control language, transplanted
onto the `SpringProgress` solver from `@mkbabb/keyframes.js`.

### The spring, in two knobs

Apple's whole control language is one ODE — a mass on a spring with damping —
exposed through two designer knobs: `response` (how fast it reaches target, a
*perceptual* duration) and `dampingFraction` ζ (how the oscillation decays). The
physics mapping (WWDC18, *Designing Fluid Interfaces*):

```
stiffness = (2π / response)²
damping   = 4π × ζ / response
overshoot = exp(−ζπ / √(1 − ζ²))      // ζ=1 → 0% (critical), ζ≈0.5 → ~16–18%
```

WWDC23 re-parameterized the same ODE as `duration` + `bounce`: `bounce ~0.15`
small/brisk, `~0.30` noticeably playful, `> 0.40` avoid for UI. The dock spring
(`DOCK_SPRING` in `composables/dockMorphContext.ts` — the canonical authority that
drives every shipped `<GlassDock>` morph; mirrored to the `--spring-dock` `linear()`
token via `scripts/regen-spring-tokens.mjs`) targets
the iOS **control band** — `response` in the 0.15–0.35 range with ζ tuned for a
~15–20% overshoot. A control that opens and closes constantly should feel
*instant*, not lush; the response is what makes that felt.

> Sources: [Apple — `spring(response:dampingFraction:blendDuration:)`](https://developer.apple.com/documentation/swiftui/animation/spring(response:dampingfraction:blenduration:)),
> [Animate with springs — WWDC23 session 10158](https://developer.apple.com/videos/play/wwdc2023/10158/),
> [Building Fluid Interfaces (WWDC18 notes)](https://www.breakfreegraphics.com/design-blog/building-fluid-interfaces/) — accessed 2026-06-06.

### Springs are responsive because of their shape, not their bounce

A duration-based ease (`ease-in-out`) ramps *up* — it feels delayed. A spring
**jumps then settles**: it starts incredibly quickly and spends most of its time
gradually approaching the final state, so it reads as instant. This is the core
"not laggy" lever, independent of any overshoot. The dock never uses a fixed-duration
ease for a state change.

### Interruptibility is the headline property

Fluid interfaces are *responsive, interruptible, and redirectable*. When a spring
is retargeted mid-flight it **carries its current velocity into the new solution**
— the dock's `useLayerTransition` re-seats the live `SpringProgress` from its
current `(value, velocity)` on an interrupted swap rather than dispose+reconstruct
from rest. A dock that snaps from rest on a rapid re-toggle is the non-iOS tell;
the dock carries velocity through.

### One clock for size, opacity, and the rail

The container size, the pane crossfade, and the travelling rail indicator are
driven from **one spring's progress**, not three timing declarations that merely
share a duration token. A continuous analytic ODE (the JS spring) and a 48-stop
`linear()` sample (a CSS transition) are not the same timeline through an
interruption — so on the JS-driven path the opacity rides the spring's normalized
progress, and the rail indicator shares the spring's curve. Size, fade, and
indicator settle together by construction.

### One driver per concern

The size morph has exactly ONE authority: a single `--dock-morph-t` spring scalar
(0 → 1, driven by `SpringProgress`). The container inline-size is a pure `calc()`
read of that scalar (`inline-size = calc(from + (to − from) × var(--dock-morph-t))`),
the entering-child reveal stagger rides the SAME scalar, and an interruption
velocity-retargets the one spring in pixel space. There is no second clock.

- **The morph**: the `--dock-morph-t` scalar drives container size + child reveal in
  lockstep; FLIP pins the from/to box, the scalar runs the spring between them.
- **Reduced-motion**: a synchronous state swap — no measure/pin/animate, the state
  change completes instantly.

A CSS `interpolate-size`/`calc-size()` second-driver was retired (it raced the spring
over the same property and froze the dock). The native View-Transitions size-morph path
was likewise retired root-and-branch (the `::view-transition-group(.gl-dock-layer)` group
+ its typed-curve fork are deleted, recorded in `view-transition.css`); the dock
collapse↔expand now morphs off the ONE `--dock-morph-t` spring scalar on every engine.

### Directional intent

Expand and collapse carry distinct character through the one spring — the entering-child
reveal stagger front-loads on expand and reverses on collapse, both phase-shifted on the
SAME `--dock-morph-t` clock, so a snappier exit and a softer entry read without forking
the driver.

### Reduced-motion is binding

Auto-running, non-user-initiated motion honors `prefers-reduced-motion: reduce`:
the bounce and the item-stagger are suppressed, but the state change still
completes instantly. Bounce belongs on user-initiated changes (tap, expand), never
on ambient idle motion (the NN/g Liquid-Glass over-animation critique). The press
squish and the item cascade collapse to a snap under PRM. (The `overflow="wrap"`
row reflow is intrinsic flex — content wraps to N rows on the over-cap crossing
with no spring; only the radius + shadow card-tier lift rides the dock morph
scalar, suppressed with the rest of the morph under PRM.)

> Sources: [Motion — layout animations](https://motion.dev/docs/react-layout-animations),
> [Motion — performance tier list](https://motion.dev/magazine/web-animation-performance-tier-list),
> [NN/g — Liquid Glass](https://www.nngroup.com/articles/liquid-glass/) — accessed 2026-06-06.
> The lane's authoritative research artefact is the dock-facilities corpus
> (`docs/tranches/AX/research/dock-facilities-corpus.json` + `dock-liquidglass-README.md`).

---

## The layering discipline (no glass on glass)

Apple's Liquid Glass guidance: *glass is best reserved for the navigation layer
that floats above the content* — there is no glass-on-glass. The z-index registry
(`tokens.css` §3 `--z-*`) encodes three bands:

| Band | z-index range | Glass? |
|---|---|---|
| **content** | `--z-background` … `--z-content` | NO — the page substrate. |
| **navigation** | `--z-controls` … `--z-dock` / `--z-panel` | YES — the glass band (the dock, floating panels, chrome). |
| **overlay** | `--z-overlay` … `--z-modal` | YES — the glass band (dialog / sheet over content). |

The rule: **a glass surface nested INSIDE another glass surface is a discipline
violation** — the blurs stack and muddy, the rims double, the read collapses. The
dock IS the navigation band; controls inside it (`DockIconButton`,
`DockTabButton`) are flat tiers (`--card` / `--muted` fills) over the dock's single
glass plate, NOT nested `.glass-*` surfaces.

### The material ↔ spring duality

The iOS-26 Liquid Glass read is ONE behaviour with a MATERIAL half and a SPRING
half — the lens and the spring are the same surface coming alive on touch. The
material half (the rim, the pointer-tracked specular catch-light, the per-rung
saturation) is owned by the glass token folds (`glass.css` / `tokens.css` /
`glass-specular-track.css`). The spring half (the momentum-gated press squish
toward `--scale-press-dock`, the hover lift toward `--scale-hover-dock`) is owned
by the dock-motion arm above. A dock control under a pointer paints a catch-light
that tracks the cursor (material) AND squishes toward its press scale on tap
(spring) — one behaviour, two arms.

---

## Use cases

The dock fits a floating, mostly-idle control surface that expands on demand:

- **App chrome / global navigation** — a persistent shell dock (a deck's
  home·count·gear pill, an app's nav rail).
- **Media / playback transport** — play·pause·scrub·speed controls over a timeline.
- **Canvas / editor toolbars** — a tool strip over a drawing, WebGL, or map surface.
- **Tool / action palettes** — a floating set of mode toggles that mutate one
  surface.
- **Multi-pane switchers** — `DockLayerGroup` + `DockLayer` for a Figma-style
  layered control column with a switcher rail.

Reach for `<Tabs>` (not the dock) for mutually-exclusive PANEL navigation, and for
`<ToggleGroup>` for independent toggles over one surface — the dock is a *container*
for those controls, not a replacement for their semantics.

---

## API

### `<GlassDock>`

The base: the default slot (the expanded control set) + the `#collapsed` slot (the
resting summary). The two stack on a 1/1 CSS grid and crossfade with a FLIP-driven
width morph.

| Prop | Type | Default | Role |
|---|---|---|---|
| `collapseDelay` | `number` | `2000` | Idle ms before auto-collapse. |
| `startCollapsed` | `boolean` | `true` | Mount collapsed (summary shown). Applies on BOTH orientations. |
| `fitContent` | `boolean` | `false` | Size to content rather than the cap. |
| `position` | `"fixed" \| "inline" \| "sticky"` | `"inline"` | Page anchoring. |
| `alwaysExpanded` | `boolean` | `false` | Never collapse — the single opt-out of the collapse machinery (no longer forced for vertical; a vertical dock collapses its `height` by default). |
| `shape` | `"pill" \| "rounded" \| "card"` | `"pill"` | Corner treatment (`card` is the big-dock squircle, paired with `layout="grid"`). Paints on both orientations. |
| `layout` | `"linear" \| "grid"` | `"linear"` | Child layout. `layout="grid"` is the big-dock multi-row grid and HARD-CONTRACTS `alwaysExpanded` (a grid dock cannot collapse). |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | The SINGLE layout axis; horizontal animates `width`, vertical animates `height`. AZ.W-DOCK-TAXONOMY retired the `variant` discriminant — "vertical" is `orientation="vertical"`, the only way to express it. |
| `density` | `"compact" \| "comfortable" \| "spacious" \| "audacious"` | `"comfortable"` | Padding / gap / control sizing. |
| `overflow` | `"grow" \| "wrap"` | `"grow"` | Over-cap strategy — grow visibly or wrap to multiple rows. The `"scroll"` opt-in is RETIRED (BG.W-DOCK-CAP-SCROLL-FADE): a capped axis is INTRINSICALLY a scroll axis (horizontal caps ⇒ `.dock-scroll-x` inline scroll; vertical caps ⇒ the unconditional block-axis scroll), no prop needed. |
| `containerName` | `string` | — | Establish a named inline-size container-query subject (orthogonal to `overflow`). |

Slots: default (expanded), `#collapsed` (summary). Exposed via `defineExpose`:
`expanded`, `isPinned`, `isHeld`, `isTransitioning`, `expand()`, `collapse()`,
`keepOpen()`, `release()`.

### Multi-layer

```vue
<GlassDock orientation="vertical">
  <DockLayerGroup v-model:active="tab" orientation="vertical">
    <DockLayer id="assets" label="Assets" :icon="Package">…</DockLayer>
    <DockLayer id="layers" label="Layers" :icon="Layers">…</DockLayer>
  </DockLayerGroup>
</GlassDock>
```

`DockLayerGroup` props: `orientation`, `showRail` (default `true`, hidden at ≤1
layer), `railPosition` (`"start" | "end"`). Each `DockLayer` registers itself via
`provide`/`inject`; the group renders the switcher rail (a reka `TabsIndicator`
that travels on the layer-morph spring curve) and drives the crossfade + size FLIP.
Only the active layer is interactive (inactive layers receive `inert` +
`pointer-events: none`).

### Control family

`DockIconButton`, `DockTabButton`, `DockSelectTrigger`, `DockDropdownTrigger`,
`DockBackgroundToggle`. All flat tiers over the dock's single glass plate.

`DockTabButton` is KEPT — it has real consumers (StoryPager, instrument-chassis),
so it is not a 0-consumer orphan to retire.

### Composables (do not re-invent)

ONE canonical name per dock composable:

- `useDockState` — the collapse / idle-timer / keep-open state machine.
- `useLayerTransition` — the axis-aware FLIP crossfade between layer panes (the
  one-spring, one-clock driver above). Reusable at any nesting level — the
  GlassDock outer `summary`↔`full` pair AND the inner `DockLayerGroup` pair both
  compose it.
- `useDockContext` / `useOptionalDockContext` — the dock provide/inject seam.
- `useDockLayerGroupContext` / `useOptionalDockLayerGroupContext` — the layer-group
  seam.

`useTouchGate` is NOT a dock composable — it is a general `composables/dom`
tap-to-activate guard the dock and the Slider both consume; do not rename it.

### The `<Role>Dock` naming convention

There is **no `<Role>Dock` component** in glass-ui — the base IS `GlassDock` +
`DockIconButton` + `#collapsed`. When a consumer composes the base into a named
instance (a local wrapper / rename), pick the role so the constellation speaks ONE
dock vocabulary:

| Role | Use it for |
|---|---|
| **ChromeDock** | App chrome / global navigation. |
| **TransportDock** | Media / playback transport over a timeline. |
| **CanvasDock** | A canvas / editor toolbar. |
| **ToolDock** | A floating tool / action palette. |

These are CONSUMER-SIDE names; glass-ui ships only the base. A role-typed dock
component is a NET-NEW contract — BOOK until a 2nd consumer appears (the
substrate-with-consumer precept).

---

## Best practices

1. **Import from the flat subpath** (`@mkbabb/glass-ui/dock`), not the root barrel,
   for a minimal payload — the dock chunk tree-shakes independently.
2. **Keep glass in the navigation/overlay band only.** Inside the dock, compose
   flat tiers (`--card` / `--muted`), never a nested `.glass-*` plate.
3. **Wire `:aria-expanded` to the TRIGGER, not the dock root.** The
   `<div class="glass-dock">` root is presentational (no ARIA role); `aria-expanded`
   on a role-less element trips axe's `aria-allowed-attr`. Bind it on the
   interactive control that opens the dock, reading the exposed `expanded` state.
4. **Provide a pause control for continuous backgrounds.** A dock over an
   auto-running Aurora/GooBlob background carries a `DockBackgroundToggle` (WCAG
   2.2.2 Level-A) — available to ALL users, not gated behind `prefers-reduced-motion`.
5. **Retune motion via tokens, never by editing source.** The dock spring is the
   `--spring-dock` token; a retune touches BOTH `DOCK_SPRING` (the canonical
   `dockMorphContext.ts` const) and the `regen-spring-tokens.mjs` PRESETS row, then
   re-runs the generator (`proof:spring-tokens-synced` enforces no drift).
6. **For multi-row controls, use `overflow="wrap"`** — the dock shrink-wraps to
   content and caps its inline size at `max-inline-size: var(--dock-max-inline-size)`,
   and the row reflows to N rows by INTRINSIC flex-wrap on the over-cap crossing (at
   any viewport width, no breakpoint). The wrapped multi-row silhouette lifts onto
   the card/floating shadow
   tier as the dock expands (the radius + shadow ride the dock morph scalar in
   lockstep). Horizontal-only.
7. **Vertical docks are tool palettes** — they are `alwaysExpanded`, render a single
   slot (no summary), and animate `height`. Set `orientation="vertical"`; no other
   consumer change is required.

---

## The nav-pattern, the collapsed-floor + the selected register

A **NAV-flavored** dock composes ONE `<GlassDock>` root with a consistent nav-pattern:
a home/brand control in the leading **`#persistent`** slot (**home-left**), the nav
items, and `<DockSeparator>` dividers between groups — zero raw-class separators, zero
hand-rolled home chrome.

Three load-bearing token registers:

- **The collapsed-floor is a PERFECT CIRCLE.** `--dock-collapsed-summary-min-size`
  (`calc(--dock-layer-height * 0.85)`, a tight proportioned circle below the full
  control height) + `--dock-collapsed-padding` (`calc(0.25rem * var(--dock-scale))`, a
  tighter pad floor) — BOTH ride the `--dock-scale` coarse-pointer thread. The collapsed
  `.dock-layer--summary` lifts the height-lock (`aspect-ratio: 1`) so the pill is a 1:1
  circle, not an oval.
- **The glass-first, de-red'd iOS selected register.** `--dock-control-active-bg` is a
  `--glass-bg-*` glass tier (`var(--glass-bg-floating)`, a tier ABOVE the hover
  `var(--glass-bg-resting)`) reading the dock substrate through it — the "selected reads
  as glass" model, NOT a flat `--surface-tint-N` overlay and NEVER a saturated brand-red
  fill; the selected glyph stays warm-ink `--foreground`.
- **The `mode="facets"` facet carousel** (`<DockStack mode="facets">`, BE.W-DOCK-RAIL-REALIZE)
  renders the members as a CONTEXT CAROUSEL of accent-tinted facet chips (each writes its
  own `--glass-accent` context hue), the active facet lifting onto the
  `--dock-control-active-bg` glass tier — a RENDER MODE on the ONE `<DockStack>`, box-INVIOLATE,
  fanning on the SAME `--spring-dock` clock. Locked by `proof:dock-rail-realize`.

---

## Gates (the falsifiable contract)

| Gate | Asserts |
| `proof:dock-spine` | The greenfield three-z-layer spine (FAM-3 terminal cure): `.glass-dock`'s triple identity (glass surface + morph clip aperture + item container) is SPLIT into L0 `.dock-plate` (backdrop-filter + surface + rim + grain, visible extent morphed via `clip-path` off `--dock-t`), L1 `.dock-controls` (`display:contents`, `overflow:visible`), and the structural box — so no named clip/morph defect is representable. |
| `proof:dock-controls` | The ONE headless selection engine + ONE indicator writer + the folded control face: the dock IS SegmentedTabs/ToggleGroup wearing chrome, so its control run collapses to `<DockControl>` (icon/tab `shape`) + `<DockTrigger>` (select/dropdown/popover `for`), each auto-arming the tier-root `v-specular` gleam. |
| `proof:dock-fold` | The G10 retirement-census + consumer-fold: the five legacy dock control/trigger SFCs, the reka `ui/tabs` substrate, and the demo-only `useDockItemDrag` retire onto the minted survivors, every consumer re-pointed (no dual path, no alias). |
| `proof:dock-retire-terminal` | The decided-terminal excision: every §2.8 retirement (the fission facility, the divider-carousel rail, the second clocks) evaporates CLEAN with its defect class the moment its successor lands — verified zero-binary-consumer by the constellation grep + registry probe. |
| `proof:dock-crossfade` | `DockLayerGroup`/`DockLayer`/`useLayerTransition` FOLD to ONE `<DockCrossfade>` slot: a layer switch is a two-child OPACITY OVERLAP on the per-face `--dock-t` scalar (the ONE `useDockSpring`, velocity-continuous), not a View Transition. |
| `proof:dock-escape` | The top-layer popover ESCAPE (UF-C2 rail-overlap cure): the rail/fan/menu/search surfaces are native top-layer `popover` elements (spec-exempt from ancestor clip/contain/transform), so the hand-rolled `.glass-dock-frame` `display:contents` escape is gone. |
| `proof:dock-overflow` | Native-scroll + fisheye-iff-fits (UF-C8): a scrolled dock calls `scrollIntoView` on activation, the cross axis is genuinely un-clipped, and the fisheye engages only when the content fits. |
| `proof:dock-single-engine` | The MECHANISM (never a spring VALUE): the dock morph clock is ONE `SpringProgress` on ONE scalar via `useDockSpring`, the deformation scalar-zoo is excised, the arrival-cut removed; the dock `(response, ζ)` stays USER-SETTABLE. |
| `proof:dock-progress-rim` | The dock-rim scroll progress is rainbow, thinner, rounded (UF-D1) — the chunky flat gray band retired onto the brand-spectrum rounded rim. |
| `proof:dock-luma-share` | The 12 per-dock `useGlassBackdropLuminance` observers collapse to ONE shared observer per ROUTE: the luminance signal is a per-route property of the shared DockStage backdrop, not a per-dock one (PERF-6 / FAM-5). |
| `proof:dock-gate-roster` | The dock META-ROSTER (FAM-11 cure): the accreted 46-script + monolith gate fleet is culled to the falsifiable close set, so no wave re-greens only its own family while later waves regress earlier greens. |
| `proof:dock-a11y-contract` | The switcher-rail + selection-group ARIA roles (role-per-mode radio/tab/pressed). |
| `proof:offscreen-pause` | The dock's motion honors the WebGL-substrate park (offscreen/hidden/PRM). |
| `proof:spring-tokens-synced` | `--spring-dock` equals the generator output AND the JS `DOCK_SPRING` (`springPreset("dock")`) carries the measured-iOS `(response, ζ)` — the JS driver + the CSS token cannot drift. |
