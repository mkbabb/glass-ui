<script setup lang="ts">
// The shell-prop derivation (variant/shape/orientation/density/collapse surface +
// the container-query style + the discriminated-union prop types) lives in
// ./composables/useDockShellProps; the `isTransitioning` flag resolves from the
// morph orchestrator's OWN spring settle (`morphing`) —
// excised the CSS-transition-era wrong-clock settle timer +
// dead `@transitionend` resolver (useDockMorphWindow). The collapsed-pill touch-gate
// lives in ./composables/useDockTouchGate. This SFC composes the dual-layer grid, the
// axis-aware expand/collapse transition, and the pointer/focus hold machinery.
// The fission split facility is DEFINITION-ABSENT (decided-terminal;
// clean break, no alias — demo-only spectacle + the prime Safari suspect).
import { computed, nextTick, ref, useId, useTemplateRef, watch } from "vue";
// The sampled-luminance observer is wired ON for every
// `backdropMode: "live"` dock (the surface the user reported unreadable over light, and the
// one most often over a live/bright backdrop). It REFINES the declarative bucket +
// the Arm-1 self-engage (both stay the floor); a dark-substrate consumer opts out via
// `--glass-level: 0` on the dock or `backdropMode: "static"`. Imported
// directly (NOT via the glass barrel) — the composable is demo-private (path B): the
// dock is the binary consumer #1, the public barrel seat awaits a 2nd binary consumer
// (docs/consumer-evidence/use-glass-backdrop-luminance.md names the booked trigger).
import { FOCUSABLE_SELECTOR } from "../_shared/focus";
import { useGlassBackdropLuminance } from "../../composables/glass/useGlassBackdropLuminance";
import { OPEN_DISMISSABLE_LAYER_SELECTOR } from "./constants";
import { provideDockContext } from "./composables/dockContext";
import { useDockState } from "./composables/useDockState";
import { useDockMorphOrchestrator } from "./composables/useDockMorph";
import { useDockExpandedSize } from "./composables/dockMorphMeasure";
import { useDockShellProps, type DockProps } from "./composables/useDockShellProps";
import { useDockClickIntegrity } from "./composables/useDockClickIntegrity";
import { useDockTouchGate } from "./composables/useDockTouchGate";
// The fits-vs-scrollable mode signal. An RO measures the active
// full layer's inline overflow and toggles `[data-dock-overflow]` on the dock root, so
// overflow.css's native scroll track + FadingScroll mask engage ONLY when the row exceeds
// the cap (at rest the mask is `none` — T-52 a). ZERO scroll listener (RO + a light
// MutationObserver only — O5/G9).
import { useDockOverflowFit } from "./composables/useDockOverflowFit";

/* The attrs contract. Fall-through attrs (class, data-testid, aria-*, the container
   styles every gate + consumer targets via `.glass-dock[...]`) belong on the
   `.glass-dock` root: `inheritAttrs: false` + an explicit `v-bind="$attrs"` on the dock
   div is what puts them there.

   ~~the `.glass-dock-frame` shell is STRUCTURAL chrome (the switcher's non-clipping
   positioning context), never the consumer's surface … keep the frame byte-transparent
   to every existing selector contract~~ — [2026-08-10 · BK #47 W1] the frame this
   paragraph is about NO LONGER EXISTS. `styles/dock.css:206` retired the
   `.glass-dock-frame` `display:contents` frame-escape when the fan/menu/search surfaces
   became top-layer popovers, and the detector agrees: `grep -rn "glass-dock-frame" src
   demo tests` → 2 hits this seat, BOTH prose (this comment and the dock.css line that
   retired it), zero CSS rules and zero rendered elements. `inheritAttrs: false` is
   therefore load-bearing on its own terms — the single `.glass-dock` root — and not,
   as written here, a device for keeping a wrapper transparent. */
defineOptions({ inheritAttrs: false });

/* The prop contract is ONE shape (DockProps, in useDockShellProps): SIX members, no
   `variant` discriminant, "vertical" is `orientation="vertical"` alone, and
   collapse↔expand applies on BOTH orientations off the one `collapse` member.
   Defaults resolve at each read site via `?? default`.

   [2026-08-10 · BK #47 W1 CURE] `collapse` MUST state its default HERE, not only at
   the `?? "closed"` read site. `DockCollapse` is `false | "closed" | "open"`, so the
   macro compiles the prop to `type: [Boolean, String]` — and Vue's BOOLEAN CASTING
   turns an ABSENT prop of a Boolean-including type into `false` (resolvePropValue:
   `if (isAbsent && !hasDefault) value = false`). `false` is the force-pinned pole, so
   every dock that omitted `collapse` mounted ALWAYS-EXPANDED and could never collapse
   — the documented `"closed"` default reached the composable (which sees a plain
   object and its `?? "closed"` holds, which is why the useDockShellProps unit seat
   stayed green) but NEVER the rendered component. Declaring the default here is what
   defeats the cast: `hasDefault` short-circuits the absent-branch, and `"closed"` is
   neither `""` nor `"collapse"`, so the cast-true branch cannot fire either. */
const props = withDefaults(defineProps<DockProps>(), {
    backdropMode: "live",
    collapse: "closed",
});

/* The resolved shell-prop computeds — shape/orientation, the collapse surface
   (`alwaysExpanded`/`startCollapsed`, both derived from the one `collapse` member),
   the intrinsic scroll-overflow class (`scrollClass` is `dock-scroll-x` on EVERY
   horizontal dock and `null` on vertical, whose block-axis scroll folds into the
   unconditional cap-derived shell.css rule), and `fitContent`. */
const {
    startCollapsed,
    shape,
    orientation,
    scrollClass,
    alwaysExpanded,
    fitContent,
} = useDockShellProps(props);

const dockEl = useTemplateRef<HTMLElement>("dockEl");
const layersEl = useTemplateRef<HTMLElement>("layersEl");
const fullEl = useTemplateRef<HTMLElement>("fullEl");
const summaryEl = useTemplateRef<HTMLElement>("summaryEl");

// The native-scroll-track mode signal (the universal floor). The RO
// toggles `[data-dock-overflow]` when the active full layer's over-cap inline content
// exceeds its clamped port, so the scroll track + FadingScroll edge mask (overflow.css)
// engage only when scrollable and the mask is honestly `none` at rest (T-52 a). The
// scrollIntoView recenter CALL lives in useSelectionGroup; this owns the
useDockOverflowFit(dockEl);

/* Wire the sampled-luminance observer ON for
   the dock by default. It writes `--glass-backdrop-luma` + derives the
   `--glass-backdrop: light|dark` bucket on the dock root, DYNAMICALLY tracking the
   painted backdrop (a live aurora bleed) the static bucket is too coarse for. The
   Arm-1 self-engage + the declarative bucket stay the FLOOR — this REFINES.
   Wired ON for every `backdropMode: "live"` dock; a `"static"` dock uses the
   solid plate with no observer. */
if (props.backdropMode === "live") {
    // Hand the field canvas as a REACTIVE GETTER, not
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
    graspHeld,
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
    rootEl: dockEl,
    alwaysExpanded,
    initialExpanded: !startCollapsed.value,
    isTransitioning,
    dockId,
});

/* Canonical typed-key dock context. The 6 prior
   string-keyed dock provides (`glassDockContext`, `glassDockId`,
   `dockKeepOpen`, `dockRelease`, `dockHeld`, `dockExpanded`) collapse
   into this single typed provide. `dockExpanded` is retired (zero
   downstream consumers per Rδ); `glassDockId` is dedup'd with
   `context.id`. */
/* `held` is the GRASP edge, not the posture count: it is what the dock root paints
   as `data-held` and what a descendant reads to co-answer the same hand. The
   posture count is reached through `keepOpen`/`release` and is deliberately not
   published as a flag — nothing should paint off "a popover is open". */
provideDockContext({
    id: dockId,
    orientation,
    keepOpen,
    release,
    held: graspHeld,
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
    // `isTransitioning` resolves from the morph's OWN
    // spring settle: the orchestrator notifies arm→true / settle→false (alongside the
    // single `[data-morphing]` busy signal). The CSS-transition-era wrong-clock settle
    // timer + dead `@transitionend` resolver (useDockMorphWindow) are excised — no
    // legacy timer, no plausibly-settled fallback.
    onMorphActiveChange: (active) => {
        isTransitioning.value = active;
    },
});

const summaryIsDisclosure = computed(() => outerCurrentLayer.value === "summary");
async function onSummaryKeydown(event: KeyboardEvent) {
    if (!summaryIsDisclosure.value || !["Enter", " "].includes(event.key)) return;
    event.preventDefault();
    onClickCollapsed();
    await nextTick();
    // The full face is the fallback focus target (it carries `tabindex="-1"`): a dock
    // whose expanded face holds NO focusable descendant would otherwise no-op to
    // <body>, and the summary goes inert on expand — a keyboard trap.
    (
        fullEl.value?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR) ?? fullEl.value
    )?.focus({
        preventScroll: true,
    });
}

// Escape belongs to the innermost owner. The gate is STRUCTURAL, not `defaultPrevented`:
// reka's DismissableLayer handles Escape on a WINDOW-level bubble and only READS
// `defaultPrevented` (`if (!event.defaultPrevented) emits("dismiss")`) — it never SETS
// it. So an element-level `!event.defaultPrevented` gate always sees `false` and is
// inert, and calling `preventDefault()` here would SUPPRESS reka's own dismiss. Instead:
// if the key came from inside an OPEN DISMISSABLE layer (a non-portalled Popover, an open
// menu), that layer owns the dismiss and the dock stays expanded. Portalled
// Select/Dropdown content never bubbles through this handler at all.
//
// The probe is narrowed on BOTH axes. By KIND: `OPEN_DISMISSABLE_LAYER_SELECTOR` reads
// reka's `[data-dismissable-layer]` marker, not any `data-state="open"` — reka stamps
// that on Accordion/Collapsible too, and an open accordion in the pane owns no Escape,
// so it must not eat the collapse. By SCOPE: the matched layer must live INSIDE
// `fullEl`. `closest()` walks the whole ancestor chain, so a dock hosted inside an open
// Dialog would otherwise match the DIALOG and never Escape-collapse.
async function onFullKeydown(event: KeyboardEvent) {
    if (event.key !== "Escape") return;
    const layer = (event.target as Element | null)?.closest?.(
        OPEN_DISMISSABLE_LAYER_SELECTOR,
    );
    if (layer && fullEl.value?.contains(layer)) return;
    collapse();
    await nextTick();
    const summary = summaryEl.value;
    if (summary && !summary.hasAttribute("inert")) summary.focus({ preventScroll: true });
}

/* (the width-seizure cure) — measure the two convex-blend endpoints
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

/* The CLICK-INTEGRITY guard. Scopes the collapsed-tap / hover-
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

/* The collapsed-pill tap-to-expand touch gate (shape B′). The
   gate owns its own `useTouchGate` + the tap/scroll discrimination + the
   collapse-on-deactivate watch; the SFC only binds the handlers + reaches
   `deactivate()` on a collapse flip. */
const { onTouchStart, onTouchMove, onTouchEnd, deactivate: touchDeactivate } =
    useDockTouchGate({
        rootEl: dockEl,
        visualExpanded,
        expanded,
        isPinned,
        expand,
        collapse,
    });

watch(visualExpanded, (isExpanded) => {
    if (isExpanded) {
        // A collapsed→expanded flip (tap-to-expand or hover/focus
        // approach) marks the click-integrity window; a click that races the FLIP and
        // lands on a swapped-in control is swallowed by the integrity guard.
        // (`isTransitioning` is owned by the `dockMorphing` spring-settle watch above.)
        markExpandFlip();
    } else {
        touchDeactivate();
    }
});

// ── The GRASP mount (glass/grasp.css) ────────────────────────────────────────────
// Keyed on `graspHeld` — an actual POINTER hold on a descendant control — never on
// the posture count: the optic is the material's answer to a hand, and an armed
// search field or an open popover is not one.
// The carriers exist exactly as long as the gesture's optic does: mounted the frame
// the hold begins, unmounted on the release fade's OWN `transitionend` — never a
// timer, which drifts against the paint. The register reads their presence, so
// "releasing" needs no flag: carriers mounted + `data-held` gone IS the release. The
// `graspHeld` guard on the end handler keeps a re-grab mid-release from unmounting
// under the finger (that fade reverses, and its `transitionend` still fires).
const grasping = ref(false);
watch(graspHeld, (held) => {
    if (held) grasping.value = true;
});
function onGraspReleaseEnd(event: TransitionEvent): void {
    if (event.propertyName === "opacity" && !graspHeld.value) grasping.value = false;
}

defineExpose({
    expanded,
    isPinned,
    isHeld,
    graspHeld,
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
        :class="[
            orientation,
            `shape-${shape}`,
            scrollClass,
            { expanded: visualExpanded, collapsed: !visualExpanded, pinned: isPinned, 'fit-content': fitContent, 'always-expanded': alwaysExpanded },
        ]"
        :data-backdrop-mode="props.backdropMode"
        :data-held="graspHeld || undefined"
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
            L0 THE PLATE (the lens). One absolute, non-interactive
            (aria-hidden, decoration) element that owns backdrop-filter + the visual clip,
            pointer absorption, grain, and whose VISIBLE EXTENT morphs via clip-path off
            the ONE plate-scoped `--dock-t` (dock/dock.css). Its ONE surface layer lerps
            between the collapsed/expanded rungs. It seats at z-index:-1 within the box's stacking context
            (below the in-flow control run, above the box's drop-shadow), a SIBLING of the
            controls — never their ancestor — so a control hover plate overhangs the plate
            edge UN-CLIPPED. The box (`.glass-dock`) is structural (layout + elevation).
        -->
        <!--
            The plate is the GRASP register's host (glass/grasp.css): `data-held` rides
            the PLATE, not the box, because the plate is the surface that carries the
            veil and the lens. The two filter-only carriers mount only while the gesture
            is live and unmount on the release's own `transitionend` — the register
            reads their presence, so nothing here needs a releasing flag. The edge is
            `graspHeld` (a pointer down on a descendant), never the posture count.
        -->
        <div class="dock-plate" aria-hidden="true" :data-held="graspHeld || undefined">
            <template v-if="grasping">
                <span class="glass-grasp-carrier" data-grasp="rest"></span>
                <span
                    class="glass-grasp-carrier"
                    data-grasp="grasp"
                    @transitionend="onGraspReleaseEnd"
                ></span>
            </template>
        </div>

        <!--
            L1 THE CONTROLS. The normal-flow control run OVER the plate.
            `display: contents` (dock/dock.css) so it GROUPS the controls the SFC places
            WITHOUT interposing a flex context — the controls stay direct flex children of
            `.glass-dock` (the flex layout is unchanged), and NO ancestor clips them
            (`overflow: visible` both axes; the box carries no clip/contain).
        -->
        <div class="dock-controls">
        <!--
            The PERSISTENT region. The `#persistent` slot is a root
            flex SIBLING of the morph-region, in-flow in BOTH collapsed AND expanded,
            NEVER `:inert`, NEVER a crossfade pane. It is the iOS Now-Playing /
            Stage-Manager idiom done STRUCTURALLY: a stable always-present region beside
            the expand-on-demand content region, so a consumer keeps a control visible
            while collapsed WITHOUT hand-duplicating it into both the `#default` and
            `#collapsed` slots. It rides the root padding/radius morph (it inherits the
            `--dock-morph-t` chrome) but is not part of a face crossfade — it
            holds steady (no crossfade, no jitter) while the morph-region's aperture
            animates on the ONE spring. Rendered only when authored ($slots.persistent),
            so a dock with no persistent controls is byte-identical to before.
        -->
        <!--
            The dock has no kinetic
            `.cartoon-cast` offset-shadow child (it drove a self-defeating
            maroon-halo). The dock's elevation is
            carried by `--shadow-dock` + `--glass-key` (shape.css).
            No cartoon box-punch; the morph carries ONE
            deformation-free `--dock-size-scale` box morph on the `scale:` channel.
        -->
        <div v-if="$slots.persistent" class="dock-persistent">
            <slot name="persistent" />
        </div>

        <!--
            The built-in two-layer morph pattern (full +
            collapsed summary) is ORIENTATION-AGNOSTIC. Both orientations stack
            the full/summary panes on a 1/1 CSS grid and crossfade with the
            FLIP-driven aperture morph: a horizontal dock morphs `width`, a vertical
            dock morphs `height` (the morph orchestrator keys its axis off the
            resolved `orientation` via `outerLayerAxis`). The unified structure gives
            a collapsible vertical dock the same collapse/shrink machinery — the height
            morph the mandate names. An `always-expanded` dock renders the `full` pane
            in-flow and the `summary` pane out-of-flow (no morph fires), so a vertical nav
            column that opts out of collapse reads as a plain static column.
        -->
        <div ref="layersEl" class="dock-layers">
            <!-- `inert` and `is-active` read the SAME
                 orchestrator layer identity (NOT the raw `expanded`). The bug:
                 an `alwaysExpanded`/mid-flip vertical dock has `visualExpanded` true
                 (pane painted active) yet `expanded` false → the pane was `:inert`
                 (every control non-interactive) while VISIBLE — a painted-but-dead
                 column (glass-dock-codebase.md §2.3). GU-4's sole exception is the
                 witnessed full-pane press retained until its click/cancel. -->
            <div
                ref="fullEl"
                :id="`${dockId}-full`"
                :class="['dock-layer dock-layer--full', {
                    'is-active': outerCurrentLayer === 'full',
                    'is-leaving': outerLeavingLayer === 'full' || (pressKeepaliveLayer === 'full' && outerCurrentLayer !== 'full'),
                    'is-press-keepalive': pressKeepaliveLayer === 'full',
                }]"
                :inert="(outerCurrentLayer !== 'full' && pressKeepaliveLayer !== 'full') || undefined"
                tabindex="-1"
                @keydown="onFullKeydown"
            >
                <slot />
            </div>
            <div
                ref="summaryEl"
                :id="`${dockId}-summary`"
                :class="['dock-layer dock-layer--summary', {
                    'is-active': outerCurrentLayer === 'summary',
                    'is-leaving': outerLeavingLayer === 'summary',
                }]"
                :inert="(outerCurrentLayer !== 'summary') || undefined"
                :role="summaryIsDisclosure ? 'button' : undefined"
                :tabindex="summaryIsDisclosure ? 0 : undefined"
                :aria-label="summaryIsDisclosure ? 'Expand dock' : undefined"
                :aria-expanded="summaryIsDisclosure ? 'false' : undefined"
                :aria-controls="summaryIsDisclosure ? `${dockId}-full` : undefined"
                @focusin.stop
                @keydown="onSummaryKeydown"
                @click="onClickCollapsed"
            >
                <slot name="collapsed" />
            </div>

            <!--
                The dock-as-native-dynamic-search-bar field region.
                [2026-08-12 · BK #47 W1 SURFACE] Rendered when the `#search` slot is
                AUTHORED — the slot IS the opt-in. ~~Rendered ONLY when `search` is
                set~~: a boolean prop gating a named slot was a second switch for one
                fact, and no dock could ever set one without the other.
                It seats INSIDE the `.dock-layers` morph aperture so the pill→field
                reveal rides the dock's OWN `--dock-morph-t` glide (the box
                shrink-wraps; no second engine). The consumer composes `useDockSearch`
                and slots its search field + the fuzzy dropdown here; the
                `.dock-search-field` surface reads the tint seam (dock/search.css) so
                the active field reads ≥4.5:1 over the backdrop (the no-pale-fade
                legibility floor).
            -->
            <div v-if="$slots.search" class="dock-search-field">
                <slot name="search" />
            </div>
        </div>

        <!--
            The TRAILING persistent
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
        <!-- /L1 .dock-controls -->
        <!-- The fission BRIDGE + `#split` slot are DEFINITION-ABSENT
             (the whole fission facility retired decided-terminal; clean break, no alias). -->
    </div>
</template>
