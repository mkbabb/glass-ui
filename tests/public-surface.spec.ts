import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import * as Api from "../src/api";
import * as Aurora from "../src/aurora";
import * as CarouselSurface from "../src/carousel";
import * as CommandSurface from "../src/command";
import * as ConfirmDialogSurface from "../src/confirm-dialog";
import * as ContextMenuSurface from "../src/context-menu";
import * as Glass from "../src/index";
import * as Controls from "../src/controls";
import * as Dark from "../src/dark";
import * as DataTableSurface from "../src/data-table";
import * as Dock from "../src/dock";
import * as DropdownMenuSurface from "../src/dropdown-menu";
import * as ExpandableContainerSurface from "../src/expandable-container";
import * as Forms from "../src/forms";
import * as GlassCarouselSurface from "../src/glass-carousel";
import * as GlassPanelSurface from "../src/glass-panel";
import * as IconTooltipSurface from "../src/icon-tooltip";
import * as InfiniteScrollSurface from "../src/infinite-scroll";
import * as Keyboard from "../src/keyboard";
import * as LabeledFieldSurface from "../src/labeled-field";
import * as MetricBadgeSurface from "../src/metric-badge";
import * as Motion from "../src/motion";
import * as MotionCore from "../src/motion-core";
import * as PaperBackdropSurface from "../src/paper-backdrop";
import * as PopoverSurface from "../src/popover";
import * as PulseSurface from "../src/pulse";
import * as Search from "../src/search";
import * as SelectSurface from "../src/select";
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
//
// keyframes.js-bearing motion composables (`useNumericTransition`,
// `useStaggerReveal`, `useScrollProgress`,
// `useAnimatedNumber`, `useAnimatedNumberMap`, `useStagger`, `useRAFLoop`,
// `useIntersectionPause`, `installDarkModeSync`, `DAMPING`, `SNAP_THRESHOLD`)
// moved to `/motion`. Root barrel no longer reaches `@mkbabb/keyframes.js`
// statically.
const composableRuntimeExports = [
    "useTouchGate",
    "useTimer",
    "useInterval",
    "useGlassRenderer",
    "createGlassFilter",
    "destroyGlassFilter",
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
    { subpath: "dock", surface: Dock, name: "DockLayer" },
    { subpath: "dock", surface: Dock, name: "DockLayerGroup" },
    { subpath: "dock", surface: Dock, name: "DockTabButton" },
    { subpath: "dock", surface: Dock, name: "DockSelectTrigger" },
    { subpath: "dock", surface: Dock, name: "DockDropdownTrigger" },
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
    { subpath: "motion", surface: Motion, name: "useAnimatedNumberMap" },
    // AP.W3 R0G-7 — the keyframes-FREE leaves carved to the flat `/motion-core`
    // subpath (a cheap-leaf import no longer statically reaches the keyframes
    // engine). `constants` (DAMPING/SNAP_THRESHOLD) is duplicate-exported on both.
    { subpath: "motion-core", surface: MotionCore, name: "useStagger" },
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
    "useAnimatedNumberMap",
    "useStagger",
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
        names: [
            "DOCK_CONTEXT_KEY",
            "DockDropdownTrigger",
            "DockIconButton",
            "DockLayer",
            "DockLayerGroup",
            "DockSelectTrigger",
            "DockTabButton",
            "GlassDock",
            "provideDockContext",
            "useDockContext",
            "useOptionalDockContext",
        ],
    },
] as const;

const typeSurfaceChecks = [
    ["src/composables/glass/useGlassRenderer.ts", "GlassFilterState"],
    ["src/composables/glass/useGlassRenderer.ts", "GlassTier"],
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
