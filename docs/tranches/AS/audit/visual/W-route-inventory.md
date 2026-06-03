# AS visual — route inventory + capture matrix

The canonical demo-route list (derived from `demo/router.ts` + `demo/stories/manifest.ts`) and the AS-affected-page set the visual comparison must cover. Routes are path-based: a root redirect, 1 flat standalone story, 14 category landings (each a redirect to its first story), and 125 path stories.

## §1 — Route topology

`router.ts` builds four route classes off the manifest:

- `/` — redirects to `firstStoryPath()` = `/foundations/intro` (first story of first category).
- `/<flatId>` — flat standalone stories (static path, wins over `:dynamic`). One instance: `/aurora`.
- `/<category>` — category landing, redirects to `/<category>/<firstStory.id>`. 14 of them.
- `/<category>/<story>` — the renderable story pages. 125 of them.
- `/:pathMatch(.*)*` — catch-all → `/`.

Only the flat story and the `/<category>/<story>` pages MOUNT a component; the root and the 14 category landings are pure redirects (nothing to capture — they resolve to a renderable child). The visual fleet captures **126 renderable pages** (125 stories + 1 flat aurora).

The `demo/stories/aurora/*.vue` files (`AuroraStage`, `AuroraConfigDock`, `NucleiOverlay`, `OklchStopRow`, `PresetPickerRow`) are NOT routes — they are subcomponents the flat `/aurora` story composes. They render only inside `/aurora`.

## §2 — Canonical route list (path · renders)

### Flat standalone
| Path | Renders |
|---|---|
| `/aurora` | `demo/stories/aurora.vue` — procedural WebGL aurora playground + `AuroraConfigDock` (configurator-driven nuclei/stops/medium). Composes the `aurora/*.vue` subcomponents. |

### foundations (`/foundations` → `/foundations/intro`)
| Path | Renders |
|---|---|
| `/foundations/intro` | What the storybook is. |
| `/foundations/colors` | Warm cream + 13-stop section palette + viz basis. |
| `/foundations/typography` | Plus Jakarta Sans + Fira Code golden-ratio scale. |
| `/foundations/radii` | Radius tokens xs→pill. |
| `/foundations/shadows` | Cartoon offset / elevated / modal shadow tokens. |
| `/foundations/motion` | Easings + damped-spring `linear()` curves. |
| `/foundations/paper-glass` | Four glass tiers, paper grain, blend modes. |
| `/foundations/icons` | Lucide 2px-stroke semantic sizes. |
| `/foundations/surface-tints` | 9-rung tint scale + tier aliases. |
| `/foundations/overlays-scrims` | Three scrim weights + ModalOverlay + motion/lift offsets. |
| `/foundations/chart-chassis-palette` | Chart aliases + chassis-tier opacities + specular tokens. |
| `/foundations/paper-backdrop-texture-system` | `<PaperBackdrop>` frequency register + `--paper-*` tokens. |
| `/foundations/native-top-layer` | AQ.W6 pilots — native `<dialog>` + `commandfor` + `.glass-top-layer`; `HoverPopover :native`; capability probe. |

### primitives (`/primitives` → `/primitives/buttons`)
| Path | Renders |
|---|---|
| `/primitives/buttons` | Button variant matrix. |
| `/primitives/card` | Five-tier glass surface + cartoon decoration + scroll-pane + polymorphic root. |
| `/primitives/glass-panel` | Five-rung glass ladder over renderer-tier cascade. |
| `/primitives/configurator` | Studio-tier preset + layers + scroll-mode; floating glass substrate. |
| `/primitives/configurator-mobile` | Density axis — `mobile` vs `comfortable` rungs side-by-side. |
| `/primitives/dark-mode-toggle` | 5-rung size axis; composes useGlobalDark. |
| `/primitives/expandable-container` | In-place vs Teleport fullscreen + overflow lock-depth. |
| `/primitives/icon-tooltip` | Auto-provider tooltip. |
| `/primitives/labeled-field` | Parent + 4 wrappers (Input/Select/Slider/Switch). |
| `/primitives/form-validation` | `:user-invalid`/`:user-valid` + aria-invalid bridge + asterisk + autosize. |
| `/primitives/paper-backdrop` | Paper-grain substrate, two frequencies + opacity knob. |
| `/primitives/stacked-icons` | Overlapping stack + `+N` overflow. |
| `/primitives/toggle-chip` | chip vs cell over reka-ui Toggle. |
| `/primitives/inputs` | Input variants. |
| `/primitives/textarea` | Textarea. |
| `/primitives/checks` | Checkbox · Radio · Switch. |
| `/primitives/slider` | Slider variants. |
| `/primitives/number-field` | NumberField + subcomponents. |
| `/primitives/select` | Select compound. |
| `/primitives/combobox` | Combobox shell. |
| `/primitives/multi-select` | Multi-select control. |
| `/primitives/toggle` | Toggle · Toggle Group. |
| `/primitives/label` | Label. |
| `/primitives/badge` | Badge variants. |
| `/primitives/metric-badge` | MetricBadge primitive. |
| `/primitives/metric-pill` | Stacked taller-fatter pill (MetricBadge stacked/spacious/lg), inside a `GlassDock containerName` host. |
| `/primitives/status-dot` | StatusDot. |
| `/primitives/pulse` | Pulse dots/ring. |
| `/primitives/glyph-face` | Phase-tinted lucide wrapper + catch-light cap. |
| `/primitives/hover-popover` | Hover-triggered floating label + adaptive side/align + defer timer. |
| `/primitives/disco-glyph` | Faceted SVG glyph — 8-stop facet × specular cap. |
| `/primitives/separator` | Separator h/v. |
| `/primitives/section` | Sectioning landmark over typography ladder. |

### containers (`/containers` → `/containers/dialog`)
| Path | Renders |
|---|---|
| `/containers/dialog` | Dialog. |
| `/containers/sheet` | Sheet side drawer. |
| `/containers/drawer` | Drawer (modal + live-behind). |
| `/containers/popover` | Popover. |
| `/containers/dropdown-menu` | DropdownMenu. |
| `/containers/context-menu` | ContextMenu. |
| `/containers/hover-card` | HoverCard. |
| `/containers/tooltip` | Tooltip. |
| `/containers/alert` | Alert. |
| `/containers/accordion` | Accordion. |
| `/containers/collapsible` | Collapsible. |
| `/containers/glass-carousel` | GlassCarousel items + composable controls. |

### navigation (`/navigation` → `/navigation/tabs`)
| Path | Renders |
|---|---|
| `/navigation/tabs` | Tabs. |
| `/navigation/bouncy-tabs` | BouncyTabs. |
| `/navigation/dock` | GlassDock primitive matrix. |
| `/navigation/dock-layers` | DockLayerGroup + DockLayer + switcher rail. |
| `/navigation/rail` | Vertical GlassDock variant. |
| `/navigation/carousel` | Carousel (embla). |
| `/navigation/command` | Command palette. |

### data (`/data` → `/data/table`)
| Path | Renders |
|---|---|
| `/data/table` | Table primitives. |
| `/data/data-table` | Sorting/filter helpers. |
| `/data/tags-input` | TagsInput. |
| `/data/avatar` | Avatar. |
| `/data/sortable-list` | SortableList drag-reorder (consumes the `.gl-list-item` VT recipe). |
| `/data/infinite-scroll` | InfiniteScroll + composable. |
| `/data/timeline` | GlassTimeline. |
| `/data/timeline-segmented` | Multi-phase per-segment gradient timeline. |
| `/data/timeline-continuous` | Single rounded-pill rail + absolute region children. |
| `/data/search` | Fuzzy Search — FuzzySearch overlay + useFuzzySearch + fuzzyMatch (highlighted result labels). |
| `/data/scrolling-text` | Overflow-detection horizontal marquee. |

### feedback (`/feedback` → `/feedback/toast`)
| Path | Renders |
|---|---|
| `/feedback/toast` | Toast. |
| `/feedback/toaster` | ToastProvider wrapper. |
| `/feedback/notification` | Notification surface. |
| `/feedback/progress` | Progress (default + gradient). |
| `/feedback/skeleton` | Shimmer skeleton. |
| `/feedback/confirm-dialog` | ConfirmDialog. |

### motion (`/motion` → `/motion/transitions`)
| Path | Renders |
|---|---|
| `/motion/transitions` | Vue Transition recipes. |
| `/motion/springs` | Spring Orchestrator. |
| `/motion/stagger` | Stagger Reveal. |
| `/motion/scroll-type` | Scroll-driven Type. |
| `/motion/typewriter` | Typewriter. |

### composables (`/composables` → `/composables/use-token-color`)
| Path | Renders |
|---|---|
| `/composables/use-token-color` | useTokenColor. |
| `/composables/use-stagger` | useStagger. |
| `/composables/use-animated-number-map` | useAnimatedNumberMap. |
| `/composables/use-global-dark` | useGlobalDark. |
| `/composables/use-keyboard-shortcuts` | useKeyboardShortcuts. |
| `/composables/use-resize-observer` | useResizeObserver. |
| `/composables/use-glass-renderer` | useGlassRenderer. |
| `/composables/use-animated-number` | useAnimatedNumber. |
| `/composables/use-dark-mode-sync` | installDarkModeSync. |
| `/composables/use-intersection-pause` | useIntersectionPause. |
| `/composables/use-raf-loop` | useRAFLoop. |
| `/composables/use-scroll-progress` | useScrollProgress. |
| `/composables/use-spring-orchestrator` | useNumericTransition. |
| `/composables/use-stagger-reveal` | useStaggerReveal. |
| `/composables/use-sortable` | useSortable. |
| `/composables/use-scroll-tracker` | useScrollTracker. |
| `/composables/use-sidebar-follow` | useSidebarFollow. |
| `/composables/use-sidebar-state` | useSidebarState. |
| `/composables/use-tree-index` | useTreeIndex. |
| `/composables/use-touch-gate` | useTouchGate. |
| `/composables/use-timer` | useTimer. |
| `/composables/use-interval` | useInterval. |
| `/composables/use-story-demo` | useStoryDemo. |
| `/composables/use-infinite-scroll` | useInfiniteScroll. |
| `/composables/use-clipboard` | useClipboard. |

### custom (`/custom` → `/custom/header-ribbon`)
| Path | Renders |
|---|---|
| `/custom/header-ribbon` | HeaderRibbon hover-tracking anchor. |

### dock (`/dock` → `/dock/icon-button-token-ladder`)
| Path | Renders |
|---|---|
| `/dock/icon-button-token-ladder` | `--dock-active-{bg,color,scale,border,shadow}` token-only override pattern. |

### utilities (`/utilities` → `/utilities/scale-on-hover`)
| Path | Renders |
|---|---|
| `/utilities/scale-on-hover` | `@utility scale-on-hover` over `--scale-hover` cascade. |

### sliders (`/sliders` → `/sliders/glass-scrubber`)
| Path | Renders |
|---|---|
| `/sliders/glass-scrubber` | `<Slider variant="glass-scrubber">` tall scrub track. |

### compositions (`/compositions` → `/compositions/hero`)
| Path | Renders |
|---|---|
| `/compositions/hero` | Hero composition. |
| `/compositions/math-paper` | Math paper. |
| `/compositions/dashboard` | Dashboard. |
| `/compositions/auth-shell` | Auth shell. |
| `/compositions/settings` | Settings. |
| `/compositions/empty-states` | Empty states. |
| `/compositions/instrument-chassis` | Three-region chassis + bezel grooves + phase cascade. |
| `/compositions/dock-with-slider` | Cross-substrate keep-dock-open contract. |
| `/compositions/drawer-live-behind` | Detented non-modal bottom sheet peek/half/full. |

**Total renderable: 126** (125 category stories + 1 flat aurora). Plus 1 root redirect + 14 category-landing redirects + 1 catch-all (no capture).

## §3 — AS-affected-page set

AS's impl waves (W3 G4 postTask; W4 G1 density + G2 carousel; W5 the AS-GU bundle — dock floor/dark/overflow, aurora OKLab, the L1/P-clusters) touch a narrow set of library surfaces. The pages below RENDER those surfaces and are the visual-comparison priority. Each row names the AS surface label, the touched src artefact, and the route(s) that exercise it.

| AS surface | src artefact touched | Affected route(s) | Why it must be captured |
|---|---|---|---|
| **P9 — rounded-panel / Configurator surface** | `Configurator.vue` (root clip + P5 inner-rounding from AR.W2) | `/primitives/configurator`, `/primitives/configurator-mobile`, `/aurora` (AuroraConfigDock) | The studio-tier rounded glass panel; AR.W2 corrected the inner-section radius and AS re-confirms the geometry (P5 visual). |
| **P1 — Configurator `asideSide`** | `Configurator.vue` (`asideSide` prop) | `/primitives/configurator`, `/primitives/configurator-mobile`, `/aurora` | The aside left/right layout axis must render correctly both light and dark. |
| **G1 — density container-style-queries** | `@container style(--density:…)` over `[data-density]` (configurator-row, metric-pill) | `/primitives/configurator-mobile` (mobile vs comfortable rungs), `/primitives/metric-pill` (density=spacious in a dock host) | The density ladder is the W4 CSS-platform headline; a descendant reacting to an ancestor `--density` must visually match the `[data-density]` fallback. |
| **G2 — carousel scroll-state** | `@container scroll-state(scrollable)` retiring `useGlassCarousel` overflow-fade listener | `/containers/glass-carousel`, `/navigation/carousel` | The overflow-fade edge gradient must look identical under the scroll-state recipe vs the JS-listener fallback. |
| **aurora — color.ts / inv-K-2 / OKLab** | `aurora/composables/color.ts` (OKLab math; `deriveAurora`/LUT if it ships) | `/aurora` | The procedural gradient palette derive; any OKLab/LUT change shifts every painted stop. |
| **P6 — dock tokens / 44px floor / as→asChild** | `DockIconButton.vue` (lift 44px coarse floor to the button), dock token cohort, `as`→`asChild` | `/navigation/dock`, `/navigation/dock-layers`, `/navigation/rail`, `/dock/icon-button-token-ladder`, `/compositions/dock-with-slider`, `/primitives/metric-pill` (dock host) | The standalone-button touch-target floor + the token-override ladder; the bare button must show the floor outside a `.glass-dock` host. |
| **dock dark-legibility + always-expanded overflow** | `--glass-opacity-dock` dark tune + overflow-clip fix | `/navigation/dock`, `/navigation/dock-layers`, `/navigation/rail`, `/dock/icon-button-token-ladder` | DARK is the load-bearing variant here — the legibility tune is a dark-mode correctness fix; the overflow fix shows on always-expanded docks. |
| **P4 — search highlight** | `useTextHighlight` / FuzzySearch / `fuzzyMatch` | `/data/search` | Highlighted fuzzy result labels — any highlight-span markup change is visual. |
| **P8 — view-transitions** | `useLayerTransition.ts` (dock layer VT), `.gl-list-item` VT recipe (sortable) | `/navigation/dock-layers` (layer crossfade/size FLIP), `/data/sortable-list` (`.gl-list-item` reorder VT) | The VT axes/directional vocab; transitions are mid-flight states — capture the settled end frames both themes. |

### The affected-page set (deduplicated route list — the comparison floor)

These 13 routes render at least one AS-touched surface and form the priority capture set:

1. `/aurora` — aurora OKLab/color.ts + AuroraConfigDock (P9/P1 + P6 dock)
2. `/primitives/configurator` — P9 panel + P1 asideSide
3. `/primitives/configurator-mobile` — P9 + P1 + G1 density
4. `/primitives/metric-pill` — G1 density + P6 dock host
5. `/containers/glass-carousel` — G2 scroll-state
6. `/navigation/carousel` — G2 scroll-state
7. `/navigation/dock` — P6 floor/tokens + dock dark
8. `/navigation/dock-layers` — P6 + dock dark + P8 layer VT
9. `/navigation/rail` — P6 + dock dark (vertical)
10. `/dock/icon-button-token-ladder` — P6 token cohort + dock dark
11. `/compositions/dock-with-slider` — P6 dock + keep-dock-open
12. `/data/search` — P4 highlight
13. `/data/sortable-list` — P8 `.gl-list-item` VT

## §4 — Capture matrix

Axes: route × viewport × theme. Viewports — `1440x900` (desktop) and `375x667` (mobile, iPhone-SE class, the density/touch-floor proving ground). Themes — light + dark (dark is load-bearing for the dock legibility tune).

**Priority tier (the affected set — 13 routes × 2 viewports × 2 themes = 52 captures).** This is the mandatory floor; AS's surfaces all live here.

| # | Route | 1440×900 light | 1440×900 dark | 375×667 light | 375×667 dark | Surface focus |
|---|---|---|---|---|---|---|
| 1 | `/aurora` | ● | ● | ● | ● | aurora OKLab + dock |
| 2 | `/primitives/configurator` | ● | ● | ● | ● | P9 / P1 |
| 3 | `/primitives/configurator-mobile` | ● | ● | ● | ● | P9 / P1 / G1 (mobile vp is the point) |
| 4 | `/primitives/metric-pill` | ● | ● | ● | ● | G1 density / P6 host |
| 5 | `/containers/glass-carousel` | ● | ● | ● | ● | G2 scroll-state |
| 6 | `/navigation/carousel` | ● | ● | ● | ● | G2 scroll-state |
| 7 | `/navigation/dock` | ● | ● | ● | ● | P6 floor + dock dark |
| 8 | `/navigation/dock-layers` | ● | ● | ● | ● | P6 + dark + P8 VT |
| 9 | `/navigation/rail` | ● | ● | ● | ● | P6 + dark (vertical) |
| 10 | `/dock/icon-button-token-ladder` | ● | ● | ● | ● | P6 tokens + dark |
| 11 | `/compositions/dock-with-slider` | ● | ● | ● | ● | P6 dock |
| 12 | `/data/search` | ● | ● | ● | ● | P4 highlight |
| 13 | `/data/sortable-list` | ● | ● | ● | ● | P8 `.gl-list-item` VT |

**Dark-critical subset** (where dark is the load-bearing variant, not just a theme sweep): routes 7-11 (the dock family — the `--glass-opacity-dock` legibility tune lands in dark). Capture dark first for these.

**Mobile-critical subset** (where `375x667` is the proving ground, not just a width sweep): routes 3, 4, 7-11 — the G1 density rungs and the P6 44px coarse touch-floor only manifest at the small/touch viewport.

**Baseline tier (the rest — 113 renderable routes × 2 viewports × 2 themes).** Captured as the no-regression backdrop so the AS folds (token cascade, motion `/motion-core` postTask, the L1 consistency edits) cannot silently shift an untouched page. Lower priority than the affected set; can run after the priority tier is clean. The dock tokens and the density `:where()` flat-specificity layer ride the global cascade, so the full sweep guards against an unintended bleed onto a page not in the affected set.

## §5 — Notes for the comparison harness

- The 14 category-landing paths (`/foundations`, `/primitives`, …) and `/` are redirects — drive the harness off the 126 renderable paths, not the redirects.
- `/aurora` is WebGL-painted; the procedural canvas is frame-variant. Capture a settled frame (the aurora composition stabilizes after its initial bloom); diff with a tolerance on the canvas region, exact on the chrome (the AuroraConfigDock).
- P8 (VT) and motion routes show mid-flight transition frames — capture the SETTLED end state, not a transition frame, or the diff is noise.
- `/primitives/configurator-mobile` is explicitly the density-axis story — the `375x667` capture is the load-bearing one (it shows the `mobile` rung at its native viewport).
- Dock dark legibility (routes 7-11) is the single most likely place an AS edit shifts pixels intentionally — treat a dark dock diff as expected-change-to-confirm, not a regression, and eyeball against the AS.W5 dark-tune intent.
