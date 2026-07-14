// @mkbabb/glass-ui/api — canonical public types + constants discovery layer.
//
// This subpath is the pure-types/constants discovery surface for glass-ui's
// canonical public shapes. It re-exports from each canonical home — never
// declares its own types — so a consumer can write:
//
//     import type { AuroraConfig, ButtonVariants } from "@mkbabb/glass-ui/api";
//     import { MAX_NUCLEI, DEFAULT_AURORA_CONFIG } from "@mkbabb/glass-ui/api";
//
// without dragging Vue runtime or component implementations into their build.
//
// Scope criteria — what rides this discovery layer:
//
//   - Re-export only types/constants that are ALREADY on the canonical public
//     surface (i.e. exported from a package's `index.ts` or named-subpath barrel).
//   - Variant-prop types (`*Variants`) for the four-state component contract.
//   - Domain shapes that consumers type fixtures + presets against (Aurora,
//     Configurator).
//   - Semantic surface enums (`CardTier`, `InstrumentChassisPhase`).
//   - Aurora numeric ceilings + default config (consumers building presets).
//
// NOT in scope (defer to component-specific subpaths):
//
//   - Composable option/return types EXCEPT canonical return-shape interfaces
//     (`ConfiguratorState`, `SidebarState`, `FuzzySearchState`) which consumers
//     pin against when typing component wrappers or fixtures.
//   - Carousel domain types — vueuse-bearing per-subpath only.
//   - Dock orientation/state — component-internal; not on public surface.

// ── Aurora constants ─────────────────────────────────────────────────────────
// The aurora numeric ceilings + default config (consumers building presets). The
// aurora TYPE re-exports (AuroraConfig/AuroraAtoms/… + the Configurator + Timeline
// type groups) ride the carved api/types-extra sibling (the no-god-module bound);
// these VALUE exports stay here (a `export type *` re-join cannot carry a value).
export {
    DEFAULT_AURORA_CONFIG,
    // BA.W-ATLAS-RECONCILE A-4a (d6 9467bd16 adopt) — the library-canon
    // recessive-ground crayon calibration partial (spread over a consumer's
    // pole-derived pigment for a paper-on-tooth data-ground aurora).
    PAPER_WASH_GROUND,
    MAX_NUCLEI,
    MAX_STOPS,
} from "../components/custom/aurora";

// ── Surface enums ──────────────────────────────────────────────────────────
// Semantic enums that recur across consumer code paths (typed prop values,
// switch dispatch, preset descriptors). `CardTier` is the 5-rung glass-ladder
// surface vocabulary (wash/quiet/resting/floating/overlay) a consumer types its
// `tier` prop against; `CardSurface` is the orthogonal decoration register
// (`glass` | `cartoon` | `veil` — R5-7 added the borderless/rimless text-plate).
export type { CardTier, CardSurface } from "../components/ui/card";
// `CardVariant` is the BC.W-SELECTION-CARD decoration axis (`"selection"` — the I5
// selection card, the ONE new Atlas component); `CardMetal` is the earned
// selected-rim quad (`"gold" | "silver" | "bronze"`). A consumer types its
// `<Card variant="selection" :metal>` preview-grid against these (the Atlas I5 grid
// re-points its hand-rolled accent threading onto the published `--glass-accent` seam
// on its `^4.x` bump).
export type { CardVariant, CardMetal } from "../components/ui/card";
// BB.W-SCROLL-CARD — the first-class scroll-shrink card family prop types. A
// consumer types `<ScrollCard :max-height>` / `<ScrollCardHeader :sticky>`
// against these; the family ships in the same `card` chunk + `/card` subpath.
export type { ScrollCardProps, ScrollCardHeaderProps } from "../components/ui/card";
// `Surface` is the SHARED {glass·veil·opaque} surface-decoration axis
// (BA.W-SURFACE-AXIS) — the ONE three-rung register every content/floating
// surface (Card/GlassPanel/Dialog/Sheet/Drawer/Popover/Command/Expandable/
// Skeleton) threads via `surfaceClass`. Distinct from `CardSurface` (Card's
// own superset, which adds the Card-local `cartoon` decoration member). A
// consumer types `<Sheet surface="opaque">` / `<Popover surface="veil">`
// against `Surface`; the discovery layer publishes the union.
export type { Surface } from "../components/ui/_shared";
// BH.W-AXIS-GRAMMAR — the 5-rung glass-ladder surface vocabulary is `SurfaceTier`
// (the ONE grammar home, `_shared/axes.ts`). `GlassPanelVariant` was value-
// identical to it and is DELETED (the tier homonym kill, clean break); GlassPanel
// now types its visual-rung prop `tier: SurfaceTier`. The four grammar axes
// (Size/Orientation/Motion/Surface) publish via the `/axes` subpath.
export type { SurfaceTier } from "../components/ui/_shared";
// BI.W-SURFACE-EXTRACT — the extracted bare (tier × decoration) glass plate
// primitive. `SurfaceProps` is the prop shape of `<Surface>` (`tier`/`surface`/
// `deep`/`shadow`/`grain` over the ONE `decorationClass` seam) a consumer wrapping
// the plate types against; the component + its `/surface` subpath ship the runtime.
// The `decorationClass` VALUE resolver publishes from `../components/ui/_shared`
// (beside `surfaceClass` — the runtime home; `/api` stays types + constants).
// `CardTier` (published above) collapsed `opaque`/`deep` OUT of the tier union onto
// `surface="opaque"` / the `deep` boolean (clean break — MIGRATION row).
export type { SurfaceProps } from "../components/ui/surface";
export type { InstrumentChassisPhase } from "../components/custom/instrument-chassis";
// BI.W-SYNONYM-RENAMES — `ToastVariant` RETIRED (clean break, no alias). The toast's
// status is the ONE shared `Tone` axis, published via the `/axes` subpath (Tone);
// `variant`/`type` synonyms are DEFINITION-ABSENT from the toast surface (api-lockstep).

// ── HandMark (the hand-voice mark family, BA.W-HANDMARK) ─────────────────────
// The `/handmark` subpath's public surface: the prop model + the flat Brush
// continuum. `GlassUnderline`/`/underline` RETIRED onto `HandMark shape="underline"`
// (DEC-8 outcome 1; clean break, no alias — the editorial draw-on underline is
// `<HandMark shape="underline" animation="draw-on">`, the natural pencil-boil
// morphology the `boil` brush).
export type {
    HandMarkProps,
    HandShape,
    HandAnimation,
    MarkBox,
    Brush,
    BrushName,
    BlendMode,
    TaperSpec,
    InkPath,
} from "../components/custom/handmark";

// ── CVA variant prop types ─────────────────────────────────────────────────
// The per-component `VariantProps`-derived CVA types ride the carved
// api/types-extra sibling (Alert/Avatar/Badge/Button/Sheet/Slider/Toggle/
// ToggleChip — the no-god-module bound). `MenuItemVariants` + `ControlSize` stay
// HERE beside `Surface` (the `_shared` per-surface source gate reads them in
// api/index.ts).
// `MenuItemVariants` — CVA-derived union for the menu/picker item four-state
// contract (command / dropdown-menu / combobox / select). Sourced from `_shared/`
// which is private-to-ui/ at runtime; the barrel exists so `/api` can pin the
// canonical type shape.
export type { MenuItemVariants } from "../components/ui/_shared";
// `MenuTrigger` — BI.W-MENU-TRIGGER. The Menu family's `trigger` axis
// (`click | context`); ContextMenu folded onto DropdownMenu as `trigger="context"`.
export type { MenuTrigger } from "../components/ui/dropdown-menu";
// `ControlSize` — BC.W-CONTROL-CUSTOM. The shared control-size union the input
// register (Input / Switch / Textarea / NumberFieldInput) threads as `size?`.
// Sourced from `_shared/` (the form-family shared home, beside `surfaceClass`);
// a consumer wrapping a control types its `size` against this instead of
// redeclaring the `"sm" | "default" | "lg"` union.
export type { ControlSize } from "../components/ui/_shared";

// ── Sidebar domain ─────────────────────────────────────────────────────────
// Composable-return canon (`SidebarState`) parallels `ConfiguratorState<T>`.
// `SidebarSection` is the row shape; `TreeNode` + `TreeIndexEntry` +
// `SidebarIndexEntry` describe the flat-index lookup; `ScrollTrackerOptions`
// pins the `useSidebarFollow` option shape consumers customise root-margin
// against.
// The three ToC-tracking-family leaf option shapes (BC.W-TOC-RECONCILE):
// `ScrollToOptions` (the rAF-retry scroll-to + treeIndex-aware partial-load),
// `ClickDelegateOptions` (the delegated scroll-target click), and
// `LazyLoaderOptions` (the progressive batch-render count). A consumer typing a
// ToC wrapper / fixture pins these from the discovery layer.
export type {
    ScrollTrackerOptions,
    ScrollToOptions,
    ClickDelegateOptions,
    LazyLoaderOptions,
    SidebarIndexEntry,
    SidebarSection,
    SidebarState,
    TreeIndexEntry,
    TreeNode,
} from "../composables/sidebar";

// ── Virtual-windowing domain — RETIRED (BI.W-VIRTUAL-TRUTH) ──────────────────
// The `/virtual` published subpath and its four re-homed windowing contract
// types (`FlatSection` / `SectionLayout` / `SectionWindowRange` /
// `ForcedSectionWindowRange`) are RETIRED at 5.0.0: zero external binary
// consumers (words ships a byte-divergent local fork) and zero src/ production
// consumers (the mechanism is demo-only). The engine STAYS as an internal,
// demo-consumed composable under `src/composables/virtual/` — reached by
// internal relative import, no longer re-published here or on a subpath. See
// `docs/consumer-evidence/use-virtual-section-window.md`.

// ── Search domain ──────────────────────────────────────────────────────────
// The fuzzy-search input/result/state/option types (SearchableItem / SearchResult
// / FuzzySearchState / UseFuzzySearchOptions / SearchIndex) ride the carved
// api/types-extra sibling. `SearchVariant`/`SearchVariants` (the field-chrome CVA)
// stay HERE for proof:search-custom (see the BC.W-SEARCH-CUSTOM record below).

// ── Props triad ────────────────────────────────────────────────────────────
// BI.W-GLASS-DEDUP — `GlassPanelProps` RETIRED (FAM-10): `<GlassPanel>` owned NO
// distinct mechanism (its tier map ≡ Card's, its surface ≡ the shared resolver, its
// `useGlassRenderer`/`createGlassFilter` JS-canvas feDisplacementMap was a SECOND
// refraction path competing with the ONE `.glass-lens`/`#glass-refract` axis). A
// slotless glass surface needs no component — `<Surface tier surface>` /
// `class="glass-resting"` serves it (clean break, no alias; MIGRATION row).
export type { SpaViewProps } from "../components/custom/spa-view";

// ── Toast / Clipboard / User-invalid / View-Transition ───────────────────────
// The ToastType row shape, the UseClipboard* / UseUserInvalidAria* composable-
// return canons, and the ViewTransition* substrate types ride the carved
// api/types-extra sibling (the no-god-module bound). The toast status is the shared
// `Tone` axis (/axes) — `ToastVariant` is RETIRED (BI.W-SYNONYM-RENAMES).

// ── Carved type-publication extension (BB.W-CARVE5) ───────────────────────────
// The composable-return + motion-curve type re-exports (Count-up animator,
// useDragMorph, useLiquidReveal, useDockCtaReceive, the motion suite + curve
// library) live in ./types-extra to hold this discovery barrel under the
// no-god-module line bound; re-joined here so the /api surface is byte-identical.
export type * from "./types-extra";

// ── HeaderRibbon ───────────────────────────────────────────────────────────
// `HeaderRibbonProps`/`HeaderRibbonPlacement` ride the carved api/types-extra
// sibling (AZ.W-PRUNE2 RESTORE — keyframes.js binds `/header-ribbon` in EditorShell).

// ── Constellation / Fourier field ────────────────────────────────────────────
// The Constellation* (proximity-graph lattice) + FourierField* (epicycle field)
// config/props types ride the carved api/types-extra sibling (the no-god-module
// bound). They ship via the `/constellation` + `/fourier-field` subpaths.

// ── Metric primitives ───────────────────────────────────────────────────────
// The metric-family Props/enum types (MetricBadge* / MetricCell* / MetricStack* /
// MetricRow*) ride the carved api/types-extra sibling (the no-god-module bound).
// The cell/stack families ship via their `/metric-cell` + `/metric-stack`
// subpaths (speedtest consumes them).

// ── PagerDots ────────────────────────────────────────────────────────────────
// `PagerDotsProps` is the Props shape consumers forward when wrapping
// `<PagerDots>` — the ONE position-dot rail register the carousel ships and the
// slides deck adopts (BA.W-PAGER). Ships via its `/pager-dots` subpath.
export type { PagerDotsProps } from "../components/custom/pager-dots";

// ── Deck ──────────────────────────────────────────────────────────────────────
// The full-viewport keyboard-paged aria-live PRESENTATION register (BC.W-DECK),
// DISTINCT from `/carousel`'s embla item-scroller. `DeckCore` is the headless
// state core shape (`index`/`total`/`progress`/`liveMessage` + the moves);
// `DeckMoves` is the minimal move surface the keyboard handler drives; `PagerWindow`
// is the ONE windowing-oracle return shape `<DeckPager>` composes (sourced from the
// single `pager-dots/pagerWindow` leaf — no third fork). Ships via its `/deck`
// subpath (OFF the root barrel — vueuse-FREE + keyframes-FREE on the static graph).
export type { DeckCore, DeckMoves } from "../components/custom/deck";
export type { PagerWindow } from "../components/custom/pager-dots";

// ── Digit / SegmentedTabs primitives ────────────────────────────────────────
// The AnimatedDigit* + SegmentedTabs* (BA.W-TABS) props/variant types ride the
// carved api/types-extra sibling (the no-god-module bound).

// ── StackedIconGroup ───────────────────────────────────────────────────────
// `StackedIconGroupProps<TItem>` rides the carved api/types-extra sibling.

// ── IconChip ─────────────────────────────────────────────────────────────────
// The section-color pop primitive (BA.W-ICON-CHIP) — the ONE color-event
// vehicle. `IconChipProps` is the full contract; `IconChipSection` (the 0..12
// ramp index) + `IconChipTone` (a complete token colour, the MetricCell-iconColor
// reconcile path) + `IconChipIcon` (the permissive lucide glyph type) are the
// public axis types consumers pin against.
export type {
    IconChipProps,
    IconChipSection,
    IconChipTone,
    IconChipIcon,
} from "../components/custom/icon-chip";

// ── Chip / accent-tone (BI.W-CHIP-FOLD; BC.W-ACCENT-TONE) ────────────────────
// The ONE folded chip's public types. `ChipProps` is the `<Chip>` prop contract
// (`shape × tone × surface`); `ChipVariants` is the congruent chip recipe's
// CVA-derived `size × shape` axis (the `selectableChipVariants`/`SelectableChipVariants`
// alias was SWEPT at BG.W-DEAD-SWEEP, the ToggleChip + SelectableChip surfaces FOLDED
// at BI.W-CHIP-FOLD — clean break, no alias). `UseAccentToneOptions`/`UseAccentToneReturn`
// are the contrast-safe-ink composable's option + return shapes (value.js-QUARANTINED —
// the ink solve rides a dynamic `import('./accent-tone-solve')` boundary; the shell types
// are value.js-free). The value.js-bearing runtime values ride `/chip` + the `/color`
// leaf ONLY (OFF the value.js-free root barrel — the SCC-trap discipline); the types
// ride here.
export type { ChipProps, ChipVariants } from "../components/custom/chip";
export type {
    UseAccentToneOptions,
    UseAccentToneReturn,
} from "../composables/color/useAccentTone";

// ── Dock ───────────────────────────────────────────────────────────────────
// `UseDockStateReturn` — canonical composable-return shape paralleling
// `UseClipboardReturn` / `UseAuroraReturn`. Consumers wrapping `<GlassDock>`
// or authoring a custom dock chassis pin against this rather than
// redeclaring the state-machine handle. `UseDockStateOptions` + `DockState`
// ship via the `/dock` subpath barrel only (component-internal arg + state-enum).
export type { UseDockStateReturn } from "../components/custom/dock";
// BI.W-DOCK-CROSSFADE — the thin controlled face-swap primitive's discovery types. The
// controlled-no-rail consumer (speedtest) pins its face descriptor list + the crossfade
// context against these when it composes `<DockCrossfade :active>` directly.
export type {
    DockFaceDescriptor,
    DockFaceRegistration,
    DockCrossfadeContext,
} from "../components/custom/dock";

// ── Paper / Dark / Canvas2D / Text-highlight ─────────────────────────────────
// The PaperBackdrop* props/enum, the UseGlobalDark* / DarkModeSyncScriptOptions /
// DarkFlipSettledCallback dark-ergonomics types, the Canvas2D* lifecycle-substrate
// shapes, and the UseTextHighlightControls / HighlightMatcher types all ride the
// carved api/types-extra sibling (the no-god-module bound). Their runtime values
// live on `/dark` / `/canvas` / `/motion-core` respectively.

// ── SplitChars / useCharStagger (the per-glyph split, BC.W-SPLIT-CHARS) ───────
// `useCharStagger` (the per-glyph split partner to the shipped `.char-stagger`
// CSS) on `/motion-core` + the root barrel. `UseCharStaggerOptions` is the option
// shape (`by` split-unit / `preserveWhitespace` / `writeTotal`); `UseCharStaggerReturn`
// is the `{ split, count }` handle. A consumer wiring its own split surface (a
// hero word) or typing a wrapper pins them here; the runtime value lives on
// `/motion-core` + the root barrel (engine-free). `<SplitChars>` is the component
// face over it.
export type {
    UseCharStaggerOptions,
    UseCharStaggerReturn,
} from "../composables/motion/useCharStagger";

// ── EasingPicker (the boundary-law curve editor) ─────────────────────────────
// The published <EasingPicker>/<EasingConfigurator> curve-authoring family
// (BB.W-EASING-PRIMITIVE — the C-3 fold). `EasingPickerMode` is the two-arm axis
// (`"bezier" | "steps"`); `EasingPickerValue` is the v-model payload (mode + the
// re-parseable css literal + the live value.js callable + raw params); `JumpTerm`
// is the value.js step jump-term family. The boundary law: curve MATH = value.js ·
// playback = keyframes.js · the editor COMPONENT = glass-ui. The value.js-BEARING
// runtime values live ONLY on the `/easing` subpath (NOT the value.js-free root
// barrel — the /motion-curves SCC-trap precedent).
export type {
    EasingPickerMode,
    EasingPickerValue,
    EasingFn,
    BezierPoints,
    JumpTerm,
    UseEasingPickerOptions,
    UseEasingPickerReturn,
} from "../components/custom/easing";

// ── BorderProgress — the `/border-progress` PUBLISHED SUBPATH RETIRED ──────────
// BI.W-BORDER-PROGRESS-RETIRE — the masked-conic border-ring's published subpath
// retires (0 real binary consumers; speedtest hand-rolls its own bar, the "born
// ≥2 by construction" claim was false). The component
// (`src/components/custom/border-progress/`) + its demo STAY, banked dormant OFF
// the public surface (the demo imports the barrel relatively via `@glass/…`). The
// four `BorderProgress*` types no longer re-export off any public barrel — they
// have no owning subpath (see MIGRATION.md "The `/border-progress` subpath
// retirement"). Re-entry = the speedtest `<BorderProgress>` adopt ASK
// re-publishing the subpath in the same cut it consumes the mechanism.

// ── CompletionSeal ────────────────────────────────────────────────────────────
// The hero-scale earned-GOLD completion seal (BC.W-AX-COMPLETION-SEAL) — a one-shot
// gold-draw mark on 4 `@property` motion tokens. `CompletionSealProps` is the
// consume-side shape; `CompletionSealShape` is the glyph axis (`"check" | "ring" |
// "wordmark"`). The ink reads the W-PHASE-PALETTE earned-gold register
// (`--phase-complete-color`/`--color-gold` — Q2: gold is EARNED at completion, never the
// phase spectrum); the glint composes the W-AX-METAL-GLOW catch-light. Ships via its
// `/completion-seal` subpath (OFF the root barrel — a focal opt-in feedback surface).
export type {
    CompletionSealProps,
    CompletionSealShape,
} from "../components/custom/completion-seal";

// ── usePointerVelocityField — the shared viz-pointer-physics field (BB.B4 W-VIZ-POINTER) ──
// `PointerVec2` — a 2-vector in normalized-host space (0..1); `UsePointerVelocityField`
// — the field's return shape ({ position, velocity, acceleration, speed, burst, tick, … });
// `UsePointerVelocityFieldOptions` — its options ({ positionLerp, velocityLerp,
// accelerationLerp, burstDecay, respectReducedMotion }). `usePointerVelocityField` is
// engine-FREE + vueuse-FREE (vue-only), so it ships on the root barrel AND
// `@mkbabb/glass-ui/motion-core`. The viz renderer FEEDS it via its frame `tick(delta)`
// (NO own rAF); under PRM it freezes (`tick(0)`). The booked binary consumers are the
// born-WebGPU viz (W-FLOWFIELD + W-CONCENTRIC).
export type {
    PointerVec2,
    UsePointerVelocityField,
    UsePointerVelocityFieldOptions,
} from "../composables/motion/usePointerVelocityField";

// ── useScrollTrigger — the ONE scroll reader (BC.W-SCROLL-TRIGGER) ─────────────
// `TriggerPoint` — a declared trigger-point on the scroll source ({ at: px | {fraction}
// | {element}, direction?, id? }); `UseScrollTriggerOptions` — the reader options
// ({ triggers, flipDeltaPx, trackProgress, respectReducedMotion, onCross, onEnter,
// onLeave }); `UseScrollTriggerReturn` — the reader's return shape ({ progress,
// direction, velocity, recalculate }). `useScrollTrigger` is engine-FREE + vueuse-FREE
// (vue-only), so it ships on `@mkbabb/glass-ui/motion-core` — the dock-search +
// scroll-chrome consumers reach it there. The continuous `progress` ramp is
// native-timeline-gated (dual-path single-writer); the discrete crossing events run
// the JS rAF tick on every engine (events can't ride a CSS timeline) and SURVIVE PRM.
export type {
    TriggerPoint,
    UseScrollTriggerOptions,
    UseScrollTriggerReturn,
} from "../composables/motion/useScrollTrigger";

// ── useScrollChrome — the floating-chrome COLLAPSE-STATE machine (BC.W-SCROLL-CHROME) ──
// `UseScrollChromeOptions` — the collapse machine options ({ collapseOnScroll (DEFAULT
// FALSE — persistent-by-default, the iOS-27 lesson), flipDeltaPx, velocityGate,
// snapMidpoint, collapseRangePx, chromeRef, respectReducedMotion, scrollStopMs });
// `UseScrollChromeReturn` — the machine's return ({ collapseT (0..1), collapsed,
// direction, recalculate }). `useScrollChrome` is a THIN collapse-state machine OVER
// `useScrollTrigger` (the ONE reader — no second listener); it ramps `collapseT` on
// direction + a px range, snaps to a discrete endpoint on scroll-stop, and writes the
// `--chrome-collapse-t` custom the `.scroll-chrome` recipe reads for the COMPOSITOR
// shrink/quiet (NEVER a per-frame reflow). Engine-FREE + vueuse-FREE (vue-only), so it
// ships on `@mkbabb/glass-ui/motion-core` — the dock-search + page-header consumers reach
// it there.
export type {
    UseScrollChromeOptions,
    UseScrollChromeReturn,
} from "../composables/motion/useScrollChrome";

// ── useDockSearch — the DOCK-as-native-dynamic-search-bar seam (BC.W-DOCK-SEARCH) ──
// `UseDockSearchOptions` — the seam options ({ dockState (the composed state machine),
// items | onSearch (sync XOR the pluggable async source), debounceMs, maxResults,
// collapseOnScroll (DEFAULT FALSE — persistent-default, the iOS-27 lesson), scrollContainer,
// chromeRef, onResultSelect, ensureTargetWindow, scrollTo (the ToC subsume) });
// `UseDockSearchReturn` — the handle ({ fuzzy (the composed useFuzzySearch state),
// autocompleteText (the ghost-text top-match completion), scrollChrome, armSearch,
// disarmSearch, acceptAutocomplete, isSearchArmed }). `useDockSearch` COMPOSES the dock
// state machine + the SHIPPED /search fuzzy pipeline (the VSCode scorer — NO re-fork) +
// the dock's OWN `--dock-morph-t` metaball morph (box-inviolate — no second engine, no
// `dockMorphContext`/`DOCK_SPRING` edit) + the optional `useScrollChrome` shrink + the
// virtual-window/ToC scroll-to-and-warm. `<GlassDock search>` opts into it; the words
// `SearchBar` retires onto it on the `^4.x` consume (the foreign-tree fence — the network
// source plugs via `onSearch`). Reached from `@mkbabb/glass-ui/dock`.
export type {
    UseDockSearchOptions,
    UseDockSearchReturn,
} from "../components/custom/dock/composables/useDockSearch";

// ── LiquidGrid — the WebGPU-first liquid AA-grid viz (BC.W-VIZ-PAPERGRID) ──
// `LiquidGridConfig` stays HERE for proof:viz-papergrid.
// Config + handle types for a consumer wrapping <LiquidGrid> (the /liquid-grid subpath).
export type {
    LiquidGridConfig,
    LiquidGridHandle,
    UseLiquidGridOptions,
} from "../components/custom/liquid-grid";

// ── The component customization-surface contract (BC.W-CUSTOMIZABILITY-CENSUS) ──
//
// THE BINDING BAR (component-customizability.md §0): every published glass-ui
// component is *fully customizable with reasonable, pragmatic, GOLDEN (like our
// golden typography) defaults that afford design hierarchy.* A consumer reaches
// for ANY component on this discovery surface and finds the SAME three-layer
// customization surface:
//
//   PROPS  — the semantic per-instance choices (variant / size / tier / tone),
//            typed + published here on `@mkbabb/glass-ui/api` (the `*Variants`
//            types above are exactly this layer). A primary CTA reads bigger +
//            glassier than a secondary with ONE prop — hierarchy out of the box.
//   TOKENS — the visual MAGNITUDES (padding / blur / glyph / alpha / hue /
//            duration) as CSS custom properties a consumer retunes from ONE
//            `:root` override. A TOKEN beats a prop where a `:root` override
//            suffices: the `--control-h-{xs,sm,md,lg}` / `--control-text` cohort
//            (the control box+type), the φ `--overlay-pad-inline/-block` ladder
//            (the overlay padding), the sqrt-φ `--card-pad-*` ladder, the √φ
//            `--type-*` / `text-display-*` ladder, `--glass-level` / the
//            `--glass-bg-*` tiers (the glass magnitude).
//   SLOTS  — content insertion.
//
// AND the BARE component already reads as a proportioned √φ-typography /
// warm-cream-glass / spring-clocked design (the golden default) — a consumer
// composes `<Card>` / `<Button>` / `<Dialog>` with zero props and gets the
// canonical house plate; the size/tier/surface rungs let them EXPRESS hierarchy
// without per-site hand-tuning.
//
// THE FENCES (the discipline a wave adding a customization axis must hold):
//   - DON'T over-prop. A magnitude a `:root` token already covers does NOT get a
//     prop (a `padding` prop where `--overlay-pad-inline` suffices is the
//     anti-pattern). Magnitudes → tokens; semantic choices → props.
//   - No contrivance. A size/variant/tier axis is added ONLY where the hierarchy
//     choice is REAL (the input register Input/Switch/Textarea — yes; a hairline
//     Separator / a 16px checkbox atom — no).
//   - DRY. Thread the EXISTING register (the `--control-*` cohort, the shared
//     `Surface` axis, the φ overlay-pad ladder, the √φ type ladder — each ≥2
//     consumers); ZERO new parallel register.
//
// THE CENSUS + THE GATE (the anti-smuggle floor): every published `ui/` +
// enrolled `custom/` component appears on EXACTLY ONE list — `gold` | `gap` |
// `token-only-correct` — at `docs/tranches/BC/audit/W-CUSTOMIZABILITY-census.md`,
// machine-locked by `proof:customizability-census`
// (`scripts/proof-customizability-census.mjs`, `["local","ci"]`): C1 no hardcoded
// control type/height off the `--control-*` cohort · C2 overlay golden uniformity
// (the `surface` axis + the φ `--overlay-pad-*` ladder) · C3 no fork-forced px
// literal / `!important`-fighting-CVA in a compound · C4 audacious-type-not-
// starved. A NEW component bearing a customization gap with no census row reds.
// The captured-paint twin (the golden default + the prop/token retune cascade) is
// `tests-visual/customizability.spec.ts`. The gate scopes the customization-
// SURFACE axis; `proof:no-shadcn-default` owns the default-paint vocabulary,
// `proof:glass-cohesion` the bg-opacity axis — disjoint by clause.

// ── BC.W-OVERLAY-UNIFORM — the floating-overlay surface-axis consumer record ──
//
// The shared `Surface` union (published above from `../components/ui/_shared`) is
// NOW threaded onto the SIX floating overlays that previously LACKED it, so every
// floating overlay carries the SAME golden customization surface Dialog/Popover/
// Sheet/Drawer/Toast already expose. ZERO new register — the threads WIDEN the ONE
// resolver's enrolled set (`proof:surface-axis` W1 no-fork stays GREEN); no symbol
// is re-published here (the `Surface` export above already covers the new consumers):
//
//   <DropdownMenu><DropdownMenuContent surface="veil"> — the busy-backdrop feather
//   <Select><SelectContent surface="opaque">           — the solid-card escape
//   <Tooltip><TooltipContent surface="veil">           — the legibility plate
//   <ContextMenu><ContextMenuContent surface="glass">  — the default glass plate
//   <Command surface="veil"> (Dialog-hosted: the surface flows through the host)
//   <Popover trigger="hover"><PopoverContent surface="opaque"> — the folded
//     HoverCard case (BI.W-OVERLAY-UNION: HoverCard folded onto the sealed union)
//
// Each defaults to `surface="glass"` (byte-identical to the prior bare
// `glass-floating` plate). The raw `min-w-32` / `max-h` / tooltip `text-sm` /
// chevron `opacity-50` literals are token-backed onto `--overlay-min-width` /
// `--overlay-max-block` / `--tooltip-text` / `--select-chevron-opacity`
// (`tokens/offsets.css`) — `:root`-overridable magnitudes that retune EVERY overlay
// in lockstep (the φ `--overlay-pad-inline/-block` ladder is the shared breath
// cadence). Censused in docs/tranches/BC/audit/W-CUSTOMIZABILITY-census.md (the C2
// rows moved gap→gold); machine-locked by `proof:customizability-census` C2.

// ── BC.W-SEARCH-CUSTOM — the search field-CHROME variant CVA type surface ─────
//
// `SearchVariants` is the CVA-derived prop union for the field-chrome variant the
// glassified `<SearchBar>`/`<FuzzySearch>` thread (`inline` boxed glass pill ·
// `bare`/`floating` chromeless). It REPLACES the `!important`-fighting escape the
// FuzzySearch field carried (CLEANUP-PLAN HOLD-4) with a real CVA rung. The size
// axis rides the already-published shared `ControlSize`/`controlSizeClass`
// (surfaced above); the surface axis rides the already-published `Surface`. ZERO
// new magnitude register — the search-family `--search-*` tokens are indirection
// rungs defaulting to the `--ui-glyph`/`--control-*` cohort (tokens/sizing.css).
// Machine-locked by `proof:search-custom` + `proof:customizability-census` C3.
export type { SearchVariant, SearchVariants } from "../components/custom/search";

// ── BI.W-DOCK-CONTROLS — the ONE headless selection engine + the ONE indicator writer ─
// `useSelectionGroup` (reka-free, /motion-core) drives the dock control run / SegmentedTabs
// / ToggleGroup single-select; `useSelectionIndicator` is the ONE traveling-indicator writer
// (the CSS-anchor dual path retired — Safari-identical). Published for consumer wrappers.
export type { SelectionMode, SelectionRole, UseSelectionGroupParams, UseSelectionGroupReturn } from "../composables/motion/useSelectionGroup";
export type { SelectionOption, UseSelectionIndicatorParams, UseSelectionIndicatorReturn } from "../composables/motion/useSelectionIndicator";
