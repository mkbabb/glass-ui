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

/**
 * The per-category background map (BA.W-STAGE scope 1 — page-backgrounds.md §4).
 *
 * EVERY story row resolves a background: a row's explicit `opts.background` wins,
 * else it INHERITS its category default below. This is the zero-keyless-routes
 * mechanism — the storybook stops being an 80%-blank near-black void (BG-1/BG-5).
 *
 * The principle: ONE idiom-true background per CATEGORY (so a category reads as a
 * coherent place), varied ACROSS categories (not one aurora), honoring the
 * one-GL-per-route budget — live GL (aurora/constellation/fourier) is clustered on
 * the Substrates / Navigation / Dock / Motion bands (one context per route); the
 * dense Forms / Display / Containers / Data / Feedback bands ride the calm STATIC
 * washes (grid / paper), which are free and DARK-recalibrated (story-hero.css) so
 * they read THROUGH the card.
 *
 *   - foundations → paper   (token/ink pages; the intro/paper-glass/motion heroes win explicit)
 *   - substrates  → aurora  (the GL showcase band; glass-panel inherits — glass over a live field)
 *   - forms       → grid    (engineering-paper ruled grid — the native forms fit)
 *   - display     → paper   (printed-specimen warm-cream grain; card wins explicit aurora-hero)
 *   - containers  → grid    (glass surfaces over a calm blueprint wash)
 *   - navigation  → aurora  (glass nav chrome over a live field)
 *   - dock        → grid    (the page wash is the FREE blueprint grid; the live aurora the
 *                            dock glass reads against is delivered by the in-page DockStage
 *                            lever — A3 — so the route mounts exactly ONE GL context, not a
 *                            doubled StoryHero-page-aurora + DockStage-aurora. The one-GL-per-route
 *                            budget is binding; "Dock → aurora" in page-backgrounds.md §4 is
 *                            REALIZED via DockStage, not a second page-level field.)
 *   - data        → grid    (ledger/table/metric blueprint-grid fit)
 *   - feedback    → paper   (printed status specimens; subtle, calm)
 *   - motion      → constellation (the motion/drift band identity; curve-gallery/handmark win explicit)
 *   - compositions→ grid    (the blank scenes fall to grid; the keyed comps win explicit)
 */
const CATEGORY_DEFAULT_BG: Record<string, StoryBackground> = {
    foundations: "paper",
    substrates: "aurora",
    forms: "grid",
    display: "paper",
    containers: "grid",
    navigation: "aurora",
    dock: "grid",
    data: "grid",
    feedback: "paper",
    motion: "constellation",
    compositions: "grid",
};

function s(
    cat: string,
    id: string,
    title: string,
    blurb?: string,
    opts?: StoryOptions,
): Story {
    // Every row resolves a background — its explicit declaration wins, else it
    // inherits the per-category default (BA.W-STAGE scope 1; zero keyless routes,
    // the proof:stage W1 witness). A category with no default entry would leave a
    // route keyless — the map above covers every category in CATEGORIES.
    const background = opts?.background ?? CATEGORY_DEFAULT_BG[cat];
    return {
        id,
        title,
        blurb,
        component: lazy(cat, id),
        background,
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
            // BA.W-FOURIER-STUDIO — the FOREGROUND studio (the aurora-studio idiom):
            // the 1..K partial-sum slider + orthogonal epicycle axes + the
            // dftFromPoints shape-trace + the controllable clock on the house
            // transport. Its OWN Canvas2D stage + ambient companion ARE the fourier
            // surface, so the route declares a CALM `paper` background (NOT a live
            // `fourier`/`aurora` field) — one-GL/one-Canvas2D-per-route holds (the
            // stage is the single live context; no competing background field).
            s(
                "substrates",
                "fourier-studio",
                "Fourier Studio",
                "The foreground Fourier studio — a Configurator over a Canvas2D stage. Drag the harmonic-count N slider and WATCH the summed curve assemble term by term; toggle epicycles orthogonally; trace the ℱ wordmark / heart / star by its own forward DFT; and drive a controllable clock (play / pause / scrub / speed) on the house transport. The ambient field is the recessive companion.",
                {
                    background: "paper",
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
            // BA.W-STAGE scope 2 / page-backgrounds.md §5 DRIFT — the §5 cite says
            // glass-panel is "currently blank" and should "gain aurora". At HEAD
            // glass-panel.vue ALREADY self-stages its five-rung ladder over a
            // contained body <Aurora> (glass-panel.vue:80, W12) — the glass-over-a-
            // live-field demo is PRESENT. glass-panel.vue is OUT of this wave's bound,
            // so inheriting the substrates `aurora` default would stack a SECOND GL
            // context (the StoryHero contained page aurora + the body aurora) on the
            // route. It declares `grid` (a FREE static wash behind the card) so the
            // route mounts exactly ONE GL context — its existing body aurora — the
            // one-GL-per-route budget (BA invariant 9) held.
            s(
                "substrates",
                "glass-panel",
                "Glass Panel",
                "Five-rung glass tier ladder over a renderer-tier detection cascade (svg-filter / css / fallback) — a substrate, not a UI primitive. Shipped /glass-panel.",
                {
                    background: "grid",
                },
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
            // BA.W-STAGE scope 2 / page-backgrounds.md §5 DRIFT — the §5 cite says
            // `/display/card` is "currently blank" and should be staged over an
            // aurora HERO. At HEAD card.vue ALREADY self-stages: it hand-rolls TWO
            // contained <Aurora> backdrops (card.vue:126,302, W12) under which the
            // five tiers float — the R8-11 glass-over-aurora demo is ALREADY PRESENT.
            // card.vue is OUT of this wave's bound (only glass-material.vue is), so
            // adding a hero page-aurora would stack a THIRD GL context on the route
            // (the binding one-GL-per-route fence, BA invariant 9). The route inherits
            // the display `paper` default (a FREE static wash behind the card) and
            // its two body auroras remain the live-field demos — budget-clean, the
            // staging intent satisfied by the existing self-staging.
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
            // BA.W-DOCK-SECTIONS — the declarative tripartite section chassis. A
            // `sections` descriptor array renders the rail-core | divided sections |
            // nav zones over the dock's in-flow controls by composing <DockSeparator>
            // (display: contents — the dock box shrink-wraps as before, no inflation).
            // No live substrate: <DockSection> is chrome over existing controls.
            s(
                "dock",
                "sections",
                "Dock Sections",
                "The declarative <DockSection> chassis (BA.W-DOCK-SECTIONS) — pass ONE `sections: DockSectionDescriptor[]` array and the dock body renders the three-zone gestalt (a leading rail-core home/brand region, named divider-demarcated section groups, a trailing nav group) by composing <DockSeparator> over the controls a consumer already places. display: contents so the dock box shrink-wraps unchanged; a 5-section dock renders from the array, never a hardcoded literal.",
            ),
            // BB.B2 W-DOCKMORPH-CTA — the external-CTA-morphs-into-dock seam (the iOS
            // bloom-from-source INVERSE). An external CTA button flies + reshapes from
            // its own rect ONTO a dock control's rect, fades + congests into the glass,
            // then hands off — composing the shipped useDockCtaReceive leaf (the SAME kf
            // ElementMorph substrate useLiquidReveal activates), a consuming seam beside
            // W-DOCK-MORPH-FAMILY. Compositor-only + PRM-seats. Over DockStage (no
            // net-new GL).
            s(
                "dock",
                "cta-receive",
                "CTA → Dock Morph",
                "The external-CTA-morphs-into-dock seam (BB.B2 W-DOCKMORPH-CTA) — an external CTA button flies + reshapes from its own rect ONTO a target dock control, fades + congests into the glass, then hands off (the dock control owns the spot). The iOS bloom-from-source inverse: composes the SAME kf ElementMorph + springTimingFunction substrate useLiquidReveal activates (useDockCtaReceive), a consuming seam beside the dock morph mechanism (no dockMorphContext/DOCK_SPRING edit). Compositor-only (transform/opacity/filter); reduced-motion snaps the CTA to gone + hands off.",
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
                "scroll-choreography",
                "Scroll Choreography",
                "The SOTA scroll-driven choreography register — the page builds in on route-enter (.scroll-build), the sections cascade as you scroll (.scroll-cascade), and a showcase pins and advances through phases (.scroll-pin) on the native scroll()/view()/timeline-scope substrate. Compositor-only + PRM-safe + the native smooth-scroll opt-in; ZERO Lenis/GSAP dep.",
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
                {
                    // BA.W-STAGE scope 1 — the per-route exception: the hand-voice
                    // demo IS a paper-grain register surface (its blurb + its own
                    // paper-grain cards), so it declares `paper` rather than inherit
                    // the motion-band constellation default. Idiom-true + free
                    // (a static wash, within the one-GL budget).
                    background: "paper",
                },
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
