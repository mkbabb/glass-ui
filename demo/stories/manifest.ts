/**
 * Story manifest — single source of truth for the storybook.
 *
 * Each row is one navigable page. `component` is a lazy import resolved via
 * `import.meta.glob`, so adding a story means creating its SFC at
 * `demo/stories/<category>/<id>.vue` and appending a row here.
 *
 * The manifest is consumed by `router.ts` (routes), `AppShell.vue` (dock rail
 * + carousel pager), and `useStoryNavigation` (current/next/prev).
 *
 * The IA is 11 coherent categories — Foundations, Substrates, Primitives,
 * Containers, Navigation, Data, Feedback, Motion, Tools, Compositions, and a
 * reference-only Composables shelf collapsed below the fold.
 */
import type { Component } from "vue";
import {
    Compass,
    Droplet,
    Shapes,
    Boxes,
    Navigation,
    Database,
    Bell,
    Sparkles,
    Command,
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
}

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
            s("foundations", "typography", "Typography", "Plus Jakarta Sans + Fira Code — golden-ratio scale."),
            s("foundations", "radii", "Radii", "Radius tokens from xs to pill."),
            s("foundations", "shadows", "Shadows", "Cartoon offset, elevated, modal."),
            s("foundations", "motion", "Motion", "Easings, damped spring linear() curves."),
            s("foundations", "paper-glass", "Paper & Glass", "Four glass tiers, paper grain, blend modes."),
            s("foundations", "icons", "Icons", "Lucide, 2px stroke, semantic sizes."),
            s("foundations", "surface-tints", "Surface Tints", "9-rung tint scale + V.W3 tier aliases (quiet / floating / modal)."),
            s("foundations", "overlays-scrims", "Overlays & Scrims", "Three scrim weights + ModalOverlay + motion / lift offsets."),
            s("foundations", "chart-chassis-palette", "Chart & Chassis Palette", "Chart aliases (ping / download / upload / jitter) + chassis-tier opacities + specular tokens."),
            s("foundations", "paper-backdrop-texture-system", "Paper Backdrop Texture System", "`<PaperBackdrop>` frequency register (clean / aged) + cascade-overridable --paper-* tokens (P.W3 Lane C)."),
            s("foundations", "paper-backdrop", "Paper Backdrop", "Paper-grain texture substrate, two frequencies (clean / aged) + opacity knob."),
            s("foundations", "dock-active-tokens", "Dock Active Tokens", "--dock-active-{bg,color,scale,border,shadow} cohort — token-only override pattern (O.W6 Lane B)."),
            s("foundations", "css-utilities", "CSS Utilities", "`@utility scale-on-hover` over `--scale-hover` — per-scope override cascade (O.W6 Lane C)."),
        ],
    },
    {
        id: "substrates",
        title: "Substrates",
        icon: Droplet,
        stories: [
            s("substrates", "aurora", "Aurora", "Procedural painterly gradients — multi-nuclei composition, four mediums, cursor-driven swirl. Shipped /aurora."),
            s("substrates", "goo-blob", "GooBlob + WatercolorDot", "WebGL2 metaball on the shared substrate (injected color resolver) + a CSS/SVG pastel swatch. Shipped /goo-blob + /watercolor-dot."),
            s("substrates", "blob-interaction", "GooBlob Interaction", "The pointer-reactive blob (AW.W10) — frame-rate-independent spring follow, decaying-radius pseudopod trail, volume-preserving velocity squash, and a one-shot click spring impulse. Lit + circular merge + warp."),
            s("substrates", "glass-panel", "Glass Panel", "Five-rung glass tier ladder over a renderer-tier detection cascade (svg-filter / css / fallback) — a substrate, not a UI primitive."),
            s("substrates", "constellation", "Constellation", "A drifting proximity-graph lattice on the Canvas2D substrate (park/freeze/dispose). The neutral lattice ships; the --primary focal node is a consumer drawOverlay pass. Shipped /constellation."),
            s("substrates", "glass-material", "Glass Material", "The unified .glass-material grammar (moving-specular + edge-rim from one mixin) + the four @supports-gated Baseline-2025 SOTA folds — convex-lens refract, squircle, chromatic edge-dispersion, adaptive tint — each over a working fallback (AW.W22/W23)."),
        ],
    },
    {
        id: "primitives",
        title: "Primitives",
        icon: Shapes,
        stories: [
            s("primitives", "buttons", "Buttons"),
            s("primitives", "card", "Card", "Five-tier glass surface — wash · quiet · resting · floating · overlay; orthogonal surface=cartoon decoration; scroll-pane recipe; polymorphic root via reka-ui Primitive."),
            s("primitives", "inputs", "Inputs"),
            s("primitives", "textarea", "Textarea"),
            s("primitives", "checks", "Checkbox · Radio · Switch"),
            s("primitives", "slider", "Slider", "Two recipes — standard (continuous rounded iOS knob) + spectrum (gradient-track color slider)."),
            s("primitives", "number-field", "Number Field"),
            s("primitives", "select", "Select"),
            s("primitives", "combobox", "Combobox"),
            s("primitives", "multi-select", "Multi-Select"),
            s("primitives", "toggle", "Toggle · Toggle Group"),
            s("primitives", "toggle-chip", "Toggle Chip", "chip vs cell variants over a reka-ui Toggle root; aria-pressed semantics."),
            s("primitives", "label", "Label"),
            s("primitives", "badge", "Badge"),
            s("primitives", "separator", "Separator"),
            s("primitives", "section", "Section", "Sectioning landmark over the typography ladder — title / description / tone / gap."),
            s("primitives", "metric-badge", "Metric Badge"),
            s("primitives", "metric-pill", "Metric Pill", "A `MetricBadge` composition — `labelPosition=stacked` + `density=spacious` + `size=lg` baked in. Not a parallel primitive."),
            s("primitives", "status-dot", "Status Dot"),
            s("primitives", "pulse", "Pulse"),
            s("primitives", "stacked-icons", "Stacked Icons", "Overlapping icon stack with maxVisible / +N overflow; size axis only."),
            s("primitives", "dark-mode-toggle", "Dark Mode Toggle", "Size axis (sm · md · lg · control standalone; dock sizes to its GlassDock host); composes useGlobalDark."),
            s("primitives", "glyph-face", "Glyph Face", "Phase-tinted lucide wrapper with catch-light cap; clips to a descendant DiscoGlyph silhouette via provide/inject."),
            s("primitives", "disco-glyph", "Disco Glyph", "Faceted SVG glyph primitive — 8-stop linear facet × 165° specular cap, phase-tinted on activation; writes its silhouette into a wrapping GlyphFace."),
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
        ],
    },
    {
        id: "navigation",
        title: "Navigation",
        icon: Navigation,
        stories: [
            s("navigation", "tabs", "Tabs", "reka Tabs (default · pill · underline · vertical) + the custom BouncyTabs spring-slider variant."),
            s("navigation", "deck-progress", "Deck Progress", "Thin deck-position rail — DeckProgress + .glass-progress-rail recipe over <Progress>. Library owns the LOOK; the consumer owns the 100·(k+1)/N math + the pinned chrome (AW.W16)."),
            s("navigation", "dock", "Dock"),
            s("navigation", "dock-layers", "Dock Layers"),
            s("navigation", "rail", "Dock Rail", "Vertical GlassDock variant behind the demo's category nav."),
            s("navigation", "carousel", "Carousel"),
            s("navigation", "glass-carousel", "Glass Carousel", "GlassCarousel items and composable controls."),
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
            s("motion", "transitions", "Transitions"),
            s("motion", "springs", "Spring Orchestrator"),
            s("motion", "countup", "Count-up", "Walk [data-countup] figures and tween textContent on the keyframes NumericAnimation engine."),
            s("motion", "reveal", "v-reveal", "Dependency-free entrance directive — sets the [data-reveal] hook + --d stagger step the CSS reads."),
            s("motion", "typewriter", "Typewriter"),
        ],
    },
    {
        id: "tools",
        title: "Tools",
        icon: Command,
        stories: [
            s("tools", "command", "Command Palette", "Fuzzy command tool — search/command surface, not nav structure."),
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
            s("compositions", "dock-with-slider", "Dock with Slider", "Cross-substrate `keep-dock-open` contract — slider thumb-halo + dock substrate response while dragging."),
            s("compositions", "drawer-live-behind", "Drawer Live-Behind", "Detented non-modal bottom sheet (`mode=\"live-behind\"`) — peek/half/full snap-points over a live, native-size verdict surface."),
            s("compositions", "configurator", "Configurator", "Studio shell — preset row + grouped <ConfiguratorLayer> + a live specimen stage. Aurora is its real consumer."),
            s("compositions", "instrument-chassis", "Instrument Chassis", "Three-region chassis with twin-line bezel grooves and phase cascade; the GlassDock instrument-strip host."),
            s("compositions", "form-validation", "Form Validation", ":user-invalid / :user-valid rungs + useUserInvalidAria aria-invalid bridge + required asterisk + error slot + Textarea autosize (AQ.W4)."),
            s("compositions", "gate-pattern", "Gate Pattern", "The non-dismissable access-modal idiom — a form-in-Dialog refusing esc/scrim/close (`:show-close=false`, `@escape-key-down.prevent`), with the widened `[aria-invalid]` ring + shake feedback. A blessed composition, not a component (AW.W18)."),
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
