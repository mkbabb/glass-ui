import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import * as Aurora from "@glass/components/aurora";
import * as BlobSurface from "@glass/components/blob";
// @ts-expect-error the component-internal renderer contract is not public
import type { UseMetaballRendererOptions } from "@glass/components/blob";
import * as CarouselSurface from "@glass/components/carousel";
import * as CardSurface from "@glass/components/card";
import * as CommandSurface from "@glass/components/command";
import * as Glass from "@glass/index";
import * as DarkModeToggleSurface from "@glass/components/dark-mode-toggle";
import * as Dark from "@glass/composables/dark";
import * as DataTableSurface from "@glass/components/data-table";
import * as DialogSurface from "@glass/components/dialog";
import * as Dock from "@glass/components/dock";
import * as DrawerSurface from "@glass/components/drawer";
import * as DropdownMenuSurface from "@glass/components/dropdown-menu";
import * as ExpandableContainerSurface from "@glass/components/expandable-container";
import * as Forms from "@glass/forms";
import * as HandMarkSurface from "@glass/components/handmark";
import * as InfiniteScrollSurface from "@glass/components/infinite-scroll";
import * as InstrumentChassisSurface from "@glass/components/instrument-chassis";
import * as Keyboard from "@glass/composables/keyboard";
import * as LabeledFieldSurface from "@glass/components/labeled-field";
import * as MetricSurface from "@glass/components/metric";
import * as Motion from "@glass/composables/motion";
import * as MotionCore from "@glass/composables/motion/core";
import * as PaperBackdropSurface from "@glass/components/paper-backdrop";
import * as PopoverSurface from "@glass/components/popover";
import * as ProgressSurface from "@glass/components/progress";
import * as PulseSurface from "@glass/components/pulse";
import * as Search from "@glass/components/search";
import * as SelectSurface from "@glass/components/select";
import * as Sidebar from "@glass/composables/sidebar";
import * as ScrollProgressRimSurface from "@glass/components/scroll-progress-rim";
import * as SortableListSurface from "@glass/components/sortable-list";
import * as StatusDotSurface from "@glass/components/status-dot";
import * as SurfacePackage from "@glass/components/surface";
import * as TabsSurface from "@glass/components/tabs";
import * as TimelineSurface from "@glass/components/timeline";
import * as ChipSurface from "@glass/components/chip";
import * as TypewriterSurface from "@glass/components/typewriter";

const uiRuntimeExports = [
    "Accordion",
    "Alert",
    "Avatar",
    "Badge",
    "Button",
    "Card",
    "Checkbox",
    "Collapsible",
    "Command",
    "DataTable",
    "Dialog",
    "DropdownMenu",
    // HoverCard folded onto <Popover trigger="hover"> (clean break).
    "Label",
    // MultiSelect folded onto <Combobox multiple> (clean break).
    "NumberField",
    "Popover",
    "Progress",
    "RadioGroup",
    "Select",
    "Separator",
    // Sheet folded onto <DialogContent placement> (clean break).
    "Skeleton",
    "Slider",
    "Switch",
    "Table",
    // `ui/Tabs` (the reka wrapper family) LEFT the public root barrel
    // (the canonical panel-nav surface is now `<SegmentedTabs variant="underline">`
    // on `@mkbabb/glass-ui/tabs`; the reka substrate stays INTERNAL for the dock-rail
    // consumer only). The retirement is asserted in nonCoreRootRetirements below.
    "TagsInput",
    "Toast",
    "ToggleGroup",
    "Tooltip",
];

// Vueuse-bearing form primitives (Input, Textarea, Combobox*) and the
// Carousel family moved to the `/forms` + `/carousel` subpaths; the dark-mode
// + keyboard composables moved to `/dark` + `/keyboard`. Root barrel no
// longer re-exports any vueuse-bearing symbol (SCC trap closure).
//
// keyframes.js-bearing motion composables (`useNumericTransition`,
// `useStaggerReveal`, `useScrollProgress`,
// `useAnimatedNumber`, `useRAFLoop`,
// `useIntersectionPause`, `installDarkModeSync`, `DAMPING`, `SNAP_THRESHOLD`)
// moved to `/motion`. Root barrel no longer reaches `@mkbabb/keyframes.js`
// statically.
const composableRuntimeExports = [
    "useTouchGate",
    "useTimer",
    "useInterval",
    // UseGlassRenderer/createGlassFilter/destroyGlassFilter
    // retired off the root barrel (the detection-cascade cluster; its binary
    // consumer GlassPanel retired at the prune, no second consumer).
    // UseClipboard composable promotion.
    // The stateless clipboard door is writeClipboard,
    // the honest primitive shared with useClipboard; the lossy copyToClipboard
    // boolean wrapper is cut, its boolean+callback sugar demoted to a consumer
    // preset (value.js adopts writeClipboard).
    "useClipboard",
    "writeClipboard",
];

const rootRuntimeExports = [
    ...uiRuntimeExports,
    ...composableRuntimeExports,
    "AURORA_CURSOR_RADIUS",
    "AccordionContent",
    "AccordionItem",
    "AccordionTrigger",
    "AlertDescription",
    "AlertTitle",
    "AvatarFallback",
    "AvatarImage",
    "BLOB_LEAD_K",
    "BLOB_STRETCH_GAIN",
    "BLOB_STRETCH_MAX",
    "CONFIGURATOR_SIZE_KEY",
    "CardAction",
    "CardContent",
    "CardDescription",
    "CardFooter",
    "CardHeader",
    "CardTitle",
    "CollapsibleContent",
    "CollapsibleTrigger",
    "CommandDialog",
    "CommandEmpty",
    "CommandGroup",
    "CommandInput",
    "CommandItem",
    "CommandList",
    "CommandSeparator",
    "CommandShortcut",
    "Configurator",
    "ConfiguratorLayer",
    "ConfiguratorRow",
    "DialogClose",
    "DialogContent",
    "DialogDescription",
    "DialogFooter",
    "DialogHeader",
    "DialogTitle",
    "DialogTrigger",
    "DropdownMenuCheckboxItem",
    "DropdownMenuContent",
    "DropdownMenuGroup",
    "DropdownMenuItem",
    "DropdownMenuLabel",
    "DropdownMenuRadioGroup",
    "DropdownMenuRadioItem",
    "DropdownMenuSeparator",
    "DropdownMenuShortcut",
    "DropdownMenuSub",
    "DropdownMenuSubContent",
    "DropdownMenuSubTrigger",
    "DropdownMenuTrigger",
    "FOURIER_BIAS_GAIN",
    "FOURIER_FOLLOW_LEAN",
    "NumberFieldContent",
    "NumberFieldDecrement",
    "NumberFieldIncrement",
    "NumberFieldInput",
    "PopoverContent",
    "PopoverTrigger",
    "RadioGroupItem",
    "SelectContent",
    "SelectGroup",
    "SelectItem",
    "SelectLabel",
    "SelectSeparator",
    "SelectTrigger",
    "SelectValue",
    "TableBody",
    "TableCaption",
    "TableCell",
    "TableEmpty",
    "TableHead",
    "TableHeader",
    "TableRow",
    "TagsInputInput",
    "TagsInputItem",
    "TagsInputItemDelete",
    "TagsInputItemText",
    "ToastAction",
    "ToastClose",
    "ToastDescription",
    "ToastTitle",
    "Toaster",
    "ToggleGroupItem",
    "TooltipContent",
    "TooltipProvider",
    "TooltipTrigger",
    "alertVariants",
    "auroraCursorMapping",
    "badgeVariants",
    "blobPullMapping",
    "cn",
    "constellationWellMapping",
    "createSpecularWriter",
    "createTokenColorCache",
    "fourierLeanMapping",
    "provideConfiguratorSize",
    "resolveCanvasColor",
    "resolveTokenColor",
    "snapshotField",
    "startViewTransition",
    "supportsScrollTimeline",
    "supportsViewTimeline",
    "supportsViewTransitions",
    "toast",
    "useBreakpoint",
    "useCanvas2D",
    "useCanvasLifecycle",
    "useConfiguratorState",
    "useDragVelocity",
    "useIdleReady",
    "useLeadTrail",
    "useLiquidFlex",
    "useOptionalConfiguratorSize",
    "usePointerVelocityField",
    "useResizeObserver",
    "useRoutePointer",
    "useSpecularPointer",
    "useSpecularTracking",
    "useTextHighlight",
    "useToast",
    "useTokenColor",
    "useUserInvalidAria",
    "useViewportReady",
    "vReveal",
    "vSpecular",
] as const;

const subpathRuntimeExports = [
    // Drawer moved OFF the root barrel to the /drawer subpath
    // (keyframes-bearing heavy component, dock/aurora isolation pattern).
    { subpath: "drawer", surface: DrawerSurface, name: "Drawer" },
    { subpath: "drawer", surface: DrawerSurface, name: "DrawerContent" },
    { subpath: "drawer", surface: DrawerSurface, name: "DrawerHeader" },
    { subpath: "drawer", surface: DrawerSurface, name: "DrawerFooter" },
    { subpath: "drawer", surface: DrawerSurface, name: "DrawerTitle" },
    { subpath: "drawer", surface: DrawerSurface, name: "DrawerDescription" },
    { subpath: "search", surface: Search, name: "FuzzySearch" },
    { subpath: "search", surface: Search, name: "useFuzzySearch" },
    // The `ProgressiveSidebar` SFC is gone; the `./sidebar` subpath now
    // surfaces composables only.
    { subpath: "sidebar", surface: Sidebar, name: "useScrollTracker" },
    { subpath: "sidebar", surface: Sidebar, name: "useSidebarFollow" },
    { subpath: "sidebar", surface: Sidebar, name: "useTreeIndex" },
    { subpath: "sidebar", surface: Sidebar, name: "buildTreeIndex" },
    {
        subpath: "dark-mode-toggle",
        surface: DarkModeToggleSurface,
        name: "DarkModeToggle",
    },
    {
        subpath: "infinite-scroll",
        surface: InfiniteScrollSurface,
        name: "InfiniteScroll",
    },
    {
        subpath: "infinite-scroll",
        surface: InfiniteScrollSurface,
        name: "useInfiniteScroll",
    },
    { subpath: "tabs", surface: TabsSurface, name: "SegmentedTabs" },
    { subpath: "typewriter", surface: TypewriterSurface, name: "TypewriterText" },
    { subpath: "typewriter", surface: TypewriterSurface, name: "useTypewriter" },
    { subpath: "aurora", surface: Aurora, name: "Aurora" },
    { subpath: "aurora", surface: Aurora, name: "useAurora" },
    { subpath: "status-dot", surface: StatusDotSurface, name: "StatusDot" },
    { subpath: "pulse", surface: PulseSurface, name: "Pulse" },
    { subpath: "paper-backdrop", surface: PaperBackdropSurface, name: "PaperBackdrop" },
    { subpath: "handmark", surface: HandMarkSurface, name: "HandMark" },
    // ToggleChip + SelectableChip FOLDED onto the ONE <Chip>
    // (shape × tone; clean break, no alias). Chip ships subpath-ONLY (/chip, OFF the
    // value.js-free root barrel — the value.js-bearing ink solve rides the dynamic
    // accent-tone-solve leaf; the dynamic color-leaf precedent).
    { subpath: "chip", surface: ChipSurface, name: "Chip" },
    {
        subpath: "scroll-progress-rim",
        surface: ScrollProgressRimSurface,
        name: "ScrollProgressRim",
    },
    { subpath: "sortable-list", surface: SortableListSurface, name: "SortableList" },
    { subpath: "timeline", surface: TimelineSurface, name: "GlassTimeline" },
    {
        subpath: "expandable-container",
        surface: ExpandableContainerSurface,
        name: "ExpandableContainer",
    },
    // Vueuse-bearing subpaths
    { subpath: "forms", surface: Forms, name: "Input" },
    { subpath: "forms", surface: Forms, name: "Textarea" },
    { subpath: "forms", surface: Forms, name: "Combobox" },
    { subpath: "forms", surface: Forms, name: "ComboboxInput" },
    { subpath: "carousel", surface: CarouselSurface, name: "useCarousel" },
    { subpath: "dark", surface: Dark, name: "useGlobalDark" },
    // installDarkModeSync (keyframes-free, vueuse-bearing) lives on the /dark
    // subpath (its vueuse home).
    { subpath: "dark", surface: Dark, name: "installDarkModeSync" },
    { subpath: "keyboard", surface: Keyboard, name: "registerShortcut" },
    { subpath: "keyboard", surface: Keyboard, name: "useRegisteredShortcuts" },
    { subpath: "keyboard", surface: Keyboard, name: "formatCombo" },
    { subpath: "keyboard", surface: Keyboard, name: "isMac" },
    // keyframes.js-BEARING motion composables on the `/motion` subpath.
    { subpath: "motion", surface: Motion, name: "useNumericTransition" },
    { subpath: "motion", surface: Motion, name: "useAnimatedNumber" },
    // the keyframes-free leaves live on the flat `/motion-core` subpath (a
    // cheap-leaf import no longer statically reaches the keyframes engine).
    // `constants` (DAMPING/SNAP_THRESHOLD) is duplicate-exported on both.
    { subpath: "motion-core", surface: MotionCore, name: "useStaggerReveal" },
    { subpath: "motion-core", surface: MotionCore, name: "useScrollProgress" },
    { subpath: "motion-core", surface: MotionCore, name: "useRAFLoop" },
    { subpath: "motion-core", surface: MotionCore, name: "useReducedMotion" },
    { subpath: "motion-core", surface: MotionCore, name: "readReducedMotion" },
    { subpath: "motion-core", surface: MotionCore, name: "useIntersectionPause" },
    // The INP-under-load lever. Engine-free (`/motion-core`).
    { subpath: "motion-core", surface: MotionCore, name: "useYieldToMain" },
    { subpath: "motion-core", surface: MotionCore, name: "yieldToMain" },
    { subpath: "motion", surface: Motion, name: "DAMPING" },
    { subpath: "motion", surface: Motion, name: "SNAP_THRESHOLD" },
    { subpath: "motion-core", surface: MotionCore, name: "DAMPING" },
    { subpath: "motion-core", surface: MotionCore, name: "SNAP_THRESHOLD" },
    // Sub-barrel publishing phase 2. Six remaining
    // `ui/` primitive families a consumer still imports from the root barrel
    // get flat-name subpaths so consumers can shake unrelated families out
    // of the entry chunk. Closes AL-CARRY-REMAINING-ROOT-BARREL-IMPORTS.
    { subpath: "popover", surface: PopoverSurface, name: "Popover" },
    { subpath: "popover", surface: PopoverSurface, name: "PopoverTrigger" },
    { subpath: "popover", surface: PopoverSurface, name: "PopoverContent" },
    { subpath: "select", surface: SelectSurface, name: "Select" },
    { subpath: "select", surface: SelectSurface, name: "SelectContent" },
    { subpath: "select", surface: SelectSurface, name: "SelectItem" },
    { subpath: "select", surface: SelectSurface, name: "SelectTrigger" },
    { subpath: "select", surface: SelectSurface, name: "SelectValue" },
    { subpath: "data-table", surface: DataTableSurface, name: "DataTable" },
] as const;

const retiredSubpathRuntimeMembers = [
    { subpath: "card", surface: CardSurface, name: "ScrollCard" },
    { subpath: "card", surface: CardSurface, name: "ScrollCardHeader" },
    { subpath: "carousel", surface: CarouselSurface, name: "GlassCarouselPager" },
    { subpath: "dialog", surface: DialogSurface, name: "DialogScrollContent" },
    { subpath: "forms", surface: Forms, name: "ComboboxCancel" },
    { subpath: "forms", surface: Forms, name: "ComboboxSeparator" },
    { subpath: "forms", surface: Forms, name: "ComboboxViewport" },
    { subpath: "data-table", surface: DataTableSurface, name: "DataTablePagination" },
    { subpath: "drawer", surface: DrawerSurface, name: "DrawerOverlay" },
    { subpath: "drawer", surface: DrawerSurface, name: "DrawerPortal" },
    { subpath: "progress", surface: ProgressSurface, name: "ProgressDefault" },
    { subpath: "progress", surface: ProgressSurface, name: "ProgressGradient" },
    { subpath: "progress", surface: ProgressSurface, name: "ProgressLiquid" },
    { subpath: "progress", surface: ProgressSurface, name: "ProgressSectioned" },
    { subpath: "handmark", surface: HandMarkSurface, name: "InkMark" },
    { subpath: "select", surface: SelectSurface, name: "SelectScrollUpButton" },
    { subpath: "select", surface: SelectSurface, name: "SelectScrollDownButton" },
] as const;

const exactSubpathRuntimeSurfaces = [
    {
        subpath: "instrument-chassis",
        surface: InstrumentChassisSurface,
        names: ["InstrumentChassis"],
    },
    {
        subpath: "surface",
        surface: SurfacePackage,
        names: ["Surface"],
    },
    {
        subpath: "metric",
        surface: MetricSurface,
        names: ["Metric", "MetricCell", "MetricRow", "MetricStack"],
    },
    {
        subpath: "labeled-field",
        surface: LabeledFieldSurface,
        names: [
            "LabeledField",
            "LabeledInput",
            "LabeledSelect",
            "LabeledSlider",
            "LabeledSwitch",
        ],
    },
    {
        subpath: "command",
        surface: CommandSurface,
        names: [
            "Command",
            "CommandDialog",
            "CommandEmpty",
            "CommandGroup",
            "CommandInput",
            "CommandItem",
            "CommandList",
            "CommandSeparator",
            "CommandShortcut",
        ],
    },
    {
        subpath: "dropdown-menu",
        surface: DropdownMenuSurface,
        names: [
            "DropdownMenu",
            "DropdownMenuCheckboxItem",
            "DropdownMenuContent",
            "DropdownMenuGroup",
            "DropdownMenuItem",
            "DropdownMenuLabel",
            "DropdownMenuRadioGroup",
            "DropdownMenuRadioItem",
            "DropdownMenuSeparator",
            "DropdownMenuShortcut",
            "DropdownMenuSub",
            "DropdownMenuSubContent",
            "DropdownMenuSubTrigger",
            "DropdownMenuTrigger",
        ],
    },
    {
        subpath: "dock",
        surface: Dock,
        // added the dock-context canonical DI primitives so
        // consumers can migrate from the retired pre- string keys
        // without reaching for the deep-import path. The DOCK_CONTEXT_KEY
        // symbol + 3 helpers join the SFC default-exports here.
        //
        // Regenerated from disk. The retired DockIconButton /
        // DockTabButton / DockSelectTrigger / DockDropdownTrigger / DockPopoverTrigger
        // fold onto DockControl + DockTrigger (the survivors); the fission
        // (DOCK_SPLIT_SIGNATURES / useDockFission), the V↔H morph
        // (useDockOrientationMorph), and the Siri island (SIRI_* / SiriDockCapability /
        // useSiriDock) are DEFINITION-ABSENT. This list is EXACT to
        // the `@mkbabb/glass-ui/dock` runtime barrel.
        names: [
            "DOCK_CONTEXT_KEY",
            "DockBackgroundToggle",
            // The ONE dock control (folds the
            // retired DockIconButton + DockTabButton onto a shape axis).
            "DockControl",
            // The thin controlled face-swap core.
            "DockCrossfade",
            "DockLayer",
            "DockLayerGroup",
            // The orientation+layout-aware divider primitive.
            "DockSeparator",
            // The ONE overlay trigger (folds the
            // retired DockSelectTrigger/DockDropdownTrigger/DockPopoverTrigger onto the
            // shared `.dock-trigger` recipe).
            "DockTrigger",
            "GlassDock",
            // The external-CTA-morphs-into-dock receive seam
            // (the /motion export STAYS — a re-export, not a move).
            "useDockCtaReceive",
            // The dock-as-native-dynamic-search-bar seam.
            "useDockSearch",
            "provideDockContext",
            "useDockContext",
            "useOptionalDockContext",
        ],
    },
] as const;

describe("public runtime surface", () => {
    it("keeps the package subpath cut exact", () => {
        const manifest = JSON.parse(readFileSync("package.json", "utf8"));
        expect(manifest.exports).toHaveProperty("./metric");
        expect(manifest.typesVersions["*"]).toHaveProperty("metric");
        for (const retired of [
            "notification",
            "color-swatch",
            "focus-scope",
            "spa-view",
            "icon-tooltip",
            "icon-chip",
            "metric-badge",
            "metric-cell",
            "metric-stack",
        ]) {
            expect(manifest.exports).not.toHaveProperty(`./${retired}`);
            expect(manifest.typesVersions["*"]).not.toHaveProperty(retired);
        }
    });

    it("keeps the exact root runtime surface", () => {
        expect(Object.keys(Glass).sort()).toEqual([...rootRuntimeExports].sort());
    });

    it("keeps the Blob renderer implementation private", () => {
        expect(BlobSurface).not.toHaveProperty("useMetaballRenderer");
    });

    it.each(subpathRuntimeExports)(
        "exports $subpath subpath symbol $name",
        ({ surface, name }) => {
            expect(surface).toHaveProperty(name);
        },
    );

    it.each(retiredSubpathRuntimeMembers)(
        "does not export retired $subpath member $name",
        ({ surface, name }) => {
            expect(surface).not.toHaveProperty(name);
        },
    );

    it.each(exactSubpathRuntimeSurfaces)(
        "keeps exact $subpath runtime surface",
        ({ surface, names }) => {
            expect(Object.keys(surface).sort()).toEqual([...names].sort());
        },
    );
});
