/**
 * dock-layer-contexts — the per-route-context DockLayer manifest (AZ.W-DOCK-CONTEXT).
 *
 * The ONE wholly-absent facility the R3 gaps census found: the dock layering
 * system (`DockLayerGroup` + `DockLayer` + the provide/inject registry) exists and
 * works, but layer membership was HAND-AUTHORED per story, never bound to the active
 * route. This manifest is the route→layer map that makes the dock page-aware: a row
 * per manifest category maps that category to the set of contextual `DockLayer`
 * descriptors the shell docks surface while the user is in that section.
 *
 * The key is the manifest `Category.id` (the route's `route.meta.categoryId`), so
 * the lookup is a GENERAL route-indexed read — `route → layers`, deterministic —
 * NOT a 2-route special-case. Adding a category's contextual layers is a row here,
 * mirroring the story manifest's own "adding a story is a row" discipline.
 *
 * Each `DockLayer` descriptor is the section's contextual facets — the named panes
 * the dock can drill between for that page-context. The dock renders them as a
 * `<DockLayerGroup>`; `useContextualDockLayers(route)` resolves the active row.
 */
import type { Component } from "vue";
import {
    Palette,
    Type,
    Square,
    Layers,
    Droplet,
    Sparkles as SparklesIcon,
    CheckSquare,
    ToggleLeft,
    LayoutPanelTop,
    MousePointerClick,
    Image,
    PanelBottom,
    Table2,
    Tags,
    GitBranch,
    BellRing,
    Loader,
    Waypoints,
    Wand2,
    Type as TypeIcon,
    Frame,
    Wrench,
    Boxes as BoxesIcon,
    Navigation as NavIcon,
    type LucideIcon,
} from "@lucide/vue";

/**
 * One contextual layer descriptor — the shape `<DockLayer>` registers (id + label +
 * icon) PLUS the within-category nav entries the layer surfaces. The shell docks
 * render `entries` inside the layer's pane (quick-jump links scoped to the facet).
 */
export interface ContextLayerEntry {
    /** Story id within the category (routes to `/${category}/${id}`). */
    storyId: string;
    label: string;
}

export interface ContextLayer {
    /** Stable layer id — the `<DockLayerGroup>` `active` v-model references it. */
    id: string;
    label: string;
    icon: Component | string;
    /** The within-category quick-jump entries this facet surfaces. */
    entries: ContextLayerEntry[];
}

/**
 * The route→layer map. Keyed off `Category.id`. EVERY primary manifest category is
 * mapped (≥3, in fact 11 distinct contexts) so the facility is the page-aware
 * general map R3-14 names, never a demo-of-two. A category absent here falls back to
 * a single generic layer (see `useContextualDockLayers`).
 */
export const CONTEXT_LAYER_MAP: Record<string, ContextLayer[]> = {
    foundations: [
        {
            id: "tokens",
            label: "Tokens",
            icon: Palette as LucideIcon,
            entries: [
                { storyId: "colors", label: "Colors" },
                { storyId: "radii", label: "Radii" },
                { storyId: "shadows", label: "Shadows" },
                { storyId: "surface-tints", label: "Surface Tints" },
            ],
        },
        {
            id: "type",
            label: "Type",
            icon: Type as LucideIcon,
            entries: [
                { storyId: "typography", label: "Typography" },
                { storyId: "icons", label: "Icons" },
            ],
        },
        {
            id: "material",
            label: "Material",
            icon: Square as LucideIcon,
            entries: [
                { storyId: "paper-glass", label: "Paper & Glass" },
                { storyId: "paper-backdrop-texture-system", label: "Paper Backdrop" },
                { storyId: "overlays-scrims", label: "Overlays & Scrims" },
            ],
        },
    ],
    substrates: [
        {
            id: "fields",
            label: "Fields",
            icon: Droplet as LucideIcon,
            entries: [
                { storyId: "aurora", label: "Aurora" },
                { storyId: "constellation", label: "Constellation" },
                { storyId: "fourier-field", label: "Fourier Field" },
            ],
        },
        {
            id: "creatures",
            label: "Creatures",
            icon: SparklesIcon as LucideIcon,
            entries: [
                { storyId: "blob", label: "GooBlob" },
                { storyId: "glass-material", label: "Glass Material" },
            ],
        },
    ],
    forms: [
        {
            id: "text",
            label: "Text",
            icon: Type as LucideIcon,
            entries: [
                { storyId: "inputs", label: "Inputs" },
                { storyId: "textarea", label: "Textarea" },
                { storyId: "number-field", label: "Number Field" },
            ],
        },
        {
            id: "selection",
            label: "Selection",
            icon: CheckSquare as LucideIcon,
            entries: [
                { storyId: "select", label: "Select" },
                { storyId: "combobox", label: "Combobox" },
                { storyId: "multi-select", label: "Multi-Select" },
            ],
        },
        {
            id: "toggles",
            label: "Toggles",
            icon: ToggleLeft as LucideIcon,
            entries: [
                { storyId: "checks", label: "Checkbox · Radio · Switch" },
                { storyId: "slider", label: "Slider" },
                { storyId: "toggle", label: "Toggle · Toggle Group" },
                { storyId: "toggle-chip", label: "Toggle Chip" },
            ],
        },
    ],
    display: [
        {
            id: "surfaces",
            label: "Surfaces",
            icon: LayoutPanelTop as LucideIcon,
            entries: [
                { storyId: "card", label: "Card" },
                { storyId: "section", label: "Section" },
                { storyId: "separator", label: "Separator" },
            ],
        },
        {
            id: "atoms",
            label: "Atoms",
            icon: MousePointerClick as LucideIcon,
            entries: [
                { storyId: "buttons", label: "Buttons" },
                { storyId: "badge", label: "Badge" },
                { storyId: "metric-badge", label: "Metric Badge" },
                { storyId: "status-dot", label: "Status Dot" },
            ],
        },
    ],
    containers: [
        {
            id: "modals",
            label: "Modals",
            icon: Frame as LucideIcon,
            entries: [
                { storyId: "dialog", label: "Dialog" },
                { storyId: "sheet", label: "Sheet" },
                { storyId: "drawer", label: "Drawer" },
            ],
        },
        {
            id: "floating",
            label: "Floating",
            icon: LayoutPanelTop as LucideIcon,
            entries: [
                { storyId: "popover", label: "Popover" },
                { storyId: "dropdown-menu", label: "Dropdown Menu" },
                { storyId: "hover-card", label: "Hover Card" },
                { storyId: "tooltip", label: "Tooltip" },
            ],
        },
        {
            id: "disclosure",
            label: "Disclosure",
            icon: Layers as LucideIcon,
            entries: [
                { storyId: "accordion", label: "Accordion" },
                { storyId: "collapsible", label: "Collapsible" },
                { storyId: "expandable-container", label: "Expandable Container" },
            ],
        },
    ],
    navigation: [
        {
            id: "switchers",
            label: "Switchers",
            icon: NavIcon as LucideIcon,
            entries: [
                { storyId: "tabs", label: "Tabs" },
                { storyId: "carousel", label: "Carousel" },
            ],
        },
    ],
    dock: [
        {
            id: "shell",
            label: "Shell",
            icon: PanelBottom as LucideIcon,
            entries: [
                { storyId: "overview", label: "Overview" },
                { storyId: "rail", label: "Vertical Dock" },
            ],
        },
        {
            id: "panes",
            label: "Panes",
            icon: LayoutPanelTop as LucideIcon,
            entries: [{ storyId: "layers", label: "Dock Layers" }],
        },
    ],
    data: [
        {
            id: "tables",
            label: "Tables",
            icon: Table2 as LucideIcon,
            entries: [
                { storyId: "table", label: "Table" },
                { storyId: "data-table", label: "Data Table" },
                { storyId: "tags-input", label: "Tags Input" },
            ],
        },
        {
            id: "lists",
            label: "Lists",
            icon: Tags as LucideIcon,
            entries: [
                { storyId: "sortable-list", label: "Sortable List" },
                { storyId: "infinite-scroll", label: "Infinite Scroll" },
                { storyId: "search", label: "Fuzzy Search" },
            ],
        },
        {
            id: "series",
            label: "Series",
            icon: GitBranch as LucideIcon,
            entries: [
                { storyId: "timeline", label: "Timeline" },
                { storyId: "metric-cell", label: "Metric Cell" },
                { storyId: "metric-stack", label: "Metric Stack" },
            ],
        },
    ],
    feedback: [
        {
            id: "status",
            label: "Status",
            icon: BellRing as LucideIcon,
            entries: [
                { storyId: "alert", label: "Alert" },
                { storyId: "toast", label: "Toast" },
                { storyId: "notification", label: "Notification" },
            ],
        },
        {
            id: "progress",
            label: "Progress",
            icon: Loader as LucideIcon,
            entries: [
                { storyId: "progress", label: "Progress" },
                { storyId: "skeleton", label: "Skeleton" },
            ],
        },
    ],
    motion: [
        {
            id: "engines",
            label: "Engines",
            icon: Waypoints as LucideIcon,
            entries: [
                { storyId: "springs", label: "Spring Orchestrator" },
                { storyId: "curve-gallery", label: "Curve Gallery" },
            ],
        },
        {
            id: "text-fx",
            label: "Text FX",
            icon: TypeIcon as LucideIcon,
            entries: [
                { storyId: "countup", label: "Count-up" },
                { storyId: "typewriter", label: "Typewriter" },
                { storyId: "underline", label: "Underline" },
                { storyId: "animated-digit", label: "Animated Digit" },
            ],
        },
        {
            id: "entrance",
            label: "Entrance",
            icon: Wand2 as LucideIcon,
            entries: [{ storyId: "reveal", label: "v-reveal" }],
        },
    ],
    compositions: [
        {
            id: "heroes",
            label: "Heroes",
            icon: Image as LucideIcon,
            entries: [
                { storyId: "hero", label: "Hero" },
                { storyId: "auth-shell", label: "Auth Shell" },
                { storyId: "math-paper", label: "Math Paper" },
            ],
        },
        {
            id: "patterns",
            label: "Patterns",
            icon: BoxesIcon as LucideIcon,
            entries: [
                { storyId: "settings", label: "Settings" },
                { storyId: "configurator", label: "Configurator" },
                { storyId: "form-validation", label: "Form Validation" },
                { storyId: "gate-pattern", label: "Gate Pattern" },
            ],
        },
    ],
};

/** Generic fallback for an unmapped category (or a route with no category). */
export const FALLBACK_CONTEXT_LAYER: ContextLayer = {
    id: "section",
    label: "Section",
    icon: Wrench as LucideIcon,
    entries: [],
};
