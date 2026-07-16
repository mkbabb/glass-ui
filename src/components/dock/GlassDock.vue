<script setup lang="ts">
// The shell-prop derivation (variant/shape/orientation/density/collapse surface +
// the container-query style + the discriminated-union prop types) lives in
// ./composables/useDockShellProps; the `isTransitioning` flag resolves from the
// morph orchestrator's OWN spring settle (`morphing`) —
// BG.NF.1 W-FALLBACK-EXCISE excised the CSS-transition-era wrong-clock settle timer +
// dead `@transitionend` resolver (useDockMorphWindow). The collapsed-pill touch-gate
// lives in ./composables/useDockTouchGate. This SFC composes the dual-layer grid, the
// axis-aware expand/collapse transition, and the pointer/focus hold machinery.
// BI.W-DOCK-RETIRES — the fission split facility is DEFINITION-ABSENT (decided-terminal;
// clean break, no alias — demo-only spectacle + the prime UF-C3 Safari suspect).
import { computed, ref, useId, useTemplateRef, watch } from "vue";
// AZ.W-ADAPTIVE-AUTO Arm 2 (H3 arm a) — the sampled-luminance observer is wired ON by
// DEFAULT for the dock (the surface the user reported unreadable over light, and the
// one most often over a live/bright backdrop). It REFINES the W55 declarative bucket +
// the Arm-1 self-engage (both stay the floor); a dark-substrate consumer opts out via
// `--glass-tint-strength: 0%` on the dock or `:auto-luminance="false"`. Imported
// directly (NOT via the glass barrel) — the composable is demo-private (path B): the
// dock is the binary consumer #1, the public barrel seat awaits a 2nd binary consumer
// (docs/consumer-evidence/use-glass-backdrop-luminance.md names the booked trigger).
import { useGlassBackdropLuminance } from "../../composables/glass/useGlassBackdropLuminance";
import { provideDockContext } from "./composables/dockContext";
import { useDockState } from "./composables/useDockState";
import { useDockMorphOrchestrator } from "./composables/useDockMorph";
import { useDockExpandedSize } from "./composables/dockMorphMeasure";
import { useDockShellProps, type DockProps } from "./composables/useDockShellProps";
import { useDockClickIntegrity } from "./composables/useDockClickIntegrity";
import { useDockTouchGate } from "./composables/useDockTouchGate";
// BI.W-DOCK-OVERFLOW — the fits-vs-scrollable mode signal. An RO measures the active
// full layer's inline overflow and toggles `[data-dock-overflow]` on the dock root, so
// overflow.css's native scroll track + FadingScroll mask engage ONLY when the row exceeds
// the cap (at rest the mask is `none` — T-52 a). ZERO scroll listener (RO + a light
// MutationObserver only — O5/G9).
import { useDockOverflowFit } from "./composables/useDockOverflowFit";

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
/* BG.W-GLASS-SIGNAL-TRUTH (NF.3, paint re-open) — `autoLuminance` MUST default TRUE
   via `withDefaults`, NOT via a bare optional `boolean` type. Vue's boolean-prop
   CASTING resolves an ABSENT `boolean`-typed prop (no default) to `false`, NOT
   `undefined` — so the old `props.autoLuminance !== false` guard read `false !== false`
   → the sampled-luminance observer was NEVER wired on ANY dock (0 of 12 stamped the
   writer-fired witness; the whole dock adaptive-luminance band was dead library-wide,
   not just the demo). The explicit `autoLuminance: true` default makes an unpassed dock
   default-ON (the documented H3 arm-a intent) while `:auto-luminance="false"` still opts
   out — the ONE place the boolean default resolves (the other shell defaults stay the
   `?? default` read-site pattern in useDockShellProps). */
const props = withDefaults(defineProps<DockProps>(), {
    autoLuminance: true,
    backdropMode: "live",
});

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
const fullEl = useTemplateRef<HTMLElement>("fullEl");
const summaryEl = useTemplateRef<HTMLElement>("summaryEl");

// BI.W-DOCK-OVERFLOW — the native-scroll-track mode signal (the universal floor). The RO
// toggles `[data-dock-overflow]` when the active full layer's over-cap inline content
// exceeds its clamped port, so the scroll track + FadingScroll edge mask (overflow.css)
// engage only when scrollable and the mask is honestly `none` at rest (T-52 a). The
// scrollIntoView recenter CALL lives in useSelectionGroup (W-DOCK-CONTROLS); this owns the
useDockOverflowFit(dockEl);

/* AZ.W-ADAPTIVE-AUTO Arm 2 (H3 arm a) — wire the sampled-luminance observer ON for
   the dock by default. It writes `--glass-backdrop-luma` + derives the
   `--glass-backdrop: light|dark` bucket on the dock root, DYNAMICALLY tracking the
   painted backdrop (a live aurora bleed) the static bucket is too coarse for. The
   Arm-1 self-engage + the declarative bucket stay the FLOOR — this REFINES. Opt out
   with `:auto-luminance="false"`. */
if (props.backdropMode === "live" && props.autoLuminance !== false) {
    // BG.W-GLASS-SIGNAL-TRUTH (ST3) — hand the field canvas as a REACTIVE GETTER, not
    // a by-value snapshot. `props.backgroundCanvas` is the DockStage aurora canvas,
    // which resolves POST-MOUNT (the scoped-slot `canvasRef` is null during this
    // setup). Passing the raw value captured null forever → the observer never entered
    // the live `sampleAnimated` path → the whole dock band was a DEAD observer (0 of 12
    // docks stamped the writer-fired witness). The getter re-resolves each sample, so
    // the observer picks up the field the moment it paints + writes real luma/ambient-hue.
    useGlassBackdropLuminance(dockEl, {
        backgroundCanvas: (): HTMLCanvasElement | null => {
            const bc = props.backgroundCanvas;
            return typeof bc === "function"
                ? bc()
                : bc instanceof HTMLCanvasElement
                  ? bc
                  : null;
        },
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
    initialExpanded: !startCollapsed.value,
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

/* The SPINE plate owns clipping. Portaled menu and search surfaces remain outside the
   dock's layout, while `.glass-dock` uses layout containment without paint clipping. */

/* The dock morph orchestrator owns the built-in collapsed↔expanded pair and writes
   one root scalar. Nested face swaps are independently owned by DockCrossfade. */
const outerActiveLayer = computed<string>(() =>
    visualExpanded.value ? "full" : "summary",
);
const outerLayerAxis = computed<"horizontal" | "vertical">(() => orientation.value);
const {
    outerCurrentLayer,
    outerLeavingLayer,
} = useDockMorphOrchestrator({
    rootEl: dockEl,
    outerActiveLayer,
    // BG.NF.1 W-FALLBACK-EXCISE — `isTransitioning` resolves from the morph's OWN
    // spring settle: the orchestrator notifies arm→true / settle→false (alongside the
    // single `[data-morphing]` busy signal). The CSS-transition-era wrong-clock settle
    // timer + dead `@transitionend` resolver (useDockMorphWindow) are excised — no
    // legacy timer, no plausibly-settled fallback.
    onMorphActiveChange: (active) => {
        isTransitioning.value = active;
    },
});

/* BD.W-DOCK-CORE (the width-seizure cure) — measure the two convex-blend endpoints
   ONCE per content change (`--dock-expanded-px`/`--dock-collapsed-px`); the visible
   size is a ratio-FREE blend off `--dock-morph-t` (shape.css), so the unbounded
   per-swap ratio is gone by construction. See dockMorphMeasure for the floors. */
useDockExpandedSize({
    rootEl: dockEl,
    contentEl: layersEl,
    expandedEl: fullEl,
    collapsedEl: summaryEl,
    axis: outerLayerAxis,
    expanded: visualExpanded,
});

/* AX.W01 — collapse and layer motion stay on the Dock spring. A consumer may opt a
   dock into its own shared-element route morph with a stable custom-ident; ordinary
   route transitions leave the dock in the root snapshot. Extracting every glass dock
   into an independent backdrop-filter snapshot overloaded page-wide transitions and
   produced transient unpainted frames on Dock-heavy routes. */
const rootVtStyle = computed<Record<string, string> | undefined>(() =>
    props.viewTransitionName
        ? { "view-transition-name": props.viewTransitionName }
        : undefined,
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
const {
    onPointerDownCapture,
    onPointerCancelCapture,
    onClickCapture,
    markExpandFlip,
    pressKeepaliveLayer,
} = useDockClickIntegrity({
    rootEl: dockEl,
    visualExpanded,
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

defineExpose({
    expanded,
    isPinned,
    isHeld,
    isTransitioning,
    expand,
    collapse,
    keepOpen,
    release,
});
</script>

<template>
    <div
        ref="dockEl"
        v-bind="$attrs"
        class="glass-dock"
        data-material="functional"
        :class="[
            orientation,
            `shape-${shape}`,
            `layout-${layout}`,
            scrollClass,
            { expanded: visualExpanded, collapsed: !visualExpanded, pinned: isPinned, 'fit-content': fitContent, 'always-expanded': alwaysExpanded, 'dock-overflow-wrap': overflow === 'wrap' && orientation !== 'vertical' },
            position === 'fixed' ? 'fixed bottom-(--dock-pos) inset-x-0 mx-auto w-max'
              : position === 'sticky' ? 'dock-sticky'
              : 'dock-inline',
        ]"
        :data-size="size"
        :data-backdrop-mode="props.backdropMode"
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
        @pointercancel.capture="onPointerCancelCapture"
        @click.capture="onClickCapture"
    >
        <!--
            `.glass-dock` is the single root (kept a lone root element so `$el` resolves to it
            for ref-passing consumers). Portaled menus and search surfaces do not contribute to
            its layout, and the SPINE plate owns the visual clip.
        -->
        <!--
            BI.W-DOCK-SPINE — L0 THE PLATE (the lens). One absolute, non-interactive
            (aria-hidden, decoration) element that owns backdrop-filter + the glass surface
            + rim + grain, and whose VISIBLE EXTENT morphs via clip-path off the ONE
            plate-scoped `--dock-t` (dock/dock.css). It seats at z-index:-1 within the box's
            stacking context (below the in-flow control run, above the box's drop-shadow),
            a SIBLING of the controls — never their ancestor — so a control hover plate
            overhangs the plate edge UN-CLIPPED (UF-C6/C7). The box (`.glass-dock`) is now
            structural (layout + the drop-shadow elevation); the plate is the surface.
        -->
        <div class="dock-plate" aria-hidden="true"></div>

        <!--
            BI.W-DOCK-SPINE — L1 THE CONTROLS. The normal-flow control run OVER the plate.
            `display: contents` (dock/dock.css) so it GROUPS the controls the SFC places
            WITHOUT interposing a flex context — the controls stay direct flex children of
            `.glass-dock` (the layout is byte-identical to HEAD), and NO ancestor clips them
            (`overflow: visible` both axes; the box carries no clip/contain).
        -->
        <div class="dock-controls">
        <!--
            AX.W45 D13-a — the PERSISTENT region. The `#persistent` slot is a root
            flex SIBLING of the morph-region, in-flow in BOTH collapsed AND expanded,
            NEVER `:inert`, NEVER a crossfade pane. It is the iOS Now-Playing /
            Stage-Manager idiom done STRUCTURALLY: a stable always-present rail beside
            the expand-on-demand content region, so a consumer keeps a control visible
            while collapsed WITHOUT hand-duplicating it into both the `#default` and
            `#collapsed` slots. It rides the root padding/radius morph (it inherits the
            `--dock-morph-t` chrome) but is not part of a face crossfade — it
            holds steady (no crossfade, no jitter) while the morph-region's aperture
            animates on the ONE spring. Rendered only when authored ($slots.persistent),
            so a dock with no persistent controls is byte-identical to before.
        -->
        <!--
            BG.W-GLASS-CLIP-DISCIPLINE (absorbs W-DOCK-CAST-RETIRE) — the kinetic
            `.cartoon-cast` offset-shadow child is RETIRED from the dock (the
            self-defeating maroon-halo mechanism, D3). The dock's elevation is
            carried by `--shadow-dock` + `--glass-key` (shape.css). BI.W-DOCK-SPRING-UNIFY
            (SU2) — the cartoon box-punch is RETIRED; the morph carries ONE
            deformation-free `--dock-size-scale` box morph on the `scale:` channel.
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
            <!-- BC.W-DOCK-VERTICAL-FIX — `inert` and `is-active` read the SAME
                 orchestrator layer identity (NOT the raw `expanded`). The bug:
                 an `alwaysExpanded`/mid-flip vertical dock has `visualExpanded` true
                 (pane painted active) yet `expanded` false → the pane was `:inert`
                 (every control non-interactive) while VISIBLE — a painted-but-dead
                 column (glass-dock-codebase.md §2.3). GU-4's sole exception is the
                 witnessed full-pane press retained until its click/cancel. -->
            <div
                ref="fullEl"
                :class="['dock-layer dock-layer--full', {
                    'is-active': outerCurrentLayer === 'full',
                    'is-leaving': outerLeavingLayer === 'full' || (pressKeepaliveLayer === 'full' && outerCurrentLayer !== 'full'),
                    'is-press-keepalive': pressKeepaliveLayer === 'full',
                }]"
                :inert="(outerCurrentLayer !== 'full' && pressKeepaliveLayer !== 'full') || undefined"
            >
                <slot />
            </div>
            <div
                ref="summaryEl"
                :class="['dock-layer dock-layer--summary', {
                    'is-active': outerCurrentLayer === 'summary',
                    'is-leaving': outerLeavingLayer === 'summary',
                }]"
                :inert="(outerCurrentLayer !== 'summary') || undefined"
                @click="onClickCollapsed"
            >
                <slot name="collapsed" />
            </div>

            <!--
                BC.W-DOCK-SEARCH — the dock-as-native-dynamic-search-bar field region.
                Rendered ONLY when `search` is set (additive default-false → byte-
                identical to HEAD otherwise). It seats INSIDE the `.dock-layers` morph
                aperture so the pill→field reveal rides the dock's OWN `--dock-morph-t`
                glide (the box shrink-wraps; no second engine).
                The consumer composes `useDockSearch` and slots its search field + the
                fuzzy dropdown here; the `.dock-search-field` surface reads the W55 tint
                seam (dock/search.css) so the active field reads ≥4.5:1 over the backdrop
                (the no-pale-fade legibility floor).
            -->
            <div v-if="search" class="dock-search-field">
                <slot name="search" />
            </div>
        </div>

        <!--
            BI.W-DOCK-CONTROLS (atlas M25 #persistent-end) — the TRAILING persistent
            region, the mirror of the leading `#persistent` slot. A stable, always-
            present control cluster on the TRAILING edge (the iOS trailing-utility
            group), in-flow in BOTH collapsed AND expanded, NEVER `:inert`, NEVER a
            crossfade pane — it holds steady beside the expand-on-demand content
            while the morph aperture animates on the ONE spring. Rendered only when
            authored, so a dock with no trailing persistent controls is byte-identical
            to before. The greenfield dock ships BOTH persistent slots natively.
        -->
        <div
            v-if="$slots['persistent-end']"
            class="dock-persistent dock-persistent-end"
        >
            <slot name="persistent-end" />
        </div>
        </div>
        <!-- /L1 .dock-controls (BI.W-DOCK-SPINE) -->
        <!-- BI.W-DOCK-RETIRES — the fission BRIDGE + `#split` slot are DEFINITION-ABSENT
             (the whole fission facility retired decided-terminal; clean break, no alias). -->
    </div>
</template>
