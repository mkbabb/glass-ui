<script setup lang="ts">
// DO-NOT-SPLIT (AW.W15 assay): the code-quality assay graded this 421-line SFC
// cohesive-at-boundary — the dual-layer grid, the axis-aware expand/collapse
// transition, and the pointer/focus hold machinery are one tightly-coupled dock
// concern (the transition composables already factor the FLIP logic out). W14
// split the ONE over-threshold god-module (DataTable); this stays whole by design.
import { computed, onBeforeUnmount, onMounted, ref, useId, useTemplateRef, watch } from "vue";
import DockSeparator from "./DockSeparator.vue";
import { useTouchGate } from "../../../composables/dom/useTouchGate";
import { provideDockContext } from "./composables/dockContext";
import { useDockState } from "./composables/useDockState";
import {
    useDockMorphOrchestrator,
    provideDockMorphContext,
} from "./composables/dockMorphContext";

type DockDensity = "compact" | "comfortable" | "spacious" | "audacious";

/* AX.W06 F2 — the HONEST rail surface. The prop contract is a DISCRIMINATED
   UNION on `variant`: the horizontal `dock` variant carries the collapse↔expand
   surface (`collapseDelay`/`startCollapsed`/`layout="grid"`); the vertical
   `rail` / `instrument-strip` variants are vertical-ALWAYS-EXPANDED by contract
   and DO NOT accept that surface (a compile error, not a silent no-op). This
   removes the dead half-inapplicable prop surface from the type (the one-path
   precept), so the rail's vertical-always-expanded contract is the SINGLE
   documented shape. (The `#collapsed` slot is NOT the horizontal collapse-summary
   pane on a vertical rail — there is no collapse↔expand morph to summarise. Per
   the W45-TUNE C7 vertical three-region body it renders as an OPTIONAL trailing
   section below a `<DockSeparator>`; a rail that authors no `#collapsed` slot is a
   single always-expanded column.) */
interface DockCommonProps {
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
}

/* The horizontal `dock` variant — the ONLY variant that collapses↔expands, so
   the collapse surface (`collapseDelay`/`startCollapsed`/`layout="grid"`) lives
   here and ONLY here. `variant` is optional + defaults to `"dock"`, so a bare
   `<GlassDock>` resolves to this branch. */
interface DockVariantProps extends DockCommonProps {
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
interface DockRailProps extends DockCommonProps {
    variant: "rail" | "instrument-strip";
}

type DockProps = DockVariantProps | DockRailProps;

/* AX.W06 F2 — pure `defineProps<DockProps>()` (NOT `withDefaults`). The
   discriminated-union narrow is ONLY enforced at the template/type level under
   pure `defineProps`: `withDefaults` over a union props type degrades the
   runtime props inference to `Record<string, any>` and ERASES the narrow (the
   `<GlassDock variant="rail" :collapse-delay>` refusal vanishes). With pure
   `defineProps` the union survives, so the inapplicable collapse surface is a
   COMPILE error under `variant="rail"` (the one-path honest-rail contract).
   The defaults the prior `withDefaults` object held are now applied at each read
   site via `?? default` (localized to the computeds below — every shared default
   has exactly one resolution point). */
const props = defineProps<DockProps>();

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
   the resolved collapse values are inert there anyway. The `dockBranch()` type
   guard narrows the union by its `variant` discriminant before the branch-only
   reads, keeping the single set of defaults the prior `withDefaults` object held
   now that the branch-specific props left the shared defaults block. */
function dockBranch(p: DockProps): p is DockVariantProps {
    return p.variant !== "rail" && p.variant !== "instrument-strip";
}
const collapseDelay = computed(() =>
    dockBranch(props) ? props.collapseDelay ?? 2000 : 2000,
);
const startCollapsed = computed(() =>
    dockBranch(props) ? props.startCollapsed ?? true : false,
);
const layoutValue = computed<"linear" | "grid">(() =>
    dockBranch(props) ? props.layout ?? "linear" : "linear",
);

const dockEl = useTemplateRef<HTMLElement>("dockEl");
const layersEl = useTemplateRef<HTMLElement>("layersEl");
const variant = computed(() => props.variant ?? "dock");
const shape = computed(() => props.shape ?? "pill");
const layout = layoutValue;
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

const isTransitioning = ref(false);
const touchGate = useTouchGate(collapseDelay.value);
const dockId = `glass-dock-${useId()}`;
let transitionTimer: ReturnType<typeof setTimeout> | null = null;
/* AT.W6-dock-c — the morph GENERATION. `isTransitioning` must track the ACTUAL
   resize morph, never a stale event from a superseded one. Each `markTransitioning`
   (every `visualExpanded` flip) bumps `morphGeneration`; the timer fallback and
   the `transitionend` handler both capture the generation live at fire time and
   no-op when it has moved on. So a ≥2-dock rapid A→B→A re-trigger CANNOT
   skip-fast-forward (a leftover A→B `transitionend` cannot clear the live B→A
   morph) and CANNOT queue (the flag stays true across the whole chain, cleared
   only by the LAST morph's own resolution). */
let morphGeneration = 0;

const {
    expanded,
    isPinned,
    isHeld,
    onMouseEnter,
    onMouseLeave,
    onFocusIn,
    onFocusOut,
    onClickCollapsed,
    keepOpen,
    release,
    expand,
    collapse,
} = useDockState({
    collapseDelay: collapseDelay.value,
    rootEl: dockEl,
    alwaysExpanded,
    isTransitioning,
    dockId,
});

/* O.W2 — canonical typed-key dock context (invariant 25). The 6 prior
   string-keyed dock provides (`glassDockContext`, `glassDockId`,
   `dockKeepOpen`, `dockRelease`, `dockHeld`, `dockExpanded`) collapse
   into this single typed provide. `dockExpanded` is retired (zero
   downstream consumers per Rδ); `glassDockId` is dedup'd with
   `context.id`. */
provideDockContext({
    id: dockId,
    orientation,
    layout,
    keepOpen,
    release,
    held: isHeld,
});

const visualExpanded = computed(() => alwaysExpanded.value || expanded.value);

/* AX.W02 — ONE morph orchestrator per dock. W01 established the single-scalar
   `--dock-morph-t` spring; W02 folds the outer collapse↔expand pair AND every
   nested `<DockLayerGroup>` pane-swap onto ONE engine. The dock is modelled as a
   single morph stack whose active "layer" is `(expandedState × activePane)`: the
   outer swap and the inner pane swap are transitions in the SAME group, driven by
   ONE `SpringProgress` writing one root scalar. A nested group no longer mints its
   own `useLayerTransition` engine — it injects this orchestrator and registers,
   so a simultaneous collapse + pane-swap settles on one spring, one scalar, one
   clock. The outer pair morphs the inline axis (horizontal docks only — vertical
   rails render a single slot, no layer pair to crossfade). */
const outerActiveLayer = computed<string>(() =>
    visualExpanded.value ? "full" : "summary",
);
const outerLayerAxis = computed<"horizontal" | "vertical">(() => "horizontal");
/* AX.W01 redress (KEPT) — the OUTER collapse is a CLIP-APERTURE morph. Both panes
   (`--full` + `--summary`) are grid-stacked behind the root clip; the ACTIVE pane
   is in-flow (`position:relative; width:max-content`) and the INACTIVE one is
   `position:absolute; inset:0` (stretched, out of flow). `.dock-layers` therefore
   shrink-wraps the ACTIVE pane — so its size differs between collapsed/expanded
   only AFTER Vue flushes the `.collapsed`↔`.expanded` class flip that swaps which
   pane is active. The orchestrator pins the container at `from` immediately (box
   holds, child stagger holds at t=0) and measures `to` one rAF later — post-flush
   — when the container shrink-wraps to the TARGET pane's natural width. Size +
   padding + radius + color + child stagger all co-morph off the one
   `--dock-morph-t` scalar. The inner `<DockLayerGroup>` pane-swap shares the SAME
   pane topology and registers as a SECOND morph target on the SAME spring. */
const { context: dockMorphContext, onOuterTransitionEnd: onLayersTransitionEnd } =
    useDockMorphOrchestrator({
        rootEl: dockEl,
        outerEl: layersEl,
        outerActiveLayer,
        outerAxis: outerLayerAxis,
    });

/* AX.W02 — PROVIDE the single morph orchestrator through the optional DI seam. A
   nested `<DockLayerGroup>` injects it and DEFERS its pane-swap morph to this one
   engine (no second spring); a `<DockLayerGroup>` rendered outside any
   `<GlassDock>` reads `null` and self-orchestrates as before (the standalone demo
   path). `createOptionalContext` is correct: a missing provider is a
   befitting-silent standalone-render path, not a library-internal violation. */
provideDockMorphContext(dockMorphContext);

/* AX.W01 — the route-morph `view-transition-name` seam (PRESERVED). The dock
   COLLAPSE VT fork is RETIRED (the box morph runs on the single spring scalar
   above; VT crossfades rasterized pixels — the wrong primitive for a layout
   morph). But the per-instance `glass-dock-${useId()}` NAMED-ELEMENT seam is KEPT,
   moved to the dock ROOT, for the consumer's PAGE/route geometry-morph (fourier's
   J+K critical-path route morph; invariant η — the `proof:vt-names` gate polices
   the app-unique `useId()` mint-source). `dockId` is app-scoped, so two co-mounted
   docks mint DISTINCT names and never collide their route-morph snapshots. The
   name is no longer the dock's OWN collapse mechanism — only the route
   geometry-morph the consumer drives. Always applied (the route-morph is engine-
   gated by the consumer's own `startViewTransition`, not by the dock). */
const rootVtStyle = computed<Record<string, string>>(() => ({
    "view-transition-name": dockId.replace(/[^a-zA-Z0-9_-]/g, "-"),
}));

function parseTimeMs(value: string): number {
    const trimmed = value.trim();
    if (!trimmed) return 0;
    if (trimmed.endsWith("ms")) return Number.parseFloat(trimmed);
    if (trimmed.endsWith("s")) return Number.parseFloat(trimmed) * 1000;
    return Number.parseFloat(trimmed) || 0;
}

function longestTransitionMs(el: HTMLElement): number {
    const style = getComputedStyle(el);
    const durations = style.transitionDuration.split(",").map(parseTimeMs);
    const delays = style.transitionDelay.split(",").map(parseTimeMs);
    return Math.max(
        0,
        ...durations.map((duration, index) => duration + (delays[index] ?? delays[0] ?? 0)),
    );
}

/* AX.W01 — the morph is now spring-driven (`--dock-morph-t`), NOT a CSS transition,
   so the root carries no `width`/`padding` transition whose `transitionend` would
   resolve `isTransitioning`. The fallback timer is therefore the morph's settle
   ENVELOPE — the `--spring-dock` (0.32, 0.7) curve settles within ~2× the design
   window (`--duration-normal`); we read that token and scale it, with a floor so a
   token-less SSR/test env still gets a sane window. This keeps `isTransitioning`
   high for the whole spring (preventing a mid-morph collapse) and clearing once it
   settles — the same role the prior `longestTransitionMs(root)` played when the
   root still owned the CSS transition. */
function morphWindowMs(el: HTMLElement): number {
    const normal = parseTimeMs(
        getComputedStyle(el).getPropertyValue("--duration-normal") || "0.3s",
    );
    return Math.max(normal > 0 ? normal * 2 : 0, 600);
}

function clearTransitionTimer(): void {
    if (transitionTimer) {
        clearTimeout(transitionTimer);
        transitionTimer = null;
    }
}

/* The properties whose transitions ARE the resize morph (driven by
   `--dock-motion-resize`). The flag resolves on one of THESE finishing — never
   on a shorter `--dock-motion-standard` property (box-shadow/background/
   border-color), which would skip-fast-forward `isTransitioning` to false while
   the morph is still in flight. */
const RESIZE_MORPH_PROPS = new Set(["width", "height", "padding", "transform"]);

function markTransitioning(): void {
    const root = dockEl.value;
    if (!root) return;
    // Bump the generation: any in-flight morph's pending timer / transitionend
    // is now stale and self-cancels (the A→B→A no-skip / no-queue invariant).
    const generation = ++morphGeneration;
    clearTransitionTimer();
    isTransitioning.value = true;
    transitionTimer = setTimeout(() => {
        if (generation !== morphGeneration) return;
        isTransitioning.value = false;
        transitionTimer = null;
    }, Math.max(longestTransitionMs(root), morphWindowMs(root)) + 50);
}

function onDockTransitionDone(event: TransitionEvent): void {
    if (event.target !== dockEl.value) return;
    // Only the resize-morph properties resolve the flag — a shorter standard-
    // motion property finishing first must NOT drop `isTransitioning` mid-morph.
    if (!RESIZE_MORPH_PROPS.has(event.propertyName)) return;
    clearTransitionTimer();
    // Settle the generation so a later stale timer can't reopen the flag.
    morphGeneration++;
    isTransitioning.value = false;
}

onMounted(() => {
    if (props.alwaysExpanded || !startCollapsed.value) {
        expand();
    }
});

function shouldGateTouch(): boolean {
    return orientation.value === "horizontal" && !alwaysExpanded.value;
}

/* AT.W6-dock-b — shape B′ touch-gate. The gate's job is to DISTINGUISH a tap
   from a vertical scroll on the floating collapsed pill (the 150ms pending
   window + the >10px scroll-check inside `useTouchGate`), NOT to SWALLOW the
   tap. We therefore do NOT `preventDefault()`/`stopPropagation()` the activating
   `touchstart`/`touchend`: the browser's native tap→click compatibility event is
   allowed to flow to the tapped control, so a SINGLE tap on a collapsed dock
   control BOTH expands the dock (here) AND activates that control (via the
   native click) — the iOS Now-Playing mini-bar single-tap-play contract. No
   `elementFromPoint`, no synthetic dispatch: the fix rides the browser's own
   tap→click. (Swallowing the tap was the root cause of the double-tap field
   defect — a prevented touch sequence emits no compatibility click, so the
   control under the finger fired nothing and the user had to tap twice.) A
   scroll gesture cancels the pending tap inside the gate and never emits a
   tap-click, so vertical scrolling on the pill stays browser-owned. */
function onTouchStart(event: TouchEvent): void {
    if (!shouldGateTouch() || visualExpanded.value) return;
    const root = dockEl.value;
    const touch = event.touches[0];
    if (!root || !touch) return;

    // Arm the tap/scroll discrimination; the return value is consumed by the
    // gate's own state — the tap is never preventDefault-ed (shape B′).
    touchGate.handleTouchStart(root, touch.clientY);
}

function onTouchMove(event: TouchEvent): void {
    if (!shouldGateTouch()) return;
    touchGate.handleScrollCheck(event);
}

function onTouchEnd(): void {
    if (!shouldGateTouch()) return;
    const wasActive = touchGate.isActive.value;
    touchGate.handleTouchEnd();
    if (!wasActive && touchGate.isActive.value && !visualExpanded.value) {
        // Expand on the resolved tap, but let the native compatibility click
        // reach the control — no preventDefault, no stopPropagation (shape B′).
        expand();
    }
}

watch(touchGate.isActive, (isActive) => {
    if (!isActive && expanded.value && !isPinned.value && !alwaysExpanded.value) {
        collapse();
    }
});

watch(visualExpanded, (isExpanded) => {
    markTransitioning();
    if (!isExpanded) {
        touchGate.deactivate();
    }
});

onBeforeUnmount(clearTransitionTimer);

defineExpose({ expanded, isPinned, isHeld, isTransitioning, expand, collapse, keepOpen, release });
</script>

<template>
    <div
        ref="dockEl"
        class="glass-dock"
        :class="[
            orientation,
            `variant-${variant}`,
            `shape-${shape}`,
            `layout-${layout}`,
            scrollClass,
            { expanded: visualExpanded, collapsed: !visualExpanded, pinned: isPinned, 'fit-content': fitContent, 'always-expanded': alwaysExpanded, 'dock-overflow-wrap': overflow === 'wrap' && orientation !== 'vertical' },
            position === 'fixed' ? 'fixed bottom-[var(--dock-pos)] left-1/2 -translate-x-1/2'
              : position === 'sticky' ? 'dock-sticky'
              : 'dock-inline',
        ]"
        :data-density="density"
        :data-held="isHeld || undefined"
        :data-container-name="containerName || undefined"
        :style="[containerStyle, rootVtStyle]"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave($event)"
        @focusin="onFocusIn"
        @focusout="onFocusOut"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
        @transitionend="onDockTransitionDone"
        @transitioncancel="onDockTransitionDone"
    >
        <!--
            AX.W45 D13-a — the PERSISTENT region. The `#persistent` slot is a root
            flex SIBLING of the morph-region, in-flow in BOTH collapsed AND expanded,
            NEVER `:inert`, NEVER a crossfade pane. It is the iOS Now-Playing /
            Stage-Manager idiom done STRUCTURALLY: a stable always-present rail beside
            the expand-on-demand content region, so a consumer keeps a control visible
            while collapsed WITHOUT hand-duplicating it into both the `#default` and
            `#collapsed` slots. It rides the root padding/radius morph (it inherits the
            `--dock-morph-t` chrome) but is NOT a `registerGroup` morph TARGET — it
            holds steady (no crossfade, no jitter) while the morph-region's aperture
            animates on the ONE spring. Rendered only when authored ($slots.persistent),
            so a dock with no persistent controls is byte-identical to before.
        -->
        <div v-if="$slots.persistent" class="dock-persistent">
            <slot name="persistent" />
        </div>

        <!--
            Horizontal docks use the built-in two-layer pattern (full +
            collapsed summary) with CSS-grid stacking and FLIP-driven
            width crossfade transitions.
        -->
        <template v-if="orientation === 'horizontal'">
            <div
                ref="layersEl"
                class="dock-layers"
                @transitionend="onLayersTransitionEnd"
            >
                <div
                    :class="['dock-layer dock-layer--full', { 'is-active': visualExpanded }]"
                    :inert="!expanded || undefined"
                >
                    <slot />
                </div>
                <div
                    :class="['dock-layer dock-layer--summary', { 'is-active': !visualExpanded }]"
                    :inert="expanded || undefined"
                    @click="onClickCollapsed"
                >
                    <slot name="collapsed" />
                </div>
            </div>
        </template>
        <!--
            AX.W45-TUNE C7 — the vertical three-region BODY (structural parity with
            the horizontal template, not CSS-only). A vertical dock is an always-
            expanded tool palette: it has no collapse↔expand width morph, so the
            body is NOT the horizontal full/summary FLIP pair. But the three-region
            STRUCTURE is now real:
              1. `#persistent` — the stable rail (already the root flex SIBLING above,
                 shared by both orientations).
              2. the DEFAULT content stack — wrapped in `.dock-layers` (mirroring the
                 horizontal morph-region container) so the column reads as a
                 structured body, not a bare slot dump; consumers demarcate item
                 GROUPS with `<DockSeparator>` (the built-in section rhythm — transport
                 | nav | settings), the same primitive the horizontal dock uses.
              3. `#collapsed` — an OPTIONAL trailing section (the vertical analogue of
                 the horizontal summary pane). On a non-collapsing rail it renders as a
                 persistent secondary group below a structural section divider, so a
                 consumer authoring a `#collapsed` slot gets a real bottom region with
                 the dock's gap rhythm rather than a no-op. Rendered only when authored
                 ($slots.collapsed), so a vertical dock with no collapsed slot is
                 byte-identical to the prior bare-slot body (one `.dock-layers`
                 wrapper, same column flow).
        -->
        <template v-else>
            <div class="dock-layers dock-layer--vertical-body">
                <slot />
                <template v-if="$slots.collapsed">
                    <DockSeparator />
                    <div class="dock-layer--vertical-section">
                        <slot name="collapsed" />
                    </div>
                </template>
            </div>
        </template>
    </div>
</template>
