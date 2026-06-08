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
│   └── index.ts                    # 72 canonical public symbols (69 types + 3 constants)—M.W2 + O.W4 + O.W6 + P.W1 + P.W2 + P.W3 + AQ.W4 + AQ.W5 + AU.W9 extensions; P.W0 + P.W6 resyncs (metric-cell/stack ship via subpath — speedtest consumer)
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
│   ├── custom/                     # 36 custom package dirs (every dir has a package barrel)
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
│   │   │   ├── DockBackgroundToggle.vue # WCAG-2.2.2 pause/play toggle for the AV backgrounds (AV.W7 G2)
│   │   │   ├── DockTabButton.vue
│   │   │   ├── DockSelectTrigger.vue
│   │   │   ├── DockDropdownTrigger.vue
│   │   │   ├── composables/        # useDockState, useLayerTransition (axis-aware—see dock orientation)
│   │   │   └── index.ts
│   │   ├── dialog-native/          # GlassDialogNative — native <dialog> wrapper
│   │   ├── expandable-container/   # ExpandableContainer
│   │   ├── glass-carousel/         # GlassCarousel + useGlassCarousel
│   │   ├── glass-panel/            # GlassPanel substrate wrapper
│   │   ├── glyph-face/             # GlyphFace 3-layer wrapper (phase-tinted backplate + cap)
│   │   ├── goo-blob/               # GooBlob WebGL2 metaball on the useWebGLCanvas substrate—injected ColorResolver (AU.W7; subpath /goo-blob)
│   │   ├── header-ribbon/          # HeaderRibbon—hover-tracking ribbon (O.W6 Lane A; subpath /header-ribbon)
│   │   ├── hover-popover/          # HoverPopover with hoverOpenDelay prop (renamed from openDelay—K W1)
│   │   ├── icon-tooltip/           # IconTooltip
│   │   ├── infinite-scroll/        # InfiniteScroll + composable
│   │   ├── instrument-chassis/     # InstrumentChassis + RegionDivider
│   │   ├── instrument-rail/        # InstrumentRail cockpit-ratio rail (AK-W2-α)
│   │   ├── labeled-field/          # LabeledField parent + 4 wrappers (LabeledInput/Select/Slider/Switch)
│   │   ├── metric-badge/           # MetricBadge primitive
│   │   ├── metric-cell/            # MetricCell compact metric card (subpath /metric-cell; speedtest consumer)
│   │   ├── metric-stack/           # MetricStack + MetricRow vertical metric grouping (subpath /metric-stack; speedtest consumer)
│   │   ├── paper-backdrop/         # PaperBackdrop
│   │   ├── pulse/                  # Pulse (dots / ring) loading indicator
│   │   ├── scrolling-text/         # ScrollingText overflow-marquee (lifted from speedtest—v0.9.1)
│   │   ├── search/                 # Fuzzy search exports
│   │   ├── sortable-list/          # SortableList + list item helpers
│   │   ├── stacked-icons/          # StackedIcons
│   │   ├── status-dot/             # StatusDot
│   │   ├── tabs/                   # SegmentedTabs—ONE component, variant axis (segmented·pill·underline), multi-select + responsive collapse, ONE elastic indicator on --spring-snappy (AX.W53 unified BouncyToggle/BouncyTabs/UnderlineTabs/ResponsiveTabs; composables/useTabIndicator)
│   │   ├── timeline/               # GlassTimeline + Continuous{Timeline,Rail,Markers} (AU.W10 split the 901-line orchestrator)
│   │   ├── toggle-chip/            # segmented chip/cell toggle
│   │   ├── typewriter/             # TypewriterText
│   │   ├── watercolor-dot/         # WatercolorDot CSS/SVG blob—internalized per-instance filter + seeded prng (AU.W7; subpath /watercolor-dot)
│   │   └── index.ts
│   └── index.ts                    # barrel: ui/ + custom/
├── composables/                    # v1.0 public composables—9 coherent sub-trees (L.W2 Lane A restructure; AU.W5 added color/)
│   ├── color/                      # OKLCh primitives + ColorResolver seam (value.js-only leaf—subpath /color; AU.W5)
│   ├── context/                    # createStrictContext<T>()/createOptionalContext<T>() canonical DI factory pair (AV.W14; internal—the dock/dock-layer/toggle-group/sortable/glyph-face/configurator provide-inject triplets collapse onto it)
│   ├── dark/                       # useGlobalDark({initialValue}) + darkModeSyncScript()/installDarkModeSync() FOUC (subpath /dark; vueuse-bearing; AU.W9)
│   ├── keyboard/                   # useKeyboardShortcuts + registerShortcut + useRegisteredShortcuts
│   │                               # + formatCombo + formatComboParts + isMac + types
│   │                               # (subpath canonical home—/keyboard; vueuse-bearing)
│   ├── reactive/                   # useInterval, useTimer
│   ├── dom/                        # useResizeObserver, useTouchGate, useTokenColor
│   ├── motion/                     # useScrollProgress, useSpringOrchestrator, useStaggerReveal,
│   │                               # useAnimatedNumber, useAnimatedNumberMap, useStagger,
│   │                               # useDarkModeSync, useRAFLoop, useIntersectionPause,
│   │                               # useCountup (AV.W3—editorial [data-countup] walker on the
│   │                               # keyframes NumericAnimation engine; keyframes-bearing → /motion only),
│   │                               # vReveal (AV.W3—dependency-free [data-reveal]/--d entrance
│   │                               # directive; on /motion-core + root barrel),
│   │                               # useViewTransition (AQ.W5—the startViewTransition
│   │                               # substrate; dependency-free, on /motion-core + root barrel)
│   ├── glass/                      # useGlassRenderer + useWebGLCanvas substrate (AU.W6) + WebGL/WebGPU shader assets + webgl/shaders/procedural-color.glsl.ts (AV.W2 — the shared OETF + Ottosson OKLCh matrices + FBM_ROT chunk aurora.frag.ts & metaball.frag.ts both splice)
│   ├── sortable/                   # useSortable
│   ├── sidebar/                    # useSidebarState, useSidebarFollow, useScrollTracker, useTreeIndex
│   └── index.ts                    # internal barrel—re-exports all 8 sub-trees + co-located
│                                   # infinite-scroll composable. Root barrel (`src/index.ts`)
│                                   # filters out dark/ + keyboard/ (vueuse-bearing) and consumes
│                                   # the vueuse-free leaves only; consumers reach dark/keyboard
│                                   # via flat `@mkbabb/glass-ui/dark` and `@mkbabb/glass-ui/keyboard`.
├── subpaths/                       # AV.W5.A — the 58 TRIVIAL one-line per-package subpath
│                                   # mirror barrels (each `export * from "../components/<…>"`
│                                   # or `"../composables/<…>"`). BATCH-RESOLVED in
│                                   # vite.library.ts (glob src/subpaths/*.ts) so a new subpath
│                                   # barrel never has to be hand-added. The 10 CURATED
│                                   # multi-line barrels (index/tokens/forms/dark/keyboard/
│                                   # carousel/motion/motion-core/sidebar/infinite-scroll) + api/
│                                   # STAY at src/ top level (SCC-aware curation, not a mirror
│                                   # line). Zero surface delta: the same dist/<name>.js chunk set
│                                   # emits; flatten-subpath-types.mjs keeps dist/<name>.d.ts flat.
├── styles/
│   ├── index.css                   # imports all below in cascade order
│   ├── tokens.css                  # §1–§10: duration, easing, z-index, radius, shadows, glass, paper, colors
│   ├── theme.css                   # @theme block: Tailwind color/font/radius aliases + dark variant
│   ├── typography.css              # golden-ratio scale (√φ), semantic classes, font utilities
│   ├── glass.css                   # .glass-{wash,quiet,resting,floating,overlay} 5-rung ladder + .glass-card / .glass-pill / .glass-btn
│   ├── dock.css                    # dock shell/density/grain/layer-crossfade contract + .dock-separator, .dock-layer-grid + shared cross-control four-state comma-groups
│   ├── dock-controls.css           # the five dock CONTROL families carved from dock.css (AU.W8b.3): .dock-icon-button, .dark-mode-toggle-button, .dock-tab-button + tiers, .dock-select-trigger/.dock-dropdown-trigger, coarse-pointer touch floor
│   ├── disco-glyph.css             # DiscoGlyph layered fills + facet gradient
│   ├── glyph-face.css              # GlyphFace cap + backplate cascade
│   ├── hover-popover.css           # popover-animation grammar (V.W3)
│   ├── instrument-chassis.css      # chassis bezel + groove dividers + region rules
│   ├── cards.css                   # .paper-texture + @utility cartoon-surface (decoration-only; layers on a glass tier)
│   ├── paper.css                   # paper-underpaint + paper-grain-overlay utilities
│   ├── floating-panel.css          # .floating-panel, .floating-panel-item
│   ├── transitions.css             # Vue <Transition>: fade, fade-slide, pop, dialog-scale, dropdown, tab-fade
│   ├── animations.css              # @keyframes: dialog-in/out, floating-panel-in, collapsible, tooltip, shimmer, sparkle-sweep; §TOP-LAYER @starting-style entry/exit grammar (AQ.W5—.glass-top-layer)
│   ├── scroll-driven.css           # AQ.W5—native scroll-driven recipes (.scroll-progress scroll(), [data-scroll-reveal] view()); @supports-gated primary over the JS-composable fallback
│   ├── view-transition.css         # AQ.W5—.gl-list-item View-Transitions group recipe + --vt-* axes (the useViewTransition substrate's CSS half)
│   └── utilities.css               # focus-ring, btn-press, btn-audacious (K W6), btn-audacious-gold (AN.R0—the gold CTA), btn-interactive, btn-glass (AX.W52—real glass blur for the glass button variants), rainbow-text, touch-gate, etc.
└── utils/
    ├── cn.ts                       # clsx + hand-rolled deduplicator (v0.9.2—replaces tailwind-merge)
    └── prng.ts                     # shared seeded PRNG leaf—mulberry32 + hashString single-source (AV.W14; watercolor-dot + goo-blob import it; watercolor keeps its border-radius helpers local)

```

Tests live in a top-level `tests/` tree that MIRRORS `src/` (AV.W14—NO test files under `src/`, enforced by `proof:no-test-in-src`). A spec at `src/<P>/__tests__/foo.test.ts` lives at `tests/<P>/foo.test.ts`; relative imports route through `../…/src/<P>/…` (the `@/*` alias is retired—relative imports across the repo per v0.8.2). The shader-validation fixture `metaball-color.glsl-port.ts` rides with its tests (`tests/components/custom/goo-blob/`). `vitest.config.ts` globs `tests/**` + `scripts/**`. The two gates that read a relocated test as a canary/consumer-#2 fixture (`proof:single-color-core`, `proof:webgl-substrate-single`) and the two test-running proof scripts (`proof:dock-a11y-contract`, `proof:blob-color-equivalence`) point at the `tests/` paths.

## Conventions

- TypeScript `strict:true`, `verbatimModuleSyntax:true`
- `moduleResolution:bundler`, `target:ES2022`, `lib:ES2023`
- `import type` for all type-only imports
- Named exports only, no defaults
- All shadows compose via `color-mix(in srgb, var(--shadow-color) N%, transparent)` over `--shadow-color: var(--foreground)` (tokens.css §7).
- Color tokens are complete `hsl()` colors: `--primary: hsl(24 10% 10%)`, consumed directly as `var(--primary)`. NEVER `hsl(var(--token))` (the token is already a color — double-wrapping is invalid and never paints). For an alpha derivative use `color-mix(in srgb, var(--token) N%, transparent)` (the `--surface-tint-*` / `--border-soft` house pattern).
- **`color-mix(in srgb …)` over `in oklab` for the surface-tint family — DELIBERATE (AW.W26).** The `--surface-tint-*` ladder generates a foreground-over-transparent overlay (`color-mix(in srgb, var(--foreground) N%, transparent)`). mwg `css §8` prefers `in oklab` for tint GENERATION (perceptually uniform mixing), but glass-ui's tints are hand-tuned at fixed α stops against a warm-ink `--foreground` over a cream substrate: `in srgb` is the brand-calibrated mix the whole token ladder + the shadow family already speak, and switching the interpolation space would shift every resting border/wash α off its hand-set value. The `in srgb` choice is the house identity, recorded here — not drift to "fix" to `in oklab`. (Aurora/blob shaders that DO want perceptual interpolation run OKLCh in-shader; that is the separate, correct oklab path.)
- **`cn()` is a deliberate hand-rolled deduplicator keep (AW.W26).** `src/utils/cn.ts` is `clsx` + a hand-rolled conflict-bucket deduplicator (replaced `tailwind-merge` at v0.9.2). It is NOT a gap to "upgrade" back to `tailwind-merge`. The CVA bases' arbitrary-selector icon tokens (`[&_svg:not([class*=size-])]:size-4`) and `has-[>svg]:px-3` pass through untouched (they match no conflict bucket — correct); a host-sized icon (`size-9`) does NOT false-merge against the base `size-4` because the `:not([class*=size-])` guard scopes the base rule to un-sized icons only.
- **The `.focus-ring` CSS utility over inline `focus-visible:ring-*` is a token-first DIVERGENCE, not drift (AW.W26).** Every interactive atom composes the `.focus-ring` utility (`utilities.css`, keyed off `--focus-ring-shadow`) rather than the shadcn-vue inline `focus-visible:ring-2 ring-ring` Tailwind chain. This is deliberate: ONE token (`--focus-ring-shadow`) re-tints every focus ring library-wide from a single override, the token-first axis. Do not swap it to the inline ring chain.

### Cartoon-shadow override contract

glass-ui ships `--shadow-cartoon-{sm,md,lg}` as its **own identity tokens** (the Memphis-sticker offset-stamp shadow). The canonical chain is `tokens.css` (raw value + the `--cartoon-shadow-*` alias) → `theme.css` `@theme` bridge (`--shadow-cartoon-lg: var(--cartoon-shadow-lg)`, the namespace var a Tailwind `shadow-cartoon-lg` utility resolves through) → `utilities.css` (`.shadow-cartoon-{sm,md,lg} { box-shadow: var(--shadow-cartoon-*) }`) → `cards.css` (`@utility cartoon-surface` consumes `var(--shadow-cartoon-md)` at rest + `var(--shadow-cartoon-lg)` on hover; `<Card surface="cartoon">` composes it).

A consumer retints the cartoon shadow by **overriding the `:root` token** — `:root { --shadow-cartoon-lg: <value>; }` — which re-resolves *every* `.shadow-cartoon-lg` utility + `cartoon-surface` site with **zero library edit**. The anti-pattern is **re-declaring the token name as a dead local orphan** that sits OFF the cascade path glass-ui's utilities read (a `feedback-coder/theme.css`-style local `--shadow-cartoon-lg: 7px 7px` block that never reaches the `@theme`-bridged utility and so never paints). Override on the cascade; never re-declare a dead local.

The cartoon shadow is **token-adaptive under `.dark` BY CONSTRUCTION**: each `--shadow-cartoon-*` value rides `color-mix(in srgb, var(--shadow-color) N%, transparent)` and `--shadow-color: var(--foreground)` flips light→dark, so the offset stamp re-tints under `.dark` with no hardcoded `.dark` re-declaration of `--shadow-cartoon-lg` (the `.dark` block re-resolves `--foreground`/`--shadow-color`, which is a legitimate token re-resolution, not a dead orphan). Presets-in-consumers: named themed cartoon-shadow presets live in the consumer; the library's `--shadow-cartoon-*` is its own identity. Machine-locked by `proof:shadow-contract` (CHAIN-INTACT + OVERRIDE-RESOLVES + DARK-ARM-ALLOWED).

## Entry point

`src/index.ts` is the **v1.0 curated public barrel**—vueuse-free per L.W1 Lane A SCC trap closure. It re-exports the 37 vueuse-free `ui/` package barrels (4 vueuse-bearing packages—`input/`, `textarea/`, `combobox/`, `carousel/`—are reachable only via subpath), 7 cherry-picked `custom/` packages (`instrument-chassis`, `instrument-rail`, `glyph-face`, `disco-glyph`, `hover-popover`, `configurator`, `scrolling-text`), the vueuse-free composable sub-trees (`motion/`, `reactive/`, `dom/`, `glass/`, `sortable/`), and `cn()`. The cherry-pick rationale is documented inline in `src/index.ts` (header comment block; L.W2 Lane B). The remaining 26 `custom/` packages reach consumers only via their dedicated subpath (`@mkbabb/glass-ui/dock`, `/aurora`, `/sidebar`, `/header-ribbon`, ...). Sidebar state/follow/scroll/tree composables live under `src/composables/sidebar/`; the `custom/sidebar/` component dir was retired (AI.W5-δ; zero external SFC consumers) and its types relocated to `src/composables/sidebar/types.ts`. The `Sidebar` surface now reaches consumers via the `/sidebar` subpath (`src/sidebar.ts` → the composables barrel).

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
| `@lucide/vue` ^1.16.0 | Icon set (the renamed v1 package; was `lucide-vue-next` ^0.x pre-v1.0) |
| `vaul-vue` ^0.4 | Drawer primitives |
| `tw-animate-css` ^1.2.5 | `animate-in`/`animate-out` data-state utilities (optionalPeer) |
| `@mkbabb/keyframes.js` ^2.2.0 \|\| ^3.0.0 | Spring/keyframe runtime |
| `@mkbabb/value.js` ^0.10.0 | Color/value normalization (keyframes peer transitive) |

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
//   icon-tooltip, instrument-chassis, glyph-face, disco-glyph,
//   scrolling-text
```

CSS imports the unified bundle via `@mkbabb/glass-ui/styles`. Per `package.json` exports + `typesVersions["*"]`, glass-ui ships **70 flat JS subpaths** (the component-package families + `/api` + `/forms` + `/dark` + `/keyboard` + `/carousel` + the composable subtrees) plus the CSS/font bundle entries (`./styles`, `./styles/fonts`, `./styles.css`, `./fonts/*`) — 75 entries total in `package.json` exports including the `./` root. Each `exports` entry carries the contract-v2 shape — `{ types, import, default }` for the `./` root, `{ types, import }` for the subpaths; no `development` condition (the AG glass-ui-core wave abrogated it). The `./freshness` subpath retired at AD.W4 (Decision 5): the runtime stale-dist gate is superseded by the cross-repo dev-resolution contract-v2 — every consumer resolves the built `dist/` in dev and prod alike, and every `@mkbabb/*` publisher runs `build:watch` so `dist/` is kept fresh while a consumer's dev server is up, so a stale `dist/` cannot mislead them. See `docs/precepts/cross-repo-dev-resolution.md` (invariant 30, contract-v2). Verified by `npm run verify-export-types` (release-script probe per L.W0 Lane III; unconditional since O.W5 Lane B+D) + the fail-closed `npm run proof:resolution` gate.

The v0.9.x nested subpaths `@mkbabb/glass-ui/composables/dark` + `@mkbabb/glass-ui/composables/keyboard` were RETIRED at v1.0—L invariant 4 (no backwards-compat aliases). Consumers migrate via one-line rename per call site; see `MIGRATION.md`. The `@mkbabb/glass-ui/pagination` and `@mkbabb/glass-ui/virtual` subpaths were RETIRED at L.W3 (0 production consumers; substrate-without-consumer-binary invariant).

### Subpath naming pairs (canonical)

One name-pair flags a substrate boundary; consumers pick the right one per the use case:

- `@mkbabb/glass-ui/glass-carousel` (custom-styled `<GlassCarousel>` composite) vs `@mkbabb/glass-ui/carousel` (vueuse-bearing `useCarousel` composable + embla-carousel-vue `CarouselApi` type—the underlying primitive `<Carousel>` family wraps this).

(The `@mkbabb/glass-ui/dock-group` `DockGroup` chassis-strip wrapper was a third pair member alongside `/dock`; it was retired with its `custom/dock-group/` dir + `dock-group.css` + subpath export — no consumer at HEAD.)

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

Button variants: `default`, `primary-audacious` (K W6), `gold-audacious` (AN.R0; the gold "→ Next" CTA), `destructive`, `outline`, `secondary`, `accent`, `ghost`, `glass`, `glass-wash`, `ai`, `link`. All enforce four states: standard, hover, active (`scale-[var(--scale-press-btn)]`), disabled (`opacity-disabled`, `pointer-events-none`).

`primary-audacious` composes the canonical `@utility btn-audacious` recipe from `src/styles/utilities.css`—disco-grain texture + sparkle-sweep glyph + specular-highlight backplate, bound to `--primary` (phase-color decoupled per K W6 Option B; dock primary tier retains phase-tinting as a dock-local extension via `--phase-color` cascade).

`gold-audacious` extends `btn-audacious` with the `@utility btn-audacious-gold` gold-sweep hover (a translucent `--color-gold-*` linear-gradient over the paper-grain, the `--glass-specular` top-edge catch-light, and the `btn-gold-bg-sweep` shimmer—PRM-gated; rest text is warm-ink `--foreground`, hover/active flips to white over the saturated gold backplate, per the AW.W13 contrast contract gated by `proof:affordance-contrast`). It is the D19 liquid-glass MODEL—a thin edge catch-light over a diffuse central bloom, hover-gated over always-on, `background-blend-mode` (isolation-safe, Safari-clean) over `mix-blend-mode`. Speedtest consumes the library `btn-audacious-gold` utility via a class binding (inv-16; no local redefinition). The hover/press scale rides `--scale-hover-btn` on `--spring-smooth` per the §6 easing doctrine.

**Easing doctrine (AX.W52 §6).** ONE recorded rule for which easing fits which job, formalizing the already-correct `transitions.css` idiom (full table in `tokens.css §2` header): surface props (bg/border/color/box-shadow/opacity) → `--ease-standard` (bezier—a colour cross-fade reads as a wobble on a spring); transform hover/press/active (scale/translate/rotate) → `--spring-smooth` (the ONE button/interactive scale register—`.btn-pill`/`.tap-squish`/`.glass-btn`/`btn-interactive` all settle on it, ζ=0.86 sub-perceptual peak so press still reads alive without a visible bounce); enter (mount/popover/dialog) → `--spring-bouncy`/`--spring-snappy`; exit (unmount/close) → `--ease-out`/`--ease-standard` (bezier, NO overshoot—an exit must never overshoot past gone); position-tracked (specular pointer) → `--ease-standard`. The button hover-visual channel (bg/border/color/shadow + scale) is UNIFIED onto this one register so the lift reads as ONE coherent glide, not a fast-color-snap-then-slow-spring desync (the prior cascade bug: `.tap-squish`'s scale-only `transition` shorthand clobbered `.btn-pill`'s surface legs, so every button transitioned ONLY scale—both classes now carry the full coherent set).

### Tabs vs ToggleGroup

Reach for `<Tabs>` (or the custom `<SegmentedTabs variant="underline">`) for **mutually-exclusive PANEL navigation**—`role="tablist"`, each tab reveals a distinct content panel and exactly one is active at a time. Reach for `<ToggleGroup>` (or `<SegmentedTabs :multi-select>`) for a set of **independent-or-single-select TOGGLES that mutate one surface**—`role="group"`, no panel swap, the toggles flip state on a shared view rather than switching between separate regions (a view-mode switcher over one result list is the canonical ToggleGroup case, not a Tabs case).

### SegmentedTabs (AX.W53)

`<SegmentedTabs>` (`@mkbabb/glass-ui/tabs`) is the unified spring-slider tab family—ONE component, a three-value `variant` axis (`segmented` DEFAULT · `pill` · `underline`), and ONE shared elastic indicator. The indicator GLIDES on `--spring-snappy` (the confirmed iOS segmented register) AND SQUISHES on travel: a volume-preserving stretch along its travel axis (`scale: var(--stretch) calc(1 / var(--stretch))`, the X/Y reciprocal pairing) capped LOW by `--tab-indicator-max-stretch` (default `1.08`, ≈+8%), released back to fit on the same snappy clock (the Material 3 ELASTIC / Apple Liquid-Glass "grow then shrink" register). **ARIA-role-per-variant** (load-bearing): `underline` is panel-nav (`role="tablist"`/`role="tab"` + `aria-selected`); `segmented`/`pill` are the ToggleGroup-shaped surface (`role="group"` + `aria-pressed`). `:multi-select` (segmented/pill only) drives N simultaneous pressed segments off the same engine. `:responsive` (`true` or `{ breakpoint, desktopOptions, ariaLabel, triggerClass }`) collapses the strip to a `<Select>` below the breakpoint. It SUBSUMES the former `BouncyToggle`/`BouncyTabs`/`UnderlineTabs`/`ResponsiveTabs`—clean break, no alias. The squish is `prefers-reduced-motion`-gated (no deform under reduce). Machine-locked by `proof:tabs-unified`.

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

#### DockBackgroundToggle (WCAG 2.2.2 pause/play)

`DockBackgroundToggle` is the Level-A (WCAG 2.2.2 Pause, Stop, Hide) control for a continuously-running AV background (`Aurora`/`GooBlob`)—auto-starting, >5s, non-essential motion is obligated to carry a user-reachable stop control, available to ALL users (NOT gated behind `prefers-reduced-motion`, which the `useWebGLCanvas` substrate handles separately via its live PRM freeze). It is a thin `v-model:paused` `<DockIconButton>` host reflecting state via `aria-pressed` + a Pause↔Play glyph/label swap. KISS—it binds the EXISTING renderer seam: the consumer wires `@update:paused` → the renderer's `pause()`/`resume()` (GooBlob exposes both; Aurora's `useAurora` does too). It adds no parallel pause path. (AV.W7 G2.)

#### WebGL substrate offscreen-pause + reduced-motion (AV.W7)

`useWebGLCanvas` (the shared WebGL2 substrate Aurora + GooBlob compose) PARKS its rAF loop when its host is content-hidden (`content-visibility:auto` + `contentvisibilityautostatechange`), scrolled offscreen (the consumer's `useIntersectionPause` `rootMargin:200px` seam), or its tab is backgrounded (`document.hidden`)—all ORed onto the existing `shouldContinue()`/`isRunning()` park machinery, so an offscreen/hidden surface attaches zero frames. It also OWNS + LIVE-MONITORS `prefers-reduced-motion: reduce` (a `matchMedia` `change` listener) and paints ONE static frame then parks under reduce—every surface on the substrate inherits the freeze + the re-monitor (a CSS reset cannot reach the WebGL rAF). The aurora/blob hosts carry `contain` (aurora `content`, blob `layout style`—the blob's satellites overflow). Gated by `proof:offscreen-pause`.

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

### Configurator contract

`Configurator` + `ConfiguratorLayer` + `ConfiguratorRow` + `useConfiguratorState` compose a preset-driven controls column (`@mkbabb/glass-ui/configurator`; also on the root barrel). Four shipped behaviours:

- **`ConfiguratorLayer` `dividers` prop** (`dividers?: boolean`)—opt-in per-section hairline (`border-t border-border/30` between sibling rows; the first row stays flush). Section **rounding is owned at the container-root clip** (`Configurator.vue` `rounded-panel` + `overflow-hidden`), NOT per-section: a per-section radius on a transparent border-only element would deform the straight `border-b` divider, so flush sections keep straight dividers by design.

- **`ConfiguratorRow` density cascade**—a four-rung density axis (`mobile` | `compact` | `comfortable` | `spacious`) resolved **local-prop-over-inject**: the row's `density` prop wins; the `<Configurator>`-injected `ComputedRef<ConfiguratorDensity>` is the fallback; `undefined` keeps the baked-in `gap-1.5 py-2` recipe and emits no `data-density` (pre-density visual preserved). `comfortable` is functionally the no-density default (an explicit restatement). A resolved density emits `data-density="…"` driving the token-override CSS, with an `@container style(--density: X)` companion so a host setting `--density` on any ancestor retunes every descendant row's gap/padding without the `data-density` markup contract.

- **`useConfiguratorState` `cloneMode` semantics** (`ConfiguratorCloneMode = "commit-on-write" | "per-preset"`)—`commit-on-write` (default) keeps one live `config`; `selectPreset(key)` overwrites it, so edits are lost when the user switches away. `per-preset` allocates an independent live clone per preset slot; `selectPreset` snapshots the outgoing slot before loading the named one, so slider edits **persist per slot across switches** (`resetCurrent` re-clones the active slot from the preset definition).

- **Per-preset rationale.** Aurora consumes `cloneMode="per-preset"` because its chrome treats each preset as a **named editable baseline** the user tunes and returns to (slider edits must survive a preset round-trip). The blob uses the default `commit-on-write`—a single-surface shape where a preset switch is a clean reset. Aurora also **hand-authors `DockLayerGroup` + `DockLayer` chrome** rather than stacking `ConfiguratorLayer`s—a DESIGN CHOICE, not a gap: layer switching + crossfades exceed `ConfiguratorLayer`'s single-section collapse pattern.

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

**`tw-animate-css` is required for the animation grammar.** glass-ui's CSS `@apply`s the `animate-in`/`animate-out`/`fade-*`/`zoom-*` data-state utilities that Dialog, Sheet, Popover, and DropdownMenu emit; Tailwind v4 flags these as unknown utilities without the plugin. Consumers of those primitives must `npm install tw-animate-css` and add `@import "tw-animate-css";` to their CSS (shown above). It ships as an optional peer (a `peerDependencies` entry flagged `peerDependenciesMeta["tw-animate-css"].optional = true`) so package tooling surfaces the hint without forcing a hard install on Button-only consumers; the `@import` is the binding requirement for anyone touching the animated surfaces.

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
