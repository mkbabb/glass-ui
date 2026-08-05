/**
 * dock-layer-contexts — the per-route DockLayer manifest.
 *
 * The dock layering
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
    /**
     * The per-facet accent hue (the `mode="facets"` context carousel's
     * `--glass-accent` rim, presets-in-consumers). A `--section-color-N` LIBRARY identity
     * hue (READ by the demo, never minted here). Distinct per facet so the carousel reads
     * as distinct accent-tinted contexts (no two adjacent chips share a hue).
     */
    accent: string;
    /** The within-category quick-jump entries this facet surfaces. */
    entries: ContextLayerEntry[];
}

/**
 * The route→layer map. Keyed off `Category.id`. EVERY primary manifest category is
 * mapped (≥3, in fact 11 distinct contexts) so the facility is the page-aware
 * general map names, never a demo of two. A category absent here falls back to
 * a single generic layer (see `useContextualDockLayers`).
 */
export const CONTEXT_LAYER_MAP: Record<string, ContextLayer[]> = {
    foundations: [
        {
            id: "tokens",
            label: "Tokens",
            icon: Palette as LucideIcon,
            accent: "var(--section-color-2)",
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
            accent: "var(--section-color-3)",
            entries: [
                { storyId: "typography", label: "Typography" },
                { storyId: "icons", label: "Icons" },
            ],
        },
        {
            id: "material",
            label: "Material",
            icon: Square as LucideIcon,
            accent: "var(--section-color-7)",
            entries: [
                { storyId: "paper-glass", label: "Paper & Glass" },
                { storyId: "paper-texture", label: "Paper Texture" },
                { storyId: "overlays-scrims", label: "Overlays & Scrims" },
            ],
        },
    ],
    substrates: [
        {
            id: "fields",
            label: "Fields",
            icon: Droplet as LucideIcon,
            accent: "var(--section-color-2)",
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
            accent: "var(--section-color-3)",
            entries: [
                { storyId: "blob", label: "Blob" },
                { storyId: "glass-material", label: "Glass Material" },
            ],
        },
    ],
    forms: [
        {
            id: "text",
            label: "Text",
            icon: Type as LucideIcon,
            accent: "var(--section-color-2)",
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
            accent: "var(--section-color-3)",
            entries: [
                { storyId: "select", label: "Select" },
            ],
        },
        {
            id: "toggles",
            label: "Toggles",
            icon: ToggleLeft as LucideIcon,
            accent: "var(--section-color-7)",
            entries: [
                { storyId: "checks", label: "Checkbox · Radio · Switch" },
                { storyId: "slider", label: "Slider" },
                { storyId: "toggle", label: "Toggle · Toggle Group" },
                { storyId: "chip", label: "Chip" },
            ],
        },
    ],
    display: [
        {
            id: "surfaces",
            label: "Surfaces",
            icon: LayoutPanelTop as LucideIcon,
            accent: "var(--section-color-2)",
            entries: [
                { storyId: "card", label: "Card" },
                { storyId: "separator", label: "Separator" },
            ],
        },
        {
            id: "atoms",
            label: "Atoms",
            icon: MousePointerClick as LucideIcon,
            accent: "var(--section-color-3)",
            entries: [
                { storyId: "buttons", label: "Buttons" },
                { storyId: "badge", label: "Badge" },
                { storyId: "status-dot", label: "Status Dot" },
            ],
        },
    ],
    containers: [
        {
            id: "modals",
            label: "Modals",
            icon: Frame as LucideIcon,
            accent: "var(--section-color-2)",
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
            accent: "var(--section-color-3)",
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
            accent: "var(--section-color-7)",
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
            accent: "var(--section-color-2)",
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
            accent: "var(--section-color-2)",
            entries: [
                { storyId: "overview", label: "Overview" },
                { storyId: "rail", label: "Vertical Dock" },
            ],
        },
        {
            id: "panes",
            label: "Panes",
            icon: LayoutPanelTop as LucideIcon,
            accent: "var(--section-color-3)",
            entries: [{ storyId: "layers", label: "Dock Layers" }],
        },
    ],
    data: [
        {
            id: "tables",
            label: "Tables",
            icon: Table2 as LucideIcon,
            accent: "var(--section-color-2)",
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
            accent: "var(--section-color-3)",
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
            accent: "var(--section-color-7)",
            entries: [
                { storyId: "timeline", label: "Timeline" },
                { storyId: "metric", label: "Metric" },
            ],
        },
    ],
    feedback: [
        {
            id: "status",
            label: "Status",
            icon: BellRing as LucideIcon,
            accent: "var(--section-color-2)",
            entries: [
                { storyId: "alert", label: "Alert" },
                { storyId: "toast", label: "Toast" },
            ],
        },
        {
            id: "progress",
            label: "Progress",
            icon: Loader as LucideIcon,
            accent: "var(--section-color-3)",
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
            accent: "var(--section-color-2)",
            entries: [
                { storyId: "springs", label: "Spring Orchestrator" },
                { storyId: "curve-gallery", label: "Motion Lab" },
            ],
        },
        {
            id: "text-fx",
            label: "Text FX",
            icon: TypeIcon as LucideIcon,
            accent: "var(--section-color-3)",
            entries: [
                { storyId: "countup", label: "Count-up" },
                { storyId: "typewriter", label: "Typewriter" },
                { storyId: "underline", label: "Underline" },
            ],
        },
    ],
    compositions: [
        {
            id: "heroes",
            label: "Heroes",
            icon: Image as LucideIcon,
            accent: "var(--section-color-2)",
            entries: [
                { storyId: "hero", label: "Hero" },
                { storyId: "auth-shell", label: "Auth Shell" },
            ],
        },
        {
            id: "patterns",
            label: "Patterns",
            icon: BoxesIcon as LucideIcon,
            accent: "var(--section-color-3)",
            entries: [
                { storyId: "settings", label: "Settings" },
                { storyId: "configurator", label: "Configurator" },
                { storyId: "form-validation", label: "Form Validation" },
            ],
        },
    ],
};

/** Generic fallback for an unmapped category (or a route with no category). */
export const FALLBACK_CONTEXT_LAYER: ContextLayer = {
    id: "section",
    label: "Section",
    icon: Wrench as LucideIcon,
    accent: "var(--section-color-7)",
    entries: [],
};
