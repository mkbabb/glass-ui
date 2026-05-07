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
    Wand2,
    Cog,
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

/**
 * Top-level standalone story (not part of a component category). Renders as
 * a distinct icon in the left rail, with no story-pager above the content.
 * Used for tools and playgrounds — Aurora is the first instance.
 */
export interface FlatStory {
    id: string;
    title: string;
    blurb?: string;
    icon: LucideIcon;
    component: () => Promise<Component>;
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
            s("primitives", "card", "Card", "Five-tier glass surface — wash · quiet · resting · floating · overlay; polymorphic root via reka-ui Primitive."),
            s("primitives", "scroll-pane", "Scroll Pane", "Wash-tier surface tuned for overflow:auto hosts; sibling primitive lifted from the retired Card variant=pane."),
            s("primitives", "cartoon-card", "Cartoon Card", "Cartoon-register surface with offset-stamp shadow and hover-lift; sibling primitive lifted from the retired Card variant=cartoon."),
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
            s("primitives", "metric-pill", "Metric Pill", "Stacked taller-fatter pill — `MetricBadge` with `labelPosition=stacked` + `density=spacious` + `size=lg` baked in. Composes inside a `GlassDock containerName=…` host."),
            s("primitives", "status-dot", "Status Dot"),
            s("primitives", "pulse", "Pulse"),
            s("primitives", "glyph-face", "Glyph Face", "Phase-tinted lucide wrapper with catch-light cap."),
            s("primitives", "hover-popover", "Hover Popover", "Hover-triggered floating label with adaptive side / align + defer-on-leave timer; popover-tier substrate for chassis dock consumers."),
            s("primitives", "dock-group", "Dock Group", "Pill-row shelf — wraps a horizontal cluster of dock-tier consumers in a quieter glass tier than the surrounding chassis."),
            s("primitives", "disco-glyph", "Disco Glyph", "Faceted SVG glyph primitive — 8-stop linear facet × 165° specular cap, phase-tinted on activation."),
            s("primitives", "separator", "Separator"),
        ],
    },
    {
        id: "containers",
        title: "Containers",
        icon: Boxes,
        stories: [
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
            s("containers", "glass-carousel", "Glass Carousel", "GlassCarousel items and composable controls."),
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
            s("navigation", "rail", "Dock Rail", "Vertical GlassDock variant behind the demo's category nav."),
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
            s("data", "search", "Fuzzy Search"),
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
            s("motion", "metaballs", "Metaballs", "WebGL canvas substrate with support fallback."),
        ],
    },
    {
        id: "composables",
        title: "Composables",
        icon: Cog,
        stories: [
            s("composables", "use-token-color", "useTokenColor", "Reactive read of a CSS custom property — re-resolves on dark-mode transitions."),
            s("composables", "use-stagger", "useStagger", "Fixed-count timed reveal cascade — one-shot timeline with cleanup-safe timers."),
            s("composables", "use-animated-number-map", "useAnimatedNumberMap", "N-up useAnimatedNumber fan-out behind a Record-returning composable."),
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
            s("compositions", "instrument-chassis", "Instrument Chassis", "Three-region chassis with twin-line bezel grooves and phase cascade."),
        ],
    },
];

export const FLAT_STORIES: FlatStory[] = [
    {
        id: "aurora",
        title: "Aurora",
        blurb:
            "Procedural painterly gradients — multi-nuclei composition, four mediums, cursor-driven swirl.",
        icon: Wand2,
        component: () => import("./aurora.vue").then((m) => m.default),
    },
];

export function findFlatStory(id: string): FlatStory | undefined {
    return FLAT_STORIES.find((f) => f.id === id);
}

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
