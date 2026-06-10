<script setup lang="ts">
// The unified SegmentedTabs — ONE component, a three-value `variant` axis
// (segmented / pill / underline), ONE shared elastic indicator (the former
// BouncyToggle/BouncyTabs/UnderlineTabs trio unified). The track choreography
// lives in the co-located segmented-tabs.css (@import-ed into styles/index.css);
// this SFC owns the toggle markup + the anchor/JS indicator-position seam.
import {
    ref,
    computed,
    onMounted,
    onBeforeUnmount,
    nextTick,
    type HTMLAttributes,
} from "vue";
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

// WAAPI keyframes can't dereference custom properties — resolve literals at
// runtime via the cascade root.
function readToken(name: string, fallback: string): string {
    if (typeof document === "undefined") return fallback;
    return (
        getComputedStyle(document.documentElement).getPropertyValue(name).trim() ||
        fallback
    );
}

/** The canonical tab/option shape — one descriptor across all three variants. */
export interface SegmentedTabOption {
    label: string;
    value: string;
    icon?: string;
    disabled?: boolean;
    tooltip?: string;
}

/** The three indicator chromes. `segmented` (default) = the muted pill-slider;
 *  `pill` = the solid `--foreground` pill; `underline` = the hairline rule. */
export type SegmentedTabsVariant = "segmented" | "pill" | "underline";

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
     * Indicator chrome — `segmented` (DEFAULT, the pill-slider over a muted
     * track), `pill` (solid foreground pill), `underline` (the hairline rule).
     */
    variant?: SegmentedTabsVariant;
    /**
     * Multi-select — when true the surface mutates as a ToggleGroup (N
     * simultaneous pressed buttons, `role="group"`). Only valid on the
     * `segmented`/`pill` variants; `underline` is panel-nav (single-select).
     */
    multiSelect?: boolean;
    /**
     * Tab-row overflow handling.
     * - `"none"` (default) — inline-grid; tabs share width and clip.
     * - `"scroll"` — flex row with intrinsic widths + edge fades; never clips.
     * - `"auto"` — flex row with intrinsic widths + plain horizontal scroll.
     */
    overflow?: "none" | "scroll" | "auto";
    /**
     * Responsive collapse — below the breakpoint the strip becomes a `<Select>`
     * (subsumes the former standalone ResponsiveTabs). `true` uses defaults;
     * an object tunes the breakpoint / desktop subset / accessible name.
     */
    responsive?: boolean | SegmentedTabsResponsive;
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<SegmentedTabsProps>(), {
    variant: "segmented",
    multiSelect: false,
    overflow: "none",
    responsive: false,
});

// Vue 3.5 defineModel — single (`string`) and multi (`string[]`) share the one
// model, keyed off `multiSelect`. The underline variant + responsive collapse
// are always single-select.
const model = defineModel<string | string[]>({ required: true });

const containerRef = ref<HTMLElement | null>(null);
const indicatorRef = ref<HTMLElement | null>(null);
const buttonRefs = ref<HTMLElement[]>([]);

// CSS anchor positioning is single-target, so the MULTI-select path (N
// simultaneous indicators) keeps the JS measure path; a non-anchor engine falls
// back to the JS single writer. So the JS path runs only on the multi-select OR
// `@supports not (anchor)` branch — never double-running alongside the CSS
// anchor on the same element.
const ANCHOR_SUPPORTED =
    typeof CSS !== "undefined" &&
    typeof CSS.supports === "function" &&
    CSS.supports("position-anchor", "--x");

// ── Computed state ──

const isUnderline = computed(() => props.variant === "underline");
const isPill = computed(() => props.variant === "pill");
const isSegmented = computed(() => props.variant === "segmented");
const isScroll = computed(() => props.overflow === "scroll");
const isAuto = computed(() => props.overflow === "auto");

// underline is panel-nav (single-select); only segmented/pill may multi-select.
const isMulti = computed(() => props.multiSelect && !isUnderline.value);

const activeValues = computed<string[]>(() => {
    const value = model.value;
    if (isMulti.value) {
        return Array.isArray(value) ? value : value != null ? [value] : [];
    }
    return value != null ? [value as string] : [];
});

const isActive = (value: string) => activeValues.value.includes(value);

// True when ANY JS slider writer is live (so the RO/watchers attach at all).
// Underline runs the CSS anchor rule (its `::before`), so it is never a JS
// writer — only segmented/pill on a non-anchor engine, or multi-select, are.
const jsSliderActive = computed(
    () => (isMulti.value || !ANCHOR_SUPPORTED) && !isUnderline.value,
);
const jsSingleSlider = computed(
    () => !isMulti.value && !ANCHOR_SUPPORTED && !isUnderline.value,
);

// ── Responsive collapse (subsumes ResponsiveTabs) ──

const responsiveCfg = computed<SegmentedTabsResponsive | null>(() => {
    if (props.responsive === false) return null;
    if (props.responsive === true) return {};
    return props.responsive;
});
const breakpoint = computed(() => responsiveCfg.value?.breakpoint ?? "640px");
const desktopOptions = computed(
    () => responsiveCfg.value?.desktopOptions ?? props.options,
);
// SSR/desktop-first default; the matchMedia listener corrects on mount.
const isDesktop = ref(true);
let mql: MediaQueryList | null = null;
function onMql(e: MediaQueryListEvent | MediaQueryList) {
    isDesktop.value = e.matches;
}

// The active value the strip renders — when the model points at a mobile-only
// option (absent from `desktopOptions`), fall back to the first desktop option.
const stripValue = computed(() => {
    if (!responsiveCfg.value) return model.value;
    const opts = desktopOptions.value;
    if (opts.some((o) => o.value === model.value)) return model.value;
    return (opts[0]?.value ?? model.value) as string | string[];
});
const stripOptions = computed(() =>
    responsiveCfg.value ? desktopOptions.value : props.options,
);
const mobileAriaLabel = computed(
    () =>
        responsiveCfg.value?.ariaLabel ??
        props.options.find((o) => o.value === model.value)?.label ??
        "Select",
);
const showMobileSelect = computed(
    () => !!responsiveCfg.value && !isDesktop.value,
);

// ── JS-measured indicator + travel-squish (package-private composable) ──

const indicatorModel = computed<string | string[] | undefined>(
    () => stripValue.value,
);
const { singleSliderStyle, multiSliderStyles, squishOnTravel } = useTabIndicator({
    containerRef,
    indicatorRef,
    buttonRefs,
    options: stripOptions,
    model: indicatorModel,
    multiSelect: isMulti,
    anchorSupported: ANCHOR_SUPPORTED,
    jsSliderActive,
    activeValues,
});

// ── Button press animation (Web Animations API) ──
// AX.W53 — the press rides the CONTROL register (`--spring-snappy`), one
// settle-into squish (no double-spring overshoot past the rest scale — the
// former --spring-bouncy 1.08 keyframe is retired). Honors reduced-motion.

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

// ── Scroll-active-into-view (overflow scroller only) ──

function scrollButtonIntoView(idx: number) {
    if (!isScroll.value && !isAuto.value) return;
    const btn = buttonRefs.value[idx];
    if (!btn) return;
    const reduceMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    btn.scrollIntoView({
        inline: "nearest",
        block: "nearest",
        behavior: reduceMotion ? "auto" : "smooth",
    });
}

// ── Selection handler ──

function select(value: string, idx: number) {
    const option = stripOptions.value[idx];
    if (option?.disabled) return;

    const btn = buttonRefs.value[idx];
    if (btn) animatePress(btn);

    // The elastic travel-squish fires on EVERY selection (anchor + JS engines).
    squishOnTravel(idx);

    if (isMulti.value) {
        const current = [...activeValues.value];
        const existingIdx = current.indexOf(value);
        if (existingIdx > -1) {
            // Don't deselect the last remaining value.
            if (current.length > 1) current.splice(existingIdx, 1);
        } else {
            current.push(value);
        }
        model.value = current;
    } else {
        model.value = value;
    }

    scrollButtonIntoView(idx);
}

// The mobile Select speaks the single-string model.
function onMobileUpdate(value: unknown) {
    if (typeof value === "string") model.value = value;
}

// ── Lifecycle ──

onMounted(() => {
    if (responsiveCfg.value && typeof window !== "undefined" && window.matchMedia) {
        mql = window.matchMedia(`(min-width: ${breakpoint.value})`);
        isDesktop.value = mql.matches;
        mql.addEventListener("change", onMql);
    }
    nextTick(() => {
        const activeIdx = stripOptions.value.findIndex((o) => isActive(o.value));
        if (activeIdx >= 0) scrollButtonIntoView(activeIdx);
    });
});

onBeforeUnmount(() => {
    mql?.removeEventListener("change", onMql);
    mql = null;
});
</script>

<template>
    <!-- Responsive collapse — the mobile Select below the breakpoint. -->
    <div
        v-if="showMobileSelect"
        :class="cn('segmented-tabs__mobile w-fit', props.class)"
    >
        <Select :model-value="(model as string)" @update:model-value="onMobileUpdate">
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
         (`role=tablist`/`tab` + `aria-selected`); `segmented`/`pill` are the
         ToggleGroup-shaped surface (`role=group` + `aria-pressed`). -->
    <div
        v-else
        ref="containerRef"
        :role="isUnderline ? 'tablist' : 'group'"
        :class="cn(
            'segmented-tabs',
            `segmented-tabs--${variant}`,
            isScroll && 'segmented-tabs--scroll scroll-fade-mask scrollbar-hidden',
            isAuto && 'segmented-tabs--auto scrollbar-hidden',
            props.class,
        )"
    >
        <!-- The single shared indicator (segmented/pill slider). On the anchor
             path no inline `:style` (CSS `position-anchor` + `inset` govern it);
             on the JS fallback the measured `singleSliderStyle`. The underline
             variant paints its indicator as the container `::before` pseudo, so
             no element node here. -->
        <div
            v-if="!isUnderline && !isMulti"
            ref="indicatorRef"
            :class="[
                'segmented-indicator',
                jsSingleSlider ? 'segmented-indicator--js' : 'segmented-indicator--anchor',
            ]"
            :style="jsSingleSlider ? singleSliderStyle : undefined"
        />

        <!-- Multi-select indicators (one per active value). -->
        <template v-if="!isUnderline && isMulti">
            <div
                v-for="value in activeValues"
                :key="'indicator-' + value"
                class="segmented-indicator segmented-indicator--js"
                :style="multiSliderStyles[value] ?? { opacity: '0' }"
            />
        </template>

        <!-- Buttons. -->
        <template v-for="(option, idx) in stripOptions" :key="option.value">
            <TooltipProvider v-if="option.tooltip" :delay-duration="200">
                <Tooltip>
                    <TooltipTrigger as-child>
                        <button
                            :ref="(el) => { if (el) buttonRefs[idx] = el as HTMLElement }"
                            class="segmented-tab"
                            :role="isUnderline ? 'tab' : undefined"
                            v-bind="isUnderline
                                ? { 'aria-selected': isActive(option.value) ? 'true' : 'false' }
                                : { 'aria-pressed': isActive(option.value) ? 'true' : 'false' }"
                            :disabled="option.disabled"
                            :class="option.disabled && 'is-disabled'"
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
                v-bind="isUnderline
                    ? { 'aria-selected': isActive(option.value) ? 'true' : 'false' }
                    : { 'aria-pressed': isActive(option.value) ? 'true' : 'false' }"
                :disabled="option.disabled"
                :class="option.disabled && 'is-disabled'"
                @click="select(option.value, idx)"
            >
                <slot name="option" :option="option" :active="isActive(option.value)">
                    {{ option.label }}
                </slot>
            </button>
        </template>
    </div>
</template>
