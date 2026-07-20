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
 * primitive's own section), Data, Feedback, Motion, and Compositions.
 */
import type { Component } from "vue";
import type { StoryBackground } from "../chassis/hero/aurora-hero";
import type { StoryBody } from "../chassis/body/story-body";
import { CATEGORY_HERO } from "../chassis/hero/category-hero";
import { makeLazy } from "./manifest/lazy";
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

/**
 * The hero title size rung follows the depth-keyed √φ ladder. Every
 * route resolves a rung ≥ `4`. The depth tier maps to a rung: D0 front door uses
 * `mega`, D1 section landing uses `hero`, D2 main uses `5`–`hero`, and D3 sub uses `4`.
 */
export type HeroScale = "audacious" | "mega" | "hero" | "5" | "4";

/** The page-depth tier. Reads as title size — depth IS size. */
export type StoryDepth = "D0" | "D1" | "D2" | "D3";

export interface Story {
    id: string;
    title: string;
    /**
     * The short hero wordmark or phrase. On a
     * HERO page the chassis renders the display <h1> as `displayTitle ?? title`,
     * so a front-door composition declares a SHORT wordmark (≤ ~2 words) that fits
     * the height-aware fit-cap without hyphenation at 375px (the semantic `title`
     * stays the long nav/breadcrumb/search label). Unset on a content page (the
     * chrome <h1> reads the semantic `title`).
     */
    displayTitle?: string;
    blurb?: string;
    component: () => Promise<Component>;
    /**
     * The per-page background substrate, painted behind the page's glass
     * container. A hero page declares a rich live substrate (aurora,
     * constellation, fourier); a content page declares a calm paper, grid
     * wash, or nothing for the quiet default. The page chassis reads it and
     * renders it once — no page hand-rolls its own backdrop.
     */
    background?: StoryBackground;
    /**
     * Render the page as a full-bleed glassy HERO over its live substrate (the
     * front-door demonstration) rather than the contained content register.
     */
    hero?: boolean;
    /**
     * The hero title size rung (the depth-keyed √φ ladder). Resolved from `depth`
     * when unset; an explicit value (a marquee `hero` on a live-GL sub-page) wins.
     */
    heroScale?: HeroScale;
    /**
     * The page-depth tier. The FIRST story in a category is the
     * D2 main; the rest are D3 subs — `s()` derives this from position when unset.
     */
    depth?: StoryDepth;
    /**
     * The pages-as-data body. A specimen page declares its sections
     * + specimens as DATA (`StoryBody`, no hand-authored template). The DATA rides
     * the story SFC (which passes it to the `body` prop on `StoryPage`), so the per-route
     * component imports stay code-split — the manifest never eager-imports a page's
     * components. A hero scene, bespoke composition declares no `body`.
     *
     * Story-specific composition stays in the existing slots or bespoke node;
     * the shared schema grows only for repeated product-shaped demand.
     */
    body?: StoryBody;
    /**
     * the co-located landing-tile loader (the AUTHORED rung of the
     * per-story tile ladder). A bespoke page whose marquee is not a spec-sheet `body`
     * (a Button variant cluster, a mini GlassDock) ships a co-located
     * `<cat>/<id>.tile.vue` — a bounded, inert, 0-GL vignette of the story's headline
     * component. Resolved from the tile glob by the `s()` factory (undefined when no
     * file exists, so the ladder falls through to still/body/identity). The tile file
     * class is a co-located helper (NOT a route): the story glob excludes it and the
     * bijection gates exempt it.
     */
    tile?: () => Promise<Component>;
}

/** Re-export the descriptor type so consumers reach it from the manifest. */
export type { StoryBackground } from "../chassis/hero/aurora-hero";

export interface Category {
    id: string;
    title: string;
    icon: LucideIcon;
    /** Reference-only shelf — rendered collapsed below the fold in the rail. */
    reference?: boolean;
    stories: Story[];
    /**
     * The section-landing hero. Each
     * category's `/<id>` route resolves to a newly-begotten D1 hero (the section's
     * identity moment) over the bento `<SectionPreviewCard>` grid of its stories.
     * Synthesized by `sectionLanding(category)` below — never hand-authored.
     */
    landing?: SectionLanding;
}

/** The per-section landing descriptor (the `/<category>` D1 hero — the bento parent). */
export interface SectionLanding {
    /** The category title — the audacious section <h1>. */
    title: string;
    /** The one-line section subtitle. */
    blurb: string;
    /** The section field — the category's idiom-true background. */
    background: StoryBackground;
    /** D1 always — the largest audacious rung, out-sizing every page beneath it. */
    heroScale: HeroScale;
    depth: StoryDepth;
}

// ── The δ5/δ6 manifest-carve+glob DECISION ( δ5/δ6). ────────────────────────
// δ6 (glob `./*/*.vue` → `./*/*/index.vue` + per-story-dir moves) is DROPPED — the
// family table is authoritative,
// and KISS keeps ~80 trivial single-file stories FLAT `<category>/<id>.vue`. The glob
// below stays flat by DESIGN; a change to `./*/*/index.vue` renders every flat story
// blank (the runtime route-walk hazard the wave warns about).
//
// Keep the typed route rows in place and the glob-resolved SFC loader in
// `./manifest/lazy.ts`; no generated catalogue or parallel route registry exists.
const modules = import.meta.glob<{ default: Component }>("./*/*.vue");

const lazy = makeLazy(modules);

// the co-located landing-tile glob (the AUTHORED ladder rung). A
// co-located `<cat>/<id>.tile.vue` resolves the story row's `tile` loader; a story
// with no tile file resolves `undefined` (the ladder falls through to the frozen
// still, the body marquee, the identity floor). A tile SFC is never a route: routes
// are built from the CATEGORIES rows, never from this glob (or from `modules`, where
// a tile key simply sits unused). This separate glob keys the `tile` loader ONLY, so
// `makeLazy`/the story resolver never touches a tile file.
const tileModules = import.meta.glob<{ default: Component }>("./*/*.tile.vue");

/** Resolve a story's co-located `.tile.vue` loader, or `undefined` when absent. */
function tileLoader(cat: string, id: string): (() => Promise<Component>) | undefined {
    const loader = tileModules[`./${cat}/${id}.tile.vue`];
    return loader ? () => loader().then((m) => m.default) : undefined;
}

/** Per-page container options — the declared background + the hero register. */
interface StoryOptions {
    background?: StoryBackground;
    hero?: boolean;
    /**
     * the MANDATORY short hero wordmark (see Story.displayTitle).
     * A `hero: true` front-door composition declares it so the chassis renders a
     * SHORT title through the height-aware fit-cap.
     */
    displayTitle?: string;
    /**
     * The explicit hero title rung override. Unset → `s()`
     * derives it from the position-keyed depth (D2 main → `5`, D3 sub → `4`); a
     * live-GL marquee story sets `heroScale: "hero"` so it keeps the largest sub-rung.
     */
    heroScale?: HeroScale;
    /** The section-landing field — the category's idiom-true background. */
    landingBackground?: StoryBackground;
}

/**
 * The per-category background map.
 *
 * EVERY story row resolves a background: a row's explicit `opts.background` wins,
 * else it INHERITS its category default below. This is the zero-keyless-routes
 * mechanism, keeping every route grounded in a deliberate field.
 *
 * The principle: ONE idiom-true background per CATEGORY (so a category reads as a
 * coherent place), varied ACROSS categories (not one aurora), honoring the
 * one-GL-per-route budget — live GL (aurora/constellation/fourier) is clustered on
 * the Substrates, Navigation, Dock, Motion bands (one context per route); the
 * dense Forms, Display, Containers, Data, Feedback bands ride the calm STATIC
 * washes (grid, paper), which are free and DARK-recalibrated (story-hero.css) so
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

/** The per-category section-landing one-line subtitle. */
const LANDING_BLURBS: Record<string, string> = {
    foundations: "The token, ink, and paper vocabulary the system is built from.",
    substrates: "The procedural WebGL/WebGPU fields the glass floats over.",
    forms: "Glass-tier controls — the input, select, and toggle family.",
    display: "The atomic primitives — buttons, cards, badges, metrics.",
    containers: "Glass surfaces over a calm blueprint wash — dialogs, sheets, menus.",
    navigation: "Glass nav chrome over a live field — tabs, carousel, ribbon.",
    dock: "The GlassDock family — collapse↔expand morph, layers, sections.",
    data: "Ledger surfaces — tables, timelines, metrics over the blueprint grid.",
    feedback: "Status surfaces — alerts, toasts, progress over printed specimens.",
    motion: "The spring, curve, and reveal vocabulary — the drift band identity.",
    compositions: "Real scenes — dashboards, auth shells, the math-paper idiom.",
};

function s(
    cat: string,
    id: string,
    title: string,
    blurb?: string,
    opts?: StoryOptions,
): Story {
    // Every row resolves a background: an explicit declaration wins, otherwise
    // the category default applies. CATEGORY_DEFAULT_BG covers every category.
    const background = opts?.background ?? CATEGORY_DEFAULT_BG[cat];
    return {
        id,
        title,
        // the MANDATORY short hero wordmark threads from the row
        // opts; unset on a content page (the chrome <h1> reads the semantic title).
        displayTitle: opts?.displayTitle,
        blurb,
        component: lazy(cat, id),
        background,
        hero: opts?.hero,
        // the AUTHORED landing-tile rung: resolved from the
        // `./*/*.tile.vue` glob (undefined when no co-located tile file exists, so
        // the tile ladder falls through to the frozen still, body marquee, identity).
        tile: tileLoader(cat, id),
        // depth + heroScale are finalized by assignDepths() once the category's
        // story order is known (the FIRST story is the D2 main; the rest D3 subs).
        heroScale: opts?.heroScale,
    };
}

/**
 * Build the section-landing descriptor for a category. The
 * SECTION-HERO model). The `/<id>` route resolves to this D1 hero — the LARGEST
 * audacious rung, the section's identity moment — over the bento grid of its stories.
 * Never hand-authored; derived from the category + the landing maps above.
 */
function sectionLanding(cat: Category): SectionLanding {
    // Each section landing reads its distinct field
    // from the per-category CATEGORY_HERO descriptor (the `bgKind` + the per-category
    // aurora `heroPalette`), so substrates wears its aurora-blue field, motion its
    // constellation-violet, forms its grid-teal — never the one-aurora sameness. An
    // aurora band carries the per-category palette key (the ONE color event); the
    // static grid/paper bands carry no palette (a static wash has no aurora stops).
    const hero = CATEGORY_HERO[cat.id];
    const bgKind = hero?.bgKind ?? CATEGORY_DEFAULT_BG[cat.id] ?? "paper";
    const background: StoryBackground =
        bgKind === "aurora" && hero
            ? { kind: "aurora", palette: hero.heroPalette }
            : bgKind;
    return {
        title: cat.title,
        blurb: LANDING_BLURBS[cat.id] ?? `The ${cat.title.toLowerCase()} family.`,
        background,
        heroScale: "hero",
        depth: "D1",
    };
}

/**
 * Finalize each story's depth + heroScale from the depth-keyed
 * √φ ladder). The FIRST story in a category is the D2 MAIN (the marquee anchor);
 * every subsequent story is a D3 SUB. The hero rung floors at the depth tier — D0
 * `mega`, D2 `5`, D3 `4` — and an explicit `heroScale` override (a live-GL marquee
 * keeping `hero`) wins, never resolving below `4` (the user-mandate floor). The
 * front door (`foundations/intro`) is the lone D0 — the storybook root.
 */
function assignDepths(categories: Category[]): void {
    for (const cat of categories) {
        // The front door (foundations/intro) is the lone D0 — the storybook root,
        // out-sized only by the 11 D1 section landings. The MAIN of each category is
        // its first NON-front-door story (in foundations that is `colors`, since intro
        // is the D0 root); the rest are D3 subs.
        let mainSeen = false;
        cat.stories.forEach((story) => {
            const isFrontDoor = cat.id === "foundations" && story.id === "intro";
            let depth: StoryDepth;
            if (isFrontDoor) {
                depth = "D0";
            } else if (!mainSeen) {
                depth = "D2";
                mainSeen = true;
            } else {
                depth = "D3";
            }
            story.depth = depth;
            if (!story.heroScale) {
                story.heroScale = depth === "D0" ? "mega" : depth === "D2" ? "5" : "4";
            }
        });
        cat.landing = sectionLanding(cat);
    }
}

export const CATEGORIES: Category[] = [
    {
        id: "foundations",
        title: "Foundations",
        icon: Compass,
        stories: [
            s(
                "foundations",
                "intro",
                "Intro",
                "A design system built around warm cream, cartoon offset shadows, and the published Plus Jakarta Sans brand face. Tailwind-native, Vue 3.5, reka-ui primitives under the hood.",
                {
                    background: { kind: "aurora", palette: "rose-indigo-amber" },
                    hero: true,
                    // the front-door wordmark (the D0 root). The
                    // chassis renders this through the height-aware fit-cap; the ℱ
                    // ornament rides the #title-ornament slot in intro.vue.
                    displayTitle: "glass-ui",
                },
            ),
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
                    // A paper-glass marquee specimen (the live glass-tier demo).
                    heroScale: "hero",
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
                "Three scrim weights + Dialog motion / lift offsets.",
            ),
            s(
                "foundations",
                "chart-palette",
                "Chart Palette",
                "Visualization aliases shown as a token ladder and direct color swatches.",
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
                    background: "paper",
                    hero: true,
                    // The D2 marquee main of the live-GL band — the largest sub-rung.
                    heroScale: "hero",
                },
            ),
            s(
                "substrates",
                "blob",
                "Blob",
                "WebGL2 metaball droplet on the shared substrate (injected color resolver) — the lit static register, the pointer-reactive interaction hero, the mood + seed-palette model, and the pause seam. Shipped /blob + /watercolor-dot.",
                {
                    // A Blob is a CONTAINED creature, not a page-field — the page
                    // presents its studio over a calm paper wash (the
                    // prior `background: "blob"` blew the creature to full-page width).
                    background: "paper",
                    hero: true,
                    // A live-GL marquee specimen — keeps the largest D3 sub-rung.
                    heroScale: "hero",
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
                    heroScale: "hero",
                },
            ),
            // the ONE Fourier view (the collapse). The three duplicate
            // views (the ambient page, the re-embedded ambient companion, the separate
            // Canvas2D stage) collapse to this single <FourierField> over its configurator:
            // the field IS both the ambient register and the interactive teaching surface.
            // The renderer is the WGSL-primary GPU substrate (the Canvas2D renderer RETIRED).
            // The route declares a CALM `paper` background (NOT a live `fourier` field) — the
            // view's OWN <FourierField> is the single live GPU context (one-GL-per-route).
            s(
                "substrates",
                "fourier-field",
                "Fourier Field",
                "ONE Fourier view on the WebGPU substrate. Drag the harmonic-count N slider and WATCH the reconstructing curve assemble term by term — a single ellipse climbing to the full reconstruction; toggle the rotating epicycle chain orthogonally; trace the ℱ wordmark / heart / star by its own forward DFT; pick a color; and SCRUB the reconstruction by dragging the cursor across the field. No Canvas2D anywhere.",
                {
                    background: "paper",
                    hero: true,
                    heroScale: "hero",
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
                    heroScale: "hero",
                },
            ),
            // The page already stages its material ladder over a contained Aurora.
            // Use a static grid page background so this route mounts one GL context.
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
            s(
                "forms",
                "inputs",
                "Inputs",
                "Text, email, and password fields with clear focus, invalid, disabled, and read-only states.",
            ),
            s(
                "forms",
                "checks",
                "Checkbox · Radio · Switch",
                "Selection controls with native labels, keyboard behavior, indeterminate state, and shared disabled treatment.",
            ),
            s(
                "forms",
                "slider",
                "Slider",
                "Two recipes — standard (continuous glass fill, no visible thumb) + spectrum (gradient-track color slider).",
            ),
            s(
                "forms",
                "number-field",
                "Number Field",
                "Bounded numeric entry with step controls, keyboard parity, and explicit invalid and disabled states.",
            ),
            s(
                "forms",
                "toggle",
                "Toggle Group",
                "Single- and multi-select action strips with roving focus and honest pressed state.",
            ),
            s(
                "forms",
                "chip",
                "Chip",
                "Explicit static, selectable, action, and removable semantics over pill, cell, and icon geometry.",
            ),
            // the LabeledField family (parent SFC + 4
            // wrappers over Input · Select · Slider · Switch): a single forms
            // family, not a composed scene.
            s(
                "forms",
                "labeled-field",
                "Labeled Field",
                "Parent SFC + 4 wrappers with a real label, persistent supplemental description, and keyboard-reachable help trigger.",
            ),
        ],
    },
    {
        id: "display",
        title: "Display",
        icon: Shapes,
        stories: [
            s(
                "display",
                "buttons",
                "Buttons",
                "Action hierarchy across emphasis, size, loading, disabled, icon, and composed-link states.",
            ),
            s(
                "display",
                "surface",
                "Surface",
                "Four semantic material roles, three orthogonal decorations, and the deep, grain, and specular facilities on the canonical plate primitive.",
            ),
            // The card page owns its contained live-field examples. Keep the page
            // background static so those examples are the route's only GL contexts.
            s(
                "display",
                "card",
                "Card",
                "Semantic content groups with proportional anatomy, explicit density and selection; compose Button or Link for commands.",
            ),
            s(
                "display",
                "badge",
                "Badge",
                "Compact status and metadata labels across neutral, semantic, and data-viz tones.",
            ),
            s(
                "display",
                "atoms",
                "Atoms",
                "The designed atoms wall — separator, status-dot, avatar, and the dark-mode toggle on ONE page, sectioned by the family switcher.",
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
            s(
                "containers",
                "sheet",
                "Sheet",
                "Side-placed dialog surfaces with modal focus, dismissal, and placement semantics.",
            ),
            s(
                "containers",
                "drawer",
                "Drawer",
                "Detented side and bottom drawers with reversible motion and optional live-behind content.",
            ),
            s(
                "containers",
                "popover",
                "Popover",
                "Click-anchored floating panels with collision-aware placement, dismissal, and focus restoration.",
            ),
            s(
                "containers",
                "dropdown-menu",
                "Dropdown Menu",
                "Trigger-anchored action menus with groups, checks, submenus, disabled items, and keyboard navigation.",
            ),
            s(
                "containers",
                "context-menu",
                "Context Menu",
                "Pointer-positioned contextual actions with the same grouped menu and keyboard semantics.",
            ),
            s(
                "containers",
                "hover-card",
                "Hover Card",
                "Non-interactive previews disclosed from keyboard-reachable triggers after deliberate hover or focus.",
            ),
            s(
                "containers",
                "tooltip",
                "Tooltip",
                "Concise descriptions for keyboard- and pointer-reachable triggers with collision-aware placement.",
            ),
            s(
                "containers",
                "accordion",
                "Accordion",
                "Stacked disclosure sections with linked triggers, panels, disabled state, and keyboard traversal.",
            ),
            s(
                "containers",
                "collapsible",
                "Collapsible",
                "A single labelled disclosure region with reversible motion and reduced-motion parity.",
            ),
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
                "Searchable command groups inline or in a titled Dialog, with shared selection, keyboard navigation, empty and disabled states.",
            ),
            // the Configurator studio shell as a
            // single-library-family surface demo.
            s(
                "containers",
                "configurator",
                "Configurator",
                "Studio shell — preset row + grouped <ConfiguratorLayer> + a live specimen stage. Aurora is its real consumer.",
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
                "Two tab materials on one engine — pill (glass) and underline (paper) — with a spring-slider indicator, horizontal and vertical orientation, draggable pills, and a responsive collapse to a Select.",
            ),
            s(
                "navigation",
                "carousel",
                "Carousel",
                "Drag and keyboard navigation over crisp slides with direct, bounded pager controls.",
                { background: "aurora" },
            ),
            s(
                "navigation",
                "pager-dots",
                "Pager Dots",
                "Accessible direct page navigation with an instance-local liquid indicator, bounded windowing, and dynamic count recovery.",
            ),
            s(
                "navigation",
                "header-ribbon",
                "Header Ribbon",
                "Glass command band — a persistent action row pinned to a viewport corner, expanded and operable from first paint, at left or right placement. Shipped /header-ribbon.",
            ),
            s(
                "navigation",
                "toc-tracking",
                "ToC Tracking",
                "The reconciled ToC-tracking family from /sidebar — deepest-visible active highlight (useScrollTracker), damped sidebar follow, a ToC-click warm-then-scroll (useScrollTo + the virtual-window bridge), ONE delegated click handler (useClickDelegate), and a progressive batch-render (useLazyLoader). One home, no second engine.",
            ),
        ],
    },
    {
        id: "dock",
        title: "Dock",
        icon: PanelBottom,
        stories: [
            // the goo-bearing "Liquid Morph" playground + "Dock Gallery"
            // stories are DEFINITION-ABSENT (the fission/metaball spectacle retired
            // decided-terminal + the prime  Safari suspect; clean break, no alias).
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
            // the "Vertical ↔ Horizontal Morph" showcase is
            // DEFINITION-ABSENT (the V↔H goo morph retired decided-terminal — the platform
            // cannot continuously interpolate a flex-column→row topology change; the swap
            // is the crossfade). Clean break, no alias.
            s(
                "dock",
                "sections",
                "Dock Sections",
                "Semantic groups and DockSeparator express dock hierarchy with ordinary DOM, accessible names, and no descriptor layer.",
            ),
            // the reference CONTROLS demo. The dock IS
            // SegmentedTabs/ToggleGroup wearing chrome: its control run is driven by
            // the SAME headless useSelectionGroup engine, its controls are the unified
            // <DockControl> (icon + tab shape axis) + <DockTrigger> (the 3 overlay
            // triggers), and the leading #persistent + trailing #persistent-end slots.
            s(
                "dock",
                "controls",
                "Dock Controls",
                "The dock IS SegmentedTabs/ToggleGroup wearing chrome. Its controls are ordinary members of the selection-control family: one <DockControl> (icon + tab shapes), one <DockTrigger> (select/dropdown/popover), and one headless useSelectionGroup engine driving roving focus, the traveling indicator, role-per-mode ARIA, and the scrollIntoView recenter. The painted plate insets while the hit cell stays the full control size (hit box ≠ paint box) so the target-size floor holds; both the leading #persistent and trailing #persistent-end slots ship natively.",
            ),
            s(
                "dock",
                "overflow",
                "Dock Overflow",
                "Native inline scrolling with an edge mask and scrollIntoView recentering when a control moves past the dock's size cap.",
            ),
            // External CTA morphing into a dock control over the shared DockStage field.
            s(
                "dock",
                "cta-receive",
                "CTA → Dock Morph",
                "An external CTA flies and reshapes onto a target dock control, fades into the glass, then hands off so the dock owns the final spot. Reduced motion skips directly to the handoff.",
            ),
            s(
                "dock",
                "dock-search",
                "Dock Search",
                "The dock IS the search bar — tap the collapsed pill and it morphs continuously (the dock's own --dock-morph-t glide, not a hard swap) into a search field; type and the fuzzy dropdown ranks live with subsequence-match highlighting plus a ghost-text completion of the top match; arrow keys walk the results, Enter routes, a select scrolls-to-and-warms the windowed section below. useDockSearch composes the shipped useFuzzySearch matcher, the virtual-section window, and the scroll-to subuse — the dock owns the gesture, the consumer plugs the data source.",
            ),
            // the "Siri Island" story is DEFINITION-ABSENT (the Siri dock
            // capability is not part of the public dock surface).
            // Clean break, no alias.
        ],
    },
    {
        id: "data",
        title: "Data",
        icon: Database,
        stories: [
            // Ledger and engineering-paper-shaped surfaces
            // are the most NATIVE blueprint-grid-underlay fit; the grid was
            // applied by accident-of-authoring to metric surfaces while these
            // bare table surfaces (the canonical candidates) declared nothing.
            // The calm grid wash (StoryHero drops the card to `wash` over it) is
            // the ONE content event — no live substrate (the over-spend fence).
            s(
                "data",
                "table",
                "Table",
                "Semantic table anatomy with captions, status cells, totals, and responsive overflow.",
                { background: "grid" },
            ),
            s(
                "data",
                "data-table",
                "Data Table",
                "Sortable, selectable data with loading, error, empty, action, and responsive card states.",
                { background: "grid" },
            ),
            s(
                "data",
                "tags-input",
                "Tags Input",
                "Keyboard-editable tags with paste, duplicate prevention, removal, and invalid-state feedback.",
            ),
            s(
                "data",
                "sortable-list",
                "Sortable List",
                "Pointer and keyboard reordering over stable row identities, handles, and announced movement.",
            ),
            s(
                "data",
                "infinite-scroll",
                "Infinite Scroll",
                "A progressive event feed that loads near the edge while preserving status and recovery.",
            ),
            s(
                "data",
                "timeline",
                "Timeline",
                "Continuous and segmented timelines with semantic events, selection, and proportional markers.",
            ),
            s(
                "data",
                "search",
                "Fuzzy Search",
                "Fuzzy ranking, match highlighting, keyboard navigation, and virtualized result presentation.",
            ),
            s(
                "data",
                "virtual-section",
                "Virtual Section Window",
                "A 1000-section document that renders only the ~20 sections near the viewport — spacer divs hold the full scroll height, and a jump seats the far scroll coordinate and warms its bounded window in the same task so the target lands painted (the demo-owned windowing leaf).",
            ),
            s(
                "data",
                "metric",
                "Metric",
                "One static numeric-readout family: base readout, bounded cell, and responsive ledger rows with truthful empty/loading states.",
                {
                    background: "grid",
                },
            ),
            s(
                "data",
                "instrument-chassis",
                "Instrument Chassis",
                "One landmark-neutral physical sleeve for a stage, optional inspector, and explicit actions.",
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
            s(
                "feedback",
                "toast",
                "Toast",
                "Transient status messages with tone, action, dismissal, queueing, and screen-reader announcements.",
            ),
            s(
                "feedback",
                "progress",
                "Progress",
                "Continuous progress with optional checkpoint marks, indeterminate states, and vertical, gradient, and liquid presentations.",
            ),
            s(
                "feedback",
                "skeleton",
                "Skeleton",
                "Neutral loading placeholders for text, avatars, and cards, with motion reduced when requested.",
            ),
            s(
                "feedback",
                "confirm-dialog",
                "Confirm Dialog",
                "A Dialog composition for explicit confirmation, destructive emphasis, pending state, and focus restoration.",
            ),
            s(
                "feedback",
                "completion-seal",
                "Completion Seal",
                "The hero-scale earned-gold completion mark — a one-shot gold-draw seal (a stroke-dashoffset wipe on four @property motion tokens) reading the earned-gold phase register with the metal-glow catch-light.",
            ),
        ],
    },
    {
        id: "motion",
        title: "Motion",
        icon: Sparkles,
        stories: [
            s(
                "motion",
                "springs",
                "Spring Orchestrator",
                "Tune damping, stiffness, mass, and velocity while the live response and timing curve stay in sync.",
                { background: "constellation" },
            ),
            s(
                "motion",
                "tempo",
                "Motion Tempo",
                "Slow or quicken the interface's motion rhythm without flattening the distinct character of dialogs, menus, and dock transitions.",
                {
                    // A calm blueprint wash (the one-GL-per-route fence — the tempo demo
                    // spends no GL context; the glass overlays POP over the static grid).
                    background: "grid",
                },
            ),
            s(
                "motion",
                "curve-gallery",
                "Motion Lab",
                "Compare the shared spring characters, reverse them mid-flight, and author accessible easing curves with immediate visual feedback.",
                {
                    // A calm blueprint grid gives the glass contrast without adding
                    // another GL context alongside the constellation.
                    background: "grid",
                },
            ),
            s(
                "motion",
                "reveal",
                "v-reveal",
                "Dependency-free entrance directive — sets the [data-reveal] hook + --d stagger step the CSS reads.",
            ),
            s(
                "motion",
                "deck",
                "Deck",
                "A full-viewport presentation with keyboard paging, a spoken slide position, and a compact window of page dots.",
            ),
            s(
                "motion",
                "handmark",
                "Hand Mark",
                "HandMark — the platform's hand voice. The pen underline, the boil natural morphology, the highlighter (multiply over the page), draw-on, the brush continuum, and a hand-circled datum — over the paper-grain register.",
                {
                    // Per-route exception: the hand-drawn
                    // demo IS a paper-grain register surface (its blurb + its own
                    // paper-grain cards), so it declares `paper` rather than inherit
                    // the motion-band constellation default. Idiom-true + free
                    // (a static wash, within the one-GL budget).
                    background: "paper",
                },
            ),
            s(
                "motion",
                "scroll",
                "Scroll",
                "The native scroll-driven register — the scroll() timeline, the reader edge-fade system, and the choreography recipes (build · cascade · pin) on ONE page in dependency order.",
                {
                    background: "constellation",
                },
            ),
            s(
                "motion",
                "text-motion",
                "Text Motion",
                "The type & number motion family — Typewriter, AnimatedDigit, and Countup on ONE page, sectioned by the family switcher.",
                {
                    background: "constellation",
                },
            ),
        ],
    },
    {
        id: "compositions",
        title: "Compositions",
        icon: LayoutDashboard,
        stories: [
            // the auth-shell no longer mounts the
            // library's HEAVIEST shader (a 4.87MP live Fourier SDF) as a decorative page
            // wash behind the form: a teaching SDF is never an ambient background. The page
            // declares a CALM `grid` blueprint wash (zero GL), and the route's ONE live GL
            // context is the brand-panel aurora (auth-shell.vue). The route is enrolled in
            // SELF_STAGES_GL (focal.ts) so the recessive shell aurora stands down — one GL
            // per route (down from 3: fourier + brand aurora + shell aurora).
            s(
                "compositions",
                "auth-shell",
                "Auth Shell",
                "A split authentication scene with a live brand field, clear form hierarchy, trust cues, and alternate sign-in.",
                {
                    background: "grid",
                    hero: true,
                    // A full-bleed scene specimen — keeps the largest D3 sub-rung.
                    heroScale: "hero",
                },
            ),
            // A deliberately thin composition: a page
            // ABOUT grain, paper, type rendered flat white-on-white. The calm
            // blueprint-grid wash (StoryHero drops the card to `wash` over it) +
            // the math-paper section-accent rail idiom are its ONE content event
            // no live substrate (the over-spend fence).
            s(
                "compositions",
                "settings",
                "Settings",
                "A responsive settings surface for account, appearance, notifications, and accessibility preferences.",
                { background: "grid" },
            ),
            s(
                "compositions",
                "empty-states",
                "Empty States",
                "Actionable empty, loading, error, and no-result states with a restrained visual companion.",
                {
                    // The empty-states page carries its OWN contained Blob mascot
                    // (a small pointer-leaning companion); it does not need — and a
                    // Blob cannot be — a full-bleed page-field.
                    background: "paper",
                },
            ),
            s(
                "compositions",
                "form-validation",
                "Form Validation",
                "Native constraint validation, the aria-invalid bridge, linked errors, and Textarea content sizing.",
            ),
            s(
                "compositions",
                "gate-pattern",
                "Gate Pattern",
                "A contained, on-demand preview of the non-dismissable access-modal idiom — a glass-card frame shows the gate, and Open the modal demo opens the real modal that refuses esc, scrim, and close, with the widened invalid ring and shake feedback, closing only on the correct key. A blessed composition, not a component.",
            ),
            // The five demo kinds (stage · specimen · interaction · matrix · composition)
            // side by side — one product with natural variation, not N spec-sheets.
            s(
                "compositions",
                "chassis",
                "Story Chassis",
                "The five demo KINDS — Stage · Specimen · Interaction · Matrix · Composition — each a thin composition over the StoryPage chassis, guaranteeing the same glassy-card conformity while the content varies.",
                { background: "grid" },
            ),
        ],
    },
];

// The narrative arc: Foundations → Material (substrates) → Elements
//     (DISPLAY atoms, then FORMS controls — the display↔forms swap) → Surfaces
//     (containers · navigation · dock) → Data → Feedback → Motion → Compositions.
const ACT_ORDER: readonly string[] = [
    "foundations",
    "substrates",
    "display",
    "forms",
    "containers",
    "navigation",
    "dock",
    "data",
    "feedback",
    "motion",
    "compositions",
];
CATEGORIES.sort((a, b) => ACT_ORDER.indexOf(a.id) - ACT_ORDER.indexOf(b.id));

// finalize the depth-keyed √φ title ladder + the section
// landings AFTER the category tree is built (the FIRST story per category is the
// D2 main, the rest D3 subs; each category gains its D1 section-landing hero).
assignDepths(CATEGORIES);

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
