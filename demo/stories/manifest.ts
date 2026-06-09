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
 * primitive's own section), Data, Feedback, Motion, Compositions, and a
 * reference-only Composables shelf collapsed below the fold.
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
    Cog,
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
            s("foundations", "colors", "Colors", "Warm cream, 13-stop section palette, viz basis."),
            s("foundations", "typography", "Typography", "Plus Jakarta Sans + Fira Code — golden-ratio scale."),
            s("foundations", "radii", "Radii", "Radius tokens from xs to pill."),
            s("foundations", "shadows", "Shadows", "Cartoon offset, elevated, modal."),
            s("foundations", "motion", "Motion", "Easings, damped spring linear() curves."),
            s("foundations", "paper-glass", "Paper & Glass", "Four glass tiers, paper grain, blend modes.", {
                background: "paper",
                hero: true,
            }),
            s("foundations", "icons", "Icons", "Lucide, 2px stroke, semantic sizes."),
            s("foundations", "surface-tints", "Surface Tints", "9-rung tint scale + V.W3 tier aliases (quiet / floating / modal)."),
            s("foundations", "overlays-scrims", "Overlays & Scrims", "Three scrim weights + ModalOverlay + motion / lift offsets."),
            s("foundations", "chart-chassis-palette", "Chart & Chassis Palette", "Chart aliases (ping / download / upload / jitter) + chassis-tier opacities + specular tokens."),
            s("foundations", "paper-backdrop-texture-system", "Paper Backdrop Texture System", "`<PaperBackdrop>` frequency register (clean / aged) + cascade-overridable --paper-* tokens (P.W3 Lane C)."),
            s("foundations", "paper-backdrop", "Paper Backdrop", "Paper-grain texture substrate, two frequencies (clean / aged) + opacity knob."),
            s("foundations", "css-utilities", "CSS Utilities", "`@utility scale-on-hover` over `--scale-hover` — per-scope override cascade (O.W6 Lane C)."),
        ],
    },
    {
        id: "substrates",
        title: "Substrates",
        icon: Droplet,
        stories: [
            s("substrates", "aurora", "Aurora", "Procedural painterly gradients — multi-nuclei composition, four mediums, cursor-driven swirl. Shipped /aurora."),
            s("substrates", "blob", "GooBlob", "WebGL2 metaball droplet on the shared substrate (injected color resolver) — the lit static register, the pointer-reactive interaction hero, the mood + seed-palette model, and the pause seam. Shipped /goo-blob + /watercolor-dot."),
            s("substrates", "constellation", "Constellation", "A drifting proximity-graph lattice on the Canvas2D substrate (park/freeze/dispose). The neutral lattice ships; the --primary focal node is a consumer drawOverlay pass. Shipped /constellation."),
            s("substrates", "fourier-field", "Fourier Field", "A reconstructing elliptic Fourier curve on the Canvas2D substrate — a seeded inverse-DFT closed curve with a comet trail and nested epicycles, the injected color seam, and a freeze capture lever. Sibling to Aurora and GooBlob."),
            s("substrates", "glass-panel", "Glass Panel", "Five-rung glass tier ladder over a renderer-tier detection cascade (svg-filter / css / fallback) — a substrate, not a UI primitive."),
            s("substrates", "glass-material", "Glass Material", "The unified .glass-material grammar (moving-specular + edge-rim from one mixin) + the four @supports-gated Baseline-2025 SOTA folds — convex-lens refract, squircle, chromatic edge-dispersion, adaptive tint — each over a working fallback."),
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
            s("forms", "slider", "Slider", "Two recipes — standard (continuous rounded iOS knob) + spectrum (gradient-track color slider)."),
            s("forms", "number-field", "Number Field"),
            s("forms", "select", "Select"),
            s("forms", "combobox", "Combobox"),
            s("forms", "multi-select", "Multi-Select"),
            s("forms", "toggle", "Toggle · Toggle Group"),
            s("forms", "toggle-chip", "Toggle Chip", "chip vs cell variants over a reka-ui Toggle root; aria-pressed semantics."),
            s("forms", "label", "Label"),
        ],
    },
    {
        id: "display",
        title: "Display",
        icon: Shapes,
        stories: [
            s("display", "buttons", "Buttons"),
            s("display", "card", "Card", "Five-tier glass surface — wash · quiet · resting · floating · overlay; orthogonal surface=cartoon decoration; scroll-pane recipe; polymorphic root via reka-ui Primitive."),
            s("display", "badge", "Badge"),
            s("display", "separator", "Separator"),
            s("display", "section", "Section", "Sectioning landmark over the typography ladder — title / description / tone / gap."),
            s("display", "metric-badge", "Metric Badge"),
            s("display", "metric-pill", "Metric Pill", "A `MetricBadge` composition — `labelPosition=stacked` + `density=spacious` + `size=lg` baked in. Not a parallel primitive."),
            s("display", "status-dot", "Status Dot"),
            s("display", "pulse", "Pulse"),
            s("display", "stacked-icons", "Stacked Icons", "Overlapping icon stack with maxVisible / +N overflow; size axis only."),
            s("display", "dark-mode-toggle", "Dark Mode Toggle", "Size axis (sm · md · lg · control standalone; dock sizes to its GlassDock host); composes useGlobalDark."),
        ],
    },
    {
        id: "containers",
        title: "Containers",
        icon: Boxes,
        stories: [
            s("containers", "dialog", "Dialog"),
            s("containers", "native-top-layer", "Native Top-Layer", "AQ.W6 pilots — native `<dialog>` + `commandfor` + `.glass-top-layer`; `HoverPopover :native` interestfor opt-in; capability probe. Folds into Dialog as a `:native` opt-in (FIX-ROUTE)."),
            s("containers", "sheet", "Sheet"),
            s("containers", "drawer", "Drawer"),
            s("containers", "popover", "Popover"),
            s("containers", "dropdown-menu", "Dropdown Menu"),
            s("containers", "context-menu", "Context Menu"),
            s("containers", "hover-card", "Hover Card"),
            s("containers", "tooltip", "Tooltip"),
            s("containers", "accordion", "Accordion"),
            s("containers", "collapsible", "Collapsible"),
            s("containers", "hover-popover", "Hover Popover", "Hover-triggered floating label with adaptive side / align + defer-on-leave timer; popover-tier floating surface."),
            s("containers", "expandable-container", "Expandable Container", "In-place vs Teleport-to-body fullscreen with body-overflow lock-depth."),
            s("containers", "command", "Command Palette", "Fuzzy command tool — a search/command overlay surface, dropdown / context-menu / command-palette family."),
        ],
    },
    {
        id: "navigation",
        title: "Navigation",
        icon: Navigation,
        stories: [
            s("navigation", "tabs", "Tabs", "reka Tabs (default · pill · underline · vertical) + the unified SegmentedTabs spring-slider (segmented · pill · underline variants, multi-select, responsive collapse)."),
            s("navigation", "deck-progress", "Deck Progress", "Thin deck-position rail — DeckProgress + .glass-progress-rail recipe over <Progress>. Library owns the LOOK; the consumer owns the 100·(k+1)/N math + the pinned chrome."),
            s("navigation", "header-ribbon", "Header Ribbon", "Hover-tracking ribbon — an anchor button reveals a control row, then auto-collapses; the anchor slot exposes pinned / toggled state. Shipped /header-ribbon."),
            s("navigation", "carousel", "Carousel"),
        ],
    },
    {
        id: "dock",
        title: "Dock",
        icon: PanelBottom,
        stories: [
            s("dock", "overview", "Overview", "The GlassDock walkthrough — the collapse↔expand morph on one spring, always-expanded media transport, select / dropdown / popover triggers, the slider keep-open hold, content-driven overflow wrap, the big-dock card + tile grid, and the background pause toggle."),
            s("dock", "layers", "Dock Layers", "DockLayerGroup drill-in — named panes with an optional switcher rail, crossfade + size FLIP between layers, collapse-while-switching, and the vertical-overflow case."),
            s("dock", "rail", "Dock Rail", "The vertical `GlassDock variant=\"rail\"` navigation column (refined active-item accent + tap-squish + tooltip anchoring). The \"Dock Rail\" is distinct from the \"Instrument Rail\" (the `<InstrumentRail>` cockpit-ratio chassis column, Compositions) and the layer-switcher rail inside a DockLayerGroup."),
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
            s("data", "timeline-segmented", "Timeline (segmented)", "Multi-phase progress timeline with per-segment gradients + hover/click boundary dots (Z.W2 / A2 §B5)."),
            s("data", "timeline-continuous", "Timeline (continuous)", "ONE rounded-pill rail substrate with N absolute-positioned region children — same TimelineSegment[] shape as segmented, different geometry (AA.W1 / A4 §S-17)."),
            s("data", "search", "Fuzzy Search"),
            s("data", "scrolling-text", "Scrolling Text", "Overflow-detection-driven horizontal marquee for inline text — IPv6 addresses, org names, entity IDs."),
            s("data", "metric-cell", "Metric Cell", "Compact metric card — icon + label over value/unit on a wash-tier surface; dashboard / compact / bare registers. Shipped /metric-cell.", {
                background: "grid",
            }),
            s("data", "metric-stack", "Metric Stack", "Subgrid layout shell hosting a column of <MetricRow> children — audacious poster vs compact result registers, per-row phase tint + active aura. Shipped /metric-stack.", {
                background: "grid",
            }),
        ],
    },
    {
        id: "feedback",
        title: "Feedback",
        icon: Bell,
        stories: [
            s("feedback", "alert", "Alert", "role=\"alert\" status surface — a feedback primitive."),
            s("feedback", "toast", "Toast"),
            s("feedback", "toaster", "Toaster", "Drop-in <ToastProvider> wrapper composed at the layout root."),
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
            s("motion", "springs", "Spring Orchestrator"),
            s("motion", "countup", "Count-up", "Walk [data-countup] figures and tween textContent on the keyframes NumericAnimation engine."),
            s("motion", "reveal", "v-reveal", "Dependency-free entrance directive — sets the [data-reveal] hook + --d stagger step the CSS reads."),
            s("motion", "typewriter", "Typewriter"),
            s("motion", "animated-digit", "Animated Digit", "Single-figure smoothed reel over useAnimatedNumber — tweens a metric toward its bound value so it never snaps; null reads the placeholder."),
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
            s("compositions", "dashboard", "Dashboard", undefined, {
                background: "grid",
            }),
            s("compositions", "auth-shell", "Auth Shell", undefined, {
                background: { kind: "fourier" },
                hero: true,
            }),
            s("compositions", "settings", "Settings"),
            s("compositions", "empty-states", "Empty States"),
            s("compositions", "drawer-live-behind", "Drawer Live-Behind", "Detented non-modal bottom sheet (`mode=\"live-behind\"`) — peek/half/full snap-points over a live, native-size verdict surface."),
            s("compositions", "configurator", "Configurator", "Studio shell — preset row + grouped <ConfiguratorLayer> + a live specimen stage. Aurora is its real consumer."),
            s("compositions", "instrument-chassis", "Instrument Chassis", "Three-region chassis with twin-line bezel grooves and phase cascade; the GlassDock instrument-strip host."),
            s("compositions", "instrument-rail", "Instrument Rail", "Flex-basis cockpit-ratio rail (1/φ²) with engraved bezel hairlines + a twin-line divider rule; the sidekick column of a cockpit composition (AK-W2-α)."),
            s("compositions", "dock-with-slider", "Dock with Slider", "The cross-substrate keepDockOpen proof — a Slider inside a GlassDock holds the dock open through a pointer drag (idle-collapse suppressed) and the dock's shared data-held edge intensifies the thumb halo + tier-shades the substrate."),
            s("compositions", "form-validation", "Form Validation", ":user-invalid / :user-valid rungs + useUserInvalidAria aria-invalid bridge + required asterisk + error slot + Textarea autosize (AQ.W4)."),
            s("compositions", "gate-pattern", "Gate Pattern", "A contained, on-demand preview of the non-dismissable access-modal idiom — a glass-card frame shows the gate; 'Open the modal demo' opens the real modal that refuses esc/scrim/close (`:show-close=false`, `@escape-key-down.prevent`), with the widened `[aria-invalid]` ring + shake feedback, closing on the correct key. A blessed composition, not a component."),
            s("compositions", "labeled-field", "Labeled Field", "Parent SFC + 4 wrappers (Input · Select · Slider · Switch) with shared IconTooltip label."),
            s("compositions", "icon-tooltip", "Icon Tooltip", "Auto-provider tooltip for label co-location with display typography baked in."),
        ],
    },
    {
        id: "composables",
        title: "Composables",
        icon: Cog,
        reference: true,
        stories: [
            s("composables", "use-token-color", "useTokenColor", "Reactive read of a CSS custom property — re-resolves on dark-mode transitions."),
            s("composables", "use-global-dark", "useGlobalDark", "Singleton dark-mode store (createGlobalState wrapper)."),
            s("composables", "use-keyboard-shortcuts", "useKeyboardShortcuts", "registerShortcut + useRegisteredShortcuts pair for scope-aware keybindings."),
            s("composables", "use-resize-observer", "useResizeObserver", "Threshold + rafBatch options for sub-pixel resize storms."),
            s("composables", "use-glass-renderer", "useGlassRenderer", "Detection cascade: SVG-filter → CSS backdrop-filter → fallback."),
            s("composables", "use-animated-number", "useAnimatedNumber", "Single-ref smoothed numeric tracker (absolute / progress modes)."),
            s("composables", "use-dark-mode-sync", "installDarkModeSync", "Re-runs onSync on dark-mode transitions; canonical glue for token-reading compositions."),
            s("composables", "use-intersection-pause", "useIntersectionPause", "Pause a runtime when target scrolls offscreen or document.hidden flips."),
            s("composables", "use-raf-loop", "useRAFLoop", "Scope-aware rAF loop with start/stop/pause/resume/dispose."),
            s("composables", "use-scroll-progress", "useScrollProgress", "Map a target's scroll position in the viewport to [0, 1]."),
            s("composables", "use-spring-orchestrator", "useNumericTransition", "Numeric transition between two named snapshots over a duration."),
            s("composables", "use-stagger-reveal", "useStaggerReveal", "IntersectionObserver-gated entrance cascade."),
            s("composables", "use-sortable", "useSortable", "Pointer-capture drag-reorder with optional cross-list group drops."),
            s("composables", "use-scroll-tracker", "useScrollTracker", "Active-section tracking as host scrolls."),
            s("composables", "use-sidebar-follow", "useSidebarFollow", "Sticky / follow-cursor sidebar behaviour."),
            s("composables", "use-sidebar-state", "useSidebarState", "Orchestrator combining tracker + follow + tree-index."),
            s("composables", "use-tree-index", "useTreeIndex", "Memoised flat-index of a hierarchical tree."),
            s("composables", "use-touch-gate", "useTouchGate", "Touch-vs-pointer disambiguation with a deactivation timer."),
            s("composables", "use-timer", "useTimer", "Scope-aware setTimeout — auto-cleans on dispose."),
            s("composables", "use-interval", "useInterval", "Scope-aware setInterval — companion of useTimer."),
            s("composables", "use-infinite-scroll", "useInfiniteScroll", "Scroll-driven incremental load engine under the InfiniteScroll primitive."),
            s("composables", "use-clipboard", "useClipboard", "Reactive clipboard copy with auto-resetting `copied` flag + execCommand fallback (O.W6 Lane A)."),
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
