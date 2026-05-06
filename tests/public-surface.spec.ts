import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import * as Aurora from "@/aurora";
import * as ConfirmDialogSurface from "@/confirm-dialog";
import * as Glass from "@/index";
import * as Controls from "@/controls";
import * as Dock from "@/dock";
import * as ExpandableContainerSurface from "@/expandable-container";
import * as GlassCarouselSurface from "@/glass-carousel";
import * as IconTooltipSurface from "@/icon-tooltip";
import * as InfiniteScrollSurface from "@/infinite-scroll";
import * as LabeledFieldSurface from "@/labeled-field";
import * as MetricBadgeSurface from "@/metric-badge";
import * as Pagination from "@/pagination";
import * as PulseSurface from "@/pulse";
import * as Search from "@/search";
import * as Sidebar from "@/sidebar";
import * as SortableListSurface from "@/sortable-list";
import * as StackedIconsSurface from "@/stacked-icons";
import * as TabsSurface from "@/tabs";
import * as TimelineSurface from "@/timeline";
import * as ToggleChipSurface from "@/toggle-chip";
import * as TypewriterSurface from "@/typewriter";
import * as Virtual from "@/virtual";

const uiRuntimeExports = [
    "Accordion",
    "Alert",
    "Avatar",
    "Badge",
    "Button",
    "Card",
    "Carousel",
    "Checkbox",
    "Collapsible",
    "Combobox",
    "Command",
    "ContextMenu",
    "DataTable",
    "Dialog",
    "Drawer",
    "DropdownMenu",
    "HoverCard",
    "Input",
    "Label",
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
    "Tabs",
    "Textarea",
    "Toast",
    "Toggle",
    "ToggleGroup",
    "Tooltip",
];

const composableRuntimeExports = [
    "useGlobalDark",
    "isMac",
    "formatCombo",
    "formatComboParts",
    "registerShortcut",
    "useRegisteredShortcuts",
    "useTouchGate",
    "useTimer",
    "useInterval",
    "useGlassRenderer",
    "createGlassFilter",
    "destroyGlassFilter",
    "useSpringOrchestrator",
    "useStaggerReveal",
    "useScrollProgress",
    "useAnimatedNumber",
    "useDarkModeSync",
    "useSortable",
];

const subpathRuntimeExports = [
    { subpath: "dock", surface: Dock, name: "GlassDock" },
    { subpath: "dock", surface: Dock, name: "DockIconButton" },
    { subpath: "dock", surface: Dock, name: "DockLayer" },
    { subpath: "dock", surface: Dock, name: "DockLayerGroup" },
    { subpath: "dock", surface: Dock, name: "DockPopover" },
    { subpath: "dock", surface: Dock, name: "DockTabButton" },
    { subpath: "dock", surface: Dock, name: "DockSelectTrigger" },
    { subpath: "dock", surface: Dock, name: "DockDropdownTrigger" },
    { subpath: "search", surface: Search, name: "FuzzySearch" },
    { subpath: "search", surface: Search, name: "useFuzzySearch" },
    { subpath: "sidebar", surface: Sidebar, name: "ProgressiveSidebar" },
    { subpath: "sidebar", surface: Sidebar, name: "useScrollTracker" },
    { subpath: "sidebar", surface: Sidebar, name: "useSidebarFollow" },
    { subpath: "sidebar", surface: Sidebar, name: "useTreeIndex" },
    { subpath: "sidebar", surface: Sidebar, name: "buildTreeIndex" },
    { subpath: "controls", surface: Controls, name: "DarkModeToggle" },
    { subpath: "confirm-dialog", surface: ConfirmDialogSurface, name: "ConfirmDialog" },
    { subpath: "infinite-scroll", surface: InfiniteScrollSurface, name: "InfiniteScroll" },
    { subpath: "infinite-scroll", surface: InfiniteScrollSurface, name: "useInfiniteScroll" },
    { subpath: "tabs", surface: TabsSurface, name: "UnderlineTabs" },
    { subpath: "tabs", surface: TabsSurface, name: "BouncyToggle" },
    { subpath: "typewriter", surface: TypewriterSurface, name: "TypewriterText" },
    { subpath: "typewriter", surface: TypewriterSurface, name: "useTypewriter" },
    { subpath: "stacked-icons", surface: StackedIconsSurface, name: "StackedIconGroup" },
    { subpath: "virtual", surface: Virtual, name: "useWindowedStore" },
    { subpath: "virtual", surface: Virtual, name: "useVirtualSectionWindow" },
    { subpath: "pagination", surface: Pagination, name: "useOffsetPagination" },
    { subpath: "glass-carousel", surface: GlassCarouselSurface, name: "GlassCarousel" },
    { subpath: "glass-carousel", surface: GlassCarouselSurface, name: "GlassCarouselItem" },
    { subpath: "aurora", surface: Aurora, name: "Aurora" },
    { subpath: "aurora", surface: Aurora, name: "useAurora" },
    { subpath: "metric-badge", surface: MetricBadgeSurface, name: "MetricBadge" },
    { subpath: "pulse", surface: PulseSurface, name: "Pulse" },
    { subpath: "toggle-chip", surface: ToggleChipSurface, name: "ToggleChip" },
    { subpath: "sortable-list", surface: SortableListSurface, name: "SortableList" },
    { subpath: "timeline", surface: TimelineSurface, name: "GlassTimeline" },
    { subpath: "labeled-field", surface: LabeledFieldSurface, name: "LabeledInput" },
    { subpath: "expandable-container", surface: ExpandableContainerSurface, name: "ExpandableContainer" },
    { subpath: "icon-tooltip", surface: IconTooltipSurface, name: "IconTooltip" },
] as const;

const nonCoreRootRetirements = [
    "GlassDock",
    "DockIconButton",
    "FuzzySearch",
    "ProgressiveSidebar",
    "DarkModeToggle",
    "ConfirmDialog",
    "InfiniteScroll",
    "MetricBadge",
    "Pulse",
    "UnderlineTabs",
    "BouncyToggle",
    "TypewriterText",
    "StackedIconGroup",
    "ToggleChip",
    "GlassCarousel",
    "Aurora",
    "SortableList",
    "GlassTimeline",
    "LabeledInput",
    "ExpandableContainer",
    "IconTooltip",
    "useDockState",
    "useLayerTransition",
    "isTeleportedTarget",
    "useWindowedStore",
    "useVirtualSectionWindow",
    "useOffsetPagination",
    "useTreeIndex",
    "buildTreeIndex",
];

const exactSubpathRuntimeSurfaces = [
    {
        subpath: "dock",
        surface: Dock,
        names: [
            "DOCK_KEEP_OPEN_SINK_KEY",
            "DockDropdownTrigger",
            "DockIconButton",
            "DockLayer",
            "DockLayerGroup",
            "DockPopover",
            "DockSelectTrigger",
            "DockTabButton",
            "GlassDock",
        ],
    },
] as const;

const typeSurfaceChecks = [
    ["src/composables/glass/useGlassRenderer.ts", "GlassFilterState"],
    ["src/composables/glass/useGlassRenderer.ts", "GlassTier"],
    ["src/composables/motion/useAnimatedNumber.ts", "AnimatedNumber"],
    ["src/composables/motion/useAnimatedNumber.ts", "UseAnimatedNumberOptions"],
    ["src/composables/motion/useSpringOrchestrator.ts", "SpringSnapshot"],
    ["src/composables/useKeyboardShortcuts.ts", "ShortcutOptions"],
    ["src/composables/useKeyboardShortcuts.ts", "RegisteredShortcut"],
    ["src/composables/useTouchGate.ts", "TouchGateReturn"],
    ["src/composables/sortable/useSortable.ts", "UseSortableReturn"],
    ["src/composables/virtual/virtualSectionLayout.ts", "ForcedSectionWindowRange"],
    ["src/composables/virtual/virtualSectionLayout.ts", "SectionLayout"],
    ["src/composables/virtual/virtualSectionLayout.ts", "SectionWindowRange"],
];

const rootStyleChecks = [
    ["src/styles/utilities.css", ".metric-badge"],
    ["src/styles/utilities.css", "justify-content: center"],
    ["src/styles/dock.css", ".dark-mode-toggle-button[data-size=\"sm\"]"],
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

function readTokenNumber(name: string): number {
    const source = readFileSync("src/styles/tokens.css", "utf8");
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
        expect(readFileSync(file, "utf8")).toContain(selector);
    });

    it.each(retiredRootUtilities)("does not re-export retired utility %s", (selector) => {
        expect(readFileSync("src/styles/utilities.css", "utf8")).not.toContain(selector);
    });

    it("keeps utility shimmer/progress aliases off undefined local tokens", () => {
        const utilities = readFileSync("src/styles/utilities.css", "utf8");

        expect(utilities).not.toContain("--shimmer-blue-");
        expect(utilities).not.toContain("--shimmer-duration");
        expect(utilities).not.toContain(".progress-gradient");
    });

    it("keeps glass primitives on explicit tokenized transitions", () => {
        const glass = readFileSync("src/styles/glass.css", "utf8");

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
        const theme = readFileSync("src/styles/theme.css", "utf8");

        expect(theme).toContain("--z-index-hovercard: var(--z-hovercard);");
        expect(theme).toContain("--z-index-tooltip: var(--z-tooltip);");
        expect(theme).toContain("--z-index-popover: var(--z-popover);");
    });
});
