<script setup lang="ts">
import {
    computed,
    nextTick,
    onBeforeUnmount,
    onMounted,
    ref,
    useAttrs,
    useId,
    useTemplateRef,
    watch,
} from "vue";
import {
    SliderRoot,
    SliderThumb,
    SliderTrack,
    useForwardPropsEmits,
} from "reka-ui";
import { useDragVelocity } from "../../composables/dom/useDragVelocity";
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

// ── KEYBOARD FOCUS AND STEP TRAVEL ──────────────────────────────────────────────
// reka focuses the thumb from script on a press, and both engines match that focus as
// `:focus-visible`, so a mouse press painted the keyboard ring. The mark is set only for
// focus that arrives outside a press, or once a key is used.
// A value the slider changes in one step (a key, a press on the track away from the
// thumb) travels; a dragged or external value lands on the frame it arrives. The travel
// mark is written straight to the DOM so it is present in the same style pass as the
// value it animates.
const focusKey = ref(false);
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
function markTravel(root: HTMLElement): void {
    root.setAttribute("data-travel", "");
    // A step that moves nothing (a key at an end) starts no travel; drop the mark.
    requestAnimationFrame(() =>
        requestAnimationFrame(() => {
            if (!travelRunning(root)) root.removeAttribute("data-travel");
        }),
    );
}
// The hover dwell is a transition delay. A press or a keyboard focus that lands inside
// it leaves the target unchanged, so the running transition would keep its delay; the
// grow skips what is left of it instead.
function skipDwell(root: HTMLElement): void {
    if (!props.expand) return;
    for (const el of root.querySelectorAll(".slider-shell, .slider-thumb"))
        for (const a of el.getAnimations()) {
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
    if (pressing && root?.hasAttribute("data-travel")) root.removeAttribute("data-travel");
}
function onWindowPointerUp(): void {
    pressing = false;
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
    if (!pressing) focusKey.value = true;
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
        root.removeAttribute("data-travel");
}

onMounted(() => {
    const root = getRootEl();
    if (!root) return;
    root.addEventListener("pointerdown", onRootPointerDownCapture, { capture: true });
    root.addEventListener("pointermove", onRootPointerMoveCapture, {
        capture: true,
        passive: true,
    });
    root.addEventListener("keydown", onRootKeyDownCapture, { capture: true });
    root.addEventListener("focusin", onRootFocusIn);
    root.addEventListener("focusout", onRootFocusOut);
    root.addEventListener("transitionend", onRootTransitionEnd);
    window.addEventListener("pointerup", onWindowPointerUp, { capture: true });
    window.addEventListener("pointercancel", onWindowPointerUp, { capture: true });
});
onBeforeUnmount(() => {
    const root = getRootEl();
    root?.removeEventListener("pointerdown", onRootPointerDownCapture, { capture: true });
    root?.removeEventListener("pointermove", onRootPointerMoveCapture, { capture: true });
    root?.removeEventListener("keydown", onRootKeyDownCapture, { capture: true });
    root?.removeEventListener("focusin", onRootFocusIn);
    root?.removeEventListener("focusout", onRootFocusOut);
    root?.removeEventListener("transitionend", onRootTransitionEnd);
    window.removeEventListener("pointerup", onWindowPointerUp, { capture: true });
    window.removeEventListener("pointercancel", onWindowPointerUp, { capture: true });
});

// ── THE EXPANDED VIEW'S READOUT ─────────────────────────────────────────────────
// The one thing that must be read above a finger. A glass plate clips its children,
// so the readout alone is shown in the top layer, anchored to the root in CSS and moved
// along by the same `--slider-pa`. Shown when a hold or a keyboard focus begins, hidden
// on its own exit tween's `transitionend`.
const anchorName = `--glass-slider-${useId().replace(/[^A-Za-z0-9_-]/g, "-")}`;
const readoutRef = useTemplateRef<HTMLElement>("readoutRef");
const reading = computed(
    () => props.expand && !!props.valueText && (isHeld.value || focusKey.value),
);
const readoutText = computed(() => {
    const index = Math.min(activeIndex.value, live.value.length - 1);
    const value = live.value[index];
    return value === undefined ? "" : (props.valueText?.(value, index) ?? "");
});
watch(
    reading,
    (on) => {
        const el = readoutRef.value;
        if (!el) return;
        const open = el.matches(":popover-open");
        if (on && !open) el.showPopover?.();
        else if (!on && open && getComputedStyle(el).opacity === "0") el.hidePopover();
    },
    { flush: "post" },
);
function onReadoutEnd(event: TransitionEvent): void {
    if (event.propertyName === "opacity" && !reading.value) {
        const el = readoutRef.value;
        if (el?.matches(":popover-open")) el.hidePopover();
    }
}

const loupeRef = useTemplateRef<HTMLElement>("loupeRef");

/* The weight-train velocity bridge. Writes the bounded `--atom-drag-v` and the ONE
   registered velocity term `--flex-vel` on the resolved host during the drag window
   only; the rAF tears down on release. The loupe is mirrored because it is teleported
   out of the host's inheritance. */
const motionAxis = useMotionAxis(() => props.motion);
useDragVelocity({
    host: () => (motionAxis.armed.value && !props.expand ? getRootEl() : null),
    mirror: () => loupeRef.value,
    axis: () => (props.orientation === "vertical" ? "y" : "x"),
});

// ── The GRASP mount (glass/grasp.css) ────────────────────────────────────────────
// The carriers exist exactly as long as the gesture's optic does: mounted the frame
// the hold begins, unmounted on the release fade's OWN `transitionend` — never a
// timer, which drifts against the paint. The register reads their presence, so
// "releasing" needs no flag.
//
// NOT ON THE SPECTRUM VARIANT. That recipe de-glasses its range on purpose, so
// mounting the carriers there would frost a surface deliberately made not-glass. The
// spectrum's held read is its thumb halo, which it already carries.
const graspable = computed(() => v.value !== "spectrum" && !props.expand);
const grasping = ref(false);
watch(isHeld, (held) => {
    if (held && graspable.value) grasping.value = true;
});
function onGraspReleaseEnd(event: TransitionEvent): void {
    if (event.propertyName === "opacity" && !isHeld.value) grasping.value = false;
}

// ── The FOCUS VEIL mount (glass/focus-veil.css) ──────────────────────────────────
// While this slider is held the world behind it frosts and the slider stays crisp. The
// centre is VIEWPORT-space, so it is written whenever the control moves against the
// viewport — never per frame. A slider does not move under its OWN drag, so the drag
// loop stays layout-read-free; a PAGE SCROLL during a live hold does move it, and a
// centre taken once would leave the pool burning a hole where the control no longer
// is. The re-take rides a capture-phase `scroll` listener on `window` — `scroll` does
// not bubble from a scroller, capture still reaches it, so one listener covers every
// scroller.
const focusVeilRef = useTemplateRef<HTMLElement>("focusVeilRef");

function writeVeilCentre(): void {
    const host = getRootEl();
    const veil = focusVeilRef.value;
    if (!host || !veil) return;
    const rect = host.getBoundingClientRect();
    veil.style.setProperty(
        "--veil-x",
        `${((rect.left + rect.width / 2) / window.innerWidth) * 100}%`,
    );
    veil.style.setProperty(
        "--veil-y",
        `${((rect.top + rect.height / 2) / window.innerHeight) * 100}%`,
    );
    veil.style.setProperty("--glass-focus-veil-core-x", `${rect.width / 2}px`);
    veil.style.setProperty("--glass-focus-veil-core-y", `${rect.height / 2}px`);
}

// ── The LOUPE (slider/styles.css) ────────────────────────────────────────────────
// The lens organ over the scrub site. Its geometry is measured ONCE per grasp — the
// track's own box and the viewport point it hangs from — and the per-value write is
// two custom properties, no layout read. `--loupe-x` is the value point in TRACK
// coordinates, the thumb's centre on the lane (`d/2 + p·(track − d)`, styles.css THE
// LANE), and the lens fill ends at the thumb's trailing edge, as the real fill does
// (at `p·track` both would sit off the thumb): the clone is laid out at 3× and
// transformed down by k/3, so
// `LENS/2 − k·x` puts that point dead centre at every k (the two scales cancel).
// Horizontal only: a vertical scrubber's finger does not occlude its own value point.
// THE ONE PREDICATE. Scrubber-only comes free — `grasping` opens only for a graspable
// variant — so the spectrum is excluded here and nowhere else; horizontal-only is the
// stated occlusion rule. Nothing downstream re-tests either.
const loupeTrackW = ref(0);
let loupeThumbD = 0;
const loupeShown = computed(
    () => grasping.value && props.orientation !== "vertical",
);

function valueFraction(): number {
    const min = props.min ?? 0;
    const max = props.max ?? 100;
    const values = props.modelValue ?? props.defaultValue ?? [min];
    const head = values[values.length - 1] ?? min;
    if (max === min) return 0;
    return Math.min(1, Math.max(0, (head - min) / (max - min)));
}

function writeLoupeGeometry(): void {
    const host = getRootEl();
    const lens = loupeRef.value;
    if (!host || !lens) return;
    const track = host.querySelector<HTMLElement>(".slider-track");
    if (!track) return;
    const rect = track.getBoundingClientRect();
    // The thumb's layout diameter: `offsetWidth`, so the held press scale never reaches it.
    loupeThumbD = host.querySelector<HTMLElement>(".slider-thumb")?.offsetWidth ?? 0;
    loupeTrackW.value = rect.width;
    lens.style.setProperty("--loupe-track-w", `${rect.width}px`);
    lens.style.setProperty("--loupe-left", `${rect.left + rect.width / 2}px`);
    lens.style.setProperty("--loupe-top", `${rect.top}px`);
}

function writeLoupeValue(): void {
    const lens = loupeRef.value;
    if (!lens || !loupeTrackW.value) return;
    const d = loupeThumbD;
    const x = d / 2 + valueFraction() * (loupeTrackW.value - d);
    lens.style.setProperty("--loupe-x", `${x}px`);
    lens.style.setProperty("--loupe-fill-w", `${(x + d / 2) * 3}px`);
}

function trackViewport(on: boolean): void {
    if (typeof window === "undefined") return;
    // Remove-then-add is idempotent: a re-grab mid-release must not leave two.
    window.removeEventListener("scroll", onViewportMove, true);
    if (on)
        window.addEventListener("scroll", onViewportMove, {
            passive: true,
            capture: true,
        });
}

function onViewportMove(): void {
    writeVeilCentre();
    writeLoupeGeometry();
}

watch(grasping, async (open) => {
    if (!open) {
        trackViewport(false);
        return;
    }
    await nextTick();
    writeVeilCentre();
    writeLoupeGeometry();
    writeLoupeValue();
    trackViewport(true);
});
watch(
    () => props.modelValue,
    () => {
        if (grasping.value) writeLoupeValue();
    },
    { deep: true },
);
onBeforeUnmount(() => trackViewport(false));

// The ENGAGED RAISE, inline. The veil is a `<body>` child, so the crisp control has to
// clear it in the ROOT stacking context: the root takes `--z-overlay` for exactly as
// long as the plate is mounted, one rung over the plate's own
// `calc(var(--z-overlay) - 1)`. It is INLINE and not a `[data-focus-veil]` rule
// because a scoped attribute selector ties on specificity with any single-class
// descendant rule a host writes over its own children, and source order then decides
// the raise away silently. Inline has no tie to lose.
const hostStyle = computed<Record<string, string>>(() => {
    const raised = grasping.value && graspable.value;
    return {
        ...(motionAxis.hostStyle.value ?? {}),
        ...valueStyle.value,
        ...(props.expand ? { anchorName } : {}),
        ...(raised ? { zIndex: "var(--z-overlay)" } : {}),
    };
});

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
        :data-focus-veil="(grasping && graspable) || undefined"
        :data-motion="motionAxis.dataMotion.value"
        :style="hostStyle"
        v-bind="forwarded"
        @pointerdown="onPointerDown"
        @update:model-value="onModel"
    >
        <!--
            The focus veil — the world's half of the grasp, TELEPORTED to `<body>`.
            `position: fixed` resolves against the viewport only while no ancestor
            carries `backdrop-filter`/`transform`/`filter`/`contain: paint`, and a
            slider's ordinary home is a glass plate that carries exactly those — left
            nested, the plate collapses to that ancestor's box and frosts the slider's
            own siblings instead of the world.
        -->
        <Teleport v-if="!props.expand" to="body">
            <span
                v-if="grasping && graspable"
                ref="focusVeilRef"
                class="glass-focus-veil"
                :data-engaged="isHeld || undefined"
                aria-hidden="true"
            />
        </Teleport>
        <!--
            The loupe, teleported for the same reason and clipped by its own housing so
            the lens sits outside every glass stack. The clone is a SECOND RENDER of the
            track at `--s: 3`, laid out once; only its transform moves per value.
            SCRUBBER-ONLY, and unconditionally so: `loupeShown` reads `grasping`, which
            opens only for a graspable variant, so neither a variant hook nor a
            `graspable` guard on the fill can discriminate anything here — both would be
            branches that never take. The one place that decides is `loupeShown`.
        -->
        <Teleport v-if="!props.expand" to="body">
            <span
                v-if="loupeShown"
                ref="loupeRef"
                class="glass-loupe glass-plate"
                :data-engaged="isHeld || undefined"
                aria-hidden="true"
            >
                <span class="glass-loupe-clone">
                    <span class="glass-loupe-fill"></span>
                </span>
                <span class="glass-loupe-mark"></span>
            </span>
        </Teleport>
        <!--
            The expanded view's shell: one capsule outset from the track by
            `--slider-expand-outset` on every side, so its ends share the track's cap
            centres. It is in the tree at rest, at the track's own thickness and
            transparent, so its grow and its shrink both start from the true rest.
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
                The range is the GRASP register's host (glass/grasp.css): `data-held`
                and the two filter-only carriers ride the FILL — the surface that
                actually carries the glass — not the root.
                THE FILL CLASS IS CONDITIONAL. The spectrum range carries no glass at
                all rather than carrying it and cancelling it: the cancel was a
                `backdrop-filter: none` pair whose unprefixed half the build dropped,
                leaving the prefixed alias no target engine implements — so the ramp
                shipped `saturate(1.4)` over half its own colour and a hard seam at the
                handle. A class that is never applied cannot be un-applied wrongly.
            -->
            <!--
                THE LANE AND THE FILL. The fill is a capsule as long as the track, moved
                by `(p − p0 − 1)·(W − H)` inside the lane and clipped by its round end,
                so its end cap lands on the thumb's centre at every value. With two
                thumbs the lane moves by `p0·(W − H)` and cuts the fill's start to a cap
                on the lower thumb's centre. A plain span: reka's range only wrote two
                layout offsets.
            -->
            <span class="slider-lane">
                <span
                    class="slider-range"
                    :class="!props.expand && v !== 'spectrum' && 'glass-liquid-fill'"
                    :data-held="isHeld || undefined"
                >
                    <template v-if="grasping && graspable">
                        <span class="glass-grasp-carrier" data-grasp="rest"></span>
                        <span
                            class="glass-grasp-carrier"
                            data-grasp="grasp"
                            @transitionend="onGraspReleaseEnd"
                        ></span>
                    </template>
                </span>
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
            :style="{ '--slider-p': String(fraction(value as number)) }"
        />
        <span
            v-if="props.expand && props.valueText"
            ref="readoutRef"
            popover="manual"
            class="slider-readout"
            aria-hidden="true"
            :style="{ positionAnchor: anchorName }"
            @transitionend="onReadoutEnd"
            >{{ readoutText }}</span
        >
    </SliderRoot>
</template>
