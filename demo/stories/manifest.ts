/**
 * Story manifest — single source of truth for the storybook.
 *
 * Each row is one navigable page. `component` is a lazy import resolved via
 * `import.meta.glob`, so adding a story means creating its SFC at
 * `demo/stories/<category>/<id>.vue` and appending a row here.
 *
 * The manifest is consumed by `router.ts` (routes), the demo-shell docks
 * (SidebarDock + BottomDock), and `useStoryNavigation` (current/next/prev).
 *
 * The IA is a coherent category tree — Foundations, Substrates (render
 * backgrounds), Forms, Display, Containers, Navigation, Dock (the headline
 * primitive's own section), Data, Feedback, Motion, and Compositions. (The
 * reference-only Composables shelf was removed at AZ.W-SHELL-CONFIG — the demo
 * IA no longer carries the 22-story reference category; clean break, no alias.)
 */
import type { Component } from "vue";
import type { StoryBackground } from "./aurora-hero";
import {
    Compass,
    Droplet,
    FormInput,
    Shapes,
    Boxes,
    Navigation,
    PanelBottom,
    Database,
    Bell,
    Sparkles,
    LayoutDashboard,
    type LucideIcon,
} from "@lucide/vue";

export interface Story {
    id: string;
    title: string;
    blurb?: string;
    component: () => Promise<Component>;
    sourceFiles?: string[];
    /**
     * The per-page background substrate, painted behind the page's glass
     * container. A HERO page declares a rich live substrate (aurora /
     * constellation / fourier); a content page declares a calm paper / grid
     * wash, or nothing for the quiet default. The page chassis reads it and
     * renders it once — no page hand-rolls its own backdrop.
     */
    background?: StoryBackground;
    /**
     * Render the page as a full-bleed glassy HERO over its live substrate (the
     * front-door demonstration) rather than the contained content register.
     */
    hero?: boolean;
}

/** Re-export the descriptor type so consumers reach it from the manifest. */
export type { StoryBackground } from "./aurora-hero";

export interface Category {
    id: string;
    title: string;
    icon: LucideIcon;
    /** Reference-only shelf — rendered collapsed below the fold in the rail. */
    reference?: boolean;
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

/** Per-page container options — the declared background + the hero register. */
interface StoryOptions {
    background?: StoryBackground;
    hero?: boolean;
}

function s(
    cat: string,
    id: string,
    title: string,
    blurb?: string,
    opts?: StoryOptions,
): Story {
    return {
        id,
        title,
        blurb,
        component: lazy(cat, id),
        background: opts?.background,
        hero: opts?.hero,
    };
}

export const CATEGORIES: Category[] = [
    {
        id: "foundations",
        title: "Foundations",
        icon: Compass,
        stories: [
            s("foundations", "intro", "Intro", "What this storybook is.", {
                background: { kind: "aurora", palette: "rose-indigo-amber" },
                hero: true,
            }),
            s(
                "foundations",
                "colors",
                "Colors",
                "Warm cream, 13-stop section palette, viz basis.",
            ),
            s(
                "foundations",
                "typography",
                "Typography",
                "Plus Jakarta Sans + Fira Code — golden-ratio scale.",
            ),
            s("foundations", "radii", "Radii", "Radius tokens from xs to pill."),
            s("foundations", "shadows", "Shadows", "Cartoon offset, elevated, modal."),
            s(
                "foundations",
                "motion",
                "Motion",
                "Easings, damped spring linear() curves.",
                {
                    background: "constellation",
                },
            ),
            s(
                "foundations",
                "paper-glass",
                "Paper & Glass",
                "Four glass tiers, paper grain, blend modes.",
                {
                    background: "paper",
                    hero: true,
                },
            ),
            s("foundations", "icons", "Icons", "Lucide, 2px stroke, semantic sizes."),
            s(
                "foundations",
                "surface-tints",
                "Surface Tints",
                "Nine-rung tint scale plus the tier aliases (quiet / floating / modal).",
            ),
            s(
                "foundations",
                "overlays-scrims",
                "Overlays & Scrims",
                "Three scrim weights + ModalOverlay + motion / lift offsets.",
            ),
            s(
                "foundations",
                "chart-chassis-palette",
                "Chart & Chassis Palette",
                "Chart aliases (ping / download / upload / jitter) + chassis-tier opacities + specular tokens.",
            ),
            s(
                "foundations",
                "paper-backdrop-texture-system",
                "Paper Backdrop Texture System",
                "The PaperBackdrop frequency register (clean / aged), the cascade-overridable paper tokens, the per-instance opacity knob, and the layered composition recipe.",
            ),
            s(
                "foundations",
                "css-utilities",
                "CSS Utilities",
                "The scale-on-hover utility over the scale-hover token — a per-scope override cascade.",
            ),
        ],
    },
    {
        id: "substrates",
        title: "Substrates",
        icon: Droplet,
        stories: [
            s(
                "substrates",
                "aurora",
                "Aurora",
                "Procedural painterly gradients — multi-nuclei composition, four mediums, cursor-driven swirl. Shipped /aurora.",
                {
                    background: "aurora",
                    hero: true,
                },
            ),
            s(
                "substrates",
                "blob",
                "GooBlob",
                "WebGL2 metaball droplet on the shared substrate (injected color resolver) — the lit static register, the pointer-reactive interaction hero, the mood + seed-palette model, and the pause seam. Shipped /goo-blob + /watercolor-dot.",
                {
                    // A GooBlob is a CONTAINED creature, not a page-field — the page
                    // presents its studio over a calm paper wash (W-BLOB-REBUILD; the
                    // prior `background: "blob"` blew the creature to full-page width).
                    background: "paper",
                    hero: true,
                },
            ),
            s(
                "substrates",
                "constellation",
                "Constellation",
                "A drifting proximity-graph lattice on the Canvas2D substrate (park/freeze/dispose). The neutral lattice ships; the --primary focal node is a consumer drawOverlay pass. Shipped /constellation.",
                {
                    background: "constellation",
                    hero: true,
                },
            ),
            s(
                "substrates",
                "fourier-field",
                "Fourier Field",
                "A reconstructing elliptic Fourier curve on the Canvas2D substrate — a seeded inverse-DFT closed curve with a comet trail and nested epicycles, the injected color seam, and a freeze capture lever. Sibling to Aurora and GooBlob.",
                {
                    background: "fourier",
                    hero: true,
                },
            ),
            s(
                "substrates",
                "glass-material",
                "Glass Material",
                "The unified glass-material grammar (moving-specular + edge-rim from one mixin) plus four progressively-enhanced SOTA folds — convex-lens refract, squircle, chromatic edge-dispersion, adaptive tint — each over a working fallback.",
                {
                    background: "aurora",
                    hero: true,
                },
            ),
            s(
                "substrates",
                "glass-panel",
                "Glass Panel",
                "Five-rung glass tier ladder over a renderer-tier detection cascade (svg-filter / css / fallback) — a substrate, not a UI primitive. Shipped /glass-panel.",
            ),
        ],
    },
    {
        id: "forms",
        title: "Forms",
        icon: FormInput,
        stories: [
            s("forms", "inputs", "Inputs"),
            s("forms", "textarea", "Textarea"),
            s("forms", "checks", "Checkbox · Radio · Switch"),
            s(
                "forms",
                "slider",
                "Slider",
                "Two recipes — standard (continuous rounded iOS knob) + spectrum (gradient-track color slider).",
            ),
            s("forms", "number-field", "Number Field"),
            s("forms", "select", "Select"),
            s("forms", "combobox", "Combobox"),
            s("forms", "multi-select", "Multi-Select"),
            s("forms", "toggle", "Toggle · Toggle Group"),
            s(
                "forms",
                "toggle-chip",
                "Toggle Chip",
                "chip vs cell variants over a reka-ui Toggle root; aria-pressed semantics.",
            ),
            s("forms", "label", "Label"),
        ],
    },
    {
        id: "display",
        title: "Display",
        icon: Shapes,
        stories: [
            s("display", "buttons", "Buttons"),
            s(
                "display",
                "card",
                "Card",
                "Five-tier glass surface — wash · quiet · resting · floating · overlay; orthogonal surface=cartoon decoration; scroll-pane recipe; polymorphic root via reka-ui Primitive.",
            ),
            s("display", "badge", "Badge"),
            s("display", "separator", "Separator"),
            s(
                "display",
                "section",
                "Section",
                "Sectioning landmark over the typography ladder — title / description / tone / gap.",
            ),
            s("display", "metric-badge", "Metric Badge"),
            s(
                "display",
                "metric-pill",
                "Metric Pill",
                "A MetricBadge composition with a stacked label, spacious density, and the large size baked in. Not a parallel primitive.",
            ),
            s("display", "status-dot", "Status Dot"),
            s("display", "pulse", "Pulse"),
            s(
                "display",
                "stacked-icons",
                "Stacked Icons",
                "Overlapping icon stack with maxVisible / +N overflow; size axis only.",
            ),
            s(
                "display",
                "dark-mode-toggle",
                "Dark Mode Toggle",
                "Size axis (sm · md · lg · control standalone; dock sizes to its GlassDock host); composes useGlobalDark.",
            ),
        ],
    },
    {
        id: "containers",
        title: "Containers",
        icon: Boxes,
        stories: [
            s(
                "containers",
                "dialog",
                "Dialog",
                "Glass + opaque variants, a confirm-dialog, and the native top-layer opt-in — a real dialog element with commandfor and the glass-top-layer entry grammar.",
            ),
            s("containers", "sheet", "Sheet"),
            s("containers", "drawer", "Drawer"),
            s("containers", "popover", "Popover"),
            s("containers", "dropdown-menu", "Dropdown Menu"),
            s("containers", "context-menu", "Context Menu"),
            s("containers", "hover-card", "Hover Card"),
            s("containers", "tooltip", "Tooltip"),
            s("containers", "accordion", "Accordion"),
            s("containers", "collapsible", "Collapsible"),
            s(
                "containers",
                "hover-popover",
                "Hover Popover",
                "Hover-triggered floating label with adaptive side / align + defer-on-leave timer; popover-tier floating surface.",
            ),
            s(
                "containers",
                "expandable-container",
                "Expandable Container",
                "In-place vs Teleport-to-body fullscreen with body-overflow lock-depth.",
            ),
            s(
                "containers",
                "command",
                "Command Palette",
                "Fuzzy command tool — a search/command overlay surface, dropdown / context-menu / command-palette family.",
            ),
        ],
    },
    {
        id: "navigation",
        title: "Navigation",
        icon: Navigation,
        stories: [
            s(
                "navigation",
                "tabs",
                "Tabs",
                "reka Tabs (default · pill · underline · vertical) + the unified SegmentedTabs spring-slider (segmented · pill · underline variants, multi-select, responsive collapse).",
            ),
            s("navigation", "carousel", "Carousel", undefined, {
                background: "aurora",
            }),
            s(
                "navigation",
                "header-ribbon",
                "Header Ribbon",
                "Hover-tracking ribbon — an anchor button reveals a control row, then auto-collapses; the anchor slot exposes pinned / toggled state. Shipped /header-ribbon.",
            ),
        ],
    },
    {
        id: "dock",
        title: "Dock",
        icon: PanelBottom,
        stories: [
            s(
                "dock",
                "overview",
                "Overview",
                "The GlassDock walkthrough — the collapse↔expand morph on one spring, always-expanded media transport, select / dropdown / popover triggers, the slider keep-open hold, content-driven overflow wrap, the big-dock card + tile grid, and the background pause toggle.",
            ),
            s(
                "dock",
                "layers",
                "Dock Layers",
                "DockLayerGroup drill-in — named panes with an optional switcher rail, crossfade + size FLIP between layers, collapse-while-switching, and the vertical-overflow case.",
            ),
            s(
                "dock",
                "rail",
                "Vertical Dock",
                'The vertical GlassDock navigation column — an active-item accent, tap-squish press, and anchored tooltips. ONE orientation axis (no variant): a vertical dock is orientation="vertical", and it carries the same collapse/morph/shrink machinery a horizontal dock does. The only "rail" left in the dock band is the layer-switcher rail inside a DockLayerGroup.',
            ),
            s(
                "dock",
                "morph-showcase",
                "Vertical ↔ Horizontal Morph",
                "The liquid-glass dock morph (AZ.W-MORPH-SHOWCASE) — a button flows the VERTICAL dock, as an amorphous metaball teardrop, into the HORIZONTAL dock, fully bidirectional + deterministic on ONE --dock-morph-t scalar. An SVG-goo metaball bridge merges the two plates and occludes the topology reflow at the midpoint (the AX.W42 fold-7 limit respected, not fought); useLiquidFlex (the W-LIQUID substrate) drives the two-dock spans + the volume-preserving teardrop squish.",
            ),
        ],
    },
    {
        id: "data",
        title: "Data",
        icon: Database,
        stories: [
            // AZ.W-SUFFUSE D4-4 — the ledger / engineering-paper-shaped surfaces
            // are the most NATIVE blueprint-grid-underlay fit; the grid was
            // applied by accident-of-authoring to metric-cell/stack while these
            // bare table surfaces (the canonical candidates) declared nothing.
            // The calm grid wash (StoryHero drops the card to `wash` over it) is
            // the ONE content event — no live substrate (the over-spend fence).
            s("data", "table", "Table", undefined, {
                background: "grid",
            }),
            s("data", "data-table", "Data Table", undefined, {
                background: "grid",
            }),
            s("data", "tags-input", "Tags Input"),
            s("data", "avatar", "Avatar"),
            s("data", "sortable-list", "Sortable List"),
            s("data", "infinite-scroll", "Infinite Scroll"),
            s("data", "timeline", "Timeline"),
            s(
                "data",
                "timeline-segmented",
                "Timeline (segmented)",
                "A multi-phase progress timeline with per-segment gradients and hover/click boundary dots.",
            ),
            s(
                "data",
                "timeline-continuous",
                "Timeline (continuous)",
                "One rounded-pill rail with N absolutely-positioned region children — the same segment shape as the segmented timeline, a different geometry.",
            ),
            s("data", "search", "Fuzzy Search"),
            s(
                "data",
                "scrolling-text",
                "Scrolling Text",
                "Overflow-detection-driven horizontal marquee for inline text — IPv6 addresses, org names, entity IDs.",
            ),
            s(
                "data",
                "metric-cell",
                "Metric Cell",
                "Compact metric card — icon + label over value/unit on a wash-tier surface; dashboard / compact / bare registers. Shipped /metric-cell.",
                {
                    background: "grid",
                },
            ),
            s(
                "data",
                "metric-stack",
                "Metric Stack",
                "Subgrid layout shell hosting a column of <MetricRow> children — audacious poster vs compact result registers, per-row phase tint + active aura. Shipped /metric-stack.",
                {
                    background: "grid",
                },
            ),
        ],
    },
    {
        id: "feedback",
        title: "Feedback",
        icon: Bell,
        stories: [
            s(
                "feedback",
                "alert",
                "Alert",
                'role="alert" status surface — a feedback primitive.',
            ),
            s("feedback", "toast", "Toast"),
            s(
                "feedback",
                "toaster",
                "Toaster",
                "Drop-in <ToastProvider> wrapper composed at the layout root.",
            ),
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
            s("motion", "springs", "Spring Orchestrator", undefined, {
                background: "constellation",
            }),
            s(
                "motion",
                "curve-gallery",
                "Curve Gallery",
                "The FULL curve canon live, 1:1 isomorphic to the keyframes easing inventory (Standard/Sine/Quad/Cubic/Expo/Circ/Back/Bounce/Steps/Linear()/Springs/Custom) — every plot driven by its REAL JS twin, plus a live editable cubic-bezier in the Custom family.",
                {
                    // R7 D2 — the calm rich substrate so the glass POPs (the
                    // grey-on-grey kill). A blueprint `grid` wash, NOT another GL
                    // context (the one-GL-per-route fence — springs spends the
                    // constellation budget in this band).
                    background: "grid",
                },
            ),
            s(
                "motion",
                "scroll-vt",
                "Scroll & View Transitions",
                "The native scroll-driven facilities — .scroll-progress (scroll() timeline), [data-scroll-reveal] (view() timeline), the .gl-list-item View-Transitions reorder, and a capability badge.",
            ),
            s(
                "motion",
                "countup",
                "Count-up",
                "Walk [data-countup] figures and tween textContent on the keyframes NumericAnimation engine.",
            ),
            s(
                "motion",
                "reveal",
                "v-reveal",
                "Dependency-free entrance directive — sets the [data-reveal] hook + --d stagger step the CSS reads.",
            ),
            s("motion", "typewriter", "Typewriter"),
            s(
                "motion",
                "handmark",
                "Hand Mark",
                "HandMark — the platform's hand voice. The pen underline, the boil natural morphology, the highlighter (multiply over the page), draw-on, the brush continuum, and a hand-circled datum — over the paper-grain register. GlassUnderline RETIRED onto HandMark shape='underline' (DEC-8).",
            ),
            s(
                "motion",
                "animated-digit",
                "Animated Digit",
                "Single-figure smoothed reel over useAnimatedNumber — tweens a metric toward its bound value so it never snaps; null reads the placeholder.",
            ),
        ],
    },
    {
        id: "compositions",
        title: "Compositions",
        icon: LayoutDashboard,
        stories: [
            s("compositions", "hero", "Hero", undefined, {
                background: "constellation",
                hero: true,
            }),
            s("compositions", "math-paper", "Math Paper", undefined, {
                background: "grid",
            }),
            s("compositions", "auth-shell", "Auth Shell", undefined, {
                background: { kind: "fourier" },
                hero: true,
            }),
            // AZ.W-SUFFUSE D4-1 — the canonical thin offender: a page literally
            // ABOUT grain / paper / type rendered flat white-on-white. The calm
            // blueprint-grid wash (StoryHero drops the card to `wash` over it) +
            // the math-paper section-accent rail idiom are its ONE content event
            // — no live substrate (the over-spend fence).
            s("compositions", "settings", "Settings", undefined, {
                background: "grid",
            }),
            s("compositions", "empty-states", "Empty States", undefined, {
                // The empty-states page carries its OWN contained GooBlob mascot
                // (a small pointer-leaning companion); it does not need — and a
                // GooBlob cannot be — a full-bleed page-field (W-BLOB-REBUILD).
                background: "paper",
            }),
            s(
                "compositions",
                "drawer-live-behind",
                "Drawer Live-Behind",
                "A detented non-modal bottom sheet — peek / half / full snap-points over a live, still-interactive surface behind it.",
            ),
            s(
                "compositions",
                "configurator",
                "Configurator",
                "Studio shell — preset row + grouped <ConfiguratorLayer> + a live specimen stage. Aurora is its real consumer.",
            ),
            s(
                "compositions",
                "instrument-chassis",
                "Instrument Chassis",
                "Three-region chassis with twin-line bezel grooves and phase cascade; the GlassDock instrument-strip host.",
            ),
            s(
                "compositions",
                "form-validation",
                "Form Validation",
                "The user-invalid / user-valid rungs, the aria-invalid bridge, a required asterisk, an error slot, and Textarea autosize.",
            ),
            s(
                "compositions",
                "gate-pattern",
                "Gate Pattern",
                "A contained, on-demand preview of the non-dismissable access-modal idiom — a glass-card frame shows the gate, and Open the modal demo opens the real modal that refuses esc, scrim, and close, with the widened invalid ring and shake feedback, closing only on the correct key. A blessed composition, not a component.",
            ),
            s(
                "compositions",
                "labeled-field",
                "Labeled Field",
                "Parent SFC + 4 wrappers (Input · Select · Slider · Switch) with shared IconTooltip label.",
            ),
            s(
                "compositions",
                "icon-tooltip",
                "Icon Tooltip",
                "Auto-provider tooltip for label co-location with display typography baked in.",
            ),
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
