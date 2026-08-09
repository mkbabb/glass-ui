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
import { useDragVelocity } from "../../composables/dom/useDragVelocity";
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
        ...delegated
    } = props;
    // The containment law: reka's `contain` alignment clamps the thumb's value-follow
    // centre to the capsule so it can never overhang the rounded ends.
    return { ...delegated, thumbAlignment: "contain" as const };
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);

/* The host-native drag hold — one owner, one acquire path. `useDockHold` attaches
   NATIVE `pointerdown`/`touchstart` on the RESOLVED host: reka's `<SliderRoot>` is a
   forwarding component, so a Vue `@pointerdown` template binding arrives as
   `$attrs.onPointerdown` and is DROPPED across the Slot/forwardRef boundary. vue-tsc
   and units both pass on the broken form; only a real drag catches it. `data-held`
   reflects THIS slider's own hand, never the dock's posture count. */
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

const loupeRef = useTemplateRef<HTMLElement>("loupeRef");

/* The weight-train velocity bridge. Writes the bounded `--atom-drag-v` and the ONE
   registered velocity term `--flex-vel` on the resolved host during the drag window
   only; the rAF tears down on release. The loupe is mirrored because it is teleported
   out of the host's inheritance. */
const motionAxis = useMotionAxis(() => props.motion);
useDragVelocity({
    host: () => (motionAxis.armed.value ? getRootEl() : null),
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
const graspable = computed(() => v.value !== "spectrum");
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
// coordinates: the clone is laid out at 3× and transformed down by k/3, so
// `LENS/2 − k·x` puts that point dead centre at every k (the two scales cancel).
// Horizontal only: a vertical scrubber's finger does not occlude its own value point.
// THE ONE PREDICATE. Scrubber-only comes free — `grasping` opens only for a graspable
// variant — so the spectrum is excluded here and nowhere else; horizontal-only is the
// stated occlusion rule. Nothing downstream re-tests either.
const loupeTrackW = ref(0);
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
    loupeTrackW.value = rect.width;
    lens.style.setProperty("--loupe-track-w", `${rect.width}px`);
    lens.style.setProperty("--loupe-left", `${rect.left + rect.width / 2}px`);
    lens.style.setProperty("--loupe-top", `${rect.top}px`);
}

function writeLoupeValue(): void {
    const lens = loupeRef.value;
    if (!lens || !loupeTrackW.value) return;
    const x = valueFraction() * loupeTrackW.value;
    lens.style.setProperty("--loupe-x", `${x}px`);
    lens.style.setProperty("--loupe-fill-w", `${x * 3}px`);
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
const hostStyle = computed<Record<string, string> | undefined>(() => {
    const raised = grasping.value && graspable.value;
    if (!raised) return motionAxis.hostStyle.value;
    return { ...(motionAxis.hostStyle.value ?? {}), zIndex: "var(--z-overlay)" };
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
        :data-focus-veil="(grasping && graspable) || undefined"
        :data-motion="motionAxis.dataMotion.value"
        :style="hostStyle"
        v-bind="forwarded"
    >
        <!--
            The focus veil — the world's half of the grasp, TELEPORTED to `<body>`.
            `position: fixed` resolves against the viewport only while no ancestor
            carries `backdrop-filter`/`transform`/`filter`/`contain: paint`, and a
            slider's ordinary home is a glass plate that carries exactly those — left
            nested, the plate collapses to that ancestor's box and frosts the slider's
            own siblings instead of the world.
        -->
        <Teleport to="body">
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
        <Teleport to="body">
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
            <SliderRange
                class="slider-range"
                :class="v !== 'spectrum' && 'glass-liquid-fill'"
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
            </SliderRange>
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
