// GlassDock shell-prop derivation. One `DockProps` shape resolves layout,
// orientation, size, scroll behavior, collapse posture, and container-query style.
// `orientation` is the sole axis: vertical docks morph height and horizontal docks
// morph width.

import { computed, type ComputedRef } from "vue";

// Dock scale uses the shared Size ordinal. `xl` is valid for this audacious surface.
export type DockSize = "sm" | "md" | "lg" | "xl";
export type DockBackdropMode = "live" | "static";
export type DockInteraction = "auto" | "manual";

/**
 * The GlassDock prop shape. Every dock—horizontal or vertical—reads the same
 * surface; orientation
 * is the single layout axis and the collapse surface applies on both.
 */
export interface DockProps {
    fitContent?: boolean;
    /**
     * Positioning register: `"inline"` (default) participates in normal flow;
     * `"fixed"` pins the dock centred to the viewport bottom; `"sticky"` rides
     * the `.dock-sticky` register.
     */
    position?: "fixed" | "inline" | "sticky";
    /**
     * Backdrop material mode. `"live"` (default) samples and filters the painted
     * backdrop; `"static"` uses a solid plate with no luminance observer or
     * backdrop-filter work.
     */
    backdropMode?: DockBackdropMode;
    /**
     * Never collapse: render permanently expanded, the single opt-out of the
     * collapse↔expand machinery. Default `false` (every dock is collapsible).
     * A vertical dock morphs its height too. A `layout="grid"` dock is
     * always expanded by contract (a 2D tile panel does not read as a collapsible
     * pill). A vertical navigation column can opt into the static expanded posture.
     */
    alwaysExpanded?: boolean;
    /**
     * Corner treatment.
     *   `"pill"`    — the stadium silhouette (default).
     *   `"rounded"` — a finite rounded radius (`--radius-xl`).
     *   `"card"`    — a finite concentric big-dock shell
     *                 radius (`--dock-card-radius`, default `--radius-3xl`)
     *                 ABOVE 2xl, below pill — does NOT collapse to a stadium.
     *                 Collapsed it returns to a pill; the pill↔card swap
     *                 morphs on the `--dock-motion-resize` spring. The
     *                 squircle policy applies `corner-shape:
     *                 var(--corner-shape-bigdock)` here under `@supports
     *                 (corner-shape: superellipse(2))` — the big-dock is the ONE
     *                 surface where the superellipse reads (cards/pills stay
     *                 round); the border-radius arc is the cross-engine contract.
     *
     * Paints on both orientations: a vertical dock reads `shape="rounded"` for the tool-palette
     * look, a horizontal dock reads `shape="card"` for the big-dock shell).
     */
    shape?: "pill" | "rounded" | "card";
    /**
     * Layout axis of the dock. `"horizontal"` (default) lays items out
     * left-to-right and animates `width`; `"vertical"` lays items out
     * top-to-bottom and animates `height`. This is the SINGLE layout axis — there
     * is no `variant` second-way to express "vertical".
     */
    orientation?: "horizontal" | "vertical";
    /**
     * Size controls dock padding, gaps, layer height, and inherited
     * dock control sizing. Root CSS variables can override each rung.
     */
    size?: DockSize;
    /**
     * Overflow strategy when the expanded content exceeds the dock's
     * axis cap (`--dock-max-inline-size` horizontally,
     * `--dock-max-block-size` vertically). The ONE knob governing every
     * overflow behavior.
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
     *                HORIZONTAL-ONLY: a vertical dock grows-to-fit + clamps via
     *                `--dock-max-block-size` (its own overflow story), so the
     *                `.dock-overflow-wrap` class is not emitted for a vertical
     *                orientation.
     *
     * A capped axis is intrinsically a scroll axis: a horizontal
     * dock's inline axis reads `.dock-scroll-x` unconditionally (the CSS
     * `overflow-x: auto` scrolls ONLY when the row exceeds
     * `--dock-max-inline-size`; under the cap nothing scrolls), and a vertical
     * rail's block axis scrolls via the unconditional cap-derived shell rule
     * (`--dock-max-block-size` is the sole knob). No prop, no unreachable
     * controls.
     */
    overflow?: "grow" | "wrap";
    /**
     * Idle-collapse delay in ms (default 3600). Inert on an always-expanded dock.
     */
    collapseDelay?: number;
    /**
     * Start in the collapsed state (default true). Applies on BOTH orientations
     * and a vertical dock morphs its block axis open too. Inert on an always-expanded dock.
     */
    startCollapsed?: boolean;
    /**
     * Posture ownership on a COLLAPSIBLE dock.
     *   `"auto"`   (default) — the built-in FSM owns posture.
     *   `"manual"` — the consumer owns posture. Every internal environmental writer
     *                (hover, focus, idle timer, outside-click, collapsed-tap, touch)
     *                is suppressed at BOTH poles; only `expand()`/`collapse()` write.
     *                Mount pole from `startCollapsed`. Read posture via `expanded`.
     *                a11y: the consumer MUST author a focusable disclosure in a
     *                never-inert slot (`#persistent`/`#collapsed`) — glass does not
     *                auto-expand on focus in manual and provides no fallback.
     * Resolved to `"auto"` on an always-expanded dock (that pole is force-pinned;
     * interaction is meaningless there — no dead combination reaches the FSM).
     */
    interaction?: DockInteraction;
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
     * auto-implication of `shape`).
     */
    layout?: "linear" | "grid";
    /**
     * The KNOWN background-layer canvas the dock floats over (an aurora/blob
     * `<canvas>`) — an element, a getter, or a CSS selector. When present, the
     * observer downsamples it under the dock's box after settling (the animated-backdrop
     * case); absent, it stack-walks the painted page background (the static case).
     */
    backgroundCanvas?:
        | HTMLCanvasElement
        | (() => HTMLCanvasElement | null)
        | string
        | null;
    /**
     * Native dynamic-search mode. Default `false`. When enabled, the dock stamps
     * `[data-search]` and renders `#search` inside the existing morph aperture. The
     * consumer composes `useDockSearch` and supplies its field and result menu. The
     * dock's `--dock-morph-t` remains the sole pill-to-field motion scalar.
     */
    search?: boolean;
    // Splitting and item reordering are consumer composition concerns, not Dock props.
}

/** The resolved shell-prop computeds the GlassDock SFC binds. */
export interface DockShellProps {
    collapseDelay: ComputedRef<number>;
    startCollapsed: ComputedRef<boolean>;
    interaction: ComputedRef<DockInteraction>;
    layoutValue: ComputedRef<"linear" | "grid">;
    shape: ComputedRef<"pill" | "rounded" | "card">;
    orientation: ComputedRef<"horizontal" | "vertical">;
    size: ComputedRef<DockSize>;
    scrollClass: ComputedRef<string | null>;
    alwaysExpanded: ComputedRef<boolean>;
    fitContent: ComputedRef<boolean>;
}

/**
 * Derive the dock's resolved shell props off the raw `props`. The defaults are
 * applied at each read site via `?? default` (every shared default has exactly one
 * resolution point — the one-path precept).
 */
export function useDockShellProps(props: DockProps): DockShellProps {
    /* Collapse applies on both orientations. Every default has one resolution point. */
    /* The patient-dwell default gives a forgiving hover/interaction window before
       auto-collapse, in lockstep with useDockState. An explicit value still wins. */
    const collapseDelay = computed(() => props.collapseDelay ?? 3600);
    const layoutValue = computed<"linear" | "grid">(() => props.layout ?? "linear");

    const shape = computed(() => props.shape ?? "pill");
    /* The single layout axis. */
    const orientation = computed(() => props.orientation ?? "horizontal");
    const size = computed(() => props.size ?? "md");
    /* a capped axis is ALWAYS a scroll axis (no
       opt-in). A HORIZONTAL dock's inline axis is content-driven, so it wears
       the `.dock-scroll-x` port INTRINSICALLY — the CSS `overflow-x: auto`
       scrolls ONLY when the row exceeds `--dock-max-inline-size`; under the cap
       the port is inert (nothing scrolls). The `overflow="wrap"` register is the
       one EXCEPTION: a wrap dock's over-cap strategy is intrinsic flex REFLOW
       (`.dock-overflow-wrap`), not a scroll — so it wears no scroll port. A
       VERTICAL rail folds into the unconditional cap-derived rule in shell.css
       (the `.vertical…:not([data-morphing])` at-rest port), so it wears NO class
       — returning `null` keeps the `.glass-dock.vertical` scroll story in ONE
       home (shell.css), never a second `.dock-scroll-y` opt-in. */
    const scrollClass = computed<string | null>(() =>
        orientation.value === "vertical" || props.overflow === "wrap"
            ? null
            : "dock-scroll-x",
    );
    /* A `layout="grid"` dock is always expanded by contract (a 2D tile
       panel does not read as a collapsible pill, and `alwaysExpanded` means no
       morph → no per-frame grid-column reflow). A vertical dock is collapsible by
       default; a vertical nav column that wants the static look passes
       `always-expanded` explicitly. */
    const alwaysExpanded = computed(
        () => props.alwaysExpanded || layoutValue.value === "grid",
    );
    /* `startCollapsed` defaults true but is inert on an always-expanded dock —
       the SFC reads it only when the dock can collapse. */
    const startCollapsed = computed(() =>
        alwaysExpanded.value ? false : props.startCollapsed ?? true,
    );
    /* Posture ownership. Resolved to `"auto"` on an always-expanded dock —
       that pole is force-pinned, so interaction is meaningless there and the
       `alwaysExpanded + interaction="manual"` dead combination cannot reach the FSM
       (no `data-interaction` stamp, byte-identical behaviour). */
    const interaction = computed<DockInteraction>(() =>
        alwaysExpanded.value ? "auto" : props.interaction ?? "auto",
    );
    const fitContent = computed(() => props.fitContent ?? false);

    return {
        collapseDelay,
        startCollapsed,
        interaction,
        layoutValue,
        shape,
        orientation,
        size,
        scrollClass,
        alwaysExpanded,
        fitContent,
    };
}
