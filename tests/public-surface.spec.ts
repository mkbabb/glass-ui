import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import * as Glass from "@/index";

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
    "Textarea",
    "Toast",
    "Toggle",
    "ToggleGroup",
    "Tooltip",
];

const customRuntimeExports = [
    "Aurora",
    "ConfirmDialog",
    "DarkModeToggle",
    "GlassDock",
    "DockIconButton",
    "DockLayer",
    "DockLayerGroup",
    "ExpandableContainer",
    "GlassCarousel",
    "GlassPanel",
    "IconTooltip",
    "InfiniteScroll",
    "LabeledInput",
    "MetaballCanvas",
    "MetricBadge",
    "PaperBackdrop",
    "Pulse",
    "FuzzySearch",
    "ProgressiveSidebar",
    "SortableList",
    "StackedIconGroup",
    "StatusDot",
    "UnderlineTabs",
    "GlassTimeline",
    "ToggleChip",
    "TypewriterText",
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
    "useOffsetPagination",
    "useSortable",
    "useInfiniteScroll",
    "useWindowedStore",
    "buildSectionLayout",
    "resolveSectionWindow",
    "resolveActiveSection",
    "findSectionOffset",
    "useVirtualSectionWindow",
    "useSidebarState",
    "useTreeIndex",
    "buildTreeIndex",
    "isActive",
    "isInActiveChain",
];

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

describe("public runtime surface", () => {
    it.each(uiRuntimeExports)("exports ui package %s", (name) => {
        expect(Glass).toHaveProperty(name);
    });

    it.each(customRuntimeExports)("exports custom package %s", (name) => {
        expect(Glass).toHaveProperty(name);
    });

    it.each(composableRuntimeExports)("exports composable or utility %s", (name) => {
        expect(Glass).toHaveProperty(name);
    });
});

describe("public type surface", () => {
    it.each(typeSurfaceChecks)("keeps %s in %s", (file, symbol) => {
        expect(readFileSync(file, "utf8")).toContain(symbol);
    });
});
