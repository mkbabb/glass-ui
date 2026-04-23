/**
 * Story manifest — single source of truth for the storybook.
 *
 * Each row is one navigable page. `component` is a lazy import resolved via
 * `import.meta.glob`, so adding a story means creating its SFC at
 * `demo/stories/<category>/<id>.vue` and appending a row here.
 *
 * The manifest is consumed by `router.ts` (routes), `AppShell.vue` (dock rail
 * + carousel pager), and `useStoryNavigation` (current/next/prev).
 */
import type { Component } from "vue";
import {
    Compass,
    Shapes,
    Boxes,
    Navigation,
    Database,
    Bell,
    Sparkles,
    LayoutDashboard,
    type LucideIcon,
} from "lucide-vue-next";

export interface Story {
    id: string;
    title: string;
    blurb?: string;
    component: () => Promise<Component>;
    sourceFiles?: string[];
}

export interface Category {
    id: string;
    title: string;
    icon: LucideIcon;
    stories: Story[];
}

const modules = import.meta.glob<{ default: Component }>("./*/*.vue");

function lazy(category: string, id: string): () => Promise<Component> {
    const key = `./${category}/${id}.vue`;
    const loader = modules[key];
    if (!loader) {
        return () =>
            Promise.resolve({
                render: () => null,
                name: `MissingStory:${category}/${id}`,
            }) as Promise<Component>;
    }
    return () => loader().then((m) => m.default);
}

function s(cat: string, id: string, title: string, blurb?: string): Story {
    return { id, title, blurb, component: lazy(cat, id) };
}

export const CATEGORIES: Category[] = [
    {
        id: "foundations",
        title: "Foundations",
        icon: Compass,
        stories: [
            s("foundations", "intro", "Intro", "What this storybook is."),
            s("foundations", "colors", "Colors", "Warm cream, 13-stop section palette, viz basis."),
            s("foundations", "typography", "Typography", "Computer Modern, Fraunces, Fira Code — golden-ratio scale."),
            s("foundations", "radii", "Radii", "Radius tokens from xs to pill."),
            s("foundations", "shadows", "Shadows", "Cartoon offset, elevated, modal."),
            s("foundations", "motion", "Motion", "Easings, damped spring linear() curves."),
            s("foundations", "paper-glass", "Paper & Glass", "Four glass tiers, paper grain, blend modes."),
            s("foundations", "icons", "Icons", "Lucide, 2px stroke, semantic sizes."),
        ],
    },
    {
        id: "primitives",
        title: "Primitives",
        icon: Shapes,
        stories: [
            s("primitives", "buttons", "Buttons"),
            s("primitives", "inputs", "Inputs"),
            s("primitives", "textarea", "Textarea"),
            s("primitives", "checks", "Checkbox · Radio · Switch"),
            s("primitives", "slider", "Slider"),
            s("primitives", "number-field", "Number Field"),
            s("primitives", "select", "Select"),
            s("primitives", "combobox", "Combobox"),
            s("primitives", "multi-select", "Multi-Select"),
            s("primitives", "toggle", "Toggle · Toggle Group"),
            s("primitives", "label", "Label"),
            s("primitives", "badge", "Badge"),
            s("primitives", "metric-badge", "Metric Badge"),
            s("primitives", "status-dot", "Status Dot"),
            s("primitives", "pulse", "Pulse"),
            s("primitives", "separator", "Separator"),
        ],
    },
    {
        id: "containers",
        title: "Containers",
        icon: Boxes,
        stories: [
            s("containers", "card", "Card"),
            s("containers", "dialog", "Dialog"),
            s("containers", "sheet", "Sheet"),
            s("containers", "drawer", "Drawer"),
            s("containers", "popover", "Popover"),
            s("containers", "dropdown-menu", "Dropdown Menu"),
            s("containers", "context-menu", "Context Menu"),
            s("containers", "hover-card", "Hover Card"),
            s("containers", "tooltip", "Tooltip"),
            s("containers", "alert", "Alert"),
            s("containers", "accordion", "Accordion"),
            s("containers", "collapsible", "Collapsible"),
        ],
    },
    {
        id: "navigation",
        title: "Navigation",
        icon: Navigation,
        stories: [
            s("navigation", "tabs", "Tabs"),
            s("navigation", "bouncy-tabs", "Bouncy Tabs"),
            s("navigation", "dock", "Dock"),
            s("navigation", "dock-layers", "Dock Layers"),
            s("navigation", "sidebar", "Sidebar"),
            s("navigation", "carousel", "Carousel"),
            s("navigation", "command", "Command Palette"),
        ],
    },
    {
        id: "data",
        title: "Data",
        icon: Database,
        stories: [
            s("data", "table", "Table"),
            s("data", "data-table", "Data Table"),
            s("data", "tags-input", "Tags Input"),
            s("data", "avatar", "Avatar"),
            s("data", "sortable-list", "Sortable List"),
            s("data", "infinite-scroll", "Infinite Scroll"),
            s("data", "timeline", "Timeline"),
        ],
    },
    {
        id: "feedback",
        title: "Feedback",
        icon: Bell,
        stories: [
            s("feedback", "toast", "Toast"),
            s("feedback", "notification", "Notification"),
            s("feedback", "progress", "Progress"),
            s("feedback", "skeleton", "Skeleton"),
            s("feedback", "confirm-dialog", "Confirm Dialog"),
        ],
    },
    {
        id: "motion",
        title: "Motion",
        icon: Sparkles,
        stories: [
            s("motion", "transitions", "Transitions"),
            s("motion", "springs", "Spring Orchestrator"),
            s("motion", "stagger", "Stagger Reveal"),
            s("motion", "scroll-type", "Scroll-driven Type"),
            s("motion", "typewriter", "Typewriter"),
        ],
    },
    {
        id: "compositions",
        title: "Compositions",
        icon: LayoutDashboard,
        stories: [
            s("compositions", "hero", "Hero"),
            s("compositions", "math-paper", "Math Paper"),
            s("compositions", "dashboard", "Dashboard"),
            s("compositions", "auth-shell", "Auth Shell"),
            s("compositions", "settings", "Settings"),
            s("compositions", "empty-states", "Empty States"),
            s("compositions", "aurora-playground", "Aurora Playground", "The original demo — preserved."),
        ],
    },
];

export function findCategory(id: string): Category | undefined {
    return CATEGORIES.find((c) => c.id === id);
}

export function findStory(
    categoryId: string,
    storyId: string,
): { category: Category; story: Story } | undefined {
    const category = findCategory(categoryId);
    if (!category) return undefined;
    const story = category.stories.find((s) => s.id === storyId);
    if (!story) return undefined;
    return { category, story };
}

export function firstStoryPath(): string {
    for (const c of CATEGORIES) {
        if (c.stories.length > 0) return `/${c.id}/${c.stories[0]!.id}`;
    }
    return "/foundations";
}
