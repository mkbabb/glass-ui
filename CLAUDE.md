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
│   ├── custom/                     # 36 custom package dirs (every dir has a package barrel). FEATURE-DIR COLOCATION (AY.W-COLOCATE): a complex component is a sub-component dir — components at root, composables under `composables/`, constants in `constants.ts`, shaders in `shaders/`, skeletons in `skeleton/` (each "if needed"), + a `README.md`. Enforced by `proof:colocation`; the idiom home + the CSS half are docs/precepts/design-idioms.md.
│   │   ├── animated-digit/         # AnimatedDigit single-glyph reel (AB+1 / AC.W6d ergonomics)
│   │   ├── aurora/                 # Aurora WebGL background + useAurora composable (aurora chrome consumes useConfiguratorState<AuroraConfig> with cloneMode='per-preset'—see Configurator; L.W7 Lane B retired the prior parallel useAuroraStudio chrome)
│   │   ├── configurator/           # Configurator + ConfiguratorLayer + ConfiguratorRow + useConfiguratorState
│   │   ├── confirm-dialog/         # ConfirmDialog
│   │   ├── controls/
│   │   │   └── DarkModeToggle.vue  # animated sun/moon SVG (useGlobalDark)
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
│   │   ├── expandable-container/   # ExpandableContainer
│   │   ├── goo-blob/               # GooBlob WebGL2 metaball on the useWebGLCanvas substrate—injected ColorResolver (AU.W7; subpath /goo-blob)
│   │   ├── hover-popover/          # HoverPopover with hoverOpenDelay prop (renamed from openDelay—K W1)
│   │   ├── icon-tooltip/           # IconTooltip
│   │   ├── infinite-scroll/        # InfiniteScroll + composable
│   │   ├── instrument-chassis/     # InstrumentChassis + RegionDivider
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
│   ├── context/                    # createStrictContext<T>()/createOptionalContext<T>() canonical DI factory pair (AV.W14; internal—the dock/dock-layer/toggle-group/sortable/configurator provide-inject triplets collapse onto it)
│   ├── dark/                       # useGlobalDark({initialValue}) + darkModeSyncScript()/installDarkModeSync() FOUC (subpath /dark; vueuse-bearing; AU.W9)
│   ├── keyboard/                   # useKeyboardShortcuts + registerShortcut + useRegisteredShortcuts
│   │                               # + formatCombo + formatComboParts + isMac + types
│   │                               # (subpath canonical home—/keyboard; vueuse-bearing)
│   ├── reactive/                   # useInterval, useTimer
│   ├── dom/                        # useResizeObserver, useTouchGate, useTokenColor
│   ├── motion/                     # useScrollProgress, useSpring, useSpringMount, useSpringPress,
│   │                               # useStaggerReveal, useStagger, useAnimatedNumber,
│   │                               # useAnimatedNumberMap, useNumericTransition, useTextHighlight,
│   │                               # useRAFLoop, useIntersectionPause, usePrioritizedTask,
│   │                               # useYieldToMain, supportsCssTimeline,
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

### Adaptive glass legibility (the `--glass-backdrop` bucket + the self-engage default + the sampled observer — AX.W55 · AZ.W-ADAPTIVE-AUTO)

Glass is the maximal default register (AX.W54), so content-on-glass-over-a-bright-backdrop is the common case. Over a VERY LIGHT or busy backdrop the warm-cream translucent glass collapses — the surface has no edge and the text drops below 4.5:1 (the G2 defect: "Glass dock over VERY LIGHT materials is unreadable, darken DYNAMICALLY like iOS 27"). The legibility is expressed entirely in the EXISTING `color-mix(in oklab, <rung bg>, var(--glass-tint-source) var(--glass-tint-strength))` tint seam — **ZERO new compositing seam** — across THREE layers (floor → default → refinement):

1. **The unconditional SELF-ENGAGE default (AZ.W-ADAPTIVE-AUTO Arm 1 — the legibility FLOOR).** The dock (`:where(.glass-dock)`, dock/morph.css) AND the plain content tiers (`:where(.glass-card, .glass-resting, .glass-quiet, .glass-wash)` + the overlay band `.glass-floating`/`.glass-overlay`, ladder.css) self-darken over light backdrops UNCONDITIONALLY — re-pointing the inheriting `--glass-tint-source` → the warm-ink + `--glass-tint-strength` → the AA floor directly on the surface, NO consumer opt-in. This closes the C5-2/C5-3 self-engage NO-OP: AY.W-A11Y-PERF O-1 set `--glass-backdrop: light` on the dock's OWN root intending a self-darken, but **CSS style queries NEVER self-match** (an `@container style()` block reads an ANCESTOR), so the self-declaration was inert. The genuine darken is the `:where()` rule. A dark-substrate consumer opts out via `--glass-tint-strength: 0%` on the surface.
2. **The declarative `--glass-backdrop` bucket (AX.W55 — the ancestor override).** A consumer sets `--glass-backdrop: light` on any ancestor where it KNOWS the backdrop is bright; the ancestor-querying `@container style(--glass-backdrop: light)` block reaches the DESCENDANT nested-glass (the self-engage handles a surface's OWN plate; the bucket cascades to its descendants). `--glass-backdrop: dark` (the `:root` default) is the consumer's explicit per-surface dark-substrate signal.
3. **The sampled-luminance observer (AZ.W-ADAPTIVE-AUTO Arm 2 — the iOS-27 DYNAMIC refinement).** `useGlassBackdropLuminance(targetEl)` (`src/composables/glass/`) samples the painted backdrop and writes `--glass-backdrop-luma` (0..1, now its FIRST real consumer) + the discrete `--glass-backdrop` bucket on the target, DYNAMICALLY tracking a live/animated backdrop (a dock over a live aurora) the static bucket is too coarse for. There is **no web API that reads the pixels painted BEHIND a `backdrop-filter` element**, so the sample is a legitimate proxy: an `elementsFromPoint` stack-walk of the painted background LAYER (static pages) or a downsampled-canvas `drawImage + getImageData` of the known background `<canvas>` (the animated case). It composes the EXISTING substrates (`useRAFLoop`/`useIntersectionPause`/`useResizeObserver` + the `resolveTokenColor` leaf — no hand-rolled rAF), is rAF-throttled ≤4Hz + IntersectionObserver-gated + parks on `document.hidden`/offscreen, and COLLAPSES the live loop to a single mount sample under `prefers-reduced-motion: reduce` (the `useWebGLCanvas` substrate-PRM mirror). **Wired ON by default for the DOCK (H3 arm a)**; opt out via `:auto-luminance="false"`. It is **DEMO-PRIVATE** (off the public glass barrel — the dock is the only binary consumer at HEAD; `docs/consumer-evidence/use-glass-backdrop-luminance.md` names the booked 2nd-binary promotion trigger).

The bounded AA floor `--glass-tint-strength-aa` is **20%** (recalibrated 18% → 20% at AZ for a stronger silhouette ΔL ≈ 0.40 over white; bounded ≤24%, the iOS clamp — the surface STAYS translucent). The full warm-ink `--foreground` clears ~10.6:1 over white at 20%. **The muted body register (`--muted-foreground`, L40) CANNOT clear 4.5:1 on a translucent darkened plate** (darkening moves the plate TOWARD muted's own luminance), so the self-engage LIFTS the muted register to the full `--foreground` ink — a token re-point on the same inheriting axis (the low-contrast muted register is inappropriate over a busy translucent glass plate).

**The substitution-vs-inheritance trap (the dock surfaces it bit).** The self-engage re-points the tint TOKENS, so it reaches ONLY surfaces composing the `color-mix(in oklab, …)` AT THE ELEMENT. A surface reading the PRE-SUBSTITUTED `--glass-bg-dock` token (baked at the `:root` 0% strength) does NOT darken. At AZ this trap was live-found + fixed on two dock surfaces the §3a warning named: the morph-root COLLAPSED endpoint (was the un-tinted `--glass-bg-wash`) and the vertical dock plate (`.glass-dock.vertical`, the prior `.variant-rail`, read `var(--glass-bg-dock)` raw) — both now compose the element-level oklab tint. The morph-root interp (`.glass-dock:not(.vertical)`, the horizontal dock; AZ.W-DOCK-TAXONOMY retired the `.variant-dock` class) stays `color-mix(in srgb …)` for the transition between the two now-TINTED endpoints (the in-flight morph frames are sub-perceptual).

**The `contrast-color()` flip is `@supports`-gated PROGRESSIVE ENHANCEMENT, anchored on the LIGHT backdrop signal.** On Chrome 147+/Safari 26+ a `@supports (color: contrast-color(white))` block refines the foreground ink to `contrast-color(var(--card))` (over the light backdrop → the legible dark ink). The anchor is the light surface base, NOT the ink — `contrast-color(var(--glass-tint-ink))` would invert to WHITE (illegible on the still-light translucent plate). The declarative bucket is the load-bearing floor on ALL engines; `contrast-color()` is the native refinement, never the sole legibility path. The dock control's `--dock-fg-on-aurora` foreground twin folds INTO the same probe (re-pointed to the warm-ink under the bucket, refined by the same `contrast-color()` flip) — ONE reconciled path, not a third fork.

**The Clear↔Tinted a11y escape coordinates two axes on `--glass-level`.** `prefers-reduced-transparency: reduce` + `prefers-contrast: more` ride W54's `--glass-level` for the OPACITY axis (firm up toward solid); `prefers-contrast: more` ALSO biases the TINT axis toward ink (the same darken the automatic bright bucket applies, now reached by the explicit "more contrast" user request). The two axes stay DISTINCT (level = opacity+blur, tint = darken-over-light) but share the bracket. Machine-locked by `proof:adaptive-glass` (the source/structure arm — the self-engage rules + the A5-1 modal-scrim source bite) + `proof:adaptive-observer` (the observer's write + throttle/gate + the demo-private no-overfitting bar) + the BINDING `proof:adaptive-glass-live` IN-SITU π readback (`tests-visual/adaptive-glass-live.spec.ts` — walks the enrolled dock + content routes over a synthetic-white worst-case plate with NO injected ancestor bucket, the C5-4 blind spot closed) + `tests-visual/adaptive-glass.spec.ts` (the W55 synthetic-fixture π). The in-srgb `--surface-tint-*` family is NEVER touched (the `in oklab` glass tint axis only). **A5-1 — the modal scrim:** `dialog.glass-top-layer::backdrop`'s dim reads the house `color-mix(in srgb, var(--background) Npct, transparent)`, NOT `hsl(var(--background) / α)` (a complete-`hsl()` token double-wraps to nothing — the dim silently did not paint).

## Entry point

`src/index.ts` is the **v1.0 curated public barrel**—vueuse-free per L.W1 Lane A SCC trap closure. It re-exports the 37 vueuse-free `ui/` package barrels (4 vueuse-bearing packages—`input/`, `textarea/`, `combobox/`, `carousel/`—are reachable only via subpath), 4 cherry-picked `custom/` packages (`instrument-chassis`, `hover-popover`, `configurator`, `scrolling-text`), the vueuse-free composable sub-trees (`motion/`, `reactive/`, `dom/`, `glass/`, `sortable/`), and `cn()`. The cherry-pick rationale is documented inline in `src/index.ts` (header comment block; L.W2 Lane B). The remaining `custom/` packages reach consumers only via their dedicated subpath (`@mkbabb/glass-ui/dock`, `/aurora`, `/sidebar`, ...). Sidebar state/follow/scroll/tree composables live under `src/composables/sidebar/`; the `custom/sidebar/` component dir was retired (AI.W5-δ; zero external SFC consumers) and its types relocated to `src/composables/sidebar/types.ts`. The `Sidebar` surface now reaches consumers via the `/sidebar` subpath (`src/sidebar.ts` → the composables barrel).

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
| `@mkbabb/keyframes.js` ^2.2.0 \|\| ^3.0.0 \|\| ^4.0.0 | Spring/keyframe runtime |
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
// + tokens, search, confirm-dialog, infinite-scroll, tabs, typewriter, stacked-icons,
//   metric-badge, status-dot, pulse, paper-backdrop, toggle-chip,
//   sortable-list, timeline, labeled-field, expandable-container,
//   icon-tooltip, instrument-chassis, scrolling-text
```

CSS imports the unified bundle via `@mkbabb/glass-ui/styles`. Per `package.json` exports + `typesVersions["*"]`, glass-ui ships **67 flat JS subpaths** (the component-package families + `/api` + `/forms` + `/dark` + `/keyboard` + `/carousel` + the composable subtrees) plus the CSS/font bundle entries (`./styles`, `./styles/fonts`, `./styles.css`, `./fonts/*`) — 72 entries total in `package.json` exports including the `./` root. Each `exports` entry carries the contract-v2 shape — `{ types, import, default }` for the `./` root, `{ types, import }` for the subpaths; no `development` condition (the AG glass-ui-core wave abrogated it). The `./freshness` subpath retired at AD.W4 (Decision 5): the runtime stale-dist gate is superseded by the cross-repo dev-resolution contract-v2 — every consumer resolves the built `dist/` in dev and prod alike, and every `@mkbabb/*` publisher runs `build:watch` so `dist/` is kept fresh while a consumer's dev server is up, so a stale `dist/` cannot mislead them. See `docs/precepts/cross-repo-dev-resolution.md` (invariant 30, contract-v2). Verified by `npm run verify-export-types` (release-script probe per L.W0 Lane III; unconditional since O.W5 Lane B+D) + the fail-closed `npm run proof:resolution` gate.

The v0.9.x nested subpaths `@mkbabb/glass-ui/composables/dark` + `@mkbabb/glass-ui/composables/keyboard` were RETIRED at v1.0—L invariant 4 (no backwards-compat aliases). Consumers migrate via one-line rename per call site; see `MIGRATION.md`. The `@mkbabb/glass-ui/pagination` and `@mkbabb/glass-ui/virtual` subpaths were RETIRED at L.W3 (0 production consumers; substrate-without-consumer-binary invariant).

### Subpath naming pairs (canonical)

The single `Carousel` surface ships via `@mkbabb/glass-ui/carousel` (vueuse-bearing
`useCarousel` composable + embla-carousel-vue `CarouselApi` type—the underlying
primitive `<Carousel>` family + `GlassCarouselPager` wrap this). The former
`@mkbabb/glass-ui/glass-carousel` scroll-overflow composite (`<GlassCarousel>` +
`useGlassCarousel`) was retired at AX.W19 (single demo consumer, zero binary
consumers — the substrate-without-consumer bar). The
`@mkbabb/glass-ui/dock-group` `DockGroup` chassis-strip wrapper was retired
earlier with its `custom/dock-group/` dir + `dock-group.css` + subpath export.

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

Button variants: `default` (AX.W54 — now the GLASS register; a bare `<Button>` paints glass), `solid` (AX.W54 — the opaque primary-fill ESCAPE, the prior default's look, no alias), `primary-audacious` (K W6), `gold-audacious` (AN.R0; the gold "→ Next" CTA), `destructive`, `outline`, `secondary`, `accent`, `ghost`, `glass`, `glass-wash`, `ai`, `link`. All enforce four states: standard, hover, active (`scale-[var(--scale-press-btn)]`), disabled (`opacity-disabled`, `pointer-events-none`).

### Glass-first canon (AX.W54 — the MAXIMAL default)

Glass is the **DEFAULT surface register for EVERY band** (USER-DECIDED MAXIMAL): containers, chrome, buttons, content panels all default to glass; the opaque surface is the explicit opt-out. The mechanism is ONE knob — **`--glass-level`**, a typed inheriting `@property` `<number>` (default `1`) threaded through both glass ladders at their single sites (the `--glass-bg-*` opacity recipe `1 - (1 - <rung-α>) * --glass-level`, and the `--glass-blur-*` radii `radius * --glass-level`). `level=1` is byte-identical to the hand-tuned ladder; **`level=0` is the OPAQUE escape** (solid `--card` + `blur(0)`) through the SAME machinery — `.glass-opaque { --glass-level: 0 }`, the `opaque` CardTier rung, and the a11y brackets (`prefers-reduced-transparency` → `0`, `prefers-contrast: more` → `0.3`) all ride the ONE level path; no per-rung enumeration, no parallel solid recipe. `inherits: true` so a host sets `--glass-level` on any ancestor to retune every descendant. **W55 carries the over-light legibility on the SEPARATE `--glass-tint-*` axis** (level = opacity+blur; tint = legibility; disjoint). The legibility allowlist that LEGITIMATELY stays opaque: `avatar`, `label`, `separator`, `skeleton`, `table`/`data-table`, and Badge's loud-saturated-pill register. Machine-locked by `proof:glass-level` + `proof:glass-cohesion` (G-1 — glass cohesion MEASURED: `proof:glass-cohesion` walks the full glass-surface inventory and asserts no `ui/` chrome/content surface paints a solid `bg-{card,background,muted,secondary,primary}` off the allowlist without the glass tier or the named `.glass-opaque` escape; it supersedes the former 8-surface glass-one-model whitelist gate). The glass blur is imperceptible over a flat substrate (nothing behind to blur) — the rich per-page backgrounds that make glass POP land in the page-redesign (W60); W54 lays the default, W60 consumes it.

`primary-audacious` composes the canonical `@utility btn-audacious` recipe from `src/styles/utilities.css`—disco-grain texture + sparkle-sweep glyph + specular-highlight backplate, bound to `--primary` (phase-color decoupled per K W6 Option B; dock primary tier retains phase-tinting as a dock-local extension via `--phase-color` cascade).

`gold-audacious` extends `btn-audacious` with the `@utility btn-audacious-gold` gold-sweep hover (a translucent `--color-gold-*` linear-gradient over the paper-grain, the `--glass-specular` top-edge catch-light, and the `btn-gold-bg-sweep` shimmer—PRM-gated; rest text is warm-ink `--foreground`, hover/active flips to white over the saturated gold backplate, per the AW.W13 contrast contract gated by `proof:affordance-contrast`). It is the D19 liquid-glass MODEL—a thin edge catch-light over a diffuse central bloom, hover-gated over always-on, `background-blend-mode` (isolation-safe, Safari-clean) over `mix-blend-mode`. Speedtest consumes the library `btn-audacious-gold` utility via a class binding (inv-16; no local redefinition). The hover/press scale rides `--scale-hover-btn` on `--spring-smooth` per the §6 easing doctrine.

**Easing doctrine (AX.W52 §6).** ONE recorded rule for which easing fits which job, formalizing the already-correct `transitions.css` idiom (full table in `tokens.css §2` header): surface props (bg/border/color/box-shadow/opacity) → `--ease-standard` (bezier—a colour cross-fade reads as a wobble on a spring); transform hover/press/active (scale/translate/rotate) → `--spring-smooth` (the ONE button/interactive scale register—`.btn-pill`/`.tap-squish`/`.glass-btn`/`btn-interactive` all settle on it, ζ=0.86 sub-perceptual peak so press still reads alive without a visible bounce); enter (mount/popover/dialog) → `--spring-bouncy`/`--spring-snappy`; exit (unmount/close) → `--ease-out`/`--ease-standard` (bezier, NO overshoot—an exit must never overshoot past gone); position-tracked (specular pointer) → `--ease-standard`. The button hover-visual channel (bg/border/color/shadow + scale) is UNIFIED onto this one register so the lift reads as ONE coherent glide, not a fast-color-snap-then-slow-spring desync (the prior cascade bug: `.tap-squish`'s scale-only `transition` shorthand clobbered `.btn-pill`'s surface legs, so every button transitioned ONLY scale—both classes now carry the full coherent set).

### Tabs vs ToggleGroup

Reach for `<Tabs>` (or the custom `<SegmentedTabs variant="underline">`) for **mutually-exclusive PANEL navigation**—`role="tablist"`, each tab reveals a distinct content panel and exactly one is active at a time. Reach for `<ToggleGroup>` (or `<SegmentedTabs :multi-select>`) for a set of **independent-or-single-select TOGGLES that mutate one surface**—`role="group"`, no panel swap, the toggles flip state on a shared view rather than switching between separate regions (a view-mode switcher over one result list is the canonical ToggleGroup case, not a Tabs case).

### SegmentedTabs (AX.W53)

`<SegmentedTabs>` (`@mkbabb/glass-ui/tabs`) is the unified spring-slider tab family—ONE component, a three-value `variant` axis (`segmented` DEFAULT · `pill` · `underline`), and ONE shared elastic indicator. The indicator GLIDES on `--spring-snappy` (the confirmed iOS segmented register) AND SQUISHES on travel: a volume-preserving stretch along its travel axis (`scale: var(--stretch) calc(1 / var(--stretch))`, the X/Y reciprocal pairing) capped LOW by `--tab-indicator-max-stretch` (default `1.08`, ≈+8%), released back to fit on the same snappy clock (the Material 3 ELASTIC / Apple Liquid-Glass "grow then shrink" register). **ARIA-role-per-variant** (load-bearing): `underline` is panel-nav (`role="tablist"`/`role="tab"` + `aria-selected`); `segmented`/`pill` are the ToggleGroup-shaped surface (`role="group"` + `aria-pressed`). `:multi-select` (segmented/pill only) drives N simultaneous pressed segments off the same engine. `:responsive` (`true` or `{ breakpoint, desktopOptions, ariaLabel, triggerClass }`) collapses the strip to a `<Select>` below the breakpoint. It SUBSUMES the former `BouncyToggle`/`BouncyTabs`/`UnderlineTabs`/`ResponsiveTabs`—clean break, no alias. The squish is `prefers-reduced-motion`-gated (no deform under reduce). Machine-locked by `proof:tabs-unified`.

### Dock orientation and multi-layer

`GlassDock` is ONE prop-shaped component on ONE layout axis — `orientation?: "horizontal" | "vertical"` (default `"horizontal"`). There is NO `variant` discriminant (AZ.W-DOCK-TAXONOMY retired the `"dock" | "rail" | "instrument-strip"` union — a clean break, no alias): "vertical dock" is `orientation="vertical"` ALONE, there is no second way to express it, and "rail-ness" is orientation + a shape/density choice. Horizontal docks animate `width` on expand/collapse and lay children out in a row; vertical docks animate `height` and stack children in a column. The collapse/morph/shrink machinery applies on BOTH orientations — a vertical dock collapses its `height` (the single opt-out is `alwaysExpanded`, default false; the prior vertical-always-expanded force-pin is gone). The orientation threads through the dock morph orchestrator (`dockMorphContext.ts`, which owns the `--dock-morph-t` size axis; the SFC's `outerLayerAxis` is the resolved orientation) and `useLayerTransition` (the layer FLIP); both are axis-aware, keying their FLIP logic off a computed `dim` (`"width" | "height"`) rather than a hardcoded dimension. The `instrument-strip` chassis-strip variant retired with no live consumer (the ≥2-consumer bar; a chassis surface composes `<InstrumentChassis>` directly). The ONLY surviving "rail" in the dock band is `.dock-layer-rail` (the in-`DockLayerGroup` switcher tab strip). Vertical consumers just set the prop; no other consumer changes are required.

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

#### Dock nav-pattern contract (AX.W61)

Every **NAV-flavored** dock composes ONE `<GlassDock>` root with a consistent **nav-pattern**: a home/brand control in the leading `#persistent` slot (**home-left**), the nav items, and `<DockSeparator>` dividers between groups — zero raw-class separators, zero hand-rolled home chrome (the showcase `overview.vue` + `rail.vue` are the model; the demo-layout shell docks BottomDock/SidebarDock carry it at HEAD). Three load-bearing pieces:

- **The collapsed-floor tokens — a PERFECT CIRCLE (AY.W-DOCK-NAV B4/B15).** `--dock-collapsed-summary-min-size` (`calc(--dock-layer-height * 0.85)`, a tight proportioned circle below the full control height) + `--dock-collapsed-padding` (`calc(0.25rem * var(--dock-scale))`, a tighter pad floor) — BOTH ride the `--dock-scale` coarse-pointer thread. The collapsed `.dock-layer--summary` LIFTS the `.dock-layer` height-lock (sets `block-size`/`height` to the SAME token its `min-width` floors at, + `aspect-ratio: 1`) so the pane is SQUARE and the pill is a 1:1 circle (the prior `height: var(--dock-layer-height)` lock against the narrower min-width painted it an oval — the user's "circle, not oval"). An EMPTY `#collapsed` slot (`:empty`) collapses the summary to zero, so a `#persistent`-bearing dock with no collapsed content shows the persistent control ALONE as the circle, and the collapse↔expand morph grows symmetrically about it (center-out, not the right-anchored void the empty summary used to reserve — the user's "expands from the right" B15).
- **The glass-first, DE-RED'd iOS selected-control register (AZ.W-REGISTER-IOS).** `--dock-control-active-bg` is a `--glass-bg-*` tier (`var(--glass-bg-floating)`, a tier ABOVE the hover fill `var(--glass-bg-resting)`) reading the dock substrate through it — the keyframes-dock "selected reads as glass" model the user named — NOT a flat `--surface-tint-N` overlay, and NEVER a stacked underline + dark fill (the B2 fix). The selected register is now the iOS-26/27 LUMINANCE-LIFT, at the ROOT (R3-6 — "more iOS inspired and glassy"): the brand-red (`--viz-fourier`) is RETIRED from EVERY interactive state (hover/active/selected/pressed). The selected GLYPH stays warm-ink `--foreground` (never a saturated brand hue), and the rail leading-edge accent BAR paints `--dock-selected-accent` — a translucent foreground luminance-lift (`color-mix(in oklab, var(--foreground) 14%, transparent)`) that auto-FLIPS with `--foreground` (dark resolves a LIGHT lift over the dark plate). `--dock-selected-accent` is the SINGLE retint knob; the BAR is its only required consumer (arm-a keeps the glyph `--foreground`). Press lands the iOS DARKEN-plus-shrink: `--dock-control-press-bg` (a `--glass-bg-resting` mixed ~7% toward `--foreground`) reads on every dock control `:active` alongside `--scale-press-dock`. Red survives ONLY as static brand ink — the ℱ wordmark, the data-viz strokes (`--viz-fourier`/`--chart-download`), the gold/red CTA family — never on an interactive register. The negative-predicate guard (`proof:register-ios` clause e) catches a brand-red re-introduction on ANY interactive selector by ANY future consumer.
- **The switcher-rail render (AY.W-DOCK-NAV B6).** `<DockLayerGroup show-rail>`'s `isComponent()` accepts FUNCTIONAL components (the `@lucide/vue` v1 icon form) so the rail tabs paint icons, not first-letter fallbacks. A horizontal dock's column rail demands its natural height (`align-self: start` + `min-height: max-content` on `.dock-layer-rail`, `flex-shrink: 0` tabs, the `.dock-layer` height-lock relaxed to `min-height`) so the dock grows to contain all the tabs + the travelling indicator; `--dock-layer-tab-size` (28px, density-scaled) keeps the rail a compact icon column.
- **The switcher-rail is a HAIRLINE register (AZ.W-DOCK-RAIL).** The rail is a thin dividing line, NOT a fused tinted plate-gutter. Three load-bearing pieces: (1) **the indicator paints the token, not the baked plate** — `TabsIndicator.vue` gates its `bg-(--glass-bg-quiet) [backdrop-filter:…]` plate utilities behind a `surface?: boolean` prop (default `true` for the base `<Tabs>` underline, byte-identical); the dock rail renders `<TabsIndicator :surface="false">` so the `.dock-layer-tab-indicator` token rule (`--dock-layer-rail-active`) is the sole paint (an `@layer components` rule always loses to an unlayered utility, so the ONLY way the token wins is to not bake the plate). (2) **The rail paints no fill** — `--dock-layer-rail-bg` defaults `transparent` (off the prior `--surface-tint-8` plate), the `--radius-md` rounded plate background drops, and the single `border-right` hairline re-keyed to `--dock-layer-rail-divider` is the only visible rail edge. (3) **The glyph is floored** — `.dock-layer-rail .dock-layer-tab svg { width: 1rem; height: 1rem; flex-shrink: 0 }` floors the `size-4` icon at 16px (killing the un-floored 4px sliver inside the column inline-flex); the rest glyph lifts off `--muted-foreground` to the nav-glyph contrast register (`--dock-fg-on-aurora`/`--foreground` at 78%, AA over the hairline backdrop). The rail-active register reads `var(--glass-bg-floating)` — the SAME "selected reads as glass" tier `--dock-control-active-bg` uses — deferring the exact accent to W-REGISTER-IOS's root register (a glass tint, never a baked brand `--primary` warm-red).
- **The hover register** (W45-TUNE) — the dock control hover is a real glass register (bg → `--glass-bg-resting`, scale → `--scale-hover-dock`, the specular gleam 0 → ~0.1), all three legs reading on HOVER before click; the REST specular is default-off (the 19→0 keyframes I.W6 tracks).
- **The collapse-onset is pop-free + thrash-free (AZ.W-DOCK-FLICKER).** A hovered, collapsing dock used to paint a ±24-34px right-edge POP (the "flashing") and re-fire enter/leave at the settling edge (the "flickering"). The mechanism was a PAINT-ORDER seam: `.collapsed` flips on synchronously while the box is still painted at expanded width for the morph's leading frames (the `onSwap` pin + 1-rAF measure-defer in `dockMorphContext.ts`), so the UNGUARDED `.glass-dock.collapsed:hover { scale: var(--dock-collapsed-hover-scale) /* 1.1 */ }` multiplied the transient ~535px box. The fix: (1) **the SCALE arm is scoped to `.glass-dock.collapsed:hover:not([data-morphing])`** (`dock/morph.css`) — the +1.1 lift applies ONLY at rest (the 54px circle), inert during the morph, mirroring the shipped `--dock-expand-t` `[data-morphing]` precedent; the surface arms (bg/border/shadow) stay on the bare `:hover` (they don't multiply geometry). (2) **`useDockState` carries a hover HYSTERESIS** — a 60ms INTENT-DWELL on `onMouseEnter` (a sweeping-edge enter is canceled by the chasing leave before it commits the expand) + a MORPHING-EDGE-SWEEP `getBoundingClientRect` recheck on `onMouseLeave` (a leave whose pointer is still inside the box near a moving edge mid-morph is the edge sweeping, not a real exit → no collapse-thrash; at REST every leave is genuine and collapses). The always-expanded shell docks (BottomDock, SidebarDock) short-circuit the hover state machine and were never on this seam.
- **The NAV-vs-FEATURE census scoping is CANON (AZ.W-DOCK-NORMALIZE).** The nav-pattern (home-left `#persistent` + `<DockSeparator>` + zero raw-class separators) is scoped to **NAV-flavored** docks — a navigation rail/bar. The R3-5 "normalize every dock" mandate is **SCOPED to nav docks** by design: a **FEATURE-demo** dock exists to demonstrate a SPECIFIC dock facility (media transport, select/dropdown triggers, hover-popover keep-open, the slider keep-dock-open mechanic, `overflow="wrap"` reflow, `shape="card" layout="grid"`, the `DockLayerGroup` drill-in, a `size="dock"` sizing host, a `containerName` container-query host), NOT navigation — forcing a home control onto it would POLLUTE the teaching surface. The census `proof:dock-unify` (F4, extended) binds the full matrix as gate facts: the **SHOWCASE_DOCKS** (`overview.vue`/`rail.vue`/`layers.vue`) + the **SHELL_DOCKS** (`BottomDock.vue`/`SidebarDock.vue`, promoted from `pendingW40` to STRICT — both carry the contract at HEAD) are audited strict; a **FEATURE_EXEMPT_DOCKS** declared list (each path + the facility it demonstrates) is recorded as a POSITIVE contract (these teaching docks must NOT carry a home); and the **W5 census-CLOSURE** enumerates every `demo/**/*.vue` bearing a `<GlassDock>` and asserts each appears on EXACTLY ONE list (the anti-gameability floor — a future agent cannot smuggle an un-normalized nav dock into a new off-list story file unaudited). The executed matrix lives at `docs/tranches/AZ/audit/W-DOCK-NORMALIZE-census.md`. (The fleet's "one nav candidate at `overview.vue:370`" did NOT survive the post-taxonomy HEAD re-grep — `@370` is the `overflow="wrap"` 14-control FEATURE demo, not a nav silhouette; the re-census found ZERO divergent nav docks, so the normalization edit was a recorded no-op and the wave's binding work is the gate extension.)

Machine-locked by `proof:dock-unify` (the nav-pattern + the collapsed-floor scale-thread + the glass-first active register + the AZ.W-DOCK-NORMALIZE F4 census extension: nav-strict SHOWCASE/SHELL + the FEATURE_EXEMPT positive contract + the W5 closure) + `proof:dock-perfection` (W45-TUNE) + `proof:dock-region-model` (W45) + `proof:dock-rail-hairline` (AZ.W-DOCK-RAIL — the hairline-rail register: W1 indicator-token-not-plate, W2 rail-hairline-not-gutter, W3 glyph-floored-not-sliver, + the π `/dock/layers` readback) + `proof:dock-no-scale-pop` (AZ.W-DOCK-FLICKER — W1 scale-guard, W2 wired hysteresis seam, W3 the live collapse-onset SCALE-pop assert on the still-wide box, W4 the cursor-at-edge no-flip assert, + the C2 baseline self-test bite). `dock.css` is a thin `@import` root over the cohesive `dock/{shell,morph,density,layers,layer-group,overflow}.css` partials (the AX.W06 monolith split; `dock-controls.css` keeps the five control families).

#### GlassDock aria contract

The `GlassDock` root is **presentational**—a `<div class="glass-dock">` carrying layout/state data attributes (`data-density`, `data-held`, `data-container-name`) and pointer/focus listeners, but no ARIA role. `aria-expanded` MUST NOT be applied to the root: it has no interactive role, so the attribute is disallowed there and trips axe's `aria-allowed-attr` rule. `aria-expanded` belongs on the dock **trigger** child—the interactive control (`<button>`/`role="button"`) the user activates to open/collapse the dock—bound to the dock's exposed `expanded` state (reachable via `defineExpose`). Consumers that need an expand-state announcement wire `:aria-expanded` to their trigger button, not the dock wrapper. See `docs/tranches/AM/audit/W0-forms-a11y.md` (gap 3).

#### DockRail — the hairline-rail-beyond-dock context control (AZ.W-RAIL-EXTEND)

`<DockRail>` (`@mkbabb/glass-ui/dock`) is a hairline that runs **BEYOND** the dock edge, carrying a leading/trailing **end-icon that switches the dock's layer context**. It EXTENDS the `<DockSeparator>` idiom (the orientation-aware perpendicular paint, reading `useOptionalDockContext()`) past the dock content box, and adds the two things the separator cannot: a beyond-edge extent + a context-switch end-icon. It is dock **CHROME** — rendered in `GlassDock`'s `#rail` slot OUTSIDE the clipped morph aperture (the `.dock-hairline-slot` wrapper is `position: absolute` relative to the dock root, so the morph-axis `overflow: clip` never reaches it) — so the hairline + its end-icon **PERSIST when the dock collapses** (the in-pane `.dock-layer-rail` switcher vanishes on collapse; this one does not).

Contract: `extent: "beyond" | "inset"` (default `"beyond"` — the hairline overruns the dock content box by `--dock-rail-extend-length`, a dock-scoped geometry knob riding `--dock-scale`; `"inset"` keeps it flush), `position: "start" | "end"` (which edge it anchors), `icon?: Component` (the end-icon glyph, default a chevron), `entries?: readonly string[]` (the ordered context ids the end-icon cycles), `v-model:context` (the layer-context model), `@advance` (emitted with the next id). The hairline composes the `--border-hairline` token pair (the 0.5px catch-light + under-shadow) via `box-shadow` — a whisper, NEVER a hard `1px solid` rule, no new tokens beyond the one `--dock-rail-extend-length` extent knob.

**The layer-context binding is ONE registry, not a parallel state path.** The end-icon writes through one of two sanctioned seams: (i) the injected `DockLayerGroup` `active` model, OR (ii) a consumer-owned `v-model:context` — the SAME ref the consumer binds to `<DockLayerGroup v-model:active>`. `<DockRail>` owns NO internal `ref()`/`reactive()` shadow of the active state. Born with ≥2 consumers (the demo shell `SidebarDock` cycling the category/facet context + the `dock/rail.vue` story advancing a `DockLayerGroup`'s active layer). Machine-locked by `proof:rail-extend` (R1 `--border-hairline` no-hard-rule, R2 the sanctioned-seam-no-shadow, R3 the `--dock-rail-extend-length` beyond-edge overrun, R4 the `#rail` chrome slot outside the clip, R5 the ≥2-consumer census). The `DockRail` name is on the `proof:dock-taxonomy` T2 arm-a rail-noun allowlist (the freed noun); the `.dock-hairline-slot`/`.dock-hairline-extend` CSS classes avoid the de-overloaded "rail" token.

#### `containerName` is always-expanded-only (AY.W-DOCK2 §F1)

The `containerName` prop co-applies `container-type: inline-size`, which establishes inline-size containment and **CLAMPS the box to its contained intrinsic size**—so on a **COLLAPSIBLE** dock the collapse↔expand FLIP measures collapsed→collapsed and the morph **FREEZES** (`--dock-morph-t` stuck at 0). This is the AT.W7 / 3.4.0 dock-collapse-vs-`container-type` interaction (the dock-collapse fix was `container-type` removal) re-surfacing on the prop. **`containerName` is therefore for `always-expanded` surfaces only** (an explicitly `always-expanded` dock — e.g. a vertical nav column — that needs to be a container-query *subject*). A collapsible dock that needs deterministic targeting (a test capture, an external probe) uses a plain `data-testid`—no layout side-effect. W-DOCK2 DOCUMENTS this (the `GlassDock.vue` `containerStyle` comment) rather than gating it: inferring "collapsible" at runtime is not free (the prop default is `startCollapsed: true`), and the prop is correct on the always-expanded surfaces.

#### The coarse-pointer dock scale knobs (`--dock-mobile-scale` / `--dock-coarse-scale` — AZ.R5-TOKENS)

The whole dock geometry cascade (box · padding · gap · tab · tile · glyph · collapsed-pill) rides ONE multiplier — **`--dock-scale`** = `calc(var(--ui-scale) * var(--dock-local-scale, 1))` — so a single knob grows every axis in lockstep. On fine pointer it is the identity 1 (byte-exact desktop). On a **coarse pointer** the `@media (pointer: coarse) .glass-dock[data-density]` block (`dock/overflow.css`) lifts the dock-local stack-extra:

- **`--dock-mobile-scale`** is the CONSUMER knob (set it on ANY ancestor). It WINS the coarse register; a consumer who wants the dock to MATCH the rest of the library's `--ui-coarse-scale` 1.5× comfort sets `--dock-mobile-scale: 1`, larger sets `>1`.
- **`--dock-coarse-scale`** (default `0.78`) is the library's DENSE-CHROME coarse register — the fallback `--dock-local-scale` reads when `--dock-mobile-scale` is unset. The dock is a tight chrome strip, not a body control, so it floors TIGHTER than the global 1.5× (0.78 × 1.5 ≈ 1.17 effective → a ~60px collapsed pill, not the ~80px the bare global painted). The WCAG-2.5.5 44px touch floor survives as the `max(…, --dock-control-floor)` clamp in every scaled control-size — a sub-1 register can never drop the target under 44px.

**The substitution-vs-inheritance discipline (the recurring trap).** `--dock-scale` is RE-DECLARED inside that coarse block — NOT only at `:root`. A custom property's `var()` substitutes at its DECLARING element, so a `:root`-only `--dock-scale` would freeze `--dock-local-scale` at the `:root` identity 1 and the descendant `--dock-mobile-scale`/`--dock-coarse-scale` lift would never reach the geometry (the dead-knob bug — the 3rd recurrence of the AX.W55 class). The same coarse block re-resolves the OTHER `:root`-derived dock tokens that read `--dock-scale` or the density-resolved `--dock-layer-height` (`--dock-icon-glyph`, `--dock-collapsed-padding`, `--dock-layer-tab-size`, `--dock-collapsed-summary-min-size`) so they track the dock-local register in lockstep instead of freezing at the `:root` 1.5×. Machine-locked by `proof:ui-scale` (the `dock-coarse-redeclares-scale` + `dock-coarse-scale-minted` witnesses, born-RED on the pre-fix tree) + the live π readback under coarse emulation (the painted-size delta as the consumer knob varies; `docs/tranches/AZ/audit/visual/R5-TOKENS-DELTA.md`).

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

For a minimal payload, import from the **flat subpath** (`@mkbabb/glass-ui/button`), not the root barrel. The root `@mkbabb/glass-ui` barrel re-exports 37 `ui/` families + 5 cherry-picked `custom/` packages; a consumer build that has not been chunk-split will inline everything it reaches through that barrel into one chunk. The dist is a 76-entry per-subpath split (each `dist/<name>.js` tree-shakes independently), so `import { GlassDock } from "@mkbabb/glass-ui/dock"` pulls `dist/dock.js` + its shared leaves and never drags in the root barrel's reach. Per-subpath gzipped sizes are published in `docs/tranches/K/audit/W4-subpath-sizes.md` (regenerated by `npm run profile:bundle`) so a consumer can size each import choice—e.g. `@mkbabb/glass-ui/aurora` is a standalone ≈ 16 KiB-gzip WebGL chunk that the root barrel does NOT transitively reach.

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
