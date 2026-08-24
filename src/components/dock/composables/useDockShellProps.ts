// GlassDock shell-prop derivation. One `DockProps` shape resolves orientation,
// silhouette, collapse posture and backdrop material. `orientation` is the sole
// axis: vertical docks morph height and horizontal docks morph width.
//
// [2026-08-12 · BK #47 W1 SURFACE] The surface is SIX props (GF-DOCK §4). Seven were
// struck outright — `overflow` · `collapseDelay` · `search` · `position` · `size` ·
// `layout` · `interaction` — and two folded into one (`alwaysExpanded` +
// `startCollapsed` → `collapse`). Clean break, no aliases: a consumer re-points by
// name. What each strike costs, and why:
//   `overflow`   — the over-cap strategy is closed-form under the lattice (W3); the
//                  `wrap` reflow register and its `.dock-overflow-wrap` recipe go.
//   `collapseDelay` — one idle window for every dock (`DOCK_COLLAPSE_DELAY_MS`);
//                  a per-dock delay is a knob no dock in this tree ever moved off 3600.
//   `search`     — the `#search` slot IS the opt-in; a boolean gating a named slot is
//                  a second switch for one fact. `useDockSearch` stays exported.
//   `position`   — zero call sites; `.dock-inline`'s centring folds onto `.glass-dock`.
//   `size`       — one density (the shipped `md` rung) is now the base; `[data-preset]`
//                  remains the geometry override for a consumer that needs another.
//   `layout`     — the `grid` tile panel was an `alwaysExpanded`-by-contract second
//                  layout mode; the dock is a run, and a 2D tile panel is not a dock.
//   `interaction`— the `manual` pole suppressed every environmental writer, i.e. it
//                  turned the dock's own state machine off. `expand()`/`collapse()`
//                  stay exposed, so a consumer that owns posture still owns it.

import { computed, type ComputedRef } from "vue";

export type DockBackdropMode = "live" | "static";

/**
 * Collapse posture. `"closed"` (default) mounts collapsed, `"open"` mounts
 * expanded, and `false` never collapses at all — the single opt-out of the
 * collapse↔expand machinery, on both orientations.
 */
export type DockCollapse = false | "closed" | "open";

/**
 * The GlassDock prop shape. Every dock—horizontal or vertical—reads the same
 * surface; orientation is the single layout axis and the collapse surface applies
 * on both.
 */
export interface DockProps {
    fitContent?: boolean;
    /**
     * Backdrop material mode. `"live"` (default) samples and filters the painted
     * backdrop; `"static"` uses a solid plate with no luminance observer or
     * backdrop-filter work.
     */
    backdropMode?: DockBackdropMode;
    /**
     * Corner treatment.
     *   `"pill"`    — the stadium silhouette (default).
     *   `"rounded"` — the finite CARD-role corner (`--radius-card`): a plate
     *                 silhouette, distinct from both the stadium and the big-dock
     *                 shell. Bound to the role, never to a literal rung.
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
     * Paints on both orientations: a vertical dock reads `shape="rounded"` for the
     * tool-palette look, a horizontal dock reads `shape="card"` for the big-dock shell.
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
     * Collapse posture — mount pole AND opt-out in one member.
     *   `"closed"` (default) — collapsible, mounts collapsed.
     *   `"open"`             — collapsible, mounts expanded.
     *   `false`              — never collapses; the FSM is force-pinned and every
     *                          environmental writer (hover, focus, idle timer,
     *                          outside-click, collapsed-tap, touch) is quiet.
     * Applies on BOTH orientations: a vertical dock morphs its block axis too.
     */
    collapse?: DockCollapse;
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
    // Splitting and item reordering are consumer composition concerns, not Dock props.
}

/** The resolved shell-prop computeds the GlassDock SFC binds. */
export interface DockShellProps {
    startCollapsed: ComputedRef<boolean>;
    shape: ComputedRef<"pill" | "rounded" | "card">;
    orientation: ComputedRef<"horizontal" | "vertical">;
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
    const shape = computed(() => props.shape ?? "pill");
    /* The single layout axis. */
    const orientation = computed(() => props.orientation ?? "horizontal");
    /* A capped axis is ALWAYS a scroll axis (no opt-in). A HORIZONTAL dock's inline
       axis is content-driven, so it wears the `.dock-scroll-x` port INTRINSICALLY —
       the CSS `overflow-x: auto` scrolls ONLY when the row exceeds
       `--dock-max-inline-size`; under the cap the port is inert (nothing scrolls). A
       VERTICAL dock folds into the unconditional cap-derived rule in shell.css (the
       `.vertical…:not([data-morphing])` at-rest port), so it wears NO class —
       returning `null` keeps the `.glass-dock.vertical` scroll story in ONE home
       (shell.css), never a second `.dock-scroll-y` opt-in. */
    const scrollClass = computed<string | null>(() =>
        orientation.value === "vertical" ? null : "dock-scroll-x",
    );
    /* `collapse: false` is the ONE force-pinned pole. */
    const alwaysExpanded = computed(() => props.collapse === false);
    /* Mount pole for a collapsible dock — inert on the pinned pole, so the SFC
       reads it only when the dock can collapse. */
    const startCollapsed = computed(
        () => !alwaysExpanded.value && (props.collapse ?? "closed") === "closed",
    );
    const fitContent = computed(() => props.fitContent ?? false);

    return {
        startCollapsed,
        shape,
        orientation,
        scrollClass,
        alwaysExpanded,
        fitContent,
    };
}
