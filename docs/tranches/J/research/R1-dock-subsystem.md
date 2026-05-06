# J.R1 — Dock subsystem deep audit

## Preamble

- **Scope**: every `.vue`, `.ts`, `.css` artefact under `src/components/custom/dock/`, `src/components/custom/dock-group/`, plus the dock-related slices of `src/styles/{dock.css,glass.css,tokens.css,transitions.css,animations.css,utilities.css}`. The `<Slider>` / dock keep-open consumer at `src/components/ui/slider/Slider.vue` and the canonical demo hosts (`demo/layout/{CategoryRail,StoryPager,AppShell}.vue` + `demo/stories/navigation/{dock,dock-layers,rail}.vue` + `demo/stories/primitives/{slider,slider-glass-track,dock-group}.vue`).
- **Glass-ui revision**: HEAD `c5f196c` (post-I close, branch `o-w2_7-instrument-chassis`).
- **Dev server probed**: `http://localhost:5174/primitives/slider` (and via redirect `/primitives/number-field`). Routing in DEV redirects raw `/navigation/dock` URLs back to the slider page so direct probe of the navigation/dock story was unavailable in this run; source-level diagnosis covers that ground.
- **Six in-scope J findings**: docks-overflow-scroll (1), top-dock-collapsed-state-animation (2 — cornerstone), dock-blur-reduce (3), slider-drag-keeps-dock (4 — refine), vertical-rail-overflow + dev-text (5), DockPopover-as-special-component (6).

## Findings by axis

The seven canonical axes from `docs/audits/style-audit.md` applied to the dock subsystem.

### 1. Token alignment

The dock substrate generally references its own semantic tokens (`--glass-bg-dock`, `--glass-border-dock`, `--glass-blur-dock`, `--shadow-dock`, `--shadow-dock-collapsed`, `--radius-dock`, `--z-dock`, `--scale-hover-dock`, `--scale-press-dock`, `--dock-control-size`, `--dock-layer-height`, `--dock-h`, `--dock-padding-*`, `--dock-tab-padding-*`, `--dock-density-*`, `--dock-popover-*`). Drift is narrow but real:

- `src/styles/dock.css:670-672` — `inset 0 0.5px 0 0 rgb(255 255 255 / 0.06), 0 0.5px 0 0 rgb(0 0 0 / 0.04)` and `:702` — `color: hsl(0 0% 100% / 0.7)`. These are raw `rgb`/`hsl` literals with white-bias hard-coded; canon recipe is `color-mix(in srgb, var(--foreground) N%, transparent)` (or a `--shadow-color` channel). The same trio recurs at `:760-762` (secondary tier) and `:769-770`.
- `src/styles/dock.css:701` — `font-size: 0.75rem` on the `data-tier="primary"` sparkle pseudo-element. Should compose `--type-micro` or `--type-caption`.
- `src/styles/dock.css:346` — rail tab `font-size: 0.75rem`. Same drift, same fix.
- `src/styles/dock.css:683-689` — `radial-gradient(ellipse at 30% 30%, color-mix(in srgb, var(--phase-color, var(--foreground)) 18%, transparent), transparent 70%)` and the `.dock-tab-button[data-tier="primary"][data-phase]` `::before` halo at `:723-727`. Repeated literal — extract to `--dock-tab-primary-phase-halo` if there's a second consumer; single-site for now is fine.
- `src/styles/dock.css:670-672, 760-762` — `var(--glass-highlight)` is referenced inside the composed shadow stack alongside raw `rgb(255 255 255 / N)` micro-bevels. The micro-bevel literal duplicates `--glass-highlight`'s shape; should be a `--glass-microbevel-light` / `--glass-microbevel-dark` pair (or fold into `--glass-highlight` directly).
- `src/components/ui/slider/Slider.vue:99,104,109,112-114` — uses CSS custom-property fallbacks like `var(--slider-thumb-size, 0.875rem)`, `var(--slider-thumb-bg, var(--foreground))`. The fallbacks are reasonable but `0.375rem`, `0.875rem`, `1rem`, `1.5rem`, `0.75rem`, `0.25rem` literals (lines 97, 109, 130, 139, 148-149, 161, 171, 179, 189-190) duplicate the radius / sizing token grid. None of these hard-codes block the audit because they're scoped to `<Slider>` slot tokens — but that's the *slider* drift in this file, surfaced incidentally.

### 2. Utility & `@apply` hygiene

- `.dock-separator`, `.dock-spacer`, `.dock-icon-button`, `.dock-tab-button`, `.dock-select-trigger`, `.dock-dropdown-trigger`, `.dock-popover`, `.dock-layer-*`, `.dock-layer-rail`, `.dock-layer-item-host`, `.dock-layer-stack`, `.dock-layer-tab`, `.glass-dock` — canonical, all live in `src/styles/dock.css`. No reinvention.
- **Missing** `.dock-label` despite the canonical-utility list naming it — no `.dock-label` selector exists in `src/styles/dock.css`. Consumers stamp ad-hoc `text-mono-caption` / `text-admin-label` / inline classes on dock-internal labels (e.g. `demo/stories/navigation/dock.vue:102` `class="px-2 text-xs text-muted-foreground tabular-nums max-w-36 truncate"`). Either add `.dock-label` or strike it from the canonical list.
- `demo/layout/StoryPager.vue:62-69` — re-implements `.scrollbar-hidden` inline (`scrollbar-width: none` + `::-webkit-scrollbar { display: none }`). Should `@apply scrollbar-hidden` or use the class directly.
- `src/styles/dock.css:142-144` — `.glass-dock.vertical::-webkit-scrollbar { display: none; }` (with `scrollbar-width: none` at `:128`) re-implements the same scrollbar-hidden recipe. `@apply scrollbar-hidden` (or compose `.scrollbar-hidden` on the element) closes this.
- `src/components/custom/dock/DockIconButton.vue:24` — uses a literal `cn("dock-icon-button", { "dock-icon-button--compact": props.compact }, props.class)`. Idiomatic; no drift.
- `src/components/custom/dock-group/DockGroup.vue` — emits `class="dock-group"` but `.dock-group` is **not declared anywhere in `src/styles/`**. Search of `src/styles/**` for `\.dock-group\b` returns zero hits. Either dock-group's CSS is consumer-supplied (not canon) or an entire utility was deleted at some point. **Glass-ui gap.**

### 3. Interactive consistency

The dock keeps three near-duplicate primitives: `<DockIconButton>` (`src/components/custom/dock/DockIconButton.vue:1-36`), `<DockTabButton>` (`DockTabButton.vue:1-34`), and `<DockSelectTrigger>` + `<DockDropdownTrigger>` (`DockSelectTrigger.vue:1-41`, `DockDropdownTrigger.vue:1-37`). Each emits a class contract; the CSS lives in `src/styles/dock.css` (sections covering `:397-459` icon, `:592-771` tab incl. `[data-tier=primary|secondary]`, `:773-841` select+dropdown).

- **`<DockIconButton>` vs `<Button variant="glass-subtle" size="icon">`**: `<Button>` (the shadcn/CVA variant set) does NOT carry the dock's specific scale-hover-dock / scale-press-dock / `--dock-control-size` discipline; `<DockIconButton>` exists because the dock's hover-scale and control-size are different from generic icon buttons. Reasonable. **Recommendation**: keep `<DockIconButton>`, but introduce a `data-tier="default"` / `data-tier="primary"` / `data-tier="secondary"` axis in the *single* button base CSS rather than special-casing `data-tier="secondary"` *also* on `.dock-tab-button` (`dock.css:755-771` selector list contains `.dock-tab-button[data-tier="secondary"], .dock-icon-button[data-tier="secondary"]` — the duplication signals that tier is orthogonal to button shape and could be hoisted).
- **`<DockTabButton>` vs `<Toggle>` / `<ToggleGroupItem>`**: `<DockTabButton>` is a `<Primitive as>` with class-contract emit; `<Toggle>` from reka-ui has its own state-driven `data-state="on|off"` cascade. The dock relies on `aria-current="page"` / `aria-pressed="true"` / `.is-active` / `.active` to derive its active state (`dock.css:643-646`) — that's the reka-toggle vocabulary minus the on/off binarisation. Acceptable for a router-driven nav button; flag only if `<DockTabButton>` ever needs to compose with `<ToggleGroup>` semantics.
- **`<DockSelectTrigger>` vs `<SelectTrigger>`**: `<DockSelectTrigger>` is a thin slot-class wrapper over `<SelectTrigger>` (`DockSelectTrigger.vue:28-40`). It ships its own chevron and disables hover-scale to anchor the dropdown content. Justified — but the styling sits at `dock.css:773-853` where it shares a giant compound selector with `<DockDropdownTrigger>`, then bifurcates only at `:804-806` (`.dock-dropdown-trigger:hover ... transform: scale(...)`) and `:851-853` (`[data-state=open] .dock-select-trigger__chevron`). Could be one canonical `.dock-trigger` class with `[data-trigger="select|dropdown"]` attribute; current state is two near-clones.
- **Hover/press cascade** is consistent across all dock controls — `--scale-hover-dock` (1.1) for icon + dropdown, no scale for select, `--scale-press-dock` (0.92) for press. Focus-visible composes `var(--focus-ring-shadow)`. Disabled composes `var(--opacity-disabled)`. Idiomatic.

### 4. Variant orthogonality

`<GlassDock>` carries five orthogonal axes today:

| Axis | Values | Source |
|---|---|---|
| `variant` | `"dock"`, `"rail"` | `GlassDock.vue:26-28` |
| `shape` | `"pill"`, `"rounded"` | `GlassDock.vue:29` |
| `orientation` | `"horizontal"`, `"vertical"` | `GlassDock.vue:30-34` |
| `density` | `"compact"`, `"comfortable"`, `"spacious"`, `"audacious"` | `GlassDock.vue:36-40` |
| state | `expanded`, `collapsed`, `pinned`, `always-expanded`, `fit-content`, `dock-wrap` | computed at `:217-222` |

Cross-products that lack a clear product surface — `variant="rail" + orientation="horizontal"` is silently overridden (`GlassDock.vue:58` — `props.variant === "rail"` forces vertical), `variant="rail" + alwaysExpanded=false` is silently forced expanded (`:60`). These are correct constraints, but they're encoded as runtime overrides instead of as `variant: "dock-horizontal" | "dock-vertical" | "rail"` exclusive variants. Working as intended, low priority.

A **tier axis is missing**: the J finding "DockPopover should not be a special component … or DRY-reuse our other components properly, and we should better support nesting many other component types within the dock, animated, idiomatically" is essentially asking for a `tier` axis on dock children. Today only `<DockTabButton>` and `<DockIconButton>` carry `data-tier="primary|secondary"`; `<DockSelectTrigger>`, `<DockDropdownTrigger>`, `<DockPopover>`, `<DockLayer>`, `<DockGroup>` do not. The audacious-tier showcase (instrument-chassis) consumes `data-tier="primary"` on the CTA but every other dock child stays at the default tier. **Glass-ui gap.**

`:deep()` reach into reka internals: zero hits for `:deep()` in `src/components/custom/dock/**` and `src/styles/dock.css`. Clean.

### 5. Overlay + motion

Where the cornerstone failure lives. Walking the canonical-overlay vocabulary:

- `<DockPopover>`: composes `--z-popover` (✓ `dock.css:490`), `glass-elevated` background recipe (✓ `:491-496`), `--popover-offset` via `--dock-popover-offset` alias (✓ `:142, :462`). It does **not** compose `.popover-animate .slide-in-from-side` — instead it ships its own `pop-up` / `pop-down` Vue Transition classes (`dock.css:499-531`). The motion is custom: opacity over `--dock-motion-fast` for enter, opacity + transform over `--dock-motion-popover-leave` for leave. Token-canonical durations + `--spring-snappy` / `--ease-out`, but the *vocabulary* duplicates the existing `.pop-enter-*` / `.pop-leave-*` family at `transitions.css:53-71`. Not a bug — but `<DockPopover>` re-implements an in-grammar recipe.
- `<DockLayerGroup>` cross-fade + FLIP size: uses `useLayerTransition` (`composables/useLayerTransition.ts:1-165`) + `.dock-layer-item-host { transition: opacity var(--dock-motion-fast); }` + container `transition: width var(--dock-motion-resize), height var(--dock-motion-resize);` (`dock.css:362-368`). Token-canonical, FLIP-correct. Solid.
- **Top-dock collapsed → expanded crossfade**: this is the cornerstone (see "Top-dock collapsed-state animation diagnosis" below). The `<GlassDock>` template at `GlassDock.vue:241-256` swaps a `dock-layer--full` and a `dock-layer--summary` via the `.layer-active` class. The container width transitions via `dock.css:107-114`. **The two layers themselves do not have an opacity transition.** `dock.css:212-216` declares `.dock-layer:not(.layer-active) { pointer-events: none; position: absolute; visibility: hidden; }` — `visibility` is binary; there is no `transition: opacity` on `.dock-layer` (only on `.dock-layer-item-host`, which is used by `<DockLayerGroup>`, not by `<GlassDock>`'s internal pair). Confirmed below.
- `prefers-reduced-motion`: dock `--dock-motion-*` aliases are tied to `--ease-standard` / `--spring-snappy` / `--duration-normal|fast|slow`. There's no media-query override that drops `width` / `height` resize on the dock root. The reduced-motion gate at `transitions.css:144-188` only covers `fade-*`, `fade-slide-*`, `dialog-scale-*`, `pop-*`, `dropdown-*`, `pane-swap-*`, `metric-swap-*`, `tab-fade-*` — neither `dock-in` nor `.glass-dock` width/height transitions. **Glass-ui gap (a11y).**
- `transition: all` audit: zero hits in `src/styles/dock.css`. Clean.

### 6. Typography

- `dock.css:346` rail tab `font-size: 0.75rem` — should be `--type-micro` / `--type-caption`. (Cross-listed with axis 1.)
- `dock.css:607` dock-tab-button `font-size: var(--type-small);` — canonical token.
- `dock.css:701` sparkle-pseudo-element `font-size: 0.75rem` — same drift.
- `dock.css:235` audacious tab font sizing absent: density-audacious sets `--dock-tab-min-height: 3.5rem` and `--dock-tab-padding-*` but no `--dock-tab-font-size` token. Audacious consumers (instrument-chassis CTA at `demo/stories/compositions/instrument-chassis.vue:235`) compose `text-heading` themselves on an inner `<span>`. The dock's audacious density says "type-forward" but doesn't reserve type. Acceptable per the comment at `dock.css:602-606` (utilities outrank components) — but a `--dock-tab-font-size` density token would close the loop.
- `<DockGroup>` carries no typography contract at all (single template at `DockGroup.vue:1-23`); consumer-supplied. Acceptable.

### 7. A11y resilience

- **Backdrop-filter fallback**: `glass.css:247-263` covers `.glass-{subtle,default,medium,elevated}` and `.glass-btn` under `@supports not (backdrop-filter)`. **Does not cover `.glass-dock`** — its `backdrop-filter: var(--dock-surface-blur)` at `dock.css:42-43` has no fallback path. On non-blur browsers the dock falls back to whatever `--glass-bg-dock` resolves to (`color-mix(in srgb, var(--card) 32%, transparent)`), which at 32% opacity is highly translucent and may wash unreadable. **Glass-ui gap.**
- **`prefers-reduced-transparency`**: `glass.css:219-233` zeroes `--glass-blur-dock` to `none`. ✓ — but does not lift `--glass-opacity-dock`, so the dock stays at 32% bg even when transparency is suppressed (the four other tiers go to 1.0). **Glass-ui gap.**
- **`prefers-reduced-motion`**: dock's `width` / `height` / `transform` / `box-shadow` transitions are not bracketed (see axis 5). **Glass-ui gap.**
- **`prefers-contrast: more`**: `glass.css:236-243` lifts opacity floor on the four standard tiers; dock isn't covered. **Glass-ui gap.**

## DockPopover diagnosis (A)

`<DockPopover>` is **not** a wrapper around `<Popover>` from reka-ui. It is a fully custom floating element implemented at `src/components/custom/dock/DockPopover.vue:1-273`. Public surface:

| Surface | Definition |
|---|---|
| `direction` prop | `"up" \| "down"` (default `"down"`) — `DockPopover.vue:18` |
| `collapseDelay` prop | `number` ms (default `1200`) — `:19` |
| `align` prop | `"center" \| "end"` (default `"center"`) — `:20` |
| `clickOnly` prop | `boolean` (default `false`) — `:21` |
| `#trigger` slot | renders inside the auto-mounted `<DockIconButton>` at `:256-258` |
| default slot | the panel body at `:268` |
| `defineExpose` | `{ expanded, expand, collapse }` — `:245` |

For comparison, `<Popover>` from reka-ui at `src/components/ui/popover/{Popover,PopoverTrigger,PopoverContent}.vue` exposes:

| Surface | reka-ui's Popover |
|---|---|
| Root state | `<PopoverRoot>` v-model open, modal, default-open |
| Trigger | `<PopoverTrigger>` headless |
| Portal | `<PopoverPortal>` (optional) |
| Content | `<PopoverContent>` with `align`, `side`, `sideOffset`, `alignOffset`, `avoidCollisions`, `collisionBoundary`, `collisionPadding`, `arrowPadding`, `sticky`, `hideWhenDetached` |
| Motion | `.popover-animate .slide-in-from-side` (canonical) |
| Outside-dismiss | reka's `onPointerDownOutside` / `onEscapeKeyDown` / `onFocusOutside` |
| Auto-flip | reka's collision-aware positioning (Floating UI) |

**What `<DockPopover>` re-implements that reka already provides**:

1. **Click-away**: `DockPopover.vue:218-243` — installs a `pointerdown` capture listener after a `requestAnimationFrame` defer. reka's `onPointerDownOutside` does this with a more-tested implementation (and emits an event consumers can prevent-default).
2. **Direction flip on viewport clip**: `:148-157` — checks `triggerRect.top - panelRect.height - OFFSET < VIEWPORT_PAD` to flip `up`→`down`. reka's `<PopoverContent avoid-collisions>` does this with the full Floating UI middleware stack.
3. **Horizontal clip nudge**: `:172-201` — center-align fallback uses `transform: translateX(calc(-50% ± Npx))`. reka's `collisionPadding` + `align="center"` does this.
4. **Mount-time positioning**: `:206-215` — `nextTick(() => positionPanel())`. reka's `<PopoverContent>` runs Floating UI on mount and on resize.
5. **Hover-to-open + delayed close**: `:76-87` + `:84-87` — collapse timer. This *is* `<HoverCard>` from reka (which `<DockPopover>` doesn't compose). **The hover semantics here are why `<DockPopover>` exists** — `<Popover>` is click-driven; `<HoverCard>` is hover-driven; neither matches the dock's "click-or-hover, both work, click pins" contract.
6. **CSS length parsing of `--dock-popover-offset` / `--dock-popover-viewport-pad`**: `:97-135` — six lines of `cssLengthToPx`. Reka uses raw px numbers from props.

**What `<DockPopover>` adds that reka doesn't**:

1. **Dock keep-open hold**: registers a `DOCK_KEEP_OPEN_SINK_KEY` token on expand (`:46-63`). Hooked into the same primitive `<Slider :keep-dock-open>` uses.
2. **Dock context registration**: registers itself with the parent `<GlassDock>` so the dock can `closeOtherPopovers` (`:31-43`, dock context at `composables/dockContext.ts:1-26`).
3. **Force-close on parent-dock collapse**: `:67-70` — `watch(dockExpanded, (e) => { if (!e && expanded.value) expanded.value = false })`.
4. **Auto-mounted `<DockIconButton>` trigger**: `:256-258`. Sleeker than `<PopoverTrigger as-child>` for the icon-button-trigger case.

**Recommendation — collapse `<DockPopover>` into `<Popover>` with dock-aware composition**:

The dock-specific behaviour is three hooks:
- dock-keep-open token (`DOCK_KEEP_OPEN_SINK_KEY`) acquired while open;
- dock-context registration (`closeOtherPopovers`);
- auto-close on parent-dock collapse.

The "click-or-hover" pattern can land on either `<Popover>` (with `:open-on-hover` / `:hover-delay` props as a glass-ui extension) or by composing `<HoverCard>` and `<Popover>` together. Cleanest path:

1. **Extend `<Popover>`** in glass-ui with two thin props: `keepDockOpen?: boolean` + `hoverOpenDelay?: number`. Both are no-ops outside a dock context.
2. **Delete `DockPopover.vue` and `pop-up-*` / `pop-down-*` keyframes in `dock.css:499-531`** (not the keyframe targets — fold the dock-popover panel into `glass-elevated .popover-animate .slide-in-from-side` per `PopoverContent.vue:42-47`).
3. **`<DockIconButton><PopoverTrigger as-child>...</PopoverTrigger></DockIconButton>`** is the new idiom. `<DockPopover :icon="X">` becomes a five-line convenience wrapper, NOT a special component.
4. The `data-glass-dock-portal` / `data-glass-dock-owner` plumbing already exists on `<PopoverContent>` at `PopoverContent.vue:33,40-41` — this is wiring that survives the migration unchanged.

The "DRY-reuse" the user asks for is satisfied by this collapse: `<Popover>` carries direction-flip, click-away, content-portal, motion vocabulary; `<DockPopover>` becomes a positional sugar. Breaking change — acceptable per J's binding constraints.

## Top-dock collapsed-state animation diagnosis (B) — cornerstone

**Mechanism**: `<GlassDock>` (horizontal orientation) renders both layers simultaneously into a CSS grid:

```vue
<!-- src/components/custom/dock/GlassDock.vue:241-256 -->
<template v-if="orientation === 'horizontal'">
    <div class="dock-layers">
        <div :class="['dock-layer dock-layer--full', { 'layer-active': visualExpanded }]" :inert="!expanded || undefined">
            <slot />
        </div>
        <div :class="['dock-layer dock-layer--summary', { 'layer-active': !visualExpanded }]" :inert="expanded || undefined" @click="onClickCollapsed">
            <slot name="collapsed" />
        </div>
    </div>
</template>
```

**Animated properties**:
- The `.glass-dock` outer surface transitions `width`, `padding`, `box-shadow`, `transform`, `background`, `border-color` — all token-canonical, `--dock-motion-resize` (`var(--duration-normal) var(--spring-snappy)`) for width/padding/transform, `--dock-motion-standard` for box-shadow/background/border-color. Defined at `src/styles/dock.css:107-114`.
- The two layers (`.dock-layer--full`, `.dock-layer--summary`) are stacked at `grid-area: 1 / 1` (`dock.css:195-206`).

**The break**: layer swap is binary. `src/styles/dock.css:208-216`:

```css
.dock-layer.layer-active {
    pointer-events: auto;
}

.dock-layer:not(.layer-active) {
    pointer-events: none;
    position: absolute;
    visibility: hidden;
}
```

`visibility: hidden` is not a transitionable property in any continuous sense (the spec animates it discretely at the 50% mark of any compound transition that includes it explicitly — but here there's no `transition: visibility ...` declared, so it simply flips). There is **no `transition: opacity ...` on `.dock-layer`**. Compare with `.dock-layer-item-host` at `dock.css:370-381` which DOES carry `transition: opacity var(--dock-motion-fast);` — that selector is for `<DockLayerGroup>`'s descendants, not for `<GlassDock>`'s built-in pair.

Combined with the smooth width animation, the user's eye sees:
1. dock width morphs over `var(--duration-normal) var(--spring-snappy)` (300ms snappy);
2. *simultaneously*, the full-layer content vanishes instantly (visibility flip);
3. *simultaneously*, the summary-layer content materialises instantly.

That mismatch — chrome animating, content cutting — is the perceived "jerks / instantly transitions". The width animation gives the eye time-base anchoring; the content swap doesn't honour it.

**Proximate-cause line**: `src/styles/dock.css:213` — `visibility: hidden` (with no opacity transition declared).

**Distal cause**: `src/components/custom/dock/GlassDock.vue:244-255` — the markup intentionally uses class-toggle on the same DOM nodes rather than a Vue `<Transition>` element. This was a deliberate choice (FLIP-friendly, no DOM destruction across collapse) but it means motion has to be CSS-only.

**Remediation candidates**:

1. **Add `transition: opacity` on `.dock-layer`**, swap `visibility: hidden` for `opacity: 0` + `pointer-events: none` (with `:not(.layer-active)` keeping `position: absolute` so it doesn't take width). Match the `.dock-layer-item-host` recipe at `dock.css:370-381`. Lowest-risk fix; ~5 lines.
2. **Wrap each layer in `<Transition name="tab-fade">` or `<Transition name="fade">`** (`transitions.css:90-98` / `:4-11`) and use `v-if` on `visualExpanded`. Higher cost (DOM mounts/unmounts; loses FLIP guarantee) but composes the canonical fade vocabulary.
3. **Compose `useLayerTransition`** from the existing primitive used by `<DockLayerGroup>` (`composables/useLayerTransition.ts:38-165`). The full + summary layers register as two layers of the same group; the existing FLIP machinery handles the swap. Highest design coherence — the same primitive drives both the inner layer-group transitions and the outer collapsed-swap. **Recommended**: this is the gestalt-correct path because it collapses two transition mechanisms into one.

The reduced-motion gate at `transitions.css:144-188` doesn't cover `.dock-layer` either way, so any of the above must add a `prefers-reduced-motion` bracket.

## Dock blur proposal (C)

Current values, from `src/styles/tokens.css:271-283`:

| Token | Radius | Saturate |
|---|---|---|
| `--glass-blur-subtle-radius` | 1px | saturate(1.05) |
| `--glass-blur-default-radius` | 3px | (none) |
| `--glass-blur-medium-radius` | 3px | saturate(1.3) |
| `--glass-blur-elevated-radius` | 4px | saturate(1.4) |
| `--glass-blur-dock-radius` | 1px | saturate(1.025) |

The dock blur is already at `1px` — same radius as `subtle`, slightly lower saturation (1.025 vs 1.05). The token comment at `:281-283` says "half the subtle weight". On modern macOS Safari and Chrome at 1×, `blur(1px)` is barely perceptible — the perceived dock blur the user wants reduced is most likely coming from **the dock's `data-tier="primary"` / `data-tier="secondary"` cascade** (which uses `var(--glass-specular)` + paper-grain stacks, not blur) **or from the Aurora background bleeding through 32% opacity glass at 1px blur** (which accumulates a halo even at 1px because the 32% opacity is so low that aurora's pastel patches dominate the surface). The visual perception of "dock blur is too high" is the *backdrop-filter chromatic effect* not the radius.

Two concrete proposals:

1. **Drop blur radius to `0px`** (or `none`): `--glass-blur-dock-radius: 0px` → `--glass-blur-dock: saturate(1.025)`. The dock relies on `--glass-bg-dock` (32% card opacity) for translucency; the 1px blur contributes near-nothing visually but still triggers compositor blur work on every dock paint. This is the "reduce blur" interpretation that most matches the user's likely intent.
2. **Hold radius, drop saturation to 1.0**: `--glass-blur-dock: blur(1px) saturate(1.0)` (i.e., remove the saturate). The 1.025 multiplier is a chromatic punch under the aurora; killing it tones the dock. Less aggressive than option 1.

**Recommended**: option 1 — `--glass-blur-dock-radius: 0px`, with `--glass-blur-dock: saturate(1.0)` (or just drop the rule; on `backdrop-filter: none` the dock is purely opacity-driven, which is the aesthetic the user is asking for). Validate via the `prefers-reduced-transparency` path at `glass.css:229` which already maps the token to `none` — the user's request essentially makes the reduced-transparency path the default.

## Overflow-scroll proposal (D)

Current behaviour:

- `.glass-dock` (any orientation, any state): `overflow: hidden` at `dock.css:39`.
- `.glass-dock.expanded`: `overflow: visible` at `dock.css:218-220`.
- `.glass-dock.always-expanded`: `overflow: visible` at `:230-233`.
- `.glass-dock.vertical`: `overflow-x: hidden; overflow-y: auto` at `:126-127` + `scrollbar-width: none` at `:128`. (Webkit scrollbar suppressed at `:141-144`.)
- `.glass-dock.vertical.always-expanded`: `overflow-x: hidden; overflow-y: auto` at `:236-238`.
- `.glass-dock.dock-wrap`: `flex-wrap: wrap` on inner layer at `:249-255` instead of scroll.

So:
- **Vertical docks** (rails) DO scroll vertically when content overflows — already handled.
- **Horizontal docks**, when expanded, are `overflow: visible` — they spill content outside the dock chrome. There is no `overflow-x: auto` path on the horizontal axis.

The `.story-pager-dock` consumer at `demo/layout/StoryPager.vue:54-69` works around this by setting `max-width: min(80vw, 56rem)` on the dock and `overflow-x: auto; scrollbar-width: none` on an inner `.story-pager-row` div — the dock itself stays `overflow: visible`, and the inner row scrolls. That's a consumer-supplied workaround for a missing canonical mechanism.

**Proposal**: introduce a `--dock-max-inline-size` / `--dock-max-block-size` token pair, default `none`. When set, the dock root composes `overflow: hidden` + an inner content wrapper (`.dock-layer--full`) gets `overflow-x: auto; scrollbar-width: none; -webkit-mask-image: linear-gradient(...)` (mask-fade for the scroll-end fade). For horizontal docks: `max-inline-size: var(--dock-max-inline-size)` + inner `overflow-x: auto`. For vertical docks: the existing `--dock-vertical-max-height` already does this; rename to `--dock-max-block-size` for symmetry.

Concretely:
- Add `--dock-max-inline-size: none;` to `.glass-dock` block at `dock.css:30-46`.
- Add `max-inline-size: var(--dock-max-inline-size);` to the same block.
- Add a new selector `.glass-dock:not(.vertical):not(.dock-wrap) > .dock-layers` (or `.dock-layer--full` directly) with `overflow-x: auto; scrollbar-width: none;` + webkit suppression.
- Retire the inline workaround at `StoryPager.vue:54-69` — set `--dock-max-inline-size: min(80vw, 56rem)` on the dock as a CSS variable instead.

This closes finding 1 (docks-overflow-scroll) and incidentally retires the StoryPager workaround.

## DockGroup composition gap inventory (E)

Currently-supported nested types — surveyed by walking every `<GlassDock>` / `<DockGroup>` consumer in `demo/` and `src/`:

| Nested element | Where mounted | Status |
|---|---|---|
| `<DockIconButton>` | `demo/layout/CategoryRail.vue:52-74,93-113`, `demo/stories/navigation/dock.vue:75-100`, `demo/stories/navigation/rail.vue:50-63`, `demo/stories/navigation/dock-layers.vue:65-78,138-146`, `demo/stories/primitives/dock-group.vue:51-62`, `demo/stories/compositions/instrument-chassis.vue:173-181,219-225` | ✓ canonical |
| `<DockTabButton>` | `demo/layout/StoryPager.vue:41-47`, `demo/stories/primitives/dock-group.vue:69-71`, `demo/stories/compositions/instrument-chassis.vue:227-236` | ✓ canonical |
| `<DockSelectTrigger>` (+ `<Select>`) | `demo/stories/navigation/dock.vue:113-131` | ✓ canonical |
| `<DockDropdownTrigger>` (+ `<DropdownMenu>`) | `demo/stories/navigation/dock.vue:135-158` | ✓ canonical |
| `<DockPopover>` | `demo/stories/navigation/dock.vue:181-224` | ✓ canonical (but see DockPopover diagnosis) |
| `<DockLayer>` / `<DockLayerGroup>` | `demo/stories/navigation/dock-layers.vue:39-149`, `demo/stories/primitives/slider-glass-track.vue:230-305` | ✓ canonical |
| `<Slider :keep-dock-open>` | `demo/stories/primitives/slider-glass-track.vue:245-301` (only in `<DockLayer>` body) | ✓ canonical (W3 lane γ closure) |
| `<MetricBadge>` | `demo/stories/primitives/dock-group.vue:29-44`, `demo/stories/compositions/instrument-chassis.vue:160-171` | ✓ inside `<DockGroup>` only |
| `<GlyphFace>` | inside `<DockIconButton>` / `<DockTabButton>` slots | ✓ |
| router-link | inside `<DockTabButton as-child>` | ✓ |
| reka `<Tooltip>` | `demo/layout/CategoryRail.vue:50-78`, `demo/stories/navigation/rail.vue:48-66` | ✓ |
| inline `dock-separator` div | many sites | ✓ |
| Plain text `<span>` | `demo/stories/navigation/dock.vue:102-104`, `demo/stories/compositions/instrument-chassis.vue:163-165` | partial — no `.dock-label` class |

**Gaps** — nested types the user wants supported "animated, idiomatically":

1. **`<Slider>` outside `<DockLayer>` (i.e. directly inside `<GlassDock>`)** — no canonical example; the only slider-in-dock pattern in source is layer-mounted. The dock-keep-open contract works at any nesting depth (it's an inject), but the dock's horizontal layout doesn't reserve any vertical room for a slider's track-and-thumb geometry. The slider variant `glass-track` was designed for this case (`Slider.vue:170-204`), but it shows up only nested inside a `<DockLayer>`. Not a hard gap, but the J finding 4 ("Drag a slider — the dock holds; this section needs to be refined") implies the user expects sliders to compose more transparently.
2. **`<NumberField>` / `<Input>` inside the dock**: zero consumers. The dock is structurally inline-flex with `--dock-layer-height: 2.5rem` — number-fields and inputs are 2.5rem too, so they'd fit, but no story demonstrates it. **Glass-ui gap.**
3. **`<Switch>` / `<Checkbox>` / `<Toggle>` inside the dock**: zero consumers. Same shape constraint applies. **Glass-ui gap.**
4. **`<Tabs>` inside the dock**: there's `<DockLayerGroup>` for layer-style tabs and `<DockTabButton>` for nav-style tabs, but no canonical pattern for `<Tabs>` from `src/components/ui/tabs/` mounted inline. The H tranche `<UnderlineTabs>` / `<BouncyTabs>` siblings could compose here.
5. **`<NotificationDot>` / `<MetricBadge>` (status indicators)** — `<MetricBadge>` is shown inside `<DockGroup>` but not inside `<GlassDock>` directly. **Glass-ui gap.**
6. **Nested `<DockGroup>` inside `<GlassDock>` (or vice versa)** — no canonical example of either direction. Both are "shelf" surfaces; the ladder isn't established. **Glass-ui gap.**
7. **Animated entry of arbitrary children**: `dock-in` keyframe at `animations.css:88-98` exists; `transitions.css:138-141` ships `.dock-in` utility. Zero consumers grep for `.dock-in` in `src/` or `demo/`. **Orphan utility — listed in H δ §65.**

The "animated, idiomatically" leg of finding 6 is currently un-served. Children just appear/disappear; there's no `<TransitionGroup name="dock-stagger">` pattern, no enter/leave gating per child. **Glass-ui gap — propose a `<DockTransitionGroup>` primitive that wraps `<TransitionGroup>` + `dock-in` keyframe + stagger delay token.**

## Vertical rail dev-text leak (F)

Probed `http://localhost:5174/primitives/slider` at viewport 1200×766, 1280×600, 1280×450 (the last forced viewport-clamping). Findings:

- **The rail itself does not overflow at standard heights**. With `--dock-vertical-max-height: calc(100vh - 2rem)` (`dock.css:31`), 11 rail items (1 brand link + 10 category buttons including the dev-only `Wrench` icon for "Internal · Debug") at `--dock-control-size: 2.5rem` + gap fit comfortably above 600px viewport. Below ~580px the rail's `overflow-y: auto` kicks in (`dock.css:127`) and the scrollbar is hidden by default — but **no scroll affordance is rendered** because of `dock.css:128` (`scrollbar-width: none`) and `dock.css:141-144` (`::-webkit-scrollbar { display: none }`). At very short viewports the rail clips silently.
- **The "dev text" that leaks is the `Internal · Debug` category button itself.** It appears on the rail via `demo/stories/manifest.ts:246` (`...(import.meta.env.DEV ? [INTERNAL_CATEGORY] : [])`). The `Wrench` icon shows; its `aria-label` is `"Internal · Debug"`; the visible artefact is the icon button at the bottom of the rail and a `Wand2` `"Aurora"` flat-story icon below the divider (FLAT_STORIES at `manifest.ts:249-258`).
- **Manifest entry**: `demo/stories/manifest.ts:80-92` — `INTERNAL_CATEGORY` with `id: "_internal"`, `title: "Internal · Debug"`, `icon: Wrench`. It's **only included in DEV** but it is included whenever the user is running `vite dev` — which is the user's everyday state. The user perceives this as a debug surface bleeding into the production rail.
- **No literal debug `console.log` or stray `<span>` text node was found inside the rail** (verified via Playwright `evaluate` walking text nodes — only the brand glyph `ℱ` at `demo/layout/CategoryRail.vue:45` came back as a text node).

So "dev text" = the **`Internal · Debug` rail entry visible in DEV builds**, anchored at:
- `demo/stories/manifest.ts:80-92` (declaration)
- `demo/stories/manifest.ts:246` (gated insertion)
- rendered via `demo/layout/CategoryRail.vue:50-78` (no special-case for `_internal` — the rail iterates `CATEGORIES` directly)

**Recommendations**:
1. **Treat the rail's vertical overflow as a real failure mode** — when viewport collapses below the rail's intrinsic height, the user can't scroll because scrollbars are hidden. Either expose a thin scrollbar (`scrollbar-thin` from `utilities.css:40-43`) when overflow is active, or apply `mask-image: linear-gradient(...)` fade-edges so the user sees there's more content. The `--mask-fade-width: 1rem` token at `tokens.css:372` already exists for this.
2. **Hide the `_internal` category from the rail unless the user explicitly opts in** — gate behind a `localStorage` flag or a query-string toggle, not just `import.meta.env.DEV`. Update `demo/layout/CategoryRail.vue` to filter `CATEGORIES` against an `isInternalRevealed()` predicate.
3. **`Aurora` flat-story icon** at `manifest.ts:249-258` is a normal feature surface (per `Wand2` icon) — keep it.

## Glass-ui gaps surfaced

Per the canonical "Glass-ui gaps" section format from `style-audit.md` — patterns the dock subsystem (or its consumers) legitimately need that glass-ui does not yet expose, with proposed placement.

| Gap | Sites | Proposal |
|---|---|---|
| **Inter-layer crossfade on `<GlassDock>` collapsed↔expanded** | every `<GlassDock>` with a `#collapsed` slot (~6 sites) | Add `transition: opacity var(--dock-motion-fast)` to `.dock-layer`; swap `visibility:hidden` for `opacity:0`; bracket under `prefers-reduced-motion`. ~5 LOC in `dock.css:208-216`. **Cornerstone fix.** |
| **`.dock-label` utility** | `demo/stories/navigation/dock.vue:102-104`, `demo/stories/compositions/instrument-chassis.vue:163-165`, `demo/stories/navigation/dock-layers.vue:70-71`, etc. | Add `.dock-label` to `dock.css` composing `text-mono-caption` + `text-muted-foreground` + `tabular-nums`. Strike from canonical-utility list otherwise. |
| **`.dock-group` substrate styling** | `<DockGroup>` consumer (`src/components/custom/dock-group/DockGroup.vue:1-23`) | The component emits `class="dock-group"` but no CSS rule exists in `src/styles/`. Either declare `.dock-group` in `dock.css` or migrate `<DockGroup>` styling into the SFC. **Substrate-without-CSS.** |
| **`prefers-reduced-motion` on `.glass-dock` width/height/transform/box-shadow** | every `<GlassDock>` (~10 sites) | Add a media-query block in `dock.css` that drops `width`/`height`/`transform`/`box-shadow` transitions to `0.01ms` and adds `transition-property: none` on `.dock-layer`. |
| **`@supports not (backdrop-filter)` fallback for `.glass-dock`** | every `<GlassDock>` | Add a fallback at the bottom of `dock.css` (mirroring `glass.css:247-263`) that lifts `--glass-opacity-dock` to ~0.96 when blur is unavailable. |
| **`prefers-reduced-transparency` lift on `--glass-opacity-dock`** | every `<GlassDock>` | Add `--glass-opacity-dock: 1;` to the `prefers-reduced-transparency` block in `glass.css:219-233` (currently lifts only the four named tiers). |
| **Tier axis on dock children other than `<DockTabButton>` / `<DockIconButton>`** | none yet — gap-driven | Hoist the `[data-tier]` attribute selector out of `dock-tab-button` / `dock-icon-button` shape-specific blocks into a single `.dock-control[data-tier]` cascade. Land a `.dock-control` mixin that all dock primitives share. |
| **Dock content overflow → inner scroll on horizontal axis** | `demo/layout/StoryPager.vue:54-69` (workaround) | Add `--dock-max-inline-size` token + matching inner `overflow-x: auto`. Retire the StoryPager workaround. **Closes finding 1.** |
| **`<DockTransitionGroup>` for animated nested children** | future consumers | New primitive: wraps `<TransitionGroup>` + `.dock-in` keyframe + stagger token. Closes the orphan `dock-in` utility. |
| **`.dock-in` keyframe orphan** | `animations.css:88-98`, `transitions.css:138-141` | Either consume from `<DockTransitionGroup>` (above) or delete. |
| **`<DockPopover>` collapse onto `<Popover>` + `keepDockOpen` extension** | `demo/stories/navigation/dock.vue:181-224` | Extend `<Popover>` with `keepDockOpen?: boolean` + `hoverOpenDelay?: number`; delete `DockPopover.vue` + `pop-up-*` / `pop-down-*` motion classes; ship a five-line `<DockPopoverIcon>` convenience for the icon-button-trigger case. **Closes finding 6.** |
| **`<DockGroup>` <-> `<GlassDock>` ladder** | none — gap | Document in `DESIGN.md` Substrate Hierarchy: `<GlassDock>` is the floating chrome; `<DockGroup>` is the inline shelf. Establish the nesting rule (DockGroup-inside-GlassDock = inset secondary tier; GlassDock-inside-DockGroup = forbidden). |
| **Sliders / inputs / toggles inside `<GlassDock>` (not inside `<DockLayer>`)** | none — gap | Add a story `demo/stories/navigation/dock-controls.vue` showing `<Slider>`, `<NumberField>`, `<Switch>`, `<Checkbox>`, `<Toggle>` mounted directly inside a horizontal `<GlassDock>`. Surface the constraint that all such children must compose `--dock-layer-height` for visual alignment. |

## Proposed J wave shape

The dock subsystem surfaces enough work to own one to two J waves, depending on how aggressively the cornerstone + DockPopover collapse are pursued.

**Recommendation: one wave, 5-6 disjoint agents.**

| Agent | Scope | Estimated complexity |
|---|---|---|
| **J.W?.α** — Cornerstone collapsed-state crossfade | `src/styles/dock.css:208-216` + reduced-motion bracket; option (3) recommended (compose `useLayerTransition` from `<DockLayerGroup>` for the outer pair too) — `src/components/custom/dock/GlassDock.vue:241-256` rewrite to provide a single layer-transition primitive | medium — ~80 LOC across 2 files; touches the most-watched dock surface; needs Playwright proof of crossfade timing |
| **J.W?.β** — DockPopover collapse | Delete `src/components/custom/dock/DockPopover.vue`; extend `src/components/ui/popover/{Popover,PopoverContent}.vue` with `keepDockOpen` + `hoverOpenDelay`; update `src/components/custom/dock/index.ts`; rewrite `demo/stories/navigation/dock.vue:181-224`; remove `dock.css:461-531` (panel + pop-up/pop-down motion); test public-surface preservation | high — ~250 LOC across 6 files; breaking change; touches subpath barrel |
| **J.W?.γ** — Blur reduction + a11y resilience | `src/styles/tokens.css:275,283` (drop blur to 0); `src/styles/dock.css` add reduced-motion + `@supports not (backdrop-filter)` blocks; `src/styles/glass.css:219-233` lift `--glass-opacity-dock` | low — ~40 LOC across 3 files |
| **J.W?.δ** — Horizontal overflow-scroll + StoryPager retire | `src/styles/dock.css:30-46,107-114,218-220` + new `--dock-max-inline-size` token in `tokens.css`; `demo/layout/StoryPager.vue:54-69` simplification; `demo/stories/navigation/dock.vue` add a max-width-overflow story | medium — ~60 LOC across 3 files |
| **J.W?.ε** — Dock substrate utilities (`.dock-label`, `.dock-group`, tier hoist) + dock-in keyframe consumer | `src/styles/dock.css` add `.dock-label` + `.dock-group` rules; hoist `[data-tier]` to a shared `.dock-control` cascade; either land `<DockTransitionGroup>` or delete `dock-in` keyframe | medium — ~80 LOC across 4 files |
| **J.W?.ζ** — Vertical-rail overflow affordance + dev-text gate | `src/styles/dock.css:126-144` add `mask-image` fade-edges; `demo/layout/CategoryRail.vue` filter `_internal` behind a localStorage gate; `demo/stories/manifest.ts:246` add `isInternalRevealed()` predicate | low — ~40 LOC across 3 files |

**File-bounds disjointness verified** — α touches `dock.css:208-216` and `GlassDock.vue:241-256`; β touches `DockPopover.vue` (delete) + popover SFCs + `dock.css:461-531` (delete); γ touches `tokens.css:275-283` + `glass.css:219-233` + new `dock.css` tail block; δ touches `dock.css:30-46,107-114,218-220` + `StoryPager.vue`; ε touches `dock.css` (additive) + new SFC; ζ touches `dock.css:126-144` + demo files. No overlapping write bounds.

**If splitting into two waves**: cornerstone (α) + DockPopover collapse (β) sit in wave 1; the remaining four polish lanes (γ, δ, ε, ζ) sit in wave 2. The break point is "behaviour-changing" vs "polish".

**Hard gates per agent**:
- α: Playwright probe of dock collapse timing (visualizes opacity transition); reduced-motion bracket verified via dev-tools force.
- β: `tests/public-surface.spec.ts` green (DockPopover removed cleanly); zero `<DockPopover>` consumers in source; demo story rewrites compile.
- γ: `prefers-reduced-transparency` Playwright probe shows opaque dock; backdrop-filter:none Playwright probe shows readable dock.
- δ: `<GlassDock>` with `--dock-max-inline-size: 24rem` + 30 children → inner scroll observed; StoryPager `:54-69` deleted.
- ε: Demo story renders `.dock-label` and `.dock-group` substrate; tier hoist verified by grep diff.
- ζ: At viewport 320×400, rail scrolls with mask-fade affordance; `_internal` invisible without opt-in.

## Closing tally

- **6/6 user findings traced to source** — all six J dock findings have file:line citations.
- **Cornerstone diagnosed** — `src/styles/dock.css:213` (`visibility: hidden` with no opacity transition); fix path (3) is the gestalt-correct option.
- **1 component slated for deletion** — `<DockPopover>` collapses onto `<Popover>` + thin extension props.
- **13 glass-ui gaps surfaced** — see table above.
- **Recommended J wave shape**: one wave, six disjoint agents (or two waves split at behaviour-vs-polish).

---

### Top-5 file:line citations of broken / under-canonised state

1. **`src/styles/dock.css:213`** — `.dock-layer:not(.layer-active) { ... visibility: hidden; }` with no opacity transition. **Cornerstone failure.**
2. **`src/components/custom/dock/DockPopover.vue:1-273`** — entire 273-line custom popover that re-implements click-away, direction-flip, horizontal nudge, mount-time positioning that reka's `<Popover>` already provides.
3. **`src/styles/tokens.css:275, 283`** — `--glass-blur-dock-radius: 1px` + `blur(1px) saturate(1.025)`. Both negligible-but-paid; finding 3 (blur reduce) closes by dropping radius to 0.
4. **`demo/layout/StoryPager.vue:54-69`** — consumer-supplied scroll-clip workaround for missing horizontal-overflow canonical mechanism on `<GlassDock>`. Finding 1.
5. **`demo/stories/manifest.ts:80-92,246`** — `INTERNAL_CATEGORY` declaration + DEV-only insertion that surfaces a `Wrench`-iconed "Internal · Debug" rail entry whenever the user is running `vite dev`. Finding 5 ("dev text leaks").

### Honourable-mention citations

- `src/components/custom/dock-group/DockGroup.vue:1-23` — emits `class="dock-group"` with no matching CSS rule anywhere in `src/styles/`.
- `src/styles/dock.css:670-672, 760-762` — raw `rgb(255 255 255 / 0.06)` / `rgb(0 0 0 / 0.04)` micro-bevel literals duplicating `--glass-highlight`.
- `src/styles/animations.css:88-98` + `src/styles/transitions.css:138-141` — `dock-in` keyframe + `.dock-in` utility, zero consumers.
- `src/components/custom/dock/composables/useLayerTransition.ts:1-165` — solid FLIP primitive used only by `<DockLayerGroup>`; could power the cornerstone fix on `<GlassDock>`'s outer pair.
