# glass-ui

Shared glassmorphic design system: Vue 3.5 components, CSS design tokens, composables. Built on reka-ui + Tailwind CSS v4.

## Build

```
npm run build              # library → dist/glass-ui.js + glass-ui.css + index.d.ts + per-subpath chunks
npm run typecheck          # vue-tsc --noEmit
npm run profile:budget     # bundle-budget gate (re-landed K W4 Lane B); --enforce mode in CI
npm run verify-export-types # subpath dts publication probe (L W0 Lane III release-script clause)
```

The `build` script runs two sequential arms — `vite build` emits the JS bundle + per-subpath chunks + the `/styles` CSS, then `emit-types` (`vue-tsc --project tsconfig.build.json`) emits the flat per-entry `.d.ts` set into `dist/` out-of-band. Declarations are NOT emitted by an in-Vite plugin: `tsconfig.build.json` runs the repo-native `vue-tsc` in `emitDeclarationOnly` mode against `src/`, which decouples the dts emit from any plugin-bundled TypeScript pin. The full build is ≈6.9 s (the vite arm ~0.8 s over 2415 modules; the vue-tsc dts arm ~6 s) and peaks at ≈769 MB RSS — comfortably under Node's default heap, so `build` runs green with no `NODE_OPTIONS` heap prefix. CI and `release.sh` invoke `npm run build` directly; both inherit the default-heap profile.

## Structure

```
src/
├── index.ts                        # v1.0 curated public barrel (vueuse-free)—Phase 2 SCC closure (L.W1 Lane A)
├── api/                            # `@mkbabb/glass-ui/api` discovery layer—types + constants only (L.W1 Lane B)
│   └── index.ts                    # 66 canonical public symbols (62 types + 4 constants)—M.W2 + O.W4 + O.W6 + P.W1 + P.W2 + P.W3 extensions; P.W0 + P.W6 resyncs
├── dark.ts                         # `@mkbabb/glass-ui/dark` flat subpath (L.W1 Lane C; vueuse-bearing)
├── keyboard.ts                     # `@mkbabb/glass-ui/keyboard` flat subpath (L.W1 Lane C; vueuse-bearing)
├── carousel.ts                     # `@mkbabb/glass-ui/carousel` flat subpath (L.W1 Lane C; vueuse-bearing; v1.0.4 ships full `Carousel*` family per MIGRATION.md §1.2)
├── forms.ts                        # `@mkbabb/glass-ui/forms` subpath (K.WS Phase 1; preserved)
├── components/
│   ├── ui/                         # 41 shadcn-vue base component packages + _shared (reka-ui)—42 dirs total
│   │   ├── _shared/                # ModalOverlay (V.W3 43bee82) + menuItemVariants CVA (V.W3 6e6916e)
│   │   ├── accordion/              # Accordion + trigger/content wrappers
│   │   ├── alert/                  # Alert, title, description
│   │   ├── avatar/                 # Avatar, AvatarImage, AvatarFallback
│   │   ├── badge/                  # Badge + badgeVariants CVA
│   │   ├── button/                 # Primitive + buttonVariants CVA (incl. primary-audacious—K W6)
│   │   ├── card/                   # Card, header/title/description/content/footer
│   │   ├── carousel/               # Carousel primitives
│   │   ├── checkbox/               # Checkbox
│   │   ├── collapsible/            # Collapsible root/trigger/content
│   │   ├── combobox/               # Combobox shell
│   │   ├── command/                # Command palette + subcomponents
│   │   ├── context-menu/           # ContextMenu public compound wrappers
│   │   ├── data-table/             # Table sorting/filter helpers
│   │   ├── dialog/                 # Dialog + subcomponents
│   │   ├── drawer/                 # Drawer bottom sheet (vaul-vue)
│   │   ├── dropdown-menu/          # DropdownMenu compound wrappers
│   │   ├── hover-card/             # HoverCard trigger/content
│   │   ├── input/                  # Glass-styled input
│   │   ├── label/                  # Label
│   │   ├── metric-pill/            # MetricPill stacked-pill primitive (V.W2 0601d62—composes MetricBadge)
│   │   ├── multi-select/           # Multi-select control
│   │   ├── notification/           # Notification surface (consumes success/warning/info-foreground tokens—V.W2)
│   │   ├── number-field/           # NumberField + subcomponents
│   │   ├── popover/                # Popover trigger/content
│   │   ├── progress/               # Progress bar (default + gradient variant)
│   │   ├── radio-group/            # RadioGroup, RadioGroupItem
│   │   ├── section/                # Section sectioning landmark (V.W3 d2247c8)—composes typography ladder
│   │   ├── select/                 # Select public compound wrappers
│   │   ├── separator/              # Separator (h/v)
│   │   ├── sheet/                  # Sheet side drawer + subcomponents
│   │   ├── skeleton/               # Loading skeleton (compositor-friendly transform-only shimmer—K WP)
│   │   ├── slider/                 # reka-ui SliderRoot wrapper (keepDockOpen contract—see Slider section)
│   │   ├── switch/                 # Switch
│   │   ├── table/                  # Table primitives
│   │   ├── tabs/                   # Tabs, list, trigger, content
│   │   ├── tags-input/             # TagsInput + subcomponents
│   │   ├── textarea/               # Textarea
│   │   ├── toast/                  # Toast exports
│   │   ├── toggle/                 # Toggle + toggleVariants CVA
│   │   ├── toggle-group/           # ToggleGroup, ToggleGroupItem
│   │   ├── tooltip/                # Tooltip provider/trigger/content (rounded-tooltip token)
│   │   └── index.ts                # barrel: all ui/ exports
│   ├── custom/                     # 35 custom package dirs (every dir has a package barrel)
│   │   ├── animated-digit/         # AnimatedDigit single-glyph reel (AB+1 / AC.W6d ergonomics)
│   │   ├── aurora/                 # Aurora WebGL background + useAurora composable (aurora chrome consumes useConfiguratorState<AuroraConfig> with cloneMode='per-preset'—see Configurator; L.W7 Lane B retired the prior parallel useAuroraStudio chrome)
│   │   ├── configurator/           # Configurator + ConfiguratorLayer + ConfiguratorRow + useConfiguratorState
│   │   ├── confirm-dialog/         # ConfirmDialog
│   │   ├── controls/
│   │   │   └── DarkModeToggle.vue  # animated sun/moon SVG (useGlobalDark)
│   │   ├── disco-glyph/            # DiscoGlyph 3-layer SVG glyph primitive
│   │   ├── dock/
│   │   │   ├── GlassDock.vue       # collapsible glass pill, dual-layer grid, horizontal | vertical, containerName prop (V.W2)
│   │   │   ├── DockLayerGroup.vue  # multi-layer container + optional switcher rail
│   │   │   ├── DockLayer.vue       # named pane inside a DockLayerGroup
│   │   │   ├── DockIconButton.vue
│   │   │   ├── DockTabButton.vue
│   │   │   ├── DockSelectTrigger.vue
│   │   │   ├── DockDropdownTrigger.vue
│   │   │   ├── composables/        # useDockState, useLayerTransition (axis-aware—see dock orientation)
│   │   │   └── index.ts
│   │   ├── dock-group/             # DockGroup chassis-strip wrapper
│   │   ├── expandable-container/   # ExpandableContainer
│   │   ├── glass-carousel/         # GlassCarousel + useGlassCarousel
│   │   ├── glass-panel/            # GlassPanel substrate wrapper
│   │   ├── glyph-face/             # GlyphFace 3-layer wrapper (phase-tinted backplate + cap)
│   │   ├── header-ribbon/          # HeaderRibbon—hover-tracking ribbon (O.W6 Lane A; subpath /header-ribbon)
│   │   ├── hover-popover/          # HoverPopover with hoverOpenDelay prop (renamed from openDelay—K W1)
│   │   ├── icon-tooltip/           # IconTooltip
│   │   ├── infinite-scroll/        # InfiniteScroll + composable
│   │   ├── instrument-chassis/     # InstrumentChassis + RegionDivider
│   │   ├── labeled-field/          # LabeledField parent + 4 wrappers (LabeledInput/Select/Slider/Switch)
│   │   ├── metric-badge/           # MetricBadge primitive
│   │   ├── metric-cell/            # MetricCell compact metric card (AB+1 / AC.W8e—wash-tier glass surface)
│   │   ├── metric-stack/           # MetricStack vertical metric grouping (AB+1 / AC.W6d—`as` prop TransitionGroup support)
│   │   ├── paper-backdrop/         # PaperBackdrop
│   │   ├── pulse/                  # Pulse (dots / ring) loading indicator
│   │   ├── responsive-tabs/        # ResponsiveTabs matchMedia Select↔UnderlineTabs swap (AB+1 / AC.W8e)
│   │   ├── scrolling-text/         # ScrollingText overflow-marquee (lifted from speedtest—v0.9.1)
│   │   ├── search/                 # Fuzzy search exports
│   │   ├── sidebar/                # ProgressiveSidebar + component-owned types only
│   │   ├── sortable-list/          # SortableList + list item helpers
│   │   ├── stacked-icons/          # StackedIcons
│   │   ├── status-dot/             # StatusDot
│   │   ├── tabs/                   # BouncyTabs, UnderlineTabs, BouncyToggle (active-state vocab canon—V.W3)
│   │   ├── timeline/               # GlassTimeline
│   │   ├── toggle-chip/            # segmented chip/cell toggle
│   │   ├── typewriter/             # TypewriterText
│   │   └── index.ts
│   └── index.ts                    # barrel: ui/ + custom/
├── composables/                    # v1.0 public composables—8 coherent sub-trees (L.W2 Lane A restructure)
│   ├── dark/                       # useGlobalDark (subpath canonical home—/dark; vueuse-bearing)
│   ├── keyboard/                   # useKeyboardShortcuts + registerShortcut + useRegisteredShortcuts
│   │                               # + formatCombo + formatComboParts + isMac + types
│   │                               # (subpath canonical home—/keyboard; vueuse-bearing)
│   ├── reactive/                   # useInterval, useTimer
│   ├── dom/                        # useResizeObserver, useTouchGate, useTokenColor
│   ├── motion/                     # useScrollProgress, useSpringOrchestrator, useStaggerReveal,
│   │                               # useAnimatedNumber, useAnimatedNumberMap, useStagger,
│   │                               # useDarkModeSync, useRAFLoop, useIntersectionPause
│   ├── glass/                      # useGlassRenderer + WebGL/WebGPU shader assets
│   ├── sortable/                   # useSortable
│   ├── sidebar/                    # useSidebarState, useSidebarFollow, useScrollTracker, useTreeIndex
│   └── index.ts                    # internal barrel—re-exports all 8 sub-trees + co-located
│                                   # infinite-scroll composable. Root barrel (`src/index.ts`)
│                                   # filters out dark/ + keyboard/ (vueuse-bearing) and consumes
│                                   # the vueuse-free leaves only; consumers reach dark/keyboard
│                                   # via flat `@mkbabb/glass-ui/dark` and `@mkbabb/glass-ui/keyboard`.
├── styles/
│   ├── index.css                   # imports all below in cascade order
│   ├── tokens.css                  # §1–§10: duration, easing, z-index, radius, shadows, glass, paper, colors
│   ├── theme.css                   # @theme block: Tailwind color/font/radius aliases + dark variant
│   ├── typography.css              # golden-ratio scale (√φ), semantic classes, font utilities
│   ├── glass.css                   # .glass-{wash,quiet,resting,floating,overlay} 5-rung ladder + .glass-card / .glass-pill / .glass-btn
│   ├── dock.css                    # .dock-icon-btn, .dock-select-trigger, .dock-separator, .dock-layer-grid, density-rail
│   ├── dock-group.css              # DockGroup chassis-strip rules
│   ├── disco-glyph.css             # DiscoGlyph layered fills + facet gradient
│   ├── glyph-face.css              # GlyphFace cap + backplate cascade
│   ├── hover-popover.css           # popover-animation grammar (V.W3)
│   ├── instrument-chassis.css      # chassis bezel + groove dividers + region rules
│   ├── cards.css                   # .paper-texture + @utility cartoon-surface (decoration-only; layers on a glass tier)
│   ├── paper.css                   # paper-underpaint + paper-grain-overlay utilities
│   ├── floating-panel.css          # .floating-panel, .floating-panel-item
│   ├── transitions.css             # Vue <Transition>: fade, fade-slide, pop, dialog-scale, dropdown, tab-fade
│   ├── animations.css              # @keyframes: dialog-in/out, floating-panel-in, collapsible, tooltip, shimmer, sparkle-sweep
│   └── utilities.css               # focus-ring, btn-press, btn-audacious (K W6), rainbow-text, touch-gate, etc.
└── utils/
    └── cn.ts                       # clsx + hand-rolled deduplicator (v0.9.2—replaces tailwind-merge)

```

## Conventions

- TypeScript `strict:true`, `verbatimModuleSyntax:true`
- `moduleResolution:bundler`, `target:ES2022`, `lib:ES2023`
- `import type` for all type-only imports
- Named exports only, no defaults
- All shadows use `hsl(var(--shadow-color) / alpha)` format
- Color palette as HSL channels: `--primary: 222.2 47.4% 11.2%`, consumed as `hsl(var(--primary))` in `@theme`

## Entry point

`src/index.ts` is the **v1.0 curated public barrel**—vueuse-free per L.W1 Lane A SCC trap closure. It re-exports the 37 vueuse-free `ui/` package barrels (4 vueuse-bearing packages—`input/`, `textarea/`, `combobox/`, `carousel/`—are reachable only via subpath), 7 cherry-picked `custom/` packages (`instrument-chassis`, `glyph-face`, `dock-group`, `disco-glyph`, `hover-popover`, `configurator`, `scrolling-text`), the vueuse-free composable sub-trees (`motion/`, `reactive/`, `dom/`, `glass/`, `sortable/`), and `cn()`. The cherry-pick rationale is documented inline in `src/index.ts` (header comment block; L.W2 Lane B). The remaining 24 `custom/` packages reach consumers only via their dedicated subpath (`@mkbabb/glass-ui/dock`, `/aurora`, `/sidebar`, `/header-ribbon`, ...). Sidebar state/follow/scroll/tree composables live under `src/composables/sidebar/`; component-owned types stay in `src/components/custom/sidebar/types.ts`.

## Dependencies

All runtime deps are peer:

| Package | Role |
|---------|------|
| `vue` ^3.5 | Framework |
| `reka-ui` ^2.0 | Headless UI primitives |
| `@vueuse/core` ^14.0 | useDark, createGlobalState, useEventListener |
| `tailwindcss` ^4.0 | Utility CSS |
| `class-variance-authority` ^0.7 | Component variant definitions |
| `clsx` ^2.0 | Conditional class joining (replaces tailwind-merge as of v0.9.2; cn() ships its own deduplicator) |
| `embla-carousel-vue` ^8.0 | Carousel substrate |
| `lucide-vue-next` ^0.525 | Icon set |
| `vaul-vue` ^0.2 | Drawer primitives |
| `@mkbabb/keyframes.js` ^2.0 | Spring/keyframe runtime |

## Path aliases (tsconfig)

```
@/*  → src/
```

## Subpath surface

v1.0 (L.W1) closed the vueuse SCC trap with a Phase 2 root-barrel curation. The shape is now three layers—a vueuse-FREE root barrel, 42 flat per-package subpaths, and a pure types/constants `@mkbabb/glass-ui/api` discovery layer.

```ts
// Root barrel—vueuse-FREE curated surface
import { Button, Card, Skeleton } from "@mkbabb/glass-ui";

// v1.0 NEW—vueuse-bearing surfaces moved to flat subpaths (L.W1 Lane C)
import { useGlobalDark } from "@mkbabb/glass-ui/dark";
import {
    useKeyboardShortcuts,
    registerShortcut,
    formatCombo,
    isMac,
} from "@mkbabb/glass-ui/keyboard";
import { useCarousel } from "@mkbabb/glass-ui/carousel";
import { Input, Textarea, Combobox } from "@mkbabb/glass-ui/forms";   // K.WS Phase 1 (preserved)

// v1.0 NEW—discovery layer for canonical public types + constants (L.W1 Lane B)
import type {
    AuroraConfig,
    ButtonVariants,
    CardTier,
    ConfiguratorState,
    SliderVariants,
} from "@mkbabb/glass-ui/api";
import { DEFAULT_AURORA_CONFIG, MAX_NUCLEI, MAX_STOPS } from "@mkbabb/glass-ui/api";

// Per-package subpaths—substrate isolation (one component family per dist chunk)
import { GlassDock, DockLayer, DockLayerGroup } from "@mkbabb/glass-ui/dock";
import { DarkModeToggle } from "@mkbabb/glass-ui/controls";
import { Aurora, useAurora } from "@mkbabb/glass-ui/aurora";
import {
    Configurator,
    ConfiguratorLayer,
    ConfiguratorRow,
    useConfiguratorState,
} from "@mkbabb/glass-ui/configurator";
import { HoverPopover } from "@mkbabb/glass-ui/hover-popover";
import { Sidebar } from "@mkbabb/glass-ui/sidebar";
import { GlassCarousel } from "@mkbabb/glass-ui/glass-carousel";
// + tokens, search, confirm-dialog, infinite-scroll, tabs, typewriter, stacked-icons,
//   metric-badge, status-dot, pulse, paper-backdrop, toggle-chip, glass-panel,
//   sortable-list, timeline, labeled-field, expandable-container,
//   icon-tooltip, instrument-chassis, glyph-face, dock-group, disco-glyph,
//   scrolling-text
```

CSS imports the unified bundle via `@mkbabb/glass-ui/styles`. Per `package.json` exports + `typesVersions["*"]`, glass-ui ships **41 flat JS subpaths** (36 component packages + `/api` + `/forms` + `/dark` + `/keyboard` + `/carousel`) plus the `/styles` CSS bundle (43 entries total in `package.json` exports including `./` root + `/styles`). Each `exports` entry carries the contract-v2 shape — `{ types, import, default }` for the `./` root, `{ types, import }` for the subpaths; no `development` condition (the AG glass-ui-core wave abrogated it). The `./freshness` subpath retired at AD.W4 (Decision 5): the runtime stale-dist gate is superseded by the cross-repo dev-resolution contract-v2 — every consumer resolves the built `dist/` in dev and prod alike, and every `@mkbabb/*` publisher runs `build:watch` so `dist/` is kept fresh while a consumer's dev server is up, so a stale `dist/` cannot mislead them. See `docs/precepts/cross-repo-dev-resolution.md` (invariant 30, contract-v2). Verified by `npm run verify-export-types` (release-script probe per L.W0 Lane III; unconditional since O.W5 Lane B+D) + the fail-closed `npm run proof:resolution` gate.

The v0.9.x nested subpaths `@mkbabb/glass-ui/composables/dark` + `@mkbabb/glass-ui/composables/keyboard` were RETIRED at v1.0—L invariant 4 (no backwards-compat aliases). Consumers migrate via one-line rename per call site; see `MIGRATION.md`. The `@mkbabb/glass-ui/pagination` and `@mkbabb/glass-ui/virtual` subpaths were RETIRED at L.W3 (0 production consumers; substrate-without-consumer-binary invariant).

### Subpath naming pairs (canonical)

Two name-pairs flag substrate boundaries; consumers pick the right one per the use case:

- `@mkbabb/glass-ui/dock` (GlassDock + DockLayer + DockLayerGroup + button/select/dropdown triggers) vs `@mkbabb/glass-ui/dock-group` (DockGroup chassis-strip wrapper—DIFFERENT primitive; not part of the GlassDock composite).
- `@mkbabb/glass-ui/glass-carousel` (custom-styled `<GlassCarousel>` composite) vs `@mkbabb/glass-ui/carousel` (vueuse-bearing `useCarousel` composable + embla-carousel-vue `CarouselApi` type—the underlying primitive `<Carousel>` family wraps this).

## Design Axes

The library binds these axes at v1.0 (L close):

1. **Token-first** (J invariant)—every visual behaviour is a CSS custom property; no consumer edits library source for styling.
2. **Component over CSS class** (J invariant)—interactive elements bundle the four-state contract; static patterns are CSS classes.
3. **Visual-load-bearing-ness** (J invariant 10)—substrate-without-consumer is binary at every close; primitives ship only when ≥ 2 consumers (or are formally retired with rationale). L invariant 8 freezes this at v1.0.
4. **No tranche-letter shadow execution** (K invariant 3)—work cohorts spanning ≥ 1 release ship under a `docs/tranches/<LETTER>/` plan folder. The V-tranche post-hoc write-up under `docs/tranches/V/` (K WV) closes the precept loop retroactively.
5. **Hardened agent git clause** (K W0—`docs/precepts/instructions/tranche/AGENT_DISPATCH_TEMPLATE.md`)—agents NEVER stage / commit / stash / checkout / reset / restore. Read-only git only; orchestrator owns the index.
6. **vueuse-FREE root barrel** (L.W1 HEADLINE)—the root barrel re-exports no symbol whose implementation imports `@vueuse/core`. The 4 vueuse-bearing surfaces reach consumers via flat subpaths: `/forms` (Input/Textarea/Combobox\*), `/dark` (useGlobalDark), `/keyboard` (keyboard-shortcuts registry), `/carousel` (useCarousel + Carousel\*). This is the canonical SCC-trap closure shape for downstream Rollup `manualChunks` consumers.
7. **Subpath publication is binary** (L.W0 Lane III)—`scripts/release.sh` runs `node -e 'import("@mkbabb/glass-ui/<sp>")' + tsc consumer-probe` for every published subpath before `git tag`. Closes the K.WS silent-miss class.
8. **Migration guide is binding** (L invariant 16)—v1.0 ships with `MIGRATION.md` documenting the canonical v0.9.x → v1.0 migration path. No legacy aliases.

## Component architecture

All `ui/` components follow the shadcn-vue pattern:

1. **Simple wrappers** (Card, Input): native element + `cn()` styling
2. **Primitive wrappers** (Button, Toggle): reka-ui `Primitive` + CVA variants
3. **Compound wrappers** (Dialog, Select, Slider): reka-ui sub-components + `useForwardPropsEmits`

CVA variants are co-exported from each component's `index.ts` (e.g., `buttonVariants`, `toggleVariants`, `badgeVariants`, `sliderVariants`, `menuItemVariants`).

Button variants: `default`, `primary-audacious` (K W6), `destructive`, `outline`, `secondary`, `accent`, `ghost`, `glass`, `glass-wash`, `ai`, `link`. All enforce four states: standard, hover, active (`scale-[var(--scale-press-btn)]`), disabled (`opacity-disabled`, `pointer-events-none`).

`primary-audacious` composes the canonical `@utility btn-audacious` recipe from `src/styles/utilities.css`—disco-grain texture + sparkle-sweep glyph + specular-highlight backplate, bound to `--primary` (phase-color decoupled per K W6 Option B; dock primary tier retains phase-tinting as a dock-local extension via `--phase-color` cascade).

### Tabs vs ToggleGroup

Reach for `<Tabs>` (or the custom `BouncyTabs`/`UnderlineTabs`) for **mutually-exclusive PANEL navigation**—`role="tablist"`, each tab reveals a distinct content panel and exactly one is active at a time. Reach for `<ToggleGroup>` for a set of **independent-or-single-select TOGGLES that mutate one surface**—`role="group"`, no panel swap, the toggles flip state on a shared view rather than switching between separate regions (a view-mode switcher over one result list is the canonical ToggleGroup case, not a Tabs case).

### Dock orientation and multi-layer

`GlassDock` takes an `orientation?: "horizontal" | "vertical"` prop (default `"horizontal"`). Horizontal docks animate `width` on expand/collapse and lay children out in a row; vertical docks animate `height` and stack children in a column. The prop is threaded through `useDockTransition` as its `axis` ref—both `useDockTransition` and `useLayerTransition` are axis-aware, keying their FLIP logic off a computed `dim` (`"width" | "height"`) rather than a hardcoded dimension. Vertical consumers just set the prop; no other consumer changes are required.

Beyond the built-in two-layer grid (the default slot + the `collapsed` slot), richer docks can compose `DockLayerGroup` with one or more `DockLayer` children:

```vue
<GlassDock orientation="vertical">
    <DockLayerGroup v-model:active="tab" orientation="vertical">
        <DockLayer id="assets" label="Assets" :icon="Package">...</DockLayer>
        <DockLayer id="layers" label="Layers" :icon="Layers">...</DockLayer>
        <DockLayer id="libs" label="Libraries" :icon="Library">...</DockLayer>
    </DockLayerGroup>
</GlassDock>
```

Each `DockLayer` registers itself with its parent via `provide`/`inject`; the group renders an optional Figma-style switcher rail from the registered descriptors (`showRail` + `railPosition`) and drives crossfade + size FLIP transitions between layers. Only the active layer is interactive—inactive layers receive `inert` and `pointer-events: none`.

#### GlassDock aria contract

The `GlassDock` root is **presentational**—a `<div class="glass-dock">` carrying layout/state data attributes (`data-density`, `data-held`, `data-container-name`) and pointer/focus listeners, but no ARIA role. `aria-expanded` MUST NOT be applied to the root: it has no interactive role, so the attribute is disallowed there and trips axe's `aria-allowed-attr` rule. `aria-expanded` belongs on the dock **trigger** child—the interactive control (`<button>`/`role="button"`) the user activates to open/collapse the dock—bound to the dock's exposed `expanded` state (reachable via `defineExpose`). Consumers that need an expand-state announcement wire `:aria-expanded` to their trigger button, not the dock wrapper. See `docs/tranches/AM/audit/W0-forms-a11y.md` (gap 3).

### Slider keep-dock-open contract

`<Slider>` exposes `keepDockOpen?: boolean` (default `true`). When a Slider is a descendant of a `<GlassDock>`, pointer-drag acquires a `dockKeepOpen` token for the duration of the gesture (preventing idle-collapse) AND the Slider subscribes to the dock's `dockHeld` computed and reflects it via `data-held` on its root for thumb-halo intensification. The contract is bidirectional and pointer-anchored—the Slider is the only consumer (Option B per K W7); keyboard- and discrete-button interactions on `<NumberField>` are not eligible because they have no continuous-interaction window. The cross-substrate proof story lives at `demo/stories/compositions/dock-with-slider.vue`.

### Drawer modes (detented · live-behind)

`<Drawer>` gains an additive `mode?: "modal" | "live-behind"` prop (default `"modal"`; AN.W3). The default modal sheet is unchanged—focus-trapped, page-behind `aria-hidden`, iOS scale-down backdrop. `mode="live-behind"` bundles three live-behind defaults at once—`modal: false` + `shouldScaleBackground: false` + `snapPoints: [0.12, 0.5, 1]`—so the peek/half/full bottom sheet over a live, still-interactive surface is a single-prop opt-in rather than three props the consumer has to remember. Every value the mode supplies is still overridable by an explicit prop (the mode only fills `props.x ?? modeDefault`). `DrawerContent` carries a companion `showOverlay?: boolean` (default `true`); the live-behind pattern passes `:show-overlay="false"` so the painted scrim does not occlude the surface behind. `Drawer*` stays on the **root barrel**—the W3 additions are prop/type-only (no vueuse dependency, no heavy isolated chunk), so no `/drawer` subpath is warranted; the `DrawerMode` type is co-exported from `src/components/ui/drawer/index.ts`.

vaul-vue owns the snap MATH (the drag-release spring, the `data-vaul-*` state attributes, `transition: transform .5s cubic-bezier(.32,.72,0,1)`); glass-ui owns the LOOK in `src/styles/drawer.css` (cascade rung 17, imported by `src/styles/index.css` so `/styles` ships it). The grammar is `.glass-drawer` (the glass sheet surface—`[data-vaul-snap-points="true"]` fills viewport height so a snap fraction reads as that fraction OF THE VIEWPORT), `.glass-drawer-handle`/`.glass-drawer-grip` (the rounded peek handle cycling peek → half → full), and `.glass-drawer-snap-rule` (an opt-in hairline a consumer adds to a detent-boundary separator). Every visual axis reads a `--drawer-*` custom property; consumers retune by overriding the rungs. **Upstream limitation (not a glass-ui bug):** vaul-vue does not reliably re-snap an ALREADY-OPEN sheet from an external `activeSnapPoint` write—its `activeSnapPoint` controllable shadows external prop writes once the gesture machinery has run. A programmatic detent set lands as the OPENING detent (which works); live re-snapping of an open sheet is a vaul-vue upstream fix. See `docs/tranches/AN/audit/W3-drawer-detents.md` §A.limitation.

### Role contracts on intrinsic primitives

`StatusDot` and `SortableHandle` are `<span>`-rooted primitives; a bare `<span aria-label>` with no role trips axe's `aria-prohibited-attr` rule (AN.W4). `StatusDot` now emits `role="img"` ONLY when the consumer binds `aria-label` (the decorative case stays role-free). `SortableHandle` on its default `as="span"` grip emits `role="button"` + `tabindex="0"` (the drag-affordance role); overriding `as="button"` drops both since the host tag carries them natively. Both reach the consumer's `:aria-label` via native single-root attr fall-through.

**NumberField label-binding contract.** axe's `label` rule fires on the inner `<input role="spinbutton">`, not on the NumberField group wrapper. Bind the accessible name on `<NumberFieldInput>` via one of three channels—`aria-label`, `aria-labelledby`, or a sibling `<Label for>` → `<NumberFieldInput id>`—each of which `NumberFieldInput.vue` (`inheritAttrs:false` + `v-bind="$attrs"`) lands on the focusable input. A `role="group"` wrapper carrying an `aria-label` does NOT propagate the name to the input; name the field itself for axe `label` compliance.

### InstrumentChassis phase canon

The `InstrumentChassisPhase` union (`ready | ping | download | upload | jitter | complete`) carries `"ping"` as the canonical generic-active phase—use it for any active-but-unspecialised state (scoring, validating, processing). The union does NOT carry a per-domain `"scoring"` member; a consumer maps its domain-active state onto `"ping"` (AN.W6—a speculative `"scoring"` member with no consumer would be overfit substrate). A phase-canon test enforces the union.

## Demo storybook chassis (demo-private)

`demo/stories/` ships canonical chassis primitives that are NOT exported from the library. Stories migrate to these instead of raw recipe triplets:

- `<StorySection>` (V.W4 deff97a)—label + body sectioning chassis.
- `<ShowcaseFrame>` (V.W4 8136baf)—pad knob over the rounded-card showcase chassis. Replaces the `rounded-card border bg-card shadow-cartoon` triplet across ~25-30 demo sites.
- `<TokenLadder>` + `<ToneSwatch>` (V.W4 cfbcb48)—token-tour primitives.
- `useStoryDemo` (V.W4 227e1b0; demoted to demo-private at L.W2 Lane A—now at `demo/composables/useStoryDemo.ts`, no longer on the library public surface)—canonical play/reset/status harness with cleanup discipline.

`<DockShowcaseFrame>` retired at L.W3 Lane B (zero consumers at HEAD; substrate-without-consumer-binary invariant per L invariant 8). Dock-tier demos use raw chassis recipes or `<ShowcaseFrame>` directly.

## Consumer wiring

Projects import styles via CSS, components and composables via JS:

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "@mkbabb/glass-ui/styles";
@source "../node_modules/@mkbabb/glass-ui/dist";   /* template-utility content-scan */
@variant dark (&:where(.dark, .dark *));

/* then override tokens locally */
:root {
    --glass-opacity-resting: 0.82;
    --glass-blur-resting: blur(12px);
}
```

**`tw-animate-css` is required for the animation grammar.** glass-ui's CSS `@apply`s the `animate-in`/`animate-out`/`fade-*`/`zoom-*` data-state utilities that Dialog, Sheet, Popover, and DropdownMenu emit; Tailwind v4 flags these as unknown utilities without the plugin. Consumers of those primitives must `npm install tw-animate-css` and add `@import "tw-animate-css";` to their CSS (shown above). It ships as an `optionalPeerDependency` so package tooling surfaces the hint without forcing a hard install on Button-only consumers; the `@import` is the binding requirement for anyone touching the animated surfaces.

**glass-ui's component templates emit Tailwind utility classes that the consumer's content-scan must reach.** The library's compiled templates (`dist/*.js` render functions) reference layout utilities (`h-full`, `w-full`, `shrink-0`, `flex-col`, …) and CVA variant classes (`text-destructive-foreground`, `rounded-pill`, …) as plain class strings. Tailwind v4 only generates a utility it FINDS during content scanning, and a consumer scanning only its own `src/` never sees glass-ui's. Add an `@source` directive pointing at the installed dist so Tailwind's scanner reaches the compiled templates (the path is relative to the CSS file the directive sits in—adjust the `../` depth to your project layout). Without it, glass-ui's components render with their layout/variant utilities silently absent—the same failure class as a missing `tw-animate-css`. This is a binding requirement for any consumer mounting glass-ui components (not just the `/styles` cascade); it composes with—does not replace—the `tw-animate-css` import. Option A (pre-generating the utilities into the dist `/styles` bundle) was rejected at AN.W2 on payload + pipeline-fragility grounds (≈22 KB-gzip of mostly-duplicated utilities + a brittle theme-context re-derivation); see `docs/tranches/AN/audit/W2-tailwind-utilities.md`. Note the v0.9.x second `@import "@mkbabb/glass-ui/styles.css"` line is no longer needed—AN.W1 folded the SFC scoped CSS into the single `@import "@mkbabb/glass-ui/styles"` (the `/styles` bundle now carries the token cascade AND the compiled SFC `<style scoped>` component CSS).

```ts
import { Button } from "@mkbabb/glass-ui";
import { GlassDock } from "@mkbabb/glass-ui/dock";
import { Configurator, useConfiguratorState } from "@mkbabb/glass-ui/configurator";
```

To avoid rewriting every import in a consumer project, replace each local `ui/<component>/index.ts` barrel with a re-export:

```ts
// demo/@/components/ui/button/index.ts
export { Button, buttonVariants, type ButtonVariants } from "@mkbabb/glass-ui";
```

### Subpath-import discipline

For a minimal payload, import from the **flat subpath** (`@mkbabb/glass-ui/button`), not the root barrel. The root `@mkbabb/glass-ui` barrel re-exports 37 `ui/` families + 7 cherry-picked `custom/` packages; a consumer build that has not been chunk-split will inline everything it reaches through that barrel into one chunk. The dist is a 76-entry per-subpath split (each `dist/<name>.js` tree-shakes independently), so `import { GlassDock } from "@mkbabb/glass-ui/dock"` pulls `dist/dock.js` + its shared leaves and never drags in the root barrel's reach. Per-subpath gzipped sizes are published in `docs/tranches/K/audit/W4-subpath-sizes.md` (regenerated by `npm run profile:bundle`) so a consumer can size each import choice—e.g. `@mkbabb/glass-ui/aurora` is a standalone ≈ 16 KiB-gzip WebGL chunk that the root barrel does NOT transitively reach.

### Vite 8 `manualChunks` recipe

To split glass-ui out of app code, use the Rolldown-compatible single-arg `manualChunks` form (Vite 8 surfaces it at the Rollup-compatible `build.rollupOptions.output.manualChunks` path):

```ts
build: {
    rollupOptions: {
        output: {
            manualChunks(id) {
                if (id.includes("@mkbabb/glass-ui")) return "glass-ui";
                if (id.includes("@vueuse")) return "vueuse";
                if (id.includes("node_modules")) return "vendor";
            },
        },
    },
}
```

Order matters—check `glass-ui` → `vueuse` → `vendor` so the `node_modules` catch-all does not swallow the two named splits (both `@mkbabb/glass-ui` and `@vueuse` resolve under `node_modules`). Caveat: Rolldown **ignores** `manualChunks` if `output.advancedChunks` is also set—do NOT set both. `advancedChunks` is the Rolldown-native escape hatch for forcing isolation of a hot subpath; the 76-entry split makes it unnecessary for the default case.
