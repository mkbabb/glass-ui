<script setup lang="ts">
// The standardized SegmentedTabs (BA.W-TABS) — ONE component, TWO materials, ONE
// orientation axis, ONE indicator engine. The `variant` axis is `pill` (DEFAULT,
// the GLASS material — absorbs the retired `segmented` value) + `underline` (the
// PAPER material — the ink hairline on the shared `.paper-ink-mark` register).
// `orientation` is first-class (`horizontal` default · `vertical`); the indicator
// transform path is axis-derived (the dock-morph `dim` idiom). The track
// choreography lives in styles/segmented-tabs.css (@import-ed into
// styles/index.css); this SFC owns the toggle markup + the anchor/JS indicator-
// position seam. The `overflow` axis (→ <FadingScroll>) and the `:multi-select`
// prop (→ ToggleGroup) RETIRED — clean break, no alias (see MIGRATION.md).
import { ref, computed, onBeforeUpdate, type HTMLAttributes } from "vue";
import { cn } from "../_shared/class-names";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "../tooltip";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../select";
// BI.W-DOCK-CONTROLS — the ONE traveling-indicator writer. `useTabIndicator` was
// PROMOTED to `composables/motion/useSelectionIndicator` (the library's single
// indicator writer; the dock IS SegmentedTabs/ToggleGroup wearing chrome). The
// CSS-anchor dual path RETIRED — the pill indicator ALWAYS measures via JS, so
// Chrome and Safari paint the same pixels by construction.
import { useSelectionIndicator } from "../../composables/motion/useSelectionIndicator";
import { useTabDragMorph } from "./composables/useTabDragMorph";
import { useTabResponsive } from "./composables/useTabResponsive";
import {
    useTabRovingFocus,
    type TabActivation,
} from "./composables/useTabRovingFocus";
// BH.W-MOTION-AXIS — the `draggable` boolean dies onto the ONE `motion` axis.
import type { Motion } from "../_shared/axes";
import { useMotionAxis } from "../_shared/useMotionAxis";

// WAAPI keyframes can't dereference custom properties — resolve literals at
// runtime via the cascade root.
function readToken(name: string, fallback: string): string {
    if (typeof document === "undefined") return fallback;
    return (
        getComputedStyle(document.documentElement).getPropertyValue(name).trim() ||
        fallback
    );
}

/** The canonical tab/option shape — one descriptor across both materials. */
export interface SegmentedTabOption {
    label: string;
    value: string;
    icon?: string;
    disabled?: boolean;
    tooltip?: string;
}

/** The two materials. `pill` (DEFAULT) = the glass-track slider (absorbs the
 *  retired `segmented`); `underline` = the paper ink-hairline rule. */
export type SegmentedTabsVariant = "pill" | "underline";

/** The interaction semantic, independent of material. `toggle` exposes a
 *  group of pressed buttons; `tabs` exposes a tablist with selected tabs. */
export type SegmentedTabsSemantics = "toggle" | "tabs";

/** Whether focus movement also selects. Manual activation waits for Enter/Space. */
export type SegmentedTabsActivation = TabActivation;

/** The orientation axis — `horizontal` (default) lays children in a row + tracks
 *  the indicator on the inline axis; `vertical` stacks a column + tracks the
 *  block axis (the vertical underline is the leading-edge ink rail). */
export type SegmentedTabsOrientation = "horizontal" | "vertical";

export interface SegmentedTabsResponsive {
    /**
     * CSS length consumed inside `(min-width: <breakpoint>)`. BELOW it the
     * strip collapses to a `<Select>`; at/above it renders the tab strip.
     * Defaults to `"640px"` (Tailwind `sm:`).
     */
    breakpoint?: string;
    /**
     * Optional subset shown in the desktop strip (the mobile Select keeps the
     * full option list). Falls back to `options`.
     */
    desktopOptions?: SegmentedTabOption[] | null;
    /** Accessible name for the mobile `<SelectTrigger>`. */
    ariaLabel?: string;
    /** Class merged onto the mobile `<SelectTrigger>` only. */
    triggerClass?: HTMLAttributes["class"];
}

export interface SegmentedTabsProps {
    options: SegmentedTabOption[];
    /** Accessible name shared by the desktop strip and responsive Select. */
    ariaLabel?: string;
    /**
     * The material — `pill` (DEFAULT, the glass-track slider) or `underline`
     * (the paper ink-hairline rule).
     */
    variant?: SegmentedTabsVariant;
    /**
     * Interaction semantics, independent of `variant`. When omitted, preserves the
     * historical mapping: `pill` → `toggle`, `underline` → `tabs`.
     */
    semantics?: SegmentedTabsSemantics;
    /** Selection follows focus by default; manual mode activates with Enter/Space. */
    activation?: SegmentedTabsActivation;
    /**
     * Orientation — `horizontal` (default) or `vertical`. Axis-derived on the
     * one indicator engine.
     */
    orientation?: SegmentedTabsOrientation;
    /**
     * Responsive collapse — below the breakpoint the strip becomes a `<Select>`.
     * `true` uses defaults; an object tunes the breakpoint / desktop subset /
     * accessible name.
     */
    responsive?: boolean | SegmentedTabsResponsive;
    /**
     * BH.W-MOTION-AXIS — the ONE motion-weight axis (the `draggable` boolean's
     * clean-break successor). `full` (default) arms the LIQUID TAB: the `pill` indicator
     * is a physical lozenge you can GRAB and PULL — it follows the finger ~1:1, squishes
     * on drag velocity, and flings to the nearest tab on release (`useDragMorph`),
     * ADDITIVE OVER the click/keyboard path (which stays byte-identical + fully operable
     * — the drag is a pointer ENHANCEMENT, never the sole selection mechanism, WCAG
     * 2.1.1). `reduced`/`off` opt DOWN to the click-only strip (the drag unbinds; the
     * roving-tabindex keyboard contract stays — motion off, meaning never off). No-op on
     * `underline` (the ink hairline has no indicator element to deform). PRM forces
     * `full → reduced` regardless (a11y absolute).
     */
    motion?: Motion;
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<SegmentedTabsProps>(), {
    variant: "pill",
    orientation: "horizontal",
    activation: "automatic",
    responsive: false,
});

// BH.W-MOTION-AXIS — the resolved motion state. `armed` (resolved `full`) gates the
// drag enrichment (the SAME iOS-27 default the `draggable: true` boolean carried, now
// the `full` register); `dataMotion`/`hostStyle` are the zero-delta-at-full binds.
const motionAxis = useMotionAxis(() => props.motion);

// Vue 3.5 defineModel — single-select string. (The multi-select array model
// retired with the `:multi-select` prop; a multi-pressed strip is a ToggleGroup.)
const model = defineModel<string>({ required: true });

const containerRef = ref<HTMLElement | null>(null);
const indicatorRef = ref<HTMLElement | null>(null);
const buttonRefs = ref<HTMLElement[]>([]);

// ── Computed state ──

const isUnderline = computed(() => props.variant === "underline");
const isVertical = computed(() => props.orientation === "vertical");
const isTabsSemantic = computed(
    () => props.semantics === "tabs" || (!props.semantics && isUnderline.value),
);

// BD.W-TAB-IOS-CAPSULE — the NON-selected PILL tab composes the shared
// `.glass-capsule-hover` register (specular catch-light lift + press-snap, the iOS
// "ready to receive" read). Only the PILL material (the underline is paper — a
// hairline does not lift), only non-selected (the selected tab's indicator carries
// the lift; hovering it would double-lift), only enabled. The SAME register the
// buttons greenfield composes wholesale.
function pillHoverClass(option: SegmentedTabOption): string | false {
    return (
        !isUnderline.value &&
        !isActive(option.value) &&
        !option.disabled &&
        "glass-capsule-hover"
    );
}

// BI.W-DOCK-CONTROLS — the pill indicator element is present on the pill material
// only (the underline paints its indicator as the container `::before` pseudo, no
// element node). The ONE JS writer measures it on EVERY engine (the CSS-anchor
// dual path retired — Safari-identical by construction).

// ── Responsive collapse (package-private composable — BG.W-COLOCATE) ──
//
// The `<Select>`-below-the-breakpoint fold + its `matchMedia` lifecycle live in the
// colocated `useTabResponsive` composable (carved to hold the no-god-module bound,
// the `useTabIndicator`/`useTabDragMorph` sibling pattern). The SFC binds
// `stripValue`/`stripOptions`/`showMobileSelect` + feeds `stripValue`/`stripOptions`
// to the indicator + roving-focus concerns below.
const { responsiveCfg, stripValue, stripOptions, mobileAriaLabel, showMobileSelect } =
    useTabResponsive({
        responsive: () => props.responsive,
        options: computed(() => props.options),
        model,
    });

// The rendered strip owns one coherent selection projection. When a responsive
// desktop subset excludes the mobile-selected value, its enabled fallback drives
// ARIA, indicator paint, and roving focus together.
const activeValues = computed<string[]>(() =>
    stripValue.value == null ? [] : [stripValue.value],
);
const isActive = (value: string) => activeValues.value.includes(value);

// Function refs are index-aligned to the rendered options. Clear stale entries
// before a responsive subset or option list changes shape.
onBeforeUpdate(() => {
    buttonRefs.value = [];
});

// ── JS-measured indicator + travel-squish (package-private composable) ──

const indicatorModel = computed<string | undefined>(() => stripValue.value);

const { singleSliderStyle, squishOnTravel } = useSelectionIndicator({
    containerRef,
    indicatorRef,
    buttonRefs,
    options: stripOptions,
    model: indicatorModel,
    activeValues,
    vertical: isVertical,
});

// ── BB.W-DRAG-MORPH — the LIQUID TAB (the :draggable axis) ──
//
// The drag-morph wiring (the center-anchored snap targets, the `useDragMorph` call,
// the `--stretch` write + the option/axis refresh watchers) lives in the colocated
// `useTabDragMorph` composable (carved at BB.W-CARVE4, the `useTabIndicator` sibling
// pattern). The SFC binds `drag.dragging` + `dragEnabled`; useElementMorph owns
// the gesture transform.
// template; the drag is the `pill` material ONLY + the `:draggable` opt-in.
const { dragEnabled, drag } = useTabDragMorph({
    indicatorRef,
    isVertical,
    isUnderline,
    // BH.W-MOTION-AXIS — the drag arms on the resolved `full` register (the internal
    // composable option keeps its `draggable` OPTION-field name — the gate greps public
    // component PROPS only; a composable option is explicitly excluded).
    draggable: () => motionAxis.armed.value,
    stripOptions,
    buttonRefs,
    model,
});

// ── Button press animation (Web Animations API) ──
// AX.W53 — the press rides the CONTROL register (`--spring-snappy`), one
// settle-into squish (no double-spring overshoot past the rest scale). Honors
// reduced-motion.

function animatePress(btn: HTMLElement) {
    if (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
        return;
    }
    btn.getAnimations().forEach((a) => a.cancel());
    const easing = readToken("--spring-snappy", "ease");
    const press = readToken("--scale-press-btn", "0.97");
    btn.animate(
        [
            { transform: "scale(1)" },
            { transform: `scale(${press})`, offset: 0.4 },
            { transform: "scale(1)" },
        ],
        { duration: 220, easing },
    );
}

// ── Selection handler ──

function select(value: string, idx: number) {
    const option = stripOptions.value[idx];
    if (option?.disabled) return;

    const btn = buttonRefs.value[idx];
    if (btn) animatePress(btn);

    // The elastic travel-squish fires on EVERY selection (anchor + JS engines);
    // the underline SLIDES (no squish — a hairline does not deform), gated inside
    // the composable by the underline early-return.
    squishOnTravel(idx);
    model.value = value;
}

// The mobile Select speaks the single-string model.
function onMobileUpdate(value: unknown) {
    if (typeof value === "string") model.value = value;
}

// ── The roving-tabindex keyboard contract (package-private composable — BG.W-COLOCATE) ──
//
// The WAI-ARIA roving machine keeps exactly one tabstop, derives arrows from the axis,
// wraps, skips disabled options, and separates focus from selection in manual mode.
// It is never gated behind pointer motion; committed activation still passes through
// the SFC's one selection path.
const { rovingTabindex, onStripKeydown } = useTabRovingFocus({
    stripOptions,
    stripValue,
    isVertical,
    activation: computed(() => props.activation),
    buttonRefs,
    select,
});
</script>

<template>
    <!-- Responsive collapse — the mobile Select below the breakpoint. -->
    <div
        v-if="showMobileSelect"
        :class="cn('segmented-tabs__mobile w-fit', props.class)"
    >
        <Select :model-value="model" @update:model-value="onMobileUpdate">
            <SelectTrigger
                :aria-label="props.ariaLabel ?? mobileAriaLabel"
                data-control-target
                :class="
                    cn(
                        'segmented-tabs__trigger text-small w-auto min-w-input-sm',
                        responsiveCfg?.triggerClass,
                    )
                "
            >
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectItem
                    v-for="opt in options"
                    :key="opt.value"
                    :value="opt.value"
                    :disabled="opt.disabled"
                >
                    {{ opt.label }}
                </SelectItem>
            </SelectContent>
        </Select>
    </div>

    <!-- Material and semantics are independent: `variant` owns the look;
         `semantics` owns role/state, defaulting to the historical mapping. -->
    <div
        v-else
        ref="containerRef"
        :role="isTabsSemantic ? 'tablist' : 'group'"
        :aria-label="props.ariaLabel"
        :aria-orientation="
            isTabsSemantic ? (isVertical ? 'vertical' : 'horizontal') : undefined
        "
        :data-motion="motionAxis.dataMotion.value"
        :style="motionAxis.hostStyle.value"
        :class="
            cn(
                'segmented-tabs',
                `segmented-tabs--${variant}`,
                isVertical && 'segmented-tabs--vertical',
                // BD.W-TAB-IOS-CAPSULE — the PILL track composes the shared recessed
                // warm channel `.glass-capsule-track` (the recess + rim live there, ONE
                // recipe). The underline material is paper (no track), so it does NOT.
                !isUnderline && 'glass-capsule-track',
                props.class,
            )
        "
        @keydown="onStripKeydown"
    >
        <!-- The single shared indicator (pill slider). On the anchor path no
             inline `:style` (CSS `position-anchor` + `inset` govern it); on the JS
             fallback the measured `singleSliderStyle`. The underline variant paints
             its indicator as the container `::before` pseudo, so no element node
             here. BB.W-DRAG-MORPH — when `:draggable`, the indicator carries the
             `.glass-drag-grabbable` rest affordance + the `.glass-drag-lift` grabbed
             state; the shared morph engine owns its compositor offset. -->
        <div
            v-if="!isUnderline"
            ref="indicatorRef"
            :class="[
                'segmented-indicator',
                // BI.W-DOCK-CONTROLS — the ONE JS-measured writer paints the slider on
                // EVERY engine (the CSS-anchor branch retired), so the indicator always
                // carries `--js` (Safari-identical by construction).
                'segmented-indicator--js',
                // The traveling indicator is the selected fill. Its glass material
                // belongs on this measured box so geometry, clipping, and motion share
                // one owner and one settled scale.
                'glass-capsule',
                'glass-lens',
                dragEnabled && 'glass-drag-grabbable',
                dragEnabled && drag.dragging.value && 'glass-drag-lift',
            ]"
            :style="singleSliderStyle"
        />

        <!-- Buttons. -->
        <template v-for="(option, idx) in stripOptions" :key="option.value">
            <TooltipProvider v-if="option.tooltip" :delay-duration="200">
                <Tooltip>
                    <TooltipTrigger as-child>
                        <button
                            type="button"
                            :ref="
                                (el) => {
                                    if (el) buttonRefs[idx] = el as HTMLElement;
                                }
                            "
                            class="segmented-tab"
                            :role="isTabsSemantic ? 'tab' : undefined"
                            :tabindex="rovingTabindex(idx)"
                            v-bind="
                                isTabsSemantic
                                    ? {
                                          'aria-selected': isActive(option.value)
                                              ? 'true'
                                              : 'false',
                                      }
                                    : {
                                          'aria-pressed': isActive(option.value)
                                              ? 'true'
                                              : 'false',
                                      }
                            "
                            :disabled="option.disabled"
                            :class="[
                                option.disabled && 'is-disabled',
                                pillHoverClass(option),
                            ]"
                            @click="select(option.value, idx)"
                        >
                            <slot
                                name="option"
                                :option="option"
                                :active="isActive(option.value)"
                            >
                                {{ option.label }}
                            </slot>
                        </button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" :side-offset="8">
                        {{ option.tooltip }}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <button
                v-else
                type="button"
                :ref="
                    (el) => {
                        if (el) buttonRefs[idx] = el as HTMLElement;
                    }
                "
                class="segmented-tab"
                :role="isTabsSemantic ? 'tab' : undefined"
                :tabindex="rovingTabindex(idx)"
                v-bind="
                    isTabsSemantic
                        ? { 'aria-selected': isActive(option.value) ? 'true' : 'false' }
                        : { 'aria-pressed': isActive(option.value) ? 'true' : 'false' }
                "
                :disabled="option.disabled"
                :class="[option.disabled && 'is-disabled', pillHoverClass(option)]"
                @click="select(option.value, idx)"
            >
                <slot name="option" :option="option" :active="isActive(option.value)">
                    {{ option.label }}
                </slot>
            </button>
        </template>
    </div>
</template>
