import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import * as Api from "../src/api";
import * as Aurora from "../src/aurora";
import * as CarouselSurface from "../src/carousel";
import * as ConfirmDialogSurface from "../src/confirm-dialog";
import * as Glass from "../src/index";
import * as Controls from "../src/controls";
import * as Dark from "../src/dark";
import * as Dock from "../src/dock";
import * as ExpandableContainerSurface from "../src/expandable-container";
import * as Forms from "../src/forms";
import * as GlassCarouselSurface from "../src/glass-carousel";
import * as GlassPanelSurface from "../src/glass-panel";
import * as IconTooltipSurface from "../src/icon-tooltip";
import * as InfiniteScrollSurface from "../src/infinite-scroll";
import * as Keyboard from "../src/keyboard";
import * as LabeledFieldSurface from "../src/labeled-field";
import * as MetaballsSurface from "../src/metaballs";
import * as MetricBadgeSurface from "../src/metric-badge";
import * as PaperBackdropSurface from "../src/paper-backdrop";
import * as PulseSurface from "../src/pulse";
import * as Search from "../src/search";
import * as Sidebar from "../src/sidebar";
import * as SortableListSurface from "../src/sortable-list";
import * as StackedIconsSurface from "../src/stacked-icons";
import * as StatusDotSurface from "../src/status-dot";
import * as TabsSurface from "../src/tabs";
import * as TimelineSurface from "../src/timeline";
import * as ToggleChipSurface from "../src/toggle-chip";
import * as TypewriterSurface from "../src/typewriter";

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
    "Drawer",
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
    "Tabs",
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
const composableRuntimeExports = [
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
    { subpath: "glass-carousel", surface: GlassCarouselSurface, name: "GlassCarousel" },
    { subpath: "glass-carousel", surface: GlassCarouselSurface, name: "GlassCarouselItem" },
    { subpath: "aurora", surface: Aurora, name: "Aurora" },
    { subpath: "aurora", surface: Aurora, name: "useAurora" },
    { subpath: "metric-badge", surface: MetricBadgeSurface, name: "MetricBadge" },
    { subpath: "status-dot", surface: StatusDotSurface, name: "StatusDot" },
    { subpath: "pulse", surface: PulseSurface, name: "Pulse" },
    { subpath: "paper-backdrop", surface: PaperBackdropSurface, name: "PaperBackdrop" },
    { subpath: "toggle-chip", surface: ToggleChipSurface, name: "ToggleChip" },
    { subpath: "glass-panel", surface: GlassPanelSurface, name: "GlassPanel" },
    { subpath: "metaballs", surface: MetaballsSurface, name: "MetaballCanvas" },
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
    { subpath: "keyboard", surface: Keyboard, name: "registerShortcut" },
    { subpath: "keyboard", surface: Keyboard, name: "useRegisteredShortcuts" },
    { subpath: "keyboard", surface: Keyboard, name: "formatCombo" },
    { subpath: "keyboard", surface: Keyboard, name: "isMac" },
    // L.W1 — api/ discovery layer (canonical constants; types erase)
    { subpath: "api", surface: Api, name: "MAX_NUCLEI" },
    { subpath: "api", surface: Api, name: "MAX_STOPS" },
    { subpath: "api", surface: Api, name: "DEFAULT_AURORA_CONFIG" },
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
    "StatusDot",
    "Pulse",
    "PaperBackdrop",
    "UnderlineTabs",
    "BouncyToggle",
    "TypewriterText",
    "StackedIconGroup",
    "ToggleChip",
    "GlassCarousel",
    "Aurora",
    "GlassPanel",
    "MetaballCanvas",
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
];

const exactSubpathRuntimeSurfaces = [
    {
        subpath: "dock",
        surface: Dock,
        names: [
            "DockDropdownTrigger",
            "DockIconButton",
            "DockLayer",
            "DockLayerGroup",
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
    ["src/composables/keyboard.ts", "ShortcutOptions"],
    ["src/composables/keyboard.ts", "RegisteredShortcut"],
    ["src/composables/useTouchGate.ts", "TouchGateReturn"],
    ["src/composables/sortable/useSortable.ts", "UseSortableReturn"],
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
