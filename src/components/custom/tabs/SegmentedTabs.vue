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
import {
    ref,
    computed,
    onMounted,
    onBeforeUnmount,
    watch,
    nextTick,
    type HTMLAttributes,
} from "vue";
import { cn } from "../../../utils";
import {
    useDragMorph,
    type DragMorphSnapTarget,
} from "../../../composables/motion/useDragMorph";
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
     * BB.W-DRAG-MORPH — the LIQUID TAB. When `true` (ADDITIVE, default `false`),
     * the `pill` indicator becomes a physical lozenge you can GRAB and PULL: it
     * follows the finger ~1:1, squishes on drag velocity, and flings to the nearest
     * tab on release (`useDragMorph`). The click-selection path is byte-identical;
     * the drag is opt-in. No-op on `underline` (the ink hairline has no indicator
     * element to deform).
     */
    draggable?: boolean;
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<SegmentedTabsProps>(), {
    variant: "pill",
    orientation: "horizontal",
    responsive: false,
    draggable: false,
});

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

const activeValues = computed<string[]>(() =>
    model.value != null ? [model.value] : [],
);

const isActive = (value: string) => activeValues.value.includes(value);

// The JS slider writer is live only on the underline-EXCLUDED pill variant when
// the engine lacks anchor support (underline runs the CSS anchor `::before`).
const jsSliderActive = computed(() => !ANCHOR_SUPPORTED && !isUnderline.value);
const jsSingleSlider = jsSliderActive;

// ── Responsive collapse ──

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
    return (opts[0]?.value ?? model.value) as string;
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
// When `:draggable`, the pill indicator is wired to `useDragMorph` with the snap
// targets resolved off the CENTER-ANCHORED button geometry (the SAME measure
// `useTabIndicator` runs — reused, never re-measured). Dragging the indicator
// follows the finger, squishes on velocity, and flings to the nearest tab center on
// release → `onSnap` writes the `model`. The drag is the `pill` material ONLY (the
// `underline` ink hairline has no `indicatorRef` element to deform). The squish
// reads the SAME `--tab-indicator-max-stretch` live cap the click squish does (the
// SOLE cap source); the drag's `--stretch` write composes the existing reciprocal
// CSS pairing — no second squish recipe.
const dragEnabled = computed(() => props.draggable && !isUnderline.value);

function readMaxStretch(): number {
    const el = indicatorRef.value;
    if (!el) return 1.08;
    const raw = getComputedStyle(el)
        .getPropertyValue("--tab-indicator-max-stretch")
        .trim();
    return Number(raw) || 1.08;
}

// The snap targets — the center-anchored button centers on the active axis. kf
// `Draggable` tracks CLIENT-space pointer coords (`clientX`/`clientY`), so the snap
// centers are resolved in the SAME client space (`getBoundingClientRect`) — the
// nearest-snap resolution + the `decayRest` projection compare like spaces (the
// center-anchor geometry the same as `useTabIndicator`, in client coords).
function resolveSnapTargets(): DragMorphSnapTarget<string>[] {
    return stripOptions.value.map((o, idx) => {
        const btn = buttonRefs.value[idx];
        const r = btn?.getBoundingClientRect();
        const center = r
            ? isVertical.value
                ? r.top + r.height / 2
                : r.left + r.width / 2
            : 0;
        return { value: o.value, center };
    });
}

const drag = useDragMorph<string>({
    el: indicatorRef,
    axis: () => (isVertical.value ? "y" : "x"),
    snapTargets: resolveSnapTargets,
    maxStretch: readMaxStretch,
    onSnap: (value) => {
        // The fling-to-nearest commits the selection — the consumer model is the
        // single source of truth (no shadow). The click-travel squish does not fire
        // here (the drag owns its own squish via `useDragMorph`).
        if (model.value !== value) model.value = value;
    },
});

// The drag `--stretch` write rides the indicator's OWN `--stretch` custom property
// (the SAME var the click squish writes — ONE source of truth). While dragging, the
// drag owns `--stretch`; on settle the value relaxes to 1 (the normalized-position
// drive decays). PRM zeroes the write (the `stretch` read is 1 under reduce).
watch(
    () => [drag.dragging.value, drag.stretch.value] as const,
    ([isDragging, stretch]) => {
        const el = indicatorRef.value;
        if (!el || !dragEnabled.value) return;
        if (isDragging) el.style.setProperty("--stretch", String(stretch));
        else el.style.removeProperty("--stretch");
    },
);

// Re-resolve the snap geometry when the options/orientation change (a resize is
// caught by useDragMorph's next-grab reattach; an option/axis change needs the
// explicit refresh so the rebuilt Draggable carries fresh axis).
watch(
    () => [stripOptions.value.length, isVertical.value, dragEnabled.value] as const,
    () => {
        if (dragEnabled.value) nextTick(() => drag.refresh());
    },
);

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

// ── BB.W-DRAG-MORPH — the roving-tabindex keyboard contract (the owed prerequisite) ──
//
// The WAI-ARIA tablist/toolbar roving-tabindex: EXACTLY ONE tab in the focus order
// (the active tab `tabindex="0"`, the rest `-1`), arrow keys move focus + activate
// (selection-follows-focus, the canonical pattern — for the `pill` ToggleGroup
// register arrows still move focus and activate; the variant's role decides the
// announce). The arrow AXIS is derived off `isVertical` (ArrowRight/Left horizontal,
// ArrowDown/Up vertical), Home/End jump, wrapping at the ends, skipping disabled.
// This is NOT gated behind `:draggable` — it is the keyboard contract the strip
// ALWAYS owed (a draggable tab that is keyboard-broken is the worse failure); the
// drag only makes it acute. The keyboard activation IS a selection → the existing
// click `select(...)` path (with its `squishOnTravel`).

// The active index in the rendered strip — the ONE tabstop. Falls back to 0 so a
// strip whose model points off the desktop subset still has a single focusable tab.
const activeIndex = computed(() => {
    const idx = stripOptions.value.findIndex((o) => o.value === stripValue.value);
    return idx >= 0 ? idx : 0;
});

// The roving tabindex for option `idx`: `0` for the active tab, `-1` otherwise.
function rovingTabindex(idx: number): number {
    return idx === activeIndex.value ? 0 : -1;
}

// Move focus to (and activate) the next enabled tab in `dir` (+1/-1), wrapping.
function focusEnabled(fromIdx: number, dir: 1 | -1) {
    const n = stripOptions.value.length;
    if (n === 0) return;
    for (let step = 1; step <= n; step++) {
        const idx = (fromIdx + dir * step + n * step) % n;
        const option = stripOptions.value[idx];
        if (option && !option.disabled) {
            buttonRefs.value[idx]?.focus();
            select(option.value, idx);
            return;
        }
    }
}

// Move focus to (and activate) the first/last enabled tab.
function focusEdge(edge: "first" | "last") {
    const n = stripOptions.value.length;
    const range = edge === "first"
        ? Array.from({ length: n }, (_, i) => i)
        : Array.from({ length: n }, (_, i) => n - 1 - i);
    for (const idx of range) {
        const option = stripOptions.value[idx];
        if (option && !option.disabled) {
            buttonRefs.value[idx]?.focus();
            select(option.value, idx);
            return;
        }
    }
}

function onStripKeydown(e: KeyboardEvent) {
    const from = activeIndex.value;
    // Axis-derived next/prev keys: vertical strips navigate on the BLOCK axis
    // (ArrowDown/Up), horizontal on the INLINE axis (ArrowRight/Left).
    const nextKey = isVertical.value ? "ArrowDown" : "ArrowRight";
    const prevKey = isVertical.value ? "ArrowUp" : "ArrowLeft";
    switch (e.key) {
        case nextKey:
            e.preventDefault();
            focusEnabled(from, 1);
            break;
        case prevKey:
            e.preventDefault();
            focusEnabled(from, -1);
            break;
        case "Home":
            e.preventDefault();
            focusEdge("first");
            break;
        case "End":
            e.preventDefault();
            focusEdge("last");
            break;
        default:
            break;
    }
}

// ── Lifecycle ──

onMounted(() => {
    if (responsiveCfg.value && typeof window !== "undefined" && window.matchMedia) {
        mql = window.matchMedia(`(min-width: ${breakpoint.value})`);
        isDesktop.value = mql.matches;
        mql.addEventListener("change", onMql);
    }
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
        :aria-orientation="isVertical ? 'vertical' : 'horizontal'"
        :class="cn(
            'segmented-tabs',
            `segmented-tabs--${variant}`,
            isVertical && 'segmented-tabs--vertical',
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
                :tabindex="rovingTabindex(idx)"
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
