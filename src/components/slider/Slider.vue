<script lang="ts">
// The last input on the page: a key or a pointer. One pair of listeners for every Slider.
let lastInputWasKey = false;
let watchers = 0;
const onKey = (): void => void (lastInputWasKey = true);
const onPointer = (): void => void (lastInputWasKey = false);
function watchInput(on: boolean): void {
    if (typeof document === "undefined") return;
    watchers += on ? 1 : -1;
    if (on && watchers === 1) {
        document.addEventListener("keydown", onKey, true);
        document.addEventListener("pointerdown", onPointer, true);
    } else if (!on && watchers === 0) {
        document.removeEventListener("keydown", onKey, true);
        document.removeEventListener("pointerdown", onPointer, true);
    }
}
</script>

<script setup lang="ts">
import {
    computed,
    onBeforeUnmount,
    onMounted,
    ref,
    useAttrs,
    useTemplateRef,
    watch,
} from "vue";
import {
    SliderRoot,
    SliderThumb,
    SliderTrack,
    useForwardPropsEmits,
} from "reka-ui";
import { useDockHold } from "../dock/composables/useDockHold";
import { resolveValueMarks } from "../_shared/field/valueDomain";
import { useMotionAxis } from "../_shared/useMotionAxis";
import type { SliderProps, SliderSize, SliderVariant } from "./types";

const props = withDefaults(defineProps<SliderProps>(), {
    variant: "scrubber",
    size: "md",
    invalid: false,
    expand: false,
});
const emits = defineEmits<{
    "update:modelValue": [value: number[] | undefined];
    valueCommit: [value: number[]];
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
        expand: ________,
        ...delegated
    } = props;
    // The containment law: reka's `contain` alignment clamps the thumb's value-follow
    // centre to the capsule so it can never overhang the rounded ends.
    return { ...delegated, thumbAlignment: "contain" as const };
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);

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

// ── THE VALUE AS ONE NUMBER ──────────────────────────────────────────────────────
// The template writes each value as a fraction `p` and the stylesheet moves the thumb,
// the fill and the lane by transforms of it, so a value change never reaches layout.
// reka still owns the pointer, the keys, the aria values and the hidden form input.
// Controlled: the model value. Uncontrolled: reka's own value, mirrored from its emit.
const uncontrolled = ref<number[]>([...(props.defaultValue ?? [props.min ?? 0])]);
const live = computed<number[]>(() => props.modelValue ?? uncontrolled.value);
function onModel(next: number[] | undefined): void {
    if (next && props.modelValue == null) uncontrolled.value = [...next];
}
function fraction(value: number | undefined): number {
    const min = props.min ?? 0;
    const max = props.max ?? 100;
    if (value === undefined || max === min) return 0;
    return Math.min(1, Math.max(0, (value - min) / (max - min)));
}
// The thumb being changed: the readout and the shell's origin follow it.
const activeIndex = ref(0);
const valueStyle = computed<Record<string, string>>(() => {
    const values = live.value;
    const last = values.length - 1;
    return {
        "--slider-p": String(fraction(values[last])),
        "--slider-p0": String(values.length > 1 ? fraction(values[0]) : 0),
        "--slider-pa": String(fraction(values[Math.min(activeIndex.value, last)])),
    };
});

// ── KEYBOARD FOCUS, HOVER AND STEP TRAVEL ───────────────────────────────────────
// reka focuses the thumb from script on a press, and both engines match that focus as
// `:focus-visible`, so a mouse press painted the keyboard ring. The mark is set only
// when the last input before the focus was a key, or once a step key is used: focus
// that a script hands over after a pointer press (a dialog's first control, a window
// coming forward) is not keyboard focus. One flag serves every Slider on the page.
//
// The hover mark is set by a mouse's `pointerenter`, not read from `:hover`: on a
// device with a mouse and a touch screen a tap leaves `:hover` behind.
//
// A value the slider changes in one step (a key, a press on the track away from the
// thumb) travels; a dragged or external value lands on the frame it arrives. The travel
// belongs to the one value change the step produces: the mark is dropped before any
// later value is written, so a playing scrubber never rides the travel's clock.
const focusKey = ref(false);
const hovered = ref(false);
let pressing = false;
const STEP_KEYS = new Set([
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
    "PageUp",
    "PageDown",
    "Home",
    "End",
]);

function travelRunning(root: HTMLElement): boolean {
    const thumb = root.querySelector(".slider-thumb");
    return !!thumb
        ?.getAnimations()
        .some((a) => (a as CSSTransition).transitionProperty === "translate");
}
// How many value changes the marked step may still produce: one.
let travelOwed = 0;
function dropTravel(root: HTMLElement): void {
    travelOwed = 0;
    root.removeAttribute("data-travel");
}
function markTravel(root: HTMLElement): void {
    travelOwed = 1;
    root.setAttribute("data-travel", "");
    // A step that moves nothing (a key at an end) starts no travel; drop the mark.
    requestAnimationFrame(() =>
        requestAnimationFrame(() => {
            if (!travelRunning(root)) dropTravel(root);
        }),
    );
}
// Runs before the new value reaches the DOM, so the mark and the value it must not
// animate change in one style pass.
watch(
    live,
    () => {
        const root = getRootEl();
        if (!root?.hasAttribute("data-travel")) return;
        if (travelOwed > 0) travelOwed -= 1;
        else dropTravel(root);
    },
    { flush: "sync", deep: true },
);
// The hover dwell is a transition delay. A press or a keyboard focus that lands inside
// it leaves the target unchanged, so the running transition would keep its delay; the
// grow skips what is left of it instead.
function skipDwell(root: HTMLElement): void {
    if (!props.expand) return;
    for (const a of root.getAnimations({ subtree: true })) {
        const delay = Number(a.effect?.getTiming().delay ?? 0);
        if (typeof a.currentTime === "number" && a.currentTime < delay) a.currentTime = delay;
    }
}
function onRootPointerDownCapture(event: PointerEvent): void {
    const root = getRootEl();
    if (!root) return;
    pressing = true;
    focusKey.value = false;
    skipDwell(root);
    if (!(event.target as Element | null)?.closest?.(".slider-thumb")) markTravel(root);
}
function onRootPointerMoveCapture(): void {
    const root = getRootEl();
    if (pressing && root?.hasAttribute("data-travel")) dropTravel(root);
}
function onWindowPointerUp(): void {
    pressing = false;
}
function onRootPointerEnter(event: PointerEvent): void {
    if (event.pointerType === "mouse") hovered.value = true;
}
function onRootPointerLeave(): void {
    hovered.value = false;
}
function onRootKeyDownCapture(event: KeyboardEvent): void {
    const root = getRootEl();
    if (!root || !STEP_KEYS.has(event.key)) return;
    focusKey.value = true;
    markTravel(root);
}
function onRootFocusIn(event: FocusEvent): void {
    const root = getRootEl();
    const thumb = (event.target as Element | null)?.closest?.(".slider-thumb");
    if (root && thumb) {
        const index = [...root.querySelectorAll(".slider-thumb")].indexOf(thumb);
        if (index >= 0) activeIndex.value = index;
    }
    if (!pressing && lastInputWasKey) focusKey.value = true;
    if (root) skipDwell(root);
}
function onRootFocusOut(event: FocusEvent): void {
    const root = getRootEl();
    if (!root?.contains(event.relatedTarget as Node | null)) focusKey.value = false;
}
function onRootTransitionEnd(event: TransitionEvent): void {
    const root = getRootEl();
    if (
        root &&
        event.propertyName === "translate" &&
        (event.target as Element).classList.contains("slider-thumb")
    )
        dropTravel(root);
}

onMounted(() => {
    const root = getRootEl();
    if (!root) return;
    watchInput(true);
    root.addEventListener("pointerdown", onRootPointerDownCapture, { capture: true });
    root.addEventListener("pointermove", onRootPointerMoveCapture, {
        capture: true,
        passive: true,
    });
    root.addEventListener("pointerenter", onRootPointerEnter);
    root.addEventListener("pointerleave", onRootPointerLeave);
    root.addEventListener("keydown", onRootKeyDownCapture, { capture: true });
    root.addEventListener("focusin", onRootFocusIn);
    root.addEventListener("focusout", onRootFocusOut);
    root.addEventListener("transitionend", onRootTransitionEnd);
    root.addEventListener("transitioncancel", onRootTransitionEnd);
    window.addEventListener("pointerup", onWindowPointerUp, { capture: true });
    window.addEventListener("pointercancel", onWindowPointerUp, { capture: true });
});
onBeforeUnmount(() => {
    const root = getRootEl();
    watchInput(false);
    root?.removeEventListener("pointerdown", onRootPointerDownCapture, { capture: true });
    root?.removeEventListener("pointermove", onRootPointerMoveCapture, { capture: true });
    root?.removeEventListener("pointerenter", onRootPointerEnter);
    root?.removeEventListener("pointerleave", onRootPointerLeave);
    root?.removeEventListener("keydown", onRootKeyDownCapture, { capture: true });
    root?.removeEventListener("focusin", onRootFocusIn);
    root?.removeEventListener("focusout", onRootFocusOut);
    root?.removeEventListener("transitionend", onRootTransitionEnd);
    root?.removeEventListener("transitioncancel", onRootTransitionEnd);
    window.removeEventListener("pointerup", onWindowPointerUp, { capture: true });
    window.removeEventListener("pointercancel", onWindowPointerUp, { capture: true });
    placeOnMove(false);
});

// ── THE EXPANDED VIEW'S READOUT ─────────────────────────────────────────────────
// The one thing that must be read above a finger. A glass plate clips its children, so
// the readout alone is shown in the top layer. It is placed from ONE rectangle of the
// track, read when it is shown and again on a scroll or a resize while it is shown, and
// moved along by `translate` in that rectangle's own pixels (so an ancestor's transform
// is carried), by the same `--slider-pa`. No rectangle is read inside a drag. Its box is
// a fixed size in `ch`, taken from the widest text it has had to show, and contained, so
// a text change is laid out inside it and nowhere else. Shown when a hold or a keyboard
// focus begins, hidden on its own exit tween's `transitionend`.
const readoutRef = useTemplateRef<HTMLElement>("readoutRef");
const reading = computed(
    () => props.expand && !!props.valueText && (isHeld.value || focusKey.value),
);
const readoutText = computed(() => {
    const index = Math.min(activeIndex.value, live.value.length - 1);
    const value = live.value[index];
    return value === undefined ? "" : (props.valueText?.(value, index) ?? "");
});
const readoutCh = ref(0);
watch(
    [readoutText, () => props.min, () => props.max, () => props.valueText],
    () => {
        const texts = [
            readoutText.value,
            props.valueText?.(props.min ?? 0, 0) ?? "",
            props.valueText?.(props.max ?? 100, 0) ?? "",
        ];
        const widest = Math.max(...texts.map((t) => [...t].length));
        if (widest > readoutCh.value) readoutCh.value = widest;
    },
    { immediate: true },
);
function placeReadout(): void {
    const root = getRootEl();
    const el = readoutRef.value;
    const track = root?.querySelector<HTMLElement>(".slider-track");
    if (!root || !el || !track) return;
    const rect = track.getBoundingClientRect();
    const vertical = props.orientation === "vertical";
    const sign = Number(getComputedStyle(root).getPropertyValue("--slider-sign")) || 1;
    // The band's half thickness, its start cap's centre and its travel, as painted.
    const half = (vertical ? rect.width : rect.height) / 2;
    const length = vertical ? rect.height : rect.width;
    const x = vertical ? rect.left + half : sign > 0 ? rect.left + half : rect.right - half;
    const y = !vertical ? rect.top + half : sign > 0 ? rect.top + half : rect.bottom - half;
    el.style.setProperty("--slider-rx", `${x}px`);
    el.style.setProperty("--slider-ry", `${y}px`);
    el.style.setProperty("--slider-rh", `${half}px`);
    el.style.setProperty("--slider-rt", `${length - 2 * half}px`);
}
function placeOnMove(on: boolean): void {
    if (typeof window === "undefined") return;
    window.removeEventListener("scroll", placeReadout, true);
    window.removeEventListener("resize", placeReadout);
    if (on) {
        window.addEventListener("scroll", placeReadout, { passive: true, capture: true });
        window.addEventListener("resize", placeReadout, { passive: true });
    }
}
function closeReadout(el: HTMLElement): void {
    el.hidePopover();
    placeOnMove(false);
}
watch(
    reading,
    (on) => {
        const el = readoutRef.value;
        if (!el) return;
        const open = el.matches(":popover-open");
        if (on && !open) {
            placeReadout();
            el.showPopover?.();
            placeOnMove(true);
        } else if (!on && open && getComputedStyle(el).opacity === "0") closeReadout(el);
    },
    { flush: "post" },
);
function onReadoutEnd(event: TransitionEvent): void {
    if (event.propertyName === "opacity" && !reading.value) {
        const el = readoutRef.value;
        if (el?.matches(":popover-open")) closeReadout(el);
    }
}

const motionAxis = useMotionAxis(() => props.motion);
const hostStyle = computed<Record<string, string>>(() => ({
    ...(motionAxis.hostStyle.value ?? {}),
    ...valueStyle.value,
}));

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
        :data-expand="props.expand || undefined"
        :data-focus-key="focusKey || undefined"
        :data-hover="hovered || undefined"
        :data-range="live.length > 1 || undefined"
        :data-motion="motionAxis.dataMotion.value"
        :style="hostStyle"
        v-bind="forwarded"
        @pointerdown="onPointerDown"
        @update:model-value="onModel"
    >
        <!--
            The expanded view's shell: one capsule outset from the track by g on every
            side, so its ends share the track's cap centres. It is in the tree at rest,
            clipped to the track's own capsule and transparent, so its grow and its
            shrink both start from the true rest and every frame between is a capsule
            concentric with the track. While it is grown it takes the pointer.
        -->
        <span v-if="props.expand" class="slider-shell" aria-hidden="true" />
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
                THE LANE AND THE FILL. The fill is a capsule as long as the track, moved
                by `(p − p0 − 1)·(W − H)` inside the lane and clipped by its round end,
                so its end cap lands on the thumb's centre at every value. With two
                thumbs the lane moves by `p0·(W − H)` and cuts the fill's start to a cap
                on the lower thumb's centre. A plain span: reka's range only wrote two
                layout offsets.
            -->
            <span class="slider-lane">
                <span class="slider-range"></span>
            </span>
        </SliderTrack>
        <!--
            reka's thumb node is the grab box: an H square that is never scaled, because
            reka takes the grab offset from its rectangle. The disc the eye sees is its
            `::before`, which is what grows.
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
            class="slider-thumb"
            :style="{ '--slider-p': String(fraction(value as number)) }"
        />
        <span
            v-if="props.expand && props.valueText"
            ref="readoutRef"
            popover="manual"
            class="slider-readout"
            aria-hidden="true"
            :style="{ '--slider-readout-ch': String(readoutCh) }"
            @transitionend="onReadoutEnd"
            >{{ readoutText }}</span
        >
    </SliderRoot>
</template>
