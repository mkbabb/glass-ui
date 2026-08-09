# Changelog

## 8.0.0 — 2026-08-09

`MIGRATION.md` §8.0.0 is the complete break list.

### Changed — the export surface is re-cut, once, whole

`exports` 66 → 70 keys. `./dropdown-menu` → `./menu` (the fourteen `DropdownMenu*` SFC
names are unchanged); `./forms` retires into `./input` · `./textarea` · `./checkbox` ·
`./radio-group`; `./sheet` mints, repairing a specifier that already had importers and
resolved to nothing. One subpath per public component, in both directions. The
`.dropdown-menu__*` classes and the `data-slot` values renamed with the family.

### Removed — `TagsInput`

The whole family, its directory, story and contract test. Never published on a subpath;
zero specifier and zero symbol edges across the 19-root consumer walk. No replacement.

### Fixed — the release path was RED and nobody had measured it

Two `release.yml` steps failed at the tag commit and no seat had run them: `npm run
typecheck`'s second arm (`vue-tsc -p tsconfig.test.json`) carried **43 type errors**, and
`npm run verify:package` failed its bundle ratchet. Both are green here. The type errors
were real contract rot, not noise — retired props (`material`, `variant`, `specular`,
`surface`, `ariaLabel`, `onLoadingStatusChange`) still asserted as PRESENT by
`.test-d.ts` files, a required `dprPolicy` option never passed at 15 call sites, and a
duplicated object key. Every dead assertion was **inverted** rather than deleted, so a
re-minted prop turns them RED.

### Added — `vue-component-type-helpers` is a declared peer, because reka-ui does not declare it

`reka-ui@2.10.1`'s `dist/index3.d.ts` imports `ComponentProps` from
`vue-component-type-helpers` while listing that package in neither its `dependencies` nor
its `peerDependencies` — only in its own devDependencies, at `^3.0.3`. No consumer install
gets it from reka-ui, so any consumer typechecking glass-ui's published types with
`skipLibCheck: false` hit `TS2307` on an upstream packaging defect. glass-ui now declares
`vue-component-type-helpers: ^3.0.3` as a peer so the type closure is part of the contract
and a package manager resolves it. **If you already vendor it (via `vue-tsc`, for example)
nothing changes; if you type-check with `skipLibCheck: false` and did not, this is what was
breaking.** The declaration is a workaround for someone else's packaging and can be dropped
the day reka-ui ships it correctly.


### Changed — the dock's "rail" vocabulary is struck; the hairline is built

`rail` named a vertically-oriented dock throughout the dock band's identifiers, which is
the opposite of what a rail is: a hairline that sits inside a horizontal or vertical
dock. Three things get three names. A vertical dock is `orientation="vertical"`; the
in-dock tab strip is the **layer switcher** (`show-rail` → `show-switcher`,
`rail-position` → `switcher-position`, `.dock-layer-rail` → `.dock-layer-switcher`, the
seven `--dock-layer-rail-*` tokens → `--dock-layer-switcher-*`); the vertical dock's own
geometry tokens drop the noun (`--dock-rail-padding` → `--dock-vertical-padding`,
`--dock-rail-extend-length` → `--dock-vertical-extend-length`, `--dock-rail-accent-*` →
`--dock-vertical-accent-*`). No aliases.

### Added — `--dock-hairline`, and `<DockSeparator anchor>` finally does something

The dock painted two 1px rules from two different colours; it now paints both from one
`--dock-hairline` token (the switcher divider's paint moves onto the separator's
`--surface-tint-15` rung — the cut's only paint delta). And `anchor`, which until now
stamped a marker class and attribute that no stylesheet and no code read, promotes the
separator to `.dock-hairline`: one rule spanning the dock's cross extent, in a
horizontal or a vertical dock.

### Removed — the `.glass-lens` refraction, entire

`armGlassRefract` and `supportsBackdropRefract` are gone from the root barrel with no
replacement, and `src/styles/glass-refract.css` (the baked `#glass-refract`
`feDisplacementMap` data-URI, ~2.3 KB shipped to every consumer) is deleted from the
`/styles` cascade along with the `.glass-lens` class it declared. The composite
rasterized on Chromium alone, WebKit returned true to the `@supports` probe and then
dropped the whole value at paint, and the runtime latch that worked around that lie
required a per-app bootstrap call. Consumers delete the `armGlassRefract()` call and
drop `.glass-lens`; the `.glass-{rung}` blur+tint base is unchanged.

### Changed — the timeline family collapses 5 → 1, `GlassTimeline` → `Timeline`

The `scrubber` / `segmented` / `continuous` dispatcher and its four private children are
deleted; `./timeline` now exports one `<Timeline>` — a single normalized reporting axis,
`role="progressbar"` and never `role="slider"`. `variant="scrubber"` has no replacement
by design: the commanding playhead-with-ticks surface is `<Slider :marks>`. Props
`variant` / `modelValue` / `currentSegmentKey` / `ariaLabel` / `disablePopover` are gone,
`current` and `accent`/`at` arrive, `label` is repurposed from the scrubber's tooltip
caret to the bar's accessible name, `click` becomes `select`, `hoverEnd` folds into
`hover(null)`, and `TimelineSegmentGradient` is deleted while `TimelineProps` is
exported. The fourteen `--timeline-*` dot/seam/gradient tokens collapse to one
`--timeline-track-h`. `MIGRATION.md` §8.0.0 carries the full per-surface table.

### Removed — `LabeledSelect` leaves `./labeled-field` (the subpath stays)

`LabeledSelect` and `LabeledSelectProps` are gone from `@mkbabb/glass-ui/labeled-field`
with no drop-in: a select adapter needs an `items` array, an `items` array is a preset,
and that one import made the field subpath drag `./select` and the whole overlay chain
behind it. `LabeledField` + `<Select>` is the replacement and it is ~30 lines at the call
site. `LabeledField`, `LabeledInput`, `LabeledSlider`, and `LabeledSwitch` are unchanged.
`MIGRATION.md` §8.0.0 carries the worked composition.

### Changed — `<Card>` sheds 6 props, 3 types and 1 component; `selected` is the state

`cartoon` / `grid` / `metal` each wrote a class a caller can write (`cartoon-surface`,
`paper-grid`, `metal-{gold,silver,bronze}-border` — all three utilities survive
unchanged); `variant` / `dataHue` / `dataHueStrength` / `selected` were one state wearing
four props, and `selected` is now the whole signal by PRESENCE — present makes the card an
option (`role="option"`, tab stop, `aria-selected`, pointer, hover/selected fill, press,
focus ring), absent leaves it inert prose; `material` is severed because the card IS the
elevated role, which is Surface's own default. `CardTier`, `CardVariant` and `CardMetal`
leave `./card` (the key stays: `CardProps` / `CardSize` and the six components remain), and
`CardAction` is deleted with its `:has()` grid fork. The six-declaration √φ padding
generator is gone — `--card-pad-inline` / `--card-pad-block` / `--card-pad-section-gap` /
`--card-pad-footer` / `--card-pad-title-gap` collapse to one `--card-pad` on the space
series. `MIGRATION.md` §8.0.0 carries the per-prop table and the paint deltas.

### Fixed — the elevated card painted one shadow leg and no edge discrimination

`[data-material][data-shadow]` REPLACED the glass rung's whole `box-shadow` with the single
role leg, so the one plate in the library that declares itself elevated resolved one shadow
and zero white channels; the rung stack is now stated once as `--card-cast` and composes.
The plate edge painted foreground 4% whether the card was flush or raised — it is now
`--ink-seam` (0.08) flush and `--ink-edge` (0.16) elevated, and a card lifts one rung while
a descendant holds keyboard focus. The module carried zero hover and zero focus rules under
a comment asserting that `<Card>` "owns its own hover composition"; it owns one now. And
`.card-scroll-host` — which carries `overflow-y` and a trailing feather mask — belongs on an
element INSIDE the plate, never on the `<Card>`, where the mask dissolved the plate's own
bottom edge and clipped its cast.

## 7.0.0 (2026-07-17)

### Export-map delta (the authoritative 6.x → 7.0 migration surface)

11 keys removed, 3 added (82 → 74). Mirrors `MIGRATION.md` §7.0.0.

| 6.0.0 subpath | 7.0.0 disposition |
|---|---|
| `./controls` | → `./dark-mode-toggle` (import `DarkModeToggle` there; the collective alias is removed) |
| `./metric-badge` | consolidated → `./metric` (`Metric`) |
| `./metric-cell` | consolidated → `./metric` (`MetricCell` — icon-bearing cell) |
| `./metric-stack` | consolidated → `./metric` (`MetricStack`) |
| `./icon-tooltip` | removed — compose `./tooltip` over the trigger |
| `./icon-chip` | removed — compose `./chip` with an icon child |
| `./color-swatch` | removed — native color input; Aurora's swatch is demo-private |
| `./focus-scope` | removed — import `FocusScope` from `reka-ui` for a custom boundary |
| `./motion-curves` | removed — `CurveFn`/`MOTION_CURVES`/`motionCurve` gone; import callable easing from `@mkbabb/value.js/easing` |
| `./notification` | removed — use the retained `./toast` queue/presentation family |
| `./spa-view` | removed — compose Vue `KeepAlive` + `Transition` in the product shell |
| — | ADDED `./dark-mode-toggle`, `./metric`, `./styles/theme` (Tailwind `@theme` registration bridge) |

`InstrumentChassis` remains on `/instrument-chassis` but is no longer root-exported. The
7.0 peer line is `@mkbabb/keyframes.js@^6.0.0` + `@mkbabb/value.js@^4.0.0` (optional
`@mkbabb/pencil-boil@^0.9.2`); `perfect-freehand` is no longer a peer (vendored into
HandMark). See `MIGRATION.md` §7.0.0 for the per-prop rows.

**Survivors (do not migrate):** `./labeled-field`, `./command`, and `./expandable-container`
are NOT removed — all three ship in 7.0.0 (verified present in the branch `exports`).
Repointing them would break working imports. But key-level survival does not imply
member-level survival: the `/command` KEY survives while its `MenuItemVariants` member is
removed — see the member-level removals below.

**Member-level removals from surviving keys.** Some 7.0.0 breaks drop exported members from
keys that still ship, so an `exports` keyset diff alone will not surface them. The complete
v6.0.0→branch member diff over the surviving subpaths (each verified exported by that key's
`v6.0.0` barrel and absent on the branch), grouped by subpath with a successor or `none`:

- `/motion-core` (the last three also rode the root barrel): `usePrioritizedTask` /
  `postTaskSafe` → `useYieldToMain` / `yieldToMain`; `vScrollRevealOnce` → `vReveal`;
  `NavigateOptions` → `ViewTransitionOptions`; `navigate` → `startViewTransition`;
  `supportsRouteTransitions` → `supportsViewTransitions`. The `usePrioritizedTask` companion
  types go with it: `UsePrioritizedTaskReturn` → `UseYieldToMainReturn`; `PostTaskOptions` /
  `TaskPriority` → none (`yieldToMain` / `useYieldToMain` take no options and expose no priority enum).
- `/surface`: `surfaceClass` / `decorationClass` → none (resolver internalized; compose `<Surface>`).
- `/card`: `CardSurface` → `CardVariant` + the `Surface` axis; `CardSpecular` → `SurfaceSpecular`
  (`/surface`); `ScrollCardProps` / `ScrollCardHeaderProps` (+ the `ScrollCard` components) →
  the ScrollCard family is retired.
- `/command`: `MenuItemVariants` → none (menu-row treatment internal). `/button`: `ButtonVariants`
  → `ButtonProps` / `ButtonEmphasis` / `ButtonSize`. `/toast`: `ToastType` → `ToastProps` /
  `ToastOptions`.
- `/drawer`: `DrawerClose` / `DrawerTrigger` → `DialogClose` / `DialogTrigger` (`/dialog`).
- `/instrument-chassis`: `InstrumentChassisVariant` → none (one material). `/blob`: `BlobVariant`
  → none (`BlobMerge` carries the smin-merge). `/carousel`: `CarouselNext` / `CarouselPrevious`
  → owner-local buttons from `useCarousel()` (`scrollNext`/`scrollPrev` + `canScroll*`).
- root `@mkbabb/glass-ui`: `METRIC_PLACEHOLDER` / `coalesceMetric` → none (coalescing is internal;
  pass `placeholder` on the `/metric` components). `MetricValue` / `MetricValueProps` are re-homed,
  not removed → import from `@mkbabb/glass-ui/metric`.

Completeness: the diff is complete once you also count the members already carried by a per-prop
row in `MIGRATION.md` §7.0.0 (`avatarVariants`/`AvatarVariants`, `toggleVariants`/`ToggleVariants`,
`sliderVariants`/`SliderVariants`, `ChassisDivider`, `InstrumentChassisPhase`→`InstrumentChassisState`,
`PaperBackdropFrequency`, `DockSection*`/`DockStack*`, `pagerWindow`/`PagerWindow`,
`SplitChars`/`useCharStagger`, and the goo/metaball facilities `useGooMorph`/`GooBarbellRefs`/`UseGooMorphParams`/`UseGooMorphReturn`,
`MORPH_SIGNATURES`/`MorphSignature`/`MorphSignatureName`/`MorphVector`, `GooFilter`, and
`useMetaballRenderer`/`UseMetaballRendererOptions` — all shipping through v6.0.0, removed at 7.0.0),
the §5.0.0 `/api` census (each `/api` member marked with its removal
version), and one mechanism-documented family excluded here — the
~67 `/motion` keyframes re-exports (`Easing`, `TimingFunction`, …). Whole-key drops are the export-map
delta above, not member removals.

**The recurrence rule:** the authoritative 6→7 migration surface is the export-map keyset
diff (`git show <tag>:package.json` exports), not this prose. Where the narrative and the
export keyset disagree, the keyset is load-bearing and wins.

- `HeaderRibbon` is persistent-only: one named toolbar on the shared functional glass
  surface and motion tokens. Its API is props `{ placement?, ariaLabel?, class }` plus a
  single `#items` slot. The collapsible mode, anchor button/slot, `anchorLabel`, and the
  reveal/pin/Escape machinery are removed (see docs/consumer-evidence/header-ribbon.md).
- `Progress` adds typed error and vertical states while retaining one numeric owner,
  one indicator, truthful indeterminate semantics, arbitrary maxima, and optional
  decorative marks.
- `Slider` replaces the public `sliderVariants` CVA with typed `variant`, `size`, and
  `invalid` props plus colocated CSS. Its Reka single/range, orientation, keyboard,
  touch, form, dock-hold, motion, and marks behavior is unchanged; coarse pointers use
  a real 44px root hit region without enlarging the visible rail.
- Dock removes the unconsumed `DockSection`, `DockStack`, and fisheye surfaces. Semantic
  groups use ordinary DOM plus `DockSeparator`; compact facet menus compose the existing
  dropdown family. Native overflow scrolling remains.
- Label now owns typed required/optional and disabled states in colocated CSS. Avatar
  owns one accessible identity, fallback/loading behavior, geometry, and status placement
  without the public CVA. Skeleton is one decorative reserved-shape recipe whose shimmer
  is absent under reduced motion; Separator retains its semantic/decorative hairline.
- `DarkModeToggle` moves from the vague `/controls` entry to `/dark-mode-toggle` with no
  alias. The eclipse long-press fork is removed; one native pressed command uses the
  shared interruptible press response and snaps spatial motion under reduced motion.
- `PaperBackdrop` is now a thin mount over the shared paper content-field recipe. Its
  per-instance opacity and frequency material forks are removed.
- `ScrollProgressRim` now paints above the glass material pseudo-layer so its inset band
  remains continuous at corners and cardinal edges.

## 6.0.0

The BI consolidation cut: fewer public names and interaction owners, one truthful
renderer-status seam, and the stable focused `ScrollProgressRim` implementation.
`CompletionSeal`, `Deck`, `Dock`, and `HandMark` remain public. The exact export-key
delta from 5.0.0 is one removal, `./stacked-icons`; no key is added or renamed.

### Breaking

- **Root `Section` is removed.** Use an ordinary semantic `<section>` and compose the
  required surface (`Card`, `PaperBackdrop`, or `InstrumentChassis`) explicitly.
- **Owner-internal members leave their family barrels.** Removed: `GlassCarouselPager`,
  `DialogScrollContent`, `ComboboxCancel`, `ComboboxSeparator`, `ComboboxViewport`,
  `DataTablePagination`, `DrawerOverlay`, `DrawerPortal`, `DropdownMenuPortal`,
  `ProgressDefault`, `ProgressGradient`, `ProgressLiquid`,
  `SelectScrollUpButton`, and `SelectScrollDownButton`. Their surviving public parent
  components own those details.
- **The product-specific sectioned Progress branch is removed.** `variant="sectioned"`,
  `segments`, `currentSegmentKey`, `activeProgress`, `useProgressGeometry`,
  `ProgressSegment`, and `SectionedCell` no longer ship. Use numeric `marks` for
  decorative checkpoints or own colored lifecycle phases in the product composition.
- **Constellation has one Canvas2D lifecycle.** `ConstellationExpose.backend()` and
  `parseColorRGBA` are removed; read the new `rendererStatus` ref/event when renderer
  identity or failure attribution matters.
- **Blob interaction is explicit.** A decorative `<Blob>` mounts no hit surface or
  pointer listeners. Supply `pressLabel` to opt into its named native button; `disabled`
  disables that surface.
- **Deck motion helpers are removed.** `installDeckSpring`, `deckEase`, and `DECK_SPRING`
  no longer ship; `useDeck`, keyboard navigation, `DeckPager`, and the `/deck` subpath
  remain.
- **Typewriter is text, not a hidden glyph control.** `interactive` and
  `backspaceToPosition` are removed. Render an explicit button when text editing is the
  user action.
- **`InkMark` is removed; use `HandMark`.** The implementation and `/handmark` subpath
  remain. **`StackedIconGroup` and `/stacked-icons` are removed**; owner-local DOM should
  express each avatar/icon cluster's actual controls and overflow.

### Added and changed

- `Progress` and `Slider` accept optional numeric `marks` that remain decorative and do
  not change stepping or model values. Continuous Progress now normalizes fill, lifecycle,
  and crescendo against arbitrary `max` values and grows from logical inline-start in RTL.
- `SegmentedTabs` now applies `ariaLabel` to both desktop and responsive owners, always
  reports tablist orientation, and adds `semantics?: "toggle" | "tabs"` so material and
  ARIA roles are independent. The historical `pill`/`underline` mapping remains the
  default.
- `/scroll-progress-rim` remains the minimal `ScrollProgressRim` segment renderer for an
  aggregate value or explicit segments; the broader retired `BorderProgress` surface is
  not restored.
- Aurora, Blob, Constellation, FourierField, and LiquidGrid expose/emit
  `rendererStatus` (`phase`, `engine`, `adapter`, optional `error`) with attributed
  WebGPU/WebGL2/Canvas2D/CSS fallback state.
- FuzzySearch paints matches with ordinary escaped `<mark>` elements. The bundled named
  `::highlight()` rules and empty `styles/utilities/animate.css` artifact are gone;
  `useTextHighlight` remains a caller-styled low-level Custom Highlight API.
- `DataTable` adds native-table `role`, `ariaLabel`, and `ariaColCount`, alongside
  `ariaRowCount`, `getRowAttrs`, `rowRef`, and `tabbableRowId`, plus
  exported `DataTableRowAttrs` and `DataTableRowRef` types, for caller-owned windowing.
  Logical row ARIA stays on the native table projection; responsive cards retain generic
  attributes, mounted-row refs, and the sole roving tab stop. Grid headers are row 1;
  empty-state presentation does not inflate the logical row count.
- The optional `@mkbabb/pencil-boil` peer is now `^0.9.2`; development pins immutable
  `0.9.2`. The HandMark geometry and boil imports build and test against that artifact.
  Pencil 0.9.2 itself declares Node 24/npm 11; Glass core remains Node 22 compatible
  when that optional peer is not installed.
- Release validation is direct (`typecheck`, build, tests) and tag publication retains
  npm provenance; packaging no longer depends on terminal tranche metadata.

### Fixed

- WebGL visibility disposal cancels pending resize-settle and fallback reveal frames and
  prevents their callbacks from running after teardown.

## 5.0.0

The joint BG/BH cut — the BG visual-convergence redesign lands with the BH structural
reshape as one major release, one migration event.

### Breaking

- **The `./api` discovery subpath is folded.** Its symbols re-home onto their owning
  subpaths — a pure consumer import-path swap with zero symbol loss for every surviving
  symbol (the retired viz, `/virtual`, and `/border-progress` types have no re-home target;
  those subpaths are in the removed-key table above, not re-homed). Most re-homed symbols
  were already exported by the owning barrel; the `_shared` orphans — `Surface` → `/axes`,
  `MenuItemVariants` → `/command`, `ControlSize` → `/forms` — each gain a re-export on their
  owning subpath. `MIGRATION.md` `## 5.0.0` carries the authoritative per-symbol map; the
  `package.json:exports` keyset diff (`git show <tag>:package.json`) is the load-bearing
  migration surface, not this prose.
- **[CORRECTION 2026-07-17] The 5.0.0 export-map dropped 20 keys, not one.** The `./api`
  bullet above originally read "(the ONLY dropped export key)" — corrected 2026-07-17: the
  original entry understated the export-key delta. The authoritative surface is the
  v4.2.0→v5.0.0 `package.json:exports` diff (20 removed, 7 added). Removed keys and where
  each consumer repoints:

  | Removed subpath (5.0.0) | Disposition | Guidance |
  |---|---|---|
  | `./api` | folded into owning barrels | this section + `MIGRATION.md` §5.0.0 |
  | `./goo-blob` | renamed `./blob` | this section + `MIGRATION.md` §5.0.0 `goo-blob → blob` |
  | `./context-menu` | folds onto the Menu family (`trigger="context"`) | `MIGRATION.md` §5.0.0 `BI.W-MENU-TRIGGER` |
  | `./hover-card` | folds onto `<Popover>` | `MIGRATION.md` §5.0.0 `BI.W-OVERLAY-UNION` |
  | `./hover-popover` | folds onto `<Popover>` | `MIGRATION.md` §5.0.0 `BI.W-OVERLAY-UNION` |
  | `./sheet` | folds onto `<Dialog placement>` | `MIGRATION.md` §5.0.0 `BI.W-DIALOG-PLACEMENT` |
  | `./confirm-dialog` | becomes a Dialog preset | `MIGRATION.md` §5.0.0 `BI.W-DIALOG-PLACEMENT` |
  | `./toggle-chip` | folds onto one explicit `<Chip>` family | `MIGRATION.md` §5.0.0 `BI.W-CHIP-FOLD` |
  | `./selectable-chip` | folds onto one explicit `<Chip>` family | `MIGRATION.md` §5.0.0 `BI.W-CHIP-FOLD` |
  | `./glass-panel` | retires onto `Card` / `<Surface>` / `.glass-resting` | `MIGRATION.md` §5.0.0 `BI.W-GLASS-DEDUP` |
  | `./border-progress` | retired; `./scroll-progress-rim` is the minimal successor | `MIGRATION.md` §5.0.0 (BG/BH retirements) |
  | `./concentric` | retired viz | `MIGRATION.md` §5.0.0 (BG/BH retirements) |
  | `./dot-flow-field` | retired viz | `MIGRATION.md` §5.0.0 (BG/BH retirements) |
  | `./dot-matrix` | retired viz | `MIGRATION.md` §5.0.0 (BG/BH retirements) |
  | `./goo-dot-matrix` | retired viz (re-home `<Blob>`) | `MIGRATION.md` §5.0.0 (BG/BH retirements) |
  | `./paper-grid` | renamed `./liquid-grid` | `MIGRATION.md` §5.0.0 `BG.W-GRID-AFFINE` |
  | `./scrolling-text` | retired; render accessible text | `MIGRATION.md` §5.0.0 (BG/BH retirements) |
  | `./virtual` | demoted to demo-local; not a library surface | `MIGRATION.md` §5.0.0 (BG/BH retirements) |
  | `./styles/critical` | removed; split critical-layer CSS unified into `./styles` (`index.css`) / `./styles.css` | net-new row (this entry) |
  | `./styles/deferred` | removed; split deferred-layer CSS unified into `./styles` (`index.css`) / `./styles.css` | net-new row (this entry) |

  Added at 5.0.0: `./axes`, `./blob`, `./blob-config`, `./chip`, `./liquid-grid`,
  `./scroll-progress-rim`, `./surface`.
- **[CORRECTION 2026-07-17] Member-level: the dock control/trigger fold removed exported
  `/dock` members without a 5.0.0 Breaking row** — corrected 2026-07-17. `DockIconButton`
  and `DockTabButton` (exported members of `@mkbabb/glass-ui/dock` at 4.2.0) fold onto one
  `<DockControl>` at 5.0.0 — `shape="icon"` is the default; `<DockTabButton …>` →
  `<DockControl shape="tab" …>`. Clean break, no alias. The `./dock` export KEY is
  unchanged; the members are the break. `DockSelectTrigger` / `DockDropdownTrigger` /
  `DockPopoverTrigger` likewise fold onto `<DockTrigger for=…>`. Per-symbol guidance:
  `MIGRATION.md` §5.0.0 `BI.W-DOCK-FOLD`.
- **[CORRECTION 2026-07-17] The orphan-trio's `MenuItemVariants` → `/command` re-export did
  not survive to the branch.** The `./api` fold bullet above states the three `_shared` orphans
  (`Surface` → `/axes`, `MenuItemVariants` → `/command`, `ControlSize` → `/forms`) each gained a
  re-export on their owning subpath. That held at 5.0.0 and 6.0.0 for all three, and `Surface`
  (`/axes`) and `ControlSize` (`/forms`) still ship on the branch — but `MenuItemVariants` was
  removed at 7.0.0 (the `/command` KEY survives; the member does not; see §7.0.0). The full
  v4.2.0→branch accounting is the 203-symbol `/api` census in `MIGRATION.md` §5.0.0 (203 total,
  141 live on a branch subpath, 62 retired or renamed).
- **`--ring` → `--focus-ring-color`** — the focus-ring color token renames (clean break,
  no alias). Consumers rename the reference; a transition-window read is
  `var(--focus-ring-color, var(--ring))`.
- **`goo-blob` → `blob`** — the `<GooBlob>` component renames to `<Blob>` and the
  `@mkbabb/glass-ui/goo-blob` subpath renames to `@mkbabb/glass-ui/blob` (no alias). The
  `BLOB_CONFIG_*` keys were already `BLOB`-prefixed (stable).
- **`src/subpaths/` (79 mirror barrels) deleted + the curated flat `src/*.ts` barrels
  relocate under `src/entries/`** — both source-only and key-preserving (the same
  `dist/<name>.js` chunk set emits; every published key resolves identically).

### Changed

- **The BG visual-convergence band** — the warm / weighty / liquid iOS-27 redesign: the
  unified `.glass-capsule` register, the `--motion-weight` governing scalar, the deep-glass
  and lensing refraction tiers, the dark luminous-transmissive material, the warm-chroma
  floor, the metal-shimmer triad, and the procedural-viz WebGPU-first suite all land as a
  paint upgrade with no public-prop break beyond the rows above.
- **The four-boolean motion scatter → the ONE `motion` axis** — `draggable` / `pressable` /
  `spring` / `liquidDrag` collapse onto `motion?: "full" | "reduced" | "off"` (default
  `full`); see the `MIGRATION.md` `## 5.0.0` motion-axis row.

### Fixed

- **The external payload trim** (`7813a695`) — `@lucide/vue` is externalized (removed from
  the eager bundle graph) and the dead `lucide-vue-next` / `vaul-vue` import strings are
  deleted with no alias, dropping the root-barrel first-paint payload.
- **The value.js de-straddle** — the `@mkbabb/value.js` peer floor rides to the single
  version keyframes' own value dep pins (the broken-singleton identity — no `^0.13 || ^1`
  straddle survives); `@mkbabb/keyframes.js` moves to the `^5.1.0` floor the shipped
  `useDragMorph` `snap:` option needs.

## 4.2.0

### The BD greenfield hardening wave — the warm / weighty / liquid redesign

The §3 gray root cause is CURED: a warm colourful `.paper-field` is transmitted behind every
surface (live-π light C 0.075 @ H79° / dark C 0.053 @ H68°, tealFrac 0), and the ONE shared
`.glass-capsule` register (warm-floor fill + `--glass-capsule-fill` override + the real
`--specular-intensity` hover lift) is composed by tabs · buttons · cards · chips · select ·
the dock selected pill — no per-component glass fork. The 1/φ `--motion-weight` governing
scalar + the loud `--ease-cartoon-punch` anticipation→punch `linear()` + the inert
`.cartoon-cast` cel shadow give every motion real weight (driver `.liquid-stage`→1, observer
`[data-autoplay]`→0).

**Headline fixes (all live-π verified):**
- The year-old **dock width-seizure** — the unbounded `--dock-root-ratio`/`-scale` machinery
  replaced by a bounded `--dock-live = collapsed + (expanded−collapsed)·clamp(0,t,1)` convex
  blend of two RO-measured-once endpoints; `--dock-punch-stretch` is a separate channel.
- The unifying **`useMorphField` WELD + ONE `GooFilter`** retiring ~12 forked morph mechanisms
  (GlassGooFilter/DockGooFilter removed; the dock-fission-goo double-mount killed).
- **`/dock/morph-showcase`** — the `view-transition` crossfade dodge (`--dock-morph-t ≡ 0`) →
  a real continuous metaball teardrop with √φ overshoot.
- The **carousel/deck goo** — a real barbell that wells-then-pinches (was a sliding band).
- The **11 procedural vizzes** warmed + RE-INVENT registers (aurora vividness lift, goo-blob
  mercury-colony split, dot-flow aurora-current, paper-grid the face term, …), warm/no-teal.
- The **category landings** — gray placeholder cards → live warm specimens, one-GL-budget
  frozen stills (≤1 GL context per landing).
- The responsive **hero clamp** (no off-page overflow); the broken **scroll-choreography** page
  (dead CSS ScrollTimeline → keyframes.js SpringProgress); the dead **useLiquidReveal**.

`design.md` gains the 8/12 laws-applied-universally, the cartoon / 1940s-technicolor register,
aristotelian √φ proportion, the canonical ios27 demos, and the cross-engine (Chrome + Safari)
floor. NO legacy, NO backwards-compat shims — a clean union onto the shared registers.

**Peer requirement:** `@mkbabb/keyframes.js` is now `^5.0.0` (adopted the keyframes 5.x major;
glass-ui's `SpringProgress`/`SmoothProgress`/`Draggable` usage is verified against 5.1.0).
Consumers on keyframes 4.x must upgrade.

## 4.1.0

### The honest paint-verified cut — the BB source-green/visually-broken disease CURED

BC — the anti-disease tranche. The BB cut shipped source-green gates over a visually-broken surface;
4.1.0 makes the gate measure PAINT, not source-mechanism. Every surface's warmth is verified by pixels:
`proof:ba-gestalt` is a ci-blocking 16-surface PIXEL roster (it decodes each surface's captured PNG and
asserts the warm-cream luminance/chroma/alpha band — a grey/missing/wrong-hue capture cannot pass), and
every wave closed born-RED→GREEN with a captured paint delta on real Metal GPU. The 96-wave build is
paint-gated end to end.

### Minor (additive) — the new surface

- **The WebGPU-first procedural-viz suite.** A third canvas backend (`useGpuSubstrate` — WebGPU-first,
  WebGL2 fallback, over the ONE `createCanvasLifecycle` leaf) + new viz: `<PaperGrid>` (`/paper-grid`),
  `<DotMatrix>` (`/dot-matrix`), `<GooDotMatrix>` (`/goo-dot-matrix`), `<Concentric>` (`/concentric`),
  `<DotFlowField>` (`/dot-flow-field`). Aurora, GooBlob, FourierField, and Constellation re-homed onto the
  dual substrate (WGSL primary + the byte-fenced GL fallback). The aurora anisotropic-Kuwahara painterly
  medium + the divergence-free curl-noise warp. `usePointerVelocityField` (the shared viz-pointer physics).
- **New subpaths:** `/deck` (the keyboard-paged aria-live DeckPager), `/completion-seal`, `/selectable-chip`,
  `/border-progress` (progress AS the element's border), `/spa-view` (the bounded view-cache pane),
  `/easing` (the boundary-law curve editor), `/virtual` (the homecoming windowing leaf).
- **iOS-27 glass identity:** the warm-cream maximal-glass default, the opt-in deep-glass tier
  (`--glass-depth`), the squircle refractive `--glass-refract` lensing axis, the per-instance chromatic
  `--glass-accent` rim, the bloom-from-source `.glass-reveal` / `useLiquidReveal`, the brand-metal triad
  (gold·silver·bronze) + the gold catch-light.
- **The motion canon** (`docs/precepts/motion-canon.md`): the ONE interruptible coupled spring-press
  (`useSpringPress`/`useLiquidPress`), the per-spring settle clock, compositor-only keyframes enforced
  library-wide, the native scroll-choreography register (no Lenis/GSAP), `useDragMorph` (pull-to-morph).
- **The dock:** the repaired liquid morph engine (compositor-transform over a reserved footprint), the
  dock-as-fuzzy-search (`useDockSearch`), the cockpit preset, the CTA-receive seat.

### Clean breaks (the no-backwards-compat house rule; each in MIGRATION.md)

- `<Button variant="solid">` retired (the unused bg-primary escape).
- `DockRail` → `<DockStack>` (the macOS hover-expand rebuild; the divider-carousel retired).
- `popover-animate` / `slide-in-from-side` retired → `.glass-reveal` (the 11 overlays re-point; a visual
  upgrade, no public-prop break).
- The fourier/constellation Canvas2D renderers → the WebGPU/WebGL2 substrate.
- The `secondary` Button variant reskinned onto the quiet glass register.

The cross-repo consumers (speedtest, slides, the Connectivity Atlas, fourier) adopt by-name on the `^4.x`
bump (the coherent-latest spine; the foreign-tree fence). Published via the gated-provenance `release.yml`
path (`--run full` siblings-absent before the tag).

## 4.0.0

### Major Changes

BA — the dark-register-rebuilt tranche close (4.0.0). The H4 major on two independent grounds
(the atlas register-D discipline — either alone forces a major):

1. THE A-LIST RESTORATION-AFTER-REMOVAL for a live 3.12.0 fork consumer. The Connectivity Atlas
   held `^3.12.0` on the d6 fork lineage (`feat/d6-library-3.10`); `onFlipSettled`, `/handmark`
   (HandMark/InkMark/BRUSHES), `PAPER_WASH_GROUND`, `useRouteTransition`, and the icon-morph
   `data-allow-motion` carve were absent on the 3.13.0 mainline (the break the atlas hit when
   `npm update`/`^x` silently traversed the bifurcation from 3.12.0 onto 3.13.0). 4.0.0 folds them
   back BY NEW SHAPE (the no-alias / no-backwards-compat house rule — a clean break IS a major).
   The full d6 lineage map + the A-list old→new migration table + the B-list fold-or-subsume table
   ship in `docs/tranches/BA/audit/W-ATLAS-RECONCILE-cut-notes.md`. The d6 lineage retires (the
   orchestrator fork-close protocol); 3.11.0–3.12.0 are deprecated pointing at 4.0.0.

2. BA's OWN clean breaks (any one a major under the no-alias rule), each in MIGRATION.md by name:
   - the disco retirement (W-GLASS-CAL) — the `btn-audacious`/`-gold` recipes + `sparkle-sweep`/
     `btn-gold-bg-sweep` keyframes + disco-grain knobs GONE (gold survives CALM; the static
     `.gold-shimmer` + `--glass-specular` registers STAY). Breaks `<Button variant="primary-audacious">`.
   - the tabs taxonomy cut (W-TABS) — `ui/Tabs` LEFT the public root barrel; SegmentedTabs
     `segmented`→`pill`; multi-select→ToggleGroup; the overflow responsive-collapse retired; the
     oval-blob default-ON indicator plate dead. [value.js: PaneSegmentedControl re-points]
   - the carousel-dots re-home (W-PAGER) — `CarouselDots` RETIRES onto `<PagerDots>` + `.glass-pager-ring`.
   - the tone-on-glass recompose (W-FEEDBACK-TONE) — Toast/Notification/Alert render tinted-glass,
     not opaque slabs; the 3 tone maps collapse onto ONE `.feedback-tone` recipe.
   - the static scroll-fade retirement (W-FADING-SCROLL) — `.scroll-fade-*` utilities GONE;
     migrate to `<FadingScroll>` (`@mkbabb/glass-ui/fading-scroll`).
   - PresetEditorField removed onto the Configurator chassis (W-CONFIG-CHASSIS).
   - the shared `{glass·veil·opaque}` surface axis (W-SURFACE-AXIS) — the Dialog `variant`→`surface`
     move + the GlassPanel↔Card reconciliation. [value.js: the /dialog + Skeleton consumers re-point]
   - the menu-row glass default flip (W-MENU-GLASS) — the flat `bg-accent` base dropped for
     `.glass-menu-row` (accent the escape). [value.js: the dropdown/context-menu register]
   - the `/underline`→`/handmark` DEC-8 fold (W-HANDMARK) — `GlassUnderline`/`/underline` RETIRE;
     the d6 hand-voice family re-lands on `/handmark`.
   - the dark-material token rebuild (W-DARK-MATERIAL) — dark glass TRANSMITS the live field; the
     `--glass-tint-*` re-resolutions + the `--primary` legendre-violet (token re-points).
   - the warm-chroma "no gray" floor (W-NO-GRAY) — the neutral ladder re-saturated above C 0.020.
   - the `--glass-blur-*` dial-back (W-GLASS-CAL B1, ~15-20%) + the per-spring `--spring-*-duration`
     vocabulary minted.
   - the `@source` re-point + the Select collision-bound/inner-scroll + the Slider size real-track
     geometry as shipped CSS (W-EMISSION). [value.js: the Slider/Select rendered-behaviour change]
   - `MetricBadge` `amount`→`value` (already shipped at AZ; re-flagged for the 4.0.0 consumer set).

The full migration is `MIGRATION.md` (the "BA → 4.0.0" section). The cross-repo adopt books:
`docs/tranches/BA/audit/slides-adopt-deploy-book.md`, `docs/tranches/BA/audit/valuejs-adopt-book.md`,
and the atlas close set in `W-ATLAS-RECONCILE-cut-notes.md` + FINAL §5/§12.

## 3.13.0

### Minor Changes

The AZ tranche — the reflection-bar release (the dock rebuilt, the floating-carousel rail, the adaptive auto-darken, the de-red iOS register, the blob page + studio, the motion suite + the curve-gallery keyframes isomorphism, the shell identity + configurator, hierarchy/suffusion/metric unification, the CSS carve, the prune-2 restores).

NOTE: the cut publishes as **3.13.0** (not the changeset-default 3.11.0) — the registry 3.11.x/3.12.0 are stale-lineage out-of-band publishes from a pre-prune tree; the cut number moves ABOVE them so `latest` resolves the true close. See `docs/tranches/AZ/waves/AZ.W-CLOSE.md` §X.2 (the lineage map).

Highlights:

- **Dock**: ONE orientation axis (the `variant` discriminant retired — clean break), the hairline switcher rail, `<DockRail>` evolved into the floating-carousel facet chip strip OUTSIDE the dock box (box INVIOLATE; the in-dock facet groups deleted), tap integrity (`useDockClickIntegrity`), the collapse flicker killed, the coarse-pointer scale knobs (`--dock-mobile-scale`/`--dock-coarse-scale`), the iOS-glassy de-red'd interactive register (`--dock-selected-accent`/`--dock-control-press-bg`), the V↔H morph showcase (`useDockOrientationMorph` + `useLiquidFlex`).
- **Adaptive glass**: the unconditional self-engage legibility floor + the sampled-luminance observer (`useGlassBackdropLuminance`, dock default-ON), the AA tint floor recalibrated to 20%.
- **Card**: the `surface="veil"` register (borderless+rimless legibility plate).
- **Metric family**: `coalesceMetric` core; `amount` → `value` (breaking, no alias).
- **Restored subpaths**: `/header-ribbon` + `/glass-panel` (live keyframes.js consumers; the AY census mis-prune reversed).
- **DockRail**: `items: DockRailItem[]` replaces the retired `entries: string[]` (clean break).

## 3.10.1

### Patch Changes

-   **The true AY close cut.** The registry `3.10.0` is a stale pre-close artifact published outside the gated release path (it still ships the four pruned subpaths and lacks `/underline` + the close work); it is deprecated on npm with a pointer here. `3.10.1` is the AY close tree — pin this. No code delta beyond `3.10.0`'s intended content; the version line below describes what ships.

## 3.10.0

### Minor Changes

-   **AY — the corrective close: every visual band LIVE-VERIFIED, the substrates rebuilt where the user's live audit said they were broken, and the codebase carved + colocated.** AX landed headless-green but visually broken; AY re-grounded to HEAD and drove every band to a captured-DELTA close under the cardinal gate (`proof:live-verified-ledger` — a "live-verified" claim owes an on-disk `.png` + a π readback, with freshness headers, IHDR dimension asserts, and a GREEN-on-real-surface clause).
-   **The substrate rebuilds (the user-audit fixes, root-caused)** — the blob's "broken" state was ONE category error (a page-background mount of a contained droplet) — fixed at the mount, the cream bead restored with a warm-red mood band the constellation focal + fourier comet share (`proof:substrate-cohesion`); the van-Gogh aurora's marble root-caused to the shared oil cascade and rebuilt as analytic crescent-comma dabs (live GPU π readback, 35× faster); the aurora + blob configurators rebuilt on the library `Configurator`; the fourier field's render register rebuilt to the fourier-analysis reference; the constellation gains `opacityCeiling` recession + a deterministic `?freeze` frame.
-   **The dock, finished** — the collapsed pill a perfect circle (the height-lock × width-floor oval root-caused); the morph layout-isolated so expand/collapse never reflows the surrounding container; the nav-pattern (home-left, utility controls at the trailing end behind a `DockSeparator`, the dark-mode toggle sized to the icon register at the bottom of the rail); `DockBackgroundToggle` actually parks the background in both dock states.
-   **Structure** — every god-module carved into cohesive colocated sub-modules (`proof:no-god-module` + a per-violator growth RATCHET); the feature-dir colocation convention (components at root, `composables/`, `constants.ts`, shaders, skeletons, README) enforced by `proof:colocation`; the style monolith carved into cascade-order-safe partials; the design-idiom home at `docs/precepts/design-idioms.md`.
-   **The ruthless prune** — `./deck-progress`, `./header-ribbon`, `./glass-panel`, `./instrument-rail` subpaths RETIRED (zero consumers each; clean break, no aliases); the dashboard filler story + `evalFourier` deleted; `watercolor-dot` KEEP-EVIDENCED.
-   **NEW `@mkbabb/glass-ui/underline`** — `<GlassUnderline>`, the hand-drawn SVG draw-on underline transposed from the sci-report R&D: three clocks (`load`/`scroll`/`static`), a declarative `active` edge, PRM set-not-drawn parity, filter-free, no `.dark` block (the `color` prop wins both grounds).
-   **The squircle family decided once (W56b)** — `--corner-shape-{dialog,sheet,panel,hero}` all resolve `superellipse(var(--corner-k-squircle))` inside the `@supports (corner-shape: superellipse(2))` PE gate over the un-gated `border-radius` round fallback; cards/pills/buttons stay round by policy (`proof:squircle-language` reconciled).
-   **Slider + drawer + the studio chrome** — the two-variant slider held (standard glass scrubber + spectrum, thumb-invisible per the user mandate); the aurora + blob configurators on the library `Configurator` with atoms as the single door.
-   **The close is a gate** — `proof:ay-final` aggregates the 8 close clauses (the cardinal arms, the disposition register, the budget, the orphan scan, staged-or-cut, clean-tree) so "is AY done?" is one born-RED→GREEN command.

## 3.9.0

### Minor Changes

-   **AX — the GOLDEN convergence: glass-first MAXIMAL, the dock perfected, every page a glass container over a rich background, and the cardinal-lesson capture discipline made a forcing function.** The headline is `--glass-level`: ONE typed inheriting `@property` scalar threaded through both glass ladders at their single sites, so glass is the DEFAULT surface register for every band (containers, chrome, buttons, content panels) with `level=0` the opaque escape (`.glass-opaque`, the `opaque` CardTier rung, and the a11y brackets all ride the one path). The four divergent glass recipes (SegmentedTabs, ui Tabs, Alert, TagsInput) reconciled onto the one model; W55's adaptive `--glass-tint-*` axis darkens glass over light so the maximal default stays legible.
-   **The dock, perfected** — every dock on ONE `<GlassDock>` root with the home-left `#persistent` nav pattern + `<DockSeparator>` dividers + a glass-first selected register (the keyframes-dock model); the collapsed pill correctly sized; the hover a 3-channel glass register (bg → glass-resting, scale, specular gleam) reading on hover; the 19 resting specular tracks cleared to 0; `dock.css` carved into cohesive partials.
-   **Every page a glass container over a rich background** — the StoryPage→StoryHero chassis wraps each page in a glass card; the hero pages each demonstrate glass over a unique aurora / constellation / fourier / paper background.
-   **The soundness battery** — five forcing functions land FIRST: `proof:live-verified-ledger` (a wave is `live-verified` only with a fresh on-disk `.png` DELTA), the `tests/` typecheck fold, `proof:consumer-staleness` (the reverse cross-repo gate), `gates.mjs --emit-ci` + `proof:gen-ci-fresh` (ci.yml is a byte-matched generated artefact), and `proof:disposition-live`.
-   **W56(R1) squircle** on dialog/sheet; the gate-pattern un-trapped; the blob a lit contained droplet; the aurora black-bar root-fixed; the configurator animates on the snappy spring; dark-mode semantic contrast to AA; the comfortable `--ui-scale` axis; the forced-colors glass skin; the slider's integrated-cylinder + squircle-spectrum; the 12-category storybook IA.
-   Clean break, no aliases (the Button `default` is now glass; `solid` is the opaque escape). Every shipped wave carries a captured live DELTA under `docs/tranches/AX/audit/visual/`.

## 3.3.0

### Minor Changes

-   AV — the dock rebuilt from first principles + aurora-fix + the iOS-26 glass evolution + the legacy/god-module sweep (the 3.3.0 cut, atop AU).

    **Dock-rebuild (AV.W9, the headline correction).** The AU dock-motion overhaul shipped a native `@supports (interpolate-size: allow-keywords)` width-morph arm. At runtime it FROZE the dock — the native `calc-size()` arm drove `width` on the browser clock while the FLIP `SpringProgress` driver wrote inline `width` per frame, a dual-driver race over one property. The static gates passed because they check source structure, not paint. AV.W9 retires the `interpolate-size` arm and the parallel discrete-visibility arm: ONE `SpringProgress` driver owns the width morph on every engine (the orthogonal View-Transitions path is kept and forks cleanly). The spring drives container size in pixel space; an interrupted/retargeted gesture re-seats the live solver from its current (value, velocity) instead of reconstructing from rest (velocity-continuity). The press spring is momentum-gated (smooth, no overshoot). New behavioral gate `proof:dock-animation-live` (Playwright frame-samples that width+opacity actually morph over frames and co-settle); the two static dock gates demoted to `structure`.

    **Aurora OETF fix (AV.W1).** The aurora shader emitted linear sRGB with no OETF (~2.2× too dark). It now applies `linearToSrgb()` before the `fragColor` write (matching the blob), plus fwidth stroke AA and a 1-LSB IGN dither. Gate `proof:aurora-space-gamma`. The OETF + Ottosson matrices + FBM rotation now live in ONE shared GLSL chunk (`procedural-color.glsl.ts`) both shaders splice, so they can never re-diverge (`proof:shader-shared-source`).

    **Two-slider unification (AV.W11).** Exactly two sliders ship: `standard` (a continuous iOS knob — `border-radius:50%`, no border, reading as a swelling of the capsule, with the four-state halo and the iOS press spring) and `spectrum` (the gradient-track color slider). The other variants retired; consumers ported. Gate `proof:slider-two-only`.

    **iOS-26 Liquid Glass evolution (AV.W15).** Token-edits over the warm-cream identity (held): per-rung saturate, a `--glass-edge-light` rim, content-aware under-shadow, and a pointer-anchored moving specular (`@property`-animated, reduced-motion-guarded, with a `var()` fallback; SVG `feDisplacementMap` refraction stays an `@supports`-gated progressive-enhancement garnish). The no-glass-on-glass discipline documented. Gate `proof:liquid-glass-tokens`.

    **Perf (AV.W7).** Content-visibility offscreen-pause on the `useWebGLCanvas` substrate (the RAF parks when the canvas scrolls off-screen and resumes on return); `contain:content` + a backdrop-blur budget clamp; an on-demand `will-change` lifecycle on the dock (never standing); the prefers-reduced-motion freeze lifted into the substrate with a live `matchMedia` re-monitor; a `DockBackgroundToggle` pause/play control (WCAG 2.2.2, available to all users); DPR + budget tokens. Gate `proof:offscreen-pause`.

    **Legacy-excision + fail-explicit (AV.W12).** Silent error-swallows made explicit (`useClipboard` names the failing channel; `GooBlob` requires an explicit config; `useGlobalDark` throws on a conflicting re-seed); genuine `@supports` progressive-enhancement kept with sentinels. Per-version tranche commentary moved out of the barrels to the CHANGELOG. The shader crayon special-case hoisted to a peer; the shader ID maps sealed to typed dispatch.

    **God-module decomposition (AV.W13).** No `src/` file exceeds 500 lines: `aurora.frag.ts` (819→348), `useSortable.ts`, `Progress.vue`, `runtime.ts`, and `metaball.frag.ts` each split into cohesive sub-modules (public shapes unchanged). Fixed the carousel-progress break (a silent sectioned `modelValue` override → a prop-boundary contract). Gate `proof:no-god-module`.

    **DI + hygiene (AV.W14, AV.W5).** A canonical `createStrictContext`/`createOptionalContext` factory generalizing the hand-rolled context triplets; all tests relocated out of `src/` to a top-level `tests/` mirror; nested imports hoisted (the keyframes lazy boundary kept); the 58 one-line subpath barrels collapsed into a `src/subpaths/` metadir. Gates `proof:no-test-in-src`, `proof:no-nested-import`, `proof:di-consistency`, `proof:subpath-enumeration`.

    **Modern Tailwind v4 + storybook (AV.W16, AV.W10).** Completed the `@theme inline` migration (fixing a latent `rounded-card` paint collision); container queries on the chassis + typography. The demo storybook re-organized into a coherent IA with the substrate stories surfaced; the demo font defaults corrected to the shipped face canon. Gates `proof:tailwind-v4-idiom`, `proof:storybook-ia`, `proof:font-canon`.

    **The blob trio + `/color` + the WebGL substrate (AU.W5-W7, carried).** The value.js-only `/color` leaf (OKLCh primitives + the injected `ColorResolver` seam), the generic `useWebGLCanvas` substrate, and the `/goo-blob` + `/watercolor-dot` subpaths. The metaball OKLCh shader-color port is proven bit-identical to value.js's CPU result (`proof:blob-color-equivalence` 8/8).

    **W9 supply + Fraunces + component splits (AU.W4/W9/W10, carried).** Button `size="icon-sm"`, Select `size`, Dialog `showClose`, `ConfiguratorLayer dividers`, `darkModeSyncScript()` FOUC, `useGlobalDark({ initialValue })`; the variable Fraunces display face; the ContinuousTimeline + BouncyToggle splits.

    **value.js peer (E-valuepeer) — sequencing note.** value.js is `0.10.0` on npm at this cut; the in-tree peer stays `^0.10.0` so installs resolve today. The downstream sequence publishes value.js `0.11.0` first, then the peer bump rides a later cut — a manifest-range precondition, not a runtime change (the blob-color contract is proven bit-identical against value.js's CPU port).

## 3.2.0

### Minor Changes

-   AS — the gate-integrity substrate (inv-θ), the modern-web leverage AR left, the AS.W7 visual/design correctness pass, and the AS.W2b publish-floor fixes. Published through the repaired release pipeline with npm provenance.

    **Consumer-facing wiring changes:**

    -   **`@mkbabb/keyframes.js` peer widened to `^2.2.0 || ^3.0.0`.** keyframes 3.0.0 is now the published `latest`; glass-ui is validated against both (it consumes only the light static engines — `SpringProgress`/`NumericAnimation`/`SmoothProgress` — which are unchanged across the 2.2.0 light/heavy boundary). Consumers may pair glass-ui 3.2.0 with either keyframes major.
    -   **`@mkbabb/value.js` is a peer dependency and is no longer inlined into `dist/aurora.js`.** The aurora OKLab color core consumes value.js's Ottosson core (deduped, SSR-safe — no 1×1-canvas), and value.js is externalized from the bundle (aurora gzip 47.7 → 16.8 KiB). Aurora consumers install `@mkbabb/value.js` as a peer.
    -   **The `/styles` bundle now ships glass-ui's own component-utility rules (`dist/styles/components.css`).** A bare consumer that imports `@mkbabb/glass-ui/styles` without an `@source` glob now paints the component vocabulary (`rounded-panel`, `text-muted-foreground`, the `--spacing`/`--text-*` bases the utilities reference, …) instead of rendering silently unstyled. The `@source` directive is still recommended for utilities your own templates use; it is no longer required just to style glass-ui's components.

    **New surface:**

    -   `deriveAurora(seed, { stopCount, harmony, … })` + the `AuroraHarmony` union — seed-to-palette generation (`@mkbabb/glass-ui/aurora`).
    -   `usePrioritizedTask` / `postTaskSafe` — `scheduler.postTask` priority scheduling with a `MessageChannel` + `AbortSignal` fallback (`@mkbabb/glass-ui/motion-core`).
    -   `useTextHighlight` — named CSS Custom Highlight wrapper, now multi-instance safe (surfaces sharing a name multiplex their ranges under one registry entry) (`@mkbabb/glass-ui/dom`).
    -   `GlassDock` gains `overflow?: "grow" | "scroll"` (+ the `.dock-scroll-x` / `.dock-scroll-y` utilities) so a dock that exceeds its track scrolls instead of growing.

    **Platform:** G1 density `@container style(--density)` over the kept `[data-density]` base; G2 `@container scroll-state(scrollable)` retiring an overflow-fade JS listener. **Visual/design:** the AS.W7 pass fixed 13 reported defects (the muddy dark background, the aurora overhaul, the configurator rounding/merge, the hero surface, the golden drag-ring radius, …). **Tooling (inv-θ):** the proof-gate fleet is now a pure, sibling-portable function of one `constellation.mjs` membership + one `gates.mjs` manifest (local == ci == release as filters), gitignored gate output, a lockfile re-drift guard, and a `proof:components-css` gate.

## 3.1.1

### Patch Changes

-   AR.W2 — the binding-correctness floor.

    Fixes the GlassDock `view-transition-name` collision: a module-level counter restarted per module-graph copy, so two docks on a page minted the same name and the browser rejected the transition. `dockId` is now minted from `useId()` (app-scoped, collision-free across module-graph copies), and a new `proof:vt-names` static gate makes the violation class structurally impossible (every VT/anchor-name mint must derive from `useId()` or a documented page-singleton, never a module counter).

    Consumer-correctness folds: `ConfiguratorLayer` applies `inert` to its collapsed body (closes an `aria-hidden-focus` violation — the focusable children no longer sit under `aria-hidden`); the Configurator sections now round at the container root (the per-section `rounded-panel` that deformed the inner `border-b` dividers is removed — rounding is owned by the container clip).

    Release CI repaired — the `package-lock.json` resolves `@mkbabb/*` from the registry (not the dev symlinks) so `npm ci` succeeds on a clean runner, and the workflows run node 24 (against `engines: >=22`).

## 3.0.0

### Major Changes

-   AO — self-measurement truth, CSS-architecture pass, legacy purge, and the speedtest-AQ consumer-gap fold.

    BREAKING: the deprecated `useSpringOrchestrator` / `UseSpringOrchestratorOptions` back-compat alias is removed. Migrate to `useNumericTransition` / `UseNumericTransitionOptions` (an identity rename — no call-shape change).

    Self-measurement truth:

    -   The bundle budget gate now measures the real combined `dist/styles/index.css` consumer draw (the full cascade + the folded SFC bundle, ~75 KiB gzip), not the SFC-only fragment — a regression in any cascade rung now trips the gate. Re-based the ceiling against the honest number with per-subpath drift enforcement.
    -   `iter-build` and the canonical build no longer wipe each other's `dist/styles` (`publishStyleAssets` shared across both Vite configs).
    -   Dropped the dead `--max-old-space-size=8192` build prefix (the api-extractor toolchain it served is gone; the build peaks ~700 MB) and resynced the build documentation.
    -   Resynced the root-surface contract proof to the real barrel and hardened the package `prepare` dts guard.

    CSS-architecture pass: consolidated the cascade (dock dedup, `:where()` hoists, prose trim) for ~6.5 KiB gzip of genuine headroom; fixed a `drawer.css` double-`hsl()` bug.

    Consumer-gap (speedtest AQ):

    -   Aurora: demand-driven, visibility-paused render loop (idle GPU recovers; reduced-motion still static).
    -   InstrumentChassis: breakpoint-correct child-geometry reserve (mobile CLS).
    -   `useIdleReady`: new `requestIdleCallback` idle-gate composable (sibling of `useViewportReady`).
    -   `Toaster`: new `position` prop (default unchanged).
    -   New `--surface-public-data-panel` theme token.

-   AP.W3 R0G-7 — `/motion-core` engine-free carve.

    BREAKING: the keyframes-FREE motion leaves carve off `/motion` onto a new flat `@mkbabb/glass-ui/motion-core` subpath so a cheap-leaf import never statically reaches `@mkbabb/keyframes.js`. The v2.0.0 "whole motion barrel moves as one SCC" rationale is overturned — a consumer touching ZERO keyframes (e.g. `useIntersectionPause` only) still dragged the ~125 KB engine onto its eager graph because the joined `export *` barrel made the SCC, not the leaves. v3.0.0 breaks the barrel.

    -   New flat subpath `@mkbabb/glass-ui/motion-core` (`src/motion-core.ts` → `src/composables/motion/core/index.ts`): `useStaggerReveal`, `useScrollProgress`, `useRAFLoop` (+ `RAFLoopTiming`), `useIntersectionPause` (+ `PausableRuntime`), `useStagger`, `DAMPING`, `SNAP_THRESHOLD`. Keyframes-FREE AND vueuse-FREE: `dist/motion-core.js` reaches neither heavy peer.
    -   `@mkbabb/glass-ui/motion` keeps the keyframes-BEARING set: `useSpring`, `useSpringMount`, `useSpringPress`, `useNumericTransition`, `useAnimatedNumber`, `useAnimatedNumberMap` + `DAMPING`/`SNAP_THRESHOLD` (the `constants` module is duplicate-exported on both barrels — pure data; the bearing leaves read it). `RAFLoopTiming` + `PausableRuntime` move to `/motion-core` (no bearing leaf references them).
    -   `installDarkModeSync` relocates from `/motion` to `@mkbabb/glass-ui/dark` (`src/composables/motion/installDarkModeSync.ts` → `src/composables/dark/`). It is keyframes-free but vueuse-bearing (reads `useGlobalDark`), so it homes on the vueuse subpath family rather than the engine-free carve.
    -   Wiring: `vite.library.ts` adds the `motion-core` entry; `package.json` `exports` adds `./motion-core` (contract-v2 `types`+`import`) and `typesVersions["*"]` adds `motion-core → dist/motion-core.d.ts`.
    -   NO back-compat alias on `/motion` for the relocated symbols (inv 47); consumers rename per call site. Rename table in MIGRATION.md §v3.0.0.

-   AP.W3/W4 — consumer-contract completion + control-flow derivation + the false-witness coda.

    -   R0G-6 — `DockIconButton` meets the WCAG 44px coarse-pointer target. The v1.4.0 floor was real CSS but SHADOWED: the always-present `.glass-dock[data-density]` (0,2,0) setter beat the bare `.glass-dock` (0,1,0) coarse floor, pinning the touch box at 40px. The coarse block now selects `.glass-dock[data-density]` (wins by source order), lifting `--dock-control-size` — which the button box AND the dock width-math both read, so the slot reserves 44px (no overflow). Fine-pointer rendering byte-identical.
    -   Aurora — the render loop derives its run-state from a suspend-source SET (`tab-hidden`/`off-screen`/`manual`) instead of three uncoordinated owners of one `running` boolean. Resume-while-still-off-screen is structurally unreachable (a reason-keyed resume cannot clear a reason it did not set). One observer owns visibility, one owns intersection. `drawFrame` byte-identical; reduced-motion still static.
    -   `DockLayerGroup` — fixed a vertical-overflow bug: the layer pane was hardcoded to a no-wrap row, forcing a `vertical` group's content onto one horizontal line. Vertical groups now stack/wrap/block-size to the height the stack animates. Horizontal byte-identical.
    -   The proof gates made honest: `proof-consumers-static` no longer flags `@import`/`@source` directives that live in consumer COMMENTS (a string-aware comment-strip), and the per-subpath drift gate reads a committed baseline instead of the one it overwrites each run.

    NOTE — the speculative "cascade derives itself for ~7-12 KiB reclaim" pass was investigated and DECLINED: direct measurement (deterministic build) found every form of the token/tier/four-state single-sourcing refactor byte-NEGATIVE (+1665 / +356 / +100 gzip). gzipped CSS is compression-saturated and the `@theme` bridge is idiomatic namespace-registration, not duplication. The cascade ships as-is; the only genuine reclaim was AO's prior pass. (See `docs/tranches/AP/audit/W2-cascade-derivation.md`.)

> **AC.W6 + AC.W8e cohort cross-reference (speedtest tranche AC).** The
> v1.5.0 + v1.5.1 + v1.6.0 minor/patch trio shipped as the AC.W6 cohort;
> v1.7.0 adds the AC.W8e AB+1-subset substrate (two new primitives + a
> toggle-variant addition). Each glass-ui release pairs 1:1 with a
> speedtest wave; the cohort consolidates as one continuous narrative.
> Cross-reference map:
>
> | glass-ui tag                | speedtest wave | Theme                                                                                    |
> | --------------------------- | -------------- | ---------------------------------------------------------------------------------------- |
> | `v1.1.0` (retro, `a28560f`) | AB.W4 close    | AB Living-UI canon (retroactive anchor; W6a)                                             |
> | `v1.5.0` (`8246e07`)        | AC.W6b         | OFL font self-host subsystem—Plus Jakarta Sans + Fira Code                               |
> | `v1.5.1` (`099910d`)        | AC.W6c         | Chassis `--phase-color-label` cascade for WCAG label register                            |
> | `v1.6.0` (`e238862`)        | AC.W6d         | Primitive expansions—MetricRow + MetricStack + AnimatedDigit + `::before` -15px hit-area |
> | `v1.7.0`                    | AC.W8e         | AB+1 substrate—`<MetricCell>` + `<ResponsiveTabs>` + `<ToggleGroupItem variant="card">`  |
>
> Speedtest reference: `docs/tranches/AC/AC.md` §AC.W6 + §AC.W8 + `docs/tranches/AC/waves/W6{a,b,c,d,e}-*.md` + `docs/tranches/AC/waves/W8.md`. Tags v1.5.0 + v1.5.1 placed retroactively at AC.W6e close.

## 2.1.0—2026-05-28—AN F-tranche root-redress (styles completeness · detented Drawer · role contracts · chassis canon)

Additive minor. The AN cohort closes the eight gaps the muster (dine-vote) F-tranche redesign surfaced at the glass-ui root—five surface gaps plus three intrinsic-primitive role-contract residues from the F.W8.6 axe sweep—plus the folded-in SP-1 (muster-G `Toast.duration`). No break: every change is opt-in via new props/defaults or documentation. Plan + close: `docs/tranches/AN/AN.md` + `docs/tranches/AN/FINAL.md`.

-   **Gap 1 — `/styles` completeness (AN.W1, LANDED).** `@import "@mkbabb/glass-ui/styles"` now resolves the COMPLETE stylesheet—the token cascade AND the compiled SFC `<style scoped>` component CSS (Aurora's `.aurora-root` grid layering, Progress/Slider/Notification scoped rules). `vite.config.ts` `publishStyleAssets` folds `dist/glass-ui.css` into `dist/styles/index.css` (Shape A). The v0.9.x second `@import "@mkbabb/glass-ui/styles.css"` bridge retires from the consumer head. `proof:theme` green.
-   **Gap 2 — Tailwind template-utility emission (AN.W2, DOCUMENTED — Option B).** The library's compiled templates emit utility classes (`h-full`, `w-full`, `shrink-0`) + CVA variant classes (`text-destructive-foreground`, `rounded-pill`) that a consumer's content-scan must reach. CLAUDE.md §Consumer wiring now documents the `@source "../node_modules/@mkbabb/glass-ui/dist"` directive as a binding contract with the same authority as `tw-animate-css`. Option A (ship ≈22 KB-gzip pre-generated utilities) rejected on payload + pipeline-fragility grounds. Zero new dist payload.
-   **Gap 3 — detented + non-modal + live-behind Drawer (AN.W3, LANDED).** Additive `Drawer mode?: "modal" | "live-behind"` (default `"modal"`); `mode="live-behind"` bundles `modal:false` + `shouldScaleBackground:false` + `snapPoints:[0.12,0.5,1]`, each overridable. `DrawerContent` gains `showOverlay?: boolean` (default `true`). New `src/styles/drawer.css` (cascade rung 17) carries the `.glass-drawer` surface + peek-handle detent grammar. `DrawerMode` type co-exported; `Drawer*` stays root-barrel. Detents land exactly at 12/50/100% of viewport; no focus-trap + no page `aria-hidden` under `modal:false`. Upstream note: vaul-vue does not re-snap an already-open sheet from an external `activeSnapPoint` write (not a glass-ui bug; programmatic set lands the OPENING detent).
-   **Gap A — StatusDot role contract (AN.W4, LANDED).** `<StatusDot :aria-label>` emits `role="img"` (decorative case stays role-free). Closes the F.W8.6 `aria-prohibited-attr` site.
-   **Gap B — SortableHandle role contract (AN.W4, LANDED).** The default `as="span"` grip emits `role="button"` + `tabindex="0"`; `as="button"` drops both (native). Closes the second `aria-prohibited-attr` site.
-   **Gap C — NumberField label binding (AN.W4, DOCUMENTED — verdict C2).** The AM.W0.2 `inheritAttrs:false` + `v-bind="$attrs"` chain reaches the inner `<input role="spinbutton">` on all three name channels (`aria-label`, `aria-labelledby`, `<Label for>`). The F.W8.6 residue was a consumer-side `role="group"` wrapper-label gap (a wrapper `aria-label` does NOT propagate to the input); documented as the binding contract in CLAUDE.md §Component architecture.
-   **SP-1 (folded from muster G) — Toast.duration (LANDED).** `duration?: number` added to the `Toast` interface (`use-toast.ts`); the forward chain already carried it to reka `ToastRoot`. `toast({ title, duration: 6000 })` now typechecks.
-   **Gap 6 — InstrumentChassis phase canon (AN.W6, DOCUMENTED — "ping" canon).** No additive `"scoring"` union member ships; `"ping"` is documented as the canonical generic-active phase (CLAUDE.md §Component architecture). A speculative `"scoring"` member with no consumer would be overfit substrate.
-   **Gap 4 — interruptible MetricStack reorder recipe (AN.W5, ARCHIVED — 2-consumer gate).** muster v1 is settle-on-pointerup; zero realised consumers. Wrote no source. Realisation condition: ≥ 2 consumers declaring a mid-drag-reorder pattern.
-   **Gap 5 — dock panel-host variant (AN.W6, ARCHIVED — 2-consumer gate).** muster's F redesign cut "the dock IS the app"; zero realised consumers. Wrote no source. Realisation condition: ≥ 2 consumers declaring a tall-vertical-pane stacked-control pattern.

Cross-repo handoff: muster consumes via the npm publish of `2.1.0` (the `file:` seam retired in muster's G tranche). muster's G.W4 auto-close fires on publish—bump `^2.1.0`, retire the two `styles.css` bridges + the `MusterDetentSheet` stopgap, and verify the three axe classes (StatusDot · SortableHandle · NumberField) at ZERO.

## AL.W4 Lane D—2026-05-26—MetaballCanvas publisher retire (G-W3-3 §6 zero-consumer)

The G-W3-3 audit verified zero live consumers of the `@mkbabb/glass-ui/metaballs` subpath across the constellation (speedtest, glass-ui internal, value.js, bbnf-buddy, words). The publisher had been kept after AK retired the speedtest consumer; AL.W4 Lane D retires the publisher now that the consumer cohort is empty. Discharges **AL-CARRY-METABALLS-PUBLISHER-CONSUMERS** (AL-SEED.md §5 row 2).

-   **Source retired** — `src/components/custom/metaballs/` deleted in full (`MetaballCanvas.vue`, `useMetaballs.ts`, `shaders.ts`, `types.ts`, `index.ts`, `__tests__/MetaballCanvas.test.ts`).
-   **Sub-barrel + dist artefacts retired** — `src/metaballs.ts` deleted; the `metaballs` entry retires from `vite.library.ts`; the `./metaballs` `exports` row + `metaballs` `typesVersions` row retire from `package.json`; `dist/metaballs.{js,d.ts}` no longer emit.
-   **API discovery layer retired** — `src/api/index.ts` drops the `MetaballConfig` + `MetaballPositioning` type re-exports + the `DEFAULT_METABALL_CONFIG` constant re-export + the Metaballs scope-criteria parenthetical.
-   **Tests realigned** — `tests/public-surface.spec.ts` drops the `MetaballsSurface` import + the `metaballs` subpath assertion + the `MetaballCanvas` non-core-root retirement pin. `tests/configurator-recursion.spec.ts` inlines a local `AxisConfig` fixture (preserving the exact 7-axis topology that drove the F-ε-3 repro) so the Configurator-recursion test no longer depends on the retired metaballs publisher; the host renames to `MultiAxisConfiguratorHost`.
-   **Demo retires** — `demo/stories/motion/metaballs.vue` deleted; the manifest row retires; `demo/stories/compositions/hero.vue` drops the ambient metaballs backdrop (the warm-palette radial gradients carry the hero composition unaided); `demo/stories/data/search.vue` drops the `Metaball canvas proof` fixture row; the `aurora.vue` doc-string consumer-list refers to the canonical Configurator primitive without naming the retired story.
-   **Docs realigned** — `README.md`, `CLAUDE.md`, `MIGRATION.md`, `DESIGN.md` lose live references to MetaballCanvas / Metaballs / MetaballConfig / DEFAULT_METABALL_CONFIG. Historical bug-fix lineage (K W7 Configurator P0 absorb; L W7 Lane B Aurora unification) survives — the route name `/motion/metaballs` is load-bearing context for those narratives. DESIGN.md gains a "(The `./metaballs` subpath retired at AL.W4)" parenthetical on the subpath enumeration.

## AI.W5 Phase 1—2026-05-20—Engineering hygiene + chassis chronics + 2-component VERIFY-then-DECIDE archives (publisher writes)

The first phase of the AI.W5 wave — glass-ui-side publisher writes only. Speedtest-consumer follow-ons (apologetic-comment retire at `ChartsView.vue`, `chassisPhase` switch simplification, ToastProvider retire, typed dev-handle bridge) land in Phase 2 per precept 13's XR sub-protocol. Spec: `speedtest/docs/tranches/AI/artefacts/W5-spec.md`. Ratified user disposition: G-AI-D26 (Path B archive for both DockGroup and ProgressiveSidebar families; composables retained for the latter).

-   **W5-α — `InstrumentChassisPhase` gains `"jitter"` + a `data-phase="jitter"` cascade rule** — the `InstrumentChassisPhase` union at `InstrumentChassis.vue` now enumerates `"ready" | "ping" | "download" | "upload" | "jitter" | "complete"` (was missing `"jitter"`). `instrument-chassis.css` gains a `[data-phase="jitter"]` rule that maps `--phase-color` and `--phase-color-label` through the right-canon fallback chain `var(--chart-jitter, var(--viz-legendre))` matching the token canon at `tokens.css:629` + `tokens.css:650`. The speedtest consumer at `ChartsView.vue` previously fell `"jitter"` through to `"ready"` with an apologetic narrative comment — the consumer-side simplification (return `distMetric.value` directly + retire the apologetic comment) lands in Phase 2. Retires **AI-CARRY-PHASE-ENUM-JITTER** (`CARRY` → `CLOSED-IN-W5-α`).
-   **W5-β — `data-phase="upload"` fallback chain canon-aligned (`--viz-legendre` → `--viz-amber`)** — the latent fallback at `instrument-chassis.css:120-124` read `var(--chart-upload, var(--viz-legendre))` — a wrong-canon binding (legendre is the jitter base hue, not upload). The fallback now reads `var(--chart-upload, var(--viz-amber))` matching the canon at `tokens.css:628` (`--chart-upload: var(--viz-amber)`). Latent-only behaviour: every constellation consumer ships with `--chart-upload` set, so the fallback never fires in practice — but the wrong-canon binding was real and the carry's "bounded fix" rationale demanded retire. Retires **AI-CARRY-CHASSIS-FALLBACK-WRONG-CANON** (`CARRY` → `CLOSED-IN-W5-β`).
-   **W5-α/β — phase-cascade canon vitest (`InstrumentChassis.phase-canon.test.ts`)** — new data-driven test guards both retires plus the broader cascade invariant. Asserts: (1) every `data-phase` rule's fallback chain matches `--chart-{phase}: var({canon})` at `tokens.css` (the `--viz-chebyshev` / `--viz-fourier` / `--viz-amber` / `--viz-legendre` quartet); (2) the `InstrumentChassisPhase` union enumerates the six phases; (3) the SFC paints `data-phase` on the root from the prop and defaults to `"ready"`; (4) `"complete"` resolves to `--color-gold` directly (brand-canon, not a `--chart-*` alias). The data-driven shape (vs. per-phase hard-coded matches) means future phase additions or canon renames trip the test with a single fixture update.
-   **W5-ζ.2 — phantom-class doc-bug retire in `src/styles/index.css`** — the utilities.css resident list at lines 48-49 named `.btn-press`, `.rainbow-text`, `.touch-gate` — none exist in source. Real names: `.btn-audacious` + `.btn-interactive` (press cluster), `.rainbow-vivid` + `.rainbow-pastel` (rainbow cluster). The `.touch-gate-target`/`.touch-gate-active` cluster lives at value.js, not glass-ui — retired from the comment. Doc-only edit; no source behaviour change.
-   **W5-ζ.3 — `--icon-3xl` rebound to `var(--size-icon-btn)` (contractual, not coincidental)** — `tokens.css:756` previously declared `--icon-3xl: 2.5rem` alongside `--size-icon-btn: 2.5rem` with a comment acknowledging the alignment was numerical only. The rebind makes the alignment contractual single-source-of-truth: `--icon-3xl: var(--size-icon-btn)`. Any future retune of the icon-btn size propagates automatically; the prior coincidence-trap retires.
-   **W5-γ — `<DockGroup>` archived (zero production consumers across two-plus tranches)** — DockGroup landed at P.W1.B as substrate for a speedtest `<MetricStrip>` pill-row consumer that never materialised. Per G-AI-D26 (Path B), the SFC retires. Deleted: `src/components/custom/dock-group/DockGroup.vue` + `index.ts` + `src/dock-group.ts` (subpath aggregator) + `src/styles/dock-group.css` + the `./dock-group` subpath entries in `package.json` (`typesVersions` + `exports`) + the `dock-group` `vite.library.ts` entry + the `@import "./dock-group.css"` line in `src/styles/index.css` + the `dock-group` demo story + the dashboard demo's `<DockGroup>` reference (the KPI strip absorbs into an inline-flex sibling row) + the `<DockGroup>` arm of the density-rail probe in `tests/components.smoke.spec.ts`. The `.dock-group` CSS class joins `.retired-classes.txt` for invariant-32/33 phantom-class gate coverage. Composables: none (DockGroup was zero-behaviour styling).
-   **W5-δ — `<ProgressiveSidebar>` family archived; composables retained** — the SFC family (`ProgressiveSidebar.vue` + `ProgressiveSidebarSection.vue` + `context.ts`) had 0 external consumers; words/frontend's parallel local `ProgressiveSidebar.vue` consumes the `useScrollTracker` + `useSidebarFollow` + `useTreeIndex` + `useSidebarState` composables only. Per G-AI-D26 (Path B), the SFC family retires; the composable surface stays load-bearing. Deleted: `ProgressiveSidebar.vue` + `ProgressiveSidebarSection.vue` + `context.ts` + `__tests__/ProgressiveSidebar.test.ts` + both navigation demo stories. Relocated: `src/components/custom/sidebar/types.ts` → `src/composables/sidebar/types.ts` (its actual home — the composables consume it; the SFCs were the misplaced consumers). The `./sidebar` subpath survives (composables-only now); `src/sidebar.ts` aggregator drops `export * from "./components/custom/sidebar"` and keeps `export * from "./composables/sidebar"`. `tests/public-surface.spec.ts` retires the `ProgressiveSidebar` runtime-export assertion at `subpathRuntimeExports`; the composable assertions (`useScrollTracker`, `useSidebarFollow`, `useTreeIndex`, `buildTreeIndex`) all survive. Demo manifest entries for the two retired stories retire.
-   **AI.W5 Phase 2 (NOT in this release)** — speedtest-consumer migrations. The W5-α apologetic-comment retire + `chassisPhase` switch simplification at `ChartsView.vue` lands when speedtest dispatches the consumer half; the W5-ε `(window as any)` retire via typed dev-handle (`tests-e2e/fixtures/window.d.ts`) + the W5-ζ.1 ToastProvider retire at `App.vue` also land at Phase 2. Phase 2 dispatches separately per precept 13.

The first phase of the AI.W4 wave — publisher-side writes only. Speedtest consumer migrations (CompleteBadge gold-bloom, MeterColumn idle backdrop, PaperBackdrop wrap on Complete/Thankyou, aurora cadence harmonisation, the 13 M.3 consumer sites) land in Phase 2 per precept 13's XR sub-protocol. Spec: `speedtest/docs/tranches/AI/artefacts/W4-spec.md`. Ratified user disposition: G-AI-D27 (YES on Q1 Metaballs idle backdrop, Q2 Aurora cadence harmonisation, Q5 btn-audacious press-ripple in-place, Q6 proposal additions; NO on Q3 needle micro-jitter, NO on Q4 DockLayerGroup sympathetic motion — Q3 + Q4 pruned at the dispatch gate).

-   **W4-M.1 — Progress gestalt publisher (`Progress.vue` + `tokens.css` + `instrument-chassis.css`)** — three typed-CSS lifecycles ship at once. `<Progress variant="gradient">` gains a `data-lifecycle="idle | loading | progressing | complete"` attribute (orthogonal to reka-ui's own `data-state` so consumers can target either path) that drives: (1) a 220ms intake pulse on the loading rising edge via the new `progress-intake-pulse` `@keyframes`; (2) a typed `@property --progress-crescendo: <percentage>` brightening overlay past 85% modelValue — the indicator paints a white leading-edge cap whose alpha interpolates smoothly via the Houdini typed-property contract; (3) a one-shot 240ms `progress-discharge-flash` brightness/saturation pulse at 100%. Additive `indeterminate?: boolean` prop hosts a 4s `progress-indeterminate-sweep` left-to-right gradient pan (the gradient variant only) for any consumer that wants the sweep without managing modelValue. The chassis backdrop on `<InstrumentChassis>` gains a typed `@property --phase-tint-amount: <percentage>` companion to the existing `--phase-color` cross-fade — the backdrop composes `color-mix(in oklab, var(--glass-bg-chassis), var(--phase-color) var(--phase-tint-amount))` and the typed amount interpolates over the speedtest-owned `--motion-duration-phase-handoff` (600ms fallback baked in for non-speedtest consumers). Idle returns to 0%; active phases (ping/download/upload/complete) lift to `--phase-tint-peak` (6%). PRM brackets at each consumer rule.
-   **W4-M.2 — `btn-audacious` press-ripple in-place (`utilities.css` + `tokens.css`)** — per G-AI-D27's Q5 ratification, the audacious recipe gains an in-place ripple rather than a `btn-audacious-with-ripple` sibling variant. The `::before` element paints a radial gradient whose typed `@property --ripple-radius: <length>` interpolates 0 → `--ripple-radius-max` (12rem) over `--motion-duration-ripple` (340ms) on `:active`; release returns to 0px. Coexists with the existing `::after` sparkle-sweep (hover) — both pseudo-elements share the same isolation context. PRM bracket retires the ripple transition; the transform/scale press beat survives. Q4 (DockLayerGroup sympathetic motion) — PRUNED at G-AI-D27; no DockLayerGroup writes.
-   **W4-M.3 — `<Skeleton variant="breath">` (`Skeleton.vue` + `tokens.css`)** — additive third variant on the existing primitive (alongside `pulse` and `shimmer`). The breath consumes the canon `--animate-ambient-pulse-duration` (6s) at the canon `--pulse-aura-opacity-min/max` envelope so a skeleton breath beside a `<Pulse variant="aura">` cycles in lockstep. Use case: the known-imminent loading register (chart series substitution, dashboard cell substitution) where 6s reads as "the surface is alive and resolving" rather than the 2s `pulse` short-wait register. `--skeleton-breath-duration` token aliases the cycle so consumers can retune without disturbing the broader ambient canon. PRM retires the cycle to the trough (opacity-min) — the surface still reads.
-   **W4-M.3 — Toast contract documentation (`transitions.css`)** — doc-only PR per spec §1.1.1 row 26. The Toast SFC consumes reka-ui's `tw-animate-css` defaults via the existing class chain; the new comment block in `transitions.css` (adjacent to the existing named transitions) codifies the entrance / dwell / exit grammar (~200ms slide-in from viewport edge → consumer-specified dwell with NO motion → ~150ms fade-out + slide-out-to-right) as the canonical toast motion contract. No source motion change.
-   **AI.W4 Phase 2 (NOT in this release)** — the speedtest consumer migration. ~11 consumer sites: CompleteBadge gold-blob bloom mount, MeterColumn idle Metaballs backdrop, SpeedtestResults + ThankYou PaperBackdrop wraps, aurora drift cadence harmonisation (~12s → ~30s in `auroraConfig.ts`), 13 M.3 cohesion sites (chart series stagger, distribution bar stagger, stats card overshoot, table row entrance, chip activation pulse, FlowSelector aura, AdminLoginView breath, scrim breath, hover-lift uniform rule), plus consumer verification that the existing `<Progress variant="gradient">` callsites in MeterColumn + SurveyResultDock compose with the new lifecycle automatically (no double-affirmation with the existing `result-dock-tick-pop`). Phase 2 dispatches separately per precept 13.
-   **`@property` browser-support note** — Chromium 85+, Safari 16.4+, Firefox 128+. Speedtest deployment targets sit well within the floor; unregistered fallback collapses to each `initial-value` so a pre-Houdini browser still paints the resting state.

## 2.0.0—2026-05-20—AI.W3 R3 close (motion subpath surgery; AI-CARRY-GLASS-UI-KEYFRAMES-EDGE CLOSED) — BREAKING

Major bump because the root barrel sheds the `composables/motion` re-export — a BREAKING change for any consumer that imported motion composables (or the `DAMPING` / `SNAP_THRESHOLD` constants, or the `RAFLoopTiming` / `PausableRuntime` types) from `@mkbabb/glass-ui`. Closes **AI-CARRY-GLASS-UI-KEYFRAMES-EDGE**, the 4-tranche chronic where glass-ui's root barrel statically reached `@mkbabb/keyframes.js` and forced every consumer's entry chunk to carry the ~102 KB raw / ~34 KB gz `keyframes-*.js` chunk regardless of whether the consumer touched a motion primitive. Mirrors the L.W1 Lane C SCC-trap closure that carved `/dark` + `/keyboard` + `/carousel` off the root barrel for the vueuse-bearing surface — same precedent, different heavy peer.

Spec: `speedtest/docs/tranches/AI/artefacts/W3-spec.md` §2.3 (W3-R3). Cross-repo XR sub-protocol per precept 13 — speedtest + value.js + bbnf-buddy + words + fourier-analysis consumer migrations dispatch at their respective LOCKSTEP waves (the speedtest-side migration is the W3 consumer half; sibling-repo migrations are tracked in `docs/tranches/AI/artefacts/`).

-   **`@mkbabb/glass-ui/motion` flat subpath added (AI.W3 R3 publisher)** — new `src/motion.ts` re-exports `composables/motion/index.ts` through a flat subpath, mirroring the `dark.ts` / `keyboard.ts` / `carousel.ts` shape. `package.json` `exports` adds `./motion` with `types` + `import` entries; `typesVersions` adds `motion → dist/motion.d.ts`; `vite.library.ts` adds the `motion` entry. The 11 runtime exports + ≥ 5 type exports moved: `useSpringOrchestrator`, `useAnimatedNumber`, `useAnimatedNumberMap`, `useStagger`, `useStaggerReveal`, `useScrollProgress`, `useRAFLoop`, `useIntersectionPause`, `installDarkModeSync`, `DAMPING`, `SNAP_THRESHOLD` (runtime); `RAFLoopTiming`, `PausableRuntime`, `AnimatedNumber`, `UseAnimatedNumberOptions`, `SpringSnapshot` (types).
-   **Root barrel `export * from "./composables/motion"` retired (`src/index.ts:147`)** — the load-bearing line per A4 §3 + W3-spec §2.3.1 deletes. The root barrel is now keyframes.js-free at static import time. Post-build, `grep -c "@mkbabb/keyframes" dist/glass-ui.js` returns 0 (was 1 pre-cut). Companion update to the doc comment block at the top of `src/index.ts` extends the "vueuse-bearing exclusions" canon into a "Heavy-peer exclusions (vueuse + keyframes.js)" table.
-   **Why the whole motion barrel moves, not just the keyframes-touching subset** — only `useSpringOrchestrator` + `useAnimatedNumber` (+ `useAnimatedNumberMap` transitively) statically import from `@mkbabb/keyframes.js`. The other composables in the sub-tree (`useStagger`, `useStaggerReveal`, `useScrollProgress`, `useRAFLoop`, `useIntersectionPause`, `installDarkModeSync`) are keyframes-free. They move anyway because the sub-tree's `index.ts` rolls up every leaf with `export *`, so Rollup walks the entire sub-tree as one SCC at root-barrel build time — splitting keyframes-touching from keyframes-adjacent would require a second internal sub-barrel, which is the wrong shape. The motion subpath is the canonical home for every kinetic composable; consumers reach `/motion` for any kinetic primitive regardless of which engine it currently touches.
-   **No back-compat root-barrel alias** — per precept 1 (NO workarounds) + precept 2 (NO legacy code) + L invariant 4 (no backwards-compat shims), the cut is clean. Consumers migrate at their dispatch gates; v1.9.x remains available on the patch stream for repos that cannot migrate immediately.
-   **`tests/public-surface.spec.ts` updated** — the 11 motion runtime symbols + 2 constants migrate from the `composableRuntimeExports` (root-surface) list to a new motion-subpath block in `subpathRuntimeExports`; the same names also land in `nonCoreRootRetirements` to assert the negative (motion symbols MUST NOT appear on the root surface in v2.0). `import * as Motion from "../src/motion"` joins the surface-fixture imports.
-   **`scripts/proof-consumers-static.mjs` updated** — `src/composables/motion/index.ts` retires from `rootContractFiles` (it's no longer a permitted root-barrel re-export source). The proof script auto-discovers the new `./motion` exports-map entry via the generic `pkg.exports` walk; no further bookkeeping needed.
-   **DESIGN.md surface** — Composables section gains a `@mkbabb/glass-ui/motion` subpath canon note. The motion composable rows acknowledge the subpath surgery + the heavy-peer-exclusion principle (cited from the L.W1 Lane C precedent).
-   **MIGRATION.md surface** — new `## v2.0.0—Motion subpath surgery (AI.W1 R3)` section documents the 11+ symbol moves with before/after snippets, codemod hints (`rg` patterns), the "why the whole sub-tree moves" rationale, and the verification recipe (`grep "@mkbabb/keyframes" dist/glass-ui.js` must be 0). Header gains a v2.0.0 banner.
-   **Bundle-graph verification (publisher side)** — post-build, `dist/glass-ui.js` (root barrel) ships ZERO static reach to `@mkbabb/keyframes.js`; `dist/motion.js` (the new subpath) carries the `NumericAnimation` + `SmoothProgress` reach. Verified via `grep -c "@mkbabb/keyframes"` on both files post-`npm run build`.

## AI.W1—2026-05-20—Card scroll-driven shrink + Chassis-prefix rename + Timeline #detail slot

First substantive wave of the AI tranche. Publisher-side writes only — speedtest + value.js consumer migrations dispatch in subsequent phases per precept 13. Spec: `speedtest/docs/tranches/AI/artefacts/W1-spec.md`.

-   **`<CardHeader shrink>` (AI.W1-α)** — additive `shrink?: boolean` modifier on the existing thin static SFC. When true, the header binds to the `--card-scroll` named scroll-timeline and runs a 3-lane choreography (header padding `0..120px`, title font-size `0..120px`, description grid-row collapse `0..80px`) keyed on `[data-slot="card-title"]` + `[data-slot="card-description"]`. The choreography migrates verbatim from value.js's `PaneHeader.vue` (the load-bearing pane-scroll-fade pattern that ran across the 9 panes); identifiers renamed `pane-*` → `card-*`. Default `shrink=false` is byte-identical to the pre-W1 wrapper — existing 5+ consumers unaffected. PRM bracket collapses animations to `0.01ms` for reduced-motion users.
-   **`.card-scroll-host` utility + `--card-header-bg` token (AI.W1-α)** — canonical scroll-overflow host emits `--card-scroll` and isolates it via `contain: layout style paint` (matches the value.js `PaneHeader.vue` isolation guarantee). Apply to the scroll wrapper inside a `<Card>` to arm the choreography. Disambiguated from the `.scroll-fade-*` mask family (which paints a gradient; this utility paints nothing). `--card-header-bg` parameterises the `color-mix(in srgb, var(--card) 60%, transparent)` literal value.js's PaneHeader carried (`bg-card/60`); consumers retune per-host via the cascade.
-   **`<CardTitle>` + `<CardDescription>` `data-slot` hooks** — both child SFCs now emit `data-slot="card-title"` / `data-slot="card-description"` so the scoped choreography selects on attribute hooks rather than class selectors. Consumer `class=` overrides cannot suppress the choreography. Matches `<Card>` and `<CardHeader>` patterns (which already emit `data-slot="card"` and `data-slot="card-header"`).
-   **`RegionDivider` → `ChassisDivider` rename (AI.W1-γ)** — host-prefix alignment so the instrument-chassis family's signature detail carries the family-root prefix (matching `InstrumentChassis`, `instrument-chassis.css`). SFC + `index.ts` export + `InstrumentChassis.vue` import & two render sites + JSDoc + `instrument-chassis.css` selector classes (`.region-divider*` → `.chassis-divider*`) all migrate at the same break. CSS custom property `--region-divider-vertical-height` → `--chassis-divider-vertical-height`. The composition story `demo/stories/compositions/instrument-chassis.vue` updates its import + render site. No back-compat shims (per the tranche posture). Consumer-side speedtest cascade follows in a later phase — there are 4 live `.region-divider` CSS selector sites (`SpeedtestResults.vue:287`, `ThankYou.vue:140`, `MapView.vue:109`, `ChartsView.vue:234`) + 2 doc-comments that must follow this rename when speedtest dispatches W1-γ Phase 2; this finding exceeds the spec's enumeration (the spec called out only the doc-comments).
-   **`<GlassTimeline #detail>` slot — continuous variant only (AI.W1-δ)** — `<ContinuousTimeline>` gains an internal `hoveredKey` ref + `effectiveSegment` (hovered ?? current) + `detailSource` (`"hovered"` / `"current"` / `"idle"`) computeds; emits an optional `#detail` scoped slot rendered as a sibling of the rail wrap with payload `{ segment, source, currentKey, hoveredKey }`. The dispatcher (`<GlassTimeline>`) forwards the slot in the `variant === "continuous"` branch only (option γ per post-RD-3 §3). Height reservation via `--timeline-detail-min-height` (default `1.25rem`) so idle ↔ active transitions do not reflow surrounding layout. Consumers compose `<Transition mode="out-in">` keyed on `segment.key` for the fade-swap choreography. The story `demo/stories/data/timeline-continuous.vue` migrates to exercise the slot (the prior consumer-side `hovered` + `selected` refs retire).
-   **DESIGN.md surface** — Card section gains a `<CardHeader shrink>` subsection documenting the named timeline, the required `.card-scroll-host` ancestor, the canonical recipe, and the PRM contract. Timeline section gains a `#detail` slot subsection documenting the payload shape, the two-keyed-children `<Transition mode="out-in">` requirement, and the new `--timeline-detail-min-height` token row.

## 1.9.2—2026-05-18—Q.W6 close (strengthened audit + phantom-class gate + precept advance) — Q CLOSED

Aggregate close ship for the Q tranche. 13-lane W6 audit + 6 consumer re-audits + FINAL.md.

-   **invariant-32/33 gate**: `scripts/proof-phantom-classes.mjs` + `.retired-classes.txt` registry — a fail-closed corpus-grep gate for retired CSS class names across the `@mkbabb/*` fleet; `--pre-deletion` mode for cleanup commits. `proof:phantom-classes` npm script + CI wiring.
-   **strengthened audit caught + fixed three real gaps in-wave**: a speedtest BLOCKER (5 dashboard SFCs imported the W3-retired `<ScrollPane>` — migrated to the Card recipe), words/frontend's 8 residual `glass-default`/`glass-elevated` phantom-class sites, and a keyframes.js gh-pages `outDir` clobber.
-   **precept submodule advance** (`3c32fae`): invariants 30-33 codified; `cross-repo-dev-resolution.md` canonical; 5 LESSONS-LEARNED entries; the π visual-runtime lane re-activated (contingent — canonical-when-tooling-available).
-   Q close report: `docs/tranches/Q/FINAL.md`.

## 1.9.1—2026-05-18—Q.W4 close (style/token co-location + CSS budget rebaseline)

Patch ship. Token co-location + cascade hygiene.

-   **Token promotion**: the 8-token metric-stack `--metric-row-*-clamp-*` private SFC dialect promoted to `tokens.css §metric`; the 6 `--timeline-dot-*` knobs promoted to `§timeline` — both now `:root`-overridable per the W3 token-home rule.
-   **Cascade hygiene**: manual `-webkit-backdrop-filter` prefixes retired across 4 SFCs (routed through the `glass.css` single-source mechanism); `transitions.css` wrapped in `@layer components` (was the last unlayered class sheet).
-   **Substrate-without-consumer**: `--scale-press-{xs,md,lg}` retired (zero fleet consumers; `sm`/`btn`/`dock` kept).
-   **CSS budget** rebaselined to ≈10% headroom (CSS draw 43,340 raw / 7,780 gzip).

## 1.9.0—2026-05-18—Q.W3 close (core-feature cohesion + substrate REVERTs + component DEMOTE)

Minor ship. Substrate transposition + three consumer-recovery reverts + two component retirements.

-   **Component DEMOTE**: `<ScrollPane>` + `<CartoonCard>` retired (both styling-only, zero-behaviour, single-consumer — fail L invariant 8; lifted out of Card's `variant` enum together at `e017d53`, retire together). `Card` gains an orthogonal `surface?: "glass" | "cartoon"` prop (default `"glass"`). `ui/` package count 43 → 41. Clean break — no aliases.
-   **Substrate REVERTs** (consumer-recovery): `.rainbow-vivid` / `.rainbow-pastel` / `.btn-interactive` re-promoted as `@utility` recipes (the `b0debec` D.W2.D retiral missed keyframes.js); redundant `typography.css` `:root` font-stack literals retired (`6ce14e5` shadowed consumer `@theme` overrides); IconTooltip `inline-flex` wrap-span retired (`25e1b5a` broke `w-full` descendants — keyframes PlaybackRibbon Slider) — WCAG 44×44 routed through each callsite's own contract.
-   **Cohesion**: dock `data-density` consolidated to `dock.css` (cascade-order dependency removed); `.glass-cartoon` re-modelled → decoration-only `@utility cartoon-surface` in `cards.css` (dead `--glass-*-cartoon` phantom tokens dropped); dropdown scoped-style migrated to `floating-panel.css` (menu family now uniformly global-CSS); `beec35e` dock hit-test duplication consolidated; token-home rule documented in DESIGN.md.

## 1.8.7—2026-05-18—Q.W2 close (Card props fail-explicit + bbnf-buddy variant migration)

`Card` (and siblings) dev-WARN on unknown/stale props via `_shared/useStalePropWarning.ts` (invariant 31, dev-WARN posture — `import.meta.env.DEV`-gated, production-silent). bbnf-buddy's 6 `<Card variant="pane">` sites migrated to the canonical `tier="wash" :shadow="false" :grain="false"` recipe.

## 1.8.6—2026-05-18—Q.W1 close (fleet-wide consumer un-break)

The `@mkbabb/value.js` phantom devDep (P.W5 band-aid) retired; glass-ui's `exports["."]` gains the `default` terminal key; explicit `resolve.conditions` in vite + vitest config. Pairs with the keyframes.js `exports` keystone fix + a 5-consumer resolver sweep that closed the cross-repo dev-resolution desync.

## 1.8.5—2026-05-18—Q.W0 close (cross-repo dev-resolution contract + proof gate)

`scripts/proof-resolution-contract.mjs` fail-closed gate + `proof:resolution` npm script + CI wiring. Contract documented at `docs/precepts/cross-repo-dev-resolution.md`. Post-P shadow-cohort retrospective authored at `docs/tranches/AB+2/`.

## 1.8.4—2026-05-16—P.W6 close (13-lane audit + PD-1/PD-2 archive + precept submodule advance + FINAL.md) — P CLOSED

Aggregate close ship for the P tranche. Documentation + audit ledger + precept invariants 28/29 + FINAL.md. Zero source-API changes; the only code-adjacent edit is the CLAUDE.md /api count resync (66 / 62 types + 4 constants).

### 13-lane audit (6 consolidated agent deliverables)

| Lane                         | Agent deliverable             | Verdict                                                              |
| ---------------------------- | ----------------------------- | -------------------------------------------------------------------- |
| α plan-vs-actual             | `W6-audit-alpha-beta.md`      | CLEAN                                                                |
| β substrate-without-consumer | `W6-audit-alpha-beta.md`      | CLEAN                                                                |
| γ doc-drift                  | `W6-audit-gamma-delta.md`     | MINOR (absorbed inline)                                              |
| δ idiomatic-gestalt          | `W6-audit-gamma-delta.md`     | MINOR (absorbed inline)                                              |
| ε performance                | `W6-audit-epsilon-pi-iota.md` | CLEAN                                                                |
| π visual-runtime             | `W6-audit-epsilon-pi-iota.md` | ATTEMPTED + ARCHIVED-permanent (`archive/visual-runtime-tooling.md`) |
| ι integrity-sweep            | `W6-audit-epsilon-pi-iota.md` | CLEAN                                                                |
| P11/a words/frontend         | `W6-P11-Lane-ab-rerun.md`     | CLEAN                                                                |
| P11/b fourier-analysis       | `W6-P11-Lane-ab-rerun.md`     | CLEAN                                                                |
| P11/c bbnf-buddy             | `W6-P11-Lane-cd-rerun.md`     | CLEAN                                                                |
| P11/d keyframes.js           | `W6-P11-Lane-cd-rerun.md`     | CLEAN                                                                |
| P11/e value.js               | `W6-P11-Lane-ef-rerun.md`     | CLEAN                                                                |
| P11/f speedtest              | `W6-P11-Lane-ef-rerun.md`     | CLEAN                                                                |

13 lanes / 11 CLEAN + 2 MINOR / 0 BLOCKER. Both MINOR findings absorbed inline at this close: CLAUDE.md /api count refreshed 55 → 66 (62 types + 4 constants); precept submodule advance committed at submodule HEAD `3310a8c` (was authored-not-committed at audit time).

### Formal-archive ledger (9 entries)

-   `archive/vue-passive-listeners.md` — PD-1 PERMANENT.
-   `archive/cache-ttl.md` — PD-2 PERMANENT.
-   `archive/value-js-wip-branch.md` — PD-3 PERMANENT (W5.md A.5 fallback).
-   `archive/use-popup-mutex.md` — CONSUMER-PRIVATE.
-   `archive/idle-bob.md` — CONSUMER-PRIVATE.
-   `archive/keyframes-overfitting.md` — CONSUMER-ORCHESTRATOR-OWNED.
-   `archive/bbnf-buddy-53-findings.md` — CONSUMER-SIDE-CARRY.
-   `archive/words-frontend-substrate-pending.md` — MIXED (E.3 ADDRESSED via substrate extension at v1.8.3; E.4 + E.5 ARCHIVED).
-   `archive/visual-runtime-tooling.md` — π lane 3-strike formal-archive.

### Precept submodule advance

`docs/precepts` advances from HEAD `46ee7e9` (O.W0 close) → `3310a8c` (P close):

-   `tranche/SPEC.md §Close` — invariant 28 (zero deferral at tranche close) codified.
-   `tranche/SPEC.md §"Retrospective Discipline"` — invariant 29 (AB+1 retrospective discipline) added.
-   `LESSONS-LEARNED.md` — 3 entries appended (51 + 52 + 53; the LL ledger advances 50 → 53).

### FINAL.md

Authored at `docs/tranches/P/FINAL.md` per the close-honesty checklist. 38 inheritance-ledger items dispositioned; zero P-residuals exit close. Per-wave landing summary + audit verdict matrix + hard-gate checklist + version cadence + authority section + permanent-archive index.

### Inheritance-ledger summary (re-stated at close)

-   7 O internal carry-forwards: 7 ADDRESSED.
-   7 O cross-repo carry-forwards: 5 ADDRESSED + 2 RETIRED-at-open.
-   3 PERMANENT-DEFER items: 3 ARCHIVED-PERMANENT (PERMANENT-DEFER classification itself RETIRES at P).
-   AB+1 shadow-execution cohort: ADDRESSED (retrospective at `docs/tranches/AB+1/`).
-   14 new P-audit debts: 14 ADDRESSED.
-   W5 Lane E flagged: E.3 ADDRESSED via substrate extension; E.4 + E.5 ARCHIVED.
-   Pβ overfitting classification: 2 archive entries.

**Total**: 38 inheritance items dispositioned. **Zero P-residuals.**

### Verification

All 8 gates GREEN at v1.8.4:

-   `npm run typecheck` — PASS.
-   `npm run build` — PASS (heap-bump baked at v1.8.1).
-   `npm run verify-export-types` — PASS.
-   `npm run profile:budget` — PASS (CSS 89.0% raw / 90.2% gzip; ε agent flagged gzip headroom thin at 9.8% remaining; flagged for successor-tranche awareness).
-   `npm test` — PASS (32 files / 367 tests).
-   `npm run audit:stash` — PASS (clean).
-   `npm run proof:package` — PASS.
-   `npm run proof:theme` — PASS.

### P tranche CLOSED

Final aggregate tag: v1.8.4. Glass-ui-side carry to successor tranche: ZERO P-residuals. Future tranches open with a clean ledger.

## 1.8.3—2026-05-16—P.W5 close (cross-repo MULTI-WRITER batch + MetricRow substrate extension + archive ledger)

Patch ship. The W5 close glass-ui-side bundle absorbs the cross-repo dispatch's inline-surfaced substrate gap + the formal-retirement archive ledger.

### MetricRow clamp-endpoint substrate extension (E.3 unblock)

Per the W5 Lane E partial-completion report § E.3: `<MetricRow>` value clamp floored at `4.5rem` (audacious-poster register; speedtest-bound) — words/frontend's compact metric cells need order-of-magnitude smaller register (text-title to text-4xl). Per P invariant 28 + idiomatic-gestalt: substrate extension shipped inline at W5 close rather than deferring consumer adoption.

`src/components/custom/metric-stack/MetricRow.vue` value + unit clamp endpoints routed through CSS-var tokens with audacious-poster defaults preserved bit-for-bit:

```css
.metric-row__value {
    font-size: clamp(
        var(--metric-row-value-clamp-min, 4.5rem),
        ...,
        var(--metric-row-value-clamp-max, var(--type-display-hero))
    );
}
.metric-row__unit {
    font-size: clamp(
        var(--metric-row-unit-clamp-min, 1.5rem),
        ...,
        var(--metric-row-unit-clamp-max, 3.25rem)
    );
}
```

Consumers shrinking the register override at `:root` or per-row scope. Canonical custom-property cascade per DESIGN.md texture-system pattern.

### `@mkbabb/value.js` devDep declaration

Per the W5 close gate verification: glass-ui's tests transitively import keyframes.js@2.1.0's dist, which imports `@mkbabb/value.js`. Without value.js installed glass-ui's test runner fails on import-time resolution. Declared as glass-ui devDep (`file:../value.js`) so the transitive-resolution boundary is explicit + reliable.

### Archive ledger (Lane F)

Five archive entries at `docs/tranches/P/archive/`:

-   `value-js-wip-branch.md` — PD-3 formal-archive (WIP-branch LAND fold per W5.md A.5 fallback).
-   `use-popup-mutex.md` — CONSUMER-PRIVATE.
-   `idle-bob.md` — CONSUMER-PRIVATE (RETIRE-as-inline at keyframes.js).
-   `keyframes-overfitting.md` — CONSUMER-ORCHESTRATOR-OWNED.
-   `bbnf-buddy-53-findings.md` — CONSUMER-SIDE-CARRY.

Plus `words-frontend-substrate-pending.md` documenting the E.3 / E.4 / E.5 mixed dispositions (E.3 ADDRESSED with this substrate ship; E.4 + E.5 ARCHIVED).

### Cross-repo MULTI-WRITER commits (this close ceremony)

| Repo             | Commit    | Status                                                                                       |
| ---------------- | --------- | -------------------------------------------------------------------------------------------- |
| fourier-analysis | `4df1a06` | pushed origin/master                                                                         |
| keyframes.js     | `2183f32` | pushed origin/master                                                                         |
| bbnf-buddy       | `dafb99f` | local only (no remote)                                                                       |
| words/frontend   | `5c1b2b8` | pushed origin/master                                                                         |
| value.js         | `755b3cd` | local only on `w.w2.1-value-js-prebuild` WIP branch; NOT pushed per PD-3 archive disposition |

### Verification

All 8 W5 close gates PASS at glass-ui:

-   `npm run typecheck` — PASS.
-   `npm run build` — PASS (29.94 s; Lane A bake).
-   `npm run verify-export-types` — PASS.
-   `npm run profile:budget` — PASS (CSS 89.0% raw / 90.2% gzip).
-   `npm test` — PASS (32 files / 367 tests; +2 from W5 Lane A.1 surface-lock additions).
-   `npm run audit:stash` — PASS (clean; zero stash entries).
-   `npm run proof:package` — PASS (Lane B inline absorbs).
-   `npm run proof:theme` — PASS (Lane B inline absorbs).

### Inheritance ledger absorbed at W5

| P ID                    | Item                                                            | Status                                        |
| ----------------------- | --------------------------------------------------------------- | --------------------------------------------- |
| CR-1                    | value.js v1.7.0 adoption fix                                    | ADDRESSED (Lane A; demo/@/\* on WIP branch)   |
| CR-2                    | fourier-analysis dock injects + useClipboard + HoverCard        | ADDRESSED (Lane B; pushed)                    |
| CR-3                    | keyframes.js HeaderRibbon + scale-on-hover + Fira Code CDN drop | ADDRESSED (Lane C; pushed)                    |
| CR-4                    | value.js HeaderRibbon retire + 19→17 useClipboard bulk flip     | ADDRESSED (Lane A; WIP branch)                |
| CR-5                    | bbnf-buddy ToolsLayer :deep retire                              | ADDRESSED (Lane D; local)                     |
| P11/c useLeaveTimer     | RETIRE-as-inline                                                | ADDRESSED (Lane D; local)                     |
| P11/a E.1               | Fira Code CDN drop (words/frontend)                             | ADDRESSED (Lane E; pushed)                    |
| P11/a E.2               | scale-on-hover (words/frontend)                                 | ADDRESSED (Lane E; 15 sites; pushed)          |
| P11/a E.3               | MetricRow compact register                                      | ADDRESSED (substrate extension at this close) |
| P11/a E.4               | ProgressiveSidebar adoption                                     | ARCHIVED-CONSUMER-DESIGN-PENDING              |
| P11/a E.5               | PaperBackdrop adoption                                          | ARCHIVED-CONSUMER-ORCHESTRATOR-OWNED          |
| PD-3                    | value.js WIP-branch LAND                                        | ARCHIVED-PERMANENT (W5.md A.5 fallback)       |
| Pβ usePopupMutex        | single-consumer composable                                      | ARCHIVED-CONSUMER-PRIVATE                     |
| Pβ idle-bob             | single-site utility                                             | ARCHIVED-CONSUMER-PRIVATE                     |
| P11/d 84% overfitting   | keyframes.js consumer-orchestrator-owned                        | ARCHIVED-CONSUMER-ORCHESTRATOR-OWNED          |
| P11/c 53-finding ledger | bbnf-buddy consumer-side                                        | ARCHIVED-CONSUMER-SIDE-CARRY                  |

Per P invariant 28: zero P-residuals exit W5. Every inheritance-ledger item is ADDRESSED or ARCHIVED-with-rationale.

## 1.8.2—2026-05-16—P.W5 Lane A.1 (`copyToClipboard` bare co-export; glass-ui-side prereq for value.js Path B)

Patch-level ship. Single glass-ui-side artefact unblocks the P.W5 cross-repo MULTI-WRITER batch.

### `copyToClipboard` bare co-export (Path B)

Per P11/e §"useClipboard Path A vs B—RECOMMEND PATH B" + W5.md Lane A.1. value.js's 19 call sites of `copyToClipboard(text): Promise<boolean>` couldn't bulk-flip to `useClipboard()` because the surface shapes diverge (`useClipboard()` returns `{ copied, copy }`, not a bare function).

Path B: add an additive bare co-export from `src/composables/dom/useClipboard.ts`:

```ts
export async function copyToClipboard(
    text: string,
    options?: UseClipboardOptions
): Promise<boolean>;
```

Auto-flows to the root barrel via the existing `export * from "./useClipboard"` chain.

Refactor: the composite copy-path helpers (`writeViaClipboardApi` + `writeViaExecCommand`) lifted from `useClipboard()`'s closure to module-scope. Both surface shapes (`useClipboard()` composable + `copyToClipboard()` bare function) share one implementation. `useClipboard()`'s internal `copy()` delegates to `copyToClipboard()` for the copy attempt + layers the reactive `copied` flip + auto-reset window on top.

`tests/public-surface.spec.ts` `composableRuntimeExports` extended with `useClipboard` + `copyToClipboard` to lock the root-barrel runtime surface.

### Consumer migration

value.js's 19 sites bulk-flip via 1-line import rewrite per call site at P.W5 Lane A.4 (post-v1.8.2 ship):

```diff
- import { copyToClipboard } from "@/composables/useClipboard";
+ import { copyToClipboard } from "@mkbabb/glass-ui";
```

The local consumer-side composable retires at the same write.

### Verification

All 8 gates PASS: typecheck + build (Lane A bake; no env prep) + verify-export-types + profile:budget (CSS unchanged; JS +42 raw / +20 gzip) + test (365/365) + audit:stash + proof:package + proof:theme.

### Inheritance ledger absorbed at W5 Lane A.1

| P ID         | Item                               | Status                                                                 |
| ------------ | ---------------------------------- | ---------------------------------------------------------------------- |
| P11/e Path B | useClipboard bare co-export prereq | ADDRESSED (glass-ui-side ship; consumer-side migration at W5 Lane A.4) |

## 1.8.1—2026-05-16—P.W4 (pipeline + style + demo + µ-split absorbs)

Patch-level cohort. Six lanes (four agent-dispatched + two orchestrator-direct) cohesively absorb the Pε pipeline carry, the corpus-wide style-precept sweep, the demo-tier coverage debt, and the µ-split decision. Plus three inline absorbs catching stale gates surfaced by Lane B's CI integration.

### Lane A—Heap-bump bake (Pε-2; Path B)

Investigation of the `vite-plugin-dts` memory profile showed peak RSS 6.74 GB driven primarily by `typescript/lib/typescript.js` (397.49 MiB sampled) + api-extractor re-instantiation across the 44-entry library matrix. The upstream-dep characteristic doesn't admit a glass-ui-local bound without sacrificing rolled-up dts artefact shape (Path A escape hatch confirmed per Pε R4).

Disposition (per P invariant 28 ADDRESS not defer): `package.json.scripts.build` baked the heap bump as the canonical baseline:

```diff
-    "build": "vite build",
+    "build": "NODE_OPTIONS=--max-old-space-size=8192 vite build",
```

`CLAUDE.md` `## Build` section gains a 1-paragraph rationale. `scripts/release.sh` + `.github/workflows/ci.yml` continue to set the env var defensively; the local-dev `npm run build` no longer requires consumer-side env prep. The bump becomes the documented baseline; the workaround taxonomy retires.

### Lane B—CI proof:\* subset (Pε-3) + 3 inline absorbs

`.github/workflows/ci.yml` gains 4 new steps after `profile:budget`: `proof:package` + `proof:theme` + `proof:consumers:static` + `audit:stash`. Total CI delta ~3 s.

Adding the proof:\* steps exposed three stale glass-ui-side issues the gates had been silently allowing. Per P invariant 28 (ship enforcement when the trigger fires), all three closed inline at W4 Lane B:

1. `scripts/proof-package.mjs` probe.ts surface drift: `useGlobalDark` moved to `@mkbabb/glass-ui/dark` at L.W1 + `DockPopover` was a phantom symbol. Probe updated to `useGlobalDark` from `/dark` + `DockDropdownTrigger` (canonical compound).
2. `scripts/proof-theme-style.mjs` `blur-glass-subtle` was a pre-L.W1 retired utility. Replaced with `blur-glass-resting` (canonical 5-rung-ladder default).
3. `DockTabButton.vue` scoped style block (`--dock-tab-h` density-keyed height knob) migrated to `src/styles/dock.css` `.dock-tab-button` rule. Closes the proof's "dock scoped style block remains" forbid per O.W3 dock canonicalization.

### Lane C—tailwind-merge cruft retire (Pε-4)

`scripts/proof-package.mjs:113` synthetic-consumer manifest dropped `tailwind-merge` (retired at v0.9.2; `cn()` ships its own deduplicator). The proof now verifies consumers DON'T need `tailwind-merge` in their dependency manifest to consume glass-ui.

### Lane D—Style precept sweep + module-registries doc + press-scale ladder

Four sub-tasks per P-6 + Pγ.4 + O-N-7:

1. **Banned-word sweep**: ~70 prose-tier replacements across 23 files in `docs/tranches/{O,P}/`. Dominant pattern: `leverage` → `impact` / `use` / `affordance` / `adoption` per phrase-fit. Carve-outs preserved at `O/FINAL.md` (frozen close) + sibling lane proof docs + dispatch instruction text.
2. **Em-dash sweep**: ~3362 spaced em-dashes collapsed to unspaced per STYLE.md mandate. Carve-outs preserved at `O/FINAL.md` (30 dashes; frozen close) + `CHANGELOG.md` entries before `## 1.1.4` (pre-O frozen).
3. **Module-registries doc**: `DESIGN.md:1115-1116` gains `generatedRowIds` (`WeakMap`) + `warnedRowIdentityIssues` (`Set`) entries citing `src/components/ui/data-table/DataTable.vue:61-62`. Plus a vueuse-wrapped-registry footnote covering `useGlobalDark` + `useShortcutRegistry`.
4. **Press-scale ladder**: `src/styles/tokens.css:745-758` adds the 4-rung ladder `--scale-press-{xs: 0.98, sm: 0.97, md: 0.96, lg: 0.95}`. `--scale-press-btn` aliased to `--scale-press-sm` (0.97; preserves pre-W4 button-press visual). `DESIGN.md:287` + `:300-314` document the rung mapping covering words/frontend's 9-site distribution.

### Lane E—Demo stories (4 W6 promotions + 3 W3 stub stories)

Seven new stories under `demo/stories/`:

| #   | Path                                            | Feature                                                      |
| --- | ----------------------------------------------- | ------------------------------------------------------------ |
| 1   | `composables/use-clipboard.vue`                 | `useClipboard()` composable (resetMs ladder + API surface)   |
| 2   | `custom/header-ribbon.vue`                      | `<HeaderRibbon>` SFC (position toggle)                       |
| 3   | `dock/icon-button-token-ladder.vue`             | `--dock-active-*` cohort (5 override scopes + live dock)     |
| 4   | `utilities/scale-on-hover.vue`                  | `@utility scale-on-hover` (4-scope hover-scale ladder)       |
| 5   | `sliders/glass-scrubber.vue`                    | `<Slider variant="glass-scrubber">` (6-variant comparison)   |
| 6   | `navigation/progressive-sidebar-section.vue`    | `<ProgressiveSidebarSection>` slotted primitive in isolation |
| 7   | `foundations/paper-backdrop-texture-system.vue` | `<PaperBackdrop>` clean/aged + `--paper-*` cascade retint    |

`demo/stories/manifest.ts` gains 3 rows in existing categories + 4 new categories (`custom/` + `dock/` + `utilities/` + `sliders/`).

### Lane F—Formal µ-split retirements (Pβ §"O-residual µ-splits")

Both µ-splits already-retired by non-execution at HEAD:

-   `find src -name 'dragGhost*'` → zero results. Ghost helper inline at `useSortable.ts` (lines 161, 230-331) as closure-state-sharing locals.
-   `find src/styles -name 'btn-audacious*'` → zero results. `@utility btn-audacious` inline at `src/styles/utilities.css:578`.

Decision: **FORMAL RETIREMENT** documented; no source-tree mutations needed. The Pβ recommendation matched the HEAD state.

### Verification

-   `npm run typecheck`—PASS.
-   `npm run build`—PASS (no env-prep needed; Lane A bake).
-   `npm run verify-export-types`—PASS.
-   `npm run profile:budget`—PASS.
-   `npm test`—PASS (32 files / 365 tests).
-   `node scripts/audit-stash-list.mjs`—PASS (clean).
-   `npm run proof:package`—PASS (post probe-fix at Lane B inline-absorb).
-   `npm run proof:theme`—PASS (post fixes at Lane B inline-absorb).

### Inheritance ledger absorbed at W4

| P ID                       | Item                                    | Status                              |
| -------------------------- | --------------------------------------- | ----------------------------------- |
| Pε-2                       | Heap-bump root-cause OR bake            | ADDRESSED (Lane A; Path B bake)     |
| Pε-3                       | CI proof:\* subset                      | ADDRESSED (Lane B)                  |
| Pε-4                       | tailwind-merge cruft                    | ADDRESSED (Lane C)                  |
| P-6                        | Banned-word + em-dash sweeps            | ADDRESSED (Lane D)                  |
| Pγ.4                       | 2 missed module-registries              | ADDRESSED (Lane D)                  |
| O-N-7 / P11/a I4           | Press-scale ladder                      | ADDRESSED (Lane D)                  |
| P-4                        | 4 W6 demo stories + 3 W3 stub stories   | ADDRESSED (Lane E)                  |
| Pβ µ-split-1 + µ-split-2   | dragGhost + btn-audacious µ-splits      | ADDRESSED (Lane F; already-retired) |
| Lane B inline absorbs (×3) | stale probe + stale lint + scoped style | ADDRESSED (Lane B)                  |

## 1.8.0—2026-05-16—P.W3 HEADLINE (substrate promotions—GlassScrubber + ProgressiveSidebar slotted-chassis + PaperBackdrop /api)

Minor-level cohort. Three parallel substrate promotions clear the ≥ 2-consumer bar per N invariant 23 wire-before-retire. The architectural transposition the P tranche is built around.

### Lane A—`<Slider variant="glass-scrubber">` (P-5 carry; fourier-analysis substrate)

`src/components/ui/slider/index.ts` `sliderVariants` CVA gains a 6th `variant` entry (`glass-scrubber`). `src/components/ui/slider/Slider.vue` scoped CSS adds `[data-variant="glass-scrubber"]` block targeting `.slider-track` / `.slider-range` / `.slider-thumb` with scrubber-canonical geometry:

-   Track: 1.25 rem (20 px median of fourier-analysis's 3 sites' 16/20/24 px), `--surface-tint-6` resting → `--surface-tint-8` hover, `--glass-blur-quiet` backdrop-filter.
-   Range: `--surface-tint-8` resting → `--surface-tint-15` hover, pill radius.
-   Thumb: 6×16 px thin bar, hidden at rest (opacity:0), materializes on hover / focus / `[data-held]` / `[data-touch-active]` and grows to 8×18 px with `--surface-tint-40`.
-   Focus ring: `0 0 0 2px color-mix(in srgb, var(--ring) 40%, transparent)`—matches the 3 recipes verbatim.

All paints compose existing substrate tokens (`--surface-tint-N`, `--ring`, `--glass-blur-quiet`, `--radius-pill`, `--duration-fast`, `--ease-standard`, `--scale-press-btn`). Zero hardcoded colors. No new tokens shipped—divergence axes route through inline `var(--slider-scrub-*, default)` per the existing slider scoped-CSS pattern.

**≥ 2-consumer verification**: 3 fourier-analysis sites (GlassTimeline + SliderControl + ConvergenceTimeline)—562 LOC shadow recipe absorbable to ~140 LOC at the `<Slider variant="glass-scrubber">` consume. Consumer-side cross-walk lands at P.W5 Lane B.

### Lane B—ProgressiveSidebar slotted-chassis split (P11/a G2 HEADLINE)

`src/components/custom/sidebar/ProgressiveSidebar.vue` refactored to support two mutually-exclusive composition modes:

1. **TOC mode** (existing): `state: SidebarState` drives 3-level tree rendering. Bit-for-bit preserved—the v0.x XSS-prevention test continues to exercise this path unchanged.
2. **Slotted mode** (NEW): omit `state`; place `<ProgressiveSidebarSection>` children in the default slot. The chassis installs a DI context; sections register on mount via the new typed-key + helper-pair pattern.

New artefacts:

-   `src/components/custom/sidebar/ProgressiveSidebarSection.vue` (NEW SFC)—slotted section primitive with `id` + `label` + `icon` props + `#header` + default slots + optional-context DI registration.
-   `src/components/custom/sidebar/context.ts` (NEW DI module)—`PROGRESSIVE_SIDEBAR_CONTEXT_KEY` + `provideProgressiveSidebarContext` + strict `useProgressiveSidebarContext()` + befitting `useOptionalProgressiveSidebarContext()`. Mirrors P.W2 Lane B `SortableList` + O.W2 `DockLayerGroup` precedents per invariant 25.

`src/components/custom/sidebar/index.ts` re-exports the section SFC + context primitives + helper pair.

Test coverage: existing XSS-prevention test preserved verbatim; +4 NEW tests cover slotted rendering, DI register/unregister lifecycle, active-section cascade, and standalone-section optional-context fallback. Test count 361 → 365.

**≥ 2-consumer verification**:

1. words/frontend `WordlistProgressiveSidebar.vue` (319 LOC) + co-located `ProgressiveSidebar.vue` (150 LOC) = 469 LOC parallel implementation; consumer-side absorption at P.W5 Lane E.
2. glass-ui demo `demo/stories/navigation/sidebar.vue`—slotted-mode story landed at this commit (Filters + Sort + Tags sections; consumer #2 LANDS at this wave, not deferred).

### Lane C—PaperBackdrop /api promotion + texture-system DESIGN.md

`src/components/custom/paper-backdrop/PaperBackdrop.vue`: inline `defineProps` lifted to `export interface PaperBackdropProps` (HeaderRibbon precedent matching P.W1 Lane A's 5-SFC pattern). `export type PaperBackdropFrequency = "clean" | "aged"` shipped with JSDoc.

`src/api/index.ts` gains a "Paper / texture" section re-exporting `PaperBackdropProps` + `PaperBackdropFrequency`. Surface count 64 → **66** (62 types + 4 constants).

`DESIGN.md` adds a "Texture system" section (lines 1239-1290) documenting:

-   Substrate of choice: `<PaperBackdrop>` + `paper-underpaint` + `paper-grain-overlay` utilities.
-   Custom-property cascade pattern: consumers retint texture via `--paper-*` CSS variables at `:root` rather than reaching inside scoped styles (parallel to `--phase-color-*` per AC.W6c).
-   4-step migration path for consumers retiring parallel `useTextureSystem` implementations.

**≥ 2-consumer verification**:

1. words/frontend—503 LOC parallel implementation (`useTextureSystem.ts` 162 LOC + 3 texture SFCs 341 LOC); cross-walk lands at P.W5 Lane E.
2. glass-ui demo—9 production-binary call sites at HEAD (AppShell substrate + 4 paper-backdrop story instances + 6 paper-grain-overlay utility consumers).

### CSS budget re-baseline (W3 close)

Lane A's glass-scrubber variant + Lane B's slotted-chassis chassis added scoped-CSS draw. Pre-W3 budget (P.W0 baseline: 42_000 raw / 7_400 gzip) flagged 97.3% raw / 99.9% gzip—the gzip cap would FAIL on the next byte. Bumped to **46_000 raw / 8_200 gzip** (≈ 11% headroom raw + ≈ 11% headroom gzip) at W3 close per the canonical "tranche-close re-baseline against substrate additions" pattern. Post-rebaseline: 88.9% raw / 90.2% gzip—healthy headroom. Rationale captured inline in `scripts/profile-bundle.mjs`.

### Verification

-   `npm run typecheck`—PASS.
-   `NODE_OPTIONS=--max-old-space-size=8192 npm run build`—PASS (28.55 s).
-   `npm run verify-export-types`—PASS.
-   `npm run profile:budget`—PASS (post-rebaseline).
-   `npm test`—PASS (32 files / 365 tests; +4 from Lane B coverage).
-   `node scripts/audit-stash-list.mjs`—PASS (clean; zero stash entries; the W2 fail-closed gate continues to hold).

### Inheritance ledger absorbed at W3

| P ID            | Item                                                    | Status                           |
| --------------- | ------------------------------------------------------- | -------------------------------- |
| P-5             | GlassScrubber substrate (3 fourier-analysis sites)      | ADDRESSED (Lane A)               |
| P11/a G2        | ProgressiveSidebar slotted-chassis split                | ADDRESSED (Lane B)               |
| P11/a G3 + I2   | PaperBackdrop /api promotion + texture-system migration | ADDRESSED (Lane C)               |
| P-2 (recurrent) | CSS budget re-baseline at substrate-promotion close     | ADDRESSED (W3 close re-baseline) |

## 1.7.2—2026-05-16—P.W2 (invariant-25 paired-helper completion + UseDockStateReturn + stash-audit script)

Patch-level cohesion release. Four parallel lanes + one inline absorb; additive at the consumer surface.

### Lane A—`CONFIGURATOR_DENSITY_KEY` paired helpers (optional-only per Pδ intent)

`src/components/custom/configurator/density.ts` gains `provideConfiguratorDensity(density: ComputedRef<ConfiguratorDensity>): void` + `useOptionalConfiguratorDensity(): ComputedRef<ConfiguratorDensity> | null`. **No strict counterpart** shipped—per Pδ §2.2 + invariant 25's "per intent" clause: rows render bare → strict helper would be dead code.

Call-site migrations: `Configurator.vue` replaces `provide(CONFIGURATOR_DENSITY_KEY, ...)` with `provideConfiguratorDensity(...)`; `ConfiguratorRow.vue` replaces `inject(CONFIGURATOR_DENSITY_KEY, undefined)` with `useOptionalConfiguratorDensity()`. Prop-over-inject precedence preserved; the `data-density` no-emit visual is bit-for-bit unchanged.

### Lane B—`SORTABLE_CONTEXT` paired helpers (strict-only per Pδ intent)

`src/components/custom/sortable-list/context.ts` gains `provideSortableContext(sortable: UseSortableReturn): void` + `useSortableContext(): UseSortableReturn` (strict; throws when invoked outside `<SortableList>`). **No optional counterpart**—`<SortableItem>` is meaningless without a parent list per Pδ §2.2.

Naming: `useSortableContext()` not `useSortable()`—avoids collision with the existing `useSortable<T>()` composable at `src/composables/sortable/useSortable.ts` per Pδ R1.

Call-site migrations: `SortableList.vue` replaces `provide(SORTABLE_CONTEXT, sortable)` with `provideSortableContext(sortable)`; `SortableItem.vue` replaces the 6-line `inject` + inline-throw block with the 1-line `useSortableContext()` call. Throw payload preserved verbatim; package-prefix upgraded `[glass-ui]` → `[glass-ui:sortable]` to match the O.W2 canonical helper shape.

### Lane C—`GlyphFaceSilhouetteKey` paired helpers + UPPER_SNAKE_CASE rename (clean break)

`src/components/custom/glyph-face/keys.ts` renames `GlyphFaceSilhouetteKey` (PascalCase) → `GLYPH_FACE_SILHOUETTE_KEY` (UPPER_SNAKE_CASE)—matches every other typed key at HEAD. Clean break per P invariant 5; no PascalCase alias preserved.

Adds `provideGlyphFaceSilhouette(slot: Ref<string | undefined>): void` + `useOptionalGlyphFaceSilhouette(): Ref<string | undefined> | null`. **No strict counterpart**—`<DiscoGlyph>` stands alone per Pδ §2.2.

Call-site migrations: `GlyphFace.vue` + `DiscoGlyph.vue` updated. Debug-label of the `Symbol()` upgraded from `"GlyphFaceSilhouette"` to `"glass-ui:glyph-face-silhouette"` per the O.W2 `glass-ui:dock-context` convention.

### Lane D—`UseDockStateReturn` interface annotation + /api promotion

`useDockState()` previously returned an inferred shape—the surviving inline-return outlier after O.W4 Lane B fixed `useAurora`. P.W2 Lane D closes Pγ.3:

-   `src/components/custom/dock/composables/useDockState.ts` adds `export interface UseDockStateReturn` with the exact 13-field shape (`state` + `expanded` + `isPinned` + `isHeld` + `onMouseEnter` / `Leave` / `FocusIn` / `Out` / `ClickCollapsed` + `keepOpen` / `release` + `expand` / `collapse`). Function annotated `useDockState(options: UseDockStateOptions): UseDockStateReturn`.
-   `src/components/custom/dock/composables/index.ts` re-exports the type.
-   `src/components/custom/dock/index.ts` extends the O.W4 Lane B + P.W1 Lane B re-export block.
-   `src/api/index.ts` promotes `UseDockStateReturn` under a new Dock section—composable-return canon paralleling `UseClipboardReturn`.

Surface count: 63 → **64** (60 types + 4 constants).

### Inline absorb—stash anti-pattern 6th + 7th recurrences (`scripts/audit-stash-list.mjs` authored)

Two of the four W2 lane agents (Lane C + Lane D) self-reported `git stash + git stash pop` build-isolation violations of the hardened agent git clause. Per O invariant 27 ("the next recurrence triggers tooling-side enforcement"), the audit script's authorship is **accelerated from P.W6 to P.W2 close** per P invariant 28 (zero deferral; ship enforcement when the trigger fires).

-   `scripts/audit-stash-list.mjs` (NEW): fail-closed gate verifying `git stash list` returns empty. Exit 0 when clean; exit 1 otherwise. One-shot bypass via `AUDIT_STASH_LIST_BYPASS=1` for user-authorized intentional stash.
-   `package.json.scripts.audit:stash` (NEW): ergonomic invocation.
-   Stale `stash@{0}` entry (mid-flight agent capture; subset of HEAD diffs verified before drop) cleared via orchestrator-authority `git stash drop`.
-   LL ledger advance from 5 → 7 codified at P.W6 Lane B precept submodule advance (existing plan).

### Verification

-   `npm run typecheck`—PASS.
-   `NODE_OPTIONS=--max-old-space-size=8192 npm run build`—PASS (28.99 s).
-   `npm run verify-export-types`—PASS.
-   `npm run profile:budget`—PASS (CSS 38_006 / 42_000 raw 90.5%; gzip 7_093 / 7_400 95.9%).
-   `npm test`—PASS (32 files / 361 tests).
-   `node scripts/audit-stash-list.mjs`—PASS (clean; zero stash entries).

### Inheritance ledger absorbed at W2

| P ID                                      | Item                                                                      | Status                                                    |
| ----------------------------------------- | ------------------------------------------------------------------------- | --------------------------------------------------------- |
| P-3a                                      | CONFIGURATOR_DENSITY_KEY paired-helper completion                         | ADDRESSED (Lane A; optional-only per intent)              |
| P-3b                                      | SORTABLE_CONTEXT paired-helper completion                                 | ADDRESSED (Lane B; strict-only per intent)                |
| P-3c                                      | GlyphFaceSilhouetteKey paired-helper completion + UPPER_SNAKE_CASE rename | ADDRESSED (Lane C; optional-only per intent; clean break) |
| Pγ.3                                      | useDockState inline return                                                | ADDRESSED (Lane D; surface 63 → 64)                       |
| O invariant 27 (audit-script destination) | scripts/audit-stash-list.mjs                                              | ADDRESSED at W2 (accelerated from W6 per zero-deferral)   |

## 1.7.1—2026-05-16—P.W1 (/api Props promotion + dock barrel re-export + cosmetic comment rephrase)

Patch-level cohesion release. Three parallel lanes; all additive at the consumer surface (zero shape breaks).

### Lane A—`/api` Props promotion sweep (8 types; surface 55 → 63)

The AB+1 primitive cohort (`MetricCell`, `MetricStack`, `MetricRow`, `AnimatedDigit`, `ResponsiveTabs`) plus the Rγ-baseline carryover `StackedIconGroup` reach the `@mkbabb/glass-ui/api` discovery layer:

-   **AB+1 primitives (7 types)**: `MetricCellProps`, `MetricCellAppearance` (`"dashboard" | "compact" | "bare"`), `MetricStackProps`, `MetricRowProps`, `AnimatedDigitProps`, `AnimatedDigitMode` (`"absolute" | "progress"`), `ResponsiveTabsProps`.
-   **StackedIconGroup (1 type)**: `StackedIconGroupProps<TItem>`—Rγ baseline carryover missed at the O.W4 Lane A triad.

Five SFCs refactored from inline `defineProps<{...}>` to named `export interface FooProps` (HeaderRibbon O.W6 precedent)—per P invariant 5, the inline anonymous form is REPLACED, not preserved alongside.

Surface count: 55 (post-W0 resync) → 63 (59 types + 4 constants).

### Lane B—Dock barrel re-export (P11/b CR-2 prerequisite)

`src/components/custom/dock/index.ts` gains an additive re-export block exposing the dock-context canonical DI primitives on the `@mkbabb/glass-ui/dock` subpath:

```ts
export {
    DOCK_CONTEXT_KEY,
    useDockContext,
    useOptionalDockContext,
    provideDockContext,
    type DockContext,
    type DockOrientation,
} from "./composables/dockContext";
```

Prior to W1, these were reachable only via deep import (`src/components/custom/dock/composables/dockContext`)—blocking the fourier-analysis migration of 2 silent `inject<...>("dockKeepOpen", null)` sites that have been no-op since O.W2 retired the legacy string keys. The migration target is now subpath-reachable; consumer-side cross-walk lands at P.W5 Lane B.

### Lane C—Cosmetic "legacy" comment rephrase (2 sites)

Two source-comment word swaps; zero runtime impact. Per P invariant 5 (NO LEGACY CODE), the substrate at HEAD contains no actual legacy artefact—the comments mis-described their referents:

-   `src/components/custom/timeline/GlassTimeline.vue:88`: "legacy monolith" → "pre-O.W3 monolithic source" (the 1049-LOC pre-O.W3 source the W3 split replaced).
-   `src/styles/typography.css:194`: "legacy `Fira Mono`" → "fallback `Fira Mono`" (Fira Mono is the documented fallback tier in the `--font-mono` cascade, not deprecated).

### Verification

-   `npm run typecheck`—PASS (zero diagnostics).
-   `NODE_OPTIONS=--max-old-space-size=8192 npm run build`—PASS.
-   `npm run verify-export-types`—PASS (all targets + type resolutions valid).
-   `npm run profile:budget`—PASS (CSS 38_006 / 42_000 raw = 90.5%; gzip 7_094 / 7_400 = 95.9%—comfortably under the P.W0 rebaseline).
-   `npm test`—PASS (32 files / 361 tests; surface-lock test in `tests/public-surface.spec.ts` updated to include the 4 new dock-context runtime symbols).

### Inheritance ledger absorbed at W1

| P ID              | Item                                     | Status                          |
| ----------------- | ---------------------------------------- | ------------------------------- |
| Pα B2 / Pγ.1      | AB+1 cohort skipped Props-export canon   | ADDRESSED (Lane A—7 promotions) |
| Pγ (Rγ baseline)  | StackedIconGroupProps missed at O.W4     | ADDRESSED (Lane A—1 promotion)  |
| P11/b CR-2-prereq | Dock subpath does not publish DI helpers | ADDRESSED (Lane B)              |
| Pα A7-x + A9-x    | 2 cosmetic "legacy" comments             | ADDRESSED (Lane C)              |

## 1.7.0—2026-05-14—AB+1 substrate cohort (speedtest AC.W8e); P.W0 Lane B ceremonial tag

Minor-level expansion shipping two new custom primitives + a `<ToggleGroupItem>` `variant="card"` addition. Substrate for the AB+1 style-system debt 5-of-9 subset routed since AB.W5; each primitive collapses a duplicated consumer-side recipe onto a single library consume.

The `package.json` bump landed at commit `b201b03` without a git tag; **P.W0 Lane B is the ceremonial tagging round** that runs the canonical gate matrix (typecheck + build + verify-export-types + profile:budget + test) before pushing `v1.7.0`. P.W0 also lands the AB+1 retrospective at `docs/tranches/AB+1/` (Lane A) + the doc-counter γ-fix and CSS bundle-budget rebaseline (Lane C—see below).

**New primitives**:

-   `<MetricCell>`—compact metric card (icon-on-label, stacked value + unit) on a wash-tier glass surface. Promoted from speedtest's `<ResultDetailSheet>` 4-card grid; the 11-class glass-wash + p-3 + text-mono-prose composition becomes one prop-driven consume. Three appearance variants: `dashboard` (default, wash + p-3 + `text-mono-prose`), `compact` (wash + p-2 + `text-mono-small`), `bare` (no surface; consumers host inside a pre-styled panel). Subpath: `@mkbabb/glass-ui/metric-cell`.

-   `<ResponsiveTabs>`—single consume that swaps between `<Select>` (mobile) and `<UnderlineTabs>` (desktop) via `window.matchMedia` at a configurable breakpoint (default `640px` = Tailwind `sm:`). Promoted from speedtest's 3-site duplicated mobile-Select / desktop-UnderlineTabs pair (AdminDataView, AdminDashboardLayout, PublicDashboardLayout). Accepts `desktopOptions` for the cases where a tab is mobile-only (e.g. an inline-filters tab that lives in a desktop sidebar). Subpath: `@mkbabb/glass-ui/responsive-tabs`.

**Variant addition**:

-   `<ToggleGroupItem variant="card">`—extends the CVA `variant` union with a `card` register that bakes the glass-card surface (hover-quiet fill, `data-state="on"` selected fill + border + shadow, `active:scale-95` press, focus ring). Promoted from speedtest's `<FlowSelector>` 17-class glass-card recipe; consumers reach for the variant rather than re-declaring the surface at each call site. Composes with the existing glass-token cascade (`--glass-bg-quiet`, `--glass-border-quiet`, `--glass-shadow-quiet`) so retinting flows through tokens rather than per-consumer Tailwind utility overrides.

### Changed—`src/components/ui/toggle/index.ts`

-   `toggleVariants` CVA gains the `card` entry under the `variant` union. Existing `default` and `outline` variants unchanged; no consumer regression on the existing variants (CVA's default-variant resolution preserves prior behaviour for omitted `variant=` consumers).

### Added—`src/components/custom/metric-cell/`

-   `MetricCell.vue` + `index.ts` + the `metric-cell.ts` flat subpath barrel.

### Added—`src/components/custom/responsive-tabs/`

-   `ResponsiveTabs.vue` + `index.ts` + the `responsive-tabs.ts` flat subpath barrel.

### Added—`package.json` + `vite.library.ts`

-   New `./metric-cell` and `./responsive-tabs` entries in `exports` + `typesVersions`; new entries in `libraryEntries()` so Vite builds the dist artefacts.

### Verification

-   `npm run typecheck`—PASS.
-   `npm run build`—PASS (44 entry chunks emitted; v1.7.0 adds `metric-cell.{js,d.ts}` + `responsive-tabs.{js,d.ts}`).

### Consumer adoption

speedtest's AC.W8e wave consumes the trio at:

-   `<FlowSelector>` migrates to `<ToggleGroupItem variant="card">` (17 → 0 consumer classes on the surface).
-   `<ResultDetailSheet>` 4 sites consume `<MetricCell>` direct (44 → 0 consumer classes on the cards).
-   `<AdminDataView>` + `<AdminDashboardLayout>` + `<PublicDashboardLayout>` 3 sites consume `<ResponsiveTabs>` (dual sm:hidden / hidden sm:block mounts → single matchMedia-driven consume).

### P.W0 Lane C—doc-counter resync + bundle-budget rebaseline

The AB+1 cohort accumulated documentation drift across CLAUDE.md, `src/index.ts`, and `src/api/index.ts` because the per-tag releases (v1.5.0 / v1.5.1 / v1.6.0 / v1.7.0) shipped without a `docs/tranches/<LETTER>/` plan folder—the third K-invariant-3 shadow-execution recurrence (V → AB → AB+1). P.W0 Lane A authors the retrospective; Lane C resyncs the counters.

Doc-counter fixes:

-   `CLAUDE.md:20`—`/api` surface "53 canonical public symbols (49 types + 4 constants)" → "55 canonical public symbols (51 types + 4 constants)" (the 2-type drift surfaced at the P-open Pγ audit).
-   `CLAUDE.md:72`—custom-package dir count "31" → "35" (AB+1 added `animated-digit/`, `metric-cell/`, `metric-stack/`, `responsive-tabs/`).
-   `CLAUDE.md:195` + `:243`—subpath count "38 flat JS subpaths" → "42"; "39 entries total" → "43"; "v1.4.0 ships" → "v1.7.0 ships". Directory tree gains the 4 AB+1 custom-package entries.
-   `src/index.ts:52`—"30 packages in `src/components/custom/`" → "35 packages"; "the other 23 reach consumers ONLY via their dedicated subpath" → "the other 28".
-   `src/api/index.ts`—adds a P.W0 Lane C resync block documenting the canonical at-HEAD surface count (55 / 51 types + 4 constants).
-   Historical CHANGELOG entries at v1.0.0 + v1.0.5 + v1.3.0—"8 constants" arithmetic typos corrected with editorial notes per P invariant 28 FIX-WITH-NOTE.

CSS bundle-budget rebaseline (`scripts/profile-bundle.mjs`):

-   Prior baseline: 36_000 raw / 6_700 gzip (N.W0 v1.1.1 rebaseline against the AB tranche additions).
-   Current draw at v1.7.0: 38_006 raw / 7_096 gzip—over both budgets due to AC.W6b OFL font face declarations + AC.W6c phase-color-label cascade + AC.W6d timeline `::before` 44×44 + MetricRow/Stack/AnimatedDigit recipes + AC.W8e MetricCell + ResponsiveTabs + ToggleGroupItem card variant + the `--continuous-fill-opacity` cascade (commit `b8a61ec`).
-   New baseline: 42_000 raw / 7_400 gzip (≈ 10 % headroom).
-   Rebaseline rationale captured inline in `scripts/profile-bundle.mjs`.

## 1.6.0—2026-05-14—primitive expansions cohort (speedtest AC.W6d)

Minor-level expansion shipping three new custom primitives + a WCAG 2.5.5 hit-area gestalt-fix + a documented custom-prop cascade pattern.

**New primitives**:

-   `<MetricRow>`—single-metric row with phase-color binding + value/unit/state subgrid contract. Speedtest's per-metric callsites collapse onto this primitive instead of re-rolling the row interior at each consumer.
-   `<MetricStack>`—4-track subgrid composer of `<MetricRow>` children. Owns the inline-size container, the `--result-row-scale` knob, and row min-block-size pre-allocation. Optional `as` prop renders as `<TransitionGroup>` for per-row enter/leave while preserving the immediate-child subgrid contract.
-   `<AnimatedDigit>`—keyframes.js-backed digit animator with the speedtest-canonical hero clamp shape (single hard ceiling, decimal-place-aware).

**Hit-area + touch-target**:

-   Timeline + dock primitives now ship a `::before { inset: -15px }` hit-area extension so the underlying interactive element passes WCAG 2.5.5 (44×44 exact) without changing visual geometry. The -15px inset is the gestalt fix (speedtest AC-r3-r-3 §14 confirmed -14px from F2 audit yielded 42×42 off-by-one).

**Custom-prop cascade pattern**:

-   DESIGN.md now documents the canonical `:deep`-retire pattern: primitives expose `--<primitive>-<token>` CSS custom properties at their root; consumers retint via the root CSS variable rather than reaching inside scoped styles. The pattern lets the consumer surface stay shallow + decoupled from the primitive's internal selector tree.

**Residual** (deferred to AC.W8c / W6d-residual or AC+1):

-   `<ChassisCard>`, `<ProgressSegment>`, `<DataTableWithActions>`, `<ConfirmDialog>` enhancements
-   `(pointer: coarse)` media-query touch-target augmentation

## 1.5.1—2026-05-14—chassis `--phase-color-label` cascade (speedtest AC.W6c)

Patch-level extension to the `<InstrumentChassis>` `data-phase` cascade.
The WCAG companion `--chart-{phase}-label` tokens added at v1.4.0
(Lane D / AC.W6c F1.V-04) now have a parallel chassis-level cascade
`--phase-color-label` that pairs 1:1 with `--phase-color`. Text-on-
background callsites inside the chassis subtree (phase label, hero
number, climax row tints) consume the label register; canvas / fill /
gradient consumers continue to read `--phase-color`. Both fall back
through the canvas hue when the consumer hasn't migrated yet.

### Changed—`src/styles/instrument-chassis.css`

-   Idle defaults declare `--phase-color-label: var(--muted-foreground)`
    alongside the existing `--phase-color` default—symmetric pair at
    rest.
-   `data-phase="{ping,download,upload}"` cascade adds the parallel
    `--phase-color-label: var(--chart-{phase}-label, var(--chart-{phase}, ...))`
    declaration so each phase retints both registers in a single CSS
    mutation.
-   `data-phase="complete"` routes the label to `--color-gold-dark`
    (the darker rung of the gold trio) so the post-complete "Complete!"
    headline tinting clears body-text contrast against the light card.

### Verification

-   `npm run typecheck`—PASS.
-   `npm test`—348 / 30 green (no behavioural delta).

### Consumer adoption

speedtest's AC.W6c follow-on wires the inline `--phase-color-label`
binding on per-row hosts (where `metric.color` was the prior canvas-
register hex), promotes `MetricDef.colorVarLabel`, and migrates the
chassis-subtree label CSS callsites (`.text-metric-label`,
`.text-hero[data-idle="false"]`, `.result-row[data-color-tinted]
.result-value/-unit`) from `var(--phase-color)` to
`var(--phase-color-label, var(--phase-color))`.

## 1.5.0—2026-05-14—OFL font self-host subsystem (speedtest AC.W6b)

The font subsystem migrates from "consumer wires fonts" to "library
ships canonical OFL faces with calibrated fallbacks". Closes the
speedtest AC.W6b Path D substitution that retires the Fontshare CDN
dependency from the speedtest LCP-critical path. Single substrate
change (typography.css + `src/fonts/`), zero primitive churn.

### Added—Plus Jakarta Sans bundled face (Path D OFL substitute)

Plus Jakarta Sans (Tokotype / Gumpita Rahayu, OFL 1.1) ships as the
canonical brand display sans family at `src/fonts/plus-jakarta-sans/`:

-   `plus-jakarta-sans-latin.woff2`—27 KB variable (wght 200..800)
-   `plus-jakarta-sans-latin-ext.woff2`—22 KB variable (wght 200..800)
-   `OFL.txt`—SIL Open Font License 1.1 attribution

Plus Jakarta Sans was selected per speedtest's AC.W6b 5-way visual-
fidelity test against the pre-substitution General Sans baseline at
1200×766 hero size + 96 px body sample. The other four OFL candidates
(Onest, Manrope, Inter, Geist) read either too geometric (Manrope) or
too neutral (Inter, Geist) at hero size; Plus Jakarta Sans lands
closest to General Sans's geometric-humanist character with similar
audacity—the brand precept ("essentially equivalent") is honored.

Receipts: `docs/tranches/AC/artefacts/W6b/visual-fidelity/` (full-page
6-candidate comparison + 1200×766 hero pair at the canonical reference
size).

The `@font-face` declaration uses `font-display: optional` so the
LCP element never blocks on font arrival. The paired Capsize-calibrated
"Plus Jakarta Sans Fallback" face (declared in `src/styles/typography.css`)
wraps the system sans stack via `local()` with metric overrides—the
swap from fallback to primary is geometry-neutral, zero CLS contribution.

Capsize calibration (per `@capsizecss/core` against the bundled latin
woff2; receipts in `docs/tranches/AC/artefacts/W6b/`):

| Fallback        | size-adjust | ascent-override | descent-override |
| --------------- | ----------- | --------------- | ---------------- |
| `-apple-system` | 112.3639%   | 92.3784%        | 19.7572%         |
| Segoe UI        | 105.5577%   | 98.3348%        | 21.0311%         |
| Roboto          | 105.2101%   | 98.6597%        | 21.1006%         |
| Arial           | 104.9796%   | 98.8763%        | 21.1470%         |

All four overrides sit within the W6b Triumvirate gate (0.95 ≤ size-
adjust ≤ 1.13—the apple-system value is the upper edge because Plus
Jakarta Sans runs slightly wider than San Francisco at the same px).

### Added—Fira Code bundled face (OFL self-host)

Fira Code (Nikita Prokopov, OFL 1.1) ships at `src/fonts/fira-code/`:

-   `fira-code-latin.woff2`—36 KB variable (wght 300..700)
-   `fira-code-latin-ext.woff2`—13 KB variable (wght 300..700)
-   `OFL.txt`—SIL Open Font License 1.1 attribution

Fira Code retires the Google Fonts CDN round-trip from every glass-ui
consumer (audit AC.W6b GU-FONT §1.1 measured ~258 ms wasted on desktop

-   ~810 ms on mobile for the Fira Code CSS fetch). `font-display: swap`
    is preserved because Fira Code is post-LCP (mono-register admin labels
-   tabular numerics render below the fold; FOUT is a minor visual blip,
    not a layout shift).

Capsize calibration:

| Fallback                     | size-adjust | ascent-override | descent-override |
| ---------------------------- | ----------- | --------------- | ---------------- |
| SF Mono / Menlo / Consolas / | 99.9837%    | 99.0161%        | 32.2052%         |
| Courier New / Roboto Mono    |             |                 |                  |

size-adjust ≈ 1.00 means Fira Code's x-width matches the system mono
exactly—the swap is geometrically transparent across the chain.

### Changed—`src/styles/typography.css` preamble + face declarations

Eight new `@font-face` blocks land at the top of `typography.css`:
2× Plus Jakarta Sans primary (latin + latin-ext, both variable
200..800), 4× Plus Jakarta Sans Fallback (one per system-sans backstop
to keep the local() chain selective), 2× Fira Code primary (latin +
latin-ext, both variable 300..700), 1× Fira Code Fallback. The file
preamble documents the substrate canon + the Capsize methodology.

### Changed—`src/styles/tokens.css` `--font-stack-mono` cascade

`--font-stack-mono` (the theme-bridge token consumed by Tailwind's
`font-mono` utility) now leads with the bundled `"Fira Code"` family

-   the calibrated `"Fira Code Fallback"` face—every glass-ui consumer
    gets the self-hosted mono by default without any consumer-side wiring.

### Changed—`DESIGN.md` `### Self-host font policy` section

The W6a-r1 skeleton subsection (commit `4660a0d`) is replaced by the
fully-populated v1.5.0 policy:

-   The Path D candidate matrix (5 candidates evaluated; Plus Jakarta
    Sans selected with rationale).
-   The Capsize calibration methodology (`@capsizecss/core createFontStack`
    against the bundled latin woff2; per-face size-adjust + ascent-
    override + descent-override matrix).
-   The `font-display` policy (`optional` for LCP-critical display;
    `swap` for post-LCP mono).
-   The license attribution + OFL.txt locations.
-   The forward-compatibility note: future tranches should not
    re-introduce non-OFL display sans-serif at glass-ui (`feedback_fonts`
    project-memory canon).

### Compatibility

-   Speedtest AC.W6b retires the Fontshare CDN `<link>` + the "General
    Sans Fallback" `@font-face` (now upstream as "Plus Jakarta Sans
    Fallback") at `speedtest/index.html` + `speedtest/styles/style.css`.
    Speedtest's consumer-side `tokens.css` overrides `--font-brand-sans`
    to `"Plus Jakarta Sans", "Plus Jakarta Sans Fallback", system-ui,
sans-serif`—the brand-uniform-sans preset cascade routes display - serif through this stack.
-   Other glass-ui consumers (the demo, downstream libraries) keep the
    pre-existing Helvetica Neue default at `--font-stack-sans`; no
    unrelated visual changes. The OFL face files are net-additive.
-   Bundle delta: ~98 KB woff2 across both families (lazy-loaded by
    unicode-range; only the in-use subset transfers). Speedtest cohort
    expects a net LCP improvement vs the prior Fontshare CDN path (no
    third-party connect + handshake; font self-host inside the same
    origin's HTTP/2 multiplex).

## 1.4.1—2026-05-14—O.W7 close (13-lane audit fan-out + γ BLOCKER absorb + FINAL.md)

O tranche close ceremony. 7 strengthened audit lanes (α/β/γ/δ/ε/π/ι) +
6 N11-style consumer re-audits (O11/a-f) dispatched in 2 parallel
waves within the V7 dual-ceiling.

### Fixed—`@mkbabb/glass-ui/header-ribbon` subpath publication (γ BLOCKER absorb)

The W6 close commit `25e1b5a` shipped `dist/header-ribbon.js` but the
W6 Lane A proof doc's claim that `package.json.exports["./header-ribbon"]`

-   `typesVersions["*"]["header-ribbon"]` writes landed was vacuous —
    the integration missed both entries. `verify-export-types` reported
    PASS because it enumerates `package.json.exports` and skipped the
    unwired subpath. External consumers at v1.4.0 attempting
    `import { HeaderRibbon } from "@mkbabb/glass-ui/header-ribbon"` would
    have failed with `ERR_PACKAGE_PATH_NOT_EXPORTED`.

This is a regression of L invariant 7 (subpath publication binary)
that O.W5 Lane B+D specifically retired the env-gate to prevent. The
W7 γ audit caught it; β audit independently corroborated; absorbed
inline at W7 close. Verified post-absorb:

-   `package.json.exports["./header-ribbon"]` present (development +
    types + import targets).
-   `package.json.typesVersions["*"]["header-ribbon"]` present.
-   `dist/header-ribbon.d.ts` now emitted (1.7 KB).
-   `verify-export-types` PASS (all 39 exports including
    `/header-ribbon` resolve).

### Fixed—Doc-counter drifts (γ MINORs)

-   `CLAUDE.md:20` /api symbol count refreshed: "32 canonical public
    symbols" → "53 canonical public symbols (49 types + 4 constants)".
-   `CLAUDE.md:72` custom-package count: 30 → 31 (header-ribbon added).
-   `CLAUDE.md:168` subpath count: "23 remaining custom packages" → 24
    (`/header-ribbon` added).
-   `CLAUDE.md:243` subpath count: "37 flat JS subpaths" → 38 (post
    header-ribbon).
-   `src/api/index.ts` preamble arithmetic: "29 types + 8 constants" →
    "33 types + 4 constants" (M.W2 typo); "41 types + 8 constants" →
    "45 types + 4 constants" (O.W4 typo). Added O.W6 promotion note:
    surface count 49 → 53 (49 types + 4 constants).

### Documented—FINAL.md

`docs/tranches/O/FINAL.md` authored per K → L → M → N close-honesty
pattern. Cites every wave-close commit + audit verdict + cross-walk
to O-directives O1-O18 + named-destination per carry-forward to P.

### Audit verdict matrix

7 strengthened audit lanes:

-   α plan-vs-actual: CLEAN.
-   β substrate-without-consumer: MINOR-flags (1 BLOCKER → absorbed
    inline + 4 single-consumer flags → P carry).
-   γ doc-drift: 1 BLOCKER + 5 MINORs → all absorbed inline except γ-M5
    (frozen historical CHANGELOG entry → P-deferral acceptable).
-   δ idiomatic-gestalt: CLEAN with MINORs (P carry).
-   ε performance: FAVOURABLE-NEUTRAL (build-time −80ms; CSS budget
    rebaseline candidate at P).
-   π visual-runtime: TOOLING-DEFERRED (Chrome MCP not connected; 2nd
    consecutive deferral; P escalation flagged).
-   ι integrity-sweep: CLEAN (zero orphan stash; zero unauthorized
    commits; precept submodule advance authorized; cross-constellation
    reflog scan green).

6 consumer re-audit lanes:

-   O11/a words/frontend: CLEAN (builds at v1.4.0).
-   O11/b fourier-analysis: MINOR (2 silent legacy dock-key injects;
    carry to P).
-   O11/c bbnf-buddy: CLEAN (dock-DI binary-transparent verified).
-   O11/d keyframes.js: CLEAN.
-   O11/e value.js: BLOCKER (consumer-side; pre-existing avatar typo +
    2 silent dock-key injects; value.js on WIP branch—READER-ONLY at
    O per CONSTELLATION.md; carry to P cross-repo wave).
-   O11/f speedtest: CLEAN (A5 wire intact; AC.W6 cohort handoff
    complete; 1 deliverable [Fira Code woff2] pending orchestrator
    network-fetch).

### Verification

-   `npm run typecheck`—PASS.
-   `npm test`—348 / 30 green.
-   `npm run build`—659 modules; `dist/header-ribbon.{js,d.ts}` both
    emit at v1.4.1.
-   `npm run profile:budget`—PASS (CSS 95.7% raw—rebaseline
    candidate flagged for P).
-   `npm run verify-export-types`—PASS (39 exports including
    `/header-ribbon`).
-   `git stash list`—empty across glass-ui + 6 consumer repos +
    precept submodule.

## 1.4.0—2026-05-14—O.W6 HEADLINE (constellation-level substrate promotions + speedtest AC.W6 cohort)

Minor bump signal. Four cross-walked promotions clear the ≥ 2-consumer
bar; six speedtest-AC.W6 dependency primitives ship.

### Added—`useClipboard` composable (Lane A)

`src/composables/dom/useClipboard.ts`. vueuse-free + 108 LOC; async
`navigator.clipboard.writeText` with `document.execCommand("copy")`
fallback for legacy browsers. `copied: Ref<boolean>` auto-resets after
the configurable `resetMs` (default 1500). `UseClipboardReturn` +
`UseClipboardOptions` published on `/api`. Re-exported from root
barrel (vueuse-free per L invariant).

Cross-walked consumer audit at promotion: value.js (20 sites);
fourier-analysis (1 inline parallel). Cleared ≥ 2-consumer bar.

### Added—`<HeaderRibbon>` SFC (Lane A)

`src/components/custom/header-ribbon/`. Hover-tracking ribbon with
`--header-max-width` CSS var for consumer-side override; subpath
`@mkbabb/glass-ui/header-ribbon`. `HeaderRibbonProps` +
`HeaderRibbonPosition` published on `/api`. Subpath-only (not on
root barrel) per the v1.0 cherry-pick acceptance bar.

Cross-walked: value.js (155 LOC fork) + keyframes.js (152 LOC fork).
The N "0-consumer orphan" finding was REVERSED at O round-2 audit —
both consumers actively wire the ribbon.

### Added—`.dock-icon-button` active-state token ladder (Lane B)

`src/styles/tokens.css` gains `--dock-active-{bg,color,scale,border,shadow}`
cohort. `src/styles/dock.css` rewires `.dock-icon-button` active state to
consume the tokens. Consumers override the active variant via parent
scope without `:deep()` escapes. Defaults preserve the prior visual
contract verbatim (`--muted` bg + `--foreground` color; no transform /
border / shadow).

Cross-walked: bbnf-buddy (7 `:deep()` escapes; 3 absorbable on
adoption) + speedtest (default consumer; consumer-side adoption is
binary-transparent).

### Added—`@utility scale-on-hover` (Lane C)

`src/styles/utilities.css` gains the canonical hover-scale utility.
Consumes the existing `--scale-hover` token (1.08; already in
tokens.css). No new tokens added—orchestrator declined the W6.md's
proposed `1.05` value per the `no backwards-compat` posture (library's
own identity-evolution; consumer-side hover-scale isn't a binding
target).

Cross-walked: keyframes.js (13 `hover:scale-105` sites; mechanical
rewrite on adoption) + words/frontend (under audit; press-axis
`active:scale-[...]` sites are O-N-7, separate cohort).

### Added—Speedtest AC.W6 dependency cohort (Lane D; 6 sub-tasks)

Six glass-ui-side primitives unblock speedtest's AC.W6 tranche:

1. **Fira Code self-host** (`src/fonts/README.md` + `package.json`
   `files` array)—canonical paths declared; woff2 binaries deferred
   to integration-time `curl` fetch step (no network in agent
   worktree).
2. **`.text-hero` utility hoist** (`src/styles/typography.css`)—3
   consumer-tunable knobs.
3. **WCAG `--chart-{phase}-label` companions** (`src/styles/tokens.css`)
   —4 light tokens at OKLCH L≈0.40 + 4 dark companions at L≈0.85.
4. **`--meter-track-stroke` dark fix** (`src/styles/tokens.css`) —
   promoted from speedtest's broken consumer-side declaration; both
   light + dark now read `var(--foreground)` (was `var(--background)`
   at dark; bg-on-bg invisible).
5. **`<IconTooltip>` 44×44 hit-area**—slot wrapped in `<span
class="icon-tooltip-trigger">` with `--icon-tooltip-hit-area` knob.
6. **Dock touch-target media-query** (`src/styles/dock.css`) —
   `@media (pointer: coarse)` lifts `--dock-control-size` +
   `--size-icon-btn` to `--dock-touch-target` (2.75rem / 44px).

### Verification

-   `npm run typecheck`—PASS.
-   `npm test`—348 / 30 green.
-   `npm run build`—659 modules (+8 from W6); `dist/header-ribbon.js`
    2.61 KB / 1.00 KB gzip emitted as a new subpath chunk.
-   `npm run profile:budget`—PASS (raw 67.8% / 95.7%; gzip 69.0% /
    94.4%). CSS budget tight at 95.7% raw—folded to W7 ε audit for
    potential rebaseline.
-   `npm run verify-export-types`—PASS (new `/header-ribbon` subpath
    resolves).

### Cross-repo coordination

All four W6 promotions + the 6 AC.W6 dependencies ship on glass-ui
only. Consumer-side adoption defers to user-authorized cross-repo
waves per CONSTELLATION.md MULTI-WRITER policy:

-   value.js: 20 useClipboard sites + 155 LOC HeaderRibbon fork to
    retire.
-   fourier-analysis: 1 inline useClipboard parallel.
-   keyframes.js: 13 `hover:scale-105` sites + 152 LOC HeaderRibbon fork.
-   bbnf-buddy: 7 `:deep()` escapes (3 absorbable).
-   speedtest: AC.W6 tranche unblocks at v1.4.0 dep bump.

### Open items for W7

-   Fira Code woff2 binaries: orchestrator runs `curl` fetch step at
    integration before tag (per `src/fonts/README.md`).
-   CSS budget headroom (95.7% raw): rebaseline candidate at W7 ε.

## 1.3.1—2026-05-14—O.W5 (pipeline orchestration consolidation)

Internal-only. Five Rε-flagged orchestration improvements + canonical
single-source-of-truth gate-matrix.

### Added—`npm run proof:all` cohort runner (Lane A)

Top-level script chains the 5 `proof:*` scripts:
`proof:package` → `proof:theme` → `proof:consumers:static` →
`proof:consumers:build` → `proof:runtime`. Fail-fast via `&&`. CI
should cherry-pick the sibling-independent subset (`proof:package` +
`proof:theme` + `proof:consumers:static`) per agent's open-question;
folded to P-tranche candidate.

### Changed—`release.sh` single-source-of-truth (Lane B+D)

-   `verify-export-types` is unconditional (env-gate `GLASS_UI_RELEASE_SURFACE_GUARD`
    retired; L.W0 Lane III invariant).
-   Hardcoded 7-subpath bash probe loop dropped—superseded by
    `verify-export-types.mjs` (enumerates all 38 subpaths from
    `package.json.exports`).
-   `npm test` ownership consolidated to `prepublishOnly`—no longer
    invoked from `release.sh`.
-   `npm run profile:budget` added to the unconditional gate matrix.
-   Build step inside `release.sh` runs with
    `NODE_OPTIONS=--max-old-space-size=8192` (the vite:dts plugin's
    pre-existing OOM at default 4GB heap; orchestrator absorb at
    integration).

Canonical gate matrix:

| Owner            | Steps                                                                        |
| ---------------- | ---------------------------------------------------------------------------- |
| `release.sh`     | typecheck → build (heap-bumped) → verify-export-types → profile:budget → tag |
| `prepublishOnly` | build + test                                                                 |

Net duplication: `test` 2× → 1×; `build` remains 2× with documented
rationale (release.sh build is prerequisite for the
verify-export-types + profile:budget gates; prepublishOnly build is
defensive for the standalone publish path).

### Changed—Freshness DRY extract (Lane C)

`walkNewestMtime` lifted to canonical home
`scripts/freshness-walk.mjs` (+ `.d.mts` sidecar for tsc resolution).
Both consumers—`scripts/freshness-gate.mjs` (prebuild CLI) AND
`src/freshness.ts` (runtime helper)—now import from the canonical
module. Closes Rα E3 docstring drift + Rε pipeline-orchestration
DRY verdict.

Path A (static import) chosen over dynamic-import per the dispatch's
recommendation. Static import + `.d.mts` sidecar resolves cleanly
under `moduleResolution: "bundler"`; `assertDistFresh()` stays
synchronous for cross-repo callers (speedtest `vite.config.ts`,
bbnf-buddy startup-hook).

Algorithmic divergence audit: pre-extract diff was TS type
annotations only; walk logic byte-identical. Canonical extract is
a faithful merge.

### Changed—CI gate matrix expanded (Lane E)

`.github/workflows/lint.yml` → `.github/workflows/ci.yml`. Expanded
from bundle-budget-only to a 5-step matrix matching the release-time
gates: typecheck → test → build → verify-export-types →
profile:budget. PR-time and release-time now close on the same
gate matrix.

Heap bump (`NODE_OPTIONS=--max-old-space-size=8192`) scoped to the
build step only. Profile:budget step opts out of its internal
rebuild via `GLASS_UI_BUDGET_SKIP_BUILD=1` (the dedicated build
step's output is reused).

### Verification

-   `npm run typecheck`—PASS.
-   `npm test`—348 / 30 green.
-   `npm run build`—652 modules (+1 from `freshness-walk.mjs`).
-   `npm run profile:budget`—PASS (raw 67.3% / 93.3%; gzip 68.1% /
    91.7%).
-   `npm run verify-export-types`—PASS.
-   `bash -n scripts/release.sh`—SYNTAX OK.

## 1.3.0—2026-05-14—O.W4 (/api discovery gaps + leaky abstractions + service boundaries)

Minor bump signal: two semver-visible renames (`avatarVariant` →
`avatarVariants`, `useDarkModeSync` → `installDarkModeSync`) ship
alongside 12 additive `/api` type promotions. Bumping to v1.3.0
rather than v1.2.4 acknowledges the renames at the version
boundary, even though both are mechanical one-line consumer
migrations and the constellation audit found ≤ 3 sites total per
rename.

### Added—12 `/api` discovery types (Lane A)

Surface count 37 → 49 (41 types + 4 constants—historical arithmetic typo corrected at P.W0 Lane C; the constant count never changed from the 4 Aurora + Metaballs constants):

-   **Sidebar domain (6)**: `SidebarState`, `SidebarSection`,
    `TreeNode`, `TreeIndexEntry`, `SidebarIndexEntry`,
    `ScrollTrackerOptions`.
-   **Search domain (5)**: `SearchableItem`, `SearchResult`,
    `FuzzySearchState`, `UseFuzzySearchOptions`, `SearchIndex`.
-   **Props/variants triad (3)**: `GlassPanelProps`, `ToastType`,
    `MenuItemVariants`.

`MenuItemVariants` required a NEW `src/components/ui/_shared/index.ts`
barrel—runtime-private; exists only so `/api` can pin the type from
a stable home. The new barrel is NOT added to `ui/index.ts` (its
runtime visibility is unchanged from pre-W4).

### Changed—Leaky abstraction fixes (Lane B)

-   `UseDockStateOptions` + `DockState` re-exported from
    `src/components/custom/dock/index.ts`—consumers can now type
    wrappers around `useDockState` via the published `@mkbabb/glass-ui/dock`
    surface.
-   `UseAuroraReturn` interface authored; replaces the inline-typed
    return literal of `useAurora`. Re-exported from the aurora package
    barrel (not promoted to `/api` per the preamble's composable-return
    exclusion).
-   `useDarkModeSync` renamed to `installDarkModeSync`—names the
    side-effect plainly (installs a `watch`; returns `void`). The
    `useFoo` contract implies a reactive return; this composable doesn't
    satisfy that contract.

### Changed—`avatarVariant` → `avatarVariants` (Lane C)

CVA-constant naming consistency. Every other variants const in the
library is plural (`buttonVariants`, `toggleVariants`, etc.); the
singular `avatarVariant` was the lone outlier. `AvatarVariants` type
alias unchanged. Cross-repo audit: zero production call sites across
the constellation; one passthrough re-export barrel in
value.js/demo/@/components/ui/avatar/—coordinated at O.W6.

### Documented—Module-scope process-singleton registries (Lane C)

`DESIGN.md` gains a new section cataloguing the 4 module-scope
registries (`gateRegistry`, sortable `instances`, typewriter
`activeTimers`, `useToast` queue) as a canonical pattern. Per Rδ:
no DI-able alternative is cleaner; the process-singleton pattern is
canonical for these subsystems.

### Decision—`useToast` KEEP-with-rationale (Lane C)

`useToast` retains its shadcn-vue-parity module-scope queue. Decision
doc: `docs/tranches/O/audit/W4-Lane-C-useToast-decision.md`. Path B
(refactor to DI via `<Toaster>` root) flagged for future consideration
but not authorized.

### Verification

-   `npm run typecheck`—PASS.
-   `npm test`—348 / 30 green.
-   `npm run build`—651 modules; declaration build (heap-bumped).
-   `npm run profile:budget`—PASS (raw 67.3% / 93.3%; gzip 68.1% /
    91.7%).
-   `npm run verify-export-types`—PASS (all 12 new `/api` types
    resolve from `dist/api.d.ts`).

### Cross-repo coordination

Both renames + the 12 type promotions defer their consumer-side
adoption to O.W6 cross-repo cohort wave per CONSTELLATION.md:

-   `avatarVariant` rename—1 passthrough re-export site
    (`value.js/demo/@/components/ui/avatar/`).
-   `useDarkModeSync` rename—3 sites in speedtest.

## 1.2.3—2026-05-14—O.W3 (god-module cohesion splits)

Three Rβ-flagged god-modules (1049 + 884 + 657 LOC) split into
cohesive sub-modules. Public API surfaces unchanged.

### Changed—`<GlassTimeline>` 1049 LOC → dispatcher + 3 variant SFCs (Lane A)

`src/components/custom/timeline/GlassTimeline.vue` rewritten as a
123-LOC dispatcher; the three variants (scrubber / segmented /
continuous) become standalone SFCs. Shared geometry math lifts to
`geometry.ts`.

-   `ScrubberTimeline.vue` (191)—`<GlassTimeline variant="scrubber">`.
-   `SegmentedTimeline.vue` (225)—`<GlassTimeline variant="segmented">`.
-   `ContinuousTimeline.vue` (607)—`<GlassTimeline variant="continuous">`;
    preserves the non-scoped `<style>` block for HoverCardPortal per Rβ
    contract.
-   `geometry.ts` (187)—shared math + factory functions.

Consumer-side `<GlassTimeline variant="...">` renders identically.

Bundle delta: `dist/timeline.js` 11.27 → 13.66 KB raw / 3.14 → 3.77
KB gzip (+21% per-chunk, +2.4 KB absolute). Above W3.md's 5%
per-chunk threshold; orchestrator accepts as the decomposition cost
— global budget gates remain well under cap (`glass-ui.js` 67.3% raw
/ 68.1% gzip; `glass-ui.css` 93.3% raw / 91.7% gzip).

### Changed—`scripts/profile-aurora.mjs` 884 LOC → harness extracted (Lane B)

The 433-line `harnessSource()` template-string extracted to
`scripts/aurora-profile/harness-browser.mjs` (Option B template-string
export). Main entry shrinks to 462 LOC orchestration-only. Cross-
reference for W5 pipeline-orchestration cleanup (orchestrator-side
refactor lives there; this lane was the structural split).

### Changed—`demo/configurator/usePresetEditor.ts` 657 LOC → 6 sub-modules (Lane C)

5 concerns split across:

-   `demo/configurator/preset-editor/types.ts` (97)
-   `demo/configurator/preset-editor/defaults.ts` (90)
-   `demo/configurator/preset-editor/css-writers.ts` (53)
-   `demo/configurator/preset-editor/persistence.ts` (139)
-   `demo/configurator/preset-editor/stylesheet-swap.ts` (53)
-   `demo/configurator/preset-editor/store.ts` (313)

`demo/configurator/usePresetEditor.ts` becomes a 24-LOC façade
re-exporting the public surface through `./preset-editor/store`.
Demo-private; no library API impact.

### Verification

-   `npm run typecheck`—PASS.
-   `npm test`—348 / 30 green; 11 timeline-specific tests pass through
    the new dispatcher.
-   `npm run build`—651 modules transformed (+9 from W3 splits).
-   `npm run profile:budget`—PASS (raw 67.3% / 93.3%; gzip 68.1% /
    91.7%).
-   `npm run verify-export-types`—PASS.

## 1.2.2—2026-05-14—O.W2 HEADLINE (dock subsystem DI canonicalization)

Load-bearing architectural transposition per invariant 25 (typed-key +
helper-pair DI canonical shape; codified at O.W0 / precept `46ee7e9`).
The dock subsystem migrates from 6 string-keyed provides across 3
idioms to one typed `InjectionKey<DockContext>` with paired strict /
optional consumer helpers. Net `provide()` call count in `GlassDock.vue`:
6 → 1.

### Changed—Dock typed-context (Lane A)

`src/components/custom/dock/composables/dockContext.ts` gains:

-   `DOCK_CONTEXT_KEY: InjectionKey<DockContext>` (Symbol-based; not a
    string).
-   Expanded `DockContext = { id, orientation, keepOpen, release, held }`
    —absorbs the 4 prior string-key provides (`dockKeepOpen`,
    `dockRelease`, `dockHeld`, `glassDockId`); `dockExpanded`
    PERMANENTLY RETIRED (rg-verified zero consumers per Rδ audit).
-   `useDockContext()`—strict; throws "called outside <GlassDock>"
    when no parent provider exists.
-   `useOptionalDockContext()`—befitting silent default; returns
    `DockContext | null`.

DockLayer ↔ DockLayerGroup migration: new
`src/components/custom/dock/composables/dockLayerContext.ts` with the
same typed-key + helper-pair shape. ToggleGroup ↔ ToggleGroupItem
migration: new `src/components/ui/toggle-group/toggleGroupContext.ts`
applying the same pattern.

### Changed—5 in-library consumer migrations (Lanes B + C)

All five reach-into-dock-state sites migrate to
`useOptionalDockContext()`:

-   `<Slider>` (Lane B): keep-dock-open + held-halo contract preserved;
    callsites rewritten to `dock?.keepOpen()` / `dock?.release()` /
    `dock?.held.value`.
-   `<HoverPopover>` (Lane C): 3 raw injects (`dockKeepOpen`,
    `dockRelease`, `glassDockId`) consolidated into one
    `useOptionalDockContext()` call.
-   `<PopoverContent>` / `<SelectContent>` / `<DropdownMenuContent>`
    (Lane C): each migrate `inject("glassDockContext")` to
    `useOptionalDockContext()`; portal-attribute access pattern
    unchanged (`dockContext?.id`).

### Removed—5 transitional dual-provides (W2 close sweep)

The W2 brittleness window (`breaking_changes_during_wave: yes` per
W2.md) ran from Lane A landing (`ba546c7`) through close. During
that window `<GlassDock>` provided BOTH the new typed context AND 5
legacy string-keys (`dockKeepOpen`, `dockRelease`, `dockHeld`,
`glassDockId`, `glassDockContext`) so Lanes B + C could land
without runtime regression in their worktree-isolated branches.
The close commit retires all 5 transitional provides.

### Updated—DESIGN.md `## Dock` section

New sub-section "Dock subsystem—typed-context DI shape" documents
the canonical DockContext shape + the strict/optional helper pair.
Cross-references the parallel patterns in dockLayerContext.ts +
toggleGroupContext.ts.

### Verification

-   `npm run typecheck`—PASS.
-   `npm test`—348 tests / 30 files green (no regression; cross-substrate
    proof story `demo/stories/compositions/dock-with-slider.vue` renders
    identically).
-   `npm run build`—642 modules transformed (+2 new context.ts files).
-   `npm run profile:budget`—PASS (raw 67.3% / 90.2%; gzip 68.1% /
    90.7%).
-   `npm run verify-export-types`—PASS.
-   Residual string-key audit: zero `inject("dock*"|"glassDock*")` calls
    in `src/`; remaining mentions are template refs, HTML data
    attributes, and documentation cross-references.

### Cross-repo

Speedtest is BINARY-TRANSPARENT to this refactor (per O11/f β audit:
zero consumer-side reach-in to retired keys). No cross-repo coordination
required at W2; verified at W7 close ceremony.

## 1.2.1—2026-05-14—O.W1 (fail-explicit migrations + test-file canonical shape)

Five-lane wave per docs/tranches/O/waves/W1.md. Four library-internal
contract-violation paths migrate from silent `console.warn` /
`console.error` + return-null to `throw new Error(...)` per invariant 24
(codified at O.W0 / precept `46ee7e9`). Test-file shape verified canonical;
3 stragglers absorbed.

### Changed—Aurora init now throws (Lane A; F1)

`useAurora` / `<Aurora>` no longer silently swallow `createAurora`
failures. Either the new `onInitError?: (err: Error) => void` callback
prop / `runtimeOptions.onInitError` receives the error AND the canvas
stays unmounted, or the error throws. Documented in MIGRATION.md with
the explicit silent-warn opt-back-in recipe. Speedtest (the deep Aurora
consumer) cross-repo audit done READ-ONLY—no in-place consumer wire at
this wave; folded to O.W6 cross-repo cohort if needed.

### Changed—WebGL shader compile + link failures throw (Lane B; F2 + F3)

4 sites across `useMetaballs.ts` (shader compile + program link) and
`composables/glass/webgl/frostShader.ts` (compile + link) replaced.
Library-owned shader sources are internal-contract failure modes. Error
messages name the substrate + operation:
`[glass-ui:metaballs] vertex shader compile failure: ...`,
`[glass-ui:frost] program link failure: ...`. Caller-side bail-out
`if (!x) return` checks preserved with `// caught upstream—defensive`
comments where the throw makes the branch unreachable.

### Changed—Configurator `structuredClone` failures throw (Lane C; F4 Path A)

`useConfiguratorState`'s `defaultClone` retired the silent
`JSON.parse(JSON.stringify(...))` fall-through. `structuredClone`
failures (or runtime unavailability) now throw with a named cause and
the explicit `ConfiguratorStateOptions.clone` escape-hatch in the message.
Most preset shapes (plain objects, arrays, primitives, `Date`, `Map`,
`Set`) are structured-cloneable and need no migration. Decision doc:
`docs/tranches/O/audit/W1-Lane-C-clone-decision.md`.

### Changed—Typewriter weighted-pool invariant throws (Lane D; F5)

The defensive "should not reach here" fallback at
`src/components/custom/typewriter/utils/keyboard.ts:210` replaced with a
named throw. The branch is reachable only if the ADJACENCY_MAP
integrity guarantee is violated; surfacing the violation diagnostically
beats silent recovery.

### Hygiene—Test-file canonical shape (Lane E + absorb)

Per invariant 26 (codified at O.W0). The Rα-flagged 18 `*.test.ts` files
were already at canonical `src/<pkg>/__tests__/*.test.ts` per the
Vue / Vite / Vitest convention—NO-OP. 3 sibling `*.spec.ts` files
(`MultiSelect`, `DataTable`, `ProgressiveSidebar`) absorbed at W1
close: relocated to `__tests__/` and renamed `.spec.ts` → `.test.ts`
for naming-convention parity. 21 test files now follow one shape.

### Verification

-   `npm run typecheck`—PASS.
-   `npm test`—348 tests / 30 files green (unchanged from N close).
-   `npm run build`—640 modules transformed; declaration build green
    with bumped heap (`NODE_OPTIONS=--max-old-space-size=8192`; the
    vite:dts heap-limit issue is pre-existing—folded to O.W5 Lane A
    / E candidate).
-   `npm run profile:budget`—PASS (raw 67.2% / 90.2%; gzip 67.9% /
    90.7%); bundle profile bit-identical to v1.2.0.
-   `npm run verify-export-types`—PASS.

## 1.2.0—2026-05-14—O.W0 (AB post-hoc plan folder + precept invariants 24-27 + cosmetic legacy excise)

O tranche W0 HEADLINE. Three parallel lanes:

-   **Lane A**—AB tranche post-hoc plan folder authored at
    `docs/tranches/AB/` (AB.md + 4 wave specs + FINAL.md + PROGRESS.md +
    coordination/CONSTELLATION.md). Closes the K-invariant-3 shadow-execution
    recurrence: AB shipped v1.0.5 → v1.1.0 with ~9 commits but no
    `docs/tranches/AB/` plan folder; the retrospective traces every
    commit + reconstructs the per-wave thesis (Living UI canon—chassis +
    timeline + Pulse + Progress + dock-shadow).
-   **Lane B**—Precept submodule advanced `b8af314` → `46ee7e9`. Four
    new invariants codified (24 fail-explicit on library-internal contract
    violations; 25 typed-key + helper-pair DI canonical shape; 26 test-file
    relocation outside src/; 27 tooling-side stash enforcement). LL entry
    `2026-05-14 - Audit + DI + Test-Hygiene + Tooling-Stash` documents
    origin in the O round-1 backend audit.
-   **Lane C**—7 src/ files: cosmetic legacy excise (Rα E1-E4 + K7-K9).
    `probeWebGLSupport` alias retired (3 call-sites renamed to
    `isWebGLSupported`); `freshness.ts` docstring rewritten to match the
    actual single-pure-TS-walk impl; 5 "back-compat" comment rewords
    across Pulse / Progress / GlassTimeline / LabeledField / Section /
    composables/index.ts. Two surviving `back-compat` mentions
    (`tokens.css:198`, `utilities.css:355`) are intentional explanatory
    prose about design choices. Net −14 src/ LOC; comment-only.

### Verification

-   `npm run typecheck`—PASS.
-   `npm test`—348 tests / 30 files green.
-   `npm run build`—640 modules transformed; dist artefacts fresh.
-   `npm run profile:budget`—PASS for both raw (67.2% / 90.2%) and
    gzip (67.9% / 90.7%). Bundle profile unchanged from N close (cosmetic
    edits + plan-folder additions do not affect dist).

## 1.1.4 — 2026-05-14 — N close (13-audit fan-out + β absorbs + γ doc-drift fix + FINAL.md)

N tranche close ceremony. 7 strengthened audit lanes (α/β/γ/δ/ε/π/ι) +
6 N11 consumer re-audits dispatched in parallel (13 read-only agents
within the dual-ceiling per V7). All audits CLEAN or MINOR; β's
recommended absorbs landed inline; γ's BLOCKER-class CHANGELOG token-
name drift fixed inline.

### Fixed — CHANGELOG v1.1.3 token-name drift (γ BLOCKER)

The v1.1.3 entry listed Configurator padding-block tokens as
`--configurator-row-padding-block-*`; the actual shipped names in
`tokens.css` are `--configurator-row-py-*`. Consumers copy-pasting the
prior changelog would have authored invalid CSS. Fixed inline.

### Added — Pulse `variant="aura"` + Progress `variant="sectioned"` demo stories (β absorb)

The β substrate-without-consumer audit caught that the AB.W3 Pulse-aura

-   Progress-sectioned variants shipped without glass-ui-side demo
    consumers (the pulse + progress stories only exercised the pre-AB
    variants). N.W4 absorbs:

*   `demo/stories/primitives/pulse.vue` gains an "aura variant (ambient
    halo)" story section showing 3 speed × 3 viz-basis colour cells.
*   `demo/stories/feedback/progress.vue` gains a "sectioned variant
    (phase bus)" story section using `ProgressSegment[]` with 4 phases
    (pings / jitter / download / upload) mirroring the speedtest
    phase-bus pattern.

Closes the AB.W3 substrate-without-glass-ui-consumer gap; speedtest
remains the canonical cross-constellation consumer.

### Documented — FINAL.md

`docs/tranches/N/FINAL.md` authored. Cites every wave-close commit +
audit verdict; enumerates 8 O-deferred items (Playwright runtime
probe; 23 broader wire-targets; γ CLAUDE.md cosmetic drifts; δ MINOR
notes; new union candidate from N11/b; consumer-side cleanup waves).

## 1.1.3 — 2026-05-14 — N.W2 Configurator density CVA + N7 dock-blur audit (NO-OP)

Additive density axis on `<Configurator>` + `<ConfiguratorRow>`; 8 new
density tokens; mobile proof-of-concept story. N7 dock-blur perceptual
audit closes NO-OP — the dock filter is at the compositor floor; user
perception traces to page-composition stacking, not library substrate.

### Added — Configurator density axis (N.W2 Lane A)

`<Configurator>` gains `density?: "mobile" | "compact" | "comfortable" | "spacious"`
(default `"comfortable"`). The Configurator provides density to its
descendant rows via `provide`/`inject` (key `CONFIGURATOR_DENSITY_KEY`);
`<ConfiguratorRow>` exposes the same `density` prop and resolves
`props.density ?? injectedDensity?.value`, emitting `data-density` on its
root. **Prop wins over inject** — direct row-level override is supported.

A bare `<ConfiguratorRow>` outside any Configurator (no inject, no prop)
emits no `data-density` attribute and preserves the pre-N.W2 `gap-1.5 py-2`
visual exactly. The default is back-compatible at every consumer.

New tokens (in `src/styles/tokens.css`):

```css
--configurator-row-gap-mobile: 0.25rem;
--configurator-row-gap-compact: 0.3125rem;
--configurator-row-gap-comfortable: 0.375rem;
--configurator-row-gap-spacious: 0.75rem;
--configurator-row-py-mobile: 0.25rem;
--configurator-row-py-compact: 0.375rem;
--configurator-row-py-comfortable: 0.5rem;
--configurator-row-py-spacious: 0.875rem;
```

ConfiguratorRow's scoped CSS binds each density rung via attribute
selectors. CSS delta: +596 bytes raw.

New module: `src/components/custom/configurator/density.ts` carries the
type + provide key for cross-module sharing. Re-exported via the package
barrel.

Proof story: `demo/stories/primitives/configurator-mobile.vue` (89
lines) demonstrates the same configurator content side-by-side at
`density="mobile"` vs `density="comfortable"`. Registered in
`demo/stories/manifest.ts`.

### Documented — N7 dock-blur perceptual audit NO-OP (N.W2 Lane B)

User feedback at N open ("top dock blur is a bit much") source-of-truth-
audited. The dock substrate's `backdrop-filter` is already at compositor
floor (`--glass-blur-dock-radius: 0px`, J.W3.C; the radius drop + dropped
`saturate()` channel). Source-of-truth comparison table now lives in
DESIGN.md `## Glass Surfaces` — dock is the lightest surface in the
entire ladder.

The user's perception is real, but the source is page-composition
stacking (aurora / metaballs backdrops admitted through the dock's 32 %
`--glass-bg-dock` opacity), not the dock substrate. The library token
holds the floor; further reduction requires consumer-side intervention
(lower aurora opacity, increase `--glass-bg-dock`, or move dock from
over-aurora to over-flat-bg).

NO-OP for this wave. No token change; no cascade adjustment. Audit
lands in `docs/tranches/N/audit/W2-Lane-B-dock-blur-N7-audit-proof.md`

-   DESIGN.md for posterity.

## 1.1.2 — 2026-05-14 — N.W1 typography sweep + N-4 absorb + GlassPanel translucent + frosted canonical

Pure cleanup — zero new public surface; 9 ad-hoc `text-[0.6875rem]` literals
swept to the canonical `text-micro` utility across 4 files (the 2 Configurator
src files + 2 PresetEditor demo files); the 26 pre-existing N-4 timeline-story
typecheck errors absorbed via a small `legendBackground()` helper that lifts
the inline `as { from: string; to: string }` cast out of the template-literal
interpolation into `<script setup>`. DESIGN.md canonicalises the
`<GlassPanel>` default-`"resting"` recipe as the translucent + frosted
canonical surface.

### Changed — typography literals swept to `text-micro` (N.W1 Lane C)

`text-[0.6875rem]` literals replaced with the canonical `text-micro` semantic
class across:

-   `src/components/custom/configurator/ConfiguratorRow.vue`
-   `src/components/custom/configurator/ConfiguratorLayer.vue`
-   `demo/configurator/PresetEditor.vue`
-   `demo/configurator/PresetEditorField.vue`

The `@utility text-micro` already exists at `src/styles/typography.css:235`
plus the Tailwind v4 `--text-micro` bridge at `src/styles/theme.css:14`;
this sweep is purely semantic (literal → utility) with no rendering delta.

Off-grid literals (`text-[0.6rem]`, `text-[0.65rem]`, `text-[1.15rem]`) are
intentionally retained at HEAD; they sit between canonical scale tokens by
design.

### Fixed — N-4 timeline-story typecheck errors absorbed (N.W1 Lane C)

The 26 pre-existing TypeScript errors in `demo/stories/data/timeline-continuous.vue`
and `demo/stories/data/timeline-segmented.vue` (carry-forward from M close;
flagged at N open as M-residual N-4) resolved by extracting the inline
`as { from: string; to: string }` cast out of the `:style` template-literal
binding into a `legendBackground()` helper in `<script setup>`. vue-tsc's
template parser can't disambiguate inline TS-cast syntax inside a
template-literal interpolation inside a Vue `:style` binding; lifting the
cast to a helper consuming `TimelineSegmentGradient` makes the binding
parser-clean.

### Fixed — `metaballs.vue` story `isSupported` reference (N.W1 orchestrator-direct)

`demo/stories/motion/metaballs.vue` updated to use the imported
`isWebGLSupported()` function directly (per `MetaballCanvas.vue`'s
defineExpose surface post-M.W2; the story still referenced the now-removed
`canvasRef.value?.isSupported` field). This was a residual M.W2 close gap.

### Documented — `<GlassPanel>` default = canonical translucent + frosted (N.W1 Lane A)

DESIGN.md `## Glass Surfaces` extended:

-   Five-tier table's `Resting` row's "Use" column notes
    `<GlassPanel>` default canonicalisation.
-   New sub-section "Canonical translucent + frosted (N.W1 Lane A —
    `<GlassPanel>` default)" documents the 65 % opacity + 12 px blur + 1.05
    saturation + 12 % border + grain overlay composition explicitly.

Per N invariant 22 (audit-verdict spot-verification gate) + KISS: no new
tier introduced. The existing resting rung already satisfies the N9 brief
("glass panels by default should be translucent and frosted"); the audit's
implicit "introduce a new tier" path was spot-verified against the
existing recipe and verified-out.

### Re-baselined — bundle CSS budget (N.W0 absorb continues; verified at N.W1 close)

CSS budget continues to enforce against the N.W0-rebaselined 36_000 raw /
6_700 gzip cap; current draw 31_875 raw / 5_972 gzip (≈ 89 % of cap).
Future tranches re-baseline at their own close per the K invariant.

## 1.1.1 — 2026-05-14 — N.W0 strategic 5-wire batch (useTouchGate→Slider; metaballs+typewriter→hero; paper-backdrop→Section; freshness→speedtest)

Pure additive — zero retirements, zero demo-privatizations. Wires five existing
primitives into their canonical consumer sites; closes the V.W3 freshness
wire-claim cross-repo; codifies three new tranche precepts (RESEARCH angles 7+8,
SPEC audit-verdict spot-verification gate, README wire-before-retire edict);
codifies the audit-verdict spot-verification LESSONS-LEARNED entry (precept
submodule `46d6cfb → b8af314`).

The wave's planning substrate landed across three revisions (initial addition
→ KISS prune → wiring pivot) per the user wiring correction
("useTouchGate is used, or it should be ... Metaballs, paper-backdrop, typewriter
should be used elsewhere too"); the five wires close that revision cleanly.

### Added — `useTouchGate` → `<Slider>` (N.W0 Lane A1)

`<Slider>` now mirrors the canonical `useTouchGate` consumer pattern from
`GlassDock.vue` on top of its existing `dockKeepOpen` contract. On touch
devices the first tap activates the slider (gate behavior); off-control
taps deactivate via the shared global listener; the gate's active window
also acquires the existing `dockKeepOpen` token so an enclosing
`<GlassDock>` observes the touch gesture as held. Root reflects gate state
via `data-touch-active` (additional attribute alongside `data-held`).
Desktop pointers are unaffected — the gate no-ops when `isTouchDevice` is
false.

This is the canonical 2nd consumer of `useTouchGate` (GlassDock is the
1st); the audit-verdict spot-verification gate caught the original audit's
miscount that flagged this primitive for retirement, and wired it instead
per the wire-before-retire precept.

### Added — `<Section backdrop="paper">` (N.W0 Lane A3)

`<Section>` gains an additive `backdrop?: "none" | "paper"` prop (default
`"none"`). When `backdrop="paper"`, the `<section>` becomes a
`relative isolate` stacking context with `<PaperBackdrop>` pinned
`!absolute inset-0` behind header + content. Existing Section API
preserved verbatim; consumers that don't set `backdrop` see zero change.

This is the canonical library wire for `<PaperBackdrop>` (previously
demo-only); demonstrates the primitive as a generally-reusable substrate.

### Added — hero composition ambient backdrop + typewriter headline (N.W0 Lane A2+A4)

`demo/stories/compositions/hero.vue` gains:

-   An ambient `<MetaballCanvas>` layer behind the existing radial-gradient
    background, gated by `isWebGLSupported() && !prefersReducedMotion`.
    5-blob config tuned to complement (not compete with) the warm-palette
    gradients. Scoped `:deep(canvas)` rule re-targets the upstream
    viewport-pinned canvas to the hero frame.
-   A `<TypewriterText>` headline split around the static italic-f
    signature glyph — segment 1 types first, segment 2 starts on
    `@complete` of segment 1 with a brief `startDelay`. The italic-f
    remains anchored as static markup; reduced-motion fallback renders
    the verbatim original h2 with zero diff.

Demonstrates the canonical ambient-backdrop + animated-headline
composition pattern for downstream consumer hero composites.

### Added — `assertDistFresh()` wired into speedtest (N.W0 Lane A5)

Closes the V.W3 wire-claim: `speedtest/vite.config.ts` now imports
`assertDistFresh` from `@mkbabb/glass-ui/freshness` and invokes it at
config evaluation, failing-closed when the `file:../glass-ui` symlink
points at a stale `dist/`. Cross-repo write per MULTI-WRITER mode.

### Codified — three precept canonicalizations (N.W0 Lane B; precept submodule `46d6cfb → b8af314`)

-   `tranche/RESEARCH.md` §"Canonical Angles" extends from 6 → 8 angles:
    bidirectional style audit (angle 7) + overfitting audit (angle 8) are
    canonical at every tranche that ships substrate work in a design system
    or library-with-consumers shape.
-   `tranche/SPEC.md` §"Close" gains a new sub-section
    "Audit-verdict spot-verification gate": before authoring a wave-spec
    that retires items per an overfitting audit, the orchestrator MUST
    spot-verify (item exists; rg count accurate through alias paths;
    zero-consumer claim resolves through CSS / dynamic-import paths).
-   `instructions/README.md` §"Edicts" gains "Wire before retire":
    under-wired primitives default to WIRE, not RETIRE; retirement
    requires explicit "no proper wiring target exists" rationale.

### Codified — audit-verdict LESSONS-LEARNED entry (N.W0 Lane C)

`docs/precepts/instructions/LESSONS-LEARNED.md` 2026-05-13 entry:
"Audit Verdicts Require Spot-Verification". Catalogues the 3 audit
failures from the N KISS-revision overfitting audit (1 hallucination
on `useGlassAlpha`; 2 false positives on J-6 tokens; 1 missed consumer
on `useTouchGate`); reverses the prune verdict to 5 strategic wires.

## 1.1.0 — 2026-05-13 — AB Living-UI canon (chassis token + timeline structural split + Pulse aura + sectioned Progress + dock-shadow consumer canon)

The AB tranche accumulated five cross-repo lanes against this trunk and ships
as a single v1.1.0 bump per the user 2026-05-13 directive. The version is a
deliberate **minor** rather than a sequence of patches because the cumulative
surface adds API:

-   New layout-tier guardrail token `--chassis-max-block-size` (AB.W1.T1)
-   New `<GlassTimeline>` Option C structural split (`progressbar` ↔ marker
    sibling), `popoverContent` slot, `currentSegmentKey`, `hoverEnd` event
    (AB.W2.T1–T4); new `<HoverPopover>` `v-model:open` + `update:open`
-   New `<Pulse variant="aura">` ambient halo + `--animate-ambient-pulse-*`
    ambient-motion token block + `@keyframes ambient-pulse` (AB.W3.T1)
-   New `<Progress variant="sectioned">` with per-segment colour cells +
    spring active fill + transition-gradient seams + reduced-motion contract
    -   `--progress-sectioned-*` token block (AB.W3.T2)
-   AB.W4 closes the Z.W2 honesty bomb on B5 (dock-shadow override) by
    shipping the **consumer canon** with a verified Playwright-probe trail —
    no glass-ui canon edit was needed; the existing `--shadow-dock-override`
    on `.glass-dock` (`dock.css:46`) + `--shadow-uniform` token
    (`tokens.css:346`) already comprise the canon. The W4 close documents
    the consumer recipe for any future dock-hosted icon that catches the
    rightmost taper of the directional dock shadow.

This is the AB Living-UI canon: every primitive in the cluster (chassis +
timeline + Pulse + Progress + dock) now reads as **living** under capped
ambient motion + reduced-motion contracts + state-aware visual register.

### Added — `--chassis-max-block-size` (AB.W1.T1)

New layout-tier guardrail token for consumer app-chassis cards (e.g. the
speedtest `.results-card`):

```css
--chassis-max-block-size: calc(
    100dvh - var(--dock-footer-space, 5.75rem) - var(--page-padding-top, 0rem) - 1rem
);
```

The token expresses the maximum block size a centred consumer card may
consume while preserving the inline dock footprint. It composes consumer-owned
fallbacks (`--dock-footer-space` is the consumer's `dock-h + dock-inset +
card-edge-inset` sum) so the calc evaluates correctly inside any consumer.

Discipline (DESIGN.md `## Chassis sizing — dock-adjusted viewport` carries
the full statement):

-   Consumers centre cards inside the **dock-adjusted viewport** (the area
    above the dock), then clamp internal regions to that area.
-   Internal regions (meter / readout / timeline) must yield in order before
    scroll appears: meter shrinks first, then readout, then timeline.
-   `overflow-y: auto` is a documented fallback, not the primary passing
    path. Clamp-first / no-scroll-first is the canon.
-   The token reserves a ≥ 1rem visible gap above the dock — the user mandate
    is "the card should not occlude the dock".

Speedtest's AB.W1.T2 consumes the token to repair B1 (card-too-tall
occlusion) + B10 (mobile/desktop fit) + H3 (mobile-375 CLS 0.926 → ≤ 0.15)
at the chassis level.

### Added — `<Pulse variant="aura">` ambient surface-scope halo (AB.W3.T1)

Third Pulse variant alongside `dots` + `ring`. Paints an
absolutely-positioned radial-gradient halo inside its host surface; the
host owns `position: relative` + `border-radius` and the aura inherits
both. The breath cycle drives scale + opacity off the new
`--animate-ambient-pulse-*` tokens.

API additions (backward-compatible — `variant`/`speed`/`count`/`class`
unchanged):

```ts
type PulseVariant = "dots" | "ring" | "aura";
type PulseIntensity = "subtle" | "normal" | "vivid";

interface PulseProps {
    variant?: PulseVariant;
    intensity?: PulseIntensity; // aura-only — scale-max amplitude
    once?: boolean; // aura-only — single-breath then settle
    // ...existing props
}
```

Tokens published at `styles/tokens.css` §2.A AMBIENT MOTION:

```css
--animate-ambient-pulse-duration: 6s;
--animate-ambient-pulse-scale-min: 1;
--animate-ambient-pulse-scale-max: 1.15;
--animate-ambient-pulse-easing: var(--ease-apple);
--pulse-aura-opacity-min: 0.55;
--pulse-aura-opacity-max: 0.95;
```

Plus a shared `@keyframes ambient-pulse` in `styles/animations.css`.

Reduced-motion: `Pulse.vue`'s scoped `@media (prefers-reduced-motion:
reduce)` bracket forces `animation: none` + parks at the min stop.
Depth + colour stay visible; only the breath cycle disables.

The aura host is composed by the consumer — speedtest adopts at 5
capped surfaces (Start button idle, idle hero pill, complete-headline
one-shot, active result-row value, timeline current-stage panel). The
primitive itself does NOT mount on a card/chassis surface; that
reservation rule lives at the consumer side.

### Added — `<Progress variant="sectioned">` phase-bus primitive (AB.W3.T2)

Third Progress variant alongside `default` + `gradient`. The canonical
**phase-bus** primitive — N colour-coded cells with gradient seams
between siblings, an active cell spring-grown fill, a living catch-
light sweep, and recessed glass-channel depth on the rail.

API additions:

```ts
export interface ProgressSegment {
    key: string;
    label?: string;
    color: string; // CSS colour (hex, oklch, color-mix, var())
    state?: "pending" | "active" | "completed";
    weight?: number; // default 1 (equal share)
}

interface ProgressProps {
    variant?: "default" | "gradient" | "sectioned";
    segments?: ProgressSegment[]; // sectioned only
    currentSegmentKey?: string | null; // sectioned only
    activeProgress?: number; // sectioned only — 0..1 fill of active cell
}
```

Per-cell visual register:

-   **pending** — frosted colour tint @12% opacity
-   **active** — frosted tint @18% + spring-fill from leading edge + `mix-blend-mode: overlay` catch-light sweep traversing every 1.8s
-   **completed** — saturated fill at 100% across the cell

Seams between adjacent cells paint as a small gradient blend (`--seam-from`
→ `--seam-to`) at `mix-blend-mode: screen` so the joins read as living
glass joints, not hard CSS stripes.

Rail depth via `inset` + `outer` box-shadow + the `--shadow-color`
token: top catch-light strip, lower inner shadow, small outer drop.
Token knobs at `tokens.css` §2.B SECTIONED PROGRESS:

```css
--progress-sectioned-height: 0.875rem; /* 14px — W3 spec minimum */
--progress-sectioned-track: var(--secondary);
```

Reduced-motion: sweep + width transition disable; saturation + state
distinctions stay visible.

Speedtest's `MeterColumn.vue` consumes the sectioned variant at the
under-meter `.phase-progress` rail. Width 92% of the meter column;
height 14px mobile / 18px desktop (≥720px). DPI variant collapses to
2 cells via the consumer's visible-metric filter.

### Added — `.dock-label` typography utility (AB.W1.T5)

New `@utility dock-label` (typography.css) — canonical register for
text labels INSIDE `.dock-tab-button` (Start, Next, Submit, Done, New
Test, survey labels). Composes:

-   `font-family: var(--font-serif)` — picks up the consumer's
    brand-uniform-sans preset when set
-   `font-size: var(--dock-label-size, var(--type-subheading))` — composes
    the audacious-dock label-size knob (utilities.css §audacious mobile
    carve declares `--dock-label-size: 14-15px` at narrow viewports);
    desktop falls back to `--type-subheading`
-   `line-height: var(--type-leading-body)`
-   `font-weight: 500` — medium rung; present but not bold

Rationale: `.text-heading` is the heading register and carries
`font-weight: 700`. Consumers were applying `.text-heading` to dock
labels (Start, Next, …), which read as literal bold inside a dock pill.
The user mandate is "the Start text should not be bold", redressed to
every bottom-dock text label. `.dock-label` is the explicit canonical
register so `.text-heading` keeps its semantic weight contract.

Speedtest's AB.W1.T5 swaps `text-heading` → `dock-label` across every
DockTabButton text span (B8).

### Changed — GlassTimeline continuous variant Option C structural split (AB.W2.T4)

Per A4 §nested-interactive + A6 §"glass-ui M tranche". The continuous
variant's `.continuous-track[role="progressbar"]` previously nested
focusable `<button class="continuous-dot">` descendants, which trips
the axe `nested-interactive` rule (serious; WCAG 2.0 A — 4.1.2).
The W2 fix restructures the rail and the marker buttons into
SIBLINGS:

```html
<div class="continuous-track-wrap">
    <div
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="N"
        aria-valuenow="..."
        class="continuous-track"
    >
        <div class="continuous-region state-completed">
            <div class="continuous-region-fill" />
            <!-- paints --continuous-fill-width -->
        </div>
        ...
    </div>
    <ul role="list" class="continuous-markers">
        <li role="listitem">
            <HoverPopover><button class="continuous-dot" /></HoverPopover>
        </li>
        ...
    </ul>
</div>
```

The non-interactive `progressbar` rail reports aggregate progress to
AT; the sibling marker `<ul role="list">` carries the per-phase
interactive buttons. Both axe-clean. The marker overlay also lives
outside the rail's `overflow: hidden` clip, so the dots' outer 14 px
box paints in full — closing the AA-carry-forward `nested-interactive`
violation AND the B2.a perceived-off-centre visual artefact in a
single DOM rewrite.

### Changed — GlassTimeline continuous-dot perceived centering (AB.W2.T1 / A4 §B2)

Three coupled fixes restore the dot's perceived centre to its math
centre on the rail:

-   Opaque dot background (`var(--background)`) so the rail seam line no
    longer bleeds through the translucent fill.
-   Symmetric `box-shadow: 0 0 4px ...` (was directional `0 1px 2px`)
    so the dot's centre of mass aligns with the math centre.
-   `box-sizing: border-box` so the 2 px border lives inside the 14 px
    box.
-   Marker `<li>` uses `display: flex` + `line-height: 0` to collapse
    the default list-item line-box, which otherwise introduced a 1 px
    vertical drift between the translate anchor and the dot's geometric
    middle.

### Added — `popoverContent` slot + `currentSegmentKey` prop (AB.W2.T2 / T3)

The continuous variant now wraps each marker button in `<HoverPopover>`
(opt-out via `disablePopover`). Hover surfaces a color-coded popover
carrying `{ label, value, description, state }` from the segment's
`value` payload. Consumers override the body via the scoped
`#popoverContent` slot:

```vue
<GlassTimeline variant="continuous" :segments="..." :current-segment-key="key">
  <template #popoverContent="{ segment }">
    <div :style="{ '--popover-tint': segment.gradient.to }">…</div>
  </template>
</GlassTimeline>
```

The popover's `--popover-tint` reads the segment's gradient endpoint by
default; the body's left-rule border picks up that tint so the
popover reads as "this phase's data".

`currentSegmentKey?: string` stamps `data-current="true"` on the
matching marker and `data-completed="true"` on every completed marker
(derived from per-segment `state`). The data hooks are stable
substrates for consumer "show CURRENT phase, not stale hover" panel
logic (B2.b) and for the AB.W3 raised-rivet phase-bus echo styling.

### Added — `update:open` passthrough on `<HoverPopover>` (AB.W2)

`<HoverPopover>` now supports `v-model:open` and emits `update:open`
when reka-ui's internal HoverCardRoot open state changes. The
cadence honors `hoverOpenDelay` and `closeDelay`, so consumers
receive the same debounced signal the popover itself reads. This
lets the timeline drive its `hover` / `hoverEnd` events from the
popover open state instead of raw `@mouseenter` / `@mouseleave` on
the trigger, which fired too eagerly when the popover content
overlapped the trigger (popover-on-hover jitter).

### Added — `<GlassTimeline>` `hoverEnd` event

Continuous + segmented variants now emit `hoverEnd` on the segment
the pointer left, mirroring `hover`. Consumers blend hover-over-current
in the panel via `effective = hovered ?? current`. The new event is
additive (existing `hover` semantics unchanged).

### Documented — dock-shadow consumer canon (AB.W4 — B5 honesty close)

Z.W2 (canon since v1.0.1) shipped two coupled primitives for consumers
that need to neutralize the dock's directional drop shadow on a per-
icon basis:

-   `--shadow-dock-override` — consumed by `.glass-dock` at
    `dock.css:46` (`box-shadow: var(--shadow-dock-override,
var(--shadow-dock))`).
-   `--shadow-uniform` — uniform omnidirectional shadow recipe in the
    `--shadow-md`/`--shadow-lg` color-mix family
    (`tokens.css:346`).

Z.W2's documentation gestured at the pairing but did NOT publish the
canonical consumer recipe. AB.W4's audit (the A2 "honesty bomb" — Z.W2
declared B5 RESOLVED but the two-layer fix silently no-op'd because no
consumer ever composed the override) confirmed both halves of the
contract are healthy on the canon side; the gap was the consumer
recipe.

**Consumer recipe — when a dock-hosted icon catches the rightmost or
leftmost taper of `.glass-dock`'s directional drop shadow:**

```vue
<GlassDock
    :style="{ '--shadow-dock-override': 'var(--shadow-uniform)' }"
    shape="pill"
    ...
>
  <!-- dock children, including the icon that catches the taper -->
</GlassDock>
```

Speedtest's AB.W4 commits the recipe at `src/components/dock/Dock.vue`
to close B5 (settings gear right-edge halo). No glass-ui-side changes
needed; the canon was complete since v1.0.1. This is documented as
**v1.1.0-class canon refinement** because the live consumer recipe is
now part of the published surface, not just an inline token comment.

## v1.0.5 — 2026-05-12 — M.W2 (F-ε-3 Configurator recursion fix + `src/api/` canonical-type promotions + L cosmetic residuals absorb)

Three-lane substrate close: F-ε-3 Configurator recursion CLOSED via source
fix (Lane A); 5 canonical types promoted to the discovery surface
(Lane B); 9 of 11 L cosmetic residuals absorbed (Lane C). Full per-lane
detail in `docs/tranches/M/audit/W2-Lane-{A,B,C}-*-proof.md`.

### Fixed — F-ε-3 Configurator recursion (Lane A)

L.Rε A.8 + L.W7 Lane B catalogued a Lighthouse-only "Maximum recursive
updates exceeded" at `/motion/metaballs` that did not reproduce under
Playwright. M.W2 Lane A authored a methodical Vitest fixture
(`tests/configurator-recursion.spec.ts`) that surfaced THREE causal
layers, all repaired:

1. **(primary)** reka-ui `<CollapsibleContent>` + `<Presence>`
   height-measurement watcher graph race under Lighthouse cold-load
   discipline; `getComputedStyle` + `getBoundingClientRect` reads
   inside `watch([isOpen, presentRef.value?.present])` re-trigger
   non-convergently across 7 ConfiguratorLayer instances. Fix:
   `src/components/custom/configurator/ConfiguratorLayer.vue` replaces
   the reka-ui `<Collapsible>` composition with a CSS-only
   `grid-template-rows: 0fr ↔ 1fr` reveal — no JS watchers, no
   DOM-measurement, no recursion surface.

2. **(secondary)** Vue 3 Boolean prop coercion forced
   `props.open === false` (instead of `undefined`) when no `:open`
   passed, short-circuiting `ref(props.open ?? props.defaultOpen)`.
   Fix: `withDefaults({ open: undefined })` in ConfiguratorLayer.

3. **(tertiary)** `MetaballCanvas.isSupported` was a reactive ref that
   flipped `true → false` after WebGL init failed (Lighthouse runs
   with `--disable-gpu`); the metaballs story's
   `<MetaballCanvas v-if="canvasRef?.isSupported ?? true">` pattern
   then created an asymmetric mount/unmount cycle hitting Vue's
   100-iteration recursion cap. Fix:
   `src/components/custom/metaballs/useMetaballs.ts` adds a synchronous
   `isWebGLSupported()` probe; `isSupported` is seeded at composable-call
   time and never re-mutated. `defineExpose` no longer ships
   `isSupported` from `MetaballCanvas.vue`. New canonical consumer probe
   `isWebGLSupported` exported from `src/components/custom/metaballs/index.ts`.

Verification: Vitest fixture 6/6 PASS; full test suite 29 files / 339
tests PASS. Lighthouse@12.8.2 against `/motion/metaballs` with
`--headless=new --disable-gpu`: `errors-in-console` score 0 → 1; items
1 → 0; BP category 0.96. Puppeteer cross-verification at 1.5Mbps/750Kbps

-   4× CPU throttle: pageerror count 15+ → 0; `[Vue warn]` traces
    14+ → 0.

### Added — `@mkbabb/glass-ui/api` (Lane B)

Extend the `@mkbabb/glass-ui/api` discovery layer with 5 canonical types
that were excluded at L.W1 Lane B (32-symbol launch). The promotions
absorb L-residuals.md P3 carry-forwards + L.W7 Lane B fallout + AA-tranche
timeline primitive surface — every promotion has consumer evidence on
the canonical public surface today.

Surface count: 32 → 37 (29 types + 4 constants — historical arithmetic typo corrected at P.W0 Lane C).

-   `GlassPanelVariant` — 5-rung glass-ladder vocabulary (`wash | quiet |
resting | floating | overlay`). Lane B-original W1-B Open Q1 path-a
    closure: the canonical home `src/components/custom/glass-panel/index.ts`
    now re-exports the type from the SFC alongside `GlassPanelProps` so the
    symbol is on the public-package barrel before api/ re-exports it. The
    demo's `foundations/paper-glass.vue` had locally redeclared this exact
    union since v0.8.6 — promotion deletes that duplicate at consumer side.
-   `ConfiguratorCloneMode` — `"commit-on-write" | "per-preset"` union
    driving the Configurator slot model. Shipped at L.W7 Lane B aurora
    unification (aurora chrome pins `'per-preset'`). The Configurator
    `index.ts` already exported it; api/ now completes the cluster
    alongside `ConfiguratorPreset`, `ConfiguratorScrollMode`,
    `ConfiguratorState`, `ConfiguratorStateOptions`.
-   `TimelineSegment` + `TimelineSegmentGradient` + `TimelineSegmentState`
    — segment data shape from the AA-tranche timeline primitive. Consumers
    building timeline preset arrays type fixtures against these. The
    `TimelineSegmentState` lifecycle enum is the timeline analog of
    `ToastVariant` (status-tier vocabulary).

### Fixed — `src/components/custom/glass-panel/index.ts`

-   Canonical-home barrel now re-exports `GlassPanelVariant` from
    `GlassPanel.vue`. Closes the W1-B audit's single-canonical-home
    oversight (the SFC exported the type but the package barrel did not,
    so api/ couldn't reach it without breaking the
    re-export-from-canonical-home invariant).

### Refined — L cosmetic residuals absorb (Lane C)

9 of 11 cataloged L cosmetic residuals absorbed (≥80% target met):

-   **F-π-1** — `demo/stories/TokenLadder.vue` 375 viewport overflow.
-   **F-π-2** — `demo/stories/compositions/dashboard.vue` 375+1024 viewport
    overflows.
-   **F-π-3 + G13** — `demo/stories/aurora.vue` overflow + cosmetic.
-   **G16** — `demo/stories/primitives/dock-group.vue` polish.
-   **G17** — `demo/stories/composables/use-story-demo.vue` polish.
-   **G4** — `src/composables/motion/index.ts` barrel style alignment with
    the rest of the composables/ tree.
-   **G14** — `src/components/ui/_shared/ModalOverlay.vue` `layout="edge"`
    comment wording clarification.

1 NO-CHANGE-REQUIRED (forms.ts Textarea hypothesis disproven at lane
investigation); 1 deferred to Lane B coordination (GlassPanelVariant —
handled at Lane B per above). Viewport fixes Playwright-verified at 3
viewports.

### Verification

-   `dist/api.d.ts` self-contained: 0 `'../src/...'` refs; size 12,513 B →
    ~16 KB (38 `export declare` lines).
-   `npm run verify-export-types`: PASS (`./api` resolves).
-   Synthetic-consumer probe at `/tmp/glass-ui-mw2b-probe/` typechecks
    cleanly on positive narrowing for all 5 new types; negative-control
    errors correctly flag invalid literals (`"elevated"`, `"overwrite"`,
    `"skipped"`).
-   Runtime probe `import("@mkbabb/glass-ui/api")` keys unchanged
    (4 constants — the 5 promotions are type-only, erase at build).
-   Full library typecheck (src/ side) + Vitest suite (29 files / 339
    tests + new `tests/configurator-recursion.spec.ts` 6/6) all PASS.

## v1.0.4 — 2026-05-12 — M.W0 (Carousel subpath substrate alignment with MIGRATION.md §1.2)

Fix the `@mkbabb/glass-ui/carousel` subpath to match the contract that
MIGRATION.md §1.2 promises. From v1.0.0 through v1.0.3, `src/carousel.ts`
re-exported only `useCarousel + CarouselApi` — but the migration guide
told consumers to import the entire `Carousel*` component family from
`/carousel` (Carousel, CarouselContent, CarouselDots, CarouselItem,
CarouselNext, CarouselPager, CarouselPrevious, GlassCarouselPager,
plus useCarousel + CarouselApi). The components were reachable only
through the root barrel via `components/ui/carousel/`'s own package
barrel, which contradicted L invariant 6 (vueuse-bearing surfaces live
on subpaths) — every `Carousel*.vue` injects `useCarousel`, which
composes `createInjectionState` from `@vueuse/core`.

Surfaced at M.W0 Lane III by the words/frontend migration attempt
(`import { Carousel, CarouselApi } from "@mkbabb/glass-ui/carousel"`
failed to resolve the components). The fix is single-file: extend
`src/carousel.ts` to re-export the entire family from the
`components/ui/carousel/` package barrel.

No root-barrel changes — root stays vueuse-free per L's Phase 2 SCC
trap closure. Single canonical home: `src/components/ui/carousel/index.ts`.

Bundle delta: `dist/carousel.js` 0.21 kB → 13.24 kB (gzipped 2.35 kB);
this is correct sizing, since the components now ship with their
subpath surface rather than dead-coding on root-barrel consumers.

### Fixed

-   `@mkbabb/glass-ui/carousel` now exports the full `Carousel*` component
    family, matching MIGRATION.md §1.2's documented contract. Consumers
    migrating from v0.9.x per the migration guide can now resolve every
    named symbol from the canonical subpath.

## v1.0.3 — 2026-05-12 — AA.W3.5 (Audacious display tier — mega / hero / audacious)

Typography-only canon extension routed from the speedtest AA-tranche
pre-W3.5 SYNTHESIS.md. The user's third and fourth AA interrupts asked
for fast.com-scale audacity ("Font is still far too small on desktop
and mobile for the speedtest. This should be large and audacious,
redolent of fast.com; complete text should be larger, too." +
"Ensure you use the dynamic and proper glass-ui typography sizing,
too, for all of the large audacious items."). Glass-ui owns the
ceiling canon — speedtest's cqi + digit-count + DPI-scale overlays
peg against it via `var(--type-display-*)`.

### New — `--type-display-mega/-hero/-audacious` + matching utilities

Three new rungs above `--type-display-5` continue the φ-ladder unbroken:

-   `--type-display-mega:       clamp(5.382rem, 4rem + 9vw, 11.089rem)` /_ φ^(9/2) — peak 177px _/
-   `--type-display-hero:       clamp(6.854rem, 4.5rem + 12vw, 17.942rem)` /_ φ^5 — peak 287px _/
-   `--type-display-audacious:  clamp(8.728rem, 5rem + 16vw, 22rem)` /_ φ^(11/2) — peak 352px _/

Plus `.text-display-mega`, `.text-display-hero`, `.text-display-audacious`
utility classes mirroring the existing `.text-display-5` shape — Fraunces
with `WONK=1 / SOFT=0` and `--font-display-weight` by default; the
`data-typography-preset="brand-uniform-sans"` :root override still maps
`--font-display` → `var(--font-brand-sans)` so consumers in the brand-
uniform-sans register get their stack at the audacious size without
intervention.

Same vw-axis as `--type-display-1..5` — consumer-agnostic. Consumers
that need container-query precision (speedtest hero, where the column
width drives the size) wrap their own clamp with these tokens as the
ceiling: `clamp(6rem, calc(38cqi * ...), var(--type-display-audacious))`.

Speedtest AA.W3.5 is the first consumer (hero pill-stack VALUE ceiling
→ audacious; result-row VALUE + idle placeholder ceilings → hero;
complete-headline ceiling → mega). DESIGN.md "## Audacious display
tier" section documents the canon — peak px values, intended uses
(speedtest hero, dashboard pane titles when the consumer wants the
number to win), opt-out paths.

-   `src/styles/typography.css` — three new `:root` token declarations +
    three new `@utility` blocks
-   `DESIGN.md` — "## Audacious display tier" sub-section appended to the
    "## Typography" section + size-tokens table rows added

## v1.0.2 — 2026-05-12 — AA.W1 (Timeline continuous variant + a11y defence + §16 TIMELINE tokens + canon-truth)

Five-task glass-ui canon augmentation routed from the speedtest
AA-tranche A4 audit. The headline is the third `<GlassTimeline>`
variant (`continuous`) — ONE rounded-pill rail with N region children,
matching the user's B1 directive ("one continuous bar with multiple
sections") that the Z.W2 segmented variant doesn't fit. Backward-
compatible: scrubber + segmented paths unchanged.

### New — `<GlassTimeline variant="continuous">`

Per A4 §S-17. Adds a third variant to `<GlassTimeline>` alongside
`scrubber` (default; pre-Z) and `segmented` (Z.W2). Visual shape:
ONE rounded-pill rail substrate + N absolute-positioned
`.continuous-region` children spanning prev-boundary → current-
boundary. Each region paints its own gradient (pending = transparent,
active = consumer gradient, completed = full gradient); optional 1px
seam dividers at region boundaries are gated by
`--timeline-continuous-seam-opacity`; boundary dots overlay the rail
at each region's right edge using the existing `.segmented-dot` recipe.

Same `TimelineSegment[]` data shape as the segmented variant — the
only new field is the optional `weight: number` for non-uniform
region widths (continuous variant only; segmented uses CSS flex).
Same event surface (`@hover` + `@click` with `{ key, segment }`
payload). Same `prefers-reduced-motion` collapse.

ARIA: `role="group"` on the wrapper + `role="progressbar"` on the
track with `aria-valuemin="0"`, `aria-valuemax=N`, `aria-valuenow`
derived from completed-segment-count + fractional active progress.
`aria-label` from the new `:ariaLabel` prop, or derived from segment
labels.

The speedtest consumer (AA.W2) is one prop-value flip away from
canonical adoption — `variant="segmented"` → `variant="continuous"`
plus retiring the `.completion-segments` private CSS.

-   `src/components/custom/timeline/GlassTimeline.vue` — third variant
    template branch + region geometry helpers + continuous CSS recipe
-   `src/components/custom/timeline/types.ts` — `TimelineSegment.weight`
    optional field

### Fixed — scrubber `aria-valuenow` coercion (axe-zero close)

Per A4 §S-16. The W5 axe scan found the scrubber's `aria-valuenow`
missing from the rendered DOM (Vue omits attributes whose binding
evaluates to `undefined` / `null`), triggering the `aria-required-attr`
rule CRITICAL. The fix coerces the binding via
`Number(modelValue ?? 0)` — guarantees a numeric `aria-valuenow="0"`
renders even when consumers pass `undefined` / `null` / a string.

Three regression specs at
`src/components/custom/timeline/__tests__/aria-valuenow.test.ts`:

-   `modelValue: undefined` → renders `aria-valuenow="0"`
-   `modelValue: null` → renders `aria-valuenow="0"`
-   `modelValue: 0.5` → renders `aria-valuenow="0.5"`

Test count: 330 → 333.

### New — `§16 TIMELINE` token block

Per A4 §S-15. The `--timeline-*` parametric overrides have been
referenced in scoped CSS since Z.W2 (12px defaults), but never
declared in `tokens.css` — so consumers couldn't discover the API via
canon. The new continuous variant adds three more knobs that need
first-class declarations alongside their siblings. Added a `§16
TIMELINE` block in `src/styles/tokens.css` (after `§14 RAINBOW PALETTE`,
before the `:root` close):

-   Heights — `--timeline-scrubber-height`, `--timeline-segmented-height`,
    `--timeline-continuous-height`
-   Geometry — `--timeline-dot-size`, `--timeline-segment-flex`
-   Continuous-specific — `--timeline-continuous-seam-opacity`,
    `--timeline-continuous-seam-color`
-   Per-segment gradients — `--timeline-segment-default-gradient`,
    `--timeline-segment-gradient-{ping,download,upload,jitter}`

### Fixed — var() fallback canon-truth

Per A4 §S-14. The segmented variant's CSS declared its `.segmented-band`
transitions with `var(--duration-slow, 0.55s)` + `var(--duration-fast, 0.18s)`
fallback values that disagreed with canon (`--duration-slow: 0.45s`,
`--duration-fast: 0.2s`). The fallbacks were dead code inside a
canonical consumer (the rungs always resolve), but they encoded an
incorrect dictionary about canon values — a maintainer could believe
the wrong rung. Aligned both fallbacks to canon-truth.

### Docs — `## Timeline Primitive` section

Per A4 §design-md. `DESIGN.md` confusingly named `timeline` as a
slider variant (the 24px glass-blurred / 24px disc scrubber) without
documenting that `<GlassTimeline>` is a separate Vue primitive with
its own variant taxonomy. Added a `## Timeline Primitive` section
after `## Variant Taxonomy` documenting:

-   The `<GlassTimeline>` Vue primitive (NOT the slider variant)
-   Three variants: scrubber + segmented + continuous (visual + use-case per)
-   `TimelineSegment` shape including the new `weight` field
-   Full token API (§16 TIMELINE, 11 declared rungs)
-   ARIA + a11y guarantees per variant

Added a cross-reference parenthetical to the slider table row so
readers landing on the slider docs first find the primitive.

### Refined — storybook chart-token migration

Per A4 §C-10. `demo/stories/data/timeline-segmented.vue` painted
gradient endpoints as raw hex literals (`#5B8DEF` / `#CC2233` /
`#E09030`), bypassing the canonical `--chart-{ping,download,upload}`
tokens. As the adoption oracle for the segmented + continuous
variants, the story led consumers to copy hex-literal patterns instead
of composing via canon. Migrated all three phase gradients to
`var(--chart-*)` references; removed a dead `var(--accent, #5B8DEF)`
hex fallback at the detail-pane border.

Added `demo/stories/data/timeline-continuous.vue` mirroring the
segmented story (3 phases + advance/reset controls + per-segment
legend) but using `variant="continuous"`. Registered in
`demo/stories/manifest.ts` under the data category.

### Verification

-   28 test files, 333/333 tests passing (was 330 pre-AA)
-   `vue-tsc --noEmit --project tsconfig.src.json` clean
-   `git diff --check` clean

---

## v1.0.1 — 2026-05-12 — Z.W2 (Timeline segmented variant + dock overflow contract + shadow-uniform token)

Three independent canon refinements bundled under one minor patch, driven
by the speedtest Z-tranche A2/A4 audit cohort. No breaking changes; the
scrubber-mode `GlassTimeline` API is preserved verbatim.

### New — `<GlassTimeline variant="segmented">`

Per A2 §B5. The pre-Z.W2 `GlassTimeline` was a single-track scrubber; the
new `segmented` variant accepts a `segments` array (`TimelineSegment[]`)
and renders adjacent gradient bands with boundary dots that emit `hover`
and `click` events. Per-segment gradient via a `{from, to}` pair (expanded
to `linear-gradient(90deg, from, to)`) or a raw CSS gradient string. Per-
segment lifecycle (`pending` / `active` / `completed`) drives a canonical
fill mapping (0 / 0.5 / 1) that consumers may override via the optional
`progress` field. Boundary dots are real `<button>` elements with full
keyboard semantics (Enter / Space activate; native focus-visible ring).

-   `src/components/custom/timeline/GlassTimeline.vue` — `variant` prop;
    segmented render path; scrubber path untouched
-   `src/components/custom/timeline/types.ts` — `TimelineSegment` + gradient + state types (NEW)
-   `src/components/custom/timeline/index.ts` — re-export the types
-   `demo/stories/data/timeline-segmented.vue` — 3-segment storybook story (NEW)

Speedtest consumes this primitive for multi-phase ping/download/upload
progress (Z.W2.T4).

### Refined — Dock overflow contract (B6)

Per A2 §B6 + A4 special-focus. The canon-intent for dock overflow is
grow-to-fit + clamp + wrap-as-opt-in, not scroll. The pre-Z dock CSS
applied `overflow-{x,y}: auto` to both the vertical rail and the
horizontal `.dock-layers` content. Z.W2.T2 flips both to `visible`; the
mask-fade gradients are retained as cosmetic feathers at the cap edge,
not as scroll affordances. Consumers needing wrap behaviour opt into
`.dock-wrap`.

-   `src/styles/dock.css` L156-194 — vertical rail: `overflow-{x,y}: visible`
-   `src/styles/dock.css` L294-312 — horizontal expanded: `overflow-x: visible`
-   `src/styles/dock.css` L354-358 — always-expanded vertical: `overflow-{x,y}: visible`

### Added — `--shadow-uniform` token (B7 routing)

Per A4 §special-focus. An offset-0 / no-directional-Y elevation rung for
dock-hosted icons where the dock's `--shadow-dock` downward cast reads
as a per-icon right-edge halo on the rightmost child. Consumers compose
via `--shadow-dock-override: var(--shadow-uniform)` per-instance or attach
to per-icon-button shadow stacks. Same color-mix recipe family as the
sized rungs; peer elevation, not sibling.

-   `src/styles/tokens.css` — `--shadow-uniform: 0 0 12px color-mix(...)`
-   `DESIGN.md` — token table entry under §Shadows

### Verification

-   Test suite: 27/27 files, 330/330 tests passing (no test deltas)
-   `vue-tsc --noEmit` clean
-   All existing dock stories render — the overflow change is conservative
    (clip-as-default removed; canonical grow-to-fit re-asserted)

## v1.0.0 — 2026-05-11 — L.W1 HEADLINE (root-barrel Phase 2 + curated surface + api/ discovery + subpath flatten)

L.W1 HEADLINE — bundles four architectural transpositions into the v1.0
cohort: (A) root-barrel Phase 2 strips vueuse-bearing re-exports to close
the SCC trap; (B) `src/api/` discovery layer for canonical public types +
constants; (C) flat subpath rename for the v0.9.x nested composables
subpaths + new `/carousel` subpath; (D) self-contained dts verified for
every public subpath.

Cross-repo verification (canonical L.W1 hard gate (f)): speedtest re-link
`98f88325` lands 15 import-site migrations. speedtest `dist/index.html`
modulepreload directives: 0 (canonical SCC-trap closure; was 1 at K close).
Speedtest entry-chunk gz: 171.5 KB (down from speedtest X close 204 KB
pre-Phase-1 baseline; -32.5 KB drop exceeds the ≥ 15 KB W1 hard-gate (f)
target). Glass-ui `dist/glass-ui.js` gz: 22.4 KB (was 33.6 KB at K close;
-11.2 KB; 66.6% bundle-budget headroom).

See `MIGRATION.md` for the consumer-facing migration path.

### BREAKING — Lane A (root-barrel curation; vueuse-bearing SCC trap closure)

Root barrel re-exports stripped — consumers must import from explicit subpaths:

-   **`Input`, `Textarea`, all `Combobox*` family** — moved off root barrel; use
    `@mkbabb/glass-ui/forms`. Vueuse-bearing form primitives that pulled the
    vueuse runtime into the entry chunk via the SCC walk.
-   **`Carousel`, `CarouselContent`, `CarouselDots`, `CarouselItem`,
    `CarouselNext`, `CarouselPager`, `CarouselPrevious`, `GlassCarouselPager`,
    `useCarousel`, `CarouselApi`** — moved off root barrel; use
    `@mkbabb/glass-ui/carousel` (NEW v1.0 subpath; see Lane C below).
-   **`useGlobalDark`** — moved off root barrel; use `@mkbabb/glass-ui/dark`
    (NEW v1.0 flat subpath; see Lane C below).
-   **`useKeyboardShortcuts`, `registerShortcut`, `useRegisteredShortcuts`,
    `formatCombo`, `formatComboParts`, `isMac`, `ShortcutOptions`,
    `RegisteredShortcut`, `ShortcutCombo`, `ShortcutEventType`** — moved off
    root barrel; use `@mkbabb/glass-ui/keyboard` (NEW v1.0 flat subpath).

The root barrel curation replaces the single `export * from "./components/ui"`
wildcard with 40 explicit per-package re-exports, omitting the 4 vueuse-bearing
packages (`input/`, `textarea/`, `combobox/`, `carousel/`). The result: the
root barrel is vueuse-free at every transitive import. `grep '@vueuse'
dist/glass-ui.js` returns empty post-fix.

Cherry-pick rationale for the 7 `custom/` packages still on the root barrel
(`instrument-chassis`, `glyph-face`, `dock-group`, `disco-glyph`,
`hover-popover`, `configurator`, `scrolling-text`) documented inline in
`src/index.ts` header (L.W2 Lane B annotation).

### ADDED — Lane B (`src/api/` discovery layer)

-   **`@mkbabb/glass-ui/api`** (NEW subpath) — single-file aggregator
    re-exporting 32 canonical public symbols (24 types + 4 constants/runtime
    values; the original entry said `8` — corrected at P.W0 Lane C) from
    canonical homes across 5 domain groupings: Aurora (12 types
    -   3 constants), Configurator (4 types), Metaballs (1 type + 1 constant),
        Surface enums (CardTier, InstrumentChassisPhase, ToastVariant), CVA
        variants (8 types across Alert/Avatar/Badge/Button/Sheet/Slider/Toggle +
        ToggleChip). `dist/api.js` 220 B (runtime constants; types erase);
        `dist/api.d.ts` 12,513 B / 32 export declarations / zero broken
        `'../src/...'` refs.

### BREAKING — Lane C (subpath flatten)

-   **`@mkbabb/glass-ui/composables/dark` REMOVED** — use
    `@mkbabb/glass-ui/dark`. The nested form was a v0.9.x transitional
    shape introduced at the W0 Lane III dts-publication-gap fix; v1.0
    flattens it to match every other public subpath (`/forms`, `/dock`,
    `/configurator`, ...). Per L invariant 4, no legacy alias is shipped.
-   **`@mkbabb/glass-ui/composables/keyboard` REMOVED** — use
    `@mkbabb/glass-ui/keyboard`. Same rationale.
-   **`dist/dark-subpath.{js,d.ts}` + `dist/keyboard-subpath.{js,d.ts}`
    artefacts retire** — the v0.9.4 transitional dist filenames are
    replaced by canonical `dist/dark.{js,d.ts}` + `dist/keyboard.{js,d.ts}`.

### ADDED — Lane C (carousel subpath)

-   **`@mkbabb/glass-ui/carousel`** subpath barrel at `src/carousel.ts`.
    Re-exports `useCarousel` (the embla-carousel-vue + `createInjectionState`
    composable that powers `<Carousel>` and the `Carousel*` family) plus the
    `CarouselApi` type. `useCarousel` imports `createInjectionState` from
    `@vueuse/core`, so isolating it on its own subpath keeps it off the
    consumer's root-barrel tree-shake walk — the same SCC-trap mechanism
    that motivates the `/dark` + `/keyboard` carve.

<!-- Lane A appends its W3 composable wire-or-retire section here. -->

### BREAKING — W3 retirements (Lane A — composables)

L.W3 Lane A — second-consumer fidelity audit per L invariant 8
(substrate-without-consumer binary at v1.0 freeze). Six composables in
scope; three WIRED via cross-repo speedtest consumption; three retired.

-   **`useOffsetPagination` REMOVED** — 0 production consumers (no src/
    site; no speedtest consumer). Demo-only at v0.9.x. Consumers roll their
    own offset pagination with `ref()` + a `fetchFn`-driven loader (the
    retired implementation was 60 LOC; copy from v0.9.3 source if needed).
-   **`useVirtualSectionWindow` REMOVED** — 0 production consumers.
    Consumers use `@tanstack/vue-virtual` or a hand-rolled
    IntersectionObserver windower.
-   **`useWindowedStore` REMOVED** — 0 production consumers. A sliding-
    window resident store is a `ref<T[]>` plus an eviction policy.
-   **`virtualSectionLayout` helpers REMOVED** — `buildSectionLayout`,
    `findSectionOffset`, `resolveActiveSection`, `resolveSectionWindow` and
    the associated `FlatSection` / `SectionLayout` / `SectionWindowRange` /
    `ForcedSectionWindowRange` types. Pure-function support substrate for
    `useVirtualSectionWindow`; retires with its parent.
-   **`@mkbabb/glass-ui/pagination` subpath REMOVED** — entry deleted from
    `package.json` exports + typesVersions and from `vite.library.ts`
    libraryEntries.
-   **`@mkbabb/glass-ui/virtual` subpath REMOVED** — entry deleted (housed
    the three virtual composables).

### KEPT — W3 Lane A (cross-repo wired)

-   **`useRAFLoop` retained** — speedtest's `useMeterRenderer.ts` consumes
    it for the canvas render loop (`@mkbabb/glass-ui` root barrel). Plus
    demo + test coverage. ≥ 2 consumers; no migration required.
-   **`useIntersectionPause` retained** — speedtest's `useAuroraPolicy.ts`
    composes it with reduced-motion gating for the aurora background. Plus
    demo + test coverage.
-   **`useDarkModeSync` retained** — speedtest's `SpeedtestMeter.vue` plus
    `dashboard/composables/useEChartsTheme.ts` consume it for canvas /
    ECharts theme re-init after dark-mode toggles. Plus demo coverage.

### BREAKING — W3 retirements (Lane B — primitives)

L.W3 Lane B — second-consumer fidelity audit per L invariant 8
(substrate-without-consumer binary at v1.0 freeze). All four primitives
in scope (`<DiscoGlyph>`, `<DockGroup>`, `<InstrumentChassis>`,
`<DockShowcaseFrame>`) reached the wave at exactly 1 consumer (the
self-named primitive demo). The disposition matrix:

-   **`<DockShowcaseFrame>` REMOVED** — the demo-private dock-context
    showcase chassis (V.W4) had zero consumers besides its own definition
    file at HEAD; `rg "DockShowcaseFrame" demo/` returned only
    `demo/stories/DockShowcaseFrame.vue` itself. Per Rε A3 verdict, the
    file is retired. Dock stories at HEAD compose raw chassis recipes or
    the canonical `<ShowcaseFrame>` directly; non-dock contexts already
    use `<ShowcaseFrame>` exclusively. The component was never on the
    library public surface (demo-private), so no `src/` source / barrel
    / package.json export changes are required.

### ADDED — Lane B (primitive second-consumer wiring)

-   **`<DiscoGlyph>` 2nd consumer** wired into
    `demo/stories/foundations/chart-chassis-palette.vue`. The chart-palette
    ladder now sits alongside live `<DiscoGlyph>` swatches — each chart
    token (`--chart-{ping,download,upload,jitter}`) drives the 8-stop
    facet gradient. Consumers verify the chart palette reads at glyph
    scale in one place.
-   **`<DockGroup>` 2nd consumer** wired into
    `demo/stories/compositions/dashboard.vue` as the dashboard's KPI
    pill-row shelf. Composes `<MetricBadge>` cells under a comfortable
    density rung — the canonical chassis-strip pattern DockGroup was
    designed for, now exercised in a non-primitive composition site.
-   **`<InstrumentChassis>` 2nd consumer** wired into
    `demo/stories/foundations/chart-chassis-palette.vue` as a live
    mini-chassis under the chassis-tier-tokens token ladder. The four
    chassis tokens (`--glass-bg-dock`, `--glass-bg-chassis`, the
    curvature overlay, the specular) now read in composition immediately
    below the swatch row. The compositions/instrument-chassis.vue page
    remains the dial-state interactive consumer.

### Production demo build — formal retire (L.W5 Lane B Option B)

K cross-tranche-debt deferred to L: "Production demo build — Lighthouse
audit surfaced `npm run build` is library-mode; no `vite.demo.config.ts`
for a static demo build. Defer to L (decide: ship static demo deploy
target OR formally retire demo as a deploy target)."

**Disposition at L.W5 Lane B**: Option B — formally retire the demo
storybook as a deploy target. The demo is dev-mode-only; Lighthouse
audits run against the dev server with the documented dev-mode caveat;
consumer-deploy concerns (CloudFlare Pages, Vercel, GitHub Pages,
cache-TTL) live in consumer repos. Speedtest's demo build chain is the
canonical reference for consumers that need a static deploy target.

No new build script, no `vite.demo.config.ts`, no `dist-demo/` output.
`npm run build` remains library-mode only. Documented in MIGRATION.md
§"Production demo build" for consumer awareness.

### L.W2 — Composables restructure (Lane A)

L.W2 Lane A restructures `src/composables/` into eight coherent sub-trees per
Rε §B.1.3 + §B.2.7. The pre-L flat top-level files are absorbed into the
matching domain sub-trees; the legacy `useGlobalDark.ts` + `useKeyboardShortcuts.ts`
shims retire alongside their pre-W0 impl files.

-   **NEW sub-tree** `src/composables/reactive/` — `useInterval`, `useTimer`.
-   **NEW sub-tree** `src/composables/dom/` — `useResizeObserver`, `useTouchGate`, `useTokenColor`.
-   **PROMOTED** `src/composables/dark/` — `useGlobalDark` (sub-tree with `index.ts` barrel; flat
    `/dark` subpath continues to re-export through it).
-   **PROMOTED** `src/composables/keyboard/` — keyboard-shortcuts registry (sub-tree with
    `index.ts` barrel; flat `/keyboard` subpath continues to re-export through it).
-   **ABSORBED** `useStagger.ts` → `src/composables/motion/useStagger.ts` (alongside
    `useStaggerReveal` which already lived there).
-   **DEMOTED** `useStoryDemo.ts` → `demo/composables/useStoryDemo.ts` (demo-private;
    no longer on library public surface per Rε §B.2.8).
-   11 file moves; 24 importer-graph edits (4 src/, 13 demo/, 8 tests, 3 barrels).

### L.W2 — Cohesion + import-shape annotations (Lane B)

L.W2 Lane B documents the cherry-pick rationale + cascade-order rules in source.
Pure documentation; zero runtime delta.

-   `src/index.ts` header comment block — extends the L.W1 curated-surface intro to
    enumerate (a) the three-layer import shape (root barrel · per-package subpaths · `/api`
    discovery layer) and (b) the acceptance bar for root-barrel inclusion (vueuse-free
    -   small primitive + ui/-composability) + names the 23 excluded custom packages.
-   `src/styles/index.css` cascade-order block — 40-line per-layer rationale block
    documenting all 16 CSS imports + their dependencies. Cascade unchanged.

### W4 — Mobile-viewport finishing

L.W4 closes K residual R1 (StoryPager inner-tab overflow at 375). The inner-tab
fix landed at K W5 commit `12abb09` (already at HEAD); the actual R1-shaped offender
was the K W8 π-1 finding — an audacious DockGroup `size="lg"` MetricBadge chip
overflowing the 375 viewport by 24 px at `/primitives/dock-group`.

-   **Fix**: `demo/stories/primitives/dock-group.vue` wraps the audacious DockGroup in
    a `<div class="dock-group-audacious-scroll">` with scoped `overflow-x: auto;
scrollbar-width: none`. Mirrors the StoryPager idiom. DockGroup substrate untouched
    (its inline-flex sizing is correct for chassis-strip consumers like speedtest's
    `MetricStrip`; the audacious row is intended for wider contexts).
-   **Post-fix probe at 375×667**: `body.scrollWidth = 375 = viewport`. Multi-viewport
    sweep across 9 surfaces × 3 viewports = 27 cells; 26 PASS + 1 pre-documented
    K-residual (Aurora -inset-6 decorative bloom +8 px at 375; K W8 π-2 cosmetic
    non-blocker; carries forward in K residuals ledger, not a new W8 ι entry).

### W6 — Lighthouse cohort completion

L.W6 re-verifies the K-absorbed Lighthouse cohort and dispositions the 4 P2
carry-forwards from K.

-   **K-absorbed fixes re-verified clean at HEAD post-L-W1**: viz-basis dark-mode
    contrast (`/primitives/buttons` A11y 100), preset chip aria-label (`/aurora`),
    dropdown aria-label (`/navigation/dock`), Skeleton compositor + Fraunces async +
    Computer Modern `font-display: swap`. Net A11y delta: `/primitives/buttons`
    94 → 100. SEO held at 91. 0 L W1 regressions.
-   **P2-2 `robots.txt`** — Option B: deferred to W5 Lane B (atomic with the
    production-demo-build binary disposition; W5 Lane B chose Option B —
    formally retire demo as deploy target — so robots.txt is retire-as-not-applicable).
-   **P2-3 `uses-passive-event-listeners`** — RETIRE-AS-NOT-OUR-SCOPE. Source is
    `@vue/runtime-dom` (Vue framework upstream). Carries forward to L FINAL.md
    ledger as upstream-Vue-debt.
-   **P2-4 `uses-long-cache-ttl`** — RETIRE-AS-NOT-OUR-SCOPE. Production hosting
    layer concern; consumers wire prod cache headers via their deploy target.
    Carries forward to L FINAL.md ledger as consumer-deploy concern.
-   **OPEN — F-ε-3 Configurator recursion** at `/motion/metaballs` reproduced under
    Lighthouse Headless Chrome; K W8 had dispositioned as "false-positive" but
    L W6 Lighthouse re-run reproduces. Routed to L W7 (touches Configurator with
    `cloneMode: 'per-preset'` extension) OR L W8 ι integrity-sweep as M-tranche
    carry-forward.

### L.W7 — Substrate cohesion (keyframes lift + aurora chrome Option-A unification)

#### Lane A — Keyframes lift to canonical animations.css

-   3 inline keyframes lifted from component `<style scoped>` blocks to
    `src/styles/animations.css`: `pulse-dot-bounce`, `pulse-ring-spin`,
    `typewriter-blink` (renamed from `tw-cursor-blink`; kebab-case canonical).
-   `Pulse.vue` -7 lines; `TypewriterText.vue` -11 lines.
-   `ScrollingText.vue`'s `scrolling-text-pan` remains inline (out of Lane A
    bounds; documented exception).

#### Lane B — Aurora chrome Option-A unification (closes K cross-tranche-debt)

-   **`useConfiguratorState<T>` API gains `cloneMode?: 'commit-on-write' |
'per-preset'` option** (default `'commit-on-write'` — metaballs preserved).
    `per-preset` semantics: each preset slot holds an independent live clone
    seeded from baseline; `selectPreset` snapshots the outgoing slot via
    `toRaw` + clone then loads incoming slot into reactive `config`;
    `resetCurrent` re-clones from preset definition.
-   **`useConfiguratorState<T>` API gains `cyclePreset(direction?: 1 | -1)`**
    for keyboard handlers.
-   **Real bug fix surfaced during lane**: `defaultClone` hardened with `toRaw`
    to unwrap Vue reactive proxies before `structuredClone` (which throws
    `DataCloneError` on a Proxy).
-   **`ConfiguratorCloneMode` type exported** from configurator barrel.
-   **`useAuroraStudio` REMOVED** (Option I disposition). Aurora chrome
    (`demo/stories/aurora.vue`) now consumes `useConfiguratorState<AuroraConfig>`
    with `cloneMode: 'per-preset'`. The previously demo-private
    `useAuroraStudio.ts` parallel-chrome implementation retires.
-   Configurator family second-consumer maturity: ACHIEVED. 3 consumers at HEAD
    (metaballs commit-on-write; aurora per-preset; primitives/configurator demo
    catalog). K cross-tranche-debt for configurator-family fidelity CLOSED.
-   F-ε-3 (Configurator recursion warning at `/motion/metaballs`): Playwright
    probe post-Lane-B clean (zero "Maximum recursive updates exceeded" errors).
    Lighthouse re-reproduction still surfaces under specific load timing —
    routed to M-tranche for further investigation. Not a v1.0 release blocker
    (Best-practices Lighthouse score 96; non-blocking advisory).

### L.W5 — Doc cohort + K residual absorption (Lane A)

L.W5 Lane A closes the v1.0 doc cohort + absorbs K residuals R3 + R4.

-   **CLAUDE.md / README.md / DESIGN.md aligned with v1.0 HEAD** — composables tree
    reflects the L.W2 8-sub-tree restructure; Subpath surface section enumerates the
    flat v1.0 surface (38 flat subpaths + `/styles` + `/api`); custom-package
    cherry-pick rationale, naming-pair disambiguation (`dock` vs `dock-group`;
    `glass-carousel` vs `carousel`), and CSS cascade order all documented.
-   **K R3 absorbed** — wave-spec status lines bumped from "open / pending /
    planned" to "CLOSED `<commit>`" across `docs/tranches/K/waves/W*.md` (matching
    K PROGRESS.md commit hashes) and the closed `docs/tranches/L/waves/W{0..6}.md`.
-   **K R4 absorbed (Option A — define new rungs)** — new `--surface-tint-{35,40,70}`
    rungs in `src/styles/tokens.css` + `src/styles/theme.css` Tailwind bridge.
    4 P1 sites migrated to canonical tokens: `Slider.vue:163` (slider thumb border),
    `GlassTimeline.vue:172` (timeline thumb hover background),
    `UnderlineTabs.vue:110` (tab hover color), `glass.css:220` (input-pill
    placeholder). Canonical token vocabulary now covers every literal
    `color-mix(in srgb, var(--foreground) N%, transparent)` site at HEAD.
-   **MIGRATION.md** — Lane B authors the canonical v0.9.x → v1.0 migration path.
    Cited from CHANGELOG v1.0 header.

## v0.9.4 — 2026-05-11 — subpath dts publication gap (K.WS regression patch)

L.W0 Lane III patch — fixes a typing-publication gap surfaced by the K.WS
additive subpath split (v0.9.3). At v0.9.3, consumer `vue-tsc` could not
resolve `@mkbabb/glass-ui/composables/dark` or
`@mkbabb/glass-ui/composables/keyboard` because the published
`dist/composables/{dark,keyboard}.d.ts` files emitted a broken
`export * from '../src/composables/<name>'` re-export — and glass-ui does
not ship `dist/src/`, so the path resolved to nothing. Consumers got
`TS2305: Module has no exported member`.

### FIXED

-   **Subpath dts publication gap** — `vite-plugin-dts` `rollupTypes: true`
    has a pathing bug for nested entry-keys (containing `/`): the
    synthetic-stub-then-rollup flow writes a broken `'../src/...'` re-export
    at `dist/<key>.d.ts` and the rolled-up self-contained dts at
    `dist/<basename>.d.ts`. Cohesion fix: rebound the two nested entry-keys
    (`composables/dark`, `composables/keyboard`) to flat dist names
    (`dark-subpath`, `keyboard-subpath`) in `vite.library.ts`. The
    consumer-facing subpaths `@mkbabb/glass-ui/composables/{dark,keyboard}`
    are preserved verbatim via `package.json` `exports` + `typesVersions`
    pointing to the flat dist outputs.
    Source implementations were also lifted into the subpath barrels
    (`src/composables/{dark,keyboard}.ts`) — the legacy
    `src/composables/{useGlobalDark,useKeyboardShortcuts}.ts` files become
    one-line re-export shims that keep all internal `./useGlobalDark` and
    `./useKeyboardShortcuts` imports compiling without churn.
    (L.W1 will flatten the consumer-facing subpath names to
    `./dark` / `./keyboard` as the final breaking gestalt.)

### ADDED

-   **`scripts/release.sh` subpath-probe block** — runs a `node -e
"import('@mkbabb/glass-ui/<sp>')"` resolve check for every published
    subpath after `npm run build` and before `git tag`. Aborts the release
    if any subpath fails to resolve. Closes the silent-miss class that
    produced the K.WS publication gap.

## v0.9.3 — 2026-05-09 — vueuse SCC trap (Phase 1: additive subpath split)

K.W-S patch — additive subpath carve for the vueuse-bearing surface of
glass-ui. Closes the upstream half of the speedtest W3.b.1 vueuse
manualChunk deferral; the trap-breaking fix lands in Phase 2 (root-barrel
removal, breaking, scheduled for v1.0).

### ADDED

-   **`@mkbabb/glass-ui/forms`** subpath barrel at `src/forms.ts`. Re-exports
    `Input`, `Textarea`, the full `Combobox*` family (Combobox, ComboboxAnchor,
    ComboboxCancel, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem,
    ComboboxItemIndicator, ComboboxList, ComboboxSeparator, ComboboxTrigger,
    ComboboxViewport). These are the form primitives that import `useVModel` /
    `reactiveOmit` from `@vueuse/core` and so propagate the vueuse → Vue
    runtime SCC into any consumer that reaches them through the root barrel.
-   **`@mkbabb/glass-ui/composables/dark`** subpath barrel at
    `src/composables/dark.ts`. Re-exports `useGlobalDark` (`createGlobalState`
    -   `useDark` + `useToggle` consumer).
-   **`@mkbabb/glass-ui/composables/keyboard`** subpath barrel at
    `src/composables/keyboard.ts`. Re-exports the keyboard-shortcuts registry
    surface (`registerShortcut`, `useRegisteredShortcuts`, `formatCombo`,
    `formatComboParts`, `isMac`, type aliases).

### WHY

The speedtest W3.b.1 disposition surfaced a Strongly-Connected-Components
(SCC) trap in Rollup: when a consumer applies a `"vueuse": ["@vueuse/core",
"@vueuse/shared"]` `manualChunks` rule and ALSO depends on Vue elsewhere
(e.g. App.vue, router), Rollup hoists `@vue/shared` + `@vue/reactivity` +
`@vue/runtime-core` into the vueuse leaf to satisfy both consumers. The
entry chunk then imports from vueuse to access Vue, and Vite emits a
`<link rel="modulepreload">` to satisfy the eager dependency — the same
mechanism V.W1.T7 retired for vue-echarts. Net: the consumer's eager
critical path _grows_ despite the manualChunk's intent.

The architecturally-correct fix is to keep vueuse-bearing surfaces off
the consumer's tree-shake walk unless they explicitly reach for them.
Phase 1 ADDS the subpath barrels without REMOVING the root-barrel
re-exports — that's the additive prerequisite that lets Phase 2 (the
breaking removal at v1.0) land without surprising consumers.

### MIGRATION

Root-barrel imports keep working at v0.9.3:

```ts
// Still resolves at v0.9.3 (Phase 1 keeps backward compat)
import {
    Input,
    Textarea,
    Combobox,
    useGlobalDark,
    registerShortcut,
} from "@mkbabb/glass-ui";
```

Consumers that want to apply a vueuse manualChunk should migrate to the
subpath shape ahead of v1.0:

```ts
// v0.9.3 recommended shape (and v1.0 required shape)
import { Input, Textarea, Combobox } from "@mkbabb/glass-ui/forms";
import { useGlobalDark } from "@mkbabb/glass-ui/composables/dark";
import { registerShortcut } from "@mkbabb/glass-ui/composables/keyboard";
```

### KNOWN LIMITATION

Phase 1 alone does NOT close the SCC trap. The K.W-S evidence transcript
(`docs/tranches/K/audit/W-S-bundle-evidence.md`) confirms that with v0.9.3
linked in the speedtest consumer and a `"vueuse": ["@vueuse/core",
"@vueuse/shared"]` manualChunk applied, the entry chunk drops 30.78 KB gz
but a new 33.58 KB gz vueuse leaf appears with `@vue/shared` +
`@vue/reactivity` + `@vue/runtime-core` hoisted in, dragging the modulepreload
directive back into `dist/index.html`. Net eager-path: regression of ~2 KB.

The trap-breaking fix completes at Phase 2: REMOVE the vueuse-bearing
re-exports from `src/index.ts` (and `src/components/ui/index.ts` for the
form primitives + carousel internals). That's a breaking change scheduled
for v1.0 / L tranche.

### CHORE

-   `package.json`: version bump 0.9.2 → 0.9.3; `exports["./forms"]`,
    `exports["./composables/dark"]`, `exports["./composables/keyboard"]`
    added; matching `typesVersions` entries.
-   `vite.library.ts`: `libraryEntries` extended with the three new entry
    points.

## v0.9.2 — 2026-05-08

W.W3.b.2 patch — two library-internal fixes that unblock the speedtest
W3 perf push: a browser-safety repair on the root barrel and an A5 §3
Split 6 swap of `tailwind-merge` for a hand-rolled deduplicator.

### FIX

-   **Root barrel no longer re-exports `./freshness`** (the build-blocker).
    `src/freshness.ts` imports `node:fs` / `node:path` / `node:url`; Vite's
    browser bundler externalises these as `__vite-browser-external` and
    fails when a consumer's worker pulls anything off `@mkbabb/glass-ui`'s
    root export. The speedtest worker at `src/utils/speedtest/index.ts:1`
    was hitting this path: the symptom was
    `"existsSync" is not exported by "__vite-browser-external"` during
    `npm run build`. The fix removes line 19's `export * from "./freshness"`
    from `src/index.ts` and leaves the helper reachable at the subpath
    `@mkbabb/glass-ui/freshness` (`exports["./freshness"]` was minted in
    v0.9.1). The library-external list in `vite.library.ts` keeps the
    Node-builtin externals so the subpath still bundles correctly.

### PERF

-   **`cn()` swaps `tailwind-merge` for `clsx` + a hand-rolled deduplicator**
    per A5 §3 Split 6 and `feedback_library_gaps.md`. `tailwind-merge`
    ships ~22 KB gzipped of full Tailwind config tables to resolve every
    conflict pair across the framework; glass-ui exercises a small,
    enumerable subset. The replacement walks the joined class string
    left-to-right, computes each token's bucket via a ~30-rule regex
    table (font-size, font-weight, padding axes, margin axes, gap, sizing,
    bg-color, text-color, border-color, border-width, ring, rounded,
    display, position, overflow, flex, items, justify, opacity, z-index,
    cursor, shadow), and keeps the last-write per `(prefix-scope|bucket)`
    pair. Variant prefixes (`hover:`, `md:`, `dark:`) scope the bucket so
    `text-sm md:text-lg` keeps both tokens. Estimated consumer-side delta:
    −10 to −18 KB gzipped on the speedtest entry chunk after re-link
    (A5 §3 Split 6).

### TEST

-   **18 new `cn.test.ts` cases** (5 variadic + clsx normalisation,
    13 conflict-pair last-wins) at `src/utils/__tests__/cn.test.ts`.
    Suite total moves from 322/322 (W2 close) to 340/340.

### CHORE

-   `package.json`: `tailwind-merge` removed from `peerDependencies` +
    `devDependencies`; `clsx` retained.
-   `vite.library.ts`: `tailwind-merge` removed from `libraryExternal`.

## v0.9.1 — 2026-05-08

W.W2 patch — ScrollingText lift + freshness-gate substrate + Section
storybook + opportunistic StorySection migration sweep. Six glass-ui
commits + two cross-repo commits (keyframes.js + value.js) close the
post-V drift surfaced by audit A3.

### NEW

-   **`<ScrollingText>` overflow-marquee primitive** lifted from the
    speedtest consumer per A3 §3.1. Subpath: `@mkbabb/glass-ui/scrolling-text`.
    Mirrors the typewriter / pulse / status-dot custom-composite shape.
    Test coverage: 3 vitest cases against the `data-overflows` boolean
    threshold (delta > 1 px).
-   **`<Section>` storybook entry** at `demo/stories/primitives/section.vue`
    closes the V.W3.T7 unification primitive's missing demo (A3 §5.1).
    Exercises tone (heading · title · subheading · label) × gap (tight ·
    regular · loose) plus the custom header slot.
-   **`<ScrollingText>` storybook entry** at `demo/stories/data/scrolling-text.vue`
    shows the overflow threshold across narrow / mid / wide hosts using
    long IPv6 + org-name samples.

### INFRASTRUCTURE

-   **`scripts/freshness-gate.mjs` + `prebuild` hook** close the V.W8
    stale-dist drift class per A3 §4.3 / V.FINAL.md:104-106. Strict-mode
    invocation (CI / hard-gate) exits 1 when newest src mtime exceeds
    `dist/glass-ui.js` or `dist/index.d.ts`. `--pre` permissive mode warns
    and exits 0 so the upcoming `vite build` can rebuild without the gate
    blocking it.
-   **`prepare: test -f dist/glass-ui.js || npm run build`** lifecycle hook
    (npm-canonical build-on-install path).
-   **`assertDistFresh()` helper** exported from `@mkbabb/glass-ui/freshness`
    for downstream `vite.config.ts` consumer wiring (W3 wires speedtest;
    W2 ships the helper alone). 1 vitest sanity case in
    `scripts/__tests__/freshness-gate.test.ts`.
-   **`@types/node` + tsconfig `types: ["vite/client", "node"]`** added so
    the freshness module typechecks. `node:fs` / `node:path` / `node:url`
    added to vite's `libraryExternal` list (Node-only consumer helper —
    must not be bundled into the browser ESM output).
-   **Cross-repo prebuild gate** mirrors land at `keyframes.js@<HEAD>`
    (branch `w.w2.1-keyframes-prebuild`, scripts/freshness-gate.mjs +
    `prebuild` script — `prepare` already present) and `value.js@<HEAD>`
    (branch `w.w2.1-value-js-prebuild`, scripts/freshness-gate.mjs +
    `prebuild` + `prepare`). Per A3 §4.4 same-bug-class. Version bumps +
    publish ceremonies are owned by W5.T1 (value.js) / W5.T2 (keyframes.js).

### MIGRATIONS

-   **StorySection sweep** — opportunistic mechanical migration of 16
    `<section class="flex flex-col gap-3"><p class="section-label">…</p>`
    pairs onto `<StorySection :label="…">` across 5 stories:
    `feedback/progress.vue` (4 sites), `feedback/skeleton.vue` (3),
    `primitives/pulse.vue` (4), `primitives/status-dot.vue` (2),
    `primitives/separator.vue` (4 top-level; nested label-paragraphs
    inside the 4th section's sub-divs left as-is — those are inner-row
    labels, not section heads). Bound by W2.md §Format budget; further
    sites roll forward to the next opportunistic touch.

### CONSUMER MIGRATION (speedtest)

-   `src/components/AppSettingsButton.vue:81` rewrites
    `import ScrollingText from "@src/components/ScrollingText.vue"` →
    `import { ScrollingText } from "@mkbabb/glass-ui"` (named import —
    ScrollingText now ships from the root barrel + `/scrolling-text`
    subpath). Deletes `src/components/ScrollingText.vue` (115 LOC).
    Five template-level call-sites unchanged.

## v0.9.0 — 2026-05-08

The V-tranche bundled release — V.W2 foundation polish + V.W3 structural
unions + V.W4 storybook + composables expansion. Consolidates twenty-plus
load-bearing patches surfaced by the 14-agent W0 audit cohort and the
R-tranche refining synthesis.

### Foundation polish (V.W2)

-   **Icon-size tokens minted** — `--icon-2xl: 2rem`, `--icon-3xl: 2.5rem`,
    `--icon-hero: 3.5rem` complete the icon-size rung set; `theme.css`
    bridges the new tokens through `@theme` so consumers compose
    `size-icon-2xl`, `size-icon-3xl`, `size-icon-hero` Tailwind utilities.
-   **`--z-behind: -10`** — Aurora background-tier z-index for elements
    that intentionally render below the document flow.
-   **Notification + Slider canonical glass-blur** — both primitives adopt
    the canonical per-tier glass-blur tokens.
-   **Notification + Toast canonical tier shadows** — retire literal
    `shadow-lg` overrides in favour of the canonical tier-shadow tokens.
-   **Card + Label titles** → typography ladder (admin-label / display-N).
-   **Avatar / Badge / Button / Toggle radius sweep** — remaining raw
    radius literals migrate onto the `--radius-*` token rungs.
-   **Resource hints + .browserslistrc floor** — `<link rel="preconnect">`
    for `api.fontshare.com` lands in the demo shell; `.browserslistrc`
    declares the canonical baseline.
-   **`.gold-shimmer` PRM bracket** — wraps the slide animation in a
    `prefers-reduced-motion: no-preference` bracket per R1 §3 + R4 §5.1.

### Structural unions (V.W3)

-   **`<ModalOverlay>` collapses 3 scrim declarations onto a shared SFC** —
    AlertDialogOverlay + DialogOverlay + SheetOverlay compose the new
    primitive reading `--overlay-scrim` (with `tier='strong'` for the
    destructive variant).
-   **`menuItemVariants` CVA collapses 9 primitives** — DropdownMenuItem,
    ContextMenuItem, SelectItem, ComboboxItem, CommandItem and their
    Sub variants share a single CVA recipe with `data-[disabled]`,
    `data-[highlighted]`, and `data-[state=checked]` branches.
-   **`.popover-content` utility** — collapses 2 W1-survivor popover hosts
    onto a single shared utility.
-   **`<LabeledField>` parent SFC + `.labeled-field-label` utility** —
    the four labeled-field wrappers (Input / Select / Slider / Switch)
    now compose a single parent that owns the IconTooltip + label
    layer; the four wrappers stay as 3-line forwarders for back-compat.
-   **`<Section>` sectioning primitive over the typography ladder** —
    semantic sectioning host that paints the canonical
    `text-display-N`/`text-title`/`text-prose` typography pairings.
-   **Active-state vocabulary canon** — BouncyToggle + UnderlineTabs adopt
    `aria-pressed` / `data-active` per R4 §2.4 reconcile.
-   **Density-rail unification** — GlassDock + DockGroup + MetricPill
    unify on `data-density` attribute + a CVA-driven density token set
    (StackedIconGroup intentionally excluded per B5 §2.1 — size-axis only).
-   **Popover-animation grammar** — `popover-animate` + `slide-in-from-side`
    standardised on `@utility`; HoverPopover + the floating-panel host
    unify on the canon.
-   **Surface-tint tier aliases** — `--surface-tint-quiet/floating/modal`
    bridge the 9-rung numeric scale into named tiers consumed by
    component-level styles.

### Storybook + composables expansion (V.W4)

-   **5 chassis primitives** — `<StorySection>`, `<ShowcaseFrame>`,
    `<DockShowcaseFrame>`, `<TokenLadder>`, `<ToneSwatch>` collapse the
    ~233-site demo-host duplication. `<ShowcaseFrame>` carries a 5-rung
    `pad` knob (xs=p-3 / sm=p-4 / md=p-5 / lg=p-6 / xl=p-10) including
    the p-4 most-frequent close-variant.
-   **`useStoryDemo` composable** — canonical play / reset / status
    harness for storybook demos. Mirrors `useStagger`'s timer-set
    discipline: cleanup callbacks registered inside the play handler
    fire on `reset()` AND `onScopeDispose`. Async-aware. Generic over
    the live-state shape.
-   **9 missing primitive entries** — configurator, controls/DarkModeToggle,
    expandable-container, icon-tooltip, labeled-field, paper-backdrop,
    stacked-icons, toggle-chip, glass-panel.
-   **Toaster.vue story** — the `ui/toast/Toaster.vue` drop-in primitive
    that consumers (the speedtest, the demo itself) compose at the layout
    root. Per B4 §3.3 — A4 missed `ui/`-orphan primitives.
-   **Badge `success | warning | info` variants demo** — the v0.8.6 CVA
    branches gain a dedicated `semantic tones` row in the badge story.
-   **23 composable storybook entries** — useGlobalDark (with singleton
    invariant demo per B4 §3.5), useKeyboardShortcuts (registerShortcut
    -   useRegisteredShortcuts pair), useResizeObserver, useGlassRenderer,
        useAnimatedNumber, useDarkModeSync, useIntersectionPause, useRAFLoop,
        useScrollProgress, useSpringOrchestrator, useStaggerReveal,
        useOffsetPagination, useVirtualSectionWindow, useWindowedStore,
        useSortable, useScrollTracker, useSidebarFollow, useSidebarState,
        useTreeIndex, useTouchGate, useTimer, useInterval, useInfiniteScroll,
        plus the new useStoryDemo entry. Per R4 §4.3 — all 23 are publicly
        exported (no internal-only composables in the cohort).
-   **3 token-tour foundation pages** — Surface Tints (9-rung tint scale +
    V.W3 tier aliases), Overlays & Scrims (three scrim weights + motion
    -   lift offsets), Chart & Chassis Palette (chart aliases + chassis-tier
        opacities + specular tokens; resolves the pre-V `--viz-topology` /
        `--viz-recursion` non-existent token references).
-   **Toast story tone migration** — retires raw `bg-emerald-*` /
    `bg-amber-*` / `bg-red-*` Tailwind ladders for the canonical
    `--success` / `--warning` / `--destructive` token plates.
-   **Storybook smoke gate** — `tests/stories.smoke.spec.ts` asserts every
    manifest entry resolves to a valid component (no MissingStory
    placeholder), catching manifest-vs-file drift in the existing test
    suite.

### Test surface

-   24 test files / 311 tests pass (was 22 / 301 at v0.8.6 baseline).
-   New: `useStoryDemo.spec.ts` (6 tests covering cleanup-on-reset,
    cleanup-on-unmount, state-resets-to-initial, sync-status-cycle,
    async-status-cycle, no-op-without-handler).
-   New: `stories.smoke.spec.ts` (4 tests over the manifest).

### Migration notes

-   Consumers of `<DialogOverlay>` / `<SheetOverlay>` / `<AlertDialogOverlay>`
    see no API changes — these primitives now compose the new
    `<ModalOverlay>` internally.
-   `<LabeledInput|Select|Slider|Switch>` consumers see no API changes —
    the four wrappers now forward to the new `<LabeledField>` parent.
-   Demo-side authors should compose the new `<StorySection>` and
    `<ShowcaseFrame>` primitives in new stories; existing stories will
    migrate progressively in a future cleanup pass.

## v0.8.6 — 2026-05-07

The U-tranche W1 cohort — fifteen load-bearing patches surfaced by the
14-agent W0 audit (cohorts A through C). Drives the speedtest progress
overflow fix, retires the last v0.7-vocab custom citizen, and lifts
several primitives onto the canon they advertise.

### Composable repairs

-   **`useAnimatedNumber` — progress mode no longer overshoots backward
    through the rail.** Audit U.W0.A5 §1 isolated the smoking gun at line
    87: `clamp: false` for progress mode let `SmoothProgress.currentValue`
    hold a stale 100 across phase boundaries, then damp 100 → 0 when the
    consumer's target dropped to the next phase's first-tick value. The
    composable now keeps the underlying smoother in `[0, 1]` and scales
    at the consumer-facing boundary, so the smoother's internal clamp is
    the exact mirror of the `[0, 100]` external contract.
-   **`useStagger` — `prefers-reduced-motion` short-circuit.** Per audit
    A5 §"library gaps", the timer cascade ran unconditionally. The
    composable now defaults to honouring `prefers-reduced-motion: reduce`
    with a synchronous flush of every reveal slot. Opt out via
    `respectReducedMotion: false`.

### Primitive repairs

-   **`GlassPanel` — retired-tier migration (v0.7 → v0.8 5-rung ladder).**
    Audit C-b axis 4 #21. The last custom citizen still shipping
    `default | medium | elevated` migrates to
    `wash | quiet | resting | floating | overlay`. Default is now `resting`
    (matches the prior `default → glass-resting` resolution exactly).
    Scoped fallback CSS adopts canonical `--glass-bg-{wash,floating}` and
    `--glass-border-floating` handles instead of raw `color-mix(--card N%, ...)`.
-   **Popover-class `shadow-md` retire (7 components).** Audit C-a §1 +
    §5.2 / U10. PopoverContent, SelectContent, ComboboxList,
    ContextMenu{,Sub}Content, DialogContent (`shadow-xl`), CommandDialog
    (`shadow-lg`) all double-stacked Tailwind shadow utilities atop
    `.glass-floating`, clobbering the canonical `--glass-shadow-floating`.
    The literal shadow drops; the canon paints.
-   **`ContextMenu*Content` — drop opaque `bg-popover` over glass-floating.**
    Audit C-a §2.2 / §gap.10. The opaque `bg-popover` declaration negated
    the `glass-floating` translucent background.
-   **Notification — status-color foreground tokens.** Audit C-a §1.4 /
    §7.2 / §gap.5 (and U11). The four-row variant map now consumes
    `text-{success,warning,info,destructive}-foreground` instead of
    baking `text-white` (which misread against the luminous amber plate
    particularly).
-   **`Button.glass` — canonical `.glass-wash` composition.** Audit C-a
    §2.1. The variant re-implemented `.glass-wash` inline AND mixed tiers
    (bg-wash + border-quiet — self-contradictory). Compresses onto the
    canonical class.
-   **`Sheet` — canonical `.sheet-animate` adoption.** Audit C-a §2.3 /
    §7. The `sheet-animate` utility was authored explicitly for Sheet
    but bypassed via raw `data-[state]:duration-300/-500`.
-   **`Badge` — `success | warning | info` variants.** Audit B-b
    §"glass-ui gaps". The semantic-colour CVA branches now compose the
    canonical `--success / --warning / --info` plates with their
    `--*-foreground` glyph counterparts.
-   **`DarkModeToggle` — focus-visible affordance.** Audit C-b axis 3
    #16. Composes `focus-ring` so keyboard navigation paints
    `--focus-ring-shadow` over the pill geometry.

### Foundation repairs

-   **Typography ladder dedup — `--type-leading-*` / `--type-tracking-*`
    canonical.** Audit C-c §1.1 / Union 2 (and U13). `typography.css`
    declared duplicate `--leading-*` / `--tracking-*` tokens with the
    same numeric values as the canonical `--type-*` rungs. Retires the
    duplicates and migrates every in-file `@utility text-*` consumer to
    the `--type-*` form. theme.css continues to bridge the
    `--leading-*` / `--tracking-*` Tailwind utilities through the canon.
-   **Cartoon-shadow dual-system collapse.** Audit C-c §1.3 / Union 1
    (and U14). The token-driven `--shadow-cartoon-{sm,md,lg}` rungs
    (auto-darking via `--shadow-color`) were silently shadowed at every
    consumer site by the `utilities.css` `.shadow-cartoon-*` class set
    reading raw `--shadow-cartoon-color{,-soft}` literals (pure
    black/white). The utility-class shadows now consume the token rungs;
    the bezel border + translateY stamp geometry stays.
-   **`metric-badge` + `input-bar` adopt the canonical glass tier.**
    Audit C-c §7.2. Both utilities painted raw
    `color-mix(--card N%, transparent)` plates with hand-rolled
    `backdrop-filter` — bypassing the 5-tier ladder and silently
    no-op'ing the PRT / no-backdrop-filter fallbacks. metric-badge now
    composes `--glass-bg-quiet` (rest) → `--glass-bg-resting` (hover);
    input-bar composes `--glass-bg-floating` + `--glass-blur-floating`.
-   **`--opacity-disabled` Tailwind bridge + sweep.** Audit C-a §1.2 /
    §gap.4 / U12. theme.css adds the `--opacity-disabled` (0.5) and
    `--opacity-icon-muted` (0.8) bridges so consumers compose
    `disabled:opacity-disabled` instead of literal `disabled:opacity-50`.
    The 11 ui/ + custom/ sites that hardcoded the literal — plus the
    Button base composing the arbitrary `disabled:opacity-[var(--opacity-disabled)]`
    form — sweep onto the canonical utility.

### Demo

-   **`foundations/paper-glass.vue` — 5-tier completion + retired-vocab
    fix.** Audit C-d §4.2 / §1.1. Adds the missing `overlay` tier to the
    ladder enumeration; migrates the embedded `GlassPanelVariant` type
    to the v0.8 vocabulary; swaps the invalid `--viz-topology` /
    `--viz-recursion` accents for declared `--viz-{chebyshev,fourier}`.

### Verification

-   `npm run typecheck` exit 0
-   `npm run build` exit 0
-   `npm test` 291/291 (was 288/288; +3 regression tests across
    `useAnimatedNumber` and `useStagger`)
-   `dist/index.d.ts` re-exported with the v0.8.6 surface

## v0.8.5 — 2026-05-07

### Fix — backdrop-filter Lightning CSS dedup

The W2-W6 stacked surface ladder authored both unprefixed `backdrop-filter` and the legacy `-webkit-backdrop-filter` declaration on every glass-tier rule. Lightning CSS in the consumer's Tailwind v4 pipeline deduped the pair and kept the **prefixed** form only — modern Chromium then dropped that legacy alias from the CSSOM, leaving every `.glass-{wash,quiet,resting,floating,overlay}` rule **without** an applied `backdrop-filter` at runtime.

Live evidence captured at `https://speedtest.friday.institute/`:

-   `.glass-resting` rule shipped with `-webkit-backdrop-filter: var(--glass-blur-resting)`
-   `getComputedStyle(card).backdropFilter === "none"` and `.webkitBackdropFilter === "none"`
-   The translucent fill survived (still consuming `--glass-bg-resting`); only the 12px blur was missing

Fix: drop the manual `-webkit-backdrop-filter` from every glass-tier rule in `src/styles/{glass,floating-panel,dock,hover-popover,instrument-chassis,dock-group,utilities}.css`. Single-source-of-truth authoring lets Lightning CSS / autoprefixer emit the legacy form when browserslist requires it.

The `@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)))` feature-detection check at `glass.css:267` keeps both form names in its parenthesised support-query (a feature-name reference, not a declaration; safe).

Files swept:

-   `src/styles/glass.css` (8 paired declarations across the 5-rung ladder + `.glass-card` + `.glass-cartoon`)
-   `src/styles/floating-panel.css`
-   `src/styles/dock.css`
-   `src/styles/hover-popover.css`
-   `src/styles/instrument-chassis.css`
-   `src/styles/dock-group.css`
-   `src/styles/utilities.css`

## v0.8.4 — 2026-05-07

Composable promotion — three patterns the speedtest consumer carried inline now land in the library so any consumer reaches them through one import. Tranche T audit F-architectural-gestalt §"Library gaps" wave W6.

### `useTokenColor`

-   New composable at `src/composables/useTokenColor.ts`. Reads a CSS custom property as a reactive `Ref<string>` and re-resolves on dark-mode transitions via `useGlobalDark`. Replaces the ad-hoc `getComputedStyle(html).getPropertyValue("--xxx")` reads scattered across canvas + Aurora consumers (the `useMeterRenderer.ts:84-85` pattern).
-   Accepts a `MaybeRefOrGetter<string>` token name (so consumers can swap `--accent-warm` ↔ `--accent-cool` reactively), an optional element-scoped resolve target, and a fallback for SSR / unset properties.
-   The reactive seam lives at the cascade root: CSS custom properties don't fire change events on the platform, so the composable tracks `useGlobalDark`'s ref + exposes a `refresh()` knob for manual cascade mutations.

### `useStagger`

-   New composable at `src/composables/useStagger.ts`. One-shot staggered reveal-flag array — `revealed.value[i]` flips true at `initialDelayMs + i * delayMs`. Replaces hand-rolled `setTimeout` cascades (the climax row-tint sweep at speedtest's `SpeedtestResults.vue:251-267` is the source pattern).
-   Distinct from the existing `useStaggerReveal`: that one gates on IntersectionObserver thresholds for entrance choreography; this one fires on a pure timer for unconditional cascades. The two compose.
-   Each timeout handle is tracked in a `Set<TimeoutHandle>`; both `reset()` and the `onScopeDispose` hook drain the set so no orphan callbacks fire after dispose.

### `useAnimatedNumberMap`

-   New composable at `src/composables/motion/useAnimatedNumberMap.ts`. Wraps `useAnimatedNumber` per key into a single `Record<K, ComputedRef<number | null>>`. Replaces the static N-up fan-out where consumers declare four `useAnimatedNumber` instances side by side (the `MetricPillCluster.vue:125-134` pattern, post-W4 internalised inside `useMetricResult`).
-   The library gap: `useAnimatedNumber` cannot run inside a `v-for` because the surrounding reactive scope is the wrong owner. The fan-out had to be static. This composable lifts that fan-out behind one call.
-   Null propagation is preserved: when a source resolves to null, the corresponding ref returns null rather than freezing on the last smoothed sample.

### Storybook

-   New "Composables" category in the demo manifest with three entries: `use-token-color`, `use-stagger`, `use-animated-number-map`. Each shows the composable's contract with a live interaction.

### Verification

-   `npm run typecheck` exit 0
-   `npm run build` exit 0
-   `npm test` 288/288 (was 276/276; +12 new tests across the three composables)
-   `dist/index.d.ts` carries `useTokenColor`, `useStagger`, `useAnimatedNumberMap` exports

## v0.8.3 — 2026-05-06

The library uplift the speedtest stacked-pill directive needs. Three additions land together: a container-query host knob on `<GlassDock>`, a 2-row refinement of `<MetricBadge labelPosition="stacked">`, and a new `<MetricPill>` primitive that bakes the stacked-pill defaults into a thin composition over MetricBadge. Tranche T audit B-dock-pill-cluster wave W2.

### `<GlassDock>` containerName prop

-   New optional `containerName?: string`. When set, the dock root emits inline `container-type: inline-size; container-name: <value>; overflow: visible` plus a `data-container-name` structural marker.
-   The base `overflow: hidden` shell gates on `:not([data-container-name])` so non-host docks keep the default clip — a backward-compatible extension. Consumers query the named container via `@container <value> (...)` rules without wrapping the dock in a sibling subject.
-   Lifts the container subject onto the primitive (the audit-B §1.3 gestalt move). CSS Containment L3 §3.2: a container subject must be a peer or ancestor of the dock, never an interior descendant whose intrinsic size the dock relies on.

### `<MetricBadge labelPosition="stacked">` 2-row refinement

-   Template wraps `<span class="metric-badge__amount">` + `<span class="metric-badge__unit">` in a single `<span class="metric-badge__row">` when stacked. Layout becomes 2 rows: row 1 label/abbreviation, row 2 amount + unit baseline-aligned via `display: inline-flex; align-items: baseline; gap: 0.25rem`.
-   The pre-T 3-row layout (label / amount / unit on three separate rows) was the bug, not the contract — users reasonably expect the value+unit pair to read together as a single quantity. The inline branch keeps the flat sibling order so the single-row baseline reads unbroken.
-   Two new tokens land in `tokens.css`: `--metric-badge-min-height-stacked: 2.625rem` and `--metric-badge-padding-block-stacked: 0.375rem`. The stacked variant consumes both so the taller register has breathing room above the baseline pair.
-   Existing consumers are zero — the refinement is safe.

### New `<MetricPill>` primitive

-   Lives at `src/components/ui/metric-pill/MetricPill.vue`. Composition-only over `<MetricBadge>` with `labelPosition="stacked"` + `density="spacious"` + `size="lg"` baked in. Same prop surface (label, abbreviation, amount, unit, color, size, density, placeholder, class), but stacked-pill defaults pre-applied.
-   The `density` prop is the dock-tier knob lifted onto the pill: `spacious` (default) widens block padding for chassis-strip rhythm; `comfortable` keeps the tighter compact register where pills nest in a denser dock. The CSS modifier (`.metric-pill--density-{value}`) adjusts the local metric-badge padding tokens; the underlying badge stays unchanged.
-   Storybook entry at `demo/stories/primitives/metric-pill.vue` shows the size ladder, density toggle, the GlassDock containerName-host cluster composition, and empty/placeholder rendering.

### Verification

-   `npm run typecheck` exit 0
-   `npm run build` exit 0
-   `npm test` 276/276 (was 269/269; +7 new tests across the three additions)

## v0.8.2 — 2026-05-06

The v0.8.1 dev-pipeline pivot (`development` exports condition + `preserveSymlinks` retire on the speedtest consumer side) exposed glass-ui's source-level alias coupling: `src/` files import via `@utils` and `@/`, and the consumer's vite resolver doesn't know about glass-ui's per-package aliases. Workspace-source consumption requires the source to be self-contained.

### Internal alias sweep

-   Every `import … from "@utils"` (~132 lines) and `import … from "@/X"` (3 sites) under `src/` rewritten to the corresponding relative path. Quote style and trailing punctuation preserved per file.
-   `tests/` and `demo/` swept the same way (105 files) so the demo dev server and the vitest suite stop depending on alias substitution.
-   `vite.library.ts` retires `libraryAliases()`; `vite.config.ts` and `vite.iter.config.ts` drop their `resolve.alias` blocks. `vitest.config.ts` drops its `@`/`@utils` aliases.
-   `tsconfig.json` `paths` cleared of `@/*`, `@utils`, `@utils/*`.

Glass-ui source now compiles standalone for any consumer (workspace symlink under `development`, `node_modules` `dist` under `import`, future SSR runtime). The speedtest consumer's 210/210 client-test baseline is preserved through the workspace symlink without any speedtest-side resolver shim.

### Verification

-   `grep -c '@utils\|from "@/' src/` → 0
-   `npm run build` exit 0
-   `npm test` 269/269 green
-   speedtest `npm run test:run:client` 210/210 green

## v0.8.1 — 2026-05-06

Bundles the `862c1e7` MetricBadge dual-slot back-compat fix (adjacent-sibling selector that hides `--abbr` only when paired with `--full`) and corrects the v0.8.0 release-commit oversight: the `package.json` version bump 0.7.3 → 0.8.0 was lost between `git add` and `git commit` at v0.8.0's release commit `28b79b3`, so the workspace symlink continued resolving to v0.7.3 even though every artefact downstream claimed 0.8.0. v0.8.1 ships the bump as 0.7.3 → 0.8.1 (the v0.8.0 tag stays archival).

### Workspace dev-pipeline

-   `exports.<subpath>.development = "./src/<entry>.ts"` added across all 33 object-shaped entries. Dev-mode consumers reading the workspace symlink resolve directly to source, so HMR and symbol changes surface without a manual `dist` rebuild. The `import` condition keeps pointing at the production-built `dist/<entry>.js`, so package-published consumers are unaffected.

### Bundled

-   Every commit between `28b79b3` (v0.8.0) and the v0.8.1 release commit, including the `862c1e7` adjacent-sibling MetricBadge fix and the tranche-J library work that landed in the interim (`tranche-j/w0` through `tranche-j/w7`).

## v0.8.0 — 2026-05-06

The bundled glass-tier ladder rename + Card API redesign + dual-slot MetricBadge + canon retire. One breaking-change release per `feedback_architectural_approach.md`'s "no quick fixes, no parallel codepaths" edict; speedtest is the live consumer driving the lift.

### Breaking changes

-   **Glass-tier ladder renamed** — the four-rung `subtle / default / medium / elevated` ladder retires in favour of the five-rung `wash / quiet / resting / floating / overlay` canon. `quiet` is a new mid-low rung; `overlay` is a new modal-over-modal rung. Mapping for upstream migrations:

    | Pre-v0.8         | Post-v0.8        | Note                                                 |
    | ---------------- | ---------------- | ---------------------------------------------------- |
    | `glass-subtle`   | `glass-wash`     | lightest                                             |
    | `glass-default`  | `glass-resting`  | (no direct prior — `default` was the canonical tier) |
    | `glass-medium`   | `glass-resting`  | collision into the canonical tier                    |
    | `glass-elevated` | `glass-floating` | popover-class surfaces                               |
    | _(none)_         | `glass-overlay`  | NEW — modal-over-modal                               |

    Same renames apply to `--glass-{bg,blur,border,shadow}-{tier}` token families and to the Tailwind v4 `--{shadow,blur}-glass-{tier}` bridges in `theme.css`. **No legacy aliases ship.**

-   **`<Card>` API redesigned**. The `variant="subtle | default | pane | cartoon"` enum retires. The new shape:

    ```ts
    interface CardProps {
        tier?: "wash" | "quiet" | "resting" | "floating" | "overlay"; // default 'resting'
        shadow?: boolean; // default true
        grain?: boolean; // default true
        as?: string; // default 'div' — polymorphic root via reka-ui Primitive
        asChild?: boolean;
        class?: HTMLAttributes["class"];
    }
    ```

    Migration codemod for callers:

    ```vue
    <!-- v0.7 -->                                      <!-- v0.8 -->
    <!-- v0.7 -->                                      <!-- v0.8 -->
    <Card variant="default">                          → <Card>
    <Card variant="medium">                           → <Card tier="resting">
    <Card variant="elevated">                         → <Card tier="floating">
    <Card variant="subtle">                           → <Card tier="wash">
    <Card variant="pane" class="overflow-hidden">    → <ScrollPane class="overflow-hidden">
    <Card variant="cartoon">                          → <CartoonCard>
    ```

-   **`<ScrollPane>` and `<CartoonCard>` sibling primitives** ship at `src/components/ui/scroll-pane/` and `src/components/ui/cartoon-card/`. They lift the `pane` and `cartoon` register out of `Card`'s variant ladder. `<ScrollPane>` is `glass-wash` + `overflow:auto` + `scrollbar-hidden` + grain disabled. `<CartoonCard>` resolves through `.glass-cartoon`.

-   **Library popover family migrated**. `TooltipContent`, `HoverCardContent`, `DropdownMenuContent`, `DropdownMenuSubContent`, `DialogContent`, `ContextMenuContent`, `ContextMenuSubContent`, `PopoverContent`, `SelectContent`, `SheetContent`, `GlassPanel` — every popover-class surface that hard-coded `glass-elevated` now hard-codes `glass-floating`. Consumer-side tier overrides fall through.

-   **`Button` `glass-subtle` variant renamed to `glass-wash`**. Same surface, new name to align with the canon.

-   **`--shadow-card` canon** routed to `var(--shadow-md)` (soft-Gaussian drop). The cartoon offset stamp lives only at `--shadow-cartoon` and is consumed by `.glass-cartoon` + `<CartoonCard>`.

### Additions

-   **Dual-slot `<MetricBadge>`** — passing `label` AND `abbreviation` together renders both as sibling spans (`metric-badge__label--full` + `metric-badge__label--abbr`). Default visibility shows `--full`; the consumer toggles via container query (the speedtest consumer in S.W3 does this with `@container pill-cluster (max-width: 600px)`). Single-slot use stays back-compat.

-   **`.metric-badge__label` letter-spacing canon**: 0.18em on md/lg/xl tiers, 0.10em on sm tier (was 0.05em / 0.025em).

-   **`<DockTabButton>` density-keyed height tokens** — new `--dock-tab-h-{compact|comfortable|audacious}` token family analogous to `<DockIconButton>`'s height token. Compact value 32 px.

-   **`--dock-label-size` mobile carve** — density-audacious mobile media-query introduces `--dock-label-size` (16 px at <480, 14 px at 480–719) consumed by dock label spans.

-   **Storybook stories** — new `demo/stories/primitives/{card,scroll-pane,cartoon-card}.vue` walk the redesigned API; `demo/stories/primitives/metric-badge.vue` extended with a dual-slot example. Legacy `demo/stories/containers/card.vue` retired.

### Internal

-   The reka-ui `Primitive` import lands on `<Card>`, `<ScrollPane>`, `<CartoonCard>` — polymorphic-root + slot-binding contracts come standard.
-   `cn(tierClass, props.class)` is the single class-merge seam on `<Card>`. No JS-side ladder duplicating the CSS-side ladder.

### Migration impact

Speedtest (the live consumer) migrates in S.W4 (this same wave). One workspace package; one same-wave bump; no feature flag.
