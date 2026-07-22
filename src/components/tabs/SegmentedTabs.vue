<script setup lang="ts">
// SegmentedTabs has two materials, one orientation axis, and one indicator engine.
// `pill` uses glass; `underline` uses the shared paper ink mark. The indicator
// transform derives from horizontal or vertical orientation. CSS owns track paint;
// this SFC owns markup and measured indicator position.
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
// The one traveling-indicator writer lives in
// `composables/motion/morph/useSelectionIndicator`; the dock, SegmentedTabs, and
// ToggleGroup share it. The pill indicator always measures via JS, so
// Chrome and Safari paint the same pixels by construction.
import { useSelectionIndicator } from "../../composables/motion/morph/useSelectionIndicator";
import { useTabDragMorph } from "./composables/useTabDragMorph";
import { useTabResponsive } from "./composables/useTabResponsive";
import {
    useTabRovingFocus,
    type TabActivation,
} from "./composables/useTabRovingFocus";
// Motion weight is the sole drag-enrichment axis.
import type { Motion } from "../_shared/axes";
import { useMotionAxis } from "../_shared/useMotionAxis";
// The pill indicator (`<div>` below) composes `.glass-lens`, whose Chromium refraction
// composite is gated behind the runtime latch `:root[data-glass-refract="on"]` set by
// `armGlassRefract()`. That latch is an APPLICATION-ROOT bootstrap concern — one public
// `armGlassRefract()` call per app root (the package-root export) arms every `.glass-lens`
// surface at once. This component deliberately does NOT arm it: a single component must not
// silently mutate the document root, and underline/Select-only consumers must not load or
// execute the mount-time probe path for a lens they never paint. Without the bootstrap the
// lens degrades to its documented blur-only floor.

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
    /**
     * The `id` of the tabpanel this option reveals. When set and semantics resolve to
     * `tabs`, it is emitted as the tab's `aria-controls`, completing the APG
     * tablist↔tabpanel linkage for consumers that own a panel. Ignored in `toggle`
     * semantics (a toggle group mutates a shared surface, not a distinct panel).
     */
    controls?: string;
}

/** The two materials: `pill` is the default glass-track slider; `underline` is the paper ink hairline. */
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
     * `true` uses defaults; an object tunes the breakpoint, desktop subset, and
     * accessible name.
     */
    responsive?: boolean | SegmentedTabsResponsive;
    /**
     * Motion weight. `full` (default) lets the pill indicator follow a pointer,
     * squash with drag velocity, and settle to the nearest tab. Drag supplements the
     * fully operable click and keyboard path; it is never the sole selection method.
     * `reduced` and `off` use the click-only strip while preserving roving focus.
     * Underline has no deformable indicator. Reduced-motion preference forces
     * `full → reduced`.
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

// Resolved `full` motion arms drag enrichment; the other modes keep selection intact.
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

// A non-selected pill tab composes the shared
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

// The pill indicator element is present only on the pill material
// only (the underline paints its indicator as the container `::before` pseudo, no
// element node). The ONE JS writer measures it on EVERY engine (the CSS-anchor
// dual path retired — Safari-identical by construction).

// ── Responsive collapse ────────────────────────────────────────────────
//
// The `<Select>`-below-the-breakpoint fold and its `matchMedia` lifecycle live in
// `useTabResponsive`. The SFC binds
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

// ── Liquid tab motion ───────────────────────────────────────────────────
//
// The drag-morph wiring (the center-anchored snap targets, the `useDragMorph` call,
// the `--stretch` write + the option/axis refresh watchers) lives in the colocated
// `useTabDragMorph` composable. The SFC binds `drag.dragging` and `dragEnabled`;
// useElementMorph owns
// the gesture transform.
// template; the drag is the `pill` material ONLY + the `:draggable` opt-in.
const { dragEnabled, drag } = useTabDragMorph({
    indicatorRef,
    isVertical,
    isUnderline,
    // Drag arms only for resolved `full` motion.
    draggable: () => motionAxis.armed.value,
    stripOptions,
    buttonRefs,
    model,
});

// ── Button press animation (Web Animations API) ──
// The press rides the control register (`--spring-snappy`), one
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

// ── Roving-tabindex keyboard contract ──────────────────────────────────
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
                // The pill track composes the shared recessed
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
             here. When draggable, the indicator carries the
             `.glass-drag-grabbable` rest affordance + the `.glass-drag-lift` grabbed
             state; the shared morph engine owns its compositor offset. -->
        <div
            v-if="!isUnderline"
            ref="indicatorRef"
            :class="[
                'segmented-indicator',
                // The measured writer paints the slider on every engine.
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
                                          'aria-controls': option.controls || undefined,
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
                        ? {
                              'aria-selected': isActive(option.value) ? 'true' : 'false',
                              'aria-controls': option.controls || undefined,
                          }
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
