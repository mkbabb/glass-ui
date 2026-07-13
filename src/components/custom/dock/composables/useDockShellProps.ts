// The GlassDock shell-prop derivation — the orientation-resolution + prop-
// derivation cluster carved out of GlassDock.vue. It owns the ONE prop shape, and
// the resolved computeds (shape / layout / orientation / density / scrollClass /
// alwaysExpanded / fitContent / collapse surface + the container-query style). A
// GlassDock-internal composable: it takes the resolved `props` and returns the
// derived computeds the SFC binds.
//
// AZ.W-DOCK-TAXONOMY (arm a) — the `variant` discriminant is GONE. There was a
// `variant: "dock" | "rail" | "instrument-strip"` axis that partially-duplicated
// `orientation` (a "vertical dock" was expressible TWO ways — `variant="rail"` OR
// `orientation="vertical"`) and overloaded the "rail" noun. The discriminated union
// `DockVariantProps | DockRailProps` collapses to ONE `DockProps` interface;
// "rail-ness" is now `orientation="vertical"` + a shape/size choice, and the
// collapse/morph machinery applies on BOTH orientations (a vertical dock morphs its
// `height`, a horizontal dock its `width`). `instrument-strip`'s chassis paint
// RETIRED with no live consumer (the ≥2-consumer bar; the cross-repo speedtest
// cockpit re-pins in its own migration — recorded in MIGRATION.md). No aliases.

import { computed, type ComputedRef } from "vue";

// BH.W-SIZE-UNIFY — the dock scale axis IS the shared Size ordinal (no
// separate `density` — the size/density collision the wave kills). compact→sm,
// comfortable→md, spacious→lg, audacious→xl; `xl` is legal here (the dock is the
// sole HEAD Size-`xl` consumer, axes.ts §sub-range-law).
export type DockSize = "sm" | "md" | "lg" | "xl";

/**
 * The ONE GlassDock prop shape (AZ.W-DOCK-TAXONOMY — the discriminated union is
 * gone). Every dock — horizontal or vertical — reads the SAME surface; orientation
 * is the single layout axis and the collapse surface applies on both.
 */
export interface DockProps {
    fitContent?: boolean;
    position?: "fixed" | "inline" | "sticky";
    /**
     * Never collapse — render permanently expanded; the single opt-OUT of the
     * collapse↔expand machinery. Default `false` (every dock is collapsible).
     * AZ.W-DOCK-TAXONOMY — vertical docks are NO LONGER force-pinned here (a
     * vertical dock morphs its height too; the prior `variant="rail"`
     * always-expanded-by-construction is removed). A `layout="grid"` dock is
     * `alwaysExpanded` BY CONTRACT (a 2D tile panel does not read as a collapsible
     * pill). A vertical nav column that wants the static always-expanded look opts
     * in via this prop. (A positive `collapsible` boolean was considered and
     * rejected: Vue coerces an absent boolean prop to `false`, so a `collapsible`
     * defaulting to `true` would need a `withDefaults` second default-path; the
     * existing `alwaysExpanded` opt-out — which correctly defaults `false` — is the
     * one knob, no Vue boolean-trap.)
     */
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
     * Paints on BOTH orientations (AZ.W-DOCK-TAXONOMY — `shape` is no longer
     * variant-gated; a vertical dock reads `shape="rounded"` for the tool-palette
     * look, a horizontal dock reads `shape="card"` for the big-dock shell).
     */
    shape?: "pill" | "rounded" | "card";
    /**
     * Layout axis of the dock. `"horizontal"` (default) lays items out
     * left-to-right and animates `width`; `"vertical"` lays items out
     * top-to-bottom and animates `height`. This is the SINGLE layout axis — there
     * is no `variant` second-way to express "vertical" (AZ.W-DOCK-TAXONOMY).
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
     *                HORIZONTAL-ONLY: a vertical dock grows-to-fit + clamps via
     *                `--dock-max-block-size` (its own overflow story), so the
     *                `.dock-overflow-wrap` class is not emitted for a vertical
     *                orientation.
     *
     * BG.W-DOCK-CAP-SCROLL-FADE — the `"scroll"` opt-in RETIRED (clean break,
     * no alias). A capped axis is INTRINSICALLY a scroll axis: a horizontal
     * dock's inline axis reads `.dock-scroll-x` unconditionally (the CSS
     * `overflow-x: auto` scrolls ONLY when the row exceeds
     * `--dock-max-inline-size`; under the cap nothing scrolls), and a vertical
     * rail's block axis scrolls via the unconditional cap-derived shell rule
     * (`--dock-max-block-size` is the sole knob). No prop, no unreachable
     * controls.
     */
    overflow?: "grow" | "wrap";
    /**
     * When set, the dock root establishes an inline-size container query
     * subject (`container-type: inline-size; container-name: <value>`) so
     * descendants can query the named container via `@container <value>
     * (...)` rules. ORTHOGONAL to the `overflow` clip: opting into a
     * container subject does NOT silently change the dock's clip shell
     * (AT.W7-dock-a — the prior clip-lift was folded out; use
     * `overflow="wrap"` to allow multi-line content).
     *
     * ALWAYS-EXPANDED-ONLY (AY.W-DOCK2 §F1): `container-type: inline-size`
     * clamps the box to its contained intrinsic size, so on a COLLAPSIBLE
     * dock the collapse↔expand FLIP measures collapsed→collapsed and the
     * morph FREEZES. A collapsible dock that needs deterministic targeting
     * uses a plain `data-testid` (no layout side-effect).
     */
    containerName?: string;
    /**
     * Idle-collapse delay in ms (default 2000). Inert on an always-expanded dock.
     */
    collapseDelay?: number;
    /**
     * Start in the collapsed state (default true). Applies on BOTH orientations
     * (AZ.W-DOCK-TAXONOMY — a vertical dock starts collapsed and morphs its block
     * axis open too). Inert on an always-expanded dock.
     */
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
     * auto-implication of `shape`).
     */
    layout?: "linear" | "grid";
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
    /**
     * BC.W-DOCK-SEARCH — the dock-as-native-dynamic-search-bar MODE (additive,
     * default `false`). When true the dock stamps `[data-search]` (the CSS hook the
     * `dock/search.css` active-field tint seam + the `.glass-menu-row` result rows
     * target) and renders the `#search` slot INSIDE the existing morph aperture — the
     * consumer composes `useDockSearch` (the gesture/shrink/dropdown seam) and slots
     * its search field + fuzzy dropdown there. The pill→field morph is the dock's OWN
     * `--dock-morph-t` glide (box-inviolate — no second engine). A non-search dock is
     * byte-identical to HEAD (the slot + the data-attr are present only when authored).
     */
    search?: boolean;
    // BI.W-DOCK-RETIRES — the `splittable`/`splitContext`/`splitPlacement` fission props
    // are DEFINITION-ABSENT (the fission facility retired decided-terminal; clean break).
    // BI.W-DOCK-FOLD — the `draggableItems` axis (the demo-only dock-ITEM drag-reorder,
    // `useDockItemDrag`) is DEFINITION-ABSENT (G10 census: zero binary consumer; clean
    // break, no alias). A dock reorder is a consumer concern (`useSortable`), never a
    // masking dead prop with no engine behind it.
}

/** The resolved shell-prop computeds the GlassDock SFC binds. */
export interface DockShellProps {
    containerStyle: ComputedRef<Record<string, string> | undefined>;
    collapseDelay: ComputedRef<number>;
    startCollapsed: ComputedRef<boolean>;
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
       combination would mean inferring "collapsible" at runtime, and the prop is
       legitimately used on `always-expanded` surfaces where containment is correct.
       Consumers needing the dock as a container query SUBJECT set `always-expanded`; a
       collapsible dock that needs deterministic targeting uses a plain `data-testid`.
       Mirrored in CLAUDE.md (the dock section). */
    const containerStyle = computed<Record<string, string> | undefined>(() => {
        if (!props.containerName) return undefined;
        return {
            "container-type": "inline-size",
            "container-name": props.containerName,
        };
    });

    /* AZ.W-DOCK-TAXONOMY — the collapse surface applies on BOTH orientations now
       (the prior dock-branch gate is gone with the `variant` discriminant). Every
       default has exactly one resolution point. */
    /* BD.W-DOCK-CORE (A2) — the patient-dwell default (2000 → 3600ms): a more forgiving
       hover/interaction window before auto-collapse, in lockstep with the useDockState
       composable default. An explicit `:collapse-delay` consumer prop still wins. */
    const collapseDelay = computed(() => props.collapseDelay ?? 3600);
    const layoutValue = computed<"linear" | "grid">(() => props.layout ?? "linear");

    const shape = computed(() => props.shape ?? "pill");
    /* The SINGLE layout axis (AZ.W-DOCK-TAXONOMY — no `variant` second-way). */
    const orientation = computed(() => props.orientation ?? "horizontal");
    const size = computed(() => props.size ?? "md");
    /* BG.W-DOCK-CAP-SCROLL-FADE — a capped axis is ALWAYS a scroll axis (no
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
    /* AW.W3b — a `layout="grid"` dock is `alwaysExpanded` BY CONTRACT (a 2D tile
       panel does not read as a collapsible pill, and `alwaysExpanded` means no
       morph → no per-frame grid-column reflow). AZ.W-DOCK-TAXONOMY removed the
       `orientation === "vertical"` force-pin — a vertical dock is now collapsible by
       default, so a vertical nav column that wants the static look passes
       `always-expanded` explicitly. */
    const alwaysExpanded = computed(
        () => props.alwaysExpanded || layoutValue.value === "grid",
    );
    /* `startCollapsed` defaults true but is inert on an always-expanded dock —
       the SFC reads it only when the dock can collapse. */
    const startCollapsed = computed(() =>
        alwaysExpanded.value ? false : props.startCollapsed ?? true,
    );
    const fitContent = computed(() => props.fitContent ?? false);

    return {
        containerStyle,
        collapseDelay,
        startCollapsed,
        layoutValue,
        shape,
        orientation,
        size,
        scrollClass,
        alwaysExpanded,
        fitContent,
    };
}
