<script setup lang="ts">
import {
    computed,
    nextTick,
    onBeforeUnmount,
    onMounted,
    ref,
    useAttrs,
    useTemplateRef,
    watch,
} from "vue";
import {
    SliderRange,
    SliderRoot,
    SliderThumb,
    SliderTrack,
    useForwardPropsEmits,
} from "reka-ui";
import { useFrameCoalesce } from "../../composables/dom/useFrameCoalesce";
import { useDockHold } from "../dock/composables/useDockHold";
import { resolveValueMarks } from "../_shared/field/valueDomain";
import { useMotionAxis } from "../_shared/useMotionAxis";
import type { SliderProps, SliderSize, SliderVariant } from "./types";

const props = withDefaults(defineProps<SliderProps>(), {
    variant: "scrubber",
    size: "md",
    invalid: false,
});
const emits = defineEmits<{
    "update:modelValue": [value: number[] | undefined];
    valueCommit: [value: number[]];
    /** A pointer took the slider: from here to `release` the hand owns the value. */
    grab: [];
    /** The pointer let go; carries the value the hand left, already emitted. */
    release: [value: number[]];
}>();

const v = computed<SliderVariant>(() => props.variant);
const s = computed<SliderSize>(() => props.size);
const marks = computed(() =>
    resolveValueMarks(props.marks, props.min ?? 0, props.max ?? 100),
);

const delegatedProps = computed(() => {
    const {
        class: _,
        variant: __,
        size: ___,
        marks: ____,
        invalid: _____,
        motion: ______,
        valueText: _______,
        modelValue: ________,
        defaultValue: _________,
        ...delegated
    } = props;
    // The containment law: reka's `contain` alignment clamps the thumb's value-follow
    // centre to the capsule so it can never overhang the rounded ends.
    return { ...delegated, thumbAlignment: "contain" as const };
});

const forwarded = useForwardPropsEmits(delegatedProps);

/* ── THE HAND AND THE MODEL ────────────────────────────────────────────────────────
   reka's root is driven by `own`, the value the slider paints, never by the prop
   directly. Outside a grab `own` follows `modelValue`. From the press to the release
   the hand owns it: a model written meanwhile (a playback clock) does not move the
   thumb, and the pointer's value wins. On release the slider follows the model again,
   from the value the hand left, so nothing jumps. A key step writes `own` and emits;
   the next render then returns `own` to the model, so a consumer who declines the
   step (leaves the model as it was) keeps the thumb where the model is.

   A drag streams `update:modelValue` at most once per frame, the latest value winning
   (`useFrameCoalesce`); the pending value is delivered before `valueCommit`, and
   `release` comes last. A key step (arrows, Page, Home, End) is not a drag and emits
   at once. The release listeners are bubble-phase so they run after reka's own
   pointerup (its slide end and commit); the grab is capture-phase so the press's own
   value already streams. */
const grabbed = ref(false);
const own = ref<number[]>(
    props.modelValue ?? props.defaultValue ?? [props.min ?? 0],
);
watch(
    () => props.modelValue,
    (next) => {
        if (!grabbed.value && next) own.value = next;
    },
    { deep: true },
);

const stream = useFrameCoalesce<number[]>((value) =>
    emits("update:modelValue", value),
);

/** Outside a grab, return `own` to the model the consumer holds once the render that
    carries it has run (the value just delivered, a declined step, or a clock's write). */
function followModel(): void {
    void nextTick(() => {
        if (!grabbed.value && props.modelValue) own.value = props.modelValue;
    });
}

function onRekaUpdate(next: number[] | undefined): void {
    if (!next) return;
    own.value = next;
    if (grabbed.value) {
        stream.push(next);
        return;
    }
    emits("update:modelValue", next);
    followModel();
}

function onRekaCommit(value: number[]): void {
    stream.flush();
    emits("valueCommit", value);
}

function onGrab(event: PointerEvent): void {
    if (props.disabled || event.button !== 0 || grabbed.value) return;
    grabbed.value = true;
    emits("grab");
}

function onLetGo(): void {
    if (!grabbed.value) return;
    stream.flush();
    grabbed.value = false;
    emits("release", [...own.value]);
    followModel();
}

/* The host-native drag hold — one owner, one acquire path. `useDockHold` attaches
   NATIVE `pointerdown`/`touchstart` on the RESOLVED host, and not because a template
   binding would be lost: reka's `<SliderRoot>` sets `inheritAttrs: false` and then
   re-merges `$attrs` by hand through `mergeProps` (SliderRoot.js:149), which CHAINS
   `onX` handlers, so a consumer `@pointerdown` does land. It lands LAST — after reka's
   own slide start — which is the one real limit: it cannot `preventDefault` ahead of
   the slide. The native listeners earn their place on three other counts:
   `pointerdown` AND `touchstart` fold onto ONE acquire, the release is window-scoped
   and survives reka's `setPointerCapture` retarget, and the acquire is
   capture-independent instant-on. `data-held` reflects THIS slider's own hand, never
   the dock's posture count. */
const sliderRootRef = useTemplateRef<{ $el: HTMLElement } | HTMLElement | null>(
    "sliderRootRef",
);

function getRootEl(): HTMLElement | null {
    const ref = sliderRootRef.value;
    if (!ref) return null;
    if (ref instanceof HTMLElement) return ref;
    return (ref.$el as HTMLElement | undefined) ?? null;
}

const { isHeld } = useDockHold(getRootEl);

/* THE GRAB IS TAKEN AT THE PRESS. With `contain` alignment reka 2.10 records
   the thumb's grab offset, `clientX − thumb.left`, on the FIRST `pointermove` of a
   thumb drag rather than at the press, so the offset carries that first move's travel
   and the thumb trails the pointer by it for the whole drag (4 px per 4 px step,
   measured). This handler runs after reka's own `pointerdown` (the merged `onX` chain
   lands last, above), once the thumb holds the pointer capture, and hands reka one
   `pointermove` at the press point: the offset is then the true grab, the value does
   not move, and every later move tracks the pointer 1:1 on the same frame. */
function onPointerDown(event: PointerEvent): void {
    const thumb = (event.target as Element | null)?.closest?.<HTMLElement>(".slider-thumb");
    if (!thumb || !thumb.hasPointerCapture(event.pointerId)) return;
    thumb.dispatchEvent(
        new PointerEvent("pointermove", {
            bubbles: true,
            clientX: event.clientX,
            clientY: event.clientY,
            pointerId: event.pointerId,
            pointerType: event.pointerType,
            isPrimary: event.isPrimary,
        }),
    );
}

/* BM pass 6 prototype: the velocity bridge (`useDragVelocity`'s per-frame `--flex-vel` and `--atom-drag-v`), the
   grasp carriers, the focus veil and the loupe are removed (DESIGN §8.2). The held answer is the plate's; the
   release is the finger's value; nothing is written per frame. */
const motionAxis = useMotionAxis(() => props.motion);

const hostStyle = computed(() => motionAxis.hostStyle.value);

/* The never-nameless floor's DX signal. reka's SliderThumbImpl names the thumb
   `$attrs['aria-label'] || getLabel(index, count)`, and getLabel returns UNDEFINED for
   a single-thumb slider. So a bare single-thumb <Slider> with no `aria-label` yields a
   role="slider" thumb that is nameless to a screen reader. Warn in DEV only — no
   runtime name is invented, because that would be a lie. */
const attrs = useAttrs();
onMounted(() => {
    if (!import.meta.env.DEV) return;
    const named = attrs["aria-label"] != null || attrs["aria-labelledby"] != null;
    const values = props.modelValue ?? props.defaultValue ?? [0];
    const singleThumb = values.length <= 1;
    if (!named && singleThumb) {
        console.warn(
            "[Slider] no accessible name: a single-thumb <Slider> has no `aria-label` " +
                'or `aria-labelledby`, so its role="slider" thumb is nameless to a screen ' +
                "reader (reka mints no fallback name for one thumb). Wrap it in " +
                "<LabeledField>, or pass an explicit `aria-label`.",
        );
    }
});
</script>

<template>
    <SliderRoot
        v-slot="{ modelValue: values }"
        data-slot="slider"
        ref="sliderRootRef"
        class="glass-slider"
        data-control-target
        :class="props.class"
        :data-variant="v"
        :data-size="s"
        :data-invalid="props.invalid || undefined"
        :data-held="isHeld || undefined"
        :data-inverted="props.inverted || undefined"
        :data-motion="motionAxis.dataMotion.value"
        :style="hostStyle"
        v-bind="forwarded"
        :model-value="own"
        @update:model-value="onRekaUpdate"
        @value-commit="onRekaCommit"
        @pointerdown.capture="onGrab"
        @pointerup="onLetGo"
        @pointercancel="onLetGo"
        @lostpointercapture="onLetGo"
        @pointerdown="onPointerDown"
    >
        <SliderTrack class="slider-track track-well">
            <span
                v-if="marks.length"
                class="glass-value-marks"
                aria-hidden="true"
                :data-orientation="props.orientation === 'vertical' ? 'vertical' : undefined"
                :data-inverted="props.inverted || undefined"
            >
                <span
                    v-for="mark in marks"
                    :key="mark.value"
                    class="glass-value-mark"
                    :style="{ '--value-mark-position': `${mark.position * 100}%` }"
                />
            </span>
            <!--
                THE FILL CLASS IS CONDITIONAL. The spectrum range carries no glass at
                all rather than carrying it and cancelling it: the cancel was a
                `backdrop-filter: none` pair whose unprefixed half the build dropped,
                leaving the prefixed alias no target engine implements — so the ramp
                shipped `saturate(1.4)` over half its own colour and a hard seam at the
                handle. A class that is never applied cannot be un-applied wrongly.
            -->
            <!--
                THE LANE. reka places the range by percentages of its
                containing block and the thumb by `contain` alignment, whose leading edge
                travels `p·(track − thumb)`. The lane is the track less one thumb
                diameter, so the range's percentages land on the thumb's travel, and the
                range reaches one diameter past it (styles.css): the fill is exactly
                `thumb + p·(track − thumb)` wide, never narrower than the thumb at min,
                and the thumb sits inside its leading end at every value.
            -->
            <span class="slider-lane">
                <SliderRange
                    class="slider-range"
                    :class="v !== 'spectrum' && 'glass-liquid-fill'"
                    :data-held="isHeld || undefined"
                />
            </span>
        </SliderTrack>
        <!--
            The thumb's specular anchor is FROZEN at 50%/50% and that is correct, not a
            bug: the house has one light source, and pointer-tracking a 12px box is
            noise. Do not add `v-specular` here.
            `aria-valuetext` is the ONE humane readout — reka mints none, so a screen
            reader otherwise hears the raw number for a slider whose scale is a curve, a
            colour, or a duration. It is authored per thumb because each thumb carries
            its own value.
        -->
        <SliderThumb
            v-for="(value, key) in values"
            :key="key"
            :aria-label="($attrs['aria-label'] as string) ?? undefined"
            :aria-labelledby="($attrs['aria-labelledby'] as string) ?? undefined"
            :aria-describedby="($attrs['aria-describedby'] as string) ?? undefined"
            :aria-errormessage="($attrs['aria-errormessage'] as string) ?? undefined"
            :aria-invalid="props.invalid || undefined"
            :aria-valuetext="props.valueText?.(value as number, key) ?? undefined"
            class="slider-thumb glass-specular-track"
        />
    </SliderRoot>
</template>
