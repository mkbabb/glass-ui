// @mkbabb/glass-ui — Unified design system (curated public surface).
//
// ── Import shape canon ───────────────────────────────────────────────────
//
// The library exposes consumers via two layers:
//
//   1. ROOT barrel (`@mkbabb/glass-ui`) — vueuse-free curated surface;
//      the per-package list below. This file IS that barrel.
//   2. Per-package SUBPATHS (`@mkbabb/glass-ui/<pkg>`) — every public
//      component package reachable via flat name (verified by
//      `npm run verify:package`). Public types + constants ride
//      their OWNING package subpath (e.g. `ConstellationProps` on
//      `/constellation`, `AuroraConfig` + `MAX_NUCLEI` on `/aurora`,
//      `ButtonProps` on `/button`).
//
// All subpath barrels at top level (`src/<flat>.ts`) follow the same shape:
// `export * from "./components/<dir>"` (or composition thereof).
//
// ── Heavy-peer exclusions (vueuse + keyframes.js) ────────────────────────
//
// This root barrel is **vueuse-free** AND **keyframes.js-free**: it does
// NOT re-export any symbol whose implementation imports `@vueuse/core` OR
// `@mkbabb/keyframes.js`. Consumers reach heavy-peer-bearing symbols via
// explicit subpaths so bundlers can shake them when unused:
//
//   Symbol(s)                                  Subpath                        Peer
//   -----------------------------------------  -----------------------------  ---------------------
//   Input, Textarea                            @mkbabb/glass-ui/forms         @vueuse/core
//   useGlobalDark, installDarkModeSync         @mkbabb/glass-ui/dark          @vueuse/core
//   useKeyboardShortcuts, registerShortcut,    @mkbabb/glass-ui/keyboard      @vueuse/core
//   formatCombo, formatComboParts, isMac,
//   useRegisteredShortcuts, ShortcutOptions,
//   RegisteredShortcut, ShortcutCombo,
//   ShortcutEventType
//   Carousel, CarouselContent,                 @mkbabb/glass-ui/carousel      @vueuse/core
//   CarouselItem, CarouselPager,
//   useCarousel, CarouselApi
//   useSpring, useSpringMount, useLiquidPress, @mkbabb/glass-ui/motion        @mkbabb/keyframes.js
//   useAnimatedNumber, useAnimatedNumberMap,
//   DAMPING, SNAP_THRESHOLD
//   useScrollProgress, useRAFLoop,             @mkbabb/glass-ui/motion-core   (none — keyframes-FREE + vueuse-FREE)
//   useIntersectionPause, RAFLoopTiming,
//   PausableRuntime, DAMPING, SNAP_THRESHOLD
//
// Mechanism: the root barrel re-exports each vueuse-free leaf EXPLICITLY rather
// than `export * from "./components"`, so Rollup never walks a vueuse-bearing
// leaf into the root SCC.
//
// ── Custom-package cherry-pick rationale ─────────────────────────────────
//
// This root barrel re-exports the curated `configurator` package from
// `src/components/`.
// `hover-popover` is part of the `ui/popover` union, and `scrolling-text`
// lives in its one consumer because the overflow-marquee is consumer-only and
// below the two-binary inclusion bar. The rest reach
// consumers ONLY via their dedicated subpath
// (`@mkbabb/glass-ui/dock`, `/aurora`, `/sidebar`, ...).
//
// Acceptance bar for root-barrel inclusion:
//   (a) vueuse-free at every transitive import (closes the SCC trap);
//   (b) single-component or small primitive package (no nested composables
//       sub-tree, no WebGL substrate); AND
//   (c) composes tightly with the `ui/` primitives in compositions
//       — i.e. consumers reach for it alongside `<Button>`, `<Card>`, etc.
//       rather than as a stand-alone bundle.
//
// The excluded packages fail one or more of those criteria:
//   - vueuse-bearing internals (sidebar, infinite-scroll);
//   - large composite chassis with nested composables (dock, aurora,
//     configurator domain helpers); OR
//   - vertical/themed substrate (search, metric, tabs).
// Consumers of those packages explicitly opt into them via subpath, keeping
// the root barrel's transitive-import graph tight.

// ─── Core UI primitives (vueuse-free) ─────────────────────────────────────
// Explicit per-package re-exports — the `export * from "./components"`
// wildcard is intentionally NOT used because it drags vueuse-bearing
// carousel/input/textarea barrels into the root SCC walk.
export {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
    type AccordionContentProps,
    type AccordionEmits,
    type AccordionItemProps,
    type AccordionProps,
    type AccordionSlotProps,
    type AccordionTriggerProps,
    type AccordionValue,
} from "./components/accordion";
export {
    Alert,
    AlertDescription,
    AlertTitle,
    alertVariants,
    type AlertVariants,
} from "./components/alert";
export {
    Avatar,
    AvatarFallback,
    AvatarImage,
    type AvatarIdentityProps,
    type AvatarProps,
    type AvatarShape,
    type AvatarSize,
} from "./components/avatar";
export { Badge, badgeVariants, type BadgeVariants } from "./components/badge";
export {
    Button,
    type ButtonEmphasis,
    type ButtonProps,
    type ButtonSize,
    type ButtonTone,
} from "./components/button";
export {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    type CardProps,
    type CardSize,
} from "./components/card";
export { Checkbox, type CheckboxProps } from "./components/checkbox";
export {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
    type CollapsibleContentProps,
    type CollapsibleEmits,
    type CollapsibleProps,
    type CollapsibleTriggerProps,
} from "./components/collapsible";
export {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
    type ComboboxEmptyProps,
    type ComboboxGroupProps,
    type ComboboxInputEmits,
    type ComboboxInputProps,
    type ComboboxItemEmits,
    type ComboboxItemProps,
    type ComboboxListEmits,
    type ComboboxSeparatorProps,
    type ComboboxValue,
    type CommandDialogEmits,
    type CommandDialogProps,
    type CommandEmits,
    type CommandListProps,
    type CommandProps,
} from "./components/command";
export {
    DataTable,
    type DataTableColumn,
    type DataTableProps,
    type DataTableRowAttrs,
    type DataTableRowIndex,
    type DataTableRowRef,
    type DataTableSort,
    type DataTableStatus,
} from "./components/data-table";
// `DialogTrigger`/`DialogClose` re-export reka's own primitives directly. The two
// house SFCs that wrapped them forwarded props and nothing else, behind a justification
// that argued a `.ts` file cannot do a 1-line re-export — inside a `.ts` file.
export {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    type DialogContentProps,
    type DialogDescriptionProps,
    type DialogDismiss,
    type DialogProps,
    type DialogTitleProps,
} from "./components/dialog";
export {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
    type DropdownMenuCheckboxItemEmits,
    type DropdownMenuCheckboxItemProps,
    type DropdownMenuContentEmits,
    type DropdownMenuContentProps,
    type DropdownMenuEmits,
    type DropdownMenuGroupProps,
    type DropdownMenuItemEmits,
    type DropdownMenuItemProps,
    type DropdownMenuLabelProps,
    type DropdownMenuProps,
    type DropdownMenuRadioGroupEmits,
    type DropdownMenuRadioGroupProps,
    type DropdownMenuRadioItemEmits,
    type DropdownMenuRadioItemProps,
    type DropdownMenuSeparatorProps,
    type DropdownMenuShortcutProps,
    type DropdownMenuSubContentEmits,
    type DropdownMenuSubContentProps,
    type DropdownMenuSubEmits,
    type DropdownMenuSubProps,
    type DropdownMenuSubTriggerProps,
    type DropdownMenuTriggerAction,
    type DropdownMenuTriggerProps,
    type MenuTrigger,
} from "./components/dropdown-menu";
// `ui/hover-card` retired as a name (the reka HoverCardRoot
// substrate stays, imported by the sealed `<Popover trigger="hover">` union). The
// HoverCard component + subpath fold onto ONE `Popover`. (clean break, no alias.)
export { Label, type LabelProps, type LabelRequirement } from "./components/label";
// `ui/multi-select` retired; no replacement. A MultiSelect was a Popover+Command
// composition over the Combobox-family mechanism, and the library ships that
// mechanism as `<Command>` — but there has never been a `<Combobox>` component
// here, so the note this line used to carry pointed at a component that does not
// exist. Build the composition, or pass `multiple` through to reka's ComboboxRoot
// via `<Command>`'s attribute forward. (clean break, no alias.)
// `NumberFieldContent` retired with the wrapper node it existed to render (sole
// child on 5 of 5 mounts; the root IS the grid now), and `NumberFieldIncrement` /
// `NumberFieldDecrement` folded into ONE `NumberFieldStep direction=` — they were
// byte-twins modulo four tokens. Clean break, no alias: six-repo census, zero
// external consumers.
export {
    NumberField,
    NumberFieldInput,
    NumberFieldStep,
    type NumberFieldProps,
    type NumberFieldStepProps,
} from "./components/number-field";
export {
    Popover,
    PopoverContent,
    PopoverTrigger,
    type PopoverContentEmits,
    type PopoverContentProps,
    type PopoverEmits,
    type PopoverProps,
    type PopoverTriggerMode,
    type PopoverTriggerProps,
} from "./components/popover";
export {
    Progress,
    type ProgressOrientation,
    type ProgressProps,
    type ProgressStatus,
    type ProgressVariant,
} from "./components/progress";
export {
    RadioGroup,
    RadioGroupItem,
    type RadioGroupItemProps,
    type RadioGroupProps,
} from "./components/radio-group";
export {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectScrollButton,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
    type SelectContentEmits,
    type SelectContentProps,
    type SelectEmits,
    type SelectGroupProps,
    type SelectItemEmits,
    type SelectItemProps,
    type SelectItemSelectEvent,
    type SelectLabelProps,
    type SelectProps,
    type SelectScrollButtonProps,
    type SelectSeparatorProps,
    type SelectTriggerProps,
    type SelectValueProps,
} from "./components/select";
export { Separator, type SeparatorProps } from "./components/separator";
// The side sheet is its own component again. It shares reka's DialogRoot + FocusScope
// with Dialog — compose `<Dialog>` around `<SheetContent side>` — but a centred plate and
// an edge-anchored surface are different geometry, different material and different
// motion, and one component carrying both meant eleven `isCenter` forks. It also
// carries the DETENTS the drawer family used to be: `<SheetContent :detents>` is a
// ladder of sizes, so the surface that was a placement plus a scalar is a prop on the
// surface it duplicated. The `./sheet` subpath rides the batched export cut.
export { SheetContent, type SheetContentProps } from "./components/sheet";
export { Skeleton } from "./components/skeleton";
export { Slider, type SliderProps, type SliderSize, type SliderVariant } from "./components/slider";
// StatusDot reaches the ROOT barrel. It was absent from both barrels while all
// seven of its external importers reached it through the `./status-dot` subpath —
// which is a component that ships publicly and cannot be found the way every other
// component in the library is found. The subpath is kept (it is what those seven
// import); this line ends the third public-surface grammar.
export {
    StatusDot,
    STATUS_DOT_STATES,
    type StatusDotSize,
    type StatusDotState,
} from "./components/status-dot";
export { Switch, type SwitchProps } from "./components/switch";
export {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableEmpty,
    TableHead,
    TableHeader,
    TableRow,
} from "./components/table";
// `ui/Tabs` (the reka wrapper family) left the public surface because it duplicated
// the tab vocabulary and its always-on baked-plate indicator painted an unwanted
// oval blob. The standardized tab family
// is `SegmentedTabs` (`@mkbabb/glass-ui/tabs`, TWO materials).
// The reka substrate files (`components/tabs/*`) are
// DEFINITION-ABSENT (retired): their sole internal consumer `DockLayerGroup.vue`
// re-points onto the library's ONE headless selection engine `useSelectionGroup`
// (roving focus + the ONE traveling-indicator writer, Safari-identical), so the
// reka `--reka-tabs-indicator-*` path is gone. No public barrel re-exported them.
export {
    TagsInput,
    TagsInputInput,
    TagsInputItem,
    TagsInputItemDelete,
    TagsInputItemText,
    type TagsInputInputProps,
    type TagsInputItemDeleteProps,
    type TagsInputItemProps,
    type TagsInputItemTextProps,
    type TagsInputProps,
} from "./components/tags-input";
export {
    Toast,
    ToastAction,
    ToastClose,
    ToastDescription,
    ToastTitle,
    Toaster,
    toast,
    useToast,
    type ToastActionProps,
    type ToastCloseProps,
    type ToastDescriptionProps,
    type ToastEmits,
    type ToastHandle,
    type ToastOptions,
    type ToastProps,
    type ToastSwipeEvent,
    type ToastTitleProps,
    type ToasterPosition,
} from "./components/toast";
export {
    ToggleGroup,
    ToggleGroupItem,
    type ToggleGroupItemProps,
    type ToggleGroupProps,
} from "./components/toggle-group";
export {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
    type TooltipContentEmits,
    type TooltipContentProps,
    type TooltipEmits,
    type TooltipProps,
    type TooltipProviderProps,
    type TooltipTriggerProps,
} from "./components/tooltip";

// Custom composites — instrument-cluster chassis
// `custom/hover-popover` folded onto `<Popover trigger="hover">`
// (the Kronecker fold). HoverPopover the NAME is retired; the mechanism (hover-open
// timer + keepDockOpen watch) lives on the sealed Popover union. (clean break, no alias.)

// Custom composites — configurator primitive
export {
    CONFIGURATOR_SIZE_KEY,
    Configurator,
    ConfiguratorLayer,
    ConfiguratorRow,
    provideConfiguratorSize,
    useConfiguratorState,
    useOptionalConfiguratorSize,
    type ConfiguratorAsideSide,
    type ConfiguratorCloneMode,
    type ConfiguratorGalleryPlacement,
    type ConfiguratorPreset,
    type ConfiguratorScrollMode,
    type ConfiguratorSize,
    type ConfiguratorState,
    type ConfiguratorStateOptions,
} from "./components/configurator";

// `custom/scrolling-text` lives in its one consumer.
// The overflow-marquee's only binary consumer is a single app (2 sites), the
// ≥2-binary-consumer bar unmet, so the primitive + its `/scrolling-text` subpath
// leave glass-ui; that consumer brings its own marquee. (clean break, no alias.)

// ─── Core composables (vueuse-free) ───────────────────────────────────────
// `useGlobalDark` and `useKeyboardShortcuts` are intentionally removed
// from the root barrel — they are vueuse-bearing SCC-trap leaves.
// Consumers use the `@mkbabb/glass-ui/dark` and `@mkbabb/glass-ui/keyboard`
// subpaths (flat naming).
//
// Sub-trees: reactive/ (useInterval + useTimer), dom/ (useResizeObserver +
// useTouchGate + useTokenColor), glass/, sortable/.
//
// `composables/motion` is NOT on the root barrel — it statically reaches a
// heavy peer (`@mkbabb/keyframes.js` — the NumericAnimation + SmoothProgress
// engines) that the bundler would otherwise walk transitively into every
// consumer's entry chunk, even Card-/Button-only consumers. The motion
// composables are reachable via `@mkbabb/glass-ui/motion`.
export {
    useInterval,
    useTimer,
    type UseIntervalControls,
    type UseIntervalOptions,
    type UseTimerControls,
    type UseTimerOptions,
} from "./composables/reactive";
export {
    createTokenColorCache,
    resolveTokenColor,
    useBreakpoint,
    useClipboard,
    useDragVelocity,
    useIdleReady,
    useResizeObserver,
    useTokenColor,
    useTouchGate,
    useUserInvalidAria,
    useViewportReady,
    writeClipboard,
    type ClipboardStatus,
    type CopyFailureReason,
    type CopyResult,
    type ResolveTokenColorCache,
    type TokenColorResolver,
    type TouchGateReturn,
    type UseBreakpointControls,
    type UseClipboardOptions,
    type UseClipboardReturn,
    type UseDragVelocityParams,
    type UseDragVelocityReturn,
    type UseIdleReadyControls,
    type UseIdleReadyOptions,
    type UseResizeObserverControls,
    type UseResizeObserverOptions,
    type UseTokenColorControls,
    type UseTokenColorOptions,
    type UseUserInvalidAriaOptions,
    type UseUserInvalidAriaReturn,
    type UseViewportReadyControls,
    type UseViewportReadyOptions,
} from "./composables/dom";
export {
    createSpecularWriter,
    resolveCanvasColor,
    useCanvas2D,
    useSpecularTracking,
    vSpecular,
    type Canvas2DFrame,
    type Canvas2DHandle,
    type Canvas2DOptions,
    type Canvas2DSuspendReason,
    type SpecularWriter,
    type UseSpecularTracking,
} from "./composables/glass";

// The View-Transitions motion substrate. Dependency-free (no `vue`, no
// `@mkbabb/keyframes.js`, no `@vueuse/core`), so it is safe on the
// vueuse-/keyframes-FREE root barrel — re-exported here for BROAD reach (also
// reachable via the `@mkbabb/glass-ui/motion-core` subpath). A TARGETED
// re-export, NOT `export * from "./composables/motion/core"`, so the
// keyframes-free-but-barrel-excluded scroll/RAF/stagger leaves stay off the
// root walk.
export {
    startViewTransition,
    supportsViewTransitions,
    type ViewTransitionResult,
} from "./composables/motion/core/useViewTransition";

// The v-reveal entrance directive. Dependency-free (`vue` type-only — no
// keyframes, no vueuse), so it is root-barrel safe per the `useViewTransition`
// precedent; also reachable via `@mkbabb/glass-ui/motion-core`.
export { vReveal } from "./composables/motion/reveal/vReveal";

// Shared amorphous flex-and-squish primitive.
// A PURE projection of a caller-driven normalized scalar onto a size span + a
// volume-preserving squish (no spring/rAF/element — imports `vue` only), so it is
// engine-FREE + vueuse-FREE and root-barrel safe per the `useViewTransition`
// precedent; also reachable via `@mkbabb/glass-ui/motion-core`.
export {
    useLiquidFlex,
    type LiquidFlexAxis,
    type UseLiquidFlexParams,
    type UseLiquidFlexReturn,
} from "./composables/motion/spring/useLiquidFlex";

// Shared visualization pointer-physics field (pointer position +
// derived velocity + the ACCEL term). The viz renderer FEEDS it via its frame `tick`
// (NO own rAF — the one-loop discipline); under PRM it freezes (`tick(0)`). Imports
// `vue` only — engine-FREE + vueuse-FREE and root-barrel safe per the `useLiquidFlex`
// precedent; also reachable via `@mkbabb/glass-ui/motion-core`. WebGPU visualizations
// consume it for flow-field and concentric pointer response.
export {
    usePointerVelocityField,
    type PointerVec2,
    type UsePointerVelocityField,
    type UsePointerVelocityFieldOptions,
} from "./composables/motion/pointer/usePointerVelocityField";

// Route pointer broadcaster (a full-bleed pointer-events:none
// background viz cannot listen for itself; the ONE capture-phase window listener per
// route serves them via provide/inject) + the four PURE per-viz pointer-field mappings
// (fourier draw-bias/lean · blob heavy-pull · aurora cursor · constellation well). Both
// import `vue` only (the mappings are pure) — engine-FREE + vueuse-FREE + root-barrel safe
// per the `usePointerVelocityField` precedent; also reachable via `@mkbabb/glass-ui/motion-core`.
export {
    useRoutePointer,
    type RoutePointerContext,
    type UseRoutePointerOptions,
} from "./composables/motion/pointer/useRoutePointer";
export {
    fourierLeanMapping,
    blobPullMapping,
    auroraCursorMapping,
    constellationWellMapping,
    snapshotField,
    // The six per-mapping tuning DEFAULTS (`FOURIER_BIAS_GAIN` · `FOURIER_FOLLOW_LEAN` ·
    // `BLOB_LEAD_K` · `BLOB_STRETCH_GAIN` · `BLOB_STRETCH_MAX` · `AURORA_CURSOR_RADIUS`)
    // are NOT on this barrel (BK #19 W-DEAD-EXPORT). Each is the default an options bag
    // already exposes as an overridable field, so publishing the literal beside the
    // function it defaults gives a consumer a SECOND way to say the same thing and a
    // way to drift from it. Zero sites, in-repo or cross-repo, ever read them.
    type PointerFieldSnapshot,
    type FourierLeanGeometry,
    type FourierLeanOptions,
    type FourierLeanResult,
    type BlobPullOptions,
    type BlobPullResult,
    type AuroraCursorOptions,
    type AuroraCursorResult,
    type ConstellationWellResult,
} from "./composables/motion/pointer/pointerFieldMappings";

// The four grammar axis types published on the root barrel
// (the ONE axis home is `_shared/axes.ts`; the `/axes` subpath is the discovery
// front door). Types-only re-export — no runtime import, so the vueuse-FREE
// root-barrel discipline is preserved.
export type {
    Size,
    Orientation,
    Motion,
    Surface,
    SurfaceTier,
} from "./components/_shared/axes";

// Component foundations
export { cn } from "./components/_shared/class-names";
export {
    supportsScrollTimeline,
    supportsViewTimeline,
} from "./composables/motion/scroll/supportsCssTimeline";
