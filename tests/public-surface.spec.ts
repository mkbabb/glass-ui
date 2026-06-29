import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { readMonolith } from "../scripts/read-css-monoliths.mjs";
import * as Api from "@glass/api";
import * as Aurora from "@glass/subpaths/aurora";
import * as CarouselSurface from "@glass/carousel";
import * as CommandSurface from "@glass/subpaths/command";
import * as ConfirmDialogSurface from "@glass/subpaths/confirm-dialog";
import * as ContextMenuSurface from "@glass/subpaths/context-menu";
import * as Glass from "@glass/index";
import * as Controls from "@glass/subpaths/controls";
import * as Dark from "@glass/dark";
import * as DataTableSurface from "@glass/subpaths/data-table";
import * as Dock from "@glass/subpaths/dock";
import * as DrawerSurface from "@glass/subpaths/drawer";
import * as DropdownMenuSurface from "@glass/subpaths/dropdown-menu";
import * as ExpandableContainerSurface from "@glass/subpaths/expandable-container";
import * as Forms from "@glass/forms";
import * as IconTooltipSurface from "@glass/subpaths/icon-tooltip";
import * as InfiniteScrollSurface from "@glass/infinite-scroll";
import * as Keyboard from "@glass/keyboard";
import * as LabeledFieldSurface from "@glass/subpaths/labeled-field";
import * as MetricBadgeSurface from "@glass/subpaths/metric-badge";
import * as Motion from "@glass/motion";
import * as MotionCore from "@glass/motion-core";
import * as PaperBackdropSurface from "@glass/subpaths/paper-backdrop";
import * as PopoverSurface from "@glass/subpaths/popover";
import * as PulseSurface from "@glass/subpaths/pulse";
import * as Search from "@glass/subpaths/search";
import * as SelectSurface from "@glass/subpaths/select";
import * as Sidebar from "@glass/sidebar";
import * as SortableListSurface from "@glass/subpaths/sortable-list";
import * as StackedIconsSurface from "@glass/subpaths/stacked-icons";
import * as StatusDotSurface from "@glass/subpaths/status-dot";
import * as TabsSurface from "@glass/subpaths/tabs";
import * as TimelineSurface from "@glass/subpaths/timeline";
import * as ToggleChipSurface from "@glass/subpaths/toggle-chip";
import * as TypewriterSurface from "@glass/subpaths/typewriter";

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
    "ContextMenu",
    "DataTable",
    "Dialog",
    "DropdownMenu",
    "HoverCard",
    "Label",
    "MetricPill",
    "MultiSelect",
    "Notification",
    "NumberField",
    "Popover",
    "Progress",
    "RadioGroup",
    "Select",
    "Separator",
    "Sheet",
    "Skeleton",
    "Slider",
    "Switch",
    "Table",
    // BA.W-TABS — `ui/Tabs` (the reka wrapper family) LEFT the public root barrel
    // (the canonical panel-nav surface is now `<SegmentedTabs variant="underline">`
    // on `@mkbabb/glass-ui/tabs`; the reka substrate stays INTERNAL for the dock-rail
    // consumer only). The retirement is asserted in nonCoreRootRetirements below.
    "TagsInput",
    "Toast",
    "Toggle",
    "ToggleGroup",
    "Tooltip",
];

// L.W1 — vueuse-bearing form primitives (Input, Textarea, Combobox*) and the
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
    // AZ.W-PRUNE2 (E4-3) — useGlassRenderer/createGlassFilter/destroyGlassFilter
    // retired off the root barrel (the detection-cascade cluster; its binary
    // consumer GlassPanel retired at the AY prune, no second consumer).
    "useSortable",
    // O.W6 Lane A — useClipboard composable promotion.
    // P.W5 Lane A.1 — copyToClipboard bare co-export (Path B). Both must
    // remain root-barrel reachable so value.js's 19-site bulk import flip
    // can rename from `useClipboard from "../composables/useClipboard"`
    // → `copyToClipboard from "@mkbabb/glass-ui"`.
    "useClipboard",
    "copyToClipboard",
];

const subpathRuntimeExports = [
    { subpath: "dock", surface: Dock, name: "GlassDock" },
    { subpath: "dock", surface: Dock, name: "DockIconButton" },
    { subpath: "dock", surface: Dock, name: "DockBackgroundToggle" },
    { subpath: "dock", surface: Dock, name: "DockLayer" },
    { subpath: "dock", surface: Dock, name: "DockLayerGroup" },
    { subpath: "dock", surface: Dock, name: "DockTabButton" },
    { subpath: "dock", surface: Dock, name: "DockSelectTrigger" },
    { subpath: "dock", surface: Dock, name: "DockDropdownTrigger" },
    { subpath: "dock", surface: Dock, name: "DockSeparator" },
    // Drawer moved OFF the root barrel to the /drawer subpath (BB.W-DRAWER-ABROGATE
    // — keyframes-bearing heavy component, dock/aurora isolation pattern).
    { subpath: "drawer", surface: DrawerSurface, name: "Drawer" },
    { subpath: "drawer", surface: DrawerSurface, name: "DrawerContent" },
    { subpath: "drawer", surface: DrawerSurface, name: "DrawerTrigger" },
    { subpath: "drawer", surface: DrawerSurface, name: "DrawerOverlay" },
    { subpath: "drawer", surface: DrawerSurface, name: "DrawerHeader" },
    { subpath: "drawer", surface: DrawerSurface, name: "DrawerFooter" },
    { subpath: "drawer", surface: DrawerSurface, name: "DrawerTitle" },
    { subpath: "drawer", surface: DrawerSurface, name: "DrawerDescription" },
    { subpath: "drawer", surface: DrawerSurface, name: "DrawerClose" },
    { subpath: "search", surface: Search, name: "FuzzySearch" },
    { subpath: "search", surface: Search, name: "useFuzzySearch" },
    // AI.W5-δ — `ProgressiveSidebar` SFC retired (Path B archive per
    // G-AI-D26). The `./sidebar` subpath now surfaces composables only.
    { subpath: "sidebar", surface: Sidebar, name: "useScrollTracker" },
    { subpath: "sidebar", surface: Sidebar, name: "useSidebarFollow" },
    { subpath: "sidebar", surface: Sidebar, name: "useTreeIndex" },
    { subpath: "sidebar", surface: Sidebar, name: "buildTreeIndex" },
    { subpath: "controls", surface: Controls, name: "DarkModeToggle" },
    { subpath: "confirm-dialog", surface: ConfirmDialogSurface, name: "ConfirmDialog" },
    { subpath: "infinite-scroll", surface: InfiniteScrollSurface, name: "InfiniteScroll" },
    { subpath: "infinite-scroll", surface: InfiniteScrollSurface, name: "useInfiniteScroll" },
    { subpath: "tabs", surface: TabsSurface, name: "SegmentedTabs" },
    { subpath: "typewriter", surface: TypewriterSurface, name: "TypewriterText" },
    { subpath: "typewriter", surface: TypewriterSurface, name: "useTypewriter" },
    { subpath: "stacked-icons", surface: StackedIconsSurface, name: "StackedIconGroup" },
    { subpath: "aurora", surface: Aurora, name: "Aurora" },
    { subpath: "aurora", surface: Aurora, name: "useAurora" },
    { subpath: "metric-badge", surface: MetricBadgeSurface, name: "MetricBadge" },
    { subpath: "status-dot", surface: StatusDotSurface, name: "StatusDot" },
    { subpath: "pulse", surface: PulseSurface, name: "Pulse" },
    { subpath: "paper-backdrop", surface: PaperBackdropSurface, name: "PaperBackdrop" },
    { subpath: "toggle-chip", surface: ToggleChipSurface, name: "ToggleChip" },
    { subpath: "sortable-list", surface: SortableListSurface, name: "SortableList" },
    { subpath: "timeline", surface: TimelineSurface, name: "GlassTimeline" },
    { subpath: "labeled-field", surface: LabeledFieldSurface, name: "LabeledInput" },
    { subpath: "expandable-container", surface: ExpandableContainerSurface, name: "ExpandableContainer" },
    { subpath: "icon-tooltip", surface: IconTooltipSurface, name: "IconTooltip" },
    // L.W1 — vueuse-bearing subpaths (new in v1.0)
    { subpath: "forms", surface: Forms, name: "Input" },
    { subpath: "forms", surface: Forms, name: "Textarea" },
    { subpath: "forms", surface: Forms, name: "Combobox" },
    { subpath: "forms", surface: Forms, name: "ComboboxInput" },
    { subpath: "carousel", surface: CarouselSurface, name: "useCarousel" },
    { subpath: "dark", surface: Dark, name: "useGlobalDark" },
    // AP.W3 R0G-7 — installDarkModeSync (keyframes-free, vueuse-bearing) relocated
    // from /motion to /dark (its vueuse home).
    { subpath: "dark", surface: Dark, name: "installDarkModeSync" },
    { subpath: "keyboard", surface: Keyboard, name: "registerShortcut" },
    { subpath: "keyboard", surface: Keyboard, name: "useRegisteredShortcuts" },
    { subpath: "keyboard", surface: Keyboard, name: "formatCombo" },
    { subpath: "keyboard", surface: Keyboard, name: "isMac" },
    // L.W1 — api/ discovery layer (canonical constants; types erase)
    { subpath: "api", surface: Api, name: "MAX_NUCLEI" },
    { subpath: "api", surface: Api, name: "MAX_STOPS" },
    { subpath: "api", surface: Api, name: "DEFAULT_AURORA_CONFIG" },
    // keyframes.js-BEARING motion composables on the `/motion` subpath.
    { subpath: "motion", surface: Motion, name: "useNumericTransition" },
    { subpath: "motion", surface: Motion, name: "useAnimatedNumber" },
    // AP.W3 R0G-7 — the keyframes-FREE leaves carved to the flat `/motion-core`
    // subpath (a cheap-leaf import no longer statically reaches the keyframes
    // engine). `constants` (DAMPING/SNAP_THRESHOLD) is duplicate-exported on both.
    { subpath: "motion-core", surface: MotionCore, name: "useStaggerReveal" },
    { subpath: "motion-core", surface: MotionCore, name: "useScrollProgress" },
    { subpath: "motion-core", surface: MotionCore, name: "useRAFLoop" },
    { subpath: "motion-core", surface: MotionCore, name: "useIntersectionPause" },
    // AQ.W3 §6 — the INP-under-load lever. Engine-free (`/motion-core`).
    { subpath: "motion-core", surface: MotionCore, name: "useYieldToMain" },
    { subpath: "motion-core", surface: MotionCore, name: "yieldToMain" },
    { subpath: "motion", surface: Motion, name: "DAMPING" },
    { subpath: "motion", surface: Motion, name: "SNAP_THRESHOLD" },
    { subpath: "motion-core", surface: MotionCore, name: "DAMPING" },
    { subpath: "motion-core", surface: MotionCore, name: "SNAP_THRESHOLD" },
    // AL.W4 — sub-barrel publishing phase 2 (G-AL-D7 ABSORB). Six remaining
    // `ui/` primitive families speedtest still imports from the root barrel
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
    { subpath: "data-table", surface: DataTableSurface, name: "DataTablePagination" },
    { subpath: "dropdown-menu", surface: DropdownMenuSurface, name: "DropdownMenu" },
    { subpath: "dropdown-menu", surface: DropdownMenuSurface, name: "DropdownMenuContent" },
    { subpath: "dropdown-menu", surface: DropdownMenuSurface, name: "DropdownMenuItem" },
    { subpath: "dropdown-menu", surface: DropdownMenuSurface, name: "DropdownMenuTrigger" },
    { subpath: "dropdown-menu", surface: DropdownMenuSurface, name: "DropdownMenuPortal" },
    { subpath: "context-menu", surface: ContextMenuSurface, name: "ContextMenu" },
    { subpath: "context-menu", surface: ContextMenuSurface, name: "ContextMenuContent" },
    { subpath: "context-menu", surface: ContextMenuSurface, name: "ContextMenuItem" },
    { subpath: "context-menu", surface: ContextMenuSurface, name: "ContextMenuTrigger" },
    { subpath: "command", surface: CommandSurface, name: "Command" },
    { subpath: "command", surface: CommandSurface, name: "CommandDialog" },
    { subpath: "command", surface: CommandSurface, name: "CommandInput" },
    { subpath: "command", surface: CommandSurface, name: "CommandList" },
    { subpath: "command", surface: CommandSurface, name: "CommandItem" },
] as const;

const nonCoreRootRetirements = [
    "GlassDock",
    "DockIconButton",
    "DockBackgroundToggle",
    "FuzzySearch",
    "ProgressiveSidebar",
    "DarkModeToggle",
    "ConfirmDialog",
    "InfiniteScroll",
    "MetricBadge",
    "StatusDot",
    "Pulse",
    "PaperBackdrop",
    "SegmentedTabs",
    // BA.W-TABS — the reka `ui/Tabs` wrapper family is OFF the root barrel (clean break,
    // no alias; `SegmentedTabs` via `/tabs` is the canonical surface).
    "Tabs",
    "TypewriterText",
    "StackedIconGroup",
    "ToggleChip",
    "Aurora",
    "SortableList",
    "GlassTimeline",
    "LabeledInput",
    "ExpandableContainer",
    "IconTooltip",
    "useDockState",
    "useLayerTransition",
    "isTeleportedTarget",
    "useTreeIndex",
    "buildTreeIndex",
    // L.W1 — root-barrel Phase 2 retirements (vueuse-bearing SCC closure)
    "Input",
    "Textarea",
    "Combobox",
    "ComboboxInput",
    "ComboboxRoot",
    "Carousel",
    "CarouselItem",
    "useCarousel",
    "useGlobalDark",
    "isMac",
    "formatCombo",
    "formatComboParts",
    "registerShortcut",
    "useRegisteredShortcuts",
    // root-barrel keyframes.js SCC closure — motion composables live on `/motion`.
    "useNumericTransition",
    "useAnimatedNumber",
    "useStaggerReveal",
    "useScrollProgress",
    "useRAFLoop",
    "useIntersectionPause",
    "installDarkModeSync",
    "DAMPING",
    "SNAP_THRESHOLD",
];

const exactSubpathRuntimeSurfaces = [
    {
        subpath: "dock",
        surface: Dock,
        // P.W1 Lane B added the dock-context canonical DI primitives so
        // consumers can migrate from the retired pre-O.W2 string keys
        // without reaching for the deep-import path. The DOCK_CONTEXT_KEY
        // symbol + 3 helpers join the SFC default-exports here.
        //
        // AX.W01 added `useLayerTransition` to the `/dock` barrel (the rebuilt
        // single-scalar primitive `<DockLayerGroup>` already composes; the
        // re-export lets value.js delete its FLIP-width fork). The W02 morph
        // symbols (DOCK_MORPH_KEY / provideDockMorphContext / …) stay INTERNAL
        // to the composables barrel — NOT re-exported on the `/dock` surface.
        names: [
            "DOCK_CONTEXT_KEY",
            // BE.W-DOCK-FISSION — the n-ary detach orchestrator + the per-signature
            // split-vector registry, ADDITIVELY on the /dock surface (the dock-as-
            // control-interface liquid-morph register). Runtime composable + const.
            "DOCK_SPLIT_SIGNATURES",
            "DockBackgroundToggle",
            "DockDropdownTrigger",
            "DockIconButton",
            "DockLayer",
            "DockLayerGroup",
            // BD impl P-dock — the popover-trigger dock control primitive.
            "DockPopoverTrigger",
            // BA.W-DOCK-SECTIONS — the declarative tripartite section dock chassis
            // (the descriptor-driven <DockSection> the shell docks compose; the
            // W-SHELL-RAIL-RESEAT re-seat consumer). Runtime SFC default-export.
            "DockSection",
            "DockSelectTrigger",
            // AX.W45 D13-c — the orientation+layout-aware divider primitive.
            "DockSeparator",
            // BC.W-DOCK-STACK-RAIL — the macOS hover-expand stack rail (the clean-break
            // rebuild of the retired divider-carousel <DockRail>). Runtime SFC default-export.
            "DockStack",
            "DockTabButton",
            "GlassDock",
            // BD.W-MORPH-FIELD-WELD — the ONE library metaball <filter> mount (the DRY
            // union of the prior four goo mounts incl. the retired DockGooFilter; off one
            // byte-identical sRGB graph at shell root). Runtime SFC default-export.
            "GooFilter",
            // BC.W-AX-DOCK-CTA-SEAT — the external-CTA-morphs-into-dock receive seam +
            // the [data-cta-pending] landing-seat API (setPending/clearPending/pending),
            // ADDITIVELY re-exported on the /dock subpath as the natural home beside
            // GlassDock/useDockState (the /motion export STAYS — a re-export, not a move,
            // so no clean break). The AX.W01 useLayerTransition precedent (above).
            "useDockCtaReceive",
            // BE.W-DOCK-FISSION — the n-ary detach orchestrator (ONE SpringProgress on
            // DOCK_SPRING writing --dock-split-t + per-piece direction vectors; a
            // consuming seam BESIDE the morph engine). ADDITIVELY on the /dock surface.
            "useDockFission",
            // AZ.W-MORPH-SHOWCASE — the V↔H liquid-glass morph driver (consumer #1
            // of useLiquidFlex; the metaball-bridge / arm-c crossfade showcase).
            "useDockOrientationMorph",
            // BC.W-DOCK-SEARCH — the dock-as-native-dynamic-search-bar seam
            // (composes useDockState + the /search fuzzy pipeline + the dock
            // --dock-morph-t metaball morph; <GlassDock search> opts into it).
            "useDockSearch",
            "provideDockContext",
            "useDockContext",
            "useLayerTransition",
            "useOptionalDockContext",
        ],
    },
] as const;

const typeSurfaceChecks = [
    // AZ.W-PRUNE2 (E4-3) — the useGlassRenderer cluster (GlassTier/GlassFilterState)
    // retired; the source file is deleted, so no type-surface row anchors it.
    ["src/composables/motion/useAnimatedNumber.ts", "AnimatedNumber"],
    ["src/composables/motion/useAnimatedNumber.ts", "UseAnimatedNumberOptions"],
    ["src/composables/motion/useNumericTransition.ts", "SpringSnapshot"],
    ["src/composables/motion/useNumericTransition.ts", "UseNumericTransitionOptions"],
    ["src/composables/keyboard/useKeyboardShortcuts.ts", "ShortcutOptions"],
    ["src/composables/keyboard/useKeyboardShortcuts.ts", "RegisteredShortcut"],
    ["src/composables/dom/useTouchGate.ts", "TouchGateReturn"],
    ["src/composables/sortable/useSortable.ts", "UseSortableReturn"],
];

const rootStyleChecks = [
    ["src/styles/utilities.css", ".metric-badge"],
    ["src/styles/utilities.css", "justify-content: center"],
    // AU.W8b carve: the control family (incl. the dark-mode-toggle sizes)
    // moved dock.css → dock-controls.css (nested); both ship via /styles.
    ["src/styles/dock-controls.css", ".dark-mode-toggle-button"],
    ["src/styles/dock-controls.css", "[data-size=\"sm\"]"],
];

const retiredRootUtilities = [
    ".active-scale",
    ".blue-shimmer",
    ".code-badge",
    ".disabled-base",
    ".inline-pill",
    ".progress-gradient",
    ".shimmer-text",
] as const;

// AY.W-CSS1 — tokens/glass/utilities.css are now thin @import roots over
// cohesion-carved partials. Read them as the concatenated cascade (the same
// `readMonolith` reader the W-CSS1 gates repointed to) so a declaration-scan
// keeps finding the rule it found in the pre-carve monolith. Non-carved files
// (SFCs) fall through to a plain read. AZ.W-CARVE extended the carve to
// theme.css + dock-controls.css — both join the composed read.
const CARVED_MONOLITHS: Record<string, string> = {
    "src/styles/tokens.css": "tokens",
    "src/styles/glass.css": "glass",
    "src/styles/utilities.css": "utilities",
    "src/styles/theme.css": "theme",
    "src/styles/dock-controls.css": "dock-controls",
};
function readStyle(file: string): string {
    const carved = CARVED_MONOLITHS[file];
    return carved ? readMonolith(process.cwd(), carved) : readFileSync(file, "utf8");
}

function readTokenNumber(name: string): number {
    const source = readStyle("src/styles/tokens.css");
    const match = source.match(new RegExp(`${name}:\\s*(\\d+);`));
    if (!match) throw new Error(`Missing ${name}`);
    return Number(match[1]);
}

describe("public runtime surface", () => {
    it.each(uiRuntimeExports)("exports ui package %s", (name) => {
        expect(Glass).toHaveProperty(name);
    });

    it.each(composableRuntimeExports)("exports composable or utility %s", (name) => {
        expect(Glass).toHaveProperty(name);
    });

    it.each(subpathRuntimeExports)("exports $subpath subpath symbol $name", ({ surface, name }) => {
        expect(surface).toHaveProperty(name);
    });

    it.each(nonCoreRootRetirements)("does not export non-core root symbol %s", (name) => {
        expect(Glass).not.toHaveProperty(name);
    });

    it.each(exactSubpathRuntimeSurfaces)("keeps exact $subpath runtime surface", ({ surface, names }) => {
        expect(Object.keys(surface).sort()).toEqual([...names].sort());
    });
});

describe("public type surface", () => {
    it.each(typeSurfaceChecks)("keeps %s in %s", (file, symbol) => {
        expect(readFileSync(file, "utf8")).toContain(symbol);
    });
});

describe("root style surface", () => {
    it.each(rootStyleChecks)("keeps %s exporting %s", (file, selector) => {
        expect(readStyle(file)).toContain(selector);
    });

    it.each(retiredRootUtilities)("does not re-export retired utility %s", (selector) => {
        expect(readStyle("src/styles/utilities.css")).not.toContain(selector);
    });

    it("keeps utility shimmer/progress aliases off undefined local tokens", () => {
        const utilities = readStyle("src/styles/utilities.css");

        expect(utilities).not.toContain("--shimmer-blue-");
        expect(utilities).not.toContain("--shimmer-duration");
        expect(utilities).not.toContain(".progress-gradient");
    });

    it("keeps glass primitives on explicit tokenized transitions", () => {
        const glass = readStyle("src/styles/glass.css");

        expect(glass).not.toMatch(/transition:\s*all\b/);
        expect(glass).not.toMatch(/var\(--duration-fast\)\s+ease\b/);
    });

    it("routes toast and notification stacking through z tokens", () => {
        const notification = readFileSync("src/components/ui/notification/Notification.vue", "utf8");
        const toaster = readFileSync("src/components/ui/toast/Toaster.vue", "utf8");

        expect(notification).toContain("z-toast");
        expect(toaster).toContain("z-toast");
        expect(notification).not.toContain("z-50");
        expect(toaster).not.toContain("z-50");
        expect(notification).not.toMatch(/transition:\s*all\b/);
    });

    it("keeps hovercard and tooltip above app chrome tiers", () => {
        expect(readTokenNumber("--z-hovercard")).toBeGreaterThan(readTokenNumber("--z-header"));
        expect(readTokenNumber("--z-hovercard")).toBeGreaterThan(readTokenNumber("--z-dock"));
        expect(readTokenNumber("--z-tooltip")).toBeGreaterThan(readTokenNumber("--z-dock"));
        expect(readTokenNumber("--z-popover")).toBeGreaterThan(readTokenNumber("--z-hovercard"));
        expect(readTokenNumber("--z-modal")).toBeGreaterThan(readTokenNumber("--z-popover"));
        expect(readTokenNumber("--z-toast")).toBeGreaterThan(readTokenNumber("--z-modal"));
    });

    it("maps floating z-index utilities through root tokens", () => {
        const theme = readStyle("src/styles/theme.css");

        expect(theme).toContain("--z-index-hovercard: var(--z-hovercard);");
        expect(theme).toContain("--z-index-tooltip: var(--z-tooltip);");
        expect(theme).toContain("--z-index-popover: var(--z-popover);");
    });
});
