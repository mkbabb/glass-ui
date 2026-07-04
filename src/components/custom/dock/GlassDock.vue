<script setup lang="ts">
// The shell-prop derivation (variant/shape/orientation/density/collapse surface +
// the container-query style + the discriminated-union prop types) lives in
// ./composables/useDockShellProps; the `isTransitioning` flag resolves from the
// morph orchestrator's OWN spring settle (`morphing`, dockMorphContext) —
// BG.NF.1 W-FALLBACK-EXCISE excised the CSS-transition-era wrong-clock settle timer +
// dead `@transitionend` resolver (useDockMorphWindow). The collapsed-pill touch-gate
// lives in ./composables/useDockTouchGate; the fission split-facility wiring lives in
// ./composables/useDockFissionWiring (BG.W-DOCK-DECOMPOSE — the F6.5
// one-writer-per-concern carve). This SFC composes the dual-layer grid, the
// axis-aware expand/collapse transition, and the pointer/focus hold machinery.
import { computed, onMounted, ref, useId, useSlots, useTemplateRef, watch } from "vue";
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
import { useDockClickIntegrity } from "./composables/useDockClickIntegrity";
import { useDockItemDrag } from "./composables/useDockItemDrag";
import { useDockTouchGate } from "./composables/useDockTouchGate";
import { useDockFissionWiring } from "./composables/useDockFissionWiring";

/* AZ R4-RAIL attrs contract — the `.glass-dock-frame` shell is STRUCTURAL chrome
   (the rail's non-clipping positioning context), never the consumer's surface.
   Fall-through attrs (class, data-testid, aria-*, the container styles every
   gate + consumer targets via `.glass-dock[...]`) belong on the `.glass-dock`
   root exactly as before the frame existed — `inheritAttrs: false` + an explicit
   `v-bind="$attrs"` on the inner dock div keep the frame byte-transparent to
   every existing selector contract. */
defineOptions({ inheritAttrs: false });

/* AZ.W-DOCK-TAXONOMY (arm a) — the prop contract is ONE shape (DockProps, in
   useDockShellProps): no `variant` discriminant, "vertical" is `orientation="vertical"`
   alone, and collapse↔expand applies on BOTH orientations (single opt-out
   `alwaysExpanded`). Defaults resolve at each read site via `?? default`. */
const props = defineProps<DockProps>();

/* BD.W-DOCK-CORE (A12) — the draggable-items reorder emit (additive; fires only on a
   committed pull when `:draggable-items` is armed). The consumer wires it to its own
   item-order model — the single source of truth (the DOM move is the VISUAL commit). */
const emit = defineEmits<{ "update:order": [from: number, to: number] }>();

/* The resolved shell-prop computeds — shape/orientation/density, the collapse
   surface (`collapseDelay`/`startCollapsed`/`layoutValue`), the intrinsic
   scroll-overflow class (BG.W-DOCK-CAP-SCROLL-FADE — `scrollClass` is
   `dock-scroll-x` on EVERY horizontal dock and `null` on vertical, whose
   block-axis scroll folds into the unconditional cap-derived shell.css rule; the
   `overflow="scroll"` opt-in is retired), `alwaysExpanded`/`fitContent`, and the
   container-query `containerStyle`. (See useDockShellProps for the full
   `containerName` always-expanded-only rationale — AY.W-DOCK2 §F1.) */
const {
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

/* AZ.W-RAIL-EXTEND (R4-1) — the `#rail` chrome PERSISTENCE shell. The dock's
   `contain: paint`/`backdrop-filter`/overflow clip swallows a dock-CHILD rail, so the
   rail renders as a `.glass-dock` SIBLING anchored to the non-clipping
   `.glass-dock-frame` wrapper (present ONLY when a `#rail` is authored → no-rail docks
   are byte-identical). See the CLAUDE.md dock-rail section for the full clip rationale. */
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
/* AX.W01 redress (KEPT) — the OUTER collapse is a CLIP-APERTURE morph: both panes
   grid-stack behind the root clip, `.dock-layers` shrink-wraps the ACTIVE pane, and
   the orchestrator pins at `from` then measures `to` one rAF post-flush; size/pad/
   radius/color/stagger co-morph off the one `--dock-morph-t` scalar. A nested
   `<DockLayerGroup>` registers as a SECOND target on the SAME spring. (dockMorphContext) */
const { context: dockMorphContext } = useDockMorphOrchestrator({
    rootEl: dockEl,
    outerEl: layersEl,
    outerActiveLayer,
    outerAxis: outerLayerAxis,
    // BG.NF.1 W-FALLBACK-EXCISE — `isTransitioning` resolves from the morph's OWN
    // spring settle: the orchestrator notifies arm→true / settle→false (alongside the
    // single `[data-morphing]` busy signal). The CSS-transition-era wrong-clock settle
    // timer + dead `@transitionend` resolver (useDockMorphWindow) are excised — no
    // legacy timer, no plausibly-settled fallback.
    onMorphActiveChange: (active) => {
        isTransitioning.value = active;
    },
});

/* AX.W02 — PROVIDE the single morph orchestrator through the optional DI seam: a
   nested `<DockLayerGroup>` injects it + defers its pane-swap (no second spring); one
   rendered outside any `<GlassDock>` reads `null` + self-orchestrates (standalone demo). */
provideDockMorphContext(dockMorphContext);

/* BD.W-DOCK-CORE (the width-seizure cure) — measure the two convex-blend endpoints
   ONCE per content change (`--dock-expanded-px`/`--dock-collapsed-px`); the visible
   size is a ratio-FREE blend off `--dock-morph-t` (shape.css), so the unbounded
   per-swap ratio is gone by construction. See dockMorphMeasure for the floors. */
useDockExpandedSize({
    rootEl: dockEl,
    contentEl: layersEl,
    axis: outerLayerAxis,
    expanded: visualExpanded,
});

/* AX.W01 — the route-morph `view-transition-name` seam (PRESERVED). The dock COLLAPSE
   VT fork is RETIRED; the per-instance `glass-dock-${useId()}` NAMED-ELEMENT seam is
   KEPT on the dock ROOT for the consumer's PAGE/route geometry-morph (app-scoped so
   co-mounted docks never collide; `proof:vt-names` polices the `useId()` mint). The
   route-morph is engine-gated by the consumer's own `startViewTransition`. */
const rootVtStyle = computed<Record<string, string>>(() => ({
    "view-transition-name": dockId.replace(/[^a-zA-Z0-9_-]/g, "-"),
}));

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

/* BG.W-DOCK-DECOMPOSE — the collapsed-pill tap-to-expand touch gate (shape B′). The
   gate owns its own `useTouchGate` + the tap/scroll discrimination + the
   collapse-on-deactivate watch; the SFC only binds the handlers + reaches
   `deactivate()` on a collapse flip. */
const { onTouchStart, onTouchMove, onTouchEnd, deactivate: touchDeactivate } =
    useDockTouchGate({
        collapseDelay: collapseDelay.value,
        rootEl: dockEl,
        alwaysExpanded,
        visualExpanded,
        expanded,
        isPinned,
        expand,
        collapse,
    });

watch(visualExpanded, (isExpanded) => {
    if (isExpanded) {
        // R5-TAP (R5-3) — a collapsed→expanded flip (tap-to-expand or hover/focus
        // approach) marks the click-integrity window; a click that races the FLIP and
        // lands on a swapped-in control is swallowed by the integrity guard.
        // (`isTransitioning` is owned by the `dockMorphing` spring-settle watch above.)
        markExpandFlip();
    } else {
        touchDeactivate();
    }
});

/* BG.W-DOCK-DECOMPOSE — the fission split facility (A13 / II.2). Armed ONLY when
   `:splittable` (additive default-off → byte-identical to HEAD otherwise). The
   split-signature/placement refs, the piece auto-registration + detach vectors, the
   drag-to-split pointer state, and the imperative split/merge/toggle surface all live
   in the wiring leaf — a CONSUMING seam BESIDE the morph engine (box-INVIOLATE; it
   never writes `--dock-morph-t`, only the fission's own `--dock-split-t` cohort). */
const {
    fissioned: isFissioned,
    onDockPointerMove,
    onDockPointerDown,
    onDockPointerUp,
    split,
    merge,
    toggleSplit,
} = useDockFissionWiring({
    rootEl: dockEl,
    frameEl,
    splittable: props.splittable === true,
    splitContext: () => props.splitContext,
    splitPlacement: () => props.splitPlacement,
});

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
    fissioned: isFissioned,
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
        :data-size="size"
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
            BG.W-GLASS-CLIP-DISCIPLINE (absorbs W-DOCK-CAST-RETIRE) — the kinetic
            `.cartoon-cast` offset-shadow child is RETIRED from the dock (the
            self-defeating maroon-halo mechanism, D3). The dock's elevation is
            carried by `--shadow-dock` + `--glass-key` (shape.css). The box PUNCH
            keeps its `--dock-punch-stretch` squash on the `scale:` channel.
        -->
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
        <div ref="layersEl" class="dock-layers">
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
