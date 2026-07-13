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
import type { StoryBackground } from "../chassis/hero/aurora-hero";
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
 * The hero title size rung (BC.W-PAGE-CHASSIS — the depth-keyed √φ ladder). Every
 * route resolves a rung ≥ `4` (the user-mandate floor; the prior hardcoded
 * `text-display-3` is retired). The depth tier (D0 front-door / D1 section-landing /
 * D2 main / D3 sub) maps to a rung: D0 `mega`, D1 `hero`, D2 `5`–`hero`, D3 `4`.
 */
export type HeroScale = "audacious" | "mega" | "hero" | "5" | "4";

/** The page-depth tier (BC.W-PAGE-CHASSIS). Reads as title size — depth IS size. */
export type StoryDepth = "D0" | "D1" | "D2" | "D3";

export interface Story {
    id: string;
    title: string;
    /**
     * BG.W-HERO-FIT (D10, P4-C) — the MANDATORY short hero wordmark/phrase. On a
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
    /**
     * The explicit Fira-Code subpath chip in the hero eyebrow (BC.W-PAGE-CHASSIS).
     * A published component subpath (`@mkbabb/glass-ui/<sp>`) where one fits, else
     * the route path (`/category/story`) for token/scene/facility pages with no
     * import surface. The Title (display name) may differ from the subpath,
     * so this is an explicit per-row literal, never an inferred default.
     */
    subpath?: string;
    /**
     * The hero title size rung (the depth-keyed √φ ladder). Resolved from `depth`
     * when unset; an explicit value (a marquee `hero` on a live-GL sub-page) wins.
     */
    heroScale?: HeroScale;
    /**
     * The page-depth tier (BC.W-PAGE-CHASSIS). The FIRST story in a category is the
     * D2 main; the rest are D3 subs — `s()` derives this from position when unset.
     */
    depth?: StoryDepth;
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
     * The section-landing hero (BC.W-PAGE-CHASSIS — the SECTION-HERO model). Each
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
    /** The section's import-namespace root (a published subpath or the route path). */
    subpath: string;
    /** The section field — the category's idiom-true background. */
    background: StoryBackground;
    /** D1 always — the largest audacious rung, out-sizing every page beneath it. */
    heroScale: HeroScale;
    depth: StoryDepth;
}

// ── The δ5/δ6 manifest-carve+glob DECISION (BH.B3 δ5/δ6). ────────────────────────
// δ6 (glob `./*/*.vue` → `./*/*/index.vue` + per-story-dir moves) is DROPPED — the
// converged BH.PLAN §4.0 family table (row 8: "δ6 glob DROPPED") is authoritative,
// and KISS keeps ~80 trivial single-file stories FLAT `<category>/<id>.vue`. The glob
// below stays flat by DESIGN; a change to `./*/*/index.vue` renders every flat story
// blank (the runtime route-walk hazard the wave warns about).
//
// δ5 (carve `manifest.ts`) is the surviving deliverable, and it "accepts" the row +
// map structure IN PLACE: this file is the single parseable source-of-truth ~13
// device-free gates read by literal path + regex — the `s()` rows (proof:runtime /
// proof:page-prune / proof:no-orphan-demo-route / proof:substrate-staging / …), the
// SUBPATHS map (proof:page-chassis), the category-id order (proof:storybook-ia), the
// `Story` interface fields subpath/heroScale/depth (proof:page-chassis), the
// sectionLanding heroScale (proof:hero-audacious). Moving any of those OUT breaks a
// foreign gate this wave does not own; `demo/` is exempt from proof:no-god-module
// (which scans `src/` only), so no machine bound is violated by keeping them. The ONE
// cleanly-carveable concern — the glob-resolved SFC `lazy` resolver — is colocated in
// `./manifest/lazy.ts` (the spec's `lazy` carve target); the glob record stays here so
// the relative path + keys are unchanged. This reconciles BG.W-MANIFEST-COLOCATE
// ("keep manifest.ts") with δ5.
const modules = import.meta.glob<{ default: Component }>("./*/*.vue");

const lazy = makeLazy(modules);

/** Per-page container options — the declared background + the hero register. */
interface StoryOptions {
    background?: StoryBackground;
    hero?: boolean;
    /**
     * BG.W-HERO-FIT — the MANDATORY short hero wordmark (see Story.displayTitle).
     * A `hero: true` front-door composition declares it so the chassis renders a
     * SHORT title through the height-aware fit-cap.
     */
    displayTitle?: string;
    /**
     * The explicit hero title rung override (BC.W-PAGE-CHASSIS). Unset → `s()`
     * derives it from the position-keyed depth (D2 main → `5`, D3 sub → `4`); a
     * live-GL marquee story sets `heroScale: "hero"` so it keeps the largest sub-rung.
     */
    heroScale?: HeroScale;
    /** The section-landing root subpath — the category landing's import namespace. */
    landingSubpath?: string;
    /** The section-landing field — the category's idiom-true background. */
    landingBackground?: StoryBackground;
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

/**
 * The explicit Fira-Code subpath chip per route (BC.W-PAGE-CHASSIS — the binding
 * per-route table). A route maps to a published `@mkbabb/glass-ui/<sp>` IFF `<sp>`
 * is a package export (the subpath-resolution rule); a token/scene/facility route
 * with no import surface carries its route path `/category/story`. Title ≠ subpath,
 * so this is an explicit literal per row — never an inferred default (the map IS the
 * per-route enumeration the user's "EVERY PAGE STANDARDIZED" mandate rides; PC5 reads
 * it). Keyed `category/id`.
 */
const SUBPATHS: Record<string, string> = {
    // Foundations — token/ink pages carry the route path; the import-surface ones win.
    "foundations/intro": "/foundations/intro",
    "foundations/colors": "/foundations/colors",
    "foundations/typography": "/foundations/typography",
    "foundations/radii": "/foundations/radii",
    "foundations/shadows": "/foundations/shadows",
    "foundations/motion": "/foundations/motion",
    "foundations/paper-glass": "/foundations/paper-glass",
    "foundations/icons": "@mkbabb/glass-ui/icon-chip",
    "foundations/surface-tints": "/foundations/surface-tints",
    "foundations/overlays-scrims": "/foundations/overlays-scrims",
    "foundations/chart-chassis-palette": "/foundations/chart-chassis-palette",
    "foundations/paper-texture": "@mkbabb/glass-ui/paper-backdrop",
    "foundations/css-utilities": "/foundations/css-utilities",
    // Substrates — the shipped viz subpaths.
    "substrates/aurora": "@mkbabb/glass-ui/aurora",
    "substrates/blob": "@mkbabb/glass-ui/blob",
    "substrates/constellation": "@mkbabb/glass-ui/constellation",
    "substrates/fourier-field": "@mkbabb/glass-ui/fourier-field",
    "substrates/glass-material": "/substrates/glass-material",
    "substrates/glass-panel": "@mkbabb/glass-ui/glass-panel",
    "substrates/dot-flow-field": "@mkbabb/glass-ui/dot-flow-field",
    "substrates/concentric": "@mkbabb/glass-ui/concentric",
    "substrates/liquid-grid": "@mkbabb/glass-ui/liquid-grid",
    "substrates/dot-matrix": "@mkbabb/glass-ui/dot-matrix",
    // Forms — the input/select/toggle family via /forms + the own subpaths.
    "forms/inputs": "@mkbabb/glass-ui/forms",
    "forms/textarea": "@mkbabb/glass-ui/forms",
    "forms/checks": "@mkbabb/glass-ui/switch",
    "forms/slider": "@mkbabb/glass-ui/slider",
    "forms/number-field": "@mkbabb/glass-ui/number-field",
    "forms/select": "@mkbabb/glass-ui/select",
    "forms/combobox": "@mkbabb/glass-ui/forms",
    "forms/multi-select": "/forms/multi-select",
    "forms/toggle": "@mkbabb/glass-ui/toggle-group",
    "forms/toggle-chip": "@mkbabb/glass-ui/toggle-chip",
    "forms/selectable-chip": "@mkbabb/glass-ui/selectable-chip",
    "forms/label": "@mkbabb/glass-ui/label",
    // Display — the atomic primitives.
    "display/buttons": "@mkbabb/glass-ui/button",
    "display/card": "@mkbabb/glass-ui/card",
    "display/badge": "@mkbabb/glass-ui/badge",
    "display/separator": "@mkbabb/glass-ui/separator",
    "display/section": "/display/section",
    "display/metric-badge": "@mkbabb/glass-ui/metric-badge",
    "display/metric-pill": "@mkbabb/glass-ui/metric-badge",
    "display/status-dot": "@mkbabb/glass-ui/status-dot",
    "display/pulse": "@mkbabb/glass-ui/pulse",
    "display/stacked-icons": "@mkbabb/glass-ui/stacked-icons",
    "display/dark-mode-toggle": "@mkbabb/glass-ui/controls",
    // BG.W-DEMO-IA-REDESIGN — the Display ATOMS wall (folds separator · pulse ·
    // status-dot · stacked-icons · dark-mode-toggle · avatar as family members).
    "display/atoms": "/display/atoms",
    // Containers — the glass surfaces.
    "containers/dialog": "@mkbabb/glass-ui/dialog",
    "containers/sheet": "@mkbabb/glass-ui/sheet",
    "containers/drawer": "@mkbabb/glass-ui/drawer",
    "containers/popover": "@mkbabb/glass-ui/popover",
    "containers/dropdown-menu": "@mkbabb/glass-ui/dropdown-menu",
    "containers/context-menu": "@mkbabb/glass-ui/context-menu",
    "containers/hover-card": "@mkbabb/glass-ui/hover-card",
    "containers/tooltip": "@mkbabb/glass-ui/tooltip",
    "containers/accordion": "/containers/accordion",
    "containers/collapsible": "@mkbabb/glass-ui/collapsible",
    "containers/hover-popover": "@mkbabb/glass-ui/hover-popover",
    "containers/expandable-container": "@mkbabb/glass-ui/expandable-container",
    "containers/command": "@mkbabb/glass-ui/command",
    "containers/spa-view": "@mkbabb/glass-ui/spa-view",
    "containers/card-pressable": "@mkbabb/glass-ui/card",
    // Navigation — the glass nav chrome.
    "navigation/tabs": "@mkbabb/glass-ui/tabs",
    "navigation/carousel": "@mkbabb/glass-ui/carousel",
    "navigation/header-ribbon": "@mkbabb/glass-ui/header-ribbon",
    "navigation/toc-tracking": "@mkbabb/glass-ui/sidebar",
    // Dock — the whole family is /dock.
    "dock/overview": "@mkbabb/glass-ui/dock",
    "dock/layers": "@mkbabb/glass-ui/dock",
    "dock/rail": "@mkbabb/glass-ui/dock",
    "dock/morph-showcase": "@mkbabb/glass-ui/dock",
    "dock/sections": "@mkbabb/glass-ui/dock",
    "dock/cta-receive": "@mkbabb/glass-ui/dock",
    "dock/dock-search": "@mkbabb/glass-ui/dock",
    "dock/siri-island": "@mkbabb/glass-ui/dock",
    // Data — the ledger surfaces.
    "data/table": "@mkbabb/glass-ui/data-table",
    "data/data-table": "@mkbabb/glass-ui/data-table",
    "data/tags-input": "/data/tags-input",
    "data/avatar": "/data/avatar",
    "data/sortable-list": "@mkbabb/glass-ui/sortable-list",
    "data/infinite-scroll": "@mkbabb/glass-ui/infinite-scroll",
    "data/timeline": "@mkbabb/glass-ui/timeline",
    "data/search": "@mkbabb/glass-ui/search",
    "data/virtual-section": "@mkbabb/glass-ui/virtual",
    "data/scrolling-text": "@mkbabb/glass-ui/scrolling-text",
    "data/metric-cell": "@mkbabb/glass-ui/metric-cell",
    "data/metric-stack": "@mkbabb/glass-ui/metric-stack",
    // BG.W-DEMO-IA-REDESIGN — the Data METRICS family (folds metric-cell ·
    // metric-stack · metric-badge · metric-pill · scrolling-text as members).
    "data/metrics": "/data/metrics",
    // Feedback — the status surfaces.
    "feedback/alert": "/feedback/alert",
    "feedback/toast": "@mkbabb/glass-ui/toast",
    "feedback/toaster": "@mkbabb/glass-ui/toast",
    "feedback/notification": "@mkbabb/glass-ui/notification",
    "feedback/progress": "@mkbabb/glass-ui/progress",
    "feedback/skeleton": "/feedback/skeleton",
    "feedback/confirm-dialog": "@mkbabb/glass-ui/confirm-dialog",
    "feedback/completion-seal": "@mkbabb/glass-ui/completion-seal",
    // Motion — the spring/curve/reveal vocabulary.
    "motion/springs": "@mkbabb/glass-ui/motion",
    "motion/tempo": "@mkbabb/glass-ui/motion",
    "motion/curve-gallery": "@mkbabb/glass-ui/easing",
    "motion/countup": "@mkbabb/glass-ui/motion",
    "motion/reveal": "@mkbabb/glass-ui/motion-core",
    "motion/deck": "@mkbabb/glass-ui/deck",
    "motion/typewriter": "@mkbabb/glass-ui/typewriter",
    "motion/handmark": "@mkbabb/glass-ui/handmark",
    "motion/animated-digit": "@mkbabb/glass-ui/animated-digit",
    "motion/split-chars": "@mkbabb/glass-ui/motion-core",
    // BG.W-DEMO-DUP-MERGE (F7.3) — the Motion SCROLL family: the native · reader ·
    // choreography registers are MERGED into ONE motion/scroll.vue page (3
    // <StorySection> registers over colocated body sub-components; the scroll-vt ·
    // scroll-system · scroll-choreography member wrappers deleted). The TYPE & NUMBER
    // family (folds typewriter · split-chars · animated-digit · countup) stays a fold.
    // The scroll page shares /motion-core with reveal — the DECLARED motion-core family.
    "motion/scroll": "@mkbabb/glass-ui/motion-core",
    "motion/text-motion": "/motion/text-motion",
    // Compositions — real scenes carry the route path.
    "compositions/hero": "/compositions/hero",
    "compositions/math-paper": "/compositions/math-paper",
    "compositions/auth-shell": "/compositions/auth-shell",
    "compositions/settings": "/compositions/settings",
    "compositions/empty-states": "/compositions/empty-states",
    "compositions/drawer-live-behind": "/compositions/drawer-live-behind",
    "compositions/configurator": "@mkbabb/glass-ui/configurator",
    "compositions/instrument-chassis": "@mkbabb/glass-ui/instrument-chassis",
    "compositions/form-validation": "/compositions/form-validation",
    "compositions/gate-pattern": "/compositions/gate-pattern",
    "compositions/labeled-field": "@mkbabb/glass-ui/labeled-field",
    "compositions/icon-tooltip": "@mkbabb/glass-ui/icon-tooltip",
    "compositions/chassis": "/compositions/chassis",
};

/** The per-category section-landing import-namespace root (the D1 hero's chip). */
const LANDING_SUBPATHS: Record<string, string> = {
    foundations: "@mkbabb/glass-ui/styles",
    substrates: "@mkbabb/glass-ui/aurora",
    forms: "@mkbabb/glass-ui/forms",
    display: "@mkbabb/glass-ui/button",
    containers: "@mkbabb/glass-ui/dialog",
    navigation: "@mkbabb/glass-ui/tabs",
    dock: "@mkbabb/glass-ui/dock",
    data: "@mkbabb/glass-ui/data-table",
    feedback: "@mkbabb/glass-ui/toast",
    motion: "@mkbabb/glass-ui/motion",
    compositions: "@mkbabb/glass-ui/configurator",
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

/**
 * BG.W-DEMO-IA-REDESIGN — the family-collapse registry (the `demo-earns-page` floor).
 *
 * The demo was a 120-page spec-sheet inventory where 8 component subpaths were split
 * across ≥2 near-duplicate pages (inputs/textarea/combobox all demoing `/forms`,
 * table/data-table both `/data-table`, timeline ×3, …). This wave collapses each
 * redundant set onto ONE FAMILY page (`forms/inputs`, `data/table`, `data/metrics`,
 * `motion/scroll`, …) that shows the members as sections via `<FamilyTabs>` (each
 * member composed BARE — its own SFC, zero content re-authored, the STORY_NESTED_KEY
 * seam). The member routes below are DROPPED from the nav (`foldFamilies` filters
 * them out), shrinking the routed set ~120 → ~94 designed pages.
 *
 * The member SFCs STAY on disk (composed by their family page), so the no-orphan
 * bijection holds — they are simply UN-ROUTED here. `proof:demo`'s `demo-earns-page`
 * arm reads this set to subtract the folded members before measuring the REAL routed
 * subpath collisions. Keyed `category/id`.
 */
export const FOLDED_STORY_IDS: ReadonlySet<string> = new Set<string>([
    // Forms → forms/inputs (the input family) + forms/toggle (the toggles family).
    "forms/textarea",
    "forms/select",
    "forms/combobox",
    "forms/multi-select",
    "forms/label",
    "forms/toggle-chip",
    "forms/selectable-chip",
    // Display atoms → display/atoms; the metric atoms move OUT to data/metrics.
    "display/separator",
    "display/pulse",
    "display/status-dot",
    "display/stacked-icons",
    "display/dark-mode-toggle",
    "display/metric-badge",
    "display/metric-pill",
    // Data → data/table (data-table) · data/metrics · display/atoms (avatar).
    // (timeline-segmented/continuous MERGED into data/timeline at F7.3 — the member
    // files are deleted, so they are no longer routed rows to fold here.)
    "data/data-table",
    "data/metric-cell",
    "data/metric-stack",
    "data/scrolling-text",
    "data/avatar",
    // Feedback → feedback/toast.
    "feedback/toaster",
    // Motion → motion/scroll · motion/text-motion.
    // (scroll-vt/system/choreography MERGED into motion/scroll at F7.3 — the member
    // files are deleted, so they are no longer routed rows to fold here.)
    "motion/typewriter",
    "motion/split-chars",
    "motion/animated-digit",
    "motion/countup",
    // Foundations → foundations/paper-glass (the paper chapter).
    "foundations/paper-texture",
]);

/**
 * BG.W-DEMO-IA-REDESIGN — the DECLARED families: the subpaths a routed collision is
 * SANCTIONED on. After the family collapse, three subpaths are legitimately shared
 * by >1 routed page: `/dock` (the headline dock family — 4.11's counts), `/motion-core`
 * (the broad composable barrel `reveal` + the `scroll` family both live on), and
 * `/card` (BI.W-DEMO-CARD-DECLARE — `display/card` demos the Card surface-tier facets,
 * `containers/card-pressable` demos the `:pressable` interaction facet: two distinct
 * Card mechanisms each earning a routed page, the `/motion-core` scroll+reveal
 * precedent — NOT a fold, both facets are load-bearing), and `/motion` (BI.W-TEMPO —
 * `motion/springs` demos the useSpring ORCHESTRATOR, `motion/tempo` demos the distinct
 * `--motion-tempo` axis over the same /motion primitives: two load-bearing motion
 * mechanisms each earning a routed page, the SAME scroll+reveal precedent — NOT a
 * fold). Every OTHER shared subpath is a redundant-page defect. `proof:demo`'s
 * `demo-earns-page` arm reads this allowlist.
 */
export const DECLARED_FAMILY_SUBPATHS: ReadonlySet<string> = new Set<string>([
    "@mkbabb/glass-ui/dock",
    "@mkbabb/glass-ui/motion-core",
    "@mkbabb/glass-ui/motion",
    "@mkbabb/glass-ui/card",
]);

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
    // The subpath is the explicit per-route chip (BC.W-PAGE-CHASSIS PC5) — the map
    // above is the binding per-route enumeration; the route path is the fallback for
    // a row the map has not yet declared (a new story is keyless until enrolled —
    // the gate's no-blank-subpath assert keeps the map ≡ the route set).
    const subpath = SUBPATHS[`${cat}/${id}`] ?? `/${cat}/${id}`;
    return {
        id,
        title,
        // BG.W-HERO-FIT — the MANDATORY short hero wordmark threads from the row
        // opts; unset on a content page (the chrome <h1> reads the semantic title).
        displayTitle: opts?.displayTitle,
        blurb,
        component: lazy(cat, id),
        background,
        hero: opts?.hero,
        subpath,
        // depth + heroScale are finalized by assignDepths() once the category's
        // story order is known (the FIRST story is the D2 main; the rest D3 subs).
        heroScale: opts?.heroScale,
    };
}

/**
 * Build the section-landing descriptor for a category (BC.W-PAGE-CHASSIS — the
 * SECTION-HERO model). The `/<id>` route resolves to this D1 hero — the LARGEST
 * audacious rung, the section's identity moment — over the bento grid of its stories.
 * Never hand-authored; derived from the category + the landing maps above.
 */
function sectionLanding(cat: Category): SectionLanding {
    // BC.W-HERO-AUDACIOUS Part B/E — each section landing reads its DISTINCT field
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
        subpath: LANDING_SUBPATHS[cat.id] ?? `/${cat.id}`,
        background,
        heroScale: "hero",
        depth: "D1",
    };
}

/**
 * Finalize each story's depth + heroScale (BC.W-PAGE-CHASSIS — the depth-keyed
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
                story.heroScale =
                    depth === "D0" ? "mega" : depth === "D2" ? "5" : "4";
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
                    // BG.W-HERO-FIT — the front-door wordmark (the D0 root). The
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
                "paper-texture",
                "Paper Texture",
                "The PaperBackdrop frequency register (clean / aged), cascade-overridable paper tokens, the per-instance opacity knob, and the layered composition recipe.",
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
                    // presents its studio over a calm paper wash (W-BLOB-REBUILD; the
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
            // BC.W-VIZ-FOURIER — the ONE Fourier view (the collapse). The three duplicate
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
            // BB.W-VIZ-SUITE / W-FLOWFIELD — the NEW WebGPU-first dot-flow-field viz.
            // It self-stages its OWN GL/compute context (the field IS the surface), so
            // the route declares the FREE static `grid` wash behind the card and mounts
            // exactly ONE live context — the dot-flow-field's own (the one-GL-per-route
            // budget held, the glass-panel precedent above).
            s(
                "substrates",
                "dot-flow-field",
                "Dot Flow Field",
                "A WebGPU-first curl-noise flow field traced by advected particles — soft warm-cream dots seeded along undulating streamlines rippling in Gerstner/Tessendorf waves (Tessendorf 2001 · Bridson 2007). The compute pass advects N particles through the analytic ∇⊥ψ velocity; the render pass draws instanced billboard quads; a Canvas2D point-cloud fallback steps the SAME evaluator where WebGPU is absent. The warm-cream identity is the library default; the mono-on-near-black reference is a non-default demo preset. Shipped /dot-flow-field.",
                {
                    background: "grid",
                    hero: true,
                    heroScale: "hero",
                },
            ),
            // BD.W-CONCENTRIC-RELIEF — the WebGPU-first level-set TOPOGRAPHIC CONTOUR viz
            // (liquid-grid kin), closing the Batch-V substrates band. It self-stages its OWN
            // GL/fragment context (the field IS the surface), so the route declares the FREE
            // static `grid` wash behind the card and mounts exactly ONE live context — its
            // own (the one-GL-per-route budget held, the dot-flow-field precedent above).
            s(
                "substrates",
                "concentric",
                "Concentric",
                "A WebGPU-first level-set TOPOGRAPHIC CONTOUR survey — the iso-contours of a low-octave height field, nested loops that TWIST and FLOW as a traveling wave passes OVER and THROUGH the topography (the SAME waveFlow sheet-warp that bends the liquid-grid, so the two viz move together — vector calculus, level sets, gradient topology). The basins breathe on the ω=√(g·k) deep-water swell (Tessendorf 2001); the contours bunch on steep ground (the density tracks 1/|∇H|). An opaque hypsometric fill (basins cool-cream, ridges warm-amber) under an analytic hillshade, with a two-tier index/minor contour hierarchy; the lines are extracted via Inigo Quilez's gradient-free contour distance-estimation (perfect GPU AA at any DPR). A pure fullscreen fragment pass over the shared waveField leaf on the WebGPU primary, with a clean WebGL2 GLSL fallback. Move the cursor and the topography HEAVES toward it. The warm-divergent identity is the library default; the demo themes the survey. Shipped /concentric.",
                {
                    background: "grid",
                    hero: true,
                    heroScale: "hero",
                },
            ),
            // BC.W-VIZ-PAPERGRID — the NEW WebGPU-first liquid AA-grid viz. It self-stages
            // its OWN GL/fragment context (the field IS the surface), so the route declares
            // the FREE static `grid` wash behind the card and mounts exactly ONE live context
            // — its own (the one-GL-per-route budget held, the concentric precedent above).
            s(
                "substrates",
                "liquid-grid",
                "Liquid Grid",
                "A WebGPU-first liquid AA-grid — evenly-spaced LARGER cells on a sheet that bows + shears as a traveling wave passes OVER and THROUGH it. A smooth low-order curl-flow field (Bridson divergence-free) warps the grid COORDINATE before evaluation, locally affine at the cell scale, so MAJOR gridlines bend as ONE coherent continuous curve and cells deform as near-parallelogram patches — never a per-pixel jitter, never a per-cell kink. A Ben Golus derivative-AA two-tier grid (one device-pixel crisp at any DPR — the blurry-mess fix; the AA reads the FINAL warped coordinate). It reads the SAME waveFlow warp as Concentric (one shared field). Drag the cursor for a local swirl — a finger twisting the cells around it. The warm-cream identity over transparent is the library default (the page reads through the cells); the suffusion preset rides the same field at a near-invisible fieldAlpha behind page content. No Canvas2D anywhere. Shipped /liquid-grid.",
                {
                    background: "grid",
                    hero: true,
                    heroScale: "hero",
                },
            ),
            // BC.W-VIZ-DOTMATRIX — the NEW WebGPU-first Fibonacci phyllotaxis dot-SPHERE
            // viz (the Claude co-work "fine-dot spheres on dark" reference). It self-stages
            // its OWN GL context (the globe IS the surface), so the route declares the FREE
            // static `grid` wash behind the card and mounts exactly ONE live context — its
            // own (the one-GL-per-route budget held, the liquid-grid precedent above).
            s(
                "substrates",
                "dot-matrix",
                "Dot Matrix",
                "A WebGPU-first Fibonacci phyllotaxis dot-SPHERE — a globe of fine warm-cream dots laid on a sphere SURFACE (the golden-angle area-centered lattice; Martin Roberts / extremelearning, arXiv 0912.4540 — no pole-pinching, no banded rings), depth-shaded so it reads as a translucent dot-shell (opacity 0.15+0.85·facing, size 0.6+0.4·facing — the Will-Howard / COBE / Stripe lineage), slowly rotating on a gently tilted axis. The render pass draws instanced billboard quads + the crisp fwidth SDF circle fragment; a WebGL2 instanced-billboard fallback draws the SAME dots where WebGPU is absent (born-GPU — no Canvas2D). Drag the cursor — the globe tracks it (parallax), a soft dimple pushes through the dot-shell, a flick fires a brightness bloom (the accel burst). The warm-cream identity is the library default; the mono-warm-white two-globe reference is a non-default demo preset. Shipped /dot-matrix.",
                {
                    background: "grid",
                    hero: true,
                    heroScale: "hero",
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
            s(
                "forms",
                "selectable-chip",
                "Selectable Chip",
                "The contrast-floored tonal-accent register — one tone per chip, idle-legible at ≥3:1, bold when active, ink stays correct.",
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
            s(
                "display",
                "atoms",
                "Atoms",
                "The designed atoms wall — separator, status-dot, pulse, stacked-icons, avatar, and the dark-mode toggle on ONE page, sectioned by the family switcher.",
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
            s(
                "containers",
                "spa-view",
                "SpaView",
                "Bounded view-cache router pane — <SpaView :max> over Vue's <KeepAlive> + an out-in cross-fade; inactive views stay mounted (state survives the switch) up to the LRU cap.",
            ),
            s(
                "containers",
                "card-pressable",
                "Pressable Card",
                "The tappable list-card — <Card as=\"button\"> presses on the shared iOS spring (reciprocal squish + the --card-press-t brightness drive, one clock family with Button); a static content card never presses.",
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
            s("navigation", "carousel", "Carousel", undefined, {
                background: "aurora",
            }),
            s(
                "navigation",
                "header-ribbon",
                "Header Ribbon",
                "Hover-tracking ribbon — an anchor button reveals a control row, then auto-collapses; the anchor slot exposes pinned / toggled state. Shipped /header-ribbon.",
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
            s(
                "dock",
                "liquid-playground",
                "Liquid Morph",
                "The dock as the primary control interface — a glass dock pill that EXPANDS into a Maps Places sheet, SPLITS into two Dynamic-Island activity islands (timer + now-playing, goo-bridged), and grows into the full Apple Music player. Composes the shipped useBloomUp source-rect bloom + the SVG-goo metaball bridge over the real dock spring, plus the accent-facet CONTEXT carousel — a hairline strip of accent-tinted facet chips fanning in a REAL dock's gutter (box-INVIOLATE), shown in BOTH a horizontal and a vertical dock via <DockStack mode=\"facets\">.",
            ),
            s(
                "dock",
                "dock-gallery",
                "Dock Gallery",
                "The BREADTH of dock morphs — a gallery of distinct iOS surfaces the dock shape-shifts into: the Apple Music mini-player → player + a separate queue panel, a Dynamic Island call pill → full call UI, and a notification pill → expanded card with actions. Tap each dock to morph it.",
            ),
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
                "The liquid-glass dock morph — a button flows the vertical dock, as an amorphous metaball teardrop, into the horizontal dock, fully bidirectional and deterministic on one --dock-morph-t scalar. An SVG-goo metaball bridge merges the two plates and hides the layout change at the midpoint; the shared liquid-flex primitive drives the two-dock spans and the volume-preserving teardrop squish.",
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
                "The declarative <DockSection> chassis — pass one `sections: DockSectionDescriptor[]` array and the dock body renders the three-zone gestalt (a leading home/brand region, named divider-demarcated section groups, a trailing nav group) by composing <DockSeparator> over the controls a consumer already places. The dock box shrink-wraps unchanged; a 5-section dock renders from the array, never a hardcoded literal.",
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
                "The external-CTA-morphs-into-dock seam — an external CTA button flies and reshapes from its own rect onto a target dock control, fades and congests into the glass, then hands off (the dock control owns the spot). The iOS bloom-from-source inverse: useDockCtaReceive composes the same element-morph substrate useLiquidReveal activates, beside the dock morph mechanism. Compositor-only (transform/opacity/filter); reduced-motion snaps the CTA to gone and hands off.",
            ),
            s(
                "dock",
                "dock-search",
                "Dock Search",
                "The dock IS the search bar — tap the collapsed pill and it morphs continuously (the dock's own --dock-morph-t glide, not a hard swap) into a search field; type and the fuzzy dropdown ranks live with subsequence-match highlighting plus a ghost-text completion of the top match; arrow keys walk the results, Enter routes, a select scrolls-to-and-warms the windowed section below. useDockSearch composes the shipped useFuzzySearch matcher, the virtual-section window, and the scroll-to subuse — the dock owns the gesture, the consumer plugs the data source.",
            ),
            // BG.W-SIRI-DOCK-CAPABILITY — Siri as a DOCK CAPABILITY via the
            // .glass-dock-frame/#rail escape (box-inviolate). The "Search or ask" pill
            // composes the EXISTING useDockSearch pipeline; tapping it blooms the glass
            // island FROM the pill (useLiquidReveal) and glides through four forms on
            // ONE --siri-island-t scalar (useDockSpring). The WebGL2 waveform is
            // demo-private. This story REPLACES the retired "Dynamic Island Call" clone.
            s(
                "dock",
                "siri-island",
                "Siri Island",
                "Siri as a dock capability — tap Search or ask and a glass island blooms from the dock pill (useLiquidReveal) and morphs through four forms (dormant → listening → thinking → responding) on ONE --siri-island-t scalar (useDockSpring, the ONE dock spring). The island lives beside the dock via the .glass-dock-frame/#rail escape — box-inviolate. Ask a question and the SAME useDockSearch pipeline ranks the answer; a demo-private WebGL2 pass paints the warm prismatic waveform.",
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
            s("data", "search", "Fuzzy Search"),
            s(
                "data",
                "virtual-section",
                "Virtual Section Window",
                "A 1000-section document that renders only the ~20 sections near the viewport — spacer divs hold the full scroll height, and a jump warms the far target into the window before scrolling so it lands painted (the re-homed /virtual windowing leaf).",
            ),
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
            s(
                "data",
                "metrics",
                "Metrics",
                "The numeric-readout family — MetricCell, MetricStack, MetricBadge, MetricPill, and the ScrollingText marquee on ONE page, sectioned by the family switcher.",
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
            s("motion", "springs", "Spring Orchestrator", undefined, {
                background: "constellation",
            }),
            s(
                "motion",
                "tempo",
                "Motion Tempo",
                "The --motion-tempo axis (M11 / N6) — ONE registered inheriting TIME scalar co-scales BOTH the CSS spring clocks (the --spring-*-duration reader = settle × --motion-tempo) AND the JS spring responses (motionTempo() → response × tempo). A live 0.7→1.3 slider over a dropdown + popover + dialog + a JS dock morph proves the P7 CSS↔JS one-clock co-scale; ⟂ --motion-weight ⟂ --ui-scale.",
                {
                    // A calm blueprint wash (the one-GL-per-route fence — the tempo demo
                    // spends no GL context; the glass overlays POP over the static grid).
                    background: "grid",
                },
            ),
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
            s(
                "motion",
                "deck",
                "Deck",
                "The full-viewport keyboard-paged aria-live PRESENTATION register (DISTINCT from /carousel) — useDeck (headless index/progress/liveMessage) + useDeckKeyboard (focus-guarded Arrow/Space/digit) + <DeckPager> (windowed dots over PagerDots' ONE oracle) + the --spring-deck slide settle. Unblocks the speedtest survey-deck + the slides consume-back.",
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
            s(
                "motion",
                "split-chars",
                "Split Chars",
                "SplitChars / useCharStagger — the per-glyph split partner to the shipped .char-stagger CSS: mints the .char spans + --char-index/--char-total the recipe reads, accessible by construction (the aria-label keeps the word ONE accessible name; the glyphs are aria-hidden). Char / word / grapheme (Intl.Segmenter) split units.",
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
                "The type & number motion family — Typewriter, SplitChars, AnimatedDigit, and Countup on ONE page, sectioned by the family switcher.",
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
            s(
                "compositions",
                "hero",
                "Hero",
                "Dashboards, auth shells, the math-paper idiom — the components composed into the surfaces they were built for. Warm cream, cartoon offset shadows, translucent glass over a grain underpaint.",
                {
                    background: "constellation",
                    hero: true,
                    // The deliberate audacious-type showcase — the ONE D2 main at `mega`
                    // (its content IS the audacious-type demonstration).
                    heroScale: "mega",
                    // BG.W-HERO-FIT — the short hero wordmark; the ℱ ornament rides the
                    // #title-ornament slot in hero.vue.
                    displayTitle: "Real scenes",
                },
            ),
            s("compositions", "math-paper", "Math Paper", undefined, {
                background: "grid",
            }),
            s("compositions", "auth-shell", "Auth Shell", undefined, {
                background: { kind: "fourier" },
                hero: true,
                // A full-bleed scene specimen — keeps the largest D3 sub-rung.
                heroScale: "hero",
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
                // The empty-states page carries its OWN contained Blob mascot
                // (a small pointer-leaning companion); it does not need — and a
                // Blob cannot be — a full-bleed page-field (W-BLOB-REBUILD).
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
            // BG.W-STORY-PAGE-API (§4-D) — the demo SUB-TYPE taxonomy reference. The
            // five demo KINDS (stage · specimen · interaction · matrix · composition)
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

// BG.W-DEMO-IA-REDESIGN — the family collapse + the narrative arc re-order, applied
// AFTER the category tree is built but BEFORE the depth ladder is derived (so the
// FIRST *surviving* story per category is the D2 main).
//
// (1) foldFamilies — drop the folded member routes from the nav. The member SFCs
//     stay on disk (composed by their family page via <FamilyTabs>), so the
//     no-orphan bijection holds; they are just un-routed here.
function foldFamilies(categories: Category[]): void {
    for (const cat of categories) {
        cat.stories = cat.stories.filter(
            (st) => !FOLDED_STORY_IDS.has(`${cat.id}/${st.id}`),
        );
    }
}
foldFamilies(CATEGORIES);

// (2) The narrative arc (D3-C1) — Foundations → Material (substrates) → Elements
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
CATEGORIES.sort(
    (a, b) => ACT_ORDER.indexOf(a.id) - ACT_ORDER.indexOf(b.id),
);

// BC.W-PAGE-CHASSIS — finalize the depth-keyed √φ title ladder + the section
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
