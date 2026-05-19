# glass-ui

Shared glassmorphic design system: Vue 3.5 components, CSS design tokens, composables. Built on reka-ui + Tailwind CSS v4.

## Build

```
npm run build              # library → dist/glass-ui.js + glass-ui.css + index.d.ts + per-subpath chunks
npm run typecheck          # vue-tsc --noEmit
npm run profile:budget     # bundle-budget gate (re-landed K W4 Lane B); --enforce mode in CI
npm run verify-export-types # subpath dts publication probe (L W0 Lane III release-script clause)
```

The `build` script prefixes `NODE_OPTIONS=--max-old-space-size=8192` (P.W4 Lane A bake). `vite-plugin-dts` invokes `api-extractor` per library entry with `rollupTypes: true`; with the 44-entry matrix the per-entry type-graph walk allocates ≈6.7 GB peak RSS, which exceeds Node's default 4 GB heap. The 8 GB bump is the documented baseline rather than a release-script workaround — release.sh + ci.yml previously layered the env-var on top of `npm run build`; the bake makes the prefix the single canonical site (consumers and CI inherit it automatically). Root-cause profiling at P.W4 confirmed TypeScript + api-extractor are the dominant allocators (≈408 MiB of sampled allocations); a future upstream incremental-rollup fix in vite-plugin-dts ≥ 5.x may retire the bump.

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
│   │   ├── metaballs/              # WebGL metaball substrate (Configurator-recursion P0 absorbed—K W7)
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

`src/index.ts` is the **v1.0 curated public barrel**—vueuse-free per L.W1 Lane A SCC trap closure. It re-exports the 40 vueuse-free `ui/` package barrels (4 vueuse-bearing packages—`input/`, `textarea/`, `combobox/`, `carousel/`—are reachable only via subpath), 7 cherry-picked `custom/` packages (`instrument-chassis`, `glyph-face`, `dock-group`, `disco-glyph`, `hover-popover`, `configurator`, `scrolling-text`), the vueuse-free composable sub-trees (`motion/`, `reactive/`, `dom/`, `glass/`, `sortable/`), and `cn()`. The cherry-pick rationale is documented inline in `src/index.ts` (header comment block; L.W2 Lane B). The remaining 24 `custom/` packages reach consumers only via their dedicated subpath (`@mkbabb/glass-ui/dock`, `/aurora`, `/sidebar`, `/header-ribbon`, ...). Sidebar state/follow/scroll/tree composables live under `src/composables/sidebar/`; component-owned types stay in `src/components/custom/sidebar/types.ts`.

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
    MetaballConfig,
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
//   metaballs, sortable-list, timeline, labeled-field, expandable-container,
//   icon-tooltip, instrument-chassis, glyph-face, dock-group, disco-glyph,
//   scrolling-text
```

CSS imports the unified bundle via `@mkbabb/glass-ui/styles`. Per `package.json` exports + `typesVersions["*"]`, glass-ui ships **41 flat JS subpaths** (36 component packages + `/api` + `/forms` + `/dark` + `/keyboard` + `/carousel`) plus the `/styles` CSS bundle (43 entries total in `package.json` exports including `./` root + `/styles`). The `./freshness` subpath retired at AD.W4 (Decision 5): the runtime stale-dist gate is superseded by the canonical `"development"` conditional-exports branch already in place — dev consumers resolve to `src/` directly, so a stale `dist/` cannot mislead them. Verified by `npm run verify-export-types` (release-script probe per L.W0 Lane III; unconditional since O.W5 Lane B+D).

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

### Slider keep-dock-open contract

`<Slider>` exposes `keepDockOpen?: boolean` (default `true`). When a Slider is a descendant of a `<GlassDock>`, pointer-drag acquires a `dockKeepOpen` token for the duration of the gesture (preventing idle-collapse) AND the Slider subscribes to the dock's `dockHeld` computed and reflects it via `data-held` on its root for thumb-halo intensification. The contract is bidirectional and pointer-anchored—the Slider is the only consumer (Option B per K W7); keyboard- and discrete-button interactions on `<NumberField>` are not eligible because they have no continuous-interaction window. The cross-substrate proof story lives at `demo/stories/compositions/dock-with-slider.vue`.

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
@variant dark (&:where(.dark, .dark *));

/* then override tokens locally */
:root {
    --glass-opacity-resting: 0.82;
    --glass-blur-resting: blur(12px);
}
```

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
