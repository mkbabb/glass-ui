<script setup lang="ts">
// The shell-prop derivation (variant/shape/orientation/density/collapse surface +
// the container-query style + the discriminated-union prop types) lives in
// ./composables/useDockShellProps; the morph-window timing family (the
// isTransitioning flag lifecycle) lives in ./composables/useDockMorphWindow. This
// SFC composes the dual-layer grid, the axis-aware expand/collapse transition, and
// the pointer/focus hold machinery.
import { computed, nextTick, onBeforeUnmount, onMounted, ref, shallowRef, useId, useSlots, useTemplateRef, watch } from "vue";
import { useTouchGate } from "../../../composables/dom/useTouchGate";
// BD.W-DOCK-CORE (A13 / II.2) — the SHIPPED fission engine, WIRED into a first-class
// `<GlassDock split>` facility (the engine is 100%, assembly was 0%). A CONSUMING seam
// BESIDE the morph engine (box-INVIOLATE — it does NOT import/edit dockMorphContext/
// DOCK_SPRING; it morphs surviving controls off the dock body).
import {
    useDockFission,
    DOCK_SPLIT_SIGNATURES,
    type DockFissionPieceHandle,
    type DockSplitPlacement,
} from "./composables/useDockFission";
// AZ.W-ADAPTIVE-AUTO Arm 2 (H3 arm a) — the sampled-luminance observer is wired ON by
// DEFAULT for the dock (the surface the user reported unreadable over light, and the
// one most often over a live/bright backdrop). It REFINES the W55 declarative bucket +
// the Arm-1 self-engage (both stay the floor); a dark-substrate consumer opts out via
// `--glass-tint-strength: 0%` on the dock or `:auto-luminance="false"`. Imported
// directly (NOT via the glass barrel) — the composable is demo-private (path B): the
// dock is the binary consumer #1, the public barrel seat awaits a 2nd binary consumer
// (docs/consumer-evidence/use-glass-backdrop-luminance.md names the booked trigger).
import { useGlassBackdropLuminance } from "../../../composables/glass/useGlassBackdropLuminance";
import { provideDockContext } from "./composables/dockContext";
import { useDockState } from "./composables/useDockState";
import {
    useDockMorphOrchestrator,
    provideDockMorphContext,
} from "./composables/dockMorphContext";
import { useDockExpandedSize } from "./composables/dockMorphMeasure";
import { useDockShellProps, type DockProps } from "./composables/useDockShellProps";
import { useDockMorphWindow } from "./composables/useDockMorphWindow";
import { useDockClickIntegrity } from "./composables/useDockClickIntegrity";
import { useDockItemDrag } from "./composables/useDockItemDrag";

/* AZ R4-RAIL attrs contract — the `.glass-dock-frame` shell is STRUCTURAL chrome
   (the rail's non-clipping positioning context), never the consumer's surface.
   Fall-through attrs (class, data-testid, aria-*, the container styles every
   gate + consumer targets via `.glass-dock[...]`) belong on the `.glass-dock`
   root exactly as before the frame existed — `inheritAttrs: false` + an explicit
   `v-bind="$attrs"` on the inner dock div keep the frame byte-transparent to
   every existing selector contract. */
defineOptions({ inheritAttrs: false });

/* AZ.W-DOCK-TAXONOMY (arm a) — the prop contract is ONE shape (DockProps, in
   useDockShellProps). The `variant` discriminant is gone: there is no
   `variant="rail" | "instrument-strip"` second-way to express "vertical" — that is
   `orientation="vertical"` alone — and the collapse↔expand surface
   (`collapseDelay`/`startCollapsed`/`layout`) applies on BOTH orientations (a
   vertical dock morphs its `height`, a horizontal dock its `width`; the single
   opt-out is `alwaysExpanded`, default false). Defaults are applied at each read
   site in `useDockShellProps` via `?? default`. */
const props = defineProps<DockProps>();

/* BD.W-DOCK-CORE (A12) — the draggable-items reorder emit (additive; fires only on a
   committed pull when `:draggable-items` is armed). The consumer wires it to its own
   item-order model — the single source of truth (the DOM move is the VISUAL commit). */
const emit = defineEmits<{ "update:order": [from: number, to: number] }>();

/* The resolved shell-prop computeds — shape/orientation/density, the collapse
   surface (`collapseDelay`/`startCollapsed`/`layoutValue`), the scroll-overflow
   class, `alwaysExpanded`/`fitContent`, and the container-query `containerStyle`.
   (See useDockShellProps for the full `containerName` always-expanded-only
   rationale — AY.W-DOCK2 §F1.) */
const {
    containerStyle,
    collapseDelay,
    startCollapsed,
    layoutValue,
    shape,
    orientation,
    density,
    scrollClass,
    alwaysExpanded,
    fitContent,
} = useDockShellProps(props);
const layout = layoutValue;

const dockEl = useTemplateRef<HTMLElement>("dockEl");
const layersEl = useTemplateRef<HTMLElement>("layersEl");

/* AZ.W-ADAPTIVE-AUTO Arm 2 (H3 arm a) — wire the sampled-luminance observer ON for
   the dock by default. It writes `--glass-backdrop-luma` + derives the
   `--glass-backdrop: light|dark` bucket on the dock root, DYNAMICALLY tracking the
   painted backdrop (a live aurora bleed) the static bucket is too coarse for. The
   Arm-1 self-engage + the declarative bucket stay the FLOOR — this REFINES. Opt out
   with `:auto-luminance="false"`. */
if (props.autoLuminance !== false) {
    useGlassBackdropLuminance(dockEl, {
        backgroundCanvas: props.backgroundCanvas ?? null,
    });
}

const isTransitioning = ref(false);
const touchGate = useTouchGate(collapseDelay.value);
const dockId = `glass-dock-${useId()}`;

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

/* AZ.W-RAIL-EXTEND (R4-1) — the `#rail` chrome PERSISTENCE shell.
   The `.glass-dock` root carries `contain: paint` + `backdrop-filter` + (on a
   vertical always-expanded rail) `overflow-y: auto` — ALL THREE hard-clip every
   descendant to the dock's border box, so an absolutely-positioned `#rail` slot
   rendered as a dock CHILD can NEVER paint beyond the edge (it gets swallowed at the
   bottom — the R4-1 "black blob clipped at the dock edge"). The only correct escape
   is to render the rail as a SIBLING of `.glass-dock`, anchored to a thin
   non-clipping positioning wrapper (`.glass-dock-frame`). The wrapper is present
   ONLY when a `#rail` is authored, so a dock with no rail is byte-identical to
   before (no extra DOM). When wrapped, the dock's flow/position-mode lives on the
   shell (the dock shrink-wraps inside it); the `.glass-dock` keeps its own
   fixed/sticky behaviour for the no-rail path. Rail consumers are inline vertical
   docks (SidebarDock, the dock/rail story), so the shell stays `inline-flex`/inline
   flow. */
const slots = useSlots();
const hasRail = computed(() => !!slots.rail);

/* BC.W-DOCK-STACK-RAIL — the `#rail` slot is a `position:absolute` sibling of
   `.glass-dock` anchored to the non-clipping `.glass-dock-frame` escape. The macOS
   hover-expand stack (`<DockStack>`) seats at the dock EDGE (its own `position`
   start/end), extending into its gutter — NOT a measured `<DockSeparator anchor>`
   divider seam. The divider-carousel's `measureSeam()` seam-locator (+ the
   `--dock-rail-seam-offset` write) is RETIRED with the chip-strip — the stack needs no
   layout read; its geometry is the kept frame escape + the `--dock-rail-extend-length`
   gutter reach (stack-rail.css). `frameEl` stays as the slot's positioning anchor. */
const frameEl = useTemplateRef<HTMLElement>("frameEl");

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
/* AZ.W-DOCK-TAXONOMY (move 2) — the outer collapse pair morphs the LAYOUT axis,
   not a hardcoded inline axis. A horizontal dock morphs `width`; a vertical dock
   morphs `height` (`dockMorphContext.dimOf` already maps the axis). This is the
   wiring that lets a collapsible vertical dock shrink — the machinery the old
   `variant="rail"` force-pin denied. */
const outerLayerAxis = computed<"horizontal" | "vertical">(() => orientation.value);
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

/* BD.W-DOCK-CORE (the width-seizure cure) — measure the two convex-blend endpoints
   ONCE per content change (a ResizeObserver on `.dock-layers`), writing
   `--dock-expanded-px`/`--dock-collapsed-px` on the dock root. The visible size is a
   ratio-FREE blend of those two stable endpoints off `--dock-morph-t` (shape.css),
   so the prior unbounded `from/to` per-swap ratio (the ~2451px `scaleX(56)`
   detonation) is gone by construction. The collapsed endpoint falls back to the
   resolved `--dock-morph-min` icon-square floor (the summary box is a pane INSIDE
   `.dock-layers`, so no separate ref is needed); the expanded endpoint is floored at
   `max(measured, collapsed)` — the freshness guard against a 0-measurement. */
useDockExpandedSize({
    rootEl: dockEl,
    contentEl: layersEl,
    axis: outerLayerAxis,
    expanded: visualExpanded,
});

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

/* The morph-WINDOW timing family — the `isTransitioning` flag lifecycle (the
   morph generation, the spring-settle fallback timer, and the resize-morph
   `transitionend` resolver). Owns its own unmount cleanup. */
const { markTransitioning, onDockTransitionDone } = useDockMorphWindow(
    dockEl,
    isTransitioning,
);

/* R5-TAP (R5-3) — the CLICK-INTEGRITY guard. Scopes the collapsed-tap / hover-
   approach pass-through to the TAPPED ELEMENT'S IDENTITY (captured at pointerdown)
   so a mid-morph layer swap can never activate a DIFFERENT control under the
   stationary pointer (the deck's Home-under-gear-tap + gear-click-advances-slide
   defects). The handlers ride the dock root in the CAPTURE phase; `markExpandFlip`
   opens the morph-settle window on every collapsed→expanded flip. This retires the
   consumer-side interim guards (slides' `@touchend.prevent` + 320ms capture-phase
   click guard) — the `expanded` ref STAYS exposed (a protected binary-consumer
   surface), the consumer just no longer needs a guard keyed off it. */
const { onPointerDownCapture, onClickCapture, markExpandFlip } = useDockClickIntegrity({
    rootEl: dockEl,
    visualExpanded,
});

onMounted(() => {
    if (props.alwaysExpanded || !startCollapsed.value) {
        expand();
    }
});

/* AZ.W-DOCK-TAXONOMY — the touch gate (tap-to-expand on a collapsed floating pill)
   applies to ANY collapsible dock, not just the horizontal one. A vertical dock now
   collapses too, so the gate must distinguish a tap from a vertical scroll on its
   pill as well. */
function shouldGateTouch(): boolean {
    return !alwaysExpanded.value;
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
    if (isExpanded) {
        // R5-TAP (R5-3) — a collapsed→expanded flip (tap-to-expand or hover/focus
        // approach) opens the morph-settle window; a click that races the FLIP and
        // lands on a swapped-in control is swallowed by the integrity guard.
        markExpandFlip();
    } else {
        touchGate.deactivate();
    }
});

/* BD.W-DOCK-CORE (A13 / II.2) — the fission split facility. Armed ONLY when
   `:splittable` (additive default-off → byte-identical to HEAD otherwise). The fission
   spring rides the SAME re-tuned WEIGHTY `DOCK_SPRING` register (no second clock), BESIDE
   the morph engine. */
const splitSignature = shallowRef(
    DOCK_SPLIT_SIGNATURES[props.splitContext ?? "nav"],
);
watch(
    () => props.splitContext,
    (ctx) => {
        splitSignature.value = DOCK_SPLIT_SIGNATURES[ctx ?? "nav"];
    },
);

/* BD.W-DOCK-CORE (II.2 — F-1) — the placement the detached pieces fly to form the
   sibling island dock (beside/above/below). A Ref the fission reads as the ONE coherent
   travel vector for the whole cluster (NOT per-piece radial scatter). */
const splitPlacement = shallowRef<DockSplitPlacement>(
    props.splitPlacement ?? "beside",
);
watch(
    () => props.splitPlacement,
    (p) => {
        splitPlacement.value = p ?? "beside";
    },
);

/* BD.W-DOCK-CORE (II.2 — F-1) — the fission scalars (`--dock-split-t`/`--island-*`/
   `--seam-tension`) + the `[data-fissioning]`/`[data-fissioned]` state hooks are written on
   the `.glass-dock-frame` (NOT the `.glass-dock` root) so BOTH the pieces INSIDE the dock
   AND the sibling island/neck bridge (a frame child, outside the dock's `contain: paint`)
   inherit the cascading scalars from their common ancestor. The frame is the fission scope. */
const fission = props.splittable
    ? useDockFission({
          rootEl: frameEl,
          signature: splitSignature,
          placement: splitPlacement,
      })
    : null;

/* BD.W-DOCK-CORE (II.2 — F-1) — the live fissioned flag the template reads to render the
   sibling island plate + the goo neck. */
const isFissioned = fission ? fission.fissioned : computed(() => false);

/* Auto-register every child marked `data-dock-splittable` as a fission PIECE. The
   detach vector is the child's FLIP-measured center relative to the dock center — a
   radial bloom for `search`, a lateral peel for `media`, the inward (negative-radial)
   merge for `nav` (the placement reads the vector). The vector is a GETTER so a live
   re-measure re-resolves per read (the dock geometry can shift on density/orientation). */
const pieceHandles: DockFissionPieceHandle[] = [];

function dockCenter(): { x: number; y: number } {
    const el = dockEl.value;
    if (!el) return { x: 0, y: 0 };
    const r = el.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}

function registerSplittablePieces(): void {
    const root = dockEl.value;
    if (!root || !fission) return;
    // Clear any prior registration (a re-register after a layout shift).
    for (const h of pieceHandles.splice(0)) h.release();
    const marked = Array.from(
        root.querySelectorAll<HTMLElement>("[data-dock-splittable]"),
    );
    const ctx = props.splitContext ?? "nav";
    marked.forEach((el, rank) => {
        el.classList.add("dock-fission-piece");
        const handle = fission.registerPiece({
            el: ref(el),
            rank,
            vector: () => {
                const c = dockCenter();
                const r = el.getBoundingClientRect();
                const ex = r.left + r.width / 2;
                const ey = r.top + r.height / 2;
                let dx = ex - c.x;
                let dy = ey - c.y;
                // Normalize to a unit-ish vector (the orchestrator scales by --piece-reach).
                const mag = Math.hypot(dx, dy) || 1;
                dx /= mag;
                dy /= mag;
                // nav = INWARD merge: the negative radial (pieces fold toward center).
                if (ctx === "nav") {
                    dx = -dx;
                    dy = -dy;
                }
                // media = LATERAL peel: bias to the cross (inline) axis.
                if (ctx === "media") dy *= 0.25;
                return { dx, dy };
            },
        });
        pieceHandles.push(handle);
    });
}

if (fission) {
    onMounted(() => {
        nextTick(registerSplittablePieces);
    });
    onBeforeUnmount(() => {
        for (const h of pieceHandles.splice(0)) h.release();
    });
}

/* BD.W-DOCK-CORE (A12) — the draggable-ITEMS axis. Armed ONLY when `:draggable-items`;
   a non-draggable dock mints ZERO gesture (the `enabled()` gate keeps the listener off).
   WIRES the shipped `useDragMorph` (follow + tanh squish + fling-to-nearest) — no second
   drag engine. The grab decorates the dock root `.glass-drag-grabbable` so the cursor
   reads grabbable; the grabbed item carries `.glass-drag-lift` during the gesture. */
const itemDrag = useDockItemDrag({
    rootEl: dockEl,
    enabled: () => props.draggableItems === true,
    axis: () => (orientation.value === "vertical" ? "y" : "x"),
    onReorder: (from, to) => emit("update:order", from, to),
});
const itemsDragging = itemDrag.dragging;

function onDockPointerMove(event: PointerEvent): void {
    fission?.onPointerMove(event);
    // BD.W-DOCK-CORE (A12 / II.3) — the drag IS the split gesture. While a pointer is
    // held down on a split-eligible control, a pull PAST the threshold COMMITS the
    // fission (morph-more-on-move: the seam-tension feed above already stretches the necks
    // as the pull accelerates). Compositor-only (the fission translates via transform).
    if (dragOrigin) {
        const dx = event.clientX - dragOrigin.x;
        const dy = event.clientY - dragOrigin.y;
        if (Math.hypot(dx, dy) > DRAG_SPLIT_THRESHOLD_PX && fission && !fission.fissioned.value) {
            split();
        }
    }
}

/* BD.W-DOCK-CORE (A12) — the drag-to-split pointer state. A pointerdown on a
   `[data-dock-splittable]` control arms the drag origin; a pull past the threshold (in
   onDockPointerMove) commits the fission; pointerup disarms. The keyboard path
   (Enter/Space on a split-eligible control) is the consumer's `toggleSplit()` call. */
const DRAG_SPLIT_THRESHOLD_PX = 36;
let dragOrigin: { x: number; y: number } | null = null;

function onDockPointerDown(event: PointerEvent): void {
    if (!fission) return;
    const target = event.target as HTMLElement | null;
    if (target?.closest("[data-dock-splittable]")) {
        dragOrigin = { x: event.clientX, y: event.clientY };
    }
}
function onDockPointerUp(): void {
    dragOrigin = null;
}

/** Imperative split/merge/toggle — re-measure pieces, then run the fission spring. */
function split(): void {
    if (!fission) return;
    registerSplittablePieces();
    fission.split();
}
function merge(): void {
    fission?.merge();
}
function toggleSplit(): void {
    if (!fission) return;
    registerSplittablePieces();
    fission.toggle();
}

defineExpose({
    expanded,
    isPinned,
    isHeld,
    isTransitioning,
    expand,
    collapse,
    keepOpen,
    release,
    /* BD.W-DOCK-CORE (A13) — the fission control surface (no-ops on a non-splittable dock). */
    split,
    merge,
    toggleSplit,
    fissioned: fission ? fission.fissioned : computed(() => false),
});
</script>

<template>
    <div
        ref="frameEl"
        class="glass-dock-frame"
        :class="orientation"
        :data-has-rail="hasRail || undefined"
        :data-splittable="splittable || undefined"
        :data-fissioned="isFissioned || undefined"
    >
<!--
        AZ.W-RAIL-EXTEND (R4-1) — the dock is ALWAYS wrapped in a thin shell, but the
        shell is `display: contents` (layout-transparent, byte-identical) UNTIL a
        `#rail` is authored, at which point it becomes a NON-clipping positioning
        context (`data-has-rail`). The `<DockRail>` then renders as a SIBLING of
        `.glass-dock` (NOT a descendant), anchored to this shell, so it escapes the
        dock's `contain: paint` + `backdrop-filter` + `overflow` clip and its hairline
        VISIBLY overruns the dock edge (the R4-1 fix — a dock CHILD can never paint past
        the containment box, the cause of the clipped "black blob"). The dock's own
        position-mode (`fixed`/`sticky`/`inline`) stays on `.glass-dock`; the
        `display:contents` shell does not interpose a box on the no-rail path. Rail
        consumers are inline vertical docks (SidebarDock, the dock/rail story).
    -->

    <div
        ref="dockEl"
        v-bind="$attrs"
        class="glass-dock"
        :class="[
            orientation,
            `shape-${shape}`,
            `layout-${layout}`,
            scrollClass,
            { expanded: visualExpanded, collapsed: !visualExpanded, pinned: isPinned, 'fit-content': fitContent, 'always-expanded': alwaysExpanded, 'dock-overflow-wrap': overflow === 'wrap' && orientation !== 'vertical' },
            { 'glass-drag-grabbable': draggableItems && !itemsDragging, 'dock-items-draggable': draggableItems },
            position === 'fixed' ? 'fixed bottom-(--dock-pos) left-1/2 -translate-x-1/2'
              : position === 'sticky' ? 'dock-sticky'
              : 'dock-inline',
        ]"
        :data-density="density"
        :data-held="isHeld || undefined"
        :data-search="search || undefined"
        :data-container-name="containerName || undefined"
        :style="[containerStyle, rootVtStyle]"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave($event)"
        @focusin="onFocusIn"
        @focusout="onFocusOut"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
        @pointerdown.capture="onPointerDownCapture"
        @click.capture="onClickCapture"
        @pointermove="splittable ? onDockPointerMove($event) : undefined"
        @pointerdown="splittable ? onDockPointerDown($event) : undefined"
        @pointerup="splittable ? onDockPointerUp() : undefined"
        @pointercancel="splittable ? onDockPointerUp() : undefined"
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
        <!--
            BD.W-DOCK-PUNCH-CHANNEL — the kinetic cartoon CAST caster. An inert
            aria-hidden child (NOT a pseudo — the dock's `::before`/`::after` are both
            occupied by the grain + the morph chrome) carrying the SHIPPED
            `--shadow-cartoon-md/lg` rung that SLIDES opposite the morph as the box
            punches (shape.css `.glass-dock > .cartoon-cast`). Paint-only, behind the
            plate, PRM-static. Always rendered (the rest cast is the bold offset ink the
            plate floats above).
        -->
        <span class="cartoon-cast" aria-hidden="true"></span>

        <div v-if="$slots.persistent" class="dock-persistent">
            <slot name="persistent" />
        </div>

        <!--
            AZ.W-DOCK-TAXONOMY (move 2) — the built-in two-layer morph pattern (full +
            collapsed summary) is now ORIENTATION-AGNOSTIC. Both orientations stack
            the full/summary panes on a 1/1 CSS grid and crossfade with the
            FLIP-driven aperture morph: a horizontal dock morphs `width`, a vertical
            dock morphs `height` (the morph orchestrator keys its axis off the
            resolved `orientation` via `outerLayerAxis`). The prior split — a
            horizontal full/summary FLIP pair vs. a static vertical single-body —
            denied the vertical dock the collapse/shrink machinery; unifying the
            structure gives a collapsible vertical dock the height morph the
            mandate names. An `always-expanded` dock renders the `full` pane in-flow
            and the `summary` pane out-of-flow (no morph fires), so a vertical nav
            column that opts out of collapse reads exactly as before.
        -->
        <div
            ref="layersEl"
            class="dock-layers"
            @transitionend="onLayersTransitionEnd"
        >
            <!-- BC.W-DOCK-VERTICAL-FIX — `inert` reads `visualExpanded`, the SAME
                 signal the `is-active` class reads (NOT the raw `expanded`). The bug:
                 an `alwaysExpanded`/mid-flip vertical dock has `visualExpanded` true
                 (pane painted active) yet `expanded` false → the pane was `:inert`
                 (every control non-interactive) while VISIBLE — a painted-but-dead
                 column (glass-dock-codebase.md §2.3). Keying both off `visualExpanded`
                 means paint + interactivity read ONE source and can never disagree:
                 a control is interactive IFF its pane is painted active. -->
            <div
                :class="['dock-layer dock-layer--full', { 'is-active': visualExpanded }]"
                :inert="!visualExpanded || undefined"
            >
                <slot />
            </div>
            <div
                :class="['dock-layer dock-layer--summary', { 'is-active': !visualExpanded }]"
                :inert="visualExpanded || undefined"
                @click="onClickCollapsed"
            >
                <slot name="collapsed" />
            </div>

            <!--
                BC.W-DOCK-SEARCH — the dock-as-native-dynamic-search-bar field region.
                Rendered ONLY when `search` is set (additive default-false → byte-
                identical to HEAD otherwise). It seats INSIDE the `.dock-layers` morph
                aperture so the pill→field reveal rides the dock's OWN `--dock-morph-t`
                glide (the box shrink-wraps; NO second engine, NO dockMorphContext edit).
                The consumer composes `useDockSearch` and slots its search field + the
                fuzzy dropdown here; the `.dock-search-field` surface reads the W55 tint
                seam (dock/search.css) so the active field reads ≥4.5:1 over the backdrop
                (the no-pale-fade legibility floor).
            -->
            <div v-if="search" class="dock-search-field">
                <slot name="search" />
            </div>
        </div>

    </div>

    <!-- BD.W-DOCK-CORE (A13 / II.2 — F-1, THE HEADLINE ASSEMBLY) — the fission BRIDGE,
         rendered as a SIBLING of `.glass-dock` inside the non-clipping `.glass-dock-frame`
         (the SAME escape the rail uses) so the detached ISLAND + the goo NECK paint
         OUTSIDE the dock's `contain: paint` clip box — beside/above/below the source pill.
         The prior build rendered the bridge INSIDE `.glass-dock`, so the island could never
         leave the dock box (the empty-bridge / nothing-detaches F-1 defect). It carries the
         goo NECK (a stretching gel filament from the source edge to the island) + the
         sibling ISLAND plate (the SECOND dock the pieces fly into) + the ripple/merge-
         splash jubilance (`::before`/`::after`). The SHIPPED ONE `<GooFilter>` mount supplies the
         goo `<filter>` the bridge applies via the REGULAR `filter` property (Safari). -->
    <div
        v-if="splittable"
        class="dock-fission-bridge"
        :class="[orientation, `place-${splitPlacement ?? 'beside'}`]"
        :aria-hidden="!isFissioned || undefined"
    >
        <div class="dock-fission-neck" aria-hidden="true" />
        <!-- The SECOND DOCK plate. When the consumer authors a `#split` slot, the detached
             controls render HERE (the island IS their new dock — the source pill's marked
             pieces fade/retract as these arrive, so the content visibly MIGRATES from the
             source pill into the sibling island). The slot is interactive only while
             fissioned (inert otherwise); a bare island (no slot) is a pure visual plate. -->
        <div class="dock-fission-island" :inert="!isFissioned || undefined">
            <slot name="split" :fissioned="isFissioned" />
        </div>
    </div>

    <!--
        AZ.W-RAIL-EXTEND (R4-1) — the `#rail` CHROME slot, rendered as a SIBLING of
        `.glass-dock` inside the `.glass-dock-frame` (NOT a dock descendant). The
        `.dock-hairline-slot` is `position: absolute` relative to the shell, so the
        dock's `contain: paint` + `backdrop-filter` + `overflow` clip never reaches it
        and the `<DockRail>` hairline VISIBLY overruns the dock edge + its context
        end-icon PERSISTS when the dock collapses (G2 — the persistence the in-pane
        switcher rail lacks; the R4-1 escape the dock-child render could not achieve).
    -->
    <div v-if="hasRail" class="dock-hairline-slot" :class="orientation">
        <slot name="rail" />
    </div>
    </div>
</template>
