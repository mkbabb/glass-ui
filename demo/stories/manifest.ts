/**
 * Story manifest — authoritative index of every storybook page.
 *
 * Convention-based: each story SFC lives at
 *   demo/stories/<category.id>/<story.id>.vue
 * and is resolved by the router via import.meta.glob. Adding a story means
 * creating its SFC and appending a row here.
 */

import { h, defineAsyncComponent, type Component } from "vue";

export interface StoryDef {
    id: string;
    title: string;
    blurb?: string;
}

export interface CategoryDef {
    id: string;
    title: string;
    /** Lucide icon name (rendered by the dock rail). */
    icon: string;
    stories: StoryDef[];
}

export const CATEGORIES: CategoryDef[] = [
    {
        id: "foundations",
        title: "Foundations",
        icon: "compass",
        stories: [
            { id: "intro", title: "Intro", blurb: "What this storybook is." },
            { id: "colors", title: "Colors", blurb: "Warm cream, 13-stop section palette, viz basis." },
            { id: "typography", title: "Typography", blurb: "Computer Modern, Fraunces, Fira Code — golden-ratio scale." },
            { id: "radii", title: "Radii", blurb: "Radius tokens from xs to pill." },
            { id: "shadows", title: "Shadows", blurb: "Cartoon offset, elevated, modal." },
            { id: "motion", title: "Motion", blurb: "Easings, damped spring linear() curves." },
            { id: "paper-glass", title: "Paper & Glass", blurb: "Four glass tiers, paper grain, blend modes." },
            { id: "icons", title: "Icons", blurb: "Lucide, 2px stroke, semantic sizes." },
        ],
    },
    {
        id: "primitives",
        title: "Primitives",
        icon: "shapes",
        stories: [
            { id: "buttons", title: "Buttons" },
            { id: "inputs", title: "Inputs" },
            { id: "textarea", title: "Textarea" },
            { id: "checks", title: "Checkbox · Radio · Switch" },
            { id: "slider", title: "Slider" },
            { id: "number-field", title: "Number Field" },
            { id: "select", title: "Select" },
            { id: "combobox", title: "Combobox" },
            { id: "multi-select", title: "Multi-Select" },
            { id: "toggle", title: "Toggle · Toggle Group" },
            { id: "label", title: "Label" },
            { id: "badge", title: "Badge" },
            { id: "metric-badge", title: "Metric Badge" },
            { id: "status-dot", title: "Status Dot" },
            { id: "pulse", title: "Pulse" },
            { id: "separator", title: "Separator" },
        ],
    },
    {
        id: "containers",
        title: "Containers",
        icon: "square-stack",
        stories: [
            { id: "card", title: "Card" },
            { id: "dialog", title: "Dialog" },
            { id: "sheet", title: "Sheet" },
            { id: "drawer", title: "Drawer" },
            { id: "popover", title: "Popover" },
            { id: "dropdown-menu", title: "Dropdown Menu" },
            { id: "context-menu", title: "Context Menu" },
            { id: "hover-card", title: "Hover Card" },
            { id: "tooltip", title: "Tooltip" },
            { id: "alert", title: "Alert" },
            { id: "accordion", title: "Accordion" },
            { id: "collapsible", title: "Collapsible" },
        ],
    },
    {
        id: "navigation",
        title: "Navigation",
        icon: "compass",
        stories: [
            { id: "tabs", title: "Tabs" },
            { id: "bouncy-tabs", title: "Bouncy Tabs" },
            { id: "dock", title: "Dock" },
            { id: "dock-layers", title: "Dock Layers" },
            { id: "sidebar", title: "Sidebar" },
            { id: "carousel", title: "Carousel" },
            { id: "command", title: "Command Palette" },
        ],
    },
    {
        id: "data",
        title: "Data",
        icon: "table",
        stories: [
            { id: "table", title: "Table" },
            { id: "data-table", title: "Data Table" },
            { id: "tags-input", title: "Tags Input" },
            { id: "avatar", title: "Avatar" },
            { id: "sortable-list", title: "Sortable List" },
            { id: "infinite-scroll", title: "Infinite Scroll" },
            { id: "timeline", title: "Timeline" },
        ],
    },
    {
        id: "feedback",
        title: "Feedback",
        icon: "bell",
        stories: [
            { id: "toast", title: "Toast" },
            { id: "notification", title: "Notification" },
            { id: "progress", title: "Progress" },
            { id: "skeleton", title: "Skeleton" },
            { id: "confirm-dialog", title: "Confirm Dialog" },
        ],
    },
    {
        id: "motion",
        title: "Motion",
        icon: "waves",
        stories: [
            { id: "transitions", title: "Transitions" },
            { id: "springs", title: "Spring Orchestrator" },
            { id: "stagger", title: "Stagger Reveal" },
            { id: "scroll-type", title: "Scroll-driven Type" },
            { id: "typewriter", title: "Typewriter" },
        ],
    },
    {
        id: "compositions",
        title: "Compositions",
        icon: "layout-template",
        stories: [
            { id: "hero", title: "Hero" },
            { id: "math-paper", title: "Math Paper" },
            { id: "dashboard", title: "Dashboard" },
            { id: "auth-shell", title: "Auth Shell" },
            { id: "settings", title: "Settings" },
            { id: "empty-states", title: "Empty States" },
            { id: "aurora-playground", title: "Aurora Playground", blurb: "The original demo — preserved." },
        ],
    },
];

// Glob all story SFCs at build time. Vite resolves this to a map of
// '../stories/<category>/<id>.vue' -> () => import(...).
const storyModules = import.meta.glob("./*/*.vue");

export function resolveStory(category: string, id: string): Component {
    const key = `./${category}/${id}.vue`;
    const loader = storyModules[key];
    if (!loader) {
        return { render: () => h("div", { class: "p-8 text-muted-foreground" }, `Missing story: ${category}/${id}`) };
    }
    return defineAsyncComponent(loader as () => Promise<Component>);
}

export function findCategory(id: string): CategoryDef | undefined {
    return CATEGORIES.find((c) => c.id === id);
}

export function findStory(categoryId: string, storyId: string): { category: CategoryDef; story: StoryDef } | undefined {
    const category = findCategory(categoryId);
    if (!category) return undefined;
    const story = category.stories.find((s) => s.id === storyId);
    if (!story) return undefined;
    return { category, story };
}

export function firstStory(): { category: string; story: string } {
    const c = CATEGORIES[0];
    return { category: c.id, story: c.stories[0].id };
}
