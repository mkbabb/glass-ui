<script setup lang="ts" generic="T extends string = string">
// SegmentedTabs has two materials, one orientation axis, one indicator engine, and
// ONE indicator NODE. `pill` is the eyeglass — the glass body that spans its travel;
// `underline` is the paper ink mark drawn as that same body's edge. Both measure
// through the same JS writer, so there is no engine branch and no second element to
// keep in sync. CSS owns paint; this SFC owns markup and the measured position.
import { ref, computed, onBeforeUpdate } from "vue";
import { cn } from "../_shared/class-names";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../select";
// THE ONE SELECTION ENGINE. `useSelectionGroup` assembles the selection model, the
// roving machine, and the ONE traveling-indicator writer; the dock control run and
// SegmentedTabs are the same strip wearing different chrome. This SFC used to compose
// `useSelectionIndicator` + `useTabRovingFocus` DIRECTLY — the engine's own doc claimed
// it as a consumer while the import graph said otherwise, so the claim governed nothing
// (BK #19 W-SELECTION-ONE). `<ToggleGroup>` is the THIRD, adopted at BK #84
// W-TOGGLE-ROW: reka retired from it, an item registry feeds the same engine, and the
// C-1 `SelectionOption["value"]` widening landed there. It is a ROW, not a strip — it
// declines the indicator, and the glide mark stays this component's. The pill
// indicator always measures via JS, so Chrome and Safari paint the same pixels by
// construction.
import { useSelectionGroup } from "../../composables/motion/morph/useSelectionGroup";
import { useTabDragMorph } from "./composables/useTabDragMorph";
import { useTabResponsive } from "./composables/useTabResponsive";
import type { SegmentedTabOption, SegmentedTabsProps } from "./types";
// Motion weight is the sole drag-enrichment axis.
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

const props = withDefaults(defineProps<SegmentedTabsProps<T>>(), {
    variant: "pill",
    orientation: "horizontal",
    activation: "automatic",
    responsive: false,
});

// Resolved `full` motion arms drag enrichment; the other modes keep selection intact.
const motionAxis = useMotionAxis(() => props.motion);

// Vue 3.5 defineModel — single-select, typed by the options' value union `T`
// (`string` by default). (The multi-select array model retired with the
// `:multi-select` prop; a multi-pressed strip is a ToggleGroup.)
const model = defineModel<T>({ required: true });

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
function pillHoverClass(option: SegmentedTabOption<T>): string | false {
    return (
        !isUnderline.value &&
        !isActive(option.value) &&
        !option.disabled &&
        "glass-capsule-hover"
    );
}

// ONE indicator node, both materials. It used to exist only on the pill, with the
// underline drawn as a `::before` pseudo position-anchored to `[aria-selected]` —
// two engines, and the second one had no indicator at all under `semantics="toggle"`
// (no `anchor-name` is minted, `anchor()` is invalid at computed-value time, and the
// rule collapsed to a zero-width box). Now the measured node IS the mark: the pill
// fills it, the underline draws its edge. Safari-identical by construction, because
// there is nothing left for an engine to differ about.

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
// ARIA, indicator paint, and roving focus together. The projection is expressed as a
// WRITABLE ref so the ONE engine consumes it as its model unchanged: reads resolve
// the strip's fallback, writes land on the real `v-model`.
const stripModel = computed<T | undefined>({
    get: () => stripValue.value ?? undefined,
    set: (v) => {
        if (v != null) model.value = v;
    },
});

// ── THE ONE SELECTION ENGINE ───────────────────────────────────────────
//
// Model + roving machine (exactly-one-tabstop, axis-derived arrows, Home/End, wrap,
// disabled-skip, manual/automatic activation) + the ONE traveling-indicator writer +
// the recenter call, assembled once. The press squish rides `onSelect`, so it fires on
// the pointer AND keyboard commit paths through the same `select`.
const selection = useSelectionGroup<SegmentedTabOption<T>>({
    options: stripOptions,
    model: stripModel,
    role: computed(() => (isTabsSemantic.value ? "tablist" : "group")),
    vertical: isVertical,
    activation: computed(() => props.activation),
    containerRef,
    indicatorRef,
    buttonRefs,
    // The material IS the deform policy. The pill is a body of glass with area to
    // span and swell; the hairline lengthens along its travel and has neither.
    deform: computed(() => (isUnderline.value ? "mark" : "plate")),
    onSelect: (_value, idx) => {
        const btn = buttonRefs.value[idx];
        if (btn) animatePress(btn);
    },
});

// The travel deform fires INSIDE the engine's `select` on every commit, on the policy
// the `deform` param above states.
const { select, rovingTabindex, singleSliderStyle } = selection;
const onStripKeydown = selection.onKeydown;
const isActive = (value: T) => selection.isSelected(value);

// Function refs are index-aligned to the rendered options. Clear stale entries
// before a responsive subset or option list changes shape.
onBeforeUpdate(() => {
    buttonRefs.value = [];
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
// The press rides the travel register (`--spring-dock`), one
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
    const easing = readToken("--spring-dock", "ease");
    // The press rung by NAME, with no literal standing behind it: a hand-copied
    // "0.97" beside the token that declares 0.97 is a second authority free to
    // disagree with the first, and it is the shape that hides a token going missing.
    const press = readToken("--scale-press-sm", "");
    btn.animate(
        [
            { transform: "scale(1)" },
            { transform: `scale(${press})`, offset: 0.4 },
            { transform: "scale(1)" },
        ],
        { duration: 220, easing },
    );
}

// The mobile Select emits an untyped value; it resolves through the options, so
// the model only ever receives one of them.
function onMobileUpdate(value: unknown) {
    const hit = props.options.find((option) => option.value === value);
    if (hit) model.value = hit.value;
}
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
        <!-- THE ONE indicator node — both materials, every engine, always present.
             `aria-hidden` because it is pure decoration and would otherwise be a
             non-`tab` element child of a `role="tablist"`. When draggable it carries
             the `.glass-drag-grabbable` rest affordance + the `.glass-drag-lift`
             grabbed state; the shared morph engine owns its compositor offset. -->
        <div
            ref="indicatorRef"
            aria-hidden="true"
            :class="[
                'segmented-indicator',
                // The measured writer paints on every engine.
                'segmented-indicator--js',
                // The material composes onto the measured box, so geometry,
                // clipping, and motion share one owner and one settled scale. The
                // pill is glass; the underline composes the shared paper ink-mark
                // register, which this makes its FIRST real class consumer.
                isUnderline ? 'paper-ink-mark' : 'glass-capsule',
                dragEnabled && 'glass-drag-grabbable',
                dragEnabled && drag.dragging.value && 'glass-drag-lift',
            ]"
            :style="singleSliderStyle"
        />

        <!-- Buttons. ONE branch — the tooltip fork is gone (a tab whose label needs
             an explanatory tooltip has the wrong label), so nine duplicated
             attributes and a three-prop slot cannot diverge. `data-active` is
             PRESENCE-gated (`|| undefined`), the house emit form; it is the styling
             hook for both semantics, because `[aria-pressed]` and `[aria-selected]`
             are two spellings of one state and paint may not know which. The ARIA
             attributes themselves are untouched. -->
        <template v-for="(option, idx) in stripOptions" :key="option.value">
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
                v-bind="{
                    // Presence-gated, in the house form the landed emit sites use
                    // (`DockControl.vue:113`, `PagerDots.vue`): the empty string when
                    // on, the key absent when off. `data-active=&quot;false&quot;` would make
                    // `[data-active]` match every tab in the strip.
                    ...(isActive(option.value) ? { 'data-active': '' } : {}),
                    ...(isTabsSemantic
                        ? {
                              'aria-selected': isActive(option.value) ? 'true' : 'false',
                              'aria-controls': option.controls || undefined,
                          }
                        : { 'aria-pressed': isActive(option.value) ? 'true' : 'false' }),
                }"
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
