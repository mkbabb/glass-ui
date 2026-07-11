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
import { ref, computed, type HTMLAttributes } from "vue";
import { cn } from "../../../utils";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from "../../ui/tooltip";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../ui/select";
import { useTabIndicator } from "./composables/useTabIndicator";
import { useTabDragMorph } from "./composables/useTabDragMorph";
import { useTabResponsive } from "./composables/useTabResponsive";
import { useTabRovingFocus } from "./composables/useTabRovingFocus";
// BH.W-MOTION-AXIS — the `draggable` boolean dies onto the ONE `motion` axis.
import type { Motion } from "../../ui/_shared/axes";
import { useMotionAxis } from "../../ui/_shared/useMotionAxis";

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
    /**
     * The material — `pill` (DEFAULT, the glass-track slider) or `underline`
     * (the paper ink-hairline rule).
     */
    variant?: SegmentedTabsVariant;
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
    /**
     * BG.W-EYEGLASS-TABS — the iOS-27 eye-glass loupe register (ADDITIVE, default
     * `false`, `pill`-ONLY). Flips a `data-eyeglass` attribute the CSS reads to opt the
     * strip into (a) `.glass-lens` refraction on the indicator (Chromium bends the
     * frosted-stage backdrop; off `backdrop-filter: url()` engines it degrades to the
     * honest proud `.glass-capsule` frost floor — NO faked bend), (b) the proud loupe
     * geometry (the static outset spilling past the track on BOTH position paths), (c)
     * the stronger stage frost the loupe bends, (d) the opt-in `--tab-selected-ink`
     * glyph-accent seam. ORTHOGONAL to `variant`/`motion`/`responsive` — it stacks.
     * Ignored on `underline` (a paper hairline has no plate to loupe — not an error).
     * Default `false` ⇒ byte-identical to the shipped `.glass-capsule` pill.
     */
    eyeglass?: boolean;
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<SegmentedTabsProps>(), {
    variant: "pill",
    orientation: "horizontal",
    responsive: false,
    eyeglass: false,
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

// CSS anchor positioning owns the single-select slider position where supported;
// a non-anchor engine falls back to the JS single writer.
const ANCHOR_SUPPORTED =
    typeof CSS !== "undefined" &&
    typeof CSS.supports === "function" &&
    CSS.supports("position-anchor", "--x");

// ── Computed state ──

const isUnderline = computed(() => props.variant === "underline");
const isVertical = computed(() => props.orientation === "vertical");

// BG.W-EYEGLASS-TABS — the eyeglass loupe engages pill-ONLY (the underline paper
// hairline has no plate to loupe; eyeglass is ignored on it, not an error). This ONE
// computed is the SINGLE gate for the `data-eyeglass` host attr AND the `.glass-lens`
// indicator compose — additive, default-off, byte-identical to the shipped pill when off.
const eyeglassOn = computed(() => props.eyeglass && !isUnderline.value);

const activeValues = computed<string[]>(() =>
    model.value != null ? [model.value] : [],
);

const isActive = (value: string) => activeValues.value.includes(value);

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

// The JS slider writer is live only on the underline-EXCLUDED pill variant when
// the engine lacks anchor support (underline runs the CSS anchor `::before`).
const jsSliderActive = computed(() => !ANCHOR_SUPPORTED && !isUnderline.value);
const jsSingleSlider = jsSliderActive;

// ── Responsive collapse (package-private composable — BG.W-COLOCATE) ──
//
// The `<Select>`-below-the-breakpoint fold + its `matchMedia` lifecycle live in the
// colocated `useTabResponsive` composable (carved to hold the no-god-module bound,
// the `useTabIndicator`/`useTabDragMorph` sibling pattern). The SFC binds
// `stripValue`/`stripOptions`/`showMobileSelect` + feeds `stripValue`/`stripOptions`
// to the indicator + roving-focus concerns below.
const {
    responsiveCfg,
    stripValue,
    stripOptions,
    mobileAriaLabel,
    showMobileSelect,
} = useTabResponsive({
    responsive: () => props.responsive,
    options: computed(() => props.options),
    model,
});

// ── JS-measured indicator + travel-squish (package-private composable) ──

const indicatorModel = computed<string | undefined>(() => stripValue.value);

const { singleSliderStyle, squishOnTravel } = useTabIndicator({
    containerRef,
    indicatorRef,
    buttonRefs,
    options: stripOptions,
    model: indicatorModel,
    anchorSupported: ANCHOR_SUPPORTED,
    jsSliderActive,
    activeValues,
    vertical: isVertical,
});

// ── BB.W-DRAG-MORPH — the LIQUID TAB (the :draggable axis) ──
//
// The drag-morph wiring (the center-anchored snap targets, the `useDragMorph` call,
// the `--stretch` write + the option/axis refresh watchers) lives in the colocated
// `useTabDragMorph` composable (carved at BB.W-CARVE4, the `useTabIndicator` sibling
// pattern). The SFC binds `drag.dragStyle`/`drag.dragging` + `dragEnabled` in its
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
// The WAI-ARIA tablist/toolbar roving-tabindex (EXACTLY ONE tabstop; axis-derived
// arrows move focus + activate; Home/End jump; wrapping; disabled-skip) lives in the
// colocated `useTabRovingFocus` composable (carved to hold the no-god-module bound).
// It is NOT gated behind `:draggable` — EVERY strip owes it. The keyboard activation
// IS a selection → the SFC's `select(...)` path (with its `squishOnTravel`), passed in.
const { rovingTabindex, onStripKeydown } = useTabRovingFocus({
    stripOptions,
    stripValue,
    isVertical,
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
                :aria-label="mobileAriaLabel"
                :class="cn('segmented-tabs__trigger text-small w-auto min-w-input-sm', responsiveCfg?.triggerClass)"
            >
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectItem
                    v-for="opt in options"
                    :key="opt.value"
                    :value="opt.value"
                >
                    {{ opt.label }}
                </SelectItem>
            </SelectContent>
        </Select>
    </div>

    <!-- The tab strip. ARIA-role-per-variant: `underline` is panel-nav
         (`role=tablist`/`tab` + `aria-selected`); `pill` is the ToggleGroup-shaped
         surface (`role=group` + `aria-pressed`). -->
    <div
        v-else
        ref="containerRef"
        :role="isUnderline ? 'tablist' : 'group'"
        :aria-orientation="isUnderline ? (isVertical ? 'vertical' : 'horizontal') : undefined"
        :data-motion="motionAxis.dataMotion.value"
        :data-eyeglass="eyeglassOn ? '' : undefined"
        :style="motionAxis.hostStyle.value"
        :class="cn(
            'segmented-tabs',
            `segmented-tabs--${variant}`,
            isVertical && 'segmented-tabs--vertical',
            // BD.W-TAB-IOS-CAPSULE — the PILL track composes the shared recessed
            // warm channel `.glass-capsule-track` (the recess + rim live there, ONE
            // recipe). The underline material is paper (no track), so it does NOT.
            !isUnderline && 'glass-capsule-track',
            props.class,
        )"
        @keydown="onStripKeydown"
    >
        <!-- The single shared indicator (pill slider). On the anchor path no
             inline `:style` (CSS `position-anchor` + `inset` govern it); on the JS
             fallback the measured `singleSliderStyle`. The underline variant paints
             its indicator as the container `::before` pseudo, so no element node
             here. BB.W-DRAG-MORPH — when `:draggable`, the indicator carries the
             `.glass-drag-grabbable` rest affordance + the `.glass-drag-lift` grabbed
             state + the `useDragMorph` `dragStyle` translate (compositor-only). -->
        <div
            v-if="!isUnderline"
            ref="indicatorRef"
            :class="[
                'segmented-indicator',
                // BD.W-TAB-IOS-CAPSULE — the active pill COMPOSES the shared
                // `.glass-capsule` (warm-floor fill + rim + lift, ONE recipe; the
                // dock-tab selected arm + buttons greenfield compose the SAME class).
                'glass-capsule',
                // BG.W-EYEGLASS-TABS — the eyeglass indicator COMPOSES the shipped
                // `.glass-lens` (glass-refract.css) — the whole refraction rides INSIDE
                // its own `@supports (backdrop-filter: url(#glass-refract))` gate, so off
                // that engine the pill paints the un-gated `.glass-capsule` frost floor
                // (the honest Safari/Firefox degrade — NO faked bend). Pill-only + opt-in.
                eyeglassOn && 'glass-lens',
                jsSingleSlider ? 'segmented-indicator--js' : 'segmented-indicator--anchor',
                dragEnabled && 'glass-drag-grabbable',
                dragEnabled && drag.dragging.value && 'glass-drag-lift',
            ]"
            :style="dragEnabled
                ? { ...(jsSingleSlider ? singleSliderStyle : {}), ...drag.dragStyle.value }
                : (jsSingleSlider ? singleSliderStyle : undefined)"
        />

        <!-- Buttons. -->
        <template v-for="(option, idx) in stripOptions" :key="option.value">
            <TooltipProvider v-if="option.tooltip" :delay-duration="200">
                <Tooltip>
                    <TooltipTrigger as-child>
                        <button
                            :ref="(el) => { if (el) buttonRefs[idx] = el as HTMLElement }"
                            class="segmented-tab"
                            :role="isUnderline ? 'tab' : undefined"
                            :tabindex="rovingTabindex(idx)"
                            v-bind="isUnderline
                                ? { 'aria-selected': isActive(option.value) ? 'true' : 'false' }
                                : { 'aria-pressed': isActive(option.value) ? 'true' : 'false' }"
                            :disabled="option.disabled"
                            :class="[
                                option.disabled && 'is-disabled',
                                pillHoverClass(option),
                            ]"
                            @click="select(option.value, idx)"
                        >
                            <slot name="option" :option="option" :active="isActive(option.value)">
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
                :ref="(el) => { if (el) buttonRefs[idx] = el as HTMLElement }"
                class="segmented-tab"
                :role="isUnderline ? 'tab' : undefined"
                :tabindex="rovingTabindex(idx)"
                v-bind="isUnderline
                    ? { 'aria-selected': isActive(option.value) ? 'true' : 'false' }
                    : { 'aria-pressed': isActive(option.value) ? 'true' : 'false' }"
                :disabled="option.disabled"
                :class="[
                    option.disabled && 'is-disabled',
                    pillHoverClass(option),
                ]"
                @click="select(option.value, idx)"
            >
                <slot name="option" :option="option" :active="isActive(option.value)">
                    {{ option.label }}
                </slot>
            </button>
        </template>
    </div>
</template>
