// The GlassDock shell-prop derivation — the variant-resolution + prop-derivation
// cluster carved out of GlassDock.vue. It owns the discriminated-union prop types,
// the `dockBranch` narrow, and the resolved computeds (variant / shape / layout /
// orientation / density / scrollClass / alwaysExpanded / fitContent / collapse
// surface + the container-query style). A GlassDock-internal composable: it takes
// the resolved `props` and returns the derived computeds the SFC binds. NO logic
// edits — the derivation bodies are the byte-for-byte lift of the prior inline
// computeds (the dock gate fleet is the witness).

import { computed, type ComputedRef } from "vue";

export type DockDensity = "compact" | "comfortable" | "spacious" | "audacious";

/* The container/common prop axis shared by every dock variant. */
export interface DockCommonProps {
    fitContent?: boolean;
    position?: "fixed" | "inline" | "sticky";
    alwaysExpanded?: boolean;
    /**
     * Corner treatment.
     *   `"pill"`    — the stadium silhouette (default).
     *   `"rounded"` — a finite rounded radius (`--radius-xl`).
     *   `"card"`    — the AW.W3b big-dock card shell: a finite concentric
     *                 radius (`--dock-card-radius`, default `--radius-3xl`)
     *                 ABOVE 2xl, below pill — does NOT collapse to a stadium.
     *                 Collapsed it returns to a pill; the pill↔card swap
     *                 morphs on the `--dock-motion-resize` spring. AX.W56's
     *                 squircle policy applies `corner-shape:
     *                 var(--corner-shape-bigdock)` here under `@supports
     *                 (corner-shape: superellipse(2))` — the big-dock is the ONE
     *                 surface where the superellipse reads (cards/pills stay
     *                 round); the border-radius arc is the cross-engine contract.
     *
     * `"pill"`/`"rounded"` previously bound ONLY under the vertical rail
     * variant — on a horizontal dock the prop silently no-op'd. AW.W3b adds
     * the horizontal-root shape rules (closing that documented-but-dead prop),
     * so `shape` now paints on a horizontal dock too.
     */
    shape?: "pill" | "rounded" | "card";
    /**
     * Layout axis of the dock. `"horizontal"` (default) lays items out
     * left-to-right and animates `width`; `"vertical"` lays items out
     * top-to-bottom and animates `height`. IGNORED under `variant="rail"` /
     * `"instrument-strip"` (those force vertical by construction).
     */
    orientation?: "horizontal" | "vertical";
    /**
     * Density controls dock padding, gaps, layer height, and inherited
     * dock control sizing. Root CSS variables can override each density.
     */
    density?: DockDensity;
    /**
     * Overflow strategy when the expanded content exceeds the dock's
     * axis cap (`--dock-max-inline-size` horizontally,
     * `--dock-max-block-size` vertically). The ONE knob governing every
     * overflow behaviour (AT.W7-dock-a clean break — collapsed from the
     * prior `wrap` boolean + `overflow` pair + `containerName` clip-lift,
     * which all touched overflow divergently).
     *   `"grow"`   — content grows to fit then overflows visibly past
     *                the cap (the default; nothing clips or scrolls).
     *   `"wrap"`   — expanded content wraps to multiple rows via CONTENT-DRIVEN
     *                intrinsic flex-wrap (the `.dock-overflow-wrap` recipe). The
     *                dock shrink-wraps to content and caps that intrinsic width
     *                at `max-inline-size: var(--dock-max-inline-size)`, so the row
     *                reflows to N rows EXACTLY when its intrinsic width exceeds
     *                the cap — at ANY viewport width — and collapses to one row
     *                when it fits (no viewport breakpoint). The wrapped multi-row silhouette lifts
     *                onto the card/floating shadow tier as the dock expands.
     *                HORIZONTAL-ONLY: a vertical rail grows-to-fit + clamps via
     *                `--dock-max-block-size` (its own overflow story), so the
     *                `.dock-overflow-wrap` class is not emitted for a vertical
     *                orientation.
     *   `"scroll"` — the dock becomes the scroll port. Horizontal docks
     *                scroll the active layer on the inline axis
     *                (`.dock-scroll-x`); vertical rails scroll on the
     *                block axis (`.dock-scroll-y`), keeping the
     *                `max-block-size` cap. The rounded pill masks the
     *                scroll edge; the scrollbar is hidden. The axis is
     *                chosen automatically from `orientation`.
     */
    overflow?: "grow" | "wrap" | "scroll";
    /**
     * When set, the dock root establishes an inline-size container query
     * subject (`container-type: inline-size; container-name: <value>`) so
     * descendants can query the named container via `@container <value>
     * (...)` rules. ORTHOGONAL to the `overflow` clip: opting into a
     * container subject does NOT silently change the dock's clip shell
     * (AT.W7-dock-a — the prior clip-lift was folded out; use
     * `overflow="wrap"` to allow multi-line content).
     *
     * T.B audit §1.3 cornerstone: the cluster's container subject must
     * live on the dock primitive, never on a descendant whose intrinsic
     * size the dock relies on.
     */
    containerName?: string;
    /**
     * AZ.W-ADAPTIVE-AUTO Arm 2 (H3 arm a) — the sampled-luminance observer that
     * DYNAMICALLY refines the W55 declarative bright-bucket darken (the iOS-27
     * "darken dynamically" register). Default `true` (default-ON for the dock — the
     * surface most often over a live/bright backdrop). It REFINES the floor (the
     * unconditional self-engage + the declarative bucket stay the guarantee); a
     * dark-substrate consumer opts out with `:auto-luminance="false"` (or
     * `--glass-tint-strength: 0%` on the dock). The observer is rAF-throttled ≤ 4 Hz,
     * IntersectionObserver-gated, and parks under `prefers-reduced-motion: reduce`.
     */
    autoLuminance?: boolean;
    /**
     * The KNOWN background-layer canvas the dock floats over (an aurora/blob
     * `<canvas>`) — an element, a getter, or a CSS selector. When present, the
     * observer downsamples it under the dock's box each settle (the ANIMATED-backdrop
     * case); absent, it stack-walks the painted page background (the static case).
     */
    backgroundCanvas?:
        | HTMLCanvasElement
        | (() => HTMLCanvasElement | null)
        | string
        | null;
}

/* The horizontal `dock` variant — the ONLY variant that collapses↔expands, so
   the collapse surface (`collapseDelay`/`startCollapsed`/`layout="grid"`) lives
   here and ONLY here. `variant` is optional + defaults to `"dock"`, so a bare
   `<GlassDock>` resolves to this branch. */
export interface DockVariantProps extends DockCommonProps {
    variant?: "dock";
    /** Idle-collapse delay in ms (default 2000). DOCK-ONLY — a rail never collapses. */
    collapseDelay?: number;
    /** Start in the collapsed state (default true). DOCK-ONLY — a rail is always expanded. */
    startCollapsed?: boolean;
    /**
     * In-cap arrangement. `"linear"` (default) lays the active layer out as a
     * linear row/column. `"grid"` makes the active layer a self-wrapping tile
     * grid (Launchpad/Stage-Manager track symmetry — `auto-fill` columns of
     * `--dock-tile-min`). ORTHOGONAL to `overflow` (the OVER-cap strategy):
     * `layout` is the IN-cap arrangement.
     *
     * Hard contract: a `layout="grid"` dock is `alwaysExpanded` (a 2D panel
     * does not read as a collapsible pill, and no width morph means no
     * per-frame grid reflow). The canonical pairing is
     * `shape="card" layout="grid"` (the props stay independent — no
     * auto-implication of `shape`). DOCK-ONLY — the grid is a horizontal big-dock
     * arrangement, never a rail's.
     */
    layout?: "linear" | "grid";
}

/* The vertical `rail` / `instrument-strip` variants — vertical-ALWAYS-EXPANDED
   by construction. They DO NOT carry the collapse surface: there is no
   `collapseDelay`/`startCollapsed`/`layout` here, so a consumer setting one
   under `variant="rail"` is a COMPILE error (the inapplicable prop is narrowed
   away from the type, not bridged to a runtime no-op).
     `rail`             — the vertical icon-rail navigation column used by app
                          chrome (stadium-pill silhouette, `--glass-bg-wash`
                          plate). It is the refined nav-rail: active-item accent,
                          tap-squish press feedback, and right-anchored tooltips
                          are hoisted into the variant CSS (`dock-controls.css`),
                          so a consumer reaching for `variant="rail"` gets the
                          polished surface for free.
     `instrument-strip` — vertical chassis-strip mode for consumer cockpits
                          composing an instrument-cluster gauge column (the
                          speedtest SurveyResultDock consumer). Adopts the
                          `<InstrumentChassis>` family's surface vocabulary
                          (`--radius-card` border-radius, `--glass-bg-chassis`
                          background, `--glass-border-quiet` border,
                          `--glass-shadow-quiet` shadow, plus an engraved-bezel
                          `::before` inner stroke). No new tokens — lifts the
                          existing chassis vocabulary. AJ-W1-δ / G-AJ-D7. */
export interface DockRailProps extends DockCommonProps {
    variant: "rail" | "instrument-strip";
}

export type DockProps = DockVariantProps | DockRailProps;

/* The `dockBranch()` type guard narrows the union by its `variant` discriminant
   before the branch-only reads, keeping the single set of defaults the prior
   `withDefaults` object held now that the branch-specific props left the shared
   defaults block. */
export function dockBranch(p: DockProps): p is DockVariantProps {
    return p.variant !== "rail" && p.variant !== "instrument-strip";
}

/** The resolved shell-prop computeds the GlassDock SFC binds. */
export interface DockShellProps {
    containerStyle: ComputedRef<Record<string, string> | undefined>;
    collapseDelay: ComputedRef<number>;
    startCollapsed: ComputedRef<boolean>;
    layoutValue: ComputedRef<"linear" | "grid">;
    variant: ComputedRef<"dock" | "rail" | "instrument-strip">;
    shape: ComputedRef<"pill" | "rounded" | "card">;
    orientation: ComputedRef<"horizontal" | "vertical">;
    density: ComputedRef<DockDensity>;
    scrollClass: ComputedRef<string | null>;
    alwaysExpanded: ComputedRef<boolean>;
    fitContent: ComputedRef<boolean>;
}

/**
 * Derive the dock's resolved shell props off the raw `props`. The defaults the
 * prior `withDefaults` object held are applied at each read site via `?? default`
 * (every shared default has exactly one resolution point — the one-path precept).
 */
export function useDockShellProps(props: DockProps): DockShellProps {
    /* AT.W7-dock-a — the container-query opt-in is ORTHOGONAL to the overflow
       clip. The prior `overflow: visible` clip-lift here silently coupled the
       container subject to the clip shell; it is folded out. A consumer wanting
       multi-line content opts into `overflow="wrap"`.

       AY.W-DOCK2 (§F1 reconcile) — `containerName` is ALWAYS-EXPANDED-ONLY. It
       co-applies `container-type: inline-size`, which establishes inline-size
       containment and CLAMPS the box to its contained intrinsic size — so on a
       COLLAPSIBLE dock the FLIP measures collapsed→collapsed and the collapse↔expand
       morph FREEZES (`--dock-morph-t` stuck at 0; W-DOCK1-DELTA §F1 captured exactly
       this: 10px → 18px, no morph). This is the AT.W7 / 3.4.0 dock-collapse-vs-
       container-type interaction re-surfacing on the prop (MEMORY: "dock-collapse fix
       = container-type removal"). DECISION (W-DOCK2): DOCUMENT, not gate — gating the
       combination would mean inferring "collapsible" at runtime (the discriminated-
       union default has `startCollapsed: true`, so the inference is not free), and the
       prop is legitimately used on `always-expanded` / non-dock surfaces where
       containment is correct. Consumers needing the dock as a container query SUBJECT
       set `always-expanded`; a collapsible dock that needs deterministic targeting
       uses a plain `data-testid` (no layout side-effect — the W-DOCK1 capture target).
       Mirrored in CLAUDE.md (the dock section). */
    const containerStyle = computed<Record<string, string> | undefined>(() => {
        if (!props.containerName) return undefined;
        return {
            "container-type": "inline-size",
            "container-name": props.containerName,
        };
    });

    /* AX.W06 F2 — the collapse surface is DOCK-BRANCH only (the discriminated
       union). A rail/instrument-strip never carries `collapseDelay`/`startCollapsed`/
       `layout`, so these resolve to their dock defaults when the consumer is on a
       non-dock branch — but a non-dock dock is always-expanded by construction, so
       the resolved collapse values are inert there anyway. */
    const collapseDelay = computed(() =>
        dockBranch(props) ? props.collapseDelay ?? 2000 : 2000,
    );
    const startCollapsed = computed(() =>
        dockBranch(props) ? props.startCollapsed ?? true : false,
    );
    const layoutValue = computed<"linear" | "grid">(() =>
        dockBranch(props) ? props.layout ?? "linear" : "linear",
    );

    const variant = computed(() => props.variant ?? "dock");
    const shape = computed(() => props.shape ?? "pill");
    const orientation = computed(() =>
        props.variant === "rail" || props.variant === "instrument-strip"
            ? "vertical"
            : props.orientation ?? "horizontal",
    );
    const density = computed(() => props.density ?? "comfortable");
    /* Scroll-on-overflow opt-in (default `"grow"` keeps the historical
       visible-overflow behaviour). When `overflow === "scroll"` the dock
       becomes the scroll port on its layout axis: horizontal docks scroll the
       active layer inline (`.dock-scroll-x`), vertical rails scroll the root
       block-axis (`.dock-scroll-y`). The axis is derived from `orientation`. */
    const scrollClass = computed<string | null>(() => {
        if (props.overflow !== "scroll") return null;
        return orientation.value === "vertical" ? "dock-scroll-y" : "dock-scroll-x";
    });
    /* AW.W3b — a `layout="grid"` dock is `alwaysExpanded` BY CONTRACT. A 2D tile
       panel does not read as a collapsible pill, and `alwaysExpanded` means no width
       morph → no per-frame grid-column reflow (the apple-motion reflow-during-morph
       anti-pattern is structurally avoided). Vertical rails are also always-expanded
       (they render a single slot). */
    const alwaysExpanded = computed(
        () =>
            props.alwaysExpanded ||
            orientation.value === "vertical" ||
            layoutValue.value === "grid",
    );
    const fitContent = computed(() =>
        props.fitContent ||
        props.variant === "rail" ||
        props.variant === "instrument-strip",
    );

    return {
        containerStyle,
        collapseDelay,
        startCollapsed,
        layoutValue,
        variant,
        shape,
        orientation,
        density,
        scrollClass,
        alwaysExpanded,
        fitContent,
    };
}
